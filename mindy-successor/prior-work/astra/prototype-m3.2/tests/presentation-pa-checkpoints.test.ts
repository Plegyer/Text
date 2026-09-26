import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const json=(path:string)=>JSON.parse(readFileSync(path,'utf8'));
const fixture=json('content/presentation-pa-checkpoints.fixture.json');
const pa=json('content/presentation-pa-scenario.fixture.json');
const smoke=json('content/presentation-production-smoke.fixture.json');

const expectedIds=new Set([
  'fresh','after-shift','pending-milestone','foreman-opening','school-result',
  'paid-lodging-night','activity-entry','activity-internal','activity-result',
  'ending-eligible','ending-committed','ending-completed','new-run'
]);

test('checkpoint matrix covers every visible PA save/reload checkpoint family exactly once',()=>{
  const ids=fixture.checkpoints.map((row:any)=>row.checkpointId);
  assert.equal(ids.length,13);
  assert.equal(new Set(ids).size,ids.length);
  assert.deepEqual(new Set(ids),expectedIds);
});

test('every checkpoint has deterministic semantic identity and explicit reload expectation',()=>{
  for(const row of fixture.checkpoints){
    assert.match(row.presentationId,/^[a-z0-9-]+(?:\/[a-z0-9-]+)+$/);
    assert.ok(row.saveReloadExpectation.length>0,row.checkpointId);
    assert.ok(row.visibleState.length>0,row.checkpointId);
    assert.ok(row.identitySource?.kind,row.checkpointId);
  }
  assert.equal(fixture.policy.semanticIdentityDeterministic,true);
  assert.equal(fixture.policy.mediaSourceDefinesIdentity,false);
});

test('checkpoint semantic IDs agree with prior PA/smoke artifacts for overlapping flows',()=>{
  const prior=new Set<string>();
  for(const scenario of pa.scenarios)for(const step of scenario.steps)prior.add(step.presentationId);
  for(const step of smoke.steps)prior.add(step.presentationId);
  prior.add('location/town/default');

  for(const row of fixture.checkpoints){
    assert.ok(prior.has(row.presentationId),`unexpected checkpoint presentationId: ${row.presentationId}`);
  }
});

test('pending event checkpoints preserve event/variant-driven semantic identity',()=>{
  const events=fixture.checkpoints.filter((row:any)=>
    ['pending-milestone','foreman-opening','paid-lodging-night'].includes(row.checkpointId)
  );
  assert.equal(events.length,3);
  for(const row of events){
    assert.equal(row.identitySource.kind,'event');
    assert.equal(row.identitySource.variantId,'default');
    assert.match(row.saveReloadExpectation,/same-.*presentation/);
  }
});

test('activity entry/internal share route identity while result has distinct semantic return identity',()=>{
  const entry=fixture.checkpoints.find((row:any)=>row.checkpointId==='activity-entry');
  const internal=fixture.checkpoints.find((row:any)=>row.checkpointId==='activity-internal');
  const result=fixture.checkpoints.find((row:any)=>row.checkpointId==='activity-result');
  assert.ok(entry&&internal&&result);
  assert.equal(entry.presentationId,'activity/forest/route/default');
  assert.equal(internal.presentationId,entry.presentationId);
  assert.equal(result.presentationId,'activity/forest/return/success');
  assert.notEqual(result.presentationId,entry.presentationId);
});

test('ending eligibility does not impersonate ending commitment presentation',()=>{
  const eligible=fixture.checkpoints.find((row:any)=>row.checkpointId==='ending-eligible');
  const committed=fixture.checkpoints.find((row:any)=>row.checkpointId==='ending-committed');
  const completed=fixture.checkpoints.find((row:any)=>row.checkpointId==='ending-completed');
  assert.ok(eligible&&committed&&completed);
  assert.equal(eligible.presentationId,'location/town/default');
  assert.equal(committed.presentationId,'ending/lumber/hard-work');
  assert.equal(completed.presentationId,committed.presentationId);
});

test('checkpoint persistence contract never stores animation frame or playback time',()=>{
  assert.equal(fixture.policy.animationFramePersisted,false);
  assert.equal(fixture.policy.playbackTimePersisted,false);
  const serialized=JSON.stringify(fixture).toLowerCase();
  for(const forbidden of [
    '"frameindex"','"currentframe"','"playbacktimestamp"','"elapsedms"',
    '"loopcount"','"animationtime"'
  ])assert.equal(serialized.includes(forbidden),false,forbidden);
});
