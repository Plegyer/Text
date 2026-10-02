import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

import {actionAvailable,applyEffects,dispatch,eventChance,parseSave} from '../src/core/engine.ts';
import {ordinaryHardWorkCareers,type Catalog,type Save} from '../src/core/schema.ts';
import {presentationIdForActionResult,presentationIdForEnding,presentationIdForEvent,presentationSlots} from '../src/core/presentation.ts';
import {
  SECRET_DEBT_ACTIVATION_DELAY_DAYS,
  SECRET_DEBT_FORCED_NIGHT_ENERGY_DELTA,
  SECRET_DEBT_HARD_WORK_SHIFTS,
  SECRET_DEBT_LENDER_CHANCE,
  SECRET_DEBT_OFFER_AMOUNT,
  SECRET_DEBT_PRINCIPAL,
  SECRET_DEBT_REQUIRED_PAID_SCHOOL_LESSONS,
  SECRET_DEBT_SHIFT_STAT_GAINS,
  SECRET_DEBT_TAKEOVER_GATES,
  SECRET_DEBT_WAGE_INPUTS,
  SECRET_DEBT_WAGE_POLICY,
  secretDebtAcceptanceDay,
  secretDebtBlocksSourceDomain,
  secretDebtCurrentDebt,
  secretDebtIsBound,
  secretDebtPaidSchoolLessons,
  secretDebtTakeoverNumericGatesReady,
  secretDebtTakeoverStructuralReady,
  secretDebtWageDefinition,
  secretDebtWagePolicyReady
} from '../src/core/secretDebt.ts';
import {catalog,started} from './helpers.ts';

const secretPack=JSON.parse(readFileSync('content/packs/secret-debt.json','utf8'));
const localization=JSON.parse(readFileSync('content/localization.json','utf8'));
const secretCatalog={...catalog,events:catalog.events.filter(event=>event.sourceDomain==='secret-debt')} as Catalog;

function directBound(input:Save=started()){
  let s=applyEffects(input,[{kind:'advanceCareer',career:'secret-debt',transition:'accept-offer'}],secretCatalog);
  s.run.progression.careers['secret-debt']!.counters.accepted_day=s.run.day;
  s=applyEffects(s,[{kind:'advanceCareer',career:'secret-debt',transition:'activate-bound'}],secretCatalog);
  return s;
}

function streetNight(seed:number){
  let s=started();
  s.run.rng=seed;
  s=dispatch(s,{type:'endDay'},secretCatalog);
  s=dispatch(s,{type:'chooseLodging',id:'lodging.street'},secretCatalog);
  return s;
}

function finishOrdinaryNight(input:Save){
  let s=dispatch(input,{type:'endDay'},secretCatalog);
  s=dispatch(s,{type:'chooseLodging',id:'lodging.normal'},secretCatalog);
  assert.equal(s.run.pending,null);
  return dispatch(s,{type:'chooseNightChoice',id:'night.sleep'},secretCatalog);
}

function acceptedAtDayZero(){
  let s=streetNight(1972); // first resolver roll is < 0.20
  assert.equal(s.run.pending?.eventId,'secret-debt.lender-encounter');
  s=dispatch(s,{type:'choice',id:'accept'},secretCatalog);
  return s;
}

function naturallyActivate(){
  let s=acceptedAtDayZero();
  s=dispatch(s,{type:'chooseNightChoice',id:'night.sleep'},secretCatalog);
  assert.equal(s.run.day,1);
  for(let targetDay=2;targetDay<=9;targetDay++){
    s=finishOrdinaryNight(s);
    assert.equal(s.run.day,targetDay);
    assert.equal(s.run.progression.careers['secret-debt']?.stage,'accepted');
  }
  s=finishOrdinaryNight(s);
  assert.equal(s.run.day,10);
  assert.equal(s.run.progression.careers['secret-debt']?.stage,'bound');
  assert.equal(s.run.pending?.eventId,'secret-debt.activation');
  return s;
}

test('D19 constants are locked while balance-owned numbers remain explicit seams',()=>{
  assert.equal(SECRET_DEBT_LENDER_CHANCE,0.20);
  assert.equal(SECRET_DEBT_OFFER_AMOUNT,2000);
  assert.equal(SECRET_DEBT_ACTIVATION_DELAY_DAYS,10);
  assert.equal(SECRET_DEBT_PRINCIPAL,20000);
  assert.equal(SECRET_DEBT_FORCED_NIGHT_ENERGY_DELTA,-1);
  assert.equal(SECRET_DEBT_HARD_WORK_SHIFTS,50);
  assert.equal(SECRET_DEBT_REQUIRED_PAID_SCHOOL_LESSONS,10);

  const encounter=secretPack.events.find((event:any)=>event.id==='secret-debt.lender-encounter');
  assert.deepEqual(encounter.chance,{base:0.2,stat:'lust',perPoint:0,max:0.2});
  const accept=encounter.choices.find((choice:any)=>choice.id==='accept');
  assert.ok(accept.effects.some((effect:any)=>effect.kind==='modifyResource'&&effect.resource==='money'&&effect.delta===2000));

  const forced=secretPack.events.find((event:any)=>event.id==='secret-debt.forced-night-work');
  assert.ok(forced.choices.flatMap((choice:any)=>choice.effects).some((effect:any)=>
    effect.kind==='addNextDayModifier'&&effect.energyDelta===-1
  ));

  const shift=catalog.definitions.actions.find(action=>action.id==='secret-debt.shift')!;
  assert.equal(shift.wage,undefined,'exact wage coefficients remain balance-owned');
  assert.equal(shift.seasonal,undefined,'exact shift stat gains remain balance-owned');
  assert.deepEqual(SECRET_DEBT_SHIFT_STAT_GAINS,{strength:null,endurance:null,sexuality:null});
  assert.deepEqual(SECRET_DEBT_WAGE_INPUTS,['strength','endurance','lust']);
  assert.deepEqual(SECRET_DEBT_WAGE_POLICY,{base:null,strengthFactor:null,enduranceFactor:null,lustFactor:null});
  assert.deepEqual(SECRET_DEBT_TAKEOVER_GATES,{statThresholds:null,lustThreshold:null});
  assert.equal(secretDebtWagePolicyReady(),false);
  assert.equal(secretDebtWageDefinition(),undefined);
  assert.equal(secretDebtTakeoverNumericGatesReady(),false);

  for(const ending of catalog.definitions.endings.filter(ending=>ending.id.startsWith('ending.secret-debt.'))){
    assert.deepEqual(ending.metaRewards,[],'Secret Debt ending Meta rewards remain balance-owned');
  }
});

test('flat 20% street lender chance is RNG-stable across reload and refusal closes the life route',()=>{
  const encounter=catalog.events.find(event=>event.id==='secret-debt.lender-encounter')!;
  const lowLust=started();lowLust.run.character.lust=0;
  const highLust=started();highLust.run.character.lust=100;
  assert.equal(eventChance(encounter,lowLust),0.20);
  assert.equal(eventChance(encounter,highLust),0.20);

  let miss=streetNight(0); // first roll ~= 0.236 > 0.20
  assert.equal(miss.run.pending,null);
  assert.equal(miss.run.flow.night?.phase,'VoluntaryNightChoice');
  const missRng=miss.run.rng;
  miss=parseSave(JSON.stringify(miss),secretCatalog);
  assert.equal(miss.run.rng,missRng);
  assert.equal(miss.run.pending,null);
  assert.equal(miss.run.flow.night?.phase,'VoluntaryNightChoice');
  assert.equal(miss.run.history['secret-debt.lender-encounter'],undefined);

  let refused=streetNight(1972); // first roll ~= 0.00032 < 0.20
  assert.equal(refused.run.pending?.eventId,'secret-debt.lender-encounter');
  const pendingRng=refused.run.rng;
  refused=parseSave(JSON.stringify(refused),secretCatalog);
  assert.equal(refused.run.rng,pendingRng);
  assert.equal(refused.run.pending?.eventId,'secret-debt.lender-encounter');

  refused=dispatch(refused,{type:'choice',id:'refuse'},secretCatalog);
  assert.equal(refused.run.progression.careers['secret-debt']?.stage,'refused');
  assert.equal(refused.run.history['secret-debt.lender-encounter']?.count,1);
  refused=dispatch(refused,{type:'chooseNightChoice',id:'night.sleep'},secretCatalog);
  refused.run.rng=1972;
  refused=dispatch(refused,{type:'endDay'},secretCatalog);
  refused=dispatch(refused,{type:'chooseLodging',id:'lodging.street'},secretCatalog);
  assert.notEqual(refused.run.pending?.eventId,'secret-debt.lender-encounter');
  assert.equal(refused.run.progression.careers['secret-debt']?.stage,'refused');
});

test('accept grants exactly 2000 and preserves the acceptance-day anchor without touching legacy debt',()=>{
  const before=started().run.resources.money;
  let s=acceptedAtDayZero();
  assert.equal(s.run.resources.money,before+2000);
  assert.equal(s.run.progression.careers['secret-debt']?.counters.principal_received,2000);
  assert.equal(s.run.progression.careers['secret-debt']?.stage,'accepted');
  assert.equal(secretDebtAcceptanceDay(s),0);
  assert.equal(s.run.metrics.debt,0,'Secret Debt must remain separate from the legacy generic debt metric');
  assert.equal(s.run.flow.night?.phase,'VoluntaryNightChoice');

  s=parseSave(JSON.stringify(s),secretCatalog);
  assert.equal(s.run.resources.money,before+2000);
  assert.equal(secretDebtAcceptanceDay(s),0);
  assert.equal(s.run.history['secret-debt.lender-encounter']?.count,1);
});

test('trap activates exactly ten days after acceptance and creates exactly 20000 debt once',()=>{
  let s=naturallyActivate();
  assert.equal(secretDebtAcceptanceDay(s),0);
  assert.equal(secretDebtCurrentDebt(s),20000);
  assert.equal(s.run.progression.careers['secret-debt']?.facts.includes('debt-active'),true);

  s=parseSave(JSON.stringify(s),secretCatalog);
  assert.equal(s.run.pending?.eventId,'secret-debt.activation');
  assert.equal(secretDebtCurrentDebt(s),20000);
  s=dispatch(s,{type:'choice',id:'acknowledge'},secretCatalog);
  assert.equal(s.run.pending,null);
  assert.equal(secretDebtCurrentDebt(s),20000);
  assert.equal(s.run.progression.careers['secret-debt']?.facts.includes('activation-seen'),true);
});

test('bound state domain-locks all ten ordinary professions without erasing or advancing their state',()=>{
  let s=started();
  s=applyEffects(s,[{kind:'incrementCareerCounter',career:'lumber',counter:'completed_shifts',amount:7}],secretCatalog);
  const before=structuredClone(s.run.progression.careers.lumber);
  s=directBound(s);
  assert.equal(secretDebtIsBound(s),true);

  for(const career of ordinaryHardWorkCareers){
    const action=catalog.definitions.actions.find(candidate=>candidate.id===`${career}.shift`)!;
    assert.equal(actionAvailable(action,s,secretCatalog),false,`${career}.shift`);
  }
  assert.equal(secretDebtBlocksSourceDomain(s,'lumber'),true);
  assert.equal(secretDebtBlocksSourceDomain(s,'lumber.foreman'),true);
  assert.equal(secretDebtBlocksSourceDomain(s,'school'),false);

  const blockedWrite=applyEffects(s,[
    {kind:'incrementCareerCounter',career:'lumber',counter:'completed_shifts',amount:5},
    {kind:'addCareerFact',career:'lumber',fact:'should-not-progress'}
  ],secretCatalog);
  assert.deepEqual(blockedWrite.run.progression.careers.lumber,before);

  s.run.availableEndings.push('ending.lumber.hard-work');
  assert.throws(
    ()=>dispatch(s,{type:'commitEnding',id:'ending.lumber.hard-work'},secretCatalog),
    /связывающ.*долг/i
  );
  assert.deepEqual(s.run.progression.careers.lumber,before);
});

test('School and Large Activity remain available while bound, without a repeatable 20000-money Activity reward',()=>{
  let school=directBound(started());
  school.run.resources.money=10000;
  const schoolBefore=secretDebtPaidSchoolLessons(school);
  school=dispatch(school,{type:'schoolLesson',id:'school.course.literacy_and_numbers'},secretCatalog);
  assert.equal(secretDebtPaidSchoolLessons(school),schoolBefore+1);
  assert.equal(school.run.progression.careers['secret-debt']?.stage,'bound');

  let activity=directBound(started());
  activity=dispatch(activity,{type:'enterActivity',id:'lumber.forest'},secretCatalog);
  assert.equal(activity.run.flow.activity?.activityId,'lumber.forest');
  activity=dispatch(activity,{type:'activityAction',id:'escape'},secretCatalog);
  assert.equal(activity.run.flow.activity,null);
  assert.equal(activity.run.progression.careers['secret-debt']?.stage,'bound');

  const hugeRepeatableMoney=catalog.definitions.activities.flatMap(definition=>definition.results)
    .flatMap(result=>result.effects)
    .some(effect=>effect.kind==='modifyResource'&&effect.resource==='money'&&effect.delta>=20000);
  assert.equal(hugeRepeatableMoney,false);
});

test('forced Night happens every bound night, suppresses voluntary Night, and applies next-day Energy -1 exactly once',()=>{
  let s=naturallyActivate();
  s=dispatch(s,{type:'choice',id:'acknowledge'},secretCatalog);
  const lustBefore=s.run.character.lust;

  for(let expectedCount=1;expectedCount<=2;expectedCount++){
    s=dispatch(s,{type:'endDay'},secretCatalog);
    s=dispatch(s,{type:'chooseLodging',id:'lodging.normal'},secretCatalog);
    assert.equal(s.run.pending?.eventId,'secret-debt.forced-night-work');
    assert.equal(s.run.flow.night?.suppressVoluntaryMenu,true);
    assert.equal(s.run.flow.night?.consumesNight,true);

    s=parseSave(JSON.stringify(s),secretCatalog);
    assert.equal(s.run.pending?.eventId,'secret-debt.forced-night-work');
    s=dispatch(s,{type:'choice',id:'finish'},secretCatalog);
    assert.equal(s.run.progression.careers['secret-debt']?.counters.forced_night_work,expectedCount);
    assert.equal(s.run.flow.night,null);
    assert.equal(s.run.dayState.energyCurrent,2);
    assert.equal(s.run.character.lust,lustBefore,'forced Night must not increase Lust');
  }
});

test('repayment is one explicit all-at-once 20000 action that releases the profession lock',()=>{
  let s=directBound(started());
  const repay=catalog.definitions.actions.find(action=>action.id==='secret-debt.repay')!;
  s.run.resources.money=19999;
  assert.equal(actionAvailable(repay,s,secretCatalog),false);
  assert.throws(()=>dispatch(s,{type:'action',id:'secret-debt.repay'},secretCatalog),/Условия действия/);

  s.run.resources.money=20000;
  assert.equal(actionAvailable(repay,s,secretCatalog),true);
  s=dispatch(s,{type:'action',id:'secret-debt.repay'},secretCatalog);
  assert.equal(s.run.resources.money,0);
  assert.equal(secretDebtCurrentDebt(s),0);
  assert.equal(s.run.progression.careers['secret-debt']?.stage,'resolved-paid');
  assert.ok(s.run.endings.eligible.includes('ending.secret-debt.paid-freedom'));
  assert.equal(secretDebtIsBound(s),false);

  const lumber=catalog.definitions.actions.find(action=>action.id==='lumber.shift')!;
  assert.equal(actionAvailable(lumber,s,secretCatalog),true);

  s=parseSave(JSON.stringify(s),secretCatalog);
  s=dispatch(s,{type:'commitEnding',id:'ending.secret-debt.paid-freedom'},secretCatalog);
  s=dispatch(s,{type:'completeEnding'},secretCatalog);
  assert.equal(s.run.endings.result?.endingId,'ending.secret-debt.paid-freedom');
  assert.deepEqual(s.run.endings.result?.appliedMetaRewardIds,[]);
});

test('50 daytime shifts unlock Bound Life eligibility but do not release the binding lock',()=>{
  let s=directBound(started());
  s=applyEffects(s,[{kind:'incrementCareerCounter',career:'secret-debt',counter:'completed_shifts',amount:49}],secretCatalog);
  s=dispatch(s,{type:'action',id:'secret-debt.shift'},secretCatalog);
  assert.equal(s.run.progression.careers['secret-debt']?.counters.completed_shifts,50);
  assert.ok(s.run.endings.eligible.includes('ending.secret-debt.bound-life'));
  assert.equal(s.run.progression.careers['secret-debt']?.stage,'bound');
  assert.equal(secretDebtIsBound(s),true);
  assert.equal(s.run.pending?.eventId,'secret-debt.bound-life-milestone');

  s=dispatch(s,{type:'choice',id:'continue'},secretCatalog);
  assert.equal(s.run.progression.careers['secret-debt']?.stage,'bound');
  const lumber=catalog.definitions.actions.find(action=>action.id==='lumber.shift')!;
  assert.equal(actionAvailable(lumber,s,secretCatalog),false);

  s=dispatch(s,{type:'commitEnding',id:'ending.secret-debt.bound-life'},secretCatalog);
  s=dispatch(s,{type:'completeEnding'},secretCatalog);
  assert.equal(s.run.endings.result?.endingId,'ending.secret-debt.bound-life');
  assert.equal((s.meta.hardWorkProgress as string[]).includes('secret-debt'),false);
  assert.deepEqual(s.run.endings.result?.appliedMetaRewardIds,[]);
});

test('Takeover has a separate explicit action with 50-shift, 10-paid-School, build and Lust gates',()=>{
  let s=directBound(started());
  s=applyEffects(s,[{kind:'incrementCareerCounter',career:'secret-debt',counter:'completed_shifts',amount:50}],secretCatalog);
  const takeover=catalog.definitions.actions.find(action=>action.id==='secret-debt.takeover')!;

  s.run.actionCounts.school=9;
  assert.equal(secretDebtTakeoverStructuralReady(s),false);
  assert.equal(actionAvailable(takeover,s,secretCatalog),false);

  s.run.actionCounts.school=10;
  assert.equal(secretDebtTakeoverStructuralReady(s),true);
  assert.equal(actionAvailable(takeover,s,secretCatalog),false,'numeric build/Lust seams are still unresolved');

  s=applyEffects(s,[
    {kind:'addCareerFact',career:'secret-debt',fact:'takeover-build-authorized'},
    {kind:'addCareerFact',career:'secret-debt',fact:'takeover-lust-authorized'}
  ],secretCatalog);
  assert.equal(actionAvailable(takeover,s,secretCatalog),true);

  s=dispatch(s,{type:'action',id:'secret-debt.takeover'},secretCatalog);
  assert.equal(s.run.progression.careers['secret-debt']?.stage,'resolved-takeover');
  assert.equal(s.run.progression.careers['secret-debt']?.choices['outcome-route'],'takeover');
  assert.ok(s.run.endings.eligible.includes('ending.secret-debt.takeover'));
  assert.equal(secretDebtIsBound(s),false);
});

test('Secret Debt presentation IDs and RU EN surfaces remain stable',()=>{
  const shiftId=presentationIdForActionResult(catalog,'secret-debt.shift',['stage.room']);
  const encounterId=presentationIdForEvent(catalog,'secret-debt.lender-encounter','default');
  const paidEndingId=presentationIdForEnding('ending.secret-debt.paid-freedom');
  assert.equal(shiftId,'job/secret-debt/result/default');
  assert.equal(encounterId,'job/secret-debt/event/secret-debt-lender-encounter/default');
  assert.equal(paidEndingId,'ending/secret-debt/paid-freedom');

  const slots=new Map(presentationSlots(catalog).map(slot=>[slot.id,slot] as const));
  assert.equal(slots.get(shiftId)?.baseMediaIds.includes('stage.room'),true);
  assert.equal(slots.get(encounterId)?.fallbackId,shiftId);
  assert.equal(slots.get(paidEndingId)?.fallbackId,'location/town/default');
  assert.equal(slots.has('ending/secret-debt/hard-work'),false);

  const keys=[
    'ui.secretDebt.currentDebt',
    'ui.secretDebt.ordinaryWorkLocked',
    'ui.secretDebt.ordinaryEndingLocked',
    'action.secret-debt.shift.label',
    'action.secret-debt.repay.label',
    'action.secret-debt.takeover.label',
    'event.secret-debt.lender-encounter.title',
    'event.secret-debt.activation.title',
    'event.secret-debt.forced-night-work.title',
    'event.secret-debt.bound-life-milestone.title',
    'ending.ending.secret-debt.paid-freedom.title',
    'ending.ending.secret-debt.bound-life.title',
    'ending.ending.secret-debt.takeover.title'
  ];
  for(const key of keys){
    assert.ok(localization.strings[key]?.ru?.trim(),`${key} RU`);
    assert.ok(localization.strings[key]?.en?.trim(),`${key} EN`);
  }
});
