import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const matrix=JSON.parse(readFileSync('content/presentation-drafts/assassin-presentation-binding-matrix-v1.json','utf8'));

test('C2-216 Assassin matrix binds only the six shipped presentation identities',()=>{
  assert.equal(matrix.status,'PREP_ONLY_NO_PRODUCTION_FREEZE');
  assert.equal(matrix.rules.productionFreezeAllowed,false);
  assert.equal(matrix.liveBound.length,6);
  assert.deepEqual(
    matrix.liveBound.map((row:any)=>row.presentationId).sort(),
    [
      'ending/assassin/hard-work',
      'job/assassin/result/default',
      'job/assassin/shift/autumn/default',
      'job/assassin/shift/spring/default',
      'job/assassin/shift/summer/default',
      'job/assassin/shift/winter/default'
    ].sort()
  );
  for(const row of matrix.liveBound)assert.equal(row.status,'LIVE_BOUND');
});

test('C2-216 every non-shipped future Assassin identity is PENDING_RUNTIME_ID',()=>{
  assert.ok(matrix.pendingRuntimeIdentities.length>0);
  for(const row of matrix.pendingRuntimeIdentities){
    assert.equal(row.status,'PENDING_RUNTIME_ID',row.family+': '+row.concept);
    assert.equal('runtimeId' in row,false,row.concept+' must not invent runtimeId');
    assert.equal('presentationId' in row,false,row.concept+' must not reserve presentationId');
  }
});

test('C2-216 shipped cross-system inputs do not become Assassin consumers',()=>{
  const inputs=matrix.shippedRuntimeContext.filter((row:any)=>row.kind.endsWith('-input'));
  assert.deepEqual(
    inputs.map((row:any)=>row.runtimeId).sort(),
    ['guard:cargo-pass-evidence','merchant:delivery-recorded','tavern:rumour-confirmed'].sort()
  );
  for(const row of inputs){
    assert.equal(row.status,'SHIPPED_INPUT_ONLY_NO_ASSASSIN_CONSUMER');
    assert.equal(row.presentationId,null);
  }
});

test('C2-216 forbidden systems remain unbound and Assassin motion is not fabricated',()=>{
  const forbidden=matrix.forbiddenOrUnowned.map((row:any)=>row.concept).join('|');
  assert.match(forbidden,/Palace/);
  assert.match(forbidden,/Morality/);
  assert.match(forbidden,/combat/);
  assert.match(forbidden,/black-market/);
  assert.match(forbidden,/fallout\/reputation\/wanted/);
  for(const row of matrix.forbiddenOrUnowned)assert.equal(row.status,'NO_AUTHORITY_NOT_BINDABLE');

  assert.equal(matrix.media.assassinAnimationSourceSequences,0);
  assert.equal(matrix.media.fabricatedGifPathsAllowed,false);
});
