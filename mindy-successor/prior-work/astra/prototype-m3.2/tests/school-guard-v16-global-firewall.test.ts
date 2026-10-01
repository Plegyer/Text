import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const inventory=JSON.parse(readFileSync('content/school-guard-v16-live-inventory.fixture.json','utf8'));
const fixtures=[
  'school-guard-v16-literacy.fixture.json',
  'school-guard-v16-rhetoric.fixture.json',
  'school-guard-v16-etiquette.fixture.json',
  'school-guard-v16-physical.fixture.json',
  'school-guard-v16-arcana.fixture.json'
].map(name=>JSON.parse(readFileSync('content/'+name,'utf8')));
const schoolSource=readFileSync('src/core/school.ts','utf8');

test('C5-179 Guard gameplay identities and thresholds do not enter global School runtime',()=>{
  assert.equal(schoolSource.includes('guard.school.'),false);
  for(const fact of [
    'school-literacy-ready','school-rhetoric-ready','school-etiquette-ready','school-physical-ready','school-arcana-ready'
  ]) assert.equal(schoolSource.includes(fact),false,fact);

  assert.equal(inventory.localHookPolicy.threshold,null);
  assert.equal(inventory.localHookPolicy.nightParityThreshold,null);
  assert.equal(inventory.localHookPolicy.scope,'guard-only');
  assert.equal(inventory.localHookPolicy.nightParityScope,'guard-only');
  assert.equal(inventory.localHookPolicy.globalCertificateRule,false);
  assert.equal(inventory.localHookPolicy.globalProjectRule,false);
  assert.equal(inventory.localHookPolicy.nightStudyChangesGlobalCertificateRule,false);
  assert.equal(inventory.localHookPolicy.nightStudyChangesGlobalProjectRule,false);
});

test('C5-179 all producers keep threshold null and forbid global/direct career writes',()=>{
  for(const fixture of fixtures){
    assert.equal(fixture.localThreshold.value,null,fixture.id);
    assert.equal(fixture.localThreshold.scope,'guard-only',fixture.id);
    assert.equal(fixture.constraints.publishesGlobalCertificate,false,fixture.id);
    assert.equal(fixture.constraints.publishesGlobalProject,false,fixture.id);
    assert.equal(fixture.constraints.advancesCareerDirectly,false,fixture.id);
  }
});

test('C5-175/C5-176 C1D-152 explicitly publishes no live Guard School consumer',()=>{
  assert.equal(inventory.localHookPolicy.gameplayEventIds,'BLOCKED_NO_LIVE_CONSUMER_C1D_152');
  for(const hook of inventory.hooks){
    assert.equal(hook.reactionEvent,'BLOCKED_NO_LIVE_CONSUMER_C1D_152',hook.role);
    assert.equal(hook.threshold,null,hook.role);
    assert.equal(hook.immediateResolverStatus,'BLOCKED_NO_LIVE_CONSUMER',hook.role);
    assert.equal(hook.nightParityStatus,'BLOCKED_NO_LIVE_CONSUMER',hook.role);
  }
});
