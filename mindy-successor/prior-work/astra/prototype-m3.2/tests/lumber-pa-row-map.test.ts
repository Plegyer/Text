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

test('row map is aligned to shipped PR20 Work, School command, Night lodging/choice and Activity UI identities',()=>{
  for(const token of [
    '9b427d75dc22021cd3373aa7dd3521782e54152d',
    "`lumber.shift`",
    "`schoolLesson`",
    "`lodging.normal`",
    "`lumber.foreman.night`",
    "`lumber.forest`"
  ])assert.ok(map.includes(token),token);
  assert.ok(map.includes('Synthetic `school.lumber-management` is not shipped'));
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
  assert.ok(map.includes('`hardWork:lumber`'));

  const forestReturn=crossPack.events.find((e:any)=>e.id==='lumber-cross.activity-forest-return');
  assert.ok(forestReturn);
  assert.deepEqual(forestReturn.reactionTriggers,[
    {kind:'activityResult',activity:'lumber.forest',outcome:'success',result:'lumber.forest.success'}
  ]);
  assert.ok(map.includes('`activityResult(lumber.forest, success, lumber.forest.success)`'));
});

test('PA map leaves only genuine School/item/deeper-Forest dependencies OPEN',()=>{
  const open=map.slice(map.indexOf('## Remaining genuine OPEN PA dependencies'));
  for(const phrase of [
    'production acquisition/use path',
    'final School management/accounting public fact ID',
    'final Arcana/Forest School public fact ID',
    'deeper Forest route/challenge/season authoring'
  ])assert.ok(open.includes(phrase),phrase);

  assert.equal(open.includes('production normal-lodging ID'),false);
  assert.ok(open.includes('Normal lodging `lodging.normal`, `lumber.foreman.night`'));
  assert.ok(open.includes('None of the remaining OPEN dependencies changes Hard Work.'));
});
