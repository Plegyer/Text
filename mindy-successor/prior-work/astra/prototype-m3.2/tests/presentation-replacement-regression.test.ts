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

type Identity=
  |{kind:'action';actionId:string;sceneId:string}
  |{kind:'event';eventId:string;variantId:string}
  |{kind:'activity';activityId:string;resultId:string}
  |{kind:'course';courseId:string}
  |{kind:'ending';endingId:string};

type RegressionCase={
  caseId:string;
  identity:Identity;
  presentationId:string;
  replacementGif:string;
  staticFallback:{mediaId:string;assetPath:string};
};

type Matrix={
  version:1;
  kind:'presentation-drop-in-replacement-regression-matrix';
  status:'isolated-regression-fixture';
  policy:{
    semanticIdentityStable:true;
    animationsOffMediaOnly:true;
    gameplayMutationAllowed:false;
    missingGifFallsBackNonFatally:true;
  };
  cases:RegressionCase[];
};

const json=(path:string)=>JSON.parse(readFileSync(path,'utf8'));
const matrix=json('content/presentation-replacement-regression.fixture.json') as Matrix;

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

function semanticIdFromIdentity(identity:Identity){
  if(identity.kind==='action'){
    const action=cat.definitions.actions.find(item=>item.id===identity.actionId);
    assert.ok(action,identity.actionId);
    const scene=action.scenes?.find(item=>item.id===identity.sceneId);
    assert.ok(scene,identity.sceneId);
    return presentationIdForAction(cat,identity.actionId,scene.media);
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
    assert.equal(identity.resultId,'lumber.forest.success');
    return 'activity/forest/return/success';
  }
  assert.fail('unsupported identity');
}

function reloadIdentity(identity:Identity):Identity{
  return JSON.parse(JSON.stringify(identity)) as Identity;
}

function candidates(
  row:RegressionCase,
  options:{animationsEnabled:boolean;gifAvailable:boolean}
){
  const result:{kind:'gif'|'image';src:string}[]=[];
  if(options.animationsEnabled&&options.gifAvailable){
    result.push({kind:'gif',src:row.replacementGif});
  }
  result.push({kind:'image',src:row.staticFallback.assetPath});
  return result;
}

function gameplaySnapshot(){
  return {
    actions:cat.definitions.actions.map(action=>({
      id:action.id,
      scenes:(action.scenes??[]).map(scene=>({
        id:scene.id,
        media:[...scene.media]
      }))
    })),
    events:cat.events.map(event=>({
      id:event.id,
      variants:event.variants.map(variant=>({
        id:variant.id,
        media:[...variant.media]
      })),
      choices:event.choices.map(choice=>({
        id:choice.id,
        effects:structuredClone(choice.effects)
      }))
    })),
    endings:cat.definitions.endings.map(ending=>({
      id:ending.id,
      conditions:structuredClone(ending.conditions),
      metaRewards:structuredClone(ending.metaRewards)
    })),
    courses:SCHOOL_COURSES.map(course=>({
      id:course.id,
      trackId:course.trackId,
      tuition:course.tuition,
      energyCost:course.energyCost,
      statEffects:structuredClone(course.statEffects)
    }))
  };
}

test('regression matrix covers every required representative replacement family',()=>{
  assert.equal(matrix.cases.length,8);
  assert.deepEqual(
    new Set(matrix.cases.map(row=>row.caseId)),
    new Set([
      'lumber-shift-spring',
      'lumber-milestone',
      'foreman-relationship',
      'foreman-night',
      'forest-activity-return',
      'school-arcana',
      'school-physical-training',
      'hard-work-ending'
    ])
  );

  assert.equal(matrix.cases.filter(row=>row.identity.kind==='course').length,2);
  assert.ok(matrix.cases.some(row=>row.identity.kind==='activity'));
  assert.ok(matrix.cases.some(row=>row.identity.kind==='ending'));
});

test('semantic presentationId is identical before and after drop-in replacement',()=>{
  for(const row of matrix.cases){
    const before=semanticIdFromIdentity(row.identity);
    assert.equal(before,row.presentationId,row.caseId);

    const changedReplacement={
      ...row,
      replacementGif:row.replacementGif.replace('.gif','-v2.gif')
    };
    const after=semanticIdFromIdentity(changedReplacement.identity);

    assert.equal(after,before,row.caseId);
    assert.equal(after,row.presentationId,row.caseId);
  }
});

test('missing replacement GIF always leaves a valid shipped static fallback',()=>{
  for(const row of matrix.cases){
    assert.match(row.staticFallback.assetPath,/^assets\//,row.caseId);
    assert.equal(existsSync(row.staticFallback.assetPath),true,row.caseId);

    const selected=candidates(row,{
      animationsEnabled:true,
      gifAvailable:false
    });
    assert.ok(selected.length>0,row.caseId);
    assert.equal(selected[0]?.kind,'image',row.caseId);
    assert.equal(selected[0]?.src,row.staticFallback.assetPath,row.caseId);
  }
});

test('animations-off selects only non-animated media and changes no identity',()=>{
  for(const row of matrix.cases){
    const before=semanticIdFromIdentity(row.identity);
    const animated=candidates(row,{
      animationsEnabled:true,
      gifAvailable:true
    });
    const disabled=candidates(row,{
      animationsEnabled:false,
      gifAvailable:true
    });

    assert.equal(animated[0]?.kind,'gif',row.caseId);
    assert.ok(disabled.length>0,row.caseId);
    assert.equal(disabled.some(candidate=>candidate.kind==='gif'),false,row.caseId);
    assert.equal(disabled[0]?.kind,'image',row.caseId);
    assert.equal(semanticIdFromIdentity(row.identity),before,row.caseId);
  }
});

test('save/reload identity remains event, course, activity, action, or ending driven',()=>{
  for(const row of matrix.cases){
    const persisted={
      identity:row.identity,
      presentationId:row.presentationId
    };
    const reloaded={
      identity:reloadIdentity(persisted.identity),
      presentationId:persisted.presentationId
    };

    assert.deepEqual(reloaded.identity,persisted.identity,row.caseId);
    assert.equal(
      semanticIdFromIdentity(reloaded.identity),
      persisted.presentationId,
      row.caseId
    );
    assert.equal(reloaded.presentationId,persisted.presentationId,row.caseId);
  }
});

test('replacement matrix cannot mutate gameplay content',()=>{
  const before=gameplaySnapshot();
  const replacementOnly=structuredClone(matrix);

  for(const row of replacementOnly.cases){
    row.replacementGif=row.replacementGif.replace(
      'media/regression/',
      'media/regression/alternate/'
    );
  }

  const after=gameplaySnapshot();
  assert.deepEqual(after,before);

  for(const row of replacementOnly.cases){
    assert.equal(
      semanticIdFromIdentity(row.identity),
      row.presentationId,
      row.caseId
    );
  }
});

test('regression fixture itself contains no gameplay mutation payload',()=>{
  assert.equal(matrix.policy.gameplayMutationAllowed,false);
  assert.equal(matrix.policy.semanticIdentityStable,true);
  assert.equal(matrix.policy.animationsOffMediaOnly,true);
  assert.equal(matrix.policy.missingGifFallsBackNonFatally,true);

  const serialized=JSON.stringify(matrix);
  for(const forbidden of [
    '"effects"',
    '"conditions"',
    '"rng"',
    '"energy"',
    '"money"',
    '"transition"',
    '"reward"',
    '"command"',
    '"delta"'
  ]){
    assert.equal(serialized.includes(forbidden),false,forbidden);
  }
});
