# Chat 5 — D46 + D47 + Legacy Ending Assembly Preflight v18

Status: **READY_FOR_CHAT2_PREFLIGHT**  
Owner: Chat 5  
Scope: research / selective-assembly preflight only. No production runtime mutation in this branch. No full CI.

## 1. Frozen authorities

Frozen producer heads were re-verified as branch heads:

- D46 economy / start balance:
  `chat4/economy-start-balance-producer-v14@a0c5f855b63d3bb85556f5b2780aaaabb58fbced`
- D47 Hard Work mapping:
  `chat5/hard-work-bonus-mapping-producer-v13@252dc26c514e24f4ab0f0cc0da7694254282e4c4`
- lumber-stay retirement:
  `chat5/lumber-stay-retirement-producer-v17@52bfd82b374ed045b06c9c78f5f3065cd7226bdb`

Preflight working branch:

`chat5/d46-d47-legacy-assembly-preflight-v18`

Leader-synced branch head inspected before this handoff:

`17e5e149772e558b16e0342334fb966df42d9721`

Current production snapshot observed during preflight:

`main@9cb45ccd731326bcc005f935a0e37112463f8f6f`

The production tree of that main snapshot is the same as the preflight branch parent for this scope; the only additional main drift since the preflight branch point is task-pointer documentation.

## 2. Current-main state before this tranche

This tranche is not already partially assembled into the observed current main.

At `main@9cb45ccd731326bcc005f935a0e37112463f8f6f`:

- fresh-run Lust is still **1**;
- starting money is **600**;
- base Energy is **3**;
- no `ORDINARY_SHIFT_WAGE_CAP` / `ordinaryShiftWage` seam exists;
- ordinary wage bases are still Lumber **13** and the other nine **15**;
- the old Hard Work package mapping is still present:
  - Satyr Maid -> Grooming +5;
  - Tavern -> Sociability +5;
  - Merchant -> Wits +5 + Reason +5;
  - Prostitute separate Lust +3;
- `lumber-stay` is still a live ending with reward `vitality`;
- Energy still reads legacy ownership from `meta.unlocks.includes('vitality')`;
- total ending definitions are **43** before retirement.

The observed current-main production blobs for every file changed by legacy v17 are identical to the declared v17 production base
`main@f36de067ae2e82518360dbe045f71c700e200805`.
Therefore v17 currently has a clean semantic base on observed main. Chat 2 must re-check this fact against its then-current main before assembly.

## 3. Exact source production deltas

### 3.1 D46 — economy / start balance

Exact production files changed by the frozen D46 source:

1. `mindy-successor/prior-work/astra/prototype-m3.2/content/definitions.json`
2. `mindy-successor/prior-work/astra/prototype-m3.2/src/core/engine.ts`

Exact production implementation commits:

- `2e898eff8d6c76f9923809e04fc68054ee23ecae`
  - adds `ORDINARY_SHIFT_WAGE_CAP = 120`;
  - adds `ordinaryShiftWage(action, save)`;
  - changes fresh-run Lust **1 -> 5**;
  - commits ordinary wages from pre-shift wage inputs;
  - keeps non-ordinary wage actions outside this seam.
- `3b8bd1bf7c5321346153bcfb90722faa54092308`
  - Lumber wage base **13 -> 35**;
  - each of the other nine ordinary career wage bases **15 -> 37**;
  - all existing wage stat weights remain unchanged.

D46 test files introduced/adjusted by the producer include:

- `tests/economy-start-balance-v14.test.ts`
- `tests/hard-work-stat-cap-d24.test.ts`
- `tests/ordinary-hard-work-meta-production.test.ts`

The final D46 frozen head also contains documentation-only handoff material.

### 3.2 D47 — Hard Work bonus mapping

D47 is explicitly based on the frozen D46 head.

Exact production files changed by the frozen D47 source:

1. `mindy-successor/prior-work/astra/prototype-m3.2/content/hard-work-package-catalog-v1.fixture.json`
2. `mindy-successor/prior-work/astra/prototype-m3.2/src/core/hardWorkMeta.ts`

Production mapping commit:

`ef2e5f542e3b3cd62a9f59e862d68d3487a7d3ad`

It changes only the central package catalog mapping:

- Lumber -> Strength +5
- Satyr Maid -> Charm +5
- Undead Farm -> Magic +5
- Tavern -> Wits +5
- Hunter -> Dexterity +5
- Guard -> Endurance +5 + Manners +5
- Merchant -> Reason +5 + Sociability +5
- Artist/Geisha -> Creativity +5 + Grooming +5
- Assassin -> Dexterity +5 + Wits +5
- Prostitute -> Sexuality +5 + Charm +5 + separate Lust +5

The producer also changes the catalog status marker to
`D47_LOCKED_PRODUCTION_MAPPING`.

Commit
`df7ac6d452a0a9cc9a98a6e1b0a2ce1d1395985f`
tightens the shared validator so the first five packages contain exactly one +5 progression-stat component and the later five contain exactly two.

D47 producer tests introduced/adjusted include:

- `tests/hard-work-bonus-mapping-v13.test.ts`
- `tests/hard-work-meta-infra-prep.test.ts`
- `tests/hard-work-meta-migration-v5.test.ts`
- `tests/hard-work-newstart-presentation-v2.test.ts`
- `tests/hard-work-newstart-ui-v2.test.ts`
- `tests/hard-work-package-catalog-runtime.test.ts`
- `tests/ending-meta.test.ts`

No D47 production change touches wages, ending definitions, Palace implementation, Secret Debt implementation, Strong Meta reward slots, School, Activity, or Night.

### 3.3 Lumber-stay retirement / legacy compatibility

Exact production files changed by frozen legacy v17:

1. `mindy-successor/prior-work/astra/prototype-m3.2/content/definitions.json`
2. `mindy-successor/prior-work/astra/prototype-m3.2/content/localization.json`
3. `mindy-successor/prior-work/astra/prototype-m3.2/content/presentation-drafts/presentation-hardening-v9-manifest-v1.json`
4. `mindy-successor/prior-work/astra/prototype-m3.2/content/presentation.json`
5. `mindy-successor/prior-work/astra/prototype-m3.2/src/core/engine.ts`
6. `mindy-successor/prior-work/astra/prototype-m3.2/src/core/lumberStayLegacy.ts` — new
7. `mindy-successor/prior-work/astra/prototype-m3.2/src/ui/app.ts`

Primary implementation commit:

`cbeae73e8559d43fcce24213d6f5606b682b3e7d`

Focused QA found one stale presentation-parity test expectation after the correct retirement reduced exact-static ending bindings from 9 to 8. The narrow test-only repair is:

`39912e7435c3707d98f96fe550d697c20ac0bedb`

Final frozen v17 head adds only the executable-evidence handoff:

`52bfd82b374ed045b06c9c78f5f3065cd7226bdb`

Production semantics to preserve exactly:

- no live `lumber-stay` definition;
- no new `vitality` reward acquisition;
- historical ending identity remains exactly `lumber-stay`;
- historical ownership normalizes to
  `meta.activeLegacyPerks = ['legacy.lumber-stay.vitality']` at most once;
- historical perk contributes exactly +1 daily Energy;
- legacy perk consumes no Strong Meta, Keystone, Specialist, or Hard Work slot;
- no conversion to Forewoman, Forest, or Hard Work;
- historical UI is non-interactive and uses legacy localization plus neutral Lumber result presentation;
- live `ending/lumber-stay` presentation/source inventory is retired.

## 4. Production overlap / conflict matrix

| Pair | Same production files | Conflict class | Required assembly treatment |
| --- | --- | --- | --- |
| D46 + D47 | none | dependency, not file conflict | D46 first because D47 was authored/tested on D46 base |
| D46 + legacy v17 | `content/definitions.json`, `src/core/engine.ts` | same-file, semantically orthogonal | manually preserve both sets of hunks; never choose one source file wholesale |
| D47 + legacy v17 | none | semantic adjacency only | retain strict firewall between historical `lumber-stay` and `hardWorkProgress` / package ownership |
| D46 + D47 + current main | D46 source baseline is older than current production | baseline drift | transplant D46/D47 hunks or commits as patches; do not copy their complete `engine.ts` or `definitions.json` blobs |
| legacy v17 + observed current main | all v17 production bases currently match `f36de067...` | clean at preflight snapshot | still re-check then-current main before Chat 2 applies v17 |

### Same-file D46 / legacy details

`content/definitions.json`:
- D46 changes only the ten ordinary `<career>.shift` wage bases;
- legacy v17 removes only the obsolete `lumber-stay` ending definition;
- preserve the three canonical Lumber endings:
  `ending.lumber.hard-work`,
  `ending.lumber.forewoman`,
  `ending.lumber.forest`.

`src/core/engine.ts`:
- D46 owns fresh Lust 5 and the ordinary wage calculation/payment seam;
- legacy owns historical Meta normalization, `energyMax` legacy-perk contribution, retired-ending save migration/validation, and historical RunResult compatibility;
- neither semantic should replace the other.

This is **manual-preserve-both**, even if Git happens to auto-merge the textual hunks.

## 5. Exact composition order for Chat 2

Use the then-current Chat 2 assembly head as the base. Do not assemble from any producer branch by replacing whole files.

### Step 0 — re-check current-main drift

Before applying anything, verify:

- D46 target wage bases are not already present;
- fresh Lust is not already 5 from another accepted tranche;
- D47 package mapping is not already present;
- `lumber-stay` is still live or, if already retired by another accepted assembly, compare exact semantics before applying v17 again;
- current task/recovery pointer files are preserved from Chat 2, not producer branches.

### Step 1 — apply D46 first

Apply the D46 production hunks:

1. `engine.ts` from `2e898eff...`
2. `definitions.json` from `3b8bd1bf...`

Then bring forward the D46 focused regression expectations from the frozen source.

Required resulting values:

- fresh Lust = 5;
- money = 600;
- base Energy = 3;
- Lumber base wage = 35;
- other nine bases = 37;
- ordinary cap = 120;
- pre-shift wage inputs are used;
- non-ordinary wages remain outside this cap/seam.

### Step 2 — apply D47 on top of D46

Apply:

1. package catalog mapping from `ef2e5f542...`;
2. validator breadth rule from `df7ac6d452...`;
3. associated D47 test expectation updates through frozen head `252dc26c...`.

Do not create a new reward/loadout architecture.

### Step 3 — apply legacy v17 last

Apply the v17 production changes from `cbeae73e...` selectively on top of the D46+D47 result.

Important:
- keep D46's fresh Lust and wage code in `engine.ts`;
- keep D46's wage-base edits in `definitions.json`;
- remove only the obsolete `lumber-stay` ending row;
- retain all D47 package catalog / validator changes;
- add `lumberStayLegacy.ts`;
- apply localization/presentation retirement and historical UI exactly;
- apply the parity test correction from `39912e743...`.

Do **not** cherry-pick producer `CURRENT_CHAT5_TASK_POINTER.md` versions into Chat 2.

### Step 4 — inspect the assembled delta before tests

The combined runtime/content delta should contain the union of:

- D46 wage/start changes;
- D47 package mapping/validator;
- legacy ending retirement/migration/presentation.

It must contain no unrelated producer-branch baseline rollback.

## 6. Cross-tranche migration risks and required behavior

### 6.1 Fresh vs existing Lust

D46 changes only fresh-life baseline Lust to 5.

Required:
- fresh profile: Lust 5;
- migrated/in-progress profile with stored Lust, e.g. 17: remains 17;
- do not rewrite old saves to 5 merely because D46 is assembled.

### 6.2 D47 application timing / idempotence

D47 packages remain opt-in earned profession packages.

Required:
- earned package does not auto-apply;
- selected package applies once when creation finishes;
- already-applied package snapshot is not re-applied after save/load;
- Merchant package never restores retired +600 starting money;
- Prostitute package uses D46 base Lust 5 and produces Lust 10 when selected/applied.

Do not retroactively rewrite already-applied historical character stats.

### 6.3 Historical lumber-stay must not become Hard Work

This is the highest-risk D47/legacy semantic boundary.

A historical `lumber-stay` completion or `vitality` row must:
- grant/preserve only `legacy.lumber-stay.vitality`;
- not add `hardWorkProgress: ['lumber']`;
- not unlock/select the Lumber Strength +5 package;
- not fabricate `ending.lumber.hard-work`;
- not convert 24 legacy visits into 50 completed shifts.

### 6.4 Historical Energy vs D46 base Energy

After composition:

- fresh new profile with no legacy evidence: daily Energy max/current start = **3**;
- historical `lumber-stay` or `vitality` owner: exactly **4** from base 3 + legacy +1;
- duplicate old `vitality` / normalized perk evidence still yields only +1;
- Strong Meta Energy effects remain additive under their existing rules.

### 6.5 RunResult / transaction identity

For already-ended historical `lumber-stay`:
- preserve old result ID;
- preserve old transaction ID;
- preserve completion day;
- preserve historical applied reward IDs as audit data;
- ensure transaction proof exists exactly once.

For an ended pre-RunResult old save:
- synthesize deterministic compatibility proof anchored to the original run;
- `firstCompletion = false`;
- `appliedMetaRewardIds = []`;
- never replay the old reward.

### 6.6 Incomplete old ending state

Eligible-only `lumber-stay`:
- remove eligibility;
- grant nothing.

Committed-but-unfinished `lumber-stay`:
- clear commit/result;
- if `ending_committed`, resume `active`;
- preserve unrelated run state;
- grant nothing unless independent historical Meta evidence already exists.

### 6.7 Presentation inventory

After retirement:
- no live `ending/lumber-stay` slot;
- no activeExact/source-inventory semantic row for it;
- exact-static ending parity count is 8, not the stale pre-retirement 9;
- historical display must remain non-interactive.

## 7. Fresh-run and economy acceptance matrix

After D46 + D47 + legacy assembly:

| Case | Money | Energy | Lust | Notes |
| --- | ---: | ---: | ---: | --- |
| fresh profile, no packages, no legacy | 600 | 3 | 5 | all 12 progression stats start at 1 |
| fresh profile, Merchant package earned but not selected | 600 | 3 | 5 | no automatic money/stat reward |
| fresh profile, Merchant package selected and creation finished | 600 | 3 | 5 | Reason 6, Sociability 6 |
| fresh profile, Prostitute package selected and creation finished | 600 | 3 | 10 | Sexuality 6, Charm 6 |
| historical lumber-stay/vitality owner, no modern package | 600 | 4 | fresh/migrated Lust rules above | exactly one legacy Energy +1 |
| historical lumber-stay owner | unchanged by legacy | +1 legacy only | unchanged by legacy | no Hard Work package ownership |

## 8. Ordinary-career wage checks

Exact D46 bases and frozen weights:

- Lumber: base 35; Strength 0.5 + Endurance 0.25
- Satyr Maid: base 37; Charm 0.35 + Sexuality 0.25
- Undead Farm: base 37; Endurance 0.3 + Magic 0.3 + Reason 0.2
- Tavern: base 37; Charm 0.3 + Wits 0.3 + Manners 0.2
- Hunter: base 37; Dexterity 0.35 + Endurance 0.3 + Wits 0.2
- Guard: base 37; Endurance 0.3 + Manners 0.25 + Strength 0.2 + Reason 0.15
- Merchant: base 37; Wits 0.35 + Charm 0.25 + Manners 0.2 + Reason 0.15
- Artist/Geisha: base 37; Manners 0.3 + Charm 0.3 + Sexuality 0.15 + Dexterity 0.15
- Assassin: base 37; Dexterity 0.35 + Wits 0.3 + Reason 0.2 + Manners 0.1
- Prostitute: base 37; Sexuality 0.35 + Charm 0.3 + Manners 0.2 + Endurance 0.15

With all relevant stats at 1:
- Lumber ordinary shift = **36**;
- each of the other nine ordinary shifts = **38**.

All ten:
- use the pre-shift wage inputs;
- are capped at **120** even with D24 cap-200 stats;
- retain existing D31 seasonal processing after the committed ordinary wage calculation.

The D46 cap must not affect:
- Secret Debt hidden work;
- Palace structural work;
- generic/non-ordinary `hunt`;
- any other non-`<ordinary-career>.shift` wage identity.

## 9. Hard Work 50-shift lifecycle checks

For every one of the ten ordinary careers:

1. at 49 `completed_shifts`, Hard Work is not complete;
2. the next ordinary shift moves the counter to exactly 50;
3. `ending.<career>.hard-work` becomes eligible;
4. the run remains active; eligibility does not auto-commit;
5. explicit `commitEnding` is required;
6. explicit `completeEnding` creates one RunResult;
7. exactly one Meta reward proof is applied:
   `hardWork:<career>`;
8. `meta.hardWorkProgress` gains that career once;
9. repeating completion cannot duplicate the reward or transaction;
10. next life does not auto-activate the package;
11. the earned package may then be selected explicitly and applied once at creation completion.

For Lumber specifically, reaching 50 Hard Work shifts must not synthesize:
- Forewoman facts;
- Forest facts;
- management-school readiness;
- historical `lumber-stay`.

## 10. D47 mapping acceptance checks

Exact package map:

| Career | D47 package |
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

Global invariants:
- first five packages: exactly one progression-stat +5;
- later five: exactly two progression-stat +5;
- total progression-stat bonus points across all ten = **75**;
- all 12 progression stats appear in the full mapping;
- only Prostitute has separate Lust bonus;
- arbitrary earned subset may be selected;
- whole profession package is the selectable unit;
- D24 clips each +5 component at the current effective stat cap;
- package identity count for D23 remains ten, not 15 stat components plus Lust.

## 11. Canonical ending count after composition

D46 changes wages only. D47 changes Hard Work package rewards only. Neither adds/removes ending definitions.

Legacy v17 removes exactly the obsolete live `lumber-stay`.

Required resulting ending surface:

- **40 canonical ordinary-career endings**;
- Lumber canonical live endings exactly:
  - `ending.lumber.hard-work`
  - `ending.lumber.forewoman`
  - `ending.lumber.forest`
- `lumber-stay` remains historical-only;
- generic `guild-life` and `scholar-life` remain outside the ordinary-career 40.

Expected total catalog ending definitions after this retirement on the observed base: **42**.

Historical `lumber-stay` is not a 41st canonical ordinary ending and is not part of the canonical denominator.

## 12. Strong Meta / Palace / Secret Debt firewalls

### Strong Meta

Required:
- ordinary Hard Work packages consume no Keystone or Specialist slots;
- `legacy.lumber-stay.vitality` consumes no Strong Meta slot;
- legacy evidence creates no Strong Meta reward ownership;
- D47 mapping changes only ordinary package contents.

### Palace

Required:
- D23 qualification still requires all ten permanent ordinary Hard Work package identities earned **and** all ten active in the current creation;
- historical `lumber-stay` does not count toward the ten;
- duplicate ordinary progress or `secret-debt` cannot substitute for a missing ordinary career;
- no permanent `palace` meta unlock is fabricated by this tranche;
- Palace wage remains untouched by D46 ordinary wage cap.

### Secret Debt

Required:
- D46 ordinary wage cap does not touch hidden Secret Debt work;
- D47 package mapping does not change Secret Debt discovery/debt/forced-Night/exit semantics;
- legacy `lumber-stay` migration does not create or satisfy Secret Debt state;
- `secret-debt` never counts as an ordinary Hard Work package for Palace.

## 13. Exact focused QA Chat 2 should run

Run from:

`mindy-successor/prior-work/astra/prototype-m3.2`

Do not substitute a producer full-file snapshot for the selective assembly before running these checks.

### Build / schema gate

```text
npm run typecheck
npm run validate
npm run build
```

### D46 economy + 50-shift lifecycle

```text
node --experimental-strip-types --test tests/economy-start-balance-v14.test.ts tests/ordinary-hard-work-meta-production.test.ts tests/ordinary-hard-work-lifecycle-parity.test.ts tests/lumber-hard-work-invariant.test.ts tests/hard-work-stat-cap-d24.test.ts
```

### D47 package mapping / creation / migration

```text
node --experimental-strip-types --test tests/hard-work-bonus-mapping-v13.test.ts tests/hard-work-package-catalog-runtime.test.ts tests/hard-work-meta-infra-prep.test.ts tests/hard-work-meta-migration-v5.test.ts tests/hard-work-newstart-presentation-v2.test.ts tests/hard-work-newstart-ui-v2.test.ts tests/ending-meta.test.ts
```

### Legacy ending migration / RunResult / presentation

```text
node --experimental-strip-types --test tests/lumber-stay-retirement-v17.test.ts tests/migration.test.ts tests/advanced-endings-tranche-a-v11.test.ts tests/presentation-source-integrity-v9.test.ts tests/presentation-ending-parity-v9.test.ts
```

### Strong Meta / Palace / Secret Debt isolation

```text
node --experimental-strip-types --test tests/strong-meta-engine-integration-v7.test.ts tests/strong-meta-registry-v7.test.ts tests/hard-work-palace-meta-smoke.test.ts tests/palace-d23-consumer-integration-v8.test.ts tests/chat3-secret-debt-separation-v2.test.ts
```

Chat 2 may then run its integration-lane full CI according to its own assembly authority. This Chat 5 preflight intentionally does not run full CI.

## 14. Assembly stop conditions

Stop and resolve before proceeding if any selective assembly produces one of these states:

- fresh Lust returns to 1 or existing-save Lust is rewritten to 5;
- ordinary wage bases are not exactly 35/37 or the cap is not exactly 120;
- Merchant package changes starting money;
- Prostitute package remains Lust +3 instead of +5;
- historical `lumber-stay` creates `hardWorkProgress`;
- `vitality` remains a normal live unlock after migration;
- a historical owner gets Energy +2 from duplicate evidence;
- `lumber-stay` remains in live endings/presentation;
- canonical ordinary ending count becomes 41;
- Palace qualification changes because of legacy history;
- Secret Debt wage/route semantics enter the ordinary wage cap;
- Strong Meta slot ownership changes because of D47 or legacy;
- presentation ending parity is restored to stale 9 by reintroducing the retired ending.

## 15. Final preflight conclusion

The three frozen sources are composition-compatible with a selective assembly.

Required order:

**D46 -> D47 -> lumber-stay legacy retirement**

The only direct production file overlap is D46 vs legacy in:

- `content/definitions.json`
- `src/core/engine.ts`

Those overlaps are semantically independent and must be merged by preserving both behaviors.

Do not replace complete source files from the older D46/D47 producer baseline. Do not import producer task pointers into Chat 2. Re-check the then-current main before applying the tranche.

**READY_FOR_CHAT2_PREFLIGHT**
