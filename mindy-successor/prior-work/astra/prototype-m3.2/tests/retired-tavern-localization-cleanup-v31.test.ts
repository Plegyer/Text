import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

import {
  D41_ENDING_IDS,
  D41_TAVERN_LEGACY_ENDING_MIGRATIONS
} from '../src/core/advancedEndingsD41.ts';

const localization=JSON.parse(readFileSync('content/localization.json','utf8')).strings;
const presentation=JSON.parse(readFileSync('content/presentation.json','utf8'));
const definitions=JSON.parse(readFileSync('content/definitions.json','utf8'));

const retiredIds=['tavern-stay','tavern-guild','tavern-court'] as const;
const retiredPresentationLocalizationKeys=[
  'presentation.static.ending.tavern-stay.alt',
  'presentation.static.ending.tavern-stay.caption',
  'presentation.static.ending.tavern-guild.alt',
  'presentation.static.ending.tavern-guild.caption',
  'presentation.static.ending.tavern-court.alt',
  'presentation.static.ending.tavern-court.caption'
] as const;

const retainedCompatibilityKeys=[
  'ending.tavern-stay.title',
  'ending.tavern-stay.description',
  'ending.tavern-guild.title',
  'ending.tavern-guild.description',
  'ending.tavern-court.title',
  'ending.tavern-court.description',
  'unlock.host.label',
  'unlock.mediator.label',
  'unlock.court.label'
] as const;

test('v31 removes only retired Tavern presentation localization compatibility rows',()=>{
  for(const key of retiredPresentationLocalizationKeys){
    assert.equal(localization[key],undefined,key);
  }
  for(const key of retainedCompatibilityKeys){
    assert.ok(localization[key]?.ru?.trim(),key+' ru');
    assert.ok(localization[key]?.en?.trim(),key+' en');
  }
});

test('retired Tavern ending identities remain absent from live definitions and presentation slots',()=>{
  for(const id of retiredIds){
    assert.equal(definitions.endings.some((ending:{id:string})=>ending.id===id),false,id+' definition');
    const presentationText=JSON.stringify(presentation.slots??{});
    assert.equal(presentationText.includes(id),false,id+' presentation');
  }
});

test('D41 retired Tavern migration mapping remains frozen',()=>{
  assert.deepEqual(D41_TAVERN_LEGACY_ENDING_MIGRATIONS,{
    'tavern-stay':D41_ENDING_IDS.tavernInnkeeper,
    'tavern-guild':D41_ENDING_IDS.tavernSanctuary,
    'tavern-court':D41_ENDING_IDS.tavernInformationBroker
  });
});
