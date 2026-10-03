import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

import {calendar,dispatch,eligible,parseSave} from '../src/core/engine.ts';
import type {Save} from '../src/core/schema.ts';
import {catalog,started} from './helpers.ts';

const defs=JSON.parse(readFileSync('content/definitions.json','utf8'));
const loc=JSON.parse(readFileSync('content/localization.json','utf8')).strings;
const baseline=JSON.parse(readFileSync('content/guard-authored-v17-mechanics-baseline.fixture.json','utf8')).projection;
baseline.action.seasonal.summer.push({kind:'modifyStat',stat:'manners',delta:-1});
baseline.action.seasonal.winter.push({kind:'modifyStat',stat:'reason',delta:-1});
const source=JSON.parse(readFileSync('content/guard-authored-copy-v17.fixture.json','utf8'));
const audit=JSON.parse(readFileSync('content/guard-authored-v17-binding-audit.fixture.json','utf8'));
const packFiles=['guard-access.json','guard-career.json','guard-city.json','guard-cross-system.json','guard-relationship.json','guard-routes.json'];
const packs=packFiles.map(name=>JSON.parse(readFileSync('content/packs/'+name,'utf8')));

function project(){
 const shift=defs.actions.find((x:any)=>x.id==='guard.shift');
 return {
  producerHead:'89030816f07be16ab5071ebb9af859fc3c756115',
  action:{
   id:shift.id,cost:shift.cost,conditions:shift.conditions,effects:shift.effects,mode:shift.mode,wage:shift.wage,seasonal:shift.seasonal,
   scenes:shift.scenes.map((s:any)=>({id:s.id,conditions:s.conditions,media:s.media}))
  },
  career:defs.careers.find((x:any)=>x.id==='guard'),
  relationship:defs.relationships.find((x:any)=>x.id==='guard.partner'),
  items:defs.itemDefinitions.filter((x:any)=>x.id==='guard_badge'||x.id==='guard_sealed_pass'),
  ending:defs.endings.find((x:any)=>x.id==='ending.guard.hard-work'),
  packs:packs.map((p:any)=>({
   id:p.id,capabilities:p.capabilities,
   events:(p.events??[]).map((e:any)=>({
    id:e.id,sourceDomain:e.sourceDomain,trigger:e.trigger,reactionTriggers:e.reactionTriggers,
    priorityClass:e.priorityClass,priority:e.priority,blocking:e.blocking,delivery:e.delivery,
    nightPolicy:e.nightPolicy??null,chance:e.chance??null,cooldownDays:e.cooldownDays,
    variantCooldownDays:e.variantCooldownDays,maxShows:e.maxShows,conditions:e.conditions,
    choices:e.choices.map((c:any)=>({id:c.id,conditions:c.conditions,effects:c.effects}))
   }))
  }))
 };
}
function event(id:string){
 for(const p of packs){const e=(p.events??[]).find((x:any)=>x.id===id);if(e)return e;}
 throw new Error('missing '+id);
}
function localizedEvent(id:string){
 const e=event(id);
 assert.ok(loc['event.'+id+'.title']?.ru?.trim()&&loc['event.'+id+'.title']?.en?.trim(),id+' title');
 for(const v of e.variants){
  const k='event.'+id+'.variant.'+v.id+'.text';
  assert.ok(loc[k]?.ru?.trim()&&loc[k]?.en?.trim(),k);
  assert.equal(loc[k].en,v.text,k+' EN mirrors live prose');
 }
 for(const c of e.choices)for(const suffix of ['label','text']){
  const k='event.'+id+'.choice.'+c.id+'.'+suffix;
  assert.ok(loc[k]?.ru?.trim()&&loc[k]?.en?.trim(),k);
  assert.equal(loc[k].en,c[suffix],k+' EN mirrors live prose');
 }
}
function reload(s:Save){return parseSave(JSON.stringify(s),catalog);}

const preferred:Record<string,string>={
 'guard.career.first-shift':'continue','guard.career.senior':'continue','guard.career.duty-breadth':'record',
 'guard.career.veteran-ready':'record','guard.career.choose-route':'defer','guard.career.choose-major-case':'defer',
 'guard.career.outcome-ready':'continue','guard.city.dispute':'record-both-sides','guard.city.crowd-pressure':'open-lane',
 'guard.city.suspicious-pass':'record-discrepancy','guard.city.poverty-response':'route-to-shelter','guard.city.formal-report':'write-report',
 'guard.relationship.intro':'professional','guard.relationship.trust':'continue','guard.relationship.conflict-open':'open',
 'guard.relationship.conflict-resolve':'cooperate','guard.relationship.case-support':'accept','guard.access.badge':'take-badge',
 'guard.access.sealed-pass':'take-pass','guard.access.evidence-ledger':'link','guard.routes.reform-ready':'record',
 'guard.routes.network-ready':'record','guard.routes.officer-ready':'record','guard.routes.major-case-ready':'record',
 'guard.cross.tavern-receipt':'record'
};
function choose(e:any,s:Save){
 if(e.id==='guard.crisis.market-gate-pressure'){
  return e.choices.find((c:any)=>c.id==='deescalate-crowd'&&eligible(c.conditions,s,catalog))
    ??e.choices.find((c:any)=>c.id==='defer'&&eligible(c.conditions,s,catalog));
 }
 const wanted=preferred[e.id];
 return (wanted?e.choices.find((c:any)=>c.id===wanted&&eligible(c.conditions,s,catalog)):undefined)
   ??e.choices.find((c:any)=>eligible(c.conditions,s,catalog));
}
function settlePending(state:Save,onPending?:(s:Save,e:any)=>Save){
 let s=state,guard=0;
 while(s.run.pending){
  if(++guard>300)throw new Error('pending loop: '+s.run.pending.eventId);
  const e=catalog.events.find(x=>x.id===s.run.pending!.eventId);
  assert.ok(e,s.run.pending.eventId);
  if(onPending)s=onPending(s,e);
  const c=choose(e,s);assert.ok(c,e.id);
  s=dispatch(s,{type:'choice',id:c.id},catalog);
 }
 return s;
}
function finishNight(state:Save,onPending?:(s:Save,e:any)=>Save){
 let s=dispatch(state,{type:'endDay'},catalog),guard=0;
 while(s.run.flow.night||s.run.pending){
  if(++guard>300)throw new Error('night loop');
  if(s.run.pending){s=settlePending(s,onPending);continue;}
  const phase=s.run.flow.night?.phase;
  if(phase==='LodgingResolution'){s=dispatch(s,{type:'chooseLodging',id:'lodging.street'},catalog);continue;}
  if(phase==='VoluntaryNightChoice'){s=dispatch(s,{type:'chooseNightChoice',id:'night.sleep'},catalog);continue;}
  throw new Error('night stalled at '+phase);
 }
 return s;
}

test('C3-192 authored layer has zero frozen Guard producer-mechanics drift',()=>{
 assert.deepEqual(project(),baseline);
});

test('C3-182..190 all 12 live seasonal scene identities are authored and bilingual',()=>{
 const shift=defs.actions.find((x:any)=>x.id==='guard.shift');
 assert.deepEqual(shift.scenes.map((x:any)=>x.id),[
  'spring.default','spring.property-dispute','spring.road-reopen',
  'summer.default','summer.festival','summer.market-crowd',
  'autumn.default','autumn.cargo-check','autumn.market-records',
  'winter.default','winter.lodging-pressure','winter.closed-quarter'
 ]);
 for(const scene of shift.scenes){
  const k='action.guard.shift.scene.'+scene.id+'.text';
  assert.ok(loc[k]?.ru?.trim()&&loc[k]?.en?.trim(),k);
  assert.equal(loc[k].en,scene.text,k+' EN mirrors live scene');
 }
});

test('C3-191 every live Guard event surface has complete RU/EN localization parity',()=>{
 const ids=packs.flatMap((p:any)=>p.events??[]).map((e:any)=>e.id);
 assert.equal(ids.length,26);
 for(const id of ids)localizedEvent(id);
 const guardLoc=Object.entries(loc).filter(([k]:any)=>k.includes('guard'));
 assert.ok(guardLoc.length>=170);
 assert.equal(guardLoc.some(([,v]:any)=>'conditions' in v||'effects' in v),false);
});

test('C3-188 binds only School facts that frozen Guard actually consumes',()=>{
 assert.equal(source.entries.length,53);
 assert.equal(audit.sourceCount,53);
 assert.equal(audit.liveBoundCount,50);
 assert.equal(audit.authorityUnboundCount,3);
 const unbound=audit.entries.filter((x:any)=>x.status==='UNBOUND_NO_FROZEN_GUARD_CONSUMER').map((x:any)=>x.contentKey).sort();
 assert.deepEqual(unbound,['school.arcana','school.physical','school.rhetoric']);
 const live=JSON.stringify({
  action:defs.actions.find((x:any)=>x.id==='guard.shift'),
  packs
 });
 for(const row of source.entries){
  const status=audit.entries.find((x:any)=>x.contentKey===row.contentKey)?.status;
  if(status==='LIVE_BOUND')assert.ok(live.includes(row.en),row.contentKey+' live EN binding');
  else assert.equal(live.includes(row.en),false,row.contentKey+' must remain unbound');
 }
 const serializedConditions=JSON.stringify(packs.flatMap((p:any)=>p.events??[]).map((e:any)=>e.conditions));
 for(const fact of ['school-rhetoric-ready','school-physical-ready','school-arcana-ready'])assert.doesNotMatch(serializedConditions,new RegExp(fact));
});

test('authored Guard scene and housing-aware poverty variant are deterministic across save/reload on a natural run',()=>{
 let s=started();
 while(calendar(s.run.day).year<2)s=finishNight(s);
 const shift=defs.actions.find((x:any)=>x.id==='guard.shift');
 assert.ok(shift);
 let povertySeen=false;
 let firstSceneReloaded=false;
 const seenSeasons=new Set<string>();

 const onPending=(state:Save,e:any)=>{
  if(e.id==='guard.city.poverty-response'){
   assert.equal(state.run.housingState.current,'street');
   assert.equal(state.run.pending?.variantId,'street-survival');
   const pending=JSON.parse(JSON.stringify(state.run.pending));
   state=reload(state);
   assert.deepEqual(state.run.pending,pending,'poverty pending/variant reload');
   povertySeen=true;
  }
  return state;
 };

 for(let guard=0;guard<80&&!povertySeen;guard++){
  seenSeasons.add(calendar(s.run.day).season);
  s=dispatch(s,{type:'action',id:'guard.shift'},catalog);
  assert.ok(shift.scenes.some((x:any)=>x.text===s.run.lastAction?.text),'lastAction uses authored Guard scene');
  if(!firstSceneReloaded){
   const last=JSON.parse(JSON.stringify(s.run.lastAction));
   s=reload(s);
   assert.deepEqual(s.run.lastAction,last,'authored scene lastAction reload');
   firstSceneReloaded=true;
  }
  s=settlePending(s,onPending);
  if(!povertySeen)s=finishNight(s,onPending);
 }
 assert.ok(firstSceneReloaded);
 assert.ok(povertySeen,'natural street-housing Guard run reaches authored poverty response');
 assert.ok(seenSeasons.has('winter'),'poverty response reached through natural seasonal duty');
});

test('C3-192 authored layer creates no forbidden systems, foreign seams, or new public Guard ending',()=>{
 const serialized=JSON.stringify({packs,action:defs.actions.find((x:any)=>x.id==='guard.shift')});
 assert.doesNotMatch(serialized,/merchant\.(?:shift|result)|palace\.|assassin\.|prostitute\./i);
 assert.deepEqual(defs.endings.filter((x:any)=>x.id.includes('guard')).map((x:any)=>x.id),['ending.guard.hard-work']);
 assert.equal(source.invariants.createsGameplayIds,false);
 assert.equal(source.invariants.changesMechanics,false);
 assert.equal(source.invariants.changesEconomy,false);
 assert.equal(source.invariants.changesEndings,false);
 assert.equal(source.invariants.createsGuardDebtState,false);
 assert.equal(source.invariants.createsMoralityOrCorruptionCurrency,false);
 assert.equal(source.invariants.createsCombatSystem,false);
});
