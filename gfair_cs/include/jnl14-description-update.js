/* JNL-14 2026-11-05 변경에 대한 1회 Description 보정.
 * 기존 ID·댓글·핀·무관한 설명은 보존하고 공동작업자 권한·revision 검증을 사용한다.
 */
(()=>{
 'use strict';
 const note='[변경사항 있음 · 2026-11-05] 개별 검색필터를 사용자별 키워드 검색으로 통합하고 통역원 목록의 통역원 열을 제외.';
 const patches={
  '37ae13c8-b2d4-4f54-88cd-f48d753e9131':s=>({...s,policy:s.policy+'\n- 키워드 검색은 선택한 항목을 대상으로 적용하며, 전체 선택 시 해당 사용구분에 제공되는 모든 키워드 항목에서 조회한다.'}),
  '421ee8f5-e482-4ab4-ad08-3000661de36b':s=>({...s,item:'키워드 검색',type:'기타',defaultValue:'검색 항목 전체 / 검색어 빈값',detail:'항목 선택과 검색어 입력으로 상담일지 검색.',visibility:'[관리자 / 수출상담 운영용역사] 전체 / 해외 바이어 / 국가 / 참가기업 / 부스번호 / 통역원.\n[통역원] 전체 / 해외 바이어 / 국가 / 참가기업 / 부스번호.',dataSource:'상담일지에 저장된 해외 바이어·국가·참가기업·부스번호·통역원 정보.',policy:'- 검색어는 앞뒤 공백 제거 후 영문 대소문자 구분 없이 부분 일치로 조회한다.\n- 국가 검색은 국가명과 국가코드를 대상으로 한다.\n- 선택한 항목 내에서 검색하며, 전체는 해당 사용구분의 모든 키워드 항목을 대상으로 한다.\n- 다른 필터와 AND로 결합하며 [검색] 클릭 시 적용한다.'}),
  'b5d5b082-f13e-4d4f-8eaf-291167f62a52':s=>({...s,result:s.result.replace('상태 전체, 다중 선택 해제 후 목록 갱신.','상태 전체, 태그 선택 해제, 키워드 항목 전체·검색어 빈값으로 복원 후 목록 갱신.')}),
  'c70f1d78-9098-4032-96b4-8daa8c49ad62':s=>({...s,detail:'해외 바이어·국가·참가기업·부스번호·업데이트 일시·제출 일시·처리 상태를 표시하며 해외 바이어명 클릭 시 상세 이동.',visibility:s.visibility.replace('작성자 컬럼 추가. 승인 요청 행·일지 번호·상태 강조.','통역원 컬럼 표시. 승인 요청 행·상태 강조.').replace('작성자 컬럼 미표시.','본인이 작성한 목록만 조회하므로 통역원 컬럼 미표시.')})
 };
 let running=false;
 async function apply(){
  const store=window.GFAIR_COLLAB,changes=window.GFAIR_DESCRIPTION_CHANGES;
  if(running||location.hash!=='#JNL-14'||!store?.user?.editor||!store.loaded||!changes)return;
  running=true;
  try{
   for(const [id,patch] of Object.entries(patches)){
    if(location.hash!=='#JNL-14')break;
    const record=store.records.find(r=>r.id===id);if(!record)continue;
    let before;try{before=JSON.parse(record.text);}catch{continue;}
    if(before.format!=='description-spec-v1'||String(before.planningNote||'').includes(note))continue;
    const after=patch(before);after.planningNote=[before.planningNote,note].filter(Boolean).join('\n');
    const spec=changes.markAgentChanges(before,after);
    await store.mutate('update',{id,text:JSON.stringify(spec),revision:record.revision});
   }
  }catch(error){console.error('JNL-14 Description 반영 실패:',error.message);}
  finally{running=false;}
 }
 window.addEventListener('collaboration-updated',apply);window.addEventListener('hashchange',apply);apply();
})();
