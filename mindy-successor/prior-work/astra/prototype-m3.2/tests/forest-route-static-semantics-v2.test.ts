import test from 'node:test';
import assert from 'node:assert/strict';
import {existsSync,readFileSync} from 'node:fs';

import {presentationSchema,presentationSlots} from '../src/core/presentation.ts';
import {catalog} from './helpers.ts';

const slots=JSON.parse(
  readFileSync('content/presentation-drafts/forest-route-static-slots-v2.json','utf8')
);
const localization=JSON.parse(
  readFileSync('content/presentation-drafts/forest-route-static-localization-v4.json','utf8')
);

const loggingId='activity/forest/route/logging-road';
const boundaryId='activity/forest/route/old-boundary';
const fallbackId='activity/forest/route/default';

test('Forest route static candidate file is schema-valid and uses exact route-specific semantic IDs',()=>{
  presentationSchema.parse(slots);
  assert.deepEqual(Object.keys(slots.slots).sort(),[boundaryId,loggingId].sort());

  const currentSlots=new Set(presentationSlots(catalog).map(slot=>slot.id));
  assert.ok(currentSlots.has(fallbackId),fallbackId);
});

test('both route-specific SVG files exist and contain no external resources or scripts',()=>{
  for(const [id,slot] of Object.entries(slots.slots) as Array<[string,any]>){
    assert.equal(slot.fallbackId,fallbackId,id);
    assert.equal(slot.static?.kind,'image',id);
    assert.match(slot.static.src,/^assets\/presentation\/forest-route-[a-z0-9-]+\.svg$/,id);
    assert.equal(existsSync(slot.static.src),true,slot.static.src);

    const svg=readFileSync(slot.static.src,'utf8');
    assert.match(svg,/^<svg\b[^>]*>/,slot.static.src);
    assert.match(svg,/<\/svg>\s*$/,slot.static.src);
    assert.match(svg,/viewBox="0 0 1200 675"/,slot.static.src);
    assert.doesNotMatch(svg,/<script\b/i,slot.static.src);
    assert.doesNotMatch(svg,/(?:href|src)\s*=\s*["'](?:https?:|\/\/|data:)/i,slot.static.src);
    assert.ok(svg.includes('data-presentation-id="'+id+'"'),slot.static.src);
  }
});

test('Forest route localization keys use normalized grammar and bind exactly to the slot alt keys',()=>{
  const expected={
    [loggingId]:{
      alt:'presentation.static.forest.route.logging-road.alt',
      caption:'presentation.static.forest.route.logging-road.caption'
    },
    [boundaryId]:{
      alt:'presentation.static.forest.route.old-boundary.alt',
      caption:'presentation.static.forest.route.old-boundary.caption'
    }
  };

  for(const [id,keys] of Object.entries(expected)){
    assert.equal(slots.slots[id].static.altKey,keys.alt,id);
    assert.equal(localization.bindings[id].altKey,keys.alt,id);
    assert.equal(localization.bindings[id].captionKey,keys.caption,id);

    for(const key of [keys.alt,keys.caption]){
      assert.match(key,/^presentation\.static\.forest\.route\.(logging-road|old-boundary)\.(alt|caption)$/);
      const pair=localization.strings[key];
      assert.equal(typeof pair?.ru,'string',key+'.ru');
      assert.equal(typeof pair?.en,'string',key+'.en');
      assert.ok(pair.ru.trim(),key+'.ru');
      assert.ok(pair.en.trim(),key+'.en');
    }
  }
});

test('old-boundary source metadata and accessibility text contain no forbidden challenge/result semantics',()=>{
  const slot=slots.slots[boundaryId];
  const svg=readFileSync(slot.static.src,'utf8');
  const binding=localization.bindings[boundaryId];
  const text=[
    svg,
    slot.static.alt,
    localization.strings[binding.altKey].ru,
    localization.strings[binding.altKey].en,
    localization.strings[binding.captionKey].ru,
    localization.strings[binding.captionKey].en
  ].join('\n');

  assert.doesNotMatch(text,/\b(?:hunter|token|gate|gateway|arch|challenge|reward|success|failure)\b/i);
  assert.doesNotMatch(text,/(?:охотник|токен|жетон|ворот|арка|испытани|награ|успех|провал)/i);
});

test('route-specific candidate slots change presentation only',()=>{
  const serialized=JSON.stringify({slots,localization});
  assert.doesNotMatch(serialized,/"(?:conditions|effects|rewards|reward|energy|eligibility|rng|save|outcome)"\s*:/i);
});
