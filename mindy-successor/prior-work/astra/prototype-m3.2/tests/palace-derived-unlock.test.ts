import test from 'node:test';
import assert from 'node:assert/strict';

import {dispatch,freshSave,meets,palaceRunQualified} from '../src/core/engine.ts';
import {ordinaryHardWorkCareers} from '../src/core/schema.ts';
import {catalog} from './helpers.ts';

test('stale permanent Palace unlock storage is stripped and cannot replace D23 run qualification',()=>{
  const s=freshSave({hardWorkProgress:[...ordinaryHardWorkCareers],unlocks:['palace']});
  assert.equal(s.meta.unlocks.includes('palace'),false);
  assert.equal(meets({kind:'metaUnlock',unlock:'palace',present:true},s,catalog),false);
  assert.equal(palaceRunQualified(s),false);
});

test('all-ten active packages qualify the run without creating a permanent Palace unlock',()=>{
  let s=freshSave({hardWorkProgress:[...ordinaryHardWorkCareers]});
  for(const career of ordinaryHardWorkCareers)s=dispatch(s,{type:'setHardWorkPackageActive',career,active:true},catalog);
  assert.equal(palaceRunQualified(s),true);
  assert.equal(s.meta.unlocks.includes('palace'),false);
  assert.equal(meets({kind:'metaUnlock',unlock:'palace',present:true},s,catalog),false);
  s.run.creation.remaining=0;
  s=dispatch(s,{type:'finishCreation'},catalog);
  assert.equal(palaceRunQualified(s),true);
  assert.equal(s.run.creation.hardWorkPackagesApplied,true);
});
