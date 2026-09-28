import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const definitions=JSON.parse(readFileSync('content/definitions.json','utf8'));
const resultPack=JSON.parse(
  readFileSync('content/packs/forest-result-content-bilingual-v2.json','utf8')
);
const routeDelta=JSON.parse(
  readFileSync('content/forest-route-localization-delta-v8.fixture.json','utf8')
);
const titleHelp=JSON.parse(
  readFileSync('content/forest-route-title-help-localization-v3.fixture.json','utf8')
);
const altCaption=JSON.parse(
  readFileSync('content/forest-route-alt-caption-localization-v3.fixture.json','utf8')
);

function collectObjectKeys(value:any,out:string[]=[]):string[]{
  if(Array.isArray(value)){
    for(const item of value)collectObjectKeys(item,out);
    return out;
  }
  if(value&&typeof value==='object'){
    for(const [key,item] of Object.entries(value)){
      out.push(key);
      collectObjectKeys(item,out);
    }
  }
  return out;
}

test('route presentation localization fixtures contain no gameplay mechanics fields',()=>{
  const keys=new Set(collectObjectKeys([
    routeDelta.strings,
    titleHelp.strings,
    altCaption.strings
  ]));

  for(const forbidden of [
    'conditions','effects','rewards','reward','chance',
    'progressDelta','enduranceCost','setRoute',
    'reactionTriggers','moneyCost','nextDayEnergyDelta',
    'modifyResource','addItem','addWorldFact',
    'rng','save','checkpoint'
  ]){
    assert.equal(keys.has(forbidden),false,forbidden);
  }
});

test('presentation fixtures reference only exact current Forest routes',()=>{
  const activity=definitions.activities.find((entry:any)=>entry.id==='lumber.forest');
  assert.ok(activity);

  const shipped=activity.options
    .filter((entry:any)=>entry.category==='route')
    .map((entry:any)=>entry.id);

  assert.deepEqual(shipped,[
    'forest.route.logging-road',
    'forest.route.old-boundary'
  ]);

  assert.deepEqual(
    titleHelp.routes.map((entry:any)=>entry.routeId),
    shipped
  );
  assert.deepEqual(
    altCaption.routes.map((entry:any)=>entry.routeId),
    shipped
  );
});

test('exact Forest result continuation stays locked',()=>{
  const activity=definitions.activities.find((entry:any)=>entry.id==='lumber.forest');
  assert.deepEqual(
    activity.results.map((entry:any)=>[entry.outcome,entry.id]),
    [
      ['success','lumber.forest.success'],
      ['escape','lumber.forest.escape'],
      ['failure','lumber.forest.failure']
    ]
  );

  assert.deepEqual(
    resultPack.events.map((event:any)=>event.reactionTriggers[0]),
    [
      {kind:'activityResult',activity:'lumber.forest',outcome:'success',result:'lumber.forest.success'},
      {kind:'activityResult',activity:'lumber.forest',outcome:'escape',result:'lumber.forest.escape'},
      {kind:'activityResult',activity:'lumber.forest',outcome:'failure',result:'lumber.forest.failure'}
    ]
  );
});

test('Lumber Hard Work remains completed_shifts >= 50 only',()=>{
  const ending=definitions.endings.find(
    (entry:any)=>entry.id==='ending.lumber.hard-work'
  );
  assert.ok(ending);
  assert.deepEqual(ending.conditions,[{
    kind:'careerCounter',
    career:'lumber',
    counter:'completed_shifts',
    op:'gte',
    value:50
  }]);
  assert.deepEqual(ending.metaRewards,[{
    kind:'hardWork',
    rewardId:'hardWork:lumber',
    career:'lumber'
  }]);
});

test('old-boundary presentation text contains no selected token Hunter or reward semantics',()=>{
  const oldBoundary=Object.fromEntries(
    Object.entries(routeDelta.strings)
      .filter(([key])=>key.includes('old-boundary'))
  );
  const raw=JSON.stringify(oldBoundary).toLowerCase();

  for(const forbidden of [
    'hunter','token','checkpoint','reward','magic','ritual',
    'gate','turn-in','consume'
  ]){
    assert.equal(raw.includes(forbidden),false,forbidden);
  }
});
