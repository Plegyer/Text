import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {loadCatalog} from '../src/core/content.ts';
import {presentationIdForEnding,presentationIdForEvent} from '../src/core/presentation.ts';
import {SCHOOL_COURSES} from '../src/core/school.ts';

function json(path:string){return JSON.parse(readFileSync(path,'utf8'));}

function lumberCatalog(){
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

test('merged Lumber events emit canonical semantic presentation IDs from sourceDomain metadata',()=>{
  const cat=lumberCatalog();

  assert.equal(
    presentationIdForEvent(cat,'lumber.career-first-shift','default'),
    'job/lumber/event/lumber-career-first-shift/default'
  );
  assert.equal(
    presentationIdForEvent(cat,'lumber.foreman-notice','default'),
    'relationship/lumber-foreman/lumber-foreman-notice/default'
  );
  assert.equal(
    presentationIdForEvent(cat,'lumber-cross.school-management-return','default'),
    'job/lumber/event/lumber-cross-school-management-return/default'
  );
  assert.equal(
    presentationIdForEvent(cat,'lumber-cross.activity-forest-return','default'),
    'job/lumber/event/lumber-cross-activity-forest-return/default'
  );
  assert.equal(
    presentationIdForEvent(cat,'lumber-night.foreman-professional','default'),
    'relationship/lumber-foreman/lumber-night-foreman-professional/default'
  );
  assert.equal(presentationIdForEnding('ending.lumber.hard-work'),'ending/lumber/hard-work');
  assert.equal(presentationIdForEnding('ending.lumber.forewoman'),'ending/lumber/forewoman');
});

test('Lumber Product Acceptance manifest uses the same slash presentation namespace as runtime',()=>{
  const manifest=json('content/lumber-product-acceptance.fixture-manifest.json');
  assert.deepEqual(manifest.mappings.work.presentationIds,[
    'job/lumber/shift/spring/default',
    'job/lumber/shift/summer/default',
    'job/lumber/shift/autumn/default',
    'job/lumber/shift/winter/default'
  ]);
  assert.equal(manifest.mappings.work.resultPresentationId,'job/lumber/result/default');
  assert.equal(manifest.mappings.milestone.presentationId,'job/lumber/event/lumber-career-first-shift/default');
  assert.equal(manifest.mappings.foremanRelationship.presentationId,'relationship/lumber-foreman/lumber-foreman-notice/default');
  assert.equal(manifest.mappings.forestActivity.returnPresentationId,'job/lumber/event/lumber-cross-activity-forest-return/default');
  assert.equal(manifest.mappings.nightHook.presentationId,'relationship/lumber-foreman/lumber-night-foreman-professional/default');
  assert.equal(manifest.mappings.hardWorkEnding.presentationId,'ending/lumber/hard-work');
  assert.equal(manifest.mappings.hardWorkEnding.metaRewardId,'hardWork:lumber');
});

test('School presentation IDs follow the canonical kebab-case presentation namespace without changing course IDs',()=>{
  assert.equal(SCHOOL_COURSES.length,8);
  for(const course of SCHOOL_COURSES){
    assert.match(course.presentationId,/^school\/[a-z0-9-]+\/lesson\/default$/);
    assert.equal(course.presentationId.includes('_'),false,course.id);
  }
  const fieldCraft=SCHOOL_COURSES.find(c=>c.id==='school.course.field_craft');
  assert.equal(fieldCraft?.presentationId,'school/field-craft/lesson/default');
});

test('target presentation registry covers representative merged product semantic IDs',()=>{
  const registry=json('content/presentation-target-registry.fixture.json');
  const ids=new Set(registry.entries.map((entry:{presentationId:string})=>entry.presentationId));
  for(const id of [
    'location/town/default',
    'job/lumber/shift/spring/default',
    'job/lumber/result/default',
    'school/field-craft/lesson/default',
    'ending/lumber/hard-work'
  ])assert.ok(ids.has(id),id);
});
