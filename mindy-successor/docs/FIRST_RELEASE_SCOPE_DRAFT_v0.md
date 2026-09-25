# First Release Scope Draft v0

Дата: 2026-09-25.

Статус: **SCOPE PROPOSAL / NOT USER-LOCKED**.

Цель: отделить playable first release от полного design ambition.

## 1. Proposed release strategy

Не пытаться одновременно довести до production depth:
- все 10 jobs;
- Palace;
- full macro-goal;
- several Activity regions;
- все relationships.

Рекомендуется staged release.

## 2. Release 0 — Architecture proof

Только `ARCHITECTURE_MIGRATION_SLICE_v1.md`.

No production content requirement.

## 3. Release 0.5 — Product proof

`PRODUCT_ACCEPTANCE_SLICE_v0.md`.

Production-level:
- Lumber slice;
- School slice;
- Foreman relationship;
- Forest Activity;
- items;
- night;
- ending/meta.

Satyr Maid / Farm visible but not complete.

## 4. Release 1 candidate

### Careers
Production depth:
- Lumber;
- Satyr Maid;
- Undead Farm.

Additional careers:
- 2–3 early/mid careers at partial-to-full depth, candidate set:
  - Tavern;
  - Hunter;
  - Guard.

Remaining ordinary jobs can unlock/appear later in development.

### School
Several real tracks:
- literacy/accounting;
- arcana;
- rhetoric/etiquette;
- practical/physical;
- performance if Satyr route needs it.

### Housing
- normal;
- cheap;
- street.

### Night
- normal sleep;
- night study;
- relationship meetings;
- street outcomes;
- forced hook framework.

### Secret Debt
Option A:
include fully if content budget allows.

Option B:
ship route later but keep architecture/content IDs ready.

Because user considers poverty meaningful, ordinary poverty cannot be cut even if Secret Debt is delayed.

### Activity
- Forest region production-ready;
- second region only if first proves reusable.

### Items
Initial capability catalog subset.

### Endings
Each production-depth career:
- Hard Work;
- at least two complex outcomes.

### Meta
- profession rewards;
- knowledge fragments;
- visible unlock progression toward Palace.

Palace itself may remain future content if first release scope is intentionally smaller.

## 5. Full 1.0 alternative

If "first release" means complete intended game, scope is far larger:
- all 10 ordinary jobs production depth;
- Secret Debt;
- Palace;
- multiple Activity regions;
- full School;
- major relationship network;
- macro-goal.

Это возможно как конечная цель, но не как первый integration milestone.

## 6. Why starter-first

Three starting jobs deliberately cover:
- physical;
- social/night;
- magical/production.

If all three feel deep, architecture likely generalizes.

## 7. Acceptance

Release scope is ready only after user decides:
- staged early release vs full-game-only release;
- whether Secret Debt required in first public build;
- whether Palace required in first public build;
- how many Activity regions;
- how many ordinary jobs production-complete at first public milestone.

## 8. Recommendation

Для разработки:
**staged internal milestones обязательно**, даже если пользователь хочет публично выпускать только полную игру.

Git checkpoints should always remain playable.
