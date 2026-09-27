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

function assertRuntimeSlot(presentationId:string,slot:any){
  assert.ok(typeof presentationId==='string'&&presentationId.length>0);
  assert.equal(localeToken.test(presentationId),false,presentationId);

  assert.ok(slot&&typeof slot==='object');
  assert.ok(slot.pool&&typeof slot.pool==='object',presentationId);
  assert.ok(Number.isInteger(slot.pool.version),presentationId);
  assert.ok(slot.pool.version>=1&&slot.pool.version<=1000,presentationId);
  assert.ok(['ordered','unordered'].includes(slot.pool.ordering),presentationId);
  assert.ok(['unweighted','weighted'].includes(slot.pool.selectionPolicy),presentationId);

  const candidates=slot.pool.candidates;
  assert.ok(Array.isArray(candidates),presentationId);
  assert.ok(candidates.length>=3&&candidates.length<=5,presentationId);

  const keys=new Set<string>();
  for(const candidate of candidates){
    assert.equal(candidate.kind,'gif');
    assert.ok(typeof candidate.key==='string'&&candidate.key.length>0);
    assert.equal(keys.has(candidate.key),false,candidate.key);
    keys.add(candidate.key);
    assert.equal(localeToken.test(candidate.key),false,candidate.key);

    assert.ok(
      /^assets\/[a-zA-Z0-9/_-]+\.gif$/.test(candidate.src)
      || /^data:image\/gif;base64,[A-Za-z0-9+/]+={0,2}$/.test(candidate.src),
      candidate.src
    );
    assert.equal(localeToken.test(candidate.src),false,candidate.src);
    assert.ok(typeof candidate.alt==='string'&&candidate.alt.length>0,candidate.key);

    if(candidate.weight!==undefined){
      assert.ok(Number.isFinite(candidate.weight)&&candidate.weight>0,candidate.key);
    }
  }

  assert.ok(slot.static&&typeof slot.static==='object',presentationId);
  assert.equal(slot.static.kind,'image');
  assert.ok(
    /^assets\/[a-zA-Z0-9/_-]+\.(svg|png|jpg|jpeg|webp)$/.test(slot.static.src)
    || /^data:image\/(png|jpeg|webp);base64,[A-Za-z0-9+/]+={0,2}$/.test(slot.static.src),
    slot.static.src
  );
  assert.ok(typeof slot.static.alt==='string'&&slot.static.alt.length>0,presentationId);
  assert.equal('primary' in slot,false,'pool staging slot must not also define primary');
}

function assertLocalizationCoverage(localization:any,keys:string[]){
  assert.ok(localization&&typeof localization==='object');
  const candidates=localization.candidates;
  assert.ok(Array.isArray(candidates));
  const byKey=new Map(candidates.map((x:any)=>[x.candidateKey,x]));
  for(const key of keys){
    const row=byKey.get(key) as any;
    assert.ok(row,'missing localization reference for '+key);
    assert.ok(typeof row.altLocalizationKey==='string'&&row.altLocalizationKey.length>0,key);
    assert.deepEqual([...row.requiredLocales].sort(),['en','ru']);
    assert.equal(localeToken.test(row.altLocalizationKey),false,row.altLocalizationKey);
  }
}

function walk(value:any,visit:(key:string,value:any)=>void){
  if(Array.isArray(value)){
    for(const item of value)walk(item,visit);
    return;
  }
  if(!value||typeof value!=='object')return;
  for(const [key,child] of Object.entries(value)){
    visit(key,child);
    walk(child,visit);
  }
}

test('item 144 representative patch matches PR42 pool constraints',()=>{
  assert.equal(representative.runtimeSchemaAuthority,'PR42');
  assert.equal(representative.presentationPatch.version,1);
  assert.deepEqual(representative.presentationPatch.texts,{});
  assert.deepEqual(representative.presentationPatch.media,{});

  for(const [presentationId,slot] of Object.entries(representative.presentationPatch.slots)){
    assertRuntimeSlot(presentationId,slot);
    const pool=(slot as any).pool;
    const payload=representative.localizationPayloads[presentationId];
    assert.ok(payload,presentationId);
    assert.ok(payload.caption?.ru&&payload.caption?.en,presentationId);
    assert.ok(payload.staticAlt?.ru&&payload.staticAlt?.en,presentationId);
    for(const candidate of pool.candidates){
      assert.ok(payload.candidateAlt[candidate.key]?.ru,candidate.key);
      assert.ok(payload.candidateAlt[candidate.key]?.en,candidate.key);
    }
  }
});

test('items 145-147 all use 3..5 unique locale-neutral candidates with static fallback',()=>{
  for(const manifest of [careers,poverty,school]){
    assert.equal(manifest.runtimeSchemaAuthority,'PR42');
    for(const entry of manifest.entries){
      assertRuntimeSlot(entry.presentationId,entry.runtimeSlot);
      const keys=entry.runtimeSlot.pool.candidates.map((x:any)=>x.key);
      assertLocalizationCoverage(entry.localization,keys);
    }
  }
});

test('staged placeholder paths are explicitly marked and never counted as shipped assets',()=>{
  for(const asset of representative.stagingAssets){
    assert.equal(asset.status,'PLACEHOLDER');
    assert.equal(asset.shipped,false);
    assert.ok(asset.src.startsWith('assets/staging/non-shipped/'));
  }

  for(const manifest of [careers,poverty,school]){
    for(const entry of manifest.entries){
      assert.equal(entry.coverageStatus,'PLACEHOLDER');
      for(const candidate of entry.runtimeSlot.pool.candidates){
        assert.ok(candidate.src.startsWith('assets/staging/non-shipped/'),candidate.src);
      }
    }
  }

  assert.equal(careers.currentMainGifInventory.realGifFiles,0);
  assert.equal(poverty.currentMainGifInventory.realGifFiles,0);
  assert.equal(school.currentMainGifInventory.realGifFiles,0);
});

test('all candidate localization declarations require both RU and EN',()=>{
  for(const manifest of [careers,poverty,school]){
    for(const entry of manifest.entries){
      for(const candidate of entry.localization.candidates){
        assert.deepEqual([...candidate.requiredLocales].sort(),['en','ru']);
        assert.ok(candidate.altLocalizationKey.length>0);
      }
    }
  }
});

test('all staging manifests keep gameplay conditions/effects/rewards out of presentation pools',()=>{
  const forbidden=new Set([
    'conditions','entryConditions','effects','reward','rewards',
    'eligibility','writeFacts','statEffects','energyDelta','moneyDelta',
    'rngState','cooldownDays','maxShows'
  ]);
  const seen:string[]=[];

  for(const manifest of [representative,careers,poverty,school]){
    walk(manifest,(key)=>{
      if(forbidden.has(key))seen.push(key);
    });
  }

  assert.deepEqual(seen,[]);
});

test('poverty manifest explicitly keeps media selection independent from gameplay outcome',()=>{
  assert.equal(poverty.invariants.mediaSelectionChangesGameplayOutcome,false);
  assert.equal(poverty.invariants.mediaSelectionChangesChoice,false);
  assert.equal(poverty.invariants.mediaSelectionChangesEffects,false);
  assert.equal(poverty.invariants.secretDebtIncluded,false);

  for(const entry of poverty.entries){
    assert.equal(entry.mediaSelectionMayChangeOutcome,false);
  }
});

test('School manifest keeps teacher/course-specific routing staged',()=>{
  assert.equal(school.stagedCourseSpecificPolicy.status,'STAGED');
  assert.equal(school.invariants.teacherRoutingInvented,false);
  assert.equal(school.invariants.courseRoutingInvented,false);
  for(const teacher of school.stagedTeacherLibraries){
    assert.equal(teacher.status,'STAGED');
    assert.equal(teacher.runtimePoolIncluded,false);
  }
});

test('ten-career adoption manifest invents no Hard Work or relationship surfaces',()=>{
  assert.equal(careers.invariants.hardWorkSurfacesInvented,false);
  assert.equal(careers.invariants.relationshipSurfacesInvented,false);
  assert.equal(careers.summary.careers,10);
  assert.equal(careers.summary.totalPools,50);
});
