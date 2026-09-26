import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,readdirSync} from 'node:fs';
import {loadCatalog} from '../src/core/content.ts';
import {
  presentationSlots,
  presentationIdForEvent,
  presentationIdForEnding
} from '../src/core/presentation.ts';
import {SCHOOL_COURSES} from '../src/core/school.ts';

type Closure='already-generated-current'|'generated-after-production-activation'|'intentionally-fallback-backed';
type Slot={
  presentationId:string;
  family:string;
  closure:Closure;
  fallbackId?:string;
};
type Manifest={
  version:1;
  kind:'presentation-shipped-slot-closure-manifest';
  status:'activation-closure-contract';
  policy:{
    requiredAfterActivation:true;
    semanticIdsUseSlashTaxonomy:true;
    schoolSegmentsUseKebabCase:true;
    mechanicsDataAllowed:false;
  };
  slots:Slot[];
};

const json=(path:string)=>JSON.parse(readFileSync(path,'utf8'));
const manifest=json('content/presentation-shipped-slot-closure.fixture.json') as Manifest;

const currentDefinitions=json('content/definitions.json');
const currentPacks=readdirSync('content/packs')
  .filter(name=>name.endsWith('.json'))
  .sort()
  .map(name=>json('content/packs/'+name));
const currentCatalog=loadCatalog(currentDefinitions,currentPacks);
const currentSlotIds=new Set(presentationSlots(currentCatalog).map(slot=>slot.id));

function activatedLumberCatalog(){
  const definitions=json('content/lumber-target-definitions.fixture.json');
  definitions.nightChoices=[
    ...(definitions.nightChoices??[]),
    {
      id:'lumber.foreman.night',
      label:'Foreman professional night',
      conditions:[],
      effects:[],
      nextDayEffects:[],
      nextDayEnergyDelta:0
    }
  ];
  return loadCatalog(definitions,[
    json('content/packs/lumber-target/lumber-production.pack.json'),
    json('content/packs/lumber-target/lumber-cross-system.pack.json'),
    json('content/packs/lumber-target/lumber-night-acceptance.pack.json')
  ]);
}
const lumberCatalog=activatedLumberCatalog();
const lumberActivatedSlotIds=new Set(presentationSlots(lumberCatalog).map(slot=>slot.id));

const registry=json('content/presentation-target-registry.fixture.json');
const registryById=new Map<string,any>(registry.entries.map((entry:any)=>[entry.presentationId,entry]));

function collectKeys(value:unknown,keys=new Set<string>()):Set<string>{
  if(Array.isArray(value)){for(const item of value)collectKeys(item,keys);return keys;}
  if(value&&typeof value==='object'){
    for(const [key,item] of Object.entries(value as Record<string,unknown>)){
      keys.add(key.toLowerCase());
      collectKeys(item,keys);
    }
  }
  return keys;
}

test('closure manifest is the exact required Lumber + School activation semantic surface',()=>{
  const expected=[
    'job/lumber/shift/spring/default',
    'job/lumber/shift/summer/default',
    'job/lumber/shift/autumn/default',
    'job/lumber/shift/winter/default',
    'job/lumber/result/default',
    'job/lumber/event/lumber-career-first-shift/default',
    'relationship/lumber-foreman/lumber-foreman-notice/default',
    'relationship/lumber-foreman/lumber-night-foreman-professional/default',
    'activity/forest/route/default',
    'activity/forest/return/success',
    ...SCHOOL_COURSES.map(course=>course.presentationId),
    'ending/lumber/hard-work',
    'ending/lumber/forewoman',
    'ending/lumber/forest'
  ];

  assert.equal(manifest.slots.length,21);
  assert.equal(new Set(manifest.slots.map(slot=>slot.presentationId)).size,21);
  assert.deepEqual(
    new Set(manifest.slots.map(slot=>slot.presentationId)),
    new Set(expected)
  );
});

test('already-generated-current rows are exact slots emitted by the current resolver/catalog',()=>{
  const current=manifest.slots.filter(slot=>slot.closure==='already-generated-current');
  assert.deepEqual(
    current.map(slot=>slot.presentationId),
    [
      'job/lumber/shift/spring/default',
      'job/lumber/shift/summer/default',
      'job/lumber/shift/autumn/default',
      'job/lumber/shift/winter/default',
      'job/lumber/result/default',
      'activity/forest/route/default'
    ]
  );
  for(const slot of current)assert.ok(currentSlotIds.has(slot.presentationId),slot.presentationId);
});

test('Lumber event and ending rows become exact slots when target production definitions/packs are activated',()=>{
  const expected=[
    presentationIdForEvent(lumberCatalog,'lumber.career-first-shift','default'),
    presentationIdForEvent(lumberCatalog,'lumber.foreman-notice','default'),
    presentationIdForEvent(lumberCatalog,'lumber-night.foreman-professional','default'),
    presentationIdForEnding('ending.lumber.hard-work'),
    presentationIdForEnding('ending.lumber.forewoman'),
    presentationIdForEnding('ending.lumber.forest')
  ];
  assert.deepEqual(expected,[
    'job/lumber/event/lumber-career-first-shift/default',
    'relationship/lumber-foreman/lumber-foreman-notice/default',
    'relationship/lumber-foreman/lumber-night-foreman-professional/default',
    'ending/lumber/hard-work',
    'ending/lumber/forewoman',
    'ending/lumber/forest'
  ]);

  for(const id of expected){
    const row=manifest.slots.find(slot=>slot.presentationId===id);
    assert.equal(row?.closure,'generated-after-production-activation',id);
    assert.equal(currentSlotIds.has(id),false,id);
    assert.ok(lumberActivatedSlotIds.has(id),id);
  }
});

test('all eight School semantic lesson slots are production-activation rows and preserve kebab-case namespace',()=>{
  assert.equal(SCHOOL_COURSES.length,8);
  for(const course of SCHOOL_COURSES){
    const row=manifest.slots.find(slot=>slot.presentationId===course.presentationId);
    assert.ok(row,course.id);
    assert.equal(row.closure,'generated-after-production-activation',course.id);
    assert.equal(currentSlotIds.has(course.presentationId),false,course.id);
    assert.match(course.presentationId,/^school\/[a-z0-9]+(?:-[a-z0-9]+)*\/lesson\/default$/);
    assert.equal(course.presentationId.includes('_'),false,course.id);
  }
});

test('Forest return result is intentionally fallback-backed to the current Forest route slot',()=>{
  const row=manifest.slots.find(slot=>slot.presentationId==='activity/forest/return/success');
  assert.ok(row);
  assert.equal(row.closure,'intentionally-fallback-backed');
  assert.equal(row.fallbackId,'activity/forest/route/default');
  assert.ok(currentSlotIds.has('activity/forest/route/default'));

  const registryEntry=registryById.get(row.presentationId);
  assert.ok(registryEntry,row.presentationId);
  assert.equal(registryEntry.fallbackId,row.fallbackId);
});

test('closure IDs use semantic slash taxonomy and never encode asset filenames',()=>{
  for(const slot of manifest.slots){
    assert.match(slot.presentationId,/^[a-z0-9-]+(?:\/[a-z0-9-]+)+$/);
    assert.equal(slot.presentationId.includes('.gif'),false,slot.presentationId);
    assert.equal(slot.presentationId.includes('.png'),false,slot.presentationId);
    assert.equal(slot.presentationId.includes('.webp'),false,slot.presentationId);
    assert.equal(slot.presentationId.includes('.svg'),false,slot.presentationId);
    assert.equal(slot.presentationId.startsWith('assets/'),false,slot.presentationId);
  }
});

test('closure manifest stores no mechanics, effects, RNG or Energy payload',()=>{
  assert.equal(manifest.policy.mechanicsDataAllowed,false);
  const keys=collectKeys(manifest.slots);
  for(const forbidden of [
    'condition','conditions','effect','effects','rng','random','energy','cost',
    'delta','reward','transition','command','metrics','inventory','state','save'
  ])assert.equal(keys.has(forbidden),false,forbidden);
});
