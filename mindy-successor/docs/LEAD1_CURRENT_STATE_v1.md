# Leader 1 Current State v1

## Corrected QA truth — 2026-10-01

Current main `fda3dcb66d6fdb40230712e65f4cc4605d9b1124` still has the confirmed Satyr Maid / Undead Farm post-first-shift repeatability defect: first real shift works, second shift replays a one-time career transition and fails. Do not call those loops repeatable on shipped main until repaired PR #147 is QA-accepted and merged.

Repaired frozen PR #147 head `e9e1c4d5cdafcdf5e8571170cd9b699426536746` has exact-head CI #483 SUCCESS and is queued for fresh Chat 4 QA.


## Leader recovery entrypoint

Before using this state snapshot, read:
- `LEADER1_START_HERE.md` for the durable operating model;
- `LEADER1_LIVE_DASHBOARD.md` for the latest compact project/worker snapshot.

This file remains the audited product-state baseline, not the sole live coordination surface.


Date: 2026-10-01
Status: **CURRENT LIVE PROJECT STATE — supersedes older status prose where Git/current CI disagrees**

## Verified baseline

Audit baseline before this coordination update:
- main: `6afc01061646bc52cec824863bf89e8ad8c309d0`;
- workflow `mindy-successor check`, main run #417 / id `36809189373`: **SUCCESS**;
- full `npm run check`: typecheck PASS, validation PASS, build PASS, **556/556 tests PASS**;
- production validator: **17 packs, 46 events, 35 actions, 9 endings**.

The project is a runnable TypeScript/HTML/CSS/Electron game runtime, not a document-only prototype.

## What is actually shipped

- 12 progression stats + separate Lust; 10 creation points.
- 160-day / 4-year calendar and 3 daily Energy baseline.
- Exactly three Day-1 careers: Lumber, Satyr Maid, Undead Farm.
- All ten ordinary career base shift definitions exist.
- Lumber has the exercised cross-system reference path: career progression, Foreman relationship, School, Night/lodging, Forest Activity, multiple eligible endings, explicit ending commitment/completion and New Run Meta reward.
- Satyr Maid and Undead Farm have target repeatable shifts, seasonal presentation surfaces and first typed career transition.
- Eight paid School courses are executable; typed School track progress and Night study exist.
- Ordinary poverty / normal-cheap-street housing content is executable and anti-softlock coverage is green.
- Forest Activity is executable with save/resume, Logging Road and capability-gated Old Boundary routing.
- RU/EN runtime and deterministic 3–5 media candidate presentation pools are implemented.

## Main product gaps

1. Seven late-career stat/year unlock conditions are not yet implemented in production.
2. Nine ordinary careers do not yet have complete Hard Work ending coverage; Lumber is the complete reference.
3. Satyr Maid / Undead Farm are starter production layers, not full career lives.
4. The remaining seven ordinary careers are base layers, not complete career state machines with complex outcomes.
5. Palace is specified but not a playable production career.
6. Secret Debt is specified but is not yet a production hidden career/state machine.
7. School has working courses but incomplete independent milestone/project/certificate/ending depth.
8. Production relationship coverage is still concentrated in Lumber/Foreman.
9. Forest does not yet satisfy complete 3-route / 3-challenge / seasonal product depth.
10. Target capability items largely lack natural production acquisition paths.
11. Much prepared Forest/poverty/School material remains fixture/preparation-only.

## Development target

**All mechanics, text, routes, careers, endings, Meta, save/load, localization and Windows delivery are playable with static/text fallback; only replacement/expansion of GIF animation assets remains.**

Do not call the game complete while a required career, hidden route, School path, Activity path or ending exists only as a design document/fixture.

## Immediate production order

1. Implement locked late-career availability and ordinary Hard Work/Meta coverage.
2. Convert already-safe prepared content into reachable production content instead of producing more audit-only material.
3. Complete starter-career lives, beginning with Satyr Maid, then Undead Farm.
4. Complete the remaining seven ordinary careers.
5. Close School depth, Forest depth and natural item acquisition.
6. Implement Secret Debt.
7. Implement Palace after 10/10 Hard Work is naturally achievable.
8. Run natural 160-day / poverty-heavy / School-heavy / NG+ acceptance and clean Windows delivery.
9. Only then treat missing GIF pools as the remaining backlog.

## Coordination reset

Product reports all worker chats idle.

- Chat 1: context exhausted; restart from Git, queue C1D-85..96.
- Chat 2: context exhausted; restart from Git, queue C2-109..120.
- Chat 3: resume from Git, queue C3-109..120.
- Chat 4: context exhausted; restart from Git, queue C4-114..125.
- Chat 5: resume from Git, queue C5-109..120.

Old queue/pointer prose is historical when it conflicts with these assignments.
