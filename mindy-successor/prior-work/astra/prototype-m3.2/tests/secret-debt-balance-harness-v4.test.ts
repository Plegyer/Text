import test from 'node:test';
import assert from 'node:assert/strict';

import {
  BUILD_PRESETS,
  RESEARCH_ONLY_BANNER,
  RESEARCH_PRESETS,
  simulateSecretDebtBalance,
  type SimulationScenario
} from '../scripts/secret-debt-balance-harness-v4.ts';

function scenario(overrides:Partial<SimulationScenario>={}):SimulationScenario{
  return {
    build:{...BUILD_PRESETS.mid},
    startingMoney:2000,
    lodging:'cheap',
    dailyEnergyBonus:false,
    schoolLessonMix:{physicalTraining:5,bodyConfidence:5},
    activityCadenceDays:10,
    maxDays:160,
    ...overrides
  };
}

test('all Secret Debt balance presets are explicitly research-only',()=>{
  for(const preset of Object.values(RESEARCH_PRESETS)){
    assert.equal(preset.researchOnly,true,preset.id);
    assert.match(preset.label,/research preset/i,preset.id);
  }
  assert.match(RESEARCH_ONLY_BANNER,/RESEARCH ONLY/);
  assert.deepEqual(RESEARCH_PRESETS.v3.shiftGains,{strength:1,endurance:1,sexuality:1});
  assert.deepEqual(RESEARCH_PRESETS.v3.wage,{
    base:25,
    strengthFactor:0.70,
    enduranceFactor:0.60,
    lustFactor:0.35
  });
  assert.deepEqual(RESEARCH_PRESETS.v3.takeover,{
    strength:60,
    endurance:60,
    sexuality:60,
    lust:25
  });
});

test('harness is deterministic and reports all required milestones plus money/energy trajectory',()=>{
  const input=scenario();
  const a=simulateSecretDebtBalance(RESEARCH_PRESETS.v3,input);
  const b=simulateSecretDebtBalance(RESEARCH_PRESETS.v3,input);

  assert.deepEqual(b,a);
  assert.equal(a.researchOnly,true);
  assert.equal(a.banner,RESEARCH_ONLY_BANNER);
  assert.ok(a.dayTo50HiddenShifts!==null);
  assert.ok(a.dayTo10SchoolLessons!==null);
  assert.ok(a.dayToFull20000Repayment!==null);
  assert.ok(a.dayTakeoverFirstEligible!==null);
  assert.ok(a.trajectory.length>0);
  assert.ok(a.trajectory.length<=160);

  const first=a.trajectory[0];
  assert.equal(typeof first.moneyStart,'number');
  assert.equal(typeof first.moneyEnd,'number');
  assert.equal(typeof first.energyStart,'number');
  assert.equal(typeof first.energyEnd,'number');
  assert.equal(typeof first.totalShifts,'number');
  assert.equal(typeof first.totalSchoolLessons,'number');
});

test('research spectrum orders repayment from forgiving through v3 to harsh under the same successor scenario',()=>{
  const input=scenario();
  const harsh=simulateSecretDebtBalance(RESEARCH_PRESETS.harsh,input);
  const v3=simulateSecretDebtBalance(RESEARCH_PRESETS.v3,input);
  const forgiving=simulateSecretDebtBalance(RESEARCH_PRESETS.forgiving,input);

  assert.ok(harsh.dayToFull20000Repayment!==null);
  assert.ok(v3.dayToFull20000Repayment!==null);
  assert.ok(forgiving.dayToFull20000Repayment!==null);
  assert.ok(forgiving.dayToFull20000Repayment<=v3.dayToFull20000Repayment);
  assert.ok(v3.dayToFull20000Repayment<=harsh.dayToFull20000Repayment);

  assert.equal(harsh.impossibleBeforeDay160.takeover,true);
  assert.equal(v3.impossibleBeforeDay160.takeover,false);
  assert.equal(forgiving.impossibleBeforeDay160.takeover,false);
});

test('School lesson mix changes Takeover reachability without changing locked 10-paid-lesson requirement',()=>{
  const balanced=simulateSecretDebtBalance(
    RESEARCH_PRESETS.v3,
    scenario({
      build:{...BUILD_PRESETS.low},
      schoolLessonMix:{physicalTraining:5,bodyConfidence:5},
      activityCadenceDays:null
    })
  );
  const bodyFocused=simulateSecretDebtBalance(
    RESEARCH_PRESETS.v3,
    scenario({
      build:{...BUILD_PRESETS.low},
      schoolLessonMix:{physicalTraining:0,bodyConfidence:10},
      activityCadenceDays:null
    })
  );

  assert.ok(balanced.dayTo10SchoolLessons!==null);
  assert.ok(bodyFocused.dayTo10SchoolLessons!==null);
  assert.equal(balanced.dayTakeoverFirstEligible,null);
  assert.ok(bodyFocused.dayTakeoverFirstEligible!==null);
  assert.ok(bodyFocused.dayTakeoverFirstEligible<=160);
});

test('Street cannot fund a 2-Energy Activity day after forced Night without the +1 daily Energy modifier',()=>{
  const base=simulateSecretDebtBalance(
    RESEARCH_PRESETS.v3,
    scenario({
      lodging:'street',
      schoolLessonMix:{physicalTraining:0,bodyConfidence:0},
      activityCadenceDays:10,
      dailyEnergyBonus:false
    })
  );
  const boosted=simulateSecretDebtBalance(
    RESEARCH_PRESETS.v3,
    scenario({
      lodging:'street',
      schoolLessonMix:{physicalTraining:0,bodyConfidence:0},
      activityCadenceDays:10,
      dailyEnergyBonus:true
    })
  );

  assert.equal(base.activitiesCompleted,0);
  assert.ok(base.activitiesSkippedForEnergy>0);
  assert.ok(boosted.activitiesCompleted>0);
  assert.equal(boosted.activitiesSkippedForEnergy,0);
});

test('+1 daily Energy improves or preserves milestone timing under identical balance parameters',()=>{
  const base=simulateSecretDebtBalance(
    RESEARCH_PRESETS.v3,
    scenario({dailyEnergyBonus:false})
  );
  const boosted=simulateSecretDebtBalance(
    RESEARCH_PRESETS.v3,
    scenario({dailyEnergyBonus:true})
  );

  assert.ok(base.dayTo50HiddenShifts!==null&&boosted.dayTo50HiddenShifts!==null);
  assert.ok(base.dayToFull20000Repayment!==null&&boosted.dayToFull20000Repayment!==null);
  assert.ok(boosted.dayTo50HiddenShifts<=base.dayTo50HiddenShifts);
  assert.ok(boosted.dayToFull20000Repayment<=base.dayToFull20000Repayment);
});

test('harness reports before-day-160 impossibility explicitly instead of inventing missing milestones',()=>{
  const harshLow=simulateSecretDebtBalance(
    RESEARCH_PRESETS.harsh,
    scenario({
      build:{...BUILD_PRESETS.low},
      lodging:'street',
      schoolLessonMix:{physicalTraining:5,bodyConfidence:5},
      activityCadenceDays:10,
      dailyEnergyBonus:false
    })
  );

  assert.equal(harshLow.dayTakeoverFirstEligible,null);
  assert.equal(harshLow.impossibleBeforeDay160.takeover,true);
  assert.equal(
    harshLow.impossibleBeforeDay160.repayment,
    harshLow.dayToFull20000Repayment===null||harshLow.dayToFull20000Repayment>160
  );
});
