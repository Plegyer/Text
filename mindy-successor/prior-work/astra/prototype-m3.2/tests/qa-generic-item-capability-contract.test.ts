import test from 'node:test';
import assert from 'node:assert/strict';

import {catalog,started} from './helpers.ts';
import {loadCatalog} from '../src/core/content.ts';
import * as engine from '../src/core/engine.ts';

type CapabilityRuntime={
  itemCapabilities?:(state:any,catalog?:any)=>string[];
  hasItemCapability?:(state:any,capability:string,catalog?:any)=>boolean;
};

const runtime=engine as unknown as CapabilityRuntime & typeof engine;
const capabilityRuntimePresent=
  typeof runtime.itemCapabilities==='function' &&
  typeof runtime.hasItemCapability==='function';

test('generic item capability contract derives only from declared inventory-backed item definitions', {
  skip:!capabilityRuntimePresent
}, ()=>{
  const definitions=structuredClone(catalog.definitions) as any;
  assert.ok(Array.isArray(definitions.itemDefinitions));

  const token=definitions.itemDefinitions.find((item:any)=>item.id==='old_boundary_token');
  assert.ok(token,'old_boundary_token must be a declared item definition');
  assert.ok(token.capabilities.includes('enter_old_boundary'));

  const custom=loadCatalog(definitions,structuredClone(catalog.packs));
  const s=started();

  s.run.resources.inventory.old_boundary_token=0;
  s.run.progression.worldFacts.push('lumber.capability.enter-old-boundary');

  assert.equal(
    runtime.hasItemCapability!(s,'enter_old_boundary',custom),
    false,
    'a manually present worldFact must not manufacture an item capability'
  );
  assert.equal(
    runtime.itemCapabilities!(s,custom).includes('enter_old_boundary'),
    false
  );

  s.run.resources.inventory.old_boundary_token=1;
  assert.equal(runtime.hasItemCapability!(s,'enter_old_boundary',custom),true);
  assert.equal(
    runtime.itemCapabilities!(s,custom)
      .filter((capability:string)=>capability==='enter_old_boundary')
      .length,
    1
  );

  const consumed=runtime.applyEffects(
    s,
    [{kind:'removeItem',id:'old_boundary_token',count:1} as any],
    custom
  );
  assert.equal(consumed.run.resources.inventory.old_boundary_token,0);
  assert.equal(runtime.hasItemCapability!(consumed,'enter_old_boundary',custom),false);
});

test('multiple declared items may provide the same capability without duplicating capability identity', {
  skip:!capabilityRuntimePresent
}, ()=>{
  const definitions=structuredClone(catalog.definitions) as any;
  const token=definitions.itemDefinitions.find((item:any)=>item.id==='old_boundary_token');
  const axe=definitions.itemDefinitions.find((item:any)=>item.id==='reinforced_axe');
  assert.ok(token);
  assert.ok(axe);

  axe.capabilities=[...new Set([...axe.capabilities,'enter_old_boundary'])];
  const custom=loadCatalog(definitions,structuredClone(catalog.packs));

  const s=started();
  s.run.resources.inventory.old_boundary_token=1;
  s.run.resources.inventory.reinforced_axe=1;

  assert.equal(runtime.hasItemCapability!(s,'enter_old_boundary',custom),true);
  assert.deepEqual(
    runtime.itemCapabilities!(s,custom)
      .filter((capability:string)=>capability==='enter_old_boundary'),
    ['enter_old_boundary']
  );

  s.run.resources.inventory.old_boundary_token=0;
  assert.equal(runtime.hasItemCapability!(s,'enter_old_boundary',custom),true);

  s.run.resources.inventory.reinforced_axe=0;
  assert.equal(runtime.hasItemCapability!(s,'enter_old_boundary',custom),false);
});

test('catalog validation rejects Activity options that reference an undeclared item capability', {
  skip:!capabilityRuntimePresent
}, ()=>{
  const definitions=structuredClone(catalog.definitions) as any;
  const forest=definitions.activities.find((activity:any)=>activity.id==='lumber.forest');
  assert.ok(forest);

  forest.options??=[];
  forest.options.push({
    id:'qa.route.unknown-capability',
    label:'QA unknown capability route',
    category:'route',
    conditions:[{
      kind:'itemCapability',
      capability:'qa_capability_not_declared',
      present:true
    }],
    progressDelta:0,
    enduranceCost:0,
    setRoute:'qa-unknown-route'
  });

  assert.throws(
    ()=>loadCatalog(definitions,structuredClone(catalog.packs)),
    /Неизвестная item capability/
  );
});
