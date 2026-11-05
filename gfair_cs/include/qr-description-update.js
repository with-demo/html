(() => {
 'use strict';
 const screen = 'PRE-12';
 const item = 'QR 스캔 카메라';
 let saving = false;

 async function saveDescription() {
  const store = window.GFAIR_COLLAB;
  if (saving || location.hash !== '#' + screen || !store?.loaded || !store.user?.editor) return;
  const existing = store.records.find(record => {
   try { return JSON.parse(record.text).item === item; } catch { return false; }
  });

  const spec = {
   format: 'description-spec-v1',
   item,
   type: '기타',
   defaultValue: '후면 카메라',
   detail: '카메라 화면으로 바이어 명찰의 QR을 읽는다. 화면 상단 오른쪽 버튼으로 전면·후면 카메라를 전환한다.',
   trigger: '방한 QR 화면 진입 시 카메라 연결을 시도한다. 전환 버튼을 누르면 선택한 방향의 카메라 연결을 다시 시도한다.',
   errorMessage: '사용 가능한 카메라가 없으면 “사용 가능한 카메라가 없습니다.”를 표시한다. 화면 목업에서는 이 오류 문구를 숨긴다.'
  };
  const previous = existing ? JSON.parse(existing.text) : null;
  const detail = previous?.detail?.replace('스캔 영역 오른쪽 위 버튼으로','화면 상단 오른쪽 버튼으로');
  if (previous && detail === previous.detail) return;
  saving = true;
  try {
   if (previous) {
    const next = {...previous, detail, planningNote:[previous.planningNote,'[변경사항 있음 · 2026-11-05] 카메라 전환 버튼을 화면 상단 오른쪽으로 이동.'].filter(Boolean).join('\n')};
    const changes = window.GFAIR_DESCRIPTION_CHANGES;
    await store.mutate('update', {id:existing.id, revision:existing.revision, text:JSON.stringify(changes ? changes.markAgentChanges(previous,next) : next)});
    return;
   }
   await store.mutate('create', {
    screen,
    text: JSON.stringify(spec),
    anchor: {selector:'#qr-viewfinder',sample:'',x:0,y:0}
   });
  } catch (error) {
   console.error('방한 QR 디스크립션 저장 실패:', error.message);
  } finally {
   saving = false;
  }
 }

 window.addEventListener('collaboration-updated', saveDescription);
 window.addEventListener('hashchange', saveDescription);
 saveDescription();
})();

(() => {
 const screen = 'PRE-03';
 const item = 'QR 스캔 실행';
 let saving = false;
 async function saveLaunchDescription() {
  const store = window.GFAIR_COLLAB;
  if (saving || location.hash !== '#' + screen || !store?.loaded || !store.user?.editor) return;
  if (store.records.some(record => {
   try { return JSON.parse(record.text).item === item; } catch { return false; }
  })) return;
  saving = true;
  try {
   await store.mutate('create', {
    screen,
    text:JSON.stringify({
     format:'description-spec-v1',item,type:'기타',defaultValue:'방한 상태 미선택',required:'Y',
     detail:'선택한 행사명과 현재 날짜를 표시한다. 바이어 방한 상태를 선택하고 QR 스캔을 실행한다.',
     enabled:'방한 상태를 선택하면 QR 스캔 버튼을 활성화한다.',
     destination:'QR 스캔을 누르면 선택한 상태를 유지한 채 방한 QR 스캔 카메라(PRE-12)로 이동한다.'
    }),
    anchor:{selector:'.qr-launch-centered',sample:'',x:0,y:0}
   });
  } catch (error) {
   console.error('QR 스캔 실행 설명 저장 실패:', error.message);
  } finally {
   saving = false;
  }
 }
 window.addEventListener('collaboration-updated', saveLaunchDescription);
 window.addEventListener('hashchange', saveLaunchDescription);
 saveLaunchDescription();
})();

(() => {
 let saving = false;
 async function saveConsultDescription() {
  const store = window.GFAIR_COLLAB;
  if (saving || location.hash !== '#JNL-03' || !store?.loaded || !store.user?.editor) return;
  const item = '상담 시작 QR 스캔';
  const existing = store.records.find(record => {
   try { return JSON.parse(record.text).item === item; } catch { return false; }
  });
  const previous = existing ? JSON.parse(existing.text) : null;
  const updates = {
   detail:'플로팅 버튼 [상담 시작]에서 진입하면 참가기업 부스 QR을 스캔한다. 좌측 상단에 상담 시작과 날짜를 표시한다. 우측 상단 버튼으로 전면·후면 카메라를 전환한다. 스캔 영역 아래에 “참가기업 부스 QR을 카메라로 스캔해 주세요”를 표시한다.',
   trigger:'화면 진입 시 후면 카메라 연결을 우선 시도한다. 전환 버튼을 누르면 선택한 방향의 카메라 연결을 시도한다.',
   errorMessage:'사용 가능한 카메라가 없으면 “사용 가능한 카메라가 없습니다.”를 표시한다. 그 외 카메라 연결 실패 시 “카메라를 실행하지 못했습니다. 연결 상태를 확인해 주세요.”를 표시한다. 화면 목업에서는 오류 문구를 숨긴다.'
  };
  if (previous?.errorMessage) return;
  saving = true;
  try {
   if (previous) {
    const next = {...previous, ...updates};
    const changes = window.GFAIR_DESCRIPTION_CHANGES;
    await store.mutate('update', {id:existing.id, revision:existing.revision, text:JSON.stringify(changes ? changes.markAgentChanges(previous,next) : next)});
    return;
   }
   await store.mutate('create', {
    screen:'JNL-03',
    text:JSON.stringify({
     format:'description-spec-v1',item,type:'기타',defaultValue:'상담 시작',required:'Y',
     permission:'국내바이어·통역원',...updates
    }),
    anchor:{selector:'#qr-viewfinder',sample:'',x:0,y:0}
   });
  } catch (error) {
   console.error('상담 시작 QR 설명 저장 실패:', error.message);
  } finally {
   saving = false;
  }
 }
 window.addEventListener('collaboration-updated', saveConsultDescription);
 window.addEventListener('hashchange', saveConsultDescription);
 saveConsultDescription();
})();

(() => {
 const route = '#PRE-03';
 const originalOverview = 'QR 스캔 배너를 누르면 별도 URL의 새 창에서 열립니다. 행사명과 날짜를 확인하고 해외 바이어의 방한 상태를 선택한 뒤, 같은 창에서 방한 QR 스캔 카메라(PRE-12)로 이동합니다. 전용 창은 서비스 상단 메뉴와 사이드 메뉴 없이 화면을 구성하며 목업의 상단 기획 도구를 표시합니다. QR 스캔을 시작하기 전에 종료하려면 브라우저 창이나 탭을 닫습니다.';
 const changes = [
  ['행사명·날짜', 'visibility', 'QR 스캔 배너로 별도 URL의 새 창을 열면 상단에 행사명과 날짜를 표시한다.'],
  ['바이어 방한 상태', 'trigger', '행사명과 날짜를 확인한 뒤, QR 스캔을 실행하기 전에 방한 상태를 선택한다.'],
  ['QR 스캔 실행', 'policy', 'PRE-12는 PRE-03과 같은 전용 창에서 열린다. 전용 창은 서비스 상단 메뉴와 사이드 메뉴 없이 화면을 구성하며 목업의 상단 기획 도구를 표시한다. 스캔 시작 전 종료하려면 브라우저 창이나 탭을 닫는다.']
 ];
 let saving = false;
 async function redistributeOverview() {
  const store = window.GFAIR_COLLAB;
  const highlights = window.GFAIR_DESCRIPTION_CHANGES;
  if (saving || location.hash !== route || !store?.loaded || !store.user?.editor || !highlights) return;
  const records = store.records.flatMap(record => {
   try { return [{record, spec:JSON.parse(record.text)}]; } catch { return []; }
  });
  const overview = records.find(({spec}) => spec.format === 'screen-overview-v1' && spec.overview?.startsWith(originalOverview + '\n\n사용자별 권한'));
  if (!overview) return;
  const sections = changes.map(([name]) => records.find(({spec}) => spec.format === 'description-spec-v1' && spec.item === name));
  if (sections.some(section => !section)) return;

  const update = ({record, spec}, key, value) => store.mutate('update', {
   id:record.id, revision:record.revision,
   text:JSON.stringify(highlights.markAgentChanges(spec, {...spec, [key]:value}))
  });
  saving = true;
  try {
   for (const [index, [, key, addition]] of changes.entries()) {
    const section = sections[index];
    const current = section.spec[key] || '';
    if (!current.includes(addition)) await update(section, key, [current, addition].filter(Boolean).join('\n'));
   }
   await update(overview, 'overview', '해외 바이어의 방한 상태를 선택하고 QR 스캔을 시작하는 화면입니다.' + overview.spec.overview.slice(originalOverview.length));
  } catch (error) {
   console.error('PRE-03 디스크립션 재분류 실패:', error.message);
  } finally {
   saving = false;
  }
 }
 window.addEventListener('collaboration-updated', redistributeOverview);
 window.addEventListener('hashchange', redistributeOverview);
 redistributeOverview();
})();
