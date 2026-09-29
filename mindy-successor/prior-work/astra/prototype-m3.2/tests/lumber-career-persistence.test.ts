import test from 'node:test';
import assert from 'node:assert/strict';
import {dispatch,eligible,parseSave} from '../src/core/engine.ts';
import type {Save} from '../src/core/schema.ts';
import {catalog,created} from './helpers.ts';

function resolvePending(input:Save){
  let s=input;
  let guard=0;
  while(s.run.pending){
    if(++guard>8)throw new Error('Lumber persistence reaction loop');
    const event=catalog.events.find(e=>e.id===s.run.pending!.eventId);
    if(!event)throw new Error(`Missing pending event ${s.run.pending.eventId}`);
    const allowed=s.run.pending.allowedChoiceIds??event.choices.map(c=>c.id);
    const choice=event.choices.find(c=>allowed.includes(c.id)&&eligible(c.conditions,s,catalog));
    if(!choice)throw new Error(`No eligible choice for ${event.id}`);
    s=dispatch(s,{type:'choice',id:choice.id},catalog);
  }
  return s;
}

test('Lumber career stage facts and completed-shift counter survive existing save parse reload',()=>{
  let s=created();
  s=dispatch(s,{type:'action',id:'lumber.shift'},catalog);
  assert.equal(s.run.pending?.eventId,'lumber.career-first-shift');

  s=resolvePending(s);

  const before=s.run.progression.careers.lumber;
  assert.ok(before);
  assert.equal(before.stage,'accepted-hand');
  assert.equal(before.counters.completed_shifts,1);
  assert.ok(before.facts.includes('foreman-noticed-player'));

  const exported=JSON.stringify(s);
  const restored=parseSave(exported,catalog);
  const after=restored.run.progression.careers.lumber;

  assert.deepEqual(after,before);
  assert.equal(after.stage,'accepted-hand');
  assert.equal(after.counters.completed_shifts,1);
  assert.ok(after.facts.includes('foreman-noticed-player'));

  const secondReload=parseSave(JSON.stringify(restored),catalog);
  assert.deepEqual(secondReload.run.progression.careers.lumber,before);
});
