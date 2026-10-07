import test from 'node:test';
import assert from 'node:assert/strict';

import {dispatch,eligible} from '../src/core/engine.ts';
import {catalog,started} from './helpers.ts';
import type {Save} from '../src/core/schema.ts';
import {SECRET_DEBT_LENDER_EVENT_ID} from '../src/core/secretDebt.ts';

const ORDINARY_PREFIXES=[
  'poverty-street-production.',
  'poverty-street-production-v2.',
  'poverty-cheap-production.',
  'poverty-cheap-production-v2.',
  'poverty-recovery-production.',
  'poverty-pressure-production.',
  'poverty-closure-production-v14.'
];

function isOrdinaryPovertyEvent(id:string){
  return ORDINARY_PREFIXES.some(prefix=>id.startsWith(prefix));
}

function pressureScore(choice:any){
  return choice.effects.reduce((score:number,effect:any)=>{
    if(effect.kind==='addNextDayModifier'){
      return score+effect.energyDelta+effect.statEffects.reduce((sum:number,entry:any)=>sum+Math.min(0,entry.delta),0);
    }
    if(effect.kind==='modifyResource')return score+Math.min(0,effect.delta);
    if(effect.kind==='modifyStat')return score+Math.min(0,effect.delta);
    if(effect.kind==='modifyEnergy')return score+Math.min(0,effect.delta);
    if(effect.kind==='removeItem')return score-effect.count;
    return score;
  },0);
}

function resolveOrdinaryNightScenes(input:Save){
  let s=input;
  let guard=0;
  while(s.run.pending){
    if(++guard>12)throw new Error('ordinary poverty Night scene cascade exceeded guard');
    const event=catalog.events.find(entry=>entry.id===s.run.pending!.eventId);
    assert.ok(event);
    if(event.id===SECRET_DEBT_LENDER_EVENT_ID){
      s=dispatch(s,{type:'choice',id:'refuse'},catalog);
      continue;
    }
    assert.ok(isOrdinaryPovertyEvent(event.id),`unexpected Night event ${event.id}`);
    const allowed=s.run.pending.allowedChoiceIds??event.choices.map(choice=>choice.id);
    const choices=event.choices.filter(choice=>
      allowed.includes(choice.id)&&eligible(choice.conditions,s,catalog)
    );
    assert.ok(choices.length>0);
    const safe=[...choices].sort((a,b)=>pressureScore(b)-pressureScore(a))[0];
    assert.ok(pressureScore(safe)>=0,`${event.id} must expose a non-negative resolution in the long-run safety test`);
    s=dispatch(s,{type:'choice',id:safe.id},catalog);
  }
  return s;
}

test('representative repeated street/cheap runs remain recoverable and respect event history/cooldowns',()=>{
  const cheap=catalog.definitions.lodgings.find(lodging=>lodging.id==='lodging.cheap');
  assert.ok(cheap);

  const povertyEvents=catalog.events.filter(event=>isOrdinaryPovertyEvent(event.id));
  assert.ok(povertyEvents.length>=11);
  assert.doesNotMatch(
    JSON.stringify(catalog.packs.filter(pack=>pack.id.startsWith('poverty-'))),
    /secret.?debt|lender/i
  );

  for(const seed of [1,0x12345678]){
    let s=started();
    s.run.rng=seed;
    const seenDays=new Map<string,number[]>();

    for(let step=0;step<18;step++){
      const dayBefore=s.run.calendar.elapsedDays;
      const beforeCounts=new Map(
        povertyEvents.map(event=>[event.id,s.run.history[event.id]?.count??0])
      );

      s=dispatch(s,{type:'endDay'},catalog);
      const lodging=step%2===0?'lodging.street':'lodging.cheap';
      if(lodging==='lodging.cheap')assert.ok(s.run.resources.money>=cheap.moneyCost);
      s=dispatch(s,{type:'chooseLodging',id:lodging},catalog);
      s=resolveOrdinaryNightScenes(s);

      assert.equal(s.run.flow.night?.phase,'VoluntaryNightChoice');
      s=dispatch(s,{type:'chooseNightChoice',id:'night.sleep'},catalog);

      assert.equal(s.run.flow.night,null);
      assert.equal(s.run.calendar.elapsedDays,dayBefore+1);
      assert.ok(s.run.dayState.energyCurrent>=1);
      assert.ok(s.run.resources.money>=0);

      for(const event of povertyEvents){
        const before=beforeCounts.get(event.id)??0;
        const after=s.run.history[event.id]?.count??0;
        const delta=after-before;
        assert.ok(delta===0||delta===1,`${event.id} committed more than once in one Night`);
        if(delta===1){
          const days=seenDays.get(event.id)??[];
          days.push(dayBefore);
          seenDays.set(event.id,days);
        }
      }
    }

    for(const event of povertyEvents){
      const days=seenDays.get(event.id)??[];
      for(let i=1;i<days.length;i++){
        assert.ok(
          days[i]-days[i-1]>=event.cooldownDays,
          `${event.id} violated authored cooldown`
        );
      }
    }

    const before=s.run.progression.careers.lumber?.counters.completed_shifts??0;
    s=dispatch(s,{type:'action',id:'lumber.shift'},catalog);
    assert.equal(s.run.progression.careers.lumber?.counters.completed_shifts,before+1);
    assert.ok(s.run.dayState.energyCurrent>=0);
  }
});

test('ordinary poverty long-run set contains no one-off Secret Debt semantics',()=>{
  const ordinary=catalog.events.filter(event=>isOrdinaryPovertyEvent(event.id));
  assert.ok(ordinary.length>0);
  for(const event of ordinary){
    assert.doesNotMatch(event.id,/secret|debt|lender|slave/i);
    assert.doesNotMatch(event.sourceDomain??'',/secret|debt|lender|slave/i);
    assert.notEqual(event.priorityClass,'terminal');
  }
});
