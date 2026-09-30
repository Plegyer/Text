import test from 'node:test';
import assert from 'node:assert/strict';
import {existsSync,readFileSync} from 'node:fs';

import {freshSave} from '../src/core/engine.ts';
import {applyPresentation,presentationSlots,resolvePresentation} from '../src/core/presentation.ts';
import {catalog} from './helpers.ts';

const presentation=JSON.parse(readFileSync('content/presentation.json','utf8'));
const localization=JSON.parse(readFileSync('content/localization.json','utf8')).strings;
const manifest=JSON.parse(readFileSync('content/presentation-drafts/presentation-hardening-v8-manifest-v1.json','utf8'));
const registry=new Map(presentationSlots(catalog).map(slot=>[slot.id,slot]));

function bilingual(key:string){
  assert.ok(localization[key]?.ru?.trim(),key+' ru');
  assert.ok(localization[key]?.en?.trim(),key+' en');
}

test('cross-domain v8 semantic coverage stays live, exact, static and bilingual',()=>{
  const selected=manifest.semanticSlots.filter((entry:any)=>entry.reachability==='active-current-main');
  assert.equal(selected.length,47);
  assert.deepEqual(
    Object.fromEntries(['endingSlots','forestSlots','povertySlots','schoolCourseSlots'].map(domain=>[
      domain,selected.filter((entry:any)=>entry.domain===domain).length
    ])),
    {endingSlots:9,forestSlots:10,povertySlots:20,schoolCourseSlots:8}
  );

  const checked=applyPresentation(catalog,presentation);
  for(const entry of selected){
    assert.ok(registry.has(entry.presentationId),'dead semantic ID '+entry.presentationId);
    const slot=presentation.slots?.[entry.presentationId];
    assert.ok(slot?.static,entry.presentationId+' static');
    assert.equal(slot.static.src,entry.sourceAsset,entry.presentationId+' source');
    assert.equal(slot.static.altKey,entry.altKey,entry.presentationId+' alt');
    assert.ok(existsSync(entry.sourceAsset),entry.sourceAsset);
    bilingual(entry.altKey);
    bilingual(entry.captionKey);

    const resolved=resolvePresentation(checked,presentation,entry.presentationId,{
      animationsEnabled:false,
      occurrenceKey:'cross-domain-v8'
    });
    assert.equal(resolved.textOnly,false,entry.presentationId);
    assert.equal(resolved.selected?.src,entry.sourceAsset,entry.presentationId);
  }
});

test('cross-domain v8 Work and School teacher identities remain current without gameplay identity mutation',()=>{
  const actionIds=new Set(catalog.definitions.actions.map(action=>action.id));
  const media=new Map(catalog.media.map(item=>[item.id,item]));
  assert.equal(manifest.workControls.length,10);
  assert.equal(manifest.teacherMediaSurfaces.length,8);

  for(const entry of manifest.workControls){
    assert.equal(entry.reachability,'active-current-main',entry.actionId);
    assert.ok(actionIds.has(entry.actionId),entry.actionId);
  }
  for(const entry of manifest.teacherMediaSurfaces){
    assert.equal(entry.reachability,'active-catalog-media',entry.mediaId);
    const current=media.get(entry.mediaId);
    assert.ok(current,entry.mediaId);
    assert.equal(current.src,entry.sourceAsset,entry.mediaId+' source');
    assert.ok(existsSync(entry.sourceAsset),entry.sourceAsset);
    bilingual(entry.preparedAltKey);
    bilingual(entry.preparedCaptionKey);
  }
});

test('cross-domain presentation replacement leaves gameplay definitions and Save identity unchanged',()=>{
  const beforeDefinitions=structuredClone(catalog.definitions);
  const beforeSave=freshSave();
  const beforeSaveJson=JSON.stringify(beforeSave);
  const selected=manifest.semanticSlots.filter((entry:any)=>entry.reachability==='active-current-main');

  const slots:any={};
  for(const entry of selected){
    slots[entry.presentationId]={
      static:{kind:'image',src:'assets/stage-town.svg',alt:'Cross-domain v8 replacement preview.'}
    };
  }
  const checked=applyPresentation(catalog,{version:1,texts:{},media:{},slots});
  assert.deepEqual(checked.definitions,beforeDefinitions);
  assert.equal(JSON.stringify(beforeSave),beforeSaveJson);

  for(const entry of selected){
    const resolved=resolvePresentation(checked,{version:1,texts:{},media:{},slots},entry.presentationId,{
      animationsEnabled:false,
      occurrenceKey:'cross-domain-v8-replacement'
    });
    assert.equal(resolved.requestedId,entry.presentationId);
    assert.equal(resolved.selected?.slotId,entry.presentationId);
    assert.equal(resolved.selected?.src,'assets/stage-town.svg');
  }
});

test('cross-domain v8 remains within presentation-only ownership boundary',()=>{
  assert.equal(manifest.invariants.presentationEvidenceOnly,true);
  assert.equal(manifest.invariants.noGameplayMutation,true);
  assert.equal(manifest.invariants.noSaveOrRngMutation,true);
  assert.equal(manifest.invariants.noSyntheticSemanticIds,true);
  assert.equal(manifest.deadAssetAudit.activeMissingSources,0);
  assert.equal(manifest.deadAssetAudit.staleSelectedManifestRows,0);
});
