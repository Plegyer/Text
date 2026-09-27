# Generic World Locale-Invariance Acceptance Plan v1

Date: 2026-09-27
Owner: Chat 5
Baseline main: `7f27caca4e3e711799e9c1f235c4a27adbf31026`

## Acceptance objective

For every event covered by items 62–66, RU↔EN switching must change only presentation text and alt text. Gameplay identity and state must remain identical.

## Pre-switch snapshot

While the event is pending, capture:

- `pending.eventId`;
- `pending.variantId`;
- `pending.presentationId`;
- `pending.allowedChoiceIds`;
- selected media ID / candidate identity;
- RNG state;
- event history;
- action counts;
- flags;
- metrics/resources;
- progression state;
- serialized gameplay Save.

## RU → EN → RU checks

After each locale switch:

- same event ID;
- same variant ID;
- same allowed choice IDs and eligibility;
- same presentation ID;
- same media identity and media path;
- same RNG state;
- same event history;
- same flags/metrics/resources/progression;
- same gameplay Save;
- localized title changes only through `event.<eventId>.title`;
- localized selected variant body changes only through `event.<eventId>.variant.<variantId>.text`;
- localized choice labels change only through `event.<eventId>.choice.<choiceId>.label`;
- media alt changes only through `media.<mediaId>.alt`.

## Choice resolution exactly once

From equivalent pre-choice states, resolve the same current choice once under RU and once under EN.

Assert:

- same choice ID;
- same effect list is applied once;
- same flags and metrics result;
- same resources and progression result;
- same next resolver outcome for the same RNG state;
- no duplicated effect caused by locale switching;
- no locale-specific event history or Save identity.

## Repeatable events

For:
- `base.workday`;
- `base.winter`;
- `base.shelter`;
- `gopher.tavern-quest` while unresolved;
- `gopher.tavern-resolution` while unresolved;
- `gopher.tavern-routine`;
- `stage.goblin`;

also assert locale does not change:
- cooldown eligibility;
- maxShows accounting;
- selected seasonal/default variant eligibility;
- event history counts;
- variant cooldown state.

## Media checks

Item 70 must not change:
- media IDs;
- asset paths;
- presentation selection;
- animation/static choice;
- occurrence identity.

`media.base.workshop.alt` must remain exact-identical to the already shipped root entry. Other covered alt keys are additive at the audited baseline.

## Current shared-consumer note

The current generic pending-event renderer already localizes event title, selected variant body, choice labels, and media alt when root keys exist.

Current event resolution still stores embedded `choice.text` in journal/last-action state. Do not make that Save write locale-dependent. If Lead later exposes localized choice-outcome text, presentation must derive from a stable locale-neutral identity instead of storing the selected translation in gameplay Save.

## Ownership exclusions

No acceptance path in this plan may modify or use this wave to claim ownership of:
- `ds-lumber.*`;
- `lumber-cross.*`;
- `lumber.career-first-shift`;
- poverty;
- School;
- Chat3-owned Forest route/result content;
- Secret Debt.

`gopher.receipt` and `gopher.hunt-intro` are checked only as their existing generic-world/tutorial event identities.
