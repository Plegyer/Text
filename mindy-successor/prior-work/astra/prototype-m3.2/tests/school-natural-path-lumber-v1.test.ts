import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {applyEffects,dispatch,freshSave,resolveReactions} from '../src/core/engine.ts';
import type {Catalog,Save} from '../src/core/schema.ts';
import {catalog as shippedCatalog} from './helpers.ts';

const handoff=JSON.parse(
  readFileSync('content/school-to-career-handoff-v1.fixture.json','utf8')
);

function catalog():Catalog{
  return shippedCatalog;
}

function ready():Save{
  const s=freshSave();
  s.run.character.creation.remaining=0;
  s.run.character.creation.allocated={};
  s.run.character.creation.complete=true;
  s.run.flags['story.arrived']=true;
  s.run.resources.money=2_000;
  s.run.dayState.energyCurrent=3;
  return s;
}

function establishProfessionalRoute(input:Save,cat:Catalog):Save{
  let s=dispatch(input,{type:'action',id:'lumber.shift'},cat);
  assert.equal(s.run.flow.pendingScene?.eventId,'lumber.career-first-shift');
  s=dispatch(s,{type:'choice',id:'continue'},cat);
  assert.equal(s.run.flow.pendingScene?.eventId,'lumber.foreman-notice');
  s=dispatch(s,{type:'choice',id:'professional'},cat);
  assert.equal(s.run.progression.relationships['lumber.foreman']?.stage,'route-professional');
  return s;
}

test('C5-09 natural path exposes the missing School management publisher',()=>{
  const cat=catalog();
  let s=establishProfessionalRoute(ready(),cat);
  const shiftsBefore=s.run.progression.careers.lumber.counters.completed_shifts;
  const energyBefore=s.run.dayState.energyCurrent;
  const moneyBefore=s.run.resources.money;

  s=dispatch(s,{type:'schoolLesson',id:'school.course.literacy_and_numbers'},cat);

  assert.equal(
    s.run.progression.school.tracks['school.track.literacy_and_numbers']
      ?.counters.lessons_completed,
    1
  );
  assert.equal(s.run.dayState.energyCurrent,energyBefore-1);
  assert.equal(s.run.resources.money,moneyBefore-300);
  assert.equal(s.run.progression.careers.lumber.counters.completed_shifts,shiftsBefore);
  assert.equal(s.run.progression.worldFacts.includes('lumber.school.management-ready'),false);
  assert.equal(s.run.progression.careers.lumber.facts.includes('management-school-ready'),false);
  assert.equal(s.run.progression.careers.lumber.facts.includes('forewoman-problem-resolved'),false);
  assert.equal(handoff.schoolSource.selectedProviderType,null);
  assert.equal(handoff.schoolSource.selectedThreshold,null);
  assert.equal(handoff.schoolSource.selectedPublisherEventId,null);
});

test('C5-09 existing Lumber seam works after a test-only public-boundary injection',()=>{
  const cat=catalog();
  let s=establishProfessionalRoute(ready(),cat);
  s=dispatch(s,{type:'schoolLesson',id:'school.course.literacy_and_numbers'},cat);
  if(s.run.flow.pendingScene?.eventId==='base.school'){
    s=dispatch(s,{type:'choice',id:'listen'},cat);
  }

  const lessonsBefore=s.run.progression.school.tracks['school.track.literacy_and_numbers']
    ?.counters.lessons_completed;
  const shiftsBefore=s.run.progression.careers.lumber.counters.completed_shifts;
  const energyBefore=s.run.dayState.energyCurrent;
  const moneyBefore=s.run.resources.money;

  s=applyEffects(
    s,
    [{kind:'addWorldFact',fact:'lumber.school.management-ready'}],
    cat
  );
  s=resolveReactions(
    s,
    [{kind:'worldFactAdded',fact:'lumber.school.management-ready'}],
    cat,
    {newEpoch:true}
  ).state;

  assert.equal(s.run.flow.pendingScene?.eventId,'lumber-cross.school-management-return');
  assert.equal(s.run.dayState.energyCurrent,energyBefore);
  assert.equal(s.run.resources.money,moneyBefore);
  assert.equal(
    s.run.progression.school.tracks['school.track.literacy_and_numbers']
      ?.counters.lessons_completed,
    lessonsBefore
  );
  assert.equal(s.run.progression.careers.lumber.counters.completed_shifts,shiftsBefore);

  s=dispatch(s,{type:'choice',id:'apply'},cat);

  assert.ok(s.run.progression.careers.lumber.facts.includes('management-school-ready'));
  assert.ok(s.run.progression.careers.lumber.facts.includes('forewoman-problem-resolved'));
  assert.equal(s.run.dayState.energyCurrent,energyBefore);
  assert.equal(s.run.resources.money,moneyBefore);
  assert.equal(
    s.run.progression.school.tracks['school.track.literacy_and_numbers']
      ?.counters.lessons_completed,
    lessonsBefore
  );
  assert.equal(s.run.progression.careers.lumber.counters.completed_shifts,shiftsBefore);
});
