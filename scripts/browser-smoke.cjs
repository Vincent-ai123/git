const assert = require("assert/strict");
const { spawn, spawnSync } = require("child_process");
const fs = require("fs");
const os = require("os");
const path = require("path");
const net = require("net");
const data = require("./load-data.cjs");
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
  const click = (selector) => evaluate("document.querySelector(" + JSON.stringify(selector) + ").click()");
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
  const initial = await evaluate("({roles:document.querySelectorAll('.role-card').length,skills:document.querySelectorAll('.skill-card').length,nodes:document.querySelectorAll('.network-node').length,edges:document.querySelectorAll('.network-edge').length,jds:document.querySelectorAll('#jd-library .jd-card').length})");
  assert.deepEqual(initial, { roles: data.roles.length, skills: data.skills.length, nodes: data.skills.length, edges: data.skills.reduce((sum, skill) => sum + skill.prerequisites.length, 0), jds: data.jdEvidence.length });
  for (const asset of ["/", "/app.js", "/data.js", "/styles.css"]) assert.equal(localRequests.get(asset), 200, "App asset did not load: " + asset);
  await screenshot("desktop-overview");
  await screenshot("desktop-full-network", "#network");
  await click('[data-group="data-ai"]');
  assert.equal(await evaluate("document.querySelectorAll('.role-card').length"), data.roles.filter((role) => role.group === "data-ai").length);
  await click('[data-role-id="ai-app"]');
  assert.equal(await evaluate("document.querySelector('#path-role').value"), "ai-app");
  assert.equal(await evaluate("document.querySelector('.selected-role-header h3').textContent"), data.roles.find((role) => role.id === "ai-app").title);
  assert.ok(await evaluate("document.querySelectorAll('.network-node.is-prerequisite').length>0"));
  await choose('[data-path-choice="0"]', "typescript");
  const aiPath = await queryIds(".path-chain [data-skill-id]");
  assert.ok(aiPath.includes("typescript") && aiPath.includes("rag") && !aiPath.includes("python"), "AI application route must respect chosen language");
  assert.ok((await queryIds(".network-node")).includes("typescript"));
  const aiGraph = await queryIds(".network-node");
  assert.ok(aiPath.every((id) => aiGraph.includes(id)), "Selected learning path should be present in the graph");
  await evaluate("document.querySelector('.network-node[data-skill-id=rag]').focus()");
  await send("Input.dispatchKeyEvent", { type: "keyDown", key: "Enter", code: "Enter", windowsVirtualKeyCode: 13 });
  await send("Input.dispatchKeyEvent", { type: "keyUp", key: "Enter", code: "Enter", windowsVirtualKeyCode: 13 });
  assert.equal(await evaluate("document.activeElement.id"), "skill-detail-title", "Keyboard selection should move focus to the inspector");
  assert.equal(await evaluate("document.querySelectorAll('#skill-detail-content .topic-list li').length"), data.skills.find((skill) => skill.id === "rag").topics.length);
  await choose("#progress-status", "verified");
  assert.equal(await evaluate("JSON.parse(localStorage.getItem('career-skill-atlas-progress-v1')).rag"), "verified");
  await click("#trace-dependencies");
  const closure = new Set();
  function collect(id) { if (closure.has(id)) return; closure.add(id); data.skills.find((skill) => skill.id === id).prerequisites.forEach(collect); }
  collect("rag");
  assert.deepEqual((await queryIds(".network-node")).sort(), [...closure].sort());
  await click('[data-network-view="list"]');
  assert.deepEqual((await queryIds(".adjacency-title")).sort(), [...closure].sort(), "Graph and relationship list should describe the same nodes");
  assert.ok(await evaluate("document.querySelector('#network-viewport').hidden && !document.querySelector('#network-list').hidden"));
  await click('[data-network-view="graph"]');
  await click("#trace-dependencies");
  await screenshot("desktop-ai-network", "#network");
  await screenshot("desktop-ai-path", "#roadmap");
  await choose("#path-role", "mobile");
  await choose('[data-path-choice="0"]', "ios-swift");
  const mobilePath = await queryIds(".path-chain [data-skill-id]");
  assert.ok(mobilePath.includes("ios-swift") && !mobilePath.includes("android-kotlin"), "iOS should not force Android");
  await choose("#jd-role-filter", "frontend");
  assert.equal(await evaluate("document.querySelectorAll('#jd-library .jd-card').length"), data.jdEvidence.filter((jd) => jd.roleIds.includes("frontend")).length);
  await click("#jd-library .jd-card summary");
  assert.ok(await evaluate("(()=>{const card=document.querySelector('#jd-library .jd-card');return card.open&&card.querySelector('.jd-body h4').textContent.includes('资格')&&card.querySelector('.jd-meta').textContent.includes('核查')&&card.querySelector('.jd-original').href.startsWith('https://');})()"));
  await click('[data-group="all"]');
  await evaluate("document.querySelector('#global-search').value='闭包';document.querySelector('#global-search').dispatchEvent(new Event('input',{bubbles:true}))");
  assert.ok((await queryIds(".skill-card")).includes("typescript"), "Search should include concrete knowledge points");
  assert.ok((await queryIds(".skill-card")).length < data.skills.length);
  await evaluate("document.querySelector('#global-search').value='';document.querySelector('#global-search').dispatchEvent(new Event('input',{bubbles:true}))");
  await send("Page.reload", { ignoreCache: true });
  await ready();
  assert.equal(await evaluate("document.querySelector('#progress-status').value"), "verified", "Progress and selected skill should survive reload");
  assert.equal(await evaluate("document.querySelector('#path-role').value"), "mobile", "Shared role URL should restore role");
  await click("#progress-filter");
  assert.equal(await evaluate("document.querySelectorAll('.skill-card').length"), data.skills.length - 1);
  await click("#progress-filter");
  await send("Browser.setDownloadBehavior", { behavior: "allow", downloadPath: downloads });
  await click("#export-progress");
  const exportedFile = path.join(downloads, "career-skill-atlas-progress.json");
  await until(() => fs.existsSync(exportedFile), "exported progress file");
  const exported = JSON.parse(fs.readFileSync(exportedFile, "utf8"));
  assert.equal(exported.version, 1); assert.equal(exported.skills.rag, "verified");
  async function importFile(content) {
    await evaluate("document.querySelector('#progress-message').textContent=''");
    await evaluate("(()=>{const transfer=new DataTransfer();transfer.items.add(new File([" + JSON.stringify(content) + "],'progress.json',{type:'application/json'}));const input=document.querySelector('#import-progress');input.files=transfer.files;input.dispatchEvent(new Event('change',{bubbles:true}));})()");
    await until(() => evaluate("document.querySelector('#progress-message').textContent.length>0"), "import result");
    return evaluate("document.querySelector('#progress-message').textContent");
  }
  assert.ok((await importFile(JSON.stringify({ version: 1, skills: { git: "learning" } }))).includes("已合并 1"));
  assert.deepEqual(await evaluate("JSON.parse(localStorage.getItem('career-skill-atlas-progress-v1'))"), { rag: "verified", git: "learning" });
  assert.ok((await importFile("broken json")).includes("导入失败"));
  assert.ok((await importFile("null")).includes("格式不正确"));
  assert.ok((await importFile(JSON.stringify({ version: 1, skills: { rag: "invalid" } }))).includes("导入失败"));
  assert.equal(await evaluate("JSON.parse(localStorage.getItem('career-skill-atlas-progress-v1')).rag"), "verified");
  await evaluate("document.activeElement.blur()");
  await send("Input.dispatchKeyEvent", { type: "keyDown", key: "/", code: "Slash", windowsVirtualKeyCode: 191 });
  assert.equal(await evaluate("document.activeElement.id"), "global-search");
  await send("Emulation.setEmulatedMedia", { features: [{ name: "prefers-reduced-motion", value: "reduce" }] });
  assert.ok(await evaluate("matchMedia('(prefers-reduced-motion:reduce)').matches&&getComputedStyle(document.documentElement).scrollBehavior==='auto'"));
  const layouts = [];
  for (const width of [375, 390, 768, 1024, 1440]) {
    await metrics(width, width < 760 ? 844 : 900);
    const layout = await evaluate("({width:innerWidth,documentWidth:document.documentElement.scrollWidth,clientWidth:document.documentElement.clientWidth})");
    if (layout.documentWidth > layout.clientWidth) {
      await screenshot("overflow-" + width, "#network");
      console.error(await evaluate("[...document.querySelectorAll('body *')].filter(el=>{const r=el.getBoundingClientRect();return r.right>document.documentElement.clientWidth+1&&r.width>0&&!el.closest('.network-viewport')}).slice(0,20).map(el=>({tag:el.tagName,class:el.className,width:el.getBoundingClientRect().width,right:el.getBoundingClientRect().right}))"));
    }
    assert.ok(layout.documentWidth <= layout.clientWidth, "Page horizontal overflow: " + JSON.stringify(layout));
    layouts.push(layout);
  }
  await metrics(390, 844);
  await send("Page.navigate", { url: origin + "/?role=ai-app&skill=rag" });
  await ready();
  assert.ok(await evaluate("document.querySelector('#network-viewport').hidden&&!document.querySelector('#network-list').hidden"), "Phone should start with readable relationship list");
  await screenshot("mobile-overview");
  await screenshot("mobile-relationships", "#network");
  await screenshot("mobile-path", "#roadmap");
  await click('[data-network-view="graph"]');
  assert.ok(await evaluate("!document.querySelector('#network-viewport').hidden&&document.querySelector('#network-viewport').scrollWidth>document.querySelector('#network-viewport').clientWidth"), "Wide graph should scroll inside its panel");
  await click("#zoom-in");
  assert.ok(await evaluate("parseFloat(document.querySelector('#knowledge-network').style.width)>1200"));
  await click('[data-pan="220,0"]');
  await until(() => evaluate("document.querySelector('#network-viewport').scrollLeft>0"), "pan alternative to dragging");
  await send("Page.navigate", { url: origin + "/?role=__proto__&skill=toString" });
  await ready();
  assert.equal(await evaluate("document.querySelector('#selection-kicker').textContent"), "ALL ROLES", "Unknown link selections should fall back to the full map");
  assert.deepEqual(browserErrors, [], "Browser JavaScript and local resource errors");
  console.log(JSON.stringify({ desktop: initial, pathChoices: ["TypeScript AI application", "Swift iOS"], keyboard: "passed", search: "passed", progressReloadExportImport: "passed", jdDetails: "passed", relationshipList: "passed", layouts, reducedMotion: "passed", browserErrors, screenshots }, null, 2));
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
