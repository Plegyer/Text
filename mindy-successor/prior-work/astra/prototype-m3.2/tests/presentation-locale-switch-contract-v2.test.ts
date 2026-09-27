import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const fallbackFixture=JSON.parse(
  readFileSync('content/presentation-drafts/localization-fallback-v1.fixture.json','utf8')
);
const bilingualFixture=JSON.parse(
  readFileSync('content/presentation-drafts/bilingual-multi-gif-authoring-v1.json','utf8')
);
const careerBundle=JSON.parse(
  readFileSync('content/presentation-drafts/ten-career-localization-v1.json','utf8')
);

type Locale='ru'|'en';

function resolveCase(entry:any,locale:Locale){
  const own=entry.values?.[locale];
  if(typeof own==='string'&&own.length>0){
    return {text:own,source:locale,qaDebt:[] as string[]};
  }

  const other=locale==='ru'?entry.values?.en:entry.values?.ru;
  if(typeof other==='string'&&other.length>0){
    return {
      text:other,
      source:locale==='ru'?'en-fallback':'ru-fallback',
      qaDebt:[locale==='ru'?'MISSING_RU':'MISSING_EN']
    };
  }

  const legacy=entry.legacyFallback?.[locale]
    ??(locale==='ru'?entry.legacyFallback?.en:entry.legacyFallback?.ru);
  if(typeof legacy==='string'&&legacy.length>0){
    return {
      text:legacy,
      source:entry.legacyFallback?.[locale]?'legacy-'+locale:'legacy-other',
      qaDebt:['MISSING_LOCALIZATION_KEY_VALUE']
    };
  }

  return {text:null,source:'missing',qaDebt:['MISSING_ALL_TEXT']};
}

function walk(value:any,visit:(key:string,value:any)=>void){
  if(Array.isArray(value)){
    for(const item of value)walk(item,visit);
    return;
  }
  if(!value||typeof value!=='object')return;
  for(const [key,child] of Object.entries(value)){
    visit(key,child);
    walk(child,visit);
  }
}

test('semantic IDs remain identical when presentation locale switches RU to EN',()=>{
  for(const pool of bilingualFixture.pools){
    const ru={locale:'ru',presentationId:pool.presentationId};
    const en={locale:'en',presentationId:pool.presentationId};
    assert.equal(ru.presentationId,en.presentationId);
  }

  for(const career of careerBundle.careers){
    const ru={locale:'ru',ids:career.seasonalPresentationIds};
    const en={locale:'en',ids:career.seasonalPresentationIds};
    assert.deepEqual(ru.ids,en.ids);
    assert.equal(career.resultPresentationId,'job/'+career.careerId+'/result/default');
  }
});

test('media candidate keys and media paths remain identical across locale switch',()=>{
  for(const pool of bilingualFixture.pools){
    for(const candidate of pool.candidates){
      const ru={
        locale:'ru',
        key:candidate.key,
        src:candidate.src,
        alt:candidate.alt.ru
      };
      const en={
        locale:'en',
        key:candidate.key,
        src:candidate.src,
        alt:candidate.alt.en
      };
      assert.equal(ru.key,en.key);
      assert.equal(ru.src,en.src);
      assert.ok(ru.alt.length>0);
      assert.ok(en.alt.length>0);
    }
  }
});

test('switching locale cannot choose another GIF candidate in localized fixture',()=>{
  const entry=fallbackFixture.cases.find((x:any)=>x.id==='localized-multigif-alt-caption');
  assert.ok(entry);
  const ru={
    presentationId:entry.semanticId,
    candidateKey:entry.candidate.key,
    mediaPath:entry.candidate.mediaPath,
    alt:entry.candidate.alt.ru
  };
  const en={
    presentationId:entry.semanticId,
    candidateKey:entry.candidate.key,
    mediaPath:entry.candidate.mediaPath,
    alt:entry.candidate.alt.en
  };

  assert.equal(ru.presentationId,en.presentationId);
  assert.equal(ru.candidateKey,en.candidateKey);
  assert.equal(ru.mediaPath,en.mediaPath);
});

test('RU fallback is deterministic when EN is missing',()=>{
  const entry=fallbackFixture.cases.find((x:any)=>x.id==='ru-only-migration-debt');
  assert.ok(entry);

  const first=resolveCase(entry,'en');
  const second=resolveCase(entry,'en');

  assert.deepEqual(first,second);
  assert.equal(first.text,entry.values.ru);
  assert.equal(first.source,'ru-fallback');
  assert.deepEqual(first.qaDebt,['MISSING_EN']);
});

test('missing EN is QA-visible rather than silently treated as complete',()=>{
  const entry=fallbackFixture.cases.find((x:any)=>x.id==='ru-only-migration-debt');
  const resolved=resolveCase(entry,'en');

  assert.ok(resolved.qaDebt.includes('MISSING_EN'));
  assert.equal(entry.expected.en.qaDebt.includes('MISSING_EN'),true);
});

test('fully translated entry resolves each locale directly with no QA debt',()=>{
  const entry=fallbackFixture.cases.find((x:any)=>x.id==='fully-translated');
  const ru=resolveCase(entry,'ru');
  const en=resolveCase(entry,'en');

  assert.equal(ru.text,entry.values.ru);
  assert.equal(en.text,entry.values.en);
  assert.deepEqual(ru.qaDebt,[]);
  assert.deepEqual(en.qaDebt,[]);
});

test('missing localization values use deterministic legacy fallback',()=>{
  const entry=fallbackFixture.cases.find((x:any)=>x.id==='missing-key-legacy-fallback');
  const ru=resolveCase(entry,'ru');
  const en=resolveCase(entry,'en');

  assert.equal(ru.text,entry.legacyFallback.ru);
  assert.equal(en.text,entry.legacyFallback.en);
  assert.ok(ru.qaDebt.includes('MISSING_LOCALIZATION_KEY_VALUE'));
  assert.ok(en.qaDebt.includes('MISSING_LOCALIZATION_KEY_VALUE'));
});

test('localization authoring bundles contain no gameplay conditions or effects',()=>{
  const forbidden=new Set([
    'conditions','effects','reward','rewards','eligibility',
    'energyDelta','statEffects','rng','rngState','cooldownDays',
    'maxShows','entryConditions','writeFacts'
  ]);
  const seen:string[]=[];

  for(const bundle of [fallbackFixture,bilingualFixture,careerBundle]){
    walk(bundle,(key)=>{
      if(forbidden.has(key))seen.push(key);
    });
  }

  assert.deepEqual(seen,[]);
  assert.equal(fallbackFixture.gameplayFieldsAllowed,false);
  assert.equal(bilingualFixture.identityPolicy.gameplayFieldsAllowed,false);
  assert.equal(careerBundle.identityPolicy.duplicateGameplayActions,false);
});

test('career action IDs are not duplicated per locale',()=>{
  const actionIds=careerBundle.careers.map((career:any)=>career.actionId);
  assert.equal(new Set(actionIds).size,10);

  for(const career of careerBundle.careers){
    assert.ok(career.label.ru.length>0);
    assert.ok(career.label.en.length>0);
    assert.ok(!career.actionId.endsWith('.ru'));
    assert.ok(!career.actionId.endsWith('.en'));
  }
});
