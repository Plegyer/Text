import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {actionAvailable,applyEffects,dispatch,parseSave,resolveReactions} from '../src/core/engine.ts';
import {ordinaryHardWorkCareers,type Save} from '../src/core/schema.ts';
import {presentationIdForActionResult,presentationIdForEnding,presentationIdForEvent,presentationSlots} from '../src/core/presentation.ts';
import {secretDebtAcceptanceDay,secretDebtIsBound} from '../src/core/secretDebt.ts';
import {catalog,started} from './helpers.ts';

const secretPack=JSON.parse(readFileSync('content/packs/secret-debt.json','utf8'));
const localization=JSON.parse(readFileSync('content/localization.json','utf8'));

function authorizeOffer(input:Save){
  return applyEffects(input,[
    {kind:'addCareerFact',career:'secret-debt',fact:'encounter-authorized'},
    {kind:'advanceCareer',career:'secret-debt',transition:'surface-offer'}
  ],catalog);
}
function acceptWithoutEncounter(input:Save){
  return applyEffects(authorizeOffer(input),[
    {kind:'advanceCareer',career:'secret-debt',transition:'accept-offer'}
  ],catalog);
}
function bind(input:Save){
  return applyEffects(acceptWithoutEncounter(input),[
    {kind:'addCareerFact',career:'secret-debt',fact:'activation-authorized'},
    {kind:'advanceCareer',career:'secret-debt',transition:'activate-bound'}
  ],catalog);
}
function addFact(input:Save,fact:string){
  return applyEffects(input,[{kind:'addCareerFact',career:'secret-debt',fact}],catalog);
}
function reactToCareerFact(input:Save,fact:string){
  return resolveReactions(input,[{kind:'careerFactAdded',career:'secret-debt',fact}],catalog).state;
}

test('Secret Debt stays hidden and virtual before the one-time encounter is authorized',()=>{
  const s=started();
  assert.equal(s.run.progression.careers['secret-debt'],undefined);
  const shift=catalog.definitions.actions.find(action=>action.id==='secret-debt.shift')!;
  assert.equal(actionAvailable(shift,s,catalog),false);
  assert.equal(s.run.endings.eligible.some(id=>id.startsWith('ending.secret-debt.')),false);
});

test('Secret Debt keeps every still-open Product number absent from production data',()=>{
  const encounter=secretPack.events.find((event:any)=>event.id==='secret-debt.lender-encounter');
  const forcedNight=secretPack.events.find((event:any)=>event.id==='secret-debt.forced-night-work');
  const shift=catalog.definitions.actions.find(action=>action.id==='secret-debt.shift')!;

  assert.equal(encounter.chance,undefined,'trigger probability must stay Product-open');
  const accept=encounter.choices.find((choice:any)=>choice.id==='accept');
  assert.equal(accept.effects.some((effect:any)=>effect.kind==='modifyResource'&&effect.resource==='money'),false,'offer amount must stay Product-open');
  assert.equal(accept.effects.some((effect:any)=>effect.kind==='metric'&&effect.key==='debt'),false,'generic legacy debt must not become Secret Debt principal');

  const forcedEffects=forcedNight.choices.flatMap((choice:any)=>choice.effects);
  assert.equal(forcedEffects.some((effect:any)=>effect.kind==='addNextDayModifier'),false,'forced Night Energy penalty must stay Product-open');
  assert.equal(shift.seasonal,undefined,'exact Secret Debt stat gains must stay Product-open');
  for(const ending of catalog.definitions.endings.filter(ending=>ending.id.startsWith('ending.secret-debt.'))){
    assert.deepEqual(ending.metaRewards,[],'Secret Debt Meta rewards must stay Product-open');
  }

  const serialized=JSON.stringify({encounter,forcedNight,shift});
  assert.equal(serialized.includes('20000'),false);
  assert.equal(serialized.includes('2000'),false);
  assert.equal(/10\s*days?/i.test(serialized),false);
});

test('Secret Debt has stable career presentation IDs and bilingual authored surfaces',()=>{
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
  assert.equal(slots.has('ending/secret-debt/hard-work'),false,'Secret Debt must not expose an ordinary Hard Work presentation identity');

  const keys=[
    'ui.secretDebt.ordinaryWorkLocked',
    'action.secret-debt.shift.label',
    'action.secret-debt.shift.description',
    'event.secret-debt.lender-encounter.title',
    'event.secret-debt.forced-night-work.title',
    'event.secret-debt.outcome.paid-freedom.title',
    'event.secret-debt.outcome.bound-life.title',
    'event.secret-debt.outcome.takeover.title',
    'ending.ending.secret-debt.paid-freedom.title',
    'ending.ending.secret-debt.paid-freedom.epilogue',
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

test('street encounter is one-shot and records accept/refuse without inventing the loan amount',()=>{
  let accepted=authorizeOffer(started());
  accepted=dispatch(accepted,{type:'endDay'},catalog);
  accepted=dispatch(accepted,{type:'chooseLodging',id:'lodging.street'},catalog);
  assert.equal(accepted.run.pending?.eventId,'secret-debt.lender-encounter');
  const moneyBefore=accepted.run.resources.money;
  accepted=dispatch(accepted,{type:'choice',id:'accept'},catalog);
  assert.equal(accepted.run.progression.careers['secret-debt']?.stage,'accepted');
  assert.equal(accepted.run.progression.careers['secret-debt']?.choices['encounter-response'],'accepted');
  assert.equal(secretDebtAcceptanceDay(accepted),0);
  assert.equal(accepted.run.resources.money,moneyBefore);
  assert.equal(accepted.run.history['secret-debt.lender-encounter']?.count,1);
  assert.equal(accepted.run.flow.night?.phase,'VoluntaryNightChoice','the offer itself must not consume the Night slot');

  let refused=authorizeOffer(started());
  refused=dispatch(refused,{type:'endDay'},catalog);
  refused=dispatch(refused,{type:'chooseLodging',id:'lodging.street'},catalog);
  refused=dispatch(refused,{type:'choice',id:'refuse'},catalog);
  assert.equal(refused.run.progression.careers['secret-debt']?.stage,'refused');
  assert.equal(refused.run.progression.careers['secret-debt']?.choices['encounter-response'],'refused');
  assert.equal(refused.run.history['secret-debt.lender-encounter']?.count,1);
  assert.equal(refused.run.flow.night?.phase,'VoluntaryNightChoice');

  const reloaded=parseSave(JSON.stringify(refused),catalog);
  assert.equal(reloaded.run.progression.careers['secret-debt']?.stage,'refused');
  assert.equal(reloaded.run.history['secret-debt.lender-encounter']?.count,1);
});

test('authorized delayed-trap activation persists as a distinct bound transition scene',()=>{
  let s=acceptWithoutEncounter(started());
  s=applyEffects(s,[
    {kind:'addCareerFact',career:'secret-debt',fact:'activation-authorized'},
    {kind:'advanceCareer',career:'secret-debt',transition:'activate-bound'}
  ],catalog);
  s=resolveReactions(s,[{kind:'careerTransition',career:'secret-debt',from:'accepted',to:'bound'}],catalog).state;
  assert.equal(s.run.progression.careers['secret-debt']?.stage,'bound');
  assert.equal(s.run.pending?.eventId,'secret-debt.activation');

  s=parseSave(JSON.stringify(s),catalog);
  assert.equal(s.run.pending?.eventId,'secret-debt.activation');
  s=dispatch(s,{type:'choice',id:'acknowledge'},catalog);
  assert.equal(s.run.progression.careers['secret-debt']?.facts.includes('activation-seen'),true);
  assert.equal(s.run.pending,null);
});

test('bound activation locks all ten ordinary shifts without deleting their progress',()=>{
  let s=started();
  s=applyEffects(s,[{kind:'incrementCareerCounter',career:'lumber',counter:'completed_shifts',amount:1}],catalog);
  const lumberBefore=s.run.progression.careers.lumber!.counters.completed_shifts;
  s=bind(s);
  assert.equal(secretDebtIsBound(s),true);

  for(const career of ordinaryHardWorkCareers){
    const action=catalog.definitions.actions.find(candidate=>candidate.id===`${career}.shift`)!;
    assert.ok(action,`${career}.shift`);
    assert.equal(actionAvailable(action,s,catalog),false,`${career}.shift must be locked while bound`);
  }
  const boundShift=catalog.definitions.actions.find(action=>action.id==='secret-debt.shift')!;
  assert.equal(actionAvailable(boundShift,s,catalog),true);

  const statsBefore=structuredClone(s.run.character.stats);
  const energyBefore=s.run.dayState.energyCurrent;
  s=dispatch(s,{type:'action',id:'secret-debt.shift'},catalog);
  assert.equal(s.run.progression.careers['secret-debt']?.counters.completed_shifts,1);
  assert.equal(s.run.dayState.energyCurrent,energyBefore-1);
  assert.deepEqual(s.run.character.stats,statsBefore,'exact stat gains remain intentionally absent');
  assert.equal(s.run.progression.careers.lumber!.counters.completed_shifts,lumberBefore,'ordinary progress must survive the lock');
});

test('bound state forces NightFlow after lodging and reload cannot duplicate the night',()=>{
  let s=bind(started());
  s=dispatch(s,{type:'endDay'},catalog);
  s=dispatch(s,{type:'chooseLodging',id:'lodging.normal'},catalog);
  assert.equal(s.run.pending?.eventId,'secret-debt.forced-night-work');
  assert.equal(s.run.flow.night?.phase,'NightEventResolution');
  assert.equal(s.run.flow.night?.suppressVoluntaryMenu,true);
  assert.equal(s.run.flow.night?.consumesNight,true);
  assert.equal(s.run.resources.money,500);

  s=parseSave(JSON.stringify(s),catalog);
  assert.equal(s.run.pending?.eventId,'secret-debt.forced-night-work');
  s=dispatch(s,{type:'choice',id:'finish'},catalog);
  assert.equal(s.run.progression.careers['secret-debt']?.counters.forced_night_work,1);
  assert.equal(s.run.flow.night,null);
  assert.equal(s.run.day,1);
  assert.equal(s.run.resources.money,500,'lodging payment must not repeat after reload');
  assert.equal(s.run.dayState.energyCurrent,3,'Product-open forced-night Energy penalty is not guessed');

  s=parseSave(JSON.stringify(s),catalog);
  assert.equal(s.run.progression.careers['secret-debt']?.counters.forced_night_work,1);
});

test('Paid Freedom, Bound Life and Takeover resolve through distinct gates and common ending lifecycle',()=>{
  const cases=[
    {
      eventId:'secret-debt.outcome.paid-freedom',
      choiceId:'leave',
      stage:'resolved-paid',
      endingId:'ending.secret-debt.paid-freedom',
      facts:['debt-cleared']
    },
    {
      eventId:'secret-debt.outcome.bound-life',
      choiceId:'remain',
      stage:'resolved-bound',
      endingId:'ending.secret-debt.bound-life',
      facts:['bound-life-ready']
    },
    {
      eventId:'secret-debt.outcome.takeover',
      choiceId:'takeover',
      stage:'resolved-takeover',
      endingId:'ending.secret-debt.takeover',
      facts:['takeover-route-ready','takeover-external-condition-met']
    }
  ] as const;

  for(const route of cases){
    let s=bind(started());
    for(const fact of route.facts)s=addFact(s,fact);
    s=reactToCareerFact(s,route.facts.at(-1)!);
    assert.equal(s.run.pending?.eventId,route.eventId);

    s=dispatch(s,{type:'choice',id:route.choiceId},catalog);
    assert.equal(s.run.progression.careers['secret-debt']?.stage,route.stage);
    assert.ok(s.run.endings.eligible.includes(route.endingId));
    assert.equal(secretDebtIsBound(s),false);

    const ordinary=catalog.definitions.actions.find(action=>action.id==='lumber.shift')!;
    assert.equal(actionAvailable(ordinary,s,catalog),true,'ordinary work unlocks again once the bound state resolves');

    s=parseSave(JSON.stringify(s),catalog);
    s=dispatch(s,{type:'commitEnding',id:route.endingId},catalog);
    assert.equal(s.run.status,'ending_committed');
    assert.equal(s.run.endings.result,null);
    s=parseSave(JSON.stringify(s),catalog);
    s=dispatch(s,{type:'completeEnding'},catalog);
    assert.equal(s.run.status,'ended');
    assert.equal(s.run.endings.result?.endingId,route.endingId);
    assert.deepEqual(s.run.endings.result?.appliedMetaRewardIds,[]);
    assert.equal((s.meta.hardWorkProgress as string[]).includes('secret-debt'),false,'Secret Debt never counts toward Palace 10/10');
  }
});
