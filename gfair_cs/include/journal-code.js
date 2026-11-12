/* 표시용 일지코드. 내부 일지 ID 및 이관·검수 연결은 유지한다. */
(()=>{'use strict';
 function eventYear(j,fallback){const value=j.eventYear||String(j.eventName||'').match(/20\d{2}/)?.[0]||String(j.consultStart||j.date||j.time||'').match(/^20\d{2}/)?.[0]||String(fallback);if(!/^20\d{2}$/.test(String(value)))throw Error('일지의 행사연도를 확인해 주세요.');return String(value);}
 function create(storage){
  let state={codes:{},next:{}};try{const saved=JSON.parse(storage?.getItem('gfair.journal-codes.v1')||'null');if(saved?.codes&&saved?.next)state=saved;}catch{}
  function key(j,fallback){return JSON.stringify([eventYear(j,fallback),j.type,j.id]);}
  function prefix(j,fallback){return 'CS'+eventYear(j,fallback).slice(-2)+(j.type==='구매'?'K':'F');}
  function assign(records,fallback){let changed=false;const reserved=new Set(Object.values(state.codes));
   for(const j of records){if(!j.id||!['구매','수출'].includes(j.type))continue;const k=key(j,fallback),p=prefix(j,fallback);let code=state.codes[k];
    if(!code||!new RegExp('^'+p+'[0-9]{5}$').test(code)){let n=Number(state.next[p])||0;do{n++;code=p+String(n).padStart(5,'0');}while(reserved.has(code));if(n>99999)throw Error('일지코드 일련번호 범위를 초과했습니다.');state.codes[k]=code;state.next[p]=n;reserved.add(code);changed=true;}j.journalCode=code;
   }
   if(changed)try{storage?.setItem('gfair.journal-codes.v1',JSON.stringify(state));}catch{}
  }
  function code(j,records,fallback){assign(records.includes(j)?records:[...records,j],fallback);return state.codes[key(j,fallback)];}
  return {assign,code};
 }
 if(typeof module!=='undefined'&&module.exports)module.exports={create,eventYear};else{let storage;try{storage=window.sessionStorage;}catch{}window.GFAIR_JOURNAL_CODES=create(storage);}
})();
