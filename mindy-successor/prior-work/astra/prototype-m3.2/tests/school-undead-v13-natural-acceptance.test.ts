import test from 'node:test';
import assert from 'node:assert/strict';

import {dispatch,eligible} from '../src/core/engine.ts';
import type {Save} from '../src/core/schema.ts';
import {catalog,started} from './helpers.ts';

function settlePending(state:Save){
  let s=state,guard=0;
  while(s.run.pending){
    if(++guard>80)throw new Error('pending scene loop: '+s.run.pending.eventId);
    const event=catalog.events.find(e=>e.id===s.run.pending!.eventId);
    assert.ok(event,s.run.pending.eventId);
    const choice=event.choices.find(c=>eligible(c.conditions,s,catalog));
    assert.ok(choice,event.id);
    s=dispatch(s,{type:'choice',id:choice.id},catalog);
  }
  return s;
}

function finishNight(state:Save){
  let s=dispatch(state,{type:'endDay'},catalog),guard=0;
  while(s.run.flow.night||s.run.pending){
    if(++guard>80)throw new Error('night loop');
    if(s.run.pending){s=settlePending(s);continue;}
    const phase=s.run.flow.night?.phase;
    if(phase==='LodgingResolution'){s=dispatch(s,{type:'chooseLodging',id:'lodging.normal'},catalog);continue;}
    if(phase==='VoluntaryNightChoice'){s=dispatch(s,{type:'chooseNightChoice',id:'night.sleep'},catalog);continue;}
    throw new Error('night stalled at '+phase);
  }
  return s;
}

function ensureEnergy(state:Save){return state.run.dayState.energyCurrent>0?state:finishNight(state);}

function work(state:Save,id:string){
  let s=ensureEnergy(state);
  s=dispatch(s,{type:'action',id},catalog);
  return settlePending(s);
}

function paidLesson(state:Save,id:'school.course.arcana'|'school.course.literacy_and_numbers'){
  const s=ensureEnergy(state);
  return dispatch(s,{type:'schoolLesson',id},catalog);
}

test('C5-143 clean run reaches both Farm School hooks through real lessons with no extra Farm shift',()=>{
  let s=started();

  s=work(s,'undead-farm.shift');
  assert.equal(s.run.progression.careers['undead-farm'].stage,'reliable-helper');
  assert.equal(s.run.progression.careers['undead-farm'].counters.completed_shifts,1);

  while(s.run.resources.money<3_200)s=work(s,'lumber.shift');
  s=finishNight(s);
  const farmShifts=s.run.progression.careers['undead-farm'].counters.completed_shifts;

  for(let i=0;i<3;i++){
    s=paidLesson(s,'school.course.arcana');
    if(i<2)s=settlePending(s);
  }
  assert.equal(s.run.pending?.eventId,'undead-farm.school.arcana-research');
  assert.equal(s.run.progression.careers['undead-farm'].counters.completed_shifts,farmShifts);
  const arcanaEnergy=s.run.dayState.energyCurrent;
  s=dispatch(s,{type:'choice',id:'apply'},catalog);
  assert.equal(s.run.dayState.energyCurrent,arcanaEnergy);
  assert.ok(s.run.progression.careers['undead-farm'].facts.includes('school-research-ready'));
  s=settlePending(s);

  s=finishNight(s);
  for(let i=0;i<3;i++){
    s=paidLesson(s,'school.course.literacy_and_numbers');
    if(i<2)s=settlePending(s);
  }
  assert.equal(s.run.pending?.eventId,'undead-farm.school.management-records');
  assert.equal(s.run.progression.careers['undead-farm'].counters.completed_shifts,farmShifts);
  const managementEnergy=s.run.dayState.energyCurrent;
  s=dispatch(s,{type:'choice',id:'apply'},catalog);
  assert.equal(s.run.dayState.energyCurrent,managementEnergy);
  assert.ok(s.run.progression.careers['undead-farm'].facts.includes('school-management-ready'));
  s=settlePending(s);

  assert.equal(s.run.historyState.eventHistory['undead-farm.school.arcana-research']?.count,1);
  assert.equal(s.run.historyState.eventHistory['undead-farm.school.management-records']?.count,1);
  assert.equal(s.run.progression.careers['undead-farm'].counters.completed_shifts,farmShifts);
});
