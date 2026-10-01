import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

import {presentationSlots,presentationIdForSatyrMaidCareerEvent,SATYR_MAID_SCHOOL_EVENT_IDS} from '../src/core/presentation.ts';
import {catalog} from './helpers.ts';

const presentation=JSON.parse(readFileSync('content/presentation.json','utf8'));
const localization=JSON.parse(readFileSync('content/localization.json','utf8')).strings;

test('C2-126 Satyr School reactions have exact career-domain presentation coverage',()=>{
 const known=new Set(presentationSlots(catalog).map(slot=>slot.id));
 assert.equal(SATYR_MAID_SCHOOL_EVENT_IDS.length,3);
 for(const eventId of SATYR_MAID_SCHOOL_EVENT_IDS){
  const id=presentationIdForSatyrMaidCareerEvent(eventId);
  assert.ok(known.has(id),id);
  const slot=presentation.slots[id];
  assert.ok(slot?.static,id+' static');
  for(const key of [
   `event.${eventId}.title`,
   `event.${eventId}.variant.default.text`,
   `event.${eventId}.choice.apply.label`,
   `event.${eventId}.choice.apply.text`,
   slot.static.altKey,
   slot.static.altKey.replace(/\.alt$/,'.caption')
  ]){
   assert.ok(localization[key]?.ru?.trim(),key+' ru');
   assert.ok(localization[key]?.en?.trim(),key+' en');
  }
 }
});
