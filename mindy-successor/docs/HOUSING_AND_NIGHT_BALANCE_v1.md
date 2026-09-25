# Housing and Night Balance v1

Дата: 2026-09-25.

Статус: **SIMULATION-SUPPORTED PRODUCT/BALANCE CANDIDATE**.

Основание:
- `ACTION_TIME_COST_MODEL_v1.md`;
- `ECONOMY_BALANCE_CANDIDATE_v2.md`;
- SWF-confirmed no-rent sleep: next day Stamina = 2, Cleanliness/Charisma/Class penalties;
- successor Grooming replaces the useful progression role of original Cleanliness.

## 1. Three ordinary housing tiers

### Normal room

Candidate:
- cost: 2 WU/night;
- next-day Energy: normal base;
- no automatic Grooming gain/loss;
- full voluntary Night menu;
- privacy/storage compatible.

This is the reference baseline.

### Cheap lodging

Candidate:
- cost: 1 WU/night;
- next-day Energy: normal base;
- no universal Energy penalty;
- weaker Night/privacy conditions;
- selected relationship/private events unavailable;
- optional small Grooming pressure only where fiction supports it.

Cheap lodging is a strategic economy choice, not merely "normal room but better".

### Street / no lodging

Candidate:
- cost: 0;
- next-day Energy: base -1;
- Grooming -1 per street night;
- restricted voluntary Night menu;
- street/poverty event pool;
- Secret Debt lender chance where eligible.

This directly preserves the useful reference relationship:
free sleep -> worse next day + social/presentation stat loss.

## 2. Why normal lodging does not restore Grooming automatically

Automatic +Grooming every paid night would dwarf work/School effects across 160 days.

Instead:
- normal room simply avoids street penalties;
- Grooming is restored through suitable work, School, items/events or specific content.

This keeps the stat inside the same progression economy as the other stats.

## 3. Night relationships

Housing affects **availability**, not daytime Energy.

Examples:
- normal room: full private relationship options;
- cheap lodging: some private meetings unavailable or replaced by public variants;
- street: mostly no normal private partner menu, but unique street contacts/events may exist.

Relationship scene itself remains 0 daytime Energy.

## 4. Night study

Night study:
- can be used from housing contexts that permit it;
- costs no current-day Energy;
- next day Energy -1;
- gives School/stat progress.

Candidate access:
- normal room: yes;
- cheap lodging: yes, possibly fewer study variants;
- street: no normal study by default.

This gives paid housing an additional non-numeric value.

## 5. Storage/privacy

Normal room can support:
- item storage;
- private quest scenes;
- certain relationship continuations;
- preparation actions.

Cheap lodging:
- reduced/limited storage;
- some content blocked or altered.

Street:
- no normal storage/privacy.

Do not make inventory disappear merely because player sleeps outside; only context-sensitive stored/prepared items need housing rules.

## 6. Poverty is not failure

A player can deliberately use:
- cheap lodging to redirect money into School;
- street to survive at zero money.

Both are viable but change the shape of life.

This satisfies LIFE-05 better than a simple "pay rent or receive generic debuff".

## 7. Exact candidate numbers

Using fresh economy:
- starter wage = 1 WU;
- normal room = 2 WU;
- cheap = 1 WU;
- street = 0;
- School basic = 6 WU;
- starting money = 12 WU.

These are still balance candidates, not locked currency numbers.

## 8. Acceptance

Housing is working if:
1. normal room is desirable without giving passive stat inflation;
2. cheap lodging materially frees School money;
3. street never softlocks the player;
4. street is not strictly economically superior because next-day Energy falls;
5. housing changes Night/relationship possibilities;
6. save/load cannot duplicate rent or street penalties.
