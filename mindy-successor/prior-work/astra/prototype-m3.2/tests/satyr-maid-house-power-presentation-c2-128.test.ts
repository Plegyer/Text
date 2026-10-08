import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

import {presentationSlots,presentationIdForEnding} from '../src/core/presentation.ts';
import {catalog} from './helpers.ts';

const presentation=JSON.parse(readFileSync('content/presentation.json','utf8'));
const localization=JSON.parse(readFileSync('content/localization.json','utf8')).strings;
const app=readFileSync('src/ui/app.ts','utf8');

test('C2-128 House Power ending has reserved slot, candidate pool, static fallback and RU EN copy',()=>{
 const id=presentationIdForEnding('ending.satyr-maid.house-power');
 assert.equal(id,'ending/satyr-maid/house-power');
 assert.ok(new Set(presentationSlots(catalog).map(slot=>slot.id)).has(id));
 const slot=presentation.slots[id];
 assert.ok(slot?.static);
 assert.equal(slot.pool?.candidates.length,3);
 for(const key of [
  'ending.ending.satyr-maid.house-power.title',
  'ending.ending.satyr-maid.house-power.description',
  'ending.ending.satyr-maid.house-power.epilogue',
  slot.static.altKey,
  slot.static.altKey.replace(/\.alt$/,'.caption')
 ]){
  assert.ok(localization[key]?.ru?.trim(),key+' ru');
  assert.ok(localization[key]?.en?.trim(),key+' en');
 }
});

test('C2-128 committed/completed shell keeps exact ending identity visible',()=>{
 assert.match(app,/data-ending-presentation-state=/);
 assert.match(app,/data-ending-id=/);
 assert.match(app,/class="ending-identity"/);
 assert.match(app,/endingTitleForDisplay\(endingId\)/);
});
