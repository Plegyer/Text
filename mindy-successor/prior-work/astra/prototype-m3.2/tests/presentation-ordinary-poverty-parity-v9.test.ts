import test from 'node:test';
import assert from 'node:assert/strict';
import {existsSync,readFileSync} from 'node:fs';

import {applyPresentation,presentationSlots,resolvePresentation} from '../src/core/presentation.ts';
import {catalog} from './helpers.ts';

const presentation=JSON.parse(readFileSync('content/presentation.json','utf8'));
const localization=JSON.parse(readFileSync('content/localization.json','utf8')).strings;
const manifest=JSON.parse(readFileSync('content/presentation-drafts/presentation-hardening-v9-manifest-v1.json','utf8'));

test('ordinary-poverty event/variant semantic presentation coverage remains exact and bilingual',()=>{
  const rows=manifest.ordinaryPovertyParity.currentSemanticIds;
  assert.equal(rows.length,20);
  assert.deepEqual(
    manifest.ordinaryPovertyParity.familyCounts,
    {'street-v1':3,'street-v2':6,'cheap-v1':1,'cheap-v2':4,recovery:3,pressure:3}
  );
  const registry=new Set(presentationSlots(catalog).map(slot=>slot.id));
  const checked=applyPresentation(catalog,presentation);
  for(const row of rows){
    assert.ok(registry.has(row.presentationId),row.presentationId);
    assert.ok(row.presentationId.startsWith('location/town/event/poverty-'),row.presentationId);
    assert.doesNotMatch(row.presentationId,/secret|debt/i);
    const slot=presentation.slots?.[row.presentationId];
    assert.ok(slot?.static,row.presentationId);
    assert.equal(slot.static.src,row.sourceAsset,row.presentationId);
    assert.equal(slot.static.altKey,row.altKey,row.presentationId);
    assert.ok(existsSync(row.sourceAsset),row.sourceAsset);
    for(const locale of ['ru','en']){
      assert.ok(localization[row.altKey]?.[locale]?.trim(),row.altKey+' '+locale);
      assert.ok(localization[row.captionKey]?.[locale]?.trim(),row.captionKey+' '+locale);
    }
    const resolved=resolvePresentation(checked,presentation,row.presentationId,{animationsEnabled:false,occurrenceKey:'poverty-v9'});
    assert.equal(resolved.selected?.src,row.sourceAsset,row.presentationId);
    assert.equal(resolved.textOnly,false,row.presentationId);
  }
});

test('ordinary poverty presentation manifest keeps Secret Debt outside the audited domain',()=>{
  assert.equal(manifest.ordinaryPovertyParity.secretDebtRows,0);
  assert.equal(manifest.ordinaryPovertyParity.secretDebtBoundary,'separate');
  assert.equal(manifest.invariants.secretDebtExcludedFromOrdinaryPoverty,true);
});
