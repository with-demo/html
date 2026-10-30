// 행사 참여여부는 회원 기본정보·참가이력과 별도로 연도별 관리한다.
(()=>{'use strict';
 const present=value=>['참가','참가확정','신규'].includes(String(value||'').replace(/\s/g,''));
 function create(storage){const states=new Map();try{for(const entry of JSON.parse(storage?.getItem('gfair-participation-v1')||'[]'))states.set(...entry);}catch{}
 const key=(source,id,year)=>[source,id,String(year)].join('|');
 const years=(source,row)=>(String(row[source==='BAS-03'?4:3]||'').match(/20\d{2}/g)||[]);
 function participating(source,row,year){const stored=states.get(key(source,row[0],year));return stored===undefined?years(source,row).includes(String(year))&&present(row.at(-1)):stored;}
 function set(source,row,year,value){const k=key(source,row[0],year),old=states.get(k);states.set(k,!!value);try{storage?.setItem('gfair-participation-v1',JSON.stringify([...states]));}catch(error){old===undefined?states.delete(k):states.set(k,old);throw Error('참여여부를 저장할 공간이 부족합니다.');}}
 function decorate(source,row,year){const copy=row.slice();copy[copy.length-1]=participating(source,row,year)?(years(source,row).some(y=>Number(y)<Number(year))?'참가 확정':'신규'):'미참여';return copy;}
 return {participating,set,decorate,years};}
 const api={create};if(typeof module!=='undefined'&&module.exports)module.exports=api;else {const api=create(window.sessionStorage);api.confirm=(ctx,title,message,label)=>new Promise(resolve=>{const escape=v=>String(v).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));ctx.modal(title,'<p>'+escape(message)+'</p><div class="dialogactions"><button type="button" class="btn" data-participation-cancel>취소</button><button type="button" class="btn primary" data-participation-confirm>'+escape(label)+'</button></div>');const dialog=document.getElementById('dialog'),host=document.getElementById('dialog-content');host.querySelector(':scope > .dialogactions')?.remove();const finish=value=>{dialog.removeEventListener('close',cancel);resolve(value);dialog.close();},cancel=()=>finish(false);dialog.addEventListener('close',cancel,{once:true});host.querySelector('[data-participation-confirm]').addEventListener('click',()=>finish(true),{once:true});host.querySelector('[data-participation-cancel]').addEventListener('click',cancel,{once:true});});window.GFAIR_PARTICIPATION=api;}
})();
