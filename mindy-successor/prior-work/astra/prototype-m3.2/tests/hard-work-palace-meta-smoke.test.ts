import test from 'node:test';
import assert from 'node:assert/strict';

import {dispatch,freshSave,meets,palaceAvailable,palaceRunQualified} from '../src/core/engine.ts';
import {ordinaryHardWorkCareers} from '../src/core/schema.ts';
import {catalog} from './helpers.ts';

function select(input:ReturnType<typeof freshSave>,careers:readonly typeof ordinaryHardWorkCareers[number][]){
  let s=input;
  for(const career of careers)s=dispatch(s,{type:'setHardWorkPackageActive',career,active:true},catalog);
  return s;
}

test('Palace shared seam requires permanent ordinary 10/10 and current-run active 10/10',()=>{
  const all=[...ordinaryHardWorkCareers];
  const nine=ordinaryHardWorkCareers.slice(0,9);

  let s=freshSave({hardWorkProgress:all});
  assert.equal(palaceRunQualified(s),false);
  assert.equal(palaceAvailable(s.meta,s.run.creation.activeHardWorkPackages),false);

  s=select(s,nine);
  assert.equal(palaceRunQualified(s),false);

  s=dispatch(s,{type:'setHardWorkPackageActive',career:ordinaryHardWorkCareers[9],active:true},catalog);
  assert.equal(palaceRunQualified(s),true);
  assert.equal(palaceAvailable(s.meta,s.run.creation.activeHardWorkPackages),true);

  // D23 qualification is not a permanent Meta unlock.
  assert.equal(s.meta.unlocks.includes('palace'),false);
  assert.equal(meets({kind:'metaUnlock',unlock:'palace',present:true},s,catalog),false);
});

test('duplicate ordinary progress and Secret Debt never substitute for the ten ordinary careers',()=>{
  const nine=ordinaryHardWorkCareers.slice(0,9);
  const s=freshSave({
    hardWorkProgress:[...nine,nine[0],'secret-debt']
  });

  assert.equal(
    palaceAvailable(s.meta,[...nine,nine[0],'secret-debt']),
    false
  );
});
