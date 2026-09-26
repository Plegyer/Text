import test from 'node:test';
import assert from 'node:assert/strict';
import {existsSync,readFileSync} from 'node:fs';

const audit=readFileSync('../../../docs/lumber-prep/LUMBER_PR24_ONE_SAVE_STATE_AUDIT_v1.md','utf8');
const definitions=JSON.parse(readFileSync('content/lumber-target-definitions.fixture.json','utf8'));
const crossPack=JSON.parse(readFileSync('content/packs/lumber-target/lumber-cross-system.pack.json','utf8'));

test('PR24 audit labels the 49-shift setup only as a threshold accelerator',()=>{
  assert.ok(audit.includes('PR #24 status: MERGED.'));\n  assert.ok(audit.includes('9aa0eaf964735e82b9b964bbdcaf5362c292868a'));
  assert.ok(audit.includes('completed_shifts = 49'));
  assert.ok(audit.includes('long-threshold accelerator'));
  assert.ok(audit.includes('It is not:'));
  assert.ok(audit.includes('ordinary-play evidence for 49 prior shifts'));
});

test('Lumber reactive milestone and professional Foreman continuation remain zero-extra-Energy contracts',()=>{
  assert.ok(audit.includes('first shift leaves Energy at 2'));
  assert.ok(audit.includes('career milestone and Foreman professional route leaves Energy at 2'));
  assert.ok(audit.includes('No romance condition is required'));
});

test('Forest return stays on exact activityResult boundary',()=>{
  const event=crossPack.events.find((e:any)=>e.id==='lumber-cross.activity-forest-return');
  assert.ok(event);
  assert.deepEqual(event.reactionTriggers,[
    {kind:'activityResult',activity:'lumber.forest',outcome:'success',result:'lumber.forest.success'}
  ]);
  assert.ok(audit.includes('activityResult(lumber.forest, success, lumber.forest.success)'));
  assert.ok(audit.includes('generic worldFact-only trigger is not an acceptable replacement'));
});

test('Hard Work remains only completed_shifts >= 50 with exact hardWork:lumber',()=>{
  const hardWork=definitions.endings.find((e:any)=>e.id==='ending.lumber.hard-work');
  assert.ok(hardWork);
  assert.deepEqual(hardWork.conditions,[
    {kind:'careerCounter',career:'lumber',counter:'completed_shifts',op:'gte',value:50}
  ]);
  assert.deepEqual(hardWork.metaRewards,[
    {kind:'hardWork',rewardId:'hardWork:lumber',career:'lumber'}
  ]);
  assert.ok(audit.includes('Hard Work does not require:'));
  for(const forbidden of ['School','Forest','Foreman relationship','Night','season','milestone','item/capability']){
    assert.ok(audit.includes(forbidden),forbidden);
  }
});

test('one-Save audit does not claim OPEN School/token authoring is closed',()=>{
  assert.ok(audit.includes('does **not** falsely close'));
  assert.ok(audit.includes('does **not** prove:'));
  assert.ok(audit.includes('Old Boundary Token acquisition'));
  assert.ok(audit.includes('hunter-trail authoring'));
});

test('when merged PR24 one-Save test is present, audit stays aligned to its accelerator and shipped path',()=>{
  const path='tests/release-candidate-shipped-e2e.test.ts';
  if(!existsSync(path))return;
  const source=readFileSync(path,'utf8');
  assert.ok(source.includes("completed_shifts=49")||source.includes("completed_shifts=49;")||source.includes("completed_shifts=49"));
  assert.ok(source.includes("id:'lumber.shift'"));
  assert.ok(source.includes("id:'forest.route.logging-road'"));
  assert.ok(source.includes("id:'ending.lumber.hard-work'"));
  assert.ok(source.includes("['hardWork:lumber']"));
});
