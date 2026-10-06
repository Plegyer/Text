# Chat 4 — D47 Hard Work Exact-Head QA v30

Status: **EXACT_HEAD_QA_GREEN — READY_FOR_CHAT2_ASSEMBLY**  
Owner: Chat 4  
QA branch: `chat4/career-producers-exact-head-qa-bundle-v29`

Frozen producer under test:

`chat5/hard-work-bonus-mapping-producer-v13@252dc26c514e24f4ab0f0cc0da7694254282e4c4`

The frozen producer was not mutated.  
No full CI was run.

## Executable evidence

Workflow:

- name: `Chat 4 D47 Hard Work exact-head QA v30`
- workflow ID: `376379202`
- run ID: `37462886959`
- job ID: `112266586737`
- runner: self-hosted Windows X64
- Node: 22.18.0
- conclusion: **SUCCESS**

## Exact SHA guard

Checkout was pinned to:

`252dc26c514e24f4ab0f0cc0da7694254282e4c4`

Runtime log:

`Exact frozen D47 producer: 252dc26c514e24f4ab0f0cc0da7694254282e4c4`

Result: **PASS**.

## Static/build gates

- `npm ci` — **PASS**
- `npm run typecheck` — **PASS**
- `npm run validate` — **PASS**
- `npm run build` — **PASS**

Validation output:

`Content OK: 82 packs, 329 events, 39 actions, 22 endings.`

Build output:

`Built renderer, content catalog and desktop save validator.`

## Focused executable result

The exact-head focused bundle covered 22 D47/Hard Work/Strong Meta/Palace/advanced-ending adjacency test files.

Result:

- tests: **103**
- pass: **103**
- fail: **0**
- cancelled/skipped/todo: **0**

The focused run includes the dedicated:

`tests/hard-work-bonus-mapping-v13.test.ts`

plus package runtime/migration, New Start+, D23/D24, Strong Meta, Palace, Secret Debt separation and representative ordinary ending adjacency.

## Exact D47 package mapping confirmed

The production catalog matches exactly:

- Lumber -> Strength +5
- Satyr Maid -> Charm +5
- Undead Farm -> Magic +5
- Tavern -> Wits +5
- Hunter -> Dexterity +5
- Guard -> Endurance +5, Manners +5
- Merchant -> Reason +5, Sociability +5
- Artist/Geisha -> Creativity +5, Grooming +5
- Assassin -> Dexterity +5, Wits +5
- Prostitute -> Sexuality +5, Charm +5, separate Lust +5

The first five packages contain exactly one +5 progression-stat component.

The later five contain exactly two +5 progression-stat components.

Total progression-stat bonus across all ten packages remains **75**.

Prostitute's Lust +5 is separate from progression-stat component counting.

## Package identity and application semantics confirmed

The selectable unit remains the **profession package**, not individual stat components.

The exact-head QA confirms:

- arbitrary earned subsets remain valid;
- no one-slot package restriction exists;
- package effects apply atomically at `finishCreation`;
- package application occurs exactly once;
- save/reload cannot reapply package effects;
- once creation is finished, the loadout cannot be changed;
- pre-package old-run migration remains non-retroactive.

The dedicated reload assertion passed:

`reload never reapplies package effects`

## D46 + Prostitute interaction confirmed

Fresh D46 base Lust is 5.

With active Prostitute Hard Work package:

- Sexuality +5;
- Charm +5;
- Lust +5;
- resulting fresh-run Lust = **10**.

Lust remains capped independently from progression stats.

## Merchant no-money regression confirmed

The retired Merchant +600 direction remains absent.

The exact focused test passed:

`earned Hard Work never auto-applies stats, Lust or the retired Merchant +600`

Merchant behavior remains:

- earned-only package before activation: money 600;
- activated package after creation: money still 600;
- only Reason +5 and Sociability +5 apply.

No D47 package adds starting money.

## D23 identity count confirmed

D23 Palace qualification continues to count:

**10 active ordinary package identities**

It does not count:

- 15 progression-stat components;
- Prostitute's separate Lust component;
- Strong Meta selections.

All ten package identities are required for the all-ten D23 condition.

## No Strong Meta slot usage

Ordinary Hard Work packages remain separate from Strong Meta.

Focused QA confirms:

- selecting/activating Hard Work packages does not alter `meta.strongMeta`;
- Hard Work packages consume neither Keystone nor Specialist slots;
- D47 does not create a parallel Strong Meta ownership mechanism.

## Preserved boundaries

v30 confirms no drift in:

- D24 cap-200 clipping/non-multiplication;
- D23 Palace qualification semantics;
- Strong Meta registry/runtime;
- ordinary Hard Work ending lifecycle;
- Secret Debt separation;
- advanced ordinary-ending adjacency;
- New Start+ UI/presentation.

No wage, School, Activity, Night, Secret Debt, Palace or Strong Meta reward rule was changed by D47.

## Disposition

**EXACT_HEAD_QA_GREEN — READY_FOR_CHAT2_ASSEMBLY**
