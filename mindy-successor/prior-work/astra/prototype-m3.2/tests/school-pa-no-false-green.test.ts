import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const audit=readFileSync(
  '../../../docs/school-prep/SCHOOL_PA_NO_FALSE_GREEN_AUDIT_v1.md',
  'utf8'
);
const preflight=JSON.parse(
  readFileSync('content/school-public-fact-preflight.fixture.json','utf8')
);
const typed=JSON.parse(
  readFileSync('content/school-typed-progress-exactly-once.fixture.json','utf8')
);
const compatibility=JSON.parse(
  readFileSync('content/school-typed-state-compat.fixture.json','utf8')
);

test('audit explicitly rejects all five false-green accelerator classes named by the task',()=>{
  for(const phrase of [
    'synthetic public fact injection',
    'direct typed counter setup',
    'direct School track-state setup',
    'fixture-only certificate/milestone placeholder',
    'direct `worldFacts` injection'
  ]){
    assert.equal(audit.toLowerCase().includes(phrase.toLowerCase()),true,phrase);
  }
});

test('fixture-only public fact remains visibly synthetic and final authoring slots remain OPEN',()=>{
  assert.equal(preflight.validExample.fixtureOnly,true);
  assert.match(preflight.validExample.publishPublicFactId,/^school\.fixture\.public\./);
  for(const slot of preflight.authoringSlots){
    assert.equal(slot.finalPublicFactId,null);
    assert.equal(slot.privateTrigger,null);
    assert.equal(slot.status,'OPEN');
  }
});

test('direct counter and track-state fixtures are QA evidence rather than product pass proof',()=>{
  assert.equal(typed.entries.length,8);
  assert.equal(Object.keys(compatibility.defaultSchoolProgression.tracks).length,8);
  assert.match(audit,/Directly assigning or incrementing a fixture counter does not prove/i);
  assert.match(audit,/A prebuilt track map is not evidence that a player/i);
});

test('PA08 green requires authored School publication rather than direct fact injection',()=>{
  assert.match(
    audit,
    /real School progression -> authored School publication -> persisted public fact -> same-boundary Lumber\/relationship continuation/
  );
});
