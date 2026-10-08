import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

import {catalog,started} from './helpers.ts';
import {
  availableActivityActions,
  dispatch,
  eligible,
  parseSave,
  resolveReactions
} from '../src/core/engine.ts';
import type {Save} from '../src/core/schema.ts';

const definitions=JSON.parse(readFileSync('content/definitions.json','utf8'));
const reachPack=JSON.parse(readFileSync('content/packs/anomalous-reach-production.json','utf8'));
const appSource=readFileSync('src/ui/app.ts','utf8');

function reach(){
  const activity=catalog.definitions.activities.find(x=>x.id==='anomalous.reach');
  assert.ok(activity);
  return activity;
}
function ids(s:Save){
  return availableActivityActions(s,catalog).map(x=>x.id);
}
function setDay(s:Save,day:number){
  s.run.day=day;
  s.run.calendar.elapsedDays=day;
  return s;
}
function setArcana(s:Save,lessons:number,night=0){
  s.run.progression.school.tracks['school.track.arcana']={
    trackId:'school.track.arcana',
    counters:{lessons_completed:lessons,night_study_sessions:night},
    facts:[],milestones:[],certificates:[],choices:{}
  };
  return s;
}
function year2Arcana(lessons=1){
  const s=started();
  setDay(s,40);
  setArcana(s,lessons);
  s.run.dayState.energyCurrent=3;
  return s;
}
function finishPending(s:Save){
  let guard=0;
  while(s.run.pending){
    if(++guard>100)throw new Error('pending loop '+s.run.pending.eventId);
    const pending=s.run.pending;
    const event=catalog.events.find(e=>e.id===pending.eventId);
    assert.ok(event,pending.eventId);
    const allowed=pending.allowedChoiceIds;
    const choice=event.choices.find(c=>(!allowed||allowed.includes(c.id))&&eligible(c.conditions,s,catalog));
    assert.ok(choice,event.id);
    s=dispatch(s,{type:'choice',id:choice.id},catalog);
  }
  return s;
}
function finishDayStartedFeedback(s:Save,done:(state:Save)=>boolean){
  s=finishPending(s);
  for(let guard=0;guard<20&&!done(s);guard++){
    s=resolveReactions(s,[{kind:'dayStarted',day:s.run.day}],catalog,{newEpoch:true}).state;
    if(!s.run.pending)break;
    s=finishPending(s);
  }
  return s;
}

test('D36 Anomalous Reach is a distinct Year-2 six-Field-Time region with three route contexts',()=>{
  const a=reach();
  assert.equal(a.entryEnergyCost,2);
  assert.equal(a.resumePolicy,'allowed');
  assert.equal(a.timePolicy,'same_day');
  assert.equal(a.failurePolicy,'exit_to_day');
  assert.equal(a.adapter,'counter.v1');
  assert.deepEqual(a.adapterConfig,{
    initialEndurance:8,
    advanceEnduranceCost:2,
    successAtProgress:6,
    failAtEndurance:0,
    fieldTimeSegments:6,
    advanceFieldTimeCost:1
  });
  assert.deepEqual(
    a.options.filter(x=>x.category==='route').map(x=>x.id).sort(),
    [
      'anomaly.route.echo-ridge',
      'anomaly.route.old-boundary-rift',
      'anomaly.route.preserved-basin'
    ]
  );
  assert.ok(a.options.some(x=>x.id==='anomaly.shortcut.stabilized-fold'));
  assert.ok(a.options.some(x=>x.id==='anomaly.detour.ritual-observe'));
  assert.deepEqual(
    new Map(a.results.map(r=>[r.outcome,r.id])),
    new Map([
      ['success','anomalous.reach.success'],
      ['escape','anomalous.reach.escape'],
      ['failure','anomalous.reach.failure']
    ])
  );
});

test('entry requires Year 2 plus real preparation, not calendar alone or prep alone',()=>{
  const early=started();
  setDay(early,39);
  setArcana(early,1);
  assert.equal(eligible(reach().entryConditions,early,catalog),false);

  const noPrep=started();
  setDay(noPrep,40);
  assert.equal(eligible(reach().entryConditions,noPrep,catalog),false);

  const prepared=year2Arcana(1);
  assert.equal(eligible(reach().entryConditions,prepared,catalog),true);

  const cluePrep=started();
  setDay(cluePrep,40);
  cluePrep.run.progression.worldFacts.push('activity.trade-corridor.anchor-secured');
  assert.equal(eligible(reach().entryConditions,cluePrep,catalog),true);
});

test('Anomalous Reach is exposed in Explore without changing the shared Activity engine',()=>{
  assert.match(
    appSource,
    /activityEntryList\(\['lumber\.forest','trade\.corridor','anomalous\.reach','restricted\.sites','hunter\.expedition'\]\)/
  );
});

test('entry pays two global Energy once and deterministic reload preserves Field Time',()=>{
  let s=year2Arcana(1);
  s=dispatch(s,{type:'enterActivity',id:'anomalous.reach'},catalog);
  assert.equal(s.run.dayState.energyCurrent,1);
  assert.equal(s.run.flow.activity?.entryEnergyCommitted,true);
  assert.equal(s.run.flow.activity?.internalState.fieldTimeRemaining,6);

  const restored=parseSave(JSON.stringify(s),catalog);
  assert.equal(restored.run.dayState.energyCurrent,1);
  assert.equal(restored.run.flow.activity?.entryEnergyCommitted,true);
  assert.equal(restored.run.flow.activity?.internalState.fieldTimeRemaining,6);
});

test('Pattern / Ritual Circuit is staged, deterministic across reload, and does not auto-complete the regional anchor',()=>{
  let s=year2Arcana(1);
  s.run.character.stats.reason=5;
  s=dispatch(s,{type:'enterActivity',id:'anomalous.reach'},catalog);
  s=dispatch(s,{type:'activityAction',id:'anomaly.route.echo-ridge'},catalog);
  s=dispatch(s,{type:'activityAction',id:'anomaly.detour.ritual-observe'},catalog);

  assert.equal(
    s.run.flow.activity?.internalState.miniGames?.['anomaly.pattern-ritual-circuit']?.stage,
    'observed'
  );
  assert.equal(s.run.flow.activity?.internalState.fieldTimeRemaining,4);

  s=parseSave(JSON.stringify(s),catalog);
  assert.ok(ids(s).includes('anomaly.ritual.trace-symmetry'));
  assert.ok(ids(s).includes('anomaly.ritual.abort'));

  s=dispatch(s,{type:'activityAction',id:'anomaly.ritual.trace-symmetry'},catalog);
  const checkpoint=parseSave(JSON.stringify(s),catalog);
  assert.deepEqual(checkpoint.run.flow.activity,s.run.flow.activity);
  s=checkpoint;
  assert.equal(
    s.run.flow.activity?.internalState.miniGames?.['anomaly.pattern-ritual-circuit']?.stage,
    'aligned'
  );

  s=dispatch(s,{type:'activityAction',id:'anomaly.ritual.resolve'},catalog);
  assert.equal(
    s.run.flow.activity?.internalState.miniGames?.['anomaly.pattern-ritual-circuit']?.status,
    'success'
  );
  assert.ok(s.run.progression.worldFacts.includes('anomalous.reach.ritual-circuit-resolved'));
  assert.ok(s.run.progression.worldFacts.includes('activity.anomalous-reach.minigame.pattern-ritual-complete'));
  assert.ok(s.run.flow.activity,'mini-game success must not auto-complete the region');
  assert.equal(s.run.flow.activity?.internalState.progress,2);
  assert.ok(ids(s).includes('anomaly.shortcut.stabilized-fold'));

  s=dispatch(s,{type:'activityAction',id:'anomaly.shortcut.stabilized-fold'},catalog);
  assert.ok(s.run.progression.worldFacts.includes('activity.anomalous-reach.mark.pathfinder'));
  assert.equal(s.run.flow.activity?.internalState.progress,5);
  s=dispatch(s,{type:'activityAction',id:'advance'},catalog);

  assert.equal(s.run.flow.activity,null);
  assert.ok(s.run.progression.worldFacts.includes('activity.anomalous-reach.anchor-secured'));
  assert.equal(s.run.pending?.eventId,'anomalous-reach.production.city-return');
});

test('Arcana inversion is an information/risk decision with the exact +1 / -2 / -1 tradeoff',()=>{
  const option=reach().options.find(x=>x.id==='anomaly.ritual.arcana-inversion');
  assert.ok(option);
  assert.equal(option.progressDelta,1);
  assert.equal(option.enduranceCost,2);
  assert.equal(option.fieldTimeCost,1);

  let basic=year2Arcana(1);
  basic.run.character.stats.reason=5;
  basic=dispatch(basic,{type:'enterActivity',id:'anomalous.reach'},catalog);
  basic=dispatch(basic,{type:'activityAction',id:'anomaly.route.echo-ridge'},catalog);
  basic=dispatch(basic,{type:'activityAction',id:'anomaly.detour.ritual-observe'},catalog);
  assert.equal(ids(basic).includes('anomaly.ritual.arcana-inversion'),false);

  let informed=year2Arcana(2);
  informed=dispatch(informed,{type:'enterActivity',id:'anomalous.reach'},catalog);
  informed=dispatch(informed,{type:'activityAction',id:'anomaly.route.echo-ridge'},catalog);
  informed=dispatch(informed,{type:'activityAction',id:'anomaly.detour.ritual-observe'},catalog);
  assert.ok(ids(informed).includes('anomaly.ritual.arcana-inversion'));
  const beforeEndurance=informed.run.flow.activity!.internalState.endurance;
  const beforeTime=informed.run.flow.activity!.internalState.fieldTimeRemaining!;
  informed=dispatch(informed,{type:'activityAction',id:'anomaly.ritual.arcana-inversion'},catalog);
  assert.equal(informed.run.flow.activity?.internalState.endurance,beforeEndurance-2);
  assert.equal(informed.run.flow.activity?.internalState.fieldTimeRemaining,beforeTime-1);
  assert.equal(informed.run.flow.activity?.internalState.progress,1);
});

test('Pattern / Ritual Circuit supports bounded failure and abort without becoming regional success',()=>{
  let failed=year2Arcana(1);
  failed.run.character.stats.reason=5;
  failed=dispatch(failed,{type:'enterActivity',id:'anomalous.reach'},catalog);
  failed=dispatch(failed,{type:'activityAction',id:'anomaly.route.echo-ridge'},catalog);
  failed=dispatch(failed,{type:'activityAction',id:'anomaly.detour.ritual-observe'},catalog);
  failed=dispatch(failed,{type:'activityAction',id:'anomaly.ritual.trace-symmetry'},catalog);
  failed=dispatch(failed,{type:'activityAction',id:'anomaly.ritual.overload'},catalog);
  assert.equal(
    failed.run.flow.activity?.internalState.miniGames?.['anomaly.pattern-ritual-circuit']?.status,
    'failure'
  );
  assert.ok(failed.run.progression.worldFacts.includes('anomalous.reach.ritual-circuit-fractured'));
  assert.equal(failed.run.progression.worldFacts.includes('activity.anomalous-reach.anchor-secured'),false);
  failed=dispatch(failed,{type:'activityAction',id:'escape'},catalog);
  assert.ok(failed.run.progression.worldFacts.includes('anomalous.reach.escaped'));

  let aborted=year2Arcana(1);
  aborted=dispatch(aborted,{type:'enterActivity',id:'anomalous.reach'},catalog);
  aborted=dispatch(aborted,{type:'activityAction',id:'anomaly.route.echo-ridge'},catalog);
  aborted=dispatch(aborted,{type:'activityAction',id:'anomaly.detour.ritual-observe'},catalog);
  const before=aborted.run.flow.activity!.internalState.fieldTimeRemaining;
  aborted=dispatch(aborted,{type:'activityAction',id:'anomaly.ritual.abort'},catalog);
  assert.equal(
    aborted.run.flow.activity?.internalState.miniGames?.['anomaly.pattern-ritual-circuit']?.status,
    'abort'
  );
  assert.equal(aborted.run.flow.activity?.internalState.fieldTimeRemaining,before);
  assert.ok(aborted.run.flow.activity);
});

test('Preserved Basin cannot be bypassed and uses distinct preservation/sample capabilities',()=>{
  let closed=year2Arcana(1);
  closed.run.progression.worldFacts.push('activity.forest-frontier.anchor-secured');
  closed=dispatch(closed,{type:'enterActivity',id:'anomalous.reach'},catalog);
  const basinIds=new Set(reach().options.filter(x=>x.setRoute==='preserved-basin').map(x=>x.id));
  assert.equal(ids(closed).some(id=>basinIds.has(id)),false);

  let prepared=year2Arcana(1);
  prepared.run.resources.inventory.farm_preserved_specimen=1;
  prepared.run.resources.inventory.field_preservation_kit=1;
  prepared.run.resources.inventory.merchant_sample_kit=1;
  prepared=dispatch(prepared,{type:'enterActivity',id:'anomalous.reach'},catalog);
  assert.ok(ids(prepared).includes('anomaly.route.preserved-basin'));

  prepared=dispatch(prepared,{type:'activityAction',id:'anomaly.route.preserved-basin'},catalog);
  assert.ok(ids(prepared).includes('anomaly.challenge.basin-compare-sample'));
  assert.ok(ids(prepared).includes('anomaly.challenge.basin-field-preserve'));
  assert.ok(ids(prepared).includes('anomaly.challenge.basin-merchant-secure'));

  prepared=dispatch(prepared,{type:'activityAction',id:'anomaly.challenge.basin-compare-sample'},catalog);
  prepared=dispatch(prepared,{type:'activityAction',id:'anomaly.challenge.basin-field-preserve'},catalog);
  prepared=dispatch(prepared,{type:'activityAction',id:'advance'},catalog);
  prepared=dispatch(prepared,{type:'activityAction',id:'advance'},catalog);

  assert.equal(prepared.run.flow.activity,null);
  assert.ok(prepared.run.progression.worldFacts.includes('activity.anomalous-reach.result.sample-secured'));
  assert.ok(prepared.run.progression.worldFacts.includes('activity.anomalous-reach.mark.preservation'));
  assert.ok(prepared.run.progression.worldFacts.includes('activity.anomalous-reach.anchor-secured'));
});

test('Old Boundary Rift is autumn/winter + access gated and route-specific options cannot bypass either gate',()=>{
  let summer=year2Arcana(3);
  setDay(summer,50);
  summer=dispatch(summer,{type:'enterActivity',id:'anomalous.reach'},catalog);
  const riftIds=new Set(reach().options.filter(x=>x.setRoute==='old-boundary-rift').map(x=>x.id));
  assert.equal(ids(summer).some(id=>riftIds.has(id)),false);

  let autumnClosed=year2Arcana(1);
  setDay(autumnClosed,60);
  autumnClosed=dispatch(autumnClosed,{type:'enterActivity',id:'anomalous.reach'},catalog);
  assert.equal(ids(autumnClosed).some(id=>riftIds.has(id)),false);

  let token=year2Arcana(1);
  setDay(token,60);
  token.run.resources.inventory.old_boundary_token=1;
  token=dispatch(token,{type:'enterActivity',id:'anomalous.reach'},catalog);
  assert.ok(ids(token).includes('anomaly.route.old-boundary-rift'));
  assert.ok(ids(token).includes('anomaly.challenge.rift-boundary-read'));
});

test('real Keeper contact can create the Network marker after a successful Rift return',()=>{
  let s=year2Arcana(3);
  setDay(s,60);
  s.run.character.stats.magic=5;
  s.run.progression.careers['undead-farm']={
    stage:'research',
    shifts:20,
    counters:{completed_shifts:20},
    choices:{},
    facts:['school-research-ready']
  };
  s.run.progression.relationships['undead-farm.keeper']={
    stage:'request-resolved',
    counters:{'work-meetings':2},
    choices:{'request-response':'accepted'},
    facts:['introduced-at-work','professional-trust-earned','request-resolved']
  };

  s=dispatch(s,{type:'enterActivity',id:'anomalous.reach'},catalog);
  s=dispatch(s,{type:'activityAction',id:'anomaly.route.old-boundary-rift'},catalog);
  s=dispatch(s,{type:'activityAction',id:'anomaly.challenge.rift-boundary-read'},catalog);
  s=dispatch(s,{type:'activityAction',id:'anomaly.challenge.rift-risk'},catalog);
  s=dispatch(s,{type:'activityAction',id:'anomaly.challenge.rift-keeper-contact'},catalog);
  assert.ok(s.run.progression.worldFacts.includes('activity.anomalous-reach.contact-thread-open'));
  s=dispatch(s,{type:'activityAction',id:'advance'},catalog);

  assert.equal(s.run.flow.activity,null);
  s=finishDayStartedFeedback(
    s,
    state=>state.run.progression.worldFacts.includes('activity.anomalous-reach.mark.network')
  );
  assert.ok(s.run.progression.worldFacts.includes('activity.anomalous-reach.anchor-secured'));
  assert.ok(s.run.progression.worldFacts.includes('activity.anomalous-reach.mark.network'));
  assert.ok(
    s.run.progression.relationships['undead-farm.keeper'].facts.includes('anomalous-reach-return-shared')
  );
});

test('successful return feeds Undead Farm and Arcana without changing lesson counts',()=>{
  let s=year2Arcana(1);
  s.run.character.stats.reason=5;
  s.run.progression.careers['undead-farm']={
    stage:'reliable-helper',
    shifts:8,counters:{completed_shifts:8},choices:{},facts:[]
  };
  const lessonsBefore=s.run.progression.school.tracks['school.track.arcana'].counters.lessons_completed;

  s=dispatch(s,{type:'enterActivity',id:'anomalous.reach'},catalog);
  s=dispatch(s,{type:'activityAction',id:'anomaly.route.echo-ridge'},catalog);
  s=dispatch(s,{type:'activityAction',id:'anomaly.detour.ritual-observe'},catalog);
  s=dispatch(s,{type:'activityAction',id:'anomaly.ritual.trace-symmetry'},catalog);
  s=dispatch(s,{type:'activityAction',id:'anomaly.ritual.resolve'},catalog);
  s=dispatch(s,{type:'activityAction',id:'anomaly.shortcut.stabilized-fold'},catalog);
  s=dispatch(s,{type:'activityAction',id:'advance'},catalog);
  s=finishDayStartedFeedback(
    s,
    state=>
      state.run.progression.careers['undead-farm'].facts.includes('anomalous-reach-returned')
      &&state.run.progression.worldFacts.includes('anomalous.reach.school-reflection-recorded')
  );

  assert.ok(s.run.progression.careers['undead-farm'].facts.includes('anomalous-reach-returned'));
  assert.ok(s.run.progression.worldFacts.includes('anomalous.reach.school-reflection-recorded'));
  assert.equal(
    s.run.progression.school.tracks['school.track.arcana'].counters.lessons_completed,
    lessonsBefore
  );
});

test('Pattern/Ritual success plus a secured sample can publish the research-grade D38 candidate',()=>{
  let s=year2Arcana(2);
  s.run.character.stats.reason=5;
  s.run.resources.inventory.farm_preserved_specimen=1;
  s.run.resources.inventory.field_preservation_kit=1;

  s=dispatch(s,{type:'enterActivity',id:'anomalous.reach'},catalog);
  s=dispatch(s,{type:'activityAction',id:'anomaly.route.echo-ridge'},catalog);
  s=dispatch(s,{type:'activityAction',id:'anomaly.detour.ritual-observe'},catalog);
  s=dispatch(s,{type:'activityAction',id:'anomaly.ritual.trace-symmetry'},catalog);
  s=dispatch(s,{type:'activityAction',id:'anomaly.ritual.resolve'},catalog);
  s=dispatch(s,{type:'activityAction',id:'anomaly.shortcut.stabilized-fold'},catalog);
  s=dispatch(s,{type:'activityAction',id:'advance'},catalog);
  s=finishPending(s);

  s.run.dayState.energyCurrent=3;
  s=dispatch(s,{type:'enterActivity',id:'anomalous.reach'},catalog);
  s=dispatch(s,{type:'activityAction',id:'anomaly.route.preserved-basin'},catalog);
  s=dispatch(s,{type:'activityAction',id:'anomaly.challenge.basin-compare-sample'},catalog);
  s=dispatch(s,{type:'activityAction',id:'anomaly.challenge.basin-field-preserve'},catalog);
  s=dispatch(s,{type:'activityAction',id:'advance'},catalog);
  s=dispatch(s,{type:'activityAction',id:'advance'},catalog);
  s=finishPending(s);

  assert.ok(s.run.progression.worldFacts.includes('activity.anomalous-reach.result.sample-secured'));
  assert.ok(s.run.progression.worldFacts.includes('activity.anomalous-reach.minigame.pattern-ritual-complete'));
  assert.ok(s.run.progression.worldFacts.includes('activity.anomalous-reach.result.research-grade'));
});

test('Forest and Trade Corridor production contracts remain present while v14 adds only the third region',()=>{
  const forest=catalog.definitions.activities.find(x=>x.id==='lumber.forest');
  const trade=catalog.definitions.activities.find(x=>x.id==='trade.corridor');
  assert.ok(forest);
  assert.ok(trade);
  assert.equal(forest.entryEnergyCost,2);
  assert.equal(forest.adapterConfig.fieldTimeSegments,6);
  assert.equal(forest.results.find(r=>r.outcome==='success')?.id,'lumber.forest.success');
  assert.equal(trade.entryEnergyCost,2);
  assert.equal(trade.adapterConfig.fieldTimeSegments,6);
  assert.equal(trade.results.find(r=>r.outcome==='success')?.id,'trade.corridor.success');
});

test('v14 exposes D38 seams but does not implement or auto-commit a standalone Activity ending',()=>{
  const markerTerms=[
    'activity.anomalous-reach.anchor-secured',
    'activity.anomalous-reach.mark.pathfinder',
    'activity.anomalous-reach.mark.preservation',
    'activity.anomalous-reach.mark.network',
    'activity.anomalous-reach.result.sample-secured',
    'activity.anomalous-reach.result.research-grade',
    'activity.anomalous-reach.contact-thread-open',
    'activity.anomalous-reach.minigame.pattern-ritual-complete'
  ];
  assert.deepEqual(
    catalog.definitions.endings.filter(e=>e.id.startsWith('ending.activity.')).map(e=>e.id).sort(),
    ['ending.activity.network','ending.activity.pathfinder','ending.activity.preservation']
  );
  assert.equal(catalog.definitions.endings.some(e=>e.id.startsWith('ending.activity.anomalous')),false);
  for(const ending of definitions.endings.filter((ending:any)=>!ending.id.startsWith('ending.activity.'))){
    const raw=JSON.stringify(ending.conditions);
    for(const marker of markerTerms)assert.equal(raw.includes(marker),false,ending.id+' / '+marker);
  }
});

test('Anomalous Reach production does not touch Palace, Secret Debt, NightFlow, or universal Activity XP',()=>{
  const payload=JSON.stringify({activity:reach(),pack:reachPack}).toLowerCase();
  for(const forbidden of [
    'palace.access-granted',
    'palace.d23-qualified',
    'secret-debt',
    'lender',
    'nightflow',
    'activity_xp',
    'activity xp'
  ])assert.equal(payload.includes(forbidden),false,forbidden);
});
