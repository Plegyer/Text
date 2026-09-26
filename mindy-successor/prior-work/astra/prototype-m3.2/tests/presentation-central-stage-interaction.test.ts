import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const fixture=JSON.parse(
  readFileSync('content/presentation-central-stage-interaction.fixture.json','utf8')
);

test('contract declares exactly one logical central presentation stage',()=>{
  assert.equal(fixture.policy.logicalCentralStageCount,1);
  assert.equal(fixture.policy.presentationAppliesMechanics,false);
});

test('required interaction states are represented',()=>{
  assert.deepEqual(
    new Set(fixture.cases.map((row:any)=>row.caseId)),
    new Set([
      'ordinary-action-result',
      'blocking-pending-scene',
      'school-lesson-result',
      'night-lodging',
      'night-choice-scene',
      'active-activity',
      'ending-eligible',
      'ending-committed',
      'ending-completed'
    ])
  );
});

test('blocking is owned by gameplay flow state, never presentation timing',()=>{
  assert.equal(fixture.policy.interactionBlockingOwner,'gameplay-flow-state');
  assert.equal(fixture.policy.animationTimingMayBlockControls,false);

  const expectedOwners:Record<string,string|null>={
    'ordinary-action-result':null,
    'blocking-pending-scene':'pendingScene',
    'school-lesson-result':null,
    'night-lodging':'nightFlow',
    'night-choice-scene':'pendingScene',
    'active-activity':'activity',
    'ending-eligible':null,
    'ending-committed':'endingCommitted',
    'ending-completed':'runEnded'
  };

  for(const row of fixture.cases){
    assert.equal(row.blockingOwner,expectedOwners[row.caseId],row.caseId);
  }
});

test('presentation changes cannot apply mechanics',()=>{
  const gameplay={
    money:600,
    energy:3,
    pendingEventId:'lumber.career-first-shift',
    activityId:'lumber.forest',
    endingId:'ending.lumber.hard-work'
  };

  for(const row of fixture.cases){
    const before=structuredClone(gameplay);
    const presentationOnly={
      presentationId:row.presentationId,
      stageRole:row.stageRole
    };
    assert.match(presentationOnly.presentationId,/^[a-z0-9-]+(?:\/[a-z0-9-]+)+$/);
    assert.deepEqual(gameplay,before,row.caseId);
  }
});

test('ending eligibility remains non-blocking until explicit commitment',()=>{
  const eligible=fixture.cases.find((row:any)=>row.caseId==='ending-eligible');
  const committed=fixture.cases.find((row:any)=>row.caseId==='ending-committed');
  const completed=fixture.cases.find((row:any)=>row.caseId==='ending-completed');
  assert.ok(eligible&&committed&&completed);
  assert.equal(eligible.blockingOwner,null);
  assert.equal(committed.blockingOwner,'endingCommitted');
  assert.equal(completed.blockingOwner,'runEnded');
});

test('all visible cases share the same logical stage instead of creating mode-specific stages',()=>{
  for(const row of fixture.cases){
    assert.ok(row.presentationId,row.caseId);
    assert.ok(row.stageRole,row.caseId);
    assert.equal('stageCount' in row,false,row.caseId);
  }
});
