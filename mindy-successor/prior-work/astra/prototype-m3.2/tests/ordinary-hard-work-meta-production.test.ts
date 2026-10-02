import test from 'node:test';
import assert from 'node:assert/strict';

import {dispatch} from '../src/core/engine.ts';
import {hardWorkPackageDefinitions} from '../src/core/hardWorkPackageCatalog.ts';
import {ordinaryHardWorkCareers,type OrdinaryHardWorkCareer} from '../src/core/schema.ts';
import {act,catalog,started} from './helpers.ts';

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

test('all ten production Hard Work endings grant one permanent earned package and no automatic next-life reward',()=>{
  for(const career of ordinaryHardWorkCareers){
    let s=completeProductionHardWork(career);
    assert.deepEqual(s.meta.hardWorkProgress,[career],career);
    assert.deepEqual(s.run.endings.result?.appliedMetaRewardIds,[`hardWork:${career}`],career);

    const snapshot=JSON.stringify(s);
    s=dispatch(s,{type:'completeEnding'},catalog);
    assert.equal(JSON.stringify(s),snapshot,career);

    s=dispatch(s,{type:'newLife'},catalog);
    assert.equal(s.run.resources.money,600,career);
    assert.equal(Object.values(s.run.character.stats).every(value=>value===1),true,career);
    assert.equal(s.run.character.lust,1,career);
    assert.deepEqual(s.run.creation.activeHardWorkPackages,[],career);
    assert.equal(s.run.creation.hardWorkPackagesApplied,false,career);

    s=dispatch(s,{type:'setHardWorkPackageActive',career,active:true},catalog);
    assert.deepEqual(s.run.creation.activeHardWorkPackages,[career],career);
    s.run.creation.remaining=0;
    s=dispatch(s,{type:'finishCreation'},catalog);

    const packageDefinition=hardWorkPackageDefinitions.find(item=>item.career===career);
    assert.ok(packageDefinition,career);
    for(const bonus of packageDefinition.statBonuses){
      assert.equal(s.run.character.stats[bonus.stat],6,`${career}.${bonus.stat}`);
    }
    assert.equal(s.run.character.lust,1+(packageDefinition.lustBonus??0),career);
    assert.equal(s.run.creation.hardWorkPackagesApplied,true,career);
    assert.throws(
      ()=>dispatch(s,{type:'setHardWorkPackageActive',career,active:false},catalog),
      /выбор наследия.*закрыт/i,
      career
    );
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
