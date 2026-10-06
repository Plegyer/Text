# Chat 3 — D46 + D47 + Legacy Final Assembly Packet v29

Status: **RESEARCH COMPLETE — READY FOR CHAT2 PREFLIGHT**  
Owner: Chat 3  
Branch: `chat3/d46-d47-legacy-final-assembly-packet-v29`

## Purpose

This is the single final Chat 2 assembly packet for:

- D46 economy / start balance;
- D47 ordinary Hard Work New Start+ package mapping;
- retirement of the obsolete live `lumber-stay` ending while preserving historical `vitality` compatibility.

Chat 2 should not reconstruct the accepted producer/preflight chain separately.

This branch is research/handoff only:

- do not modify production runtime here;
- do not run full CI here;
- Chat 2 owns selective current-main composition and the later integration/full-CI lane.

## Exact accepted sources

- D46 economy/start-balance producer:
  `chat4/economy-start-balance-producer-v14@a0c5f855b63d3bb85556f5b2780aaaabb58fbced`
- D47 Hard Work package producer:
  `chat5/hard-work-bonus-mapping-producer-v13@252dc26c514e24f4ab0f0cc0da7694254282e4c4`
- lumber-stay retirement producer:
  `chat5/lumber-stay-retirement-producer-v17@52bfd82b374ed045b06c9c78f5f3065cd7226bdb`
- accepted assembly preflight:
  `chat5/d46-d47-legacy-assembly-preflight-v18@bed3a78507715f885b60d5b3f7a9824fc44c8de9`

Primary producer implementation anchors:

- D46 runtime:
  `2e898eff8d6c76f9923809e04fc68054ee23ecae`
- D46 wage bases:
  `3b8bd1bf7c5321346153bcfb90722faa54092308`
- D47 mapping:
  `ef2e5f542e3b3cd62a9f59e862d68d3487a7d3ad`
- D47 validator breadth:
  `df7ac6d452a0a9cc9a98a6e1b0a2ce1d1395985f`
- legacy retirement implementation:
  `cbeae73e8559d43fcce24213d6f5606b682b3e7d`
- legacy presentation parity repair:
  `39912e7435c3707d98f96fe550d697c20ac0bedb`

Current production observed during v29 research:

`main@7a687814a25c55cabfc5e75f87043567b0e38d5f`

At that SHA:

- D42 Night is already merged;
- fresh Lust is still 1;
- starting money is still 600;
- base Energy is still 3;
- no D46 ordinary-wage cap/helper exists;
- Lumber ordinary wage base is still 13;
- the other nine ordinary wage bases are still 15;
- the pre-D47 Hard Work package mapping is still live;
- Prostitute still has separate Lust +3;
- live `lumber-stay` still exists;
- Energy still reads legacy `meta.unlocks.includes('vitality')`;
- ending definition count is still 43.

Therefore none of D46, D47, or legacy retirement is already assembled into this observed main.

The final Chat 2 assembly base must still be the **then-current main/assembly head**, not this research-time SHA if production moves further.

---

# 1. Exact composition order

Required order:

```text
then-current Chat 2 production base
-> D46
-> D47
-> lumber-stay retirement / legacy normalization
-> focused QA
-> Chat 2 full CI lane
```

## Phase 0 — freeze and inspect the real base

Before applying any producer delta:

1. fetch the exact current Chat 2/main base SHA;
2. verify whether D46, D47, or retirement has already landed independently;
3. re-read current:
   - `src/core/engine.ts`;
   - `src/core/hardWorkMeta.ts`;
   - `content/definitions.json`;
   - `content/hard-work-package-catalog-v1.fixture.json`;
   - `content/localization.json`;
   - `content/presentation.json`;
   - `content/presentation-drafts/presentation-hardening-v9-manifest-v1.json`;
   - `src/ui/app.ts`;
   - current save/migration code and tests.
4. preserve all newer D42, Secret Debt/D51, Palace, Activity, Strong Meta, presentation and localization work already present on the base.

Do not start by copying any producer file wholesale.

## Phase 1 — apply D46 first

Selectively apply the D46 semantics:

### Fresh life

- fresh Lust: **1 -> 5**;
- starting money stays **600**;
- base Energy stays **3**;
- all 12 progression stats still start at 1.

The Lust change is fresh-life only.

Never rewrite an already stored in-progress/migrated Lust value to 5.

### Ordinary wage seam

Add the shared ordinary-shift wage seam with:

`ORDINARY_SHIFT_WAGE_CAP = 120`

and the accepted behavior equivalent to:

```text
min(
  120,
  round(
    authored ordinary wage base
    + sum(pre-shift current stat * frozen authored factor)
  )
)
```

Rules:

- only the ten ordinary `<career>.shift` actions use this seam;
- wage inputs are captured before the shift mutates relevant stats;
- existing D31 seasonal processing remains after the committed ordinary wage;
- no other wage family is routed through this cap.

### Wage bases

Set exactly:

- Lumber: **35**
- Satyr Maid: **37**
- Undead Farm: **37**
- Tavern: **37**
- Hunter: **37**
- Guard: **37**
- Merchant: **37**
- Artist/Geisha: **37**
- Assassin: **37**
- Prostitute: **37**

Preserve all existing per-career wage weights exactly.

## Phase 2 — apply D47 on top of D46

Use the existing ordinary Hard Work package architecture.

Do not create a parallel reward/loadout system.

Apply the exact D47 mapping in section 4 and tighten the shared package validator so:

- first five careers contain exactly one +5 progression-stat component;
- later five careers contain exactly two +5 progression-stat components;
- only Prostitute contains a separate Lust component;
- Prostitute separate Lust component is exactly +5.

Keep package application timing unchanged:

- package must first be earned;
- earning does not auto-select;
- selected package applies once when character creation finishes;
- applied snapshot persists;
- reload does not reapply.

## Phase 3 — apply lumber-stay retirement last

Apply the legacy v17 semantics selectively on top of the D46+D47 result.

Required live-catalog result:

- remove the obsolete live ending `lumber-stay`;
- retain:
  - `ending.lumber.hard-work`;
  - `ending.lumber.forewoman`;
  - `ending.lumber.forest`;
- remove all new-play acquisition of reward `vitality`;
- retire live `ending/lumber-stay` presentation/source inventory.

Add the legacy compatibility module/semantics:

- historical ending identity remains exactly `lumber-stay`;
- historical old unlock remains exactly `vitality` as an input-only migration identity;
- normalized legacy perk is:
  `legacy.lumber-stay.vitality`.

After normalization, historical ownership contributes exactly +1 daily Energy through the legacy perk, not through a live unlock.

## Phase 4 — inspect the assembled semantic union

Before tests, verify the result contains all three domains simultaneously:

- D46 fresh-Lust and ordinary-wage behavior;
- D47 package map/validation;
- legacy retirement/migration/presentation behavior.

No current-main feature may disappear because an older producer blob replaced a newer file.

---

# 2. Shared-file conflicts and exact treatment

## D46 + D47

No direct production-file conflict.

D47 was authored on the frozen D46 base, so this is an ordering dependency:

**D46 first, D47 second.**

## D46 + legacy v17

Direct production overlaps:

- `content/definitions.json`;
- `src/core/engine.ts`.

These are **manual-preserve-both** conflicts.

### `content/definitions.json`

D46 owns:

- only the ten ordinary shift wage-base changes.

Legacy v17 owns:

- removal of only the obsolete `lumber-stay` ending.

Final file must contain both.

Do not restore old wages while retiring the ending, and do not retain `lumber-stay` while updating wages.

### `src/core/engine.ts`

D46 owns:

- fresh Lust 5;
- ordinary wage helper/cap;
- pre-shift wage commit behavior.

Legacy owns:

- historical Meta normalization;
- legacy Energy contribution;
- retired-ending save migration/validation;
- historical RunResult compatibility.

Final engine must contain both.

## D47 + legacy v17

No direct production-file overlap in the frozen sources, but there is a critical semantic firewall:

historical `lumber-stay` / `vitality` evidence must **never** create ordinary Hard Work progress, package ownership, or package activation.

## New conflict introduced by already-merged D42

Since accepted v18 was written, D42 was merged into current main.

Relative to the v18 research snapshot, current main now has newer edits in:

- `content/definitions.json`;
- `content/localization.json`;
- `content/presentation.json`;
- `src/ui/app.ts`;
- presentation runtime/content surfaces.

Therefore legacy v17 presentation/localization/UI files are now also **manual/key-level composition surfaces**.

Do not wholesale-copy v17 versions of:

- localization;
- presentation registry;
- app UI;
- definitions.

Preserve all D42 Night entries and presentation bindings while removing only the retired lumber-stay live surface and adding only historical legacy-display behavior.

---

# 3. Start money / Energy / wage invariants

## Fresh baseline

Required fresh profile with no package and no legacy evidence:

- money = **600**;
- Energy max/current baseline = **3**;
- Lust = **5**;
- all 12 progression stats = **1**.

D46 does not introduce any additional starting money.

## Existing saves

D46 does not rewrite stored Lust.

Example:

- existing stored Lust 17 -> stays 17.

Migration must not interpret D46 as a request to reset old characters to Lust 5.

## Historical lumber-stay Energy

After legacy normalization:

- no historical evidence -> Energy baseline **3**;
- historical `lumber-stay`, old `vitality`, or already-normalized legacy perk -> exactly one legacy +1 -> Energy baseline **4** before independent Strong Meta modifiers;
- duplicate historical evidence must still produce only +1 total;
- `vitality` must not remain a live normal unlock after normalization.

Strong Meta Energy behavior remains additive under its existing rules.

## Ordinary wage bases and weights

Exact D46 map:

| Career | Base | Frozen wage weights |
| --- | ---: | --- |
| Lumber | 35 | Strength 0.5 + Endurance 0.25 |
| Satyr Maid | 37 | Charm 0.35 + Sexuality 0.25 |
| Undead Farm | 37 | Endurance 0.3 + Magic 0.3 + Reason 0.2 |
| Tavern | 37 | Charm 0.3 + Wits 0.3 + Manners 0.2 |
| Hunter | 37 | Dexterity 0.35 + Endurance 0.3 + Wits 0.2 |
| Guard | 37 | Endurance 0.3 + Manners 0.25 + Strength 0.2 + Reason 0.15 |
| Merchant | 37 | Wits 0.35 + Charm 0.25 + Manners 0.2 + Reason 0.15 |
| Artist/Geisha | 37 | Manners 0.3 + Charm 0.3 + Sexuality 0.15 + Dexterity 0.15 |
| Assassin | 37 | Dexterity 0.35 + Wits 0.3 + Reason 0.2 + Manners 0.1 |
| Prostitute | 37 | Sexuality 0.35 + Charm 0.3 + Manners 0.2 + Endurance 0.15 |

All relevant stats at 1 must produce:

- Lumber ordinary shift = **36**;
- each of the other nine ordinary shifts = **38**.

Every ordinary shift is capped at **120**, including cap-200 lives.

## Wage isolation

The D46 ordinary cap must not affect:

- Secret Debt hidden work;
- Palace structural duty/support wages;
- generic/non-ordinary `hunt`;
- any other non-`<ordinary-career>.shift` wage identity.

Preserve:

- D43 Palace wage;
- D44 Secret Debt wage;
- D31 ordinary seasonal handling;
- D24 stat-cap semantics.

---

# 4. Exact D47 Hard Work package bindings

Use exactly this package catalog:

| Ordinary career | D47 package |
| --- | --- |
| Lumber | Strength +5 |
| Satyr Maid | Charm +5 |
| Undead Farm | Magic +5 |
| Tavern | Wits +5 |
| Hunter | Dexterity +5 |
| Guard | Endurance +5, Manners +5 |
| Merchant | Reason +5, Sociability +5 |
| Artist/Geisha | Creativity +5, Grooming +5 |
| Assassin | Dexterity +5, Wits +5 |
| Prostitute | Sexuality +5, Charm +5, separate Lust +5 |

Required global invariants:

- first five packages: exactly one progression-stat +5;
- later five packages: exactly two progression-stat +5;
- total progression-stat bonus points over all ten packages = **75**;
- all 12 progression stats appear somewhere in the complete mapping;
- only Prostitute has a separate Lust component;
- package, not each component, remains the selectable unit;
- arbitrary earned subset may be selected;
- no one-package slot restriction;
- no Strong Meta Keystone/Specialist slot consumption;
- D24 clips each +5 progression component at the current effective cap;
- D23 counts ten ordinary package identities, not individual stat components.

## Critical removals from the old mapping

Final production must not retain these retired values:

- Satyr Maid -> Grooming +5;
- Tavern -> Sociability +5;
- Merchant -> Wits +5 + Reason +5;
- Prostitute Lust +3.

Final production must use the D47 table above.

## Starting money firewall

Merchant D47 package must never recreate the retired Merchant +600 start-money direction.

Examples:

- Merchant package earned but unselected:
  money 600.
- Merchant package selected:
  money still 600;
  Reason 6;
  Sociability 6.

## Prostitute + D46 interaction

Fresh D46 Lust baseline = 5.

Selected Prostitute package at creation completion:

- Sexuality 1 -> 6;
- Charm 1 -> 6;
- Lust 5 -> **10**.

No duplicate apply after reload.

---

# 5. Lumber-stay / vitality migration

Stable compatibility identities:

```text
retired historical ending: lumber-stay
retired historical unlock input: vitality
normalized legacy perk: legacy.lumber-stay.vitality
```

## Meta normalization

Historical ownership is true if any of these exists:

- completed endings contains `lumber-stay`;
- raw old unlocks contains `vitality`;
- active legacy perks already contains `legacy.lumber-stay.vitality`.

Normalize to:

- deduped completed ending history;
- remove `vitality` from live/raw unlock ownership;
- add at most one `legacy.lumber-stay.vitality`.

This operation must be idempotent.

## Legacy Energy effect

The normalized legacy perk contributes exactly:

**+1 daily Energy**

It consumes:

- no Strong Meta Keystone slot;
- no Strong Meta Specialist slot;
- no ordinary Hard Work package slot;
- no D23 package identity.

It is historical compatibility only, not a new reward.

## Historical ending state cases

### Already completed historical lumber-stay

Preserve:

- historical ending ID;
- original RunResult when present;
- original transaction ID;
- original completion day;
- historical applied reward IDs as audit data.

Ensure transaction proof exists exactly once.

Do not replay reward acquisition.

### Ended pre-RunResult old save

Synthesize deterministic compatibility proof anchored to the original run.

Required:

- `firstCompletion = false`;
- `appliedMetaRewardIds = []`;
- no reward replay;
- stable/deterministic result/transaction compatibility.

### Eligible-only lumber-stay

Retirement behavior:

- remove eligibility;
- grant nothing;
- keep unrelated state unchanged.

### Committed-but-unfinished lumber-stay

Retirement behavior:

- clear obsolete commit/result state;
- if run was `ending_committed`, resume `active`;
- preserve unrelated run state;
- grant nothing unless independent historical completed/unlock evidence already exists.

## D47 firewall

Historical `lumber-stay` or `vitality` must never:

- add `hardWorkProgress: ['lumber']`;
- earn/select the Lumber Strength +5 package;
- fabricate `ending.lumber.hard-work`;
- convert 24 historical Lumber visits into 50 completed shifts;
- satisfy one of the ten Palace D23 ordinary career package identities.

## Live presentation retirement

After assembly:

- no live `ending/lumber-stay` presentation slot;
- no active exact/source-inventory row for that live ending;
- historical display remains non-interactive;
- historical display uses legacy localization and neutral Lumber-result presentation;
- exact-static ending presentation parity reflects the retired ending.

Do not delete historical display compatibility merely because the live ending is gone.

---

# 6. Canonical 40-ending count

D46 changes no ending definitions.

D47 changes no ending definitions.

Legacy v17 removes exactly one obsolete live ending: `lumber-stay`.

Required ordinary-career live surface:

**40 canonical ordinary-career endings**

Lumber live endings are exactly:

- `ending.lumber.hard-work`;
- `ending.lumber.forewoman`;
- `ending.lumber.forest`.

`lumber-stay` is historical-only and is not a 41st canonical ordinary ending.

Generic:

- `guild-life`;
- `scholar-life`;

remain outside the canonical ordinary-career 40.

On the observed current catalog:

- before retirement: 43 total ending definitions;
- after retiring only `lumber-stay`: expected total catalog ending definitions = **42**.

Presentation exact-static ending parity after retirement is **8**, not the stale pre-retirement 9.

Do not “repair” that test by reintroducing `lumber-stay`.

---

# 7. Save / migration risks and required invariants

## Fresh vs migrated Lust

- fresh life -> Lust 5;
- existing stored Lust -> unchanged;
- no global migration rewrite to 5.

## D47 package application

- earned != selected;
- selected != already applied;
- apply only once at creation completion;
- persist applied snapshot;
- reload cannot reapply;
- already-applied historical character stats are not retroactively rewritten to the new D47 map.

D47 changes the package catalog for future application, not the already-committed stats of an existing life.

## Historical legacy dedupe

Multiple simultaneous evidence forms:

- completed `lumber-stay`;
- raw `vitality`;
- existing normalized legacy perk;

must still yield exactly one normalized perk and +1 Energy.

## Profile merge

Legacy perk sets must union/dedupe.

Do not duplicate +1 because both profiles contain equivalent historical evidence.

Do not merge run-local ending transaction state incorrectly into permanent Meta.

## RunResult proof

Preserve historical transaction identity when available.

For synthesized pre-RunResult compatibility:

- deterministic proof;
- no new reward transaction;
- no first-completion grant.

## Strong Meta isolation

Neither D47 packages nor `legacy.lumber-stay.vitality` become Strong Meta rewards.

Do not add them to:

- `ownedRewardIds`;
- Keystone selection;
- Specialist selection.

## Palace isolation

D23 remains:

- all ten permanent ordinary Hard Work identities earned;
- all ten active ordinary packages in the current creation.

Historical lumber-stay/vitality cannot fill a missing career.

## Secret Debt isolation

D46 ordinary wage handling must not touch Secret Debt hidden work.

Legacy migration must not create, clear, or satisfy Secret Debt state.

D47 mapping must not change forced Night, debt, repayment, Takeover, or ordinary-career bound lock.

## D42 preservation

Because D42 is already in main, any legacy localization/presentation/UI composition must retain all current D42 Night:

- definitions;
- localization;
- presentation bindings;
- UI behavior.

No old v17 file may overwrite those additions.

---

# 8. Focused test bundle for Chat 2

Run from:

`mindy-successor/prior-work/astra/prototype-m3.2`

First:

```text
npm run typecheck
npm run validate
npm run build
```

## D46 economy + 50-shift lifecycle

```text
node --experimental-strip-types --test
tests/economy-start-balance-v14.test.ts
tests/ordinary-hard-work-meta-production.test.ts
tests/ordinary-hard-work-lifecycle-parity.test.ts
tests/lumber-hard-work-invariant.test.ts
tests/hard-work-stat-cap-d24.test.ts
```

Required semantic checks include:

- fresh Lust 5;
- migrated stored Lust preserved;
- starter wages 36 / 38;
- ordinary cap 120;
- pre-shift wage inputs;
- non-ordinary wage isolation.

## D47 mapping / creation / migration

```text
node --experimental-strip-types --test
tests/hard-work-bonus-mapping-v13.test.ts
tests/hard-work-package-catalog-runtime.test.ts
tests/hard-work-meta-infra-prep.test.ts
tests/hard-work-meta-migration-v5.test.ts
tests/hard-work-newstart-presentation-v2.test.ts
tests/hard-work-newstart-ui-v2.test.ts
tests/ending-meta.test.ts
```

Required semantic checks include:

- exact ten-package map;
- 75 progression-stat bonus points;
- all 12 progression stats represented;
- Prostitute separate Lust +5;
- D46 Lust 5 -> selected Prostitute Lust 10;
- Merchant never changes starting money;
- package apply exactly once;
- D23 package identity count remains ten.

## Legacy migration / RunResult / presentation

```text
node --experimental-strip-types --test
tests/lumber-stay-retirement-v17.test.ts
tests/migration.test.ts
tests/advanced-endings-tranche-a-v11.test.ts
tests/presentation-source-integrity-v9.test.ts
tests/presentation-ending-parity-v9.test.ts
```

Required semantic checks include:

- no live lumber-stay;
- no new vitality acquisition;
- historical normalization/dedupe;
- +1 Energy exactly once;
- incomplete obsolete states cancelled safely;
- historical RunResult identity preserved;
- pre-RunResult compatibility proof does not replay reward;
- exact-static presentation count 8.

## Strong Meta / Palace / Secret Debt isolation

```text
node --experimental-strip-types --test
tests/strong-meta-engine-integration-v7.test.ts
tests/strong-meta-registry-v7.test.ts
tests/hard-work-palace-meta-smoke.test.ts
tests/palace-d23-consumer-integration-v8.test.ts
tests/chat3-secret-debt-separation-v2.test.ts
```

## Current-main D42 preservation

Because D42 is now already merged before this tranche, also retain/run the authoritative current D42 focused suite on the final assembled branch, including at minimum:

`tests/night-content-gap-v10.test.ts`

and any current renamed/replacement Night presentation/localization tests required by the current main.

Do not drop the Night domain merely because v18 predates the D42 merge.

Only after all focused checks are green should Chat 2 use its normal full-CI lane.

---

# 9. Stop conditions

Stop selective assembly and reconcile instead of improvising if any of these occurs:

1. The actual Chat 2 base already contains D46/D47/retirement semantics with different accepted values.
2. Fresh Lust is not exactly 5 after D46.
3. An existing saved Lust value is rewritten to 5.
4. Starting money changes from 600.
5. Base Energy changes from 3 for a fresh non-legacy profile.
6. Ordinary wage bases differ from Lumber 35 / other nine 37.
7. Ordinary wage cap differs from 120.
8. Any frozen D31 wage factor changes.
9. Secret Debt, Palace, hunt, or another non-ordinary wage enters the D46 ordinary wage seam.
10. Merchant D47 package changes money.
11. Prostitute separate Lust remains +3 or becomes anything other than +5.
12. D47 package mapping differs from the exact table in section 4.
13. D47 creates a new package slot/loadout architecture or consumes Strong Meta slots.
14. Historical `lumber-stay` creates ordinary Hard Work progress/package ownership.
15. `vitality` remains a live normal unlock after migration.
16. Duplicate historical evidence yields more than one legacy perk or more than +1 Energy.
17. `lumber-stay` remains a live ending or live ending presentation slot.
18. Canonical ordinary-career ending count becomes 41 instead of 40.
19. Expected total ending count on the observed catalog is not 42 after removal of exactly one legacy live ending.
20. Presentation parity is forced back to 9 by restoring the retired ending.
21. Palace D23 qualification changes due to legacy history.
22. Secret Debt state/wage/forced-Night semantics change.
23. D42 definitions/localization/presentation/UI disappear or regress during v17 composition.
24. Typecheck, validate, build, or any focused domain test fails.

On any such failure:

**do not run full CI and do not report the tranche ready.**

---

# 10. What must not be copied wholesale

Do not replace complete current-main files from any D46/D47/legacy producer branch.

Specifically do not wholesale-copy:

- D46 `src/core/engine.ts`;
- D46 `content/definitions.json`;
- D47 `src/core/hardWorkMeta.ts`;
- D47 `content/hard-work-package-catalog-v1.fixture.json` without checking current catalog drift;
- legacy v17 `src/core/engine.ts`;
- legacy v17 `content/definitions.json`;
- legacy v17 `content/localization.json`;
- legacy v17 `content/presentation.json`;
- legacy v17 presentation manifest;
- legacy v17 `src/ui/app.ts`;
- producer task/current-pointer docs.

The unique legacy helper:

`src/core/lumberStayLegacy.ts`

is a direct-add candidate only after confirming the path does not already exist and its callers are composed into the current engine/migration flow.

All other shared files require semantic/key-level composition.

Never roll back newer:

- D42 Night content/presentation/UI;
- Strong Meta;
- D40/D41 endings;
- current schema/save migrations;
- Secret Debt/D51;
- Palace;
- Activity;
- current presentation/localization registry state.

---

# 11. Final acceptance matrix

After correct composition:

| Case | Money | Energy | Lust | Required result |
| --- | ---: | ---: | ---: | --- |
| fresh, no package, no legacy | 600 | 3 | 5 | all progression stats 1 |
| Merchant earned, unselected | 600 | 3 | 5 | no auto effect |
| Merchant selected/applied | 600 | 3 | 5 | Reason 6, Sociability 6 |
| Prostitute selected/applied | 600 | 3 | 10 | Sexuality 6, Charm 6 |
| historical lumber-stay/vitality owner | unchanged by legacy | base +1 exactly | unchanged by legacy | one normalized legacy perk |
| duplicate historical evidence | unchanged | still only +1 legacy | unchanged | deduped |
| historical lumber-stay only | unchanged | +1 legacy | unchanged | no Hard Work/package conversion |

Ordinary Hard Work lifecycle for each of ten careers remains:

```text
49 completed shifts
-> next ordinary shift reaches exactly 50
-> ending.<career>.hard-work eligible
-> run remains active
-> explicit commit
-> explicit completeEnding
-> one hardWork:<career> proof
-> career added once to meta.hardWorkProgress
-> future life may explicitly select package
-> package applies once at creation completion
```

For Lumber, 50 Hard Work shifts must not synthesize:

- Forewoman;
- Forest;
- management-school readiness;
- historical `lumber-stay`.

---

# 12. Final assembly summary

The required selective semantic stack is:

```text
actual current Chat 2/main base
+ D46 fresh Lust 5
+ D46 ordinary wages 35/37 + cap 120 + pre-shift inputs
+ D47 exact ten Hard Work package mappings
+ D47 package breadth validator
+ remove live lumber-stay
+ normalize historical lumber-stay/vitality
  -> legacy.lumber-stay.vitality
  -> exactly +1 Energy
+ preserve historical RunResult/transaction compatibility
+ retire live lumber-stay presentation
+ preserve all newer D42/current-main content
+ focused cross-domain gate
```

Non-negotiable invariants:

- money = 600;
- fresh Energy = 3;
- fresh Lust = 5;
- existing Lust preserved;
- ordinary wage cap = 120 only for ten ordinary shifts;
- Merchant package gives Reason +5 + Sociability +5, no money;
- Prostitute package gives Sexuality +5 + Charm +5 + Lust +5;
- Hard Work packages use no Strong Meta slots;
- historical lumber-stay gives only one legacy +1 Energy;
- historical lumber-stay gives no Hard Work identity/package;
- canonical ordinary endings = 40;
- total observed catalog endings after retirement = 42;
- live `lumber-stay` is gone;
- D42/current-main content must survive composition.

**READY_FOR_CHAT2_PREFLIGHT**
