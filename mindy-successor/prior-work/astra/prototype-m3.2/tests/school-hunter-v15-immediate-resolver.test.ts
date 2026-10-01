import test from 'node:test';
import assert from 'node:assert/strict';

import {dispatch,parseSave,resolveReactions} from '../src/core/engine.ts';
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
  s.run.flags['school.enrolled']=true;
  return s;
}

test('C5-162 existing field-kit producer opens exact Hunter School event immediately without another Hunter shift',()=>{
  let s=recognizedHunter();
  const energyBefore=s.run.dayState.energyCurrent;
  const shiftsBefore=s.run.progression.careers.hunter.counters.completed_shifts;

  s=dispatch(s,{type:'action',id:'forest.collect-field-kit'},catalog);

  assert.ok(s.run.progression.worldFacts.includes('forest.school-field-notes'));
  assert.equal(s.run.pending?.eventId,'hunter.school.field-craft');
  assert.equal(s.run.dayState.energyCurrent,energyBefore);
  assert.equal(s.run.progression.careers.hunter.counters.completed_shifts,shiftsBefore);

  s=parseSave(JSON.stringify(s),catalog);
  assert.equal(s.run.pending?.eventId,'hunter.school.field-craft');

  s=dispatch(s,{type:'choice',id:'apply'},catalog);
  assert.ok(s.run.progression.careers.hunter.facts.includes('school-field-craft-ready'));
  assert.equal(s.run.dayState.energyCurrent,energyBefore);
  assert.equal(s.run.progression.careers.hunter.counters.completed_shifts,shiftsBefore);

  const replay=resolveReactions(
    s,
    [{kind:'worldFactAdded',fact:'forest.school-field-notes'}],
    catalog,
    {newEpoch:true}
  ).state;
  assert.equal(replay.run.pending,null);
  assert.equal(replay.run.history['hunter.school.field-craft']?.count,1);
});
