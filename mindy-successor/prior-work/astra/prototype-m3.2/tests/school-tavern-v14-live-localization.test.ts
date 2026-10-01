import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

import {dispatch,eligible,parseSave} from '../src/core/engine.ts';
import {localizationSchema,resolveLocalizedText} from '../src/core/localization.ts';
import type {Save} from '../src/core/schema.ts';
import {catalog,started} from './helpers.ts';

const localization=localizationSchema.parse(JSON.parse(readFileSync('content/localization.json','utf8')));
const pack=JSON.parse(readFileSync('content/packs/tavern-school.json','utf8'));
const expected=[
  {event:'tavern.school.records',course:'school.course.literacy_and_numbers',media:'school.teacher.literacy-and-numbers.classroom',teacherRu:'Мара Фен',teacherEn:'Mara Fen'},
  {event:'tavern.school.broker',course:'school.course.rhetoric_and_social',media:'school.teacher.rhetoric-and-social.classroom',teacherRu:'Кассиан Рид',teacherEn:'Cassian Reed'},
  {event:'tavern.school.etiquette',course:'school.course.etiquette_and_presentation',media:'school.teacher.etiquette-and-presentation.classroom',teacherRu:'Элиан Марроу',teacherEn:'Eliane Marrow'},
  {event:'tavern.school.arcana',course:'school.course.arcana',media:'school.teacher.arcana.classroom',teacherRu:'Илира Венн',teacherEn:'Ilyra Venn'}
] as const;

function ready():Save{
  const s=started();
  s.run.resources.money=10_000;
  s.run.dayState.energyCurrent=3;
  s.run.progression.careers.tavern={stage:'trusted-worker',shifts:0,counters:{completed_shifts:1},choices:{},facts:['first-shift-complete']};
  return s;
}
function settlePending(state:Save){
  let s=state,guard=0;
  while(s.run.pending){
    if(++guard>60)throw new Error('pending loop');
    const event=catalog.events.find(e=>e.id===s.run.pending!.eventId);
    assert.ok(event,s.run.pending.eventId);
    const choice=event.choices.find(c=>eligible(c.conditions,s,catalog));
    assert.ok(choice,event.id);
    s=dispatch(s,{type:'choice',id:choice.id},catalog);
  }
  return s;
}

test('C5-152/C5-153 live Tavern School scenes reuse existing teachers with complete RU/EN coverage',()=>{
  for(const item of expected){
    const event=pack.events.find((x:any)=>x.id===item.event);
    assert.ok(event,item.event);
    assert.deepEqual(event.variants[0].media,[item.media]);
    for(const suffix of ['title','variant.default.text','choice.apply.label','choice.apply.text']){
      const pair=localization.strings[`event.${item.event}.${suffix}`];
      assert.ok(pair?.ru?.trim(),item.event+' '+suffix+' ru');
      assert.ok(pair?.en?.trim(),item.event+' '+suffix+' en');
      assert.notEqual(pair.ru,pair.en,item.event+' '+suffix);
    }
    const alt=localization.strings[`media.${item.media}.alt`];
    assert.ok(alt?.ru?.includes(item.teacherRu),item.media+' ru');
    assert.ok(alt?.en?.includes(item.teacherEn),item.media+' en');
    const course=localization.strings[`${item.course}.description`];
    assert.ok(course?.ru?.includes(item.teacherRu),item.course+' ru');
    assert.ok(course?.en?.includes(item.teacherEn),item.course+' en');
  }
});

test('C5-154 locale resolution and reload preserve Tavern hook identity and typed journal ref',()=>{
  let s=ready();
  for(let i=0;i<2;i++)s=settlePending(dispatch(s,{type:'schoolLesson',id:'school.course.arcana'},catalog));
  s=dispatch(s,{type:'schoolLesson',id:'school.course.arcana'},catalog);
  assert.equal(s.run.pending?.eventId,'tavern.school.arcana');

  const before=JSON.stringify(s);
  assert.notEqual(
    resolveLocalizedText(localization,'event.tavern.school.arcana.title','ru'),
    resolveLocalizedText(localization,'event.tavern.school.arcana.title','en')
  );
  assert.equal(JSON.stringify(s),before);

  s=parseSave(before,catalog);
  assert.equal(s.run.pending?.eventId,'tavern.school.arcana');
  s=dispatch(s,{type:'choice',id:'apply'},catalog);
  assert.deepEqual(s.run.historyState.journalRefs.at(-1),{
    kind:'eventChoice',eventId:'tavern.school.arcana',choiceId:'apply'
  });
  const after=JSON.parse(JSON.stringify(s));
  s=parseSave(JSON.stringify(s),catalog);
  assert.deepEqual(JSON.parse(JSON.stringify(s)),after);
  assert.ok(s.run.progression.careers.tavern.facts.includes('school-arcana-ready'));
});
