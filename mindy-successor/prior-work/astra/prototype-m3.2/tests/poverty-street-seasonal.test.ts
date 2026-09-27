import test from 'node:test';
import assert from 'node:assert/strict';

import {dispatch,parseSave} from '../src/core/engine.ts';
import {catalog,started} from './helpers.ts';

const PREFIX='poverty-street-production.';

function reload<T>(state:T){
  return parseSave(JSON.stringify(state),catalog);
}

function enterStreet(day:number){
  let s=started();
  s.run.calendar.elapsedDays=day;
  s=dispatch(s,{type:'endDay'},catalog);
  s=dispatch(s,{type:'chooseLodging',id:'lodging.street'},catalog);
  return s;
}

test('ordinary street production content varies deterministically across the authored seasonal cycle',()=>{
  const cases=[
    {day:0,season:'spring',event:null},
    {day:10,season:'summer',event:'poverty-street-production.helpful-summer'},
    {day:20,season:'autumn',event:'poverty-street-production.neutral-autumn'},
    {day:30,season:'winter',event:'poverty-street-production.pressure-winter'}
  ] as const;

  for(const c of cases){
    const s=enterStreet(c.day);
    const actual=s.run.pending?.eventId?.startsWith(PREFIX)?s.run.pending.eventId:null;
    assert.equal(actual,c.event,c.season);
    if(c.event){
      assert.equal(s.run.flow.night?.phase,'NightEventResolution',c.season);
    }else{
      assert.equal(s.run.flow.night?.phase,'VoluntaryNightChoice',c.season);
    }
  }
});

test('season-selected street event identity and variant are stable across reload',()=>{
  for(const day of [10,20,30]){
    const selected=enterStreet(day);
    assert.ok(selected.run.pending?.eventId?.startsWith(PREFIX));
    const eventId=selected.run.pending!.eventId;
    const variantId=selected.run.pending!.variantId;
    const history=structuredClone(selected.run.history[eventId]);

    const reloaded=reload(selected);
    assert.equal(reloaded.run.pending?.eventId,eventId);
    assert.equal(reloaded.run.pending?.variantId,variantId);
    assert.deepEqual(reloaded.run.history[eventId],history);
  }
});

test('seasonal context is authored with typed calendar conditions rather than hidden test routing',()=>{
  const pack=catalog.packs.find(p=>p.id==='poverty-street-production');
  assert.ok(pack);
  const seasons=new Set(
    pack.events.flatMap(event=>
      event.conditions
        .filter((condition:any)=>condition.kind==='calendarSeason')
        .map((condition:any)=>condition.value)
    )
  );

  assert.deepEqual([...seasons].sort(),['autumn','summer','winter']);
  assert.ok(pack.events.every(event=>
    event.conditions.some((condition:any)=>condition.kind==='housingTier'&&condition.value==='street')
  ));
});
