import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {
  SCHOOL_COURSES,
  SCHOOL_COURSE_IDS,
  SCHOOL_LESSON_ENERGY_COST,
  SCHOOL_NIGHT_STUDY_NEXT_DAY_ENERGY_DELTA,
  SCHOOL_NIGHT_STUDY_STAT_GAIN,
  schoolNightStudyChoice
} from '../src/core/school.ts';
import type {Stat} from '../src/core/schema.ts';

type StatDelta={stat:string;delta:number};
type CounterDelta={counter:string;delta:number};
type ReactionFamily={
  existingRuntime:string[];
  schoolOwned:string;
};

type PaidExpectation={
  kind:'paidLesson';
  command:{type:'schoolLesson';courseId:string};
  courseId:string;
  trackId:string;
  tuition:number;
  currentDayEnergyDelta:number;
  statDeltas:StatDelta[];
  schoolOwnedCounterDelta:CounterDelta;
  reactionFactFamily:ReactionFamily;
  presentationId:string;
  saveReloadExactlyOnce:{
    reapplyTuition:boolean;
    reapplyCurrentDayEnergy:boolean;
    reapplyStatDeltas:boolean;
    reapplySchoolCounterDelta:boolean;
  };
  mutatesLust:boolean;
};

type NightExpectation={
  kind:'nightStudy';
  command:{type:'chooseNightChoice';choiceId:string};
  courseId:string;
  trackId:string;
  tuition:number;
  currentDayEnergyDelta:number;
  statDeltas:StatDelta[];
  schoolOwnedCounterDelta:CounterDelta;
  reactionFactFamily:ReactionFamily;
  presentationId:string;
  nextDayEnergyDelta:number;
  saveReloadExactlyOnce:{
    reapplyTuition:boolean;
    reapplyCurrentDayEnergy:boolean;
    reapplyStatDeltas:boolean;
    reapplySchoolCounterDelta:boolean;
    reapplyNextDayEnergyDelta:boolean;
  };
  mutatesLust:boolean;
};

const fixture=JSON.parse(
  readFileSync('content/school-activation-expectations.fixture.json','utf8')
) as {
  formatVersion:number;
  id:string;
  paidLessons:PaidExpectation[];
  representativeNightStudyChoices:NightExpectation[];
};

function courseSlug(courseId:string){
  return courseId
    .slice('school.course.'.length)
    .replaceAll('_','-');
}

function assertSemanticPresentationId(id:string){
  const segments=id.split('/');
  assert.ok(segments.length>=3,id);
  for(const segment of segments){
    assert.equal(segment.includes('_'),false,id);
    assert.match(segment,/^[a-z0-9]+(?:-[a-z0-9]+)*$/,id);
  }
}

test('activation expectations cover all eight paid courses with locked mechanics and exactly-once persistence semantics',()=>{
  assert.equal(fixture.formatVersion,1);
  assert.equal(fixture.paidLessons.length,8);
  assert.deepEqual(
    fixture.paidLessons.map(entry=>entry.courseId),
    [...SCHOOL_COURSE_IDS]
  );

  for(const course of SCHOOL_COURSES){
    const entry=fixture.paidLessons.find(item=>item.courseId===course.id);
    assert.ok(entry,course.id);

    assert.deepEqual(entry.command,{type:'schoolLesson',courseId:course.id});
    assert.equal(entry.trackId,course.trackId);
    assert.equal(entry.tuition,course.tuition);
    assert.equal(entry.currentDayEnergyDelta,-SCHOOL_LESSON_ENERGY_COST);
    assert.deepEqual(
      entry.statDeltas,
      course.statEffects.map(effect=>({stat:effect.stat,delta:effect.amount}))
    );
    assert.deepEqual(
      entry.schoolOwnedCounterDelta,
      {counter:'lessons_completed',delta:1}
    );
    assert.deepEqual(entry.reactionFactFamily,{
      existingRuntime:['actionCompleted','statChanged'],
      schoolOwned:'counter-delta'
    });
    assert.equal(entry.presentationId,course.presentationId);
    assertSemanticPresentationId(entry.presentationId);
    assert.deepEqual(entry.saveReloadExactlyOnce,{
      reapplyTuition:false,
      reapplyCurrentDayEnergy:false,
      reapplyStatDeltas:false,
      reapplySchoolCounterDelta:false
    });
    assert.equal(entry.mutatesLust,false);
  }
});

test('representative Night-study expectation exists for every course and matches the generated supported choice',()=>{
  assert.equal(fixture.representativeNightStudyChoices.length,8);
  assert.deepEqual(
    fixture.representativeNightStudyChoices.map(entry=>entry.courseId),
    [...SCHOOL_COURSE_IDS]
  );

  for(const entry of fixture.representativeNightStudyChoices){
    const course=SCHOOL_COURSES.find(item=>item.id===entry.courseId);
    assert.ok(course,entry.courseId);

    const stat=entry.statDeltas[0]?.stat;
    assert.ok(stat,entry.courseId);
    assert.ok(
      course.statEffects.some(effect=>effect.stat===stat),
      `${entry.courseId} / ${stat}`
    );

    const runtimeChoice=schoolNightStudyChoice(course.id,stat as Stat);

    assert.deepEqual(entry.command,{
      type:'chooseNightChoice',
      choiceId:runtimeChoice.id
    });
    assert.equal(entry.trackId,course.trackId);
    assert.equal(entry.tuition,0);
    assert.equal(entry.currentDayEnergyDelta,0);
    assert.deepEqual(
      entry.statDeltas,
      [{stat,delta:SCHOOL_NIGHT_STUDY_STAT_GAIN}]
    );
    assert.deepEqual(
      entry.schoolOwnedCounterDelta,
      {counter:'night_study_sessions',delta:1}
    );
    assert.deepEqual(entry.reactionFactFamily,{
      existingRuntime:['nightChoiceCompleted','statChanged'],
      schoolOwned:'counter-delta'
    });
    assert.equal(
      entry.presentationId,
      `school/night-study/${courseSlug(course.id)}/default`
    );
    assertSemanticPresentationId(entry.presentationId);
    assert.equal(
      entry.nextDayEnergyDelta,
      SCHOOL_NIGHT_STUDY_NEXT_DAY_ENERGY_DELTA
    );
    assert.deepEqual(entry.saveReloadExactlyOnce,{
      reapplyTuition:false,
      reapplyCurrentDayEnergy:false,
      reapplyStatDeltas:false,
      reapplySchoolCounterDelta:false,
      reapplyNextDayEnergyDelta:false
    });
    assert.equal(entry.mutatesLust,false);
  }
});

test('paid and Night activation expectations keep School-owned counters semantically separate',()=>{
  for(const courseId of SCHOOL_COURSE_IDS){
    const paid=fixture.paidLessons.find(entry=>entry.courseId===courseId);
    const night=fixture.representativeNightStudyChoices.find(
      entry=>entry.courseId===courseId
    );

    assert.ok(paid&&night,courseId);
    assert.deepEqual(
      paid.schoolOwnedCounterDelta,
      {counter:'lessons_completed',delta:1}
    );
    assert.deepEqual(
      night.schoolOwnedCounterDelta,
      {counter:'night_study_sessions',delta:1}
    );
  }
});

test('activation expectation fixture does not introduce Lust mutations or authorial School thresholds',()=>{
  assert.equal(
    [...fixture.paidLessons,...fixture.representativeNightStudyChoices]
      .some(entry=>entry.mutatesLust),
    false
  );
  assert.equal(
    [...fixture.paidLessons,...fixture.representativeNightStudyChoices]
      .some(entry=>entry.statDeltas.some(delta=>delta.stat==='lust')),
    false
  );

  const keys:string[]=[];
  const visit=(value:unknown)=>{
    if(Array.isArray(value)){for(const item of value)visit(item);return;}
    if(value&&typeof value==='object'){
      for(const [key,child] of Object.entries(value as Record<string,unknown>)){
        keys.push(key);
        visit(child);
      }
    }
  };
  visit(fixture);
  assert.equal(keys.some(key=>/threshold/i.test(key)),false);
});
