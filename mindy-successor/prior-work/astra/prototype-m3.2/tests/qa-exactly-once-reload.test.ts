import test from 'node:test';
import assert from 'node:assert/strict';
import {loadCatalog} from '../src/core/content.ts';
import {dispatch,freshSave,parseSave} from '../src/core/engine.ts';
import type {Catalog,Save} from '../src/core/schema.ts';

function definitions(){
  return {
    version:'0.1.0',
    flags:['story.arrived'],
    actions:[{
      id:'paid.work',
      label:'Paid QA work',
      description:'Synthetic paid work used only to prove save/reload transaction deltas.',
      cost:{money:7,energy:1},
      conditions:[],
      effects:[],
      mode:'normal',
      wage:{base:20,weights:[]}
    }],
    endings:[{
      id:'qa.ending',
      title:'QA ending',
      description:'Synthetic ending for reload boundary verification.',
      conditions:[],
      reward:'legacy.qa',
      metaRewards:[{kind:'unlock',rewardId:'qa.reward',unlock:'qa.unlock'}],
      epilogue:'Synthetic QA ending epilogue.'
    }],
    activities:[{
      id:'qa.activity',
      label:'QA activity',
      version:1,
      entryConditions:[],
      entryEnergyCost:2,
      resumePolicy:'allowed',
      timePolicy:'same_day',
      failurePolicy:'exit_to_day',
      adapter:'counter.v1',
      adapterConfig:{initialEndurance:3,advanceEnduranceCost:1,successAtProgress:1,failAtEndurance:0},
      results:[
        {id:'qa.activity.success',outcome:'success',effects:[{kind:'modifyResource',resource:'money',delta:50},{kind:'addWorldFact',fact:'qa.activity.won'}]},
        {id:'qa.activity.escape',outcome:'escape',effects:[{kind:'addWorldFact',fact:'qa.activity.escaped'}]},
        {id:'qa.activity.failure',outcome:'failure',effects:[{kind:'addWorldFact',fact:'qa.activity.failed'}]}
      ]
    }]
  };
}
function catalog():Catalog{
  return loadCatalog(definitions(),[{
    schemaVersion:1,id:'qa-media',reads:[],writes:[],media:[
      {id:'stage.town',kind:'image',src:'assets/town.svg',alt:'Synthetic QA town'}
    ],events:[]
  }]);
}
function ready(cat:Catalog):Save{
  let s=freshSave();
  s.run.creation.remaining=0;
  s=dispatch(s,{type:'finishCreation'},cat);
  s.run.flags['story.arrived']=true;
  return s;
}

test('paid Work cost wage energy and counter are not replayed by save/reload',()=>{
  const cat=catalog();
  let s=ready(cat);
  const beforeMoney=s.run.resources.money;
  s=dispatch(s,{type:'action',id:'paid.work'},cat);
  assert.equal(s.run.resources.money,beforeMoney-7+20);
  assert.equal(s.run.dayState.energyCurrent,2);
  assert.equal(s.run.historyState.actionCounts['paid.work'],1);

  const once=JSON.stringify(s);
  s=parseSave(once,cat);
  assert.equal(s.run.resources.money,beforeMoney-7+20);
  assert.equal(s.run.dayState.energyCurrent,2);
  assert.equal(s.run.historyState.actionCounts['paid.work'],1);
  assert.equal(JSON.stringify(s),once);

  s=dispatch(s,{type:'action',id:'paid.work'},cat);
  assert.equal(s.run.resources.money,beforeMoney-14+40);
  assert.equal(s.run.dayState.energyCurrent,1);
  assert.equal(s.run.historyState.actionCounts['paid.work'],2);
});

test('Activity success remains exactly once across post-result reload checkpoints',()=>{
  const cat=catalog();
  let s=ready(cat);
  const beforeMoney=s.run.resources.money;
  s=dispatch(s,{type:'enterActivity',id:'qa.activity'},cat);
  assert.equal(s.run.dayState.energyCurrent,1);
  const enteredEnergy=s.run.dayState.energyCurrent;

  s=parseSave(JSON.stringify(s),cat);
  s=dispatch(s,{type:'activityAction',id:'advance'},cat);
  assert.equal(s.run.flow.activity,null);
  assert.equal(s.run.dayState.energyCurrent,enteredEnergy);
  assert.equal(s.run.resources.money,beforeMoney+50);
  assert.equal(s.run.progression.worldFacts.filter(x=>x==='qa.activity.won').length,1);

  const completed=JSON.stringify(s);
  s=parseSave(completed,cat);
  assert.equal(JSON.stringify(s),completed);
  assert.equal(s.run.resources.money,beforeMoney+50);
  assert.equal(s.run.progression.worldFacts.filter(x=>x==='qa.activity.won').length,1);
  assert.throws(()=>dispatch(s,{type:'activityAction',id:'advance'},cat),/Нет активной Activity/);

  const secondReload=parseSave(JSON.stringify(s),cat);
  assert.equal(secondReload.run.resources.money,beforeMoney+50);
  assert.equal(secondReload.run.progression.worldFacts.filter(x=>x==='qa.activity.won').length,1);
});

test('ending commit completion reward and newLife remain idempotent across every reload boundary',()=>{
  const cat=catalog();
  let s=ready(cat);
  s=dispatch(s,{type:'commitEnding',id:'qa.ending'},cat);
  assert.equal(s.run.status,'ending_committed');
  assert.equal(s.meta.unlocks.includes('qa.unlock'),false);

  s=parseSave(JSON.stringify(s),cat);
  assert.equal(s.run.status,'ending_committed');
  s=dispatch(s,{type:'completeEnding'},cat);
  const tx=s.run.endings.result!.transactionId;
  assert.equal(s.meta.runsCompleted,1);
  assert.equal(s.meta.unlocks.filter(x=>x==='qa.unlock').length,1);
  assert.deepEqual(s.meta.appliedResultTransactions,[tx]);

  s=parseSave(JSON.stringify(s),cat);
  s=dispatch(s,{type:'completeEnding'},cat);
  assert.equal(s.meta.runsCompleted,1);
  assert.equal(s.meta.unlocks.filter(x=>x==='qa.unlock').length,1);
  assert.deepEqual(s.meta.appliedResultTransactions,[tx]);

  s=parseSave(JSON.stringify(s),cat);
  s=dispatch(s,{type:'newLife'},cat);
  assert.ok(s.meta.appliedResultTransactions.includes(tx));
  assert.ok(s.meta.completedEndings.includes('qa.ending'));
  assert.equal(s.meta.unlocks.filter(x=>x==='qa.unlock').length,1);
  assert.equal(s.run.status,'active');
  assert.equal(s.run.endings.committed,null);
  assert.equal(s.run.endings.result,null);
  assert.equal(s.run.calendar.elapsedDays,0);
  assert.equal(s.run.flow.activity,null);
  assert.equal(s.run.flow.night,null);
});
