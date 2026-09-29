import test from 'node:test';
import assert from 'node:assert/strict';
import {existsSync,readFileSync} from 'node:fs';

import {applyPresentation,presentationSchema,presentationSlots,resolvePresentation} from '../src/core/presentation.ts';
import {catalog} from './helpers.ts';

const manifest=JSON.parse(readFileSync('content/presentation-drafts/lumber-presentation-source-manifest-v1.json','utf8'));
const presentation=JSON.parse(readFileSync('content/presentation.json','utf8'));
const localization=JSON.parse(readFileSync('content/localization.json','utf8')).strings;

test('Lumber presentation source manifest has unique known semantic slots with exact project-owned static bindings',()=>{
  presentationSchema.parse(presentation);
  assert.equal(manifest.validation.expectedSelectedSlots,manifest.slots.length);
  assert.equal(manifest.summary.selectedSlots,manifest.slots.length);
  const known=new Set(presentationSlots(catalog).map(slot=>slot.id));
  const ids=new Set<string>();
  for(const entry of manifest.slots){
    assert.equal(ids.has(entry.presentationId),false,'duplicate '+entry.presentationId);
    ids.add(entry.presentationId);
    assert.ok(known.has(entry.presentationId),'unknown '+entry.presentationId);
    assert.equal(entry.sourceKind,'static',entry.presentationId);
    assert.equal(entry.animationSource,null,entry.presentationId);
    assert.equal(entry.fallbackRequired,true,entry.presentationId);
    assert.match(entry.sourceAsset,/^assets\/presentation\/[a-z0-9-]+\.svg$/,entry.presentationId);
    const slot=presentation.slots?.[entry.presentationId];
    assert.ok(slot?.static,entry.presentationId);
    assert.equal(slot.static.src,entry.sourceAsset,entry.presentationId);
    assert.equal(slot.static.altKey,entry.altKey,entry.presentationId+' altKey');
    assert.equal(entry.captionKey,entry.altKey.replace(/\.alt$/,'.caption'),entry.presentationId+' captionKey');
    assert.ok(existsSync(entry.sourceAsset),entry.sourceAsset);
    assert.ok(existsSync('dist/'+entry.sourceAsset),'dist/'+entry.sourceAsset);
    assert.equal(readFileSync('dist/'+entry.sourceAsset,'utf8'),readFileSync(entry.sourceAsset,'utf8'),entry.sourceAsset+' build copy');
    for(const key of [entry.altKey,entry.captionKey]){
      assert.ok(localization[key]?.ru?.trim(),key+' ru');
      assert.ok(localization[key]?.en?.trim(),key+' en');
    }
  }
});

test('selected Lumber presentation always resolves to its static source with animations on or off',()=>{
  const checked=applyPresentation(catalog,presentation);
  for(const entry of manifest.slots){
    const on=resolvePresentation(checked,presentation,entry.presentationId,{animationsEnabled:true,occurrenceKey:'manifest-validator'});
    const off=resolvePresentation(checked,presentation,entry.presentationId,{animationsEnabled:false,occurrenceKey:'manifest-validator'});
    assert.equal(on.textOnly,false,entry.presentationId+' on');
    assert.equal(off.textOnly,false,entry.presentationId+' off');
    assert.equal(on.selected?.src,entry.sourceAsset,entry.presentationId+' on');
    assert.equal(off.selected?.src,entry.sourceAsset,entry.presentationId+' off');
  }
});

test('Lumber manifest ships no stale dynamic paths and preserves presentation-only invariants',()=>{
  assert.equal(manifest.gameplayMutation,false);
  assert.equal(manifest.invariants.noGameplayFieldsChanged,true);
  assert.equal(manifest.invariants.noSaveOrRngMutation,true);
  assert.equal(manifest.summary.selectedSlotsWithStaticSource,manifest.slots.length);
  assert.equal(manifest.summary.selectedSlotsWithAnimationSource,0);
  const serialized=JSON.stringify(manifest);
  assert.doesNotMatch(serialized,/assets\/lumber\//);
  assert.doesNotMatch(serialized,/\.(?:gif|mp4|webm)"/);
});
