import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const fixture=JSON.parse(
  readFileSync('content/school-lumber-negative-boundary.fixture.json','utf8')
);
const lumberManifest=JSON.parse(
  readFileSync('content/lumber-product-acceptance.fixture-manifest.json','utf8')
);
const lumberDefinitions=JSON.parse(
  readFileSync('content/lumber-target-definitions.fixture.json','utf8')
);
const readiness=readFileSync(
  '../../../docs/school-prep/SCHOOL_LUMBER_PUBLIC_BOUNDARY_READINESS_v1.md',
  'utf8'
);

test('negative boundary fixture invents no management/accounting or certificate threshold',()=>{
  assert.deepEqual(fixture.managementAccounting,{
    finalPublicFactId:null,
    threshold:null,
    certificateThreshold:null,
    status:'OPEN'
  });
  assert.match(
    readiness,
    /final management\/accounting School public fact ID remains \*\*OPEN\*\*/i
  );
  assert.match(
    readiness,
    /No threshold is locked by this readiness contract/i
  );
});

test('negative boundary fixture invents no Arcana/forest threshold or final School fact ID',()=>{
  assert.deepEqual(fixture.arcanaForest,{
    finalPublicFactId:null,
    threshold:null,
    certificateThreshold:null,
    status:'OPEN'
  });
  assert.match(
    readiness,
    /final Arcana\/forest School public fact ID remains \*\*OPEN\*\*/i
  );
  assert.match(
    readiness,
    /exact Arcana\/Reason\/Magic gate values/i
  );
});

test('typed School counters remain private and do not leak directly into Lumber',()=>{
  assert.deepEqual(
    fixture.schoolOwnership.privateCounters,
    ['lessons_completed','night_study_sessions']
  );
  assert.deepEqual(fixture.schoolOwnership.lumberDirectReads,[]);
  assert.deepEqual(fixture.schoolOwnership.lumberDirectWrites,[]);

  assert.deepEqual(fixture.durableCrossSystemBoundary.allowed,[
    'worldFacts',
    'future-domain-public-equivalent'
  ]);
  assert.deepEqual(fixture.durableCrossSystemBoundary.forbidden,[
    'direct-school-counter-read',
    'direct-school-counter-write',
    'direct-school-stage-mutation'
  ]);
});

test('public cross-system facts remain the only current durable School-to-Lumber boundary',()=>{
  assert.match(
    readiness,
    /run\.progression\.worldFacts/
  );
  assert.match(
    readiness,
    /worldFactAdded/
  );
  assert.match(
    readiness,
    /Lumber should consume only the published boundary/i
  );
});

test('Hard Work remains exactly fifty completed Lumber shifts with no School prerequisite',()=>{
  const expected={
    kind:'careerCounter',
    career:'lumber',
    counter:'completed_shifts',
    op:'gte',
    value:50
  };

  assert.deepEqual(fixture.hardWork.condition,expected);
  assert.deepEqual(fixture.hardWork.schoolPrerequisites,[]);
  assert.deepEqual(
    lumberManifest.mappings.hardWorkEnding.eligibility,
    expected
  );
  assert.equal(
    lumberManifest.lockedConstraints
      .hardWorkEligibilityOnlyFiftyCompletedLumberShifts,
    true
  );

  const ending=lumberDefinitions.endings.find(
    (item:any)=>item.id==='ending.lumber.hard-work'
  );
  assert.ok(ending);
  assert.deepEqual(ending.conditions,[expected]);

  const serialized=JSON.stringify(ending).toLowerCase();
  assert.equal(serialized.includes('school'),false);
  assert.equal(serialized.includes('certificate'),false);
  assert.equal(serialized.includes('worldfact'),false);
});

test('negative fixture itself contains no non-null School/Lumber threshold',()=>{
  const thresholdValues=[
    fixture.managementAccounting.threshold,
    fixture.managementAccounting.certificateThreshold,
    fixture.arcanaForest.threshold,
    fixture.arcanaForest.certificateThreshold
  ];
  assert.deepEqual(thresholdValues,[null,null,null,null]);
});
