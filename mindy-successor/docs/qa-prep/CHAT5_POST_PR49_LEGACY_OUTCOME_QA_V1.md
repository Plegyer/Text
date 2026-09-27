# Chat5 post-PR49 legacy outcome QA v1

Status: COMPLETE / GREEN_CONTENT_SOURCE / SHARED_PRESENTATION_CONSUMER_REQUIRED

Reviewed Chat 5 items:
`73–84`
on `chat5/relationships-night-content-next`.

Current production main:
`d383a2282a15eb4ebc1bbb2fef2bbf9f3f2087fe`.

## Post-PR49 rebase

Item 73 rechecks the original 109-key legacy root source against exact PR49 main.

Classification:
- ADDITIVE: 108;
- IDENTICAL: 1;
- CONFLICT: 0;
- SUPERSEDED: 0.

The one identical existing root key is:
`media.base.workshop.alt`.

No legacy event identity disappeared.

## Final production localization patch

Item 82:
`legacy-root-localization-production-patch-v2.fixture.json`.

Blob:
`2e7fb18cb1f85f25d0afcb6f34d7be5250967ea4`.

Verified:
- total localization keys: 109;
- exact current event IDs: 17;
- exact current media IDs: 16;
- missing current event ID: 0;
- missing current media ID: 0;
- missing RU: 0;
- missing EN: 0;
- top-level payload: localization only;
- gameplay fields: none.

Current root collision check:
- existing collisions: 1;
- non-identical collisions: 0.

## Exact current legacy identities

Covered events:
- seven non-School `base.*` events;
- nine `gopher.*` events;
- `stage.goblin`.

Covered media:
- current exact base/gopher/stage media IDs only.

No new event, choice or media identity is invented.

## Choice-outcome source

Item 75 maps exact current:
`eventId + choiceId`
to stable:
`event.<eventId>.choice.<choiceId>.text`.

Mappings:
`26`.

Item 78 finalized choice-outcome RU+EN keys:
`26`.

Missing RU:
`0`.

Missing EN:
`0`.

The localization key is derived from stable gameplay identity; locale is not part of the identity.

## Current visibility/runtime boundary

Current engine resolves a choice by:
- applying current effects;
- calling `log(sceneChoice.text)`;
- writing the same embedded `sceneChoice.text` to `lastAction.text` when a last action exists.

Thus current Save/journal stores embedded source prose, not a locale-selected RU/EN translation.

This is locale-neutral in the narrow sense that switching locale does not rewrite the stored Save text, but it leaves visible EN outcome/journal presentation incomplete.

Therefore:
- outcome content source: READY;
- visible localized Journal/raw lastAction outcome: BLOCKED_BY_SHARED_PRESENTATION_CONSUMER.

## No locale-selected prose in gameplay Save

The Chat 5 worker items contain no runtime/UI/Save mutation.

They do not propose writing active-locale prose into:
- journal Save entries;
- lastAction Save fields;
- event identity;
- choice identity.

Item 80 explicitly requires a future consumer to derive visible outcome from stable event/choice identity at render time.

## Effects / flags / RNG

Item 79 records each current natural path and current exact choice effects.

The content wave does not edit:
- conditions;
- effects;
- flags;
- metrics;
- rewards;
- resolver ordering;
- RNG;
- Save schema.

The same current choice remains the only gameplay transaction.

## Media-alt refinement

Item 81 re-audits legacy media against actual current generic assets after PR49.

It correctly avoids narrative-overfit alt text for generic:
- town;
- tavern;
- forest;
- lumber;
- room
art.

No media ID or path is renamed.

## Ownership exclusions

Machine check on item 82 found no overlap with:
- School;
- ordinary poverty;
- Foreman;
- Forest result/route ownership;
- Secret Debt.

`gopher.receipt` and `gopher.hunt-intro` remain their existing legacy/tutorial identities and do not create Hunter/Forest Activity semantics.

## Regression source

Item 83 validates:
- exact current event/media identities;
- complete RU+EN;
- locale-neutral keys;
- additive/identical collision policy;
- localization-only payload;
- excluded owner namespaces.

Lead must run it on the actual integration head.

## Verdict

`GREEN_CONTENT_SOURCE / SHARED_PRESENTATION_CONSUMER_REQUIRED`.

Safe selective root-localization source exists for the 17 current legacy events and 16 current media identities.

The 26 outcome strings are content-ready, but visible localized Journal/lastAction outcomes require a shared locale-neutral consumer.
