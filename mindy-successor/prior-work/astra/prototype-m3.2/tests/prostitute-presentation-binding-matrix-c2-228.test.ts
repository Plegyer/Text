import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const matrix=JSON.parse(readFileSync('content/presentation-drafts/prostitute-presentation-binding-matrix-v1.json','utf8'));

test('C2-228 Prostitute matrix binds only six shipped production presentation identities',()=>{
  assert.equal(matrix.status,'PREP_ONLY_NO_PRODUCTION_FREEZE');
  assert.equal(matrix.rules.productionFreezeAllowed,false);
  assert.equal(matrix.rules.ordinaryWorkIsVoluntary,true);
  assert.equal(matrix.rules.ordinaryWorkInheritsSecretDebtForcedNight,false);
  assert.equal(matrix.rules.adultMediaRequiresExplicitAdultOnlyGate,true);
  assert.equal(matrix.rules.ordinaryDefaultShiftIdsRemainNeutral,true);
  assert.equal(matrix.rules.confidencePresentationEqualsConsent,false);

  assert.equal(matrix.liveBound.length,6);
  assert.deepEqual(
    matrix.liveBound.map((row:any)=>row.presentationId).sort(),
    [
      'ending/prostitute/hard-work',
      'job/prostitute/result/default',
      'job/prostitute/shift/autumn/default',
      'job/prostitute/shift/spring/default',
      'job/prostitute/shift/summer/default',
      'job/prostitute/shift/winter/default'
    ].sort()
  );
  for(const row of matrix.liveBound)assert.equal(row.status,'LIVE_BOUND');
});

test('C2-228 every future Prostitute consumer remains PENDING_RUNTIME_ID with no reserved ids',()=>{
  assert.ok(matrix.pendingRuntimeIdentities.length>0);
  for(const row of matrix.pendingRuntimeIdentities){
    assert.equal(row.status,'PENDING_RUNTIME_ID',row.family+': '+row.concept);
    assert.equal('runtimeId' in row,false,row.concept+' must not invent runtimeId');
    assert.equal('presentationId' in row,false,row.concept+' must not reserve presentationId');
  }
});

test('C2-228 School prep remains unbound and cannot manufacture Prostitute consumers',()=>{
  const school=matrix.shippedRuntimeContext.filter((row:any)=>row.kind==='school-prep');
  assert.deepEqual(
    school.map((row:any)=>row.runtimeId).sort(),
    [
      'school.track.arts_and_performance',
      'school.track.body_confidence',
      'school.track.etiquette_and_presentation',
      'school.track.literacy_and_numbers',
      'school.track.rhetoric_and_social'
    ].sort()
  );
  for(const row of school){
    assert.equal(row.status,'PREP_ONLY_NO_PROSTITUTE_CONSUMER');
    assert.equal(row.presentationId,null);
  }
});

test('C2-228 forbidden assumptions remain unbound and no production adult motion is fabricated',()=>{
  const forbidden=matrix.forbiddenOrUnowned.map((row:any)=>row.concept).join('|');
  assert.match(forbidden,/Secret Debt lock/);
  assert.match(forbidden,/forced Night/);
  assert.match(forbidden,/consent/);
  assert.match(forbidden,/automatic romance/);
  assert.match(forbidden,/reputation\/status/);
  assert.match(forbidden,/Palace access/);
  assert.match(forbidden,/shopping-list filename/);

  for(const row of matrix.forbiddenOrUnowned){
    assert.equal(row.status,'NO_AUTHORITY_NOT_BINDABLE');
  }

  assert.equal(matrix.media.prostituteAnimationSourceSequences,0);
  assert.equal(matrix.media.adultAnimationSourceSequences,0);
  assert.equal(matrix.media.shoppingListIsPlanningOnly,true);
  assert.equal(matrix.media.fabricatedGifPathsAllowed,false);
});
