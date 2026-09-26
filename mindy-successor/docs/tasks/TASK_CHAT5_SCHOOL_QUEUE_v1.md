# Chat 5 — School Runtime Queue v1

Base: `1a15f79ba74ba3ef82bc8997d2458fe5a571bedb`
Branch: `chat5/school-runtime-slice`

Locked School baseline is already in main.

## No-idle rule

Finish Item 1 and immediately continue Item 2. Do not wait for Lead merge.

## Queue Item 1 — Executable School catalog module

Create an isolated production-grade School module/data source without editing shared engine/schema.

Allowed writes:
- new `src/core/school.ts` or equivalent new School-only module;
- new School-only data files under `content/`;
- new `tests/school-target*.test.ts`;
- School prep docs if needed for exact implementation notes.

The module must encode exactly the 8 locked courses:
- 300/500/300/400/400/400/500/400 currency;
- 1 current-day Energy each;
- exact accepted multi-stat packages;
- Lust excluded;
- all 12 progression stats directly covered.

Expose deterministic helpers/data that the Lead can wire to the engine without duplicating balance constants.

## Queue Item 2 — School transaction fixture

Using existing target state/effect APIs and a dedicated test catalog/fixture, prove:
- lesson rejects insufficient money/Energy atomically;
- tuition and 1 Energy charge exactly once;
- full multi-stat package lands before Resolver observation;
- School result can trigger a free reactive career event without another Work action;
- save/reload after paid lesson cannot recharge tuition/Energy;
- Night study remains separate: Night slot, +2 supported stat, next-day Energy -1, zero tuition;
- no certificate/milestone is granted by ordinary night study unless explicitly authored.

Do not invent teachers, certificates, milestones or new economic values.

## Queue Item 3 — Integration-ready handoff

If Items 1–2 are green:
- produce the smallest exact wiring diff/spec needed for Lead integration into active catalog/engine;
- identify only unavoidable shared-file edits;
- do not wait for review.

## Handoff

SHA, changed paths, test count, blockers only.
