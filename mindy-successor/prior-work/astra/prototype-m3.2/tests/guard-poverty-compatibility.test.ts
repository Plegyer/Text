import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

import {actionAvailable,ordinaryCareerForShiftAction} from '../src/core/engine.ts';
import {catalog,started} from './helpers.ts';

const cityPack=JSON.parse(readFileSync('content/packs/guard-city.json','utf8'));

test('Guard poverty response writes only Guard-local facts/counters and no debt/housing state',()=>{
  const event=cityPack.events.find((e:any)=>e.id==='guard.city.poverty-response');
  assert.ok(event);
  const effects=event.choices.flatMap((c:any)=>c.effects);
  assert.equal(effects.some((e:any)=>e.kind==='metric'&&e.key==='debt'),false);
  assert.equal(effects.some((e:any)=>e.kind==='setHousing'||e.kind==='housing'),false);
  assert.equal(/secret.?debt|lender|slave/i.test(JSON.stringify(event)),false);
  assert.ok(effects.some((e:any)=>e.kind==='addCareerFact'&&e.fact==='poverty-response-recorded'));
  assert.ok(effects.some((e:any)=>e.kind==='addCareerFact'&&e.fact==='poverty-relief-choice'));
  assert.ok(effects.some((e:any)=>e.kind==='addCareerFact'&&e.fact==='poverty-enforcement-choice'));
});

test('Guard remains in the generic ordinary-career projection for shared lock semantics',()=>{
  const action=catalog.definitions.actions.find(a=>a.id==='guard.shift');
  assert.ok(action);
  assert.equal(ordinaryCareerForShiftAction(action),'guard');
  assert.equal(action.cost.energy,1);
  assert.equal(action.cost.money,0);

  for(const housing of ['cheap','street'] as const){
    const s=started();
    s.run.housingState.current=housing;
    s.run.character.stats.strength=30;
    s.run.character.stats.endurance=30;
    s.run.character.stats.manners=20;
    assert.equal(actionAvailable(action,s,catalog),true,housing);
  }
});

test('Guard v14 introduces no private Secret Debt state or debt immunity',()=>{
  const files=[
    'content/packs/guard-career.json',
    'content/packs/guard-city.json'
  ];
  const serialized=files.map(f=>readFileSync(f,'utf8')).join('\n');
  assert.equal(/secret.?debt|debt immunity|clear debt|forgive debt|lender|slave/i.test(serialized),false);
});
