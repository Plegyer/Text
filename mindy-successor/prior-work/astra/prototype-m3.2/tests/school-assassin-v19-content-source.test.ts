import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const fixtures=[
  'school-assassin-v19-field-craft.fixture.json',
  'school-assassin-v19-rhetoric.fixture.json',
  'school-assassin-v19-etiquette.fixture.json',
  'school-assassin-v19-literacy.fixture.json',
  'school-assassin-v19-physical.fixture.json'
].map(name=>JSON.parse(readFileSync('content/'+name,'utf8')));

test('C5-206..210 Assassin capability-only source copy is complete RU EN on exactly five existing courses',()=>{
  assert.deepEqual(fixtures.map(x=>x.task),['C5-206','C5-207','C5-208','C5-209','C5-210']);
  assert.deepEqual(fixtures.map(x=>x.courseId),[
    'school.course.field_craft',
    'school.course.rhetoric_and_social',
    'school.course.etiquette_and_presentation',
    'school.course.literacy_and_numbers',
    'school.course.physical_training'
  ]);
  for(const fixture of fixtures){
    assert.equal(fixture.mappingAuthority,'CAPABILITY_MATCH_ONLY',fixture.id);
    assert.equal(fixture.futureConsumerStatus,'PENDING_RUNTIME_ID',fixture.id);
    assert.equal(fixture.threshold,null,fixture.id);
    assert.equal(fixture.publicFactId,null,fixture.id);
    for(const field of ['title','body','result','journal','accessibility']){
      const pair=fixture.copy[field];
      assert.ok(pair?.ru?.trim(),fixture.id+' '+field+' ru');
      assert.ok(pair?.en?.trim(),fixture.id+' '+field+' en');
      assert.notEqual(pair.ru,pair.en,fixture.id+' '+field);
    }
    assert.equal(fixture.constraints.createsDirectCareerTransition,false,fixture.id);
    assert.equal(fixture.constraints.publishesGlobalCertificate,false,fixture.id);
    assert.equal(fixture.constraints.publishesGlobalProject,false,fixture.id);
  }
});

test('C5-215 RU EN result journal accessibility are presentation-only while future consumers remain pending',()=>{
  for(const fixture of fixtures){
    const identity=JSON.stringify({
      courseId:fixture.courseId,
      trackId:fixture.trackId,
      teacherContentId:fixture.teacherContentId,
      futureConsumerStatus:fixture.futureConsumerStatus,
      threshold:fixture.threshold,
      publicFactId:fixture.publicFactId
    });
    for(const locale of ['ru','en']){
      assert.ok(fixture.copy.result[locale].trim());
      assert.ok(fixture.copy.journal[locale].trim());
      assert.ok(fixture.copy.accessibility[locale].trim());
      assert.equal(JSON.stringify({
        courseId:fixture.courseId,
        trackId:fixture.trackId,
        teacherContentId:fixture.teacherContentId,
        futureConsumerStatus:fixture.futureConsumerStatus,
        threshold:fixture.threshold,
        publicFactId:fixture.publicFactId
      }),identity,fixture.id+' '+locale);
    }
  }
});

test('C5-206..210 scope-specific source copy does not define forbidden Assassin subsystems',()=>{
  const [field,rhetoric,etiquette,literacy,physical]=fixtures;
  assert.equal(field.constraints.createsContract,false);
  assert.equal(field.constraints.createsTarget,false);
  assert.equal(field.constraints.createsCombatCurriculum,false);
  assert.equal(field.constraints.createsActivityRoute,false);
  assert.equal(rhetoric.constraints.createsInterrogationSystem,false);
  assert.equal(rhetoric.constraints.createsTargetState,false);
  assert.equal(rhetoric.constraints.createsPatronOrHandlerState,false);
  assert.equal(etiquette.constraints.createsPalaceAccess,false);
  assert.equal(etiquette.constraints.createsCourtPrivilege,false);
  assert.equal(etiquette.constraints.createsSealedPass,false);
  assert.equal(etiquette.constraints.createsUniversalAccess,false);
  assert.equal(literacy.constraints.createsEvidenceItem,false);
  assert.equal(literacy.constraints.createsTargetDossier,false);
  assert.equal(literacy.constraints.createsContractLedger,false);
  assert.equal(physical.constraints.createsCombatCurriculum,false);
  assert.equal(physical.constraints.createsWeaponTraining,false);
  assert.equal(physical.constraints.createsLethalRule,false);
  assert.equal(physical.constraints.createsNonlethalRule,false);
});
