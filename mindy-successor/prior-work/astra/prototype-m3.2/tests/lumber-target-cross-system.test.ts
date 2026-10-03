import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {loadCatalog} from '../src/core/content.ts';
import {applyEffects,dispatch,freshSave,eligible} from '../src/core/engine.ts';
import type {Catalog,Save} from '../src/core/schema.ts';

const definitions=JSON.parse(readFileSync('content/lumber-target-definitions.fixture.json','utf8'));
const productionPack=JSON.parse(readFileSync('content/packs/lumber-target/lumber-production.pack.json','utf8'));
const crossPack=JSON.parse(readFileSync('content/packs/lumber-target/lumber-cross-system.pack.json','utf8'));
const itemCapabilityFixture=JSON.parse(readFileSync('content/lumber-item-capabilities.fixture.json','utf8'));

function catalog():Catalog{return loadCatalog(structuredClone(definitions),[structuredClone(productionPack),structuredClone(crossPack)]);}

function ready():Save{
  const s=freshSave();
  s.run.creation={remaining:0,allocated:{},activeHardWorkPackages:[],hardWorkPackagesApplied:true,complete:true};
  s.run.flags['story.arrived']=true;
  s.run.dayState.energyCurrent=3;
  return s;
}

function establishProfessionalRoute(input:Save,cat:Catalog):Save{
  let s=dispatch(input,{type:'action',id:'lumber.shift'},cat);
  assert.equal(s.run.pending?.eventId,'lumber.career-first-shift');
  s=dispatch(s,{type:'choice',id:'continue'},cat);
  assert.equal(s.run.pending?.eventId,'lumber.foreman-notice');
  s=dispatch(s,{type:'choice',id:'professional'},cat);
  assert.equal(s.run.progression.relationships['lumber.foreman'].stage,'route-professional');
  return s;
}

function grantOldBoundaryTokenCapability(input:Save,cat:Catalog):Save{
  assert.equal(itemCapabilityFixture.itemId,'old_boundary_token');
  const capability=itemCapabilityFixture.capabilities.find((c:any)=>c.id==='enter_old_boundary');
  assert.ok(capability);
  assert.equal(capability.runtimeAdapter.kind,'worldFact');
  return applyEffects(input,[{kind:'addWorldFact',fact:capability.runtimeAdapter.fact}],cat);
}

test('cross-system Lumber fixture is schema-valid through the dedicated test catalog builder',()=>{
  assert.doesNotThrow(()=>catalog());
});

test('School result triggers Lumber reaction without another shift or extra reaction Energy',()=>{
  const cat=catalog();
  let s=establishProfessionalRoute(ready(),cat);
  const shifts=s.run.progression.careers.lumber.counters.completed_shifts;
  const energyBefore=s.run.dayState.energyCurrent;
  const moneyBefore=s.run.resources.money;

  s=dispatch(s,{type:'action',id:'school.lumber-management'},cat);
  assert.equal(s.run.dayState.energyCurrent,energyBefore-1);
  assert.equal(s.run.resources.money,moneyBefore-300);
  assert.ok(s.run.progression.worldFacts.includes('lumber.school.management-ready'));
  assert.equal(s.run.progression.careers.lumber.counters.completed_shifts,shifts);
  assert.equal(s.run.pending?.eventId,'lumber-cross.school-management-return');

  const energyAfterSchool=s.run.dayState.energyCurrent;
  s=dispatch(s,{type:'choice',id:'apply'},cat);
  assert.equal(s.run.dayState.energyCurrent,energyAfterSchool);
  assert.equal(s.run.progression.careers.lumber.counters.completed_shifts,shifts);
  assert.ok(s.run.progression.careers.lumber.facts.includes('management-school-ready'));
  assert.ok(s.run.progression.careers.lumber.facts.includes('forewoman-problem-resolved'));
  assert.equal(s.run.endings.eligible.includes('ending.lumber.forewoman'),false,
    'D34 forbids Forewoman before trusted-worker / 8 shifts');
  const ending=cat.definitions.endings.find(e=>e.id==='ending.lumber.forewoman')!;
  s.run.progression.careers.lumber.stage='trusted-worker';
  s.run.progression.careers.lumber.counters.completed_shifts=8;
  assert.equal(eligible(ending.conditions,s,cat),true);
});

test('old_boundary_token capability fixture opens the Lumber Forest Activity entry',()=>{
  const cat=catalog();
  const source=ready();
  const activity=cat.definitions.activities.find(a=>a.id==='lumber.forest')!;
  assert.equal(eligible(activity.entryConditions,source,cat),false);
  assert.throws(()=>dispatch(source,{type:'enterActivity',id:'lumber.forest'},cat));

  const granted=grantOldBoundaryTokenCapability(source,cat);
  assert.ok(granted.run.progression.worldFacts.includes('lumber.capability.enter-old-boundary'));
  assert.equal(eligible(activity.entryConditions,granted,cat),true);

  const entered=dispatch(granted,{type:'enterActivity',id:'lumber.forest'},cat);
  assert.equal(entered.run.dayState.energyCurrent,1);
  assert.equal(entered.run.flow.activity?.activityId,'lumber.forest');
});

test('A5 activityResult success triggers immediate Lumber continuation with 0 extra Energy',()=>{
  const cat=catalog();
  const base=ready();
  base.run.progression.careers.lumber={stage:'trusted-worker',shifts:0,counters:{completed_shifts:8},choices:{},facts:[]};
  let s=grantOldBoundaryTokenCapability(base,cat);
  s=dispatch(s,{type:'enterActivity',id:'lumber.forest'},cat);
  const cityEnergy=s.run.dayState.energyCurrent;
  s=dispatch(s,{type:'activityAction',id:'advance'},cat);
  s=dispatch(s,{type:'activityAction',id:'advance'},cat);

  assert.equal(s.run.flow.activity,null);
  assert.equal(s.run.dayState.energyCurrent,cityEnergy);
  assert.ok(s.run.progression.worldFacts.includes('lumber.forest.truth-known'));
  assert.equal(s.run.pending?.eventId,'lumber-cross.activity-forest-return');
  assert.ok(!s.run.progression.careers.lumber?.facts.includes('forest-truth-known'));

  s=dispatch(s,{type:'choice',id:'continue'},cat);
  assert.equal(s.run.dayState.energyCurrent,cityEnergy);
  assert.ok(s.run.progression.careers.lumber.facts.includes('forest-specimen-catalogued'));
  assert.ok(s.run.progression.careers.lumber.facts.includes('forest-truth-known'));
  assert.ok(s.run.progression.careers.lumber.facts.includes('forest-problem-resolved'));
  assert.equal(s.run.inventory.forest_preserved_specimen??0,1,'D41 does not consume the preserved Forest specimen');
  assert.ok(s.run.endings.eligible.includes('ending.lumber.forest'));
});

test('Hard Work, Forewoman and Forest can be eligible together and eligibility does not auto-commit',()=>{
  const cat=catalog();
  let s=establishProfessionalRoute(ready(),cat);

  s.run.progression.careers.lumber.counters.completed_shifts=49;
  s.run.dayState.energyCurrent=3;
  s=dispatch(s,{type:'action',id:'lumber.shift'},cat);
  assert.equal(s.run.progression.careers.lumber.counters.completed_shifts,50);
  assert.ok(s.run.endings.eligible.includes('ending.lumber.hard-work'));
  assert.equal(s.run.pending?.eventId,'lumber.career-trusted-worker');
  s=dispatch(s,{type:'choice',id:'continue'},cat);
  assert.equal(s.run.pending?.eventId,'lumber.career-veteran');
  s=dispatch(s,{type:'choice',id:'continue'},cat);
  assert.equal(s.run.progression.careers.lumber.stage,'veteran');

  s=dispatch(s,{type:'action',id:'school.lumber-management'},cat);
  assert.equal(s.run.pending?.eventId,'lumber-cross.school-management-return');
  s=dispatch(s,{type:'choice',id:'apply'},cat);
  assert.ok(s.run.endings.eligible.includes('ending.lumber.forewoman'));

  s=grantOldBoundaryTokenCapability(s,cat);
  s.run.dayState.energyCurrent=3;
  s=dispatch(s,{type:'enterActivity',id:'lumber.forest'},cat);
  s=dispatch(s,{type:'activityAction',id:'advance'},cat);
  s=dispatch(s,{type:'activityAction',id:'advance'},cat);
  assert.equal(s.run.pending?.eventId,'lumber-cross.activity-forest-return');
  s=dispatch(s,{type:'choice',id:'continue'},cat);

  assert.ok(s.run.endings.eligible.includes('ending.lumber.hard-work'));
  assert.ok(s.run.endings.eligible.includes('ending.lumber.forewoman'));
  assert.ok(s.run.endings.eligible.includes('ending.lumber.forest'));
  assert.equal(s.run.status,'active');
  assert.equal(s.run.endings.committed,null);
  assert.equal(s.run.endings.result,null);
  assert.deepEqual(s.meta.hardWorkProgress,[]);
});
