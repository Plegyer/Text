import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {loadCatalog} from '../src/core/content.ts';
import {freshSave,parseSave} from '../src/core/engine.ts';
import {packSchema} from '../src/core/schema.ts';
import {definitions} from './helpers.ts';

const raw=JSON.parse(
  readFileSync(
    'content/packs/school-teachers-v1.json',
    'utf8'
  )
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

test('teacher production pack conforms to the current strict pack schema',()=>{
  assert.doesNotThrow(()=>packSchema.parse(raw));
  assert.equal(raw.id,'school-teachers-v1');
  assert.equal(raw.events.length,8);
});

test('teacher production pack represents all eight locked course identities without inventing a teacher metadata schema',()=>{
  const serialized=JSON.stringify(raw);
  for(const courseId of courseIds){
    assert.equal(serialized.includes(courseId),true,courseId);
  }
  assert.equal(
    raw.events.every((event:any)=>
      typeof event.sourceDomain==='string'&&
      event.sourceDomain.startsWith('school.teacher.')
    ),
    true
  );
});

test('teacher production pack is presentation-only and cannot mutate the School transaction',()=>{
  assert.deepEqual(raw.reads,[]);
  assert.deepEqual(raw.writes,[]);
  assert.equal('capabilities' in raw,false);

  for(const event of raw.events){
    assert.deepEqual(event.trigger,[],event.id);
    assert.deepEqual(event.reactionTriggers,[],event.id);
    for(const choice of event.choices){
      assert.deepEqual(choice.effects,[],event.id);
    }
  }
});

test('teacher semantic presentation surfaces are unique',()=>{
  const mediaIds=raw.media.map((entry:any)=>entry.id);
  const eventIds=raw.events.map((entry:any)=>entry.id);
  assert.equal(new Set(mediaIds).size,mediaIds.length);
  assert.equal(new Set(eventIds).size,eventIds.length);
  assert.equal(
    mediaIds.every((id:string)=>id.startsWith('school.teacher.')),
    true
  );
});

test('loading teacher authored content leaves save schema/state unchanged',()=>{
  const cat=loadCatalog(definitions,[raw]);
  const before=freshSave();
  const restored=parseSave(JSON.stringify(before),cat);

  assert.equal(restored.schemaVersion,before.schemaVersion);
  assert.deepEqual(restored.run.character.stats,before.run.character.stats);
  assert.deepEqual(restored.run.resources,before.run.resources);
  assert.deepEqual(restored.run.dayState,before.run.dayState);
  assert.deepEqual(restored.run.progression,before.run.progression);
});
