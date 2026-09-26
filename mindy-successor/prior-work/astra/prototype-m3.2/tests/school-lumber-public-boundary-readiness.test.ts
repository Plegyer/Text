import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {loadCatalog} from '../src/core/content.ts';
import {
  applyEffects,
  freshSave,
  resolveReactions
} from '../src/core/engine.ts';
import {
  SCHOOL_ACTION_ID,
  executeSchoolLesson
} from '../src/core/school.ts';
import type {Catalog,Save} from '../src/core/schema.ts';

const lumberManifest=JSON.parse(
  readFileSync('content/lumber-product-acceptance.fixture-manifest.json','utf8')
);
const lumberDefinitions=JSON.parse(
  readFileSync('content/lumber-target-definitions.fixture.json','utf8')
);
const schoolCompat=JSON.parse(
  readFileSync('content/school-typed-state-compat.fixture.json','utf8')
);
const schoolReachability=JSON.parse(
  readFileSync('content/school-production-reachability.fixture.json','utf8')
);
const schoolActivation=JSON.parse(
  readFileSync('content/school-activation-expectations.fixture.json','utf8')
);
const lumberHooks=readFileSync(
  '../../../docs/lumber-prep/LUMBER_CROSS_SYSTEM_HOOKS_v1.md',
  'utf8'
);
const lumberProgression=readFileSync(
  '../../../docs/lumber-prep/LUMBER_TYPED_PROGRESSION_MAP_v1.md',
  'utf8'
);

const runtime={applyEffects,resolveReactions};

function definitions(){
  return {
    version:'0.1.0',
    flags:[],
    actions:[],
    endings:[],
    careers:[{
      id:'lumber',
      label:'Lumber fixture career',
      initialStage:'new',
      stages:['new'],
      transitions:[]
    }],
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
    id:'school-lumber-readiness',
    reads:[],
    writes:[],
    capabilities:{
      reads:{
        stats:['strength'],
        worldFacts:['school.fixture.public-boundary']
      },
      writes:{
        careers:['lumber']
      }
    },
    media:[],
    events:[
      {
        id:'school-lumber-readiness.physical-stat',
        title:'Physical School stat reaches Lumber',
        reactionTriggers:[{kind:'statChanged',stat:'strength'}],
        priorityClass:'normal_progression',
        priority:100,
        blocking:true,
        delivery:{policy:'live'},
        cooldownDays:0,
        variantCooldownDays:0,
        maxShows:1,
        conditions:[{kind:'stat',stat:'strength',op:'gte',value:4}],
        variants:[{
          id:'default',
          text:'The Lumber fixture reacts to the authoritative School stat change.',
          conditions:[],
          media:[]
        }],
        choices:[{
          id:'continue',
          label:'Continue',
          text:'Continue after the stat-based Lumber reaction.',
          conditions:[],
          effects:[{kind:'addCareerFact',career:'lumber',fact:'physical-school-seen'}]
        }]
      },
      {
        id:'school-lumber-readiness.public-fact',
        title:'Public fact reaches Lumber',
        reactionTriggers:[{
          kind:'worldFactAdded',
          fact:'school.fixture.public-boundary'
        }],
        priorityClass:'normal_progression',
        priority:90,
        blocking:true,
        delivery:{policy:'live'},
        cooldownDays:0,
        variantCooldownDays:0,
        maxShows:1,
        conditions:[{
          kind:'worldFact',
          fact:'school.fixture.public-boundary',
          present:true
        }],
        variants:[{
          id:'default',
          text:'The fixture-only public world fact reaches Lumber through the shared boundary.',
          conditions:[],
          media:[]
        }],
        choices:[{
          id:'continue',
          label:'Continue',
          text:'Continue after the fixture public-fact reaction.',
          conditions:[],
          effects:[{kind:'addCareerFact',career:'lumber',fact:'public-boundary-seen'}]
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
  state.run.resources.money=2_000;
  state.run.dayState.energyCurrent=3;
  return state;
}

test('Physical Training reaches Lumber through normal statChanged reaction facts with no School-specific prerequisite',()=>{
  const cat=catalog();
  const state=ready();
  state.run.character.stats.strength=1;
  state.run.character.stats.endurance=1;
  state.run.character.stats.dexterity=1;

  const result=executeSchoolLesson(
    state,
    'school.course.physical_training',
    cat,
    runtime
  );

  assert.deepEqual(
    result.reactionFacts
      .filter(fact=>fact.kind==='statChanged')
      .map(fact=>fact.stat)
      .sort(),
    ['dexterity','endurance','strength']
  );
  assert.ok(
    result.reactionFacts.some(
      fact=>fact.kind==='actionCompleted'&&fact.action===SCHOOL_ACTION_ID
    )
  );
  assert.equal(
    result.state.run.flow.pendingScene?.eventId,
    'school-lumber-readiness.physical-stat'
  );
});

test('durable School-to-Lumber fixture transport uses public worldFacts/worldFactAdded rather than private School state',()=>{
  const cat=catalog();
  const before=ready();

  const withFact=applyEffects(
    before,
    [{kind:'addWorldFact',fact:'school.fixture.public-boundary'}],
    cat
  );
  assert.deepEqual(
    withFact.run.progression.worldFacts,
    ['school.fixture.public-boundary']
  );

  const resolved=resolveReactions(
    withFact,
    [{kind:'worldFactAdded',fact:'school.fixture.public-boundary'}],
    cat,
    {newEpoch:true}
  );

  assert.equal(
    resolved.state.run.flow.pendingScene?.eventId,
    'school-lumber-readiness.public-fact'
  );

  for(const track of Object.values(
    schoolCompat.defaultSchoolProgression.tracks
  ) as any[]){
    assert.match(track.trackId,/^school\.track\./);
    assert.equal(JSON.stringify(track).includes('lumber'),false);
  }
});

test('final management/accounting and Arcana/forest School public fact IDs remain explicitly OPEN',()=>{
  assert.match(
    lumberHooks,
    /final School-owned public fact ID for the generic management gate remains OPEN/i
  );
  assert.match(
    lumberHooks,
    /exact School milestone\/public fact ID remains OPEN/i
  );
  assert.match(
    lumberProgression,
    /final School public fact ID remains OPEN/i
  );

  const readinessDoc=readFileSync(
    '../../../docs/school-prep/SCHOOL_LUMBER_PUBLIC_BOUNDARY_READINESS_v1.md',
    'utf8'
  );
  assert.match(readinessDoc,/management\/accounting School public fact ID remains \*\*OPEN\*\*/);
  assert.match(readinessDoc,/Arcana\/forest School public fact ID remains \*\*OPEN\*\*/);
});

test('School fixtures do not silently invent management/certificate thresholds',()=>{
  const fixtures=[schoolCompat,schoolReachability,schoolActivation];

  const visit=(value:unknown,path:string[]=[]):string[]=>{
    if(Array.isArray(value)){
      return value.flatMap((item,index)=>visit(item,[...path,String(index)]));
    }
    if(value&&typeof value==='object'){
      return Object.entries(value as Record<string,unknown>).flatMap(
        ([key,child])=>[
          [...path,key].join('.'),
          ...visit(child,[...path,key])
        ]
      );
    }
    return [];
  };

  const paths=fixtures.flatMap(fixture=>visit(fixture));
  assert.equal(
    paths.some(path=>/management.*threshold|certificate.*threshold/i.test(path)),
    false
  );

  for(const track of Object.values(
    schoolCompat.defaultSchoolProgression.tracks
  ) as any[]){
    assert.deepEqual(track.milestones,[]);
    assert.deepEqual(track.certificates,[]);
  }
});

test('Lumber Hard Work remains exactly 50 completed shifts and contains no School prerequisite',()=>{
  const manifestGate=lumberManifest.mappings.hardWorkEnding.eligibility;
  assert.deepEqual(manifestGate,{
    kind:'careerCounter',
    career:'lumber',
    counter:'completed_shifts',
    op:'gte',
    value:50
  });
  assert.equal(
    lumberManifest.lockedConstraints
      .hardWorkEligibilityOnlyFiftyCompletedLumberShifts,
    true
  );

  const hardWork=lumberDefinitions.endings.find(
    (ending:any)=>ending.id==='ending.lumber.hard-work'
  );
  assert.ok(hardWork);
  assert.deepEqual(hardWork.conditions,[{
    kind:'careerCounter',
    career:'lumber',
    counter:'completed_shifts',
    op:'gte',
    value:50
  }]);

  const serialized=JSON.stringify(hardWork).toLowerCase();
  assert.equal(serialized.includes('school'),false);
  assert.equal(serialized.includes('certificate'),false);
  assert.equal(serialized.includes('worldfact'),false);

  assert.match(
    lumberProgression,
    /career\.shifts\(lumber\) >= 50/
  );
  assert.match(
    lumberProgression,
    /this is the complete Hard Work eligibility gate/i
  );
});
