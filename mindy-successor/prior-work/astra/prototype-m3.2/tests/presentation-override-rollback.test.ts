import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const json=(path:string)=>JSON.parse(readFileSync(path,'utf8'));
const coverage=json('content/presentation-semantic-coverage-checksum.fixture.json');
const fallbacks=json('content/presentation-fallback-asset-integrity.fixture.json');

const knownIds=new Set<string>(coverage.entries.map((row:any)=>row.presentationId));
const fallbackById=new Map<string,string>(
  fallbacks.slotBindings.map((row:any)=>[row.presentationId,row.mediaId])
);

type Override={kind:'gif'|'image';ref:string;alt:string};
type OverrideMap=Record<string,Override>;

function canonicalExport(overrides:OverrideMap){
  return JSON.stringify(
    Object.fromEntries(
      Object.entries(overrides).sort(([a],[b])=>a.localeCompare(b))
    )
  );
}

function preflight(overrides:OverrideMap){
  for(const [id,override] of Object.entries(overrides)){
    if(!knownIds.has(id))throw new Error('unknown-or-orphan presentationId');
    if(!override.alt.trim())throw new Error('missing alt');
    if(override.kind==='gif'&&!override.ref.endsWith('.gif'))throw new Error('kind mismatch');
    if(override.kind==='image'&&!/\.(?:svg|png|jpg|jpeg|webp)$/.test(override.ref))throw new Error('kind mismatch');
  }
}

function rollback(overrides:OverrideMap,presentationId:string){
  if(!knownIds.has(presentationId))throw new Error('unknown rollback target');
  const next=structuredClone(overrides);
  delete next[presentationId];
  preflight(next);
  return next;
}

function resolveSource(overrides:OverrideMap,presentationId:string){
  const active=overrides[presentationId];
  if(active)return {source:'override',ref:active.ref};
  const mediaId=fallbackById.get(presentationId);
  if(mediaId)return {source:'shipped-fallback',ref:mediaId};
  return {source:'semantic-fallback',ref:'location/town/default'};
}

test('bad override can be removed and original shipped fallback becomes active again',()=>{
  const id='job/lumber/shift/spring/default';
  const overrides:OverrideMap={
    [id]:{kind:'gif',ref:'media/lumber/shift-spring.gif',alt:'Spring shift override'}
  };

  assert.equal(resolveSource(overrides,id).source,'override');
  const rolled=rollback(overrides,id);
  assert.equal(rolled[id],undefined);
  assert.deepEqual(
    resolveSource(rolled,id),
    {source:'shipped-fallback',ref:'job.lumber.shift.spring.default'}
  );
});

test('rollback never mutates gameplay/save state',()=>{
  const gameplay={
    eventId:'lumber.career-first-shift',
    variantId:'default',
    courseId:'school.course.arcana',
    activity:{activityId:'lumber.forest',routeId:'logging-road'},
    endingId:'ending.lumber.hard-work',
    energy:2,
    money:500
  };
  const before=structuredClone(gameplay);

  const overrides:OverrideMap={
    'job/lumber/shift/spring/default':{
      kind:'gif',
      ref:'media/lumber/shift-spring.gif',
      alt:'Spring shift override'
    }
  };
  rollback(overrides,'job/lumber/shift/spring/default');
  assert.deepEqual(gameplay,before);
});

test('unknown/orphan override cannot remain active or be guessed onto a known slot',()=>{
  const orphan:OverrideMap={
    'job.lumber.shift.spring.default':{
      kind:'gif',
      ref:'media/lumber/shift-spring.gif',
      alt:'Dotted orphan'
    }
  };
  assert.throws(()=>preflight(orphan),/unknown-or-orphan presentationId/);
  assert.equal(orphan['job/lumber/shift/spring/default'],undefined);
});

test('rollback is atomic when remaining override set is invalid',()=>{
  const validId='job/lumber/shift/spring/default';
  const invalidId='school/removed-course/lesson/default';
  const overrides:OverrideMap={
    [validId]:{kind:'gif',ref:'media/lumber/shift-spring.gif',alt:'Spring'},
    [invalidId]:{kind:'image',ref:'assets/stage-school.svg',alt:'Removed'}
  };
  const before=structuredClone(overrides);
  assert.throws(()=>rollback(overrides,validId),/unknown-or-orphan presentationId/);
  assert.deepEqual(overrides,before);
});

test('import/export remains deterministic after rollback',()=>{
  const overrides:OverrideMap={
    'relationship/lumber-foreman/lumber-foreman-notice/default':{
      kind:'gif',
      ref:'media/lumber/foreman-professional.gif',
      alt:'Foreman'
    },
    'job/lumber/shift/spring/default':{
      kind:'gif',
      ref:'media/lumber/shift-spring.gif',
      alt:'Spring'
    },
    'job/lumber/shift/winter/default':{
      kind:'gif',
      ref:'media/lumber/shift-winter.gif',
      alt:'Winter'
    }
  };

  const rolled=rollback(overrides,'job/lumber/shift/spring/default');
  const exported=canonicalExport(rolled);
  const imported=JSON.parse(exported);
  assert.deepEqual(imported,rolled);
  assert.deepEqual(
    Object.keys(imported),
    [
      'job/lumber/shift/winter/default',
      'relationship/lumber-foreman/lumber-foreman-notice/default'
    ]
  );
});
