import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {freshSave,parseSave} from '../src/core/engine.ts';
import {packSchema} from '../src/core/schema.ts';
import {catalog} from './helpers.ts';

const production=JSON.parse(
  readFileSync('content/packs/school-teachers-v1.json','utf8')
);
const library=JSON.parse(
  readFileSync('content/packs/school-target/school-teachers-v1.json','utf8')
);

const courseIds=[
  'school.course.literacy_and_numbers',
  'school.course.arcana',
  'school.course.rhetoric_and_social',
  'school.course.etiquette_and_presentation',
  'school.course.field_craft',
  'school.course.physical_training',
  'school.course.arts_and_performance',
  'school.course.body_confidence'
];

test('teacher production media pack and full staging library conform to pack schema',()=>{
  assert.doesNotThrow(()=>packSchema.parse(production));
  assert.doesNotThrow(()=>packSchema.parse(library));
  assert.equal(production.id,'school-teachers-v1');
  assert.equal(production.events.length,0);
  assert.equal(library.events.length,8);
});

test('full staging teacher library represents all eight locked course identities',()=>{
  const serialized=JSON.stringify(library);
  for(const courseId of courseIds)assert.equal(serialized.includes(courseId),true,courseId);
  assert.equal(
    library.events.every((event:any)=>
      typeof event.sourceDomain==='string'&&event.sourceDomain.startsWith('school.teacher.')
    ),
    true
  );
});

test('course-specific teacher scenes remain staging-only until exact course routing exists',()=>{
  for(const event of library.events){
    assert.deepEqual(event.trigger,[],event.id);
    assert.deepEqual(event.reactionTriggers,[],event.id);
    for(const choice of event.choices)assert.deepEqual(choice.effects,[],event.id);
  }
  assert.deepEqual(production.reads,[]);
  assert.deepEqual(production.writes,[]);
  assert.equal('capabilities' in production,false);
});

test('production teacher media identities are unique and presentation-only',()=>{
  const mediaIds=production.media.map((entry:any)=>entry.id);
  assert.equal(mediaIds.length,8);
  assert.equal(new Set(mediaIds).size,mediaIds.length);
  assert.equal(mediaIds.every((id:string)=>id.startsWith('school.teacher.')),true);
});

test('loading production teacher media pack leaves save schema/state unchanged',()=>{
  const before=freshSave();
  const restored=parseSave(JSON.stringify(before),catalog);

  assert.equal(restored.schemaVersion,before.schemaVersion);
  assert.deepEqual(restored.run.character.stats,before.run.character.stats);
  assert.deepEqual(restored.run.resources,before.run.resources);
  assert.deepEqual(restored.run.dayState,before.run.dayState);
  assert.deepEqual(restored.run.progression,before.run.progression);
});
