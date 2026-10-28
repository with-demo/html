// 해외 바이어·국내 바이어·통역원 관리의 연도별 참가 이력 및 XLSX 검증 목업
(()=>{'use strict';
 const targets=new Set(['BAS-03','BAS-05','BAS-07']);
 const labels={'BAS-03':'해외 바이어','BAS-05':'국내 바이어','BAS-07':'통역원'};
 const nameFields={'BAS-03':'바이어명','BAS-05':'바이어명','BAS-07':'통역원명'};
 const screen=()=>decodeURIComponent(location.hash.slice(1))||document.body.dataset.screen||'';
 const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const dialog=document.getElementById('dialog'),content=document.getElementById('dialog-content'),app=document.getElementById('app');
 let validated=null,validationEpoch=0;
 const key=(name,dob)=>name.trim().toLocaleLowerCase()+'|'+dob;
 const people=new Map(['BAS-03','BAS-05','BAS-07'].map(id=>{const source=page(id),yearIndex=source.ui.columns.indexOf('참가연도');return [id,new Map(source.ui.rows.map((r,index)=>[key(r[1],source.ui.birthDates?.[r[0]]||''),{index,years:String(r[yearIndex]||'').match(/20\d{2}/g)||[]}]))];}));
 const currentYear=()=>String(document.querySelector('#event-picker')?.value||'2026').match(/20\d{2}/)?.[0]||'2026';
 const participantStatus=years=>years.has(currentYear())?(years.has(String(Number(currentYear())-1))?'참가 확정':'신규'):'참가 미정';
 function syncButtons(){if(!targets.has(screen()))return;app?.querySelectorAll('.pagehead [data-action="action"]').forEach(button=>{if(button.dataset.label==='엑셀 양식 다운로드')button.classList.remove('primary');if(button.dataset.label==='엑셀 일괄 업로드')button.classList.add('primary');});const field=[...(app?.querySelectorAll('.filters .field')||[])].find(x=>x.querySelector('span')?.textContent.trim()==='참가 상태'),select=field?.querySelector('select');if(select&&!['전체','참가','미참가'].every((v,i)=>select.options[i]?.value===v))select.replaceChildren(...['전체','참가','미참가'].map(v=>new Option(v,v)));}
 if(app){new MutationObserver(syncButtons).observe(app,{childList:true,subtree:true});syncButtons();}
 function page(id){return (window.GFAIR_SCREENS||[]).flatMap(g=>g.screens).find(s=>s.id===id)}
 function templateColumns(s){return GFAIRMemberUpload.headers(s.id)}
 function openUpload(id){
  validated=null;validationEpoch++;const name=labels[id];
  const guide='<p>엑셀 양식을 다운로드하여 '+(id==='BAS-07'?'통역원':'바이어')+' 정보를 입력한 뒤 작성한 파일을 첨부해 주세요. 등록정보 시트만 읽고 [예시] 행과 코드값 참고 시트는 등록하지 않습니다. 참가연도는 현재 선택한 행사연도로 적용합니다.</p><div class="popup-action-row" style="margin-bottom:15px"><button type="button" class="btn" data-master-template>엑셀양식 다운로드</button></div>';
  content.innerHTML=`<div class="dialoghead"><h2>${name} 엑셀 일괄 업로드</h2><button type="button" class="btn ghost" data-action="close">닫기</button></div><div class="dialogbody">${guide}<form data-master-upload-form="${id}"><label class="field"><span>엑셀 파일</span><input type="file" name="file" accept=".xlsx" required><small class="hint">XLSX 파일 1개 · 용량 제한 없음</small></label><button type="submit" class="btn primary">파일 검증</button></form><div data-master-upload-result aria-live="polite"></div></div>`;
  dialog.showModal();
 }
 document.addEventListener('click',async ev=>{
  const b=ev.target.closest('[data-action="action"],[data-master-template]');if(!b||!targets.has(screen()))return;
  const id=screen(),label=b.hasAttribute('data-master-template')?'엑셀 양식 다운로드':b.dataset.label;if(!['엑셀 양식 다운로드','엑셀 일괄 업로드'].includes(label))return;
  ev.preventDefault();ev.stopImmediatePropagation();
  if(label==='엑셀 일괄 업로드'){openUpload(id);return;}
  try{await GFAIRMemberUpload.downloadTemplate(id,currentYear());}
  catch{const toast=document.getElementById('toast');if(toast){toast.textContent='엑셀 양식 생성에 실패했습니다.';toast.hidden=false;setTimeout(()=>toast.hidden=true,2800)}}
 },true);
 function normalizeDob(value){const dob=String(value??'').trim();if(!/^\d{4}-\d{2}-\d{2}$/.test(dob))return '';const d=new Date(dob+'T00:00:00Z');return !Number.isNaN(d.valueOf())&&d.toISOString().slice(0,10)===dob?dob:''}
 function table(headers,rows){return `<div class="tablewrap"><table><thead><tr>${headers.map(x=>`<th>${esc(x)}</th>`).join('')}</tr></thead><tbody>${rows.map(row=>`<tr>${row.map(x=>`<td>${esc(x)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`}
 function setStatus(row,s,status){const i=s.ui.columns.indexOf('참가상태');if(i>=0)row[i]=status;}
 function renderValidation(id,entries,errors){
  const result=content.querySelector('[data-master-upload-result]');if(id==='BAS-05'){const bad=entries.filter(x=>!x.valid),reasons=new Map();bad.forEach(x=>reasons.set(x.note,(reasons.get(x.note)||0)+1));result.innerHTML='';if(errors.length||bad.length){validated=null;window.alert('파일 검증에 실패했습니다.\n총 '+entries.length+'건 중 오류 '+bad.length+'건\n'+[...reasons].map(([reason,count])=>reason+' '+count+'건').concat(errors).join('\n')+'\n오류를 수정한 파일을 다시 첨부해 주세요.');return;}validated={id,entries,year:currentYear()};result.innerHTML='<div class="popup-action-row"><button type="button" class="btn primary" data-master-apply>목록에 반영</button></div>';window.alert('총 '+entries.length+'건의 파일 검증이 완료되었습니다.\n목록에 반영 버튼을 눌러 주세요.');return;}const counts={'신규':0,'참가 확정':0,'참가 미정':0};entries.forEach(x=>counts[x.status]++);
  result.innerHTML=`<div class="notice" style="margin-top:16px">검증 결과 · 신규 ${counts['신규']}건 · 참가 확정 ${counts['참가 확정']}건 · 참가 미정 ${counts['참가 미정']}건</div>${errors.length?`<p class="small">${errors.map(esc).join(' · ')}</p>`:''}${table(['이름','생년월일','참가연도','참가 상태','비고'],entries.map(x=>[x.name||'미입력',x.dob||'미확인',x.year||'미확인',x.status,x.note||'']))}<p class="small">현재 탭의 목록에만 반영됩니다. 기존 동일 인물은 한 건으로 유지하고 참가연도를 누적 표시합니다.</p>${entries.some(x=>x.valid)?'<button type="button" class="btn primary" data-master-apply>목록에 반영</button>':''}`;
  validated={id,entries,year:currentYear()};
 }
 document.addEventListener('change',ev=>{if(ev.target.matches('[data-master-upload-form] input[type="file"]')){validated=null;validationEpoch++;const result=content.querySelector('[data-master-upload-result]');if(result)result.innerHTML='';}});
 document.addEventListener('submit',async ev=>{
  const form=ev.target;if(!form.matches('[data-master-upload-form]'))return;
  ev.preventDefault();ev.stopImmediatePropagation();validated=null;const epoch=++validationEpoch,year=currentYear();const id=form.dataset.masterUploadForm,file=new FormData(form).get('file'),result=content.querySelector('[data-master-upload-result]');if(!file)return;
  try{
   if(!/\.xlsx$/i.test(file.name))throw Error('XLSX 파일을 선택해 주세요.');
   const s=page(id),rows=await GFAIRWorkbook.read(file,{sheetName:'등록정보',unlimitedFileSize:true,unlimitedRows:true}),checked=GFAIRMemberUpload.validate(id,rows,{countryCodes:window.GFAIR_COUNTRY_CODES,languageCodes:window.GFAIR_LANGUAGE_CODES,year:currentYear()}),parsed=checked.entries;
   if(epoch!==validationEpoch||year!==currentYear()||!content.contains(form))return;
   const byIdentity=new Map();parsed.filter(x=>x.valid).forEach(x=>{const k=key(x.name,x.dob);if(!byIdentity.has(k))byIdentity.set(k,[]);byIdentity.get(k).push(x)});
   const old=people.get(id)||new Map();
   parsed.forEach(x=>{if(!x.valid){x.status='참가 미정';return;}const prior=old.get(key(x.name,x.dob)),same=byIdentity.get(key(x.name,x.dob)),years=new Set([...(prior?.years||[]),...same.map(r=>r.year)]);x.status=participantStatus(years);});
   renderValidation(id,parsed,[]);
  }catch(error){validated=null;if(id==='BAS-05'){result.innerHTML='';window.alert('파일 검증에 실패했습니다.\n사유: '+(error.message||'파일을 확인할 수 없습니다.'));return;}result.innerHTML=`<div class="notice danger" style="margin-top:16px">${esc(error.message||'파일을 확인할 수 없습니다.')}</div>`;}
 },true);
 document.addEventListener('click',ev=>{
  if(ev.target.closest('[data-master-apply]')){
   if(!validated||validated.id!==screen()||validated.year!==currentYear())return;const id=validated.id,s=page(id),state=people.get(id)||new Map(),entries=validated.entries,groups=new Map();
   entries.filter(x=>x.valid).forEach(x=>{const k=key(x.name,x.dob);if(!groups.has(k))groups.set(k,[]);groups.get(k).push(x)});
   const activeYear=currentYear(),previousYear=String(Number(activeYear)-1);
   if(entries.every(x=>x.valid))state.forEach((person,k)=>{if(person.years.includes(previousYear)&&!groups.has(k)){person.years=person.years.filter(year=>year!==activeYear);const row=s.ui.rows[person.index];if(row){row[s.ui.columns.indexOf('참가연도')]=person.years.slice().sort().reverse().join(', ');setStatus(row,s,participantStatus(new Set(person.years)));}}});
   groups.forEach((items,k)=>{
    const prior=state.get(k),years=new Set([...(prior?.years||[]),...items.map(x=>x.year)]),latest=items.at(-1),data=latest.data,row=prior?s.ui.rows[prior.index].slice():s.ui.columns.map(()=>''),prefix={'BAS-03':'F','BAS-05':'K','BAS-07':'I'}[id];
    if(!prior){const sequence=Math.max(0,...s.ui.rows.filter(r=>new RegExp('^'+prefix+activeYear+'\\d{4}$').test(r[0])).map(r=>Number(r[0].slice(-4))))+1;row[0]=prefix+activeYear+String(sequence).padStart(4,'0');}
    row[1]=data.name;if(id==='BAS-03')row[2]=data.country;if(id==='BAS-05')row[2]=data.organization;if(id==='BAS-07')row[2]=data.languages.join(' / ');
    row[s.ui.columns.indexOf('참가연도')]=[...years].sort().reverse().join(', ');setStatus(row,s,participantStatus(years));
    let index=prior?.index??s.ui.rows.length;if(prior)s.ui.rows[index]=row;else s.ui.rows.push(row);state.set(k,{index,years:[...years]});s.ui.birthDates??={};s.ui.birthDates[row[0]]=data.dob;
    window.GFAIR_OVERSEAS_BUYER_DETAIL.importProfile(row,s.ui.rows,{'BAS-03':'BAS-04','BAS-05':'BAS-06','BAS-07':'BAS-08'}[id],data,activeYear);
   });
   state.forEach(person=>{const row=s.ui.rows[person.index];if(row)setStatus(row,s,participantStatus(new Set(person.years)));});
   people.set(id,state);dialog.close();validated=null;
   const toast=document.getElementById('toast');if(toast){toast.textContent='참가자 목록을 갱신했습니다. 서버에는 저장되지 않았습니다.';toast.hidden=false;setTimeout(()=>toast.hidden=true,2800)}
  }
 },true);
})();
