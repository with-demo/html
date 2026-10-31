window.GFAIR_INCLUDE.footer=()=>'<footer class="footer"><span>COPYRIGHT 2026 (C) G-FAIR KOREA 구매 및 수출 상담시스템 ALL RIGHTS RESERVED.</span></footer>';
(()=>{const projectBase=document.currentScript.src,shared=new URL('../../common/',projectBase);const config=document.createElement('script');config.src=new URL('config.js?v=clean-copy-20261021',shared).href;config.onload=()=>{const data=document.createElement('script');data.src=new URL('include/collaboration.js?v=shared-description-restored-20261023',shared).href;data.onload=()=>{const highlights=document.createElement('script');highlights.src=new URL('include/description-changes.js?v=word-change-color-20261031',shared).href;highlights.onload=()=>{const script=document.createElement('script');script.onload=()=>{const seeds=document.createElement('script');seeds.src=new URL('../data/message-specs.js?v=domestic-phone-three-20261031',projectBase).href;seeds.onload=()=>{const tabs=document.createElement('script');tabs.src=new URL('include/message-specs.js?v=literal-description-format-20261031',shared).href;document.head.append(tabs);};document.head.append(seeds);};script.src=new URL('include/annotations.js?v=overview-loading-20261031',shared).href;document.head.append(script);};document.head.append(highlights);};document.head.append(data);};document.head.append(config);})();
(()=>{const base=document.currentScript.src,css=document.createElement('link'),script=document.createElement('script');css.rel='stylesheet';css.href=new URL('../css/group-access.css?v=table-form-20261029',base).href;script.src=new URL('group-access.js?v=description-picking-20261029',base).href;document.head.append(css,script);})();
(()=>{const base=document.currentScript.src,css=document.createElement('link'),script=document.createElement('script');css.rel='stylesheet';css.href=new URL('../css/admin-list-ui.css?v=list-column-width-20261031',base).href;script.src=new URL('admin-list-ui.js?v=latest-participation-year-20261031',base).href;document.head.append(css,script);})();

// 공동작업 Description 패널을 직접 불러온다.
(()=>{const script=document.createElement('script');script.src=new URL('../../common/include/spec-panel.js?v=number-toggle-20261023-2',document.currentScript.src).href;document.head.append(script);})();
(()=>{const script=document.createElement('script');script.src=new URL('notice-ui.js?v=page-sizes-20261030',document.currentScript.src).href;document.head.append(script);})();

// 목록 본문은 가운데 정렬, 긴 텍스트 열은 왼쪽 정렬한다.
(()=>{
 const app=document.getElementById('app');if(!app)return;
 const alignLists=()=>app.querySelectorAll('table').forEach(table=>{
  const headers=Array.from(table.querySelectorAll('thead tr:last-child>th'));
  const longColumns=headers.map(header=>/제목|내용|설명|사유|주소|비고|메모/.test(header.textContent));
  table.querySelectorAll('tbody>tr').forEach(row=>Array.from(row.children).forEach((cell,index)=>{
   cell.classList.toggle('list-text-left',cell.colSpan===1&&!!longColumns[index]);
  }));
 });
 new MutationObserver(alignLists).observe(app,{childList:true,subtree:true});alignLists();
})();

(()=>{const script=document.createElement("script");script.src=new URL("attendance-dashboard.js?v=scheduled-attendance-20261031",document.currentScript.src).href;document.head.append(script);})();

(()=>{const base=document.currentScript.src;const css=document.createElement('link');css.rel='stylesheet';css.href=new URL('../css/list-row-navigation.css?v=participant-examples-revert-align-20261031',base).href;document.head.append(css);const script=document.createElement('script');script.src=new URL('list-row-navigation.js?v=name-links-20261022',base).href;document.head.append(script);})();

(()=>{const base=document.currentScript.src;const css=document.createElement('link');css.rel='stylesheet';css.href=new URL('../css/management-ui.css?v=detail-left-admin-order-20261031',base).href;document.head.append(css);const script=document.createElement('script');script.src=new URL('management-ui.js?v=com08-readonly-name-id-20261031',base).href;document.head.append(script);})();

(()=>{const script=document.createElement('script');script.src=new URL('public-boards.js?v=resource-actions-20261022',document.currentScript.src).href;document.head.append(script);})();

(()=>{const link=document.createElement('link');link.rel='stylesheet';link.href=new URL('../css/agency-filters.css?v=agency-multi-20261020',document.currentScript.src).href;document.head.append(link);})();

(()=>{const script=document.createElement('script');script.src=new URL('master-upload-ui.js?v=member-lifecycle-20261030',document.currentScript.src).href;document.head.append(script);})();
(()=>{const script=document.createElement('script');script.src=new URL('popup-description-example.js?v=groups-surveys-20261028',document.currentScript.src).href;document.head.append(script);})();

(()=>{const script=document.createElement("script");script.src=new URL("list-summary.js?v=account-pages-final-20261030",document.currentScript.src).href;document.head.append(script);})();

(()=>{const base=document.currentScript.src,css=document.createElement("link"),js=document.createElement("script");css.rel="stylesheet";css.href=new URL("../css/search-filters.css?v=filter-cell-alignment-20261023",base).href;js.src=new URL("search-filters.js?v=company-label-input-limit-20261031",base).href;document.head.append(css,js);})();

(()=>{const s=document.createElement('script');s.src=new URL('people-excel.js?v=member-templates-20261028',document.currentScript.src);document.head.append(s);})();

