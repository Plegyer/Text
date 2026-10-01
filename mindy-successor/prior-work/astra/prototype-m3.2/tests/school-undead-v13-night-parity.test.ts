import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

import {dispatch,eligible,parseSave} from '../src/core/engine.ts';
import type {Save} from '../src/core/schema.ts';
import {catalog,started} from './helpers.ts';

const pack=JSON.parse(readFileSync('content/packs/undead-farm-school.json','utf8'));
const hooks=[
  {track:'school.track.arcana',nightChoice:'school.night_study.arcana.magic',event:'undead-farm.school.arcana-research',fact:'school-research-ready'},
  {track:'school.track.literacy_and_numbers',nightChoice:'school.night_study.literacy_and_numbers.reason',event:'undead-farm.school.management-records',fact:'school-management-ready'}
] as const;

function ready():Save{
  const s=started();
  s.run.resources.money=10_000;
  s.run.progression.careers['undead-farm']={stage:'reliable-helper',shifts:0,counters:{completed_shifts:1},choices:{},facts:['first-shift-complete']};
  return s;
}

function settlePending(state:Save){
  let s=state,guard=0;
  while(s.run.pending){
    if(++guard>40)throw new Error('pending scene loop');
    const event=catalog.events.find(e=>e.id===s.run.pending!.eventId);
    assert.ok(event,s.run.pending.eventId);
    const choice=event.choices.find(c=>eligible(c.conditions,s,catalog));
    assert.ok(choice,event.id);
    s=dispatch(s,{type:'choice',id:choice.id},catalog);
  }
  return s;
}

function studyNight(state:Save,nightChoice:string){
  let s=dispatch(state,{type:'endDay'},catalog);
  s=dispatch(s,{type:'chooseLodging',id:'lodging.normal'},catalog);
  return dispatch(s,{type:'chooseNightChoice',id:nightChoice},catalog);
}

test('C5-137 live Undead Farm School gates accept the same local threshold from lessons or Night-study sessions',()=>{
  for(const hook of hooks){
    const event=pack.events.find((x:any)=>x.id===hook.event);
    assert.ok(event,hook.event);
    const gate=event.conditions.find((x:any)=>x.kind==='any'&&x.conditions?.some((y:any)=>y.kind==='schoolCounter'));
    assert.ok(gate,hook.event);
    assert.deepEqual(gate.conditions.map((x:any)=>[x.track,x.counter,x.op,x.value]),[
      [hook.track,'lessons_completed','gte',3],
      [hook.track,'night_study_sessions','gte',3]
    ]);
    assert.ok(event.reactionTriggers.some((x:any)=>x.kind==='nightChoiceCompleted'&&x.choice===hook.nightChoice));
    assert.equal(event.maxShows,1);
  }
});

test('C5-137/C5-141 three Night-study sessions surface each exact hook once across save reload',()=>{
  for(const hook of hooks){
    let s=ready();
    for(let i=0;i<2;i++){
      s=studyNight(s,hook.nightChoice);
      s=settlePending(s);
    }
    assert.equal(s.run.progression.school.tracks[hook.track].counters.night_study_sessions,2);
    assert.equal(s.run.progression.school.tracks[hook.track].counters.lessons_completed??0,0);
    s=parseSave(JSON.stringify(s),catalog);
    s=studyNight(s,hook.nightChoice);
    assert.equal(s.run.progression.school.tracks[hook.track].counters.night_study_sessions,3);
    assert.equal(s.run.pending?.eventId,hook.event);
    const energyBefore=s.run.dayState.energyCurrent;
    s=dispatch(s,{type:'choice',id:'apply'},catalog);
    assert.equal(s.run.dayState.energyCurrent,energyBefore);
    assert.ok(s.run.progression.careers['undead-farm'].facts.includes(hook.fact));
    s=settlePending(s);
    s=parseSave(JSON.stringify(s),catalog);
    assert.equal(s.run.historyState.eventHistory[hook.event]?.count,1);
    s=studyNight(s,hook.nightChoice);
    s=settlePending(s);
    assert.equal(s.run.progression.school.tracks[hook.track].counters.night_study_sessions,4);
    assert.equal(s.run.historyState.eventHistory[hook.event]?.count,1);
    assert.equal(s.run.progression.careers['undead-farm'].facts.filter(x=>x===hook.fact).length,1);
  }
});
