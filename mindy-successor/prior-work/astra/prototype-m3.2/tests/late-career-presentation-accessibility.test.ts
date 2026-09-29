import test from 'node:test';
import assert from 'node:assert/strict';
import {existsSync,readFileSync} from 'node:fs';

import {applyPresentation,presentationSchema,resolvePresentation} from '../src/core/presentation.ts';
import {catalog} from './helpers.ts';

const presentation=JSON.parse(readFileSync('content/presentation.json','utf8'));
const localization=JSON.parse(readFileSync('content/localization.json','utf8')).strings;
const manifest=JSON.parse(readFileSync('content/presentation-drafts/late-career-presentation-source-manifest-v1.json','utf8'));

test('late-career slots have RU/EN alt and caption parity plus safe static fallback',()=>{
  presentationSchema.parse(presentation);
  assert.equal(manifest.slots.length,35);
  const checked=applyPresentation(catalog,presentation);
  for(const entry of manifest.slots){
    const slot=presentation.slots?.[entry.presentationId];
    assert.ok(slot?.static,entry.presentationId);
    assert.equal(slot.static.kind,'image',entry.presentationId);
    assert.equal(slot.static.src,entry.sourceAsset,entry.presentationId);
    assert.equal(slot.static.altKey,entry.altKey,entry.presentationId+' altKey');
    assert.equal(entry.captionKey,entry.altKey.replace(/\.alt$/,'.caption'),entry.presentationId+' captionKey');
    assert.ok(localization[entry.altKey]?.ru?.trim(),entry.altKey+' ru');
    assert.ok(localization[entry.altKey]?.en?.trim(),entry.altKey+' en');
    assert.ok(localization[entry.captionKey]?.ru?.trim(),entry.captionKey+' ru');
    assert.ok(localization[entry.captionKey]?.en?.trim(),entry.captionKey+' en');
    assert.ok(existsSync(entry.sourceAsset),entry.sourceAsset);
    const on=resolvePresentation(checked,presentation,entry.presentationId,{animationsEnabled:true,occurrenceKey:'late-career-accessibility'});
    const off=resolvePresentation(checked,presentation,entry.presentationId,{animationsEnabled:false,occurrenceKey:'late-career-accessibility'});
    assert.equal(on.textOnly,false,entry.presentationId+' on');
    assert.equal(off.textOnly,false,entry.presentationId+' off');
    assert.equal(on.selected?.src,entry.sourceAsset,entry.presentationId+' on');
    assert.equal(off.selected?.src,entry.sourceAsset,entry.presentationId+' off');
  }
});

test('professional-career coverage stays explicitly non-explicit',()=>{
  const professional=manifest.slots.filter((entry:any)=>entry.domain==='prostitute');
  assert.equal(professional.length,5);
  assert.equal(manifest.accessibility.prostituteCoverage,'non-explicit');
  for(const entry of professional){
    assert.match(entry.safetyClass,/^non-explicit-/);
    const ru=localization[entry.altKey]?.ru??'';
    const en=localization[entry.altKey]?.en??'';
    assert.match(ru,/неэксплицит/i);
    assert.match(en,/non-explicit/i);
  }
});
