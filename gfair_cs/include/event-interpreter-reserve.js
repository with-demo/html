// 행사정보 통역원 예비인력: 기본정보와 분리해 행사연도·회원 코드별로 관리한다.
(()=>{'use strict';
 const storageKey='gfair.event-interpreter-reserve.v1';let values={};
 try{const saved=JSON.parse(sessionStorage.getItem(storageKey)||'{}');if(saved&&typeof saved==='object'&&!Array.isArray(saved))values=saved;}catch{}
 const key=(year,id)=>String(year)+'|'+id;
 window.GFAIR_EVENT_INTERPRETER_RESERVE={
  get:(year,id)=>values[key(year,id)]==='Y'?'Y':'N',
  setMany(year,ids,value){if(!['Y','N'].includes(value))throw Error('예비인력은 Y 또는 N으로 설정해 주세요.');const next={...values};for(const id of ids)next[key(year,id)]=value;try{sessionStorage.setItem(storageKey,JSON.stringify(next));}catch{throw Error('예비인력 정보를 저장할 공간이 부족합니다.');}values=next;}
 };
})();
