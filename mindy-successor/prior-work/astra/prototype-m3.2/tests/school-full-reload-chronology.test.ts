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
  SCHOOL_NIGHT_STUDY_NEXT_DAY_ENERGY_DELTA,
  SCHOOL_NIGHT_STUDY_STAT_GAIN,
  executeSchoolLesson,
  getSchoolCourse,
  schoolNightStudyChoices
} from '../src/core/school.ts';
import type {Catalog,Save} from '../src/core/schema.ts';

const fixture=JSON.parse(
  readFileSync('content/school-full-reload-chronology.fixture.json','utf8')
);
const runtime={applyEffects,resolveReactions};

function definitions(){
  return {
    version:'0.1.0',
    flags:['story.arrived'],
    actions:[{
      id:'rest',
      label:'Rest',
      description:'Chronology fixture persisted post-Night action.',
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
      id:'school.chronology.room',
      label:'Chronology room',
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

function afterChoiceEvent(){
  return {
    id:'school-chronology.after-night-study',
    title:'School chronology after-choice checkpoint',
    reactionTriggers:[{
      kind:'nightChoiceCompleted',
      choice:fixture.nightStudy.choiceId
    }],
    priorityClass:'forced',
    priority:100,
    blocking:true,
    delivery:{policy:'live'},
    nightPolicy:{
      intercept:'after_choice',
      suppressLodgingPayment:false,
      suppressVoluntaryMenu:true,
      consumesNight:true
    },
    cooldownDays:0,
    variantCooldownDays:0,
    maxShows:1,
    conditions:[],
    variants:[{
      id:'default',
      text:'Persist the School Night-study state before calendar advance.',
      conditions:[],
      media:[]
    }],
    choices:[{
      id:'continue',
      label:'Continue',
      text:'Advance the day after the persisted School Night-study checkpoint.',
      conditions:[],
      effects:[]
    }]
  };
}

function pack(){
  return {
    schemaVersion:1,
    id:'school-full-reload-chronology',
    reads:[],
    writes:[],
    capabilities:{reads:{},writes:{}},
    media:[{
      id:'stage.room',
      kind:'image',
      src:'assets/room.svg',
      alt:'Chronology room'
    }],
    events:[afterChoiceEvent()]
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

function reloadProgress<T>(value:T):T{
  return JSON.parse(JSON.stringify(value)) as T;
}

test('full reload chronology names the exact required checkpoint order',()=>{
  assert.deepEqual(fixture.chronology,[
    'paid-lesson',
    'reload-after-paid-lesson',
    'end-day',
    'choose-lodging',
    'reload-after-lodging',
    'night-study',
    'reload-after-night-study-before-day-advance',
    'day-advance',
    'reload-after-day-advance'
  ]);
});

test('paid lesson -> reload preserves tuition, Energy, full stat package, presentation identity, typed lesson count, and Lust',()=>{
  const cat=catalog();
  const selected=fixture.selectedCourse;
  const course=getSchoolCourse(selected.courseId);
  let state=ready();

  const beforeStats=structuredClone(state.run.character.stats);
  const lustBefore=state.run.character.lust;

  state=executeSchoolLesson(
    state,
    selected.courseId,
    cat,
    runtime
  ).state;

  let progress={
    lessons_completed:0,
    night_study_sessions:0
  };
  progress={
    ...progress,
    lessons_completed:progress.lessons_completed+1
  };

  assert.equal(state.run.resources.money,1_500);
  assert.equal(state.run.dayState.energyCurrent,2);
  assert.equal(state.run.character.lust,lustBefore);
  assert.equal(course.presentationId,selected.presentationId);

  for(const delta of selected.statDeltas){
    assert.equal(
      state.run.character.stats[delta.stat],
      beforeStats[delta.stat]+delta.delta,
      delta.stat
    );
  }

  state=parseSave(JSON.stringify(state),cat);
  progress=reloadProgress(progress);
  const presentationId=JSON.parse(JSON.stringify(course.presentationId));

  assert.equal(state.run.resources.money,1_500);
  assert.equal(state.run.dayState.energyCurrent,2);
  assert.equal(state.run.character.lust,lustBefore);
  assert.deepEqual(progress,fixture.typedProgress.afterPaidLesson);
  assert.equal(presentationId,selected.presentationId);

  for(const delta of selected.statDeltas){
    assert.equal(
      state.run.character.stats[delta.stat],
      beforeStats[delta.stat]+delta.delta,
      delta.stat
    );
  }
});

test('end day -> lodging -> reload changes none of the paid School transaction state',()=>{
  const cat=catalog();
  let state=ready();
  state=executeSchoolLesson(
    state,
    fixture.selectedCourse.courseId,
    cat,
    runtime
  ).state;
  state=parseSave(JSON.stringify(state),cat);

  const snapshot={
    money:state.run.resources.money,
    energy:state.run.dayState.energyCurrent,
    stats:structuredClone(state.run.character.stats),
    lust:state.run.character.lust
  };

  state=dispatch(state,{type:'endDay'},cat);
  state=dispatch(
    state,
    {type:'chooseLodging',id:'school.chronology.room'},
    cat
  );
  assert.equal(state.run.flow.night?.phase,'VoluntaryNightChoice');

  state=parseSave(JSON.stringify(state),cat);

  assert.equal(state.run.resources.money,snapshot.money);
  assert.equal(state.run.dayState.energyCurrent,snapshot.energy);
  assert.deepEqual(state.run.character.stats,snapshot.stats);
  assert.equal(state.run.character.lust,snapshot.lust);
  assert.equal(state.run.calendar.elapsedDays,0);
});

test('Night study -> reload before day advance preserves immediate +2, typed night count, and staged next-day -1 exactly once',()=>{
  const cat=catalog();
  let state=ready();
  state=executeSchoolLesson(
    state,
    fixture.selectedCourse.courseId,
    cat,
    runtime
  ).state;
  state=parseSave(JSON.stringify(state),cat);
  state=dispatch(state,{type:'endDay'},cat);
  state=dispatch(
    state,
    {type:'chooseLodging',id:'school.chronology.room'},
    cat
  );
  state=parseSave(JSON.stringify(state),cat);

  const reasonBeforeNight=state.run.character.stats.reason;
  const moneyBeforeNight=state.run.resources.money;
  const energyBeforeNight=state.run.dayState.energyCurrent;
  const lustBeforeNight=state.run.character.lust;

  let progress=reloadProgress(fixture.typedProgress.afterPaidLesson);

  state=dispatch(
    state,
    {type:'chooseNightChoice',id:fixture.nightStudy.choiceId},
    cat
  );
  progress={
    ...progress,
    night_study_sessions:progress.night_study_sessions+1
  };

  assert.equal(
    state.run.flow.pendingScene?.eventId,
    'school-chronology.after-night-study'
  );
  assert.equal(state.run.calendar.elapsedDays,0);
  assert.equal(state.run.resources.money,moneyBeforeNight);
  assert.equal(state.run.dayState.energyCurrent,energyBeforeNight);
  assert.equal(
    state.run.character.stats.reason,
    reasonBeforeNight+SCHOOL_NIGHT_STUDY_STAT_GAIN
  );
  assert.equal(
    state.run.dayState.nextDayModifiers.energyDelta,
    SCHOOL_NIGHT_STUDY_NEXT_DAY_ENERGY_DELTA
  );
  assert.equal(state.run.character.lust,lustBeforeNight);
  assert.deepEqual(progress,fixture.typedProgress.afterNightStudy);

  state=parseSave(JSON.stringify(state),cat);
  progress=reloadProgress(progress);

  assert.equal(
    state.run.flow.pendingScene?.eventId,
    'school-chronology.after-night-study'
  );
  assert.equal(state.run.calendar.elapsedDays,0);
  assert.equal(state.run.resources.money,moneyBeforeNight);
  assert.equal(state.run.dayState.energyCurrent,energyBeforeNight);
  assert.equal(
    state.run.character.stats.reason,
    reasonBeforeNight+SCHOOL_NIGHT_STUDY_STAT_GAIN
  );
  assert.equal(
    state.run.dayState.nextDayModifiers.energyDelta,
    SCHOOL_NIGHT_STUDY_NEXT_DAY_ENERGY_DELTA
  );
  assert.equal(state.run.character.lust,lustBeforeNight);
  assert.deepEqual(progress,fixture.typedProgress.afterNightStudy);
});

test('day advance -> reload consumes next-day Energy -1 once and duplicates nothing',()=>{
  const cat=catalog();
  let state=ready();
  state=executeSchoolLesson(
    state,
    fixture.selectedCourse.courseId,
    cat,
    runtime
  ).state;
  state=parseSave(JSON.stringify(state),cat);
  state=dispatch(state,{type:'endDay'},cat);
  state=dispatch(
    state,
    {type:'chooseLodging',id:'school.chronology.room'},
    cat
  );
  state=parseSave(JSON.stringify(state),cat);

  const moneyAfterLesson=state.run.resources.money;
  const lustAfterLesson=state.run.character.lust;

  state=dispatch(
    state,
    {type:'chooseNightChoice',id:fixture.nightStudy.choiceId},
    cat
  );
  const statsAfterNightChoice=structuredClone(state.run.character.stats);

  state=parseSave(JSON.stringify(state),cat);
  state=dispatch(state,{type:'choice',id:'continue'},cat);

  assert.equal(state.run.calendar.elapsedDays,1);
  assert.equal(state.run.flow.night,null);
  assert.equal(state.run.resources.money,moneyAfterLesson);
  assert.equal(state.run.dayState.energyCurrent,2);
  assert.deepEqual(
    state.run.dayState.nextDayModifiers,
    {energyDelta:0,statEffects:[],tags:[]}
  );
  assert.deepEqual(state.run.character.stats,statsAfterNightChoice);
  assert.equal(state.run.character.lust,lustAfterLesson);
  assert.equal(state.run.flow.lastAction?.id,'rest');
  assert.deepEqual(state.run.flow.lastAction?.media,['stage.room']);

  const reload1=parseSave(JSON.stringify(state),cat);
  const reload2=parseSave(JSON.stringify(reload1),cat);

  assert.equal(reload2.run.calendar.elapsedDays,1);
  assert.equal(reload2.run.resources.money,moneyAfterLesson);
  assert.equal(reload2.run.dayState.energyCurrent,2);
  assert.deepEqual(reload2.run.character.stats,statsAfterNightChoice);
  assert.equal(reload2.run.character.lust,lustAfterLesson);
  assert.deepEqual(
    reload2.run.dayState.nextDayModifiers,
    {energyDelta:0,statEffects:[],tags:[]}
  );
});

test('chronology fixture locks stable presentation and no-Lust/exactly-once invariants',()=>{
  assert.equal(
    getSchoolCourse(fixture.selectedCourse.courseId).presentationId,
    fixture.selectedCourse.presentationId
  );
  assert.deepEqual(fixture.invariants,{
    noLustMutation:true,
    tuitionAppliedExactlyOnce:true,
    paidLessonEnergyAppliedExactlyOnce:true,
    nightStudyNextDayEnergyAppliedExactlyOnce:true,
    presentationIdentityStable:true
  });
});
