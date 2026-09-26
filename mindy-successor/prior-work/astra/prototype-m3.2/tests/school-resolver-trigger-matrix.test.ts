import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {loadCatalog} from '../src/core/content.ts';
import {applyEffects,freshSave,meets,resolveReactions} from '../src/core/engine.ts';
import {
  SCHOOL_ACTION_ID,
  SCHOOL_COURSES,
  executeSchoolLesson
} from '../src/core/school.ts';
import type {Catalog,ReactionFact,Save} from '../src/core/schema.ts';

const fixture=JSON.parse(
  readFileSync('content/school-resolver-trigger-matrix.fixture.json','utf8')
);

function definitions(withEnding=false){
  return {
    version:'0.1.0',
    flags:[],
    actions:[],
    endings:withEnding?[{
      id:fixture.endingCase.endingId,
      title:'Fixture Arcana-ready ending',
      description:'Synthetic ending for same-boundary School eligibility.',
      conditions:fixture.endingCase.fullPackageConditions,
      reward:'fixture.arcana-ready',
      metaRewards:[],
      epilogue:'Fixture ending epilogue.'
    }]:[],
    careers:[],
    quests:[],
    relationships:[],
    lodgings:[],
    nightChoices:[],
    activities:[]
  };
}

function pack(withEndingEvent=false){
  return {
    schemaVersion:1,
    id:'school-resolver-trigger-matrix',
    reads:[],
    writes:[],
    capabilities:{
      reads:{stats:['magic','reason','creativity']},
      writes:{}
    },
    media:[],
    events:withEndingEvent?[{
      id:'school-resolver.fixture-ending-visible',
      title:'Fixture ending visible',
      reactionTriggers:[{
        kind:'endingEligible',
        ending:fixture.endingCase.endingId
      }],
      priorityClass:'normal_progression',
      priority:100,
      blocking:true,
      delivery:{policy:'live'},
      cooldownDays:0,
      variantCooldownDays:0,
      maxShows:1,
      conditions:fixture.endingCase.fullPackageConditions,
      variants:[{
        id:'default',
        text:'Resolver observes the complete Arcana package and same-boundary ending eligibility.',
        conditions:[],
        media:[]
      }],
      choices:[{
        id:'continue',
        label:'Continue',
        text:'Continue after the full-package ending eligibility observation.',
        conditions:[],
        effects:[]
      }]
    }]:[]
  };
}

function catalog(withEnding=false):Catalog{
  return loadCatalog(definitions(withEnding),[pack(withEnding)]);
}

function ready():Save{
  const state=freshSave();
  state.run.character.creation.remaining=0;
  state.run.character.creation.allocated={};
  state.run.character.creation.complete=true;
  state.run.resources.money=2_000;
  state.run.dayState.energyCurrent=3;
  return state;
}

const currentRuntime={applyEffects,resolveReactions};

const activationBoundaryRuntime={
  applyEffects,
  resolveReactions(
    input:Save,
    facts:ReactionFact[],
    cat:Catalog,
    options?:{newEpoch?:boolean}
  ){
    const state=structuredClone(input) as Save;
    const endingFacts:ReactionFact[]=[];
    for(const ending of cat.definitions.endings){
      if(
        meets({kind:'all',conditions:ending.conditions},state,cat)&&
        !state.run.endings.eligible.includes(ending.id)
      ){
        state.run.endings.eligible.push(ending.id);
        endingFacts.push({kind:'endingEligible',ending:ending.id});
      }
    }
    return resolveReactions(
      state,
      [...facts,...endingFacts],
      cat,
      options
    );
  }
};

test('each paid course emits one actionCompleted, every statChanged, resourceChanged, and energyChanged fact from one complete transaction',()=>{
  const cat=catalog(false);

  for(const course of SCHOOL_COURSES){
    const result=executeSchoolLesson(
      ready(),
      course.id,
      cat,
      currentRuntime
    );
    const row=fixture.courses.find((item:any)=>item.courseId===course.id);
    assert.ok(row,course.id);

    assert.equal(
      result.reactionFacts.filter(
        fact=>fact.kind==='actionCompleted'&&fact.action===SCHOOL_ACTION_ID
      ).length,
      1,
      course.id
    );
    assert.deepEqual(
      result.reactionFacts
        .filter(fact=>fact.kind==='statChanged')
        .map(fact=>fact.stat),
      row.statChanged,
      course.id
    );
    assert.equal(
      result.reactionFacts.filter(fact=>fact.kind==='resourceChanged').length,
      1,
      course.id
    );
    assert.equal(
      result.reactionFacts.filter(fact=>fact.kind==='energyChanged').length,
      1,
      course.id
    );
    assert.deepEqual(
      result.reactionFacts.map(fact=>fact.kind),
      row.factKinds,
      course.id
    );
  }
});

test('Resolver receives the complete paid stat package rather than partial per-stat boundaries',()=>{
  const cat=catalog(false);

  for(const course of SCHOOL_COURSES){
    const state=ready();
    for(const effect of course.statEffects){
      state.run.character.stats[effect.stat]=1;
    }
    const result=executeSchoolLesson(
      state,
      course.id,
      cat,
      currentRuntime
    );

    for(const effect of course.statEffects){
      assert.equal(
        result.state.run.character.stats[effect.stat],
        1+effect.amount,
        `${course.id} / ${effect.stat}`
      );
    }

    const traceFacts=(result.resolverTrace as any).facts as string[];
    for(const effect of course.statEffects){
      assert.ok(
        traceFacts.some(
          fact=>fact.startsWith(`statChanged:${effect.stat}:`)
        ),
        `${course.id} / ${effect.stat}`
      );
    }
  }
});

test('when activation registers an ending after the full package, endingEligible joins the same Resolver boundary',()=>{
  const cat=catalog(true);
  const state=ready();
  state.run.character.stats.magic=1;
  state.run.character.stats.reason=1;
  state.run.character.stats.creativity=1;

  const result=executeSchoolLesson(
    state,
    'school.course.arcana',
    cat,
    activationBoundaryRuntime
  );

  assert.deepEqual(
    {
      magic:result.state.run.character.stats.magic,
      reason:result.state.run.character.stats.reason,
      creativity:result.state.run.character.stats.creativity
    },
    {magic:5,reason:5,creativity:3}
  );
  assert.ok(
    result.state.run.endings.eligible.includes(
      fixture.endingCase.endingId
    )
  );
  assert.equal(
    result.state.run.flow.pendingScene?.eventId,
    'school-resolver.fixture-ending-visible'
  );

  const trace=(result.resolverTrace as any).facts as string[];
  assert.ok(
    trace.includes(
      `endingEligible:${fixture.endingCase.endingId}`
    )
  );
  assert.ok(trace.some(fact=>fact.startsWith('statChanged:magic:')));
  assert.ok(trace.some(fact=>fact.startsWith('statChanged:reason:')));
  assert.ok(trace.some(fact=>fact.startsWith('statChanged:creativity:')));
});

test('ending case cannot trigger from a partial Arcana package',()=>{
  const cat=catalog(true);
  const partial=ready();
  partial.run.character.stats.magic=5;
  partial.run.character.stats.reason=1;
  partial.run.character.stats.creativity=1;

  const ending=cat.definitions.endings[0];
  assert.ok(ending);
  assert.equal(
    meets({kind:'all',conditions:ending.conditions},partial,cat),
    false
  );
});
