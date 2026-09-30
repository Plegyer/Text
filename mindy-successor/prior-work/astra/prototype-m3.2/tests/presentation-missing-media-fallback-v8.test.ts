import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

import {applyPresentation,resolvePresentation} from '../src/core/presentation.ts';
import {catalog} from './helpers.ts';

const missingGif='assets/presentation/missing-optional-dynamic-v8.gif';
const missingStatic='assets/presentation/missing-optional-static-v8.svg';

test('missing optional dynamic and static candidates retain deterministic registry fallback order',()=>{
  const patch:any={
    version:1,
    texts:{},
    media:{},
    slots:{
      'ending/guild-life':{
        primary:{kind:'gif',src:missingGif,alt:'Missing optional dynamic preview.'},
        static:{kind:'image',src:missingStatic,alt:'Missing optional static preview.'}
      }
    }
  };
  const checked=applyPresentation(catalog,patch);

  const animatedA=resolvePresentation(checked,patch,'ending/guild-life',{
    animationsEnabled:true,
    occurrenceKey:'queue-v8-missing-media'
  });
  const animatedB=resolvePresentation(checked,patch,'ending/guild-life',{
    animationsEnabled:true,
    occurrenceKey:'queue-v8-missing-media'
  });
  assert.deepEqual(
    animatedA.candidates.map(candidate=>[candidate.src,candidate.slotId,candidate.source]),
    animatedB.candidates.map(candidate=>[candidate.src,candidate.slotId,candidate.source])
  );
  assert.equal(animatedA.candidates[0]?.src,missingGif);
  assert.equal(animatedA.candidates[1]?.src,missingStatic);
  assert.equal(animatedA.candidates[2]?.slotId,'location/town/default');
  assert.notEqual(animatedA.candidates[2]?.src,missingGif);
  assert.notEqual(animatedA.candidates[2]?.src,missingStatic);

  const staticOnly=resolvePresentation(checked,patch,'ending/guild-life',{
    animationsEnabled:false,
    occurrenceKey:'queue-v8-missing-media'
  });
  assert.equal(staticOnly.candidates[0]?.src,missingStatic);
  assert.equal(staticOnly.candidates[1]?.slotId,'location/town/default');
  assert.equal(staticOnly.textOnly,false);
});

test('unknown presentation identity resolves through the same safe town fallback without gameplay branching',()=>{
  const patch={version:1,texts:{},media:{}};
  const checked=applyPresentation(catalog,patch);
  const resolved=resolvePresentation(checked,patch,'queue-v8/unknown/id',{
    animationsEnabled:false,
    occurrenceKey:'queue-v8-unknown'
  });
  assert.equal(resolved.requestedId,'queue-v8/unknown/id');
  assert.equal(resolved.selected?.slotId,'location/town/default');
  assert.equal(resolved.textOnly,false);
  assert.ok(resolved.diagnostics.some(line=>line.includes('safe')||line.includes('fallback')||line.includes('безопас')));
});

test('UI media failure advances to the next resolver candidate without timing or gameplay hooks',()=>{
  const app=readFileSync('src/ui/app.ts','utf8');
  assert.match(app,/node\.onerror=\(\)=>\{mediaIndex\+\+;render\(\);\}/);
  const start=app.indexOf('function mediaHTML');
  const end=app.indexOf('function central()',start);
  const renderer=app.slice(start,end);
  assert.doesNotMatch(renderer,/dispatch\(|setTimeout\(|onended/);
});
