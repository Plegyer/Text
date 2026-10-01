import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const files=[
  'school-tavern-v14-records.fixture.json',
  'school-tavern-v14-rhetoric.fixture.json',
  'school-tavern-v14-etiquette.fixture.json',
  'school-tavern-v14-arcana.fixture.json'
].map(name=>JSON.parse(readFileSync('content/'+name,'utf8')));

test('C5-146..149 Tavern School source copy is complete RU EN and bound to C1D-121 gameplay IDs',()=>{
  assert.deepEqual(files.map(x=>x.task),['C5-146','C5-147','C5-148','C5-149']);
  for(const fixture of files){
    assert.equal(fixture.bindingStatus,'C1D_121_BOUND',fixture.id);
    assert.ok(fixture.reactionEvent?.startsWith('tavern.school.'),fixture.id);
    assert.ok(fixture.careerFact?.startsWith('school-'),fixture.id);
    for(const field of ['title','body','result','journal','accessibility']){
      const pair=fixture.copy[field];
      assert.ok(pair?.ru?.trim(),fixture.id+' '+field+' ru');
      assert.ok(pair?.en?.trim(),fixture.id+' '+field+' en');
      assert.notEqual(pair.ru,pair.en,fixture.id+' '+field);
    }
  }
});

test('C5-152 producer sources stay on the existing Tavern School teacher roster',()=>{
  assert.deepEqual(files.map(x=>x.teacherContentId),[
    'school.teacher.mara-fen',
    'school.teacher.cassian-reed',
    'school.teacher.eliane-marrow',
    'school.teacher.ilyra-venn'
  ]);
});

test('C5-149 Arcana source copy does not invent final Tavern lore or item mechanics',()=>{
  const arcana=files.find(x=>x.task==='C5-149');
  assert.ok(arcana);
  assert.equal(arcana.constraints.declaresFinalLore,false);
  assert.equal(arcana.constraints.createsItem,false);
});

test('C5-155 all four producer sources forbid global School policy writes and direct career advancement',()=>{
  for(const fixture of files){
    assert.equal(fixture.constraints.publishesGlobalCertificate,false,fixture.id);
    assert.equal(fixture.constraints.publishesGlobalProject,false,fixture.id);
    assert.equal(fixture.constraints.advancesCareerDirectly,false,fixture.id);
  }
});

test('C5-145/C5-146..149 exact C1D-121 Tavern bindings are stable',()=>{
  const byTask=Object.fromEntries(files.map(x=>[x.task,[x.reactionEvent,x.careerFact]]));
  assert.deepEqual(byTask,{
    'C5-146':['tavern.school.records','school-records-ready'],
    'C5-147':['tavern.school.broker','school-broker-ready'],
    'C5-148':['tavern.school.etiquette','school-etiquette-ready'],
    'C5-149':['tavern.school.arcana','school-arcana-ready']
  });
});
