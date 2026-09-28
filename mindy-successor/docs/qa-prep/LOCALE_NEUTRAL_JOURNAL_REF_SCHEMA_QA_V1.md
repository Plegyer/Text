# Locale-neutral journal ref schema QA v1

Status: COMPLETE / ACCEPTANCE_CONTRACT_READY

Current production main:
`5dffefd15703d431a604b4cc9f831c4e55460aed`.

Current Save schema:
`schemaVersion = 4`.

Current persistence model:
- `run.historyState.journal` is an array of plain strings;
- `run.flow.lastAction.text` is persisted plain text;
- old saves therefore contain source prose, not stable event/choice references.

No production Lead journal-ref implementation is present on current main at this audit. This file defines the QA gate for the forthcoming design.

## Core requirement

Any new journal/outcome reference must be locale-neutral.

Preferred stable identity for an event-choice outcome:
- event ID;
- choice ID.

Optional context:
- variant ID only when presentation genuinely needs it;
- occurrence/day metadata only if already gameplay-owned and needed for rendering/order.

Do not use translated prose as identity.

## Backward compatibility

Old text-only saves must remain valid without migration failure.

A new reference field must be:
- optional for old saves; or
- introduced through a versioned Save migration that accepts all valid schema-4 text-only history.

The parser must not require a ref for legacy entries.

## No fuzzy prose migration

Forbidden:
- matching old RU text against current copy;
- matching old EN text;
- substring/semantic similarity;
- guessing event/choice identity from prose.

Copy edits make prose unstable.

If an old entry has no explicit stable identity, it remains text-only fallback.

## Optional ref shape

A safe conceptual shape is:

`{ eventId, choiceId }`

or a versioned tagged ref such as:
`{ kind: 'eventChoice', eventId, choiceId }`.

The exact schema is Lead-owned.

QA requirements:
- strict validation;
- locale-neutral IDs only;
- no rendered RU/EN string required for identity;
- old plain-string history still parses.

## Gameplay identity firewall

Adding refs must not rename or duplicate:
- event IDs;
- variant IDs;
- choice IDs;
- action IDs;
- Activity IDs;
- Night choice IDs.

The ref points at existing gameplay identity; it does not become new gameplay identity.

## Save neutrality

From identical pre-choice gameplay state, resolving the same exact event/choice under RU or EN must produce the same serialized gameplay state except for any pre-existing non-gameplay UI preference outside Save.

If a new ref is persisted:
- same eventId;
- same choiceId;
- same order;
- same occurrence metadata
in both locales.

No locale field belongs in the ref.

## Old-save test matrix

Required fixtures:
1. schema-4 save with text-only journal;
2. schema-4 save with text-only `lastAction.text`;
3. empty journal;
4. long journal near max length;
5. mixed old text-only and new ref-backed entries after the feature ships.

Every old fixture must:
- parse;
- preserve existing gameplay state;
- preserve old text;
- avoid guessed refs.

## Migration behavior

If Save schema version changes:
- migration must be deterministic;
- no network/content lookup;
- no fuzzy text lookup;
- no RNG;
- no gameplay command;
- no effect replay.

A migration may wrap known new entries created after the feature exists, but must not fabricate identity for legacy prose.

## Ref validation

For a new ref-backed entry:
- eventId and choiceId must pass stable ID syntax;
- renderer lookup may validate against current catalog;
- missing current catalog entry must fall back safely rather than corrupt Save.

Historical saves can outlive content edits.

## Rendering fallback

For a ref-backed entry:
1. localized `event.<eventId>.choice.<choiceId>.text`;
2. current embedded source text if available;
3. persisted legacy fallback text if stored.

For old text-only entry:
1. stored text.

Never derive identity from fallback text.

## Exactly-once guarantee

Reading or localizing a journal ref must not:
- reapply choice effects;
- increment counters;
- append another history entry;
- advance resolver;
- consume RNG;
- change pending scene.

Refs are historical presentation metadata only.

## Current PR52 compatibility

PR52 now ships 26 stable bilingual legacy choice-outcome keys.

Those keys are suitable render targets for future refs.

They do not require changing the underlying event/choice IDs.

## Acceptance verdict

`ACCEPTANCE_CONTRACT_READY`.

Approve only a backward-compatible optional/versioned ref design where old text-only saves remain valid and stable gameplay IDs drive localization.

Reject any design that infers refs from prose or stores locale-selected text as gameplay identity.
