import test from 'node:test';
import assert from 'node:assert/strict';

import {freshSave,meets,palaceAvailable} from '../src/core/engine.ts';
import {ordinaryHardWorkCareers} from '../src/core/schema.ts';
import {catalog} from './helpers.ts';

test('Palace eligibility is derived from ten unique ordinary Hard Work completions',()=>{
  const s=freshSave();
  s.meta.hardWorkProgress=[...ordinaryHardWorkCareers.slice(0,9),'secret-debt'];
  s.meta.unlocks=['palace'];
  assert.equal(palaceAvailable(s.meta),false);
  assert.equal(meets({kind:'metaUnlock',unlock:'palace',present:true},s,catalog),false);

  s.meta.hardWorkProgress.push(ordinaryHardWorkCareers[9]);
  assert.equal(palaceAvailable(s.meta),true);
  assert.equal(meets({kind:'metaUnlock',unlock:'palace',present:true},s,catalog),true);

  s.meta.hardWorkProgress.push(ordinaryHardWorkCareers[9]);
  assert.equal(palaceAvailable(s.meta),true);
});

test('fresh-save projection repairs stale Palace unlock storage from Hard Work progress',()=>{
  const nine=freshSave({
    hardWorkProgress:[...ordinaryHardWorkCareers.slice(0,9)],
    unlocks:['palace']
  });
  assert.equal(palaceAvailable(nine.meta),false);
  assert.equal(nine.meta.unlocks.includes('palace'),false);

  const ten=freshSave({
    hardWorkProgress:[...ordinaryHardWorkCareers],
    unlocks:[]
  });
  assert.equal(palaceAvailable(ten.meta),true);
  assert.equal(ten.meta.unlocks.includes('palace'),true);
});
