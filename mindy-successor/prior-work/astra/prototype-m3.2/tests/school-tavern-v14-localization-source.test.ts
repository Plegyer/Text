import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const inventory=JSON.parse(readFileSync('content/school-tavern-v14-live-inventory.fixture.json','utf8'));
const localization=JSON.parse(readFileSync('content/localization.json','utf8')).strings;

test('C5-153 all four exact Tavern School events have complete RU EN reachable text',()=>{
  for(const hook of inventory.hooks){
    for(const suffix of ['title','variant.default.text','choice.apply.label','choice.apply.text']){
      const pair=localization[`event.${hook.reactionEvent}.${suffix}`];
      assert.ok(pair?.ru?.trim(),hook.reactionEvent+' '+suffix+' ru');
      assert.ok(pair?.en?.trim(),hook.reactionEvent+' '+suffix+' en');
      assert.notEqual(pair.ru,pair.en,hook.reactionEvent+' '+suffix);
    }
  }
});

test('C5-152/C5-153 teacher media and course descriptions remain bilingual and tied to the existing roster',()=>{
  const expected=[
    ['school.course.literacy_and_numbers','Mara Fen','Мара Фен','school.teacher.literacy-and-numbers.classroom'],
    ['school.course.rhetoric_and_social','Cassian Reed','Кассиан Рид','school.teacher.rhetoric-and-social.classroom'],
    ['school.course.etiquette_and_presentation','Eliane Marrow','Элиан Марроу','school.teacher.etiquette-and-presentation.classroom'],
    ['school.course.arcana','Ilyra Venn','Илира Венн','school.teacher.arcana.classroom']
  ] as const;
  for(const [course,en,ru,media] of expected){
    assert.ok(localization[`${course}.description`]?.en?.includes(en),course+' en teacher');
    assert.ok(localization[`${course}.description`]?.ru?.includes(ru),course+' ru teacher');
    assert.ok(localization[`media.${media}.alt`]?.en?.includes(en),media+' en alt');
    assert.ok(localization[`media.${media}.alt`]?.ru?.includes(ru),media+' ru alt');
  }
});

test('C5-155 Tavern event copy never publishes a global School certificate or project claim',()=>{
  for(const hook of inventory.hooks){
    const text=[
      localization[`event.${hook.reactionEvent}.variant.default.text`]?.ru??'',
      localization[`event.${hook.reactionEvent}.variant.default.text`]?.en??'',
      localization[`event.${hook.reactionEvent}.choice.apply.text`]?.ru??'',
      localization[`event.${hook.reactionEvent}.choice.apply.text`]?.en??''
    ].join(' ').toLowerCase();
    assert.equal(/global certificate|глобальн.*сертификат.*создан/.test(text),false,hook.reactionEvent);
  }
});
