const fs = require("fs");
const vm = require("vm");
const context = { window: {} };
vm.createContext(context);
vm.runInContext(fs.readFileSync("data.js", "utf8"), context);
const data = context.window.ATLAS_DATA;
const ids = new Set(data.skills.map((skill) => skill.id));
const missing = [];
const sourceIds = new Set(data.sources.map((source) => source.id));
for (const role of data.roles) {
  for (const id of role.must.concat(role.preferred, role.mustOneOf.flat())) {
    if (!ids.has(id)) missing.push(role.id + ":" + id);
  }
  for (const id of role.sourceIds) if (!sourceIds.has(id)) missing.push(role.id + ":source:" + id);
}
for (const skill of data.skills) for (const id of skill.prerequisites) if (!ids.has(id)) missing.push(skill.id + ":prerequisite:" + id);
const duplicateSkills = data.skills.map((skill) => skill.id).filter((id, index, list) => list.indexOf(id) !== index);
const visiting = new Set(), visited = new Set(), cycles = [];
function visit(id, path = []) {
  if (visiting.has(id)) { cycles.push(path.concat(id).join(" -> ")); return; }
  if (visited.has(id)) return;
  visiting.add(id);
  const skill = data.skills.find((item) => item.id === id);
  for (const prerequisite of skill.prerequisites) if (ids.has(prerequisite)) visit(prerequisite, path.concat(id));
  visiting.delete(id); visited.add(id);
}
for (const skill of data.skills) visit(skill.id);
console.log(JSON.stringify({
  roles: data.roles.length,
  skills: data.skills.length,
  sources: data.sources.length,
  edges: data.skills.reduce((sum, skill) => sum + skill.prerequisites.length, 0),
  missing,
  duplicateSkills,
  prerequisiteCycles: cycles
}, null, 2));
if (missing.length || duplicateSkills.length || cycles.length) process.exitCode = 1;
