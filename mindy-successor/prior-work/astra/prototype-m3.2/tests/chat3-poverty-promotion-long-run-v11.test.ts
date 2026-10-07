import test from 'node:test';
import assert from 'node:assert/strict';

import {dispatch,eligible} from '../src/core/engine.ts';
import {catalog,started} from './helpers.ts';
import {povertyPendingLocalizationKey} from '../src/ui/povertyDepth.ts';
import type {Save} from '../src/core/schema.ts';
import {SECRET_DEBT_LENDER_EVENT_ID} from '../src/core/secretDebt.ts';

const PREFIXES=['poverty-street-production.','poverty-street-production-v2.','poverty-cheap-production.','poverty-cheap-production-v2.','poverty-recovery-production.','poverty-pressure-production.','poverty-closure-production-v14.'];
const isOrdinary=(id:string)=>PREFIXES.some(prefix=>id.startsWith(prefix));
function pressureScore(choice:any){
 return choice.effects.reduce((score:number,effect:any)=>{
  if(effect.kind==='addNextDayModifier')return score+effect.energyDelta+effect.statEffects.reduce((sum:number,entry:any)=>sum+Math.min(0,entry.delta),0);
  if(effect.kind==='modifyResource')return score+Math.min(0,effect.delta);
  if(effect.kind==='modifyStat')return score+Math.min(0,effect.delta);
  if(effect.kind==='modifyEnergy')return score+Math.min(0,effect.delta);
  if(effect.kind==='removeItem')return score-effect.count;
  return score;
 },0);
}
function resolveOrdinary(input:Save){
 let state=input,guard=0;
 while(state.run.pending){
  if(++guard>12)throw new Error('ordinary poverty Night scene cascade exceeded guard');
  const event=catalog.events.find(entry=>entry.id===state.run.pending!.eventId);
  assert.ok(event);
  if(event.id===SECRET_DEBT_LENDER_EVENT_ID){
    state=dispatch(state,{type:'choice',id:'refuse'},catalog);
    continue;
  }
  assert.ok(isOrdinary(event.id),'unexpected Night event '+event.id);
  const allowed=state.run.pending.allowedChoiceIds??event.choices.map(choice=>choice.id);
  const choices=event.choices.filter(choice=>allowed.includes(choice.id)&&eligible(choice.conditions,state,catalog));
  assert.ok(choices.length>0,event.id);
  const safe=[...choices].sort((a,b)=>pressureScore(b)-pressureScore(a))[0];
  assert.ok(pressureScore(safe)>=0,event.id+' safe resolution');
  state=dispatch(state,{type:'choice',id:safe.id},catalog);
 }
 return state;
}

test('C3-118 current poverty-depth consumer provides deterministic variety',()=>{
 const summer=new Set(Array.from({length:8},(_,i)=>povertyPendingLocalizationKey('poverty-street-production.helpful-summer','default',i+1)));
 const cheapSpring=new Set(Array.from({length:8},(_,i)=>povertyPendingLocalizationKey('poverty-cheap-production-v2.shared-room-seasons','spring-window',i+1)));
 assert.ok(summer.size>=4);
 assert.ok(cheapSpring.size>=2);
 assert.equal(povertyPendingLocalizationKey('poverty-street-production.helpful-summer','default',1),povertyPendingLocalizationKey('poverty-street-production.helpful-summer','default',5));
});

test('C3-118 forty alternating street/cheap Nights remain playable and exit into Lumber',()=>{
 let state=started();
 state.run.resources.money=10_000;
 for(let step=0;step<40;step++){
  const before=state.run.calendar.elapsedDays;
  state=dispatch(state,{type:'endDay'},catalog);
  const lodging=step%2===0?'lodging.street':'lodging.cheap';
  state=dispatch(state,{type:'chooseLodging',id:lodging},catalog);
  state=resolveOrdinary(state);
  assert.equal(state.run.flow.night?.phase,'VoluntaryNightChoice');
  state=dispatch(state,{type:'chooseNightChoice',id:'night.sleep'},catalog);
  assert.equal(state.run.calendar.elapsedDays,before+1);
  assert.ok(state.run.dayState.energyCurrent>=1);
  assert.ok(state.run.resources.money>=0);
 }
 const before=state.run.progression.careers.lumber?.counters.completed_shifts??0;
 state=dispatch(state,{type:'action',id:'lumber.shift'},catalog);
 assert.equal(state.run.progression.careers.lumber?.counters.completed_shifts,before+1);
});

test('C3-118 normal lodging gets no new Chat 3 blocking poverty event',()=>{
 let state=started();
 state.run.resources.money=10_000;
 state=dispatch(state,{type:'endDay'},catalog);
 state=dispatch(state,{type:'chooseLodging',id:'lodging.normal'},catalog);
 assert.notEqual(state.run.pending?.eventId?.startsWith('poverty-normal-production'),true);
});
