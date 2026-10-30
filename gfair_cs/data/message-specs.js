// 회원관리 참여여부·계정발급 확인창 정의. 기존 초기화된 정의는 복원하지 않는다.
window.GFAIR_MESSAGE_SPECS=[
  {
    "format": "screen-message-v1",
    "key": "lifecycle-exclude-BAS-03",
    "title": "미참여 처리",
    "type": "컨펌",
    "trigger": "참가 회원을 선택하고 [선택 미참여 처리] 클릭",
    "message": "{행사연도}년 행사에서 선택한 {N}명을 미참여로 변경하시겠습니까? 회원 기본정보와 참가이력은 유지됩니다.",
    "buttons": "취소 / 미참여 처리",
    "confirm": "현재 행사만 미참여로 변경. 기본정보 목록 유지 및 행사정보 목록 제외.",
    "cancel": "변경 없이 닫기",
    "planningNote": "",
    "screens": [
      "BAS-03"
    ],
    "source": "include/participant-lifecycle.js"
  },
  {
    "format": "screen-message-v1",
    "key": "lifecycle-exclude-BAS-05",
    "title": "미참여 처리",
    "type": "컨펌",
    "trigger": "참가 회원을 선택하고 [선택 미참여 처리] 클릭",
    "message": "{행사연도}년 행사에서 선택한 {N}명을 미참여로 변경하시겠습니까? 회원 기본정보와 참가이력은 유지됩니다.",
    "buttons": "취소 / 미참여 처리",
    "confirm": "현재 행사만 미참여로 변경. 기본정보 목록 유지 및 행사정보 목록 제외.",
    "cancel": "변경 없이 닫기",
    "planningNote": "",
    "screens": [
      "BAS-05"
    ],
    "source": "include/participant-lifecycle.js"
  },
  {
    "format": "screen-message-v1",
    "key": "lifecycle-exclude-BAS-07",
    "title": "미참여 처리",
    "type": "컨펌",
    "trigger": "참가 회원을 선택하고 [선택 미참여 처리] 클릭",
    "message": "{행사연도}년 행사에서 선택한 {N}명을 미참여로 변경하시겠습니까? 회원 기본정보와 참가이력은 유지됩니다.",
    "buttons": "취소 / 미참여 처리",
    "confirm": "현재 행사만 미참여로 변경. 기본정보 목록 유지 및 행사정보 목록 제외.",
    "cancel": "변경 없이 닫기",
    "planningNote": "",
    "screens": [
      "BAS-07"
    ],
    "source": "include/participant-lifecycle.js"
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
{key:'com06-password-confirm',screens:['COM-06'],title:'새 비밀번호 확인 불일치',type:'브라우저 알럿',trigger:'비밀번호와 비밀번호 확인이 다를 때',message:'비밀번호와 비밀번호 확인이 일치하지 않습니다.',confirm:'저장 중단 후 확인 입력에 포커스',source:'include/my-info.js'},
{key:'com06-password-same',screens:['COM-06'],title:'현재 비밀번호와 동일',type:'인라인 오류',trigger:'현재 입력값과 새 비밀번호가 같을 때',message:'현재 비밀번호와 다른 새 비밀번호를 입력해 주세요.',confirm:'저장 중단 후 새 비밀번호에 포커스',note:'현재 비밀번호의 서버 인증은 목업 미연동',source:'include/my-info.js'},
{key:'ntc07-range',screens:['NTC-07'],title:'수신기간 역전',type:'인라인 오류',trigger:'수신 시작일이 종료일보다 늦을 때',message:'수신 시작일은 종료일보다 늦을 수 없습니다.',confirm:'검색 중단 후 시작일에 포커스',source:'include/account-notifications.js'}
);

GFAIR_MESSAGE_SPECS=GFAIR_MESSAGE_SPECS.filter(r=>r.key!=='com06-password-same');GFAIR_MESSAGE_SPECS.forEach(r=>{if(r.key==='com06-password-format')r.type='브라우저 알럿';});

GFAIR_MESSAGE_SPECS.push(...[
  {
    "format": "screen-message-v1",
    "key": "buyer-company-BAS-04-phone",
    "title": "연락처 형식 오류",
    "type": "브라우저 입력 검증",
    "trigger": "연락처를 입력했으나 숫자 7~15자리 또는 허용 구분자 규칙 위반",
    "message": "연락처 형식을 확인해 주세요.",
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
    "trigger": "연락처를 입력했으나 숫자 7~15자리 또는 허용 구분자 규칙 위반",
    "message": "연락처 형식을 확인해 주세요.",
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
