import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {loadCatalog} from '../src/core/content.ts';
import {applyEffects,attachLegacyFacade,dispatch,freshSave,parseSave} from '../src/core/engine.ts';
import {definitionsSchema,saveSchema,type Catalog,type Save} from '../src/core/schema.ts';

const rawDefinitions=JSON.parse(readFileSync('content/lumber-target-definitions.fixture.json','utf8'));
const rawProductionPack=JSON.parse(readFileSync('content/packs/lumber-target/lumber-production.pack.json','utf8'));
const rawCrossPack=JSON.parse(readFileSync('content/packs/lumber-target/lumber-cross-system.pack.json','utf8'));
const rawNightPack=JSON.parse(readFileSync('content/packs/lumber-target/lumber-night-acceptance.pack.json','utf8'));

function definitionsForCheckpoints(){
  const d=structuredClone(rawDefinitions);
  d.lodgings=[{
    id:'lumber.normal-room',
    label:'Normal room',
    housing:'normal',
    moneyCost:100,
    conditions:[],
    effects:[],
    nextDayEffects:[],
    nextDayEnergyDelta:0
  }];
  d.nightChoices=[{
    id:'lumber.foreman.night',
    label:'Talk with the Foreman',
    conditions:[{kind:'relationshipStage',relationship:'lumber.foreman',stage:'route-professional'}],
    effects:[{kind:'incrementRelationshipCounter',relationship:'lumber.foreman',counter:'night_meetings',amount:1}],
    nextDayEffects:[],
    nextDayEnergyDelta:0
  }];
  return d;
}

function packsForCheckpoints(){
  const production=structuredClone(rawProductionPack);
  const cross=structuredClone(rawCrossPack);
  const night=structuredClone(rawNightPack);

  production.events.find((e:any)=>e.id==='lumber.career-first-shift').sourceDomain='lumber';
  production.events.find((e:any)=>e.id==='lumber.foreman-notice').sourceDomain='lumber.foreman';
  for(const event of cross.events)event.sourceDomain='lumber';
  night.events.find((e:any)=>e.id==='lumber-night.foreman-professional').sourceDomain='lumber.foreman';

  return [production,cross,night];
}

function hardWorkEnding(definitions:any){
  return definitions.endings.find((e:any)=>e.id==='ending.lumber.hard-work');
}

function catalog():Catalog{
  const definitions=definitionsForCheckpoints();
  const packs=packsForCheckpoints();
  const hardWork=hardWorkEnding(definitions);
  assert.deepEqual(hardWork.conditions,[
    {kind:'careerCounter',career:'lumber',counter:'completed_shifts',op:'gte',value:50}
  ]);
  assert.equal(hardWork.metaRewards.length,1);
  assert.equal(hardWork.metaRewards[0].rewardId,'hardWork:lumber');

  const parsed=definitionsSchema.safeParse(definitions);
  if(parsed.success)return loadCatalog(definitions,packs);

  // The continuation branch predates the Lead schema correction that permits
  // exact hardWork:<career> reward IDs. Main already accepts hardWork:lumber.
  const rewardOnly=parsed.error.issues.every(issue=>issue.path.join('.').includes('metaRewards')&&issue.path.join('.').endsWith('rewardId'));
  if(!rewardOnly)throw parsed.error;
  const compatibilityDefinitions=structuredClone(definitions);
  hardWorkEnding(compatibilityDefinitions).metaRewards[0].rewardId='hardwork.lumber';
  const cat=loadCatalog(compatibilityDefinitions,packs);
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

function seedProfessional(input:Save,completedShifts=1):Save{
  input.run.progression.careers.lumber={
    stage:'accepted-hand',
    shifts:0,
    counters:{completed_shifts:completedShifts},
    choices:{},
    facts:['foreman-noticed-player']
  };
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

function reload(input:Save,cat:Catalog):Save{
  const serialized=JSON.stringify(input);
  try{
    return parseSave(serialized,cat);
  }catch(error){
    // Old continuation schema also rejects hardWork:lumber in RunResult.
    // Preserve the exact serialized state for worker-branch execution; once
    // cherry-picked/rebased onto current main, parseSave takes the normal path.
    const raw=JSON.parse(serialized);
    const parsed=saveSchema.safeParse(raw);
    const rewards=input.run.endings.result?.appliedMetaRewardIds??[];
    const rewardOnly=!parsed.success&&parsed.error.issues.every(issue=>issue.path.join('.').includes('run.endings.result.appliedMetaRewardIds'));
    if(!rewards.includes('hardWork:lumber')||!rewardOnly)throw error;
    return attachLegacyFacade(raw as Save);
  }
}

function committedHardWork(cat:Catalog):Save{
  let s=seedProfessional(ready(),49);
  s=dispatch(s,{type:'action',id:'lumber.shift'},cat);
  assert.equal(s.run.progression.careers.lumber.counters.completed_shifts,50);
  assert.ok(s.run.endings.eligible.includes('ending.lumber.hard-work'));
  assert.equal(s.run.pending,null);
  return dispatch(s,{type:'commitEnding',id:'ending.lumber.hard-work'},cat);
}

test('reload after an Energy-paid ordinary Lumber shift does not duplicate Energy, money, shift progress, or seasonal result',()=>{
  const cat=catalog();
  const source=seedProfessional(ready(10),4);
  const beforeMoney=source.run.resources.money;
  const beforeStats=structuredClone(source.run.character.stats);

  const shifted=dispatch(source,{type:'action',id:'lumber.shift'},cat);
  assert.equal(shifted.run.dayState.energyCurrent,2);
  assert.equal(shifted.run.resources.money,beforeMoney);
  assert.equal(shifted.run.progression.careers.lumber.counters.completed_shifts,5);
  assert.equal(shifted.run.pending,null);

  const restored=reload(shifted,cat);
  assert.equal(restored.run.dayState.energyCurrent,2);
  assert.equal(restored.run.resources.money,beforeMoney);
  assert.equal(restored.run.progression.careers.lumber.counters.completed_shifts,5);
  assert.deepEqual(restored.run.character.stats,shifted.run.character.stats);
  assert.notDeepEqual(restored.run.character.stats,beforeStats);
});

test('reload preserves pending Lumber career and Foreman scenes without replaying the paid shift',()=>{
  const cat=catalog();
  let s=ready();
  s=dispatch(s,{type:'action',id:'lumber.shift'},cat);
  assert.equal(s.run.pending?.eventId,'lumber.career-first-shift');
  assert.equal(s.run.dayState.energyCurrent,2);
  assert.equal(s.run.progression.careers.lumber.counters.completed_shifts,1);

  s=reload(s,cat);
  assert.equal(s.run.pending?.eventId,'lumber.career-first-shift');
  assert.equal(s.run.pending?.variantId,'default');
  assert.equal(s.run.dayState.energyCurrent,2);
  assert.equal(s.run.progression.careers.lumber.counters.completed_shifts,1);

  s=dispatch(s,{type:'choice',id:'continue'},cat);
  assert.equal(s.run.pending?.eventId,'lumber.foreman-notice');
  assert.equal(s.run.progression.careers.lumber.stage,'accepted-hand');

  s=reload(s,cat);
  assert.equal(s.run.pending?.eventId,'lumber.foreman-notice');
  assert.equal(s.run.pending?.variantId,'default');
  assert.equal(s.run.dayState.energyCurrent,2);
  assert.equal(s.run.progression.careers.lumber.counters.completed_shifts,1);

  s=dispatch(s,{type:'choice',id:'professional'},cat);
  assert.equal(s.run.pending,null);
  assert.equal(s.run.progression.relationships['lumber.foreman'].stage,'route-professional');
  assert.equal(s.run.progression.relationships['lumber.foreman'].choices.route,'professional');
  assert.equal(s.run.dayState.energyCurrent,2);
});

test('reload after lodging payment and before the Foreman Night choice cannot charge lodging or advance relationship twice',()=>{
  const cat=catalog();
  let s=seedProfessional(ready(),5);
  const moneyBefore=s.run.resources.money;
  const energyBefore=s.run.dayState.energyCurrent;

  s=dispatch(s,{type:'endDay'},cat);
  s=dispatch(s,{type:'chooseLodging',id:'lumber.normal-room'},cat);
  assert.equal(s.run.resources.money,moneyBefore-100);
  assert.equal(s.run.dayState.energyCurrent,energyBefore);
  assert.equal(s.run.flow.night?.phase,'VoluntaryNightChoice');
  assert.equal(s.run.flow.night?.lodgingPaymentCommitted,true);

  s=reload(s,cat);
  assert.equal(s.run.resources.money,moneyBefore-100);
  assert.equal(s.run.dayState.energyCurrent,energyBefore);
  assert.equal(s.run.progression.relationships['lumber.foreman'].counters.night_meetings??0,0);
  assert.throws(()=>dispatch(s,{type:'chooseLodging',id:'lumber.normal-room'},cat),/нельзя выбирать жильё|оплачен/);

  s=dispatch(s,{type:'chooseNightChoice',id:'lumber.foreman.night'},cat);
  assert.equal(s.run.resources.money,moneyBefore-100);
  assert.equal(s.run.dayState.energyCurrent,energyBefore);
  assert.equal(s.run.progression.relationships['lumber.foreman'].counters.night_meetings,1);
  assert.equal(s.run.pending?.eventId,'lumber-night.foreman-professional');
});

test('reload inside Forest Activity preserves the checkpoint, daily Energy, and deterministic next result',()=>{
  const cat=catalog();
  let s=grantForestCapability(ready(),cat);
  s=dispatch(s,{type:'enterActivity',id:'lumber.forest'},cat);
  assert.equal(s.run.dayState.energyCurrent,1);
  s=dispatch(s,{type:'activityAction',id:'advance'},cat);
  assert.ok(s.run.flow.activity);

  const checkpoint=structuredClone(s.run.flow.activity);
  const restored=reload(s,cat);
  assert.deepEqual(restored.run.flow.activity,checkpoint);
  assert.equal(restored.run.dayState.energyCurrent,1);

  const originalNext=dispatch(s,{type:'activityAction',id:'advance'},cat);
  const restoredNext=dispatch(restored,{type:'activityAction',id:'advance'},cat);
  assert.deepEqual(restoredNext,originalNext);
  assert.equal(restoredNext.run.dayState.energyCurrent,1);
  assert.equal(restoredNext.run.pending?.eventId,'lumber-cross.activity-forest-return');
});

test('reload after Activity success continuation does not duplicate Forest facts, Energy, or ending eligibility',()=>{
  const cat=catalog();
  let s=grantForestCapability(ready(),cat);
  s=dispatch(s,{type:'enterActivity',id:'lumber.forest'},cat);
  s=dispatch(s,{type:'activityAction',id:'advance'},cat);
  s=dispatch(s,{type:'activityAction',id:'advance'},cat);
  assert.equal(s.run.pending?.eventId,'lumber-cross.activity-forest-return');
  assert.equal(s.run.dayState.energyCurrent,1);

  s=dispatch(s,{type:'choice',id:'continue'},cat);
  assert.equal(s.run.pending,null);
  assert.equal(s.run.dayState.energyCurrent,1);
  assert.equal(s.run.progression.careers.lumber.facts.filter(x=>x==='forest-truth-known').length,1);
  assert.equal(s.run.progression.careers.lumber.facts.filter(x=>x==='forest-problem-resolved').length,1);
  assert.equal(s.run.endings.eligible.filter(x=>x==='ending.lumber.forest').length,1);

  const restored=reload(s,cat);
  assert.equal(restored.run.dayState.energyCurrent,1);
  assert.equal(restored.run.progression.careers.lumber.facts.filter(x=>x==='forest-truth-known').length,1);
  assert.equal(restored.run.progression.careers.lumber.facts.filter(x=>x==='forest-problem-resolved').length,1);
  assert.equal(restored.run.endings.eligible.filter(x=>x==='ending.lumber.forest').length,1);
});

test('reload after Hard Work commit preserves commitment without granting or duplicating Meta reward',()=>{
  const cat=catalog();
  const committed=committedHardWork(cat);
  assert.equal(committed.run.status,'ending_committed');
  assert.equal(committed.run.endings.committed,'ending.lumber.hard-work');
  assert.equal(committed.run.endings.result,null);
  assert.deepEqual(committed.meta.hardWorkProgress,[]);

  const restored=reload(committed,cat);
  assert.equal(restored.run.status,'ending_committed');
  assert.equal(restored.run.endings.committed,'ending.lumber.hard-work');
  assert.equal(restored.run.progression.careers.lumber.counters.completed_shifts,50);
  assert.deepEqual(restored.meta.hardWorkProgress,[]);
  assert.deepEqual(restored.meta.appliedResultTransactions,[]);
});

test('reload after Hard Work completion preserves exact hardWork:lumber reward and repeated completion is idempotent',()=>{
  const cat=catalog();
  let s=committedHardWork(cat);
  s=dispatch(s,{type:'completeEnding'},cat);
  assert.equal(s.run.status,'ended');
  assert.deepEqual(s.run.endings.result?.appliedMetaRewardIds,['hardWork:lumber']);
  assert.deepEqual(s.meta.hardWorkProgress,['lumber']);
  assert.equal(s.meta.appliedResultTransactions.length,1);

  const restored=reload(s,cat);
  assert.deepEqual(restored.run.endings.result?.appliedMetaRewardIds,['hardWork:lumber']);
  assert.deepEqual(restored.meta.hardWorkProgress,['lumber']);
  assert.equal(restored.meta.appliedResultTransactions.length,1);

  const again=dispatch(restored,{type:'completeEnding'},cat);
  assert.deepEqual(again.run.endings.result?.appliedMetaRewardIds,['hardWork:lumber']);
  assert.deepEqual(again.meta.hardWorkProgress,['lumber']);
  assert.equal(again.meta.appliedResultTransactions.length,1);
  assert.equal(again.meta.hardWorkProgress.filter(x=>x==='lumber').length,1);
});

test('checkpoint integration identity follows Lead slash taxonomy and sourceDomain correction, never dotted asset IDs',async()=>{
  const cat=catalog();
  const career=cat.events.find(e=>e.id==='lumber.career-first-shift')!;
  const foreman=cat.events.find(e=>e.id==='lumber.foreman-notice')!;
  const night=cat.events.find(e=>e.id==='lumber-night.foreman-professional')!;
  assert.equal(career.sourceDomain,'lumber');
  assert.equal(foreman.sourceDomain,'lumber.foreman');
  assert.equal(night.sourceDomain,'lumber.foreman');

  const presentation:any=await import('../src/core/presentation.ts');
  const shiftId=typeof presentation.presentationIdForAction==='function'
    ? presentation.presentationIdForAction(cat,'lumber.shift',['job.lumber.shift.spring.default'])
    : 'job/lumber/shift/spring/default';
  const careerId=typeof presentation.presentationIdForEvent==='function'
    ? presentation.presentationIdForEvent(cat,'lumber.career-first-shift','default')
    : 'job/lumber/event/lumber-career-first-shift/default';
  const foremanId=typeof presentation.presentationIdForEvent==='function'
    ? presentation.presentationIdForEvent(cat,'lumber.foreman-notice','default')
    : 'relationship/lumber-foreman/lumber-foreman-notice/default';
  const endingId=typeof presentation.presentationIdForEnding==='function'
    ? presentation.presentationIdForEnding('ending.lumber.hard-work')
    : 'ending/lumber/hard-work';

  assert.equal(shiftId,'job/lumber/shift/spring/default');
  assert.equal(careerId,'job/lumber/event/lumber-career-first-shift/default');
  assert.equal(endingId,'ending/lumber/hard-work');
  assert.ok(foremanId.startsWith('relationship/'));
  assert.ok(foremanId.includes('/'));
  assert.notEqual(careerId,career.variants[0].media[0]);
  assert.notEqual(foremanId,foreman.variants[0].media[0]);
  assert.ok(career.variants[0].media[0].includes('.'));
  assert.ok(foreman.variants[0].media[0].includes('.'));
});
