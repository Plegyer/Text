import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

import {dispatch,eligible,parseSave} from '../src/core/engine.ts';
import {localizationSchema,resolveLocalizedText} from '../src/core/localization.ts';
import type {Save} from '../src/core/schema.ts';
import {catalog,started} from './helpers.ts';

const localization=localizationSchema.parse(JSON.parse(readFileSync('content/localization.json','utf8')));
const pack=JSON.parse(readFileSync('content/packs/satyr-maid-school.json','utf8'));

const expected=[
  {
    event:'satyr-maid.school.management',
    course:'school.course.literacy_and_numbers',
    media:'school.teacher.literacy-and-numbers.classroom',
    teacherRu:'Мара Фен',
    teacherEn:'Mara Fen'
  },
  {
    event:'satyr-maid.school.rhetoric',
    course:'school.course.rhetoric_and_social',
    media:'school.teacher.rhetoric-and-social.classroom',
    teacherRu:'Кассиан Рид',
    teacherEn:'Cassian Reed'
  },
  {
    event:'satyr-maid.school.boundaries',
    course:'school.course.body_confidence',
    media:'school.teacher.body-confidence.classroom',
    teacherRu:'Сера Вей',
    teacherEn:'Sera Vey'
  }
] as const;

function ready():Save{
  const s=started();
  s.run.resources.money=5_000;
  s.run.dayState.energyCurrent=3;
  s.run.progression.careers['satyr-maid']={
    stage:'floor-rhythm',
    shifts:0,
    counters:{completed_shifts:1},
    choices:{},
    facts:['first-shift-complete']
  };
  return s;
}

function settlePending(state:Save){
  let s=state,guard=0;
  while(s.run.pending){
    if(++guard>30)throw new Error('pending scene loop');
    const event=catalog.events.find(e=>e.id===s.run.pending!.eventId);
    assert.ok(event,s.run.pending.eventId);
    const choice=event.choices.find(c=>eligible(c.conditions,s,catalog));
    assert.ok(choice,event.id);
    s=dispatch(s,{type:'choice',id:choice.id},catalog);
  }
  return s;
}

test('C5-127/C5-129 live Satyr School scenes use existing teachers with RU EN accessible media text',()=>{
  for(const item of expected){
    const event=pack.events.find((x:any)=>x.id===item.event);
    assert.ok(event,item.event);
    assert.deepEqual(event.variants[0].media,[item.media],item.event);

    for(const suffix of ['title','variant.default.text','choice.apply.label','choice.apply.text']){
      const pair=localization.strings[`event.${item.event}.${suffix}`];
      assert.ok(pair?.ru?.trim(),item.event+' '+suffix+' ru');
      assert.ok(pair?.en?.trim(),item.event+' '+suffix+' en');
      assert.notEqual(pair.ru,pair.en,item.event+' '+suffix);
    }

    const alt=localization.strings[`media.${item.media}.alt`];
    assert.ok(alt?.ru?.includes(item.teacherRu),item.media+' ru teacher alt');
    assert.ok(alt?.en?.includes(item.teacherEn),item.media+' en teacher alt');

    const course=localization.strings[`${item.course}.description`];
    assert.ok(course?.ru?.includes(item.teacherRu),item.course+' ru teacher');
    assert.ok(course?.en?.includes(item.teacherEn),item.course+' en teacher');
  }
});

test('C5-129 locale resolution and save reload preserve the exact pending Satyr gameplay identity',()=>{
  let s=ready();
  for(let i=0;i<2;i++){
    s=dispatch(s,{type:'schoolLesson',id:'school.course.literacy_and_numbers'},catalog);
    s=settlePending(s);
  }
  s=dispatch(s,{type:'schoolLesson',id:'school.course.literacy_and_numbers'},catalog);

  assert.equal(s.run.pending?.eventId,'satyr-maid.school.management');
  const pendingBefore=JSON.stringify(s);
  const titleRu=resolveLocalizedText(localization,'event.satyr-maid.school.management.title','ru');
  const titleEn=resolveLocalizedText(localization,'event.satyr-maid.school.management.title','en');
  const bodyRu=resolveLocalizedText(localization,'event.satyr-maid.school.management.variant.default.text','ru');
  const bodyEn=resolveLocalizedText(localization,'event.satyr-maid.school.management.variant.default.text','en');

  assert.notEqual(titleRu,titleEn);
  assert.notEqual(bodyRu,bodyEn);
  assert.equal(JSON.stringify(s),pendingBefore);

  s=parseSave(pendingBefore,catalog);
  assert.equal(s.run.pending?.eventId,'satyr-maid.school.management');
  assert.equal(s.run.pending?.variantId,'default');

  s=dispatch(s,{type:'choice',id:'apply'},catalog);
  const ref=s.run.historyState.journalRefs.at(-1);
  assert.deepEqual(ref,{kind:'eventChoice',eventId:'satyr-maid.school.management',choiceId:'apply'});

  const resultRu=resolveLocalizedText(localization,'event.satyr-maid.school.management.choice.apply.text','ru');
  const resultEn=resolveLocalizedText(localization,'event.satyr-maid.school.management.choice.apply.text','en');
  assert.notEqual(resultRu,resultEn);

  const afterChoice=JSON.stringify(s);
  s=parseSave(afterChoice,catalog);
  assert.deepEqual(JSON.parse(JSON.stringify(s)),JSON.parse(afterChoice));
  assert.ok(s.run.progression.careers['satyr-maid'].facts.includes('school-management-ready'));
});
