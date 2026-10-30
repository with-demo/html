// 사용자 제공 국내·해외 바이어 HWP v3 설문. 문항·보기와 원문 미확정 문구 유지.
(()=>{'use strict';
 const opts=labels=>labels.map(label=>({label,extra:/기타|Other|수도권 외/i.test(label)}));
 const q=(title,type,labels=[],settings={})=>({title,type,required:true,options:opts(labels),...settings});
 const single=(title,labels,settings)=>q(title,'단일응답형',labels,settings);
 const multi=(title,labels,maxSelections=0)=>q(title,'복수응답형',labels,{maxSelections});
 const text=(title)=>q(title,'단답형',[],{required:false});
 const essay=(title)=>q(title,'서술형',[],{required:false});
 const koScale=['매우 불만족','약간 불만족','보통','약간 만족','매우 만족'];
 const enScale=['Very Dissatisfied','Somewhat Dissatisfied','Neutral','Somewhat Satisfied','Very Satisfied'];
 const scale=(title,labels=koScale,settings)=>q(title,'척도형',labels,settings);
 const group=(title,questions)=>({title,questions});
 const domestic=[
  group('문1. 기본 사항',[
   single('참여기관',['경기도경제과학진흥원','한국중소벤처기업유통원','동반성장위원회']),
   single('고객유형',['공공기관','민간기업']),
   single('소속기업유형',['대·중견기업','중소기업','개인'],{visibleWhen:{question:'0-1',option:'1'}}),
   single('성별',['남성','여성']),single('연령대',['20대','30대','40대','50대','60대 이상']),
   single('근무지',['서울','경기도','인천','수도권 외(도)']),
   single('업종',['유통업','도소매업','공공기관/연구기관','기타']),
   single('계약 권한',['없음','구매·계약 제안 및 실무 검토 가능','구매·계약 의사결정 참여권한','구매·계약 최종 결정 권한'])]),
  group('문2. 구매상담회 참여 이유',[multi('귀하가 G-FAIR KOREA 2026 구매상담회에 참여하신 이유는 무엇입니까?',['신규 거래처 발굴','기존 거래처 상담','관심 기업 방문/상담','시장조사·트렌드 파악','기타'],2)]),
  group('문3. 관심 상담 품목',[multi('G-FAIR KOREA 구매상담회에서 귀하께서 관심을 갖고 상담하신 품목은 무엇입니까?',['푸드','뷰티','리빙(생활용품)','테크','기타'])]),
  group('문4. 제품 상담 시 고려요인',[multi('G-FAIR KOREA 2026에서 제품 상담 시, 주요 고려요인이 무엇입니까?',['가격·거래조건','제품 품질·디자인','상품 차별성·시장성','제품 공급 안정성','브랜드 인지도','참가기업 상담 준비도','기타'],2)]),
  group('문5. 실제 구매·주문·발주 여부',[
   single('G-FAIR KOREA 구매상담회를 통해 실제 구매하거나 주문·발주를 결정한 제품이 있습니까?',['있음','없음']),
   single('실제 구매한 품목',['푸드','뷰티','리빙','테크'],{visibleWhen:{question:'4-0',option:'0'}})]),
  group('문6. 구매·소싱 수요 적합성',[single('상담한 기업·제품이 귀사의 구매·소싱 수요에 얼마나 적합했습니까?',['매우 적합','적합','보통','부적합','매우 부적합'])]),
  group('문7. 신규 기업·제품 발굴',[single('향후 거래를 검토할만한 신규 기업 또는 제품을 발굴하셨습니까?',['예','아니오','아직 판단하기 어려움'])]),
  group('문8. 행사 운영 만족도',[
   scale('전시장 · 행사장에 오시는 교통편 만족도'),scale('전시장 · 전시장 시설 만족도'),
   scale('전시/상담 제품 · 전시 품목의 다양성'),scale('전시/상담 제품 · 전시 상품의 수준(디자인/품질/가격 적정성)'),
   scale('지원 서비스 · 구매상담회 사전 안내 및 정보 제공'),scale('지원 서비스 · 구매상담회 현장 상담 진행 및 운영 지원'),
   scale('‘행사 운영’에 대한 전반적 만족도')]),
  group('문9. 상담 참여 성과',[
   scale('신규 거래처 발굴 및 후속 거래기회 확보'),scale('중소기업 제품에 대한 이해 및 인식 향상'),scale('‘참가 성과’에 대한 전반적 만족도')]),
  group('문10. 차년도 개선사항',[multi('차년도 G-FAIR KOREA 구매상담회 운영시 개선이 필요한 사항은 무엇입니까?',['참가기업·품목 다양성','제품 품질·경쟁력','기업·제품 사전정보','구매상담회 사전 안내','현장 상담 운영 및 지원','특별한 개선사항 없음','기타'],2)]),
  group('문11. 차년도 참가 계획',[single('내년도 G-FAIR KOREA 전시회 및 구매상담회(바이어 초청) 참가에 대한 검토단계',['꼭 참가할 것','참가의사 있음','보통','추후 검토 예정','없음'])]),
  group('문12. 제안사항',[essay('「G-FAIR KOREA」의 향후 발전을 위한 제안사항이 있으시면 자유롭게 작성하여 주시기 바랍니다.')]),
  group('응답자 인적 사항',[text('회사명'),text('담당자'),text('부서'),text('휴대전화번호')])
 ];
 const overseas=[
  group('Q1. Basic information',[
   single('Type of organization',['Public Institution','Private Company']),
   single('Type of private company',['Large/Mid-sized Enterprise','SME','Individual'],{visibleWhen:{question:'0-0',option:'1'}}),
   single('Gender',['Male','Female']),single('Age Group',['20s','30s','40s','50s','60s or older']),
   single('Industry type',['Manufacturing','Distribution','Import','Export','Other']),
   single('Country',['Greater China','Japan','Southeast Asia','West Asia','North America','South America','Russia/CIS','Oceania','Africa','Middle East','Europe','Ohters'])]),
  group('Q2. Reason for participation',[single('What was your main reason for participating in G-FAIR KOREA 2026? (Select only one)',['Discovering new business partners','Discovering new products/items','Meeting existing business partners','Market research','Others'])]),
  group('Q3. Product categories',[multi('Please indicate the product categories you had meetings for or made purchases from at G-FAIR KOREA 2026. (Select all that apply)',['Beauty','Food','Living','Tech'])]),
  group('Q4. Factors considered when purchasing',[multi('What are the main factors you consider when purchasing products at G-FAIR KOREA 2026? (Select all that apply)',['Price competitiveness','Product quality / design','Product innovation','Preparation level of participating companies','Others'])]),
  group('Q5. Satisfaction with event management',[
   scale('Exhibition Operation · Export Business Meetings',enScale),
   scale('Exhibition Operation · Networking reception for buyers (If applicable)',enScale,{required:false}),
   scale('Exhibition (Consultation) Products · Diversity of exhibited items',enScale),
   scale('Exhibition (Consultation) Products · Level of products (design / quality / price / innovation)',enScale),
   scale('Exhibition (Consultation) Products · (To be determined)',enScale,{required:false,reviewNote:'원문 미확정 항목 · 확정 필요'}),
   scale('Support Services · Satisfaction with interpreters',enScale),
   scale('Support Services · Satisfaction with matching agencies (KBC/GBC)',enScale),
   scale('Overall satisfaction with event management',enScale)]),
  group('Q6. Satisfaction with participation results',[
   ...['Meetings that you need business partner','Purchase items that you need business partner','Increase in awareness of Korean products','Overall satisfaction with exhibition participation results'].map(title=>scale(title,['Very dissatisfied','Dissatisfied','Neutral','Satisfied','Very satisfied']))]),
  group('Q7. Participation experience',[
   single('Experience participating in G-FAIR KOREA',['once for the first time','2 times','3 times','4 times','5 times or more']),
   single('Experience participating in other export consultation meetings in 2026',['once for the first time','2 times','3 times','4 times','5 times or more'])]),
  group('Q8. Plan for next year',[single('G-FAIR KOREA 2027 will also be held in the second half of 2027. Please indicate your level of intention to participate next year.',['Definitely Participate','Likely Participate','Neutral','Considering Later','No Plan to Participate'])]),
  group('Q9. Opinions or suggestions',[essay('Please share any opinions or suggestions to help improve G-FAIR KOREA in the future.')]),
  group('Respondent information',[text('Company name'),text('Name of person in charge'),text('Mobile number'),text('email')])
 ];
 const common={year:2026,minutes:10,active:true,start:'2026-10-31',end:'2026-12-31',created:'2026-10-28',audience:0,responses:[],sourceVersion:'HWP v3'};
 window.GFAIR_SURVEY_EXAMPLES=[
  {...common,id:'SUR-2026-DOMESTIC-V3',target:'국내 바이어',title:'2026년 G-FAIR 국내 바이어 만족도 조사',intro:'G-FAIR KOREA 2026에 참석해 주시고, 참가기업과의 구매상담을 통해 국내 중소기업의 국내 유통망 진출 및 판로 확대에 힘을 보태주셔서 진심으로 감사드립니다. 더 나은 사업 운영을 위해 소중한 의견을 듣고자 하오니 잠시만 시간을 내어 응답 부탁드립니다. “G-FAIR KOREA 2027”에서 다시 뵙길 기대합니다.\n※ 응답 내용은 통계 분석 및 전시회 개선을 위한 목적으로만 활용됩니다.\n주최/주관: 경기도/경기도경제과학진흥원 · 조사기관: ㈜디자인축',outro:'♣ 응답해 주셔서 감사합니다. ♣',groups:domestic},
  {...common,id:'SUR-2026-OVERSEAS-V3',target:'해외 바이어',title:'2026년 G-FAIR 해외 바이어 만족도 조사',intro:'Gyeonggi Province and the Gyeonggi Business & Science Accelerator (GBSA) are organizing G-FAIR KOREA 2026 to support small and medium-sized enterprises (SMEs). We kindly invite you to take a moment to complete this survey to help us improve future events. Thank you for visiting G-FAIR KOREA 2026. We look forward to welcoming you again at G-FAIR KOREA 2027!\nHost/Organizer: Gyeonggi Province / GBSA · Survey Conducted by: DESIGNCHUK Co., Ltd.',outro:'♣ Thank you very much for completing the survey! ♣',groups:overseas},
  {...common,id:'SUR-2026-INTERPRETER-PENDING',target:'통역원',title:'2026년 G-FAIR 통역원 만족도 조사',minutes:null,active:false,start:'2026-10-31',end:'2026-12-31',intro:'',outro:'',groups:[],materialPending:true,sourceVersion:'자료 수급 예정'}
 ];
})();
