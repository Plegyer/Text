import test from 'node:test';
import assert from 'node:assert/strict';
import {existsSync,readFileSync} from 'node:fs';

import {applyPresentation,presentationSlots,resolvePresentation} from '../src/core/presentation.ts';
import {catalog} from './helpers.ts';

const presentation=JSON.parse(readFileSync('content/presentation.json','utf8'));
const localization=JSON.parse(readFileSync('content/localization.json','utf8')).strings;
const manifest=JSON.parse(readFileSync('content/presentation-drafts/presentation-hardening-v9-manifest-v1.json','utf8'));

test('Forest route result and reaction semantic surfaces are exact and live',()=>{
  const rows=manifest.forestParity.currentSemanticIds;
  assert.equal(rows.length,10);
  assert.deepEqual(manifest.forestParity.counts,{route:3,result:3,reaction:4});
  const registry=new Set(presentationSlots(catalog).map(slot=>slot.id));
  const checked=applyPresentation(catalog,presentation);
  for(const row of rows){
    assert.ok(registry.has(row.presentationId),row.presentationId);
    const slot=presentation.slots?.[row.presentationId];
    assert.ok(slot?.static,row.presentationId);
    assert.equal(slot.static.src,row.sourceAsset,row.presentationId);
    assert.equal(slot.static.altKey,row.altKey,row.presentationId);
    assert.ok(existsSync(row.sourceAsset),row.sourceAsset);
    for(const locale of ['ru','en']){
      assert.ok(localization[row.altKey]?.[locale]?.trim(),row.altKey+' '+locale);
      assert.ok(localization[row.captionKey]?.[locale]?.trim(),row.captionKey+' '+locale);
    }
    const resolved=resolvePresentation(checked,presentation,row.presentationId,{animationsEnabled:false,occurrenceKey:'forest-parity-v9'});
    assert.equal(resolved.selected?.src,row.sourceAsset,row.presentationId);
    assert.equal(resolved.textOnly,false,row.presentationId);
  }
});

test('Forest cross-domain reaction IDs stay existing Lumber semantic identities',()=>{
  const reactions=manifest.forestParity.currentSemanticIds.filter((row:any)=>row.kind==='reaction');
  assert.equal(reactions.length,4);
  assert.ok(reactions.some((row:any)=>row.presentationId==='job/lumber/event/lumber-cross-activity-forest-return/default'));
  for(const row of reactions)assert.ok(row.presentationId.startsWith('job/lumber/event/'),row.presentationId);
  assert.equal(manifest.forestParity.gameplayMutation,false);
});
