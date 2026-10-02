import {ordinaryHardWorkCareers,type Action,type Save} from './schema.ts';

export const SECRET_DEBT_CAREER_ID='secret-debt' as const;
export const SECRET_DEBT_SHIFT_ACTION_ID='secret-debt.shift' as const;
export const SECRET_DEBT_ENCOUNTER_EVENT_ID='secret-debt.lender-encounter' as const;

const ordinaryShiftActionIds=new Set<string>(ordinaryHardWorkCareers.map(career=>`${career}.shift`));

export function secretDebtCareerState(s:Save){
  return s.run.progression.careers[SECRET_DEBT_CAREER_ID];
}

export function secretDebtIsBound(s:Save){
  return secretDebtCareerState(s)?.stage==='bound';
}

export function secretDebtBlocksOrdinaryShift(s:Save,action:Action){
  return secretDebtIsBound(s)&&ordinaryShiftActionIds.has(action.id);
}

export function secretDebtWorkVisible(s:Save){
  return secretDebtIsBound(s);
}

export function secretDebtAcceptanceDay(s:Save){
  const day=secretDebtCareerState(s)?.counters.accepted_day;
  return Number.isInteger(day)?day:undefined;
}

/**
 * Product supplies activationDelayDays.  This function deliberately owns no
 * default, historical value, or fallback for that still-open tuning input.
 */
export function secretDebtActivationDue(s:Save,activationDelayDays:number){
  if(!Number.isInteger(activationDelayDays)||activationDelayDays<0)throw new Error('Secret Debt activation delay must be a non-negative integer.');
  const acceptedDay=secretDebtAcceptanceDay(s);
  return secretDebtCareerState(s)?.stage==='accepted'&&acceptedDay!==undefined&&s.run.calendar.elapsedDays>=acceptedDay+activationDelayDays;
}

/**
 * The acceptance day is structural state, not Product tuning.  It lets the
 * future activation policy compare a locked delay against the actual day on
 * which the player accepted without reinterpreting history or legacy debt.
 */
export function captureSecretDebtAcceptanceDay(s:Save,eventId:string,choiceId:string){
  if(eventId!==SECRET_DEBT_ENCOUNTER_EVENT_ID||choiceId!=='accept')return;
  const career=secretDebtCareerState(s);
  if(!career||career.stage!=='accepted'||career.counters.accepted_day!==undefined)return;
  career.counters.accepted_day=s.run.calendar.elapsedDays;
}
