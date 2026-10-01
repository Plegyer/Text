import test from 'node:test';
import assert from 'node:assert/strict';
import {existsSync,readFileSync} from 'node:fs';

import {applyPresentation,resolvePresentation} from '../src/core/presentation.ts';
import {catalog} from './helpers.ts';

const presentation=JSON.parse(readFileSync('content/presentation.json','utf8'));
const manifest=JSON.parse(readFileSync('content/presentation-drafts/presentation-hardening-v9-manifest-v1.json','utf8'));
const animationSources=JSON.parse(readFileSync('content/presentation-drafts/project-owned-animation-source-manifest-v4.json','utf8'));

test('current production limits active dynamic bindings to starter-career pools with static fallbacks',()=>{
  const dynamic=Object.entries<any>(presentation.slots??{}).filter(([,slot])=>slot.primary||slot.pool);
  assert.equal(dynamic.length,10);
  for(const [id,slot] of dynamic){
    assert.match(id,/^job\/(?:satyr-maid|undead-farm)\/(?:shift\/(?:spring|summer|autumn|winter)\/default|result\/default)$/);
    assert.equal(slot.primary,undefined,id);
    assert.equal(slot.pool?.candidates.length,3,id);
    assert.ok(slot.static,id+' static fallback');
  }
});

test('animation-off resolution is deterministic and static for every queue-v9 active binding',()=>{
  const checked=applyPresentation(catalog,presentation);
  const selected=manifest.reachability.activeExact;
  assert.equal(selected.length,102);
  for(const entry of selected){
    const a=resolvePresentation(checked,presentation,entry.presentationId,{animationsEnabled:false,occurrenceKey:'reduced-motion-v9'});
    const b=resolvePresentation(checked,presentation,entry.presentationId,{animationsEnabled:false,occurrenceKey:'reduced-motion-v9'});
    assert.equal(a.textOnly,false,entry.presentationId);
    assert.equal(a.selected?.kind,'image',entry.presentationId);
    assert.equal(a.selected?.src,entry.sourceAsset,entry.presentationId);
    assert.deepEqual(
      a.candidates.map(item=>[item.kind,item.src,item.slotId]),
      b.candidates.map(item=>[item.kind,item.src,item.slotId]),
      entry.presentationId
    );
  }
});

test('prepared animation sources remain source-only and declare live static fallbacks',()=>{
  assert.equal(animationSources.summary.validatedSequences,9);
  assert.equal(animationSources.summary.actualGifPaths,0);
  for(const sequence of animationSources.sequences){
    assert.equal(sequence.gifPath,null,sequence.sequenceKey);
    assert.ok(existsSync(sequence.staticFallback),sequence.staticFallback);
    const slot=presentation.slots?.[sequence.presentationId];
    assert.ok(slot?.static,sequence.presentationId);
    assert.equal(slot.static.src,sequence.staticFallback,sequence.presentationId);
    assert.equal(sequence.frames.length,4,sequence.sequenceKey);
    for(const frame of sequence.frames)assert.ok(existsSync(frame),frame);
  }
});
