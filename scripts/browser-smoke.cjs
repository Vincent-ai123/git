const assert = require("assert/strict");
const { spawn, spawnSync } = require("child_process");
const fs = require("fs");
const os = require("os");
const path = require("path");
const net = require("net");
// Compare browser snapshots with plain values rather than VM-realm array prototypes.
const data = JSON.parse(JSON.stringify(require("./load-data.cjs")));
const edge = process.env.EDGE_BIN || "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";
if (!fs.existsSync(edge)) {
  console.error("Browser verification requires Chromium; set EDGE_BIN to its executable path.");
  process.exit(1);
}
const tempRoot = path.resolve(os.tmpdir());
const profile = fs.mkdtempSync(path.join(tempRoot, "career-skill-atlas-test-"));
const screenshots = path.resolve(process.env.ATLAS_SCREENSHOT_DIR || path.join(tempRoot, "career-skill-atlas-preview"));
const downloads = path.join(profile, "downloads");
fs.mkdirSync(screenshots, { recursive: true });
fs.mkdirSync(downloads);
let browser, server, socket;
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
async function until(check, label, attempts = 80) {
  for (let i = 0; i < attempts; i++) { if (await check()) return; await wait(100); }
  throw new Error("Timed out: " + label);
}
async function freePort() {
  const candidate = net.createServer();
  await new Promise((resolve, reject) => candidate.once("error", reject).listen(0, "127.0.0.1", resolve));
  const port = candidate.address().port;
  await new Promise((resolve) => candidate.close(resolve));
  return port;
}
async function main() {
  const serverPort = await freePort(), origin = "http://127.0.0.1:" + serverPort;
  server = spawn(process.execPath, [path.join(__dirname, "serve.cjs")], {
    env: { ...process.env, PORT: String(serverPort) }, stdio: "ignore", windowsHide: true
  });
  await until(async () => { try { return (await fetch(origin)).ok; } catch { return false; } }, "test server");
  const debugPort = await freePort();
  browser = spawn(edge, ["--headless=new", "--disable-gpu", "--no-first-run", "--no-sandbox", "--no-proxy-server", "--remote-debugging-port=" + debugPort, "--remote-allow-origins=*", "--user-data-dir=" + profile, "about:blank"], { stdio: "ignore", windowsHide: true });
  let page;
  await until(async () => {
    try { page = (await (await fetch("http://127.0.0.1:" + debugPort + "/json")).json()).find((item) => item.type === "page"); } catch { return false; }
    return Boolean(page);
  }, "Edge DevTools");
  socket = new WebSocket(page.webSocketDebuggerUrl);
  await new Promise((resolve, reject) => { socket.onopen = resolve; socket.onerror = reject; });
  let nextId = 0;
  const pending = new Map(), browserErrors = [], localRequests = new Map();
  socket.onmessage = (event) => {
    const message = JSON.parse(event.data), p = message.params;
    if (message.method === "Runtime.exceptionThrown") browserErrors.push(p.exceptionDetails.exception?.description || p.exceptionDetails.text);
    if (message.method === "Runtime.consoleAPICalled" && p.type === "error") browserErrors.push(p.args.map((arg) => arg.value || arg.description).join(" "));
    if (message.method === "Network.responseReceived" && p.response.url.startsWith(origin)) {
      localRequests.set(new URL(p.response.url).pathname, p.response.status);
      if (p.response.status >= 400 && !p.response.url.endsWith("/favicon.ico")) browserErrors.push(p.response.status + " " + p.response.url);
    }
    if (message.id && pending.has(message.id)) {
      const item = pending.get(message.id); pending.delete(message.id); clearTimeout(item.timeout);
      if (message.error) item.reject(new Error(message.error.message)); else item.resolve(message.result);
    }
  };
  function send(method, params = {}) {
    const id = ++nextId;
    return new Promise((resolve, reject) => {
      const timeout = setTimeout(() => { pending.delete(id); reject(new Error("DevTools timeout: " + method)); }, 15000);
      pending.set(id, { resolve, reject, timeout }); socket.send(JSON.stringify({ id, method, params }));
    });
  }
  async function evaluate(expression) {
    const result = await send("Runtime.evaluate", { expression, returnByValue: true, awaitPromise: true });
    if (result.exceptionDetails) throw new Error(result.exceptionDetails.exception?.description || result.exceptionDetails.text);
    return result.result.value;
  }
  const click = (selector) => evaluate("document.querySelector(" + JSON.stringify(selector) + ").dispatchEvent(new MouseEvent('click',{bubbles:true}))");
  const choose = (selector, value) => evaluate("(()=>{const el=document.querySelector(" + JSON.stringify(selector) + ");el.value=" + JSON.stringify(value) + ";el.dispatchEvent(new Event('change',{bubbles:true}));})()");
  const queryIds = (selector) => evaluate("[...document.querySelectorAll(" + JSON.stringify(selector) + ")].map(el=>el.dataset.skillId)");
  async function ready() {
    await until(() => evaluate("Boolean(window.ATLAS_DATA) && document.querySelectorAll('.role-card').length===" + data.roles.length), "real application initialization");
  }
  async function screenshot(name, section) {
    await evaluate(section ? "document.querySelector(" + JSON.stringify(section) + ").scrollIntoView({behavior:'instant',block:'start'})" : "window.scrollTo({top:0,behavior:'instant'})");
    await wait(150);
    const capture = await send("Page.captureScreenshot", { format: "png" });
    fs.writeFileSync(path.join(screenshots, name + ".png"), Buffer.from(capture.data, "base64"));
  }
  async function metrics(width, height = 900) {
    await send("Emulation.setDeviceMetricsOverride", { width, height, deviceScaleFactor: 1, mobile: width <= 760 });
    await wait(100);
  }
  await send("Page.enable"); await send("Runtime.enable"); await send("Network.enable");
  await metrics(1440);
  await send("Page.navigate", { url: origin });
  await ready();
  await evaluate("document.fonts.ready.then(()=>true)");
  const nodeIds = () => evaluate("[...document.querySelectorAll('.map-node')].map(el=>el.dataset.nodeId).sort()");
  const listIds = () => evaluate("[...document.querySelectorAll('.adjacency-title')].map(el=>el.dataset.mapId).sort()");
  const level = () => evaluate("document.querySelector('#network-level-kicker').textContent");
  const pan = () => evaluate("document.querySelector('#knowledge-network').dataset.pan");
  async function readableLabels(context) {
    await evaluate("document.querySelector('#network-viewport').scrollIntoView({behavior:'instant',block:'center'})");
    await wait(120);
    // Flush the rendered frame after device emulation before inspecting nested SVG bounds.
    await send('Page.captureScreenshot',{format:'png'});
    const issues=await evaluate(`(()=>{
      const viewport=document.querySelector('#knowledge-network').getBoundingClientRect();
      const labels=[...document.querySelectorAll('.map-node-bg')].map(el=>({id:el.closest('.map-node').dataset.nodeId,box:el.getBoundingClientRect()}));
      const issues=[];
      for(const card of document.querySelectorAll('.map-node-content')) {
        if(card.scrollHeight>card.clientHeight+1)issues.push('text clipped '+card.querySelector('strong').textContent);
        if(card.querySelector('strong').scrollWidth>card.querySelector('strong').clientWidth+1)issues.push('title clipped '+card.querySelector('strong').textContent);
      }
      for(let i=0;i<labels.length;i++) {
        const a=labels[i];
        if(a.box.left<viewport.left-1||a.box.right>viewport.right+1||a.box.top<viewport.top-1||a.box.bottom>viewport.bottom+1)issues.push('clipped '+a.id);
        for(const b of labels.slice(i+1))if(Math.min(a.box.right,b.box.right)-Math.max(a.box.left,b.box.left)>1&&Math.min(a.box.bottom,b.box.bottom)-Math.max(a.box.top,b.box.top)>1)issues.push(a.id+' overlaps '+b.id);
      }
      // Sample actual rendered paths, excluding their endpoints, to catch edges hidden by unrelated cards.
      for(const edge of document.querySelectorAll('.map-edge')) {
        const length=edge.getTotalLength();
        for(let step=1;step<40;step++) {
          const point=edge.getPointAtLength(length*step/40).matrixTransform(edge.getScreenCTM());
          const hit=labels.find(node=>node.id!==edge.dataset.from&&node.id!==edge.dataset.to&&point.x>node.box.left+1&&point.x<node.box.right-1&&point.y>node.box.top+1&&point.y<node.box.bottom-1);
          if(hit){issues.push('edge '+edge.dataset.from+' > '+edge.dataset.to+' crosses '+hit.id);break;}
        }
      }
      return {issues,viewport:viewport.toJSON(),viewBox:document.querySelector('#knowledge-network').getAttribute('viewBox'),labels:labels.map(l=>({id:l.id,box:l.box.toJSON()}))};
    })()`);
    if(issues.issues.length) {
      console.error(JSON.stringify(issues));
      await screenshot('label-overlap-'+context.replace(/\W+/g,'-'),'#network-viewport');
      console.error(await evaluate("(()=>{const s=document.querySelector('#knowledge-network'),v=document.querySelector('#network-viewport');return JSON.stringify({context:"+JSON.stringify(context)+",viewBox:s.getAttribute('viewBox'),viewport:s.getBoundingClientRect().toJSON(),width:v.clientWidth,height:v.clientHeight});})()"));
    }
    assert.deepEqual(issues.issues,[],context+' labels should fit without overlap');
  }
  async function pointerActivate(id) {
    const selector='.map-node[data-node-id="'+id+'"] .map-node-bg';
    await evaluate("document.querySelector('#network-viewport').scrollIntoView({behavior:'instant',block:'center'})");
    await evaluate("document.querySelector("+JSON.stringify(selector)+").scrollIntoView({behavior:'instant',block:'nearest',inline:'nearest'})");
    const point=await evaluate("(()=>{const r=document.querySelector("+JSON.stringify(selector)+").getBoundingClientRect();return {x:r.x+r.width/2,y:r.y+r.height/2};})()");
    await send('Input.dispatchMouseEvent',{type:'mouseMoved',...point});
    await send('Input.dispatchMouseEvent',{type:'mousePressed',...point,button:'left',clickCount:1});
    await send('Input.dispatchMouseEvent',{type:'mouseReleased',...point,button:'left',clickCount:1});
  }
  async function key(key, code, virtual) {
    await send("Input.dispatchKeyEvent", { type:"keyDown", key, code, windowsVirtualKeyCode:virtual });
    await send("Input.dispatchKeyEvent", { type:"keyUp", key, code, windowsVirtualKeyCode:virtual });
  }
  async function activate(id, kind = "domain") {
    const selector='.map-node[data-node-kind="'+kind+'"][data-node-id="'+id+'"]';
    await evaluate("document.querySelector("+JSON.stringify(selector)+").focus({preventScroll:true})");
    await key("Enter","Enter",13);
  }
  const initial = await evaluate("({roles:document.querySelectorAll('.role-card').length,skills:document.querySelectorAll('.skill-card').length,nodes:document.querySelectorAll('.map-node').length,jds:document.querySelectorAll('#jd-library .jd-card').length})");
  assert.deepEqual(initial, {roles:data.roles.length,skills:data.skills.length,nodes:data.domains.length,jds:data.jdEvidence.length});
  assert.deepEqual(await nodeIds(), data.domains.map(d=>d.id).sort());
  assert.deepEqual(await listIds(), await nodeIds());
  assert.equal(await evaluate("document.querySelector('#skill-library-details').open"),false,"Full skill library should start collapsed");
  assert.ok(await evaluate("document.querySelectorAll('.map-edge').length>0 && [...document.querySelectorAll('.map-node')].every(n=>n.querySelector('strong').textContent.length>0)"),"Map should show named nodes and dependencies");
  for (const asset of ["/","/app.js","/map.js","/data.js","/styles.css"]) assert.equal(localRequests.get(asset),200,"App asset did not load: "+asset);
  await screenshot("desktop-overview");
  await screenshot("desktop-concepts","#network");
  await screenshot("desktop-map",".network-card");
  await readableLabels('Desktop concepts');

  // Nodes stay still while reading; reveal dependencies on focus, then test real input.
  await evaluate("document.querySelector('#network-viewport').scrollIntoView({behavior:'instant',block:'center'});document.activeElement.blur()");
  await send("Input.dispatchMouseEvent",{type:"mouseMoved",x:2,y:2});
  const still=await pan();await wait(250);assert.equal(await pan(),still,"Map must stay still while reading");
  await click('#toggle-relations');
  assert.ok(await evaluate("document.querySelector('#knowledge-network').classList.contains('show-all-edges')&&document.querySelector('#toggle-relations').getAttribute('aria-pressed')==='true'"));
  await click('#toggle-relations');
  await evaluate("document.querySelector('.map-node').focus({preventScroll:true})");
  assert.ok(await evaluate("document.querySelectorAll('.map-edge.is-active').length>0&&document.querySelector('#knowledge-network').classList.contains('has-highlight')"));
  const firstFocus=await evaluate("document.activeElement.dataset.nodeId");
  await key('ArrowRight','ArrowRight',39);
  assert.notEqual(await evaluate("document.activeElement.dataset.nodeId"),firstFocus,"Arrow keys should move between nodes");
  await screenshot('desktop-dependencies','#network');
  await click("#zoom-in");assert.ok(await evaluate("Number(document.querySelector('#knowledge-network').dataset.zoom)>1"));
  for(let i=0;i<4;i++)await click('#zoom-in');
  assert.equal(await evaluate("document.querySelector('#knowledge-network').dataset.zoom"),'1.60');
  assert.ok(await evaluate("(()=>{const v=document.querySelector('#network-viewport');v.scrollLeft=v.scrollWidth;v.scrollTop=v.scrollHeight;return v.scrollLeft>0&&v.scrollTop>0;})()"),'Zoomed map must remain reachable with native scrolling');
  await click("#reset-camera");assert.equal(await evaluate("document.querySelector('#knowledge-network').dataset.zoom"),"1.00");
  await evaluate("document.querySelector('#network-viewport').focus({preventScroll:true})");
  const beforeKeyboard=await pan();await key("ArrowRight","ArrowRight",39);assert.notEqual(await pan(),beforeKeyboard);
  const box=await evaluate("(()=>{const r=document.querySelector('#network-viewport').getBoundingClientRect();return {x:r.x+15,y:r.y+30}})()");
  const beforeDrag=await pan();
  await send("Input.dispatchMouseEvent",{type:"mouseMoved",x:box.x,y:box.y});
  await send("Input.dispatchMouseEvent",{type:"mousePressed",x:box.x,y:box.y,button:"left",clickCount:1});
  await send("Input.dispatchMouseEvent",{type:"mouseMoved",x:box.x+80,y:box.y+30,button:"left",buttons:1});
  await send("Input.dispatchMouseEvent",{type:"mouseReleased",x:box.x+80,y:box.y+30,button:"left",clickCount:1});
  assert.notEqual(await pan(),beforeDrag,"Dragging should pan the map");
  assert.equal(await level(),"01 / CONCEPTS","Dragging must not open a node");
  await click("#reset-camera");

  // Drill through all four levels. Browser navigation and breadcrumbs restore scope.
  const trading=data.domains.find(d=>d.id==='trading-research'), eventModule=trading.modules.find(m=>m.id==='event-engine');
  await wait(350);await pointerActivate(trading.id);assert.equal(await level(),"02 / MODULES");
  assert.deepEqual(await nodeIds(),trading.modules.map(m=>m.id).sort());
  assert.equal(await evaluate("document.activeElement.id"),"network-level-title");
  await activate(eventModule.id,"module");assert.equal(await level(),"03 / SKILLS");
  assert.deepEqual(await nodeIds(),eventModule.skillIds.slice().sort());
  await evaluate("history.back()");await until(async()=>await level()==="02 / MODULES","browser back to concept");
  await evaluate("history.forward()");await until(async()=>await level()==="03 / SKILLS","browser forward to module");
  await activate("orderbook","skill");assert.equal(await level(),"04 / LEARNING TOPICS");
  assert.equal(await evaluate("document.activeElement.id"),"skill-detail-title");
  assert.equal((await nodeIds()).length,data.skills.find(s=>s.id==='orderbook').topics.length);
  assert.equal(await evaluate("document.querySelectorAll('#skill-detail-content .topic-list li').length"),data.skills.find(s=>s.id==='orderbook').topics.length);
  assert.ok(await evaluate("location.search.includes('domain=trading-research')&&location.search.includes('module=event-engine')&&location.search.includes('skill=orderbook')"));
  await activate("orderbook:0","topic");
  assert.ok(await evaluate("!document.querySelector('#topic-focus').hidden&&document.querySelector('.topic-list li').classList.contains('is-current-topic')"));
  await screenshot("desktop-learning-topics","#network");
  await readableLabels('Desktop learning topics');
  await click("#map-back");assert.equal(await level(),"03 / SKILLS");
  await click('#network-breadcrumbs [data-map-kind="domain"]');assert.equal(await level(),"02 / MODULES");
  await click("#map-back");assert.equal(await level(),"01 / CONCEPTS");
  assert.ok(await evaluate("document.querySelector('#map-back').disabled"));

  // A pre-existing v1 record and obsolete IDs must be handled without losing retained progress.
  await evaluate("localStorage.setItem('career-skill-atlas-progress-v1',JSON.stringify({rag:'verified',git:'learning','html-css':'verified'}))");
  await send("Page.navigate",{url:origin+"/?role=ai-app&skill=rag"});await ready();
  assert.equal(await evaluate("document.querySelector('#progress-status').value"),"verified");
  assert.equal(await evaluate("document.querySelector('#path-role').value"),"ai-app");
  assert.equal(await evaluate("document.querySelector('.selected-role-header h3').textContent"),data.roles.find(r=>r.id==='ai-app').title);
  await choose("#progress-status","explain");
  assert.deepEqual(await evaluate("JSON.parse(localStorage.getItem('career-skill-atlas-progress-v1'))"),{git:"learning",rag:"explain"});
  await choose("#progress-status","verified");
  await click("#trace-dependencies");
  const closure=new Set();
  function collect(id){if(closure.has(id))return;closure.add(id);data.skills.find(s=>s.id===id).prerequisites.forEach(collect);}
  collect("rag");
  assert.equal(await level(),"01 / CONCEPTS","Dependency view should stay grouped");
  assert.deepEqual(await nodeIds(),data.domains.filter(d=>d.skillIds.some(id=>closure.has(id))).map(d=>d.id).sort());
  assert.deepEqual(await nodeIds(),await listIds());
  // Enumerate this small prerequisite tree through the actual UI, never a flat full-map view.
  const traced=[];
  for(const domain of data.domains.filter(d=>d.skillIds.some(id=>closure.has(id)))) {
    await click('#network-breadcrumbs [data-map-kind="root"]');
    await activate(domain.id);
    for(const module of domain.modules.filter(m=>m.skillIds.some(id=>closure.has(id)))) {
      await activate(module.id,"module");
      const expected=module.skillIds.filter(id=>closure.has(id)).sort();
      assert.deepEqual(await nodeIds(),expected);assert.deepEqual(await listIds(),expected);traced.push(...expected);
      await click("#map-back");
    }
  }
  assert.deepEqual(traced.sort(),[...closure].sort());
  await click('[data-network-view="list"]');
  assert.ok(await evaluate("document.querySelector('#network-viewport').hidden&&!document.querySelector('#network-list').hidden"));
  await click("#trace-dependencies");await click("#reset-network");
  await click('.adjacency-title[data-map-id="workflow"]');assert.equal(await level(),"02 / MODULES");
  await click('.adjacency-title[data-map-id="terminal-git"]');assert.equal(await level(),"03 / SKILLS");
  await click('.adjacency-title[data-map-id="git"]');assert.equal(await level(),"04 / LEARNING TOPICS");
  await click('.adjacency-title[data-map-id="git:0"]');assert.ok(await evaluate("!document.querySelector('#topic-focus').hidden"));
  await click('[data-network-view="graph"]');
  await click("#reset-network");

  await click('[data-group="data-ai"]');
  assert.equal(await evaluate("document.querySelectorAll('.role-card').length"),data.roles.filter(r=>r.group==='data-ai').length);
  await click('[data-role-id="ai-app"]');
  assert.ok((await queryIds('.path-chain [data-skill-id]')).includes('rag'));
  await choose("#path-role","backend");await choose('[data-path-choice="0"]',"java");
  const javaPath=await queryIds('.path-chain [data-skill-id]');
  assert.ok(javaPath.includes('java')&&!javaPath.includes('go'),"Backend language alternatives must stay independent");
  await screenshot("desktop-backend-path","#roadmap");
  await choose("#jd-role-filter","fintech-backend");
  assert.equal(await evaluate("document.querySelectorAll('#jd-library .jd-card').length"),data.jdEvidence.filter(j=>j.roleIds.includes('fintech-backend')).length);
  await click("#jd-library .jd-card summary");
  assert.ok(await evaluate("(()=>{const card=document.querySelector('#jd-library .jd-card');return card.open&&card.querySelector('.jd-body h4').textContent.includes('资格')&&card.querySelector('.jd-original').href.startsWith('https://');})()"));
  await click('[data-group="all"]');
  await evaluate("document.querySelector('#global-search').value='迭代器失效';document.querySelector('#global-search').dispatchEvent(new Event('input',{bubbles:true}))");
  assert.ok((await queryIds('.skill-card')).includes('cpp'),"Search must include concrete topics");
  assert.ok((await queryIds('.skill-card')).length<data.skills.length);
  assert.equal(await evaluate("document.querySelector('#skill-library-details').open"),true);
  await evaluate("document.querySelector('#global-search').value='';document.querySelector('#global-search').dispatchEvent(new Event('input',{bubbles:true}))");
  await send("Page.reload",{ignoreCache:true});await ready();
  assert.equal(await evaluate("document.querySelector('#path-role').value"),"backend");
  await click("#progress-filter");assert.equal(await evaluate("document.querySelectorAll('.skill-card').length"),data.skills.length-2);await click("#progress-filter");
  await evaluate("document.querySelector('#skill-library-details').open=true");
  await send("Browser.setDownloadBehavior",{behavior:"allow",downloadPath:downloads});await click("#export-progress");
  const exportedFile=path.join(downloads,"career-skill-atlas-progress.json");await until(()=>fs.existsSync(exportedFile),"exported progress file");
  const exported=JSON.parse(fs.readFileSync(exportedFile,"utf8"));assert.equal(exported.version,1);assert.equal(exported.skills.rag,"verified");
  async function importFile(content) {
    await evaluate("document.querySelector('#progress-message').textContent=''");
    await evaluate("(()=>{const transfer=new DataTransfer();transfer.items.add(new File(["+JSON.stringify(content)+"],'progress.json',{type:'application/json'}));const input=document.querySelector('#import-progress');input.files=transfer.files;input.dispatchEvent(new Event('change',{bubbles:true}));})()");
    await until(()=>evaluate("document.querySelector('#progress-message').textContent.length>0"),"import result");
    return evaluate("document.querySelector('#progress-message').textContent");
  }
  assert.ok((await importFile(JSON.stringify({version:1,skills:{git:"verified"}}))).includes("已合并 1"));
  assert.deepEqual(await evaluate("JSON.parse(localStorage.getItem('career-skill-atlas-progress-v1'))"),{git:"verified",rag:"verified"});
  assert.ok((await importFile("broken json")).includes("导入失败"));
  assert.ok((await importFile("null")).includes("格式不正确"));
  assert.ok((await importFile(JSON.stringify({version:1,skills:{rag:"invalid"}}))).includes("导入失败"));
  await evaluate("document.activeElement.blur()");await key("/","Slash",191);
  assert.equal(await evaluate("document.activeElement.id"),"global-search");

  await click("#reset-network");
  await send("Emulation.setEmulatedMedia",{features:[{name:"prefers-reduced-motion",value:"reduce"}]});
  assert.ok(await evaluate("matchMedia('(prefers-reduced-motion:reduce)').matches&&getComputedStyle(document.documentElement).scrollBehavior==='auto'"));
  await evaluate("document.querySelector('#network-viewport').scrollIntoView({behavior:'instant',block:'center'});document.activeElement.blur()");
  await send("Input.dispatchMouseEvent",{type:"mouseMoved",x:2,y:2});
  const reduced=await pan();await wait(200);assert.equal(await pan(),reduced);
  assert.ok(await evaluate("document.querySelector('#knowledge-network').getAnimations({subtree:true}).length===0"),"Reduced motion should disable map transitions");
  const layouts=[];
  for(const [width,height] of [[375,844],[390,844],[768,900],[844,390],[1024,900],[1440,900]]) {
    await metrics(width,height);
    await readableLabels('Layout '+width);
    const layout=await evaluate("({width:innerWidth,documentWidth:document.documentElement.scrollWidth,clientWidth:document.documentElement.clientWidth})");
    if(layout.documentWidth>layout.clientWidth)await screenshot("overflow-"+width,"#network");
    assert.ok(layout.documentWidth<=layout.clientWidth,"Page horizontal overflow: "+JSON.stringify(layout));layouts.push(layout);
  }
  await metrics(390,844);await send("Page.navigate",{url:origin});await ready();
  assert.ok(await evaluate("document.querySelector('#network-viewport').hidden&&!document.querySelector('#network-list').hidden"),"Phone should initially show the hierarchy list");
  await screenshot("mobile-overview");await screenshot("mobile-concepts","#network");
  await click('.adjacency-title[data-map-id="trading-research"]');
  await click('.adjacency-title[data-map-id="event-engine"]');
  await click('.adjacency-title[data-map-id="orderbook"]');
  await screenshot("mobile-topics","#network");
  await click('[data-network-view="graph"]');
  assert.ok(await evaluate("(()=>{const v=document.querySelector('#network-viewport');return !v.hidden&&v.scrollWidth===v.clientWidth&&document.querySelectorAll('.map-node').length===5;})()"),"Phone map must fit its own panel");
  await click("#zoom-in");assert.ok(await evaluate("Number(document.querySelector('#knowledge-network').dataset.zoom)>1"));
  for(let i=0;i<4;i++)await click('#zoom-in');
  assert.ok(await evaluate("(()=>{const v=document.querySelector('#network-viewport');v.scrollLeft=v.scrollWidth;v.scrollTop=v.scrollHeight;return v.scrollLeft>0&&v.scrollTop>0;})()"),'Zoomed phone map must remain reachable with native scrolling');
  await click('#reset-camera');
  await screenshot("mobile-map-topics","#network-viewport");
  await readableLabels('Phone learning topics');
  await pointerActivate('orderbook:0');
  assert.ok(await evaluate("(()=>{const r=document.querySelector('#topic-focus').getBoundingClientRect(),header=document.querySelector('.site-header').getBoundingClientRect();return !document.querySelector('#topic-focus').hidden&&r.top>=header.bottom&&r.bottom<innerHeight;})()"),'Phone topic activation should reveal its detail below the header');
  await screenshot('mobile-topic-detail','#skill-detail');
  await click("#reset-network");await screenshot("mobile-map-concepts","#network-viewport");
  await readableLabels('Phone concepts');
  await evaluate("document.querySelector('#network-viewport').scrollTop=300");
  assert.ok(await evaluate("document.querySelector('#network-viewport').scrollTop>0"),"Long phone maps should scroll vertically");
  await pointerActivate('workflow');assert.equal(await level(),'02 / MODULES','Phone labels should receive real pointer clicks');
  await send("Page.navigate",{url:origin+"/?role=quant-dev&skill=cpp"});await ready();
  assert.equal(await evaluate("document.querySelector('#path-role').value"),"cpp-systems","Old role bookmarks should resolve");
  assert.equal(await level(),"04 / LEARNING TOPICS");
  await send("Page.navigate",{url:origin+"/?role=__proto__&domain=__proto__&module=toString&skill=toString"});await ready();
  assert.equal(await level(),"01 / CONCEPTS");assert.equal(await evaluate("document.querySelector('#selection-kicker').textContent"),"ALL ROLES");
  // Readability must hold across all content, not just the order-book example.
  const allContentLayouts=[];
  for(const width of [375,1440]) {
    await metrics(width,900);
    const result=await evaluate(`(async()=>{
      document.querySelector('#reset-network').click();
      document.querySelector('[data-network-view="graph"]').click();
      const issues=[];let scopes=0,nodes=0;
      const frame=()=>new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve)));
      const check=async()=>{
        await frame();scopes++;
        for(const card of document.querySelectorAll('.map-node-content')) {
          nodes++;
          if(card.scrollHeight>card.clientHeight+1||card.scrollWidth>card.clientWidth+1)issues.push(card.querySelector('strong').textContent);
        }
      };
      const open=(kind,id)=>document.querySelector('.map-node[data-node-kind="'+kind+'"][data-node-id="'+id+'"]').dispatchEvent(new MouseEvent('click',{bubbles:true}));
      await check();
      for(const domain of window.ATLAS_DATA.domains) {
        document.querySelector('#reset-network').click();open('domain',domain.id);await check();
        for(const module of domain.modules) {
          open('module',module.id);await check();
          for(const id of module.skillIds) {
            open('skill',id);await check();document.querySelector('#map-back').click();
          }
          document.querySelector('#map-back').click();
        }
      }
      return {scopes,nodes,issues};
    })()`);
    assert.deepEqual(result.issues,[],"Every map title must fit at "+width+"px");
    assert.equal(result.scopes,1+data.domains.length+data.domains.reduce((sum,d)=>sum+d.modules.length,0)+data.skills.length);
    allContentLayouts.push({width,...result});
  }
  assert.deepEqual(browserErrors,[],"Browser JavaScript and local resource errors");
  console.log(JSON.stringify({desktop:initial,hierarchy:"four levels, breadcrumbs, browser back/forward",map:"dependency focus, keyboard, real pointer clicks, pan, zoom, scroll, readable nodes",prerequisiteSkills:closure.size,progressV1ReloadExportImport:"passed",searchAndJd:"passed",layouts,allContentLayouts,reducedMotion:"passed",browserErrors,screenshots},null,2));
}
main().catch((error) => { console.error(error.stack || error.message); process.exitCode = 1; }).finally(async () => {
  if (socket) socket.close();
  for (const processHandle of [browser, server]) {
    if (!processHandle) continue;
    if (process.platform === "win32" && processHandle.pid) spawnSync("taskkill", ["/PID", String(processHandle.pid), "/T", "/F"], { stdio: "ignore", windowsHide: true });
    processHandle.kill();
  }
  await wait(300);
  if (path.dirname(profile) === tempRoot && path.basename(profile).startsWith("career-skill-atlas-test-")) {
    try { fs.rmSync(profile, { recursive: true, force: true }); } catch { /* Windows may briefly retain a browser lock. */ }
  }
});
