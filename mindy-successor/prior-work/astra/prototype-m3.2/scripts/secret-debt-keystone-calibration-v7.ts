export const RESEARCH_ONLY=
  'RESEARCH ONLY — Secret Debt D30 Keystone calibration v7; no value is Product authority.' as const;

export const LIVE_BASELINE={
  calendarDays:160,
  freshMoney:600,
  baseDailyEnergy:3,
  lodging:{normal:100,cheap:50,street:0},
  schoolTuition:{min:300,max:500},
  secretDebt:{
    lenderGrant:2000,
    activationDelayDays:10,
    principal:20000,
    forcedNextDayEnergyDelta:-1
  },
  ordinary:{
    sameCareerMaxShiftsPerDay:1,
    hardWorkShifts:50,
    // Current executable wage snapshots from authority commit.
    starterThreeCareerDailyWage:46, // Lumber 14 + Satyr 16 + Undead 16 at all-1.
    starterSingleCareerRepresentativeWage:16,
    midThreeCareerDailyWage:133, // top three at equal relevant stats ~=30.
    midSingleCareerRepresentativeWage:44,
    lateThreeCareerDailyWage:277, // top three at equal relevant stats ~=80.
    lateSingleCareerRepresentativeWage:91
  }
} as const;

export const RESERVE_CAPS=[500,750,1000,1500] as const;
export const WORK_RHYTHM_TRIGGER_COUNTS=[10,15,20,25] as const;

export const RETAINER_SHAPES=[
  {amount:20,duration:25}, // 500
  {amount:25,duration:20}, // 500
  {amount:50,duration:10}, // 500
  {amount:25,duration:30}, // 750
  {amount:30,duration:25}, // 750
  {amount:50,duration:15}, // 750
  {amount:20,duration:50}, // 1000
  {amount:25,duration:40}, // 1000
  {amount:40,duration:25}, // 1000
  {amount:50,duration:20}, // 1000
  {amount:30,duration:50}, // 1500
  {amount:50,duration:30}, // 1500
  {amount:75,duration:20}  // 1500
] as const;

function ceilDiv(a:number,b:number){
  return Math.ceil(a/b);
}

function schoolEquivalent(value:number){
  return {
    lessonsAt500:Math.floor(value/LIVE_BASELINE.schoolTuition.max),
    lessonsAt300:Math.floor(value/LIVE_BASELINE.schoolTuition.min)
  };
}

function lodgingEquivalent(value:number){
  return {
    normalNights:value/LIVE_BASELINE.lodging.normal,
    cheapNights:value/LIVE_BASELINE.lodging.cheap
  };
}

export function reserveSweep(){
  const profiles=[
    {
      id:'starter',
      diversifiedDailyWage:LIVE_BASELINE.ordinary.starterThreeCareerDailyWage,
      focusedDailyWage:LIVE_BASELINE.ordinary.starterSingleCareerRepresentativeWage
    },
    {
      id:'mid',
      diversifiedDailyWage:LIVE_BASELINE.ordinary.midThreeCareerDailyWage,
      focusedDailyWage:LIVE_BASELINE.ordinary.midSingleCareerRepresentativeWage
    },
    {
      id:'late',
      diversifiedDailyWage:LIVE_BASELINE.ordinary.lateThreeCareerDailyWage,
      focusedDailyWage:LIVE_BASELINE.ordinary.lateSingleCareerRepresentativeWage
    }
  ] as const;

  return RESERVE_CAPS.map(cap=>({
    cap,
    purchasingPower:{
      ...schoolEquivalent(cap),
      ...lodgingEquivalent(cap)
    },
    profiles:profiles.map(profile=>({
      id:profile.id,
      capReachDayDiversified:ceilDiv(cap,profile.diversifiedDailyWage),
      capReachDayFocused:ceilDiv(cap,profile.focusedDailyWage),
      matchedByDay40Diversified:Math.min(cap,40*profile.diversifiedDailyWage),
      matchedByHardWorkDay50Focused:Math.min(cap,50*profile.focusedDailyWage),
      matchedByDay160Focused:Math.min(cap,160*profile.focusedDailyWage)
    }))
  }));
}

export function workRhythmSweep(){
  return WORK_RHYTHM_TRIGGER_COUNTS.map(triggerCount=>({
    triggerCount,
    maxExtraEnergy:triggerCount,
    earliestLastBonusDayOnContinuousWork:triggerCount+1,
    // Unconditional +1 Energy is a full-run broad comparator, not stackable
    // with Work Rhythm because both are Keystone-class.
    shareOfUnconditionalByDay40:triggerCount/40,
    shareOfUnconditionalByHardWorkDay50:triggerCount/50,
    shareOfUnconditionalFullRun:triggerCount/LIVE_BASELINE.calendarDays,
    maxExtraOneEnergyActions:triggerCount,
    schoolTuitionNeededToConvertEveryBonusToLesson:{
      min:triggerCount*LIVE_BASELINE.schoolTuition.min,
      max:triggerCount*LIVE_BASELINE.schoolTuition.max
    },
    earliestSameCareerHardWorkDay:50
  }));
}

export function retainerSweep(){
  return RETAINER_SHAPES.map(shape=>{
    const total=shape.amount*shape.duration;
    return {
      ...shape,
      total,
      purchasingPower:{
        ...schoolEquivalent(total),
        ...lodgingEquivalent(total)
      },
      dailyPressure:{
        coversCheapLodgingByItself:shape.amount>=LIVE_BASELINE.lodging.cheap,
        coversNormalLodgingByItself:shape.amount>=LIVE_BASELINE.lodging.normal,
        shareOfStarterDiversifiedDailyWage:
          shape.amount/LIVE_BASELINE.ordinary.starterThreeCareerDailyWage
      },
      payoutAfterEligibleUnboundDays:{
        day10:shape.amount*Math.min(10,shape.duration),
        day20:shape.amount*Math.min(20,shape.duration),
        day30:shape.amount*Math.min(30,shape.duration),
        day40:shape.amount*Math.min(40,shape.duration)
      }
    };
  });
}

export const RECOMMENDATION={
  researchOnly:true,
  earnedReserveMatch:{cap:1000},
  workRhythm:{maxTriggeredBonusDays:20},
  networkRetainer:{dailyPayment:25,durationDays:40,totalCap:1000}
} as const;

export function calibrationReport(){
  return {
    researchOnly:true as const,
    banner:RESEARCH_ONLY,
    liveBaseline:LIVE_BASELINE,
    reserve:reserveSweep(),
    workRhythm:workRhythmSweep(),
    retainer:retainerSweep(),
    recommendation:RECOMMENDATION,
    invariants:{
      oneKeystoneAtATime:true,
      cap200RemainsSpecialist:true,
      ordinaryHardWorkLayerSeparate:true,
      sameCareerHardWorkEarliestDay:50,
      secretDebtForcedEnergyPenaltyRemains:true
    }
  };
}

if(process.argv[1]?.endsWith('secret-debt-keystone-calibration-v7.ts')){
  console.log(JSON.stringify(calibrationReport(),null,2));
}
