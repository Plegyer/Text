import test from 'node:test';
import assert from 'node:assert/strict';

import {
  LIVE_BASELINE,
  RECOMMENDATION,
  reserveSweep,
  retainerSweep,
  workRhythmSweep
} from '../scripts/secret-debt-keystone-calibration-v7.ts';

test('v7 recommendation stays research-only and matches the calibrated D30 parameter set',()=>{
  assert.equal(RECOMMENDATION.researchOnly,true);
  assert.deepEqual(RECOMMENDATION.earnedReserveMatch,{cap:1000});
  assert.deepEqual(RECOMMENDATION.workRhythm,{maxTriggeredBonusDays:20});
  assert.deepEqual(
    RECOMMENDATION.networkRetainer,
    {dailyPayment:25,durationDays:40,totalCap:1000}
  );
});

test('Reserve Match cap 1000 reaches the expected live-wage days',()=>{
  const row=reserveSweep().find(item=>item.cap===1000)!;
  const starter=row.profiles.find(profile=>profile.id==='starter')!;
  const mid=row.profiles.find(profile=>profile.id==='mid')!;
  const late=row.profiles.find(profile=>profile.id==='late')!;

  assert.equal(starter.capReachDayDiversified,22);
  assert.equal(starter.capReachDayFocused,63);
  assert.equal(starter.matchedByHardWorkDay50Focused,800);
  assert.equal(mid.capReachDayDiversified,8);
  assert.equal(late.capReachDayDiversified,4);
  assert.equal(row.purchasingPower.normalNights,10);
  assert.equal(row.purchasingPower.cheapNights,20);
});

test('Work Rhythm 20 cannot move same-career Hard Work before Day 50',()=>{
  const row=workRhythmSweep().find(item=>item.triggerCount===20)!;
  assert.equal(row.maxExtraEnergy,20);
  assert.equal(row.earliestLastBonusDayOnContinuousWork,21);
  assert.equal(row.earliestSameCareerHardWorkDay,50);
  assert.equal(row.shareOfUnconditionalByDay40,0.5);
  assert.equal(row.shareOfUnconditionalByHardWorkDay50,0.4);
  assert.equal(row.shareOfUnconditionalFullRun,0.125);
  assert.deepEqual(row.schoolTuitionNeededToConvertEveryBonusToLesson,{
    min:6000,
    max:10000
  });
});

test('Network Retainer recommendation is below cheap lodging per day and totals exactly 1000',()=>{
  const row=retainerSweep().find(item=>item.amount===25&&item.duration===40)!;
  assert.equal(row.total,1000);
  assert.equal(row.dailyPressure.coversCheapLodgingByItself,false);
  assert.equal(row.dailyPressure.coversNormalLodgingByItself,false);
  assert.ok(row.dailyPressure.shareOfStarterDiversifiedDailyWage<1);
  assert.deepEqual(row.payoutAfterEligibleUnboundDays,{
    day10:250,
    day20:500,
    day30:750,
    day40:1000
  });
});

test('front-loaded Retainer shapes at 50/day already replace cheap lodging pressure',()=>{
  const rows=retainerSweep().filter(item=>item.amount===50);
  assert.ok(rows.length>0);
  assert.ok(rows.every(item=>item.dailyPressure.coversCheapLodgingByItself));
  assert.ok(rows.every(item=>item.dailyPressure.shareOfStarterDiversifiedDailyWage>1));
});

test('live calibration snapshot preserves D26 and Secret Debt locked scale',()=>{
  assert.equal(LIVE_BASELINE.calendarDays,160);
  assert.equal(LIVE_BASELINE.ordinary.sameCareerMaxShiftsPerDay,1);
  assert.equal(LIVE_BASELINE.ordinary.hardWorkShifts,50);
  assert.equal(LIVE_BASELINE.secretDebt.lenderGrant,2000);
  assert.equal(LIVE_BASELINE.secretDebt.activationDelayDays,10);
  assert.equal(LIVE_BASELINE.secretDebt.principal,20000);
  assert.equal(LIVE_BASELINE.secretDebt.forcedNextDayEnergyDelta,-1);
});
