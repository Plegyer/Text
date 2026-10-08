import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const localization=JSON.parse(readFileSync('content/localization.json','utf8')).strings;
const manifest=JSON.parse(readFileSync('content/presentation-drafts/presentation-hardening-v9-manifest-v1.json','utf8'));

function bilingual(key:string){
  assert.ok(localization[key]?.ru?.trim(),key+' ru');
  assert.ok(localization[key]?.en?.trim(),key+' en');
}

test('all queue-v9 active exact semantic surfaces have RU/EN alt-caption parity',()=>{
  const rows=manifest.reachability.activeExact;
  assert.equal(rows.length,101);
  for(const row of rows){
    bilingual(row.altKey);
    bilingual(row.captionKey);
  }
  assert.equal(manifest.localeAccessibility.activeExactSemanticBindings.complete,101);
});

test('all eight School teacher media surfaces have RU/EN alt-caption parity',()=>{
  const rows=manifest.schoolParity.courseRows;
  assert.equal(rows.length,8);
  for(const row of rows){
    bilingual(row.teacherAltKey);
    bilingual(row.teacherCaptionKey);
  }
  assert.equal(manifest.localeAccessibility.schoolTeacherMedia.complete,8);
});

test('presentation help and disabled-state accessibility strings are bilingual',()=>{
  const keys=manifest.localeAccessibility.helpKeys;
  assert.equal(keys.length,5);
  for(const key of keys)bilingual(key);
  assert.equal(manifest.localeAccessibility.helpComplete,5);
});

test('shared town fallback locale package is explicitly classified as predecessor prepared work',()=>{
  const fallback=manifest.localeAccessibility.fallbackRoot;
  assert.equal(fallback.presentationId,'location/town/default');
  assert.equal(fallback.mediaId,'stage.town');
  if(fallback.currentMainState==='active'){
    bilingual(fallback.altKey);
    bilingual(fallback.captionKey);
  }else{
    assert.equal(fallback.currentMainState,'prepared-in-pr136-not-current-main');
    assert.equal(localization[fallback.altKey],undefined);
    assert.equal(localization[fallback.captionKey],undefined);
  }
});
