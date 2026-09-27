import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

import {presentationSchema} from '../src/core/presentation.ts';

const fixture=JSON.parse(
  readFileSync('content/presentation-drafts/bilingual-multi-gif-authoring-v1.json','utf8')
);

const localeToken=/(^|[\/._-])(ru|en)(?=[\/._-]|$)/;

function nonEmpty(value:unknown){
  return typeof value==='string'&&value.trim().length>0;
}

function walk(value:any,visit:(key:string,value:any)=>void){
  if(Array.isArray(value)){
    for(const item of value)walk(item,visit);
    return;
  }
  if(!value||typeof value!=='object')return;
  for(const [key,child] of Object.entries(value)){
    visit(key,child);
    walk(child,visit);
  }
}

test('fixture is explicitly authoring-only because current runtime has no bilingual presentation schema',()=>{
  assert.equal(fixture.status,'AUTHORING_ONLY_NOT_RUNTIME_WIRED');
  assert.equal(presentationSchema.safeParse(fixture).success,false);
});

test('RU is source locale and RU+EN are both shipped locales',()=>{
  assert.equal(fixture.locales.source,'ru');
  assert.deepEqual(fixture.locales.shipped,['ru','en']);
  assert.deepEqual(fixture.locales.fallbackOrder.ru,['ru','en']);
  assert.deepEqual(fixture.locales.fallbackOrder.en,['en','ru']);
});

test('every candidate pool has 3-5 candidates and bilingual candidate alt text',()=>{
  for(const pool of fixture.pools){
    assert.ok(pool.candidates.length>=3&&pool.candidates.length<=5,pool.presentationId);
    const keys=new Set<string>();
    for(const candidate of pool.candidates){
      assert.ok(nonEmpty(candidate.key),pool.presentationId);
      assert.equal(keys.has(candidate.key),false,candidate.key);
      keys.add(candidate.key);
      assert.equal(candidate.kind,'gif');
      assert.ok(nonEmpty(candidate.src),candidate.key);
      assert.ok(nonEmpty(candidate.alt?.ru),candidate.key);
      assert.ok(nonEmpty(candidate.alt?.en),candidate.key);
    }
  }
});

test('every pool has bilingual static alt and bilingual text fallback',()=>{
  for(const pool of fixture.pools){
    assert.equal(pool.staticFallback.kind,'image');
    assert.ok(nonEmpty(pool.staticFallback.src),pool.presentationId);
    assert.ok(nonEmpty(pool.staticFallback.alt?.ru),pool.presentationId);
    assert.ok(nonEmpty(pool.staticFallback.alt?.en),pool.presentationId);
    assert.ok(nonEmpty(pool.textFallback?.ru),pool.presentationId);
    assert.ok(nonEmpty(pool.textFallback?.en),pool.presentationId);
  }
});

test('optional caption/fallback text keys are present for both locales',()=>{
  for(const pool of fixture.pools){
    assert.ok(nonEmpty(pool.textKeys?.caption?.ru),pool.presentationId);
    assert.ok(nonEmpty(pool.textKeys?.caption?.en),pool.presentationId);
    assert.ok(nonEmpty(pool.textKeys?.fallback?.ru),pool.presentationId);
    assert.ok(nonEmpty(pool.textKeys?.fallback?.en),pool.presentationId);
  }
});

test('semantic IDs, candidate keys and media paths are locale-neutral',()=>{
  for(const pool of fixture.pools){
    assert.equal(localeToken.test(pool.presentationId),false,pool.presentationId);
    assert.equal(localeToken.test(pool.staticFallback.src),false,pool.staticFallback.src);
    for(const candidate of pool.candidates){
      assert.equal(localeToken.test(candidate.key),false,candidate.key);
      assert.equal(localeToken.test(candidate.src),false,candidate.src);
    }
  }
});

test('authoring fixture contains no gameplay conditions/effects/rewards or locale-specific mechanics',()=>{
  const forbidden=new Set([
    'conditions','effects','rewards','reward','eligibility',
    'rngState','rng','timing','cooldownDays','maxShows',
    'energyDelta','moneyDelta','statEffects'
  ]);
  const seen:string[]=[];
  walk(fixture,(key)=>{
    if(forbidden.has(key))seen.push(key);
  });
  assert.deepEqual(seen,[]);
  assert.equal(fixture.identityPolicy.gameplayFieldsAllowed,false);
  assert.equal(fixture.identityPolicy.localeAffectsMediaSelection,false);
});

test('fixture does not duplicate gameplay events by locale',()=>{
  const keys=new Set<string>();
  walk(fixture,(key)=>keys.add(key));
  assert.equal(keys.has('eventId'),false);
  assert.equal(keys.has('variantId'),false);
  assert.equal(keys.has('choiceId'),false);

  // The fixture references only shared semantic presentation identities.
  const ids=fixture.pools.map((pool:any)=>pool.presentationId);
  assert.equal(new Set(ids).size,ids.length);
});

test('candidate media identity is shared across RU and EN',()=>{
  for(const pool of fixture.pools){
    for(const candidate of pool.candidates){
      assert.ok(nonEmpty(candidate.alt.ru));
      assert.ok(nonEmpty(candidate.alt.en));
      assert.equal(typeof candidate.src,'string');
      assert.equal(typeof candidate.key,'string');
      assert.equal(candidate.src.includes('/ru/'),false);
      assert.equal(candidate.src.includes('/en/'),false);
    }
  }
});
