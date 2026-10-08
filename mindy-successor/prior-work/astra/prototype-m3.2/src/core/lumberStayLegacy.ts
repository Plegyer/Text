export const RETIRED_LUMBER_STAY_ENDING_ID='lumber-stay' as const;
export const RETIRED_LUMBER_STAY_UNLOCK_ID='vitality' as const;
export const LUMBER_STAY_LEGACY_PERK_ID='legacy.lumber-stay.vitality' as const;

export function isRetiredHistoricalEndingId(id:string){
  return id===RETIRED_LUMBER_STAY_ENDING_ID;
}

export function migrateLumberStayLegacyMetaData(input:{
  completedEndings?:readonly string[];
  unlocks?:readonly string[];
  activeLegacyPerks?:readonly string[];
}){
  const completedEndings=[...new Set(input.completedEndings??[])];
  const rawUnlocks=[...new Set(input.unlocks??[])];
  const activeLegacyPerks=[...new Set(input.activeLegacyPerks??[])];
  const historicalOwnership=
    completedEndings.includes(RETIRED_LUMBER_STAY_ENDING_ID)||
    rawUnlocks.includes(RETIRED_LUMBER_STAY_UNLOCK_ID)||
    activeLegacyPerks.includes(LUMBER_STAY_LEGACY_PERK_ID);

  return {
    completedEndings,
    unlocks:rawUnlocks.filter(id=>id!==RETIRED_LUMBER_STAY_UNLOCK_ID),
    activeLegacyPerks:historicalOwnership
      ?[...new Set([...activeLegacyPerks,LUMBER_STAY_LEGACY_PERK_ID])]
      :activeLegacyPerks
  };
}
