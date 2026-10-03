# Chat 3 — Reusable Progression Balance Harness v3

Status: **RESEARCH TOOL / NO PRODUCTION RULE CHANGES**  
Owner: Chat 3  
Authority base: `75adf92042961be4e4eda51622123214e1c97dce`

## What the harness is

`scripts/progression-balance-harness.ts` turns the prior one-off progression audit into a reusable successor-first simulator.

It reads the same live inputs used by the production build:
- `content/definitions.json`;
- top-level `content/packs/*.json` only, matching `scripts/build.mjs` and `scripts/validate.ts`;
- the live exported `SCHOOL_COURSES` catalog;
- the current baseline daily Energy from `freshSave()`.

It does **not** change runtime state, content definitions, School data, caps, work repetition, or seasonal mappings.

All alternate policies/maps are labeled:

`RESEARCH ONLY: alternative policies and maps are analysis inputs, not production authority.`

## Supported inputs

- same-career shift policy:
  - `--policy=current` = current Energy-only repetition;
  - `--policy=2` = research max 2/day;
  - `--policy=1` = research max 1/day;
- starting allocations:
  - CLI `base`;
  - CLI `focus` = all 10 creation points into the strongest live work-grown stat;
  - explicit stat maps through the exported TypeScript API;
- live current seasonal negatives by default;
- alternate negative targets from a JSON file, applied in-memory only;
- School cadence and either the best live overlap course or an explicit live course ID;
- cap 100 or cap 200 for analysis only.

The included alternate map
`scripts/research-data/progression-negative-targets-v2.json`
is the v2 Product-packet candidate and is explicitly research data, not authority.

## Outputs

For each of the ten ordinary careers and each starting-allocation variant:
- calendar day to shift 50;
- strongest live work stat;
- day that strongest stat first reaches 100;
- day it reaches the selected analysis cap;
- realized positive and negative work movement;
- positive movement blocked by cap;
- negative movement blocked by floor 0;
- gross work money by shift 50 and over the full analysis window;
- School lessons/tuition and gross work income minus School tuition;
- live milestone density in bands 1–10 / 11–30 / 31–49;
- total shift-reactive live events;
- final 160-day stat state.

The model deliberately reports gross work income and School tuition only. It does not pretend to model lodging or every route-specific economic sink.

For cross-career comparison, the target career is assumed available from Day 1. That isolates progression policy and also covers later-life early-access cases; it is not a claim that every career is naturally unlocked on Day 1 of a fresh first life.

## Commands

Human summary with current behavior:

```bash
node --experimental-strip-types scripts/progression-balance-harness.ts \
  --policy=current \
  --cap=100 \
  --school-every=10 \
  --course=best \
  --format=summary
```

Machine-readable JSON for max 1/day plus the research negative map:

```bash
node --experimental-strip-types scripts/progression-balance-harness.ts \
  --policy=1 \
  --cap=100 \
  --school-every=10 \
  --alternate-negatives=scripts/research-data/progression-negative-targets-v2.json \
  --format=json
```

Cap-200 analysis:

```bash
node --experimental-strip-types scripts/progression-balance-harness.ts \
  --policy=1 \
  --cap=200 \
  --format=both
```

Focused test:

```bash
node --experimental-strip-types --test tests/progression-balance-harness.test.ts
```

## Live-match focused tests

`tests/progression-balance-harness.test.ts` verifies:
- the exact ten ordinary-career roster from the live schema;
- every ordinary `<career>.shift` has live seasonal definitions and a wage;
- current live mapping has 20 `-1` effects / two negative seasons per ordinary career;
- live baseline Energy is 3;
- current / research max-2 / research max-1 produce 17 / 25 / 50 calendar days to 50 shifts without School;
- movement accounting measures actual floor clipping;
- alternate negative maps do not mutate loaded live definitions;
- School overlap is selected from the live School catalog;
- cap 200 changes the ceiling while day-to-100 remains observable;
- milestone density is read from live production-loaded packs;
- result JSON is serializable and the human summary is renderable.

## Intended next use

After this SHA is frozen, Chat 3 can run a compact comparison for the v2 Product choices using the same harness instead of repeating hand calculations.

Disposition target: **READY_FOR_LEADER_BALANCE_TOOL**.
