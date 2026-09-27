import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const representative=JSON.parse(
  readFileSync('content/presentation-drafts/multi-gif-production-patch-v1.json','utf8')
);
const careers=JSON.parse(
  readFileSync('content/presentation-drafts/ten-career-pool-adoption-v2.json','utf8')
);
const poverty=JSON.parse(
  readFileSync('content/presentation-drafts/poverty-pool-adoption-v2.json','utf8')
);
const school=JSON.parse(
  readFileSync('content/presentation-drafts/school-reachable-pool-adoption-v2.json','utf8')
);

const localeToken=/(^|[\/._-])(ru|en)(?=[\/._-]|$)/;

function nonEmpty(value:unknown){
  return typeof value==='string'&&value.trim().length>0;
}

function assertPoolShape(presentationId:string,slot:any){
  assert.equal(localeToken.test(presentationId),false,presentationId);
  assert.ok(slot?.pool,presentationId);
  assert.ok(slot.pool.candidates.length>=3&&slot.pool.candidates.length<=5,presentationId);

  const keys=new Set<string>();
  for(const candidate of slot.pool.candidates){
    assert.ok(nonEmpty(candidate.key),presentationId);
    assert.equal(keys.has(candidate.key),false,candidate.key);
    keys.add(candidate.key);
    assert.equal(candidate.kind,'gif');
    assert.ok(nonEmpty(candidate.src),candidate.key);
    assert.equal(localeToken.test(candidate.key),false,candidate.key);
    assert.equal(localeToken.test(candidate.src),false,candidate.src);
  }

  assert.equal(slot.static?.kind,'image',presentationId);
  assert.ok(nonEmpty(slot.static?.src),presentationId);
}

test('item 144 representative runtimePatch has valid bounded pools and static fallback',()=>{
  for(const [presentationId,slot] of Object.entries(representative.runtimePatch.slots)){
    assertPoolShape(presentationId,slot);
  }
});

test('item 144 candidate localization payloads provide RU+EN alt and explicit PLACEHOLDER status',()=>{
  for(const [presentationId,slot] of Object.entries(representative.runtimePatch.slots) as [string,any][]){
    const loc=representative.localizationPayloads[presentationId];
    assert.ok(loc,presentationId);
    assert.ok(nonEmpty(loc.caption?.ru),presentationId);
    assert.ok(nonEmpty(loc.caption?.en),presentationId);

    for(const candidate of slot.pool.candidates){
      const alt=loc.candidateAlt.find((x:any)=>x.candidateKey===candidate.key);
      assert.ok(alt,candidate.key);
      assert.ok(nonEmpty(alt.value?.ru),candidate.key);
      assert.ok(nonEmpty(alt.value?.en),candidate.key);

      const status=representative.assetStatus[presentationId]
        .find((x:any)=>x.candidateKey===candidate.key);
      assert.equal(status?.status,'PLACEHOLDER',candidate.key);
      assert.ok(status.src.includes('/staging/non-shipped/'));
    }
  }
});

test('item 145 ten-career pools have unique keys, bilingual alt and explicit placeholder coverage',()=>{
  assert.equal(careers.entries.length,40);
  for(const entry of careers.entries){
    assertPoolShape(entry.presentationId,entry.runtimeSlot);
    assert.equal(entry.coverageStatus,'PLACEHOLDER',entry.presentationId);
    assert.ok(nonEmpty(entry.staticFallback),entry.presentationId);

    const keys=new Set<string>();
    for(const candidate of entry.candidates){
      assert.equal(keys.has(candidate.key),false,candidate.key);
      keys.add(candidate.key);
      assert.ok(nonEmpty(candidate.alt?.ru),candidate.key);
      assert.ok(nonEmpty(candidate.alt?.en),candidate.key);
      assert.equal(candidate.altLocalizationKeys.ru,candidate.altLocalizationKeys.en);
      assert.ok(candidate.src.includes('/staging/non-shipped/'));
    }
  }
});

test('item 146 poverty pools keep presentation shape separate from gameplay outcomes',()=>{
  assert.equal(poverty.entries.length,10);
  for(const entry of poverty.entries){
    assertPoolShape(entry.presentationId,entry.runtimeSlot);
    assert.equal(entry.gameplayOutcomePolicy,'FIXED_OUTSIDE_PRESENTATION');
    assert.ok(nonEmpty(entry.sourceIdentity.eventId));
    assert.ok(nonEmpty(entry.sourceIdentity.variantId));

    for(const candidate of entry.candidates){
      assert.equal(candidate.coverageStatus,'PLACEHOLDER');
      assert.ok(nonEmpty(candidate.alt?.ru),candidate.key);
      assert.ok(nonEmpty(candidate.alt?.en),candidate.key);
      assert.equal(candidate.altLocalizationKeys.ru,candidate.altLocalizationKeys.en);
      assert.ok(candidate.src.includes('/staging/non-shipped/'));
    }
  }
});

test('item 147 only reachable School entries own pools; teacher/course libraries stay STAGED',()=>{
  assert.equal(school.reachableEntries.length,3);
  for(const entry of school.reachableEntries){
    assert.equal(entry.reachability,'REACHABLE_NOW');
    assertPoolShape(entry.presentationId,entry.runtimeSlot);
    for(const candidate of entry.candidates){
      assert.equal(candidate.coverageStatus,'PLACEHOLDER');
      assert.ok(nonEmpty(candidate.alt?.ru),candidate.key);
      assert.ok(nonEmpty(candidate.alt?.en),candidate.key);
      assert.ok(candidate.src.includes('/staging/non-shipped/'));
    }
  }

  assert.ok(school.stagedEntries.length>0);
  for(const entry of school.stagedEntries){
    assert.equal(entry.status,'STAGED');
    assert.equal('runtimeSlot' in entry,false);
  }
});

test('all staging manifests are free of gameplay conditions/effects/rewards',()=>{
  const forbidden=new Set([
    'conditions','effects','reward','rewards','eligibility',
    'energyDelta','statEffects','rngState','cooldownDays',
    'maxShows','entryConditions'
  ]);
  const seen:string[]=[];

  const visit=(value:any)=>{
    if(Array.isArray(value)){for(const item of value)visit(item);return;}
    if(!value||typeof value!=='object')return;
    for(const [key,child] of Object.entries(value)){
      if(forbidden.has(key))seen.push(key);
      visit(child);
    }
  };

  for(const manifest of [representative,careers,poverty,school])visit(manifest);
  assert.deepEqual(seen,[]);
});

test('placeholder assets are never marked as real shipped GIFs',()=>{
  assert.equal(representative.policy.placeholderPathsCountAsShipped,false);
  assert.equal(careers.policy.placeholderPathsCountAsRealAssets,false);
  assert.equal(poverty.policy.placeholderPathsCountAsRealAssets,false);
  assert.equal(school.policy.placeholderPathsCountAsRealAssets,false);

  const allPaths:string[]=[];
  for(const slot of Object.values(representative.runtimePatch.slots) as any[]){
    allPaths.push(...slot.pool.candidates.map((c:any)=>c.src));
  }
  for(const entry of careers.entries)allPaths.push(...entry.candidates.map((c:any)=>c.src));
  for(const entry of poverty.entries)allPaths.push(...entry.candidates.map((c:any)=>c.src));
  for(const entry of school.reachableEntries)allPaths.push(...entry.candidates.map((c:any)=>c.src));

  assert.ok(allPaths.length>0);
  assert.ok(allPaths.every(src=>src.includes('/staging/non-shipped/')));
});
