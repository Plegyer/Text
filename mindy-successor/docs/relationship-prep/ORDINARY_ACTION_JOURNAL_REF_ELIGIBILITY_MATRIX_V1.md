# Ordinary Action Journal Ref Eligibility Matrix v1

Date: 2026-09-28
Owner: Chat 5
Exact current-main baseline: `54131488c65302f81b3001abaaa345d21f0281e2`

## Current storage rule

Journal rows are stored as:
- `historyState.journal: string[]`
- parallel `historyState.journalRefs`

Current `log(s,text,ref?)` receives a stable ref for event-choice outcomes, but ordinary action completion calls omit the ref.

## Ordinary action completion rows

| Action ID | Stable action identity elsewhere | Completion journal ref today | Localized Journal eligibility | Current fallback |
|---|---|---|---|---|
| `work` | `lastAction.id` / action catalog ID | none | RAW_FALLBACK | stored source string |
| `forage` | `lastAction.id` / action catalog ID | none | RAW_FALLBACK | stored source string |
| `brew` | `lastAction.id` / action catalog ID | none | RAW_FALLBACK | stored source string |
| `sell` | `lastAction.id` / action catalog ID | none | RAW_FALLBACK | stored source string |
| `scales` | `lastAction.id` / action catalog ID | none | RAW_FALLBACK | stored source string |
| `exam` | `lastAction.id` / action catalog ID | none | RAW_FALLBACK | stored source string |
| `deliver` | `lastAction.id` / action catalog ID | none | RAW_FALLBACK | stored source string |
| `visit` | `lastAction.id` / action catalog ID | none | RAW_FALLBACK | stored source string |
| `oddjob` | `lastAction.id` / action catalog ID | none | RAW_FALLBACK | stored source string |
| `repay` | `lastAction.id` / action catalog ID | none | RAW_FALLBACK | stored source string |
| `rent-room` | `lastAction.id` / action catalog ID | none | RAW_FALLBACK | stored source string |
| `rest` | `lastAction.id` / action catalog ID | none | RAW_FALLBACK | stored source string |
| `arrival` | `lastAction.id` / action catalog ID | none | RAW_FALLBACK | stored source string |
| `forest-search` | `lastAction.id` / action catalog ID | none | RAW_FALLBACK | stored source string |
| `tavern-talk` | `lastAction.id` / action catalog ID | none | RAW_FALLBACK | stored source string |
| `landlord` | `lastAction.id` / action catalog ID | none | RAW_FALLBACK | stored source string |

For every row above, current engine logs:

`<raw catalog action label>. Осталось энергии: <value>.`

with `journalRef=null`.

Therefore **none** of the ordinary action completion rows can be safely rerendered in another locale today.

## Brew extra rows

| Log kind | Prepared localization key | Journal ref today | Classification |
|---|---|---|---|
| brew success | `action.brew.recipe.success.text` | none | RAW_FALLBACK |
| fast brew failure | `action.brew.recipe.fastFailure.text` | none | RAW_FALLBACK |

These source keys are useful for future writes/presentation, but current stored rows have no stable ref.

## Event-choice rows after actions

Some ordinary actions can trigger or precede a blocking event through the resolver. When the player later resolves that event choice, the **event-choice row** can carry:

`{kind:'eventChoice', eventId, choiceId}`

and the Journal UI can rerender it through:

`event.<eventId>.choice.<choiceId>.text`

Classification:
- event-choice row: LOCALIZABLE_BY_EXISTING_REF
- preceding ordinary action completion row: RAW_FALLBACK

Do not conflate the two rows.

## Action result screen is not Journal identity

Current `lastAction.id`, `presentationId`, and item-149 action/scene mapping are enough to define a result-screen presentation lookup for the exact current one-scene ordinary actions.

They are **not** attached to existing Journal rows, so they cannot be used to retroactively localize those rows without guessing.

## No fuzzy migration

Not allowed:
- matching stored Russian text to action labels;
- inferring an action ID from sentence contents;
- rewriting old/current Journal rows on locale switch.

## Save-schema boundary

This item proposes no new Save field and no journal-ref schema change.

If Lead later adds ordinary action journal refs, that is shared runtime/Save ownership and requires a separate reviewed task.

## Invariants

Locale switching must not:
- modify Journal arrays;
- create refs;
- rewrite stored prose;
- re-run an action;
- change effects/resources;
- consume RNG.
