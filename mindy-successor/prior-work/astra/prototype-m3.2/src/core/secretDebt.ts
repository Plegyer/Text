import type {Save,SecretDebtState} from './schema.ts';

export const SECRET_DEBT_LENDER_EVENT_ID='secret-debt.lender-encounter';
export const SECRET_DEBT_TRAP_EVENT_ID='secret-debt.trap-activation';
export const SECRET_DEBT_FORCED_NIGHT_EVENT_ID='secret-debt.forced-night';

export const SECRET_DEBT_HIDDEN_WORK_ACTION_ID='secret-debt.hidden-work';
export const SECRET_DEBT_REPAY_ACTION_ID='secret-debt.repay';
export const SECRET_DEBT_TAKEOVER_ACTION_ID='secret-debt.takeover';

export const SECRET_DEBT_PAID_FREEDOM_ENDING_ID='ending.secret-debt.paid-freedom';
export const SECRET_DEBT_BOUND_LIFE_ENDING_ID='ending.secret-debt.bound-life';
export const SECRET_DEBT_TAKEOVER_ENDING_ID='ending.secret-debt.takeover';

export const SECRET_DEBT_REWARD_IDS={
  paidFreedom:'secret-debt.paid-freedom.earned-reserve-match',
  boundLife:'secret-debt.bound-life.work-rhythm',
  takeover:'secret-debt.takeover.network-retainer'
} as const;

export const SECRET_DEBT_LENDER_CHANCE=0.20;
export const SECRET_DEBT_GRANT=2000;
export const SECRET_DEBT_TRAP_DELAY_DAYS=10;
export const SECRET_DEBT_PRINCIPAL=20000;
export const SECRET_DEBT_BOUND_LIFE_SHIFTS=50;
export const SECRET_DEBT_TAKEOVER_SHIFTS=75;
export const SECRET_DEBT_TAKEOVER_ENDURANCE=75;
export const SECRET_DEBT_TAKEOVER_SEXUALITY=75;
export const SECRET_DEBT_TAKEOVER_WITS=35;
export const SECRET_DEBT_TAKEOVER_LUST=30;
export const SECRET_DEBT_TAKEOVER_PAID_LESSONS=10;
export const SECRET_DEBT_WAGE_CAP=140;

export function secretDebtBound(s:Save){
  return s.run.secretDebt.status==='bound';
}

export function secretDebtLenderEligible(s:Save){
  return s.run.secretDebt.status==='unseen'
    && s.run.secretDebt.lastLenderAttemptDay!==s.run.calendar.elapsedDays;
}

export function markSecretDebtLenderAttemptMutable(s:Save){
  if(!secretDebtLenderEligible(s))throw new Error('Secret Debt lender encounter is not eligible.');
  s.run.secretDebt.lastLenderAttemptDay=s.run.calendar.elapsedDays;
}

export function acceptSecretDebtMutable(s:Save){
  const state=s.run.secretDebt;
  if(state.status!=='unseen'||state.grantApplied)throw new Error('Secret Debt lender offer is already closed.');
  const day=s.run.calendar.elapsedDays;
  state.status='accepted';
  state.acceptedDay=day;
  state.trapDay=day+SECRET_DEBT_TRAP_DELAY_DAYS;
  state.boundDay=null;
  state.resolvedDay=null;
  state.debt=0;
  state.hiddenShifts=0;
  state.grantApplied=true;
  s.run.resources.money=Math.min(1_000_000,s.run.resources.money+SECRET_DEBT_GRANT);
}

export function refuseSecretDebtMutable(s:Save){
  const state=s.run.secretDebt;
  if(state.status!=='unseen')throw new Error('Secret Debt lender offer is already closed.');
  state.status='refused';
  state.acceptedDay=null;
  state.trapDay=null;
  state.boundDay=null;
  state.resolvedDay=null;
  state.debt=0;
}

export function activateSecretDebtIfDueMutable(s:Save){
  const state=s.run.secretDebt;
  if(state.status!=='accepted'||state.trapDay===null||s.run.calendar.elapsedDays<state.trapDay)return false;
  state.status='bound';
  state.boundDay=s.run.calendar.elapsedDays;
  state.debt=SECRET_DEBT_PRINCIPAL;
  return true;
}

export function totalPaidSchoolLessons(s:Save){
  return Object.values(s.run.progression.school.tracks)
    .reduce((sum,track)=>sum+(track.counters.lessons_completed??0),0);
}

export function secretDebtHiddenWageFromValues(endurance:number,sexuality:number,lust:number){
  const weighted=Math.min(110,0.70*endurance+0.60*sexuality+0.35*lust);
  return Math.min(SECRET_DEBT_WAGE_CAP,Math.round(30+weighted));
}

export function secretDebtHiddenWage(s:Save){
  return secretDebtHiddenWageFromValues(
    s.run.character.stats.endurance,
    s.run.character.stats.sexuality,
    s.run.character.lust
  );
}

function statDeltaMutable(s:Save,stat:keyof Save['run']['character']['stats'],delta:number){
  const current=s.run.character.stats[stat];
  s.run.character.stats[stat]=Math.min(
    s.run.character.progressionStatCap,
    Math.max(0,current+delta)
  );
}

export function applySecretDebtHiddenShiftMutable(s:Save){
  if(!secretDebtBound(s))throw new Error('Secret Debt hidden work requires active bound state.');
  const wage=secretDebtHiddenWage(s);
  const day=s.run.calendar.elapsedDays;
  const seasonIndex=Math.floor((day%40)/10);
  const season=(['spring','summer','autumn','winter'] as const)[seasonIndex]!;
  s.run.resources.money=Math.min(1_000_000,s.run.resources.money+wage);
  statDeltaMutable(s,'endurance',1);
  statDeltaMutable(s,'sexuality',1);
  if(season==='summer')statDeltaMutable(s,'reason',-1);
  if(season==='winter')statDeltaMutable(s,'sociability',-1);
  s.run.secretDebt.hiddenShifts=Math.min(1_000_000,s.run.secretDebt.hiddenShifts+1);
  return {wage,season};
}

export function secretDebtTakeoverReady(s:Save){
  return secretDebtBound(s)
    && s.run.secretDebt.hiddenShifts>=SECRET_DEBT_TAKEOVER_SHIFTS
    && s.run.character.stats.endurance>=SECRET_DEBT_TAKEOVER_ENDURANCE
    && s.run.character.stats.sexuality>=SECRET_DEBT_TAKEOVER_SEXUALITY
    && s.run.character.stats.wits>=SECRET_DEBT_TAKEOVER_WITS
    && s.run.character.lust>=SECRET_DEBT_TAKEOVER_LUST
    && totalPaidSchoolLessons(s)>=SECRET_DEBT_TAKEOVER_PAID_LESSONS;
}

export function repaySecretDebtMutable(s:Save){
  if(!secretDebtBound(s))throw new Error('Secret Debt repayment requires active bound state.');
  if(s.run.resources.money<SECRET_DEBT_PRINCIPAL)throw new Error('Secret Debt repayment requires the full 20000.');
  s.run.resources.money-=SECRET_DEBT_PRINCIPAL;
  s.run.secretDebt.debt=0;
  s.run.secretDebt.status='paid-freedom';
  s.run.secretDebt.resolvedDay=s.run.calendar.elapsedDays;
}

export function resolveSecretDebtTakeoverMutable(s:Save){
  if(!secretDebtTakeoverReady(s))throw new Error('Secret Debt Takeover requirements are not met.');
  s.run.secretDebt.debt=0;
  s.run.secretDebt.status='takeover';
  s.run.secretDebt.resolvedDay=s.run.calendar.elapsedDays;
}

export function validateSecretDebtState(state:SecretDebtState){
  if(state.status==='unseen'||state.status==='refused'){
    if(state.debt!==0)throw new Error('Unbound Secret Debt state cannot carry debt.');
  }
  if(state.status==='accepted'){
    if(!state.grantApplied||state.acceptedDay===null||state.trapDay!==state.acceptedDay+SECRET_DEBT_TRAP_DELAY_DAYS||state.debt!==0){
      throw new Error('Invalid accepted Secret Debt state.');
    }
  }
  if(state.status==='bound'){
    if(!state.grantApplied||state.acceptedDay===null||state.trapDay===null||state.boundDay===null||state.debt!==SECRET_DEBT_PRINCIPAL){
      throw new Error('Invalid bound Secret Debt state.');
    }
  }
  if(state.status==='paid-freedom'||state.status==='takeover'){
    if(!state.grantApplied||state.resolvedDay===null||state.debt!==0)throw new Error('Invalid resolved Secret Debt state.');
  }
}
