import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const binding=JSON.parse(readFileSync('content/palace-authored-v22-binding-plan.fixture.json','utf8'));
const source=JSON.parse(readFileSync('content/palace-authored-copy-v22.fixture.json','utf8'));
const defs=JSON.parse(readFileSync('content/definitions.json','utf8'));

test('C3-252 current Palace authority is only derived unlock/localization plus exact ten legacy inputs',()=>{
  const ordinary=['lumber','satyr-maid','undead-farm','tavern','hunter','guard','merchant','artist-geisha','assassin','prostitute'];
  assert.deepEqual(binding.liveAuthority.slice(0,2),[
    {identity:'metaUnlock:palace',status:'LIVE_BOUND',kind:'derivedMetaUnlock'},
    {identity:'unlock.palace.label',status:'LIVE_BOUND',kind:'localization'},
  ]);
  assert.deepEqual(binding.liveAuthority.slice(2).map((x:any)=>x.identity),ordinary.map(c=>`metaHardWork:${c}`));
  assert.ok(binding.liveAuthority.every((x:any)=>x.status==='LIVE_BOUND'));
});

test('C3-252 every authored Palace consumer is pending unless explicitly forbidden or unowned',()=>{
  assert.equal(binding.entries.length,source.entries.length);
  assert.deepEqual(new Set(binding.entries.map((x:any)=>x.contentKey)),new Set(source.entries.map((x:any)=>x.contentKey)));
  for(const e of binding.entries){
    assert.ok(['PENDING_RUNTIME_ID','NO_AUTHORITY_NOT_BINDABLE'].includes(e.status),e.contentKey);
    if(e.status==='PENDING_RUNTIME_ID')assert.equal(e.runtimeConsumerId,'PENDING_RUNTIME_ID',e.contentKey);
    else assert.equal(e.runtimeConsumerId,null,e.contentKey);
  }
});

test('C3-252 exact School and Activity inputs are read-only current authority',()=>{
  assert.deepEqual(binding.exactSchoolInputs,[
    'school.course.literacy_and_numbers',
    'school.course.etiquette_and_presentation',
    'school.course.arcana',
    'school.course.rhetoric_and_social',
  ]);
  assert.deepEqual(binding.exactActivityInputs,[
    'lumber.forest',
    'lumber.forest.truth-known',
    'hunter.expedition',
    'careerFact:hunter:expedition-returned',
  ]);
  assert.ok(defs.activities.some((x:any)=>x.id==='lumber.forest'));
  assert.ok(defs.activities.some((x:any)=>x.id==='hunter.expedition'));
  const forest=defs.activities.find((x:any)=>x.id==='lumber.forest');
  assert.ok(forest.results.some((x:any)=>x.effects.some((e:any)=>e.kind==='addWorldFact'&&e.fact==='lumber.forest.truth-known')));
  const hunter=defs.activities.find((x:any)=>x.id==='hunter.expedition');
  assert.ok(hunter.results.some((x:any)=>x.effects.some((e:any)=>e.kind==='addCareerFact'&&e.career==='hunter'&&e.fact==='expedition-returned')));
});

test('C3-252 forbidden assumptions never bind',()=>{
  for(const x of binding.forbiddenAssumptions)assert.equal(x.status,'NO_AUTHORITY_NOT_BINDABLE',x.identity);
  assert.equal(binding.policy.modifiesProduction,false);
  assert.equal(binding.policy.createsGameplayIds,false);
  assert.equal(binding.policy.freezeCandidate,false);
});

test('C3-252 production still contains no Palace gameplay consumer',()=>{
  for(const group of [defs.actions,defs.careers??[],defs.endings,defs.relationships??[],defs.nightChoices??[],defs.itemDefinitions??[]]){
    assert.equal(group.some((x:any)=>JSON.stringify(x).toLowerCase().includes('palace')),false);
  }
});
