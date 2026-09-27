import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const multi=JSON.parse(
  readFileSync('content/presentation-drafts/bilingual-multi-gif-authoring-v1.json','utf8')
);
const migration=JSON.parse(
  readFileSync('content/presentation-drafts/bilingual-presentation-migration-batch-v1.json','utf8')
);

type Locale='ru'|'en';

function localized(value:{ru?:string,en?:string},locale:Locale){
  const primary=value?.[locale];
  if(typeof primary==='string'&&primary.length>0)return primary;
  const fallback=locale==='ru'?value?.en:value?.ru;
  if(typeof fallback==='string'&&fallback.length>0)return fallback;
  return null;
}

test('locale switch keeps the same semantic presentation identity',()=>{
  for(const pool of multi.pools){
    const ru={
      presentationId:pool.presentationId,
      fallback:localized(pool.textFallback,'ru')
    };
    const en={
      presentationId:pool.presentationId,
      fallback:localized(pool.textFallback,'en')
    };
    assert.equal(ru.presentationId,en.presentationId);
    assert.ok(ru.fallback);
    assert.ok(en.fallback);
  }
});

test('locale switch keeps the same multi-GIF candidate stable key and media path',()=>{
  for(const pool of multi.pools){
    for(const candidate of pool.candidates){
      const ru={
        key:candidate.key,
        src:candidate.src,
        alt:localized(candidate.alt,'ru')
      };
      const en={
        key:candidate.key,
        src:candidate.src,
        alt:localized(candidate.alt,'en')
      };
      assert.equal(ru.key,en.key);
      assert.equal(ru.src,en.src);
      assert.ok(ru.alt);
      assert.ok(en.alt);
    }
  }
});

test('RU/EN candidate alt varies only as localized text metadata',()=>{
  for(const pool of multi.pools){
    for(const candidate of pool.candidates){
      const invariant={
        presentationId:pool.presentationId,
        candidateKey:candidate.key,
        kind:candidate.kind,
        src:candidate.src,
        shipped:candidate.shipped
      };
      const ru={...invariant,alt:localized(candidate.alt,'ru')};
      const en={...invariant,alt:localized(candidate.alt,'en')};
      const {alt:ruAlt,...ruIdentity}=ru;
      const {alt:enAlt,...enIdentity}=en;
      assert.deepEqual(ruIdentity,enIdentity);
      assert.ok(ruAlt);
      assert.ok(enAlt);
    }
  }
});

test('RU/EN migration captions vary only as text under one semantic ID',()=>{
  for(const surface of migration.presentationSurfaces){
    const ru={
      presentationId:surface.presentationId,
      captionKey:surface.captionKey,
      caption:localized(surface.caption,'ru')
    };
    const en={
      presentationId:surface.presentationId,
      captionKey:surface.captionKey,
      caption:localized(surface.caption,'en')
    };
    assert.equal(ru.presentationId,en.presentationId);
    assert.equal(ru.captionKey,en.captionKey);
    assert.ok(ru.caption);
    assert.ok(en.caption);
  }
});

test('missing EN deterministically falls back to RU source without changing identity',()=>{
  const source=multi.pools[0];
  const candidate=source.candidates[0];
  const migrationDebt={
    presentationId:source.presentationId,
    key:candidate.key,
    src:candidate.src,
    alt:{ru:candidate.alt.ru}
  };

  const ru=localized(migrationDebt.alt,'ru');
  const en=localized(migrationDebt.alt,'en');

  assert.equal(en,ru);
  assert.equal(migrationDebt.presentationId,source.presentationId);
  assert.equal(migrationDebt.key,candidate.key);
  assert.equal(migrationDebt.src,candidate.src);
});

test('Work panel action identity is unchanged by localized labels',()=>{
  for(const action of migration.workPanelActions){
    const ru={
      actionId:action.actionId,
      labelKey:action.labelKey,
      label:localized(action.label,'ru')
    };
    const en={
      actionId:action.actionId,
      labelKey:action.labelKey,
      label:localized(action.label,'en')
    };
    assert.equal(ru.actionId,en.actionId);
    assert.equal(ru.labelKey,en.labelKey);
    assert.ok(ru.label);
    assert.ok(en.label);
  }
});

test('authoring localization bundles contain no gameplay event copies or mechanics fields',()=>{
  const forbidden=new Set([
    'conditions','effects','reward','rewards','eligibility',
    'rng','rngState','energyDelta','statEffects','cooldownDays',
    'variantId','choiceId','gameplayEventId'
  ]);
  const seen:string[]=[];

  const visit=(value:any)=>{
    if(Array.isArray(value)){ for(const item of value)visit(item); return; }
    if(!value||typeof value!=='object')return;
    for(const [key,child] of Object.entries(value)){
      if(forbidden.has(key))seen.push(key);
      visit(child);
    }
  };

  visit(multi);
  visit(migration);
  assert.deepEqual(seen,[]);
  assert.equal(multi.identityPolicy.gameplayFieldsAllowed,false);
  assert.equal(migration.identityPolicy.gameplayMutationAllowed,false);
});

test('locale is not encoded into semantic IDs, candidate keys or media paths',()=>{
  const localeToken=/(^|[\/._-])(ru|en)(?=[\/._-]|$)/;
  for(const pool of multi.pools){
    assert.equal(localeToken.test(pool.presentationId),false,pool.presentationId);
    for(const candidate of pool.candidates){
      assert.equal(localeToken.test(candidate.key),false,candidate.key);
      assert.equal(localeToken.test(candidate.src),false,candidate.src);
    }
  }
});
