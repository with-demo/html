// 행사정보 통역원 예비인력: 기본정보와 분리해 행사연도·회원 코드별로 관리한다.
(()=>{'use strict';
 const storageKey='gfair.event-interpreter-reserve.v1';let values={};
 try{const saved=JSON.parse(sessionStorage.getItem(storageKey)||'{}');if(saved&&typeof saved==='object'&&!Array.isArray(saved))values=saved;}catch{}
 const key=(year,id)=>String(year)+'|'+id;
 // 2026년 참가 명단에서 예비인력 4명 예시를 최초 한 번만 구성한다.
 const seed='demo-reserve-20261108';
 if(!values[seed]){
  const rows=(window.GFAIR_SCREENS||[]).flatMap(g=>g.screens).find(s=>s.id==='BAS-07')?.ui?.rows||[];
  const people=rows.filter(row=>window.GFAIR_PARTICIPATION?.participating('BAS-07',row,'2026'));
  if(people.length){const next={...values};const needed=Math.max(0,4-people.filter(row=>next[key('2026',row[0])]==='Y').length);for(const row of people.filter(row=>!Object.hasOwn(next,key('2026',row[0]))).slice(0,needed))next[key('2026',row[0])]='Y';next[seed]=true;try{sessionStorage.setItem(storageKey,JSON.stringify(next));values=next;}catch{}}
 }
 window.GFAIR_EVENT_INTERPRETER_RESERVE={
  label:value=>value==='Y'?'예비':'일반',
  get:(year,id)=>values[key(year,id)]==='Y'?'Y':'N',
  setMany(year,ids,value){if(!['Y','N'].includes(value))throw Error('인력구분을 확인해 주세요.');const next={...values};for(const id of ids)next[key(year,id)]=value;try{sessionStorage.setItem(storageKey,JSON.stringify(next));}catch{throw Error('예비인력 정보를 저장할 공간이 부족합니다.');}values=next;}
 };
})();
