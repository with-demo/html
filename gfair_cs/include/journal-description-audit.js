/* 기존 화면 변경 중 설명에 누락된 부분만 보정한다. ID·댓글·비고는 유지한다. */
(()=>{
 'use strict';
 const note='[변경사항 있음 · 2026-11-05] 실제 화면 대조: 통역원 선택·라디오 기본값·통화 선택·저장 및 버튼 동작 설명 보완.';
 const append=(text,line)=>String(text||'').includes(line)?text:[text,line].filter(Boolean).join('\n');
 const patches={
  'JNL-05':{
   '5b093d9a-5bf7-4fbb-8a87-b4581566c4f5':s=>({...s,item:'통역원 정보 · 상담 일시',type:'기타',defaultValue:'[통역원] 본인 이름 / [관리자·수출상담 운영용역사] 통역원 미선택 / 상담 일시 미선택',detail:s.detail.replace('행사·작성자는 자동 조회한 값이 텍스트 필드로 표시, 직접 변경 불가.','현재 행사 기준으로 통역원 정보와 상담 시작·종료 일시를 입력한다.').replace('상담 일시은','상담 일시는'),visibility:'[통역원] 본인 이름을 자동 표시하며 변경 불가. 자동 표시 항목에 필수 별표 미표시.\n[관리자 / 수출상담 운영용역사] 통역원명을 단일 선택 드롭다운에서 선택.',dataSource:'행사: 행사관리(BAS-01)의 현재 행사 정보. / 통역원: 현재 행사 참가 통역원 및 해당 일지에 선택한 통역원 정보.',policy:append(s.policy,'상담일지 작성 계정과 상담 담당 통역원을 구분한다. 관리자·운영용역사의 대리 작성도 선택한 통역원 정보로 표시한다.')}),
   '48ecfd20-8927-454f-9552-36a521f86ccb':s=>({...s,defaultValue:'현재 선택된 참가기업 / 해당 기업의 부스번호 자동입력',enabled:s.enabled.replace('사업자 번호·셀러 국가·제품군·상담사·담당자 연락처','부스번호·사업자 번호·제품군·담당자·담당자 연락처'),result:s.result.replace('사업자 번호·셀러 국가·제품군·담당자·담당자 연락처','부스번호·사업자 번호·제품군·담당자·담당자 연락처')}),
   'cdb01469-49a6-43f5-a19b-e08a9e064cd2':s=>({...s,enabled:append(s.enabled,'[관리자 / 수출상담 운영용역사] 통역원을 선택하기 전 바이어 선택 비활성. 통역원 선택 후 해당 통역원에게 매칭된 해외 바이어만 선택 가능.'),policy:append(s.policy,'대리 작성 중 통역원을 변경하면 기존 바이어 선택과 자동입력 정보를 비우고 새 통역원의 매칭 바이어 목록을 적용한다.')}),
   'c440b995-754d-47a3-9077-ebec8b17a58f':s=>({...s,enabled:'수출 상담액과 계약 추진액의 통화를 각각 USD / KRW 중 선택 가능.',validation:s.validation.replace('금액은 필수 입력, 숫자만 입력 가능.','금액은 필수 입력이며 0 이상의 숫자만 입력 가능.'),policy:s.policy.replace('통화는 USD로 고정.','두 금액의 통화는 USD를 기본 선택하며, 각각 USD / KRW 중 선택할 수 있다.')}),
   'ddb15c7b-3b9b-4f89-9c60-e97490de4444':s=>s.policy?.includes('신규 등록 시 라디오는 미선택 상태로 표시.')?({...s,defaultValue:'거래 가능성 미선택 / 현장 계약·우수 사례·샘플 전달·MOU 체결·MOU 예정은 아니오',policy:s.policy.replace('신규 등록 시 라디오는 미선택 상태로 표시.','신규 등록 시 거래 가능성은 미선택으로 표시하고 직접 선택한다. 현장 계약·우수 사례·샘플 전달·MOU 체결·MOU 예정은 ‘아니오’를 기본 선택한다.')}):s,
   'b301c68d-2472-4329-82be-250c5767602e':s=>s.result?.includes('기본 정보 우측 상단')?({...s,result:s.result.replace('기본 정보 우측 상단','통역원 정보 우측 상단'),policy:append(s.policy,'현재 목업의 임시 저장은 현재 탭의 기기 저장소에 보관하며, 실제 운영 서버 저장은 연계 전이다.')}):s,
   '3a5463bc-5e0c-4e65-ba1b-699de34a6e2d':s=>({...s,visibility:s.visibility.replace('[통역원] [등록] 버튼 미표시','[통역원] 승인 완료로 바로 등록하는 기능은 미제공. 통역원 화면의 [등록] 버튼은 09번 기준으로 승인 요청 처리.')}),
   '340a41dc-0b62-408a-98ef-b9f8078399c1':s=>({...s,exception:s.exception.replace('등록된 제품군 없음','등록된 메인 카테고리 없음')})
  },
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
