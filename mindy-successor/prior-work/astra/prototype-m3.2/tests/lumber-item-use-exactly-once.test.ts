import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {freshSave,parseSave} from '../src/core/engine.ts';
import {loadCatalog} from '../src/core/content.ts';

const contract=JSON.parse(readFileSync('content/lumber-item-use-exactly-once.fixture.json','utf8'));
const definitions=JSON.parse(readFileSync('content/lumber-target-definitions.fixture.json','utf8'));\nconst productionPack=JSON.parse(readFileSync('content/packs/lumber-target/lumber-production.pack.json','utf8'));

type Model={inventory:Record<string,number>;committedUseIds:string[];availableCapabilities:string[]};
type Policy='retain'|'consume';

function recompute(model:Model,itemId:string,capability:string){
  const present=(model.inventory[itemId]??0)>0;
  const set=new Set(model.availableCapabilities);
  if(present)set.add(capability);else set.delete(capability);
  model.availableCapabilities=[...set].sort();
}

function applyUse(model:Model,args:{useId:string;itemId:string;capability:string;policy:Policy}){
  if(model.committedUseIds.includes(args.useId))return model;
  const next:Model=JSON.parse(JSON.stringify(model));
  const have=next.inventory[args.itemId]??0;
  if(have<1)throw new Error('missing item');
  if(args.policy==='consume')next.inventory[args.itemId]=have-1;
  next.committedUseIds.push(args.useId);
  recompute(next,args.itemId,args.capability);
  return next;
}

function reloadModel(model:Model):Model{return JSON.parse(JSON.stringify(model));}

test('contract keeps consume or retain policy OPEN for every authoritative Forest item capability',()=>{
  assert.deepEqual(contract.options.map((o:any)=>o.capability),[
    'enter_old_boundary','cross_rough_route','preserve_specimen','cut_heavy_wood'
  ]);
  for(const option of contract.options)assert.equal(option.consumePolicy,'OPEN',option.capability);
});

test('retained item remains present and capability remains available across reload and retry',()=>{
  let model:Model={inventory:{old_boundary_token:1},committedUseIds:[],availableCapabilities:['enter_old_boundary']};
  model=applyUse(model,{useId:'use:1',itemId:'old_boundary_token',capability:'enter_old_boundary',policy:'retain'});
  assert.equal(model.inventory.old_boundary_token,1);
  assert.deepEqual(model.committedUseIds,['use:1']);
  assert.ok(model.availableCapabilities.includes('enter_old_boundary'));

  model=reloadModel(model);
  const retried=applyUse(model,{useId:'use:1',itemId:'old_boundary_token',capability:'enter_old_boundary',policy:'retain'});
  assert.deepEqual(retried,model);
  assert.equal(retried.inventory.old_boundary_token,1);
});

test('consumed item cannot double-consume or reappear after reload',()=>{
  let model:Model={inventory:{field_preservation_kit:1},committedUseIds:[],availableCapabilities:['preserve_specimen']};
  model=applyUse(model,{useId:'use:2',itemId:'field_preservation_kit',capability:'preserve_specimen',policy:'consume'});
  assert.equal(model.inventory.field_preservation_kit,0);
  assert.deepEqual(model.committedUseIds,['use:2']);
  assert.equal(model.availableCapabilities.includes('preserve_specimen'),false);

  model=reloadModel(model);
  assert.equal(model.inventory.field_preservation_kit,0);
  const retried=applyUse(model,{useId:'use:2',itemId:'field_preservation_kit',capability:'preserve_specimen',policy:'consume'});
  assert.deepEqual(retried,model);
  assert.equal(retried.inventory.field_preservation_kit,0);
});

test('capability availability is recomputed from actual inventory rather than a stale cached capability',()=>{
  const model:Model={inventory:{reinforced_axe:0},committedUseIds:['use:3'],availableCapabilities:['cut_heavy_wood']};
  recompute(model,'reinforced_axe','cut_heavy_wood');
  assert.equal(model.availableCapabilities.includes('cut_heavy_wood'),false);
  model.inventory.reinforced_axe=1;
  recompute(model,'reinforced_axe','cut_heavy_wood');
  assert.equal(model.availableCapabilities.includes('cut_heavy_wood'),true);
});

test('current save schema can preserve future item keys even though typed content effects/options are not implemented yet',()=>{
  const cat=loadCatalog(structuredClone(definitions),[structuredClone(productionPack)]);
  const save=freshSave();
  save.run.resources.inventory.old_boundary_token=1;
  const restored=parseSave(JSON.stringify(save),cat);
  assert.equal(restored.run.resources.inventory.old_boundary_token,1);
  assert.equal(contract.runtimeBoundary.sharedRuntimePatchIncluded,false);
  assert.equal(contract.runtimeBoundary.currentTypedItemEffectsSupportTheseItems,false);
  assert.equal(contract.runtimeBoundary.currentActivityOptionCommandSupport,false);
});

test('item-use contract cannot modify Hard Work',()=>{
  const hardWork=definitions.endings.find((e:any)=>e.id==='ending.lumber.hard-work');
  assert.deepEqual(hardWork.conditions,[
    {kind:'careerCounter',career:'lumber',counter:'completed_shifts',op:'gte',value:50}
  ]);
  assert.deepEqual(hardWork.metaRewards,[
    {kind:'hardWork',rewardId:'hardWork:lumber',career:'lumber'}
  ]);
  assert.equal(contract.hardWorkIsolation.itemUsePrerequisiteAllowed,false);
});
