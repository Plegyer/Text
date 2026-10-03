import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

import {catalog,started} from './helpers.ts';
import {
  availableActivityActions,
  dispatch,
  eligible,
  parseSave
} from '../src/core/engine.ts';
import type {Save} from '../src/core/schema.ts';

const definitions=JSON.parse(readFileSync('content/definitions.json','utf8'));
const restrictedPack=JSON.parse(readFileSync('content/packs/restricted-sites-production.json','utf8'));
const appSource=readFileSync('src/ui/app.ts','utf8');

function restricted(){
  const activity=catalog.definitions.activities.find(x=>x.id==='restricted.sites');
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
function year3Prepared(){
  const s=started();
  setDay(s,80);
  s.run.dayState.energyCurrent=3;
  s.run.resources.inventory.assassin_concealed_toolset=1;
  return s;
}
function assassinIntel(s:Save){
  s.run.progression.careers.assassin={
    stage:'trusted-blade',
    shifts:20,
    counters:{completed_shifts:20},
    choices:{},
    facts:['infiltration-qualified','tavern-intel-known']
  };
  return s;
}
function acceptedHandler(s:Save){
  s.run.progression.relationships['assassin.handler']={
    stage:'route-resolved',
    counters:{},
    choices:{'utility-response':'accepted'},
    facts:['introduced-at-work','professional-trust-earned','utility-response-resolved']
  };
  s.run.progression.careers.assassin??={
    stage:'trusted-blade',
    shifts:20,
    counters:{completed_shifts:20},
    choices:{},
    facts:[]
  };
  if(!s.run.progression.careers.assassin.facts.includes('handler-utility-ready')){
    s.run.progression.careers.assassin.facts.push('handler-utility-ready');
  }
  return s;
}
function finishPending(s:Save){
  let guard=0;
  while(s.run.pending){
    if(++guard>120)throw new Error('pending loop '+s.run.pending.eventId);
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

test('D36 Restricted Sites is the Year-3 high-risk six-Field-Time region with three route contexts',()=>{
  const a=restricted();
  assert.equal(a.entryEnergyCost,2);
  assert.equal(a.resumePolicy,'allowed');
  assert.equal(a.timePolicy,'same_day');
  assert.equal(a.failurePolicy,'exit_to_day');
  assert.equal(a.adapter,'counter.v1');
  assert.deepEqual(a.adapterConfig,{
    initialEndurance:10,
    advanceEnduranceCost:3,
    successAtProgress:6,
    failAtEndurance:0,
    fieldTimeSegments:6,
    advanceFieldTimeCost:1
  });
  assert.deepEqual(
    a.options.filter(x=>x.category==='route').map(x=>x.id).sort(),
    [
      'restricted.route.context-wing',
      'restricted.route.sealed-annex',
      'restricted.route.service-ring'
    ]
  );
  assert.ok(a.options.some(x=>x.category==='shortcut'));
  assert.ok(a.options.some(x=>x.id==='restricted.detour.infiltration-observe'));
  assert.deepEqual(
    new Map(a.results.map(r=>[r.outcome,r.id])),
    new Map([
      ['success','restricted.sites.success'],
      ['escape','restricted.sites.escape'],
      ['failure','restricted.sites.failure']
    ])
  );
});

test('entry requires Year 3 plus real preparation and pays two Energy exactly once',()=>{
  const early=started();
  setDay(early,79);
  early.run.resources.inventory.assassin_concealed_toolset=1;
  assert.equal(eligible(restricted().entryConditions,early,catalog),false);

  const noPrep=started();
  setDay(noPrep,80);
  assert.equal(eligible(restricted().entryConditions,noPrep,catalog),false);

  let s=year3Prepared();
  assert.equal(eligible(restricted().entryConditions,s,catalog),true);
  s=dispatch(s,{type:'enterActivity',id:'restricted.sites'},catalog);
  assert.equal(s.run.dayState.energyCurrent,1);
  assert.equal(s.run.flow.activity?.entryEnergyCommitted,true);
  assert.equal(s.run.flow.activity?.internalState.fieldTimeRemaining,6);

  const restored=parseSave(JSON.stringify(s),catalog);
  assert.equal(restored.run.dayState.energyCurrent,1);
  assert.equal(restored.run.flow.activity?.internalState.fieldTimeRemaining,6);
});

test('Restricted Sites is playable in Explore and active mini-game UI exposes suspicion',()=>{
  assert.match(
    appSource,
    /activityEntryList\(\['lumber\.forest','trade\.corridor','anomalous\.reach','restricted\.sites','hunter\.expedition'\]\)/
  );
  assert.match(appSource,/suspicionLabel/);
  assert.match(appSource,/activeMiniGame\[1\]\.suspicion/);
});

test('Infiltration / Suspicion clean path is deterministic, save-safe, and does not auto-complete before regional progress reaches six',()=>{
  let s=assassinIntel(year3Prepared());
  s=dispatch(s,{type:'enterActivity',id:'restricted.sites'},catalog);
  s=dispatch(s,{type:'activityAction',id:'restricted.route.service-ring'},catalog);
  s=dispatch(s,{type:'activityAction',id:'restricted.detour.infiltration-observe'},catalog);

  let game=s.run.flow.activity?.internalState.miniGames?.['restricted.infiltration-suspicion'];
  assert.equal(game?.stage,'approach');
  assert.equal(game?.status,'active');
  assert.equal(game?.suspicion,10);

  s=parseSave(JSON.stringify(s),catalog);
  assert.ok(ids(s).includes('restricted.infiltration.intel-window'));
  assert.ok(ids(s).includes('restricted.infiltration.raw-window'));
  assert.ok(ids(s).includes('restricted.infiltration.abort'));

  s=dispatch(s,{type:'activityAction',id:'restricted.infiltration.intel-window'},catalog);
  game=s.run.flow.activity?.internalState.miniGames?.['restricted.infiltration-suspicion'];
  assert.equal(game?.stage,'inside');
  assert.equal(game?.suspicion,0);
  assert.ok(ids(s).includes('restricted.infiltration.clean-handoff'));
  assert.equal(ids(s).includes('restricted.infiltration.compromised'),false);

  const checkpoint=parseSave(JSON.stringify(s),catalog);
  assert.deepEqual(checkpoint.run.flow.activity,s.run.flow.activity);
  s=checkpoint;

  s=dispatch(s,{type:'activityAction',id:'restricted.infiltration.clean-handoff'},catalog);
  game=s.run.flow.activity?.internalState.miniGames?.['restricted.infiltration-suspicion'];
  assert.equal(game?.status,'success');
  assert.equal(game?.suspicion,5);
  assert.ok(s.run.progression.worldFacts.includes('activity.restricted-sites.minigame.infiltration-suspicion-complete'));
  assert.ok(s.run.flow.activity,'mini-game success must not auto-complete the region');
  assert.equal(s.run.flow.activity?.internalState.progress,2);

  s=dispatch(s,{type:'activityAction',id:'restricted.shortcut.clean-route'},catalog);
  assert.ok(s.run.progression.worldFacts.includes('activity.restricted-sites.mark.pathfinder'));
  assert.equal(s.run.flow.activity?.internalState.progress,5);
  s=dispatch(s,{type:'activityAction',id:'advance'},catalog);

  assert.equal(s.run.flow.activity,null);
  assert.ok(s.run.progression.worldFacts.includes('activity.restricted-sites.anchor-secured'));
  assert.equal(s.run.pending?.eventId,'restricted-sites.production.city-return');
});

test('high suspicion changes terminal availability and failure clamps suspicion to 100',()=>{
  let s=year3Prepared();
  s=dispatch(s,{type:'enterActivity',id:'restricted.sites'},catalog);
  s=dispatch(s,{type:'activityAction',id:'restricted.route.service-ring'},catalog);
  s=dispatch(s,{type:'activityAction',id:'restricted.detour.infiltration-observe'},catalog);
  s=dispatch(s,{type:'activityAction',id:'restricted.infiltration.raw-window'},catalog);

  let game=s.run.flow.activity?.internalState.miniGames?.['restricted.infiltration-suspicion'];
  assert.equal(game?.stage,'inside');
  assert.equal(game?.suspicion,35);
  assert.equal(ids(s).includes('restricted.infiltration.clean-handoff'),false);
  assert.ok(ids(s).includes('restricted.infiltration.compromised'));

  s=dispatch(s,{type:'activityAction',id:'restricted.infiltration.compromised'},catalog);
  game=s.run.flow.activity?.internalState.miniGames?.['restricted.infiltration-suspicion'];
  assert.equal(game?.status,'failure');
  assert.equal(game?.suspicion,100);
  assert.equal(s.run.progression.worldFacts.includes('activity.restricted-sites.anchor-secured'),false);
  assert.ok(s.run.flow.activity,'mini-game failure is bounded and does not auto-finalize the region');
});

test('Evidence Case can turn moderate suspicion into mini-game success plus meaningful extraction',()=>{
  let s=year3Prepared();
  s.run.resources.inventory.assassin_evidence_case=1;
  s=dispatch(s,{type:'enterActivity',id:'restricted.sites'},catalog);
  s=dispatch(s,{type:'activityAction',id:'restricted.route.service-ring'},catalog);
  s=dispatch(s,{type:'activityAction',id:'restricted.detour.infiltration-observe'},catalog);
  s=dispatch(s,{type:'activityAction',id:'restricted.infiltration.raw-window'},catalog);

  assert.equal(
    s.run.flow.activity?.internalState.miniGames?.['restricted.infiltration-suspicion']?.suspicion,
    35
  );
  assert.ok(ids(s).includes('restricted.infiltration.secure-evidence'));

  s=dispatch(s,{type:'activityAction',id:'restricted.infiltration.secure-evidence'},catalog);
  const game=s.run.flow.activity?.internalState.miniGames?.['restricted.infiltration-suspicion'];
  assert.equal(game?.status,'success');
  assert.equal(game?.suspicion,50);
  assert.ok(s.run.progression.worldFacts.includes('activity.restricted-sites.result.evidence-secured'));
  assert.ok(s.run.progression.worldFacts.includes('activity.restricted-sites.mark.preservation'));
});

test('Infiltration abort is zero-cost after observation and old saves without suspicion default to zero',()=>{
  let aborted=year3Prepared();
  aborted=dispatch(aborted,{type:'enterActivity',id:'restricted.sites'},catalog);
  aborted=dispatch(aborted,{type:'activityAction',id:'restricted.route.service-ring'},catalog);
  aborted=dispatch(aborted,{type:'activityAction',id:'restricted.detour.infiltration-observe'},catalog);
  const beforeTime=aborted.run.flow.activity!.internalState.fieldTimeRemaining;
  aborted=dispatch(aborted,{type:'activityAction',id:'restricted.infiltration.abort'},catalog);
  assert.equal(
    aborted.run.flow.activity?.internalState.miniGames?.['restricted.infiltration-suspicion']?.status,
    'abort'
  );
  assert.equal(aborted.run.flow.activity?.internalState.fieldTimeRemaining,beforeTime);

  let legacy=year3Prepared();
  legacy=dispatch(legacy,{type:'enterActivity',id:'restricted.sites'},catalog);
  legacy=dispatch(legacy,{type:'activityAction',id:'restricted.route.service-ring'},catalog);
  legacy=dispatch(legacy,{type:'activityAction',id:'restricted.detour.infiltration-observe'},catalog);
  const raw:any=JSON.parse(JSON.stringify(legacy));
  delete raw.run.flow.activity.internalState.miniGames['restricted.infiltration-suspicion'].suspicion;
  const restored=parseSave(JSON.stringify(raw),catalog);
  assert.equal(
    restored.run.flow.activity?.internalState.miniGames?.['restricted.infiltration-suspicion']?.suspicion,
    0
  );
});

test('regional failure and escape remain distinct from mini-game failure/abort',()=>{
  let failed=year3Prepared();
  failed=dispatch(failed,{type:'enterActivity',id:'restricted.sites'},catalog);
  failed=dispatch(failed,{type:'activityAction',id:'restricted.route.service-ring'},catalog);
  for(let i=0;i<4&&failed.run.flow.activity;i++){
    failed=dispatch(failed,{type:'activityAction',id:'advance'},catalog);
  }
  assert.equal(failed.run.flow.activity,null);
  assert.ok(failed.run.progression.worldFacts.includes('restricted.sites.failed'));
  assert.equal(failed.run.progression.worldFacts.includes('activity.restricted-sites.anchor-secured'),false);

  let escaped=year3Prepared();
  escaped=dispatch(escaped,{type:'enterActivity',id:'restricted.sites'},catalog);
  escaped=dispatch(escaped,{type:'activityAction',id:'restricted.route.service-ring'},catalog);
  escaped=dispatch(escaped,{type:'activityAction',id:'escape'},catalog);
  assert.equal(escaped.run.flow.activity,null);
  assert.ok(escaped.run.progression.worldFacts.includes('restricted.sites.escaped'));
});

test('Sealed Annex repeats autumn/winter and access gates on every route-specific option',()=>{
  const sealedIds=new Set(restricted().options.filter(x=>x.setRoute==='sealed-annex').map(x=>x.id));

  let summer=year3Prepared();
  setDay(summer,90);
  summer.run.resources.inventory.assassin_sealed_pass=1;
  summer=dispatch(summer,{type:'enterActivity',id:'restricted.sites'},catalog);
  assert.equal(ids(summer).some(id=>sealedIds.has(id)),false);

  let autumnClosed=year3Prepared();
  setDay(autumnClosed,100);
  autumnClosed=dispatch(autumnClosed,{type:'enterActivity',id:'restricted.sites'},catalog);
  assert.equal(ids(autumnClosed).some(id=>sealedIds.has(id)),false);

  let autumnOpen=year3Prepared();
  setDay(autumnOpen,100);
  autumnOpen.run.resources.inventory.assassin_sealed_pass=1;
  autumnOpen=dispatch(autumnOpen,{type:'enterActivity',id:'restricted.sites'},catalog);
  assert.ok(ids(autumnOpen).includes('restricted.route.sealed-annex'));
  assert.ok(ids(autumnOpen).includes('restricted.challenge.annex-pass'));
  assert.ok(ids(autumnOpen).includes('restricted.shortcut.annex-service-door'));
});

test('Context Wing repeats disguise/School access gating and provides an explicit information-risk choice',()=>{
  const contextIds=new Set(restricted().options.filter(x=>x.setRoute==='context-wing').map(x=>x.id));

  let closed=year3Prepared();
  closed=dispatch(closed,{type:'enterActivity',id:'restricted.sites'},catalog);
  assert.equal(ids(closed).some(id=>contextIds.has(id)),false);

  let open=assassinIntel(year3Prepared());
  open.run.resources.inventory.assassin_disguise_kit=1;
  open=dispatch(open,{type:'enterActivity',id:'restricted.sites'},catalog);
  assert.ok(ids(open).includes('restricted.route.context-wing'));
  open=dispatch(open,{type:'activityAction',id:'restricted.route.context-wing'},catalog);
  assert.ok(ids(open).includes('restricted.challenge.context-intel-risk'));

  const risk=restricted().options.find(x=>x.id==='restricted.challenge.context-intel-risk');
  assert.ok(risk);
  assert.equal(risk.progressDelta,2);
  assert.equal(risk.enduranceCost,3);
  assert.equal(risk.fieldTimeCost,1);
});

test('accepted Handler contact can publish the fourth-region Network marker after a successful return',()=>{
  let s=acceptedHandler(year3Prepared());
  s=dispatch(s,{type:'enterActivity',id:'restricted.sites'},catalog);
  s=dispatch(s,{type:'activityAction',id:'restricted.route.service-ring'},catalog);
  s=dispatch(s,{type:'activityAction',id:'restricted.challenge.handler-handoff'},catalog);
  assert.ok(s.run.progression.worldFacts.includes('activity.restricted-sites.contact-thread-open'));

  s=dispatch(s,{type:'activityAction',id:'restricted.detour.infiltration-observe'},catalog);
  s=dispatch(s,{type:'activityAction',id:'restricted.infiltration.intel-window'},catalog);
  s=dispatch(s,{type:'activityAction',id:'restricted.infiltration.clean-handoff'},catalog);
  s=dispatch(s,{type:'activityAction',id:'restricted.shortcut.clean-route'},catalog);

  assert.equal(s.run.flow.activity,null);
  s=finishPending(s);
  assert.ok(s.run.progression.worldFacts.includes('activity.restricted-sites.mark.network'));
  assert.ok(
    s.run.progression.relationships['assassin.handler'].facts.includes('restricted-sites-return-shared')
  );
});

test('secured evidence + successful infiltration + anchor publishes research-grade candidate without an ending',()=>{
  let s=year3Prepared();
  s.run.resources.inventory.assassin_evidence_case=1;
  s=dispatch(s,{type:'enterActivity',id:'restricted.sites'},catalog);
  s=dispatch(s,{type:'activityAction',id:'restricted.route.service-ring'},catalog);
  s=dispatch(s,{type:'activityAction',id:'restricted.detour.infiltration-observe'},catalog);
  s=dispatch(s,{type:'activityAction',id:'restricted.infiltration.raw-window'},catalog);
  s=dispatch(s,{type:'activityAction',id:'restricted.infiltration.secure-evidence'},catalog);
  s=dispatch(s,{type:'activityAction',id:'restricted.shortcut.clean-route'},catalog);
  s=dispatch(s,{type:'activityAction',id:'advance'},catalog);
  assert.equal(s.run.flow.activity,null);
  s=finishPending(s);

  assert.ok(s.run.progression.worldFacts.includes('activity.restricted-sites.anchor-secured'));
  assert.ok(s.run.progression.worldFacts.includes('activity.restricted-sites.result.evidence-secured'));
  assert.ok(s.run.progression.worldFacts.includes('activity.restricted-sites.result.research-grade'));
  assert.equal(catalog.definitions.endings.some(e=>e.id.startsWith('ending.activity.')),false);
});

test('all four production region definitions coexist and keep 2-Energy entry contracts',()=>{
  const expected=[
    ['lumber.forest','lumber.forest.success'],
    ['trade.corridor','trade.corridor.success'],
    ['anomalous.reach','anomalous.reach.success'],
    ['restricted.sites','restricted.sites.success']
  ] as const;
  for(const [id,success] of expected){
    const activity=catalog.definitions.activities.find(x=>x.id===id);
    assert.ok(activity,id);
    assert.equal(activity.entryEnergyCost,2,id);
    assert.equal(activity.adapterConfig.fieldTimeSegments,6,id);
    assert.equal(activity.results.find(r=>r.outcome==='success')?.id,success,id);
  }
});

type Specialist='pathfinder'|'preservation'|'network';
function countDistinct(facts:Set<string>,groups:Record<string,string>){
  return new Set(Object.entries(groups).filter(([,fact])=>facts.has(fact)).map(([region])=>region)).size;
}
function commonReady(facts:Set<string>){
  const anchors={
    forest:'activity.forest-frontier.anchor-secured',
    trade:'activity.trade-corridor.anchor-secured',
    anomalous:'activity.anomalous-reach.anchor-secured',
    restricted:'activity.restricted-sites.anchor-secured'
  };
  const families=[
    facts.has('forest.frontier.tracking-triangulated')||facts.has('trade.corridor.tracking-verified'),
    facts.has('activity.anomalous-reach.minigame.pattern-ritual-complete'),
    facts.has('activity.restricted-sites.minigame.infiltration-suspicion-complete')
  ].filter(Boolean).length;
  const extraction=[
    'activity.trade-corridor.result.sample-secured',
    'activity.anomalous-reach.result.sample-secured',
    'activity.restricted-sites.result.evidence-secured'
  ].some(x=>facts.has(x));
  const contact=[
    'activity.forest-frontier.mark.network',
    'activity.trade-corridor.mark.network',
    'activity.anomalous-reach.mark.network',
    'activity.restricted-sites.mark.network'
  ].some(x=>facts.has(x));
  return countDistinct(facts,anchors)>=3&&families>=2&&extraction&&contact;
}
function specialistReady(kind:Specialist,facts:Set<string>){
  if(!commonReady(facts))return false;
  if(kind==='pathfinder'){
    const marks={
      forest:'activity.forest-frontier.mark.pathfinder',
      trade:'activity.trade-corridor.mark.pathfinder',
      anomalous:'activity.anomalous-reach.mark.pathfinder',
      restricted:'activity.restricted-sites.mark.pathfinder'
    };
    const tracking=facts.has('forest.frontier.tracking-triangulated')||facts.has('trade.corridor.tracking-verified');
    return countDistinct(facts,marks)>=2&&tracking;
  }
  if(kind==='preservation'){
    const marks={
      forest:'activity.forest-frontier.mark.preservation',
      trade:'activity.trade-corridor.mark.preservation',
      anomalous:'activity.anomalous-reach.mark.preservation',
      restricted:'activity.restricted-sites.mark.preservation'
    };
    const pattern=facts.has('activity.anomalous-reach.minigame.pattern-ritual-complete');
    const research=[
      'activity.forest-frontier.result.research-grade',
      'activity.anomalous-reach.result.research-grade',
      'activity.restricted-sites.result.research-grade'
    ].some(x=>facts.has(x));
    return countDistinct(facts,marks)>=2&&pattern&&research;
  }
  const marks={
    forest:'activity.forest-frontier.mark.network',
    trade:'activity.trade-corridor.mark.network',
    anomalous:'activity.anomalous-reach.mark.network',
    restricted:'activity.restricted-sites.mark.network'
  };
  const infiltration=facts.has('activity.restricted-sites.minigame.infiltration-suspicion-complete');
  return countDistinct(facts,marks)>=2&&infiltration;
}

test('D38 four-region readiness matrix has positive and negative cases while commit remains separate',()=>{
  const pathfinder=new Set([
    'activity.forest-frontier.anchor-secured',
    'activity.trade-corridor.anchor-secured',
    'activity.restricted-sites.anchor-secured',
    'forest.frontier.tracking-triangulated',
    'activity.restricted-sites.minigame.infiltration-suspicion-complete',
    'activity.trade-corridor.result.sample-secured',
    'activity.trade-corridor.mark.network',
    'activity.forest-frontier.mark.pathfinder',
    'activity.trade-corridor.mark.pathfinder'
  ]);
  assert.equal(specialistReady('pathfinder',pathfinder),true);

  const preservation=new Set([
    'activity.forest-frontier.anchor-secured',
    'activity.anomalous-reach.anchor-secured',
    'activity.restricted-sites.anchor-secured',
    'forest.frontier.tracking-triangulated',
    'activity.anomalous-reach.minigame.pattern-ritual-complete',
    'activity.anomalous-reach.result.sample-secured',
    'activity.anomalous-reach.result.research-grade',
    'activity.anomalous-reach.mark.network',
    'activity.forest-frontier.mark.preservation',
    'activity.anomalous-reach.mark.preservation'
  ]);
  assert.equal(specialistReady('preservation',preservation),true);

  const network=new Set([
    'activity.trade-corridor.anchor-secured',
    'activity.anomalous-reach.anchor-secured',
    'activity.restricted-sites.anchor-secured',
    'activity.anomalous-reach.minigame.pattern-ritual-complete',
    'activity.restricted-sites.minigame.infiltration-suspicion-complete',
    'activity.restricted-sites.result.evidence-secured',
    'activity.trade-corridor.mark.network',
    'activity.restricted-sites.mark.network'
  ]);
  assert.equal(specialistReady('network',network),true);

  const onlyTwoAnchors=new Set(pathfinder);
  onlyTwoAnchors.delete('activity.restricted-sites.anchor-secured');
  assert.equal(commonReady(onlyTwoAnchors),false);

  const onlyOnePathfinderMark=new Set(pathfinder);
  onlyOnePathfinderMark.delete('activity.trade-corridor.mark.pathfinder');
  assert.equal(specialistReady('pathfinder',onlyOnePathfinderMark),false);

  const noResearchGrade=new Set(preservation);
  noResearchGrade.delete('activity.anomalous-reach.result.research-grade');
  assert.equal(specialistReady('preservation',noResearchGrade),false);

  const oneNetworkRegion=new Set(network);
  oneNetworkRegion.delete('activity.trade-corridor.mark.network');
  assert.equal(specialistReady('network',oneNetworkRegion),false);

  assert.equal(catalog.definitions.endings.some(e=>e.id.startsWith('ending.activity.')),false);
});

test('legacy Assassin infiltration remains unlimited and separate from Restricted Sites suspicion',()=>{
  const legacy=catalog.definitions.activities.find(x=>x.id==='assassin.infiltration');
  assert.ok(legacy);
  assert.equal(legacy.adapterConfig.fieldTimeSegments,undefined);
  assert.equal(legacy.results.find(r=>r.outcome==='success')?.id,'assassin.infiltration.success');

  let s=started();
  s.run.dayState.energyCurrent=3;
  s.run.progression.careers.assassin={
    stage:'trusted-blade',shifts:20,counters:{},choices:{},facts:['infiltration-qualified']
  };
  s=dispatch(s,{type:'enterActivity',id:'assassin.infiltration'},catalog);
  assert.equal(s.run.flow.activity?.internalState.fieldTimeRemaining,null);
  assert.deepEqual(s.run.flow.activity?.internalState.miniGames,{});
});

test('Restricted Sites production does not touch Palace, Secret Debt, NightFlow, or universal Activity XP',()=>{
  const payload=JSON.stringify({activity:restricted(),pack:restrictedPack}).toLowerCase();
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
