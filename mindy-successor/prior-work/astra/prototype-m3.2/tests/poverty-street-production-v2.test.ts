import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

import {dispatch} from '../src/core/engine.ts';
import {catalog,started} from './helpers.ts';

const pack=JSON.parse(readFileSync('content/packs/poverty-street-production-v2.json','utf8'));
const PREFIX='poverty-street-production-v2.';

function enterStreet(day:number){
  let s=started();
  s.run.calendar.elapsedDays=day;
  s=dispatch(s,{type:'endDay'},catalog);
  s=dispatch(s,{type:'chooseLodging',id:'lodging.street'},catalog);
  return s;
}

test('street v2 adds helpful, neutral, and bad-pressure families without Secret Debt',()=>{
  assert.ok(catalog.packs.some(p=>p.id==='poverty-street-production-v2'));
  assert.equal(pack.events.length,3);
  assert.deepEqual(
    pack.events.map((event:any)=>event.id),
    [
      'poverty-street-production-v2.helpful-summer-shade',
      'poverty-street-production-v2.neutral-autumn-crossing',
      'poverty-street-production-v2.pressure-winter-wind'
    ]
  );
  assert.ok(pack.events.every((event:any)=>
    event.conditions.some((c:any)=>c.kind==='housingTier'&&c.value==='street') &&
    event.reactionTriggers.some((t:any)=>t.kind==='nightPhase'&&t.point==='after_lodging') &&
    event.variants.length>=2
  ));
  assert.doesNotMatch(JSON.stringify(pack),/secret.?debt|lender/i);
});

test('v2 families are naturally reachable from street lodging in their authored seasonal windows',()=>{
  const cases=[
    {day:12,event:'poverty-street-production-v2.helpful-summer-shade'},
    {day:22,event:'poverty-street-production-v2.neutral-autumn-crossing'},
    {day:32,event:'poverty-street-production-v2.pressure-winter-wind'}
  ] as const;

  for(const c of cases){
    const s=enterStreet(c.day);
    assert.equal(s.run.pending?.eventId,c.event);
    assert.ok(s.run.pending?.eventId.startsWith(PREFIX));
    assert.equal(s.run.flow.night?.phase,'NightEventResolution');
  }
});

test('v2 text variants change naturally inside each narrow calendar window',()=>{
  const cases=[
    {first:12,second:13,event:'poverty-street-production-v2.helpful-summer-shade'},
    {first:22,second:23,event:'poverty-street-production-v2.neutral-autumn-crossing'},
    {first:32,second:33,event:'poverty-street-production-v2.pressure-winter-wind'}
  ] as const;

  for(const c of cases){
    const first=enterStreet(c.first);
    const second=enterStreet(c.second);
    assert.equal(first.run.pending?.eventId,c.event);
    assert.equal(second.run.pending?.eventId,c.event);
    assert.notEqual(first.run.pending?.variantId,second.run.pending?.variantId);
  }
});

test('v2 tuning asserts direction and safe exit, not locked numeric values',()=>{
  const helpful=pack.events.find((event:any)=>event.id.endsWith('helpful-summer-shade'));
  const pressure=pack.events.find((event:any)=>event.id.endsWith('pressure-winter-wind'));
  const gain=helpful.choices.flatMap((choice:any)=>choice.effects)
    .find((effect:any)=>effect.kind==='modifyResource'&&effect.resource==='money');
  const penalty=pressure.choices.flatMap((choice:any)=>choice.effects)
    .find((effect:any)=>effect.kind==='addNextDayModifier');

  assert.ok(gain.delta>0);
  assert.ok(penalty.energyDelta<0);
  assert.ok(pressure.choices.some((choice:any)=>choice.effects.length===0));
});
