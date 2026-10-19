const assert = require("assert/strict");
const data = require("./load-data.cjs");
const skillById = Object.fromEntries(data.skills.map((s)=>[s.id,s]));
const sourceIds = new Set(data.sources.map((s)=>s.id));
const roleIds = new Set(data.roles.map((r)=>r.id));
for(const [name,items] of [["skills",data.skills],["roles",data.roles],["domains",data.domains],["sources",data.sources],["jdEvidence",data.jdEvidence]]){
  assert.equal(new Set(items.map((x)=>x.id)).size,items.length,"Duplicate IDs in "+name);
}
const known=(id)=>assert.ok(skillById[id],"Unknown skill: "+id);
const memberships=new Map(),moduleIds=new Set();
assert.ok(data.domains.length>=5&&data.domains.length<=8,'Overview should contain a small number of concepts');
for(const domain of data.domains){
  assert.ok(domain.summary&&domain.stage&&domain.color,'Incomplete concept: '+domain.id);
  assert.ok(domain.modules.length>0&&domain.modules.length<=8,'Too many sibling modules: '+domain.id);
  for(const module of domain.modules){
    assert.ok(!moduleIds.has(module.id),'Duplicate module: '+module.id);moduleIds.add(module.id);
    assert.equal(module.domainId,domain.id,'Invalid module parent');
    assert.ok(module.skillIds.length>0&&module.skillIds.length<=8,'Too many sibling skills: '+module.id);
    for(const id of module.skillIds){
      known(id);assert.ok(!memberships.has(id),'Skill appears in multiple hierarchy locations: '+id);
      memberships.set(id,module.id);
      assert.equal(skillById[id].domainId,domain.id);assert.equal(skillById[id].moduleId,module.id);
    }
  }
  assert.deepEqual([...domain.skillIds].sort(),[...domain.modules.flatMap(m=>m.skillIds)].sort());
}
assert.equal(memberships.size,data.skills.length,'Hierarchy has orphan skills');
assert.deepEqual([...roleIds].sort(),['cpp-systems','fintech-backend','backend','ai-app','quant-research','ai-infra'].sort(),'Roles must follow the personal learning routes');
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
  assert.ok(skill.roleIds.length,'Skill has no retained role or prerequisite use: '+skill.id);
  assert.ok(skill.topics.length<=8,'Too many sibling learning topics: '+skill.id);
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
assert.ok(data.getLearningPath('ai-app').required.includes('python'),'AI application route should use the Python roadmap');
assert.ok(!data.getLearningPath('backend',['java']).required.includes('python'),'Java service route should not force the optional Python data pipeline');
assert.ok(!data.getLearningPath('cpp-systems').required.includes('statistics'),'First order-book project should not require the later statistics stage');
assert.ok(!data.getLearningPath('ai-infra',['triton']).required.includes('cuda'),'Triton path should not force CUDA');
assert.equal(data.roleAliases['quant-dev'],'cpp-systems');
assert.equal(data.roleAliases['data-engineer'],'backend');
assert.ok(!skillById.concurrency.prerequisites.includes("cpp"),"Concurrency incorrectly forces C++");
for(const jd of data.jdEvidence){
  for(const field of ["company","title","location","url","sourceApiUrl","checked","note","quote"])assert.ok(jd[field],jd.id+" missing "+field);
  assert.match(jd.checked,/^\d{4}-\d{2}-\d{2}$/);
  assert.ok(["source-readable","needs-refresh","direction-pool"].includes(jd.status),"Unsupported job status");
  for(const url of [jd.url,jd.sourceApiUrl])assert.equal(new URL(url).protocol,"https:");
  assert.ok(jd.eligibility.length>0&&jd.required.length>0);
  jd.roleIds.forEach((id)=>assert.ok(roleIds.has(id),"Unknown JD role: "+id));
  [...jd.required,...jd.preferred].forEach((claim)=>{assert.ok(claim.text);claim.skillIds.forEach(known);});
}
const aiEvidence=data.jdEvidence.filter(jd=>jd.roleIds.includes('ai-app'));
assert.ok(aiEvidence.every(jd=>jd.scope==='adjacent-research')&&data.roles.find(r=>r.id==='ai-app').jdScope,'Adjacent research evidence must be labelled explicitly');
console.log(JSON.stringify({roles:data.roles.length,domains:data.domains.length,modules:moduleIds.size,skills:data.skills.length,topics:data.skills.reduce((n,s)=>n+s.topics.length,0),edges:data.skills.reduce((n,s)=>n+s.prerequisites.length,0),jdEvidence:data.jdEvidence.length,pathVariants,prerequisiteCycles:0,hierarchyOrphans:0},null,2));
