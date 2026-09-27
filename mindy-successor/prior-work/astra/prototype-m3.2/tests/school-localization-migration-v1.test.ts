import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const bundle=JSON.parse(
  readFileSync(
    'content/school-bilingual-migration-v1.fixture.json',
    'utf8'
  )
);

const KEY_PATTERN=/^school\.[a-z0-9_]+(?:\.[a-z0-9_-]+)*$/;

test('School localization migration bundle uses deterministic locale-neutral keys',()=>{
  assert.equal(bundle.id,'school-bilingual-migration-v1');
  assert.equal(bundle.sourceLocale,'ru');
  assert.deepEqual(bundle.supportedLocales,['ru','en']);

  const keys=Object.keys(bundle.entries);
  assert.equal(new Set(keys).size,keys.length);

  for(const key of keys){
    assert.match(key,KEY_PATTERN,key);
    assert.equal(/(^|\.)(ru|en)(\.|$)/.test(key),false,key);
  }
});

test('translated entries contain both RU and EN content',()=>{
  for(const [key,entry] of Object.entries(bundle.entries) as Array<[string,any]>){
    if(entry.status!=='translated')continue;
    assert.equal(typeof entry.locales.ru,'string',key);
    assert.equal(typeof entry.locales.en,'string',key);
    assert.ok(entry.locales.ru.trim().length>0,key+':ru');
    assert.ok(entry.locales.en.trim().length>0,key+':en');
  }
});

test('fallback coverage status is explicit for every localization key',()=>{
  const allowed=new Set(['translated','source-fallback','staged-only']);

  for(const [key,entry] of Object.entries(bundle.entries) as Array<[string,any]>){
    assert.equal(allowed.has(entry.status),true,key+':'+entry.status);
    assert.equal(typeof entry.source,'string',key);
    assert.ok(entry.source.length>0,key);
  }

  const calculated={translated:0,'source-fallback':0,'staged-only':0};
  for(const entry of Object.values(bundle.entries) as any[]){
    calculated[entry.status as keyof typeof calculated]++;
  }

  assert.deepEqual(bundle.coverageSummary,{
    total:Object.keys(bundle.entries).length,
    ...calculated
  });
});

test('locale payloads contain presentation data only and never duplicate mechanics/effects by locale',()=>{
  const forbiddenKeys=new Set([
    'effects','conditions','rewards','tuition','energyCost',
    'statEffects','lessons_completed','night_study_sessions',
    'worldFacts','relationship','career'
  ]);

  function walk(value:unknown,path:string[]=[]):void{
    if(Array.isArray(value)){
      value.forEach((item,index)=>walk(item,[...path,String(index)]));
      return;
    }
    if(!value || typeof value!=='object')return;

    for(const [key,child] of Object.entries(value as Record<string,unknown>)){
      if(path.includes('locales')){
        assert.equal(forbiddenKeys.has(key),false,[...path,key].join('.'));
      }
      walk(child,[...path,key]);
    }
  }

  walk(bundle.entries);

  assert.equal(bundle.mechanicsInvariant.localeSpecificConditions,false);
  assert.equal(bundle.mechanicsInvariant.localeSpecificEffects,false);
  assert.equal(bundle.mechanicsInvariant.localeSpecificRewards,false);
  assert.equal(bundle.mechanicsInvariant.localeSpecificRng,false);
  assert.equal(bundle.mechanicsInvariant.localeSpecificSaveIdentity,false);
  assert.equal(bundle.gameplayIdentitySharedAcrossLocales,true);
});

test('staged-only content can still be fully translated without implying production reachability',()=>{
  const staged=Object.entries(bundle.entries)
    .filter(([,entry]:any)=>entry.status==='staged-only');

  assert.ok(staged.length>0);

  for(const [key,entry] of staged as Array<[string,any]>){
    assert.ok(entry.locales.ru.trim().length>0,key+':ru');
    assert.ok(entry.locales.en.trim().length>0,key+':en');
  }
});
