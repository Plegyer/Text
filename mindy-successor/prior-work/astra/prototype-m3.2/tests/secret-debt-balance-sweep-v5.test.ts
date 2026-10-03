import test from 'node:test';
import assert from 'node:assert/strict';

import {
  SHORTLIST,
  SWEEP_RESEARCH_ONLY_BANNER,
  enumerateSweepCandidates,
  evaluateSweepCandidate,
  type SweepCandidate
} from '../scripts/secret-debt-balance-sweep-v5.ts';

function scenario(
  evaluation:ReturnType<typeof evaluateSweepCandidate>,
  build:'low'|'mid'|'high',
  dailyEnergyBonus:boolean
){
  return evaluation.scenarios.find(
    row=>row.build===build&&row.dailyEnergyBonus===dailyEnergyBonus
  )!;
}

test('v5 bounded sweep contains exactly 5832 research-only tuning sets',()=>{
  const candidates=enumerateSweepCandidates();
  assert.equal(candidates.length,5832);
  assert.match(SWEEP_RESEARCH_ONLY_BANNER,/RESEARCH ONLY/);
  assert.ok(candidates.every(candidate=>candidate.researchOnly));
});

test('harsh / NG+-leaning shortlist preserves the expected hard first-life profile',()=>{
  const evaluation=evaluateSweepCandidate(SHORTLIST.harshNgLeaning);
  const lowBase=scenario(evaluation,'low',false);
  const lowNg=scenario(evaluation,'low',true);
  const midBase=scenario(evaluation,'mid',false);
  const highBase=scenario(evaluation,'high',false);

  assert.deepEqual(
    [
      lowBase.standard.dayTo50HiddenShifts,
      lowBase.standard.dayTo10SchoolLessons,
      lowBase.standard.dayToFull20000Repayment,
      lowBase.earliestTakeover.day
    ],
    [33,36,153,48]
  );
  assert.deepEqual(
    [
      lowNg.standard.dayTo50HiddenShifts,
      lowNg.standard.dayTo10SchoolLessons,
      lowNg.standard.dayToFull20000Repayment,
      lowNg.earliestTakeover.day
    ],
    [22,20,88,28]
  );
  assert.equal(midBase.standard.dayToFull20000Repayment,141);
  assert.equal(highBase.standard.dayToFull20000Repayment,134);
  assert.equal(evaluation.flags.trivializes20000,false);
  assert.equal(evaluation.flags.paidFreedomEffectivelyImpossibleLowBase,true);
});

test('balanced-hard shortlist keeps repayment meaningfully after Hard Work and responds strongly to +1 Energy',()=>{
  const evaluation=evaluateSweepCandidate(SHORTLIST.balancedHard);
  const lowBase=scenario(evaluation,'low',false);
  const midBase=scenario(evaluation,'mid',false);
  const highBase=scenario(evaluation,'high',false);
  const lowNg=scenario(evaluation,'low',true);
  const midNg=scenario(evaluation,'mid',true);
  const highNg=scenario(evaluation,'high',true);

  assert.deepEqual(
    [lowBase.standard.dayTo50HiddenShifts,lowBase.standard.dayToFull20000Repayment,lowBase.earliestTakeover.day],
    [33,114,32]
  );
  assert.deepEqual(
    [midBase.standard.dayTo50HiddenShifts,midBase.standard.dayToFull20000Repayment,midBase.earliestTakeover.day],
    [33,104,32]
  );
  assert.deepEqual(
    [highBase.standard.dayTo50HiddenShifts,highBase.standard.dayToFull20000Repayment,highBase.earliestTakeover.day],
    [32,96,32]
  );
  assert.deepEqual(
    [lowNg.standard.dayToFull20000Repayment,midNg.standard.dayToFull20000Repayment,highNg.standard.dayToFull20000Repayment],
    [68,63,59]
  );
  assert.equal(evaluation.flags.trivializes20000,false);
});

test('forgiving-but-still-secret shortlist stays just outside the v5 trivialization flag',()=>{
  const evaluation=evaluateSweepCandidate(SHORTLIST.forgivingStillSecret);
  const lowBase=scenario(evaluation,'low',false);
  const midBase=scenario(evaluation,'mid',false);
  const highBase=scenario(evaluation,'high',false);
  const midNg=scenario(evaluation,'mid',true);
  const highNg=scenario(evaluation,'high',true);

  assert.deepEqual(
    [
      lowBase.standard.dayToFull20000Repayment,
      midBase.standard.dayToFull20000Repayment,
      highBase.standard.dayToFull20000Repayment
    ],
    [95,88,82]
  );
  assert.equal(midNg.standard.dayToFull20000Repayment,54);
  assert.equal(highNg.standard.dayToFull20000Repayment,51);
  assert.equal(evaluation.flags.trivializes20000,false);
});

test('aggressive upper corner is flagged as trivializing under NG+ research criterion',()=>{
  const aggressive:SweepCandidate={
    key:'test-aggressive-upper-corner',
    researchOnly:true,
    shiftGains:{strength:2,endurance:2,sexuality:1},
    wage:{base:30,strengthFactor:0.85,enduranceFactor:0.75,lustFactor:0.50},
    takeover:{strength:55,endurance:55,sexuality:55,lust:20}
  };
  const evaluation=evaluateSweepCandidate(aggressive);
  const midNg=scenario(evaluation,'mid',true);
  assert.equal(midNg.standard.dayToFull20000Repayment,49);
  assert.equal(evaluation.flags.trivializes20000,true);
});

test('low wage corner is flagged as effectively impossible for low-build Paid Freedom without NG+',()=>{
  const lowCorner:SweepCandidate={
    key:'test-low-wage-corner',
    researchOnly:true,
    shiftGains:{strength:1,endurance:1,sexuality:1},
    wage:{base:20,strengthFactor:0.55,enduranceFactor:0.45,lustFactor:0.20},
    takeover:{strength:65,endurance:65,sexuality:65,lust:30}
  };
  const evaluation=evaluateSweepCandidate(lowCorner);
  assert.equal(evaluation.flags.paidFreedomEffectivelyImpossibleLowBase,true);
});
