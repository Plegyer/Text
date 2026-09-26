import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {
  SCHOOL_COURSES,
  SCHOOL_COURSE_IDS,
  SCHOOL_NIGHT_STUDY_NEXT_DAY_ENERGY_DELTA,
  SCHOOL_NIGHT_STUDY_STAT_GAIN,
  schoolNightStudyChoice,
  schoolNightStudyChoices
} from '../src/core/school.ts';
import {stats,type Stat} from '../src/core/schema.ts';

type CatalogChoice={
  choiceId:string;
  courseId:typeof SCHOOL_COURSE_IDS[number];
  trackId:string;
  stat:Stat;
  statGain:number;
  tuition:number;
  daytimeEnergyCost:number;
  nextDayEnergyDelta:number;
  mutatesLust:boolean;
  presentationFamily:string;
};

type CatalogFixture={
  formatVersion:number;
  id:string;
  semantics:{
    tuition:number;
    daytimeEnergyCost:number;
    selectedSupportedStatGain:number;
    nextDayEnergyDelta:number;
    mutatesLust:boolean;
  };
  choices:CatalogChoice[];
};

const fixture=JSON.parse(
  readFileSync('content/school-night-choice-catalog.fixture.json','utf8')
) as CatalogFixture;

function presentationFamily(presentationId:string){
  return presentationId.replace(/\/lesson\/default$/,'');
}

function generatedSurface():CatalogChoice[]{
  return SCHOOL_COURSES.flatMap(course=>
    course.statEffects.map(effect=>{
      const choice=schoolNightStudyChoice(course.id,effect.stat);
      return {
        choiceId:choice.id,
        courseId:course.id,
        trackId:course.trackId,
        stat:effect.stat,
        statGain:SCHOOL_NIGHT_STUDY_STAT_GAIN,
        tuition:0,
        daytimeEnergyCost:0,
        nextDayEnergyDelta:SCHOOL_NIGHT_STUDY_NEXT_DAY_ENERGY_DELTA,
        mutatesLust:false,
        presentationFamily:presentationFamily(course.presentationId)
      };
    })
  );
}

test('Night-study catalog is the complete generated surface with unique stable choice IDs',()=>{
  const generated=generatedSurface();

  assert.equal(fixture.formatVersion,1);
  assert.equal(fixture.choices.length,24);
  assert.equal(schoolNightStudyChoices().length,24);
  assert.equal(new Set(fixture.choices.map(choice=>choice.choiceId)).size,24);
  assert.deepEqual(fixture.choices,generated);
});

test('every Night-study choice maps to its locked course, track, supported stat, and semantic presentation family',()=>{
  for(const entry of fixture.choices){
    const course=SCHOOL_COURSES.find(item=>item.id===entry.courseId);
    assert.ok(course,entry.courseId);
    assert.equal(entry.trackId,course.trackId,entry.choiceId);
    assert.ok(
      course.statEffects.some(effect=>effect.stat===entry.stat),
      entry.choiceId
    );
    assert.equal(entry.presentationFamily,presentationFamily(course.presentationId),entry.choiceId);

    const segments=entry.presentationFamily.split('/');
    assert.equal(segments.length,2,entry.choiceId);
    assert.equal(segments[0],'school',entry.choiceId);
    assert.match(segments[1],/^[a-z0-9]+(?:-[a-z0-9]+)*$/,entry.choiceId);
    assert.equal(segments[1].includes('_'),false,entry.choiceId);
  }
});

test('every Night-study choice is exactly +2 selected stat, zero tuition, zero daytime Energy, next-day Energy -1, and no Lust mutation',()=>{
  assert.deepEqual(fixture.semantics,{
    tuition:0,
    daytimeEnergyCost:0,
    selectedSupportedStatGain:SCHOOL_NIGHT_STUDY_STAT_GAIN,
    nextDayEnergyDelta:SCHOOL_NIGHT_STUDY_NEXT_DAY_ENERGY_DELTA,
    mutatesLust:false
  });

  for(const entry of fixture.choices){
    const runtimeChoice=schoolNightStudyChoice(entry.courseId,entry.stat);

    assert.equal(entry.statGain,SCHOOL_NIGHT_STUDY_STAT_GAIN,entry.choiceId);
    assert.equal(entry.tuition,0,entry.choiceId);
    assert.equal(entry.daytimeEnergyCost,0,entry.choiceId);
    assert.equal(entry.nextDayEnergyDelta,SCHOOL_NIGHT_STUDY_NEXT_DAY_ENERGY_DELTA,entry.choiceId);
    assert.equal(entry.mutatesLust,false,entry.choiceId);
    assert.notEqual(entry.stat as string,'lust',entry.choiceId);

    assert.deepEqual(
      runtimeChoice.effects,
      [{kind:'modifyStat',stat:entry.stat,delta:SCHOOL_NIGHT_STUDY_STAT_GAIN}],
      entry.choiceId
    );
    assert.deepEqual(runtimeChoice.nextDayEffects,[],entry.choiceId);
    assert.equal(
      runtimeChoice.nextDayEnergyDelta,
      SCHOOL_NIGHT_STUDY_NEXT_DAY_ENERGY_DELTA,
      entry.choiceId
    );
    assert.equal(runtimeChoice.effects.some(effect=>effect.kind==='modifyResource'),false,entry.choiceId);
    assert.equal(runtimeChoice.effects.some(effect=>effect.kind==='modifyEnergy'),false,entry.choiceId);
  }
});

test('Night-study catalog covers every locked course and all 12 progression-stat families',()=>{
  assert.deepEqual(
    [...new Set(fixture.choices.map(choice=>choice.courseId))],
    [...SCHOOL_COURSE_IDS]
  );
  assert.deepEqual(
    [...new Set(fixture.choices.map(choice=>choice.stat))].sort(),
    [...stats].sort()
  );
});

test('no unsupported course/stat pair is accepted or present in the catalog',()=>{
  for(const course of SCHOOL_COURSES){
    const supported=new Set(course.statEffects.map(effect=>effect.stat));
    const fixtureStats=fixture.choices
      .filter(choice=>choice.courseId===course.id)
      .map(choice=>choice.stat);

    assert.deepEqual(
      fixtureStats,
      course.statEffects.map(effect=>effect.stat),
      course.id
    );

    for(const stat of stats){
      if(supported.has(stat))continue;
      assert.equal(
        fixture.choices.some(choice=>choice.courseId===course.id&&choice.stat===stat),
        false,
        `${course.id} / ${stat}`
      );
      assert.throws(
        ()=>schoolNightStudyChoice(course.id,stat),
        /not supported/,
        `${course.id} / ${stat}`
      );
    }
  }
});
