import test from 'node:test';
import assert from 'node:assert/strict';
import {existsSync,readFileSync} from 'node:fs';

const pool=JSON.parse(
  readFileSync('content/presentation-drafts/first-real-production-pool-v1.json','utf8')
);

test('blocked first-real pool makes no production GIF pool claim',()=>{
  assert.equal(pool.status,'BLOCKED_BY_REAL_ASSETS');
  assert.equal(pool.productionClaims.realGifCandidates,0);
  assert.equal(pool.productionClaims.realPools,0);
  assert.equal(pool.productionClaims.placeholderCandidates,0);
  assert.deepEqual(pool.presentationPatch.slots,{});
  assert.deepEqual(pool.presentationPatch.media,{});
});

test('blocked first-real pool retains valid current build/static path assumptions',()=>{
  const build=readFileSync('scripts/build.mjs','utf8');
  assert.match(build,/cp\('assets','dist\/assets',\{recursive:true\}\)/);
  assert.equal(existsSync('assets/stage-lumber.svg'),true);

  // No real production pool exists yet, so this test must not fabricate dist
  // GIF assertions from test-only fixtures or planned filenames.
  assert.equal(Object.keys(pool.presentationPatch.slots).length,0);
});
