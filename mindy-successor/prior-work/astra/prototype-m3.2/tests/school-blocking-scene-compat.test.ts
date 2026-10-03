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
import {executeSchoolLesson} from '../src/core/school.ts';
import type {Catalog,Save} from '../src/core/schema.ts';
import {emptyResolvedStrongMetaSnapshot} from '../src/core/strongMeta.ts';

const fixture=JSON.parse(
  readFileSync('content/school-blocking-scene-compat.fixture.json','utf8')
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
    lodgings:[],
    nightChoices:[],
    activities:[]
  };
}

function pack(){
  return {
    schemaVersion:1,
    id:'school.fixture',
    reads:[],
    writes:[],
    capabilities:{reads:{},writes:{}},
    media:[],
    events:[{
      id:fixture.blockingScene.eventId,
      title:'Blocking first School lesson fixture',
      reactionTriggers:[fixture.blockingScene.trigger],
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
        text:'A fixture School scene blocks NightFlow until the player resolves it.',
        conditions:[],
        media:[]
      }],
      choices:[{
        id:fixture.blockingScene.choiceId,
        label:'Continue',
        text:'Resolve the blocking School fixture scene.',
        conditions:[],
        effects:[]
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
  state.run.character.creation.hardWorkPackagesApplied=true;
  state.run.strongMetaSnapshot=emptyResolvedStrongMetaSnapshot();
  state.run.flags['story.arrived']=true;
  state.run.resources.money=2_000;
  state.run.dayState.energyCurrent=3;
  return state;
}

function reloadProgress<T>(value:T):T{
  return JSON.parse(JSON.stringify(value)) as T;
}

test('a paid School lesson may legitimately open a blocking School scene',()=>{
  const cat=catalog();
  const before=ready();

  const result=executeSchoolLesson(
    before,
    fixture.paidLesson.courseId,
    cat,
    runtime
  );

  assert.equal(
    result.state.run.flow.pendingScene?.eventId,
    fixture.blockingScene.eventId
  );
  assert.equal(
    result.course.presentationId,
    fixture.paidLesson.presentationId
  );
  assert.equal(result.state.run.resources.money,1_500);
  assert.equal(result.state.run.dayState.energyCurrent,2);
});

test('NightFlow cannot begin until the blocking School scene is resolved',()=>{
  const cat=catalog();
  const paid=executeSchoolLesson(
    ready(),
    fixture.paidLesson.courseId,
    cat,
    runtime
  ).state;

  assert.throws(
    ()=>dispatch(paid,{type:'endDay'},cat),
    /сцену/
  );

  const resolved=dispatch(
    paid,
    {type:'choice',id:fixture.blockingScene.choiceId},
    cat
  );
  assert.equal(resolved.run.flow.pendingScene,null);
  assert.doesNotThrow(
    ()=>dispatch(resolved,{type:'endDay'},cat)
  );
});

test('save reload preserves the pending School scene before resolution',()=>{
  const cat=catalog();
  const paid=executeSchoolLesson(
    ready(),
    fixture.paidLesson.courseId,
    cat,
    runtime
  ).state;

  const restored=parseSave(JSON.stringify(paid),cat);

  assert.equal(
    restored.run.flow.pendingScene?.eventId,
    fixture.blockingScene.eventId
  );
  assert.deepEqual(
    restored.run.flow.pendingScene?.allowedChoiceIds,
    [fixture.blockingScene.choiceId]
  );
});

test('resolving the blocking scene does not recharge tuition or Energy',()=>{
  const cat=catalog();
  const paid=executeSchoolLesson(
    ready(),
    fixture.paidLesson.courseId,
    cat,
    runtime
  ).state;

  const money=paid.run.resources.money;
  const energy=paid.run.dayState.energyCurrent;

  const restored=parseSave(JSON.stringify(paid),cat);
  const resolved=dispatch(
    restored,
    {type:'choice',id:fixture.blockingScene.choiceId},
    cat
  );

  assert.equal(resolved.run.resources.money,money);
  assert.equal(resolved.run.dayState.energyCurrent,energy);
});

test('typed School progress is committed by the lesson only and is not duplicated by scene reload or resolution',()=>{
  let progress={
    lessons_completed:0,
    night_study_sessions:0
  };

  progress={
    lessons_completed:
      progress.lessons_completed+
      fixture.paidLesson.typedCounterDelta.lessons_completed,
    night_study_sessions:
      progress.night_study_sessions+
      fixture.paidLesson.typedCounterDelta.night_study_sessions
  };

  const afterLesson=reloadProgress(progress);
  const afterSceneReload=reloadProgress(afterLesson);
  const afterSceneResolution=reloadProgress(afterSceneReload);

  assert.deepEqual(afterLesson,{
    lessons_completed:1,
    night_study_sessions:0
  });
  assert.deepEqual(afterSceneReload,afterLesson);
  assert.deepEqual(afterSceneResolution,afterLesson);
});

test('semantic paid School presentation identity remains stable across the blocking-scene transaction',()=>{
  const cat=catalog();
  const result=executeSchoolLesson(
    ready(),
    fixture.paidLesson.courseId,
    cat,
    runtime
  );

  const presentationBefore=result.course.presentationId;
  const restoredPresentation=JSON.parse(
    JSON.stringify(presentationBefore)
  );

  assert.equal(
    presentationBefore,
    'school/arcana/lesson/default'
  );
  assert.equal(restoredPresentation,presentationBefore);
  assert.equal(
    fixture.paidLesson.presentationId,
    presentationBefore
  );
});
