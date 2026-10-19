/* A small perspective renderer. Geometry lives in 3D; SVG keeps nodes keyboard accessible. */
(function () {
  const NS = 'http://www.w3.org/2000/svg';
  const svgElement = (name, attrs = {}) => {
    const el = document.createElementNS(NS, name);
    Object.entries(attrs).forEach(([key,value])=>el.setAttribute(key,value));
    return el;
  };
  function wrap(text, limit) {
    const lines=[]; let line='', width=0;
    for(const token of text.match(/[A-Za-z0-9+#./]+|./gu)||[]) {
      const size=Array.from(token).reduce((n,c)=>n+(/[\x00-\x7f]/.test(c)?.54:1),0);
      if(line&&width+size>limit){lines.push(line.trim());line='';width=0;}
      line+=token; width+=size;
    }
    if(line.trim())lines.push(line.trim());
    return lines;
  }
  class AtlasSphere {
    constructor({viewport,svg,onActivate,onMotionChange}) {
      Object.assign(this,{viewport,svg,onActivate,onMotionChange,nodes:[],edges:[],wires:[],yaw:.25,pitch:-.12,scale:1,paused:false,hovered:false,focused:false,intersecting:false,visible:true,raf:0,lastTime:0,drag:null,ignoreClickUntil:0,sceneKey:null});
      this.media=matchMedia('(prefers-reduced-motion: reduce)');
      this.width=800; this.height=600;
      this.resizeObserver=new ResizeObserver(()=>this.resize());
      this.resizeObserver.observe(viewport);
      this.visibilityObserver=new IntersectionObserver(entries=>{
        this.intersecting=entries[0].isIntersecting; this.syncAnimation();
      },{rootMargin:'40px'});
      this.visibilityObserver.observe(viewport);
      this.media.addEventListener('change',()=>{this.syncAnimation();this.motionNotice();});
      document.addEventListener('visibilitychange',()=>this.syncAnimation());
      viewport.addEventListener('pointerenter',()=>{this.hovered=true;this.syncAnimation();});
      viewport.addEventListener('pointerleave',()=>{this.hovered=false;this.syncAnimation();});
      viewport.addEventListener('focusin',()=>{this.focused=true;this.syncAnimation();});
      viewport.addEventListener('focusout',()=>queueMicrotask(()=>{this.focused=viewport.contains(document.activeElement);this.syncAnimation();}));
      viewport.addEventListener('pointerdown',event=>{
        if(event.pointerType==='mouse'&&event.button!==0)return;
        this.drag={id:event.pointerId,x:event.clientX,y:event.clientY,startX:event.clientX,startY:event.clientY,moved:false};
        this.syncAnimation();
      });
      viewport.addEventListener('pointermove',event=>{
        const drag=this.drag;
        if(!drag||drag.id!==event.pointerId)return;
        if(!drag.moved&&Math.hypot(event.clientX-drag.startX,event.clientY-drag.startY)<6)return;
        drag.moved=true;
        if(!viewport.hasPointerCapture(event.pointerId))viewport.setPointerCapture(event.pointerId);
        this.rotate((event.clientX-drag.x)*.006,(event.clientY-drag.y)*.006);
        drag.x=event.clientX;drag.y=event.clientY;
      });
      const finish=event=>{
        if(!this.drag||this.drag.id!==event.pointerId)return;
        if(this.drag.moved)this.ignoreClickUntil=performance.now()+350;
        this.drag=null;
        if(viewport.hasPointerCapture(event.pointerId))viewport.releasePointerCapture(event.pointerId);
        this.syncAnimation();
      };
      viewport.addEventListener('pointerup',finish);
      viewport.addEventListener('pointercancel',finish);
      viewport.addEventListener('lostpointercapture',event=>{if(this.drag?.id===event.pointerId){this.drag=null;this.syncAnimation();}});
      viewport.addEventListener('click',event=>{
        if(performance.now()<this.ignoreClickUntil){event.preventDefault();return;}
        const el=event.target.closest('.sphere-node');
        if(el)this.onActivate(this.nodes.find(node=>node.id===el.dataset.nodeId));
      });
      viewport.addEventListener('keydown',event=>{
        const node=event.target.closest('.sphere-node');
        if(node&&(event.key==='Enter'||event.key===' ')) {
          event.preventDefault();this.onActivate(this.nodes.find(n=>n.id===node.dataset.nodeId));return;
        }
        const keys={ArrowLeft:[-.22,0],ArrowRight:[.22,0],ArrowUp:[0,-.22],ArrowDown:[0,.22]};
        if(keys[event.key]){event.preventDefault();this.rotate(...keys[event.key]);}
        if(event.key==='+'||event.key==='='){event.preventDefault();this.zoom(.12);}
        if(event.key==='-'){event.preventDefault();this.zoom(-.12);}
        if(event.key==='Home'){event.preventDefault();this.reset();}
        if(event.key===' '&&!node){event.preventDefault();this.setPaused(!this.paused);}
      });
      viewport.addEventListener('wheel',event=>{
        if(!event.ctrlKey&&!event.metaKey)return;
        event.preventDefault();this.zoom(event.deltaY>0?-.08:.08);
      },{passive:false});
      this.resize();this.motionNotice();
    }
    resize() {
      const box=this.viewport.getBoundingClientRect();
      if(!box.width||!box.height)return;
      this.width=box.width;this.height=box.height;
      this.svg.setAttribute('viewBox',`0 0 ${this.width} ${this.height}`);
      this.nodes.forEach(node=>{if(node.el&&node.compact!==(this.width<500))this.updateLabel(node);});
      this.draw();
    }
    updateLabel(node) {
      const compact=this.width<500, lines=wrap(node.title,compact?8:10), font=compact?12:14;
      node.compact=compact;node.labelWidth=compact?118:150;
      node.labelHeight=Math.max(44,lines.length*(font+5)+25);
      const group=node.labelGroup;group.replaceChildren();
      const top=-node.labelHeight/2;
      group.append(svgElement('rect',{'class':'sphere-label-bg',x:-node.labelWidth/2,y:top,width:node.labelWidth,height:node.labelHeight,rx:'8'}));
      const label=svgElement('text',{'class':'sphere-label','text-anchor':'middle','font-size':font,'aria-hidden':'true'});
      lines.forEach((line,index)=>{const span=svgElement('tspan',{x:0,y:top+20+index*(font+5)});span.textContent=line;label.append(span);});
      const meta=svgElement('text',{'class':'sphere-node-meta',x:0,y:node.labelHeight/2-7,'text-anchor':'middle','aria-hidden':'true'});meta.textContent=node.meta;
      group.append(label,meta);
    }
    placeLabels() {
      const boxes=this.nodes.map(node=>{
        const p=node.projected;
        return {node,x:p.x,y:p.y+(14+node.labelHeight/2)*p.scale,w:node.labelWidth*p.scale,h:node.labelHeight*p.scale};
      });
      const clamp=box=>{
        box.x=Math.max(8+box.w/2,Math.min(this.width-8-box.w/2,box.x));
        box.y=Math.max(8+box.h/2,Math.min(this.height-8-box.h/2,box.y));
      };
      boxes.forEach(clamp);
      // Keep labels readable while the dots retain their projected 3D positions.
      for(let pass=0;pass<80;pass++) {
        let overlaps=0;
        for(let i=0;i<boxes.length;i++)for(let j=i+1;j<boxes.length;j++) {
          const a=boxes[i],b=boxes[j],dx=b.x-a.x,dy=b.y-a.y;
          const ox=(a.w+b.w)/2+8-Math.abs(dx),oy=(a.h+b.h)/2+8-Math.abs(dy);
          if(ox<=.1||oy<=.1)continue;
          overlaps++;
          if(ox<oy) {
            const shift=(ox+.2)/2*(dx<0?-1:1);a.x-=shift;b.x+=shift;
          } else {
            const shift=(oy+.2)/2*(dy<0?-1:1);a.y-=shift;b.y+=shift;
          }
          clamp(a);clamp(b);
        }
        if(!overlaps)break;
      }
      boxes.forEach(box=>{
        const node=box.node,p=node.projected,dx=(box.x-p.x)/p.scale,dy=(box.y-p.y)/p.scale;
        node.labelGroup.setAttribute('transform',`translate(${dx.toFixed(2)} ${dy.toFixed(2)})`);
        node.leader.setAttribute('d',`M 0 0 L ${dx.toFixed(2)} ${dy.toFixed(2)}`);
      });
    }
    setScene(nodes,edges,key) {
      const focusId=this.svg.contains(document.activeElement)?document.activeElement.dataset.nodeId:null;
      this.nodes=nodes.map((node,index)=>{
        // Fibonacci positions distribute a small set of siblings over a unit sphere.
        const y=1-2*(index+.5)/nodes.length;
        const radial=Math.sqrt(1-y*y), theta=index*Math.PI*(3-Math.sqrt(5));
        return {...node,position:[Math.cos(theta)*radial,y,Math.sin(theta)*radial]};
      });
      this.edges=edges;
      this.svg.replaceChildren();
      const defs=svgElement('defs');
      const glow=svgElement('radialGradient',{id:'sphere-aura'});
      glow.append(svgElement('stop',{offset:'0%','stop-color':'#183d68','stop-opacity':'.4'}),svgElement('stop',{offset:'100%','stop-color':'#0c1728','stop-opacity':'0'}));
      const arrow=svgElement('marker',{id:'sphere-arrow',viewBox:'0 0 10 10',refX:'9',refY:'5',markerWidth:'5',markerHeight:'5',orient:'auto'});
      arrow.append(svgElement('path',{d:'M 0 1 L 9 5 L 0 9','fill':'none','stroke':'#87a8cf','stroke-width':'1.4'}));
      defs.append(glow,arrow);this.svg.append(defs);
      this.aura=svgElement('circle',{fill:'url(#sphere-aura)','aria-hidden':'true'});this.svg.append(this.aura);
      this.wireGroup=svgElement('g',{'class':'sphere-wire','aria-hidden':'true'});
      this.wires=[];
      for(let axis=0;axis<3;axis++)for(let offset=0;offset<2;offset++) {
        const points=Array.from({length:73},(_,i)=>{
          const angle=i/72*Math.PI*2, tilt=offset*Math.PI/3;
          const a=Math.cos(angle),b=Math.sin(angle);
          return axis===0?[a,b*Math.cos(tilt),b*Math.sin(tilt)]:axis===1?[b*Math.sin(tilt),a,b*Math.cos(tilt)]:[b*Math.cos(tilt),b*Math.sin(tilt),a];
        });
        const el=svgElement('path');this.wireGroup.append(el);this.wires.push({points,el});
      }
      this.svg.append(this.wireGroup);
      this.edgeGroup=svgElement('g',{'class':'sphere-edges','aria-hidden':'true'});
      this.edges=this.edges.map(edge=>{
        const el=svgElement('path',{'class':'network-edge sphere-edge','data-from':edge.from,'data-to':edge.to,'marker-end':'url(#sphere-arrow)'});
        this.edgeGroup.append(el);return {...edge,el};
      });
      this.svg.append(this.edgeGroup);
      this.nodeGroup=svgElement('g',{'class':'sphere-nodes'});this.svg.append(this.nodeGroup);
      this.depthOrder='';
      this.nodes.forEach(node=>{
        const el=svgElement('g',{'class':'network-node sphere-node'+(node.selected?' is-focused':'')+(node.verified?' is-proven':''),tabindex:'0',role:'button','data-node-id':node.id,'data-node-kind':node.kind,'aria-label':node.ariaLabel||node.title,'aria-pressed':String(Boolean(node.selected))});
        if(node.kind==='skill')el.dataset.skillId=node.id;
        el.style.setProperty('--node-color',node.color);
        const title=svgElement('title');title.textContent=node.ariaLabel||node.title;el.append(title);
        node.leader=svgElement('path',{'class':'sphere-label-leader','aria-hidden':'true'});el.append(node.leader);
        el.append(svgElement('circle',{'class':'sphere-node-halo',r:'20',fill:node.color}),svgElement('circle',{'class':'sphere-dot',r:'7',fill:node.color}));
        node.labelGroup=svgElement('g',{'class':'sphere-node-label'});el.append(node.labelGroup);
        this.updateLabel(node);this.nodeGroup.append(el);node.el=el;
      });
      this.svg.dataset.scene=key;
      this.sceneKey=key;
      this.draw();
      if(focusId)this.nodes.find(n=>n.id===focusId)?.el.focus({preventScroll:true});
      this.syncAnimation();
    }
    project(point) {
      const [x,y,z]=point, cy=Math.cos(this.yaw),sy=Math.sin(this.yaw),cx=Math.cos(this.pitch),sx=Math.sin(this.pitch);
      const rx=x*cy+z*sy, rz=-x*sy+z*cy;
      const ry=y*cx-rz*sx, depth=y*sx+rz*cx;
      const perspective=4.4/(4.4-depth);
      const radius=Math.min(this.width*.30,this.height*.32)*this.scale;
      return {x:this.width/2+rx*radius*perspective,y:this.height*.44-ry*radius*perspective,z:depth,scale:.90+perspective*.10};
    }
    draw() {
      if(!this.aura)return;
      const radius=Math.min(this.width*.30,this.height*.32)*this.scale;
      this.aura.setAttribute('cx',this.width/2);this.aura.setAttribute('cy',this.height*.44);this.aura.setAttribute('r',radius*1.7);
      const path=points=>points.map((point,i)=>{const p=this.project(point);return (i?'L':'M')+p.x.toFixed(2)+' '+p.y.toFixed(2);}).join(' ');
      this.wires.forEach(wire=>wire.el.setAttribute('d',path(wire.points)));
      const byId=Object.fromEntries(this.nodes.map(n=>[n.id,n]));
      this.nodes.forEach(node=>{
        const p=this.project(node.position);node.projected=p;
        node.el.setAttribute('transform',`translate(${p.x.toFixed(2)} ${p.y.toFixed(2)}) scale(${p.scale.toFixed(3)})`);
        node.el.classList.toggle('is-behind',p.z<0);
      });
      this.placeLabels();
      this.edges.forEach(edge=>{
        const a=byId[edge.from],b=byId[edge.to];if(!a||!b)return;
        const points=Array.from({length:19},(_,i)=>{
          const t=i/18*.94;
          const p=a.position.map((v,k)=>v*(1-t)+b.position[k]*t);
          const norm=Math.hypot(...p)||1;
          return p.map(v=>v/norm*.97);
        });
        edge.el.setAttribute('d',path(points));
        edge.el.style.opacity=String(.25+(a.projected.z+b.projected.z+2)/4*.35);
      });
      // CSS z-order is not available inside SVG. Only reorder when depth order changes.
      const sorted=[...this.nodes].sort((a,b)=>a.projected.z-b.projected.z).map(n=>n.id).join('|');
      if(sorted!==this.depthOrder&&!this.focused){[...this.nodes].sort((a,b)=>a.projected.z-b.projected.z).forEach(n=>this.nodeGroup.append(n.el));this.depthOrder=sorted;}
      this.svg.dataset.orientation=this.yaw.toFixed(4)+','+this.pitch.toFixed(4);
      this.svg.dataset.zoom=this.scale.toFixed(2);
    }
    rotate(yaw,pitch) {this.yaw+=yaw;this.pitch=Math.max(-1.25,Math.min(1.25,this.pitch+pitch));this.draw();}
    zoom(delta) {this.scale=Math.max(.65,Math.min(1.25,this.scale+delta));this.draw();}
    reset() {this.yaw=.25;this.pitch=-.12;this.scale=1;this.draw();}
    setPaused(paused) {this.paused=paused;this.syncAnimation();this.motionNotice();}
    setVisible(visible) {this.visible=visible;if(visible)this.resize();this.syncAnimation();}
    motionNotice() {this.onMotionChange?.({paused:this.paused,reduced:this.media.matches});}
    syncAnimation() {
      const run=this.visible&&this.intersecting&&!document.hidden&&!this.media.matches&&!this.paused&&!this.hovered&&!this.focused&&!this.drag;
      this.svg.dataset.rotating=String(run);
      if(!run){cancelAnimationFrame(this.raf);this.raf=0;this.lastTime=0;return;}
      if(this.raf)return;
      const tick=time=>{
        if(this.lastTime)this.yaw+=Math.min(50,time-this.lastTime)*.00007;
        this.lastTime=time;this.draw();this.raf=requestAnimationFrame(tick);
      };
      this.raf=requestAnimationFrame(tick);
    }
  }
  window.AtlasSphere=AtlasSphere;
})();
