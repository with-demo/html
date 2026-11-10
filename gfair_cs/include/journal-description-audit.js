/* 기존 화면 변경 중 설명에 누락된 부분만 보정한다. ID·댓글·비고는 유지한다. */
(()=>{
 'use strict';
 const note='[변경사항 있음 · 2026-11-05] 실제 화면 대조: 통역원 선택·라디오 기본값·통화 선택·저장 및 버튼 동작 설명 보완.';
 const append=(text,line)=>String(text||'').includes(line)?text:[text,line].filter(Boolean).join('\n');
 const patches={
  'JNL-16':{
   '170e44e7-0dd2-4b47-a721-2f2df9ae3205':s=>({...s,item:'통역원 정보 · 상담 일시',type:'기타',detail:s.detail.replace('해당 상담일지에 저장된 행사·작성자 등 기본 정보를 표시.','해당 상담일지에 저장된 통역원 정보와 상담 시작·종료 일시를 표시.'),policy:append(s.policy,'[통역원] 본인 이름은 자동 표시하며 직접 변경 불가. 필수 별표 미표시.\n[관리자 / 수출상담 운영용역사] 통역원명을 단일 선택 드롭다운에서 변경 가능. 작성 계정과 상담 담당 통역원은 구분한다.')}),
   '6d3a9e8a-387d-4b0c-97ae-9e1253fd9a4d':s=>({...s,enabled:s.enabled.replace('[공통] 통화는 USD 고정으로 다른 통화 선택 불가.','[공통] 편집 가능한 상태에서는 수출 상담액·계약 추진액의 통화를 각각 USD / KRW 중 선택 가능.'),policy:s.policy.replace('두 금액의 통화는 USD로 고정.','각 금액과 통화는 저장값을 표시한다. 통화 저장값이 없으면 USD를 기본 선택한다.')}),
   '2e7272c4-3e4b-4e21-ad18-b90d50f56216':s=>({...s,policy:append(s.policy,'저장된 라디오 선택값을 우선 표시한다. 저장값이 없으면 거래 가능성은 보통, 현장 계약·우수 사례·샘플 전달·MOU 체결·MOU 예정은 아니오로 표시한다.')}),
   '627b422f-2c05-4299-90d3-3d34a674d053':s=>({...s,destination:'처리 후 현재 JNL-16 상세 화면을 유지하고 처리 상태·이력을 갱신한다.'}),
   'f681564b-78f0-462c-84d5-ec65a9d6e180':s=>({...s,exception:s.exception.replace('등록된 제품군 없음','등록된 메인 카테고리 없음')})
  },
  'JNL-14':{'47bf9d25-5a82-4040-8c88-1fefe3997cfe':s=>({...s,policy:s.policy.replace('결과 라디오 미선택','거래 가능성 미선택, 현장 계약·우수 사례·샘플 전달·MOU 체결·MOU 예정은 아니오 기본 선택')})}
 };
 let running=false;
 async function apply(){
  const route=location.hash.slice(1),store=window.GFAIR_COLLAB,changes=window.GFAIR_DESCRIPTION_CHANGES;
  if(running||!patches[route]||!store?.user?.editor||!store.loaded||!changes)return;
  running=true;
  try{
   for(const [id,patch] of Object.entries(patches[route])){
    if(location.hash.slice(1)!==route)break;
    const record=store.records.find(r=>r.id===id);if(!record)continue;
    let before;try{before=JSON.parse(record.text);}catch{continue;}
    if(before.format!=='description-spec-v1'||String(before.planningNote||'').includes(note))continue;
    const after=patch(before);
    // 기획비고 삭제만으로 이미 적용한 설명을 다시 저장하지 않는다.
    if(Object.keys(after).every(key=>after[key]===before[key]))continue;
    // 과거 보정 안내는 사용자가 지운 뒤 다시 추가하지 않는다.
    await store.mutate('update',{id,text:JSON.stringify(changes.markAgentChanges(before,after)),revision:record.revision});
   }
  }catch(error){console.error('수출상담일지 설명 대조 반영 실패:',error.message);}finally{running=false;}
 }
 window.addEventListener('collaboration-updated',apply);window.addEventListener('hashchange',apply);apply();
})();
