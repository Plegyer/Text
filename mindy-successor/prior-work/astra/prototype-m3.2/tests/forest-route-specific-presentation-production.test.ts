import test from 'node:test';
import assert from 'node:assert/strict';
import {existsSync,readFileSync} from 'node:fs';

import {applyPresentation,presentationIdForActivityRoute,presentationSchema,presentationSlots,resolvePresentation} from '../src/core/presentation.ts';
import {catalog} from './helpers.ts';

const presentation=JSON.parse(readFileSync('content/presentation.json','utf8'));
const localization=JSON.parse(readFileSync('content/localization.json','utf8')).strings;

test('Forest authoritative route state resolves exact semantic presentation IDs',()=>{
 assert.equal(presentationIdForActivityRoute(catalog,'lumber.forest',null),'activity/forest/route/default');
 assert.equal(presentationIdForActivityRoute(catalog,'lumber.forest','logging-road'),'activity/forest/route/logging-road');
 assert.equal(presentationIdForActivityRoute(catalog,'lumber.forest','old-boundary'),'activity/forest/route/old-boundary');
 const ids=new Set(presentationSlots(catalog).map(slot=>slot.id));
 assert.ok(ids.has('activity/forest/route/default'));
 assert.ok(ids.has('activity/forest/route/logging-road'));
 assert.ok(ids.has('activity/forest/route/old-boundary'));
});

test('both Forest routes use reviewed project-owned static with neutral fallback metadata retained',()=>{
 presentationSchema.parse(presentation);
 const checked=applyPresentation(catalog,presentation);
 const before=JSON.stringify(catalog);

 const logging=resolvePresentation(checked,presentation,'activity/forest/route/logging-road',{animationsEnabled:true,occurrenceKey:'same'});
 assert.equal(logging.selected?.src,'assets/presentation/forest-route-logging-road.svg');
 assert.equal(logging.selected?.altKey,'presentation.activity.forest.route.logging-road.alt');
 assert.ok(existsSync('assets/presentation/forest-route-logging-road.svg'));
 assert.ok(existsSync('dist/assets/presentation/forest-route-logging-road.svg'));

 const boundary=resolvePresentation(checked,presentation,'activity/forest/route/old-boundary',{animationsEnabled:true,occurrenceKey:'same'});
 assert.equal(boundary.selected?.src,'assets/presentation/forest-route-old-boundary-v3.svg');
 assert.equal(boundary.selected?.slotId,'activity/forest/route/old-boundary');
 assert.equal(boundary.selected?.altKey,'presentation.activity.forest.route.old-boundary.alt');
 assert.ok(existsSync('assets/presentation/forest-route-old-boundary-v3.svg'));
 assert.ok(existsSync('dist/assets/presentation/forest-route-old-boundary-v3.svg'));

 assert.equal(JSON.stringify(catalog),before);
});

test('Forest route presentation localization is complete and presentation-only',()=>{
 for(const key of [
  'activityOption.forest.route.logging-road.help',
  'activityOption.forest.route.old-boundary.help',
  'presentation.activity.forest.route.logging-road.alt',
  'presentation.activity.forest.route.logging-road.caption',
  'presentation.activity.forest.route.old-boundary.alt',
  'presentation.activity.forest.route.old-boundary.caption'
 ]){
  assert.ok(localization[key]?.ru?.trim(),key+' ru');
  assert.ok(localization[key]?.en?.trim(),key+' en');
 }
 for(const id of ['activity/forest/route/logging-road','activity/forest/route/old-boundary']){
  const serialized=JSON.stringify(presentation.slots[id]);
  assert.doesNotMatch(serialized,/hunter|token|reward|challenge|condition|effect|rng|save/i,id);
 }
 assert.equal(presentation.slots['activity/forest/route/old-boundary']?.static?.src,'assets/presentation/forest-route-old-boundary-v3.svg');
});
