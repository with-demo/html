// 관리자 목록의 표시 방식만 통일하고 기존 행·버튼의 이벤트는 유지한다.
(()=>{'use strict';
 const root=document.getElementById('app');if(!root)return;
 const excluded=new Set(['COM-04','COM-05','COM-06','BAS-17','BAS-18','NTC-07']);
 const routes=new Set((window.GFAIR_SCREENS||[]).flatMap(g=>g.screens).filter(s=>s.kind==='list'&&!excluded.has(s.id)).map(s=>s.id));
 ['COM-07','EVT-01','EVT-02','JNL-13','JNL-14','SET-05','SET-07'].forEach(id=>routes.add(id));
 const pre01Pages=new Map();
 const prepared=new WeakSet(),collator=new Intl.Collator('ko',{numeric:true,sensitivity:'base'});
 const clean=el=>{const copy=el.cloneNode(true);copy.querySelectorAll('.ui-spec-badge,[data-list-row-trigger]').forEach(e=>e.remove());return copy.textContent.trim().replace(/\s+/g,' ');};
 function enhance(table,main,route){
  if(prepared.has(table))return;
  const panel=table.closest('section.panel');if(!panel)return;
  prepared.add(table);panel.classList.add('admin-list-panel');
  panel.querySelectorAll('.list-count-summary').forEach(el=>el.remove());
  let header=panel.querySelector(':scope>.panelhead');
  if(!header){header=document.createElement('div');header.className='panelhead';panel.prepend(header);}
  const native=table.classList.contains('notice-list');
  let tools=header.querySelector('.admin-list-tools');
  if(!tools){tools=document.createElement('div');tools.className='admin-list-tools';header.append(tools);}
  // 다운로드는 기존 버튼 노드를 이동하여 원래 동작과 속성을 보존한다.
  [...main.querySelectorAll('.pagehead button,.pagehead a,.management-actions button,.panelhead button,.panelhead a')].filter(el=>!el.closest('table,form')&&/다운로드|내려받기|일괄 업로드|^QR일괄발급$|^CSV$|^PDF$/.test(clean(el))).forEach(el=>tools.append(el));
  const bottom=document.createElement('div');bottom.className='admin-list-actions';panel.after(bottom);
  main.querySelectorAll('.pagehead>.head-actions,.pagehead>button,.pagehead>a.btn,.management-actions').forEach(group=>{
   if(group.matches('.management-actions')){[...group.children].filter(el=>el.matches('button,a')).forEach(el=>bottom.append(el));group.remove();}
   else if(group.matches('button,a')||group.querySelector('button,a'))bottom.append(group);
   else if(group.matches('.head-actions'))group.remove();
  });
  bottom.querySelectorAll('button,a').forEach(el=>{if(/등록$/.test(clean(el))){el.textContent='등록';el.className='btn primary registration';}});
  if(!bottom.children.length)bottom.remove();
  if(native){
   const row=header.querySelector(':scope>.row');if(row)tools.prepend(row);
   return;
  }
  const body=table.tBodies[0];if(!body)return;
  const rows=[...body.rows].filter(row=>row.cells.length>1||row.cells[0]?.colSpan===1&&!row.querySelector('.empty'));
  const title=main.querySelector('h1')?.textContent.trim()||'목록';
  let count=header.querySelector('h2');if(!count){count=document.createElement('h2');header.prepend(count);}
  count.innerHTML='총 <strong>'+rows.length+'</strong>건 · 1/1page';
  [...header.children].filter(el=>el!==count&&el!==tools).forEach(el=>{if(!el.querySelector('button,a,select'))el.hidden=true;});
  const headers=[...table.querySelectorAll('thead tr:last-child>th')].map(clean);
  let index=headers.findIndex(t=>/등록일|작성일|제출 일자|최근 응답|응답일시|발생일|일시|일자|날짜/.test(t));
  if(index<0)index=headers.findIndex(t=>/연도|번호|코드|ID/.test(t));if(index<0)index=0;
  const size=document.createElement('select');size.setAttribute('aria-label',title+' 페이지당 표시 개수');
  [10,30,50].forEach(n=>size.add(new Option(n+'건씩 보기',String(n))));
  tools.prepend(size);
  if(route==='BAS-01'){const sync=header.querySelector('[data-action="event-sync"]');if(sync){sync.className='btn';tools.append(sync);}}
  if(route==='BAS-09'&&['admin','buyOperator','exportOperator'].includes(root.querySelector('#role-picker')?.value)){
   const sync=document.createElement('button');sync.type='button';sync.className='btn';sync.textContent='동기화 하기';sync.dataset.companySync='';sync.addEventListener('click',()=>{const notice=document.getElementById('toast');if(notice){notice.textContent='참가기업 정보를 확인했습니다. 실제 G-FAIR ADMIN 동기화는 시스템 연계 후 제공됩니다.';notice.hidden=false;setTimeout(()=>notice.hidden=true,3500)}});tools.append(sync);
   const selectedQr=document.createElement('button');selectedQr.type='button';selectedQr.className='btn';selectedQr.textContent='선택 QR다운로드';selectedQr.dataset.companyQrSelected='';tools.append(selectedQr);
   const allQr=document.createElement('button');allQr.type='button';allQr.className='btn';allQr.textContent='전체 QR다운로드';allQr.dataset.companyQrAll='';allQr.dataset.companyQrDownload='';tools.append(allQr);
  }
  panel.querySelectorAll(':scope>.tablefoot').forEach(el=>el.hidden=true);
  const pagination=document.createElement('nav');pagination.className='admin-list-pagination';pagination.setAttribute('aria-label',title+' 페이지');panel.append(pagination);
  const stateKey=route==='PRE-01'?panel.dataset.pre01Scope:null,saved=stateKey?pre01Pages.get(stateKey):null;
  if(saved)size.value=String(saved.size);
  let page=saved?.page||1;
  function paint(){
   const prioritize=route==='JNL-14'&&['admin','exportOperator'].includes(root.querySelector('#role-picker')?.value),statusIndex=headers.indexOf('처리 상태'),priority=row=>prioritize&&clean(row.cells[statusIndex]||row)==='승인 요청'?0:1;
   const ordered=rows.map((row,i)=>({row,i,key:clean(row.cells[index]||row)}));
   if(route!=='PRE-01')ordered.sort((a,b)=>priority(a.row)-priority(b.row)||collator.compare(b.key,a.key)||a.i-b.i);
   const perPage=Number(size.value),pages=Math.max(1,Math.ceil(rows.length/perPage));page=Math.min(page,pages);
   if(stateKey)pre01Pages.set(stateKey,{page,size:perPage});
   count.innerHTML='총 <strong>'+rows.length+'</strong>건 · '+page+'/'+pages+'page';
   observer.disconnect();
   ordered.forEach(({row},i)=>{row.classList.toggle('journal-approval-priority',prioritize&&priority(row)===0);row.hidden=i<(page-1)*perPage||i>=page*perPage;body.append(row);});
   pagination.replaceChildren();
   const add=(label,target,disabled=false,current=false)=>{const button=document.createElement('button');button.type='button';button.className='btn';button.textContent=label;button.disabled=disabled;button.setAttribute('aria-label',({'<<':'첫 페이지','<':'이전 페이지','>':'다음 페이지','>>':'마지막 페이지'})[label]||label+' 페이지');if(current)button.setAttribute('aria-current','page');button.addEventListener('click',()=>{page=target;paint();});pagination.append(button);};
   add('<<',1,page===1);add('<',page-1,page===1);
   const start=Math.max(1,Math.min(page-2,pages-4)),numbers=[...new Set([1,...Array.from({length:Math.min(5,pages)},(_,i)=>start+i),pages])].sort((a,b)=>a-b);
   numbers.forEach((n,i)=>{if(i&&n>numbers[i-1]+1){const gap=document.createElement('span');gap.textContent='…';pagination.append(gap);}add(String(n),n,false,n===page);});
   add('>',page+1,page===pages);add('>>',pages,page===pages);
   if(route==='JNL-14')document.dispatchEvent(new Event('jnl14-page-change'));if(route==='PRE-01')document.dispatchEvent(new Event('pre01-page-change'));if(route==='BAS-09')document.dispatchEvent(new Event('company-page-change'));
   observer.observe(root,{childList:true,subtree:true});
  }
  size.addEventListener('change',()=>{page=1;paint();});paint();
 }
 function sync(){
  observer.disconnect();
  try{
   const main=root.querySelector('#content');if(!main)return;
   const route=decodeURIComponent(location.hash.slice(1))||document.body.dataset.screen;
   const currentRole=root.querySelector('#role-picker')?.value;const admin=currentRole==='admin'||route==='BAS-09'||route==='PRE-01'&&['exportOperator','interpreter'].includes(currentRole)||route==='EVT-01'&&currentRole==='buyOperator'||route==='EVT-02'&&currentRole==='exportOperator'||route==='COM-07'&&['buyOperator','exportOperator'].includes(currentRole)||route==='JNL-14'&&['exportOperator','interpreter'].includes(currentRole);main.classList.toggle('admin-list-layout',admin&&routes.has(route));
   if(!admin||!routes.has(route))return;
   // 상세·등록 폼과 대시보드의 집계 표는 목록 대상으로 처리하지 않는다.
   if(main.querySelector('.notice-editor,[data-notice-view="detail"],[data-public-form="save"],#survey-editor,#survey-history-size,[data-management-form="admin-save"]'))return;
   const table=[...main.querySelectorAll('.tablewrap>table')].find(table=>table.closest('section.panel')&&!table.closest('form'));
   if(table)enhance(table,main,route);
  }finally{observer.observe(root,{childList:true,subtree:true});}
 }
 const observer=new MutationObserver(sync);sync();
})();
