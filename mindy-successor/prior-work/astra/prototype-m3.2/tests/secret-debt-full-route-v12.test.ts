import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

import {
  actionAvailable,
  dispatch,
  eligible,
  eventChance,
  parseSave
} from '../src/core/engine.ts';
import {PALACE_ACCESS_FACT,palaceHasAccess} from '../src/core/palace.ts';
import {
  SECRET_DEBT_BOUND_LIFE_ENDING_ID,
  SECRET_DEBT_FORCED_NIGHT_EVENT_ID,
  SECRET_DEBT_HIDDEN_WORK_ACTION_ID,
  SECRET_DEBT_LENDER_EVENT_ID,
  SECRET_DEBT_PAID_FREEDOM_ENDING_ID,
  SECRET_DEBT_REPAY_ACTION_ID,
  SECRET_DEBT_REWARD_IDS,
  SECRET_DEBT_TAKEOVER_ACTION_ID,
  SECRET_DEBT_TAKEOVER_ENDING_ID,
  secretDebtHiddenWageFromValues,
  secretDebtTakeoverReady
} from '../src/core/secretDebt.ts';
import {
  ordinaryHardWorkCareers,
  type Save,
  type Pack
} from '../src/core/schema.ts';
import {catalog,rawPacks,started} from './helpers.ts';

function setBound(s:Save,day=10,hiddenShifts=0){
  s.run.calendar.elapsedDays=day;
  s.run.secretDebt={
    status:'bound',
    acceptedDay:0,
    trapDay:10,
    boundDay:10,
    resolvedDay:null,
    debt:20000,
    hiddenShifts,
    grantApplied:true,
    lastLenderAttemptDay:null
  };
  return s;
}

function paidLessons(s:Save,count:number){
  s.run.progression.school.tracks['school.track.field_craft']={
    trackId:'school.track.field_craft',
    counters:{lessons_completed:count},
    facts:[],
    milestones:[],
    certificates:[],
    choices:{}
  };
}

function firstEligibleChoice(s:Save){
  const pending=s.run.pending;
  assert.ok(pending);
  const event=catalog.events.find(item=>item.id===pending.eventId);
  assert.ok(event,pending.eventId);
  const choice=event.choices.find(item=>
    (!pending.allowedChoiceIds||pending.allowedChoiceIds.includes(item.id))
    && eligible(item.conditions,s,catalog)
  );
  assert.ok(choice,pending.eventId);
  return choice.id;
}

function resolvePending(s:Save,max=30){
  let next=s;
  let steps=0;
  while(next.run.pending){
    assert.ok(++steps<=max,'pending scene loop');
    next=dispatch(next,{type:'choice',id:firstEligibleChoice(next)},catalog);
  }
  return next;
}

function finishNight(s:Save,lodgingId='lodging.normal'){
  let next=s;
  let steps=0;
  while(next.run.flow.night){
    assert.ok(++steps<=50,'NightFlow loop');
    if(next.run.pending){
      next=dispatch(next,{type:'choice',id:firstEligibleChoice(next)},catalog);
      continue;
    }
    const phase=next.run.flow.night.phase;
    if(phase==='LodgingResolution'){
      next=dispatch(next,{type:'chooseLodging',id:lodgingId},catalog);
      continue;
    }
    if(phase==='VoluntaryNightChoice'){
      next=dispatch(next,{type:'chooseNightChoice',id:'night.sleep'},catalog);
      continue;
    }
    throw new Error('Unexpected NightFlow phase without pending scene: '+phase);
  }
  return next;
}

function beginStreetNightWithSeed(seed:number){
  let s=started();
  s.run.rng=seed;
  s=dispatch(s,{type:'endDay'},catalog);
  assert.equal(s.run.flow.night?.phase,'LodgingResolution');
  s=dispatch(s,{type:'chooseLodging',id:'lodging.street'},catalog);
  return s;
}

function acceptLenderOnDayZero(){
  let s=beginStreetNightWithSeed(1972);
  assert.equal(s.run.pending?.eventId,SECRET_DEBT_LENDER_EVENT_ID);
  s=dispatch(s,{type:'choice',id:'accept'},catalog);
  return s;
}

function takeoverReadyState(){
  const s=setBound(started(),40,75);
  s.run.character.stats.endurance=75;
  s.run.character.stats.sexuality=75;
  s.run.character.stats.wits=35;
  s.run.character.lust=30;
  paidLessons(s,10);
  s.run.resources.money=50000;
  s.run.dayState.energyCurrent=3;
  return s;
}

test('lender uses deterministic fixed 20% RNG and only one attempt per eligible street night',()=>{
  const event=catalog.events.find(item=>item.id===SECRET_DEBT_LENDER_EVENT_ID);
  assert.ok(event);
  assert.equal(eventChance(event,started()),0.2);
  const highLust=started();
  highLust.run.character.lust=100;
  assert.equal(eventChance(event,highLust),0.2,'Lust cannot alter the locked 20% lender chance');

  let fail=beginStreetNightWithSeed(0);
  assert.notEqual(fail.run.pending?.eventId,SECRET_DEBT_LENDER_EVENT_ID);
  assert.equal(fail.run.secretDebt.status,'unseen');
  assert.equal(fail.run.secretDebt.lastLenderAttemptDay,0);

  fail=finishNight(fail,'lodging.street');
  assert.equal(fail.run.calendar.elapsedDays,1);
  assert.equal(fail.run.historyState.eventHistory[SECRET_DEBT_LENDER_EVENT_ID],undefined);

  fail.run.rng=1972;
  fail=dispatch(fail,{type:'endDay'},catalog);
  fail=dispatch(fail,{type:'chooseLodging',id:'lodging.street'},catalog);
  assert.equal(fail.run.pending?.eventId,SECRET_DEBT_LENDER_EVENT_ID);
  assert.equal(fail.run.secretDebt.lastLenderAttemptDay,1);
});

test('refusal closes the lender route for the current life and high Sexuality/Lust never remove refusal',()=>{
  let s=started();
  s.run.character.stats.sexuality=100;
  s.run.character.lust=100;
  s.run.rng=1972;
  s=dispatch(s,{type:'endDay'},catalog);
  s=dispatch(s,{type:'chooseLodging',id:'lodging.street'},catalog);
  assert.equal(s.run.pending?.eventId,SECRET_DEBT_LENDER_EVENT_ID);

  const lender=catalog.events.find(item=>item.id===SECRET_DEBT_LENDER_EVENT_ID);
  assert.ok(lender?.choices.some(choice=>choice.id==='refuse'));
  s=dispatch(s,{type:'choice',id:'refuse'},catalog);
  assert.equal(s.run.secretDebt.status,'refused');

  s=finishNight(s,'lodging.street');
  s.run.rng=1972;
  s=dispatch(s,{type:'endDay'},catalog);
  s=dispatch(s,{type:'chooseLodging',id:'lodging.street'},catalog);
  assert.notEqual(s.run.pending?.eventId,SECRET_DEBT_LENDER_EVENT_ID);
  assert.equal(s.run.secretDebt.status,'refused');
});

test('accept grants exactly +2000 once and survives reload without duplication',()=>{
  const before=started().run.resources.money;
  let s=acceptLenderOnDayZero();
  assert.equal(s.run.resources.money,before+2000);
  assert.equal(s.run.secretDebt.status,'accepted');
  assert.equal(s.run.secretDebt.acceptedDay,0);
  assert.equal(s.run.secretDebt.trapDay,10);
  assert.equal(s.run.secretDebt.grantApplied,true);

  s=parseSave(JSON.stringify(s),catalog);
  assert.equal(s.run.resources.money,before+2000);
  assert.equal(s.run.secretDebt.status,'accepted');

  const snapshot=s.run.resources.money;
  s=finishNight(s,'lodging.street');
  assert.equal(s.run.resources.money,snapshot);
});

test('trap activates exactly ten calendar days after acceptance and creates exactly 20000 debt',()=>{
  let s=acceptLenderOnDayZero();
  s=finishNight(s,'lodging.street');
  assert.equal(s.run.calendar.elapsedDays,1);

  while(s.run.calendar.elapsedDays<9){
    s=resolvePending(s);
    s=dispatch(s,{type:'endDay'},catalog);
    s=finishNight(s,'lodging.normal');
  }
  assert.equal(s.run.calendar.elapsedDays,9);
  assert.equal(s.run.secretDebt.status,'accepted');
  assert.equal(s.run.secretDebt.debt,0);

  s=resolvePending(s);
  s=dispatch(s,{type:'endDay'},catalog);
  s=finishNight(s,'lodging.normal');

  assert.equal(s.run.calendar.elapsedDays,10);
  assert.equal(s.run.secretDebt.status,'bound');
  assert.equal(s.run.secretDebt.boundDay,10);
  assert.equal(s.run.secretDebt.debt,20000);
  assert.equal(s.run.pending?.eventId,'secret-debt.trap-activation');

  s=parseSave(JSON.stringify(s),catalog);
  assert.equal(s.run.secretDebt.status,'bound');
  assert.equal(s.run.secretDebt.debt,20000);
  assert.equal(s.run.pending?.eventId,'secret-debt.trap-activation');
});

test('bound state locks all ten ordinary careers without mutating their progress, even if caller passes false lock option',()=>{
  const s=started();
  s.meta.hardWorkProgress=[...ordinaryHardWorkCareers];

  for(const definition of catalog.definitions.careers??[]){
    if(!ordinaryHardWorkCareers.includes(definition.id as typeof ordinaryHardWorkCareers[number]))continue;
    s.run.progression.careers[definition.id]={
      stage:definition.initialStage,
      shifts:7,
      counters:{completed_shifts:7},
      choices:{},
      facts:['pre-bound-progress']
    };
  }
  const before=structuredClone(s.run.progression.careers);

  for(const career of ordinaryHardWorkCareers){
    const action=catalog.definitions.actions.find(item=>item.id===career+'.shift');
    assert.ok(action,career);
    assert.equal(actionAvailable(action,s,catalog),true,career+' inherited access before bind');
  }

  setBound(s,10,0);
  for(const career of ordinaryHardWorkCareers){
    const action=catalog.definitions.actions.find(item=>item.id===career+'.shift');
    assert.ok(action,career);
    assert.equal(actionAvailable(action,s,catalog),false,career+' bound lock');
    assert.equal(actionAvailable(action,s,catalog,{ordinaryCareersDomainLocked:false}),false,career+' lock cannot be overridden');
  }
  for(const alias of ['lumber','tavern','guard']){
    const action=catalog.definitions.actions.find(item=>item.id===alias);
    assert.ok(action,alias+' legacy action');
    assert.equal(actionAvailable(action,s,catalog),false,alias+' legacy alias cannot bypass bound lock');
    assert.throws(()=>dispatch(s,{type:'action',id:alias},catalog),/условия действия/i,alias+' direct dispatch');
  }
  assert.deepEqual(s.run.progression.careers,before);

  s.run.secretDebt.status='paid-freedom';
  s.run.secretDebt.debt=0;
  s.run.secretDebt.resolvedDay=10;
  for(const career of ordinaryHardWorkCareers){
    const action=catalog.definitions.actions.find(item=>item.id===career+'.shift');
    assert.ok(action,career);
    assert.equal(actionAvailable(action,s,catalog),true,career+' access resumes after exit');
  }
  assert.deepEqual(s.run.progression.careers,before,'career progress must survive bound lock and exit');
});

test('School and Activity remain executable while bound',()=>{
  let school=setBound(started(),10,0);
  school.run.resources.money=5000;
  school.run.dayState.energyCurrent=3;
  school=dispatch(school,{type:'schoolLesson',id:'school.course.literacy_and_numbers'},catalog);
  assert.equal(school.run.secretDebt.status,'bound');
  assert.equal(
    school.run.progression.school.tracks['school.track.literacy_and_numbers']?.counters.lessons_completed,
    1
  );

  let activity=setBound(started(),10,0);
  activity.run.dayState.energyCurrent=3;
  activity=dispatch(activity,{type:'enterActivity',id:'lumber.forest'},catalog);
  assert.equal(activity.run.secretDebt.status,'bound');
  assert.equal(activity.run.flow.activity?.activityId,'lumber.forest');
});

test('D44 hidden wage anchors and hard cap are exact',()=>{
  assert.equal(secretDebtHiddenWageFromValues(10,10,5),45);
  assert.equal(secretDebtHiddenWageFromValues(30,30,15),74);
  assert.equal(secretDebtHiddenWageFromValues(50,50,25),104);
  assert.equal(secretDebtHiddenWageFromValues(100,100,100),140);
  assert.equal(secretDebtHiddenWageFromValues(200,200,100),140);
});

test('hidden work spends one Energy, uses pre-shift wage, gains Endurance/Sexuality and never gains Lust',()=>{
  let s=setBound(started(),40,0);
  s.run.dayState.energyCurrent=3;
  s.run.resources.money=100;
  s.run.character.stats.endurance=10;
  s.run.character.stats.sexuality=10;
  s.run.character.lust=5;
  const beforeLust=s.run.character.lust;

  s=dispatch(s,{type:'action',id:SECRET_DEBT_HIDDEN_WORK_ACTION_ID},catalog);
  assert.equal(s.run.resources.money,145,'45 wage must use pre-shift 10/10/5 values');
  assert.equal(s.run.dayState.energyCurrent,2);
  assert.equal(s.run.character.stats.endurance,11);
  assert.equal(s.run.character.stats.sexuality,11);
  assert.equal(s.run.character.lust,beforeLust);
  assert.equal(s.run.secretDebt.hiddenShifts,1);
});

test('D44 seasonal hidden-work negatives are exact: Summer Reason -1, Winter Sociability -1 only',()=>{
  const cases=[
    {day:40,stat:null as null|'reason'|'sociability'},
    {day:50,stat:'reason' as const},
    {day:60,stat:null as null|'reason'|'sociability'},
    {day:70,stat:'sociability' as const}
  ];

  for(const entry of cases){
    let s=setBound(started(),entry.day,0);
    s.run.dayState.energyCurrent=3;
    s.run.character.stats.reason=20;
    s.run.character.stats.sociability=20;
    s=dispatch(s,{type:'action',id:SECRET_DEBT_HIDDEN_WORK_ACTION_ID},catalog);
    assert.equal(s.run.character.stats.reason,entry.stat==='reason'?19:20,'day '+entry.day+' Reason');
    assert.equal(s.run.character.stats.sociability,entry.stat==='sociability'?19:20,'day '+entry.day+' Sociability');
  }
});

test('forced Secret Debt Night owns every bound night and applies next-day Energy -1 exactly once across reload',()=>{
  let s=setBound(started(),10,0);
  s.run.resources.money=1000;
  s.run.dayState.energyCurrent=3;

  s=dispatch(s,{type:'endDay'},catalog);
  assert.equal(s.run.pending?.eventId,SECRET_DEBT_FORCED_NIGHT_EVENT_ID);
  assert.equal(s.run.flow.night?.phase,'NightEventResolution');

  s=parseSave(JSON.stringify(s),catalog);
  assert.equal(s.run.pending?.eventId,SECRET_DEBT_FORCED_NIGHT_EVENT_ID);
  s=dispatch(s,{type:'choice',id:'continue'},catalog);
  assert.equal(s.run.flow.night?.phase,'LodgingResolution');
  assert.deepEqual(
    s.run.dayState.nextDayModifiers.tags.filter(tag=>tag==='secret-debt.bound-night'),
    ['secret-debt.bound-night']
  );

  s=parseSave(JSON.stringify(s),catalog);
  s=dispatch(s,{type:'chooseLodging',id:'lodging.normal'},catalog);
  assert.equal(s.run.flow.night,null);
  assert.equal(s.run.calendar.elapsedDays,11);
  assert.equal(s.run.dayState.energyCurrent,2);

  s=parseSave(JSON.stringify(s),catalog);
  assert.equal(s.run.dayState.energyCurrent,2);
  assert.equal(s.run.historyState.eventHistory[SECRET_DEBT_FORCED_NIGHT_EVENT_ID]?.count,1);

  s=resolvePending(s);
  s=dispatch(s,{type:'endDay'},catalog);
  assert.equal(s.run.pending?.eventId,SECRET_DEBT_FORCED_NIGHT_EVENT_ID);
});

test('Meta Energy modifiers cannot suppress forced Secret Debt Night or its relative -1 penalty',()=>{
  let s=setBound(started(),10,0);
  s.meta.ruleModifiers['energy.daily']=1;
  s.run.resources.money=1000;
  s.run.dayState.energyCurrent=4;

  s=dispatch(s,{type:'endDay'},catalog);
  assert.equal(s.run.pending?.eventId,SECRET_DEBT_FORCED_NIGHT_EVENT_ID);
  s=dispatch(s,{type:'choice',id:'continue'},catalog);
  s=dispatch(s,{type:'chooseLodging',id:'lodging.normal'},catalog);

  assert.equal(s.run.dayState.energyCurrent,3,'base 4 from modifier minus bound Night 1');
});

test('Street and bound penalties stack in the correct order: paid lodging leaves 2 Energy, Street leaves 1',()=>{
  for(const [lodging,expected] of [['lodging.normal',2],['lodging.street',1]] as const){
    let s=setBound(started(),10,0);
    s.run.resources.money=1000;
    s.run.dayState.energyCurrent=3;
    s=dispatch(s,{type:'endDay'},catalog);
    assert.equal(s.run.pending?.eventId,SECRET_DEBT_FORCED_NIGHT_EVENT_ID);
    s=dispatch(s,{type:'choice',id:'continue'},catalog);
    s=dispatch(s,{type:'chooseLodging',id:lodging},catalog);
    assert.equal(s.run.dayState.energyCurrent,expected,lodging);
  }
});

test('repayment is full-only, explicit, clears bound state and does not auto-commit the Paid Freedom ending',()=>{
  let s=setBound(started(),10,0);
  s.run.resources.money=19999;
  const repay=catalog.definitions.actions.find(item=>item.id===SECRET_DEBT_REPAY_ACTION_ID);
  assert.ok(repay);
  assert.equal(actionAvailable(repay,s,catalog),false);
  assert.throws(()=>dispatch(s,{type:'action',id:SECRET_DEBT_REPAY_ACTION_ID},catalog),/условия действия/i);

  s.run.resources.money=20000;
  assert.equal(actionAvailable(repay,s,catalog),true);
  s=dispatch(s,{type:'action',id:SECRET_DEBT_REPAY_ACTION_ID},catalog);
  assert.equal(s.run.resources.money,0);
  assert.equal(s.run.secretDebt.debt,0);
  assert.equal(s.run.secretDebt.status,'paid-freedom');
  assert.ok(s.run.endings.eligible.includes(SECRET_DEBT_PAID_FREEDOM_ENDING_ID));
  assert.equal(s.run.status,'active');
  assert.equal(s.run.endings.committed,null);

  s=parseSave(JSON.stringify(s),catalog);
  assert.equal(s.run.secretDebt.status,'paid-freedom');
  assert.equal(s.run.secretDebt.debt,0);
});

test('Bound Life is ineligible at 49 and eligible at exactly 50 without auto-commit',()=>{
  const ending=catalog.definitions.endings.find(item=>item.id===SECRET_DEBT_BOUND_LIFE_ENDING_ID);
  assert.ok(ending);

  let s=setBound(started(),40,49);
  assert.equal(eligible(ending.conditions,s,catalog),false);
  s.run.dayState.energyCurrent=3;
  s=dispatch(s,{type:'action',id:SECRET_DEBT_HIDDEN_WORK_ACTION_ID},catalog);

  assert.equal(s.run.secretDebt.hiddenShifts,50);
  assert.ok(s.run.endings.eligible.includes(SECRET_DEBT_BOUND_LIFE_ENDING_ID));
  assert.equal(s.run.status,'active');
  assert.equal(s.run.endings.committed,null);
});

test('Takeover requires 75 shifts and every D44 threshold; each one-below value fails independently',()=>{
  const action=catalog.definitions.actions.find(item=>item.id===SECRET_DEBT_TAKEOVER_ACTION_ID);
  assert.ok(action);
  const baseline=takeoverReadyState();
  assert.equal(secretDebtTakeoverReady(baseline),true);
  assert.equal(actionAvailable(action,baseline,catalog),true);

  const cases=[
    ['shifts',(s:Save)=>{s.run.secretDebt.hiddenShifts=74;}],
    ['endurance',(s:Save)=>{s.run.character.stats.endurance=74;}],
    ['sexuality',(s:Save)=>{s.run.character.stats.sexuality=74;}],
    ['wits',(s:Save)=>{s.run.character.stats.wits=34;}],
    ['lust',(s:Save)=>{s.run.character.lust=29;}],
    ['paid lessons',(s:Save)=>{paidLessons(s,9);}],
    ['bound state',(s:Save)=>{s.run.secretDebt.status='accepted';s.run.secretDebt.debt=0;s.run.secretDebt.boundDay=null;}]
  ] as const;

  for(const [label,mutate] of cases){
    const s=takeoverReadyState();
    mutate(s);
    assert.equal(secretDebtTakeoverReady(s),false,label);
    assert.equal(actionAvailable(action,s,catalog),false,label);
  }
});

test('explicit Takeover action resolves route, exposes ending and never auto-commits it',()=>{
  let s=takeoverReadyState();
  s=dispatch(s,{type:'action',id:SECRET_DEBT_TAKEOVER_ACTION_ID},catalog);
  assert.equal(s.run.secretDebt.status,'takeover');
  assert.equal(s.run.secretDebt.debt,0);
  assert.ok(s.run.endings.eligible.includes(SECRET_DEBT_TAKEOVER_ENDING_ID));
  assert.equal(s.run.status,'active');
  assert.equal(s.run.endings.committed,null);

  s=parseSave(JSON.stringify(s),catalog);
  assert.equal(s.run.secretDebt.status,'takeover');
  assert.equal(s.run.endings.committed,null);
});

test('Secret Debt content never writes relationship consent state and Palace access is preserved rather than created',()=>{
  const pack=rawPacks.find((item:Pack)=>item.id==='secret-debt') as Pack|undefined;
  assert.ok(pack);
  const relationshipEffects=pack.events.flatMap(event=>event.choices)
    .flatMap(choice=>choice.effects)
    .filter(effect=>[
      'incrementRelationshipCounter',
      'addRelationshipFact',
      'setRelationshipChoice',
      'advanceRelationship'
    ].includes(effect.kind));
  assert.deepEqual(relationshipEffects,[]);

  const secretActions=catalog.definitions.actions.filter(action=>action.id.startsWith('secret-debt.'));
  assert.equal(secretActions.flatMap(action=>action.effects).some(effect=>
    effect.kind==='addWorldFact'&&effect.fact===PALACE_ACCESS_FACT
  ),false);

  let s=setBound(started(),40,0);
  assert.equal(palaceHasAccess(s),false);
  s.run.progression.worldFacts.push(PALACE_ACCESS_FACT,'palace.progression-complete');
  assert.equal(palaceHasAccess(s),true);
  assert.ok(s.run.progression.worldFacts.includes('palace.progression-complete'));

  s.run.dayState.energyCurrent=3;
  s=dispatch(s,{type:'action',id:SECRET_DEBT_HIDDEN_WORK_ACTION_ID},catalog);
  assert.equal(palaceHasAccess(s),true);

  s.run.resources.money=1000;
  s=resolvePending(s);
  s=dispatch(s,{type:'endDay'},catalog);
  s=dispatch(s,{type:'choice',id:'continue'},catalog);
  s=dispatch(s,{type:'chooseLodging',id:'lodging.normal'},catalog);
  assert.equal(palaceHasAccess(s),true);
  assert.ok(s.run.progression.worldFacts.includes('palace.progression-complete'));
});

test('Secret Debt ending rewards bind exact D30/D32 ownership IDs and standard transaction ledger grants once',()=>{
  const expected=[
    [SECRET_DEBT_PAID_FREEDOM_ENDING_ID,SECRET_DEBT_REWARD_IDS.paidFreedom],
    [SECRET_DEBT_BOUND_LIFE_ENDING_ID,SECRET_DEBT_REWARD_IDS.boundLife],
    [SECRET_DEBT_TAKEOVER_ENDING_ID,SECRET_DEBT_REWARD_IDS.takeover]
  ] as const;
  for(const [endingId,rewardId] of expected){
    const ending=catalog.definitions.endings.find(item=>item.id===endingId);
    assert.ok(ending);
    assert.deepEqual(ending.metaRewards,[{kind:'unlock',rewardId,unlock:rewardId}]);
  }

  let s=setBound(started(),10,0);
  s.run.resources.money=20000;
  s=dispatch(s,{type:'action',id:SECRET_DEBT_REPAY_ACTION_ID},catalog);
  s=dispatch(s,{type:'commitEnding',id:SECRET_DEBT_PAID_FREEDOM_ENDING_ID},catalog);
  s=resolvePending(s);
  s=dispatch(s,{type:'completeEnding'},catalog);

  assert.equal(s.meta.unlocks.filter(id=>id===SECRET_DEBT_REWARD_IDS.paidFreedom).length,1);
  assert.deepEqual(s.run.endings.result?.appliedMetaRewardIds,[SECRET_DEBT_REWARD_IDS.paidFreedom]);
  assert.equal(s.meta.appliedResultTransactions.length,1);

  const after=dispatch(s,{type:'completeEnding'},catalog);
  assert.equal(after.meta.unlocks.filter(id=>id===SECRET_DEBT_REWARD_IDS.paidFreedom).length,1);
  assert.equal(after.meta.appliedResultTransactions.length,1);
});

test('stale Bound Life eligibility cannot be committed after explicit repayment or Takeover changes the route outcome',()=>{
  let paid=setBound(started(),40,50);
  paid.run.resources.money=20000;
  paid=dispatch(paid,{type:'action',id:SECRET_DEBT_HIDDEN_WORK_ACTION_ID},catalog);
  assert.ok(paid.run.endings.eligible.includes(SECRET_DEBT_BOUND_LIFE_ENDING_ID));
  paid=dispatch(paid,{type:'action',id:SECRET_DEBT_REPAY_ACTION_ID},catalog);
  assert.throws(
    ()=>dispatch(paid,{type:'commitEnding',id:SECRET_DEBT_BOUND_LIFE_ENDING_ID},catalog),
    /больше не соответствует/i
  );

  let takeover=takeoverReadyState();
  takeover.run.endings.eligible.push(SECRET_DEBT_BOUND_LIFE_ENDING_ID);
  takeover=dispatch(takeover,{type:'action',id:SECRET_DEBT_TAKEOVER_ACTION_ID},catalog);
  assert.throws(
    ()=>dispatch(takeover,{type:'commitEnding',id:SECRET_DEBT_BOUND_LIFE_ENDING_ID},catalog),
    /больше не соответствует/i
  );
});

test('Secret Debt actions are player-facing in existing UI panels and required route copy is bilingual',()=>{
  const app=readFileSync('src/ui/app.ts','utf8');
  assert.match(app,/actionList\(\['secret-debt\.hidden-work'\]\)/);
  assert.match(app,/actionList\(\['secret-debt\.repay','secret-debt\.takeover'\]\)/);
  assert.match(app,/state\.run\.secretDebt\.debt/);

  const strings=JSON.parse(readFileSync('content/localization.json','utf8')).strings as Record<string,{ru:string;en?:string}>;
  const required=[
    'action.secret-debt.hidden-work.label',
    'action.secret-debt.repay.label',
    'action.secret-debt.takeover.label',
    'event.secret-debt.lender-encounter.title',
    'event.secret-debt.trap-activation.title',
    'event.secret-debt.forced-night.title',
    'ending.ending.secret-debt.paid-freedom.title',
    'ending.ending.secret-debt.bound-life.title',
    'ending.ending.secret-debt.takeover.title'
  ];
  for(const key of required){
    assert.ok(strings[key]?.ru.trim(),key+' RU');
    assert.ok(strings[key]?.en?.trim(),key+' EN');
  }
});

test('schema-v5 saves from before Secret Debt runtime migrate by default to a clean unseen route state',()=>{
  const original=started();
  const raw=JSON.parse(JSON.stringify(original));
  delete raw.run.secretDebt;

  const migrated=parseSave(JSON.stringify(raw),catalog);
  assert.deepEqual(migrated.run.secretDebt,{
    status:'unseen',
    acceptedDay:null,
    trapDay:null,
    boundDay:null,
    resolvedDay:null,
    debt:0,
    hiddenShifts:0,
    grantApplied:false,
    lastLenderAttemptDay:null
  });
});
