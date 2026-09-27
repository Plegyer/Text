import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const fixture=JSON.parse(
  readFileSync('content/school-content-depth-negative.fixture.json','utf8')
);
const ui=JSON.parse(
  readFileSync('content/school-production-ui.fixture.json','utf8')
);
const decision=JSON.parse(
  readFileSync('content/school-authoring-decision-ready.fixture.json','utf8')
);
const finalHandoff=JSON.parse(
  readFileSync(
    'content/school-final-decision-evidence-handoff.fixture.json',
    'utf8'
  )
);

test('School mechanics may be RC-ready while teacher and authored progression depth remains open',()=>{
  assert.equal(fixture.mechanicsStatus,'RC_READY');

  for(const key of [
    'teacherIdentities',
    'teacherLessonContent',
    'milestoneAuthoring',
    'certificateAuthoring',
    'projectAuthoring'
  ]){
    assert.equal(
      fixture.contentDepth[key].status,
      'OPEN',
      key
    );
  }
});

test('current eight-course production UI contract does not fabricate canonical teachers',()=>{
  assert.equal(ui.courses.length,8);

  for(const course of ui.courses){
    assert.equal('teacherId' in course,false,course.courseId);
    assert.equal('teacherName' in course,false,course.courseId);
  }

  assert.equal(
    decision.constraints.teacherIdentities,
    null
  );
});

test('final decision handoff keeps authoring decisions separate from shipped-green mechanics',()=>{
  assert.ok(
    finalHandoff.CONTENT_DEPTH.includes(
      'mindy-successor/docs/school-prep/SCHOOL_RC_PRESENTATION_CONTENT_GAP_v1.md'
    )
  );
  assert.ok(
    finalHandoff.HUMAN_DECISION_REQUIRED.includes(
      'mindy-successor/docs/school-prep/SCHOOL_PUBLIC_FACT_AUTHORING_PACKET_v1.md'
    )
  );
  assert.ok(
    finalHandoff.HUMAN_DECISION_REQUIRED.includes(
      'mindy-successor/docs/school-prep/SCHOOL_AUTHORING_DECISION_READY_PACKET_v1.md'
    )
  );
});

test('guarded RC authorities do not falsely label missing teacher certificate project or milestone authoring as shipped',()=>{
  for(const path of fixture.guardedAuthorities){
    const text=readFileSync(path,'utf8').toLowerCase();

    for(const claim of fixture.forbiddenClaims){
      assert.equal(
        text.includes(claim.toLowerCase()),
        false,
        path+' falsely claims: '+claim
      );
    }
  }
});

test('certificate project and milestone decisions remain explicitly unresolved',()=>{
  const certificate=decision.decisions.find(
    (entry:any)=>entry.id==='certificate-project-authoring'
  );
  assert.ok(certificate);
  assert.equal(certificate.runtimeChangeNeeded,false);

  assert.equal(
    decision.constraints.managementThreshold,
    null
  );
  assert.equal(
    decision.constraints.arcanaForestThreshold,
    null
  );
});
