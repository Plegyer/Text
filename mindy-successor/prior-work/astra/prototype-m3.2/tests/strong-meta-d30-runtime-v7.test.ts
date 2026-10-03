import test from 'node:test';
import assert from 'node:assert/strict';

import {
  STRONG_META_IDS,
  applyEarnedReserveMatch,
  applyNetworkRetainerAtStartDay,
  applyWorkRhythmAtStartDay,
  armWorkRhythmForNextDay,
  emptyStrongMetaRuntime,
  emptyStrongMetaState,
  grantStrongMetaReward,
  resolveStrongMetaSnapshot,
  setPreferredStrongMetaKeystone,
  setPreferredStrongMetaSpecialist,
  strongMetaProgressionStatCap
} from '../src/core/strongMeta.ts';

function snapshot(keystone?:typeof STRONG_META_IDS.earnedReserveMatch|typeof STRONG_META_IDS.workRhythm|typeof STRONG_META_IDS.networkRetainer,cap=false){
  let state=emptyStrongMetaState();
  if(keystone){
    state=grantStrongMetaReward(state,keystone);
    state=setPreferredStrongMetaKeystone(state,keystone);
  }
  if(cap){
    state=grantStrongMetaReward(state,STRONG_META_IDS.palaceCap200);
    state=setPreferredStrongMetaSpecialist(state,STRONG_META_IDS.palaceCap200,true);
  }
  return resolveStrongMetaSnapshot(state);
}

test('Earned Reserve Match pays exact 1:1 ordinary wage up to 1000 and never while bound',()=>{
  const snap=snapshot(STRONG_META_IDS.earnedReserveMatch);
  let runtime=emptyStrongMetaRuntime();

  let result=applyEarnedReserveMatch({snapshot:snap,runtime,ordinaryWage:600,secretDebtBound:false});
  runtime=result.runtime;
  assert.equal(result.bonus,600);
  assert.equal(runtime.reserveMatchPaid,600);

  result=applyEarnedReserveMatch({snapshot:snap,runtime,ordinaryWage:600,secretDebtBound:false});
  runtime=result.runtime;
  assert.equal(result.bonus,400);
  assert.equal(runtime.reserveMatchPaid,1000);

  result=applyEarnedReserveMatch({snapshot:snap,runtime,ordinaryWage:500,secretDebtBound:false});
  assert.equal(result.bonus,0);
  assert.equal(result.runtime.reserveMatchPaid,1000);

  const bound=applyEarnedReserveMatch({
    snapshot:snap,
    runtime:emptyStrongMetaRuntime(),
    ordinaryWage:500,
    secretDebtBound:true
  });
  assert.equal(bound.bonus,0);
  assert.equal(bound.runtime.reserveMatchPaid,0);
});

test('Work Rhythm arms once per ordinary-work day and pays at most 20 next-day Energy bonuses',()=>{
  const snap=snapshot(STRONG_META_IDS.workRhythm);
  let runtime=emptyStrongMetaRuntime();
  let total=0;

  for(let day=0;day<20;day++){
    runtime=armWorkRhythmForNextDay({snapshot:snap,runtime,currentDay:day});
    const sameDaySecondShift=armWorkRhythmForNextDay({snapshot:snap,runtime,currentDay:day});
    assert.deepEqual(sameDaySecondShift,runtime);
    const next=applyWorkRhythmAtStartDay({snapshot:snap,runtime,day:day+1});
    runtime=next.runtime;
    total+=next.energyBonus;
  }

  assert.equal(total,20);
  assert.equal(runtime.workRhythmBonusDaysTriggered,20);

  runtime=armWorkRhythmForNextDay({snapshot:snap,runtime,currentDay:20});
  assert.equal(runtime.workRhythmArmedForDay,null);
  const afterCap=applyWorkRhythmAtStartDay({snapshot:snap,runtime,day:21});
  assert.equal(afterCap.energyBonus,0);
  assert.equal(afterCap.runtime.workRhythmBonusDaysTriggered,20);
});

test('Secret Debt next-day -1 remains a real relative Energy loss after Work Rhythm',()=>{
  const snap=snapshot(STRONG_META_IDS.workRhythm);
  let runtime=armWorkRhythmForNextDay({
    snapshot:snap,
    runtime:emptyStrongMetaRuntime(),
    currentDay:0
  });
  const start=applyWorkRhythmAtStartDay({snapshot:snap,runtime,day:1});
  runtime=start.runtime;
  assert.equal(start.energyBonus,1);

  const baseEnergy=3;
  const unbound=baseEnergy+start.energyBonus;
  const bound=baseEnergy+start.energyBonus-1;
  assert.equal(unbound,4);
  assert.equal(bound,3);
  assert.equal(bound,unbound-1);
  assert.equal(runtime.workRhythmBonusDaysTriggered,1);
});

test('Network Retainer pays 25 on first 40 calendar days, max 1000, and bound days are lost',()=>{
  const snap=snapshot(STRONG_META_IDS.networkRetainer);
  let runtime=emptyStrongMetaRuntime();
  let paid=0;

  for(let day=0;day<40;day++){
    const result=applyNetworkRetainerAtStartDay({
      snapshot:snap,
      runtime,
      day,
      secretDebtBound:false
    });
    runtime=result.runtime;
    paid+=result.payment;
  }
  assert.equal(paid,1000);
  assert.equal(runtime.networkRetainerPaidDays,40);
  assert.equal(runtime.networkRetainerTotalPaid,1000);

  const afterWindow=applyNetworkRetainerAtStartDay({
    snapshot:snap,
    runtime,
    day:40,
    secretDebtBound:false
  });
  assert.equal(afterWindow.payment,0);
  assert.equal(afterWindow.runtime.networkRetainerTotalPaid,1000);
});

test('Network Retainer bound-day payment is paused, consumed by calendar window, and never caught up',()=>{
  const snap=snapshot(STRONG_META_IDS.networkRetainer);
  let runtime=emptyStrongMetaRuntime();

  let result=applyNetworkRetainerAtStartDay({
    snapshot:snap,
    runtime,
    day:0,
    secretDebtBound:false
  });
  runtime=result.runtime;
  assert.equal(result.payment,25);

  result=applyNetworkRetainerAtStartDay({
    snapshot:snap,
    runtime,
    day:1,
    secretDebtBound:true
  });
  runtime=result.runtime;
  assert.equal(result.payment,0);
  assert.equal(runtime.networkRetainerLastProcessedDay,1);

  const retryMissed=applyNetworkRetainerAtStartDay({
    snapshot:snap,
    runtime,
    day:1,
    secretDebtBound:false
  });
  assert.equal(retryMissed.payment,0);

  let total=25;
  runtime=retryMissed.runtime;
  for(let day=2;day<40;day++){
    const next=applyNetworkRetainerAtStartDay({snapshot:snap,runtime,day,secretDebtBound:false});
    runtime=next.runtime;
    total+=next.payment;
  }

  assert.equal(total,975);
  assert.equal(runtime.networkRetainerPaidDays,39);
  assert.equal(runtime.networkRetainerTotalPaid,975);
  assert.equal(
    applyNetworkRetainerAtStartDay({snapshot:snap,runtime,day:40,secretDebtBound:false}).payment,
    0
  );
});

test('D30 Keystone plus cap-200 Specialist resolves together without stat multiplication semantics',()=>{
  const snap=snapshot(STRONG_META_IDS.workRhythm,true);
  assert.equal(snap.keystoneId,STRONG_META_IDS.workRhythm);
  assert.deepEqual(snap.specialistIds,[STRONG_META_IDS.palaceCap200]);
  assert.equal(strongMetaProgressionStatCap(snap,100),200);
  assert.equal(snap.resolvedRewards.some(r=>r.effect.kind==='work-rhythm'),true);
  assert.equal(snap.resolvedRewards.some(r=>r.effect.kind==='progression-stat-cap'),true);
});

test('in-progress D30 runtime reads resolved snapshot parameters rather than current registry constants',()=>{
  const reserveSnap=structuredClone(snapshot(STRONG_META_IDS.earnedReserveMatch));
  const reserveReward=reserveSnap.resolvedRewards.find(r=>r.id===STRONG_META_IDS.earnedReserveMatch)!;
  if(reserveReward.effect.kind!=='earned-reserve-match')throw new Error('fixture mismatch');
  reserveReward.effect.perRunCap=50;
  const reserve=applyEarnedReserveMatch({
    snapshot:reserveSnap,
    runtime:emptyStrongMetaRuntime(),
    ordinaryWage:100,
    secretDebtBound:false
  });
  assert.equal(reserve.bonus,50);
  assert.equal(reserve.runtime.reserveMatchPaid,50);

  const rhythmSnap=structuredClone(snapshot(STRONG_META_IDS.workRhythm));
  const rhythmReward=rhythmSnap.resolvedRewards.find(r=>r.id===STRONG_META_IDS.workRhythm)!;
  if(rhythmReward.effect.kind!=='work-rhythm')throw new Error('fixture mismatch');
  rhythmReward.effect.maxBonusDays=1;
  let rhythmRuntime=armWorkRhythmForNextDay({
    snapshot:rhythmSnap,
    runtime:emptyStrongMetaRuntime(),
    currentDay:0
  });
  let rhythm=applyWorkRhythmAtStartDay({snapshot:rhythmSnap,runtime:rhythmRuntime,day:1});
  assert.equal(rhythm.energyBonus,1);
  rhythmRuntime=armWorkRhythmForNextDay({snapshot:rhythmSnap,runtime:rhythm.runtime,currentDay:1});
  rhythm=applyWorkRhythmAtStartDay({snapshot:rhythmSnap,runtime:rhythmRuntime,day:2});
  assert.equal(rhythm.energyBonus,0);

  const retainerSnap=structuredClone(snapshot(STRONG_META_IDS.networkRetainer));
  const retainerReward=retainerSnap.resolvedRewards.find(r=>r.id===STRONG_META_IDS.networkRetainer)!;
  if(retainerReward.effect.kind!=='network-retainer')throw new Error('fixture mismatch');
  retainerReward.effect.paymentAmount=10;
  retainerReward.effect.eligibleDayCount=2;
  retainerReward.effect.perRunTotalCap=20;
  let retainerRuntime=emptyStrongMetaRuntime();
  let payment=applyNetworkRetainerAtStartDay({snapshot:retainerSnap,runtime:retainerRuntime,day:0,secretDebtBound:false});
  retainerRuntime=payment.runtime;
  assert.equal(payment.payment,10);
  payment=applyNetworkRetainerAtStartDay({snapshot:retainerSnap,runtime:retainerRuntime,day:1,secretDebtBound:false});
  retainerRuntime=payment.runtime;
  assert.equal(payment.payment,10);
  assert.equal(retainerRuntime.networkRetainerTotalPaid,20);
  assert.equal(applyNetworkRetainerAtStartDay({snapshot:retainerSnap,runtime:retainerRuntime,day:2,secretDebtBound:false}).payment,0);
});

