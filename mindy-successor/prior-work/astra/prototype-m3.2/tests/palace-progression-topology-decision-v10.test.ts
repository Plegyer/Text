import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

import {machineDefinitionSchema,ordinaryHardWorkCareers,stats} from '../src/core/schema.ts';

const fixture=JSON.parse(readFileSync('content/palace-progression-topology-decision-v10.fixture.json','utf8'));
const definitions=JSON.parse(readFileSync('content/definitions.json','utf8'));
const schemaSource=readFileSync('src/core/schema.ts','utf8');

const compact=fixture.topologies.find((topology:any)=>topology.id==='COMPACT_3_STAGE');
const rich=fixture.topologies.find((topology:any)=>topology.id==='RICH_6_STAGE');

test('packet contains exactly the two requested Palace topology options',()=>{
  assert.equal(fixture.status,'READY_FOR_LEADER_PRODUCT_DECISION');
  assert.deepEqual(
    fixture.topologies.map((topology:any)=>topology.id),
    ['COMPACT_3_STAGE','RICH_6_STAGE']
  );
  assert.equal(compact.stageCount,3);
  assert.equal(rich.stageCount,6);
  assert.equal(compact.stages.length,3);
  assert.equal(rich.stages.length,6);
});

test('both planning machines parse against the existing machine definition schema',()=>{
  assert.doesNotThrow(()=>machineDefinitionSchema.parse(compact.candidateMachine));
  assert.doesNotThrow(()=>machineDefinitionSchema.parse(rich.candidateMachine));

  assert.equal(compact.candidateMachine.id,'palace');
  assert.equal(rich.candidateMachine.id,'palace');
  assert.equal(compact.candidateMachine.initialStage,'entered-service');
  assert.equal(rich.candidateMachine.initialStage,'entered-service');
});

test('both topologies emit the same Palace progression-complete signal only on outcome-ready transition',()=>{
  for(const topology of [compact,rich]){
    assert.deepEqual(topology.progressionCompleteSignal,{
      kind:'worldFact',
      fact:'palace.progression-complete',
      emittedOn:topology.id==='COMPACT_3_STAGE'
        ?'transition trusted-service -> outcome-ready'
        :'transition crossroads -> outcome-ready'
    });

    const writes=topology.candidateMachine.transitions.flatMap((transition:any)=>transition.effects)
      .filter((effect:any)=>effect.kind==='addWorldFact'&&effect.fact==='palace.progression-complete');
    assert.equal(writes.length,1,topology.id);

    const finalTransition=topology.candidateMachine.transitions.at(-1);
    assert.equal(finalTransition.to,'outcome-ready',topology.id);
    assert.deepEqual(finalTransition.effects,[{
      kind:'addWorldFact',
      fact:'palace.progression-complete'
    }],topology.id);
  }
});

test('True readiness remains fixed all-12 >=91 with Lust excluded',()=>{
  assert.equal(fixture.common.trueReadiness.statThreshold,91);
  assert.deepEqual(fixture.common.trueReadiness.stats,[...stats]);
  assert.equal(fixture.common.trueReadiness.stats.length,12);
  assert.equal(fixture.common.trueReadiness.lustIncluded,false);
  assert.equal(fixture.common.trueReadiness.princeDefeatRequired,true);
  assert.equal(fixture.locked.trueStats,'all 12 progression stats >=91');
  assert.equal(fixture.locked.lustExcluded,true);
});

test('Palace remains outside the ordinary Hard Work roster and no Palace Hard Work reward is proposed',()=>{
  assert.equal((ordinaryHardWorkCareers as readonly string[]).includes('palace'),false);
  assert.equal(fixture.common.hardWorkMetaReward,false);
  assert.equal(fixture.locked.palaceHardWorkMetaEntry,false);

  const serialized=JSON.stringify(fixture).toLowerCase();
  assert.equal(serialized.includes('hardwork:palace'),false);
});

test('both topologies keep general progression independent of romance, relationships, items and voluntary Night',()=>{
  const generalInvariant=fixture.acceptanceMatrix.find((row:any)=>row.id==='V10-A03');
  assert.ok(generalInvariant);
  assert.match(generalInvariant.assertion,/requires no romance, relationship, legacy item or voluntary Night choice/i);

  for(const topology of [compact,rich]){
    assert.equal(topology.surfaceAttachment.relationships['optional-romance'].required,false,topology.id);
    assert.equal(topology.surfaceAttachment.legacyItems.requiredForProgression,false,topology.id);
    assert.equal(topology.surfaceAttachment.legacyItems.requiredForPalaceEntry,false,topology.id);
    assert.equal(topology.surfaceAttachment.night.forcedNightOwnership,false,topology.id);

    const progressionTransitions=topology.candidateMachine.transitions;
    const allConditions=progressionTransitions.flatMap((transition:any)=>transition.conditions);
    assert.equal(allConditions.some((condition:any)=>condition.kind==='relationshipStage'||condition.kind==='relationshipFact'||condition.kind==='relationshipChoice'),false,topology.id);
    assert.equal(allConditions.some((condition:any)=>condition.kind==='itemCapability'||condition.kind==='itemCount'),false,topology.id);
  }
});

test('all optional Palace legacy capabilities referenced by v10 are shipped capability IDs',()=>{
  const shipped=new Set(
    (definitions.itemDefinitions??[]).flatMap((item:any)=>item.capabilities??[])
  );
  for(const capability of fixture.existingSurfaceInventory.optionalLegacyCapabilities){
    assert.ok(shipped.has(capability),capability);
  }
});

test('compact topology maps existing Palace relationship scenes without inventing extra relationship identities',()=>{
  assert.deepEqual(Object.keys(compact.surfaceAttachment.relationships),[
    'official-contact',
    'professional-patron',
    'rival',
    'optional-romance'
  ]);
  assert.equal(compact.surfaceAttachment.relationships['official-contact'].intro,'entered-service');
  assert.equal(compact.surfaceAttachment.relationships['professional-patron'].intro,'trusted-service');
  assert.equal(compact.surfaceAttachment.relationships.rival.intro,'trusted-service');
  assert.equal(compact.surfaceAttachment.relationships['optional-romance'].invitation,'outcome-ready');
});

test('rich topology distributes the same relationship surfaces across intermediate stages',()=>{
  assert.equal(rich.surfaceAttachment.relationships['official-contact'].intro,'working-rhythm');
  assert.equal(rich.surfaceAttachment.relationships['official-contact'].practicalHelp,'trusted-service');
  assert.equal(rich.surfaceAttachment.relationships['professional-patron'].trust,'palace-network');
  assert.equal(rich.surfaceAttachment.relationships.rival.cooperation,'palace-network');
  assert.equal(rich.surfaceAttachment.relationships['optional-romance'].invitation,'crossroads');
  assert.equal(rich.surfaceAttachment.relationships['optional-romance'].required,false);
});

test('both topologies expose exactly the three locked non-True Palace outcome families',()=>{
  const expected=['service-life','court-power','inner-truth'];
  assert.deepEqual(fixture.common.outcomeFamilies,expected);

  for(const topology of [compact,rich]){
    assert.deepEqual(
      topology.nonTrueOutcomeBranchPoints.map((branch:any)=>branch.family),
      expected,
      topology.id
    );
  }
});

test('compact non-True branches are all completion-stage resolutions and do not auto-end the run',()=>{
  for(const branch of compact.nonTrueOutcomeBranchPoints){
    assert.equal(branch.stage,'outcome-ready',branch.family);
    assert.equal(branch.autoEndsRun,false,branch.family);
    assert.match(branch.branchPoint,/completion-only/i,branch.family);
  }
});

test('rich branch preparation is staggered but final resolution stays completion-only',()=>{
  const byFamily=Object.fromEntries(
    rich.nonTrueOutcomeBranchPoints.map((branch:any)=>[branch.family,branch])
  );

  assert.equal(byFamily['service-life'].preparationStage,'trusted-service');
  assert.equal(byFamily['court-power'].preparationStage,'palace-network');
  assert.equal(byFamily['inner-truth'].preparationStage,'crossroads');

  for(const branch of rich.nonTrueOutcomeBranchPoints){
    assert.equal(branch.completionStage,'outcome-ready',branch.family);
    assert.equal(branch.trueRouteStillOpen,true,branch.family);
    assert.match(branch.writes,/only after completion-stage resolution/i,branch.family);
  }
});

test('Prince availability is identical across topology options and remains delegated to v9 mechanics decision',()=>{
  for(const topology of [compact,rich]){
    assert.equal(topology.princeAvailability.earliestStage,'outcome-ready',topology.id);
    assert.deepEqual(topology.princeAvailability.conditions,[
      'palace.access-granted',
      'palace.progression-complete',
      'all 12 progression stats >=91',
      'palace.prince-defeated absent'
    ],topology.id);
    assert.equal(topology.princeAvailability.confrontationModel,'deferred to v9 Leader/Product decision',topology.id);
  }
});

test('planning work targets are comparison-only and keep Palace much shorter than ordinary Hard Work 50',()=>{
  assert.equal(fixture.planningOnlyNumbers.compactTotalWorkCompletions,8);
  assert.equal(fixture.planningOnlyNumbers.richTotalWorkCompletions,15);
  assert.match(fixture.planningOnlyNumbers.note,/not locked production thresholds/i);

  assert.equal(fixture.planningOnlyNumbers.compactTotalWorkCompletions<50,true);
  assert.equal(fixture.planningOnlyNumbers.richTotalWorkCompletions<50,true);
  assert.equal(fixture.common.ordinaryDailyPacingRuleAppliesToPalace,false);
});

test('candidate transition thresholds match the documented compact and rich work expectations',()=>{
  const compactThresholds=compact.candidateMachine.transitions
    .flatMap((transition:any)=>transition.conditions)
    .filter((condition:any)=>condition.kind==='careerCounter'&&condition.counter==='completed_duties')
    .map((condition:any)=>condition.value);
  assert.deepEqual(compactThresholds,[3,8]);

  const richThresholds=rich.candidateMachine.transitions
    .flatMap((transition:any)=>transition.conditions)
    .filter((condition:any)=>condition.kind==='careerCounter'&&condition.counter==='completed_duties')
    .map((condition:any)=>condition.value);
  assert.deepEqual(richThresholds,[2,5,8,12,15]);
});

test('save/reload feasibility is grounded in existing serialized career/event state',()=>{
  assert.match(schemaSource,/const careerState=z\.object\(\{stage:id,shifts:n,counters:z\.record\(z\.string\(\),n\),choices:z\.record\(z\.string\(\),z\.string\(\)\),facts:z\.array\(id\)\}\)\.strict\(\)/);
  assert.match(schemaSource,/careers:z\.record\(z\.string\(\),careerState\)/);
  assert.match(schemaSource,/pendingScene:pendingSceneSchema\.nullable\(\)/);
  assert.match(schemaSource,/queued:z\.array\(queuedEventInstanceSchema\)/);

  for(const topology of [compact,rich]){
    assert.match(topology.saveReload.careerState,/persists/i,topology.id);
    assert.equal(topology.saveReload.noMetaStagePersistence,true,topology.id);
  }
});

test('existing authored scene inventory count is internally consistent for production-cost comparison',()=>{
  const entryCount=fixture.existingSurfaceInventory.entryOrientationScenes.length;
  const relationshipCount=Object.values(fixture.existingSurfaceInventory.relationships)
    .flatMap((scenes:any)=>scenes).length;
  assert.equal(entryCount,5);
  assert.equal(relationshipCount,11);
  assert.equal(entryCount+relationshipCount,16);
  assert.equal(fixture.existingSurfaceInventory.voluntaryNight.length,2);

  assert.equal(compact.authoredProductionCost.existingReusableSceneCount,16);
  assert.equal(rich.authoredProductionCost.existingReusableSceneCount,16);
  assert.equal(compact.authoredProductionCost.existingReusableNightChoiceCount,2);
  assert.equal(rich.authoredProductionCost.existingReusableNightChoiceCount,2);
});

test('risk comparison explicitly captures compact too-short risk and rich grind risk',()=>{
  assert.equal(compact.riskAssessment.grindRisk,'low');
  assert.equal(compact.riskAssessment.tooShortRisk,'medium-high');
  assert.equal(rich.riskAssessment.grindRisk,'medium');
  assert.equal(rich.riskAssessment.tooShortRisk,'low');

  assert.match(compact.riskAssessment.mainFailureMode,/compressed/i);
  assert.match(rich.riskAssessment.mainFailureMode,/grind|identical work/i);
});

test('packet leaves Prince lore, v9 confrontation model and Palace daily cadence undecided',()=>{
  assert.equal(fixture.locked.princeNameOrLore,null);
  assert.equal(fixture.common.princeMechanics,null);
  assert.equal(fixture.common.exactPalaceWorkActionId,null);

  assert.ok(fixture.explicitNonGoals.includes('No choice among v9 confrontation models.'));
  assert.ok(fixture.explicitNonGoals.includes('No Prince name/lore/mechanics.'));
  assert.ok(fixture.explicitNonGoals.includes('No Palace-specific daily pacing rule is invented.'));
});
