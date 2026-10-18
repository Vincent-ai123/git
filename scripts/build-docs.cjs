const fs = require("fs");
const path = require("path");
const vm = require("vm");
const context = { window: {} };
vm.createContext(context);
vm.runInContext(fs.readFileSync(path.join(__dirname, "..", "data.js"), "utf8"), context);
const data = context.window.ATLAS_DATA;
const skillById = Object.fromEntries(data.skills.map((skill) => [skill.id, skill]));
const esc = (value) => String(value).replace(/\|/g, "\\|");
const bullets = (items) => items.map((item) => "- " + item).join("\n");
const skillNames = (ids) => ids.map((id) => skillById[id].title);
const lines = [
  "# 计算机实习岗位要求与技能拆解",
  "",
  "> 版本：" + data.updated + " · 覆盖 " + data.roles.length + " 个岗位画像、" + data.skills.length + " 个技能节点。",
  "> 口径说明：这是面向学习规划的通用能力模型，不是从当前招聘网站逐条抽取的实时 JD，也不代表所有雇主采用相同录用门槛。招聘链接是官方搜索入口；具体资格和要求必须以目标公司、地区、团队和批次的原始职位描述为准。",
  "",
  "## 先筛实习资格",
  "",
  "投递前先逐项检查硬性资格，技术能力准备不能替代申请资格：",
  "",
  bullets(["在校状态和允许申请的学位阶段","预计毕业年月、毕业窗口及项目/实习批次","专业或课程背景限制","连续实习时长、每周到岗天数与开始时间","工作地点、远程/现场要求、工作许可与语言要求","职位开放状态、截止时间和申请次数限制"]),
  "",
  "资格项会因公司、团队、地区和年份而变动。若 JD 中没有明确说明，应查看招聘 FAQ 或向招聘联系人确认。",
  "",
  "## 能力等级说明",
  "",
  "| 标记 | 解释 |",
  "|---|---|",
  "| 常见核心能力 | 值得优先准备的通用能力组合；不代表每份 JD 都逐项设为硬性要求。 |",
  "| 语言/平台任选其一 | 同一岗位可能使用不同技术栈；按目标职位选择，不需要全部学完。 |",
  "| 加分/进阶能力 | 有帮助的扩展项，通常排在核心交付与资格核验之后。 |",
  "| 作品证据 | 可展示、可复现、能说明个人贡献的证据，不等于项目数量。 |",
  "",
  "## 岗位画像",
  ""
];
for (const role of data.roles) {
  const category = role.group === "software" ? "软件与系统" : role.group === "data-ai" ? "数据与 AI" : role.group === "infra" ? "云与基础设施" : "安全与终端";
  lines.push("### " + role.title, "", "**方向：** " + category + "  ·  **画像编号：** " + role.code, "", role.summary, "", "**实习生常见任务**", "", bullets(role.internWork), "", "**常见核心能力**", "", bullets(skillNames(role.must)), "");
  if (role.mustOneOf && role.mustOneOf.length) {
    lines.push("**岗位技术栈路径（每组择一或按 JD 确认）**", "");
    for (const group of role.mustOneOf) lines.push("- " + skillNames(group).join(" / "));
    lines.push("");
  }
  lines.push("**加分 / 进阶能力**", "", bullets(skillNames(role.preferred)), "", "**作品或项目证据**", "", bullets(role.evidence), "", "**常见面试关注点**", "", bullets(role.interview), "", "**可能适配**", "", role.fit, "", "**岗位和技术参考入口**", "");
  for (const id of role.sourceIds) {
    const source = data.sources.find((item) => item.id === id);
    if (source) lines.push("- [" + esc(source.name) + "](" + source.url + ")（" + source.type + "）");
  }
  lines.push("");
}
lines.push("## 岗位之间共用的能力网络","","- **共同底座**：Shell、Git、算法与数据结构、测试、调试及至少一门主力语言。","- **通用工程**：Linux、操作系统、网络、并发、数据库、API 设计和性能分析。","- **数据与 AI**：Python、SQL、统计、数据质量、模型评估；根据岗位选择数据工程、ML 工程、Agent 或 AI 系统方向。","- **专门分支**：安全、嵌入式、GPU、量化开发、量化研究等。它们有不同的数学、设备或系统要求，先选目标再深入。","","详细节点定义和先修关系见 KNOWLEDGE_ARCHITECTURE.md。在交互站点中，选择岗位可高亮相关技能；点击技能能打开前置项与验证成果。","","## 引用和持续更新","","招聘入口与技术参考列表见站点下方“如何使用这张地图”。维护具体 JD 时，建议为每条记录追加：原始职位 URL、公司/团队、地点、发布日期或核查日、资格要求原文、职责/技能证据及过期状态。不要把概括性的岗位画像伪装成某公司当前 JD。");
const output = path.join(__dirname, "..", "docs", "ROLE_REQUIREMENTS.md");
fs.mkdirSync(path.dirname(output), { recursive: true });
fs.writeFileSync(output, lines.join("\n") + "\n", "utf8");
console.log("Generated " + path.relative(path.join(__dirname, ".."), output) + " (" + data.roles.length + " roles).");
