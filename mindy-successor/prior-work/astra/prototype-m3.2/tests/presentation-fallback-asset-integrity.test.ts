import test from 'node:test';
import assert from 'node:assert/strict';
import {existsSync,readFileSync} from 'node:fs';

const json=(path:string)=>JSON.parse(readFileSync(path,'utf8'));
const fixture=json('content/presentation-fallback-asset-integrity.fixture.json');
const future=json('content/presentation-asset-consistency.fixture.json');

const byMedia=new Map(fixture.assets.map((asset:any)=>[asset.mediaId,asset]));
const futureIds=new Set(future.futureGifTargets.map((row:any)=>row.mediaId));
const futurePaths=new Set(future.futureGifTargets.map((row:any)=>row.assetPath));

test('manifest covers all 21 required target presentation slots once',()=>{
  assert.equal(fixture.slotBindings.length,21);
  const ids=fixture.slotBindings.map((row:any)=>row.presentationId);
  assert.equal(new Set(ids).size,ids.length);
  for(const id of ids)assert.match(id,/^[a-z0-9-]+(?:\/[a-z0-9-]+)+$/);
});

test('every referenced current asset exists on disk',()=>{
  for(const asset of fixture.assets){
    assert.equal(asset.kind,'image',asset.mediaId);
    assert.match(asset.assetPath,/^assets\//);
    assert.equal(existsSync(asset.assetPath),true,asset.assetPath);
  }
  for(const binding of fixture.slotBindings){
    assert.ok(byMedia.has(binding.mediaId),binding.mediaId);
  }
});

test('no logical media ID points to conflicting current paths',()=>{
  const seen=new Map<string,string>();
  for(const asset of fixture.assets){
    const prior=seen.get(asset.mediaId);
    if(prior!==undefined)assert.equal(prior,asset.assetPath,asset.mediaId);
    seen.set(asset.mediaId,asset.assetPath);
  }
  assert.equal(seen.size,fixture.assets.length);
});

test('future GIF targets are excluded from currently shipped counts',()=>{
  assert.equal(fixture.policy.futureGifTargetsExcluded,true);
  for(const asset of fixture.assets){
    assert.equal(futureIds.has(asset.mediaId),false,asset.mediaId);
    assert.equal(futurePaths.has(asset.assetPath),false,asset.assetPath);
    assert.doesNotMatch(asset.assetPath,/\.gif$/i);
  }
});

test('School target slots use the shipped School static stage',()=>{
  const school=fixture.slotBindings.filter((row:any)=>row.presentationId.startsWith('school/'));
  assert.equal(school.length,8);
  for(const row of school)assert.equal(row.mediaId,'stage.school',row.presentationId);
});

test('text-only fallback slots are valid without a file when present',()=>{
  assert.equal(fixture.policy.textOnlyFallbackRequiresFile,false);
  for(const row of fixture.textOnlyFallbackSlots){
    assert.ok(row.presentationId);
    assert.ok(row.textFallback?.trim());
    assert.equal('assetPath' in row,false,row.presentationId);
  }
});
