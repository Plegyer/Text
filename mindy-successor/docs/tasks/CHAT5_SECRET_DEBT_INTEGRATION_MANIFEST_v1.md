# Chat 5 — Secret Debt current-main integration manifest / collision QA

Status: **INTEGRATION PLAN ONLY — DO NOT MERGE WHOLE PRODUCER BRANCH**
Owner: Chat 5
Manifest branch: `chat5/secret-debt-integration-manifest-v1`
Manifest base: current `main = 223135d62b41c0add3cd621f756d8fad63072b39`

Immutable Secret Debt candidate evidence:
- candidate head: `9dd6c010d45bffe1fdca365f1c3d7033684ec5cf`;
- assigned foundation: `9ee5dd227db85b1987acd099e15ed274cb085110`;
- candidate is 78 commits ahead of its foundation and 0 behind that foundation;
- against current main it is diverged: candidate +78 / current-main +18;
- therefore **never merge or overwrite the whole candidate branch onto current main**.

The balance proposal at
`docs/tasks/CHAT5_SECRET_DEBT_BALANCE_PROPOSAL.md`
is proposal-only evidence and is not integration authority.

## 1. Exact candidate file delta and classification

Candidate `9dd6c010...` vs assigned foundation `9ee5dd227...`:

| File | Foundation delta | Classification | Current-main handling |
| --- | --- | --- | --- |
| `docs/tasks/CHAT5_SECRET_DEBT_BALANCE_PROPOSAL.md` | added, +182 | Secret-Debt-local docs | evidence only; never translate proposal values into runtime |
| `docs/tasks/CHAT5_SECRET_DEBT_PRODUCT_BLOCKERS.md` | added, +129 | Secret-Debt-local docs | preserve as historical/current authority ledger as applicable |
| `content/definitions.json` | +371 | **SHARED COLLISION** | selective object insertion only |
| `content/localization.json` | +204 | **SHARED COLLISION** | selective key insertion only |
| `content/packs/secret-debt.json` | added, +314 | Secret-Debt-local production | safe source file to transplant, subject to current schema validation |
| `content/secret-debt-separation-regression-v2.fixture.json` | +32/-31 | Secret-Debt-local QA fixture | transplant/update fixture only |
| `src/core/engine.ts` | +19/-8 | **SHARED COLLISION** | re-apply semantic hunks by function; never copy whole file |
| `src/core/presentation.ts` | +5/-2 | **SHARED COLLISION** | re-apply three Secret Debt presentation semantics only |
| `src/core/secretDebt.ts` | added, +151 | Secret-Debt-local runtime helper | safe source file to transplant; balance constants remain open |
| `src/ui/app.ts` | +16/-10 | **SHARED COLLISION** | re-apply Secret Debt UI hunks by symbol/panel |
| `tests/chat3-secret-debt-separation-v2.test.ts` | +25/-31 | Secret-Debt-local focused regression | update focused regression only |
| `tests/secret-debt-career.test.ts` | added, +468 | Secret-Debt-local focused regression | transplant and adapt only for current-main APIs if required |
| `tests/secret-debt-ui.test.ts` | added, +177 | Secret-Debt-local focused regression | transplant and adapt only for current-main UI markup if required |

The current main has independently changed `definitions.json`, `localization.json`, `presentation.ts`, `app.ts`, and `schema.ts` since the Secret Debt foundation. Current main also contains shipped Artist/Geisha and Prostitute/Professional production content. Whole-file replacement from the Secret Debt candidate would regress shipped product state.

## 2. Shared-file semantic insert inventory

All line numbers below are **candidate-head evidence anchors**, not instructions to paste by line number into current main.

### `src/core/engine.ts`

Secret Debt candidate edits are confined to these semantics:

1. **Import boundary** — candidate line 4:
   import Secret Debt constants/helpers from `./secretDebt.ts`.

2. **Action availability** — candidate lines 256–259:
   - reject ordinary career action while bound through `secretDebtBlocksOrdinaryAction`;
   - reject `secret-debt.shift` while open shift tuning is not ready;
   - leave ordinary starter/late-career availability logic otherwise intact.

3. **Ordinary-career write lock** — candidate lines 374–376 and 386:
   while bound, suppress ordinary-career
   `incrementCareerCounter`, `addCareerFact`, `setCareerChoice`, and `advanceCareer`.
   Do not alter quest/relationship/world-state effects globally.

4. **One chance attempt per eligible street night** — candidate line 590:
   when the lender chance is attempted, mark
   `secret-debt.lender-encounter` handled for that Night even on a failed roll.
   A later street night gets a new deterministic RNG attempt.

5. **Resolver domain lock** — candidate lines 620–623:
   reject ordinary-career `sourceDomain` events while bound.

6. **Queued-event domain lock** — candidate lines 650–653:
   reject queued ordinary-career events while bound.

7. **Ordinary ending commit lock** — candidate lines 776–779:
   pre-earned ordinary endings remain present but cannot be committed while bound.

8. **Exactly-10-day activation hook** — candidate lines 973–976:
   after day-start Energy modifiers are applied/reset, call
   `secretDebtActivationDue`; if true, advance
   `secret-debt / activate-bound`.
   Do not move this into School, Activity, or an ordinary-career resolver.

9. **Optional-offer lock** — candidate lines 1162–1165:
   an already queued ordinary-career optional offer cannot be opened while bound.

10. **Hidden shift tuning seam** — candidate lines 1233–1239:
    - hidden shift receives stat effects from `secretDebtShiftStatEffects()`;
    - hidden wage uses `secretDebtWageDefinition()`;
    - ordinary seasonal/wage handling remains unchanged.
    Because balance values are still open, `actionAvailable` keeps the hidden paid shift disabled until tuning is actually authorized.

### `content/definitions.json`

Selective insertion only; preserve every current-main ordinary-career object.

Secret Debt action objects:
- `secret-debt.shift` — candidate line 4167;
- `secret-debt.repay` — candidate line 4241;
- `secret-debt.takeover` — candidate line 4305.

Secret Debt ending objects:
- `ending.secret-debt.paid-freedom` — candidate line 5047;
- `ending.secret-debt.bound-life` — candidate line 5062;
- `ending.secret-debt.takeover` — candidate line 5084.

Secret Debt machine:
- career `secret-debt` — candidate line 6290;
- states: `unseen`, `refused`, `accepted`, `bound`, `resolved-paid`, `resolved-takeover`;
- D19 transitions include acceptance principal record, bound activation with 20000 debt, full repayment resolution and explicit takeover resolution.

Do not replace the surrounding `actions`, `endings`, or `careers` arrays wholesale.

### `content/localization.json`

Merge only Secret Debt-owned keys:
- `ui.secretDebt.*`;
- `action.secret-debt.*`;
- `profession.secret-debt.*`;
- `career.secret-debt.*`;
- `event.secret-debt.*`;
- `ending.ending.secret-debt.*`.

Candidate Secret Debt localization begins around candidate line 10489 and continues through the Secret Debt action/event/ending strings around line 10687.

Never replace the current-main localization object. Current main contains large shipped Artist/Geisha and Prostitute/Professional RU/EN additions, and pending School D20 also changes this file.

### `src/core/presentation.ts`

Exactly three Secret Debt semantics:

1. candidate line 109 — add `secret-debt` to recognized job IDs;
2. candidate lines 1063–1064 — `sourceDomain === 'secret-debt'` falls back to `job/secret-debt/result/default`;
3. candidate line 1116 — skip career `secret-debt` when generating ordinary Hard Work presentation identities.

Preserve current-main Artist/Geisha/Prostitute presentation logic and any later Assassin additions.

### `src/ui/app.ts`

Secret Debt semantic inserts:

1. candidate line 11 — import only Secret Debt UI helpers/constants;
2. lines 179–180 — ordinary profession list stays exactly the ordinary ten; hidden shift is recognized separately;
3. lines 364–376 — disabled/help/forecast display:
   - show debt-lock help for ordinary work;
   - allow hidden shift stat/wage preview only through authorized helper seams;
4. line 463 — Secret Debt completed ending uses localized Secret Debt epilogue;
5. line 506 — Work panel adds separate binding-debt section, current debt, repayment, and conditional takeover action;
6. line 516 — Bag panel may display binding debt separately from legacy generic debt;
7. line 517 — Legacy/ending panel displays ordinary-ending lock while bound and disables commit.

Do not overwrite current-main Artist/Geisha/Prostitute work/presentation UI or pending Assassin UI changes.

## 3. Collision matrix against live and pending work

### Shipped Artist/Geisha

Main commit:
`a3afe650a05a4a27be5953b4f3965db0a420573c`
— “Merge Artist/Geisha complete career assembly”.

Direct collision files:
- `definitions.json`;
- `localization.json`;
- `presentation.ts`;
- `app.ts`.

Assembly rule: start from current main and insert Secret Debt IDs/hunks. Never restore candidate copies of these shared files.

### Shipped Prostitute/Professional

Main commit:
`6a6029df8e9c007227da0173eb499d59ba51648e`
— “Merge Prostitute complete career assembly”.

Direct collision files:
- `definitions.json`;
- `localization.json`;
- `presentation.ts`;
- `app.ts` and current UI assumptions.

Assembly rule: identical to Artist — preserve shipped objects/keys/UI and add Secret Debt selectively.

### Pending Assassin

Current producer lane:
`chat3/assassin-complete-reset-v1`.

Compared with current main, Assassin currently touches:
- `definitions.json`;
- `localization.json`;
- `schema.ts`;
- `app.ts`;
- Assassin-local packs/tests.

Collision:
- direct with Secret Debt `definitions.json`, `localization.json`, `app.ts`;
- no reason for Secret Debt assembly to take Assassin `schema.ts` changes.

Assembly rule:
- if Assassin lands first, apply Secret Debt on top of shipped Assassin;
- if Secret Debt assembly is prepared first, Chat 2 must re-audit those three shared files before merge;
- never resolve by choosing one whole producer file over the other.

Chat 3 also has a Leader-approved ordinary seasonal-negative tradeoff task after Assassin. That work will edit ordinary-career shift entries in `definitions.json`; Secret Debt assembly must preserve those ordinary action edits and insert only `secret-debt.*` objects.

### Pending School D20

Frozen producer head from current Chat 2 pointer:
`877927cf747ba9f69a53ddccf4373b795561f3a0`
on the School D20 lane.

The producer branch `chat3/school-body-confidence-lust-v1` currently touches:
- `localization.json`;
- `src/core/school.ts`;
- School fixtures/tests.

Collision:
- direct file collision only in `localization.json`;
- semantic dependency: Takeover counts **10 paid School lessons** and future balance may use D20 Body Confidence Lust growth;
- Secret Debt candidate does not own or patch `school.ts`.

Assembly rule:
- preserve D20 `school.ts` exactly;
- merge Secret Debt localization by Secret Debt prefixes only;
- verify `actionCounts.school` still means paid School lessons;
- Night Study must not count as paid lessons and must not inherit D20 Lust gain;
- forced Secret Debt Night must not grant Lust.

### Hard Work / New Start+

Current Chat 4 lane:
`chat4/hard-work-package-catalog-v1`.

At current-main comparison this branch is isolated to
`src/core/hardWorkMeta.ts`, but its future integration will affect shared Meta/New Start behavior.

Secret Debt invariants:
- Secret Debt is outside the ordinary ten;
- `secret-debt` must never be appended to `ordinaryHardWorkCareers`;
- Bound Life at 50 shifts is only the hidden-route Hard Work analogue;
- Secret Debt endings currently have `metaRewards: []`;
- `presentation.ts` explicitly skips `secret-debt` in ordinary Hard Work identity generation;
- do not create a `hardWork:secret-debt` reward;
- do not include Secret Debt in ordinary New Start+ package selection unless Product later creates a distinct authorized hidden-route package.

### Palace safe prep

Current Chat 6 lane:
`chat6/palace-authored-safe-v5`.
At the observed current-main comparison it has no executable shared delta yet.

Collision is semantic, not current file-level:
- Palace prerequisite remains the ordinary 10/10 Hard Work;
- Secret Debt does not count toward that ten;
- Secret Debt must not alter all-12 Palace stat semantics or Palace cap/reward work;
- no Secret Debt Meta proposal may be promoted merely to satisfy New Start/Palace infrastructure.

## 4. Chat 2 selective-assembly procedure

**Never merge `chat5/secret-debt-complete-reset-v1` wholesale.**

Recommended assembly sequence from then-current main:

1. create a fresh Chat 2 assembly branch from exact current main;
2. copy Secret-Debt-local source files:
   - `src/core/secretDebt.ts`;
   - `content/packs/secret-debt.json`;
3. selectively insert the three Secret Debt actions, three endings and one career machine into current `definitions.json`;
4. selectively merge only Secret Debt-prefixed localization keys;
5. re-apply the `engine.ts` semantics in §2 by function/symbol against current code;
6. re-apply the three `presentation.ts` semantics in §2;
7. re-apply the Secret Debt `app.ts` semantics in §2 against current UI, preserving all shipped/pending career code;
8. carry focused Secret Debt fixture/tests:
   - `content/secret-debt-separation-regression-v2.fixture.json`;
   - `tests/chat3-secret-debt-separation-v2.test.ts`;
   - `tests/secret-debt-career.test.ts`;
   - `tests/secret-debt-ui.test.ts`;
9. treat blocker/proposal docs as evidence; do not make runtime decisions from proposal-only numbers;
10. run focused/static validation first; only Chat 2/Leader may then consume the serialized full-CI slot.

After every shared-file assembly, audit for duplicate IDs and accidental deletion of current-main objects/keys.

## 5. Locked D19 invariant audit at candidate head

Static inspection of immutable candidate `9dd6c010...` confirms:

- lender chance:
  `base=0.20`, `perPoint=0`, `max=0.20`;
- one-time lender encounter has `maxShows=1`;
- acceptance effect grants exactly `money +2000`;
- `SECRET_DEBT_ACTIVATION_DELAY_DAYS = 10`;
- `activate-bound` creates exactly `debt_current +20000`;
- forced Night:
  - `after_lodging`;
  - lodging payment is not suppressed;
  - voluntary Night menu is suppressed;
  - Night is consumed;
  - `maxShows=160`;
  - next-day Energy modifier is exactly `-1`;
- repayment is one explicit action costing exactly `20000`, requires full debt and full money, and reduces `debt_current` by `20000`;
- Bound Life eligibility is `bound + completed_shifts >= 50`;
- Takeover structural conditions include `completed_shifts >= 50` and `visits school >= 10`, plus still-open authorized build/Lust facts;
- all three Secret Debt endings have `metaRewards: []`;
- therefore candidate does not write ordinary `hardWorkProgress` or Palace 10/10.

Focused-test inventory present at candidate:

`tests/secret-debt-career.test.ts` covers:
- D19 constants + open tuning seams;
- deterministic 20% lender RNG and refusal;
- once-per-night lender chance;
- failed-roll retry after persisted RNG;
- +2000 and accepted-day reload;
- exact day-10 activation + 20000 debt;
- ordinary-domain lock and progress preservation;
- School and Large Activity availability;
- forced Night and -1 Energy exactly once across reload;
- one-shot repayment and lock release;
- 50-shift Bound Life with open shift tuning;
- Takeover structural gates / open numeric gates;
- presentation IDs and RU/EN surfaces.

`tests/secret-debt-ui.test.ts` covers:
- bound ordinary-work UI lock with preserved progress;
- localized Paid Freedom ending after reload;
- pre-earned ordinary ending visible-but-locked while bound, then unlocked after repayment.

This manifest task does **not** run producer full CI.

## 6. Balance-open firewall — do not promote proposal numbers

At immutable candidate `9dd6c010...` the following production constants remain intentionally open:

### `src/core/secretDebt.ts`

Candidate lines 21–24:
- `SECRET_DEBT_SHIFT_STAT_GAINS.strength = null`;
- `...endurance = null`;
- `...sexuality = null`.

Candidate lines 28–32:
- `SECRET_DEBT_WAGE_POLICY.base = null`;
- `strengthFactor = null`;
- `enduranceFactor = null`;
- `lustFactor = null`.

Candidate lines 35–37:
- `SECRET_DEBT_TAKEOVER_GATES.statThresholds = null`;
- `lustThreshold = null`.

The helper functions deliberately return no hidden shift stat/wage package until these values are Product-authorized.

### `content/definitions.json`

Candidate endings:
- `ending.secret-debt.paid-freedom`: candidate lines 5057–5058 — `reward: secret-debt.reward.pending`, `metaRewards: []`;
- `ending.secret-debt.bound-life`: lines 5079–5080 — same pending/empty reward state;
- `ending.secret-debt.takeover`: lines 5094–5095 — same pending/empty reward state.

Do **not** substitute values from
`CHAT5_SECRET_DEBT_BALANCE_PROPOSAL.md`
unless Leader/Product explicitly promotes them into authority.

## 7. Save / migration / lock-release acceptance checklist

Chat 2 assembly acceptance should verify all of the following.

### Clean / legacy save compatibility

- [ ] Existing schema-v4 save with no Secret Debt state loads without materializing `secret-debt`.
- [ ] Existing v1/v2/v3 migration path still reaches v4 without requiring Secret Debt fields.
- [ ] Ordinary career progression/meta remains byte-for-byte semantically usable when Secret Debt has never appeared.

### Encounter persistence

- [ ] Failed lender chance is attempted at most once in the same eligible street Night.
- [ ] Save/reload after a failed roll preserves RNG/handled state and does not create a duplicate same-night roll.
- [ ] A later eligible street Night receives a fresh deterministic roll.
- [ ] Refusal persists and permanently closes the one-time encounter for that life.
- [ ] Acceptance grants +2000 exactly once.
- [ ] Acceptance persists `accepted_day` and does not duplicate money/history on reload.

### Delayed trap

- [ ] Days 1–9 after acceptance remain `accepted`, debt still inactive.
- [ ] Exactly day 10 advances to `bound` and creates exactly 20000 debt.
- [ ] Save/reload around day-10 activation does not double-create principal or lose the activation scene.

### Bound ordinary-career lock

- [ ] All ten ordinary shift actions are unavailable while bound.
- [ ] Existing ordinary career counters/facts/choices/stages are preserved.
- [ ] Ordinary-career effect writes are suppressed while bound.
- [ ] Ordinary `sourceDomain` events and queued events cannot progress while bound.
- [ ] Already queued ordinary optional offers cannot be opened while bound.
- [ ] Pre-earned ordinary endings remain visible/eligible state but cannot be committed while bound.
- [ ] School remains available.
- [ ] Large Activity remains available.
- [ ] Secret Debt never enters ordinary `hardWorkProgress` or Palace 10/10.

### Forced Night

- [ ] Forced event occurs after lodging every bound night.
- [ ] Lodging is paid exactly once.
- [ ] Voluntary Night menu is suppressed.
- [ ] Forced Night is consumed exactly once.
- [ ] Next-day Energy -1 applies exactly once.
- [ ] Save/reload while the forced event is pending does not duplicate lodging, event history, counter increments or the next-day modifier.
- [ ] Forced Secret Debt Night does not increase Lust.

### Exit / release

- [ ] Repayment is unavailable below 20000 held money.
- [ ] Full repayment deducts exactly 20000 once and clears `debt_current`.
- [ ] Paid Freedom resolution releases the ordinary-career domain lock.
- [ ] Previously preserved ordinary career progress is usable again immediately after release.
- [ ] Subsequent Night no longer forces Secret Debt work.
- [ ] Bound Life eligibility at 50 shifts does **not** itself release the bound lock.
- [ ] Takeover remains unavailable while numeric build/Lust gates are balance-open.
- [ ] Once a future authorized Takeover action resolves the route, ordinary domain lock releases without mutating prior ordinary progress.

### Ending lifecycle

- [ ] Paid Freedom / Bound Life / Takeover stay distinct ending IDs.
- [ ] Eligibility remains non-terminal until explicit commit.
- [ ] Save/reload between eligibility, commit and complete preserves exactly one ending result transaction.
- [ ] Secret Debt Meta rewards remain empty/pending until separately authorized.

## 8. Integration disposition

The candidate is valuable as **selective source evidence**, not as a mergeable branch.

Highest-risk shared collisions:
1. `content/definitions.json`;
2. `content/localization.json`;
3. `src/ui/app.ts`;
4. `src/core/presentation.ts`;
5. `src/core/engine.ts` as future shared-runtime collision surface.

Safe principle:
**current main wins for all non-Secret-Debt semantics; re-apply only the Secret Debt IDs/functions/hunks listed in this manifest.**
