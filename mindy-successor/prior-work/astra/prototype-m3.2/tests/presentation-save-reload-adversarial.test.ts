import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const fixture=JSON.parse(
  readFileSync('content/presentation-save-reload-adversarial.fixture.json','utf8')
);

const forbiddenKeys=new Set([
  'mediaid','src','assetpath','filename','gifsrc','videosrc',
  'frame','frameindex','currentframe','elapsed','elapsedms',
  'playbacktime','playbacktimestamp','loopcount','animationtime'
]);

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

test('matrix covers every required save/reload presentation boundary',()=>{
  assert.deepEqual(
    new Set(fixture.cases.map((row:any)=>row.caseId)),
    new Set([
      'ordinary-result',
      'pending-reactive-scene',
      'school-result',
      'night-lodging',
      'night-voluntary-choice',
      'activity-checkpoint',
      'ending-eligible',
      'ending-committed',
      'ended-new-run-boundary'
    ])
  );
});

test('JSON save/reload preserves semantic presentation identity and domain identity exactly',()=>{
  for(const row of fixture.cases){
    const reloaded=reload(row.before);
    assert.deepEqual(reloaded.gameplayIdentity,row.before.gameplayIdentity,row.caseId);
    assert.equal(reloaded.presentationId,row.before.presentationId,row.caseId);
    assert.match(reloaded.presentationId,/^[a-z0-9-]+(?:\/[a-z0-9-]+)+$/,row.caseId);
    assert.ok(row.expectedAfterReload.trim(),row.caseId);
  }
});

test('ended/new-run boundary changes semantic identity only because gameplay owner changes',()=>{
  const row=fixture.cases.find((x:any)=>x.caseId==='ended-new-run-boundary');
  assert.ok(row);
  const ended=reload(row.before);
  const fresh=reload(row.afterNewRun);

  assert.equal(ended.gameplayIdentity.runStatus,'ended');
  assert.equal(ended.presentationId,'ending/lumber/hard-work');
  assert.equal(fresh.gameplayIdentity.runStatus,'active');
  assert.equal(fresh.presentationId,'location/town/default');
  assert.notEqual(fresh.presentationId,ended.presentationId);
});

test('persisted presentation envelope contains no media source, GIF frame, or playback time state',()=>{
  for(const row of fixture.cases){
    const keys=collectKeys(row);
    for(const key of forbiddenKeys){
      assert.equal(keys.has(key),false,`${row.caseId}: ${key}`);
    }
  }
  assert.equal(fixture.policy.mediaSourceMayPersist,false);
  assert.equal(fixture.policy.animationFrameMayPersist,false);
  assert.equal(fixture.policy.playbackTimeMayPersist,false);
});

test('gameplay identity remains authoritative over presentation metadata',()=>{
  assert.equal(fixture.policy.gameplayIdentityRemainsAuthoritative,true);
  const pending=fixture.cases.find((x:any)=>x.caseId==='pending-reactive-scene');
  assert.equal(pending.before.gameplayIdentity.eventId,'lumber.career-first-shift');
  assert.equal(pending.before.gameplayIdentity.variantId,'default');
  assert.equal(
    pending.before.presentationId,
    'job/lumber/event/lumber-career-first-shift/default'
  );
});
