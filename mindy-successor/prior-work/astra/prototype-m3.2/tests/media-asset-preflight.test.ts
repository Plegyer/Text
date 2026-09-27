import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtemp,writeFile,mkdir,rm} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join} from 'node:path';

import {validateMediaIntakeManifest} from '../tools/media-asset-preflight.mjs';

const gifBytes=Buffer.from(
  'R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==',
  'base64'
);

async function fixtureRoot(){
  const root=await mkdtemp(join(tmpdir(),'media-preflight-'));
  await mkdir(join(root,'assets'),{recursive:true});
  await writeFile(join(root,'assets','fallback.svg'),'<svg xmlns="http://www.w3.org/2000/svg"></svg>');
  return root;
}

async function writeGif(root:string,name:string){
  await writeFile(join(root,'assets',name),gifBytes);
}

function candidate(key:string,src:string){
  return {
    key,
    src,
    kind:'gif',
    altLocalizationKeys:{
      ru:`presentation.test.${key}.alt.ru`,
      en:`presentation.test.${key}.alt.en`
    },
    provenanceSourceNote:'Generated test-only fixture with known GIF bytes.',
    reuseApproval:{
      approved:false,
      semanticIds:['job/lumber/shift/spring/default'],
      note:'Test-only fixture; no production reuse approval.'
    }
  };
}

function manifest(candidates:ReturnType<typeof candidate>[],readiness:'INTAKE_ONLY'|'PRODUCTION_READY'='PRODUCTION_READY'){
  return {
    schemaVersion:1,
    kind:'real-media-intake-manifest',
    status:readiness,
    pools:[{
      presentationId:'job/lumber/shift/spring/default',
      readiness,
      candidates,
      staticFallback:{src:'assets/fallback.svg',kind:'image'}
    }]
  };
}

async function withRoot(run:(root:string)=>Promise<void>){
  const root=await fixtureRoot();
  try{await run(root);}finally{await rm(root,{recursive:true,force:true});}
}

test('media preflight rejects a missing referenced GIF file',async()=>{
  await withRoot(async root=>{
    const result=await validateMediaIntakeManifest(
      manifest([
        candidate('one','assets/missing.gif'),
        candidate('two','assets/missing-two.gif'),
        candidate('three','assets/missing-three.gif')
      ]),
      {rootDir:root}
    );
    assert.equal(result.ok,false);
    assert.ok(result.errors.some(error=>error.includes('does not exist')));
  });
});

test('media preflight rejects external candidate URLs',async()=>{
  await withRoot(async root=>{
    const result=await validateMediaIntakeManifest(
      manifest([
        candidate('one','https://example.invalid/one.gif'),
        candidate('two','https://example.invalid/two.gif'),
        candidate('three','https://example.invalid/three.gif')
      ]),
      {rootDir:root}
    );
    assert.equal(result.ok,false);
    assert.ok(result.errors.some(error=>error.includes('external/scheme URL is forbidden')));
  });
});

test('media preflight rejects a fake .gif extension by file signature',async()=>{
  await withRoot(async root=>{
    await writeFile(join(root,'assets','fake.gif'),'not-a-gif');
    await writeGif(root,'two.gif');
    await writeGif(root,'three.gif');

    const result=await validateMediaIntakeManifest(
      manifest([
        candidate('one','assets/fake.gif'),
        candidate('two','assets/two.gif'),
        candidate('three','assets/three.gif')
      ]),
      {rootDir:root}
    );
    assert.equal(result.ok,false);
    assert.ok(result.errors.some(error=>error.includes('signature is not GIF87a/GIF89a')));
  });
});

test('media preflight rejects duplicate candidate keys within one semantic pool',async()=>{
  await withRoot(async root=>{
    await writeGif(root,'one.gif');
    await writeGif(root,'two.gif');
    await writeGif(root,'three.gif');

    const result=await validateMediaIntakeManifest(
      manifest([
        candidate('same','assets/one.gif'),
        candidate('same','assets/two.gif'),
        candidate('three','assets/three.gif')
      ]),
      {rootDir:root}
    );
    assert.equal(result.ok,false);
    assert.ok(result.errors.some(error=>error.includes('duplicate candidate key same')));
  });
});

test('media preflight rejects a two-candidate production-ready pool',async()=>{
  await withRoot(async root=>{
    await writeGif(root,'one.gif');
    await writeGif(root,'two.gif');

    const result=await validateMediaIntakeManifest(
      manifest([
        candidate('one','assets/one.gif'),
        candidate('two','assets/two.gif')
      ]),
      {rootDir:root}
    );
    assert.equal(result.ok,false);
    assert.ok(result.errors.some(error=>error.includes('must contain 3..5 candidates')));
  });
});

test('media preflight accepts a three-candidate production-ready pool backed by real test fixture files',async()=>{
  await withRoot(async root=>{
    await writeGif(root,'one.gif');
    await writeGif(root,'two.gif');
    await writeGif(root,'three.gif');

    const result=await validateMediaIntakeManifest(
      manifest([
        candidate('one','assets/one.gif'),
        candidate('two','assets/two.gif'),
        candidate('three','assets/three.gif')
      ]),
      {rootDir:root}
    );
    assert.deepEqual(result,{ok:true,errors:[]});
  });
});
