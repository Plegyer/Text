import test from 'node:test';
import assert from 'node:assert/strict';

import {dispatch} from '../src/core/engine.ts';
import {ordinaryHardWorkCareers,type Save, type Stat} from '../src/core/schema.ts';
import {catalog,started} from './helpers.ts';

const expected:Record<(typeof ordinaryHardWorkCareers)[number],{stats?:Partial<Record<Stat,number>>;money?:number}>={
  lumber:{stats:{strength:4,endurance:4}},
  'satyr-maid':{stats:{charm:4,grooming:4}},
  'undead-farm':{stats:{reason:4,magic:4}},
  tavern:{stats:{sociability:4,manners:4}},
  hunter:{stats:{dexterity:4,wits:4}},
  guard:{stats:{endurance:4,manners:4}},
  merchant:{money:1200},
  'artist-geisha':{stats:{creativity:4,grooming:4}},
  assassin:{stats:{dexterity:4,wits:4}},
  prostitute:{stats:{sexuality:4,charm:4}}
};

function completeHardWork(state:Save,career:(typeof ordinaryHardWorkCareers)[number]){
  const id=`ending.${career}.hard-work`;
  const ending=catalog.definitions.endings.find(e=>e.id===id);
  assert.ok(ending,id);
  assert.deepEqual(ending.metaRewards,[{kind:'hardWork',rewardId:`hardWork:${career}`,career}],career);
  state.run.endings.eligible=[id];
  state=dispatch(state,{type:'commitEnding',id},catalog);
  return dispatch(state,{type:'completeEnding'},catalog);
}

test('all ten production Hard Work endings grant their automatic Meta reward exactly once',()=>{
  for(const career of ordinaryHardWorkCareers){
    let s=completeHardWork(started(),career);
    assert.deepEqual(s.meta.hardWorkProgress,[career],career);
    assert.deepEqual(s.run.endings.result?.appliedMetaRewardIds,[`hardWork:${career}`],career);

    s=dispatch(s,{type:'newLife'},catalog);
    for(const [stat,value] of Object.entries(expected[career].stats??{})){
      assert.equal(s.run.character.stats[stat as Stat],value,`${career} ${stat}`);
    }
    assert.equal(s.run.resources.money,expected[career].money??600,career);

    s.run.character.creation.remaining=0;
    s.run.character.creation.complete=true;
    s.run.flags['story.arrived']=true;
    s.run.endings.eligible=[`ending.${career}.hard-work`];
    s=dispatch(s,{type:'commitEnding',id:`ending.${career}.hard-work`},catalog);
    s=dispatch(s,{type:'completeEnding'},catalog);
    assert.deepEqual(s.meta.hardWorkProgress,[career],career);
    assert.deepEqual(s.run.endings.result?.appliedMetaRewardIds,[],career);

    s=dispatch(s,{type:'newLife'},catalog);
    for(const [stat,value] of Object.entries(expected[career].stats??{})){
      assert.equal(s.run.character.stats[stat as Stat],value,`${career} duplicate ${stat}`);
    }
    assert.equal(s.run.resources.money,expected[career].money??600,`${career} duplicate`);
  }
});
