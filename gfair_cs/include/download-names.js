(()=>{'use strict';
 const safe=value=>String(value??'').trim().replace(/[<>:"/\\|?*\u0000-\u001f]/g,'_').replace(/[. ]+$/g,'').slice(0,100)||'미등록';
 const category=value=>safe(value).replace(/\s+/g,'');
 const date=()=>new Intl.DateTimeFormat('sv-SE',{timeZone:'Asia/Seoul',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date()).replaceAll('-','');
 const png=(payload,filename='')=>{
  if(typeof window.qrcode!=='function')throw Error('QR 도구를 불러오지 못했습니다.');const qr=window.qrcode(0,'M');qr.addData(payload);qr.make();
  const n=qr.getModuleCount(),scale=8,margin=4,size=(n+margin*2)*scale,canvas=document.createElement('canvas'),measure=document.createElement('canvas').getContext('2d'),font='12px Arial, "Malgun Gothic", sans-serif',lines=[];measure.font=font;let line='';
  for(const char of String(filename)){if(line&&measure.measureText(line+char).width>size-24){lines.push(line);line=char;}else line+=char;}if(line)lines.push(line);
  canvas.width=size;canvas.height=size+(lines.length?lines.length*16+12:0);const paint=canvas.getContext('2d');paint.fillStyle='#fff';paint.fillRect(0,0,canvas.width,canvas.height);paint.fillStyle='#000';
  for(let row=0;row<n;row++)for(let col=0;col<n;col++)if(qr.isDark(row,col))paint.fillRect((col+margin)*scale,(row+margin)*scale,scale,scale);
  paint.font=font;paint.fillStyle='#555';paint.textAlign='center';paint.textBaseline='top';lines.forEach((text,i)=>paint.fillText(text,size/2,size+4+i*16));return canvas.toDataURL('image/png');
 };

 window.GFAIR_DOWNLOAD_NAMES={safe,date,png,template:(year,type)=>'G-FAIR_'+safe(year)+'_'+category(type)+'_등록양식_'+date()+'.xlsx',list:(year,type,selected=false)=>'G-FAIR_'+safe(year)+'_'+category(type)+(selected?'_선택':'')+'_'+date()+'.xlsx',qrZip:(year,type,selected)=>'G-FAIR_'+safe(year)+'_'+category(type)+'_'+(selected?'선택':'전체')+'QR코드.zip',qrImage:(name,id)=>safe(name)+'_'+safe(id)+'_qr코드.png'};
})();
