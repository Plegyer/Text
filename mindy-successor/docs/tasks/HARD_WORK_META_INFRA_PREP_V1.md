# Hard Work / New Start+ Generic Infra Prep v1

Status: **IMPLEMENTATION PREP / NO SHARED INTEGRATION YET**
Owner: Chat 4
Base: `0f232f40157a56166403e31d259d88776b9b6d90`
Branch: `chat4/hard-work-meta-infra-prep-v1`

Authority: D21-D24 in `USER_DECISIONS_LOCKED_v1.md`.

## Added isolated infrastructure

### `src/core/hardWorkMeta.ts`

Pure helper module with no Palace-authored or Secret Debt implementation dependency.

It provides:

- typed `HardWorkPackageDefinition`;
- D21-D22 structural validator:
  - exactly ten ordinary careers;
  - first five exactly one +5 progression-stat effect;
  - later five one or two +5 progression-stat effects;
  - unique stat targets inside a package;
  - every progression-stat effect exactly +5;
  - at least one Lust package;
  - every Lust bonus integer >= +3;
- arbitrary earned-subset selection validation;
- D21 inherited early-career access helper;
- explicit `ordinaryCareersDomainLocked` precedence input for Secret Debt/global locks;
- exactly-once package application helper for creation completion;
- injected progression-stat cap so D24 100/200 cap can be integrated without value multiplication;
- Palace integration seam:
  - `allOrdinaryHardWorkEarned()`;
  - `allHardWorkPackagesActive()`;
  - `palaceNewStartQualified()`.

No final profession->stat mapping is encoded.

### `tests/hard-work-meta-infra-prep.test.ts`

Synthetic package definitions are generated from array positions only and explicitly are not production mapping.

Focused contracts cover:

- valid structural package set;
- invalid first-five/later-five breadth;
- invalid non-+5 progression effects;
- missing/weak Lust;
- none/some/all active package subsets;
- unearned and duplicate selections;
- exactly-once package application;
- injected cap behavior without x2 value multiplication;
- Secret Debt/global domain-lock precedence;
- Palace permanent 10/10 + active 10/10 seam;
- Secret Debt cannot substitute for an ordinary package.

## Minimal integration patch plan

The isolated helpers are designed so the later shared integration can be narrow.

### 1. `src/core/schema.ts`

Minimal target additions:

- creation-state field:
  `activeHardWorkPackages: OrdinaryHardWorkCareer[]`;
- preferably an explicit boolean/phase marker only if integration cannot rely safely on existing one-shot `creation.complete`;
- save migration/default for old v4 creation state.

Do not add a second permanent package-unlock ledger. `meta.hardWorkProgress` remains authoritative earned state.

D24 integration separately needs progression-stat storage validation compatible with cap 200. Lust remains separate.

### 2. `src/core/engine.ts::freshSave()`

Retire for newly created lives:

- `applyHardWorkStartingBonuses()` automatic +3/+3;
- Merchant `hardWorkProgress.includes('merchant') ? 600 : 0` starting money.

Initialize active package selection empty.

Do not subtract old rewards from an already-existing life during migration.

### 3. New Start+ selection commands

While creation is incomplete:

- add/remove an earned ordinary career package;
- validate through `validateHardWorkPackageSelection()`;
- allow empty, partial, or all earned packages;
- freeze selection once creation completes.

No one-slot rule.

### 4. `finishCreation`

Immediately before the existing `creationCompleted` resolver boundary:

1. validate selected package IDs against `meta.hardWorkProgress`;
2. apply selected definitions atomically with `applyHardWorkPackagesAtCreation()`;
3. persist final stats/Lust and exactly-once completion state;
4. then mark creation complete / emit `creationCompleted`.

The helper deliberately returns `packagesApplied` and `newlyApplied` so integration can guard save/reload duplication.

### 5. `actionAvailable()`

Do not rewrite career definitions.

For an ordinary `*.shift` action, integrate this precedence:

1. compute Secret Debt/global ordinary-career domain lock outside the helper;
2. pass it to `ordinaryCareerAvailableWithHardWork()`;
3. if locked -> unavailable;
4. if that career is earned in `meta.hardWorkProgress` -> bypass only its normal stat/year gate;
5. otherwise use the existing normal gate result.

Package activation is **not** required for D21 early-career access.

### 6. Palace seam

Do not author Palace content in this patch.

After New Start+ selection is persisted, Palace-owned integration can read:

`palaceNewStartQualified({earnedHardWork: meta.hardWorkProgress, activePackages: run.character.creation.activeHardWorkPackages})`.

The authored Palace invitation should use the existing deterministic `creationCompleted` seam and remain Chat 6/Leader-owned.

Current permanent-meta-only `palaceAvailable(meta)` / `ensurePalaceUnlock(meta)` semantics are D23-stale, but this prep branch does not modify them. Their replacement belongs in the shared integration patch together with Palace ownership review.

### 7. Secret Debt seam

No Chat 5 file changes.

The helper consumes a boolean `ordinaryCareersDomainLocked` instead of knowing Secret Debt state IDs. This keeps Chat 5 free to own its actual state representation while guaranteeing precedence.

Required regression after integration:

`domain lock -> D21 inherited access -> normal gate`.

### 8. D24 cap seam

`applyHardWorkPackagesAtCreation()` receives `progressionStatCap`.

Shared runtime later supplies:
- 100 normally;
- 200 only when the authorized Palace True cap option is active.

The helper only clamps to that cap. It never multiplies:
- starting values;
- manual allocation;
- +5 effects.

No Palace legacy option ID is invented here.

## Migration plan for old automatic rewards

For an existing saved life created under the old automatic reward model:

- keep current progression stats exactly as stored;
- keep Lust exactly as stored;
- keep money exactly as stored;
- preserve `meta.hardWorkProgress`;
- default missing active-package setup field safely;
- do not try to identify/subtract historical +3/+3 contributions;
- do not subtract historical Merchant +600;
- do not retroactively apply new selectable package effects;
- do not retroactively trigger a Palace Day-1 invitation.

On the next `newLife` / `restart`:

- baseline generation no longer applies old automatic rewards;
- earned packages become selectable;
- only active packages apply at creation completion.

Protected Meta import must continue unioning `hardWorkProgress`.

## Existing tests that shared integration must replace/update

- `tests/ordinary-hard-work-meta-production.test.ts`
  - remove automatic +3/+3 and Merchant +600 expectations.

- `tests/ending-meta.test.ts`
  - preserve exactly-once Hard Work Meta ledger;
  - remove automatic new-life stat/money expectations.

- `tests/all-ten-career-availability-smoke.test.ts`
  - add D21 earned-access cases.

- `tests/hard-work-palace-meta-smoke.test.ts`
  - change from permanent 10/10 => Palace availability to permanent 10/10 + active 10/10 => invitation qualification.

- `tests/palace-derived-unlock.test.ts`
  - retire stale permanent `meta.unlocks['palace']` authority.

The new synthetic infra tests should remain mapping-independent.

## Mapping boundary

This prep intentionally contains **no production profession -> stat mapping**.

The eventual definitions table must be supplied only after Leader/Product locks it. The generic validator will reject structural violations without needing code changes.

## Handoff

This prep is suitable for Chat 2/Leader review as a collision-minimized implementation foundation.

No full CI should be launched from this producer branch.
