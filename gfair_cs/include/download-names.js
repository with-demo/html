(()=>{'use strict';
 const safe=value=>String(value??'').trim().replace(/[<>:"/\\|?*\u0000-\u001f]/g,'_').replace(/[. ]+$/g,'').slice(0,100)||'미등록';
 const category=value=>safe(value).replace(/\s+/g,'');
 const date=()=>new Intl.DateTimeFormat('sv-SE',{timeZone:'Asia/Seoul',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date()).replaceAll('-','');
 const birth=value=>/^\d{4}-?\d{2}-?\d{2}$/.test(value||'')?String(value).replaceAll('-',''):'생년월일미등록';
 window.GFAIR_DOWNLOAD_NAMES={safe,date,list:(year,type,selected=false)=>'G-FAIR_'+safe(year)+'_'+category(type)+(selected?'_선택':'')+'_'+date()+'.xlsx',qrZip:(year,type,selected)=>'G-FAIR_'+safe(year)+'_'+category(type)+'_'+(selected?'선택':'전체')+'QR코드.zip',qrImage:(name,dob,id='')=>safe(name)+'_'+birth(dob)+(id?'_'+safe(id):'')+'_qr코드.png'};
})();
