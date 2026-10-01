import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

import {presentationSlots,presentationIdForEnding,SATYR_MAID_COMPLEX_ENDING_IDS} from '../src/core/presentation.ts';
import {catalog} from './helpers.ts';

const presentation=JSON.parse(readFileSync('content/presentation.json','utf8'));
const localization=JSON.parse(readFileSync('content/localization.json','utf8')).strings;

test('C2-129 Boundary Mastery ending has exact reserved slot, pool, static fallback and RU EN copy',()=>{
 assert.ok(SATYR_MAID_COMPLEX_ENDING_IDS.includes('ending.satyr-maid.boundary-mastery'));
 const id=presentationIdForEnding('ending.satyr-maid.boundary-mastery');
 assert.equal(id,'ending/satyr-maid/boundary-mastery');
 assert.ok(new Set(presentationSlots(catalog).map(slot=>slot.id)).has(id));
 const slot=presentation.slots[id];
 assert.ok(slot?.static);
 assert.equal(slot.pool?.candidates.length,3);
 for(const key of [
  'ending.ending.satyr-maid.boundary-mastery.title',
  'ending.ending.satyr-maid.boundary-mastery.description',
  'ending.ending.satyr-maid.boundary-mastery.epilogue',
  slot.static.altKey,
  slot.static.altKey.replace(/\.alt$/,'.caption')
 ]){
  assert.ok(localization[key]?.ru?.trim(),key+' ru');
  assert.ok(localization[key]?.en?.trim(),key+' en');
 }
});
