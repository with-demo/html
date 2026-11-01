// 국내바이어 참가 명단 검토안. 예시 회원만 사용하며 실제 회원 조회는 서버의 정확 일치 확인으로 연결한다.
(()=>{'use strict';
const E=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])),digits=v=>String(v||'').replace(/\D/g,'');
window.GFAIR_DOMESTIC_REVIEW={create(ctx,base){
 const source=()=>ctx.source('BAS-05'),api=()=>window.GFAIR_OVERSEAS_BUYER_DETAIL,participation=()=>window.GFAIR_PARTICIPATION;
 const operator=()=>ctx.role()==='buyOperator',active=()=>location.hash==='#EVT-01';
 let checked=null,confirmed=new Map();
 const view=row=>api().eventView(row,source().rows,'BAS-06',ctx.year());
 const people=()=>source().rows.filter(r=>participation().participating('BAS-05',r,ctx.year()));
 const signature=()=>people().map(r=>r[0]).sort().join('|');
 const done=()=>confirmed.get(String(ctx.year()))===signature()&&people().length>0&&people().every(r=>view(r).accountId);
 const button=(action,text,primary=false,disabled=false)=>'<button type="button" class="btn'+(primary?' primary':'')+'" data-domestic-action="'+action+'"'+(disabled?' disabled':'')+'>'+text+'</button>';
 const selected=()=>[...document.querySelectorAll('[data-event-check]:checked')].map(n=>n.dataset.eventCheck);
 function invalidate(){confirmed.delete(String(ctx.year()));}
 function modal(title,body){ctx.modal(title,body,'close','확인','EVT-01-p39');document.querySelector('#dialog-content > .dialogactions')?.remove();}
 function addDialog(){checked=null;modal('회원추가','<form data-domestic-lookup><p class="domestic-help">추가할 회원의 이름과 휴대전화번호를 입력해 주세요. 입력한 정보가 모두 일치하는 회원만 확인하며, 전체 회원 목록은 제공하지 않습니다.</p><div class="domestic-fields"><label><span>이름 *</span><input name="name" required maxlength="40" autocomplete="off"></label><label><span>휴대전화번호 *</span><input name="phone" type="tel" required inputmode="tel" placeholder="010-0000-0000" autocomplete="off"></label></div><div class="dialogactions"><button class="btn primary" type="submit">기존 회원 확인</button></div></form><div data-domestic-lookup-result aria-live="polite"></div>');}
 function render(route){
  const html=base.list(route);if(route!=='EVT-01')return html;
  const count=people().length,pending=people().filter(r=>!view(r).accountId).length,finalized=done();
  const flow='<section class="panel pad domestic-review"><div class="domestic-review-heading"><div><span class="domestic-eyebrow">'+E(ctx.year())+'년 국내바이어 참가 명단</span><h2>'+(finalized?'최종 참가 확정 완료':'참가 대상 검토')+'</h2></div><span class="badge">'+(finalized?'확정 완료':'확정 대기')+'</span></div><ol class="domestic-steps"><li>1. 회원추가</li><li>2. 미참여 대상 제외</li><li>3. 최종 참가 확정 · 계정발급</li></ol><div class="domestic-review-summary"><span>참가 대상 <strong>'+count+'명</strong></span><span>계정 미발급 <strong>'+pending+'명</strong></span></div><p class="domestic-help">'+(finalized?'확정한 명단의 미발급 계정을 발급했습니다. 명단을 추가·제외하면 다시 최종 확정해 주세요.':'참가할 회원을 추가하고 미참여 대상을 제외한 뒤 최종 확정해 주세요. 확정 시 현재 명단 전체가 참가자로 확정되며, 미발급 계정만 새로 발급합니다.')+'</p>'+(operator()?'<div class="domestic-main-actions">'+button('add','회원추가')+button('exclude','선택 미참여 처리')+button('finalize',finalized?'최종 확정 완료':'최종 참가 확정 · 계정발급',true,!count||finalized)+'</div>':'<p class="domestic-help">최종 참가 확정과 계정발급은 구매상담 운영용역사가 진행합니다.</p>')+'</section>';
  // Keep existing detail, selection, downloads and QR handlers; replace only domestic account actions.
  let list=html.replace(/<button type="button" class="btn" data-event-action="issue">.*?<\/button>/,'').replace(/<button type="button" class="btn" data-event-action="exclude">.*?<\/button>/,'');
  list=list.replace('<th scope="col">계정발급</th>','<th scope="col">참가 상태</th>').replace(/<td><button type="button" class="btn" data-event-action="issue-one"[^>]*>계정발급<\/button><\/td>/g,'<td><span class="badge">'+(finalized?'참가 확정':'확정 대기')+'</span></td>');
  return flow+list;
 }
 document.addEventListener('submit',ev=>{
  if(!ev.target.matches('[data-domestic-lookup],[data-domestic-new]'))return;
  ev.preventDefault();ev.stopImmediatePropagation();if(!operator()||!active())return;
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
  if(!checked||checked.year!==String(ctx.year()))throw Error('기존 회원 확인을 다시 진행해 주세요.');
  const rows=source().rows;let row=checked.row;
  if(row){row=rows.find(r=>r[0]===checked.row[0]);if(!row||row[1]!==checked.name||digits(view(row).phone)!==checked.phone)throw Error('회원정보가 변경되었습니다. 다시 확인해 주세요.');if(participation().participating('BAS-05',row,ctx.year()))throw Error('이미 참가 대상에 포함된 회원입니다.');}
  else{const code='K'+ctx.year()+String(Math.max(0,...rows.filter(r=>new RegExp('^K'+ctx.year()+'\\d{4}$').test(r[0])).map(r=>Number(r[0].slice(-4))))+1).padStart(4,'0');row=[code,checked.name,String(data.get('organization')||'').trim(),String(ctx.year()),'신규'];rows.push(row);const screen=source().screen;screen.ui.birthDates??={};screen.ui.birthDates[code]=String(data.get('birth')||'');}
  const years=new Set(String(row[3]||'').match(/20\d{2}/g)||[]);years.add(String(ctx.year()));row[3]=[...years].sort().reverse().join(', ');
  if(!checked.row)api().importProfile(row,rows,'BAS-06',{phone:checked.phone,organization:String(data.get('organization')),email:String(data.get('email')||'')},ctx.year());
  participation().set('BAS-05',row,ctx.year(),true);ctx.setRows('BAS-05',rows);invalidate();checked=null;document.getElementById('dialog').close();ctx.refresh();ctx.toast('참가 대상에 추가했습니다. 명단 검토 후 최종 확정해 주세요.');
 }
 document.addEventListener('click',async ev=>{
  const b=ev.target.closest('[data-domestic-action]');if(!b)return;ev.preventDefault();ev.stopImmediatePropagation();if(!active()||!operator())return;
  try{const action=b.dataset.domesticAction;
   if(action==='add'){addDialog();return;}
   if(action==='add-existing'){addMember();return;}
   if(action==='exclude'){const keys=new Set(selected()),rows=people().filter(r=>keys.has(r[0]));if(!rows.length){ctx.toast('미참여 처리할 대상을 선택해 주세요.');return;}if(!await participation().confirm(ctx,'미참여 처리',ctx.year()+'년 행사에서 선택한 '+rows.length+'명을 제외하시겠습니까? 회원정보와 기존 발급 계정·과거 참가이력은 유지됩니다.','미참여 처리'))return;for(const row of rows)participation().set('BAS-05',row,ctx.year(),false);invalidate();ctx.refresh();return;}
   if(action==='finalize'){const rows=people().slice(),snapshot=signature();if(!rows.length||done())return;const pending=rows.filter(r=>!view(r).accountId);if(!await participation().confirm(ctx,'최종 참가 확정 · 계정발급',ctx.year()+'년 국내바이어 '+rows.length+'명을 최종 참가자로 확정하고, 계정 미발급 '+pending.length+'명의 계정을 발급하시겠습니까? 기존 발급 계정은 유지됩니다.','최종 확정 · 계정발급'))return;if(snapshot!==signature())throw Error('참가 명단이 변경되었습니다. 다시 확인해 주세요.');for(const row of pending)api().issueAccount(row,source().rows,'BAS-06',ctx.year());confirmed.set(String(ctx.year()),snapshot);ctx.refresh();ctx.toast(rows.length+'명 최종 참가 확정 및 미발급 계정 발급을 완료했습니다.');}
  }catch(error){ctx.toast(error.message||'처리에 실패했습니다.');}
 },true);
 return {list:render,detail:base.detail};
}};
})();