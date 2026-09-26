import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const map=readFileSync('../../../docs/lumber-prep/LUMBER_PRODUCT_ACCEPTANCE_ROW_MAP_v1.md','utf8');
const plan=readFileSync('../../../docs/qa-prep/PRODUCT_ACCEPTANCE_EXECUTION_PLAN_v1.md','utf8');
const definitions=JSON.parse(readFileSync('content/lumber-target-definitions.fixture.json','utf8'));
const crossPack=JSON.parse(readFileSync('content/packs/lumber-target/lumber-cross-system.pack.json','utf8'));

test('Lumber PA row map contains exactly one table row for every PA00-PA26 ID',()=>{
  for(let i=0;i<=26;i++){
    const id=`PA${String(i).padStart(2,'0')}`;
    const matches=map.match(new RegExp(`\\| ${id} \\|`,'g'))??[];
    assert.equal(matches.length,1,id);
    assert.ok(plan.includes(`| ${id} |`),`source plan missing ${id}`);
  }
});

test('row map uses exact ready Lumber IDs and explicitly quarantines synthetic School action',()=>{
  for(const id of [
    'lumber.shift',
    'lumber.career-first-shift',
    'lumber.foreman-notice',
    'lumber.foreman.night',
    'lumber.forest',
    'lumber-cross.activity-forest-return',
    'ending.lumber.hard-work',
    'ending.lumber.forest'
  ])assert.ok(map.includes(`${id}`),id);

  assert.ok(map.includes('**do not use** synthetic action `school.lumber-management` as production'));
  assert.ok(map.includes('final School-owned management/accounting public fact ID is OPEN'));
});

test('PA map keeps exact A5 and Hard Work contracts',()=>{
  const hardWork=definitions.endings.find((e:any)=>e.id==='ending.lumber.hard-work');
  assert.ok(hardWork);
  assert.deepEqual(hardWork.conditions,[
    {kind:'careerCounter',career:'lumber',counter:'completed_shifts',op:'gte',value:50}
  ]);
  assert.deepEqual(hardWork.metaRewards,[
    {kind:'hardWork',rewardId:'hardWork:lumber',career:'lumber'}
  ]);
  assert.ok(map.includes('Reward ID is exactly:'));
  assert.ok(map.includes('`hardWork:lumber`'));

  const forestReturn=crossPack.events.find((e:any)=>e.id==='lumber-cross.activity-forest-return');
  assert.ok(forestReturn);
  assert.deepEqual(forestReturn.reactionTriggers,[
    {kind:'activityResult',activity:'lumber.forest',outcome:'success',result:'lumber.forest.success'}
  ]);
  assert.ok(map.includes('`activityResult(lumber.forest, success, lumber.forest.success)`'));
});

test('PA map labels unresolved product dependencies OPEN instead of inventing values',()=>{
  for(const phrase of [
    'production acquisition/use source',
    'final School management/accounting public fact ID',
    'final Arcana/Forest School public fact ID',
    'deeper Forest route/challenge/season authoring',
    'production normal-lodging ID'
  ])assert.ok(map.includes(phrase),phrase);

  assert.ok(map.includes('These OPEN items do not change Hard Work.'));
});
