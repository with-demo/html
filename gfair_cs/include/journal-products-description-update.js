/* 등록·상세의 기업 항목 분리 및 제품별 카테고리 행 변경. 기존 ID·비고·댓글 유지. */
(()=>{
 'use strict';
 let running=false;
 async function apply(){
  const route=location.hash.slice(1),store=window.GFAIR_COLLAB,changes=window.GFAIR_DESCRIPTION_CHANGES;
  if(running||!["JNL-05","JNL-16"].includes(route)||!store?.user?.editor||!store.loaded||!changes)return;
  running=true;
  try{
   for(const record of store.records.slice()){
    if(location.hash.slice(1)!==route)break;
    let before;try{before=JSON.parse(record.text);}catch{continue;}
    if(before.format!=='description-spec-v1'||before.item!=='상담성과 라디오 선택')continue;
    const after={...before,item:'상담 결과 라디오 선택'};
    await store.mutate('update',{id:record.id,text:JSON.stringify(changes.markAgentChanges(before,after)),revision:record.revision});
   }
   const amountRecord=store.records.find(record=>{
    try{return JSON.parse(record.text).item==='수출 상담액·계약 추진액';}catch{return false;}
   });
   if(amountRecord&&location.hash.slice(1)===route){
    const before=JSON.parse(amountRecord.text);
    const help='각 항목의 도움말 아이콘을 클릭하면 금액 산정 기준을 표시한다.\n수출 상담액 「이번 상담을 통해 거래가 성사될 경우, 향후 3년간 예상되는 총 거래 금액 입력」\n계약 추진액 「이번 상담 결과 실제 거래 추진 가능성이 있다고 판단되는 경우, 향후 1년 이내 예상 거래금액 입력 / 실제 계약 체결액이 아니며, 산정하기 어렵다면 \'아직 금액을 산정할 수 없음\'을 선택」';
    if(!before.detail?.includes(help)){
     const after={...before,detail:[before.detail?.replace(/\n?각 항목의 도움말 아이콘을 클릭하면 금액 산정 기준을 표시한다\.\n수출 상담액 「[^」]*」\n계약 추진액 「[^」]*」/,'') ,help].filter(Boolean).join('\n'),validation:'수출 상담액은 필수 입력, 계약 추진액은 선택 입력이다. 두 항목 모두 입력 시 0 이상의 숫자만 허용한다.',planningNote:[before.planningNote,'[변경사항 있음 · 2026-11-09] 금액별 도움말 추가 및 계약 추진액 선택 입력 적용.'].filter(Boolean).join('\n')};
     await store.mutate('update',{id:amountRecord.id,text:JSON.stringify(changes.markAgentChanges(before,after)),revision:amountRecord.revision});
    }
   }
   if(route==='JNL-16'){
    const items=new Set(['통역원 정보 · 상담 일시','기업명 · 부스번호','셀러 명함 첨부','바이어 정보 · 바이어 선택','수출 상담액·계약 추진액','상담성과 라디오 선택','상담 결과 라디오 선택','해시태그']);
    const admin='[관리자 / 수출상담 운영용역사] ';
    const wording='편집이 허용된 상태에서만 수정할 수 있으며, 승인 완료 건은 조회만 가능';
    for(const record of store.records.slice()){
     if(location.hash.slice(1)!==route)break;
     let before;try{before=JSON.parse(record.text);}catch{continue;}
     if(before.format!=='description-spec-v1'||!items.has(before.item))continue;
     const after={...before};
     if(before.enabled){
      after.enabled=before.enabled.split('\n').filter(line=>{
       const text=line.trim().replace(/^-\s*/, '');
       return text!==admin+wording&&!(text.startsWith('[통역원] 작성 중·반려 상태는')&&text.includes('승인 요청·승인 완료 상태는')&&text.endsWith('편집 불가.'));
      }).join('\n');
     }
     if(before.item==='통역원 정보 · 상담 일시'&&before.permission){
      after.permission=before.permission.replace(admin+wording+'. ',admin);
     }
     if(after.enabled!==before.enabled||after.permission!==before.permission){
      await store.mutate('update',{id:record.id,text:JSON.stringify(changes.preserveUserEdits(before,after)),revision:record.revision});
     }
    }
   }
   if(route==='JNL-16'){
    const record=store.records.find(r=>r.id==='1f54c161-d965-470e-a170-33072bf4c260');
    if(record){
     const saved=JSON.parse(record.text);
     const format='JPG, JPEG, PNG 이미지 파일만 첨부할 수 있다.';
     const limit='파일당 최대 10MB, 상담일지당 최대 2개까지 첨부할 수 있다.';
     const optional='셀러 명함은 선택 첨부하며, 첨부하지 않아도 상담일지를 저장하거나 제출할 수 있다.';
     const marked=line=>'- (수정) '+line;
     const validation=marked(format)+'\n'+marked(limit);
     if(saved.required==='N'&&saved.validation===validation&&saved.policy?.split('\n').includes(marked(optional))){
      const before={...saved,required:'Y',validation:'',policy:saved.policy.split('\n').filter(line=>line!==marked(optional)).join('\n')};
      const after={...saved,validation:'- '+format+'\n- '+limit,policy:saved.policy.replace(marked(optional),'- '+optional)};
      await store.mutate('update',{id:record.id,text:JSON.stringify(changes.markAgentChanges(before,after)),revision:record.revision});
     }
    }
   }
  }catch(error){console.error('수출상담일지 Description 반영 실패:',error.message);}finally{running=false;}
 }
 window.addEventListener('collaboration-updated',apply);window.addEventListener('hashchange',apply);apply();
})();
