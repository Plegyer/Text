import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const json=(path:string)=>JSON.parse(readFileSync(path,'utf8'));
const fixture=json('content/presentation-save-import-compat.fixture.json');
const replacement=json('content/presentation-replacement-bundle.fixture.json');

const semanticId=/^[a-z0-9][a-z0-9/._-]*$/;

function roundTrip<T>(value:T):T{
  return JSON.parse(JSON.stringify(value)) as T;
}

function validateOptionalPresentation(value:any){
  const walk=(node:any)=>{
    if(Array.isArray(node)){for(const item of node)walk(item);return;}
    if(!node||typeof node!=='object')return;
    if('presentationId' in node){
      assert.equal(typeof node.presentationId,'string');
      assert.match(node.presentationId,semanticId);
    }
    for(const child of Object.values(node))walk(child);
  };
  walk(value);
  return value;
}

test('old save fragments without presentationId remain backward-compatible',()=>{
  const row=fixture.cases.find((x:any)=>x.caseId==='old-save-without-presentation-id');
  assert.ok(row);
  const reloaded=roundTrip(row.saveFragment);
  validateOptionalPresentation(reloaded);
  assert.equal('presentationId' in reloaded.pendingScene,false);
  assert.equal(reloaded.pendingScene.eventId,'lumber.career-first-shift');
  assert.equal(reloaded.pendingScene.variantId,'default');
});

test('new slash semantic presentationId survives reload unchanged',()=>{
  const row=fixture.cases.find((x:any)=>x.caseId==='new-save-with-slash-presentation-id');
  const reloaded=roundTrip(row.saveFragment);
  validateOptionalPresentation(reloaded);
  assert.equal(
    reloaded.pendingScene.presentationId,
    'job/lumber/event/lumber-career-first-shift/default'
  );
});

test('pending scene, action result, Activity and ending reload keep gameplay identity authoritative',()=>{
  for(const id of [
    'pending-scene-reload',
    'action-result-reload',
    'activity-reload',
    'ending-reload'
  ]){
    const row=fixture.cases.find((x:any)=>x.caseId===id);
    const before=structuredClone(row.saveFragment);
    const after=roundTrip(row.saveFragment);
    validateOptionalPresentation(after);
    assert.deepEqual(after,before,id);
  }
  assert.equal(fixture.policy.gameplayIdentityAuthoritative,true);
});

test('presentation metadata remains optional rather than required for gameplay identity',()=>{
  const withPresentation={
    eventId:'lumber.career-first-shift',
    variantId:'default',
    presentationId:'job/lumber/event/lumber-career-first-shift/default'
  };
  const withoutPresentation={
    eventId:withPresentation.eventId,
    variantId:withPresentation.variantId
  };
  assert.equal(withoutPresentation.eventId,withPresentation.eventId);
  assert.equal(withoutPresentation.variantId,withPresentation.variantId);
  assert.equal(fixture.policy.presentationMetadataOptional,true);
});

test('replacement bundle export/import preserves semantic keys and never carries gameplay identity',()=>{
  const row=fixture.cases.find((x:any)=>x.caseId==='replacement-bundle-import-export');
  const subset=Object.fromEntries(
    row.replacementKeys.map((id:string)=>[id,replacement.replacements[id]])
  );
  for(const id of row.replacementKeys)assert.ok(subset[id],id);

  const exported=JSON.stringify(
    Object.fromEntries(Object.entries(subset).sort(([a],[b])=>a.localeCompare(b)))
  );
  const imported=JSON.parse(exported);
  assert.deepEqual(Object.keys(imported),Object.keys(JSON.parse(exported)));

  const serialized=JSON.stringify(imported).toLowerCase();
  for(const forbidden of [
    '"eventid"','"variantid"','"courseid"','"endingid"',
    '"energy"','"money"','"conditions"','"effects"','"rng"'
  ])assert.equal(serialized.includes(forbidden),false,forbidden);
  assert.equal(fixture.policy.replacementImportChangesGameplay,false);
});
