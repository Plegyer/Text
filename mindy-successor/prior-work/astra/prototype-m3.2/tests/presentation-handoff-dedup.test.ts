import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const json=(path:string)=>JSON.parse(readFileSync(path,'utf8'));
const proof=json('content/presentation-handoff-dedup.fixture.json');
const handoff=json('content/presentation-release-candidate-handoff.fixture.json');

const readyPaths=new Set(
  handoff.categories.READY_TO_INTEGRATE_NOW.map((row:any)=>{
    const prefix='mindy-successor/prior-work/astra/prototype-m3.2/';
    return row.path.startsWith(prefix)?row.path.slice(prefix.length):row.path;
  })
);

test('READY_TO_INTEGRATE_NOW artifacts are assigned to one deduplicated contract role',()=>{
  const paths=proof.contracts.flatMap((contract:any)=>contract.paths);
  assert.equal(new Set(paths).size,paths.length);
  const keys=proof.contracts.map((contract:any)=>contract.contractKey);
  assert.equal(new Set(keys).size,keys.length);

  for(const path of paths){
    if(path.startsWith('content/')||path.startsWith('tests/')){
      assert.ok(readyPaths.has(path),path);
    }
  }
});

test('semantic presentation ID contract has exactly one authority',()=>{
  const authorities=proof.contracts.filter(
    (contract:any)=>contract.semanticIdentityRole==='authority'
  );
  assert.equal(authorities.length,proof.policy.semanticIdAuthorityCount);
  assert.equal(authorities.length,1);
  assert.equal(authorities[0].contractKey,'semantic-id-consistency');
});

test('handoff proof carries no stale pre-PR20 or pre-PR21 blocker assumptions',()=>{
  assert.equal(proof.baseline,'post-pr21');
  assert.equal(proof.productAcceptanceStatus,'partial-not-closed');
  const serialized=JSON.stringify(proof);
  for(const stale of [
    'slash-presentationId-blocked',
    'pending-scene-presentationId-missing',
    'product-acceptance-pass'
  ])assert.equal(serialized.includes(stale),false,stale);
});

test('READY integration paths do not claim shared runtime or UI ownership',()=>{
  for(const contract of proof.contracts){
    for(const path of contract.paths){
      assert.equal(path.startsWith('src/'),false,path);
      assert.equal(path.startsWith('app/'),false,path);
      assert.equal(path.includes('/ui/'),false,path);
    }
  }
  assert.equal(proof.policy.runtimeUiOwnershipConflictAllowed,false);
});

test('presentation evidence never upgrades OPEN gameplay authoring to PASS',()=>{
  assert.equal(proof.policy.openGameplayMayBeUpgradedByPresentation,false);
  assert.deepEqual(
    new Set(proof.openGameplayRows),
    new Set([
      'old-boundary-token-acquisition-use',
      'school-management-accounting-public-result',
      'forest-route-challenge-season-depth',
      'item-driven-activity-action-space'
    ])
  );
});
