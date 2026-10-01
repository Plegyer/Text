import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

import {dispatch,eligible,parseSave,resolveReactions} from '../src/core/engine.ts';
import {catalog,started} from './helpers.ts';
import type {Save} from '../src/core/schema.ts';

const defs=JSON.parse(readFileSync('content/definitions.json','utf8'));
const loc=JSON.parse(readFileSync('content/localization.json','utf8')).strings;
const baseline=JSON.parse(readFileSync('content/tavern-authored-v15-mechanics-baseline.fixture.json','utf8')).projection;
const packFiles=['tavern-career.json','tavern-relationship.json','tavern-night.json','tavern-access.json','tavern-information.json','tavern-housing.json','tavern-activity.json','tavern-crisis.json'];
const packs=packFiles.map(name=>JSON.parse(readFileSync('content/packs/'+name,'utf8')));

function project(){
  const shift=defs.actions.find((x:any)=>x.id==='tavern.shift');
  return {
    producerHead:'061190c7324f6942b85d4444de6429c0a87e3ba9',
    action:{id:shift.id,cost:shift.cost,conditions:shift.conditions,effects:shift.effects,mode:shift.mode,wage:shift.wage,seasonal:shift.seasonal},
    packs:packs.map((p:any)=>({
      id:p.id,capabilities:p.capabilities,
      events:p.events.map((e:any)=>({
        id:e.id,trigger:e.trigger,reactionTriggers:e.reactionTriggers,priorityClass:e.priorityClass,priority:e.priority,
        blocking:e.blocking,delivery:e.delivery,nightPolicy:e.nightPolicy??null,chance:e.chance??null,
        cooldownDays:e.cooldownDays,variantCooldownDays:e.variantCooldownDays,maxShows:e.maxShows,conditions:e.conditions,
        choices:e.choices.map((c:any)=>({id:c.id,conditions:c.conditions,effects:c.effects}))
      }))
    })),
    relationshipDefinitions:(defs.relationships??[]).filter((x:any)=>x.id==='tavern.recurring-traveler'),
    nightChoices:(defs.nightChoices??[]).filter((x:any)=>x.id.startsWith('tavern.')),
    itemDefinitions:(defs.itemDefinitions??[]).filter((x:any)=>x.id==='tavern_staff_key'),
    endings:defs.endings.filter((x:any)=>/tavern/.test(x.id)).map((x:any)=>({id:x.id,conditions:x.conditions,reward:x.reward??null,metaRewards:x.metaRewards??null}))
  };
}
function reload(s:Save){return parseSave(JSON.stringify(s),catalog);}
function stateAtStage(stage:string,day:number){
  const s=started();
  s.run.calendar.elapsedDays=day;
  s.run.character.stats.charm=45;
  s.run.character.stats.sociability=35;
  s.run.progression.careers.tavern={stage,counters:{completed_shifts:20},choices:{},facts:['first-shift-complete','house-node-ready','veteran-ready']};
  return s;
}
function packEvent(id:string){
  for(const p of packs){const e=p.events.find((x:any)=>x.id===id);if(e)return e;}
  throw new Error('missing '+id);
}
function assertLocalizedEvent(id:string){
  const e=packEvent(id);
  assert.ok(loc['event.'+id+'.title]?.ru?.trim()&&loc['event.'+id+'.title]?.en?.trim(),id+' title');
  for(const v of e.variants){
    const k='event.'+id+'.variant.'+v.id+'.text';
    assert.ok(loc[k]?.ru?.trim()&&loc[k]?.en?.trim(),k);
  }
  for(const c of e.choices)for(const suffix of ['label','text']){
    const k='event.'+id+'.choice.'+c.id+'.'+suffix;
    assert.ok(loc[k]?.ru?.trim()&&loc[k]?.en?.trim(),k);
  }
}

test('C3-158..167 authored pass has zero Chat-1 mechanics drift',()=>{
  assert.deepEqual(project(),baseline);
});

test('C3-158..161 four live authored shift scenes per season are deterministic and reload-safe',()=>{
  const action=defs.actions.find((x:any)=>x.id==='tavern.shift');
  assert.ok(action);
  for(const [season,day,lateId] of [
    ['spring',0,'spring.new-travelers'],
    ['summer',10,'summer.late-arrivals'],
    ['autumn',20,'autumn.supply-pressure'],
    ['winter',30,'winter.long-stays']
  ] as const){
    const seasonal=action.scenes.filter((x:any)=>x.id.startsWith(season+'.'));
    assert.equal(seasonal.length,4,season);
    for(const scene of seasonal){
      const key='action.tavern.shift.scene.'+scene.id+'.text';
      assert.ok(loc[key]?.ru?.trim(),key+' RU');
      assert.ok(loc[key]?.en?.trim(),key+' EN');
    }
    let s=stateAtStage('outcome-ready',day);
    s=dispatch(s,{type:'action',id:'tavern.shift'},catalog);
    assert.equal(s.run.lastAction?.text,action.scenes.find((x:any)=>x.id===lateId)?.text,season);
    const committed=s.run.lastAction?.text;
    s=reload(s);
    assert.equal(s.run.lastAction?.text,committed,season+' reload');
  }
});

test('C3-162 access and confidentiality are live on exact producer IDs with bilingual copy',()=>{
  for(const id of ['tavern.access.staff-key','tavern.access.guest-ledger','tavern.recurring-traveler.confidentiality'])assertLocalizedEvent(id);
  const key=defs.itemDefinitions.find((x:any)=>x.id==='tavern_staff_key');
  assert.deepEqual(key?.capabilities,['access_guest_rooms_staff']);
  assert.deepEqual(packEvent('tavern.recurring-traveler.confidentiality').choices.map((x:any)=>x.id),['keep-private','share-route-only']);
});

test('C3-163 rumour route prefers ledger-backed authored copy and stays a typed fact route',()=>{
  const e=packEvent('tavern.information.rumour-route');
  assert.ok(e.variants.some((x:any)=>x.id==='ledger-crosscheck'));
  const s=stateAtStage('house-node',10);
  s.run.progression.careers.tavern!.facts.push('traveler-rumour-known','guest-ledger-evidence-ready');
  const variants=e.variants.filter((v:any)=>eligible(v.conditions,s,catalog)).sort((a:any,b:any)=>b.conditions.length-a.conditions.length||a.id.localeCompare(b.id));
  assert.equal(variants[0].id,'ledger-crosscheck');
  assertLocalizedEvent(e.id);
  assert.doesNotMatch(JSON.stringify(e),/modifyResource/i);
});

test('C3-164 refusal preserves professional relationship and career mechanics',()=>{
  const e=packEvent('tavern.recurring-traveler.trust');
  const decline=e.choices.find((x:any)=>x.id==='decline-night');
  assert.ok(decline);
  assert.match(decline.text,/professional connection continues normally/i);
  assert.match(decline.text,/does not erase trust or block the career/i);
  assert.ok(decline.effects.some((x:any)=>x.kind==='addRelationshipFact'&&x.fact==='refusal-respected'));
  assert.equal(decline.effects.some((x:any)=>x.kind==='advanceCareer'||x.kind==='setCareer'),false);
  assertLocalizedEvent(e.id);
});

test('C3-165 cheap and street housing select distinct copy without changing lodging economy',()=>{
  const e=packEvent('tavern.housing.meal-in-kind');
  for(const [tier,id] of [['cheap','cheap'],['street','street']] as const){
    const s=stateAtStage('trusted-worker',0);
    s.run.housingState.current=tier;
    const variants=e.variants.filter((v:any)=>eligible(v.conditions,s,catalog)).sort((a:any,b:any)=>b.conditions.length-a.conditions.length||a.id.localeCompare(b.id));
    assert.equal(variants[0].id,id);
  }
  assertLocalizedEvent(e.id);
  assert.doesNotMatch(JSON.stringify(e.choices),/modifyResource|setHousing|housingTier/i);
});

test('C3-166 Forest return consumes existing Activity result and pending reload is exactly once',()=>{
  const e=packEvent('tavern.activity.forest-return');
  assert.deepEqual(e.reactionTriggers,[{kind:'activityResult',activity:'lumber.forest',outcome:'success',result:'lumber.forest.success'}]);
  let s=stateAtStage('house-node',10);
  s.run.progression.careers.tavern!.facts.push('rumour-route-open','guest-ledger-evidence-ready');
  s=resolveReactions(s,[{kind:'activityResult',activity:'lumber.forest',outcome:'success',result:'lumber.forest.success'}],catalog).state;
  assert.equal(s.run.pending?.eventId,e.id);
  assert.equal(s.run.pending?.variantId,'ledger-context');
  const snapshot=JSON.parse(JSON.stringify(s.run.pending));
  s=reload(s);
  assert.deepEqual(s.run.pending,snapshot);
  s=dispatch(s,{type:'choice',id:'confirm-rumour'},catalog);
  assert.equal(s.run.progression.careers.tavern?.facts.filter(x=>x==='rumour-confirmed').length,1);
  assert.equal(s.run.progression.careers.tavern?.facts.filter(x=>x==='activity-returned').length,1);
  assertLocalizedEvent(e.id);
});

test('C3-167 crisis and late routes keep exact ending mapping while adding authored depth',()=>{
  const e=packEvent('tavern.crisis.occupancy-supply-confidentiality');
  assert.deepEqual(e.choices.map((x:any)=>x.id),['stabilize-house','manage-information','protect-shelter','defer']);
  for(const id of ['tavern.career.veteran-service','tavern.career.innkeeper','tavern.career.information-broker','tavern.career.sanctuary','tavern.career.outcome-ready',e.id])assertLocalizedEvent(id);
  const ids=new Map(defs.endings.filter((x:any)=>/tavern/.test(x.id)).map((x:any)=>[x.id,x.reward]));
  assert.equal(ids.get('ending.tavern.hard-work'),'tavern.hardwork.compat');
  assert.equal(ids.get('tavern-stay'),'host');
  assert.equal(ids.get('tavern-court'),'court');
  assert.equal(ids.get('tavern-guild'),'mediator');
});

test('C3-157..167 live authored prose stays role-only and outside Secret Debt',()=>{
  const touched=packs.flatMap((p:any)=>p.events).filter((e:any)=>e.id.startsWith('tavern.'));
  const raw=JSON.stringify({scenes:defs.actions.find((x:any)=>x.id==='tavern.shift').scenes,events:touched});
  assert.doesNotMatch(raw,/Marek|Elian|Bronn|Ren|Silan|Марек|Элиан|Бронн|Рен|Силан/i);
  assert.doesNotMatch(raw,/secret.?debt|lender|slave/i);
});
