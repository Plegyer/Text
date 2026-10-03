import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

import {ordinaryHardWorkCareers,stats} from '../src/core/schema.ts';
import {SCHOOL_COURSE_IDS} from '../src/core/school.ts';

const fixture=JSON.parse(readFileSync('content/palace-authored-content-blueprint-v12.fixture.json','utf8'));
const definitions=JSON.parse(readFileSync('content/definitions.json','utf8'));
const decisions=readFileSync('../../../docs/USER_DECISIONS_LOCKED_v1.md','utf8');
const v5=JSON.parse(readFileSync('content/palace-authored-safe-v5.fixture.json','utf8'));

const duties=fixture.fifteenDutyMap.duties;
const routes=fixture.outcomeRoutes.routes;

test('v12 is an authored-content blueprint only and preserves v11/v9 authority',()=>{
  assert.equal(fixture.status,'READY_FOR_LEADER_ACCEPTANCE');
  assert.equal(fixture.scope.productionRuntime,false);
  assert.equal(fixture.scope.productionUI,false);
  assert.equal(fixture.scope.finalPrinceLore,false);
  assert.equal(fixture.scope.finalMysteryTruth,false);
  assert.equal(fixture.scope.palaceDailyCadence,null);
  assert.match(fixture.authority.richSixContract,/palace-rich6-stage-contract-v11@0d95f1e3/);
  assert.match(fixture.authority.princePacket,/palace-prince-confrontation-decision-v9@4de1a392/);
});

test('locked D29 and D35 source text is present on the branch authority snapshot',()=>{
  assert.match(decisions,/### D29 — Palace uses the rich six-stage progression topology/);
  assert.match(decisions,/### D35 — normal lodging value = explicit private-space capability/);
  assert.match(decisions,/Service Life preparation may begin at Trusted Service/);
  assert.match(decisions,/Court Power preparation may begin at Palace Network/);
  assert.match(decisions,/Inner Truth preparation may begin at Crossroads/);
  assert.match(decisions,/Secret Debt forced Night always overrides voluntary private-space choices/);
});

test('fifteen-duty map is exact, gapless and unique',()=>{
  assert.equal(fixture.fifteenDutyMap.exactDutyCount,15);
  assert.equal(duties.length,15);
  assert.deepEqual(duties.map((duty:any)=>duty.number),Array.from({length:15},(_,index)=>index+1));
  assert.equal(new Set(duties.map((duty:any)=>duty.id)).size,15);
});

test('family distribution covers all six v11 families with the locked authored sequence',()=>{
  assert.deepEqual(fixture.fifteenDutyMap.familyDistribution,{
    'service-rotation':[1,4,8],
    'logistics-support':[2,5,11],
    'records-review':[3,7,12],
    coordination:[6,10,15],
    'formal-interface':[9,14],
    'evidence-review':[13]
  });
  assert.deepEqual(
    Object.values(fixture.fifteenDutyMap.familyDistribution).flat().sort((a:any,b:any)=>a-b),
    Array.from({length:15},(_,index)=>index+1)
  );
});

test('duty-to-stage map preserves D29 milestone ranges',()=>{
  assert.deepEqual(fixture.fifteenDutyMap.stageRanges,{
    'entered-service':[1,2],
    'working-rhythm':[3,4,5],
    'trusted-service':[6,7,8],
    'palace-network':[9,10,11,12],
    crossroads:[13,14,15]
  });
  assert.deepEqual(fixture.fifteenDutyMap.milestoneDuties,[2,5,8,12,15]);

  const expectedStage=new Map<number,string>();
  for(const [stage,numbers] of Object.entries(fixture.fifteenDutyMap.stageRanges) as any){
    for(const number of numbers)expectedStage.set(number,stage);
  }
  for(const duty of duties){
    assert.equal(duty.stage,expectedStage.get(duty.number),duty.id);
  }
});

test('every duty supplies the required authored-map fields and cannot become a hidden gate',()=>{
  for(const duty of duties){
    assert.ok(duty.presentationFunction.length>0,duty.id);
    assert.ok(Array.isArray(duty.emphasis.stats)&&duty.emphasis.stats.length>=2,duty.id);
    assert.ok(Array.isArray(duty.emphasis.capabilities),duty.id);
    assert.ok(duty.optionalVariantHooks,duty.id);
    assert.ok(duty.milestoneRelation.length>0,duty.id);
    assert.ok(duty.repetitionAvoidance.length>0,duty.id);
    assert.deepEqual(duty.mustNotGate,[
      'Palace entry / D23 qualification',
      'more than +1 palaceDutyCount credit',
      'romance or relationship participation',
      'Palace Night participation',
      'legacy item ownership',
      'School attendance',
      'Activity completion',
      'any non-True Palace outcome',
      'Prince confrontation',
      'Return Home'
    ],duty.id);
  }
});

test('all stat emphases refer only to the 12 progression stats',()=>{
  const allowed=new Set(stats);
  for(const duty of duties){
    for(const stat of duty.emphasis.stats)assert.ok(allowed.has(stat),`${duty.id}: ${stat}`);
  }
});

test('all School hooks use the exact shipped School course IDs',()=>{
  const shipped=new Set(SCHOOL_COURSE_IDS as readonly string[]);
  assert.deepEqual(new Set(fixture.crossSystemHooks.school.shippedCourseIds),shipped);

  for(const duty of duties){
    for(const course of duty.optionalVariantHooks.schoolCourses){
      assert.ok(shipped.has(course),`${duty.id}: ${course}`);
    }
  }
  for(const route of routes){
    for(const beat of route.preparationBeats){
      for(const course of beat.optionalInputs.school){
        assert.ok(shipped.has(course),`${route.family}: ${course}`);
      }
    }
  }
});

test('all Activity hooks use shipped Activity IDs and remain optional-only',()=>{
  const shippedActivities=new Set((definitions.activities??[]).map((activity:any)=>activity.id));
  assert.deepEqual(
    new Set(fixture.crossSystemHooks.activities.shippedActivityIds),
    new Set(['lumber.forest','hunter.expedition','assassin.infiltration'])
  );
  for(const activity of fixture.crossSystemHooks.activities.shippedActivityIds){
    assert.ok(shippedActivities.has(activity),activity);
  }
  assert.match(fixture.crossSystemHooks.activities.rule,/optional contextual response/i);
  assert.match(fixture.crossSystemHooks.activities.rule,/no Activity is required/i);
  assert.match(fixture.crossSystemHooks.activities.rule,/no Activity result increments palaceDutyCount/i);
});

test('all item/capability hooks are the ten shipped v5 Palace legacy capabilities',()=>{
  const shipped=new Set((definitions.itemDefinitions??[]).flatMap((item:any)=>item.capabilities??[]));
  const expected=v5.legacyItemReactions.map((reaction:any)=>reaction.capability);
  assert.deepEqual(fixture.crossSystemHooks.items.shippedPalaceCapabilityIds,expected);
  assert.equal(expected.length,10);
  assert.equal(new Set(expected).size,10);
  for(const capability of expected)assert.ok(shipped.has(capability),capability);
  assert.match(fixture.crossSystemHooks.items.rule,/variants\/choices only/i);
});

test('ordinary-career knowledge has exactly one authored topic per ordinary career without inventing machine IDs',()=>{
  const topics=fixture.crossSystemHooks.ordinaryCareerLegacyKnowledge.topics;
  assert.deepEqual(
    topics.map((topic:any)=>topic.career),
    [...ordinaryHardWorkCareers]
  );
  assert.equal(topics.length,10);
  assert.match(
    fixture.crossSystemHooks.ordinaryCareerLegacyKnowledge.bindingStatus,
    /exact pure-knowledge unlock IDs are not authored here/i
  );
});

test('three non-True routes begin at the exact D29 preparation stages',()=>{
  assert.deepEqual(
    routes.map((route:any)=>({family:route.family,stage:route.earliestStage})),
    [
      {family:'service-life',stage:'trusted-service'},
      {family:'court-power',stage:'palace-network'},
      {family:'inner-truth',stage:'crossroads'}
    ]
  );
});

test('each non-True route has exactly two prep beats, one minimal prep fact and one Outcome Ready finalize fact',()=>{
  for(const route of routes){
    assert.equal(route.preparationBeats.length,2,route.family);
    assert.equal(route.minimumFacts.length,1,route.family);
    assert.equal(route.minimumFacts[0],route.preparationFact,route.family);
    assert.equal(route.preparationBeats.filter((beat:any)=>beat.writesPreparationFact).length,1,route.family);
    assert.equal(route.preparationBeats.at(-1).writesPreparationFact,true,route.family);
    assert.ok(route.finalize.requires.includes('stage outcome-ready'),route.family);
    assert.ok(route.finalize.requires.includes('palace.progression-complete'),route.family);
    assert.equal(route.finalize.autoCommit,false,route.family);
    assert.equal(route.commitBoundary.explicitPlayerCommitRequired,true,route.family);
    assert.equal(route.rewardStatus,'OPEN',route.family);
  }
});

test('no non-True route can require romance, Palace Night, items, School, Activity or a specific relationship',()=>{
  const forbidden=['romance','Palace Night','legacy item','School','Activity','specific relationship'];
  for(const route of routes){
    assert.deepEqual(route.forbiddenRequirements,forbidden,route.family);
  }
  assert.deepEqual(fixture.outcomeRoutes.noHiddenRequirements,forbidden);
  assert.equal(fixture.outcomeRoutes.nonExclusiveBeforeCommit,true);
  assert.match(fixture.outcomeRoutes.coexistence,/All three preparation facts and all three ready facts may coexist/i);
});

test('route commit boundaries are separate from preparation/finalization and rewards remain open',()=>{
  for(const route of routes){
    assert.match(route.commitBoundary.endingIdCandidate,/^ending\.palace\./);
    assert.match(route.commitBoundary.committedSceneId,/^palace\.ending\..+\.committed$/);
    assert.equal(route.finalize.autoCommit,false);
    assert.equal(route.rewardStatus,'OPEN');
  }
});

test('v5 optional relationship scene inventory is preserved and remains non-gating',()=>{
  const relationships=fixture.optionalAttachments.relationships;
  assert.equal(relationships.length,4);
  assert.equal(relationships.reduce((sum:number,item:any)=>sum+item.authoredScenes.length,0),11);
  for(const relationship of relationships)assert.equal(relationship.gate,false,relationship.id);

  const romance=relationships.find((item:any)=>item.id==='palace.optional-romance');
  assert.ok(romance);
  assert.match(romance.use,/refusal-safe/i);
  assert.match(romance.use,/irrelevant to all Palace progression\/outcome gates/i);
});

test('optional Palace Night remains non-duty content',()=>{
  assert.deepEqual(
    fixture.optionalAttachments.night.map((night:any)=>night.id),
    ['palace.night.work-review','palace.night.social-conversation']
  );
  for(const night of fixture.optionalAttachments.night){
    assert.equal(night.gate,false,night.id);
    assert.equal(night.countsAsDuty,false,night.id);
    assert.equal(night.privateSpaceRequired,false,night.id);
  }
});

test('D35 private-space branch is narrow, normal-only, refusal-safe and Secret-Debt subordinate',()=>{
  const branch=fixture.optionalAttachments.d35PrivateSpaceBranch;
  assert.equal(branch.housingRequirement,'normal lodging only');
  assert.match(branch.cheapOrStreetBehavior,/unavailable/i);
  assert.match(branch.cheapOrStreetBehavior,/progression\/outcomes remain otherwise unchanged/i);
  assert.match(branch.secretDebtBehavior,/Forced Secret Debt Night suppresses/i);
  assert.equal(branch.requiredForProgression,false);
  assert.equal(branch.requiredForAnyEnding,false);
  assert.equal(branch.requiredForRomanceContinuation,false);
  assert.equal(branch.countsAsDuty,false);
});

test('True Ending handoff preserves Outcome Ready + progression complete + all 12 >=91 + Prince defeat + explicit Return Home commit',()=>{
  const handoff=fixture.trueEndingHandoff;
  assert.equal(handoff.requiredStage,'outcome-ready');
  assert.equal(handoff.progressionCompleteFact,'palace.progression-complete');
  assert.equal(handoff.statThreshold,91);
  assert.deepEqual(handoff.progressionStats,[...stats]);
  assert.equal(handoff.lustIncluded,false);
  assert.equal(handoff.princeDefeatRequired,true);
  assert.equal(handoff.princeDefeatedFact,'palace.prince-defeated');
  assert.match(handoff.confrontationModel,/FROZEN v9 authority/);
  assert.equal(handoff.explicitReturnHomeCommit,true);
  assert.equal(handoff.automaticCommitOnPrinceDefeat,false);
});

test('cap-200 handoff is post-completion Specialist-only and never multiplies current values',()=>{
  const cap=fixture.trueEndingHandoff.cap200Reward;
  assert.match(cap.timing,/only after Return Home completion/i);
  assert.equal(cap.classification,'Specialist under D27/D28');
  assert.equal(cap.capacityCost,1);
  assert.equal(cap.multipliesCurrentValues,false);
  assert.equal(cap.lustAffected,false);
  assert.match(cap.effect,/maximum of each of the 12 progression stats becomes 200 instead of 100/i);
});

test('required core scene budget is exactly 37 and reconciles to inventory',()=>{
  const budget=fixture.contentBudget.requiredCoreBreakdown;
  assert.deepEqual(budget,{
    entryAndOrientation:5,
    dutyPresentations:15,
    structuralMilestones:5,
    nonTruePreparationBeats:6,
    nonTrueFinalizeScenes:3,
    nonTruePostCommitResolutionScenes:3
  });
  assert.equal(Object.values(budget).reduce((sum:number,value:any)=>sum+value,0),37);
  assert.equal(fixture.contentBudget.requiredCoreSceneCount,37);

  const inventory=fixture.sceneInventory;
  const count=
    inventory.entryAndOrientation.length+
    inventory.duties.length+
    inventory.milestones.length+
    inventory.routePreparation.length+
    inventory.routeFinalize.length+
    inventory.routeCommittedResolution.length;
  assert.equal(count,37);
});

test('optional authored-unit budget is exact: 23 reusable v5 + 22 new slots = 45',()=>{
  const budget=fixture.contentBudget.optionalAuthoredUnitBudget;
  assert.equal(budget.total,45);
  assert.equal(budget.reusableFromV5,23);
  assert.equal(budget.newVariantSlots,22);
  assert.equal(Object.values(budget.breakdown).reduce((sum:number,value:any)=>sum+value,0),45);
  assert.equal(
    budget.breakdown.v5RelationshipScenes+
    budget.breakdown.v5PalaceNightScenes+
    budget.breakdown.v5LegacyCapabilityReactionVariants,
    23
  );
  assert.equal(
    budget.breakdown.schoolCourseVariantSlots+
    budget.breakdown.activityVariantSlots+
    budget.breakdown.ordinaryCareerKnowledgeVariantSlots+
    budget.breakdown.d35PrivateSpaceRomanceScene,
    22
  );
});

test('required RU/EN localization budget reconciles to 150 fields per language / 300 bilingual',()=>{
  const loc=fixture.contentBudget.localizationSurface.requiredPerLanguage;
  assert.equal(loc.sceneTitles,37);
  assert.equal(loc.sceneBodies,37);
  assert.equal(loc.choiceLabels,32);
  assert.equal(loc.choiceResults,32);
  assert.equal(loc.dutyFamilyActionLabels,6);
  assert.equal(loc.dutyFamilyActionDescriptions,6);
  assert.equal(
    loc.sceneTitles+loc.sceneBodies+loc.choiceLabels+loc.choiceResults+
    loc.dutyFamilyActionLabels+loc.dutyFamilyActionDescriptions,
    150
  );
  assert.equal(loc.total,150);
  assert.equal(fixture.contentBudget.localizationSurface.requiredBilingualTotal,300);
});

test('optional RU/EN localization budget reconciles to 113 per language / 226 bilingual',()=>{
  const loc=fixture.contentBudget.localizationSurface.optionalPerLanguage;
  assert.equal(Object.entries(loc)
    .filter(([key])=>key!=='total')
    .reduce((sum:number,[,value]:any)=>sum+value,0),113);
  assert.equal(loc.total,113);
  assert.equal(fixture.contentBudget.localizationSurface.optionalBilingualBudget,226);
});

test('seven media slot classes cover generic Palace staging plus D35 private-space reuse',()=>{
  const media=fixture.contentBudget.mediaSlotClasses;
  assert.equal(media.length,7);
  assert.equal(new Set(media.map((slot:any)=>slot.id)).size,7);
  assert.equal(media.every((slot:any)=>slot.genericReuse===true),true);
  const privateSlot=media.find((slot:any)=>slot.id==='lodging.private.normal');
  assert.ok(privateSlot);
  assert.equal(privateSlot.palaceSpecificArtRequired,false);
  assert.match(fixture.contentBudget.genericStagingReuse,/All required Palace core scenes can ship with generic Palace/i);
});

test('blueprint does not introduce a daily cadence, final mystery truth, Prince lore, or confrontation choice',()=>{
  assert.equal(fixture.scope.palaceDailyCadence,null);
  assert.equal(fixture.scope.finalPrinceLore,false);
  assert.equal(fixture.scope.finalMysteryTruth,false);
  assert.ok(fixture.explicitNonGoals.includes('No Palace daily cadence.'));
  assert.ok(fixture.explicitNonGoals.includes('No final Prince name/lore.'));
  assert.ok(fixture.explicitNonGoals.includes('No confrontation model selection beyond frozen v9 authority.'));
  assert.ok(fixture.explicitNonGoals.includes('No final mystery truth.'));
});
