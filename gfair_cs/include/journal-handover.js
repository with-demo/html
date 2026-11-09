// 통역원 변경 시 승인 요청 전 수출상담일지의 소유권만 이관한다.
(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.GFAIR_JOURNAL_HANDOVER=api;})(typeof window==='undefined'?globalThis:window,()=>{
 'use strict';
 const storageKey='gfair.journal-handover.v1',clone=value=>JSON.parse(JSON.stringify(value)),name=value=>String(value||'').trim();
 function eventYear(j){const value=j.eventYear||j.year||String(j.eventName||'').match(/20\d{2}/)?.[0]||j.consultStart||j.updatedAt||j.time;return String(value||'').match(/20\d{2}/)?.[0]||'';}
 function eligible(j){return ['작성 중','임시 저장'].includes(j.status)&&!(j.history||[]).some(h=>/승인 요청|승인 완료|반려|재제출/.test(String(Array.isArray(h)?h[0]:h.action||h.status||'')));}
 function create(ctx){const store=ctx.storage;const read=()=>{try{return JSON.parse(store.getItem(storageKey)||'{}')}catch{return {}}};
  function list(buyer,previous,year){if(!previous)return [];return ctx.records().filter(j=>j.type==='수출'&&eventYear(j)===String(year)&&(j.buyerCode?j.buyerCode===buyer.id:name(j.buyer)===name(buyer.name))&&(j.writerId?j.writerId===previous.id:name(j.writer)===name(previous.name))).map(j=>({...j,transferable:eligible(j)}));}
  function restore(){const saved=read();for(const j of ctx.records()){const entry=saved[eventYear(j)+'|'+j.id];if(!entry)continue;Object.assign(j,clone(entry));}}
  function prepare(request,ids){if(!ctx.allowed())throw Error('상담일지를 이관할 권한이 없습니다.');const selected=[...new Set(ids)],available=list(request.buyer,request.previous,request.year),records=ctx.records(),targets=selected.map(id=>{const item=available.find(j=>j.id===id);if(!item||!item.transferable)throw Error('이관 대상 일지의 작성자 또는 상태가 변경되었습니다. 다시 확인해 주세요.');return records.find(j=>j.id===id);});
   const snapshots=targets.map(j=>[j,clone(j)]),raw=store.getItem(storageKey),draftRaw=store.getItem('gfair-draft'),saved=read();let committed=false;
   const restoreStorage=(key,value)=>value===null?store.removeItem(key):store.setItem(key,value);
   function rollback(){for(const [j,before]of snapshots){for(const key of Object.keys(j))if(!(key in before))delete j[key];Object.assign(j,clone(before));}restoreStorage(storageKey,raw);restoreStorage('gfair-draft',draftRaw);committed=false;}
   function commit(){if(committed)return;if(!ctx.allowed())throw Error('상담일지를 이관할 권한이 없습니다.');const nowAvailable=list(request.buyer,request.previous,request.year);for(const j of targets)if(!nowAvailable.some(r=>r.id===j.id&&r.transferable))throw Error('이관 대상 일지의 작성자 또는 상태가 변경되었습니다. 다시 확인해 주세요.');if(!targets.length){committed=true;return;}
    const changes=targets.map(j=>{const transfer={at:request.at,fromId:request.previous.id,fromName:request.previous.name,toId:request.next.id,toName:request.next.name,actor:request.actor,reason:request.reason};return [j,{writer:request.next.name,writerId:request.next.id,interpreterName:request.next.name,interpreterCode:request.next.id,originalWriter:j.originalWriter||j.writer,updatedAt:request.at,transferHistory:[...(j.transferHistory||[]),transfer],history:[['통역원 이관',request.previous.name+' → '+request.next.name+' · '+request.at,request.reason],...(j.history||[])]}];});
    for(const [j,value]of changes)saved[String(request.year)+'|'+j.id]=value;
    try{store.setItem(storageKey,JSON.stringify(saved));if(draftRaw){const draft=JSON.parse(draftRaw),change=changes.find(([j])=>j.id===draft.id);if(change&&eventYear(draft)===String(request.year))store.setItem('gfair-draft',JSON.stringify({...draft,...change[1]}));}for(const [j,value]of changes)Object.assign(j,value);committed=true;}catch(error){rollback();throw Error('상담일지 이관 정보를 저장하지 못했습니다.');}
   }
   return {commit,rollback,count:targets.length};
  }
  return {list,prepare,restore};
 }
 return {create,eligible,eventYear};
});
