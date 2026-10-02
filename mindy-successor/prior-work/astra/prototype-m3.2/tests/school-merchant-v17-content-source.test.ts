import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const fixtures=[
  'school-merchant-v17-literacy.fixture.json',
  'school-merchant-v17-rhetoric.fixture.json',
  'school-merchant-v17-etiquette.fixture.json',
  'school-merchant-v17-arcana.fixture.json'
].map(name=>JSON.parse(readFileSync('content/'+name,'utf8')));

test('C5-182..185 Merchant School source copy is complete RU EN on exact frozen Merchant consumer authority',()=>{
  assert.deepEqual(fixtures.map(x=>x.task),['C5-182','C5-183','C5-184','C5-185']);
  assert.deepEqual(fixtures.map(x=>x.courseId),[
    'school.course.literacy_and_numbers',
    'school.course.rhetoric_and_social',
    'school.course.etiquette_and_presentation',
    'school.course.arcana'
  ]);
  assert.deepEqual(fixtures.map(x=>x.consumerEventId),[
    'merchant.routes.house-ready',
    'merchant.relationship.trust',
    null,
    'merchant.trade.appraisal'
  ]);

  for(const fixture of fixtures){
    assert.equal(fixture.runtimeContract.head,'88422257f618c7182dd6d1f3eca7596c9972eb0a',fixture.id);
    assert.equal(fixture.runtimeContract.contractBlob,'31e353c0284700ff29d658fff9c1032193c0e563',fixture.id);
    assert.equal(fixture.runtimeContract.schoolAuthorityBlob,'0d19348e952717b04f12eff9a95c2d82c750983c',fixture.id);
    assert.equal(fixture.selectedPublicFactId,null,fixture.id);
    assert.equal(fixture.localThreshold.value,null,fixture.id);
    assert.equal(fixture.localThreshold.scope,'merchant-only',fixture.id);
    for(const field of ['title','body','result','journal','accessibility']){
      const pair=fixture.copy[field];
      assert.ok(pair?.ru?.trim(),fixture.id+' '+field+' ru');
      assert.ok(pair?.en?.trim(),fixture.id+' '+field+' en');
      assert.notEqual(pair.ru,pair.en,fixture.id+' '+field);
    }
    assert.equal(fixture.constraints.advancesCareerDirectly,false,fixture.id);
    assert.equal(fixture.constraints.publishesGlobalCertificate,false,fixture.id);
    assert.equal(fixture.constraints.publishesGlobalProject,false,fixture.id);
  }
});

test('C5-189 exact live Merchant consumer source copy is bilingual and locale does not alter gameplay identity',()=>{
  const live=fixtures.filter(x=>x.consumerEventId!==null);
  assert.equal(live.length,3);
  for(const fixture of live){
    assert.equal(fixture.c5_189Applicable,true,fixture.id);
    assert.equal(fixture.bindingStatus,'FROZEN_RUNTIME_CONSUMER_ONLY_PRODUCER_BLOCKED',fixture.id);
    const identity=JSON.stringify({
      id:fixture.id,
      courseId:fixture.courseId,
      trackId:fixture.trackId,
      merchantFactId:fixture.merchantFactId,
      consumerEventId:fixture.consumerEventId,
      selectedPublicFactId:fixture.selectedPublicFactId,
      threshold:fixture.localThreshold.value
    });
    for(const locale of ['ru','en']){
      assert.ok(fixture.copy.result[locale].trim(),fixture.id+' '+locale+' result');
      assert.ok(fixture.copy.journal[locale].trim(),fixture.id+' '+locale+' journal');
      assert.ok(fixture.copy.accessibility[locale].trim(),fixture.id+' '+locale+' accessibility');
      assert.equal(JSON.stringify({
        id:fixture.id,
        courseId:fixture.courseId,
        trackId:fixture.trackId,
        merchantFactId:fixture.merchantFactId,
        consumerEventId:fixture.consumerEventId,
        selectedPublicFactId:fixture.selectedPublicFactId,
        threshold:fixture.localThreshold.value
      }),identity,fixture.id+' '+locale+' identity');
    }
  }
  const etiquette=fixtures.find(x=>x.task==='C5-184');
  assert.ok(etiquette);
  assert.equal(etiquette.consumerEventId,null);
  assert.equal(etiquette.c5_189Applicable,false);
});

test('C5-182..185 producer constraints do not create Merchant economy or privilege subsystems',()=>{
  const [literacy,rhetoric,etiquette,arcana]=fixtures;
  assert.equal(literacy.constraints.createsDirectProfitBonus,false);
  assert.equal(literacy.constraints.createsPriceEngine,false);
  assert.equal(literacy.constraints.createsCreditSystem,false);
  assert.equal(rhetoric.constraints.createsHagglingSubsystem,false);
  assert.equal(rhetoric.constraints.guaranteesDiscount,false);
  assert.equal(rhetoric.constraints.createsPriceEngine,false);
  assert.equal(etiquette.constraints.createsEliteAccess,false);
  assert.equal(etiquette.constraints.createsPalacePrivilege,false);
  assert.equal(etiquette.constraints.createsReputationStat,false);
  assert.equal(arcana.constraints.createsFixedMagicalCommodityRules,false);
  assert.equal(arcana.constraints.createsUniversalValuation,false);
  assert.equal(arcana.constraints.createsPriceEngine,false);
});
