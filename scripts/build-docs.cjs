const fs = require("fs");
const path = require("path");
const data = require("./load-data.cjs");
const byId = Object.fromEntries(data.skills.map((skill) => [skill.id,skill]));
const roleById = Object.fromEntries(data.roles.map((role) => [role.id,role]));
const bullets = (items) => items.map((item) => "- " + item).join("\n");
const names = (ids) => ids.map((id) => byId[id].title);
const jdFor = (id) => data.jdEvidence.filter((jd) => jd.roleIds.includes(id));
const statusLabels = {"source-readable":"核查日原文可读取；投递前复核","needs-refresh":"2026 批次；投递状态待复核","direction-pool":"多方向汇总；具体团队要求不同"};
const write = (name,lines) => {
  fs.mkdirSync(path.join(__dirname,"..","docs"),{recursive:true});
  fs.writeFileSync(path.join(__dirname,"..","docs",name),lines.join("\n")+"\n","utf8");
  console.log("Generated docs/"+name);
};
const roleDoc = [
  "# 计算机实习岗位要求与学习路径","",
  "> 数据版本："+data.updated+"。覆盖 "+data.roles.length+" 类岗位、"+data.skills.length+" 个技能节点、"+data.jdEvidence.length+" 份官方 JD 样例。","",
  "岗位画像是通用准备模型，学习路径是遵循前置依赖的示例；两者均不是所有雇主的统一门槛。每个岗位单独列出官方 JD 对照，原文要求、加分项与本站建议分别归属。覆盖方向未按招聘数量排名，样本主要来自海外与香港岗位，不能推算中国市场热度。","",
  "## 投递前先检查资格","",
  bullets(["在读状态、学位阶段与专业限制","预计毕业年月、招聘批次与入职窗口","连续实习时长、每周到岗天数和现场/远程安排","工作地点、语言、签证/工作许可与岗位开放状态"]),"",
  "技术准备不能替代申请资格。节点标记为已验证只代表个人学习记录，不是录用评分。","","## 岗位拆解",""
];
for (const role of data.roles) {
  const route=data.getLearningPath(role.id);
  roleDoc.push("### "+role.title,"",role.summary,"","**为什么选这个方向**","",role.fit,"",
    "**实习生常见交付**","",bullets(role.internWork),"","**通用准备建议：优先核心**","",bullets(names(role.must)),"");
  if(role.mustOneOf.length)roleDoc.push("**技术栈替代路径**","",bullets(role.mustOneOf.map((group)=>names(group).join(" / "))),"","每组按目标 JD 选择一条，不代表要掌握所有语言或平台。","");
  roleDoc.push("**通用加分 / 进阶能力**","",bullets(names(role.preferred)),"",
    "**建议学习顺序**","","默认技术栈："+(route.selected.length?names(route.selected).join("、"):"按本岗位基础选择；无额外替代组")+"。站点可切换替代组，路径会重算。","",
    "1. 先修基础："+names(route.foundation).join(" → ")+"。",
    "2. 岗位核心："+names(route.core).join(" → ")+"。",
    "3. 项目验证："+route.project.title+"。",
    "4. 进阶方向（可选）："+names(route.advance).join(" / ")+"。","",
    "编号遵守显式依赖，不表示必须完成整门课程后才能开始项目。同阶段可交叉练习；可用已有能力跳过对应练习。","",
    "**项目里程碑**","",bullets(route.project.steps),"","**作品验收与简历证据**","",bullets(role.evidence),"",
    "**面试关注点**","",bullets(role.interview),"","**官方 JD 对照**","",
    ...jdFor(role.id).map((jd)=>"- ["+jd.company+" · "+jd.title+"](JD_EVIDENCE.md#"+jd.id+")："+jd.note+"（核查 "+jd.checked+"）"),"",
    "**招聘搜索与技术参考入口**","",...role.sourceIds.map((id)=>{const s=data.sources.find((item)=>item.id===id);return "- ["+s.name+"]("+s.url+")（"+s.type+"）";}),"");
}
roleDoc.push("## 继续使用这份体系","","完整知识点与双向依赖见 [SKILL_NETWORK.md](SKILL_NETWORK.md)；分层与关系语义见 [KNOWLEDGE_ARCHITECTURE.md](KNOWLEDGE_ARCHITECTURE.md)；逐条招聘证据见 [JD_EVIDENCE.md](JD_EVIDENCE.md)。");
write("ROLE_REQUIREMENTS.md",roleDoc);

const networkDoc=["# 计算机知识点与依赖网络","","> 版本："+data.updated+"。"+data.skills.length+" 个节点、"+data.skills.reduce((n,s)=>n+s.prerequisites.length,0)+" 条显式前置关系。","",
  "每个节点是学习索引，包含范围、具体知识点、学习理由、先修关系、后续用途与验证成果。箭头表示建议先建立的概念或实践基础，不表示岗位招聘硬门槛。关联岗位包含直接使用与前置复用。","",
  "## 节点索引","","| ID | 知识节点 | 层级 | 直接前置项 |","|---|---|---|---|",
  ...data.skills.map((s)=>"| "+s.id+" | ["+s.title+"](#"+s.id+") | "+data.layers[s.layer].label+" | "+(names(s.prerequisites).join("、")||"起点")+" |"),"","## 逐节点知识架构",""
];
for(const s of data.skills){
  networkDoc.push('<a id="'+s.id+'"></a>',"","### "+s.title,"","**位置：** "+data.layers[s.layer].label+" / "+s.family,"",s.summary,"","**为什么学：** "+s.why,"","**具体知识点**","",bullets(s.topics),"",
    "**前置：** "+(names(s.prerequisites).join("、")||"起点节点，可从基础概念开始。"),"",
    "**后续用途：** "+(data.skills.filter((item)=>item.prerequisites.includes(s.id)).map((item)=>item.title).join("、")||"在相关岗位项目中继续验证与深化。"),"",
    "**关联岗位（含前置复用）：** "+s.roleIds.map((id)=>roleById[id].title).join("、"),"","**验证成果：** "+s.proof,"");
}
networkDoc.push("## 关系表（前置 → 后续）","","| 前置节点 | 后续节点 |","|---|---|",...data.skills.flatMap((s)=>s.prerequisites.map((id)=>"| "+byId[id].title+" | "+s.title+" |")));
write("SKILL_NETWORK.md",networkDoc);

const evidenceDoc=["# 官方实习 JD 样例与证据边界","","> 核查日期："+data.updated+"。共 "+data.jdEvidence.length+" 份官方职位样例。","",
  "这些记录来自企业官方招聘系统，以短摘和中文归纳展示要求。原文可读取不等于目前一定可投递；2026 批次、方向汇总与相邻岗位分别标注。没有招聘数量统计，不能据此计算岗位热度、薪资排序或中国市场的统一门槛。","",
  "样本主要覆盖美国、欧洲、新加坡、香港及一条中国内地专项岗位；毕业窗口、语言、在读状态和实习时长都只能归属于对应 JD。研究实习的博士要求不能套用到 AI 应用工程。","",
  "## 使用方法","","先查看资格与时间，再区分明示技能、职责和加分项，最后回到通用画像补足准备路径。原文未说明的条件不自行补设。每条技能关联是本站的知识映射，不代表原文使用了同一个术语。",""
];
for(const jd of data.jdEvidence){
  evidenceDoc.push('<a id="'+jd.id+'"></a>',"","## "+jd.company+" · "+jd.title,"",
    "- 地点："+jd.location,"- 核查："+jd.checked,"- 状态："+statusLabels[jd.status],"- [官方职位原文]("+jd.url+")","- [官方公开数据源]("+jd.sourceApiUrl+")","",
    "**归属与适用范围：** "+jd.note,"","**JD 明示资格与时间**","",bullets(jd.eligibility),"",
    "**JD 明示技能与职责（原文归纳）**","",bullets(jd.required.map((r)=>r.text+"。对应节点："+names(r.skillIds).join("、"))),"",
    "**JD 明示加分项（原文归纳）**","",jd.preferred.length?bullets(jd.preferred.map((r)=>r.text+"。对应节点："+names(r.skillIds).join("、"))):"本记录未单独提取加分段落，不代表公司没有其他考量。","",
    "**原文短摘**","","> "+jd.quote,"","**知识映射关联方向：** "+jd.roleIds.map((id)=>roleById[id].title).join("、"),"");
}
evidenceDoc.push("## 复核记录","","运行 `npm run check:sources` 可重新检查官方公开数据源是否可读取，以及短摘是否仍存在。结果保存在 [EVIDENCE_STATUS.json](EVIDENCE_STATUS.json)，包含访问时间、原始标题和内容摘要指纹。该检查不自动修改资格归纳，也不判断岗位一定开放；原文变化需要人工重新审读。","","职业词典、趋势背景、技术资料和公司搜索入口见 [README.md](../README.md)，它们不替代逐职位证据。");
write("JD_EVIDENCE.md",evidenceDoc);
