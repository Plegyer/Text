import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const fixture=JSON.parse(
  readFileSync('content/presentation-one-save-ownership-v2.fixture.json','utf8')
);

test('ownership matrix covers exact merged one-Save presentation order',()=>{
  assert.deepEqual(
    fixture.steps.map((row:any)=>row.step),
    [
      'lumber-result','career-milestone','foreman-opening',
      'school-result','school-blocking-scene','night-lodging',
      'foreman-night','forest-entry','forest-logging-road',
      'lumber-return','hard-work-final-shift','ending-committed',
      'ending-completed','new-run'
    ]
  );
});

test('merged School path explicitly changes owner from lastAction to pendingScene before NightFlow',()=>{
  const school=fixture.steps.find((row:any)=>row.step==='school-result');
  const blocking=fixture.steps.find((row:any)=>row.step==='school-blocking-scene');
  const night=fixture.steps.find((row:any)=>row.step==='night-lodging');
  assert.equal(school.owner,'lastAction');
  assert.equal(school.presentationId,'school/arcana/lesson/default');
  assert.equal(blocking.owner,'pendingScene');
  assert.equal(blocking.presentationId,'location/town/event/base-school/lesson');
  assert.equal(night.owner,'NightFlow');
});

test('pendingScene owns every reactive scene presentation state',()=>{
  const pendingSteps=new Set([
    'career-milestone','foreman-opening','school-blocking-scene',
    'foreman-night','lumber-return'
  ]);
  for(const row of fixture.steps){
    if(pendingSteps.has(row.step))assert.equal(row.owner,'pendingScene',row.step);
  }
});

test('Activity owns both pre-route and selected logging-road route presentation context',()=>{
  for(const id of ['forest-entry','forest-logging-road']){
    const row=fixture.steps.find((x:any)=>x.step===id);
    assert.equal(row.owner,'Activity');
    assert.equal(row.presentationId,'activity/forest/route/default');
  }
});

test('ending lifecycle ownership is distinct for committed and completed states',()=>{
  const committed=fixture.steps.find((x:any)=>x.step==='ending-committed');
  const completed=fixture.steps.find((x:any)=>x.step==='ending-completed');
  const fresh=fixture.steps.find((x:any)=>x.step==='new-run');
  assert.equal(committed.owner,'endingState');
  assert.equal(completed.owner,'RunResult');
  assert.equal(fresh.owner,'NewRunLocation');
});

test('presentation never owns mechanics or interaction blocking through animation timing',()=>{
  assert.equal(fixture.policy.oneLogicalCentralStage,true);
  assert.equal(fixture.policy.presentationOwnsMechanics,false);
  assert.equal(fixture.policy.animationTimingOwnsBlocking,false);
  for(const row of fixture.steps){
    assert.match(row.presentationId,/^[a-z0-9-]+(?:\/[a-z0-9-]+)+$/);
    assert.ok(row.reload);
  }
});
