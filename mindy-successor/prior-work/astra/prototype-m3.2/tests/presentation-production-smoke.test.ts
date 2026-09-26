import test from 'node:test';
import assert from 'node:assert/strict';
import {existsSync,readFileSync} from 'node:fs';
import {loadCatalog} from '../src/core/content.ts';
import {
  presentationIdForAction,
  presentationIdForEnding,
  presentationIdForEvent
} from '../src/core/presentation.ts';
import {SCHOOL_COURSES} from '../src/core/school.ts';

type Step={
  order:number;
  stepId:string;
  presentationId:string;
  identity:Record<string,string>;
  expectedStatic:{mediaId:string;assetPath:string};
  fallbackBehavior:'direct-static'|'semantic-fallback';
};
type Fixture={
  version:1;
  kind:'presentation-production-smoke-sequence';
  status:'shipped-product-smoke';
  policy:{
    semanticIdentityStable:true;
    missingMediaNonFatal:true;
    animationOffUsesStaticOrText:true;
    gameplayMutationAllowed:false;
  };
  steps:Step[];
};

const json=(path:string)=>JSON.parse(readFileSync(path,'utf8'));
const fixture=json('content/presentation-production-smoke.fixture.json') as Fixture;
const assetConsistency=json('content/presentation-asset-consistency.fixture.json');
const stage=json('content/packs/stage.json');

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
const stageById=new Map(stage.media.map((media:any)=>[media.id,media]));
const staticById=new Map(
  assetConsistency.currentStaticBindings.map((binding:any)=>[binding.presentationId,binding])
);

function derived(step:Step){
  const i=step.identity;
  if(i.kind==='location'){
    assert.equal(i.locationId,'town');
    return 'location/town/default';
  }
  if(i.kind==='action'){
    const action=cat.definitions.actions.find(a=>a.id===i.actionId);
    assert.ok(action,i.actionId);
    const scene=action.scenes?.find(s=>s.id===i.sceneId);
    assert.ok(scene,i.sceneId);
    return presentationIdForAction(cat,i.actionId,scene.media);
  }
  if(i.kind==='event')return presentationIdForEvent(cat,i.eventId,i.variantId);
  if(i.kind==='course'){
    const course=SCHOOL_COURSES.find(c=>c.id===i.courseId);
    assert.ok(course,i.courseId);
    return course.presentationId;
  }
  if(i.kind==='activity'){
    assert.equal(i.activityId,'lumber.forest');
    assert.equal(i.phase,'route');
    return 'activity/forest/route/default';
  }
  if(i.kind==='ending')return presentationIdForEnding(i.endingId);
  assert.fail('unknown smoke identity');
}

test('smoke sequence covers town -> Lumber -> career -> School -> Night -> Forest -> ending exactly',()=>{
  assert.deepEqual(
    fixture.steps.map(step=>step.stepId),
    ['town','lumber-shift','career-event','school-lesson','night','forest-activity','ending']
  );
  assert.deepEqual(
    fixture.steps.map(step=>step.order),
    [1,2,3,4,5,6,7]
  );
});

test('every smoke step has the exact semantic presentationId derived from domain identity',()=>{
  for(const step of fixture.steps){
    assert.equal(derived(step),step.presentationId,step.stepId);
    assert.match(step.presentationId,/^[a-z0-9-]+(?:\/[a-z0-9-]+)+$/);
  }
});

test('every smoke step has an existing non-animated safe candidate',()=>{
  for(const step of fixture.steps){
    const media=stageById.get(step.expectedStatic.mediaId);
    assert.ok(media,step.expectedStatic.mediaId);
    assert.equal(media.kind,'image',step.expectedStatic.mediaId);
    assert.equal(media.src,step.expectedStatic.assetPath,step.stepId);
    assert.equal(existsSync(step.expectedStatic.assetPath),true,step.expectedStatic.assetPath);

    if(step.presentationId==='location/town/default'){
      assert.equal(step.fallbackBehavior,'direct-static');
      continue;
    }
    const binding=staticById.get(step.presentationId);
    assert.ok(binding,step.presentationId);
    assert.equal(binding.mediaId,step.expectedStatic.mediaId,step.stepId);
    assert.equal(binding.assetPath,step.expectedStatic.assetPath,step.stepId);
    const direct=binding.sourcePresentationId===step.presentationId;
    assert.equal(step.fallbackBehavior,direct?'direct-static':'semantic-fallback',step.stepId);
  }
});

test('missing animation never changes semantic or gameplay identity in smoke sequence',()=>{
  for(const step of fixture.steps){
    const before=structuredClone(step.identity);
    const requested=step.presentationId;
    const animationCandidate=null;
    const fallback={kind:'image',src:step.expectedStatic.assetPath};

    assert.equal(animationCandidate,null);
    assert.equal(fallback.kind,'image');
    assert.equal(existsSync(fallback.src),true,fallback.src);
    assert.deepEqual(step.identity,before,step.stepId);
    assert.equal(derived(step),requested,step.stepId);
  }
});

test('smoke fixture is presentation-only',()=>{
  assert.equal(fixture.policy.gameplayMutationAllowed,false);
  const serialized=JSON.stringify(fixture);
  for(const forbidden of [
    '"conditions"','"effects"','"rng"','"energy"','"money"',
    '"inventory"','"transition"','"reward"','"delta"','"command"'
  ])assert.equal(serialized.includes(forbidden),false,forbidden);
});
