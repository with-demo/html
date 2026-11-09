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
 function setEntries(year,entries){const next={...values};for(const [id,value]of entries){if(!['Y','N','U'].includes(value))throw Error('인력구분을 확인해 주세요.');next[key(year,id)]=value;}try{sessionStorage.setItem(storageKey,JSON.stringify(next));}catch{throw Error('예비인력 정보를 저장할 공간이 부족합니다.');}values=next;}
 window.GFAIR_EVENT_INTERPRETER_RESERVE={
  setEntries,
  label:value=>value==='Y'?'예비':value==='U'?'미지정':'일반',
  confirmChange(names,value){const listed=names.slice(0,10).join(', ')+(names.length>10?' 외 '+(names.length-10)+'명':'');return window.confirm(listed+'\n'+(value==='U'?'총 '+names.length+'명의 인력구분을 미지정으로 변경하시겠습니까?':value==='Y'?'총 '+names.length+'명을 예비인력으로 지정하시겠습니까?':'총 '+names.length+'명의 예비인력 지정을 해제하시겠습니까?'));},
  get:(year,id)=>['Y','U'].includes(values[key(year,id)])?values[key(year,id)]:'N',
  setMany(year,ids,value){if(!['Y','N','U'].includes(value))throw Error('인력구분을 확인해 주세요.');setEntries(year,ids.map(id=>[id,value]));}
 };
})();
