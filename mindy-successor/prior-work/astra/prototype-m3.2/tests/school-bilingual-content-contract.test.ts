import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {SCHOOL_COURSES,schoolNightStudyChoices} from '../src/core/school.ts';

const teacherDoc=readFileSync(
  '../../../docs/school-prep/SCHOOL_TEACHER_IDENTITIES_RU_EN_v1.md',
  'utf8'
);
const lessonDoc=readFileSync(
  '../../../docs/school-prep/SCHOOL_REPEATABLE_LESSONS_RU_EN_v1.md',
  'utf8'
);
const generic=JSON.parse(
  readFileSync(
    'content/packs/school-target/school-generic-reachable-bilingual-v1.json',
    'utf8'
  )
);
const night=JSON.parse(
  readFileSync(
    'content/packs/school-target/school-night-exact-bilingual-v1.json',
    'utf8'
  )
);

const teacherIds=[
  'school.teacher.mara-fen',
  'school.teacher.ilyra-venn',
  'school.teacher.cassian-reed',
  'school.teacher.eliane-marrow',
  'school.teacher.rowan-pike',
  'school.teacher.tovan-kest',
  'school.teacher.nessa-lark',
  'school.teacher.sera-vey'
];

function sortedKeys(value:Record<string,unknown>){
  return Object.keys(value).sort();
}

function collectKeys(value:unknown,out:string[]=[]):string[]{
  if(Array.isArray(value)){
    for(const item of value)collectKeys(item,out);
    return out;
  }
  if(value && typeof value==='object'){
    for(const [key,child] of Object.entries(value as Record<string,unknown>)){
      out.push(key);
      collectKeys(child,out);
    }
  }
  return out;
}

test('bilingual teacher authoring has one shared identity with RU and EN for all eight teachers',()=>{
  for(const id of teacherIds){
    const marker='## `'+id+'`';
    const start=teacherDoc.indexOf(marker);
    assert.notEqual(start,-1,id);
    const next=teacherDoc.indexOf('\n## `school.teacher.',start+marker.length);
    const block=teacherDoc.slice(start,next===-1?teacherDoc.length:next);
    assert.match(block,/RU name:/,id);
    assert.match(block,/RU role:/,id);
    assert.match(block,/RU short bio:/,id);
    assert.match(block,/EN name:/,id);
    assert.match(block,/EN role:/,id);
    assert.match(block,/EN short bio:/,id);
  }
});

test('repeatable bilingual bank has 56 shared semantic lesson identities and paired RU/EN text',()=>{
  const matches=[
    ...lessonDoc.matchAll(
      /^### `(school\.lesson\.[^\n]+)`\n\n(RU:[\s\S]*?)\n\n(EN:[\s\S]*?)(?=\n\n### |\n\n## Shared semantic contract)/gm
    )
  ];
  assert.equal(matches.length,56);
  assert.equal(new Set(matches.map(match=>match[1])).size,56);
  for(const match of matches){
    assert.ok(match[2].trim().length>8,match[1]);
    assert.ok(match[3].trim().length>8,match[1]);
    assert.equal(/\.(ru|en)(\.|$)/.test(match[1]),false,match[1]);
  }
});

test('generic bilingual sidecar pairs locales onto one gameplay event identity',()=>{
  assert.equal(generic.status,'LOCALIZATION_SIDECAR_NOT_RUNTIME_PACK');
  assert.equal(generic.runtimeSchemaCompatible,false);
  assert.equal(generic.gameplayPackRef,'school.generic.reachable.v2');
  assert.equal(generic.eventId,'school.generic.reachable.v2.after.school');
  assert.equal(/\.(ru|en)(\.|$)/.test(generic.eventId),false);

  assert.deepEqual(
    sortedKeys(generic.locales.ru.variants),
    sortedKeys(generic.locales.en.variants)
  );
  assert.deepEqual(
    sortedKeys(generic.locales.ru.variants),
    [...generic.variantIds].sort()
  );
  assert.equal(generic.gameplayInvariant.duplicateGameplayEventByLocale,false);
});

test('exact Night bilingual sidecar covers the same 24 locale-neutral gameplay routes in RU and EN',()=>{
  assert.equal(night.status,'LOCALIZATION_SIDECAR_NOT_RUNTIME_PACK');
  assert.equal(night.runtimeSchemaCompatible,false);
  assert.equal(night.events.length,24);

  const expected=schoolNightStudyChoices().map(choice=>choice.id).sort();
  const actual=night.events.map((entry:any)=>entry.choiceId).sort();
  assert.deepEqual(actual,expected);

  for(const entry of night.events){
    assert.equal(/\.(ru|en)(\.|$)/.test(entry.eventId),false,entry.eventId);
    assert.equal(/\.(ru|en)(\.|$)/.test(entry.choiceId),false,entry.choiceId);
    assert.deepEqual(
      sortedKeys(entry.locales.ru.variants),
      sortedKeys(entry.locales.en.variants),
      entry.eventId
    );
    assert.deepEqual(
      sortedKeys(entry.locales.ru.variants),
      [...entry.variantIds].sort(),
      entry.eventId
    );
  }
});

test('bilingual authoring sidecars contain presentation data only, not locale-specific gameplay effects or conditions',()=>{
  for(const payload of [generic,night]){
    const keys=collectKeys(payload);
    assert.equal(keys.includes('effects'),false,payload.id);
    assert.equal(keys.includes('conditions'),false,payload.id);
    assert.equal(keys.includes('rewards'),false,payload.id);
    assert.equal(payload.gameplayInvariant.conditionsShared,true,payload.id);
    assert.equal(payload.gameplayInvariant.effectsShared,true,payload.id);
    assert.equal(payload.gameplayInvariant.routingShared,true,payload.id);
    assert.equal(payload.gameplayInvariant.saveIdentityShared,true,payload.id);
  }
});

test('localization authoring does not change locked paid-course or Night-study mechanics',()=>{
  assert.deepEqual(
    SCHOOL_COURSES.map(course=>({
      id:course.id,
      tuition:course.tuition,
      energyCost:course.energyCost,
      statEffects:course.statEffects
    })),
    [
      {id:'school.course.literacy_and_numbers',tuition:300,energyCost:1,statEffects:[{stat:'reason',amount:4},{stat:'wits',amount:2}]},
      {id:'school.course.arcana',tuition:500,energyCost:1,statEffects:[{stat:'magic',amount:4},{stat:'reason',amount:4},{stat:'creativity',amount:2}]},
      {id:'school.course.rhetoric_and_social',tuition:300,energyCost:1,statEffects:[{stat:'charm',amount:3},{stat:'sociability',amount:3},{stat:'wits',amount:2}]},
      {id:'school.course.etiquette_and_presentation',tuition:400,energyCost:1,statEffects:[{stat:'manners',amount:3},{stat:'grooming',amount:3},{stat:'charm',amount:2}]},
      {id:'school.course.field_craft',tuition:400,energyCost:1,statEffects:[{stat:'dexterity',amount:3},{stat:'wits',amount:3},{stat:'creativity',amount:2}]},
      {id:'school.course.physical_training',tuition:400,energyCost:1,statEffects:[{stat:'strength',amount:3},{stat:'endurance',amount:3},{stat:'dexterity',amount:2}]},
      {id:'school.course.arts_and_performance',tuition:500,energyCost:1,statEffects:[{stat:'creativity',amount:3},{stat:'charm',amount:3},{stat:'sociability',amount:2},{stat:'dexterity',amount:2}]},
      {id:'school.course.body_confidence',tuition:400,energyCost:1,statEffects:[{stat:'sexuality',amount:3},{stat:'grooming',amount:3},{stat:'endurance',amount:2}]}
    ]
  );

  assert.deepEqual(night.mechanicsInvariant,{
    tuition:0,
    currentDayEnergyCost:0,
    selectedSupportedStatDelta:2,
    nextDayEnergyDelta:-1,
    typedProgress:{lessons_completed:0,night_study_sessions:1},
    localeSpecificMechanics:false
  });
});

// Runtime locale selection is intentionally not asserted here:
// the current shared pack schema has no locale map. These checks are
// authoring/sidecar contracts until Lead integrates a shared localization layer.
