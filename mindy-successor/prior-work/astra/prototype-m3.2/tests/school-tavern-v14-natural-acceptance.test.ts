import test from 'node:test';
import assert from 'node:assert/strict';

import {actionAvailable,calendar,dispatch,eligible} from '../src/core/engine.ts';
import type {Save} from '../src/core/schema.ts';
import {catalog,started} from './helpers.ts';

const hooks=[
  {course:'school.course.literacy_and_numbers',event:'tavern.school.records',fact:'school-records-ready'},
  {course:'school.course.rhetoric_and_social',event:'tavern.school.broker',fact:'school-broker-ready'},
  {course:'school.course.etiquette_and_presentation',event:'tavern.school.etiquette',fact:'school-etiquette-ready'},
  {course:'school.course.arcana',event:'tavern.school.arcana',fact:'school-arcana-ready'}
] as const;

function settlePending(state:Save){
  let s=state,guard=0;
  while(s.run.pending){
    if(++guard>120)throw new Error('pending loop: '+s.run.pending.eventId);
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
    if(++guard>160)throw new Error('night loop');
    if(s.run.pending){s=settlePending(s);continue;}
    const phase=s.run.flow.night?.phase;
    if(phase==='LodgingResolution'){s=dispatch(s,{type:'chooseLodging',id:'lodging.street'},catalog);continue;}
    if(phase==='VoluntaryNightChoice'){s=dispatch(s,{type:'chooseNightChoice',id:'night.sleep'},catalog);continue;}
    throw new Error('night stalled at '+phase);
  }
  return s;
}
function ensureEnergy(s:Save){return s.run.dayState.energyCurrent>0?s:finishNight(s);}
function work(s:Save,id:string){
  s=ensureEnergy(s);
  return settlePending(dispatch(s,{type:'action',id},catalog));
}

test('C5-156 clean run reaches all four Tavern School hooks through real unlock, work, tuition and lessons',()=>{
  let s=started();
  const tavern=catalog.definitions.actions.find(a=>a.id==='tavern.shift');
  assert.ok(tavern);
  assert.equal(actionAvailable(tavern,s,catalog),false);

  while(calendar(s.run.day).year<2)s=finishNight(s);
  assert.equal(actionAvailable(tavern,s,catalog),true,'Year-2 fallback must naturally unlock Tavern');
  s=work(s,'tavern.shift');
  assert.equal(s.run.progression.careers.tavern.stage,'trusted-worker');
  const tavernShifts=s.run.progression.careers.tavern.counters.completed_shifts;
  assert.equal(tavernShifts,1);

  while(s.run.resources.money<5_000)s=work(s,'lumber.shift');

  for(const hook of hooks){
    for(let i=0;i<3;i++){
      s=ensureEnergy(s);
      s=dispatch(s,{type:'schoolLesson',id:hook.course},catalog);
      if(i<2)s=settlePending(s);
    }
    assert.equal(s.run.pending?.eventId,hook.event,hook.event);
    assert.equal(s.run.progression.careers.tavern.counters.completed_shifts,tavernShifts,hook.event);
    const energy=s.run.dayState.energyCurrent;
    s=dispatch(s,{type:'choice',id:'apply'},catalog);
    assert.equal(s.run.dayState.energyCurrent,energy,hook.event);
    assert.ok(s.run.progression.careers.tavern.facts.includes(hook.fact),hook.event);
    s=settlePending(s);
  }

  for(const hook of hooks){
    assert.equal(s.run.historyState.eventHistory[hook.event]?.count,1,hook.event);
    assert.equal(s.run.progression.careers.tavern.facts.filter(x=>x===hook.fact).length,1,hook.event);
  }
  assert.equal(s.run.progression.careers.tavern.counters.completed_shifts,tavernShifts);
});
