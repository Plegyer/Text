import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {
  SCHOOL_COURSES,
  SCHOOL_COURSE_IDS,
  SCHOOL_LESSON_ENERGY_COST,
  schoolNightStudyChoice
} from '../src/core/school.ts';
import {stats,type Stat} from '../src/core/schema.ts';

type FixtureCourse={
  courseId:string;
  label:string;
  tuition:number;
  energyCost:number;
  statEffects:Array<{stat:Stat;amount:number}>;
  presentationId:string;
  nightStudySupportedStats:Stat[];
};

const manifest=JSON.parse(
  readFileSync('content/school-production-ui.fixture.json','utf8')
) as {formatVersion:number;id:string;courses:FixtureCourse[]};

test('production School UI fixture matches all eight locked courses exactly',()=>{
  assert.equal(manifest.formatVersion,1);
  assert.equal(manifest.courses.length,8);
  assert.deepEqual(manifest.courses.map(course=>course.courseId),[...SCHOOL_COURSE_IDS]);

  for(const source of SCHOOL_COURSES){
    const course=manifest.courses.find(item=>item.courseId===source.id);
    assert.ok(course,`missing ${source.id}`);
    assert.equal(course.label,source.label);
    assert.equal(course.tuition,source.tuition);
    assert.equal(course.energyCost,SCHOOL_LESSON_ENERGY_COST);
    assert.deepEqual(course.statEffects,source.statEffects);
    assert.deepEqual(
      course.nightStudySupportedStats,
      source.statEffects.map(effect=>effect.stat)
    );
  }
});

test('paid School coverage spans every progression stat and never targets Lust',()=>{
  const covered=[...new Set(
    manifest.courses.flatMap(course=>course.statEffects.map(effect=>effect.stat))
  )].sort();

  assert.deepEqual(covered,[...stats].sort());
  assert.equal(
    manifest.courses.some(course=>
      course.statEffects.some(effect=>(effect.stat as string)==='lust')
    ),
    false
  );
});

test('course and presentation identities are unique and presentation namespace is kebab-case',()=>{
  const courseIds=manifest.courses.map(course=>course.courseId);
  const presentationIds=manifest.courses.map(course=>course.presentationId);

  assert.equal(new Set(courseIds).size,courseIds.length);
  assert.equal(new Set(presentationIds).size,presentationIds.length);

  for(const presentationId of presentationIds){
    const segments=presentationId.split('/');
    assert.equal(segments.length,4);
    assert.equal(segments[0],'school');
    assert.equal(segments[2],'lesson');
    assert.equal(segments[3],'default');
    assert.match(segments[1],/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
    assert.equal(segments.some(segment=>segment.includes('_')),false);
  }
});

test('every declared Night-study stat is supported by its locked course package',()=>{
  for(const course of manifest.courses){
    for(const stat of course.nightStudySupportedStats){
      const choice=schoolNightStudyChoice(course.courseId as typeof SCHOOL_COURSE_IDS[number],stat);
      assert.deepEqual(choice.effects,[{kind:'modifyStat',stat,delta:2}]);
      assert.equal(choice.nextDayEnergyDelta,-1);
    }
  }
});

test('production School UI fixture contains no invented teacher, milestone, ending, certificate, or threshold fields',()=>{
  const forbidden=['teacher','milestone','ending','certificate','threshold'];
  const keys:string[]=[];

  const visit=(value:unknown)=>{
    if(Array.isArray(value)){for(const item of value)visit(item);return;}
    if(value&&typeof value==='object'){
      for(const [key,child] of Object.entries(value as Record<string,unknown>)){
        keys.push(key.toLowerCase());
        visit(child);
      }
    }
  };
  visit(manifest);

  for(const key of forbidden)assert.equal(keys.includes(key),false,key);
});
