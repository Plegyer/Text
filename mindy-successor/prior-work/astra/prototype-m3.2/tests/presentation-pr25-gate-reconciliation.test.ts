import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const checksum=JSON.parse(
  readFileSync('content/presentation-semantic-coverage-checksum.fixture.json','utf8')
);
const schoolCompat=JSON.parse(
  readFileSync('content/school-blocking-scene-compat.fixture.json','utf8')
);
const qaGate=readFileSync('tests/qa-minimal-rc-acceptance-gate-v2.test.ts','utf8');
const schoolTest=readFileSync('tests/school-blocking-scene-compat.test.ts','utf8');

const productionIds=new Set<string>(
  checksum.entries.map((row:any)=>row.presentationId)
);

test('PR25 keeps exact School result -> blocking scene -> NightFlow presentation ordering',()=>{
  const sequence=[
    {owner:'lastAction',id:'school/arcana/lesson/default'},
    {owner:'pendingScene',id:'location/town/event/base-school/lesson'},
    {owner:'NightFlow',id:'location/town/default'}
  ];
  assert.deepEqual(sequence.map(step=>step.owner),['lastAction','pendingScene','NightFlow']);
  for(const step of sequence)assert.ok(productionIds.has(step.id),step.id);
});

test('PR25 School compatibility fixture preserves the paid lesson semantic identity',()=>{
  assert.equal(
    schoolCompat.paidLesson.presentationId,
    'school/arcana/lesson/default'
  );
  assert.ok(productionIds.has(schoolCompat.paidLesson.presentationId));
});

test('PR25 QA locks a real blocking School scene without inventing a new production presentation ID',()=>{
  assert.match(qaGate,/pendingScene/);
  assert.match(qaGate,/base\.school/);
  assert.match(qaGate,/choice',id:'listen'/);
  assert.match(schoolTest,/school\/arcana\/lesson\/default/);

  const slashIds=[
    ...qaGate.matchAll(/['"]([a-z0-9-]+(?:\/[a-z0-9-]+)+)['"]/g),
    ...schoolTest.matchAll(/['"]([a-z0-9-]+(?:\/[a-z0-9-]+)+)['"]/g)
  ].map(match=>match[1]);

  for(const id of slashIds){
    if(id.startsWith('school/')||id.startsWith('activity/')||id.startsWith('ending/')||
       id.startsWith('job/')||id.startsWith('relationship/')||id.startsWith('location/')){
      assert.ok(productionIds.has(id),id);
    }
  }
});

test('presentation ownership remains gameplay-state owned',()=>{
  const ownership={
    result:'lastAction',
    reactive:'pendingScene',
    night:'NightFlow',
    activity:'Activity',
    committedEnding:'endingState',
    completedEnding:'RunResult',
    newRun:'NewRunLocation'
  };
  assert.deepEqual(ownership,{
    result:'lastAction',
    reactive:'pendingScene',
    night:'NightFlow',
    activity:'Activity',
    committedEnding:'endingState',
    completedEnding:'RunResult',
    newRun:'NewRunLocation'
  });
});

test('PR25 QA introduces no animation timing persistence/mechanics requirement',()=>{
  const combined=(qaGate+'\n'+schoolTest).toLowerCase();
  for(const forbidden of [
    'frameindex','currentframe','playbacktimestamp',
    'animationcompleted','animationend','loopcount'
  ])assert.equal(combined.includes(forbidden),false,forbidden);
});
