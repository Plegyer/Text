import test from 'node:test';
import assert from 'node:assert/strict';
import {existsSync,readFileSync} from 'node:fs';

const json=(path:string)=>JSON.parse(readFileSync(path,'utf8'));
const fixture=json('content/presentation-slot-completeness-negative.fixture.json');
const coverage=json('content/presentation-semantic-coverage-checksum.fixture.json');
const productionIds=new Set<string>(coverage.entries.map((row:any)=>row.presentationId));

function classify(row:any){
  if(row.mutation.removePresentationId)return 'BLOCKING_IDENTITY_GAP';
  if(row.mutation.removeFutureAsset)return 'FUTURE_ASSET_ONLY';
  if(row.fallbackAvailable)return 'SAFE_STATIC_FALLBACK';
  if(row.textAvailable)return 'SAFE_TEXT_FALLBACK';
  return 'BLOCKING_IDENTITY_GAP';
}

test('current merged RC slice has every required production semantic identity',()=>{
  for(const row of fixture.required){
    assert.ok(productionIds.has(row.presentationId),`${row.surface}: ${row.presentationId}`);
    assert.equal(existsSync(row.fallbackAsset),true,`${row.surface}: ${row.fallbackAsset}`);
  }
  assert.equal(fixture.currentProductionStatus.requiredIdentityGaps,0);
  assert.equal(fixture.currentProductionStatus.rcBlockingPresentationGaps,0);
});

test('required coverage includes all requested product surfaces',()=>{
  assert.deepEqual(
    new Set(fixture.required.map((row:any)=>row.surface)),
    new Set([
      'Lumber','Foreman','School paid lesson','School blocking scene',
      'Night','Forest route','Forest result','Ending','New Run'
    ])
  );
});

test('negative cases classify semantic identity loss as blocking even when a generic visual fallback exists',()=>{
  for(const id of [
    'missing-lumber-result-id',
    'missing-school-blocking-scene-id',
    'missing-forest-route-id',
    'missing-new-run-location-id'
  ]){
    const row=fixture.cases.find((item:any)=>item.caseId===id);
    assert.equal(classify(row),'BLOCKING_IDENTITY_GAP',id);
  }
});

test('media loss with intact identity degrades to static or text fallback rather than becoming identity loss',()=>{
  const expected=new Map([
    ['missing-foreman-direct-media','SAFE_STATIC_FALLBACK'],
    ['missing-school-paid-static','SAFE_STATIC_FALLBACK'],
    ['night-static-unavailable-text-present','SAFE_TEXT_FALLBACK'],
    ['missing-forest-success-static','SAFE_STATIC_FALLBACK'],
    ['missing-ending-dedicated-media','SAFE_STATIC_FALLBACK']
  ]);
  for(const [id,status] of expected){
    const row=fixture.cases.find((item:any)=>item.caseId===id);
    assert.equal(classify(row),status,id);
  }
});

test('optional future GIF absence is never promoted to an RC identity gap',()=>{
  const row=fixture.cases.find((item:any)=>item.caseId==='missing-optional-lumber-gif');
  assert.equal(classify(row),'FUTURE_ASSET_ONLY');
  assert.equal(row.mutation.removeFutureAsset,'media/lumber/shift-spring.gif');
  assert.equal(row.fallbackAvailable,true);
});

test('all four requested classifications are exercised',()=>{
  assert.deepEqual(
    new Set(fixture.cases.map((row:any)=>classify(row))),
    new Set([
      'BLOCKING_IDENTITY_GAP',
      'SAFE_STATIC_FALLBACK',
      'SAFE_TEXT_FALLBACK',
      'FUTURE_ASSET_ONLY'
    ])
  );
});
