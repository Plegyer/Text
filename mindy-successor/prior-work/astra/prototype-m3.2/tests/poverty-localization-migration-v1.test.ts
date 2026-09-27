import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

import {packSchema} from '../src/core/schema.ts';

const packFiles=[
  'content/packs/poverty-street-production.json',
  'content/packs/poverty-street-production-v2.json',
  'content/packs/poverty-cheap-production.json',
  'content/packs/poverty-cheap-production-v2.json',
  'content/packs/poverty-recovery-production.json',
  'content/packs/poverty-pressure-production.json'
];

const packs=packFiles.map(path=>
  packSchema.parse(JSON.parse(readFileSync(path,'utf8')))
);

const bundle=JSON.parse(
  readFileSync('content/poverty-localization-migration-v1.fixture.json','utf8')
);

const inventory=readFileSync(
  '../../../docs/poverty-prep/ORDINARY_POVERTY_LOCALIZATION_SOURCE_INVENTORY_v2.md',
  'utf8'
);

type Locale='ru'|'en';

function keyTitle(eventId:string){
  return `event.${eventId}.title`;
}
function keyVariant(eventId:string,variantId:string){
  return `event.${eventId}.variant.${variantId}.text`;
}
function keyChoiceLabel(eventId:string,choiceId:string){
  return `event.${eventId}.choice.${choiceId}.label`;
}
function keyChoiceText(eventId:string,choiceId:string){
  return `event.${eventId}.choice.${choiceId}.text`;
}

function requiredKeys():string[]{
  const keys:string[]=[];
  for(const pack of packs){
    for(const event of pack.events){
      keys.push(keyTitle(event.id));
      for(const variant of event.variants){
        keys.push(keyVariant(event.id,variant.id));
      }
      for(const choice of event.choices){
        keys.push(keyChoiceLabel(event.id,choice.id));
        keys.push(keyChoiceText(event.id,choice.id));
      }
    }
  }
  return keys;
}

function localizedPacks(locale:Locale){
  return packs.map(pack=>{
    const copy=structuredClone(pack);
    for(const event of copy.events){
      event.title=bundle.strings[keyTitle(event.id)][locale];
      for(const variant of event.variants){
        variant.text=bundle.strings[keyVariant(event.id,variant.id)][locale];
      }
      for(const choice of event.choices){
        choice.label=bundle.strings[keyChoiceLabel(event.id,choice.id)][locale];
        choice.text=bundle.strings[keyChoiceText(event.id,choice.id)][locale];
      }
    }
    return copy;
  });
}

function mechanicsProjection(input:any[]){
  return input.map(pack=>({
    id:pack.id,
    reads:pack.reads,
    writes:pack.writes,
    capabilities:pack.capabilities,
    media:pack.media,
    events:pack.events.map((event:any)=>({
      id:event.id,
      sourceDomain:event.sourceDomain,
      trigger:event.trigger,
      reactionTriggers:event.reactionTriggers,
      priorityClass:event.priorityClass,
      priority:event.priority,
      blocking:event.blocking,
      delivery:event.delivery,
      nightPolicy:event.nightPolicy,
      chance:event.chance,
      cooldownDays:event.cooldownDays,
      variantCooldownDays:event.variantCooldownDays,
      maxShows:event.maxShows,
      conditions:event.conditions,
      variants:event.variants.map((variant:any)=>({
        id:variant.id,
        conditions:variant.conditions,
        media:variant.media
      })),
      choices:event.choices.map((choice:any)=>({
        id:choice.id,
        media:choice.media,
        conditions:choice.conditions,
        effects:choice.effects
      }))
    }))
  }));
}

test('ordinary poverty migration bundle has complete RU and EN coverage for all PR37 player-facing fields',()=>{
  assert.equal(bundle.version,1);
  assert.equal(bundle.defaultLocale,'ru');
  assert.ok(bundle.strings && typeof bundle.strings==='object');

  const keys=requiredKeys();
  assert.equal(keys.length,82);
  assert.equal(new Set(keys).size,82);
  assert.deepEqual(Object.keys(bundle.strings).sort(),keys.slice().sort());

  const fallbackDebt:{key:string;locale:Locale}[]=[];
  for(const key of keys){
    const entry=bundle.strings[key];
    assert.ok(entry && typeof entry==='object',key);
    for(const locale of ['ru','en'] as const){
      if(typeof entry[locale]!=='string'||entry[locale].trim().length===0){
        fallbackDebt.push({key,locale});
      }
    }
  }

  assert.deepEqual(
    fallbackDebt,
    [],
    'fallback debt must be explicit; current migration is expected to close all 82 PR37 text gaps'
  );
});

test('ordinary poverty event and choice IDs stay locale-neutral and are not duplicated by localization',()=>{
  const localeSpecific=/(^|[._/-])(ru|en)([._/-]|$)/i;
  const sourceEventIds=packs.flatMap(pack=>pack.events.map(event=>event.id));

  assert.equal(sourceEventIds.length,14);
  assert.equal(new Set(sourceEventIds).size,14);

  for(const pack of packs){
    assert.equal(localeSpecific.test(pack.id),false,pack.id);
    for(const event of pack.events){
      assert.equal(localeSpecific.test(event.id),false,event.id);
      for(const variant of event.variants){
        assert.equal(localeSpecific.test(variant.id),false,variant.id);
      }
      for(const choice of event.choices){
        assert.equal(localeSpecific.test(choice.id),false,choice.id);
      }
    }
  }

  for(const locale of ['ru','en'] as const){
    const localized=localizedPacks(locale);
    assert.deepEqual(
      localized.flatMap(pack=>pack.events.map(event=>event.id)),
      sourceEventIds
    );
    assert.equal(localized.flatMap(pack=>pack.events).length,14);
  }
});

test('RU and EN projections change presentation strings only, never ordinary-poverty mechanics',()=>{
  const ru=localizedPacks('ru');
  const en=localizedPacks('en');

  assert.deepEqual(mechanicsProjection(ru),mechanicsProjection(en));

  const ruText=ru.flatMap(pack=>pack.events).map(event=>event.title);
  const enText=en.flatMap(pack=>pack.events).map(event=>event.title);
  assert.notDeepEqual(ruText,enText);

  for(let i=0;i<ru.length;i++){
    assert.equal(ru[i].events.length,en[i].events.length);
    assert.equal(ru[i].id,en[i].id);
  }
});

test('localization leaves PR37 conditions effects resources and next-day pressure identical',()=>{
  const source=mechanicsProjection(packs);
  assert.deepEqual(mechanicsProjection(localizedPacks('ru')),source);
  assert.deepEqual(mechanicsProjection(localizedPacks('en')),source);

  const serialized=JSON.stringify(bundle);
  assert.equal(serialized.includes('modifyResource'),false);
  assert.equal(serialized.includes('addNextDayModifier'),false);
  assert.equal(serialized.includes('addItem'),false);
  assert.equal(serialized.includes('housingTier'),false);
  assert.equal(serialized.includes('nightPhase'),false);
});

test('pre-migration fallback debt is documented and the migration bundle contains no Secret Debt namespace',()=>{
  assert.match(inventory,/FALLBACK_DEBT/);
  assert.match(inventory,/localizable event fields: \*\*82\*\*/);
  assert.match(inventory,/FALLBACK_DEBT fields requiring Russian authoring: \*\*82\*\*/);

  const keys=Object.keys(bundle.strings);
  assert.ok(keys.every((key:string)=>key.startsWith('event.poverty-')));
  assert.ok(keys.every((key:string)=>!key.includes('secret-debt')));
  assert.ok(keys.every((key:string)=>!key.includes('lender')));
  assert.ok(keys.every((key:string)=>!key.includes('forced-night')));
});
