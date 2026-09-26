import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const json=(path:string)=>JSON.parse(readFileSync(path,'utf8'));
const fixture=json('content/presentation-replacement-pr22-compat.fixture.json');
const existingBundle=json('content/presentation-replacement-bundle.fixture.json');
const family=json('content/presentation-forest-route-family.fixture.json');

function canonical(ids:string[]){
  const seen=new Set<string>();
  for(const id of ids){
    if(seen.has(id))throw new Error('duplicate presentationId: '+id);
    seen.add(id);
  }
  return [...ids].sort((a,b)=>a.localeCompare(b));
}

function preflight(
  presentationId:string,
  known:Set<string>
){
  if(!known.has(presentationId))return 'quarantine';
  return 'accept';
}

test('all existing replacement bundle IDs remain valid and unchanged after PR22 family extension',()=>{
  const bundleIds=Object.keys(existingBundle.replacements).sort();
  assert.deepEqual(bundleIds,[...fixture.existingOverrideIds].sort());

  for(const id of fixture.existingOverrideIds){
    assert.ok(existingBundle.replacements[id],id);
    assert.equal(id.startsWith('activity/forest/'),false,id);
  }
});

test('route/challenge family extension does not remap or alias any existing override ID',()=>{
  assert.equal(fixture.policy.newSlotsCannotRemapOldIds,true);
  const oldIds=new Set(fixture.existingOverrideIds);
  for(const row of family.families.filter((x:any)=>x.dimension!=='result')){
    assert.equal(oldIds.has(row.semanticFamily),false,row.semanticFamily);
    assert.ok(fixture.routeFamilies.includes(row.semanticFamily),row.semanticFamily);
  }
});

test('synthetically registered new slot accepts while unknown future slot quarantines',()=>{
  const known=new Set<string>(fixture.existingOverrideIds);
  const registered=fixture.syntheticRegistrationCases.find(
    (row:any)=>row.caseId==='registered-logging-road-test-slot'
  );
  const unknown=fixture.syntheticRegistrationCases.find(
    (row:any)=>row.caseId==='unknown-future-route-slot'
  );
  assert.ok(registered&&unknown);

  known.add(registered.presentationId);
  assert.equal(preflight(registered.presentationId,known),'accept');
  assert.equal(preflight(unknown.presentationId,known),'quarantine');
  assert.equal(unknown.expected,'quarantine');
});

test('adding new route slots never changes stable export ordering of existing IDs',()=>{
  const before=canonical(fixture.existingOverrideIds);
  const registered=fixture.syntheticRegistrationCases.find(
    (row:any)=>row.expected==='accept'
  ).presentationId;
  const after=canonical([...fixture.existingOverrideIds,registered])
    .filter((id:string)=>fixture.existingOverrideIds.includes(id));

  assert.deepEqual(after,before);
  assert.equal(fixture.policy.exportOrdering,'lexicographic-presentationId');
});

test('unknown future family members are not guessed into a known family slot',()=>{
  const unknown=fixture.syntheticRegistrationCases.find(
    (row:any)=>row.caseId==='unknown-future-route-slot'
  );
  const known=new Set<string>(fixture.existingOverrideIds);
  assert.equal(preflight(unknown.presentationId,known),'quarantine');
  assert.equal(fixture.policy.unknownFutureSlots,'quarantine');
});

test('replacement compatibility contract contains no gameplay mutation payload',()=>{
  assert.equal(fixture.policy.gameplayMutationAllowed,false);
  const serialized=JSON.stringify(fixture).toLowerCase();
  for(const forbidden of [
    '"conditions"','"effects"','"energy"','"money"',
    '"inventory"','"rng"','"reward"','"transition"'
  ]){
    assert.equal(serialized.includes(forbidden),false,forbidden);
  }
});
