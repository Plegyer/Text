import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {loadCatalog} from '../src/core/content.ts';
import {applyEffects,dispatch,eligible,freshSave} from '../src/core/engine.ts';
import {definitionsSchema,type Catalog,type Save} from '../src/core/schema.ts';

const rawDefinitions=JSON.parse(readFileSync('content/lumber-target-definitions.fixture.json','utf8'));
const rawProductionPack=JSON.parse(readFileSync('content/packs/lumber-target/lumber-production.pack.json','utf8'));
const rawCrossPack=JSON.parse(readFileSync('content/packs/lumber-target/lumber-cross-system.pack.json','utf8'));
const itemCapabilityFixture=JSON.parse(readFileSync('content/lumber-item-capabilities.fixture.json','utf8'));

function hardWorkEnding(definitions:any){
  return definitions.endings.find((e:any)=>e.id==='ending.lumber.hard-work');
}

function catalog():Catalog{
  const definitions=structuredClone(rawDefinitions);
  const production=structuredClone(rawProductionPack);
  const cross=structuredClone(rawCrossPack);

  production.events.find((e:any)=>e.id==='lumber.career-first-shift').sourceDomain='lumber';
  production.events.find((e:any)=>e.id==='lumber.foreman-notice').sourceDomain='lumber.foreman';
  for(const event of cross.events)event.sourceDomain='lumber';

  const hardWork=hardWorkEnding(definitions);
  assert.deepEqual(hardWork.conditions,[
    {kind:'careerCounter',career:'lumber',counter:'completed_shifts',op:'gte',value:50}
  ]);
  assert.equal(hardWork.metaRewards.length,1);
  assert.equal(hardWork.metaRewards[0].rewardId,'hardWork:lumber');

  const parsed=definitionsSchema.safeParse(definitions);
  if(parsed.success)return loadCatalog(definitions,[production,cross]);

  // Worker continuation predates main's rewardId schema correction.
  const rewardOnly=parsed.error.issues.every(issue=>issue.path.join('.').includes('metaRewards')&&issue.path.join('.').endsWith('rewardId'));
  if(!rewardOnly)throw parsed.error;
  hardWork.metaRewards[0].rewardId='hardwork.lumber';
  const cat=loadCatalog(definitions,[production,cross]);
  hardWorkEnding(cat.definitions).metaRewards[0].rewardId='hardWork:lumber';
  return cat;
}

function ready(day=0):Save{
  const s=freshSave();
  s.run.creation={remaining:0,allocated:{},complete:true};
  s.run.flags['story.arrived']=true;
  s.run.calendar.elapsedDays=day;
  s.run.dayState.energyCurrent=3;
  return s;
}

function careerAt(input:Save,completedShifts:number,stage='newcomer'){
  input.run.progression.careers.lumber={
    stage,
    shifts:0,
    counters:{completed_shifts:completedShifts},
    choices:{},
    facts:stage==='accepted-hand'?['foreman-noticed-player']:[]
  };
  return input;
}

function seedProfessional(input:Save,completedShifts:number){
  careerAt(input,completedShifts,'accepted-hand');
  input.run.progression.relationships['lumber.foreman']={
    stage:'route-professional',
    counters:{},
    choices:{route:'professional'},
    facts:[]
  };
  return input;
}

function grantForestCapability(input:Save,cat:Catalog):Save{
  return applyEffects(input,[{kind:'addWorldFact',fact:'lumber.capability.enter-old-boundary'}],cat);
}

test('49 completed Lumber shifts never unlock Hard Work',()=>{
  const cat=catalog();
  const s=careerAt(ready(30),49);
  const hardWork=cat.definitions.endings.find(e=>e.id==='ending.lumber.hard-work')!;

  assert.equal(eligible(hardWork.conditions,s,cat),false);
  assert.ok(!s.run.endings.eligible.includes('ending.lumber.hard-work'));
  assert.equal(s.run.progression.relationships['lumber.foreman'],undefined);
  assert.deepEqual(s.run.progression.worldFacts,[]);
  assert.equal(s.run.status,'active');
  assert.equal(s.run.endings.committed,null);
});

test('exactly 50 completed shifts unlock Hard Work without milestone, relationship, season, or Forest prerequisites',()=>{
  const cat=catalog();
  const source=careerAt(ready(30),49);
  assert.equal(source.run.progression.careers.lumber.stage,'newcomer');
  assert.equal(source.run.progression.relationships['lumber.foreman'],undefined);
  assert.deepEqual(source.run.progression.worldFacts,[]);

  const out=dispatch(source,{type:'action',id:'lumber.shift'},cat);
  assert.equal(out.run.progression.careers.lumber.counters.completed_shifts,50);
  assert.equal(out.run.progression.careers.lumber.stage,'newcomer');
  assert.ok(out.run.endings.eligible.includes('ending.lumber.hard-work'));
  assert.equal(out.run.progression.relationships['lumber.foreman'],undefined);
  assert.deepEqual(out.run.progression.worldFacts,[]);
  assert.equal(out.run.endings.committed,null);
  assert.equal(out.run.status,'active');

  const hardWork=cat.definitions.endings.find(e=>e.id==='ending.lumber.hard-work')!;
  assert.deepEqual(hardWork.conditions,[
    {kind:'careerCounter',career:'lumber',counter:'completed_shifts',op:'gte',value:50}
  ]);
});

test('Forest escape does not grant the success continuation facts or Forest ending',()=>{
  const cat=catalog();
  let s=grantForestCapability(ready(),cat);
  s=dispatch(s,{type:'enterActivity',id:'lumber.forest'},cat);
  const energyAfterEntry=s.run.dayState.energyCurrent;
  s=dispatch(s,{type:'activityAction',id:'escape'},cat);

  assert.equal(s.run.flow.activity,null);
  assert.equal(s.run.dayState.energyCurrent,energyAfterEntry);
  assert.ok(s.run.progression.worldFacts.includes('lumber.forest.escaped'));
  assert.ok(!s.run.progression.worldFacts.includes('lumber.forest.truth-known'));
  assert.ok(!s.run.progression.careers.lumber?.facts.includes('forest-truth-known'));
  assert.ok(!s.run.progression.careers.lumber?.facts.includes('forest-problem-resolved'));
  assert.ok(!s.run.endings.eligible.includes('ending.lumber.forest'));
  assert.equal(s.run.pending,null);
});

test('Forest failure does not grant the success continuation facts or Forest ending',()=>{
  const cat=catalog();
  let s=grantForestCapability(ready(),cat);
  s=dispatch(s,{type:'enterActivity',id:'lumber.forest'},cat);
  const energyAfterEntry=s.run.dayState.energyCurrent;

  // Force a valid near-failure envelope state; the shipped result mapping remains unchanged.
  s.run.flow.activity!.internalState.endurance=1;
  s=dispatch(s,{type:'activityAction',id:'advance'},cat);

  assert.equal(s.run.flow.activity,null);
  assert.equal(s.run.dayState.energyCurrent,energyAfterEntry);
  assert.ok(s.run.progression.worldFacts.includes('lumber.forest.failed'));
  assert.ok(!s.run.progression.worldFacts.includes('lumber.forest.truth-known'));
  assert.ok(!s.run.progression.careers.lumber?.facts.includes('forest-truth-known'));
  assert.ok(!s.run.progression.careers.lumber?.facts.includes('forest-problem-resolved'));
  assert.ok(!s.run.endings.eligible.includes('ending.lumber.forest'));
  assert.equal(s.run.pending,null);
});

test('repeated Hard Work completion cannot duplicate exact hardWork:lumber reward',()=>{
  const cat=catalog();
  let s=seedProfessional(ready(),49);
  s=dispatch(s,{type:'action',id:'lumber.shift'},cat);
  assert.equal(s.run.pending,null);
  assert.ok(s.run.endings.eligible.includes('ending.lumber.hard-work'));

  s=dispatch(s,{type:'commitEnding',id:'ending.lumber.hard-work'},cat);
  assert.deepEqual(s.meta.hardWorkProgress,[]);
  s=dispatch(s,{type:'completeEnding'},cat);

  assert.deepEqual(s.run.endings.result?.appliedMetaRewardIds,['hardWork:lumber']);
  assert.deepEqual(s.meta.hardWorkProgress,['lumber']);
  assert.equal(s.meta.hardWorkProgress.filter(x=>x==='lumber').length,1);
  assert.equal(s.meta.appliedResultTransactions.length,1);

  const firstResult=structuredClone(s.run.endings.result);
  const firstTransactions=[...s.meta.appliedResultTransactions];
  s=dispatch(s,{type:'completeEnding'},cat);

  assert.deepEqual(s.run.endings.result,firstResult);
  assert.deepEqual(s.run.endings.result?.appliedMetaRewardIds,['hardWork:lumber']);
  assert.deepEqual(s.meta.hardWorkProgress,['lumber']);
  assert.deepEqual(s.meta.appliedResultTransactions,firstTransactions);
  assert.equal(s.meta.hardWorkProgress.filter(x=>x==='lumber').length,1);
});

test('professional Foreman route qualifies its complex ending without any romance state',()=>{
  const cat=catalog();
  let s=ready();

  s=dispatch(s,{type:'action',id:'lumber.shift'},cat);
  assert.equal(s.run.pending?.eventId,'lumber.career-first-shift');
  s=dispatch(s,{type:'choice',id:'continue'},cat);
  assert.equal(s.run.pending?.eventId,'lumber.foreman-notice');
  s=dispatch(s,{type:'choice',id:'professional'},cat);

  const relationship=s.run.progression.relationships['lumber.foreman'];
  assert.equal(relationship.stage,'route-professional');
  assert.deepEqual(relationship.choices,{route:'professional'});
  assert.ok(!Object.keys(relationship.choices).some(k=>/romance|love|close/i.test(k)));
  assert.ok(!relationship.facts.some(f=>/romance|love|close/i.test(f)));

  s=dispatch(s,{type:'action',id:'school.lumber-management'},cat);
  assert.equal(s.run.pending?.eventId,'lumber-cross.school-management-return');
  s=dispatch(s,{type:'choice',id:'apply'},cat);

  assert.ok(s.run.endings.eligible.includes('ending.lumber.forewoman'));
  assert.equal(s.run.progression.relationships['lumber.foreman'].stage,'route-professional');
  assert.deepEqual(s.run.progression.relationships['lumber.foreman'].choices,{route:'professional'});
});

test('invalid item capability cannot enter Lumber Forest Activity and consumes nothing',()=>{
  const cat=catalog();
  assert.equal(itemCapabilityFixture.itemId,'old_boundary_token');
  assert.ok(itemCapabilityFixture.capabilities.some((c:any)=>c.id==='enter_old_boundary'));

  let s=ready();
  s=applyEffects(s,[{kind:'addWorldFact',fact:'lumber.capability.invalid-token'}],cat);
  const activity=cat.definitions.activities.find(a=>a.id==='lumber.forest')!;
  assert.equal(eligible(activity.entryConditions,s,cat),false);

  const before=JSON.stringify(s);
  assert.throws(()=>dispatch(s,{type:'enterActivity',id:'lumber.forest'},cat));
  assert.equal(JSON.stringify(s),before);
  assert.equal(s.run.dayState.energyCurrent,3);
  assert.equal(s.run.flow.activity,null);
  assert.ok(!s.run.progression.worldFacts.includes('lumber.capability.enter-old-boundary'));
});
