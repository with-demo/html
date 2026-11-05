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
