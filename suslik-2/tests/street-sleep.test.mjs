import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
const source = fs.readFileSync(new URL('../street-sleep-core.js', import.meta.url), 'utf8');
const sandbox = {};
vm.runInNewContext(source, sandbox);
const {prepare, commit} = sandbox.SuslikStreetSleep;
test('street night is free and wakes with normal max minus one', () => {
  for (const [max, expected] of [[3,2],[5,4],[1,0]]) {
    const result = prepare({nightId:'night-'+max, energyMax:max, groomingCurrent:6, committedNightIds:[]});
    assert.equal(result.goldCost,0);
    assert.equal(result.energyOnWake,expected);
    assert.equal(result.energyMaximumUnchanged,max);
    assert.equal(result.groomingOnWake,5);
    assert.equal(result.groomingDelta,-1);
    assert.equal(result.musicMode,'normal-sleep');
    assert.equal(result.wakeButton,'Проснуться');
    assert.equal(result.returnScreen,'map');
  }
});
test('committed nights cannot start again', () => {
  const result = prepare({nightId:'2026-1',energyMax:3,groomingCurrent:1,committedNightIds:['2026-1']});
  assert.equal(result.kind,'already-committed');
  assert.throws(() => commit(result, {commitNormalNight(){}}));
});
test('only real host performs atomic night commit', () => {
  const t=prepare({nightId:'night-3',energyMax:3,groomingCurrent:1,committedNightIds:[]});
  assert.throws(()=>commit(t,{}));
  let count=0;
  const r=commit(t,{commitNormalNight(payload){count++; return payload;}});
  assert.equal(count,1);
  assert.equal(r.sceneId,'street-sleep-result');
  assert.equal(r.energyOnWake,2);
  assert.equal(r.groomingOnWake,1);
  assert.equal(r.groomingDelta,0);
  assert.equal(r.goldCost,0);
  assert.equal(r.secretBranchHook,'slave');
});

test('street grooming decreases once and never below the universal minimum 1', () => {
  for (const [current, expected, delta] of [[6,5,-1],[1,1,0],[2,1,-1],[100,99,-1]]) {
    const transition = prepare({nightId:'grooming-'+current, energyMax:3, groomingCurrent:current, committedNightIds:[]});
    assert.equal(transition.groomingOnWake, expected);
    assert.equal(transition.groomingDelta, delta);
    assert.equal(transition.groomingMinimum, 1);
    const committed = commit(transition, {commitNormalNight: payload => payload});
    assert.equal(committed.groomingOnWake, expected);
    assert.equal(committed.groomingMinimum, 1);
  }
  // Ignore obsolete configurable-floor input. No gameplay permits a raised minimum.
  const legacy = prepare({nightId:'legacy', energyMax:3, groomingCurrent:6, groomingMinimum:6, committedNightIds:[]});
  assert.equal(legacy.groomingOnWake, 5);
  assert.equal(legacy.groomingMinimum, 1);
  for (const groomingCurrent of [0, -1, 1.5, undefined]) {
    assert.throws(() => prepare({nightId:'bad', energyMax:3, groomingCurrent, committedNightIds:[]}));
  }
});
