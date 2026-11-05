/* QR 동선 목업. 예시 체크 이력만 현재 탭에 보관한다. */
(()=>{'use strict';
const states=['입국','호텔 이동','호텔 도착','전시장 출발','전시장 입장','통역원 만남','전시장 퇴장'];
const screens=GFAIR_SCREENS.flatMap(g=>g.screens),get=id=>screens.find(s=>s.id===id);
for(const [id,title,kind] of [['PRE-03','QR 리더기 실행','form'],['JNL-03','상담 QR 리더','mobile']])Object.assign(get(id),{title,kind});
for(const [id,title,parent] of [['PRE-12','방한 QR 스캔 카메라','PRE-03']]){
 GFAIR_SCREENS.find(g=>g.screens.some(s=>s.id===parent)).screens.push({...get(parent),id,title,parent,kind:parent==='PRE-03'?'form':'mobile',ui:{}});
}
// 플로팅 진입 화면도 화면선택·화면검색에 포함한다.
window.GFAIR_SCREEN_REGISTRY.push({id:'JNL-03',parent:'JNL-14'},{id:'PRE-03',parent:'PRE-01'},{id:'PRE-12',parent:'PRE-03'});
let mode='travel',state='',consultState='상담 시작',media=null,epoch=0,frame=null,busy=false,last='',lastAt=0,returnTo='JNL-07',toastTimer;
const E=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const date=()=>new Intl.DateTimeFormat('ko-KR',{dateStyle:'full',timeZone:'Asia/Seoul'}).format(new Date());
function stop(){epoch++;cancelAnimationFrame(frame);media?.getTracks().forEach(t=>t.stop());media=null;busy=false;}
function notice(text){const el=document.querySelector('#qr-feedback');if(el){clearTimeout(toastTimer);el.hidden=false;el.textContent=text;if(location.hash!=='#PRE-12')toastTimer=setTimeout(()=>{el.hidden=true;},4000);}}
function status(text){const el=document.querySelector('#qr-camera-status');if(el)el.textContent=text;}
function accept(raw){
 const travel=location.hash==='#PRE-12',step=travel?state:consultState;
 if(!step)return notice('처리할 상태를 먼저 선택해 주세요.');
 const parts=String(raw).split('|'),year=document.querySelector('#event-picker')?.value||'2026';
 const source=travel?get('BAS-03')?.ui.rows: get('BAS-09')?.ui.rows;
 // 기존 참가자·기업 QR의 행사/대상 구분과 고유 코드를 검증한다.
 const valid=parts[0]==='GFAIR-DEMO'&&parts[1]===String(year)&&(travel?parts[2]==='OVERSEAS':parts.length===4);
 const code=travel?parts[3]:parts[2],person=valid?source?.find(r=>r[0]===code):null;
 if(!person)return notice(travel?'현재 행사 해외 바이어 QR인지 확인해 주세요.':'현재 행사 참가기업 QR인지 확인해 주세요.');
 const key=raw+'|'+step,now=Date.now();if(last===key&&now-lastAt<3000)return;
 last=key;lastAt=now;
 const records=JSON.parse(sessionStorage.getItem('gfair.qr.checks')||'[]');
 records.push({code,name:person[1],state:step,at:new Date().toISOString(),mode:travel?'travel':'consult',role:document.querySelector('#role-picker')?.value});
 sessionStorage.setItem('gfair.qr.checks',JSON.stringify(records));
 notice(travel?`${person[1]}가 ${step} 처리되었습니다`:`${person[1]} ${step} 처리되었습니다`);
}
let travelFacing='environment';
async function start(){
 stop();const token=epoch;status('카메라 연결 중');
 try{
  if(!navigator.mediaDevices?.getUserMedia)throw Error('unsupported');
  const next=await navigator.mediaDevices.getUserMedia({video:{facingMode:{ideal:location.hash==='#PRE-12'?travelFacing:'environment'}},audio:false});
  if(token!==epoch){next.getTracks().forEach(t=>t.stop());return;}
  media=next;const video=document.querySelector('#qr-video');if(!video){stop();return;}video.srcObject=media;await video.play();
  status('QR 코드를 사각형 안에 맞춰 주세요');
  if(!('BarcodeDetector' in window)){status('이 브라우저의 QR 자동 인식을 지원하지 않습니다. 다른 브라우저를 이용해 주세요.');return;}
  const detector=new BarcodeDetector({formats:['qr_code']});
  async function tick(){if(token!==epoch)return;try{if(video.readyState>=2&&!busy){busy=true;const codes=await detector.detect(video);if(token===epoch&&codes[0])accept(codes[0].rawValue);}}catch{status('QR을 인식하지 못했습니다. 다시 맞춰 주세요.');}finally{busy=false;if(token===epoch)frame=requestAnimationFrame(tick);}}
  frame=requestAnimationFrame(tick);
 }catch(error){if(token!==epoch)return;status(error.name==='NotAllowedError'?'카메라 권한이 필요합니다. 브라우저 설정을 확인한 후 다시 시도해 주세요.':error.name==='NotFoundError'?'사용 가능한 카메라가 없습니다.':'카메라를 실행하지 못했습니다. 연결 상태를 확인해 주세요.');}
}
function travelShortcut(id, role, mobile = false) {
 if (!['admin', 'exportOperator'].includes(role) || ['PRE-03', 'PRE-12', 'COM-01'].includes(id)) return '';
 return '<a class="qr-travel-shortcut'+(mobile?' qr-travel-mobile':'')+'" href="#PRE-03"><span aria-hidden="true"><i data-lucide="qr-code"></i></span><span><strong>QR 스캔</strong><small>해외 바이어 방한 체크</small></span><span aria-hidden="true">›</span></a>';
}
function floating(id,role){if (['admin','exportOperator'].includes(role)) return travelShortcut(id, role, true);return ['interpreter','buyer'].includes(role)&&!['COM-01','JNL-03','PRE-12'].includes(id)?'<a class="qr-floating" href="#JNL-03" aria-label="상담 시작·종료 QR 스캔" data-qr-floating><span aria-hidden="true">▦</span><span>QR 스캔</span></a>':'';}
function render(s,role,year,head){
 const travel=s.id.startsWith('PRE'),camera=['PRE-12','JNL-03'].includes(s.id),allowed=travel?['admin','exportOperator'].includes(role):['interpreter','buyer'].includes(role);
 if(!allowed)return head(s)+'<div class="empty"><strong>이 화면에 접근할 수 없습니다.</strong><p>'+(travel?'관리자·수출상담 운영용역사':'통역원·구매 바이어')+' 전용 화면입니다.</p></div>';
 mode=travel?'travel':'consult';
 if(camera){const step=travel?state:consultState;
 return `<section class="qr-camera${travel?' qr-camera-wide':''}" aria-label="QR 스캔 카메라"><header class="qr-camera-top"><a class="qr-back" href="#${travel?'PRE-03':E(returnTo)}" aria-label="뒤로가기">←</a><div>${travel?'<strong>'+E(step||'상태 미선택')+'</strong>':'<label class="qr-consult-label" for="qr-status-select">상담 상태</label><select id="qr-status-select">'+['상담 시작','상담 종료'].map(v=>'<option '+(v===consultState?'selected':'')+'>'+v+'</option>').join('')+'</select>'}<span>${date()}</span></div>${travel?`<button type="button" class="qr-facing" data-qr-facing aria-label="전면 카메라로 전환"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M20 7h-4l-2-3h-4L8 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2Z"/><path d="M8 13a4 4 0 1 1 3 4m-3-7v3h3"/></svg><span>후면 카메라</span></button>`:''}</header><div class="qr-viewfinder" id="qr-viewfinder"><video id="qr-video" autoplay muted playsinline></video><div class="qr-reticle" aria-hidden="true"></div>${travel?'':`<p id="qr-camera-status">카메라를 준비하고 있습니다.</p>`}${travel?'<p class="qr-scan-guide">바이어 명찰 QR을 카메라에 비추거나 리더기로 스캔해 주세요</p>':''}</div><div id="qr-feedback" class="qr-feedback" role="status" aria-live="polite" ${travel?'':'hidden'}>${travel?E(`James Whitmore가 ${step||'호텔 도착'} 처리되었습니다`):''}</div>${travel?'':`<div class="qr-camera-tools"><button type="button" class="btn" data-qr-retry>카메라 다시 연결</button></div>`}</section>`;
 }
 return `${head(s)}<section class="qr-launch"><p class="qr-date" id="qr-date">${date()}</p><h2>${travel?'바이어 방한 상태':'상담 상태'}</h2><div class="qr-field" id="qr-state-field"><label for="qr-status-select">${travel?'바이어 상태':'상태 선택'}</label><select id="qr-status-select"><option value="">선택해 주세요</option>${(travel?states:['상담 시작','상담 종료']).map(v=>`<option ${v===(travel?state:consultState)?'selected':''}>${v}</option>`).join('')}</select></div><div class="qr-launch-guide"><span aria-hidden="true">▦</span><strong>${travel?'해외 바이어 QR을 스캔해 주세요':'참가기업 QR을 스캔해 주세요'}</strong><p>${travel?'선택한 상태로 바이어의 방한 진행 단계를 체크합니다.':'상담 시작·종료를 선택한 후 부스의 QR을 스캔합니다.'}</p></div><div class="actions"><button type="button" class="btn primary" id="qr-launch" data-qr-launch ${travel&&!state?'disabled':''}>QR 스캔</button></div>${travel?'':`<a class="qr-return" href="#${E(returnTo)}">이전 화면</a>`}</section>`;
}
document.addEventListener('change',e=>{if(e.target.id==='qr-status-select'){if(mode==='travel')state=e.target.value;else consultState=e.target.value;const launch=document.querySelector('#qr-launch');if(launch)launch.disabled=!e.target.value;document.querySelector('#qr-feedback')?.setAttribute('hidden','');last='';}});
document.addEventListener('click',e=>{const b=e.target.closest('[data-qr-launch],[data-qr-retry],[data-qr-floating],[data-qr-facing]');if(!b)return;
 if(b.hasAttribute('data-qr-floating')){returnTo=location.hash.slice(1);return;}
 if(b.hasAttribute('data-qr-launch')){location.hash=mode==='travel'?'PRE-12':'JNL-03';return;}
 if(b.hasAttribute('data-qr-facing')){
  travelFacing=travelFacing==='environment'?'user':'environment';
  const front=travelFacing==='user';
  b.querySelector('span').textContent=front?'전면 카메라':'후면 카메라';
  b.setAttribute('aria-label',front?'후면 카메라로 전환':'전면 카메라로 전환');
  start();return;
 }
 if(b.hasAttribute('data-qr-retry')){start();return;}
});
let mounted=null;function mount(){const node=document.querySelector('#qr-viewfinder');if(node===mounted)return;mounted=node;stop();if(node){travelFacing='environment';start();}}
new MutationObserver(mount).observe(document.getElementById('app'),{childList:true,subtree:true});
window.addEventListener('hashchange',stop);window.addEventListener('pagehide',stop);
window.GFAIR_QR_WORKFLOW={render,floating,travelShortcut,states,stop};
})();
