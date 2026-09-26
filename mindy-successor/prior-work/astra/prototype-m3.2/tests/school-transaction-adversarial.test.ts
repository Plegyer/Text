import test from 'node:test';
import assert from 'node:assert/strict';
import {loadCatalog} from '../src/core/content.ts';
import {
  applyEffects,
  dispatch,
  freshSave,
  parseSave,
  resolveReactions
} from '../src/core/engine.ts';
import {
  SCHOOL_ACTION_ID,
  SCHOOL_NIGHT_STUDY_NEXT_DAY_ENERGY_DELTA,
  SCHOOL_NIGHT_STUDY_STAT_GAIN,
  executeSchoolLesson,
  schoolNightStudyChoice,
  type SchoolCourseId
} from '../src/core/school.ts';
import type {Catalog,Save} from '../src/core/schema.ts';

const runtime={applyEffects,resolveReactions};

function definitions(){
  return {
    version:'0.1.0',
    flags:['story.arrived'],
    actions:[{
      id:'rest',
      label:'Rest',
      description:'Fixture-only persisted NightFlow result action.',
      cost:{money:0,energy:0},
      conditions:[],
      effects:[],
      mode:'normal'
    }],
    endings:[],
    careers:[{
      id:'school.adversarial.career',
      label:'School adversarial fixture career',
      initialStage:'new',
      stages:['new'],
      transitions:[]
    }],
    quests:[],
    relationships:[],
    lodgings:[{
      id:'school.adversarial.room',
      label:'School adversarial fixture room',
      housing:'normal',
      moneyCost:0,
      conditions:[],
      effects:[],
      nextDayEffects:[],
      nextDayEnergyDelta:0
    }],
    nightChoices:[
      schoolNightStudyChoice('school.course.arcana','reason')
    ],
    activities:[]
  };
}

function pack(){
  return {
    schemaVersion:1,
    id:'school-adversarial',
    reads:[],
    writes:[],
    capabilities:{
      reads:{stats:['magic','reason','creativity']},
      writes:{careers:['school.adversarial.career']}
    },
    media:[{
      id:'stage.room',
      kind:'image',
      src:'assets/room.svg',
      alt:'Fixture room'
    }],
    events:[{
      id:'school-adversarial.arcana-full-package',
      title:'Arcana full-package observer',
      reactionTriggers:[{kind:'actionCompleted',action:SCHOOL_ACTION_ID}],
      priorityClass:'normal_progression',
      priority:100,
      blocking:true,
      delivery:{policy:'live'},
      cooldownDays:0,
      variantCooldownDays:0,
      maxShows:1,
      conditions:[
        {kind:'stat',stat:'magic',op:'gte',value:5},
        {kind:'stat',stat:'reason',op:'gte',value:5},
        {kind:'stat',stat:'creativity',op:'gte',value:3}
      ],
      variants:[{
        id:'default',
        text:'The Resolver sees every Arcana stat after the full School transaction.',
        conditions:[],
        media:[]
      }],
      choices:[{
        id:'continue',
        label:'Continue',
        text:'The complete School transaction is accepted by the fixture.',
        conditions:[],
        effects:[{
          kind:'addCareerFact',
          career:'school.adversarial.career',
          fact:'full_school_package_seen'
        }]
      }]
    }]
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

test('adversarial: insufficient money is atomic for a locked paid School package',()=>{
  const cat=catalog();
  const state=ready();
  state.run.resources.money=299;
  const before=JSON.stringify(state);

  assert.throws(
    ()=>executeSchoolLesson(
      state,
      'school.course.literacy_and_numbers',
      cat,
      runtime
    ),
    /money/
  );

  assert.equal(JSON.stringify(state),before);
});

test('adversarial: insufficient current-day Energy is atomic for the four-stat Arts package',()=>{
  const cat=catalog();
  const state=ready();
  state.run.dayState.energyCurrent=0;
  const before=JSON.stringify(state);

  assert.throws(
    ()=>executeSchoolLesson(
      state,
      'school.course.arts_and_performance',
      cat,
      runtime
    ),
    /Energy/
  );

  assert.equal(JSON.stringify(state),before);
});

test('adversarial: reload after a paid lesson never reapplies tuition or the one-Energy charge',()=>{
  const cat=catalog();
  const state=ready();

  const paid=executeSchoolLesson(
    state,
    'school.course.physical_training',
    cat,
    runtime
  ).state;

  assert.equal(paid.run.resources.money,1_600);
  assert.equal(paid.run.dayState.energyCurrent,2);
  assert.equal(paid.run.character.stats.strength,4);
  assert.equal(paid.run.character.stats.endurance,4);
  assert.equal(paid.run.character.stats.dexterity,3);

  const reload1=parseSave(JSON.stringify(paid),cat);
  const reload2=parseSave(JSON.stringify(reload1),cat);

  assert.equal(reload1.run.resources.money,1_600);
  assert.equal(reload2.run.resources.money,1_600);
  assert.equal(reload1.run.dayState.energyCurrent,2);
  assert.equal(reload2.run.dayState.energyCurrent,2);
  assert.equal(reload2.run.character.stats.strength,4);
  assert.equal(reload2.run.character.stats.endurance,4);
  assert.equal(reload2.run.character.stats.dexterity,3);
});

test('adversarial: Resolver observes the full Arcana package and cannot trigger on a partial write',()=>{
  const cat=catalog();
  const state=ready();
  state.run.character.stats.magic=1;
  state.run.character.stats.reason=1;
  state.run.character.stats.creativity=1;

  const result=executeSchoolLesson(
    state,
    'school.course.arcana',
    cat,
    runtime
  );

  assert.equal(result.state.run.character.stats.magic,5);
  assert.equal(result.state.run.character.stats.reason,5);
  assert.equal(result.state.run.character.stats.creativity,3);
  assert.deepEqual(
    result.reactionFacts
      .filter(fact=>fact.kind==='statChanged')
      .map(fact=>fact.stat)
      .sort(),
    ['creativity','magic','reason']
  );
  assert.equal(
    result.state.run.flow.pendingScene?.eventId,
    'school-adversarial.arcana-full-package'
  );
});

test('adversarial: single-stat Night study is zero tuition, +2 supported stat, and next-day Energy -1 exactly once across reload',()=>{
  const cat=catalog();
  const choice=schoolNightStudyChoice('school.course.arcana','reason');
  let state=ready();
  state.run.resources.money=777;
  state.run.dayState.energyCurrent=1;
  state.run.character.stats.reason=10;

  assert.deepEqual(
    choice.effects,
    [{kind:'modifyStat',stat:'reason',delta:SCHOOL_NIGHT_STUDY_STAT_GAIN}]
  );
  assert.equal(choice.nextDayEnergyDelta,SCHOOL_NIGHT_STUDY_NEXT_DAY_ENERGY_DELTA);
  assert.equal(choice.effects.some(effect=>effect.kind==='modifyResource'),false);
  assert.equal(choice.effects.some(effect=>effect.kind==='modifyEnergy'),false);

  const immediate=applyEffects(state,choice.effects,cat);
  assert.equal(immediate.run.resources.money,777);
  assert.equal(immediate.run.dayState.energyCurrent,1);
  assert.equal(immediate.run.character.stats.reason,12);

  state=dispatch(state,{type:'endDay'},cat);
  assert.equal(state.run.calendar.elapsedDays,0);
  assert.ok(state.run.flow.night);

  state=dispatch(state,{type:'chooseLodging',id:'school.adversarial.room'},cat);
  assert.equal(state.run.resources.money,777);
  assert.equal(state.run.dayState.energyCurrent,1);

  state=parseSave(JSON.stringify(state),cat);
  assert.equal(state.run.character.stats.reason,10);

  state=dispatch(state,{type:'chooseNightChoice',id:choice.id},cat);

  assert.equal(state.run.calendar.elapsedDays,1);
  assert.equal(state.run.flow.night,null);
  assert.equal(state.run.character.stats.reason,12);
  assert.equal(state.run.resources.money,777);
  assert.equal(state.run.dayState.energyCurrent,2);
  assert.deepEqual(
    state.run.dayState.nextDayModifiers,
    {energyDelta:0,statEffects:[],tags:[]}
  );
  assert.equal(state.run.flow.lastAction?.id,'rest');
  assert.deepEqual(state.run.flow.lastAction?.media,['stage.room']);

  const reload1=parseSave(JSON.stringify(state),cat);
  const reload2=parseSave(JSON.stringify(reload1),cat);

  assert.equal(reload1.run.calendar.elapsedDays,1);
  assert.equal(reload2.run.calendar.elapsedDays,1);
  assert.equal(reload1.run.character.stats.reason,12);
  assert.equal(reload2.run.character.stats.reason,12);
  assert.equal(reload1.run.resources.money,777);
  assert.equal(reload2.run.resources.money,777);
  assert.equal(reload1.run.dayState.energyCurrent,2);
  assert.equal(reload2.run.dayState.energyCurrent,2);
});

test('adversarial: unsupported Night-study stat/course combinations reject without mutating state',()=>{
  const state=ready();
  const before=JSON.stringify(state);

  assert.throws(
    ()=>schoolNightStudyChoice('school.course.physical_training','reason'),
    /not supported/
  );
  assert.equal(JSON.stringify(state),before);

  assert.throws(
    ()=>schoolNightStudyChoice('school.course.arcana','strength'),
    /not supported/
  );
  assert.equal(JSON.stringify(state),before);

  assert.throws(
    ()=>schoolNightStudyChoice(
      'school.course.unknown' as SchoolCourseId,
      'reason'
    ),
    /Unknown School course/
  );
  assert.equal(JSON.stringify(state),before);
});
