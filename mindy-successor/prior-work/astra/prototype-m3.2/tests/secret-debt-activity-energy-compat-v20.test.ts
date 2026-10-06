import test from 'node:test';
import assert from 'node:assert/strict';

import {actionAvailable,dispatch,eligible,parseSave} from '../src/core/engine.ts';
import {
  SECRET_DEBT_FORCED_NIGHT_EVENT_ID,
  SECRET_DEBT_HIDDEN_WORK_ACTION_ID,
  SECRET_DEBT_REPAY_ACTION_ID
} from '../src/core/secretDebt.ts';
import type {Save} from '../src/core/schema.ts';
import {catalog,started} from './helpers.ts';

const STREET_ENERGY_TAG='lodging.street.energy-penalty';
const BOUND_NIGHT_TAG='secret-debt.bound-night';

function setBound(s:Save,day=10){
  s.run.calendar.elapsedDays=day;
  s.run.day=day;
  s.run.secretDebt={
    status:'bound',
    acceptedDay:0,
    trapDay:10,
    boundDay:10,
    resolvedDay:null,
    debt:20000,
    hiddenShifts:0,
    grantApplied:true,
    lastLenderAttemptDay:null
  };
  return s;
}

function setAcceptedForTomorrow(s:Save){
  s.run.calendar.elapsedDays=9;
  s.run.day=9;
  s.run.secretDebt={
    status:'accepted',
    acceptedDay:0,
    trapDay:10,
    boundDay:null,
    resolvedDay:null,
    debt:0,
    hiddenShifts:0,
    grantApplied:true,
    lastLenderAttemptDay:0
  };
  return s;
}

function firstEligibleChoice(s:Save){
  const pending=s.run.pending;
  assert.ok(pending);
  const event=catalog.events.find(item=>item.id===pending.eventId);
  assert.ok(event,pending.eventId);
  const choice=event.choices.find(item=>
    (!pending.allowedChoiceIds||pending.allowedChoiceIds.includes(item.id))
    && eligible(item.conditions,s,catalog)
  );
  assert.ok(choice,pending.eventId);
  return choice.id;
}

function resolvePending(s:Save,max=40){
  let next=s;
  let guard=0;
  while(next.run.pending){
    assert.ok(++guard<=max,'pending scene loop');
    next=dispatch(next,{type:'choice',id:firstEligibleChoice(next)},catalog);
  }
  return next;
}

function finishNight(s:Save,lodgingId:'lodging.normal'|'lodging.cheap'|'lodging.street'){
  let next=dispatch(s,{type:'endDay'},catalog);
  let guard=0;
  while(next.run.flow.night){
    assert.ok(++guard<=60,'NightFlow loop');
    if(next.run.pending){
      next=dispatch(next,{type:'choice',id:firstEligibleChoice(next)},catalog);
      continue;
    }
    const phase=next.run.flow.night.phase;
    if(phase==='LodgingResolution'){
      next=dispatch(next,{type:'chooseLodging',id:lodgingId},catalog);
      continue;
    }
    if(phase==='VoluntaryNightChoice'){
      next=dispatch(next,{type:'chooseNightChoice',id:'night.sleep'},catalog);
      continue;
    }
    throw new Error('Unexpected NightFlow phase: '+phase);
  }
  return next;
}

function enterForest(s:Save){
  return dispatch(s,{type:'enterActivity',id:'lumber.forest'},catalog);
}

test('T1 D51 bound + normal control leaves 2 Energy and Activity can spend exactly 2',()=>{
  let s=setBound(started());
  s.run.resources.money=1000;
  s=finishNight(s,'lodging.normal');
  assert.equal(s.run.dayState.energyCurrent,2);
  s=enterForest(s);
  assert.equal(s.run.dayState.energyCurrent,0);
  assert.equal(s.run.flow.activity?.activityId,'lumber.forest');
});

test('T2 D51 bound + cheap control leaves 2 Energy and Activity remains available',()=>{
  let s=setBound(started());
  s.run.resources.money=1000;
  s=finishNight(s,'lodging.cheap');
  assert.equal(s.run.dayState.energyCurrent,2);
  s=enterForest(s);
  assert.equal(s.run.dayState.energyCurrent,0);
});

test('T3 D51 bound + Street processes both penalties, preserves Grooming loss, and floors the pair at 2',()=>{
  let s=setBound(started());
  const grooming=s.run.character.stats.grooming;
  s=finishNight(s,'lodging.street');
  assert.equal(s.run.dayState.energyCurrent,2);
  assert.equal(s.run.character.stats.grooming,Math.max(0,grooming-1));
  s=enterForest(s);
  assert.equal(s.run.dayState.energyCurrent,0);
});

test('T4 reload before forced-Night choice preserves exactly-once bound and Street provenance',()=>{
  let s=setBound(started());
  s=dispatch(s,{type:'endDay'},catalog);
  assert.equal(s.run.pending?.eventId,SECRET_DEBT_FORCED_NIGHT_EVENT_ID);
  s=parseSave(JSON.stringify(s),catalog);
  assert.equal(s.run.pending?.eventId,SECRET_DEBT_FORCED_NIGHT_EVENT_ID);

  s=dispatch(s,{type:'choice',id:'continue'},catalog);
  assert.equal(s.run.flow.night?.phase,'LodgingResolution');
  assert.deepEqual(s.run.dayState.nextDayModifiers.tags.filter(tag=>tag===BOUND_NIGHT_TAG),[BOUND_NIGHT_TAG]);
  s=dispatch(s,{type:'chooseLodging',id:'lodging.street'},catalog);

  assert.equal(s.run.dayState.energyCurrent,2);
  assert.equal(s.run.historyState.eventHistory[SECRET_DEBT_FORCED_NIGHT_EVENT_ID]?.count,1);
});

test('T5 reload after forced-Night choice preserves queued -1 and Street adds its modifier exactly once',()=>{
  let s=setBound(started());
  s=dispatch(s,{type:'endDay'},catalog);
  s=dispatch(s,{type:'choice',id:'continue'},catalog);
  assert.equal(s.run.dayState.nextDayModifiers.energyDelta,-1);
  assert.deepEqual(s.run.dayState.nextDayModifiers.tags.filter(tag=>tag===BOUND_NIGHT_TAG),[BOUND_NIGHT_TAG]);

  s=parseSave(JSON.stringify(s),catalog);
  assert.equal(s.run.dayState.nextDayModifiers.energyDelta,-1);
  assert.deepEqual(s.run.dayState.nextDayModifiers.tags.filter(tag=>tag===BOUND_NIGHT_TAG),[BOUND_NIGHT_TAG]);
  s=dispatch(s,{type:'chooseLodging',id:'lodging.street'},catalog);

  assert.equal(s.run.dayState.energyCurrent,2);
  assert.deepEqual(s.run.dayState.nextDayModifiers,{energyDelta:0,statEffects:[],tags:[]});
});

test('T6 reload on the D51 morning preserves 2 Energy; Activity and hidden work retain their locked costs',()=>{
  let s=setBound(started());
  s=finishNight(s,'lodging.street');
  s=parseSave(JSON.stringify(s),catalog);
  assert.equal(s.run.dayState.energyCurrent,2);
  assert.deepEqual(s.run.dayState.nextDayModifiers,{energyDelta:0,statEffects:[],tags:[]});

  const activity=enterForest(parseSave(JSON.stringify(s),catalog));
  assert.equal(activity.run.dayState.energyCurrent,0);

  const hiddenAction=catalog.definitions.actions.find(item=>item.id===SECRET_DEBT_HIDDEN_WORK_ACTION_ID);
  assert.ok(hiddenAction);
  assert.equal(hiddenAction.cost.energy,1);
  assert.equal(actionAvailable(hiddenAction,s,catalog),true);
  const hidden=dispatch(s,{type:'action',id:SECRET_DEBT_HIDDEN_WORK_ACTION_ID},catalog);
  assert.equal(hidden.run.dayState.energyCurrent,1);
});

test('T7 acceptance-to-trap activation morning gets Street -1 only and no retroactive forced-Night penalty',()=>{
  let s=setAcceptedForTomorrow(started());
  s=dispatch(s,{type:'endDay'},catalog);
  assert.equal(s.run.pending,null);
  assert.equal(s.run.flow.night?.phase,'LodgingResolution');
  s=dispatch(s,{type:'chooseLodging',id:'lodging.street'},catalog);
  assert.equal(s.run.flow.night?.phase,'VoluntaryNightChoice');
  s=dispatch(s,{type:'chooseNightChoice',id:'night.sleep'},catalog);

  assert.equal(s.run.secretDebt.status,'bound');
  assert.equal(s.run.secretDebt.boundDay,1);
  assert.equal(s.run.dayState.energyCurrent,2);
  assert.equal(s.run.pending?.eventId,'secret-debt.trap-activation');
  assert.equal(s.run.historyState.eventHistory[SECRET_DEBT_FORCED_NIGHT_EVENT_ID],undefined);
});

test('T8 second Street morning after trap activation is a real bound Night and receives the D51 pair floor',()=>{
  let s=setAcceptedForTomorrow(started());
  s=finishNight(s,'lodging.street');
  assert.equal(s.run.secretDebt.status,'bound');
  assert.equal(s.run.dayState.energyCurrent,2);
  s=resolvePending(s);

  s=dispatch(s,{type:'endDay'},catalog);
  assert.equal(s.run.pending?.eventId,SECRET_DEBT_FORCED_NIGHT_EVENT_ID);
  s=dispatch(s,{type:'choice',id:'continue'},catalog);
  assert.equal(s.run.flow.night?.suppressVoluntaryMenu,true);
  s=dispatch(s,{type:'chooseLodging',id:'lodging.street'},catalog);
  assert.equal(s.run.dayState.energyCurrent,2);
  assert.equal(s.run.historyState.eventHistory[SECRET_DEBT_FORCED_NIGHT_EVENT_ID]?.count,1);
});

test('T9 Meta +1 diagnostic does not turn D51 into a grant: base 4 with the locked pair still resolves to 2',()=>{
  let s=setBound(started());
  s.meta.ruleModifiers['energy.daily']=1;
  s.run.dayState.energyCurrent=4;
  s=finishNight(s,'lodging.street');
  assert.equal(s.run.dayState.energyCurrent,2);
  s=enterForest(s);
  assert.equal(s.run.dayState.energyCurrent,0);
});

test('T10 exiting Secret Debt before Night removes bound penalty; Street alone leaves 2 Energy',()=>{
  let s=setBound(started());
  s.run.resources.money=20000;
  const repay=catalog.definitions.actions.find(item=>item.id===SECRET_DEBT_REPAY_ACTION_ID);
  assert.ok(repay);
  assert.equal(actionAvailable(repay,s,catalog),true);
  s=dispatch(s,{type:'action',id:SECRET_DEBT_REPAY_ACTION_ID},catalog);
  assert.equal(s.run.secretDebt.status,'paid-freedom');

  s=finishNight(s,'lodging.street');
  assert.equal(s.run.dayState.energyCurrent,2);
  assert.equal(s.run.historyState.eventHistory[SECRET_DEBT_FORCED_NIGHT_EVENT_ID],undefined);
  s=enterForest(s);
  assert.equal(s.run.dayState.energyCurrent,0);
});

test('T11 unrelated third -1 applies after D51 pair floor and may reduce usable Energy below 2',()=>{
  let s=setBound(started());
  s=dispatch(s,{type:'endDay'},catalog);
  assert.equal(s.run.pending?.eventId,SECRET_DEBT_FORCED_NIGHT_EVENT_ID);
  s=dispatch(s,{type:'choice',id:'continue'},catalog);

  s.run.dayState.nextDayModifiers.energyDelta-=1;
  s.run.dayState.nextDayModifiers.tags.push('test.unrelated-energy-penalty');
  s=dispatch(s,{type:'chooseLodging',id:'lodging.street'},catalog);

  assert.equal(s.run.dayState.energyCurrent,1);
  assert.throws(()=>enterForest(s),/Energy/);

  const hiddenAction=catalog.definitions.actions.find(item=>item.id===SECRET_DEBT_HIDDEN_WORK_ACTION_ID);
  assert.ok(hiddenAction);
  assert.equal(actionAvailable(hiddenAction,s,catalog),true);
  const hidden=dispatch(s,{type:'action',id:SECRET_DEBT_HIDDEN_WORK_ACTION_ID},catalog);
  assert.equal(hidden.run.dayState.energyCurrent,0);
});

test('D51 provenance is explicit and locked values remain unchanged',()=>{
  const street=catalog.definitions.lodgings.find(item=>item.id==='lodging.street');
  const normal=catalog.definitions.lodgings.find(item=>item.id==='lodging.normal');
  const cheap=catalog.definitions.lodgings.find(item=>item.id==='lodging.cheap');
  assert.ok(street&&normal&&cheap);
  assert.equal(street.moneyCost,0);
  assert.equal(street.nextDayEnergyDelta,-1);
  assert.deepEqual(street.nextDayEffects,[{stat:'grooming',delta:-1}]);
  assert.equal(normal.moneyCost,100);
  assert.equal(cheap.moneyCost,50);

  const activity=catalog.definitions.activities.find(item=>item.id==='lumber.forest');
  assert.ok(activity);
  assert.equal(activity.entryEnergyCost,2);

  let s=setBound(started());
  s=dispatch(s,{type:'endDay'},catalog);
  s=dispatch(s,{type:'choice',id:'continue'},catalog);
  assert.ok(s.run.dayState.nextDayModifiers.tags.includes(BOUND_NIGHT_TAG));
  s.run.dayState.nextDayModifiers.tags.push(STREET_ENERGY_TAG);
  assert.ok(s.run.dayState.nextDayModifiers.tags.includes(STREET_ENERGY_TAG));
});
