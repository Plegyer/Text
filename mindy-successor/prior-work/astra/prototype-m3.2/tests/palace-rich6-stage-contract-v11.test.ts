import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

import {
  eventSchema,
  machineDefinitionSchema,
  ordinaryHardWorkCareers,
  stats
} from '../src/core/schema.ts';

const fixture=JSON.parse(readFileSync('content/palace-rich6-stage-contract-v11.fixture.json','utf8'));
const definitions=JSON.parse(readFileSync('content/definitions.json','utf8'));
const decisions=readFileSync('../../../docs/USER_DECISIONS_LOCKED_v1.md','utf8');

const stageIds=fixture.ids.stages.map((stage:any)=>stage.id);
const thresholds=fixture.transitions.map((transition:any)=>transition.exactDutyMilestone);
const transitionByFrom=new Map(
  fixture.transitions.map((transition:any)=>[transition.from,transition])
);

type ModelState={
  stage:string;
  dutyCount:number;
  progressionComplete:boolean;
  pendingMilestone:string|null;
  careerFacts:string[];
  progressionCompleteWrites:number;
};

function freshModel():ModelState{
  return {
    stage:'entered-service',
    dutyCount:0,
    progressionComplete:false,
    pendingMilestone:null,
    careerFacts:[],
    progressionCompleteWrites:0
  };
}

function completeDuty(input:ModelState):ModelState{
  const state=structuredClone(input);
  if(state.pendingMilestone)throw new Error('milestone barrier pending');
  state.dutyCount+=1;

  const transition=transitionByFrom.get(state.stage);
  if(transition&&state.dutyCount===transition.exactDutyMilestone){
    state.stage=transition.to;
    if(transition.progressionCompleteWriter&&!state.progressionComplete){
      state.progressionComplete=true;
      state.progressionCompleteWrites+=1;
    }
    state.pendingMilestone=transition.milestoneEventId;
  }
  return state;
}

function resolveMilestone(input:ModelState):ModelState{
  const state=structuredClone(input);
  if(!state.pendingMilestone)return state;
  const transition=fixture.transitions.find(
    (item:any)=>item.milestoneEventId===state.pendingMilestone
  );
  assert.ok(transition);
  if(!state.careerFacts.includes(transition.milestoneResolvedFact)){
    state.careerFacts.push(transition.milestoneResolvedFact);
  }
  state.pendingMilestone=null;
  return state;
}

function reload<T>(value:T):T{
  return JSON.parse(JSON.stringify(value));
}

test('D29 authority in locked decisions matches the v11 six-stage contract',()=>{
  assert.match(decisions,/### D29 — Palace uses the rich six-stage progression topology/);
  for(const label of [
    'Entered Service',
    'Working Rhythm',
    'Trusted Service',
    'Palace Network',
    'Crossroads',
    'Outcome Ready'
  ]){
    assert.ok(decisions.includes(label),label);
  }
  assert.match(decisions,/2;\s*\n- 5;\s*\n- 8;\s*\n- 12;\s*\n- 15 completed Palace duties/);
  assert.match(decisions,/palace\.progression-complete/);
});

test('stable stage IDs are exactly six and preserve D29 order',()=>{
  assert.deepEqual(stageIds,[
    'entered-service',
    'working-rhythm',
    'trusted-service',
    'palace-network',
    'crossroads',
    'outcome-ready'
  ]);
  assert.equal(new Set(stageIds).size,6);
});

test('palaceDutyCount has a stable logical name and schema-compatible persisted counter key',()=>{
  const counter=fixture.ids.dutyCount;
  assert.equal(counter.logicalName,'palaceDutyCount');
  assert.equal(counter.serializedCounterKey,'palace-duty-count');
  assert.equal(counter.initialValue,0);
  assert.equal(counter.increment,'exactly +1 per successfully committed Palace duty action');
  assert.equal(counter.decreases,false);
  assert.equal(counter.countsOptionalNight,false);
  assert.equal(counter.countsRelationships,false);
  assert.equal(counter.countsLegacyItemUse,false);

  assert.doesNotThrow(()=>machineDefinitionSchema.parse(fixture.machine));
  const serialized=JSON.stringify(fixture.machine);
  assert.ok(serialized.includes('"counter":"palace-duty-count"'));
  assert.equal(serialized.includes('"counter":"palaceDutyCount"'),false);
});

test('machine contract has exact D29 thresholds 2 / 5 / 8 / 12 / 15',()=>{
  assert.deepEqual(thresholds,[2,5,8,12,15]);
  assert.equal(fixture.machine.transitions.length,5);

  assert.deepEqual(
    fixture.machine.transitions.map((transition:any)=>({
      from:transition.from[0],
      to:transition.to,
      threshold:transition.conditions[0].value
    })),
    [
      {from:'entered-service',to:'working-rhythm',threshold:2},
      {from:'working-rhythm',to:'trusted-service',threshold:5},
      {from:'trusted-service',to:'palace-network',threshold:8},
      {from:'palace-network',to:'crossroads',threshold:12},
      {from:'crossroads',to:'outcome-ready',threshold:15}
    ]
  );
});

test('palace.progression-complete has exactly one contract writer: the final transition',()=>{
  const writers=fixture.machine.transitions.flatMap((transition:any)=>
    transition.effects
      .filter((effect:any)=>effect.kind==='addWorldFact'&&effect.fact==='palace.progression-complete')
      .map(()=>transition.id)
  );
  assert.deepEqual(writers,['duty-15-outcome-ready']);

  assert.equal(
    fixture.transitions.filter((transition:any)=>transition.progressionCompleteWriter).length,
    1
  );
  assert.equal(
    fixture.transitions.find((transition:any)=>transition.progressionCompleteWriter)?.exactDutyMilestone,
    15
  );
});

test('all five milestone event skeletons parse and form critical latched exactly-once barriers',()=>{
  assert.equal(fixture.milestoneEvents.length,5);

  for(const event of fixture.milestoneEvents){
    const parsed=eventSchema.parse(event);
    assert.equal(parsed.priorityClass,'critical_progression',event.id);
    assert.equal(parsed.priority,100,event.id);
    assert.equal(parsed.blocking,true,event.id);
    assert.equal(parsed.delivery.policy,'latched',event.id);
    assert.equal(parsed.maxShows,1,event.id);
    assert.deepEqual(parsed.reactionTriggers,[{kind:'careerTransition',career:'palace'}],event.id);
    assert.equal(parsed.choices.length,1,event.id);
    assert.equal(parsed.choices[0].id,'continue',event.id);
    assert.equal(
      parsed.choices[0].effects.some(
        effect=>effect.kind==='addCareerFact'&&effect.career==='palace'
      ),
      true,
      event.id
    );
  }
});

test('milestone barrier facts are one-to-one with post-entry stages',()=>{
  assert.deepEqual(fixture.reactionOrdering.stageAttachmentBarrierFacts,{
    'working-rhythm':'milestone-02-resolved',
    'trusted-service':'milestone-05-resolved',
    'palace-network':'milestone-08-resolved',
    'crossroads':'milestone-12-resolved',
    'outcome-ready':'milestone-15-resolved'
  });

  assert.deepEqual(
    fixture.transitions.map((transition:any)=>transition.milestoneResolvedFact),
    Object.values(fixture.reactionOrdering.stageAttachmentBarrierFacts)
  );
});

test('pure contract lifecycle reaches each milestone only on its exact duty count and blocks another duty while milestone is pending',()=>{
  let state=freshModel();
  const expected=[
    {threshold:2,stage:'working-rhythm'},
    {threshold:5,stage:'trusted-service'},
    {threshold:8,stage:'palace-network'},
    {threshold:12,stage:'crossroads'},
    {threshold:15,stage:'outcome-ready'}
  ];

  for(const milestone of expected){
    while(state.dutyCount<milestone.threshold){
      state=completeDuty(state);
      if(state.dutyCount<milestone.threshold){
        assert.equal(state.pendingMilestone,null);
      }
    }

    assert.equal(state.stage,milestone.stage);
    assert.ok(state.pendingMilestone);
    assert.throws(()=>completeDuty(state),/milestone barrier pending/);

    const restored=reload(state);
    assert.deepEqual(restored,state);
    state=resolveMilestone(restored);
    assert.equal(state.pendingMilestone,null);
  }

  assert.equal(state.dutyCount,15);
  assert.equal(state.stage,'outcome-ready');
  assert.equal(state.progressionComplete,true);
  assert.equal(state.progressionCompleteWrites,1);

  state=completeDuty(state);
  state=completeDuty(state);
  assert.equal(state.dutyCount,17);
  assert.equal(state.stage,'outcome-ready');
  assert.equal(state.progressionCompleteWrites,1);
});

test('save/reload matrix defines before / during / after state for all five milestones',()=>{
  assert.equal(fixture.saveReloadMatrix.length,15);

  for(const transition of fixture.transitions){
    const rows=fixture.saveReloadMatrix.filter(
      (row:any)=>row.milestone===transition.exactDutyMilestone
    );
    assert.deepEqual(rows.map((row:any)=>row.phase),['before','during','after']);

    const before=rows[0].expected;
    assert.equal(before.stage,transition.from);
    assert.equal(before.palaceDutyCount,transition.exactDutyMilestone-1);
    assert.equal(before.pendingMilestone,null);
    assert.equal(before.milestoneResolvedFact,false);
    assert.equal(before.progressionComplete,false);

    const during=rows[1].expected;
    assert.equal(during.stage,transition.to);
    assert.equal(during.palaceDutyCount,transition.exactDutyMilestone);
    assert.equal(during.pendingMilestone,transition.milestoneEventId);
    assert.equal(during.milestoneResolvedFact,false);
    assert.equal(during.progressionComplete,transition.exactDutyMilestone===15);

    const after=rows[2].expected;
    assert.equal(after.stage,transition.to);
    assert.equal(after.palaceDutyCount,transition.exactDutyMilestone);
    assert.equal(after.pendingMilestone,null);
    assert.equal(after.milestoneResolvedFact,true);
    assert.equal(after.progressionComplete,transition.exactDutyMilestone===15);
  }
});

test('duty taxonomy provides distinct baseline families without optional hidden gates',()=>{
  const families=fixture.dutyTaxonomy.families;
  assert.equal(families.length,6);
  assert.equal(new Set(families.map((family:any)=>family.id)).size,6);
  assert.equal(new Set(families.map((family:any)=>family.presentationIdentity)).size,6);

  for(const family of families){
    assert.deepEqual(family.mandatoryOptionalDependencies,[],family.id);
    assert.ok(family.availableStages.includes(family.firstAvailableStage),family.id);
    assert.match(family.functionalPurpose,/work|duty|review|coordination|service/i,family.id);
  }

  const entered=families.filter((family:any)=>family.firstAvailableStage==='entered-service');
  assert.equal(entered.length>=2,true);

  for(const stage of ['working-rhythm','trusted-service','palace-network','crossroads']){
    assert.equal(
      families.filter((family:any)=>family.firstAvailableStage===stage).length>=1,
      true,
      stage
    );
  }
});

test('all duty families have identical progression weight: one committed duty equals +1 only',()=>{
  assert.equal(
    fixture.dutyTaxonomy.rule,
    'Every baseline duty family increments the same palaceDutyCount by one; families differ by stage availability, presentation/function, and optional variants rather than by progression weight.'
  );
  assert.match(fixture.ids.dutyCount.increment,/exactly \+1/);
  assert.ok(fixture.dutyTaxonomy.antiRepetitionGuarantees.includes(
    'Optional item/relationship capabilities alter variants or efficiency/presentation only; they never change duty-count weight above +1.'
  ));
});

test('all legacy capability attachment IDs actually ship and remain optional',()=>{
  const shipped=new Set(
    (definitions.itemDefinitions??[]).flatMap((item:any)=>item.capabilities??[])
  );
  for(const capability of fixture.optionalAttachments.legacyCapabilities){
    assert.ok(shipped.has(capability),capability);
  }

  assert.match(fixture.optionalAttachments.legacyRule,/optional variants\/choices only/i);
  assert.match(fixture.optionalAttachments.legacyRule,/None grants Palace access/i);
  assert.match(fixture.optionalAttachments.legacyRule,/increments palaceDutyCount without a duty action/i);
});

test('relationship, romance and Palace Night attachments are stage-barrier gated but never progression gates',()=>{
  for(const [id,attachment] of Object.entries(fixture.optionalAttachments.relationships) as any){
    assert.equal(attachment.requiredForProgression,false,id);
    if(id==='palace.optional-romance'){
      assert.equal(attachment.requiredForAnyEnding,false);
      assert.equal(attachment.refusalSafe,true);
    }else{
      assert.equal(attachment.requiredForEnding,false,id);
    }
    assert.ok(Object.values(fixture.reactionOrdering.stageAttachmentBarrierFacts)
      .includes(attachment.requiredBarrierFact),id);
  }

  for(const [id,attachment] of Object.entries(fixture.optionalAttachments.night) as any){
    assert.equal(attachment.countsAsDuty,false,id);
    assert.equal(attachment.requiredForProgression,false,id);
    assert.ok(Object.values(fixture.reactionOrdering.stageAttachmentBarrierFacts)
      .includes(attachment.requiredBarrierFact),id);
  }
});

test('non-True preparation starts at the D29 stages and remains non-exclusive',()=>{
  const routes=fixture.outcomePreparation.routes;
  assert.equal(fixture.outcomePreparation.nonExclusive,true);
  assert.equal(fixture.outcomePreparation.commitLockOnly,true);

  assert.deepEqual(
    routes.map((route:any)=>({
      family:route.family,
      earliestStage:route.earliestStage
    })),
    [
      {family:'service-life',earliestStage:'trusted-service'},
      {family:'court-power',earliestStage:'palace-network'},
      {family:'inner-truth',earliestStage:'crossroads'}
    ]
  );

  assert.equal(new Set(routes.map((route:any)=>route.preparationFact)).size,3);
  assert.equal(new Set(routes.map((route:any)=>route.finalReadyFact)).size,3);
  assert.match(fixture.outcomePreparation.coexistenceRule,/including all three/i);
  assert.match(fixture.outcomePreparation.progressionIndependence,/None .* required/i);
});

test('ending preparation/finalization is separated from explicit ending commit',()=>{
  assert.equal(fixture.endingCommitSeparation.noPrepAutoCommit,true);
  assert.equal(fixture.endingCommitSeparation.noFinalizeAutoCommit,true);
  assert.match(fixture.endingCommitSeparation.commitExclusivity,/only when the player explicitly commits one ending/i);
  assert.match(fixture.endingCommitSeparation.metaRewardTiming,/completeEnding transaction remains the reward boundary/i);

  for(const ending of fixture.endingCommitSeparation.nonTrue){
    assert.equal(ending.commit,'existing ending commit/accept command only');
  }
});

test('Prince prerequisites implement D18/D29 and frozen v9 without hidden Palace support gates',()=>{
  const p=fixture.princeAvailability;
  assert.deepEqual(p.authority,['D18','D29','v9 frozen confrontation contract']);

  const statConditions=p.prerequisites.filter((condition:any)=>condition.kind==='stat');
  assert.equal(statConditions.length,12);
  assert.deepEqual(statConditions.map((condition:any)=>condition.stat),[...stats]);
  assert.equal(statConditions.every((condition:any)=>condition.op==='gte'&&condition.value===91),true);
  assert.equal(statConditions.some((condition:any)=>condition.stat==='lust'),false);

  assert.ok(p.prerequisites.some(
    (condition:any)=>condition.kind==='careerStage'&&condition.career==='palace'&&condition.stage==='outcome-ready'
  ));
  assert.ok(p.prerequisites.some(
    (condition:any)=>condition.kind==='worldFact'&&condition.fact==='palace.progression-complete'&&condition.present===true
  ));
  assert.ok(p.prerequisites.some(
    (condition:any)=>condition.kind==='worldFact'&&condition.fact==='palace.prince-defeated'&&condition.present===false
  ));

  assert.equal(p.lustIncluded,false);
  assert.equal(p.cap200Normalization,false);
  assert.equal(p.preparationFactsRequired,false);
  assert.equal(p.relationshipRequired,false);
  assert.equal(p.romanceRequired,false);
  assert.equal(p.nightRequired,false);
  assert.equal(p.itemRequired,false);
  assert.equal(p.v9ModelSelectionStillDeferred,true);
});

test('Prince defeat and Return Home remain separate lifecycle steps',()=>{
  assert.deepEqual(fixture.princeAvailability.defeatSignal,{
    kind:'worldFact',
    fact:'palace.prince-defeated',
    present:true
  });
  assert.equal(fixture.princeAvailability.returnHomeAutoCommit,false);
  assert.ok(fixture.princeAvailability.returnHomeEligibilityAfterDefeat.includes(
    'palace.prince-defeated present'
  ));
});

test('Palace remains isolated from ordinary Hard Work and D26 pacing',()=>{
  assert.equal((ordinaryHardWorkCareers as readonly string[]).includes('palace'),false);
  assert.equal(fixture.dutyCompletionContract.d26Inherited,false);
  assert.equal(fixture.dutyCompletionContract.exactDailyCadence,null);

  const forbidden=fixture.dutyCompletionContract.forbiddenWrites.join(' | ');
  assert.match(forbidden,/ordinary career unlocks/);
  assert.match(forbidden,/ordinary career Hard Work progress/);
  assert.match(forbidden,/hardWork:palace/);
});

test('Secret Debt forced Night precedence is explicit and Palace progression remains viable without Palace Night',()=>{
  const debt=fixture.secretDebtPrecedence;
  assert.equal(debt.forcedNightWins,true);
  assert.equal(debt.palaceNightOptionalOnly,true);
  assert.match(debt.requiredNightBehavior,/suppresses the voluntary Night menu/i);
  assert.match(debt.requiredNightBehavior,/Palace Night choices are simply unavailable/i);
  assert.match(debt.requiredNightBehavior,/progression remains viable/i);

  const forbidden=debt.palaceDutyForbiddenDebtWrites.join(' | ');
  assert.match(forbidden,/clear debt/);
  assert.match(forbidden,/bound state/);
  assert.match(forbidden,/forced Secret Debt Night/);
  assert.match(forbidden,/next-day Energy penalty/);
  assert.match(debt.ordinaryCareerIsolation,/never unlock ordinary careers/i);
  assert.match(debt.ordinaryCareerIsolation,/never add ordinary Hard Work progress/i);
});

test('the final contract intentionally leaves cadence, balance, production UI/runtime and Prince lore open',()=>{
  assert.equal(fixture.dutyCompletionContract.exactDailyCadence,null);
  assert.ok(fixture.explicitNonGoals.includes('No production engine implementation.'));
  assert.ok(fixture.explicitNonGoals.includes('No production UI implementation.'));
  assert.ok(fixture.explicitNonGoals.includes('No final Palace authored story/lore text.'));
  assert.ok(fixture.explicitNonGoals.includes('No Prince name/lore.'));
  assert.ok(fixture.explicitNonGoals.includes('No choice among frozen v9 confrontation models.'));
  assert.ok(fixture.explicitNonGoals.includes('No Palace daily cadence rule.'));
});
