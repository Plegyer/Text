import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const root=JSON.parse(readFileSync('content/localization.json','utf8')).strings;
const fixture=JSON.parse(readFileSync('content/shared-night-ui-localization-production-v1.fixture.json','utf8'));
const app=readFileSync('src/ui/app.ts','utf8');

test('shared Night UI production fixture contains exactly 16 additive RU EN keys',()=>{
 assert.equal(Object.keys(fixture.strings).length,16);
 for(const [key,value] of Object.entries(fixture.strings as Record<string,{ru:string;en:string}>)){
  assert.deepEqual(root[key],value,key);
  assert.ok(value.ru.trim(),key+' ru');
  assert.ok(value.en.trim(),key+' en');
 }
 for(const key of fixture.invariants.excludedSupersededKeys)assert.equal(fixture.strings[key],undefined,key);
});

test('shared Night UI consumers use stable localization keys without NightFlow mechanics changes',()=>{
 const consumed=[
  'ui.night.eyebrow','ui.night.lodging.prompt','ui.night.nextDayEnergy',
  'ui.night.choice.title','ui.night.choice.prompt','ui.night.choice.slot','ui.night.choice.select',
  'ui.night.sequence.title','ui.town.lodgingToday'
 ];
 for(const key of consumed)assert.ok(app.includes("tr('"+key+"'"),key);
 assert.ok(app.includes('lodgingLabel(lodging.id,lodging.label)'));
 assert.ok(app.includes('housingLabel(r.housing'));
 assert.ok(app.includes('localizedNightChoiceLabel(choice.id,choice.label)'));
});

test('shared Night UI fixture is presentation-only',()=>{
 assert.equal(fixture.invariants.presentationOnly,true);
 assert.equal(fixture.invariants.nightFlowUnchanged,true);
 assert.equal(fixture.invariants.lodgingMechanicsUnchanged,true);
 assert.equal(fixture.invariants.housingMechanicsUnchanged,true);
 assert.equal(fixture.invariants.saveStateUnchanged,true);
});
