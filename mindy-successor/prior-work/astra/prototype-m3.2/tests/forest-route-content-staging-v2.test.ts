import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const definitions=JSON.parse(readFileSync('content/definitions.json','utf8'));
const staging=JSON.parse(
  readFileSync('content/presentation-drafts/forest-route-content-staging-v2.json','utf8')
);

function objectKeys(value:any,out:string[]=[]):string[]{
  if(Array.isArray(value)){
    for(const item of value)objectKeys(item,out);
    return out;
  }
  if(value&&typeof value==='object'){
    for(const [key,item] of Object.entries(value)){
      out.push(key);
      objectKeys(item,out);
    }
  }
  return out;
}

test('Forest route staging uses only current shipped route identities',()=>{
  const activity=definitions.activities.find((entry:any)=>entry.id==='lumber.forest');
  assert.ok(activity);

  const shipped=activity.options
    .filter((entry:any)=>entry.category==='route')
    .map((entry:any)=>entry.id);

  const staged=staging.routes.map((entry:any)=>entry.routeId);

  assert.deepEqual(shipped,[
    'forest.route.logging-road',
    'forest.route.old-boundary'
  ]);
  assert.deepEqual(staged,shipped);
  assert.equal(JSON.stringify(staging).toLowerCase().includes('hunter-trail'),false);
  assert.equal(JSON.stringify(staging).toLowerCase().includes('forest.route.hunter'),false);
});

test('Forest route staging contains presentation data only and no gameplay fields',()=>{
  const keys=new Set(objectKeys(staging));
  for(const forbidden of [
    'conditions','effects','rewards','reward',
    'progressDelta','enduranceCost','setRoute',
    'itemConsume','itemAcquisition','price'
  ]){
    assert.equal(keys.has(forbidden),false,forbidden);
  }

  assert.equal(staging.guardrails.noMechanicsAuthored,true);
  assert.equal(staging.guardrails.oldBoundaryAcquisitionAssumption,false);
  assert.equal(staging.guardrails.oldBoundaryConsumptionAssumption,false);
  assert.equal(staging.guardrails.mediaSelectionChangesGameplay,false);
});

test('Forest semantic route presentation IDs are stable and locale-neutral',()=>{
  assert.deepEqual(
    staging.routes.map((entry:any)=>entry.semanticPresentationId),
    [
      'activity/forest/route/logging-road',
      'activity/forest/route/old-boundary'
    ]
  );

  const localeSpecific=/(^|[._/-])(ru|en)([._/-]|$)/i;

  for(const route of staging.routes){
    assert.equal(localeSpecific.test(route.routeId),false,route.routeId);
    assert.equal(
      localeSpecific.test(route.semanticPresentationId),
      false,
      route.semanticPresentationId
    );
    assert.equal(route.mediaSlot.presentationId,route.semanticPresentationId);

    for(const scene of route.scenes){
      assert.equal(localeSpecific.test(scene.sceneId),false,scene.sceneId);
      assert.equal(localeSpecific.test(scene.textKey),false,scene.textKey);
    }
  }
});

test('all Forest staging copy and media alt references have complete RU EN pairs',()=>{
  for(const route of staging.routes){
    for(const scene of route.scenes){
      const entry=staging.localization[scene.textKey];
      assert.ok(entry,scene.textKey);
      assert.ok(entry.ru?.trim(),scene.textKey+' ru');
      assert.ok(entry.en?.trim(),scene.textKey+' en');
    }

    const reaction=staging.localization[route.reactionTextKey];
    assert.ok(reaction?.ru?.trim(),route.reactionTextKey+' ru');
    assert.ok(reaction?.en?.trim(),route.reactionTextKey+' en');

    for(const candidate of route.mediaSlot.candidates){
      const alt=staging.localization[candidate.altKey];
      assert.ok(alt?.ru?.trim(),candidate.altKey+' ru');
      assert.ok(alt?.en?.trim(),candidate.altKey+' en');
    }
  }
});

test('placeholder Forest media stays explicitly staging-only',()=>{
  for(const route of staging.routes){
    assert.equal(route.mediaSlot.status,'STAGING_ONLY');
    assert.equal(route.mediaSlot.selectionAuthority,'PRESENTATION_ONLY');
    assert.ok(route.mediaSlot.candidates.length>=3);
    assert.ok(route.mediaSlot.candidates.length<=5);

    for(const candidate of route.mediaSlot.candidates){
      assert.equal(candidate.assetStatus,'STAGING_ONLY');
      assert.match(candidate.src,/^assets\/staging\/.*\.gif$/);
    }

    assert.equal(route.mediaSlot.staticFallback.assetStatus,'REAL_SHIPPED_STATIC');
    assert.equal(route.mediaSlot.staticFallback.src,'assets/stage-forest.svg');
  }

  assert.equal(staging.guardrails.placeholdersAreProduction,false);
});
