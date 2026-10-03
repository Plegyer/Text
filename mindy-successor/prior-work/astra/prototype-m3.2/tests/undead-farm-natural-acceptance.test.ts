import test from 'node:test';
import assert from 'node:assert/strict';

import {dispatch,eligible,parseSave,calendar} from '../src/core/engine.ts';
import type {Save} from '../src/core/schema.ts';
import {catalog,started} from './helpers.ts';

const preferred:Record<string,string>={
  'undead-farm.career.first-shift':'continue',
  'undead-farm.career.keeper-of-process':'continue',
  'undead-farm.career.research':'continue',
  'undead-farm.career.outcome-ready':'continue',
  'undead-farm.production.first-output':'record',
  'undead-farm.production.prepare-delivery':'hold',
  'undead-farm.sample.kit-issued':'take-kit',
  'undead-farm.production.preserve-sample':'preserve',
  'undead-farm.keeper.intro':'professional',
  'undead-farm.keeper.trust':'accept-night',
  'undead-farm.night.keeper-request':'finish',
  'undead-farm.keeper.request':'decline',
  'undead-farm.school.arcana-research':'apply',
  'undead-farm.crisis.supply-labor-containment':'contain-and-study',
  'undead-farm.activity.forest-return':'compare'
};

function settlePending(state:Save){
  let s=state,guard=0;
  while(s.run.pending){
    if(++guard>160)throw new Error('pending loop: '+s.run.pending.eventId);
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

function finishNight(state:Save,lodging='lodging.street'){
  let s=dispatch(state,{type:'endDay'},catalog),guard=0;
  while(s.run.flow.night||s.run.pending){
    if(++guard>160)throw new Error('night loop');
    if(s.run.pending){
      s=settlePending(s);
      continue;
    }
    const phase=s.run.flow.night?.phase;
    if(phase==='LodgingResolution'){
      s=dispatch(s,{type:'chooseLodging',id:lodging},catalog);
      continue;
    }
    if(phase==='VoluntaryNightChoice'){
      const keeper=catalog.definitions.nightChoices.find(c=>c.id==='undead-farm.night.keeper-request');
      const id=keeper&&eligible(keeper.conditions,s,catalog)?keeper.id:'night.sleep';
      s=dispatch(s,{type:'chooseNightChoice',id},catalog);
      continue;
    }
    throw new Error('night stalled at '+phase);
  }
  return s;
}

function farmShift(state:Save){
  let s=dispatch(state,{type:'action',id:'undead-farm.shift'},catalog);
  return settlePending(s);
}

function farmDay(state:Save,seasons:Set<string>){
  seasons.add(calendar(state.run.day).season);
  let s=farmShift(state);
  return finishNight(s);
}

test('clean Undead Farm run exercises seasons, resources, relationship/Night, School, sample, Activity, crisis and endings naturally',()=>{
  let s=started();
  const seenSeasons=new Set<string>();

  while((s.run.progression.careers['undead-farm']?.counters.completed_shifts??0)<50){
    s=farmDay(s,seenSeasons);
    if(s.run.progression.careers['undead-farm']?.counters.completed_shifts===10){
      s=parseSave(JSON.stringify(s),catalog);
    }
  }

  assert.deepEqual([...seenSeasons].sort(),['autumn','spring','summer','winter']);
  assert.ok((s.run.inventory.farm_produce??0)>0,'ordinary seasonal product must exist');
  assert.equal(s.run.inventory.field_preservation_kit,1);
  assert.equal(s.run.inventory.farm_preserved_specimen,1);
  assert.ok(s.run.progression.careers['undead-farm'].facts.includes('sample-preserved'));
  assert.ok(s.run.endings.eligible.includes('ending.undead-farm.hard-work'));

  const keeper=s.run.progression.relationships['undead-farm.keeper'];
  assert.ok(keeper);
  assert.equal(keeper.stage,'request-resolved');
  assert.equal(keeper.choices['night-response'],'accepted');
  assert.equal(keeper.choices['request-response'],'declined');
  assert.ok(keeper.facts.includes('refusal-respected'));

  for(let lesson=0;lesson<3;lesson++){
    const reserve=lesson===2?550:500;
    while(s.run.resources.money<reserve)s=farmDay(s,seenSeasons);
    s=dispatch(s,{type:'schoolLesson',id:'school.course.arcana'},catalog);
    s=settlePending(s);
    if(lesson<2)s=finishNight(s);
  }

  assert.equal(s.run.progression.school.tracks['school.track.arcana'].counters.lessons_completed,3);
  assert.ok(s.run.progression.careers['undead-farm'].facts.includes('school-research-ready'));
  assert.ok(s.run.progression.careers['undead-farm'].facts.includes('crisis-resolved'));
  assert.ok(s.run.progression.careers['undead-farm'].facts.includes('crisis-research'));
  assert.ok(s.run.progression.careers['undead-farm'].facts.includes('research-ready'));
  assert.ok(s.run.endings.eligible.includes('ending.undead-farm.research-farmer'));

  s=finishNight(s,'lodging.cheap');
  assert.equal(s.run.dayState.energyCurrent,3);
  s=dispatch(s,{type:'action',id:'forest.hunter-outfitter'},catalog);
  s=settlePending(s);
  assert.equal(s.run.resources.inventory.rope_kit,1);

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

  assert.ok(s.run.progression.careers['undead-farm'].facts.includes('activity-source-returned'));
  assert.ok(s.run.progression.careers['undead-farm'].facts.includes('external-anomaly-ready'));
  assert.ok(s.run.endings.eligible.includes('ending.undead-farm.hard-work'));
  assert.ok(s.run.endings.eligible.includes('ending.undead-farm.research-farmer'));
  assert.equal(s.run.status,'active');
  assert.equal(s.run.endings.committed,null);

  s=dispatch(s,{type:'commitEnding',id:'ending.undead-farm.research-farmer'},catalog);
  s=dispatch(s,{type:'completeEnding'},catalog);
  assert.equal(s.run.status,'ended');
  assert.ok(s.meta.completedEndings.includes('ending.undead-farm.research-farmer'));
  assert.deepEqual(s.run.endings.result?.appliedMetaRewardIds,[]);

  s=dispatch(s,{type:'newLife'},catalog);
  assert.equal(s.run.status,'active');
  assert.equal(s.run.progression.careers['undead-farm'],undefined);
  assert.ok(s.meta.completedEndings.includes('ending.undead-farm.research-farmer'));
});
