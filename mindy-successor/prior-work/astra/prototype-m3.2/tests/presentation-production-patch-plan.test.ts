import test from 'node:test';
import assert from 'node:assert/strict';
import {existsSync,readFileSync} from 'node:fs';
import {SCHOOL_COURSES} from '../src/core/school.ts';

type Classification='direct-existing'|'static-fallback'|'text-only'|'future-GIF';
type StaticMedia={
  mediaId:string;
  assetPath:string;
  available:boolean;
};
type PrimaryGif={
  mediaId:string;
  assetPath:string;
  status:'future-unavailable';
};
type Slot={
  presentationId:string;
  classification:Classification;
  preferredExistingStatic:StaticMedia|null;
  primaryGif:PrimaryGif|null;
  fallbackId:string|null;
  textFallback:string;
};
type Fixture={
  version:1;
  kind:'presentation-production-patch-plan';
  status:'lead-activation-plan';
  policy:{
    mechanicsDataAllowed:false;
    gameplayIdsRemainUnchanged:true;
    missingAssetMayNotBeMarkedAvailable:true;
    schoolPresentationSegments:'kebab-case';
    semanticIdNamespace:'slash-taxonomy';
  };
  supportFallbacks:Record<string,{
    mediaId:string;
    assetPath:string;
    available:boolean;
    textFallback:string;
  }>;
  slots:Slot[];
};

const json=(path:string)=>JSON.parse(readFileSync(path,'utf8'));
const fixture=json('content/presentation-production-patch-plan.fixture.json') as Fixture;
const closure=json('content/presentation-shipped-slot-closure.fixture.json');
const lumberProduction=json('content/packs/lumber-target/lumber-production.pack.json');
const lumberNight=json('content/packs/lumber-target/lumber-night-acceptance.pack.json');

const declaredFutureMedia=new Map(
  [...lumberProduction.media,...lumberNight.media]
    .filter((media:any)=>media.kind==='gif')
    .map((media:any)=>[media.id,media])
);

const expectedIds=[
  'job/lumber/shift/spring/default',
  'job/lumber/shift/summer/default',
  'job/lumber/shift/autumn/default',
  'job/lumber/shift/winter/default',
  'job/lumber/result/default',
  'job/lumber/event/lumber-career-first-shift/default',
  'relationship/lumber-foreman/lumber-foreman-notice/default',
  'relationship/lumber-foreman/lumber-night-foreman-professional/default',
  'activity/forest/route/default',
  'activity/forest/return/success',
  ...SCHOOL_COURSES.map(course=>course.presentationId),
  'ending/lumber/hard-work',
  'ending/lumber/forewoman',
  'ending/lumber/forest'
];

function collectKeys(value:unknown,keys=new Set<string>()):Set<string>{
  if(Array.isArray(value)){
    for(const item of value)collectKeys(item,keys);
    return keys;
  }
  if(value&&typeof value==='object'){
    for(const [key,item] of Object.entries(value as Record<string,unknown>)){
      keys.add(key.toLowerCase());
      collectKeys(item,keys);
    }
  }
  return keys;
}

function validateFallbackGraph(){
  const slotIds=new Set(fixture.slots.map(slot=>slot.presentationId));
  const supportIds=new Set(Object.keys(fixture.supportFallbacks));
  const allIds=new Set([...slotIds,...supportIds]);
  const next=new Map<string,string|null>();

  for(const slot of fixture.slots){
    assert.ok(
      slot.fallbackId===null||allIds.has(slot.fallbackId),
      `missing fallback target for ${slot.presentationId}: ${slot.fallbackId}`
    );
    next.set(slot.presentationId,slot.fallbackId);
  }
  for(const id of supportIds)next.set(id,null);

  const state=new Map<string,0|1|2>();
  const visit=(id:string,trail:string[])=>{
    const mark=state.get(id)??0;
    if(mark===1)assert.fail(`fallback cycle: ${[...trail,id].join(' -> ')}`);
    if(mark===2)return;
    state.set(id,1);
    const fallback=next.get(id);
    if(fallback)visit(fallback,[...trail,id]);
    state.set(id,2);
  };

  for(const id of allIds)visit(id,[]);
}

function terminalStatic(slot:Slot){
  const byId=new Map(fixture.slots.map(item=>[item.presentationId,item]));
  const seen=new Set<string>();
  let current:Slot|undefined=slot;
  while(current&&!seen.has(current.presentationId)){
    seen.add(current.presentationId);
    if(current.preferredExistingStatic?.available)return current.preferredExistingStatic;
    if(!current.fallbackId)break;
    const support=fixture.supportFallbacks[current.fallbackId];
    if(support?.available)return support;
    current=byId.get(current.fallbackId);
  }
  return null;
}

test('patch plan covers the exact 21-slot activation closure exactly once',()=>{
  assert.equal(fixture.version,1);
  assert.equal(fixture.kind,'presentation-production-patch-plan');
  assert.equal(fixture.slots.length,21);
  assert.equal(new Set(fixture.slots.map(slot=>slot.presentationId)).size,21);

  assert.deepEqual(
    new Set(fixture.slots.map(slot=>slot.presentationId)),
    new Set(expectedIds)
  );
  assert.deepEqual(
    new Set(fixture.slots.map(slot=>slot.presentationId)),
    new Set(closure.slots.map((slot:any)=>slot.presentationId))
  );
});

test('every semantic presentationId uses slash taxonomy, contains no filename, and School segments are kebab-case',()=>{
  for(const slot of fixture.slots){
    assert.match(slot.presentationId,/^[a-z0-9-]+(?:\/[a-z0-9-]+)+$/);
    assert.doesNotMatch(slot.presentationId,/\.(?:gif|png|jpe?g|webp|svg|mp4|webm)$/i);
    assert.equal(slot.presentationId.startsWith('assets/'),false,slot.presentationId);
  }

  const school=fixture.slots.filter(slot=>slot.presentationId.startsWith('school/'));
  assert.equal(school.length,8);
  for(const slot of school){
    assert.match(
      slot.presentationId,
      /^school\/[a-z0-9]+(?:-[a-z0-9]+)*\/lesson\/default$/
    );
    assert.equal(slot.presentationId.includes('_'),false,slot.presentationId);
  }
});

test('every direct-existing static asset is shipped and every static-fallback reaches shipped static media',()=>{
  for(const slot of fixture.slots){
    if(slot.preferredExistingStatic){
      assert.equal(slot.preferredExistingStatic.available,true,slot.presentationId);
      assert.match(slot.preferredExistingStatic.assetPath,/^assets\//);
      assert.equal(
        existsSync(slot.preferredExistingStatic.assetPath),
        true,
        slot.preferredExistingStatic.assetPath
      );
    }

    if(slot.classification==='direct-existing'){
      assert.ok(slot.preferredExistingStatic,slot.presentationId);
    }

    if(slot.classification==='static-fallback'){
      assert.equal(slot.preferredExistingStatic,null,slot.presentationId);
      const resolved=terminalStatic(slot);
      assert.ok(resolved,`no shipped static fallback for ${slot.presentationId}`);
      assert.equal(resolved.available,true,slot.presentationId);
      assert.equal(existsSync(resolved.assetPath),true,resolved.assetPath);
    }
  }

  for(const [id,support] of Object.entries(fixture.supportFallbacks)){
    assert.equal(support.available,true,id);
    assert.match(support.assetPath,/^assets\//);
    assert.equal(existsSync(support.assetPath),true,support.assetPath);
  }
});

test('planned GIF targets are declared by target packs, marked future/unavailable, and do not exist yet',()=>{
  const future=fixture.slots.filter(slot=>slot.classification==='future-GIF');
  assert.equal(future.length,7);

  for(const slot of future){
    assert.ok(slot.primaryGif,slot.presentationId);
    assert.equal(slot.primaryGif.status,'future-unavailable',slot.presentationId);
    assert.match(slot.primaryGif.assetPath,/^assets\/.*\.gif$/);
    assert.equal(existsSync(slot.primaryGif.assetPath),false,slot.primaryGif.assetPath);

    const declared=declaredFutureMedia.get(slot.primaryGif.mediaId);
    assert.ok(declared,`future media id not declared by target pack: ${slot.primaryGif.mediaId}`);
    assert.equal(declared.kind,'gif',slot.primaryGif.mediaId);
    assert.equal(declared.src,slot.primaryGif.assetPath,slot.primaryGif.mediaId);
  }

  for(const slot of fixture.slots.filter(slot=>slot.classification!=='future-GIF')){
    if(!slot.primaryGif)continue;
    assert.equal(slot.primaryGif.status,'future-unavailable',slot.presentationId);
    assert.equal(existsSync(slot.primaryGif.assetPath),false,slot.primaryGif.assetPath);
  }
});

test('no missing path is marked currently available',()=>{
  for(const slot of fixture.slots){
    if(slot.preferredExistingStatic){
      assert.equal(
        slot.preferredExistingStatic.available,
        existsSync(slot.preferredExistingStatic.assetPath),
        slot.presentationId
      );
    }
    if(slot.primaryGif){
      assert.equal(slot.primaryGif.status,'future-unavailable',slot.presentationId);
      assert.equal(existsSync(slot.primaryGif.assetPath),false,slot.presentationId);
    }
  }

  for(const [id,support] of Object.entries(fixture.supportFallbacks)){
    assert.equal(support.available,existsSync(support.assetPath),id);
  }
});

test('fallback graph is complete and cycle-free',()=>{
  validateFallbackGraph();

  for(const slot of fixture.slots){
    if(slot.classification==='static-fallback'){
      assert.ok(slot.fallbackId,slot.presentationId);
    }
    assert.ok(slot.textFallback.trim().length>0,slot.presentationId);
  }
});

test('all required Lumber, Forest, School, and ending families are represented exactly once',()=>{
  const ids=fixture.slots.map(slot=>slot.presentationId);

  assert.deepEqual(
    ids.filter(id=>id.startsWith('job/lumber/shift/')).sort(),
    [
      'job/lumber/shift/autumn/default',
      'job/lumber/shift/spring/default',
      'job/lumber/shift/summer/default',
      'job/lumber/shift/winter/default'
    ]
  );
  assert.equal(ids.filter(id=>id==='job/lumber/result/default').length,1);
  assert.equal(ids.filter(id=>id==='job/lumber/event/lumber-career-first-shift/default').length,1);
  assert.equal(ids.filter(id=>id.startsWith('relationship/lumber-foreman/')).length,2);
  assert.deepEqual(
    ids.filter(id=>id.startsWith('activity/forest/')).sort(),
    ['activity/forest/return/success','activity/forest/route/default']
  );
  assert.equal(ids.filter(id=>id.startsWith('school/')).length,8);
  assert.deepEqual(
    ids.filter(id=>id.startsWith('ending/lumber/')).sort(),
    ['ending/lumber/forest','ending/lumber/forewoman','ending/lumber/hard-work']
  );
});

test('patch plan contains no mechanics, effects, RNG, Energy, or gameplay identity payload',()=>{
  assert.equal(fixture.policy.mechanicsDataAllowed,false);
  assert.equal(fixture.policy.gameplayIdsRemainUnchanged,true);

  const keys=collectKeys({slots:fixture.slots,supportFallbacks:fixture.supportFallbacks});
  for(const forbidden of [
    'gameplayid','eventid','variantid','condition','conditions','effect','effects',
    'rng','random','energy','cost','delta','reward','transition','command',
    'metrics','inventory','run','save','state'
  ])assert.equal(keys.has(forbidden),false,forbidden);
});
