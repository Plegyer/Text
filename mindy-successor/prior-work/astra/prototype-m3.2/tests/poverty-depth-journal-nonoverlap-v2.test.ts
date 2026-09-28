import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const depth=JSON.parse(
  readFileSync('content/ordinary-poverty-localization-depth-v3.fixture.json','utf8')
);
const lookup=JSON.parse(
  readFileSync('content/poverty-depth-render-lookup-v2.fixture.json','utf8')
);
const localization=JSON.parse(
  readFileSync('content/localization.json','utf8')
).strings;
const engineSource=readFileSync('src/core/engine.ts','utf8');

const packFiles=[
  'poverty-street-production.json',
  'poverty-street-production-v2.json',
  'poverty-cheap-production.json',
  'poverty-cheap-production-v2.json',
  'poverty-recovery-production.json',
  'poverty-pressure-production.json'
];

const packs=packFiles.map(name=>JSON.parse(
  readFileSync('content/packs/'+name,'utf8')
));

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

function journalRef(eventId:string,choiceId:string){
  return {kind:'eventChoice',eventId,choiceId};
}

function renderOutcome(
  ref:{kind:string;eventId:string;choiceId:string},
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

test('current engine keeps resolved Journal identity as eventId + choiceId only',()=>{
  assert.match(
    engineSource,
    /const outcomeRef=\{kind:'eventChoice' as const,eventId:e\.id,choiceId:choice\.id\}/
  );
  assert.match(
    engineSource,
    /historyState\.journalRefs\.push\(outcomeRef\)/
  );
  assert.match(
    engineSource,
    /lastAction=\{[^\n]*outcomeRef/
  );

  for(const pack of packs){
    for(const event of pack.events){
      for(const choice of event.choices){
        const ref=journalRef(event.id,choice.id);
        assert.deepEqual(ref,{
          kind:'eventChoice',
          eventId:event.id,
          choiceId:choice.id
        });
        const raw=JSON.stringify(ref);
        assert.equal(raw.includes('variantId'),false);
        assert.equal(raw.includes('depth'),false);
      }
    }
  }
});

test('locale render changes text only and preserves Journal ref identity',()=>{
  const ref=journalRef(
    'poverty-street-production.helpful-summer',
    'keep-resting'
  );
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
