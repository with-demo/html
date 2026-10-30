// 2026-10-29: 기존 Description 메시지 정의 백업 후 초기화. 실제 화면 동작은 유지.
window.GFAIR_MESSAGE_SPECS=[];
window.GFAIR_MESSAGE_AUTODETECT=false;

GFAIR_MESSAGE_SPECS.push(
{key:'com06-password-format',screens:['COM-06'],title:'새 비밀번호 형식 오류',type:'인라인 오류',trigger:'영문·숫자 포함 8~20자리, 공백 없는 입력 조건에 맞지 않을 때',message:'영문·숫자 포함 8~20자리로 입력해 주세요. (특수문자 사용 가능, 공백 불가)',confirm:'저장 중단 후 새 비밀번호에 포커스',source:'include/my-info.js'},
{key:'com06-password-confirm',screens:['COM-06'],title:'새 비밀번호 확인 불일치',type:'브라우저 알럿',trigger:'비밀번호와 비밀번호 확인이 다를 때',message:'비밀번호와 비밀번호 확인이 일치하지 않습니다.',confirm:'저장 중단 후 확인 입력에 포커스',source:'include/my-info.js'},
{key:'com06-password-same',screens:['COM-06'],title:'현재 비밀번호와 동일',type:'인라인 오류',trigger:'현재 입력값과 새 비밀번호가 같을 때',message:'현재 비밀번호와 다른 새 비밀번호를 입력해 주세요.',confirm:'저장 중단 후 새 비밀번호에 포커스',note:'현재 비밀번호의 서버 인증은 목업 미연동',source:'include/my-info.js'},
{key:'ntc07-range',screens:['NTC-07'],title:'수신기간 역전',type:'인라인 오류',trigger:'수신 시작일이 종료일보다 늦을 때',message:'수신 시작일은 종료일보다 늦을 수 없습니다.',confirm:'검색 중단 후 시작일에 포커스',source:'include/account-notifications.js'}
);

GFAIR_MESSAGE_SPECS=GFAIR_MESSAGE_SPECS.filter(r=>r.key!=='com06-password-same');GFAIR_MESSAGE_SPECS.forEach(r=>{if(r.key==='com06-password-format')r.type='브라우저 알럿';});
