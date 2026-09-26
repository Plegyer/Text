import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {loadCatalog} from '../src/core/content.ts';
import {applyEffects,dispatch,freshSave,parseSave,resolveReactions} from '../src/core/engine.ts';
import {
  SCHOOL_COURSE_IDS,
  SCHOOL_NIGHT_STUDY_NEXT_DAY_ENERGY_DELTA,
  SCHOOL_NIGHT_STUDY_STAT_GAIN,
  executeSchoolLesson,
  schoolNightStudyChoices
} from '../src/core/school.ts';
import type {Catalog,Save} from '../src/core/schema.ts';

const fixture=JSON.parse(
  readFileSync('content/school-pa-executable-scenario.fixture.json','utf8')
);
const runtime={applyEffects,resolveReactions};

function definitions(){
  return {
    version:'0.1.0',
    flags:['story.arrived'],
    actions:[{
      id:'rest',
      label:'Rest',
      description:'PA scenario persisted post-Night action.',
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
      id:'school.pa.room',
      label:'PA room',
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
    id:'school-pa-executable-scenario',
    reads:[],
    writes:[],
    capabilities:{reads:{},writes:{}},
    media:[{
      id:'stage.room',
      kind:'image',
      src:'assets/room.svg',
      alt:'PA room'
    }],
    events:[]
  };
}
function catalog():Catalog{return loadCatalog(definitions(),[pack()]);}
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

test('PA executable scenario covers exactly the locked eight course options',()=>{
  assert.deepEqual(fixture.courseOptions,[...SCHOOL_COURSE_IDS]);
  assert.equal(new Set(fixture.courseOptions).size,8);
});

test('arrived run executes the selected paid lesson atomically, presents semantic identity, and survives reload',()=>{
  const cat=catalog();
  const state=ready();
  const before=structuredClone(state.run.character.stats);
  const lustBefore=state.run.character.lust;
  const selected=fixture.selectedScenario;

  const result=executeSchoolLesson(
    state,
    selected.courseId,
    cat,
    runtime
  );
  const paid=result.state;

  assert.equal(paid.run.resources.money,1_500);
  assert.equal(paid.run.dayState.energyCurrent,2);
  assert.equal(paid.run.character.lust,lustBefore);
  assert.equal(result.course.presentationId,selected.presentationId);

  for(const delta of selected.statDeltas){
    assert.equal(
      paid.run.character.stats[delta.stat],
      before[delta.stat]+delta.delta,
      delta.stat
    );
  }

  const reloaded=parseSave(JSON.stringify(paid),cat);
  assert.equal(reloaded.run.resources.money,1_500);
  assert.equal(reloaded.run.dayState.energyCurrent,2);
  assert.equal(reloaded.run.character.lust,lustBefore);
  for(const delta of selected.statDeltas){
    assert.equal(
      reloaded.run.character.stats[delta.stat],
      before[delta.stat]+delta.delta,
      delta.stat
    );
  }
});

test('typed School counters increment separately exactly once at the fixture boundary',()=>{
  let progress={lessons_completed:0,night_study_sessions:0};

  progress={
    ...progress,
    lessons_completed:
      progress.lessons_completed+
      fixture.selectedScenario.paidLessonCounter.delta
  };
  const afterLesson=JSON.parse(JSON.stringify(progress));
  assert.deepEqual(afterLesson,{
    lessons_completed:1,
    night_study_sessions:0
  });

  progress={
    ...afterLesson,
    night_study_sessions:
      afterLesson.night_study_sessions+
      fixture.selectedScenario.nightStudy.counter.delta
  };
  const afterNight=JSON.parse(JSON.stringify(progress));
  assert.deepEqual(afterNight,{
    lessons_completed:1,
    night_study_sessions:1
  });
});

test('lesson reload -> NightFlow -> lodging -> School Night study -> next-day Energy -1 occurs exactly once',()=>{
  const cat=catalog();
  const selected=fixture.selectedScenario;
  let state=ready();

  state=executeSchoolLesson(
    state,
    selected.courseId,
    cat,
    runtime
  ).state;
  state=parseSave(JSON.stringify(state),cat);

  const reasonAfterLesson=state.run.character.stats.reason;
  const moneyAfterLesson=state.run.resources.money;
  const lustAfterLesson=state.run.character.lust;

  state=dispatch(state,{type:'endDay'},cat);
  state=dispatch(state,{type:'chooseLodging',id:'school.pa.room'},cat);

  const beforeNightChoice=parseSave(JSON.stringify(state),cat);
  state=dispatch(
    beforeNightChoice,
    {type:'chooseNightChoice',id:selected.nightStudy.choiceId},
    cat
  );

  assert.equal(state.run.calendar.elapsedDays,1);
  assert.equal(state.run.flow.night,null);
  assert.equal(state.run.resources.money,moneyAfterLesson);
  assert.equal(
    state.run.character.stats.reason,
    reasonAfterLesson+SCHOOL_NIGHT_STUDY_STAT_GAIN
  );
  assert.equal(
    selected.nightStudy.nextDayEnergyDelta,
    SCHOOL_NIGHT_STUDY_NEXT_DAY_ENERGY_DELTA
  );
  assert.equal(state.run.dayState.energyCurrent,2);
  assert.equal(state.run.character.lust,lustAfterLesson);

  const reload1=parseSave(JSON.stringify(state),cat);
  const reload2=parseSave(JSON.stringify(reload1),cat);

  assert.equal(reload2.run.calendar.elapsedDays,1);
  assert.equal(reload2.run.resources.money,moneyAfterLesson);
  assert.equal(
    reload2.run.character.stats.reason,
    reasonAfterLesson+SCHOOL_NIGHT_STUDY_STAT_GAIN
  );
  assert.equal(reload2.run.dayState.energyCurrent,2);
  assert.equal(reload2.run.character.lust,lustAfterLesson);
});
