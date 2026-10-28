/* BAS-09 검색 조건. 선택값은 검색 제출 시에만 목록에 적용한다. */
(()=>{'use strict';
 const E=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const categories=['전체','Food','Kitchen','Leisure','Beauty','Fashion','Houseware','Smart','Tech'];
 const catalog={'기업-fluff':['Beauty'],'기업-01':['Houseware'],'기업-02':['Beauty']};
 const demoCategories=[['Houseware','Tech','Kitchen','Smart','Leisure'],['Food'],['Kitchen','Houseware'],['Leisure','Fashion'],['Beauty','Fashion','Houseware','Tech'],['Fashion'],['Houseware'],['Smart','Tech'],['Tech'],['Food','Kitchen'],['Beauty'],['Leisure'],['Kitchen','Smart','Tech','Houseware'],['Fashion','Beauty'],['Houseware','Leisure'],['Smart'],['Tech','Houseware','Kitchen','Food','Smart','Leisure']];
 demoCategories.forEach((values,i)=>catalog['기업-DEMO-'+String(i+1).padStart(2,'0')]=values);
 const matches=(r,f)=>!f.companyCategory||f.companyCategory==='전체'||(catalog[r[0]]||[]).includes(f.companyCategory);
 function render(rows,f){const category=f.companyCategory||'전체';return '<form id="filter-form" class="panel filters company-filter"><label class="field"><span>메인 카테고리</span><select name="companyCategory" aria-label="메인 카테고리">'+categories.map(c=>'<option'+(c===category?' selected':'')+'>'+c+'</option>').join('')+'</select></label><label class="field"><span>키워드 검색</span><input type="search" name="f0" aria-label="키워드 검색" value="'+E(f.f0||'')+'"></label><div class="row"><button type="submit" class="btn primary">검색</button><button type="button" class="btn" data-action="reset">초기화</button></div></form>';}
 function categoryLabel(row){const values=[...new Set(catalog[row[0]]||[])];return values.length?values.slice(0,3).map(E).join(' / ')+(values.length>3?' <span style="white-space:nowrap">그 외 '+(values.length-3)+'건</span>':''):'-';}
 window.GFAIR_COMPANY_FILTER={render,matches,categoryLabel,categoriesFor:row=>[...new Set(catalog[row[0]]||[])]};
})();
