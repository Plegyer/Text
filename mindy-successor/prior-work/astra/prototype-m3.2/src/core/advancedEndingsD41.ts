/**
 * D41 Ordinary Complex Endings — Tranche A integration contract.
 *
 * IMPORTANT: this module intentionally does NOT implement strong-Meta ownership,
 * selection, loadout, snapshot, or per-run Specialist runtime. Current main does
 * not contain the frozen strong-Meta producer. Chat 2 must bind these exact
 * Specialist IDs into chat4/strong-meta-runtime-producer-v7 after assembly.
 *
 * Automatic knowledge/content rewards use the already-supported meta unlock
 * mechanism and therefore can be granted by current runtime immediately.
 */

export const D41_ENDING_IDS={
  lumberForewoman:'ending.lumber.forewoman',
  lumberForest:'ending.lumber.forest',
  satyrHousePower:'ending.satyr-maid.house-power',
  satyrPersonalNetwork:'ending.satyr-maid.personal-network',
  satyrBoundaryMastery:'ending.satyr-maid.boundary-mastery',
  farmResearch:'ending.undead-farm.research-farmer',
  farmSuccessor:'ending.undead-farm.successor',
  farmExternalAnomaly:'ending.undead-farm.external-anomaly',
  tavernInnkeeper:'ending.tavern.innkeeper',
  tavernInformationBroker:'ending.tavern.information-broker',
  tavernSanctuary:'ending.tavern.sanctuary',
  hunterMaster:'ending.hunter.master-hunter',
  hunterWarden:'ending.hunter.warden',
  hunterLegend:'ending.hunter.legend'
} as const;

export type D41EndingId=typeof D41_ENDING_IDS[keyof typeof D41_ENDING_IDS];

export const D41_SPECIALIST_REWARD_IDS={
  lumberForewomanLedger:'specialist.lumber.forewoman-ledger',
  lumberForestCompactRoute:'specialist.lumber.forest-compact-route',
  satyrHouseLedger:'specialist.satyr-maid.house-ledger',
  satyrGuestNetwork:'specialist.satyr-maid.guest-network',
  farmFieldPreservation:'specialist.undead-farm.field-preservation',
  farmSupplierAccount:'specialist.undead-farm.supplier-account',
  tavernHouseLedger:'specialist.tavern.house-ledger',
  tavernSafehouseNetwork:'specialist.tavern.safehouse-network',
  hunterMasterKit:'specialist.hunter.master-kit'
} as const;

export const D41_AUTOMATIC_REWARD_IDS={
  satyrClearTerms:'satyr-maid.clear-terms',
  farmAnomalyCatalog:'knowledge.undead-farm.anomaly-catalog',
  tavernBrokerIndex:'knowledge.tavern.broker-index',
  hunterWardenSigns:'knowledge.hunter.warden-signs',
  hunterLegendContracts:'knowledge.hunter.legend-contracts'
} as const;

export type D41SpecialistBinding=Readonly<{
  endingId:D41EndingId;
  rewardId:string;
  rewardClass:'specialist';
  usesPerRun:number;
  perCalendarYearCap?:number;
  totalPerRunCap?:number;
  unitAmount?:number;
  integrationContract:string;
}>;

/**
 * Exact Specialist reward IDs/effects from frozen D41.
 * These rows are the seam Chat 2 must register in the single strong-Meta registry.
 * No generic unlock is an allowed substitute.
 */
export const D41_SPECIALIST_BINDINGS:readonly D41SpecialistBinding[]=[
  {
    endingId:D41_ENDING_IDS.lumberForewoman,
    rewardId:D41_SPECIALIST_REWARD_IDS.lumberForewomanLedger,
    rewardClass:'specialist',usesPerRun:1,
    integrationContract:'After Lumber trusted-worker and Foreman route-professional, one Forewoman Ledger prep may satisfy the Forewoman School competence gate via a specialist-only token. It must not increment School counters, publish management-school-ready, or resolve the production problem.'
  },
  {
    endingId:D41_ENDING_IDS.lumberForest,
    rewardId:D41_SPECIALIST_REWARD_IDS.lumberForestCompactRoute,
    rewardClass:'specialist',usesPerRun:1,
    integrationContract:'After the Forest region is normally unlocked, expose one lateral Forest Compact route for one Activity entry per run. It must not unlock the region, waive entry cost, grant the required specimen, or publish ending facts.'
  },
  {
    endingId:D41_ENDING_IDS.satyrHousePower,
    rewardId:D41_SPECIALIST_REWARD_IDS.satyrHouseLedger,
    rewardClass:'specialist',usesPerRun:1,
    integrationContract:'After Satyr Maid house-regular (8 shifts), choose one House Power competence substitute: Management or Rhetoric. It is a specialist-only token and must not increment School counters, publish School-ready facts, or resolve the crisis.'
  },
  {
    endingId:D41_ENDING_IDS.satyrPersonalNetwork,
    rewardId:D41_SPECIALIST_REWARD_IDS.satyrGuestNetwork,
    rewardClass:'specialist',usesPerRun:1,
    integrationContract:'On the first recurring-guest work introduction, grant exactly one extra service-meeting credit once per run. It must never auto-accept Night contact or the later request and must not imply romance.'
  },
  {
    endingId:D41_ENDING_IDS.farmResearch,
    rewardId:D41_SPECIALIST_REWARD_IDS.farmFieldPreservation,
    rewardClass:'specialist',usesPerRun:1,
    integrationContract:'Once per run, one held farm_unstable_specimen may become farm_preserved_specimen without preserve_specimen capability. Scope is farm specimen only; no generic capability is granted.'
  },
  {
    endingId:D41_ENDING_IDS.farmSuccessor,
    rewardId:D41_SPECIALIST_REWARD_IDS.farmSupplierAccount,
    rewardClass:'specialist',usesPerRun:1,
    integrationContract:'After the first Undead Farm shift, claim exactly one farm_delivery_input per run. It does not resolve the Successor relationship, School, or crisis gates.'
  },
  {
    endingId:D41_ENDING_IDS.tavernInnkeeper,
    rewardId:D41_SPECIALIST_REWARD_IDS.tavernHouseLedger,
    rewardClass:'specialist',usesPerRun:5,totalPerRunCap:125,unitAmount:25,
    integrationContract:'Discount only the first five paid city lodgings by exactly 25 each (normal 100→75, cheap 50→25; total cap 125). Never change housing tier, privateSpace semantics, street/camp, or other lodging rules.'
  },
  {
    endingId:D41_ENDING_IDS.tavernSanctuary,
    rewardId:D41_SPECIALIST_REWARD_IDS.tavernSafehouseNetwork,
    rewardClass:'specialist',usesPerRun:4,perCalendarYearCap:1,totalPerRunCap:4,
    integrationContract:'At most once per calendar year (four times per run), after lodging resolution and only when no forced Night owns the night, cheap/street may expose a sanctuary-contact choice. It must not change cost, tier, penalties, lender state, privateSpace, or calendar.'
  },
  {
    endingId:D41_ENDING_IDS.hunterMaster,
    rewardId:D41_SPECIALIST_REWARD_IDS.hunterMasterKit,
    rewardClass:'specialist',usesPerRun:1,
    integrationContract:'Before one Hunter expedition per run, choose a loaned preserve_specimen OR cross_rough_route capability for that single Activity entry. It expires on exit and does not alter entry cost, Field Time, or route facts.'
  }
] as const;

export const D41_AUTOMATIC_REWARD_BY_ENDING:Readonly<Record<string,string>>={
  [D41_ENDING_IDS.satyrBoundaryMastery]:D41_AUTOMATIC_REWARD_IDS.satyrClearTerms,
  [D41_ENDING_IDS.farmExternalAnomaly]:D41_AUTOMATIC_REWARD_IDS.farmAnomalyCatalog,
  [D41_ENDING_IDS.tavernInformationBroker]:D41_AUTOMATIC_REWARD_IDS.tavernBrokerIndex,
  [D41_ENDING_IDS.hunterWarden]:D41_AUTOMATIC_REWARD_IDS.hunterWardenSigns,
  [D41_ENDING_IDS.hunterLegend]:D41_AUTOMATIC_REWARD_IDS.hunterLegendContracts
};

export const D41_TAVERN_LEGACY_ENDING_MIGRATIONS:Readonly<Record<string,D41EndingId>>={
  'tavern-stay':D41_ENDING_IDS.tavernInnkeeper,
  'tavern-guild':D41_ENDING_IDS.tavernSanctuary,
  'tavern-court':D41_ENDING_IDS.tavernInformationBroker
};

export const D41_RETIRED_META_UNLOCK_IDS=[
  'host',
  'mediator',
  'court',
  'satyr-maid.house-credit'
] as const;

export function canonicalD41EndingId(id:string):string{
  return D41_TAVERN_LEGACY_ENDING_MIGRATIONS[id]??id;
}

export function isRetiredD41TavernEnding(id:string):boolean{
  return Object.prototype.hasOwnProperty.call(D41_TAVERN_LEGACY_ENDING_MIGRATIONS,id);
}

function unique(values:readonly string[]):string[]{
  return [...new Set(values)];
}

/**
 * Idempotent profile-level D41 migration.
 * - Completed legacy Tavern endings become their canonical D41 ending IDs.
 * - Legacy Tavern reward unlocks and broad Satyr +600 money unlock are retired.
 * - Already-completed automatic-reward endings receive their current automatic
 *   knowledge/content unlock, including tavern-court -> Information Broker.
 *
 * Specialist ownership is intentionally NOT written here; use
 * d41PendingSpecialistRewardIds after strong-Meta assembly.
 */
export function migrateD41MetaData(input:Readonly<{
  completedEndings:readonly string[];
  unlocks:readonly string[];
}>):Readonly<{completedEndings:string[];unlocks:string[]}>{
  const completedEndings=unique(input.completedEndings.map(canonicalD41EndingId));
  const retired=new Set<string>(D41_RETIRED_META_UNLOCK_IDS);
  const unlocks=unique(input.unlocks.filter(id=>!retired.has(id)));
  for(const endingId of completedEndings){
    const reward=D41_AUTOMATIC_REWARD_BY_ENDING[endingId];
    if(reward&&!unlocks.includes(reward))unlocks.push(reward);
  }
  return {completedEndings,unlocks};
}

/**
 * Strong-Meta assembly hook. Because the current branch deliberately has no
 * Specialist ownership store, Chat 2 must call this against canonical completed
 * endings and grant the returned IDs through the one strong-Meta ownership API.
 * That ownership API is responsible for exactly-once deduplication.
 */
export function d41PendingSpecialistRewardIds(
  completedEndings:readonly string[],
  legacyUnlocks:readonly string[]=[]
):string[]{
  const completed=new Set(completedEndings.map(canonicalD41EndingId));
  const pending=D41_SPECIALIST_BINDINGS
    .filter(binding=>completed.has(binding.endingId))
    .map(binding=>binding.rewardId);
  // Frozen D41 migrates legacy House Credit ownership even when an old profile
  // lacks a matching completed-ending row. This remains only a binding signal:
  // the single strong-Meta runtime must grant/dedupe actual ownership.
  if(legacyUnlocks.includes('satyr-maid.house-credit')){
    pending.push(D41_SPECIALIST_REWARD_IDS.satyrHouseLedger);
  }
  return unique(pending);
}
