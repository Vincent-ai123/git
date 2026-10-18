(function () {
  const data = window.ATLAS_DATA;
  const skills = data.skills, roles = data.roles, sources = data.sources, layers = data.layers;
  const skillById = Object.fromEntries(skills.map((skill) => [skill.id, skill]));
  const roleById = Object.fromEntries(roles.map((role) => [role.id, role]));
  const colors = Object.fromEntries(Object.entries(layers).map(([key, value]) => [key, value.color]));
  let activeGroup = "all", activeLayer = "all", activeRoleId = null, searchQuery = "", showOnlyUnstarted = false;
  let networkLayer = "all", networkScale = 1, networkOffset = {x:0,y:0}, dragging = false, dragStart = null, dragOrigin = null;
  const progressKey = "career-skill-atlas-progress-v1";
  const progressLabels = {"not-started":"未开始","learning":"学习中","explain":"可以讲清","verified":"实现并验证"};
  let progress = {};
  try { progress = JSON.parse(localStorage.getItem(progressKey) || "{}") || {}; } catch (_) { progress = {}; }
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const esc = (value) => String(value).replace(/[&<>"']/g, (c) => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[c]));
  const layerName = (key) => layers[key] ? layers[key].label : key;
  const listHtml = (items) => items.map((item) => "<li>"+esc(item)+"</li>").join("");
  function sourceLink(id, compact) {
    const source = sources.find((item) => item.id === id);
    if (!source) return "";
    if (compact) return '<a class="source-link compact" href="'+source.url+'" target="_blank" rel="noreferrer"><span>'+esc(source.name)+'</span><span aria-hidden="true">↗</span></a>';
    return '<a class="source-link" href="'+source.url+'" target="_blank" rel="noreferrer"><span><small>'+esc(source.type)+'</small><strong>'+esc(source.name)+'</strong><em>'+esc(source.note)+'</em></span><span aria-hidden="true">↗</span></a>';
  }
  function roleMatches(role) {
    if (activeGroup !== "all" && role.group !== activeGroup) return false;
    if (!searchQuery) return true;
    const words = [role.title,role.code,role.summary,role.internWork.join(" "),role.must.concat(role.preferred).map((id) => skillById[id] && skillById[id].title).join(" ")].join(" ").toLowerCase();
    return words.includes(searchQuery);
  }
  function skillMatches(skill) {
    if (activeLayer !== "all" && skill.layer !== activeLayer) return false;
    if (showOnlyUnstarted && progress[skill.id] && progress[skill.id] !== "not-started") return false;
    if (!searchQuery) return true;
    const words = [skill.title,skill.family,skill.summary,skill.why,skill.proof,skill.roleIds.map((id) => roleById[id] && roleById[id].title).join(" ")].join(" ").toLowerCase();
    return words.includes(searchQuery);
  }
  function renderRoles() {
    const visible = roles.filter(roleMatches), grid = $("#role-grid");
    grid.innerHTML = visible.length ? visible.map((role) => {
      const selected = role.id === activeRoleId ? " is-selected" : "";
      return '<button class="role-card'+selected+'" type="button" data-role-id="'+role.id+'" style="--role-accent:'+role.color+'"><span class="role-code">'+esc(role.code)+'</span><span class="role-title">'+esc(role.title)+'</span><span class="role-summary">'+esc(role.summary)+'</span><span class="role-bottom"><span class="role-skill-count">'+role.skillIds.length+' 个技能节点</span><span class="role-arrow" aria-hidden="true">↗</span></span><span class="role-accent-bar"></span></button>';
    }).join("") : '<div class="empty-state"><strong>没有匹配的岗位</strong><span>试试更短的关键词，或清除方向筛选。</span></div>';
    $$(".role-card",grid).forEach((card) => card.addEventListener("click", () => selectRole(card.dataset.roleId)));
  }
  function renderRolePanel(role) {
    const panel = $("#selection-content");
    if (!role) {
      $("#selection-kicker").textContent = "ALL ROLES";
      panel.innerHTML = '<h3>选择一个岗位</h3><p>点击岗位卡片，查看实习生常见交付、必备技能、作品证据和面试信号。也可以直接在知识网络中点击一个节点。</p><div class="panel-tip"><span class="tip-line"></span><span>建议先选一个你愿意投入 8—12 周验证的方向。</span></div>';
      return;
    }
    $("#selection-kicker").textContent = role.code;
    panel.innerHTML = '<div class="selected-role-header" style="--role-accent:'+role.color+'"><span class="role-code">'+esc(role.code)+'</span><h3>'+esc(role.title)+'</h3><p>'+esc(role.summary)+'</p></div>'+
      '<div class="role-panel-section"><span class="section-tag">实习生常见交付</span><ul>'+listHtml(role.internWork)+'</ul></div>'+
      '<div class="role-panel-section"><span class="section-tag">常见核心能力</span><div class="skill-pill-wrap">'+role.must.map((id) => '<button type="button" class="mini-skill" data-skill-id="'+id+'">'+esc(skillById[id].title)+'</button>').join("")+'</div></div>'+
      (role.mustOneOf.length ? '<div class="role-panel-section"><span class="section-tag">核心语言 / 平台（任选其一）</span><div class="skill-pill-wrap">'+role.mustOneOf.map((group) => group.map((id) => '<button type="button" class="mini-skill" data-skill-id="'+id+'">'+esc(skillById[id].title)+'</button>').join("")).join('<span class="or-separator">或</span>')+'</div></div>' : '')+
      '<div class="role-panel-section"><span class="section-tag">加分 / 进阶能力</span><div class="skill-pill-wrap">'+role.preferred.map((id) => '<button type="button" class="mini-skill mini-skill-muted" data-skill-id="'+id+'">'+esc(skillById[id].title)+'</button>').join("")+'</div></div>'+
      '<div class="role-panel-section"><span class="section-tag">作品证据</span><ul>'+listHtml(role.evidence)+'</ul></div>'+
      '<div class="role-panel-section"><span class="section-tag">面试信号</span><ul>'+listHtml(role.interview)+'</ul></div>'+
      '<div class="fit-note"><strong>适配提示</strong><span>'+esc(role.fit)+'</span></div>'+
      '<div class="panel-links">'+role.sourceIds.slice(0,4).map((id) => sourceLink(id,true)).join("")+'</div>';
    $$(".mini-skill",panel).forEach((button) => button.addEventListener("click", () => {
      showSkill(skillById[button.dataset.skillId]);
      $("#network").scrollIntoView({behavior:"smooth",block:"start"});
    }));
  }
  function selectRole(id) {
    activeRoleId = id; renderRoles(); renderRolePanel(roleById[id]);
    networkLayer = "all"; $("#network-layer").value = "all"; renderNetwork();
  }
  function renderSkills() {
    const visible = skills.filter(skillMatches), grid = $("#skill-grid");
    $("#skill-count").textContent = visible.length+" / "+skills.length+" 个节点";
    grid.innerHTML = visible.length ? visible.map((skill) => {
      const related = skill.roleIds.slice(0,2).map((id) => roleById[id] && roleById[id].title).filter(Boolean);
      const state = progress[skill.id] || "not-started";
      return '<button class="skill-card progress-'+state+'" type="button" data-skill-id="'+skill.id+'" style="--skill-accent:'+colors[skill.layer]+'"><span class="skill-card-top"><span class="skill-layer">'+esc(layerName(skill.layer))+'</span><span class="skill-family">'+esc(skill.family)+'</span></span><strong>'+esc(skill.title)+'</strong><span class="skill-summary">'+esc(skill.summary)+'</span><span class="skill-card-footer"><span>'+esc(related.length ? related.join(" · ") : "通用基础")+'</span><span class="progress-badge">'+esc(progressLabels[state] || "未开始")+'</span></span></button>';
    }).join("") : '<div class="empty-state"><strong>没有匹配的知识节点</strong><span>换一个关键词，或切换层级。</span></div>';
    $$(".skill-card",grid).forEach((card) => card.addEventListener("click", () => {
      showSkill(skillById[card.dataset.skillId]);
      $("#network").scrollIntoView({behavior:"smooth",block:"start"});
    }));
  }
  function showSkill(skill) {
    if (!skill) return;
    const prereqs = skill.prerequisites.map((id) => skillById[id] && skillById[id].title).filter(Boolean);
    const roleNames = skill.roleIds.map((id) => roleById[id] && roleById[id].title).filter(Boolean);
    const prerequisiteHtml = prereqs.length ? prereqs.map((name,index) => '<button class="inline-skill" type="button" data-prereq="'+skill.prerequisites[index]+'">'+esc(name)+'</button>').join("、") : "这是共同底座中的起点节点。";
    const state = progress[skill.id] || "not-started";
    $("#skill-detail-content").innerHTML = '<div class="detail-accent" style="--skill-accent:'+colors[skill.layer]+'"></div><span class="skill-layer">'+esc(layerName(skill.layer))+'</span><span class="detail-family">'+esc(skill.family)+'</span><h3>'+esc(skill.title)+'</h3><p class="detail-summary">'+esc(skill.summary)+'</p>'+
      '<div class="detail-block"><span class="section-tag">为什么重要</span><p>'+esc(skill.why)+'</p></div>'+
      '<div class="detail-block"><span class="section-tag">前置关系</span><p>'+prerequisiteHtml+'</p></div>'+
      '<div class="detail-block"><span class="section-tag">可验证成果</span><p>'+esc(skill.proof)+'</p></div>'+
      '<div class="detail-block"><span class="section-tag">关联岗位</span><div class="detail-roles">'+(roleNames.map((name) => '<span>'+esc(name)+'</span>').join("") || "<span>所有工程岗位</span>")+'</div></div>'+
      '<div class="progress-tracker"><label for="progress-status">我的掌握状态</label><select id="progress-status" data-skill-id="'+skill.id+'">'+Object.entries(progressLabels).map(([key,label]) => '<option value="'+key+'"'+(state===key?" selected":"")+'>'+esc(label)+'</option>').join("")+'</select><small>只保存在当前浏览器</small></div>';
    $$(".inline-skill",$("#skill-detail-content")).forEach((button) => button.addEventListener("click", () => showSkill(skillById[button.dataset.prereq])));
    $("#progress-status").addEventListener("change", (event) => {
      progress[skill.id] = event.target.value;
      try { localStorage.setItem(progressKey, JSON.stringify(progress)); } catch (_) {}
      renderSkills(); renderNetwork(); updateProgressCount();
    });
    renderNetwork();
  }
  function renderNetwork() {
    const svg=$("#knowledge-network");
    const activeSkills=activeRoleId ? new Set(roleById[activeRoleId].skillIds) : null;
    const graphSkills=activeSkills ? new Set(activeSkills) : null;
    if(graphSkills){
      const pending=[...graphSkills];
      while(pending.length){
        const current=skillById[pending.pop()];
        current.prerequisites.forEach((id)=>{if(!graphSkills.has(id)){graphSkills.add(id);pending.push(id);}});
      }
    }
    const visible=skills.filter((skill) => (networkLayer==="all" || skill.layer===networkLayer) && (!graphSkills || graphSkills.has(skill.id)));
    const ids=new Set(visible.map((skill)=>skill.id));
    const mobileLayout=window.matchMedia("(max-width: 760px)").matches;
    const laneX=mobileLayout?{foundation:65,engineering:195,data:325,specialization:455}:{foundation:170,engineering:520,data:870,specialization:1220};
    const laneLabels={foundation:"01 基础",engineering:"02 工程",data:"03 数据 / AI",specialization:"04 分支"};
    const ordered={foundation:[],engineering:[],data:[],specialization:[]};
    visible.forEach((skill)=>ordered[skill.layer].push(skill));
    Object.values(ordered).forEach((items)=>items.sort((a,b)=>a.title.localeCompare(b.title,"zh-CN")));
    const coords={};
    const maxRows=Math.max(1,...Object.values(ordered).map((items)=>mobileLayout?items.length:Math.ceil(items.length/2)));
    const graphHeight=mobileLayout?Math.max(480,130+maxRows*58):1100;
    const graphWidth=mobileLayout?520:1400;
    svg.setAttribute("viewBox","0 0 "+graphWidth+" "+graphHeight);
    const viewport=$("#network-viewport");
    if(mobileLayout){const width=viewport.clientWidth;viewport.style.height=Math.max(300,Math.round(graphHeight*width/graphWidth))+"px";}
    else viewport.style.height="";
    Object.entries(ordered).forEach(([layer,items])=>items.forEach((skill,index)=>{coords[skill.id]=mobileLayout?[laneX[layer],70+index*58]:[laneX[layer]-60+(index%2)*120,70+Math.floor(index/2)*88];}));
    const focusTitle=$("#skill-detail-content h3") ? $("#skill-detail-content h3").textContent : "";
    const edges=[];
    visible.forEach((skill)=>skill.prerequisites.forEach((pre)=>{if(ids.has(pre)) edges.push([pre,skill.id]);}));
    const edgeMarkup=edges.map(([from,to])=>{
      const a=coords[from],b=coords[to];
      return '<path class="network-edge" d="M '+a[0]+' '+a[1]+' C '+((a[0]+b[0])/2)+' '+a[1]+', '+((a[0]+b[0])/2)+' '+b[1]+', '+b[0]+' '+b[1]+'" />';
    }).join("");
    const laneMarkup=Object.entries(ordered).map(([layer,items])=>'<text class="lane-label" x="'+laneX[layer]+'" y="30" text-anchor="middle">'+laneLabels[layer]+' · '+items.length+'</text>').join("");
    const nodeMarkup=visible.map((skill)=>{
      const p=coords[skill.id],r=15;
      const related=activeSkills&&activeSkills.has(skill.id)?" is-related":"";
      const prerequisite=graphSkills&&graphSkills.has(skill.id)&&!activeSkills.has(skill.id)?" is-prerequisite":"";
      const focused=focusTitle===skill.title?" is-focused":"";
      const mastered = progress[skill.id] === "verified" ? " is-proven" : progress[skill.id] === "learning" || progress[skill.id] === "explain" ? " is-in-progress" : "";
      return '<g class="network-node'+related+prerequisite+focused+mastered+'" data-skill-id="'+skill.id+'" tabindex="0" role="button" aria-label="'+esc(skill.title)+'，'+esc(progressLabels[progress[skill.id] || "not-started"])+'" transform="translate('+p[0]+' '+p[1]+')"><circle class="node-halo" r="'+(r+6)+'" fill="'+colors[skill.layer]+'"></circle><circle class="node-circle" r="'+r+'" fill="'+colors[skill.layer]+'"></circle><text class="node-label" y="'+(r+26)+'" text-anchor="middle">'+esc(skill.title)+'</text></g>';
    }).join("");
    svg.innerHTML='<g transform="translate('+networkOffset.x+' '+networkOffset.y+') scale('+networkScale+')"><defs><marker id="arrow" viewBox="0 0 10 10" refX="9" refY="3" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M 0 0 L 10 3 L 0 6 z" fill="#52708d"></path></marker></defs>'+laneMarkup+'<g class="edges" marker-end="url(#arrow)">'+edgeMarkup+'</g><g class="nodes">'+nodeMarkup+'</g></g>';
    $$(".network-node",svg).forEach((node)=>{
      const action=()=>showSkill(skillById[node.dataset.skillId]);
      node.addEventListener("click",action);
      node.addEventListener("keydown",(event)=>{if(event.key==="Enter"||event.key===" "){event.preventDefault();action();}});
    });
  }
  function renderSources() { $("#source-links").innerHTML=sources.map((source)=>sourceLink(source.id,false)).join(""); }
  function updateProgressCount() {
    const started = Object.values(progress).filter((value) => value && value !== "not-started").length;
    $("#progress-count").textContent = "已记录 "+started+" / "+skills.length;
    const button = $("#progress-filter");
    button.setAttribute("aria-pressed", String(showOnlyUnstarted));
    button.textContent = showOnlyUnstarted ? "显示全部" : "只看待学";
  }
  function init() {
    $("#stat-roles").textContent=roles.length;
    $("#stat-skills").textContent=skills.length;
    $("#stat-edges").textContent=skills.reduce((sum,skill)=>sum+skill.prerequisites.length,0)+"+";
    $("#hero-role-count").textContent=roles.length;
    renderRoles(); renderRolePanel(null); renderSkills(); renderNetwork(); renderSources();
    updateProgressCount();
    $$(".chip").forEach((button)=>button.addEventListener("click",()=>{activeGroup=button.dataset.group;$$(".chip").forEach((item)=>{item.classList.toggle("is-active",item===button);item.setAttribute("aria-pressed",String(item===button));});renderRoles();}));
    $("#global-search").addEventListener("input",(event)=>{searchQuery=event.target.value.trim().toLowerCase();renderRoles();renderSkills();});
    $$(".layer-tab").forEach((button)=>button.addEventListener("click",()=>{activeLayer=button.dataset.layer;$$(".layer-tab").forEach((item)=>{item.classList.toggle("is-active",item===button);item.setAttribute("aria-pressed",String(item===button));});renderSkills();}));
    $("#progress-filter").addEventListener("click",()=>{showOnlyUnstarted=!showOnlyUnstarted;updateProgressCount();renderSkills();});
    $("#network-layer").addEventListener("change",(event)=>{networkLayer=event.target.value;renderNetwork();});
    $("#zoom-in").addEventListener("click",()=>{networkScale=Math.min(1.5,networkScale+.1);renderNetwork();});
    $("#zoom-out").addEventListener("click",()=>{networkScale=Math.max(.7,networkScale-.1);renderNetwork();});
    $("#reset-network").addEventListener("click",()=>{networkLayer="all";networkScale=1;networkOffset={x:0,y:0};activeRoleId=null;$("#network-layer").value="all";renderNetwork();renderRoles();renderRolePanel(null);});
    const viewport=$("#network-viewport");
    viewport.addEventListener("wheel",(event)=>{if(!event.ctrlKey&&!event.metaKey)return;event.preventDefault();networkScale=Math.min(1.5,Math.max(.7,networkScale+(event.deltaY>0?-.08:.08)));renderNetwork();},{passive:false});
    viewport.addEventListener("pointerdown",(event)=>{if(event.target.closest(".network-node"))return;dragging=true;dragStart={x:event.clientX,y:event.clientY};dragOrigin={...networkOffset};viewport.setPointerCapture(event.pointerId);});
    viewport.addEventListener("pointermove",(event)=>{if(!dragging)return;networkOffset={x:dragOrigin.x+(event.clientX-dragStart.x)/1.5,y:dragOrigin.y+(event.clientY-dragStart.y)/1.5};renderNetwork();});
    viewport.addEventListener("pointerup",()=>{dragging=false;});
    viewport.addEventListener("pointercancel",()=>{dragging=false;});
    window.addEventListener("resize",()=>renderNetwork());
    if ("IntersectionObserver" in window) {
      const links=$$(".nav-link");
      const observer=new IntersectionObserver((entries)=>entries.forEach((entry)=>{if(entry.isIntersecting)links.forEach((link)=>link.classList.toggle("is-active",link.getAttribute("href")==="#"+entry.target.id));}),{rootMargin:"-28% 0px -62% 0px"});
      $$("main section[id]").forEach((section)=>observer.observe(section));
    }
  }
  init();
})();
