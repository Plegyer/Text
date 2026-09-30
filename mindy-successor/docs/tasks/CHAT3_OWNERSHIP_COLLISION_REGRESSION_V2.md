# Chat 3 Ownership / Collision Regression v2

Status: C3-59 focused content-side regression.
Owner: Chat 3 / Forest + Poverty Content Bundles Worker.

Manifest:
`prior-work/astra/prototype-m3.2/content/chat3-ownership-collision-v2.fixture.json`.

Executable test:
`prior-work/astra/prototype-m3.2/tests/chat3-ownership-collision-v2.test.ts`.

## Collision coverage

The regression checks queue-v6 authored localization keys against:
- current root production localization;
- merged Chat 3 v5 fixture-local keys from PR #108.

It also requires every queue-v6 candidate key to remain unique.

## Presentation / media boundary

Forest fixtures may reference existing presentation IDs only.

The regression verifies the referenced Forest route/return/reaction IDs already exist in the production presentation registry.

Queue-v6 authored localization keys may not claim:
- School/course namespaces;
- media localization namespaces;
- static presentation-source namespaces.

Queue-v6 fixtures may not author asset paths.

## Shared-system boundary

The manifest keeps outside Chat 3 ownership:
- School content;
- presentation registry and media sources;
- shared runtime/UI;
- Save schema;
- gameplay RNG;
- career/relationship state machines;
- NightFlow;
- ending framework.

## C3-59 disposition

Current evidence records:
- 46 queue-v6 RU/EN candidate strings;
- zero root-localization collisions;
- zero collisions with merged v5 fixture-local keys;
- existing presentation IDs only.

Ready for C3-60 current-main refresh and exact-head candidate CI.
