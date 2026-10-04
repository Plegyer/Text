import test from 'node:test';
import assert from 'node:assert/strict';
import {existsSync,readFileSync} from 'node:fs';

import {freshSave} from '../src/core/engine.ts';
import {applyPresentation,presentationSchema,presentationSlots,resolvePresentation} from '../src/core/presentation.ts';
import {catalog} from './helpers.ts';

const presentation=JSON.parse(readFileSync('content/presentation.json','utf8'));
const manifest=JSON.parse(readFileSync('content/presentation-drafts/late-career-presentation-source-manifest-v1.json','utf8'));

test('late-career semantic IDs are unique, known, exact-bound and source-backed',()=>{
  presentationSchema.parse(presentation);
  const registry=new Map(presentationSlots(catalog).map(slot=>[slot.id,slot]));
  const ids=new Set<string>();
  const legacyDefaultFallback=new Set(['lumber','tavern','guard']);
  assert.equal(manifest.slots.length,35);
  for(const entry of manifest.slots){
    assert.equal(ids.has(entry.presentationId),false,'duplicate '+entry.presentationId);
    ids.add(entry.presentationId);
    const semantic=registry.get(entry.presentationId);
    assert.ok(semantic,'unknown '+entry.presentationId);
    const slot=presentation.slots?.[entry.presentationId];
    assert.ok(slot?.static,entry.presentationId);
    assert.equal(slot.static.src,entry.sourceAsset,entry.presentationId);
    assert.ok(existsSync(entry.sourceAsset),entry.sourceAsset);
    if(entry.role==='seasonal-shift'){
      assert.equal(semantic.fallbackId,'location/town/default',entry.presentationId+' fallback');
    } else {
      const expectedFallback=legacyDefaultFallback.has(entry.domain)
        ?`job/${entry.domain}/shift/default`
        :`job/${entry.domain}/shift/spring/default`;
      assert.equal(semantic.fallbackId,expectedFallback,entry.presentationId+' fallback');
    }
  }
});

test('late-career semantic slots are editor-replaceable without gameplay or Save mutation',()=>{
  for(const entry of manifest.slots){
    const patch={
      version:1 as const,
      texts:{},
      media:{},
      slots:{
        [entry.presentationId]:{
          static:{
            kind:'image' as const,
            src:'assets/stage-town.svg',
            alt:'Presentation replacement compatibility preview.'
          }
        }
      }
    };
    const beforeSave=freshSave();
    const beforeSaveJson=JSON.stringify(beforeSave);
    const checked=applyPresentation(catalog,patch);
    assert.deepEqual(checked.definitions,catalog.definitions,entry.presentationId+' definitions');
    assert.equal(JSON.stringify(beforeSave),beforeSaveJson,entry.presentationId+' save');
    const resolved=resolvePresentation(checked,patch,entry.presentationId,{animationsEnabled:false,occurrenceKey:'late-career-replacement'});
    assert.equal(resolved.requestedId,entry.presentationId);
    assert.equal(resolved.selected?.src,'assets/stage-town.svg',entry.presentationId);
    assert.equal(resolved.selected?.slotId,entry.presentationId,entry.presentationId);
  }
});

test('manifest keeps presentation ownership boundaries after D41 retires stale Tavern ending IDs',()=>{
  assert.equal(manifest.gameplayMutation,false);
  assert.equal(manifest.invariants.existingSemanticIdsOnly,true);
  assert.equal(manifest.invariants.noGameplayFieldsChanged,true);
  assert.equal(manifest.invariants.noSaveOrRngMutation,true);
  assert.equal(manifest.invariants.nonExplicitProfessionalCoverage,true);
  assert.deepEqual(manifest.documentedMissingSlots,[]);
});
