import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

type Readiness='SHIPPED_CATALOG'|'ISOLATED_FIXTURE'|'BLOCKED';

const rows:{id:string;readiness:Readiness;checkpoint:string|null;activationLift:boolean}[]=[
  {id:'PA00',readiness:'SHIPPED_CATALOG',checkpoint:'fresh',activationLift:false},
  {id:'PA01',readiness:'SHIPPED_CATALOG',checkpoint:null,activationLift:false},
  {id:'PA02',readiness:'ISOLATED_FIXTURE',checkpoint:null,activationLift:true},
  {id:'PA03',readiness:'ISOLATED_FIXTURE',checkpoint:'after-shift',activationLift:true},
  {id:'PA04',readiness:'ISOLATED_FIXTURE',checkpoint:'repeatable-variant',activationLift:true},
  {id:'PA05',readiness:'ISOLATED_FIXTURE',checkpoint:'pending-milestone',activationLift:true},
  {id:'PA06',readiness:'ISOLATED_FIXTURE',checkpoint:'foreman-open',activationLift:true},
  {id:'PA07',readiness:'BLOCKED',checkpoint:'school-result',activationLift:false},
  {id:'PA08',readiness:'BLOCKED',checkpoint:'pending-school-continuation',activationLift:false},
  {id:'PA09',readiness:'BLOCKED',checkpoint:'item-capability',activationLift:false},
  {id:'PA10',readiness:'SHIPPED_CATALOG',checkpoint:null,activationLift:false},
  {id:'PA11',readiness:'ISOLATED_FIXTURE',checkpoint:'paid-lodging',activationLift:false},
  {id:'PA12',readiness:'ISOLATED_FIXTURE',checkpoint:'pending-night-relationship',activationLift:false},
  {id:'PA13',readiness:'ISOLATED_FIXTURE',checkpoint:'next-day',activationLift:false},
  {id:'PA14',readiness:'ISOLATED_FIXTURE',checkpoint:'inside-activity-entry',activationLift:false},
  {id:'PA15',readiness:'ISOLATED_FIXTURE',checkpoint:'inside-activity-resume',activationLift:true},
  {id:'PA16',readiness:'BLOCKED',checkpoint:'activity-internal',activationLift:false},
  {id:'PA17',readiness:'BLOCKED',checkpoint:'before-item-use',activationLift:false},
  {id:'PA18',readiness:'ISOLATED_FIXTURE',checkpoint:'pending-post-activity',activationLift:true},
  {id:'PA19',readiness:'ISOLATED_FIXTURE',checkpoint:'activity-escape',activationLift:true},
  {id:'PA20',readiness:'ISOLATED_FIXTURE',checkpoint:'post-activity-continuation',activationLift:true},
  {id:'PA21',readiness:'ISOLATED_FIXTURE',checkpoint:'eligible-not-committed',activationLift:true},
  {id:'PA22',readiness:'ISOLATED_FIXTURE',checkpoint:'eligible-after-normal-action',activationLift:true},
  {id:'PA23',readiness:'ISOLATED_FIXTURE',checkpoint:'committed-before-completion',activationLift:true},
  {id:'PA24',readiness:'ISOLATED_FIXTURE',checkpoint:'completed',activationLift:true},
  {id:'PA25',readiness:'ISOLATED_FIXTURE',checkpoint:'reward-before-new-run',activationLift:true},
  {id:'PA26',readiness:'ISOLATED_FIXTURE',checkpoint:'new-run',activationLift:true}
];

function json(path:string){return JSON.parse(readFileSync(path,'utf8'));}

test('readiness map contains exactly PA00 through PA26 and preserves the harness checkpoints',()=>{
  assert.deepEqual(
    rows.map(row=>row.id),
    Array.from({length:27},(_,i)=>'PA'+String(i).padStart(2,'0'))
  );
  assert.equal(new Set(rows.map(row=>row.id)).size,27);

  const harness=readFileSync('tests/product-acceptance-harness.test.ts','utf8');
  for(const row of rows){
    assert.match(harness,new RegExp("id:'"+row.id+"'"));
    if(row.checkpoint)assert.match(harness,new RegExp("checkpoint:'"+row.checkpoint+"'"));
  }
});

test('only fresh/create/Night-start rows are classified executable from the current shipped catalog',()=>{
  assert.deepEqual(
    rows.filter(row=>row.readiness==='SHIPPED_CATALOG').map(row=>row.id),
    ['PA00','PA01','PA10']
  );
  assert.deepEqual(
    rows.filter(row=>row.readiness==='BLOCKED').map(row=>row.id),
    ['PA07','PA08','PA09','PA16','PA17']
  );
});

test('current production build and validation scans are top-level only, so nested target packs are not activated',()=>{
  const build=readFileSync('scripts/build.mjs','utf8');
  const validate=readFileSync('scripts/validate.ts','utf8');

  assert.match(build,/readdir\('content\/packs'\)\.filter\(f=>f\.endsWith\('\.json'\)\)/);
  assert.match(validate,/readdirSync\('content\/packs'\)\.filter\(f=>f\.endsWith\('\.json'\)\)/);
  assert.doesNotMatch(build,/recursive\s*:\s*true/);
  assert.doesNotMatch(validate,/recursive\s*:\s*true/);
});

test('target Lumber definitions exist only in isolated fixture definitions at this baseline',()=>{
  const shipped=json('content/definitions.json');
  const target=json('content/lumber-target-definitions.fixture.json');

  assert.equal(shipped.actions.some((a:any)=>a.id==='lumber.shift'),false);
  assert.equal((shipped.careers??[]).some((c:any)=>c.id==='lumber'),false);
  assert.equal((shipped.relationships??[]).some((r:any)=>r.id==='lumber.foreman'),false);
  assert.equal((shipped.activities??[]).some((a:any)=>a.id==='lumber.forest'),false);
  assert.equal(shipped.endings.some((e:any)=>e.id==='ending.lumber.hard-work'),false);

  assert.ok(target.actions.some((a:any)=>a.id==='lumber.shift'));
  assert.ok((target.careers??[]).some((c:any)=>c.id==='lumber'));
  assert.ok((target.relationships??[]).some((r:any)=>r.id==='lumber.foreman'));
  assert.ok((target.activities??[]).some((a:any)=>a.id==='lumber.forest'));
  assert.ok(target.endings.some((e:any)=>e.id==='ending.lumber.hard-work'));
});

test('Hard Work readiness keeps the exact locked 50-shift rule and reward proof id',()=>{
  const manifest=json('content/lumber-product-acceptance.fixture-manifest.json');
  const target=json('content/lumber-target-definitions.fixture.json');
  const ending=target.endings.find((e:any)=>e.id==='ending.lumber.hard-work');

  assert.deepEqual(manifest.mappings.hardWorkEnding.eligibility,{
    kind:'careerCounter',
    career:'lumber',
    counter:'completed_shifts',
    op:'gte',
    value:50
  });
  assert.equal(manifest.mappings.hardWorkEnding.metaRewardId,'hardWork:lumber');
  assert.deepEqual(ending.conditions,[manifest.mappings.hardWorkEnding.eligibility]);
  assert.deepEqual(ending.metaRewards,[{kind:'hardWork',rewardId:'hardWork:lumber',career:'lumber'}]);
});

test('Night lodging and Foreman choice remain isolated test definitions, not production activation inputs',()=>{
  const shipped=json('content/definitions.json');
  const target=json('content/lumber-target-definitions.fixture.json');
  const nightTest=readFileSync('tests/lumber-night-acceptance.test.ts','utf8');

  assert.equal((shipped.lodgings??[]).some((x:any)=>x.id==='lumber.normal-room'),false);
  assert.equal((target.lodgings??[]).some((x:any)=>x.id==='lumber.normal-room'),false);
  assert.equal((shipped.nightChoices??[]).some((x:any)=>x.id==='lumber.foreman.night'),false);
  assert.equal((target.nightChoices??[]).some((x:any)=>x.id==='lumber.foreman.night'),false);
  assert.match(nightTest,/id:'lumber\.normal-room'/);
  assert.match(nightTest,/id:'lumber\.foreman\.night'/);

  for(const id of ['PA11','PA12','PA13']){
    assert.equal(rows.find(row=>row.id===id)?.activationLift,false,id);
  }
});

test('blocked rows are not promoted by fixture existence',()=>{
  const school=readFileSync('src/core/school.ts','utf8');
  const engine=readFileSync('src/core/engine.ts','utf8');
  const item=json('content/lumber-item-capabilities.fixture.json');

  assert.match(school,/executeSchoolLesson/);
  assert.doesNotMatch(school,/lumber\.school\.management-ready/);
  assert.equal(item.status,'TEST_ADAPTER_UNTIL_SHARED_ITEM_CAPABILITY_SCHEMA');

  const commandStart=engine.indexOf('export type Command=');
  const commandEnd=engine.indexOf('export function dispatch',commandStart);
  const commandBlock=engine.slice(commandStart,commandEnd);
  assert.match(commandBlock,/activityAction';id:'advance'\|'escape'/);
  assert.doesNotMatch(commandBlock,/useItem|itemCapability/);

  for(const id of ['PA07','PA08','PA09','PA16','PA17']){
    assert.equal(rows.find(row=>row.id===id)?.readiness,'BLOCKED',id);
  }
});
