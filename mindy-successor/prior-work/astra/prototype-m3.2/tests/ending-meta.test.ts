import test from 'node:test';
import assert from 'node:assert/strict';
import {loadCatalog} from '../src/core/content.ts';
import {dispatch,freshSave,palaceRunQualified,parseSave} from '../src/core/engine.ts';
import {ordinaryHardWorkCareers,type Catalog,type Save} from '../src/core/schema.ts';

function ending(id:string,metaRewards?:any[],reward='legacy.placeholder'){
  return {
    id,
    title:id,
    description:`Synthetic ending ${id}.`,
    conditions:[],
    reward,
    metaRewards,
    epilogue:`Synthetic epilogue for ${id}.`
  };
}

function definitions(){
  const hardWork=ordinaryHardWorkCareers.map(c=>ending(
    `hardwork.${c}`,
    [{kind:'hardWork',rewardId:`hardWork:${c}`,career:c}]
  ));
  return {
    version:'0.1.0',
    flags:['story.arrived'],
    actions:[],
    endings:[
      ending('test.unlock',[{kind:'unlock',rewardId:'reward.test.unlock',unlock:'advanced.school'}]),
      ending('legacy.test',undefined,'legacy.unlock'),
      ...hardWork
    ]
  };
}

function catalog(packs:any[]=[]):Catalog{return loadCatalog(definitions(),packs);}

function ready(input:Save,cat:Catalog){
  let s=input;
  s.run.creation.remaining=0;
  s=dispatch(s,{type:'finishCreation'},cat);
  s.run.flags['story.arrived']=true;
  return s;
}

function freshReady(cat:Catalog){return ready(freshSave(),cat);}

test('eligible ending does not end run and player may continue before commit',()=>{
  const cat=catalog();
  let s=freshReady(cat);
  assert.equal(s.run.status,'active');
  assert.ok(s.run.endings.eligible.includes('test.unlock'));
  assert.equal(s.run.endings.committed,null);
  assert.equal(s.run.endings.result,null);
  assert.equal(s.meta.completedEndings.length,0);
  assert.equal(s.meta.unlocks.includes('advanced.school'),false);
  // Eligibility itself does not consume or terminate the life.
  assert.equal(s.run.day,0);
  assert.equal(s.run.dayState.energyCurrent,3);
});

test('commitEnding changes flow state but does not grant Meta reward',()=>{
  const cat=catalog();
  let s=freshReady(cat);
  s=dispatch(s,{type:'commitEnding',id:'test.unlock'},cat);
  assert.equal(s.run.status,'ending_committed');
  assert.equal(s.run.endings.committed,'test.unlock');
  assert.equal(s.run.endings.result,null);
  assert.equal(s.meta.completedEndings.includes('test.unlock'),false);
  assert.equal(s.meta.unlocks.includes('advanced.school'),false);
  assert.equal(s.meta.runsCompleted,0);
  assert.throws(()=>dispatch(s,{type:'newLife'},cat),/завершите выбранную судьбу/i);
});

test('normal progression event is suppressed after ending commitment',()=>{
  const pack={
    schemaVersion:1,id:'ending',reads:[],writes:[],media:[],
    events:[{
      id:'ending.normal',
      title:'Should be suppressed',
      trigger:[],
      reactionTriggers:[{kind:'endingCommitted',ending:'test.unlock'}],
      priorityClass:'normal_progression',
      priority:999,
      blocking:true,
      delivery:{policy:'live'},
      cooldownDays:0,variantCooldownDays:0,maxShows:10,
      conditions:[],
      variants:[{id:'default',text:'This normal progression scene must not interrupt commitment.',conditions:[],media:[]}],
      choices:[{id:'continue',label:'Continue',text:'Continue normally.',conditions:[],effects:[]}]
    }]
  };
  const cat=catalog([pack]);
  const s=dispatch(freshReady(cat),{type:'commitEnding',id:'test.unlock'},cat);
  assert.equal(s.run.pending,null);
  assert.equal(s.run.history['ending.normal'],undefined);
});

test('ending_committed class may run before central completion',()=>{
  const pack={
    schemaVersion:1,id:'ending',reads:[],writes:[],media:[],
    events:[{
      id:'ending.final',
      title:'Final scene',
      trigger:[],
      reactionTriggers:[{kind:'endingCommitted',ending:'test.unlock'}],
      priorityClass:'ending_committed',
      priority:1,
      blocking:true,
      delivery:{policy:'live'},
      cooldownDays:0,variantCooldownDays:0,maxShows:1,
      conditions:[],
      variants:[{id:'default',text:'A final committed-ending scene is allowed before completion.',conditions:[],media:[]}],
      choices:[{id:'finish',label:'Finish',text:'Finish the final scene.',conditions:[],effects:[]}]
    }]
  };
  const cat=catalog([pack]);
  let s=dispatch(freshReady(cat),{type:'commitEnding',id:'test.unlock'},cat);
  assert.equal(s.run.pending?.eventId,'ending.final');
  assert.throws(()=>dispatch(s,{type:'completeEnding'},cat),/финальную сцену/i);
  s=dispatch(s,{type:'choice',id:'finish'},cat);
  assert.equal(s.run.pending,null);
  s=dispatch(s,{type:'completeEnding'},cat);
  assert.equal(s.run.status,'ended');
});

test('completeEnding creates one RunResult and applies reward exactly once',()=>{
  const cat=catalog();
  let s=dispatch(freshReady(cat),{type:'commitEnding',id:'test.unlock'},cat);
  s=dispatch(s,{type:'completeEnding'},cat);
  assert.equal(s.run.status,'ended');
  assert.equal(s.run.endings.result?.endingId,'test.unlock');
  assert.equal(s.run.endings.result?.firstCompletion,true);
  assert.deepEqual(s.run.endings.result?.appliedMetaRewardIds,['reward.test.unlock']);
  assert.ok(s.meta.unlocks.includes('advanced.school'));
  assert.ok(s.meta.completedEndings.includes('test.unlock'));
  assert.equal(s.meta.runsCompleted,1);
  assert.equal(s.meta.appliedResultTransactions.length,1);

  const snapshot=JSON.stringify(s);
  const again=dispatch(s,{type:'completeEnding'},cat);
  assert.equal(JSON.stringify(again),snapshot);
});

test('reload before completion applies reward once; reload after completion cannot duplicate it',()=>{
  const cat=catalog();
  let committed=dispatch(freshReady(cat),{type:'commitEnding',id:'test.unlock'},cat);
  committed=parseSave(JSON.stringify(committed),cat);
  assert.equal(committed.run.status,'ending_committed');
  assert.equal(committed.meta.unlocks.includes('advanced.school'),false);

  let completed=dispatch(committed,{type:'completeEnding'},cat);
  assert.equal(completed.meta.runsCompleted,1);
  const tx=completed.run.endings.result!.transactionId;
  assert.deepEqual(completed.meta.appliedResultTransactions,[tx]);

  completed=parseSave(JSON.stringify(completed),cat);
  const after=dispatch(completed,{type:'completeEnding'},cat);
  assert.equal(after.meta.runsCompleted,1);
  assert.deepEqual(after.meta.appliedResultTransactions,[tx]);
  assert.equal(after.meta.unlocks.filter(x=>x==='advanced.school').length,1);
});

test('same ending in later run does not duplicate the earned package and its +5 stays selectable',()=>{
  const cat=catalog();
  let s=freshReady(cat);
  s=dispatch(s,{type:'commitEnding',id:'hardwork.lumber'},cat);
  s=dispatch(s,{type:'completeEnding'},cat);
  assert.deepEqual(s.meta.hardWorkProgress,['lumber']);
  assert.deepEqual(s.run.endings.result?.appliedMetaRewardIds,['hardWork:lumber']);
  s=parseSave(JSON.stringify(s),cat);
  assert.deepEqual(s.run.endings.result?.appliedMetaRewardIds,['hardWork:lumber']);

  s=dispatch(s,{type:'newLife'},cat);
  assert.equal(s.run.character.stats.strength,1);
  assert.equal(s.run.character.stats.endurance,1);
  assert.equal(s.run.creation.remaining,10);
  s=dispatch(s,{type:'setHardWorkPackageActive',career:'lumber',active:true},cat);
  s=ready(s,cat);
  assert.equal(s.run.character.stats.strength,6);
  assert.equal(s.run.character.stats.endurance,1);

  s=dispatch(s,{type:'commitEnding',id:'hardwork.lumber'},cat);
  s=dispatch(s,{type:'completeEnding'},cat);
  assert.deepEqual(s.meta.hardWorkProgress,['lumber']);
  assert.equal(s.run.endings.result?.firstCompletion,false);
  assert.deepEqual(s.run.endings.result?.appliedMetaRewardIds,[]);
  assert.equal(s.meta.runsCompleted,2);

  s=dispatch(s,{type:'newLife'},cat);
  assert.equal(s.run.character.stats.strength,1);
  assert.equal(s.run.character.stats.endurance,1);
  assert.deepEqual(s.run.creation.activeHardWorkPackages,[]);
});

test('Merchant Hard Work no longer adds automatic starting money',()=>{
  const cat=catalog();
  let s=freshReady(cat);
  s=dispatch(s,{type:'commitEnding',id:'hardwork.merchant'},cat);
  s=dispatch(s,{type:'completeEnding'},cat);
  s=dispatch(s,{type:'newLife'},cat);
  assert.equal(s.run.resources.money,600);

  s=dispatch(s,{type:'setHardWorkPackageActive',career:'merchant',active:true},cat);
  s=ready(s,cat);
  assert.equal(s.run.resources.money,600);
  assert.equal(s.run.character.stats.wits,6);
  assert.equal(s.run.character.stats.reason,6);
});

test('all ten unique Hard Work completions require all ten active packages for Palace qualification',()=>{
  const cat=catalog();
  let s=freshReady(cat);
  for(let i=0;i<ordinaryHardWorkCareers.length;i++){
    const career=ordinaryHardWorkCareers[i];
    s=dispatch(s,{type:'commitEnding',id:`hardwork.${career}`},cat);
    s=dispatch(s,{type:'completeEnding'},cat);
    if(i<ordinaryHardWorkCareers.length-1)s=ready(dispatch(s,{type:'newLife'},cat),cat);
  }
  assert.equal(new Set(s.meta.hardWorkProgress).size,10);
  assert.equal(s.meta.unlocks.includes('palace'),false);
  assert.equal(s.meta.runsCompleted,10);

  s=dispatch(s,{type:'newLife'},cat);
  assert.equal(palaceRunQualified(s),false);
  for(const career of ordinaryHardWorkCareers)s=dispatch(s,{type:'setHardWorkPackageActive',career,active:true},cat);
  assert.equal(palaceRunQualified(s),true);
});

test('omitted metaRewards preserves legacy accept compatibility with RunResult proof',()=>{
  const cat=catalog();
  let s=freshReady(cat);
  s=dispatch(s,{type:'accept',id:'legacy.test'},cat);
  assert.equal(s.run.status,'ended');
  assert.equal(s.run.endings.committed,'legacy.test');
  assert.ok(s.run.endings.result);
  assert.ok(s.meta.unlocks.includes('legacy.unlock'));
  assert.ok(s.meta.completedEndings.includes('legacy.test'));
  assert.equal(s.meta.appliedResultTransactions.length,1);
  assert.throws(()=>dispatch(s,{type:'accept',id:'legacy.test'},cat),/завершена/);
});

test('newLife preserves Meta ledger and strong perk selection while resetting Run domains',()=>{
  const cat=catalog();
  let s=freshReady(cat);
  s.meta.activeLegacyPerks=['perk.energy'];
  s=dispatch(s,{type:'commitEnding',id:'test.unlock'},cat);
  s=dispatch(s,{type:'completeEnding'},cat);
  const tx=s.run.endings.result!.transactionId;
  s=dispatch(s,{type:'newLife'},cat);
  assert.ok(s.meta.appliedResultTransactions.includes(tx));
  assert.ok(s.meta.completedEndings.includes('test.unlock'));
  assert.deepEqual(s.meta.activeLegacyPerks,['perk.energy']);
  assert.equal(s.run.status,'active');
  assert.equal(s.run.endings.committed,null);
  assert.equal(s.run.endings.result,null);
  assert.equal(s.run.calendar.elapsedDays,0);
  assert.equal(s.run.flow.activity,null);
  assert.equal(s.run.flow.night,null);
});

test('protected Meta merge unions transaction proof',()=>{
  const cat=catalog();
  let completed=freshReady(cat);
  completed=dispatch(completed,{type:'commitEnding',id:'test.unlock'},cat);
  completed=dispatch(completed,{type:'completeEnding'},cat);
  const ownTx=completed.run.endings.result!.transactionId;

  const current=freshSave();
  current.meta.appliedResultTransactions=['tx.external'];
  current.meta.completedEndings=['legacy.test'];
  current.meta.unlocks=['external.unlock'];

  const merged=parseSave(JSON.stringify(completed),cat,current.meta);
  assert.ok(merged.meta.appliedResultTransactions.includes(ownTx));
  assert.ok(merged.meta.appliedResultTransactions.includes('tx.external'));
  assert.ok(merged.meta.completedEndings.includes('legacy.test'));
  assert.ok(merged.meta.unlocks.includes('external.unlock'));
});

test('pre-A6 ended schema4 save migrates to v6 with compatibility RunResult and no reward duplication',()=>{
  const cat=catalog();
  let s=freshReady(cat);
  s=dispatch(s,{type:'accept',id:'legacy.test'},cat);
  const raw=JSON.parse(JSON.stringify(s));
  raw.schemaVersion=4;
  delete raw.run.character.progressionStatCap;
  delete raw.run.character.creation.activeHardWorkPackages;
  delete raw.run.character.creation.hardWorkPackagesApplied;
  raw.run.endings.result=null;
  delete raw.meta.appliedResultTransactions;
  const beforeUnlocks=[...raw.meta.unlocks];

  const restored=parseSave(JSON.stringify(raw),cat);
  assert.equal(restored.schemaVersion,6);
  assert.equal(restored.run.status,'ended');
  assert.ok(restored.run.endings.result);
  assert.equal(restored.run.endings.result?.firstCompletion,false);
  assert.equal(restored.meta.appliedResultTransactions.length,1);
  assert.deepEqual(restored.meta.unlocks,beforeUnlocks);
  assert.equal(restored.run.character.progressionStatCap,100);
  assert.deepEqual(restored.run.creation.activeHardWorkPackages,[]);
  assert.equal(restored.run.creation.hardWorkPackagesApplied,true);
  assert.equal(restored.meta.runsCompleted,1);
});

test('duplicate target Meta reward IDs are rejected at catalog load',()=>{
  const d=definitions() as any;
  d.endings[0].metaRewards=[
    {kind:'unlock',rewardId:'reward.same',unlock:'one.unlock'},
    {kind:'unlock',rewardId:'reward.same',unlock:'two.unlock'}
  ];
  assert.throws(()=>loadCatalog(d,[]),/Повтор ID/);
});
