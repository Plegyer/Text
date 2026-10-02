import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,readdirSync} from 'node:fs';

const contract=JSON.parse(readFileSync('../../../docs/tasks/GUARD_RUNTIME_CONTRACT_v1.json','utf8'));
const preparation=JSON.parse(readFileSync('content/school-guard-preparation-v1.fixture.json','utf8'));

test('Guard School authority exposes exactly five prepared tracks with null thresholds',()=>{
  const expected=[
    ['school.track.literacy_and_numbers','school-literacy-ready'],
    ['school.track.rhetoric_and_social','school-rhetoric-ready'],
    ['school.track.etiquette_and_presentation','school-etiquette-ready'],
    ['school.track.physical_training','school-physical-ready'],
    ['school.track.arcana','school-arcana-ready']
  ];
  assert.deepEqual(
    contract.schoolHooks.map((h:any)=>[h.track,h.fact]),
    expected
  );
  assert.ok(contract.schoolHooks.every((h:any)=>h.threshold===null));
  assert.deepEqual(
    preparation.mappings.map((m:any)=>m.trackId),
    expected.map(([track])=>track)
  );
  assert.equal(preparation.selectedThreshold,null);
  assert.equal(preparation.selectedPublicFactId,null);
});

test('Guard production packs invent no numeric School threshold',()=>{
  const packs=readdirSync('content/packs')
    .filter(name=>name.startsWith('guard-')&&name.endsWith('.json'))
    .map(name=>JSON.parse(readFileSync('content/packs/'+name,'utf8')));
  const schoolCounterConditions=packs
    .flatMap(pack=>pack.events??[])
    .flatMap((event:any)=>event.conditions??[])
    .filter((condition:any)=>JSON.stringify(condition).includes('"kind":"schoolCounter"'));
  assert.deepEqual(schoolCounterConditions,[]);
});
