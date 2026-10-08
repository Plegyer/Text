import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

import {catalog,started} from './helpers.ts';
import {availableActivityActions,dispatch,parseSave} from '../src/core/engine.ts';
import type {Save} from '../src/core/schema.ts';

const definitions=JSON.parse(readFileSync('content/definitions.json','utf8'));
const frontierPack=JSON.parse(readFileSync('content/packs/forest-frontier-production.json','utf8'));
const lumberCross=JSON.parse(readFileSync('content/packs/lumber-cross-production.json','utf8'));
const tavernActivity=JSON.parse(readFileSync('content/packs/tavern-activity.json','utf8'));
const farmActivity=JSON.parse(readFileSync('content/packs/undead-farm-activity.json','utf8'));

function forest(){
  const activity=catalog.definitions.activities.find(x=>x.id==='lumber.forest');
  assert.ok(activity);
  return activity;
}
function actionIds(s:Save){
  return availableActivityActions(s,catalog).map(x=>x.id);
}
function finishPending(s:Save){
  let guard=0;
  while(s.run.pending){
    if(++guard>40)throw new Error('pending loop '+s.run.pending.eventId);
    const event=catalog.events.find(e=>e.id===s.run.pending!.eventId);
    assert.ok(event,s.run.pending.eventId);
    const allowed=s.run.pending.allowedChoiceIds;
    const choice=event.choices.find(c=>!allowed||allowed.includes(c.id));
    assert.ok(choice,event.id);
    s=dispatch(s,{type:'choice',id:choice.id},catalog);
  }
  return s;
}
function preparedLogging(){
  const s=started();
  s.run.character.stats.reason=4;
  s.run.character.stats.strength=4;
  s.run.resources.inventory.field_preservation_kit=1;
  s.run.dayState.energyCurrent=3;
  return s;
}
function trackingReady(){
  const s=started();
  s.run.calendar.elapsedDays=10;
  s.run.dayState.energyCurrent=3;
  s.run.character.stats.wits=4;
  s.run.resources.inventory.field_preservation_kit=1;
  s.run.progression.worldFacts.push('forest.hunter-trail-clue','forest.school-field-notes');
  return s;
}

test('D36 Forest Frontier definition keeps legacy identity and adds exact production contract',()=>{
  const a=forest();
  assert.equal(a.id,'lumber.forest');
  assert.equal(a.entryEnergyCost,2);
  assert.equal(a.resumePolicy,'allowed');
  assert.equal(a.timePolicy,'same_day');
  assert.equal(a.failurePolicy,'exit_to_day');
  assert.equal(a.adapter,'counter.v1');
  assert.deepEqual(a.adapterConfig,{
    initialEndurance:6,
    advanceEnduranceCost:2,
    successAtProgress:6,
    failAtEndurance:0,
    fieldTimeSegments:6,
    advanceFieldTimeCost:1
  });

  const routes=a.options.filter(x=>x.category==='route').map(x=>x.id).sort();
  assert.deepEqual(routes,[
    'forest.route.hunter-trail',
    'forest.route.logging-road',
    'forest.route.old-boundary'
  ]);
  assert.ok(a.options.some(x=>x.id==='forest.shortcut.triangulated-line'));
  assert.ok(a.options.some(x=>x.id==='forest.detour.tracking-observe'));
  assert.ok(a.options.some(x=>x.id==='forest.tracking.informed-risk'));

  const outcomes=new Map(a.results.map(r=>[r.outcome,r.id]));
  assert.equal(outcomes.get('success'),'lumber.forest.success');
  assert.equal(outcomes.get('escape'),'lumber.forest.escape');
  assert.equal(outcomes.get('failure'),'lumber.forest.failure');

  const success=a.results.find(r=>r.id==='lumber.forest.success')!;
  assert.ok(success.effects.some(e=>e.kind==='addWorldFact'&&e.fact==='lumber.forest.truth-known'));
  assert.ok(success.effects.some(e=>e.kind==='addWorldFact'&&e.fact==='activity.forest-frontier.anchor-secured'));
});

test('Forest equipment/capability hooks remain four distinct meaningful inputs',()=>{
  const raw=JSON.stringify(forest().options);
  for(const capability of [
    'cross_rough_route',
    'cut_heavy_wood',
    'preserve_specimen',
    'enter_old_boundary'
  ])assert.ok(raw.includes(capability),capability);

  const itemDefinitions=new Map(definitions.itemDefinitions.map((x:any)=>[x.id,x.capabilities]));
  assert.deepEqual(itemDefinitions.get('rope_kit'),['cross_rough_route']);
  assert.deepEqual(itemDefinitions.get('reinforced_axe'),['cut_heavy_wood']);
  assert.deepEqual(itemDefinitions.get('field_preservation_kit'),['preserve_specimen']);
  assert.deepEqual(itemDefinitions.get('old_boundary_token'),['enter_old_boundary']);
});

test('entry pays two global Energy exactly once and initializes six Field Time segments',()=>{
  let s=started();
  s.run.dayState.energyCurrent=3;
  s=dispatch(s,{type:'enterActivity',id:'lumber.forest'},catalog);
  assert.equal(s.run.dayState.energyCurrent,1);
  assert.equal(s.run.flow.activity?.entryEnergyCommitted,true);
  assert.equal(s.run.flow.activity?.internalState.fieldTimeRemaining,6);

  const restored=parseSave(JSON.stringify(s),catalog);
  assert.equal(restored.run.dayState.energyCurrent,1);
  assert.equal(restored.run.flow.activity?.entryEnergyCommitted,true);
  assert.equal(restored.run.flow.activity?.internalState.fieldTimeRemaining,6);
});

test('legacy Logging Road success still completes in six Field Time actions with the exact old result ID',()=>{
  let s=preparedLogging();
  s=dispatch(s,{type:'enterActivity',id:'lumber.forest'},catalog);
  s=dispatch(s,{type:'activityAction',id:'forest.route.logging-road'},catalog);
  assert.equal(s.run.flow.activity?.internalState.fieldTimeRemaining,5);
  s=dispatch(s,{type:'activityAction',id:'forest.challenge.logging-navigation'},catalog);
  s=dispatch(s,{type:'activityAction',id:'forest.challenge.logging-spring-mud'},catalog);
  s=dispatch(s,{type:'activityAction',id:'forest.challenge.logging-preserve-sample'},catalog);
  s=dispatch(s,{type:'activityAction',id:'advance'},catalog);
  s=dispatch(s,{type:'activityAction',id:'advance'},catalog);

  assert.equal(s.run.flow.activity,null);
  assert.ok(s.run.progression.worldFacts.includes('lumber.forest.truth-known'));
  assert.ok(s.run.progression.worldFacts.includes('activity.forest-frontier.anchor-secured'));
  assert.ok(s.run.progression.worldFacts.includes('activity.forest-frontier.mark.preservation'));
  assert.equal(s.run.resources.inventory.forest_preserved_specimen,1);
  assert.equal(s.run.pending?.eventId,'lumber-cross.activity-forest-return');

  s=finishPending(s);
  assert.ok(s.run.progression.careers.lumber.facts.includes('forest-truth-known'));
});

test('Tracking Triangulation is staged, deterministic across reload, and feeds shortcut evidence without auto-solving the region',()=>{
  let s=trackingReady();
  s=dispatch(s,{type:'enterActivity',id:'lumber.forest'},catalog);

  s=dispatch(s,{type:'activityAction',id:'forest.detour.tracking-observe'},catalog);
  assert.equal(s.run.flow.activity?.internalState.routeId,'hunter-trail');
  assert.equal(s.run.flow.activity?.internalState.fieldTimeRemaining,5);
  assert.equal(s.run.flow.activity?.internalState.miniGames?.['forest.tracking-triangulation']?.stage,'first-observation');
  assert.ok(s.run.progression.worldFacts.includes('forest.frontier.contact-thread-open'));

  s=parseSave(JSON.stringify(s),catalog);
  assert.ok(actionIds(s).includes('forest.tracking.cross-check'));
  assert.ok(actionIds(s).includes('forest.tracking.informed-risk'));
  assert.ok(actionIds(s).includes('forest.tracking.abort'));

  s=dispatch(s,{type:'activityAction',id:'forest.tracking.cross-check'},catalog);
  const checkpoint=parseSave(JSON.stringify(s),catalog);
  assert.deepEqual(checkpoint.run.flow.activity,s.run.flow.activity);
  s=checkpoint;
  assert.equal(s.run.flow.activity?.internalState.miniGames?.['forest.tracking-triangulation']?.stage,'second-observation');
  assert.ok(actionIds(s).includes('forest.tracking.complete'));
  assert.ok(actionIds(s).includes('forest.tracking.force-conclusion'));

  s=dispatch(s,{type:'activityAction',id:'forest.tracking.complete'},catalog);
  const game=s.run.flow.activity?.internalState.miniGames?.['forest.tracking-triangulation'];
  assert.equal(game?.status,'success');
  assert.ok(s.run.progression.worldFacts.includes('forest.frontier.tracking-triangulated'));
  assert.equal(s.run.flow.activity?.internalState.progress,1);
  assert.ok(s.run.flow.activity,'mini-game success must not auto-complete the regional Activity');

  assert.ok(actionIds(s).includes('forest.shortcut.triangulated-line'));
  s=dispatch(s,{type:'activityAction',id:'forest.shortcut.triangulated-line'},catalog);
  assert.ok(s.run.progression.worldFacts.includes('activity.forest-frontier.mark.pathfinder'));
  assert.equal(s.run.flow.activity?.internalState.progress,3);
});

test('Tracking Triangulation supports bounded failure and abort without turning either into regional success',()=>{
  let failed=trackingReady();
  failed=dispatch(failed,{type:'enterActivity',id:'lumber.forest'},catalog);
  failed=dispatch(failed,{type:'activityAction',id:'forest.detour.tracking-observe'},catalog);
  failed=dispatch(failed,{type:'activityAction',id:'forest.tracking.cross-check'},catalog);
  failed=dispatch(failed,{type:'activityAction',id:'forest.tracking.force-conclusion'},catalog);
  assert.equal(failed.run.flow.activity?.internalState.miniGames?.['forest.tracking-triangulation']?.status,'failure');
  assert.ok(failed.run.progression.worldFacts.includes('forest.frontier.tracking-misread'));
  assert.equal(failed.run.progression.worldFacts.includes('activity.forest-frontier.anchor-secured'),false);
  failed=dispatch(failed,{type:'activityAction',id:'escape'},catalog);
  assert.ok(failed.run.progression.worldFacts.includes('lumber.forest.escaped'));

  let aborted=trackingReady();
  aborted=dispatch(aborted,{type:'enterActivity',id:'lumber.forest'},catalog);
  aborted=dispatch(aborted,{type:'activityAction',id:'forest.detour.tracking-observe'},catalog);
  const beforeAbort=aborted.run.flow.activity!.internalState.fieldTimeRemaining;
  aborted=dispatch(aborted,{type:'activityAction',id:'forest.tracking.abort'},catalog);
  assert.equal(aborted.run.flow.activity?.internalState.miniGames?.['forest.tracking-triangulation']?.status,'abort');
  assert.equal(aborted.run.flow.activity?.internalState.fieldTimeRemaining,beforeAbort);
  assert.ok(aborted.run.flow.activity);
});

test('informed risk is School-information gated and exposes its exact bounded tradeoff',()=>{
  const option=forest().options.find(x=>x.id==='forest.tracking.informed-risk');
  assert.ok(option);
  assert.equal(option.progressDelta,1);
  assert.equal(option.enduranceCost,2);
  assert.equal(option.fieldTimeCost,1);
  assert.ok(JSON.stringify(option.conditions).includes('forest.school-field-notes'));

  let noSchool=trackingReady();
  noSchool.run.progression.worldFacts=noSchool.run.progression.worldFacts.filter(x=>x!=='forest.school-field-notes');
  noSchool=dispatch(noSchool,{type:'enterActivity',id:'lumber.forest'},catalog);
  noSchool=dispatch(noSchool,{type:'activityAction',id:'forest.detour.tracking-observe'},catalog);
  assert.equal(actionIds(noSchool).includes('forest.tracking.informed-risk'),false);
});

test('legacy Activity adapters stay unlimited when Field Time is not declared',()=>{
  let s=started();
  s.run.dayState.energyCurrent=3;
  s.run.progression.careers.hunter={
    stage:'recognized-hunter',
    shifts:0,
    counters:{},
    choices:{},
    facts:['expedition-qualified']
  };
  s=dispatch(s,{type:'enterActivity',id:'hunter.expedition'},catalog);
  assert.equal(s.run.flow.activity?.internalState.fieldTimeRemaining,null);
  assert.equal(forest().adapterConfig.fieldTimeSegments,6);
  const hunter=catalog.definitions.activities.find(x=>x.id==='hunter.expedition')!;
  assert.equal(hunter.adapterConfig.fieldTimeSegments,undefined);
});

test('existing typed Forest consumers retain exact lumber.forest.success compatibility',()=>{
  for(const [pack,eventId] of [
    [lumberCross,'lumber-cross.activity-forest-return'],
    [tavernActivity,'tavern.activity.forest-return'],
    [farmActivity,'undead-farm.activity.forest-return']
  ] as const){
    const event=pack.events.find((x:any)=>x.id===eventId);
    assert.ok(event,eventId);
    const trigger=event.reactionTriggers.find((x:any)=>x.kind==='activityResult');
    assert.deepEqual(trigger,{
      kind:'activityResult',
      activity:'lumber.forest',
      outcome:'success',
      result:'lumber.forest.success'
    },eventId);
  }
});

test('Forest result feedback exposes career/relationship/School seams and D38 marker facts without a Forest-only D38 ending',()=>{
  const ids=new Set(frontierPack.events.map((x:any)=>x.id));
  assert.ok(ids.has('forest-frontier.production.research-grade'));
  assert.ok(ids.has('forest-frontier.production.companion-return'));
  assert.ok(ids.has('forest-frontier.production.school-reflection'));

  const serialized=JSON.stringify(frontierPack);
  assert.ok(serialized.includes('hunter.senior-guide'));
  assert.ok(serialized.includes('school.track.field_craft'));
  assert.ok(serialized.includes('activity.forest-frontier.mark.network'));
  assert.ok(serialized.includes('activity.forest-frontier.result.research-grade'));

  const newMarkerTerms=[
    'activity.forest-frontier.anchor-secured',
    'activity.forest-frontier.mark.pathfinder',
    'activity.forest-frontier.mark.preservation',
    'activity.forest-frontier.mark.network',
    'activity.forest-frontier.result.research-grade'
  ];
  for(const ending of definitions.endings){
    const conditions=JSON.stringify(ending.conditions);
    for(const marker of newMarkerTerms)assert.equal(conditions.includes(marker),false,ending.id+' / '+marker);
  }
});

test('Forest production hardening does not write Palace or Secret Debt state',()=>{
  const payload=JSON.stringify({
    activity:definitions.activities.find((x:any)=>x.id==='lumber.forest'),
    pack:frontierPack
  }).toLowerCase();
  for(const forbidden of ['palace.access-granted','palace.d23-qualified','secret-debt','lender','forced-night']){
    assert.equal(payload.includes(forbidden),false,forbidden);
  }
});
