import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {spawnSync} from 'node:child_process';

import {freshSave,parseSave,dispatch} from '../src/core/engine.ts';
import {loadCatalog} from '../src/core/content.ts';
import {applyPresentation} from '../src/core/presentation.ts';
import {STRONG_META_REGISTRY_VERSION} from '../src/core/strongMeta.ts';
import {catalog,definitions,rawPacks,started} from './helpers.ts';
import {
  reconstructLumberStayPreRunResult,
  reconstructLumberStayWithRunResult,
  reconstructPalaceAccessWithoutLedger
} from './final-historical-reconstruction-v55.ts';

/**
 * Stage 5 final migration closure: 23 REAL executable cases.
 *
 * Every case executes production parseSave/dispatch or named, accepted,
 * executable domain regression tests (spawned against the SAME checkout).
 * The v57 manifest supplies only the frozen names; it is NEVER evidence
 * that an individual migration passed. No production code is patched here.
 *
 * F1-F5 are AUTHORITATIVE RECONSTRUCTIONS, not genuine user saves.
 * The replay harness verifies the chosen accepted test names actually run.
 *
 * Freeze for this source: public schemaVersion=6; contentVersion=0.1.0;
 * Strong Meta registry=strong-meta-v5; Activity campStateVersion=1;
 * Activity optionModelVersion=0/1 and adapter/definitionVersion frozen
 * to each concrete catalog Activity, not inferred from historical fixtures.
 */
const manifest = JSON.parse(readFileSync('tests/fixtures/final-save-migration-golden-v57.json','utf8'));
const originalNames = manifest.cases.map((c:{name:string})=>c.name);
assert.equal(manifest.cases.length,23,'frozen golden manifest length');
assert.equal(new Set(originalNames).size,23,'unique frozen case names');

const clone = <T>(s:T):T => JSON.parse(JSON.stringify(s)) as T;
const roundTrip = (s:ReturnType<typeof freshSave>):ReturnType<typeof freshSave> => parseSave(JSON.stringify(s),catalog);
const title = (number:number):string => {
  const row=manifest.cases[number-1];
  assert.equal(row?.id,`case-${String(number).padStart(2,'0')}`);
  assert.match(row.name,new RegExp(`^case ${String(number).padStart(2,'0')}:`));
  return row.name;
};

/**
 * Adapter to accepted executable adjacency suites: picks EXACT named tests,
 * not broad filename-level or manifest/static checks. A missing/skipped name,
 * nonzero exit, timeout, or TAP failure is a closure failure.
 *
 * Node 22.18.0 test runner executes the actual game engine under this checkout.
 */
type AcceptedSuite={file:string;names:readonly string[]};
function accepted(...suites:AcceptedSuite[]):void {
  for(const {file,names} of suites){
    assert.ok(names.length>0,`empty accepted test selection: ${file}`);
    const escaped=names.map(name=>name.replace(/[.*+?^${}()|[\]\\]/g,'\\$&'));
    const pattern=`^(?:${escaped.join('|')})$`;
    const result=spawnSync(process.execPath,[
      '--experimental-strip-types','--test',`--test-name-pattern=${pattern}`,`tests/${file}`
    ],{
      encoding:'utf8',
      timeout:120_000,
      maxBuffer:16*1024*1024,
      cwd:process.cwd(),
      windowsHide:true
    });
    const output=`${result.stdout??''}\n${result.stderr??''}`;
    assert.equal(result.error,undefined,`${file}: spawn failed: ${String(result.error)}`);
    assert.equal(result.status,0,`${file}: executable accepted tests failed:\n${output.slice(-10000)}`);
    const passed=Number(output.match(/# pass\s+(\d+)/)?.[1]??0);
    const failed=Number(output.match(/# fail\s+(\d+)/)?.[1]??-1);
    assert.equal(failed,0,`${file}: TAP failure: ${output.slice(-5000)}`);
    assert.ok(passed>=names.length,`${file}: expected ${names.length} actually run, got ${passed}:\n${output.slice(-8000)}`);
    for(const name of names){
      assert.ok(output.includes(` - ${name}\n`)||output.includes(` - ${name}\r\n`),
        `${file}: expected named test not emitted: ${name}`);
    }
  }
}
const suite=(file:string,...names:string[]):AcceptedSuite=>({file,names});
const activity = () => catalog.definitions.activities.find(a=>a.id==='lumber.forest')!;

test(title(1),()=>{
  const f1=JSON.parse(readFileSync('tests/fixtures/final-historical/f1-schema1-reconstructed.json','utf8'));
  assert.equal(f1.schemaVersion,1);
  assert.equal(Object.hasOwn(f1.run,'actionCounts'),false);
  assert.equal(Object.hasOwn(f1.run,'creation'),false);
  assert.equal(Object.hasOwn(f1.run.metrics,'lust'),false);
  const migrated=parseSave(JSON.stringify(f1),catalog);
  assert.equal(migrated.schemaVersion,6);
  assert.equal(migrated.contentVersion,definitions.version);
  assert.equal(STRONG_META_REGISTRY_VERSION,'strong-meta-v5');
  assert.equal(migrated.run.pending?.eventId,f1.run.pending.eventId);
  assert.deepEqual(roundTrip(migrated),migrated);
  accepted(suite('migration.test.ts','genuine M2 save migrates through v3 into schema6 without losing pending scene/meta'));
});

test(title(2),()=>{
  accepted(suite('ending-meta.test.ts',
    'pre-A6 ended schema4 save migrates to v6 with compatibility RunResult and no reward duplication',
    'completeEnding creates one RunResult and applies reward exactly once',
    'reload before completion applies reward once; reload after completion cannot duplicate it'));
});

test(title(3),()=>{
  accepted(suite('strong-meta-engine-integration-v7.test.ts',
    'schema-5 migration creates empty typed state and never infers ownership from generic legacy scaffolding',
    'save/reload preserves current-run snapshot and counters even if future preference changes',
    'protected Meta import unions only permanent strong ownership/knowledge and preserves current preference',
    'completed schema-5 life gets baseline compatibility snapshot without inventing cap-200 ownership'));
});

test(title(4),()=>{
  accepted(suite('d40-advanced-endings-tranche-b-v11.test.ts',
    'parseSave repairs selected-route fact only from an unambiguous advanced stage',
    'selected-route fact survives ordinary save/reload unchanged',
    'route-ready facts alone cannot make a D40 ending eligible'));
});

test(title(5),()=>{
  accepted(suite('advanced-endings-tranche-a-v11.test.ts',
    'D41 migration is idempotent, retires Tavern legacy and House Power +600, and preserves D23',
    'completed legacy Tavern saves migrate canonically; uncompleted eligibility is retired',
    'D41 Specialists bind exact IDs into canonical Strong Meta and normal capacity'));
});

test(title(6),()=>{
  const source=freshSave();
  const f4=reconstructLumberStayWithRunResult(source);
  const kept=parseSave(JSON.stringify(f4),catalog);
  assert.deepEqual(kept.run.endings.result?.transactionId,'tx.legacy.lumber-stay');
  assert.deepEqual(roundTrip(kept),kept);
  const f5=reconstructLumberStayPreRunResult(source);
  const repaired=parseSave(JSON.stringify(f5),catalog);
  assert.equal(repaired.run.status,'ended');
  assert.ok(repaired.run.endings.result?.transactionId);
  assert.deepEqual(roundTrip(repaired),repaired);
  accepted(suite('lumber-stay-retirement-v17.test.ts',
    'existing historical RunResult and transaction proof are preserved exactly',
    'ended pre-RunResult lumber-stay gets deterministic compatibility proof without reward replay',
    'vitality-only evidence preserves benefit without fabricating completion; no evidence grants nothing',
    'live ordinary-career surface is exactly canonical 40 and has no lumber-stay/vitality acquisition'.replace('live ordinary','v17 live ordinary')));
});

test(title(7),()=>{
  accepted(suite('night-flow.test.ts',
    'before-lodging forced event can replace lodging and voluntary menu without charging rent',
    'normal paid night charges exactly once and survives reload after payment',
    'post-lodging forced event happens after one payment and reload does not charge again',
    'probabilistic pending forced night survives reload without reroll',
    'NightFlow advances calendar exactly once and blocks daytime actions while active',
    'invalid persisted night references and impossible phase state are rejected'));
});

test(title(8),()=>{
  accepted(suite('secret-debt-full-route-v12.test.ts',
    'schema-v5 saves from before Secret Debt runtime migrate by default to a clean unseen route state',
    'refusal closes the lender route for the current life and high Sexuality/Lust never remove refusal',
    'trap activates exactly ten calendar days after acceptance and creates exactly 20000 debt'));
});

test(title(9),()=>{
  accepted(
    suite('secret-debt-full-route-v12.test.ts',
      'accept grants exactly +2000 once and survives reload without duplication',
      'trap activates exactly ten calendar days after acceptance and creates exactly 20000 debt'),
    suite('secret-debt-activity-energy-compat-v20.test.ts',
      'T7 acceptance-to-trap activation morning gets Street -1 only and no retroactive forced-Night penalty')
  );
});

test(title(10),()=>{
  accepted(
    suite('secret-debt-full-route-v12.test.ts',
      'forced Secret Debt Night owns every bound night and applies next-day Energy -1 exactly once across reload'),
    suite('secret-debt-activity-energy-compat-v20.test.ts',
      'T4 reload before forced-Night choice preserves exactly-once bound and Street provenance',
      'T5 reload after forced-Night choice preserves queued -1 and Street adds its modifier exactly once',
      'T8 second Street morning after trap activation is a real bound Night and receives the D51 pair floor')
  );
});

test(title(11),()=>{
  accepted(suite('secret-debt-activity-energy-compat-v20.test.ts',
    'T3 D51 bound + Street processes both penalties, preserves Grooming loss, and floors the pair at 2',
    'T9 Meta +1 diagnostic does not turn D51 into a grant: base 4 with the locked pair still resolves to 2',
    'T11 unrelated third -1 applies after D51 pair floor and may reduce usable Energy below 2',
    'D51 provenance is explicit and locked values remain unchanged'));
});

test(title(12),()=>{
  accepted(suite('secret-debt-full-route-v12.test.ts',
    'hidden work spends one Energy, uses pre-shift wage, gains Endurance/Sexuality and never gains Lust',
    'repayment is full-only, explicit, clears bound state and does not auto-commit the Paid Freedom ending',
    'Bound Life is ineligible at 49 and eligible at exactly 50 without auto-commit',
    'explicit Takeover action resolves route, exposes ending and never auto-commits it',
    'Secret Debt ending rewards bind exact D30/D32 ownership IDs and standard transaction ledger grants once',
    'stale Bound Life eligibility cannot be committed after explicit repayment or Takeover changes the route outcome'));
});

test(title(13),()=>{
  const source=started();
  source.run.progression.worldFacts.push('palace.access-granted');
  const f3=reconstructPalaceAccessWithoutLedger(source);
  assert.ok(f3.run.progression.worldFacts.includes('palace.access-granted'));
  assert.equal(Object.hasOwn(f3.run.progression,'palace'),false);
  const restored=parseSave(JSON.stringify(f3),catalog);
  assert.equal(restored.run.progression.worldFacts.includes('palace.access-granted'),true);
  assert.equal(restored.run.progression.palace.counters.duties,0);
  assert.deepEqual(restored.run.progression.palace.committedDutyIds,[]);
  assert.deepEqual(roundTrip(restored),restored);
  accepted(suite('palace-rich6-runtime-v15.test.ts',
    'schema-5 save without typed Palace state defaults safely without retroactive progress'));
});

test(title(14),()=>{
  // Negative migration test, not a static policy assertion.
  // Ambiguous historical complete fact is NOT evidence of 15 committed duties.
  const original=started();
  original.run.progression.worldFacts.push('palace.access-granted','palace.progression-complete');
  const raw=clone(original);
  delete (raw.run.progression as any).palace;
  const source=JSON.stringify(raw);
  assert.throws(()=>parseSave(source,catalog),/Palace progression-complete mismatch|Palace|progression/);
  assert.equal(JSON.stringify(raw),source,'reject cannot mutate source fixture');
  assert.equal(raw.run.progression.worldFacts.includes('palace.progression-complete'),true);
  accepted(suite('palace-rich6-runtime-v15.test.ts',
    'Palace progression invariants reject duplicate or skipped duty saves'));
});

test(title(15),()=>{
  accepted(suite('palace-prince-narrative-producer-v18.test.ts',
    'v18 Prince attempt is deterministic, reload-safe, failure-safe and retryable the same day',
    'v18 four-phase success writes Prince defeat exactly once and never auto-commits Return Home',
    'v18 confrontation availability is 12x91, ignores Lust and requires Outcome Ready'));
});

test(title(16),()=>{
  accepted(
    suite('qa-activity-option-reload.test.ts',
      'selected route and one-shot option identity survive parseSave reload exactly',
      'legacy advance and escape remain usable after authored route selection'),
    suite('qa-exactly-once-reload.test.ts',
      'Activity success remains exactly once across post-result reload checkpoints')
  );
});

test(title(17),()=>{
  const f2=JSON.parse(readFileSync('tests/fixtures/final-historical/f2-pre-field-time-activity-envelope-reconstructed.json','utf8'));
  assert.equal(f2.activityId,'lumber.forest');
  assert.equal(f2.adapter,'counter.v1');
  assert.equal(Object.hasOwn(f2,'fieldTimeRemaining'),false);
  assert.equal(Object.hasOwn(f2,'miniGames'),false);
  const entered=dispatch(started(),{type:'enterActivity',id:activity().id},catalog);
  const before=JSON.parse(JSON.stringify(entered));
  assert.equal(before.run.flow.activity.activityId,'lumber.forest');
  delete before.run.flow.activity.internalState.fieldTimeRemaining;
  delete before.run.flow.activity.internalState.miniGames;
  const migrated=parseSave(JSON.stringify(before),catalog);
  assert.equal(migrated.run.flow.activity?.activityId,'lumber.forest');
  assert.equal(migrated.run.flow.activity?.entryEnergyCommitted,true);
  assert.equal(migrated.run.dayState.energyCurrent,entered.run.dayState.energyCurrent);
  assert.equal(migrated.run.flow.activity?.internalState.fieldTimeRemaining,activity().adapterConfig.fieldTimeSegments);
  assert.deepEqual(migrated.run.flow.activity?.internalState.miniGames,{});
  assert.deepEqual(roundTrip(migrated),migrated);
  accepted(suite('qa-activity-option-reload.test.ts',
    'selected route and one-shot option identity survive parseSave reload exactly'));
});

test(title(18),()=>{
  accepted(suite('activity-camp-persistence-v17.test.ts',
    'Camp state is typed, neutral for old active saves, and Activity entry still costs exactly 2 Energy',
    'Camp is unavailable to same-day Activity and incompatible persisted Camp/calendar states fail explicitly',
    'Camp choice persists before calendar advance and reload does not infer or duplicate boundary state'));
});

test(title(19),()=>{
  accepted(suite('activity-camp-persistence-v17.test.ts',
    'Camp calendar advance and Field Time refresh each commit exactly once across reload',
    'ordinary Camp replaces city Night, charges no lodging, refreshes no global Energy, and stops after two nights'));
});

test(title(20),()=>{
  accepted(
    suite('activity-camp-persistence-v17.test.ts',
      'Secret-Debt-shaped forced Night preempts Camp, terminates Activity continuation, pays lodging once, and applies Energy -1'),
    suite('secret-debt-activity-energy-compat-v20.test.ts',
      'T8 second Street morning after trap activation is a real bound Night and receives the D51 pair floor')
  );
});

test(title(21),()=>{
  accepted(
    suite('activity-ending-family-v16.test.ts',
      'D16 explicit commit remains non-terminal and Specialist ownership arrives only on completion',
      'D38 common baseline and all three positive readiness matrices are live conditions'),
    suite('activity-d38-strong-meta-v26.test.ts',
      'each D38 ending grants canonical ownership exactly once only at completeEnding and never activates in the earning life',
      'D38 usage survives actual schema6 save/reload when the matching Specialist is in the immutable run snapshot')
  );
});

test(title(22),()=>{
  accepted(
    suite('economy-start-balance-v14.test.ts',
      'D46 fresh life starts at Lust 5 while starting money 600 and base Energy 3 stay unchanged',
      'D46 schema-5 migration preserves stored Lust instead of applying the new fresh-life default'),
    suite('hard-work-bonus-mapping-v13.test.ts',
      'arbitrary earned subset remains profession-package selection and applies atomically once',
      'earned Hard Work never auto-applies stats, Lust or the retired Merchant +600',
      'D23 remains ten package identities, not fifteen stat components or a Lust component'),
    suite('hard-work-meta-migration-v5.test.ts',
      'selected package survives pre-finish reload, applies once, and then freezes')
  );
});

test(title(23),()=>{
  // Actually compare current production Save snapshots under a content-only
  // and presentation-only catalog variant. Do not inspect filenames alone.
  const current=started();
  const before=JSON.stringify(roundTrip(current));

  const contentOnly=clone(definitions);
  const ending=contentOnly.endings.find((e:{id:string})=>e.id==='ending.activity.pathfinder');
  assert.ok(ending,'D38 ending must exist');
  const mechanicalBefore=JSON.stringify({conditions:ending.conditions,reward:ending.reward,metaRewards:ending.metaRewards});
  ending.title=ending.title+' [release-copy-only]';
  ending.description=ending.description+' [copy]';
  ending.epilogue=ending.epilogue+' [copy]';
  assert.equal(JSON.stringify({conditions:ending.conditions,reward:ending.reward,metaRewards:ending.metaRewards}),mechanicalBefore);
  const alternate=loadCatalog(contentOnly,rawPacks);
  assert.equal(JSON.stringify(parseSave(JSON.stringify(current),alternate)),before);

  const override=JSON.parse(readFileSync('content/presentation.json','utf8'));
  const id=Object.keys(override.texts)[0];
  assert.ok(id,'presentation copy key required');
  override.texts[id]=override.texts[id]+' [release-presentation-only]';
  const presented=applyPresentation(alternate,override);
  assert.equal(JSON.stringify(parseSave(JSON.stringify(current),presented)),before);
  const d23Before=JSON.stringify({
    packages:current.run.character.creation.activeHardWorkPackages,
    palace:current.run.progression.palace,
    strongMetaSnapshot:current.run.strongMetaSnapshot,
    strongMetaRuntime:current.run.strongMetaRuntime
  });
  const d23After=parseSave(JSON.stringify(current),presented);
  assert.equal(JSON.stringify({
    packages:d23After.run.character.creation.activeHardWorkPackages,
    palace:d23After.run.progression.palace,
    strongMetaSnapshot:d23After.run.strongMetaSnapshot,
    strongMetaRuntime:d23After.run.strongMetaRuntime
  }),d23Before);
  accepted(suite('palace-d23-consumer-integration-v8.test.ts',
    'D23 9/10, 10/0 and 10/9 do not produce Palace invitation eligibility',
    'duplicates, Secret Debt and Palace cannot substitute for a missing ordinary career'));
});
