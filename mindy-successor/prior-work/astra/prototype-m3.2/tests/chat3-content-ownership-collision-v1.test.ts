import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {execFileSync} from 'node:child_process';

const manifest=JSON.parse(
  readFileSync('content/chat3-content-ownership-collision-v1.fixture.json','utf8')
);

const repoPath=(relative:string)=>
  'mindy-successor/prior-work/astra/prototype-m3.2/'+relative;

function git(...args:string[]){
  return execFileSync('git',args,{encoding:'utf8'}).trim();
}

function gitShow(path:string){
  return git('show',manifest.baseMain+':'+path);
}

function sorted(values:string[]){
  return [...values].sort((a,b)=>a.localeCompare(b));
}

test('Chat 3 candidate diff stays inside the content-side allowlist',()=>{
  const changed=git('diff','--name-only',manifest.baseMain+'...HEAD')
    .split('\n')
    .filter(Boolean);

  const allowed=new Set(manifest.allowedChangedPaths);
  const unexpected=changed.filter(path=>!allowed.has(path));
  assert.deepEqual(unexpected,[],'unexpected Chat 3 candidate paths: '+unexpected.join(', '));

  for(const path of changed){
    for(const prefix of manifest.protectedPathPrefixes){
      assert.equal(
        path.startsWith(prefix),
        false,
        'protected ownership prefix changed: '+path
      );
    }
    assert.equal(
      manifest.protectedExactPaths.includes(path),
      false,
      'protected ownership path changed: '+path
    );
  }

  const modifiedProduction=changed.filter(path=>
    path.includes('/content/') &&
    !path.endsWith('.fixture.json') &&
    !path.includes('/tests/')
  );

  for(const path of modifiedProduction){
    assert.ok(
      manifest.allowedModifiedProductionPaths.includes(path),
      'unexpected production content path: '+path
    );
  }
});

test('localization delta is Forest-only and does not touch School or Foreman canon',()=>{
  const path=repoPath('content/localization.json');
  const before=JSON.parse(gitShow(path)).strings;
  const after=JSON.parse(readFileSync('content/localization.json','utf8')).strings;

  const added=Object.keys(after).filter(key=>!(key in before));
  const removed=Object.keys(before).filter(key=>!(key in after));
  const changed=Object.keys(after).filter(
    key=>key in before && JSON.stringify(after[key])!==JSON.stringify(before[key])
  );

  assert.deepEqual(sorted(added),sorted(manifest.localizationDelta.allowedAddedKeys));
  assert.deepEqual(sorted(removed),sorted(manifest.localizationDelta.allowedRemovedKeys));
  assert.deepEqual(sorted(changed),sorted(manifest.localizationDelta.allowedChangedKeys));

  for(const key of [...added,...removed,...changed]){
    for(const prefix of manifest.localizationDelta.forbiddenPrefixes){
      assert.equal(
        key.startsWith(prefix),
        false,
        'forbidden localization ownership changed: '+key
      );
    }
  }
});

test('Forest result refresh changes presentation copy only, not result mechanics',()=>{
  const relative='content/packs/forest-result-content-bilingual-v2.json';
  const path=repoPath(relative);
  const before=JSON.parse(gitShow(path));
  const after=JSON.parse(readFileSync(relative,'utf8'));

  const fields=new Set(manifest.forestResultPack.presentationFieldsAllowedToDiffer);
  const redact=(value:any):any=>{
    if(Array.isArray(value))return value.map(redact);
    if(value&&typeof value==='object'){
      return Object.fromEntries(
        Object.entries(value)
          .filter(([key])=>!fields.has(key))
          .map(([key,item])=>[key,redact(item)])
      );
    }
    return value;
  };

  assert.deepEqual(redact(after),redact(before));

  assert.deepEqual(
    after.events.map((event:any)=>event.id),
    manifest.forestResultPack.requiredEventIds
  );

  const resultIds=after.events.map(
    (event:any)=>event.reactionTriggers[0]?.result
  );
  assert.deepEqual(resultIds,manifest.forestResultPack.requiredActivityResultIds);

  for(const event of after.events){
    assert.deepEqual(event.conditions,[]);
    assert.equal(event.variants.length,1);
    assert.equal(event.variants[0].id,'default');
    assert.equal(event.choices.length,1);
    assert.equal(event.choices[0].id,'return');
    assert.deepEqual(event.choices[0].effects,[]);
  }
});

test('ownership manifest explicitly protects School, media, Save/RNG, Foreman and shared runtime',()=>{
  assert.equal(manifest.assertions.schoolOwnershipUntouched,true);
  assert.equal(manifest.assertions.mediaSourceOwnershipUntouched,true);
  assert.equal(manifest.assertions.saveSchemaUntouched,true);
  assert.equal(manifest.assertions.gameplayRngUntouched,true);
  assert.equal(manifest.assertions.foremanCanonUntouched,true);
  assert.equal(manifest.assertions.sharedRuntimeArchitectureUntouched,true);

  const protectedJoined=[
    ...manifest.protectedPathPrefixes,
    ...manifest.protectedExactPaths
  ].join('\n');

  assert.match(protectedJoined,/\/src\//);
  assert.match(protectedJoined,/\/assets\//);
  assert.match(protectedJoined,/definitions\.json/);
  assert.match(protectedJoined,/presentation\.json/);
  assert.match(protectedJoined,/school/i);
  assert.match(protectedJoined,/lumber-night/i);
});
