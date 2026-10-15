/* SUSLIK 2: zombie/undead farm paid-shift contract.
 * Pure rules only; the existing game host owns Save, calendar, lust counter,
 * atomic reward posting, navigation and music. No additional game store.
 */
(function(host){
'use strict';
const STAT_FLOOR=1;
const CAREER='undead-farm';
const ART=Object.freeze({
  summer:'assets/undead-farm/shift-summer.png',
  autumn:'assets/undead-farm/shift-autumn.png',
  winter:'assets/undead-farm/shift-winter.png',
  spring:'assets/undead-farm/shift-spring.png'
});
const SEASON_EFFECTS=Object.freeze({
 spring:Object.freeze({endurance:1,magic:1,reason:-1}),
 summer:Object.freeze({endurance:1,strength:1}),
 autumn:Object.freeze({endurance:1,reason:1,strength:-1}),
 winter:Object.freeze({magic:1,reason:1})
});
const isStat=x=>Number.isFinite(x)&&x>=STAT_FLOOR;
const isCount=x=>Number.isSafeInteger(x)&&x>=0;
function seasonArt(season){return ART[season]??null;}
function calculateWage(stats){
 if(!stats||!['endurance','magic','reason'].every(k=>isStat(stats[k])))throw Error('undead farm: invalid wage stats');
 return Math.min(120,Math.round(37+.3*stats.endurance+.3*stats.magic+.2*stats.reason));
}
function receipt(input,rng=Math.random){
 if(!input||!Object.hasOwn(SEASON_EFFECTS,input.season))throw Error('undead farm: invalid season');
 if(typeof input.shiftId!=='string'||!input.shiftId.trim())throw Error('undead farm: unique shiftId required');
 if(!isCount(input.energy)||input.energy<1)throw Error('undead farm: insufficient energy');
 if(!isCount(input.lust)||!isCount(input.lustActivationCount))throw Error('undead farm: invalid shared lust state');
 const stats=input.stats;
 if(!stats||!Object.values(SEASON_EFFECTS[input.season]).length||
    !Object.keys(SEASON_EFFECTS[input.season]).every(k=>isStat(stats[k])))throw Error('undead farm: invalid seasonal stats');
 const wage=calculateWage(stats); // BEFORE seasonal rewards.
 const deltas={};
 for(const [key,delta] of Object.entries(SEASON_EFFECTS[input.season])){
   const cap=input.statCaps?.[key];
   if(cap!==undefined&&(!Number.isFinite(cap)||cap<STAT_FLOOR))throw Error('undead farm: invalid stat cap');
   const result=Math.min(cap??Infinity,Math.max(STAT_FLOOR,stats[key]+delta));
   deltas[key]=result-stats[key];
 }
 const chance=input.lust>=25?Math.min(100,input.lust)/100:0;
 let alternate=false;
 if(chance>0){
   const draw=rng();
   if(!Number.isFinite(draw)||draw<0||draw>=1)throw Error('undead farm: invalid RNG');
   alternate=draw<chance;
 }
 const nextCount=input.lustActivationCount+(alternate?1:0);
 const lustDelta=alternate&&nextCount%3===0?1:0;
 return Object.freeze({
   receiptId:input.shiftId,career:CAREER,season:input.season,
   goldEarned:wage,energyCost:1,paidShifts:1,
   statsDelta:Object.freeze(deltas),
   lustDelta,lustActivationCountAfter:nextCount,
   alternateResult:alternate,
   resultArtSlot:alternate?'undead-farm/shift/lust-pending':ART[input.season],
   itemsAdded:Object.freeze([]),endingGranted:false
 });
}
function settle(input,{committedShiftIds,commitOrdinaryPaidShift},rng=Math.random){
 if(!Array.isArray(committedShiftIds)||typeof commitOrdinaryPaidShift!=='function')throw Error('undead farm: host atomic work adapter required');
 if(committedShiftIds.includes(input?.shiftId))return Object.freeze({kind:'already-committed',shiftId:input.shiftId});
 const planned=receipt(input,rng);
 // The host MUST atomically verify receiptId, debit 1 energy, credit wage,
 // apply stat deltas and shared Lust count, increment paid shift, persist
 // result scene, and return a persisted snapshot. Duplicate IDs do nothing.
 return commitOrdinaryPaidShift(planned);
}
host.SUSLIK2UndeadFarm=Object.freeze({CAREER,STAT_FLOOR,ART,SEASON_EFFECTS,calculateWage,receipt,settle,seasonArt});
})(globalThis);
