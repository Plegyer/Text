import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

import {dispatch} from '../src/core/engine.ts';
import {catalog,started} from './helpers.ts';

const streetPack=JSON.parse(readFileSync('content/packs/poverty-street-production.json','utf8'));
const STREET_PREFIX='poverty-street-production.';

function startAt(day:number){
  const s=started();
  s.run.calendar.elapsedDays=day;
  return s;
}

function enterStreet(day:number){
  let s=startAt(day);
  s=dispatch(s,{type:'endDay'},catalog);
  assert.equal(s.run.flow.night?.phase,'LodgingResolution');
  s=dispatch(s,{type:'chooseLodging',id:'lodging.street'},catalog);
  assert.equal(s.run.housingState.current,'street');
  return s;
}

test('ordinary street production pack is loaded and contains helpful, neutral, and bad-pressure families',()=>{
  assert.ok(catalog.packs.some(p=>p.id==='poverty-street-production'));
  assert.deepEqual(
    streetPack.events.map((e:any)=>e.id),
    [
      'poverty-street-production.helpful-summer',
      'poverty-street-production.neutral-autumn',
      'poverty-street-production.pressure-winter'
    ]
  );
  assert.ok(streetPack.events.every((e:any)=>
    e.conditions.some((c:any)=>c.kind==='housingTier'&&c.value==='street') &&
    e.reactionTriggers.some((t:any)=>t.kind==='nightPhase'&&t.point==='after_lodging')
  ));
  assert.equal(JSON.stringify(streetPack).includes('secret-debt'),false);
  assert.equal(JSON.stringify(streetPack).includes('lender'),false);
});

test('street events are reached naturally through EndDay -> production street lodging',()=>{
  const cases=[
    {day:10,event:'poverty-street-production.helpful-summer',choice:'take-errand'},
    {day:20,event:'poverty-street-production.neutral-autumn',choice:'settle-in'},
    {day:30,event:'poverty-street-production.pressure-winter',choice:'take-shelter'}
  ] as const;

  for(const c of cases){
    let s=enterStreet(c.day);
    assert.equal(s.run.pending?.eventId,c.event);
    assert.equal(s.run.flow.night?.phase,'NightEventResolution');

    s=dispatch(s,{type:'choice',id:c.choice},catalog);
    assert.equal(s.run.pending,null);
    assert.equal(s.run.flow.night?.phase,'VoluntaryNightChoice');

    s=dispatch(s,{type:'chooseNightChoice',id:'night.sleep'},catalog);
    assert.equal(s.run.calendar.elapsedDays,c.day+1);
    assert.equal(s.run.flow.night,null);
  }
});

test('production street events do not activate in normal or cheap housing',()=>{
  for(const lodging of ['lodging.normal','lodging.cheap'] as const){
    let s=startAt(10);
    s=dispatch(s,{type:'endDay'},catalog);
    s=dispatch(s,{type:'chooseLodging',id:lodging},catalog);
    assert.equal(s.run.pending?.eventId?.startsWith(STREET_PREFIX)??false,false);
  }
});

test('INITIAL_TUNING effects are structural directions rather than exact Product locks',()=>{
  const helpful=streetPack.events.find((e:any)=>e.id.endsWith('helpful-summer'));
  const pressure=streetPack.events.find((e:any)=>e.id.endsWith('pressure-winter'));
  const gain=helpful.choices.flatMap((c:any)=>c.effects).find((e:any)=>e.kind==='modifyResource'&&e.resource==='money');
  const penalty=pressure.choices.flatMap((c:any)=>c.effects).find((e:any)=>e.kind==='addNextDayModifier');

  assert.ok(gain.delta>0,'helpful tuning must currently help rather than assert one exact amount');
  assert.ok(penalty.energyDelta<0,'pressure tuning must currently add pressure rather than assert one exact magnitude');
  assert.ok(pressure.choices.some((c:any)=>c.effects.length===0),'bad-pressure event retains a safe/free resolution');
});
