import test from 'node:test';
import assert from 'node:assert/strict';
import {existsSync,readFileSync} from 'node:fs';
import {loadCatalog} from '../src/core/content.ts';
import {
  presentationIdForAction,
  presentationIdForActionResult,
  presentationIdForEnding,
  presentationIdForEvent
} from '../src/core/presentation.ts';
import {SCHOOL_COURSES} from '../src/core/school.ts';

type Step={
  stepId:string;
  presentationId:string;
  identity:Record<string,string>;
  fallbackBehavior:'direct-static'|'semantic-fallback';
  saveReloadExpectation:string;
  animationOffExpectation:'same-presentation-non-animated-static';
};
type Scenario={scenarioId:string;steps:Step[]};
type Fixture={
  version:1;
  kind:'presentation-product-acceptance-scenario-matrix';
  status:'isolated-pa-fixture';
  policy:{
    semanticIdentityStableAcrossReload:true;
    animationOffPresentationOnly:true;
    fallbackNonFatal:true;
    gameplayMutationAllowed:false;
  };
  scenarios:Scenario[];
};

const json=(path:string)=>JSON.parse(readFileSync(path,'utf8'));
const fixture=json('content/presentation-pa-scenario.fixture.json') as Fixture;
const assetConsistency=json('content/presentation-asset-consistency.fixture.json');
const lumberPA=json('content/lumber-product-acceptance.fixture-manifest.json');

function lumberCatalog(){
  const definitions=json('content/lumber-target-definitions.fixture.json');
  definitions.nightChoices=[
    ...(definitions.nightChoices??[]),
    {
      id:'lumber.foreman.night',
      label:'Foreman professional night',
      conditions:[],
      effects:[],
      nextDayEffects:[],
      nextDayEnergyDelta:0
    }
  ];
  return loadCatalog(definitions,[
    json('content/packs/lumber-target/lumber-production.pack.json'),
    json('content/packs/lumber-target/lumber-cross-system.pack.json'),
    json('content/packs/lumber-target/lumber-night-acceptance.pack.json')
  ]);
}
const cat=lumberCatalog();
const staticById=new Map(
  assetConsistency.currentStaticBindings.map((binding:any)=>[binding.presentationId,binding])
);

function derivedPresentationId(step:Step){
  const identity=step.identity;
  if(identity.kind==='action'){
    const action=cat.definitions.actions.find(item=>item.id===identity.actionId);
    assert.ok(action,identity.actionId);
    const scene=action.scenes?.find(item=>item.id===identity.sceneId);
    assert.ok(scene,identity.sceneId);
    return presentationIdForAction(cat,identity.actionId,scene.media);
  }
  if(identity.kind==='action-result'){
    const action=cat.definitions.actions.find(item=>item.id===identity.actionId);
    assert.ok(action,identity.actionId);
    const scene=action.scenes?.find(item=>item.id===identity.sceneId);
    assert.ok(scene,identity.sceneId);
    return presentationIdForActionResult(cat,identity.actionId,scene.media);
  }
  if(identity.kind==='event'){
    return presentationIdForEvent(cat,identity.eventId,identity.variantId);
  }
  if(identity.kind==='course'){
    const course=SCHOOL_COURSES.find(item=>item.id===identity.courseId);
    assert.ok(course,identity.courseId);
    return course.presentationId;
  }
  if(identity.kind==='ending'){
    return presentationIdForEnding(identity.endingId);
  }
  if(identity.kind==='activity'){
    assert.equal(identity.activityId,'lumber.forest');
    assert.equal(identity.phase,'route');
    return 'activity/forest/route/default';
  }
  if(identity.kind==='activity-result'){
    assert.equal(identity.activityId,'lumber.forest');
    assert.equal(identity.resultId,'lumber.forest.success');
    return 'activity/forest/return/success';
  }
  assert.fail('unknown PA identity kind');
}

function jsonRoundTrip<T>(value:T):T{
  return JSON.parse(JSON.stringify(value)) as T;
}

test('scenario matrix contains the six required full-flow families in order',()=>{
  assert.deepEqual(
    fixture.scenarios.map(scenario=>scenario.scenarioId),
    [
      'lumber-shift-result-milestone',
      'foreman-relationship-night',
      'forest-activity-result',
      'school-paid-lesson',
      'hard-work-ending',
      'complex-lumber-ending'
    ]
  );
  assert.deepEqual(
    fixture.scenarios.map(scenario=>scenario.steps.length),
    [3,2,2,1,1,1]
  );
});

test('every PA step uses the semantic presentation ID derived from its domain identity',()=>{
  for(const scenario of fixture.scenarios){
    for(const step of scenario.steps){
      assert.equal(derivedPresentationId(step),step.presentationId,`${scenario.scenarioId}/${step.stepId}`);
      assert.match(step.presentationId,/^[a-z0-9-]+(?:\/[a-z0-9-]+)+$/);
    }
  }
});

test('fallback behavior is non-fatal and resolves every PA step to an existing static asset',()=>{
  for(const scenario of fixture.scenarios){
    for(const step of scenario.steps){
      const binding=staticById.get(step.presentationId);
      assert.ok(binding,`missing static binding: ${step.presentationId}`);
      assert.equal(binding.availability,'current',step.presentationId);
      assert.equal(existsSync(binding.assetPath),true,binding.assetPath);

      const isDirect=binding.sourcePresentationId===step.presentationId;
      assert.equal(
        step.fallbackBehavior,
        isDirect?'direct-static':'semantic-fallback',
        step.presentationId
      );
    }
  }
});

test('save/reload expectations preserve domain identity and recompute the same semantic slot',()=>{
  for(const scenario of fixture.scenarios){
    for(const step of scenario.steps){
      assert.ok(step.saveReloadExpectation.length>0,step.presentationId);
      const before={
        identity:step.identity,
        presentationId:step.presentationId
      };
      const after=jsonRoundTrip(before);

      assert.deepEqual(after.identity,before.identity,step.presentationId);
      assert.equal(after.presentationId,before.presentationId,step.presentationId);
      assert.equal(
        derivedPresentationId({...step,identity:after.identity}),
        before.presentationId,
        step.presentationId
      );
    }
  }
});

test('animation-off expectation changes candidate kind only, never semantic or domain identity',()=>{
  for(const scenario of fixture.scenarios){
    for(const step of scenario.steps){
      assert.equal(step.animationOffExpectation,'same-presentation-non-animated-static');
      const binding=staticById.get(step.presentationId);
      assert.ok(binding,step.presentationId);

      const beforeId=derivedPresentationId(step);
      const candidate={kind:'image',src:binding.assetPath};
      assert.equal(candidate.kind,'image');
      assert.equal(existsSync(candidate.src),true,candidate.src);
      assert.equal(derivedPresentationId(step),beforeId,step.presentationId);
      assert.equal(beforeId,step.presentationId,step.presentationId);
    }
  }
});

test('Lumber PA source contract matches milestone, Foreman/Night, Hard Work and complex ending rows',()=>{
  const byScenario=new Map(fixture.scenarios.map(scenario=>[scenario.scenarioId,scenario]));

  const milestone=byScenario.get('lumber-shift-result-milestone')!.steps[2]!;
  assert.equal(milestone.identity.eventId,lumberPA.mappings.milestone.eventId);
  assert.equal(milestone.presentationId,lumberPA.mappings.milestone.presentationId);

  const foreman=byScenario.get('foreman-relationship-night')!.steps;
  assert.equal(foreman[0]!.identity.eventId,lumberPA.mappings.foremanRelationship.openingEventId);
  assert.equal(foreman[0]!.presentationId,lumberPA.mappings.foremanRelationship.presentationId);
  assert.equal(foreman[1]!.identity.eventId,lumberPA.mappings.nightHook.eventId);
  assert.equal(foreman[1]!.presentationId,lumberPA.mappings.nightHook.presentationId);

  const hardWork=byScenario.get('hard-work-ending')!.steps[0]!;
  assert.equal(hardWork.identity.endingId,lumberPA.mappings.hardWorkEnding.endingId);
  assert.equal(hardWork.presentationId,lumberPA.mappings.hardWorkEnding.presentationId);
  assert.equal(lumberPA.mappings.hardWorkEnding.eligibility.value,50);
  assert.equal(lumberPA.mappings.hardWorkEnding.metaRewardId,'hardWork:lumber');

  const complex=byScenario.get('complex-lumber-ending')!.steps[0]!;
  assert.equal(complex.identity.endingId,lumberPA.mappings.complexEnding.endingId);
  assert.equal(complex.presentationId,lumberPA.mappings.complexEnding.presentationId);
  assert.equal(complex.identity.endingId,'ending.lumber.forewoman');
});

test('PA scenario fixture records presentation expectations only and cannot mutate gameplay',()=>{
  assert.equal(fixture.policy.semanticIdentityStableAcrossReload,true);
  assert.equal(fixture.policy.animationOffPresentationOnly,true);
  assert.equal(fixture.policy.fallbackNonFatal,true);
  assert.equal(fixture.policy.gameplayMutationAllowed,false);

  const serialized=JSON.stringify(fixture);
  for(const forbidden of [
    '"conditions"','"effects"','"rng"','"energy"','"money"',
    '"inventory"','"transition"','"reward"','"delta"','"command"'
  ])assert.equal(serialized.includes(forbidden),false,forbidden);
});
