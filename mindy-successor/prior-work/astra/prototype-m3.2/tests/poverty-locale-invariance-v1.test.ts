import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

import {dispatch,energyMax,parseSave} from '../src/core/engine.ts';
import {catalog,started} from './helpers.ts';

const delta=JSON.parse(
  readFileSync('content/poverty-localization-main-delta-v1.fixture.json','utf8')
).delta.strings as Record<string,{ru:string;en:string}>;

const streetPack=JSON.parse(
  readFileSync('content/packs/poverty-street-production.json','utf8')
);

function enter(day:number,lodging:'lodging.street'|'lodging.cheap'){
  let s=started();
  s.run.calendar.elapsedDays=day;
  s=dispatch(s,{type:'endDay'},catalog);
  s=dispatch(s,{type:'chooseLodging',id:lodging},catalog);
  return s;
}

function resolvePair(keys:string[]){
  for(const key of keys){
    const entry=delta[key];
    assert.ok(entry,key);
    assert.ok(entry.ru?.trim(),key+' ru');
    assert.ok(entry.en?.trim(),key+' en');
  }
}

function snapshot(s:any){
  return JSON.stringify({
    pending:s.run.pending,
    rng:s.run.rng,
    night:s.run.flow.night,
    resources:s.run.resources,
    dayState:s.run.dayState,
    housing:s.run.housingState,
    history:s.run.history
  });
}

test('effect-free cheap poverty scene is locale-invariant and lodging payment stays exactly once',()=>{
  let s=started();
  s.run.calendar.elapsedDays=20;
  const cheap=catalog.definitions.lodgings.find(l=>l.id==='lodging.cheap')!;
  const moneyBefore=s.run.resources.money;

  s=dispatch(s,{type:'endDay'},catalog);
  s=dispatch(s,{type:'chooseLodging',id:'lodging.cheap'},catalog);
  assert.equal(s.run.resources.money,moneyBefore-cheap.moneyCost);
  assert.equal(s.run.housingState.current,'cheap');
  assert.equal(s.run.pending?.eventId,'poverty-cheap-production.shared-quiet-autumn');

  const beforeLocale=snapshot(s);
  resolvePair([
    'event.poverty-cheap-production.shared-quiet-autumn.title',
    'event.poverty-cheap-production.shared-quiet-autumn.variant.default.text',
    'event.poverty-cheap-production.shared-quiet-autumn.choice.settle-quietly.label',
    'event.poverty-cheap-production.shared-quiet-autumn.choice.settle-quietly.text',
    'media.stage.room.alt'
  ]);
  assert.equal(snapshot(s),beforeLocale);
  assert.equal(JSON.stringify(s).includes('"locale"'),false);

  s=dispatch(s,{type:'choice',id:'settle-quietly'},catalog);
  const committedMoney=s.run.resources.money;
  s=parseSave(JSON.stringify(s),catalog);

  assert.equal(s.run.resources.money,committedMoney);
  assert.equal(s.run.housingState.current,'cheap');
  assert.equal(s.run.pending,null);
  assert.throws(
    ()=>dispatch(s,{type:'choice',id:'settle-quietly'},catalog),
    /Нет активной сцены/
  );
});

test('effectful helpful street event gives the same money effect exactly once regardless of locale text',()=>{
  const event=streetPack.events.find(
    (entry:any)=>entry.id==='poverty-street-production.helpful-summer'
  );
  const choice=event.choices.find((entry:any)=>entry.id==='take-errand');
  const effect=choice.effects.find(
    (entry:any)=>entry.kind==='modifyResource'&&entry.resource==='money'
  );
  assert.ok(effect);

  let s=enter(10,'lodging.street');
  assert.equal(s.run.pending?.eventId,event.id);

  const beforeLocale=snapshot(s);
  resolvePair([
    'event.poverty-street-production.helpful-summer.title',
    'event.poverty-street-production.helpful-summer.variant.default.text',
    'event.poverty-street-production.helpful-summer.choice.take-errand.label',
    'event.poverty-street-production.helpful-summer.choice.take-errand.text',
    'media.stage.outside.alt'
  ]);
  assert.equal(snapshot(s),beforeLocale);

  const moneyBefore=s.run.resources.money;
  s=dispatch(s,{type:'choice',id:'take-errand'},catalog);
  assert.equal(s.run.resources.money,moneyBefore+effect.delta);

  const afterChoice=s.run.resources.money;
  s=parseSave(JSON.stringify(s),catalog);
  assert.equal(s.run.resources.money,afterChoice);
  assert.throws(
    ()=>dispatch(s,{type:'choice',id:'take-errand'},catalog),
    /Нет активной сцены/
  );
});

test('pressure event next-day Energy effect is locale-invariant and applies once across reload',()=>{
  const event=streetPack.events.find(
    (entry:any)=>entry.id==='poverty-street-production.pressure-winter'
  );
  const choice=event.choices.find((entry:any)=>entry.id==='keep-moving');
  const penalty=choice.effects.find((entry:any)=>entry.kind==='addNextDayModifier');
  assert.ok(penalty);

  let s=enter(30,'lodging.street');
  assert.equal(s.run.pending?.eventId,event.id);

  const beforeLocale=snapshot(s);
  resolvePair([
    'event.poverty-street-production.pressure-winter.title',
    'event.poverty-street-production.pressure-winter.variant.default.text',
    'event.poverty-street-production.pressure-winter.choice.keep-moving.label',
    'event.poverty-street-production.pressure-winter.choice.keep-moving.text'
  ]);
  assert.equal(snapshot(s),beforeLocale);

  const beforeModifier=s.run.dayState.nextDayModifiers.energyDelta;
  s=dispatch(s,{type:'choice',id:'keep-moving'},catalog);
  assert.equal(
    s.run.dayState.nextDayModifiers.energyDelta,
    beforeModifier+penalty.energyDelta
  );

  const committed=structuredClone(s.run.dayState.nextDayModifiers);
  s=parseSave(JSON.stringify(s),catalog);
  assert.deepEqual(s.run.dayState.nextDayModifiers,committed);

  const expectedEnergy=Math.max(1,energyMax(s)+committed.energyDelta);
  s=dispatch(s,{type:'chooseNightChoice',id:'night.sleep'},catalog);
  assert.equal(s.run.dayState.energyCurrent,expectedEnergy);
  assert.deepEqual(
    s.run.dayState.nextDayModifiers,
    {energyDelta:0,statEffects:[],tags:[]}
  );
});

test('localization delta duplicates no conditions effects rewards or RNG inputs',()=>{
  const raw=JSON.stringify(delta);
  for(const token of [
    'conditions','effects','reward','chance','nightPolicy',
    'modifyResource','addNextDayModifier','housingTier'
  ]){
    assert.equal(raw.includes(token),false,token);
  }
});
