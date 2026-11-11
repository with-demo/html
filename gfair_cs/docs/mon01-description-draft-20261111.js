/* 공동작업자가 명시적으로 실행하는 MON-01 검토 완료 처리. 자동 저장하지 않는다. */
(()=>{'use strict';
if(new URL(location.href).searchParams.get('descriptionReview')!=='mon01')return;
let button;
function setup(){
const store=window.GFAIR_COLLAB;if(location.hash!=='#MON-01'||!store?.user?.editor||button)return;
button=document.createElement('button');button.className='btn';button.textContent='MON-01 빨간색 표시 검토 완료';button.style.cssText='position:fixed;right:24px;bottom:20px;z-index:100000;background:#fff;padding:12px;border:2px solid #333';document.body.append(button);
button.onclick=async()=>{button.disabled=true;try{await store.refresh(true);const records=[...store.records];let count=0;for(const saved of records){let spec;try{spec=JSON.parse(saved.text)}catch{continue}if(!spec.codexHighlights)continue;delete spec.codexHighlights;const latest=store.records.find(r=>r.id===saved.id);if(latest.text!==saved.text)throw Error('설명이 변경되었습니다. 다시 불러와 주세요.');await store.mutate('update',{id:latest.id,revision:latest.revision,text:JSON.stringify(spec)});button.textContent=++count+'개 검은색으로 저장 중';}button.textContent='MON-01 검은색 텍스트 서버 저장 완료';window.dispatchEvent(new Event('annotation-render'));}catch(error){button.textContent=error.message;button.disabled=false;}};}
window.addEventListener('collaboration-updated',setup);setup();
})();