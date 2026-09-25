# Implementation Phases and Packages v0

Дата: 2026-09-25.

Статус: **EXECUTION PLANNING DRAFT**.

Цель: после design lock исполнители работают маленькими проверяемыми пакетами и не принимают архитектурные решения самостоятельно.

## Phase A — Architecture Migration

Source:
`ARCHITECTURE_MIGRATION_SLICE_v1.md`.

### A1 State/schema
Owner candidate: SOL.

Deliver:
- target-shaped state;
- migrations fixture;
- tests.

### A2 Condition/Effect v2
SOL.

### A3 Event Resolver
SOL.

### A4 Night flow
SOL.

### A5 Activity envelope
SOL.

### A6 Ending/meta exactly-once
SOL.

Gate:
all architecture acceptance tests.

## Phase B — Product Shell

### B1 HUD/central stage/navigation
SOL.

### B2 presentation contract integration
SOL.

### B3 editor override migration
bounded task.

Gate:
shell flow without final art.

## Phase C — Lumber Product Slice

### C1 Lumber repeatable work
Possible smaller executor packages:
- base shifts;
- seasonal variants;
- work styles after D3.

### C2 Lumber career stages
SOL integration.

### C3 Foreman relationship
Split beats into small packages.

### C4 School hook
Small bounded package.

### C5 Initial items
Small packages by capability family.

### C6 Forest Activity
SOL integration + small encounter packs.

### C7 endings/meta
SOL.

Gate:
`PRODUCT_ACCEPTANCE_SLICE_v0.md`.

## Phase D — Starter Trio

### D1 Satyr Maid
Split:
- shift pools;
- recurring guest relationship;
- House Power;
- Boundary route;
- endings.

### D2 Undead Farm
Split:
- seasonal production;
- resources/items;
- research;
- relationship;
- endings.

Gate:
three starting jobs playable through mid/late progression.

## Phase E — Economy/Poverty

After D4 calendar and economy lock.

Packages:
- housing ladder;
- street events;
- cheap lodging;
- simulations;
- Secret Debt trigger;
- Slave career;
- three endings.

Secret route content should be isolated so UI does not leak IDs.

## Phase F — Roster Expansion

Suggested order by dependency:
1. Tavern
2. Hunter
3. Merchant
4. Guard
5. Artist/Geisha
6. Prostitute
7. Assassin

Reason:
earlier jobs create networks/items/economy used by later ones.

Each career delivered as:
- definitions/state;
- repeatable pool;
- milestones;
- relationship;
- cross-hooks;
- endings;
- tests.

## Phase G — Activity Expansion

After Forest proves adapter:
- second region;
- specialized mechanics;
- camp if D8;
- additional NPC chains.

## Phase H — Palace/Meta

Requires:
- Hard Work tracking;
- D6 threshold;
- enough legacy rewards implemented.

Packages:
- discovery/unlock;
- repeatable assignments;
- legacy-sensitive scenes;
- career routes;
- Inner Truth;
- meta UI.

## Phase I — Macro Goal

Only after authorial lore lock.

Packages by knowledge constellation.

Do not let implementer invent final mystery.

## Phase J — Content/Polish

- media replacement;
- additional variants;
- balancing;
- accessibility;
- Windows packaging;
- migration hardening.

## Package template

```text
ID:
Goal:
Depends on:
Read:
May write:
Must not write:
Inputs:
Outputs:
Tests:
Acceptance:
Integration:
Rollback checkpoint:
```

## DeepSeek package rules

Good:
- 1 event family;
- 1 seasonal set;
- 1 relationship beat cluster;
- 1 item integration;
- 1 validator/test addition.

Bad:
- "implement the whole job";
- "fix architecture";
- "balance the game";
- "add all events".

## SOL package rules

Use for:
- cross-domain state changes;
- schema/migrations;
- resolver;
- whole career state integration;
- Activity adapter;
- economy simulations;
- final acceptance.

## Commit discipline

Every package:
- starts from named commit;
- produces named commit;
- no unrelated formatting;
- updates status only after tests pass.

## Failure recovery

If package stops:
- do not pile new work on dirty tree;
- record exact incomplete files;
- keep rejected patch separate;
- restore last green checkpoint before reassignment.
