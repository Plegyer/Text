import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {
  SCHOOL_COURSES,
  SCHOOL_COURSE_IDS,
  SCHOOL_LESSON_ENERGY_COST
} from '../src/core/school.ts';

type PickerState={
  arrived:boolean;
  money:number;
  energy:number;
  pendingScene:boolean;
  activeNight:boolean;
  activeActivity:boolean;
};

const fixture=JSON.parse(
  readFileSync('content/school-picker-interaction.fixture.json','utf8')
);

function disabledReasons(
  state:PickerState,
  tuition:number
):string[]{
  const reasons:string[]=[];
  if(!state.arrived)reasons.push('not-arrived');
  if(state.money<tuition)reasons.push('insufficient-money');
  if(state.energy<SCHOOL_LESSON_ENERGY_COST)reasons.push('insufficient-energy');
  if(state.pendingScene)reasons.push('pending-scene');
  if(state.activeNight)reasons.push('active-night');
  if(state.activeActivity)reasons.push('active-activity');
  return reasons;
}

test('School picker contract covers all eight locked paid courses exactly once',()=>{
  assert.equal(fixture.courses.length,8);
  assert.deepEqual(
    fixture.courses.map((course:any)=>course.courseId),
    [...SCHOOL_COURSE_IDS]
  );
  assert.equal(
    new Set(fixture.courses.map((course:any)=>course.courseId)).size,
    8
  );

  for(const source of SCHOOL_COURSES){
    const course=fixture.courses.find(
      (item:any)=>item.courseId===source.id
    );
    assert.ok(course,source.id);
    assert.equal(course.label,source.label);
    assert.equal(course.tuition,source.tuition);
    assert.equal(course.energyCost,SCHOOL_LESSON_ENERGY_COST);
    assert.deepEqual(
      course.statPackage,
      source.statEffects.map(effect=>({
        stat:effect.stat,
        delta:effect.amount
      }))
    );
    assert.equal(course.presentationId,source.presentationId);
  }
});

test('School picker disabled-state reasons are deterministic and independent',()=>{
  const course=fixture.courses.find(
    (item:any)=>item.courseId==='school.course.arcana'
  );
  assert.ok(course);

  const ready:PickerState={
    arrived:true,
    money:course.tuition,
    energy:1,
    pendingScene:false,
    activeNight:false,
    activeActivity:false
  };
  assert.deepEqual(disabledReasons(ready,course.tuition),[]);

  assert.deepEqual(
    disabledReasons({...ready,arrived:false},course.tuition),
    ['not-arrived']
  );
  assert.deepEqual(
    disabledReasons({...ready,money:course.tuition-1},course.tuition),
    ['insufficient-money']
  );
  assert.deepEqual(
    disabledReasons({...ready,energy:0},course.tuition),
    ['insufficient-energy']
  );
  assert.deepEqual(
    disabledReasons({...ready,pendingScene:true},course.tuition),
    ['pending-scene']
  );
  assert.deepEqual(
    disabledReasons({...ready,activeNight:true},course.tuition),
    ['active-night']
  );
  assert.deepEqual(
    disabledReasons({...ready,activeActivity:true},course.tuition),
    ['active-activity']
  );

  assert.deepEqual(
    disabledReasons({
      arrived:false,
      money:0,
      energy:0,
      pendingScene:true,
      activeNight:true,
      activeActivity:true
    },course.tuition),
    [
      'not-arrived',
      'insufficient-money',
      'insufficient-energy',
      'pending-scene',
      'active-night',
      'active-activity'
    ]
  );
});

test('ordinary School picker packages never mutate Lust',()=>{
  for(const course of fixture.courses){
    assert.equal(
      course.statPackage.some((effect:any)=>effect.stat==='lust'),
      false,
      course.courseId
    );
  }
});

test('gameplay course IDs stay unchanged and presentation IDs stay semantic kebab-case',()=>{
  assert.deepEqual(
    fixture.courses.map((course:any)=>course.courseId),
    [...SCHOOL_COURSE_IDS]
  );

  for(const course of fixture.courses){
    const segments=course.presentationId.split('/');
    assert.equal(segments.length,4,course.courseId);
    assert.equal(segments[0],'school',course.courseId);
    assert.equal(segments[2],'lesson',course.courseId);
    assert.equal(segments[3],'default',course.courseId);
    assert.match(
      segments[1],
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      course.courseId
    );
    assert.equal(
      segments.some((segment:string)=>segment.includes('_')),
      false,
      course.courseId
    );
  }
});

test('picker fixture contains no invented milestone, certificate, teacher, or threshold contract',()=>{
  const serialized=JSON.stringify(fixture).toLowerCase();
  for(const forbidden of [
    'milestone',
    'certificate',
    'teacher',
    'threshold'
  ]){
    assert.equal(serialized.includes(forbidden),false,forbidden);
  }

  assert.deepEqual(
    fixture.disabledReasons.map((reason:any)=>reason.code),
    [
      'not-arrived',
      'insufficient-money',
      'insufficient-energy',
      'pending-scene',
      'active-night',
      'active-activity'
    ]
  );
});
