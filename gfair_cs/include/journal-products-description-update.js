/* 등록·상세의 기업 항목 분리 및 제품별 카테고리 행 변경. 기존 ID·비고·댓글 유지. */
(()=>{
 'use strict';
 const note='[변경사항 있음 · 2026-11-05] 기업명·부스번호를 분리하고 카테고리·상담 제품을 행 단위로 추가. 자동입력 항목의 필수 별표 제거.';
 const company=s=>({...s,item:'기업명 · 부스번호',detail:s.detail.replace('기업명 / 부스 번호를 함께 표시하고 상단 검색창으로 등록된 기업 검색.','기업명은 단일 선택 드롭다운, 부스번호는 별도 자동입력 항목으로 같은 행에 표시. 상단 검색창으로 기업명·부스번호 검색.').replace('저장된 참가 기업을 기업명 / 부스 번호로 표시.','저장된 참가 기업명과 부스번호를 별도 항목으로 같은 행에 표시.').replace('기업명 / 부스 번호는 참가기업(BAS-09) 정보와 연계한다.','기업명과 부스번호는 참가기업(BAS-09) 정보와 연계한다.'),policy:[s.policy,'기업명 선택 시 부스번호·사업자 번호·제품군·담당자·담당자 연락처를 자동 입력한다. 자동 입력 항목은 회색 비활성으로 표시하며 필수 별표를 표시하지 않는다.'].filter(Boolean).join('\n')});
 const buyer=s=>({...s,policy:[s.policy,'바이어 선택 후 자동 입력되는 국가·기업명·연락처에는 필수 별표를 표시하지 않는다.'].filter(Boolean).join('\n')});
 const products=s=>({...s,item:'메인 카테고리 · 상담 제품',type:'기타',defaultValue:s.defaultValue.replace('일지에 저장된 대표 제품군','각 행에 저장된 메인 카테고리·상담 제품'),detail:'선택한 참가기업에 등록된 메인 카테고리 중 해당 제품의 카테고리를 선택하고, 실제 상담한 제품명을 입력한다.\n[+] 클릭 시 메인 카테고리와 상담 제품이 한 쌍인 행을 추가하며, 추가 행의 [−] 클릭 시 해당 행 전체를 삭제한다.',policy:s.policy.replace('제품군이 1개면 자동 선택하고, 2개 이상이면 ‘선택해 주세요’를 표시한다.','각 행의 제품군이 1개면 자동 선택하고 필수 별표를 표시하지 않는다. 2개 이상이면 ‘선택해 주세요’를 표시하고 직접 선택한다.').replace('참가기업 변경 시 기존 선택을 초기화하고 새 기업 기준으로 적용한다.','참가기업 변경 시 모든 행의 카테고리 선택을 초기화하고 새 기업 기준으로 적용한다.')+'\n각 행의 카테고리와 제품명을 한 쌍으로 저장·조회하며, 행 삭제 시 나머지 행의 연결은 유지한다.'});
 const patches={
  'JNL-05':{'48ecfd20-8927-454f-9552-36a521f86ccb':company,'cdb01469-49a6-43f5-a19b-e08a9e064cd2':buyer,'340a41dc-0b62-408a-98ef-b9f8078399c1':products},
  'JNL-16':{'ab176dc5-b32a-497e-9bbf-20c030f3747f':company,'7a18d599-0b39-43d3-8e20-d3fc1471a015':buyer,'f681564b-78f0-462c-84d5-ec65a9d6e180':products}
 };
 let running=false;
 async function apply(){
  const route=location.hash.slice(1),store=window.GFAIR_COLLAB,changes=window.GFAIR_DESCRIPTION_CHANGES;
  if(running||!patches[route]||!store?.user?.editor||!store.loaded||!changes)return;
  running=true;
  try{for(const [id,patch] of Object.entries(patches[route])){
   if(location.hash.slice(1)!==route)break;
   const record=store.records.find(r=>r.id===id);if(!record)continue;
   let before;try{before=JSON.parse(record.text);}catch{continue;}
   if(before.format!=='description-spec-v1'||String(before.planningNote||'').includes(note))continue;
   const after=patch(before);after.planningNote=[before.planningNote,note].filter(Boolean).join('\n');
   await store.mutate('update',{id,text:JSON.stringify(changes.markAgentChanges(before,after)),revision:record.revision});
  }}catch(error){console.error('수출상담일지 Description 반영 실패:',error.message);}finally{running=false;}
 }
 window.addEventListener('collaboration-updated',apply);window.addEventListener('hashchange',apply);apply();
})();
