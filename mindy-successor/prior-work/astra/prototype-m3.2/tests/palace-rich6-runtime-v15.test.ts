import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

import {
  actionAvailable,
  dispatch,
  energyMax,
  freshSave,
  parseSave
} from '../src/core/engine.ts';
import {
  PALACE_ACCESS_FACT,
  PALACE_DUTY_COUNTER,
  PALACE_PROGRESSION_COMPLETE_FACT,
  PALACE_STRUCTURAL_DUTY_ENERGY_COST,
  PALACE_SUPPORT_ENERGY_COST,
  assertPalaceProgressionState,
  palaceDutyDefinitions,
  palaceHasAccess,
  palaceRewardIntegrationSeams,
  palaceStructuralWage,
  palaceSupportDefinitions
} from '../src/core/palace.ts';
import {
  ordinaryHardWorkCareers,
  stats,
  type Save
} from '../src/core/schema.ts';
import {catalog,rawPacks} from './helpers.ts';

const localization=JSON.parse(readFileSync('content/localization.json','utf8'));
const all=[...ordinaryHardWorkCareers];

function allocateTen(input:Save){
  let s=input;
  for(let i=0;i<10;i++)s=dispatch(s,{type:'allocate',stat:'strength',delta:1},catalog);
  return s;
}

function selectAll(input:Save){
  let s=input;
  for(const career of all)s=dispatch(s,{type:'setHardWorkPackageActive',career,active:true},catalog);
  return s;
}

function qualifiedPalaceLife(){
  let s=selectAll(freshSave({hardWorkProgress:all}));
  s=dispatch(allocateTen(s),{type:'finishCreation'},catalog);
  assert.equal(s.run.pending?.eventId,'palace.invitation.day1-arrival');
  s=dispatch(s,{type:'choice',id:'open'},catalog);
  assert.equal(s.run.pending?.eventId,'palace.invitation.reveal');
  s=dispatch(s,{type:'choice',id:'accept'},catalog);
  assert.equal(palaceHasAccess(s),true);
  s.run.flags['story.arrived']=true;
  return parseSave(JSON.stringify(s),catalog);
}

function nextDay(input:Save,energy=3){
  const s=structuredClone(input) as Save;
  s.run.calendar.elapsedDays++;
  s.run.dayState.energyCurrent=energy;
  return parseSave(JSON.stringify(s),catalog);
}

function resolveMilestone(input:Save){
  if(!input.run.pending?.eventId.startsWith('palace.progression.milestone-'))return input;
  return dispatch(input,{type:'choice',id:'continue'},catalog);
}

function performDuty(input:Save,ordinal:number){
  const definition=palaceDutyDefinitions[ordinal-1];
  assert.ok(definition);
  return dispatch(input,{type:'action',id:definition.id},catalog);
}

test('v15 preserves D23 invitation/access as the only Palace entry seam',()=>{
  const s=qualifiedPalaceLife();
  assert.equal(s.run.progression.worldFacts.includes(PALACE_ACCESS_FACT),true);
  assert.equal(s.meta.unlocks.includes('palace'),false);
  assert.equal(s.run.progression.palace.stage,'entered-service');
  assert.equal(s.run.progression.palace.counters[PALACE_DUTY_COUNTER],0);
  assert.deepEqual(s.run.progression.palace.committedDutyIds,[]);
  assertPalaceProgressionState(s);
});

test('schema-5 save without typed Palace state defaults safely without retroactive progress',()=>{
  const s=qualifiedPalaceLife();
  const raw=JSON.parse(JSON.stringify(s));
  delete raw.run.progression.palace;
  raw.run.progression.worldFacts=raw.run.progression.worldFacts
    .filter((fact:string)=>fact!==PALACE_PROGRESSION_COMPLETE_FACT);

  const parsed=parseSave(JSON.stringify(raw),catalog);
  assert.equal(parsed.run.progression.palace.stage,'entered-service');
  assert.equal(parsed.run.progression.palace.counters[PALACE_DUTY_COUNTER],0);
  assert.deepEqual(parsed.run.progression.palace.committedDutyIds,[]);
  assert.equal(parsed.run.progression.worldFacts.includes(PALACE_PROGRESSION_COMPLETE_FACT),false);
});

test('structural duty uses exactly 1 Energy, bounded wage, no routine stat/Lust change and no daytime end',()=>{
  let s=qualifiedPalaceLife();
  const beforeStats=structuredClone(s.run.character.stats);
  const beforeLust=s.run.character.lust;
  const beforeMoney=s.run.resources.money;
  const beforeDay=s.run.calendar.elapsedDays;
  const wage=palaceStructuralWage(s);

  assert.equal(PALACE_STRUCTURAL_DUTY_ENERGY_COST,1);
  assert.ok(wage>=35&&wage<=55);

  s=performDuty(s,1);

  assert.equal(s.run.dayState.energyCurrent,2);
  assert.equal(s.run.resources.money,beforeMoney+wage);
  assert.equal(s.run.calendar.elapsedDays,beforeDay);
  assert.deepEqual(s.run.character.stats,beforeStats);
  assert.equal(s.run.character.lust,beforeLust);
  assert.equal(s.run.progression.palace.counters[PALACE_DUTY_COUNTER],1);
  assert.equal(s.run.progression.palace.lastStructuralDutyDay,beforeDay);
});

test('Palace wage is hard-bounded to 55 even in a cap-200 life',()=>{
  const s=qualifiedPalaceLife();
  s.run.character.progressionStatCap=200;
  s.run.character.stats.reason=200;
  s.run.character.stats.wits=200;
  s.run.character.stats.manners=200;
  s.run.character.stats.sociability=200;

  assert.equal(palaceStructuralWage(s),55);
});

test('same-day second structural duty is rejected without changing the original save',()=>{
  let s=qualifiedPalaceLife();
  s=performDuty(s,1);
  const snapshot=JSON.stringify(s);

  assert.throws(
    ()=>dispatch(s,{type:'action',id:palaceDutyDefinitions[1]!.id},catalog),
    /Условия действия не выполнены|Palace duty/
  );
  assert.equal(JSON.stringify(s),snapshot);
  assert.equal(s.run.progression.palace.counters[PALACE_DUTY_COUNTER],1);
});

test('all 15 structural duties follow exact stage milestones and milestone scenes survive reload',()=>{
  let s=qualifiedPalaceLife();
  const stageAtMilestone=new Map([
    [2,'working-rhythm'],
    [5,'trusted-service'],
    [8,'palace-network'],
    [12,'crossroads'],
    [15,'outcome-ready']
  ]);
  const expectedMilestoneId=new Map([
    [2,'palace.progression.milestone-02-working-rhythm'],
    [5,'palace.progression.milestone-05-trusted-service'],
    [8,'palace.progression.milestone-08-palace-network'],
    [12,'palace.progression.milestone-12-crossroads'],
    [15,'palace.progression.milestone-15-outcome-ready']
  ]);

  let totalWage=0;
  for(let ordinal=1;ordinal<=15;ordinal++){
    if(ordinal>1)s=nextDay(s);
    const beforeMoney=s.run.resources.money;
    const wage=palaceStructuralWage(s);

    s=performDuty(s,ordinal);
    totalWage+=s.run.resources.money-beforeMoney;
    assert.equal(s.run.resources.money-beforeMoney,wage);
    assert.equal(s.run.progression.palace.counters[PALACE_DUTY_COUNTER],ordinal);
    assert.deepEqual(
      s.run.progression.palace.committedDutyIds,
      palaceDutyDefinitions.slice(0,ordinal).map(definition=>definition.id)
    );

    if(stageAtMilestone.has(ordinal)){
      assert.equal(s.run.progression.palace.stage,stageAtMilestone.get(ordinal));
      assert.equal(s.run.pending?.eventId,expectedMilestoneId.get(ordinal));
      const serialized=JSON.stringify(s);
      s=parseSave(serialized,catalog);
      assert.equal(s.run.pending?.eventId,expectedMilestoneId.get(ordinal));
      assert.equal(s.run.progression.palace.counters[PALACE_DUTY_COUNTER],ordinal);
      s=resolveMilestone(s);
      assert.equal(s.run.pending,null);
    }
    assertPalaceProgressionState(s);
  }

  assert.equal(s.run.progression.palace.stage,'outcome-ready');
  assert.equal(s.run.progression.worldFacts.includes(PALACE_PROGRESSION_COMPLETE_FACT),true);
  assert.equal(
    s.run.progression.worldFacts.filter(fact=>fact===PALACE_PROGRESSION_COMPLETE_FACT).length,
    1
  );
  assert.equal(totalWage<=825,true);
});

test('no paid progression-counting structural Palace duty exists after duty 15',()=>{
  let s=qualifiedPalaceLife();
  for(let ordinal=1;ordinal<=15;ordinal++){
    if(ordinal>1)s=nextDay(s);
    s=performDuty(s,ordinal);
    s=resolveMilestone(s);
  }
  s=nextDay(s);
  const money=s.run.resources.money;
  const count=s.run.progression.palace.counters[PALACE_DUTY_COUNTER];

  for(const definition of palaceDutyDefinitions){
    const action=catalog.definitions.actions.find(item=>item.id===definition.id)!;
    assert.equal(actionAvailable(action,s,catalog),false,definition.id);
  }
  assert.equal(s.run.resources.money,money);
  assert.equal(s.run.progression.palace.counters[PALACE_DUTY_COUNTER],count);
});

test('support costs 1 Energy, pays zero, grants no duty/stat/Lust and is limited to one per day',()=>{
  let s=qualifiedPalaceLife();
  for(let ordinal=1;ordinal<=5;ordinal++){
    if(ordinal>1)s=nextDay(s);
    s=performDuty(s,ordinal);
    s=resolveMilestone(s);
  }

  const first='palace.outcome-prep.service-life.01-continuity';
  const second='palace.outcome-prep.service-life.02-boundaries';
  const beforeMoney=s.run.resources.money;
  const beforeStats=structuredClone(s.run.character.stats);
  const beforeLust=s.run.character.lust;
  const beforeCount=s.run.progression.palace.counters[PALACE_DUTY_COUNTER];
  const beforeEnergy=s.run.dayState.energyCurrent;

  assert.equal(PALACE_SUPPORT_ENERGY_COST,1);
  s=dispatch(s,{type:'action',id:first},catalog);
  assert.equal(s.run.dayState.energyCurrent,beforeEnergy-1);
  assert.equal(s.run.resources.money,beforeMoney);
  assert.deepEqual(s.run.character.stats,beforeStats);
  assert.equal(s.run.character.lust,beforeLust);
  assert.equal(s.run.progression.palace.counters[PALACE_DUTY_COUNTER],beforeCount);
  assert.equal(s.run.progression.palace.completedSupportIds.includes(first),true);

  const snapshot=JSON.stringify(s);
  assert.throws(()=>dispatch(s,{type:'action',id:second},catalog),/Условия действия не выполнены|support/);
  assert.equal(JSON.stringify(s),snapshot);

  s=nextDay(s);
  s=dispatch(s,{type:'action',id:second},catalog);
  assert.equal(s.run.progression.palace.routePrepFacts.includes('service-life'),true);
  assert.equal(s.run.progression.worldFacts.includes('palace.prep.service-life'),true);
});

test('all three non-True preparation routes coexist and can finalize independently at Outcome Ready',()=>{
  let s=qualifiedPalaceLife();

  for(let ordinal=1;ordinal<=15;ordinal++){
    if(ordinal>1)s=nextDay(s);
    s=performDuty(s,ordinal);
    s=resolveMilestone(s);

    if(ordinal===5){
      s=dispatch(s,{type:'action',id:'palace.outcome-prep.service-life.01-continuity'},catalog);
    }
    if(ordinal===6){
      s=dispatch(s,{type:'action',id:'palace.outcome-prep.service-life.02-boundaries'},catalog);
    }
    if(ordinal===8){
      s=dispatch(s,{type:'action',id:'palace.outcome-prep.court-power.01-responsibility'},catalog);
    }
    if(ordinal===9){
      s=dispatch(s,{type:'action',id:'palace.outcome-prep.court-power.02-network'},catalog);
    }
    if(ordinal===12){
      s=dispatch(s,{type:'action',id:'palace.outcome-prep.inner-truth.01-evidence'},catalog);
    }
    if(ordinal===13){
      s=dispatch(s,{type:'action',id:'palace.outcome-prep.inner-truth.02-contradiction'},catalog);
    }
  }

  assert.deepEqual(
    [...s.run.progression.palace.routePrepFacts].sort(),
    ['court-power','inner-truth','service-life']
  );

  while(s.run.pending?.eventId.startsWith('palace.outcome-finalize.')){
    s=parseSave(JSON.stringify(s),catalog);
    s=dispatch(s,{type:'choice',id:'finalize'},catalog);
  }

  for(const fact of [
    'palace.outcome.service-life-ready',
    'palace.outcome.court-power-ready',
    'palace.outcome.inner-truth-ready'
  ]){
    assert.equal(s.run.progression.worldFacts.includes(fact),true,fact);
  }

  for(const ending of [
    'ending.palace.service-life',
    'ending.palace.court-power',
    'ending.palace.inner-truth'
  ]){
    assert.equal(s.run.endings.eligible.includes(ending),true,ending);
  }

  assert.equal(s.run.endings.committed,null);
  s=dispatch(s,{type:'commitEnding',id:'ending.palace.service-life'},catalog);
  assert.equal(s.run.endings.committed,'ending.palace.service-life');
  assert.equal(s.run.status,'ending_committed');
});

test('True Return Home eligibility is 12x91 + Prince signal; Lust remains irrelevant',()=>{
  let s=qualifiedPalaceLife();
  for(const stat of stats)s.run.character.stats[stat]=91;
  s.run.character.lust=1;
  s.run.progression.worldFacts.push('palace.prince-defeated');

  for(let ordinal=1;ordinal<=15;ordinal++){
    if(ordinal>1)s=nextDay(s);
    s=performDuty(s,ordinal);
    if(ordinal===15){
      assert.equal(s.run.endings.eligible.includes('ending.palace.return-home'),true);
      assert.equal(s.run.pending?.eventId,'palace.progression.milestone-15-outcome-ready');
    }
    s=resolveMilestone(s);
  }

  assert.equal(s.run.endings.eligible.includes('ending.palace.return-home'),true);
  assert.equal(s.run.endings.committed,null);

  const low=qualifiedPalaceLife();
  for(const stat of stats)low.run.character.stats[stat]=91;
  low.run.character.stats.reason=90;
  low.run.character.lust=100;
  low.run.progression.worldFacts.push('palace.prince-defeated');
  let lowState=low;
  for(let ordinal=1;ordinal<=15;ordinal++){
    if(ordinal>1)lowState=nextDay(lowState);
    lowState=performDuty(lowState,ordinal);
    lowState=resolveMilestone(lowState);
  }
  assert.equal(lowState.run.endings.eligible.includes('ending.palace.return-home'),false);
});

test('ordinary-career domain lock does not revoke legitimately opened Palace daytime access',()=>{
  const s=qualifiedPalaceLife();
  const palaceAction=catalog.definitions.actions.find(action=>action.id==='palace.duty.01-service-rotation')!;
  const lumber=catalog.definitions.actions.find(action=>action.id==='lumber.shift')!;

  assert.equal(actionAvailable(palaceAction,s,catalog,{ordinaryCareersDomainLocked:true}),true);
  assert.equal(actionAvailable(lumber,s,catalog,{ordinaryCareersDomainLocked:true}),false);
});

test('Palace daytime actions have no lodging gate and v15 adds no Palace Night owner',()=>{
  const palaceActions=catalog.definitions.actions.filter(action=>
    action.id.startsWith('palace.duty.')||action.id.startsWith('palace.outcome-prep.')
  );
  assert.equal(palaceActions.length,21);
  for(const action of palaceActions){
    const serialized=JSON.stringify(action.conditions);
    assert.equal(serialized.includes('housingTier'),false,action.id);
    assert.equal(serialized.includes('housing'),false,action.id);
  }

  const palaceNightChoices=catalog.definitions.nightChoices.filter(choice=>choice.id.startsWith('palace.'));
  assert.deepEqual(palaceNightChoices,[]);
});

test('bound-like final Energy is spent normally and Palace leaves next-day penalty state untouched',()=>{
  let s=qualifiedPalaceLife();
  s.run.dayState.energyCurrent=2;
  s.run.dayState.nextDayModifiers.energyDelta=-1;
  s.run.dayState.nextDayModifiers.tags=['secret-debt.forced-night'];

  const beforeModifiers=structuredClone(s.run.dayState.nextDayModifiers);
  s=performDuty(s,1);

  assert.equal(s.run.dayState.energyCurrent,1);
  assert.deepEqual(s.run.dayState.nextDayModifiers,beforeModifiers);
});

test('milestone and finalize packs use latched exactly-once standard resolver primitives',()=>{
  const milestone=rawPacks.find(pack=>pack.id==='palace.progression');
  const finalize=rawPacks.find(pack=>pack.id==='palace.outcome-finalize');
  assert.ok(milestone);
  assert.ok(finalize);

  assert.equal(milestone.events.length,5);
  for(const event of milestone.events){
    assert.equal(event.priorityClass,'critical_progression');
    assert.equal(event.blocking,true);
    assert.equal(event.delivery.policy,'latched');
    assert.equal(event.maxShows,1);
    assert.equal(event.chance,undefined);
    assert.deepEqual(event.reactionTriggers,[{kind:'careerTransition',career:'palace'}]);
  }

  assert.equal(finalize.events.length,3);
  for(const event of finalize.events){
    assert.equal(event.blocking,true);
    assert.equal(event.delivery.policy,'latched');
    assert.equal(event.maxShows,1);
    assert.equal(event.chance,undefined);
  }
});

test('D39 reward ownership remains an explicit external seam rather than a duplicate local registry',()=>{
  assert.equal(palaceRewardIntegrationSeams['ending.palace.service-life'].rewardId,'palace.service-life.steady-practice');
  assert.equal(palaceRewardIntegrationSeams['ending.palace.court-power'].rewardId,'palace.court-power.formal-introduction');
  assert.equal(palaceRewardIntegrationSeams['ending.palace.inner-truth'].rewardId,'palace.inner-truth.source-method');
  assert.equal(palaceRewardIntegrationSeams['ending.palace.return-home'].rewardId,'palace.true.cap-200');

  for(const endingId of Object.keys(palaceRewardIntegrationSeams)){
    const ending=catalog.definitions.endings.find(item=>item.id===endingId);
    assert.ok(ending,endingId);
    assert.deepEqual(ending.metaRewards,[],endingId);
  }
});

test('all Palace v15 action/event/ending localization keys have RU and EN',()=>{
  const keys:string[]=[];

  for(const definition of palaceDutyDefinitions){
    keys.push(
      `action.${definition.id}.label`,
      `action.${definition.id}.description`,
      `action.${definition.id}.scene.default.text`
    );
  }
  for(const definition of palaceSupportDefinitions){
    keys.push(
      `action.${definition.id}.label`,
      `action.${definition.id}.description`,
      `action.${definition.id}.scene.default.text`
    );
  }

  for(const eventId of [
    'palace.progression.milestone-02-working-rhythm',
    'palace.progression.milestone-05-trusted-service',
    'palace.progression.milestone-08-palace-network',
    'palace.progression.milestone-12-crossroads',
    'palace.progression.milestone-15-outcome-ready'
  ]){
    keys.push(
      `event.${eventId}.title`,
      `event.${eventId}.variant.default.text`,
      `event.${eventId}.choice.continue.label`,
      `event.${eventId}.choice.continue.text`
    );
  }

  for(const eventId of [
    'palace.outcome-finalize.service-life',
    'palace.outcome-finalize.court-power',
    'palace.outcome-finalize.inner-truth'
  ]){
    keys.push(
      `event.${eventId}.title`,
      `event.${eventId}.variant.default.text`,
      `event.${eventId}.choice.finalize.label`,
      `event.${eventId}.choice.finalize.text`
    );
  }

  for(const endingId of [
    'ending.palace.service-life',
    'ending.palace.court-power',
    'ending.palace.inner-truth',
    'ending.palace.return-home'
  ]){
    keys.push(`ending.${endingId}.title`,`ending.${endingId}.description`);
  }

  for(const key of keys){
    const entry=localization.strings[key];
    assert.ok(entry,key);
    assert.ok(entry.ru?.length>0,`${key}:ru`);
    assert.ok(entry.en?.length>0,`${key}:en`);
  }
});

test('Palace progression invariants reject duplicate or skipped duty saves',()=>{
  const s=qualifiedPalaceLife();
  const bad=JSON.parse(JSON.stringify(s));
  bad.run.progression.palace.counters[PALACE_DUTY_COUNTER]=2;
  bad.run.progression.palace.shifts=2;
  bad.run.progression.palace.stage='working-rhythm';
  bad.run.progression.palace.committedDutyIds=[
    'palace.duty.01-service-rotation',
    'palace.duty.01-service-rotation'
  ];

  assert.throws(()=>parseSave(JSON.stringify(bad),catalog),/committed Palace duties/);
});

test('base daily Energy remains available to other systems because Palace duty does not consume the day',()=>{
  let s=qualifiedPalaceLife();
  assert.equal(energyMax(s)>=3,true);
  s=performDuty(s,1);
  assert.equal(s.run.dayState.energyCurrent,energyMax(s)-1);

  const schoolCost=1;
  assert.equal(s.run.dayState.energyCurrent>=schoolCost,true);
});
