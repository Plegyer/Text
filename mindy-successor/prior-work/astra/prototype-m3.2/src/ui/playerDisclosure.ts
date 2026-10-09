/** A deliberately small boundary between the player-facing UI and exact QA/debug data.
 * The simulation's eligibility logic is unchanged by these presentation rules.
 * Development UI can be requested only with ?dev=1 in the app URL.
 */
export type FateDiscoveryState='locked'|'eligible'|'committed'|'completed';
export const playerMaySeeFate=(status:FateDiscoveryState,developerMode=false)=>developerMode||status!=='locked';
export const playerMaySeeCareer=(lateCareer:boolean,available:boolean,developerMode=false)=>developerMode||!lateCareer||available;
export const playerMaySeeExactConditions=(developerMode=false)=>developerMode;
export const playerMaySeeSecretGate=(developerMode=false)=>developerMode;
export const playerMaySeeDebugTools=(developerMode=false)=>developerMode;
export const playerMaySeeStrongMetaSelection=(ownedRewardCount:number,developerMode=false)=>developerMode||ownedRewardCount>0;
export const lodgingPlayerHint=(id:string,locale:'ru'|'en'):string=>{
 if(id==='lodging.normal')return locale==='en'?'Private room: personal evening meetings possible.':'Отдельная комната: возможны личные вечерние встречи.';
 if(id==='lodging.cheap')return locale==='en'?'Shared lodging; no private meetings.':'Общий ночлег: без приватных встреч.';
 return '';
};
