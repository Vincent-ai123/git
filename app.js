(function () {
  const data = window.ATLAS_DATA;
  const skills = data.skills, roles = data.roles, sources = data.sources, layers = data.layers;
  const skillById = Object.fromEntries(skills.map((skill) => [skill.id, skill]));
  const roleById = Object.fromEntries(roles.map((role) => [role.id, role]));
  const colors = Object.fromEntries(Object.entries(layers).map(([key, value]) => [key, value.color]));
  let activeGroup = "all", activeLayer = "all", activeRoleId = null, searchQuery = "", showOnlyUnstarted = false;
  let networkLayer = "all", networkScale = 1, dragging = false, dragStart = null, dragOrigin = null;
  let selectedSkillId = null, pathRoleId = "backend", pathChoices = {}, traceDependencies = false;
  let networkView = window.matchMedia("(max-width: 760px)").matches ? "list" : "graph";
  const progressKey = "career-skill-atlas-progress-v1";
  const progressLabels = {"not-started":"未开始","learning":"学习中","explain":"可以讲清","verified":"实现并验证"};
  let progress = {};
  function validProgress(value) {
    if (!value || typeof value !== "object" || Array.isArray(value)) return {};
    return Object.fromEntries(skills.filter((skill) => Object.hasOwn(progressLabels,value[skill.id])).map((skill) => [skill.id,value[skill.id]]));
  }
  try { progress = validProgress(JSON.parse(localStorage.getItem(progressKey) || "{}")); } catch (_) { progress = {}; }
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const esc = (value) => String(value).replace(/[&<>"']/g, (c) => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[c]));
  const layerName = (key) => layers[key] ? layers[key].label : key;
  const listHtml = (items) => items.map((item) => "<li>"+esc(item)+"</li>").join("");
  const motion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";
  const skillButton = (id, extra = "") => '<button type="button" class="mini-skill '+extra+'" data-skill-id="'+id+'">'+esc(skillById[id].title)+'</button>';
  const jdForRole = (id) => data.jdEvidence.filter((jd) => jd.roleIds.includes(id));
  const pathFor = (id = pathRoleId) => data.getLearningPath(id,pathChoices[id] || []);
  const statusLabels = {"source-readable":"原文可读取 · 投递前复核","needs-refresh":"2026 批次 · 状态待复核","direction-pool":"多方向汇总 · 按团队确认"};
  function bindSkillButtons(root) {
    $$("[data-skill-id]",root).forEach((button) => button.addEventListener("click", () => {
      showSkill(skillById[button.dataset.skillId], true);
      $("#skill-detail").scrollIntoView({behavior:motion(),block:"nearest"});
    }));
  }
  function updateUrl() {
    const url = new URL(location.href);
    if (activeRoleId) url.searchParams.set("role", activeRoleId); else url.searchParams.delete("role");
    if (selectedSkillId) url.searchParams.set("skill", selectedSkillId); else url.searchParams.delete("skill");
    history.replaceState(null,"",url);
  }
  function jdMarkup(jd) {
    const claims = (items) => items.map((item) => '<li><p>'+esc(item.text)+'</p><div class="skill-pill-wrap">'+item.skillIds.map((id) => skillButton(id,"mini-skill-muted")).join("")+'</div></li>').join("");
    return '<details class="jd-card"><summary><span class="jd-company">'+esc(jd.company)+'</span><strong>'+esc(jd.title)+'</strong><span class="jd-meta">'+esc(jd.location)+' · 核查 '+jd.checked+'</span><span class="jd-status">'+statusLabels[jd.status]+'</span></summary><div class="jd-body"><p class="jd-note">'+esc(jd.note)+'</p><h4>JD 明示资格与时间</h4><ul>'+listHtml(jd.eligibility)+'</ul><h4>JD 明示技能与职责（原文归纳）</h4><ul class="jd-claims">'+claims(jd.required)+'</ul>'+(jd.preferred.length ? '<h4>JD 明示加分项（原文归纳）</h4><ul class="jd-claims">'+claims(jd.preferred)+'</ul>' : '')+'<blockquote lang="en">'+esc(jd.quote)+'</blockquote><a class="jd-original" href="'+esc(jd.url)+'" target="_blank" rel="noreferrer">查看官方职位原文 ↗</a></div></details>';
  }
  function sourceLink(id, compact) {
    const source = sources.find((item) => item.id === id);
    if (!source) return "";
    if (compact) return '<a class="source-link compact" href="'+source.url+'" target="_blank" rel="noreferrer"><span>'+esc(source.name)+'</span><span aria-hidden="true">↗</span></a>';
    return '<a class="source-link" href="'+source.url+'" target="_blank" rel="noreferrer"><span><small>'+esc(source.type)+'</small><strong>'+esc(source.name)+'</strong><em>'+esc(source.note)+'</em></span><span aria-hidden="true">↗</span></a>';
  }
  function roleMatches(role) {
    if (activeGroup !== "all" && role.group !== activeGroup) return false;
    if (!searchQuery) return true;
    const words = [role.title,role.code,role.summary,role.internWork.join(" "),role.skillIds.map((id) => skillById[id].title+" "+skillById[id].topics.join(" ")).join(" ")].join(" ").toLowerCase();
    return words.includes(searchQuery);
  }
  function skillMatches(skill) {
    if (activeLayer !== "all" && skill.layer !== activeLayer) return false;
    if (showOnlyUnstarted && progress[skill.id] && progress[skill.id] !== "not-started") return false;
    if (!searchQuery) return true;
    const words = [skill.title,skill.family,skill.summary,skill.why,skill.proof,skill.topics.join(" "),skill.roleIds.map((id) => roleById[id] && roleById[id].title).join(" ")].join(" ").toLowerCase();
    return words.includes(searchQuery);
  }
  function renderRoles() {
    const visible = roles.filter(roleMatches), grid = $("#role-grid");
    grid.innerHTML = visible.length ? visible.map((role) => {
      const selected = role.id === activeRoleId ? " is-selected" : "";
      return '<button class="role-card'+selected+'" type="button" aria-pressed="'+(role.id===activeRoleId)+'" data-role-id="'+role.id+'" style="--role-accent:'+role.color+'"><span class="role-code">'+esc(role.code)+'</span><span class="role-title">'+esc(role.title)+'</span><span class="role-summary">'+esc(role.summary)+'</span><span class="role-bottom"><span class="role-skill-count">'+role.skillIds.length+' 节点 · '+jdForRole(role.id).length+' 份 JD 样例</span><span class="role-arrow" aria-hidden="true">↗</span></span><span class="role-accent-bar"></span></button>';
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
      '<div class="role-panel-section"><span class="section-tag">通用准备建议 · 优先核心</span><p class="model-note">以下是可调整的能力模型。企业逐条要求见本面板的 JD 样例。</p><div class="skill-pill-wrap">'+role.must.map((id) => skillButton(id)).join("")+'</div></div>'+
      (role.mustOneOf.length ? '<div class="role-panel-section"><span class="section-tag">核心语言 / 平台（任选其一）</span><div class="skill-pill-wrap">'+role.mustOneOf.map((group) => group.map((id) => '<button type="button" class="mini-skill" data-skill-id="'+id+'">'+esc(skillById[id].title)+'</button>').join("")).join('<span class="or-separator">或</span>')+'</div></div>' : '')+
      '<div class="role-panel-section"><span class="section-tag">加分 / 进阶能力</span><div class="skill-pill-wrap">'+role.preferred.map((id) => '<button type="button" class="mini-skill mini-skill-muted" data-skill-id="'+id+'">'+esc(skillById[id].title)+'</button>').join("")+'</div></div>'+
      '<div class="role-panel-section"><span class="section-tag">作品证据</span><ul>'+listHtml(role.evidence)+'</ul></div>'+
      '<div class="role-panel-section"><span class="section-tag">面试信号</span><ul>'+listHtml(role.interview)+'</ul></div>'+
      '<div class="fit-note"><strong>适配提示</strong><span>'+esc(role.fit)+'</span></div>'+
      '<a class="button button-ghost path-jump" href="#roadmap">查看这个岗位的学习顺序 →</a>'+
      '<div class="role-panel-section jd-section"><span class="section-tag">官方 JD 样例 · '+jdForRole(role.id).length+' 份</span><p class="model-note">每份样例的地区、批次和资格分别适用；相邻岗位与多方向汇总会明确标注。</p>'+jdForRole(role.id).map(jdMarkup).join("")+'</div>'+
      '<div class="panel-links">'+role.sourceIds.slice(0,3).map((id) => sourceLink(id,true)).join("")+'</div>';
    bindSkillButtons(panel);
    $("#selection-panel").scrollTop=0;
  }
  function selectRole(id) {
    if (!Object.hasOwn(roleById,id)) return;
    activeRoleId = id; pathRoleId=id; renderRoles(); renderRolePanel(roleById[id]); renderRoadmap();
    networkLayer = "all"; $("#network-layer").value = "all"; renderNetwork(); updateUrl();
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
      $("#network").scrollIntoView({behavior:motion(),block:"start"});
    }));
  }
  function showSkill(skill, focus = false) {
    if (!skill) return;
    selectedSkillId=skill.id;
    if(networkLayer!=="all"&&networkLayer!==skill.layer){networkLayer="all";$("#network-layer").value="all";}
    const prereqs = skill.prerequisites.map((id) => skillById[id] && skillById[id].title).filter(Boolean);
    const roleNames = skill.roleIds.map((id) => roleById[id] && roleById[id].title).filter(Boolean);
    const prerequisiteHtml = prereqs.length ? prereqs.map((name,index) => '<button class="inline-skill" type="button" data-prereq="'+skill.prerequisites[index]+'">'+esc(name)+'</button>').join("、") : "这是共同底座中的起点节点。";
    const state = progress[skill.id] || "not-started";
    $("#skill-detail-content").innerHTML = '<div class="detail-accent" style="--skill-accent:'+colors[skill.layer]+'"></div><span class="skill-layer">'+esc(layerName(skill.layer))+'</span><span class="detail-family">'+esc(skill.family)+'</span><h3 id="skill-detail-title" tabindex="-1">'+esc(skill.title)+'</h3><p class="detail-summary">'+esc(skill.summary)+'</p>'+
      '<div class="detail-block"><span class="section-tag">具体知识点 · '+skill.topics.length+' 项</span><ul class="topic-list">'+listHtml(skill.topics)+'</ul></div>'+
      '<div class="detail-block"><span class="section-tag">为什么重要</span><p>'+esc(skill.why)+'</p></div>'+
      '<div class="detail-block"><span class="section-tag">前置关系</span><p>'+prerequisiteHtml+'</p></div>'+
      '<div class="detail-block"><span class="section-tag">可验证成果</span><p>'+esc(skill.proof)+'</p></div>'+
      '<div class="detail-block"><span class="section-tag">后续会用到它的节点</span><div class="skill-pill-wrap">'+(skills.filter((item) => item.prerequisites.includes(skill.id)).map((item) => skillButton(item.id)).join("") || '<span class="model-note">继续在岗位项目中验证与深化。</span>')+'</div></div>'+
      '<div class="detail-block"><span class="section-tag">关联岗位</span><div class="detail-roles">'+(roleNames.map((name) => '<span>'+esc(name)+'</span>').join("") || "<span>所有工程岗位</span>")+'</div></div>'+
      '<div class="progress-tracker"><label for="progress-status">我的掌握状态</label><select id="progress-status" data-skill-id="'+skill.id+'">'+Object.entries(progressLabels).map(([key,label]) => '<option value="'+key+'"'+(state===key?" selected":"")+'>'+esc(label)+'</option>').join("")+'</select><small>只保存在当前浏览器</small></div>';
    $$(".inline-skill",$("#skill-detail-content")).forEach((button) => button.addEventListener("click", () => showSkill(skillById[button.dataset.prereq],true)));
    bindSkillButtons($("#skill-detail-content"));
    $("#progress-status").addEventListener("change", (event) => {
      progress[skill.id] = event.target.value;
      saveProgress();
      renderSkills(); renderNetwork(); renderRoadmap(); updateProgressCount();
    });
    renderNetwork(); updateUrl();
    if (focus) $("#skill-detail-title").focus({preventScroll:true});
  }
  function renderRoadmap() {
    const role=roleById[pathRoleId], path=pathFor();
    $("#path-role").value=pathRoleId;
    const completed=path.required.filter((id) => progress[id]==="verified").length;
    $("#path-summary").textContent=role.title+" · 示例路径 "+path.required.length+" 个节点 · 已验证 "+completed+" 个（学习记录）";
    $("#path-choices").innerHTML=role.mustOneOf.map((group,index) => '<label>技术栈选择 '+(index+1)+'<select data-path-choice="'+index+'">'+group.map((id) => '<option value="'+id+'"'+(path.selected[index]===id?' selected':'')+'>'+esc(skillById[id].title)+'</option>').join("")+'</select></label>').join("");
    $$("[data-path-choice]").forEach((select) => select.addEventListener("change", () => {
      const index=Number(select.dataset.pathChoice), choices=[...path.selected]; choices[index]=select.value; pathChoices[pathRoleId]=choices;
      renderRoadmap(); renderNetwork();
      $('[data-path-choice="'+index+'"]').focus({preventScroll:true});
    }));
    function chain(ids,offset) {
      return '<ol class="path-chain" start="'+(offset+1)+'">'+ids.map((id) => '<li><button type="button" data-skill-id="'+id+'"><span>'+esc(skillById[id].title)+'</span><small>'+esc(progressLabels[progress[id]||"not-started"])+'</small></button></li>').join("")+'</ol>';
    }
    $("#role-roadmap").innerHTML=
      '<article class="path-stage"><span class="step-index">01</span><h3>先修基础</h3><p>从工具、主力语言与必要背景起步。编号遵守前置关系，同阶段可交叉练习。</p>'+chain(path.foundation,0)+'</article>'+
      '<article class="path-stage"><span class="step-index">02</span><h3>岗位核心</h3><p>在基础上串起这个岗位的能力；自动补齐所选路线尚缺的前置节点。</p>'+chain(path.core,path.foundation.length)+'</article>'+
      '<article class="path-stage"><span class="step-index">03</span><h3>项目验证</h3><strong class="project-title">'+esc(path.project.title)+'</strong><ol class="project-steps">'+listHtml(path.project.steps)+'</ol><details class="project-acceptance"><summary>查看作品验收标准</summary><ul>'+listHtml(path.project.acceptance)+'</ul></details></article>'+
      '<article class="path-stage"><span class="step-index">04</span><h3>进阶方向</h3><p>按目标 JD 与兴趣选择。这里列出可选示例，深入前先检查各节点的前置项。</p><div class="skill-pill-wrap">'+path.advance.map((id) => skillButton(id)).join("")+'</div><p class="path-finish">完成作品后，用个人贡献、验证过程与取舍说明自己的能力。</p></article>';
    bindSkillButtons($("#role-roadmap"));
  }
  function setNetworkView(view) {
    networkView=view;
    $("#network-viewport").hidden=view!=="graph";
    $("#network-list").hidden=view!=="list";
    $(".graph-pan").hidden=view!=="graph";
    $("#zoom-in").disabled=view!=="graph"; $("#zoom-out").disabled=view!=="graph";
    $$("[data-network-view]").forEach((button) => button.setAttribute("aria-pressed",String(button.dataset.networkView===view)));
  }
  function renderNetworkList(visible, activeSkills, graphSkills) {
    const listScroll=$("#network-list").scrollTop;
    $("#network-list").innerHTML=Object.entries(layers).map(([key,layer]) => {
      const items=visible.filter((skill) => skill.layer===key);
      if (!items.length) return "";
      return '<section class="adjacency-group"><h3>'+esc(layer.label)+' · '+items.length+'</h3><ul class="adjacency-items">'+items.map((skill) => '<li class="'+(skill.id===selectedSkillId?'is-selected':'')+'"><button class="adjacency-title" type="button" data-skill-id="'+skill.id+'" aria-pressed="'+(skill.id===selectedSkillId)+'">'+esc(skill.title)+'<small>'+esc(progressLabels[progress[skill.id]||"not-started"])+'</small></button>'+(activeSkills?'<span class="relation-badge">'+(activeSkills.has(skill.id)?'岗位直接关联':graphSkills.has(skill.id)?'路径基础 / 前置':'浏览补充节点')+'</span>':'')+'<div class="adjacency-pre"><span>前置：</span>'+(skill.prerequisites.length?skill.prerequisites.map((id) => skillButton(id,"mini-skill-muted")).join(""):'起点节点；可从基础概念开始。')+'</div></li>').join("")+'</ul></section>';
    }).join("") || '<p class="empty-state">当前筛选没有节点。请切换层级或重置视图。</p>';
    bindSkillButtons($("#network-list"));
    $("#network-list").scrollTop=listScroll;
  }
  function renderNetwork() {
    const svg=$("#knowledge-network");
    const activeSkills=activeRoleId ? new Set([...roleById[activeRoleId].must,...pathFor(activeRoleId).selected,...roleById[activeRoleId].preferred,...roleById[activeRoleId].path.core]) : null;
    const graphSkills=activeSkills ? new Set([...activeSkills,...pathFor(activeRoleId).required]) : null;
    if(graphSkills){
      const pending=[...graphSkills];
      while(pending.length){
        const current=skillById[pending.pop()];
        current.prerequisites.forEach((id)=>{if(!graphSkills.has(id)){graphSkills.add(id);pending.push(id);}});
      }
    }
    const focusChain=new Set();
    function collect(id) { if(focusChain.has(id))return;focusChain.add(id);skillById[id].prerequisites.forEach(collect); }
    if(selectedSkillId) collect(selectedSkillId);
    const visible=skills.filter((skill) => (networkLayer==="all" || skill.layer===networkLayer) && (!graphSkills || focusChain.has(skill.id) || graphSkills.has(skill.id)) && (!traceDependencies || focusChain.has(skill.id)));
    const ids=new Set(visible.map((skill)=>skill.id));
    const laneX={foundation:180,engineering:530,data:880,specialization:1230};
    const laneLabels={foundation:"01 基础",engineering:"02 工程",data:"03 数据 / AI",specialization:"04 分支"};
    const ordered={foundation:[],engineering:[],data:[],specialization:[]};
    visible.forEach((skill)=>ordered[skill.layer].push(skill));
    const order=new Map();
    function visit(id) { if(order.has(id))return;skillById[id].prerequisites.forEach(visit);order.set(id,order.size); }
    skills.forEach((skill)=>visit(skill.id));
    Object.values(ordered).forEach((items)=>items.sort((a,b)=>order.get(a.id)-order.get(b.id)));
    const coords={};
    const maxRows=Math.max(1,...Object.values(ordered).map((items)=>Math.ceil(items.length/2)));
    const graphHeight=Math.max(480,100+maxRows*100), graphWidth=1400;
    svg.setAttribute("viewBox","0 0 "+graphWidth+" "+graphHeight);
    const viewport=$("#network-viewport");
    svg.style.width=(1200*networkScale)+"px"; svg.style.height=(1200*networkScale*graphHeight/graphWidth)+"px";
    Object.entries(ordered).forEach(([layer,items])=>items.forEach((skill,index)=>{coords[skill.id]=[laneX[layer]-78+(index%2)*156,85+Math.floor(index/2)*100];}));
    const edges=[];
    visible.forEach((skill)=>skill.prerequisites.forEach((pre)=>{if(ids.has(pre)) edges.push([pre,skill.id]);}));
    const edgeMarkup=edges.map(([from,to])=>{
      const a=coords[from],b=coords[to];
      const focused=focusChain.has(from)&&focusChain.has(to)?" is-chain":"";
      const sameLane=skillById[from].layer===skillById[to].layer;
      const curve=sameLane?' C '+(a[0]-55)+' '+(a[1]+30)+', '+(b[0]-55)+' '+(b[1]-30)+', '+b[0]+' '+(b[1]-18):' C '+((a[0]+b[0])/2)+' '+a[1]+', '+((a[0]+b[0])/2)+' '+b[1]+', '+(b[0]-18)+' '+b[1];
      return '<path class="network-edge'+focused+'" data-from="'+from+'" data-to="'+to+'" d="M '+a[0]+' '+a[1]+curve+'" />';
    }).join("");
    const laneMarkup=Object.entries(ordered).map(([layer,items])=>'<text class="lane-label" x="'+laneX[layer]+'" y="30" text-anchor="middle">'+laneLabels[layer]+' · '+items.length+'</text>').join("");
    const nodeMarkup=visible.map((skill)=>{
      const p=coords[skill.id],r=15;
      const related=activeSkills&&activeSkills.has(skill.id)?" is-related":"";
      const prerequisite=graphSkills&&graphSkills.has(skill.id)&&!activeSkills.has(skill.id)?" is-prerequisite":"";
      const focused=selectedSkillId===skill.id?" is-focused":"";
      const mastered = progress[skill.id] === "verified" ? " is-proven" : progress[skill.id] === "learning" || progress[skill.id] === "explain" ? " is-in-progress" : "";
      const lines=[];let line="",lineWidth=0;
      for(const token of skill.title.match(/[A-Za-z0-9+#.]+|./gu)){
        if(!line&&!token.trim())continue;
        const width=Array.from(token).reduce((sum,char)=>sum+(/[\x00-\x7f]/.test(char)?.55:1),0);
        if(line&&lineWidth+width>10){lines.push(line.trim());line="";lineWidth=0;}
        line+=token;lineWidth+=width;
      }
      if(line.trim())lines.push(line.trim());
      const glyph=progress[skill.id]==="verified"?'✓':progress[skill.id]==="learning"||progress[skill.id]==="explain"?'·':'';
      return '<g class="network-node'+related+prerequisite+focused+mastered+'" data-skill-id="'+skill.id+'" tabindex="0" role="button" aria-pressed="'+(selectedSkillId===skill.id)+'" aria-label="'+esc(skill.title)+'，'+esc(layerName(skill.layer))+'，'+esc(progressLabels[progress[skill.id] || "not-started"])+'" transform="translate('+p[0]+' '+p[1]+')"><title>'+esc(skill.title)+'</title><circle class="node-halo" r="'+(r+9)+'" fill="'+colors[skill.layer]+'"></circle><circle class="node-circle" r="'+r+'" fill="'+colors[skill.layer]+'"></circle><text class="node-glyph" aria-hidden="true" text-anchor="middle" y="5">'+glyph+'</text><text class="node-label" aria-hidden="true" text-anchor="middle">'+lines.map((line,index) => '<tspan x="0" y="'+(r+23+index*17)+'">'+esc(line)+'</tspan>').join("")+'</text></g>';
    }).join("");
    svg.innerHTML='<defs><marker id="arrow" viewBox="0 0 10 10" refX="9" refY="3" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M 0 0 L 10 3 L 0 6 z" fill="#8baaca"></path></marker></defs>'+laneMarkup+'<g class="edges" marker-end="url(#arrow)">'+edgeMarkup+'</g><g class="nodes">'+nodeMarkup+'</g>';
    $$(".network-node",svg).forEach((node)=>{
      const action=()=>showSkill(skillById[node.dataset.skillId],true);
      node.addEventListener("click",action);
      node.addEventListener("keydown",(event)=>{if(event.key==="Enter"||event.key===" "){event.preventDefault();action();}});
    });
    renderNetworkList(visible,activeSkills,graphSkills); setNetworkView(networkView);
    $("#network-summary").textContent=visible.length+" 个节点 · "+edges.length+" 条当前可见前置关系"+(activeRoleId?' · '+roleById[activeRoleId].title:' · 全图')+(traceDependencies?' · 所选节点前置链':'');
    $("#trace-dependencies").disabled=!selectedSkillId;
    $("#trace-dependencies").setAttribute("aria-pressed",String(traceDependencies));
  }
  function renderSources() { $("#source-links").innerHTML=sources.map((source)=>sourceLink(source.id,false)).join(""); }
  function renderEvidence() {
    const roleId=$("#jd-role-filter").value;
    const records=roleId==="all" ? data.jdEvidence : jdForRole(roleId);
    $("#jd-library").innerHTML=records.map(jdMarkup).join("");
    $("#jd-count").textContent=records.length+" / "+data.jdEvidence.length+" 份官方样例 · 核查 "+data.updated;
    bindSkillButtons($("#jd-library"));
  }
  function saveProgress() {
    try { localStorage.setItem(progressKey,JSON.stringify(progress)); } catch (_) {
      $("#progress-message").textContent="浏览器未能保存，请导出进度文件留存。";
    }
  }
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
    $("#stat-edges").textContent=skills.reduce((sum,skill)=>sum+skill.prerequisites.length,0);
    $("#hero-role-count").textContent=roles.length;
    $("#stat-jds").textContent=data.jdEvidence.length;
    const roleOptions=roles.map((role) => '<option value="'+role.id+'">'+esc(role.title)+'</option>').join("");
    $("#path-role").innerHTML=roleOptions;
    $("#jd-role-filter").insertAdjacentHTML("beforeend",roleOptions);
    const params=new URLSearchParams(location.search);
    if (Object.hasOwn(roleById,params.get("role"))) { activeRoleId=params.get("role"); pathRoleId=activeRoleId; }
    if (Object.hasOwn(skillById,params.get("skill"))) selectedSkillId=params.get("skill");
    renderRoles(); renderRolePanel(roleById[activeRoleId]); renderSkills(); renderNetwork(); renderSources(); renderRoadmap(); renderEvidence();
    if(selectedSkillId) showSkill(skillById[selectedSkillId]);
    updateProgressCount();
    $$(".chip").forEach((button)=>button.addEventListener("click",()=>{activeGroup=button.dataset.group;$$(".chip").forEach((item)=>{item.classList.toggle("is-active",item===button);item.setAttribute("aria-pressed",String(item===button));});renderRoles();}));
    $("#global-search").addEventListener("input",(event)=>{searchQuery=event.target.value.trim().toLowerCase();renderRoles();renderSkills();});
    $$(".layer-tab").forEach((button)=>button.addEventListener("click",()=>{activeLayer=button.dataset.layer;$$(".layer-tab").forEach((item)=>{item.classList.toggle("is-active",item===button);item.setAttribute("aria-pressed",String(item===button));});renderSkills();}));
    $("#progress-filter").addEventListener("click",()=>{showOnlyUnstarted=!showOnlyUnstarted;updateProgressCount();renderSkills();});
    $("#network-layer").addEventListener("change",(event)=>{networkLayer=event.target.value;renderNetwork();});
    $("#zoom-in").addEventListener("click",()=>{networkScale=Math.min(2,networkScale+.15);renderNetwork();});
    $("#zoom-out").addEventListener("click",()=>{networkScale=Math.max(.6,networkScale-.15);renderNetwork();});
    $("#reset-network").addEventListener("click",()=>{networkLayer="all";networkScale=1;activeRoleId=null;traceDependencies=false;$("#network-layer").value="all";renderNetwork();renderRoles();renderRolePanel(null);$("#network-viewport").scrollTo(0,0);updateUrl();});
    $("#trace-dependencies").addEventListener("click",()=>{traceDependencies=!traceDependencies;renderNetwork();});
    $$("[data-network-view]").forEach((button) => button.addEventListener("click",()=>{setNetworkView(button.dataset.networkView);}));
    $("#path-role").addEventListener("change",(event)=>selectRole(event.target.value));
    $("#jd-role-filter").addEventListener("change",renderEvidence);
    const viewport=$("#network-viewport");
    viewport.addEventListener("wheel",(event)=>{if(!event.ctrlKey&&!event.metaKey)return;event.preventDefault();networkScale=Math.min(2,Math.max(.6,networkScale+(event.deltaY>0?-.1:.1)));renderNetwork();},{passive:false});
    viewport.addEventListener("pointerdown",(event)=>{if(event.pointerType!=="mouse"||event.button!==0||event.target.closest(".network-node"))return;dragging=true;dragStart={x:event.clientX,y:event.clientY};dragOrigin={x:viewport.scrollLeft,y:viewport.scrollTop};viewport.setPointerCapture(event.pointerId);});
    viewport.addEventListener("pointermove",(event)=>{if(!dragging)return;viewport.scrollLeft=dragOrigin.x-(event.clientX-dragStart.x);viewport.scrollTop=dragOrigin.y-(event.clientY-dragStart.y);});
    viewport.addEventListener("pointerup",()=>{dragging=false;});
    viewport.addEventListener("pointercancel",()=>{dragging=false;});
    $$("[data-pan]").forEach((button)=>button.addEventListener("click",()=>{const [left,top]=button.dataset.pan.split(",").map(Number);viewport.scrollBy({left,top,behavior:motion()});}));
    $("#export-progress").addEventListener("click",()=>{
      const blob=new Blob([JSON.stringify({version:1,exportedAt:new Date().toISOString(),skills:progress},null,2)],{type:"application/json"});
      const url=URL.createObjectURL(blob), link=document.createElement("a");
      link.href=url;link.download="career-skill-atlas-progress.json";link.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
      $("#progress-message").textContent="已导出当前节点进度，可在其他浏览器导入。";
    });
    $("#import-progress").addEventListener("change",async(event)=>{
      const file=event.target.files[0];if(!file)return;
      try {
        if(file.size>1024*1024)throw new Error("文件超过 1 MB，请选择本站导出的进度 JSON。");
        const value=JSON.parse(await file.text());
        if(!value||typeof value!=="object"||value.version!==1||!value.skills||typeof value.skills!=="object"||Array.isArray(value.skills))throw new Error("进度文件格式不正确。");
        if(Object.entries(value.skills).some(([id,state])=>skillById[id]&&!Object.hasOwn(progressLabels,state)))throw new Error("文件包含无法识别的学习状态。");
        const imported=validProgress(value.skills);progress={...progress,...imported};saveProgress();
        renderSkills();renderNetwork();renderRoadmap();updateProgressCount();
        if(selectedSkillId)showSkill(skillById[selectedSkillId]);
        $("#progress-message").textContent="已合并 "+Object.keys(imported).length+" 个节点的进度。";
      } catch(error) { $("#progress-message").textContent="导入失败："+(error instanceof SyntaxError?"请选择有效的 JSON 进度文件。":error.message); }
      event.target.value="";
    });
    document.addEventListener("keydown",(event)=>{if(event.key==="/"&&!event.ctrlKey&&!event.metaKey&&!event.altKey&&!event.target.closest("input,textarea,select,[contenteditable]")){event.preventDefault();$("#global-search").focus();}});
    if ("IntersectionObserver" in window) {
      const links=$$(".nav-link");
      const observer=new IntersectionObserver((entries)=>entries.forEach((entry)=>{if(entry.isIntersecting)links.forEach((link)=>link.classList.toggle("is-active",link.getAttribute("href")==="#"+entry.target.id));}),{rootMargin:"-28% 0px -62% 0px"});
      $$("main section[id]").forEach((section)=>observer.observe(section));
    }
  }
  init();
})();
