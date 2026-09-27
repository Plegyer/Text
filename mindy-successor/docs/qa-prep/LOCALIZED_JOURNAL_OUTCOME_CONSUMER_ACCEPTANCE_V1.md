# Localized journal/outcome consumer acceptance v1

Status: COMPLETE / EXECUTABLE_ACCEPTANCE_CONTRACT

Current main:
`d383a2282a15eb4ebc1bbb2fef2bbf9f3f2087fe`.

Purpose:
define production acceptance for any future shared Lead consumer that localizes post-choice outcome and Journal presentation without making gameplay Save locale-dependent.

## Current behavior to preserve semantically

Current choice resolution:
1. validates the current pending choice ID;
2. applies the current exact choice effects once;
3. appends embedded `sceneChoice.text` to the journal;
4. may copy the same embedded text into `lastAction.text`;
5. clears pending;
6. resumes resolver flow.

Existing old saves therefore may contain plain source-text Journal/lastAction strings.

A localization fix must not reinterpret those strings as gameplay identity.

## Stable identity requirement

For new locale-aware outcome presentation, visible text must be driven by stable locale-neutral identity.

Preferred exact identity:
- `eventId`;
- `choiceId`.

Localization key:
`event.<eventId>.choice.<choiceId>.text`.

Optional persisted/reference structures may include stable IDs, but never the selected RU/EN prose as the identity.

## Save neutrality

From the same pre-choice Save and same exact choice ID, RU and EN must produce the same gameplay state.

Locale must not change:
- pending event identity before resolution;
- selected variant;
- selected choice ID;
- effects;
- flags;
- metrics/resources;
- counters/progression;
- event history semantics;
- resolver boundary behavior;
- RNG state/evolution;
- next pending event;
- endings;
- Activity/NightFlow state.

Rendered text may differ.

## No locale-selected prose write

Do not solve localization by assigning:
- current RU string to Save when locale=ru;
- current EN string to Save when locale=en.

That would make equivalent gameplay Saves differ by locale.

If a durable outcome reference is added, persist locale-neutral IDs and resolve text at render time.

## Exactly-once gameplay rule

Switching locale while viewing:
- a post-choice result;
- Journal;
- lastAction-derived outcome
must not:
- dispatch the choice again;
- apply effects again;
- increment counters;
- append a duplicate history/journal transaction;
- run a resolver boundary;
- consume RNG.

Localization is a read-only presentation operation.

## Render-time lookup

When a stable outcome identity is available:
1. compute `event.<eventId>.choice.<choiceId>.text`;
2. resolve in current locale;
3. fall back to current embedded/stored source text if missing;
4. render.

Changing locale should rerun only this presentation lookup.

## Old-save compatibility

Old saves containing plain Journal/lastAction strings must remain readable.

Required rules:
- do not infer event/choice identity by fuzzy matching prose;
- do not rewrite old saves merely because locale changed;
- if no stable identity is available, render the stored legacy text unchanged;
- preserve existing Save parser compatibility.

If a Save schema extension is introduced, it requires an explicitly versioned migration with regression coverage.

## Mixed-history behavior

A save may contain:
- old text-only journal entries;
- newer identity-backed outcome entries.

The UI must render both without failure.

Expected behavior:
- identity-backed entries can localize dynamically;
- legacy text-only entries remain stored/fallback text.

No historical gameplay meaning is recomputed.

## Historical semantics

Localized presentation must not alter what happened.

For every historical outcome, preserve:
- exact original event/choice identity where known;
- original effects/flags/resources;
- original ordering;
- original timestamp/day semantics if present;
- original outcome occurrence count.

Translations are views of the same historical gameplay fact.

## lastAction acceptance

If `lastAction` keeps its current embedded text for compatibility, a separate stable presentation reference may override visible text.

Do not mutate `lastAction.text` on locale switch.

If `lastAction` schema changes, migration must preserve old saves and gameplay identity.

## Journal acceptance

Journal UI must not store translated display strings back into gameplay Save merely from rendering.

Locale switches across Journal view must leave serialized gameplay Save identical.

## Fallback safety

Missing localization must be nonfatal.

Fallback order:
1. localized stable key when identity exists;
2. embedded/stored source text;
3. safe empty/text-only presentation only if legacy source is genuinely absent.

Missing EN must not block gameplay or hide history.

## Executable test matrix

### Pending -> resolved paired locale test

From cloned identical pre-choice Saves:
- resolve the same exact choice under RU and EN;
- compare all gameplay fields after resolution;
- require effects exactly once;
- require same RNG evolution;
- allow only rendered text difference.

### Post-choice locale switch test

After one choice is already resolved:
- snapshot serialized gameplay Save;
- render RU;
- switch to EN;
- require same Save byte-for-byte;
- require same stable event/choice reference;
- require translated visible outcome.

### Journal switch test

With several identity-backed entries:
- render RU Journal;
- switch to EN;
- same entry order/count/identity;
- translated visible text only;
- Save unchanged.

### Old-save test

Load a pre-feature save containing text-only Journal/lastAction:
- parser succeeds;
- old text remains visible;
- no guessed identity;
- locale switch does not rewrite save.

### Mixed-save test

Load a save with legacy and identity-backed entries:
- both render;
- only identity-backed entries localize dynamically;
- ordering and gameplay history remain unchanged.

## Ownership boundaries

This shared consumer may serve multiple localized event families.

It must not itself:
- add event content;
- change route ownership;
- alter School/poverty/Foreman/Forest mechanics;
- introduce Secret Debt;
- change Product decisions.

## CI acceptance

Require exact-head:
- typecheck;
- validate;
- build;
- full test suite;
- paired RU/EN choice-resolution invariance;
- Journal Save-invariance;
- lastAction Save-invariance;
- old-save compatibility.

Then require successful post-merge main push.

## Verdict

Accept only an implementation where:
`stable gameplay identity -> locale-specific rendered text`.

Reject:
`locale-specific rendered text -> gameplay Save identity`.
