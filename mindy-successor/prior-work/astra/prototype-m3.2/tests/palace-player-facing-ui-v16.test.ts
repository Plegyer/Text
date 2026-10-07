import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

import {parseSave} from '../src/core/engine.ts';
import {
  PALACE_ACCESS_FACT,
  PALACE_DUTY_COUNTER,
  PALACE_PRINCE_DEFEATED_FACT,
  PALACE_PROGRESSION_COMPLETE_FACT,
  palaceDutyDefinitions,
  palaceExpectedStageForDutyCount
} from '../src/core/palace.ts';
import {ordinaryHardWorkCareers,stats,type Save} from '../src/core/schema.ts';
import {
  PALACE_ENDING_IDS,
  palaceFullTrueEndingPredicate,
  palacePlayerUiModel,
  palaceRewardPreviewByEnding
} from '../src/ui/palaceUi.ts';
import {catalog,started} from './helpers.ts';

const localization=JSON.parse(readFileSync('content/localization.json','utf8')).strings;
const appSource=readFileSync('src/ui/app.ts','utf8');

function openedPalace(count=0){
  const s=started();
  if(!s.run.progression.worldFacts.includes(PALACE_ACCESS_FACT))s.run.progression.worldFacts.push(PALACE_ACCESS_FACT);
  const palace=s.run.progression.palace;
  palace.stage=palaceExpectedStageForDutyCount(count);
  palace.shifts=count;
  palace.counters[PALACE_DUTY_COUNTER]=count;
  palace.committedDutyIds=palaceDutyDefinitions.slice(0,count).map(definition=>definition.id);
  palace.lastStructuralDutyDay=-1;
  palace.lastSupportActionDay=-1;
  palace.completedSupportIds=[];
  palace.routePrepFacts=[];
  palace.facts=[];
  s.run.progression.worldFacts=s.run.progression.worldFacts.filter(fact=>
    !fact.startsWith('palace.prep.')
    && !fact.startsWith('palace.outcome.')
    && fact!==PALACE_PROGRESSION_COMPLETE_FACT
    && fact!==PALACE_PRINCE_DEFEATED_FACT
  );
  if(count===15)s.run.progression.worldFacts.push(PALACE_PROGRESSION_COMPLETE_FACT);
  return parseSave(JSON.stringify(s),catalog);
}

function addSupportCompletion(input:Save,id:string){
  const s=structuredClone(input) as Save;
  const palace=s.run.progression.palace;
  if(!palace.completedSupportIds.includes(id))palace.completedSupportIds.push(id);
  if(!palace.facts.includes(id))palace.facts.push(id);
  return s;
}

function prepareRoute(input:Save,route:'service-life'|'court-power'|'inner-truth'){
  let s=structuredClone(input) as Save;
  const ids={
    'service-life':[
      'palace.outcome-prep.service-life.01-continuity',
      'palace.outcome-prep.service-life.02-boundaries'
    ],
    'court-power':[
      'palace.outcome-prep.court-power.01-responsibility',
      'palace.outcome-prep.court-power.02-network'
    ],
    'inner-truth':[
      'palace.outcome-prep.inner-truth.01-evidence',
      'palace.outcome-prep.inner-truth.02-contradiction'
    ]
  }[route];
  for(const id of ids)s=addSupportCompletion(s,id);
  if(!s.run.progression.palace.routePrepFacts.includes(route))s.run.progression.palace.routePrepFacts.push(route);
  const fact=`palace.prep.${route}`;
  if(!s.run.progression.worldFacts.includes(fact))s.run.progression.worldFacts.push(fact);
  return parseSave(JSON.stringify(s),catalog);
}

test('Palace player UI is absent before legitimate run-local access and appears after access',()=>{
  const before=started();
  assert.equal(palacePlayerUiModel(before),null);

  const opened=openedPalace();
  const model=palacePlayerUiModel(opened);
  assert.ok(model);
  assert.equal(model.accessGranted,true);
  assert.equal(opened.meta.unlocks.includes('palace'),false);
  assert.equal((ordinaryHardWorkCareers as readonly string[]).includes('palace'),false);
});

test('initial Palace UI exposes exact stage, 0/15 progress, duty Energy 1 and bounded wage preview',()=>{
  const model=palacePlayerUiModel(openedPalace())!;
  assert.equal(model.stage,'entered-service');
  assert.equal(model.dutyCount,0);
  assert.equal(model.dutyTotal,15);
  assert.equal(model.structuralDutyUsedToday,false);
  assert.equal(model.nextDutyId,'palace.duty.01-service-rotation');
  assert.equal(model.nextDutyAvailable,true);
  assert.equal(model.structuralDutyEnergyCost,1);
  assert.equal(model.supportEnergyCost,1);
  assert.ok(model.wagePreview>=35&&model.wagePreview<=55);
  assert.deepEqual(model.routes,[]);
  assert.deepEqual(model.availableSupportIds,[]);
});

test('daily structural lock is presented independently from extra Energy',()=>{
  const s=openedPalace(1);
  s.run.dayState.energyCurrent=3;
  s.run.progression.palace.lastStructuralDutyDay=s.run.calendar.elapsedDays;
  const model=palacePlayerUiModel(s)!;
  assert.equal(model.structuralDutyUsedToday,true);
  assert.equal(model.nextDutyId,'palace.duty.02-logistics-support');
  assert.equal(model.nextDutyAvailable,false);
  assert.equal(s.run.dayState.energyCurrent,3);
});

test('route names are exposed only when their accepted stage threshold is reached',()=>{
  const initial=palacePlayerUiModel(openedPalace(0))!;
  assert.deepEqual(initial.routes.map(route=>route.route),[]);

  const trusted=palacePlayerUiModel(openedPalace(5))!;
  assert.deepEqual(trusted.routes.map(route=>route.route),['service-life']);

  const network=palacePlayerUiModel(openedPalace(8))!;
  assert.deepEqual(network.routes.map(route=>route.route),['service-life','court-power']);

  const crossroads=palacePlayerUiModel(openedPalace(12))!;
  assert.deepEqual(crossroads.routes.map(route=>route.route),['service-life','court-power','inner-truth']);
});

test('support availability and daily support lock stay separate from structural duty progress',()=>{
  let s=openedPalace(5);
  let model=palacePlayerUiModel(s)!;
  assert.deepEqual(model.availableSupportIds,['palace.outcome-prep.service-life.01-continuity']);
  assert.equal(model.supportUsedToday,false);

  s=addSupportCompletion(s,'palace.outcome-prep.service-life.01-continuity');
  s.run.progression.palace.lastSupportActionDay=s.run.calendar.elapsedDays;
  model=palacePlayerUiModel(s)!;
  assert.equal(model.supportUsedToday,true);
  assert.deepEqual(model.availableSupportIds,[]);
  assert.equal(model.dutyCount,5);
  assert.equal(model.routes[0]?.state,'in-progress');

  s.run.calendar.elapsedDays++;
  s.run.progression.palace.lastSupportActionDay=-1;
  model=palacePlayerUiModel(s)!;
  assert.deepEqual(model.availableSupportIds,['palace.outcome-prep.service-life.02-boundaries']);
});

test('route preparation is non-exclusive in UI and final-ready state is distinct',()=>{
  let s=openedPalace(15);
  s=prepareRoute(s,'service-life');
  s=prepareRoute(s,'court-power');
  s=prepareRoute(s,'inner-truth');
  let model=palacePlayerUiModel(s)!;

  assert.equal(model.outcomeReady,true);
  assert.deepEqual(model.routes.map(route=>[route.route,route.state]),[
    ['service-life','prepared'],
    ['court-power','prepared'],
    ['inner-truth','prepared']
  ]);

  for(const route of ['service-life','court-power','inner-truth'] as const){
    const fact=`palace.outcome.${route}-ready`;
    if(!s.run.progression.worldFacts.includes(fact))s.run.progression.worldFacts.push(fact);
  }
  s.run.endings.eligible=[
    ...s.run.endings.eligible.filter(id=>!id.startsWith('ending.palace.')),
    'ending.palace.service-life',
    'ending.palace.court-power',
    'ending.palace.inner-truth'
  ];
  s=parseSave(JSON.stringify(s),catalog);
  model=palacePlayerUiModel(s)!;
  assert.deepEqual(model.routes.map(route=>[route.route,route.state]),[
    ['service-life','ready'],
    ['court-power','ready'],
    ['inner-truth','ready']
  ]);
  assert.deepEqual(model.eligibleEndingIds.filter(id=>id!=='ending.palace.return-home'),[
    'ending.palace.service-life',
    'ending.palace.court-power',
    'ending.palace.inner-truth'
  ]);
});

test('Return Home is exposed only for the full runtime predicate and Lust is irrelevant',()=>{
  let s=openedPalace(15);
  for(const stat of stats)s.run.character.stats[stat]=91;
  s.run.character.lust=100;
  s.run.progression.worldFacts.push(PALACE_PRINCE_DEFEATED_FACT);
  s.run.endings.eligible.push('ending.palace.return-home');
  s=parseSave(JSON.stringify(s),catalog);

  assert.equal(palaceFullTrueEndingPredicate(s),true);
  assert.equal(palacePlayerUiModel(s)!.trueEndingEligible,true);
  assert.equal(palacePlayerUiModel(s)!.eligibleEndingIds.includes('ending.palace.return-home'),true);

  const low=structuredClone(s) as Save;
  low.run.character.stats.reason=90;
  low.run.character.lust=1;
  assert.equal(palaceFullTrueEndingPredicate(low),false);
  low.run.endings.eligible.push('ending.palace.return-home');
  assert.equal(palacePlayerUiModel(low)!.trueEndingEligible,false);
  assert.equal(palacePlayerUiModel(low)!.eligibleEndingIds.includes('ending.palace.return-home'),false);

  const noPrince=structuredClone(s) as Save;
  noPrince.run.progression.worldFacts=noPrince.run.progression.worldFacts.filter(fact=>fact!==PALACE_PRINCE_DEFEATED_FACT);
  assert.equal(palaceFullTrueEndingPredicate(noPrince),false);
  noPrince.run.endings.eligible.push('ending.palace.return-home');
  assert.equal(palacePlayerUiModel(noPrince)!.eligibleEndingIds.includes('ending.palace.return-home'),false);
});

test('Palace reward preview uses exact locked identities and no local loadout registry',()=>{
  assert.deepEqual(PALACE_ENDING_IDS,[
    'ending.palace.service-life',
    'ending.palace.court-power',
    'ending.palace.inner-truth',
    'ending.palace.return-home'
  ]);
  assert.equal(palaceRewardPreviewByEnding['ending.palace.service-life'].rewardId,'palace.service-life.steady-practice');
  assert.equal(palaceRewardPreviewByEnding['ending.palace.service-life'].fallbackName,'Steady Practice');
  assert.equal(palaceRewardPreviewByEnding['ending.palace.court-power'].rewardId,'palace.court-power.formal-introduction');
  assert.equal(palaceRewardPreviewByEnding['ending.palace.court-power'].fallbackName,'Formal Introduction');
  assert.equal(palaceRewardPreviewByEnding['ending.palace.inner-truth'].rewardId,'palace.inner-truth.source-method');
  assert.equal(palaceRewardPreviewByEnding['ending.palace.inner-truth'].fallbackName,'Source Method');
  assert.equal(palaceRewardPreviewByEnding['ending.palace.return-home'].rewardId,'palace.true.cap-200');
  assert.equal(/strongRewardRegistry|activeSpecialists|selectedSpecialists/.test(appSource),false);
});

test('app keeps Palace outside the ordinary professions and Hard Work card surface',()=>{
  const professionsMatch=appSource.match(/const professions=\[([^\]]+)\]/);
  assert.ok(professionsMatch);
  assert.equal(professionsMatch[1].includes('palace'),false);
  assert.equal(appSource.includes('palace.shift'),false);
  assert.equal((ordinaryHardWorkCareers as readonly string[]).includes('palace'),false);
});

test('all v16 Palace UI localization keys have RU and EN',()=>{
  const required=[
    'ui.palace.title',
    'ui.palace.accessLabel',
    'ui.palace.accessGranted',
    'ui.palace.stageLabel',
    'ui.palace.dutyProgressLabel',
    'ui.palace.dutyProgress',
    'ui.palace.duty.complete',
    'ui.palace.duty.usedToday',
    'ui.palace.duty.availableToday',
    'ui.palace.dutyCostLabel',
    'ui.palace.wagePreviewLabel',
    'ui.palace.nextDutyTitle',
    'ui.palace.supportTitle',
    'ui.palace.support.usedToday',
    'ui.palace.support.availableToday',
    'ui.palace.supportCost',
    'ui.palace.actionButton',
    'ui.palace.route.service-life.label',
    'ui.palace.route.court-power.label',
    'ui.palace.route.inner-truth.label',
    'ui.palace.routeState.available',
    'ui.palace.routeState.in-progress',
    'ui.palace.routeState.prepared',
    'ui.palace.routeState.ready',
    'ui.palace.outcomeReady',
    'ui.palace.endings.title',
    'ui.palace.endings.noneReady',
    'ui.palace.futureRewardLabel',
    'ui.palace.reward.steadyPractice.name',
    'ui.palace.reward.formalIntroduction.name',
    'ui.palace.reward.sourceMethod.name',
    'ui.palace.reward.cap200.name',
    'ui.palace.reward.layer.specialist',
    'ui.palace.reward.layer.automaticKnowledge',
    'ui.palace.reward.specialistNote',
    'ui.palace.reward.automaticNote',
    'ui.palace.summaryAria',
    'ui.palace.routeAria',
    'ui.palace.rewardAria'
  ];

  for(const key of required){
    assert.ok(localization[key],key);
    assert.ok(localization[key].ru?.trim(),key+' ru');
    assert.ok(localization[key].en?.trim(),key+' en');
  }
});

test('player-facing Palace UI source does not render internal route fact IDs as requirement text',()=>{
  for(const internal of [
    'palace.prep.service-life',
    'palace.prep.court-power',
    'palace.prep.inner-truth',
    'palace.outcome.service-life-ready',
    'palace.outcome.court-power-ready',
    'palace.outcome.inner-truth-ready'
  ]){
    assert.equal(appSource.includes(internal),false,internal);
  }
});
