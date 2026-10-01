import test from 'node:test';
import assert from 'node:assert/strict';

import {dispatch} from '../src/core/engine.ts';
import {ordinaryHardWorkCareers,type OrdinaryHardWorkCareer} from '../src/core/schema.ts';
import {act,catalog,started} from './helpers.ts';

function prime(career:OrdinaryHardWorkCareer){
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
  return s;
}

test('every ordinary Hard Work ending follows eligibility -> continued play -> explicit commit -> RunResult -> Meta exactly once',()=>{
  for(const career of ordinaryHardWorkCareers){
    const endingId=`ending.${career}.hard-work`;
    let s=act(prime(career),`${career}.shift`);

    assert.equal(s.run.status,'active',career);
    assert.ok(s.run.endings.eligible.includes(endingId),career);
    assert.equal(s.run.endings.committed,null,career);
    assert.equal(s.run.endings.result,null,career);
    assert.equal(s.meta.hardWorkProgress.includes(career),false,career);

    s.run.dayState.energyCurrent=Math.max(s.run.dayState.energyCurrent,1);
    s=act(s,'forage');
    assert.equal(s.run.status,'active',career);
    assert.equal(s.run.progression.careers[career]?.counters.completed_shifts,50,career);
    assert.equal(s.meta.hardWorkProgress.includes(career),false,career);

    s=dispatch(s,{type:'commitEnding',id:endingId},catalog);
    assert.equal(s.run.status,'ending_committed',career);
    assert.equal(s.run.endings.committed,endingId,career);
    assert.equal(s.run.endings.result,null,career);
    assert.equal(s.meta.hardWorkProgress.includes(career),false,career);

    s=dispatch(s,{type:'completeEnding'},catalog);
    assert.equal(s.run.status,'ended',career);
    assert.equal(s.run.endings.result?.endingId,endingId,career);
    assert.deepEqual(s.run.endings.result?.appliedMetaRewardIds,[`hardWork:${career}`],career);
    assert.ok(s.meta.hardWorkProgress.includes(career),career);
    assert.ok(s.meta.completedEndings.includes(endingId),career);
    assert.ok(s.meta.appliedResultTransactions.includes(s.run.endings.result!.transactionId),career);

    const completed=JSON.stringify(s);
    s=dispatch(s,{type:'completeEnding'},catalog);
    assert.equal(JSON.stringify(s),completed,career);
  }
});
