import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {loadCatalog} from '../src/core/content.ts';
import {dispatch,freshSave,parseSave} from '../src/core/engine.ts';
import {
  SCHOOL_COURSES,
  SCHOOL_NIGHT_STUDY_NEXT_DAY_ENERGY_DELTA,
  SCHOOL_NIGHT_STUDY_STAT_GAIN,
  schoolNightStudyChoices
} from '../src/core/school.ts';
import type {Catalog,Save,Stat} from '../src/core/schema.ts';

const fixture=JSON.parse(
  readFileSync('content/school-nightflow-reachability.fixture.json','utf8')
);
const lockedCatalog=JSON.parse(
  readFileSync('content/school-night-choice-catalog.fixture.json','utf8')
);

function baseDefinitions(){
  return {
    version:'0.1.0',
    flags:['story.arrived'],
    actions:[{
      id:'rest',
      label:'Rest',
      description:'NightFlow reachability fixture persisted post-night action.',
      cost:{money:0,energy:0},
      conditions:[],
      effects:[],
      mode:'normal'
    }],
    endings:[],
    careers:[],
    quests:[],
    relationships:[],
    lodgings:[
      {
        id:'school.night.normal',
        label:'Normal room',
        housing:'normal',
        moneyCost:0,
        conditions:[],
        effects:[],
        nextDayEffects:[],
        nextDayEnergyDelta:0
      },
      {
        id:'school.night.cheap',
        label:'Cheap lodging',
        housing:'cheap',
        moneyCost:0,
        conditions:[],
        effects:[],
        nextDayEffects:[],
        nextDayEnergyDelta:0
      },
      {
        id:'school.night.street',
        label:'Street',
        housing:'street',
        moneyCost:0,
        conditions:[],
        effects:[],
        nextDayEffects:[{stat:'grooming',delta:-1}],
        nextDayEnergyDelta:-1
      }
    ],
    nightChoices:schoolNightStudyChoices(),
    activities:[]
  };
}

function pack(events:any[]=[]){
  return {
    schemaVersion:1,
    id:'school-nightflow-reachability',
    reads:[],
    writes:[],
    capabilities:{reads:{},writes:{}},
    media:[
      {
        id:'stage.room',
        kind:'image',
        src:'assets/room.svg',
        alt:'NightFlow fixture room'
      },
      {
        id:'stage.outside',
        kind:'image',
        src:'assets/outside.svg',
        alt:'NightFlow fixture outside'
      }
    ],
    events
  };
}

function catalog(events:any[]=[]):Catalog{
  return loadCatalog(baseDefinitions(),[pack(events)]);
}

function ready():Save{
  const state=freshSave();
  state.run.character.creation.remaining=0;
  state.run.character.creation.allocated={};
  state.run.character.creation.complete=true;
  state.run.flags['story.arrived']=true;
  state.run.resources.money=777;
  state.run.dayState.energyCurrent=1;
  return state;
}

function lodgingId(housing:'normal'|'cheap'){
  return housing==='normal'
    ? 'school.night.normal'
    : 'school.night.cheap';
}

function choiceFor(id:string){
  const choice=fixture.choices.find((entry:any)=>entry.choiceId===id);
  assert.ok(choice,id);
  return choice;
}

test('NightFlow reachability locks normal/cheap access and denies normal School Night study on street by default',()=>{
  assert.deepEqual(fixture.lodgingAccess,[
    {
      housing:'normal',
      normalSchoolNightStudy:true,
      note:'full voluntary Night menu'
    },
    {
      housing:'cheap',
      normalSchoolNightStudy:true,
      note:'normal School Night study permitted; authored variants may be narrower later'
    },
    {
      housing:'street',
      normalSchoolNightStudy:false,
      note:'no normal School Night study by default'
    }
  ]);

  for(const choice of fixture.choices){
    assert.deepEqual(choice.allowedHousing,['normal','cheap'],choice.choiceId);
    assert.deepEqual(choice.deniedHousing,['street'],choice.choiceId);
  }

  assert.equal(fixture.availabilityEnforcement.status,'activation-dependent');
  assert.match(
    fixture.availabilityEnforcement.reason,
    /NightChoiceDefinition has no housing availability field/
  );
});

test('reachability fixture is exactly the validated 24-choice School Night catalog with no unsupported course/stat pair',()=>{
  assert.equal(fixture.choices.length,24);
  assert.equal(new Set(fixture.choices.map((choice:any)=>choice.choiceId)).size,24);

  assert.deepEqual(
    fixture.choices.map((choice:any)=>({
      choiceId:choice.choiceId,
      courseId:choice.courseId,
      trackId:choice.trackId,
      stat:choice.stat,
      statGain:choice.statGain,
      tuition:choice.tuition,
      daytimeEnergyCost:choice.daytimeEnergyCost,
      nextDayEnergyDelta:choice.nextDayEnergyDelta,
      mutatesLust:choice.mutatesLust
    })),
    lockedCatalog.choices.map((choice:any)=>({
      choiceId:choice.choiceId,
      courseId:choice.courseId,
      trackId:choice.trackId,
      stat:choice.stat,
      statGain:choice.statGain,
      tuition:choice.tuition,
      daytimeEnergyCost:choice.daytimeEnergyCost,
      nextDayEnergyDelta:choice.nextDayEnergyDelta,
      mutatesLust:choice.mutatesLust
    }))
  );

  for(const choice of fixture.choices){
    const course=SCHOOL_COURSES.find(item=>item.id===choice.courseId);
    assert.ok(course,choice.courseId);
    assert.ok(
      course.statEffects.some(effect=>effect.stat===choice.stat),
      `${choice.courseId} / ${choice.stat}`
    );
  }

  for(const course of SCHOOL_COURSES){
    const supported=new Set(course.statEffects.map(effect=>effect.stat));
    for(const stat of [
      'strength','endurance','dexterity','reason','magic','creativity',
      'wits','charm','sociability','manners','grooming','sexuality'
    ] as Stat[]){
      if(supported.has(stat))continue;
      assert.equal(
        fixture.choices.some(
          (choice:any)=>choice.courseId===course.id&&choice.stat===stat
        ),
        false,
        `${course.id} / ${stat}`
      );
    }
  }
});

test('every reachable School Night choice consumes the Night slot with zero tuition/daytime Energy, +2 supported stat, and next-day Energy -1 exactly once',()=>{
  const cat=catalog();

  for(const housing of ['normal','cheap'] as const){
    for(const entry of fixture.choices){
      let state=ready();
      const stat=entry.stat as Stat;
      state.run.character.stats[stat]=10;
      const moneyBefore=state.run.resources.money;
      const daytimeEnergyBefore=state.run.dayState.energyCurrent;

      state=dispatch(state,{type:'endDay'},cat);
      state=dispatch(
        state,
        {type:'chooseLodging',id:lodgingId(housing)},
        cat
      );

      const beforeChoice=parseSave(JSON.stringify(state),cat);
      assert.equal(beforeChoice.run.calendar.elapsedDays,0,entry.choiceId);
      assert.equal(beforeChoice.run.resources.money,moneyBefore,entry.choiceId);
      assert.equal(
        beforeChoice.run.dayState.energyCurrent,
        daytimeEnergyBefore,
        entry.choiceId
      );

      state=dispatch(
        beforeChoice,
        {type:'chooseNightChoice',id:entry.choiceId},
        cat
      );

      assert.equal(state.run.flow.night,null,entry.choiceId);
      assert.equal(state.run.calendar.elapsedDays,1,entry.choiceId);
      assert.equal(state.run.resources.money,moneyBefore,entry.choiceId);
      assert.equal(
        state.run.character.stats[stat],
        10+SCHOOL_NIGHT_STUDY_STAT_GAIN,
        entry.choiceId
      );
      assert.equal(entry.tuition,0,entry.choiceId);
      assert.equal(entry.daytimeEnergyCost,0,entry.choiceId);
      assert.equal(entry.statGain,SCHOOL_NIGHT_STUDY_STAT_GAIN,entry.choiceId);
      assert.equal(
        entry.nextDayEnergyDelta,
        SCHOOL_NIGHT_STUDY_NEXT_DAY_ENERGY_DELTA,
        entry.choiceId
      );
      assert.equal(state.run.dayState.energyCurrent,2,entry.choiceId);
      assert.deepEqual(
        state.run.dayState.nextDayModifiers,
        {energyDelta:0,statEffects:[],tags:[]},
        entry.choiceId
      );

      const reload1=parseSave(JSON.stringify(state),cat);
      const reload2=parseSave(JSON.stringify(reload1),cat);
      assert.equal(reload2.run.calendar.elapsedDays,1,entry.choiceId);
      assert.equal(reload2.run.resources.money,moneyBefore,entry.choiceId);
      assert.equal(
        reload2.run.character.stats[stat],
        10+SCHOOL_NIGHT_STUDY_STAT_GAIN,
        entry.choiceId
      );
      assert.equal(reload2.run.dayState.energyCurrent,2,entry.choiceId);
    }
  }
});

test('Night-study School-owned counter contract increments night_study_sessions without touching lessons_completed',()=>{
  assert.deepEqual(fixture.semantics,{
    consumesNightSlot:true,
    tuition:0,
    daytimeEnergyCost:0,
    selectedSupportedStatGain:SCHOOL_NIGHT_STUDY_STAT_GAIN,
    nextDayEnergyDelta:SCHOOL_NIGHT_STUDY_NEXT_DAY_ENERGY_DELTA,
    schoolOwnedCounterDelta:{
      lessons_completed:0,
      night_study_sessions:1
    }
  });

  let progress={lessons_completed:7,night_study_sessions:3};
  progress={
    lessons_completed:
      progress.lessons_completed+
      fixture.semantics.schoolOwnedCounterDelta.lessons_completed,
    night_study_sessions:
      progress.night_study_sessions+
      fixture.semantics.schoolOwnedCounterDelta.night_study_sessions
  };

  assert.deepEqual(progress,{
    lessons_completed:7,
    night_study_sessions:4
  });
});

test('save/reload checkpoints exist before choice, after choice, and after day advance',()=>{
  const representative=fixture.choices[0];
  assert.ok(representative);

  const afterChoiceEvent={
    id:'school-nightflow-reachability.after-choice-checkpoint',
    title:'After choice checkpoint',
    reactionTriggers:[{
      kind:'nightChoiceCompleted',
      choice:representative.choiceId
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
      text:'Fixture event keeps NightFlow open after the School Night choice.',
      conditions:[],
      media:[]
    }],
    choices:[{
      id:'continue',
      label:'Continue',
      text:'Finish the fixture NightFlow after the persisted choice checkpoint.',
      conditions:[],
      effects:[]
    }]
  };

  const cat=catalog([afterChoiceEvent]);
  let state=ready();
  const stat=representative.stat as Stat;
  state.run.character.stats[stat]=10;

  state=dispatch(state,{type:'endDay'},cat);
  state=dispatch(
    state,
    {type:'chooseLodging',id:'school.night.normal'},
    cat
  );

  const beforeChoice=parseSave(JSON.stringify(state),cat);
  assert.equal(beforeChoice.run.flow.night?.phase,'VoluntaryNightChoice');
  assert.equal(beforeChoice.run.calendar.elapsedDays,0);

  state=dispatch(
    beforeChoice,
    {type:'chooseNightChoice',id:representative.choiceId},
    cat
  );

  assert.equal(
    state.run.flow.pendingScene?.eventId,
    'school-nightflow-reachability.after-choice-checkpoint'
  );
  assert.equal(state.run.calendar.elapsedDays,0);
  assert.equal(
    state.run.character.stats[stat],
    10+SCHOOL_NIGHT_STUDY_STAT_GAIN
  );

  const afterChoice=parseSave(JSON.stringify(state),cat);
  assert.equal(
    afterChoice.run.flow.pendingScene?.eventId,
    'school-nightflow-reachability.after-choice-checkpoint'
  );
  assert.equal(afterChoice.run.calendar.elapsedDays,0);
  assert.equal(
    afterChoice.run.character.stats[stat],
    10+SCHOOL_NIGHT_STUDY_STAT_GAIN
  );

  state=dispatch(afterChoice,{type:'choice',id:'continue'},cat);
  assert.equal(state.run.calendar.elapsedDays,1);
  assert.equal(state.run.flow.night,null);
  assert.equal(state.run.dayState.energyCurrent,2);

  const afterDayAdvance=parseSave(JSON.stringify(state),cat);
  assert.equal(afterDayAdvance.run.calendar.elapsedDays,1);
  assert.equal(afterDayAdvance.run.flow.night,null);
  assert.equal(afterDayAdvance.run.dayState.energyCurrent,2);

  assert.deepEqual(
    fixture.saveReloadCheckpoints.map((checkpoint:any)=>checkpoint.id),
    ['before-choice','after-choice','after-day-advance']
  );
});
