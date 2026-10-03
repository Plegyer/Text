import test from 'node:test';
import assert from 'node:assert/strict';
import {loadCatalog} from '../src/core/content.ts';
import {dispatch,freshSave,parseSave} from '../src/core/engine.ts';
import type {Catalog,Effect,Save} from '../src/core/schema.ts';

function workAction(){
  return {
    id:'work',
    label:'Work',
    description:'Synthetic city work action.',
    cost:{money:0,energy:1},
    conditions:[],
    effects:[],
    mode:'normal'
  };
}

function activity(id:string,config:{initialEndurance:number;advanceEnduranceCost:number;successAtProgress:number;failAtEndurance:number},results?:Partial<Record<'success'|'escape'|'failure',Effect[]>>){
  return {
    id,
    label:id,
    version:1,
    entryConditions:[],
    entryEnergyCost:2,
    resumePolicy:'allowed',
    timePolicy:'same_day',
    failurePolicy:'exit_to_day',
    adapter:'counter.v1',
    adapterConfig:config,
    results:[
      {id:`${id}.success`,outcome:'success',effects:results?.success??[{kind:'modifyResource',resource:'money',delta:50},{kind:'addWorldFact',fact:`${id}.won`}]},
      {id:`${id}.escape`,outcome:'escape',effects:results?.escape??[{kind:'addWorldFact',fact:`${id}.escaped`}]},
      {id:`${id}.failure`,outcome:'failure',effects:results?.failure??[{kind:'addWorldFact',fact:`${id}.failed`}]}
    ]
  };
}

function definitions(){
  return {
    version:'0.1.0',
    flags:['story.arrived'],
    actions:[workAction()],
    endings:[],
    activities:[
      activity('test.expedition',{initialEndurance:5,advanceEnduranceCost:1,successAtProgress:2,failAtEndurance:0}),
      activity('test.failure',{initialEndurance:2,advanceEnduranceCost:1,successAtProgress:99,failAtEndurance:0})
    ]
  };
}

function returnPack(withCapability=true){
  return {
    schemaVersion:1,
    id:'activity',
    reads:[],
    writes:[],
    capabilities:withCapability?{reads:{activities:['test.expedition']},writes:{}}:{reads:{},writes:{}},
    media:[],
    events:[{
      id:'activity.return',
      title:'Return from expedition',
      trigger:[],
      reactionTriggers:[{kind:'activityResult',activity:'test.expedition',outcome:'success',result:'test.expedition.success'}],
      priorityClass:'critical_progression',
      priority:10,
      blocking:true,
      delivery:{policy:'live'},
      cooldownDays:0,
      variantCooldownDays:0,
      maxShows:10,
      conditions:[],
      variants:[{id:'default',text:'The expedition result is noticed back in the city.',conditions:[],media:[]}],
      choices:[{id:'continue',label:'Continue',text:'Return to ordinary city life.',conditions:[],effects:[]}]
    }]
  };
}

function catalog():Catalog{return loadCatalog(definitions(),[returnPack()]);}

function start():Save{
  const s=freshSave();
  s.run.creation={remaining:0,allocated:{},activeHardWorkPackages:[],hardWorkPackagesApplied:true,complete:true};
  s.run.flags['story.arrived']=true;
  return s;
}

test('Activity entry costs exactly two daily Energy once',()=>{
  const cat=catalog();
  const source=start();
  assert.equal(source.run.dayState.energyCurrent,3);
  const entered=dispatch(source,{type:'enterActivity',id:'test.expedition'},cat);
  assert.equal(entered.run.dayState.energyCurrent,1);
  assert.equal(entered.run.flow.activity?.activityId,'test.expedition');
  assert.equal(entered.run.flow.activity?.entryEnergyCommitted,true);
  assert.equal(source.run.dayState.energyCurrent,3);

  const restored=parseSave(JSON.stringify(entered),cat);
  assert.equal(restored.run.dayState.energyCurrent,1);
  assert.equal(restored.run.flow.activity?.entryEnergyCommitted,true);
});

test('Activity entry rejects insufficient Energy atomically',()=>{
  const cat=catalog(),s=start();
  s.run.dayState.energyCurrent=1;
  const before=JSON.stringify(s);
  assert.throws(()=>dispatch(s,{type:'enterActivity',id:'test.expedition'},cat),/Energy/);
  assert.equal(JSON.stringify(s),before);
});

test('Activity cannot coexist with Night or pending scene',()=>{
  const cat=catalog();
  const pending=start();
  pending.run.pending={
    eventId:'activity.return',
    variantId:'default',
    allowedChoiceIds:['continue']
  };
  assert.throws(()=>dispatch(pending,{type:'enterActivity',id:'test.expedition'},cat),/сцену/);

  const night=dispatch(start(),{type:'endDay'},cat);
  assert.ok(night.run.flow.night);
  assert.throws(()=>dispatch(night,{type:'enterActivity',id:'test.expedition'},cat),/NightFlow/);
});

test('city actions and Night are blocked while Activity is active',()=>{
  const cat=catalog();
  const entered=dispatch(start(),{type:'enterActivity',id:'test.expedition'},cat);
  assert.throws(()=>dispatch(entered,{type:'action',id:'work'},cat),/Activity/);
  assert.throws(()=>dispatch(entered,{type:'endDay'},cat),/Activity/);
});

test('internal advance spends Activity endurance but not daily Energy or global RNG',()=>{
  const cat=catalog();
  let s=dispatch(start(),{type:'enterActivity',id:'test.expedition'},cat);
  const dailyEnergy=s.run.dayState.energyCurrent;
  const globalRng=s.run.rng;
  const activityRng=s.run.flow.activity!.rngState;
  s=dispatch(s,{type:'activityAction',id:'advance'},cat);
  assert.equal(s.run.dayState.energyCurrent,dailyEnergy);
  assert.equal(s.run.rng,globalRng);
  assert.notEqual(s.run.flow.activity!.rngState,activityRng);
  assert.equal(s.run.flow.activity!.internalState.endurance,4);
  assert.equal(s.run.flow.activity!.internalState.progress,1);
  assert.equal(s.run.flow.activity!.internalState.steps,1);
  assert.equal(s.run.flow.activity!.checkpoint,'counter.step.1');
});

test('save reload inside Activity preserves deterministic next step',()=>{
  const cat=catalog();
  let s=dispatch(start(),{type:'enterActivity',id:'test.expedition'},cat);
  s=dispatch(s,{type:'activityAction',id:'advance'},cat);
  const restored=parseSave(JSON.stringify(s),cat);
  assert.deepEqual(restored.run.flow.activity,s.run.flow.activity);

  const a=dispatch(s,{type:'activityAction',id:'advance'},cat);
  const b=dispatch(restored,{type:'activityAction',id:'advance'},cat);
  assert.deepEqual(a,b);
});

test('success applies typed result once and triggers external Resolver scene at zero extra Energy',()=>{
  const cat=catalog();
  let s=dispatch(start(),{type:'enterActivity',id:'test.expedition'},cat);
  const entryEnergy=s.run.dayState.energyCurrent;
  const money=s.run.resources.money;
  s=dispatch(s,{type:'activityAction',id:'advance'},cat);
  s=dispatch(s,{type:'activityAction',id:'advance'},cat);

  assert.equal(s.run.flow.activity,null);
  assert.equal(s.run.dayState.energyCurrent,entryEnergy);
  assert.equal(s.run.resources.money,money+50);
  assert.ok(s.run.progression.worldFacts.includes('test.expedition.won'));
  assert.equal(s.run.pending?.eventId,'activity.return');

  const before=JSON.stringify(s);
  assert.throws(()=>dispatch(s,{type:'activityAction',id:'advance'},cat),/Нет активной Activity/);
  assert.equal(JSON.stringify(s),before);

  s=dispatch(s,{type:'choice',id:'continue'},cat);
  assert.equal(s.run.pending,null);
  assert.equal(s.run.resources.money,money+50);
});

test('escape returns to city without success reward',()=>{
  const cat=catalog();
  const money=start().run.resources.money;
  let s=dispatch(start(),{type:'enterActivity',id:'test.expedition'},cat);
  s=dispatch(s,{type:'activityAction',id:'escape'},cat);
  assert.equal(s.run.flow.activity,null);
  assert.equal(s.run.resources.money,money);
  assert.ok(s.run.progression.worldFacts.includes('test.expedition.escaped'));
  assert.ok(!s.run.progression.worldFacts.includes('test.expedition.won'));
  assert.equal(s.run.pending,null);
});

test('failure is distinct from success and escape',()=>{
  const cat=catalog();
  let s=dispatch(start(),{type:'enterActivity',id:'test.failure'},cat);
  const energy=s.run.dayState.energyCurrent;
  s=dispatch(s,{type:'activityAction',id:'advance'},cat);
  assert.ok(s.run.flow.activity);
  s=dispatch(s,{type:'activityAction',id:'advance'},cat);
  assert.equal(s.run.flow.activity,null);
  assert.equal(s.run.dayState.energyCurrent,energy);
  assert.ok(s.run.progression.worldFacts.includes('test.failure.failed'));
  assert.ok(!s.run.progression.worldFacts.includes('test.failure.won'));
});

test('Activity result trigger requires declared pack capability',()=>{
  assert.doesNotThrow(()=>catalog());
  assert.throws(()=>loadCatalog(definitions(),[returnPack(false)]),/typed capability/);
});

test('catalog rejects unsupported synthetic Activity policies and incomplete outcomes',()=>{
  const badTime=definitions() as any;
  badTime.activities[0].timePolicy='advances_calendar_on_exit';
  assert.throws(()=>loadCatalog(badTime,[returnPack()]),/timePolicy=same_day/);

  const badResults=definitions() as any;
  badResults.activities[0].results[2].outcome='success';
  assert.throws(()=>loadCatalog(badResults,[returnPack()]),/success\/escape\/failure/);
});

test('parseSave rejects unknown Activity version and impossible active terminal state',()=>{
  const cat=catalog();
  const entered=dispatch(start(),{type:'enterActivity',id:'test.expedition'},cat);

  const badVersion=JSON.parse(JSON.stringify(entered));
  badVersion.run.flow.activity.definitionVersion=99;
  assert.throws(()=>parseSave(JSON.stringify(badVersion),cat),/версия Activity/);

  const terminal=JSON.parse(JSON.stringify(entered));
  terminal.run.flow.activity.internalState.progress=2;
  assert.throws(()=>parseSave(JSON.stringify(terminal),cat),/success/);
});

test('Activity entry advances global RNG once; internal steps do not continue global stream',()=>{
  const cat=catalog(),source=start();
  const before=source.run.rng;
  const entered=dispatch(source,{type:'enterActivity',id:'test.expedition'},cat);
  assert.notEqual(entered.run.rng,before);
  const seededGlobal=entered.run.rng;
  const afterStep=dispatch(entered,{type:'activityAction',id:'advance'},cat);
  assert.equal(afterStep.run.rng,seededGlobal);
});
