import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {localizationSchema,missingEnglishKeys,resolveLocalizedText} from '../src/core/localization.ts';

const fixtureRaw=JSON.parse(readFileSync('content/relationship-foreman-localization-v1.fixture.json','utf8'));
const definitions=JSON.parse(readFileSync('content/definitions.json','utf8'));
const relationshipPack=JSON.parse(readFileSync('content/packs/lumber-production.json','utf8'));
const nightPack=JSON.parse(readFileSync('content/packs/lumber-night-production.json','utf8'));

const expectedKeys=[
  'event.lumber.foreman-notice.title',
  'event.lumber.foreman-notice.variant.default.text',
  'event.lumber.foreman-notice.choice.professional.label',
  'event.lumber.foreman-notice.choice.professional.text',
  'nightChoice.lumber.foreman.night.label',
  'event.lumber-night.foreman-professional.title',
  'event.lumber-night.foreman-professional.variant.default.text',
  'event.lumber-night.foreman-professional.choice.continue.label',
  'event.lumber-night.foreman-professional.choice.continue.text',
  'media.relationship.lumber.foreman.professional.alt',
  'media.relationship.lumber.foreman.night.professional.alt'
].sort();

function collectPropertyNames(value:unknown,out:string[]=[]):string[]{
  if(Array.isArray(value)){
    for(const item of value)collectPropertyNames(item,out);
    return out;
  }
  if(value&&typeof value==='object'){
    for(const [key,child] of Object.entries(value as Record<string,unknown>)){
      out.push(key);
      collectPropertyNames(child,out);
    }
  }
  return out;
}

test('Foreman localization fixture is complete RU+EN and uses locale-neutral keys',()=>{
  const fixture=localizationSchema.parse(fixtureRaw);

  assert.equal(fixture.defaultLocale,'ru');
  assert.deepEqual(Object.keys(fixture.strings).sort(),expectedKeys);
  assert.deepEqual(missingEnglishKeys(fixture),[]);

  for(const [key,entry] of Object.entries(fixture.strings)){
    assert.ok(entry.ru.trim().length>0,key+' must have Russian source text');
    assert.ok(entry.en?.trim().length,key+' must have a full English equivalent');
    assert.doesNotMatch(key,/(^|\.)(ru|en)(\.|$)/,key+' must remain locale-neutral');
  }

  assert.notEqual(
    resolveLocalizedText(fixture,'event.lumber.foreman-notice.title','ru'),
    resolveLocalizedText(fixture,'event.lumber.foreman-notice.title','en')
  );
});

test('localization fixture contains presentation text only and no gameplay mutation fields',()=>{
  assert.deepEqual(Object.keys(fixtureRaw).sort(),['defaultLocale','strings','version']);
  const propertyNames=collectPropertyNames(fixtureRaw);
  const forbidden=[
    'conditions','effects','nextDayEffects','nextDayEnergyDelta','reward','rewards','metaRewards',
    'reactionTriggers','nightPolicy','transitions','stages','initialStage','capabilities','writes','reads',
    'relationship','career','counter','fact','choice','presentationId','rng','moneyCost','energy'
  ];
  for(const field of forbidden){
    assert.equal(propertyNames.includes(field),false,'localization fixture must not contain gameplay field '+field);
  }
});

test('Foreman gameplay and relationship identities stay single and locale-neutral',()=>{
  const relationship=definitions.relationships.find((item:{id:string})=>item.id==='lumber.foreman');
  assert.ok(relationship);
  assert.equal(relationship.id,'lumber.foreman');
  assert.deepEqual(relationship.stages,['unknown','professional','route-professional']);
  assert.deepEqual(relationship.transitions.map((item:{id:string})=>item.id),['notice-work','choose-professional']);

  const milestone=relationshipPack.events.find((event:{id:string})=>event.id==='lumber.foreman-notice');
  const night=nightPack.events.find((event:{id:string})=>event.id==='lumber-night.foreman-professional');
  assert.ok(milestone);
  assert.ok(night);

  assert.equal(milestone.sourceDomain,'lumber.foreman');
  assert.equal(night.sourceDomain,'lumber.foreman');
  assert.equal(
    definitions.nightChoices.filter((choice:{id:string})=>choice.id==='lumber.foreman.night').length,
    1
  );

  const serializedGameplay=JSON.stringify({relationship,milestone,night});
  assert.doesNotMatch(serializedGameplay,/"locale"\s*:/);
  assert.doesNotMatch(serializedGameplay,/"ru"\s*:/);
  assert.doesNotMatch(serializedGameplay,/"en"\s*:/);
});

test('RU and EN do not duplicate conditions effects or rewards',()=>{
  const fixture=localizationSchema.parse(fixtureRaw);
  const milestone=relationshipPack.events.find((event:{id:string})=>event.id==='lumber.foreman-notice');
  const night=nightPack.events.find((event:{id:string})=>event.id==='lumber-night.foreman-professional');
  const before={
    milestoneConditions:structuredClone(milestone.conditions),
    milestoneEffects:structuredClone(milestone.choices[0].effects),
    nightConditions:structuredClone(night.conditions),
    nightEffects:structuredClone(night.choices[0].effects)
  };

  for(const locale of ['ru','en'] as const){
    for(const key of expectedKeys)assert.ok(resolveLocalizedText(fixture,key,locale).length>0);
  }

  const after={
    milestoneConditions:milestone.conditions,
    milestoneEffects:milestone.choices[0].effects,
    nightConditions:night.conditions,
    nightEffects:night.choices[0].effects
  };
  assert.deepEqual(after,before);
});

test('Lumber Hard Work remains only completed_shifts >= 50 with the locked reward identity',()=>{
  const hardWork=definitions.endings.find((ending:{id:string})=>ending.id==='ending.lumber.hard-work');
  assert.ok(hardWork);
  assert.deepEqual(hardWork.conditions,[
    {kind:'careerCounter',career:'lumber',counter:'completed_shifts',op:'gte',value:50}
  ]);
  assert.deepEqual(hardWork.metaRewards,[
    {kind:'hardWork',rewardId:'hardWork:lumber',career:'lumber'}
  ]);

  assert.equal(
    JSON.stringify(fixtureRaw).includes('completed_shifts'),
    false,
    'localization fixture must not restate or gate Hard Work'
  );
});
