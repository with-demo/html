// 화면 선택과 화면검색이 공유하는 현재 메뉴 기준 목록.
(()=>{
 function build(){
 const screens=new Map(GFAIR_SCREENS.flatMap(g=>g.screens).map(s=>[s.id,s]));
 const children={
  'COM-07':['COM-08'],'BAS-01':['BAS-02'],'BAS-15':['BAS-17','BAS-19'],
  'BAS-03':['BAS-04'],'BAS-05':['BAS-06'],'BAS-07':['BAS-08'],'BAS-16':['BAS-18'],
  'BAS-09':['BAS-10'],'PRE-01':['PRE-02'],'EVT-01':['EVT-03'],'EVT-02':['EVT-04'],
  'JNL-13':['JNL-04','JNL-15'],'JNL-14':['JNL-05','JNL-16'],
  'NTC-01':['NTC-04'],'SET-01':['SET-02'],'SET-07':['SET-05','SET-06'],
  'SET-16':['SET-14','SET-15']
 };
 const titles={
  'BAS-02':'행사관리 상세','BAS-04':'해외 바이어 관리 상세','BAS-06':'국내 바이어 관리 상세','BAS-08':'통역원 관리 상세',
  'BAS-10':'참가기업 상세','COM-08':'담당자 등록·상세','PRE-02':'해외 바이어 상세',
  'JNL-15':'구매상담일지 상세','JNL-16':'수출상담일지 상세'
 };
 const registry=window.GFAIR_SCREEN_REGISTRY||[],used=new Set();
 const menuTitles=new Map(GFAIR_MENU.flatMap(g=>g.items.flatMap(i=>[i,...i[2]])).map(i=>[i[0],i[1]]));
 function make(name,key,items){
  const group={name,key,screens:[]};
  function add(id,title){
   if(['PRE-01-p39','EVT-01-p39','EVT-02-p39'].includes(id)||id==='JNL-14-p01'||used.has(id)||!screens.has(id))return;
   used.add(id);const source=screens.get(id);
   group.screens.push({...source,title:title||menuTitles.get(id)||window.GFAIR_WORKFLOW?.entry(id)?.title||titles[id]||source.title});
   for(const child of children[id]||[])add(child);
   for(const child of registry.filter(s=>s.parent===id)){
    // 비노출 업로드와 이전 설문관리 진입점은 목록에서 제외한다.
    if(child.id==='JNL-14-p01')continue;
    add(child.id);
   }
   for(const child of screens.values())if((child.workflowParent||child.parent)===id)add(child.id);
  }
  for(const [id,title] of items)add(id,title);
  return group;
 }
 const groups=[make('공통','common',[['COM-01','로그인'],['COM-06','내정보'],['NTC-07','알림']])];
 for(const [index,menu] of GFAIR_MENU.entries()){
  if(['로그인','알림'].includes(menu.name))continue;
  groups.push(make(menu.name,'menu-'+index,menu.items.flatMap(i=>[i,...i[2]])));
 }
 return window.GFAIR_SCREEN_CATALOG=groups.filter(g=>g.screens.length);
 }
 window.GFAIR_BUILD_SCREEN_CATALOG=build;build();
})();
