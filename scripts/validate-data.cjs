const assert = require("assert/strict");
const data = require("./load-data.cjs");
const skillById = Object.fromEntries(data.skills.map((s)=>[s.id,s]));
const sourceIds = new Set(data.sources.map((s)=>s.id));
const roleIds = new Set(data.roles.map((r)=>r.id));
for(const [name,items] of [["skills",data.skills],["roles",data.roles],["sources",data.sources],["jdEvidence",data.jdEvidence]]){
  assert.equal(new Set(items.map((x)=>x.id)).size,items.length,"Duplicate IDs in "+name);
}
const known=(id)=>assert.ok(skillById[id],"Unknown skill: "+id);
const visiting=new Set(),visited=new Set();
function visit(id){
  assert.ok(!visiting.has(id),"Prerequisite cycle at "+id);
  if(visited.has(id))return;
  visiting.add(id);skillById[id].prerequisites.forEach(visit);visiting.delete(id);visited.add(id);
}
for(const skill of data.skills){
  assert.ok(data.layers[skill.layer],"Unknown layer: "+skill.id);
  for(const key of ["title","summary","why","proof"])assert.ok(typeof skill[key]==="string"&&skill[key].length>0,skill.id+" missing "+key);
  assert.ok(skill.topics.length>=4&&skill.topics.every((x)=>typeof x==="string"&&x.length>0),skill.id+" missing detailed topics");
  skill.prerequisites.forEach(known);skill.roleIds.forEach((id)=>assert.ok(roleIds.has(id)));
}
data.skills.forEach((s)=>visit(s.id));
let pathVariants=0;
for(const role of data.roles){
  role.skillIds.forEach(known);role.sourceIds.forEach((id)=>assert.ok(sourceIds.has(id)));
  assert.ok(role.path&&role.path.steps.length>=3&&role.evidence.length>=3,"Incomplete path: "+role.id);
  [...role.path.start,...role.path.core,...role.path.advance].forEach(known);
  assert.ok(data.jdEvidence.some((jd)=>jd.roleIds.includes(role.id)),"Missing JD association: "+role.id);
  const combinations=role.mustOneOf.reduce((choices,group)=>choices.flatMap((choice)=>group.map((id)=>[...choice,id])),[[]]);
  for(const choices of combinations){
    pathVariants++;
    const route=data.getLearningPath(role.id,choices),order=new Map(route.required.map((id,index)=>[id,index]));
    assert.equal(order.size,route.required.length,"Duplicate route node: "+role.id);
    assert.deepEqual([...route.foundation,...route.core],[...route.required],"Invalid phase order: "+role.id);
    for(const id of [...role.must,...choices,...role.path.core])assert.ok(order.has(id),"Path missing required seed: "+role.id+":"+id);
    for(const id of route.required)for(const pre of skillById[id].prerequisites)assert.ok(order.has(pre)&&order.get(pre)<order.get(id),role.id+": prerequisite not before "+id+":"+pre);
    route.advance.forEach(known);
  }
}
assert.ok(!data.getLearningPath("ai-app",["typescript"]).required.includes("python"),"TypeScript AI application route incorrectly forces Python");
assert.ok(!data.getLearningPath("mobile",["ios-swift"]).required.includes("android-kotlin"),"iOS route incorrectly forces Android");
assert.ok(!skillById.concurrency.prerequisites.includes("cpp"),"Concurrency incorrectly forces C++");
for(const jd of data.jdEvidence){
  for(const field of ["company","title","location","url","sourceApiUrl","checked","note","quote"])assert.ok(jd[field],jd.id+" missing "+field);
  assert.match(jd.checked,/^\d{4}-\d{2}-\d{2}$/);
  assert.ok(["source-readable","needs-refresh","direction-pool"].includes(jd.status),"Unsupported job status");
  for(const url of [jd.url,jd.sourceApiUrl])assert.equal(new URL(url).protocol,"https:");
  assert.ok(jd.eligibility.length>0&&jd.required.length>0);
  jd.roleIds.forEach((id)=>assert.ok(roleIds.has(id),"Unknown JD role: "+id));
  [...jd.required,...jd.preferred].forEach((claim)=>{assert.ok(claim.text&&claim.skillIds.length);claim.skillIds.forEach(known);});
}
console.log(JSON.stringify({roles:data.roles.length,skills:data.skills.length,topics:data.skills.reduce((n,s)=>n+s.topics.length,0),edges:data.skills.reduce((n,s)=>n+s.prerequisites.length,0),jdEvidence:data.jdEvidence.length,pathVariants,prerequisiteCycles:0},null,2));
