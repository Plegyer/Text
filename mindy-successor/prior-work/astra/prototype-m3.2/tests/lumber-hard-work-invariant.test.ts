import test from 'node:test';
import assert from 'node:assert/strict';
import {dispatch,eligible} from '../src/core/engine.ts';
import {catalog,created} from './helpers.ts';

test('shipped Lumber Hard Work remains independently gated at 50 completed shifts',()=>{
  const ending=catalog.definitions.endings.find(e=>e.id==='ending.lumber.hard-work');
  assert.ok(ending);
  assert.deepEqual(ending.conditions,[
    {kind:'careerCounter',career:'lumber',counter:'completed_shifts',op:'gte',value:50}
  ]);

  for(const completed of [0,1,10,25,30,49]){
    const s=created();
    s.run.progression.careers.lumber={
      stage:'accepted-hand',
      shifts:0,
      counters:{completed_shifts:completed},
      choices:{},
      facts:[]
    };
    assert.equal(
      eligible(ending.conditions,s,catalog),
      false,
      `Hard Work must stay ineligible at ${completed} completed shifts`
    );
  }

  let s=created();
  s.run.progression.careers.lumber={
    stage:'accepted-hand',
    shifts:0,
    counters:{completed_shifts:49},
    choices:{},
    facts:[]
  };

  s=dispatch(s,{type:'action',id:'lumber.shift'},catalog);

  assert.equal(s.run.progression.careers.lumber.counters.completed_shifts,50);
  assert.ok(s.run.endings.eligible.includes('ending.lumber.hard-work'));
  assert.equal(s.run.progression.relationships['lumber.foreman'],undefined);
  assert.ok(!s.run.progression.careers.lumber.facts.includes('management-school-ready'));
  assert.ok(!s.run.progression.careers.lumber.facts.includes('forest-truth-known'));
});
