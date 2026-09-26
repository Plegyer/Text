import test from 'node:test';
import assert from 'node:assert/strict';
import {existsSync,readFileSync} from 'node:fs';

const json=(path:string)=>JSON.parse(readFileSync(path,'utf8'));
const inventory=json('content/presentation-shipped-closure-inventory.fixture.json');
const assets=json('content/presentation-asset-consistency.fixture.json');
const pa=json('content/presentation-pa-scenario.fixture.json');
const bundle=json('content/presentation-replacement-bundle.fixture.json');
const smoke=json('content/presentation-production-smoke.fixture.json');

test('readiness covers 21 unique semantic product slots',()=>{
  const ids=inventory.rows.map((row:any)=>row.presentationId);
  assert.equal(ids.length,21);
  assert.equal(new Set(ids).size,21);
  for(const id of ids){
    assert.match(id,/^[a-z0-9-]+(?:\/[a-z0-9-]+)+$/);
    if(id.startsWith('school/'))assert.equal(id.includes('_'),false,id);
  }
});

test('all required slots have shipped static fallback',()=>{
  assert.equal(assets.currentStaticBindings.length,21);
  for(const binding of assets.currentStaticBindings){
    assert.equal(binding.availability,'current');
    assert.equal(existsSync(binding.assetPath),true,binding.assetPath);
  }
});

test('future GIF gaps stay explicit and safely fallback',()=>{
  assert.equal(assets.futureGifTargets.length,7);
  for(const target of assets.futureGifTargets){
    assert.equal(target.availability,'future-unavailable');
    assert.equal(existsSync(target.assetPath),false,target.assetPath);
    const fallback=assets.currentStaticBindings.find((x:any)=>x.presentationId===target.presentationId);
    assert.ok(fallback,target.presentationId);
    assert.equal(existsSync(fallback.assetPath),true,fallback.assetPath);
  }
});

test('PA and smoke artifacts preserve semantic identity expectations',()=>{
  assert.equal(pa.policy.semanticIdentityStableAcrossReload,true);
  assert.equal(pa.policy.animationOffPresentationOnly,true);
  assert.equal(pa.policy.gameplayMutationAllowed,false);
  for(const scenario of pa.scenarios){
    for(const step of scenario.steps){
      assert.ok(step.saveReloadExpectation);
      assert.equal(step.animationOffExpectation,'same-presentation-non-animated-static');
    }
  }
  const kinds=new Set(smoke.steps.map((step:any)=>step.identity.kind));
  for(const kind of ['event','course','activity','ending'])assert.ok(kinds.has(kind),kind);
});

test('replacement bundle remains presentation-only and portable',()=>{
  assert.equal(bundle.format,'portal-life.presentation-replacement-bundle');
  assert.equal(bundle.formatVersion,1);
  assert.equal(bundle.presentationSchemaVersion,1);
  const serialized=JSON.stringify(bundle);
  for(const word of ['"conditions"','"effects"','"rng"','"energy"','"money"']){
    assert.equal(serialized.includes(word),false,word);
  }
  for(const value of Object.values(bundle.replacements) as any[]){
    assert.equal(value.futureGif.logicalTargetName.startsWith('media/'),true);
    assert.equal(value.futureGif.logicalTargetName.includes('..'),false);
  }
});
