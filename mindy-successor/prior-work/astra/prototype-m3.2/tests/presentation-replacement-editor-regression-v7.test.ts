import test from 'node:test';
import assert from 'node:assert/strict';

import {freshSave} from '../src/core/engine.ts';
import {applyPresentation,resolvePresentation} from '../src/core/presentation.ts';
import {catalog} from './helpers.ts';

const manifest=JSON.parse(
  await import('node:fs').then(({readFileSync})=>readFileSync('content/presentation-drafts/presentation-production-binding-v7-manifest-v1.json','utf8'))
);

const semantic=[
  ...manifest.preparedVsActive.endings,
  ...manifest.preparedVsActive.forest,
  ...manifest.preparedVsActive.poverty,
  ...manifest.preparedVsActive.schoolCourses
];

test('queue-v7 semantic bindings are editor-replaceable by exact semantic ID without gameplay or Save mutation',()=>{
  assert.equal(semantic.length,46);
  const originalDefinitions=structuredClone(catalog.definitions);

  for(const entry of semantic){
    const patch:any={
      version:1,
      texts:{},
      media:{},
      slots:{
        [entry.presentationId]:{
          static:{
            kind:'image',
            src:'assets/stage-town.svg',
            alt:'Queue v7 editor replacement preview.'
          }
        }
      }
    };
    const beforeSave=freshSave();
    const beforeSaveJson=JSON.stringify(beforeSave);
    const checked=applyPresentation(catalog,patch);

    assert.deepEqual(checked.definitions,originalDefinitions,entry.presentationId+' definitions');
    assert.equal(JSON.stringify(beforeSave),beforeSaveJson,entry.presentationId+' save');

    const resolved=resolvePresentation(checked,patch,entry.presentationId,{
      animationsEnabled:false,
      occurrenceKey:'queue-v7-replacement'
    });
    assert.equal(resolved.requestedId,entry.presentationId,entry.presentationId+' requested');
    assert.equal(resolved.selected?.slotId,entry.presentationId,entry.presentationId+' slot');
    assert.equal(resolved.selected?.src,'assets/stage-town.svg',entry.presentationId+' source');
  }
});

test('queue-v7 School teacher media surfaces are editor-replaceable by exact media ID',()=>{
  const rows=manifest.packages.schoolTeacherFallback;
  assert.equal(rows.length,8);
  const originalDefinitions=structuredClone(catalog.definitions);

  for(const entry of rows){
    const patch:any={
      version:1,
      texts:{},
      media:{
        [entry.mediaId]:{
          kind:'image',
          src:'assets/stage-town.svg',
          alt:'Queue v7 teacher media replacement preview.'
        }
      }
    };
    const beforeSave=freshSave();
    const beforeSaveJson=JSON.stringify(beforeSave);
    const checked=applyPresentation(catalog,patch);

    assert.deepEqual(checked.definitions,originalDefinitions,entry.mediaId+' definitions');
    assert.equal(JSON.stringify(beforeSave),beforeSaveJson,entry.mediaId+' save');

    const replaced=checked.media.find(item=>item.id===entry.mediaId);
    assert.ok(replaced,entry.mediaId);
    assert.equal(replaced.id,entry.mediaId,entry.mediaId+' identity');
    assert.equal(replaced.src,'assets/stage-town.svg',entry.mediaId+' source');
  }
});

test('replacement regression remains presentation-only by manifest contract',()=>{
  assert.equal(manifest.invariants.noGameplayMutation,true);
  assert.equal(manifest.invariants.noSaveOrRngMutation,true);
  assert.equal(manifest.invariants.existingSemanticIdsOnly,true);
  assert.equal(manifest.invariants.registryOnlyWhereBindingApplies,true);
});
