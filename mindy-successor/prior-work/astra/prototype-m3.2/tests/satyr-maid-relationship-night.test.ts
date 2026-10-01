import test from 'node:test';
import assert from 'node:assert/strict';

import {actionAvailable,dispatch,parseSave} from '../src/core/engine.ts';
import type {Save} from '../src/core/schema.ts';
import {catalog,started} from './helpers.ts';

function satyrReady(){
  const s=started();
  s.run.progression.careers['satyr-maid']={
    stage:'known-face',shifts:0,counters:{completed_shifts:3},choices:{},facts:['first-shift-complete','floor-rhythm-complete','known-face-established']
  };
  return s;
}

function choose(state:Save,id:string){
  assert.ok(state.run.pending,'expected pending event for '+id);
  return dispatch(state,{type:'choice',id},catalog);
}

function work(state:Save){
  state.run.dayState.energyCurrent=Math.max(1,state.run.dayState.energyCurrent);
  return dispatch(state,{type:'action',id:'satyr-maid.shift'},catalog);
}

test('recurring-guest refusal keeps Satyr professional work available',()=>{
  let s=satyrReady();
  s=work(s);
  assert.equal(s.run.pending?.eventId,'satyr-maid.recurring-guest.intro');
  s=choose(s,'professional');

  s=work(s);
  assert.equal(s.run.pending?.eventId,'satyr-maid.recurring-guest.service');
  s=choose(s,'decline-night');

  assert.equal(s.run.progression.relationships['satyr-maid.recurring-guest'].stage,'professional-trust');
  assert.equal(s.run.progression.relationships['satyr-maid.recurring-guest'].choices['night-response'],'declined');
  const action=catalog.definitions.actions.find(a=>a.id==='satyr-maid.shift');
  assert.ok(action);
  assert.equal(actionAvailable(action,s,catalog),true);

  s=dispatch(s,{type:'endDay'},catalog);
  s=dispatch(s,{type:'chooseLodging',id:'lodging.normal'},catalog);
  assert.throws(
    ()=>dispatch(s,{type:'chooseNightChoice',id:'satyr-maid.night.recurring-guest'},catalog),
    /недоступно/
  );
});

test('accepted recurring-guest chain crosses work -> Night -> request -> work and survives reload',()=>{
  let s=satyrReady();
  s=choose(work(s),'professional');
  s=work(s);
  assert.equal(s.run.pending?.eventId,'satyr-maid.recurring-guest.service');
  s=choose(s,'accept-night');
  assert.equal(s.run.progression.relationships['satyr-maid.recurring-guest'].stage,'professional-trust');

  s=dispatch(s,{type:'endDay'},catalog);
  s=dispatch(s,{type:'chooseLodging',id:'lodging.normal'},catalog);
  s=parseSave(JSON.stringify(s),catalog);
  const dayBefore=s.run.calendar.elapsedDays;

  s=dispatch(s,{type:'chooseNightChoice',id:'satyr-maid.night.recurring-guest'},catalog);
  assert.equal(s.run.pending?.eventId,'satyr-maid.recurring-guest.night');
  s=parseSave(JSON.stringify(s),catalog);
  assert.equal(s.run.pending?.eventId,'satyr-maid.recurring-guest.night');

  s=choose(s,'talk');
  assert.equal(s.run.pending?.eventId,'satyr-maid.recurring-guest.request');
  s=choose(s,'accept-request');
  assert.equal(s.run.calendar.elapsedDays,dayBefore+1);
  assert.equal(s.run.dayState.energyCurrent,3,'Satyr voluntary Night adds no implicit next-day Energy penalty');
  assert.equal(s.run.progression.relationships['satyr-maid.recurring-guest'].stage,'request-open');

  s=work(s);
  assert.equal(s.run.pending?.eventId,'satyr-maid.recurring-guest.return');
  s=choose(s,'resolve-professionally');

  assert.equal(s.run.progression.relationships['satyr-maid.recurring-guest'].stage,'request-resolved');
  assert.ok(s.run.progression.relationships['satyr-maid.recurring-guest'].facts.includes('request-resolved'));
  assert.ok(s.run.progression.careers['satyr-maid'].facts.includes('personal-network-ready'));
});
