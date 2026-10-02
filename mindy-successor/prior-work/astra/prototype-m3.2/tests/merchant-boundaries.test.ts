import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,readdirSync} from 'node:fs';

import {ordinaryCareerForShiftAction} from '../src/core/engine.ts';
import {catalog} from './helpers.ts';

const packsDir='content/packs';
const merchantFiles=readdirSync(packsDir).filter(f=>f.startsWith('merchant-')&&f.endsWith('.json')).sort();
const merchantPacks=merchantFiles.map(f=>JSON.parse(readFileSync(`${packsDir}/${f}`,'utf8')));
const poverty=JSON.parse(readFileSync('content/packs/merchant-poverty.json','utf8'));
const cross=JSON.parse(readFileSync('content/packs/merchant-cross-system.json','utf8'));
const routes=JSON.parse(readFileSync('content/packs/merchant-routes.json','utf8'));
const schoolAuthority=JSON.parse(readFileSync('content/merchant-school-authority-v1.fixture.json','utf8'));
const schoolPrep=JSON.parse(readFileSync('content/school-merchant-preparation-v1.fixture.json','utf8'));

function allEffects(pack:any){
  return pack.events.flatMap((event:any)=>event.choices.flatMap((choice:any)=>choice.effects));
}
function hasSchoolCounter(value:any):boolean{
  if(Array.isArray(value))return value.some(hasSchoolCounter);
  if(!value||typeof value!=='object')return false;
  if(value.kind==='schoolCounter')return true;
  return Object.values(value).some(hasSchoolCounter);
}

test('Merchant poverty handling owns no money, housing, credit, debt, or Secret Debt state',()=>{
  const event=poverty.events.find((e:any)=>e.id==='merchant.poverty.liquidity-response');
  assert.ok(event);
  const effects=event.choices.flatMap((c:any)=>c.effects);
  assert.ok(effects.length>0);
  assert.ok(effects.every((e:any)=>e.kind==='addCareerFact'&&e.career==='merchant'));
  assert.equal(poverty.capabilities.writes.resources,undefined);
  assert.equal(poverty.capabilities.writes.housing,undefined);

  for(const pack of merchantPacks){
    for(const effect of allEffects(pack)){
      assert.notEqual(effect.kind,'setHousing',pack.id);
      assert.equal(effect.kind==='modifyResource'&&effect.resource==='money',false,pack.id);
      assert.equal(effect.kind==='metric'&&effect.key==='debt',false,pack.id);
    }
    assert.deepEqual(pack.capabilities?.writes?.careers?.filter((x:string)=>x!=='merchant')??[],[],pack.id);
  }

  const action=catalog.definitions.actions.find(a=>a.id==='merchant.shift');
  assert.ok(action);
  assert.equal(ordinaryCareerForShiftAction(action),'merchant');
  assert.deepEqual(action.cost,{money:0,energy:1});
});

test('Merchant School authority maps exactly four prepared tracks and invents no runtime threshold',()=>{
  const prepared=schoolPrep.mappings.map((x:any)=>x.trackId).sort();
  const published=schoolAuthority.mappings.map((x:any)=>x.trackId).sort();
  assert.deepEqual(published,prepared);
  assert.equal(published.length,4);
  assert.ok(schoolAuthority.mappings.every((x:any)=>x.producerThreshold===null));
  assert.ok(schoolAuthority.mappings.every((x:any)=>x.selectedPublicFactId===null));
  assert.equal(merchantPacks.some(hasSchoolCounter),false,
    'Merchant runtime must not invent School lesson thresholds');
  assert.equal(schoolAuthority.mappings.find((x:any)=>x.trackId==='school.track.etiquette_and_presentation').consumerEventId,null,
    'formal presentation prep must not fabricate a Palace consumer');
});

test('Merchant cross-system seams are read-only and Patron readiness requires real shipped inputs',()=>{
  assert.deepEqual(cross.capabilities.writes,{careers:['merchant']});
  assert.deepEqual(cross.capabilities.reads.worldFacts,['lumber.forest.truth-known']);
  for(const career of ['undead-farm','hunter','tavern','guard']){
    assert.ok(cross.capabilities.reads.careers.includes(career),career);
  }
  const expected:any={
    'merchant.cross.lumber-route':'lumber-input-known',
    'merchant.cross.farm-sample':'farm-input-known',
    'merchant.cross.hunter-return':'hunter-input-known',
    'merchant.cross.tavern-rumour':'tavern-input-known',
    'merchant.cross.guard-pass':'guard-input-known'
  };
  for(const [eventId,fact] of Object.entries(expected)){
    const event=cross.events.find((e:any)=>e.id===eventId);
    assert.ok(event,eventId);
    assert.ok(event.choices.flatMap((c:any)=>c.effects).some((e:any)=>e.kind==='addCareerFact'&&e.career==='merchant'&&e.fact===fact),eventId);
    assert.equal(event.choices.flatMap((c:any)=>c.effects).some((e:any)=>e.career&&e.career!=='merchant'),false,eventId);
  }

  const patron=routes.events.find((e:any)=>e.id==='merchant.routes.patron-ready');
  assert.ok(patron);
  for(const fact of ['lumber-input-known','farm-input-known','hunter-input-known','tavern-input-known','guard-input-known']){
    assert.ok(patron.conditions.some((c:any)=>c.kind==='careerFact'&&c.career==='merchant'&&c.fact===fact&&c.present===true),fact);
  }
  assert.ok(patron.conditions.some((c:any)=>c.kind==='careerCounter'&&c.counter==='route_inputs'&&c.op==='gte'&&c.value===5));
  assert.equal(patron.conditions.some((c:any)=>c.kind==='careerCounter'&&c.counter==='completed_shifts'),false,
    'Patron readiness must not collapse to a shift count');
});
