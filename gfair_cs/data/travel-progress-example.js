// 2026년 행사 참가 바이어 한 명의 3일차 상담 진행 예시. 사용자 기록은 덮어쓰지 않는다.
(()=>{'use strict';
 const storageKey='gfair.travel-ledger.v1',marker='travel-progress-example-20261110',year='2026';
 try{
  const saved=JSON.parse(sessionStorage.getItem(storageKey)||'{}');
  if(Object.values(saved).some(value=>value?.exampleSeed===marker))return;
  const source=(window.GFAIR_SCREENS||[]).flatMap(group=>group.screens).find(screen=>screen.id==='BAS-03');
  const rows=(source?.ui.rows||[]).filter(row=>window.GFAIR_PARTICIPATION?.participating('BAS-03',row,year));
  rows.sort((a,b)=>Number(b[1]==='James Whitmore')-Number(a[1]==='James Whitmore'));
  const ledger=window.GFAIR_TRAVEL_LEDGER.create(sessionStorage),person=rows.find(row=>{const state=ledger.get(year,row[0]);return state.records.length===0||state.exampleSeed==='travel-progress-example-20261109'&&state.records.every(r=>r.example);});
  if(!person)return;
  const steps=[['입국','28 09:10'],['호텔 이동','28 09:50'],['호텔 도착','28 10:40'],['전시장 출발','29 09:00'],['전시장 입장','29 09:20'],['통역원 만남','29 09:30'],['상담 시작','29 10:00'],['상담 종료','29 17:00'],['행사장 퇴장','29 17:30'],['전시장 출발','30 09:00'],['전시장 입장','30 09:20'],['통역원 만남','30 09:30'],['상담 시작','30 10:00']];
  const latest=JSON.parse(sessionStorage.getItem(storageKey)||'{}'),key=year+'|'+person[0];
  latest[key]={...ledger.get(year,person[0]),exampleSeed:marker,records:steps.map(([stage,date],index)=>({id:marker+'|'+index,stage,effective:'2026-10-'+date+':00',source:stage.startsWith('상담 ')?'journal':'QR',actor:'',reason:'방한현황 검토용 예시',example:true}))};
  sessionStorage.setItem(storageKey,JSON.stringify(latest));
 }catch{/* 저장할 수 없으면 기존 기록과 화면을 그대로 유지한다. */}
})();
