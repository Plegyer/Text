import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

type Mapping={
  legacyMediaId:string;
  presentationIds:string[];
  intent:string;
};
type Orphan={legacyMediaId:string;reason:string};
type Matrix={
  version:1;
  kind:'legacy-media-to-semantic-presentation-matrix';
  status:'isolated-test-fixture';
  scope:'m3.2-to-target-presentation-only';
  policies:{
    unknownLegacyKey:'orphan-unsupported';
    gameplayIds:'preserve';
    pendingIdentity:{
      eventId:'preserve';
      variantId:'preserve';
      presentationId:'derive-from-matrix-only';
    };
    playback:{
      onReload:'restart-animation';
      persistedFields:string[];
    };
  };
  mappings:Mapping[];
  explicitOrphans:Orphan[];
};
type Registry={
  entries:{presentationId:string}[];
};

const matrix=JSON.parse(readFileSync('content/presentation-legacy-migration.fixture.json','utf8')) as Matrix;
const registry=JSON.parse(readFileSync('content/presentation-target-registry.fixture.json','utf8')) as Registry;

function migrateLegacyMedia(
  legacyMediaId:string,
  pending:{eventId:string;variantId:string}
){
  const mapping=matrix.mappings.find(item=>item.legacyMediaId===legacyMediaId);
  if(!mapping)return {
    status:'orphan' as const,
    legacyMediaId,
    presentationIds:[] as string[],
    pending:{...pending}
  };
  return {
    status:'mapped' as const,
    legacyMediaId,
    presentationIds:[...mapping.presentationIds],
    pending:{...pending}
  };
}

test('legacy migration mapping is deterministic and targets registered semantic slots',()=>{
  const knownTargets=new Set(registry.entries.map(entry=>entry.presentationId));
  const legacyIds=new Set<string>();
  for(const mapping of matrix.mappings){
    assert.equal(legacyIds.has(mapping.legacyMediaId),false,`duplicate legacy key ${mapping.legacyMediaId}`);
    legacyIds.add(mapping.legacyMediaId);
    assert.ok(mapping.presentationIds.length>0);
    assert.equal(new Set(mapping.presentationIds).size,mapping.presentationIds.length,`duplicate semantic target for ${mapping.legacyMediaId}`);
    for(const target of mapping.presentationIds){
      assert.match(target,/^(?:location|job|school|relationship|night|activity|ending)\//);
      assert.ok(knownTargets.has(target),`unregistered target ${target}`);
    }
  }
});

test('one legacy asset may intentionally seed multiple semantic presentation slots',()=>{
  const generic=matrix.mappings.find(mapping=>mapping.legacyMediaId==='stage.lumber');
  assert.ok(generic);
  assert.ok(generic.presentationIds.length>1);
  assert.ok(generic.presentationIds.includes('job/lumber/shift/spring/default'));
  assert.ok(generic.presentationIds.includes('job/lumber/result/default'));

  const forest=matrix.mappings.find(mapping=>mapping.legacyMediaId==='stage.hunt');
  assert.ok(forest);
  assert.ok(forest.presentationIds.includes('activity/forest/route/default'));
  assert.ok(forest.presentationIds.includes('activity/forest/encounter/default'));
});

test('unknown or explicitly ambiguous legacy key is orphaned and never guessed',()=>{
  assert.equal(matrix.policies.unknownLegacyKey,'orphan-unsupported');
  const pending={eventId:'career.foreman-trust',variantId:'default'};
  const unknown=migrateLegacyMedia('stage.unknown.future',pending);
  assert.equal(unknown.status,'orphan');
  assert.deepEqual(unknown.presentationIds,[]);
  assert.deepEqual(unknown.pending,pending);

  const explicit=new Set(matrix.explicitOrphans.map(item=>item.legacyMediaId));
  assert.ok(explicit.has('stage.flirt'));
  assert.equal(matrix.mappings.some(item=>explicit.has(item.legacyMediaId)),false);
});

test('migration preserves pending event and variant identity',()=>{
  const pending={eventId:'career.foreman-trust',variantId:'milestone'};
  const migrated=migrateLegacyMedia('stage.lumber.spring',pending);
  assert.equal(migrated.status,'mapped');
  assert.equal(migrated.pending.eventId,pending.eventId);
  assert.equal(migrated.pending.variantId,pending.variantId);
  assert.equal(matrix.policies.gameplayIds,'preserve');
  assert.equal(matrix.policies.pendingIdentity.eventId,'preserve');
  assert.equal(matrix.policies.pendingIdentity.variantId,'preserve');
});

test('migration persists no GIF frame, duration, loop or elapsed timing state',()=>{
  assert.equal(matrix.policies.playback.onReload,'restart-animation');
  assert.deepEqual(matrix.policies.playback.persistedFields,[]);
  const serialized=JSON.stringify(matrix).toLowerCase();
  for(const forbidden of ['framenumber','currentframe','elapsedms','playbacktimestamp','loopcount','gifduration'])assert.equal(serialized.includes(forbidden),false,forbidden);
});
