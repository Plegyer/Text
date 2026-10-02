import test from 'node:test';
import assert from 'node:assert/strict';

import {actionAvailable,calendar,dispatch,eligible,parseSave} from '../src/core/engine.ts';
import type {Save} from '../src/core/schema.ts';
import {catalog,started} from './helpers.ts';

const preferred:Record<string,string>={
  'artist-geisha.career.first-shift':'continue',
  'artist-geisha.career.seasonal-breadth':'record',
  'artist-geisha.career.recognized':'continue',
  'artist-geisha.career.choose-route':'defer',
  'artist-geisha.career.outcome-ready':'continue',
  'artist-geisha.season.spring-program':'take-window',
  'artist-geisha.season.summer-evening':'take-window',
  'artist-geisha.season.autumn-festival':'take-window',
  'artist-geisha.season.winter-salon':'take-window',
  'artist-geisha.relationship.intro':'professional',
  'artist-geisha.relationship.trust':'continue',
  'artist-geisha.relationship.conflict-open':'open',
  'artist-geisha.relationship.conflict-resolve':'cooperate',
  'artist-geisha.relationship.utility':'accept',
  'artist-geisha.items.performance_kit':'take',
  'artist-geisha.items.formal_attire':'take',
  'artist-geisha.items.invitation_token':'take',
  'artist-geisha.routes.veteran-ready':'record',
  'artist-geisha.routes.master-ready':'record',
  'artist-geisha.routes.social-breadth':'record',
  'artist-geisha.routes.patron-network-ready':'record',
  'artist-geisha.routes.court-contact':'record',
  'artist-geisha.routes.court-ready':'record'
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
  const choice=choose(event,state,overrides);
  assert.ok(choice,event.id);
  return dispatch(state,{type:'choice',id:choice.id},catalog);
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

function artistWorkDay(state:Save,seasons:Set<string>,overrides:Record<string,string>={}){
  seasons.add(calendar(state.run.day).season);
  let s=dispatch(state,{type:'action',id:'artist-geisha.shift'},catalog);
  s=settlePending(s,overrides);
  return finishNight(s,overrides);
}

test('clean Artist/Geisha run preserves scheduled scenes, advanced readiness, and Hard Work',()=>{
  let s=started();
  const action=catalog.definitions.actions.find(a=>a.id==='artist-geisha.shift');
  assert.ok(action);
  assert.equal(actionAvailable(action,s,catalog),false);

  while(calendar(s.run.day).year<3)s=finishNight(s);
  assert.equal(calendar(s.run.day).year,3);
  assert.equal(actionAvailable(action,s,catalog),true,'Year-3 fallback must unlock Artist/Geisha naturally');

  const seenSeasons=new Set<string>();

  // First real shift is one-shot and its pending scene survives reload exactly.
  seenSeasons.add(calendar(s.run.day).season);
  s=dispatch(s,{type:'action',id:'artist-geisha.shift'},catalog);
  assert.equal(s.run.pending?.eventId,'artist-geisha.career.first-shift');
  const firstVariant=s.run.pending?.variantId;
  s=parseSave(JSON.stringify(s),catalog);
  assert.equal(s.run.pending?.eventId,'artist-geisha.career.first-shift');
  assert.equal(s.run.pending?.variantId,firstVariant);
  // Resolving first-shift advances Novice -> Performer. Production scheduled delivery
  // queues the current-season window on that careerTransition and selects it in
  // the same resolver boundary; do not require an artificial extra day tick.
  s=resolveOnePending(s);
  assert.equal(s.run.progression.careers['artist-geisha'].stage,'performer');
  assert.ok(s.run.pending?.eventId.startsWith('artist-geisha.season.'),
    'Artist seasonal window must schedule naturally from the first career transition');
  const scheduledId=s.run.pending!.eventId;
  const scheduledVariant=s.run.pending!.variantId;
  const scheduledChoices=[...(s.run.pending!.allowedChoiceIds??[])];
  s=parseSave(JSON.stringify(s),catalog);
  assert.equal(s.run.pending?.eventId,scheduledId);
  assert.equal(s.run.pending?.variantId,scheduledVariant);
  assert.deepEqual(s.run.pending?.allowedChoiceIds??[],scheduledChoices);
  s=settlePending(s);

  // The first-shift milestone does not repeat.
  seenSeasons.add(calendar(s.run.day).season);
  s=dispatch(s,{type:'action',id:'artist-geisha.shift'},catalog);
  assert.notEqual(s.run.pending?.eventId,'artist-geisha.career.first-shift');
  s=settlePending(s);
  s=finishNight(s);

  while((s.run.progression.careers['artist-geisha']?.counters.completed_shifts??0)<50){
    s=artistWorkDay(s,seenSeasons);
    if(s.run.progression.careers['artist-geisha']?.counters.completed_shifts===12){
      s=parseSave(JSON.stringify(s),catalog);
    }
  }

  assert.deepEqual([...seenSeasons].sort(),['autumn','spring','summer','winter']);
  const artist=s.run.progression.careers['artist-geisha'];
  assert.equal(artist.counters.completed_shifts,50);
  assert.equal(artist.stage,'recognized-artist',
    'late readiness must not force a route while route selection is deferred');

  for(const fact of [
    'seasonal-breadth-ready',
    'recognized-ready',
    'performance-breadth-ready',
    'spring-window-seen',
    'summer-window-seen',
    'autumn-window-seen',
    'winter-window-seen',
    'mentor-trust-ready',
    'relationship-conflict-resolved',
    'veteran-ready'
  ]){
    assert.ok(artist.facts.includes(fact),fact);
  }

  const mentor=s.run.progression.relationships['artist-geisha.mentor'];
  assert.ok(mentor);
  assert.equal(mentor.stage,'route-resolved');
  assert.equal(mentor.choices['conflict-response'],'cooperate');

  assert.equal(s.run.resources.inventory.artist_performance_kit,1);
  assert.equal(s.run.resources.inventory.artist_formal_attire,1);

  assert.ok(s.run.endings.eligible.includes('ending.artist-geisha.hard-work'));
  assert.equal(s.run.status,'active');
  assert.equal(s.run.endings.committed,null);
  assert.equal(s.meta.hardWorkProgress.includes('artist-geisha'),false,
    'readiness and eligibility must not mutate Meta');

  s=dispatch(s,{type:'commitEnding',id:'ending.artist-geisha.hard-work'},catalog);
  assert.equal(s.run.status,'ending_committed');
  assert.equal(s.meta.hardWorkProgress.includes('artist-geisha'),false,
    'commit alone must not apply Artist/Geisha Hard Work Meta');

  s=parseSave(JSON.stringify(s),catalog);
  assert.equal(s.run.status,'ending_committed');
  s=dispatch(s,{type:'completeEnding'},catalog);
  assert.equal(s.run.status,'ended');
  assert.ok(s.meta.completedEndings.includes('ending.artist-geisha.hard-work'));
  assert.ok(s.meta.hardWorkProgress.includes('artist-geisha'));

  s=parseSave(JSON.stringify(s),catalog);
  s=dispatch(s,{type:'newLife'},catalog);
  assert.equal(s.run.status,'active');
  assert.equal(s.run.progression.careers['artist-geisha'],undefined);
  assert.equal(s.run.progression.relationships['artist-geisha.mentor'],undefined);
  assert.ok(s.meta.completedEndings.includes('ending.artist-geisha.hard-work'));
  assert.ok(s.meta.hardWorkProgress.includes('artist-geisha'));
});

test('declining the mentor route preserves ordinary Artist/Geisha work',()=>{
  let s=started();
  s.run.character.stats.creativity=60;
  s.run.character.stats.manners=60;
  s.run.character.stats.grooming=60;

  let guard=0;
  while(s.run.progression.relationships['artist-geisha.mentor']?.stage!=='route-resolved'){
    if(++guard>20)throw new Error('Artist mentor refusal did not resolve naturally');
    s=dispatch(s,{type:'action',id:'artist-geisha.shift'},catalog);
    s=settlePending(s,{'artist-geisha.relationship.conflict-resolve':'decline'});
    if(s.run.progression.relationships['artist-geisha.mentor']?.stage!=='route-resolved'){
      s=finishNight(s,{'artist-geisha.relationship.conflict-resolve':'decline'});
    }
  }

  const mentor=s.run.progression.relationships['artist-geisha.mentor'];
  assert.ok(mentor);
  assert.equal(mentor.stage,'route-resolved');
  assert.equal(mentor.choices['conflict-response'],'declined');
  assert.ok(mentor.facts.includes('refusal-respected'));

  if(s.run.dayState.energyCurrent<1)s=finishNight(s);
  const action=catalog.definitions.actions.find(a=>a.id==='artist-geisha.shift');
  assert.ok(action);
  assert.equal(actionAvailable(action,s,catalog),true);
  const before=s.run.progression.careers['artist-geisha'].counters.completed_shifts;
  s=dispatch(s,{type:'action',id:'artist-geisha.shift'},catalog);
  assert.equal(s.run.progression.careers['artist-geisha'].counters.completed_shifts,before+1);
});

test('Artist night rehearsal consumes the voluntary Night slot without rewriting NightFlow',()=>{
  let s=started();
  s.run.character.stats.creativity=60;
  s.run.character.stats.manners=60;
  s.run.character.stats.grooming=60;

  s=dispatch(s,{type:'action',id:'artist-geisha.shift'},catalog);
  s=settlePending(s);
  s=dispatch(s,{type:'endDay'},catalog);
  assert.equal(s.run.flow.night?.phase,'LodgingResolution');
  s=dispatch(s,{type:'chooseLodging',id:'lodging.normal'},catalog);
  assert.equal(s.run.flow.night?.phase,'VoluntaryNightChoice');

  const energyBefore=s.run.dayState.energyCurrent;
  const dayBefore=s.run.day;
  s=dispatch(s,{type:'chooseNightChoice',id:'artist-geisha.night.rehearsal'},catalog);
  assert.equal(s.run.pending?.eventId,'artist-geisha.night.rehearsal-scene');
  assert.equal(s.run.day,dayBefore);
  assert.equal(s.run.dayState.energyCurrent,energyBefore);
  assert.equal(s.run.progression.careers['artist-geisha'].counters.night_opportunities,1);

  s=parseSave(JSON.stringify(s),catalog);
  assert.equal(s.run.pending?.eventId,'artist-geisha.night.rehearsal-scene');
  assert.throws(
    ()=>dispatch(s,{type:'chooseNightChoice',id:'school.night_study.arts_and_performance.creativity'},catalog),
    /сцен|ноч|pending|выбор/i
  );

  s=dispatch(s,{type:'choice',id:'finish'},catalog);
  s=settlePending(s);
  assert.equal(s.run.day,dayBefore+1);
  assert.equal(s.run.flow.night,null);
});
