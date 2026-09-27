import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

import {dispatch,parseSave} from '../src/core/engine.ts';
import {catalog,started} from './helpers.ts';

const pack=JSON.parse(readFileSync('content/packs/poverty-cheap-production-v2.json','utf8'));
const EVENT_ID='poverty-cheap-production-v2.shared-room-seasons';

function enterCheap(day:number){
  let s=started();
  s.run.calendar.elapsedDays=day;
  s=dispatch(s,{type:'endDay'},catalog);
  s=dispatch(s,{type:'chooseLodging',id:'lodging.cheap'},catalog);
  return s;
}

test('cheap lodging v2 adds several seasonal variants without changing lodging economics',()=>{
  assert.ok(catalog.packs.some(p=>p.id==='poverty-cheap-production-v2'));
  assert.equal(pack.events.length,1);
  assert.deepEqual(
    pack.events[0].variants.map((variant:any)=>variant.id),
    ['spring-window','summer-heat','winter-stove','shared-room']
  );
  assert.ok(pack.events[0].conditions.some((c:any)=>c.kind==='housingTier'&&c.value==='cheap'));
  assert.ok(pack.events[0].choices.every((choice:any)=>choice.effects.length===0));
  assert.doesNotMatch(JSON.stringify(pack),/secret.?debt|lender/i);

  const cheap=catalog.definitions.lodgings.find(lodging=>lodging.id==='lodging.cheap');
  const normal=catalog.definitions.lodgings.find(lodging=>lodging.id==='lodging.normal');
  const street=catalog.definitions.lodgings.find(lodging=>lodging.id==='lodging.street');
  assert.ok(cheap&&normal&&street);
  assert.ok(cheap.moneyCost>street.moneyCost);
  assert.ok(cheap.moneyCost<normal.moneyCost);
});

test('cheap lodging v2 selects spring, summer, and winter context variants naturally',()=>{
  const cases=[
    {day:0,variant:'spring-window'},
    {day:10,variant:'summer-heat'},
    {day:30,variant:'winter-stove'}
  ] as const;

  for(const c of cases){
    const s=enterCheap(c.day);
    assert.equal(s.run.pending?.eventId,EVENT_ID);
    assert.equal(s.run.pending?.variantId,c.variant);
    assert.equal(s.run.housingState.current,'cheap');
    assert.equal(s.run.flow.night?.phase,'NightEventResolution');
  }
});

test('autumn remains available to the original cheap-lodging family rather than being replaced by v2',()=>{
  const s=enterCheap(20);
  assert.notEqual(s.run.pending?.eventId,EVENT_ID);
  assert.equal(s.run.pending?.eventId,'poverty-cheap-production.shared-quiet-autumn');
});

test('cheap lodging v2 variant and NightFlow position survive reload',()=>{
  const selected=enterCheap(30);
  const variant=selected.run.pending?.variantId;
  const reloaded=parseSave(JSON.stringify(selected),catalog);

  assert.equal(reloaded.run.pending?.eventId,EVENT_ID);
  assert.equal(reloaded.run.pending?.variantId,variant);
  assert.equal(reloaded.run.flow.night?.phase,'NightEventResolution');

  let out=dispatch(reloaded,{type:'choice',id:'settle-in'},catalog);
  assert.equal(out.run.flow.night?.phase,'VoluntaryNightChoice');
  out=dispatch(out,{type:'chooseNightChoice',id:'night.sleep'},catalog);
  assert.equal(out.run.calendar.elapsedDays,31);
  assert.equal(out.run.flow.night,null);
});

test('cheap v2 does not activate in normal or street housing',()=>{
  for(const lodging of ['lodging.normal','lodging.street'] as const){
    let s=started();
    s.run.calendar.elapsedDays=0;
    s=dispatch(s,{type:'endDay'},catalog);
    s=dispatch(s,{type:'chooseLodging',id:lodging},catalog);
    assert.notEqual(s.run.pending?.eventId,EVENT_ID);
  }
});
