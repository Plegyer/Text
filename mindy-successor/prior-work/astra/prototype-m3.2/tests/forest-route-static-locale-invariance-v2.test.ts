import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const slots=JSON.parse(
  readFileSync('content/presentation-drafts/forest-route-static-slots-v2.json','utf8')
);
const localization=JSON.parse(
  readFileSync('content/presentation-drafts/forest-route-static-localization-v4.json','utf8')
);

const routeIds=[
  'activity/forest/route/logging-road',
  'activity/forest/route/old-boundary'
];

function localizedProjection(id:string,locale:'ru'|'en'){
  const slot=slots.slots[id];
  const binding=localization.bindings[id];
  return {
    presentationId:id,
    src:slot.static.src,
    kind:slot.static.kind,
    altKey:slot.static.altKey,
    captionKey:binding.captionKey,
    fallbackId:slot.fallbackId,
    alt:localization.strings[binding.altKey][locale],
    caption:localization.strings[binding.captionKey][locale]
  };
}

test('Forest route-specific static identity and fallback are locale-neutral',()=>{
  for(const id of routeIds){
    const ru=localizedProjection(id,'ru');
    const en=localizedProjection(id,'en');

    assert.equal(ru.presentationId,en.presentationId,id);
    assert.equal(ru.src,en.src,id);
    assert.equal(ru.kind,en.kind,id);
    assert.equal(ru.altKey,en.altKey,id);
    assert.equal(ru.captionKey,en.captionKey,id);
    assert.equal(ru.fallbackId,en.fallbackId,id);

    assert.equal(ru.fallbackId,'activity/forest/route/default',id);
    assert.doesNotMatch(ru.src,/(?:^|\/)(?:ru|en)(?:\/|[-_.])/i,id);
  }
});

test('only localized alt/caption text changes between RU and EN projections',()=>{
  for(const id of routeIds){
    const ru=localizedProjection(id,'ru');
    const en=localizedProjection(id,'en');

    const stableRu={...ru,alt:'<localized>',caption:'<localized>'};
    const stableEn={...en,alt:'<localized>',caption:'<localized>'};
    assert.deepEqual(stableRu,stableEn,id);

    assert.notEqual(ru.alt,en.alt,id+' alt should be localized');
    assert.notEqual(ru.caption,en.caption,id+' caption should be localized');
    assert.ok(ru.alt.trim()&&en.alt.trim(),id+' alt');
    assert.ok(ru.caption.trim()&&en.caption.trim(),id+' caption');
  }
});

test('locale data cannot select another Forest route asset',()=>{
  const serialized=JSON.stringify(localization);
  assert.doesNotMatch(serialized,/"(?:src|asset|media|fallbackId)"\s*:/i);

  for(const id of routeIds){
    const expected=slots.slots[id].static.src;
    assert.equal(localizedProjection(id,'ru').src,expected,id);
    assert.equal(localizedProjection(id,'en').src,expected,id);
  }
});
