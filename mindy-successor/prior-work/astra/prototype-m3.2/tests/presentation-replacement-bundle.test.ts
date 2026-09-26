import test from 'node:test';
import assert from 'node:assert/strict';
import {existsSync,readFileSync} from 'node:fs';
import {loadCatalog} from '../src/core/content.ts';
import {
  presentationIdForEnding,
  presentationIdForEvent
} from '../src/core/presentation.ts';
import {SCHOOL_COURSES} from '../src/core/school.ts';

type Replacement={
  currentFallback:{mediaId:string;assetPath:string};
  futureGif:{logicalTargetName:string;declaredMediaId:string};
  staticFallbackMandatory:boolean;
  textFallbackAvailable:boolean;
};
type Bundle={
  format:'portal-life.presentation-replacement-bundle';
  formatVersion:1;
  presentationSchemaVersion:1;
  metadata:{bundleId:string;name:string};
  preflightPolicy:{
    duplicatePresentationId:'reject';
    unknownPresentationId:'quarantine';
    activation:'atomic';
  };
  replacements:Record<string,Replacement>;
};

const json=(path:string)=>JSON.parse(readFileSync(path,'utf8'));
const bundle=json('content/presentation-replacement-bundle.fixture.json') as Bundle;
const patchPlan=json('content/presentation-production-patch-plan.fixture.json');
const knownIds=new Set<string>(patchPlan.slots.map((slot:any)=>slot.presentationId));
const futureSlots=new Map<string,any>(
  patchPlan.slots
    .filter((slot:any)=>slot.classification==='future-GIF')
    .map((slot:any)=>[slot.presentationId,slot])
);

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

function collectKeys(value:unknown,keys=new Set<string>()):Set<string>{
  if(Array.isArray(value)){
    for(const item of value)collectKeys(item,keys);
    return keys;
  }
  if(value&&typeof value==='object'){
    for(const [key,item] of Object.entries(value as Record<string,unknown>)){
      keys.add(key.toLowerCase());
      collectKeys(item,keys);
    }
  }
  return keys;
}

type EntryTuple=[string,Replacement];

function preflight(
  input:Bundle,
  entries:EntryTuple[],
  options:{unknown:'quarantine'|'reject'}={unknown:input.preflightPolicy.unknownPresentationId}
){
  const seen=new Set<string>();
  const accepted:Record<string,Replacement>={};
  const quarantined:Record<string,Replacement>={};

  for(const [presentationId,replacement] of entries){
    if(seen.has(presentationId)){
      throw new Error(`duplicate presentationId: ${presentationId}`);
    }
    seen.add(presentationId);

    if(!knownIds.has(presentationId)){
      if(options.unknown==='reject'){
        throw new Error(`unknown presentationId: ${presentationId}`);
      }
      quarantined[presentationId]=structuredClone(replacement);
      continue;
    }

    if(!/^media\/[a-z0-9][a-z0-9/_-]*\.gif$/i.test(replacement.futureGif.logicalTargetName)){
      throw new Error(`non-portable GIF target: ${presentationId}`);
    }
    if(
      /(?:^[A-Za-z]:[\\/]|^\/|\.\.|file:|https?:)/i.test(
        replacement.futureGif.logicalTargetName
      )
    ){
      throw new Error(`absolute or external GIF target: ${presentationId}`);
    }
    accepted[presentationId]=structuredClone(replacement);
  }

  return {accepted,quarantined};
}

test('replacement bundle covers exactly every patch-plan slot that has a future GIF target',()=>{
  const bundleIds=Object.keys(bundle.replacements);
  assert.equal(bundleIds.length,7);
  assert.deepEqual(new Set(bundleIds),new Set(futureSlots.keys()));

  for(const presentationId of bundleIds){
    assert.match(presentationId,/^[a-z0-9-]+(?:\/[a-z0-9-]+)+$/);
    const replacement=bundle.replacements[presentationId]!;
    const planned=futureSlots.get(presentationId);
    assert.ok(planned,presentationId);
    assert.equal(replacement.futureGif.declaredMediaId,planned.primaryGif.mediaId);
    assert.equal(replacement.staticFallbackMandatory,true,presentationId);
    assert.equal(replacement.textFallbackAvailable,true,presentationId);
    assert.equal(existsSync(replacement.currentFallback.assetPath),true,replacement.currentFallback.assetPath);
  }
});

test('bundle paths are portable and never absolute, user-specific, or external',()=>{
  for(const replacement of Object.values(bundle.replacements)){
    assert.match(replacement.futureGif.logicalTargetName,/^media\//);
    assert.doesNotMatch(
      replacement.futureGif.logicalTargetName,
      /(?:^[A-Za-z]:[\\/]|^\/|\.\.|file:|https?:|Users\/|home\/)/i
    );
    assert.match(replacement.currentFallback.assetPath,/^assets\//);
    assert.doesNotMatch(
      replacement.currentFallback.assetPath,
      /(?:^[A-Za-z]:[\\/]|^\/|\.\.|file:|https?:|Users\/|home\/)/i
    );
  }
});

test('duplicate semantic IDs reject and unknown semantic IDs quarantine or reject in preflight',()=>{
  const entries=Object.entries(bundle.replacements) as EntryTuple[];
  const duplicate:EntryTuple=[
    entries[0]![0],
    structuredClone(entries[0]![1])
  ];
  assert.throws(
    ()=>preflight(bundle,[...entries,duplicate]),
    /duplicate presentationId/
  );

  const unknown:EntryTuple=[
    'school/unknown-track/lesson/default',
    structuredClone(entries[0]![1])
  ];
  const quarantined=preflight(bundle,[...entries,unknown]);
  assert.equal(quarantined.accepted[unknown[0]],undefined);
  assert.ok(quarantined.quarantined[unknown[0]]);

  assert.throws(
    ()=>preflight(bundle,[...entries,unknown],{unknown:'reject'}),
    /unknown presentationId/
  );
});

test('changing replacement media never changes event, course, or ending identity',()=>{
  const cat=activatedLumberCatalog();
  const beforeEvent={
    eventId:'lumber.career-first-shift',
    variantId:'default',
    presentationId:presentationIdForEvent(
      cat,
      'lumber.career-first-shift',
      'default'
    )
  };
  const beforeCourses=SCHOOL_COURSES.map(course=>({
    courseId:course.id,
    presentationId:course.presentationId
  }));
  const beforeEndings=[
    'ending.lumber.hard-work',
    'ending.lumber.forewoman',
    'ending.lumber.forest'
  ].map(endingId=>({
    endingId,
    presentationId:presentationIdForEnding(endingId)
  }));

  const changed=structuredClone(bundle);
  changed.replacements[beforeEvent.presentationId]!.futureGif.logicalTargetName=
    'media/replacement/accepted-hand-v2.gif';
  preflight(
    changed,
    Object.entries(changed.replacements) as EntryTuple[]
  );

  const afterEvent={
    eventId:'lumber.career-first-shift',
    variantId:'default',
    presentationId:presentationIdForEvent(
      cat,
      'lumber.career-first-shift',
      'default'
    )
  };
  const afterCourses=SCHOOL_COURSES.map(course=>({
    courseId:course.id,
    presentationId:course.presentationId
  }));
  const afterEndings=[
    'ending.lumber.hard-work',
    'ending.lumber.forewoman',
    'ending.lumber.forest'
  ].map(endingId=>({
    endingId,
    presentationId:presentationIdForEnding(endingId)
  }));

  assert.deepEqual(afterEvent,beforeEvent);
  assert.deepEqual(afterCourses,beforeCourses);
  assert.deepEqual(afterEndings,beforeEndings);
});

test('replacement bundle contains no gameplay mechanics, effects, RNG, Energy, or save-state fields',()=>{
  const keys=collectKeys(bundle);
  for(const forbidden of [
    'gameplayid','eventid','variantid','courseid','endingid',
    'condition','conditions','effect','effects','rng','random','energy',
    'cost','delta','reward','transition','command','metrics','inventory',
    'run','save','state','money'
  ]){
    assert.equal(keys.has(forbidden),false,forbidden);
  }
});
