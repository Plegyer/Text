import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {getSchoolCourse} from '../src/core/school.ts';

const audit=readFileSync(
  '../../../docs/school-prep/SCHOOL_PR24_ONE_SAVE_STATE_AUDIT_v1.md',
  'utf8'
);
const authoring=JSON.parse(
  readFileSync('content/school-public-fact-authoring.fixture.json','utf8')
);

test('PR24 audit locks the exact paid Arcana transaction used by the Lead one-Save path',()=>{
  const arcana=getSchoolCourse('school.course.arcana');

  assert.equal(arcana.tuition,500);
  assert.equal(arcana.energyCost,1);
  assert.deepEqual(arcana.statEffects,[
    {stat:'magic',amount:4},
    {stat:'reason',amount:4},
    {stat:'creativity',amount:2}
  ]);
  assert.equal(arcana.trackId,'school.track.arcana');
  assert.equal(
    arcana.presentationId,
    'school/arcana/lesson/default'
  );

  assert.match(audit,/tuition: \*\*500\*\* exactly once/);
  assert.match(audit,/current-day Energy: \*\*-1\*\* exactly once/);
  assert.match(audit,/Magic: \*\*\+4\*\*/);
  assert.match(audit,/Reason: \*\*\+4\*\*/);
  assert.match(audit,/Creativity: \*\*\+2\*\*/);
});

test('PR24 audit records typed lesson progress and the shipped first School blocking scene before NightFlow',()=>{
  assert.match(
    audit,
    /lessons_completed === 1/
  );
  assert.match(
    audit,
    /blocking event:\n\n`base\.school`/
  );
  assert.match(
    audit,
    /only then begins NightFlow/
  );
  assert.match(
    audit,
    /school\.enrolled === true/
  );
});

test('PR24 audit keeps semantic Arcana presentation identity stable',()=>{
  assert.match(
    audit,
    /school\/arcana\/lesson\/default/
  );
  assert.match(
    audit,
    /must remain stable across the following save\/reload\/scene-resolution sequence/
  );
});

test('PR24 audit forbids fabricating management accounting authoring',()=>{
  assert.match(
    audit,
    /lumber\.school\.management-ready/
  );
  assert.match(
    audit,
    /is \*\*absent\*\*/
  );

  const management=authoring.authoringSlots.find(
    (slot:any)=>slot.slot==='management-accounting'
  );
  assert.ok(management);
  assert.equal(management.finalPublicFactId,null);
  assert.equal(management.lessonsCompletedThreshold,null);
  assert.equal(management.status,'OPEN');
});

test('PR24 audit preserves the same-Save Lumber Forest ending and Meta continuation as unrelated state',()=>{
  for(const phrase of [
    'Lumber first shift has already completed',
    'Foreman professional relationship route is active',
    'Forest Activity',
    'Hard Work threshold',
    'exactly-once Meta reward',
    'New Run'
  ]){
    assert.equal(audit.includes(phrase),true,phrase);
  }
});
