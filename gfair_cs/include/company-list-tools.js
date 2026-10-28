/* BAS-09 화면 전용 선택·QR 도구. Description 저장 내용은 변경하지 않는다. */
(()=>{'use strict';
 const active=()=>location.hash==='#BAS-09';
 const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const year=()=>String(document.querySelector('#event-picker')?.value||'2026').match(/20\d{2}/)?.[0]||'2026';
 function notify(message){const node=document.getElementById('toast');if(node){node.textContent=message;node.hidden=false;setTimeout(()=>node.hidden=true,3500);}}
 function sync(){const boxes=[...document.querySelectorAll('#content tbody tr:not([hidden]) [data-company-select]')],all=document.querySelector('[data-company-all]');if(all){const checked=boxes.filter(b=>b.checked).length;all.checked=boxes.length>0&&checked===boxes.length;all.indeterminate=checked>0&&checked<boxes.length;}}
 const png=(p,filename)=>GFAIR_DOWNLOAD_NAMES.png('GFAIR-DEMO|'+year()+'|'+p.id+'|'+p.booth,filename);
 const individualFile=p=>GFAIR_DOWNLOAD_NAMES.safe(p.company)+'_'+GFAIR_DOWNLOAD_NAMES.safe(p.booth)+'_qr코드.png';
 const file=p=>individualFile(p);
 document.addEventListener('company-page-change',sync);
 document.addEventListener('change',e=>{if(!active())return;if(e.target.matches('[data-company-all]'))document.querySelectorAll('#content tbody tr:not([hidden]) [data-company-select]').forEach(b=>b.checked=e.target.checked);if(e.target.matches('[data-company-all],[data-company-select]'))sync();});
 document.addEventListener('click',async e=>{const b=e.target.closest('[data-company-qr],[data-company-qr-selected],[data-company-qr-all]');if(!b||!active()||document.body.classList.contains('annotation-picking'))return;e.preventDefault();e.stopImmediatePropagation();try{
  const rows=window.GFAIR_COMPANY_LIST_ROWS?.()||[];
  if(b.hasAttribute('data-company-qr')){const p=rows.find(p=>p.id===b.dataset.companyQr);if(!p)return;const name=individualFile(p),data=png(p,name);window.GFAIR_COMPANY_QR_OPEN?.('<img class="event-qr-image" src="'+data+'" alt="'+esc(p.company)+' 부스 QR코드"><div class="dialogactions"><a class="btn" href="'+data+'" download="'+esc(name)+'">QR 다운로드</a></div>');return;}
  const selected=b.hasAttribute('data-company-qr-selected'),keys=new Set([...document.querySelectorAll('[data-company-select]:checked')].map(b=>b.dataset.companySelect)),members=selected?rows.filter(p=>keys.has(p.id)):(window.GFAIR_COMPANY_QR_ROWS?.()||[]);
  if(!members.length){notify(selected?'참가기업을 선택해 주세요.':'다운로드할 참가기업이 없습니다.');return;}
  b.disabled=true;const zip=new JSZip();members.forEach((p,i)=>{const name=file(p,i);zip.file(name,png(p,name).split(',')[1],{base64:true});});const blob=await zip.generateAsync({type:'blob'}),url=URL.createObjectURL(blob),link=document.createElement('a');link.href=url;link.download=GFAIR_DOWNLOAD_NAMES.qrZip(year(),'참가기업',selected);link.click();setTimeout(()=>URL.revokeObjectURL(url),1000);notify((selected?'선택한 ':'전체 ')+members.length+'개 참가기업의 부스 QR을 다운로드했습니다.');
 }catch(error){notify(error.message||'QR 이미지 파일을 생성하지 못했습니다.');}finally{b.disabled=false;}},true);
})();
