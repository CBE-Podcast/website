const RECIPIENT='cbe_podcast@yahoo.com';
const esc=s=>String(s??'').slice(0,5000).replace(/[\r\n]+/g,' ').trim();
export async function onRequestPost({request,env}){
 const json=(data,status=200)=>Response.json(data,{status,headers:{'Cache-Control':'no-store'}});
 try{
  if(!env.TURNSTILE_SECRET_KEY||!env.RESEND_API_KEY||!env.FROM_EMAIL)return json({error:'Form delivery is not configured yet. Please contact the podcast directly.'},503);
  const raw=await request.text();if(raw.length>45000)return json({error:'Submission too large.'},413);
  const d=JSON.parse(raw);if(d.website)return json({error:'Submission rejected.'},400);
  const kind=d.kind==='guest-form'?'guest':d.kind==='story-form'?'story':null;if(!kind)return json({error:'Unknown submission type.'},400);
  const token=d['cf-turnstile-response'];if(!token)return json({error:'Please complete the spam protection check.'},400);
  const ip=request.headers.get('CF-Connecting-IP')||'';
  const verify=await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({secret:env.TURNSTILE_SECRET_KEY,response:token,remoteip:ip})});
  const verified=await verify.json();if(!verified.success)return json({error:'Spam protection failed. Please retry.'},400);
  const required=kind==='guest'?['Full name','Reply email','Instagram handle','Location','About yourself','Why join','What makes you interesting','Topics','Unscripted','Equipment']:['Story headline','What happened','Source URL','Why it matters'];
  if(required.some(k=>!String(d[k]||'').trim()))return json({error:'Please complete all required fields.'},400);
  if(d['Reply email']&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d['Reply email']))return json({error:'Please enter a valid email address.'},400);
  if(kind==='story'){try{const u=new URL(d['Source URL']);if(!['http:','https:'].includes(u.protocol))throw 0}catch{return json({error:'Please provide a valid source URL.'},400)}}
  const who=esc(d['Full name']||d['Submitter name']||d['Instagram handle']||'Anonymous').slice(0,80);
  const subject=kind==='guest'?`CBE | GUEST APPLICATION | ${who} | ${esc(d['Instagram handle']).slice(0,50)}`:`CBE | STORY SUBMISSION | ${esc(d['Story headline']).slice(0,90)} | ${who}`;
  const lines=[`Certified Bad Example — ${kind==='guest'?'Guest Application':'Story Submission'}`,`Submitted: ${new Date().toISOString()}`,'',...Object.entries(d).filter(([k])=>!['kind','website','cf-turnstile-response'].includes(k)).map(([k,v])=>`${k}:\n${String(v).slice(0,5000)}`)];
  const payload={from:env.FROM_EMAIL,to:[RECIPIENT],subject:subject.slice(0,230),text:lines.join('\n\n')};
  if(d['Reply email'])payload.reply_to=d['Reply email'];
  const mail=await fetch('https://api.resend.com/emails',{method:'POST',headers:{Authorization:`Bearer ${env.RESEND_API_KEY}`,'Content-Type':'application/json'},body:JSON.stringify(payload)});
  if(!mail.ok)return json({error:'Email delivery failed. Please try again later.'},502);
  return json({ok:true});
 }catch(e){return json({error:'Unable to process submission. Please try again.'},500)}
}
