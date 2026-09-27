import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {localizationSchema} from '../src/core/localization.ts';

const delta=JSON.parse(
  readFileSync(
    'content/school-localization-main-delta-v1.fixture.json',
    'utf8'
  )
);

const courseSlugs=[
  'literacy_and_numbers',
  'arcana',
  'rhetoric_and_social',
  'etiquette_and_presentation',
  'field_craft',
  'physical_training',
  'arts_and_performance',
  'body_confidence'
];

test('School main localization delta is a strict localization bundle',()=>{
  assert.doesNotThrow(()=>localizationSchema.parse(delta));
  assert.equal(delta.version,1);
  assert.equal(delta.defaultLocale,'ru');
});

test('all eight paid-course UI identities have RU and EN label/description keys',()=>{
  for(const slug of courseSlugs){
    for(const suffix of ['label','description']){
      const key=`school.course.${slug}.${suffix}`;
      const entry=delta.strings[key];
      assert.ok(entry,key);
      assert.equal(typeof entry.ru,'string',key+':ru');
      assert.equal(typeof entry.en,'string',key+':en');
      assert.ok(entry.ru.trim().length>0,key+':ru');
      assert.ok(entry.en.trim().length>0,key+':en');
    }
  }
});

test('School localization keys are unique and locale-neutral',()=>{
  const keys=Object.keys(delta.strings);
  assert.equal(new Set(keys).size,keys.length);

  for(const key of keys){
    assert.equal(/(^|\.)(ru|en)(\.|$)/.test(key),false,key);
    assert.equal(/[^a-zA-Z0-9._-]/.test(key),false,key);
  }
});

test('every delta entry contains presentation strings only',()=>{
  for(const [key,entry] of Object.entries(delta.strings) as Array<[string,any]>){
    assert.deepEqual(Object.keys(entry).sort(),['en','ru'],key);
    assert.equal(typeof entry.ru,'string',key);
    assert.equal(typeof entry.en,'string',key);
  }

  assert.deepEqual(
    Object.keys(delta).sort(),
    ['defaultLocale','strings','version']
  );
});

test('staged teacher and exact-course lesson authoring is not accidentally promoted',()=>{
  const keys=Object.keys(delta.strings);

  assert.equal(keys.some(key=>key.startsWith('school.teacher.')),false);
  assert.equal(keys.some(key=>key.includes('.repeatable.')),false);
  assert.equal(keys.some(key=>key.includes('mara-fen')),false);
  assert.equal(keys.some(key=>key.includes('ilyra-venn')),false);
  assert.equal(keys.some(key=>key.includes('cassian-reed')),false);
  assert.equal(keys.some(key=>key.includes('eliane-marrow')),false);
  assert.equal(keys.some(key=>key.includes('rowan-pike')),false);
  assert.equal(keys.some(key=>key.includes('tovan-kest')),false);
  assert.equal(keys.some(key=>key.includes('nessa-lark')),false);
  assert.equal(keys.some(key=>key.includes('sera-vey')),false);
});

test('safe current-main School families are present',()=>{
  const keys=new Set(Object.keys(delta.strings));

  for(const key of [
    'ui.school.title',
    'ui.school.help',
    'ui.school.lessonButton',
    'ui.school.tuitionEnergy',
    'ui.school.nightStudyButton',
    'ui.school.nightStudyContext',
    'school.generic.after_school.title',
    'school.generic.after_school.choice.continue.label',
    'school.generic.after_school.choice.continue.text',
    'school.night.choice.continue.label',
    'school.night.choice.continue.text'
  ]){
    assert.equal(keys.has(key),true,key);
  }

  assert.equal(
    [...keys].some(key=>key.startsWith('school.night.arcana.reason.variant.')),
    true
  );
});
