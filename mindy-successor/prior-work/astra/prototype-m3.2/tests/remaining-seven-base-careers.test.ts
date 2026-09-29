import test from 'node:test';
import assert from 'node:assert/strict';

import {actionAvailable,dispatch} from '../src/core/engine.ts';
import {presentationSlots} from '../src/core/presentation.ts';
import {catalog,started} from './helpers.ts';
const careers=[
  ['tavern','new-hand'],
  ['hunter','novice'],
  ['guard','recruit'],
  ['merchant','stall-hand'],
  ['artist-geisha','novice'],
  ['assassin','runner'],
  ['prostitute','new-independent-worker']
] as const;

test('remaining seven ordinary careers expose target repeatable 1-Energy base shifts',()=>{
  for(const [career] of careers){
    const action=catalog.definitions.actions.find(a=>a.id===career+'.shift');
    assert.ok(action,career);
    assert.equal(action.cost.energy,1,career);
    assert.equal(action.cost.money,0,career);
    assert.deepEqual(action.effects,[{
      kind:'incrementCareerCounter',career,counter:'completed_shifts',amount:1
    }],career);
    assert.ok(action.wage && action.wage.base>0,career);
    assert.ok(action.seasonal,career);
  }
});

test('remaining seven base shifts stay locked until an approved action condition is authored',()=>{
  const s=started();
  for(const [career,initialStage] of careers){
    const action=catalog.definitions.actions.find(a=>a.id===career+'.shift');
    assert.ok(action,career);
    assert.deepEqual(action.conditions,[],career);
    assert.equal(actionAvailable(action,s,catalog),false,career);
    assert.throws(
      ()=>dispatch(s,{type:'action',id:career+'.shift'},catalog),
      /Условия действия не выполнены/,
      career
    );
    assert.equal(s.run.progression.careers[career]?.stage,initialStage,career);
    assert.equal(s.run.progression.careers[career]?.counters.completed_shifts??0,0,career);
  }
});

test('remaining seven base shifts expose seasonal semantic presentation identities',()=>{
  const slots=new Set(presentationSlots(catalog).map(slot=>slot.id));
  for(const [career] of careers){
    for(const season of ['spring','summer','autumn','winter']){
      assert.ok(slots.has(`job/${career}/shift/${season}/default`),`${career} ${season}`);
    }
    assert.ok(slots.has(`job/${career}/result/default`),career+' result');
  }
});

test('remaining-seven base layer does not guess new Hard Work endings or alter Lumber lock',()=>{
  for(const [career] of careers){
    assert.equal(
      catalog.definitions.endings.some(e=>e.id===`ending.${career}.hard-work`),
      false,
      career
    );
  }

  const lumber=catalog.definitions.endings.find(e=>e.id==='ending.lumber.hard-work');
  assert.ok(lumber);
  assert.deepEqual(lumber.conditions,[{
    kind:'careerCounter',career:'lumber',counter:'completed_shifts',op:'gte',value:50
  }]);
  assert.deepEqual(lumber.metaRewards,[{
    kind:'hardWork',rewardId:'hardWork:lumber',career:'lumber'
  }]);
});
