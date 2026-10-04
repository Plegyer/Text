import test from 'node:test';
import assert from 'node:assert/strict';
import {dispatch,eligible} from '../src/core/engine.ts';
import {catalog,started} from './helpers.ts';

function settleLumberMilestones(state:ReturnType<typeof started>){
  let s=state,guard=0;
  while(s.run.pending&&['lumber.career-trusted-worker','lumber.career-veteran'].includes(s.run.pending.eventId)){
    if(++guard>4)throw new Error('Lumber milestone loop');
    const event=catalog.events.find(e=>e.id===s.run.pending!.eventId);
    assert.ok(event,s.run.pending.eventId);
    const allowed=s.run.pending.allowedChoiceIds??event.choices.map(c=>c.id);
    const choice=event.choices.find(c=>allowed.includes(c.id)&&eligible(c.conditions,s,catalog));
    assert.ok(choice,event.id);
    s=dispatch(s,{type:'choice',id:choice.id},catalog);
  }
  return s;
}

test('Lumber ending eligibility stays playable until explicit commit and completes through RunResult flow',()=>{
  let s=started();
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
  assert.equal(s.run.status,'active');
  assert.equal(s.run.endings.committed,null);
  assert.equal(s.run.endings.result,null);
  assert.ok(!s.meta.hardWorkProgress.includes('lumber'));
  assert.equal(s.run.pending?.eventId,'lumber.career-trusted-worker');
  s=settleLumberMilestones(s);
  assert.equal(s.run.pending,null);
  assert.equal(s.run.progression.careers.lumber.stage,'veteran');
  assert.ok(s.run.endings.eligible.includes('ending.lumber.hard-work'));

  s=dispatch(s,{type:'commitEnding',id:'ending.lumber.hard-work'},catalog);

  assert.equal(s.run.status,'ending_committed');
  assert.equal(s.run.endings.committed,'ending.lumber.hard-work');
  assert.equal(s.run.endings.result,null);
  assert.ok(!s.meta.hardWorkProgress.includes('lumber'));

  s=dispatch(s,{type:'completeEnding'},catalog);

  assert.equal(s.run.status,'ended');
  assert.equal(s.run.endings.result?.endingId,'ending.lumber.hard-work');
  assert.deepEqual(s.run.endings.result?.appliedMetaRewardIds,['hardWork:lumber']);
  assert.ok(s.meta.hardWorkProgress.includes('lumber'));
  assert.ok(s.meta.completedEndings.includes('ending.lumber.hard-work'));
});
