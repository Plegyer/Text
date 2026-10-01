import test from 'node:test';
import assert from 'node:assert/strict';

import {actionAvailable,parseSave} from '../src/core/engine.ts';
import {presentationSlots} from '../src/core/presentation.ts';
import {catalog,started} from './helpers.ts';
import type {Save} from '../src/core/schema.ts';

function reload(state:Save){ return parseSave(JSON.stringify(state),catalog); }

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

test('remaining seven base shifts keep typed initial state while Day-1 availability waits for authored unlock conditions',()=>{
  for(const [career,initialStage] of careers){
    let s=started();
    const action=catalog.definitions.actions.find(a=>a.id===career+'.shift');
    assert.ok(action,career);
    assert.ok(action.conditions.length>0,career+' has an approved derived unlock condition');
    assert.equal(actionAvailable(action,s,catalog),false,career);
    const definition=catalog.definitions.careers?.find(item=>item.id===career);
    assert.equal(definition?.initialStage,initialStage,career);
    assert.equal(s.run.progression.careers[career],undefined,career+' stays virtual before first legal shift');

    s=reload(s);
    assert.equal(actionAvailable(action,s,catalog),false,career);
    assert.equal(catalog.definitions.careers?.find(item=>item.id===career)?.initialStage,initialStage,career);
    assert.equal(s.run.progression.careers[career],undefined,career+' stays virtual across reload');
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

test('remaining-seven base layer exposes the approved 50-shift Hard Work endings without altering Lumber lock',()=>{
  for(const [career] of careers){
    const ending=catalog.definitions.endings.find(e=>e.id===`ending.${career}.hard-work`);
    assert.ok(ending,career);
    assert.deepEqual(ending.conditions,[{
      kind:'careerCounter',career,counter:'completed_shifts',op:'gte',value:50
    }],career);
    assert.deepEqual(ending.metaRewards,[{
      kind:'hardWork',rewardId:`hardWork:${career}`,career
    }],career);
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
