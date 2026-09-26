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
  executeSchoolLesson,
  schoolNightStudyChoices
} from '../src/core/school.ts';
import type {Catalog,Save} from '../src/core/schema.ts';

const fixture=JSON.parse(
  readFileSync('content/school-day-night-interaction.fixture.json','utf8')
);
const runtime={applyEffects,resolveReactions};

function definitions(){
  return {
    version:'0.1.0',
    flags:['story.arrived'],
    actions:[],
    endings:[],
    careers:[],
    quests:[],
    relationships:[],
    lodgings:[{
      id:'school.interaction.room',
      label:'Interaction room',
      housing:'normal',
      moneyCost:0,
      conditions:[],
      effects:[],
      nextDayEffects:[],
      nextDayEnergyDelta:0
    }],
    nightChoices:schoolNightStudyChoices(),
    activities:[{
      id:'school.interaction.activity',
      label:'Interaction Activity',
      version:1,
      entryConditions:[],
      entryEnergyCost:1,
      resumePolicy:'allowed',
      timePolicy:'same_day',
      failurePolicy:'exit_to_day',
      adapter:'counter.v1',
      adapterConfig:{
        initialEndurance:5,
        advanceEnduranceCost:1,
        successAtProgress:2,
        failAtEndurance:0
      },
      results:[
        {
          id:'school.interaction.activity.success',
          outcome:'success',
          effects:[]
        },
        {
          id:'school.interaction.activity.escape',
          outcome:'escape',
          effects:[]
        },
        {
          id:'school.interaction.activity.failure',
          outcome:'failure',
          effects:[]
        }
      ]
    }]
  };
}

function pack(){
  return {
    schemaVersion:1,
    id:'school-day-night-interaction',
    reads:[],
    writes:[],
    capabilities:{reads:{},writes:{}},
    media:[],
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

test('paid lesson cannot execute while NightFlow is active, including after reload',()=>{
  const cat=catalog();
  let state=dispatch(ready(),{type:'endDay'},cat);
  assert.ok(state.run.flow.night);

  assert.throws(
    ()=>executeSchoolLesson(
      state,
      fixture.paidLesson.courseId,
      cat,
      runtime
    ),
    /Night flow/
  );

  state=parseSave(JSON.stringify(state),cat);

  assert.throws(
    ()=>executeSchoolLesson(
      state,
      fixture.paidLesson.courseId,
      cat,
      runtime
    ),
    /Night flow/
  );
});

test('paid lesson cannot execute while Activity is active, including after reload',()=>{
  const cat=catalog();
  let state=dispatch(
    ready(),
    {type:'enterActivity',id:'school.interaction.activity'},
    cat
  );
  assert.ok(state.run.flow.activity);

  assert.throws(
    ()=>executeSchoolLesson(
      state,
      fixture.paidLesson.courseId,
      cat,
      runtime
    ),
    /Activity/
  );

  state=parseSave(JSON.stringify(state),cat);

  assert.throws(
    ()=>executeSchoolLesson(
      state,
      fixture.paidLesson.courseId,
      cat,
      runtime
    ),
    /Activity/
  );
});

test('Night study cannot be selected before Night voluntary-choice phase',()=>{
  const cat=catalog();
  const choiceId=fixture.nightStudy.choiceId;

  assert.throws(
    ()=>dispatch(
      ready(),
      {type:'chooseNightChoice',id:choiceId},
      cat
    )
  );

  let state=dispatch(ready(),{type:'endDay'},cat);
  assert.equal(
    state.run.flow.night?.phase,
    'PreLodgingForcedCheck'
  );

  assert.throws(
    ()=>dispatch(
      state,
      {type:'chooseNightChoice',id:choiceId},
      cat
    ),
    /Сейчас нельзя выбирать ночное занятие/
  );

  state=parseSave(JSON.stringify(state),cat);

  assert.throws(
    ()=>dispatch(
      state,
      {type:'chooseNightChoice',id:choiceId},
      cat
    ),
    /Сейчас нельзя выбирать ночное занятие/
  );

  state=dispatch(
    state,
    {type:'chooseLodging',id:'school.interaction.room'},
    cat
  );
  assert.equal(
    state.run.flow.night?.phase,
    'VoluntaryNightChoice'
  );
});

test('paid lesson and Night study typed counter deltas are mutually exclusive',()=>{
  assert.deepEqual(
    fixture.paidLesson.counterDelta,
    {
      lessons_completed:1,
      night_study_sessions:0
    }
  );
  assert.deepEqual(
    fixture.nightStudy.counterDelta,
    {
      lessons_completed:0,
      night_study_sessions:1
    }
  );

  const paidReload=JSON.parse(
    JSON.stringify(fixture.paidLesson.counterDelta)
  );
  const nightReload=JSON.parse(
    JSON.stringify(fixture.nightStudy.counterDelta)
  );

  assert.deepEqual(paidReload,{
    lessons_completed:1,
    night_study_sessions:0
  });
  assert.deepEqual(nightReload,{
    lessons_completed:0,
    night_study_sessions:1
  });
});

test('interaction fixture names every locked exclusion',()=>{
  assert.deepEqual(fixture.exclusions,[
    'paid-lesson-blocked-during-nightflow',
    'paid-lesson-blocked-during-activity',
    'night-study-blocked-before-voluntary-choice',
    'save-reload-preserves-nightflow-block',
    'save-reload-preserves-activity-block'
  ]);
});
