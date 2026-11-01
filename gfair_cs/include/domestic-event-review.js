// 국내바이어 참가 명단 검토안. 예시 회원만 사용하며 실제 회원 조회는 서버의 정확 일치 확인으로 연결한다.
(()=>{'use strict';
const E=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])),digits=v=>String(v||'').replace(/\D/g,'');
const controllers=new Map();
window.GFAIR_DOMESTIC_REVIEW={lockedRows:(year,route='EVT-01')=>controllers.get(route)?.lockedRows(year)||null,eventView:(row,route='EVT-01')=>controllers.get(route)?.view(row),isFinalized:(route,year)=>controllers.get(route)?.done(year)||false,create(ctx,base,kind='domestic'){
 const cfg=kind==='overseas'?{route:'PRE-01',source:'BAS-03',profile:'BAS-04',role:'exportOperator',prefix:'F',title:'해외바이어',yearIndex:4,foreign:true}:kind==='interpreter'?{route:'EVT-02',source:'BAS-07',profile:'BAS-08',role:'exportOperator',prefix:'I',title:'통역원',yearIndex:3,interpreter:true}:{route:'EVT-01',source:'BAS-05',profile:'BAS-06',role:'buyOperator',prefix:'K',title:'국내바이어',yearIndex:3};
 const source=()=>ctx.source(cfg.source),api=()=>window.GFAIR_OVERSEAS_BUYER_DETAIL,participation=()=>window.GFAIR_PARTICIPATION;
 const operator=()=>ctx.role()===cfg.role,active=()=>location.hash==='#'+cfg.route;
 let checked=null,confirmed=new Map();
 // 기획 검토용 확정 상태는 현재 페이지 메모리에만 보관한다.
 try{sessionStorage.removeItem('gfair-domestic-finalized-20261101');}catch{}
 const rawView=row=>api().eventView(row,source().rows,cfg.profile,ctx.year());
 const view=row=>{const p=rawView(row);return confirmed.has(String(ctx.year()))?p:{...p,accountId:'',accountPw:''};};

 const lockedRows=year=>confirmed.get(String(year))?.rows.map(r=>r.slice())||null;
 controllers.set(cfg.route,{view,lockedRows,done:year=>confirmed.has(String(year))});
 const people=()=>lockedRows(ctx.year())||source().rows.filter(r=>participation().participating(cfg.source,r,ctx.year()));
 const signature=()=>people().map(r=>r[0]).sort().join('|');
 const done=()=>confirmed.has(String(ctx.year()));
 const button=(action,text,primary=false,disabled=false)=>'<button type="button" class="btn'+(primary?' primary':'')+'" data-domestic-action="'+action+'"'+(disabled?' disabled':'')+'>'+text+'</button>';
 const selected=()=>[...document.querySelectorAll('[data-'+(cfg.foreign?'pre01':'event')+'-check]:checked')].map(n=>cfg.foreign?n.dataset.pre01Check:n.dataset.eventCheck);
 function invalidate(){confirmed.delete(String(ctx.year()));}
 function modal(title,body){ctx.modal(title,body,'close','확인',cfg.route+'-p39');document.querySelector('#dialog-content > .dialogactions')?.remove();}
 function addDialog(){window.GFAIR_EVENT_MEMBER_UPLOAD.open(cfg,{modal,source,year:ctx.year,canUse:()=>operator()&&!done()&&active(),setRows:ctx.setRows,invalidate,refresh:ctx.refresh});}
 function notice(){if(ctx.role()==='admin')return '';const count=people().length,finalized=done();return '<section class="panel domestic-review-notice"><div class="domestic-review-notice-head"><strong>참가 대상 검토 안내</strong><div class="domestic-status">'+(operator()?button('finalize',finalized?'최종확정 완료':'최종확정',true,!count||finalized):'')+'</div></div><p>참가할 '+(cfg.interpreter?'통역원':'바이어')+'를 검토한 후 [최종확정]을 누르면 '+(cfg.foreign?'QR코드가 생성됩니다.':'계정과 QR코드가 생성됩니다.')+'<br>참가확정 이후에는 참가자 항목을 변경할 수 없으니, 명단을 최종 확인한 후 확정해 주세요.'+(cfg.foreign?'<br><br>※ 참가확정이후 방한상태를 관리할 수 있습니다.':'')+'</p></section>';}
 function render(route){const html=base.list(route);if(route!==cfg.route)return html;const finalized=done(),flow=notice();
  let list=html.replace(/<button type="button" class="btn" data-event-action="issue">.*?<\/button>/,'').replace(/<button type="button" class="btn" data-event-action="exclude">.*?<\/button>/,'');
  list=list.replace('<th scope="col">계정발급</th>','').replace(/<td><button type="button" class="btn" data-event-action="issue-one"[^>]*>계정발급<\/button><\/td>/g,'').replace('<th scope="col">소속기업</th>','<th scope="col">기업</th>').replace('<th scope="col">발급 ID</th>','<th scope="col">'+(cfg.interpreter?'발급 ID':'발급ID')+'</th>').replace('<th scope="col">QR발급</th>','<th scope="col">QR</th>').replace('colspan="6"','colspan="5"').replace('선택 엑셀 다운로드','엑셀 다운로드');
  list=list.replace(/(data-event-action="qr"[^>]*>)(QR발급)(<\/button>)/g,'$1QR보기$3').replace(/aria-label="([^"]*) QR발급"/g,'aria-label="$1 QR보기"');
  if(!finalized)list=list.replace(/<button[^>]*data-event-action="qr"[^>]*>[\s\S]*?<\/button>/g,'미발급').replace(/<button[^>]*data-event-action="(?:qr-download|qr-all)"[^>]*>[\s\S]*?<\/button>/g,'');
  const edits=operator()&&!finalized?'<div class="domestic-list-edits">'+button('exclude',cfg.interpreter?'선택 통역원 제외':'선택 바이어 제외',false,finalized)+button('add',cfg.interpreter?'통역원 추가':'바이어 추가',false,finalized)+'</div>':'';
  list=list.replace('<div class="row event-participant-tools">',edits+'<div class="row event-participant-tools">');

  if(cfg.foreign){list=html.replace(/<button[^>]*data-pre01-action="exclude"[^>]*>[\s\S]*?<\/button>/g,'').replaceAll('선택 엑셀 다운로드','엑셀 다운로드').replaceAll('QR발급','QR보기');if(!finalized)list=list.replace(/<button[^>]*data-pre01-action="qr"[^>]*>[\s\S]*?<\/button>/g,'미발급').replace(/<button[^>]*data-pre01-action="(?:qr-selected|qr-all)"[^>]*>[\s\S]*?<\/button>/g,'');list=list.replace('<div class="row event-participant-tools">',edits+'<div class="row event-participant-tools">');return list;}
  return flow+list;
 }
 document.addEventListener('click',async ev=>{
  const b=ev.target.closest('[data-domestic-action]');if(!b||!active())return;ev.preventDefault();ev.stopImmediatePropagation();if(!operator())return;if(done())return ctx.toast('참가확정 이후에는 참가자 항목을 변경할 수 없습니다.');
  try{const action=b.dataset.domesticAction;
   if(action==='add'){addDialog();return;}
   if(action==='exclude'){const keys=new Set(selected()),rows=people().filter(r=>keys.has(r[0]));if(!rows.length){ctx.toast('제외할 대상을 선택해 주세요.');return;}if(!await participation().confirm(ctx,cfg.interpreter?'통역원 제외':'바이어 제외',ctx.year()+'년 행사에서 선택한 '+rows.length+'명을 제외하시겠습니까? '+(cfg.foreign?'회원정보와 과거 참가이력은 유지됩니다.':'회원정보와 기존 발급 계정·과거 참가이력은 유지됩니다.'),cfg.interpreter?'통역원 제외':'바이어 제외'))return;for(const row of rows)participation().set(cfg.source,row,ctx.year(),false);invalidate();ctx.refresh();return;}
   if(action==='finalize'){const rows=people().slice(),snapshot=signature();if(!rows.length||done())return;const pending=cfg.foreign?[]:rows.filter(r=>!rawView(r).accountId);const names=rows.slice(0,10).map(r=>r[1]).join(', '),others=rows.length>10?' 외 '+(rows.length-10)+'명':'';if(!window.confirm(names+others+'\n총 '+rows.length+'명의 참가를 최종확정하고 '+(cfg.foreign?'QR코드를':'미발급 계정과 QR코드를')+' 생성하시겠습니까?\n참가확정 이후에는 참가자 항목을 변경할 수 없습니다.'))return;if(snapshot!==signature())throw Error('참가 명단이 변경되었습니다. 다시 확인해 주세요.');for(const row of pending)api().issueAccount(row,source().rows,cfg.profile,ctx.year());for(const row of rows){const p=rawView(row);GFAIR_DOWNLOAD_NAMES.png('GFAIR-DEMO|'+ctx.year()+'|'+(cfg.foreign?'OVERSEAS':cfg.interpreter?'INTERPRETER':'BUYER')+'|'+(cfg.foreign?row[0]:p.accountId),GFAIR_DOWNLOAD_NAMES.qrImage(p.name,cfg.foreign?row[0]:p.accountId));}const entry={rows:rows.map(r=>r.slice())};confirmed.set(String(ctx.year()),entry);ctx.refresh();ctx.toast(rows.length+'명 최종 참가 확정 및 '+(cfg.foreign?'QR 생성':'미발급 계정 발급')+'을 완료했습니다.');}
  }catch(error){ctx.toast(error.message||'처리에 실패했습니다.');}
 },true);
 document.addEventListener('click',ev=>{if(!active()||done())return;const b=ev.target.closest('[data-event-action=qr],[data-event-action=qr-download],[data-event-action=qr-all]');if(!b)return;ev.preventDefault();ev.stopImmediatePropagation();ctx.toast('최종확정 후 QR코드를 확인할 수 있습니다.');},true);
 return {list:render,detail:base.detail,notice};
}};
})();