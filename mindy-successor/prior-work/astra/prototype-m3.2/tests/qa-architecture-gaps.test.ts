import test from 'node:test';
import assert from 'node:assert/strict';
import {loadCatalog} from '../src/core/content.ts';
import {freshSave,resolveReactions} from '../src/core/engine.ts';
import {effectSchema,type Catalog,type ReactionFact,type Save} from '../src/core/schema.ts';

function action(id:string){
  return {id,label:id,description:`Synthetic QA action ${id}.`,cost:{money:0,energy:1},conditions:[],effects:[],mode:'normal'};
}
function definitions(){
  return {version:'0.1.0',flags:['story.arrived'],actions:[action('probe')],endings:[]};
}
function choice(){
  return {id:'continue',label:'Continue',text:'Synthetic QA choice resolves without side effects.',conditions:[],effects:[]};
}
function event(id:string,priorityClass:string,priority=10,overrides:any={}){
  return {
    id:`qa.${id}`,
    title:`QA ${id}`,
    trigger:[],
    reactionTriggers:[{kind:'actionCompleted',action:'probe'}],
    priorityClass,
    priority,
    blocking:true,
    delivery:{policy:'live'},
    cooldownDays:0,
    variantCooldownDays:0,
    maxShows:100,
    conditions:[],
    variants:[{id:'default',text:`Synthetic QA event ${id} fallback variant.`,conditions:[],media:[]}],
    choices:[choice()],
    ...overrides
  };
}
function pack(events:any[]){
  return {schemaVersion:1,id:'qa',reads:[],writes:[],capabilities:{reads:{},writes:{}},media:[],events};
}
function catalog(events:any[]):Catalog{return loadCatalog(definitions(),[pack(events)]);}
function start():Save{
  const s=freshSave();
  s.run.creation={remaining:0,allocated:{},activeHardWorkPackages:[],hardWorkPackagesApplied:true,complete:true};
  s.run.flags['story.arrived']=true;
  return s;
}
const probeFact:ReactionFact={kind:'actionCompleted',action:'probe'};

test('full terminal/forced/critical/optional priority matrix is ordered by class before numeric priority',()=>{
  const cat=catalog([
    event('optional','optional_world',999999),
    event('critical','critical_progression',9999),
    event('forced','forced',99),
    event('terminal','terminal',0)
  ]);
  const out=resolveReactions(start(),[probeFact],cat);
  assert.equal(out.state.run.pending?.eventId,'qa.terminal');
  assert.ok(out.trace.steps.includes('candidates:qa.terminal,qa.forced,qa.critical,qa.optional'));
});

test('numeric priority orders candidates inside the same class before stable ID',()=>{
  const cat=catalog([
    event('a-low','critical_progression',1),
    event('z-high','critical_progression',50)
  ]);
  const out=resolveReactions(start(),[probeFact],cat);
  assert.equal(out.state.run.pending?.eventId,'qa.z-high');
  assert.ok(out.trace.steps.includes('candidates:qa.z-high,qa.a-low'));
});

test('least-recently-shown tie-break beats lexical event ID when class priority and eligibility are equal',()=>{
  const cat=catalog([
    event('a-recent','normal_progression',10),
    event('z-old','normal_progression',10)
  ]);
  const s=start();
  s.run.calendar.elapsedDays=6;
  s.run.historyState.eventHistory['qa.a-recent']={count:1,lastDay:5,variants:{default:5}};
  s.run.historyState.eventHistory['qa.z-old']={count:1,lastDay:2,variants:{default:2}};
  const out=resolveReactions(s,[probeFact],cat);
  assert.equal(out.state.run.pending?.eventId,'qa.z-old');
  assert.ok(out.trace.steps.includes('candidates:qa.z-old,qa.a-recent'));
});

test('arbitrary save-path effect shape is rejected by the strict Effect v2 schema',()=>{
  const forged={kind:'setPath',path:'run.resources.money',value:999999};
  assert.equal(effectSchema.safeParse(forged).success,false);
});

test('unknown Activity result in a reaction trigger is rejected at catalog load',()=>{
  const d:any={
    ...definitions(),
    activities:[{
      id:'qa.activity',label:'QA activity',version:1,
      entryConditions:[],entryEnergyCost:2,resumePolicy:'allowed',timePolicy:'same_day',failurePolicy:'exit_to_day',
      adapter:'counter.v1',
      adapterConfig:{initialEndurance:3,advanceEnduranceCost:1,successAtProgress:2,failAtEndurance:0},
      results:[
        {id:'qa.activity.success',outcome:'success',effects:[]},
        {id:'qa.activity.escape',outcome:'escape',effects:[]},
        {id:'qa.activity.failure',outcome:'failure',effects:[]}
      ]
    }]
  };
  const p:any={
    schemaVersion:1,id:'qa-trigger',reads:[],writes:[],
    capabilities:{reads:{activities:['qa.activity']},writes:{}},
    media:[],
    events:[{
      id:'qa-trigger.return',title:'QA return',trigger:[],
      reactionTriggers:[{kind:'activityResult',activity:'qa.activity',outcome:'success',result:'qa.activity.missing'}],
      priorityClass:'critical_progression',priority:1,blocking:true,delivery:{policy:'live'},
      cooldownDays:0,variantCooldownDays:0,maxShows:1,conditions:[],
      variants:[{id:'default',text:'Synthetic missing-result trigger event.',conditions:[],media:[]}],
      choices:[choice()]
    }]
  };
  assert.throws(()=>loadCatalog(d,[p]),/Activity result/);
});
