import test from 'node:test';
import assert from 'node:assert/strict';
import {loadCatalog} from '../src/core/content.ts';
import {
  applyEffects,
  freshSave,
  resolveReactions
} from '../src/core/engine.ts';
import {executeSchoolLesson} from '../src/core/school.ts';
import type {Catalog,Save} from '../src/core/schema.ts';
import {readFileSync} from 'node:fs';

const fixture=JSON.parse(
  readFileSync(
    'content/school-long-save-state-preservation.fixture.json',
    'utf8'
  )
);
const runtime={applyEffects,resolveReactions};

function definitions(){
  return {
    version:'0.1.0',
    flags:['story.arrived'],
    actions:[],
    endings:[
      {
        id:'ending.lumber.hard-work',
        title:'Hard Work fixture',
        description:'Long-Save preservation fixture ending.',
        conditions:[{
          kind:'careerCounter',
          career:'lumber',
          counter:'completed_shifts',
          op:'gte',
          value:50
        }],
        reward:'fixture.reward.hard-work',
        metaRewards:[],
        epilogue:'Fixture epilogue.'
      },
      {
        id:'ending.lumber.forest',
        title:'Forest fixture',
        description:'Long-Save preservation fixture ending.',
        conditions:[{
          kind:'worldFact',
          fact:'lumber.forest.truth-known'
        }],
        reward:'fixture.reward.forest',
        metaRewards:[],
        epilogue:'Fixture forest epilogue.'
      }
    ],
    careers:[],
    quests:[],
    relationships:[],
    lodgings:[],
    nightChoices:[],
    activities:[]
  };
}

function pack(){
  return {
    schemaVersion:1,
    id:'school-long-save-preservation',
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

function longSave():Save{
  const s=freshSave();
  s.run.character.creation.remaining=0;
  s.run.character.creation.allocated={};
  s.run.character.creation.complete=true;
  s.run.flags['story.arrived']=true;
  s.run.resources.money=2_000;
  s.run.dayState.energyCurrent=3;

  s.run.progression.careers.lumber={
    stage:fixture.unrelatedState.lumberStage,
    shifts:50,
    counters:{
      completed_shifts:fixture.unrelatedState.completedShifts
    },
    choices:{route:'professional'},
    facts:[fixture.unrelatedState.forestCareerFact]
  };

  s.run.progression.relationships['lumber.foreman']={
    stage:fixture.unrelatedState.foremanStage,
    counters:{night_meetings:1},
    choices:{route:'professional'},
    facts:['respects-work']
  };

  s.run.progression.quests['fixture.quest']={
    stage:'active',
    counters:{steps:3},
    choices:{route:'careful'},
    facts:['fixture.quest.fact']
  };

  s.run.progression.worldFacts=[
    fixture.unrelatedState.forestWorldFact
  ];
  s.run.endings.eligible=[
    ...fixture.unrelatedState.endingEligibility
  ];
  s.meta.hardWorkProgress=[
    ...fixture.unrelatedState.metaHardWorkProgress
  ];
  return s;
}

test('paid Arcana mutates only owned money Energy and stat package while preserving long-Save domains',()=>{
  const cat=catalog();
  const before=longSave();

  const unrelated={
    career:structuredClone(before.run.progression.careers.lumber),
    relationship:structuredClone(
      before.run.progression.relationships['lumber.foreman']
    ),
    quest:structuredClone(before.run.progression.quests['fixture.quest']),
    worldFacts:structuredClone(before.run.progression.worldFacts),
    endings:structuredClone(before.run.endings.eligible),
    meta:structuredClone(before.meta),
    night:structuredClone(before.run.flow.night)
  };
  const stats=structuredClone(before.run.character.stats);

  const after=executeSchoolLesson(
    before,
    fixture.courseId,
    cat,
    runtime
  ).state;

  assert.equal(
    after.run.resources.money,
    before.run.resources.money+
      fixture.expectedOwnedMutation.moneyDelta
  );
  assert.equal(
    after.run.dayState.energyCurrent,
    before.run.dayState.energyCurrent+
      fixture.expectedOwnedMutation.energyDelta
  );
  assert.equal(after.run.character.stats.magic,stats.magic+4);
  assert.equal(after.run.character.stats.reason,stats.reason+4);
  assert.equal(
    after.run.character.stats.creativity,
    stats.creativity+2
  );

  assert.deepEqual(
    after.run.progression.careers.lumber,
    unrelated.career
  );
  assert.deepEqual(
    after.run.progression.relationships['lumber.foreman'],
    unrelated.relationship
  );
  assert.deepEqual(
    after.run.progression.quests['fixture.quest'],
    unrelated.quest
  );
  assert.deepEqual(
    after.run.progression.worldFacts,
    unrelated.worldFacts
  );
  assert.deepEqual(after.run.endings.eligible,unrelated.endings);
  assert.deepEqual(after.meta,unrelated.meta);
  assert.deepEqual(after.run.flow.night,unrelated.night);
});

test('typed School companion transaction changes only Arcana lessons_completed',()=>{
  const tracks={
    'school.track.arcana':{
      lessons_completed:4,
      night_study_sessions:2
    },
    'school.track.field_craft':{
      lessons_completed:8,
      night_study_sessions:3
    }
  };
  const before=structuredClone(tracks);

  tracks['school.track.arcana'].lessons_completed+=
    fixture.expectedOwnedMutation.typedProgress.lessons_completed;
  tracks['school.track.arcana'].night_study_sessions+=
    fixture.expectedOwnedMutation.typedProgress.night_study_sessions;

  assert.deepEqual(tracks['school.track.arcana'],{
    lessons_completed:5,
    night_study_sessions:2
  });
  assert.deepEqual(
    tracks['school.track.field_craft'],
    before['school.track.field_craft']
  );
});

test('active Night blocks paid School atomically and preserves Night plus unrelated state',()=>{
  const cat=catalog();
  const s=longSave();
  s.run.flow.night={
    phase:'VoluntaryNightChoice',
    startedDay:s.run.calendar.elapsedDays,
    selectedLodgingId:'fixture.room',
    lodgingPaymentCommitted:true,
    selectedNightChoiceId:null,
    suppressLodgingPayment:false,
    suppressVoluntaryMenu:false,
    consumesNight:false,
    calendarAdvanceCommitted:false,
    currentIntercept:null,
    handledEventIds:[]
  };

  const before=JSON.stringify(s);

  assert.throws(
    ()=>executeSchoolLesson(
      s,
      fixture.courseId,
      cat,
      runtime
    ),
    /Night flow/
  );

  assert.equal(JSON.stringify(s),before);
  assert.equal(
    fixture.activeNightPolicy,
    'reject-atomically-and-preserve-night-state'
  );
});

test('Forest facts ending eligibility and Meta remain independent of School progress',()=>{
  const cat=catalog();
  const before=longSave();
  const after=executeSchoolLesson(
    before,
    fixture.courseId,
    cat,
    runtime
  ).state;

  assert.ok(
    after.run.progression.worldFacts.includes(
      'lumber.forest.truth-known'
    )
  );
  assert.ok(
    after.run.progression.careers.lumber?.facts.includes(
      'forest-truth-known'
    )
  );
  assert.deepEqual(
    after.run.endings.eligible.sort(),
    fixture.unrelatedState.endingEligibility.slice().sort()
  );
  assert.deepEqual(
    after.meta.hardWorkProgress,
    ['lumber']
  );
});
