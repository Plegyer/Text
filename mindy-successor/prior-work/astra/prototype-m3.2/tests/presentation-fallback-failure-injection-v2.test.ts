import test from 'node:test';
import assert from 'node:assert/strict';
import {existsSync,readFileSync} from 'node:fs';

import {catalog,started} from './helpers.ts';
import {applyPresentation,emptyPresentation,resolvePresentation} from '../src/core/presentation.ts';

const fixture=JSON.parse(
  readFileSync('content/presentation-fallback-failure-injection-v2.fixture.json','utf8')
);

function gameplaySnapshot(){
  const state=started();
  return {
    run:structuredClone(state.run),
    meta:structuredClone(state.meta)
  };
}

function firstAvailable(candidates:any[]){
  return candidates.find(candidate=>
    candidate.src.startsWith('data:')||existsSync(candidate.src)
  )??null;
}

test('suite covers all six required merged-RC failure classes',()=>{
  assert.deepEqual(
    new Set(fixture.cases.map((row:any)=>row.caseId)),
    new Set([
      'missing-gif','missing-static','invalid-override',
      'stale-override','fallback-cycle','animations-disabled'
    ])
  );
});

test('missing GIF degrades to shipped static without gameplay mutation',()=>{
  const row=fixture.cases.find((x:any)=>x.caseId==='missing-gif');
  const before=gameplaySnapshot();
  const patch={
    ...emptyPresentation(),
    slots:{
      [row.presentationId]:{
        primary:{kind:'gif',src:row.primary,alt:'Missing injected GIF'},
        static:{kind:'image',src:row.staticFallback,alt:'Static Lumber fallback'}
      }
    }
  };
  const resolved=resolvePresentation(catalog,patch,row.presentationId,{animationsEnabled:true});
  const available=firstAvailable(resolved.candidates);
  assert.equal(available?.src,row.staticFallback);
  assert.deepEqual(gameplaySnapshot(),before);
});

test('missing static with text fallback remains text-safe at failure-injection boundary',()=>{
  const row=fixture.cases.find((x:any)=>x.caseId==='missing-static');
  assert.equal(existsSync(row.staticFallback),false);
  assert.ok(row.textFallback.trim());
  assert.equal(row.expected,'TEXT_SAFE_FALLBACK');
});

test('invalid media kind/source pairing rejects before persistence',()=>{
  const row=fixture.cases.find((x:any)=>x.caseId==='invalid-override');
  const patch={
    ...emptyPresentation(),
    slots:{
      [row.presentationId]:{
        static:{
          kind:'image',
          src:'assets/not-static.gif',
          alt:'Invalid image source'
        }
      }
    }
  };
  assert.throws(()=>applyPresentation(catalog,patch));
  assert.equal(row.expected,'REJECT_BEFORE_PERSISTENCE');
});

test('stale unknown semantic override rejects before persistence',()=>{
  const row=fixture.cases.find((x:any)=>x.caseId==='stale-override');
  const patch={
    ...emptyPresentation(),
    slots:{
      [row.presentationId]:{
        static:{kind:'image',src:'assets/stage-school.svg',alt:'Stale'}
      }
    }
  };
  assert.throws(()=>applyPresentation(catalog,patch),/presentationId/i);
});

test('fallback cycle between known production slots rejects before persistence',()=>{
  const row=fixture.cases.find((x:any)=>x.caseId==='fallback-cycle');
  const patch={
    ...emptyPresentation(),
    slots:{
      'job/lumber/result/default':{
        fallbackId:'location/town/default'
      },
      'location/town/default':{
        fallbackId:'job/lumber/result/default'
      }
    }
  };
  assert.throws(()=>applyPresentation(catalog,patch),/Цикл presentation fallback/);
  assert.equal(row.expected,'REJECT_BEFORE_PERSISTENCE');
});

test('animations disabled ignores GIF primary and chooses static candidate',()=>{
  const row=fixture.cases.find((x:any)=>x.caseId==='animations-disabled');
  const before=gameplaySnapshot();
  const patch={
    ...emptyPresentation(),
    slots:{
      [row.presentationId]:{
        primary:{kind:'gif',src:row.primary,alt:'Optional Foreman Night GIF'},
        static:{kind:'image',src:row.staticFallback,alt:'Static Foreman Night'}
      }
    }
  };
  const resolved=resolvePresentation(catalog,patch,row.presentationId,{animationsEnabled:false});
  assert.equal(resolved.candidates[0]?.kind,'image');
  assert.equal(resolved.candidates[0]?.src,row.staticFallback);
  assert.deepEqual(gameplaySnapshot(),before);
});

test('failure policy never authorizes gameplay mutation',()=>{
  assert.equal(fixture.policy.gameplayMutationAllowed,false);
  assert.equal(fixture.policy.invalidConfigPersistenceAllowed,false);
});
