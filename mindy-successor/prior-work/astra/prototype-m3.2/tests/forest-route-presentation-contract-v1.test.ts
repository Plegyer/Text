import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const definitions=JSON.parse(readFileSync('content/definitions.json','utf8'));
const logging=JSON.parse(
  readFileSync('content/forest-logging-road-localization-v2.fixture.json','utf8')
);
const boundary=JSON.parse(
  readFileSync('content/forest-old-boundary-localization-v2.fixture.json','utf8')
);
const replacement=JSON.parse(
  readFileSync('content/forest-route-presentation-replacement-v1.fixture.json','utf8')
);
const forestPack=JSON.parse(
  readFileSync('content/packs/forest-result-content-bilingual-v2.json','utf8')
);

function objectKeys(value:any,out:string[]=[]):string[]{
  if(Array.isArray(value)){
    for(const item of value)objectKeys(item,out);
    return out;
  }
  if(value&&typeof value==='object'){
    for(const [key,item] of Object.entries(value)){
      out.push(key);
      objectKeys(item,out);
    }
  }
  return out;
}

function bilingualEntries(value:Record<string,{ru:string;en:string}>){
  for(const [key,entry] of Object.entries(value)){
    assert.ok(entry.ru?.trim(),key+' ru');
    assert.ok(entry.en?.trim(),key+' en');
  }
}

test('route presentation fixtures use exact current shipped route IDs only',()=>{
  const activity=definitions.activities.find((x:any)=>x.id==='lumber.forest');
  assert.ok(activity);

  const shipped=activity.options
    .filter((x:any)=>x.category==='route')
    .map((x:any)=>x.id);

  assert.deepEqual(shipped,[
    'forest.route.logging-road',
    'forest.route.old-boundary'
  ]);

  assert.equal(logging.routeRef,shipped[0]);
  assert.equal(boundary.routeRef,shipped[1]);
  assert.deepEqual(
    replacement.routes.map((x:any)=>x.routeId),
    shipped
  );
});

test('route localization payloads are complete RU EN presentation text',()=>{
  bilingualEntries(logging.currentMainExisting);
  bilingualEntries(logging.additiveStrings);
  bilingualEntries(boundary.currentMainExisting);
  bilingualEntries(boundary.additiveStrings);
});

test('semantic presentation IDs are locale-neutral and route-state mappings are stable',()=>{
  const bad=/(^|[._/-])(ru|en)([._/-]|$)/i;
  assert.deepEqual(
    replacement.routes.map((x:any)=>[
      x.routeId,x.routeState,x.semanticPresentationId
    ]),
    [
      [
        'forest.route.logging-road',
        'logging-road',
        'activity/forest/route/logging-road'
      ],
      [
        'forest.route.old-boundary',
        'old-boundary',
        'activity/forest/route/old-boundary'
      ]
    ]
  );

  for(const route of replacement.routes){
    assert.equal(bad.test(route.routeId),false,route.routeId);
    assert.equal(bad.test(route.routeState),false,route.routeState);
    assert.equal(
      bad.test(route.semanticPresentationId),
      false,
      route.semanticPresentationId
    );
  }
});

test('route presentation fixtures contain no gameplay mechanics fields',()=>{
  const keys=new Set(objectKeys([logging,boundary,replacement]));
  for(const forbidden of [
    'conditions','effects','rewards','reward','chance',
    'progressDelta','enduranceCost','setRoute',
    'moneyCost','nextDayEnergyDelta','outcomeThreshold'
  ]){
    assert.equal(keys.has(forbidden),false,forbidden);
  }
});

test('fixtures create no Hunter production ID and select no Old Boundary token semantics',()=>{
  const serialized=JSON.stringify(replacement).toLowerCase();
  assert.equal(serialized.includes('forest.route.hunter'),false);
  assert.equal(serialized.includes('hunter-trail'),false);

  assert.equal(boundary.invariants.changesTokenSemantics,false);
  assert.ok(
    boundary.explicitNonAssumptions.some(
      (line:string)=>line.includes('acquisition')
    )
  );
  assert.ok(
    boundary.explicitNonAssumptions.some(
      (line:string)=>line.includes('consume/retain/turn-in')
    )
  );

  const activity=definitions.activities.find((x:any)=>x.id==='lumber.forest');
  const option=activity.options.find(
    (x:any)=>x.id==='forest.route.old-boundary'
  );
  assert.deepEqual(option.conditions,[{
    kind:'itemCapability',
    capability:'enter_old_boundary',
    present:true
  }]);
});

test('Lumber Hard Work and exact Forest result identities remain untouched',()=>{
  const ending=definitions.endings.find(
    (x:any)=>x.id==='ending.lumber.hard-work'
  );
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

  assert.deepEqual(
    definitions.activities
      .find((x:any)=>x.id==='lumber.forest')
      .results
      .map((x:any)=>[x.outcome,x.id]),
    [
      ['success','lumber.forest.success'],
      ['escape','lumber.forest.escape'],
      ['failure','lumber.forest.failure']
    ]
  );

  assert.deepEqual(
    forestPack.events.map((event:any)=>event.reactionTriggers[0]),
    [
      {
        kind:'activityResult',
        activity:'lumber.forest',
        outcome:'success',
        result:'lumber.forest.success'
      },
      {
        kind:'activityResult',
        activity:'lumber.forest',
        outcome:'escape',
        result:'lumber.forest.escape'
      },
      {
        kind:'activityResult',
        activity:'lumber.forest',
        outcome:'failure',
        result:'lumber.forest.failure'
      }
    ]
  );
});
