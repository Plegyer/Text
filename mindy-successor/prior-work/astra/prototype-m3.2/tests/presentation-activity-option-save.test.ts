import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const fixture=JSON.parse(
  readFileSync('content/presentation-activity-option-save.fixture.json','utf8')
);

function reload<T>(value:T):T{
  return JSON.parse(JSON.stringify(value)) as T;
}

function collectKeys(value:unknown,keys=new Set<string>()):Set<string>{
  if(Array.isArray(value)){
    for(const item of value)collectKeys(item,keys);
    return keys;
  }
  if(value&&typeof value==='object'){
    for(const [key,item] of Object.entries(value as Record<string,unknown>)){
      keys.add(key.toLowerCase());
      collectKeys(item,keys);
    }
  }
  return keys;
}

test('matrix covers all required PR22 option-state presentation checkpoints',()=>{
  assert.deepEqual(
    new Set(fixture.cases.map((row:any)=>row.caseId)),
    new Set([
      'legacy-option-model-v0-active',
      'option-model-v1-before-route',
      'after-logging-road-route',
      'after-old-boundary-route',
      'after-option-use',
      'after-reload',
      'success-result',
      'escape-result'
    ])
  );
});

test('legacy optionModelVersion 0 remains on generic Forest route presentation',()=>{
  const row=fixture.cases.find((x:any)=>x.caseId==='legacy-option-model-v0-active');
  assert.equal(row.saveState.optionModelVersion,0);
  assert.equal(row.saveState.routeId,null);
  assert.equal(row.currentPresentationId,'activity/forest/route/default');
  assert.equal(row.futureSemanticFamily,null);
});

test('new optionModelVersion 1 route state survives reload deterministically',()=>{
  for(const id of [
    'option-model-v1-before-route',
    'after-logging-road-route',
    'after-old-boundary-route',
    'after-option-use',
    'after-reload'
  ]){
    const row=fixture.cases.find((x:any)=>x.caseId===id);
    assert.equal(row.saveState.optionModelVersion,1,id);
    const restored=reload(row.saveState);
    assert.deepEqual(restored,row.saveState,id);
    assert.equal(row.currentPresentationId,'activity/forest/route/default',id);
  }
});

test('logging-road and old-boundary route states map to stable semantic-family hints without replacing shipped ID',()=>{
  const logging=fixture.cases.find((x:any)=>x.caseId==='after-logging-road-route');
  const boundary=fixture.cases.find((x:any)=>x.caseId==='after-old-boundary-route');

  assert.equal(logging.saveState.routeId,'logging-road');
  assert.equal(logging.futureSemanticFamily,'activity/forest/route/logging-road/*');
  assert.equal(boundary.saveState.routeId,'old-boundary');
  assert.equal(boundary.futureSemanticFamily,'activity/forest/route/old-boundary/*');
  assert.equal(logging.currentPresentationId,boundary.currentPresentationId);
});

test('success and escape results use distinct shipped semantic result IDs',()=>{
  const success=fixture.cases.find((x:any)=>x.caseId==='success-result');
  const escape=fixture.cases.find((x:any)=>x.caseId==='escape-result');
  assert.equal(success.currentPresentationId,'activity/forest/return/success');
  assert.equal(escape.currentPresentationId,'activity/forest/return/escape');
  assert.notEqual(success.currentPresentationId,escape.currentPresentationId);
});

test('no GIF frame, timing, playback, or media-source state enters save matrix',()=>{
  assert.equal(fixture.policy.animationStateAllowedInSave,false);
  const keys=collectKeys(fixture.cases.map((row:any)=>row.saveState));
  for(const forbidden of [
    'frame','frameindex','currentframe','elapsed','elapsedms',
    'playbacktime','playbacktimestamp','loopcount','mediasrc',
    'assetpath','filename'
  ]){
    assert.equal(keys.has(forbidden),false,forbidden);
  }
});

test('gameplay option state stays authoritative over presentation family hints',()=>{
  assert.equal(fixture.policy.gameplayOptionStateAuthoritative,true);
  assert.equal(fixture.policy.semanticFamilyHintIsNotPersistedPresentationId,true);
  for(const row of fixture.cases.filter((x:any)=>x.saveState)){
    assert.ok(row.saveState.activityId,row.caseId);
    assert.ok(row.currentPresentationId,row.caseId);
  }
});
