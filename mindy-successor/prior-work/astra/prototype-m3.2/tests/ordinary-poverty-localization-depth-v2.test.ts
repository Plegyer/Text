import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const root=JSON.parse(readFileSync('content/localization.json','utf8')).strings;
const depth=JSON.parse(
  readFileSync('content/ordinary-poverty-localization-depth-v2.fixture.json','utf8')
);
const map=JSON.parse(
  readFileSync('content/poverty-depth-key-to-variant-map-v1.fixture.json','utf8')
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

const currentEvents=new Map<string,any>();
for(const pack of packs){
  for(const event of pack.events){
    currentEvents.set(event.id,{pack,event});
  }
}

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

test('depth v2 carries exactly 26 mapped current event/variant presentation keys',()=>{
  assert.equal(Object.keys(depth.strings).length,26);
  assert.equal(depth.identityRefs.length,26);
  assert.equal(map.mappings.length,26);

  const expectedPairs=[
    ['poverty-street-production.helpful-summer','default'],
    ['poverty-street-production-v2.helpful-summer-shade','market-closing'],
    ['poverty-street-production-v2.helpful-summer-shade','late-shade'],
    ['poverty-street-production.pressure-winter','default'],
    ['poverty-street-production-v2.pressure-winter-wind','crosswind'],
    ['poverty-street-production-v2.pressure-winter-wind','long-gusts'],
    ['poverty-pressure-production.cold-rain','default'],
    ['poverty-pressure-production.noisy-loading','default'],
    ['poverty-pressure-production.muddy-splash','default'],
    ['poverty-cheap-production.shared-quiet-autumn','default'],
    ['poverty-cheap-production-v2.shared-room-seasons','spring-window'],
    ['poverty-cheap-production-v2.shared-room-seasons','summer-heat'],
    ['poverty-cheap-production-v2.shared-room-seasons','winter-stove'],
    ['poverty-cheap-production-v2.shared-room-seasons','shared-room'],
    ['poverty-recovery-production.small-coin-help','default'],
    ['poverty-recovery-production.short-cleanup','default'],
    ['poverty-recovery-production.herb-bundle','default']
  ].map(([eventId,variantId])=>eventId+'|'+variantId);

  const actualPairs=[...new Set(depth.identityRefs.map(
    (entry:any)=>entry.eventId+'|'+entry.variantId
  ))].sort();

  assert.deepEqual(actualPairs,expectedPairs.sort());

  for(const ref of depth.identityRefs){
    const current=currentEvents.get(ref.eventId);
    assert.ok(current,'missing event '+ref.eventId);
    assert.equal(current.pack.id,ref.packId,ref.eventId);
    assert.ok(
      current.event.variants.some((variant:any)=>variant.id===ref.variantId),
      ref.eventId+' '+ref.variantId
    );
  }
});

test('depth v2 keys match the exact key-to-variant map',()=>{
  const mapped=new Map(
    map.mappings.map((entry:any)=>[entry.key,entry])
  );

  for(const ref of depth.identityRefs){
    const source=mapped.get(ref.key) as any;
    assert.ok(source,ref.key);
    assert.equal(source.packId,ref.packId,ref.key);
    assert.equal(source.eventId,ref.eventId,ref.key);
    assert.equal(source.variantId,ref.variantId,ref.key);
    assert.equal(source.candidateId,ref.candidateId,ref.key);
  }
});

test('all depth v2 strings are complete RU and EN and additive on current root',()=>{
  for(const [key,pair] of Object.entries(depth.strings) as [string,{ru:string;en:string}][]){
    assert.match(key,/^presentation\.poverty\.depth\.[a-z0-9._-]+$/);
    assert.ok(pair.ru?.trim(),key+' ru');
    assert.ok(pair.en?.trim(),key+' en');
    assert.equal(root[key],undefined,'current-root collision: '+key);
  }

  assert.deepEqual(depth.currentRootExactCollisions,[]);
});

test('depth v2 contains no Secret Debt ownership',()=>{
  const raw=JSON.stringify(depth).toLowerCase();

  for(const forbidden of [
    'secret debt',
    'secret-debt',
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

test('depth v2 contains presentation data only and no gameplay fields',()=>{
  const keys=new Set(collectKeys(depth));

  for(const forbidden of [
    'conditions',
    'effects',
    'reactionTriggers',
    'reward',
    'rewards',
    'chance',
    'cooldownDays',
    'maxShows',
    'progressDelta',
    'enduranceCost',
    'setRoute',
    'moneyCost',
    'nextDayEnergyDelta',
    'modifyResource',
    'addItem',
    'addWorldFact',
    'nightPolicy'
  ]){
    assert.equal(keys.has(forbidden),false,forbidden);
  }

  assert.equal(depth.invariants.presentationOnly,true);
  assert.equal(depth.invariants.createsEventIds,false);
  assert.equal(depth.invariants.createsVariantIds,false);
  assert.equal(depth.invariants.createsChoiceIds,false);
  assert.equal(depth.invariants.changesRng,false);
  assert.equal(depth.invariants.changesSaveState,false);
});
