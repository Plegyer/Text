import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {SCHOOL_COURSES} from '../src/core/school.ts';

type Coverage='present'|'missing';
type Entry={
  area:string;
  gameplayId:string;
  presentationId:string;
  registryCoverage:Coverage;
};
type Manifest={
  version:1;
  kind:'presentation-product-coverage';
  status:'product-coverage-audit';
  registrySource:string;
  policy:{
    missingRegistryEntry:'report-missing-presentation-only-non-fatal';
    gameplayIds:'preserve-exactly';
    mechanicsDataAllowed:false;
  };
  entries:Entry[];
};

const manifest=JSON.parse(readFileSync('content/presentation-product-coverage.fixture.json','utf8')) as Manifest;
const registry=JSON.parse(readFileSync('content/presentation-target-registry.fixture.json','utf8')) as {
  entries:{presentationId:string}[];
};
const lumberPa=JSON.parse(readFileSync('content/lumber-product-acceptance.fixture-manifest.json','utf8'));
const lumberDefs=JSON.parse(readFileSync('content/lumber-target-definitions.fixture.json','utf8'));
const registryIds=new Set(registry.entries.map(entry=>entry.presentationId));

const expectedIds=[
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
  'ending/lumber/forewoman'
];

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

test('product coverage manifest contains the exact requested semantic presentation surface',()=>{
  assert.equal(manifest.entries.length,20);
  assert.deepEqual(
    new Set(manifest.entries.map(entry=>entry.presentationId)),
    new Set(expectedIds)
  );
  assert.equal(new Set(manifest.entries.map(entry=>entry.presentationId)).size,manifest.entries.length);
});

test('all presentation IDs use slash taxonomy and School path segments are kebab-case',()=>{
  for(const entry of manifest.entries){
    assert.match(entry.presentationId,/^[a-z0-9-]+(?:\/[a-z0-9-]+)+$/);
    assert.equal(entry.presentationId.includes('.'),false,entry.presentationId);
    assert.equal(entry.presentationId.includes('_'),false,entry.presentationId);
  }
  const school=manifest.entries.filter(entry=>entry.area==='school-lesson');
  assert.equal(school.length,8);
  for(const entry of school){
    assert.match(entry.presentationId,/^school\/[a-z0-9]+(?:-[a-z0-9]+)*\/lesson\/default$/);
  }
});

test('School gameplay IDs are preserved exactly while presentation IDs use kebab-case',()=>{
  const schoolEntries=new Map(
    manifest.entries.filter(entry=>entry.area==='school-lesson').map(entry=>[entry.gameplayId,entry])
  );
  assert.equal(SCHOOL_COURSES.length,8);
  for(const course of SCHOOL_COURSES){
    const entry=schoolEntries.get(course.id);
    assert.ok(entry,course.id);
    assert.equal(entry.gameplayId,course.id);
    assert.equal(entry.presentationId,course.presentationId);
  }
});

test('Lumber gameplay IDs are preserved exactly from merged product fixtures',()=>{
  const byPresentation=new Map(manifest.entries.map(entry=>[entry.presentationId,entry]));
  for(const id of lumberPa.mappings.work.presentationIds){
    assert.equal(byPresentation.get(id)?.gameplayId,lumberPa.mappings.work.actionId);
  }
  assert.equal(
    byPresentation.get(lumberPa.mappings.work.resultPresentationId)?.gameplayId,
    lumberPa.mappings.work.actionId
  );
  assert.equal(
    byPresentation.get(lumberPa.mappings.milestone.presentationId)?.gameplayId,
    lumberPa.mappings.milestone.eventId
  );
  assert.equal(
    byPresentation.get(lumberPa.mappings.foremanRelationship.presentationId)?.gameplayId,
    lumberPa.mappings.foremanRelationship.openingEventId
  );
  assert.equal(
    byPresentation.get(lumberPa.mappings.nightHook.presentationId)?.gameplayId,
    lumberPa.mappings.nightHook.eventId
  );
  assert.equal(
    byPresentation.get(lumberPa.mappings.hardWorkEnding.presentationId)?.gameplayId,
    lumberPa.mappings.hardWorkEnding.endingId
  );
  assert.equal(
    byPresentation.get(lumberPa.mappings.complexEnding.presentationId)?.gameplayId,
    lumberPa.mappings.complexEnding.endingId
  );

  const activity=lumberDefs.activities.find((item:{id:string})=>item.id==='lumber.forest');
  assert.ok(activity);
  assert.equal(byPresentation.get('activity/forest/route/default')?.gameplayId,activity.id);
  assert.equal(
    byPresentation.get('activity/forest/return/success')?.gameplayId,
    activity.results.find((result:{id:string})=>result.id==='lumber.forest.success')?.id
  );
});

test('registry coverage status exactly reports present versus missing IDs',()=>{
  for(const entry of manifest.entries){
    const actual:Coverage=registryIds.has(entry.presentationId)?'present':'missing';
    assert.equal(entry.registryCoverage,actual,entry.presentationId);
  }
  assert.ok(manifest.entries.some(entry=>entry.registryCoverage==='missing'));
  assert.ok(manifest.entries.some(entry=>entry.registryCoverage==='present'));
});

test('missing registry/media coverage is presentation-only and explicitly non-fatal',()=>{
  assert.equal(manifest.policy.missingRegistryEntry,'report-missing-presentation-only-non-fatal');
  for(const entry of manifest.entries.filter(entry=>entry.registryCoverage==='missing')){
    assert.ok(entry.presentationId);
    assert.ok(entry.gameplayId);
  }
});

test('coverage manifest stores no mechanics, RNG, Energy or effect payload',()=>{
  assert.equal(manifest.policy.mechanicsDataAllowed,false);
  const keys=collectKeys(manifest.entries);
  for(const forbidden of [
    'condition','conditions','effect','effects','rng','random','energy','cost',
    'delta','reward','transition','command','metrics','inventory','state','save'
  ])assert.equal(keys.has(forbidden),false,forbidden);
});
