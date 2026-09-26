import test from 'node:test';
import assert from 'node:assert/strict';
import {existsSync,readFileSync} from 'node:fs';

type StaticBinding={
  presentationId:string;
  sourcePresentationId:string;
  mediaId:string;
  assetPath:string;
  availability:'current';
};
type FutureGif={
  presentationId:string;
  mediaId:string;
  assetPath:string;
  availability:'future-unavailable';
};
type Fixture={
  version:1;
  kind:'presentation-asset-consistency-manifest';
  status:'shipped-plus-future-audit';
  policy:{
    currentAssetMustExist:true;
    futureGifMustBeUnavailableUntilAdded:true;
    semanticIdsIndependentFromFilenames:true;
    mechanicsDataAllowed:false;
  };
  currentStaticBindings:StaticBinding[];
  futureGifTargets:FutureGif[];
};

const json=(path:string)=>JSON.parse(readFileSync(path,'utf8'));
const fixture=json('content/presentation-asset-consistency.fixture.json') as Fixture;
const plan=json('content/presentation-production-patch-plan.fixture.json');
const stage=json('content/packs/stage.json');
const lumberProduction=json('content/packs/lumber-target/lumber-production.pack.json');
const lumberNight=json('content/packs/lumber-target/lumber-night-acceptance.pack.json');

const stageById=new Map(stage.media.map((media:any)=>[media.id,media]));
const futureById=new Map(
  [...lumberProduction.media,...lumberNight.media]
    .filter((media:any)=>media.kind==='gif')
    .map((media:any)=>[media.id,media])
);

test('every required semantic slot has exactly one current static resolution',()=>{
  const planIds=plan.slots.map((slot:any)=>slot.presentationId);
  const bindingIds=fixture.currentStaticBindings.map(binding=>binding.presentationId);

  assert.equal(fixture.currentStaticBindings.length,21);
  assert.equal(new Set(bindingIds).size,bindingIds.length);
  assert.deepEqual(new Set(bindingIds),new Set(planIds));
});

test('every currently available static media ID resolves to a shipped existing asset',()=>{
  for(const binding of fixture.currentStaticBindings){
    assert.equal(binding.availability,'current',binding.presentationId);
    const media=stageById.get(binding.mediaId);
    assert.ok(media,`stale current media id: ${binding.mediaId}`);
    assert.equal(media.kind,'image',binding.mediaId);
    assert.equal(media.src,binding.assetPath,binding.mediaId);
    assert.match(binding.assetPath,/^assets\//);
    assert.equal(existsSync(binding.assetPath),true,binding.assetPath);
  }
});

test('future GIF targets are declared, explicitly unavailable, and absent until added',()=>{
  assert.equal(fixture.futureGifTargets.length,7);

  for(const target of fixture.futureGifTargets){
    assert.equal(target.availability,'future-unavailable',target.presentationId);
    assert.match(target.assetPath,/^assets\/.*\.gif$/);
    assert.equal(existsSync(target.assetPath),false,target.assetPath);

    const declared=futureById.get(target.mediaId);
    assert.ok(declared,`future GIF media id is not declared: ${target.mediaId}`);
    assert.equal(declared.kind,'gif',target.mediaId);
    assert.equal(declared.src,target.assetPath,target.mediaId);
  }
});

test('fixture is an exact asset projection of the production patch plan',()=>{
  const bindings=new Map(fixture.currentStaticBindings.map(binding=>[binding.presentationId,binding]));
  const futures=new Map(fixture.futureGifTargets.map(target=>[target.presentationId,target]));
  const byId=new Map(plan.slots.map((slot:any)=>[slot.presentationId,slot]));

  const resolve=(slot:any)=>{
    const seen=new Set<string>();
    let current=slot;
    while(current){
      assert.equal(seen.has(current.presentationId),false,`fallback cycle at ${current.presentationId}`);
      seen.add(current.presentationId);
      if(current.preferredExistingStatic)return {
        sourcePresentationId:current.presentationId,
        mediaId:current.preferredExistingStatic.mediaId,
        assetPath:current.preferredExistingStatic.assetPath
      };
      const support=plan.supportFallbacks[current.fallbackId];
      if(support)return {
        sourcePresentationId:current.fallbackId,
        mediaId:support.mediaId,
        assetPath:support.assetPath
      };
      current=byId.get(current.fallbackId);
    }
    return null;
  };

  for(const slot of plan.slots){
    const expected=resolve(slot);
    assert.ok(expected,slot.presentationId);
    const actual=bindings.get(slot.presentationId);
    assert.ok(actual,slot.presentationId);
    assert.equal(actual.sourcePresentationId,expected.sourcePresentationId,slot.presentationId);
    assert.equal(actual.mediaId,expected.mediaId,slot.presentationId);
    assert.equal(actual.assetPath,expected.assetPath,slot.presentationId);

    if(slot.primaryGif){
      const target=futures.get(slot.presentationId);
      assert.ok(target,slot.presentationId);
      assert.equal(target.mediaId,slot.primaryGif.mediaId,slot.presentationId);
      assert.equal(target.assetPath,slot.primaryGif.assetPath,slot.presentationId);
    }else{
      assert.equal(futures.has(slot.presentationId),false,slot.presentationId);
    }
  }
});

test('semantic presentation IDs never depend on filenames or asset IDs',()=>{
  for(const binding of fixture.currentStaticBindings){
    assert.match(binding.presentationId,/^[a-z0-9-]+(?:\/[a-z0-9-]+)+$/);
    assert.doesNotMatch(binding.presentationId,/\.(?:gif|svg|png|jpe?g|webp)$/i);
    assert.notEqual(binding.presentationId,binding.assetPath);
    assert.notEqual(binding.presentationId,binding.mediaId);
  }

  for(const target of fixture.futureGifTargets){
    assert.match(target.presentationId,/^[a-z0-9-]+(?:\/[a-z0-9-]+)+$/);
    assert.doesNotMatch(target.presentationId,/\.gif$/i);
    assert.notEqual(target.presentationId,target.assetPath);
    assert.notEqual(target.presentationId,target.mediaId);
  }
});

test('asset consistency fixture carries no mechanics, RNG, Energy, effects, or save state',()=>{
  assert.equal(fixture.policy.mechanicsDataAllowed,false);
  const serialized=JSON.stringify(fixture);
  for(const forbidden of [
    '"conditions"','"effects"','"rng"','"energy"','"money"',
    '"inventory"','"transition"','"reward"','"delta"','"command"',
    '"save"','"runState"'
  ])assert.equal(serialized.includes(forbidden),false,forbidden);
});
