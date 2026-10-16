/* Work actions. Seasons are calendar-driven; shifts never advance the day. */
function newWorkRun(work) {
  if (typeof window !== "undefined" && window.SUSLIK2Gameplay) return window.SUSLIK2Gameplay.startRun(work);
  return {elapsedDays:0,lust:work.initial.lust,energy:work.initial.energy,energyMax:work.initial.energyMax,moneyEarned:0,gold:0,completedShifts:0,lastShift:null};
}
function workSeason(elapsedDays,work) {
  if (!Number.isSafeInteger(elapsedDays) || elapsedDays < 0) throw Error('Invalid day');
  return work.seasons[Math.floor((elapsedDays % (work.daysPerSeason*work.seasons.length)) / work.daysPerSeason)];
}
function sawmillAvailability(state,work) {
  if (state.run.energy < work.sawmill.energyCost) return 'noEnergy';
  return null;
}
function applySawmillShift(state,work,options={}) {
  const blocked = sawmillAvailability(state,work);
  if(blocked) return {ok:false,reason:blocked};
  const definition=work.sawmill;
  const season=workSeason(state.run.elapsedDays,work);
  const wage=Math.min(definition.wage.cap,Math.round(definition.wage.base +
    definition.wage.weights.reduce((sum,term)=>sum+state.character.stats[term.stat]*term.factor,0)));
  // One atomic paid shift; the illustrated result screen is not a second payment.
  state.run.energy-=definition.energyCost;
  const applied=[];
  for(const {stat,delta} of definition.seasonal[season].effects) {
    const before=stat==='lust'?state.run.lust:state.character.stats[stat];
    const after=Math.max(1,Math.min(200,before+delta));
    if(stat==='lust')state.run.lust=after;else state.character.stats[stat]=after;
    applied.push({stat,delta:after-before});
  }
  const extraGold=options.extraGold||0;
  state.run.moneyEarned=Math.min(1000000,state.run.moneyEarned+wage+extraGold);
  state.run.gold=Math.min(1000000,(state.run.gold||0)+wage+extraGold);
  state.run.completedShifts++;
  // Universal work lust gate; other professions must reuse this function, not their own counters.
  state.run.lustEventCount=state.run.lustEventCount||0;
  const chance=state.run.lust<25?0:Math.min(100,state.run.lust);
  const occurrence=(options.random||Math.random)()*100 < chance;
  if(occurrence){state.run.lustEventCount++;if(state.run.lustEventCount%3===0)state.run.lust=Math.min(200,state.run.lust+1);}
  const media=typeof window!=='undefined'&&window.SUSLIK2_GAMEPLAY_CONTENT?.lustMedia?.filter(x=>x.file)||[];
  const lustMediaId=occurrence&&media.length?media[Math.floor((options.random||Math.random)()*media.length)].id:null;
  state.run.lastShift={season,wage:wage+extraGold,baseWage:wage,extraGold,effects:applied,shift:state.run.completedShifts,lustEvent:occurrence,lustEventIndex:occurrence?state.run.lustEventCount:0,lustMediaId,origin:options.origin||'sawmill'};
  return {ok:true, ...state.run.lastShift};
}


/* Undead farm: one normal paid shift using the existing game run and common
 * work Lust counter. No inventory, recipes, endings, or separate save slots. */
function applyUndeadFarmShift(state,work,options={}) {
 const def=work.farm;
 if(!def) return {ok:false,reason:'unavailable'};
 if(state.run.energy<def.energyCost)return {ok:false,reason:'noEnergy'};
 const season=workSeason(state.run.elapsedDays,work);
 const wage=Math.min(def.wage.cap,Math.round(def.wage.base+
  def.wage.weights.reduce((sum,w)=>sum+state.character.stats[w.stat]*w.factor,0)));
 state.run.energy-=def.energyCost;
 const effects=[];
 for(const {stat,delta} of def.seasonal[season].effects){
  const before=state.character.stats[stat];
  const after=Math.max(1,Math.min(200,before+delta));
  state.character.stats[stat]=after;
  effects.push({stat,delta:after-before});
 }
 state.run.moneyEarned=Math.min(1000000,state.run.moneyEarned+wage);
 state.run.gold=Math.min(1000000,(state.run.gold||0)+wage);
 state.run.farmShifts=(state.run.farmShifts||0)+1;
 // Same chance, roll, and run-wide count as the existing sawmill implementation.
 state.run.lustEventCount=state.run.lustEventCount||0;
 const chance=state.run.lust<25?0:Math.min(100,state.run.lust);
 const occurrence=(options.random||Math.random)()*100<chance;
 if(occurrence){state.run.lustEventCount++;if(state.run.lustEventCount%3===0)state.run.lust=Math.min(200,state.run.lust+1);}
 const media=typeof window!=='undefined'&&window.SUSLIK2_GAMEPLAY_CONTENT?.lustMedia?.filter(x=>x.file)||[];
 const lustMediaId=occurrence&&media.length?media[Math.floor((options.random||Math.random)()*media.length)].id:null;
 state.run.farmLastShift={season,wage,effects,shift:state.run.farmShifts,lustEvent:occurrence,
   lustEventIndex:occurrence?state.run.lustEventCount:0,lustMediaId,origin:'undead-farm'};
 return {ok:true,...state.run.farmLastShift};
}
