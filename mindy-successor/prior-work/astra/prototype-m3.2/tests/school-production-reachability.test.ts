import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {loadCatalog} from '../src/core/content.ts';
import {
  applyEffects,
  dispatch,
  freshSave,
  parseSave,
  resolveReactions
} from '../src/core/engine.ts';
import {
  SCHOOL_COURSES,
  SCHOOL_COURSE_IDS,
  SCHOOL_NIGHT_STUDY_NEXT_DAY_ENERGY_DELTA,
  SCHOOL_NIGHT_STUDY_STAT_GAIN,
  executeSchoolLesson,
  getSchoolCourse,
  schoolNightStudyChoices
} from '../src/core/school.ts';
import type {Catalog,Save,Stat} from '../src/core/schema.ts';

const runtime={applyEffects,resolveReactions};
const fixture=JSON.parse(
  readFileSync('content/school-production-reachability.fixture.json','utf8')
);

function definitions(){
  return {
    version:'0.1.0',
    flags:['story.arrived'],
    actions:[{
      id:'rest',
      label:'Rest',
      description:'Reachability fixture post-Night persisted action.',
      cost:{money:0,energy:0},
      conditions:[],
      effects:[],
      mode:'normal'
    }],
    endings:[],
    careers:[],
    quests:[],
    relationships:[],
    lodgings:[{
      id:'school.reachability.room',
      label:'Reachability room',
      housing:'normal',
      moneyCost:0,
      conditions:[],
      effects:[],
      nextDayEffects:[],
      nextDayEnergyDelta:0
    }],
    nightChoices:schoolNightStudyChoices(),
    activities:[]
  };
}

function pack(){
  return {
    schemaVersion:1,
    id:'school-reachability',
    reads:[],
    writes:[],
    capabilities:{reads:{},writes:{}},
    media:[{
      id:'stage.room',
      kind:'image',
      src:'assets/room.svg',
      alt:'Reachability room'
    }],
    events:[]
  };
}

function catalog():Catalog{
  return loadCatalog(definitions(),[pack()]);
}

function ready():Save{
  const state=freshSave();
  state.run.character.creation.remaining=0;
  state.run.character.creation.allocated={};
  state.run.character.creation.complete=true;
  state.run.flags['story.arrived']=true;
  state.run.resources.money=2_000;
  state.run.dayState.energyCurrent=3;
  return state;
}

type TrackProgress={
  lessons_completed:number;
  night_study_sessions:number;
};

function newTrackProgress():TrackProgress{
  return {lessons_completed:0,night_study_sessions:0};
}

function reloadProgress(progress:TrackProgress):TrackProgress{
  return JSON.parse(JSON.stringify(progress)) as TrackProgress;
}

test('reachability contract names existing APIs and marks unshipped School activation seams explicitly',()=>{
  const byStep=new Map(
    fixture.apiContract.map((entry:any)=>[entry.step,entry])
  );

  assert.equal(byStep.get('open-school')?.status,'activation-dependent');
  assert.equal(byStep.get('open-school')?.existingApi,null);
  assert.equal(
    byStep.get('select-paid-course')?.existingApi,
    'executeSchoolLesson(input, courseId, catalog, runtime)'
  );
  assert.equal(
    byStep.get('select-paid-course')?.expectedProductionCommand?.type,
    'schoolLesson'
  );
  assert.equal(
    byStep.get('select-paid-course')?.expectedProductionCommand?.status,
    'activation-dependent'
  );
  assert.equal(byStep.get('paid-lesson-school-progress')?.existingApi,null);
  assert.equal(byStep.get('paid-lesson-school-progress')?.status,'activation-dependent');
  assert.equal(byStep.get('end-day')?.existingApi,
    "dispatch(save, {type:'endDay'}, catalog)");
  assert.equal(byStep.get('choose-lodging')?.existingApi,
    "dispatch(save, {type:'chooseLodging', id}, catalog)");
  assert.equal(byStep.get('night-study')?.existingApi,
    "dispatch(save, {type:'chooseNightChoice', id}, catalog)");
  assert.equal(byStep.get('night-study-school-progress')?.existingApi,null);
  assert.equal(byStep.get('night-study-school-progress')?.status,'activation-dependent');
  assert.match(
    byStep.get('save-reload-after-lesson')?.existingApi,
    /^parseSave\(/
  );
  assert.match(
    byStep.get('save-reload-after-night')?.existingApi,
    /^parseSave\(/
  );
});

test('every locked paid course is reachable through the current School executable API with atomic payment, full package, presentation, and reload',()=>{
  const cat=catalog();

  assert.deepEqual(
    fixture.courses.map((course:any)=>course.courseId),
    [...SCHOOL_COURSE_IDS]
  );

  for(const expected of fixture.courses){
    const course=getSchoolCourse(expected.courseId);
    const input=ready();
    const beforeStats=structuredClone(input.run.character.stats);
    const lustBefore=input.run.character.lust;

    const result=executeSchoolLesson(input,course.id,cat,runtime);
    const paid=result.state;

    assert.equal(paid.run.resources.money,2_000-course.tuition,course.id);
    assert.equal(paid.run.dayState.energyCurrent,2,course.id);
    assert.equal(paid.run.character.lust,lustBefore,course.id);
    assert.equal(result.course.presentationId,expected.presentationId,course.id);
    assert.deepEqual(
      result.reactionFacts
        .filter(fact=>fact.kind==='statChanged')
        .map(fact=>fact.stat)
        .sort(),
      course.statEffects.map(effect=>effect.stat).sort(),
      course.id
    );

    for(const effect of course.statEffects){
      assert.equal(
        paid.run.character.stats[effect.stat],
        beforeStats[effect.stat]+effect.amount,
        `${course.id} / ${effect.stat}`
      );
    }

    const reload1=parseSave(JSON.stringify(paid),cat);
    const reload2=parseSave(JSON.stringify(reload1),cat);
    assert.equal(reload2.run.resources.money,2_000-course.tuition,course.id);
    assert.equal(reload2.run.dayState.energyCurrent,2,course.id);
    assert.equal(reload2.run.character.lust,lustBefore,course.id);
    for(const effect of course.statEffects){
      assert.equal(
        reload2.run.character.stats[effect.stat],
        beforeStats[effect.stat]+effect.amount,
        `${course.id} / ${effect.stat}`
      );
    }
  }
});

test('typed School counter expectations remain separate and exactly-once across fixture-level reload',()=>{
  for(const course of SCHOOL_COURSES){
    let progress=newTrackProgress();

    progress={...progress,lessons_completed:progress.lessons_completed+1};
    progress=reloadProgress(progress);
    progress=reloadProgress(progress);

    assert.deepEqual(progress,{
      lessons_completed:1,
      night_study_sessions:0
    },course.id);

    progress={...progress,night_study_sessions:progress.night_study_sessions+1};
    progress=reloadProgress(progress);
    progress=reloadProgress(progress);

    assert.deepEqual(progress,{
      lessons_completed:1,
      night_study_sessions:1
    },course.id);
  }

  assert.deepEqual(fixture.schoolOwnedProgressionExpectation,{
    perTrackCounters:{
      paidLesson:{counter:'lessons_completed',delta:1},
      nightStudy:{counter:'night_study_sessions',delta:1}
    },
    persistence:'exactly-once-across-save-reload',
    status:'activation-dependent'
  });
});

test('each course reaches end-day -> lodging -> representative Night study -> next day -> post-Night reload exactly once',()=>{
  const cat=catalog();

  for(const expected of fixture.courses){
    let state=ready();
    state.run.resources.money=777;
    state.run.dayState.energyCurrent=1;
    const stat=expected.representativeNightStudy.stat as Stat;
    state.run.character.stats[stat]=10;

    state=dispatch(state,{type:'endDay'},cat);
    assert.ok(state.run.flow.night,expected.courseId);

    state=dispatch(
      state,
      {type:'chooseLodging',id:'school.reachability.room'},
      cat
    );
    assert.equal(state.run.resources.money,777,expected.courseId);
    assert.equal(state.run.dayState.energyCurrent,1,expected.courseId);

    const preChoice=parseSave(JSON.stringify(state),cat);
    const choice=expected.representativeNightStudy;

    state=dispatch(
      preChoice,
      {type:'chooseNightChoice',id:choice.choiceId},
      cat
    );

    assert.equal(state.run.calendar.elapsedDays,1,expected.courseId);
    assert.equal(state.run.flow.night,null,expected.courseId);
    assert.equal(state.run.resources.money,777,expected.courseId);
    assert.equal(
      state.run.character.stats[stat],
      10+SCHOOL_NIGHT_STUDY_STAT_GAIN,
      expected.courseId
    );
    assert.equal(
      choice.nextDayEnergyDelta,
      SCHOOL_NIGHT_STUDY_NEXT_DAY_ENERGY_DELTA,
      expected.courseId
    );
    assert.equal(state.run.dayState.energyCurrent,2,expected.courseId);
    assert.deepEqual(
      state.run.dayState.nextDayModifiers,
      {energyDelta:0,statEffects:[],tags:[]},
      expected.courseId
    );
    assert.equal(state.run.flow.lastAction?.id,'rest',expected.courseId);
    assert.deepEqual(
      state.run.flow.lastAction?.media,
      ['stage.room'],
      expected.courseId
    );

    const reload1=parseSave(JSON.stringify(state),cat);
    const reload2=parseSave(JSON.stringify(reload1),cat);

    assert.equal(reload2.run.calendar.elapsedDays,1,expected.courseId);
    assert.equal(reload2.run.resources.money,777,expected.courseId);
    assert.equal(
      reload2.run.character.stats[stat],
      10+SCHOOL_NIGHT_STUDY_STAT_GAIN,
      expected.courseId
    );
    assert.equal(reload2.run.dayState.energyCurrent,2,expected.courseId);
  }
});

test('reachability fixture preserves exact locked course mechanics and semantic presentation IDs',()=>{
  assert.equal(fixture.courses.length,8);

  for(const source of SCHOOL_COURSES){
    const expected=fixture.courses.find((course:any)=>course.courseId===source.id);
    assert.ok(expected,source.id);
    assert.equal(expected.trackId,source.trackId);
    assert.equal(expected.tuition,source.tuition);
    assert.equal(expected.daytimeEnergyCost,1);
    assert.deepEqual(
      expected.statDeltas,
      source.statEffects.map(effect=>({stat:effect.stat,delta:effect.amount}))
    );
    assert.equal(expected.presentationId,source.presentationId);

    const segments=expected.presentationId.split('/');
    assert.equal(segments.some((segment:string)=>segment.includes('_')),false);
  }
});
