(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.GFAIR_EXPORT_JOURNAL_HISTORY=api;})(typeof globalThis!=='undefined'?globalThis:this,function(){
 'use strict';
 const stamp=(value,fallback='')=>{const match=String(value||'').replaceAll('.','-').match(/20\d{2}-\d{2}-\d{2}[ T]\d{2}:\d{2}/);return match?match[0].replace('T',' '):String(fallback||'').replace('T',' ').slice(0,16);};
 function events(j){
  const result=[],transfers=new Map(),seen=new Set(),history=[...(j.history||[])].reverse();
  const creation=(j.auditExamples||[]).find(([,label])=>/최초\s*등록/.test(label));
  const created=stamp(j.createdAt||creation?.[0]||history.find(([state])=>['작성 중','임시 저장'].includes(state))?.[1],j.time||history[0]?.[1]);
  const initial=j.initialStatus||creation?.[3]||'작성 중';
  if(created)result.push([created,'최초 등록',j.createdByProxy?'대리 등록':'최초 등록',initial,'']);
  const transfer=(at,change,state,reason)=>{at=stamp(at,j.time);if(!at)return;change=String(change||'').split(' · ')[0].trim();const key=at+'|'+change.replace(/\s/g,'');const old=transfers.get(key);transfers.set(key,[at,'통역원 변경 · 상담일지 이관',change,state&&state!=='—'?state:old?.[3]||'작성 중',reason||old?.[4]||'']);};
  let previous=initial;
  for(const [raw,source,reason]of history){const next=raw==='임시 저장'?'작성 중':raw==='재제출 예시'?'승인 요청':raw,at=stamp(source,j.time);if(/이관/.test(raw)){transfer(at,source,'',reason);continue;}if(!['작성 중','승인 요청','승인 완료','반려'].includes(next))continue;if(['승인 요청','반려','승인 완료'].includes(next)){const label=next==='승인 완료'?'승인 완료':next==='반려'?'반려':previous==='반려'?'승인 재요청':'승인 요청',key=at+'|'+next+'|'+String(reason||'');if(!seen.has(key)){seen.add(key);result.push([at,label,previous+' → '+next,next,reason||'']);}}previous=next;}
  for(const [at,label,change,state,reason]of j.auditExamples||[])if(/이관|통역원 변경/.test(label))transfer(at,change,state,reason);
  for(const entry of j.transferHistory||[])transfer(entry.at,(entry.fromName||'미배정')+' → '+(entry.toName||'미배정'),'',entry.reason);
  if(j.status==='승인 완료'&&!result.some(row=>row[1]==='승인 완료'))result.push([stamp(j.approvedAt||j.updatedAt,j.time),'승인 완료',(previous==='승인 완료'?'등록':previous)+' → 승인 완료','승인 완료','']);
  result.push(...transfers.values());return result.sort((a,b)=>b[0].localeCompare(a[0])||Number(a[1]==='최초 등록')-Number(b[1]==='최초 등록'));
 }
 return {events};
});
