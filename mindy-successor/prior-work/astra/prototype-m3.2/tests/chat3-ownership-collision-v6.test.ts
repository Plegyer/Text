import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const load=(path:string)=>JSON.parse(readFileSync(path,'utf8'));
const localization=load('content/localization.json').strings as Record<string,{ru:string;en:string}>;
const presentation=load('content/presentation.json');
const manifest=load('content/chat3-ownership-collision-v6.fixture.json');
const fixtures=manifest.sourceFixturePaths.map((path:string)=>load(path));

test('C3-105 queue-v10 source keys do not collide with root localization',()=>{
  const keys=fixtures.flatMap((fixture:any)=>Object.keys(fixture.strings??{}));
  assert.equal(new Set(keys).size,keys.length);
  for(const key of keys){
    assert.equal(key in localization,false,'production localization collision: '+key);
  }
});

test('C3-105 queue-v10 fixtures do not claim School/media/static-source namespaces',()=>{
  for(const fixture of fixtures){
    const serialized=JSON.stringify(fixture);
    assert.equal(/"school\./i.test(serialized),false,fixture.id+' school namespace');
    assert.equal(/"course\./i.test(serialized),false,fixture.id+' course namespace');
    assert.equal(/"media\./i.test(serialized),false,fixture.id+' media namespace');
    assert.equal(/assets\//i.test(serialized),false,fixture.id+' asset path');
  }
});

test('C3-105 referenced Forest presentation identities already exist or remain content-only',()=>{
  const slots=presentation.slots??{};
  for(const id of [
    'activity/forest/route/logging-road',
    'activity/forest/route/old-boundary',
    'activity/forest/return/success',
    'activity/forest/return/escape',
    'activity/forest/return/failure'
  ]){
    assert.ok(slots[id],id);
  }
});

test('C3-105 ownership contract keeps shared systems outside Chat 3',()=>{
  for(const [name,value] of Object.entries(manifest.ownership)){
    assert.equal(value,true,name);
  }
});
