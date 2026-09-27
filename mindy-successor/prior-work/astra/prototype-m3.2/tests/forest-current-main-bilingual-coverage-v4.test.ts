import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const definitions=JSON.parse(readFileSync('content/definitions.json','utf8'));
const localization=JSON.parse(readFileSync('content/localization.json','utf8')).strings;
const forestPack=JSON.parse(
  readFileSync('content/packs/forest-result-content-bilingual-v2.json','utf8')
);

function pair(key:string){
  const entry=localization[key];
  assert.ok(entry,'missing localization '+key);
  assert.ok(entry.ru?.trim(),key+' ru');
  assert.ok(entry.en?.trim(),key+' en');
}

test('current Forest activity and shipped route labels have complete RU EN coverage',()=>{
  const activity=definitions.activities.find((entry:any)=>entry.id==='lumber.forest');
  assert.ok(activity);

  pair('activity.lumber.forest.label');

  assert.deepEqual(
    activity.options.map((entry:any)=>entry.id),
    ['forest.route.logging-road','forest.route.old-boundary']
  );

  pair('activityOption.forest.route.logging-road.label');
  pair('activityOption.forest.route.old-boundary.label');

  assert.equal(
    activity.options.some((entry:any)=>/hunter/i.test(entry.id)),
    false
  );
});

test('current Forest result events have complete RU EN title body choice and media alt coverage',()=>{
  const expected=[
    ['forest-result-content-v1.success','success','lumber.forest.success'],
    ['forest-result-content-v1.escape','escape','lumber.forest.escape'],
    ['forest-result-content-v1.failure','failure','lumber.forest.failure']
  ] as const;

  assert.deepEqual(
    forestPack.events.map((entry:any)=>entry.id),
    expected.map(entry=>entry[0])
  );

  for(const [eventId,outcome,resultId] of expected){
    const event=forestPack.events.find((entry:any)=>entry.id===eventId);
    assert.deepEqual(event.reactionTriggers,[{
      kind:'activityResult',
      activity:'lumber.forest',
      outcome,
      result:resultId
    }]);

    pair('event.'+eventId+'.title');
    pair('event.'+eventId+'.variant.default.text');
    pair('event.'+eventId+'.choice.return.label');
    pair('event.'+eventId+'.choice.return.text');
    pair('media.'+eventId+'.alt');

    assert.deepEqual(event.conditions,[]);
    assert.ok(
      event.choices.every((choice:any)=>
        choice.id==='return' &&
        Array.isArray(choice.effects) &&
        choice.effects.length===0
      )
    );
  }
});

test('Forest result IDs exactly match current activity results',()=>{
  const activity=definitions.activities.find((entry:any)=>entry.id==='lumber.forest');
  assert.deepEqual(
    activity.results.map((entry:any)=>[entry.outcome,entry.id]),
    [
      ['success','lumber.forest.success'],
      ['escape','lumber.forest.escape'],
      ['failure','lumber.forest.failure']
    ]
  );
});

test('Lumber Hard Work remains only completed_shifts >= 50 with exact reward',()=>{
  const ending=definitions.endings.find(
    (entry:any)=>entry.id==='ending.lumber.hard-work'
  );
  assert.ok(ending);

  assert.deepEqual(ending.conditions,[{
    kind:'careerCounter',
    career:'lumber',
    counter:'completed_shifts',
    op:'gte',
    value:50
  }]);

  assert.deepEqual(ending.metaRewards,[{
    kind:'hardWork',
    rewardId:'hardWork:lumber',
    career:'lumber'
  }]);
});
