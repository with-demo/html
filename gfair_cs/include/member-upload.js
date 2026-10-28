// 회원 등록양식·검증의 단일 기준. 참고 시트와 [예시] 행은 등록하지 않는다.
(()=>{'use strict';
 const schemas={
  'BAS-03':{file:'overseas-buyer.xlsx',type:'해외바이어',fields:[['name','바이어명',true],['dob','생년월일',true],['country','바이어국가(코드)',true],['invitation','초청기관'],['phone','연락처'],['email','이메일'],['memo','메모']],example:['[예시] James Whitmore','1990-01-01','GB','KBC','+44-20-7946-0123','james@example.com','예시 행은 등록되지 않습니다. 실제 데이터는 다음 행부터 입력해 주세요.']},
  'BAS-05':{file:'domestic-buyer.xlsx',type:'국내바이어',fields:[['name','바이어명',true],['dob','생년월일',true],['organization','소속기업'],['invitation','초청기관'],['phone','연락처'],['email','이메일'],['memo','메모']],example:['[예시] 김민준','1990-01-01','한빛리테일','㈜한울컨벤션','010-0000-0000','buyer@example.com','예시 행은 등록되지 않습니다. 실제 데이터는 다음 행부터 입력해 주세요.']},
  'BAS-07':{file:'interpreter.xlsx',type:'통역원',fields:[['name','통역원명',true],['dob','생년월일',true],['language1','언어1(코드)',true],['language2','언어2(코드)'],['language3','언어3(코드)'],['language4','언어4(코드)'],['language5','언어5(코드)'],['phone','연락처'],['email','이메일'],['memo','메모']],example:['[예시] 박서연','1990-01-01','en','ja','','','','010-0000-0000','interpreter@example.com','언어1은 필수입니다. 예시 행은 등록되지 않습니다.']},
  'COM-07':{file:'operator-staff.xlsx',type:'담당자',fields:[['id','아이디',true],['name','이름',true],['phone','연락처',true],['org','소속'],['email','이메일'],['status','사용여부']],example:['[예시] operator_staff01','김민준','010-0000-0000','운영팀','staff@example.com','Y']}
 };
 const trim=v=>String(v??'').trim(),header=v=>trim(v).replace(/\s*\((필수|선택)\)\s*$/,'').replace(/\s*\*$/,'').replace('생년월일(yyyy-mm-dd)','생년월일').replace('사용여부(Y/N)','사용여부');
 const fixedNames={"BAS-03":"G-FAIR_등록양식_해외 바이어.xlsx","BAS-05":"G-FAIR_등록양식_국내 바이어.xlsx","BAS-07":"G-FAIR_등록양식_통역원.xlsx","COM-07":"G-FAIR_등록양식_용역사 담당자.xlsx"};
 const uploadGuide='엑셀양식을 다운로드하여 정보를 입력한 후, 작성한 파일을 첨부해 주세요.\n※  참가연도는 현재 진행중인 행사연도로 적용됩니다.';
 const uploadGuideHtml='<p class="member-upload-guide" style="text-align:center">엑셀양식을 다운로드하여 정보를 입력한 후, 작성한 파일을 첨부해 주세요.<br><span style="color:#757575">※&nbsp; 참가연도는 현재 진행중인 행사연도로 적용됩니다.</span></p>';
 const headers=id=>schemas[id].fields.map(([,label,required])=>label+' ('+(required?'필수':'선택')+')');
 const validPhone=v=>/^\+?[0-9][0-9 ()-]*$/.test(v)&&v.replace(/\D/g,'').length>=7&&v.replace(/\D/g,'').length<=15;
 const validEmail=v=>/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
 function dob(value){const text=trim(value);if(!/^\d{4}-\d{2}-\d{2}$/.test(text))return false;const date=new Date(text+'T00:00:00Z');return !Number.isNaN(date.valueOf())&&date.toISOString().slice(0,10)===text;}
 function validate(id,rows,options={}){
  const schema=schemas[id];if(!schema)throw Error('지원하지 않는 회원유형입니다.');
  const actual=(rows[0]||[]).map(header),expected=schema.fields.map(f=>f[1]);
  if(actual.length!==expected.length||expected.some((h,i)=>actual[i]!==h))throw Error('등록정보 시트의 열 이름·순서를 확인해 주세요. 최신 등록양식을 사용해 주세요.');
  const countries=new Set((options.countryCodes||[]).map(x=>x.code)),languages=new Set((options.languageCodes||[]).map(x=>x.code)),existing=new Set(options.existingIds||[]),seen=new Map(),entries=[];
  rows.slice(1).forEach((row,index)=>{
   const values=expected.map((_,i)=>trim(row[i]));if(values.every(v=>!v))return;
   if(values[0].startsWith('[예시] '))return;
   const data=Object.fromEntries(schema.fields.map(([key],i)=>[key,values[i]])),errors=[],line=rows.rowNumbers?.[index+1]||index+2;
   for(const [key,label,required]of schema.fields)if(required&&!data[key])errors.push(label+' 누락');
   if(rows.formulaRows?.includes(line))errors.push('수식 대신 실제 값을 입력해 주세요.');
   if('dob'in data&&data.dob&&!dob(data.dob))errors.push('생년월일 형식·날짜 오류 (yyyy-mm-dd)');
   if(id==='BAS-03'&&data.country&&!countries.has(data.country))errors.push('바이어국가 코드 오류 (국가코드표의 대문자 코드 사용)');
   if(id==='BAS-07'){
    const list=[1,2,3,4,5].map(n=>data['language'+n]).filter(Boolean);data.languages=list;
    if(list.some(code=>!languages.has(code)))errors.push('언어 코드 오류 (언어코드표의 소문자 코드 사용)');
    if(new Set(list).size!==list.length)errors.push('언어 코드 중복');
   }
   if(data.phone&&!(id==='BAS-03'?validInternationalPhone(data.phone):validPhone(data.phone)))errors.push(id==='BAS-03'?'연락처 형식 오류 (+국가번호 포함, 숫자 7~15자리)':'연락처 형식 오류 (숫자 7~15자리, +·공백·하이픈·괄호 허용)');
   if(data.email&&!validEmail(data.email))errors.push('이메일 형식 오류');
   if(id==='COM-07'){
    if(data.id&&existing.has(data.id))errors.push('이미 등록된 아이디');
    if(data.status&&!['Y','N'].includes(data.status))errors.push('사용여부는 Y 또는 N만 입력');
    data.status=data.status==='N'?'미사용':'사용';
   }
   const identity=id==='COM-07'?data.id:data.name.toLocaleLowerCase()+'|'+data.dob;
   if(identity){if(!seen.has(identity))seen.set(identity,[]);seen.get(identity).push(entries.length);}
   entries.push({line,data,errors,name:data.name,dob:data.dob||'',year:trim(options.year),valid:false,note:''});
  });
  for(const indices of seen.values())if(indices.length>1)for(const index of indices)entries[index].errors.push(id==='COM-07'?'파일 내 아이디 중복':'파일 내 이름·생년월일 중복');
  for(const entry of entries){entry.valid=entry.errors.length===0;entry.note=entry.errors.join(' / ');}
  if(!entries.length)throw Error('등록할 데이터가 없습니다. 예시 행 아래에 실제 정보를 입력해 주세요.');
  return {entries,good:entries.filter(x=>x.valid).map(x=>x.data),errors:entries.filter(x=>!x.valid).map(x=>({line:x.line,error:x.note}))};
 }
 function summary(entries,applied=entries.filter(x=>x.valid).length){const bad=entries.filter(x=>!x.valid),reasons=new Map();bad.forEach(x=>{for(const reason of x.errors||[x.note])reasons.set(reason,(reasons.get(reason)||0)+1);});return '파일 검증 결과\n총 '+entries.length+'건 · 반영 '+applied+'건 · 오류 '+bad.length+'건'+(bad.length?'\n'+[...reasons].map(([reason,count])=>reason+' '+count+'건').join('\n')+'\n오류 행은 반영하지 않았습니다. 오류 행만 수정하여 다시 첨부해 주세요.':'\n정상 건을 목록에 바로 반영했습니다.');}
 function ongoingYear(){const list=(typeof window!=='undefined'?window.GFAIR_SCREENS||[]:[]).flatMap(g=>g.screens).find(s=>s.id==='BAS-01'),ui=list?.ui,yearIndex=ui?.columns.indexOf('연도'),statusIndex=ui?.columns.indexOf('상태'),years=[...new Set((ui?.rows||[]).filter(row=>['진행','진행중','진행 중'].includes(String(row[statusIndex]).trim())).map(row=>String(row[yearIndex])))];if(years.length!==1||!/^20\d{2}$/.test(years[0]))throw Error('현재 진행중인 행사 정보를 확인해 주세요.');return years[0];}
 const validInternationalPhone=v=>/^\+[1-9][0-9 ()-]*$/.test(v)&&validPhone(v);
 const api={schemas,headers,validate,summary,validPhone,validInternationalPhone,validEmail,dob,fixedNames,uploadGuide,uploadGuideHtml,ongoingYear};
 if(typeof module!=='undefined'&&module.exports)module.exports=api;
 else{
  const base=new URL('../assets/templates/',document.currentScript.src);api.downloadTemplate=async(id,year)=>{const schema=schemas[id],response=await fetch(new URL(schema.file+'?v=provided-20261028',base));if(!response.ok)throw Error('등록양식을 불러오지 못했습니다.');const url=URL.createObjectURL(await response.blob()),a=document.createElement('a');a.href=url;a.download=fixedNames[id];a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);};window.GFAIRMemberUpload=api;
 }
})();
