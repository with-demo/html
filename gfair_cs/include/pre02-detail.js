/* PRE-02의 기본 정보는 BAS-04 프로필을 읽기 전용으로 투영한다. */
(()=>{'use strict';const E=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 function render(row,master,year){
  const source=master.find(r=>r[1]===row?.[0]);if(!source)return '<section class="panel pad"><p>연결된 해외 바이어 기본정보가 없습니다.</p></section>';
  const p=GFAIR_OVERSEAS_BUYER_DETAIL.eventView(source,master,'BAS-04',year),country=(window.GFAIR_COUNTRY_CODES||[]).find(c=>c.code===source[2]||c.name===source[2]),countryText=country?country.name+' ('+country.code+')':source[2];
  const pair=(label,value,wide=false)=>'<dt'+(wide?' class="event-field-wide-label"':'')+'>'+label+'</dt><dd'+(wide?' class="event-field-wide"':'')+'>'+E(value||'미등록')+'</dd>';
  const filename=GFAIR_DOWNLOAD_NAMES.qrImage(p.name,p.accountId),qr=p.accountId?GFAIR_DOWNLOAD_NAMES.png('GFAIR-DEMO|'+year+'|OVERSEAS|'+source[0],filename):'';
  return '<section class="overseas-buyer-section event-participant-detail"><h2>기본 정보</h2><dl class="overseas-buyer-basic">'+pair('ID',p.accountId)+'<dt>QR코드</dt><dd>'+(qr?'<div><img src="'+qr+'" alt="'+E(p.name)+' QR코드" style="width:96px;height:auto;display:block"><a class="btn event-detail-qr-download" href="'+qr+'" download="'+E(filename)+'">QR 다운로드</a></div>':'미발급')+'</dd>'+pair('바이어명',p.name)+pair('생년월일',p.birthDate)+pair('국가',countryText)+pair('초청기관',p.invitationType)+pair('연락처',p.phone,true)+pair('이메일',p.email,true)+pair('메모',p.memo,true)+'</dl></section>';
 }
 window.GFAIR_PRE02_DETAIL={render};
})();
