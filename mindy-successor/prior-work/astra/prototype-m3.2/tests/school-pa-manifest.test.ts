import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {
  SCHOOL_COURSES,
  SCHOOL_COURSE_IDS,
  SCHOOL_LESSON_ENERGY_COST,
  SCHOOL_NIGHT_STUDY_NEXT_DAY_ENERGY_DELTA,
  SCHOOL_NIGHT_STUDY_STAT_GAIN,
  schoolNightStudyChoice,
  type SchoolCourseId
} from '../src/core/school.ts';
import type {Stat} from '../src/core/schema.ts';

type ManifestCourse={
  courseId:SchoolCourseId;
  trackId:string;
  tuition:number;
  currentDayEnergyCost:number;
  statEffects:Array<{stat:Stat;amount:number}>;
  nightStudySupportedStats:Stat[];
  presentationId:string;
};

type Manifest={
  formatVersion:number;
  id:string;
  lockedCourseCount:number;
  lessonSemantics:{
    currentDayEnergyCost:number;
    atomicPrecheck:string[];
    ordinarySchoolChangesLust:boolean;
  };
  nightStudySemantics:{
    consumesNightSlot:boolean;
    tuition:number;
    currentDayEnergyCost:number;
    selectedSupportedStatGain:number;
    nextDayEnergyDelta:number;
  };
  courses:ManifestCourse[];
};

const manifest=JSON.parse(
  readFileSync('content/school-product-acceptance.fixture-manifest.json','utf8')
) as Manifest;

const expectedPresentationIds=[
  'school/literacy-and-numbers/lesson/default',
  'school/arcana/lesson/default',
  'school/rhetoric-and-social/lesson/default',
  'school/etiquette-and-presentation/lesson/default',
  'school/field-craft/lesson/default',
  'school/physical-training/lesson/default',
  'school/arts-and-performance/lesson/default',
  'school/body-confidence/lesson/default'
];

test('School PA manifest preserves the eight locked gameplay course IDs and exact lesson mechanics',()=>{
  assert.equal(manifest.formatVersion,1);
  assert.equal(manifest.lockedCourseCount,8);
  assert.deepEqual(manifest.courses.map(course=>course.courseId),[...SCHOOL_COURSE_IDS]);
  assert.equal(manifest.courses.length,SCHOOL_COURSES.length);

  for(const course of SCHOOL_COURSES){
    const entry=manifest.courses.find(item=>item.courseId===course.id);
    assert.ok(entry,`missing manifest course ${course.id}`);
    assert.equal(entry.trackId,course.trackId);
    assert.equal(entry.tuition,course.tuition);
    assert.equal(entry.currentDayEnergyCost,SCHOOL_LESSON_ENERGY_COST);
    assert.deepEqual(entry.statEffects,course.statEffects);
    assert.deepEqual(
      entry.nightStudySupportedStats,
      course.statEffects.map(effect=>effect.stat)
    );
  }

  assert.equal(manifest.lessonSemantics.currentDayEnergyCost,SCHOOL_LESSON_ENERGY_COST);
  assert.deepEqual(manifest.lessonSemantics.atomicPrecheck,['money','currentDayEnergy']);
  assert.equal(manifest.lessonSemantics.ordinarySchoolChangesLust,false);
  assert.equal(
    manifest.courses.some(course=>
      course.statEffects.some(effect=>(effect.stat as string)==='lust')
    ),
    false
  );
});

test('School PA presentation identity uses the merged kebab-case namespace without changing gameplay IDs',()=>{
  assert.deepEqual(
    manifest.courses.map(course=>course.presentationId),
    expectedPresentationIds
  );

  for(const entry of manifest.courses){
    const segments=entry.presentationId.split('/');
    assert.equal(segments.length,4);
    assert.equal(segments[0],'school');
    assert.equal(segments[2],'lesson');
    assert.equal(segments[3],'default');
    assert.match(segments[1],/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
    assert.equal(segments[1].includes('_'),false);
  }

  assert.equal(
    manifest.courses.find(course=>course.courseId==='school.course.field_craft')?.presentationId,
    'school/field-craft/lesson/default'
  );
});

test('School PA manifest maps Night-study hooks to supported course stats with locked zero-cost semantics',()=>{
  assert.deepEqual(manifest.nightStudySemantics,{
    consumesNightSlot:true,
    tuition:0,
    currentDayEnergyCost:0,
    selectedSupportedStatGain:SCHOOL_NIGHT_STUDY_STAT_GAIN,
    nextDayEnergyDelta:SCHOOL_NIGHT_STUDY_NEXT_DAY_ENERGY_DELTA
  });

  for(const entry of manifest.courses){
    for(const stat of entry.nightStudySupportedStats){
      const choice=schoolNightStudyChoice(entry.courseId,stat);
      assert.deepEqual(
        choice.effects,
        [{kind:'modifyStat',stat,delta:SCHOOL_NIGHT_STUDY_STAT_GAIN}]
      );
      assert.equal(choice.nextDayEnergyDelta,SCHOOL_NIGHT_STUDY_NEXT_DAY_ENERGY_DELTA);
      assert.deepEqual(choice.nextDayEffects,[]);
      assert.equal(choice.effects.some(effect=>effect.kind==='modifyResource'),false);
      assert.equal(choice.effects.some(effect=>effect.kind==='modifyEnergy'),false);
    }
  }
});

test('School PA manifest contains no authorial teacher, milestone, certificate, or ending payloads',()=>{
  const text=JSON.stringify(manifest);
  for(const forbidden of ['teacher','milestone','certificate','ending']){
    assert.equal(text.includes(forbidden),false,forbidden);
  }
});
