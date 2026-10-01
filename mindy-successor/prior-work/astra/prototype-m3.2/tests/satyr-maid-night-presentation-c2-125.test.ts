import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const app=readFileSync('src/ui/app.ts','utf8');
const css=readFileSync('src/ui/style.css','utf8');
const localization=JSON.parse(readFileSync('content/localization.json','utf8')).strings;

test('C2-125 Satyr Night invitation/refusal/request/return states are keyboard-addressable',()=>{
 for(const token of [
  'data-satyr-relationship-state=',
  'data-satyr-choice-state=',
  'data-satyr-night-option=',
  'tabindex="0" role="region"',
  "night-refusal",
  "accepted-meeting",
  "external-request",
  "return-to-work"
 ]) assert.ok(app.includes(token),token);
 assert.match(css,/\.dialogue\[tabindex\]:focus-visible/);
});

test('C2-125 Satyr voluntary Night and refusal controls have RU EN labels',()=>{
 const keys=[
  'nightChoice.satyr-maid.night.recurring-guest.label',
  'nightChoice.satyr-maid.night.staff-debrief.label',
  'event.satyr-maid.recurring-guest.service.choice.accept-night.label',
  'event.satyr-maid.recurring-guest.service.choice.decline-night.label',
  'event.satyr-maid.recurring-guest.night.choice.talk.label',
  'event.satyr-maid.recurring-guest.request.choice.accept-request.label',
  'event.satyr-maid.recurring-guest.request.choice.decline-request.label',
  'event.satyr-maid.recurring-guest.return.choice.resolve-professionally.label'
 ];
 for(const key of keys){
  assert.ok(localization[key]?.ru?.trim(),key+' ru');
  assert.ok(localization[key]?.en?.trim(),key+' en');
 }
});
