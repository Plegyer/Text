import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {loadCatalog} from '../src/core/content.ts';
import {SCHOOL_COURSES} from '../src/core/school.ts';
import {packSchema} from '../src/core/schema.ts';
import {definitions} from './helpers.ts';

const pack=JSON.parse(
  readFileSync(
    'content/packs/school-lesson-content-v1.json',
    'utf8'
  )
);
const typedProgress=JSON.parse(
  readFileSync(
    'content/school-typed-progress-exactly-once.fixture.json',
    'utf8'
  )
);

const trackEventIds=[
  'school-lesson-content-v1.literacy-and-numbers',
  'school-lesson-content-v1.arcana',
  'school-lesson-content-v1.rhetoric-and-social',
  'school-lesson-content-v1.etiquette-and-presentation',
  'school-lesson-content-v1.field-craft',
  'school-lesson-content-v1.physical-training',
  'school-lesson-content-v1.arts-and-performance',
  'school-lesson-content-v1.body-confidence'
];

test('repeatable lesson authored pack conforms to current pack schema',()=>{
  assert.doesNotThrow(()=>packSchema.parse(pack));
  assert.equal(pack.id,'school-lesson-content-v1');
});

test('all eight School tracks have authored repeatable lesson content',()=>{
  const ids=new Set(pack.events.map((event:any)=>event.id));
  for(const eventId of trackEventIds)assert.equal(ids.has(eventId),true,eventId);

  for(const eventId of trackEventIds){
    const event=pack.events.find((entry:any)=>entry.id===eventId);
    assert.ok(event);
    assert.equal(event.variants.length,3,eventId);
  }
});

test('authored lesson content does not modify locked course mechanics',()=>{
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

  for(const event of pack.events){
    for(const choice of event.choices)assert.deepEqual(choice.effects,[],event.id);
  }
});

test('paid typed-progress contract remains lessons_completed only and Night remains separate',()=>{
  assert.equal(typedProgress.entries.length,8);
  for(const entry of typedProgress.entries){
    assert.deepEqual(entry.paidLessonDelta,{
      lessons_completed:1,
      night_study_sessions:0
    },entry.courseId);
    assert.deepEqual(entry.nightStudyDelta,{
      lessons_completed:0,
      night_study_sessions:1
    },entry.courseId);
  }
});

test('authored lesson pack contains no ordinary Lust gain',()=>{
  const serialized=JSON.stringify(pack).toLowerCase();
  assert.equal(serialized.includes('"lust"'),false);
});

test('authored presentation fallback references resolve inside the pack catalog',()=>{
  const cat=loadCatalog(definitions,[pack]);
  const mediaIds=new Set(cat.media.map(media=>media.id));

  for(const event of pack.events){
    for(const variant of event.variants){
      for(const mediaId of variant.media){
        assert.equal(mediaIds.has(mediaId),true,event.id+':'+mediaId);
      }
    }
  }
});

test('current event primitives expose only a generic safe post-School hook; course-specific authored events stay untriggered',()=>{
  const generic=pack.events.find(
    (event:any)=>event.id==='school-lesson-content-v1.after-school'
  );
  assert.ok(generic);
  assert.deepEqual(generic.reactionTriggers,[
    {kind:'actionCompleted',action:'school'}
  ]);

  for(const eventId of trackEventIds){
    const event=pack.events.find((entry:any)=>entry.id===eventId);
    assert.deepEqual(event.reactionTriggers,[],eventId);
  }
});
