import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

import {dispatch} from '../src/core/engine.ts';
import {catalog,started} from './helpers.ts';

const pack=JSON.parse(readFileSync('content/packs/poverty-pressure-production.json','utf8'));

function pressureScore(choice:any){
  return choice.effects.reduce((score:number,effect:any)=>{
    if(effect.kind==='addNextDayModifier'){
      return score+effect.energyDelta+effect.statEffects.reduce((sum:number,entry:any)=>sum+Math.min(0,entry.delta),0);
    }
    return score;
  },0);
}

function enterStreet(day:number){
  let s=started();
  s.run.calendar.elapsedDays=day;
  s=dispatch(s,{type:'endDay'},catalog);
  s=dispatch(s,{type:'chooseLodging',id:'lodging.street'},catalog);
  return s;
}

test('pressure pack contains several non-terminal ordinary-poverty families with free exits',()=>{
  assert.ok(catalog.packs.some(p=>p.id==='poverty-pressure-production'));
  assert.equal(pack.events.length,3);
  assert.doesNotMatch(JSON.stringify(pack),/secret.?debt|lender/i);

  for(const event of pack.events){
    assert.equal(event.priorityClass,'normal_progression');
    assert.ok(event.conditions.some((condition:any)=>condition.kind==='housingTier'&&condition.value==='street'));
    assert.ok(event.choices.some((choice:any)=>choice.effects.length===0));
    assert.ok(event.choices.some((choice:any)=>pressureScore(choice)<0));
  }
});

test('pressure families are naturally reachable on their authored spring contexts',()=>{
  const cases=[
    {day:6,event:'poverty-pressure-production.cold-rain'},
    {day:7,event:'poverty-pressure-production.noisy-loading'},
    {day:8,event:'poverty-pressure-production.muddy-splash'}
  ] as const;

  for(const c of cases){
    const s=enterStreet(c.day);
    assert.equal(s.run.pending?.eventId,c.event);
    assert.equal(s.run.flow.night?.phase,'NightEventResolution');
  }
});

test('worst natural pressure outcome still reaches next day and a starter job',()=>{
  const ranked=pack.events.flatMap((event:any)=>
    event.choices.map((choice:any)=>({event,choice,score:pressureScore(choice)}))
  ).sort((a:any,b:any)=>a.score-b.score);

  const worst=ranked[0];
  assert.ok(worst.score<0);
  const dayInYear=worst.event.conditions.find((condition:any)=>
    condition.kind==='calendarDayInYear'&&condition.op==='eq'
  )?.value;
  assert.ok(dayInYear);

  let s=started();
  s.run.resources.money=0;
  s.run.calendar.elapsedDays=dayInYear-1;
  s=dispatch(s,{type:'endDay'},catalog);
  s=dispatch(s,{type:'chooseLodging',id:'lodging.street'},catalog);
  assert.equal(s.run.pending?.eventId,worst.event.id);

  s=dispatch(s,{type:'choice',id:worst.choice.id},catalog);
  assert.equal(s.run.flow.night?.phase,'VoluntaryNightChoice');
  s=dispatch(s,{type:'chooseNightChoice',id:'night.sleep'},catalog);

  assert.equal(s.run.flow.night,null);
  assert.ok(s.run.dayState.energyCurrent>=1);
  assert.ok(s.run.resources.money>=0);

  s=dispatch(s,{type:'action',id:'lumber.shift'},catalog);
  assert.equal(s.run.progression.careers.lumber?.counters.completed_shifts,1);
});

test('pressure values remain tuning directions rather than exact locked magnitudes',()=>{
  const negativeChoices=pack.events.flatMap((event:any)=>event.choices)
    .filter((choice:any)=>pressureScore(choice)<0);

  assert.ok(negativeChoices.length>=3);
  assert.ok(negativeChoices.every((choice:any)=>pressureScore(choice)<0));
  assert.ok(pack.events.every((event:any)=>event.choices.some((choice:any)=>choice.effects.length===0)));
});
