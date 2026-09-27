import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

import {dispatch,parseSave} from '../src/core/engine.ts';
import {catalog,started} from './helpers.ts';

const cheapPack=JSON.parse(readFileSync('content/packs/poverty-cheap-production.json','utf8'));
const EVENT_ID='poverty-cheap-production.shared-quiet-autumn';

function reload<T>(state:T){
  return parseSave(JSON.stringify(state),catalog);
}

function startAt(day:number){
  const s=started();
  s.run.calendar.elapsedDays=day;
  return s;
}

test('cheap-lodging production pack adds visible context without changing lodging definitions',()=>{
  assert.ok(catalog.packs.some(p=>p.id==='poverty-cheap-production'));
  assert.equal(cheapPack.events.length,1);
  const event=cheapPack.events[0];
  assert.ok(event.conditions.some((c:any)=>c.kind==='housingTier'&&c.value==='cheap'));
  assert.equal(JSON.stringify(cheapPack).includes('secret-debt'),false);
  assert.equal(JSON.stringify(cheapPack).includes('lender'),false);

  const cheap=catalog.definitions.lodgings.find(l=>l.id==='lodging.cheap');
  const normal=catalog.definitions.lodgings.find(l=>l.id==='lodging.normal');
  assert.ok(cheap);
  assert.ok(normal);
  assert.ok(cheap.moneyCost<normal.moneyCost);
});

test('cheap context is naturally reached after production lodging and survives reload',()=>{
  let s=startAt(20);
  s=dispatch(s,{type:'endDay'},catalog);
  s=dispatch(s,{type:'chooseLodging',id:'lodging.cheap'},catalog);

  assert.equal(s.run.housingState.current,'cheap');
  assert.equal(s.run.pending?.eventId,EVENT_ID);
  assert.equal(s.run.flow.night?.phase,'NightEventResolution');
  assert.ok(catalog.media.some(m=>m.id==='stage.room'));

  const variant=s.run.pending?.variantId;
  s=reload(s);
  assert.equal(s.run.pending?.eventId,EVENT_ID);
  assert.equal(s.run.pending?.variantId,variant);

  s=dispatch(s,{type:'choice',id:'settle-quietly'},catalog);
  assert.equal(s.run.pending,null);
  assert.equal(s.run.flow.night?.phase,'VoluntaryNightChoice');

  s=dispatch(s,{type:'chooseNightChoice',id:'night.sleep'},catalog);
  assert.equal(s.run.calendar.elapsedDays,21);
  assert.equal(s.run.flow.night,null);
});

test('cheap-lodging event does not activate for normal or street housing',()=>{
  for(const lodging of ['lodging.normal','lodging.street'] as const){
    let s=startAt(20);
    s=dispatch(s,{type:'endDay'},catalog);
    s=dispatch(s,{type:'chooseLodging',id:lodging},catalog);
    assert.notEqual(s.run.pending?.eventId,EVENT_ID);
  }
});
