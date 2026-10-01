import test from 'node:test';
import assert from 'node:assert/strict';

import {dispatch,meets,palaceAvailable} from '../src/core/engine.ts';
import {ordinaryHardWorkCareers,type OrdinaryHardWorkCareer,type Save} from '../src/core/schema.ts';
import {act,catalog,started} from './helpers.ts';

function readyRun(s:Save){
  if(!s.run.creation.complete){
    s.run.creation.remaining=0;
    s=dispatch(s,{type:'finishCreation'},catalog);
  }
  if(!s.run.flags['story.arrived'])s=act(s,'arrival');
  return s;
}

function completeHardWork(input:Save,career:OrdinaryHardWorkCareer){
  let s=readyRun(input);
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
  s=dispatch(s,{type:'commitEnding',id:`ending.${career}.hard-work`},catalog);
  return dispatch(s,{type:'completeEnding'},catalog);
}

function nextRun(s:Save){ return dispatch(s,{type:'newLife'},catalog); }

test('ten unique production Hard Work completions expose Palace; duplicate and Secret Debt progress do not substitute',()=>{
  let s=completeHardWork(started(),'lumber');
  assert.deepEqual(s.meta.hardWorkProgress,['lumber']);
  assert.equal(palaceAvailable(s.meta),false);

  s=completeHardWork(nextRun(s),'lumber');
  assert.equal(s.meta.hardWorkProgress.filter(x=>x==='lumber').length,1);
  assert.equal(palaceAvailable(s.meta),false);

  for(const career of ordinaryHardWorkCareers.slice(1,9)){
    s=completeHardWork(nextRun(s),career);
  }
  const ordinaryBeforeFinal=ordinaryHardWorkCareers.filter(c=>s.meta.hardWorkProgress.includes(c));
  assert.equal(ordinaryBeforeFinal.length,9);
  assert.equal(palaceAvailable(s.meta),false);
  assert.equal(s.meta.unlocks.includes('palace'),false);

  s.meta.hardWorkProgress.push('secret-debt');
  assert.equal(palaceAvailable(s.meta),false);
  assert.equal(meets({kind:'metaUnlock',unlock:'palace',present:true},s,catalog),false);

  const finalCareer=ordinaryHardWorkCareers[9];
  s=completeHardWork(nextRun(s),finalCareer);
  const completedOrdinary=ordinaryHardWorkCareers.filter(c=>s.meta.hardWorkProgress.includes(c));
  assert.equal(completedOrdinary.length,10);
  assert.equal(new Set(completedOrdinary).size,10);
  assert.equal(palaceAvailable(s.meta),true);
  assert.equal(meets({kind:'metaUnlock',unlock:'palace',present:true},s,catalog),true);
  assert.equal(s.meta.unlocks.includes('palace'),true);
});
