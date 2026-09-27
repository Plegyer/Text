import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const definitions=JSON.parse(readFileSync('content/definitions.json','utf8'));
const current=JSON.parse(readFileSync('content/localization.json','utf8')).strings;
const fixtures=[
  JSON.parse(readFileSync('content/forest-logging-road-localization-v1.fixture.json','utf8')),
  JSON.parse(readFileSync('content/forest-old-boundary-localization-v1.fixture.json','utf8'))
];

test('route localization references only shipped Forest route identities',()=>{
  const activity=definitions.activities.find((x:any)=>x.id==='lumber.forest');
  const shipped=activity.options.filter((x:any)=>x.category==='route').map((x:any)=>x.id);
  assert.deepEqual(shipped,['forest.route.logging-road','forest.route.old-boundary']);
  assert.deepEqual(fixtures.map((x:any)=>x.routeRef),shipped);
});

test('route localization is bilingual locale-neutral and collision-safe',()=>{
  const bad=/(^|[._/-])(ru|en)([._/-]|$)/i;
  for(const fixture of fixtures){
    for(const [key,value] of Object.entries(fixture.strings) as [string,any][]){
      assert.equal(bad.test(key),false,key);
      assert.ok(value.ru?.trim(),key+' ru');
      assert.ok(value.en?.trim(),key+' en');
      if(current[key]!==undefined)assert.deepEqual(current[key],value,key);
    }
  }
});

test('route localization contains presentation text only',()=>{
  const raw=JSON.stringify(fixtures);
  for(const token of ['conditions','effects','progressDelta','enduranceCost','setRoute']){
    assert.equal(raw.includes('"'+token+'"'),false,token);
  }
});

test('old-boundary localization leaves token semantics open',()=>{
  const boundary=fixtures.find((x:any)=>x.routeRef==='forest.route.old-boundary');
  assert.equal(boundary.invariants.changesTokenSemantics,false);
  assert.ok(boundary.explicitNonAssumptions.length>=4);
});
