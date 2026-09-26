import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,readdirSync} from 'node:fs';
import {loadCatalog} from '../src/core/content.ts';
import {
  presentationSlots,
  presentationIdForEvent,
  presentationIdForEnding
} from '../src/core/presentation.ts';
import {freshSave,dispatch} from '../src/core/engine.ts';
import {SCHOOL_COURSES} from '../src/core/school.ts';
import type {Catalog} from '../src/core/schema.ts';

type MediaCandidate={
  kind:'image'|'gif'|'video';
  src:string;
  alt:string;
  slotId:string;
  mediaId?:string;
};
type IsolatedSlot={
  id:string;
  media:MediaCandidate[];
  fallbackId?:string;
};
type ClosureSlot={
  presentationId:string;
  family:string;
  closure:'already-generated-current'|'generated-after-production-activation'|'intentionally-fallback-backed';
  fallbackId?:string;
};
type ClosureManifest={slots:ClosureSlot[]};

const json=(path:string)=>JSON.parse(readFileSync(path,'utf8'));

function currentCatalog(){
  const definitions=json('content/definitions.json');
  const packs=readdirSync('content/packs')
    .filter(name=>name.endsWith('.json'))
    .sort()
    .map(name=>json('content/packs/'+name));
  return loadCatalog(definitions,packs);
}

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

function mediaForSlot(cat:Catalog,slot:{id:string;baseMediaIds:string[]}):MediaCandidate[]{
  return slot.baseMediaIds.map(mediaId=>{
    const media=cat.media.find(item=>item.id===mediaId);
    assert.ok(media,`missing media ${mediaId} for slot ${slot.id}`);
    return {
      kind:media.kind,
      src:media.src,
      alt:media.alt,
      slotId:slot.id,
      mediaId
    };
  });
}

function buildActivationSlotCatalog(){
  const closure=json('content/presentation-shipped-slot-closure.fixture.json') as ClosureManifest;
  const current=currentCatalog();
  const lumber=activatedLumberCatalog();
  const currentSlots=new Map(presentationSlots(current).map(slot=>[slot.id,slot]));
  const lumberSlots=new Map(presentationSlots(lumber).map(slot=>[slot.id,slot]));
  const registry=json('content/presentation-target-registry.fixture.json');
  const registryById=new Map<string,any>(
    registry.entries.map((entry:any)=>[entry.presentationId,entry])
  );

  const slots=new Map<string,IsolatedSlot>();
  const town=currentSlots.get('location/town/default');
  assert.ok(town,'current catalog must provide location/town/default');
  slots.set(town.id,{
    id:town.id,
    media:mediaForSlot(current,town)
  });

  for(const row of closure.slots){
    if(row.closure==='already-generated-current'){
      const slot=currentSlots.get(row.presentationId);
      assert.ok(slot,`current slot missing: ${row.presentationId}`);
      slots.set(row.presentationId,{
        id:slot.id,
        media:mediaForSlot(current,slot),
        fallbackId:slot.fallbackId
      });
      continue;
    }

    if(row.closure==='intentionally-fallback-backed'){
      const registryEntry=registryById.get(row.presentationId);
      assert.ok(registryEntry,`registry slot missing: ${row.presentationId}`);
      slots.set(row.presentationId,{
        id:row.presentationId,
        media:[],
        fallbackId:row.fallbackId??registryEntry.fallbackId??undefined
      });
      continue;
    }

    if(row.family==='school-lesson'){
      const course=SCHOOL_COURSES.find(item=>item.presentationId===row.presentationId);
      assert.ok(course,`School activation slot lacks course owner: ${row.presentationId}`);
      slots.set(row.presentationId,{
        id:row.presentationId,
        media:[],
        fallbackId:'location/town/default'
      });
      continue;
    }

    const slot=lumberSlots.get(row.presentationId);
    assert.ok(slot,`activated Lumber slot missing: ${row.presentationId}`);
    slots.set(row.presentationId,{
      id:slot.id,
      media:mediaForSlot(lumber,slot),
      fallbackId:slot.fallbackId
    });
  }

  return {slots,closure,current,lumber};
}

function resolveIsolated(
  slots:Map<string,IsolatedSlot>,
  presentationId:string,
  animationsEnabled=true
){
  const requestedId=presentationId;
  let current=slots.get(presentationId)??slots.get('location/town/default');
  const diagnostics:string[]=[];
  if(!slots.has(presentationId))diagnostics.push(`unknown presentationId ${presentationId}`);

  const candidates:MediaCandidate[]=[];
  const seen=new Set<string>();
  while(current&&!seen.has(current.id)){
    seen.add(current.id);
    for(const media of current.media){
      if(!animationsEnabled&&media.kind==='gif')continue;
      candidates.push({...media});
    }
    current=current.fallbackId?slots.get(current.fallbackId):undefined;
  }

  const unique:MediaCandidate[]=[];
  const keys=new Set<string>();
  for(const candidate of candidates){
    const key=`${candidate.kind}|${candidate.src}`;
    if(keys.has(key))continue;
    keys.add(key);
    unique.push(candidate);
  }

  return {
    requestedId,
    candidates:unique,
    textOnly:unique.length===0,
    diagnostics
  };
}

function reloadPending<T>(pending:T):T{
  return JSON.parse(JSON.stringify(pending)) as T;
}

test('every required activation semantic slot resolves deterministically in isolated target catalogs',()=>{
  const {slots,closure}=buildActivationSlotCatalog();

  for(const row of closure.slots){
    assert.ok(slots.has(row.presentationId),row.presentationId);
    const first=resolveIsolated(slots,row.presentationId,true);
    const second=resolveIsolated(slots,row.presentationId,true);

    assert.deepEqual(second,first,row.presentationId);
    assert.equal(first.requestedId,row.presentationId);
    assert.equal(first.diagnostics.length,0,row.presentationId);
    assert.ok(first.candidates.length>0||first.textOnly,row.presentationId);
  }
});

test('pending event reload preserves the exact semantic requested slot plus event/variant identity',()=>{
  const {slots,lumber}=buildActivationSlotCatalog();
  const eventId='lumber.career-first-shift';
  const variantId='default';
  const presentationId=presentationIdForEvent(lumber,eventId,variantId);

  assert.equal(presentationId,'job/lumber/event/lumber-career-first-shift/default');
  assert.ok(lumber.events.find(event=>event.id===eventId)?.variants.some(variant=>variant.id===variantId));

  const pending={
    eventId,
    variantId,
    presentationId,
    allowedChoiceIds:['continue']
  };
  const reloaded=reloadPending(pending);
  const resolved=resolveIsolated(slots,reloaded.presentationId,true);

  assert.deepEqual(reloaded,pending);
  assert.equal(reloaded.eventId,eventId);
  assert.equal(reloaded.variantId,variantId);
  assert.equal(reloaded.presentationId,presentationId);
  assert.equal(resolved.requestedId,presentationId);
});

test('missing primary event media falls back without changing gameplay/event identity',()=>{
  const {slots,lumber}=buildActivationSlotCatalog();
  const eventId='lumber.career-first-shift';
  const variantId='default';
  const presentationId=presentationIdForEvent(lumber,eventId,variantId);
  const pending={eventId,variantId,presentationId};

  const isolated=new Map(
    [...slots.entries()].map(([id,slot])=>[id,{
      ...slot,
      media:slot.media.map(media=>({...media}))
    }])
  );
  const target=isolated.get(presentationId);
  assert.ok(target);
  target.media=[];
  target.fallbackId='location/town/default';

  const reloaded=reloadPending(pending);
  const resolved=resolveIsolated(isolated,reloaded.presentationId,true);

  assert.equal(resolved.requestedId,presentationId);
  assert.ok(resolved.candidates.length>0);
  assert.equal(resolved.candidates[0]?.slotId,'location/town/default');
  assert.equal(reloaded.eventId,eventId);
  assert.equal(reloaded.variantId,variantId);
  assert.equal(reloaded.presentationId,presentationId);
});

test('animation-disabled mode changes media candidate selection only',()=>{
  const {slots,lumber}=buildActivationSlotCatalog();
  const presentationId=presentationIdForEvent(
    lumber,
    'lumber.career-first-shift',
    'default'
  );

  const animated=resolveIsolated(slots,presentationId,true);
  const staticOnly=resolveIsolated(slots,presentationId,false);

  assert.equal(animated.requestedId,presentationId);
  assert.equal(staticOnly.requestedId,presentationId);
  assert.ok(animated.candidates.some(candidate=>candidate.kind==='gif'));
  assert.equal(staticOnly.candidates.some(candidate=>candidate.kind==='gif'),false);
  assert.ok(staticOnly.candidates.some(candidate=>candidate.kind==='image'));
  assert.notDeepEqual(
    animated.candidates.map(candidate=>candidate.kind),
    staticOnly.candidates.map(candidate=>candidate.kind)
  );
});

test('ending semantic presentation IDs remain stable through commit and completion',()=>{
  const definitions=json('content/lumber-target-definitions.fixture.json');
  const endingCatalog=activatedLumberCatalog();
  const endingIds=[
    'ending.lumber.hard-work',
    'ending.lumber.forewoman',
    'ending.lumber.forest'
  ];

  for(const endingId of endingIds){
    let save=freshSave();
    save.run.character.creation.complete=true;
    save.run.character.creation.remaining=0;
    save.run.endings.eligible=[endingId];

    const before=presentationIdForEnding(endingId);
    const committed=dispatch(save,{type:'commitEnding',id:endingId},endingCatalog);
    const afterCommit=presentationIdForEnding(committed.run.endings.committed!);
    assert.equal(afterCommit,before,endingId);
    assert.equal(committed.run.endings.committed,endingId);

    const completed=dispatch(committed,{type:'completeEnding'},endingCatalog);
    assert.equal(completed.run.status,'ended',endingId);
    assert.equal(completed.run.endings.result?.endingId,endingId);
    const afterCompletion=presentationIdForEnding(completed.run.endings.result!.endingId);
    assert.equal(afterCompletion,before,endingId);
  }
});
