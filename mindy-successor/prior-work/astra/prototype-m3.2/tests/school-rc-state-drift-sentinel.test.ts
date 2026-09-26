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
    lodgings:[],
    nightChoices:[],
    activities:[]
  };
}

function pack(){
  return {
    schemaVersion:1,
    id:'school-rc-state-drift-sentinel',
    reads:[],
    writes:[],
    capabilities:{reads:{},writes:{}},
    media:[],
    events:[{
      id:'school.rc.drift.blocking',
      title:'School RC drift sentinel blocking scene',
      reactionTriggers:[{
        kind:'actionCompleted',
        action:'school'
      }],
      priorityClass:'critical_progression',
      priority:100,
      blocking:true,
      delivery:{policy:'live'},
      cooldownDays:0,
      variantCooldownDays:0,
      maxShows:1,
      conditions:[],
      variants:[{
        id:'default',
        text:'The sentinel keeps one legitimate School scene pending after the paid lesson.',
        conditions:[],
        media:[]
      }],
      choices:[{
        id:'continue',
        label:'Continue',
        text:'Continue after the School sentinel scene.',
        conditions:[],
        effects:[]
      }]
    }]
  };
}

function catalog():Catalog{
  return loadCatalog(definitions(),[pack()]);
}

function longerSave():Save{
  const state=freshSave();
  state.run.character.creation.remaining=0;
  state.run.character.creation.allocated={};
  state.run.character.creation.complete=true;
  state.run.flags['story.arrived']=true;
  state.run.resources.money=2_000;
  state.run.dayState.energyCurrent=3;

  state.run.progression.careers.lumber={
    stage:'accepted-hand',
    shifts:7,
    counters:{completed_shifts:7},
    choices:{route:'fixture'},
    facts:['career.fixture.fact']
  };
  state.run.progression.quests['fixture.quest']={
    stage:'active',
    counters:{steps:2},
    choices:{approach:'careful'},
    facts:['quest.fixture.fact']
  };
  state.run.progression.relationships['lumber.foreman']={
    stage:'route-professional',
    counters:{meetings:1},
    choices:{route:'professional'},
    facts:['relationship.fixture.fact']
  };
  state.run.progression.worldFacts=[
    'fixture.existing.public'
  ];

  return state;
}

function typedCounters(){
  return {
    lessons_completed:0,
    night_study_sessions:0
  };
}

test('paid Arcana lesson changes only the expected money Energy and full stat package',()=>{
  const cat=catalog();
  const before=longerSave();
  const statsBefore=structuredClone(before.run.character.stats);

  const result=executeSchoolLesson(
    before,
    'school.course.arcana',
    cat,
    runtime
  );
  const after=result.state;

  assert.equal(
    after.run.resources.money,
    before.run.resources.money-500
  );
  assert.equal(
    after.run.dayState.energyCurrent,
    before.run.dayState.energyCurrent-1
  );
  assert.equal(
    after.run.character.stats.magic,
    statsBefore.magic+4
  );
  assert.equal(
    after.run.character.stats.reason,
    statsBefore.reason+4
  );
  assert.equal(
    after.run.character.stats.creativity,
    statsBefore.creativity+2
  );

  for(const stat of [
    'strength','endurance','dexterity','wits','charm',
    'sociability','manners','grooming','sexuality'
  ] as const){
    assert.equal(
      after.run.character.stats[stat],
      statsBefore[stat],
      stat
    );
  }
});

test('paid lesson companion typed counter transaction increments lessons only',()=>{
  const before=typedCounters();
  const after={
    lessons_completed:before.lessons_completed+1,
    night_study_sessions:before.night_study_sessions
  };

  assert.deepEqual(after,{
    lessons_completed:1,
    night_study_sessions:0
  });
});

test('paid lesson may leave exactly one legitimate pending School scene without resetting unrelated progression',()=>{
  const cat=catalog();
  const before=longerSave();

  const unrelatedBefore={
    career:structuredClone(before.run.progression.careers.lumber),
    quest:structuredClone(before.run.progression.quests['fixture.quest']),
    relationship:structuredClone(
      before.run.progression.relationships['lumber.foreman']
    ),
    worldFacts:structuredClone(before.run.progression.worldFacts)
  };

  const after=executeSchoolLesson(
    before,
    'school.course.arcana',
    cat,
    runtime
  ).state;

  assert.equal(
    after.run.flow.pendingScene?.eventId,
    'school.rc.drift.blocking'
  );

  assert.deepEqual(
    after.run.progression.careers.lumber,
    unrelatedBefore.career
  );
  assert.deepEqual(
    after.run.progression.quests['fixture.quest'],
    unrelatedBefore.quest
  );
  assert.deepEqual(
    after.run.progression.relationships['lumber.foreman'],
    unrelatedBefore.relationship
  );
  assert.deepEqual(
    after.run.progression.worldFacts,
    unrelatedBefore.worldFacts
  );
});

test('paid lesson creates no phantom public fact and preserves existing public facts exactly',()=>{
  const cat=catalog();
  const before=longerSave();
  const publicBefore=structuredClone(
    before.run.progression.worldFacts
  );

  const after=executeSchoolLesson(
    before,
    'school.course.arcana',
    cat,
    runtime
  ).state;

  assert.deepEqual(
    after.run.progression.worldFacts,
    publicBefore
  );
  assert.equal(
    after.run.progression.worldFacts.some(
      fact=>fact.includes('school.management')||
        fact.includes('management-ready')
    ),
    false
  );
});

test('source Save remains untouched and no unrelated subsystem is duplicated or reset',()=>{
  const cat=catalog();
  const source=longerSave();
  const before=JSON.stringify(source);

  const after=executeSchoolLesson(
    source,
    'school.course.arcana',
    cat,
    runtime
  ).state;

  assert.equal(JSON.stringify(source),before);
  assert.equal(
    after.run.progression.careers.lumber?.counters.completed_shifts,
    7
  );
  assert.equal(
    after.run.progression.relationships['lumber.foreman']
      ?.counters.meetings,
    1
  );
  assert.equal(
    after.run.progression.quests['fixture.quest']
      ?.counters.steps,
    2
  );
});
