/* BAS-10: G-FAIR ADMIN 연동 조회 목업. 원천 시스템으로 쓰기 요청을 보내지 않는다. */
(()=>{'use strict';
 const E=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 // 가상 예시 데이터. 실제 연계 시 참가신청의 행사연도·오프라인 참가·승인 여부를 확인한 뒤 기업 관리 정보를 연결한다.
 const directory={
  '기업-01':{companyNumber:'DEMO-COM-0001',homepage:'https://green-living.example',logo:null,mainProducts:'친환경 생활용품 A, 친환경 생활용품 B',introductionKo:'생활용품을 기획·제조하는 참가기업입니다.',brochure:null,contact:{name:'김도현',mobile:'010-0000-0001',email:'contact@daonliving.example'}},
  // 기업-02는 기업 관리 정보가 없는 사례: 항목명은 유지하고 값만 '-'로 표시한다.
 };
 function render(row,year,head,back){
  const r=row||[],approvedOfflineYears=String(r[6]||'').match(/20\d{2}/g)||[],profile=approvedOfflineYears.includes(String(year))?directory[r[0]]:null;
  const value=v=>v===undefined||v===null||String(v).trim()===''?'-':E(v);
  const safeUrl=url=>{if(typeof url!=='string'||!url.trim())return '';try{const u=new URL(url,location.href);return ['http:','https:'].includes(u.protocol)?u.href:'';}catch{return '';}};
  const website=safeUrl(profile?.homepage),logo=safeUrl(profile?.logo?.url),brochure=safeUrl(profile?.brochure?.url);
  const basic=[
   ['기업명',value(r[1])],['사업자 번호',value(r[2])],['부스 번호',value(r[3])],
   ['기업 번호',value(profile?.companyNumber)],
   ['기업 홈페이지',website?'<a href="'+E(website)+'" target="_blank" rel="noopener noreferrer">'+E(profile.homepage)+'</a>':'-'],
   ['기업 로고 이미지',logo?'<img src="'+E(logo)+'" alt="'+E(r[1]||'참가기업')+' 로고" style="max-width:180px;max-height:100px;object-fit:contain">':'-'],
   ['주요 제품명',value(profile?.mainProducts)],['기업 소개(국문)',value(profile?.introductionKo)],
   ['기업 브로슈어',brochure?'<a href="'+E(brochure)+'" target="_blank" rel="noopener noreferrer" download>'+E(profile.brochure.name||'기업 브로슈어')+'</a>':'-']
  ];
  const contact=[['담당자 명',value(profile?.contact?.name)],['담당자 연락처',value(profile?.contact?.mobile)],['담당자 이메일',value(profile?.contact?.email)]];
  const section=(title,pairs)=>'<section class="panel detail-form-panel company-linked-section"><div class="panelhead"><h2>'+title+'</h2></div><dl class="detail-rows">'+pairs.map(([label,content])=>'<dt>'+label+'</dt><dd style="white-space:pre-wrap;overflow-wrap:anywhere">'+content+'</dd>').join('')+'</dl></section>';
  return head+section('기본 정보',basic)+section('담당자 정보',contact)+'<div class="formfooter">'+back+'</div>';
 }
 window.GFAIR_COMPANY_LINKED_DETAIL={render};
})();
