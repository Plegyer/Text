import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const map=JSON.parse(readFileSync('content/school-undead-v13-track-map.fixture.json','utf8'));
const arcana=JSON.parse(readFileSync('content/school-undead-v13-arcana.fixture.json','utf8'));
const management=JSON.parse(readFileSync('content/school-undead-v13-management.fixture.json','utf8'));
const schoolSource=readFileSync('src/core/school.ts','utf8');

test('C5-142 Undead thresholds do not enter global School runtime',()=>{
  assert.equal(schoolSource.includes('undead-farm'),false);
  assert.equal(schoolSource.includes('school-research-ready'),false);
  assert.equal(schoolSource.includes('school-management-ready'),false);
});

test('C5-142 local threshold metadata cannot masquerade as global certificate/project policy',()=>{
  assert.equal(map.localHookPolicy.threshold,3);
  assert.equal(map.localHookPolicy.scope,'undead-farm-only');
  assert.equal(map.localHookPolicy.globalCertificateRule,false);
  assert.equal(map.localHookPolicy.globalProjectRule,false);
  for(const fixture of [arcana,management]){
    assert.equal(fixture.localThreshold.counter,'lessons_completed');
    assert.equal(fixture.localThreshold.value,3);
    assert.equal(fixture.localThreshold.scope,'undead-farm-only');
    assert.equal(fixture.constraints.publishesGlobalCertificate,false);
    assert.equal(fixture.constraints.publishesGlobalProject,false);
  }
});
