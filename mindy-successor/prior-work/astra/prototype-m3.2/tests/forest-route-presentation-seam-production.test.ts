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

test('route-specific IDs resolve through the shipped neutral default until specific media exists',()=>{
 const checked=applyPresentation(catalog,presentation);
 for(const route of ['logging-road','old-boundary']){
  const id=presentationIdForActivityRoute(catalog,'lumber.forest',route);
  const on=resolvePresentation(checked,presentation,id,{animationsEnabled:true,occurrenceKey:'route'});
  const off=resolvePresentation(checked,presentation,id,{animationsEnabled:false,occurrenceKey:'route'});
  for(const resolved of [on,off]){
   assert.equal(resolved.requestedId,id);
   assert.equal(resolved.selected?.slotId,'activity/forest/route/default');
   assert.equal(resolved.selected?.src,'assets/presentation/forest-route-default-v1.svg');
  }
 }
});

test('route presentation helper is read-only and does not encode gameplay semantics',()=>{
 const before=JSON.stringify(catalog);
 assert.equal(presentationIdForActivityRoute(catalog,'lumber.forest','logging-road'),'activity/forest/route/logging-road');
 assert.equal(JSON.stringify(catalog),before);
 const source=presentationIdForActivityRoute.toString().toLowerCase();
 for(const token of ['rng','save','reward','effect','hardwork','activityresult'])assert.equal(source.includes(token),false,token);
});
