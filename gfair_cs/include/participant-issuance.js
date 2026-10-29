// 검토용 행사별 참가 확정·임시계정. 실제 서비스 인증·문자 발송은 연결하지 않는다.
(()=>{'use strict';
 const config={
  'BAS-03':{label:'참가확정',name:'해외바이어',destination:'PRE-01',profile:'BAS-04',yearIndex:4,prefix:null},
  'BAS-05':{label:'계정발급',name:'국내바이어',destination:'EVT-01',profile:'BAS-06',yearIndex:3,prefix:'GK'},
  'BAS-07':{label:'계정발급',name:'통역원',destination:'EVT-02',profile:'BAS-08',yearIndex:3,prefix:'GI'}
 };
 const E=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const clone=value=>JSON.parse(JSON.stringify(value));
 function createStore(storage,random=limit=>crypto.getRandomValues(new Uint32Array(1))[0]%limit){
  const key='gfair.participant-issuance.v1';let data={version:1,events:{}};
  try{const saved=JSON.parse(storage.getItem(key)||'null');if(saved?.version===1&&saved.events&&typeof saved.events==='object')data=saved;}catch{}
  const eventYear=value=>{const year=String(value);if(!/^20\d{2}$/.test(year))throw Error('행사연도를 확인해 주세요.');return year;};
  const eligible=(source,rows,year)=>{const cfg=config[source];if(!cfg)throw Error('참가자 관리 화면을 확인해 주세요.');year=eventYear(year);return rows.filter(r=>['참가','참가확정','신규'].includes(String(r.at(-1)||'').replace(/\s/g,''))&&(String(r[cfg.yearIndex]||'').match(/20\d{2}/g)||[]).includes(year));};
  function issue(source,rows,year,profiles={}){
   year=eventYear(year);const cfg=config[source],targets=eligible(source,rows,year);
   if(!targets.length)throw Error('현재 행사에 참가 상태인 대상이 없습니다.');
   const keys=targets.map(r=>String(r[0]||''));if(keys.some(k=>!k)||new Set(keys).size!==keys.length)throw Error('참가자 고유코드를 확인해 주세요.');
   const next=clone(data),previous=next.events[year]?.[source],accounts=previous?.accounts||{},used=new Set(Object.values(accounts).map(a=>a.id));let created=0;
   if(cfg.prefix)for(const code of keys)if(!accounts[code]){
    let id,attempts=0;do{if(++attempts>10000)throw Error('발급 가능한 계정 번호가 없습니다.');id=cfg.prefix+year.slice(-2)+String(random(9999)+1).padStart(4,'0');}while(used.has(id));
    used.add(id);accounts[code]={id,pw:String.fromCharCode(65+random(26))+String(random(1000000)).padStart(6,'0')};created++;
   }
   const snapshots={};for(const code of keys)if(profiles[code])snapshots[code]={...clone(profiles[code]),...(cfg.prefix?{accountId:accounts[code].id}:{})};
   next.events[year]??={};next.events[year][source]={rows:targets.map(r=>r.slice()),profiles:snapshots,accounts:cfg.prefix?accounts:{},confirmedAt:new Date().toISOString()};
   try{storage.setItem(key,JSON.stringify(next));}catch{throw Error('변경 내용을 저장할 공간이 부족합니다.');}
   data=next;return {count:targets.length,created,reused:cfg.prefix?targets.length-created:0};
  }
  return {config,eligible,issue,rows(source,year){return clone(data.events[String(year)]?.[source]?.rows||[]);},profile(source,code,year){const p=data.events[String(year)]?.[source]?.profiles?.[code];return p?clone(p):null;},account(source,code,year){const account=data.events[String(year)]?.[source]?.accounts?.[code];return account?clone(account):null;}};
 }
 const storage={getItem:k=>sessionStorage.getItem(k),setItem:(k,v)=>sessionStorage.setItem(k,v)};
 const store=createStore(storage);
 function createUI(ctx){
  let pending=null;
  const signature=(source,year)=>JSON.stringify(store.eligible(source,ctx.source(source),year));
  function open(source){
   if(ctx.role()!=='admin')return ctx.toast('관리자만 처리할 수 있습니다.');
   const cfg=config[source];if(!cfg)return;
   const year=String(ctx.year()),targets=store.eligible(source,ctx.source(source),year);
   if(!targets.length)return ctx.toast('현재 행사에 참가 상태인 대상이 없습니다.');
   pending={source,year,signature:signature(source,year)};
   const names=targets.slice(0,10).map(r=>E(r[1])).join(', ')+(targets.length>10?' 외 '+(targets.length-10)+'명':'');
   const body='<p>'+E(year)+'년 참가 상태인 '+cfg.name+' <strong>'+targets.length+'명</strong>을 확정하시겠습니까?</p><p>'+names+'</p><p>검색 조건·페이지와 관계없이 현재 행사 참가 대상 전체에 적용합니다.</p><p>'+(cfg.prefix?'미발급 대상의 계정을 발급하고, 이미 발급된 ID·비밀번호는 유지합니다.':'해외바이어는 ID·비밀번호를 발급하지 않고 고유코드로 참가자를 확정합니다.')+'</p>';
   ctx.modal(cfg.label,body,'participant-issue-confirm',cfg.label);
  }
  document.addEventListener('click',event=>{
   const button=event.target.closest('[data-participant-issue],[data-action="participant-issue-confirm"]');if(!button)return;
   event.preventDefault();event.stopImmediatePropagation();
   try{
    if(button.hasAttribute('data-participant-issue')){open(button.dataset.participantIssue);return;}
    const request=pending;if(!request)return;
    if(ctx.role()!=='admin'||ctx.route()!==request.source||String(ctx.year())!==request.year)throw Error('화면 또는 행사연도가 변경되었습니다. 다시 진행해 주세요.');
    if(signature(request.source,request.year)!==request.signature)throw Error('참가 대상이 변경되었습니다. 최신 목록에서 다시 진행해 주세요.');
    const cfg=config[request.source],source=ctx.source(request.source),profiles=Object.fromEntries(store.eligible(request.source,source,request.year).map(row=>[row[0],window.GFAIR_OVERSEAS_BUYER_DETAIL.eventView(row,source,cfg.profile,request.year)]));
    const result=store.issue(request.source,source,request.year,profiles);pending=null;ctx.close();
    ctx.toast(cfg.name+' '+result.count+'명을 확정했습니다.'+(cfg.prefix?' 신규 발급 '+result.created+'명 · 기존 계정 유지 '+result.reused+'명':''));
    ctx.nav(cfg.destination);
   }catch(error){pending=null;ctx.close();ctx.toast(error.message||'처리하지 못했습니다. 다시 시도해 주세요.');}
  },true);
  window.addEventListener('hashchange',()=>{pending=null;});
  return {button(source){const cfg=config[source];return cfg&&ctx.role()==='admin'?'<div class="formfooter"><button type="button" class="btn primary" data-participant-issue="'+source+'">'+cfg.label+'</button></div>':'';}};
 }
 window.GFAIR_PARTICIPANT_ISSUANCE={...store,createStore,createUI};
})();
