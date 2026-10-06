# Chat 4 — D46 + D47 + Legacy Golden Manifest v55

Status: **GOLDEN MANIFEST COMPLETE — READY FOR CHAT2 GOLDEN GATE**  
Owner: Chat 4  
Branch: `chat4/d46-d47-legacy-golden-manifest-v53`

## Purpose

This packet converts the accepted D46, D47, and lumber-stay retirement authorities into a machine-auditable selective assembly contract and a future exact focused-gate contract.

No production runtime/content was changed.  
No main merge was performed.  
No full CI was run.

## 1. Frozen authorities

D46 economy/start-balance authority:

`a0c5f855b63d3bb85556f5b2780aaaabb58fbced`

D47 Hard Work mapping authority:

`252dc26c514e24f4ab0f0cc0da7694254282e4c4`

Lumber-stay retirement verified target:

`39912e7435c3707d98f96fe550d697c20ac0bedb`

Accepted prior Chat4 evidence:

`chat4/d46-d47-legacy-exact-head-qa-v47`

`mindy-successor/docs/tasks/CHAT4_D46_D47_LEGACY_EXACT_HEAD_QA_v49.md`

## 2. v53 machine-auditable operation manifest

Manifest path:

`mindy-successor/docs/tasks/CHAT4_D46_D47_LEGACY_GOLDEN_OPERATIONS_v53.json`

Blob:

`17282cf11436d54d49915f44ed84de56a0eebf7c`

The manifest expresses only stable-ID / symbol / semantic operations.

It explicitly prohibits historical whole-file replacement for shared owners:

- `content/definitions.json`
- `src/core/engine.ts`
- `src/core/hardWorkMeta.ts`
- `content/localization.json`
- `content/presentation.json`
- `src/ui/app.ts`
- `src/core/schema.ts`
- `src/core/content.ts`

The manifest also records the observed current-main production blobs only as audit evidence. Chat2 must freeze its live integration base again at assembly time.

## 3. D46 golden operations

### Fresh Lust

Set only the fresh/new-life default:

`freshSave().run.character.lust = 5`

Do not rewrite legitimate stored/migrated Lust.

Third-value rule:

- old/pre-D46 value 1 -> may become 5;
- already 5 -> idempotent;
- any other fresh-default implementation/value -> STOP and review current-main drift.

### Ordinary wage bases

Set by exact action ID:

- `lumber.shift` -> 35
- `satyr-maid.shift` -> 37
- `undead-farm.shift` -> 37
- `tavern.shift` -> 37
- `hunter.shift` -> 37
- `guard.shift` -> 37
- `merchant.shift` -> 37
- `artist-geisha.shift` -> 37
- `assassin.shift` -> 37
- `prostitute.shift` -> 37

Preserve the current per-action wage weights and every non-ordinary action.

### Ordinary wage cap

Preserve/compose:

`ORDINARY_SHIFT_WAGE_CAP = 120`

Only the ten exact ordinary `*.shift` IDs use the ordinary helper.

The committed wage must be computed from the pre-shift state before later action/seasonal stat changes.

Never capture:

- Palace wages;
- Secret Debt hidden-work wage;
- School;
- Activity;
- any other non-ordinary wage path.

## 4. D47 golden operations

Selection policy is exactly:

- mode: `arbitrary-earned-subset`
- allow none: yes
- allow all earned: yes
- whole package only: yes

Exact ten package map:

- Lumber -> Strength +5
- Satyr Maid -> Charm +5
- Undead Farm -> Magic +5
- Tavern -> Wits +5
- Hunter -> Dexterity +5
- Guard -> Endurance +5, Manners +5
- Merchant -> Reason +5, Sociability +5
- Artist/Geisha -> Creativity +5, Grooming +5
- Assassin -> Dexterity +5, Wits +5
- Prostitute -> Sexuality +5, Charm +5, Lust +5

Aggregate progression-stat package points:

**75**

The Prostitute Lust +5 remains outside the 12 progression stats.

Package application must remain:

- only from earned package identities;
- only selected whole packages;
- at creation completion;
- exactly once;
- clipped by the resolved progression-stat cap;
- never multiplied;
- outside Strong Meta Keystone/Specialist slots.

## 5. Hard Work golden boundary

Exactly ten ordinary Hard Work ending IDs remain governed by:

`completed_shifts >= 50`

Exact stable IDs are recorded in v53.

Reward identity remains:

`hardWork:<career>`

Do not count individual D47 stat components as extra Hard Work identities.

## 6. Lumber-stay retirement golden operations

Retire the live ending exactly:

`lumber-stay`

Retired generic unlock:

`vitality`

Historical compatibility perk:

`legacy.lumber-stay.vitality`

Exact helper authority blob:

`src/core/lumberStayLegacy.ts@e9484f9b6eaf834b656b3db9abfbc94c4a19fd58`

For this new helper file, exact-copy from the verified authority is permitted.

For shared files, only semantic composition is permitted.

### Historical evidence normalization

Any of:

- completed ending `lumber-stay`;
- generic unlock `vitality`;
- existing `legacy.lumber-stay.vitality`;

must normalize to one deduplicated:

`legacy.lumber-stay.vitality`

Generic `vitality` is removed from live generic unlock ownership.

Historical evidence must never fabricate:

- `hardWork:lumber`;
- Palace qualification;
- Strong Meta ownership;
- a new live ending.

### Energy

`legacy.lumber-stay.vitality`

contributes exactly:

**+1 Energy**

once only.

Duplicate historical evidence cannot stack +2 or more.

All other legitimate Energy sources remain additive and independently owned.

### Save / RunResult compatibility

Preserve the verified retirement semantics:

- eligible-only retired ending is removed without reward;
- committed-but-unfinished retired ending is cancelled without reward;
- existing historical RunResult and transaction proof are preserved exactly;
- ended pre-RunResult lumber-stay receives deterministic compatibility proof without reward replay;
- historical completed-ending evidence remains preserved;
- profile merge dedupes the legacy perk and removes duplicate generic `vitality`.

## 7. Exact retirement localization/presentation operations

Delete only these live localization keys:

- `ending.lumber-stay.title`
- `ending.lumber-stay.description`
- `unlock.vitality.label`
- `presentation.static.ending.lumber-stay.alt`
- `presentation.static.ending.lumber-stay.caption`

Retain/ensure these historical compatibility keys:

- `legacy.ending.lumber-stay.title`
- `legacy.ending.lumber-stay.description`
- `legacy.perk.lumber-stay-vitality.label`
- `ui.legacy.historicalTitle`
- `ui.ending.state.historical`

Delete only presentation slot:

`ending/lumber-stay`

Historical UI remains display-only:

- historical completed ending card;
- historical inheritance text;
- neutral fallback presentation `job/lumber/result/default`;
- no live accept button for the retired ending.

All unlisted localization/presentation/UI state from the live integration base is preserved.

## 8. Current-main preservation contract

At future Chat2 assembly time, re-freeze the actual live integration head.

Preserve every current owner not explicitly modified by the v53 operations, including:

- schema6 and current migrations;
- Strong Meta registry/snapshot/runtime;
- D40 advanced endings;
- D41 advanced endings;
- Palace;
- D42/current NightFlow;
- Activity;
- School;
- RunResult / ending transaction ledger;
- Secret Debt + D51 if already present on the live integration base;
- all unrelated localization/presentation/UI keys.

The historical producer trees are not valid replacement snapshots for these shared owners.

## 9. Semantic assembly order

Chat2 golden integration order:

1. freeze exact live integration-base SHA;
2. compare owned values against v53 and apply third-value rules;
3. compose D46 fresh Lust default only;
4. compose D46 ten wage bases by action ID;
5. compose the ordinary-only cap-120 helper and pre-shift wage ordering;
6. compose D47 selection policy and exact ten-package map;
7. preserve/verify exactly-once package application;
8. preserve/verify the ten 50-shift Hard Work endings;
9. add exact `lumberStayLegacy.ts` helper;
10. compose lumber historical normalization into the current migration/profile paths;
11. compose exactly one legacy Energy source into the current Energy calculation;
12. retire live `lumber-stay` from current definitions;
13. delete only the five live retirement localization keys;
14. add/retain the five historical localization keys;
15. delete only `ending/lumber-stay` presentation slot;
16. compose historical display-only UI into the current UI owner;
17. inspect the final shared-file diff for unrelated deletion/reversion;
18. freeze the integrated candidate SHA;
19. execute the v54 focused gate on that exact SHA;
20. run any newer current authoritative tests in addition to the v54 roster.

No full CI belongs to Chat4.

## 10. v54 golden focused gate contract

Gate manifest path:

`mindy-successor/docs/tasks/CHAT4_D46_D47_LEGACY_GOLDEN_GATE_v54.json`

Blob:

`dae0b2bf197f66c1b1fe834e643caf541c6ef4c7`

The contract contains six phases.

### Phase D46/D47

Required:

- `tests/economy-start-balance-v14.test.ts`
- `tests/hard-work-bonus-mapping-v13.test.ts`
- `tests/ordinary-hard-work-meta-production.test.ts`
- `tests/ordinary-hard-work-lifecycle-parity.test.ts`
- `tests/lumber-hard-work-invariant.test.ts`
- `tests/hard-work-stat-cap-d24.test.ts`

### Migration / ending

Required:

- `tests/hard-work-meta-migration-v5.test.ts`
- `tests/migration.test.ts`
- `tests/ending-meta.test.ts`
- `tests/qa-exactly-once-reload.test.ts`
- `tests/qa-one-save-state-drift-sentinel-v2.test.ts`

### Lumber retirement

Required:

- `tests/lumber-stay-retirement-v17.test.ts`
- `tests/presentation-ending-parity-v9.test.ts`
- `tests/advanced-endings-tranche-a-v11.test.ts`
- `tests/d40-advanced-endings-tranche-b-v11.test.ts`

### Strong Meta / Palace adjacency

Required:

- `tests/strong-meta-registry-v7.test.ts`
- `tests/strong-meta-engine-integration-v7.test.ts`
- `tests/ordinary-hard-work-meta-production.test.ts`
- `tests/hard-work-palace-meta-smoke.test.ts`
- `tests/palace-d23-consumer-integration-v8.test.ts`

### Secret Debt / Activity / Night adjacency

When those accepted tranches are present on the live integration base, required:

- `tests/secret-debt-full-route-v12.test.ts`
- `tests/secret-debt-activity-energy-compat-v20.test.ts`
- `tests/activity.test.ts`
- `tests/school-night-study-adapter.test.ts`
- `tests/night-flow.test.ts`
- `tests/night-content-gap-v10.test.ts`
- `tests/shared-night-ui-localization-production-v1.test.ts`

### Localization / presentation

Required:

- `tests/localization.test.ts`
- `tests/presentation-source-integrity-v9.test.ts`
- `tests/presentation-locale-accessibility-v9.test.ts`
- `tests/presentation-ending-parity-v9.test.ts`

If the live integration base contains a newer authoritative test for the same semantic owner, run it **in addition** to this roster.

Do not replace current tests with historical files.

## 11. Mandatory v54 assertions

The machine-readable v54 contract records 32 explicit assertions.

Key release-stop assertions include:

- fresh Lust = 5;
- stored Lust preserved;
- money 600 / base Energy 3 preserved before legitimate modifiers;
- wage bases 35/37;
- ordinary cap 120 only;
- exact D47 package map;
- Prostitute package gives fresh Lust 5 -> 10 exactly once;
- packages outside Strong Meta slots;
- exactly 50-shift Hard Work boundary;
- live lumber-stay absent;
- exactly 40 canonical ordinary endings;
- live vitality acquisition absent;
- one deduplicated legacy perk;
- +1 legacy Energy exactly once;
- historical RunResult/transaction preserved;
- no Hard Work/Palace fabrication;
- no Strong Meta capacity/snapshot drift;
- no Secret Debt/D51, Activity, Night regression;
- retired presentation/live localization removed while historical compatibility remains.

## 12. Test-only artifacts

Test-only validator:

`mindy-successor/prior-work/astra/prototype-m3.2/tests/chat4-d46-d47-legacy-golden-contract-v54.test.ts`

Blob:

`ce8510c6873bf80a9523f5d92490ef33490512fb`

QA-only workflow:

`.github/workflows/chat4-d46-d47-legacy-golden-contract-v54.yml`

The validator checks:

- frozen authority SHA values;
- unique operation IDs;
- exact ten D46 wage IDs and values;
- cap 120 / ordinary-only protection;
- exact ten D47 packages;
- exact whole-package policy;
- 50-shift threshold across ten endings;
- exact lumber live-deletion/historical-retention key sets;
- exact helper blob;
- unique v54 assertions;
- mandatory cross-system test coverage;
- exact-head recheck requirements;
- third-value rules.

## 13. Validator executable evidence

Valid validator run:

**37507347022**

Job:

**112419249434**

The workflow intentionally checked out exact manifest/test head:

`a7420b808a2f0577ed9a379d0c1e322da79ffae2`

SHA guard:

```text
expected=a7420b808a2f0577ed9a379d0c1e322da79ffae2
actual=a7420b808a2f0577ed9a379d0c1e322da79ffae2
```

Result:

**6 / 6 PASS**

Subtests:

1. exact frozen authorities and unique operation IDs;
2. exact D46 golden values and ordinary-only scope;
3. exact D47 package map / whole-package contract;
4. exact 50-shift threshold for ten endings;
5. exact lumber live retirement + historical compatibility;
6. v54 unique assertions and mandatory cross-system owners.

An earlier workflow run `37507316081` is not evidence: its branch-head guard was configured against the pre-workflow commit while checkout still followed the branch. The validator did not run there. The pinned rerun above is the valid evidence.

## 14. Third-value rules

These rules are mandatory during integration.

### Scalar/keyed value

Allowed:

- expected old/pre-value -> desired golden value;
- desired value already present -> no-op.

Any third value:

**STOP / REVIEW**

Do not overwrite it automatically.

### Exact-ID deletion

Allowed:

- exact historical live ID present -> delete exact ID;
- exact ID already absent -> no-op.

If the live integration base has a renamed/replaced semantic ID:

**STOP / REVIEW**

Do not wildcard-delete similarly named IDs.

### Shared-file divergence

Never choose between:

- historical authority snapshot;
- current shared file;

as whole-file alternatives.

Keep the current live-base file and apply only the explicit v53 operations.

### Newer Product authority

If a later accepted Product decision intentionally supersedes any golden value:

**STOP and obtain Leader disposition.**

Do not force the historical golden value merely to satisfy this manifest.

## 15. Post-integration recheck requirements

Before declaring the tranche green:

1. freeze the exact integrated Chat2 SHA;
2. inspect all shared-file diffs;
3. prove there was no historical whole-file replacement;
4. run:
   - `npm ci`
   - `npm run typecheck`
   - `npm run validate`
   - `npm run build`
5. run every applicable v54 phase;
6. run any newer current authoritative tests in addition;
7. explicitly report all 32 v54 assertions PASS/FAIL;
8. recheck ordinary ending count = 40;
9. recheck no live `lumber-stay` / `vitality`;
10. recheck historical saves/profile merge;
11. recheck Strong Meta / Palace / Secret Debt / Activity / Night isolation;
12. freeze the golden-gate evidence SHA before any subsequent tranche changes.

## 16. Stop conditions

Stop the integration if any of these occur:

- existing valid Lust is rewritten to 5;
- fresh life is not Lust 5;
- wage 35/37 values drift;
- ordinary wage exceeds 120;
- non-ordinary wage enters D46 helper;
- any D47 package differs;
- package applies before creation completion or more than once;
- package consumes Strong Meta slots;
- Hard Work unlocks before 50 shifts;
- live lumber-stay/vitality acquisition returns;
- duplicate historical evidence gives > +1 legacy Energy;
- historical RunResult/transaction is rewritten or replayed;
- historical evidence fabricates Hard Work or Palace credit;
- ordinary ending count differs from 40;
- Secret Debt/D51, Activity, Night, Palace, Strong Meta or current migration tests regress;
- retired live localization/presentation remains player-facing;
- historical compatibility display disappears;
- an unowned current-main surface is removed by snapshot replacement.

## 17. Final disposition

v53 machine-auditable semantic operation manifest:

**COMPLETE**

v54 future focused gate contract:

**COMPLETE**

v54 test-only contract validator:

**6 / 6 PASS**

No production file was changed.

No full CI was run.

No main merge was performed.

**v53 COMPLETE — GOLDEN OPERATIONS FROZEN**  
**v54 COMPLETE — GOLDEN FOCUSED GATE FROZEN**  
**v55 COMPLETE — CHAT2 HANDOFF READY**

**BUNDLE_COMPLETE — READY_FOR_CHAT2_D46_D47_LEGACY_GOLDEN_GATE**
