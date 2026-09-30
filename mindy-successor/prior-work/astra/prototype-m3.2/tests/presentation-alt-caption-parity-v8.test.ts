import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

import {catalog} from './helpers.ts';

const presentation=JSON.parse(readFileSync('content/presentation.json','utf8'));
const localization=JSON.parse(readFileSync('content/localization.json','utf8')).strings;
const manifest=JSON.parse(readFileSync('content/presentation-drafts/presentation-hardening-v8-manifest-v1.json','utf8'));

function bilingual(key:string){
  const value=localization[key];
  assert.ok(value?.ru?.trim(),key+' ru');
  assert.ok(value?.en?.trim(),key+' en');
}

test('all active queue-v8 semantic presentation surfaces have RU/EN alt-caption parity',()=>{
  const selected=manifest.semanticSlots.filter((entry:any)=>entry.reachability==='active-current-main');
  assert.equal(selected.length,47);
  for(const entry of selected){
    const slot=presentation.slots?.[entry.presentationId];
    assert.ok(slot?.static,entry.presentationId);
    assert.equal(slot.static.altKey,entry.altKey,entry.presentationId+' alt key');
    assert.equal(entry.captionKey,entry.altKey.replace(/\.alt$/,'.caption'),entry.presentationId+' caption key');
    bilingual(entry.altKey);
    bilingual(entry.captionKey);
  }
});

test('all eight School teacher media surfaces have active RU/EN alt-caption fallback',()=>{
  assert.equal(manifest.teacherMediaSurfaces.length,8);
  for(const entry of manifest.teacherMediaSurfaces){
    assert.equal(entry.localeAltState,'active-current-main',entry.mediaId+' alt state');
    assert.equal(entry.localeCaptionState,'active-current-main',entry.mediaId+' caption state');
    bilingual(entry.preparedAltKey);
    bilingual(entry.preparedCaptionKey);
  }
});

test('catalog fallback media used by queue-v8 surfaces have RU/EN alt-caption parity',()=>{
  const media=new Map(catalog.media.map(item=>[item.id,item]));
  assert.equal(manifest.fallbackMediaSurfaces.length,9);
  for(const entry of manifest.fallbackMediaSurfaces){
    const current=media.get(entry.mediaId);
    assert.ok(current,'missing fallback media '+entry.mediaId);
    assert.equal(current.src,entry.sourceAsset,entry.mediaId+' source');
    bilingual(entry.altKey);
    bilingual(entry.captionKey);
  }
});
