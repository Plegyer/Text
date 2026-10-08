import test from 'node:test';
import assert from 'node:assert/strict';

import {eligible} from '../src/core/engine.ts';
import type {Condition} from '../src/core/schema.ts';
import {catalog,started} from './helpers.ts';

const expectedIds=[
  'spring.default','spring.arrival-rush','spring.table-reset',
  'summer.default','summer.split-order','summer.refill-rush',
  'autumn.default','autumn.queue-control','autumn.closing-reset',
  'winter.default','winter.familiar-order','winter.hearth-round'
];

test('Satyr Maid repeatable work ships 12 seasonal/context variants without changing cost or wage',()=>{
  const action=catalog.definitions.actions.find(a=>a.id==='satyr-maid.shift');
  assert.ok(action);
  assert.equal(action.cost.energy,1);
  assert.equal(action.cost.money,0);
  assert.deepEqual(action.wage,{
    base:37,
    weights:[
      {stat:'charm',factor:0.35},
      {stat:'sexuality',factor:0.25}
    ]
  });
  assert.equal(action.scenes?.length,12);
  assert.deepEqual(new Set(action.scenes?.map(scene=>scene.id)),new Set(expectedIds));

  for(const scene of action.scenes??[]){
    assert.equal(scene.media.length,1,scene.id);
    if(scene.id.includes('.default'))continue;
    assert.ok(scene.conditions.length>=2,scene.id+' must be context gated');
  }
});

test('known-face and late-career contexts expose distinct Satyr shift variants in every season',()=>{
  const action=catalog.definitions.actions.find(a=>a.id==='satyr-maid.shift');
  assert.ok(action?.scenes);

  const cases=[
    ['spring',0,'known-face','spring.arrival-rush'],
    ['summer',10,'known-face','summer.split-order'],
    ['autumn',20,'known-face','autumn.queue-control'],
    ['winter',30,'known-face','winter.familiar-order'],
    ['spring',0,'veteran-service','spring.table-reset'],
    ['summer',10,'house-power','summer.refill-rush'],
    ['autumn',20,'boundaries','autumn.closing-reset'],
    ['winter',30,'outcome-ready','winter.hearth-round']
  ] as const;

  for(const [season,day,stage,id] of cases){
    const s=started();
    s.run.calendar.elapsedDays=day;
    s.run.progression.careers['satyr-maid']={stage,shifts:0,counters:{completed_shifts:20},choices:{},facts:[]};
    const candidates:{id:string;conditions:Condition[]}[]=action.scenes.filter(scene=>eligible(scene.conditions,s,catalog))
      .sort((a,b)=>b.conditions.length-a.conditions.length);
    assert.equal(candidates[0]?.id,id,season+' '+stage);
  }
});
