import test from 'node:test';
import assert from 'node:assert/strict';
import {existsSync,readFileSync} from 'node:fs';

type Classification=
  |'direct-media-backed'
  |'static-fallback-backed'
  |'text-fallback-only'
  |'future-gif-replacement';

type Row={
  presentationId:string;
  classification:Classification;
  directStatic:{mediaId:string;assetPath:string}|null;
  futureGif:{mediaId:string;assetPath:string;available:false}|null;
  fallbackId:string|null;
  textFallbackAvailable:boolean;
};

type Inventory={
  version:1;
  kind:'presentation-shipped-closure-inventory';
  status:'activation-closure-inventory';
  source:string;
  policy:{
    oneRowPerSemanticSlot:true;
    mechanicsDataAllowed:false;
    semanticIdNamespace:'slash-taxonomy';
  };
  rows:Row[];
};

const json=(path:string)=>JSON.parse(readFileSync(path,'utf8'));
const inventory=json('content/presentation-shipped-closure-inventory.fixture.json') as Inventory;
const plan=json('content/presentation-production-patch-plan.fixture.json');

const expectedClass=(classification:string):Classification=>{
  if(classification==='direct-existing')return 'direct-media-backed';
  if(classification==='static-fallback')return 'static-fallback-backed';
  if(classification==='text-only')return 'text-fallback-only';
  if(classification==='future-GIF')return 'future-gif-replacement';
  throw new Error('unknown patch-plan classification: '+classification);
};

function collectKeys(value:unknown,keys=new Set<string>()):Set<string>{
  if(Array.isArray(value)){for(const item of value)collectKeys(item,keys);return keys;}
  if(value&&typeof value==='object'){
    for(const [key,item] of Object.entries(value as Record<string,unknown>)){
      keys.add(key.toLowerCase());
      collectKeys(item,keys);
    }
  }
  return keys;
}

test('inventory has exactly one row for every required semantic slot',()=>{
  const planIds=plan.slots.map((slot:any)=>slot.presentationId);
  const inventoryIds=inventory.rows.map(row=>row.presentationId);

  assert.equal(inventory.rows.length,21);
  assert.equal(new Set(inventoryIds).size,inventoryIds.length);
  assert.deepEqual(new Set(inventoryIds),new Set(planIds));
});

test('classification is an exact projection of the production patch plan',()=>{
  const byId=new Map(inventory.rows.map(row=>[row.presentationId,row]));
  for(const slot of plan.slots){
    const row=byId.get(slot.presentationId);
    assert.ok(row,slot.presentationId);
    assert.equal(row.classification,expectedClass(slot.classification),slot.presentationId);
    assert.equal(row.fallbackId,slot.fallbackId,slot.presentationId);
    assert.equal(row.textFallbackAvailable,Boolean(slot.textFallback?.trim()),slot.presentationId);

    if(slot.preferredExistingStatic){
      assert.deepEqual(row.directStatic,{
        mediaId:slot.preferredExistingStatic.mediaId,
        assetPath:slot.preferredExistingStatic.assetPath
      },slot.presentationId);
    }else{
      assert.equal(row.directStatic,null,slot.presentationId);
    }

    if(slot.primaryGif){
      assert.deepEqual(row.futureGif,{
        mediaId:slot.primaryGif.mediaId,
        assetPath:slot.primaryGif.assetPath,
        available:false
      },slot.presentationId);
    }else{
      assert.equal(row.futureGif,null,slot.presentationId);
    }
  }
});

test('all four inventory classes are explicit and future GIF rows stay unavailable',()=>{
  const classes=new Set(inventory.rows.map(row=>row.classification));
  assert.ok(classes.has('direct-media-backed'));
  assert.ok(classes.has('static-fallback-backed'));
  assert.ok(classes.has('future-gif-replacement'));

  const future=inventory.rows.filter(row=>row.classification==='future-gif-replacement');
  assert.equal(future.length,7);
  for(const row of future){
    assert.ok(row.futureGif,row.presentationId);
    assert.equal(row.futureGif.available,false,row.presentationId);
    assert.equal(existsSync(row.futureGif.assetPath),false,row.futureGif.assetPath);
  }
});

test('semantic IDs use slash taxonomy and never depend on asset filenames',()=>{
  for(const row of inventory.rows){
    assert.match(row.presentationId,/^[a-z0-9-]+(?:\/[a-z0-9-]+)+$/);
    assert.doesNotMatch(row.presentationId,/\.(?:gif|png|jpe?g|webp|svg|mp4|webm)$/i);
    if(row.directStatic)assert.notEqual(row.presentationId,row.directStatic.assetPath);
    if(row.futureGif)assert.notEqual(row.presentationId,row.futureGif.assetPath);
  }
});

test('inventory contains no mechanics, effects, RNG, Energy, or save-state payload',()=>{
  assert.equal(inventory.policy.mechanicsDataAllowed,false);
  const keys=collectKeys(inventory.rows);
  for(const forbidden of [
    'condition','conditions','effect','effects','rng','random','energy',
    'cost','delta','reward','transition','command','metrics','inventory',
    'save','state','money'
  ])assert.equal(keys.has(forbidden),false,forbidden);
});
