import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

import {dispatch,parseSave} from '../src/core/engine.ts';
import {catalog,started} from './helpers.ts';

const delta=JSON.parse(
  readFileSync('content/poverty-localization-main-delta-v1.fixture.json','utf8')
).delta.strings as Record<string,{ru:string;en:string}>;

const streetPack=JSON.parse(
  readFileSync('content/packs/poverty-street-production.json','utf8')
);

function enterLodging(day:number,lodging:'lodging.street'|'lodging.cheap'){
  let s=started();
  s.run.calendar.elapsedDays=day;
  s=dispatch(s,{type:'endDay'},catalog);
  assert.equal(s.run.flow.night?.phase,'LodgingResolution');
  s=dispatch(s,{type:'chooseLodging',id:lodging},catalog);
  return s;
}

function localized(key:string,locale:'ru'|'en'){
  const entry=delta[key];
  assert.ok(entry,'missing localization key '+key);
  const value=entry[locale]??entry.ru;
  assert.ok(value.trim(),key+'.'+locale+' is empty');
  return value;
}

function identitySnapshot(s:any){
  return {
    eventId:s.run.pending?.eventId,
    variantId:s.run.pending?.variantId,
    presentationId:s.run.pending?.presentationId,
    rng:s.run.rng,
    night:structuredClone(s.run.flow.night),
    save:JSON.stringify(s)
  };
}

test('street natural path resolves RU and EN without mutating gameplay and commits one effect exactly once',()=>{
  let s=enterLodging(10,'lodging.street');
  const eventId='poverty-street-production.helpful-summer';
  assert.equal(s.run.pending?.eventId,eventId);
  assert.equal(s.run.pending?.variantId,'default');
  assert.equal(s.run.flow.night?.phase,'NightEventResolution');

  const beforeLocale=identitySnapshot(s);
  for(const locale of ['ru','en'] as const){
    localized('event.'+eventId+'.title',locale);
    localized('event.'+eventId+'.variant.default.text',locale);
    localized('event.'+eventId+'.choice.take-errand.label',locale);
    localized('event.'+eventId+'.choice.take-errand.text',locale);
    localized('media.stage.outside.alt',locale);
  }
  assert.deepEqual(identitySnapshot(s),beforeLocale);

  const event=streetPack.events.find((entry:any)=>entry.id===eventId);
  const choice=event.choices.find((entry:any)=>entry.id==='take-errand');
  const moneyEffect=choice.effects.find(
    (entry:any)=>entry.kind==='modifyResource'&&entry.resource==='money'
  );
  assert.ok(moneyEffect);

  const moneyBefore=s.run.resources.money;
  s=dispatch(s,{type:'choice',id:'take-errand'},catalog);
  assert.equal(s.run.resources.money,moneyBefore+moneyEffect.delta);
  assert.equal(s.run.pending,null);
  assert.equal(s.run.flow.night?.phase,'VoluntaryNightChoice');

  s=parseSave(JSON.stringify(s),catalog);
  assert.equal(s.run.resources.money,moneyBefore+moneyEffect.delta);
  assert.throws(
    ()=>dispatch(s,{type:'choice',id:'take-errand'},catalog),
    /Нет активной сцены/
  );
});

test('cheap-lodging natural path resolves both locales with unchanged pending RNG NightFlow and save',()=>{
  let s=enterLodging(20,'lodging.cheap');
  const eventId='poverty-cheap-production.shared-quiet-autumn';
  assert.equal(s.run.pending?.eventId,eventId);
  assert.equal(s.run.pending?.variantId,'default');
  assert.equal(s.run.flow.night?.phase,'NightEventResolution');

  const beforeLocale=identitySnapshot(s);
  for(const locale of ['ru','en'] as const){
    localized('event.'+eventId+'.title',locale);
    localized('event.'+eventId+'.variant.default.text',locale);
    localized('event.'+eventId+'.choice.settle-quietly.label',locale);
    localized('event.'+eventId+'.choice.settle-quietly.text',locale);
    localized('media.stage.room.alt',locale);
  }
  assert.deepEqual(identitySnapshot(s),beforeLocale);

  const resourcesBefore=structuredClone(s.run.resources);
  s=dispatch(s,{type:'choice',id:'settle-quietly'},catalog);
  assert.deepEqual(s.run.resources,resourcesBefore);
  assert.equal(s.run.pending,null);
  assert.equal(s.run.flow.night?.phase,'VoluntaryNightChoice');

  s=parseSave(JSON.stringify(s),catalog);
  assert.deepEqual(s.run.resources,resourcesBefore);
  assert.equal(s.run.pending,null);
});

test('ordinary-poverty localization delta contains no Secret Debt IDs',()=>{
  const serialized=JSON.stringify(delta).toLowerCase();
  for(const token of [
    'secret-debt','secret debt','lender','forced-night',
    'paid_freedom','bound_life','takeover'
  ]){
    assert.equal(serialized.includes(token),false,token);
  }
});
