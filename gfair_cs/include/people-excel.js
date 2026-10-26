(()=>{'use strict';
 const headers=['이름','아이디','소속','연락처','이메일','사용여부'];

 function validate(rows,existingIds){
  if(!rows.length||headers.some((h,i)=>String(rows[0][i]||'').trim()!==h)||rows[0].length!==headers.length)throw Error('등록 양식의 열 이름과 순서를 확인해 주세요.');
  const seen=new Set(existingIds),good=[],errors=[];
  rows.slice(1).forEach((row,i)=>{
   const cells=headers.map((_,j)=>String(row[j]??'')),v=cells.map(x=>x.trim());if(v.every(x=>!x))return;
   const [name,id,org,phone,email,status]=v;
   let error='';
   if(!name||!id)error='이름·아이디는 필수입니다.';
   else if(seen.has(id))error='이미 등록되었거나 파일 안에서 중복된 아이디입니다.';
   else if(phone&&!/^0(?:2|[0-9]{2})-[0-9]{3,4}-[0-9]{4}$/.test(phone))error='연락처 형식을 확인해 주세요.';
   else if(email&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))error='이메일 형식을 확인해 주세요.';
   else if(!['사용','미사용'].includes(status))error='사용여부는 사용 또는 미사용이어야 합니다.';
   seen.add(id);
   if(error)errors.push({line:i+2,error});else good.push({name,id,org:org||'미등록',phone,email,status});
  });
  if(!good.length&&!errors.length)throw Error('등록할 데이터가 없습니다.');
  return {good,errors};
 }
 const api={headers,validate};if(typeof module!=='undefined'&&module.exports)module.exports=api;else window.GFAIRPeopleExcel=api;
})();
