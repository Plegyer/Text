import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const bilingualPack=JSON.parse(
  readFileSync('content/packs/forest-result-content-bilingual-v1.json','utf8')
);
const targetDefinitions=JSON.parse(
  readFileSync('content/lumber-target-definitions.fixture.json','utf8')
);
const routeChallengeBank=readFileSync(
  '../../../docs/lumber-prep/FOREST_ROUTE_CHALLENGE_RU_EN_v1.md',
  'utf8'
);

const expectedBoundaries=[
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

function assertLocalePair(value:any,label:string){
  assert.ok(value && typeof value==='object',`${label} must be an object`);
  assert.equal(typeof value.ru,'string',`${label}.ru must be a string`);
  assert.equal(typeof value.en,'string',`${label}.en must be a string`);
  assert.ok(value.ru.trim().length>0,`${label}.ru must not be empty`);
  assert.ok(value.en.trim().length>0,`${label}.en must not be empty`);
}

test('Forest bilingual draft has one locale-neutral gameplay event per exact Activity result',()=>{
  assert.equal(bilingualPack.localizationModel.sourceLocale,'ru');
  assert.deepEqual(bilingualPack.localizationModel.supportedLocales,['ru','en']);
  assert.equal(bilingualPack.localizationModel.gameplayEventIdentityLocaleNeutral,true);
  assert.equal(bilingualPack.localizationModel.mechanicsIdenticalAcrossLocales,true);

  const ids=bilingualPack.events.map((event:any)=>event.id);
  assert.equal(new Set(ids).size,ids.length);
  assert.deepEqual(ids,expectedBoundaries.map(entry=>entry.id));

  for(const id of ids){
    assert.ok(!/(^|[._/-])(ru|en)([._/-]|$)/i.test(id),`${id} must remain locale-neutral`);
  }

  assert.equal(
    bilingualPack.events.filter((event:any)=>event.id.endsWith('.success')).length,
    1
  );
  assert.equal(
    bilingualPack.events.filter((event:any)=>event.id.endsWith('.escape')).length,
    1
  );
  assert.equal(
    bilingualPack.events.filter((event:any)=>event.id.endsWith('.failure')).length,
    1
  );
});

test('Forest bilingual draft preserves the exact activityResult trigger identities',()=>{
  assert.deepEqual(
    bilingualPack.events.map((event:any)=>({
      id:event.id,
      outcome:event.reactionTriggers[0]?.outcome,
      result:event.reactionTriggers[0]?.result
    })),
    expectedBoundaries
  );

  for(const event of bilingualPack.events){
    assert.deepEqual(event.reactionTriggers,[{
      kind:'activityResult',
      activity:'lumber.forest',
      outcome:event.id.split('.').at(-1),
      result:`lumber.forest.${event.id.split('.').at(-1)}`
    }]);
    assert.deepEqual(event.conditions,[]);
    assert.ok(event.choices.every((choice:any)=>
      Array.isArray(choice.effects) && choice.effects.length===0
    ));
  }
});

test('every Forest result event has complete RU and EN presentation coverage in the sidecar',()=>{
  const localized=bilingualPack.localizationSidecar.events;
  assert.deepEqual(Object.keys(localized).sort(),expectedBoundaries.map(x=>x.id).sort());

  for(const event of bilingualPack.events){
    const entry=localized[event.id];
    assert.ok(entry,`missing localization for ${event.id}`);
    assertLocalePair(entry.title,`${event.id}.title`);

    for(const variant of event.variants){
      assert.ok(entry.variants?.[variant.id],`missing localized variant ${event.id}/${variant.id}`);
      assertLocalePair(
        entry.variants[variant.id].text,
        `${event.id}.variants.${variant.id}.text`
      );
    }

    for(const choice of event.choices){
      const localizedChoice=entry.choices?.[choice.id];
      assert.ok(localizedChoice,`missing localized choice ${event.id}/${choice.id}`);
      assertLocalePair(
        localizedChoice.label,
        `${event.id}.choices.${choice.id}.label`
      );
      assertLocalePair(
        localizedChoice.text,
        `${event.id}.choices.${choice.id}.text`
      );
    }
  }
});

test('every shared Forest result media identity has paired RU and EN alt text',()=>{
  const mediaSidecar=bilingualPack.localizationSidecar.media;
  const mediaIds=bilingualPack.media.map((media:any)=>media.id);

  assert.equal(new Set(mediaIds).size,mediaIds.length);
  assert.deepEqual(
    Object.keys(mediaSidecar).sort(),
    mediaIds.slice().sort()
  );

  for(const media of bilingualPack.media){
    assert.ok(!/(^|[._/-])(ru|en)([._/-]|$)/i.test(media.id));
    assert.equal(media.src,'assets/stage-forest.svg');
    assertLocalePair(mediaSidecar[media.id].alt,`${media.id}.alt`);
  }
});

test('route/challenge bilingual bank visibly keeps RU source and EN pairs on locale-neutral content keys',()=>{
  assert.match(routeChallengeBank,/Russian is the source authoring language/);
  assert.match(routeChallengeBank,/RU:/);
  assert.match(routeChallengeBank,/EN:/);

  const requiredKeys=[
    'forest/route/logging-road/wheel-ruts',
    'forest/route/logging-road/timber-stack',
    'forest/route/logging-road/work-marks',
    'forest/route/logging-road/narrowing',
    'forest/route/hunter-trail/tracks',
    'forest/route/old-boundary/stones',
    'forest/deep-navigation/closed-canopy',
    'forest/challenge/navigation/split-trail',
    'forest/challenge/physical/fallen-trunk',
    'forest/challenge/anomaly/knot-marks'
  ];

  for(const key of requiredKeys){
    assert.ok(routeChallengeBank.includes(`\`${key}\``),`missing bilingual content key ${key}`);
    assert.ok(!key.includes('/ru') && !key.includes('/en'));
  }

  assert.match(routeChallengeBank,/PRODUCT_BLOCKED for production binding; bilingual prose is ready/);
  assert.match(routeChallengeBank,/old_boundary_token/);
  assert.match(routeChallengeBank,/enter_old_boundary/);
});

test('Forest bilingual authoring does not drift Lumber Hard Work eligibility or reward',()=>{
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

  const authored=JSON.stringify(bilingualPack.events);
  assert.ok(!authored.includes('completed_shifts'));
  assert.ok(!authored.includes('hardWork:lumber'));
});
