import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const map=JSON.parse(readFileSync('content/school-tavern-v14-live-inventory.fixture.json','utf8'));
const fixtures=[
  'school-tavern-v14-records.fixture.json',
  'school-tavern-v14-rhetoric.fixture.json',
  'school-tavern-v14-etiquette.fixture.json',
  'school-tavern-v14-arcana.fixture.json'
].map(name=>JSON.parse(readFileSync('content/'+name,'utf8')));
const pack=JSON.parse(readFileSync('content/packs/tavern-school.json','utf8'));
const schoolSource=readFileSync('src/core/school.ts','utf8');

test('C5-155 Tavern-local threshold identities never enter global School runtime',()=>{
  assert.equal(schoolSource.includes('tavern.school.'),false);
  for(const fixture of fixtures){
    assert.equal(schoolSource.includes(fixture.careerFact),false,fixture.careerFact);
  }
});

test('C5-155 local threshold metadata remains explicitly Tavern-only and non-global',()=>{
  assert.equal(map.localHookPolicy.counter,'lessons_completed');
  assert.equal(map.localHookPolicy.threshold,3);
  assert.equal(map.localHookPolicy.scope,'tavern-only');
  assert.equal(map.localHookPolicy.globalCertificateRule,false);
  assert.equal(map.localHookPolicy.globalProjectRule,false);
  assert.equal(map.localHookPolicy.nightParityCounter,'night_study_sessions');
  assert.equal(map.localHookPolicy.nightParityThreshold,3);
  assert.equal(map.localHookPolicy.nightParityScope,'tavern-only');
  assert.equal(map.localHookPolicy.nightStudyChangesGlobalCertificateRule,false);
  assert.equal(map.localHookPolicy.nightStudyChangesGlobalProjectRule,false);
  for(const fixture of fixtures){
    assert.equal(fixture.constraints.publishesGlobalCertificate,false,fixture.id);
    assert.equal(fixture.constraints.publishesGlobalProject,false,fixture.id);
    assert.equal(fixture.constraints.advancesCareerDirectly,false,fixture.id);
  }
});

test('C5-155 production Tavern School effects write only Tavern-local career facts',()=>{
  assert.equal(pack.events.length,4);
  for(const event of pack.events){
    assert.equal(event.sourceDomain,'tavern',event.id);
    assert.equal(event.maxShows,1,event.id);
    for(const choice of event.choices){
      for(const effect of choice.effects){
        assert.equal(effect.kind,'addCareerFact',event.id);
        assert.equal(effect.career,'tavern',event.id);
        assert.ok(String(effect.fact).startsWith('school-'),event.id);
      }
    }
  }
});
