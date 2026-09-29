import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

import {applyPresentation,presentationSlots,resolvePresentation} from '../src/core/presentation.ts';
import {catalog} from './helpers.ts';

const manifest=JSON.parse(readFileSync('content/presentation-drafts/lumber-presentation-source-manifest-v1.json','utf8'));

test('selected Lumber presentation slots remain replaceable by semantic ID without gameplay mutation',()=>{
  const known=new Set(presentationSlots(catalog).map(slot=>slot.id));
  for(const entry of manifest.slots){
    assert.ok(known.has(entry.presentationId),entry.presentationId);
    const patch={
      version:1 as const,
      texts:{},
      media:{},
      slots:{
        [entry.presentationId]:{
          static:{
            kind:'image' as const,
            src:'assets/stage-lumber.svg',
            alt:'Replacement preview for presentation compatibility.'
          }
        }
      }
    };
    const checked=applyPresentation(catalog,patch);
    assert.deepEqual(checked.definitions,catalog.definitions,entry.presentationId+' gameplay definitions');
    const resolved=resolvePresentation(checked,patch,entry.presentationId,{animationsEnabled:false,occurrenceKey:'replacement-test'});
    assert.equal(resolved.requestedId,entry.presentationId);
    assert.equal(resolved.selected?.src,'assets/stage-lumber.svg',entry.presentationId);
    assert.equal(resolved.selected?.slotId,entry.presentationId,entry.presentationId);
  }
});

test('Lumber source manifest declares presentation override replacement invariants',()=>{
  assert.equal(manifest.replaceability.mechanism,'presentation-v1-slot-override');
  assert.equal(manifest.replaceability.semanticPresentationIdPreserved,true);
  assert.equal(manifest.replaceability.gameplayIdentityPreserved,true);
  assert.equal(manifest.replaceability.replacementValidatedBeforeSave,true);
});
