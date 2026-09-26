import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {
  presentationIdForAction,
  presentationIdForEnding,
  presentationIdForEvent
} from '../src/core/presentation.ts';
import type {Catalog} from '../src/core/schema.ts';

const scenario=JSON.parse(readFileSync('content/lumber-pa-scenario.fixture.json','utf8'));
const definitions=JSON.parse(readFileSync('content/lumber-target-definitions.fixture.json','utf8'));
const productionPack=JSON.parse(readFileSync('content/packs/lumber-target/lumber-production.pack.json','utf8'));
const crossPack=JSON.parse(readFileSync('content/packs/lumber-target/lumber-cross-system.pack.json','utf8'));
const nightPack=JSON.parse(readFileSync('content/packs/lumber-target/lumber-night-acceptance.pack.json','utf8'));
const activation=JSON.parse(readFileSync('content/lumber-production-activation.fixture.json','utf8'));
const itemAdapter=JSON.parse(readFileSync('content/lumber-item-capabilities.fixture.json','utf8'));

const packs=[productionPack,crossPack,nightPack];
const cat={definitions,packs,events:packs.flatMap((p:any)=>p.events),media:packs.flatMap((p:any)=>p.media)} as Catalog;
const byId=new Map(scenario.orderedSteps.map((step:any)=>[step.id,step]));

test('PA scenario is ordered and names the locked Lumber chain without promoting blocked dependencies',()=>{
  assert.deepEqual(
    scenario.orderedSteps.map((step:any)=>step.id),
    [
      'lumber-shift',
      'reactive-milestone',
      'foreman-professional-route',
      'school-boundary',
      'optional-foreman-night',
      'forest-activity-entry',
      'forest-activity-result-continuation',
      'ending-families'
    ]
  );

  const school:any=byId.get('school-boundary');
  assert.equal(school.status,'BLOCKED');
  assert.equal(school.commandApi,null);
  assert.equal(school.contentIds.productionProviderId,null);
  assert.equal(school.contentIds.productionPublicFactId,null);
  assert.equal(school.expectedReactionFact.fact,null);
  assert.equal(school.presentation.semanticId,null);
  assert.equal(school.contentIds.excludedSyntheticActionId,'school.lumber-management');
  assert.ok(scenario.lockedContracts.productionExclusions.includes('school.lumber-management'));
  assert.deepEqual(activation.productionCandidates.actions,['lumber.shift']);
  assert.ok(!activation.productionCandidates.actions.includes('school.lumber-management'));

  const forest:any=byId.get('forest-activity-entry');
  assert.equal(forest.contentIds.productionCapabilitySourceId,null);
  assert.equal(forest.contentIds.requiredCapability,'enter_old_boundary');
  assert.equal(itemAdapter.itemId,'old_boundary_token');
  assert.ok(itemAdapter.capabilities.some((c:any)=>c.id==='enter_old_boundary'));
});

test('shift, milestone and Foreman steps bind exact content IDs, costs, reaction boundaries and slash presentation IDs',()=>{
  const shift:any=byId.get('lumber-shift');
  const action=definitions.actions.find((a:any)=>a.id==='lumber.shift');
  assert.ok(action);
  assert.deepEqual(shift.commandApi.command,{type:'action',id:'lumber.shift'});
  assert.equal(action.cost.energy,1);
  assert.equal(shift.energy.daytime,1);
  assert.deepEqual(action.effects,[
    {kind:'incrementCareerCounter',career:'lumber',counter:'completed_shifts',amount:1}
  ]);
  assert.deepEqual(shift.expectedReactionFact,{
    kind:'careerCounterChanged',
    career:'lumber',
    counter:'completed_shifts'
  });
  for(const scene of action.scenes){
    const season=scene.id.split('.')[0];
    assert.equal(
      presentationIdForAction(cat,'lumber.shift',scene.media),
      shift.presentation.semanticIdsBySeason[season]
    );
  }

  const milestone:any=byId.get('reactive-milestone');
  const milestoneEvent=cat.events.find(e=>e.id==='lumber.career-first-shift');
  assert.ok(milestoneEvent);
  assert.equal(milestone.energy.daytime,0);
  assert.deepEqual(milestoneEvent.reactionTriggers,[
    {kind:'careerCounterChanged',career:'lumber',counter:'completed_shifts'}
  ]);
  assert.equal(
    presentationIdForEvent(cat,'lumber.career-first-shift','default'),
    milestone.presentation.semanticId
  );

  const foreman:any=byId.get('foreman-professional-route');
  const foremanEvent=cat.events.find(e=>e.id==='lumber.foreman-notice');
  assert.ok(foremanEvent);
  assert.equal(foreman.energy.daytime,0);
  assert.equal(foremanEvent.sourceDomain,'lumber.foreman');
  assert.equal(
    presentationIdForEvent(cat,'lumber.foreman-notice','default'),
    foreman.presentation.semanticId
  );
  assert.deepEqual(foreman.contentIds.transitionIds,['notice-work','choose-professional']);
});

test('optional Night and Forest continuation bind existing Lumber reaction events without extra daytime Energy',()=>{
  const night:any=byId.get('optional-foreman-night');
  const nightEvent=cat.events.find(e=>e.id==='lumber-night.foreman-professional');
  assert.ok(nightEvent);
  assert.equal(night.energy.daytime,0);
  assert.deepEqual(nightEvent.reactionTriggers,[
    {kind:'nightChoiceCompleted',choice:'lumber.foreman.night'}
  ]);
  assert.equal(
    presentationIdForEvent(cat,'lumber-night.foreman-professional','default'),
    night.presentation.semanticId
  );

  const entry:any=byId.get('forest-activity-entry');
  const activity=definitions.activities.find((a:any)=>a.id==='lumber.forest');
  assert.ok(activity);
  assert.equal(activity.entryEnergyCost,2);
  assert.equal(entry.energy.daytime,2);
  assert.deepEqual(activity.entryConditions,[
    {kind:'worldFact',fact:'lumber.capability.enter-old-boundary',present:true}
  ]);

  const result:any=byId.get('forest-activity-result-continuation');
  const returnEvent=cat.events.find(e=>e.id==='lumber-cross.activity-forest-return');
  assert.ok(returnEvent);
  assert.equal(result.energy.daytime,0);
  assert.deepEqual(result.expectedReactionFact,{
    kind:'activityResult',
    activity:'lumber.forest',
    outcome:'success',
    result:'lumber.forest.success'
  });
  assert.deepEqual(returnEvent.reactionTriggers,[result.expectedReactionFact]);
  assert.equal(
    presentationIdForEvent(cat,'lumber-cross.activity-forest-return','default'),
    result.presentation.semanticId
  );
});

test('Hard Work remains only completed_shifts >= 50 with exact hardWork:lumber reward',()=>{
  const hardWork=definitions.endings.find((e:any)=>e.id==='ending.lumber.hard-work');
  assert.ok(hardWork);
  assert.deepEqual(hardWork.conditions,[
    {kind:'careerCounter',career:'lumber',counter:'completed_shifts',op:'gte',value:50}
  ]);
  assert.equal(hardWork.conditions.length,1);
  assert.deepEqual(hardWork.metaRewards,[
    {kind:'hardWork',rewardId:'hardWork:lumber',career:'lumber'}
  ]);
  assert.deepEqual(scenario.lockedContracts.hardWork,{
    endingId:'ending.lumber.hard-work',
    conditions:[
      {kind:'careerCounter',career:'lumber',counter:'completed_shifts',op:'gte',value:50}
    ],
    rewardId:'hardWork:lumber',
    noAdditionalPrerequisites:true
  });

  const endings:any=byId.get('ending-families');
  assert.equal(presentationIdForEnding(endings.contentIds.hardWorkEndingId),endings.presentation.hardWork);
  assert.deepEqual(
    endings.contentIds.separateComplexEndingIds.map((id:string)=>presentationIdForEnding(id)),
    endings.presentation.complex
  );
  assert.ok(!hardWork.conditions.some((c:any)=>[
    'careerStage','careerFact','relationshipStage','relationshipFact','worldFact','calendarSeason'
  ].includes(c.kind)));
});

test('every scenario step records command/API, Energy owner, reload checkpoint, reaction boundary and presentation status',()=>{
  for(const step of scenario.orderedSteps){
    assert.ok(step.energy&&typeof step.energy.owner==='string'&&step.energy.owner.length>0,step.id);
    assert.ok(typeof step.saveReloadCheckpoint==='string'&&step.saveReloadCheckpoint.length>0,step.id);
    assert.ok(Object.prototype.hasOwnProperty.call(step,'expectedReactionFact'),step.id);
    assert.ok(step.presentation,step.id);
    if(step.status==='BLOCKED'||step.status==='BLOCKED_AT_PRODUCTION_ENTRY'){
      assert.ok(Array.isArray(step.blockedDependencies)&&step.blockedDependencies.length>0,step.id);
    }else{
      assert.ok(step.commandApi,step.id);
    }
  }
});
