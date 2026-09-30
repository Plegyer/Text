import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createRequire} from 'node:module';

import {dispatch} from '../src/core/engine.ts';
import {SCHOOL_COURSES} from '../src/core/school.ts';
import {SCHOOL_TEACHER_REACTION_BINDINGS,schoolTeacherReactionBinding} from '../src/ui/schoolReactive.ts';
import {catalog,started} from './helpers.ts';

const fixture=JSON.parse(readFileSync('content/school-late-career-teacher-reactions-v1.fixture.json','utf8'));
const localization=JSON.parse(readFileSync('content/localization.json','utf8')).strings;
const {JSDOM,VirtualConsole}=createRequire(import.meta.url)('jsdom');
const html=readFileSync('dist/index.html','utf8');
const bundle=readFileSync('dist/app.js','utf8');
const data=JSON.parse(readFileSync('dist/content.json','utf8'));

async function wait(check:()=>boolean){
  for(let i=0;i<100;i++){
    if(check())return;
    await new Promise(r=>setTimeout(r,5));
  }
  throw new Error('UI update timed out');
}

function schoolResult(courseId:Parameters<typeof dispatch>[1] extends {type:'schoolLesson';id:infer I}?I:never){
  let s=started();
  s.run.resources.money=2_000;
  return dispatch(s,{type:'schoolLesson',id:courseId},catalog);
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

test('C1D-55 exact paid course identity is recoverable from existing School lastAction presentationId',()=>{
  for(const course of SCHOOL_COURSES){
    const s=schoolResult(course.id);
    assert.equal(s.run.lastAction?.id,'school',course.id);
    assert.equal(s.run.lastAction?.presentationId,course.presentationId,course.id);
    const recovered=SCHOOL_COURSES.find(item=>item.presentationId===s.run.lastAction?.presentationId);
    assert.equal(recovered?.id,course.id,course.id);
  }
});

test('C1D-56 School reactive bindings exactly mirror the approved one-to-one Chat 5 course/teacher mapping',()=>{
  assert.equal(Object.keys(SCHOOL_TEACHER_REACTION_BINDINGS).length,8);
  for(const variant of fixture.variants){
    const binding=schoolTeacherReactionBinding(variant.sourceCourseId);
    assert.equal(binding.courseId,variant.sourceCourseId);
    assert.equal(binding.teacherContentId,variant.teacherContentId);
    assert.equal(binding.bodyKey,variant.keys.body);
    assert.deepEqual(localization[binding.bodyKey],fixture.strings[binding.bodyKey]);
    assert.ok(localization[binding.bodyKey]?.ru?.trim(),binding.bodyKey+' ru');
    assert.ok(localization[binding.bodyKey]?.en?.trim(),binding.bodyKey+' en');
  }
});

test('C1D-56 exact-course School reactive text is player-facing and locale switching does not mutate Save',async()=>{
  const state=schoolResult('school.course.rhetoric_and_social');
  assert.equal(state.run.lastAction?.presentationId,'school/rhetoric-and-social/lesson/default');
  const saved=JSON.stringify(state);
  const {dom,w,errors}=boot(saved);
  try{
    await wait(()=>!!w.document.querySelector('.dialogue p')||errors.length>0);
    assert.deepEqual(errors,[]);
    assert.match(w.document.querySelector('.dialogue p').textContent,/Кассиан перечисляет разные рабочие ситуации/);
    const before=w.localStorage.getItem('portal-life.v1');

    w.document.querySelector('[data-panel="menu"]').click();
    w.document.querySelector('#language-toggle').click();
    await wait(()=>w.document.documentElement.lang==='en');
    assert.match(w.document.querySelector('.dialogue p').textContent,/Cassian lists very different work situations/);
    assert.equal(w.localStorage.getItem('portal-life.v1'),before);
  }finally{
    dom.window.close();
  }
});
