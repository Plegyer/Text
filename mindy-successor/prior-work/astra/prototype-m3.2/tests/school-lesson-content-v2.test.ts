import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {loadCatalog} from '../src/core/content.ts';
import {freshSave,parseSave,resolveReactions} from '../src/core/engine.ts';
import {packSchema} from '../src/core/schema.ts';
import {definitions} from './helpers.ts';

const pack=JSON.parse(
  readFileSync(
    'content/packs/school-target/school-lesson-content-v2.json',
    'utf8'
  )
);

const trackIds=[
  'school.track.literacy_and_numbers',
  'school.track.arcana',
  'school.track.rhetoric_and_social',
  'school.track.etiquette_and_presentation',
  'school.track.field_craft',
  'school.track.physical_training',
  'school.track.arts_and_performance',
  'school.track.body_confidence'
];

test('School lesson content v2 conforms to current strict pack schema',()=>{
  assert.doesNotThrow(()=>packSchema.parse(pack));
  assert.equal(pack.id,'school-lesson-content-v2');
});

test('all eight School tracks are represented',()=>{
  const domains=new Set(
    pack.events
      .map((event:any)=>event.sourceDomain)
      .filter((id:string)=>id.startsWith('school.track.'))
  );
  assert.deepEqual([...domains].sort(),[...trackIds].sort());

  for(const trackId of trackIds){
    const event=pack.events.find((entry:any)=>entry.sourceDomain===trackId);
    assert.ok(event,trackId);
    assert.equal(event.variants.length,4,trackId);
  }
});

test('v2 authored content has no transaction or progression mutations',()=>{
  assert.deepEqual(pack.reads,[]);
  assert.deepEqual(pack.writes,[]);
  assert.equal('capabilities' in pack,false);

  for(const event of pack.events){
    for(const choice of event.choices){
      assert.deepEqual(choice.effects,[],event.id);
    }
  }

  const serialized=JSON.stringify(pack).toLowerCase();
  assert.equal(serialized.includes('"modifyresource"'),false);
  assert.equal(serialized.includes('"modifyenergy"'),false);
  assert.equal(serialized.includes('"modifystat"'),false);
  assert.equal(serialized.includes('"lust"'),false);
  assert.equal(serialized.includes('"lessons_completed"'),false);
  assert.equal(serialized.includes('"night_study_sessions"'),false);
});

test('v2 content adds no teacher prerequisite',()=>{
  for(const event of pack.events){
    assert.deepEqual(event.conditions,[],event.id);
    for(const variant of event.variants){
      assert.deepEqual(variant.conditions,[],event.id+':'+variant.id);
    }
    for(const choice of event.choices){
      assert.deepEqual(choice.conditions,[],event.id+':'+choice.id);
    }
  }
});

test('v2 semantic presentation identities are unique and resolve',()=>{
  const mediaIds=pack.media.map((entry:any)=>entry.id);
  const eventIds=pack.events.map((entry:any)=>entry.id);

  assert.equal(new Set(mediaIds).size,mediaIds.length);
  assert.equal(new Set(eventIds).size,eventIds.length);

  const cat=loadCatalog(definitions,[pack]);
  const available=new Set(cat.media.map(media=>media.id));
  for(const event of pack.events){
    for(const variant of event.variants){
      for(const mediaId of variant.media){
        assert.equal(available.has(mediaId),true,event.id+':'+mediaId);
      }
    }
  }
});

test('generic post-School v2 presentation materializes deterministically across reload',()=>{
  const cat=loadCatalog(definitions,[pack]);
  const start=freshSave();
  start.run.character.creation.remaining=0;
  start.run.character.creation.allocated={};
  start.run.character.creation.complete=true;

  const offered=resolveReactions(
    start,
    [{kind:'actionCompleted',action:'school'}],
    cat
  ).state;

  const queued=offered.run.flow.reaction.queued.find(
    q=>q.eventId==='school.lesson-v2.after-school-peer'
  );
  assert.ok(queued);

  const first=parseSave(JSON.stringify(offered),cat);
  const second=parseSave(JSON.stringify(first),cat);
  const firstQueued=first.run.flow.reaction.queued.find(
    q=>q.instanceId===queued.instanceId
  );
  const secondQueued=second.run.flow.reaction.queued.find(
    q=>q.instanceId===queued.instanceId
  );

  assert.equal(firstQueued?.variantId,queued.variantId);
  assert.equal(secondQueued?.variantId,queued.variantId);
  assert.deepEqual(second.run.resources,start.run.resources);
  assert.deepEqual(second.run.character.stats,start.run.character.stats);
  assert.deepEqual(second.run.progression,start.run.progression);
});
