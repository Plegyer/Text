import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const rcCoverage=JSON.parse(
  readFileSync('content/school-rc-coverage.fixture.json','utf8')
);
const decisionReady=JSON.parse(
  readFileSync('content/school-authoring-decision-ready.fixture.json','utf8')
);
const publicAuthoring=JSON.parse(
  readFileSync('content/school-public-fact-authoring.fixture.json','utf8')
);
const publicPreflight=JSON.parse(
  readFileSync('content/school-public-fact-preflight.fixture.json','utf8')
);
const publicExactlyOnce=JSON.parse(
  readFileSync(
    'content/school-public-boundary-exactly-once.fixture.json',
    'utf8'
  )
);
const typedExactlyOnce=JSON.parse(
  readFileSync('content/school-typed-progress-exactly-once.fixture.json','utf8')
);
const nightParity=JSON.parse(
  readFileSync('content/school-night-production-parity.fixture.json','utf8')
);
const lumberManifest=JSON.parse(
  readFileSync('content/lumber-product-acceptance.fixture-manifest.json','utf8')
);
const noFalseGreen=readFileSync(
  '../../../docs/school-prep/SCHOOL_PA_NO_FALSE_GREEN_AUDIT_v1.md',
  'utf8'
);

test('RC School artifacts keep final management and Arcana Forest authoring unresolved',()=>{
  assert.deepEqual(rcCoverage.lumberPublicBoundary.filter(
    (row:any)=>row.classification==='OPEN_AUTHORING'
  ),[
    {
      id:'management-accounting-final-fact',
      classification:'OPEN_AUTHORING',
      finalPublicFactId:null,
      threshold:null
    },
    {
      id:'arcana-forest-final-fact',
      classification:'OPEN_AUTHORING',
      finalPublicFactId:null,
      threshold:null
    }
  ]);

  assert.deepEqual(decisionReady.constraints,{
    noPreferredAnswer:true,
    finalManagementPublicFactId:null,
    finalArcanaForestPublicFactId:null,
    managementThreshold:null,
    arcanaForestThreshold:null,
    teacherIdentities:null
  });

  for(const slot of publicAuthoring.authoringSlots){
    assert.equal(slot.finalPublicFactId,null,slot.slot);
    assert.equal(slot.lessonsCompletedThreshold,null,slot.slot);
    assert.equal(slot.statThresholds,null,slot.slot);
    assert.equal(slot.status,'OPEN',slot.slot);
  }
});

test('fixture-only public facts remain synthetic evidence and are never treated as authored School results',()=>{
  assert.equal(publicPreflight.validExample.fixtureOnly,true);
  assert.match(
    publicPreflight.validExample.publishPublicFactId,
    /^school\.fixture\.public\./
  );

  assert.equal(
    publicExactlyOnce.fixturePublication.fixtureOnly,
    true
  );
  assert.match(
    publicExactlyOnce.fixturePublication.publicFactId,
    /^school\.fixture\.public\./
  );

  assert.match(
    noFalseGreen,
    /Direct injection tests transport, not authored reachability/
  );
  assert.match(
    noFalseGreen,
    /It cannot prove PA08 unless the fact was produced by the actual authored School progression path/
  );
});

test('direct typed counter fixtures remain exactly-once QA evidence rather than ordinary player progression proof',()=>{
  assert.equal(typedExactlyOnce.entries.length,8);

  for(const entry of typedExactlyOnce.entries){
    assert.deepEqual(entry.paidLessonDelta,{
      lessons_completed:1,
      night_study_sessions:0
    },entry.courseId);
    assert.deepEqual(entry.nightStudyDelta,{
      lessons_completed:0,
      night_study_sessions:1
    },entry.courseId);
  }

  assert.match(
    noFalseGreen,
    /Directly assigning or incrementing a fixture counter does not prove/
  );
});

test('paid lessons can never increment night_study_sessions and Night study can never increment lessons_completed',()=>{
  for(const entry of typedExactlyOnce.entries){
    assert.equal(
      entry.paidLessonDelta.night_study_sessions,
      0,
      entry.courseId
    );
    assert.equal(
      entry.nightStudyDelta.lessons_completed,
      0,
      entry.courseId
    );
  }

  for(const choice of nightParity.choices){
    assert.deepEqual(choice.typedCounterDelta,{
      counter:'night_study_sessions',
      delta:1
    },choice.choiceId);
  }
});

test('no RC School artifact changes Lumber Hard Work eligibility',()=>{
  const expected={
    kind:'careerCounter',
    career:'lumber',
    counter:'completed_shifts',
    op:'gte',
    value:50
  };

  assert.deepEqual(
    lumberManifest.mappings.hardWorkEnding.eligibility,
    expected
  );
  assert.equal(
    lumberManifest.lockedConstraints
      .hardWorkEligibilityOnlyFiftyCompletedLumberShifts,
    true
  );

  const serialized=JSON.stringify(
    lumberManifest.mappings.hardWorkEnding
  ).toLowerCase();
  assert.equal(serialized.includes('school'),false);
  assert.equal(serialized.includes('certificate'),false);
  assert.equal(serialized.includes('worldfact'),false);
});

test('decision-ready packet exposes answer types without selecting a provider or threshold',()=>{
  for(const decision of decisionReady.decisions){
    assert.ok(
      Array.isArray(decision.acceptableAnswerTypes)&&
      decision.acceptableAnswerTypes.length>0,
      decision.id
    );
    assert.equal(
      decision.runtimeChangeNeeded,
      false,
      decision.id
    );
  }

  assert.equal(
    decisionReady.constraints.noPreferredAnswer,
    true
  );
});
