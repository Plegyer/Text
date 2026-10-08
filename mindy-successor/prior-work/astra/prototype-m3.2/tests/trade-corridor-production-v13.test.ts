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
const tradePack=JSON.parse(readFileSync('content/packs/trade-corridor-production.json','utf8'));
const merchantItems=JSON.parse(readFileSync('content/packs/merchant-items.json','utf8'));
const guardAccess=JSON.parse(readFileSync('content/packs/guard-access.json','utf8'));
const appSource=readFileSync('src/ui/app.ts','utf8');

function trade(){
  const activity=catalog.definitions.activities.find(x=>x.id==='trade.corridor');
  assert.ok(activity);
  return activity;
}
function ids(s:Save){
  return availableActivityActions(s,catalog).map(x=>x.id);
}
function finishPending(s:Save){
  let guard=0;
  while(s.run.pending){
    if(++guard>80)throw new Error('pending loop '+s.run.pending.eventId);
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
function marketPrepared(){
  const s=started();
  s.run.dayState.energyCurrent=3;
  s.run.character.stats.wits=4;
  s.run.character.stats.reason=4;
  s.run.resources.inventory.merchant_appraisal_scales=1;
  return s;
}
function customsPrepared(){
  const s=started();
  s.run.dayState.energyCurrent=3;
  s.run.resources.inventory.merchant_manifest_case=1;
  s.run.resources.inventory.merchant_sample_kit=1;
  s.run.resources.inventory.guard_sealed_pass=1;
  return s;
}
function trackingPrepared(){
  const s=started();
  s.run.dayState.energyCurrent=3;
  s.run.character.stats.wits=4;
  return s;
}

test('D36 Trade Corridor definition is a six-Field-Time playable region with three route contexts',()=>{
  const a=trade();
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
      'trade.route.caravan-spur',
      'trade.route.customs-lane',
      'trade.route.market-road'
    ]
  );
  assert.ok(a.options.some(x=>x.category==='shortcut'));
  assert.ok(a.options.some(x=>x.id==='trade.detour.tracking-observe'));
  assert.deepEqual(
    new Map(a.results.map(r=>[r.outcome,r.id])),
    new Map([
      ['success','trade.corridor.success'],
      ['escape','trade.corridor.escape'],
      ['failure','trade.corridor.failure']
    ])
  );
});

test('Trade Corridor is exposed in Explore and keeps generic option checkpoint labeling',()=>{
  assert.match(appSource,/activityEntryList\(\['lumber\.forest','trade\.corridor','anomalous\.reach','restricted\.sites','hunter\.expedition'\]\)/);
  assert.match(appSource,/checkpointIsOption/);
});

test('entry costs exactly two global Energy once and six Field Time survives reload',()=>{
  let s=started();
  s.run.dayState.energyCurrent=3;
  s=dispatch(s,{type:'enterActivity',id:'trade.corridor'},catalog);
  assert.equal(s.run.dayState.energyCurrent,1);
  assert.equal(s.run.flow.activity?.entryEnergyCommitted,true);
  assert.equal(s.run.flow.activity?.internalState.fieldTimeRemaining,6);

  const restored=parseSave(JSON.stringify(s),catalog);
  assert.equal(restored.run.dayState.energyCurrent,1);
  assert.equal(restored.run.flow.activity?.entryEnergyCommitted,true);
  assert.equal(restored.run.flow.activity?.internalState.fieldTimeRemaining,6);
});

test('Market Road prepared path succeeds in exactly six Field Time actions',()=>{
  let s=marketPrepared();
  s=dispatch(s,{type:'enterActivity',id:'trade.corridor'},catalog);
  s=dispatch(s,{type:'activityAction',id:'trade.route.market-road'},catalog);
  s=dispatch(s,{type:'activityAction',id:'trade.challenge.market-read-flow'},catalog);
  s=dispatch(s,{type:'activityAction',id:'trade.challenge.market-appraise-load'},catalog);
  s=dispatch(s,{type:'activityAction',id:'trade.challenge.market-price-sheet'},catalog);
  s=dispatch(s,{type:'activityAction',id:'advance'},catalog);

  const beforeFinal=parseSave(JSON.stringify(s),catalog);
  const direct=dispatch(s,{type:'activityAction',id:'advance'},catalog);
  const resumed=dispatch(beforeFinal,{type:'activityAction',id:'advance'},catalog);
  assert.deepEqual(resumed,direct);
  s=direct;

  assert.equal(s.run.flow.activity,null);
  assert.ok(s.run.progression.worldFacts.includes('activity.trade-corridor.anchor-secured'));
  assert.ok(s.run.progression.worldFacts.includes('trade.corridor.route-confirmed'));
  assert.equal(s.run.pending?.eventId,'trade-corridor.production.city-return');
});

test('unprepared Market Road can fail distinctly and escape remains explicit',()=>{
  let failed=started();
  failed.run.dayState.energyCurrent=3;
  failed=dispatch(failed,{type:'enterActivity',id:'trade.corridor'},catalog);
  failed=dispatch(failed,{type:'activityAction',id:'trade.route.market-road'},catalog);
  for(let i=0;i<4&&failed.run.flow.activity;i++){
    failed=dispatch(failed,{type:'activityAction',id:'advance'},catalog);
  }
  assert.equal(failed.run.flow.activity,null);
  assert.ok(failed.run.progression.worldFacts.includes('trade.corridor.failed'));
  assert.equal(failed.run.progression.worldFacts.includes('activity.trade-corridor.anchor-secured'),false);

  let escaped=started();
  escaped.run.dayState.energyCurrent=3;
  escaped=dispatch(escaped,{type:'enterActivity',id:'trade.corridor'},catalog);
  escaped=dispatch(escaped,{type:'activityAction',id:'trade.route.market-road'},catalog);
  escaped=dispatch(escaped,{type:'activityAction',id:'escape'},catalog);
  assert.equal(escaped.run.flow.activity,null);
  assert.ok(escaped.run.progression.worldFacts.includes('trade.corridor.escaped'));
  assert.equal(escaped.run.progression.worldFacts.includes('activity.trade-corridor.anchor-secured'),false);
});

test('Caravan Spur is season-sensitive and Tracking Triangulation survives reload to a Pathfinder shortcut',()=>{
  let spring=trackingPrepared();
  spring.run.calendar.elapsedDays=0;
  spring=dispatch(spring,{type:'enterActivity',id:'trade.corridor'},catalog);
  assert.ok(ids(spring).includes('trade.route.caravan-spur'));

  let winter=trackingPrepared();
  winter.run.calendar.elapsedDays=30;
  winter=dispatch(winter,{type:'enterActivity',id:'trade.corridor'},catalog);
  assert.equal(ids(winter).includes('trade.route.caravan-spur'),false);
  const caravanOptionIds=new Set(
    trade().options.filter(x=>x.setRoute==='caravan-spur').map(x=>x.id)
  );
  assert.equal(ids(winter).some(id=>caravanOptionIds.has(id)),false,
    'winter must not bypass Caravan Spur via a route-specific option');

  let s=spring;
  s=dispatch(s,{type:'activityAction',id:'trade.route.caravan-spur'},catalog);
  s=dispatch(s,{type:'activityAction',id:'trade.challenge.caravan-navigation'},catalog);
  s=dispatch(s,{type:'activityAction',id:'trade.detour.tracking-observe'},catalog);
  s=parseSave(JSON.stringify(s),catalog);
  assert.equal(
    s.run.flow.activity?.internalState.miniGames?.['trade.tracking-triangulation']?.stage,
    'first-observation'
  );
  assert.ok(ids(s).includes('trade.tracking.cross-check'));
  assert.ok(ids(s).includes('trade.tracking.abort'));

  s=dispatch(s,{type:'activityAction',id:'trade.tracking.cross-check'},catalog);
  s=parseSave(JSON.stringify(s),catalog);
  assert.equal(
    s.run.flow.activity?.internalState.miniGames?.['trade.tracking-triangulation']?.stage,
    'second-observation'
  );
  s=dispatch(s,{type:'activityAction',id:'trade.tracking.complete'},catalog);
  assert.equal(
    s.run.flow.activity?.internalState.miniGames?.['trade.tracking-triangulation']?.status,
    'success'
  );
  assert.ok(s.run.progression.worldFacts.includes('trade.corridor.tracking-verified'));
  assert.ok(ids(s).includes('trade.shortcut.tracked-turn'));

  s=dispatch(s,{type:'activityAction',id:'trade.shortcut.tracked-turn'},catalog);
  assert.equal(s.run.flow.activity,null);
  assert.ok(s.run.progression.worldFacts.includes('activity.trade-corridor.anchor-secured'));
  assert.ok(s.run.progression.worldFacts.includes('activity.trade-corridor.mark.pathfinder'));
});

test('Tracking informed-risk choice requires prior route information and exposes the bounded tradeoff',()=>{
  const option=trade().options.find(x=>x.id==='trade.tracking.informed-risk');
  assert.ok(option);
  assert.equal(option.progressDelta,1);
  assert.equal(option.enduranceCost,2);
  assert.equal(option.fieldTimeCost,1);

  let plain=trackingPrepared();
  plain=dispatch(plain,{type:'enterActivity',id:'trade.corridor'},catalog);
  plain=dispatch(plain,{type:'activityAction',id:'trade.route.caravan-spur'},catalog);
  plain=dispatch(plain,{type:'activityAction',id:'trade.detour.tracking-observe'},catalog);
  assert.equal(ids(plain).includes('trade.tracking.informed-risk'),false);

  let informed=trackingPrepared();
  informed.run.progression.careers.merchant={
    stage:'networked-merchant',
    shifts:0,
    counters:{},
    choices:{},
    facts:['delivery-recorded']
  };
  informed=dispatch(informed,{type:'enterActivity',id:'trade.corridor'},catalog);
  informed=dispatch(informed,{type:'activityAction',id:'trade.route.caravan-spur'},catalog);
  informed=dispatch(informed,{type:'activityAction',id:'trade.detour.tracking-observe'},catalog);
  assert.ok(ids(informed).includes('trade.tracking.informed-risk'));
  const beforeEndurance=informed.run.flow.activity!.internalState.endurance;
  informed=dispatch(informed,{type:'activityAction',id:'trade.tracking.informed-risk'},catalog);
  assert.equal(informed.run.flow.activity?.internalState.endurance,beforeEndurance-2);
  assert.equal(informed.run.flow.activity?.internalState.progress,1);
});

test('Customs Lane capability hooks are distinct and can secure Pathfinder + Preservation + extracted evidence',()=>{
  let none=started();
  none.run.dayState.energyCurrent=3;
  none=dispatch(none,{type:'enterActivity',id:'trade.corridor'},catalog);
  assert.equal(ids(none).includes('trade.route.customs-lane'),false);
  const customsOptionIds=new Set(
    trade().options.filter(x=>x.setRoute==='customs-lane').map(x=>x.id)
  );
  assert.equal(ids(none).some(id=>customsOptionIds.has(id)),false,
    'closed Customs Lane must not be bypassed via a route-specific option');

  let manifest=started();
  manifest.run.dayState.energyCurrent=3;
  manifest.run.resources.inventory.merchant_manifest_case=1;
  manifest=dispatch(manifest,{type:'enterActivity',id:'trade.corridor'},catalog);
  assert.ok(ids(manifest).includes('trade.route.customs-lane'));

  let badge=started();
  badge.run.dayState.energyCurrent=3;
  badge.run.resources.inventory.guard_badge=1;
  badge=dispatch(badge,{type:'enterActivity',id:'trade.corridor'},catalog);
  assert.ok(ids(badge).includes('trade.route.customs-lane'));

  let s=customsPrepared();
  s=dispatch(s,{type:'enterActivity',id:'trade.corridor'},catalog);
  s=dispatch(s,{type:'activityAction',id:'trade.route.customs-lane'},catalog);
  assert.ok(ids(s).includes('trade.challenge.customs-verify-manifest'));
  assert.ok(ids(s).includes('trade.shortcut.sealed-gate'));
  assert.ok(ids(s).includes('trade.challenge.customs-secure-sample'));

  s=dispatch(s,{type:'activityAction',id:'trade.challenge.customs-verify-manifest'},catalog);
  s=dispatch(s,{type:'activityAction',id:'trade.challenge.customs-secure-sample'},catalog);
  s=dispatch(s,{type:'activityAction',id:'trade.shortcut.sealed-gate'},catalog);

  assert.equal(s.run.flow.activity,null);
  assert.ok(s.run.progression.worldFacts.includes('activity.trade-corridor.result.manifest-verified'));
  assert.ok(s.run.progression.worldFacts.includes('activity.trade-corridor.result.sample-secured'));
  assert.ok(s.run.progression.worldFacts.includes('activity.trade-corridor.mark.preservation'));
  assert.ok(s.run.progression.worldFacts.includes('activity.trade-corridor.mark.pathfinder'));
});

test('existing city producers naturally provide Trade Corridor Merchant/Guard capabilities',()=>{
  const merchantSerialized=JSON.stringify(merchantItems);
  for(const item of [
    'merchant_appraisal_scales',
    'merchant_manifest_case',
    'merchant_sample_kit'
  ])assert.ok(merchantSerialized.includes(item),item);

  const guardSerialized=JSON.stringify(guardAccess);
  assert.ok(guardSerialized.includes('guard_badge'));
  assert.ok(guardSerialized.includes('guard_sealed_pass'));

  const optionSerialized=JSON.stringify(trade().options);
  for(const capability of [
    'merchant_appraise_goods',
    'merchant_verify_manifest',
    'merchant_handle_samples',
    'official_guard_access',
    'guard_sealed_pass'
  ])assert.ok(optionSerialized.includes(capability),capability);
});

test('success feeds Merchant/Guard career facts and supplier contact can create the D38 Network marker',()=>{
  let career=customsPrepared();
  career.run.progression.careers.merchant={
    stage:'networked-merchant',
    shifts:0,counters:{},choices:{},facts:[]
  };
  career.run.progression.careers.guard={
    stage:'senior-guard',
    shifts:0,counters:{},choices:{},facts:[]
  };
  career=dispatch(career,{type:'enterActivity',id:'trade.corridor'},catalog);
  career=dispatch(career,{type:'activityAction',id:'trade.route.customs-lane'},catalog);
  career=dispatch(career,{type:'activityAction',id:'trade.challenge.customs-verify-manifest'},catalog);
  career=dispatch(career,{type:'activityAction',id:'trade.challenge.customs-secure-sample'},catalog);
  career=dispatch(career,{type:'activityAction',id:'trade.shortcut.sealed-gate'},catalog);
  career=finishDayStartedFeedback(
    career,
    state=>
      state.run.progression.careers.merchant.facts.includes('trade-corridor-returned')
      &&state.run.progression.careers.guard.facts.includes('trade-corridor-evidence-known')
  );
  assert.ok(career.run.progression.worldFacts.includes('trade.corridor.city-return-recorded'));
  assert.ok(career.run.progression.careers.merchant.facts.includes('trade-corridor-returned'));
  assert.ok(career.run.progression.careers.guard.facts.includes('trade-corridor-evidence-known'));

  let network=marketPrepared();
  network.run.progression.relationships['merchant.supplier']={
    stage:'route-resolved',
    counters:{},
    choices:{'utility-response':'accepted'},
    facts:['utility-response-resolved']
  };
  network=dispatch(network,{type:'enterActivity',id:'trade.corridor'},catalog);
  network=dispatch(network,{type:'activityAction',id:'trade.route.market-road'},catalog);
  network=dispatch(network,{type:'activityAction',id:'trade.challenge.market-read-flow'},catalog);
  network=dispatch(network,{type:'activityAction',id:'trade.challenge.market-appraise-load'},catalog);
  network=dispatch(network,{type:'activityAction',id:'trade.challenge.market-price-sheet'},catalog);
  network=dispatch(network,{type:'activityAction',id:'trade.challenge.market-supplier-contact'},catalog);
  network=dispatch(network,{type:'activityAction',id:'advance'},catalog);
  network=finishDayStartedFeedback(
    network,
    state=>state.run.progression.worldFacts.includes('activity.trade-corridor.mark.network')
  );
  assert.ok(network.run.progression.worldFacts.includes('trade.corridor.contact-thread-open'));
  assert.ok(network.run.progression.worldFacts.includes('activity.trade-corridor.mark.network'));
  assert.ok(
    network.run.progression.relationships['merchant.supplier'].facts.includes('trade-corridor-return-shared')
  );
});

test('Forest v12 remains structurally intact while Trade Corridor adds a second finite Field Time region',()=>{
  const forest=catalog.definitions.activities.find(x=>x.id==='lumber.forest');
  assert.ok(forest);
  assert.equal(forest.entryEnergyCost,2);
  assert.equal(forest.adapterConfig.fieldTimeSegments,6);
  assert.equal(forest.results.find(r=>r.outcome==='success')?.id,'lumber.forest.success');
  assert.equal(trade().entryEnergyCost,2);
  assert.equal(trade().adapterConfig.fieldTimeSegments,6);
});

test('Forest + Trade Corridor alone cannot satisfy the D38 common 3-of-4 anchor baseline',()=>{
  const s=started();
  s.run.progression.worldFacts.push(
    'activity.forest-frontier.anchor-secured',
    'activity.trade-corridor.anchor-secured',
    'activity.forest-frontier.mark.pathfinder',
    'activity.trade-corridor.mark.pathfinder',
    'forest.frontier.tracking-triangulated',
    'trade.corridor.tracking-verified',
    'activity.trade-corridor.mark.preservation',
    'activity.trade-corridor.mark.network'
  );
  const regionalAnchors=[
    'activity.forest-frontier.anchor-secured',
    'activity.trade-corridor.anchor-secured'
  ].filter(fact=>s.run.progression.worldFacts.includes(fact));
  assert.equal(regionalAnchors.length,2);

  for(const ending of catalog.definitions.endings.filter(e=>e.id.startsWith('ending.activity.'))){
    assert.equal(eligible(ending.conditions,s,catalog),false,ending.id);
  }

  const tradeMarkerPrefix='activity.trade-corridor.';
  const activityEndings=definitions.endings.filter((ending:any)=>ending.id.startsWith('ending.activity.'));
  assert.equal(activityEndings.length,3);
  assert.equal(
    activityEndings.some((ending:any)=>JSON.stringify(ending.conditions).includes(tradeMarkerPrefix)),
    true
  );
  for(const ending of definitions.endings.filter((ending:any)=>!ending.id.startsWith('ending.activity.'))){
    assert.equal(
      JSON.stringify(ending.conditions).includes(tradeMarkerPrefix),
      false,
      ending.id
    );
  }
});

test('Trade Corridor production does not touch Palace, Secret Debt, NightFlow, or universal Activity XP',()=>{
  const payload=JSON.stringify({
    activity:trade(),
    pack:tradePack
  }).toLowerCase();
  for(const forbidden of [
    'palace.access-granted',
    'palace.d23-qualified',
    'secret-debt',
    'lender',
    'nightflow',
    'activity xp',
    'activity_xp'
  ])assert.equal(payload.includes(forbidden),false,forbidden);
});
