// 국내바이어 참가 명단 검토안. 예시 회원만 사용하며 실제 회원 조회는 서버의 정확 일치 확인으로 연결한다.
(()=>{'use strict';
const E=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])),digits=v=>String(v||'').replace(/\D/g,'');
window.GFAIR_DOMESTIC_REVIEW={create(ctx,base){
 const source=()=>ctx.source('BAS-05'),api=()=>window.GFAIR_OVERSEAS_BUYER_DETAIL,participation=()=>window.GFAIR_PARTICIPATION;
 const operator=()=>ctx.role()==='buyOperator',active=()=>location.hash==='#EVT-01';
 let checked=null,confirmed=new Map();
 const lockKey='gfair-domestic-finalized-20261101';
 try{confirmed=new Map(JSON.parse(sessionStorage.getItem(lockKey)||'[]'));for(const [year,entry] of confirmed){const rows=source().rows;for(const saved of entry.rows){const at=rows.findIndex(r=>r[0]===saved[0]);if(at<0)rows.push(saved);participation().set('BAS-05',saved,year,true);}ctx.setRows('BAS-05',rows);}}catch{confirmed=new Map();}
 const view=row=>api().eventView(row,source().rows,'BAS-06',ctx.year());
 window.GFAIR_DOMESTIC_REVIEW.lockedRows=year=>confirmed.get(String(year))?.rows.map(r=>r.slice())||null;
 const people=()=>window.GFAIR_DOMESTIC_REVIEW.lockedRows(ctx.year())||source().rows.filter(r=>participation().participating('BAS-05',r,ctx.year()));
 const signature=()=>people().map(r=>r[0]).sort().join('|');
 const done=()=>confirmed.has(String(ctx.year()));
 const button=(action,text,primary=false,disabled=false)=>'<button type="button" class="btn'+(primary?' primary':'')+'" data-domestic-action="'+action+'"'+(disabled?' disabled':'')+'>'+text+'</button>';
 const selected=()=>[...document.querySelectorAll('[data-event-check]:checked')].map(n=>n.dataset.eventCheck);
 function invalidate(){confirmed.delete(String(ctx.year()));}
 function modal(title,body){ctx.modal(title,body,'close','확인','EVT-01-p39');document.querySelector('#dialog-content > .dialogactions')?.remove();}
 function addDialog(){checked=null;modal('참여자 추가','<form data-domestic-lookup><p class="domestic-help">추가할 회원의 이름과 휴대전화번호를 입력해 주세요. 입력한 정보가 모두 일치하는 회원만 확인하며, 전체 회원 목록은 제공하지 않습니다.</p><div class="domestic-fields"><label><span>이름 *</span><input name="name" required maxlength="40" autocomplete="off"></label><label><span>휴대전화번호 *</span><input name="phone" type="tel" required inputmode="tel" placeholder="010-0000-0000" autocomplete="off"></label></div><div class="dialogactions"><button class="btn primary" type="submit">기존 회원 확인</button></div></form><div data-domestic-lookup-result aria-live="polite"></div>');}
 function render(route){
  const html=base.list(route);if(route!=='EVT-01')return html;
  const count=people().length,finalized=done();
  const flow='<section class="panel domestic-review-notice"><div class="domestic-review-notice-head"><strong>참가 대상 검토 안내</strong><div class="domestic-status"><span>현재상태 : <strong>'+(finalized?'참여확정':'확정대기')+'</strong></span>'+(operator()?button('finalize',finalized?'최종확정 완료':'최종확정',true,!count||finalized):'')+'</div></div><p>참가할 회원을 검토한 후 [최종확정]을 누르면 계정과 QR코드가 생성됩니다.<br>참여확정 이후에는 참여자 항목을 변경할 수 없으니, 명단을 최종 확인한 후 확정해 주세요.</p></section>';
  let list=html.replace(/<button type="button" class="btn" data-event-action="issue">.*?<\/button>/,'').replace(/<button type="button" class="btn" data-event-action="exclude">.*?<\/button>/,'');
  list=list.replace('<th scope="col">계정발급</th>','').replace(/<td><button type="button" class="btn" data-event-action="issue-one"[^>]*>계정발급<\/button><\/td>/g,'').replace('<th scope="col">소속기업</th>','<th scope="col">기업</th>').replace('<th scope="col">발급 ID</th>','<th scope="col">발급ID</th>').replace('<th scope="col">QR발급</th>','<th scope="col">QR</th>').replace('colspan="6"','colspan="5"').replace('선택 엑셀 다운로드','엑셀 다운로드');
  if(!finalized)list=list.replace(/(data-event-action="(?:qr|qr-download|qr-all)"[^>]*?)(>)/g,'$1 disabled$2');
  const edits=operator()?'<div class="domestic-list-edits">'+button('exclude','선택 미참여',false,finalized)+button('add','참여자 추가',false,finalized)+'</div>':'';
  list=list.replace('<div class="row event-participant-tools">',edits+'<div class="row event-participant-tools">');

  return flow+list;
 }
 document.addEventListener('submit',ev=>{
  if(!ev.target.matches('[data-domestic-lookup],[data-domestic-new]'))return;
  ev.preventDefault();ev.stopImmediatePropagation();if(!operator()||!active()||done())return;
  try{const f=ev.target;if(!f.reportValidity())return;const data=new FormData(f);
   if(f.matches('[data-domestic-lookup]')){
    checked=null;const name=String(data.get('name')).trim(),phone=digits(data.get('phone')),result=document.querySelector('[data-domestic-lookup-result]');
    if(!name||!/^01[016789]\d{7,8}$/.test(phone)){result.textContent='이름과 올바른 휴대전화번호를 입력해 주세요.';return;}
    const matches=source().rows.filter(r=>r[1]===name&&digits(view(r).phone)===phone);
    if(matches.length>1){result.textContent='입력한 정보만으로 회원을 특정할 수 없습니다. 담당 관리자에게 확인해 주세요.';return;}
    checked={name,phone,row:matches[0]||null,year:String(ctx.year())};
    if(matches.length){const row=matches[0],exists=participation().participating('BAS-05',row,ctx.year());result.innerHTML='<section class="domestic-match"><h3>'+(exists?'이미 참가 대상에 포함된 회원입니다.':'기존 회원이 확인되었습니다.')+'</h3><p>'+E(name[0]+'*'.repeat(Math.max(1,name.length-1)))+' · '+E(phone.slice(0,3)+'-****-'+phone.slice(-4))+'</p><p class="domestic-help">'+(exists?'중복 추가할 수 없습니다.':'기존 회원정보를 유지하고 현재 행사의 참가 대상에만 추가합니다.')+'</p>'+(exists?'':button('add-existing','참가 대상에 추가',true))+'</section>';}
    else result.innerHTML='<form data-domestic-new><section class="domestic-match"><h3>일치하는 회원이 없습니다.</h3><p class="domestic-help">회원 정보를 입력해 신규 회원으로 등록하고 현재 행사의 참가 대상에 추가합니다.</p><div class="domestic-fields"><label><span>소속기업 *</span><input name="organization" required maxlength="100"></label><label><span>생년월일 *</span><input name="birth" type="date" required max="'+new Date().toISOString().slice(0,10)+'"></label><label class="wide"><span>이메일</span><input name="email" type="email" maxlength="100"></label></div><div class="dialogactions"><button class="btn primary" type="submit">신규 회원 등록 · 참가 대상 추가</button></div></section></form>';
   }else addMember(data);
  }catch(error){ctx.toast(error.message||'회원추가에 실패했습니다.');}
 },true);
 document.addEventListener('input',ev=>{if(!ev.target.closest('[data-domestic-lookup]'))return;checked=null;const result=document.querySelector('[data-domestic-lookup-result]');if(result)result.replaceChildren();},true);
 function addMember(data){
  if(done())throw Error('참여확정 이후에는 참여자 항목을 변경할 수 없습니다.');
  if(!checked||checked.year!==String(ctx.year()))throw Error('기존 회원 확인을 다시 진행해 주세요.');
  const rows=source().rows;let row=checked.row;
  if(row){row=rows.find(r=>r[0]===checked.row[0]);if(!row||row[1]!==checked.name||digits(view(row).phone)!==checked.phone)throw Error('회원정보가 변경되었습니다. 다시 확인해 주세요.');if(participation().participating('BAS-05',row,ctx.year()))throw Error('이미 참가 대상에 포함된 회원입니다.');}
  else{const code='K'+ctx.year()+String(Math.max(0,...rows.filter(r=>new RegExp('^K'+ctx.year()+'\\d{4}$').test(r[0])).map(r=>Number(r[0].slice(-4))))+1).padStart(4,'0');row=[code,checked.name,String(data.get('organization')||'').trim(),String(ctx.year()),'신규'];rows.push(row);const screen=source().screen;screen.ui.birthDates??={};screen.ui.birthDates[code]=String(data.get('birth')||'');}
  const years=new Set(String(row[3]||'').match(/20\d{2}/g)||[]);years.add(String(ctx.year()));row[3]=[...years].sort().reverse().join(', ');
  if(!checked.row)api().importProfile(row,rows,'BAS-06',{phone:checked.phone,organization:String(data.get('organization')),email:String(data.get('email')||'')},ctx.year());
  participation().set('BAS-05',row,ctx.year(),true);ctx.setRows('BAS-05',rows);invalidate();checked=null;document.getElementById('dialog').close();ctx.refresh();ctx.toast('참가 대상에 추가했습니다. 명단 검토 후 최종확정해 주세요.');
 }
 document.addEventListener('click',async ev=>{
  const b=ev.target.closest('[data-domestic-action]');if(!b)return;ev.preventDefault();ev.stopImmediatePropagation();if(!active()||!operator())return;if(done())return ctx.toast('참여확정 이후에는 참여자 항목을 변경할 수 없습니다.');
  try{const action=b.dataset.domesticAction;
   if(action==='add'){addDialog();return;}
   if(action==='add-existing'){addMember();return;}
   if(action==='exclude'){const keys=new Set(selected()),rows=people().filter(r=>keys.has(r[0]));if(!rows.length){ctx.toast('미참여 처리할 대상을 선택해 주세요.');return;}if(!await participation().confirm(ctx,'미참여 처리',ctx.year()+'년 행사에서 선택한 '+rows.length+'명을 제외하시겠습니까? 회원정보와 기존 발급 계정·과거 참가이력은 유지됩니다.','미참여 처리'))return;for(const row of rows)participation().set('BAS-05',row,ctx.year(),false);invalidate();ctx.refresh();return;}
   if(action==='finalize'){const rows=people().slice(),snapshot=signature();if(!rows.length||done())return;const pending=rows.filter(r=>!view(r).accountId);const names=rows.slice(0,10).map(r=>r[1]).join(', '),others=rows.length>10?' 외 '+(rows.length-10)+'명':'';if(!window.confirm(names+others+'\n총 '+rows.length+'명의 참가를 최종확정하고 미발급 계정과 QR코드를 생성하시겠습니까?\n참여확정 이후에는 참여자 항목을 변경할 수 없습니다.'))return;if(snapshot!==signature())throw Error('참가 명단이 변경되었습니다. 다시 확인해 주세요.');for(const row of pending)api().issueAccount(row,source().rows,'BAS-06',ctx.year());for(const row of rows){const p=view(row);GFAIR_DOWNLOAD_NAMES.png('GFAIR-DEMO|'+ctx.year()+'|BUYER|'+p.accountId,GFAIR_DOWNLOAD_NAMES.qrImage(p.name,p.accountId));}const entry={rows:rows.map(r=>r.slice())};confirmed.set(String(ctx.year()),entry);try{sessionStorage.setItem(lockKey,JSON.stringify([...confirmed]));}catch{confirmed.delete(String(ctx.year()));throw Error('최종확정 상태를 저장하지 못했습니다. 다시 시도해 주세요.');}ctx.refresh();ctx.toast(rows.length+'명 최종 참가 확정 및 미발급 계정 발급을 완료했습니다.');}
  }catch(error){ctx.toast(error.message||'처리에 실패했습니다.');}
 },true);
 document.addEventListener('click',ev=>{if(!active()||done())return;const b=ev.target.closest('[data-event-action=qr],[data-event-action=qr-download],[data-event-action=qr-all]');if(!b)return;ev.preventDefault();ev.stopImmediatePropagation();ctx.toast('최종확정 후 QR코드를 확인할 수 있습니다.');},true);
 return {list:render,detail:base.detail};
}};
})();