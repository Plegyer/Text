/* SUSLIK 2: approved foreman training. Pure model; no calendar or save engine.
   Classic script for portable file://. The host resolves its EXISTING night. */
(function (host) {
'use strict';
const SCENE_ID='foreman-night-training';
function initialState(){return {version:1,lastNightId:null,usedNightIds:[],presentation:null};}
function restoreState(raw){
  const state=initialState();
  if(!raw||typeof raw!=='object'||raw.version!==1)return state;
  if(typeof raw.lastNightId==='string'&&raw.lastNightId.length>0)state.lastNightId=raw.lastNightId;
  if(Array.isArray(raw.usedNightIds)){
    state.usedNightIds=[...new Set(raw.usedNightIds.filter(
      id=>typeof id==='string'&&id.length>0))];
  }
  if(state.lastNightId&&!state.usedNightIds.includes(state.lastNightId))
    state.usedNightIds.push(state.lastNightId);
  const p=raw.presentation;
  if(p&&state.lastNightId===p.nightId&&p.sceneId===SCENE_ID&&
     p.mediaIds&&typeof p.mediaIds==='object'&&!Array.isArray(p.mediaIds)){
    const mediaIds={};
    for(const [slot,id] of Object.entries(p.mediaIds)){
      if(typeof slot==='string'&&slot&&typeof id==='string')mediaIds[slot]=id;
    }
    state.presentation={sceneId:SCENE_ID,nightId:p.nightId,mediaIds};
  }
  return state;
}
function canTrain(state,questUnlocked,nightId,onExistingNightScreen){
  const s=restoreState(state);
  return questUnlocked===true && onExistingNightScreen===true &&
    typeof nightId==='string'&&nightId.length>0 &&
    s.presentation===null && !s.usedNightIds.includes(nightId);
}
function checkedStat(value,name) {
  if(!Number.isSafeInteger(value)||value<0)throw new RangeError('Invalid '+name);
  return value;
}
function checkedCap(value,name) {
  if(!Number.isSafeInteger(value)||value<1)throw new RangeError('Invalid '+name);
  return value;
}
function boostedStats(stats,caps){
  if(!stats||!caps)throw new TypeError('Existing stats and caps required');
  const result={};
  for(const key of ['strength','endurance']){
    const value=checkedStat(stats[key],key);
    const cap=checkedCap(caps[key],key+' cap');
    // Never reduce an already over-cap stat from an older/bonus save.
    result[key]=value>=cap?value:value+1;
  }
  return Object.freeze(result);
}
function mediaChoices(mediaSlots,rng=Math.random){
  if(!Array.isArray(mediaSlots))throw new TypeError('Media-slot manifest must be an array');
  const choices={};
  for(const slot of mediaSlots){
    if(!slot||typeof slot.id!=='string'||!slot.id||
       !Array.isArray(slot.variants)||Object.hasOwn(choices,slot.id))
      throw new TypeError('Invalid or repeated media slot ID');
    choices[slot.id]=''; // no authored files yet, no artificial media
    if(slot.variants.length===0)continue;
    for(const variant of slot.variants){
      if(!variant||typeof variant.id!=='string'||!variant.id)
        throw new TypeError('Missing stable media variant ID');
    }
    const r=rng();
    if(typeof r!=='number'||!Number.isFinite(r)||r<0||r>=1)
      throw new RangeError('Media random source must be in [0,1)');
    choices[slot.id]=slot.variants[Math.floor(r*slot.variants.length)].id;
  }
  return choices;
}
function completedState(previous,nightId,mediaIds){
  const s=restoreState(previous);
  if(typeof nightId!=='string'||!nightId||s.usedNightIds.includes(nightId)||s.presentation)
    throw new Error('Training already completed or pending for this night');
  return {version:1,lastNightId:nightId,
    usedNightIds:[...s.usedNightIds,nightId],presentation:{sceneId:SCENE_ID,nightId,mediaIds:{...mediaIds}}};
}
function acknowledgePresentation(raw){
  const s=restoreState(raw);
  if(!s.presentation)return null;
  return {...s,presentation:null};
}
host.SUSLIK2ForemanNightTraining=Object.freeze({
  SCENE_ID,initialState,restoreState,canTrain,boostedStats,mediaChoices,
  completedState,acknowledgePresentation
});
})(globalThis);
