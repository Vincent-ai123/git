(function () {
  const data = window.ATLAS_DATA;
  const skills = data.skills, roles = data.roles, sources = data.sources, layers = data.layers, domains = data.domains;
  const skillById = Object.fromEntries(skills.map((skill) => [skill.id, skill]));
  const roleById = Object.fromEntries(roles.map((role) => [role.id, role]));
  const domainById = Object.fromEntries(domains.map(domain=>[domain.id,domain]));
  const moduleById = Object.fromEntries(domains.flatMap(domain=>domain.modules).map(module=>[module.id,module]));
  const colors = Object.fromEntries(Object.entries(layers).map(([key, value]) => [key, value.color]));
  let activeGroup = "all", activeLayer = "all", activeRoleId = null, searchQuery = "", showOnlyUnstarted = false;
  let networkLayer = "all", knowledgeMap;
  let selectedSkillId = null, pathRoleId = "cpp-systems", pathChoices = {}, traceDependencies = false, traceSkillId = null;
  let networkView = matchMedia('(max-width:760px)').matches ? "list" : "graph", mapPath = {domainId:null,moduleId:null,skillId:null};
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
    for(const [param,key] of [["domain","domainId"],["module","moduleId"],["skill","skillId"]]) {
      if(mapPath[key])url.searchParams.set(param,mapPath[key]);else url.searchParams.delete(param);
    }
    if(url.href!==location.href)history.pushState(null,"",url);
  }
  function jdMarkup(jd) {
    const claims = (items) => items.map((item) => '<li><p>'+esc(item.text)+'</p><div class="skill-pill-wrap">'+(item.skillIds.map((id) => skillButton(id,"mini-skill-muted")).join("")||'<span class="model-note">原文保留；此项不在当前学习路线内展开。</span>')+'</div></li>').join("");
    const scope=jd.scope==="adjacent-research"?"相邻研究岗对照 · ":jd.scope==="adjacent-systems"?"相邻系统岗对照 · ":"";
    return '<details class="jd-card"><summary><span class="jd-company">'+esc(jd.company)+'</span><strong>'+esc(jd.title)+'</strong><span class="jd-meta">'+esc(jd.location)+' · 核查 '+jd.checked+'</span><span class="jd-status">'+scope+statusLabels[jd.status]+'</span></summary><div class="jd-body"><p class="jd-note">'+esc(jd.note)+'</p><h4>JD 明示资格与时间</h4><ul>'+listHtml(jd.eligibility)+'</ul><h4>JD 明示技能与职责（原文归纳）</h4><ul class="jd-claims">'+claims(jd.required)+'</ul>'+(jd.preferred.length ? '<h4>JD 明示加分项（原文归纳）</h4><ul class="jd-claims">'+claims(jd.preferred)+'</ul>' : '')+'<blockquote lang="en">'+esc(jd.quote)+'</blockquote><a class="jd-original" href="'+esc(jd.url)+'" target="_blank" rel="noreferrer">查看官方职位原文 ↗</a></div></details>';
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
      return '<button class="role-card'+selected+'" type="button" aria-pressed="'+(role.id===activeRoleId)+'" data-role-id="'+role.id+'" style="--role-accent:'+role.color+'"><span class="role-code">'+esc(role.code)+'</span><span class="role-priority">'+esc(role.priority)+'</span><span class="role-title">'+esc(role.title)+'</span><span class="role-summary">'+esc(role.summary)+'</span><span class="role-bottom"><span class="role-skill-count">'+role.skillIds.length+' 节点 · '+jdForRole(role.id).length+' 份 JD 对照</span><span class="role-arrow" aria-hidden="true">↗</span></span><span class="role-accent-bar"></span></button>';
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
      '<div class="role-panel-section jd-section"><span class="section-tag">官方 JD 对照 · '+jdForRole(role.id).length+' 份</span><p class="model-note">'+esc(role.jdScope||'每份样例的地区、批次和资格分别适用；相邻岗位与多方向汇总会明确标注。')+'</p>'+jdForRole(role.id).map(jdMarkup).join("")+'</div>'+
      '<div class="panel-links">'+role.sourceIds.slice(0,3).map((id) => sourceLink(id,true)).join("")+'</div>';
    bindSkillButtons(panel);
    $("#selection-panel").scrollTop=0;
  }
  function selectRole(id) {
    if (!Object.hasOwn(roleById,id)) return;
    activeRoleId = id; pathRoleId=id; renderRoles(); renderRolePanel(roleById[id]); renderRoadmap();
    networkLayer = "all"; $("#network-layer").value = "all";
    selectedSkillId=null;traceSkillId=null;traceDependencies=false;
    navigateMap("root",null,false);
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
    mapPath={domainId:skill.domainId,moduleId:skill.moduleId,skillId:skill.id};
    if(networkLayer!=="all"&&networkLayer!==skill.layer){networkLayer="all";$("#network-layer").value="all";}
    const prereqs = skill.prerequisites.map((id) => skillById[id] && skillById[id].title).filter(Boolean);
    const roleNames = skill.roleIds.map((id) => roleById[id] && roleById[id].title).filter(Boolean);
    const prerequisiteHtml = prereqs.length ? prereqs.map((name,index) => '<button class="inline-skill" type="button" data-prereq="'+skill.prerequisites[index]+'">'+esc(name)+'</button>').join("、") : "这是共同底座中的起点节点。";
    const state = progress[skill.id] || "not-started";
    $("#skill-detail-content").innerHTML = '<div class="detail-accent" style="--skill-accent:'+colors[skill.layer]+'"></div><span class="skill-layer">'+esc(layerName(skill.layer))+'</span><span class="detail-family">'+esc(skill.family)+'</span><h3 id="skill-detail-title" tabindex="-1">'+esc(skill.title)+'</h3><p class="detail-location">'+esc(domainById[skill.domainId].title)+' / '+esc(moduleById[skill.moduleId].title)+'</p><p class="detail-summary">'+esc(skill.summary)+'</p><p class="topic-focus" id="topic-focus" hidden></p>'+
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
    $('#toggle-relations').hidden=view!=="graph";
    if(view==='list')$('#map-context').textContent='点击条目逐层展开，前置关系列在对应条目下';
    knowledgeMap.setVisible(view==="graph");
    $$("[data-network-view]").forEach((button) => button.setAttribute("aria-pressed",String(button.dataset.networkView===view)));
  }
  function collectPrerequisites(seeds) {
    const ids=new Set();
    function visit(id){if(ids.has(id))return;ids.add(id);skillById[id].prerequisites.forEach(visit);}
    seeds.forEach(visit);return ids;
  }
  function networkSkills() {
    let scope=null;
    if(activeRoleId) {
      const role=roleById[activeRoleId],path=pathFor(activeRoleId);
      scope=collectPrerequisites([...role.must,...path.selected,...role.preferred,...path.required,...role.path.advance]);
      if(selectedSkillId)collectPrerequisites([selectedSkillId]).forEach(id=>scope.add(id));
    }
    if(traceDependencies&&traceSkillId)scope=collectPrerequisites([traceSkillId]);
    return skills.filter(skill=>(networkLayer==="all"||skill.layer===networkLayer)&&(!scope||scope.has(skill.id)));
  }
  function mapNode(kind,id,title,summary,members,color,meta) {
    return {kind,id,title,summary,members,color,meta,
      ariaLabel:title+'，'+meta+(kind==='topic'?'，查看内容':'，点击展开'),
      verified:kind==='skill'&&progress[id]==='verified',selected:kind==='skill'&&id===selectedSkillId};
  }
  function activateMapNode(node) {
    if(!node)return;
    if(node.kind==='skill')showSkill(skillById[node.id],true);
    else if(node.kind==='topic') {
      const topic=Number(node.id.slice(node.id.lastIndexOf(':')+1));
      const items=$$('#skill-detail-content .topic-list li');
      items.forEach((item,index)=>item.classList.toggle('is-current-topic',index===topic));
      const focus=$('#topic-focus');focus.hidden=false;focus.textContent='当前内容：'+node.title;
      $$('.map-node').forEach(el=>{const selected=el.dataset.nodeId===node.id;el.classList.toggle('is-focused',selected);el.setAttribute('aria-pressed',String(selected));});
      $$('.adjacency-title[data-map-kind="topic"]').forEach(el=>el.setAttribute('aria-pressed',String(el.dataset.mapId===node.id)));
      $('#skill-detail-title').focus({preventScroll:true});
      if(matchMedia('(max-width:960px)').matches)$('#skill-detail').scrollIntoView({behavior:motion(),block:'start'});
    } else navigateMap(node.kind,node.id);
  }
  function navigateMap(kind,id,focus=true) {
    if(kind==='root')mapPath={domainId:null,moduleId:null,skillId:null};
    if(kind==='domain'&&domainById[id])mapPath={domainId:id,moduleId:null,skillId:null};
    if(kind==='module'&&moduleById[id])mapPath={domainId:moduleById[id].domainId,moduleId:id,skillId:null};
    if(kind==='skill'&&skillById[id])return showSkill(skillById[id],focus);
    renderNetwork();renderMapInspector();updateUrl();
    if(focus)$('#network-level-title').focus({preventScroll:true});
  }
  function bindMapButtons(root) {
    $$('[data-map-kind]',root).forEach(button=>button.addEventListener('click',()=>{
      if(button.dataset.mapKind==='topic')activateMapNode({kind:'topic',id:button.dataset.mapId,title:button.dataset.topicTitle});
      else navigateMap(button.dataset.mapKind,button.dataset.mapId);
    }));
  }
  function renderMapInspector() {
    if(mapPath.skillId)return;
    const domain=domainById[mapPath.domainId],module=moduleById[mapPath.moduleId];
    const group=module||domain;
    const inScope=new Set(networkSkills().map(s=>s.id));
    const links=module?module.skillIds.filter(id=>inScope.has(id)).map(id=>'<button type="button" class="map-child" data-skill-id="'+id+'"><span>'+esc(skillById[id].title)+'</span><small>'+esc(progressLabels[progress[id]||'not-started'])+'</small><b aria-hidden="true">→</b></button>').join(''):
      (domain?domain.modules:domains).filter(item=>item.skillIds.some(id=>inScope.has(id))).map(item=>'<button type="button" class="map-child" data-map-kind="'+(domain?'module':'domain')+'" data-map-id="'+item.id+'"><span>'+esc(item.title)+'</span><small>'+item.skillIds.filter(id=>inScope.has(id)).length+' 个技能</small><b aria-hidden="true">→</b></button>').join('');
    $('#skill-detail-content').innerHTML='<p class="inspector-step">'+(module?'03 / SKILLS':domain?'02 / MODULES':'01 / CONCEPTS')+'</p><h3>'+(group?esc(group.title):'先看全貌，再逐层展开')+'</h3><p class="detail-summary">'+esc(group?group.summary:'从八个大概念开始。点击概念进入模块，再选技能和具体学习内容；任何一层都可以返回。')+'</p>'+(domain?'<p class="map-stage">'+esc(domain.stage)+'</p>':'<p class="map-stage">概念 → 模块 → 技能 → 具体内容</p>')+'<div class="map-children">'+links+'</div><p class="model-note">'+(traceDependencies?'当前只展开所选技能的前置链。':'连线汇总当前分组之间的先修关系；具体前置项在技能详情内列出。')+'</p>';
    bindMapButtons($('#skill-detail-content'));bindSkillButtons($('#skill-detail-content'));
  }
  function renderNetworkList(nodes,edges) {
    const buttons=nodes.map(node=>{
      const skill=node.kind==='skill'?skillById[node.id]:null;
      const relations=edges.filter(edge=>edge.to===node.id).map(edge=>nodes.find(n=>n.id===edge.from)).filter(Boolean);
      return '<li><button class="adjacency-title" type="button" data-map-kind="'+node.kind+'" data-map-id="'+node.id+'"'+(skill?' data-skill-id="'+skill.id+'"':'')+(node.kind==='topic'?' data-topic-title="'+esc(node.title)+'"':'')+' aria-pressed="false"><span>'+esc(node.title)+'</span><small>'+esc(node.meta)+(node.kind==='topic'?'':' · 展开 →')+'</small></button><p>'+esc(node.summary)+'</p>'+(skill?'<div class="adjacency-pre"><span>具体前置：</span>'+(skill.prerequisites.map(id=>skillButton(id,'mini-skill-muted')).join('')||'起点知识')+'</div>':relations.length?'<div class="adjacency-pre"><span>来自这些分组的前置：</span>'+relations.map(n=>'<button type="button" class="mini-skill mini-skill-muted" data-map-kind="'+n.kind+'" data-map-id="'+n.id+'">'+esc(n.title)+'</button>').join('')+'</div>':'')+'</li>';
    }).join('');
    $('#network-list').innerHTML='<ul class="adjacency-items">'+buttons+'</ul>';
    bindMapButtons($('#network-list'));
    // Main skill buttons already use hierarchy navigation; bind only prerequisite links here.
    $$('.adjacency-pre [data-skill-id]',$('#network-list')).forEach(button=>button.addEventListener('click',()=>showSkill(skillById[button.dataset.skillId],true)));
  }
  function renderNetwork() {
    const visible=networkSkills(),ids=new Set(visible.map(s=>s.id));
    const domain=domainById[mapPath.domainId],module=moduleById[mapPath.moduleId],skill=skillById[mapPath.skillId];
    let nodes,heading,level;
    if(skill) {
      heading=skill.title+' · 具体学习内容';level='04 / LEARNING TOPICS';
      nodes=skill.topics.map((topic,index)=>mapNode('topic',skill.id+':'+index,topic,'属于 '+skill.title,[],domain.color,String(index+1).padStart(2,'0')+' / '+skill.topics.length));
    } else if(module) {
      heading=module.title;level='03 / SKILLS';
      nodes=module.skillIds.filter(id=>ids.has(id)).map(id=>{const s=skillById[id];return mapNode('skill',id,s.title,s.summary,[id],domain.color,progress[id]==='verified'?'✓ 实现并验证':s.topics.length+' 项内容 · '+progressLabels[progress[id]||'not-started']);});
    } else {
      heading=domain?domain.title:'知识概念总览';level=domain?'02 / MODULES':'01 / CONCEPTS';
      nodes=(domain?domain.modules:domains).map(group=>{
        const members=group.skillIds.filter(id=>ids.has(id));
        return mapNode(domain?'module':'domain',group.id,group.shortTitle||group.title,group.summary,members,domain?domain.color:group.color,members.length+' 个技能 · 点击展开');
      }).filter(node=>node.members.length);
    }
    const parent=Object.fromEntries(nodes.flatMap(node=>node.members.map(id=>[id,node.id]))),edgeMap=new Map();
    visible.forEach(s=>s.prerequisites.forEach(pre=>{
      const from=parent[pre],to=parent[s.id];
      if(!from||!to||from===to)return;
      const key=from+'>'+to;
      if(!edgeMap.has(key))edgeMap.set(key,{from,to,count:0});
      edgeMap.get(key).count++;
    }));
    const edges=[...edgeMap.values()];
    $('#network-level-title').textContent=heading;
    $('#network-level-kicker').textContent=level;
    $('#network-level-description').textContent=skill?'点击一个内容节点，在详情面板查看学习范围、前置项与验证成果。':module?module.summary:domain?domain.summary:'先建立共同底座，再连接系统，最后选择应用方向。点击任意概念，逐层展开。';
    const crumbs=[['root','', '知识总览'],...(domain?[['domain',domain.id,domain.shortTitle||domain.title]]:[]),...(module?[['module',module.id,module.title]]:[]),...(skill?[['skill',skill.id,skill.title]]:[])];
    $('#network-breadcrumbs').innerHTML='<ol>'+crumbs.map(([kind,id,label],index)=>'<li><button type="button" data-map-kind="'+kind+'" data-map-id="'+id+'"'+(index===crumbs.length-1?' aria-current="page"':'')+'>'+esc(label)+'</button></li>').join('')+'</ol>';
    bindMapButtons($('#network-breadcrumbs'));
    $('#map-back').disabled=!domain;
    $('#network-empty').hidden=nodes.length>0;
    const key=[mapPath.domainId,mapPath.moduleId,mapPath.skillId,networkLayer,activeRoleId,traceDependencies].join('/');
    knowledgeMap.setScene(nodes,edges,key);
    renderNetworkList(nodes,edges);setNetworkView(networkView);
    $('#network-summary').textContent=nodes.length+' 个'+(skill?'学习内容':module?'技能':domain?'模块':'大概念')+(activeRoleId?' · '+roleById[activeRoleId].title:' · 个人学习主线')+(traceDependencies?' · '+skillById[traceSkillId].title+'的前置链':'');
    $('#network-viewport').setAttribute('aria-label',heading+'，可交互的分层知识地图');
    $('#network-list').setAttribute('aria-label',heading+'，逐层知识清单');
    $("#trace-dependencies").disabled=!(selectedSkillId||traceSkillId);
    $("#trace-dependencies").textContent=traceDependencies?'退出前置链':'查看所选技能前置链';
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
    knowledgeMap=new window.AtlasMap({viewport:$('#network-viewport'),svg:$('#knowledge-network'),onActivate:activateMapNode});
    $("#stat-roles").textContent=roles.length;
    $("#stat-skills").textContent=skills.length;
    $("#stat-edges").textContent=skills.reduce((sum,skill)=>sum+skill.prerequisites.length,0);
    $("#hero-role-count").textContent=roles.length;
    $("#stat-jds").textContent=data.jdEvidence.length;
    const roleOptions=roles.map((role) => '<option value="'+role.id+'">'+esc(role.title)+'</option>').join("");
    $("#path-role").innerHTML=roleOptions;
    $("#jd-role-filter").insertAdjacentHTML("beforeend",roleOptions);
    const params=new URLSearchParams(location.search);
    const roleParam=params.get('role'),roleId=Object.hasOwn(data.roleAliases,roleParam)?data.roleAliases[roleParam]:roleParam;
    if (Object.hasOwn(roleById,roleId)) { activeRoleId=roleId; pathRoleId=activeRoleId; }
    const domainParam=params.get('domain'),moduleParam=params.get('module');
    if(Object.hasOwn(domainById,domainParam))mapPath.domainId=domainParam;
    if(Object.hasOwn(moduleById,moduleParam))mapPath={domainId:moduleById[moduleParam].domainId,moduleId:moduleParam,skillId:null};
    if (Object.hasOwn(skillById,params.get("skill"))) selectedSkillId=params.get("skill");
    renderRoles(); renderRolePanel(roleById[activeRoleId]); renderSkills(); renderNetwork(); renderSources(); renderRoadmap(); renderEvidence();
    if(selectedSkillId) showSkill(skillById[selectedSkillId]);
    else renderMapInspector();
    updateProgressCount();
    window.addEventListener('popstate',()=>{
      const params=new URLSearchParams(location.search),requested=params.get('role');
      const roleId=Object.hasOwn(data.roleAliases,requested)?data.roleAliases[requested]:requested;
      activeRoleId=Object.hasOwn(roleById,roleId)?roleId:null;
      pathRoleId=activeRoleId||'cpp-systems';
      mapPath={domainId:null,moduleId:null,skillId:null};selectedSkillId=null;
      traceDependencies=false;traceSkillId=null;networkLayer='all';$('#network-layer').value='all';
      if(Object.hasOwn(domainById,params.get('domain')))mapPath.domainId=params.get('domain');
      if(Object.hasOwn(moduleById,params.get('module'))) {
        const module=moduleById[params.get('module')];mapPath={domainId:module.domainId,moduleId:module.id,skillId:null};
      }
      renderRoles();renderRolePanel(roleById[activeRoleId]);renderRoadmap();
      if(Object.hasOwn(skillById,params.get('skill')))showSkill(skillById[params.get('skill')],true);
      else {renderNetwork();renderMapInspector();$('#network-level-title').focus({preventScroll:true});}
    });
    $$(".chip").forEach((button)=>button.addEventListener("click",()=>{activeGroup=button.dataset.group;$$(".chip").forEach((item)=>{item.classList.toggle("is-active",item===button);item.setAttribute("aria-pressed",String(item===button));});renderRoles();}));
    $("#global-search").addEventListener("input",(event)=>{searchQuery=event.target.value.trim().toLowerCase();if(searchQuery)$('#skill-library-details').open=true;renderRoles();renderSkills();});
    $$(".layer-tab").forEach((button)=>button.addEventListener("click",()=>{activeLayer=button.dataset.layer;$$(".layer-tab").forEach((item)=>{item.classList.toggle("is-active",item===button);item.setAttribute("aria-pressed",String(item===button));});renderSkills();}));
    $("#progress-filter").addEventListener("click",()=>{showOnlyUnstarted=!showOnlyUnstarted;updateProgressCount();renderSkills();});
    $("#network-layer").addEventListener("change",(event)=>{networkLayer=event.target.value;navigateMap('root',null,false);});
    $("#zoom-in").addEventListener("click",()=>knowledgeMap.zoom(.15));
    $("#zoom-out").addEventListener("click",()=>knowledgeMap.zoom(-.15));
    $("#reset-network").addEventListener("click",()=>{
      networkLayer="all";activeRoleId=null;selectedSkillId=null;traceSkillId=null;traceDependencies=false;
      $("#network-layer").value="all";knowledgeMap.reset();renderRoles();renderRolePanel(null);navigateMap('root',null,false);
    });
    $('#map-back').addEventListener('click',()=>{
      if(mapPath.skillId)navigateMap('module',mapPath.moduleId);
      else if(mapPath.moduleId)navigateMap('domain',mapPath.domainId);
      else navigateMap('root');
    });
    $('#toggle-relations').addEventListener('click',()=>{
      knowledgeMap.setRelations(!knowledgeMap.showAll);
      $('#toggle-relations').setAttribute('aria-pressed',String(knowledgeMap.showAll));
    });
    $('#clear-map-filter').addEventListener('click',()=>{$('#reset-network').click();});
    $("#trace-dependencies").addEventListener("click",()=>{
      traceDependencies=!traceDependencies;
      if(traceDependencies)traceSkillId=selectedSkillId||traceSkillId;
      networkLayer='all';$('#network-layer').value='all';navigateMap('root',null,false);
    });
    $$("[data-network-view]").forEach((button) => button.addEventListener("click",()=>{setNetworkView(button.dataset.networkView);}));
    $("#path-role").addEventListener("change",(event)=>selectRole(event.target.value));
    $("#jd-role-filter").addEventListener("change",renderEvidence);
    $('#reset-camera').addEventListener('click',()=>knowledgeMap.reset());
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
