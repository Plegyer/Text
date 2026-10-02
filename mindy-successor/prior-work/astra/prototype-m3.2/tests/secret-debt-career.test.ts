import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

import {actionAvailable,actionCost,applyEffects,dispatch,eligible,parseSave,resolveReactions} from '../src/core/engine.ts';
import {ordinaryHardWorkCareers,type Save} from '../src/core/schema.ts';
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
  SECRET_DEBT_WAGE_POLICY,
  secretDebtAcceptanceDay,
  secretDebtBlocksOrdinaryAction,
  secretDebtCurrentDebt,
  secretDebtIsBound,
  secretDebtTakeoverStructuralReady,
  secretDebtShiftStatGainsReady,
  secretDebtShiftTuningReady,
  secretDebtTakeoverNumericGatesReady,
  secretDebtWagePolicyReady
} from '../src/core/secretDebt.ts';
import {catalog,started} from './helpers.ts';

const secretPack=JSON.parse(readFileSync('content/packs/secret-debt.json','utf8'));
const localization=JSON.parse(readFileSync('content/localization.json','utf8'));
const secretDebtCatalog={...catalog,events:catalog.events.filter(event=>event.sourceDomain==='secret-debt')};

function directAccepted(input:Save,acceptedDay=0){
  return applyEffects(input,[
    {kind:'advanceCareer',career:'secret-debt',transition:'accept-offer'},
    {kind:'incrementCareerCounter',career:'secret-debt',counter:'accepted_day',amount:acceptedDay}
  ],catalog);
}

function directBound(input:Save){
  return applyEffects(directAccepted(input),[
    {kind:'advanceCareer',career:'secret-debt',transition:'activate-bound'}
  ],catalog);
}

function finishOrdinaryNight(input:Save,lodging='lodging.normal'){
  let s=dispatch(input,{type:'endDay'},secretDebtCatalog);
  s=dispatch(s,{type:'chooseLodging',id:lodging},secretDebtCatalog);
  if(s.run.pending)return s;
  assert.equal(s.run.flow.night?.phase,'VoluntaryNightChoice');
  return dispatch(s,{type:'chooseNightChoice',id:'night.sleep'},secretDebtCatalog);
}

function finishForcedNight(input:Save){
  let s=dispatch(input,{type:'endDay'},secretDebtCatalog);
  s=dispatch(s,{type:'chooseLodging',id:'lodging.normal'},secretDebtCatalog);
  assert.equal(s.run.pending?.eventId,'secret-debt.forced-night-work');
  s=dispatch(s,{type:'choice',id:'finish'},secretDebtCatalog);
  return s;
}

function clearPending(input:Save){
  let s=input,steps=0;
  while(s.run.pending){
    if(++steps>20)throw new Error('Secret Debt test scene loop');
    const choiceId=s.run.pending.allowedChoiceIds[0];
    assert.ok(choiceId,s.run.pending.eventId);
    s=dispatch(s,{type:'choice',id:choiceId},catalog);
  }
  return s;
}

test('D19 constants are exact while balance-owned Secret Debt numbers stay explicit seams',()=>{
  assert.equal(SECRET_DEBT_LENDER_CHANCE,0.20);
  assert.equal(SECRET_DEBT_OFFER_AMOUNT,2000);
  assert.equal(SECRET_DEBT_ACTIVATION_DELAY_DAYS,10);
  assert.equal(SECRET_DEBT_PRINCIPAL,20000);
  assert.equal(SECRET_DEBT_FORCED_NIGHT_ENERGY_DELTA,-1);
  assert.equal(SECRET_DEBT_HARD_WORK_SHIFTS,50);
  assert.equal(SECRET_DEBT_REQUIRED_PAID_SCHOOL_LESSONS,10);

  const encounter=secretPack.events.find((event:any)=>event.id==='secret-debt.lender-encounter');
  assert.deepEqual(encounter.chance,{base:0.20,stat:'lust',perPoint:0,max:0.20});
  const accept=encounter.choices.find((choice:any)=>choice.id==='accept');
  assert.ok(accept.effects.some((effect:any)=>effect.kind==='modifyResource'&&effect.resource==='money'&&effect.delta===2000));

  const forced=secretPack.events.find((event:any)=>event.id==='secret-debt.forced-night-work');
  assert.ok(forced.choices.flatMap((choice:any)=>choice.effects).some((effect:any)=>
    effect.kind==='addNextDayModifier'&&effect.energyDelta===-1&&effect.tag==='secret-debt.forced-night'
  ));

  const repay=catalog.definitions.actions.find(action=>action.id==='secret-debt.repay')!;
  assert.equal(repay.cost.money,20000);
  const boundLife=catalog.definitions.endings.find(ending=>ending.id==='ending.secret-debt.bound-life')!;
  assert.ok(boundLife.conditions.some((condition:any)=>condition.kind==='careerCounter'&&condition.counter==='completed_shifts'&&condition.value===50));

  assert.deepEqual(SECRET_DEBT_SHIFT_STAT_GAINS,{strength:null,endurance:null,sexuality:null});
  assert.deepEqual(SECRET_DEBT_WAGE_POLICY,{base:null,strengthFactor:null,enduranceFactor:null,lustFactor:null});
  assert.equal(secretDebtWagePolicyReady(),false);
  assert.equal(secretDebtShiftStatGainsReady(),false);
  assert.equal(secretDebtShiftTuningReady(),false);
  assert.deepEqual(SECRET_DEBT_TAKEOVER_GATES,{statThresholds:null,lustThreshold:null});
  assert.equal(secretDebtTakeoverNumericGatesReady(),false);

  const shift=catalog.definitions.actions.find(action=>action.id==='secret-debt.shift')!;
  assert.equal(shift.wage,undefined,'exact wage coefficients are still balance-owned');
  assert.equal(shift.seasonal,undefined,'exact per-shift stat gains are still balance-owned');
  for(const ending of catalog.definitions.endings.filter(ending=>ending.id.startsWith('ending.secret-debt.'))){
    assert.deepEqual(ending.metaRewards,[],'ending Meta rewards remain Product-open');
  }
});

test('20% street lender roll is deterministic across reload and refusal closes the route for the life',()=>{
  let source=started();
  source.run.housingState.current='street';
  source.run.rng=1972; // next LCG roll is below 0.20

  const encounter=secretPack.events.find((event:any)=>event.id==='secret-debt.lender-encounter');
  const secretOnly={...catalog,events:[encounter]};
  const reloaded=parseSave(JSON.stringify(source),catalog);
  const first=resolveReactions(source,[{kind:'nightPhase',point:'after_lodging'}],secretOnly);
  const second=resolveReactions(reloaded,[{kind:'nightPhase',point:'after_lodging'}],secretOnly);
  assert.equal(first.state.run.pending?.eventId,'secret-debt.lender-encounter');
  assert.deepEqual(second.state,first.state);
  assert.deepEqual(second.trace.steps,first.trace.steps);

  let refused=dispatch(first.state,{type:'choice',id:'refuse'},secretOnly);
  assert.equal(refused.run.progression.careers['secret-debt']?.stage,'refused');
  assert.equal(refused.run.history['secret-debt.lender-encounter']?.count,1);

  refused.run.housingState.current='street';
  refused.run.rng=1972;
  const again=resolveReactions(refused,[{kind:'nightPhase',point:'after_lodging'}],secretOnly);
  assert.equal(again.state.run.pending,null);
  assert.equal(again.state.run.progression.careers['secret-debt']?.stage,'refused');
  assert.equal(again.state.run.history['secret-debt.lender-encounter']?.count,1);
});

test('lender chance is attempted only once per eligible street night even across another blocking scene',()=>{
  const encounter=secretPack.events.find((event:any)=>event.id==='secret-debt.lender-encounter');
  const otherEvent:any={
    id:'test.after-lodging-blocker',
    title:'Test blocker',
    sourceDomain:'test',
    trigger:[],
    reactionTriggers:[{kind:'nightPhase',point:'after_lodging'}],
    priorityClass:'normal_progression',
    priority:0,
    blocking:true,
    delivery:{policy:'live'},
    cooldownDays:0,
    variantCooldownDays:0,
    maxShows:1,
    conditions:[],
    variants:[{id:'default',text:'test',conditions:[],media:['stage.town']}],
    choices:[{id:'continue',label:'Continue',text:'continue',conditions:[],effects:[]}]
  };
  const local={...catalog,events:[encounter,otherEvent]};
  let s=started();
  s.run.rng=8; // first roll 0.239168... fails 20%; second roll would be 0.004197... and pass.
  s=dispatch(s,{type:'endDay'},local);
  s=dispatch(s,{type:'chooseLodging',id:'lodging.street'},local);
  assert.equal(s.run.pending?.eventId,'test.after-lodging-blocker');
  assert.equal(s.run.rng,1027220423,'exactly one lender RNG roll was consumed');
  assert.equal(s.run.flow.night?.handledEventIds.includes('secret-debt.lender-encounter'),true);

  s=dispatch(s,{type:'choice',id:'continue'},local);
  assert.equal(s.run.pending,null,'lender must not retry after the other blocker closes');
  assert.equal(s.run.flow.night?.phase,'VoluntaryNightChoice');
  assert.equal(s.run.rng,1027220423,'no second lender roll in the same night');
  assert.equal(s.run.history['secret-debt.lender-encounter'],undefined,'failed check must not consume the one-life encounter');
});

test('acceptance grants exactly 2000 once, captures acceptance day, and survives reload',()=>{
  let s=started();
  s.run.housingState.current='street';
  s.run.rng=1972;
  const encounter=secretPack.events.find((event:any)=>event.id==='secret-debt.lender-encounter');
  const secretOnly={...catalog,events:[encounter]};
  s=resolveReactions(s,[{kind:'nightPhase',point:'after_lodging'}],secretOnly).state;
  const moneyBefore=s.run.resources.money;

  s=dispatch(s,{type:'choice',id:'accept'},secretOnly);
  assert.equal(s.run.resources.money,moneyBefore+2000);
  assert.equal(s.run.progression.careers['secret-debt']?.stage,'accepted');
  assert.equal(s.run.progression.careers['secret-debt']?.counters.principal_received,2000);
  assert.equal(secretDebtAcceptanceDay(s),0);
  assert.equal(s.run.history['secret-debt.lender-encounter']?.count,1);

  const reload=parseSave(JSON.stringify(s),catalog);
  assert.equal(reload.run.resources.money,moneyBefore+2000);
  assert.equal(secretDebtAcceptanceDay(reload),0);
  assert.equal(reload.run.history['secret-debt.lender-encounter']?.count,1);
});

test('accepted route stays normal for nine days and activates exactly on day ten with 20000 debt',()=>{
  let s=directAccepted(started(),0);
  s.run.resources.money=50_000;

  for(let day=1;day<10;day++){
    s=finishOrdinaryNight(s);
    assert.equal(s.run.calendar.elapsedDays,day);
    assert.equal(s.run.progression.careers['secret-debt']?.stage,'accepted',`day ${day}`);
    assert.equal(secretDebtCurrentDebt(s),0,`day ${day}`);
    assert.equal(s.run.pending,null,`day ${day}`);
  }

  s=finishOrdinaryNight(s);
  assert.equal(s.run.calendar.elapsedDays,10);
  assert.equal(s.run.progression.careers['secret-debt']?.stage,'bound');
  assert.equal(secretDebtCurrentDebt(s),20000);
  assert.equal(s.run.pending?.eventId,'secret-debt.activation');

  const reload=parseSave(JSON.stringify(s),catalog);
  assert.equal(reload.run.calendar.elapsedDays,10);
  assert.equal(reload.run.progression.careers['secret-debt']?.stage,'bound');
  assert.equal(secretDebtCurrentDebt(reload),20000);
  assert.equal(reload.run.pending?.eventId,'secret-debt.activation');

  s=dispatch(reload,{type:'choice',id:'acknowledge'},catalog);
  assert.equal(s.run.pending,null);
  assert.equal(s.run.progression.careers['secret-debt']?.facts.includes('activation-seen'),true);
});

test('bound domain lock preserves ordinary career progress and suppresses ordinary writes and ending commit',()=>{
  let s=started();
  s=applyEffects(s,[{kind:'incrementCareerCounter',career:'lumber',counter:'completed_shifts',amount:7}],catalog);
  s.run.endings.eligible.push('ending.lumber.hard-work');
  const before=structuredClone(s.run.progression.careers.lumber);
  s=directBound(s);
  assert.equal(secretDebtIsBound(s),true);

  for(const career of ordinaryHardWorkCareers){
    const action=catalog.definitions.actions.find(candidate=>candidate.id===`${career}.shift`)!;
    assert.equal(actionAvailable(action,s,catalog),false,`${career}.shift`);
  }
  for(const legacyId of ['lumber','tavern','guard']){
    const action=catalog.definitions.actions.find(candidate=>candidate.id===legacyId)!;
    assert.ok(action,legacyId);
    assert.equal(actionAvailable(action,s,catalog),false,legacyId+' legacy profession action');
  }
  const genericTavernTalk=catalog.definitions.actions.find(candidate=>candidate.id==='tavern-talk')!;
  assert.equal(secretDebtBlocksOrdinaryAction(s,genericTavernTalk),false,'non-profession tavern-talk keeps its own story conditions');

  const afterBlockedWrite=applyEffects(s,[
    {kind:'incrementCareerCounter',career:'lumber',counter:'completed_shifts',amount:5},
    {kind:'addCareerFact',career:'lumber',fact:'secret-debt-bypass-attempt'}
  ],catalog);
  assert.deepEqual(afterBlockedWrite.run.progression.careers.lumber,before);

  const lumberEvent=catalog.events.find(event=>event.sourceDomain==='lumber')!;
  const trace=resolveReactions(s,[{kind:'dayStarted',day:s.run.day}],catalog).trace;
  assert.ok(trace.steps.includes(`reject:${lumberEvent.id}:secret-debt-domain-lock`));

  assert.throws(
    ()=>dispatch(s,{type:'commitEnding',id:'ending.lumber.hard-work'},catalog),
    /связывающ.*долг/i
  );
  assert.deepEqual(s.run.progression.careers.lumber,before);
});

test('School and Large Activity remain available while bound',()=>{
  let school=directBound(started());
  school.run.resources.money=5_000;
  school=dispatch(school,{type:'schoolLesson',id:'school.course.literacy_and_numbers'},catalog);
  assert.equal(school.run.actionCounts.school,1);
  assert.equal(school.run.progression.careers['secret-debt']?.stage,'bound');

  let activity=directBound(started());
  activity=dispatch(activity,{type:'enterActivity',id:'lumber.forest'},catalog);
  assert.equal(activity.run.flow.activity?.activityId,'lumber.forest');
  assert.equal(activity.run.progression.careers['secret-debt']?.stage,'bound');

  for(const definition of catalog.definitions.activities){
    for(const result of definition.results){
      const directMoney=result.effects
        .filter((effect:any)=>effect.kind==='modifyResource'&&effect.resource==='money')
        .reduce((sum:number,effect:any)=>sum+Math.max(0,effect.delta),0);
      assert.ok(directMoney<20000,`${definition.id}/${result.id} must not directly fund the full 20000 debt`);
    }
  }
});

test('every bound night suppresses voluntary Night and applies next-day Energy -1 exactly once across reload',()=>{
  let s=directBound(started());
  s.run.resources.money=5_000;

  s=dispatch(s,{type:'endDay'},secretDebtCatalog);
  s=dispatch(s,{type:'chooseLodging',id:'lodging.normal'},secretDebtCatalog);
  assert.equal(s.run.pending?.eventId,'secret-debt.forced-night-work');
  assert.equal(s.run.flow.night?.suppressVoluntaryMenu,true);
  assert.equal(s.run.flow.night?.consumesNight,true);

  s=parseSave(JSON.stringify(s),catalog);
  s=dispatch(s,{type:'choice',id:'finish'},secretDebtCatalog);
  assert.equal(s.run.day,1);
  assert.equal(s.run.dayState.energyCurrent,2);
  assert.equal(s.run.progression.careers['secret-debt']?.counters.forced_night_work,1);

  s=parseSave(JSON.stringify(s),catalog);
  s=finishForcedNight(s);
  assert.equal(s.run.day,2);
  assert.equal(s.run.dayState.energyCurrent,2);
  assert.equal(s.run.progression.careers['secret-debt']?.counters.forced_night_work,2);
});

test('repayment is one all-at-once 20000 action and releases the ordinary career domain',()=>{
  let s=directBound(started());
  const repay=catalog.definitions.actions.find(action=>action.id==='secret-debt.repay')!;
  s.run.resources.money=19_999;
  assert.equal(actionCost(repay,s),20_000,'Secret Debt repayment is never discounted or partial');
  assert.equal(actionAvailable(repay,s,catalog),false,'full 20000 must be on hand before repayment is available');
  assert.throws(()=>dispatch(s,{type:'action',id:'secret-debt.repay'},catalog),/Условия действия/);

  s.run.resources.money=20_000;
  assert.equal(actionCost(repay,s),20_000);
  assert.equal(actionAvailable(repay,s,catalog),true);
  s=dispatch(s,{type:'action',id:'secret-debt.repay'},catalog);

  assert.equal(s.run.resources.money,0);
  assert.equal(secretDebtCurrentDebt(s),0);
  assert.equal(s.run.progression.careers['secret-debt']?.stage,'resolved-paid');
  assert.equal(secretDebtIsBound(s),false);
  assert.ok(s.run.endings.eligible.includes('ending.secret-debt.paid-freedom'));

  const lumber=catalog.definitions.actions.find(action=>action.id==='lumber.shift')!;
  assert.equal(actionAvailable(lumber,s,catalog),true);

  s=dispatch(s,{type:'endDay'},secretDebtCatalog);
  s=dispatch(s,{type:'chooseLodging',id:'lodging.street'},secretDebtCatalog);
  assert.equal(s.run.pending?.eventId==='secret-debt.forced-night-work',false);
  assert.equal(s.run.flow.night?.phase,'VoluntaryNightChoice');
});

test('50 daytime shifts define Bound Life while open shift tuning keeps natural progression blocked',()=>{
  let s=directBound(started());
  const shift=catalog.definitions.actions.find(action=>action.id==='secret-debt.shift')!;
  assert.equal(actionAvailable(shift,s,catalog),false,'paid shift waits for wage/stat tuning');

  s=applyEffects(s,[{
    kind:'incrementCareerCounter',career:'secret-debt',counter:'completed_shifts',amount:50
  }],catalog);
  const boundLife=catalog.definitions.endings.find(ending=>ending.id==='ending.secret-debt.bound-life')!;
  assert.equal(eligible(boundLife.conditions,s,catalog),true);

  s=resolveReactions(s,[{
    kind:'careerCounterChanged',career:'secret-debt',counter:'completed_shifts',from:49,to:50
  }],catalog).state;
  assert.equal(s.run.pending?.eventId,'secret-debt.bound-life-milestone');
  assert.equal(secretDebtIsBound(s),true);
  s=dispatch(s,{type:'choice',id:'continue'},catalog);
  assert.equal(s.run.progression.careers['secret-debt']?.facts.includes('bound-life-ready'),true);

  s.run.resources.money=5_000;
  s.run.dayState.energyCurrent=3;
  s=dispatch(s,{type:'schoolLesson',id:'school.course.literacy_and_numbers'},catalog);
  s=clearPending(s);
  assert.ok(s.run.endings.eligible.includes('ending.secret-debt.bound-life'));

  s=dispatch(s,{type:'commitEnding',id:'ending.secret-debt.bound-life'},catalog);
  s=dispatch(s,{type:'completeEnding'},catalog);
  assert.equal(s.run.endings.result?.endingId,'ending.secret-debt.bound-life');
  assert.deepEqual(s.run.endings.result?.appliedMetaRewardIds,[]);
  assert.equal((s.meta.hardWorkProgress as string[]).includes('secret-debt'),false);
});

test('Takeover has locked structural gates, separate explicit action, and open numeric build/Lust seams',()=>{
  let s=directBound(started());
  s=applyEffects(s,[{
    kind:'incrementCareerCounter',career:'secret-debt',counter:'completed_shifts',amount:50
  }],catalog);
  s.run.historyState.actionCounts.school=10;

  assert.equal(secretDebtTakeoverStructuralReady(s),true);
  const takeover=catalog.definitions.actions.find(action=>action.id==='secret-debt.takeover')!;
  assert.equal(actionAvailable(takeover,s,catalog),false,'numeric build/Lust gates are not invented');

  s=applyEffects(s,[
    {kind:'addCareerFact',career:'secret-debt',fact:'takeover-build-authorized'},
    {kind:'addCareerFact',career:'secret-debt',fact:'takeover-lust-authorized'}
  ],catalog);
  assert.equal(actionAvailable(takeover,s,catalog),true);

  s=dispatch(s,{type:'action',id:'secret-debt.takeover'},catalog);
  assert.equal(s.run.progression.careers['secret-debt']?.stage,'resolved-takeover');
  assert.equal(s.run.progression.careers['secret-debt']?.choices['outcome-route'],'takeover');
  assert.ok(s.run.endings.eligible.includes('ending.secret-debt.takeover'));
  assert.equal(secretDebtIsBound(s),false);
});

test('Secret Debt presentation IDs, fallback media, and RU/EN production surfaces stay stable',()=>{
  const shiftId=presentationIdForActionResult(catalog,'secret-debt.shift',['stage.room']);
  const repayId=presentationIdForActionResult(catalog,'secret-debt.repay',['stage.town']);
  const takeoverId=presentationIdForActionResult(catalog,'secret-debt.takeover',['stage.town']);
  const encounterId=presentationIdForEvent(catalog,'secret-debt.lender-encounter','default');
  const paidEndingId=presentationIdForEnding('ending.secret-debt.paid-freedom');
  assert.equal(shiftId,'job/secret-debt/result/default');
  assert.equal(repayId,'job/secret-debt/result/repayment');
  assert.equal(takeoverId,'job/secret-debt/result/takeover');
  assert.equal(encounterId,'job/secret-debt/event/secret-debt-lender-encounter/default');
  assert.equal(paidEndingId,'ending/secret-debt/paid-freedom');

  const slots=new Map(presentationSlots(catalog).map(slot=>[slot.id,slot] as const));
  assert.equal(slots.get(shiftId)?.baseMediaIds.includes('stage.room'),true);
  assert.equal(slots.get(repayId)?.baseMediaIds.includes('stage.town'),true);
  assert.equal(slots.get(takeoverId)?.baseMediaIds.includes('stage.town'),true);
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
    assert.equal(typeof localization.strings[key]?.ru,'string',`${key} RU`);
    assert.equal(typeof localization.strings[key]?.en,'string',`${key} EN`);
    assert.ok(localization.strings[key].ru.length>0,`${key} RU non-empty`);
    assert.ok(localization.strings[key].en.length>0,`${key} EN non-empty`);
  }
});
