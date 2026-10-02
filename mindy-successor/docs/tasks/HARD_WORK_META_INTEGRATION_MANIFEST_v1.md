# Hard Work / New Start+ — Selective Integration Manifest v1

Status: **READY FOR CHAT 2 SELECTIVE ASSEMBLY PLAN**
Owner: Chat 4
Manifest branch: `chat4/hard-work-meta-integration-manifest-v1`
Audit base: fresh current main `20e07322ea7cdf7f60761df7c8ea859b93e5995e`

Frozen source evidence:
- generic infra prep: `50ede59ad96bd8059fcc15dca1ffdffc910563ab`;
- production package/catalog prep: `54d87ad3db0fb1846ea2500153e34424c900f89f`.

This manifest changes no shared runtime. It describes how Chat 2 should selectively assemble D21-D24 Hard Work / New Start+ infrastructure and the approved production package mapping onto then-current main without overwriting newer Assassin, School, Secret Debt, Palace, or other shared work.

## 1. Authority and source-of-truth rule

The latest direct task and frozen production catalog promote the concrete profession package mapping for integration:

- Lumber: Strength +5
- Satyr Maid: Grooming +5
- Undead Farm: Magic +5
- Tavern: Sociability +5
- Hunter: Dexterity +5
- Guard: Endurance +5, Manners +5
- Merchant: Wits +5, Reason +5
- Artist / Geisha: Creativity +5, Grooming +5
- Assassin: Dexterity +5, Wits +5
- Prostitute / Professional: Sexuality +5, Charm +5, separate Lust +3

The older `USER_DECISIONS_LOCKED_v1.md` “Still open” line about exact mapping is stale relative to this later direct assignment and the frozen `54d87ad...` production catalog.

D21-D24 structural rules remain authoritative:
- earned ordinary Hard Work permanently gives that career inherited early access;
- New Start+ can activate any earned package subset: none/some/all;
- package selection is whole-package;
- first five have one +5 progression-stat effect;
- later five have two +5 progression-stat effects in this approved catalog;
- Lust is separate; Professional carries +3 Lust;
- old automatic +3/+3 and Merchant +600 are superseded;
- Palace qualification is permanent ordinary 10/10 + current-life active-package 10/10;
- Secret Debt domain lock outranks inherited ordinary-career access;
- Palace True x2 is cap-only and must never multiply start/package values.

## 2. Do not merge either producer branch wholesale

Both source heads diverge from current main.

At audit time:
- `50ede59...` is 3 producer commits ahead of its old base and 7 commits behind current main;
- `54d87ad...` is 4 producer commits ahead of its old base and 3 commits behind current main.

Current main already contains newer Assassin changes and shipped School D20 changes. Assassin changed:
- `content/definitions.json`;
- `content/localization.json`;
- `src/core/schema.ts`;
- `src/ui/app.ts`;
- new Assassin packs/tests.

Therefore:
- **never merge `50ede59...` or `54d87ad...` as a branch**;
- **never replace current shared files with versions from either old branch**;
- use file-level/selective semantic assembly only.

## 3. Exact safe source files to import

### 3.1 Import once: generic helper

Source file:
`mindy-successor/prior-work/astra/prototype-m3.2/src/core/hardWorkMeta.ts`

The file is byte-identical in both source heads.

Git blob:
`98370d62048fdcdd9054c685d7deb1d78ee84a27`

Functions/contracts supplied:
- `validateHardWorkPackageDefinitions()`;
- `validateHardWorkPackageSelection()`;
- `hasInheritedHardWorkCareerAccess()`;
- `ordinaryCareerAvailableWithHardWork()`;
- `allOrdinaryHardWorkEarned()`;
- `allHardWorkPackagesActive()`;
- `palaceNewStartQualified()`;
- `applyHardWorkPackagesAtCreation()`.

Copy this file exactly once, preferably from `54d87ad...` so the production-catalog source set stays together.

### 3.2 Import: production package source

Source:
`content/hard-work-package-catalog-v1.fixture.json`

From:
`54d87ad3db0fb1846ea2500153e34424c900f89f`

Git blob:
`75c092377a2347be3f6c9cee05f1897cf0cce4cf`

Keep the exact mapping and policy fields.

Do not reintroduce:
- automatic +3/+3;
- Merchant +600;
- per-effect toggles.

### 3.3 Import: New Start+ RU/EN presentation source

Source:
`content/hard-work-new-start-presentation-v1.fixture.json`

From:
`54d87ad...`

Git blob:
`df30a0a96177577131b1ada833bb7107d6577696`

It contains:
- package titles;
- package descriptions;
- selected ARIA text;
- unselected ARIA text;
- whole-package / none / all copy.

Treat it as authoritative copy source. Do not overwrite the large current `content/localization.json` from an old branch.

### 3.4 Import: focused source-level tests

Import both:

1. `tests/hard-work-meta-infra-prep.test.ts`
   - from `50ede59...`;
   - blob `aec82afc02b5e6aa161752ffeddad19e9bfaebfb`;
   - synthetic/mapping-independent helper contracts.

2. `tests/hard-work-package-catalog-v1.test.ts`
   - from `54d87ad...`;
   - blob `b706d36bee570e56e645b762f50de03e97446f85`;
   - exact approved production mapping + RU/EN fixture coverage.

### 3.5 Do not import as production inputs

Do not cherry-pick:
- `docs/tasks/HARD_WORK_META_INFRA_PREP_V1.md` as runtime input;
- any old `engine.ts`, `schema.ts`, `app.ts`, `definitions.json`, or `localization.json` snapshot from the producer branches.

Those are evidence only.

## 4. Current-main shared collision map

All line numbers below refer to audited main `176d879f...` and must be re-located semantically if main moves before Chat 2 assembly.

### `src/core/schema.ts`

Current collision points:
- line ~411: `ordinaryHardWorkCareers` — preserve exactly as master ten-career roster;
- line ~444: `progressionStatRecord` currently max 100;
- line ~452: creation state currently only `remaining`, `allocated`, `complete`;
- line ~574: `metaSchema` already has `hardWorkProgress`;
- line ~587: save schema is literal version 4.

Do not replace this file; current main includes newer Assassin schema changes.

### `src/core/engine.ts`

Current D21-D23 collision points:
- ~39 `palaceAvailable(meta)`: currently permanent 10/10 only — stale under D23;
- ~42 `ensurePalaceUnlock(meta)`: projects permanent 10/10 into `meta.unlocks['palace']` — stale under D23;
- ~225 `meets(metaUnlock palace)`: special-cases permanent 10/10 — stale under D23;
- ~255 `actionAvailable()`: evaluates authored gate before any inherited D21 access;
- ~267 `applyHardWorkStartingBonuses()`: old automatic +3/+3 model;
- ~281 `freshSave()`: invokes old bonuses and gives Merchant +600;
- ~755 `applyMetaRewardMutable()`: writes `hardWorkProgress` correctly but then calls stale Palace projection;
- ~1080 `Command`: no package-selection command;
- ~1101 `restart` / ~1104 `newLife`: generate the next run through `freshSave()`;
- ~1116 `finishCreation`: marks complete and emits `creationCompleted` without package application;
- ~1311 `parseSave()`: v1-v4 migration/validation and protected Meta merge;
- ~1434 protected Meta merge: unions `hardWorkProgress` correctly; preserve this.

Do not replace this file. Secret Debt candidate also has pending inserts here.

### `src/ui/app.ts`

Current collision points:
- ~361 `actionList()`: independently computes missing authored conditions;
- ~443 `central()` / ~445 incomplete-creation surface: no package UI;
- ~506 stats panel uses fixed progress max 100;
- ~531 stat allocation event binding;
- ~537 create/new-life handlers.

Current main also contains newer Assassin UI additions. Edit current file surgically only.

### `content/localization.json`

Current main has >1000 lines of newer Assassin localization delta relative to the old catalog branch base, and School D20 has since modified this same file again.

Never copy the producer-branch localization file.

Prefer binding package copy from the dedicated presentation fixture rather than duplicating all package strings into this shared file.

### `content/definitions.json`

Current main has large Assassin additions. The Hard Work package catalog does not need to be merged into `definitions.json`.

Keeping it as an isolated typed catalog avoids this collision.

### Existing tests with stale behavior

Must be revised during integration:
- `tests/ordinary-hard-work-meta-production.test.ts`;
- `tests/ending-meta.test.ts`;
- `tests/all-ten-career-availability-smoke.test.ts`;
- `tests/hard-work-palace-meta-smoke.test.ts`;
- `tests/palace-derived-unlock.test.ts`.

## 5. Runtime catalog binding — minimal path

Do not extend the giant `definitions.json` schema for the first integration.

Recommended minimal adapter:

`src/core/hardWorkPackageCatalog.ts`

Responsibilities:
1. import `content/hard-work-package-catalog-v1.fixture.json` as JSON;
2. expose only `raw.packages` as `readonly HardWorkPackageDefinition[]`;
3. call `validateHardWorkPackageDefinitions()` once when the module loads;
4. export the validated package list.

Current toolchain:
- TypeScript `resolveJsonModule: true`;
- Node >=22.18;
- esbuild bundles renderer and persistence.

Use a JSON import attribute compatible with current Node/TS:
`with {type:'json'}`.

Before broader assembly, run the focused catalog test through the same Node strip-types path used by the repository.

Do not create a second hand-written mapping table in `engine.ts`.

## 6. Save/schema integration and migration

### 6.1 Required run-scoped creation fields

Add to the current creation schema:

```ts
activeHardWorkPackages: OrdinaryHardWorkCareer[]
hardWorkPackagesApplied: boolean
```

Constraints:
- active list unique;
- max 10;
- only ordinary careers;
- list may be empty;
- active selection must be a subset of `meta.hardWorkProgress` at runtime validation.

The active array is the single per-life package-selection representation and is also the D23 Palace active-10 source.

Do not add another permanent package-unlock ledger.

### 6.2 Use a save-version bump for semantic migration

Recommended: bump save schema from v4 to v5.

Reason: an existing v4 life may already contain old automatic +3/+3 or Merchant +600 effects. A default `hardWorkPackagesApplied:false` would make it ambiguous whether new packages should apply to that already-created legacy life.

v4 -> v5 migration for the existing current life:

```
activeHardWorkPackages = []
hardWorkPackagesApplied = true
```

Use `true` deliberately for every migrated v4 current run, including an unfinished creation. This marks the legacy run as settled and prevents a new D22 package from being applied retroactively on top of old automatic rewards.

Consequences:
- current stats preserved exactly;
- current Lust preserved exactly;
- current money preserved exactly;
- old automatic reward values are not reverse-engineered/subtracted;
- migrated current life cannot newly activate D22 packages;
- D22 package selection begins on the next `newLife` / `restart`.

### 6.3 New v5 run initialization

For a newly created life:
- `activeHardWorkPackages=[]`;
- `hardWorkPackagesApplied=false`;
- all 12 progression stats start at 1;
- normal 10 allocation points remain;
- normal starting money remains;
- no automatic Hard Work stat package is applied;
- no Merchant Hard Work +600 is applied.

Preserve unrelated starting-money modifiers, such as the existing Satyr Maid house-credit branch, unless another authority changes them.

### 6.4 Protected Meta import

Keep current protected merge behavior:
`hardWorkProgress = union(current, imported)`.

Importing an older save must never erase earned Hard Work packages.

Do not infer package unlocks from `activeHardWorkPackages`; permanent earning always comes from `meta.hardWorkProgress`.

## 7. Retire old automatic rewards exactly

In current `engine.ts`:

Remove:
- `applyHardWorkStartingBonuses()`;
- its call from `freshSave()`;
- only the Merchant term
  `meta.hardWorkProgress.includes('merchant') ? 600 : 0`
  from starting-money calculation.

Do not remove unrelated Satyr Maid house-credit money.

Update old tests so they no longer expect:
- Lumber/non-Merchant +3/+3;
- Merchant 1200 baseline merely because Merchant Hard Work was earned.

Legacy already-created v4 lives retain whatever values they already contain through migration.

## 8. New Start+ selection command contract

Add one command shape to current `Command`:

```ts
{type:'setHardWorkPackageActive'; career:OrdinaryHardWorkCareer; active:boolean}
```

Dispatch rules:
- only while run is active;
- only while `creation.complete === false`;
- only while `hardWorkPackagesApplied === false`;
- career must be in `meta.hardWorkProgress`;
- `active:true` adds uniquely;
- `active:false` removes;
- after mutation validate the whole list through `validateHardWorkPackageSelection()`.

Do not expose per-effect toggles.

Selecting Guard means both Guard +5 effects.
Selecting Professional means Sexuality +5, Charm +5, and Lust +3 together.

## 9. Exactly-once creation application

Current `finishCreation` sets `creation.complete=true` before `creationCompleted`.

Required integrated order:

1. require all 10 manual allocation points spent, as today;
2. validate `activeHardWorkPackages` against `meta.hardWorkProgress`;
3. call `applyHardWorkPackagesAtCreation()` with:
   - validated production package definitions;
   - earned `meta.hardWorkProgress`;
   - current run active package IDs;
   - current stats/Lust;
   - current `hardWorkPackagesApplied`;
   - effective progression-stat cap;
4. write returned stats and Lust;
5. set `hardWorkPackagesApplied=true`;
6. mark creation complete;
7. register/refresh ending state as currently required;
8. emit the existing `creationCompleted` resolver boundary.

The Palace seam must read the final selected set after package application and before/at the `creationCompleted` boundary.

Reload after creation must never reapply packages.

### D24 boundary

The helper already accepts `progressionStatCap` and never multiplies values.

If the Palace True cap-200 option is not yet integrated in the same assembly, pass current effective cap 100.

Do not implement fake x2 arithmetic.

When D24 cap infrastructure lands, replace the supplied cap with the authoritative 100/200 helper; do not change package math.

## 10. D21 inherited early-career access

Package activation is not required for inherited access.

Earned Hard Work itself permanently bypasses only the profession's normal stat/year gate.

For an ordinary shift, eventual combined `actionAvailable()` ordering must be:

1. Secret Debt/global ordinary-career domain prohibition;
2. inherited D21 Hard Work access;
3. normal authored stat/year condition result.

Conceptual integration:

```ts
if (secretDebtBlocksOrdinaryAction(s, action)) return false;

const career = ordinaryCareerForShiftAction(action);
const normalGateSatisfied = eligible(action.conditions, s, cat);

if (career) {
  return ordinaryCareerAvailableWithHardWork({
    career,
    normalGateSatisfied,
    ordinaryCareersDomainLocked: false, // already rejected above
    earnedHardWork: s.meta.hardWorkProgress
  });
}

return normalGateSatisfied;
```

Preserve any non-career availability semantics around this code.

Do not delete authored career conditions from `definitions.json`.

## 11. Secret Debt precedence / collision

Current main does not yet contain the final Secret Debt integration.

Frozen Secret Debt candidate:
`9dd6c010d45bffe1fdca365f1c3d7033684ec5cf`

It changes shared:
- `engine.ts`;
- `app.ts`;
- `definitions.json`;
- `localization.json`;
- `presentation.ts`.

Its `src/core/secretDebt.ts` supplies:
- `secretDebtIsBound()`;
- `secretDebtBlocksOrdinaryAction()`;
- `secretDebtBlocksCareerId()`;
- `secretDebtBlocksSourceDomain()`;
- `secretDebtBlocksEnding()`.

Its candidate `actionAvailable()` already puts:
`secretDebtBlocksOrdinaryAction(s, action)`
before normal gate evaluation.

### Required combined behavior

When Chat 2 assembles Secret Debt and Hard Work together:

1. apply/selectively integrate Secret Debt domain-lock semantics into the then-current engine first;
2. keep `secretDebtBlocksOrdinaryAction()` as the first ordinary-career denial;
3. add D21 inherited access only after that check;
4. test an earned/active all-ten profile while Secret Debt is bound:
   - all ten ordinary work actions remain blocked;
   - Meta `hardWorkProgress` is unchanged;
   - package selections are not erased;
5. after real Secret Debt exit:
   - D21 inherited availability returns immediately;
   - authored normal gates still work for unearned careers.

Never implement:
`if (hardWorkProgress.includes(career)) return true`
above the Secret Debt check.

Secret Debt itself never appears in the ten-package catalog and never satisfies Palace 10/10.

## 12. Palace all-ten-active seam

### 12.1 Remove stale permanent-access projection

Current main behavior is D23-stale:
- `palaceAvailable(meta)` means permanent 10/10;
- `ensurePalaceUnlock(meta)` writes `meta.unlocks['palace']`;
- `meets(metaUnlock palace)` treats permanent 10/10 as Palace access.

The integrated D23 model must stop using permanent `meta.unlocks['palace']` as access authority.

Recommended shared semantics:
- permanent completion predicate: `allOrdinaryHardWorkEarned(meta.hardWorkProgress)`;
- current-life active predicate: `allHardWorkPackagesActive(run.character.creation.activeHardWorkPackages)`;
- qualification seam: `palaceNewStartQualified({earnedHardWork,activePackages})`.

During v4 -> v5 migration, remove/ignore stale derived `'palace'` in `meta.unlocks`.
Do not remove `hardWorkProgress`.

`applyMetaRewardMutable(kind='hardWork')` should continue adding only the earned career and should stop auto-projecting Palace access.

### 12.2 Chat 6 safe-prep compatibility

Frozen Palace safe prep:
`302c5cd636b2389edd05de2b4e50d5df8f88133d`

It is add-only relative to its base and defines:
- `palaceRunGate()`;
- `initialPalaceAccessState(runEligible)`;
- `resolvePalaceInvitation()`;
- invitation contract on `creationCompleted`, day 0, latched, no RNG.

Its fixture expects external gate:
`palaceRunEligible`.

### Required seam

Hard Work shared integration owns the facts needed to calculate qualification:
- permanent `meta.hardWorkProgress`;
- run-scoped `activeHardWorkPackages`.

Palace-owned integration consumes the boolean result.

When Chat 6 safe prep is assembled:
- do not maintain two independent eligibility authorities;
- either make `palaceRunGate().eligible` delegate to `palaceNewStartQualified()`, or add a focused equivalence test and keep the generic helper canonical;
- pass the resulting boolean into Palace local lifecycle initialization;
- let Palace invitation resolution grant the Palace-owned run access fact/state.

Do not grant silent Palace access at New Start+ setup.
The sequence is:

`10/10 earned + 10/10 active -> eligible -> Day-1 invitation queued -> player resolves invitation -> Palace run access granted`.

### 12.3 Palace test boundary

With ten earned:
- active 0 => no qualification;
- active 1..9 => no qualification;
- active 10 => qualification true.

With nine earned:
- active nine/all requested => qualification false.

Secret Debt or any hidden route must never substitute for an ordinary career.

## 13. UI binding seam

### 13.1 Creation / New Start+ surface

In current `app.ts::central()`, extend the incomplete-creation surface after manual stat allocation and before the final Create button.

Show only earned packages:
`meta.hardWorkProgress ∩ ordinaryHardWorkCareers`.

For each:
- one whole-package checkbox/toggle;
- title and description from `hard-work-new-start-presentation-v1.fixture.json`;
- selected/unselected ARIA copy from that same fixture;
- checked state from `creation.activeHardWorkPackages`.

Support:
- none;
- any subset;
- all earned.

Do not expose individual +5/Lust effects as separate controls.

### 13.2 Presentation-source binding

To avoid colliding with current large `localization.json`, prefer a tiny UI adapter that imports the dedicated presentation fixture and returns `ru` or `en` copy according to current locale.

Do not overwrite `localization.json` with the old branch.

Only add shared localization keys where the fixture does not cover a needed shared state.

### 13.3 Work-panel inherited access

Current `actionList()` computes:
`miss = a.conditions.filter(...)`
separately from `actionAvailable()`.

After D21, that can produce a false UI state:
- action enabled by Hard Work inheritance;
- normal gate still displayed as unmet.

Required UI behavior:
- calculate whether the ordinary career is inherited from `meta.hardWorkProgress`;
- if inherited and not Secret-Debt/domain-locked:
  - suppress/mark normal gate misses as overridden;
  - show localized “available through Hard Work legacy” explanation;
- if Secret Debt bound:
  - Secret Debt lock copy wins;
  - do not show inherited access as currently usable.

Package activation does not control this message; earning does.

## 14. Test assembly plan

### Phase A — safe source tests before shared binding

Copy and run focused:
- `hard-work-meta-infra-prep.test.ts`;
- `hard-work-package-catalog-v1.test.ts`.

These prove:
- generic validator;
- exact approved mapping;
- first-five/later-five breadth;
- Lust +3;
- none/some/all;
- whole-package application;
- synthetic Secret Debt precedence;
- generic Palace 10/10 seam;
- RU/EN package copy coverage.

### Phase B — migration tests

Add a dedicated migration test covering a v4 life that already reflects old rewards.

Required assertions:
1. parse v4 -> v5 preserves current stats exactly;
2. preserves current Lust exactly;
3. preserves current money exactly;
4. preserves `hardWorkProgress`;
5. migrated current run has active packages `[]`;
6. migrated current run is marked legacy-settled/applied;
7. no new package applies retroactively;
8. next `newLife` starts without old +3/+3;
9. next `newLife` starts without Merchant +600;
10. earned packages are available for selection in that next creation.

### Phase C — New Start+ runtime tests

Add integration tests for:
- no packages selected;
- one first-five package;
- one later-five package;
- Professional package including Lust +3;
- arbitrary strict subset;
- all ten;
- unearned selection rejected;
- duplicate selection rejected/canonicalized according to command contract;
- save/reload before finish preserves selection without applying;
- finish applies exactly once;
- save/reload after finish never duplicates.

### Phase D — update stale existing tests

`ordinary-hard-work-meta-production.test.ts`
- keep exact Hard Work reward IDs and permanent ledger;
- replace automatic next-life reward assertions with earned package availability.

`ending-meta.test.ts`
- preserve exactly-once RunResult/Meta proof;
- remove Lumber automatic +3/+3 assertions;
- remove Merchant automatic +600 assertions;
- replace old permanent Palace unlock assertion.

`all-ten-career-availability-smoke.test.ts`
- add D21 inherited access at low stats/year;
- verify package inactive still permits inherited career access.

`hard-work-palace-meta-smoke.test.ts`
- replace permanent 10/10 => Palace available with permanent 10/10 + run active 10/10 => Palace qualification.

`palace-derived-unlock.test.ts`
- retire stale `meta.unlocks['palace']` repair/projection behavior.

### Phase E — Secret Debt combined tests

After selective Chat 5 integration:
- bound + all ten earned => all ordinary careers unavailable;
- bound + all ten packages active => ordinary careers still unavailable;
- exit restores inherited availability;
- Secret Debt progress does not count in Palace predicate.

### Phase F — Palace combined tests

After selective Chat 6 integration:
- 10 earned + 10 active on creation completion queues Day-1 invitation exactly once;
- 10 earned + 9 active does not;
- 9 earned + 9 active does not;
- reload does not duplicate invitation;
- resolving invitation grants run-scoped Palace access;
- no random/item/stat substitute entry.

### Phase G — UI/accessibility tests

Add focused DOM tests:
- only earned packages shown;
- none/some/all selection possible;
- each checkbox controls whole package;
- selected/unselected ARIA copy matches current locale;
- Professional copy includes +5 Sexuality, +5 Charm, +3 Lust;
- inherited career shows no stale unmet normal-gate warning;
- Secret Debt lock copy overrides inherited-access copy.

## 15. Recommended Chat 2 assembly order

This is the collision-minimized order.

### Step 0 — start from then-current main

Create a new Chat 2 assembly branch from the exact main SHA current at assembly time.

Re-audit:
- `schema.ts`;
- `engine.ts`;
- `app.ts`;
- `localization.json`;
- current Chat 5/6 integration state.

Never base the assembly on either producer branch.

### Step 1 — copy add-only Hard Work files

File-level copy:
- `src/core/hardWorkMeta.ts` from `54d87ad...`;
- production catalog fixture from `54d87ad...`;
- presentation fixture from `54d87ad...`;
- catalog focused test from `54d87ad...`;
- generic synthetic test from `50ede59...`.

Run only the focused tests/typecheck needed to prove these copied files compile on current main.

### Step 2 — bind the production catalog

Add the tiny validated catalog adapter.
Do not touch `definitions.json`.

Run catalog/helper focused tests again.

### Step 3 — integrate save v5 schema/migration

Surgically edit current `schema.ts` and `parseSave()`.

Land migration tests before changing reward generation.

This creates the explicit legacy-current-life boundary before old automatic rewards are removed.

### Step 4 — retire old automatic new-life rewards

On current `engine.ts`:
- remove automatic +3/+3;
- remove Merchant +600 only;
- initialize new v5 package setup empty/unapplied.

Run migration + old Meta tests.

### Step 5 — integrate selection + exactly-once creation application

Add:
- selection command;
- validation;
- finishCreation application before `creationCompleted`.

Run none/some/all + reload tests.

### Step 6 — integrate D21 inherited ordinary-career availability

If Secret Debt is already in current main, preserve its domain-lock check first.

If Secret Debt is still pending, integrate Chat 5's domain-lock engine seam before or in the same commit; do not ship an order where inherited access can bypass it.

Run all-ten availability + Secret Debt combined focused tests.

### Step 7 — replace stale permanent Palace access semantics

In one atomic patch with updated Palace tests:
- stop `ensurePalaceUnlock` projection;
- stop `metaUnlock palace` permanent special-case;
- preserve permanent 10/10 as completion data only;
- use generic all-ten-active qualification seam.

Do not ship a halfway state where tests/content still treat `meta.unlocks['palace']` as access authority.

### Step 8 — bind Palace safe-prep seam

If Chat 6 Palace safe prep is being assembled:
- feed canonical Hard Work qualification into its invitation lifecycle;
- preserve deterministic day-0 `creationCompleted` invitation contract;
- keep Palace authored access state/run fact Palace-owned.

Run Palace combined tests.

### Step 9 — bind New Start+ UI

Surgically edit current `app.ts`; never replace it.
Bind presentation fixture through a small adapter.
Add inherited Work-panel explanation.

If School/Secret Debt/Assassin UI changes landed since this manifest, preserve them and reapply only the Hard Work semantic inserts.

Run UI/accessibility focused tests.

### Step 10 — focused regression set before full CI slot

Before consuming the single full-CI slot, run the smallest available focused/static set covering:
- helper/catalog;
- migration;
- ending Meta exactly-once;
- New Start+ none/some/all;
- career availability;
- Secret Debt precedence if present;
- Palace qualification/invitation if present;
- UI/accessibility.

Only after all focused evidence is clean should Chat 2 consume its one full CI slot.

## 16. File-level collision policy for Chat 2

### Safe add-only / low collision

- `src/core/hardWorkMeta.ts`
- `content/hard-work-package-catalog-v1.fixture.json`
- `content/hard-work-new-start-presentation-v1.fixture.json`
- the two new focused tests
- new tiny catalog/presentation adapter modules

### Shared / semantic merge only

- `src/core/schema.ts`
- `src/core/engine.ts`
- `src/ui/app.ts`
- `content/localization.json` if any residual shared strings are required
- old Hard Work/Palace tests

### Never overwrite from old producer source

- current `definitions.json`
- current `localization.json`
- current `schema.ts`
- current `engine.ts`
- current `app.ts`

## 17. Acceptance checklist before Chat 2 full CI

A candidate is not ready for the CI slot until all are true:

- [ ] source helper/catalog blobs match frozen evidence or reviewed intentional adapter changes;
- [ ] production mapping matches all ten approved packages exactly;
- [ ] no old +3/+3 generation remains for new lives;
- [ ] no Merchant Hard Work +600 generation remains for new lives;
- [ ] existing v4 current-life stats/money are preserved by migration;
- [ ] earned Hard Work remains protected Meta;
- [ ] package activation accepts none/some/all earned;
- [ ] whole-package-only behavior enforced;
- [ ] finishCreation applies selected effects exactly once;
- [ ] package reload before/after finish is stable;
- [ ] D21 inherited access works even when package inactive;
- [ ] Secret Debt domain lock defeats inherited access;
- [ ] Palace qualification requires permanent 10/10 + active 10/10;
- [ ] stale permanent `meta.unlocks['palace']` is not an access substitute;
- [ ] Palace invitation, when integrated, is deterministic Day 1 and run-scoped;
- [ ] RU/EN package copy and ARIA states exist for all ten;
- [ ] current Assassin/School/Secret Debt/Palace changes on main were preserved;
- [ ] no producer full CI was consumed.

## 18. Manifest conclusion

The two frozen Chat 4 candidates are suitable for selective assembly, not branch merge.

The safest integration path is:

`fresh main -> add-only helper/catalog/presentation/tests -> validated catalog adapter -> v5 migration boundary -> retire old automatic rewards -> New Start+ selection/exactly-once apply -> Secret Debt-first D21 availability -> D23 Palace qualification seam -> Palace invitation binding -> UI binding -> focused regressions -> one Chat 2 full CI`.

This order prevents:
- stale branch overwrites;
- double application on migrated lives;
- Hard Work bypassing Secret Debt;
- permanent 10/10 silently granting Palace;
- old +3/+3 / Merchant +600 stacking with the new packages;
- package-copy duplication in shared localization;
- Palace/Hard Work qualification logic drifting into two authorities.
