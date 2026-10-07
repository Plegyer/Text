import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

import {dispatch,energyMax,parseSave} from '../src/core/engine.ts';
import {catalog,started} from './helpers.ts';
import {SECRET_DEBT_LENDER_EVENT_ID} from '../src/core/secretDebt.ts';

const streetPack=JSON.parse(readFileSync('content/packs/poverty-street-production.json','utf8'));
const EVENT_ID='poverty-street-production.pressure-winter';

function reload<T>(state:T){
  return parseSave(JSON.stringify(state),catalog);
}

function winterStreet(){
  let s=started();
  s.run.calendar.elapsedDays=30;
  s=dispatch(s,{type:'endDay'},catalog);
  s=dispatch(s,{type:'chooseLodging',id:'lodging.street'},catalog);
  assert.equal(s.run.pending?.eventId,EVENT_ID);
  return s;
}

test('selected production street event and variant survive reload without reroll',()=>{
  const selected=winterStreet();
  const variant=selected.run.pending?.variantId;
  const rng=selected.run.rng;
  const history=structuredClone(selected.run.history[EVENT_ID]);

  const reloaded=reload(selected);
  assert.equal(reloaded.run.pending?.eventId,EVENT_ID);
  assert.equal(reloaded.run.pending?.variantId,variant);
  assert.equal(reloaded.run.rng,rng);
  assert.deepEqual(reloaded.run.history[EVENT_ID],history);
});

test('street pressure effect commits once, NightFlow resumes, and next-day modifier applies once',()=>{
  const event=streetPack.events.find((e:any)=>e.id===EVENT_ID);
  const pressureChoice=event.choices.find((c:any)=>c.id==='keep-moving');
  const penalty=pressureChoice.effects.find((e:any)=>e.kind==='addNextDayModifier');
  assert.ok(penalty);

  let s=reload(winterStreet());
  const beforeChoiceDelta=s.run.dayState.nextDayModifiers.energyDelta;

  s=dispatch(s,{type:'choice',id:'keep-moving'},catalog);
  assert.equal(s.run.pending,null);
  assert.equal(s.run.flow.night?.phase,'VoluntaryNightChoice');
  assert.equal(
    s.run.dayState.nextDayModifiers.energyDelta,
    beforeChoiceDelta+penalty.energyDelta
  );

  const committedDelta=s.run.dayState.nextDayModifiers.energyDelta;
  const historyAfterChoice=structuredClone(s.run.history[EVENT_ID]);
  s=reload(s);

  assert.equal(s.run.dayState.nextDayModifiers.energyDelta,committedDelta);
  assert.deepEqual(s.run.history[EVENT_ID],historyAfterChoice);
  assert.throws(()=>dispatch(s,{type:'choice',id:'keep-moving'},catalog),/Нет активной сцены/);

  const expectedEnergy=Math.max(1,energyMax(s)+committedDelta);
  s=dispatch(s,{type:'chooseNightChoice',id:'night.sleep'},catalog);

  assert.equal(s.run.calendar.elapsedDays,31);
  assert.equal(s.run.flow.night,null);
  assert.equal(s.run.dayState.energyCurrent,expectedEnergy);
  assert.deepEqual(s.run.dayState.nextDayModifiers,{energyDelta:0,statEffects:[],tags:[]});
  assert.equal(s.run.history[EVENT_ID].count,1);
  assert.equal(s.run.history[EVENT_ID].lastDay,30);
});

test('street event history and cooldown persist across reload into the next Night',()=>{
  let s=winterStreet();
  s=dispatch(s,{type:'choice',id:'take-shelter'},catalog);
  s=dispatch(s,{type:'chooseNightChoice',id:'night.sleep'},catalog);
  assert.equal(s.run.calendar.elapsedDays,31);
  assert.equal(s.run.history[EVENT_ID].count,1);

  s=reload(s);
  const history=structuredClone(s.run.history[EVENT_ID]);

  s=dispatch(s,{type:'endDay'},catalog);
  s=dispatch(s,{type:'chooseLodging',id:'lodging.street'},catalog);

  assert.notEqual(s.run.pending?.eventId,EVENT_ID);
  if(s.run.pending?.eventId===SECRET_DEBT_LENDER_EVENT_ID){
    s=dispatch(s,{type:'choice',id:'refuse'},catalog);
  }
  assert.deepEqual(s.run.history[EVENT_ID],history);
  assert.equal(s.run.flow.night?.phase,'VoluntaryNightChoice');
});
