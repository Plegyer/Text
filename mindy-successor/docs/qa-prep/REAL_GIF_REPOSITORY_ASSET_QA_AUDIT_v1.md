# Real GIF Repository Asset QA Audit v1

Status: QA / Product acceptance
Queue item: Chat 4 item 143
Current main: `23a8798f77c42e84a7540d71fdffd69d9db9fbfd`
Chat2 branch reviewed: `chat2/presentation-replacement-next`
Chat2 current head: `41ca003e68d254a4641be0f82c8e33afb7609fad`

## Evidence source

This audit does not accept the worker inventory on prose alone.

A recursive Git-tree query was performed for both current `main` and the current Chat2 branch:

- current main tree: 485 entries, `truncated=false`, real paths ending in `.gif`: **0**;
- Chat2 branch tree: 640 entries, `truncated=false`, real paths ending in `.gif`: **0**.

This independently confirms the worker item-151 inventory result.

## Chat2 real-asset inventory

File:
`docs/presentation-prep/EXISTING_GIF_ASSET_INVENTORY_v1.md`
blob: `0a0a0f9fd2805ef6672fff49e3ef772ac94b3c41`

Worker conclusion: zero real GIF assets on main and worker branch.

QA result: **VERIFIED**.

Static SVG assets such as `assets/stage-lumber.svg`, `assets/stage-tavern.svg`, `assets/stage-forest.svg`, `assets/stage-town.svg`, `assets/stage-room.svg`, `assets/stage-outside.svg` and `assets/stage-school.svg` may remain valid static fallbacks. They are not GIF candidates and do not count toward a 3–5 GIF pool.

## Real-asset-only patch

File:
`prior-work/astra/prototype-m3.2/content/presentation-drafts/real-asset-only-multigif-v1.json`
blob: `d88b8a325398ca7ebfee1f05e1ec9184ee72ce0f`

Actual content:

- `version: 1`;
- empty `texts`;
- empty `media`;
- empty `slots`.

QA result: **CORRECT / NO PRODUCTION POOLS AVAILABLE**.

Because no real repository GIF exists, omitting every pool is the only production-safe result. A fabricated or placeholder-filled 3–5 candidate pool would fail the locked Product rule.

## Contract test

File:
`prior-work/astra/prototype-m3.2/tests/real-asset-multigif-v1.test.ts`
blob: `3924598cdcadf6e65da5f0c3cdaab9db0b52b696`

The test is structurally appropriate for a future non-empty patch. For every slot it requires:

- explicit pool;
- 3–5 candidates;
- unique stable keys;
- candidate kind `gif`;
- repo-local `assets/...gif` path;
- no placeholder/staging/non-shipped/future/example marker;
- referenced file exists in checkout;
- real static fallback exists;
- semantic presentation ID resolves to current production slots;
- no gameplay-owned fields.

With an empty patch, these per-pool assertions are vacuous. That is acceptable because the repository has no eligible GIFs; the test must not be interpreted as evidence that a visual pool shipped.

## Production candidate rule

Current result for every production semantic pool is:

- real GIF candidates: **0**;
- required candidate count: **3–5**;
- production-ready pool: **NO**.

Therefore the following conditions cannot currently be satisfied for any pool:

- every candidate is a real repo GIF;
- 3–5 candidates exist;
- RU+EN alt coverage is associated with real candidates.

The existing static fallback path remains valid and gameplay remains untouched.

## Semantic identity and blocked-content check

Chat2 coverage documents map current production semantic IDs but create no real pool. This does not promote staged School teacher/course content, Secret Debt, Hunter/Old Boundary route semantics, or any other blocked gameplay.

An empty presentation patch has no conditions, effects, rewards, timing, RNG or Save behavior and therefore cannot change gameplay.

## Selective integration verdict

**NO_REAL_GIF_PRODUCTION_POOL_TO_INTEGRATE**.

The following may be selectively copied as QA/tooling evidence onto a fresh branch from current main:

- the verified zero-asset inventory;
- the empty real-asset-only patch;
- its enforcement test;
- semantic coverage/deficit documents.

They must not be described as shipped visual content.

Do not copy earlier placeholder pools into production merely to make `slots` non-empty. Do not merge the long-lived Chat2 branch wholesale.

## Exit condition

This gate can become GREEN for an actual production multi-GIF pool only after Git contains 3–5 real GIF blobs for at least one current semantic presentation identity, each candidate passes repository-file/preflight validation, RU+EN alt coverage exists, static fallback remains, and exact-head CI proves presentation-only behavior.
