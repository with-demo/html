// 현행 기획정책의 단일 본문. 사이트·MD·구글시트는 정책 ID로 대조한다.
window.GFAIR_PLANNING_POLICY={
  "meta": {
    "title": "G-FAIR KOREA | 공통 기획정책",
    "version": "v1.0",
    "date": "2026-11-06",
    "timezone": "Asia/Seoul",
    "scope": "현행 사이트 기준 정리",
    "baseCommit": "c2df83cf1d443032161735bd3538182c4dc83550",
    "limitations": "2026-11-06 공개 사이트 소스와 저장 Description을 대조한 현행 정리본. 확인된 동작과 사용자 확정 기준을 기록하며, 불일치·미연동은 확인필요사항에서 별도로 관리한다."
  },
  "roles": {
    "admin": "관리자",
    "buyOperator": "구매상담 운영용역사",
    "exportOperator": "수출상담 운영용역사",
    "buyer": "국내바이어",
    "interpreter": "통역원"
  },
  "menus": [
    {
      "name": "모니터링",
      "icon": "layout-dashboard",
      "items": [
        [
          "MON-01",
          "통합 대시보드",
          [],
          {
            "admin": "O",
            "buyOperator": "△",
            "exportOperator": "△",
            "interpreter": "X",
            "buyer": "X"
          }
        ],
        [
          "MON-08",
          "출결 대시보드",
          [],
          {
            "admin": "O",
            "buyOperator": "△",
            "exportOperator": "△",
            "interpreter": "X",
            "buyer": "X"
          }
        ]
      ]
    },
    {
      "name": "기본정보관리",
      "icon": "folder",
      "items": [
        [
          "BAS-01",
          "행사관리",
          [],
          {
            "admin": "O",
            "buyOperator": "X",
            "exportOperator": "X",
            "interpreter": "X",
            "buyer": "X"
          }
        ],
        [
          "BAS-15",
          "운영용역사 관리",
          [],
          {
            "admin": "O",
            "buyOperator": "X",
            "exportOperator": "X",
            "interpreter": "X",
            "buyer": "X"
          }
        ],
        [
          "BAS-03",
          "해외 바이어 관리",
          [],
          {
            "admin": "O",
            "buyOperator": "X",
            "exportOperator": "X",
            "interpreter": "X",
            "buyer": "X"
          }
        ],
        [
          "BAS-05",
          "국내 바이어 관리",
          [],
          {
            "admin": "O",
            "buyOperator": "X",
            "exportOperator": "X",
            "interpreter": "X",
            "buyer": "X"
          }
        ],
        [
          "BAS-07",
          "통역원 관리",
          [],
          {
            "admin": "O",
            "buyOperator": "X",
            "exportOperator": "X",
            "interpreter": "X",
            "buyer": "X"
          }
        ],
        [
          "BAS-16",
          "관리자 관리",
          [],
          {
            "admin": "O",
            "buyOperator": "X",
            "exportOperator": "X",
            "interpreter": "X",
            "buyer": "X"
          }
        ]
      ]
    },
    {
      "name": "담당자관리",
      "icon": "users",
      "direct": true,
      "items": [
        [
          "COM-07",
          "담당자관리",
          [],
          {
            "admin": "X",
            "buyOperator": "O",
            "exportOperator": "O",
            "buyer": "X",
            "interpreter": "X"
          }
        ]
      ]
    },
    {
      "name": "행사정보",
      "icon": "calendar-days",
      "items": [
        [
          "BAS-09",
          "참가기업",
          [],
          {
            "admin": "O",
            "buyOperator": "△",
            "exportOperator": "△",
            "interpreter": "△",
            "buyer": "△"
          }
        ],
        [
          "PRE-01",
          "해외 바이어",
          [],
          {
            "admin": "O",
            "buyOperator": "X",
            "exportOperator": "O",
            "interpreter": "X",
            "buyer": "X"
          }
        ],
        [
          "EVT-01",
          "국내 바이어",
          [],
          {
            "admin": "O",
            "buyOperator": "O",
            "exportOperator": "X",
            "interpreter": "X",
            "buyer": "X"
          }
        ],
        [
          "EVT-02",
          "통역원",
          [],
          {
            "admin": "O",
            "buyOperator": "X",
            "exportOperator": "O",
            "interpreter": "X",
            "buyer": "X"
          }
        ],
        [
          "PRE-04",
          "통역원 매칭",
          [],
          {
            "admin": "O",
            "buyOperator": "X",
            "exportOperator": "△",
            "interpreter": "X",
            "buyer": "X"
          }
        ]
      ]
    },
    {
      "name": "상담일지",
      "icon": "clipboard-list",
      "items": [
        [
          "JNL-13",
          "구매상담일지",
          [],
          {
            "admin": "O",
            "buyOperator": "O",
            "exportOperator": "X",
            "interpreter": "X",
            "buyer": "O"
          }
        ],
        [
          "JNL-14",
          "수출상담일지",
          [],
          {
            "admin": "O",
            "buyOperator": "X",
            "exportOperator": "O",
            "interpreter": "O",
            "buyer": "X"
          }
        ]
      ]
    },
    {
      "name": "공지/알림",
      "icon": "bell",
      "items": [
        [
          "NTC-01",
          "공지/알림",
          [],
          {
            "admin": "O",
            "buyOperator": "△",
            "exportOperator": "△",
            "interpreter": "△",
            "buyer": "△"
          }
        ]
      ],
      "direct": true
    },
    {
      "name": "통계",
      "icon": "chart-no-axes-column",
      "items": [
        [
          "STA-01",
          "통계 대시보드",
          [],
          {
            "admin": "O",
            "buyOperator": "X",
            "exportOperator": "X",
            "interpreter": "X",
            "buyer": "X"
          }
        ],
        [
          "STA-02",
          "연도별 상담실적 통계",
          [],
          {
            "admin": "O",
            "buyOperator": "X",
            "exportOperator": "X",
            "interpreter": "X",
            "buyer": "X"
          }
        ],
        [
          "STA-03",
          "연도별 바이어 통계",
          [],
          {
            "admin": "O",
            "buyOperator": "X",
            "exportOperator": "X",
            "interpreter": "X",
            "buyer": "X"
          }
        ]
      ]
    },
    {
      "name": "환경설정",
      "icon": "settings",
      "items": [
        [
          "SET-01",
          "그룹권한관리",
          [],
          {
            "admin": "O",
            "buyOperator": "X",
            "exportOperator": "X",
            "interpreter": "X",
            "buyer": "X"
          }
        ],
        [
          "SET-04",
          "상담일지 관리",
          [],
          {
            "admin": "O",
            "buyOperator": "X",
            "exportOperator": "X",
            "interpreter": "X",
            "buyer": "X"
          }
        ],
        [
          "SET-07",
          "만족도설문 관리",
          [
            [
              "SET-05",
              "설문관리",
              [],
              {
                "admin": "O",
                "buyOperator": "X",
                "exportOperator": "X",
                "interpreter": "X",
                "buyer": "X"
              }
            ],
            [
              "SET-06",
              "응답관리",
              [],
              {
                "admin": "O",
                "buyOperator": "X",
                "exportOperator": "X",
                "interpreter": "X",
                "buyer": "X"
              }
            ]
          ],
          {
            "admin": "O",
            "buyOperator": "X",
            "exportOperator": "X",
            "interpreter": "X",
            "buyer": "X"
          }
        ],
        [
          "SET-03",
          "메뉴 접근 로그",
          [],
          {
            "admin": "O",
            "buyOperator": "X",
            "exportOperator": "X",
            "interpreter": "X",
            "buyer": "X"
          }
        ],
        [
          "SET-19",
          "개인정보 접속 이력",
          [],
          {
            "admin": "O",
            "buyOperator": "X",
            "exportOperator": "X",
            "interpreter": "X",
            "buyer": "X"
          }
        ]
      ]
    },
    {
      "name": "로그인",
      "icon": "log-in",
      "items": [
        [
          "COM-01",
          "로그인",
          [],
          {
            "admin": "O",
            "buyOperator": "O",
            "exportOperator": "O",
            "interpreter": "X",
            "buyer": "X"
          }
        ]
      ]
    },
    {
      "name": "알림",
      "icon": "bell",
      "items": [
        [
          "NTC-07",
          "알림",
          [],
          {
            "admin": "O",
            "buyOperator": "O",
            "exportOperator": "O",
            "interpreter": "O",
            "buyer": "O"
          }
        ]
      ]
    },
    {
      "name": "만족도 조사",
      "icon": "clipboard-check",
      "direct": true,
      "items": [
        [
          "NTC-08",
          "만족도 조사",
          [],
          {
            "admin": "X",
            "buyOperator": "X",
            "exportOperator": "X",
            "buyer": "O",
            "interpreter": "O"
          }
        ]
      ]
    }
  ],
  "catalog": [
    {
      "name": "공통",
      "key": "common",
      "screens": [
        {
          "id": "COM-01",
          "title": "로그인",
          "kind": "form"
        },
        {
          "id": "COM-06",
          "title": "내정보",
          "kind": "detail"
        },
        {
          "id": "NTC-07",
          "title": "알림",
          "kind": "list"
        }
      ]
    },
    {
      "name": "모니터링",
      "key": "menu-0",
      "screens": [
        {
          "id": "MON-01",
          "title": "통합 대시보드",
          "kind": "dashboard"
        },
        {
          "id": "MON-08",
          "title": "출결 대시보드",
          "kind": "dashboard"
        }
      ]
    },
    {
      "name": "기본정보관리",
      "key": "menu-1",
      "screens": [
        {
          "id": "BAS-01",
          "title": "행사관리",
          "kind": "list"
        },
        {
          "id": "BAS-02",
          "title": "행사관리 상세",
          "kind": "form"
        },
        {
          "id": "BAS-15",
          "title": "운영용역사 관리",
          "kind": "list"
        },
        {
          "id": "BAS-17",
          "title": "운영용역사 상세",
          "kind": "list"
        },
        {
          "id": "BAS-19",
          "title": "운영용역사 등록",
          "kind": "form"
        },
        {
          "id": "BAS-03",
          "title": "해외 바이어 관리",
          "kind": "list"
        },
        {
          "id": "BAS-04",
          "title": "해외 바이어 관리 상세",
          "kind": "form"
        },
        {
          "id": "BAS-05",
          "title": "국내 바이어 관리",
          "kind": "list"
        },
        {
          "id": "BAS-06",
          "title": "국내 바이어 관리 상세",
          "kind": "form"
        },
        {
          "id": "BAS-07",
          "title": "통역원 관리",
          "kind": "list"
        },
        {
          "id": "BAS-08",
          "title": "통역원 관리 상세",
          "kind": "form"
        },
        {
          "id": "BAS-16",
          "title": "관리자 관리",
          "kind": "list"
        },
        {
          "id": "BAS-18",
          "title": "관리자 등록·상세",
          "kind": "list"
        }
      ]
    },
    {
      "name": "담당자관리",
      "key": "menu-2",
      "screens": [
        {
          "id": "COM-07",
          "title": "담당자관리",
          "kind": "list"
        },
        {
          "id": "COM-08",
          "title": "담당자 등록·상세",
          "kind": "list"
        }
      ]
    },
    {
      "name": "행사정보",
      "key": "menu-3",
      "screens": [
        {
          "id": "BAS-09",
          "title": "참가기업",
          "kind": "list"
        },
        {
          "id": "BAS-10",
          "title": "참가기업 상세",
          "kind": "form"
        },
        {
          "id": "PRE-01",
          "title": "해외 바이어",
          "kind": "list"
        },
        {
          "id": "PRE-02",
          "title": "해외 바이어 상세",
          "kind": "form"
        },
        {
          "id": "PRE-02-p43",
          "title": "방한기록 수정",
          "kind": "popup",
          "parent": "PRE-02"
        },
        {
          "id": "PRE-01-p42",
          "title": "숙소 일괄변경",
          "kind": "popup",
          "parent": "PRE-01"
        },
        {
          "id": "PRE-01-p41",
          "title": "숙소관리",
          "kind": "popup",
          "parent": "PRE-01"
        },
        {
          "id": "PRE-03",
          "title": "방한 상태, 행사 출결 QR 리더기 실행",
          "kind": "form"
        },
        {
          "id": "PRE-12",
          "title": "상태관리 QR 스캔 카메라",
          "kind": "form",
          "parent": "PRE-03"
        },
        {
          "id": "EVT-01",
          "title": "국내 바이어",
          "kind": "list"
        },
        {
          "id": "EVT-03",
          "title": "국내 바이어 상세",
          "kind": "form"
        },
        {
          "id": "EVT-02",
          "title": "통역원",
          "kind": "list"
        },
        {
          "id": "EVT-04",
          "title": "통역원 상세",
          "kind": "form"
        },
        {
          "id": "PRE-04",
          "title": "통역원 매칭",
          "kind": "list"
        }
      ]
    },
    {
      "name": "상담일지",
      "key": "menu-4",
      "screens": [
        {
          "id": "JNL-13",
          "title": "구매상담일지",
          "kind": "list"
        },
        {
          "id": "JNL-04",
          "title": "구매상담일지 등록",
          "kind": "mobile"
        },
        {
          "id": "JNL-15",
          "title": "구매상담일지 상세",
          "kind": "form"
        },
        {
          "id": "JNL-14",
          "title": "수출상담일지",
          "kind": "list"
        },
        {
          "id": "JNL-05",
          "title": "수출상담일지 등록",
          "kind": "mobile"
        },
        {
          "id": "JNL-16",
          "title": "수출상담일지 상세",
          "kind": "mobile"
        },
        {
          "id": "JNL-03",
          "title": "상담 QR 리더",
          "kind": "mobile"
        }
      ]
    },
    {
      "name": "공지/알림",
      "key": "menu-5",
      "screens": [
        {
          "id": "NTC-01",
          "title": "공지/알림",
          "kind": "list"
        },
        {
          "id": "NTC-04",
          "title": "공지/알림 상세",
          "kind": "form"
        },
        {
          "id": "NTC-15",
          "title": "공지/알림 등록",
          "kind": "list",
          "parent": "NTC-01"
        },
        {
          "id": "NTC-16",
          "title": "공지/알림 수정",
          "kind": "list",
          "parent": "NTC-01"
        }
      ]
    },
    {
      "name": "통계",
      "key": "menu-6",
      "screens": [
        {
          "id": "STA-01",
          "title": "통계 대시보드",
          "kind": "dashboard"
        },
        {
          "id": "STA-02",
          "title": "연도별 상담실적 통계",
          "kind": "list"
        },
        {
          "id": "STA-03",
          "title": "연도별 바이어 통계",
          "kind": "list"
        }
      ]
    },
    {
      "name": "환경설정",
      "key": "menu-7",
      "screens": [
        {
          "id": "SET-01",
          "title": "그룹권한관리",
          "kind": "list"
        },
        {
          "id": "SET-02",
          "title": "그룹 등록·상세",
          "kind": "matrix"
        },
        {
          "id": "SET-04",
          "title": "상담일지 관리",
          "kind": "form"
        },
        {
          "id": "SET-07",
          "title": "만족도설문 관리",
          "kind": "list",
          "parent": "SET-05"
        },
        {
          "id": "SET-05",
          "title": "설문관리",
          "kind": "form"
        },
        {
          "id": "SET-11",
          "title": "설문 등록",
          "kind": "workflow",
          "parent": "SET-05"
        },
        {
          "id": "SET-12",
          "title": "설문 상세",
          "kind": "workflow",
          "parent": "SET-05"
        },
        {
          "id": "SET-13",
          "title": "설문 미리보기",
          "kind": "popup",
          "parent": "SET-05"
        },
        {
          "id": "SET-06",
          "title": "응답관리",
          "kind": "list"
        },
        {
          "id": "SET-14",
          "title": "개별 설문 응답",
          "kind": "workflow",
          "parent": "SET-06"
        },
        {
          "id": "SET-16",
          "title": "설문 응답 결과 상세",
          "kind": "list",
          "parent": "SET-06"
        },
        {
          "id": "SET-15",
          "title": "주관식 설문 응답",
          "kind": "workflow",
          "parent": "SET-16"
        },
        {
          "id": "SET-03",
          "title": "메뉴 접근 로그",
          "kind": "list"
        },
        {
          "id": "SET-17",
          "title": "접근·개인정보·변경 로그 상세",
          "kind": "workflow",
          "parent": "SET-03"
        },
        {
          "id": "SET-18",
          "title": "접근·개인정보·변경 로그 · 상세 조회",
          "kind": "workflow",
          "parent": "SET-03"
        },
        {
          "id": "SET-19",
          "title": "개인정보 접속 이력",
          "kind": "list"
        }
      ]
    },
    {
      "name": "만족도 조사",
      "key": "menu-10",
      "screens": [
        {
          "id": "NTC-08",
          "title": "만족도 조사",
          "kind": "mobile"
        }
      ]
    }
  ],
  "issues": [
    {
      "id": "Q01",
      "priority": "P1",
      "title": "엑셀 오류 반영 단위의 불일치",
      "finding": "현재 검증·화면은 오류 1건 이상이면 전체 미반영한다. 과거 정상 행 부분 반영 요청과 일부 업로드 Description은 다른 기준이다.",
      "decision": "현재 전체 실패를 유지할지 정상 행 부분 반영으로 바꿀지 확인한 뒤 코드·Description·규칙을 한 번에 맞춘다.",
      "basis": [
        "S09",
        "S10"
      ]
    },
    {
      "id": "Q04",
      "priority": "P1",
      "title": "QR 상태 전이·정정",
      "finding": "QR 선택 화면은 입국·호텔 이동·호텔 도착·전시장 출발·전시장 입장·통역원 만남·전시장 퇴장을 제공한다. 해외바이어 상세 이력에는 상담 시작·종료 등 다른 단계 정의가 있다.",
      "decision": "QR 상태와 방한 상세·출결·상담 이력의 대응표, 역순·건너뛰기·재입장·정정 및 통계 집계 기준을 확인한다.",
      "basis": [
        "S15"
      ]
    },
    {
      "id": "Q05",
      "priority": "P1",
      "title": "설문 1회 제출의 서버 판정",
      "finding": "Description은 설문 ID·연도·응답자 고유코드의 1회 제출을 정의한다. 국내바이어는 목업에서 제출 후 빈 설문으로 돌아가는 반복 시연 예외가 있다.",
      "decision": "운영 서버의 중복 제출 방지·저장 완료 판정·실패 복원을 구현하고 목업 예외가 운영에 적용되지 않도록 확인한다.",
      "basis": [
        "S18",
        "S19"
      ]
    },
    {
      "id": "Q06",
      "priority": "P2",
      "title": "구매·수출 일지 상태 명칭",
      "finding": "수출 일괄 처리는 작성 중/반려를 사용한다. 다른 코드에는 임시 저장도 존재한다.",
      "decision": "유형별 상태코드·노출명·수정/삭제/재제출 가능 여부 표를 완성한다.",
      "basis": [
        "S11",
        "S12"
      ]
    },
    {
      "id": "Q07",
      "priority": "P2",
      "title": "메뉴 접근과 처리 권한",
      "finding": "메뉴의 △는 단일한 수정/열람 권한으로 해석할 수 없다.",
      "decision": "담당 범위·행사·목록·상세·버튼·서버 API 단위 권한표를 연결한다.",
      "basis": [
        "S01",
        "S13"
      ]
    },
    {
      "id": "Q08",
      "priority": "P2",
      "title": "상세 Description과 운영 산식 검토",
      "finding": "현재 문서가 여러 화면에 영향을 주는 공통 기준을 관리한다. 개별 항목·알럿·핀과 일부 예시 값·과거 설명은 저장 Description에 남아 있다.",
      "decision": "Description의 오타·노출 조건과 통계 산식·개인정보 이력 보존 기간을 업무별 검토한다. 문서 정리를 이유로 설명과 댓글을 일괄 삭제하지 않는다.",
      "basis": [
        "S02"
      ]
    },
    {
      "id": "Q09",
      "priority": "P2",
      "title": "데이터 저장 수준",
      "finding": "참가 상태·QR 기록·설문 작성값 등은 현재 메모리 또는 탭 저장 예제가 섞여 있다.",
      "decision": "새로고침 복원·동시 작업·중복 실행·서버 장애·감사 로그 보존 기준을 정한다.",
      "basis": [
        "S05",
        "S15",
        "S19"
      ]
    },
    {
      "id": "Q10",
      "priority": "P1",
      "title": "승인된 표준상담일지 변경의 연결·배포 확인",
      "finding": "표준상담일지 모듈과 문서는 저장소에 있으나 기준 공개 소스의 index.html·app.js에는 모듈 진입 연결이 없다. 구매 만원/KRW·수출 USD 예외는 사용자 확정사항이다.",
      "decision": "기업 확인·상담수준 C1~C5·후속조치·250자 검증 등의 연결·Description·배포를 별도 완료한 뒤 현행 화면 기준으로 승격한다.",
      "basis": [
        "S11",
        "S12"
      ]
    }
  ],
  "sources": [
    {
      "id": "S01",
      "file": "gfair_cs/data/navigation.js",
      "line": 1,
      "keyword": "window.GFAIR_MENU",
      "note": "현재 메뉴와 역할별 접근 선언. △의 처리 범위는 별도 확인."
    },
    {
      "id": "S02",
      "file": "gfair_cs/data/screen-catalog.js",
      "line": 3,
      "keyword": "function build",
      "note": "현재 메뉴와 등록된 보조 화면 목록. QR 3개 화면은 qr-workflow.js에서 추가한다."
    },
    {
      "id": "S03",
      "file": "gfair_cs/include/participant-lifecycle.js",
      "line": 7,
      "keyword": "function participating",
      "note": "회원과 행사별 참가 상태·미참여 표시·원본 보존."
    },
    {
      "id": "S04",
      "file": "gfair_cs/docs/회원_행사_계정.md",
      "line": 5,
      "keyword": "## 참가와 제외",
      "note": "현행 참가·자동 발급·동일 행사 재활성화 기준."
    },
    {
      "id": "S05",
      "file": "gfair_cs/include/domestic-event-review.js",
      "line": 15,
      "keyword": "const view=row",
      "note": "해외·국내·통역원의 행사 목록과 자동 발급 연결."
    },
    {
      "id": "S06",
      "file": "common/README.md",
      "line": 5,
      "keyword": "## 검토 도구와 실제 화면",
      "note": "상단 도구·Description·레이아웃과 서비스 정책 구분."
    },
    {
      "id": "S07",
      "file": "gfair_cs/include/overseas-buyer-detail.js",
      "line": 97,
      "keyword": "hideHistory",
      "note": "회원 상세·참가이력 숨김·발급 정보 보존."
    },
    {
      "id": "S08",
      "file": "gfair_cs/docs/화면_정책.md",
      "line": 77,
      "keyword": "## SP-09",
      "note": "운영용역사·담당자·내정보 등 화면별 적용 기준."
    },
    {
      "id": "S09",
      "file": "AGENTS.md",
      "line": 5,
      "keyword": "## 기준 문서",
      "note": "현행 문서의 우선순위와 변경·검증 작업 규칙."
    },
    {
      "id": "S10",
      "file": "gfair_cs/include/member-upload.js",
      "line": 17,
      "keyword": "function validate",
      "note": "엑셀 필수값·형식·중복 및 현행 전체 미반영 검증."
    },
    {
      "id": "S11",
      "file": "gfair_cs/js/app.js",
      "line": 111,
      "keyword": "function exportJournal",
      "note": "공개 진입 소스의 상담일지 작성·검수·상태 처리."
    },
    {
      "id": "S12",
      "file": "gfair_cs/docs/확인필요사항.md",
      "line": 56,
      "keyword": "## Q10",
      "note": "승인된 표준양식 변경과 실제 배포 상태를 구분한다."
    },
    {
      "id": "S13",
      "file": "gfair_cs/include/jnl14-bulk.js",
      "line": 1,
      "keyword": "create",
      "note": "수출상담일지 목록·일괄 검수 처리."
    },
    {
      "id": "S14",
      "file": "gfair_cs/include/pre04-matching.js",
      "line": 4,
      "keyword": "create",
      "note": "통역원 매칭·변경·취소와 이력."
    },
    {
      "id": "S15",
      "file": "gfair_cs/include/qr-workflow.js",
      "line": 3,
      "keyword": "const states=",
      "note": "QR 상태·참가자 식별·출결과 중복 체크."
    },
    {
      "id": "S16",
      "file": "gfair_cs/include/header.js",
      "line": 5,
      "keyword": "accountLabel",
      "note": "현재 이름·역할 표시·내정보 링크·모바일 QR."
    },
    {
      "id": "S17",
      "file": "gfair_cs/include/notice-ui.js",
      "line": 5,
      "keyword": "const titles=",
      "note": "공지/알림 목록·대상·등록·상세."
    },
    {
      "id": "S18",
      "file": "gfair_cs/include/survey-participation.js",
      "line": 11,
      "keyword": "function menuOpen",
      "note": "행사 마지막 날 개방·대상·조건부 문항·제출."
    },
    {
      "id": "S19",
      "file": "gfair_cs/js/app.js",
      "line": 241,
      "keyword": "function surveyContext",
      "note": "설문 원천 데이터·응답 및 행사 종료일 연결."
    },
    {
      "id": "S20",
      "file": "../RFP 및 자료/기준코드/README.md",
      "line": 1,
      "keyword": "## 코드 구성",
      "note": "국가 250·언어 104·산업군 20. 전달 원본 유지."
    }
  ],
  "referenceCodes": {
    "source": "RFP 및 자료/기준코드/gfair-reference-codes.json",
    "format": "gfair-reference-codes-v1",
    "counts": {
      "countries": 250,
      "languages": 104,
      "industries": 20
    }
  },
  "commonPolicies": [
    {
      "id": "CP-01",
      "title": "접근 권한과 처리 권한",
      "status": "목업 확인",
      "scope": "모든 메뉴·목록·상세·처리 화면",
      "rules": [
        "메뉴 접근 권한과 업무 처리 권한을 구분한다. 메뉴의 O·△·X만으로 등록·수정·검수 가능 여부를 확정하지 않는다.",
        "동일 업무의 목록·상세·일괄 처리에서도 역할, 담당 유형과 대상 상태를 함께 확인한다.",
        "권한 조건을 변경할 때는 메뉴, 직접 URL 접근, 상세 열람과 실행 시점 검증을 함께 확인한다."
      ],
      "impact": "메뉴 접근표 · 담당 범위 · 상담일지 검수 · 직접 URL 진입",
      "basis": [
        "S01",
        "S11",
        "S13"
      ],
      "questions": [
        "Q07"
      ]
    },
    {
      "id": "CP-02",
      "title": "행사연도와 참가 대상 분리",
      "status": "사이트 기준",
      "scope": "기본정보관리 · 행사정보 · QR·출결 · 통계",
      "rules": [
        "회원 기본정보·고유코드와 행사연도별 참가 상태를 분리한다. 현재 행사에서 제외해도 원본과 다른 연도의 참가이력은 보존한다.",
        "업로드의 참가연도는 행사관리에서 진행 상태인 행사연도를 사용한다. 새 행사연도에는 전년도 참가 상태를 자동 승계하지 않는다. 동일 연도의 재조회·재동기화로 참가 상태를 초기화하지 않는다.",
        "관리자와 일반 사용자의 행사 선택 노출은 각 화면·역할 정의를 따른다. 행사 전환 시 선택 대상·참가 상태·계정·QR의 연도가 섞이지 않도록 한다."
      ],
      "impact": "행사 선택 · 참가 명단 · 선택 대상 · QR 유효성 · 연도별 집계",
      "basis": [
        "S03",
        "S04",
        "S05",
        "S15"
      ],
      "questions": [
        "Q09"
      ]
    },
    {
      "id": "CP-03",
      "title": "참가 즉시 반영과 발급 정보 재사용",
      "status": "사용자 확정 · 2026-11-06",
      "scope": "해외바이어 · 국내바이어 · 통역원 행사 참가 흐름",
      "flow": [
        "단건 등록·엑셀 업로드 반영 · 참가/자동 발급",
        "제외 · 미참여/발급 정보 미사용",
        "같은 행사 재추가 · 기존 발급 정보 재활성화"
      ],
      "rules": [
        "단건 등록 또는 정상 엑셀 업로드가 반영되면 별도 최종확정 없이 행사 참가 목록에 즉시 표시한다. 해외바이어는 QR만, 국내바이어·통역원은 행사별 ID/PW와 QR을 자동 발급한다.",
        "현재 행사에서 제외하면 행사 목록에서 숨기고 발급 ID와 QR을 미사용 처리한다. 기본정보에는 해당 행사 미참여 상태를 표시하고 참가연도 표시에서 해당 연도를 제외한다. 기본정보·고유코드·과거 이력은 보존한다.",
        "같은 행사에 다시 추가하면 기존에 발급한 ID/PW와 QR을 그대로 재활성화한다. 새로운 행사연도의 계정과 혼용하지 않는다. 최종확정 버튼과 확정 후 명단 잠금은 사용하지 않는다."
      ],
      "impact": "참가 명단 · 버튼 노출/활성 · 계정·QR · 방한 운영",
      "basis": [
        "S05",
        "S06"
      ],
      "questions": [
        "Q09"
      ]
    },
    {
      "id": "CP-04",
      "title": "QR 식별과 체크 이력",
      "status": "사이트 기준",
      "scope": "방한 상태 · 행사 출결 · 상담 시작 QR",
      "rules": [
        "현재 행사연도·대상 유형·참가 여부와 QR 식별값을 확인한다. 해외바이어는 고유코드, 국내바이어·통역원은 행사계정, 상담 시작은 참가기업 QR을 사용한다. 제외되어 미사용 처리한 참가자 QR은 처리 대상에서 제외한다.",
        "같은 QR과 같은 처리 상태를 3초 안에 반복 인식하면 새 이력을 추가하지 않는 목업 조건을 적용한다. QR 화면의 상태 선택과 해외바이어 상세의 방한 이력은 각각의 정의를 구분해 확인한다.",
        "QR 단계의 역순·건너뛰기·정정·재입장과 대시보드 집계 기준은 Q04에서 관리한다. 화면에 나열된 순서만으로 필수 처리 순서를 확정하지 않는다."
      ],
      "impact": "QR 진입 · 참가자 검증 · 체크 이력 · 현황판·통계",
      "basis": [
        "S15",
        "S16"
      ],
      "questions": [
        "Q04"
      ]
    },
    {
      "id": "CP-05",
      "title": "상담일지 상태와 검수 일관성",
      "status": "목업 확인",
      "scope": "상담일지 작성 · 상세 · 검수 · 일괄 처리",
      "flow": [
        "작성 중 / 반려",
        "승인 요청",
        "승인 완료 또는 반려"
      ],
      "rules": [
        "수출상담일지는 작성·승인 요청·승인 완료·반려 상태에 따라 처리 가능 범위가 달라진다. 목록·상세·일괄 처리에서 같은 상태 기준을 사용한다.",
        "승인·반려 실행 시 검수 권한과 최신 처리 상태를 다시 확인한다. 반려 사유와 처리 이력을 보존한다.",
        "임시 저장과 작성 중의 상태 명칭, 구매·수출 유형별 차이, 수정·삭제·재제출 범위는 동일하다고 가정하지 않고 명시적으로 관리한다."
      ],
      "impact": "작성 화면 · 상세 열람·수정 · 승인/반려 · 일괄 처리 · 처리 이력",
      "basis": [
        "S11",
        "S12",
        "S13"
      ],
      "questions": [
        "Q06",
        "Q07"
      ]
    },
    {
      "id": "CP-06",
      "title": "제외·숨김·원본 보존",
      "status": "목업 확인",
      "scope": "회원 기본정보 · 행사 참가이력 · 행사 대상 명단",
      "rules": [
        "현재 행사 제외, 이력 숨김, 회원 원본 삭제를 서로 다른 처리로 구분한다. 화면에서 보이지 않는다는 이유만으로 데이터가 물리 삭제되었다고 해석하지 않는다.",
        "현재 행사 미참여 처리는 회원 기본정보·고유코드·과거 참가이력을 보존한다. 참가이력 삭제는 현재 구현상 이력 숨김과 해당 행사 미참여로 처리한다.",
        "같은 행사에 다시 추가하면 기존 발급 ID/PW와 QR을 재활성화한다. 해외바이어는 고유코드 기반 QR만 재사용한다. 다른 연도의 참가 상태와 발급 정보에는 영향을 주지 않는다."
      ],
      "impact": "기본정보 조회 · 행사 목록 · 참가이력 · 재참가·복원",
      "basis": [
        "S03",
        "S04",
        "S07",
        "S08"
      ],
      "questions": [
        "Q09"
      ]
    },
    {
      "id": "CP-07",
      "title": "저장 수준과 완료 상태",
      "status": "사이트 기준",
      "scope": "초안 저장 · 행사 참가 · QR 기록 · 설문 응답",
      "rules": [
        "공개 목업의 예시 저장과 실제 운영 서버 저장을 구분한다. 브라우저 메모리·sessionStorage·localStorage와 Description 서버 저장은 서로 다른 저장 범위다.",
        "상담일지의 기기 초안, 참가 상태, 설문 편집·응답 작성값의 유지·초기화 조건은 해당 업무 정의를 따른다. 성공 안내만으로 실제 계정 인증·문자 발송·운영 DB 저장 완료로 간주하지 않는다.",
        "동시 작업·중복 실행·영속 저장·장애 복원·감사 이력은 운영 서버 연동 시 확인한다. 승인된 화면 변경도 공개 진입 스크립트 연결과 실제 배포를 확인한 뒤 현행으로 표기한다."
      ],
      "impact": "초안 복원 · 새로고침 · 동시 작업 · 오류 복원 · 완료 판정",
      "basis": [
        "S05",
        "S15",
        "S18",
        "S19"
      ],
      "questions": [
        "Q05",
        "Q09"
      ]
    },
    {
      "id": "CP-08",
      "title": "기준코드와 일괄 등록 단위",
      "status": "사이트 기준",
      "scope": "국가·언어·산업군 사용 화면 · 회원 엑셀 등록",
      "rules": [
        "국가 250개·언어 104개·산업군 20개는 사용자 제공 원본 이름·코드·대소문자를 유지한다. 관심분야 제품 카테고리·전시관 구분을 산업군 코드와 혼용하지 않는다.",
        "등록정보 시트와 현재 유형의 열 이름·순서를 검증한다. 예시 행·참고 코드 시트는 등록하지 않고, 필수값·형식·중복·수식 여부를 검사한다.",
        "현행 검증 코드는 입력 오류가 1건이라도 있으면 전체 미반영한다. 과거의 정상 행 부분 반영 요청 및 일부 Description과의 차이는 Q01에 기록하며, 문서 정리만으로 처리 방식을 변경하지 않는다."
      ],
      "impact": "입력 옵션 · 엑셀 검증 · 대상 반영 · 오류 안내",
      "basis": [
        "S09",
        "S10",
        "S20"
      ],
      "questions": [
        "Q01"
      ]
    }
  ],
  "screenPolicies": [
    {
      "id": "SP-01",
      "title": "기본정보의 참가이력",
      "screens": [
        "BAS-04",
        "BAS-06",
        "BAS-08"
      ],
      "common": [
        "CP-02",
        "CP-06"
      ],
      "rule": "기본정보 목록은 해당 행사 참가 상태를 표시한다. 참가이력의 삭제는 현재 선택 행사 행에만 제공하며 해당 행사 미참여·이력 숨김으로 처리한다. 다른 연도의 이력과 원본을 삭제하지 않는다.",
      "detail": "기본정보 3종·행사정보 3종 목록의 [등록]은 기존 상세 ID의 등록 모드를 사용한다. 단건 등록은 이름·생년월일로 중복 생성을 막으며, 기존 상세 항목·검증을 공유한다. 입력 상세는 각 회원 상세 Description에서 관리한다.",
      "basis": [
        "S07",
        "S08"
      ]
    },
    {
      "id": "SP-02",
      "title": "해외바이어의 계정 예외",
      "screens": [
        "PRE-01",
        "PRE-02"
      ],
      "common": [
        "CP-02",
        "CP-03",
        "CP-04"
      ],
      "rule": "해외바이어는 로그인 ID/PW를 발급하지 않는다. 단건 등록·업로드 반영 즉시 행사 참가 목록에 표시하고 행사연도와 고유코드로 QR을 발급한다. 제외 시 QR 미사용, 같은 행사 재추가 시 기존 QR을 다시 사용한다.",
      "detail": "방한 단계별 입력·정정 사유·숙소 항목은 해당 화면 명세를 참조한다.",
      "basis": [
        "S04",
        "S05",
        "S15"
      ]
    },
    {
      "id": "SP-03",
      "title": "국내바이어·통역원의 발급 기준",
      "screens": [
        "EVT-01",
        "EVT-02"
      ],
      "common": [
        "CP-01",
        "CP-03",
        "CP-04"
      ],
      "rule": "국내바이어·통역원은 단건 등록·업로드 반영 즉시 해당 행사 ID/PW와 QR을 자동 발급한다. 제외하면 행사 목록에서 숨기고 발급 ID·QR을 미사용 처리한다. 동일 행사 재추가 시 기존 ID/PW와 QR을 그대로 재활성화한다.",
      "detail": "기존 GK/GI 발급 규칙·7자리 임시 PW를 유지한다. 발급 규칙과 재사용 기준은 회원_행사_계정.md에서 관리한다.",
      "basis": [
        "S04",
        "S05"
      ]
    },
    {
      "id": "SP-04",
      "title": "매칭 변경·취소의 이력",
      "screens": [
        "PRE-04",
        "PRE-04-p32"
      ],
      "common": [
        "CP-01",
        "CP-06",
        "CP-07"
      ],
      "rule": "기존 매칭의 변경·취소에는 사유가 필요하며 배정이력을 보존한다. 현재 통역원과 동일한 대상의 재선택은 제한한다.",
      "detail": "후보 검색·긴급 체크·연결 해제 범위·버튼별 확인창은 매칭관리 명세에서 관리한다.",
      "basis": [
        "S14"
      ]
    },
    {
      "id": "SP-05",
      "title": "수출상담일지의 역할별 등록 상태",
      "screens": [
        "JNL-05",
        "JNL-14",
        "JNL-16"
      ],
      "common": [
        "CP-01",
        "CP-05"
      ],
      "rule": "현재 수출 흐름에서 통역원의 신규 등록은 승인 요청으로, 관리자·수출 용역사의 신규 등록은 승인 완료로 저장된다. 일괄 검수는 승인 요청 상태를 대상으로 한다.",
      "detail": "제품별 입력, 금액, 검증 메시지, 반려 의견과 버튼 구성은 상담일지 화면설계서에서 관리한다. 화면 변경안은 승인·배포 상태를 확인한 뒤 현행 정책에 반영한다.",
      "basis": [
        "S11",
        "S12",
        "S13"
      ]
    },
    {
      "id": "SP-06",
      "title": "QR 업무별 대상 분리",
      "screens": [
        "PRE-03",
        "PRE-12",
        "JNL-03"
      ],
      "common": [
        "CP-01",
        "CP-04"
      ],
      "rule": "방한·출결 QR은 관리자·구매/수출 용역사 흐름이며, 상담 시작 QR은 국내바이어·통역원 흐름이다. 상담 시작에서는 참가기업을 식별한다.",
      "detail": "카메라 UI·권한 오류 안내·상태별 체크 동작은 QR 화면 명세를 참조한다.",
      "basis": [
        "S15",
        "S16"
      ]
    },
    {
      "id": "SP-07",
      "title": "공지/알림의 단일 진입과 열람 범위",
      "screens": [
        "NTC-01",
        "NTC-04",
        "NTC-15",
        "NTC-16"
      ],
      "common": [
        "CP-01"
      ],
      "rule": "공지/알림 대메뉴는 NTC-01 목록으로 바로 이동한다. FAQ·자료실은 사용 종료이며 별도 메뉴·페이지 정책으로 다시 추가하지 않는다. 관리자는 작성·수정하고 일반 사용자는 대상에 맞는 공지를 열람한다.",
      "detail": "제목·대상·첨부파일·알럿/컨펌 상세는 공지/알림 화면에서 관리한다.",
      "basis": [
        "S01",
        "S17"
      ]
    },
    {
      "id": "SP-08",
      "title": "만족도 조사 개방과 응답 보존",
      "screens": [
        "NTC-08"
      ],
      "common": [
        "CP-02",
        "CP-07"
      ],
      "rule": "국내바이어·통역원의 만족도 조사 메뉴는 행사 마지막 날부터 표시한다. 해당 연도·대상 유형의 사용 설문과 원본 준비 여부를 확인하고, 직접 URL 접근도 같은 조건으로 제한한다. 통역원은 본인 및 담당 해외바이어별로 응답한다. 대상 탭 전환은 초안을 유지하고 다른 페이지 이동·새로고침은 미제출 초안을 초기화한다.",
      "detail": "단일응답형·척도형은 보기별 다음 문항 이동을 지정할 수 있으며 미지정 보기는 기본 순서로 진행한다. 현재 등록 화면은 과거 표시 조건 대신 이 문항 이동 설정을 사용한다. 설문 ID·행사연도·응답자 고유코드의 1회 제출 기준과 국내바이어 반복 시연 예외를 구분한다. 응답이 있는 설문은 수정 대신 복사하여 등록한다.",
      "basis": [
        "S18",
        "S19"
      ]
    },
    {
      "id": "SP-09",
      "title": "운영용역사·담당자 관리 범위",
      "screens": [
        "BAS-15",
        "BAS-17",
        "BAS-19",
        "COM-07",
        "COM-08"
      ],
      "common": [
        "CP-01",
        "CP-02",
        "CP-07"
      ],
      "rule": "운영용역사는 행사 배정과 기업·대표담당자 정보를 관리하며, 용역사 담당자관리는 로그인한 회사·행사 범위로 제한한다. ID 중복과 행사연도·구분 중복을 각각 검사한다. 계정발송은 유효한 발급 정보와 연락처가 있는 대상만 처리하는 목업 예시다.",
      "detail": "등록·상세의 입력 항목, ID 수정 가능 여부, 비밀번호 검증과 선택·일괄 발송은 각 화면 Description을 따른다. 실제 SMS·인증 서버는 미연동이다.",
      "basis": [
        "S08",
        "S13"
      ]
    },
    {
      "id": "SP-10",
      "title": "공통 헤더와 내정보 진입",
      "screens": [
        "COM-06"
      ],
      "common": [
        "CP-01"
      ],
      "rule": "헤더에는 이름님과 역할 배지를 표시하고 누르면 COM-06의 기존 내정보 수정 화면으로 이동한다. 사이드바 로고 아래·하단의 역할 표시는 사용하지 않는다. 모바일은 메뉴 아이콘과 QR·알림·로그아웃 아이콘을 사용한다.",
      "detail": "유형별 본인 정보는 원천 기본정보의 입력·검증 정책을 따르고 이력 영역은 내정보에 표시하지 않는다. COM-09는 과거 주소 호환용이며 별도 팝업 정책으로 관리하지 않는다.",
      "basis": [
        "S08",
        "S16"
      ]
    }
  ],
  "issuePolicies": {
    "Q01": [
      "CP-08"
    ],
    "Q04": [
      "CP-04"
    ],
    "Q05": [
      "CP-07"
    ],
    "Q06": [
      "CP-05"
    ],
    "Q07": [
      "CP-01"
    ],
    "Q08": [],
    "Q09": [
      "CP-02",
      "CP-03",
      "CP-07"
    ],
    "Q10": [
      "CP-05",
      "CP-07"
    ]
  }
};
