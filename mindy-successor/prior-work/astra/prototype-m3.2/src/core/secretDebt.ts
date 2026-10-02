import {ordinaryHardWorkCareers,type Action,type Save} from './schema.ts';

export const SECRET_DEBT_CAREER_ID='secret-debt' as const;
export const SECRET_DEBT_SHIFT_ACTION_ID='secret-debt.shift' as const;
export const SECRET_DEBT_REPAY_ACTION_ID='secret-debt.repay' as const;
export const SECRET_DEBT_TAKEOVER_ACTION_ID='secret-debt.takeover' as const;
export const SECRET_DEBT_ENCOUNTER_EVENT_ID='secret-debt.lender-encounter' as const;

export const SECRET_DEBT_LENDER_CHANCE=0.20 as const;
export const SECRET_DEBT_OFFER_AMOUNT=2000 as const;
export const SECRET_DEBT_ACTIVATION_DELAY_DAYS=10 as const;
export const SECRET_DEBT_PRINCIPAL=20000 as const;
export const SECRET_DEBT_FORCED_NIGHT_ENERGY_DELTA=-1 as const;
export const SECRET_DEBT_HARD_WORK_SHIFTS=50 as const;
export const SECRET_DEBT_REQUIRED_PAID_SCHOOL_LESSONS=10 as const;

/**
 * Balance-owned constants deliberately remain unset.  Their semantic axes are
 * locked, but production must not invent the final numbers.
 */
export const SECRET_DEBT_SHIFT_STAT_GAINS={
  strength:null,
  endurance:null,
  sexuality:null
} as const;

export const SECRET_DEBT_WAGE_INPUTS=['strength','endurance','lust'] as const;
export const SECRET_DEBT_WAGE_POLICY={
  base:null,
  strengthFactor:null,
  enduranceFactor:null,
  lustFactor:null
} as const;

export const SECRET_DEBT_TAKEOVER_GATES={
  statThresholds:null,
  lustThreshold:null
} as const;

const ordinaryCareerIds=new Set<string>(ordinaryHardWorkCareers);
const ordinaryShiftActionIds=new Set<string>(ordinaryHardWorkCareers.map(career=>`${career}.shift`));

export function secretDebtCareerState(s:Save){
  return s.run.progression.careers[SECRET_DEBT_CAREER_ID];
}

export function secretDebtIsBound(s:Save){
  return secretDebtCareerState(s)?.stage==='bound';
}

export function secretDebtBlocksCareerId(s:Save,careerId:string){
  return secretDebtIsBound(s)&&ordinaryCareerIds.has(careerId);
}

export function secretDebtBlocksOrdinaryShift(s:Save,action:Action){
  return secretDebtIsBound(s)&&ordinaryShiftActionIds.has(action.id);
}

export function secretDebtBlocksSourceDomain(s:Save,sourceDomain:string|undefined){
  if(!secretDebtIsBound(s)||!sourceDomain)return false;
  return ordinaryHardWorkCareers.some(career=>sourceDomain===career||sourceDomain.startsWith(`${career}.`));
}

export function secretDebtBlocksEnding(s:Save,endingId:string){
  if(!secretDebtIsBound(s))return false;
  return ordinaryHardWorkCareers.some(career=>endingId.startsWith(`ending.${career}.`));
}

export function secretDebtWorkVisible(s:Save){
  return secretDebtIsBound(s);
}

export function secretDebtAcceptanceDay(s:Save){
  const day=secretDebtCareerState(s)?.counters.accepted_day;
  return Number.isInteger(day)?day:undefined;
}

export function secretDebtActivationDue(s:Save){
  const acceptedDay=secretDebtAcceptanceDay(s);
  return secretDebtCareerState(s)?.stage==='accepted'
    &&acceptedDay!==undefined
    &&s.run.calendar.elapsedDays>=acceptedDay+SECRET_DEBT_ACTIVATION_DELAY_DAYS;
}

export function secretDebtCurrentDebt(s:Save){
  return secretDebtCareerState(s)?.counters.debt_current??0;
}

export function secretDebtPaidSchoolLessons(s:Save){
  return s.run.actionCounts.school??0;
}

export function secretDebtTakeoverStructuralReady(s:Save){
  const state=secretDebtCareerState(s);
  return state?.stage==='bound'
    &&(state.counters.completed_shifts??0)>=SECRET_DEBT_HARD_WORK_SHIFTS
    &&secretDebtPaidSchoolLessons(s)>=SECRET_DEBT_REQUIRED_PAID_SCHOOL_LESSONS;
}

export function secretDebtWagePolicyReady(){
  const policy=SECRET_DEBT_WAGE_POLICY;
  return typeof policy.base==='number'
    &&typeof policy.strengthFactor==='number'&&policy.strengthFactor>0
    &&typeof policy.enduranceFactor==='number'&&policy.enduranceFactor>0
    &&typeof policy.lustFactor==='number'&&policy.lustFactor>0;
}

export function secretDebtWageDefinition():Action['wage']|undefined{
  if(!secretDebtWagePolicyReady())return undefined;
  return {
    base:Number(SECRET_DEBT_WAGE_POLICY.base),
    weights:[
      {stat:'strength',factor:Number(SECRET_DEBT_WAGE_POLICY.strengthFactor)},
      {stat:'endurance',factor:Number(SECRET_DEBT_WAGE_POLICY.enduranceFactor)},
      {stat:'lust',factor:Number(SECRET_DEBT_WAGE_POLICY.lustFactor)}
    ]
  };
}

export function secretDebtTakeoverNumericGatesReady(){
  return SECRET_DEBT_TAKEOVER_GATES.statThresholds!==null&&SECRET_DEBT_TAKEOVER_GATES.lustThreshold!==null;
}

export function captureSecretDebtAcceptanceDay(s:Save,eventId:string,choiceId:string){
  if(eventId!==SECRET_DEBT_ENCOUNTER_EVENT_ID||choiceId!=='accept')return;
  const career=secretDebtCareerState(s);
  if(!career||career.stage!=='accepted'||career.counters.accepted_day!==undefined)return;
  career.counters.accepted_day=s.run.calendar.elapsedDays;
}
