import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const files=[
  'school-hunter-v15-field-craft.fixture.json',
  'school-hunter-v15-arcana.fixture.json',
  'school-hunter-v15-literacy.fixture.json',
  'school-hunter-v15-physical.fixture.json'
].map(name=>JSON.parse(readFileSync('content/'+name,'utf8')));

test('C5-158..161 Hunter School source copy is complete RU EN and binds only current authoritative identities',()=>{
  assert.deepEqual(files.map(x=>x.task),['C5-158','C5-159','C5-160','C5-161']);
  for(const fixture of files){
    assert.ok(fixture.careerFact.startsWith('school-'),fixture.id);
    assert.equal(fixture.localThreshold.value,null,fixture.id);
    assert.equal(fixture.localThreshold.authority,'FROZEN_CONTRACT_EXPLICITLY_NULL',fixture.id);
    assert.equal(fixture.runtimeContract.head,'8af661de2ce6d73e4db0f61fe4206d3334822998',fixture.id);
    assert.equal(fixture.runtimeContract.blob,'160a7000cf49e86c638e9cfdf3c80f268e7c0c12',fixture.id);
    for(const field of ['title','body','result','journal','accessibility']){
      const pair=fixture.copy[field];
      assert.ok(pair?.ru?.trim(),fixture.id+' '+field+' ru');
      assert.ok(pair?.en?.trim(),fixture.id+' '+field+' en');
      assert.notEqual(pair.ru,pair.en,fixture.id+' '+field);
    }
  }
  const field=files[0];
  assert.equal(field.bindingStatus,'FROZEN_RUNTIME_EVENT_FACT_BOUND_NON_NUMERIC_CONDITION');
  assert.equal(field.reactionEvent,'hunter.school.field-craft');
  assert.equal(field.consumerAuthority.packBlob,'4e5ed1f9fcf6705845f8326a0d6ac331047ae763');
  for(const fixture of files.slice(1)){
    assert.equal(fixture.bindingStatus,'FROZEN_CONTRACT_FACT_ONLY_EVENT_THRESHOLD_BLOCKED',fixture.id);
    assert.equal(fixture.reactionEvent,'BLOCKED_NOT_PUBLISHED_BY_FROZEN_HUNTER_RUNTIME',fixture.id);
  }
});

test('C5-164 existing Hunter-facing School teacher roster remains Rowan Ilyra Mara Tovan',()=>{
  assert.deepEqual(files.map(x=>x.teacherContentId),[
    'school.teacher.rowan-pike','school.teacher.ilyra-venn','school.teacher.mara-fen','school.teacher.tovan-kest'
  ]);
  assert.deepEqual(files.map(x=>x.teacherMediaId),[
    'school.teacher.field-craft.classroom','school.teacher.arcana.classroom',
    'school.teacher.literacy-and-numbers.classroom','school.teacher.physical-training.classroom'
  ]);
});

test('C5-159/C5-161 source copy does not invent creature lore injury treatment or combat systems',()=>{
  const arcana=files.find(x=>x.task==='C5-159');
  const physical=files.find(x=>x.task==='C5-161');
  assert.ok(arcana&&physical);
  assert.equal(arcana.constraints.declaresFinalLore,false);
  assert.equal(arcana.constraints.namesUnauthorizedCreature,false);
  assert.equal(arcana.constraints.createsCombatSystem,false);
  assert.equal(physical.constraints.createsInjurySystem,false);
  assert.equal(physical.constraints.createsTreatmentSystem,false);
  assert.equal(physical.constraints.createsCombatSystem,false);
});

test('C5-165 every Hunter producer includes result journal and accessibility source text',()=>{
  for(const fixture of files){
    for(const field of ['result','journal','accessibility']){
      assert.ok(fixture.copy[field].ru.length>20,fixture.id+' '+field+' ru');
      assert.ok(fixture.copy[field].en.length>20,fixture.id+' '+field+' en');
    }
  }
});

test('C5-158..161 exact Hunter fact/event bindings preserve the three blocked consumers',()=>{
  const byTask=Object.fromEntries(files.map(x=>[x.task,[x.careerFact,x.reactionEvent,x.localThreshold.value]]));
  assert.deepEqual(byTask,{
    'C5-158':['school-field-craft-ready','hunter.school.field-craft',null],
    'C5-159':['school-arcana-ready','BLOCKED_NOT_PUBLISHED_BY_FROZEN_HUNTER_RUNTIME',null],
    'C5-160':['school-literacy-ready','BLOCKED_NOT_PUBLISHED_BY_FROZEN_HUNTER_RUNTIME',null],
    'C5-161':['school-physical-ready','BLOCKED_NOT_PUBLISHED_BY_FROZEN_HUNTER_RUNTIME',null]
  });
});
