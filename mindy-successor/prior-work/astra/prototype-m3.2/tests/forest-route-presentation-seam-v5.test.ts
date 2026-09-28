import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

import {dispatch,parseSave} from '../src/core/engine.ts';
import {catalog,started} from './helpers.ts';

const presentation=JSON.parse(readFileSync('content/presentation.json','utf8'));
const routeFixture=JSON.parse(
  readFileSync('content/forest-route-presentation-post-pr58-v7.fixture.json','utf8')
);
const forestPack=JSON.parse(
  readFileSync('content/packs/forest-result-content-bilingual-v2.json','utf8')
);

function presentationIdForRoute(routeState:string|null|undefined){
  if(routeState==='logging-road')return 'activity/forest/route/logging-road';
  if(routeState==='old-boundary')return 'activity/forest/route/old-boundary';
  return 'activity/forest/route/default';
}

function enterForRoute(routeId:string){
  let state=started();
  if(routeId==='forest.route.old-boundary'){
    state.run.resources.inventory.old_boundary_token=1;
  }
  return dispatch(state,{type:'enterActivity',id:'lumber.forest'},catalog);
}

test('post-PR58 neutral default route presentation remains shipped',()=>{
  const slot=presentation.slots?.['activity/forest/route/default'];
  assert.ok(slot);
  assert.equal(
    slot.static.src,
    'assets/presentation/forest-route-default-v1.svg'
  );
});

test('current Forest route identities map default -> route-specific without gameplay mutation',()=>{
  for(const route of routeFixture.routes){
    let state=enterForRoute(route.routeId);

    assert.equal(state.run.flow.activity?.internalState.routeId,null);
    assert.equal(
      presentationIdForRoute(state.run.flow.activity?.internalState.routeId),
      'activity/forest/route/default'
    );

    state=dispatch(state,{type:'activityAction',id:route.routeId},catalog);

    assert.equal(
      state.run.flow.activity?.internalState.routeId,
      route.routeState
    );

    const before=JSON.stringify(state);
    const globalRng=state.run.rng;
    const activityRng=state.run.flow.activity?.rngState;

    assert.equal(
      presentationIdForRoute(state.run.flow.activity?.internalState.routeId),
      route.presentationId
    );

    assert.equal(JSON.stringify(state),before);
    assert.equal(state.run.rng,globalRng);
    assert.equal(state.run.flow.activity?.rngState,activityRng);

    const reloaded=parseSave(JSON.stringify(state),catalog);
    assert.equal(
      reloaded.run.flow.activity?.internalState.routeId,
      route.routeState
    );
    assert.equal(
      presentationIdForRoute(reloaded.run.flow.activity?.internalState.routeId),
      route.presentationId
    );
  }
});

test('route presentation mapping does not alter exact Forest result continuation',()=>{
  const activity=catalog.definitions.activities.find(
    entry=>entry.id==='lumber.forest'
  );
  assert.ok(activity);

  assert.deepEqual(
    activity.results.map(entry=>[entry.outcome,entry.id]),
    [
      ['success','lumber.forest.success'],
      ['escape','lumber.forest.escape'],
      ['failure','lumber.forest.failure']
    ]
  );

  assert.deepEqual(
    forestPack.events.map((event:any)=>event.reactionTriggers[0]),
    [
      {kind:'activityResult',activity:'lumber.forest',outcome:'success',result:'lumber.forest.success'},
      {kind:'activityResult',activity:'lumber.forest',outcome:'escape',result:'lumber.forest.escape'},
      {kind:'activityResult',activity:'lumber.forest',outcome:'failure',result:'lumber.forest.failure'}
    ]
  );
});

test('old-boundary current gate and Lumber Hard Work stay exact',()=>{
  const activity=catalog.definitions.activities.find(
    entry=>entry.id==='lumber.forest'
  );
  assert.ok(activity);
  const oldBoundary=activity.options.find(
    entry=>entry.id==='forest.route.old-boundary'
  );
  assert.deepEqual(oldBoundary?.conditions,[{
    kind:'itemCapability',
    capability:'enter_old_boundary',
    present:true
  }]);

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
