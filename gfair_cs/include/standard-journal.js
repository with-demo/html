/* 전달 표준양식 V1.2.3의 업무 규칙. 프로젝트의 기존 표·폼 디자인을 사용한다. */
(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.GFAIR_STANDARD_JOURNAL=api;})(typeof window==='undefined'?globalThis:window,()=>{
 'use strict';
 const schema='gfair-standard-journal-v1';
 const levels=[['C1','계약 확정'],['C2','계약 검토할 것'],['C3','보통'],['C4','아마 계약하지 않을 것'],['C5','의사 없음']];
 const issues=[['price','가격·수수료'],['package','포장·디자인'],['cert','인증·규격'],['supply','공급량·납기·물류'],['other','기타']];
 const followTypes=[['F1','견적서·제안서 요청'],['F2','샘플 제공·테스트'],['F3','추가 미팅'],['F4','입점·계약 절차 협의'],['F5','기타']];
 const eligible=level=>['C1','C2'].includes(level);
 const E=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 function repeatedFiller(source){
  const raw=String(source||'').trim().replace(/[\u200B-\u200D\uFEFF]/g,'');
  if(/([^\s])\1{5,}/u.test(raw)||/[ \t]{10,}/.test(raw))return true;
  const counts=new Map();for(const line of raw.split(/[.!?。！？\n]+/).map(s=>s.replace(/\s+/g,' ').trim()).filter(s=>s.length>=7)){const n=(counts.get(line)||0)+1;counts.set(line,n);if(n>=3)return true;}
  const flat=Array.from(raw.replace(/\s+/g,'')).slice(0,10000).join('');
  for(let n=2;n<=Math.min(40,Math.floor(flat.length/3));n++){const required=n<8?5:3;if(n*required<24)continue;for(let i=0;i<=flat.length-n*required;i++){const part=flat.slice(i,i+n);let count=1;while(count<required&&flat.slice(i+count*n,i+(count+1)*n)===part)count++;if(count>=required)return true;}}
  return false;
 }
 function number(value){return value===''||value==null?null:Number(value);}
 function normalize(input){
  const purchase=input.type==='구매',factor=purchase?10000:1,can=eligible(input.consultationLevel),amount=number(input.standardAmount),contract=can&&!input.potentialUnknown?number(input.standardContract):null;
  return {journalSchema:schema,sellerCode:input.sellerCode||'',consultDate:input.consultDate||'',consultationLevel:input.consultationLevel||'',issueCode:input.issueCode||'',followUpYn:input.followUpYn||'',followUpType:input.followUpYn==='Y'?input.followUpType||'':'',content:String(input.content||'').trim(),contractProgressCount:can?1:0,contractProgressRule:'C1_C2_ONLY',potentialAmountUnestimated:can&&(!!input.potentialUnknown||contract===null),consultAmountKrw:purchase?(amount===null?null:amount*factor):null,potentialAmountKrw:purchase?(contract===null?null:contract*factor):null,consultAmountUsd:purchase?null:amount,potentialAmountUsd:purchase?null:contract,amount:amount===null?null:amount*factor,contract:contract===null?null:contract*factor,currency:purchase?'KRW':'USD',contractCurrency:purchase?'KRW':'USD',companyConfirmedCode:input.companyConfirmedCode||''};
 }
 function validate(input){
  const errors=[],warnings=[],data=normalize(input),content=data.content,length=Array.from(content).length;
  if(!input.company||!input.sellerCode)errors.push(['company','참가기업을 선택해 주세요.']);
  if(input.companyConfirmedCode!==input.sellerCode)errors.push(['company','참가기업 정보를 확인하고 [기업 확인]을 눌러 주세요.']);
  if(!/^\d{4}-\d{2}-\d{2}$/.test(data.consultDate)||Number.isNaN(Date.parse(data.consultDate+'T00:00:00Z'))||new Date(data.consultDate+'T00:00:00Z').toISOString().slice(0,10)!==data.consultDate)errors.push(['consultDate','유효한 상담일자를 선택해 주세요.']);
  if(!levels.some(([v])=>v===data.consultationLevel))errors.push(['consultationLevel','상담수준을 선택해 주세요.']);
  if(input.issueCode&&!issues.some(([v])=>v===input.issueCode))errors.push(['issueCode','주요 보완사항을 다시 선택해 주세요.']);
  if(!['Y','N'].includes(data.followUpYn))errors.push(['followUpYn','후속조치 예정 여부를 선택해 주세요.']);
  if(data.followUpYn==='Y'&&!followTypes.some(([v])=>v===data.followUpType))errors.push(['followUpType','후속조치 유형을 선택해 주세요.']);
  if(length<250)errors.push(['content','핵심 상담내용을 250자 이상 작성해 주세요. (현재 '+length+'자)']);
  else if(repeatedFiller(content))errors.push(['content','동일 글자·문구·문장의 무의미한 반복 입력을 수정해 주세요.']);
  for(const [name,label]of [['standardAmount','상담액'],['standardContract','계약추진액']]){
   if(name==='standardContract'&&(!eligible(data.consultationLevel)||input.potentialUnknown))continue;
   const n=number(input[name]);if(n!==null&&(!Number.isSafeInteger(n)||n<0||!Number.isSafeInteger(n*(input.type==='구매'?10000:1))))errors.push([name,label+'은 저장 가능한 범위의 0 이상 정수로 입력해 주세요.']);
  }
  if(data.amount!==null&&data.contract!==null&&data.contract>data.amount)warnings.push('계약추진액이 상담액보다 큽니다. 기간별 금액 산정 기준을 확인하세요.');
  return {errors,warnings,data};
 }
 const input=(name,value,attrs='')=>'<input name="'+name+'" value="'+E(value)+'" '+attrs+'>';
 const pair=(label,control,required=false,full=false)=>'<div class="journal-pair'+(full?' full':'')+'"><div class="journal-label">'+label+(required?'<em> *</em>':'')+'</div><div class="journal-control">'+control+'</div></div>';
 const row=(a,b='')=>'<div class="journal-table-row">'+a+b+'</div>';
 const section=(title,body,attr='')=>'<section class="panel pad journal-section standard-journal-section" '+attr+'><h2>'+title+'</h2><div class="journal-table">'+body+'</div></section>';
 const select=(name,values,value)=>'<select name="'+name+'" aria-label="'+({issueCode:'주요 보완사항',followUpType:'후속조치 유형'}[name]||name)+'"><option value="">선택해 주세요</option>'+values.map(([code,label])=>'<option value="'+code+'"'+(value===code?' selected':'')+'>'+label+'</option>').join('')+'</select>';
 const radios=(name,values,value)=>'<div class="journal-radios">'+values.map(([code,label])=>'<label><input type="radio" name="'+name+'" value="'+code+'"'+(value===code?' checked':'')+'>'+label+'</label>').join('')+'</div>';
 const amountInput=(name,value,unit)=>'<div class="standard-money">'+input(name,value,'type="number" min="0" step="1" inputmode="numeric" placeholder="미산정 시 공란" aria-label="'+(name==='standardAmount'?'상담액':'계약추진액')+'"')+'<span>'+unit+'</span></div>';
 function inputAmount(d,type,key){const value=d[key];return value==null||value===''?'':Number(value)/(type==='구매'?10000:1);}
 function sections(d,type){
  const unit=type==='구매'?'만원':'USD',date=d.consultDate||(d.consultStart||d.date||'').slice(0,10),can=eligible(d.consultationLevel);
  const result=section('상담결과',row(pair('상담수준',radios('consultationLevel',levels,d.consultationLevel),true,true))+row(pair('주요 보완사항',select('issueCode',issues,d.issueCode),false,true)));
  const amount=section('예상 거래금액',row(pair('상담액 (향후 3년 이내)',amountInput('standardAmount',inputAmount(d,type,'amount'),unit)+'<p class="hint">향후 3년간 예상되는 총 거래금액을 직접 산정합니다. 임의 배수를 곱하지 않습니다.</p>',false,true))+row(pair('계약추진액 (향후 1년 이내)','<div data-standard-potential '+(!can?'hidden':'')+'>'+amountInput('standardContract',inputAmount(d,type,'contract'),unit)+'<label class="standard-unknown"><input type="checkbox" name="potentialUnknown"'+(d.potentialAmountUnestimated?' checked':'')+'> 아직 금액을 산정할 수 없음</label><p class="hint">실제 계약 체결액이 아닌 향후 1년 이내 거래 추진 예상금액입니다.</p></div><p data-standard-potential-note '+(can?'hidden':'')+' class="hint">계약 확정 / 계약 검토할 것 선택 시 입력할 수 있습니다.</p>',false,true))+'<p class="hint">'+(type==='구매'?'만원 단위 정수 입력 → 원(KRW) 단위 저장.':'USD 단위 정수로 입력·저장합니다. 환율을 임의 적용하지 않습니다.')+' 공란(미산정)과 0은 구분합니다.</p>', 'data-standard-money-section');
  const follow=section('후속조치',row(pair('구체적인 후속조치 예정 여부',radios('followUpYn',[['Y','예'],['N','아니오']],d.followUpYn),true,true))+row(pair('후속조치 유형','<div data-standard-follow '+(d.followUpYn==='Y'?'':'hidden')+'>'+select('followUpType',followTypes,d.followUpType)+'</div><p data-standard-follow-note '+(d.followUpYn==='Y'?'hidden':'')+' class="hint">예 선택 시 유형을 선택해 주세요.</p>',false,true)));
  const memo=section('주요 상담내용',row(pair('핵심 상담내용','<textarea name="content" required aria-describedby="standard-memo-hint standard-memo-count" placeholder="협의한 제품, 바이어 평가, 거래조건, 요청사항을 구체적으로 입력해 주세요.">'+E(d.content)+'</textarea><p id="standard-memo-count" aria-live="polite"></p><p class="hint" id="standard-memo-hint">최소 250자 이상 (공백 포함, 앞뒤 공백 제외). 동일 글자·문구·문장의 무의미한 반복 입력은 제출할 수 없습니다.</p>',true,true)));
  return {result,amount,follow,memo,date};
 }
 function decorate(html,d,type){
  const container=document.createElement('template');container.innerHTML=html;const form=container.content.querySelector('#draft-form');if(!form)return html;
  form.classList.add('standard-journal-form');form.dataset.standardType=type;
  const s=sections(d,type),info=[...form.querySelectorAll('.journal-section')].find(e=>e.querySelector('h2')?.textContent==='상담 정보');
  if(info){info.querySelector('[name="content"]')?.closest('.journal-table-row')?.remove();info.querySelector('.journal-table')?.insertAdjacentHTML('afterbegin',row(pair('상담일자',input('consultDate',s.date,'type="date" required aria-label="상담일자"'),true,true)));}
  const outcomes=[...form.querySelectorAll('.journal-section')].find(e=>e.querySelector('h2')?.textContent==='상담 결과');
  if(outcomes){for(const name of ['amount','contract','tradePotential'])outcomes.querySelector('[name="'+name+'"]')?.closest('.journal-pair')?.remove();outcomes.querySelectorAll('.journal-table-row').forEach(e=>{if(!e.children.length)e.remove();else if(e.children.length===1)e.firstElementChild.classList.add('full')});outcomes.querySelector('h2').textContent='추가 상담성과';outcomes.insertAdjacentHTML('beforebegin',s.result+s.amount+s.follow+s.memo);}
  const company=form.querySelector('[data-name="company"]')?.closest('.journal-control');
  if(company)company.insertAdjacentHTML('beforeend',confirmation(d));
  form.insertAdjacentHTML('beforeend',hidden(d,type));return container.innerHTML;
 }
 function confirmation(d){return '<div class="standard-company-confirm">'+input('companyConfirmedCode',d.companyConfirmedCode||'','type="hidden"')+'<button type="button" class="btn" data-standard-confirm-company>기업 확인</button><span data-standard-company-status>'+E(d.companyConfirmedCode?'선택 기업 확인 완료':'기업명·부스번호를 확인해 주세요.')+'</span></div>';}
 function hidden(d,type){return '<input type="hidden" name="journalSchema" value="'+schema+'">'+input('amount',d.amount,'type="hidden"')+input('contract',d.contract,'type="hidden"')+input('currency',type==='구매'?'KRW':'USD','type="hidden"')+input('contractCurrency',type==='구매'?'KRW':'USD','type="hidden"');}
 function purchase(d,heading,companies,meta){
  const s=sections(d,'구매'),selected=companies.find(c=>c.id===d.sellerCode||c.company===d.company),options=companies.map(c=>'<option value="'+E(c.company)+'" data-code="'+E(c.id)+'" data-booth="'+E(c.booth)+'"'+(c===selected?' selected':'')+'>'+E(c.company+' / '+c.booth)+'</option>').join('');
  return heading+'<form id="draft-form" class="export-journal-form standard-journal-form" data-standard-type="구매">'+section('기본정보',row(pair('행사',input('eventName',meta.eventName,'readonly class="journal-readonly"')),pair('작성자',input('writer',d.writer||meta.writer,'readonly class="journal-readonly"')))+row(pair('바이어 소속',input('buyerCompany',meta.buyerCompany,'readonly class="journal-readonly"')),pair('직위',input('buyerPosition',meta.position,'readonly class="journal-readonly"')))+row(pair('바이어 고유코드',input('buyerCode',meta.buyerCode,'readonly class="journal-readonly"')),pair('운영기관',input('tradeOffice',meta.agency,'readonly class="journal-readonly"'))))+
  section('상담기업',
   row(pair('참가기업','<input type="search" data-standard-company-search placeholder="기업명 또는 부스번호 검색" aria-label="기업명 또는 부스번호 검색"><select name="company" data-standard-company aria-label="참가기업"><option value="">선택해 주세요</option>'+options+'</select>'+confirmation(d),true),pair('부스번호',input('booth',selected?.booth||'','readonly class="journal-readonly"')))
   +row(pair('상담일자',input('consultDate',s.date,'type="date" required aria-label="상담일자"'),true),pair('상담제품',input('consultProduct',d.consultProduct,'type="text" placeholder="실제 상담한 제품명"')))
   +'<input type="hidden" name="sellerCode" value="'+E(selected?.id||'')+'">')
   +s.result+s.amount+s.follow+s.memo+hidden(d,'구매')+'<div class="formfooter"><a href="#JNL-13" class="btn">목록</a><button type="button" class="btn" data-action="save">임시 저장</button><button type="submit" class="btn primary">등록</button></div></form>';
 }
 function companyCode(form){const custom=form.querySelector('[data-name="company"]');if(custom){const name=custom.querySelector('[data-select-value]')?.value;return JSON.parse(custom.dataset.options||'[]').find(o=>o.value===name)?.code||'';}return form.elements.sellerCode?.value||'';}
 function collect(form){
  if(!form?.matches('.standard-journal-form'))return {};
  const get=name=>form.elements.namedItem(name)?.value||'',input={type:form.dataset.standardType,company:get('company'),sellerCode:companyCode(form),companyConfirmedCode:get('companyConfirmedCode'),consultDate:get('consultDate'),consultationLevel:get('consultationLevel'),issueCode:get('issueCode'),followUpYn:get('followUpYn'),followUpType:get('followUpType'),standardAmount:get('standardAmount'),standardContract:get('standardContract'),potentialUnknown:!!form.elements.potentialUnknown?.checked,content:get('content')};
  return normalize(input);
 }
 function validationInput(form){const d=collect(form),get=n=>form.elements.namedItem(n)?.value||'';return {...d,type:form.dataset.standardType,company:get('company'),sellerCode:companyCode(form),standardAmount:get('standardAmount'),standardContract:get('standardContract'),potentialUnknown:!!form.elements.potentialUnknown?.checked};}
 function check(form,notify,confirmWarning=true){if(!form?.matches('.standard-journal-form'))return true;const result=validate(validationInput(form));if(result.errors.length){const [name,message]=result.errors[0],field=form.querySelector('[name="'+name+'"]');notify(message);field?.focus();field?.scrollIntoView({block:'center'});return false;}return !confirmWarning||!result.warnings.length||window.confirm(result.warnings.join('\n')+'\n\n계속 등록하시겠습니까?');}
 function detail(data){
  if(data.journalSchema!==schema)return '';
  const display=(value,currency)=>value==null?'미산정':Number(value).toLocaleString()+' '+currency;
  return section('표준 상담결과',row(pair('상담일자',E(data.consultDate)),pair('상담수준',E(levels.find(([v])=>v===data.consultationLevel)?.[1]||'미입력')))+row(pair('주요 보완사항',E(issues.find(([v])=>v===data.issueCode)?.[1]||'없음')),pair('계약추진 건수',String(data.contractProgressCount))))
   +section('예상 거래금액',row(pair('상담액 (향후 3년 이내)',display(data.amount,data.currency)),pair('계약추진액 (향후 1년 이내)',!eligible(data.consultationLevel)?'해당 없음':display(data.contract,data.currency))))
   +section('후속조치',row(pair('예정 여부',data.followUpYn==='Y'?'예':'아니오'),pair('유형',E(followTypes.find(([v])=>v===data.followUpType)?.[1]||'해당 없음'))));
 }
 function sync(form,event){
  const get=n=>form.elements.namedItem(n),can=eligible(get('consultationLevel')?.value),follow=get('followUpYn')?.value==='Y';
  const p=form.querySelector('[data-standard-potential]'),note=form.querySelector('[data-standard-potential-note]');if(p)p.hidden=!can;if(note)note.hidden=can;
  if(event?.target.name==='consultationLevel'&&!can){get('standardContract').value='';get('potentialUnknown').checked=false;}
  if(get('standardContract')){get('standardContract').disabled=form.classList.contains('journal-read-view')||!can||!!get('potentialUnknown')?.checked;if(get('potentialUnknown')?.checked)get('standardContract').value='';}
  form.querySelector('[data-standard-follow]')?.toggleAttribute('hidden',!follow);form.querySelector('[data-standard-follow-note]')?.toggleAttribute('hidden',follow);
  if(get('followUpType')){get('followUpType').required=follow;get('followUpType').disabled=form.classList.contains('journal-read-view')||!follow;if(!follow)get('followUpType').value='';}
  const content=get('content')?.value.trim()||'',count=form.querySelector('#standard-memo-count');if(count)count.textContent=Array.from(content).length+' / 250자'+(repeatedFiller(content)?' · 반복 입력을 확인해 주세요.':'');
  if(form.classList.contains('journal-read-view'))return;
  const normalized=collect(form);for(const name of ['amount','contract'])if(get(name))get(name).value=normalized[name]??'';
 }
 function install(){
  if(typeof document==='undefined')return;
  document.addEventListener('input',e=>{const form=e.target.closest('.standard-journal-form');if(!form)return;if(e.target.matches('[data-standard-company-search]')){const q=e.target.value.trim().toLowerCase();form.querySelectorAll('[data-standard-company] option').forEach(o=>{o.hidden=!!o.value&&!o.textContent.toLowerCase().includes(q)});}sync(form,e);});
  document.addEventListener('change',e=>{const form=e.target.closest('.standard-journal-form');if(!form)return;if(e.target.matches('[data-standard-company]')){const o=e.target.selectedOptions[0];form.elements.sellerCode.value=o?.dataset.code||'';form.elements.booth.value=o?.dataset.booth||'';form.elements.companyConfirmedCode.value='';form.querySelector('[data-standard-company-status]').textContent='기업명·부스번호를 확인해 주세요.';}sync(form,e);});
  document.addEventListener('click',e=>{const option=e.target.closest('[data-select-value][data-select-meta]');if(!option?.closest('[data-name="company"]'))return;const form=option.closest('.standard-journal-form');if(!form)return;form.elements.companyConfirmedCode.value='';form.querySelector('[data-standard-company-status]').textContent='기업명·부스번호를 확인해 주세요.';},true);
  document.addEventListener('click',e=>{const button=e.target.closest('[data-standard-confirm-company]');if(!button||button.disabled)return;const form=button.closest('form'),code=companyCode(form);if(!code){form.querySelector('[data-standard-company]')?.focus();return;}form.elements.companyConfirmedCode.value=code;form.querySelector('[data-standard-company-status]').textContent='선택 기업 확인 완료';form.dispatchEvent(new Event('input',{bubbles:true}));});
  new MutationObserver(()=>document.querySelectorAll('.standard-journal-form:not([data-standard-ready])').forEach(form=>{form.dataset.standardReady='true';sync(form);})).observe(document.getElementById('app')||document.body,{childList:true,subtree:true});
 }
 return {schema,levels,issues,followTypes,eligible,repeatedFiller,normalize,validate,decorate,purchase,collect,check,sync,install,detail};
});
