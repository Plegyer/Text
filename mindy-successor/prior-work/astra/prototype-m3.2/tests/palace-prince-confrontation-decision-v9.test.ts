import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

import {
  actionSchema,
  activityDefinitionSchema,
  eventSchema,
  machineDefinitionSchema,
  stats
} from '../src/core/schema.ts';

const fixture=JSON.parse(readFileSync('content/palace-prince-confrontation-decision-v9.fixture.json','utf8'));
const definitions=JSON.parse(readFileSync('content/definitions.json','utf8'));
const engineSource=readFileSync('src/core/engine.ts','utf8');
const schemaSource=readFileSync('src/core/schema.ts','utf8');
const appSource=readFileSync('src/ui/app.ts','utf8');

const progressionComplete={kind:'worldFact',fact:'palace.progression-complete',present:true} as const;
const princeNotDefeated={kind:'worldFact',fact:'palace.prince-defeated',present:false} as const;
const readiness=stats.map(stat=>({kind:'stat' as const,stat,op:'gte' as const,value:91}));
const commonEntryConditions=[progressionComplete,...readiness,princeNotDefeated];

test('packet freezes exactly three lower-complexity models and no production implementation',()=>{
  assert.equal(fixture.status,'READY_FOR_LEADER_PRODUCT_DECISION');
  assert.deepEqual(
    fixture.options.map((option:any)=>option.id),
    ['A_ACTIVITY_CORE','B_QUEST_EVENT_CHAIN','C_PRELUDE_ACTIVITY_VERDICT']
  );
  assert.equal(fixture.options.every((option:any)=>option.engineChangeRequired===false),true);
  assert.ok(fixture.explicitNonGoals.includes('No generic combat subsystem.'));
  assert.ok(fixture.explicitNonGoals.includes('No production runtime implementation.'));
});

test('all models share fixed all-12 >=91 readiness and exclude Lust',()=>{
  assert.equal(fixture.locked.progressionStatThreshold,91);
  assert.deepEqual(fixture.locked.progressionStats,[...stats]);
  assert.equal(fixture.locked.progressionStats.length,12);
  assert.equal(fixture.locked.lustIncluded,false);

  assert.deepEqual(
    fixture.commonContract.readinessConditions,
    stats.map(stat=>({kind:'stat',stat,op:'gte',value:91}))
  );
  assert.equal(fixture.commonContract.readinessConditions.some((condition:any)=>condition.stat==='lust'),false);
  assert.match(fixture.commonContract.cap200Rule,/raw >=91/i);
  assert.match(fixture.commonContract.cap200Rule,/no normalization/i);
  assert.match(fixture.commonContract.cap200Rule,/no Palace multiplication/i);
});

test('all models use one exact run-local prince-defeated signal and keep Return Home as a separate commit',()=>{
  assert.deepEqual(fixture.commonContract.exactDefeatSignal,{
    kind:'worldFact',
    fact:'palace.prince-defeated',
    present:true
  });
  assert.equal(fixture.commonContract.returnHomeEnding.separatePlayerCommit,true);
  assert.equal(fixture.commonContract.returnHomeEnding.automaticCommitOnDefeat,false);

  for(const option of fixture.options){
    assert.equal(option.princeDefeatedSignal.effect.kind,'addWorldFact',option.id);
    assert.equal(option.princeDefeatedSignal.effect.fact,'palace.prince-defeated',option.id);
    assert.match(option.returnHomeSeparation,/Return Home/i,option.id);
    assert.match(option.returnHomeSeparation,/separate|separately/i,option.id);
  }
});

test('Option A Activity Core is valid against the existing counter.v1 Activity schema',()=>{
  const candidate={
    id:'palace.prince-confrontation',
    label:'Palace final confrontation',
    version:1,
    entryConditions:commonEntryConditions,
    entryEnergyCost:0,
    resumePolicy:'allowed',
    timePolicy:'same_day',
    failurePolicy:'exit_to_day',
    adapter:'counter.v1',
    adapterConfig:{
      initialEndurance:8,
      advanceEnduranceCost:2,
      successAtProgress:6,
      failAtEndurance:0
    },
    options:[
      {
        id:'palace.prince.route.direct',
        label:'Choose a direct approach',
        category:'route',
        conditions:[],
        progressDelta:0,
        enduranceCost:0,
        setRoute:'direct'
      },
      {
        id:'palace.prince.direct.step-one',
        label:'Commit to the first exchange',
        category:'confrontation',
        conditions:[],
        progressDelta:2,
        enduranceCost:1,
        setRoute:'direct'
      },
      {
        id:'palace.prince.direct.step-two',
        label:'Hold the chosen line',
        category:'confrontation',
        conditions:[],
        progressDelta:2,
        enduranceCost:2,
        setRoute:'direct'
      },
      {
        id:'palace.prince.direct.step-three',
        label:'Press the final point',
        category:'confrontation',
        conditions:[],
        progressDelta:2,
        enduranceCost:1,
        setRoute:'direct'
      },
      {
        id:'palace.prince.support.evidence',
        label:'Use prepared evidence support',
        category:'support',
        conditions:[{kind:'itemCapability',capability:'assassin_handle_evidence',present:true}],
        progressDelta:2,
        enduranceCost:0
      }
    ],
    results:[
      {
        id:'palace.prince-confrontation.success',
        outcome:'success',
        effects:[{kind:'addWorldFact',fact:'palace.prince-defeated'}]
      },
      {
        id:'palace.prince-confrontation.escape',
        outcome:'escape',
        effects:[]
      },
      {
        id:'palace.prince-confrontation.failure',
        outcome:'failure',
        effects:[]
      }
    ]
  };

  const parsed=activityDefinitionSchema.parse(candidate);
  assert.equal(parsed.adapter,'counter.v1');
  assert.equal(parsed.resumePolicy,'allowed');
  assert.equal(parsed.failurePolicy,'exit_to_day');
  assert.equal(parsed.entryConditions.filter(condition=>condition.kind==='stat').length,12);
  assert.equal(parsed.results.find(result=>result.outcome==='success')?.effects.some(
    effect=>effect.kind==='addWorldFact'&&effect.fact==='palace.prince-defeated'
  ),true);
});

test('Option B quest-backed event chain uses existing quest/action/event primitives only',()=>{
  const quest={
    id:'palace.prince-confrontation',
    label:'Palace Prince confrontation state',
    initialStage:'ready',
    stages:['ready','confronting','defeated'],
    transitions:[
      {
        id:'begin',
        from:['ready'],
        to:'confronting',
        conditions:[],
        effects:[]
      },
      {
        id:'withdraw',
        from:['confronting'],
        to:'ready',
        conditions:[],
        effects:[]
      },
      {
        id:'defeat',
        from:['confronting'],
        to:'defeated',
        conditions:[],
        effects:[{kind:'addWorldFact',fact:'palace.prince-defeated'}]
      }
    ]
  };
  const action={
    id:'palace.confront-prince',
    label:'Confront the Prince',
    description:'Begin the Palace final confrontation when all readiness conditions are satisfied.',
    cost:{money:0,energy:0},
    conditions:[
      ...commonEntryConditions,
      {kind:'questStage',quest:'palace.prince-confrontation',stage:'ready'}
    ],
    effects:[
      {kind:'advanceQuest',quest:'palace.prince-confrontation',transition:'begin'}
    ],
    mode:'story',
    scenes:[
      {
        id:'ready',
        text:'The confrontation is ready to begin by explicit player choice.',
        conditions:[],
        media:[]
      }
    ]
  };
  const openingEvent={
    id:'palace.prince-confrontation.opening',
    title:'Final confrontation — opening',
    sourceDomain:'palace',
    trigger:[],
    reactionTriggers:[{kind:'actionCompleted',action:'palace.confront-prince'}],
    priorityClass:'critical_progression',
    priority:100,
    blocking:true,
    delivery:{policy:'latched'},
    cooldownDays:0,
    variantCooldownDays:0,
    maxShows:16,
    conditions:[
      {kind:'questStage',quest:'palace.prince-confrontation',stage:'confronting'}
    ],
    variants:[
      {
        id:'default',
        text:'The confrontation has begun and now requires an explicit sequence of choices.',
        conditions:[],
        media:[]
      }
    ],
    choices:[
      {
        id:'continue',
        label:'Continue the confrontation',
        text:'Continue to the next authored confrontation beat.',
        conditions:[],
        effects:[]
      },
      {
        id:'withdraw',
        label:'Withdraw for now',
        text:'Withdraw without claiming that the Prince has been defeated.',
        conditions:[],
        effects:[{kind:'advanceQuest',quest:'palace.prince-confrontation',transition:'withdraw'}]
      }
    ]
  };

  assert.doesNotThrow(()=>machineDefinitionSchema.parse(quest));
  assert.doesNotThrow(()=>actionSchema.parse(action));
  assert.doesNotThrow(()=>eventSchema.parse(openingEvent));
});

test('Option C can use the existing activityResult trigger for a separate verdict event',()=>{
  const verdictEvent={
    id:'palace.prince-confrontation.verdict',
    title:'Final confrontation — verdict',
    sourceDomain:'palace',
    trigger:[],
    reactionTriggers:[
      {
        kind:'activityResult',
        activity:'palace.prince-confrontation',
        outcome:'success',
        result:'palace.prince-confrontation.success'
      }
    ],
    priorityClass:'critical_progression',
    priority:100,
    blocking:true,
    delivery:{policy:'latched'},
    cooldownDays:0,
    variantCooldownDays:0,
    maxShows:1,
    conditions:[
      {kind:'worldFact',fact:'palace.prince-defeated',present:false}
    ],
    variants:[
      {
        id:'default',
        text:'The successful Activity result reaches an authored verdict before Return Home becomes available.',
        conditions:[],
        media:[]
      }
    ],
    choices:[
      {
        id:'confirm',
        label:'Stand by the result',
        text:'The confrontation is resolved; this records only the Prince defeat signal.',
        conditions:[],
        effects:[{kind:'addWorldFact',fact:'palace.prince-defeated'}]
      }
    ]
  };

  const parsed=eventSchema.parse(verdictEvent);
  assert.deepEqual(parsed.reactionTriggers,[{
    kind:'activityResult',
    activity:'palace.prince-confrontation',
    outcome:'success',
    result:'palace.prince-confrontation.success'
  }]);
  assert.deepEqual(parsed.choices[0].effects,[{
    kind:'addWorldFact',
    fact:'palace.prince-defeated'
  }]);
});

test('optional support examples reference capabilities that actually ship in current definitions',()=>{
  const capabilities=new Set(
    (definitions.itemDefinitions??[]).flatMap((item:any)=>item.capabilities??[])
  );
  for(const capability of [
    'guard_sealed_pass',
    'artist_handle_invitation',
    'merchant_verify_manifest',
    'assassin_handle_evidence'
  ]){
    assert.ok(capabilities.has(capability),capability);
  }
});

test('current engine already serializes/resumes Activity and blocks ending commit during active confrontation state',()=>{
  assert.match(engineSource,/activityEnvelopeSchema|flow\.activity/);
  assert.match(engineSource,/resumePolicy/);
  assert.match(engineSource,/s\.run\.flow\.activity=null/);
  assert.match(engineSource,/if\(s\.run\.pending\|\|s\.run\.flow\.night\|\|s\.run\.flow\.activity\)throw new Error\('Завершите текущую сцену, ночь или Activity\.'/);
  assert.match(engineSource,/s\.run\.endings\.committed=endingId/);
  assert.match(engineSource,/s\.run\.status='ending_committed'/);
});

test('current UI already supports explicit action and Activity commands, but Activity entries are intentionally listed',()=>{
  assert.match(appSource,/data-action/);
  assert.match(appSource,/type:'action'/);
  assert.match(appSource,/data-enter-activity/);
  assert.match(appSource,/type:'enterActivity'/);
  assert.match(appSource,/activityEntryList\(\['lumber\.forest','hunter\.expedition'\]\)/);
  assert.match(appSource,/activityEntryList\(\['assassin\.infiltration'\]\)/);

  for(const option of fixture.options){
    assert.ok(option.productionTouches.some((touch:string)=>touch.includes('src/ui/app.ts')),option.id);
  }
});

test('failure/refusal in every model leaves prince-defeated absent and explicitly supports retry',()=>{
  for(const option of fixture.options){
    const behavior=JSON.stringify(option.failureRefusalRetry).toLowerCase();
    assert.match(behavior,/no defeat signal|writes no defeat signal/,option.id);
    assert.match(behavior,/retry|re-enter|available again/,option.id);
  }
});

test('packet does not decide Prince lore/name or Palace 3-vs-6 topology',()=>{
  assert.equal(fixture.locked.princeLoreOrName,null);
  assert.equal(fixture.locked.palaceCareerTopology,null);

  const serialized=JSON.stringify(fixture).toLowerCase();
  assert.equal(serialized.includes('prince name:'),false);
  assert.equal(serialized.includes('three-stage palace'),false);
  assert.equal(serialized.includes('six-stage palace'),false);
});
