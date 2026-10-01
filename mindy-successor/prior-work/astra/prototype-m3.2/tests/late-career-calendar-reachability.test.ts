import test from 'node:test';
import assert from 'node:assert/strict';

import {actionAvailable,dispatch,eligible} from '../src/core/engine.ts';
import {catalog,started} from './helpers.ts';
import type {Save} from '../src/core/schema.ts';

const year2=['tavern.shift','hunter.shift','guard.shift','merchant.shift'] as const;
const year3=['artist-geisha.shift','assassin.shift','prostitute.shift'] as const;

function settlePending(s:Save){
  let guard=0;
  while(s.run.pending){
    if(++guard>20)throw new Error('pending scene loop while advancing calendar');
    const event=catalog.events.find(item=>item.id===s.run.pending!.eventId);
    assert.ok(event,s.run.pending.eventId);
    const choice=event.choices.find(item=>eligible(item.conditions,s,catalog));
    assert.ok(choice,event.id);
    s=dispatch(s,{type:'choice',id:choice.id},catalog);
  }
  return s;
}

function advanceOneDay(s:Save){
  const before=s.run.calendar.elapsedDays;
  s=dispatch(s,{type:'sleep',payment:'money'},catalog);
  s=settlePending(s);
  assert.equal(s.run.calendar.elapsedDays,before+1);
  return s;
}

function available(s:Save,id:string){
  const action=catalog.definitions.actions.find(item=>item.id===id);
  assert.ok(action,id);
  return actionAvailable(action,s,catalog);
}

test('Year-2 late-career fallbacks become reachable naturally at day 40',()=>{
  let s=started();
  s.run.resources.money=100_000;
  for(let i=0;i<39;i++)s=advanceOneDay(s);
  assert.equal(s.run.calendar.elapsedDays,39);
  for(const id of year2)assert.equal(available(s,id),false,id);

  s=advanceOneDay(s);
  assert.equal(s.run.calendar.elapsedDays,40);
  for(const id of year2)assert.equal(available(s,id),true,id);
});

test('Year-3 late-career fallbacks become reachable naturally at day 80',()=>{
  let s=started();
  s.run.resources.money=100_000;
  for(let i=0;i<79;i++)s=advanceOneDay(s);
  assert.equal(s.run.calendar.elapsedDays,79);
  for(const id of year3)assert.equal(available(s,id),false,id);

  s=advanceOneDay(s);
  assert.equal(s.run.calendar.elapsedDays,80);
  for(const id of year3)assert.equal(available(s,id),true,id);
});
