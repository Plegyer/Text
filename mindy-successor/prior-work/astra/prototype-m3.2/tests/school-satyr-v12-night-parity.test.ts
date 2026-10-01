import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

import {dispatch,eligible,parseSave} from '../src/core/engine.ts';
import type {Save} from '../src/core/schema.ts';
import {catalog,started} from './helpers.ts';

const hooks=[
  {
    track:'school.track.literacy_and_numbers',
    nightChoice:'school.night_study.literacy_and_numbers.reason',
    event:'satyr-maid.school.management',
    fact:'school-management-ready'
  },
  {
    track:'school.track.rhetoric_and_social',
    nightChoice:'school.night_study.rhetoric_and_social.charm',
    event:'satyr-maid.school.rhetoric',
    fact:'school-rhetoric-ready'
  },
  {
    track:'school.track.body_confidence',
    nightChoice:'school.night_study.body_confidence.grooming',
    event:'satyr-maid.school.boundaries',
    fact:'school-boundaries-ready'
  }
] as const;

const pack=JSON.parse(readFileSync('content/packs/satyr-maid-school.json','utf8'));

function ready():Save{
  const s=started();
  s.run.resources.money=10_000;
  s.run.progression.careers['satyr-maid']={
    stage:'floor-rhythm',
    shifts:0,
    counters:{completed_shifts:1},
    choices:{},
    facts:['first-shift-complete']
  };
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

test('C5-128 each Satyr School event accepts the same local threshold from paid lessons or typed Night-study progress',()=>{
  for(const hook of hooks){
    const event=pack.events.find((x:any)=>x.id===hook.event);
    assert.ok(event,hook.event);
    const gate=event.conditions.find((x:any)=>x.kind==='any'&&x.conditions?.some((y:any)=>y.kind==='schoolCounter'));
    assert.ok(gate,hook.event);
    assert.deepEqual(
      gate.conditions.map((x:any)=>[x.track,x.counter,x.op,x.value]),
      [
        [hook.track,'lessons_completed','gte',3],
        [hook.track,'night_study_sessions','gte',3]
      ]
    );
    assert.ok(event.reactionTriggers.some((x:any)=>x.kind==='nightChoiceCompleted'&&x.choice===hook.nightChoice),hook.event);
    assert.equal(event.maxShows,1,hook.event);
  }
});

test('C5-128 three normal Night-study commands surface the same Satyr hook exactly once across reload',()=>{
  for(const hook of hooks){
    let s=ready();

    for(let i=0;i<2;i++){
      s=studyNight(s,hook.nightChoice);
      s=settlePending(s);
    }

    assert.equal(s.run.progression.school.tracks[hook.track].counters.night_study_sessions,2,hook.event);
    assert.equal(s.run.progression.school.tracks[hook.track].counters.lessons_completed??0,0,hook.event);

    s=parseSave(JSON.stringify(s),catalog);
    s=studyNight(s,hook.nightChoice);

    assert.equal(s.run.progression.school.tracks[hook.track].counters.night_study_sessions,3,hook.event);
    assert.equal(s.run.progression.school.tracks[hook.track].counters.lessons_completed??0,0,hook.event);
    assert.equal(s.run.pending?.eventId,hook.event,hook.event);

    const energyBeforeApply=s.run.dayState.energyCurrent;
    s=dispatch(s,{type:'choice',id:'apply'},catalog);
    assert.ok(s.run.progression.careers['satyr-maid'].facts.includes(hook.fact),hook.event);
    assert.equal(s.run.dayState.energyCurrent,energyBeforeApply,hook.event);

    s=settlePending(s);
    s=parseSave(JSON.stringify(s),catalog);
    assert.equal(s.run.historyState.eventHistory[hook.event]?.count,1,hook.event);

    s=studyNight(s,hook.nightChoice);
    s=settlePending(s);

    assert.equal(s.run.progression.school.tracks[hook.track].counters.night_study_sessions,4,hook.event);
    assert.equal(s.run.historyState.eventHistory[hook.event]?.count,1,hook.event);
    assert.equal(s.run.progression.careers['satyr-maid'].facts.filter(x=>x===hook.fact).length,1,hook.event);
  }
});
