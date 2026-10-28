/* BAS-10: G-FAIR ADMIN 연동 조회 목업. 원천 시스템으로 쓰기 요청을 보내지 않는다. */
(()=>{'use strict';
 const E=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 // 사용자가 제공한 화면의 지정 텍스트를 상세 목업 예시로 표시한다. 실제 원천 시스템에는 쓰지 않는다.
 const applications={'기업-fluff':{name:'플러프랩스 주식회사',businessNumber:'274-81-04038',booth:'M-24'}};
 const products={'기업-fluff':[{category:'Beauty',name:'미드나잇 릴렉싱 바디워시',summary:'천연 유래 계면활성제와 특허 펩타이드, 로즈우드·로즈마리 향을 담은 프리미엄 펫 바디워시'}]};
 // 사용자가 제공한 제품 목록 순서·제품명·국문 요약을 표시한다.
 products['기업-fluff'].unshift({category:'Beauty',name:'펫 페이셜 클렌저',summary:'바질·캐롯시드로 반려동물의 섬세한 얼굴 피부를 관리하는 프리미엄 펫 페이셜 클렌저'},{category:'Beauty',name:'미드나잇 릴렉싱 트리트먼트',summary:'천연 유래 계면활성제와 펩타이드 특허 성분, 로즈우드·로즈마리 향을 담은 펫 트리트먼트'});
 products['기업-02']=[{category:'Beauty',name:'저자극 펫 샴푸',summary:'반려동물의 피부와 털을 부드럽게 세정하는 데일리 샴푸입니다.'},{category:'Beauty',name:'데일리 케어 미스트',summary:'산책 후 간편하게 사용하는 반려동물용 케어 미스트입니다.'}];
 const directory={
  '기업-fluff':{companyNumber:'070-8095-1468',homepage:'https://www.fluff.co.kr/',logo:{name:'플러프 로고.png',url:'assets/company/fluff-logo.png'},mainProducts:'미드나잇 릴렉싱 바디워시 미드나잇 릴렉싱 트리트먼트 펫 페이셜 클렌저',introductionKo:'주식회사 플러프랩스는 프리미엄 펫 스킨케어 브랜드 ‘플러프(FLUFF)’를 운영하며, 반려동물의 피부 건강과 보호자가 함께하는 일상의 가치를 높이는 제품을 선보이고 있습니다. 천연 유래 성분과 기능성 원료를 활용한 바디워시, 트리트먼트, 페이셜 클렌저 등 전문 스킨케어 제품부터 반려동물과 함께하는 공간을 고려한 펫 프렌들리 캔들까지 다양한 제품을 전개하고 있습니다. 국내 온라인 유통과 호텔·리조트 어메니티 사업을 기반으로 일본 세이부 백화점 입점 및 글로벌 유통 네트워크를 확대하고 있으며, 미국과 유럽 시장으로의 진출을 적극 추진하고 있습니다. 플러프랩스는 제품의 안전성과 전문성, 감각적인 디자인을 바탕으로 반려동물과 보호자 모두를 위한 글로벌 프리미엄 펫 라이프케어 브랜드로 성장하고자 합니다.',brochure:{name:'플러프_제품카탈로그.pdf',url:'assets/company/fluff-brochure.pdf'},contact:{name:'문가은',mobile:'010-3244-9399',email:'MOON@FLUFF.CO.KR'}},
  '기업-02':{companyNumber:'070-0000-0002',homepage:'https://breezepetcare.example',logo:{name:'브리즈펫케어_로고.svg',url:'assets/company/breeze-logo.svg'},mainProducts:'저자극 펫 샴푸, 데일리 케어 미스트',introductionKo:'브리즈펫케어는 반려동물의 일상적인 위생과 피부 관리를 위한 펫 케어 제품을 기획하는 기업입니다. 저자극 샴푸와 데일리 케어 미스트 등 보호자가 편리하게 사용할 수 있는 제품을 선보입니다. 화면 검토를 위한 가상 기업 소개입니다.',brochure:{name:'브리즈펫케어_브로슈어.html',url:'assets/company/breeze-brochure.html'},contact:{name:'박지훈',mobile:'000-0000-0002',email:'contact@breezepetcare.example'}},
 };
 function fillDemo(r){
  if(directory[r[0]]||!(r[0]==='기업-01'||/^기업-DEMO-\d{2}$/.test(r[0])))return;
  const index=r[0]==='기업-01'?0:Number(r[0].slice(-2)),slug='sample-'+String(index).padStart(2,'0'),name=r[1],category=window.GFAIR_COMPANY_FILTER.categoriesFor(r),types={Food:['간편 건강 스낵','균형 잡힌 원료로 만든 간편 식품입니다.'],Kitchen:['다용도 주방 세정제','주방 표면과 조리도구 관리에 사용하는 세정 제품입니다.'],Leisure:['휴대용 피크닉 매트','야외 활동 시 간편하게 펼쳐 사용하는 휴대용 매트입니다.'],Beauty:['데일리 보습 크림','매일 사용하는 보습 케어 제품입니다.'],Fashion:['리사이클 데일리백','재활용 소재를 활용한 일상용 가방입니다.'],Houseware:['친환경 생활 세정제','생활 공간을 편리하게 관리하는 세정 제품입니다.'],Smart:['스마트 환경 센서','실내 환경을 확인할 수 있는 센서 제품입니다.'],Tech:['다목적 산업용 세정제','설비와 부품의 오염을 관리하는 산업용 제품입니다.']};
  products[r[0]]=category.map(c=>({category:c,name:name+' '+types[c][0],summary:types[c][1]}));
  directory[r[0]]={companyNumber:'070-0000-'+String(index+100).padStart(4,'0'),homepage:'https://'+slug+'.example',logo:{name:name+'_로고.svg',url:'assets/company/'+slug+'-logo.svg'},brochure:{name:name+'_브로슈어.html',url:'assets/company/'+slug+'-brochure.html'},mainProducts:products[r[0]].map(p=>p.name).join(' / '),introductionKo:name+'는 '+category.join('·')+' 분야의 제품을 기획하고 공급하는 참가기업입니다. 실용성과 편의성을 고려한 제품을 선보이며 국내외 유통 협력과 수출 상담을 추진합니다. 본 내용은 화면 검토용 가상 기업 소개입니다.',contact:{name:r[4],mobile:r[5],email:'contact@'+slug+'.example'}};
 }
 function render(row,year,head,back){
  const r=[...(row||[])],sample=applications[r[0]];
  if(sample){r[1]=sample.name;r[2]=sample.businessNumber;r[3]=sample.booth;}
  fillDemo(r);
  const approvedOfflineYears=String(r[6]||'').match(/20\d{2}/g)||[],profile=approvedOfflineYears.includes(String(year))?directory[r[0]]:null;
  const value=v=>v===undefined||v===null||String(v).trim()===''?'-':E(v);
  const safeUrl=url=>{if(typeof url!=='string'||!url.trim())return '';try{const u=new URL(url,location.href);return ['http:','https:'].includes(u.protocol)?u.href:'';}catch{return '';}};
  const website=safeUrl(profile?.homepage),logo=safeUrl(profile?.logo?.url),brochure=safeUrl(profile?.brochure?.url);
  const qrName=GFAIR_DOWNLOAD_NAMES.safe(r[1]||'참가기업')+'_'+GFAIR_DOWNLOAD_NAMES.safe(r[3]||'미지정')+'_qr코드.png';
  const qr=GFAIR_DOWNLOAD_NAMES.png('GFAIR-DEMO|'+year+'|'+(r[0]||'')+'|'+(r[3]||''),qrName);
  const basic=[
   ['기업명',value(r[1])],
   ['QR코드','<div style="display:flex;align-items:center;gap:16px;white-space:normal"><img src="'+qr+'" alt="'+E(r[1]||'참가기업')+' 부스 QR코드" style="width:96px;height:auto;display:block"><a class="btn" href="'+qr+'" download="'+E(qrName)+'">QR 다운로드</a></div>'],
   ['부스 번호',value(r[3])],['사업자 번호',value(r[2])],
   ['기업 번호',value(profile?.companyNumber)],
   ['기업 홈페이지',website?'<a href="'+E(website)+'" target="_blank" rel="noopener noreferrer">'+E(profile.homepage)+'</a>':'-'],
   ['기업 로고 이미지',logo?'<a href="'+E(logo)+'" download="'+E(profile.logo.name)+'">'+E(profile.logo.name)+'</a>':value(profile?.logo?.name)],
   ['기업 브로슈어',brochure?'<a href="'+E(brochure)+'" download="'+E(profile.brochure.name)+'">'+E(profile.brochure.name)+'</a>':value(profile?.brochure?.name)],
   ['주요 제품명',value(profile?.mainProducts)],['기업 소개(국문)',value(profile?.introductionKo)],
  ];
  const contact=[['담당자 명',value(profile?.contact?.name)],['담당자 연락처',value(profile?.contact?.mobile)],['담당자 이메일',value(profile?.contact?.email)]];
  const section=(title,pairs)=>'<section class="panel detail-form-panel company-linked-section"><div class="panelhead"><h2>'+title+'</h2></div><dl class="detail-rows company-linked-grid">'+pairs.map(([label,content])=>{const half=label!=='주요 제품명'&&label!=='기업 소개(국문)';return '<dt>'+label+'</dt><dd class="'+(half?'company-half':'company-wide')+'" style="white-space:pre-wrap;overflow-wrap:anywhere">'+content+'</dd>';}).join('')+'</dl></section>';
  const items=products[r[0]]||[];
  const productRows=(items.length?items:[{}]).map(item=>'<tr><td>'+value(item.category)+'</td><td style="text-align:left">'+value(item.name)+'</td><td style="text-align:left;white-space:pre-wrap;overflow-wrap:anywhere">'+value(item.summary)+'</td></tr>').join('');
  const productSection='<section class="panel detail-form-panel company-linked-section"><div class="panelhead"><h2>제품 정보</h2></div><div class="tablewrap"><table><thead><tr><th>메인 카테고리</th><th>제품명</th><th>제품요약설명</th></tr></thead><tbody>'+productRows+'</tbody></table></div></section>';
  const style='<style>#app #content .company-linked-grid{grid-template-columns:140px minmax(0,1fr) 140px minmax(0,1fr)}#app #content .company-linked-grid .company-wide{grid-column:2/-1}@media(max-width:650px){#app #content .company-linked-grid{grid-template-columns:120px minmax(0,1fr)}#app #content .company-linked-grid dd{grid-column:2}}</style>';
  return style+head+section('기본 정보',basic)+section('담당자 정보',contact)+productSection+'<div class="formfooter">'+back+'</div>';
 }
 window.GFAIR_COMPANY_LINKED_DETAIL={render};
})();
