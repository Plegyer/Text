import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

import {SCHOOL_COURSES} from '../src/core/school.ts';

function read(path:string){return JSON.parse(readFileSync(path,'utf8'));}

const localization=read('content/localization.json').strings;
const lesson=read('content/packs/school-lesson-content-v1.json');
const life=read('content/packs/school-life-content-v1.json');

const teacherNames=[
  'Mara Fen','Ilyra Venn','Cassian Reed','Eliane Marrow',
  'Rowan Pike','Tovan Kest','Nessa Lark','Sera Vey'
];
const teacherNamesRu=[
  'Мара Фен','Илира Венн','Кассиан Рид','Элиан Марроу',
  'Роуэн Пайк','Тован Кест','Несса Ларк','Сера Вей'
];

test('C5-118 all eight live course cards introduce the existing teacher in both locales',()=>{
  assert.equal(SCHOOL_COURSES.length,8);
  const enSeen=new Set<string>();
  for(let i=0;i<SCHOOL_COURSES.length;i++){
    const course=SCHOOL_COURSES[i];
    const pair=localization[`${course.id}.description`];
    assert.ok(pair?.ru?.includes(teacherNamesRu[i]),course.id+' ru teacher');
    assert.ok(pair?.en?.includes(teacherNames[i]),course.id+' en teacher');
    enSeen.add(pair.en);
  }
  assert.equal(enSeen.size,8);
});

test('C5-118 repeatable generic after-School voice stays generic and effect-free',()=>{
  const a=lesson.events.find((event:any)=>event.id==='school-lesson-content-v1.after-school');
  const b=life.events.find((event:any)=>event.id==='school-life-content-v1.after-paid-lesson');
  assert.deepEqual(a.variants.map((v:any)=>v.id),['default','settle-the-lesson','one-clear-note','leave-a-question']);
  assert.deepEqual(b.variants.map((v:any)=>v.id),['default','practice-not-proof','cost-already-counted','back-to-the-day']);

  const allNames=[...teacherNames,...teacherNamesRu];
  for(const event of [a,b]){
    for(const variant of event.variants){
      const pair=localization[`event.${event.id}.variant.${variant.id}.text`];
      assert.ok(pair?.ru?.trim(),event.id+'/'+variant.id+' ru');
      assert.ok(pair?.en?.trim(),event.id+'/'+variant.id+' en');
      for(const name of allNames){
        assert.equal(pair.ru.includes(name)||pair.en.includes(name),false,event.id+'/'+variant.id+' leaked '+name);
      }
    }
    for(const choice of event.choices)assert.deepEqual(choice.effects,[],event.id);
  }
});

test('C5-118 exact Night-study content covers each current exact identity once with RU EN parity',()=>{
  const events=life.events.filter((event:any)=>event.id.startsWith('school-life-content-v1.night-study.'));
  assert.equal(events.length,24);
  const choices=events.map((event:any)=>event.reactionTriggers[0].choice);
  assert.equal(new Set(choices).size,24);

  for(const event of events){
    const title=localization[`event.${event.id}.title`];
    const body=localization[`event.${event.id}.variant.default.text`];
    const outcome=localization[`event.${event.id}.choice.continue.text`];
    assert.ok(title?.ru?.trim()&&title?.en?.trim(),event.id+' title');
    assert.ok(body?.ru?.trim()&&body?.en?.trim(),event.id+' body');
    assert.ok(outcome?.ru?.trim()&&outcome?.en?.trim(),event.id+' outcome');
    assert.deepEqual(event.choices[0].effects,[],event.id);
  }
});

test('C5-118 School presentation terminology uses canonical course names and corrected English articles',()=>{
  assert.ok(localization['presentation.static.school-course-literacy-and-numbers.alt'].ru.includes('Грамотность и счёт'));
  assert.ok(localization['presentation.static.school-course-literacy-and-numbers.caption'].ru.includes('Грамотность и счёт'));
  assert.ok(localization['media.school.teacher.literacy-and-numbers.classroom.alt'].ru.includes('Грамотность и счёт'));
  assert.ok(localization['media.school.teacher.literacy-and-numbers.classroom.caption'].ru.includes('Грамотность и счёт'));

  assert.ok(localization['presentation.static.school-course-etiquette-and-presentation.alt'].ru.includes('Этикет и самопрезентация'));
  assert.ok(localization['presentation.static.school-course-etiquette-and-presentation.caption'].ru.includes('Этикет и самопрезентация'));
  assert.ok(localization['media.school.teacher.etiquette-and-presentation.classroom.alt'].ru.includes('Этикет и самопрезентация'));
  assert.ok(localization['media.school.teacher.etiquette-and-presentation.classroom.caption'].ru.includes('Этикет и самопрезентация'));

  assert.match(localization['presentation.static.school-course-arcana.alt'].en,/^An Arcana /);
  assert.match(localization['presentation.static.school-course-etiquette-and-presentation.alt'].en,/^An Etiquette & Presentation /);
  assert.match(localization['presentation.static.school-course-arts-and-performance.alt'].en,/^An Arts & Performance /);
});
