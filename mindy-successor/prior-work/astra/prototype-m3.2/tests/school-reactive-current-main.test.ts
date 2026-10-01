import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createRequire} from 'node:module';

import {dispatch,eligible,parseSave} from '../src/core/engine.ts';
import {SCHOOL_COURSES} from '../src/core/school.ts';
import {SCHOOL_TEACHER_REACTION_BINDINGS,schoolTeacherReactionBinding} from '../src/ui/schoolReactive.ts';
import type {Save} from '../src/core/schema.ts';
import {catalog,started} from './helpers.ts';

const localization=JSON.parse(readFileSync('content/localization.json','utf8')).strings;
const {JSDOM,VirtualConsole}=createRequire(import.meta.url)('jsdom');
const html=readFileSync('dist/index.html','utf8');
const bundle=readFileSync('dist/app.js','utf8');
const data=JSON.parse(readFileSync('dist/content.json','utf8'));

function resolvePending(input:Save){
  let s=input;
  let guard=0;
  while(s.run.pending){
    if(++guard>12)throw new Error('School reactive scene loop');
    const event=catalog.events.find(e=>e.id===s.run.pending!.eventId);
    assert.ok(event,s.run.pending.eventId);
    const allowed=s.run.pending.allowedChoiceIds??event.choices.map(c=>c.id);
    const choice=event.choices.find(c=>allowed.includes(c.id)&&eligible(c.conditions,s,catalog));
    assert.ok(choice,event.id);
    s=dispatch(s,{type:'choice',id:choice.id},catalog);
  }
  return s;
}

async function wait(check:()=>boolean){
  for(let i=0;i<100;i++){
    if(check())return;
    await new Promise(r=>setTimeout(r,5));
  }
  throw new Error('UI update timed out');
}

function boot(saved:string){
  const errors:string[]=[];
  const vc=new VirtualConsole();
  vc.on('jsdomError',(e:Error)=>errors.push(e.message));
  const dom=new JSDOM(html,{url:'http://localhost:4173',runScripts:'outside-only',virtualConsole:vc});
  const w=dom.window;
  w.structuredClone=structuredClone;
  w.fetch=async()=>({ok:true,json:async()=>structuredClone(data)});
  w.confirm=()=>true;
  w.localStorage.setItem('portal-life.v1',saved);
  w.eval(bundle);
  return {dom,w,errors};
}

test('C1D-55 exact School course identity survives the existing lastAction presentation boundary',()=>{
  let s=started();
  s.run.resources.money=1000;
  const course=SCHOOL_COURSES.find(item=>item.id==='school.course.rhetoric_and_social');
  assert.ok(course);

  s=dispatch(s,{type:'schoolLesson',id:course.id},catalog);
  assert.equal(s.run.lastAction?.id,'school');
  assert.equal(s.run.lastAction?.presentationId,course.presentationId);

  const restored=parseSave(JSON.stringify(s),catalog);
  const recovered=SCHOOL_COURSES.find(item=>item.presentationId===restored.run.lastAction?.presentationId);
  assert.equal(recovered?.id,course.id);

  const binding=schoolTeacherReactionBinding(recovered!.id);
  assert.equal(binding.courseId,course.id);
  assert.equal(binding.teacherContentId,'school.teacher.cassian-reed');
  assert.ok(localization[binding.bodyKey]?.ru?.trim());
  assert.ok(localization[binding.bodyKey]?.en?.trim());
});

test('C1D-56 current generic School reactive consumer covers all exact courses without gameplay writes',()=>{
  assert.deepEqual(Object.keys(SCHOOL_TEACHER_REACTION_BINDINGS).sort(),SCHOOL_COURSES.map(course=>course.id).sort());
  for(const course of SCHOOL_COURSES){
    const binding=schoolTeacherReactionBinding(course.id);
    assert.equal(binding.courseId,course.id);
    assert.match(binding.teacherContentId,/^school\.teacher\./);
    assert.ok(localization[binding.bodyKey]?.ru?.trim(),binding.bodyKey+' ru');
    assert.ok(localization[binding.bodyKey]?.en?.trim(),binding.bodyKey+' en');
  }
});

test('C1D-56 School reactive result localizes by exact course and locale switch does not mutate Save',async()=>{
  let s=started();
  s.run.resources.money=1000;
  s=dispatch(s,{type:'schoolLesson',id:'school.course.rhetoric_and_social'},catalog);
  s=resolvePending(s);
  const restored=parseSave(JSON.stringify(s),catalog);
  const before=JSON.stringify(restored);

  const {dom,w,errors}=boot(before);
  try{
    await wait(()=>!!w.document.querySelector('.dialogue p')||errors.length>0);
    assert.deepEqual(errors,[]);
    assert.match(w.document.querySelector('.dialogue p').textContent,/Кассиан отмечает не самую остроумную реплику/);

    w.document.querySelector('[data-panel="menu"]').click();
    w.document.querySelector('#language-toggle').click();
    await wait(()=>w.document.documentElement.lang==='en');
    assert.match(w.document.querySelector('.dialogue p').textContent,/Cassian points not to the cleverest line/);
    assert.equal(w.localStorage.getItem('portal-life.v1'),before);
  }finally{
    dom.window.close();
  }
});
