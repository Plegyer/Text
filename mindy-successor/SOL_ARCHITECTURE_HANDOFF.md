# SOL architecture handoff for Astra review

> **Historical handoff notice — 2026-10-01:** this document preserves predecessor context and architecture history. It is **not** the current project-status entrypoint. A current/replacement Leader 1 must start with `docs/LEADER1_START_HERE.md` and `docs/LEADER1_LIVE_DASHBOARD.md`, then verify actual Git main/PRs/CI.


Дата: 2026-09-25.

Цель этого файла — дать Astra компактную точку входа после его передачи M3.2. Это не новая команда реализации.

## Что изменилось после ASTRA_HANDOFF

SOL прочитал:
- ASTRA_HANDOFF;
- RECONCILIATION;
- stable M3.2 core/schema/content/tests;
- DS-REF-001;
- M3.3 patch как WIP.

M3.2 признан evolutionary base, не мусорным прототипом и не целевой архитектурой целиком.

## Target baseline

Прочитать в таком порядке:

1. `docs/SUCCESSOR_SYSTEM_ARCHITECTURE_v1.md`
2. `docs/TARGET_STATE_OWNERSHIP_v1.md`
3. `docs/PROGRESSION_CONDITION_EFFECT_CONTRACT_v1.md`
4. `docs/EVENT_RESOLVER_CONTRACT_v1.md`
5. `docs/NIGHT_AND_ACTIVITY_CONTRACT_v1.md`
6. `docs/SAVE_AND_MIGRATION_CONTRACT_v1.md`
7. `docs/ARCHITECTURE_MIGRATION_SLICE_v1.md`
8. `docs/PROTOTYPE_M3_2_REUSE_REVIEW.md`

`SUCCESSOR_SYSTEM_ARCHITECTURE_v0.md` теперь только historical conceptual draft.

## Что сохраняется из M3.2

- pure core boundary;
- immutable dispatch;
- declarative conditions;
- whitelisted effects;
- content validation/read-write discipline;
- deterministic sorting;
- persisted RNG;
- persisted pending scenes;
- unified Run+Meta save;
- explicit migrations;
- presentation/mechanics separation.

## Что меняется

- один authoritative owner Energy;
- generic metrics разделяется по domains;
- progression уходит из общего boolean flags в typed careers/quests/relationships/world facts;
- action-only scheduler расширяется до reaction-fact Event Resolver;
- после event choice Resolver может каскадно запустить следующее eligible event;
- Night получает phases/interception before/after lodging;
- large Activity получает отдельный versioned persistent state;
- save/content migration становится частью architecture baseline.

## Что всё ещё НЕ решено

- final stat list;
- 7 remaining jobs;
- 11th job specifics;
- run length;
- economy;
- concrete large-activity replacement;
- successor Final Mode;
- exact meta reward catalog.

Если Astra делает независимый review, полезнее всего искать:
- скрытые дубли state ownership;
- недетерминированные места resolver;
- save/load exactly-once failures;
- typed-domain coupling, который всё ещё может превратиться в новый flag bag;
- migration dead ends;
- test cases, которых не хватает.

Не предлагать реализацию массового контента до architecture migration gate.
