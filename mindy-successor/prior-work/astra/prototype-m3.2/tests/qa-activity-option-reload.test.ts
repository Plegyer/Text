import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

import {catalog,started} from './helpers.ts';
import {loadCatalog} from '../src/core/content.ts';
import * as engine from '../src/core/engine.ts';

const fixture=JSON.parse(
  readFileSync('content/qa-activity-option-reload.fixture.json','utf8')
);

type OptionRuntime={
  availableActivityActions?:(state:any,catalog:any)=>Array<{id:string;label:string}>;
  itemCapabilities?:(state:any,catalog?:any)=>string[];
};

const runtime=engine as unknown as OptionRuntime & typeof engine;
const optionRuntimePresent=
  typeof runtime.availableActivityActions==='function' &&
  typeof runtime.itemCapabilities==='function';

function qaCatalog(){
  const definitions=structuredClone(catalog.definitions) as any;
  assert.ok(Array.isArray(definitions.itemDefinitions));
  assert.ok(
    definitions.itemDefinitions.some(
      (item:any)=>
        item.id===fixture.providerItemId &&
        item.capabilities.includes(fixture.capabilityId)
    ),
    'fixture provider item/capability must already be declared by the capability runtime'
  );

  definitions.activities=[
    ...definitions.activities.filter((activity:any)=>activity.id!==fixture.activity.id),
    structuredClone(fixture.activity)
  ];
  return loadCatalog(definitions,structuredClone(catalog.packs));
}

function actionIds(state:any,cat:any){
  return runtime.availableActivityActions!(state,cat)
    .map(action=>action.id)
    .sort();
}

test('authored Activity options expose open route but hide capability route without inventory capability', {
  skip:!optionRuntimePresent
}, ()=>{
  const cat=qaCatalog();
  let s=started();

  s=runtime.dispatch(s,{type:'enterActivity',id:fixture.activity.id} as any,cat);

  assert.deepEqual(
    actionIds(s,cat),
    [...fixture.expected.withoutCapabilityBeforeUse].sort()
  );
  assert.equal(
    actionIds(s,cat).includes('qa.route.capability'),
    false
  );
  assert.equal(actionIds(s,cat).includes('advance'),false);
  assert.ok(actionIds(s,cat).includes('escape'));
});

test('capability-gated authored option is visible from actual inventory capability and may be used once', {
  skip:!optionRuntimePresent
}, ()=>{
  const cat=qaCatalog();
  let s=started();
  s.run.resources.inventory[fixture.providerItemId]=1;

  s=runtime.dispatch(s,{type:'enterActivity',id:fixture.activity.id} as any,cat);

  assert.deepEqual(
    actionIds(s,cat),
    [...fixture.expected.withCapabilityBeforeUse].sort()
  );

  s=runtime.dispatch(
    s,
    {type:'activityAction',id:fixture.expected.resolvedOptionId} as any,
    cat
  );

  assert.equal(
    s.run.flow.activity?.internalState.routeId,
    fixture.expected.selectedRoute
  );
  assert.deepEqual(
    s.run.flow.activity?.internalState.resolvedOptionIds,
    [fixture.expected.resolvedOptionId]
  );
  assert.deepEqual(
    actionIds(s,cat),
    [...fixture.expected.afterRouteSelection].sort()
  );

  assert.throws(
    ()=>runtime.dispatch(
      s,
      {type:'activityAction',id:fixture.expected.resolvedOptionId} as any,
      cat
    ),
    /уже использована/
  );
});

test('selected route and one-shot option identity survive parseSave reload exactly', {
  skip:!optionRuntimePresent
}, ()=>{
  const cat=qaCatalog();
  let s=started();
  s.run.resources.inventory[fixture.providerItemId]=1;

  s=runtime.dispatch(s,{type:'enterActivity',id:fixture.activity.id} as any,cat);
  s=runtime.dispatch(
    s,
    {type:'activityAction',id:fixture.expected.resolvedOptionId} as any,
    cat
  );

  const before={
    routeId:s.run.flow.activity?.internalState.routeId,
    resolvedOptionIds:[
      ...(s.run.flow.activity?.internalState.resolvedOptionIds??[])
    ],
    checkpoint:s.run.flow.activity?.checkpoint,
    rngState:s.run.flow.activity?.rngState
  };

  s=runtime.parseSave(JSON.stringify(s),cat);

  assert.deepEqual({
    routeId:s.run.flow.activity?.internalState.routeId,
    resolvedOptionIds:s.run.flow.activity?.internalState.resolvedOptionIds,
    checkpoint:s.run.flow.activity?.checkpoint,
    rngState:s.run.flow.activity?.rngState
  },before);

  assert.deepEqual(
    actionIds(s,cat),
    [...fixture.expected.afterRouteSelection].sort()
  );
});

test('legacy advance and escape remain usable after authored route selection', {
  skip:!optionRuntimePresent
}, ()=>{
  const cat=qaCatalog();
  let s=started();

  s=runtime.dispatch(s,{type:'enterActivity',id:fixture.activity.id} as any,cat);
  s=runtime.dispatch(s,{type:'activityAction',id:'qa.route.open'} as any,cat);

  assert.ok(actionIds(s,cat).includes('advance'));
  assert.ok(actionIds(s,cat).includes('escape'));

  s=runtime.dispatch(s,{type:'activityAction',id:'advance'} as any,cat);
  assert.equal(s.run.flow.activity?.internalState.progress,1);

  const escaped=runtime.dispatch(
    s,
    {type:'activityAction',id:'escape'} as any,
    cat
  );
  assert.equal(escaped.run.flow.activity,null);
});

test('removing provider item before route selection hides capability-gated option deterministically', {
  skip:!optionRuntimePresent
}, ()=>{
  const cat=qaCatalog();
  let s=started();
  s.run.resources.inventory[fixture.providerItemId]=1;

  s=runtime.dispatch(s,{type:'enterActivity',id:fixture.activity.id} as any,cat);
  assert.ok(actionIds(s,cat).includes(fixture.expected.resolvedOptionId));

  s.run.resources.inventory[fixture.providerItemId]=0;
  assert.equal(
    actionIds(s,cat).includes(fixture.expected.resolvedOptionId),
    false
  );

  s=runtime.parseSave(JSON.stringify(s),cat);
  assert.equal(
    actionIds(s,cat).includes(fixture.expected.resolvedOptionId),
    false
  );
});
