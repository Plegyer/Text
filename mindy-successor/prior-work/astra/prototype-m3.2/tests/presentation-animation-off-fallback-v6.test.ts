import test from 'node:test';
import assert from 'node:assert/strict';
import {existsSync,readFileSync} from 'node:fs';

import {applyPresentation,presentationSchema,resolvePresentation} from '../src/core/presentation.ts';
import {catalog} from './helpers.ts';

const presentation=JSON.parse(readFileSync('content/presentation.json','utf8'));
const manifest=JSON.parse(readFileSync('content/presentation-drafts/presentation-wave-v6-source-manifest-v1.json','utf8'));

const selected=[
  ...manifest.endingSlots,
  ...manifest.forestSlots,
  ...manifest.povertySlots,
  ...manifest.schoolCourseSlots
];

test('queue-v6 selected semantic surfaces resolve to static media with animations disabled',()=>{
  presentationSchema.parse(presentation);
  assert.equal(selected.length,46);
  const checked=applyPresentation(catalog,presentation);
  for(const entry of selected){
    assert.ok(existsSync(entry.sourceAsset),entry.sourceAsset);
    const resolved=resolvePresentation(checked,presentation,entry.presentationId,{
      animationsEnabled:false,
      occurrenceKey:'queue-v6-animation-off'
    });
    assert.equal(resolved.textOnly,false,entry.presentationId);
    assert.equal(resolved.selected?.src,entry.sourceAsset,entry.presentationId);
    assert.equal(resolved.selected?.kind,'image',entry.presentationId);
  }
});

test('missing optional dynamic media leaves a valid project-owned static candidate for every selected surface',()=>{
  for(const entry of selected){
    const patch:any={
      version:1,
      texts:{},
      media:{},
      slots:{
        [entry.presentationId]:{
          primary:{
            kind:'gif',
            src:'assets/presentation/missing-optional-dynamic.gif',
            alt:'Optional dynamic presentation candidate.'
          },
          static:{
            kind:'image',
            src:entry.sourceAsset,
            alt:'Required static presentation fallback.'
          }
        }
      }
    };
    const checked=applyPresentation(catalog,patch);
    const animated=resolvePresentation(checked,patch,entry.presentationId,{
      animationsEnabled:true,
      occurrenceKey:'queue-v6-missing-dynamic'
    });
    const staticOnly=resolvePresentation(checked,patch,entry.presentationId,{
      animationsEnabled:false,
      occurrenceKey:'queue-v6-missing-dynamic'
    });
    assert.equal(animated.candidates[0]?.src,'assets/presentation/missing-optional-dynamic.gif',entry.presentationId+' dynamic');
    assert.equal(animated.candidates[1]?.src,entry.sourceAsset,entry.presentationId+' fallback candidate');
    assert.ok(existsSync(animated.candidates[1]!.src),entry.presentationId+' fallback exists');
    assert.equal(staticOnly.selected?.src,entry.sourceAsset,entry.presentationId+' animation-off');
    assert.equal(staticOnly.textOnly,false,entry.presentationId+' animation-off textOnly');
  }
});
