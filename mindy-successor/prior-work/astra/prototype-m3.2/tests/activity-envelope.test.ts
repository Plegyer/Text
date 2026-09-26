import test from 'node:test';import assert from 'node:assert/strict';
import {loadCatalog} from '../src/core/content.ts';
import {dispatch,freshSave,parseSave} from '../src/core/engine.ts';
import type {Catalog,Effect,Save} from '../src/core/schema.ts';

function action(id:string,energy=0){
  return {id,label:id,description:`Synthetic ${id}`,cost:{money:0,energy},conditions:[],effects:[],mode:'normal'};
}
function definitions(opts:{startEndurance?:number;objectiveSteps?:number;successEffects?:Effect[];successOutcome?:string;timePolicy?:string}={}){
  const successEffects=opts.successEffects??[
    {kind:'addQuestFact',quest:'test.quest',fact:'activity.success'},
    {kind:'addWorldFact',fact:'activity.success'}
  ];
  return {
    version:'0.1.0',
    flags:['story.arrived'],
    actions:[action('work',1),action('rest',0)],
    endings:[],
    careers:[],
    quests:[{
      id:'test.quest',label:'Test Quest',initialStage:'open',stages:['open'],
      transitions:[]
    }],
    relationships:[],
    lodgings:[],
    nightChoices:[],
    activities:[{
      id:'forest.test',label:'Synthetic Forest',
      definitionVersion:1,adapter:'counter.v1',adapterVersion:1,
      entryConditions:[],entryEnergyCost:2,
      resumePolicy:'resumable',
      timePolicy:opts.timePolicy??'same_day',
      failurePolicy:'return_day',
      config:{
        startEndurance:opts.startEndurance??3,
        objectiveSteps:opts.objectiveSteps??2,
        successOutcome:opts.successOutcome??'success',
        escapeOutcome:'escape',
        failureOutcome:'failure'
      },
      results:[
        {id:'success',label:'Success',effects:successEffects},
        {id:'escape',label:'Escape',effects:[{kind:'addWorldFact',fact:'activity.escaped'}]},
        {id:'failure',label:'Failure',effects:[{kind:'addNextDayModifier',energyDelta:-1,statEffects:[],tag:'activity.failure'}]}
      ]
    }]
  };
}
function event(overrides:any={}){
  return {
    id:'activity.followup',title:'Activity follow-up',
    trigger:[],
    reactionTriggers:[{kind:'activityCompleted',activity:'forest.test',outcome:'success'}],
    priorityClass:'critical_progression',priority:20,blocking:true,delivery:{policy:'live'},
    cooldownDays:0,variantCooldownDays:0,maxShows:10,
    conditions:[{kind:'questFact',quest:'test.quest',fact:'activity.success',present:true}],
    variants:[{id:'default',text:'Synthetic Activity follow-up fallback text.',conditions:[],media:[]}],
    choices:[{id:'continue',label:'Continue',text:'Synthetic Activity follow-up resolved.',conditions:[],effects:[]}],
    ...overrides
  };
}
function pack(events:any[]=[event()]){
  return {
    schemaVersion:1,id:'activity',reads:[],writes:[],
    capabilities:{
      reads:{activities:['forest.test'],quests:['test.quest']},
      writes:{}
    },
    media:[],
    events
  };
}
function catalog(opts:Parameters<typeof definitions>[0]={},events:any[]=[event()]):Catalog{
  return loadCatalog(definitions(opts),[pack(events)]);
}
function start():Save{
  const s=freshSave();
  s.run.creation={remaining:0,allocated:{},complete:true};
  s.run.flags['story.arrived']=true;
  return s;
}

test('Activity entry costs exactly two daily Energy and internal steps only spend internal Endurance',()=>{
  const cat=catalog();let s=start();
  assert.equal(s.run.dayState.energyCurrent,3);
  s=dispatch(s,{type:'enterActivity',id:'forest.test'},cat);
  assert.equal(s.run.dayState.energyCurrent,1);
  assert.equal(s.run.flow.activity?.activityId,'forest.test');
  assert.equal(s.run.flow.activity?.internalState.endurance,3);
  assert.equal(s.run.flow.activity?.entryEnergyCommitted,true);

  s=dispatch(s,{type:'activityAction',id:'advance'},cat);
  assert.equal(s.run.dayState.energyCurrent,1);
  assert.equal(s.run.flow.activity?.internalState.endurance,2);
  assert.equal(s.run.flow.activity?.internalState.progress,1);
  assert.equal(s.run.flow.activity?.checkpoint,'step.1');
});

test('Activity save/reload preserves internal state and resumes deterministically',()=>{
  const cat=catalog();let s=start();
  s=dispatch(s,{type:'enterActivity',id:'forest.test'},cat);
  s=dispatch(s,{type:'activityAction',id:'advance'},cat);
  const text=JSON.stringify(s);
  const a=parseSave(text,cat),b=parseSave(text,cat);
  assert.deepEqual(a.run.flow.activity,b.run.flow.activity);
  assert.equal(a.run.dayState.energyCurrent,1);

  const aa=dispatch(a,{type:'activityAction',id:'advance'},cat);
  const bb=dispatch(b,{type:'activityAction',id:'advance'},cat);
  assert.deepEqual(aa,bb);
  assert.equal(aa.run.flow.activity,null);
  assert.equal(aa.run.dayState.energyCurrent,1);
});

test('success result adds QuestFact and immediately launches outside resolver event',()=>{
  const cat=catalog();let s=start();
  s=dispatch(s,{type:'enterActivity',id:'forest.test'},cat);
  s=dispatch(s,{type:'activityAction',id:'advance'},cat);
  s=dispatch(s,{type:'activityAction',id:'advance'},cat);
  assert.equal(s.run.flow.activity,null);
  assert.ok(s.run.progression.quests['test.quest'].facts.includes('activity.success'));
  assert.ok(s.run.progression.worldFacts.includes('activity.success'));
  assert.equal(s.run.pending?.eventId,'activity.followup');
  assert.equal(s.run.day,0);
  assert.equal(s.run.dayState.energyCurrent,1);

  s=dispatch(s,{type:'choice',id:'continue'},cat);
  assert.equal(s.run.pending,null);
  assert.equal(s.run.flow.activity,null);
});

test('escape result is distinct from success and does not fake objective completion',()=>{
  const cat=catalog();let s=start();
  s=dispatch(s,{type:'enterActivity',id:'forest.test'},cat);
  s=dispatch(s,{type:'activityAction',id:'advance'},cat);
  s=dispatch(s,{type:'activityAction',id:'escape'},cat);
  assert.equal(s.run.flow.activity,null);
  assert.ok(s.run.progression.worldFacts.includes('activity.escaped'));
  assert.ok(!s.run.progression.worldFacts.includes('activity.success'));
  assert.equal(s.run.progression.quests['test.quest'],undefined);
  assert.equal(s.run.pending,null);
  assert.equal(s.run.dayState.energyCurrent,1);
});

test('exhaustion before objective returns failure result without touching daily Energy again',()=>{
  const cat=catalog({startEndurance:1,objectiveSteps:2},[]);let s=start();
  s=dispatch(s,{type:'enterActivity',id:'forest.test'},cat);
  assert.equal(s.run.dayState.energyCurrent,1);
  s=dispatch(s,{type:'activityAction',id:'advance'},cat);
  assert.equal(s.run.flow.activity,null);
  assert.equal(s.run.dayState.energyCurrent,1);
  assert.equal(s.run.dayState.nextDayModifiers.energyDelta,-1);
  assert.ok(s.run.dayState.nextDayModifiers.tags.includes('activity.failure'));
});

test('city work Night and second Activity entry are blocked while Activity is active',()=>{
  const cat=catalog();let s=start();
  s=dispatch(s,{type:'enterActivity',id:'forest.test'},cat);
  assert.throws(()=>dispatch(s,{type:'action',id:'work'},cat),/завершите Activity/);
  assert.throws(()=>dispatch(s,{type:'endDay'},cat),/внутри Activity/);
  assert.throws(()=>dispatch(s,{type:'enterActivity',id:'forest.test'},cat),/уже активна/);
  assert.equal(s.run.dayState.energyCurrent,1);
});

test('catalog rejects unknown Activity result and unsupported counter adapter time policy',()=>{
  assert.throws(()=>catalog({successOutcome:'ghost'}),/Activity result/);
  assert.throws(()=>catalog({timePolicy:'advances_calendar_on_exit'}),/same_day/);
});

test('save load rejects Activity version and internal-state corruption',()=>{
  const cat=catalog();let s=start();
  s=dispatch(s,{type:'enterActivity',id:'forest.test'},cat);
  s=dispatch(s,{type:'activityAction',id:'advance'},cat);
  assert.doesNotThrow(()=>parseSave(JSON.stringify(s),cat));

  const badVersion=JSON.parse(JSON.stringify(s));
  badVersion.run.flow.activity.definitionVersion=99;
  assert.throws(()=>parseSave(JSON.stringify(badVersion),cat),/definitionVersion/);

  const badState=JSON.parse(JSON.stringify(s));
  badState.run.flow.activity.internalState.endurance=999;
  assert.throws(()=>parseSave(JSON.stringify(badState),cat),/internalState/);

  const badCheckpoint=JSON.parse(JSON.stringify(s));
  badCheckpoint.run.flow.activity.checkpoint='step.9';
  assert.throws(()=>parseSave(JSON.stringify(badCheckpoint),cat),/checkpoint/);
});

test('Activity result effect failure is atomic to caller state',()=>{
  const cat=catalog({
    successEffects:[{kind:'removeItem',id:'tonic',count:1}]
  },[]);
  let s=start();
  s=dispatch(s,{type:'enterActivity',id:'forest.test'},cat);
  s=dispatch(s,{type:'activityAction',id:'advance'},cat);
  const before=JSON.stringify(s);
  assert.throws(()=>dispatch(s,{type:'activityAction',id:'advance'},cat),/Не хватает предметов/);
  assert.equal(JSON.stringify(s),before);
  assert.equal(s.run.flow.activity?.internalState.progress,1);
  assert.equal(s.run.dayState.energyCurrent,1);
});

test('ActivityStarted trigger can pause with a normal pending scene and resume same envelope',()=>{
  const startedEvent=event({
    id:'activity.started',
    reactionTriggers:[{kind:'activityStarted',activity:'forest.test'}],
    conditions:[]
  });
  const cat=catalog({},[startedEvent]);let s=start();
  s=dispatch(s,{type:'enterActivity',id:'forest.test'},cat);
  assert.equal(s.run.pending?.eventId,'activity.started');
  assert.equal(s.run.flow.activity?.internalState.progress,0);
  assert.throws(()=>dispatch(s,{type:'activityAction',id:'advance'},cat),/завершите текущую сцену/i);

  s=dispatch(s,{type:'choice',id:'continue'},cat);
  assert.equal(s.run.pending,null);
  assert.equal(s.run.flow.activity?.activityId,'forest.test');
  s=dispatch(s,{type:'activityAction',id:'advance'},cat);
  assert.equal(s.run.flow.activity?.internalState.progress,1);
});

test('Activity reaction trigger requires declared Activity capability',()=>{
  const defs=definitions();
  const p=pack([event()]);
  p.capabilities.reads.activities=[];
  assert.throws(()=>loadCatalog(defs,[p]),/reaction activity/);
});
