import test from 'node:test';
import assert from 'node:assert/strict';
import {existsSync,readFileSync} from 'node:fs';

function read(path:string){return JSON.parse(readFileSync(path,'utf8'));}

const manifest=read('content/school-production-manifest-v11.json');
const lesson=read('content/packs/school-lesson-content-v1.json');
const life=read('content/packs/school-life-content-v1.json');
const teachers=read('content/packs/school-teachers-v1.json');
const targetLesson=read('content/packs/school-target/school-lesson-content-v1.json');

test('C5-119 live School manifest points only to existing production sources',()=>{
  assert.equal(manifest.status,'LIVE_VS_PREPARATION');
  for(const path of manifest.liveProduction.packs)assert.ok(existsSync(path),path);
  assert.ok(existsSync(manifest.liveProduction.localization));
  assert.ok(existsSync(manifest.liveProduction.runtimeCourseSource));
  assert.deepEqual(manifest.liveProduction.reachable,{courseCards:8,paidLessonGenericEvents:2,exactNightStudyEvents:24,teacherMediaIdentities:8});
  assert.deepEqual(manifest.liveProduction.compatibilityOnlyEventIds,['school-life-content-v1.after-night-study']);
});

test('C5-119 production and preparation-only School event identities do not blur together',()=>{
  assert.deepEqual(lesson.events.map((event:any)=>event.id),['school-lesson-content-v1.after-school']);
  assert.equal(teachers.events.length,0);

  const exact=life.events.filter((event:any)=>event.id.startsWith('school-life-content-v1.night-study.'));
  assert.equal(exact.length,24);
  const legacy=life.events.find((event:any)=>event.id==='school-life-content-v1.after-night-study');
  assert.ok(legacy);
  assert.deepEqual(legacy.reactionTriggers,[{kind:'nightChoiceCompleted',choice:'school.night_study.literacy_and_numbers.reason'}]);
  assert.deepEqual(legacy.conditions,[]);
  assert.deepEqual(legacy.chance,{base:0,stat:'intelligence',perPoint:0,max:0});

  const productionIds=new Set([...lesson.events,...life.events,...teachers.events].map((event:any)=>event.id));
  const stagingCourseIds=targetLesson.events
    .map((event:any)=>event.id)
    .filter((id:string)=>id!=='school-lesson-content-v1.after-school');
  assert.equal(stagingCourseIds.length,8);
  for(const id of stagingCourseIds)assert.equal(productionIds.has(id),false,id);
});

test('C5-119 unresolved School producer and milestone design remains outside live manifest',()=>{
  const serialized=JSON.stringify(manifest.liveProduction);
  assert.equal(serialized.includes('lumber.school.management-ready'),false);
  assert.equal(serialized.includes('lumber.forest.truth-known'),false);
  assert.equal(manifest.unresolvedDoNotPromote.length,4);
  assert.equal(manifest.constraints.changesCareerState,false);
  assert.equal(manifest.constraints.changesSharedRuntime,false);
  assert.equal(manifest.constraints.changesCurriculum,false);
  assert.equal(manifest.constraints.changesSaveSchema,false);
  assert.equal(manifest.constraints.changesNightFlow,false);
});
