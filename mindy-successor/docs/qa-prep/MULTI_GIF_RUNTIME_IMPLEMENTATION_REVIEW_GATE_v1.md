# Multi-GIF Runtime Implementation Review Gate v1

Date: 2026-09-27
Worker: Chat 4 / QA Acceptance

## Purpose

Define the concrete QA/review gate for an upcoming shared presentation-runtime change that lets one semantic presentation surface own an intentional pool of 3–5 GIF candidates.

This is a presentation-runtime gate only.

The patch must not alter gameplay mechanics, gameplay RNG, transaction ownership, or semantic gameplay identity.

## Current compatibility baseline

Current presentation runtime already supports:
- semantic presentationId;
- one optional GIF primary override;
- one optional static override;
- catalog media fallback;
- semantic fallbackId chains;
- Animation Off;
- ordered resolved media candidates;
- media-error advance to the next resolved candidate.

Current UI starts at candidate index 0 and advances only after a media load error.

The new patch should add deliberate multi-GIF selection without breaking those existing contracts.

## Gate 1 — bounded shared-runtime scope

Expected shared changes should remain in presentation-layer code and targeted presentation tests.

Any change to:
- gameplay Resolver;
- career/School/Night/Activity transactions;
- ending/Meta logic;
- gameplay RNG;
- authoritative Save progression schema

requires a separate demonstrated requirement.

Fail:
RUNTIME_SCOPE_BLEED.

## Gate 2 — explicit candidate pool

The new API/data shape must represent an intentional GIF pool rather than relying on fallback-chain order as fake variety.

For a multi-GIF slot:
- candidate list is explicit;
- effective GIF candidate count target is 3–5;
- candidates are validated as GIF sources;
- duplicates are rejected or deterministically deduplicated.

Existing one-primary slots remain legal.

Do not require every semantic slot to have a multi-GIF pool.

## Gate 3 — old primary/static override compatibility

Existing presentation data using:
- primary GIF override;
- static override;
- fallbackId

must continue to parse and resolve with the same behavior.

Required regression:
old override fixture before patch -> same resolved primary/static ordering after patch.

No forced migration of existing user presentation overrides.

Fail:
PRESENTATION_OVERRIDE_COMPAT_REGRESSION.

## Gate 4 — deterministic presentation-only selection

Selection among GIF candidates must be deterministic for one materialized presentation occurrence.

Acceptable design:
- stable hash/selection from semantic presentation identity plus a stable occurrence identity already derived from persisted gameplay state;
- another deterministic presentation-only occurrence key that does not consume gameplay RNG.

Not acceptable:
- Math/random source shared with gameplay outcome selection;
- engine RNG draw used only to pick a GIF;
- selection based on wall-clock time when reload stability is required.

Required test:
same occurrence inputs -> same candidate.

## Gate 5 — no gameplay RNG consumption

Capture gameplay RNG state before resolving a multi-GIF slot.

Resolve/select presentation candidate.

Assert gameplay RNG state is unchanged.

Then execute representative gameplay command and compare with a no-media-selection control.

Mechanical result must be identical.

Fail:
MEDIA_CONSUMES_GAMEPLAY_RNG.

## Gate 6 — occurrence stability across reload

For a pending/materialized semantic scene:
- save;
- reload;
- resolve presentation again.

The selected GIF candidate for the same occurrence should remain stable under the documented deterministic policy.

The gameplay event/variant must never reroll merely because presentation was re-resolved.

If the implementation intentionally allows presentation candidate reselection after reload, it must still be independent of mechanics; however the preferred acceptance contract for this patch is stable occurrence selection.

## Gate 7 — no frame/time Save fields

Search authoritative Save schema/diff.

Reject new fields such as:
- current GIF frame;
- elapsed animation time;
- loop count;
- playback position;
- animation completion state.

Also reject a gameplay-required media candidate index stored inside authoritative run progression.

Semantic gameplay state remains sufficient to reload.

Fail:
MEDIA_PLAYBACK_STATE_IN_SAVE.

## Gate 8 — Animation Off

With animations disabled:
- GIF pool is not required to resolve;
- static override/catalog static fallback remains available;
- text-only fallback remains valid where current architecture allows it;
- selected gameplay choices/effects remain identical.

Required regression:
Animation On vs Off -> normalized mechanical Save equality.

## Gate 9 — missing candidate fallback

If one configured GIF candidate is missing/invalid at load time:
- skip/fall through safely;
- try another valid candidate where available;
- otherwise static/catalog/fallback slot remains available.

A missing GIF must never:
- dismiss a gameplay scene;
- auto-select a choice;
- commit an effect;
- reroll the event.

## Gate 10 — corrupt candidate fallback

Where the UI can simulate media error:
- chosen candidate fails to load;
- renderer advances within resolved presentation candidates;
- gameplay state remains unchanged.

Current media-error behavior already advances mediaIndex.
The patch must preserve that failure isolation.

## Gate 11 — all GIF candidates unavailable

If no GIF candidate renders:
- static fallback works;
- otherwise catalog/image/text fallback works;
- gameplay remains fully actionable.

Fail only if media absence blocks gameplay.

## Gate 12 — semantic identity does not split by media candidate

One gameplay scene keeps one semantic presentationId.

Do not create:
- presentationId/A.gif;
- presentationId/B.gif

as separate gameplay identities merely to support media variety.

Candidate identity is subordinate to the semantic slot.

## Gate 13 — shared GIF does not merge semantic IDs

The inverse must also hold.

The same GIF file may appear in multiple semantic pools.

Those slots remain distinct:
- career shift identity;
- School lesson identity;
- poverty event identity;
- Activity route identity;
- ending identity.

No data structure may key gameplay identity by asset path.

## Gate 14 — candidate distribution is presentation-only

If the patch supports variation across occurrences:
- different occurrence keys may map to different candidates;
- distribution may aim to reduce visible repetition;
- no distribution choice changes conditions/effects/rewards.

Tests should force at least two candidate selections for one semantic slot and compare identical mechanical outcomes.

## Gate 15 — fallback ordering remains understandable

Document exact order, for example:
1. selected multi-GIF candidate;
2. other valid GIF candidates on failure;
3. static override;
4. catalog image;
5. semantic fallback slot;
6. text-only stage.

Exact implementation order may differ, but it must be deterministic and covered by tests.

Do not let pool selection accidentally bypass current static fallback when Animation Off.

## Gate 16 — imported presentation validation

Existing import/editor validation must reject:
- non-GIF source inside GIF pool;
- empty string;
- duplicate malformed candidate;
- invalid local path/data URI;
- pool larger than accepted limit if limit is enforced;
- unknown semantic slot.

Valid old primary/static payloads must still import.

## Gate 17 — editor behavior

If editor UI exposes multi-GIF pools:
- semantic slot remains the editing target;
- user can inspect/remove candidates;
- static fallback remains visible;
- a pool edit does not edit gameplay content.

Editor support may follow the core patch, but the runtime format should not make future editor support impossible.

## Gate 18 — no gameplay timing hooks

Search patch for media callbacks.

Reject:
- GIF ended -> dispatch gameplay;
- timer -> enable choice;
- frame -> grant effect;
- candidate change -> Resolver trigger.

Current gameplay transitions stay command/Resolver driven.

## Gate 19 — School compatibility

Representative School test:
- paid lesson mechanics execute once;
- generic authored presentation resolves a multi-GIF candidate;
- candidate selection adds no tuition/Energy/stat/progress effect;
- reload does not duplicate School transaction.

## Gate 20 — ordinary poverty compatibility

Representative poverty test:
- natural street event resolves;
- multi-GIF selection may vary presentation;
- money/next-day modifier/event history stay identical;
- anti-softlock unaffected.

## Gate 21 — career compatibility

Representative repeated Work test:
- shift costs 1 Energy;
- typed completed_shifts increments once;
- semantic seasonal ID remains stable;
- candidate selection changes only media.

## Gate 22 — Activity compatibility

Representative Activity route/challenge:
- route/progress/result unchanged;
- media selection consumes no gameplay RNG;
- save/resume remains stable.

## Gate 23 — ending compatibility

Ending:
- eligibility unchanged;
- commit remains reward-free;
- completion/Meta exactly once;
- GIF pool completion does not award anything.

## Required executable test set

At minimum add/retain:

1. old primary override compatibility;
2. old static override compatibility;
3. explicit 3–5 candidate pool validation;
4. deterministic candidate selection;
5. gameplay RNG unchanged;
6. two candidate selections -> same mechanical state;
7. pending scene reload -> stable occurrence candidate;
8. no frame/time Save fields;
9. Animation Off -> static fallback;
10. missing candidate fallback;
11. corrupt candidate fallback/error advance;
12. all GIFs unavailable -> safe fallback;
13. semantic ID unchanged across candidates;
14. shared asset does not merge two semantic slots;
15. full existing presentation suite;
16. full project check.

## CI requirement

Shared-runtime patch requires exact-head:
- typecheck;
- validate;
- build;
- full tests;
- targeted presentation tests.

Then post-merge main CI.

Do not accept static review only.

## Review disposition

Use:

MULTI_GIF_RUNTIME_GREEN
- all presentation-only invariants pass;
- old overrides compatible;
- exact-head CI green.

BLOCKED_GAMEPLAY_RNG_COUPLING
- presentation consumes gameplay RNG.

BLOCKED_SAVE_COUPLING
- media frame/time/candidate becomes authoritative gameplay Save state.

BLOCKED_COMPATIBILITY
- old primary/static overrides break.

BLOCKED_FALLBACK
- missing/corrupt media blocks gameplay.

BLOCKED_SEMANTIC_ID_DRIFT
- candidate files split/merge semantic gameplay identities.

BLOCKED_CI
- exact-head check is red or absent.

No art style or content priority is selected by this gate.

No production runtime/UI/content file was modified by Chat 4.
