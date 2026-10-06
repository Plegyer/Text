# Chat 4 — Lumber Retirement Exact-Head QA v31

Status: **EXACT_HEAD_QA_GREEN — READY_FOR_CHAT2_ASSEMBLY**  
Owner: Chat 4  
QA branch: `chat4/career-producers-exact-head-qa-bundle-v29`

Exact frozen implementation under test:

`39912e7435c3707d98f96fe550d697c20ac0bedb`

Accepted producer handoff branch:

`chat5/lumber-stay-retirement-producer-v17@52bfd82b374ed045b06c9c78f5f3065cd7226bdb`

The frozen implementation was not mutated.  
No full CI was run.

## Implementation SHA vs handoff head

The accepted handoff head `52bfd82b...` is exactly one commit after the executable implementation `39912e74...`.

Git comparison:

- base: `39912e7435c3707d98f96fe550d697c20ac0bedb`
- head: `52bfd82b374ed045b06c9c78f5f3065cd7226bdb`
- ahead by: **1**
- changed file: only `mindy-successor/docs/tasks/CHAT5_LUMBER_STAY_RETIREMENT_PRODUCER_v17.md`

Therefore:

- executable implementation identity = `39912e7435c3707d98f96fe550d697c20ac0bedb`
- accepted documentation/handoff branch head = `52bfd82b374ed045b06c9c78f5f3065cd7226bdb`

These identities must not be conflated.

## Executable evidence

Workflow:

- name: `Chat 4 lumber retirement exact-head QA v31`
- workflow ID: `376381411`
- run ID: `37463168157`
- job ID: `112267534042`
- runner: self-hosted Windows X64
- Node: 22.18.0
- conclusion: **SUCCESS**

## Exact implementation SHA guard

Checkout was pinned to:

`39912e7435c3707d98f96fe550d697c20ac0bedb`

Runtime log:

`Exact frozen lumber retirement implementation: 39912e7435c3707d98f96fe550d697c20ac0bedb`

Result: **PASS**.

## Static/build gates

- `npm ci` — **PASS**
- `npm run typecheck` — **PASS**
- `npm run validate` — **PASS**
- `npm run build` — **PASS**

Validation output:

`Content OK: 84 packs, 357 events, 39 actions, 42 endings.`

Build output:

`Built renderer, content catalog and desktop save validator.`

## Focused executable groups

### Group 1 — retirement acceptance

`tests/lumber-stay-retirement-v17.test.ts`

Result:

- **9 / 9 PASS**
- 0 fail

### Group 2 — ending migration / RunResult adjacency

- `tests/ending-meta.test.ts`
- `tests/migration.test.ts`
- `tests/advanced-endings-tranche-a-v11.test.ts`

Result:

- **31 / 31 PASS**
- 0 fail

### Group 3 — reload/profile/presentation retirement

- `tests/lumber-stay-retirement-v17.test.ts`
- `tests/presentation-source-integrity-v9.test.ts`
- `tests/presentation-ending-parity-v9.test.ts`

Result:

- **15 / 15 PASS**
- 0 fail

### Group 4 — isolation

- `tests/strong-meta-engine-integration-v7.test.ts`
- `tests/hard-work-palace-meta-smoke.test.ts`
- `tests/hard-work-meta-migration-v5.test.ts`
- `tests/chat3-secret-debt-separation-v2.test.ts`

Result:

- **20 / 20 PASS**
- 0 fail

## Live retirement confirmed

The dedicated v17 test passed:

`v17 live ordinary-career surface is exactly canonical 40 and has no lumber-stay/vitality acquisition`

Confirmed:

- no live `lumber-stay` ending;
- no new `vitality` acquisition;
- canonical ordinary-career live ending count remains exactly **40**;
- current Lumber live endings remain:
  - `ending.lumber.hard-work`
  - `ending.lumber.forewoman`
  - `ending.lumber.forest`

Historical `lumber-stay` is compatibility evidence only and does not count toward canonical 40.

## Historical normalization confirmed

Historical evidence:

- completed `lumber-stay`;
- historical `vitality`;
- or both

normalizes conservatively to exactly one:

`legacy.lumber-stay.vitality`

in:

`meta.activeLegacyPerks`

The old `vitality` unlock itself is stripped from the modern generic unlock list.

No canonical modern ending is fabricated from vitality-only evidence.

No evidence grants nothing.

## +1 Energy exactly once

The historical compatibility perk preserves:

- normal base Energy 3 -> effective Energy **4**
- exactly **+1 daily Energy**

The benefit is represented by one deduped legacy perk identity.

Profile merge and repeated parse do not stack the perk.

The dedicated test passed:

`profile merge dedupes historical perk and strips duplicate vitality evidence`

Therefore repeated historical evidence cannot create +2/+3 Energy.

## No Hard Work/package conversion

The historical retirement path does not convert lumber-stay/vitality into:

- `meta.hardWorkProgress`;
- an active Hard Work package;
- Strong Meta ownership;
- a Keystone;
- a Specialist;
- Palace qualification.

Dedicated acceptance verifies empty Hard Work progress and empty Strong Meta ownership for historical lumber-stay compatibility.

The isolation bundle remains green.

## Migration/reload idempotence

Confirmed cases:

### Eligible-only old state

- retired ending eligibility removed;
- no reward;
- no completion fabricated.

### Committed but unfinished old state

- obsolete commit cancelled;
- run resumes active;
- no reward.

### Existing historical RunResult

- result identity preserved exactly;
- transaction proof preserved exactly;
- no reward replay.

### Ended pre-RunResult save

- deterministic compatibility RunResult/proof created;
- `firstCompletion=false`;
- no applied reward IDs fabricated;
- second load is idempotent.

The dedicated repeated-load assertion passed.

## Presentation retirement confirmed

The dedicated test passed:

`live presentation/source inventory retires ending/lumber-stay while legacy localization remains available`

Confirmed:

- no live `ending/lumber-stay` presentation slot;
- no live reachability/source-manifest binding;
- current ending parity inventory excludes it;
- old live `ending.lumber-stay.*` localization is absent;
- legacy historical localization remains available;
- historical UI is non-interactive;
- neutral Lumber result imagery is reused for legacy history.

Presentation parity/source integrity bundle is green.

## Narrow QA-only implementation repair preserved

The executable target `39912e74...` is one commit after original implementation head:

`cbeae73e8559d43fcce24213d6f5606b682b3e7d`

That delta changes only:

`tests/presentation-ending-parity-v9.test.ts`

with 2 additions / 2 deletions, updating stale exact counts from 9 to 8 after intentional retirement.

No runtime/content/migration/presentation registry behavior changed in that repair.

## Preserved isolation

Green adjacency confirms no new coupling with:

- Strong Meta;
- Palace;
- Hard Work;
- Secret Debt.

Forewoman, Forest Compact, modern Hard Work package semantics and other canonical endings remain unaffected.

## Disposition

**EXACT_HEAD_QA_GREEN — READY_FOR_CHAT2_ASSEMBLY**
