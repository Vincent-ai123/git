const { spawn, spawnSync } = require("child_process");
const fs = require("fs");
const os = require("os");
const path = require("path");
const net = require("net");
const edge = process.env.EDGE_BIN || "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";
if (!fs.existsSync(edge)) {
  console.log("Browser smoke skipped (set EDGE_BIN to a Chromium executable to enable it).");
  process.exit(0);
}
const profile = path.join(os.tmpdir(), "career-skill-atlas-edge-" + process.pid);
let browser, server;
async function freePort() {
  const candidate = net.createServer();
  await new Promise((resolve,reject)=>candidate.once("error",reject).listen(0,"127.0.0.1",resolve));
  const selected = candidate.address().port;
  await new Promise((resolve)=>candidate.close(resolve));
  return selected;
}
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
async function json(url) { const response = await fetch(url); return response.json(); }
async function main() {
  const serverPort = await freePort();
  server = spawn(process.execPath,[path.join(__dirname,"serve.cjs")],{env:{...process.env,PORT:String(serverPort)},stdio:"ignore",windowsHide:true});
  let serverReady=false;
  for(let attempt=0;attempt<50;attempt++){
    try{const response=await fetch("http://127.0.0.1:"+serverPort+"/");if(response.ok){serverReady=true;break;}}catch(_){}
    await wait(100);
  }
  if(!serverReady)throw new Error("Test web server did not start");
  const debugPort = await freePort();
  browser = spawn(edge,["--headless=new","--disable-gpu","--no-sandbox","--no-proxy-server","--remote-debugging-port="+debugPort,"--remote-allow-origins=*","--user-data-dir="+profile,"about:blank"],{stdio:"ignore",windowsHide:true});
  let page;
  for (let attempt = 0; attempt < 50; attempt++) {
    try { page = (await json("http://127.0.0.1:" + debugPort + "/json")).find((item) => item.type === "page"); if (page) break; } catch (_) {}
    await wait(150);
  }
  if (!page) throw new Error("Edge DevTools did not become ready");
  const socket = new WebSocket(page.webSocketDebuggerUrl);
  await new Promise((resolve,reject) => { socket.onopen=resolve; socket.onerror=reject; });
  let nextId=0; const pending=new Map();
  const browserErrors=[];
  socket.onmessage=(event)=>{
    const message=JSON.parse(event.data);
    if(message.method==="Runtime.exceptionThrown")browserErrors.push(message.params.exceptionDetails.exception?.description||message.params.exceptionDetails.text);
    if(message.method==="Log.entryAdded"&&message.params.entry.level==="error")browserErrors.push(message.params.entry.text);
    if(message.id && pending.has(message.id)){
      const item=pending.get(message.id); pending.delete(message.id);
      if(message.error)item.reject(new Error(message.error.message));else item.resolve(message.result);
    }
  };
  function send(method,params={}){
    const id=++nextId; socket.send(JSON.stringify({id,method,params}));
    return new Promise((resolve,reject)=>pending.set(id,{resolve,reject}));
  }
  async function evaluate(expression){
    const result=await send("Runtime.evaluate",{expression,returnByValue:true,awaitPromise:true});
    if(result.exceptionDetails)throw new Error((result.exceptionDetails.exception&&result.exceptionDetails.exception.description)||result.exceptionDetails.text||"Page JavaScript error");
    return result.result.value;
  }
  await send("Page.enable"); await send("Runtime.enable");
  await send("Page.navigate",{url:"http://127.0.0.1:"+serverPort+"/"});
  await wait(1200);
  for(let attempt=0;attempt<120;attempt++){
    const ready=await evaluate("document.readyState==='complete' && document.scripts.length===2 && document.querySelectorAll('.role-card').length===17");
    if(ready)break;
    await wait(100);
  }
  if(!(await evaluate("document.querySelectorAll('.role-card').length===17"))){
    await evaluate("(async()=>{for(const src of ['data.js','app.js']){if(![...document.scripts].some((item)=>item.src.endsWith(src))){await new Promise((resolve,reject)=>{const script=document.createElement('script');script.src=src;script.onload=resolve;script.onerror=reject;document.body.appendChild(script)})}}})()");
    await wait(300);
  }
  const initial=JSON.parse(await evaluate("JSON.stringify({url:location.href,title:document.title,atlas:Boolean(window.ATLAS_DATA),scriptCount:document.scripts.length,roles:document.querySelectorAll('.role-card').length,skills:document.querySelectorAll('.skill-card').length,nodes:document.querySelectorAll('.network-node').length,edges:document.querySelectorAll('.network-edge').length})"));
  if(initial.roles!==17||initial.skills!==77||initial.nodes!==77||initial.edges<120)throw new Error("Unexpected initial counts: "+JSON.stringify({initial,browserErrors}));
  await evaluate("document.querySelector('[data-group=\"data-ai\"]').click()");
  const filtered=await evaluate("document.querySelectorAll('.role-card').length");
  if(filtered!==6)throw new Error("Role filter failed");
  await evaluate("document.querySelector('[data-role-id=\"ai-app\"]').click()");
  const role=JSON.parse(await evaluate("JSON.stringify({title:document.querySelector('.selected-role-header h3').textContent,related:document.querySelectorAll('.network-node.is-related').length,prerequisites:document.querySelectorAll('.network-node.is-prerequisite').length})"));
  if(role.title!=="AI 应用 / Agent 实习生"||role.related<8||role.prerequisites<1)throw new Error("Role network focus failed");
  await evaluate("document.querySelector('.network-node[data-skill-id=\"rag\"]').dispatchEvent(new MouseEvent('click',{bubbles:true}))");
  const node=await evaluate("document.querySelector('#skill-detail-content h3').textContent");
  if(node!=="RAG 与信息检索")throw new Error("Skill inspector failed");
  await evaluate("document.querySelector('#progress-status').value='verified';document.querySelector('#progress-status').dispatchEvent(new Event('change',{bubbles:true}))");
  const stored=await evaluate("JSON.parse(localStorage.getItem('career-skill-atlas-progress-v1')).rag");
  if(stored!=="verified")throw new Error("Local progress did not persist");
  await evaluate("document.querySelector('#progress-filter').click()");
  const pendingCount=await evaluate("document.querySelectorAll('.skill-card').length");
  if(pendingCount!==76)throw new Error("Progress filter failed: "+pendingCount);
  await send("Page.setDeviceMetricsOverride",{width:390,height:844,deviceScaleFactor:1,mobile:true});
  await wait(150);
  await evaluate("document.querySelector('#reset-network').click()");
  const mobile=JSON.parse(await evaluate("JSON.stringify({media:matchMedia('(max-width: 760px)').matches,overflow:document.documentElement.scrollWidth>document.documentElement.clientWidth,viewBox:document.querySelector('#knowledge-network').getAttribute('viewBox'),viewportHeight:document.querySelector('#network-viewport').clientHeight,nodes:document.querySelectorAll('.network-node').length})"));
  if(!mobile.media||mobile.overflow||!mobile.viewBox.startsWith('0 0 520 '))throw new Error("Mobile graph layout failed: "+JSON.stringify(mobile));
  console.log(JSON.stringify({desktop:initial,filteredDataAiRoles:filtered,selectedRole:role.title,relatedSkills:role.related,prerequisiteSkills:role.prerequisites,selectedSkill:node,progress:stored,pendingSkills:pendingCount,mobile},null,2));
  socket.close();
}
main().catch((error)=>{console.error(error.message);process.exitCode=1;}).finally(()=>{
  if(browser){
    if(process.platform==="win32"&&browser.pid)spawnSync("taskkill",["/PID",String(browser.pid),"/T","/F"],{stdio:"ignore"});
    browser.kill();
  }
  if(server){
    if(process.platform==="win32"&&server.pid)spawnSync("taskkill",["/PID",String(server.pid),"/T","/F"],{stdio:"ignore"});
    server.kill();
  }
  setTimeout(()=>{try{fs.rmSync(profile,{recursive:true,force:true});}catch(_){}process.exit();},500);
});
