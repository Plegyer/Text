import {ordinaryHardWorkCareers, stats, type OrdinaryHardWorkCareer, type Stat} from './schema.ts';

export const palaceOutcomeFamilies=['service-life','court-power','inner-truth'] as const;
export type PalaceOutcomeFamily=typeof palaceOutcomeFamilies[number];

export interface PalaceUnlockProgress {
  completedOrdinary:OrdinaryHardWorkCareer[];
  missingOrdinary:OrdinaryHardWorkCareer[];
  unlocked:boolean;
}

/**
 * Palace unlock is derived only from unique Hard Work completion across the
 * ten ordinary careers. Hidden routes and duplicate entries cannot substitute.
 */
export function palaceUnlockProgress(hardWorkProgress:readonly string[]):PalaceUnlockProgress{
  const completedSet=new Set(hardWorkProgress);
  const completedOrdinary=ordinaryHardWorkCareers.filter(c=>completedSet.has(c));
  const missingOrdinary=ordinaryHardWorkCareers.filter(c=>!completedSet.has(c));
  return {completedOrdinary,missingOrdinary,unlocked:missingOrdinary.length===0};
}

export function palaceUnlockSatisfied(hardWorkProgress:readonly string[]):boolean{
  return palaceUnlockProgress(hardWorkProgress).unlocked;
}

export interface PalaceProgressionEvidence {
  hasPalaceShiftEvidence:boolean;
  hasBuildCheckEvidence:boolean;
  hasExternalFact:boolean;
  hasPalaceDecision:boolean;
  hasLegacyOpportunity:boolean;
}

/**
 * Product authority requires these evidence families for Palace progression,
 * but does not currently authorize exact counts, thresholds or stage binding.
 * This helper intentionally answers only whether every required evidence
 * category is represented.
 */
export function hasRequiredPalaceProgressionEvidence(evidence:PalaceProgressionEvidence):boolean{
  return evidence.hasPalaceShiftEvidence
    && evidence.hasBuildCheckEvidence
    && evidence.hasExternalFact
    && evidence.hasPalaceDecision
    && evidence.hasLegacyOpportunity;
}

export type ProgressionPercentages=Readonly<Record<Stat,number>>;

export const palaceTrueEndingProgressionStats=stats;

export interface PalaceTrueEndingEligibilityInput {
  palaceUnlocked:boolean;
  progressionPercentByStat:ProgressionPercentages;
  princeVictory:boolean;
}

export type PalaceTrueEndingMissingRequirement='palace-unlock'|'progression-stats'|'prince-victory';

export interface PalaceTrueEndingEligibility {
  eligible:boolean;
  missing:PalaceTrueEndingMissingRequirement[];
}

/**
 * D18 eligibility check over already-normalized percentages.
 *
 * Deliberately NOT handled here:
 * - conversion from raw stat values to percentages;
 * - Prince confrontation mechanics or identity;
 * - ending/runtime IDs;
 * - NG+ x2 ordering or cap interaction.
 */
export function palaceTrueEndingEligibility(input:PalaceTrueEndingEligibilityInput):PalaceTrueEndingEligibility{
  const missing:PalaceTrueEndingMissingRequirement[]=[];
  if(!input.palaceUnlocked)missing.push('palace-unlock');
  if(!palaceTrueEndingProgressionStats.every(stat=>{
    const value=input.progressionPercentByStat[stat];
    return Number.isFinite(value)&&value>90;
  }))missing.push('progression-stats');
  if(!input.princeVictory)missing.push('prince-victory');
  return {eligible:missing.length===0,missing};
}

export const palaceTrueEndingResult={
  returnsHome:true,
  grantsPermanentOptionalDoubleAllProgressionStats:true
} as const;
