import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const files=[
  'school-guard-v16-literacy.fixture.json',
  'school-guard-v16-rhetoric.fixture.json',
  'school-guard-v16-etiquette.fixture.json',
  'school-guard-v16-physical.fixture.json',
  'school-guard-v16-arcana.fixture.json'
].map(name=>JSON.parse(readFileSync('content/'+name,'utf8')));

test('C5-170..174 Guard School source copy is complete RU EN and binds C1D-152 fact-only authority',()=>{
  assert.deepEqual(files.map(x=>x.task),['C5-170','C5-171','C5-172','C5-173','C5-174']);
  assert.deepEqual(files.map(x=>x.careerFact),[
    'school-literacy-ready','school-rhetoric-ready','school-etiquette-ready','school-physical-ready','school-arcana-ready'
  ]);
  for(const fixture of files){
    assert.equal(fixture.bindingStatus,'C1D_152_FACT_ONLY_EVENT_THRESHOLD_BLOCKED',fixture.id);
    assert.equal(fixture.reactionEvent,'BLOCKED_NO_LIVE_CONSUMER_C1D_152',fixture.id);
    assert.equal(fixture.localThreshold.value,null,fixture.id);
    assert.equal(fixture.localThreshold.authority,'C1D_152_EXPLICITLY_NULL',fixture.id);
    assert.equal(fixture.runtimeContract.head,'89030816f07be16ab5071ebb9af859fc3c756115',fixture.id);
    assert.equal(fixture.runtimeContract.blob,'03b332944e9c8cc0ef27193a1c06b5102f872451',fixture.id);
    assert.equal(fixture.immediateResolverStatus,'BLOCKED_NO_LIVE_CONSUMER',fixture.id);
    assert.equal(fixture.nightParityStatus,'BLOCKED_NO_LIVE_CONSUMER',fixture.id);
    for(const field of ['title','body','result','journal','accessibility']){
      const pair=fixture.copy[field];
      assert.ok(pair?.ru?.trim(),fixture.id+' '+field+' ru');
      assert.ok(pair?.en?.trim(),fixture.id+' '+field+' en');
      assert.notEqual(pair.ru,pair.en,fixture.id+' '+field);
    }
  }
});

test('C5-177 exact existing teacher continuity remains Mara Cassian Eliane Tovan Ilyra',()=>{
  assert.deepEqual(files.map(x=>x.teacherContentId),[
    'school.teacher.mara-fen','school.teacher.cassian-reed','school.teacher.eliane-marrow',
    'school.teacher.tovan-kest','school.teacher.ilyra-venn'
  ]);
});

test('C5-178 every prepared Guard producer includes result journal and accessibility copy',()=>{
  for(const fixture of files){
    for(const field of ['result','journal','accessibility']){
      assert.ok(fixture.copy[field].ru.length>20,fixture.id+' '+field+' ru');
      assert.ok(fixture.copy[field].en.length>20,fixture.id+' '+field+' en');
    }
  }
});

test('C5-170..174 source constraints do not create prohibited Guard systems',()=>{
  const [literacy,rhetoric,etiquette,physical,arcana]=files;
  assert.equal(literacy.constraints.createsEvidenceEconomy,false);
  assert.equal(literacy.constraints.createsCrimeModel,false);
  assert.equal(literacy.constraints.grantsLegalAuthority,false);
  assert.equal(rhetoric.constraints.createsInterrogationSystem,false);
  assert.equal(rhetoric.constraints.createsCoercionMeter,false);
  assert.equal(rhetoric.constraints.createsMoralityScore,false);
  assert.equal(etiquette.constraints.createsPalaceAccess,false);
  assert.equal(etiquette.constraints.createsClassReputation,false);
  assert.equal(etiquette.constraints.grantsImmunity,false);
  assert.equal(physical.constraints.createsInjurySystem,false);
  assert.equal(physical.constraints.createsWeaponSystem,false);
  assert.equal(physical.constraints.createsCombatSystem,false);
  assert.equal(physical.constraints.createsUseOfForceSystem,false);
  assert.equal(arcana.constraints.declaresFixedCrime,false);
  assert.equal(arcana.constraints.namesUnauthorizedCreature,false);
  assert.equal(arcana.constraints.createsFactionSystem,false);
  assert.equal(arcana.constraints.declaresFinalLore,false);
});
