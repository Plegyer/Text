# Salary Tier Model v0

Дата: 2026-09-25.

Статус: **BALANCE FRAMEWORK / CANDIDATE**.

Companion to `HOUSING_AND_WAGE_BACKBONE_v1.md`.

## 1. Purpose

Salary is not a universal formula.

Each job has its own:
- base;
- relevant-stat contribution;
- career rank;
- seasonal/event variance;
- special contract/tip/resource income.

But all jobs need a shared order-of-magnitude so housing/School can be simulated.

## 2. Target average-equivalent bands

### Starting ordinary jobs

Target early average:
**~1 WU per shift**.

Fresh low-stat range candidate:
- ~0.7–1.2 WU.

Developed Year-1 range:
- ~1.0–1.6 WU.

### Mid jobs

Target average after unlock:
**~2 WU per shift**.

Candidate broad range:
- ~1.5–2.8 WU.

### Late jobs

Target average:
**~3 WU per shift**.

Candidate broad range:
- ~2.3–4.2 WU.

### High career rank / Year 4

Strong late-career average-equivalent can approach:
**~4 WU**, with spikes above it.

## 3. Income shape matters

Stable jobs:
- narrow variance.

Tip/contract jobs:
- wider per-shift variance but similar long-run mean.

Merchant:
- can outperform tier average through capital/risk, but not infinite arbitrage.

Hunter/Farm:
- part of value may be resource/item output rather than immediate cash.

Activity-linked professions:
- some high returns may require the 2-Energy expedition separately and must not be double-counted as ordinary shift wage.

## 4. Stat contribution

Relevant stats can raise salary.

Requirements:
- positive or neutral;
- thematic;
- capped/bounded;
- no universal Lust penalty.

Grooming can matter in service/status careers where appropriate.

Sexuality can matter where professionally relevant.

## 5. Rank contribution

Career progression may improve:
- base pay;
- access to better contracts;
- tip/client tier;
- resource quality.

This is one reason a Year-4 character can meet the ~4 WU economic target without requiring a separate inflation stat.

## 6. Simulation rule

Economy tests should distinguish:

- nominal cash wage;
- item/resource value;
- expected contract/tip value.

For rent solvency use **cash available before Night**.

Do not count unsold loot as rent money.

## 7. Next deliverable

Build per-job candidate wage formulas after:
- final seasonal stat package tuning;
- housing backbone review;
- profession gate review.

The formulas should then be Monte-Carlo / scenario tested across Fresh/Mid/Late profiles.
