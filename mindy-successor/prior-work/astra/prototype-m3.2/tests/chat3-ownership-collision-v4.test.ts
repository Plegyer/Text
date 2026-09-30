import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const load=(path:string)=>JSON.parse(readFileSync(path,'utf8'));
const localization=load('content/localization.json').strings as Record<string,{ru:string;en:string}>;
const presentation=load('content/presentation.json');
const manifest=load('content/chat3-ownership-collision-v4.fixture.json');
const fixtures=manifest.v8FixturePaths.map((path:string)=>load(path));

test('C3-83 queue-v8 player-facing keys do not collide with production localization',()=>{
  const keys=fixtures.flatMap((fixture:any)=>Object.keys(fixture.strings??{}));
  assert.equal(new Set(keys).size,keys.length);
  for(const key of keys){
    assert.equal(key in localization,false,'production localization collision: '+key);
  }
});

test('C3-83 referenced Forest presentation IDs already exist',()=>{
  for(const id of manifest.existingPresentationIds){
    assert.ok(presentation.slots?.[id],id);
  }
});

test('C3-83 queue-v8 fixture payload does not claim School/media/runtime source namespaces',()=>{
  for(const fixture of fixtures){
    const serialized=JSON.stringify(fixture);
    assert.equal(/"school\./i.test(serialized),false,fixture.id+' school namespace');
    assert.equal(/"media\./i.test(serialized),false,fixture.id+' media namespace');
    assert.equal(/assets\//i.test(serialized),false,fixture.id+' asset path');
  }
});

test('C3-83 ownership contract keeps shared systems outside Chat 3',()=>{
  for(const [name,value] of Object.entries(manifest.ownership)){
    assert.equal(value,true,name);
  }
});
