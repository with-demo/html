const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const source=p=>fs.readFileSync(require.resolve(p),'utf8');
function context(){const ctx={};ctx.window=ctx;vm.runInNewContext(source('../data/navigation.js'),ctx);vm.runInNewContext(source('../data/menu-permission-reference.js'),ctx);return ctx;}
test('사이트맵의 메뉴별 O·△는 허용, X는 미허용',()=>{
 const ctx=context();for(const menu of ctx.GFAIR_NAV.entries()){const reference=ctx.GFAIR_PERMISSION_REFERENCE[menu[0]==='SET-03'?'STE-03':menu[0]];if(!reference)continue;for(const [role,value] of Object.entries(reference))assert.equal(ctx.GFAIR_NAV.allowed(menu,role),/^[O△]/.test(value),menu[0]+' '+role);}
 const scope=id=>ctx.GFAIR_NAV.visible(id).flatMap(g=>g.items.flatMap(i=>i[2].length?i[2]:[i])).map(i=>i[0]);
 assert(scope('buyOperator').includes('EVT-01'));assert(!scope('buyOperator').includes('EVT-02'));assert(scope('exportOperator').includes('PRE-04'));assert(!scope('buyer').includes('MON-01'));assert(!scope('interpreter').includes('EVT-02'));
});
test('그룹 기본정보 편집과 메뉴권한 폼 분리',()=>{
 const handlers={},dialog={classList:{add(){},remove(){}},setAttribute(){},addEventListener(){},showModal(){},dataset:{}},host={innerHTML:''},ctx=context();Object.assign(ctx,{document:{getElementById:id=>id==='role-picker'?{value:'admin'}:id==='dialog'?dialog:id==='dialog-content'?host:null,addEventListener:(k,f)=>handlers[k]=f,querySelector:()=>null},location:{hash:'#SET-02',search:'?groupMode=create'},URLSearchParams,Date,Intl,Set,Map,Event:class{},addEventListener(){},dispatchEvent(){}});
 vm.runInNewContext(source('../include/group-access.js'),ctx);const html=ctx.GFAIR_GROUP_ACCESS.render();assert(html.includes('name="name"'));assert(html.includes('name="active"'));assert(!html.includes('name="menus"'));
 handlers.click({target:{closest:s=>s==='[data-group-action]'?{dataset:{groupAction:'permissions',id:'buyOperator'}}:null},preventDefault(){},stopImmediatePropagation(){}});
 assert(host.innerHTML.includes('data-group-form="permissions"'));assert(host.innerHTML.includes('name="menus"'));assert(!host.innerHTML.includes('name="name"'));assert(!host.innerHTML.includes('name="active"'));assert.equal(dialog.dataset.screenId,'SET-01-p13');assert(host.innerHTML.includes('value="SET-07"'));assert(!host.innerHTML.includes('value="SET-05"'));assert(!host.innerHTML.includes('value="SET-06"'));assert(/value="SET-07"[^>]*disabled/.test(host.innerHTML));
});
test('HWP v3 설문 2개만 제공, 최대 선택·조건부 문항 및 원문 미확정 항목 유지',()=>{
 const ctx={window:{}};vm.runInNewContext(source('../data/survey-examples.js'),ctx);const [domestic,overseas]=ctx.window.GFAIR_SURVEY_EXAMPLES;assert.equal(ctx.window.GFAIR_SURVEY_EXAMPLES.length,2);assert.equal(domestic.groups.flatMap(g=>g.questions).length,32);assert.equal(overseas.groups.flatMap(g=>g.questions).length,29);
 assert.equal(domestic.groups.flatMap(g=>g.questions).filter(q=>q.maxSelections===2).length,3);assert.equal(domestic.groups.flatMap(g=>g.questions).filter(q=>q.visibleWhen).length,2);assert.equal(overseas.groups.flatMap(g=>g.questions).filter(q=>q.visibleWhen).length,1);assert(overseas.groups[4].questions.some(q=>q.reviewNote&&q.title.includes('To be determined')));
 for(const survey of [domestic,overseas]){assert.equal(survey.responses.length,0);for(const [gi,g] of survey.groups.entries())for(const [qi,q]of g.questions.entries()){if(q.maxSelections)assert(q.maxSelections<=q.options.length);if(q.visibleWhen){const [gIndex,qIndex]=q.visibleWhen.question.split('-').map(Number);assert(gIndex<gi||gIndex===gi&&qIndex<qi);assert(survey.groups[gIndex].questions[qIndex].options[Number(q.visibleWhen.option)]);}}}
});
