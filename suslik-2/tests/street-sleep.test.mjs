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
    const result = prepare({nightId:'night-'+max, energyMax:max, committedNightIds:[]});
    assert.equal(result.goldCost,0);
    assert.equal(result.energyOnWake,expected);
    assert.equal(result.energyMaximumUnchanged,max);
    assert.equal(result.musicMode,'normal-sleep');
    assert.equal(result.wakeButton,'Проснуться');
    assert.equal(result.returnScreen,'map');
  }
});
test('committed nights cannot start again', () => {
  const result = prepare({nightId:'2026-1',energyMax:3,committedNightIds:['2026-1']});
  assert.equal(result.kind,'already-committed');
  assert.throws(() => commit(result, {commitNormalNight(){}}));
});
test('only real host performs atomic night commit', () => {
  const t=prepare({nightId:'night-3',energyMax:3,committedNightIds:[]});
  assert.throws(()=>commit(t,{}));
  let count=0;
  const r=commit(t,{commitNormalNight(payload){count++; return payload;}});
  assert.equal(count,1);
  assert.equal(r.sceneId,'street-sleep-result');
  assert.equal(r.energyOnWake,2);
  assert.equal(r.goldCost,0);
  assert.equal(r.secretBranchHook,'slave');
});
