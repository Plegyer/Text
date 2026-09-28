import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

import {dispatch,parseSave} from '../src/core/engine.ts';
import {catalog,started} from './helpers.ts';

const presentation=JSON.parse(readFileSync('content/presentation.json','utf8'));
const acceptance=JSON.parse(
  readFileSync('content/forest-route-natural-path-acceptance-v3.fixture.json','utf8')
);
const forestPack=JSON.parse(
  readFileSync('content/packs/forest-result-content-bilingual-v2.json','utf8')
);

function expectedPresentationId(routeState:string|null|undefined){
  if(routeState==='logging-road')return 'activity/forest/route/logging-road';
  if(routeState==='old-boundary')return 'activity/forest/route/old-boundary';
  return 'activity/forest/route/default';
}

function enter(routeId:string){
  let state=started();
  if(routeId==='forest.route.old-boundary'){
    state.run.resources.inventory.old_boundary_token=1;
  }
  state=dispatch(state,{type:'enterActivity',id:'lumber.forest'},catalog);
  return state;
}

test('post-PR50 default Forest route presentation is shipped before route selection',()=>{
  assert.ok(presentation.slots?.['activity/forest/route/default']);
  assert.equal(
    presentation.slots['activity/forest/route/default'].static.src,
    'assets/presentation/forest-route-default-v1.svg'
  );

  for(const path of acceptance.paths){
    const state=enter(path.routeId);
    assert.equal(state.run.flow.activity?.internalState.routeId,null);
    assert.equal(
      expectedPresentationId(state.run.flow.activity?.internalState.routeId),
      'activity/forest/route/default'
    );
  }
});

test('authoritative route state derives exact route-specific presentation identity without Save or RNG drift',()=>{
  for(const path of acceptance.paths){
    let state=enter(path.routeId);
    state=dispatch(state,{type:'activityAction',id:path.routeId},catalog);

    assert.equal(
      state.run.flow.activity?.internalState.routeId,
      path.exactRouteState
    );

    const before=JSON.stringify(state);
    const globalRng=state.run.rng;
    const activityRng=state.run.flow.activity?.rngState;

    const derived=expectedPresentationId(
      state.run.flow.activity?.internalState.routeId
    );

    assert.equal(derived,path.presentationTransition.afterRouteSelection);
    assert.equal(JSON.stringify(state),before);
    assert.equal(state.run.rng,globalRng);
    assert.equal(state.run.flow.activity?.rngState,activityRng);

    const reloaded=parseSave(JSON.stringify(state),catalog);
    assert.equal(
      expectedPresentationId(reloaded.run.flow.activity?.internalState.routeId),
      derived
    );
    assert.equal(
      reloaded.run.flow.activity?.internalState.routeId,
      path.exactRouteState
    );
  }
});

test('presentation identity transition does not alter exact Forest result continuation',()=>{
  for(const path of acceptance.paths){
    let state=enter(path.routeId);
    state=dispatch(state,{type:'activityAction',id:path.routeId},catalog);

    const derived=expectedPresentationId(
      state.run.flow.activity?.internalState.routeId
    );
    assert.equal(derived,path.presentationTransition.afterRouteSelection);

    state=dispatch(state,{type:'activityAction',id:'advance'},catalog);
    state=parseSave(JSON.stringify(state),catalog);
    state=dispatch(state,{type:'activityAction',id:'advance'},catalog);

    assert.equal(state.run.flow.activity,null);
    assert.ok(state.run.progression.worldFacts.includes('lumber.forest.truth-known'));
    assert.equal(
      state.run.progression.worldFacts.includes('lumber.forest.escaped'),
      false
    );
    assert.equal(
      state.run.progression.worldFacts.includes('lumber.forest.failed'),
      false
    );
  }

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

test('Lumber Hard Work remains independent of route presentation',()=>{
  const ending=catalog.definitions.endings.find(
    entry=>entry.id==='ending.lumber.hard-work'
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
