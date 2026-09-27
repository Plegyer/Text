import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

import {calendar,dispatch} from '../src/core/engine.ts';
import {catalog,started} from './helpers.ts';

const streetPack=JSON.parse(readFileSync('content/packs/poverty-street-production.json','utf8'));

function pressureScore(choice:any){
  return choice.effects.reduce((score:number,effect:any)=>{
    if(effect.kind==='addNextDayModifier'){
      return score+effect.energyDelta+effect.statEffects.reduce((sum:number,e:any)=>sum+Math.min(0,e.delta),0);
    }
    if(effect.kind==='modifyResource'&&effect.delta<0)return score+effect.delta;
    if(effect.kind==='modifyStat'&&effect.delta<0)return score+effect.delta;
    return score;
  },0);
}

test('worst ordinary street outcome preserves zero-money recovery into an executable starter job',()=>{
  const pressureEvent=streetPack.events
    .map((event:any)=>({
      event,
      worst:[...event.choices].sort((a:any,b:any)=>pressureScore(a)-pressureScore(b))[0]
    }))
    .filter(({worst}:any)=>pressureScore(worst)<0)
    .sort((a:any,b:any)=>pressureScore(a.worst)-pressureScore(b.worst))[0];

  assert.ok(pressureEvent,'production pack must expose an authored bad-pressure outcome');
  const season=pressureEvent.event.conditions.find((c:any)=>c.kind==='calendarSeason')?.value;
  assert.ok(season);
  const day=Array.from({length:40},(_,i)=>i).find(i=>calendar(i).season===season);
  assert.notEqual(day,undefined);

  let s=started();
  s.run.resources.money=0;
  s.run.calendar.elapsedDays=day!;

  s=dispatch(s,{type:'endDay'},catalog);
  assert.equal(s.run.flow.night?.phase,'LodgingResolution');

  s=dispatch(s,{type:'chooseLodging',id:'lodging.street'},catalog);
  assert.equal(s.run.resources.money,0);
  assert.equal(s.run.housingState.current,'street');
  assert.equal(s.run.pending?.eventId,pressureEvent.event.id);

  s=dispatch(s,{type:'choice',id:pressureEvent.worst.id},catalog);
  assert.equal(s.run.pending,null);
  assert.equal(s.run.flow.night?.phase,'VoluntaryNightChoice');

  s=dispatch(s,{type:'chooseNightChoice',id:'night.sleep'},catalog);
  assert.equal(s.run.calendar.elapsedDays,day!+1);
  assert.equal(s.run.flow.night,null);
  assert.ok(s.run.dayState.energyCurrent>=1,'ordinary poverty content must leave a playable next day');
  assert.ok(s.run.resources.money>=0);

  assert.equal(
    Object.keys(s.run.progression.careers).some(id=>/secret|slave|debt/i.test(id)),
    false,
    'Secret Debt is not required for baseline recovery'
  );

  s=dispatch(s,{type:'action',id:'lumber.shift'},catalog);
  assert.equal(s.run.progression.careers.lumber?.counters.completed_shifts,1);
  assert.ok(s.run.dayState.energyCurrent>=0);
});

test('every bad-pressure event keeps at least one free safe resolution path',()=>{
  for(const event of streetPack.events){
    const hasNegative=event.choices.some((choice:any)=>pressureScore(choice)<0);
    if(!hasNegative)continue;
    assert.ok(
      event.choices.some((choice:any)=>choice.effects.length===0),
      `${event.id} must retain a free safe choice`
    );
  }
});
