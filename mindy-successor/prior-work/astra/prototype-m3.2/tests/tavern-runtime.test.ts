import test from 'node:test';
import assert from 'node:assert/strict';

import {actionAvailable,dispatch,eligible} from '../src/core/engine.ts';
import type {Save} from '../src/core/schema.ts';
import {catalog,started} from './helpers.ts';

const preferred:Record<string,string>={
  'tavern.career.first-shift':'continue',
  'tavern.access.staff-key':'take-key',
  'tavern.access.guest-ledger':'record-ledger',
  'tavern.recurring-traveler.intro':'professional',
  'tavern.recurring-traveler.trust':'accept-night',
  'tavern.housing.meal-in-kind':'accept-meal'
};

function settlePending(state:Save){
  let s=state,guard=0;
  while(s.run.pending){
    if(++guard>80)throw new Error('pending scene loop: '+s.run.pending.eventId);
    const event=catalog.events.find(e=>e.id===s.run.pending!.eventId);
    assert.ok(event,s.run.pending.eventId);
    const wanted=preferred[event.id];
    const choice=(wanted?event.choices.find(c=>c.id===wanted&&eligible(c.conditions,s,catalog)):undefined)
      ??event.choices.find(c=>eligible(c.conditions,s,catalog));
    assert.ok(choice,event.id);
    s=dispatch(s,{type:'choice',id:choice.id},catalog);
  }
  return s;
}

function unlocked(){
  const s=started();
  s.run.character.stats.charm=45;
  s.run.character.stats.sociability=35;
  return s;
}

test('Tavern shift has twelve contextual scenes and season changes live route counters',()=>{
  const action=catalog.definitions.actions.find(a=>a.id==='tavern.shift');
  assert.ok(action);
  assert.equal(action.cost.energy,1);
  assert.equal(action.scenes?.length,12);

  const seasonal=action.seasonal!;
  assert.ok(seasonal.spring.some(e=>e.kind==='incrementCareerCounter'&&e.counter==='traveler_flow'));
  assert.ok(seasonal.summer.some(e=>e.kind==='incrementCareerCounter'&&e.counter==='room_pressure'));
  assert.ok(seasonal.autumn.some(e=>e.kind==='incrementCareerCounter'&&e.counter==='supply_pressure'));
  assert.ok(seasonal.winter.some(e=>e.kind==='incrementCareerCounter'&&e.counter==='shelter_pressure'));
});

test('first Tavern shift advances through Resolver and naturally issues narrow staff access',()=>{
  let s=unlocked();
  const action=catalog.definitions.actions.find(a=>a.id==='tavern.shift');
  assert.ok(action);
  assert.equal(actionAvailable(action,s,catalog),true);

  s=dispatch(s,{type:'action',id:'tavern.shift'},catalog);
  assert.equal(s.run.pending?.eventId,'tavern.career.first-shift');
  s=settlePending(s);

  assert.equal(s.run.progression.careers.tavern.stage,'trusted-worker');
  assert.equal(s.run.progression.careers.tavern.counters.completed_shifts,1);
  assert.ok(s.run.progression.careers.tavern.facts.includes('first-shift-complete'));
  assert.equal(s.run.resources.inventory.tavern_staff_key,1);
  assert.ok(s.run.progression.careers.tavern.facts.includes('staff-access-issued'));
  assert.ok(s.run.progression.careers.tavern.facts.includes('guest-ledger-evidence-ready'));
});

test('declining the recurring-traveler Night meeting preserves ordinary Tavern work',()=>{
  let s=unlocked();
  s=settlePending(dispatch(s,{type:'action',id:'tavern.shift'},catalog));

  s=dispatch(s,{type:'action',id:'tavern.shift'},catalog);
  assert.equal(s.run.pending?.eventId,'tavern.recurring-traveler.intro');
  s=dispatch(s,{type:'choice',id:'professional'},catalog);

  s=dispatch(s,{type:'action',id:'tavern.shift'},catalog);
  assert.equal(s.run.pending?.eventId,'tavern.recurring-traveler.trust');
  s=dispatch(s,{type:'choice',id:'decline-night'},catalog);

  const rel=s.run.progression.relationships['tavern.recurring-traveler'];
  assert.equal(rel.stage,'trusted');
  assert.equal(rel.choices['night-response'],'declined');
  assert.ok(rel.facts.includes('refusal-respected'));

  const action=catalog.definitions.actions.find(a=>a.id==='tavern.shift');
  assert.ok(action);
  assert.equal(actionAvailable(action,s,catalog),true);
});

test('three Rhetoric lessons publish the Tavern broker hook without a dummy Work action',()=>{
  let s=started();
  s.run.resources.money=5000;
  s.run.progression.careers.tavern={
    stage:'trusted-worker',shifts:0,counters:{completed_shifts:1},choices:{},facts:['first-shift-complete']
  };

  for(let i=0;i<2;i++){
    s=dispatch(s,{type:'schoolLesson',id:'school.course.rhetoric_and_social'},catalog);
    s=settlePending(s);
  }
  assert.equal(s.run.dayState.energyCurrent,1);

  s=dispatch(s,{type:'schoolLesson',id:'school.course.rhetoric_and_social'},catalog);
  assert.equal(s.run.progression.school.tracks['school.track.rhetoric_and_social'].counters.lessons_completed,3);
  assert.equal(s.run.dayState.energyCurrent,0);
  assert.equal(s.run.pending?.eventId,'tavern.school.broker');

  s=dispatch(s,{type:'choice',id:'apply'},catalog);
  assert.ok(s.run.progression.careers.tavern.facts.includes('school-broker-ready'));
  assert.equal(s.run.dayState.energyCurrent,0);
});

test('Tavern uses canonical D41 endings and retires legacy modern contracts',()=>{
  const expected={
    'ending.tavern.innkeeper':'specialist.tavern.house-ledger',
    'ending.tavern.information-broker':'knowledge.tavern.broker-index',
    'ending.tavern.sanctuary':'specialist.tavern.safehouse-network',
    'ending.tavern.hard-work':'tavern.hardwork.compat'
  } as const;
  for(const [id,reward] of Object.entries(expected)){
    const ending=catalog.definitions.endings.find(e=>e.id===id);
    assert.ok(ending,id);
    assert.equal(ending.reward,reward,id);
  }
  for(const retired of ['tavern-stay','tavern-guild','tavern-court']){
    assert.equal(catalog.definitions.endings.some(e=>e.id===retired),false,retired);
  }
});
