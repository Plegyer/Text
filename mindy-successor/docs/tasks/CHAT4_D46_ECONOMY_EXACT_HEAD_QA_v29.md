# Chat 4 — D46 Economy Exact-Head QA v29

Status: **EXACT_HEAD_QA_GREEN — READY_FOR_CHAT2_ASSEMBLY**  
Owner: Chat 4  
QA branch: `chat4/career-producers-exact-head-qa-bundle-v29`

Frozen producer under test:

`chat4/economy-start-balance-producer-v14@a0c5f855b63d3bb85556f5b2780aaaabb58fbced`

Historical handoff runtime candidate:

`ebc57577d1830d1d0fe115e02d01db079af57fe2`

This v29 QA intentionally tested the **frozen producer head** `a0c5f855...`, not only its previously green runtime parent.

No frozen producer file was modified.  
No full CI was run.

## Executable evidence

Workflow:

- name: `Chat 4 D46 economy exact-head QA v29`
- workflow ID: `376376903`
- run ID: `37462590879`
- job ID: `112265598705`
- runner: self-hosted Windows X64
- Node: 22.18.0
- conclusion: **SUCCESS**

## Exact SHA guard

Checkout was pinned to:

`a0c5f855b63d3bb85556f5b2780aaaabb58fbced`

Runtime log:

`Exact frozen D46 producer: a0c5f855b63d3bb85556f5b2780aaaabb58fbced`

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

## Focused executable roster

The exact focused command covered:

- `tests/economy-start-balance-v14.test.ts`
- `tests/ordinary-hard-work-meta-production.test.ts`
- `tests/hard-work-stat-cap-d24.test.ts`
- `tests/ordinary-hard-work-lifecycle-parity.test.ts`
- `tests/school-engine-adapter.test.ts`
- `tests/school-body-confidence-lust-d20.test.ts`
- `tests/school-night-study-adapter.test.ts`
- `tests/strong-meta-d30-runtime-v7.test.ts`
- `tests/strong-meta-engine-integration-v7.test.ts`
- `tests/palace-d23-consumer-integration-v8.test.ts`

Result:

- tests: **59**
- pass: **59**
- fail: **0**
- cancelled/skipped/todo: **0**

## D46 acceptance confirmed

Fresh-life contract remains:

- Lust = **5**
- starting money = **600**
- base Energy = **3**

Existing/in-progress save migration preserves its stored Lust; it does **not** receive the fresh-life Lust 5 default retroactively.

Ordinary wage bases remain:

- Lumber = **35**
- Satyr Maid = **37**
- Undead Farm = **37**
- Tavern = **37**
- Hunter = **37**
- Guard = **37**
- Merchant = **37**
- Artist/Geisha = **37**
- Assassin = **37**
- Prostitute = **37**

The existing per-career wage stat weights remain unchanged.

The ordinary final wage cap remains exactly:

**120**

The cap is scoped only to the ten ordinary shift identities.

The focused run explicitly passed the isolation regression:

`D46 cap is isolated to the ten ordinary shift identities`

Therefore D46 does not impose the ordinary 120 cap onto non-ordinary wage paths.

## Required isolation confirmed

The green adjacency preserves:

- Secret Debt relative Energy behavior under Strong Meta;
- Earned Reserve Match ordinary-work boundaries;
- Network Retainer bound-day behavior;
- Work Rhythm;
- D24 cap semantics;
- D23 Palace qualification;
- School economy and Night Study behavior.

D46 therefore does not alter:

- Secret Debt hidden-work wage;
- Palace wage;
- non-ordinary wage calculation;
- Strong Meta reward caps;
- ordinary-career lifecycle cadence;
- School tuition packages;
- lodging 100/50/0 semantics.

## Exact-head distinction

The previously reported green runtime candidate was:

`ebc57577d1830d1d0fe115e02d01db079af57fe2`

The frozen producer head is:

`a0c5f855b63d3bb85556f5b2780aaaabb58fbced`

v29 closes that distinction by executable-testing the actual frozen producer head itself.

## Disposition

**EXACT_HEAD_QA_GREEN — READY_FOR_CHAT2_ASSEMBLY**
