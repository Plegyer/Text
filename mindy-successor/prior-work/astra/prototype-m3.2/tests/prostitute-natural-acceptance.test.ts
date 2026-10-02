import test from 'node:test';
import assert from 'node:assert/strict';

import {actionAvailable,calendar,dispatch,eligible,parseSave} from '../src/core/engine.ts';
import type {Save} from '../src/core/schema.ts';
import {catalog,started} from './helpers.ts';

const preferred:Record<string,string>={
  'prostitute.career.first-shift':'continue',
  'prostitute.career.season-spring':'record',
  'prostitute.career.season-summer':'record',
  'prostitute.career.season-autumn':'record',
  'prostitute.career.season-winter':'record',
  'prostitute.career.seasonal-breadth':'record',
  'prostitute.career.established':'continue',
  'prostitute.client-flow.intake':'accept',
  'prostitute.client-flow.terms':'record',
  'prostitute.client-flow.boundary-open':'continue',
  'prostitute.client-flow.boundary':'refuse',
  'prostitute.client-flow.result':'respect-refusal',
  'prostitute.client-flow.admin':'record',
  'prostitute.relationship.intro':'professional',
  'prostitute.relationship.trust':'continue',
  'prostitute.relationship.mode-open':'open',
  'prostitute.relationship.mode':'professional-only',
  'prostitute.relationship.conflict-open':'open',
  'prostitute.relationship.conflict-resolve':'cooperate',
  'prostitute.items.formal-attire':'take',
  'prostitute.items.private-room-key':'take',
  'prostitute.items.client-token':'take',
  'prostitute.items.evidence-case':'take',
  'prostitute.routes.veteran-ready':'record',
  'prostitute.routes.house-ready':'record',
  'prostitute.routes.elite-ready':'record',
  'prostitute.routes.network-ready':'record',
  'prostitute.routes.choose':'defer',
  'prostitute.routes.outcome-ready':'continue'
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

function prostituteWorkDay(state:Save,seasons:Set<string>,overrides:Record<string,string>={}){
  seasons.add(calendar(state.run.day).season);
  let s=dispatch(state,{type:'action',id:'prostitute.shift'},catalog);
  s=settlePending(s,overrides);
  return finishNight(s,overrides);
}

test('clean voluntary Prostitute prep run reaches Hard Work through Year-3 fallback, real shifts, four seasons, and refusal-safe client flow',()=>{
  let s=started();
  const action=catalog.definitions.actions.find(a=>a.id==='prostitute.shift');
  assert.ok(action);
  assert.equal(actionAvailable(action,s,catalog),false);

  while(calendar(s.run.day).year<3)s=finishNight(s);
  assert.equal(calendar(s.run.day).year,3);
  assert.equal(actionAvailable(action,s,catalog),true,'Year-3 fallback must unlock Prostitute naturally');

  const seenSeasons=new Set<string>();

  seenSeasons.add(calendar(s.run.day).season);
  s=dispatch(s,{type:'action',id:'prostitute.shift'},catalog);
  assert.equal(s.run.pending?.eventId,'prostitute.career.first-shift');
  const firstVariant=s.run.pending?.variantId;
  s=parseSave(JSON.stringify(s),catalog);
  assert.equal(s.run.pending?.eventId,'prostitute.career.first-shift');
  assert.equal(s.run.pending?.variantId,firstVariant);
  s=settlePending(s);
  assert.equal(s.run.progression.careers.prostitute.stage,'known-professional');
  s=finishNight(s);

  seenSeasons.add(calendar(s.run.day).season);
  s=dispatch(s,{type:'action',id:'prostitute.shift'},catalog);
  assert.equal(s.run.pending?.eventId,'prostitute.client-flow.intake');
  s=parseSave(JSON.stringify(s),catalog);
  assert.equal(s.run.pending?.eventId,'prostitute.client-flow.intake');
  s=resolveOnePending(s);
  assert.equal(s.run.progression.quests['prostitute.client-flow']?.stage,'intake');
  assert.equal(s.run.pending?.eventId,'prostitute.client-flow.terms');
  const termsVariant=s.run.pending?.variantId;
  s=parseSave(JSON.stringify(s),catalog);
  assert.equal(s.run.pending?.eventId,'prostitute.client-flow.terms');
  assert.equal(s.run.pending?.variantId,termsVariant);
  s=settlePending(s);
  assert.equal(s.run.progression.quests['prostitute.client-flow'].stage,'closed');
  assert.equal(s.run.progression.quests['prostitute.client-flow'].choices['boundary-response'],'refused');
  assert.equal(s.run.progression.quests['prostitute.client-flow'].choices['work-result'],'declined');
  s=finishNight(s);

  while((s.run.progression.careers.prostitute?.counters.completed_shifts??0)<50){
    s=prostituteWorkDay(s,seenSeasons);
    if(s.run.progression.careers.prostitute?.counters.completed_shifts===12){
      s=parseSave(JSON.stringify(s),catalog);
    }
  }

  assert.deepEqual([...seenSeasons].sort(),['autumn','spring','summer','winter']);
  const career=s.run.progression.careers.prostitute;
  assert.equal(career.counters.completed_shifts,50);
  assert.equal(career.stage,'established',
    'late route readiness must not force commitment while route selection is deferred');

  for(const fact of [
    'season-spring-worked','season-summer-worked','season-autumn-worked','season-winter-worked',
    'seasonal-breadth-ready','established-ready','client-cycle-complete','admin-cycle-complete',
    'professional-boundary-recorded','client-refusal-recorded','recurring-client-trust-ready',
    'relationship-mode-defined','relationship-conflict-resolved',
    'formal-attire-issued','private-room-key-issued','client-token-issued','evidence-case-issued',
    'veteran-ready','elite-clientele-ready'
  ]){
    assert.ok(career.facts.includes(fact),fact);
  }

  const relationship=s.run.progression.relationships['prostitute.recurring-client'];
  assert.ok(relationship);
  assert.equal(relationship.stage,'route-resolved');
  assert.equal(relationship.choices['relationship-mode'],'professional-only');
  assert.equal(relationship.choices['conflict-response'],'cooperate');

  assert.equal(s.run.resources.inventory.prostitute_formal_attire,1);
  assert.equal(s.run.resources.inventory.prostitute_private_room_key,1);
  assert.equal(s.run.resources.inventory.prostitute_client_token,1);
  assert.equal(s.run.resources.inventory.prostitute_evidence_case,1);

  assert.ok(s.run.endings.eligible.includes('ending.prostitute.hard-work'));
  assert.equal(s.run.status,'active');
  assert.equal(s.run.endings.committed,null);
  assert.equal(s.meta.hardWorkProgress.includes('prostitute'),false);

  s=dispatch(s,{type:'commitEnding',id:'ending.prostitute.hard-work'},catalog);
  assert.equal(s.run.status,'ending_committed');
  assert.equal(s.meta.hardWorkProgress.includes('prostitute'),false);

  s=parseSave(JSON.stringify(s),catalog);
  s=dispatch(s,{type:'completeEnding'},catalog);
  assert.equal(s.run.status,'ended');
  assert.ok(s.meta.completedEndings.includes('ending.prostitute.hard-work'));
  assert.ok(s.meta.hardWorkProgress.includes('prostitute'));

  s=dispatch(s,{type:'newLife'},catalog);
  assert.equal(s.run.status,'active');
  assert.equal(s.run.progression.careers.prostitute,undefined);
  assert.equal(s.run.progression.quests['prostitute.client-flow'],undefined);
  assert.equal(s.run.progression.relationships['prostitute.recurring-client'],undefined);
  assert.ok(s.meta.completedEndings.includes('ending.prostitute.hard-work'));
  assert.ok(s.meta.hardWorkProgress.includes('prostitute'));
});

test('declining recurring-client conflict preserves voluntary ordinary work',()=>{
  let s=started();
  s.run.character.stats.sexuality=55;
  s.run.character.stats.charm=40;
  s.run.character.stats.sociability=35;

  let guard=0;
  while(s.run.progression.relationships['prostitute.recurring-client']?.stage!=='route-resolved'){
    if(++guard>30)throw new Error('recurring-client refusal did not resolve naturally');
    s=dispatch(s,{type:'action',id:'prostitute.shift'},catalog);
    s=settlePending(s,{'prostitute.relationship.conflict-resolve':'decline'});
    if(s.run.progression.relationships['prostitute.recurring-client']?.stage!=='route-resolved'){
      s=finishNight(s,{'prostitute.relationship.conflict-resolve':'decline'});
    }
  }

  const relationship=s.run.progression.relationships['prostitute.recurring-client'];
  assert.ok(relationship);
  assert.equal(relationship.stage,'route-resolved');
  assert.equal(relationship.choices['conflict-response'],'declined');
  assert.ok(relationship.facts.includes('refusal-respected'));

  if(s.run.dayState.energyCurrent<1)s=finishNight(s);
  const action=catalog.definitions.actions.find(a=>a.id==='prostitute.shift');
  assert.ok(action);
  assert.equal(actionAvailable(action,s,catalog),true);
  const before=s.run.progression.careers.prostitute.counters.completed_shifts;
  s=dispatch(s,{type:'action',id:'prostitute.shift'},catalog);
  assert.equal(s.run.progression.careers.prostitute.counters.completed_shifts,before+1);
});

test('optional Prostitute Night continuation uses voluntary NightFlow and adds no forced-night penalty',()=>{
  let s=started();
  s.run.character.stats.sexuality=55;
  s.run.character.stats.charm=40;
  s.run.character.stats.sociability=35;

  let guard=0;
  while(!['professional-trust','mode-open','mode-defined','route-resolved'].includes(
    s.run.progression.relationships['prostitute.recurring-client']?.stage??''
  )){
    if(++guard>20)throw new Error('recurring-client trust did not become Night-eligible');
    s=dispatch(s,{type:'action',id:'prostitute.shift'},catalog);
    s=settlePending(s);
    if(!['professional-trust','mode-open','mode-defined','route-resolved'].includes(
      s.run.progression.relationships['prostitute.recurring-client']?.stage??''
    ))s=finishNight(s);
  }

  if(s.run.pending)s=settlePending(s);
  const beforeDay=s.run.day;
  const beforeMeetings=s.run.progression.relationships['prostitute.recurring-client'].counters['night-meetings']??0;

  s=dispatch(s,{type:'endDay'},catalog);
  assert.equal(s.run.flow.night?.phase,'LodgingResolution');
  s=dispatch(s,{type:'chooseLodging',id:'lodging.normal'},catalog);
  assert.equal(s.run.flow.night?.phase,'VoluntaryNightChoice');
  s=parseSave(JSON.stringify(s),catalog);
  assert.equal(s.run.flow.night?.phase,'VoluntaryNightChoice');

  s=dispatch(s,{type:'chooseNightChoice',id:'prostitute.night.client-followup'},catalog);
  assert.equal(s.run.flow.night,null);
  assert.equal(s.run.day,beforeDay+1);
  assert.ok(s.run.progression.careers.prostitute.facts.includes('night-continuation-seen'));
  assert.equal(
    s.run.progression.relationships['prostitute.recurring-client'].counters['night-meetings'],
    beforeMeetings+1
  );
  assert.equal(s.run.dayState.nextDayModifiers.energyDelta,0);
});
