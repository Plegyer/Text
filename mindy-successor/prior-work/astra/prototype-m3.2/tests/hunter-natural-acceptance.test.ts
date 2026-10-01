import test from 'node:test';
import assert from 'node:assert/strict';

import {
  actionAvailable,
  availableActivityActions,
  calendar,
  dispatch,
  eligible,
  parseSave
} from '../src/core/engine.ts';
import type {Save} from '../src/core/schema.ts';
import {catalog,started} from './helpers.ts';

const preferred:Record<string,string>={
  'hunter.career.first-shift':'continue',
  'hunter.career.recognized-hunter':'continue',
  'hunter.career.expedition-qualified':'record',
  'hunter.career.veteran-ready':'record',
  'hunter.career.veteran':'keep-open',
  'hunter.career.master-hunter':'take-route',
  'hunter.career.warden':'keep-open',
  'hunter.career.legend':'keep-open',
  'hunter.career.outcome-ready':'continue',
  'hunter.relationship.intro':'professional',
  'hunter.relationship.trust':'continue',
  'hunter.relationship.conflict-open':'open',
  'hunter.relationship.conflict-resolve':'cooperate',
  'hunter.relationship.companion':'accept',
  'hunter.clues.forest-trail':'record',
  'hunter.clues.lumber-truth':'record',
  'hunter.clues.tavern-rumour':'record',
  'hunter.clues.farm-sample':'record',
  'hunter.school.field-craft':'apply',
  'hunter.items.preserve-return':'preserve',
  'hunter.items.rough-route-return':'record',
  'hunter.routes.master-ready':'record',
  'hunter.routes.warden-ready':'record',
  'hunter.routes.legend-contract':'defer'
};

function settlePending(state:Save){
  let s=state,guard=0;
  while(s.run.pending){
    if(++guard>300)throw new Error('pending loop: '+s.run.pending.eventId);
    const event=catalog.events.find(e=>e.id===s.run.pending!.eventId);
    assert.ok(event,s.run.pending.eventId);
    const wanted=preferred[event.id];
    const choice=(wanted?event.choices.find(c=>c.id===wanted&&eligible(c.conditions,s,catalog)):undefined)
      ??event.choices.find(c=>eligible(c.conditions,s,catalog));
    assert.ok(choice,event.id);
    s=dispatch(s,{type:'choice',id:choice.id},catalog);
  }
  return s;
}

function finishNight(state:Save){
  let s=dispatch(state,{type:'endDay'},catalog),guard=0;
  while(s.run.flow.night||s.run.pending){
    if(++guard>300)throw new Error('night loop');
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
      s=dispatch(s,{type:'chooseNightChoice',id:'night.sleep'},catalog);
      continue;
    }
    throw new Error('night stalled at '+phase);
  }
  return s;
}

function hunterWorkDay(state:Save,seasons:Set<string>){
  seasons.add(calendar(state.run.day).season);
  let s=dispatch(state,{type:'action',id:'hunter.shift'},catalog);
  s=settlePending(s);
  return finishNight(s);
}

function successfulRoughExpedition(state:Save,reloadMidway=false){
  let s=dispatch(state,{type:'enterActivity',id:'hunter.expedition'},catalog);
  assert.equal(s.run.dayState.energyCurrent,0,'expedition entry must consume exactly two Energy from a street-restored day');
  const routeIds=availableActivityActions(s,catalog).map(x=>x.id);
  assert.ok(routeIds.includes('hunter.expedition.rough-route'));
  assert.equal(routeIds.includes('hunter.expedition.rare-route'),false);

  s=dispatch(s,{type:'activityAction',id:'hunter.expedition.rough-route'},catalog);
  s=dispatch(s,{type:'activityAction',id:'hunter.expedition.rough-crossing'},catalog);
  if(reloadMidway){
    s=parseSave(JSON.stringify(s),catalog);
    assert.equal(s.run.flow.activity?.activityId,'hunter.expedition');
    assert.equal(s.run.flow.activity?.checkpoint,'hunter.expedition.rough-crossing');
  }
  s=dispatch(s,{type:'activityAction',id:'hunter.expedition.rough-track'},catalog);
  s=dispatch(s,{type:'activityAction',id:'advance'},catalog);
  s=dispatch(s,{type:'activityAction',id:'advance'},catalog);
  s=settlePending(s);
  assert.equal(s.run.flow.activity,null);
  return s;
}

test('clean Hunter run reaches independent Master/Warden states, Hard Work and New Run persistence naturally',()=>{
  let s=started();
  const action=catalog.definitions.actions.find(a=>a.id==='hunter.shift');
  assert.ok(action);
  assert.equal(actionAvailable(action,s,catalog),false);

  while(calendar(s.run.day).year<2)s=finishNight(s);
  assert.equal(calendar(s.run.day).year,2);
  assert.equal(actionAvailable(action,s,catalog),true,'Year-2 fallback must unlock Hunter without stat/stage injection');

  const seenSeasons=new Set<string>();
  while(
    (s.run.progression.careers.hunter?.counters.completed_shifts??0)<8
    || s.run.resources.money<412
  ){
    s=hunterWorkDay(s,seenSeasons);
  }

  assert.equal(s.run.progression.careers.hunter.stage,'recognized-hunter');
  assert.ok(s.run.progression.careers.hunter.facts.includes('expedition-qualified'));

  // One real School lesson authorizes the already-live field-kit producer.
  s=dispatch(s,{type:'schoolLesson',id:'school.course.field_craft'},catalog);
  s=settlePending(s);
  assert.equal(s.run.progression.school.tracks['school.track.field_craft'].counters.lessons_completed,1);

  s=dispatch(s,{type:'action',id:'forest.collect-field-kit'},catalog);
  s=settlePending(s);
  assert.equal(s.run.resources.inventory.field_preservation_kit,1);
  assert.ok(s.run.progression.careers.hunter.facts.includes('school-field-craft-ready'));

  s=dispatch(s,{type:'action',id:'forest.hunter-outfitter'},catalog);
  s=settlePending(s);
  assert.equal(s.run.resources.inventory.rope_kit,1);
  assert.ok(s.run.progression.worldFacts.includes('forest.hunter-trail-clue'));
  assert.ok(s.run.progression.careers.hunter.facts.includes('forest-clue-known'));

  s=finishNight(s);

  s=successfulRoughExpedition(s,true);
  assert.ok(s.run.progression.careers.hunter.facts.includes('expedition-preserved-sample'));
  assert.ok(s.run.progression.careers.hunter.facts.includes('expedition-rough-route'));
  s=finishNight(s);

  s=successfulRoughExpedition(s,false);
  assert.equal(s.run.progression.careers.hunter.counters.successful_expeditions,2);
  s=finishNight(s);

  while((s.run.progression.careers.hunter?.counters.completed_shifts??0)<50){
    s=hunterWorkDay(s,seenSeasons);
  }

  assert.deepEqual([...seenSeasons].sort(),['autumn','spring','summer','winter']);
  assert.equal(s.run.progression.careers.hunter.counters.completed_shifts,50);
  assert.ok(s.run.progression.careers.hunter.facts.includes('warden-route-ready'),
    'relationship protection + Forest knowledge must produce Warden readiness');
  assert.ok(s.run.progression.careers.hunter.facts.includes('master-route-ready'),
    'season breadth + item-backed successful expeditions must produce Master readiness');
  assert.ok(s.run.progression.careers.hunter.facts.includes('rare-contract-ready'));

  const guide=s.run.progression.relationships['hunter.senior-guide'];
  assert.ok(guide);
  assert.equal(guide.stage,'route-resolved');
  assert.equal(guide.choices['conflict-response'],'cooperate');
  assert.equal(guide.choices['companion-response'],'accepted');

  assert.equal(s.run.progression.careers.hunter.stage,'outcome-ready');
  assert.ok(s.run.endings.eligible.includes('ending.hunter.hard-work'));
  assert.equal(s.run.status,'active');
  assert.equal(s.run.endings.committed,null);

  s=dispatch(s,{type:'commitEnding',id:'ending.hunter.hard-work'},catalog);
  assert.equal(s.run.status,'ending_committed');
  s=dispatch(s,{type:'completeEnding'},catalog);
  assert.equal(s.run.status,'ended');
  assert.ok(s.meta.completedEndings.includes('ending.hunter.hard-work'));
  assert.ok(s.meta.hardWorkProgress.includes('hunter'));

  s=dispatch(s,{type:'newLife'},catalog);
  assert.equal(s.run.status,'active');
  assert.equal(s.run.progression.careers.hunter,undefined);
  assert.ok(s.meta.hardWorkProgress.includes('hunter'));
  assert.ok(s.meta.completedEndings.includes('ending.hunter.hard-work'));
});
