// 회원관리 참여여부·계정발급 확인창 정의. 기존 초기화된 정의는 복원하지 않는다.
window.GFAIR_MESSAGE_SPECS=[{"key":"matching-cancel-reason","title":"취소 사유 필수","type":"브라우저 입력 검증","trigger":"취소 사유가 비어 있거나 공백만 입력한 상태로 매칭취소 실행","message":"미입력 시 브라우저 기본 필수 안내 / 공백만 입력 시 취소 사유를 입력해 주세요.","confirm":"취소 중단 및 사유 입력값 유지","screens":["PRE-04-p32"]},{"key":"matching-change-reason","screens":["PRE-04-p32"],"title":"배정 변경 사유 필수","type":"브라우저 입력 검증","trigger":"변경 모드에서 변경 사유를 입력하지 않았거나 공백만 입력","message":"변경 사유를 입력해 주세요.","confirm":"변경 중단, 입력값 유지 및 사유 필드 오류 표시"},{"key":"matching-history-storage","screens":["PRE-04-p32"],"title":"매칭 변경이력 저장 실패","type":"인라인 오류 또는 토스트","trigger":"현재 탭 세션에 배정·변경이력 저장 실패","message":"매칭 변경이력을 저장할 공간이 부족합니다.","confirm":"배정·이력 모두 저장 전 상태로 복원, 사유 입력값 유지"},{"key":"matching-history-saved","screens":["PRE-04-p32"],"title":"매칭·이력 반영 완료","type":"토스트","trigger":"배정과 이력 저장 성공","message":"매칭관리 내용을 반영했습니다.","confirm":"팝업 유지, 현재 매칭정보·배정이력·목록 갱신"},{"key":"pre01-period-order","screens":["PRE-01"],"title":"기간 역전","type":"브라우저 입력 검증","trigger":"현황판 기간 변경 또는 검색 시 종료일이 시작일보다 빠를 때","message":"종료일은 시작일보다 빠를 수 없습니다.","confirm":"집계·검색 반영 중단, 종료일에 오류 표시 및 적용 전 조건 유지"},{"key":"pre01-travel-reason","screens":["PRE-01-p20"],"title":"변경 사유 필수","type":"브라우저 입력 검증","trigger":"변경 사유가 공백인 상태로 변경","message":"변경 사유를 입력해 주세요.","confirm":"변경 중단, 사유 입력에 오류 표시"},{"key":"pre01-travel-required","screens":["PRE-01-p20"],"title":"상태·변경시간 필수","type":"브라우저 입력 검증","trigger":"이동상태·변경시간이 없거나 입력 형식 오류","message":"브라우저 기본 필수 입력·형식 안내","confirm":"변경 중단, 해당 입력에 오류 표시"},{"key":"pre01-travel-saved","screens":["PRE-01-p20"],"title":"방한현황 변경 완료","type":"토스트","trigger":"이동상태·변경시간·사유 검증 통과 후 변경 완료","message":"방한현황을 {이동상태}(으)로 변경했습니다.","confirm":"팝업 닫기, 목록·상세·현황판 및 매칭 바이어 방한상태 갱신"},
{"key":"operator-inactive-account-send","screens":["BAS-15"],"title":"미사용 운영용역사 계정발송 제한","trigger":"선택 또는 일괄 계정발송 대상에 진행 행사연도가 아닌 미사용 계정 포함","type":"알럿","message":"미사용 상태의 계정은 발송할 수 없습니다.","confirm":"발송을 중단하고 현재 목록·선택 유지","cancel":""},
  {
    "format": "screen-message-v1",
    "key": "lifecycle-exclude-BAS-03",
    "title": "미참여 처리",
    "type": "컨펌",
    "trigger": "참가 회원을 선택하고 [선택 미참여] 클릭",
    "message": "{선택한 이름 목록}\n총 {N}명을 미참여로 변경하시겠습니까?",
    "nameDisplay": "10명 이하: 이름 전체 / 11명 이상: 앞 10명 이름과 외 {N-10}명",
    "buttons": "확인 / 취소",
    "confirm": "현재 행사만 미참여로 변경. 기본정보 목록 유지 및 행사정보 목록 제외.",
    "cancel": "변경 없이 닫기",
    "planningNote": "",
    "screens": [
      "BAS-03"
    ],
    "source": "js/app.js (브라우저 기본 confirm)"
  },
  {
    "format": "screen-message-v1",
    "key": "lifecycle-exclude-BAS-05",
    "title": "미참여 처리",
    "type": "컨펌",
    "trigger": "참가 회원을 선택하고 [선택 미참여] 클릭",
    "message": "{선택한 이름 목록}\n총 {N}명을 미참여로 변경하시겠습니까?",
    "nameDisplay": "10명 이하: 이름 전체 / 11명 이상: 앞 10명 이름과 외 {N-10}명",
    "buttons": "확인 / 취소",
    "confirm": "현재 행사만 미참여로 변경. 기본정보 목록 유지 및 행사정보 목록 제외.",
    "cancel": "변경 없이 닫기",
    "planningNote": "",
    "screens": [
      "BAS-05"
    ],
    "source": "js/app.js (브라우저 기본 confirm)"
  },
  {
    "format": "screen-message-v1",
    "key": "lifecycle-exclude-BAS-07",
    "title": "미참여 처리",
    "type": "컨펌",
    "trigger": "참가 회원을 선택하고 [선택 미참여] 클릭",
    "message": "{선택한 이름 목록}\n총 {N}명을 미참여로 변경하시겠습니까?",
    "nameDisplay": "10명 이하: 이름 전체 / 11명 이상: 앞 10명 이름과 외 {N-10}명",
    "buttons": "확인 / 취소",
    "confirm": "현재 행사만 미참여로 변경. 기본정보 목록 유지 및 행사정보 목록 제외.",
    "cancel": "변경 없이 닫기",
    "planningNote": "",
    "screens": [
      "BAS-07"
    ],
    "source": "js/app.js (브라우저 기본 confirm)"
  },
  {
    "format": "screen-message-v1",
    "key": "lifecycle-exclude-PRE-01",
    "title": "미참여 처리",
    "type": "컨펌",
    "trigger": "참가 회원을 선택하고 [선택 미참여 처리] 클릭",
    "message": "{행사연도}년 행사에서 선택한 {N}명을 미참여로 변경하시겠습니까? 회원 기본정보와 참가이력은 유지됩니다.",
    "buttons": "취소 / 미참여 처리",
    "confirm": "현재 행사만 미참여로 변경. 기본정보 목록 유지 및 행사정보 목록 제외.",
    "cancel": "변경 없이 닫기",
    "planningNote": "",
    "screens": [
      "PRE-01"
    ],
    "source": "include/participant-lifecycle.js"
  },
  {
    "format": "screen-message-v1",
    "key": "lifecycle-exclude-EVT-01",
    "title": "미참여 처리",
    "type": "컨펌",
    "trigger": "참가 회원을 선택하고 [선택 미참여 처리] 클릭",
    "message": "{행사연도}년 행사에서 선택한 {N}명을 미참여로 변경하시겠습니까? 회원 기본정보와 참가이력은 유지됩니다.",
    "buttons": "취소 / 미참여 처리",
    "confirm": "현재 행사만 미참여로 변경. 기본정보 목록 유지 및 행사정보 목록 제외.",
    "cancel": "변경 없이 닫기",
    "planningNote": "",
    "screens": [
      "EVT-01"
    ],
    "source": "include/participant-lifecycle.js"
  },
  {
    "format": "screen-message-v1",
    "key": "lifecycle-exclude-EVT-02",
    "title": "미참여 처리",
    "type": "컨펌",
    "trigger": "참가 회원을 선택하고 [선택 미참여 처리] 클릭",
    "message": "{행사연도}년 행사에서 선택한 {N}명을 미참여로 변경하시겠습니까? 회원 기본정보와 참가이력은 유지됩니다.",
    "buttons": "취소 / 미참여 처리",
    "confirm": "현재 행사만 미참여로 변경. 기본정보 목록 유지 및 행사정보 목록 제외.",
    "cancel": "변경 없이 닫기",
    "planningNote": "",
    "screens": [
      "EVT-02"
    ],
    "source": "include/participant-lifecycle.js"
  },
  {
    "format": "screen-message-v1",
    "key": "lifecycle-issue-EVT-01",
    "title": "계정발급 확인",
    "type": "컨펌",
    "trigger": "해당 용역사가 미발급 참가자 계정발급 실행",
    "message": "{행사연도}년 행사 참가자 {N}명의 계정을 발급하시겠습니까?",
    "buttons": "취소 / 계정발급",
    "confirm": "선택한 미발급 대상 계정 생성 후 목록 갱신",
    "cancel": "변경 없이 닫기",
    "planningNote": "",
    "screens": [
      "EVT-01"
    ],
    "source": "include/participant-lifecycle.js"
  },
  {
    "format": "screen-message-v1",
    "key": "lifecycle-issue-EVT-02",
    "title": "계정발급 확인",
    "type": "컨펌",
    "trigger": "해당 용역사가 미발급 참가자 계정발급 실행",
    "message": "{행사연도}년 행사 참가자 {N}명의 계정을 발급하시겠습니까?",
    "buttons": "취소 / 계정발급",
    "confirm": "선택한 미발급 대상 계정 생성 후 목록 갱신",
    "cancel": "변경 없이 닫기",
    "planningNote": "",
    "screens": [
      "EVT-02"
    ],
    "source": "include/participant-lifecycle.js"
  }
];
window.GFAIR_MESSAGE_AUTODETECT=false;

GFAIR_MESSAGE_SPECS.push(
{key:'com06-password-format',screens:['COM-06'],title:'새 비밀번호 형식 오류',type:'인라인 오류',trigger:'영문·숫자 포함 8~20자리, 공백 없는 입력 조건에 맞지 않을 때',message:'영문·숫자 포함 8~20자리로 입력해 주세요. (특수문자 사용 가능, 공백 불가)',confirm:'저장 중단 후 새 비밀번호에 포커스',source:'include/my-info.js'},
{key:'com06-password-same',screens:['COM-06'],title:'현재 비밀번호와 동일',type:'인라인 오류',trigger:'현재 입력값과 새 비밀번호가 같을 때',message:'현재 비밀번호와 다른 새 비밀번호를 입력해 주세요.',confirm:'저장 중단 후 새 비밀번호에 포커스',note:'현재 비밀번호의 서버 인증은 목업 미연동',source:'include/my-info.js'},
{key:'ntc07-range',screens:['NTC-07'],title:'수신기간 역전',type:'인라인 오류',trigger:'수신 시작일이 종료일보다 늦을 때',message:'수신 시작일은 종료일보다 늦을 수 없습니다.',confirm:'검색 중단 후 시작일에 포커스',source:'include/account-notifications.js'}
);

GFAIR_MESSAGE_SPECS=GFAIR_MESSAGE_SPECS.filter(r=>r.key!=='com06-password-same');GFAIR_MESSAGE_SPECS.forEach(r=>{if(r.key==='com06-password-format'){r.type='브라우저 알럿';r.trigger='관리자가 비밀번호를 입력했고 영문·숫자 포함 8~20자리, 공백 없는 조건에 맞지 않을 때. 빈칸이면 기존 비밀번호 유지';}});

GFAIR_MESSAGE_SPECS.push(...[
  {
    "format": "screen-message-v1",
    "key": "buyer-company-BAS-04-phone",
    "title": "연락처 형식 오류",
    "type": "브라우저 입력 검증",
    "trigger": "연락처를 입력했으나 숫자 7~15자리 또는 허용 구분자 규칙 위반",
    "message": "연락처 가운데 번호는 3~4자리, 마지막 번호는 4자리로 입력해 주세요.",
    "confirm": "저장 중단 후 해당 입력에 오류 표시, 입력값 유지",
    "cancel": "",
    "planningNote": "",
    "screens": [
      "BAS-04"
    ],
    "source": "include/buyer-profile-fields.js"
  },
  {
    "format": "screen-message-v1",
    "key": "buyer-company-BAS-04-other",
    "title": "기타 상세 미입력",
    "type": "브라우저 입력 검증",
    "trigger": "기타 체크 후 상세 INPUT을 공백으로 저장",
    "message": "{항목명}을 입력해 주세요.",
    "confirm": "저장 중단 후 해당 입력에 오류 표시, 입력값 유지",
    "cancel": "",
    "planningNote": "",
    "screens": [
      "BAS-04"
    ],
    "source": "include/buyer-profile-fields.js"
  },
  {
    "format": "screen-message-v1",
    "key": "buyer-company-BAS-06-phone",
    "title": "연락처 형식 오류",
    "type": "브라우저 입력 검증",
    "trigger": "가운데·마지막 번호 일부 누락 또는 가운데 3~4자리·마지막 4자리 규칙 위반",
    "message": "연락처 가운데 번호는 3~4자리, 마지막 번호는 4자리로 입력해 주세요.",
    "confirm": "저장 중단 후 해당 입력에 오류 표시, 입력값 유지",
    "cancel": "",
    "planningNote": "",
    "screens": [
      "BAS-06"
    ],
    "source": "include/buyer-profile-fields.js"
  },
  {
    "format": "screen-message-v1",
    "key": "buyer-company-BAS-06-other",
    "title": "기타 상세 미입력",
    "type": "브라우저 입력 검증",
    "trigger": "기타 체크 후 상세 INPUT을 공백으로 저장",
    "message": "{항목명}을 입력해 주세요.",
    "confirm": "저장 중단 후 해당 입력에 오류 표시, 입력값 유지",
    "cancel": "",
    "planningNote": "",
    "screens": [
      "BAS-06"
    ],
    "source": "include/buyer-profile-fields.js"
  },
  {
    "format": "screen-message-v1",
    "key": "buyer-company-BAS-04-required",
    "title": "기업명·기업코드 필수 입력",
    "type": "브라우저 입력 검증",
    "trigger": "해외바이어 기업명 또는 기업코드 미입력·공백 입력 후 저장",
    "message": "기업명을 입력해 주세요. / 기업코드를 입력해 주세요.",
    "confirm": "저장 중단 후 해당 입력에 오류 표시, 입력값 유지",
    "cancel": "",
    "planningNote": "",
    "screens": [
      "BAS-04"
    ],
    "source": "include/buyer-profile-fields.js"
  }
]);

GFAIR_MESSAGE_SPECS.push(...[
  {
    "format": "screen-message-v1",
    "key": "buyer-interest-BAS-04-duplicate",
    "title": "관심분야 중복",
    "type": "브라우저 입력 검증",
    "trigger": "다른 행과 동일한 메인·서브 조합 선택",
    "message": "이미 선택한 관심분야입니다.",
    "confirm": "해당 행의 중복 서브 선택만 초기화, 다른 선택 행은 유지",
    "cancel": "",
    "planningNote": "",
    "screens": [
      "BAS-04"
    ],
    "source": "include/buyer-profile-fields.js"
  },
  {
    "format": "screen-message-v1",
    "key": "buyer-interest-BAS-04-incomplete",
    "title": "관심분야 서브 미선택",
    "type": "브라우저 입력 검증",
    "trigger": "메인만 선택한 행이 있는 상태로 저장",
    "message": "브라우저 기본 필수 선택 안내",
    "confirm": "저장 중단 및 해당 서브 선택에 오류 표시, 입력값 유지",
    "cancel": "",
    "planningNote": "",
    "screens": [
      "BAS-04"
    ],
    "source": "include/buyer-profile-fields.js"
  },
  {
    "format": "screen-message-v1",
    "key": "buyer-interest-BAS-06-duplicate",
    "title": "관심분야 중복",
    "type": "브라우저 입력 검증",
    "trigger": "다른 행과 동일한 메인·서브 조합 선택",
    "message": "이미 선택한 관심분야입니다.",
    "confirm": "해당 행의 중복 서브 선택만 초기화, 다른 선택 행은 유지",
    "cancel": "",
    "planningNote": "",
    "screens": [
      "BAS-06"
    ],
    "source": "include/buyer-profile-fields.js"
  },
  {
    "format": "screen-message-v1",
    "key": "buyer-interest-BAS-06-incomplete",
    "title": "관심분야 서브 미선택",
    "type": "브라우저 입력 검증",
    "trigger": "메인만 선택한 행이 있는 상태로 저장",
    "message": "브라우저 기본 필수 선택 안내",
    "confirm": "저장 중단 및 해당 서브 선택에 오류 표시, 입력값 유지",
    "cancel": "",
    "planningNote": "",
    "screens": [
      "BAS-06"
    ],
    "source": "include/buyer-profile-fields.js"
  }
]);

// 국내바이어 최종 참가 확정안의 확인창 정의.
for(const spec of window.GFAIR_MESSAGE_SPECS||[]){if(spec.key==="lifecycle-issue-EVT-01")Object.assign(spec,{title:"최종 참가 확정 · 계정발급",trigger:"구매상담 운영용역사가 최종 참가 확정 · 계정발급 클릭",message:"{행사연도}년 국내바이어 {N}명을 최종 참가자로 확정하고, 계정 미발급 {M}명의 계정을 발급하시겠습니까? 기존 발급 계정은 유지됩니다.",buttons:"취소 / 최종 확정 · 계정발급",confirm:"현재 명단 전체 최종 확정 및 미발급 계정만 발급. 기존 계정 유지."});if(spec.key==="lifecycle-exclude-EVT-01")Object.assign(spec,{message:"{행사연도}년 행사에서 선택한 {N}명을 제외하시겠습니까? 회원정보와 기존 발급 계정·과거 참가이력은 유지됩니다.",confirm:"현재 행사에서 제외하고 명단을 확정 대기로 변경. 회원정보·기존 계정·과거 이력 유지."});}

for(const spec of window.GFAIR_MESSAGE_SPECS||[]){if(spec.key==="lifecycle-issue-EVT-01")Object.assign(spec,{trigger:"구매상담 운영용역사가 최종확정 클릭",message:"{행사연도}년 국내바이어 {N}명을 최종확정하고 미발급 계정과 QR코드를 생성하시겠습니까? 참가확정 이후에는 참가자 항목을 변경할 수 없습니다.",buttons:"취소 / 최종확정",confirm:"현재 명단 최종확정 및 미발급 계정·QR 생성. 이후 참여자 변경 차단."});if(spec.key==="lifecycle-exclude-EVT-01")Object.assign(spec,{trigger:"확정대기 상태에서 선택 미참여 클릭",confirm:"현재 행사만 미참여로 변경. 최종확정 이후 실행 불가."});}

for(const spec of window.GFAIR_MESSAGE_SPECS||[]){if(spec.key==="lifecycle-issue-EVT-01")Object.assign(spec,{title:"최종확정",message:"{이름목록}{외 나머지 인원}\n총 {N}명의 참가를 최종확정하고 미발급 계정과 QR코드를 생성하시겠습니까?\n참가확정 이후에는 참가자 항목을 변경할 수 없습니다.",buttons:"확인 / 취소",confirm:"현재 명단 전체 최종확정 및 미발급 계정·QR 생성. 이후 참여자 변경 차단.",cancel:"목록·선택·참가 상태 유지"});}

// 해외바이어·통역원 최종 참가 확정.
for(const next of [{"format":"screen-message-v1","key":"three-review-finalize-PRE-01","title":"최종확정","type":"컨펌","trigger":"수출상담 운영용역사가 [최종확정] 클릭","message":"{이름목록}{외 나머지 인원}\n총 {N}명의 참가를 최종확정하고 QR코드를 생성하시겠습니까?\n참가확정 이후에는 참가자 항목을 변경할 수 없습니다.","buttons":"확인 / 취소","confirm":"현재 행사 명단 전체 확정 및 QR만 생성. 로그인 계정 발급 없음. 참여자 변경 차단.","cancel":"목록·선택·참가 상태 유지","policy":"브라우저 기본 컨펌. 이름 10명까지 모두 표시하고 11명부터 앞 10명과 외 나머지 인원 표시. 기획 목업은 새로고침 시 확정대기 표시로 복원.","screens":["PRE-01"]},{"format":"screen-message-v1","key":"lifecycle-issue-EVT-02","title":"최종확정","type":"컨펌","trigger":"수출상담 운영용역사가 [최종확정] 클릭","message":"{이름목록}{외 나머지 인원}\n총 {N}명의 참가를 최종확정하고 미발급 계정과 QR코드를 생성하시겠습니까?\n참가확정 이후에는 참가자 항목을 변경할 수 없습니다.","buttons":"확인 / 취소","confirm":"현재 행사 명단 전체 확정 및 미발급 GI 계정·QR 생성. 기존 계정 유지. 참여자 변경 차단.","cancel":"목록·선택·참가 상태 유지","policy":"브라우저 기본 컨펌. 이름 10명까지 모두 표시하고 11명부터 앞 10명과 외 나머지 인원 표시. 기획 목업은 새로고침 시 확정대기 표시로 복원.","screens":["EVT-02"]},{"key":"lifecycle-exclude-PRE-01","trigger":"확정대기 상태에서 대상을 선택하고 [선택 미참여] 클릭","message":"{행사연도}년 행사에서 선택한 {N}명을 제외하시겠습니까? 회원정보와 과거 참가이력은 유지됩니다.","confirm":"현재 행사 참가 목록에서 선택 회원 제외. 회원 기본정보·과거 참가이력 유지. 확정 후 실행 불가.","screens":["PRE-01"]},{"key":"lifecycle-exclude-EVT-02","trigger":"확정대기 상태에서 대상을 선택하고 [선택 미참여] 클릭","message":"{행사연도}년 행사에서 선택한 {N}명을 제외하시겠습니까? 회원정보와 기존 발급 계정·과거 참가이력은 유지됩니다.","confirm":"현재 행사 참가 목록에서 선택 회원 제외. 회원 기본정보·과거 참가이력 유지. 확정 후 실행 불가.","screens":["EVT-02"]}]){const existing=window.GFAIR_MESSAGE_SPECS.find(s=>s.key===next.key);if(existing)Object.assign(existing,next);else window.GFAIR_MESSAGE_SPECS.push(next);}

for(const screen of ['EVT-01','PRE-01','EVT-02']){const person=screen==='EVT-02'?'통역원':'바이어',spec=(window.GFAIR_MESSAGE_SPECS||[]).find(s=>s.key==='lifecycle-exclude-'+screen);if(spec)Object.assign(spec,{title:person+' 제외',trigger:'확정대기 상태에서 대상을 선택하고 [선택 '+person+' 제외] 클릭',buttons:'취소 / '+person+' 제외'});}

GFAIR_MESSAGE_SPECS.push(...[
  {
    "key": "com06-phone",
    "title": "연락처 형식 오류",
    "trigger": "관리자·운영용역사·구매바이어의 가운데 번호가 3~4자리 또는 끝자리가 4자리가 아닐 때 (일부 입력 포함)",
    "message": "연락처 가운데 번호는 3~4자리, 마지막 번호는 4자리로 입력해 주세요.",
    "screens": [
      "COM-06"
    ],
    "type": "브라우저 입력 검증",
    "confirm": "저장 중단, 입력값 유지 및 해당 항목에 오류 표시",
    "source": "include/my-info.js"
  },
  {
    "key": "com06-language-duplicate",
    "title": "통역언어 중복",
    "trigger": "통역원이 같은 통역언어를 두 번 이상 선택한 뒤 저장",
    "message": "같은 언어를 중복 선택할 수 없습니다.",
    "screens": [
      "COM-06"
    ],
    "type": "브라우저 입력 검증",
    "confirm": "저장 중단, 입력값 유지 및 해당 항목에 오류 표시",
    "source": "include/my-info.js"
  },
  {
    "key": "com06-language-required",
    "title": "통역언어 필수",
    "trigger": "통역원이 첫 번째 통역언어를 선택하지 않고 저장",
    "message": "통역언어를 선택해 주세요.",
    "screens": [
      "COM-06"
    ],
    "type": "브라우저 입력 검증",
    "confirm": "저장 중단, 입력값 유지 및 해당 항목에 오류 표시",
    "source": "include/my-info.js"
  },
  {
    "key": "com06-email",
    "title": "이메일 형식 오류",
    "trigger": "이메일 아이디 또는 도메인 한쪽만 입력했거나 결합한 이메일 형식이 잘못된 경우",
    "message": "이메일 아이디와 도메인을 올바르게 입력해 주세요.",
    "screens": [
      "COM-06"
    ],
    "type": "브라우저 입력 검증",
    "confirm": "저장 중단, 입력값 유지 및 해당 항목에 오류 표시",
    "source": "include/my-info.js"
  }
]);

GFAIR_MESSAGE_SPECS.push({"key":"com06-interpreter-phone","title":"통역원 연락처 형식 오류","screens":["COM-06"],"type":"브라우저 입력 검증","trigger":"통역원 연락처의 가운데·끝자리가 각 4자리가 아닐 때 (일부 입력 포함)","message":"연락처를 4자리씩 입력해 주세요.","confirm":"저장 중단, 입력값 유지 및 해당 항목에 오류 표시","source":"include/my-info.js"});


GFAIR_MESSAGE_SPECS.push(...[{"key":"public-board-empty-content","screens":["NTC-10","NTC-11","NTC-13","NTC-14"],"title":"제목·내용 공백 입력","type":"인라인 오류","trigger":"관리자가 제목 또는 내용에 공백만 입력하고 등록·저장","message":"제목·내용은 공백만 입력할 수 없습니다.","confirm":"저장 중단, 입력값 유지","source":"include/public-boards.js"}]);

GFAIR_MESSAGE_SPECS.push(...[{"key":"lodging-empty","screens":["PRE-01-p41"],"title":"숙소명·주소 공백","type":"인라인 오류","trigger":"숙소명 또는 주소에 공백만 입력한 뒤 추가","message":"숙소명과 주소를 입력해 주세요.","confirm":"저장 중단 및 해당 입력으로 포커스, 입력값 유지","source":"include/lodging-management.js"},{"key":"lodging-delete","screens":["PRE-01-p41"],"title":"숙소 삭제 확인","type":"브라우저 컨펌","trigger":"배정된 바이어가 없는 숙소의 삭제 클릭","message":"등록한 숙소를 삭제하시겠습니까?","confirm":"숙소 삭제 후 목록 및 선택 옵션 갱신","cancel":"숙소와 배정 유지","source":"include/lodging-management.js"},{"key":"lodging-storage","screens":["PRE-01","PRE-02","PRE-01-p41","PRE-01-p42"],"title":"숙소 저장 공간 부족","type":"인라인 오류 또는 브라우저 알럿","trigger":"현재 탭 저장소에 변경 내용을 저장하지 못할 때","message":"숙소 정보를 저장할 공간이 부족합니다.","confirm":"변경 전 숙소·배정 복원, 입력값 유지. 팝업은 인라인 오류, 배정 변경은 알럿 표시","source":"include/lodging-management.js"}]);
