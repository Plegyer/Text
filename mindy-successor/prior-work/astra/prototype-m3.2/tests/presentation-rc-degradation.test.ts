import test from 'node:test';
import assert from 'node:assert/strict';
import {existsSync,readFileSync} from 'node:fs';

const json=(path:string)=>JSON.parse(readFileSync(path,'utf8'));
const fixture=json('content/presentation-rc-degradation.fixture.json');
const coverage=json('content/presentation-rc-coverage.fixture.json');
const known=new Set<string>(coverage.rows.map((row:any)=>row.presentationId));

function preflight(row:any){
  if(!known.has(row.presentationId))throw new Error('stale or unknown presentationId');
  if(row.primary&&row.primary.kind!=='gif')throw new Error('invalid primary kind');
  if(!row.textFallback?.trim())throw new Error('missing text fallback');
}

function resolve(row:any){
  preflight(row);
  if(row.animationsEnabled&&row.primary?.available)return 'primary-gif';
  if(row.staticFallback?.available){
    assert.equal(existsSync(row.staticFallback.assetPath),true,row.staticFallback.assetPath);
    return 'static';
  }
  if(row.textFallback?.trim())return 'text';
  throw new Error('presentation exhausted');
}

test('suite covers required RC degradation classes',()=>{
  assert.deepEqual(
    new Set(fixture.cases.map((row:any)=>row.caseId)),
    new Set([
      'primary-gif-missing',
      'static-fallback-missing',
      'primary-and-static-missing-text-present',
      'animations-disabled',
      'stale-replacement-entry'
    ])
  );
});

test('valid degraded configurations keep a safe presentation result',()=>{
  for(const row of fixture.cases.filter((x:any)=>x.expectedConfigOutcome!=='reject-before-persistence')){
    assert.equal(resolve(row),row.expectedPresentation,row.caseId);
    assert.equal(row.expectedGameplayOutcome,'unchanged',row.caseId);
  }
});

test('stale replacement entry rejects before persistence',()=>{
  const row=fixture.cases.find((x:any)=>x.caseId==='stale-replacement-entry');
  assert.ok(row);
  assert.throws(()=>resolve(row),/stale or unknown presentationId/);
  assert.equal(row.expectedConfigOutcome,'reject-before-persistence');
});

test('animations disabled ignores available GIF and keeps semantic identity',()=>{
  const row=fixture.cases.find((x:any)=>x.caseId==='animations-disabled');
  assert.ok(row);
  const id=row.presentationId;
  assert.equal(row.primary.available,true);
  assert.equal(resolve(row),'static');
  assert.equal(row.presentationId,id);
});

test('presentation degradation cannot mutate gameplay state',()=>{
  const gameplay={
    eventId:'lumber.career-first-shift',
    courseId:'school.course.arcana',
    relationshipId:'lumber.foreman',
    energy:3,
    money:600
  };
  for(const row of fixture.cases){
    const before=structuredClone(gameplay);
    try{resolve(row);}catch{}
    assert.deepEqual(gameplay,before,row.caseId);
  }
  assert.equal(fixture.policy.gameplayContinuesOnPresentationFailure,true);
});
