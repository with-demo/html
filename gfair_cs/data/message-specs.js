// 신규 참가확정·계정발급 안내 정의. 기존 메시지는 보존한다.
window.GFAIR_MESSAGE_SPECS=[
  {
    "key": "participant-issue-confirm",
    "title": "참가확정 확인",
    "type": "컨펌",
    "trigger": "[참가확정] 클릭 시 현재 행사 참가 대상이 있는 경우",
    "message": "{행사연도}년 참가 상태인 해외바이어 {N}명을 확정하시겠습니까?\n{대상자명: 최대 10명, 초과 시 외 M명}\n검색 조건·페이지와 관계없이 현재 행사 참가 대상 전체에 적용합니다.\n해외바이어는 ID·비밀번호를 발급하지 않고 고유코드로 참가자를 확정합니다.",
    "confirm": "참가자 확정 후 PRE-01로 이동",
    "cancel": "취소·X·Esc: 변경 없이 목록 유지",
    "screens": [
      "BAS-03"
    ],
    "source": "include/participant-issuance.js"
  },
  {
    "key": "participant-issue-empty",
    "title": "참가 대상 없음",
    "type": "인라인 안내",
    "trigger": "현재 행사 참가 대상 0명",
    "message": "현재 행사에 참가 상태인 대상이 없습니다.",
    "confirm": "처리 중단, 목록 유지",
    "cancel": "",
    "screens": [
      "BAS-03"
    ],
    "source": "include/participant-issuance.js"
  },
  {
    "key": "participant-issue-success",
    "title": "참가확정 완료",
    "type": "인라인 안내",
    "trigger": "참가 확정 정보 저장 성공",
    "message": "해외바이어 {N}명을 확정했습니다.",
    "confirm": "PRE-01로 이동",
    "cancel": "",
    "screens": [
      "BAS-03"
    ],
    "source": "include/participant-issuance.js"
  },
  {
    "key": "participant-issue-changed",
    "title": "참가 대상 변경",
    "type": "인라인 안내",
    "trigger": "확인창을 연 뒤 참가 대상이 변경된 경우",
    "message": "참가 대상이 변경되었습니다. 최신 목록에서 다시 진행해 주세요.",
    "confirm": "처리 중단, 목록 유지",
    "cancel": "",
    "screens": [
      "BAS-03"
    ],
    "source": "include/participant-issuance.js"
  },
  {
    "key": "participant-issue-save-error",
    "title": "확정 저장 실패",
    "type": "인라인 안내",
    "trigger": "현재 탭 저장 공간 부족 등 저장 실패",
    "message": "변경 내용을 저장할 공간이 부족합니다.",
    "confirm": "처리 중단, 발급·확정 정보 변경 없이 목록 유지",
    "cancel": "",
    "screens": [
      "BAS-03"
    ],
    "source": "include/participant-issuance.js"
  },
  {
    "key": "participant-issue-confirm",
    "title": "계정발급 확인",
    "type": "컨펌",
    "trigger": "[계정발급] 클릭 시 현재 행사 참가 대상이 있는 경우",
    "message": "{행사연도}년 참가 상태인 국내바이어 {N}명을 확정하시겠습니까?\n{대상자명: 최대 10명, 초과 시 외 M명}\n검색 조건·페이지와 관계없이 현재 행사 참가 대상 전체에 적용합니다.\n미발급 대상의 계정을 발급하고, 이미 발급된 ID·비밀번호는 유지합니다.",
    "confirm": "참가자 확정 및 미발급 계정 발급 후 EVT-01로 이동",
    "cancel": "취소·X·Esc: 변경 없이 목록 유지",
    "screens": [
      "BAS-05"
    ],
    "source": "include/participant-issuance.js"
  },
  {
    "key": "participant-issue-empty",
    "title": "참가 대상 없음",
    "type": "인라인 안내",
    "trigger": "현재 행사 참가 대상 0명",
    "message": "현재 행사에 참가 상태인 대상이 없습니다.",
    "confirm": "처리 중단, 목록 유지",
    "cancel": "",
    "screens": [
      "BAS-05"
    ],
    "source": "include/participant-issuance.js"
  },
  {
    "key": "participant-issue-success",
    "title": "계정발급 완료",
    "type": "인라인 안내",
    "trigger": "참가 확정 정보 저장 성공",
    "message": "국내바이어 {N}명을 확정했습니다. 신규 발급 {A}명 · 기존 계정 유지 {B}명",
    "confirm": "EVT-01로 이동",
    "cancel": "",
    "screens": [
      "BAS-05"
    ],
    "source": "include/participant-issuance.js"
  },
  {
    "key": "participant-issue-changed",
    "title": "참가 대상 변경",
    "type": "인라인 안내",
    "trigger": "확인창을 연 뒤 참가 대상이 변경된 경우",
    "message": "참가 대상이 변경되었습니다. 최신 목록에서 다시 진행해 주세요.",
    "confirm": "처리 중단, 목록 유지",
    "cancel": "",
    "screens": [
      "BAS-05"
    ],
    "source": "include/participant-issuance.js"
  },
  {
    "key": "participant-issue-save-error",
    "title": "확정 저장 실패",
    "type": "인라인 안내",
    "trigger": "현재 탭 저장 공간 부족 등 저장 실패",
    "message": "변경 내용을 저장할 공간이 부족합니다.",
    "confirm": "처리 중단, 발급·확정 정보 변경 없이 목록 유지",
    "cancel": "",
    "screens": [
      "BAS-05"
    ],
    "source": "include/participant-issuance.js"
  },
  {
    "key": "participant-issue-confirm",
    "title": "계정발급 확인",
    "type": "컨펌",
    "trigger": "[계정발급] 클릭 시 현재 행사 참가 대상이 있는 경우",
    "message": "{행사연도}년 참가 상태인 통역원 {N}명을 확정하시겠습니까?\n{대상자명: 최대 10명, 초과 시 외 M명}\n검색 조건·페이지와 관계없이 현재 행사 참가 대상 전체에 적용합니다.\n미발급 대상의 계정을 발급하고, 이미 발급된 ID·비밀번호는 유지합니다.",
    "confirm": "참가자 확정 및 미발급 계정 발급 후 EVT-02로 이동",
    "cancel": "취소·X·Esc: 변경 없이 목록 유지",
    "screens": [
      "BAS-07"
    ],
    "source": "include/participant-issuance.js"
  },
  {
    "key": "participant-issue-empty",
    "title": "참가 대상 없음",
    "type": "인라인 안내",
    "trigger": "현재 행사 참가 대상 0명",
    "message": "현재 행사에 참가 상태인 대상이 없습니다.",
    "confirm": "처리 중단, 목록 유지",
    "cancel": "",
    "screens": [
      "BAS-07"
    ],
    "source": "include/participant-issuance.js"
  },
  {
    "key": "participant-issue-success",
    "title": "계정발급 완료",
    "type": "인라인 안내",
    "trigger": "참가 확정 정보 저장 성공",
    "message": "통역원 {N}명을 확정했습니다. 신규 발급 {A}명 · 기존 계정 유지 {B}명",
    "confirm": "EVT-02로 이동",
    "cancel": "",
    "screens": [
      "BAS-07"
    ],
    "source": "include/participant-issuance.js"
  },
  {
    "key": "participant-issue-changed",
    "title": "참가 대상 변경",
    "type": "인라인 안내",
    "trigger": "확인창을 연 뒤 참가 대상이 변경된 경우",
    "message": "참가 대상이 변경되었습니다. 최신 목록에서 다시 진행해 주세요.",
    "confirm": "처리 중단, 목록 유지",
    "cancel": "",
    "screens": [
      "BAS-07"
    ],
    "source": "include/participant-issuance.js"
  },
  {
    "key": "participant-issue-save-error",
    "title": "확정 저장 실패",
    "type": "인라인 안내",
    "trigger": "현재 탭 저장 공간 부족 등 저장 실패",
    "message": "변경 내용을 저장할 공간이 부족합니다.",
    "confirm": "처리 중단, 발급·확정 정보 변경 없이 목록 유지",
    "cancel": "",
    "screens": [
      "BAS-07"
    ],
    "source": "include/participant-issuance.js"
  }
];
window.GFAIR_MESSAGE_AUTODETECT=false;
