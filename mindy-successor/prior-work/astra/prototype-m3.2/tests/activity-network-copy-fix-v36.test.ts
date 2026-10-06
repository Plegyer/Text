import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {catalog} from './helpers.ts';

const localization=JSON.parse(readFileSync('content/localization.json','utf8')).strings;

const endingId='ending.activity.network';
const localizationKey='ending.ending.activity.network.epilogue';

const expected={
  ru:'Контакты связывают разрозненные направления в единое рабочее пространство.',
  en:'The contacts tie disconnected routes into one practical working network.'
} as const;

function fnv1a32(text:string){
  let hash=0x811c9dc5;
  for(let i=0;i<text.length;i++){
    hash^=text.charCodeAt(i);
    hash=Math.imul(hash,0x01000193)>>>0;
  }
  return hash.toString(16).padStart(8,'0');
}

test('v36 Activity Network epilogue is bilingual and removes unconditional four-region wording',()=>{
  const row=localization[localizationKey];
  assert.ok(row,localizationKey);
  assert.equal(row.ru,expected.ru);
  assert.equal(row.en,expected.en);
  assert.doesNotMatch(row.ru,/четыре/i);
  assert.doesNotMatch(row.en,/\bfour\b/i);
});

test('v36 preserves exact Activity Network mechanics',()=>{
  const ending=catalog.definitions.endings.find(e=>e.id===endingId);
  assert.ok(ending,endingId);

  const mechanics={
    id:ending.id,
    conditions:ending.conditions,
    reward:ending.reward,
    metaRewards:ending.metaRewards
  };

  assert.equal(fnv1a32(JSON.stringify(mechanics)),'9a43cd11');
  assert.equal(ending.reward,'specialist.activity.contact-network');
  assert.deepEqual(
    ending.metaRewards,
    [{kind:'unlock',rewardId:'specialist.activity.contact-network',unlock:'specialist.activity.contact-network'}]
  );
});
