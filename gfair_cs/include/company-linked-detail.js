/* BAS-10: G-FAIR ADMIN 연동 조회 목업. 원천 시스템으로 쓰기 요청을 보내지 않는다. */
(()=>{'use strict';
 const E=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 // 가상 예시 데이터. 실제 연계 시 참가신청의 행사연도·오프라인 참가·승인 여부를 확인한 뒤 기업 관리 정보를 연결한다.
 // 제품 관리의 기업별 제품을 참조하는 가상 예시. 기업 관리 프로필과 별도로 연계한다.
 const products={'기업-01':[{category:'생활용품',name:'친환경 생활용품 A',summary:'일상에서 사용하는 친환경 소재 생활용품입니다.'},{category:'생활용품',name:'친환경 생활용품 B',summary:'휴대와 보관이 편리한 생활용품입니다.'}]};
 const directory={
  '기업-01':{companyNumber:'DEMO-COM-0001',homepage:'https://green-living.example',logo:null,mainProducts:'친환경 생활용품 A, 친환경 생활용품 B',introductionKo:'생활용품을 기획·제조하는 참가기업입니다.',brochure:null,contact:{name:'김도현',mobile:'010-0000-0001',email:'contact@daonliving.example'}},
  // 기업-02는 기업 관리 정보가 없는 사례: 항목명은 유지하고 값만 '-'로 표시한다.
 };
 function render(row,year,head,back){
  const r=row||[],approvedOfflineYears=String(r[6]||'').match(/20\d{2}/g)||[],profile=approvedOfflineYears.includes(String(year))?directory[r[0]]:null;
  const value=v=>v===undefined||v===null||String(v).trim()===''?'-':E(v);
  const safeUrl=url=>{if(typeof url!=='string'||!url.trim())return '';try{const u=new URL(url,location.href);return ['http:','https:'].includes(u.protocol)?u.href:'';}catch{return '';}};
  const website=safeUrl(profile?.homepage),logo=safeUrl(profile?.logo?.url),brochure=safeUrl(profile?.brochure?.url);
  const qrName=GFAIR_DOWNLOAD_NAMES.safe(r[1]||'참가기업')+'_'+GFAIR_DOWNLOAD_NAMES.safe(r[3]||'미지정')+'_qr코드.png';
  const qr=GFAIR_DOWNLOAD_NAMES.png('GFAIR-DEMO|'+year+'|'+(r[0]||'')+'|'+(r[3]||''),qrName);
  const basic=[
   ['QR코드','<div style="display:flex;align-items:center;gap:16px;white-space:normal"><img src="'+qr+'" alt="'+E(r[1]||'참가기업')+' 부스 QR코드" style="width:96px;height:auto;display:block"><a class="btn" href="'+qr+'" download="'+E(qrName)+'">QR 다운로드</a></div>'],
   ['기업명',value(r[1])],['사업자 번호',value(r[2])],['부스 번호',value(r[3])],
   ['기업 번호',value(profile?.companyNumber)],
   ['기업 홈페이지',website?'<a href="'+E(website)+'" target="_blank" rel="noopener noreferrer">'+E(profile.homepage)+'</a>':'-'],
   ['기업 로고 이미지',logo?'<img src="'+E(logo)+'" alt="'+E(r[1]||'참가기업')+' 로고" style="max-width:180px;max-height:100px;object-fit:contain">':'-'],
   ['주요 제품명',value(profile?.mainProducts)],['기업 소개(국문)',value(profile?.introductionKo)],
   ['기업 브로슈어',brochure?'<a href="'+E(brochure)+'" target="_blank" rel="noopener noreferrer" download>'+E(profile.brochure.name||'기업 브로슈어')+'</a>':'-']
  ];
  const contact=[['담당자 명',value(profile?.contact?.name)],['담당자 연락처',value(profile?.contact?.mobile)],['담당자 이메일',value(profile?.contact?.email)]];
  const section=(title,pairs)=>'<section class="panel detail-form-panel company-linked-section"><div class="panelhead"><h2>'+title+'</h2></div><dl class="detail-rows">'+pairs.map(([label,content])=>'<dt>'+label+'</dt><dd style="white-space:pre-wrap;overflow-wrap:anywhere">'+content+'</dd>').join('')+'</dl></section>';
  const items=products[r[0]]||[];
  const productRows=(items.length?items:[{}]).map(item=>'<tr><td>'+value(item.category)+'</td><td style="text-align:left">'+value(item.name)+'</td><td style="text-align:left;white-space:pre-wrap;overflow-wrap:anywhere">'+value(item.summary)+'</td></tr>').join('');
  const productSection='<section class="panel detail-form-panel company-linked-section"><div class="panelhead"><h2>제품 정보</h2></div><div class="tablewrap"><table><thead><tr><th>메인 카테고리</th><th>제품명</th><th>제품요약설명</th></tr></thead><tbody>'+productRows+'</tbody></table></div></section>';
  return head+section('기본 정보',basic)+section('담당자 정보',contact)+productSection+'<div class="formfooter">'+back+'</div>';
 }
 window.GFAIR_COMPANY_LINKED_DETAIL={render};
})();
