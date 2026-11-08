// 회원 등록은 기존 상세 화면의 입력 항목과 검증을 공유한다.
(()=>{'use strict';
 const configs=[
  ['BAS-03','BAS-04','PRE-01','PRE-02','F','해외바이어','exportOperator',4],
  ['BAS-05','BAS-06','EVT-01','EVT-03','K','국내바이어','buyOperator',3],
  ['BAS-07','BAS-08','EVT-02','EVT-04','I','통역원','exportOperator',3]
 ].map(([source,profile,eventList,eventDetail,prefix,label,operator,yearIndex])=>({source,profile,eventList,eventDetail,prefix,label,operator,yearIndex}));
 const storage='gfair-manual-members-v1',E=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));let ctx;
 const config=id=>configs.find(c=>[c.source,c.profile,c.eventList,c.eventDetail].includes(id));
 const canUse=(c,id)=>ctx.role()==='admin'||(![c.source,c.profile].includes(id)&&ctx.role()===c.operator);
 function mode(id){const q=new URLSearchParams(location.search);return q.get('memberMode')==='create'&&q.get('memberScreen')===id;}
 function clear(){const u=new URL(location.href);u.searchParams.delete('memberMode');u.searchParams.delete('memberScreen');history.replaceState(null,'',u.pathname+u.search+u.hash);}
 function open(id){const c=config(id);if(!c||!canUse(c,id))return;const target=id===c.source?c.profile:c.eventDetail,u=new URL(location.href);u.searchParams.set('memberMode','create');u.searchParams.set('memberScreen',target);history.replaceState(null,'',u.pathname+u.search+u.hash);ctx.nav(target);}
 function blank(){return {name:'',code:'등록 시 자동 발급',country:{name:'',code:''},phone:['010','',''],phoneRaw:'',emailLocal:'',emailDomain:'',memo:'',organization:'',invitationType:'',interpreterLanguages:[],history:[],companyName:'',companyCode:'',position:'',businessTypes:[],businessOther:'',distributionChannels:[],channelOther:'',website:'',address:'',companyIntro:'',interests:[]};}
 function render(id){const c=config(id);if(!c||!mode(id))return null;if(!canUse(c,id))return '<div class="empty">등록 권한이 없습니다.</div>';
  const template=document.createElement('template');template.innerHTML=GFAIR_OVERSEAS_BUYER_DETAIL.render([],[],ctx.toast,c.profile,{draft:blank()});const form=template.content.querySelector('form');form.dataset.memberRegistration=id;
  for(const name of ['buyerCode','interpreterCode']){const input=form.elements[name],cell=input?.closest('dd');if(cell){cell.previousElementSibling?.remove();cell.remove();}}
  for(const list of form.querySelectorAll('dl')){const cells=[...list.children];if(cells.length%4===2){cells.at(-2)?.classList.add('buyer-memo-label');cells.at(-1)?.classList.add('buyer-memo');}}
  for(const name of ['buyerName','interpreterName','birthDate']){const input=form.elements[name];if(!input)continue;input.removeAttribute('readonly');input.removeAttribute('aria-readonly');input.required=true;input.value='';if(name==='birthDate'){input.type='date';input.max=new Intl.DateTimeFormat('sv-SE',{timeZone:'Asia/Seoul'}).format(new Date());}else input.maxLength=100;const label=input.closest('dd').previousElementSibling;label.insertAdjacentHTML('beforeend','<span class="required-asterisk" role="img" aria-label="필수">*</span>');}
  for(const section of form.querySelectorAll('section'))if(section.querySelector('.overseas-buyer-history'))section.remove();
  form.querySelector('.formfooter a').href='#'+(id===c.profile?c.source:c.eventList);form.querySelector('[type="submit"]').textContent='중복확인 후 등록';
  return template.innerHTML;
 }
 function save(form){const id=form.dataset.memberRegistration,c=config(id);if(!c||!mode(id)||!canUse(c,id))throw Error('등록 권한과 화면을 확인해 주세요.');const f=form.elements,name=(f.buyerName||f.interpreterName).value.trim(),dob=f.birthDate.value,year=String(ctx.year()),source=ctx.source(c.source),rows=source.rows.map(r=>r.slice()),births={...(source.screen.ui.birthDates||{})};
  if(!name)throw Error('이름을 입력해 주세요.');if(!/^\d{4}-\d{2}-\d{2}$/.test(dob)||dob>f.birthDate.max||new Date(dob+'T00:00:00Z').toISOString().slice(0,10)!==dob)throw Error('생년월일을 확인해 주세요.');
  const same=rows.filter(r=>String(r[1]).trim().toLocaleLowerCase()===name.toLocaleLowerCase()&&births[r[0]]===dob);if(same.length){window.alert('동일한 이름과 생년월일로 등록된 회원이 있습니다.\n기존 회원을 검색한 후 참여 여부를 변경해 행사에 추가해 주세요.');return;}
  if(!window.confirm('동일한 이름과 생년월일로 등록된 회원이 없습니다.\n등록하시겠습니까?'))return;
  const sequence=Math.max(0,...rows.filter(r=>new RegExp('^'+c.prefix+year+'\\d{4}$').test(r[0])).map(r=>Number(r[0].slice(-4))))+1;if(sequence>9999)throw Error('발급 가능한 회원코드를 초과했습니다.');const code=c.prefix+year+String(sequence).padStart(4,'0'),languages=Array.from({length:5},(_,i)=>f['language'+(i+1)]?.value).filter(Boolean),country=f.buyerCountry?.value||'',organization=f.companyName?.value.trim()||'',row=c.prefix==='F'?[code,name,country,'',year,'신규']:[code,name,c.prefix==='I'?languages.join(' / '):organization,year,'신규'];rows.push(row);births[code]=dob;
  const local=new Map(Object.entries(localStorage)),session=new Map(Object.entries(sessionStorage)),oldBirths=source.screen.ui.birthDates;try{
   source.screen.ui.birthDates=births;GFAIR_OVERSEAS_BUYER_DETAIL.register(form,row,rows,c.profile,year);GFAIR_PARTICIPATION.set(c.source,row,year,true);
   let stored;try{stored=JSON.parse(sessionStorage.getItem(storage)||'{}');}catch{stored={};}stored[c.source]={rows:rows.filter(r=>r[0]===code||stored[c.source]?.rows?.some(old=>old[0]===r[0])),births:{...(stored[c.source]?.births||{}),[code]:dob}};sessionStorage.setItem(storage,JSON.stringify(stored));source.screen.ui.rows=rows;ctx.setRows(c.source,rows);
  }catch(error){source.screen.ui.birthDates=oldBirths;for(const[store,before]of[[localStorage,local],[sessionStorage,session]]){for(const key of Object.keys(store))if(!before.has(key))store.removeItem(key);for(const[key,value]of before)store.setItem(key,value);}GFAIR_OVERSEAS_BUYER_DETAIL.discardRegistration(code);throw error;}
  clear();ctx.nav(id===c.profile?c.source:c.eventList);ctx.toast('등록했습니다. '+(c.prefix==='F'?'QR이':'ID·비밀번호와 QR이')+' 자동 발급되었습니다.');
 }
 window.GFAIR_MEMBER_REGISTRATION={mode,clear,render,save,open,config,heading(id){const c=config(id),basic=id===c.profile,list=basic?c.source:c.eventList;return '<div class="pagehead"><div><nav class="breadcrumb" aria-label="현재 위치"><a href="#MON-01">홈</a><span>›</span><span>'+(basic?'기본정보관리':'행사정보')+'</span><span>›</span><a href="#'+list+'">'+c.label+(basic?' 관리':'')+'</a><span>›</span><span aria-current="page">'+c.label+' 등록</span></nav><h1>'+c.label+' 등록</h1></div></div>';},bind(context){ctx=context;try{const data=JSON.parse(sessionStorage.getItem(storage)||'{}');for(const c of configs){const value=data[c.source];if(!value)continue;const source=ctx.source(c.source),rows=source.rows.slice();for(const row of value.rows||[])if(!rows.some(r=>r[0]===row[0]))rows.push(row);source.screen.ui.birthDates={...source.screen.ui.birthDates,...value.births};source.screen.ui.rows=rows;ctx.setRows(c.source,rows);}}catch{}},button(id){const c=config(id);return c&&[c.source,c.eventList].includes(id)&&canUse(c,id)?'<div class="formfooter"><button type="button" class="btn primary" data-member-register="'+id+'">등록</button></div>':'';}};
 document.addEventListener('click',ev=>{const button=ev.target.closest('[data-member-register]');if(button){ev.preventDefault();ev.stopImmediatePropagation();open(button.dataset.memberRegister);}},true);
})();
