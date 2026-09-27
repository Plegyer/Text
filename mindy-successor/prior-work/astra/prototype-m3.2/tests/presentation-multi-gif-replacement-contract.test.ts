import test from 'node:test';
import assert from 'node:assert/strict';

import {dispatch} from '../src/core/engine.ts';
import {
  emptyPresentation,
  presentationSchema,
  resolvePresentation
} from '../src/core/presentation.ts';
import {catalog,started} from './helpers.ts';

function withLumberGifPool(ids:string[]){
  const cat=structuredClone(catalog) as any;
  const action=cat.definitions.actions.find((a:any)=>a.id==='lumber.shift');
  assert.ok(action);
  const scene=action.scenes.find((s:any)=>s.id==='spring.default');
  assert.ok(scene);
  scene.media=[...ids];
  for(const id of ids.filter(id=>!id.startsWith('missing.'))){
    cat.media.push({
      id,
      kind:'gif',
      src:`assets/presentation/${id.replaceAll('.','-')}.gif`,
      alt:`Presentation candidate ${id}.`
    });
  }
  return cat;
}

function gifIds(resolved:any){
  return resolved.candidates
    .filter((c:any)=>c.kind==='gif')
    .map((c:any)=>c.mediaId??c.src);
}

function mechanics(state:any){
  const copy=structuredClone(state);
  if(copy.run.flow.lastAction)copy.run.flow.lastAction.media=[];
  return copy;
}

test('current primitives expose a replaceable whole catalog pool under one semantic slot',()=>{
  const before=withLumberGifPool(['pool.old.a','pool.old.b','pool.old.c']);
  const after=withLumberGifPool(['pool.new.a','pool.new.b','pool.new.c']);

  const oldResolved=resolvePresentation(
    before,emptyPresentation(),'job/lumber/shift/spring/default',{animationsEnabled:true}
  );
  const newResolved=resolvePresentation(
    after,emptyPresentation(),'job/lumber/shift/spring/default',{animationsEnabled:true}
  );

  assert.equal(oldResolved.requestedId,'job/lumber/shift/spring/default');
  assert.equal(newResolved.requestedId,'job/lumber/shift/spring/default');
  assert.deepEqual(gifIds(oldResolved),['pool.old.a','pool.old.b','pool.old.c']);
  assert.deepEqual(gifIds(newResolved),['pool.new.a','pool.new.b','pool.new.c']);
});

test('one broken catalog candidate is ignored while remaining candidates resolve',()=>{
  const cat=withLumberGifPool(['pool.keep.a','missing.broken','pool.keep.c']);
  const resolved=resolvePresentation(
    cat,emptyPresentation(),'job/lumber/shift/spring/default',{animationsEnabled:true}
  );
  assert.deepEqual(gifIds(resolved),['pool.keep.a','pool.keep.c']);
  assert.equal(resolved.requestedId,'job/lumber/shift/spring/default');
});

test('if all dynamic candidates are missing, semantic fallback remains usable',()=>{
  const cat=withLumberGifPool(['missing.a','missing.b','missing.c']);
  const resolved=resolvePresentation(
    cat,emptyPresentation(),'job/lumber/shift/spring/default',{animationsEnabled:true}
  );
  assert.equal(resolved.requestedId,'job/lumber/shift/spring/default');
  assert.equal(gifIds(resolved).length,0);
  assert.ok(
    resolved.candidates.some((c:any)=>c.kind==='image'),
    'fallback chain should still provide static presentation media'
  );
});

test('rollback to prior pool restores prior media set without changing semantic identity',()=>{
  const prior=withLumberGifPool(['pool.prior.a','pool.prior.b','pool.prior.c']);
  const replacement=withLumberGifPool(['pool.replacement.a','pool.replacement.b','pool.replacement.c']);

  const replacementResolved=resolvePresentation(
    replacement,emptyPresentation(),'job/lumber/shift/spring/default',{animationsEnabled:true}
  );
  const rolledBack=resolvePresentation(
    prior,emptyPresentation(),'job/lumber/shift/spring/default',{animationsEnabled:true}
  );

  assert.deepEqual(gifIds(replacementResolved),[
    'pool.replacement.a','pool.replacement.b','pool.replacement.c'
  ]);
  assert.deepEqual(gifIds(rolledBack),[
    'pool.prior.a','pool.prior.b','pool.prior.c'
  ]);
  assert.equal(rolledBack.requestedId,replacementResolved.requestedId);
});

test('gameplay/save identity is unchanged across different presentation pools',()=>{
  const run=(ids:string[])=>{
    const cat=withLumberGifPool(ids);
    const state=started();
    state.run.calendar.elapsedDays=0;
    return dispatch(state,{type:'action',id:'lumber.shift'},cat);
  };

  const a=run(['pool.a1','pool.a2','pool.a3']);
  const b=run(['pool.b1','pool.b2','pool.b3']);

  assert.equal(a.run.flow.lastAction?.presentationId,'job/lumber/result/default');
  assert.equal(b.run.flow.lastAction?.presentationId,'job/lumber/result/default');
  assert.deepEqual(mechanics(a),mechanics(b));
});

test('save remains free of GIF frame/time/playback state',()=>{
  const state=started();
  const keys=new Set<string>();
  const visit=(value:any)=>{
    if(!value||typeof value!=='object')return;
    if(Array.isArray(value)){ for(const item of value)visit(item); return; }
    for(const [key,child] of Object.entries(value)){
      keys.add(key);
      visit(child);
    }
  };
  visit(state);

  for(const forbidden of [
    'gifFrame','frameIndex','playbackTime','playbackPosition',
    'elapsedMediaTime','loopCount','animationComplete','animationTimestamp'
  ]){
    assert.equal(keys.has(forbidden),false,forbidden);
  }
});

test('future contract evidence: explicit pool replacement shape is not accepted by current schema yet',()=>{
  const future={
    version:1,
    texts:{},
    media:{},
    slots:{
      'job/lumber/shift/spring/default':{
        pool:{
          ordering:'ordered',
          selectionPolicy:'rotation',
          candidates:[
            {key:'a',kind:'gif',src:'assets/presentation/a.gif',alt:'A'},
            {key:'b',kind:'gif',src:'assets/presentation/b.gif',alt:'B'},
            {key:'c',kind:'gif',src:'assets/presentation/c.gif',alt:'C'}
          ]
        }
      }
    }
  };

  assert.equal(presentationSchema.safeParse(future).success,false);
  // Future Lead implementation should flip this only after the bounded pool schema exists.
});
