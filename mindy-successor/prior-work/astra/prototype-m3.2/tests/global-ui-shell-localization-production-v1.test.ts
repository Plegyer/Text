import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const root=JSON.parse(readFileSync('content/localization.json','utf8')).strings;
const fixture=JSON.parse(readFileSync('content/global-ui-shell-localization-production-v1.fixture.json','utf8'));
const app=readFileSync('src/ui/app.ts','utf8');

test('global UI shell production fixture is fully merged RU EN',()=>{
 assert.equal(Object.keys(fixture.strings).length,34);
 for(const [key,value] of Object.entries(fixture.strings as Record<string,{ru:string;en:string}>)){
  assert.deepEqual(root[key],value,key);
  assert.ok(value.ru?.trim(),key+' ru');
  assert.ok(value.en?.trim(),key+' en');
 }
});

test('global UI shell visible consumers use stable localization keys',()=>{
 const consumed=[
  'ui.explore.title','ui.explore.activityHelp','ui.explore.entryEnergy','ui.explore.enterButton','ui.explore.errandsSummary',
  'ui.sleep.title', // sleep uses intentionally new RU/EN player copy; no legacy technical sequence labels
  'ui.panel.stats','ui.stats.help','ui.stats.professionsTitle','ui.stats.professionsHelp',
  'ui.panel.journal','ui.journal.empty',
  'ui.bag.title','ui.bag.debtLabel',
  'ui.panel.legacy','ui.legacy.help','ui.legacy.acceptButton','ui.legacy.inheritanceTitle','ui.legacy.emptyInheritance','ui.legacy.nextLifeButton',
  'ui.town.eyebrow','ui.arrival.title','ui.arrival.body','ui.arrival.button',
  'ui.generic.selectButton','ui.generic.closeButton','ui.generic.dismissButton',
  'ui.result.chooseLodging','ui.work.recipeReliable','ui.work.recipeFast','ui.result.returnTown'
 ];
 for(const key of consumed)assert.ok(app.includes("tr('"+key+"'"),key);
});

test('global UI shell fixture is presentation-only',()=>{
 assert.equal(fixture.invariants.presentationOnly,true);
 assert.equal(fixture.invariants.gameplayIdsIncluded,false);
 assert.equal(fixture.invariants.mechanicsFieldsIncluded,false);
});
