# IMPLEMENTATION PACKAGE A2 — Condition / Effect v2

Дата: 2026-09-26.

Статус: **IN IMPLEMENTATION**.

Base commit:
`7aae08b41f4f23243cd727167aedb53a7c4a28c0` (A1 merged green).

Branch:
`a2-condition-effect-v2`.

## Goal

Add the target typed declarative Condition/Effect layer on top of schema v4 without yet implementing the A3 reaction resolver or migrating all production/demo content.

Legacy M3.2 leaves remain read-compatible during migration:
- metric;
- flag;
- visits;
- season;
- housing;
- unlock;
- item.

New target content must be able to avoid generic metrics/flags.

## Allowed writes

Core:
- `src/core/schema.ts`
- `src/core/engine.ts`
- `src/core/content.ts`

Tests:
- `tests/content.test.ts`
- `tests/engine.test.ts`
- optional new focused test file.

Docs:
- prototype `docs/STATUS.md`
- this package document
- `PROJECT_STATE.md` after green validation.

No production JSON migration is required in A2.

## Condition v2 target leaves

Implement typed leaves for:
- stat;
- resource (money);
- itemCount;
- calendar year/season/dayInYear/elapsedDays;
- career stage/shifts/counter/fact/choice;
- quest stage/counter/fact/choice;
- relationship stage/counter/fact/choice;
- worldFact;
- meta unlock/endingCompleted/hardWork;
- all/any/not.

No arbitrary save-path condition.

## Effect v2 target leaves

Implement:
- modifyStat;
- modifyResource;
- modifyEnergy;
- addItem/removeItem;
- setHousing;
- incrementCareerCounter;
- addCareerFact;
- setCareerChoice;
- advanceCareer;
- incrementQuestCounter;
- addQuestFact;
- setQuestChoice;
- advanceQuest;
- incrementRelationshipCounter;
- addRelationshipFact;
- setRelationshipChoice;
- advanceRelationship;
- addWorldFact/removeWorldFact;
- addNextDayModifier.

Meta mutation is NOT exposed as a normal content effect in A2.

## State machines

Definitions may optionally declare:
- careers;
- quests;
- relationships.

Each machine:
- id;
- label;
- initialStage;
- stages;
- transitions.

Transition:
- id;
- from[];
- to;
- conditions[];
- effects[].

Runtime Advance* must:
- resolve named definition;
- verify current stage in from;
- verify transition conditions;
- update stage;
- apply allowed transition effects.

Nested Advance* inside transition effects is rejected in A2 to prevent recursion.

## Effect ordering

Target effect batch order:
1. stat/resource/item/current-Energy writes;
2. domain counters/choices/facts + world facts;
3. named domain transitions;
4. next-day modifiers.

The original Save passed to dispatch remains unchanged on failure.

## Package capabilities

Keep legacy pack `reads/writes` flags for M3.2 packs.

Add optional typed `capabilities` manifest:
- reads: stats/resources/careers/quests/relationships/worldFacts/meta;
- writes: stats/resources/inventory/energy/housing/careers/quests/relationships/worldFacts/nextDay.

Any typed pack read/write without declared capability is rejected.

Cross-domain stage mutation is only through named public effects/transition IDs, never raw paths.

## Required tests

- shipped legacy catalog remains valid;
- typed conditions read each target owner correctly;
- typed effect batch updates target owners without generic flags;
- counter/fact update can make a same-batch named transition valid due defined ordering;
- invalid transition ID rejected atomically;
- transition from wrong stage rejected atomically;
- undeclared typed pack write rejected;
- unknown machine IDs/stages rejected at load;
- contradictory typed stat/resource thresholds rejected;
- meta read works but direct meta mutation effect is absent;
- schema4 JSON remains free of duplicate authoritative owners.

## Acceptance

`npm run check` must pass on a real runner.

A2 does not claim:
- A3 resolver;
- reaction facts;
- Night flow;
- Activity envelope;
- RunResult/meta awarding.
