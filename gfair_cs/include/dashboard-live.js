// 목업 연결 상태. 실제 운영에서는 실시간 전송/heartbeat 상태를 이 표시와 연결한다.
(()=>{'use strict';
 const labels={connected:'연결됨',disconnected:'연결 끊어짐',reconnecting:'재연결 중...'};
 let state=navigator.onLine===false?'disconnected':'connected',pending=null;
 function paint(){document.querySelectorAll('[data-dashboard-connection]').forEach(node=>{node.dataset.connectionState=state;node.querySelector('[data-connection-text]').textContent=labels[state];});}
 function set(next){state=next;paint();}
 function markup(screen){const id=screen==='MON-08'?'MON-08':'MON-01';return '<div class="dashboard-live-control"><span class="dashboard-connection" data-dashboard-connection data-connection-state="'+state+'" role="status" aria-live="polite"><span class="dashboard-connection-dot" aria-hidden="true"></span><span data-connection-text>'+labels[state]+'</span></span><button type="button" class="btn ghost dashboard-refresh" data-dashboard-refresh="'+id+'" aria-label="실시간 업데이트" title="실시간 업데이트"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 7v5h-5M4 17v-5h5M6 7a7 7 0 0 1 12-1l2 3M18 17a7 7 0 0 1-12 1l-2-3"/></svg></button></div>';}
 function retry(screen){clearTimeout(pending);set('reconnecting');pending=setTimeout(()=>{if(navigator.onLine===false){set('disconnected');return;}if(screen)window.dispatchEvent(new CustomEvent('gfair-live-refresh',{detail:{screen}}));set('connected');},500);}
 window.addEventListener('offline',()=>{clearTimeout(pending);set('disconnected');});
 window.addEventListener('online',()=>retry(location.hash.slice(1)));
 document.addEventListener('click',event=>{const button=event.target.closest('[data-dashboard-refresh]');if(button)retry(button.dataset.dashboardRefresh);});
 window.GFAIR_DASHBOARD_LIVE={markup,retry,get state(){return state;}};
})();
