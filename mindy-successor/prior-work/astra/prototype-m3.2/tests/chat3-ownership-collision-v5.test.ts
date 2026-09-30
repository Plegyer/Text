import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const load=(path:string)=>JSON.parse(readFileSync(path,'utf8'));
const localization=load('content/localization.json').strings as Record<string,{ru:string;en:string}>;
const presentation=load('content/presentation.json');
const manifest=load('content/chat3-ownership-collision-v5.fixture.json');
const fixtures=manifest.v9FixturePaths.map((path:string)=>load(path));

test('C3-95 queue-v9 authored player-facing keys do not collide with production localization',()=>{
  const keys=fixtures.flatMap((fixture:any)=>Object.keys(fixture.strings??{}));
  assert.equal(new Set(keys).size,keys.length);
  for(const key of keys)assert.equal(key in localization,false,'production localization collision: '+key);
});

test('C3-95 referenced Forest presentation IDs already exist',()=>{
  for(const id of manifest.existingPresentationIds)assert.ok(presentation.slots?.[id],id);
});

test('C3-95 queue-v9 fixtures do not claim School/media/assets namespaces',()=>{
  for(const fixture of fixtures){
    const serialized=JSON.stringify(fixture);
    assert.equal(/"school\./i.test(serialized),false,fixture.id+' school namespace');
    assert.equal(/"media\./i.test(serialized),false,fixture.id+' media namespace');
    assert.equal(/assets\//i.test(serialized),false,fixture.id+' asset path');
  }
});

test('C3-95 shared systems remain outside Chat 3 ownership',()=>{
  for(const [name,value] of Object.entries(manifest.ownership))assert.equal(value,true,name);
});
