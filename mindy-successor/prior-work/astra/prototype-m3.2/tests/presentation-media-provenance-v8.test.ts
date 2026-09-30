import test from 'node:test';
import assert from 'node:assert/strict';
import {existsSync,readFileSync} from 'node:fs';

import {presentationSlots} from '../src/core/presentation.ts';
import {catalog} from './helpers.ts';

const manifest=JSON.parse(readFileSync('content/presentation-drafts/presentation-hardening-v8-manifest-v1.json','utf8'));
const registry=new Set(presentationSlots(catalog).map(slot=>slot.id));
const media=new Map(catalog.media.map(item=>[item.id,item]));

test('every active queue-v8 semantic source is project-owned, present and attached to a live semantic ID',()=>{
  const selected=manifest.semanticSlots.filter((entry:any)=>entry.reachability==='active-current-main');
  assert.equal(selected.length,47);
  for(const entry of selected){
    assert.ok(registry.has(entry.presentationId),'dead semantic ID '+entry.presentationId);
    assert.match(entry.sourceAsset,/^assets\/[a-zA-Z0-9/_-]+\.(?:svg|png|jpg|jpeg|webp)$/);
    assert.ok(existsSync(entry.sourceAsset),'missing source '+entry.sourceAsset);
    const built='dist/'+entry.sourceAsset;
    assert.ok(existsSync(built),'missing built source '+built);
    assert.deepEqual(readFileSync(built),readFileSync(entry.sourceAsset),'dist/source mismatch '+entry.sourceAsset);
  }
});

test('every queue-v8 teacher media source is project-owned, present and attached to a live media identity',()=>{
  assert.equal(manifest.teacherMediaSurfaces.length,8);
  for(const entry of manifest.teacherMediaSurfaces){
    const current=media.get(entry.mediaId);
    assert.ok(current,'dead media ID '+entry.mediaId);
    assert.equal(current.src,entry.sourceAsset,entry.mediaId+' source');
    assert.match(entry.sourceAsset,/^assets\/[a-zA-Z0-9/_-]+\.(?:svg|png|jpg|jpeg|webp)$/);
    assert.ok(existsSync(entry.sourceAsset),'missing teacher source '+entry.sourceAsset);
    const built='dist/'+entry.sourceAsset;
    assert.ok(existsSync(built),'missing built teacher source '+built);
    assert.deepEqual(readFileSync(built),readFileSync(entry.sourceAsset),'teacher dist/source mismatch '+entry.sourceAsset);
  }
});

test('provenance manifest covers every active queue-v8 source use',()=>{
  const bySource=new Map<string,any>(manifest.projectOwnedSources.map((entry:any)=>[entry.sourceAsset,entry]));
  for(const entry of manifest.semanticSlots){
    assert.ok(bySource.get(entry.sourceAsset)?.semanticIds.includes(entry.presentationId),entry.presentationId);
  }
  for(const entry of manifest.teacherMediaSurfaces){
    assert.ok(bySource.get(entry.sourceAsset)?.mediaIds.includes(entry.mediaId),entry.mediaId);
  }
});
