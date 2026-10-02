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


/**
 * Current shipped read-only School seams revalidated on the assignment
 * baseline. These are inputs only; Palace owns no School progression writes.
 */
export const palaceSchoolReadInputs=[
  'school.course.literacy_and_numbers',
  'school.course.etiquette_and_presentation',
  'school.course.arcana',
  'school.course.rhetoric_and_social'
] as const;

/**
 * Current shipped Activity seams that Palace may consume as external evidence
 * once a Palace runtime consumer receives authority. No new Activity behavior
 * is created here.
 */
export const palaceActivityReadInputs={
  lumberForest:{
    activity:'lumber.forest',
    worldFact:'lumber.forest.truth-known'
  },
  hunterExpedition:{
    activity:'hunter.expedition',
    career:'hunter',
    careerFact:'expedition-returned'
  }
} as const;

/**
 * Semantic relationship roles from the Palace design. These are deliberately
 * not relationship IDs and do not choose identities, thresholds or romance
 * gates.
 */
export const palaceRelationshipRoles=[
  'professional-patron',
  'rival',
  'servant-or-official-contact',
  'optional-romance'
] as const;

/**
 * Semantic capability-item roles only. Acquisition, concrete item IDs and
 * exact action gates remain Product/runtime decisions.
 */
export const palaceItemCapabilityRoles=[
  'invitation-or-seal',
  'formal-outfit',
  'archive-key',
  'ceremonial-component',
  'proof-or-document'
] as const;

export const palaceCalendarThemes=[
  'ceremonies',
  'receptions',
  'supplies-and-taxes',
  'delegations',
  'rituals-and-festivals'
] as const;
