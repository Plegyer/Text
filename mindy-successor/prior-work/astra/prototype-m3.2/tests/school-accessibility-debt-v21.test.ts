import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

import {SCHOOL_COURSES} from '../src/core/school.ts';

const localization=JSON.parse(readFileSync('content/localization.json','utf8')).strings;
const presentation=JSON.parse(readFileSync('content/presentation.json','utf8'));

const rows=[
  {
    courseId:'school.course.literacy_and_numbers',
    presentationId:'school/literacy-and-numbers/lesson/default',
    courseLabel:'Literacy & Numbers',
    altKey:'presentation.static.school-course-literacy-and-numbers.alt',
    ru:'Учебная сцена курса «Грамотность и счёт» с характерными материалами и без изображения преподавателя.',
    en:'A Literacy & Numbers lesson scene with course-specific materials and no depicted teacher.'
  },
  {
    courseId:'school.course.etiquette_and_presentation',
    presentationId:'school/etiquette-and-presentation/lesson/default',
    courseLabel:'Etiquette & Presentation',
    altKey:'presentation.static.school-course-etiquette-and-presentation.alt',
    ru:'Учебная сцена курса «Этикет и самопрезентация» с характерными материалами и без изображения преподавателя.',
    en:'An Etiquette & Presentation lesson scene with course-specific materials and no depicted teacher.'
  },
  {
    courseId:'school.course.arcana',
    presentationId:'school/arcana/lesson/default',
    courseLabel:'Arcana',
    altKey:'presentation.static.school-course-arcana.alt',
    ru:'Учебная сцена курса «Аркана» с характерными материалами и без изображения преподавателя.',
    en:'An Arcana lesson scene with course-specific materials and no depicted teacher.'
  },
  {
    courseId:'school.course.arts_and_performance',
    presentationId:'school/arts-and-performance/lesson/default',
    courseLabel:'Arts & Performance',
    altKey:'presentation.static.school-course-arts-and-performance.alt',
    ru:'Учебная сцена курса «Искусство и выступление» с характерными материалами и без изображения преподавателя.',
    en:'An Arts & Performance lesson scene with course-specific materials and no depicted teacher.'
  }
] as const;

test('C5-229/C5-230/C5-231 activation re-audit: all four historical School alt debts are already corrected',()=>{
  for(const row of rows){
    const course=SCHOOL_COURSES.find(item=>item.id===row.courseId);
    assert.ok(course,row.courseId);
    assert.equal(course.presentationId,row.presentationId,row.courseId+' presentation');
    assert.equal(course.label,row.courseLabel,row.courseId+' label');

    const slot=presentation.slots?.[row.presentationId];
    assert.ok(slot?.static,row.presentationId);
    assert.equal(slot.static.altKey,row.altKey,row.presentationId+' alt key');

    assert.equal(localization[row.altKey]?.ru,row.ru,row.altKey+' ru');
    assert.equal(localization[row.altKey]?.en,row.en,row.altKey+' en');
  }
});

test('C5-232 all four active School alt keys resolve in RU/EN with exact current identity wording',()=>{
  assert.deepEqual(rows.map(row=>row.altKey),[
    'presentation.static.school-course-literacy-and-numbers.alt',
    'presentation.static.school-course-etiquette-and-presentation.alt',
    'presentation.static.school-course-arcana.alt',
    'presentation.static.school-course-arts-and-performance.alt'
  ]);

  for(const row of rows){
    assert.ok(localization[row.altKey].ru.trim(),row.altKey+' ru');
    assert.ok(localization[row.altKey].en.trim(),row.altKey+' en');
    assert.equal(presentation.slots[row.presentationId].static.altKey,row.altKey);
  }
});

test('C5-233 regression stays presentation-localization-only and preserves School course identity set',()=>{
  assert.equal(SCHOOL_COURSES.length,8);
  assert.deepEqual(
    rows.map(row=>SCHOOL_COURSES.find(course=>course.id===row.courseId)?.id),
    rows.map(row=>row.courseId)
  );

  for(const row of rows){
    const slot=presentation.slots[row.presentationId];
    assert.equal(typeof slot.static.src,'string',row.presentationId+' static source');
    assert.ok(slot.static.src.endsWith('.svg'),row.presentationId+' static source');
    assert.equal(slot.static.altKey,row.altKey,row.presentationId+' alt binding');
  }
});
