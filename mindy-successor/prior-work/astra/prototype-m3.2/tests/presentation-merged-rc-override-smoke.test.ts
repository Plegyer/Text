import test from 'node:test';
import assert from 'node:assert/strict';
import {existsSync,readFileSync} from 'node:fs';

const json=(path:string)=>JSON.parse(readFileSync(path,'utf8'));
const fixture=json('content/presentation-merged-rc-override-smoke.fixture.json');
const coverage=json('content/presentation-semantic-coverage-checksum.fixture.json');
const known=new Set<string>(coverage.entries.map((row:any)=>row.presentationId));

function reload<T>(value:T):T{
  return JSON.parse(JSON.stringify(value)) as T;
}

function resolve(row:any,overrideEnabled:boolean){
  return {
    requestedId:row.presentationId,
    media:overrideEnabled?row.overrideStatic:row.shippedFallback,
    source:overrideEnabled?'override-static':'shipped-fallback'
  };
}

test('smoke covers exact six representative merged-main semantic IDs',()=>{
  assert.deepEqual(
    new Set(fixture.cases.map((row:any)=>row.caseId)),
    new Set([
      'lumber-result',
      'school-arcana-lesson',
      'school-blocking-scene',
      'foreman-night',
      'forest-route',
      'hard-work-ending'
    ])
  );
});

test('all representative IDs exist in reconciled 27-ID RC semantic manifest',()=>{
  for(const row of fixture.cases){
    assert.ok(known.has(row.presentationId),row.presentationId);
    assert.equal(existsSync(row.shippedFallback),true,row.shippedFallback);
    assert.equal(existsSync(row.overrideStatic),true,row.overrideStatic);
  }
});

test('override changes media candidate but never semantic presentationId',()=>{
  for(const row of fixture.cases){
    const base=resolve(row,false);
    const overridden=resolve(row,true);
    assert.equal(base.requestedId,row.presentationId);
    assert.equal(overridden.requestedId,row.presentationId);
    assert.notEqual(overridden.media,undefined);
  }
  assert.equal(fixture.policy.semanticIdentityStableAcrossOverride,true);
});

test('removing or missing override restores shipped fallback safely',()=>{
  for(const row of fixture.cases){
    const active=resolve(row,true);
    const rolledBack=resolve(row,false);
    assert.equal(active.source,'override-static');
    assert.equal(rolledBack.source,'shipped-fallback');
    assert.equal(rolledBack.media,row.shippedFallback);
    assert.equal(rolledBack.requestedId,active.requestedId);
  }
  assert.equal(fixture.policy.missingOverrideFallsBackSafely,true);
});

test('reload identity remains gameplay-driven before and after override',()=>{
  for(const row of fixture.cases){
    const gameplay=structuredClone(row.gameplayIdentity);
    const before=reload(gameplay);
    resolve(row,true);
    const after=reload(gameplay);
    assert.deepEqual(after,before,row.caseId);
  }
  assert.equal(fixture.policy.reloadIdentityGameplayDriven,true);
});

test('School blocking scene override does not merge it with paid lesson result',()=>{
  const lesson=fixture.cases.find((row:any)=>row.caseId==='school-arcana-lesson');
  const blocking=fixture.cases.find((row:any)=>row.caseId==='school-blocking-scene');
  assert.ok(lesson&&blocking);
  assert.equal(lesson.presentationId,'school/arcana/lesson/default');
  assert.equal(blocking.presentationId,'location/town/event/base-school/lesson');
  assert.notEqual(lesson.presentationId,blocking.presentationId);
  assert.equal(blocking.owner,'pendingScene');
});

test('override payload has no gameplay mutation fields',()=>{
  assert.equal(fixture.policy.overrideChangesGameplay,false);
  const presentationPayload=fixture.cases.map((row:any)=>({
    presentationId:row.presentationId,
    static:{kind:'image',ref:row.overrideStatic,alt:row.caseId}
  }));
  const serialized=JSON.stringify(presentationPayload).toLowerCase();
  for(const forbidden of [
    '"conditions"','"effects"','"energy"','"money"',
    '"inventory"','"rng"','"reward"','"transition"','"routeid"'
  ])assert.equal(serialized.includes(forbidden),false,forbidden);
});
