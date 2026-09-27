import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

import {packSchema} from '../src/core/schema.ts';

const forestPackRaw=JSON.parse(
  readFileSync('content/packs/forest-result-content-bilingual-v2.json','utf8')
);
const bilingualEvidence=JSON.parse(
  readFileSync('content/packs/forest-result-content-bilingual-v1.json','utf8')
);
const targetDefinitions=JSON.parse(
  readFileSync('content/lumber-target-definitions.fixture.json','utf8')
);

const expected=[
  {
    id:'forest-result-content-v1.success',
    outcome:'success',
    result:'lumber.forest.success'
  },
  {
    id:'forest-result-content-v1.escape',
    outcome:'escape',
    result:'lumber.forest.escape'
  },
  {
    id:'forest-result-content-v1.failure',
    outcome:'failure',
    result:'lumber.forest.failure'
  }
];

const localeSpecificId=/(^|[._/-])(ru|en)([._/-]|$)/i;

function pair(value:any,label:string){
  assert.ok(value && typeof value==='object',label+' missing');
  assert.equal(typeof value.ru,'string',label+'.ru');
  assert.equal(typeof value.en,'string',label+'.en');
  assert.ok(value.ru.trim(),label+'.ru empty');
  assert.ok(value.en.trim(),label+'.en empty');
}

function eventKeys(event:any):string[]{
  const keys=[`event.${event.id}.title`];
  for(const variant of event.variants){
    keys.push(`event.${event.id}.variant.${variant.id}.text`);
  }
  for(const choice of event.choices){
    keys.push(`event.${event.id}.choice.${choice.id}.label`);
    keys.push(`event.${event.id}.choice.${choice.id}.text`);
  }
  return keys;
}

test('Forest bilingual v2 is a strict pack with the expected namespace',()=>{
  const parsed=packSchema.parse(forestPackRaw);
  assert.equal(parsed.id,'forest-result-content-bilingual-v2');
  assert.deepEqual(parsed.reads,[]);
  assert.deepEqual(parsed.writes,[]);
  assert.deepEqual(parsed.capabilities?.reads.activities,['lumber.forest']);
  assert.deepEqual(parsed.capabilities?.writes,{});

  assert.deepEqual(parsed.events.map(event=>event.id),expected.map(entry=>entry.id));
  assert.deepEqual(
    parsed.media.map(media=>media.id),
    expected.map(entry=>entry.id)
  );

  for(const event of parsed.events){
    assert.match(event.id,/^forest-result-content-v1\.(success|escape|failure)$/);
    assert.equal(localeSpecificId.test(event.id),false,event.id);
  }
  for(const media of parsed.media){
    assert.match(media.id,/^forest-result-content-v1\.(success|escape|failure)$/);
    assert.equal(localeSpecificId.test(media.id),false,media.id);
  }
});

test('Forest bilingual v2 preserves exact success escape failure activityResult triggers',()=>{
  const parsed=packSchema.parse(forestPackRaw);

  assert.deepEqual(
    parsed.events.map(event=>({
      id:event.id,
      outcome:event.reactionTriggers[0]?.outcome,
      result:event.reactionTriggers[0]?.result
    })),
    expected
  );

  for(const event of parsed.events){
    const suffix=event.id.split('.').at(-1);
    assert.deepEqual(event.reactionTriggers,[{
      kind:'activityResult',
      activity:'lumber.forest',
      outcome:suffix,
      result:`lumber.forest.${suffix}`
    }]);
    assert.deepEqual(event.conditions,[]);
    assert.ok(event.choices.every(choice=>choice.conditions.length===0));
    assert.ok(event.choices.every(choice=>choice.effects.length===0));
  }
});

test('Forest bilingual v2 has RU source fallback plus complete EN evidence for every player-facing field',()=>{
  const parsed=packSchema.parse(forestPackRaw);
  const localized=bilingualEvidence.localizationSidecar.events;
  const mediaLocalized=bilingualEvidence.localizationSidecar.media;

  for(const event of parsed.events){
    const entry=localized[event.id];
    assert.ok(entry,'missing localization evidence for '+event.id);
    pair(entry.title,event.id+'.title');
    assert.equal(event.title,entry.title.ru);

    for(const variant of event.variants){
      const loc=entry.variants?.[variant.id]?.text;
      pair(loc,`${event.id}.variant.${variant.id}.text`);
      assert.equal(variant.text,loc.ru);
    }

    for(const choice of event.choices){
      const loc=entry.choices?.[choice.id];
      assert.ok(loc,'missing choice localization '+event.id+'/'+choice.id);
      pair(loc.label,`${event.id}.choice.${choice.id}.label`);
      pair(loc.text,`${event.id}.choice.${choice.id}.text`);
      assert.equal(choice.label,loc.label.ru);
      assert.equal(choice.text,loc.text.ru);
    }
  }

  for(const media of parsed.media){
    const loc=mediaLocalized[media.id]?.alt;
    pair(loc,media.id+'.alt');
    assert.equal(media.alt,loc.ru);
  }
});

test('Forest localization key projection is deterministic and never creates localized gameplay IDs',()=>{
  const parsed=packSchema.parse(forestPackRaw);
  const keys=[
    ...parsed.events.flatMap(eventKeys),
    ...parsed.media.map(media=>`media.${media.id}.alt`)
  ];

  assert.equal(new Set(keys).size,keys.length);
  for(const key of keys){
    assert.equal(localeSpecificId.test(key),false,key);
  }

  const gameplayIds=parsed.events.map(event=>event.id);
  assert.equal(new Set(gameplayIds).size,3);
  assert.equal(gameplayIds.filter(id=>id.endsWith('.success')).length,1);
  assert.equal(gameplayIds.filter(id=>id.endsWith('.escape')).length,1);
  assert.equal(gameplayIds.filter(id=>id.endsWith('.failure')).length,1);
});

test('Forest bilingual v2 does not drift Lumber Hard Work eligibility or reward',()=>{
  const ending=targetDefinitions.endings.find(
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

  const serialized=JSON.stringify(forestPackRaw);
  assert.equal(serialized.includes('completed_shifts'),false);
  assert.equal(serialized.includes('hardWork:lumber'),false);
});
