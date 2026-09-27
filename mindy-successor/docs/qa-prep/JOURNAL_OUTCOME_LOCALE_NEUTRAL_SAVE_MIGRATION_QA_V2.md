# Journal/outcome locale-neutral Save migration QA v2

Status: COMPLETE / SHARED_CONSUMER_ACCEPTANCE_CONTRACT

Current main:
`f93878b954385a1c61d8a06a0673354207d11d70`.

## Current persistence behavior

On current main, resolving a pending event choice:
- applies the selected current choice effects;
- appends embedded `sceneChoice.text` as a plain Journal string;
- when a current lastAction exists, assigns embedded `sceneChoice.text` to `lastAction.text`.

Old saves therefore contain text-only historical outcome entries.

Any migration must preserve those saves.

## Core prohibition

Never persist the active RU or EN translation as gameplay identity.

Do not implement:
- locale=ru -> store RU localized prose;
- locale=en -> store EN localized prose.

Equivalent gameplay must not serialize differently because of locale.

## Stable identity when available

For a newly identity-backed outcome, use exact stable IDs:
- event ID;
- choice ID.

Canonical display key:
`event.<eventId>.choice.<choiceId>.text`.

Variant ID may be retained if presentation needs it, but the outcome key remains event+choice identity.

No locale suffix belongs in the stored identity.

## Allowed Save strategy

If shared runtime needs durable references, add a versioned locale-neutral structure, e.g. an outcome reference containing stable IDs.

The exact schema is Lead-owned.

Requirements:
- versioned;
- parser-compatible;
- deterministic;
- no translated prose as identifier;
- old saves remain loadable.

## Old text-only saves

For old Journal/lastAction entries that lack stable IDs:
- keep the stored text;
- render it as fallback;
- do not guess an identity from prose;
- do not fuzzy-match RU wording;
- do not rewrite the Save simply because locale changes.

Historical text can remain in its original stored language when no identity exists.

Backward compatibility is more important than speculative translation.

## No fuzzy prose-to-ID migration

Forbidden migration inputs:
- string equality against current RU copy;
- partial text match;
- translated EN phrase;
- title/body inference;
- semantic similarity.

Copy can change over time; prose is not a stable key.

Only explicit stable metadata can authorize dynamic localization.

## Mixed-save requirement

A save may legitimately contain:
- legacy text-only entries;
- newer identity-backed entries.

The UI must render both.

Expected:
- identity-backed entries localize at render time;
- text-only entries render stored fallback;
- ordering/count remains unchanged;
- gameplay history is not recomputed.

## Locale-switch invariant

For an already-resolved identity-backed outcome:
1. snapshot serialized gameplay Save;
2. render RU;
3. switch to EN;
4. render EN;
5. switch back.

Require:
- exact same serialized gameplay Save throughout;
- same event/choice reference;
- same history ordering;
- same effects/flags/resources;
- same RNG;
- only rendered localized text changes.

## Exactly-once choice transaction

Rendering/migrating must never:
- re-dispatch choice;
- reapply effect;
- increment counter;
- append a duplicate Journal event;
- run resolver;
- consume RNG;
- alter next pending scene.

Migration is data compatibility/presentation plumbing only.

## lastAction rule

If `lastAction.text` remains for backward compatibility:
- do not mutate it during locale switch;
- prefer a separate stable presentation reference when available;
- use stored text as fallback.

If `lastAction` schema is versioned, old entries must parse with the previous text field.

## Journal rule

Do not replace the whole existing Journal with translated strings during load.

If identity-backed entries are introduced:
- preserve order;
- preserve legacy text;
- preserve occurrence count;
- preserve save/reload exactly.

## Parser regression matrix

Required old-save fixtures:
- text-only Journal;
- text-only lastAction;
- no Journal entries;
- long legacy Journal;
- mixed old/new entries after migration introduction.

All must parse.

No parser may require an event/choice reference for an old entry.

## Presentation fallback order

For identity-backed entry:
1. localized stable key;
2. embedded/current source fallback associated with the stable identity;
3. stored legacy text if present.

For text-only entry:
1. stored text.

Never infer identity from text.

## Product/gameplay isolation

The consumer/migration does not authorize:
- changing event effects;
- rewriting history semantics;
- changing endings;
- changing Forest/School/poverty/Foreman mechanics;
- Secret Debt.

## CI gate

Exact-head tests must include:
- old-save parse;
- mixed-save parse;
- RU↔EN Save byte invariance;
- same event/choice IDs;
- same RNG;
- exactly-once effects;
- Journal order/count invariance;
- lastAction compatibility.

Then require post-merge main CI.

## Verdict

Accept only:
`stable locale-neutral outcome identity -> localized render`.

Reject:
`localized prose -> inferred/stored gameplay identity`.
