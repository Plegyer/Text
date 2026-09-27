# Forest Bilingual Production QA v2

Date: 2026-09-27
Worker: Chat 4 / QA Acceptance
Reviewed branch: chat3/lumber-production-proof-next

## Disposition

BLOCKED_PACK_NAMESPACE.

The bilingual content/evidence is otherwise coherent, but the proposed v2 pack cannot enter current root production loading unchanged because its event namespace does not match its pack ID.

## Exact ActivityResult boundaries

The three reactions preserve:
- success -> lumber.forest.success
- escape -> lumber.forest.escape
- failure -> lumber.forest.failure

All use activity lumber.forest and remain distinct.

PASS.

## Strict pack namespace blocker

Proposed pack ID:
forest-result-content-bilingual-v2

Event IDs:
- forest-result-content-v1.success
- forest-result-content-v1.escape
- forest-result-content-v1.failure

Current main content loader requires every event ID to begin with its owning pack ID plus a dot.

Therefore these events are outside the namespace of forest-result-content-bilingual-v2.

The worker regression currently calls packSchema.parse directly. That proves schema shape but does not execute the cross-object namespace check performed by loadCatalog.

So the test can pass while root production loading would reject the pack.

Classification:
BLOCKED_PACK_NAMESPACE.

Required correction:
- preserve the intended stable gameplay identities;
- make pack ownership consistent with those identities;
- validate through current loadCatalog on fresh main.

QA does not choose whether the intended correction is pack-ID reuse or a coordinated identity migration.

## RU + EN evidence

Russian source text is present in the v2 pack.

The bilingual sidecar/migration evidence supplies RU+EN for:
- titles;
- variant text;
- choice labels/text;
- media alt.

The regression verifies Russian source matches the pack and English exists.

No RU/EN gameplay event duplication is introduced.

PASS as bilingual authoring evidence.

## Locale-neutral identity

The worker regression rejects locale suffixes in event/media/localization identities.

Success, escape and failure remain one identity each.

PASS.

## No mechanics drift

All result-reaction choices are effect-free.

The pack does not alter:
- Activity progress;
- Energy;
- resources/items;
- career progress;
- ending/Meta state.

PASS.

## Lumber Hard Work firewall

The regression preserves:
- completed_shifts >= 50;
- reward hardWork:lumber.

The Forest pack contains neither completed_shifts nor hardWork:lumber.

PASS.

## Product-blocked route semantics remain open

The result pack does not decide:
- Old Boundary Token natural acquisition/policy;
- hunter-trail unlock provider.

Those remain independent Product-blocked route questions.

PASS.

## Current-main topology adaptation

Fresh-main integration must use current Forest behavior:
- Activity entry is open;
- logging-road is naturally available;
- old-boundary capability gating is on that route option.

Do not restore the stale worker assumption that a world fact is required to enter the whole Forest Activity.

## Production gate

Before GREEN:
1. correct pack/event namespace ownership;
2. load via current loadCatalog;
3. retain exact success/escape/failure ActivityResult triggers;
4. retain one locale-neutral gameplay identity;
5. retain effect-free reactions;
6. use current natural Forest path in tests;
7. run exact-head CI;
8. verify post-merge CI.

## Final matrix

Exact ActivityResult boundaries: PASS.
RU+EN evidence: PASS.
Locale-neutral IDs: PASS.
No gameplay duplication: PASS.
No Hard Work drift: PASS.
Product-blocked route semantics invented: NO.
Strict pack ownership: FAIL.
Production integration: BLOCKED.

No Chat 4 production runtime/UI/content file was modified.
