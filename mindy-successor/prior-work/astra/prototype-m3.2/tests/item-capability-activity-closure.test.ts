import test from 'node:test';
import assert from 'node:assert/strict';

import {catalog,started} from './helpers.ts';
import {availableActivityActions,dispatch,parseSave} from '../src/core/engine.ts';
import {loadCatalog} from '../src/core/content.ts';

test('Forest entry is general; Old Boundary Token changes available route actions through typed item capability',()=>{
  let s=started();
  const energyBefore=s.run.dayState.energyCurrent;

  s=dispatch(s,{type:'enterActivity',id:'lumber.forest'},catalog);
  assert.equal(s.run.dayState.energyCurrent,energyBefore-2);
  assert.equal(s.run.flow.activity?.internalState.routeId,null);

  let actions=availableActivityActions(s,catalog).map(action=>action.id);
  assert.ok(actions.includes('forest.route.logging-road'));
  assert.ok(actions.includes('escape'));
  assert.equal(actions.includes('forest.route.old-boundary'),false);
  assert.equal(actions.includes('advance'),false);
  assert.throws(
    ()=>dispatch(s,{type:'activityAction',id:'advance'},catalog),
    /выберите маршрут/
  );

  const withToken=started();
  withToken.run.resources.inventory.old_boundary_token=1;
  const entered=dispatch(withToken,{type:'enterActivity',id:'lumber.forest'},catalog);
  actions=availableActivityActions(entered,catalog).map(action=>action.id);
  assert.ok(actions.includes('forest.route.logging-road'));
  assert.ok(actions.includes('forest.route.old-boundary'));
  assert.equal(actions.includes('advance'),false);
});

test('selected Activity route and one-shot option identity survive reload without consuming an OPEN-policy item',()=>{
  let s=started();
  s.run.resources.inventory.old_boundary_token=1;

  s=dispatch(s,{type:'enterActivity',id:'lumber.forest'},catalog);
  s=dispatch(s,{type:'activityAction',id:'forest.route.old-boundary'},catalog);

  assert.equal(s.run.flow.activity?.internalState.routeId,'old-boundary');
  assert.deepEqual(
    s.run.flow.activity?.internalState.resolvedOptionIds,
    ['forest.route.old-boundary']
  );
  assert.equal(s.run.resources.inventory.old_boundary_token,1);

  const reloaded=parseSave(JSON.stringify(s),catalog);
  assert.equal(reloaded.run.flow.activity?.internalState.routeId,'old-boundary');
  assert.deepEqual(
    reloaded.run.flow.activity?.internalState.resolvedOptionIds,
    ['forest.route.old-boundary']
  );

  const actions=availableActivityActions(reloaded,catalog).map(action=>action.id);
  assert.ok(actions.includes('advance'));
  assert.ok(actions.includes('escape'));
  assert.equal(actions.includes('forest.route.logging-road'),false);
  assert.equal(actions.includes('forest.route.old-boundary'),false);

  assert.throws(
    ()=>dispatch(reloaded,{type:'activityAction',id:'forest.route.old-boundary'},catalog),
    /уже использована/
  );
});

test('logging-road uses the same counter.v1 runtime and reaches success through authored challenges',()=>{
  let s=started();
  s.run.character.stats.strength=4;
  s.run.character.stats.reason=3;
  s.run.resources.inventory.field_preservation_kit=1;
  s=dispatch(s,{type:'enterActivity',id:'lumber.forest'},catalog);
  s=dispatch(s,{type:'activityAction',id:'forest.route.logging-road'},catalog);

  assert.equal(s.run.flow.activity?.internalState.routeId,'logging-road');
  assert.ok(availableActivityActions(s,catalog).some(action=>action.id==='advance'));

  for(const id of [
    'forest.challenge.logging-navigation',
    'forest.challenge.logging-spring-mud',
    'forest.challenge.logging-preserve-sample'
  ])s=dispatch(s,{type:'activityAction',id},catalog);

  s=parseSave(JSON.stringify(s),catalog);
  s=dispatch(s,{type:'activityAction',id:'advance'},catalog);
  assert.equal(s.run.flow.activity?.internalState.progress,5);

  s=parseSave(JSON.stringify(s),catalog);
  s=dispatch(s,{type:'activityAction',id:'advance'},catalog);
  assert.equal(s.run.flow.activity,null);
  assert.ok(s.run.progression.worldFacts.includes('lumber.forest.truth-known'));
  assert.equal(s.run.resources.inventory.forest_preserved_specimen,1);
  assert.equal(s.run.flow.pendingScene?.eventId,'lumber-cross.activity-forest-return');
});

test('pre-option schema4 active Activity save preserves immediate legacy advance/escape behavior',()=>{
  let s=started();
  s=dispatch(s,{type:'enterActivity',id:'lumber.forest'},catalog);

  const raw=JSON.parse(JSON.stringify(s));
  delete raw.run.flow.activity.optionModelVersion;
  delete raw.run.flow.activity.internalState.routeId;
  delete raw.run.flow.activity.internalState.resolvedOptionIds;

  let reloaded=parseSave(JSON.stringify(raw),catalog);
  assert.equal(reloaded.run.flow.activity?.optionModelVersion,0);
  assert.equal(reloaded.run.flow.activity?.internalState.routeId,null);
  assert.deepEqual(reloaded.run.flow.activity?.internalState.resolvedOptionIds,[]);
  assert.deepEqual(
    availableActivityActions(reloaded,catalog).map(action=>action.id),
    ['advance','escape']
  );

  reloaded=dispatch(reloaded,{type:'activityAction',id:'advance'},catalog);
  assert.equal(reloaded.run.flow.activity?.internalState.progress,1);
  assert.equal(reloaded.run.flow.activity?.internalState.routeId,null);
});

test('catalog validation rejects Activity option that references undeclared item capability',()=>{
  const definitions=structuredClone(catalog.definitions);
  const forest=definitions.activities.find(activity=>activity.id==='lumber.forest');
  assert.ok(forest);
  forest.options.push({
    id:'forest.route.unknown-capability',
    label:'Impossible route',
    category:'route',
    conditions:[{kind:'itemCapability',capability:'not_declared_anywhere',present:true}],
    progressDelta:0,
    enduranceCost:0,
    effects:[],
    setRoute:'unknown-route'
  });

  assert.throws(
    ()=>loadCatalog(definitions,structuredClone(catalog.packs)),
    /Неизвестная item capability/
  );
});

test('item capability derives from actual inventory and may be supplied by any declared item definition',()=>{
  const definitions=structuredClone(catalog.definitions);
  const axe=definitions.itemDefinitions.find(item=>item.id==='reinforced_axe');
  assert.ok(axe);
  axe.capabilities=[...new Set([...axe.capabilities,'enter_old_boundary'])];
  const forest=definitions.activities.find(activity=>activity.id==='lumber.forest');
  assert.ok(forest);
  const custom=loadCatalog(definitions,structuredClone(catalog.packs));

  let s=started();
  s.run.resources.inventory.reinforced_axe=1;
  s=dispatch(s,{type:'enterActivity',id:'lumber.forest'},custom);

  assert.ok(
    availableActivityActions(s,custom)
      .some(action=>action.id==='forest.route.old-boundary')
  );

  s.run.resources.inventory.reinforced_axe=0;
  assert.equal(
    availableActivityActions(s,custom)
      .some(action=>action.id==='forest.route.old-boundary'),
    false
  );
});
