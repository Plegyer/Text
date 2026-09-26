import test from 'node:test';
import assert from 'node:assert/strict';
import {loadCatalog} from '../src/core/content.ts';

test('architecture gate: catalog rejects an unreachable orphan state-machine stage',()=>{
  const definitions:any={
    version:'0.1.0',
    flags:[],
    actions:[],
    endings:[],
    careers:[{
      id:'qa.orphan-job',
      label:'QA orphan job',
      initialStage:'new',
      stages:['new','ready','orphan'],
      transitions:[{
        id:'become-ready',
        from:['new'],
        to:'ready',
        conditions:[],
        effects:[]
      }]
    }]
  };

  assert.throws(
    ()=>loadCatalog(definitions,[]),
    /orphan|unreachable|недостижим/i,
    'Architecture Migration Slice §14 requires orphan stages to be rejected.'
  );
});
