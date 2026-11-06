/* QR 동선 목업. 예시 체크 이력만 현재 탭에 보관한다. */
(()=>{'use strict';
const states=['입국','호텔 이동','호텔 도착','전시장 출발','전시장 입장','통역원 만남','전시장 퇴장'];
const attendanceStates = new Set(['전시장 입장', '전시장 퇴장']);
const statusOperators = ['admin', 'exportOperator', 'buyOperator'];
const attendanceProfiles = {BUYER:['BAS-05','BAS-06'], INTERPRETER:['BAS-07','BAS-08']};
const screens=GFAIR_SCREENS.flatMap(g=>g.screens),get=id=>screens.find(s=>s.id===id);
for(const [id,title,kind] of [['PRE-03','QR 리더기 실행','form'],['JNL-03','상담 QR 리더','mobile']])Object.assign(get(id),{title,kind});
for(const [id,title,parent] of [['PRE-12','방한 QR 스캔 카메라','PRE-03']]){
 GFAIR_SCREENS.find(g=>g.screens.some(s=>s.id===parent)).screens.push({...get(parent),id,title,parent,kind:parent==='PRE-03'?'form':'mobile',ui:{}});
}
// 플로팅 진입 화면도 화면선택·화면검색에 포함한다.
window.GFAIR_SCREEN_REGISTRY.push({id:'JNL-03',parent:'JNL-14'},{id:'PRE-03',parent:'PRE-01'},{id:'PRE-12',parent:'PRE-03'});
const consultState='상담 시작';
let eventYear='2026',scanRole='',state='',media=null,epoch=0,frame=null,busy=false,last='',lastAt=0;
const E=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const date=()=>new Intl.DateTimeFormat('ko-KR',{dateStyle:'full',timeZone:'Asia/Seoul'}).format(new Date());
function stop(){epoch++;cancelAnimationFrame(frame);media?.getTracks().forEach(t=>t.stop());media=null;busy=false;}
function notice(text){const el=document.querySelector('#qr-feedback');if(el){el.hidden=false;el.textContent=text;}}
function participantFor(type, code, step, year){
 if(type==='OVERSEAS')return get('BAS-03')?.ui.rows.find(row=>row[0]===code);
 if(!attendanceStates.has(step)||!Object.hasOwn(attendanceProfiles,type))return;
 const [source,profile]=attendanceProfiles[type];
 const rows=get(source)?.ui.rows||[];
 return rows.find(row=>window.GFAIR_PARTICIPATION?.participating(source,row,year)
  && window.GFAIR_OVERSEAS_BUYER_DETAIL?.eventView(row,rows,profile,year).accountId===code);
}
function accept(raw){
 const travel=location.hash==='#PRE-12',step=travel?state:consultState;
 if(!step)return notice('처리할 상태를 먼저 선택해 주세요.');
 const parts=String(raw).split('|'),year=eventYear;
 const valid=parts.length===4&&parts[0]==='GFAIR-DEMO'&&parts[1]===String(year)&&!!parts[3];
 const person=valid&&(travel
  ?participantFor(parts[2],parts[3],step,year)
  :get('BAS-09')?.ui.rows.find(row=>row[0]===parts[2]));
 if(!person){
  const target=!travel?'참가기업':attendanceStates.has(step)?'참가자':'해외 바이어';
  return notice('현재 행사 '+target+' QR인지 확인해 주세요.');
 }
 const key=raw+'|'+step,now=Date.now();if(last===key&&now-lastAt<3000)return;
 last=key;lastAt=now;
 const records=JSON.parse(sessionStorage.getItem('gfair.qr.checks')||'[]');
 records.push({code:travel?parts[3]:parts[2],name:person[1],state:step,at:new Date().toISOString(),mode:travel?'travel':'consult',role:scanRole,...(travel?{participantType:parts[2],eventYear:year}:{})});
 sessionStorage.setItem('gfair.qr.checks',JSON.stringify(records));
 notice(travel?`${person[1]} ${step} 처리 되었습니다.`:`${person[1]} ${step} 처리되었습니다`);
}
let cameraFacing='environment';
async function start(){
 stop();const token=epoch;
 try{
  if(!navigator.mediaDevices?.getUserMedia)throw Error('unsupported');
  const next=await navigator.mediaDevices.getUserMedia({video:{facingMode:{ideal:cameraFacing}},audio:false});
  if(token!==epoch){next.getTracks().forEach(t=>t.stop());return;}
  media=next;const video=document.querySelector('#qr-video');if(!video){stop();return;}video.srcObject=media;await video.play();
  if(!('BarcodeDetector' in window))return;
  const detector=new BarcodeDetector({formats:['qr_code']});
  async function tick(){if(token!==epoch)return;try{if(video.readyState>=2&&!busy){busy=true;const codes=await detector.detect(video);if(token===epoch&&codes[0])accept(codes[0].rawValue);}}catch{/* 다음 프레임에서 다시 인식한다. */}finally{busy=false;if(token===epoch)frame=requestAnimationFrame(tick);}}
  frame=requestAnimationFrame(tick);
 }catch{if(token===epoch)stop();}
}
const qrRoutes = ['PRE-03', 'PRE-12', 'JNL-03'];
const loginContextKey = 'gfair.qr.login-context';
const qrContextKeys = ['popup', 'userRole', 'eventYear', 'from'];
const returnUrl = new URL(location.href);
const context = returnUrl.searchParams;
if (context.has('annotation_code') || context.has('annotation_error')) {
 const pending = sessionStorage.getItem(loginContextKey);
 sessionStorage.removeItem(loginContextKey);
 const saved = pending && new URL(pending, location.origin);
 if (saved && saved.pathname === returnUrl.pathname && saved.hash === returnUrl.hash) {
  for (const key of qrContextKeys) {
   if (saved.searchParams.has(key)) context.set(key, saved.searchParams.get(key));
  }
  history.replaceState(history.state, '', returnUrl);
 }
}
const standalone = id => context.get('popup') === 'qr' && qrRoutes.includes(id);
function rememberLoginContext() {
 sessionStorage.removeItem(loginContextKey);
 if (!standalone(location.hash.slice(1))) return;
 const url = new URL(location.pathname + location.hash, location.origin);
 for (const key of qrContextKeys) {
  if (context.has(key)) url.searchParams.set(key, context.get(key));
 }
 sessionStorage.setItem(loginContextKey, url.pathname + url.search + url.hash);
}
function windowUrl(screen, from, role, year) {
 const url = new URL('index.html', location.href);
 url.search = new URLSearchParams({popup:'qr', userRole:role, eventYear:year, from});
 url.hash = screen;
 return E(url.pathname + url.search + url.hash);
}
function sourceUrl(fallback) {
 const from = context.get('from');
 const source = /^[A-Z]+-\d{2}$/.test(from || '') ? from : fallback;
 return 'index.html#' + source;
}
function backLink(id) {
 if (!standalone(id) || id === 'PRE-12') {
  const destination = id === 'PRE-12' ? 'PRE-03' : 'JNL-07';
  return '<a class="qr-back" href="#' + destination + '" aria-label="뒤로가기">←</a>';
 }
 return '<a class="qr-back" data-qr-close href="' + sourceUrl('JNL-07') + '" aria-label="QR 스캔 창 닫기">←</a>';
}
function travelShortcut(id, role, year, mobile = false) {
 if (!statusOperators.includes(role) || ['PRE-03', 'PRE-12', 'COM-01'].includes(id)) return '';
 return '<a class="qr-travel-shortcut'+(mobile?' qr-travel-mobile':'')+'" href="'+windowUrl('PRE-03',id,role,year)+'" target="_blank" rel="noopener"><span class="qr-shortcut-label"><i data-lucide="qr-code" aria-hidden="true"></i><strong>QR 스캔</strong></span></a>';
}
function floating(id,role,year){if (statusOperators.includes(role)) return travelShortcut(id, role, year, true);return ['interpreter','buyer'].includes(role)&&!['COM-01','JNL-03','PRE-12'].includes(id)?'<a class="qr-floating" href="'+windowUrl('JNL-03',id,role,year)+'" target="_blank" rel="noopener"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="3" width="5" height="5" rx="1"/><rect x="16" y="3" width="5" height="5" rx="1"/><rect x="3" y="16" width="5" height="5" rx="1"/><path d="M21 16h-3a2 2 0 0 0-2 2v3m5 0v.01M12 7v3a2 2 0 0 1-2 2H7m-4 0h.01M12 3h.01M12 16h.01M16 12h1m4 0h.01M12 21v-1"/></svg><span>상담 시작</span></a>':'';}
function render(s,role,year,head){
 const travel=s.id.startsWith('PRE'),camera=['PRE-12','JNL-03'].includes(s.id),allowed=travel?statusOperators.includes(role):['interpreter','buyer'].includes(role);
 if(!allowed)return head(s)+'<div class="empty"><strong>이 화면에 접근할 수 없습니다.</strong><p>'+(travel?'관리자·구매상담 운영용역사·수출상담 운영용역사':'통역원·구매 바이어')+' 전용 화면입니다.</p></div>';
 if(eventYear!==year)state='';
 eventYear=year; scanRole=role;
 if(camera){const step=travel?state:consultState;
 return `<section class="qr-camera qr-camera-wide" aria-label="QR 스캔 카메라"><header class="qr-camera-top">${backLink(s.id)}<div>${travel?'<strong>'+E(step||'상태 미선택')+'</strong>':'<strong>'+consultState+'</strong>'}<span>${date()}</span></div><button type="button" class="qr-facing" data-qr-facing aria-label="전면 카메라로 전환"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M20 7h-4l-2-3h-4L8 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2Z"/><path d="M8 13a4 4 0 1 1 3 4m-3-7v3h3"/></svg><span>후면 카메라</span></button></header><div class="qr-viewfinder" id="qr-viewfinder"><video id="qr-video" autoplay muted playsinline></video><div class="qr-reticle" aria-hidden="true"></div><p class="qr-scan-guide">${travel?(attendanceStates.has(step)?"참가자 명찰 QR을 카메라로 스캔해 주세요":"바이어 명찰 QR을 카메라로 스캔해 주세요"):"참가기업 부스 QR을 카메라로 스캔해 주세요"}</p></div>${travel?`<div id="qr-feedback" class="qr-feedback" role="status" aria-live="polite">${E(`James Whitmore ${step||'호텔 도착'} 처리 되었습니다.`)}</div>`:'<div class="qr-feedback qr-camera-warning" role="alert"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10.3 4.9 2.8 18a2 2 0 0 0 1.7 3h15a2 2 0 0 0 1.7-3L13.7 4.9a2 2 0 0 0-3.4 0Z"/><path d="M12 9v4m0 4h.01"/></svg><div><strong>사용 가능한 카메라가 없습니다.</strong><p>카메라 연결 상태를 확인해 주세요</p></div></div>'}</section>`;
 }
 const dateParts=new Intl.DateTimeFormat("ko-KR",{timeZone:"Asia/Seoul",year:"numeric",month:"2-digit",day:"2-digit",weekday:"short"}).formatToParts(new Date());
 const part=type=>dateParts.find(entry=>entry.type===type).value;
 const launchDate=`${part("year")}.${part("month")}.${part("day")}(${part("weekday")})`;
 return `${standalone(s.id) ? '' : head(s)}
 <section class="qr-launch qr-launch-centered" aria-labelledby="qr-event-name">
  <header>
   <h2 id="qr-event-name">G-FAIR KOREA ${E(year)}</h2>
   <p class="qr-date" id="qr-date">${launchDate}</p>
  </header>
  <div class="qr-field" id="qr-state-field">
   <label for="qr-status-select">상태 관리</label>
   <select id="qr-status-select" aria-describedby="qr-launch-help">
    <option value="">선택해 주세요</option>
    ${states.map(value=>`<option ${value===state?"selected":""}>${value}</option>`).join("")}
   </select>
  </div>
  <p id="qr-launch-help">선택한 상태로 방한 단계 또는 행사 출결을 체크합니다.</p>
  <div class="actions"><button type="button" class="btn primary" id="qr-launch" data-qr-launch ${state?"":"disabled"}>QR 스캔</button></div>
 </section>`;
}
document.addEventListener('change',e=>{if(e.target.id==='qr-status-select'){state=e.target.value;const launch=document.querySelector('#qr-launch');if(launch)launch.disabled=!e.target.value;document.querySelector('#qr-feedback')?.setAttribute('hidden','');last='';}});
document.addEventListener('click',e=>{const b=e.target.closest('[data-qr-launch],[data-qr-close],[data-qr-facing]');if(!b)return;
 if(b.hasAttribute('data-qr-close')){window.close();return;}
 if(b.hasAttribute('data-qr-launch')){location.hash='PRE-12';return;}
 if(b.hasAttribute('data-qr-facing')){
  cameraFacing=cameraFacing==='environment'?'user':'environment';
  const front=cameraFacing==='user';
  b.querySelector('span').textContent=front?'전면 카메라':'후면 카메라';
  b.setAttribute('aria-label',front?'후면 카메라로 전환':'전면 카메라로 전환');
  start();return;
 }
});
let mounted=null;function mount(){const node=document.querySelector('#qr-viewfinder');if(node===mounted)return;mounted=node;stop();if(node){cameraFacing='environment';start();}}
new MutationObserver(mount).observe(document.getElementById('app'),{childList:true,subtree:true});
window.addEventListener('hashchange',event=>{
 if(new URL(event.oldURL).hash==='#PRE-12'&&location.hash==='#PRE-03')state='';
 stop();
});window.addEventListener('pagehide',stop);
window.GFAIR_QR_WORKFLOW={render,floating,travelShortcut,standalone,rememberLoginContext,states,stop};
})();
