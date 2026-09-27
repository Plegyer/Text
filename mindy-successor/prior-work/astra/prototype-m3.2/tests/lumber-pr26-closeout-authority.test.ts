import test from 'node:test';
import assert from 'node:assert/strict';
import {existsSync,readFileSync} from 'node:fs';

const audit=readFileSync('../../../docs/lumber-prep/LUMBER_PR26_CLOSEOUT_AUTHORITY_AUDIT_v1.md','utf8');
const matrix=readFileSync('../../../docs/lumber-prep/LUMBER_FINAL_RC_ACCEPTANCE_MATRIX_v1.md','utf8');
const definitions=JSON.parse(readFileSync('content/lumber-target-definitions.fixture.json','utf8'));

function row(pa:string){
  return matrix.split('\n').find(line=>line.startsWith(`| ${pa} |`))??'';
}

test('PR26 audit names the current Lumber acceptance matrix as PA authority',()=>{
  assert.ok(audit.includes('4c86946167bf424665a499875c597afeb340ab8f'));
  assert.ok(audit.includes('LUMBER_FINAL_RC_ACCEPTANCE_MATRIX_v1.md'));
  assert.ok(audit.includes('current authoritative Lumber-facing PA classification'));
  assert.ok(audit.includes('do not replace the acceptance matrix'));
});

test('Hard Work remains fully closed with exactly one condition and exact reward',()=>{
  const hardWork=definitions.endings.find((e:any)=>e.id==='ending.lumber.hard-work');
  assert.ok(hardWork);
  assert.deepEqual(hardWork.conditions,[
    {kind:'careerCounter',career:'lumber',counter:'completed_shifts',op:'gte',value:50}
  ]);
  assert.deepEqual(hardWork.metaRewards,[
    {kind:'hardWork',rewardId:'hardWork:lumber',career:'lumber'}
  ]);
  assert.ok(audit.includes('Hard Work remains `SHIPPED_GREEN` / closed'));
});

test('token decisions remain neutral and PA16 remains explicit content-depth gap',()=>{
  assert.ok(audit.includes('Old Boundary Token decisions remain neutral and OPEN'));
  assert.ok(row('PA09').includes('HUMAN_DECISION_REQUIRED'));
  assert.ok(row('PA16').includes('CONTENT_DEPTH_OPEN'));
  assert.ok(audit.includes('PA16 content-depth gap remains explicit'));
});

test('audit forbids promoting QA fixtures or temporary identities to Product truth',()=>{
  for(const marker of [
    'seeded `old_boundary_token` inventory',
    'arbitrary QA thresholds',
    'fake Hunter clue/capability IDs',
    'synthetic School providers'
  ])assert.ok(audit.includes(marker),marker);
  assert.ok(audit.includes('QA may prove runtime boundaries. It may not choose an unresolved Product decision.'));
});

test('when PR26 authority/status docs are present locally they agree with the audit',()=>{
  const indexPath='../../../docs/DOCUMENT_AUTHORITY_AND_INDEX_v0.md';
  const statusPath='../../../docs/qa-prep/RC_CLOSEOUT_STATUS_v1.md';
  const decisionsPath='../../../docs/qa-prep/RC_HUMAN_DECISIONS_REQUIRED_v1.md';
  if(existsSync(indexPath)){
    const index=readFileSync(indexPath,'utf8');
    assert.ok(index.includes('lumber-prep/LUMBER_FINAL_RC_ACCEPTANCE_MATRIX_v1.md'));
  }
  if(existsSync(statusPath)){
    const status=readFileSync(statusPath,'utf8');
    assert.ok(status.includes('Technical release-candidate status: **GREEN**'));
    assert.ok(status.includes('Full authored Product Acceptance status: **PARTIAL / NOT CLOSED**'));
  }
  if(existsSync(decisionsPath)){
    const decisions=readFileSync(decisionsPath,'utf8');
    assert.ok(decisions.includes('This document is neutral. It does not select a preferred option.'));
    assert.ok(decisions.includes('ONLY condition: `completed_shifts >= 50`'));
  }
});
