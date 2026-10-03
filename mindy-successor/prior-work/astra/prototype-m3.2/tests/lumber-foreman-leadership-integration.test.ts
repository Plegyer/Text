import test from 'node:test';
import assert from 'node:assert/strict';
import {applyEffects,dispatch,eligible,resolveReactions} from '../src/core/engine.ts';
import type {Save} from '../src/core/schema.ts';
import {catalog,started} from './helpers.ts';

function establishProfessionalRoute(){
  let s=started();
  s=dispatch(s,{type:'action',id:'lumber.shift'},catalog);
  assert.equal(s.run.pending?.eventId,'lumber.career-first-shift');
  s=dispatch(s,{type:'choice',id:'continue'},catalog);
  assert.equal(s.run.pending?.eventId,'lumber.foreman-notice');
  s=dispatch(s,{type:'choice',id:'professional'},catalog);
  assert.equal(s.run.pending,null);
  assert.equal(s.run.progression.relationships['lumber.foreman'].stage,'route-professional');
  assert.equal(s.run.progression.relationships['lumber.foreman'].choices.route,'professional');
  return s;
}

function publishManagementSignal(input:Save){
  const withFact=applyEffects(input,[
    {kind:'addWorldFact',fact:'lumber.school.management-ready'}
  ],catalog);
  return resolveReactions(withFact,[
    {kind:'worldFactAdded',fact:'lumber.school.management-ready'}
  ],catalog).state;
}

test('Foreman professional route is a required Lumber leadership gate and adds no extra shift',()=>{
  let blocked=publishManagementSignal(started());
  assert.equal(blocked.run.pending,null);
  assert.ok(!blocked.run.endings.eligible.includes('ending.lumber.forewoman'));

  let s=establishProfessionalRoute();
  const shifts=s.run.progression.careers.lumber.counters.completed_shifts;

  s=publishManagementSignal(s);

  assert.equal(s.run.pending?.eventId,'lumber-cross.school-management-return');
  assert.equal(s.run.progression.careers.lumber.counters.completed_shifts,shifts);

  s=dispatch(s,{type:'choice',id:'apply'},catalog);

  const career=s.run.progression.careers.lumber;
  assert.ok(career.facts.includes('management-school-ready'));
  assert.ok(career.facts.includes('forewoman-problem-resolved'));
  assert.equal(career.counters.completed_shifts,shifts);
  assert.equal(s.run.progression.relationships['lumber.foreman'].stage,'route-professional');
  assert.equal(s.run.progression.relationships['lumber.foreman'].choices.route,'professional');
  assert.ok(!s.run.endings.eligible.includes('ending.lumber.forewoman'),
    'D34 forbids Forewoman before trusted-worker / 8 shifts');

  const ending=catalog.definitions.endings.find(e=>e.id==='ending.lumber.forewoman');
  assert.ok(ending);
  s.run.progression.careers.lumber.stage='trusted-worker';
  s.run.progression.careers.lumber.counters.completed_shifts=8;
  assert.equal(eligible(ending.conditions,s,catalog),true);
});
