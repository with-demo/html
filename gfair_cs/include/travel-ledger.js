// 행사연도·바이어별 방한 기록. 단계별 슬롯 대신 발생한 기록을 개별 보관한다.
(()=>{'use strict';
 const stages=['미입국','입국','호텔 이동','호텔 도착','전시장 출발','전시장 입장','통역원 만남','상담 시작','상담 종료','행사장 퇴장'];
 const normalize=stage=>stage==='전시장 퇴장'?'행사장 퇴장':stage;
 const qrStages=stages.filter(stage=>!['미입국','상담 시작','상담 종료'].includes(stage));
 const storageKey='gfair.travel-ledger.v1';
 function validTime(value){const m=String(value||'').match(/^(\d{4})-(\d{2})-(\d{2})[ T](\d{2}):(\d{2})(?::(\d{2}))?$/);if(!m)return false;const [,y,mo,d,h,mi,se='0']=m,date=new Date(Date.UTC(+y,+mo-1,+d,+h,+mi,+se));return date.getUTCFullYear()===+y&&date.getUTCMonth()===+mo-1&&date.getUTCDate()===+d&&+h<24&&+mi<60&&+se<60;}
 const time=value=>String(value).replace('T',' ')+(String(value).length===16?':00':'');
 const ordered=records=>records.map(r=>({...r,stage:normalize(r.stage)})).filter(r=>stages.includes(r.stage)&&validTime(r.effective)&&(r.source!=='journal'||r.effective<=new Intl.DateTimeFormat('sv-SE',{timeZone:'Asia/Seoul',year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',second:'2-digit',hour12:false}).format(new Date()))).slice().sort((a,b)=>a.effective.localeCompare(b.effective));
 function timeline(records){return ordered(records).map(r=>({...r,date:r.effective.slice(0,10)}));}
 function create(storage){
  const read=()=>{try{return JSON.parse(storage.getItem(storageKey)||'{}');}catch{return {};}};
  const member=(year,code)=>String(year)+'|'+code;
  const get=(year,code)=>{const value=read()[member(year,code)];return value&&Array.isArray(value.records)?value:{records:[],audit:[],seen:[]};};
  const save=(year,code,value)=>{const all=read();all[member(year,code)]=value;storage.setItem(storageKey,JSON.stringify(all));return value;};
  function sync(year,code){let qr;try{qr=JSON.parse(storage.getItem('gfair.qr.checks')||'[]');}catch{qr=[];}const state=get(year,code),seen=new Set(state.seen||[]),next={...state,records:state.records.slice()};let changed=false;
   qr.forEach((r,index)=>{if(r.mode!=='travel'||r.participantType!=='OVERSEAS'||String(r.eventYear)!==String(year)||r.code!==code||!qrStages.includes(normalize(r.state))||!Number.isFinite(Date.parse(r.at)))return;const id='qr|'+index+'|'+r.at+'|'+r.state;if(seen.has(id))return;const effective=new Intl.DateTimeFormat('sv-SE',{timeZone:'Asia/Seoul',year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',second:'2-digit',hour12:false}).format(new Date(r.at));next.records.push({id,stage:normalize(r.state),effective,source:'QR',actor:'',reason:''});seen.add(id);changed=true;});
   if(changed){next.seen=[...seen];try{save(year,code,next);}catch{/* QR 원본은 유지되므로 조회는 계속 제공한다. */}}return changed?next:state;
  }
  function write(year,code,{id,stage,effective,actor,reason,at,cancel=false}){if(!reason?.trim())throw Error('변경 사유를 입력해 주세요.');const state=sync(year,code),old=id?state.records.find(r=>r.id===id):null;if(id&&!old)throw Error('방한기록이 변경되었습니다. 다시 확인해 주세요.');if(!cancel&&(!stages.includes(stage)||!validTime(effective)))throw Error('방한현황과 유효한 기록일시를 입력해 주세요.');if(cancel&&!old)throw Error('취소할 기록이 없습니다.');const record=cancel?null:{id:old?.id||'manual|'+Date.now()+'|'+Math.random().toString(36).slice(2),stage,effective:time(effective),actor,reason:reason.trim(),source:'manual'},next={...state,records:state.records.filter(r=>r.id!==old?.id),audit:[...(state.audit||[]),{recordId:old?.id||record.id,stage:cancel?old.stage:stage,oldStage:old?.stage||null,newStage:cancel?null:stage,oldEffective:old?.effective||null,newEffective:record?.effective||null,at,actor,reason:reason.trim(),operation:cancel?'기록취소':old?'방한기록 수정':'기록등록'}]};if(cancel&&old?.id?.startsWith('journal|'))next.journalCancelled=[...new Set([...(state.journalCancelled||[]),old.id])];if(record)next.records.push(record);save(year,code,next);return record;}
  function syncJournal(year,code,journal){
   if(!journal?.id||journal.type!=='수출'||!code)return;
   const start=journal.consultStart,end=journal.consultEnd;
   if(!validTime(start)||(end&&(!validTime(end)||time(end)<time(start))))return;
   const state=sync(year,code),prefix='journal|'+journal.id+'|',next={...state,records:state.records.filter(r=>!r.id.startsWith(prefix)||r.source==='manual')};
   for(const [stage,value] of [['상담 시작',start],['상담 종료',end]]){if(!value)continue;const id=prefix+stage;if(next.records.some(r=>r.id===id)||(state.journalCancelled||[]).includes(id))continue;next.records.push({id,stage,effective:time(value),source:'journal',actor:journal.interpreterName||journal.writer||'',reason:'상담일지 상담 시각 연동',journalId:journal.id});}
   if(JSON.stringify(state.records)!==JSON.stringify(next.records))save(year,code,next);
  }
  return {get:sync,write,syncJournal,timeline:(year,code)=>timeline(sync(year,code).records)};
 }
 const api={create,timeline,validTime,stages,qrStages,normalize};if(typeof module!=='undefined'&&module.exports)module.exports=api;else{window.GFAIR_TRAVEL_LEDGER=api;window.addEventListener('message',event=>{const r=event.data?.record;if(event.origin!==location.origin||event.data?.type!=='gfair-travel-record'||r?.mode!=='travel'||r.participantType!=='OVERSEAS'||!qrStages.includes(normalize(r.state))||!Number.isFinite(Date.parse(r.at))||!/^20\d{2}$/.test(String(r.eventYear)))return;const source=(window.GFAIR_SCREENS||[]).flatMap(g=>g.screens).find(s=>s.id==='BAS-03'),person=source?.ui.rows.find(row=>row[0]===r.code);if(!person||!window.GFAIR_PARTICIPATION?.participating('BAS-03',person,String(r.eventYear)))return;try{const records=JSON.parse(sessionStorage.getItem('gfair.qr.checks')||'[]');if(records.some(x=>x.code===r.code&&String(x.eventYear)===String(r.eventYear)&&x.state===r.state&&x.at===r.at))return;records.push({code:r.code,name:person[1],state:r.state,at:r.at,mode:'travel',participantType:'OVERSEAS',eventYear:String(r.eventYear),role:r.role});sessionStorage.setItem('gfair.qr.checks',JSON.stringify(records));window.dispatchEvent(new Event('gfair-travel-recorded'));}catch{}});}
})();
