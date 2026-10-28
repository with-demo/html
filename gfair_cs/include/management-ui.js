(()=>{'use strict';
 const E=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const companies=[{id:'OP-A',name:'㈜한울컨벤션',representative:'이상훈',address:'사업장 A',contact:'김도현'},{id:'OP-B',name:'㈜이음글로벌',representative:'정유진',address:'사업장 B',contact:'박지훈'},{id:'OP-C',name:'㈜다온엠앤씨',representative:'한지우',address:'사업장 C',contact:'최은서'}];
 companies.forEach((c,i)=>Object.assign(c,{phone:'010-0000-00'+String(i+1).padStart(2,'0'),email:'operator'+(i+1)+'@example.com'}));
 const assignments=[{year:'2027',company:'OP-A',type:'구매상담',id:'M0005',pw:generatedOperatorPassword()},{year:'2027',company:'OP-B',type:'수출상담',id:'',pw:''},{year:'2026',company:'OP-A',type:'구매상담',id:'M0003',pw:generatedOperatorPassword()},{year:'2026',company:'OP-B',type:'수출상담',id:'M0004',pw:generatedOperatorPassword()},{year:'2025',company:'OP-C',type:'구매상담',id:'M0001',pw:generatedOperatorPassword()},{year:'2025',company:'OP-B',type:'수출상담',id:'M0002',pw:generatedOperatorPassword()}];
 const staff=[{company:'OP-A',year:'2027',name:'이민서',code:'STAFF-001',id:'DEMO-BUY-01',pw:generatedOperatorPassword()},{company:'OP-B',year:'2027',name:'김정우',code:'STAFF-002',id:'DEMO-EXP-01',pw:generatedOperatorPassword()}];
 const adminDate=()=>new Intl.DateTimeFormat('sv-SE',{timeZone:'Asia/Seoul'}).format(new Date()).replaceAll('-','.');
 const admins=[{id:'DEMO-ADMIN-01',name:'윤서진',org:'운영기관',status:'사용',date:'2026.10.19'},{id:'DEMO-ADMIN-02',name:'임수현',org:'운영기관',status:'사용',date:'2026.10.18'},{id:'DEMO-ADMIN-03',name:'오지훈',org:'운영기관',status:'미사용',date:'2026.10.17'}];
 admins.forEach((a,i)=>Object.assign(a,{phone:'031-000-000'+i,mobile:'010-0000-000'+i,email:'admin'+(i+1)+'@example.com',passwordSet:true}));
 const state={screen:'BAS-15',role:'admin',event:'2026',company:'OP-A',admin:'DEMO-ADMIN-01',year:'전체',type:'전체',query:'',status:'전체',staffYear:'2027',staffQuery:'',staffStatus:'전체',staffScope:'전체',assignmentType:'',operatorDraft:null,shown:new Set(),notice:'',upload:null,staffUpload:null,staffId:null,peopleUpload:null};
 staff.forEach(member=>Object.assign(member,{org:'운영팀',status:'사용',date:'2026.10.19',phone:'',mobile:'',email:''}));
 const sampleStaffNames={'OP-A':['이민서','정하린','박서준','한예린','오지후'],'OP-B':['김정우','최유나','윤서연','서도윤','강수빈']};
 for(const company of ['OP-A','OP-B'])for(const year of ['2026','2027']){const prefix=company==='OP-A'?'BUY':'EXP';sampleStaffNames[company].forEach((name,index)=>{let member=staff.find(s=>s.company===company&&s.year===year&&s.name===name);if(!member){member={company,year,name,code:'STAFF-'+prefix+'-'+year+'-'+String(index+1).padStart(2,'0'),id:'DEMO-'+prefix+'-'+year+'-'+String(index+1).padStart(2,'0'),pw:generatedOperatorPassword()};staff.push(member);}Object.assign(member,{org:['운영팀','전산팀','상담지원팀','행사지원팀','홍보팀'][index],status:index===4?'미사용':'사용',date:'2026.10.'+String(19+index),phone:'031-000-00'+String(index+1).padStart(2,'0'),mobile:'010-0000-00'+String(index+1).padStart(2,'0'),email:prefix.toLowerCase()+'.staff'+(index+1)+'@example.com'});});}
 const accountIdTaken=id=>[...admins,...assignments,...staff].some(account=>account.id===id);
 function generatedOperatorPassword(){const bytes=crypto.getRandomValues(new Uint32Array(2));return String.fromCharCode(65+bytes[0]%26)+String(bytes[1]%1000000).padStart(6,'0');}
 const fields=['연도','상담 구분','기업코드','기업명','대표자','주소','담당자명'];
 const isAdmin=()=>state.role==='admin';
 const ownCompany=()=>state.role==='buyOperator'?'OP-A':state.role==='exportOperator'?'OP-B':null;
 const allowed=c=>isAdmin()||ownCompany()===c;
 const allowedAssignment=a=>allowed(a.company)&&(isAdmin()||a.type===(state.role==='buyOperator'?'구매상담':'수출상담'));
 const staffInYear=(member,company,year)=>member.company===company&&(member.year===year||assignments.some(a=>a.company===company&&a.year===year&&a.staffMembers?.includes(member)));
 const assignedStaff=assignment=>[...new Set([...(assignment.staffMembers||[]),...staff.filter(member=>member.company===assignment.company&&member.year===assignment.year)])];
 const years=()=>[...new Set(assignments.map(a=>a.year))].sort().reverse();
 const options=(items,value)=>items.map(x=>`<option${String(x)===String(value)?' selected':''}>${E(x)}</option>`).join('');
 const button=(action,text,attrs='',primary=false)=>`<button type="button" class="btn${primary?' primary':''}" data-management-action="${action}" ${attrs}>${E(text)}</button>`;
 const field=(label,html)=>`<label class="field"><span>${label}</span>${html}</label>`;
 const input=(name,label,value='',required=false)=>field(label,`<input name="${name}" value="${E(value)}" ${required?'required':''}>`);
 const note=()=>state.notice?`<p class="notice" role="status">${E(state.notice)}</p>`:'';
 const table=(headers,body)=>`<div class="tablewrap"><table><thead><tr>${headers.map(h=>`<th scope="col">${h}</th>`).join('')}</tr></thead><tbody>${body||`<tr><td colspan="${headers.length}"><div class="empty">조회 결과가 없습니다.</div></td></tr>`}</tbody></table></div>`;
 function operatorList(){
  const query=state.query.toLocaleLowerCase(),scope=window.GFAIR_SEARCH_SCOPE?.('query')||'전체';
  const rr=assignments.filter(a=>allowedAssignment(a)&&(state.year==='전체'||a.year===state.year)&&(state.type==='전체'||a.type===state.type)).filter(a=>{const c=companies.find(c=>c.id===a.company);return !query||String(scope==='기업'?c.name:scope==='담당자'?c.contact:[c.name,c.contact].join(' ')).toLocaleLowerCase().includes(query)});
  const body=rr.slice().sort((a,b)=>b.year.localeCompare(a.year)).map(a=>{const c=companies.find(c=>c.id===a.company);return '<tr><td>'+E(a.year)+'</td><td>'+E(a.type)+'</td><td><button type="button" class="list-name-link" data-management-company="'+E(c.id)+'" data-management-year="'+E(a.year)+'" data-management-type="'+E(a.type)+'" aria-label="'+E(a.year+'년 '+c.name+' 상세')+'">'+E(c.name)+'</button></td><td>'+E(c.contact)+'</td><td>'+E(c.status||'사용')+'</td><td>'+assignedStaff(a).length+'명</td></tr>'}).join('');
  return note()+'<div class="management-actions">'+(isAdmin()?button('operator-create','등록','','true'):'')+'</div><form data-management-form="search" class="panel filters">'+field('연도','<select name="year">'+options(['전체',...years()],state.year)+'</select>')+'<fieldset class="management-type-filter"><legend>구분</legend><div class="management-type-options">'+['전체','구매상담','수출상담'].map(t=>'<label><input type="radio" name="type" value="'+t+'"'+(state.type===t?' checked':'')+'>'+t+'</label>').join('')+'</div></fieldset>'+field('키워드 검색','<input name="query" value="'+E(state.query)+'" placeholder="기업·담당자 검색">')+'<div class="row"><button class="btn primary" type="submit">검색</button>'+button('reset','초기화')+'</div></form><section class="panel operator-list"><div class="panelhead"><h2>운영용역사 목록</h2><span>'+rr.length+'건</span></div>'+table(['연도','구분','기업명','대표담당자','사용여부','하위 담당자수'],body)+'</section>';
 }
 const eventYears=()=>[...new Set((window.GFAIR_SCREENS||[]).flatMap(g=>g.screens||[]).find(s=>s.id==='BAS-01')?.ui?.rows?.map(r=>String(r[0]))||[])].sort((a,b)=>Number(b)-Number(a));
 function operatorRegistration(){
  const radio=(name,values)=>'<div class="management-type-options" role="radiogroup" aria-label="'+(name==='type'?'구분':'사용여부')+'">'+values.map((value,i)=>'<label><input type="radio" name="'+name+'" value="'+value+'" required '+(!i?'checked':'')+'>'+value+'</label>').join('')+'</div>';
  const yearOptions='<option value="">선택하세요</option>'+options(eventYears(),state.event);
  const phone='<div class="operator-phone"><select name="phonePrefix" aria-label="담당자 연락처 앞자리" required>'+options(['010','011','016','017','018','019','02','031','032','033','041','042','043','044','051','052','053','054','055','061','062','063','064','070'],'010')+'</select><span>-</span><input name="phoneMiddle" type="tel" inputmode="numeric" pattern="[0-9]{3,4}" maxlength="4" aria-label="담당자 연락처 가운데 자리" required><span>-</span><input name="phoneLast" type="tel" inputmode="numeric" pattern="[0-9]{4}" maxlength="4" aria-label="담당자 연락처 마지막 자리" required></div>';
  const accountField=field('아이디 *','<div class="admin-id-check"><input name="id" required autocomplete="off" aria-describedby="operator-id-guide"><button type="button" class="btn" data-admin-id-check>중복확인</button></div><span data-admin-id-result role="status" aria-live="polite"></span><small id="operator-id-guide">운영용역사 최고관리자용 계정 ID입니다. 비밀번호는 등록 시 자동 생성됩니다.</small>').replace('class="field"','class="field wide"');
  return note()+'<form data-management-form="operator-create" class="panel detail-form-panel"><div class="panelhead"><h2>운영용역사 기본정보</h2></div><div class="detail-rows form-rows">'+accountField+field('행사연도 *','<select name="year" required>'+yearOptions+'</select>')+field('구분 *',radio('type',['구매상담','수출상담']))+input('company','기업명 *','',true)+input('name','담당자 이름 *','',true)+field('담당자 연락처 *',phone)+field('담당자 이메일','<div class="buyer-email admin-email"><input name="emailLocal" maxlength="64" aria-label="이메일 아이디"><span aria-hidden="true">@</span><input name="emailDomain" maxlength="253" aria-label="이메일 도메인"><select name="emailPreset" aria-label="이메일 도메인 선택">'+options(adminMailDomains,'')+'<option value="" selected>직접입력</option></select></div>')+field('사용여부 *',radio('status',['사용','미사용'])).replace('class="field"','class="field wide"')+'</div><p data-management-error role="alert"></p><div class="formfooter"><a href="#BAS-15" class="btn">목록</a><button type="submit" class="btn primary">등록</button></div></form>';
 }
 function operatorBasicForm(c,assignment){
  const draft=state.operatorDraft||{year:assignment.year,type:assignment.type,company:c.name,name:c.contact,status:c.status||'사용',phone:c.phone||'',email:c.email||''};
  const radio=(name,values,label)=>'<div class="management-type-options" role="radiogroup" aria-label="'+label+'">'+values.map(value=>'<label><input type="radio" name="'+name+'" value="'+value+'" required'+(draft[name]===value?' checked':'')+'>'+value+'</label>').join('')+'</div>';
  const availableYears=[...new Set([...eventYears(),assignment.year])].sort((a,b)=>Number(b)-Number(a));
  const parts=draft.phone.split('-'),[emailLocal='',emailDomain='']=draft.email.split('@'),preset=adminMailDomains.includes(emailDomain);
  const phone='<div class="operator-phone"><select name="phonePrefix" required aria-label="담당자 연락처 앞자리">'+options(['010','011','016','017','018','019','02','031','032','033','041','042','043','044','051','052','053','054','055','061','062','063','064','070'],parts[0]||'010')+'</select><span>-</span><input name="phoneMiddle" value="'+E(parts[1]||'')+'" type="tel" inputmode="numeric" pattern="[0-9]{3,4}" maxlength="4" required aria-label="담당자 연락처 가운데 자리"><span>-</span><input name="phoneLast" value="'+E(parts[2]||'')+'" type="tel" inputmode="numeric" pattern="[0-9]{4}" maxlength="4" required aria-label="담당자 연락처 마지막 자리"></div>';
  const email='<div class="buyer-email admin-email"><input name="emailLocal" value="'+E(emailLocal)+'" maxlength="64" aria-label="담당자 이메일 아이디"><span aria-hidden="true">@</span><input name="emailDomain" value="'+E(emailDomain)+'" maxlength="253" aria-label="담당자 이메일 도메인"'+(preset?' readonly':'')+'><select name="emailPreset" aria-label="담당자 이메일 도메인 선택">'+options(adminMailDomains,preset?emailDomain:'')+'<option value=""'+(!preset?' selected':'')+'>직접입력</option></select></div>';
  return '<form id="operator-basic-form" data-management-form="operator-save" class="panel detail-form-panel page-information-body operator-basic"><div class="detail-rows form-rows">'+field('아이디','<input name="id" value="'+E(assignment.id||'')+'" readonly aria-readonly="true"><small>운영용역사 최고관리자용 계정 ID입니다. 기존 아이디는 변경할 수 없습니다.</small>').replace('class="field"','class="field wide"')+field('행사연도 *','<select name="year" required>'+options(availableYears,draft.year)+'</select>')+field('구분 *',radio('type',['구매상담','수출상담'],'구분'))+input('company','기업명 *',draft.company,true)+input('name','담당자 이름 *',draft.name,true)+field('담당자 연락처 *',phone)+field('담당자 이메일',email)+field('사용여부 *',radio('status',['사용','미사용'],'사용여부')).replace('class="field"','class="field wide operator-use-field"')
+'</div><p data-management-error role="alert"></p></form>';
 }
 function rememberOperatorDraft(event){
  const form=event.target.closest?.('[data-management-form="operator-save"]');if(!form)return;
  const data=new FormData(form);state.operatorDraft=Object.fromEntries(['year','type','company','name','status'].map(key=>[key,String(data.get(key)||'')]));state.operatorDraft.phone=data.get('phoneMiddle')||data.get('phoneLast')?[data.get('phonePrefix'),data.get('phoneMiddle'),data.get('phoneLast')].join('-'):'';state.operatorDraft.email=data.get('emailLocal')||data.get('emailDomain')?[data.get('emailLocal'),data.get('emailDomain')].join('@'):'';
 }
 document.addEventListener('input',rememberOperatorDraft);document.addEventListener('change',rememberOperatorDraft);
 function operatorDetail(){
  const c=companies.find(c=>c.id===state.company);if(!c||!allowed(c.id))return '<div class="empty">담당 운영용역사만 확인할 수 있습니다.</div>';
  const history=assignments.filter(a=>a.company===c.id&&allowedAssignment(a)).sort((a,b)=>b.year.localeCompare(a.year));
  const assignment=history.find(a=>a.year===state.staffYear&&(!state.assignmentType||a.type===state.assignmentType))||history.find(a=>a.year===state.staffYear)||history[0];
  if(!assignment)return '<div class="empty">배정된 행사 정보가 없습니다.</div>';
  state.staffYear=assignment.year;
  const query=state.staffQuery,children=assignedStaff(assignment).filter(s=>(state.staffStatus==='전체'||(s.status||'사용')===state.staffStatus)&&(!query||String(({'아이디':s.id,'이름':s.name,'소속':s.org}[state.staffScope]||[s.id,s.name,s.org].join(' '))).includes(query)));
  const password=(record,key)=>record.pw?'<span class="management-password">'+(state.shown.has(key)?E(record.pw):'••••••')+'</span>'+button('toggle-password',state.shown.has(key)?'숨기기':'보기','data-key="'+E(key)+'" aria-pressed="'+state.shown.has(key)+'"'):'—';
  const representative='<tr class="operator-representative" data-operator-representative><td><span class="badge operator-representative-label">대표담당자</span> '+E(c.contact)+'</td><td>'+E(c.org||'운영팀')+'</td><td>'+E(c.phone||'미등록')+'</td><td>'+E(c.email||'미등록')+'</td><td>'+E(assignment.id||'미발급')+'</td><td>'+password(assignment,'representative|'+assignment.year+'|'+c.id+'|'+assignment.type)+'</td><td>'+E(c.status||'사용')+'</td></tr>';
  const rows=children.map(s=>'<tr><td>'+E(s.name)+'</td><td>'+E(s.org||'미등록')+'</td><td>'+E(s.phone||'미등록')+'</td><td>'+E(s.email||'미등록')+'</td><td>'+E(s.id||'미발급')+'</td><td>'+password(s,'staff|'+s.id)+'</td><td>'+E(s.status||'사용')+'</td></tr>').join('');
  return note()+'<h2 class="page-section-title">운영용역사 기본정보</h2>'+operatorBasicForm(c,assignment)+'<div class="page-bottom-actions operator-basic-actions" aria-label="기본정보 작업"><a href="#BAS-15" class="btn">목록</a><button type="submit" form="operator-basic-form" class="btn primary">수정</button></div><div class="page-information-heading"><h2 class="page-section-title">담당자 정보</h2><span>하위 담당자 '+children.length+'명</span></div><section class="panel page-information-body operator-staff"><form data-management-form="operator-staff-search" class="filters">'+'<fieldset class="management-type-filter"><legend>사용여부</legend><div class="management-type-options">'+['전체','사용','미사용'].map(value=>'<label><input type="radio" name="staffStatus" value="'+value+'"'+(state.staffStatus===value?' checked':'')+'>'+value+'</label>').join('')+'</div></fieldset>'+field('키워드 검색','<input type="search" name="query" value="'+E(state.staffQuery)+'" aria-label="키워드 검색" placeholder="검색어를 입력해 주세요">')+'<div class="row"><button class="btn primary" type="submit">검색</button>'+button('operator-staff-reset','초기화')+'</div></form>'+table(['이름','소속','연락처','이메일','발급ID','PW','사용여부'],representative+rows+((query||state.staffStatus!=='전체')&&!children.length?'<tr><td colspan="7"><div class="empty">검색 조건에 맞는 하위 담당자가 없습니다.</div></td></tr>':''))+'</section>';
 }
 function staffSection(c,history){const staffRows=[...new Set(history.filter(a=>a.year===state.staffYear).flatMap(assignedStaff))];return `<section class="panel pad"><div class="panelhead"><h2>하위 담당자</h2><span>${state.staffYear}년 · ${staffRows.length}명</span></div><div class="management-form">${field('행사 연도',`<select data-management-staff-year>${options([...new Set(history.map(a=>a.year))],state.staffYear)}</select>`)}${!isAdmin()?'<a class="btn primary" href="#COM-08">담당자 등록</a>':''}${button('staff-template','담당자 엑셀 양식 다운로드')}${button('staff-upload-open','담당자 엑셀 일괄 업로드','','true')}</div>${table(['담당자코드','이름','발급 ID','임시 PW','행사 연도','계정 상태'],staffRows.map(s=>{const key='staff|'+s.id;return `<tr><td>${E(s.code)}</td><td>${E(s.name)}</td><td>${E(s.id)}</td><td><span class="management-password">${state.shown.has(key)?E(s.pw):'••••••'}</span>${button('toggle-password',state.shown.has(key)?'숨기기':'보기',`data-key="${E(key)}" aria-pressed="${state.shown.has(key)}"`)}</td><td>${s.year}</td><td>발급 완료</td></tr>`}).join(''))}</section>`;}

 function staffRegistration(company,history){if(!history.some(a=>a.year===state.staffYear))return '<div class="empty">등록 가능한 배정 행사가 없습니다.</div>';return adminEditor(!state.staffId,true);}
 function personRows(staffMode=false){const source=staffMode?staff.filter(member=>staffInYear(member,ownCompany(),state.staffYear)):admins;const scope=window.GFAIR_SEARCH_SCOPE?.('query')||'전체';return source.filter(a=>(state.status==='전체'||(a.status||'사용')===state.status)&&(!state.query||String(({'아이디':a.id,'이름':a.name,'소속':a.org}[scope]||[a.id,a.name,a.org].join(' '))).includes(state.query)));}
 function peopleList(staffMode=false){
  const rr=personRows(staffMode),title=staffMode?'담당자':'구매·수출 상담시스템 관리자';
  return note()+'<div class="management-actions">'+button(staffMode?'staff-create-open':'admin-create',staffMode?'등록':'관리자 등록','','true')+'</div><form data-management-form="admin-search" class="panel filters"><fieldset class="management-type-filter"><legend>사용여부</legend><div class="management-type-options">'+['전체','사용','미사용'].map(value=>'<label><input type="radio" name="status" value="'+value+'"'+(state.status===value?' checked':'')+'>'+value+'</label>').join('')+'</div></fieldset>'+field('통합검색','<input name="query" value="'+E(state.query)+'" placeholder="이름, ID, 소속을 검색하세요.">')+'<div class="row"><button type="submit" class="btn primary">검색</button>'+button('reset','초기화')+'</div></form><section class="panel people-list"><div class="panelhead"><h2>'+title+' '+rr.length+'명</h2>'+(staffMode?'<div class="row">'+button('people-export','엑셀 다운로드')+button('people-upload-open','엑셀 일괄 업로드')+'</div>':'')+'</div>'+table(staffMode?['이름','소속','연락처','이메일','발급ID','PW','사용여부']:['이름','아이디','소속','사용여부','등록일'],rr.map(a=>'<tr><td class="management-name"><button type="button" class="list-name-link" '+(staffMode?'data-management-staff-id':'data-management-admin')+'="'+E(a.id)+'" aria-label="'+E(a.name)+' 상세">'+E(a.name)+'</button></td>'+(staffMode?'<td>'+E(a.org||'미등록')+'</td><td>'+E(a.phone||'미등록')+'</td><td>'+E(a.email||'미등록')+'</td><td>'+E(a.id)+'</td><td>'+(a.pw?'<span class="management-password">'+(state.shown.has('staff|'+a.id)?E(a.pw):'••••••')+'</span>'+button('toggle-password',state.shown.has('staff|'+a.id)?'숨기기':'보기','data-key="'+E('staff|'+a.id)+'" aria-pressed="'+state.shown.has('staff|'+a.id)+'"'):'—')+'</td><td><span class="badge">'+E(a.status||'사용')+'</span></td>':'<td>'+E(a.id)+'</td><td>'+E(a.org||'미등록')+'</td><td><span class="badge">'+E(a.status||'사용')+'</span></td><td>'+E(a.date||'미등록')+'</td>')+'</tr>').join(''))+'</section>';
 }
 function adminList(){return peopleList(false);}
 const adminPasswordPattern=/^(?=.*[A-Za-z])(?=.*[0-9])[\x21-\x7E]{8,20}$/;
 const adminPasswordGuide='영문·숫자 포함 8~20자리로 입력해 주세요. (특수문자 사용 가능, 공백 불가)';
 const adminPhonePrefixes=['02','031','032','033','041','042','043','044','051','052','053','054','055','061','062','063','064','070','050'];
 const adminMobilePrefixes=['010','011','016','017','018','019'];
 const adminMailDomains=['naver.com','gmail.com','daum.net','hanmail.net','nate.com','outlook.com','hotmail.com'];
 function adminContactField(key,label,value,prefixOverride){const parts=String(value||'').split('-'),prefixes=prefixOverride||(key==='phone'?adminPhonePrefixes:adminMobilePrefixes),prefix=parts[0]||prefixes[0];return field(label,'<div class="buyer-phone admin-phone"><select name="'+key+'Prefix" aria-label="'+label+' 앞자리">'+options([...new Set([...prefixes,prefix])],prefix)+'</select><span aria-hidden="true">-</span><input name="'+key+'Middle" value="'+E(parts[1]||'')+'" inputmode="numeric" maxlength="4" aria-label="'+label+' 가운데 번호"><span aria-hidden="true">-</span><input name="'+key+'Last" value="'+E(parts[2]||'')+'" inputmode="numeric" maxlength="4" aria-label="'+label+' 마지막 4자리"></div>');}
 function adminEditor(create=new URLSearchParams(location.search).get('adminMode')==='create',staffMode=false){
 const a=create?{id:'',name:'',org:'',status:'사용',date:adminDate(),phone:'',mobile:'',email:''}:staffMode?staff.find(a=>a.id===state.staffId&&staffInYear(a,ownCompany(),state.staffYear)):admins.find(a=>a.id===state.admin);if(!a)return '<div class="empty">관리자를 찾을 수 없습니다.</div>';
 const [emailLocal='',emailDomain='']=String(a.email||'').split('@'),preset=adminMailDomains.includes(emailDomain);
 const idField=field('아이디 *','<div class="admin-id-check"><input name="id" value="'+E(a.id)+'" required autocomplete="off" '+(create?'':'readonly aria-readonly="true"')+'>'+(create?'<button type="button" class="btn" data-admin-id-check>중복확인</button>':'')+'</div>'+(create?'<span data-admin-id-result role="status" aria-live="polite"></span>':''));
 const orgField=input('org','소속',a.org);
 const email=field('이메일','<div class="buyer-email admin-email"><input name="emailLocal" value="'+E(emailLocal)+'" maxlength="64" aria-label="이메일 아이디"><span aria-hidden="true">@</span><input name="emailDomain" value="'+E(emailDomain)+'" maxlength="253" aria-label="이메일 도메인"'+(preset?' readonly':'')+'><select name="emailPreset" aria-label="이메일 도메인 선택">'+options(adminMailDomains,preset?emailDomain:'')+'<option value=""'+(!preset?' selected':'')+'>직접입력</option></select></div>');
 const wide=html=>html.replace('class="field"','class="field wide"');
 const passwordFields=staffMode?'':field('비밀번호'+(create?' *':''),'<input type="password" name="password" value="" autocomplete="new-password" '+(create?'required minlength="8" maxlength="20" pattern="'+E(adminPasswordPattern.source)+'" aria-describedby="admin-password-guide" title="'+E(adminPasswordGuide)+'"':'placeholder="변경 시에만 입력해 주세요"')+'>'+(create?'<small id="admin-password-guide" class="admin-password-guide">'+adminPasswordGuide+'</small>':''))+(create?field('비밀번호 확인 *','<input type="password" name="passwordConfirm" value="" required maxlength="20" autocomplete="new-password">'):'');
 const basicFields=create?wide(idField)+passwordFields+input('name','이름 *',a.name,true)+orgField+(staffMode?wide(adminContactField('phone','연락처',a.phone||a.mobile,[...adminMobilePrefixes,...adminPhonePrefixes.filter(p=>p!=='050')])):adminContactField('phone','전화번호',a.phone)+adminContactField('mobile','휴대전화번호',a.mobile))+wide(email):((staffMode?wide(idField):idField)+passwordFields+input('name','이름 *',a.name,true)+orgField)+(staffMode?wide(adminContactField('phone','연락처',a.phone||a.mobile,[...adminMobilePrefixes,...adminPhonePrefixes.filter(p=>p!=='050')])):adminContactField('phone','전화번호',a.phone)+adminContactField('mobile','휴대전화번호',a.mobile))+email;
 return note()+'<form data-management-form="'+(staffMode?(create?'person-create':'person-save'):(create?'admin-create':'admin-save'))+'" class="panel detail-form-panel"><div class="panelhead"><h2>'+(staffMode?'담당자':'관리자')+' 기본정보</h2></div><div class="detail-rows form-rows">'+basicFields+'<fieldset class="field wide admin-use-field"><legend>사용여부</legend>'+['사용','미사용'].map(status=>'<label><input type="radio" name="status" value="'+status+'"'+(status===a.status?' checked':'')+'>'+status+'</label>').join('')+'</fieldset></div><p data-management-error role="alert"></p><div class="formfooter"><a href="#'+(staffMode?'COM-07':'BAS-16')+'" class="btn">목록</a><button class="btn primary" type="submit">'+(create?'등록':'저장')+'</button></div></form>';
 }
 document.addEventListener('click',event=>{const button=event.target.closest('[data-admin-id-check]');if(!button)return;event.preventDefault();const form=button.closest('form'),id=form.elements.id.value.trim(),result=form.querySelector('[data-admin-id-result]'),exists=['operator-create','person-create'].includes(form.dataset.managementForm)?accountIdTaken(id):admins.some(a=>a.id===id);delete form.dataset.checkedAdminId;result.textContent=!id?'아이디를 입력해 주세요.':exists?'이미 등록된 아이디입니다.':'사용 가능한 아이디입니다.';if(id&&!exists)form.dataset.checkedAdminId=id;});
 document.addEventListener('change',event=>{const select=event.target;if(!select.matches('[data-management-form^="admin-"] [name=emailPreset], [data-management-form^="person-"] [name=emailPreset], [data-management-form^="operator-"] [name=emailPreset]'))return;const domain=select.form.elements.emailDomain;domain.readOnly=!!select.value;if(select.value)domain.value=select.value;select.form.elements.emailLocal.setCustomValidity('');rememberOperatorDraft(event);});
 document.addEventListener('input',event=>{const input=event.target;if(!input.closest('[data-management-form^="admin-"], [data-management-form^="person-"], [data-management-form^="operator-"]'))return;input.setCustomValidity?.('');if(input.name==='id'){delete input.form.dataset.checkedAdminId;const result=input.form.querySelector('[data-admin-id-result]');if(result)result.textContent='';}if(['password','passwordConfirm'].includes(input.name))input.form.elements.passwordConfirm?.setCustomValidity('');if(/^(phone|mobile)(Middle|Last)$/.test(input.name))input.value=input.value.replace(/\D/g,'').slice(0,4);if(['emailLocal','emailDomain'].includes(input.name))input.form.elements.emailLocal.setCustomValidity('');});

 function adminDetail(){return adminEditor();}
 function adminMode(create){const url=new URL(location.href);if(create)url.searchParams.set('adminMode','create');else url.searchParams.delete('adminMode');history.replaceState(null,'',url.pathname+url.search+url.hash);}

 function operatorAccount(){
  const c=companies.find(c=>c.id===ownCompany()),history=assignments.filter(a=>a.company===c?.id&&allowedAssignment(a)).sort((a,b)=>b.year.localeCompare(a.year));
  if(!c)return '<div class="empty">소속 운영용역사를 확인할 수 없습니다.</div>';
  if(state.screen==='COM-08')return staffRegistration(c,history);
  if(state.screen==='COM-06')return `${note()}<section class="panel detail-form-panel"><div class="panelhead"><h2>내 계정 정보</h2><span>${E(c.id)}</span></div><dl class="detail-rows">${[['사용구분',state.role==='buyOperator'?'구매상담 운영용역사':'수출상담 운영용역사'],['계정 구분','대표 담당자'],['소속 기업',c.name],['담당 상담',state.role==='buyOperator'?'구매상담':'수출상담'],['선택 행사','G-FAIR KOREA '+state.event]].map(([k,v])=>`<dt>${E(k)}</dt><dd>${E(v)}</dd>`).join('')}</dl><div class="formfooter"><a href="#COM-07" class="btn primary">담당자 관리</a></div></section>`;
  if(!history.some(a=>a.year===state.staffYear))state.staffYear=history[0]?.year||'';
  return peopleList(true);
 }
 function render(){
  if(['COM-06','COM-07','COM-08'].includes(state.screen))return ['buyOperator','exportOperator'].includes(state.role)?`<div data-management-root>${operatorAccount()}</div>`:'<div class="empty">운영용역사 대표 담당자용 화면입니다.</div>';
  if(!isAdmin())return '<div class="empty">이용 권한이 없습니다.</div>';return `<div data-management-root>${state.screen==='BAS-15'?operatorList():state.screen==='BAS-17'?operatorDetail():state.screen==='BAS-19'?operatorRegistration():state.screen==='BAS-16'?adminList():adminDetail()}</div>`;}
 function paint(){const r=document.querySelector('[data-management-root]');if(r)r.outerHTML=render();}
 function message(text){state.notice=text;paint();}
 function modal(title,body){const d=document.getElementById('dialog');document.getElementById('dialog-content').innerHTML=`<div class="dialoghead"><h2>${title}</h2>${button('close','닫기')}</div><div class="dialogbody">${body}<p data-management-error role="alert"></p></div>`;d.showModal();}
 function close(){document.getElementById('dialog').close();}

 const staffFields=['행사 연도','기업코드','담당자코드','담당자명'];
 document.addEventListener('change',event=>{if(event.target.matches('[data-management-form="people-upload"] input[type="file"]')){state.peopleUpload=null;state.peopleUploadEpoch=(state.peopleUploadEpoch||0)+1;const result=document.querySelector('[data-people-upload-result]');if(result)result.innerHTML='';}});
 function staffAllowed(){return ((state.screen==='BAS-17'&&isAdmin())||(['COM-07','COM-08'].includes(state.screen)&&['buyOperator','exportOperator'].includes(state.role)))&&allowed(state.company)&&assignments.some(a=>a.company===state.company&&a.year===state.staffYear&&allowedAssignment(a));}
 function validateStaffRows(rows,company,year,existing){
  const header=rows[0]||[];
  if(!staffFields.every(h=>header.includes(h)))throw Error('담당자 전용 양식의 열 이름을 확인해 주세요.');
  const indices=staffFields.map(h=>header.indexOf(h)),seen=new Set(existing.filter(s=>staffInYear(s,company,year)).map(s=>s.code)),good=[],errors=[];
  rows.slice(1).forEach((row,i)=>{
   const r=indices.map(j=>String(row[j]??'').trim());if(r.every(v=>!v))return;
   let error='';if(r.some(v=>!v))error='필수값 누락';else if(r[0]!==year||r[1]!==company)error='선택한 행사 연도·소속 용역사와 불일치';else if(seen.has(r[2]))error='동일 행사·소속의 담당자코드 중복';
   if(error)errors.push({line:i+2,error});else{seen.add(r[2]);good.push({code:r[2],name:r[3]})}
  });
  if(!good.length&&!errors.length)throw Error('등록할 담당자가 없습니다.');
  return {good,errors};
 }

 const peopleAllowed=()=>state.screen==='COM-07'&&staffAllowed();
 async function peopleDownload(rows,name){const blob=await GFAIRWorkbook.write(rows),url=URL.createObjectURL(blob),link=document.createElement('a');link.href=url;link.download=name;link.click();setTimeout(()=>URL.revokeObjectURL(url),1000);}
 async function peopleAction(a){
  if(!peopleAllowed())return;
  const staffMode=state.screen==='COM-07',title=staffMode?'담당자':'관리자';
  if(a==='people-export'){await peopleDownload([['이름','소속','연락처','이메일','발급ID','사용여부'],...personRows(staffMode).map(r=>[r.name,r.org||'미등록',r.phone||'미등록',r.email||'미등록',r.id,r.status||'사용'])],title+'_목록.xlsx');message('현재 검색 결과를 엑셀로 다운로드했습니다.');return;}
  if(a==='people-template'){await GFAIRMemberUpload.downloadTemplate('COM-07',state.staffYear);return;}
  if(a==='people-upload-open'){
   state.peopleUpload=null;state.peopleUploadEpoch=(state.peopleUploadEpoch||0)+1;modal(title+' 엑셀 일괄 업로드','<p>엑셀 양식을 다운로드하여 담당자 정보를 입력한 뒤 작성한 파일을 첨부해 주세요. 등록정보 시트만 읽으며 [예시] 행은 등록하지 않습니다. 아이디·이름·연락처는 필수, 사용여부는 Y/N이며 빈 값은 Y로 처리합니다.</p>'+button('people-template','등록 양식 다운로드')+'<form data-management-form="people-upload">'+field('엑셀 파일','<input type="file" name="file" accept=".xlsx" required><small class="hint">XLSX 파일 1개 · 용량 제한 없음</small>')+'<button type="submit" class="btn primary">파일 검증</button></form><div data-people-upload-result></div>');return;
  }

 }

 async function action(b){
  const a=b.dataset.managementAction;
  if(a.startsWith('people-')){await peopleAction(a);return;}
  if(a==='close'){state.peopleUpload=null;close();return;}
  if(a==='reset'){if(['BAS-15','BAS-16','COM-07'].includes(state.screen))window.GFAIR_RESET_SEARCH_SCOPE?.();state.query='';state.year='전체';state.type='전체';state.status='전체';message('');return;}
  if(a==='operator-staff-reset'){window.GFAIR_RESET_SEARCH_SCOPE?.();state.staffScope='전체';state.staffQuery='';state.staffStatus='전체';message('');return;}
  if(a==='toggle-password'&&allowed(state.company)){const k=b.dataset.key;state.shown.has(k)?state.shown.delete(k):state.shown.add(k);paint();return;}
  if(a==='issue'&&isAdmin()){
   const item=assignments.find(a=>a.company===state.company&&a.year===b.dataset.year&&a.type===b.dataset.type);if(!item||item.id)return;
   const n=Math.max(0,...assignments.map(a=>Number(a.id.replace('M',''))||0))+1;
   item.id='M'+String(n).padStart(4,'0');item.pw=generatedOperatorPassword();message('현재 연도의 임시 계정을 발급했습니다.');return;
  }
  if(a==='staff-template'&&staffAllowed()){
   const blob=await GFAIRWorkbook.write([staffFields,[state.staffYear,state.company,'DEMO-STAFF-NEW','정하린']]),url=URL.createObjectURL(blob),link=document.createElement('a');link.href=url;link.download=GFAIR_DOWNLOAD_NAMES.template(state.staffYear,'담당자');link.click();setTimeout(()=>URL.revokeObjectURL(url),1000);message('선택 행사·소속이 기입된 담당자 양식을 다운로드했습니다.');return;
  }
  if(a==='staff-upload-open'&&staffAllowed()){
   state.staffUpload=null;
   modal('하위 담당자 엑셀 일괄 업로드',`<p>${E(companies.find(c=>c.id===state.company).name)} · ${state.staffYear}년</p><form data-management-form="staff-upload"><p>담당자코드·이름을 작성해 업로드해 주세요. 계정 ID·PW는 직접 입력하지 않습니다.</p>${field('담당자 엑셀 파일','<input type="file" name="file" accept=".xlsx" required>')}<button type="submit" class="btn primary">파일 검증</button></form><div data-management-upload-result></div><p class="small">검토용 발급이며 실제 로그인 계정은 생성하지 않습니다.</p>`);return;
  }
  if(a==='staff-upload-confirm'){
   const upload=state.staffUpload;if(!staffAllowed()||!upload||upload.company!==state.company||upload.year!==state.staffYear)return;
   if(upload.rows.some(r=>staff.some(s=>staffInYear(s,upload.company,upload.year)&&s.code===r.code)))return message('담당자 목록이 변경되었습니다. 다시 검증해 주세요.');
   upload.rows.forEach(r=>{const n=staff.length+1;staff.push({company:upload.company,year:upload.year,code:r.code,name:r.name,id:'DEMO-S'+String(n).padStart(4,'0'),pw:generatedOperatorPassword()})});
   const n=upload.rows.length;state.staffUpload=null;close();message(n+'명의 담당자를 등록하고 계정을 일괄 발급했습니다.');return;
  }
  if(a==='staff-create-open'&&staffAllowed()){state.staffId=null;state.notice='';location.hash='COM-08';return;}
  if(a==='operator-create'&&isAdmin()){state.notice='';location.hash='BAS-19';return;}
  if(a==='admin-create'&&isAdmin()){adminMode(true);location.hash='BAS-18';return;}
  if(a==='template'&&isAdmin()){
   const rows=[fields,['2027','구매상담','DEMO-UPLOAD-01','업로드 용역사','대표','사업장','담당자']];
   const blob=await GFAIRWorkbook.write(rows),url=URL.createObjectURL(blob),link=document.createElement('a');link.href=url;link.download=GFAIR_DOWNLOAD_NAMES.template((document.querySelector('#event-picker')?.value||'2026').match(/20\d{2}/)?.[0]||'2026','운영용역사');link.click();setTimeout(()=>URL.revokeObjectURL(url),1000);message('검토용 XLSX 양식을 다운로드했습니다. 행을 수정해 업로드해 주세요.');return;
  }
  if(a==='upload-open'&&isAdmin()){state.upload=null;modal('운영용역사 엑셀 일괄 업로드',`<form data-management-form="upload"><p>제공된 XLSX 양식의 열 이름을 유지해 주세요. 연도·상담 구분·기업코드·기업명은 필수입니다.</p>${field('엑셀 파일', '<input type="file" name="file" accept=".xlsx" required>')}<button class="btn primary" type="submit">파일 검증</button></form><div data-management-upload-result></div>`);return;}
  if(a==='upload-confirm'&&isAdmin()&&state.upload?.length){
   state.upload.forEach(r=>{let c=companies.find(c=>c.id===r[2]);if(!c){c={id:r[2],name:r[3],representative:r[4]||'미등록',address:r[5]||'미등록',contact:r[6]||'미등록'};companies.push(c)}assignments.push({year:r[0],type:r[1],company:c.id,id:'',pw:''})});
   const n=state.upload.length;state.upload=null;close();state.year='전체';state.query='';message(n+'건을 목록에 반영했습니다. 기업 상세에서 연도별 계정을 발급할 수 있습니다.');
  }
 }
 document.addEventListener('click',ev=>{if(ev.target.closest('a[href="#BAS-16"]'))adminMode(false);const b=ev.target.closest('[data-management-action]');if(b){if(!document.querySelector('[data-management-root]'))return;ev.preventDefault();ev.stopImmediatePropagation();action(b).catch(e=>message(e.message));return;}const member=ev.target.closest('[data-management-staff-id]');if(member&&staffAllowed()){ev.preventDefault();state.staffId=member.dataset.managementStaffId;state.notice='';location.hash='COM-08';return;}const companyName=ev.target.closest('button[data-management-company]');if(companyName){ev.preventDefault();ev.stopImmediatePropagation();openRow(companyName);return;}const adminName=ev.target.closest('button[data-management-admin]');if(adminName){ev.preventDefault();ev.stopImmediatePropagation();openRow(adminName);return;}const row=ev.target.closest('[data-management-company],[data-management-admin]');if(!row||ev.target.closest('button,a,input,select,textarea'))return;openRow(row);},true);
 function openRow(row){state.notice='';state.shown.clear();if(row.dataset.managementCompany){if(!allowed(row.dataset.managementCompany))return;state.company=row.dataset.managementCompany;state.staffYear=row.dataset.managementYear;state.assignmentType=row.dataset.managementType||'';window.GFAIR_RESET_SEARCH_SCOPE?.();state.staffScope='전체';state.staffQuery='';state.staffStatus='전체';state.operatorDraft=null;location.hash='BAS-17'}else{if(!isAdmin())return;state.admin=row.dataset.managementAdmin;adminMode(false);location.hash='BAS-18'}}
 document.addEventListener('keydown',ev=>{const row=ev.target.closest('[data-management-company],[data-management-admin]');if(row&&ev.target===row&&['Enter',' '].includes(ev.key)){ev.preventDefault();openRow(row)}});
 document.addEventListener('change',ev=>{if(ev.target.matches('[data-management-staff-year]')){state.staffYear=ev.target.value;paint()}});
 document.addEventListener('submit',async ev=>{
  const f=ev.target;if(!f.matches('[data-management-form]'))return;ev.preventDefault();ev.stopImmediatePropagation();if(!f.reportValidity())return;
  const fd=new FormData(f),v=k=>String(fd.get(k)||'').trim(),type=f.dataset.managementForm;
  const fail=text=>{const err=f.querySelector('[data-management-error]')||document.querySelector('#dialog[open] [data-management-error]')||document.querySelector('[data-management-error]');if(err)err.textContent=text;else message(text)};

  if(type==='people-upload'){
   state.peopleUpload=null;if(!peopleAllowed())return;
   const area=f.parentElement.querySelector('[data-people-upload-result]');area.innerHTML='';
   const epoch=state.peopleUploadEpoch=(state.peopleUploadEpoch||0)+1,context={screen:state.screen,company:ownCompany(),year:state.staffYear};
   const active=()=>epoch===state.peopleUploadEpoch&&context.screen===state.screen&&context.company===ownCompany()&&context.year===state.staffYear&&f.isConnected&&document.getElementById('dialog').open&&peopleAllowed();
   const submit=f.querySelector('button[type="submit"]');submit.disabled=true;
   try{
    const file=fd.get('file');if(!file||!file.name)throw Error('파일을 먼저 선택해 주세요.');if(!/\.xlsx$/i.test(file.name))throw Error('XLSX 파일을 선택해 주세요.');
    const data=await GFAIRWorkbook.read(file,{sheetName:'등록정보',unlimitedFileSize:true,unlimitedRows:true});if(!active())return;
    const checked=GFAIRPeopleExcel.validate(data,[...admins,...assignments,...staff].map(a=>a.id));
    for(const row of checked.good){const {password,...person}=row;staff.push({...person,company:context.company,year:context.year,code:row.id,pw:generatedOperatorPassword(),date:adminDate()});}
    f.reset();if(!checked.errors.length)close();paint();
    window.alert(GFAIRMemberUpload.summary(checked.entries,checked.good.length));
   }catch(error){if(active())window.alert('파일 검증에 실패했습니다.\n사유: '+(error.message||'파일을 확인할 수 없습니다.'));}
   finally{if(f.isConnected)submit.disabled=false;}
   return;
  }
  if(type==='operator-save'){
   if(!isAdmin()||state.screen!=='BAS-17')return;
   const c=companies.find(c=>c.id===state.company),assignment=assignments.find(a=>a.company===state.company&&a.year===state.staffYear&&(!state.assignmentType||a.type===state.assignmentType));
   if(!c||!assignment)return fail('수정할 운영용역사를 찾을 수 없습니다.');
   const name=v('name'),company=v('company'),year=v('year'),operatorType=v('type'),status=v('status'),phone=v('phoneMiddle')||v('phoneLast')?[v('phonePrefix'),v('phoneMiddle'),v('phoneLast')].join('-'):'',email=v('emailLocal')||v('emailDomain')?[v('emailLocal'),v('emailDomain')].join('@'):'';
   if(v('id')!==assignment.id)return fail('기존 아이디는 변경할 수 없습니다.');
   if(!name)return fail('필수 항목을 확인해 주세요.');
   if(!phone||!/^0[0-9]{1,2}-?[0-9]{3,4}-?[0-9]{4}$/.test(phone))return fail('담당자 연락처는 가운데 3~4자리, 마지막 4자리로 입력해 주세요.');
   const emailProbe=document.createElement('input');emailProbe.type='email';emailProbe.value=email;if(email&&!emailProbe.checkValidity())return fail('담당자 이메일을 올바르게 입력해 주세요.');
   if(!company||![...eventYears(),assignment.year].includes(year)||!['구매상담','수출상담'].includes(operatorType)||!['사용','미사용'].includes(status))return fail('필수 항목을 확인해 주세요.');
   if(companies.some(other=>other.id!==c.id&&other.name===company))return fail('같은 기업명이 이미 등록되어 있습니다.');
   if(assignments.some(other=>other!==assignment&&other.company===c.id&&other.year===year&&other.type===operatorType))return fail('같은 행사연도·구분에 이미 등록된 운영용역사입니다.');
   const previousYear=assignment.year;
   // Keep the existing staff association and issued credentials when the year is corrected.
   if(year!==previousYear)assignment.staffMembers=assignedStaff(assignment);
   c.name=company;c.contact=name;c.status=status;c.phone=phone;c.email=email;assignment.year=year;assignment.type=operatorType;
   state.staffYear=year;state.assignmentType=operatorType;state.operatorDraft=null;state.shown.clear();
   message('운영용역사 기본정보를 수정했습니다. 현재 탭에만 반영됩니다.');return;
  }
  if(type==='operator-staff-search'){state.staffScope=window.GFAIR_SEARCH_SCOPE?.('query')||'전체';state.staffQuery=v('query');state.staffStatus=['전체','사용','미사용'].includes(v('staffStatus'))?v('staffStatus'):'전체';state.notice='';paint();return;}
  if(type==='search'||type==='admin-search'){state.query=v('query');state.year=v('year')||'전체';state.type=v('type')||'전체';state.status=v('status')||'전체';state.notice='';paint();return;}
  if(type==='operator-create'){
   const local=v('emailLocal'),domain=v('emailDomain'),probe=document.createElement('input');probe.type='email';probe.value=local+'@'+domain;
   if((local||domain)&&(!local||!domain||!probe.checkValidity())){const text='이메일 아이디와 도메인을 올바르게 입력해 주세요.';f.elements.emailLocal.setCustomValidity(text);f.elements.emailLocal.reportValidity();return fail(text);}
   const companyName=v('company'),name=v('name'),year=v('year'),operatorType=v('type');
   if(!isAdmin())return;
   if(!companyName||!name||!eventYears().includes(year)||!['구매상담','수출상담'].includes(operatorType)||!['사용','미사용'].includes(v('status')))return fail('필수 항목을 확인해 주세요.');
   if(companies.some(c=>c.name===companyName))return fail('같은 용역사가 이미 등록되어 있습니다.');
   const accountId=v('id');if(!accountId)return fail('아이디를 입력해 주세요.');
   if(accountIdTaken(accountId))return fail('이미 등록된 아이디입니다.');
   if(f.dataset.checkedAdminId!==accountId)return fail('아이디 중복확인을 진행해 주세요.');
   const id='OP-'+String.fromCharCode(65+companies.length),company={id,name:companyName,representative:name,address:'미등록',contact:name,email:local&&domain?local+'@'+domain:'',phone:[v('phonePrefix'),v('phoneMiddle'),v('phoneLast')].join('-'),status:v('status')};
   companies.push(company);assignments.push({year,company:id,type:operatorType,id:accountId,pw:generatedOperatorPassword()});state.year='전체';state.type='전체';state.query='';state.company=id;state.staffYear=year;state.notice='운영용역사 정보와 최고관리자용 계정을 등록했습니다. 비밀번호가 자동 생성되었습니다. 현재 탭에만 반영됩니다.';location.hash='BAS-15';return;
  }
  if(type==='staff-upload'){
   state.staffUpload=null;const result=document.querySelector('[data-management-upload-result]');result.innerHTML='';
   try{
    if(!staffAllowed())throw Error('담당 행사 범위를 확인해 주세요.');
    const file=fd.get('file');if(!/\.xlsx$/i.test(file.name))throw Error('XLSX 파일을 선택해 주세요.');
    const rr=await GFAIRWorkbook.read(file),checked=validateStaffRows(rr,state.company,state.staffYear,staff);
    if(checked.errors.length){result.innerHTML=`<p>정상 ${checked.good.length}건 · 오류 ${checked.errors.length}건</p>${table(['엑셀 행','오류 사유'],checked.errors.map(e=>`<tr><td>${e.line}</td><td>${E(e.error)}</td></tr>`).join(''))}<p>오류를 수정한 뒤 다시 검증해 주세요. 아직 등록·발급하지 않았습니다.</p>`;return;}
    state.staffUpload={company:state.company,year:state.staffYear,rows:checked.good};
    result.innerHTML=`<p>정상 ${checked.good.length}건 · 오류 0건. 계정 일괄 발급 대기</p>${table(['담당자코드','이름','발급 상태'],checked.good.map(r=>`<tr><td>${E(r.code)}</td><td>${E(r.name)}</td><td>발급 대기</td></tr>`).join(''))}${button('staff-upload-confirm','계정 일괄 발급','','true')}`;
   }catch(e){fail(e.message)}
   return;
  }
  const staffMode=['person-create','person-save'].includes(type);if(staffMode?!staffAllowed():!isAdmin())return;
  if(['admin-create','admin-save','person-create','person-save'].includes(type)){
   const creating=type.endsWith('create');
   const error=f.querySelector('[data-management-error]');if(error)error.textContent='';
   const contacts={};for(const key of (staffMode?['phone']:['phone','mobile'])){const middle=v(key+'Middle'),last=v(key+'Last'),validMiddle=key==='phone'?/^\d{3,4}$/:/^\d{4}$/;if((middle||last)&&(!validMiddle.test(middle)||!/^\d{4}$/.test(last))){const text=staffMode?'연락처는 가운데 3~4자리, 마지막 4자리로 입력해 주세요.':key==='phone'?'전화번호는 가운데 3~4자리, 마지막 4자리로 입력해 주세요.':'휴대전화번호를 4자리씩 입력해 주세요.';const target=!validMiddle.test(middle)?f.elements[key+'Middle']:f.elements[key+'Last'];target.setCustomValidity(text);target.reportValidity();return fail(text);}contacts[key]=middle&&last?v(key+'Prefix')+'-'+middle+'-'+last:'';}if(staffMode)contacts.mobile='';
   const local=v('emailLocal'),domain=v('emailDomain'),emailProbe=document.createElement('input');emailProbe.type='email';emailProbe.value=local+'@'+domain;if((local||domain)&&(!local||!domain||!emailProbe.checkValidity())){const text='이메일 아이디와 도메인을 올바르게 입력해 주세요.';f.elements.emailLocal.setCustomValidity(text);f.elements.emailLocal.reportValidity();return fail(text);}contacts.email=local&&domain?local+'@'+domain:'';

   if(!v('id')||!v('name'))return fail('아이디와 이름은 공백만 입력할 수 없습니다.');
   if(creating&&f.dataset.checkedAdminId!==v('id'))return fail('아이디 중복확인을 진행해 주세요.');
   if(!staffMode&&creating&&fd.get('password')!==fd.get('passwordConfirm'))return fail('비밀번호와 비밀번호 확인이 일치하지 않습니다.');
   if(!staffMode&&creating&&!v('password'))return fail('비밀번호를 입력해 주세요.');
   if(!staffMode&&creating&&!adminPasswordPattern.test(String(fd.get('password')||'')))return fail(adminPasswordGuide);
   if(!staffMode&&fd.get('password')&&!v('password'))return fail('비밀번호는 공백만 입력할 수 없습니다.');
   if(!creating&&v('id')!==(staffMode?state.staffId:state.admin))return fail('기존 아이디는 변경할 수 없습니다.');
   if((staffMode?staff:admins).some(a=>a.id===v('id')&&(creating||a.id!==(staffMode?state.staffId:state.admin))))return fail('이미 등록된 아이디입니다.');
   if(creating&&staffMode&&accountIdTaken(v('id')))return fail('이미 등록된 아이디입니다.');
   if(staffMode){const data={id:v('id'),name:v('name'),org:v('org')||'미등록',status:v('status')||'사용',...contacts};if(creating)staff.push({...data,company:ownCompany(),year:state.staffYear,code:v('id'),pw:generatedOperatorPassword(),date:adminDate()});else Object.assign(staff.find(a=>a.id===state.staffId&&staffInYear(a,ownCompany(),state.staffYear)),data);state.notice='담당자 정보를 저장했습니다. 현재 탭에만 반영됩니다.';state.staffId=null;location.hash='COM-07';return;}
   if(creating){admins.push({id:v('id'),name:v('name'),org:v('org')||'미등록',status:v('status')||'사용',date:adminDate(),...contacts,passwordSet:true});state.notice='관리자 정보를 저장했습니다. 실제 계정·권한은 변경되지 않습니다.';adminMode(false);location.hash='BAS-16';return;}
   else{Object.assign(admins.find(a=>a.id===state.admin),{name:v('name'),org:v('org')||'미등록',status:v('status'),...contacts,...(v('password')?{passwordSet:true}:{})})}
   f.elements.password.value='';state.notice='관리자 정보를 저장했습니다. 실제 계정·권한은 변경되지 않습니다.';let notice=document.querySelector('[data-management-root]>.notice');if(!notice){notice=document.createElement('p');notice.className='notice';notice.setAttribute('role','status');f.before(notice);}notice.textContent=state.notice;return;
  }
  if(type==='upload'){
   state.upload=null;const result=document.querySelector('[data-management-upload-result]');result.innerHTML='';
   try{
    const file=fd.get('file');if(!/\.xlsx$/i.test(file.name))throw Error('XLSX 파일을 선택해 주세요.');
    const rr=await GFAIRWorkbook.read(file),header=rr[0]||[];if(!fields.every(x=>header.includes(x)))throw Error('제공된 양식의 열 이름을 확인해 주세요.');
    const indices=fields.map(x=>header.indexOf(x)),seen=new Set(assignments.map(a=>a.year+'|'+a.type+'|'+a.company)),good=[],errors=[];
    rr.slice(1).forEach((r,i)=>{const row=indices.map(j=>String(r[j]??'').trim());if(row.every(x=>!x))return;const key=row[0]+'|'+row[1]+'|'+row[2];let err='';
     if(row.slice(0,4).some(x=>!x))err='필수값 누락';else if(!/^\d{4}$/.test(row[0]))err='연도는 네 자리 숫자';else if(!['구매상담','수출상담'].includes(row[1]))err='상담 구분 확인';else if(seen.has(key))err='동일 연도·구분·기업 중복';
     else if(companies.some(c=>c.id===row[2]&&c.name!==row[3])||good.some(r=>r[2]===row[2]&&r[3]!==row[3]))err='같은 기업코드의 기업명 불일치';
     if(err)errors.push([i+2,err]);else{seen.add(key);good.push(row)}
    });
    if(!good.length&&!errors.length)throw Error('등록할 데이터가 없습니다.');
    if(errors.length){result.innerHTML=table(['엑셀 행','오류'],errors.map(([n,e])=>`<tr><td>${n}</td><td>${E(e)}</td></tr>`).join(''))+'<p>오류를 수정한 뒤 다시 업로드해 주세요. 아직 목록에 반영하지 않았습니다.</p>';return;}
    state.upload=good;result.innerHTML=`<p>정상 ${good.length}건 · 오류 0건. 아래 내용을 확인한 후 등록하세요.</p>${table(['연도','상담 구분','기업코드','기업명'],good.map(r=>`<tr>${r.slice(0,4).map(x=>`<td>${E(x)}</td>`).join('')}</tr>`).join(''))}${button('upload-confirm','목록에 등록','','true')}`;
   }catch(e){fail(e.message)}
  }
 },true);
 window.addEventListener('hashchange',()=>{state.shown.clear();state.operatorDraft=null;state.peopleUpload=null;if(location.hash!=='#BAS-18')adminMode(false)});
 window.GFAIR_MANAGEMENT={render(screen,role,event){if(['COM-06','COM-07','COM-08'].includes(screen)){if(state.event!==event||!['COM-06','COM-07','COM-08'].includes(state.screen))state.staffYear=event;state.company=role==='exportOperator'?'OP-B':'OP-A'}if(state.role!==role){state.operatorDraft=null;state.shown.clear();state.query='';state.year='전체';state.type='전체';state.notice='';state.company=role==='exportOperator'?'OP-B':'OP-A'}if(screen==='COM-08'&&state.screen!=='COM-07'&&state.screen!=='COM-08')state.staffId=null;if(screen==='BAS-17'&&state.screen!=='BAS-17'){window.GFAIR_RESET_SEARCH_SCOPE?.();state.staffScope='전체';state.staffQuery='';state.staffStatus='전체';}state.screen=screen;state.role=role;state.event=event;return render()}};
 window.dispatchEvent(new Event('management-ui-ready'));
})();
