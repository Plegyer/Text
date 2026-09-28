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
const accessibility=JSON.parse(
  readFileSync('content/poverty-static-accessibility-v2.fixture.json','utf8')
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

test('depth v2 still contains exactly 26 current-mapped RU EN keys',()=>{
  const depthKeys=Object.keys(depth.strings);
  assert.equal(depthKeys.length,26);
  assert.equal(depth.identityRefs.length,26);
  assert.equal(map.mappings.length,26);

  const mapByKey=new Map(
    map.mappings.map((entry:any)=>[entry.key,entry])
  );

  for(const ref of depth.identityRefs){
    assert.ok(depthKeys.includes(ref.key),ref.key);

    const mapped=mapByKey.get(ref.key) as any;
    assert.ok(mapped,ref.key);
    assert.equal(mapped.packId,ref.packId,ref.key);
    assert.equal(mapped.eventId,ref.eventId,ref.key);
    assert.equal(mapped.variantId,ref.variantId,ref.key);
    assert.equal(mapped.candidateId,ref.candidateId,ref.key);

    const current=currentEvents.get(ref.eventId);
    assert.ok(current,'missing current event '+ref.eventId);
    assert.equal(current.pack.id,ref.packId,ref.eventId);
    assert.ok(
      current.event.variants.some((variant:any)=>variant.id===ref.variantId),
      ref.eventId+' '+ref.variantId
    );
  }

  for(const [key,pair] of Object.entries(depth.strings) as [string,{ru:string;en:string}][]){
    assert.match(key,/^presentation\.poverty\.depth\.[a-z0-9._-]+$/);
    assert.ok(pair.ru?.trim(),key+' ru');
    assert.ok(pair.en?.trim(),key+' en');
  }
});

test('accessibility v2 targets exact current poverty static alt caption keys',()=>{
  const entries=Object.entries(accessibility.strings) as [string,{ru:string;en:string}][];
  assert.equal(entries.length,20);

  for(const [key,pair] of entries){
    assert.match(
      key,
      /^presentation\.static\.poverty-[a-z0-9.-]+\.(alt|caption)$/
    );
    assert.ok(root[key],key+' current root target');
    assert.ok(pair.ru?.trim(),key+' ru');
    assert.ok(pair.en?.trim(),key+' en');
  }

  assert.equal(accessibility.invariants.mediaPathChanges,false);
  assert.equal(accessibility.invariants.eventIdsIncluded,false);
  assert.equal(accessibility.invariants.gameplayFieldsIncluded,false);
});

test('there are zero unreviewed current-root conflicts',()=>{
  const reviewedReplacementKeys=new Set(Object.keys(accessibility.strings));
  const proposed={
    ...depth.strings,
    ...accessibility.strings
  };

  const unreviewed:string[]=[];

  for(const [key,value] of Object.entries(proposed)){
    if(root[key]===undefined)continue;
    if(JSON.stringify(root[key])===JSON.stringify(value))continue;
    if(!reviewedReplacementKeys.has(key))unreviewed.push(key);
  }

  assert.deepEqual(unreviewed,[]);

  for(const key of Object.keys(depth.strings)){
    assert.equal(root[key],undefined,'depth root collision '+key);
  }
});

test('depth and accessibility v2 contain no Secret Debt content',()=>{
  const raw=JSON.stringify({depth,accessibility}).toLowerCase();

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
  assert.equal(accessibility.invariants.secretDebtIncluded,false);
});

test('depth and accessibility fixtures contain no gameplay mechanics fields',()=>{
  const keys=new Set(collectKeys({depth,accessibility}));

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
    'nightPolicy',
    'rngState'
  ]){
    assert.equal(keys.has(forbidden),false,forbidden);
  }

  assert.equal(depth.invariants.presentationOnly,true);
  assert.equal(depth.invariants.changesRng,false);
  assert.equal(depth.invariants.changesSaveState,false);
  assert.equal(accessibility.invariants.gameplayFieldsIncluded,false);
});
