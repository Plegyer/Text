import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {loadCatalog} from '../src/core/content.ts';
import {dispatch,eligible,freshSave} from '../src/core/engine.ts';
import {presentationIdForEnding} from '../src/core/presentation.ts';
import type {Catalog,Save} from '../src/core/schema.ts';

const ui=JSON.parse(readFileSync('content/lumber-production-ui-contract.fixture.json','utf8'));
const baseDefinitions=JSON.parse(readFileSync('content/lumber-target-definitions.fixture.json','utf8'));
const productionPack=JSON.parse(readFileSync('content/packs/lumber-target/lumber-production.pack.json','utf8'));
const nightPack=JSON.parse(readFileSync('content/packs/lumber-target/lumber-night-acceptance.pack.json','utf8'));
const itemCapability=JSON.parse(readFileSync('content/lumber-item-capabilities.fixture.json','utf8'));

function definitions(){
  const d=structuredClone(baseDefinitions);
  d.lodgings=[{
    id:'lumber.normal-room',label:'Normal room',housing:'normal',moneyCost:100,
    conditions:[],effects:[],nextDayEffects:[],nextDayEnergyDelta:0
  }];
  d.nightChoices=[{
    id:'lumber.foreman.night',label:'Talk with Foreman',
    conditions:[{kind:'relationshipStage',relationship:'lumber.foreman',stage:'route-professional'}],
    effects:[],nextDayEffects:[],nextDayEnergyDelta:0
  }];
  return d;
}
function catalog():Catalog{return loadCatalog(definitions(),[structuredClone(productionPack),structuredClone(nightPack)]);}
function ready():Save{
  const s=freshSave();
  s.run.creation={remaining:0,allocated:{},complete:true};
  s.run.flags['story.arrived']=true;
  s.run.dayState.energyCurrent=3;
  return s;
}
const byId=new Map(ui.surfaces.map((x:any)=>[x.id,x]));

test('UI contract binds target Lumber shift to exact DayHub command and one-Energy cost',()=>{
  const work:any=byId.get('lumber-work');
  const action=baseDefinitions.actions.find((x:any)=>x.id==='lumber.shift');
  assert.ok(action);
  assert.deepEqual(work.command,{type:'action',id:'lumber.shift'});
  assert.deepEqual(work.costDisplay,{daytimeEnergy:1,money:0});
  assert.equal(action.cost.energy,1);
  assert.equal(action.cost.money,0);
  assert.ok(!ui.productionExclusions.includes('lumber.shift'));
  assert.ok(ui.productionExclusions.includes('school.lumber-management'));
});

test('Forest UI contract uses enterActivity plus internal advance/escape and charges daytime Energy only on entry',()=>{
  const entry:any=byId.get('forest-entry');
  const actions:any=byId.get('forest-actions');
  const activity=baseDefinitions.activities.find((x:any)=>x.id==='lumber.forest');
  assert.ok(activity);
  assert.deepEqual(entry.command,{type:'enterActivity',id:'lumber.forest'});
  assert.equal(activity.entryEnergyCost,2);
  assert.deepEqual(actions.commands,[
    {type:'activityAction',id:'advance'},
    {type:'activityAction',id:'escape'}
  ]);
  assert.equal(actions.daytimeEnergyPerInternalAction,0);
  const capability=itemCapability.capabilities.find((x:any)=>x.id==='enter_old_boundary');
  assert.ok(capability);
  assert.deepEqual(activity.entryConditions,[
    {kind:'worldFact',fact:capability.runtimeAdapter.fact,present:true}
  ]);
});

test('Foreman Night UI contract is visible only on professional route and costs zero daytime Energy',()=>{
  const cat=catalog();
  const night:any=byId.get('foreman-night');
  assert.equal(night.targetId,'lumber.foreman.night');
  assert.equal(night.daytimeEnergyCost,0);
  assert.equal(night.consumesNightSlot,true);
  assert.equal(night.reactionEventId,'lumber-night.foreman-professional');

  let s=ready();
  const nightChoice=cat.definitions.nightChoices.find(x=>x.id==='lumber.foreman.night');
  assert.ok(nightChoice);
  assert.equal(eligible(nightChoice.conditions,s,cat),false);

  s.run.progression.relationships['lumber.foreman']={
    stage:'route-professional',counters:{},choices:{route:'professional'},facts:[]
  };
  assert.equal(eligible(nightChoice.conditions,s,cat),true);
  assert.equal(JSON.stringify(nightChoice.conditions).match(/romance|love/i),null);
});

test('ending UI contract exposes eligibility separately from explicit commit/completion',()=>{
  const endings:any=byId.get('ending-availability');
  assert.deepEqual(endings.targetIds,[
    'ending.lumber.hard-work','ending.lumber.forewoman','ending.lumber.forest'
  ]);
  assert.equal(endings.eligibleListBinding,'run.endings.eligible');
  assert.deepEqual(endings.completionCommand,{type:'completeEnding'});
  assert.deepEqual(
    endings.targetIds.map((id:string)=>presentationIdForEnding(id)),
    endings.semanticPresentationIds
  );

  const cat=catalog();
  const s=ready();
  s.run.progression.careers.lumber={
    stage:'newcomer',shifts:0,counters:{completed_shifts:50},choices:{},facts:[]
  };
  const hardWork=cat.definitions.endings.find(e=>e.id==='ending.lumber.hard-work')!;
  assert.equal(eligible(hardWork.conditions,s,cat),true);
  assert.equal(s.run.status,'active');
  assert.equal(s.run.endings.committed,null);
});

test('UI contract cannot introduce extra Hard Work prerequisites or change A5/A6 identities',()=>{
  assert.deepEqual(ui.lockedContracts.hardWorkConditions,[
    {kind:'careerCounter',career:'lumber',counter:'completed_shifts',op:'gte',value:50}
  ]);
  assert.equal(ui.lockedContracts.hardWorkRewardId,'hardWork:lumber');
  assert.equal(ui.lockedContracts.activityContinuationBoundary,'activityResult');

  const hardWork=baseDefinitions.endings.find((e:any)=>e.id==='ending.lumber.hard-work');
  assert.deepEqual(hardWork.conditions,ui.lockedContracts.hardWorkConditions);
  assert.deepEqual(hardWork.metaRewards,[
    {kind:'hardWork',rewardId:'hardWork:lumber',career:'lumber'}
  ]);
});
