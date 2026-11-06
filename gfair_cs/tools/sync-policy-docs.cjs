// Run from any directory: node gfair_cs/tools/sync-policy-docs.cjs
const fs=require('fs'),path=require('path'),vm=require('vm');
const root=path.resolve(__dirname,'..'),ctx={window:{}};
vm.runInNewContext(fs.readFileSync(path.join(root,'data/planning-policy.js'),'utf8'),ctx);
const d=ctx.window.GFAIR_PLANNING_POLICY;
const head=title=>'# '+title+'\n\n기준일: '+d.meta.date+' (한국 시간) · 정리본 '+d.meta.version+'\n\n';
const write=(name,text)=>fs.writeFileSync(path.join(root,'docs',name),text.trim()+'\n');
write('공통_기획정책.md',head('공통 기획정책')+d.commonPolicies.map(p=>'## '+p.id+' '+p.title+'\n\n상태: '+p.status+' · 적용: '+p.scope+'\n\n'+p.rules.map(r=>'- '+r).join('\n')+'\n\n변경 영향: '+p.impact+'\n근거: '+p.basis.join(', ')+(p.questions.length?' · 확인필요: '+p.questions.join(', '):'')+'\n').join('\n'));
write('화면_정책.md',head('화면별 정책')+d.screenPolicies.map(p=>'## '+p.id+' '+p.title+'\n\n화면: '+p.screens.join(', ')+' · 공통 정책: '+p.common.join(', ')+'\n\n'+p.rule+'\n\n상세 명세 관리: '+p.detail+'\n근거: '+p.basis.join(', ')+'\n').join('\n'));
const pendingFile=path.join(root,'docs/확인필요사항.md'),existing=fs.readFileSync(pendingFile,'utf8'),extra=existing.includes('## 승인됐지만')?'\n'+existing.slice(existing.indexOf('## 승인됐지만')):'';
write('확인필요사항.md',head('확인필요사항')+'현재 화면 동작을 임의로 바꾸지 않고 별도로 결정·연동해야 할 항목이다.\n\n'+d.issues.map(p=>'## '+p.id+' '+p.title+'\n\n우선순위: '+p.priority+' · 근거: '+p.basis.join(', ')+'\n\n- 현재 확인: '+p.finding+'\n- 다음 결정/처리: '+p.decision+'\n').join('\n')+extra);
console.log('Updated common, screen and open-issue MD from planning-policy.js. Google Sheets is updated separately by policy ID.');
