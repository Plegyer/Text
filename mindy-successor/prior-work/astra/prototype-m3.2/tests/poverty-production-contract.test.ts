import test from 'node:test';
import assert from 'node:assert/strict';

import {dispatch,parseSave} from '../src/core/engine.ts';
import {catalog,started} from './helpers.ts';

function reload<T>(state:T){
  return parseSave(JSON.stringify(state),catalog);
}

test('production lodging ladder preserves paid/cheap/street poverty structure without locking balance numbers',()=>{
  const normal=catalog.definitions.lodgings.find(x=>x.id==='lodging.normal');
  const cheap=catalog.definitions.lodgings.find(x=>x.id==='lodging.cheap');
  const street=catalog.definitions.lodgings.find(x=>x.id==='lodging.street');

  assert.ok(normal);
  assert.ok(cheap);
  assert.ok(street);

  assert.equal(normal.housing,'normal');
  assert.equal(cheap.housing,'cheap');
  assert.equal(street.housing,'street');

  assert.ok(normal.moneyCost>0);
  assert.ok(cheap.moneyCost>0);
  assert.ok(cheap.moneyCost<normal.moneyCost);
  assert.equal(street.moneyCost,0);

  assert.ok(
    street.nextDayEnergyDelta<0 || street.nextDayEffects.some(effect=>effect.delta<0),
    'street lodging must remain a real poverty tradeoff rather than a free equivalent to paid lodging'
  );
});

test('zero-money street sleep remains a playable anti-softlock path into a starting Lumber shift',()=>{
  let s=started();
  s.run.resources.money=0;

  s=dispatch(s,{type:'endDay'},catalog);
  assert.equal(s.run.flow.night?.phase,'LodgingResolution');

  s=dispatch(s,{type:'chooseLodging',id:'lodging.street'},catalog);
  assert.equal(s.run.resources.money,0);
  assert.equal(s.run.housingState.current,'street');
  assert.equal(s.run.flow.night?.lodgingPaymentCommitted,true);

  const schoolNight=catalog.definitions.nightChoices.find(choice=>choice.id.startsWith('school.night_study.'));
  assert.ok(schoolNight);
  assert.throws(
    ()=>dispatch(s,{type:'chooseNightChoice',id:schoolNight.id},catalog),
    /недоступно/
  );

  s=reload(s);
  assert.equal(s.run.resources.money,0);
  assert.equal(s.run.housingState.current,'street');

  s=dispatch(s,{type:'chooseNightChoice',id:'night.sleep'},catalog);
  assert.equal(s.run.calendar.elapsedDays,1);
  assert.equal(s.run.flow.night,null);
  assert.ok(s.run.dayState.energyCurrent>=1,'street recovery must leave enough Energy to reach a starting job');

  s=dispatch(s,{type:'action',id:'lumber.shift'},catalog);
  assert.equal(s.run.progression.careers.lumber?.counters.completed_shifts,1);
  assert.ok(s.run.dayState.energyCurrent>=0);
});
