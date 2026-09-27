# Legacy pending-scene localization acceptance v1

Status: COMPLETE / ACCEPTANCE_CONTRACT_READY

Current main:
`1a2f6e428da41e356f8d48df4a72923a5cc1928c`.

Source localization:
Chat 5 109-key legacy root patch.

## Existing generic renderer seam

Current pending-scene renderer already derives presentation from stable current identities:

- title:
  `event.<eventId>.title`;
- selected variant body:
  `event.<eventId>.variant.<variantId>.text`;
- choice label:
  `event.<eventId>.choice.<choiceId>.label`;
- media alt:
  stable media ID / presentation altKey.

Fallback remains embedded current pack text.

Therefore adding legacy root strings does not require a new pending-scene gameplay model.

## Representative scene A — base.arrival

Exact identity:
- event: `base.arrival`;
- variant: `welcome`;
- choice: `introduce`;
- media: `base.workshop`.

Current choice effects:
- `alchemy.intro = true`;
- trust `+3`.

RU↔EN acceptance:
- same event/variant/choice/media identity;
- same allowed-choice snapshot;
- same effects exactly once;
- same resolver result;
- only title/body/choice label/media alt changes.

## Representative scene B — gopher.tavern-quest

Exact identity:
- event: `gopher.tavern-quest`;
- variant: `default`;
- choices:
  - `help`;
  - `later`;
- media: `gopher.tavern-quest.default`.

Current effects:
- `help` sets `tavern.quest = true`;
- `later` has no effect.

RU↔EN acceptance:
- same two choice IDs and order;
- same conditions/eligibility;
- same selected choice effect;
- same event history;
- same RNG;
- same Save except presentation preference storage outside gameplay Save.

## Representative scene C — stage.goblin

Exact event:
`stage.goblin`.

Variants:
- `curious`;
- `default`.

Choices:
- `spar`;
- `flirt`;
- `work`.

Current effects:
- `spar`: dexterity +1;
- `flirt`: persuasion +1 and retains its existing condition;
- `work`: no effect.

Locale acceptance:
- selected variant ID must not change;
- eligible choice ID set must not change;
- no variant reroll;
- no extra RNG draw;
- same choice effect exactly once.

## Required pre-resolution invariant

For a pending scene, snapshot:
- serialized gameplay Save;
- `pending.eventId`;
- `pending.variantId`;
- `pending.allowedChoiceIds`;
- `pending.presentationId`;
- reaction epoch identity;
- global RNG.

Switch RU -> EN without choosing.

Require:
- serialized gameplay Save unchanged;
- all pending fields unchanged;
- RNG unchanged;
- media source/candidate unchanged;
- localized title/body/choice label/media alt changed where translations differ.

## Required resolution invariant

From cloned identical pre-choice Saves:
1. render RU and choose exact choice X;
2. render EN and choose exact same choice X;
3. compare resulting gameplay state.

Require identical:
- effects/flags/metrics/resources;
- event history;
- career/quest/relationship state;
- RNG evolution;
- resolver continuation;
- next pending identity;
- ending availability;
- Night/Activity state.

The locale must not be an input to choice execution.

## Media invariant

If a generic pack media ID is used:
- same media identity across locales;
- only localized alt changes.

If a project-owned semantic static override is later added:
- same physical asset/candidate across locales;
- only localized accessibility text changes.

## Outcome text boundary

This pending-scene gate covers:
- title;
- variant body;
- choice label;
- media alt.

It does not permit locale-selected post-choice prose to be written into Save.

Choice outcome/Journal localization is governed by:
`JOURNAL_OUTCOME_LOCALE_NEUTRAL_SAVE_MIGRATION_QA_V2.md`.

## Old fallback

If a legacy key is absent:
- use embedded current source text;
- keep choices usable;
- do not throw;
- do not change gameplay.

## Required integration tests

At minimum:
- one `base.*` scene;
- one `gopher.*` scene;
- `stage.goblin` variant/choice coverage.

Preferred:
all 17 current legacy events.

Every locale-switch smoke must assert byte-identical gameplay Save before choice.

## Verdict

The existing pending-scene renderer architecture is suitable for the 109-key source.

Production acceptance requires exact-head executable locale-invariance tests after the strings are actually root-loaded.


## PR51 compatibility note

PR51 changes ordinary-poverty localization values only.
It does not change the app/engine/presentation seams audited by this document.

Current app blob remains:
`312399d01b211f13c29017c1e17b61f2027d21b3`.

Current presentation blob remains:
`0bed8e1a4a88358b7e1e8ef22d787f5bcee323f4`.
