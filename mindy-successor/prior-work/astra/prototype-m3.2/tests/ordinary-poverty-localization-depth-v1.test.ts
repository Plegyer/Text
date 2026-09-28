import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const root=JSON.parse(readFileSync('content/localization.json','utf8')).strings;
const depth=JSON.parse(
  readFileSync('content/ordinary-poverty-localization-depth-v1.fixture.json','utf8')
);

const packFiles=[
  'poverty-street-production.json',
  'poverty-street-production-v2.json',
  'poverty-cheap-production.json',
  'poverty-cheap-production-v2.json',
  'poverty-recovery-production.json',
  'poverty-pressure-production.json'
];

const packs=packFiles.map(name=>JSON.parse(
  readFileSync('content/packs/'+name,'utf8')
));

const exactEventIds=packs.flatMap((pack:any)=>pack.events.map((event:any)=>event.id));

function collectKeys(value:any,out:string[]=[]):string[]{
  if(Array.isArray(value)){
    for(const item of value)collectKeys(item,out);
    return out;
  }
  if(value&&typeof value==='object'){
    for(const [key,item] of Object.entries(value)){
      out.push(key);
      collectKeys(item,out);
    }
  }
  return out;
}

test('current ordinary-poverty production identities remain exact',()=>{
  assert.deepEqual(exactEventIds,[
    'poverty-street-production.helpful-summer',
    'poverty-street-production.neutral-autumn',
    'poverty-street-production.pressure-winter',
    'poverty-street-production-v2.helpful-summer-shade',
    'poverty-street-production-v2.neutral-autumn-crossing',
    'poverty-street-production-v2.pressure-winter-wind',
    'poverty-cheap-production.shared-quiet-autumn',
    'poverty-cheap-production-v2.shared-room-seasons',
    'poverty-recovery-production.small-coin-help',
    'poverty-recovery-production.short-cleanup',
    'poverty-recovery-production.herb-bundle',
    'poverty-pressure-production.cold-rain',
    'poverty-pressure-production.noisy-loading',
    'poverty-pressure-production.muddy-splash'
  ]);

  for(const ref of depth.existingIdentityRefs){
    assert.ok(exactEventIds.includes(ref.eventId),ref.eventId);
    const event=packs.flatMap((pack:any)=>pack.events)
      .find((entry:any)=>entry.id===ref.eventId);
    assert.ok(event);
    const currentVariants=event.variants.map((variant:any)=>variant.id);
    for(const variantId of ref.variantIds){
      assert.ok(currentVariants.includes(variantId),ref.eventId+' '+variantId);
    }
  }
});

test('all additive depth localization is complete RU and EN',()=>{
  const entries=Object.entries(depth.strings) as [string,{ru:string;en:string}][];
  assert.equal(entries.length,26);

  for(const [key,pair] of entries){
    assert.match(key,/^presentation\.poverty\.depth\.[a-z0-9._-]+$/);
    assert.ok(pair.ru?.trim(),key+' ru');
    assert.ok(pair.en?.trim(),key+' en');
  }
});

test('depth keys are additive and have no current-root namespace collision',()=>{
  assert.deepEqual(depth.currentRootExactCollisions,[]);

  for(const key of Object.keys(depth.strings)){
    assert.equal(root[key],undefined,'unexpected current-root collision: '+key);
  }
});

test('depth fixture contains no Secret Debt ownership',()=>{
  const raw=JSON.stringify(depth).toLowerCase();

  for(const forbidden of [
    'secret-debt',
    'secret debt',
    'paid_freedom',
    'bound_life',
    'takeover',
    'lender',
    'slave career'
  ]){
    assert.equal(raw.includes(forbidden),false,forbidden);
  }

  assert.equal(depth.invariants.secretDebtIncluded,false);
});

test('depth fixture contains no gameplay mechanics fields',()=>{
  const keys=new Set(collectKeys(depth));

  for(const forbidden of [
    'conditions',
    'effects',
    'reactionTriggers',
    'reward',
    'rewards',
    'chance',
    'progressDelta',
    'enduranceCost',
    'setRoute',
    'moneyCost',
    'nextDayEnergyDelta',
    'modifyResource',
    'addItem',
    'addWorldFact'
  ]){
    assert.equal(keys.has(forbidden),false,forbidden);
  }

  assert.equal(depth.invariants.presentationOnly,true);
  assert.equal(depth.invariants.createsEventIds,false);
  assert.equal(depth.invariants.createsVariantIds,false);
  assert.equal(depth.invariants.createsChoiceIds,false);
});
