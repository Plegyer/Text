import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

import {dispatch} from '../src/core/engine.ts';
import {items} from '../src/core/schema.ts';
import {catalog,started} from './helpers.ts';

const pack=JSON.parse(readFileSync('content/packs/poverty-recovery-production.json','utf8'));

function enterStreet(day:number){
  let s=started();
  s.run.calendar.elapsedDays=day;
  s=dispatch(s,{type:'endDay'},catalog);
  s=dispatch(s,{type:'chooseLodging',id:'lodging.street'},catalog);
  return s;
}

test('recovery pack contains three ordinary help shapes with no hard recovery prerequisite',()=>{
  assert.ok(catalog.packs.some(p=>p.id==='poverty-recovery-production'));
  assert.deepEqual(
    pack.events.map((event:any)=>event.id),
    [
      'poverty-recovery-production.small-coin-help',
      'poverty-recovery-production.short-cleanup',
      'poverty-recovery-production.herb-bundle'
    ]
  );
  assert.doesNotMatch(JSON.stringify(pack),/secret.?debt|lender/i);

  const allowedKinds=new Set(['housingTier','calendarSeason','calendarDayInYear']);
  for(const event of pack.events){
    assert.ok(event.conditions.every((condition:any)=>allowedKinds.has(condition.kind)));
    assert.ok(event.choices.some((choice:any)=>choice.effects.length===0));
  }
  assert.ok(items.includes('herb'));
});

test('resource help, low-stakes opportunity, and item assistance are naturally reachable from street Night',()=>{
  const cases=[
    {day:1,event:'poverty-recovery-production.small-coin-help'},
    {day:3,event:'poverty-recovery-production.short-cleanup'},
    {day:5,event:'poverty-recovery-production.herb-bundle'}
  ] as const;

  for(const c of cases){
    const s=enterStreet(c.day);
    assert.equal(s.run.pending?.eventId,c.event);
    assert.equal(s.run.housingState.current,'street');
    assert.equal(s.run.flow.night?.phase,'NightEventResolution');
  }
});

test('resource-help amounts are read from production pack and commit once',()=>{
  const event=pack.events.find((entry:any)=>entry.id==='poverty-recovery-production.small-coin-help');
  const choice=event.choices.find((entry:any)=>entry.id==='take-coins');
  const effect=choice.effects.find((entry:any)=>entry.kind==='modifyResource'&&entry.resource==='money');
  assert.ok(effect.delta>0);

  let s=enterStreet(1);
  const before=s.run.resources.money;
  s=dispatch(s,{type:'choice',id:'take-coins'},catalog);
  assert.equal(s.run.resources.money,before+effect.delta);
  assert.throws(()=>dispatch(s,{type:'choice',id:'take-coins'},catalog),/Нет активной сцены/);
});

test('existing herb inventory assistance is optional and uses the authored pack count',()=>{
  const event=pack.events.find((entry:any)=>entry.id==='poverty-recovery-production.herb-bundle');
  const choice=event.choices.find((entry:any)=>entry.id==='take-herb');
  const effect=choice.effects.find((entry:any)=>entry.kind==='addItem'&&entry.id==='herb');
  assert.ok(effect.count>0);

  let s=enterStreet(5);
  const before=s.run.resources.inventory.herb??0;
  s=dispatch(s,{type:'choice',id:'take-herb'},catalog);
  assert.equal(s.run.resources.inventory.herb,before+effect.count);
});

test('declining recovery help keeps ordinary NightFlow playable',()=>{
  let s=enterStreet(3);
  s=dispatch(s,{type:'choice',id:'keep-resting'},catalog);
  assert.equal(s.run.flow.night?.phase,'VoluntaryNightChoice');
  s=dispatch(s,{type:'chooseNightChoice',id:'night.sleep'},catalog);
  assert.equal(s.run.calendar.elapsedDays,4);
  assert.equal(s.run.flow.night,null);
  assert.ok(s.run.dayState.energyCurrent>=1);
});
