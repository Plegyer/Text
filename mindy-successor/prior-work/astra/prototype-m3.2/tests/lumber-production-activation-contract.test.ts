import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {
  presentationIdForAction,
  presentationIdForActionResult,
  presentationIdForEnding,
  presentationIdForEvent
} from '../src/core/presentation.ts';
import type {Catalog} from '../src/core/schema.ts';

const manifest=JSON.parse(readFileSync('content/lumber-production-activation.fixture.json','utf8'));
const definitions=JSON.parse(readFileSync('content/lumber-target-definitions.fixture.json','utf8'));
const productionPack=JSON.parse(readFileSync('content/packs/lumber-target/lumber-production.pack.json','utf8'));
const crossPack=JSON.parse(readFileSync('content/packs/lumber-target/lumber-cross-system.pack.json','utf8'));
const nightPack=JSON.parse(readFileSync('content/packs/lumber-target/lumber-night-acceptance.pack.json','utf8'));
const itemCapabilityFixture=JSON.parse(readFileSync('content/lumber-item-capabilities.fixture.json','utf8'));

const packs=[productionPack,crossPack,nightPack];
const events=packs.flatMap((p:any)=>p.events);
const media=packs.flatMap((p:any)=>p.media);
const presentationCatalog={definitions,packs,events,media} as Catalog;

function hardWorkDefinition(){
  return definitions.endings.find((e:any)=>e.id==='ending.lumber.hard-work');
}

function assertLockedHardWorkContract(candidate:any){
  const hardWork=candidate.lockedContracts?.hardWork;
  assert.equal(hardWork?.endingId,'ending.lumber.hard-work');
  assert.deepEqual(hardWork?.conditions,[
    {kind:'careerCounter',career:'lumber',counter:'completed_shifts',op:'gte',value:50}
  ]);
  assert.equal(hardWork?.conditions.length,1);
  assert.equal(hardWork?.rewardId,'hardWork:lumber');
  assert.equal(hardWork?.noAdditionalPrerequisites,true);
}

test('production activation manifest names only existing Lumber shipped candidates and excludes synthetic School activation',()=>{
  assert.deepEqual(manifest.productionCandidates.actions,['lumber.shift']);
  assert.ok(!manifest.productionCandidates.actions.includes('school.lumber-management'));
  assert.ok(definitions.actions.some((a:any)=>a.id==='lumber.shift'));
  assert.ok(definitions.actions.some((a:any)=>a.id==='school.lumber-management'));

  assert.deepEqual(manifest.productionCandidates.careers,['lumber']);
  assert.ok(definitions.careers.some((c:any)=>c.id==='lumber'));

  assert.deepEqual(manifest.productionCandidates.relationships,['lumber.foreman']);
  assert.ok(definitions.relationships.some((r:any)=>r.id==='lumber.foreman'));

  assert.deepEqual(manifest.productionCandidates.activities,['lumber.forest']);
  assert.ok(definitions.activities.some((a:any)=>a.id==='lumber.forest'));

  for(const id of manifest.productionCandidates.endings){
    assert.ok(definitions.endings.some((e:any)=>e.id===id),`missing ending ${id}`);
  }

  for(const id of Object.values(manifest.productionCandidates.events) as string[]){
    assert.ok(events.some((e:any)=>e.id===id),`missing event ${id}`);
  }

  const schoolActionExclusion=manifest.exclusions.find((x:any)=>x.kind==='action'&&x.id==='school.lumber-management');
  assert.ok(schoolActionExclusion);
  const schoolEventExclusion=manifest.exclusions.find((x:any)=>x.kind==='event'&&x.id==='lumber-cross.school-management-return');
  assert.ok(schoolEventExclusion);
  assert.ok(!Object.values(manifest.productionCandidates.events).includes('lumber-cross.school-management-return'));
});

test('activation manifest preserves exact Hard Work contract and detects prerequisite or reward drift',()=>{
  const source=hardWorkDefinition();
  assert.deepEqual(source.conditions,[
    {kind:'careerCounter',career:'lumber',counter:'completed_shifts',op:'gte',value:50}
  ]);
  assert.equal(source.conditions.length,1);
  assert.deepEqual(source.metaRewards,[
    {kind:'hardWork',rewardId:'hardWork:lumber',career:'lumber'}
  ]);

  assertLockedHardWorkContract(manifest);

  const extraPrerequisite=structuredClone(manifest);
  extraPrerequisite.lockedContracts.hardWork.conditions.push({
    kind:'relationshipStage',
    relationship:'lumber.foreman',
    stage:'route-professional'
  });
  assert.throws(()=>assertLockedHardWorkContract(extraPrerequisite));

  const alteredReward=structuredClone(manifest);
  alteredReward.lockedContracts.hardWork.rewardId='hardwork.lumber';
  assert.throws(()=>assertLockedHardWorkContract(alteredReward));
});

test('activation manifest records OPEN ownership dependencies instead of inventing production facts or Forest content',()=>{
  const byId=new Map(manifest.unresolvedDependencies.map((x:any)=>[x.id,x]));
  for(const id of [
    'school.management_public_fact',
    'lumber.forest.item_capability_source',
    'lumber.forest.deeper_authoring'
  ]){
    const dep:any=byId.get(id);
    assert.ok(dep,`missing dependency ${id}`);
    assert.equal(dep.status,'OPEN');
    assert.equal(dep.productionValue,null);
  }

  const school:any=byId.get('school.management_public_fact');
  assert.equal(school.currentFixtureReference,'lumber.school.management-ready');

  const item:any=byId.get('lumber.forest.item_capability_source');
  assert.equal(item.currentFixtureReference.itemId,itemCapabilityFixture.itemId);
  assert.equal(item.currentFixtureReference.capabilityId,itemCapabilityFixture.capabilities[0].id);
  assert.equal(item.currentFixtureReference.runtimeWorldFactAdapter,itemCapabilityFixture.capabilities[0].runtimeAdapter.fact);

  const forest:any=byId.get('lumber.forest.deeper_authoring');
  const activity=definitions.activities.find((a:any)=>a.id==='lumber.forest');
  assert.deepEqual(forest.lockedExistingResultIds,activity.results.map((r:any)=>r.id));
});

test('activation manifest semantic presentation IDs match the merged slash resolver and keep dotted asset IDs separate',()=>{
  const semantic=manifest.productionCandidates.semanticPresentationIds;
  const shift=definitions.actions.find((a:any)=>a.id==='lumber.shift');

  const work=shift.scenes.map((scene:any)=>presentationIdForAction(presentationCatalog,'lumber.shift',scene.media));
  assert.deepEqual(work,semantic.work);
  assert.equal(presentationIdForActionResult(presentationCatalog,'lumber.shift',shift.scenes[0].media),semantic.workResult);

  assert.equal(
    presentationIdForEvent(presentationCatalog,manifest.productionCandidates.events.milestone,'default'),
    semantic.milestone
  );
  assert.equal(
    presentationIdForEvent(presentationCatalog,manifest.productionCandidates.events.foreman,'default'),
    semantic.foreman
  );
  assert.equal(
    presentationIdForEvent(presentationCatalog,manifest.productionCandidates.events.activityReturn,'default'),
    semantic.activityReturn
  );
  assert.equal(
    presentationIdForEvent(presentationCatalog,manifest.productionCandidates.events.night,'default'),
    semantic.night
  );

  assert.deepEqual(
    manifest.productionCandidates.endings.map((id:string)=>presentationIdForEnding(id)),
    semantic.endings
  );

  const candidateSemanticIds=[
    ...semantic.work,
    semantic.workResult,
    semantic.milestone,
    semantic.foreman,
    semantic.activityReturn,
    semantic.night,
    ...semantic.endings
  ];
  assert.ok(candidateSemanticIds.every((id:string)=>id.includes('/')));
  assert.ok(candidateSemanticIds.every((id:string)=>!media.some((m:any)=>m.id===id)));
  assert.ok(media.some((m:any)=>m.id==='job.lumber.event.accepted-hand'));
  assert.ok(media.some((m:any)=>m.id==='relationship.lumber.foreman.professional'));
});

test('activation manifest locks the A5 return boundary to exact activityResult success result',()=>{
  assert.deepEqual(manifest.lockedContracts.activityReturn,{
    boundaryKind:'activityResult',
    activityId:'lumber.forest',
    successResultId:'lumber.forest.success'
  });

  const returnEvent=events.find((e:any)=>e.id===manifest.productionCandidates.events.activityReturn);
  assert.ok(returnEvent);
  assert.deepEqual(returnEvent.reactionTriggers,[
    {kind:'activityResult',activity:'lumber.forest',outcome:'success',result:'lumber.forest.success'}
  ]);
});
