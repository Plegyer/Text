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
  readFileSync('content/school-pa-shipped-row-evidence.fixture.json','utf8')
);
const typedCompat=JSON.parse(
  readFileSync('content/school-typed-state-compat.fixture.json','utf8')
);
const exactlyOnce=JSON.parse(
  readFileSync('content/school-typed-progress-exactly-once.fixture.json','utf8')
);
const runtime={applyEffects,resolveReactions};

function definitions(){
  return {
    version:'0.1.0',
    flags:['story.arrived'],
    actions:[{
      id:'rest',
      label:'Rest',
      description:'PA evidence persisted post-Night action.',
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
      id:'school.pa.evidence.room',
      label:'PA evidence room',
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
    id:'school-pa-shipped-row-evidence',
    reads:[],
    writes:[],
    capabilities:{reads:{},writes:{}},
    media:[{
      id:'stage.room',
      kind:'image',
      src:'assets/room.svg',
      alt:'PA evidence room'
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

test('paid lesson transaction is executable in the shipped School runtime slice',()=>{
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

  assert.equal(result.state.run.resources.money,1_500);
  assert.equal(result.state.run.dayState.energyCurrent,2);
  assert.deepEqual({
    magic:result.state.run.character.stats.magic,
    reason:result.state.run.character.stats.reason,
    creativity:result.state.run.character.stats.creativity
  },{magic:5,reason:5,creativity:3});
  assert.equal(
    result.course.presentationId,
    'school/arcana/lesson/default'
  );
});

test('typed School progress is shipped as an accepted Chat 5 contract while shared activation remains explicitly separate',()=>{
  assert.equal(
    Object.keys(typedCompat.defaultSchoolProgression.tracks).length,
    8
  );
  assert.equal(exactlyOnce.entries.length,8);

  for(const entry of exactlyOnce.entries){
    assert.deepEqual(entry.paidLessonDelta,{
      lessons_completed:1,
      night_study_sessions:0
    });
    assert.deepEqual(entry.nightStudyDelta,{
      lessons_completed:0,
      night_study_sessions:1
    });
  }

  const row=fixture.evidence.find(
    (item:any)=>item.paRow==='school.progress'
  );
  assert.equal(row.status,'SHIPPED_CHAT5_CONTRACT');
  assert.match(row.sharedActivationNote,/Lead-owned/);
});

test('presentation and save/reload behavior are runtime-backed for the current School/Night slice',()=>{
  const cat=catalog();
  let state=ready();
  state=executeSchoolLesson(
    state,
    'school.course.arcana',
    cat,
    runtime
  ).state;
  const afterLesson=parseSave(JSON.stringify(state),cat);
  assert.equal(afterLesson.run.resources.money,1_500);

  state=dispatch(afterLesson,{type:'endDay'},cat);
  state=dispatch(
    state,
    {type:'chooseLodging',id:'school.pa.evidence.room'},
    cat
  );
  state=parseSave(JSON.stringify(state),cat);

  const reasonBefore=state.run.character.stats.reason;
  state=dispatch(
    state,
    {type:'chooseNightChoice',id:'school.night_study.arcana.reason'},
    cat
  );

  const afterNight=parseSave(JSON.stringify(state),cat);
  assert.equal(afterNight.run.calendar.elapsedDays,1);
  assert.equal(afterNight.run.character.stats.reason,reasonBefore+2);
  assert.equal(afterNight.run.dayState.energyCurrent,2);
});

test('public fact transport exists but final School-to-Lumber authored facts remain OPEN',()=>{
  const row=fixture.evidence.find(
    (item:any)=>item.paRow==='required-flow.school-result-affects-lumber'
  );
  assert.equal(row.status,'OPEN_AUTHORING');
  assert.match(row.commandOrApi,/addWorldFact\/worldFactAdded/);

  const boundary=readFileSync(
    '../../../docs/school-prep/SCHOOL_LUMBER_PUBLIC_BOUNDARY_READINESS_v1.md',
    'utf8'
  );
  assert.match(boundary,/management\/accounting School public fact ID remains \*\*OPEN\*\*/i);
  assert.match(boundary,/Arcana\/forest School public fact ID remains \*\*OPEN\*\*/i);
});

test('evidence does not falsely claim the shared production schoolLesson command is shipped',()=>{
  assert.equal(
    fixture.currentSharedFirstClassCommands.paidLessonProductionCommandShipped,
    false
  );
  assert.equal(
    fixture.currentSharedFirstClassCommands.expectedPaidLessonCommand,
    'schoolLesson'
  );
  assert.deepEqual(
    fixture.currentSharedFirstClassCommands.nightFlowCommands,
    ['endDay','chooseLodging','chooseNightChoice']
  );
});
