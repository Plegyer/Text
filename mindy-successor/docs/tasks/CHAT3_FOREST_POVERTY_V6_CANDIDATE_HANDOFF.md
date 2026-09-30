# Chat 3 Forest + Poverty v6 Candidate Handoff

Status: C3-60 candidate handoff.
Owner: Chat 3 / Forest + Poverty Content Bundles Worker.
Candidate base: `main@f3a684448b0681c355452b7d24d836e3926cb594`.

## Scope

This candidate contains C3-49 through C3-59 only.

Delivered:
- Forest production-consumption gap audit;
- Logging Road depth v2;
- Old Boundary depth v2;
- Forest success aftermath v2;
- Forest escape/failure aftermath v2;
- ordinary-poverty housing depth v2;
- ordinary-poverty small-job depth v2;
- ordinary-poverty contact/recovery depth v2;
- Secret Debt separation audit v2;
- Forest/poverty RU/EN parity regression;
- ownership/collision regression v2.

## Current-main refresh

The candidate was rebuilt from the then-current main after merged PR #108.

It does not duplicate the merged C3-38..47 payload. Queue-v6 keys are distinct from merged v5 fixture-local keys.

## Forest production-consumption status

Player-facing now:
- Forest entry body via the current Activity UI consumer;
- Logging Road / Old Boundary labels, help and presentation media;
- terminal success / escape / failure event copy;
- success-only Lumber continuation `lumber-cross.activity-forest-return`.

Preparation-only:
- queue-v6 Logging Road and Old Boundary depth strings;
- queue-v6 success aftermath variants;
- queue-v6 escape/failure aftermath variants.

Those fixture strings do not become player-facing merely by merging this candidate. No queue-v6 selector is implemented here.

Blocked by missing gameplay identity:
- non-terminal Forest encounter/challenge content;
- escape Lumber progression;
- failure Lumber progression.

## Exact Forest identities consumed

- Activity: `lumber.forest`.
- Route option: `forest.route.logging-road` -> `logging-road`.
- Route option: `forest.route.old-boundary` -> `old-boundary`.
- Old Boundary capability: `enter_old_boundary`.
- Results: `lumber.forest.success`, `lumber.forest.escape`, `lumber.forest.failure`.
- Terminal events: `forest-result-content-v1.success|escape|failure`.
- Success continuation: `lumber-cross.activity-forest-return`.

No new route, encounter, challenge, result, capability, world fact, career fact or ending identity is introduced.

## Ordinary poverty boundary

All queue-v6 poverty prose maps only to existing production event/variant identities.

Small-job fixtures record existing positive-choice effects as compatibility snapshots only.

No new:
- job/progression system;
- housing tier;
- NightFlow/economy rule;
- persistent contact/relationship state;
- recovery milestone/counter.

## Secret Debt boundary

Current ordinary-poverty production remains usable without Secret Debt.

The audit confirms no ordinary-poverty debt-metric writes/conditions and no Secret Debt/lender/hidden-career production identity.

The existing generic `debt` / `repay` / `rent-room` surface remains separate from the planned hidden Secret Debt route.

OPEN and unselected:
- trigger chance;
- offer amount;
- activation delay;
- future debt amount;
- penalties;
- forced Night penalty;
- hidden-career gains/thresholds;
- outcome thresholds;
- rewards;
- School/Activity availability while bound.

## Content volume and collisions

Queue-v6 authored player-facing handoff strings: 46 RU/EN pairs.

Regression evidence requires:
- every pair has RU and EN;
- all queue-v6 keys are unique;
- zero collisions with root production localization;
- zero collisions with merged v5 fixture-local keys;
- only existing Forest presentation IDs are referenced.

## Ownership

This candidate adds docs, content-side fixtures and focused tests only.

It does not modify:
- shared `src/` runtime/UI;
- `content/definitions.json`;
- `content/localization.json`;
- `content/presentation.json`;
- production packs;
- Save schema/identity;
- gameplay RNG;
- career/relationship state machines;
- NightFlow/economy;
- School;
- media assets/source ownership;
- ending framework.

## Regression sources

- `tests/chat3-forest-poverty-parity-v6.test.ts`;
- `tests/chat3-ownership-collision-v2.test.ts`.

Exact frozen head and exact-head repository CI are recorded in the PR after CI completes.

Any head movement after freeze invalidates previous exact-head CI/QA evidence.
