import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {dispatch,eligible} from '../src/core/engine.ts';
import {catalog,started} from './helpers.ts';

const fixture=JSON.parse(readFileSync('content/activity-ending-family-v16.fixture.json','utf8'));
const localization=JSON.parse(readFileSync('content/localization.json','utf8')).strings;

const ENDINGS={
  pathfinder:'ending.activity.pathfinder',
  preservation:'ending.activity.preservation',
  network:'ending.activity.network'
} as const;
const REWARDS={
  pathfinder:'specialist.activity.surveyors-atlas',
  preservation:'specialist.activity.field-archive',
  network:'specialist.activity.contact-network'
} as const;

const positive={
  pathfinder:[
    'activity.forest-frontier.anchor-secured',
    'activity.trade-corridor.anchor-secured',
    'activity.restricted-sites.anchor-secured',
    'forest.frontier.tracking-triangulated',
    'activity.restricted-sites.minigame.infiltration-suspicion-complete',
    'activity.trade-corridor.result.sample-secured',
    'activity.trade-corridor.mark.network',
    'activity.forest-frontier.mark.pathfinder',
    'activity.trade-corridor.mark.pathfinder'
  ],
  preservation:[
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
  ],
  network:[
    'activity.trade-corridor.anchor-secured',
    'activity.anomalous-reach.anchor-secured',
    'activity.restricted-sites.anchor-secured',
    'activity.anomalous-reach.minigame.pattern-ritual-complete',
    'activity.restricted-sites.minigame.infiltration-suspicion-complete',
    'activity.restricted-sites.result.evidence-secured',
    'activity.trade-corridor.mark.network',
    'activity.restricted-sites.mark.network'
  ]
} as const;

function ending(id:string){
  const found=catalog.definitions.endings.find(e=>e.id===id);
  assert.ok(found,id);
  return found;
}
function stateWithFacts(facts:readonly string[]){
  const s=started();
  s.run.progression.worldFacts=[...new Set([...s.run.progression.worldFacts,...facts])];
  return s;
}
function ready(id:string,facts:readonly string[]){
  return eligible(ending(id).conditions,stateWithFacts(facts),catalog);
}

test('D38 Activity family exposes exact stable ending and Specialist reward IDs',()=>{
  assert.deepEqual(fixture.endingIds,Object.values(ENDINGS));
  for(const kind of Object.keys(ENDINGS) as (keyof typeof ENDINGS)[]){
    const e=ending(ENDINGS[kind]);
    assert.equal(e.reward,REWARDS[kind]);
    assert.deepEqual(e.metaRewards,[{
      kind:'strongMeta',
      rewardId:REWARDS[kind],
      reward:REWARDS[kind]
    }]);
  }
});

test('D38 common baseline and all three positive readiness matrices are live conditions',()=>{
  assert.equal(ready(ENDINGS.pathfinder,positive.pathfinder),true);
  assert.equal(ready(ENDINGS.preservation,positive.preservation),true);
  assert.equal(ready(ENDINGS.network,positive.network),true);

  const onlyTwoAnchors=positive.pathfinder.filter(x=>x!=='activity.restricted-sites.anchor-secured');
  assert.equal(ready(ENDINGS.pathfinder,onlyTwoAnchors),false);

  const oneFamily=positive.pathfinder.filter(x=>x!=='activity.restricted-sites.minigame.infiltration-suspicion-complete');
  assert.equal(ready(ENDINGS.pathfinder,oneFamily),false);

  const noExtraction=positive.pathfinder.filter(x=>x!=='activity.trade-corridor.result.sample-secured');
  assert.equal(ready(ENDINGS.pathfinder,noExtraction),false);

  const noContact=positive.pathfinder.filter(x=>x!=='activity.trade-corridor.mark.network');
  assert.equal(ready(ENDINGS.pathfinder,noContact),false);
});

test('marked-anchor requirements pair classification with the completed region',()=>{
  const markerWithoutItsAnchor=[
    ...positive.pathfinder.filter(x=>x!=='activity.trade-corridor.anchor-secured'),
    'activity.anomalous-reach.anchor-secured'
  ];
  assert.equal(markerWithoutItsAnchor.filter(x=>x.endsWith('anchor-secured')).length,3);
  assert.equal(ready(ENDINGS.pathfinder,markerWithoutItsAnchor),false);

  const noSecondPathfinder=positive.pathfinder.filter(x=>x!=='activity.trade-corridor.mark.pathfinder');
  assert.equal(ready(ENDINGS.pathfinder,noSecondPathfinder),false);

  const noResearch=positive.preservation.filter(x=>x!=='activity.anomalous-reach.result.research-grade');
  assert.equal(ready(ENDINGS.preservation,noResearch),false);

  const oneNetworkRegion=positive.network.filter(x=>x!=='activity.trade-corridor.mark.network');
  assert.equal(ready(ENDINGS.network,oneNetworkRegion),false);
});

test('D16 explicit commit remains non-terminal and Specialist ownership arrives only on completion',()=>{
  let s=stateWithFacts(positive.pathfinder);
  assert.equal(eligible(ending(ENDINGS.pathfinder).conditions,s,catalog),true);
  assert.equal(s.run.status,'active');
  assert.equal(s.run.endings.committed,null);
  assert.equal(s.meta.unlocks.includes(REWARDS.pathfinder),false);

  // Registration normally happens at a production resolver boundary. This test
  // isolates D16 commit/completion after proving the authored eligibility above.
  s.run.endings.eligible=[ENDINGS.pathfinder,ENDINGS.network];

  s=dispatch(s,{type:'commitEnding',id:ENDINGS.pathfinder},catalog);
  assert.equal(s.run.status,'ending_committed');
  assert.equal(s.run.endings.result,null);
  assert.equal(s.meta.unlocks.includes(REWARDS.pathfinder),false);
  assert.throws(()=>dispatch(s,{type:'commitEnding',id:ENDINGS.network},catalog),/другая судьба/i);

  s=dispatch(s,{type:'completeEnding'},catalog);
  assert.equal(s.run.status,'ended');
  assert.equal(s.run.endings.result?.endingId,ENDINGS.pathfinder);
  assert.deepEqual(s.run.endings.result?.appliedMetaRewardIds,[REWARDS.pathfinder]);
  assert.ok(s.meta.completedEndings.includes(ENDINGS.pathfinder));
  assert.ok(s.meta.unlocks.includes(REWARDS.pathfinder));
});

test('D23 D28 Energy XP and Secret Debt firewalls are assembly-safe on this historical branch',()=>{
  for(const id of ['lumber.forest','trade.corridor','anomalous.reach','restricted.sites']){
    const activity=catalog.definitions.activities.find(a=>a.id===id);
    assert.ok(activity,id);
    assert.equal(activity.entryEnergyCost,2,id);
  }

  for(const id of Object.values(ENDINGS)){
    const raw=JSON.stringify(ending(id));
    assert.equal(raw.includes('palace.'),false,id);
    assert.equal(raw.toLowerCase().includes('hardwork'),false,id);
    assert.equal(raw.toLowerCase().includes('activityxp'),false,id);
    assert.equal(raw.toLowerCase().includes('secret-debt'),false,id);
  }

  assert.equal(fixture.sharedRewardRules.normalD28MaxActiveSpecialists,2);
  assert.equal(fixture.sharedRewardRules.noActivityOnlyBonusSlot,true);
  assert.equal(fixture.sharedRewardRules.selectableNotAutomatic,true);
  assert.equal(fixture.bindingStatus,'CHAT2_CANONICAL_STRONG_META_BINDING_REQUIRED');
});

test('RU EN functional copy covers all Activity endings and Specialist seams',()=>{
  const keys=[
    'ending.ending.activity.pathfinder.title',
    'ending.ending.activity.pathfinder.description',
    'ending.ending.activity.preservation.title',
    'ending.ending.activity.preservation.description',
    'ending.ending.activity.network.title',
    'ending.ending.activity.network.description',
    'unlock.specialist.activity.surveyors-atlas.label',
    'specialist.activity.surveyors-atlas.description',
    'unlock.specialist.activity.field-archive.label',
    'specialist.activity.field-archive.description',
    'unlock.specialist.activity.contact-network.label',
    'specialist.activity.contact-network.description'
  ];
  for(const key of keys){
    assert.ok(localization[key]?.ru?.trim(),key+' ru');
    assert.ok(localization[key]?.en?.trim(),key+' en');
  }
});
