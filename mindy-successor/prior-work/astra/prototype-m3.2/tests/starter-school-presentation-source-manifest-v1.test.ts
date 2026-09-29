import test from 'node:test';
import assert from 'node:assert/strict';
import {existsSync,readFileSync} from 'node:fs';

import {applyPresentation,presentationSchema,presentationSlots,resolvePresentation} from '../src/core/presentation.ts';
import {catalog} from './helpers.ts';

const manifest=JSON.parse(readFileSync('content/presentation-drafts/starter-school-presentation-source-manifest-v1.json','utf8'));
const presentation=JSON.parse(readFileSync('content/presentation.json','utf8'));
const localization=JSON.parse(readFileSync('content/localization.json','utf8')).strings;

test('starter/School manifest semantic IDs are unique, known and have exact static bindings',()=>{
  presentationSchema.parse(presentation);
  const known=new Set(presentationSlots(catalog).map(slot=>slot.id));
  const ids=new Set<string>();
  assert.equal(manifest.summary.semanticSlots,manifest.slots.length);
  for(const entry of manifest.slots){
    assert.equal(ids.has(entry.presentationId),false,'duplicate '+entry.presentationId);
    ids.add(entry.presentationId);
    assert.ok(known.has(entry.presentationId),'unknown '+entry.presentationId);
    assert.equal(entry.sourceKind,'static',entry.presentationId);
    assert.equal(entry.animationSource,null,entry.presentationId);
    assert.equal(entry.fallbackRequired,true,entry.presentationId);
    assert.match(entry.sourceAsset,/^assets\/(?:presentation\/)?[a-z0-9-]+\.svg$/,entry.presentationId);
    const slot=presentation.slots?.[entry.presentationId];
    assert.ok(slot?.static,entry.presentationId);
    assert.equal(slot.static.src,entry.sourceAsset,entry.presentationId);
    assert.equal(slot.static.altKey,entry.altKey,entry.presentationId+' altKey');
    assert.equal(entry.captionKey,entry.altKey.replace(/\.alt$/,'.caption'),entry.presentationId+' captionKey');
    assert.ok(localization[entry.altKey]?.ru?.trim(),entry.altKey+' ru');
    assert.ok(localization[entry.altKey]?.en?.trim(),entry.altKey+' en');
    assert.ok(localization[entry.captionKey]?.ru?.trim(),entry.captionKey+' ru');
    assert.ok(localization[entry.captionKey]?.en?.trim(),entry.captionKey+' en');
    assert.ok(existsSync(entry.sourceAsset),entry.sourceAsset);
    assert.ok(existsSync('dist/'+entry.sourceAsset),'dist/'+entry.sourceAsset);
    assert.equal(readFileSync('dist/'+entry.sourceAsset,'utf8'),readFileSync(entry.sourceAsset,'utf8'),entry.sourceAsset+' build copy');
  }
});

test('manifest semantic slots resolve to static sources with animations on and off',()=>{
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

test('existing School teacher media surfaces remain unique valid static fallbacks',()=>{
  const ids=new Set<string>();
  assert.equal(manifest.summary.teacherMediaSurfaces,manifest.mediaSurfaces.length);
  for(const entry of manifest.mediaSurfaces){
    assert.equal(ids.has(entry.mediaId),false,'duplicate '+entry.mediaId);
    ids.add(entry.mediaId);
    assert.equal(entry.staticFallbackPresent,true,entry.mediaId);
    const media=catalog.media.find(item=>item.id===entry.mediaId);
    assert.ok(media,entry.mediaId);
    assert.equal(media.kind,'image',entry.mediaId);
    assert.equal(media.src,entry.sourceAsset,entry.mediaId);
    assert.ok(media.alt.trim(),entry.mediaId+' alt');
    assert.ok(existsSync(entry.sourceAsset),entry.sourceAsset);
    assert.ok(existsSync('dist/'+entry.sourceAsset),'dist/'+entry.sourceAsset);
  }
});

test('manifest preserves Presentation/Media ownership boundaries',()=>{
  assert.equal(manifest.gameplayMutation,false);
  assert.equal(manifest.invariants.existingSemanticIdsOnly,true);
  assert.equal(manifest.invariants.noGameplayFieldsChanged,true);
  assert.equal(manifest.invariants.noSaveOrRngMutation,true);
  assert.equal(manifest.summary.animationSources,0);
});
