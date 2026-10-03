import test from 'node:test';
import assert from 'node:assert/strict';

import {
  D31_NEGATIVE_TARGETS,
  D32_KEYSTONE_PARAMETERS,
  LIVE_ECONOMY_STRATEGIES,
  formatLiveEconomyAffordabilitySummary,
  loadLiveEconomySource,
  runLiveEconomyAffordabilityHarness,
  simulateEconomyStrategy
} from '../scripts/live-economy-affordability-harness.ts';
import {ordinaryHardWorkCareers,seasons} from '../src/core/schema.ts';
import {SCHOOL_COURSES} from '../src/core/school.ts';

test('live economy source matches current executable prices, Energy and School catalog',()=>{
  const source=loadLiveEconomySource();
  const result=runLiveEconomyAffordabilityHarness(source);

  assert.equal(result.source.startingMoney,600);
  assert.equal(result.source.baseDailyEnergy,3);
  assert.deepEqual(result.source.lodging,{
    normal:100,
    cheap:50,
    street:0,
    streetNextDayEnergyDelta:-1,
    streetGroomingDelta:-1,
    paidNightsPerFullRun:159,
    normalMechanicallyDominatedByCheap:true
  });
  assert.deepEqual(
    result.source.school.map(course=>course.tuition),
    [300,500,300,400,400,400,500,400]
  );
  assert.deepEqual(
    result.source.school.map(course=>course.energyCost),
    Array(SCHOOL_COURSES.length).fill(1)
  );
  assert.equal(result.source.d26SameCareerShiftLimitPerDay,1);
  assert.equal(result.source.d31TargetCount,20);
  assert.equal(result.source.hardWorkThreshold,50);
});

test('D31 research overlay is exact and covers only the 20 existing negative-season cells',()=>{
  const expected:any={
    lumber:{spring:'dexterity',winter:'strength'},
    'satyr-maid':{summer:'sociability',autumn:'endurance'},
    'undead-farm':{spring:'reason',autumn:'strength'},
    tavern:{spring:'reason',summer:'wits'},
    hunter:{spring:'endurance',winter:'dexterity'},
    guard:{summer:'manners',winter:'reason'},
    merchant:{summer:'wits',winter:'manners'},
    'artist-geisha':{summer:'manners',autumn:'dexterity'},
    assassin:{spring:'reason',winter:'manners'},
    prostitute:{summer:'sexuality',winter:'endurance'}
  };
  assert.deepEqual(D31_NEGATIVE_TARGETS,expected);

  const source=loadLiveEconomySource();
  let liveNegativeCells=0;
  for(const career of ordinaryHardWorkCareers){
    const action=source.definitions.actions.find(candidate=>candidate.id===career+'.shift');
    assert.ok(action?.seasonal,career);
    for(const season of seasons){
      const negatives=action.seasonal[season].filter(effect=>
        effect.kind==='modifyStat'&&effect.delta<0
      );
      assert.ok(negatives.length<=1,career+' '+season);
      if(negatives.length){
        liveNegativeCells++;
        assert.ok(D31_NEGATIVE_TARGETS[career][season],career+' '+season);
      }
    }
  }
  assert.equal(liveNegativeCells,20);
});

test('all research strategies spend exactly the 10 manual creation points',()=>{
  assert.equal(LIVE_ECONOMY_STRATEGIES.length,7);
  for(const strategy of LIVE_ECONOMY_STRATEGIES){
    assert.equal(
      Object.values(strategy.allocation).reduce((sum,value)=>sum+(value??0),0),
      10,
      strategy.id
    );
  }
});

test('survival-first proves cheap lodging can be sustained without street or Keystone',()=>{
  const result=runLiveEconomyAffordabilityHarness();
  const row=result.primary.find(candidate=>candidate.id==='survival-first');
  assert.ok(row);

  assert.deepEqual(row.moneyTrajectory,{
    day10:715,
    day20:1080,
    day40:2260,
    day50:3074,
    day80:6368,
    day120:11826,
    day160:18452
  });
  assert.deepEqual(row.lodgingNights,{normal:0,cheap:159,street:0});
  assert.deepEqual(row.hardWorkCompletionDays,{
    lumber:50,
    'satyr-maid':50,
    'undead-farm':50
  });
  assert.equal(row.forcedStreetNights,0);
  assert.equal(row.energyLostToStreet,0);
  assert.equal(row.affordabilitySpiral,false);
  assert.equal(row.d31VsLiveShipped.grossWorkIncomeDelta,-2012);
});

test('normal lodging is affordable under maximum starter work but still mechanically dominated by cheap',()=>{
  const result=runLiveEconomyAffordabilityHarness();
  const row=result.primary.find(candidate=>candidate.id==='normal-preference');
  assert.ok(row);

  assert.deepEqual(row.lodgingNights,{normal:159,cheap:0,street:0});
  assert.equal(row.mechanicallyRationalNormalNights,0);
  assert.equal(row.normalPremiumSpentVsCheap,7950);
  assert.equal(row.finalMoney,10502);
  assert.equal(result.assessment.normalLodgingMechanicallyRationalUnderCurrentSemantics,false);
});

test('School investment completes all sixteen scheduled paid Rhetoric lessons without street',()=>{
  const result=runLiveEconomyAffordabilityHarness();
  const row=result.primary.find(candidate=>candidate.id==='school-investment');
  assert.ok(row);

  assert.deepEqual(row.school,{
    opportunities:16,
    moneyAffordable:16,
    completed:16,
    tuitionPaid:4800,
    courseId:'school.course.rhetoric_and_social'
  });
  assert.deepEqual(row.lodgingNights,{normal:0,cheap:159,street:0});
  assert.equal(row.finalMoney,15636);
  assert.equal(result.assessment.schoolInvestmentCanCompleteAllScheduledLessonsWithoutStreet,true);
});

test('one-career Hard Work reaches Day 50 but has intermittent affordability failures',()=>{
  const result=runLiveEconomyAffordabilityHarness();
  const row=result.primary.find(candidate=>candidate.id==='one-career-hard-work');
  assert.ok(row);

  assert.equal(row.hardWorkCompletionDays.lumber,50);
  assert.equal(row.forcedStreetNights,4);
  assert.equal(row.maxForcedStreetStreak,1);
  assert.equal(row.energyLostToStreet,4);
  assert.equal(row.affordabilitySpiral,false);
  assert.equal(row.finalMoney,2389);
  assert.equal(result.assessment.oneCareerFocusNeedsAnyForcedStreet,true);
});

test('sequential diversified Hard Work completes nine careers by Day 150 without street',()=>{
  const result=runLiveEconomyAffordabilityHarness();
  const row=result.primary.find(candidate=>candidate.id==='diversified-multi-hard-work');
  assert.ok(row);

  assert.deepEqual(row.hardWorkCompletionDays,{
    lumber:50,
    'satyr-maid':50,
    'undead-farm':50,
    tavern:100,
    hunter:100,
    guard:100,
    merchant:150,
    'artist-geisha':150,
    assassin:150
  });
  assert.deepEqual(row.lodgingNights,{normal:0,cheap:159,street:0});
  assert.equal(row.shifts.prostitute,10);
  assert.equal(row.finalMoney,19162);
});

test('street fallback loses one Energy after every one of the 159 street nights',()=>{
  const result=runLiveEconomyAffordabilityHarness();
  const row=result.primary.find(candidate=>candidate.id==='poverty-street');
  assert.ok(row);

  assert.deepEqual(row.lodgingNights,{normal:0,cheap:0,street:159});
  assert.equal(row.energyLostToStreet,159);
  assert.equal(row.forcedStreetNights,0);
  assert.equal(row.literalDebtCreated,false);
  assert.equal(row.finalMoney,15377);
});

test('mixed New Start+ uses earned Hard Work for Day-1 inherited access and applies selected packages',()=>{
  const result=runLiveEconomyAffordabilityHarness();
  const row=result.primary.find(candidate=>candidate.id==='mixed-newstart');
  assert.ok(row);

  assert.deepEqual(row.earnedHardWork,[
    'lumber','undead-farm','hunter','merchant','assassin'
  ]);
  assert.deepEqual(row.activeHardWorkPackages,row.earnedHardWork);
  assert.equal(row.careerUnlockDays.hunter,1);
  assert.equal(row.careerUnlockDays.merchant,1);
  assert.equal(row.careerUnlockDays.assassin,1);
  assert.equal(row.hardWorkCompletionDays.hunter,50);
  assert.equal(row.hardWorkCompletionDays.merchant,50);
  assert.equal(row.hardWorkCompletionDays.assassin,50);
  assert.equal(row.finalMoney,20078);
});

test('D32 research overlays respect exact 1000 / 20 / 1000 caps',()=>{
  const result=runLiveEconomyAffordabilityHarness();
  const reserve=result.d32Comparisons.find(row=>row.overlay==='reserve-match');
  const rhythm=result.d32Comparisons.find(row=>row.overlay==='work-rhythm');
  const retainer=result.d32Comparisons.find(row=>row.overlay==='retainer');
  assert.ok(reserve&&rhythm&&retainer);

  assert.equal(D32_KEYSTONE_PARAMETERS.reserveMatchCap,1000);
  assert.equal(reserve.keystone.reserveMatchPaid,1000);
  assert.equal(reserve.finalMoney,21078);

  assert.equal(D32_KEYSTONE_PARAMETERS.workRhythmRewardedDays,20);
  assert.equal(rhythm.keystone.workRhythmEnergyGranted,20);
  assert.equal(rhythm.keystone.workRhythmEnergyUsed,20);
  assert.equal(rhythm.finalMoney,21735);

  assert.equal(D32_KEYSTONE_PARAMETERS.retainerDailyPayment,25);
  assert.equal(D32_KEYSTONE_PARAMETERS.retainerWindowDays,40);
  assert.equal(retainer.keystone.retainerPaid,1000);
  assert.equal(retainer.finalMoney,21078);
});

test('research simulation does not mutate live definitions and summary/JSON remain reproducible',()=>{
  const source=loadLiveEconomySource();
  const before=JSON.stringify(source.definitions);
  const spec=LIVE_ECONOMY_STRATEGIES.find(candidate=>candidate.id==='survival-first');
  assert.ok(spec);

  const d31=simulateEconomyStrategy(source,spec,{negativeMap:'d31'});
  const shipped=simulateEconomyStrategy(source,spec,{negativeMap:'live-shipped'});
  assert.equal(JSON.stringify(source.definitions),before);
  assert.equal(d31.grossWorkIncome-shipped.grossWorkIncome,-2012);

  const result=runLiveEconomyAffordabilityHarness(source);
  assert.doesNotThrow(()=>JSON.stringify(result));
  const summary=formatLiveEconomyAffordabilitySummary(result);
  assert.match(summary,/Live Economy Affordability Harness v7/);
  assert.match(summary,/viable without chronic street\/Keystone: true/);
});
