import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {SCHOOL_COURSES,SCHOOL_COURSE_IDS} from '../src/core/school.ts';

const fixture=JSON.parse(
  readFileSync('content/school-ui-disabled-state.fixture.json','utf8')
);

function evaluate(course:any,stateCase:any){
  const money=stateCase.moneyMode==='enough'
    ? course.tuition
    : course.tuition-1;
  const reasons:string[]=[];
  if(!stateCase.arrived)reasons.push('not-arrived');
  if(money<course.tuition)reasons.push('insufficient-money');
  if(stateCase.energy<1)reasons.push('insufficient-energy');
  if(stateCase.pendingScene)reasons.push('pending-scene');
  if(stateCase.activeNight)reasons.push('active-night');
  if(stateCase.activeActivity)reasons.push('active-activity');
  return {enabled:reasons.length===0,reasons};
}

test('disabled-state matrix covers all eight School courses',()=>{
  assert.deepEqual(
    fixture.courses.map((course:any)=>course.courseId),
    [...SCHOOL_COURSE_IDS]
  );
  assert.equal(fixture.courses.length,8);
  assert.equal(
    new Set(fixture.courses.map((course:any)=>course.courseId)).size,
    8
  );

  for(const source of SCHOOL_COURSES){
    const course=fixture.courses.find(
      (item:any)=>item.courseId===source.id
    );
    assert.ok(course,source.id);
    assert.equal(course.tuition,source.tuition);
  }
});

test('each course has the exact six disabled states plus one normal enabled state',()=>{
  assert.deepEqual(
    fixture.stateCases.map((state:any)=>state.id),
    [
      'insufficient-money',
      'insufficient-energy',
      'not-arrived',
      'pending-scene',
      'active-night',
      'active-activity',
      'enabled'
    ]
  );

  for(const course of fixture.courses){
    for(const stateCase of fixture.stateCases){
      const result=evaluate(course,stateCase);
      assert.equal(result.enabled,stateCase.enabled,
        `${course.courseId} / ${stateCase.id}`);

      if(stateCase.reason===null){
        assert.deepEqual(result.reasons,[],
          `${course.courseId} / ${stateCase.id}`);
      }else{
        assert.deepEqual(result.reasons,[stateCase.reason],
          `${course.courseId} / ${stateCase.id}`);
      }
    }
  }
});

test('enabled state is exactly arrived + enough tuition + one Energy + no active flow blockers',()=>{
  const enabled=fixture.stateCases.find((state:any)=>state.id==='enabled');
  assert.deepEqual(enabled,{
    id:'enabled',
    arrived:true,
    moneyMode:'enough',
    energy:1,
    pendingScene:false,
    activeNight:false,
    activeActivity:false,
    enabled:true,
    reason:null
  });

  for(const course of fixture.courses){
    assert.deepEqual(evaluate(course,enabled),{
      enabled:true,
      reasons:[]
    },course.courseId);
  }
});

test('UI matrix invents no School prerequisite beyond the locked availability blockers',()=>{
  assert.equal(fixture.noAdditionalPrerequisites,true);
  const serialized=JSON.stringify(fixture).toLowerCase();
  for(const forbidden of [
    'certificate',
    'milestone',
    'teacher',
    'relationship',
    'career',
    'threshold',
    'lessons_completed'
  ]){
    assert.equal(serialized.includes(forbidden),false,forbidden);
  }
});
