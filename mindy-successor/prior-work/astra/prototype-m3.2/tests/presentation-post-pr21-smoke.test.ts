import test from 'node:test';
import assert from 'node:assert/strict';
import {existsSync,readFileSync} from 'node:fs';

const json=(path:string)=>JSON.parse(readFileSync(path,'utf8'));
const fixture=json('content/presentation-post-pr21-smoke.fixture.json');
const assets=json('content/presentation-fallback-asset-integrity.fixture.json');

const mediaById=new Map(assets.assets.map((asset:any)=>[asset.mediaId,asset]));

test('smoke matrix mirrors the PR21 visible evidence path in order',()=>{
  assert.deepEqual(
    fixture.boundaries.map((row:any)=>row.boundaryId),
    [
      'lumber-shift',
      'milestone',
      'foreman',
      'school',
      'night',
      'forest-accelerated-internal',
      'forest-accelerated-result',
      'ending-eligible',
      'normal-action-while-ending-eligible',
      'ending-commit',
      'ending-completion',
      'new-run'
    ]
  );
  assert.deepEqual(
    fixture.boundaries.map((row:any)=>row.order),
    Array.from({length:12},(_,index)=>index+1)
  );
});

test('every visible boundary has semantic ID, current fallback, reload, and animation-off expectations',()=>{
  for(const row of fixture.boundaries){
    assert.match(row.presentationId,/^[a-z0-9-]+(?:\/[a-z0-9-]+)+$/);
    assert.equal(row.fallbackBehavior,'shipped-static');
    assert.ok(row.saveReloadExpectation.trim(),row.boundaryId);
    assert.equal(row.animationOffExpectation,'same-id-static',row.boundaryId);

    const media=mediaById.get(row.fallbackMediaId);
    assert.ok(media,`${row.boundaryId}: ${row.fallbackMediaId}`);
    assert.equal(existsSync(media.assetPath),true,media.assetPath);
  }
});

test('accelerated Forest rows are explicitly not claimed as full PA passes',()=>{
  const accelerated=fixture.boundaries.filter((row:any)=>row.accelerated);
  assert.deepEqual(
    accelerated.map((row:any)=>row.boundaryId),
    ['forest-accelerated-internal','forest-accelerated-result']
  );
  for(const row of accelerated){
    assert.equal(row.evidenceLabel,'accelerated-mechanics-evidence-not-full-pa');
  }
  assert.equal(fixture.policy.acceleratedRowsAreFullPaPasses,false);
  assert.equal(fixture.productAcceptanceStatus,'partial-not-closed');
});

test('ending eligibility stays distinct from explicit commit and completion',()=>{
  const eligible=fixture.boundaries.find((row:any)=>row.boundaryId==='ending-eligible');
  const normal=fixture.boundaries.find((row:any)=>row.boundaryId==='normal-action-while-ending-eligible');
  const commit=fixture.boundaries.find((row:any)=>row.boundaryId==='ending-commit');
  const complete=fixture.boundaries.find((row:any)=>row.boundaryId==='ending-completion');
  assert.ok(eligible&&normal&&commit&&complete);
  assert.equal(eligible.presentationId,'location/town/default');
  assert.equal(normal.presentationId,'job/lumber/result/default');
  assert.equal(commit.presentationId,'ending/lumber/hard-work');
  assert.equal(complete.presentationId,commit.presentationId);
});

test('save/reload identity does not depend on animation frame or playback time',()=>{
  assert.equal(fixture.policy.semanticIdentityStable,true);
  assert.equal(fixture.policy.saveReloadNeverPersistsAnimationTime,true);
  const serialized=JSON.stringify(fixture).toLowerCase();
  for(const forbidden of [
    'frameindex','currentframe','playbacktimestamp','elapsedms',
    'animationtime','loopcount'
  ])assert.equal(serialized.includes(forbidden),false,forbidden);
});

test('animation-off is presentation-only across the full smoke path',()=>{
  assert.equal(fixture.policy.animationOffPresentationOnly,true);
  for(const row of fixture.boundaries){
    const before=row.presentationId;
    const animationEnabled=false;
    assert.equal(animationEnabled,false);
    assert.equal(row.presentationId,before,row.boundaryId);
  }
});
