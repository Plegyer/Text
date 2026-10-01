import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const load=(path:string)=>JSON.parse(readFileSync(path,'utf8'));
const localization=load('content/localization.json').strings as Record<string,{ru:string;en:string}>;
const manifest=load('content/chat3-regression-fixture-coverage-v10.fixture.json');

const sources=manifest.sourceFixtures.map((path:string)=>load(path));
const smallJob=load('content/ordinary-poverty-small-job-identity-boundary-v3.fixture.json');
const handoff=load('content/chat3-selective-integration-handoff-v10.fixture.json');
const voice=load('content/chat3-voice-density-audit-v4.fixture.json');

test('C3-107 source fixture counts match declared coverage',()=>{
  assert.equal(sources.length,manifest.expected.sourceFixtureCount);
  const counts=new Map(sources.map((fixture:any)=>[fixture.id,Object.keys(fixture.strings??{}).length]));

  assert.equal(counts.get('forest.continuity-depth.v5'),manifest.expected.forestContinuityPairs);
  assert.equal(counts.get('forest.aftermath-depth.v5'),manifest.expected.forestAftermathPairs);
  assert.equal(counts.get('ordinary-poverty.continuity-depth.v5'),manifest.expected.povertyContinuityPairs);

  const total=[...counts.values()].reduce((sum:number,value:any)=>sum+Number(value),0);
  assert.equal(total,manifest.expected.authoredLocalizationPairs);
  assert.equal(total,voice.totals.authoredLocalizationPairs);
});

test('C3-107 all authored keys are unique, bilingual and not already in production localization',()=>{
  const seen=new Set<string>();
  let collisions=0;

  for(const fixture of sources){
    for(const [key,pair] of Object.entries(fixture.strings??{}) as any){
      assert.equal(seen.has(key),false,'duplicate key: '+key);
      seen.add(key);
      assert.ok(pair.ru?.trim(),key+' missing ru');
      assert.ok(pair.en?.trim(),key+' missing en');
      if(key in localization)collisions+=1;
    }
  }

  assert.equal(collisions,manifest.expected.rootLocalizationCollisions);
});

test('C3-107 selective integration handoff covers every queue-v10 source family',()=>{
  const handoffSources=[
    ...handoff.forest.map((entry:any)=>entry.sourceFixture),
    ...handoff.ordinaryPoverty.map((entry:any)=>entry.sourceFixture)
  ];

  assert.ok(handoffSources.includes('content/forest-continuity-depth-v5.fixture.json'));
  assert.ok(handoffSources.includes('content/forest-aftermath-depth-v5.fixture.json'));
  assert.ok(handoffSources.includes('content/ordinary-poverty-continuity-depth-v5.fixture.json'));
  assert.ok(handoffSources.includes('content/ordinary-poverty-small-job-depth-v2.fixture.json'));
});

test('C3-107 small-job safe and ambiguous classifications are fully covered',()=>{
  const safe=smallJob.entries.filter((entry:any)=>entry.classification==='SAFE_SINGLE_VARIANT_RESULT');
  const ambiguous=smallJob.entries.filter((entry:any)=>entry.classification==='PREPARATION_ONLY_AMBIGUOUS_RESULT');

  assert.equal(safe.length,manifest.expected.smallJobSafeCount);
  assert.equal(ambiguous.length,manifest.expected.smallJobAmbiguousCount);
  assert.equal(safe.length+ambiguous.length,smallJob.entries.length);

  assert.deepEqual(
    handoff.ordinaryPoverty.find((entry:any)=>entry.boundaryAudit)?.safeSingleVariantResultIds.sort(),
    safe.map((entry:any)=>entry.sourceId).sort()
  );
  assert.deepEqual(
    handoff.ordinaryPoverty.find((entry:any)=>entry.boundaryAudit)?.preparationOnlyAmbiguousIds.sort(),
    ambiguous.map((entry:any)=>entry.sourceId).sort()
  );
});
