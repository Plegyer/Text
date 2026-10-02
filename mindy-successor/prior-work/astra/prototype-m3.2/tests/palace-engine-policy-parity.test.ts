import test from 'node:test';
import assert from 'node:assert/strict';

import {freshSave,meets,palaceAvailable} from '../src/core/engine.ts';
import {palaceUnlockSatisfied} from '../src/core/palace.ts';
import {ordinaryHardWorkCareers} from '../src/core/schema.ts';

test('Palace authority-safe policy stays exactly in parity with the engine-derived 10/10 unlock',()=>{
  const total=1<<ordinaryHardWorkCareers.length;
  for(let mask=0;mask<total;mask++){
    const hardWorkProgress=ordinaryHardWorkCareers.filter((_,index)=>(mask&(1<<index))!==0);
    const s=freshSave();
    s.meta.hardWorkProgress=[...hardWorkProgress];

    const expected=hardWorkProgress.length===ordinaryHardWorkCareers.length;
    assert.equal(palaceUnlockSatisfied(s.meta.hardWorkProgress),expected,`policy mask ${mask}`);
    assert.equal(palaceAvailable(s.meta),expected,`engine mask ${mask}`);
    assert.equal(
      meets({kind:'metaUnlock',unlock:'palace',present:true},s),
      expected,
      `condition mask ${mask}`
    );
  }
});

test('duplicate and hidden-route ledger entries do not alter Palace parity',()=>{
  const s=freshSave();
  s.meta.hardWorkProgress=[
    ...ordinaryHardWorkCareers.slice(0,9),
    ordinaryHardWorkCareers[0],
    ordinaryHardWorkCareers[0],
    'secret-debt'
  ];

  assert.equal(palaceUnlockSatisfied(s.meta.hardWorkProgress),false);
  assert.equal(palaceAvailable(s.meta),false);
  assert.equal(meets({kind:'metaUnlock',unlock:'palace',present:true},s),false);

  s.meta.hardWorkProgress.push(ordinaryHardWorkCareers[9]);
  assert.equal(palaceUnlockSatisfied(s.meta.hardWorkProgress),true);
  assert.equal(palaceAvailable(s.meta),true);
  assert.equal(meets({kind:'metaUnlock',unlock:'palace',present:true},s),true);
});
