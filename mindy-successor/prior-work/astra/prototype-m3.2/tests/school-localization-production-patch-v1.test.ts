import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {localizationSchema} from '../src/core/localization.ts';

const patch=JSON.parse(
  readFileSync(
    'content/school-localization-production-patch-v1.fixture.json',
    'utf8'
  )
);

const courses=[
  'literacy_and_numbers',
  'arcana',
  'rhetoric_and_social',
  'etiquette_and_presentation',
  'field_craft',
  'physical_training',
  'arts_and_performance',
  'body_confidence'
];

test('School production localization patch is a strict RU+EN localization bundle',()=>{
  assert.doesNotThrow(()=>localizationSchema.parse(patch));
  assert.equal(patch.version,1);
  assert.equal(patch.defaultLocale,'ru');

  for(const [key,entry] of Object.entries(patch.strings) as Array<[string,any]>){
    assert.deepEqual(Object.keys(entry).sort(),['en','ru'],key);
    assert.ok(entry.ru.trim().length>0,key+':ru');
    assert.ok(entry.en.trim().length>0,key+':en');
  }
});

test('production localization keys are unique and locale-neutral',()=>{
  const keys=Object.keys(patch.strings);
  assert.equal(new Set(keys).size,keys.length);

  for(const key of keys){
    assert.equal(/(^|\.)(ru|en)(\.|$)/.test(key),false,key);
    assert.equal(/[^a-zA-Z0-9._-]/.test(key),false,key);
  }
});

test('all eight paid course identities are represented by safe UI keys',()=>{
  for(const course of courses){
    const label=`school.course.${course}.label`;
    const description=`school.course.${course}.description`;
    assert.ok(patch.strings[label],label);
    assert.ok(patch.strings[description],description);
  }
});

test('reachable event localization contains generic post-School and exact Night families only',()=>{
  const keys=Object.keys(patch.strings);

  const eventLike=keys.filter(key=>
    key.startsWith('school.generic.')||
    key.startsWith('school.night.')||
    key.startsWith('school.media.generic.')||
    key.startsWith('school.media.night.')
  );
  assert.ok(eventLike.length>0);

  assert.equal(keys.some(key=>key.startsWith('school.teacher.')),false);
  assert.equal(keys.some(key=>key.startsWith('school.lesson.')),false);
  assert.equal(keys.some(key=>key.includes('.repeatable.')),false);
  assert.equal(keys.some(key=>key.includes('school-teacher')),false);
});

test('staged exact-course teacher content is absent',()=>{
  const serialized=JSON.stringify(patch);

  for(const marker of [
    'mara-fen','ilyra-venn','cassian-reed','eliane-marrow',
    'rowan-pike','tovan-kest','nessa-lark','sera-vey'
  ]){
    assert.equal(serialized.includes(marker),false,marker);
  }
});

test('production patch contains no gameplay fields',()=>{
  assert.deepEqual(
    Object.keys(patch).sort(),
    ['defaultLocale','strings','version']
  );

  for(const [key,entry] of Object.entries(patch.strings) as Array<[string,any]>){
    assert.deepEqual(Object.keys(entry).sort(),['en','ru'],key);
  }
});

test('safe School panel and Night context keys are present',()=>{
  for(const key of [
    'ui.school.title',
    'ui.school.help',
    'ui.school.lessonButton',
    'ui.school.tuitionEnergy',
    'ui.school.nightStudyButton',
    'ui.school.nightStudyContext',
    'school.generic.after_school.title',
    'school.night.choice.continue.label',
    'school.night.choice.continue.text'
  ]){
    assert.ok(patch.strings[key],key);
  }
});
