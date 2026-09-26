import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {loadCatalog} from '../src/core/content.ts';
import {applyEffects,dispatch,freshSave,parseSave} from '../src/core/engine.ts';
import type {Catalog,Save} from '../src/core/schema.ts';

const definitions=JSON.parse(readFileSync('content/lumber-target-definitions.fixture.json','utf8'));
const productionPack=JSON.parse(readFileSync('content/packs/lumber-target/lumber-production.pack.json','utf8'));
const crossPack=JSON.parse(readFileSync('content/packs/lumber-target/lumber-cross-system.pack.json','utf8'));
const itemCapabilityFixture=JSON.parse(readFileSync('content/lumber-item-capabilities.fixture.json','utf8'));

function catalog():Catalog{
  return loadCatalog(
    structuredClone(definitions),
    [structuredClone(productionPack),structuredClone(crossPack)]
  );
}

function ready():Save{
  const s=freshSave();
  s.run.creation={remaining:0,allocated:{},complete:true};
  s.run.flags['story.arrived']=true;
  s.run.dayState.energyCurrent=3;
  return s;
}

function grantForestCapability(input:Save,cat:Catalog):Save{
  const capability=itemCapabilityFixture.capabilities.find((c:any)=>c.id==='enter_old_boundary');
  assert.ok(capability);
  assert.equal(capability.runtimeAdapter.kind,'worldFact');
  return applyEffects(input,[{kind:'addWorldFact',fact:capability.runtimeAdapter.fact}],cat);
}

function enterForest(cat:Catalog):Save{
  return dispatch(grantForestCapability(ready(),cat),{type:'enterActivity',id:'lumber.forest'},cat);
}

function finishForestSuccess(input:Save,cat:Catalog):Save{
  let s=dispatch(input,{type:'activityAction',id:'advance'},cat);
  return dispatch(s,{type:'activityAction',id:'advance'},cat);
}

test('Forest entry costs exactly 2 daytime Energy once and immediate reload does not charge again',()=>{
  const cat=catalog();
  const source=grantForestCapability(ready(),cat);
  assert.equal(source.run.dayState.energyCurrent,3);

  const entered=dispatch(source,{type:'enterActivity',id:'lumber.forest'},cat);
  assert.equal(entered.run.dayState.energyCurrent,1);
  assert.equal(entered.run.flow.activity?.activityId,'lumber.forest');
  assert.equal(entered.run.flow.activity?.entryEnergyCommitted,true);
  assert.equal(entered.run.flow.activity?.checkpoint,'entry');
  assert.equal(source.run.dayState.energyCurrent,3);

  const restored=parseSave(JSON.stringify(entered),cat);
  assert.equal(restored.run.dayState.energyCurrent,1);
  assert.equal(restored.run.flow.activity?.entryEnergyCommitted,true);
  assert.equal(restored.run.flow.activity?.checkpoint,'entry');
  assert.deepEqual(restored.run.flow.activity,entered.run.flow.activity);
});

test('an intermediate Forest checkpoint survives reload and preserves deterministic next success',()=>{
  const cat=catalog();
  let s=enterForest(cat);
  s=dispatch(s,{type:'activityAction',id:'advance'},cat);

  assert.equal(s.run.dayState.energyCurrent,1);
  assert.equal(s.run.flow.activity?.checkpoint,'counter.step.1');
  assert.equal(s.run.flow.activity?.internalState.progress,1);
  assert.equal(s.run.flow.activity?.internalState.endurance,4);
  const checkpoint=structuredClone(s.run.flow.activity);

  const restored=parseSave(JSON.stringify(s),cat);
  assert.deepEqual(restored.run.flow.activity,checkpoint);
  assert.equal(restored.run.dayState.energyCurrent,1);

  const originalNext=dispatch(s,{type:'activityAction',id:'advance'},cat);
  const restoredNext=dispatch(restored,{type:'activityAction',id:'advance'},cat);
  assert.deepEqual(restoredNext,originalNext);
  assert.equal(restoredNext.run.pending?.eventId,'lumber-cross.activity-forest-return');
  assert.ok(restoredNext.run.progression.worldFacts.includes('lumber.forest.truth-known'));
});

test('Forest success emits the exact A5 activityResult and the Lumber continuation costs 0 extra Energy',()=>{
  const cat=catalog();
  const returnEvent=cat.events.find(e=>e.id==='lumber-cross.activity-forest-return');
  assert.ok(returnEvent);
  assert.deepEqual(returnEvent.reactionTriggers,[
    {kind:'activityResult',activity:'lumber.forest',outcome:'success',result:'lumber.forest.success'}
  ]);

  let s=enterForest(cat);
  const entryEnergy=s.run.dayState.energyCurrent;
  s=finishForestSuccess(s,cat);

  assert.equal(s.run.flow.activity,null);
  assert.equal(s.run.dayState.energyCurrent,entryEnergy);
  assert.ok(s.run.progression.worldFacts.includes('lumber.forest.truth-known'));
  assert.equal(s.run.pending?.eventId,'lumber-cross.activity-forest-return');
  assert.equal(s.run.pending?.variantId,'default');
  assert.ok(!s.run.progression.careers.lumber?.facts.includes('forest-truth-known'));
  assert.ok(!s.run.progression.careers.lumber?.facts.includes('forest-problem-resolved'));

  s=dispatch(s,{type:'choice',id:'continue'},cat);
  assert.equal(s.run.dayState.energyCurrent,entryEnergy);
  assert.equal(s.run.pending,null);
  assert.ok(s.run.progression.careers.lumber.facts.includes('forest-truth-known'));
  assert.ok(s.run.progression.careers.lumber.facts.includes('forest-problem-resolved'));
  assert.ok(s.run.endings.eligible.includes('ending.lumber.forest'));
});

test('Forest escape and failure never emit the success result or success continuation facts',()=>{
  const cat=catalog();

  let escaped=enterForest(cat);
  const escapeEnergy=escaped.run.dayState.energyCurrent;
  escaped=dispatch(escaped,{type:'activityAction',id:'escape'},cat);
  assert.equal(escaped.run.flow.activity,null);
  assert.equal(escaped.run.dayState.energyCurrent,escapeEnergy);
  assert.ok(escaped.run.progression.worldFacts.includes('lumber.forest.escaped'));
  assert.ok(!escaped.run.progression.worldFacts.includes('lumber.forest.truth-known'));
  assert.ok(!escaped.run.progression.careers.lumber?.facts.includes('forest-truth-known'));
  assert.ok(!escaped.run.progression.careers.lumber?.facts.includes('forest-problem-resolved'));
  assert.equal(escaped.run.pending,null);

  let failed=enterForest(cat);
  const failureEnergy=failed.run.dayState.energyCurrent;
  failed.run.flow.activity!.internalState.endurance=1;
  failed=dispatch(failed,{type:'activityAction',id:'advance'},cat);
  assert.equal(failed.run.flow.activity,null);
  assert.equal(failed.run.dayState.energyCurrent,failureEnergy);
  assert.ok(failed.run.progression.worldFacts.includes('lumber.forest.failed'));
  assert.ok(!failed.run.progression.worldFacts.includes('lumber.forest.truth-known'));
  assert.ok(!failed.run.progression.careers.lumber?.facts.includes('forest-truth-known'));
  assert.ok(!failed.run.progression.careers.lumber?.facts.includes('forest-problem-resolved'));
  assert.equal(failed.run.pending,null);
});

test('reload after Forest success result cannot duplicate result reward, continuation progress, or Energy',()=>{
  const cat=catalog();
  let s=finishForestSuccess(enterForest(cat),cat);
  const energyAfterResult=s.run.dayState.energyCurrent;

  assert.equal(energyAfterResult,1);
  assert.equal(s.run.progression.worldFacts.filter(x=>x==='lumber.forest.truth-known').length,1);
  assert.equal(s.run.pending?.eventId,'lumber-cross.activity-forest-return');

  s=parseSave(JSON.stringify(s),cat);
  assert.equal(s.run.dayState.energyCurrent,energyAfterResult);
  assert.equal(s.run.progression.worldFacts.filter(x=>x==='lumber.forest.truth-known').length,1);
  assert.equal(s.run.pending?.eventId,'lumber-cross.activity-forest-return');

  s=dispatch(s,{type:'choice',id:'continue'},cat);
  assert.equal(s.run.dayState.energyCurrent,energyAfterResult);
  assert.equal(s.run.progression.worldFacts.filter(x=>x==='lumber.forest.truth-known').length,1);
  assert.equal(s.run.progression.careers.lumber.facts.filter(x=>x==='forest-truth-known').length,1);
  assert.equal(s.run.progression.careers.lumber.facts.filter(x=>x==='forest-problem-resolved').length,1);
  assert.equal(s.run.endings.eligible.filter(x=>x==='ending.lumber.forest').length,1);

  const restored=parseSave(JSON.stringify(s),cat);
  assert.equal(restored.run.dayState.energyCurrent,energyAfterResult);
  assert.equal(restored.run.progression.worldFacts.filter(x=>x==='lumber.forest.truth-known').length,1);
  assert.equal(restored.run.progression.careers.lumber.facts.filter(x=>x==='forest-truth-known').length,1);
  assert.equal(restored.run.progression.careers.lumber.facts.filter(x=>x==='forest-problem-resolved').length,1);
  assert.equal(restored.run.endings.eligible.filter(x=>x==='ending.lumber.forest').length,1);

  const before=JSON.stringify(restored);
  assert.throws(()=>dispatch(restored,{type:'choice',id:'continue'},cat));
  assert.equal(JSON.stringify(restored),before);
});

test('Forest acceptance depth does not add School, relationship, ending, season, or Forest prerequisites to Hard Work',()=>{
  const cat=catalog();
  const hardWork=cat.definitions.endings.find(e=>e.id==='ending.lumber.hard-work');
  assert.ok(hardWork);
  assert.deepEqual(hardWork.conditions,[
    {kind:'careerCounter',career:'lumber',counter:'completed_shifts',op:'gte',value:50}
  ]);
  assert.equal(hardWork.conditions.length,1);
  assert.deepEqual(hardWork.metaRewards,[
    {kind:'hardWork',rewardId:'hardWork:lumber',career:'lumber'}
  ]);

  const returnEvent=cat.events.find(e=>e.id==='lumber-cross.activity-forest-return');
  assert.ok(returnEvent);
  assert.ok(returnEvent.reactionTriggers.every(t=>t.kind==='activityResult'));
});
