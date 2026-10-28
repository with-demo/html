/* PRE-02의 기본 정보는 BAS-04 프로필을 읽기 전용으로 투영한다. */
(()=>{'use strict';const E=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 function render(row,master,year){
  const source=master.find(r=>r[1]===row?.[0]);if(!source)return '<section class="panel pad"><p>연결된 해외 바이어 기본정보가 없습니다.</p></section>';
  const p=GFAIR_OVERSEAS_BUYER_DETAIL.eventView(source,master,'BAS-04',year),country=(window.GFAIR_COUNTRY_CODES||[]).find(c=>c.code===source[2]||c.name===source[2]),countryText=country?country.name+' ('+country.code+')':source[2];
  const pair=(label,value,wide=false)=>'<dt'+(wide?' class="event-field-wide-label"':'')+'>'+label+'</dt><dd'+(wide?' class="event-field-wide"':'')+'>'+E(value||'미등록')+'</dd>';
  const filename=GFAIR_DOWNLOAD_NAMES.qrImage(p.name,p.code),qr=p.code?GFAIR_DOWNLOAD_NAMES.png('GFAIR-DEMO|'+year+'|OVERSEAS|'+source[0],filename):'';
  return '<section class="overseas-buyer-section event-participant-detail"><h2>기본 정보</h2><dl class="overseas-buyer-basic">'+'<dt class="event-field-wide-label">QR코드</dt><dd class="event-field-wide">'+(qr?'<div style="display:flex;align-items:center;gap:16px;flex-wrap:wrap"><img src="'+qr+'" alt="'+E(p.name)+' QR코드" style="width:96px;height:auto;display:block"><a class="btn event-detail-qr-download" style="margin-top:0" href="'+qr+'" download="'+E(filename)+'">QR 다운로드</a></div>':'미발급')+'</dd>'+pair('바이어명',p.name)+pair('생년월일',p.birthDate)+pair('국가',countryText)+pair('초청기관',p.invitationType)+pair('연락처',p.phone,true)+pair('이메일',p.email,true)+pair('메모',p.memo,true)+'</dl></section>';
 }
 function travel(row,year){
  const stages=['공항 도착','이동','호텔 도착·체크인','행사장 도착','통역원 매칭','상담 진행'],current=stages.indexOf(row?.[4]);
  // 화면 검토용 QR 스캔 일시. 실제 서비스에서는 바이어·행사별 QR 처리 이력을 조회한다.
  const samples=[['10-28','09:10:00'],['10-28','09:50:00'],['10-28','10:40:00'],['10-29','09:30:00'],['10-29','09:45:00'],['10-29','10:00:00']];
  const body=stages.map((stage,i)=>{const scanned=current>=0&&i<=current,now=i===current;return '<tr'+(now?' class="pre02-current-step" aria-current="step"':'')+'><td>'+String(i+1).padStart(2,'0')+'</td><td style="text-align:left">'+E(stage)+(now?' <span class="badge">현재 위치</span>':'')+'</td><td>'+ (scanned?E(year+'-'+samples[i][0]):'-')+'</td><td>'+(scanned?samples[i][1]:'-')+'</td><td>'+(scanned?'스캔 완료':'미스캔')+'</td></tr>';}).join('');
  return '<style>#app #content .pre02-travel-list{width:100%;border-collapse:collapse;border:1px solid #ddd;background:#fff}#app #content .pre02-travel-list th{background:#f4f4f4;font-weight:500;text-align:center;border:1px solid #ddd;padding:14px 16px;font-size:13px}#app #content .pre02-travel-list td{background:#fff;border:1px solid #ddd;padding:14px 16px;font-size:13px;text-align:center;font-variant-numeric:tabular-nums}#app #content .pre02-current-step td{font-weight:600}#app #content .pre02-current-step .badge{background:#444;color:white;margin-left:8px}</style><section class="overseas-buyer-section"><h2>방한 정보</h2><div class="tablewrap"><table class="pre02-travel-list"><thead><tr><th scope="col">단계</th><th scope="col">이동상태</th><th scope="col">QR 스캔 일자</th><th scope="col">QR 스캔 시간</th><th scope="col">처리 상태</th></tr></thead><tbody>'+body+'</tbody></table></div></section>';
 }
 window.GFAIR_PRE02_DETAIL={render,travel};
})();
