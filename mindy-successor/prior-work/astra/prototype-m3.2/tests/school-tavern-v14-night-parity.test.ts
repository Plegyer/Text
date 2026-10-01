import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

import {dispatch,eligible,parseSave} from '../src/core/engine.ts';
import type {Save} from '../src/core/schema.ts';
import {catalog,started} from './helpers.ts';

const pack=JSON.parse(readFileSync('content/packs/tavern-school.json','utf8'));
const hooks=[
  {track:'school.track.literacy_and_numbers',nightChoice:'school.night_study.literacy_and_numbers.reason',event:'tavern.school.records',fact:'school-records-ready',media:'school.teacher.literacy-and-numbers.classroom'},
  {track:'school.track.rhetoric_and_social',nightChoice:'school.night_study.rhetoric_and_social.charm',event:'tavern.school.broker',fact:'school-broker-ready',media:'school.teacher.rhetoric-and-social.classroom'},
  {track:'school.track.etiquette_and_presentation',nightChoice:'school.night_study.etiquette_and_presentation.manners',event:'tavern.school.etiquette',fact:'school-etiquette-ready',media:'school.teacher.etiquette-and-presentation.classroom'},
  {track:'school.track.arcana',nightChoice:'school.night_study.arcana.magic',event:'tavern.school.arcana',fact:'school-arcana-ready',media:'school.teacher.arcana.classroom'}
] as const;

function ready():Save{
  const s=started();
  s.run.resources.money=10_000;
  s.run.progression.careers.tavern={stage:'trusted-worker',shifts:0,counters:{completed_shifts:1},choices:{},facts:['first-shift-complete']};
  return s;
}
function settlePending(state:Save){
  let s=state,guard=0;
  while(s.run.pending){
    if(++guard>60)throw new Error('pending loop: '+s.run.pending.eventId);
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

test('C5-151 live Tavern gates accept the same local threshold from lessons or typed Night-study progress',()=>{
  for(const hook of hooks){
    const event=pack.events.find((x:any)=>x.id===hook.event);
    assert.ok(event,hook.event);
    const gate=event.conditions.find((x:any)=>x.kind==='any'&&x.conditions?.some((y:any)=>y.kind==='schoolCounter'));
    assert.ok(gate,hook.event);
    assert.deepEqual(gate.conditions.map((x:any)=>[x.track,x.counter,x.op,x.value]),[
      [hook.track,'lessons_completed','gte',3],
      [hook.track,'night_study_sessions','gte',3]
    ]);
    assert.ok(event.reactionTriggers.some((x:any)=>x.kind==='nightChoiceCompleted'&&x.choice===hook.nightChoice),hook.event);
    assert.deepEqual(event.variants[0].media,[hook.media],hook.event);
    assert.equal(event.maxShows,1,hook.event);
  }
});

test('C5-151/C5-154 three Night-study sessions surface each exact Tavern hook once across save/reload',()=>{
  for(const hook of hooks){
    let s=ready();
    for(let i=0;i<2;i++)s=settlePending(studyNight(s,hook.nightChoice));
    assert.equal(s.run.progression.school.tracks[hook.track].counters.night_study_sessions,2,hook.event);
    assert.equal(s.run.progression.school.tracks[hook.track].counters.lessons_completed??0,0,hook.event);
    s=parseSave(JSON.stringify(s),catalog);
    s=studyNight(s,hook.nightChoice);
    assert.equal(s.run.progression.school.tracks[hook.track].counters.night_study_sessions,3,hook.event);
    assert.equal(s.run.pending?.eventId,hook.event,hook.event);
    const energy=s.run.dayState.energyCurrent;
    s=dispatch(s,{type:'choice',id:'apply'},catalog);
    assert.equal(s.run.dayState.energyCurrent,energy,hook.event);
    assert.ok(s.run.progression.careers.tavern.facts.includes(hook.fact),hook.event);
    s=settlePending(s);
    s=parseSave(JSON.stringify(s),catalog);
    assert.equal(s.run.historyState.eventHistory[hook.event]?.count,1,hook.event);
    s=settlePending(studyNight(s,hook.nightChoice));
    assert.equal(s.run.progression.school.tracks[hook.track].counters.night_study_sessions,4,hook.event);
    assert.equal(s.run.historyState.eventHistory[hook.event]?.count,1,hook.event);
    assert.equal(s.run.progression.careers.tavern.facts.filter(x=>x===hook.fact).length,1,hook.event);
  }
});
