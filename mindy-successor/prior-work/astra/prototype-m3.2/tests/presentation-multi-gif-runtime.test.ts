import test from 'node:test';
import assert from 'node:assert/strict';

import {
  emptyPresentation,
  presentationSchema,
  resolvePresentation,
  selectPresentationPoolIndex
} from '../src/core/presentation.ts';
import {catalog} from './helpers.ts';

const gifA='data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==';
const gifB='data:image/gif;base64,R0lGODlhAQABAIAAAAD/AAAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==';
const gifC='data:image/gif;base64,R0lGODlhAQABAIAAAAD/AP///ywAAAAAAQABAAACAUwAOw==';
const gifD='data:image/gif;base64,R0lGODlhAQABAIAAAP8AAP///ywAAAAAAQABAAACAUwAOw==';
const gifE='data:image/gif;base64,R0lGODlhAQABAIAAAAAA/////ywAAAAAAQABAAACAUwAOw==';
const png='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAAB';

const pool=(candidates=3)=>({
  version:1,
  ordering:'ordered' as const,
  selectionPolicy:'unweighted' as const,
  candidates:[
    {key:'a',kind:'gif' as const,src:gifA,alt:'A'},
    {key:'b',kind:'gif' as const,src:gifB,alt:'B'},
    {key:'c',kind:'gif' as const,src:gifC,alt:'C'},
    {key:'d',kind:'gif' as const,src:gifD,alt:'D'},
    {key:'e',kind:'gif' as const,src:gifE,alt:'E'}
  ].slice(0,candidates)
});

test('multi-GIF schema accepts bounded 3..5 pools and old primary overrides',()=>{
  for(const count of [3,5]){
    assert.doesNotThrow(()=>presentationSchema.parse({
      ...emptyPresentation(),
      slots:{'job/lumber/shift/spring/default':{pool:pool(count)}}
    }));
  }

  assert.doesNotThrow(()=>presentationSchema.parse({
    ...emptyPresentation(),
    slots:{'job/lumber/shift/spring/default':{
      primary:{kind:'gif',src:gifA,alt:'Legacy primary'},
      static:{kind:'image',src:png,alt:'Static'}
    }}
  }));

  for(const count of [2]){
    assert.throws(()=>presentationSchema.parse({
      ...emptyPresentation(),
      slots:{'job/lumber/shift/spring/default':{pool:pool(count)}}
    }));
  }

  const six={...pool(5),candidates:[...pool(5).candidates,{key:'f',kind:'gif' as const,src:gifA,alt:'F'}]};
  assert.throws(()=>presentationSchema.parse({
    ...emptyPresentation(),
    slots:{'job/lumber/shift/spring/default':{pool:six}}
  }));

  assert.throws(()=>presentationSchema.parse({
    ...emptyPresentation(),
    slots:{'job/lumber/shift/spring/default':{
      primary:{kind:'gif',src:gifA,alt:'Ambiguous primary'},
      pool:pool(3)
    }}
  }),/primary and pool/);

  const duplicate=pool(3);
  duplicate.candidates[1]={...duplicate.candidates[1]!,key:'a'};
  assert.throws(()=>presentationSchema.parse({
    ...emptyPresentation(),
    slots:{'job/lumber/shift/spring/default':{pool:duplicate}}
  }),/Duplicate media candidate key/);

  const weighted=pool(3);
  weighted.selectionPolicy='weighted';
  weighted.candidates[0]={...weighted.candidates[0]!,weight:0};
  assert.throws(()=>presentationSchema.parse({
    ...emptyPresentation(),
    slots:{'job/lumber/shift/spring/default':{pool:weighted}}
  }));
});

test('multi-GIF selector is deterministic and varies across occurrence keys without RNG',()=>{
  const candidates=pool(5).candidates;
  const before=JSON.stringify(candidates);
  const first=selectPresentationPoolIndex(candidates,{
    presentationId:'job/lumber/shift/spring/default',
    occurrenceKey:'run-1|action|lumber.shift|1',
    poolVersion:1,
    selectionPolicy:'unweighted'
  });
  const second=selectPresentationPoolIndex(candidates,{
    presentationId:'job/lumber/shift/spring/default',
    occurrenceKey:'run-1|action|lumber.shift|1',
    poolVersion:1,
    selectionPolicy:'unweighted'
  });
  assert.equal(second,first);
  assert.equal(JSON.stringify(candidates),before);

  const seen=new Set<number>();
  for(let i=1;i<=20;i++)seen.add(selectPresentationPoolIndex(candidates,{
    presentationId:'job/lumber/shift/spring/default',
    occurrenceKey:`run-1|action|lumber.shift|${i}`,
    poolVersion:1,
    selectionPolicy:'unweighted'
  }));
  assert.ok(seen.size>1);
});

test('resolver places deterministic pool candidate first and preserves static animation-off fallback',()=>{
  const patch={
    ...emptyPresentation(),
    slots:{
      'job/lumber/shift/spring/default':{
        pool:pool(3),
        static:{kind:'image' as const,src:png,alt:'Static Lumber'}
      }
    }
  };

  const a=resolvePresentation(catalog,patch,'job/lumber/shift/spring/default',{
    animationsEnabled:true,
    occurrenceKey:'run-1|action|lumber.shift|7'
  });
  const b=resolvePresentation(catalog,patch,'job/lumber/shift/spring/default',{
    animationsEnabled:true,
    occurrenceKey:'run-1|action|lumber.shift|7'
  });
  assert.equal(a.selected?.source,'override-pool');
  assert.equal(a.selected?.candidateKey,b.selected?.candidateKey);
  assert.equal(a.candidates.filter(candidate=>candidate.source==='override-pool').length,3);
  assert.equal(new Set(a.candidates.filter(candidate=>candidate.source==='override-pool').map(candidate=>candidate.candidateKey)).size,3);

  const reduced=resolvePresentation(catalog,patch,'job/lumber/shift/spring/default',{
    animationsEnabled:false,
    occurrenceKey:'run-1|action|lumber.shift|7'
  });
  assert.equal(reduced.selected?.source,'override-static');
  assert.equal(reduced.candidates.some(candidate=>candidate.source==='override-pool'),false);
});
