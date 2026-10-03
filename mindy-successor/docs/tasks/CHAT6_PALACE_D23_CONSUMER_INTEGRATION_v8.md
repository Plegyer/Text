# Chat 6 — Palace D23 Consumer Integration v8

Status: **READY FOR CHAT2 AFTER CHAT4**
Owner: Chat 6 / Palace Producer
Branch: `chat6/palace-d23-consumer-integration-v8`
Exact dependency base: `chat4/hard-work-meta-shared-runtime-v1@c085eda62dd39f71d3a4c75a6c31f4c72527039a`

Source Palace prep:
- v4 `302c5cd636b2389edd05de2b4e50d5df8f88133d`
- v5 `c7b26032af9347af59c590de187abd7d44795050`
- v6 `29def63f348ffd0bf46c16a7a3c7292b0877db9a`
- v7 `c9125e7acc6639b90be36693707fde95382a8a71`

## Shared seam consumed

This branch does not reimplement Chat 4 Hard Work package semantics.

Palace consumes the frozen shared predicate:

```ts
palaceNewStartQualified({
  earnedHardWork,
  activePackages
})
```

Chat 4 remains authoritative for:

- permanent Hard Work ledger;
- active New Start+ package selection;
- package validation;
- exactly-once package application;
- 100/200 progression-stat cap;
- migration defaults.

## Palace-local consumer module

Added:

`src/core/palace.ts`

Palace-local identities:

- `palace.d23-qualified` — run-local internal qualification fact;
- `palace.access-granted` — run-local Palace access fact;
- fixed True Ending stat threshold: `91`.

`markPalaceCreationQualification()` calls the actual shared D23 predicate and only records/removes the Palace-local qualification fact.

It does not modify:

- stats;
- Lust;
- package selection;
- Meta;
- cap selection.

`palaceTrueEndingStatsReady()` remains raw all-12 `>=91`.

Lust is not part of that function.

The cap-200 Palace contribution remains wording/semantic copy only:

> The maximum of each of the 12 progression stats becomes 200 instead of 100; the values themselves are not multiplied.

## Creation-completion hook

`engine.ts` receives one Palace consumer hook.

Order is now:

```text
apply shared Hard Work packages
-> freeze applied active package identities
-> mark creation complete
-> mark Palace D23 qualification
-> register endings
-> creationCompleted resolver
```

This ordering is intentional.

The Day-1 event therefore sees the final shared package snapshot.

No Chat 4 package or cap semantics were changed.

## Live Day-1 invitation

Added:

`content/packs/palace-invitation.json`

### Arrival

`palace.invitation.day1-arrival`

- trigger: `creationCompleted`;
- condition: `palace.d23-qualified`;
- condition: no existing `palace.access-granted`;
- `critical_progression`;
- blocking;
- latched;
- `maxShows: 1`;
- no `chance`;
- no stat gate;
- no item gate.

### Reveal

`palace.invitation.reveal`

Triggered by resolution of the one-choice arrival scene.

Also:

- blocking;
- latched;
- `maxShows: 1`;
- no random/stat/item gate.

Its `accept` choice performs the only Palace access write:

```json
{
  "kind": "addWorldFact",
  "fact": "palace.access-granted"
}
```

Access is therefore run-local and serialized by the existing save system.

## RU / EN binding

Added eight localization entries for the two live event identities:

- titles;
- default variants;
- choice labels;
- choice result text.

The Russian and English text is sourced from v5 authored content.

No Palace media/topology binding is introduced.

## D23 behavior covered

Focused test:

`tests/palace-d23-consumer-integration-v8.test.ts`

Covers the real shared/runtime path:

- 9 permanent + 9 active -> no invitation;
- 10 permanent + 0 active -> no invitation;
- 10 permanent + 9 active -> no invitation;
- 10 permanent + 10 active -> deterministic Day-1 arrival;
- duplicates / Secret Debt / Palace cannot fill a missing ordinary career;
- Day-1 remains elapsed day 0;
- arrival history count is exactly one;
- save/reload preserves pending arrival;
- reveal is reload-safe;
- acceptance grants exactly one `palace.access-granted`;
- access survives reload in that same run;
- stale permanent `meta.unlocks['palace']` remains absent;
- restart/new life clears access and active package selection;
- next life must qualify again;
- migrated old completed save gets no retroactive qualification or invitation;
- invitation pack has no RNG/stat/item alternate entry gate;
- fixed True readiness remains all 12 progression stats `>=91`;
- a cap-200 life still uses raw 91;
- Palace qualification itself never modifies or multiplies stat values;
- live invitation/reveal identities have complete RU/EN localization.

## Migration boundary

Old completed schema-4 saves migrate through Chat 4 logic with:

- active packages empty;
- Hard Work packages marked already-applied for that old run;
- stale permanent Palace unlock stripped.

Palace qualification is only marked during a new successful `finishCreation`.

Therefore migration does not retroactively synthesize a Day-1 invitation.

## Static audit

Before freeze:

- shared D23 predicate: consumed directly;
- engine delta: one import + one hook call;
- Palace pack events: 2;
- both delivery policies: latched;
- both maxShows: 1;
- RNG chance fields: none;
- condition kinds: worldFact only;
- access writes: exactly one;
- RU/EN missing keys: 0;
- Prince/topology assumptions: 0.

## Explicitly untouched

No choice or implementation of:

- Prince mechanics;
- Prince victory signal;
- Palace 3-vs-6 topology;
- Palace career stages/shifts;
- shared New Start+ package meaning;
- shared Meta ledger meaning;
- shared cap activation semantics.

## Validation / CI

Focused acceptance tests were added.

No full CI was run by Chat 6.

Chat 2 remains the integration/full-CI owner.

Freeze exact SHA and report:

`READY_FOR_CHAT2_AFTER_CHAT4`
