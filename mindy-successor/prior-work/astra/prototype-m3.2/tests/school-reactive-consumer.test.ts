import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createRequire} from 'node:module';

import {dispatch} from '../src/core/engine.ts';
import {SCHOOL_COURSES,type SchoolCourseId} from '../src/core/school.ts';
import {SCHOOL_TEACHER_REACTION_BINDINGS,schoolTeacherReactionBinding} from '../src/ui/schoolReactive.ts';
import {catalog,started} from './helpers.ts';

const fixture=JSON.parse(readFileSync('content/school-teacher-transfer-coverage-v2.fixture.json','utf8'));
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

function schoolResult(courseId:SchoolCourseId){
  const start=started();
  start.run.resources.money=2_000;
  let s=dispatch(start,{type:'schoolLesson',id:courseId},catalog);
  while(s.run.pending){
    const choice=s.run.pending.allowedChoiceIds?.[0];
    assert.ok(choice,'pending School scene must preserve an allowed choice');
    s=dispatch(s,{type:'choice',id:choice},catalog);
  }
  return s;
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

test('C1D-56 School reactive bindings mirror the approved current-main course/teacher transfer atlas',()=>{
  assert.equal(Object.keys(SCHOOL_TEACHER_REACTION_BINDINGS).length,8);
  for(const teacher of fixture.teachers){
    const binding=schoolTeacherReactionBinding(teacher.courseId);
    assert.equal(binding.courseId,teacher.courseId);
    assert.equal(binding.teacherContentId,teacher.teacherContentId);
    assert.equal(binding.bodyKey,teacher.keys.body);
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
    assert.match(w.document.querySelector('.dialogue p').textContent,/Кассиан сравнивает руководство, сервис, переговоры/);
    const before=w.localStorage.getItem('portal-life.v1');

    w.document.querySelector('[data-panel="menu"]').click();
    w.document.querySelector('#language-toggle').click();
    await wait(()=>w.document.documentElement.lang==='en');
    assert.match(w.document.querySelector('.dialogue p').textContent,/Cassian compares leadership, service, negotiation/);
    assert.equal(w.localStorage.getItem('portal-life.v1'),before);
  }finally{
    dom.window.close();
  }
});
