import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {
  SCHOOL_COURSES,
  SCHOOL_COURSE_IDS,
  SCHOOL_LESSON_ENERGY_COST,
  SCHOOL_NIGHT_STUDY_NEXT_DAY_ENERGY_DELTA,
  SCHOOL_NIGHT_STUDY_STAT_GAIN,
  schoolNightStudyChoices
} from '../src/core/school.ts';

const fixture=JSON.parse(
  readFileSync('content/school-production-catalog-parity.fixture.json','utf8')
);
const ui=JSON.parse(
  readFileSync('content/school-production-ui.fixture.json','utf8')
);
const night=JSON.parse(
  readFileSync('content/school-night-choice-catalog.fixture.json','utf8')
);

test('production parity fixture covers exactly eight accepted School courses',()=>{
  assert.equal(fixture.expectedCourseCount,8);
  assert.equal(ui.courses.length,8);
  assert.deepEqual(fixture.courseIds,[...SCHOOL_COURSE_IDS]);
  assert.deepEqual(ui.courses.map((course:any)=>course.courseId),[...SCHOOL_COURSE_IDS]);

  for(const source of SCHOOL_COURSES){
    const accepted=ui.courses.find((course:any)=>course.courseId===source.id);
    assert.ok(accepted,source.id);
    assert.equal(accepted.label,source.label);
    assert.equal(accepted.tuition,source.tuition);
    assert.equal(accepted.energyCost,SCHOOL_LESSON_ENERGY_COST);
    assert.deepEqual(accepted.statEffects,source.statEffects);
    assert.equal(accepted.presentationId,source.presentationId);
    assert.deepEqual(
      accepted.nightStudySupportedStats,
      source.statEffects.map(effect=>effect.stat)
    );
  }
});

test('production parity fixture covers exactly the generated 24 Night-study choices',()=>{
  const generated=schoolNightStudyChoices();
  assert.equal(fixture.expectedNightChoiceCount,24);
  assert.equal(night.choices.length,24);
  assert.equal(generated.length,24);
  assert.deepEqual(
    fixture.nightChoiceIds,
    generated.map(choice=>choice.id)
  );
  assert.deepEqual(
    night.choices.map((choice:any)=>choice.choiceId),
    generated.map(choice=>choice.id)
  );
});

test('accepted Night catalog matches current School constants for every choice',()=>{
  for(const accepted of night.choices){
    const generated=schoolNightStudyChoices().find(
      choice=>choice.id===accepted.choiceId
    );
    assert.ok(generated,accepted.choiceId);
    assert.deepEqual(
      generated.effects,
      [{kind:'modifyStat',stat:accepted.stat,delta:SCHOOL_NIGHT_STUDY_STAT_GAIN}]
    );
    assert.equal(generated.nextDayEnergyDelta,SCHOOL_NIGHT_STUDY_NEXT_DAY_ENERGY_DELTA);
    assert.equal(accepted.tuition,0);
    assert.equal(accepted.daytimeEnergyCost,0);
    assert.equal(accepted.statGain,SCHOOL_NIGHT_STUDY_STAT_GAIN);
    assert.equal(accepted.mutatesLust,false);
  }
});

test('catalog parity requires no invented production-pack event',()=>{
  assert.deepEqual(fixture.invariants,{
    paidLessonEnergyCost:SCHOOL_LESSON_ENERGY_COST,
    nightTuition:0,
    nightDaytimeEnergyCost:0,
    nightStatGain:SCHOOL_NIGHT_STUDY_STAT_GAIN,
    nightNextDayEnergyDelta:SCHOOL_NIGHT_STUDY_NEXT_DAY_ENERGY_DELTA,
    ordinarySchoolMutatesLust:false,
    productionPackEventRequired:false
  });
});
