import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const localization=JSON.parse(readFileSync('content/localization.json','utf8')).strings;
const professions=JSON.parse(readFileSync('content/profession-localization-v1.fixture.json','utf8'));
const unlocks=JSON.parse(readFileSync('content/legacy-unlock-localization-v1.fixture.json','utf8'));
const app=readFileSync('src/ui/app.ts','utf8');

const careerIds=['lumber','satyr-maid','undead-farm','tavern','hunter','guard','merchant','artist-geisha','assassin','prostitute'];
const unlockIds=['guild','scholar','calendar','host','mediator','court','lumber.forewoman.compat','lumber.forest.compat','palace'];

test('all current profession identity labels and descriptions are bilingual',()=>{
 assert.equal(Object.keys(professions.strings).length,20);
 for(const career of careerIds){
  for(const suffix of ['label','description']){
   const key=`profession.${career}.${suffix}`;
   assert.deepEqual(localization[key],professions.strings[key],key);
   assert.ok(localization[key]?.ru?.trim(),key+' ru');
   assert.ok(localization[key]?.en?.trim(),key+' en');
  }
 }
 assert.equal(localization['profession.palace.label'],undefined);
});

test('current legacy unlock labels are bilingual without changing unlock identity',()=>{
 assert.equal(Object.keys(unlocks.strings).length,10);
 assert.equal(localization['unlock.vitality.label'],undefined);
 assert.ok(localization['legacy.perk.lumber-stay-vitality.label']?.ru?.trim());
 assert.ok(localization['legacy.perk.lumber-stay-vitality.label']?.en?.trim());
 for(const id of unlockIds){
  const key=`unlock.${id}.label`;
  assert.deepEqual(localization[key],unlocks.strings[key],key);
  assert.ok(localization[key]?.ru?.trim(),key+' ru');
  assert.ok(localization[key]?.en?.trim(),key+' en');
 }
 assert.equal(localization['unlock.lumber.hardwork.compat.label'],undefined);
});

test('Forest persisted route IDs have bilingual display labels',()=>{
 for(const route of ['logging-road','old-boundary']){
  const key=`activityOption.forest.route.${route}.label`;
  assert.ok(localization[key]?.ru?.trim(),key+' ru');
  assert.ok(localization[key]?.en?.trim(),key+' en');
 }
});

test('UI renders display labels without changing stable persisted IDs',()=>{
 assert.ok(app.includes("tr(`profession.${career}.label`,tr(`action.${id}.label`,action.label))"));
 assert.ok(app.includes("tr(`unlock.${k}.label`,labels[k]??k)"));
 assert.ok(app.includes("routeOption?activityOptionLabel(routeOption.id,routeOption.label):activity.internalState.routeId"));
 assert.ok(app.includes("a.internalState.routeId??'none'"));
 assert.ok(app.includes("definition?.options.some(option=>option.id===activity.checkpoint)"));
 assert.ok(app.includes("state.run.actionCounts[id]??0"));
 assert.ok(app.includes("state.meta.unlocks.map"));
});
