(()=>{'use strict';
 const E=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const roles={admin:'관리자',buyOperator:'구매상담 운영용역사',exportOperator:'수출상담 운영용역사',buyer:'국내 바이어',interpreter:'통역원'};
 function owner(){try{return window.opener&&window.opener.location.origin===location.origin?window.opener:window;}catch{return window;}}
 function fields(role,year){
  const source=owner();
  if(['admin','buyOperator','exportOperator'].includes(role))return source.GFAIR_MANAGEMENT?.accountBasic(role,year)||window.GFAIR_MANAGEMENT?.accountBasic(role,year)||[];
  const list=role==='buyer'?'BAS-05':'BAS-07',detail=role==='buyer'?'BAS-06':'BAS-08',screen=(source.GFAIR_SCREENS||window.GFAIR_SCREENS||[]).flatMap(g=>g.screens).find(s=>s.id===list),rows=screen?.ui.rows||[],row=rows[0],api=source.GFAIR_OVERSEAS_BUYER_DETAIL||window.GFAIR_OVERSEAS_BUYER_DETAIL;
  if(!row||!api)return [];
  const profile=api.eventView(row,rows,detail,year);
  return [[role==='buyer'?'바이어명':'통역원명',profile.name+' ('+profile.code+')'],['생년월일',profile.birthDate],...(role==='buyer'?[['소속기업',profile.organization],['초청기관',profile.invitationType]]:[['언어',profile.languages]]),['연락처',profile.phone],['이메일',profile.email]];
 }
 function render(role,year){
  const values=fields(role,year);
  document.body.classList.add('my-info-popup');if(new URLSearchParams(location.search).get('popup')==='my-info')document.body.classList.add('my-info-window');
  return '<main class="my-info-page" id="content"><header><h1>내정보</h1><span>'+E(roles[role]||'')+'</span></header><section><h2>기본정보</h2>'+(values.length?'<dl class="my-info-fields">'+values.map(([label,value])=>'<dt>'+E(label)+'</dt><dd>'+E(value||'미등록')+'</dd>').join('')+'</dl>':'<p>기본정보를 불러오는 중입니다.</p>')+'</section>'+(role==='admin'?'<form data-my-info-password><h2>비밀번호 변경</h2><div class="my-info-password"><label>새 비밀번호<input type="password" name="password" autocomplete="new-password" minlength="8" maxlength="20" required></label><label>비밀번호 확인<input type="password" name="confirm" autocomplete="new-password" minlength="8" maxlength="20" required></label></div><p class="small">영문·숫자 포함 8~20자리 (특수문자 사용 가능, 공백 불가)</p><p data-my-info-result role="status"></p><div class="my-info-actions"><button type="button" class="btn" data-my-info-close>닫기</button><button type="submit" class="btn primary">저장</button></div></form>':'<div class="my-info-actions"><button type="button" class="btn" data-my-info-close>닫기</button></div>')+'<p class="small">검토용 예시 화면입니다. 실제 계정 정보·비밀번호는 변경되지 않습니다.</p></main>';
 }
 function open(role,year){const url=new URL(location.href);url.searchParams.set('popup','my-info');url.searchParams.set('userRole',role);url.searchParams.set('eventYear',year);url.hash='COM-09';const popup=window.open(url.href,'gfair-my-info-'+role,'popup=yes,width=820,height=760,resizable=yes,scrollbars=yes');if(popup)popup.focus();else window.alert('팝업이 차단되었습니다. 브라우저에서 팝업을 허용해 주세요.');}
 document.addEventListener('click',event=>{if(event.target.closest('[data-my-info-close]'))window.close();});
 document.addEventListener('submit',event=>{const form=event.target;if(!form.matches('[data-my-info-password]'))return;event.preventDefault();event.stopImmediatePropagation();const result=form.querySelector('[data-my-info-result]'),data=new FormData(form),password=String(data.get('password')||'');if(!/^(?=.*[A-Za-z])(?=.*[0-9])[\x21-\x7E]{8,20}$/.test(password)){result.textContent='영문·숫자 포함 8~20자리로 입력해 주세요. (특수문자 사용 가능, 공백 불가)';return;}if(password!==data.get('confirm')){result.textContent='비밀번호 확인 값이 일치하지 않습니다.';return;}form.reset();result.textContent='비밀번호 변경 형식을 확인했습니다. 검토용 화면이므로 실제 비밀번호는 변경되지 않습니다.';});
 window.GFAIR_MY_INFO={open,render,fields};
})();
