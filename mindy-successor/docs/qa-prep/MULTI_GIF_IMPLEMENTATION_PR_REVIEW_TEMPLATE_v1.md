# Multi-GIF Implementation PR Review Template v1

Date: 2026-09-27
Worker: Chat 4 / QA Acceptance

## Review target

PR:
Head SHA:
Base SHA:
Changed files:
Exact-head workflow run:
Exact-head test count:
Merge SHA:
Post-merge run:

## Required disposition

Use one:
- GREEN
- BLOCKED_SCHEMA
- BLOCKED_SELECTOR
- BLOCKED_OCCURRENCE_STABILITY
- BLOCKED_GAMEPLAY_RNG
- BLOCKED_SAVE_MIGRATION
- BLOCKED_FALLBACK
- BLOCKED_COMPATIBILITY
- BLOCKED_UI_PLUMBING
- BLOCKED_CI

Do not mark GREEN without exact-head executable evidence.

## 1. Change-class check

Expected scope:
- presentation schema/types;
- pure presentation selection helper;
- presentation resolver;
- minimal UI occurrence-key plumbing;
- targeted presentation tests.

Flag any change to:
- gameplay Resolver semantics;
- career/School/Night/Activity mechanics;
- ending/Meta logic;
- gameplay RNG;
- balance values;
- authored career/poverty/Secret Debt content.

Result:
PASS / BLOCKED_SCOPE_BLEED

## 2. Explicit pool schema 3..5

Verify an explicit presentation-only pool exists.

Required:
- minimum 3 candidates;
- maximum 5 candidates;
- unique non-empty candidate key;
- kind = gif;
- valid managed GIF source;
- alt text required;
- optional weight is finite and positive.

Tests:
- 3 candidates accepted;
- 5 accepted;
- 0/1/2 rejected;
- >5 rejected;
- duplicate key rejected;
- invalid kind/src/alt rejected.

Result:
PASS / BLOCKED_SCHEMA

## 3. Primary + pool ambiguity

First implementation expectation:
primary and pool may not coexist on one slot unless the PR explicitly defines and tests precedence.

Review:
- schema rejects ambiguous combination; or
- documented deterministic precedence exists with tests.

Do not infer precedence from object order.

Result:
PASS / BLOCKED_SCHEMA

## 4. Old override compatibility

Existing payloads must still parse and resolve:
- primary only;
- static only;
- primary + static;
- fallbackId;
- current imported override bundle.

Check:
- no migration required for old bundles;
- export/import still round-trips;
- rollback still works.

Result:
PASS / BLOCKED_COMPATIBILITY

## 5. Deterministic selector

Inspect the selector.

Required:
- pure presentation function;
- same presentationId + occurrenceKey + poolVersion -> same candidate;
- different occurrence keys may select different candidates;
- no wall-clock dependency;
- no transient DOM state as authoritative occurrence identity.

Record selector function/path:
Record deterministic seed/key formula:

Result:
PASS / BLOCKED_SELECTOR

## 6. Occurrence-key stability

Review each pool-enabled call site.

### Action/result
Expected source:
run.id + action identity + persisted occurrence/count + presentationId.

### Reactive event / ordinary poverty
Expected source:
eventId + variantId + persisted reaction epoch or queued instance identity.

### School paid lesson
Expected source:
track/course occurrence material already persisted.

### Night study
Expected source:
startedDay + exact selectedNightChoiceId + Night-study occurrence count.

### Activity
Expected source:
activityId + startedDay + checkpoint/route/step identity.

### Ending
Expected source:
RunResult transactionId or run.id + committed ending identity.

For every actual UI call site list:
- presentation surface;
- occurrenceKey source;
- persisted across reload? yes/no;
- derived without gameplay RNG? yes/no.

Result:
PASS / BLOCKED_UI_PLUMBING

## 7. Same occurrence reload

Executable requirement:

1. materialize occurrence;
2. resolve GIF candidate;
3. save;
4. reload;
5. resolve again;
6. candidate identity remains stable.

New occurrence may select another candidate.

Do not persist animation frame/time to accomplish this.

Result:
PASS / BLOCKED_OCCURRENCE_STABILITY

## 8. No gameplay RNG consumption

Inspect code and run test.

Before presentation selection:
capture gameplay RNG state.

After selection:
assert gameplay RNG state unchanged.

Representative next gameplay command must produce same mechanical result with/without media selection.

Forbidden sources:
- Resolver gameplay RNG;
- Activity local gameplay RNG;
- random roll already owned by gameplay.

Result:
PASS / BLOCKED_GAMEPLAY_RNG

## 9. No Save migration

Preferred contract:
no new authoritative Save fields.

Search schema/diff for:
- media candidate index;
- candidate key;
- frame;
- playback time;
- loop count;
- animation completion.

If a new persisted presentation key is proposed, require proof that no stable existing occurrence key can be derived.

Current Chat2 inventory did not demonstrate that need.

Result:
PASS / BLOCKED_SAVE_MIGRATION

## 10. Error fallback ordering

Document exact runtime order.

Expected behavior:
- selected pool candidate;
- other valid GIF candidate(s) on media error where supported;
- static override;
- catalog/static semantic fallback;
- text-safe presentation.

One corrupt GIF must not:
- dismiss scene;
- commit gameplay;
- reroll gameplay event;
- consume gameplay RNG.

All GIFs broken must still leave gameplay usable.

Result:
PASS / BLOCKED_FALLBACK

## 11. Animation Off

With animations disabled:
- pool GIFs skipped;
- static override remains eligible;
- semantic/catalog fallback works;
- no occurrence-key failure blocks rendering;
- gameplay state/choices/effects are identical.

Required normalized mechanical Save comparison.

Result:
PASS / BLOCKED_FALLBACK

## 12. Semantic-ID firewall

One pool belongs to one semantic presentationId.

Candidate key/filename must not become:
- gameplay event ID;
- variant ID;
- career ID;
- route ID;
- ending ID.

The same GIF may be reused in different semantic slots without merging those slots.

Result:
PASS / BLOCKED_COMPATIBILITY

## 13. Pool replacement/import behavior

Review:
- whole-pool replacement;
- remove one candidate;
- add candidate within 3..5;
- rollback to prior pool;
- rollback to old primary/static-only shape;
- invalid candidate handling.

No gameplay/save migration may be required.

Result:
PASS / BLOCKED_COMPATIBILITY

## 14. UI call-site review

Current UI historically used:
- mediaIndex=0;
- onerror -> mediaIndex++;
- reset index on navigation/command.

The new PR must not leave intentional pool selection dependent only on transient mediaIndex.

For each modified mediaHTML/resolvePresentation call:
- occurrenceKey supplied where required;
- selected candidate used consistently;
- onerror fallback preserves deterministic occurrence;
- navigation reset does not alter same pending occurrence identity.

Result:
PASS / BLOCKED_UI_PLUMBING

## 15. First production smoke

Preferred representative surface:
job/lumber/shift/spring/default

Require:
- 3 GIF candidates;
- existing static fallback;
- semantic ID unchanged;
- same occurrence reload stable;
- separate occurrences can vary;
- Animation Off static;
- one GIF broken -> safe fallback;
- all GIFs unavailable -> static/text fallback;
- Energy/wage/stats/completed_shifts identical;
- gameplay RNG unchanged;
- no media state added to Save.

Result:
PASS / BLOCKED_*

## 16. Cross-system regression

At minimum preserve current smoke for:
- one ordinary career shift;
- School paid lesson;
- ordinary poverty event;
- Forest Activity;
- ending completion/Meta.

Media pool selection must not alter any mechanical assertion.

Result:
PASS / BLOCKED_REGRESSION

## 17. CI gate

Required exact-head:
- typecheck;
- validate;
- build;
- targeted presentation tests;
- full test suite.

Record:
Run:
Tests:
Pass:
Fail:
Content validation:

After merge:
record main push run and count.

Result:
PASS / BLOCKED_CI

## Final review summary

Pool schema:
Primary+pool ambiguity:
Old override compatibility:
Deterministic selector:
Occurrence stability:
Gameplay RNG:
Save migration:
Fallback:
Animation Off:
Semantic IDs:
UI plumbing:
Exact-head CI:
Merge:
Post-merge CI:

Final disposition:

No Product/art-style decision is made by this template.
