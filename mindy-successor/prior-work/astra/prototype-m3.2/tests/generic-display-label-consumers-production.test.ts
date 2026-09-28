import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const localization=JSON.parse(readFileSync('content/localization.json','utf8')).strings;
const app=readFileSync('src/ui/app.ts','utf8');

const professions=['lumber.shift','satyr-maid.shift','undead-farm.shift','tavern.shift','hunter.shift','guard.shift','merchant.shift','artist-geisha.shift','assassin.shift','prostitute.shift'];

test('all current profession display labels are bilingual',()=>{
 for(const id of professions){
  const key=`action.${id}.label`;
  assert.ok(localization[key]?.ru?.trim(),key+' ru');
  assert.ok(localization[key]?.en?.trim(),key+' en');
 }
});

test('Forest persisted route IDs have bilingual display labels',()=>{
 for(const route of ['logging-road','old-boundary']){
  const key=`activityOption.forest.route.${route}.label`;
  assert.ok(localization[key]?.ru?.trim(),key+' ru');
  assert.ok(localization[key]?.en?.trim(),key+' en');
 }
});

test('UI renders display labels without changing stable persisted IDs',()=>{
 assert.ok(app.includes("tr(`action.${id}.label`,action.label)"));
 assert.ok(app.includes("activityOptionLabel(`forest.route.${activity.internalState.routeId}`,activity.internalState.routeId)"));
 assert.ok(app.includes("activity.internalState.routeId??'none'"));
});
