/* A deterministic, responsive map. Coordinates stay still while the learner reads. */
(function () {
  const NS = 'http://www.w3.org/2000/svg';
  const XHTML = 'http://www.w3.org/1999/xhtml';
  const svgElement = (tag, attrs = {}) => {
    const el = document.createElementNS(NS, tag);
    Object.entries(attrs).forEach(([key, value]) => el.setAttribute(key, value));
    return el;
  };
  const palette = ['#436858', '#5a668e', '#397975', '#3b718b', '#97622c', '#7b5e8d', '#985a79', '#5a783b'];
  const rootGroups = [
    { title: '建立共同底座', ids: ['workflow', 'cpp-foundations', 'python-math'] },
    { title: '连接工程与系统', ids: ['systems-network', 'data-backend'] },
    { title: '选择应用方向', ids: ['trading-research', 'ai-application', 'gpu-systems'] }
  ];
  // Round the corners of routes that travel through the gaps between cards.
  function roundedRoute(points) {
    let path = `M ${points[0][0]} ${points[0][1]}`;
    for (let i = 1; i < points.length - 1; i++) {
      const [x, y] = points[i], before = points[i - 1], after = points[i + 1];
      const a = Math.hypot(x - before[0], y - before[1]);
      const b = Math.hypot(after[0] - x, after[1] - y);
      if (!a || !b) continue;
      const r = Math.min(10, a / 2, b / 2);
      path += ` L ${x + (before[0] - x) * r / a} ${y + (before[1] - y) * r / a} Q ${x} ${y} ${x + (after[0] - x) * r / b} ${y + (after[1] - y) * r / b}`;
    }
    const end = points[points.length - 1];
    return path + ` L ${end[0]} ${end[1]}`;
  }

  class AtlasMap {
    constructor({ viewport, svg, onActivate }) {
      Object.assign(this, { viewport, svg, onActivate, nodes: [], edges: [], scale: 1, panX: 0, panY: 0, visible: true, sceneKey: null, showAll: false, highlightId: null });
      this.resizeObserver = new ResizeObserver(() => { if (this.visible) this.layout(); });
      this.resizeObserver.observe(viewport);
      viewport.addEventListener('pointerdown', event => {
        // Touch scroll remains native; the zoom buttons work with touch too.
        if (event.pointerType !== 'mouse' || event.button !== 0) return;
        this.drag = { id: event.pointerId, x: event.clientX, y: event.clientY, moved: false };
      });
      viewport.addEventListener('pointermove', event => {
        const drag = this.drag;
        if (!drag || drag.id !== event.pointerId) return;
        const dx = event.clientX - drag.x, dy = event.clientY - drag.y;
        if (!drag.moved && Math.hypot(dx, dy) < 6) return;
        drag.moved = true;
        if (!viewport.hasPointerCapture(event.pointerId)) viewport.setPointerCapture(event.pointerId);
        this.panX += dx; this.panY += dy;
        drag.x = event.clientX; drag.y = event.clientY;
        this.draw();
      });
      const finish = event => {
        if (!this.drag || this.drag.id !== event.pointerId) return;
        if (this.drag.moved) this.ignoreClickUntil = performance.now() + 250;
        this.drag = null;
        if (viewport.hasPointerCapture(event.pointerId)) viewport.releasePointerCapture(event.pointerId);
      };
      viewport.addEventListener('pointerup', finish);
      viewport.addEventListener('pointercancel', finish);
      viewport.addEventListener('lostpointercapture', () => { this.drag = null; });
      viewport.addEventListener('click', event => {
        if (performance.now() < (this.ignoreClickUntil || 0)) return;
        const el = event.target.closest('.map-node');
        if (el) this.onActivate(this.nodes.find(node => node.id === el.dataset.nodeId));
      });
      viewport.addEventListener('pointerover', event => {
        const el = event.target.closest('.map-node');
        if (el && !this.drag?.moved) this.highlight(el.dataset.nodeId);
      });
      viewport.addEventListener('pointerleave', () => this.highlight(this.focusedId()));
      viewport.addEventListener('pointerout', event => {
        if (!event.relatedTarget?.closest?.('.map-node')) this.highlight(this.focusedId());
      });
      viewport.addEventListener('focusin', event => this.highlight(event.target.closest('.map-node')?.dataset.nodeId));
      viewport.addEventListener('focusout', () => queueMicrotask(() => this.highlight(this.focusedId())));
      viewport.addEventListener('keydown', event => {
        const el = event.target.closest('.map-node');
        if (el && (event.key === 'Enter' || event.key === ' ')) {
          event.preventDefault(); this.onActivate(this.nodes.find(node => node.id === el.dataset.nodeId)); return;
        }
        if (event.key === '+' || event.key === '=') { event.preventDefault(); this.zoom(.15); }
        if (event.key === '-') { event.preventDefault(); this.zoom(-.15); }
        if (event.key === 'Home' || event.key === 'Escape') { event.preventDefault(); this.reset(); }
        const direction = { ArrowRight: [1, 0], ArrowLeft: [-1, 0], ArrowDown: [0, 1], ArrowUp: [0, -1] }[event.key];
        if (!direction) return;
        event.preventDefault();
        const current = this.nodes.find(node => node.id === el?.dataset.nodeId);
        if (!current) { this.panX -= direction[0] * 35; this.panY -= direction[1] * 35; this.draw(); return; }
        const next = this.nodes.filter(node => node !== current).map(node => {
          const dx = node.x - current.x, dy = node.y - current.y;
          const along = dx * direction[0] + dy * direction[1];
          return { node, along, score: Math.hypot(dx, dy) + Math.abs(dx * direction[1] - dy * direction[0]) * 2 };
        }).filter(item => item.along > 1).sort((a, b) => a.score - b.score)[0];
        if (next) { this.panX = 0; this.panY = 0; this.draw(); next.node.el.focus({ preventScroll: true }); next.node.el.scrollIntoView({ block: 'nearest', inline: 'nearest' }); }
      });
      viewport.addEventListener('wheel', event => {
        if (!event.ctrlKey && !event.metaKey) return;
        event.preventDefault(); this.zoom(event.deltaY > 0 ? -.1 : .1);
      }, { passive: false });
    }

    focusedId() { return this.svg.contains(document.activeElement) ? document.activeElement.dataset.nodeId : null; }

    setScene(nodes, edges, key) {
      const signature = JSON.stringify([key, nodes.map(n => [n.id, n.meta, n.verified, n.selected]), edges]);
      if (signature === this.signature) return;
      const focusId = this.focusedId();
      const changed = this.sceneKey !== key;
      this.nodes = nodes; this.edges = edges.map(edge => ({ ...edge }));
      this.signature = signature; this.sceneKey = key;
      this.highlightId = null;
      if (changed) { this.panX = 0; this.panY = 0; this.scale = 1; this.viewport.scrollTop = 0; this.viewport.scrollLeft = 0; }
      this.svg.replaceChildren();
      const defs = svgElement('defs');
      for (const [id, color] of [['map-arrow', '#9daea4'], ['map-arrow-active', '#245b47']]) {
        const marker = svgElement('marker', { id, viewBox: '0 0 10 10', refX: '9', refY: '5', markerWidth: '6', markerHeight: '6', orient: 'auto' });
        marker.append(svgElement('path', { d: 'M 0 0 L 10 5 L 0 10 z', fill: color })); defs.append(marker);
      }
      this.svg.append(defs);
      this.scene = svgElement('g', { class: 'map-scene' }); this.svg.append(this.scene);
      this.lanes = svgElement('g', { class: 'map-lanes', 'aria-hidden': 'true' }); this.scene.append(this.lanes);
      this.edgeGroup = svgElement('g', { class: 'map-edges', 'aria-hidden': 'true' }); this.scene.append(this.edgeGroup);
      this.edges.forEach(edge => {
        edge.el = svgElement('path', { class: 'map-edge', 'data-from': edge.from, 'data-to': edge.to, 'marker-end': 'url(#map-arrow)' });
        this.edgeGroup.append(edge.el);
      });
      this.nodeGroup = svgElement('g', { class: 'map-nodes' }); this.scene.append(this.nodeGroup);
      this.nodes.forEach((node, index) => {
        const el = svgElement('g', { class: 'map-node' + (node.selected ? ' is-focused' : '') + (node.verified ? ' is-proven' : ''), tabindex: '0', role: 'button', 'data-node-id': node.id, 'data-node-kind': node.kind, 'aria-label': node.ariaLabel, 'aria-pressed': String(Boolean(node.selected)) });
        if (node.kind === 'skill') el.dataset.skillId = node.id;
        const colorIndex = window.ATLAS_DATA.domains.findIndex(domain => domain.id === node.id || domain.skillIds.some(id => node.members.includes(id) || node.id.startsWith(id + ':')));
        el.style.setProperty('--node-color', palette[colorIndex < 0 ? 0 : colorIndex]);
        const rect = svgElement('rect', { class: 'map-node-bg', rx: '12' }); el.append(rect);
        const foreign = svgElement('foreignObject', { x: '0', y: '0' });
        const card = document.createElementNS(XHTML, 'div'); card.setAttribute('class', 'map-node-content');
        const top = document.createElementNS(XHTML, 'div'); top.setAttribute('class', 'map-node-top');
        const tag = document.createElementNS(XHTML, 'span'); tag.textContent = node.kind === 'topic' ? '学习内容 ' + String(index + 1).padStart(2, '0') : node.kind === 'domain' ? '知识领域' : node.kind === 'module' ? '学习模块' : '核心技能';
        const action = document.createElementNS(XHTML, 'span'); action.setAttribute('aria-hidden', 'true'); action.textContent = node.verified ? '✓' : node.kind === 'topic' ? '↗' : '+';
        top.append(tag, action);
        const title = document.createElementNS(XHTML, 'strong'); title.textContent = node.title;
        const meta = document.createElementNS(XHTML, 'small'); meta.textContent = node.meta.replace(' · 点击展开', '');
        card.append(top, title, meta); foreign.append(card); el.append(foreign);
        this.nodeGroup.append(el); Object.assign(node, { el, rect, foreign });
      });
      this.svg.dataset.scene = key;
      this.layout();
      if (changed && !matchMedia('(prefers-reduced-motion:reduce)').matches) this.nodeGroup.animate([{ opacity: .3 }, { opacity: 1 }], { duration: 200 });
      if (focusId) this.nodes.find(node => node.id === focusId)?.el.focus({ preventScroll: true });
    }

    layout() {
      if (!this.scene || !this.viewport.clientWidth) return;
      const width = this.viewport.clientWidth;
      const cols = width >= 800 ? 3 : width >= 520 ? 2 : 1;
      const gutter = cols === 3 ? 46 : cols === 2 ? 40 : 24;
      const gap = cols === 3 ? 52 : 36;
      const cardWidth = (width - gutter * 2 - gap * (cols - 1)) / cols;
      const cardHeight = 126, rowHeight = 158;
      const grouped = cols === 3 && this.nodes.some(node => node.kind === 'domain');
      let rows = 0;
      this.lanes.replaceChildren();
      const visual = [];
      if (grouped) {
        rootGroups.forEach((group, col) => {
          const members = group.ids.map(id => this.nodes.find(n => n.id === id)).filter(Boolean);
          if (!members.length) return;
          const label = svgElement('text', { x: gutter + col * (cardWidth + gap), y: '30', class: 'map-lane-label' }); label.textContent = group.title; this.lanes.append(label);
          members.forEach((node, row) => { node.col = col; node.row = row; visual.push(node); });
          rows = Math.max(rows, members.length);
        });
      } else {
        this.nodes.forEach((node, index) => { node.col = index % cols; node.row = Math.floor(index / cols); visual.push(node); });
        rows = Math.ceil(this.nodes.length / cols);
      }
      visual.sort((a, b) => a.row - b.row || a.col - b.col).forEach(node => {
        node.x = gutter + node.col * (cardWidth + gap); node.y = (grouped ? 52 : 28) + node.row * rowHeight;
        node.w = cardWidth; node.h = cardHeight;
        node.el.setAttribute('transform', `translate(${node.x} ${node.y})`);
        for (const el of [node.rect, node.foreign]) { el.setAttribute('width', cardWidth); el.setAttribute('height', cardHeight); }
        this.nodeGroup.append(node.el);
      });
      this.width = width; this.height = Math.max(420, rows * rowHeight + (grouped ? 52 : 28) + 12);
      this.svg.setAttribute('viewBox', `0 0 ${width} ${this.height}`);
      const byId = Object.fromEntries(this.nodes.map(node => [node.id, node]));
      this.edges.forEach(edge => {
        const a = byId[edge.from], b = byId[edge.to]; if (!a || !b) return;
        const right = b.x > a.x, below = b.y > a.y;
        let x1, y1, x2, y2, path;
        if (Math.abs(a.col - b.col) > 1) {
          // A direct curve across several columns would disappear under another card.
          x1 = right ? a.x + a.w + 2 : a.x - 2; y1 = a.y + a.h / 2;
          const corridor = right ? a.x + a.w + gap / 2 : a.x - gap / 2;
          const crossY = b.y - 16;
          path = roundedRoute([[x1, y1], [corridor, y1], [corridor, crossY], [b.x + b.w / 2, crossY], [b.x + b.w / 2, b.y - 7]]);
        } else if (a.col !== b.col) {
          x1 = right ? a.x + a.w + 2 : a.x - 2; y1 = a.y + a.h / 2;
          x2 = right ? b.x - 7 : b.x + b.w + 7; y2 = b.y + b.h / 2;
          const bend = Math.max(24, Math.abs(x2 - x1) * .5) * (right ? 1 : -1);
          path = `M ${x1} ${y1} C ${x1 + bend} ${y1}, ${x2 - bend} ${y2}, ${x2} ${y2}`;
        } else if (Math.abs(a.row - b.row) > 1) {
          const corridor = a.x + a.w + Math.min(gutter, gap) / 2;
          path = roundedRoute([[a.x + a.w + 2, a.y + a.h / 2], [corridor, a.y + a.h / 2], [corridor, b.y + b.h / 2], [b.x + b.w + 7, b.y + b.h / 2]]);
        } else {
          x1 = a.x + a.w * .56; y1 = below ? a.y + a.h + 2 : a.y - 2;
          x2 = b.x + b.w * .56; y2 = below ? b.y - 7 : b.y + b.h + 7;
          path = `M ${x1} ${y1} C ${x1} ${(y1 + y2) / 2}, ${x2} ${(y1 + y2) / 2}, ${x2} ${y2}`;
        }
        edge.el.setAttribute('d', path);
      });
      this.draw(); this.highlight(this.highlightId);
    }

    highlight(id) {
      this.highlightId = id || null;
      const related = new Set(id ? [id] : []);
      this.edges.forEach(edge => {
        const active = Boolean(id && (edge.from === id || edge.to === id));
        if (active) { related.add(edge.from); related.add(edge.to); }
        edge.el.classList.toggle('is-active', active);
        edge.el.setAttribute('marker-end', active ? 'url(#map-arrow-active)' : 'url(#map-arrow)');
      });
      this.svg.classList.toggle('has-highlight', Boolean(id));
      this.svg.classList.toggle('show-all-edges', this.showAll);
      this.nodes.forEach(node => node.el.classList.toggle('is-unrelated', Boolean(id && !related.has(node.id))));
      const node = this.nodes.find(n => n.id === id);
      const incoming = this.edges.filter(e => e.to === id).length, outgoing = this.edges.filter(e => e.from === id).length;
      const hint = document.querySelector('#map-context');
      if (hint) hint.textContent = node ? node.kind === 'topic' ? '点击内容，查看学习要求' : `${node.title}：${incoming} 项前置，${outgoing} 项后续` : this.nodes[0]?.kind === 'topic' ? '点击内容，查看学习要求与验证成果' : this.edges.length ? '悬停或聚焦节点，查看相关依赖' : '点击节点继续展开学习内容';
      const toggle = document.querySelector('#toggle-relations');
      if (toggle) toggle.disabled = this.edges.length === 0;
    }

    draw() {
      if (!this.scene) return;
      const limitX = this.width * this.scale * .6, limitY = this.height * this.scale * .6;
      this.panX = Math.max(-limitX, Math.min(limitX, this.panX)); this.panY = Math.max(-limitY, Math.min(limitY, this.panY));
      // Grow the SVG itself so zoomed content remains reachable by native touch scrolling.
      this.svg.style.width = this.width * this.scale + 'px';
      this.svg.style.height = this.height * this.scale + 'px';
      this.scene.setAttribute('transform', `translate(${this.panX / this.scale} ${this.panY / this.scale})`);
      this.svg.dataset.zoom = this.scale.toFixed(2); this.svg.dataset.pan = this.panX.toFixed(1) + ',' + this.panY.toFixed(1);
      const output = document.querySelector('#map-zoom'); if (output) output.textContent = Math.round(this.scale * 100) + '%';
    }
    zoom(delta) {
      const centerX = (this.viewport.scrollLeft + this.viewport.clientWidth / 2) / this.scale;
      const centerY = (this.viewport.scrollTop + this.viewport.clientHeight / 2) / this.scale;
      this.scale = Math.max(.7, Math.min(1.6, this.scale + delta)); this.draw();
      this.viewport.scrollLeft = centerX * this.scale - this.viewport.clientWidth / 2;
      this.viewport.scrollTop = centerY * this.scale - this.viewport.clientHeight / 2;
    }
    reset() { this.scale = 1; this.panX = 0; this.panY = 0; this.draw(); this.viewport.scrollTop = 0; this.viewport.scrollLeft = 0; }
    setVisible(visible) { this.visible = visible; if (visible) this.layout(); }
    setRelations(showAll) { this.showAll = showAll; this.highlight(this.highlightId); }
  }
  window.AtlasMap = AtlasMap;
})();
