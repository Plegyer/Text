import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

import {applyPresentation,presentationSchema,presentationSlots,resolvePresentation} from '../src/core/presentation.ts';
import {catalog} from './helpers.ts';

const presentation=JSON.parse(readFileSync('content/presentation.json','utf8'));
const localization=JSON.parse(readFileSync('content/localization.json','utf8')).strings;

const expected=[
  ['lumber','career-lumber-result.svg'],
  ['satyr-maid','career-satyr-maid-result.svg'],
  ['undead-farm','career-undead-farm-result.svg']
] as const;

test('starter career results share one semantic presentation contract',()=>{
  presentationSchema.parse(presentation);
  const known=new Set(presentationSlots(catalog).map(slot=>slot.id));
  for(const [career,file] of expected){
    const id=`job/${career}/result/default`;
    assert.ok(known.has(id),id);
    const slot=presentation.slots[id];
    assert.ok(slot?.static,id);
    assert.equal(slot.static.kind,'image',id);
    assert.equal(slot.static.src,`assets/presentation/${file}`,id);
    assert.equal(slot.static.altKey,`presentation.static.career.${career}.result.alt`,id);
    const captionKey=`presentation.static.career.${career}.result.caption`;
    assert.ok(localization[slot.static.altKey]?.ru?.trim(),slot.static.altKey+' ru');
    assert.ok(localization[slot.static.altKey]?.en?.trim(),slot.static.altKey+' en');
    assert.ok(localization[captionKey]?.ru?.trim(),captionKey+' ru');
    assert.ok(localization[captionKey]?.en?.trim(),captionKey+' en');
  }
});

test('starter career result presentation is animation-mode independent',()=>{
  const checked=applyPresentation(catalog,presentation);
  for(const [career,file] of expected){
    const id=`job/${career}/result/default`;
    const on=resolvePresentation(checked,presentation,id,{animationsEnabled:true,occurrenceKey:'starter-result'});
    const off=resolvePresentation(checked,presentation,id,{animationsEnabled:false,occurrenceKey:'starter-result'});
    assert.equal(on.selected?.src,`assets/presentation/${file}`,id+' on');
    assert.equal(off.selected?.src,`assets/presentation/${file}`,id+' off');
    assert.equal(on.textOnly,false,id+' on');
    assert.equal(off.textOnly,false,id+' off');
  }
});
