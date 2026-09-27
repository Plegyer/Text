# Legacy Journal / Outcome Presentation Contract v1

Date: 2026-09-27
Owner: Chat 5
Status: CONTENT-SIDE CONTRACT ONLY
Baseline main: `d383a2282a15eb4ebc1bbb2fef2bbf9f3f2087fe`

## Purpose

Define the content contract for a future Lead-owned presentation consumer that can show localized post-choice outcome text without making gameplay Save state locale-dependent.

## Stable source identity

The content identity for a resolved legacy event outcome is the exact pair:

- `eventId`
- `choiceId`

The canonical localization key is:

`event.<eventId>.choice.<choiceId>.text`

Item 75 contains the exact current identity map. Item 78 contains finalized RU+EN strings for those keys.

## Required presentation behavior

A future consumer should:

1. retain or derive the stable event/choice identity of a resolved choice;
2. resolve visible outcome text through the current locale at render time;
3. use `event.<eventId>.choice.<choiceId>.text`;
4. fall back to the current embedded choice body when a localization key is absent;
5. change only visible text when locale changes;
6. never dispatch or resolve the choice again during locale switching.

## Save neutrality

Do not write selected RU or EN prose into gameplay identity.

The following must remain locale-neutral:
- event ID;
- variant ID;
- choice ID;
- presentation identity;
- event history;
- effects and flags;
- resources and progression;
- RNG state/evolution;
- gameplay Save identity.

If a durable reference is added in future shared runtime work, it should store stable IDs, not translated prose.

## Existing journal semantics

Current gameplay journal stores plain text strings and is part of existing Save behavior.

This contract does not require a migration of old journal entries.

A Lead implementation may choose one of these compatible presentation approaches:

- preserve existing stored journal strings for legacy saves while rendering newly resolvable stable outcome references separately;
- maintain current gameplay journal semantics and add a presentation-layer outcome reference outside locale-sensitive gameplay identity;
- introduce a versioned locale-neutral journal entry representation only through an explicitly reviewed shared-runtime migration.

Content does not select among these implementation strategies.

## lastAction

Current engine may copy embedded choice text into `lastAction.text`.

A future consumer must not replace that field with the active translation if doing so makes serialized gameplay state differ by locale.

Visible result text should instead be derived from stable event/choice identity where available, with the existing embedded text as fallback.

## Exactly-once rule

Localization is presentation-only.

Locale switching:
- must not apply effects;
- must not mutate flags;
- must not increment counters;
- must not modify event history;
- must not re-run resolver boundaries;
- must not consume RNG;
- must not dispatch a choice.

The original choice resolution remains the only gameplay transaction.

## Backward compatibility

For saves or content lacking a stable outcome identity:
- render the stored embedded text exactly as today;
- do not guess an event/choice identity from prose;
- do not rewrite the save simply because locale changes.

## Content ownership boundary

Chat 5 supplies:
- stable key map;
- RU source;
- EN parity text;
- natural-path expectations;
- this contract.

Lead owns any shared engine/UI/save representation needed to consume it.

No runtime/UI code changes are included in this item.
