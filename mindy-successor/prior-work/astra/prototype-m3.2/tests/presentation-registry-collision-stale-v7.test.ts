import test from 'node:test';
import assert from 'node:assert/strict';
import {existsSync,readFileSync} from 'node:fs';

import {presentationIdForEnding,presentationSchema,presentationSlots} from '../src/core/presentation.ts';
import {catalog} from './helpers.ts';

const presentation=JSON.parse(readFileSync('content/presentation.json','utf8'));
const manifest=JSON.parse(readFileSync('content/presentation-drafts/presentation-production-binding-v7-manifest-v1.json','utf8'));

const selected=[
  ...manifest.preparedVsActive.endings,
  ...manifest.preparedVsActive.forest,
  ...manifest.preparedVsActive.poverty,
  ...manifest.preparedVsActive.schoolCourses
];

test('queue-v7 selected semantic IDs are unique, live, exact-bound and source-backed',()=>{
  presentationSchema.parse(presentation);
  assert.equal(selected.length,46);
  const ids=selected.map((entry:any)=>entry.presentationId);
  assert.equal(new Set(ids).size,ids.length,'duplicate selected semantic ID');

  const registry=new Map(presentationSlots(catalog).map(slot=>[slot.id,slot]));
  for(const entry of selected){
    const semantic=registry.get(entry.presentationId);
    assert.ok(semantic,'dead semantic ID '+entry.presentationId);
    assert.equal(semantic.fallbackId,entry.fallbackId,entry.presentationId+' fallback');

    const slot=presentation.slots?.[entry.presentationId];
    assert.ok(slot?.static,entry.presentationId+' exact static');
    assert.equal(slot.static.src,entry.sourceAsset,entry.presentationId+' source');
    assert.equal(slot.static.altKey,entry.altKey,entry.presentationId+' altKey');
    assert.ok(existsSync(entry.sourceAsset),entry.presentationId+' source exists');
  }
});

test('queue-v7 inventory contains no stale prepared-only binding',()=>{
  assert.deepEqual(manifest.preparedOnly,[]);
  for(const group of ['endings','forest','poverty','schoolCourses']){
    for(const entry of manifest.preparedVsActive[group]){
      assert.equal(entry.bindingState,'active-current-main',entry.presentationId);
      assert.equal(entry.exactProductionBinding,true,entry.presentationId);
    }
  }
});

test('queue-v7 teacher media package has unique live media identities and existing sources',()=>{
  const rows=manifest.packages.schoolTeacherFallback;
  const ids=rows.map((entry:any)=>entry.mediaId);
  assert.equal(new Set(ids).size,ids.length,'duplicate teacher media ID');
  const media=new Map(catalog.media.map(item=>[item.id,item]));
  for(const entry of rows){
    const current=media.get(entry.mediaId);
    assert.ok(current,'dead teacher media '+entry.mediaId);
    assert.equal(current.src,entry.sourceAsset,entry.mediaId+' source');
    assert.ok(existsSync(entry.sourceAsset),entry.sourceAsset);
  }
});

test('all current gameplay ending identities map to one live presentation slot without collision; audited legacy endings stay exact-static',()=>{
  const endingEntries=manifest.packages.endingGapAudit;
  const definitionIds=new Set(catalog.definitions.endings.map(ending=>ending.id));
  const registry=new Map(presentationSlots(catalog).map(slot=>[slot.id,slot]));
  const currentPresentationIds=catalog.definitions.endings.map(ending=>presentationIdForEnding(ending.id));
  assert.equal(new Set(currentPresentationIds).size,currentPresentationIds.length,'ending presentation collision');
  for(const id of currentPresentationIds)assert.ok(registry.has(id),'missing live ending presentation '+id);
  for(const entry of endingEntries){
    assert.ok(definitionIds.has(entry.endingId),'missing ending definition '+entry.endingId);
    assert.equal(entry.exactStatic,true,entry.presentationId);
    assert.ok(presentation.slots?.[entry.presentationId]?.static,entry.presentationId);
  }
  assert.equal(endingEntries.length,8);
});
