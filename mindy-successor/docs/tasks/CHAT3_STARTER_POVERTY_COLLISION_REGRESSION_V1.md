# Chat 3 Starter-Career / Poverty Collision Regression v1

Status: C3-23 focused content-side regression handoff.
Owner: Chat 3 / Forest + Poverty Content Bundles Worker.
Authoring current main: `3cb4197e946d8b15a744b07106be67e964b96f41`.

Manifest:
`prior-work/astra/prototype-m3.2/content/chat3-starter-poverty-collision-v1.fixture.json`.

Executable regression:
`prior-work/astra/prototype-m3.2/tests/chat3-starter-poverty-collision-v1.test.ts`.

## Purpose

This regression protects the C3-15…C3-22 content slice without asserting ownership over shared runtime/UI or over missing gameplay systems.

It proves:
- Satyr Maid identity fixtures remain exact to the current typed career and existing seasonal scene IDs;
- Undead Farm identity fixtures remain exact to the current typed career and existing seasonal scene IDs;
- no Satyr Maid / Undead Farm event, relationship or ending is silently invented by the content bundles;
- the existing global `preserve_specimen` capability is referenced without pretending that Undead Farm consumes it;
- all new RU/EN starter-career strings are complete;
- all new poverty depth keys point to current production event/variant pairs and remain absent from current production localization until selectively integrated;
- poverty contact effect snapshots match the exact existing positive choices;
- no persistent contact/recovery/Secret Debt system is introduced.

## Satyr Maid guards

The test deep-compares:
`content/satyr-maid-content-identity-map-v1.fixture.json`
against the current `satyr-maid` career definition.

It also checks that:
- `satyr-maid.shift` keeps exactly the four current seasonal scene IDs;
- C3-16 and C3-17 attachments use only those scene IDs;
- production still has no Satyr Maid event/relationship/ending identity;
- guest/flirt/boundary/reputation persistent identities remain absent;
- content fixtures explicitly keep those dimensions presentation-only.

The regression does not invent or test future thresholds.

## Undead Farm guards

The test deep-compares:
`content/undead-farm-content-identity-map-v1.fixture.json`
against the current `undead-farm` career definition.

It checks that:
- `undead-farm.shift` keeps exactly the four current seasonal scene IDs;
- C3-19 and C3-20 hooks use only those scene IDs;
- production still has no Undead Farm event/relationship/ending identity;
- Research / Successor / External route identities remain absent;
- C3 fixtures do not create research facts, specimen items, relationship state, world facts or Activity hooks.

## Preservation capability guard

Current production item:
`field_preservation_kit`.

Current capability:
`preserve_specimen`.

The test requires that capability to exist, while all three Undead Farm fixtures must still mark their Farm consumer as absent.

This prevents content prose from being mistaken for a working specimen/research mechanic.

## Poverty depth collision guard

The test loads all six ordinary-poverty production packs and validates every C3-21/C3-22 entry against:
- exact `eventId`;
- exact `variantId`.

It requires all new candidate keys to:
- be unique across the C3-21/C3-22 slice;
- use `presentation.poverty.depth.*`;
- be absent from current production localization before integration;
- avoid Secret Debt/lender namespaces.

## Poverty effect guard

For each C3-22 entry, the test resolves its current positive choice and deep-compares production `effects` with the fixture's read-only `currentEffectSnapshot`.

It then requires:
- `persistentContact === false`;
- no relationship write;
- no career write;
- no contact counter;
- no recovery milestone;
- no debt/Secret Debt state.

The snapshots are compatibility evidence, not new balance locks.

## RU/EN parity

The test requires non-empty RU and EN values for:
- C3-16 Satyr service;
- C3-17 Satyr boundary/reputation variants;
- C3-19 Undead research/agriculture;
- C3-20 Undead successor/external hooks;
- C3-21 poverty seasonal depth;
- C3-22 poverty contacts/recovery depth.

## Ownership boundary

Manifest flags explicitly preserve external ownership for:
- School state/content;
- relationship-state implementation;
- shared runtime/UI;
- media;
- Save/RNG;
- Secret Debt runtime.

The executable test checks those flags together with the content-level invariants.

This is intentionally a content collision regression, not QA acceptance and not a shared-runtime regression.

## C3-23 execution rule

C3-23 authors the regression source.

C3-24 must place the files on a fresh current-main candidate and run repository CI on the exact PR head. If main has already consumed any candidate localization key before C3-24, the fixture/test must be refreshed rather than suppressing the collision.

## C3-23 disposition

Ready for the C3-24 candidate:
- self-contained manifest;
- executable starter-career identity guards;
- poverty identity/effect/collision guards;
- RU/EN parity checks;
- explicit ownership boundaries.

No shared runtime/UI, School, relationship, media, Save/RNG or Secret Debt implementation is added.
