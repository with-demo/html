const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const source=fs.readFileSync(require.resolve('../js/app.js'),'utf8');
function context(){const ctx={E:String,document:{addEventListener(){}},window:{},current:'JNL-05',exportJournalMode:'create',role:'admin',draft:{},sessionStorage:{setItem(k,v){ctx.saved=JSON.parse(v)}},formatSaveStamp:()=>'',toast:()=>{},Date};vm.createContext(ctx);return ctx;}
test('제품마다 독립된 카테고리와 제품명을 같은 행에 복원',()=>{
 const ctx=context();vm.runInContext(source.slice(source.indexOf('function journalCategorySelect('),source.indexOf('function journalQuickAmount(')),ctx);
 const html=ctx.journalProducts({representativeCategory:'Tech',consultProduct:'첫 제품',additionalCategories:['Kitchen','Houseware'],additionalProducts:['','셋째 제품']},'Tech / Kitchen / Houseware');
 assert.equal((html.match(/journal-consult-product/g)||[]).length,3);assert.equal((html.match(/name="additionalCategory"/g)||[]).length,2);assert.equal((html.match(/name="additionalProduct"/g)||[]).length,2);assert(html.includes('value="Kitchen" selected'));assert(html.includes('value="Houseware" selected'));assert(html.includes('셋째 제품'));
 assert(!ctx.journalProducts({},'Tech').includes('<em> *'));assert(ctx.journalProducts({},'Tech / Kitchen').includes('<em> *'));assert(ctx.journalProducts({additionalProducts:['기존 제품']},'Tech').includes('기존 제품'));
});
test('빈 제품 행을 건너뛰지 않고 카테고리와 같은 인덱스로 저장',()=>{
 const ctx=context(),values={consultProduct:['첫 제품'],representativeCategory:['Tech'],additionalProduct:['','셋째 제품'],additionalCategory:['Kitchen','Houseware'],sellerCard:['']};
 const form={querySelectorAll:()=>[{name:'booth',value:'C-01'},{name:'contactPerson',value:'예시 담당자'}]};ctx.document.getElementById=id=>id==='draft-form'?form:null;ctx.FormData=class{has(k){return k in values}get(k){return values[k]?.[0]}getAll(k){return values[k]||[]}};
 vm.runInContext(source.slice(source.indexOf('function save(){'),source.indexOf('\nfunction ',source.indexOf('function save(){')+1)),ctx);
 assert(ctx.save());assert.deepEqual(ctx.saved.additionalProducts,['','셋째 제품']);assert.deepEqual(ctx.saved.additionalCategories,['Kitchen','Houseware']);assert.equal(ctx.saved.booth,'C-01');assert.equal(ctx.saved.contactPerson,'예시 담당자');
});
