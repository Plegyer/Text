# Economy Balance Candidate v1

Дата: 2026-09-25.

Статус: **SUPERSEDED BALANCE CANDIDATE**. It made fresh survival too easy and is replaced by `ECONOMY_BALANCE_CANDIDATE_v2.md`.

## Baseline in Wage Units

- starter wage: 1.0 WU;
- normal room: 1.0 WU/night;
- cheap lodging: 0.4–0.5 WU/night;
- basic School lesson: 1.5 WU;
- starting money: 6 WU;
- street: 0 WU, but next-day and Grooming/Night consequences.

This baseline passed first 160-day deterministic scenario tests without forcing 3-work-action days.

## Candidate visible currency scale

Recommended first UI scale:
- 1 WU = 250 currency;
- starter shift ≈ 250;
- normal room ≈ 250;
- cheap lodging ≈ 100–125;
- basic lesson ≈ 375–400;
- starting money ≈ 1500.

This also makes the existing Secret Debt concept coherent:
- 2000 loan = 8 WU;
- 20000 demand = 80 WU.

Exact visible rounding remains balance work.

## Grooming and housing

Normal housing should not passively add Grooming.

Instead:
- normal room offers reusable Self-care Night option;
- candidate: +2 Grooming;
- consumes voluntary night slot;
- does not reduce next-day Energy.

Cheap lodging:
- either +1 Self-care or reduced availability.

Street:
- candidate -1 Grooming;
- reduced next-day Energy;
- no normal Self-care.

Thus housing changes opportunities rather than becoming an automatic stat generator.

## Red flags still to test

- wage scaling may make late-game rent trivial;
- 80 School lessons still demand >50% Energy at base wage;
- Merchant/tips could distort WU;
- Activity loot value is currently treated as zero in the conservative simulation;
- Secret Debt paid_freedom needs its own post-lock income model.
