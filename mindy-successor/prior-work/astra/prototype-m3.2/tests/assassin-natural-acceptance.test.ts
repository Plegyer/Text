import test from 'node:test';
import assert from 'node:assert/strict';

import {actionAvailable,calendar,dispatch,eligible,parseSave} from '../src/core/engine.ts';
import type {Save} from '../src/core/schema.ts';
import {catalog,started} from './helpers.ts';

const preferred:Record<string,string>={
  'assassin.career.first-shift':'continue',
  'assassin.career.season-spring':'record',
  'assassin.career.season-summer':'record',
  'assassin.career.season-autumn':'record',
  'assassin.career.season-winter':'record',
  'assassin.career.seasonal-breadth':'record',
  'assassin.career.trusted-blade':'continue',
  'assassin.career.veteran-ready':'record',
  'assassin.contract.offer':'accept',
  'assassin.contract.intel':'observe',
  'assassin.contract.prep':'standard',
  'assassin.contract.method':'refusal',
  'assassin.contract.resolve':'redirect',
  'assassin.contract.fallout':'record',
  'assassin.contract.close':'close',
  'assassin.relationship.intro':'professional',
  'assassin.relationship.trust':'continue',
  'assassin.relationship.conflict-open':'open',
  'assassin.relationship.conflict-resolve':'cooperate',
  'assassin.relationship.utility':'accept',
  'assassin.items.concealed-toolset':'take',
  'assassin.items.sealed-pass':'take',
  'assassin.items.disguise-kit':'take',
  'assassin.items.evidence-case':'take',
  'assassin.routes.infiltration-qualified':'record',
  'assassin.routes.ghost-ready':'record',
  'assassin.routes.turncoat-ready':'record',
  'assassin.routes.handler-takeover-ready':'record',
  'assassin.routes.refusal-evidence':'record',
  'assassin.routes.choose-practice':'veteran',
  'assassin.routes.choose-network':'veteran',
  'assassin.routes.outcome-ready':'continue',
  'assassin.activity.infiltration-return':'record'
};

function choose(event:any,s:Save,overrides:Record<string,string>={}){
  const wanted=overrides[event.id]??preferred[event.id];
  return (wanted?event.choices.find((c:any)=>c.id===wanted&&eligible(c.conditions,s,catalog)):undefined)
    ??event.choices.find((c:any)=>eligible(c.conditions,s,catalog));
}

function resolveOnePending(state:Save,overrides:Record<string,string>={}){
  const pending=state.run.pending;
  assert.ok(pending);
  const event=catalog.events.find(e=>e.id===pending.eventId);
  assert.ok(event,pending.eventId);
  const c=choose(event,state,overrides);
  assert.ok(c,event.id);
  return dispatch(state,{type:'choice',id:c.id},catalog);
}

function settlePending(state:Save,overrides:Record<string,string>={}){
  let s=state,guard=0;
  while(s.run.pending){
    if(++guard>400)throw new Error('pending loop: '+s.run.pending.eventId);
    s=resolveOnePending(s,overrides);
  }
  return s;
}

function finishNight(state:Save,overrides:Record<string,string>={}){
  let s=dispatch(state,{type:'endDay'},catalog),guard=0;
  while(s.run.flow.night||s.run.pending){
    if(++guard>400)throw new Error('night loop');
    if(s.run.pending){
      s=settlePending(s,overrides);
      continue;
    }
    const phase=s.run.flow.night?.phase;
    if(phase==='LodgingResolution'){
      s=dispatch(s,{type:'chooseLodging',id:'lodging.street'},catalog);
      continue;
    }
    if(phase==='VoluntaryNightChoice'){
      s=dispatch(s,{type:'chooseNightChoice',id:'night.sleep'},catalog);
      continue;
    }
    throw new Error('night stalled at '+phase);
  }
  return s;
}

function assassinWorkDay(state:Save,seasons:Set<string>,overrides:Record<string,string>={}){
  seasons.add(calendar(state.run.day).season);
  let s=dispatch(state,{type:'action',id:'assassin.shift'},catalog);
  s=settlePending(s,overrides);
  return finishNight(s,overrides);
}

test('clean Assassin run exercises Year-3 fallback, lifecycle, four seasons, refusal evidence, and Hard Work naturally',()=>{
  let s=started();
  const action=catalog.definitions.actions.find(a=>a.id==='assassin.shift');
  assert.ok(action);
  assert.equal(actionAvailable(action,s,catalog),false);

  while(calendar(s.run.day).year<3)s=finishNight(s);
  assert.equal(calendar(s.run.day).year,3);
  assert.equal(actionAvailable(action,s,catalog),true,'Year-3 fallback must unlock Assassin naturally');

  const seenSeasons=new Set<string>();

  seenSeasons.add(calendar(s.run.day).season);
  s=dispatch(s,{type:'action',id:'assassin.shift'},catalog);
  assert.equal(s.run.pending?.eventId,'assassin.career.first-shift');
  const firstVariant=s.run.pending?.variantId;
  s=parseSave(JSON.stringify(s),catalog);
  assert.equal(s.run.pending?.eventId,'assassin.career.first-shift');
  assert.equal(s.run.pending?.variantId,firstVariant);
  s=settlePending(s);
  assert.equal(s.run.progression.careers.assassin.stage,'operative');
  s=finishNight(s);

  // The next real shift exposes the optional contract; save/reload preserves
  // both the offer and the next deterministic lifecycle scene.
  seenSeasons.add(calendar(s.run.day).season);
  s=dispatch(s,{type:'action',id:'assassin.shift'},catalog);
  assert.equal(s.run.pending?.eventId,'assassin.contract.offer');
  s=parseSave(JSON.stringify(s),catalog);
  assert.equal(s.run.pending?.eventId,'assassin.contract.offer');
  s=resolveOnePending(s);
  assert.equal(s.run.progression.quests['assassin.contract']?.stage,'offered');
  assert.equal(s.run.pending?.eventId,'assassin.contract.intel');
  const intelVariant=s.run.pending?.variantId;
  s=parseSave(JSON.stringify(s),catalog);
  assert.equal(s.run.pending?.eventId,'assassin.contract.intel');
  assert.equal(s.run.pending?.variantId,intelVariant);
  s=settlePending(s);
  assert.equal(s.run.progression.quests['assassin.contract'].stage,'closed');
  assert.equal(s.run.progression.quests['assassin.contract'].choices.method,'refusal');
  assert.equal(s.run.progression.quests['assassin.contract'].choices.resolution,'redirect');
  s=finishNight(s);

  // First-shift milestone is exactly once.
  seenSeasons.add(calendar(s.run.day).season);
  s=dispatch(s,{type:'action',id:'assassin.shift'},catalog);
  assert.notEqual(s.run.pending?.eventId,'assassin.career.first-shift');
  s=settlePending(s);
  s=finishNight(s);

  while((s.run.progression.careers.assassin?.counters.completed_shifts??0)<50){
    s=assassinWorkDay(s,seenSeasons);
    if(s.run.progression.careers.assassin?.counters.completed_shifts===12){
      s=parseSave(JSON.stringify(s),catalog);
    }
  }

  assert.deepEqual([...seenSeasons].sort(),['autumn','spring','summer','winter']);
  const assassin=s.run.progression.careers.assassin;
  assert.equal(assassin.counters.completed_shifts,50);
  assert.ok(['trusted-blade','outcome-ready'].includes(assassin.stage),
    'Hard Work progress must remain valid regardless of whether the optional Veteran branch has resolved');

  for(const fact of [
    'season-spring-worked','season-summer-worked','season-autumn-worked','season-winter-worked',
    'seasonal-breadth-ready','veteran-ready','contract-cycle-complete',
    'handler-trust-ready','relationship-conflict-resolved',
    'concealed-toolset-issued','sealed-pass-issued','disguise-kit-issued','evidence-case-issued',
    'infiltration-qualified','turncoat-ready','refusal-chain-evidence'
  ]){
    assert.ok(assassin.facts.includes(fact),fact);
  }

  const handler=s.run.progression.relationships['assassin.handler'];
  assert.ok(handler);
  assert.equal(handler.stage,'route-resolved');
  assert.equal(handler.choices['conflict-response'],'cooperate');
  assert.equal(handler.choices['utility-response'],'accepted');

  assert.equal(s.run.resources.inventory.assassin_concealed_toolset,1);
  assert.equal(s.run.resources.inventory.assassin_sealed_pass,1);
  assert.equal(s.run.resources.inventory.assassin_disguise_kit,1);
  assert.equal(s.run.resources.inventory.assassin_evidence_case,1);

  assert.ok(s.run.endings.eligible.includes('ending.assassin.hard-work'));
  assert.equal(s.run.status,'active');
  assert.equal(s.run.endings.committed,null);
  assert.equal(s.meta.hardWorkProgress.includes('assassin'),false);

  s=dispatch(s,{type:'commitEnding',id:'ending.assassin.hard-work'},catalog);
  assert.equal(s.run.status,'ending_committed');
  assert.equal(s.meta.hardWorkProgress.includes('assassin'),false);

  s=parseSave(JSON.stringify(s),catalog);
  s=dispatch(s,{type:'completeEnding'},catalog);
  assert.equal(s.run.status,'ended');
  assert.ok(s.meta.completedEndings.includes('ending.assassin.hard-work'));
  assert.ok(s.meta.hardWorkProgress.includes('assassin'));

  s=dispatch(s,{type:'newLife'},catalog);
  assert.equal(s.run.status,'active');
  assert.equal(s.run.progression.careers.assassin,undefined);
  assert.equal(s.run.progression.quests['assassin.contract'],undefined);
  assert.equal(s.run.progression.relationships['assassin.handler'],undefined);
  assert.ok(s.meta.completedEndings.includes('ending.assassin.hard-work'));
  assert.ok(s.meta.hardWorkProgress.includes('assassin'));
});

test('declining the handler route preserves ordinary Assassin work',()=>{
  let s=started();
  s.run.character.stats.dexterity=30;
  s.run.character.stats.wits=25;
  s.run.character.stats.reason=20;

  let guard=0;
  while(s.run.progression.relationships['assassin.handler']?.stage!=='route-resolved'){
    if(++guard>30)throw new Error('Assassin handler refusal did not resolve naturally');
    s=dispatch(s,{type:'action',id:'assassin.shift'},catalog);
    s=settlePending(s,{'assassin.relationship.conflict-resolve':'decline'});
    if(s.run.progression.relationships['assassin.handler']?.stage!=='route-resolved'){
      s=finishNight(s,{'assassin.relationship.conflict-resolve':'decline'});
    }
  }

  const handler=s.run.progression.relationships['assassin.handler'];
  assert.ok(handler);
  assert.equal(handler.stage,'route-resolved');
  assert.equal(handler.choices['conflict-response'],'declined');
  assert.ok(handler.facts.includes('refusal-respected'));

  if(s.run.dayState.energyCurrent<1)s=finishNight(s);
  const action=catalog.definitions.actions.find(a=>a.id==='assassin.shift');
  assert.ok(action);
  assert.equal(actionAvailable(action,s,catalog),true);
  const before=s.run.progression.careers.assassin.counters.completed_shifts;
  s=dispatch(s,{type:'action',id:'assassin.shift'},catalog);
  assert.equal(s.run.progression.careers.assassin.counters.completed_shifts,before+1);
});
