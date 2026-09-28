import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

import {
  applyPresentation,
  presentationIdForActivityRoute,
  presentationSlots,
  resolvePresentation
} from '../src/core/presentation.ts';
import {catalog} from './helpers.ts';

const presentation=JSON.parse(readFileSync('content/presentation.json','utf8'));

test('Forest route presentation seam exposes exact specific IDs with neutral fallback',()=>{
 const slots=new Map(presentationSlots(catalog).map(slot=>[slot.id,slot]));
 const expected=[
  ['logging-road','activity/forest/route/logging-road'],
  ['old-boundary','activity/forest/route/old-boundary']
 ] as const;

 assert.equal(presentationIdForActivityRoute(catalog,'lumber.forest',null),'activity/forest/route/default');
 assert.equal(presentationIdForActivityRoute(catalog,'lumber.forest','unknown-route'),'activity/forest/route/default');

 for(const [route,id] of expected){
  assert.equal(presentationIdForActivityRoute(catalog,'lumber.forest',route),id);
  assert.ok(slots.has(id),id);
  assert.equal(slots.get(id)?.fallbackId,'activity/forest/route/default',id);
  assert.deepEqual(slots.get(id)?.baseMediaIds,[],id);
 }
});

test('route-specific IDs resolve through reviewed safe media with neutral fallback retained',()=>{
 const checked=applyPresentation(catalog,presentation);

 const loggingId=presentationIdForActivityRoute(catalog,'lumber.forest','logging-road');
 for(const resolved of [
  resolvePresentation(checked,presentation,loggingId,{animationsEnabled:true,occurrenceKey:'route'}),
  resolvePresentation(checked,presentation,loggingId,{animationsEnabled:false,occurrenceKey:'route'})
 ]){
  assert.equal(resolved.requestedId,loggingId);
  assert.equal(resolved.selected?.slotId,'activity/forest/route/logging-road');
  assert.equal(resolved.selected?.src,'assets/presentation/forest-route-logging-road.svg');
 }

 const boundaryId=presentationIdForActivityRoute(catalog,'lumber.forest','old-boundary');
 for(const resolved of [
  resolvePresentation(checked,presentation,boundaryId,{animationsEnabled:true,occurrenceKey:'route'}),
  resolvePresentation(checked,presentation,boundaryId,{animationsEnabled:false,occurrenceKey:'route'})
 ]){
  assert.equal(resolved.requestedId,boundaryId);
  assert.equal(resolved.selected?.slotId,'activity/forest/route/old-boundary');
  assert.equal(resolved.selected?.src,'assets/presentation/forest-route-old-boundary-v3.svg');
 }
});

test('route presentation helper is read-only and does not encode gameplay semantics',()=>{
 const before=JSON.stringify(catalog);
 assert.equal(presentationIdForActivityRoute(catalog,'lumber.forest','logging-road'),'activity/forest/route/logging-road');
 assert.equal(JSON.stringify(catalog),before);
 const source=presentationIdForActivityRoute.toString().toLowerCase();
 for(const token of ['rng','save','reward','effect','hardwork','activityresult'])assert.equal(source.includes(token),false,token);
});
