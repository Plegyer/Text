import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const depth=JSON.parse(
  readFileSync('content/ordinary-poverty-localization-depth-v2.fixture.json','utf8')
);
const lookup=JSON.parse(
  readFileSync('content/poverty-depth-render-lookup-v1.fixture.json','utf8')
);
const journal=JSON.parse(
  readFileSync('content/poverty-event-choice-journal-map-v2.fixture.json','utf8')
);

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

test('depth keys are pending-scene presentation keys only',()=>{
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
      entry.fallback.localizationKey,
      /^event..+.variant..+.text$/
    );
  }
});

test('ordinary-poverty Journal refs remain eventId + choiceId only',()=>{
  assert.equal(journal.mappings.length,24);

  for(const mapping of journal.mappings){
    assert.deepEqual(mapping.journalRef,{
      kind:'eventChoice',
      eventId:mapping.eventId,
      choiceId:mapping.choiceId
    });

    const raw=JSON.stringify(mapping.journalRef);
    assert.equal(raw.includes(depthPrefix),false);
    assert.equal(raw.includes('variantId'),false);
    assert.equal(raw.includes('depth'),false);
  }
});

test('no depth key becomes a Save identity field',()=>{
  const lookupRaw=JSON.stringify(lookup);
  const journalRaw=JSON.stringify(journal);

  for(const forbidden of [
    'selectedDepthKey',
    'depthKeyInSave',
    'savedDepthKey',
    'depthCandidateId'
  ]){
    assert.equal(lookupRaw.includes(forbidden),false,forbidden);
    assert.equal(journalRaw.includes(forbidden),false,forbidden);
  }

  assert.equal(depth.invariants.changesSaveState,false);
  assert.equal(lookup.invariants.writesSave,false);
  assert.equal(journal.invariants.createsSaveIdentity,false);
});

test('depth render lookup references no gameplay RNG field',()=>{
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
  assert.equal(lookup.invariants.changesRng,false);
});

test('depth localization remains disjoint from resolved Journal text localization',()=>{
  for(const mapping of journal.mappings){
    assert.ok(mapping.localizationKeys.title.startsWith('event.'));
    assert.ok(mapping.localizationKeys.choiceText.startsWith('event.'));
    assert.equal(
      mapping.localizationKeys.choiceText.startsWith(depthPrefix),
      false
    );
  }

  assert.equal(depth.invariants.presentationOnly,true);
  assert.equal(journal.invariants.renderLocaleAtReadTime,true);
  assert.equal(journal.invariants.replayEffects,false);
});
