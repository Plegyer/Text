import test from 'node:test';
import assert from 'node:assert/strict';

import {
  emptyLocalization,
  localizationSchema,
  missingEnglishKeys,
  normalizeLocale,
  resolveLocalizedText
} from '../src/core/localization.ts';

test('localization: supports RU and EN with Russian fallback',()=>{
  const bundle=localizationSchema.parse({
    version:1,
    defaultLocale:'ru',
    strings:{
      complete:{ru:'Работа',en:'Work'},
      fallback:{ru:'Только русский'}
    }
  });

  assert.equal(resolveLocalizedText(bundle,'complete','ru','x'),'Работа');
  assert.equal(resolveLocalizedText(bundle,'complete','en','x'),'Work');
  assert.equal(resolveLocalizedText(bundle,'fallback','en','x'),'Только русский');
  assert.equal(resolveLocalizedText(bundle,'missing','en','legacy'),'legacy');
  assert.deepEqual(missingEnglishKeys(bundle),['fallback']);
});

test('localization: locale normalization never changes gameplay data',()=>{
  assert.equal(normalizeLocale('en'),'en');
  assert.equal(normalizeLocale('ru'),'ru');
  assert.equal(normalizeLocale('de'),'ru');
  assert.equal(normalizeLocale(null),'ru');
  assert.deepEqual(emptyLocalization(),{version:1,defaultLocale:'ru',strings:{}});
});
