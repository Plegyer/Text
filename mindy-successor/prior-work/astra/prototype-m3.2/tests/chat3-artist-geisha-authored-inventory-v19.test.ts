import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const inventory=JSON.parse(readFileSync('content/artist-geisha-authored-v19-inventory.fixture.json','utf8'));

test('C3-205/C3-216 activation history is exact and frozen authority is recorded',()=>{
  assert.equal(inventory.status,'FROZEN_ARTIST_RUNTIME_AUTHORITY');
  assert.equal(inventory.activation.exactBase,'8067539a606714fad8400ccbba30fd7ccf4a9158');
  assert.deepEqual(inventory.activation.shipped.action,{
    id:'artist-geisha.shift',
    energyCost:1,
    unlock:'Creativity 35 + Manners 25 + Grooming 30 OR Year 3',
    sceneIds:['spring.default','summer.default','autumn.default','winter.default'],
  });
  assert.deepEqual(inventory.activation.shipped.career,{
    id:'artist-geisha',initialStage:'novice',stages:['novice'],transitions:[],
  });
  assert.equal(inventory.activation.shipped.ending.id,'ending.artist-geisha.hard-work');
  assert.equal(inventory.activation.shipped.ending.reward,'artist-geisha.hardwork.compat');
  assert.equal(inventory.activation.shipped.ending.metaRewardId,'hardWork:artist-geisha');
  assert.equal(inventory.activation.shipped.presentationLocalizationKeys.length,12);
  assert.equal(new Set(inventory.activation.shipped.presentationLocalizationKeys).size,12);
  assert.equal(inventory.runtimeAuthority.frozen,true);
  assert.equal(inventory.runtimeAuthority.finalBindingRequiredAt,'C3-216');
  assert.equal(inventory.invariants.finalLiveBindingDeferred,false);
  assert.equal(inventory.invariants.finalLiveBindingComplete,true);
  assert.equal(inventory.runtimeAuthority.observedHead,'955f4accf7e25c42e0384ddb9f76e5612f41dd00');
  assert.equal(inventory.runtimeAuthority.contractBlob,'1cda9f558b8a7c0e0f113904f99ce0acd4b1e791');
});

test('C3-205 School authority remains five existing courses with null producer decisions',()=>{
  assert.deepEqual(inventory.schoolAuthority.courses,[
    'school.course.arts_and_performance',
    'school.course.etiquette_and_presentation',
    'school.course.rhetoric_and_social',
    'school.course.body_confidence',
    'school.course.literacy_and_numbers',
  ]);
  assert.equal(inventory.schoolAuthority.selectedThreshold,null);
  assert.equal(inventory.schoolAuthority.selectedPublicFactId,null);
  assert.deepEqual(inventory.schoolAuthority.forbiddenSpecializedCurriculum,['history','music','dance','craft']);
  for(const hook of inventory.provisionalContract.schoolConsumers){
    assert.equal(hook.threshold,null,hook.course+' threshold');
    assert.equal(hook.producerPublicFact,null,hook.course+' public fact');
  }
});

test('C3-205 provisional runtime namespace stays narrow and non-authoritative',()=>{
  assert.equal(inventory.runtimeAuthority.branch,'chat1/artist-geisha-complete-v16');
  assert.match(inventory.runtimeAuthority.contractBlob,/^[0-9a-f]{40}$/);
  assert.equal(inventory.runtimeAuthority.contractPath,'mindy-successor/docs/tasks/ARTIST_GEISHA_RUNTIME_CONTRACT_v1.json');
  assert.equal(inventory.provisionalContract.relationship.id,'artist-geisha.mentor');
  assert.equal(inventory.provisionalContract.relationship.romanceRequired,false);
  assert.deepEqual(inventory.provisionalContract.publicEndings,['ending.artist-geisha.hard-work']);
  assert.deepEqual(inventory.provisionalContract.routes,['veteran','master-artist','patron-network','court-invitation']);

  const items=inventory.provisionalContract.items;
  assert.deepEqual(items.map((x:any)=>x.id),[
    'artist_formal_attire','artist_performance_kit','artist_invitation_token',
  ]);
  assert.equal(items[0].palaceAccess,false);
  assert.equal(items[1].contestSubsystem,false);
  assert.equal(items[2].palaceAccess,false);

  assert.deepEqual(inventory.provisionalContract.forbiddenFutureDependencies,['assassin','prostitute','palace']);
  for(const open of [
    'finalFantasyFramingOrName','exactArtDisciplines','contestSubsystem','npcIdentities',
    'salaryRetuning','schoolThresholds','schoolProducerPublicFacts','complexEndingIds',
    'genericPatronSystem','palaceAccessFromArtistCareer',
  ]) assert.ok(inventory.provisionalContract.unresolved.includes(open),open);
});

test('C3-205 authored prep owns no runtime mechanics or global systems',()=>{
  assert.equal(inventory.invariants.authoredPrepOnly,true);
  assert.equal(inventory.invariants.createsGameplayIds,false);
  assert.equal(inventory.invariants.changesMechanics,false);
  assert.equal(inventory.invariants.changesSaveOrRng,false);
  assert.equal(inventory.invariants.changesSchoolProducerAuthority,false);
  assert.equal(inventory.invariants.changesEndingEligibilityRewardOrMeta,false);
  assert.equal(inventory.invariants.changesPalaceUnlock,false);
  assert.equal(inventory.invariants.createsContestSubsystem,false);
  assert.equal(inventory.invariants.createsUniversalReputation,false);
  assert.equal(inventory.invariants.createsGenericPatronSystem,false);
});
