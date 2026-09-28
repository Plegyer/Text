import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const root=JSON.parse(readFileSync('content/localization.json','utf8')).strings;
const presentation=JSON.parse(readFileSync('content/presentation.json','utf8'));
const depth=JSON.parse(
  readFileSync('content/ordinary-poverty-localization-depth-v3.fixture.json','utf8')
);
const accessibility=JSON.parse(
  readFileSync('content/poverty-static-accessibility-v3.fixture.json','utf8')
);
const lookup=JSON.parse(
  readFileSync('content/poverty-depth-render-lookup-v2.fixture.json','utf8')
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

const expected=[
  {
    packId:'poverty-street-production',
    events:[
      {id:'poverty-street-production.helpful-summer',variants:['default'],choices:['take-errand','keep-resting']},
      {id:'poverty-street-production.neutral-autumn',variants:['default'],choices:['settle-in']},
      {id:'poverty-street-production.pressure-winter',variants:['default'],choices:['take-shelter','keep-moving']}
    ]
  },
  {
    packId:'poverty-street-production-v2',
    events:[
      {id:'poverty-street-production-v2.helpful-summer-shade',variants:['market-closing','late-shade'],choices:['take-small-task','keep-place']},
      {id:'poverty-street-production-v2.neutral-autumn-crossing',variants:['drizzle','dry-arcade'],choices:['wait-out-night']},
      {id:'poverty-street-production-v2.pressure-winter-wind',variants:['crosswind','long-gusts'],choices:['use-recess','keep-walking']}
    ]
  },
  {
    packId:'poverty-cheap-production',
    events:[
      {id:'poverty-cheap-production.shared-quiet-autumn',variants:['default'],choices:['settle-quietly']}
    ]
  },
  {
    packId:'poverty-cheap-production-v2',
    events:[
      {id:'poverty-cheap-production-v2.shared-room-seasons',variants:['spring-window','summer-heat','winter-stove','shared-room'],choices:['settle-in']}
    ]
  },
  {
    packId:'poverty-recovery-production',
    events:[
      {id:'poverty-recovery-production.small-coin-help',variants:['default'],choices:['take-coins','leave-them']},
      {id:'poverty-recovery-production.short-cleanup',variants:['default'],choices:['do-cleanup','keep-resting']},
      {id:'poverty-recovery-production.herb-bundle',variants:['default'],choices:['take-herb','leave-herb']}
    ]
  },
  {
    packId:'poverty-pressure-production',
    events:[
      {id:'poverty-pressure-production.cold-rain',variants:['default'],choices:['take-doorway','wait-it-out']},
      {id:'poverty-pressure-production.noisy-loading',variants:['default'],choices:['move-corner','stay-put']},
      {id:'poverty-pressure-production.muddy-splash',variants:['default'],choices:['wipe-down','leave-for-morning']}
    ]
  }
];

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

test('exact current ordinary-poverty pack event variant and choice IDs stay locked',()=>{
  const actual=packs.map((pack:any)=>({
    packId:pack.id,
    events:pack.events.map((event:any)=>({
      id:event.id,
      variants:event.variants.map((variant:any)=>variant.id),
      choices:event.choices.map((choice:any)=>choice.id)
    }))
  }));

  assert.deepEqual(actual,expected);
});

test('depth v3 is complete RU EN and additive against current root',()=>{
  const entries=Object.entries(depth.strings) as [string,{ru:string;en:string}][];
  assert.equal(entries.length,26);

  for(const [key,pair] of entries){
    assert.match(key,/^presentation\.poverty\.depth\.[a-z0-9._-]+$/);
    assert.ok(pair.ru?.trim(),key+' ru');
    assert.ok(pair.en?.trim(),key+' en');
    assert.equal(root[key],undefined,'unexpected current-root depth collision: '+key);
  }
});

test('accessibility v3 targets only current active poverty static alt caption keys',()=>{
  const active=new Set<string>();
  for(const [presentationId,slot] of Object.entries(presentation.slots??{}) as [string,any][]){
    if(!presentationId.startsWith('location/town/event/poverty-'))continue;
    const altKey=slot.static?.altKey;
    if(!altKey)continue;
    active.add(altKey);
    active.add(altKey.replace(/\.alt$/,'.caption'));
  }

  const entries=Object.entries(accessibility.strings) as [string,{ru:string;en:string}][];
  assert.equal(entries.length,20);

  for(const [key,pair] of entries){
    assert.ok(active.has(key),'inactive accessibility target: '+key);
    assert.ok(root[key],'missing current localization target: '+key);
    assert.ok(pair.ru?.trim(),key+' ru');
    assert.ok(pair.en?.trim(),key+' en');
  }
});

test('render lookup covers every current event variant with depth or exact core fallback',()=>{
  const currentPairs=packs.flatMap((pack:any)=>
    pack.events.flatMap((event:any)=>
      event.variants.map((variant:any)=>event.id+'|'+variant.id)
    )
  ).sort();

  const lookupPairs=lookup.entries.map(
    (entry:any)=>entry.eventId+'|'+entry.variantId
  ).sort();

  assert.deepEqual(lookupPairs,currentPairs);
  assert.equal(lookup.entries.length,20);
  assert.equal(
    lookup.entries.filter((entry:any)=>entry.orderedDepthLocalizationKeys.length>0).length,
    17
  );
  assert.equal(
    lookup.entries.filter((entry:any)=>entry.orderedDepthLocalizationKeys.length===0).length,
    3
  );

  const depthKeys=new Set(Object.keys(depth.strings));
  for(const entry of lookup.entries){
    for(const key of entry.orderedDepthLocalizationKeys){
      assert.ok(depthKeys.has(key),key);
    }
    assert.ok(
      root[entry.coreFallbackLocalizationKey],
      entry.coreFallbackLocalizationKey
    );
  }
});

test('fixtures do not overlap Secret Debt School Foreman PR65 or Chat2 media-source ownership',()=>{
  const raw=JSON.stringify({depth,accessibility,lookup}).toLowerCase();

  for(const forbidden of [
    'secret debt',
    'secret-debt',
    'paid_freedom',
    'bound_life',
    'takeover',
    'lender',
    'school.',
    'school-',
    'foreman',
    'pr65',
    'pr #65'
  ]){
    assert.equal(raw.includes(forbidden),false,forbidden);
  }

  const structuralKeys=new Set(collectKeys({depth,accessibility,lookup}));
  for(const mediaOwnedField of [
    'src',
    'media',
    'asset',
    'assets',
    'sources',
    'video',
    'poster'
  ]){
    assert.equal(structuralKeys.has(mediaOwnedField),false,mediaOwnedField);
  }
});

test('fixtures contain no gameplay RNG or Save payload fields',()=>{
  const structuralKeys=new Set(collectKeys({depth,accessibility,lookup}));

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
    'moneyCost',
    'nextDayEnergyDelta',
    'modifyResource',
    'addItem',
    'addWorldFact',
    'nightPolicy',
    'rng',
    'rngState',
    'gameplayRng',
    'activityRng',
    'save',
    'saveState',
    'journalRefs'
  ]){
    assert.equal(structuralKeys.has(forbidden),false,forbidden);
  }
});
