import test from 'node:test';
import assert from 'node:assert/strict';
import {existsSync,readFileSync} from 'node:fs';

import {presentationIdForEnding,resolvePresentation,applyPresentation,presentationSlots} from '../src/core/presentation.ts';
import {catalog} from './helpers.ts';

const presentation=JSON.parse(readFileSync('content/presentation.json','utf8'));
const localization=JSON.parse(readFileSync('content/localization.json','utf8')).strings;
const manifest=JSON.parse(readFileSync('content/presentation-drafts/presentation-hardening-v9-manifest-v1.json','utf8'));

test('all existing ending semantic IDs have exact static RU/EN presentation parity',()=>{
  const rows=manifest.endingParity.existingEndingPresentationIds;
  assert.equal(rows.length,9);
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
    const resolved=resolvePresentation(checked,presentation,row.presentationId,{animationsEnabled:false,occurrenceKey:'ending-parity-v9'});
    assert.equal(resolved.selected?.src,row.sourceAsset,row.presentationId);
    assert.equal(resolved.selected?.kind,'image',row.presentationId);
  }
});

test('current ending definitions map only to the audited existing semantic IDs',()=>{
  const audited=new Set(manifest.endingParity.existingEndingPresentationIds.map((row:any)=>row.presentationId));
  assert.equal(catalog.definitions.endings.length,9);
  for(const ending of catalog.definitions.endings){
    const id=presentationIdForEnding(ending.id);
    assert.ok(audited.has(id),ending.id+' -> '+id);
  }
});

test('historical v9 committed-state classification does not override current live presentation coverage',()=>{
  assert.equal(manifest.endingParity.committedState.engineState,'ending_committed');
  assert.equal(manifest.endingParity.committedState.semanticIdPreserved,true);
  assert.equal(manifest.endingParity.committedState.distinctLocalizedUiLabel,'prepared-in-pr136-not-current-main');
  assert.ok(localization['ui.run.endingCommitted']?.ru?.trim());
  assert.ok(localization['ui.run.endingCommitted']?.en?.trim());
});
