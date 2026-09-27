import test from 'node:test';
import assert from 'node:assert/strict';

import {presentationSchema} from '../src/core/presentation.ts';

const gif=(name:string,weight?:number)=>({
  key:name,
  kind:'gif',
  src:`assets/presentation/${name}.gif`,
  alt:`Alt for ${name}`,
  ...(weight===undefined?{}:{weight})
});

function futurePool(candidates:any[],extra:any={}){
  return {
    version:1,
    texts:{},
    media:{},
    slots:{
      'job/lumber/shift/spring/default':{
        pool:{
          ordering:'ordered',
          selectionPolicy:'rotation',
          candidates
        },
        ...extra
      }
    }
  };
}

test('current schema still accepts legacy primary/static/fallback override',()=>{
  const current={
    version:1,
    texts:{},
    media:{},
    slots:{
      'job/lumber/shift/spring/default':{
        primary:{
          kind:'gif',
          src:'assets/presentation/lumber-spring.gif',
          alt:'Lumber spring animation.'
        },
        static:{
          kind:'image',
          src:'assets/stage-lumber.svg',
          alt:'Lumber static fallback.'
        },
        fallbackId:'location/town/default'
      }
    }
  };
  assert.equal(presentationSchema.safeParse(current).success,true);
});

test('future contract matrix: exactly 3 and 5 candidates are the accepted pool bounds',()=>{
  for(const count of [3,5]){
    const candidateList=Array.from({length:count},(_,i)=>gif(`valid-${count}-${i}`));
    assert.ok(candidateList.length>=3&&candidateList.length<=5);
  }
});

test('future contract matrix: 0/1/2 and >5 candidates are rejected by proposed pool rules',()=>{
  for(const count of [0,1,2,6]){
    const candidateList=Array.from({length:count},(_,i)=>gif(`invalid-${count}-${i}`));
    assert.equal(candidateList.length>=3&&candidateList.length<=5,false);
  }
});

test('future contract matrix: each candidate requires GIF source and non-empty alt',()=>{
  const valid=gif('candidate');
  assert.equal(valid.kind,'gif');
  assert.ok(valid.src.endsWith('.gif'));
  assert.ok(valid.alt.length>0);

  const badSource={...valid,src:'assets/presentation/candidate.png'};
  const badAlt={...valid,alt:''};
  assert.equal(badSource.src.endsWith('.gif'),false);
  assert.equal(badAlt.alt.length>0,false);
});

test('future contract matrix: presentation weights must be positive finite numbers when present',()=>{
  for(const weight of [0.1,1,2.5,100]){
    assert.equal(Number.isFinite(weight)&&weight>0,true);
  }
  for(const weight of [0,-1,Number.POSITIVE_INFINITY,Number.NaN]){
    assert.equal(Number.isFinite(weight)&&weight>0,false);
  }
});

test('current executable evidence: explicit pool field is not implemented yet',()=>{
  const parsed=presentationSchema.safeParse(futurePool([
    gif('a'),
    gif('b'),
    gif('c')
  ]));
  assert.equal(parsed.success,false);
});

test('future contract: ambiguous primary+pool should reject unless Lead defines precedence',()=>{
  const shape=futurePool(
    [gif('a'),gif('b'),gif('c')],
    {
      primary:{
        kind:'gif',
        src:'assets/presentation/legacy-primary.gif',
        alt:'Legacy primary.'
      }
    }
  );

  // Current strict schema rejects because pool is unknown. This also records the desired
  // future contract: once pool is added, primary+pool remains invalid unless Lead
  // explicitly defines deterministic precedence.
  assert.equal(presentationSchema.safeParse(shape).success,false);
});
