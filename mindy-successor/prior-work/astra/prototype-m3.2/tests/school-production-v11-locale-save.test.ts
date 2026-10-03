import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

import {dispatch,freshSave,parseSave,resolveReactions} from '../src/core/engine.ts';
import {resolveLocalizedText} from '../src/core/localization.ts';
import {catalog} from './helpers.ts';

const localization=JSON.parse(readFileSync('content/localization.json','utf8'));

function ready(){
  const s=freshSave();
  s.run.character.creation.remaining=0;
  s.run.character.creation.allocated={};
  s.run.character.creation.complete=true;
  s.run.character.creation.hardWorkPackagesApplied=true;
  return s;
}

test('C5-116 locale lookup is presentation-only and does not mutate Save',()=>{
  const s=ready();
  const before=JSON.stringify(s);
  const ru=resolveLocalizedText(localization,'school.course.arcana.description','ru','');
  const en=resolveLocalizedText(localization,'school.course.arcana.description','en','');
  assert.ok(ru.includes('Илира Венн'));
  assert.ok(en.includes('Ilyra Venn'));
  assert.notEqual(ru,en);
  assert.equal(JSON.stringify(s),before);
});

test('C5-116 exact Night-study offer identity survives save reload independent of locale',()=>{
  const eventId='school-life-content-v1.night-study.arcana-reason';
  const out=resolveReactions(
    ready(),
    [{kind:'nightChoiceCompleted',choice:'school.night_study.arcana.reason'}],
    catalog
  ).state;
  const queued=out.run.flow.reaction.queued.find(q=>q.eventId===eventId);
  assert.ok(queued);

  const restored=parseSave(JSON.stringify(out),catalog);
  const restoredQueued=restored.run.flow.reaction.queued.find(q=>q.eventId===eventId);
  assert.equal(restoredQueued?.variantId,queued.variantId);
  assert.deepEqual(restoredQueued?.allowedChoiceIds,queued.allowedChoiceIds);

  const before=JSON.stringify(restored);
  const key=`event.${eventId}.variant.default.text`;
  assert.ok(resolveLocalizedText(localization,key,'ru','').trim());
  assert.ok(resolveLocalizedText(localization,key,'en','').trim());
  assert.equal(JSON.stringify(restored),before);
});

test('C5-116 localized School outcome journal ref survives exact Night-study save roundtrip',()=>{
  const eventId='school-life-content-v1.night-study.arcana-reason';
  let s=resolveReactions(
    ready(),
    [{kind:'nightChoiceCompleted',choice:'school.night_study.arcana.reason'}],
    catalog
  ).state;
  const offer=s.run.flow.reaction.queued.find(q=>q.eventId===eventId);
  assert.ok(offer);
  s=dispatch(s,{type:'openOffer',id:offer.instanceId},catalog);
  s=dispatch(s,{type:'choice',id:'continue'},catalog);

  const ref=s.run.historyState.journalRefs.at(-1);
  assert.deepEqual(ref,{kind:'eventChoice',eventId,choiceId:'continue'});
  const fallback=s.run.historyState.journal.at(-1)??'';
  const key=`event.${eventId}.choice.continue.text`;
  assert.ok(resolveLocalizedText(localization,key,'ru',fallback).includes('Ночная учёба завершена'));
  assert.ok(resolveLocalizedText(localization,key,'en',fallback).includes('Night study is complete'));

  const restored=parseSave(JSON.stringify(s),catalog);
  assert.deepEqual(restored.run.historyState.journalRefs.at(-1),ref);
});
