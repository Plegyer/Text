import {
  ordinaryHardWorkCareers,
  stats,
  type MachineDefinition,
  type OrdinaryHardWorkCareer,
  type Stat
} from './schema.ts';

export const PALACE_TRUE_ENDING_STAT_THRESHOLD=91 as const;
export const PALACE_BASE_STAT_CAP=100 as const;
export const PALACE_TRUE_ENDING_LEGACY_STAT_CAP=200 as const;
export const PALACE_ACCESS_FACT='palace.access-granted' as const;

export interface PalaceRunGateInput {
  permanentHardWorkCareers:readonly string[];
  activeHardWorkCareerPackages:readonly string[];
}

export interface PalaceRunGateResult {
  eligible:boolean;
  missingPermanent:OrdinaryHardWorkCareer[];
  missingActive:OrdinaryHardWorkCareer[];
}

/**
 * D23 consumer contract.
 *
 * Package contents (+5 target stats, including any Lust package) are deliberately
 * irrelevant here. Palace cares about one active package per ordinary career.
 */
export function palaceRunGate(input:PalaceRunGateInput):PalaceRunGateResult{
  const permanent=new Set(input.permanentHardWorkCareers);
  const active=new Set(input.activeHardWorkCareerPackages);
  const missingPermanent=ordinaryHardWorkCareers.filter(career=>!permanent.has(career));
  const missingActive=ordinaryHardWorkCareers.filter(career=>!active.has(career));
  return {
    eligible:missingPermanent.length===0&&missingActive.length===0,
    missingPermanent,
    missingActive
  };
}

export function normalizeEarnedActiveHardWorkPackages(
  permanentHardWorkCareers:readonly string[],
  requestedActivePackages:readonly string[]
):OrdinaryHardWorkCareer[]{
  const earned=new Set(permanentHardWorkCareers);
  const requested=new Set(requestedActivePackages);
  return ordinaryHardWorkCareers.filter(career=>earned.has(career)&&requested.has(career));
}

export const palaceInvitationContract={
  externalGate:'palaceRunEligible',
  trigger:{kind:'creationCompleted'} as const,
  calendarElapsedDay:0,
  priorityClass:'critical_progression' as const,
  blocking:true,
  deliveryPolicy:'latched' as const,
  maxShows:1,
  usesGameplayRng:false,
  requiresStatGate:false,
  requiresItemGate:false,
  grantsAccessFact:PALACE_ACCESS_FACT
} as const;

export type PalaceInvitationState='ineligible'|'queued'|'resolved';

export interface PalaceLocalAccessState {
  invitation:PalaceInvitationState;
  accessGranted:boolean;
}

/**
 * Serializable Palace-local lifecycle. Shared integration owns how the external
 * D23 gate is snapshotted into the run and how the latched event is queued.
 */
export function initialPalaceAccessState(runEligible:boolean):PalaceLocalAccessState{
  return runEligible
    ?{invitation:'queued',accessGranted:false}
    :{invitation:'ineligible',accessGranted:false};
}

export function resolvePalaceInvitation(state:PalaceLocalAccessState):PalaceLocalAccessState{
  if(state.invitation!=='queued')return state;
  return {invitation:'resolved',accessGranted:true};
}

export type PalaceProgressionStatValues=Readonly<Record<Stat,number>>;

export interface PalaceTrueEndingStatGateResult {
  satisfied:boolean;
  belowThreshold:Stat[];
}

/**
 * D18/D24 fixed baseline check.
 *
 * The threshold is absolute raw >=91 on the locked 0..100 D18 scale and is
 * intentionally NOT normalized against a later run cap of 200.
 */
export function palaceTrueEndingStatGate(values:PalaceProgressionStatValues):PalaceTrueEndingStatGateResult{
  const belowThreshold=stats.filter(stat=>{
    const value=values[stat];
    return !Number.isFinite(value)||value<PALACE_TRUE_ENDING_STAT_THRESHOLD;
  });
  return {satisfied:belowThreshold.length===0,belowThreshold};
}

export const palaceCap200LegacyContract={
  affectedStats:stats,
  baseCap:PALACE_BASE_STAT_CAP,
  activeCap:PALACE_TRUE_ENDING_LEGACY_STAT_CAP,
  multipliesCurrentValues:false,
  multipliesStartingValues:false,
  multipliesHardWorkBonuses:false,
  multipliesManualAllocationPoints:false,
  affectsLust:false
} as const;

/**
 * Generic role identities are Product-authorized. These are deliberately small
 * skeletons and do not choose the still-open Palace career topology.
 */
export const palaceRelationshipMachineSkeletons:MachineDefinition[]=[
  {
    id:'palace.professional-patron',
    label:'Palace professional patron',
    initialStage:'introduced',
    stages:['introduced','professional-trust','route-resolved'],
    transitions:[
      {id:'build-trust',from:['introduced'],to:'professional-trust',conditions:[],effects:[]},
      {id:'resolve-route',from:['professional-trust'],to:'route-resolved',conditions:[],effects:[]}
    ]
  },
  {
    id:'palace.rival',
    label:'Palace professional rival',
    initialStage:'introduced',
    stages:['introduced','professional-tension','route-resolved'],
    transitions:[
      {id:'open-rivalry',from:['introduced'],to:'professional-tension',conditions:[],effects:[]},
      {id:'resolve-rivalry',from:['professional-tension'],to:'route-resolved',conditions:[],effects:[]}
    ]
  },
  {
    id:'palace.official-contact',
    label:'Palace servant or official contact',
    initialStage:'introduced',
    stages:['introduced','professional-trust','utility-ready','route-resolved'],
    transitions:[
      {id:'build-trust',from:['introduced'],to:'professional-trust',conditions:[],effects:[]},
      {id:'open-utility',from:['professional-trust'],to:'utility-ready',conditions:[],effects:[]},
      {id:'resolve-route',from:['utility-ready'],to:'route-resolved',conditions:[],effects:[]}
    ]
  },
  {
    id:'palace.optional-romance',
    label:'Palace optional romance',
    initialStage:'introduced',
    stages:['introduced','trust','mode-open','route-resolved'],
    transitions:[
      {id:'build-trust',from:['introduced'],to:'trust',conditions:[],effects:[]},
      {id:'open-mode',from:['trust'],to:'mode-open',conditions:[],effects:[]},
      {id:'resolve-non-romance',from:['mode-open'],to:'route-resolved',conditions:[],effects:[]},
      {id:'resolve-romance',from:['mode-open'],to:'route-resolved',conditions:[],effects:[]}
    ]
  }
];

export const palaceVoluntaryNightContract={
  id:'palace.night.work-review',
  voluntary:true,
  forced:false,
  requiresAccessFact:PALACE_ACCESS_FACT,
  consumesExistingVoluntaryNightChoice:true,
  bypassesForcedNight:false,
  writesPalaceLocalEvidenceOnly:true,
  nextDayEnergyDelta:0
} as const;

/**
 * Shipped capabilities may branch Palace content, but never contribute to D23
 * eligibility and never grant Palace access.
 */
export const palaceOptionalLegacyItemCapabilities=[
  'artist_formal_presence',
  'artist_handle_invitation',
  'official_guard_access',
  'guard_sealed_pass',
  'merchant_verify_manifest',
  'merchant_handle_samples'
] as const;

export function palaceAvailableLegacyItemCapabilities(
  ownedCapabilities:readonly string[]
):string[]{
  const owned=new Set(ownedCapabilities);
  return palaceOptionalLegacyItemCapabilities.filter(capability=>owned.has(capability));
}
