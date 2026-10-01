import test from 'node:test';
import assert from 'node:assert/strict';

import {dispatch} from '../src/core/engine.ts';
import type {Save} from '../src/core/schema.ts';
import {catalog,started} from './helpers.ts';

function recognizedHunter():Save{
  const s=started();
  s.run.progression.careers.hunter={
    stage:'recognized-hunter',
    counters:{completed_shifts:8},
    choices:{},
    facts:['first-shift-complete','tracker-ready','recognized-ready','expedition-qualified'],
    shifts:8
  };
  return s;
}

test('C5-163 real Field Craft Night-study remains useful School progress but cannot invent the Hunter field-notes condition',()=>{
  let s=recognizedHunter();
  const moneyBefore=s.run.resources.money;

  s=dispatch(s,{type:'endDay'},catalog);
  while(s.run.pending){
    const event=catalog.events.find(e=>e.id===s.run.pending!.eventId);
    assert.ok(event);
    const choice=event.choices[0];
    assert.ok(choice);
    s=dispatch(s,{type:'choice',id:choice.id},catalog);
  }

  assert.equal(s.run.flow.night?.phase,'LodgingResolution');
  s=dispatch(s,{type:'chooseLodging',id:'lodging.street'},catalog);
  while(s.run.pending){
    const event=catalog.events.find(e=>e.id===s.run.pending!.eventId);
    assert.ok(event);
    const choice=event.choices[0];
    assert.ok(choice);
    s=dispatch(s,{type:'choice',id:choice.id},catalog);
  }
  assert.equal(s.run.flow.night?.phase,'VoluntaryNightChoice');

  s=dispatch(s,{type:'chooseNightChoice',id:'school.night_study.field_craft.wits'},catalog);

  assert.equal(
    s.run.progression.school.tracks['school.track.field_craft']?.counters.night_study_sessions,
    1
  );
  assert.equal(
    s.run.progression.school.tracks['school.track.field_craft']?.counters.lessons_completed??0,
    0
  );
  assert.equal(s.run.flags['school.enrolled']??false,false);
  assert.equal(s.run.progression.worldFacts.includes('forest.school-field-notes'),false);
  assert.equal(s.run.progression.careers.hunter.facts.includes('school-field-craft-ready'),false);
  assert.equal(s.run.pending,null);
  assert.equal(s.run.resources.money,moneyBefore);
});
