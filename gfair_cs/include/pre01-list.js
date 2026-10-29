/* PRE-01 목록 도구·QR 표시. 실제 인증·발급은 서버 연계 전의 목업이다. */
(()=>{'use strict';
 const E=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 function create(ctx){
  let selected=new Set(),scope='',shown=[];
  function person(entry){const {r,i}=entry,master=ctx.master(),row=master.find(p=>p[1]===r[0]);return {key:row?.[0]||'row-'+i,index:i,name:r[0],country:r[1],stage:r[4],record:r,changedAt:window.GFAIR_PRE02_DETAIL?.currentChangedAt(r,ctx.year(),row?.[0]||'row-'+i)||'',interpreter:r[5],code:row?.[0]||''};}
  function all(){return ctx.all().map(person);}
  const button=(action,label,extra='')=>'<button type="button" class="btn'+(action==='detail'?' list-name-link':'')+'" data-pre01-action="'+action+'" '+extra+'>'+label+'</button>';
  function list(entries){
   const next=ctx.scope();if(next!==scope){scope=next;selected.clear();}shown=entries.map(person);const keys=new Set(shown.map(p=>p.key));for(const key of selected)if(!keys.has(key))selected.delete(key);
   const readOnly=ctx.getRole()==='interpreter',canChange=ctx.getRole()==='exportOperator';
   const columns=['바이어명','국가','이동상태','상태 변경일시',...(canChange?['상태 변경']:[]),'담당통역원',...(readOnly?[]:['QR발급'])];
   const tools=readOnly?'':'<div class="row">'+button('excel','선택 엑셀 다운로드')+button('qr-selected','선택 QR다운로드')+button('qr-all','전체 QR다운로드')+'</div>';
   const selectHead=readOnly?'':'<th><input type="checkbox" data-pre01-all aria-label="현재 페이지 전체 선택"></th>';
   const body=shown.map(p=>'<tr>'+(readOnly?'':'<td><input type="checkbox" data-pre01-check="'+E(p.key)+'" aria-label="'+E(p.name)+' 선택"'+(selected.has(p.key)?' checked':'')+'></td>')+'<td>'+button('detail',E(p.name),'data-key="'+E(p.key)+'"')+'</td><td>'+E(p.country)+'</td><td>'+E(p.stage)+'</td><td style="white-space:nowrap">'+E(p.changedAt||'-')+'</td>'+(canChange?'<td>'+button('status','상태 변경','data-key="'+E(p.key)+'" aria-label="'+E(p.name)+' 상태 변경"')+'</td>':'')+'<td>'+E(p.interpreter||'미지정')+'</td>'+(readOnly?'':'<td>'+button('qr','QR발급','data-key="'+E(p.key)+'" aria-label="'+E(p.name)+' QR발급"'+(p.code?'':' disabled'))+'</td>')+'</tr>').join('');
   return '<section class="panel pre01-participant-list" data-pre01-scope="'+E(ctx.scope())+'"><div class="panelhead"><h2>조회 결과</h2>'+tools+'</div><div class="tablewrap"><table><thead><tr>'+selectHead+columns.map(c=>'<th scope="col">'+c+'</th>').join('')+'</tr></thead><tbody>'+(body||'<tr><td colspan="'+(columns.length+(readOnly?0:1))+'"><div class="empty">조회된 해외 바이어가 없습니다.</div></td></tr>')+'</tbody></table></div></section>';
  }
  function sync(){const panel=document.querySelector('.pre01-participant-list'),boxes=[...(panel?.querySelectorAll('tbody tr:not([hidden]) [data-pre01-check]')||[])],all=panel?.querySelector('[data-pre01-all]');if(all){const count=boxes.filter(b=>b.checked).length;all.checked=boxes.length>0&&count===boxes.length;all.indeterminate=count>0&&count<boxes.length;}}
  function chosen(){const rr=shown.filter(p=>selected.has(p.key));if(!rr.length)ctx.toast('대상을 선택해 주세요.');return rr;}
  function qr(p,filename=GFAIR_DOWNLOAD_NAMES.qrImage(p.name,p.code)){if(!p.code)throw Error('바이어코드를 확인해 주세요.');return GFAIR_DOWNLOAD_NAMES.png('GFAIR-DEMO|'+ctx.year()+'|OVERSEAS|'+p.code,filename);}
  document.addEventListener('change',e=>{if(!ctx.active()||ctx.getRole()==='interpreter')return;const box=e.target;if(box.matches('[data-pre01-check]')){box.checked?selected.add(box.dataset.pre01Check):selected.delete(box.dataset.pre01Check);sync();}if(box.matches('[data-pre01-all]')){document.querySelectorAll('.pre01-participant-list tbody tr:not([hidden]) [data-pre01-check]').forEach(b=>{b.checked=box.checked;box.checked?selected.add(b.dataset.pre01Check):selected.delete(b.dataset.pre01Check);});sync();}});
  document.addEventListener('pre01-page-change',sync);
  document.addEventListener('click',async e=>{const b=e.target.closest('[data-pre01-action]');if(!b||!ctx.active()||document.body.classList.contains('annotation-picking'))return;e.preventDefault();e.stopImmediatePropagation();const action=b.dataset.pre01Action;if(ctx.getRole()==='interpreter'&&action!=='detail')return;try{
   if(action==='status'){if(ctx.getRole()!=='exportOperator')return;const p=shown.find(p=>p.key===b.dataset.key);if(p)window.GFAIR_PRE02_DETAIL.openStatus(p.record,ctx.year(),{identity:p.key,getRole:ctx.getRole,actor:ctx.actor,onChange:ctx.refresh,toast:ctx.toast});return;}
   if(action==='detail'){const p=shown.find(p=>p.key===b.dataset.key);if(p)ctx.detail(p.index);return;}
   if(action==='qr'){const p=shown.find(p=>p.key===b.dataset.key);if(!p)return;const data=qr(p);ctx.modal('QR 발급','<img class="event-qr-image" src="'+data+'" alt="'+E(p.name)+' QR코드"><div class="dialogactions"><a class="btn" href="'+data+'" download="'+E(GFAIR_DOWNLOAD_NAMES.qrImage(p.name,p.code))+'">QR 다운로드</a></div>');document.querySelector('#dialog-content > .dialogactions')?.remove();return;}
   const rr=action==='qr-all'?all():chosen();if(!rr.length){if(action==='qr-all')ctx.toast('다운로드할 대상이 없습니다.');return;}
   b.disabled=true;
   if(action==='excel'){const data=[['바이어명','국가','이동상태','상태 변경일시','담당통역원'],...rr.map(p=>[p.name,p.country,p.stage,p.changedAt||'-',p.interpreter||'미지정'])];ctx.download(await GFAIRWorkbook.write(data),GFAIR_DOWNLOAD_NAMES.list(ctx.year(),'해외바이어',true));ctx.toast('선택한 '+rr.length+'명의 엑셀을 다운로드했습니다.');return;}
   const zip=new JSZip(),used=new Set();for(const p of rr){const name=GFAIR_DOWNLOAD_NAMES.qrImage(p.name,p.code);if(used.has(name))throw Error('바이어코드가 중복되었습니다.');used.add(name);zip.file(name,qr(p,name).split(',')[1],{base64:true});}ctx.download(await zip.generateAsync({type:'blob'}),GFAIR_DOWNLOAD_NAMES.qrZip(ctx.year(),'해외바이어',action==='qr-selected'));ctx.toast((action==='qr-all'?'전체 ':'선택한 ')+rr.length+'명의 QR을 다운로드했습니다.');
  }catch(error){ctx.toast(error.message||'파일 생성에 실패했습니다.');}finally{b.disabled=false;}},true);
  return {list};
 }
 window.GFAIR_PRE01_LIST={create};
})();
