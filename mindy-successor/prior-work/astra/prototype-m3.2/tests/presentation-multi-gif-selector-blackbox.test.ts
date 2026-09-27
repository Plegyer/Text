import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

import {
  emptyPresentation,
  presentationSchema,
  resolvePresentation
} from '../src/core/presentation.ts';
import {catalog,started} from './helpers.ts';

const fixture=JSON.parse(
  readFileSync('content/presentation-multi-gif-selector-v2.fixture.json','utf8')
);

function fnv1a32(text:string){
  let h=0x811c9dc5;
  for(let i=0;i<text.length;i++){
    const code=text.charCodeAt(i);
    assert.ok(code<=0x7f,'reference fixture seeds are ASCII');
    h^=code;
    h=Math.imul(h,0x01000193)>>>0;
  }
  return h>>>0;
}

function referenceSelect(scenario:any){
  const seed=`${scenario.presentationId}|${scenario.occurrenceKey}|${scenario.poolVersion}`;
  const hash=fnv1a32(seed);
  if(scenario.selectionPolicy.startsWith('weighted')){
    const total=scenario.candidates.reduce(
      (n:number,c:any)=>n+(c.weight??1),
      0
    );
    const point=(hash/4294967296)*total;
    let acc=0;
    for(let i=0;i<scenario.candidates.length;i++){
      acc+=scenario.candidates[i].weight??1;
      if(point<acc)return {hash,index:i,key:scenario.candidates[i].key};
    }
    const i=scenario.candidates.length-1;
    return {hash,index:i,key:scenario.candidates[i].key};
  }
  const index=hash%scenario.candidates.length;
  return {hash,index,key:scenario.candidates[index].key};
}

function lumberCatalog(ids:string[]){
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
      alt:`Candidate ${id}.`
    });
  }
  return cat;
}

test('same occurrence and pool version select the same reference candidate on reload',()=>{
  const first=fixture.scenarios.find((x:any)=>x.id==='same-occurrence-initial');
  const reload=fixture.scenarios.find((x:any)=>x.id==='same-occurrence-reload');
  const a=referenceSelect(first);
  const b=referenceSelect(reload);

  assert.deepEqual(a,b);
  assert.equal(a.key,first.expected.key);
  assert.equal(a.hash,first.expected.hash);
  assert.equal(fixture.reloadProof.expectedSameCandidate,true);
  assert.equal(fixture.reloadProof.expectedSameHash,true);
});

test('different occurrence keys may select different candidates without changing semantic identity',()=>{
  const aScenario=fixture.scenarios.find((x:any)=>x.id==='same-occurrence-initial');
  const bScenario=fixture.scenarios.find((x:any)=>x.id==='next-occurrence');
  const a=referenceSelect(aScenario);
  const b=referenceSelect(bScenario);

  assert.equal(aScenario.presentationId,bScenario.presentationId);
  assert.notEqual(a.hash,b.hash);
  assert.notEqual(a.key,b.key,'fixture intentionally demonstrates visual variation');
});

test('pool ordering and replacement remain deterministic for the same occurrence seed',()=>{
  const base=structuredClone(
    fixture.scenarios.find((x:any)=>x.id==='same-occurrence-initial')
  );
  const original=referenceSelect(base);

  const reordered=structuredClone(base);
  reordered.candidates=[
    base.candidates[2],
    base.candidates[0],
    base.candidates[3],
    base.candidates[1]
  ];
  const a=referenceSelect(reordered);
  const b=referenceSelect(reordered);

  assert.deepEqual(a,b);
  assert.equal(a.hash,original.hash);
  // Reordering changes presentation mapping, not gameplay identity.
  assert.equal(reordered.presentationId,base.presentationId);
});

test('current resolver ignores one missing GIF candidate and exposes remaining pool/fallback',()=>{
  const cat=lumberCatalog(['pool.a','missing.b','pool.c']);
  const before=started();
  const beforeJson=JSON.stringify(before);
  const beforeRng=before.run.rngState.state;

  const resolved=resolvePresentation(
    cat,
    emptyPresentation(),
    'job/lumber/shift/spring/default',
    {animationsEnabled:true}
  );

  assert.equal(resolved.requestedId,'job/lumber/shift/spring/default');
  assert.deepEqual(
    resolved.candidates.filter(c=>c.kind==='gif').map(c=>c.mediaId),
    ['pool.a','pool.c']
  );
  assert.ok(resolved.candidates.some(c=>c.kind==='image'));
  assert.equal(before.run.rngState.state,beforeRng);
  assert.equal(JSON.stringify(before),beforeJson);
});

test('all missing dynamic candidates still fall through to static semantic fallback',()=>{
  const cat=lumberCatalog(['missing.a','missing.b','missing.c']);
  const resolved=resolvePresentation(
    cat,
    emptyPresentation(),
    'job/lumber/shift/spring/default',
    {animationsEnabled:true}
  );

  assert.equal(resolved.requestedId,'job/lumber/shift/spring/default');
  assert.equal(resolved.candidates.some(c=>c.kind==='gif'),false);
  assert.ok(resolved.candidates.some(c=>c.kind==='image'));
});

test('animations-off never needs selector randomness and does not mutate Save/RNG',()=>{
  const cat=lumberCatalog(['pool.a','pool.b','pool.c']);
  const state=started();
  const before=structuredClone(state);

  const resolved=resolvePresentation(
    cat,
    {
      ...emptyPresentation(),
      slots:{
        'job/lumber/shift/spring/default':{
          static:{
            kind:'image',
            src:'assets/stage-lumber.svg',
            alt:'Static Lumber fallback.'
          }
        }
      }
    },
    'job/lumber/shift/spring/default',
    {animationsEnabled:false}
  );

  assert.equal(resolved.candidates.some(c=>c.kind==='gif'),false);
  assert.ok(resolved.candidates.some(c=>c.kind==='image'));
  assert.deepEqual(state,before);
});

test('future explicit pool field remains intentionally unwired in current runtime',()=>{
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
});
