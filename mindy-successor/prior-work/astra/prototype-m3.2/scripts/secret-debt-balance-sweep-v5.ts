import {
  BUILD_PRESETS,
  simulateSecretDebtBalance,
  type ActivationBuild,
  type ResearchPreset,
  type SchoolLessonMix,
  type SimulationResult
} from './secret-debt-balance-harness-v4.ts';

export const SWEEP_RESEARCH_ONLY_BANNER=
  'RESEARCH ONLY — bounded Secret Debt v5 parameter sweep; no shortlisted value is Product authority.' as const;

export const SWEEP_GRID={
  shiftGainValues:[1,2] as const,
  wageBaseValues:[20,25,30] as const,
  strengthFactorValues:[0.55,0.70,0.85] as const,
  enduranceFactorValues:[0.45,0.60,0.75] as const,
  lustFactorValues:[0.20,0.35,0.50] as const,
  sharedTakeoverStatThresholdValues:[55,60,65] as const,
  takeoverLustThresholdValues:[20,25,30] as const
};

export const STANDARD_SCHOOL_MIX:SchoolLessonMix={
  physicalTraining:5,
  bodyConfidence:5
};

export const TAKEOVER_SCHOOL_MIXES:readonly SchoolLessonMix[]=[
  {physicalTraining:10,bodyConfidence:0},
  {physicalTraining:5,bodyConfidence:5},
  {physicalTraining:0,bodyConfidence:10},
  {physicalTraining:5,bodyConfidence:10},
  {physicalTraining:2,bodyConfidence:13},
  {physicalTraining:0,bodyConfidence:15}
];

export type SweepBuildId=keyof typeof BUILD_PRESETS;

export interface SweepCandidate {
  key:string;
  researchOnly:true;
  shiftGains:{
    strength:number;
    endurance:number;
    sexuality:number;
  };
  wage:{
    base:number;
    strengthFactor:number;
    enduranceFactor:number;
    lustFactor:number;
  };
  takeover:{
    strength:number;
    endurance:number;
    sexuality:number;
    lust:number;
  };
}

export interface SweepScenarioResult {
  build:SweepBuildId;
  dailyEnergyBonus:boolean;
  standard:{
    dayTo50HiddenShifts:number|null;
    dayTo10SchoolLessons:number|null;
    dayToFull20000Repayment:number|null;
    dayTakeoverFirstEligible:number|null;
    impossibleBeforeDay160:SimulationResult['impossibleBeforeDay160'];
  };
  earliestTakeover:{
    day:number|null;
    schoolMix:SchoolLessonMix|null;
  };
}

export interface CandidateEvaluation {
  candidate:SweepCandidate;
  scenarios:SweepScenarioResult[];
  flags:{
    trivializes20000:boolean;
    paidFreedomEffectivelyImpossibleLowBase:boolean;
  };
}

function keyNumber(value:number){
  return String(value).replace('.','p');
}

export function enumerateSweepCandidates():SweepCandidate[]{
  const out:SweepCandidate[]=[];
  for(const strengthGain of SWEEP_GRID.shiftGainValues)
    for(const enduranceGain of SWEEP_GRID.shiftGainValues)
      for(const sexualityGain of SWEEP_GRID.shiftGainValues)
        for(const base of SWEEP_GRID.wageBaseValues)
          for(const strengthFactor of SWEEP_GRID.strengthFactorValues)
            for(const enduranceFactor of SWEEP_GRID.enduranceFactorValues)
              for(const lustFactor of SWEEP_GRID.lustFactorValues)
                for(const statThreshold of SWEEP_GRID.sharedTakeoverStatThresholdValues)
                  for(const lustThreshold of SWEEP_GRID.takeoverLustThresholdValues){
                    const key=[
                      `g${strengthGain}${enduranceGain}${sexualityGain}`,
                      `b${base}`,
                      `s${keyNumber(strengthFactor)}`,
                      `e${keyNumber(enduranceFactor)}`,
                      `l${keyNumber(lustFactor)}`,
                      `t${statThreshold}`,
                      `tl${lustThreshold}`
                    ].join('-');
                    out.push({
                      key,
                      researchOnly:true,
                      shiftGains:{
                        strength:strengthGain,
                        endurance:enduranceGain,
                        sexuality:sexualityGain
                      },
                      wage:{base,strengthFactor,enduranceFactor,lustFactor},
                      takeover:{
                        strength:statThreshold,
                        endurance:statThreshold,
                        sexuality:statThreshold,
                        lust:lustThreshold
                      }
                    });
                  }
  return out;
}

function harnessPreset(candidate:SweepCandidate):ResearchPreset{
  // v4 constrains the research preset id to three presentation labels.
  // The sweep key remains the actual candidate identity.
  return {
    id:'v3',
    label:`v5 sweep candidate ${candidate.key}`,
    researchOnly:true,
    shiftGains:{...candidate.shiftGains},
    wage:{...candidate.wage},
    takeover:{...candidate.takeover}
  };
}

function run(
  candidate:SweepCandidate,
  build:ActivationBuild,
  dailyEnergyBonus:boolean,
  lodging:'street'|'cheap'|'normal',
  schoolLessonMix:SchoolLessonMix
){
  return simulateSecretDebtBalance(harnessPreset(candidate),{
    build:{...build},
    startingMoney:2000,
    lodging,
    dailyEnergyBonus,
    schoolLessonMix,
    activityCadenceDays:10,
    maxDays:160
  });
}

function earliestTakeover(
  candidate:SweepCandidate,
  build:ActivationBuild,
  dailyEnergyBonus:boolean
){
  let day:number|null=null;
  let schoolMix:SchoolLessonMix|null=null;
  for(const mix of TAKEOVER_SCHOOL_MIXES){
    const result=run(candidate,build,dailyEnergyBonus,'cheap',mix);
    const current=result.dayTakeoverFirstEligible;
    if(current!==null&&(day===null||current<day)){
      day=current;
      schoolMix={...mix};
    }
  }
  return {day,schoolMix};
}

export function evaluateSweepCandidate(candidate:SweepCandidate):CandidateEvaluation{
  const scenarios:SweepScenarioResult[]=[];
  for(const buildId of ['low','mid','high'] as const){
    for(const dailyEnergyBonus of [false,true] as const){
      const build=BUILD_PRESETS[buildId];
      const standard=run(candidate,build,dailyEnergyBonus,'cheap',STANDARD_SCHOOL_MIX);
      scenarios.push({
        build:buildId,
        dailyEnergyBonus,
        standard:{
          dayTo50HiddenShifts:standard.dayTo50HiddenShifts,
          dayTo10SchoolLessons:standard.dayTo10SchoolLessons,
          dayToFull20000Repayment:standard.dayToFull20000Repayment,
          dayTakeoverFirstEligible:standard.dayTakeoverFirstEligible,
          impossibleBeforeDay160:standard.impossibleBeforeDay160
        },
        earliestTakeover:earliestTakeover(candidate,build,dailyEnergyBonus)
      });
    }
  }

  const midNg=scenarios.find(row=>row.build==='mid'&&row.dailyEnergyBonus)!;
  const lowBuild=BUILD_PRESETS.low;
  const lowStreet=run(candidate,lowBuild,false,'street',STANDARD_SCHOOL_MIX);
  const lowNormal=run(candidate,lowBuild,false,'normal',STANDARD_SCHOOL_MIX);

  return {
    candidate,
    scenarios,
    flags:{
      // Research flag, not authority: closing 20000 by calendar day 50 while
      // still paying for 10 School lessons and periodic Activity is considered
      // too forgiving for the intended hard/secret profile.
      trivializes20000:
        midNg.standard.dayToFull20000Repayment!==null
        &&midNg.standard.dayToFull20000Repayment<=50,

      // Research flag for Paid Freedom only. Bound Life / Takeover can still
      // remain viable. This means the low-build base-Energy repayment path
      // misses day 160 under both free Street and expensive Normal lodging.
      paidFreedomEffectivelyImpossibleLowBase:
        lowStreet.dayToFull20000Repayment===null
        &&lowNormal.dayToFull20000Repayment===null
    }
  };
}

export const SHORTLIST={
  harshNgLeaning:{
    key:'shortlist-harsh-ng-leaning',
    researchOnly:true,
    shiftGains:{strength:1,endurance:1,sexuality:1},
    wage:{base:20,strengthFactor:0.55,enduranceFactor:0.45,lustFactor:0.20},
    takeover:{strength:65,endurance:65,sexuality:65,lust:30}
  },
  balancedHard:{
    key:'shortlist-balanced-hard',
    researchOnly:true,
    shiftGains:{strength:1,endurance:1,sexuality:1},
    wage:{base:25,strengthFactor:0.70,enduranceFactor:0.60,lustFactor:0.35},
    takeover:{strength:60,endurance:60,sexuality:60,lust:25}
  },
  forgivingStillSecret:{
    key:'shortlist-forgiving-still-secret',
    researchOnly:true,
    shiftGains:{strength:1,endurance:1,sexuality:1},
    wage:{base:30,strengthFactor:0.80,enduranceFactor:0.70,lustFactor:0.45},
    takeover:{strength:55,endurance:55,sexuality:55,lust:20}
  }
} satisfies Record<string,SweepCandidate>;

export function runBoundedSweep(){
  const candidates=enumerateSweepCandidates();
  let trivializes20000=0;
  let paidFreedomEffectivelyImpossibleLowBase=0;

  for(const candidate of candidates){
    const evaluation=evaluateSweepCandidate(candidate);
    if(evaluation.flags.trivializes20000)trivializes20000++;
    if(evaluation.flags.paidFreedomEffectivelyImpossibleLowBase){
      paidFreedomEffectivelyImpossibleLowBase++;
    }
  }

  return {
    researchOnly:true as const,
    banner:SWEEP_RESEARCH_ONLY_BANNER,
    candidateCount:candidates.length,
    grid:SWEEP_GRID,
    operationalFlags:{
      trivializes20000:
        'mid build + NG+ +1 Energy repays by day 50 in cheap / 5 Physical + 5 Body Confidence / Activity-every-10 scenario',
      paidFreedomEffectivelyImpossibleLowBase:
        'low build without NG+ does not repay by day 160 under either Street or Normal lodging in the standard mixed scenario'
    },
    counts:{
      trivializes20000,
      paidFreedomEffectivelyImpossibleLowBase
    },
    shortlist:Object.fromEntries(
      Object.entries(SHORTLIST).map(([name,candidate])=>[
        name,
        evaluateSweepCandidate(candidate)
      ])
    )
  };
}

if(process.argv[1]?.endsWith('secret-debt-balance-sweep-v5.ts')){
  console.log(JSON.stringify(runBoundedSweep(),null,2));
}
