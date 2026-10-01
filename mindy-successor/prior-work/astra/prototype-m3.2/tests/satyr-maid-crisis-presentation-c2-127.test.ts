import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

import {presentationSlots,presentationIdForSatyrMaidCareerEvent,SATYR_MAID_CRISIS_EVENT_IDS} from '../src/core/presentation.ts';
import {catalog} from './helpers.ts';

const presentation=JSON.parse(readFileSync('content/presentation.json','utf8'));
const localization=JSON.parse(readFileSync('content/localization.json','utf8')).strings;
const app=readFileSync('src/ui/app.ts','utf8');

test('C2-127 Satyr house crisis has exact production presentation identity and hidden-value-free labels',()=>{
 assert.deepEqual([...SATYR_MAID_CRISIS_EVENT_IDS],['satyr-maid.crisis.house-strain']);
 const id=presentationIdForSatyrMaidCareerEvent('satyr-maid.crisis.house-strain');
 assert.ok(new Set(presentationSlots(catalog).map(slot=>slot.id)).has(id));
 assert.ok(presentation.slots[id]?.static);
 for(const choice of ['supply-plan','staff-protection','customer-terms']){
  const label=`event.satyr-maid.crisis.house-strain.choice.${choice}.label`;
  const feedback=`ui.satyrMaid.crisisFeedback.${choice}`;
  for(const key of [label,feedback]){
   assert.ok(localization[key]?.ru?.trim(),key+' ru');
   assert.ok(localization[key]?.en?.trim(),key+' en');
   assert.doesNotMatch(localization[key].ru,/\b(?:15|50|600|\+\d+)\b/);
   assert.doesNotMatch(localization[key].en,/\b(?:15|50|600|\+\d+)\b/);
  }
 }
});

test('C2-127 crisis result feedback is presentation-only and derived from the chosen pending scene',()=>{
 assert.match(app,/before\.run\.pending\?\.eventId!=='satyr-maid\.crisis\.house-strain'/);
 assert.match(app,/ui\.satyrMaid\.crisisFeedback/);
 assert.doesNotMatch(app,/addCareerFact\([^\n]*crisis/);
});
