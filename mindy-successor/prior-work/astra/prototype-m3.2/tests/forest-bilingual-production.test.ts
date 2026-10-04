import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

import {packSchema} from '../src/core/schema.ts';

const pack=packSchema.parse(JSON.parse(readFileSync('content/packs/forest-result-content-bilingual-v2.json','utf8')));
const localization=JSON.parse(readFileSync('content/localization.json','utf8'));
const definitions=JSON.parse(readFileSync('content/definitions.json','utf8'));

const expected=[
  ['forest-result-content-v1.success','success','lumber.forest.success'],
  ['forest-result-content-v1.escape','escape','lumber.forest.escape'],
  ['forest-result-content-v1.failure','failure','lumber.forest.failure']
] as const;

test('Forest bilingual production pack preserves activityResult boundaries with only the exact D41 Warden consumer',()=>{
  assert.equal(pack.id,'forest-result-content-v1');
  assert.deepEqual(pack.capabilities?.reads.activities,['lumber.forest']);
  assert.equal(pack.events.length,3);

  for(const [id,outcome,result] of expected){
    const event=pack.events.find(entry=>entry.id===id);
    assert.ok(event,id);
    assert.deepEqual(event.reactionTriggers,[{
      kind:'activityResult',
      activity:'lumber.forest',
      outcome,
      result
    }]);
    const warden=event.choices.find(choice=>choice.id==='warden-conservation-route');
    if(id==='forest-result-content-v1.success'){
      assert.ok(warden);
      assert.deepEqual(warden.conditions,[
        {kind:'metaUnlock',unlock:'knowledge.hunter.warden-signs',present:true},
        {kind:'worldFact',fact:'reward.hunter.warden-signs.used',present:false}
      ]);
      assert.deepEqual(warden.effects,[{kind:'addWorldFact',fact:'reward.hunter.warden-signs.used'}]);
    }else assert.equal(warden,undefined);
    for(const choice of event.choices.filter(choice=>choice.id!=='warden-conservation-route')){
      assert.deepEqual(choice.effects,[],id+' / '+choice.id);
      assert.deepEqual(choice.conditions,[],id+' / '+choice.id);
    }
  }
});

test('Forest production identities have complete RU and EN localization without localized gameplay IDs',()=>{
  const keys:string[]=[
    'activity.lumber.forest.label',
    'activityOption.forest.route.logging-road.label',
    'activityOption.forest.route.old-boundary.label'
  ];
  for(const event of pack.events){
    keys.push(
      `event.${event.id}.title`,
      `event.${event.id}.variant.default.text`,
      `event.${event.id}.choice.return.label`,
      `event.${event.id}.choice.return.text`,
      `media.${event.id}.alt`
    );
  }

  assert.equal(new Set(keys).size,18);
  for(const key of keys){
    const pair=localization.strings[key];
    assert.equal(typeof pair?.ru,'string',key+'.ru');
    assert.equal(typeof pair?.en,'string',key+'.en');
    assert.ok(pair.ru.trim(),key+'.ru empty');
    assert.ok(pair.en.trim(),key+'.en empty');
  }

  for(const [id] of expected){
    assert.equal(/(^|[._/-])(ru|en)([._/-]|$)/i.test(id),false,id);
  }
});

test('Forest RU source text matches localization fallback and Lumber Hard Work stays exact',()=>{
  for(const event of pack.events){
    assert.equal(event.title,localization.strings[`event.${event.id}.title`].ru);
    assert.equal(event.variants.find(variant=>variant.id==='default')?.text,localization.strings[`event.${event.id}.variant.default.text`].ru);
    assert.equal(event.choices[0]?.label,localization.strings[`event.${event.id}.choice.return.label`].ru);
    assert.equal(event.choices[0]?.text,localization.strings[`event.${event.id}.choice.return.text`].ru);
    const media=pack.media.find(entry=>entry.id===event.id);
    assert.equal(media?.alt,localization.strings[`media.${event.id}.alt`].ru);
  }

  const activity=definitions.activities.find((entry:any)=>entry.id==='lumber.forest');
  assert.ok(activity);
  const optionIds=new Set(activity.options.map((entry:any)=>entry.id));
  for(const id of [
    'forest.route.logging-road',
    'forest.route.hunter-trail',
    'forest.route.old-boundary'
  ])assert.ok(optionIds.has(id),id);
  const categories=new Set(activity.options.map((entry:any)=>entry.category));
  assert.ok(categories.has('navigation'));
  assert.ok(categories.has('physical_obstacle'));
  assert.ok(categories.has('interpretation_ritual'));

  const ending=definitions.endings.find((entry:any)=>entry.id==='ending.lumber.hard-work');
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
