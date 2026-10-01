import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const fixture=JSON.parse(readFileSync('content/tavern-authored-copy-v15.fixture.json','utf8'));
const contract=JSON.parse(readFileSync('../../../../docs/tasks/TAVERN_RUNTIME_CONTRACT_v1.json','utf8'));
const definitions=JSON.parse(readFileSync('content/definitions.json','utf8'));

function variants(value:any,out:any[]=[]):any[]{
  if(Array.isArray(value)){for(const x of value)variants(x,out);return out;}
  if(!value||typeof value!=='object')return out;
  if(typeof value.contentKey==='string'&&typeof value.ru==='string'&&typeof value.en==='string')out.push(value);
  for(const v of Object.values(value))variants(v,out);
  return out;
}

test('C3-158..167 authored copy prep consumes the exact published C1D-121 contract',()=>{
  assert.equal(fixture.contract.path,'mindy-successor/docs/tasks/TAVERN_RUNTIME_CONTRACT_v1.json');
  assert.equal(fixture.contract.exactHead,'4c416b5103ebef18378f40b8bc1f80bbaac2f798');
  assert.equal(fixture.bindingPolicy.createsGameplayIds,false);
  assert.equal(fixture.bindingPolicy.useProducerEventIdsOnly,true);

  assert.equal(fixture.seasonalShift.every((x:any)=>x.targetAction==='tavern.shift'),true);
  assert.ok(definitions.actions.some((x:any)=>x.id==='tavern.shift'));

  assert.equal(fixture.roomsConfidentiality.targets.relationship,contract.relationship.id);
  assert.equal(fixture.roomsConfidentiality.targets.accessItem,contract.access.item);
  assert.equal(fixture.roomsConfidentiality.targets.capability,contract.access.capability);
  assert.equal(fixture.roomsConfidentiality.targets.issueEvent,contract.access.issueEvent);
  assert.equal(fixture.roomsConfidentiality.targets.ledgerEvent,contract.access.ledgerEvent);
  assert.equal(fixture.roomsConfidentiality.targets.ledgerFact,contract.access.ledgerFact);

  assert.equal(fixture.rumourInformation.targets.producedFact,contract.information.producedFact);
  assert.equal(fixture.rumourInformation.targets.confirmedFact,contract.information.confirmedFact);
  assert.equal(fixture.rumourInformation.targets.consumer,contract.information.consumer);

  assert.equal(fixture.relationshipBreadth.targetRelationship,contract.relationship.id);
  assert.deepEqual(fixture.relationshipBreadth.contractStages,contract.relationship.stages);

  assert.equal(fixture.housingPovertyBridge.targets.event,contract.housingHook.event);
  assert.deepEqual(fixture.housingPovertyBridge.targets.tiers,contract.housingHook.conditionTiers);
  assert.equal(fixture.housingPovertyBridge.targets.fact,contract.housingHook.fact);

  assert.equal(fixture.activityReturn.targets.activity,contract.activityHook.activity);
  assert.equal(fixture.activityReturn.targets.result,contract.activityHook.result);
  assert.equal(fixture.activityReturn.targets.event,contract.activityHook.event);
  assert.equal(fixture.activityReturn.targets.fact,contract.activityHook.fact);

  assert.equal(fixture.outcomeCrisis.targets.event,contract.crisis.event);
  assert.deepEqual(fixture.outcomeCrisis.targets.choices,contract.crisis.choices);
  assert.deepEqual(fixture.outcomeCrisis.targets.facts,contract.crisis.facts);
  assert.deepEqual(fixture.outcomeCrisis.targets.endingMapping,contract.endingMapping);
});

test('C3-158..167 copy bank is bilingual, role-only and mechanics-neutral',()=>{
  const all=variants(fixture);
  assert.ok(all.length>=38);
  const keys=new Set<string>();
  for(const entry of all){
    assert.ok(entry.ru.trim().length>=40,entry.contentKey+' RU');
    assert.ok(entry.en.trim().length>=40,entry.contentKey+' EN');
    assert.equal(keys.has(entry.contentKey),false,entry.contentKey);
    keys.add(entry.contentKey);
    assert.doesNotMatch(entry.ru,/Марек|Элиан|Бронн|Рен|Силан/i,entry.contentKey);
    assert.doesNotMatch(entry.en,/Marek|Elian|Bronn|Ren|Silan/i,entry.contentKey);
  }
  const raw=JSON.stringify(fixture);
  assert.doesNotMatch(raw,/secret.?debt|slave|lender/i);
  assert.deepEqual(fixture.mechanics,{
    effects:[],runtimeChanges:[],endingChanges:[],schoolChanges:[],nightFlowChanges:[],economyNumberChanges:[],secretDebtChanges:[]
  });
});

test('C3-158..161 provides four distinct authored variants per season without changing shift mechanics',()=>{
  assert.deepEqual(fixture.seasonalShift.map((x:any)=>x.season),['spring','summer','autumn','winter']);
  for(const season of fixture.seasonalShift){
    assert.equal(season.variants.length,4,season.season);
  }
  const action=definitions.actions.find((x:any)=>x.id==='tavern.shift');
  assert.ok(action);
  assert.equal(action.cost.energy,1);
  assert.deepEqual(action.effects,[{kind:'incrementCareerCounter',career:'tavern',counter:'completed_shifts',amount:1}]);
});

test('C3-164 refusal copy explicitly preserves professional continuity',()=>{
  const decline=fixture.relationshipBreadth.variants.find((x:any)=>x.contentKey==='relationship.night-request-declined');
  assert.ok(decline);
  assert.match(decline.en,/professional connection continues normally/i);
  assert.match(decline.en,/does not .* block the career/i);
  assert.match(decline.ru,/профессиональный контакт продолжается/i);
});

test('C3-165 housing bridge copy preserves the lodging economy and avoids private rescue',()=>{
  const text=fixture.housingPovertyBridge.variants.map((x:any)=>x.en).join(' ');
  assert.match(text,/not a free room/i);
  assert.match(text,/does not .* change lodging prices/i);
  assert.match(text,/hidden debt/i);
});

test('C3-167 authored outcomes preserve the contract ending mapping without editing eligibility',()=>{
  assert.deepEqual(fixture.outcomeCrisis.targets.endingMapping,{
    veteranService:'ending.tavern.hard-work',
    innkeeper:'tavern-stay',
    informationBroker:'tavern-court',
    sanctuary:'tavern-guild'
  });
  assert.deepEqual(fixture.mechanics.endingChanges,[]);
});
