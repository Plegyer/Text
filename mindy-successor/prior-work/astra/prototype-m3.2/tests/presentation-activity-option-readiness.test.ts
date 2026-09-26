import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const fixture=JSON.parse(
  readFileSync('content/presentation-activity-option-readiness.fixture.json','utf8')
);

test('readiness contract covers the six requested future Forest option families',()=>{
  assert.deepEqual(
    new Set(fixture.options.map((row:any)=>row.optionKey)),
    new Set([
      'logging-road',
      'hunter-trail',
      'old-boundary',
      'navigation',
      'physical-obstacle',
      'interpretation-ritual-anomaly'
    ])
  );
  assert.equal(fixture.options.length,6);
});

test('semantic families are stable presentation namespaces, not invented final IDs',()=>{
  const families=fixture.options.map((row:any)=>row.semanticFamily);
  assert.equal(new Set(families).size,families.length);
  for(const row of fixture.options){
    assert.match(
      row.semanticFamily,
      /^activity\/forest\/option\/[a-z0-9]+(?:-[a-z0-9]+)*$/
    );
    assert.equal(row.finalPresentationId,null,row.optionKey);
    assert.equal(row.finalEventId,null,row.optionKey);
    assert.equal(row.lore,null,row.optionKey);
  }
  assert.equal(fixture.policy.finalIdsInvented,false);
  assert.equal(fixture.policy.finalLoreInvented,false);
});

test('all future option families fall back to the shipped Forest route presentation',()=>{
  for(const row of fixture.options){
    assert.equal(row.fallbackId,'activity/forest/route/default',row.optionKey);
  }
  assert.equal(fixture.policy.fallbackId,'activity/forest/route/default');
});

test('readiness metadata contains no gameplay mechanics or thresholds',()=>{
  assert.equal(fixture.policy.gameplayConditionsInvented,false);
  const serialized=JSON.stringify(fixture).toLowerCase();
  for(const forbidden of [
    '"conditions"','"effects"','"threshold"','"energy"',
    '"money"','"rng"','"reward"','"transition"','"factid"'
  ]){
    assert.equal(serialized.includes(forbidden),false,forbidden);
  }
});

test('future option presentation remains blocked on gameplay authoring, not media authoring',()=>{
  assert.equal(fixture.policy.blockerClass,'gameplay-authoring');
  for(const row of fixture.options){
    assert.ok(row.label.trim().length>0,row.optionKey);
    assert.equal(row.fallbackId,'activity/forest/route/default');
  }
});
