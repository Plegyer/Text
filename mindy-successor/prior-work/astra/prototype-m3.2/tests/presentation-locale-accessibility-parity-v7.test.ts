import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const presentation=JSON.parse(readFileSync('content/presentation.json','utf8'));
const localization=JSON.parse(readFileSync('content/localization.json','utf8')).strings;
const manifest=JSON.parse(readFileSync('content/presentation-drafts/presentation-production-binding-v7-manifest-v1.json','utf8'));

function bilingual(key:string){
  const value=localization[key];
  assert.ok(value?.ru?.trim(),key+' ru');
  assert.ok(value?.en?.trim(),key+' en');
}

test('queue-v7 active semantic bindings have RU/EN alt and caption parity',()=>{
  const groups=[
    manifest.preparedVsActive.endings,
    manifest.preparedVsActive.forest,
    manifest.preparedVsActive.poverty,
    manifest.preparedVsActive.schoolCourses
  ];
  const selected=groups.flat();
  assert.equal(selected.length,46);

  for(const entry of selected){
    const slot=presentation.slots?.[entry.presentationId];
    assert.ok(slot?.static,entry.presentationId);
    assert.equal(slot.static.src,entry.sourceAsset,entry.presentationId+' source');
    assert.equal(slot.static.altKey,entry.altKey,entry.presentationId+' alt key');
    assert.equal(entry.captionKey,entry.altKey.replace(/\.alt$/,'.caption'),entry.presentationId+' caption key');
    assert.equal(entry.altKey.startsWith('presentation.prepared.'),false,entry.presentationId+' prepared namespace');
    bilingual(entry.altKey);
    bilingual(entry.captionKey);
  }
});

test('all eight current School teacher media surfaces have bilingual localized alt and caption fallback',()=>{
  const rows=manifest.packages.schoolTeacherFallback;
  assert.equal(rows.length,8);
  for(const entry of rows){
    assert.equal(entry.altKey,`media.${entry.mediaId}.alt`);
    assert.equal(entry.captionKey,`media.${entry.mediaId}.caption`);
    bilingual(entry.altKey);
    bilingual(entry.captionKey);
  }
});

test('locked-career presentation help remains bilingual',()=>{
  bilingual('ui.work.lockedCareerHelp');
  bilingual('ui.work.lockedCareerAria');
});
