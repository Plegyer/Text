import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const json=(path:string)=>JSON.parse(readFileSync(path,'utf8'));

const rcArtifacts=[
  'content/presentation-one-save-ownership-v2.fixture.json',
  'content/presentation-activity-option-save.fixture.json',
  'content/presentation-save-reload-adversarial.fixture.json',
  'content/presentation-semantic-coverage-checksum.fixture.json',
  'content/presentation-rc-degradation.fixture.json',
  'content/presentation-replacement-pr22-compat.fixture.json',
  'content/presentation-replacement-bundle.fixture.json',
  'content/presentation-rc-evidence-pack.fixture.json'
].map(path=>({path,value:json(path)}));

const forbiddenKeys=new Set([
  'frame','frameindex','currentframe',
  'elapsedmediatime','elapsedmedia','mediaelapsed','elapsedms',
  'playbacktime','playbacktimestamp','playbackposition',
  'loopcount','animationtime','animationcompleted',
  'animationcomplete','animationfinished',
  'commandavailability','availablecommands','availableactions'
]);

function collectKeys(value:unknown,keys:string[]=[]):string[]{
  if(Array.isArray(value)){
    for(const item of value)collectKeys(item,keys);
    return keys;
  }
  if(value&&typeof value==='object'){
    for(const [key,item] of Object.entries(value as Record<string,unknown>)){
      keys.push(key.toLowerCase().replace(/[^a-z0-9]/g,''));
      collectKeys(item,keys);
    }
  }
  return keys;
}

test('no current RC presentation/save/override artifact stores frame or media timing state',()=>{
  for(const artifact of rcArtifacts){
    const keys=collectKeys(artifact.value);
    for(const key of keys){
      assert.equal(
        forbiddenKeys.has(key),
        false,
        `${artifact.path}: forbidden persisted/contract key ${key}`
      );
    }
  }
});

test('presentation core has no animation-completion mechanics hook',()=>{
  const source=readFileSync('src/core/presentation.ts','utf8').toLowerCase();
  for(const token of [
    'animationend','animationcomplete','onanimation',
    'frameindex','currentframe','playbacktimestamp','loopcount'
  ]){
    assert.equal(source.includes(token),false,token);
  }
});

test('presentation core cannot dispatch gameplay commands or own action availability',()=>{
  const source=readFileSync('src/core/presentation.ts','utf8');
  for(const token of [
    'dispatch(',
    'availableActivityActions',
    "type:'activityAction'",
    "type:'schoolLesson'",
    "type:'chooseNightChoice'",
    "type:'commitEnding'"
  ]){
    assert.equal(source.includes(token),false,token);
  }
});

test('central-stage contract explicitly rejects animation-owned blocking and mechanics',()=>{
  const fixture=json('content/presentation-central-stage-interaction.fixture.json');
  assert.equal(fixture.policy.presentationAppliesMechanics,false);
  assert.equal(fixture.policy.animationTimingMayBlockControls,false);
  assert.equal(fixture.policy.interactionBlockingOwner,'gameplay-flow-state');
});

test('animation-off degradation keeps gameplay unchanged',()=>{
  const fixture=json('content/presentation-rc-degradation.fixture.json');
  const row=fixture.cases.find((item:any)=>item.caseId==='animations-disabled');
  assert.ok(row);
  assert.equal(row.animationsEnabled,false);
  assert.equal(row.expectedGameplayOutcome,'unchanged');
  assert.equal(row.expectedPresentation,'static');
});

test('Activity command availability remains gameplay option state, not animation state',()=>{
  const fixture=json('content/presentation-activity-option-save.fixture.json');
  assert.equal(fixture.policy.gameplayOptionStateAuthoritative,true);
  assert.equal(fixture.policy.animationStateAllowedInSave,false);
  for(const row of fixture.cases){
    assert.equal('animationsEnabled' in (row.saveState??{}),false,row.caseId);
  }
});
