window.GFAIR_INCLUDE=window.GFAIR_INCLUDE||{};
window.GFAIR_INCLUDE.sidebar=({s,role,event,info,surveyMenuOpen,escape:E})=>{
 const tree=window.GFAIR_NAV.visible(role).filter(g=>!['로그인','알림'].includes(g.name)&&(g.items[0]?.[0]!=='NTC-08'||surveyMenuOpen)),active=info?.owner;
 const settings=tree.find(group=>group.name==='환경설정');
 if(role==='admin'&&settings)settings.items=settings.items.filter(([id])=>id!=='SET-07');
 const qrShortcut=window.GFAIR_QR_WORKFLOW?.travelShortcut(s.id,role,event)||'';
 const link=([id,label])=>`<a href="#${id}" class="${active===id?'active':''}" ${active===id?'aria-current="page"':''}>${E(label)}</a>`;
 return `<aside class="sidebar"><a class="brand gtms-brand" href="#MON-01"><img class="gtms-logo" src="assets/branding/gtms-logo-transparent.png" alt="GTMS — G-FAIR Trade Management System"></a><nav aria-label="사이트맵 메뉴">${tree.map(g=>g.direct?`<a href="#${g.items[0][0]}" class="nav-primary-link ${active===g.items[0][0]?'active':''}" ${active===g.items[0][0]?'aria-current="page"':''}><span class="icon"><i data-lucide="${g.icon}" aria-hidden="true"></i></span><span>${E(g.name)}</span></a>`:`<details class="nav-group" ${g.name===info?.g.name?'open':''}><summary class="${g.name===info?.g.name?'active':''}"><span class="icon"><i data-lucide="${g.icon}" aria-hidden="true"></i></span><span>${E(g.name)}</span><span class="nav-chevron" aria-hidden="true">⌄</span></summary><div class="nav-children">${g.items.map(i=>i[2].length?`<details class="nav-second" ${active===i[0]||i[2].some(c=>c[0]===active)?'open':''}><summary><span>${E(i[1])}</span><span class="nav-chevron" aria-hidden="true">⌄</span></summary><div class="nav-third">${i[2].map(link).join('')}</div></details>`:link(i)).join('')}</div></details>`).join('')}</nav>${qrShortcut}</aside>`;
};
// 한 단계에서 한 메뉴만 펼쳐 전체 높이를 줄인다.
document.addEventListener('toggle',event=>{
 const current=event.target;
 if(!current.matches?.('.sidebar details')||!current.open)return;
 for(const sibling of current.parentElement.children){if(sibling!==current&&sibling.tagName==='DETAILS')sibling.open=false;}
},true);
