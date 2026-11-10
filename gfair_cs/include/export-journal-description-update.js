(() => {
  'use strict';

  // Run only during the authenticated editorial pass.
  if (new URLSearchParams(location.search).get('descriptionUpdate') !== 'export-journal-20261110') return;

  const lines = (...items) => items.filter(Boolean).join('\n');
  const add = (value, addition) => value?.includes(addition) ? value : lines(value, addition);
  const listEdits = {
    '태그 검색': s => ({
      detail: '태그 드롭다운에서 조회 가능한 상담일지에 등록된 태그를 여러 개 선택한다.',
      exception: '태그 옵션 검색 결과가 없으면 ‘검색 결과가 없습니다.’를 표시한다.'
    }),
    '상담일지 목록·처리 상태': s => ({
      type: '기타',
      defaultValue: '해외 바이어 / 국가 / 참가기업 / 부스번호 / 통역원(관리자·수출상담 운영용역사) / 업데이트 일시 / 제출 일시 / 처리 상태',
      detail: '- 조회 권한과 검색 조건에 해당하는 수출상담일지를 목록으로 표시한다.\n- 해외 바이어명을 클릭하면 해당 일지의 상세 화면으로 이동한다.',
      dataSource: '수출상담일지 등록(JNL-05) 및 상세(JNL-16)에서 저장한 수출상담일지와 처리 상태.',
      exception: '조회 결과가 없으면 ‘해당 조건의 상담일지가 없습니다.’를 표시한다.'
    }),
    '일괄 처리 대상 선택': s => ({
      detail: '- 행의 체크박스로 일괄 처리 대상을 선택한다.\n- 헤더 체크박스로 현재 페이지에서 처리 가능한 행을 모두 선택하거나 해제한다.',
      policy: '- 전체 선택에서 비활성 행은 제외한다.\n- 일부 행만 선택하면 헤더 체크박스에 일부 선택 상태([-])를 표시한다.\n- 페이지를 이동하거나 검색하면 선택을 해제한다.'
    }),
    '일괄 승인': s => ({detail:'선택한 승인 요청 상담일지를 일괄 승인한다.'}),
    '일괄 반려': s => ({detail:'선택한 승인 요청 상담일지를 공통 사유로 일괄 반려한다.'}),
    '일괄 승인 요청': s => ({detail:'선택한 본인 상담일지를 일괄 제출하거나 반려된 일지의 승인을 다시 요청한다.'})
  };
  const formEdits = {
    '통역원 · 상담 일시': (s, detail) => ({
      detail: detail
        ? '일지에 저장된 통역원과 상담 시작·종료 일시를 표시한다.'
        : '현재 행사 기준으로 통역원을 지정하고, 캘린더에서 상담 시작·종료 일시를 입력한다.',
      policy: detail ? s.policy : add(s.policy, '- 상담 일시는 직접 입력하며 QR 스캔으로 자동 입력하지 않는다.')
    }),
    '상담기업 · 기업명과 연계 정보': s => ({
      detail: '- 기업명을 단일 선택 드롭다운으로 선택한다. 검색창에서 기업명·부스번호를 검색한다.\n- 기업명 아래에 부스번호·메인 카테고리, 담당자·담당자 연락처, 셀러 명함을 순서대로 표시한다.\n- [부스 QR 스캔]을 누르면 참가기업 부스 QR 카메라를 연다.',
      dataSource: s.dataSource || '행사정보 > 참가기업(BAS-09)에 등록된 기업·부스 정보.',
      policy: add(s.policy, '- 메인 카테고리는 참가기업에 등록된 값을 중복 없이 /로 구분해 표시한다.')
    }),
    '셀러 명함 첨부': (s, detail) => ({
      detail: detail
        ? '첨부된 셀러 명함을 표시한다. 편집할 수 있는 경우 직접 촬영하거나 이미지 파일을 선택해 첨부·변경한다.'
        : '직접 촬영하거나 기기에 저장된 이미지 파일을 선택해 셀러 명함을 첨부한다.'
    }),
    '해외 바이어 · 바이어 선택': s => ({
      detail: '- 해외 바이어를 단일 선택 드롭다운에서 선택한다. 검색창에서 등록된 바이어를 검색한다.\n- 선택한 바이어의 국가·기업명·연락처를 표시한다.'
    }),
    '수출 상담액·계약 추진액': s => {
      const help = s.detail.split('\n').filter(line => /「/.test(line));
      return {
        detail: s.detail.split('\n').filter(line => !/「/.test(line)).join('\n'),
        policy: help.reduce((policy, line) => add(policy, line), s.policy)
      };
    },
    '주요 상담내용 · 상담 제품 및 상담 상세': s => {
      const line = s.detail.split('\n').find(value => value.includes('상담 상세 플레이스홀더:'));
      return line ? {
        detail: s.detail.split('\n').filter(value => value !== line).join('\n'),
        placeholder: line.split('상담 상세 플레이스홀더: ')[1]
      } : {};
    },
    '이력관리': s => ({
      type: '기타',
      defaultValue: '발생 일시 / 이력 항목 / 변경 내용 / 일지 상태 / 사유',
      detail: s.detail.replace('(수정) 발생 일시·이력 항목·변경 내용·일지 상태·사유를 표로 조회한다.', '수출상담일지의 처리 이력을 목록으로 표시한다.')
    }),
    '이전 반려 사유 보기': s => ({
      detail: '이전 검수에서 전달받은 반려 사유를 펼치거나 접어 조회한다.',
      policy: add(s.policy, '- 제목은 왼쪽에, 펼침·접힘 화살표는 오른쪽 끝에 표시한다.')
    })
  };

  let saving = false;
  async function apply() {
    const screen = location.hash.slice(1);
    if (!['JNL-14', 'JNL-05', 'JNL-16'].includes(screen)) return;
    const store = window.GFAIR_COLLAB;
    const changes = window.GFAIR_DESCRIPTION_CHANGES;
    if (saving || !store?.loaded || !store.user?.editor || !changes) return;
    saving = true;
    try {
      for (const record of [...store.records]) {
        if (location.hash !== '#' + screen) break;
        const previous = JSON.parse(record.text);
        if (previous.format !== 'description-spec-v1') continue;
        const update = (screen === 'JNL-14' ? listEdits : formEdits)[previous.item];
        if (!update) continue;
        const patch = update(previous, screen === 'JNL-16');
        if (!Object.keys(patch).some(key => patch[key] !== previous[key])) continue;
        const note = '[변경사항 있음 · 2026-11-10] 기본정보관리·행사정보 기준에 맞춰 디스크립션 형식을 정리.';
        const next = {...previous, ...patch, planningNote:add(previous.planningNote, note)};
        await store.mutate('update', {
          id: record.id,
          revision: record.revision,
          text: JSON.stringify(changes.markAgentChanges(previous, next))
        });
      }
    } catch (error) {
      console.error('수출상담일지 디스크립션 업데이트 실패:', error);
    } finally {
      saving = false;
    }
  }

  window.addEventListener('collaboration-updated', apply);
  apply();
})();
