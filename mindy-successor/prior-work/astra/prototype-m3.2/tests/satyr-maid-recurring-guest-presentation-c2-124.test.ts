import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

import {presentationSlots,presentationIdForSatyrMaidRelationshipEvent} from '../src/core/presentation.ts';
import {catalog} from './helpers.ts';

const presentation=JSON.parse(readFileSync('content/presentation.json','utf8'));
const localization=JSON.parse(readFileSync('content/localization.json','utf8')).strings;
const ids=[
 'satyr-maid.recurring-guest.intro',
 'satyr-maid.recurring-guest.service',
 'satyr-maid.recurring-guest.night',
 'satyr-maid.recurring-guest.request',
 'satyr-maid.recurring-guest.return'
];

test('C2-124 recurring-guest chain has exact relationship-domain slots and RU EN title/body/alt/caption',()=>{
 const known=new Set(presentationSlots(catalog).map(slot=>slot.id));
 for(const eventId of ids){
  const pid=presentationIdForSatyrMaidRelationshipEvent(eventId);
  assert.ok(known.has(pid),pid+' registry');
  const slot=presentation.slots[pid];
  assert.ok(slot?.static,pid+' static');
  assert.ok(localization[`event.${eventId}.title`]?.ru?.trim(),eventId+' title ru');
  assert.ok(localization[`event.${eventId}.title`]?.en?.trim(),eventId+' title en');
  assert.ok(localization[`event.${eventId}.variant.default.text`]?.ru?.trim(),eventId+' body ru');
  assert.ok(localization[`event.${eventId}.variant.default.text`]?.en?.trim(),eventId+' body en');
  assert.ok(localization[slot.static.altKey]?.ru?.trim(),eventId+' alt ru');
  assert.ok(localization[slot.static.altKey]?.en?.trim(),eventId+' alt en');
  const caption=slot.static.altKey.replace(/\.alt$/,'.caption');
  assert.ok(localization[caption]?.ru?.trim(),eventId+' caption ru');
  assert.ok(localization[caption]?.en?.trim(),eventId+' caption en');
 }
});
