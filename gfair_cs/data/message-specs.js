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
