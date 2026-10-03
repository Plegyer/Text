import test from 'node:test';
import assert from 'node:assert/strict';

import {actionAvailable,calendar,dispatch,eligible,parseSave} from '../src/core/engine.ts';
import type {Save} from '../src/core/schema.ts';
import {catalog,started} from './helpers.ts';

const preferred:Record<string,string>={
  'tavern.career.first-shift':'continue',
  'tavern.career.house-node':'continue',
  'tavern.career.veteran-service':'keep-options-open',
  'tavern.career.information-broker':'continue',
  'tavern.career.outcome-ready':'continue',
  'tavern.access.staff-key':'take-key',
  'tavern.access.guest-ledger':'record-ledger',
  'tavern.recurring-traveler.intro':'professional',
  'tavern.recurring-traveler.trust':'accept-night',
  'tavern.recurring-traveler.night':'finish',
  'tavern.recurring-traveler.request':'accept-request',
  'tavern.recurring-traveler.confidentiality':'keep-private',
  'tavern.information.rumour-route':'record-route',
  'tavern.housing.meal-in-kind':'accept-meal',
  'tavern.school.broker':'apply',
  'tavern.activity.forest-return':'confirm-rumour',
};

function settlePending(state:Save){
  let s=state,guard=0;
  while(s.run.pending){
    if(++guard>200)throw new Error('pending loop: '+s.run.pending.eventId);
    const event=catalog.events.find(e=>e.id===s.run.pending!.eventId);
    assert.ok(event,s.run.pending.eventId);
    const wanted=preferred[event.id];
    const crisisChoice=event.id==='tavern.crisis.occupancy-supply-confidentiality'
      ?event.choices.find(c=>c.id==='manage-information'&&eligible(c.conditions,s,catalog))
        ??event.choices.find(c=>c.id==='defer'&&eligible(c.conditions,s,catalog))
      :undefined;
    const choice=crisisChoice
      ??(wanted?event.choices.find(c=>c.id===wanted&&eligible(c.conditions,s,catalog)):undefined)
      ??event.choices.find(c=>eligible(c.conditions,s,catalog));
    assert.ok(choice,event.id);
    s=dispatch(s,{type:'choice',id:choice.id},catalog);
  }
  return s;
}

function finishNight(state:Save){
  let s=dispatch(state,{type:'endDay'},catalog),guard=0;
  while(s.run.flow.night||s.run.pending){
    if(++guard>240)throw new Error('night loop');
    if(s.run.pending){
      s=settlePending(s);
      continue;
    }
    const phase=s.run.flow.night?.phase;
    if(phase==='LodgingResolution'){
      s=dispatch(s,{type:'chooseLodging',id:'lodging.street'},catalog);
      continue;
    }
    if(phase==='VoluntaryNightChoice'){
      const traveler=catalog.definitions.nightChoices.find(c=>c.id==='tavern.night.traveler-request');
      const id=traveler&&eligible(traveler.conditions,s,catalog)?traveler.id:'night.sleep';
      s=dispatch(s,{type:'chooseNightChoice',id},catalog);
      continue;
    }
    throw new Error('night stalled at '+phase);
  }
  return s;
}

function workDay(state:Save,seasons:Set<string>){
  seasons.add(calendar(state.run.day).season);
  let s=dispatch(state,{type:'action',id:'tavern.shift'},catalog);
  s=settlePending(s);
  return finishNight(s);
}

test('clean Tavern run reaches Year-2 unlock, cross-system routes, overlapping endings and New Run persistence naturally',()=>{
  let s=started();
  const action=catalog.definitions.actions.find(a=>a.id==='tavern.shift');
  assert.ok(action);
  assert.equal(actionAvailable(action,s,catalog),false);

  while(calendar(s.run.day).year<2)s=finishNight(s);
  assert.equal(calendar(s.run.day).year,2);
  assert.equal(actionAvailable(action,s,catalog),true,'Year-2 fallback must unlock Tavern without stat injection');

  const seenSeasons=new Set<string>();
  while(
    (s.run.progression.careers.tavern?.counters.completed_shifts??0)<50
    || s.run.resources.money<1300
  ){
    s=workDay(s,seenSeasons);
    if(s.run.progression.careers.tavern?.counters.completed_shifts===10){
      s=parseSave(JSON.stringify(s),catalog);
    }
  }

  assert.deepEqual([...seenSeasons].sort(),['autumn','spring','summer','winter']);
  assert.ok(s.run.progression.careers.tavern);
  assert.equal(s.run.progression.careers.tavern.stage,'house-node');
  assert.ok(s.run.progression.careers.tavern.counters.completed_shifts>=50);
  assert.ok(s.run.endings.eligible.includes('ending.tavern.hard-work'));

  assert.equal(s.run.resources.inventory.tavern_staff_key,1);
  assert.ok(s.run.progression.careers.tavern.facts.includes('guest-ledger-evidence-ready'));
  assert.ok(s.run.progression.careers.tavern.facts.includes('housing-assistance-complete'));
  assert.ok(s.run.progression.careers.tavern.facts.includes('traveler-rumour-known'));
  assert.ok(s.run.progression.careers.tavern.facts.includes('rumour-route-open'));

  const traveler=s.run.progression.relationships['tavern.recurring-traveler'];
  assert.ok(traveler);
  assert.equal(traveler.stage,'confidentiality-resolved');
  assert.equal(traveler.choices['night-response'],'accepted');
  assert.equal(traveler.choices['confidentiality-response'],'keep-private');
  assert.ok(traveler.facts.includes('night-met'));
  assert.ok(traveler.facts.includes('confidentiality-kept'));

  for(let i=0;i<3;i++){
    if(s.run.dayState.energyCurrent<1)s=finishNight(s);
    s=dispatch(s,{type:'schoolLesson',id:'school.course.rhetoric_and_social'},catalog);
    s=settlePending(s);
  }
  assert.equal(s.run.progression.school.tracks['school.track.rhetoric_and_social'].counters.lessons_completed,3);
  assert.ok(s.run.progression.careers.tavern.facts.includes('school-broker-ready'));

  if(s.run.dayState.energyCurrent<1)s=finishNight(s);
  s=dispatch(s,{type:'schoolLesson',id:'school.course.field_craft'},catalog);
  s=settlePending(s);
  s=dispatch(s,{type:'action',id:'forest.collect-field-kit'},catalog);
  s=settlePending(s);
  assert.equal(s.run.resources.inventory.field_preservation_kit,1);

  while(calendar(s.run.day).season!=='winter')s=finishNight(s);
  assert.ok(s.run.dayState.energyCurrent>=2);
  s=dispatch(s,{type:'enterActivity',id:'lumber.forest'},catalog);
  s=dispatch(s,{type:'activityAction',id:'forest.route.logging-road'},catalog);
  s=dispatch(s,{type:'activityAction',id:'forest.challenge.logging-navigation'},catalog);
  s=dispatch(s,{type:'activityAction',id:'forest.challenge.logging-winter-ruts'},catalog);
  s=dispatch(s,{type:'activityAction',id:'forest.challenge.logging-preserve-sample'},catalog);
  s=dispatch(s,{type:'activityAction',id:'advance'},catalog);
  s=dispatch(s,{type:'activityAction',id:'advance'},catalog);
  s=settlePending(s);

  assert.equal(s.run.flow.activity,null);
  assert.ok(s.run.progression.careers.tavern.facts.includes('activity-returned'));
  assert.ok(s.run.progression.careers.tavern.facts.includes('rumour-confirmed'));
  assert.ok(s.run.progression.careers.tavern.facts.includes('crisis-resolved'));
  assert.ok(s.run.progression.careers.tavern.facts.includes('crisis-broker'));
  assert.ok(s.run.progression.careers.tavern.facts.includes('information-broker-ready'));
  assert.equal(s.run.progression.careers.tavern.stage,'outcome-ready');

  for(const ending of ['ending.tavern.hard-work','ending.tavern.information-broker']){
    assert.ok(s.run.endings.eligible.includes(ending),ending);
  }
  assert.equal(s.run.endings.eligible.includes('ending.tavern.sanctuary'),false,
    'information-crisis resolution must not silently become Sanctuary');
  assert.equal(s.run.status,'active');
  assert.equal(s.run.endings.committed,null);

  s=dispatch(s,{type:'commitEnding',id:'ending.tavern.information-broker'},catalog);
  assert.equal(s.run.status,'ending_committed');
  s=dispatch(s,{type:'completeEnding'},catalog);
  assert.equal(s.run.status,'ended');
  assert.ok(s.meta.completedEndings.includes('ending.tavern.information-broker'));
  assert.ok(s.meta.unlocks.includes('knowledge.tavern.broker-index'));
  assert.equal(s.meta.unlocks.includes('court'),false);

  s=dispatch(s,{type:'newLife'},catalog);
  assert.equal(s.run.status,'active');
  assert.equal(s.run.progression.careers.tavern,undefined);
  assert.ok(s.meta.unlocks.includes('knowledge.tavern.broker-index'));
  assert.ok(s.meta.completedEndings.includes('ending.tavern.information-broker'));
  assert.equal(s.meta.completedEndings.includes('tavern-court'),false);
});
