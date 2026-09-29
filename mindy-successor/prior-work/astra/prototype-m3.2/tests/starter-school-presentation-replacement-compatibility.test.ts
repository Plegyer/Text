import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

import {freshSave} from '../src/core/engine.ts';
import {applyPresentation,presentationSlots,resolvePresentation} from '../src/core/presentation.ts';
import {catalog} from './helpers.ts';

const manifest=JSON.parse(readFileSync('content/presentation-drafts/starter-school-presentation-source-manifest-v1.json','utf8'));

test('starter-career and School semantic presentation IDs remain independently replaceable',()=>{
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
            src:'assets/stage-school.svg',
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
    const resolved=resolvePresentation(checked,patch,entry.presentationId,{animationsEnabled:false,occurrenceKey:'replacement-compatibility'});
    assert.equal(resolved.requestedId,entry.presentationId);
    assert.equal(resolved.selected?.src,'assets/stage-school.svg',entry.presentationId);
    assert.equal(resolved.selected?.slotId,entry.presentationId,entry.presentationId);
  }
});

test('manifest declares replacement identity invariants',()=>{
  assert.equal(manifest.replaceability.mechanism,'presentation-v1-slot-override');
  assert.equal(manifest.replaceability.semanticPresentationIdPreserved,true);
  assert.equal(manifest.replaceability.gameplayIdentityPreserved,true);
  assert.equal(manifest.replaceability.saveIdentityPreserved,true);
});
