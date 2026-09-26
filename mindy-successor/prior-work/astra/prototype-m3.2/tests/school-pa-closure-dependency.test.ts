import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const audit=readFileSync(
  '../../../docs/school-prep/SCHOOL_PA_CLOSURE_DEPENDENCY_AUDIT_v1.md',
  'utf8'
);
const paPlan=readFileSync(
  '../../../docs/qa-prep/PRODUCT_ACCEPTANCE_EXECUTION_PLAN_v1.md',
  'utf8'
);
const lumberHooks=readFileSync(
  '../../../docs/lumber-prep/LUMBER_CROSS_SYSTEM_HOOKS_v1.md',
  'utf8'
);
const publicAuthoring=JSON.parse(
  readFileSync('content/school-public-fact-authoring.fixture.json','utf8')
);

test('closure audit covers PA07 and PA08 without claiming synthetic Product Acceptance green',()=>{
  assert.match(audit,/## PA07/);
  assert.match(audit,/## PA08/);
  assert.match(audit,/not a full product green/i);
  assert.match(audit,/cannot be marked product-green using direct `addWorldFact` injection/i);

  assert.match(paPlan,/\| 7 \| Take the required School lesson/);
  assert.match(paPlan,/\| 8 \| Let Resolver process the School result/);
});

test('Forewoman School-facing dependency keeps final management authoring OPEN',()=>{
  const management=publicAuthoring.authoringSlots.find(
    (slot:any)=>slot.slot==='management-accounting'
  );
  assert.ok(management);
  assert.equal(management.finalPublicFactId,null);
  assert.equal(management.lessonsCompletedThreshold,null);
  assert.equal(management.status,'OPEN');

  assert.match(audit,/## School-facing Forewoman route/);
  assert.match(lumberHooks,/final School-owned public fact ID for the generic management gate remains OPEN/i);
});

test('Forest School-facing dependency keeps final Arcana authoring OPEN',()=>{
  const arcana=publicAuthoring.authoringSlots.find(
    (slot:any)=>slot.slot==='arcana-forest'
  );
  assert.ok(arcana);
  assert.equal(arcana.finalPublicFactId,null);
  assert.equal(arcana.lessonsCompletedThreshold,null);
  assert.equal(arcana.status,'OPEN');

  assert.match(audit,/## School-facing Forest route/);
  assert.match(lumberHooks,/exact School milestone\/public fact ID remains OPEN/i);
});

test('audit separates presentation/content depth and external route dependencies from School mechanics',()=>{
  assert.match(audit,/PRESENTATION \/ CONTENT-DEPTH ONLY/);
  assert.match(audit,/RUNTIME-INDEPENDENT EXTERNAL BLOCKER/);
  assert.match(audit,/teacher identity/i);
  assert.match(audit,/Forest clues, Old Boundary access, Activity result, item capability/i);
});

test('audit does not invent forbidden authoring decisions',()=>{
  assert.doesNotMatch(audit,/management.*lessons_completed\s*>?=\s*\d+/i);
  assert.doesNotMatch(audit,/arcana.*lessons_completed\s*>?=\s*\d+/i);
  assert.doesNotMatch(audit,/teacher:\s+[A-Z][a-z]+/);
  assert.match(audit,/guessed management\/accounting or Arcana\/forest threshold/);
});
