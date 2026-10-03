import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

import {actionAvailable,calendar,dispatch,eligible,parseSave} from '../src/core/engine.ts';
import type {Save} from '../src/core/schema.ts';
import {catalog,started} from './helpers.ts';

const defs=JSON.parse(readFileSync('content/definitions.json','utf8'));
const loc=JSON.parse(readFileSync('content/localization.json','utf8')).strings;
const baseline=JSON.parse(readFileSync('content/merchant-authored-v18-frozen-mechanics.fixture.json','utf8'));
baseline.action.seasonal.summer.push({kind:'modifyStat',stat:'wits',delta:-1});
baseline.action.seasonal.winter.push({kind:'modifyStat',stat:'manners',delta:-1});
const source=JSON.parse(readFileSync('content/merchant-authored-copy-v18.fixture.json','utf8'));
const audit=JSON.parse(readFileSync('content/merchant-authored-v18-binding-audit.fixture.json','utf8'));
const packFiles=['merchant-career.json','merchant-cross-system.json','merchant-items.json','merchant-poverty.json','merchant-relationship.json','merchant-routes.json','merchant-trade.json','merchant-crisis.json'];
const packs=packFiles.map(name=>JSON.parse(readFileSync('content/packs/'+name,'utf8')));

function compact<T>(x:T):T{return JSON.parse(JSON.stringify(x));}
function withoutD40SelectedRouteEffects(effects:any[]){
  return (effects??[]).filter((effect:any)=>!(
    effect.kind==='addCareerFact'
    && String(effect.fact??'').startsWith('ending-route-')
    && String(effect.fact??'').endsWith('-selected')
  ));
}

function project(){
 const shift=defs.actions.find((x:any)=>x.id==='merchant.shift');
 const ending={...defs.endings.find((x:any)=>x.id==='ending.merchant.hard-work')};
 delete ending.title;delete ending.description;delete ending.epilogue;
 return compact({
  action:{...shift,scenes:shift.scenes.map((s:any)=>({id:s.id,conditions:s.conditions,media:s.media}))},
  career:defs.careers.find((x:any)=>x.id==='merchant'),
  ending,
  items:(defs.itemDefinitions??[]).filter((x:any)=>String(x.id).startsWith('merchant_')),
  packs:packs.map((p:any,i:number)=>({
   file:packFiles[i],id:p.id,reads:p.reads,writes:p.writes,capabilities:p.capabilities,media:p.media,
   events:(p.events??[]).map((e:any)=>({
    id:e.id,sourceDomain:e.sourceDomain,trigger:e.trigger,reactionTriggers:e.reactionTriggers,
    priorityClass:e.priorityClass,priority:e.priority,blocking:e.blocking,delivery:e.delivery,
    cooldownDays:e.cooldownDays,variantCooldownDays:e.variantCooldownDays,maxShows:e.maxShows,
    conditions:e.conditions,
    variants:(e.variants??[]).map((v:any)=>({id:v.id,conditions:v.conditions,media:v.media})),
    choices:(e.choices??[]).map((c:any)=>({id:c.id,conditions:c.conditions,effects:withoutD40SelectedRouteEffects(c.effects)}))
   }))
  }))
 });
}
function event(id:string){for(const p of packs){const e=(p.events??[]).find((x:any)=>x.id===id);if(e)return e;}throw new Error('missing '+id);}
function localizedEvent(id:string){
 const e=event(id);
 assert.ok(loc['event.'+id+'.title']?.ru?.trim()&&loc['event.'+id+'.title']?.en?.trim(),id+' title');
 assert.equal(loc['event.'+id+'.title'].en,e.title,id+' title EN');
 for(const v of e.variants??[]){const k='event.'+id+'.variant.'+v.id+'.text';assert.ok(loc[k]?.ru?.trim()&&loc[k]?.en?.trim(),k);assert.equal(loc[k].en,v.text,k+' EN');}
 for(const c of e.choices??[])for(const suffix of ['label','text']){const k='event.'+id+'.choice.'+c.id+'.'+suffix;assert.ok(loc[k]?.ru?.trim()&&loc[k]?.en?.trim(),k);assert.equal(loc[k].en,c[suffix],k+' EN');}
}
function reload(s:Save){return parseSave(JSON.stringify(s),catalog);}
function choose(e:any,s:Save){
 const preferred:Record<string,string>={'merchant.career.first-shift':'continue'};
 const wanted=preferred[e.id];
 return (wanted?e.choices.find((c:any)=>c.id===wanted&&eligible(c.conditions,s,catalog)):undefined)??e.choices.find((c:any)=>eligible(c.conditions,s,catalog));
}
function settlePending(state:Save){let s=state,guard=0;while(s.run.pending){if(++guard>100)throw new Error('pending loop');const e=catalog.events.find(x=>x.id===s.run.pending!.eventId);assert.ok(e);const c=choose(e,s);assert.ok(c);s=dispatch(s,{type:'choice',id:c.id},catalog);}return s;}
function finishNight(state:Save){let s=dispatch(state,{type:'endDay'},catalog),guard=0;while(s.run.flow.night||s.run.pending){if(++guard>100)throw new Error('night loop');if(s.run.pending){s=settlePending(s);continue;}const phase=s.run.flow.night?.phase;if(phase==='LodgingResolution'){s=dispatch(s,{type:'chooseLodging',id:'lodging.street'},catalog);continue;}if(phase==='VoluntaryNightChoice'){s=dispatch(s,{type:'chooseNightChoice',id:'night.sleep'},catalog);continue;}throw new Error('night stalled '+phase);}return s;}

test('C3-204 authored layer has zero frozen Merchant producer-mechanics drift',()=>{
 assert.deepEqual(project(),{action:baseline.action,career:baseline.career,ending:baseline.ending,items:baseline.items,packs:baseline.packs});
});

test('C3-194 four frozen Merchant shift scenes are authored and bilingual',()=>{
 const shift=defs.actions.find((x:any)=>x.id==='merchant.shift');
 assert.deepEqual(shift.scenes.map((x:any)=>x.id),['spring.default','summer.default','autumn.default','winter.default']);
 for(const scene of shift.scenes){const k='action.merchant.shift.scene.'+scene.id+'.text';assert.ok(loc[k]?.ru?.trim()&&loc[k]?.en?.trim(),k);assert.equal(loc[k].en,scene.text,k+' EN');}
});

test('C3-203 all 29 live Merchant events have RU/EN localization parity',()=>{
 const ids=packs.flatMap((p:any)=>p.events??[]).map((e:any)=>e.id);
 assert.equal(ids.length,29);
 for(const id of ids)localizedEvent(id);
 assert.ok(Object.keys(loc).filter(k=>k.includes('merchant')).length>=189);
});

test('C3-199 frozen source audit binds 72 entries and leaves only Etiquette/formal terms unbound',()=>{
 assert.equal(source.entries.length,73);assert.equal(audit.sourceCount,73);assert.equal(audit.liveBoundCount,72);assert.equal(audit.authorityUnboundCount,1);
 const unbound=audit.entries.filter((x:any)=>x.status!=='LIVE_BOUND').map((x:any)=>x.contentKey);
 assert.deepEqual(unbound,['school.formal-terms']);
 const live=JSON.stringify({action:defs.actions.find((x:any)=>x.id==='merchant.shift'),ending:defs.endings.find((x:any)=>x.id==='ending.merchant.hard-work'),packs});
 for(const row of source.entries){const status=audit.entries.find((x:any)=>x.contentKey===row.contentKey)?.status;if(status==='LIVE_BOUND')assert.ok(live.includes(row.en),row.contentKey+' live EN');else assert.equal(live.includes(row.en),false,row.contentKey+' unbound');}
 const conditions=JSON.stringify(packs.flatMap((p:any)=>p.events??[]).map((e:any)=>e.conditions));
 assert.doesNotMatch(conditions,/school-etiquette-ready/);
});

test('C3-204 natural Year-2 Merchant shift uses authored scene and preserves scene/pending identity across reload',()=>{
 let s=started();const action=catalog.definitions.actions.find(a=>a.id==='merchant.shift');assert.ok(action);
 while(calendar(s.run.day).year<2)s=finishNight(s);
 assert.equal(actionAvailable(action,s,catalog),true);
 s=dispatch(s,{type:'action',id:'merchant.shift'},catalog);
 const shift=defs.actions.find((x:any)=>x.id==='merchant.shift');
 assert.ok(shift.scenes.some((x:any)=>x.text===s.run.lastAction?.text),'authored live scene');
 const last=compact(s.run.lastAction);const pending=compact(s.run.pending);s=reload(s);
 assert.deepEqual(s.run.lastAction,last,'lastAction reload');assert.deepEqual(s.run.pending,pending,'pending reload');
 assert.equal(s.run.pending?.eventId,'merchant.career.first-shift');
 assert.equal(s.run.pending?.variantId,'default');
 s=settlePending(s);assert.equal(s.run.progression.careers.merchant.stage,'independent-trader');
});

test('C3-204 authored layer adds no future seams, economy subsystem, or public complex Merchant ending',()=>{
 const live=JSON.stringify({action:defs.actions.find((x:any)=>x.id==='merchant.shift'),packs});
 assert.doesNotMatch(live,/palace\.|artist-geisha\.|assassin\.|prostitute\./i);
 assert.deepEqual(defs.endings.filter((x:any)=>x.id.includes('merchant')).map((x:any)=>x.id),['ending.merchant.hard-work','ending.merchant.house','ending.merchant.speculator-smuggler','ending.merchant.patron-of-routes']);
 assert.equal(source.invariants.createsGameplayIds,false);assert.equal(source.invariants.changesMechanics,false);assert.equal(source.invariants.changesEconomy,false);assert.equal(source.invariants.changesEndings,false);
 assert.equal(source.invariants.createsPriceEngine,false);assert.equal(source.invariants.createsInventoryCapacity,false);assert.equal(source.invariants.createsCreditOrDebtSystem,false);assert.equal(source.invariants.createsCrimeOrLawSystem,false);
});
