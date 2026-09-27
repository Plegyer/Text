import test from 'node:test';
import assert from 'node:assert/strict';

import {catalog,started} from './helpers.ts';
import {dispatch,parseSave} from '../src/core/engine.ts';

test('schema4 save missing progression.school loads an empty typed School state without mutating unrelated progression',()=>{
  const before=started();
  const expected={
    careers:structuredClone(before.run.progression.careers),
    quests:structuredClone(before.run.progression.quests),
    relationships:structuredClone(before.run.progression.relationships),
    worldFacts:structuredClone(before.run.progression.worldFacts),
    money:before.run.resources.money,
    energy:before.run.dayState.energyCurrent
  };

  const raw=JSON.parse(JSON.stringify(before));
  delete raw.run.progression.school;

  const after=parseSave(JSON.stringify(raw),catalog);

  assert.deepEqual(after.run.progression.school,{tracks:{}});
  assert.deepEqual(after.run.progression.careers,expected.careers);
  assert.deepEqual(after.run.progression.quests,expected.quests);
  assert.deepEqual(after.run.progression.relationships,expected.relationships);
  assert.deepEqual(after.run.progression.worldFacts,expected.worldFacts);
  assert.equal(after.run.resources.money,expected.money);
  assert.equal(after.run.dayState.energyCurrent,expected.energy);
});

test('schema4 save missing semantic presentationId keeps mechanical pending/action identity intact',()=>{
  const state=dispatch(started(),{type:'action',id:'lumber.shift'},catalog);

  assert.equal(state.run.flow.pendingScene?.eventId,'lumber.career-first-shift');
  assert.ok(state.run.flow.pendingScene?.presentationId);
  assert.equal(state.run.flow.lastAction?.id,'lumber.shift');
  assert.ok(state.run.flow.lastAction?.presentationId);

  const raw=JSON.parse(JSON.stringify(state));
  const expectedPending={
    eventId:raw.run.flow.pendingScene.eventId,
    variantId:raw.run.flow.pendingScene.variantId,
    allowedChoiceIds:structuredClone(raw.run.flow.pendingScene.allowedChoiceIds)
  };
  const expectedAction={
    id:raw.run.flow.lastAction.id,
    title:raw.run.flow.lastAction.title,
    text:raw.run.flow.lastAction.text,
    media:structuredClone(raw.run.flow.lastAction.media),
    deltas:structuredClone(raw.run.flow.lastAction.deltas)
  };

  delete raw.run.flow.pendingScene.presentationId;
  delete raw.run.flow.lastAction.presentationId;

  const after=parseSave(JSON.stringify(raw),catalog);

  assert.equal(after.run.flow.pendingScene?.presentationId,undefined);
  assert.equal(after.run.flow.lastAction?.presentationId,undefined);

  assert.equal(after.run.flow.pendingScene?.eventId,expectedPending.eventId);
  assert.equal(after.run.flow.pendingScene?.variantId,expectedPending.variantId);
  assert.deepEqual(after.run.flow.pendingScene?.allowedChoiceIds,expectedPending.allowedChoiceIds);

  assert.equal(after.run.flow.lastAction?.id,expectedAction.id);
  assert.equal(after.run.flow.lastAction?.title,expectedAction.title);
  assert.equal(after.run.flow.lastAction?.text,expectedAction.text);
  assert.deepEqual(after.run.flow.lastAction?.media,expectedAction.media);
  assert.deepEqual(after.run.flow.lastAction?.deltas,expectedAction.deltas);

  assert.equal(after.run.progression.careers.lumber?.counters.completed_shifts,1);
  assert.equal(after.run.dayState.energyCurrent,2);
});
