const test=require('node:test'),assert=require('node:assert/strict'),{headers,validate}=require('../include/people-excel.js');
const valid=['검증담당자','TEST-NEW','운영팀','Demo1234','Demo1234','031-000-0000','010-0000-0000','test@example.com','사용'];
test('정상 행과 기존·파일 내 중복 ID를 구분한다',()=>{assert.equal(validate([headers,valid],[]).good.length,1);assert.equal(validate([headers,valid],['TEST-NEW']).errors.length,1);assert.equal(validate([headers,valid,valid],[]).errors.length,1);});
test('필수값·비밀번호·연락처·이메일·사용여부 오류가 반영되지 않는다',()=>{for(const [index,value] of [[0,''],[3,'bad'],[4,'Other123'],[5,'bad'],[6,'010-1-2'],[7,'bad'],[8,'알수없음']]){const row=[...valid];row[index]=value;const result=validate([headers,row],[]);assert.equal(result.good.length,0);assert.equal(result.errors.length,1);}});
test('헤더 오류와 빈 파일을 차단한다',()=>{assert.throws(()=>validate([['아이디'],valid],[]));assert.throws(()=>validate([headers],[]));});
