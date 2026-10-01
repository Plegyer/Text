import test from 'node:test';
import assert from 'node:assert/strict';

import {dispatch,parseSave} from '../src/core/engine.ts';
import {presentationSlots} from '../src/core/presentation.ts';
import {catalog,started} from './helpers.ts';
import type {Save} from '../src/core/schema.ts';

function reload(state:Save){
  return parseSave(JSON.stringify(state),catalog);
}

const cases=[
  {
    action:'satyr-maid.shift',
    career:'satyr-maid',
    firstStage:'known-face',
    firstFact:'first-shift-complete',
    resultPresentation:'job/satyr-maid/result/default',
    seasonalMedia:[
      [0,'stage.tavern.spring'],
      [10,'stage.tavern.summer'],
      [20,'stage.tavern.autumn'],
      [30,'stage.tavern.winter']
    ] as const
  },
  {
    action:'undead-farm.shift',
    career:'undead-farm',
    firstStage:'reliable-helper',
    firstFact:'first-shift-complete',
    resultPresentation:'job/undead-farm/result/default',
    seasonalMedia:[
      [0,'stage.hunt.spring'],
      [10,'stage.hunt.summer'],
      [20,'stage.hunt.autumn'],
      [30,'stage.hunt.winter']
    ] as const
  }
] as const;

test('starter trio exposes target Satyr Maid and Undead Farm repeatable 1-Energy shifts',()=>{
  for(const c of cases){
    const action=catalog.definitions.actions.find(a=>a.id===c.action);
    assert.ok(action);
    assert.equal(action.cost.energy,1);
    assert.equal(action.cost.money,0);
    assert.deepEqual(action.effects,[
      {kind:'incrementCareerCounter',career:c.career,counter:'completed_shifts',amount:1},
      {kind:'advanceCareer',career:c.career,transition:'first-shift'}
    ]);
    assert.ok(catalog.definitions.careers?.some(career=>career.id===c.career));
  }
});

test('Satyr Maid and Undead Farm first target shifts persist typed career progress and semantic result identity',()=>{
  for(const c of cases){
    let s=started();
    const energyBefore=s.run.dayState.energyCurrent;
    s=dispatch(s,{type:'action',id:c.action},catalog);

    assert.equal(s.run.dayState.energyCurrent,energyBefore-1);
    assert.equal(s.run.progression.careers[c.career]?.counters.completed_shifts,1);
    assert.equal(s.run.progression.careers[c.career]?.stage,c.firstStage);
    assert.ok(s.run.progression.careers[c.career]?.facts.includes(c.firstFact));
    assert.equal(s.run.flow.lastAction?.presentationId,c.resultPresentation);

    s=reload(s);
    assert.equal(s.run.progression.careers[c.career]?.counters.completed_shifts,1);
    assert.equal(s.run.progression.careers[c.career]?.stage,c.firstStage);
    assert.equal(s.run.flow.lastAction?.presentationId,c.resultPresentation);
  }
});

test('starter target shifts expose deterministic seasonal presentation surfaces without locking balance numbers',()=>{
  for(const c of cases){
    for(const [day,media] of c.seasonalMedia){
      const s=started();
      s.run.calendar.elapsedDays=day;
      const out=dispatch(s,{type:'action',id:c.action},catalog);
      assert.deepEqual(out.run.flow.lastAction?.media,[media]);
      assert.equal(out.run.flow.lastAction?.presentationId,c.resultPresentation);
    }
  }

  const slots=new Set(presentationSlots(catalog).map(slot=>slot.id));
  for(const id of [
    'job/satyr-maid/shift/spring/default',
    'job/satyr-maid/shift/summer/default',
    'job/satyr-maid/shift/autumn/default',
    'job/satyr-maid/shift/winter/default',
    'job/satyr-maid/result/default',
    'job/undead-farm/shift/spring/default',
    'job/undead-farm/shift/summer/default',
    'job/undead-farm/shift/autumn/default',
    'job/undead-farm/shift/winter/default',
    'job/undead-farm/result/default'
  ])assert.ok(slots.has(id),id);
});

test('starter target layer exposes the approved 50-shift Hard Work endings and preserves Lumber Hard Work',()=>{
  for(const career of ['satyr-maid','undead-farm'] as const){
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
