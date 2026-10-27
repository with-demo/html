/* 오프라인 수출상담일지 XLSX 업로드 목업. 중복 판정·최종 양식은 발주처 협의 대상. */
(()=>{'use strict';
 const columns=['행사연도','참가기업','부스 번호','해외 바이어','작성자','상담 시작일시','상담 종료일시','상담 상세','비고','수출 상담액','계약 추진액','거래 가능성','현장 계약 여부','샘플 전달','MOU 체결','MOU 예정','해시태그'];
 const required=columns.filter(x=>!['비고','해시태그'].includes(x));
 const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const dialog=document.getElementById('dialog'),host=document.getElementById('dialog-content');
 let context=null,session=null,checked=null,busy=false,serial=0;
 const allowed=c=>c?.current==='JNL-14'&&['admin','exportOperator'].includes(c.role);
 const normalized=v=>String(v??'').trim().replace(/\s+/g,' ').toLocaleLowerCase();
 const key=j=>[j.year||j.eventYear||(j.eventName||j.consultStart||j.time||'').match(/20\d{2}/)?.[0],j.company,j.buyer,j.writer,j.consultStart||j.date,j.consultEnd].map(normalized).join('|');
 const validDate=v=>{if(!/^\d{4}-\d{2}-\d{2}[ T]\d{2}:\d{2}$/.test(v))return false;const d=new Date(v.replace(' ','T')+':00Z');return !isNaN(d)&&d.toISOString().slice(0,16)===v.replace(' ','T');};
 function live(s){return session===s&&dialog.open&&allowed(context)&&context.role===s.role&&context.year===s.year;}
 function open(){
  session={role:context.role,year:context.year,journals:context.journals};checked=null;busy=false;
  host.innerHTML='<div class="dialoghead"><h2>수출상담일지 엑셀 일괄 업로드</h2><button type="button" class="btn ghost" data-action="close">닫기</button></div><div class="dialogbody"><p>엑셀 양식을 다운로드하여 수출상담일지 내용을 입력한 뒤 작성한 파일을 첨부해 주세요.</p><div class="popup-action-row" style="margin-bottom:15px"><button type="button" class="btn" data-journal-template>엑셀양식 다운로드</button></div><form data-journal-upload-form><label class="field"><span>엑셀 파일 <em>*</em></span><input type="file" name="file" accept=".xlsx" required><small class="hint">XLSX 파일 1개 · 10MB 이하 · 최대 500건</small></label><button type="submit" class="btn primary">파일 검증</button></form><div data-journal-upload-result aria-live="polite"></div></div>';
  dialog.showModal();
 }
 function result(rows){const errors=rows.filter(r=>r.errors.length),good=rows.length-errors.length;return '<p style="margin-top:15px">총 '+rows.length+'건 · 정상 '+good+'건 · 오류 '+errors.length+'건</p><div class="tablewrap"><table><thead><tr><th>엑셀 행</th><th>참가기업</th><th>해외 바이어</th><th>검증 결과</th></tr></thead><tbody>'+rows.map(r=>'<tr><td>'+r.line+'</td><td>'+esc(r.j.company)+'</td><td>'+esc(r.j.buyer)+'</td><td>'+esc(r.errors.join(' / ')||'정상')+'</td></tr>').join('')+'</tbody></table></div><p class="small">'+(errors.length?'오류를 수정한 파일을 다시 선택하여 검증해 주세요.':'파일 검증이 완료되었습니다. 일괄 등록할 수 있습니다.')+'</p><div class="popup-action-row"><button type="button" class="btn primary" data-journal-import '+(errors.length?'disabled':'')+'>일괄 등록</button></div>';}
 function inspect(data,s){
  const headers=(data[0]||[]).map(v=>String(v).trim());
  if(columns.some(c=>headers.filter(v=>v===c).length!==1))throw Error('엑셀 양식의 열 이름을 확인해 주세요. 양식을 다시 다운로드할 수 있습니다.');
  const rows=data.slice(1).map((r,i)=>({r,line:i+2})).filter(x=>x.r.some(v=>String(v??'').trim()));
  if(!rows.length)throw Error('등록할 상담일지가 없습니다. 내용을 입력한 파일을 선택해 주세요.');
  const seen=new Map(),existing=new Set(s.journals.filter(j=>j.type==='수출').map(key));
  return rows.map(({r,line})=>{
   const d=Object.fromEntries(columns.map(c=>[c,String(r[headers.indexOf(c)]??'').trim()])),errors=[];
   const missing=required.filter(c=>!d[c]);if(missing.length)errors.push('필수값 누락: '+missing.join(', '));
   if(d.행사연도!==s.year)errors.push('선택한 행사연도와 불일치');
   for(const c of ['상담 시작일시','상담 종료일시'])if(d[c]&&!validDate(d[c]))errors.push(c+': YYYY-MM-DD HH:mm 형식 확인');
   if(validDate(d['상담 시작일시'])&&validDate(d['상담 종료일시'])&&d['상담 시작일시'].replace(' ','T')>=d['상담 종료일시'].replace(' ','T'))errors.push('상담 종료일시는 시작일시 이후로 입력');
   for(const c of ['수출 상담액','계약 추진액'])if(d[c]&&(!/^\d+(\.\d+)?$/.test(d[c])||!Number.isFinite(Number(d[c]))))errors.push(c+': 0 이상의 숫자로 입력');
   if(d['거래 가능성']&&!['매우 낮음','낮음','보통','높음','매우 높음'].includes(d['거래 가능성']))errors.push('거래 가능성: 매우 낮음 / 낮음 / 보통 / 높음 / 매우 높음으로 입력');
   for(const c of ['현장 계약 여부','샘플 전달','MOU 체결','MOU 예정'])if(d[c]&&!['예','아니오'].includes(d[c]))errors.push(c+': 예 / 아니오로 입력');
   const j={type:'수출',year:d.행사연도,eventName:'G-FAIR KOREA '+d.행사연도,company:d.참가기업,booth:d['부스 번호'],buyer:d['해외 바이어'],writer:d.작성자,consultStart:d['상담 시작일시'].replace(' ','T'),consultEnd:d['상담 종료일시'].replace(' ','T'),date:d['상담 시작일시'].replace(' ','T'),content:d['상담 상세'],remarks:d.비고,amount:Number(d['수출 상담액']),contract:Number(d['계약 추진액']),currency:'USD',tradePotential:d['거래 가능성'],onSiteContract:d['현장 계약 여부'],sampleDelivered:d['샘플 전달'],mouSigned:d['MOU 체결'],mouPlanned:d['MOU 예정'],tags:d.해시태그.split(/[,，]/).map(v=>v.trim().replace(/^#/, '')).filter(Boolean)};
   const k=key(j);if(existing.has(k))errors.push('이미 등록된 상담일지');if(seen.has(k))errors.push('파일 내 중복: '+seen.get(k)+'행과 동일');else seen.set(k,line);
   return {j,line,errors};
  });
 }
 window.GFAIR_JOURNAL_UPLOAD={bind(c){context=c;if(!allowed(c))return;const tools=document.querySelector('#content .panelhead .row');if(tools&&!tools.querySelector('[data-journal-upload]')){const b=document.createElement('button');b.type='button';b.className='btn primary';b.dataset.journalUpload='';b.textContent='엑셀 일괄 업로드';tools.append(b);}}};
 document.addEventListener('change',e=>{if(e.target.matches('[data-journal-upload-form] input[type=file]')){checked=null;host.querySelector('[data-journal-upload-result]').replaceChildren();}});
 document.addEventListener('click',async e=>{
  const b=e.target.closest('[data-journal-upload],[data-journal-template],[data-journal-import]');if(!b||!allowed(context)||document.body.classList.contains('annotation-picking'))return;e.preventDefault();e.stopImmediatePropagation();
  if(b.hasAttribute('data-journal-upload')){open();return;}
  if(!session||!live(session)||busy)return;
  if(b.hasAttribute('data-journal-template')){b.disabled=true;try{context.download(await GFAIRWorkbook.write([columns]),'G-FAIR_'+session.year+'_수출상담일지 목록_등록양식_'+GFAIR_DOWNLOAD_NAMES.date()+'.xlsx');}catch{context.toast('엑셀 양식 생성에 실패했습니다.');}finally{b.disabled=false;}return;}
  if(!checked||checked.some(r=>r.errors.length))return;
  const existing=new Set(session.journals.filter(j=>j.type==='수출').map(key));if(checked.some(r=>existing.has(key(r.j)))){checked=null;host.querySelector('[data-journal-upload-result]').textContent='등록된 상담일지가 변경되었습니다. 파일을 다시 검증해 주세요.';return;}
  busy=true;b.disabled=true;const stamp=new Date().toLocaleString('sv-SE',{timeZone:'Asia/Seoul'}).slice(0,16),count=checked.length;
  session.journals.push(...checked.map(({j})=>({...j,id:'GF-IMPORT-'+Date.now()+'-'+(++serial),time:stamp,status:'승인 요청',reason:'',history:[['승인 요청','엑셀 업로드 · '+stamp]]})));
  checked=null;dialog.close();context.render();context.toast(count+'건을 검토용 목록에 추가했습니다. 실제 서버 등록은 하지 않습니다.');busy=false;
 },true);
 document.addEventListener('submit',async e=>{
  const form=e.target;if(!form.matches('[data-journal-upload-form]')||!allowed(context))return;e.preventDefault();e.stopImmediatePropagation();if(busy||!session||!live(session)||!form.reportValidity())return;
  const s=session,file=form.querySelector('input[type=file]').files[0],output=host.querySelector('[data-journal-upload-result]'),button=form.querySelector('button');checked=null;busy=true;button.disabled=true;form.querySelector('input').disabled=true;output.textContent='파일을 검증하고 있습니다.';
  try{if(!/\.xlsx$/i.test(file.name))throw Error('XLSX 파일을 선택해 주세요.');const data=await GFAIRWorkbook.read(file,{strictRowLimit:true});if(!live(s))return;checked=inspect(data,s);output.innerHTML=result(checked);}catch(error){if(live(s))output.textContent=error.message;}finally{if(live(s))busy=false;button.disabled=false;form.querySelector('input').disabled=false;}
 },true);
 dialog.addEventListener('close',()=>{session=null;checked=null;});
})();
