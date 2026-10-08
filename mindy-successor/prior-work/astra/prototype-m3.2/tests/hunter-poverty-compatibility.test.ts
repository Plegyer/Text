import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,readdirSync} from 'node:fs';

import {actionAvailable,ordinaryCareerForShiftAction} from '../src/core/engine.ts';
import {catalog,started} from './helpers.ts';

test('Hunter remains ordinary paid work in cheap/street housing without rewriting poverty economy',()=>{
  const action=catalog.definitions.actions.find(a=>a.id==='hunter.shift');
  assert.ok(action);
  assert.equal(ordinaryCareerForShiftAction(action),'hunter');
  assert.equal(action.cost.energy,1);
  assert.equal(action.cost.money,0);
  assert.deepEqual(action.wage,{
    base:37,
    weights:[
      {stat:'dexterity',factor:0.35},
      {stat:'endurance',factor:0.3},
      {stat:'wits',factor:0.2}
    ]
  });

  for(const housing of ['cheap','street'] as const){
    const s=started();
    s.run.housingState.current=housing;
    s.run.character.stats.dexterity=25;
    s.run.character.stats.endurance=20;
    s.run.character.stats.wits=15;
    assert.equal(actionAvailable(action,s,catalog),true,housing);
  }

  const lodging=catalog.definitions.lodgings.map(l=>({
    id:l.id,housing:l.housing,moneyCost:l.moneyCost,nextDayEnergyDelta:l.nextDayEnergyDelta
  }));
  assert.deepEqual(lodging,[
    {id:'lodging.normal',housing:'normal',moneyCost:100,nextDayEnergyDelta:0},
    {id:'lodging.cheap',housing:'cheap',moneyCost:50,nextDayEnergyDelta:0},
    {id:'lodging.street',housing:'street',moneyCost:0,nextDayEnergyDelta:-1}
  ]);
});

test('Hunter v13 adds no Secret Debt state and stays inside the generic ordinary-career set',()=>{
  const packs=readdirSync('content/packs')
    .filter(name=>name.startsWith('hunter-')&&name.endsWith('.json'))
    .map(name=>JSON.parse(readFileSync('content/packs/'+name,'utf8')));
  const serialized=JSON.stringify(packs);
  assert.equal(/secret.?debt|lender|slave/i.test(serialized),false);

  const action=catalog.definitions.actions.find(a=>a.id==='hunter.shift');
  assert.ok(action);
  assert.equal(ordinaryCareerForShiftAction(action),'hunter',
    'future shared hidden-career lock can pause Hunter through the ordinary-career projection');
});
