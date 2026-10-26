(()=>{'use strict';
 const safe=value=>String(value??'').trim().replace(/[<>:"/\\|?*\u0000-\u001f]/g,'_').replace(/[. ]+$/g,'').slice(0,100)||'미등록';
 const category=value=>safe(value).replace(/\s+/g,'');
 const date=()=>new Intl.DateTimeFormat('sv-SE',{timeZone:'Asia/Seoul',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date()).replaceAll('-','');
 const birth=value=>/^\d{4}-?\d{2}-?\d{2}$/.test(value||'')?String(value).replaceAll('-',''):'생년월일미등록';
 const png=payload=>{if(typeof window.qrcode!=='function')throw Error('QR 도구를 불러오지 못했습니다.');const qr=window.qrcode(0,'M');qr.addData(payload);qr.make();const n=qr.getModuleCount(),scale=8,margin=4,canvas=document.createElement('canvas');canvas.width=canvas.height=(n+margin*2)*scale;const paint=canvas.getContext('2d');paint.fillStyle='#fff';paint.fillRect(0,0,canvas.width,canvas.height);paint.fillStyle='#000';for(let row=0;row<n;row++)for(let col=0;col<n;col++)if(qr.isDark(row,col))paint.fillRect((col+margin)*scale,(row+margin)*scale,scale,scale);return canvas.toDataURL('image/png');};
 window.GFAIR_DOWNLOAD_NAMES={safe,date,png,template:(year,type)=>'G-FAIR_'+safe(year)+'_'+category(type)+'_등록양식_'+date()+'.xlsx',list:(year,type,selected=false)=>'G-FAIR_'+safe(year)+'_'+category(type)+(selected?'_선택':'')+'_'+date()+'.xlsx',qrZip:(year,type,selected)=>'G-FAIR_'+safe(year)+'_'+category(type)+'_'+(selected?'선택':'전체')+'QR코드.zip',qrImage:(name,dob,id='')=>safe(name)+'_'+birth(dob)+(id?'_'+safe(id):'')+'_qr코드.png'};
})();
