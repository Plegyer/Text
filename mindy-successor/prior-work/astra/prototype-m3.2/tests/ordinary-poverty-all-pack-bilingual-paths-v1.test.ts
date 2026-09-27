import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

import {dispatch,parseSave} from '../src/core/engine.ts';
import {catalog,started} from './helpers.ts';

const delta=JSON.parse(
  readFileSync('content/poverty-localization-main-delta-v1.fixture.json','utf8')
).delta.strings as Record<string,{ru:string;en:string}>;

const packNames=[
  'poverty-street-production.json',
  'poverty-street-production-v2.json',
  'poverty-cheap-production.json',
  'poverty-cheap-production-v2.json',
  'poverty-recovery-production.json',
  'poverty-pressure-production.json'
] as const;

const packs=Object.fromEntries(packNames.map(name=>[
  name.replace('.json',''),
  JSON.parse(readFileSync('content/packs/'+name,'utf8'))
]));

const cases=[
  {
    pack:'poverty-street-production',
    day:10,
    lodging:'lodging.street',
    eventId:'poverty-street-production.helpful-summer',
    variantId:'default',
    choiceId:'take-errand'
  },
  {
    pack:'poverty-street-production-v2',
    day:12,
    lodging:'lodging.street',
    eventId:'poverty-street-production-v2.helpful-summer-shade',
    variantId:'market-closing',
    choiceId:'take-small-task'
  },
  {
    pack:'poverty-cheap-production',
    day:20,
    lodging:'lodging.cheap',
    eventId:'poverty-cheap-production.shared-quiet-autumn',
    variantId:'default',
    choiceId:'settle-quietly'
  },
  {
    pack:'poverty-cheap-production-v2',
    day:0,
    lodging:'lodging.cheap',
    eventId:'poverty-cheap-production-v2.shared-room-seasons',
    variantId:'spring-window',
    choiceId:'settle-in'
  },
  {
    pack:'poverty-recovery-production',
    day:1,
    lodging:'lodging.street',
    eventId:'poverty-recovery-production.small-coin-help',
    variantId:'default',
    choiceId:'take-coins'
  },
  {
    pack:'poverty-pressure-production',
    day:6,
    lodging:'lodging.street',
    eventId:'poverty-pressure-production.cold-rain',
    variantId:'default',
    choiceId:'wait-it-out'
  }
] as const;

function enter(day:number,lodging:string){
  let s=started();
  s.run.calendar.elapsedDays=day;
  s=dispatch(s,{type:'endDay'},catalog);
  assert.equal(s.run.flow.night?.phase,'LodgingResolution');
  s=dispatch(s,{type:'chooseLodging',id:lodging},catalog);
  return s;
}

function gameplayProjection(s:any){
  return structuredClone({
    resources:s.run.resources,
    dayState:s.run.dayState,
    housing:s.run.housingState,
    progression:s.run.progression,
    endings:s.run.endings,
    rng:s.run.rng,
    night:s.run.flow.night,
    history:s.run.history
  });
}

function localizationKeys(c:(typeof cases)[number]){
  return [
    'event.'+c.eventId+'.title',
    'event.'+c.eventId+'.variant.'+c.variantId+'.text',
    'event.'+c.eventId+'.choice.'+c.choiceId+'.label',
    'event.'+c.eventId+'.choice.'+c.choiceId+'.text',
    c.lodging==='lodging.cheap'?'media.stage.room.alt':'media.stage.outside.alt'
  ];
}

function assertExpectedEffects(before:any,after:any,effects:any[]){
  for(const effect of effects){
    if(effect.kind==='modifyResource'){
      assert.equal(
        after.run.resources[effect.resource],
        before.run.resources[effect.resource]+effect.delta
      );
    }else if(effect.kind==='addItem'){
      assert.equal(
        after.run.resources.inventory[effect.id]??0,
        (before.run.resources.inventory[effect.id]??0)+effect.count
      );
    }else if(effect.kind==='addNextDayModifier'){
      assert.equal(
        after.run.dayState.nextDayModifiers.energyDelta,
        before.run.dayState.nextDayModifiers.energyDelta+effect.energyDelta
      );
      assert.equal(
        after.run.dayState.nextDayModifiers.statEffects.length,
        before.run.dayState.nextDayModifiers.statEffects.length+effect.statEffects.length
      );
    }else{
      assert.fail('representative path has unsupported effect kind '+effect.kind);
    }
  }
}

test('all six ordinary-poverty production packs have a naturally reachable bilingual representative path',()=>{
  assert.deepEqual(
    Object.values(packs).map((pack:any)=>pack.id),
    cases.map(c=>c.pack)
  );

  for(const c of cases){
    let s=enter(c.day,c.lodging);
    assert.equal(s.run.pending?.eventId,c.eventId,c.pack);
    assert.equal(s.run.pending?.variantId,c.variantId,c.pack);
    assert.equal(s.run.flow.night?.phase,'NightEventResolution',c.pack);

    const localeSpecific=/(^|[._/-])(ru|en)([._/-]|$)/i;
    assert.equal(localeSpecific.test(s.run.pending!.eventId),false,c.eventId);
    assert.equal(localeSpecific.test(s.run.pending!.variantId),false,c.variantId);

    const beforeLocale=JSON.stringify(s);
    for(const key of localizationKeys(c)){
      const entry=delta[key];
      assert.ok(entry,'missing '+key);
      assert.ok(entry.ru?.trim(),key+' ru');
      assert.ok(entry.en?.trim(),key+' en');
    }
    assert.equal(JSON.stringify(s),beforeLocale,'localization lookup mutated '+c.pack);

    const event=(packs as any)[c.pack].events.find((entry:any)=>entry.id===c.eventId);
    const choice=event.choices.find((entry:any)=>entry.id===c.choiceId);
    assert.ok(choice,c.choiceId);

    const beforeChoice=parseSave(JSON.stringify(s),catalog);
    const beforeProjection=gameplayProjection(beforeChoice);
    s=dispatch(s,{type:'choice',id:c.choiceId},catalog);

    assertExpectedEffects(beforeChoice,s,choice.effects);
    assert.equal(s.run.pending,null,c.pack);
    assert.equal(s.run.flow.night?.phase,'VoluntaryNightChoice',c.pack);
    assert.equal(s.run.history[c.eventId].count,1,c.eventId);

    const committed=gameplayProjection(s);
    s=parseSave(JSON.stringify(s),catalog);
    assert.deepEqual(gameplayProjection(s),committed,'reload drift '+c.pack);
    assert.throws(
      ()=>dispatch(s,{type:'choice',id:c.choiceId},catalog),
      /Нет активной сцены/
    );

    if(choice.effects.length===0){
      assert.deepEqual(
        {
          resources:s.run.resources,
          progression:s.run.progression,
          endings:s.run.endings
        },
        {
          resources:beforeProjection.resources,
          progression:beforeProjection.progression,
          endings:beforeProjection.endings
        },
        'effect-free representative changed gameplay payload '+c.pack
      );
    }
  }
});

test('all-six-pack matrix and localization payload exclude Secret Debt',()=>{
  const serialized=JSON.stringify({
    packs:Object.values(packs),
    delta,
    cases
  }).toLowerCase();

  for(const token of [
    'secret-debt','secret debt','lender','forced-night',
    'paid_freedom','bound_life','takeover'
  ]){
    assert.equal(serialized.includes(token),false,token);
  }
});
