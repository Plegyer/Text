import test from 'node:test';
import assert from 'node:assert/strict';
import {loadCatalog} from '../src/core/content.ts';
import {applyEffects,dispatch,freshSave,resolveReactions} from '../src/core/engine.ts';
import {executeSchoolLesson} from '../src/core/school.ts';
import type {Catalog,Save} from '../src/core/schema.ts';
import {readFileSync} from 'node:fs';

const fixture=JSON.parse(
  readFileSync('content/school-low-money-safety.fixture.json','utf8')
);
const runtime={applyEffects,resolveReactions};

function definitions(){
  return {
    version:'0.1.0',
    flags:['story.arrived'],
    actions:[{
      id:fixture.normalNonSchoolAction.actionId,
      label:'Safety work',
      description:'A normal non-School action that remains available after a rejected School attempt.',
      cost:{money:0,energy:0},
      conditions:[],
      effects:[{
        kind:'modifyResource',
        resource:'money',
        delta:fixture.normalNonSchoolAction.moneyDelta
      }],
      mode:'normal'
    }],
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
    id:'school-low-money-safety',
    reads:[],
    writes:[],
    capabilities:{
      reads:{resources:['money']},
      writes:{resources:['money']}
    },
    media:[{
      id:'stage.town',
      kind:'image',
      src:'assets/town.svg',
      alt:'Safety fixture town'
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
  return state;
}

test('insufficient School money rejects atomically and leaves the run unchanged',()=>{
  const cat=catalog();
  const state=ready();
  state.run.resources.money=299;
  state.run.dayState.energyCurrent=1;
  const before=JSON.stringify(state);

  assert.throws(
    ()=>executeSchoolLesson(
      state,
      fixture.representativeCourseId,
      cat,
      runtime
    ),
    /money/
  );
  assert.equal(JSON.stringify(state),before);
});

test('insufficient current-day Energy rejects atomically and leaves the run unchanged',()=>{
  const cat=catalog();
  const state=ready();
  state.run.resources.money=300;
  state.run.dayState.energyCurrent=0;
  const before=JSON.stringify(state);

  assert.throws(
    ()=>executeSchoolLesson(
      state,
      fixture.representativeCourseId,
      cat,
      runtime
    ),
    /Energy/
  );
  assert.equal(JSON.stringify(state),before);
});

test('a rejected School attempt does not corrupt or globally block a normal non-School action',()=>{
  const cat=catalog();
  let state=ready();
  state.run.resources.money=299;
  state.run.dayState.energyCurrent=0;

  const beforeSchool=JSON.stringify(state);
  assert.throws(
    ()=>executeSchoolLesson(
      state,
      fixture.representativeCourseId,
      cat,
      runtime
    )
  );
  assert.equal(JSON.stringify(state),beforeSchool);

  state=dispatch(
    state,
    {type:'action',id:fixture.normalNonSchoolAction.actionId},
    cat
  );

  assert.equal(state.run.resources.money,300);
  assert.equal(state.run.dayState.energyCurrent,0);
  assert.equal(
    state.run.historyState.actionCounts[
      fixture.normalNonSchoolAction.actionId
    ],
    1
  );
});

test('low-money fixture deliberately does not claim economy-wide no-softlock proof',()=>{
  assert.deepEqual(fixture.claimScope,{
    schoolAtomicFailureSafe:true,
    normalNonSchoolActionCanRemainAvailable:true,
    economyWideNoSoftlockProven:false,
    note:'This fixture proves local School failure safety only; it does not prove every product economy state has an escape.'
  });
});
