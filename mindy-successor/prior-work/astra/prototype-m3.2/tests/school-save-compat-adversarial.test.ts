import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {loadCatalog} from '../src/core/content.ts';
import {dispatch,freshSave,parseSave} from '../src/core/engine.ts';
import {
  SCHOOL_COURSES,
  schoolNightStudyChoices
} from '../src/core/school.ts';
import type {Catalog,Save} from '../src/core/schema.ts';

const compat=JSON.parse(
  readFileSync('content/school-typed-state-compat.fixture.json','utf8')
);

const knownTrackIds=new Set(
  SCHOOL_COURSES.map(course=>course.trackId)
);

function defaultSchoolState(value:unknown){
  return value===undefined
    ? structuredClone(compat.defaultSchoolProgression)
    : structuredClone(value);
}

function validateSchoolState(school:any){
  const keys=Object.keys(school.tracks??{});
  for(const key of keys){
    if(!knownTrackIds.has(key)){
      throw new Error(`Unknown School track: ${key}`);
    }
    const track=school.tracks[key];
    if(track.trackId!==key){
      throw new Error(`School trackId/key mismatch: ${key} != ${track.trackId}`);
    }
  }
  for(const expected of knownTrackIds){
    if(!school.tracks[expected]){
      throw new Error(`Missing School track: ${expected}`);
    }
  }
  return school;
}

function applyCounterOnce(
  progress:{lessons_completed:number;night_study_sessions:number},
  applied:Set<string>,
  txId:string,
  counter:'lessons_completed'|'night_study_sessions'
){
  if(applied.has(txId))return progress;
  applied.add(txId);
  return {
    ...progress,
    [counter]:progress[counter]+1
  };
}

function definitions(){
  return {
    version:'0.1.0',
    flags:['story.arrived'],
    actions:[{
      id:'rest',
      label:'Rest',
      description:'Adversarial School save fixture rest action.',
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
      id:'school.compat.room',
      label:'Compatibility room',
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

const nightChoiceId='school.night_study.arcana.reason';

function pack(){
  return {
    schemaVersion:1,
    id:'school-save-compat-adversarial',
    reads:[],
    writes:[],
    capabilities:{reads:{},writes:{}},
    media:[{
      id:'stage.room',
      kind:'image',
      src:'assets/room.svg',
      alt:'Compatibility room'
    }],
    events:[
      {
        id:'school.compat.pending',
        title:'Semantic presentation compatibility fixture',
        reactionTriggers:[],
        priorityClass:'normal_progression',
        priority:1,
        blocking:true,
        delivery:{policy:'live'},
        cooldownDays:0,
        variantCooldownDays:0,
        maxShows:1,
        conditions:[],
        variants:[{
          id:'default',
          text:'Fixture scene for pending School presentation compatibility.',
          conditions:[],
          media:[]
        }],
        choices:[{
          id:'continue',
          label:'Continue',
          text:'Continue from the pending compatibility scene.',
          conditions:[],
          effects:[]
        }]
      },
      {
        id:'school.compat.after-choice',
        title:'After-choice reload checkpoint',
        reactionTriggers:[{
          kind:'nightChoiceCompleted',
          choice:nightChoiceId
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
          text:'Keep NightFlow open for the adversarial reload checkpoint.',
          conditions:[],
          media:[]
        }],
        choices:[{
          id:'continue',
          label:'Continue',
          text:'Complete the adversarial NightFlow checkpoint.',
          conditions:[],
          effects:[]
        }]
      }
    ]
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
  return state;
}

test('missing School progression defaults to the accepted empty eight-track state',()=>{
  const school=defaultSchoolState(undefined);
  assert.deepEqual(school,compat.defaultSchoolProgression);
  assert.equal(Object.keys(school.tracks).length,8);
  validateSchoolState(school);
});

test('malformed trackId/key mismatch is rejected by the fixture-level School compatibility validator',()=>{
  const school=defaultSchoolState(undefined);
  school.tracks['school.track.arcana'].trackId='school.track.field_craft';

  assert.throws(
    ()=>validateSchoolState(school),
    /trackId\/key mismatch/
  );
});

test('unknown School track is rejected rather than silently persisted',()=>{
  const school=defaultSchoolState(undefined);
  school.tracks['school.track.unknown']={
    trackId:'school.track.unknown',
    counters:{
      lessons_completed:0,
      night_study_sessions:0,
      projects_completed:0,
      exam_attempts:0
    },
    facts:[],
    milestones:[],
    certificates:[],
    choices:{}
  };

  assert.throws(
    ()=>validateSchoolState(school),
    /Unknown School track/
  );
});

test('duplicate/replayed typed School counter transaction is idempotent at the exactly-once contract boundary',()=>{
  const applied=new Set<string>();
  let progress={lessons_completed:0,night_study_sessions:0};

  progress=applyCounterOnce(
    progress,
    applied,
    'school.lesson.tx.fixture',
    'lessons_completed'
  );
  progress=applyCounterOnce(
    progress,
    applied,
    'school.lesson.tx.fixture',
    'lessons_completed'
  );
  assert.deepEqual(progress,{
    lessons_completed:1,
    night_study_sessions:0
  });

  progress=applyCounterOnce(
    progress,
    applied,
    'school.night.tx.fixture',
    'night_study_sessions'
  );
  progress=applyCounterOnce(
    progress,
    applied,
    'school.night.tx.fixture',
    'night_study_sessions'
  );
  assert.deepEqual(progress,{
    lessons_completed:1,
    night_study_sessions:1
  });
});

test('pending semantic School presentationId is valid by School contract but remains activation-dependent in current shared save schema',()=>{
  const semanticId='school/arcana/lesson/default';
  assert.match(
    semanticId,
    /^school\/[a-z0-9]+(?:-[a-z0-9]+)*\/lesson\/default$/
  );

  const cat=catalog();
  const state=ready();
  state.run.flow.pendingScene={
    eventId:'school.compat.pending',
    variantId:'default',
    presentationId:semanticId as any,
    allowedChoiceIds:['continue']
  };

  assert.throws(
    ()=>parseSave(JSON.stringify(state),cat)
  );
});

test('NightFlow reload checkpoints survive before choice, after choice, and after day advance without replay',()=>{
  const cat=catalog();
  let state=ready();
  state.run.dayState.energyCurrent=1;
  state.run.character.stats.reason=10;

  state=dispatch(state,{type:'endDay'},cat);
  state=dispatch(
    state,
    {type:'chooseLodging',id:'school.compat.room'},
    cat
  );

  state=parseSave(JSON.stringify(state),cat);
  assert.equal(state.run.flow.night?.phase,'VoluntaryNightChoice');
  assert.equal(state.run.calendar.elapsedDays,0);
  assert.equal(state.run.character.stats.reason,10);

  state=dispatch(
    state,
    {type:'chooseNightChoice',id:nightChoiceId},
    cat
  );
  assert.equal(
    state.run.flow.pendingScene?.eventId,
    'school.compat.after-choice'
  );
  assert.equal(state.run.character.stats.reason,12);
  assert.equal(state.run.dayState.nextDayModifiers.energyDelta,-1);
  assert.equal(state.run.calendar.elapsedDays,0);

  state=parseSave(JSON.stringify(state),cat);
  assert.equal(state.run.character.stats.reason,12);
  assert.equal(state.run.dayState.nextDayModifiers.energyDelta,-1);
  assert.equal(state.run.calendar.elapsedDays,0);

  state=dispatch(state,{type:'choice',id:'continue'},cat);
  assert.equal(state.run.calendar.elapsedDays,1);
  assert.equal(state.run.flow.night,null);
  assert.equal(state.run.character.stats.reason,12);
  assert.equal(state.run.dayState.energyCurrent,2);

  const reload1=parseSave(JSON.stringify(state),cat);
  const reload2=parseSave(JSON.stringify(reload1),cat);
  assert.equal(reload2.run.calendar.elapsedDays,1);
  assert.equal(reload2.run.character.stats.reason,12);
  assert.equal(reload2.run.dayState.energyCurrent,2);
  assert.deepEqual(
    reload2.run.dayState.nextDayModifiers,
    {energyDelta:0,statEffects:[],tags:[]}
  );
});
