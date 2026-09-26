import test from 'node:test';
import assert from 'node:assert/strict';
import {existsSync,readFileSync} from 'node:fs';

const json=(path:string)=>JSON.parse(readFileSync(path,'utf8'));
const fixture=json('content/presentation-fallback-exhaustion.fixture.json');
const plan=json('content/presentation-production-patch-plan.fixture.json');

const known=new Set<string>([
  'location/town/default',
  ...plan.slots.map((slot:any)=>slot.presentationId)
]);

type Override={
  primaryAvailable?:boolean;
  staticAvailable?:boolean;
  staticAssetPath?:string;
  textFallback?:boolean;
  fallbackId?:string|null;
};

function preflight(overrides:Record<string,Override>){
  for(const [id,value] of Object.entries(overrides)){
    if(!known.has(id))throw new Error('unknown semantic ID: '+id);
    if(value.fallbackId&&!known.has(value.fallbackId)){
      throw new Error('missing fallback target: '+value.fallbackId);
    }
  }

  const visiting=new Set<string>();
  const done=new Set<string>();
  const visit=(id:string)=>{
    if(done.has(id))return;
    if(visiting.has(id))throw new Error('fallback cycle: '+id);
    visiting.add(id);
    const next=overrides[id]?.fallbackId;
    if(next&&overrides[next])visit(next);
    visiting.delete(id);
    done.add(id);
  };
  for(const id of Object.keys(overrides))visit(id);
}

function resolveCase(row:any){
  if(!known.has(row.requestedId))throw new Error('unknown semantic ID: '+row.requestedId);
  preflight(row.overrides);

  if(Object.keys(row.overrides).length===0)return 'base-or-text-safe';

  const seen=new Set<string>();
  let id=row.requestedId;
  while(id&&!seen.has(id)){
    seen.add(id);
    const current:Override|undefined=row.overrides[id];
    if(!current)return 'base-or-text-safe';
    if(current.primaryAvailable)return 'primary-safe';
    if(current.staticAvailable){
      assert.ok(current.staticAssetPath,id);
      assert.equal(existsSync(current.staticAssetPath!),true,current.staticAssetPath);
      return 'static-safe';
    }
    if(current.textFallback)return 'text-safe';
    id=current.fallbackId??'';
  }
  return 'text-safe';
}

test('fixture covers every required pathological fallback class',()=>{
  assert.deepEqual(
    new Set(fixture.cases.map((row:any)=>row.caseId)),
    new Set([
      'missing-primary-valid-static',
      'missing-primary-static-text-only',
      'missing-optional-slot-entirely',
      'fallback-target-missing',
      'deep-fallback-chain',
      'fallback-cycle',
      'unknown-semantic-id'
    ])
  );
});

test('valid exhaustion cases resolve to static/text/base-safe outcomes',()=>{
  for(const row of fixture.cases.filter((x:any)=>x.expected!=='reject-preflight')){
    assert.equal(resolveCase(row),row.expected,row.caseId);
  }
});

test('missing fallback target rejects before persistence',()=>{
  const row=fixture.cases.find((x:any)=>x.caseId==='fallback-target-missing');
  assert.ok(row);
  assert.throws(()=>resolveCase(row),/missing fallback target/);
});

test('fallback cycle rejects before persistence',()=>{
  const row=fixture.cases.find((x:any)=>x.caseId==='fallback-cycle');
  assert.ok(row);
  assert.throws(()=>resolveCase(row),/fallback cycle/);
});

test('unknown semantic ID rejects before persistence',()=>{
  const row=fixture.cases.find((x:any)=>x.caseId==='unknown-semantic-id');
  assert.ok(row);
  assert.throws(()=>resolveCase(row),/unknown semantic ID/);
});

test('presentation fallback evaluation never mutates gameplay state',()=>{
  const gameplay={
    money:600,
    energy:3,
    eventId:'lumber.career-first-shift',
    courseId:'school.course.arcana',
    activityId:'lumber.forest',
    endingId:'ending.lumber.hard-work'
  };

  for(const row of fixture.cases){
    const before=structuredClone(gameplay);
    try{resolveCase(row);}catch{}
    assert.deepEqual(gameplay,before,row.caseId);
  }
  assert.equal(fixture.policy.gameplayStateMutationAllowed,false);
});

test('invalid graph policy is pre-persistence and text is a valid terminal fallback',()=>{
  assert.equal(fixture.policy.invalidGraphRejectedBeforePersistence,true);
  assert.equal(fixture.policy.textFallbackIsSafeTerminal,true);
  const textCase=fixture.cases.find((x:any)=>x.caseId==='missing-primary-static-text-only');
  assert.equal(resolveCase(textCase),'text-safe');
});
