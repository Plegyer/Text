import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

import {calendar,dispatch,eligible,parseSave,resolveReactions} from '../src/core/engine.ts';
import type {Save} from '../src/core/schema.ts';
import {catalog,started} from './helpers.ts';

const defs=JSON.parse(readFileSync('content/definitions.json','utf8'));
const loc=JSON.parse(readFileSync('content/localization.json','utf8')).strings;
const baseline=JSON.parse(readFileSync('content/tavern-authored-v15-mechanics-baseline.fixture.json','utf8')).projection;
baseline.action.seasonal.spring.push({kind:'modifyStat',stat:'grooming',delta:-1});
baseline.action.seasonal.summer.push({kind:'modifyStat',stat:'endurance',delta:-1});
const packFiles=['tavern-career.json','tavern-relationship.json','tavern-night.json','tavern-access.json','tavern-information.json','tavern-housing.json','tavern-activity.json','tavern-crisis.json'];
const packs=packFiles.map(name=>JSON.parse(readFileSync('content/packs/'+name,'utf8')));

function project(){
  const shift=defs.actions.find((x:any)=>x.id==='tavern.shift');
  return {
    producerHead:'38c58ccdaa1d357f189cd640053d0b2a8605b9b4',
    action:{
      id:shift.id,cost:shift.cost,conditions:shift.conditions,effects:shift.effects,mode:shift.mode,wage:shift.wage,seasonal:shift.seasonal,
      scenes:shift.scenes.map((s:any)=>({id:s.id,conditions:s.conditions,media:s.media}))
    },
    packs:packs.map((p:any)=>({
      id:p.id,capabilities:p.capabilities,
      events:p.events.map((e:any)=>({
        id:e.id,sourceDomain:e.sourceDomain,trigger:e.trigger,reactionTriggers:e.reactionTriggers,
        priorityClass:e.priorityClass,priority:e.priority,blocking:e.blocking,delivery:e.delivery,
        nightPolicy:e.nightPolicy??null,chance:e.chance??null,cooldownDays:e.cooldownDays,
        variantCooldownDays:e.variantCooldownDays,maxShows:e.maxShows,conditions:e.conditions,
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
function event(id:string){
  for(const pack of packs){const found=pack.events.find((e:any)=>e.id===id);if(found)return found;}
  throw new Error('missing event '+id);
}
function stateAt(stage:string,season:string){
  const s=started();
  while(calendar(s.run.day).season!==season)s.run.day++;
  s.run.character.stats.charm=45;
  s.run.character.stats.sociability=35;
  s.run.dayState.energyCurrent=3;
  s.run.progression.careers.tavern={
    stage,shifts:0,counters:{completed_shifts:8},choices:{},facts:['first-shift-complete','house-node-ready']
  };
  return s;
}
function localizationForEvent(id:string){
  const e=event(id);
  assert.ok(loc['event.'+id+'.title']?.ru?.trim()&&loc['event.'+id+'.title']?.en?.trim(),id+' title');
  for(const v of e.variants){
    const k='event.'+id+'.variant.'+v.id+'.text';
    assert.ok(loc[k]?.ru?.trim()&&loc[k]?.en?.trim(),k);
  }
  for(const c of e.choices)for(const suffix of ['label','text']){
    const k='event.'+id+'.choice.'+c.id+'.'+suffix;
    assert.ok(loc[k]?.ru?.trim()&&loc[k]?.en?.trim(),k);
  }
}

test('C3-158..167 has zero producer-mechanics drift',()=>{
  assert.deepEqual(project(),baseline);
});

test('C3-158..161 keeps exactly twelve live shift scenes with full seasonal bilingual coverage',()=>{
  const action=defs.actions.find((x:any)=>x.id==='tavern.shift');
  assert.ok(action);
  assert.equal(action.scenes.length,12);
  for(const season of ['spring','summer','autumn','winter']){
    const scenes=action.scenes.filter((s:any)=>s.id.startsWith(season+'.'));
    assert.equal(scenes.length,3,season);
    for(const scene of scenes){
      const k='action.tavern.shift.scene.'+scene.id+'.text';
      assert.ok(loc[k]?.ru?.trim(),k+' RU');
      assert.ok(loc[k]?.en?.trim(),k+' EN');
    }
  }
  const text=action.scenes.map((s:any)=>s.text).join(' ');
  for(const phrase of ['roads reopen','repairs','caravans','Summer','rooms','long route','Autumn','Hunters','festival','supplies','Winter','road']){
    assert.match(text,new RegExp(phrase,'i'),phrase);
  }
});

test('seasonal scene selection is deterministic and survives save/reload',()=>{
  const action=defs.actions.find((x:any)=>x.id==='tavern.shift');
  const expected:{season:string;id:string}[]=[
    {season:'spring',id:'spring.supplies'},
    {season:'summer',id:'summer.deliveries'},
    {season:'autumn',id:'autumn.rumours'},
    {season:'winter',id:'winter.house-node'}
  ];
  for(const row of expected){
    let s=stateAt('house-node',row.season);
    s=dispatch(s,{type:'action',id:'tavern.shift'},catalog);
    assert.equal(s.run.lastAction?.text,action.scenes.find((x:any)=>x.id===row.id)?.text,row.season);
    const snapshot=JSON.parse(JSON.stringify(s.run.lastAction));
    s=reload(s);
    assert.deepEqual(s.run.lastAction,snapshot,row.season+' reload');
  }
});

test('C3-162/C3-164 live room and relationship copy preserves refusal-safe mechanics',()=>{
  for(const id of ['tavern.access.staff-key','tavern.access.guest-ledger','tavern.recurring-traveler.intro','tavern.recurring-traveler.trust','tavern.recurring-traveler.confidentiality','tavern.recurring-traveler.night'])localizationForEvent(id);
  const decline=event('tavern.recurring-traveler.trust').choices.find((c:any)=>c.id==='decline-night');
  assert.match(decline.text,/professional connection continues normally/i);
  assert.ok(decline.effects.some((x:any)=>x.kind==='addRelationshipFact'&&x.fact==='refusal-respected'));
  assert.equal(decline.effects.some((x:any)=>x.kind==='advanceCareer'),false);
  assert.deepEqual(event('tavern.recurring-traveler.confidentiality').reactionTriggers,[
    {kind:'relationshipTransition',relationship:'tavern.recurring-traveler'},
    {kind:'careerFactAdded',career:'tavern',fact:'traveler-rumour-known'},
    {kind:'actionCompleted',action:'tavern.shift'}
  ]);
});

test('C3-163 typed rumour/ledger variant is selected on the frozen-green producer ordering',()=>{
  const e=event('tavern.information.rumour-route');
  assert.deepEqual(e.reactionTriggers,[{kind:'careerFactAdded',career:'tavern',fact:'confidentiality-resolved'}]);
  let s=stateAt('house-node','summer');
  s.run.progression.careers.tavern!.facts.push('traveler-rumour-known','confidentiality-resolved','guest-ledger-evidence-ready');
  s=resolveReactions(s,[{kind:'careerFactAdded',career:'tavern',fact:'confidentiality-resolved'}],catalog).state;
  assert.equal(s.run.pending?.eventId,e.id);
  assert.equal(s.run.pending?.variantId,'ledger-crosscheck');
  const pending=JSON.parse(JSON.stringify(s.run.pending));
  s=reload(s);
  assert.deepEqual(s.run.pending,pending);
  localizationForEvent(e.id);
});

test('C3-165 cheap/street bridge has distinct live copy without housing mechanics writes',()=>{
  const e=event('tavern.housing.meal-in-kind');
  for(const [tier,id] of [['cheap','cheap'],['street','street']] as const){
    const s=stateAt('trusted-worker','spring');
    s.run.housingState.current=tier;
    const eligibleVariants=e.variants.filter((v:any)=>eligible(v.conditions,s,catalog)).sort((a:any,b:any)=>b.conditions.length-a.conditions.length);
    assert.equal(eligibleVariants[0].id,id);
  }
  assert.equal(e.choices.some((c:any)=>c.effects.some((x:any)=>x.kind==='setHousing'||x.kind==='modifyResource')),false);
  localizationForEvent(e.id);
});

test('C3-166 Forest return uses exact Activity result and ledger-backed authored variant',()=>{
  const e=event('tavern.activity.forest-return');
  assert.deepEqual(e.reactionTriggers,[{kind:'activityResult',activity:'lumber.forest',outcome:'success',result:'lumber.forest.success'}]);
  let s=stateAt('house-node','winter');
  s.run.progression.careers.tavern!.facts.push('rumour-route-open','guest-ledger-evidence-ready');
  s=resolveReactions(s,[{kind:'activityResult',activity:'lumber.forest',outcome:'success',result:'lumber.forest.success'}],catalog).state;
  assert.equal(s.run.pending?.eventId,e.id);
  assert.equal(s.run.pending?.variantId,'ledger-context');
  s=dispatch(s,{type:'choice',id:'confirm-rumour'},catalog);
  assert.equal(s.run.progression.careers.tavern?.facts.filter(x=>x==='activity-returned').length,1);
  assert.equal(s.run.progression.careers.tavern?.facts.filter(x=>x==='rumour-confirmed').length,1);
  localizationForEvent(e.id);
});

test('C3-167 crisis/outcome copy preserves ending IDs and rewards',()=>{
  const crisis=event('tavern.crisis.occupancy-supply-confidentiality');
  assert.deepEqual(crisis.choices.map((c:any)=>c.id),['stabilize-house','manage-information','protect-shelter','defer']);
  for(const id of ['tavern.career.veteran-service','tavern.career.innkeeper','tavern.career.information-broker','tavern.career.sanctuary','tavern.career.outcome-ready',crisis.id])localizationForEvent(id);
  const rewards=new Map(defs.endings.filter((x:any)=>/tavern/.test(x.id)).map((x:any)=>[x.id,x.reward]));
  assert.equal(rewards.get('ending.tavern.hard-work'),'tavern.hardwork.compat');
  assert.equal(rewards.get('tavern-stay'),'host');
  assert.equal(rewards.get('tavern-court'),'court');
  assert.equal(rewards.get('tavern-guild'),'mediator');
});

test('all Chat 3 live Tavern authored prose stays role-only and outside Secret Debt',()=>{
  const action=defs.actions.find((x:any)=>x.id==='tavern.shift');
  const raw=JSON.stringify({scenes:action.scenes,events:packs.flatMap((p:any)=>p.events)});
  for(const name of ['Marek','Elian','Bronn','Ren','Silan','Марек','Элиан','Бронн','Рен','Силан']){
    assert.equal(new RegExp('(^|[^\\p{L}])'+name+'([^\\p{L}]|$)','iu').test(raw),false,name);
  }
  assert.doesNotMatch(raw,/secret.?debt|lender|slave/i);
});
