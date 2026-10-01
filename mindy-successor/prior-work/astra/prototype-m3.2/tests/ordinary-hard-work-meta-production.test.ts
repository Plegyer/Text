import test from 'node:test';
import assert from 'node:assert/strict';

import {dispatch} from '../src/core/engine.ts';
import {ordinaryHardWorkCareers,type OrdinaryHardWorkCareer,type Stat} from '../src/core/schema.ts';
import {act,catalog,started} from './helpers.ts';

const statRewards:Partial<Record<OrdinaryHardWorkCareer,readonly [Stat,Stat]>>={
  lumber:['strength','endurance'],
  'satyr-maid':['charm','grooming'],
  'undead-farm':['reason','magic'],
  tavern:['sociability','manners'],
  hunter:['dexterity','wits'],
  guard:['endurance','manners'],
  'artist-geisha':['creativity','grooming'],
  assassin:['dexterity','wits'],
  prostitute:['sexuality','charm']
};

function completeProductionHardWork(career:OrdinaryHardWorkCareer){
  let s=started();
  s.run.calendar.elapsedDays=80;
  s.run.dayState.energyCurrent=3;
  const definition=catalog.definitions.careers?.find(item=>item.id===career);
  assert.ok(definition,career);
  s.run.progression.careers[career]={
    stage:definition.initialStage,
    shifts:0,
    counters:{completed_shifts:49},
    choices:{},
    facts:[]
  };
  s=act(s,`${career}.shift`);
  const endingId=`ending.${career}.hard-work`;
  assert.equal(s.run.progression.careers[career]?.counters.completed_shifts,50,career);
  assert.ok(s.run.endings.eligible.includes(endingId),career);
  s=dispatch(s,{type:'commitEnding',id:endingId},catalog);
  s=dispatch(s,{type:'completeEnding'},catalog);
  return s;
}

test('all ten production Hard Work endings wire the locked automatic Meta reward exactly once',()=>{
  for(const career of ordinaryHardWorkCareers){
    let s=completeProductionHardWork(career);
    assert.deepEqual(s.meta.hardWorkProgress,[career],career);
    assert.deepEqual(s.run.endings.result?.appliedMetaRewardIds,[`hardWork:${career}`],career);

    const snapshot=JSON.stringify(s);
    s=dispatch(s,{type:'completeEnding'},catalog);
    assert.equal(JSON.stringify(s),snapshot,career);

    s=dispatch(s,{type:'newLife'},catalog);
    if(career==='merchant'){
      assert.equal(s.run.resources.money,1200,career);
    }else{
      const reward=statRewards[career];
      assert.ok(reward,career);
      assert.equal(s.run.character.stats[reward[0]],4,career);
      assert.equal(s.run.character.stats[reward[1]],4,career);
    }
  }
});

test('production Hard Work reward IDs and careers match the master ten-career ledger',()=>{
  for(const career of ordinaryHardWorkCareers){
    const ending=catalog.definitions.endings.find(item=>item.id===`ending.${career}.hard-work`);
    assert.ok(ending,career);
    assert.deepEqual(ending.metaRewards,[{
      kind:'hardWork',
      rewardId:`hardWork:${career}`,
      career
    }],career);
  }
});
