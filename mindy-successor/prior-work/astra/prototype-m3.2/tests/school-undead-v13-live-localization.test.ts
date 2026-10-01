import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

import {dispatch,eligible,parseSave} from '../src/core/engine.ts';
import {localizationSchema,resolveLocalizedText} from '../src/core/localization.ts';
import type {Save} from '../src/core/schema.ts';
import {catalog,started} from './helpers.ts';

const localization=localizationSchema.parse(JSON.parse(readFileSync('content/localization.json','utf8')));
const pack=JSON.parse(readFileSync('content/packs/undead-farm-school.json','utf8'));
const expected=[
  {event:'undead-farm.school.arcana-research',course:'school.course.arcana',media:'school.teacher.arcana.classroom',teacherRu:'Илира Венн',teacherEn:'Ilyra Venn'},
  {event:'undead-farm.school.management-records',course:'school.course.literacy_and_numbers',media:'school.teacher.literacy-and-numbers.classroom',teacherRu:'Мара Фен',teacherEn:'Mara Fen'}
] as const;

function ready():Save{
  const s=started();
  s.run.resources.money=5_000;
  s.run.dayState.energyCurrent=3;
  s.run.progression.careers['undead-farm']={stage:'reliable-helper',shifts:0,counters:{completed_shifts:1},choices:{},facts:['first-shift-complete']};
  return s;
}

function settlePending(state:Save){
  let s=state,guard=0;
  while(s.run.pending){
    if(++guard>40)throw new Error('pending scene loop');
    const event=catalog.events.find(e=>e.id===s.run.pending!.eventId);
    assert.ok(event,s.run.pending.eventId);
    const choice=event.choices.find(c=>eligible(c.conditions,s,catalog));
    assert.ok(choice,event.id);
    s=dispatch(s,{type:'choice',id:choice.id},catalog);
  }
  return s;
}

test('C5-138..140 live Undead School scenes reuse current teachers with RU EN media and event coverage',()=>{
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
    assert.ok(alt?.ru?.includes(item.teacherRu),item.media+' ru teacher');
    assert.ok(alt?.en?.includes(item.teacherEn),item.media+' en teacher');
    const course=localization.strings[`${item.course}.description`];
    assert.ok(course?.ru?.includes(item.teacherRu),item.course+' ru');
    assert.ok(course?.en?.includes(item.teacherEn),item.course+' en');
  }
});

test('C5-141 locale resolution and reload preserve exact Undead hook identity and typed journal ref',()=>{
  let s=ready();
  for(let i=0;i<2;i++){
    s=dispatch(s,{type:'schoolLesson',id:'school.course.arcana'},catalog);
    s=settlePending(s);
  }
  s=dispatch(s,{type:'schoolLesson',id:'school.course.arcana'},catalog);
  assert.equal(s.run.pending?.eventId,'undead-farm.school.arcana-research');

  const before=JSON.stringify(s);
  assert.notEqual(
    resolveLocalizedText(localization,'event.undead-farm.school.arcana-research.title','ru'),
    resolveLocalizedText(localization,'event.undead-farm.school.arcana-research.title','en')
  );
  assert.equal(JSON.stringify(s),before);

  s=parseSave(before,catalog);
  assert.equal(s.run.pending?.eventId,'undead-farm.school.arcana-research');
  s=dispatch(s,{type:'choice',id:'apply'},catalog);
  assert.deepEqual(s.run.historyState.journalRefs.at(-1),{
    kind:'eventChoice',
    eventId:'undead-farm.school.arcana-research',
    choiceId:'apply'
  });

  const after=JSON.parse(JSON.stringify(s));
  s=parseSave(JSON.stringify(s),catalog);
  assert.deepEqual(JSON.parse(JSON.stringify(s)),after);
  assert.ok(s.run.progression.careers['undead-farm'].facts.includes('school-research-ready'));
});
