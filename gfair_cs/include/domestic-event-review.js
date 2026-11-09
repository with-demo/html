// 등록 즉시 참가·계정/QR 사용. 제외 후 재등록 시 같은 행사 발급 정보를 재사용한다.
(()=>{'use strict';
 const E=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const controllers=new Map();
 window.GFAIR_DOMESTIC_REVIEW={
  lockedRows:()=>null,
  isFinalized:()=>false,
  isReady:(route,year)=>controllers.get(route)?.ready(year)||false,
  eventView:(row,route='EVT-01')=>controllers.get(route)?.view(row),
  create(ctx,base,kind='domestic'){
   const cfg=kind==='overseas'?{route:'PRE-01',source:'BAS-03',profile:'BAS-04',role:'exportOperator',prefix:'F',title:'해외바이어',yearIndex:4,foreign:true}:kind==='interpreter'?{route:'EVT-02',source:'BAS-07',profile:'BAS-08',role:'exportOperator',prefix:'I',title:'통역원',yearIndex:3,interpreter:true}:{route:'EVT-01',source:'BAS-05',profile:'BAS-06',role:'buyOperator',prefix:'K',title:'국내바이어',yearIndex:3};
   const source=()=>ctx.source(cfg.source),api=()=>window.GFAIR_OVERSEAS_BUYER_DETAIL,participation=()=>window.GFAIR_PARTICIPATION;
   const operator=()=>ctx.role()===cfg.role,canImport=()=>operator()||ctx.role()==='admin',canExclude=()=>operator()||ctx.role()==='admin',active=()=>location.hash==='#'+cfg.route;
   const people=(year=ctx.year())=>source().rows.filter(row=>participation().participating(cfg.source,row,year));
   const view=row=>{const current=source();if(participation().participating(cfg.source,row,ctx.year()))api().syncParticipation(row,current.rows,cfg.profile,ctx.year(),true);return api().eventView(row,current.rows,cfg.profile,ctx.year());};
   controllers.set(cfg.route,{ready:year=>people(year).length>0,view});
   const button=(action,label,disabled=false)=>'<button type="button" class="btn" data-domestic-action="'+action+'"'+(disabled?' disabled':'')+'>'+label+'</button>';
   const selected=()=>[...document.querySelectorAll('[data-'+(cfg.foreign?'pre01':'event')+'-check]:checked')].map(n=>cfg.foreign?n.dataset.pre01Check:n.dataset.eventCheck);
   function notice(){return ''; }
   function render(route){
    if(route!==cfg.route)return base.list(route);
    const current=source();for(const row of people())api().syncParticipation(row,current.rows,cfg.profile,ctx.year(),true);
    let html=base.list(route);
    html=html.replace(/<td><button[^>]*data-event-action="issue-one"[^>]*>[\s\S]*?<\/button><\/td>/g,'');
    html=html.replace(/<button[^>]*data-event-action="(?:issue|issue-one|exclude)"[^>]*>[\s\S]*?<\/button>/g,'').replace('<th scope="col">계정발급</th>','');
    html=html.replace('<th scope="col">소속기업</th>','<th scope="col">기업</th>').replace('<th scope="col">QR발급</th>','<th scope="col">QR</th>').replace(cfg.interpreter?'colspan="8"':'colspan="7"',cfg.interpreter?'colspan="7"':'colspan="6"').replaceAll('선택 엑셀 다운로드','엑셀 다운로드').replaceAll('QR발급','QR보기');
    if(cfg.foreign){
     html=html.replace(/<button[^>]*data-pre01-action="exclude"[^>]*>[\s\S]*?<\/button>/g,'');
     html=html.replace('<div class="row event-participant-tools">','<div class="row event-participant-tools">'+(canImport()?button('add',cfg.interpreter?'통역원 일괄 업로드':'바이어 일괄 업로드'):''));
     html=html.replace('<span data-pre01-bulk-extra></span>',canExclude()?button('exclude','선택 바이어 제외'):'');
     return html;
    }
    html=html.replace('<div class="row event-participant-tools">','<div class="row event-participant-tools">'+(canImport()?button('add',cfg.interpreter?'통역원 일괄 업로드':'바이어 일괄 업로드'):''));
    const qrTools=(html.match(/<button[^>]*data-event-action="(?:qr-download|qr-all)"[^>]*>[\s\S]*?<\/button>/g)||[]).join('');html=html.replace(/<button[^>]*data-event-action="(?:qr-download|qr-all)"[^>]*>[\s\S]*?<\/button>/g,'');
    const strip='<div class="pre01-bulk-toolbar event-bulk-toolbar" aria-label="선택 참가자 작업"><strong>선택 <span data-event-selected-count>0</span>명</strong>'+(canExclude()?button('exclude',cfg.interpreter?'선택 통역원 제외':'선택 바이어 제외',true):'')+(cfg.interpreter&&operator()?'<button type="button" class="btn" data-event-action="reserve-y" disabled>예비인력 지정</button><button type="button" class="btn" data-event-action="reserve-n" disabled>예비인력 해제</button>':'')+'<div class="participant-qr-tools">'+qrTools+'</div></div>';
    return notice()+html.replace('<div class="tablewrap">',strip+'<div class="tablewrap">');
   }
   document.addEventListener('click',ev=>{
    const b=ev.target.closest('[data-domestic-action]');if(!b||!active())return;ev.preventDefault();ev.stopImmediatePropagation();
    try{if(b.dataset.domesticAction==='add'){if(!canImport())return;window.GFAIR_EVENT_MEMBER_UPLOAD.open(cfg,{modal(title,body){ctx.modal(title,body,'close','확인',cfg.route+'-p01');document.querySelector('#dialog-content > .dialogactions')?.remove();},source,year:ctx.year,canUse:()=>canImport()&&active(),setRows:ctx.setRows,invalidate(){},refresh:ctx.refresh});}
     else if(b.dataset.domesticAction==='exclude'){if(!canExclude())return;const keys=new Set(selected()),rows=people().filter(r=>keys.has(r[0]));if(!rows.length)return ctx.toast('제외할 대상을 선택해 주세요.');if(!participation().confirmExclude(rows.map(r=>r[1])))return;for(const row of rows)participation().set(cfg.source,row,ctx.year(),false);ctx.refresh();}
    }catch(error){ctx.toast(error.message||'처리에 실패했습니다.');}
   },true);
   return {list:render,detail:base.detail,notice};
  }
 };
})();
