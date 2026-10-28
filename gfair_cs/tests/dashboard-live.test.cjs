const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
test('연결·끊김·재연결 상태 및 갱신 요청',()=>{
 const events={},clicks={},tasks=[],labels=[],navigator={onLine:true},node={dataset:{},querySelector:()=>({set textContent(v){labels.push(v)}})},sent=[];
 const context={navigator,location:{hash:'#MON-08'},document:{querySelectorAll:()=>[node],addEventListener:(k,f)=>clicks[k]=f},window:{addEventListener:(k,f)=>events[k]=f,dispatchEvent:e=>sent.push(e)},setTimeout:f=>{tasks.push(f);return tasks.length;},clearTimeout(){},CustomEvent:class{constructor(type,data){this.type=type;this.detail=data.detail;}}};
 vm.runInNewContext(fs.readFileSync(require.resolve('../include/dashboard-live.js'),'utf8'),context);const api=context.window.GFAIR_DASHBOARD_LIVE;assert.equal(api.state,'connected');assert(api.markup('MON-01').includes('aria-label="실시간 업데이트"'));assert(!api.markup('MON-01').includes('<time'));
 navigator.onLine=false;events.offline();assert.equal(api.state,'disconnected');assert.equal(labels.at(-1),'연결 끊어짐');
 navigator.onLine=true;events.online();assert.equal(api.state,'reconnecting');assert.equal(labels.at(-1),'재연결 중...');tasks.at(-1)();assert.equal(api.state,'connected');assert.equal(sent.at(-1).detail.screen,'MON-08');
 navigator.onLine=false;api.retry('MON-08');tasks.at(-1)();assert.equal(api.state,'disconnected');
});
function attendance(){
 const handlers={},ctx={window:{GFAIR_SCREENS:[{screens:[{id:'BAS-05',ui:{rows:[['K1','김민준','한빛리테일']]}},{id:'BAS-03',ui:{rows:[['F1','Emily Carter','GB']]}},{id:'BAS-07',ui:{rows:[['I1','박서연','en / ja']]}}]}],GFAIR_COUNTRY_CODES:[{code:'GB',name:'영국'}],GFAIR_LANGUAGE_CODES:[{code:'en',name:'영어'},{code:'ja',name:'일본어'}],GFAIR_DASHBOARD_LIVE:{state:'connected',markup:()=>'<span>연결됨</span>'},addEventListener(){},dispatchEvent(){}},document:{currentScript:{src:'https://example.com/include/attendance-dashboard.js'},createElement:()=>({}),head:{append(){}},addEventListener:(k,f)=>handlers[k]=f,querySelector:()=>null},navigator:{onLine:true},URL,Intl,Date,Map,Set,setInterval(){},Event:class{}};
 vm.runInNewContext(fs.readFileSync(require.resolve('../include/attendance-dashboard.js'),'utf8'),ctx);return{api:ctx.window.GFAIR_ATTENDANCE,handlers};
}
test('출결 유형별 항목과 실제처럼 보이는 예시 명칭',()=>{
 const {api}=attendance(),html=api.render('admin','2026'),domestic=html.split('data-attendance-group="domestic"')[1].split('</section>')[0],overseas=html.split('data-attendance-group="overseas"')[1].split('</section>')[0],interpreter=html.split('data-attendance-group="interpreter"')[1].split('</section>')[0];
 assert(domestic.includes('소속'));assert(domestic.includes('출석일시'));assert(domestic.includes('김민준'));assert(domestic.includes('한빛리테일'));
 assert(overseas.includes('국가'));assert(overseas.includes('영국'));assert(overseas.includes('Emily Carter'));assert(!overseas.includes('소속 검색'));
 assert(interpreter.includes('<th scope="col">출석일시</th>'));assert(!interpreter.includes('<th scope="col">언어</th>'));assert(!interpreter.includes('<td>영어 / 일본어</td>'));assert(interpreter.includes('<time'));assert(!html.includes('data-attendance-status'));
 assert(!html.includes('국내바이어 01'));assert(!html.includes('해외바이어 01'));assert(!html.includes('data-attendance-last'));
});
test('기존 역할 범위 유지',()=>{const {api}=attendance(),buy=api.render('buyOperator','2026'),exp=api.render('exportOperator','2026');assert(buy.includes('data-attendance-group="domestic"'));assert(!buy.includes('data-attendance-group="overseas"'));assert(!exp.includes('data-attendance-group="domestic"'));assert(exp.includes('data-attendance-group="interpreter"'));});
