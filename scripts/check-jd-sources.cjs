const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const data = require("./load-data.cjs");
function plain(value) {
  const decode=(text)=>text.replace(/&#(x[0-9a-f]+|[0-9]+);/gi,(_,n)=>String.fromCodePoint(n[0].toLowerCase()==="x"?parseInt(n.slice(1),16):Number(n)))
    .replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&quot;/g,'"').replace(/&apos;/g,"'").replace(/&nbsp;/g," ").replace(/&amp;/g,"&");
  return decode(decode(String(value))).replace(/<[^>]*>/g," ").replace(/[‘’]/g,"'").replace(/\s+/g," ").trim();
}
async function check(jd){
  const retrievedAt=new Date().toISOString();
  try{
    const response=await fetch(jd.sourceApiUrl,{signal:AbortSignal.timeout(25000)});
    if(!response.ok)throw new Error("HTTP "+response.status);
    const body=await response.json(), info=body.jobPostingInfo||body;
    const text=plain(info.jobDescription||info.content||"");
    return {id:jd.id,source:jd.sourceApiUrl,retrievedAt,httpStatus:response.status,title:info.title,quoteFound:text.includes(plain(jd.quote)),
      contentSha256:crypto.createHash("sha256").update(text).digest("hex"),sourceUpdatedAt:body.updated_at||null,
      interpretation:"Source availability and excerpt check only; not a hiring-open confirmation."};
  }catch(error){return {id:jd.id,source:jd.sourceApiUrl,retrievedAt,error:error.message,quoteFound:false};}
}
(async()=>{
  const results=[];
  for(let offset=0;offset<data.jdEvidence.length;offset+=4){results.push(...await Promise.all(data.jdEvidence.slice(offset,offset+4).map(check)));}
  const failed=results.filter((result)=>result.error||!result.title||!result.quoteFound);
  fs.mkdirSync(path.join(__dirname,"..","docs"),{recursive:true});
  fs.writeFileSync(path.join(__dirname,"..","docs","EVIDENCE_STATUS.json"),JSON.stringify({checkedAt:new Date().toISOString(),records:results},null,2)+"\n","utf8");
  console.log(JSON.stringify({sources:results.length,passed:results.length-failed.length,failed},null,2));
  if(failed.length)process.exitCode=1;
})().catch((error)=>{console.error(error);process.exitCode=1;});
