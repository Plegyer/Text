# Chat 3 — Secret Debt v12 + D51 Assembly Preflight v22

Status: **RESEARCH COMPLETE — READY FOR CHAT2 PREFLIGHT**  
Owner: Chat 3  
Branch: `chat3/secret-debt-d51-assembly-preflight-v22`

## Anchors

Current production reference at task assignment:

`main@f36de067ae2e82518360dbe045f71c700e200805`

Frozen Secret Debt producer:

`chat4/secret-debt-full-route-producer-v12@10a2ecebf02ce64bdaf54d74dbbb66d6bae6e59e`

Frozen D51 producer:

`chat3/secret-debt-activity-energy-compat-producer-v20@79a868bf30af2c162b2ea1323759dffad5e8dadf`

D51 exact-head evidence:

- workflow ID `374608518`
- run ID `37205501396`
- job ID `111445731393`
- focused result `58/58 PASS`
- frozen production checkout `79a868bf30af2c162b2ea1323759dffad5e8dadf`

D42 Product authority:

`mindy-successor/docs/USER_DECISIONS_LOCKED_v1.md` — D42 ordinary-career Night content gap blueprint.

Frozen D42 producer:

`chat4/night-content-gap-producer-v10@9305d1da055203c51137041a78a345cbc64339c0`

Current D42 assembly lane observed during this preflight:

`chat2/assembly-d42-night-current-main-20261004-v1`

The observed branch head during research was `04abca04c5601bc17638a80b318579eabec27683`, but **this is diagnostic only**. D42 was not yet merged and this document does not treat that SHA as the future production base.

Chat 2 must assemble Secret Debt + D51 onto the **actual post-D42 current main** once D42 is merged.

---

# 1. Exact Secret Debt v12 production delta

The v12 producer is based on:

`main@fe00dea96892687ba26898a1f52d023e24d11dc7`

Exact production files changed by v12:

1. `content/definitions.json`
2. `content/localization.json`
3. `content/packs/secret-debt.json` — new
4. `src/core/content.ts`
5. `src/core/engine.ts`
6. `src/core/schema.ts`
7. `src/core/secretDebt.ts` — new
8. `src/ui/app.ts`

Source-specific test added:

`tests/secret-debt-full-route-v12.test.ts`

The v12 production contract includes:

- lender encounter at fixed 20%;
- refusal closes the lender route for the life;
- acceptance +2000 exactly once;
- trap exactly +10 calendar days;
- debt exactly 20000;
- typed bound state;
- all ten ordinary careers locked while bound without deleting progress;
- School available;
- Activity available;
- hidden daytime work;
- forced Secret Debt Night every bound night;
- next-day Energy -1;
- full-only repayment;
- Bound Life at 50 hidden shifts;
- Takeover at the exact D44 thresholds;
- D30/D32 reward IDs;
- Palace access preservation but no Palace creation.

## Exact v12 authored Secret Debt actions

`secret-debt.hidden-work`

- cost: 1 Energy;
- requires bound status.

`secret-debt.repay`

- requires bound;
- requires money >= 20000;
- explicit full-only repayment.

`secret-debt.takeover`

Requires:

- bound;
- hidden shifts >= 75;
- Endurance >= 75;
- Sexuality >= 75;
- Wits >= 35;
- Lust >= 30;
- paid School lessons >= 10.

## Exact v12 endings

- `ending.secret-debt.paid-freedom`
- `ending.secret-debt.bound-life`
- `ending.secret-debt.takeover`

Exact reward IDs:

- `secret-debt.paid-freedom.earned-reserve-match`
- `secret-debt.bound-life.work-rhythm`
- `secret-debt.takeover.network-retainer`

---

# 2. Exact D51 production delta

D51 is a narrow patch on top of frozen v12.

Exact D51 production file changed:

1. `src/core/engine.ts`

D51 test changes:

1. added `tests/secret-debt-activity-energy-compat-v20.test.ts`;
2. changed the bound+Street expectation inside `tests/secret-debt-full-route-v12.test.ts`.

No D51 changes were made to:

- `src/core/secretDebt.ts`;
- `src/core/schema.ts`;
- `src/core/content.ts`;
- `content/definitions.json`;
- `content/localization.json`;
- `content/packs/secret-debt.json`;
- `src/ui/app.ts`.

## D51 exact runtime rule

Explicit provenance tags:

- Street Energy provenance:
  `lodging.street.energy-penalty`
- bound forced-Night provenance:
  `secret-debt.bound-night`

When both tags are present from the immediately preceding Night:

1. process the locked Street -1 and bound-night -1 as a pair;
2. floor that pair result at 2 Energy;
3. apply unrelated Energy delta afterward;
4. retain the normal global minimum of 1.

Accepted examples:

- base 3 + Street -1 + bound -1 -> 2;
- base 4 + Street -1 + bound -1 -> 2;
- base 3 + Street only -1 -> 2;
- base 3 + bound only -1 -> 2;
- base 3 + Street -1 + bound -1 + unrelated -1 -> 1.

There is no global floor of 2.

---

# 3. v12 / D51 overlap matrix

| File | v12 | D51 | Assembly disposition |
| --- | --- | --- | --- |
| `src/core/engine.ts` | substantial Secret Debt runtime integration | D51 provenance + next-day Energy compatibility | **manual semantic compose** |
| `tests/secret-debt-full-route-v12.test.ts` | added | one D51 expectation changed | use the D51-head version as source, then adapt to current main |
| `tests/secret-debt-activity-energy-compat-v20.test.ts` | absent | added | source-specific test; port with v21 fixture corrections |
| `src/core/secretDebt.ts` | added | unchanged | candidate for exact new-file copy |
| `content/packs/secret-debt.json` | added | unchanged | candidate for exact new-file copy |
| all other v12 files | changed | untouched | compose v12 semantics against post-D42 main |

D51 must be applied **after** the v12 Secret Debt runtime seams exist.

Do not cherry-pick the historical v20 engine file wholesale.

---

# 4. D42 direct and semantic overlap

D42 locks the 12 ordinary-career Night surfaces and the following invariants:

- exactly three D35 private-space branches require `housingTier=normal`;
- cheap keeps School Night Study and public/workplace Night;
- Secret Debt forced Night suppresses voluntary/private-space Night;
- one completed global Night advances the calendar exactly once;
- no forced romance;
- refusal/back-out does not publish success;
- ordinary Prostitute does not inherit Secret Debt semantics.

## Direct file overlap with Secret Debt v12

D42 and v12 both touch:

1. `content/definitions.json`
2. `content/localization.json`
3. `src/ui/app.ts`

These three files must be composed onto post-D42 current main. Never replace them with the historical v12 versions.

## Semantic Night overlap

The D42 producer does not own a replacement Night engine. Its 12 events use the existing shared NightFlow.

The D42 ordinary Night events are authored as:

- priority class: `normal_progression`;
- priority: 68;
- reaction point: `nightChoiceCompleted`;
- Night intercept: `after_choice`.

The Secret Debt forced Night is authored as:

- event: `secret-debt.forced-night`;
- priority class: `forced`;
- priority: 1000;
- intercept: `before_lodging`;
- `suppressVoluntaryMenu: true`;
- `consumesNight: true`.

Therefore the required ownership relationship is:

**bound Secret Debt forced Night owns the Night before any D42 voluntary choice can be made.**

While bound:

- D42 Night choices must not execute;
- private-space D42 branches must not execute;
- D42 relationship/career success facts must not be published;
- housing selection must not cancel forced-Night ownership;
- the calendar still advances exactly once.

The Secret Debt lender event is different:

- `secret-debt.lender-encounter`;
- class `critical_progression`;
- priority 200;
- intercept `after_lodging`;
- requires Street and lender eligibility;
- does not consume Night.

Acceptance itself does not retroactively create a forced Night. The first forced Night occurs only once the route is actually bound.

Trap activation:

- `secret-debt.trap-activation`;
- class `forced`;
- priority 900;
- reaction: `dayStarted`.

It is a start-day scene, not a replacement for the preceding Night.

---

# 5. Files that must be selectively composed

## A. `src/core/engine.ts` — highest-risk hotspot

Current main already contains:

- schema6 runtime;
- Strong Meta start-day behavior;
- Strong Meta ordinary-work hooks;
- D40/D41 ending logic and migrations;
- current Activity runtime;
- current NightFlow/save-reload behavior.

The v12 and v20 engine files predate those current-main integrations.

**Never copy either historical engine file wholesale.**

Selectively add:

- Secret Debt imports;
- Secret Debt condition evaluation;
- ordinary-career bound-domain lock;
- default Secret Debt state during fresh life creation;
- Secret Debt effects;
- lender RNG attempt marking;
- stale Secret Debt ending eligibility check;
- hidden-work / repayment / Takeover action dispatch;
- Secret Debt save validation;
- trap activation;
- forced-Night behavior;
- D51 provenance helper and Street provenance tagging.

### Required current-main start-day composition

The assembled start-day sequence must preserve all of these semantics:

1. commit calendar advance exactly once;
2. activate Secret Debt if the trap is due;
3. determine the **live post-activation bound state**;
4. apply queued stat effects;
5. apply current-main Strong Meta start-day processing using that live bound state;
6. compute next-day Energy using the D51 provenance-aware calculation;
7. clear next-day modifiers exactly once;
8. complete normal Night cleanup and resolver boundary.

Do not leave current-main Strong Meta with a hard-coded/default `secretDebtBound=false` after Secret Debt is assembled.

Current-main `energyMax(s)` already includes resolved Strong Meta Energy bonuses.

D51 must therefore operate on the current-main `energyMax(s)`, not a historical hard-coded base.

This preserves the D51 diagnostic:

- effective base 4 + Street -1 + bound -1 -> 2.

### Strong Meta bound interaction at start day

Current main already suppresses Network Retainer payment when its start-day function receives `secretDebtBound=true`.

The assembly must pass the real bound state after trap activation.

Do not reimplement Network Retainer inside Secret Debt.

## B. `src/core/schema.ts` — high-risk hotspot

Current main is schema version **6** and owns canonical Strong Meta fields/types.

The historical v12 schema must not replace it.

Selectively add:

- `SecretDebtStatus`;
- Secret Debt condition variants;
- Secret Debt effect variants;
- Secret Debt capability reads/writes;
- `SecretDebtState`;
- default clean unseen Secret Debt state;
- `run.secretDebt`.

Preserve:

- `metaRewardSchema` with `kind:'strongMeta'`;
- Strong Meta snapshot/runtime fields;
- schema version 6;
- all current D40/D41 state;
- current Activity and NightFlow schema.

Do **not** downgrade or fork the save schema version.

## C. `content/definitions.json` — high-risk hotspot

Current main changed heavily after the v12 base, and D42 adds another large set of Night choices/state content.

Do not copy the historical v12 file.

Selectively add only the Secret Debt actions/endings.

### Mandatory Strong Meta correction

The v12 producer authored its three ending rewards using historical generic unlock records:

`{kind:'unlock', rewardId, unlock:rewardId}`

That is no longer authoritative on current main.

Current main already has all three Secret Debt IDs in the canonical Strong Meta registry:

- `secret-debt.paid-freedom.earned-reserve-match`
- `secret-debt.bound-life.work-rhythm`
- `secret-debt.takeover.network-retainer`

Current-main endings bind Strong Meta rewards with:

`{kind:'strongMeta', rewardId:<id>, reward:<id>}`

Therefore the three Secret Debt ending definitions must use the canonical current-main Strong Meta form.

Do not add those IDs as duplicate generic unlocks and do not fork the Strong Meta registry.

## D. `content/localization.json` — high-risk hotspot

Current main and D42 both own newer localization.

Merge only the Secret Debt localization keys.

Do not overwrite the post-D42 localization file.

Preserve D42 v25 accessibility/caption closure.

## E. `src/ui/app.ts` — high-risk hotspot after D42

v12 adds:

- Secret Debt condition explanations;
- hidden-work surface in Work;
- debt/status display;
- repay/Takeover actions.

D42 also changes current UI Night presentation.

Compose the Secret Debt UI additions into the post-D42 app.

Do not replace the D42 app with v12.

## F. `src/core/content.ts` — selective low/medium-risk patch

Add only the Secret Debt capability validation clauses:

- read Secret Debt conditions requires `reads.secretDebt`;
- `secretDebtAccept` requires Secret Debt write + money write;
- `secretDebtRefuse` requires Secret Debt write.

Preserve current-main Strong Meta ending/reward validation.

## Safe exact-addition candidates

These files do not exist on current main or observed D42 assembly and are not changed by D51:

- `src/core/secretDebt.ts`
- `content/packs/secret-debt.json`

They are the only production files that are candidates for exact copy from frozen v12.

Still run compile/validation immediately after adding them because their imported schema/runtime contracts must be the post-D42 current-main versions.

---

# 6. Current-main conflict hotspots

At `main@f36de067...`, the following v12-owned shared files already differ from frozen v12:

- `content/definitions.json`
- `content/localization.json`
- `src/core/content.ts`
- `src/core/engine.ts`
- `src/core/schema.ts`
- `src/ui/app.ts`

Key observed blob facts during preflight:

### definitions

- current main: `45d4287be3db6a828a4bd8b71825ff23e7f7bc31`
- v12/D51 source: `aac4376987cb95cf912bc0266391b623cabb96f1`
- observed D42 assembly: `311b2fec271a274e61c34fad9645d5bff13f4993`

### localization

- current main: `65568847f09df4997fffc6facb7dc7907a10c872`
- v12/D51 source: `c22e4cc9e9ea87615584b13801bb9547f45ccc72`
- observed D42 assembly: `b0174f41f687bac9f0cd2f026f194fe508f9d6ac`

### engine

- current main: `e8b979355e6ebacad7ae62dce36d625687613152`
- v12: `f53d1e0091a8a61bd65ae4b23683bfa51948e2b4`
- D51: `8e2c20e9b064bd613331183e2aee3aa3dfc73bfb`
- observed D42 assembly remains current-main engine

### schema

- current main: `d2a3fcd2ae638352f41149c5a78e56d7ab773042`
- v12/D51: `7ad6afe49130d209d07a420f7e1d8481a8c47b6f`
- observed D42 assembly remains current-main schema

### app

- current main: `86d73e921348c7865cd089dec22087734fe70001`
- v12/D51: `511d44292090eb39920e1f9fb9f2b1fafc4a86eb`
- observed D42 assembly: `660f2b203853473b9988548ced848d98de39c35d`

These hashes are preflight evidence only. Chat 2 must re-read the actual post-D42 main before assembly.

---

# 7. Source-specific tests vs current-main authoritative tests

## Source-specific tests to port

### `tests/secret-debt-full-route-v12.test.ts`

Use the version from the D51 head, not raw v12, because D51 already changes the Street+bound expectation to 2.

However it must be adapted before becoming assembly-authoritative.

### Required adaptations

1. Replace the stale generic-unlock reward assertion with canonical current-main Strong Meta reward assertions.
2. Verify reward ownership lands in `meta.strongMeta` / canonical transaction behavior rather than duplicate generic `meta.unlocks`.
3. Preserve exact reward IDs.
4. Replace the old “schema-v5 pre-Secret-Debt” assumption with current schema6 compatibility coverage, while still retaining at least one legacy migration case.
5. Apply the v21 fixture correction for manually created bound states:
   - synthetic bound fixtures must represent trap activation as already delivered when the test intends a settled bound day.
6. Preserve exact D19 trap timing:
   - acceptedDay = 0;
   - trapDay = 10;
   - boundDay = 10.

### `tests/secret-debt-activity-energy-compat-v20.test.ts`

Port the D51 test matrix, but permanently incorporate the v21 fixture corrections in the assembled test source.

Do not rely on the v21 runner overlay.

The v21 exact-head run proved the corrected matrix at **58/58 PASS**.

## Post-D42 authoritative test

Once D42 is merged, retain:

`tests/night-content-gap-v10.test.ts`

This is authoritative for the 12 D42 Night surfaces and normal-only private-space count.

## Current-main authoritative tests that should stay authoritative

At minimum:

- `tests/night-flow.test.ts`
- `tests/activity.test.ts`
- `tests/school-night-study-adapter.test.ts`
- `tests/strong-meta-d30-runtime-v7.test.ts`
- `tests/strong-meta-engine-integration-v7.test.ts`
- `tests/strong-meta-registry-v7.test.ts`
- `tests/ending-meta.test.ts`
- `tests/ordinary-hard-work-meta-production.test.ts`
- `tests/chat3-secret-debt-separation-v2.test.ts`
- `tests/palace-d23-consumer-integration-v8.test.ts`
- `tests/hard-work-palace-meta-smoke.test.ts`
- `tests/qa-one-save-state-drift-sentinel-v2.test.ts`
- `tests/shared-night-ui-localization-production-v1.test.ts`

Do not replace these with historical v12 copies.

---

# 8. Exact focused gate for Chat 2

Before any full-CI decision, run:

`npm ci`

`npm run typecheck`

`npm run validate`

`npm run build`

Then run this focused executable bundle on the assembled post-D42 branch:

```text
node --experimental-strip-types --test
tests/secret-debt-full-route-v12.test.ts
tests/secret-debt-activity-energy-compat-v20.test.ts
tests/night-flow.test.ts
tests/night-content-gap-v10.test.ts
tests/activity.test.ts
tests/school-night-study-adapter.test.ts
tests/strong-meta-d30-runtime-v7.test.ts
tests/strong-meta-engine-integration-v7.test.ts
tests/strong-meta-registry-v7.test.ts
tests/ending-meta.test.ts
tests/ordinary-hard-work-meta-production.test.ts
tests/chat3-secret-debt-separation-v2.test.ts
tests/palace-d23-consumer-integration-v8.test.ts
tests/hard-work-palace-meta-smoke.test.ts
tests/qa-one-save-state-drift-sentinel-v2.test.ts
tests/shared-night-ui-localization-production-v1.test.ts
```

If post-D42 main contains a newer authoritative Night/localization regression than the filenames above, include it in addition; do not drop `night-content-gap-v10.test.ts`.

---

# 9. Required Night priority checks

The assembly gate must prove all of the following.

## Bound forced Night

On every already-bound Night:

- pending event is `secret-debt.forced-night`;
- it wins at `before_lodging`;
- priority class remains `forced`;
- priority remains 1000;
- voluntary Night is suppressed;
- no D42 voluntary Night surface executes;
- lodging cannot suppress the forced event;
- calendar advances once only.

## D42 isolation

While bound:

- none of the 12 D42 Night choices can complete;
- none of their success facts/counters are published;
- the three normal-housing private branches remain unreachable because the voluntary menu itself is suppressed.

After Secret Debt exits:

- normal D42 Night behavior returns.

## Lender boundary

For eligible unseen Street Night:

- lender chance remains exactly 20%;
- encounter occurs after lodging;
- refusal closes the route;
- acceptance gives +2000 once;
- lender encounter itself does not consume the whole Night;
- acceptance does not retroactively produce a forced Night.

## Trap boundary

At exactly +10 days:

- activation occurs after calendar advance;
- status becomes bound;
- debt becomes exactly 20000;
- `boundDay` is the actual trap day;
- no bound-night -1 is invented for the preceding Night;
- the trap-activation scene is exactly-once/save-safe.

---

# 10. Required D51 provenance checks

Must prove:

1. Street authored consequence remains:
   - Energy -1;
   - Grooming -1.
2. Secret Debt forced Night remains:
   - Energy -1;
   - tag `secret-debt.bound-night`.
3. Street Energy provenance tag is explicit:
   - `lodging.street.energy-penalty`.
4. D51 requires both tags.
5. Housing state alone cannot activate D51.
6. Bound + normal -> normal bound penalty behavior.
7. Bound + cheap -> normal bound penalty behavior.
8. Bound + Street -> 2 Energy with base 3.
9. Effective base 4 + bound + Street -> 2.
10. Bound + Street + unrelated -1 -> 1.
11. Queue tags/delta survive reload before StartDay.
12. Queue is cleared exactly once after StartDay.
13. Reload cannot duplicate either locked modifier.

The unrelated-third-penalty test is mandatory proof that no global Energy floor was introduced.

---

# 11. Required Activity checks

D36 entry cost remains exactly **2 Energy**.

Must prove:

- a bound player at 2 Energy can enter otherwise-eligible Activity;
- normal lodging + bound Night leaves enough Energy for the 2-Energy entry;
- cheap lodging + bound Night leaves enough Energy for the 2-Energy entry;
- Street + bound Night uses D51 and leaves 2 with base 3;
- Activity entry then spends exactly 2;
- resume/reload never repays Activity entry cost;
- an unrelated third penalty may legitimately leave 1 and then Activity is unavailable.

Do not change the Activity entry cost to solve any compatibility issue.

---

# 12. Required D44 non-regression

Hidden work must remain:

- 1 Energy;
- Endurance +1;
- Sexuality +1;
- Lust +0.

Seasonal negatives:

- Summer: Reason -1;
- Winter: Sociability -1;
- Spring: no seasonal negative;
- Autumn: no seasonal negative.

Wage uses **pre-shift** values:

`round(30 + min(110, 0.70 * Endurance + 0.60 * Sexuality + 0.35 * Lust))`

Required anchors:

- 10 / 10 / 5 -> 45
- 30 / 30 / 15 -> 74
- 50 / 50 / 25 -> 104
- absolute cap -> 140

Bound Life:

- 49 hidden shifts: not eligible;
- 50: eligible;
- no auto-commit.

Takeover:

- hidden shifts >= 75;
- Endurance >= 75;
- Sexuality >= 75;
- Wits >= 35;
- Lust >= 30;
- paid School lessons >= 10;
- still bound;
- explicit action required.

Every threshold must fail independently at one below.

Repayment:

- full 20000 only;
- no partial repayment;
- explicit action;
- clears bound state.

---

# 13. Required Strong Meta checks

Current main already owns the three D30/D32 Secret Debt rewards.

Do not create a second registry.

Must prove:

- each Secret Debt ending grants the matching canonical Strong Meta reward exactly once;
- applied reward IDs are recorded in the existing ending transaction ledger;
- replay/reload does not duplicate ownership;
- Earned Reserve Match does not apply to bound Secret Debt hidden work;
- Network Retainer is suppressed while bound;
- Work Rhythm/current Energy behavior remains compatible with the relative Secret Debt penalty and D51;
- Strong Meta specialist capacity remains the current-main value;
- Secret Debt does not create a new specialist slot.

The current-main registry validation must remain green.

---

# 14. Required save / migration checks

Current production schema is **6**.

Do not import historical v12 schema-version ownership.

Required tests:

## Existing schema6 save from before Secret Debt

Take a save valid on post-D42 current main with no `run.secretDebt`.

After assembly it must parse to the clean default:

- status `unseen`;
- acceptedDay null;
- trapDay null;
- boundDay null;
- resolvedDay null;
- debt 0;
- hiddenShifts 0;
- grantApplied false;
- lastLenderAttemptDay null.

Strong Meta snapshot/runtime and all D40/D41/D42 state must survive unchanged.

## Legacy migration

At least one pre-schema6 save must still migrate through the current-main chain to schema6 and receive the same clean Secret Debt default.

Do not bypass current D41 migration logic.

## Secret Debt route reload points

Save/reload at:

- unseen Street eligibility;
- lender pending;
- after acceptance;
- immediately before trap day;
- trap-activation pending scene;
- bound state;
- forced Night pending before choice;
- after forced-night choice / before lodging;
- after Street lodging / before StartDay where applicable;
- D51 next-day modifier queue;
- post-D51 morning;
- after repayment;
- after Takeover;
- ending committed/result transaction state.

Must prove exactly-once:

- +2000 grant;
- 20000 debt activation;
- forced-night penalty;
- Street penalty;
- ending reward transaction.

---

# 15. Palace / ordinary-career isolation

## Palace

Secret Debt must never create Palace access.

If Palace access/progress was legitimately obtained before becoming bound:

- it remains;
- Palace progress remains;
- forced Secret Debt Night still wins;
- next-day bound penalty still applies.

Use current-main Palace behavior as authority, not historical v12 assumptions.

## Ordinary careers

While bound:

- all ten ordinary careers are unavailable;
- their existing progress is preserved;
- no caller option may bypass the bound domain lock.

After Paid Freedom or Takeover route exit:

- ordinary career access resumes under the ordinary current-main rules;
- previous progress remains.

## Ordinary Prostitute firewall

D42 ordinary Prostitute Night content must remain ordinary-career content.

It must not:

- trigger Secret Debt lender semantics;
- inherit hidden-work semantics;
- bypass Secret Debt forced Night;
- infer consent from Sexuality or Lust.

Retain `chat3-secret-debt-separation-v2.test.ts`.

---

# 16. Recommended assembly order

For Chat 2 after D42 merges:

1. fetch actual post-D42 `main` and freeze that base;
2. add exact new file `src/core/secretDebt.ts`;
3. add exact new pack `content/packs/secret-debt.json`;
4. extend current schema6 with Secret Debt state/conditions/effects/capabilities;
5. extend current `content.ts` validation;
6. selectively add Secret Debt actions/endings to current definitions;
7. bind all three ending rewards to canonical current-main Strong Meta;
8. merge Secret Debt localization keys;
9. merge Secret Debt UI surfaces into the D42 app;
10. manually compose Secret Debt runtime into the current engine;
11. apply D51 provenance and compatibility only after the v12 Night/Energy seam exists;
12. port the two source-specific test files with the v21 fixture corrections and current-main Strong Meta assertions;
13. run typecheck / validate / build;
14. run the exact focused bundle above;
15. only then proceed to the assembly lane's normal higher-level gate.

Do not start by cherry-picking the historical v12 or v20 commits wholesale.

---

# 17. Preflight verdict

There is no conceptual blocker to assembling Secret Debt v12 + D51 after D42.

The integration is **not** a clean historical cherry-pick.

The main risks are:

1. overwriting current schema6 / Strong Meta with v12 schema;
2. overwriting current D40/D41/D42 definitions/localization/UI;
3. losing current Strong Meta start-day sequencing in `engine.ts`;
4. granting Secret Debt ending rewards through stale generic unlocks instead of canonical Strong Meta;
5. allowing D42 voluntary Night content to execute while Secret Debt forced Night owns the Night;
6. losing D51 provenance ordering when Strong Meta changes effective Energy;
7. copying frozen v20 tests without the v21 fixture corrections;
8. treating the current in-progress D42 assembly SHA as future production.

The correct assembly strategy is a selective semantic composition onto the actual post-D42 main.

## Disposition

**READY_FOR_CHAT2_PREFLIGHT**
