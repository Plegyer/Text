import test from 'node:test';
import assert from 'node:assert/strict';
import {existsSync,readFileSync} from 'node:fs';

import {applyPresentation,presentationSchema,resolvePresentation} from '../src/core/presentation.ts';
import {catalog} from './helpers.ts';

const presentation=JSON.parse(readFileSync('content/presentation.json','utf8'));
const localization=JSON.parse(readFileSync('content/localization.json','utf8')).strings;
const manifest=JSON.parse(readFileSync('content/presentation-drafts/starter-school-presentation-source-manifest-v1.json','utf8'));

test('selected starter-career presentation has bilingual accessibility and safe static fallback',()=>{
  presentationSchema.parse(presentation);
  const selected=manifest.slots.filter((entry:any)=>manifest.accessibility.starterCareerDomains.includes(entry.domain));
  assert.equal(selected.length,15);
  const checked=applyPresentation(catalog,presentation);
  for(const entry of selected){
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
    const on=resolvePresentation(checked,presentation,entry.presentationId,{animationsEnabled:true,occurrenceKey:'starter-accessibility'});
    const off=resolvePresentation(checked,presentation,entry.presentationId,{animationsEnabled:false,occurrenceKey:'starter-accessibility'});
    if(slot.pool){
      assert.equal(on.selected?.source,'override-pool',entry.presentationId+' on source');
      assert.ok(slot.pool.candidates.some((candidate:any)=>candidate.src===on.selected?.src),entry.presentationId+' on pool member');
      assert.ok(on.selected?.altKey&&localization[on.selected.altKey]?.ru?.trim(),entry.presentationId+' pool alt ru');
      assert.ok(on.selected?.altKey&&localization[on.selected.altKey]?.en?.trim(),entry.presentationId+' pool alt en');
    }else{
      assert.equal(on.selected?.src,entry.sourceAsset,entry.presentationId+' on');
    }
    assert.equal(off.selected?.src,entry.sourceAsset,entry.presentationId+' off');
  }
});
