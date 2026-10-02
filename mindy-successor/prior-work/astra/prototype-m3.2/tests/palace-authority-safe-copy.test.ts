import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

import {palaceOutcomeFamilies} from '../src/core/palace.ts';

const copy=JSON.parse(readFileSync('content/palace-authority-safe-copy-v1.json','utf8'));

function bilingual(entry:any){
  assert.equal(typeof entry.ru,'string');
  assert.equal(typeof entry.en,'string');
  assert.ok(entry.ru.length>30);
  assert.ok(entry.en.length>30);
}

test('Palace authored source is D18-revalidated and intentionally unbound from open runtime IDs',()=>{
  assert.equal(copy.status,'AUTHORITY_SAFE_UNBOUND_COPY');
  assert.equal(copy.runtimeBinding,null);
  assert.equal(copy.sourceRevalidation.historicalSourcePr,247);
  assert.ok(copy.sourceRevalidation.revalidatedAgainst.includes('USER_DECISIONS_LOCKED_v1:D18'));

  const raw=JSON.stringify(copy);
  assert.equal(raw.includes('hardWork:palace'),false);
  assert.equal(raw.includes('"rewardId"'),false);
  assert.equal(raw.includes('"runtimeId"'),false);
  assert.equal(raw.toLowerCase().includes('assassin'),false);
  assert.equal(raw.toLowerCase().includes('prostitute'),false);
});

test('pre-unlock discovery copy hints at Palace without exposing a progress counter or alternate unlock',()=>{
  assert.ok(copy.discovery.length>=2);
  for(const entry of copy.discovery)bilingual(entry);
  const discovery=JSON.stringify(copy.discovery);
  assert.equal(discovery.includes('10/10'),false);
  assert.equal(discovery.includes('7/10'),false);
  assert.match(copy.discovery.find((x:any)=>x.slot==='sealed-correspondence').en,/seal itself unlocks nothing/i);
});

test('repeatable Palace work covers every authority-listed work family without choosing a heroine role',()=>{
  const families=copy.repeatableWork.map((x:any)=>x.family);
  assert.deepEqual(families,[
    'protocol',
    'documents-logistics',
    'escort',
    'negotiation',
    'ceremony-prep',
    'errands',
    'household'
  ]);
  for(const entry of copy.repeatableWork)bilingual(entry);
  assert.equal(JSON.stringify(copy.repeatableWork).toLowerCase().includes('princess'),false);
  assert.equal(JSON.stringify(copy.repeatableWork).toLowerCase().includes('queen'),false);
});

test('Service Life, Court Power and Inner Truth remain separate outcome copy families',()=>{
  assert.deepEqual(copy.outcomes.map((x:any)=>x.family),[...palaceOutcomeFamilies]);
  for(const entry of copy.outcomes)bilingual(entry);
  assert.match(copy.outcomes.find((x:any)=>x.family==='court-power').en,/without a predefined title/i);
  assert.match(copy.outcomes.find((x:any)=>x.family==='inner-truth').en,/without turning one discovered fact into a complete answer/i);
});

test('Return Home copy contains only the locked D18 result and optional NG+ capability semantics',()=>{
  assert.equal(copy.trueEnding.family,'return-home');
  bilingual(copy.trueEnding.epilogue);
  bilingual(copy.trueEnding.ngPlusNotice);
  assert.match(copy.trueEnding.epilogue.en,/defeating the Prince/i);
  assert.match(copy.trueEnding.epilogue.en,/return to your original world/i);
  assert.match(copy.trueEnding.ngPlusNotice.en,/option to double all 12 progression stats/i);
  assert.match(copy.trueEnding.ngPlusNotice.en,/never enabled automatically/i);
});

test('text fallbacks exist for Palace work and all four locked ending families',()=>{
  assert.deepEqual(copy.textFallbacks.map((x:any)=>x.slot),[
    'palace-work',
    'service-life',
    'court-power',
    'inner-truth',
    'return-home'
  ]);
  for(const entry of copy.textFallbacks)bilingual(entry);
});
