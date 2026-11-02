(()=>{
 const modal=document.getElementById('dialog');if(!modal)return;
 const returnViews=new Map();
 const entries=new Map(),nativeShow=modal.showModal.bind(modal),nativeClose=modal.close.bind(modal);
 const route=()=>decodeURIComponent(location.hash.slice(1))||document.body.dataset.screen;
 const key=text=>{let hash=0;for(const char of text)hash=(Math.imul(hash,31)+char.charCodeAt(0))>>>0;return hash.toString(36).toUpperCase();};
 const definitions=()=>window.GFAIR_SCREEN_REGISTRY||[];
 const definition=(parent,title)=>definitions().find(d=>d.kind==='workflow'&&(d.parent===parent||d.parent===(definitions().find(d=>d.id===parent)?.source))&&(d.contains?title.includes(d.match):title===d.match))||definitions().find(d=>d.kind==='workflow'&&d.match!=='상세 정보'&&(d.contains?title.includes(d.match):title===d.match));
 const storage='gfair.workflow.pages.'+(document.body.dataset.project||'gfair_cs');
 // 과거 행사 상세에서 생성된 빈 임시 화면은 정식 BAS-02로 복구한다.
 const obsoleteEventDetail=e=>e.id==='BAS-2762908039'||e.parent==='BAS-02'&&e.title==='상세 정보';
 if(route()==='BAS-2762908039')history.replaceState(null,'',location.pathname+location.search+'#BAS-02');
 try{const saved=JSON.parse(sessionStorage.getItem(storage)||'[]');const kept=saved.filter(e=>!obsoleteEventDetail(e));if(saved.length!==kept.length)sessionStorage.setItem(storage,JSON.stringify(kept));}catch{}
 const save=()=>{try{sessionStorage.setItem(storage,JSON.stringify([...entries].map(([id,e])=>({id,parent:e.parent,title:e.title,html:e.node.innerHTML,...(e.returnView?{returnView:e.returnView}:{})}))));}catch{}};
 const register=entry=>{const groups=window.GFAIR_SCREENS||[];if(!groups.flatMap(g=>g.screens).some(s=>s.id===entry.id)){const owner=groups.find(g=>g.screens.some(s=>s.id===entry.parent))||groups[0];owner?.screens.push({id:entry.id,title:entry.title,kind:'workflow',summary:entry.title+'의 내용을 확인하거나 입력하고 저장합니다.',ui:{}});const picker=document.querySelector('.ui-spec-screen-picker');if(picker&&!Array.from(picker.options).some(o=>o.value===entry.id)){const option=document.createElement('option');option.value=entry.id;option.textContent=entry.id+' : '+entry.title;picker.append(option);}}};
 try{for(const e of JSON.parse(sessionStorage.getItem(storage)||'[]')){if(/^COM-0[2345](?:$|-)/.test(e.id)||/^COM-0[2345]$/.test(e.parent))continue;if(['SET-11','SET-12'].includes(e.id))continue;if(e.id==='SET-08'||e.title==='그룹 등록'||e.id==='SET-13'||e.title==='설문 미리보기')continue;if(e.id==='SET-15')e.parent='SET-16';const canonical=definition(e.parent,e.title);if(canonical){if(route()===e.id&&e.id!==canonical.id)history.replaceState(null,'',location.pathname+location.search+'#'+canonical.id);e.id=canonical.id;}const node=document.createElement('section');node.className='panel workflow-page-body';node.innerHTML=e.html;entries.set(e.id,{...e,node});register(e);}}catch{}
 window.GFAIR_WORKFLOW={rememberReturn:(id,button)=>returnViews.set(id,{parent:route(),x:window.scrollX,y:window.scrollY,group:button?.dataset.group,question:button?.dataset.question}),entry:id=>entries.get(id),parent:()=>entries.get(route())?.parent||route(),back:()=>{if(route()==='SET-15'){location.hash='SET-16';return;}const e=entries.get(route());if(e)location.hash=e.parent;}};
 modal.showModal=function(){
  if(modal.dataset.presentation==='popup')return nativeShow();
  const host=document.getElementById('dialog-content'),title=(host.querySelector('h2,h3')?.textContent||'').trim();
  const action=/삭제|승인|반려|발송|호출|재발급|발급|출석|출결|보정|상태 변경|처리|업로드|첨부|촬영|긴급|로그아웃|인증|검증|확인하시|저장하시|바이어 제외|통역원 제외/.test(title);
  const page=!action;
  if(!page)return nativeShow();
  const parent=title==='주관식 응답'?'SET-16':entries.get(route())?.parent||route(),matched=definition(parent,title),id=matched?.id||parent.split('-')[0]+'-'+(100000+parseInt(key(parent+'|'+title),36)),node=document.createElement('section');node.className='panel workflow-page-body';
  host.querySelectorAll('.dialogactions [data-action]').forEach(button=>{button.dataset.workflowLegacy='';});while(host.firstChild)node.append(host.firstChild);
  node.querySelectorAll('.dialoghead,.group-access-heading').forEach(head=>head.remove());if(node.querySelector('form'))node.querySelector(':scope>.dialogactions')?.remove();
  const back=document.createElement('a');back.className='btn';back.href='#'+parent;back.textContent='목록으로';const nav=document.createElement('div');nav.className='workflow-page-nav';nav.append(back);node.prepend(nav);
  const entry={id,parent,title:matched?.title||title,node,...(returnViews.has(id)?{returnView:returnViews.get(id)}:{})};returnViews.delete(id);entries.set(id,entry);register(entry);save();location.hash=id;
 };

 // 주관식 응답에서 돌아올 때 조회 조건은 앱 상태를 유지하고 진입 당시 위치를 복원한다.
 let previousRoute=route();
 window.addEventListener('hashchange',()=>{const previous=previousRoute;previousRoute=route();const view=entries.get(previous)?.returnView;if(previous!=='SET-15'||!view||view.parent!==route())return;requestAnimationFrame(()=>requestAnimationFrame(()=>{if(route()!==view.parent)return;const trigger=[...document.querySelectorAll('[data-action="sur-text-results"]')].find(b=>b.dataset.group===view.group&&b.dataset.question===view.question);trigger?.focus({preventScroll:true});window.scrollTo(view.x,view.y);}));});
 document.addEventListener('click',event=>{const button=event.target.closest('[data-workflow-return]');if(!button||route()!=='SET-15')return;event.preventDefault();window.GFAIR_WORKFLOW.back();});

 modal.close=function(...args){if(!modal.open&&entries.has(route())){window.GFAIR_WORKFLOW.back();return;}return nativeClose(...args);};
})();
