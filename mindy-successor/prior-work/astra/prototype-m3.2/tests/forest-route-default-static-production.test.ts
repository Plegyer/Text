import test from 'node:test';
import assert from 'node:assert/strict';
import {existsSync,readFileSync} from 'node:fs';

import {applyPresentation,presentationSchema,resolvePresentation} from '../src/core/presentation.ts';
import {catalog} from './helpers.ts';

const presentation=JSON.parse(readFileSync('content/presentation.json','utf8'));
const localization=JSON.parse(readFileSync('content/localization.json','utf8')).strings;
const id='activity/forest/route/default';
const src='assets/presentation/forest-route-default-v1.svg';
const altKey='presentation.static.forest.route.default.alt';
const captionKey='presentation.static.forest.route.default.caption';

test('neutral Forest route/default uses one project-owned locale-neutral static fallback',()=>{
 presentationSchema.parse(presentation);
 const slot=presentation.slots[id];
 assert.ok(slot?.static);
 assert.equal(slot.static.kind,'image');
 assert.equal(slot.static.src,src);
 assert.equal(slot.static.altKey,altKey);
 assert.ok(localization[altKey]?.ru?.trim());
 assert.ok(localization[altKey]?.en?.trim());
 assert.ok(localization[captionKey]?.ru?.trim());
 assert.ok(localization[captionKey]?.en?.trim());
 assert.ok(existsSync(src));
 assert.ok(existsSync('dist/'+src));
 assert.equal(readFileSync('dist/'+src,'utf8'),readFileSync(src,'utf8'));
});

test('route/default static fallback is presentation-only and deterministic',()=>{
 const checked=applyPresentation(catalog,presentation);
 const before=JSON.stringify(catalog);
 const on=resolvePresentation(checked,presentation,id,{animationsEnabled:true,occurrenceKey:'route-default'});
 const off=resolvePresentation(checked,presentation,id,{animationsEnabled:false,occurrenceKey:'route-default'});
 assert.equal(on.selected?.src,src);
 assert.equal(off.selected?.src,src);
 assert.equal(on.selected?.altKey,altKey);
 assert.equal(off.selected?.altKey,altKey);
 assert.equal(JSON.stringify(catalog),before);
 assert.doesNotMatch(JSON.stringify(slotForSafety()),/logging-road|old-boundary|hunter|token|challenge/i);
});

function slotForSafety(){
 return presentation.slots[id];
}
