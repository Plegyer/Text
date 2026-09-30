import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const load=(path:string)=>JSON.parse(readFileSync(path,'utf8'));
const localization=load('content/localization.json').strings as Record<string,{ru:string;en:string}>;
const presentation=load('content/presentation.json');
const manifest=load('content/chat3-ownership-collision-v2.fixture.json');

const v6=manifest.v6FixturePaths.map((path:string)=>load(path));
const v5=manifest.mergedV5FixturePaths.map((path:string)=>load(path));

const keys=(fixtures:any[])=>fixtures.flatMap(fixture=>Object.keys(fixture.strings??{}));
const v6Keys=keys(v6);
const v5Keys=new Set<string>(keys(v5));

test('C3-59 v6 keys remain unique while only the approved Chat 1 consumer subset enters root localization',()=>{
  assert.equal(new Set(v6Keys).size,v6Keys.length);
  assert.equal(v6Keys.length,manifest.evidence.v6CandidateStringCount);

  const integrated=new Set<string>();
  for(const fixture of v6){
    if(['forest.logging-road-depth.v2','forest.old-boundary-depth.v2'].includes(fixture.id)){
      for(const key of Object.keys(fixture.strings??{}))integrated.add(key);
    }
    if(['forest.success-aftermath-depth.v2','forest.escape-failure-aftermath-depth.v2'].includes(fixture.id)){
      for(const variant of fixture.variants??[])if(variant.surface==='result_event')integrated.add(variant.localizationKey);
    }
    if(['ordinary-poverty.housing-depth.v2','ordinary-poverty.contact-recovery-depth.v2'].includes(fixture.id)){
      for(const key of Object.keys(fixture.strings??{}))integrated.add(key);
    }
  }

  for(const fixture of v6){
    for(const [key,value] of Object.entries(fixture.strings??{})){
      if(integrated.has(key))assert.deepEqual(localization[key],value,'integrated key mismatch: '+key);
      else assert.equal(key in localization,false,'selector-less key entered production: '+key);
    }
  }
  assert.equal(integrated.size,32);
});

test('C3-59 v6 keys do not collide with merged C3-38..47 fixture-local keys',()=>{
  for(const key of v6Keys){
    assert.equal(v5Keys.has(key),false,'merged v5 fixture collision: '+key);
  }
});

test('C3-59 Forest presentation attachments reuse existing presentation IDs only',()=>{
  const slots=presentation.slots??{};
  for(const id of manifest.existingPresentationIds){
    assert.ok(slots[id],id);
  }
});

test('C3-59 candidate localization namespaces do not claim School or media-source ownership',()=>{
  for(const key of v6Keys){
    assert.equal(key.startsWith('school.'),false,key);
    assert.equal(key.startsWith('course.'),false,key);
    assert.equal(key.startsWith('media.'),false,key);
    assert.equal(key.startsWith('presentation.static.'),false,key);
  }
  for(const fixture of v6){
    assert.equal(/assets\//.test(JSON.stringify(fixture)),false,fixture.id+' must not author media sources');
  }
});

test('C3-59 ownership contract keeps shared systems outside Chat 3 work',()=>{
  for(const [name,value] of Object.entries(manifest.ownership)){
    assert.equal(value,true,name);
  }
  assert.equal(manifest.evidence.rootLocalizationCollisions,0);
  assert.equal(manifest.evidence.mergedV5FixtureKeyCollisions,0);
  assert.equal(manifest.evidence.v6CandidateKeysUnique,true);
});
