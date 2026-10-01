import test from 'node:test';
import assert from 'node:assert/strict';
import {existsSync,readFileSync} from 'node:fs';

import {applyPresentation,presentationSlots,presentationIdForSatyrMaidCareerEvent,resolvePresentation} from '../src/core/presentation.ts';
import {catalog} from './helpers.ts';

const presentation=JSON.parse(readFileSync('content/presentation.json','utf8'));
const localization=JSON.parse(readFileSync('content/localization.json','utf8')).strings;
const workEvents=[
 'satyr-maid.career.first-shift',
 'satyr-maid.career.known-face',
 'satyr-maid.career.house-regular',
 'satyr-maid.career.veteran-service'
];

test('C2-123 Satyr work milestone slots expose exactly three project-owned GIF candidates plus static fallback',()=>{
 const known=new Set(presentationSlots(catalog).map(slot=>slot.id));
 const checked=applyPresentation(catalog,presentation);
 for(const eventId of workEvents){
  const id=presentationIdForSatyrMaidCareerEvent(eventId);
  assert.ok(known.has(id),id);
  const slot=presentation.slots[id];
  assert.equal(slot.pool?.candidates.length,3,id);
  assert.ok(slot.static,id+' static');
  for(const candidate of slot.pool.candidates){
   assert.ok(existsSync(candidate.src),candidate.src);
   assert.ok(localization[candidate.altKey]?.ru?.trim(),candidate.altKey+' ru');
   assert.ok(localization[candidate.altKey]?.en?.trim(),candidate.altKey+' en');
  }
  assert.ok(existsSync(slot.static.src),slot.static.src);
  const on=resolvePresentation(checked,presentation,id,{animationsEnabled:true,occurrenceKey:'c2-123'});
  const off=resolvePresentation(checked,presentation,id,{animationsEnabled:false,occurrenceKey:'c2-123'});
  assert.equal(on.selected?.source,'override-pool',id+' animated');
  assert.equal(off.selected?.source,'override-static',id+' reduced motion');
  assert.equal(off.selected?.src,slot.static.src,id+' static exact');
 }
});
