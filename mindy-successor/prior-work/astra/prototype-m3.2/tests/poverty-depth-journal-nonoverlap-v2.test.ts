import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

import {dispatch} from '../src/core/engine.ts';
import {catalog,started} from './helpers.ts';

const depth=JSON.parse(
  readFileSync('content/ordinary-poverty-localization-depth-v3.fixture.json','utf8')
);
const lookup=JSON.parse(
  readFileSync('content/poverty-depth-render-lookup-v2.fixture.json','utf8')
);
const localization=JSON.parse(
  readFileSync('content/localization.json','utf8')
).strings;

const depthPrefix='presentation.poverty.depth.';

function collectKeys(value:any,out:string[]=[]):string[]{
  if(Array.isArray(value)){
    for(const item of value)collectKeys(item,out);
    return out;
  }
  if(value&&typeof value==='object'){
    for(const [key,item] of Object.entries(value)){
      out.push(key);
      collectKeys(item,out);
    }
  }
  return out;
}

function renderOutcome(
  ref:{kind:'eventChoice';eventId:string;choiceId:string},
  locale:'ru'|'en'
){
  const key=`event.${ref.eventId}.choice.${ref.choiceId}.text`;
  return localization[key]?.[locale]??null;
}

test('depth keys remain pending-scene presentation keys only',()=>{
  const keys=Object.keys(depth.strings);
  assert.equal(keys.length,26);

  for(const key of keys){
    assert.ok(key.startsWith(depthPrefix),key);
  }

  for(const entry of lookup.entries){
    for(const key of entry.orderedDepthLocalizationKeys){
      assert.ok(keys.includes(key),key);
    }
    assert.match(
      entry.coreFallbackLocalizationKey,
      /^event\..+\.variant\..+\.text$/
    );
  }
});

test('resolved ordinary-poverty Journal identity stays eventId + choiceId',()=>{
  let state=started();
  state.run.pending={
    eventId:'poverty-street-production.helpful-summer',
    variantId:'default',
    allowedChoiceIds:['take-errand','keep-resting']
  };

  state=dispatch(state,{type:'choice',id:'keep-resting'},catalog);

  const ref=state.run.historyState.journalRefs.at(-1);
  assert.deepEqual(ref,{
    kind:'eventChoice',
    eventId:'poverty-street-production.helpful-summer',
    choiceId:'keep-resting'
  });
  assert.deepEqual(state.run.lastAction?.outcomeRef,ref);

  const raw=JSON.stringify(ref);
  assert.equal(raw.includes('variantId'),false);
  assert.equal(raw.includes('depth'),false);
  assert.equal(raw.includes(depthPrefix),false);
});

test('locale render changes text only and preserves Journal ref identity',()=>{
  const ref={
    kind:'eventChoice' as const,
    eventId:'poverty-street-production.helpful-summer',
    choiceId:'keep-resting'
  };
  const before=JSON.stringify(ref);

  const ru=renderOutcome(ref,'ru');
  const en=renderOutcome(ref,'en');

  assert.ok(ru?.trim());
  assert.ok(en?.trim());
  assert.notEqual(ru,en);
  assert.equal(JSON.stringify(ref),before);
});

test('no depth key becomes Save identity',()=>{
  const raw=JSON.stringify({depth,lookup});

  for(const forbidden of [
    'selectedDepthKey',
    'savedDepthKey',
    'depthKeyInSave',
    'depthCandidateId',
    'journalDepthKey',
    'outcomeDepthKey'
  ]){
    assert.equal(raw.includes(forbidden),false,forbidden);
  }

  for(const entry of lookup.entries){
    assert.equal('selectedDepthKey' in entry,false);
    assert.equal('savedDepthKey' in entry,false);
  }
});

test('depth lookup uses no gameplay RNG field',()=>{
  const structuralKeys=new Set(collectKeys(lookup));

  for(const forbidden of [
    'rng',
    'rngState',
    'gameplayRng',
    'activityRng'
  ]){
    assert.equal(structuralKeys.has(forbidden),false,forbidden);
  }

  const raw=JSON.stringify(lookup);
  assert.equal(raw.includes('run.rng'),false);
  assert.equal(raw.includes('rngState'),false);
  assert.equal(
    lookup.selection.occurrenceSource,
    'run.historyState.eventHistory[eventId].count'
  );
});
