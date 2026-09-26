import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const json=(path:string)=>JSON.parse(readFileSync(path,'utf8'));

const currentRcArtifacts=[
  'content/presentation-one-save-ownership-v2.fixture.json',
  'content/presentation-activity-option-save.fixture.json',
  'content/presentation-semantic-coverage-checksum.fixture.json',
  'content/presentation-merged-rc-override-smoke.fixture.json'
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

test('final post-PR24 RC artifacts store no frame or media timing state',()=>{
  for(const artifact of currentRcArtifacts){
    for(const key of collectKeys(artifact.value)){
      assert.equal(forbiddenKeys.has(key),false,`${artifact.path}: ${key}`);
    }
  }
});

test('presentation core exposes no animation-completion mechanics hook',()=>{
  const source=readFileSync('src/core/presentation.ts','utf8').toLowerCase();
  for(const token of [
    'animationend','animationcomplete','onanimation',
    'frameindex','currentframe','playbacktimestamp','loopcount'
  ])assert.equal(source.includes(token),false,token);
});

test('presentation core cannot dispatch gameplay commands or own action availability',()=>{
  const source=readFileSync('src/core/presentation.ts','utf8');
  for(const token of [
    'dispatch(','availableActivityActions',
    "type:'activityAction'","type:'schoolLesson'",
    "type:'chooseNightChoice'","type:'commitEnding'"
  ])assert.equal(source.includes(token),false,token);
});

test('one-Save ownership explicitly keeps mechanics outside presentation',()=>{
  const fixture=json('content/presentation-one-save-ownership-v2.fixture.json');
  assert.equal(fixture.policy.presentationOwnsMechanics,false);
  assert.equal(fixture.policy.animationTimingOwnsBlocking,false);
});

test('Activity command availability remains gameplay option state, not animation state',()=>{
  const fixture=json('content/presentation-activity-option-save.fixture.json');
  assert.equal(fixture.policy.gameplayOptionStateAuthoritative,true);
  assert.equal(fixture.policy.animationStateAllowedInSave,false);
  for(const row of fixture.cases){
    assert.equal('animationsEnabled' in (row.saveState??{}),false,row.caseId);
  }
});

test('merged RC override smoke changes media only, never gameplay or semantic identity',()=>{
  const fixture=json('content/presentation-merged-rc-override-smoke.fixture.json');
  assert.equal(fixture.policy.overrideChangesGameplay,false);
  assert.equal(fixture.policy.semanticIdentityStableAcrossOverride,true);
  assert.equal(fixture.policy.reloadIdentityGameplayDriven,true);
});
