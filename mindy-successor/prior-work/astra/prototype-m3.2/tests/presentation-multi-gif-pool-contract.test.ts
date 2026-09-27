import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

import {dispatch} from '../src/core/engine.ts';
import {
  emptyPresentation,
  presentationSchema,
  resolvePresentation
} from '../src/core/presentation.ts';
import {catalog,started} from './helpers.ts';

const fixture=JSON.parse(
  readFileSync('content/presentation-multi-gif-pools-v1.fixture.json','utf8')
);

function lumberCatalogWithMedia(ids:string[],kind:'gif'|'image'='gif'){
  const cat=structuredClone(catalog) as any;
  const action=cat.definitions.actions.find((a:any)=>a.id==='lumber.shift');
  assert.ok(action,'worker catalog must contain lumber.shift');
  const scene=action.scenes.find((s:any)=>s.id==='spring.default');
  assert.ok(scene,'worker catalog must contain Lumber spring.default');
  scene.media=[...ids];
  for(const id of ids){
    cat.media.push({
      id,
      kind,
      src:`assets/${id.replaceAll('.','-')}.${kind==='gif'?'gif':'svg'}`,
      alt:`Pool candidate ${id}`
    });
  }
  return cat;
}

function normalizedRun(state:any){
  const run=structuredClone(state.run);
  if(run.flow?.lastAction)run.flow.lastAction.media=[];
  return run;
}

test('fixture contract gives every semantic pool 3-5 presentation-only candidates',()=>{
  assert.equal(fixture.shipped,false);
  for(const pool of fixture.pools){
    assert.ok(pool.candidates.length>=3&&pool.candidates.length<=5,pool.presentationId);
    assert.equal(pool.selection,'presentation-only');
    assert.ok(pool.candidates.every((c:any)=>c.shipped===false));
    assert.ok(pool.candidates.every((c:any)=>c.src.startsWith('authoring://non-shipped/')));
    assert.ok(!pool.presentationId.endsWith('.gif'));
  }
});

test('current presentation primitive can expose several catalog GIF candidates under one semantic ID',()=>{
  const cat=lumberCatalogWithMedia(['pool.lumber.a','pool.lumber.b','pool.lumber.c']);
  const resolved=resolvePresentation(
    cat,
    emptyPresentation(),
    'job/lumber/shift/spring/default',
    {animationsEnabled:true}
  );
  const gifCandidates=resolved.candidates.filter(candidate=>candidate.kind==='gif');
  assert.equal(resolved.requestedId,'job/lumber/shift/spring/default');
  assert.equal(gifCandidates.length,3);
  assert.deepEqual(
    gifCandidates.map(candidate=>candidate.mediaId),
    ['pool.lumber.a','pool.lumber.b','pool.lumber.c']
  );
});

test('gameplay effects are invariant when only Lumber presentation media candidate changes',()=>{
  const runWith=(mediaId:string)=>{
    const cat=lumberCatalogWithMedia([mediaId]);
    const state=started();
    state.run.calendar.elapsedDays=0;
    return dispatch(state,{type:'action',id:'lumber.shift'},cat);
  };

  const a=runWith('pool.lumber.a');
  const b=runWith('pool.lumber.b');

  assert.deepEqual(normalizedRun(a),normalizedRun(b));
  assert.equal(a.run.flow.lastAction?.presentationId,'job/lumber/result/default');
  assert.equal(b.run.flow.lastAction?.presentationId,'job/lumber/result/default');
});

test('animations-off ignores GIF pool and keeps static/semantic fallback usable',()=>{
  const cat=lumberCatalogWithMedia(['pool.lumber.a','pool.lumber.b','pool.lumber.c']);
  const patch={
    ...emptyPresentation(),
    slots:{
      'job/lumber/shift/spring/default':{
        static:{
          kind:'image' as const,
          src:'assets/stage-lumber.svg',
          alt:'Static Lumber fallback.'
        }
      }
    }
  };
  const resolved=resolvePresentation(
    cat,
    patch,
    'job/lumber/shift/spring/default',
    {animationsEnabled:false}
  );
  assert.equal(resolved.requestedId,'job/lumber/shift/spring/default');
  assert.ok(resolved.candidates.some(candidate=>
    candidate.kind==='image'&&candidate.src==='assets/stage-lumber.svg'
  ));
  assert.equal(resolved.candidates.some(candidate=>candidate.kind==='gif'),false);
});

test('missing catalog media candidate falls through presentation while gameplay action still executes',()=>{
  const cat=structuredClone(catalog) as any;
  const action=cat.definitions.actions.find((a:any)=>a.id==='lumber.shift');
  assert.ok(action);
  const scene=action.scenes.find((s:any)=>s.id==='spring.default');
  assert.ok(scene);
  scene.media=['pool.does-not-exist'];

  const before=started();
  before.run.calendar.elapsedDays=0;
  const out=dispatch(before,{type:'action',id:'lumber.shift'},cat);
  assert.equal(out.run.flow.lastAction?.presentationId,'job/lumber/result/default');
  assert.equal(out.run.progression.careers.lumber?.counters.completed_shifts,1);

  const resolved=resolvePresentation(
    cat,
    emptyPresentation(),
    'job/lumber/shift/spring/default',
    {animationsEnabled:true}
  );
  assert.equal(resolved.requestedId,'job/lumber/shift/spring/default');
  assert.ok(resolved.candidates.length>0,'semantic fallback should still provide media');
});

test('save state contains no GIF frame/time/playback fields',()=>{
  const state=started();
  const keys=new Set<string>();
  const visit=(value:any)=>{
    if(!value||typeof value!=='object')return;
    if(Array.isArray(value)){for(const item of value)visit(item);return;}
    for(const [key,child] of Object.entries(value)){
      keys.add(key);
      visit(child);
    }
  };
  visit(state);
  for(const forbidden of [
    'gifFrame','frameIndex','playbackTime','playbackPosition',
    'elapsedMediaTime','loopCount','animationComplete'
  ]){
    assert.equal(keys.has(forbidden),false,forbidden);
  }
});

test('media filename is never gameplay or semantic identity',()=>{
  for(const pool of fixture.pools){
    for(const candidate of pool.candidates){
      assert.notEqual(candidate.src,pool.presentationId);
      assert.ok(candidate.src.endsWith('.gif'));
      assert.equal(pool.presentationId.includes('.gif'),false);
    }
  }
});

test('fixture-contract evidence: current override schema does not yet implement explicit candidate-pool field',()=>{
  const pool=fixture.pools[0];
  const futureShape={
    version:1,
    texts:{},
    media:{},
    slots:{
      [pool.presentationId]:{
        pool:pool.candidates
      }
    }
  };
  const parsed=presentationSchema.safeParse(futureShape);
  assert.equal(parsed.success,false);
  // This is deliberate gap evidence, not a failing assertion: current overrides support
  // primary/static/fallbackId, while explicit 3-5 candidate import pools need an extension.
});
