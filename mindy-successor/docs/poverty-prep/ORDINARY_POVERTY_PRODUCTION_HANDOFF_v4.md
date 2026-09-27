# Ordinary Poverty Production Handoff v4

Status: selective-integration handoff for the ordinary-poverty production wave through Queue item 103.

Worker branch:
`chat3/lumber-production-proof-next`

Worker head before this handoff:
`2f5e308dab2dbde389214e5b4f981f62be399562`

Current main observed during preparation:
`a6ccc159854106dd38e80329072e7610e25d530c`

At that main head, none of the files listed below from items 87–103 are present.

**Do not merge the long-lived worker branch wholesale.**
Create a fresh Lead branch from current main and selectively copy the reviewed bundle.

## Required production packs

Copy these six production packs:

1. `mindy-successor/prior-work/astra/prototype-m3.2/content/packs/poverty-street-production.json`
2. `mindy-successor/prior-work/astra/prototype-m3.2/content/packs/poverty-street-production-v2.json`
3. `mindy-successor/prior-work/astra/prototype-m3.2/content/packs/poverty-cheap-production.json`
4. `mindy-successor/prior-work/astra/prototype-m3.2/content/packs/poverty-cheap-production-v2.json`
5. `mindy-successor/prior-work/astra/prototype-m3.2/content/packs/poverty-recovery-production.json`
6. `mindy-successor/prior-work/astra/prototype-m3.2/content/packs/poverty-pressure-production.json`

All use existing NightFlow/event/resource/item/next-day primitives only.

No shared engine/schema change is part of this bundle.

## Required tests

Copy these eleven tests:

1. `mindy-successor/prior-work/astra/prototype-m3.2/tests/poverty-street-production.test.ts`
2. `mindy-successor/prior-work/astra/prototype-m3.2/tests/poverty-street-reload.test.ts`
3. `mindy-successor/prior-work/astra/prototype-m3.2/tests/poverty-street-seasonal.test.ts`
4. `mindy-successor/prior-work/astra/prototype-m3.2/tests/poverty-street-content-anti-softlock.test.ts`
5. `mindy-successor/prior-work/astra/prototype-m3.2/tests/poverty-cheap-production.test.ts`
6. `mindy-successor/prior-work/astra/prototype-m3.2/tests/poverty-street-production-v2.test.ts`
7. `mindy-successor/prior-work/astra/prototype-m3.2/tests/poverty-cheap-production-v2.test.ts`
8. `mindy-successor/prior-work/astra/prototype-m3.2/tests/poverty-recovery-production.test.ts`
9. `mindy-successor/prior-work/astra/prototype-m3.2/tests/poverty-pressure-production.test.ts`
10. `mindy-successor/prior-work/astra/prototype-m3.2/tests/poverty-long-run-distribution.test.ts`
11. `mindy-successor/prior-work/astra/prototype-m3.2/tests/poverty-production-integration-bundle.test.ts`

Coverage includes:
- natural `EndDay -> street/cheap lodging`;
- helpful / neutral / bad-pressure families;
- event text variants;
- seasonal/context selection;
- reload without pending-event reroll;
- exactly-once effects and calendar advance;
- event history/cooldown;
- zero-money worst-outcome recovery;
- existing `herb` assistance;
- multi-day street/cheap coexistence;
- full ordinary-poverty pack namespace/capability integration;
- no Secret Debt namespace/content.

## Inclusion manifest

Copy:

`mindy-successor/prior-work/astra/prototype-m3.2/content/poverty-production-inclusion-v1.fixture.json`

Proposed explicit order:

1. `poverty-street-production`
2. `poverty-street-production-v2`
3. `poverty-cheap-production`
4. `poverty-cheap-production-v2`
5. `poverty-recovery-production`
6. `poverty-pressure-production`

Existing shared dependency:
- `stage.json` for `stage.outside` / `stage.room`.

The manifest is declarative only. It does not change current catalog loading.

## Presentation support

Optional presentation draft:

`mindy-successor/prior-work/astra/prototype-m3.2/content/presentation-drafts/ordinary-poverty-v1.json`

Presentation identity inventory:

`mindy-successor/docs/poverty-prep/POVERTY_PRESENTATION_IDENTITY_INVENTORY_v1.md`

Actual authored identity scope through item 99:
- 6 production packs;
- 14 event identities;
- 20 event variants.

Current fallback pools:
- street -> `stage.outside`;
- cheap lodging -> `stage.room`.

No bespoke GIF is required for mechanics.

## Review/support documents

Copy as review evidence if useful:

- `mindy-successor/docs/poverty-prep/ORDINARY_POVERTY_INITIAL_TUNING_LEDGER_v1.md`
- `mindy-successor/docs/poverty-prep/ORDINARY_POVERTY_PRODUCTION_ACCEPTANCE_v1.md`
- `mindy-successor/docs/poverty-prep/ORDINARY_POVERTY_INTEGRATION_HANDOFF_v3.md`
- `mindy-successor/docs/poverty-prep/POVERTY_PRESENTATION_IDENTITY_INVENTORY_v1.md`

## Non-locked tuning

All values below are **INITIAL_TUNING**, not Product locks.

### Street v1
- helpful reward: +10 money;
- winter optional extra Energy pressure: -1;
- cooldown: 2;
- maxShows: 40;
- priority: 30;
- broad summer/autumn/winter family assignment.

### Street v2
- helpful reward: +6 money;
- winter optional extra Energy pressure: -1;
- cooldown: 3;
- maxShows: 30;
- priority: 35;
- narrow authored windows:
  - summer day-in-year 13–14;
  - autumn 23–24;
  - winter 33–34.

### Cheap lodging v1
- no extra mechanical effect;
- autumn context;
- cooldown: 3;
- maxShows: 30;
- priority: 20.

### Cheap lodging v2
- no extra mechanical effect;
- spring/summer/winter variants;
- cooldown: 2;
- maxShows: 40;
- priority: 25.

### Recovery pack
- coin help: +4 money;
- short cleanup: +5 money;
- herb assistance: +1 existing `herb`;
- spring day-in-year contexts: 2 / 4 / 6;
- cooldown: 4;
- maxShows: 20;
- priority: 34.

### Pressure pack
- cold rain optional pressure: Energy -1 + Grooming -1 next day;
- noisy loading optional pressure: Energy -1;
- muddy splash optional pressure: Grooming -1;
- spring day-in-year contexts: 7 / 8 / 9;
- cooldown: 4;
- maxShows: 20;
- priority: 33.

All pressure families retain a free/no-extra-penalty choice.

Safe adjustment directions remain governed by:
`ORDINARY_POVERTY_INITIAL_TUNING_LEDGER_v1.md`

New v2/recovery/pressure values must likewise be treated as tunable until Product explicitly promotes them.

## Structural invariants

The bundle must preserve:
- street lodging remains zero-cost baseline fallback;
- ordinary poverty never requires Secret Debt;
- worst ordinary pressure still leaves a playable next day;
- at least one starter job remains executable after the zero-money worst-outcome path;
- no ordinary event is terminal;
- event effects/history are reload-safe;
- existing lodging prices/base penalties are unchanged;
- current production NightFlow remains authoritative.

## Secret Debt exclusion

This bundle contains no:
- lender;
- Secret Debt state;
- debt principal/activation;
- hidden Slave career;
- bound-career lock;
- forced Secret Debt Night;
- Secret Debt outcomes;
- Secret Debt Meta rewards.

No Secret Debt Product decision is consumed.

## Current-main compatibility target

Selective integration must target the current production baseline, not the worker branch's old base.

The integration regression intentionally expects the current root production catalog, including current-main Lumber/School/media dependencies, then verifies all six proposed poverty packs coexist inside that catalog.

This is why the worker branch must not be merged wholesale.

## Validation status

Worker-side source/structural evidence exists.

For items 96–103:
- scope compare from queue-top-up baseline contains only the 12 expected new files;
- no engine/schema/definitions file was changed.

Runtime status:
- the worker branch is long-lived and behind current main;
- targeted tests were authored;
- no exact-head `npm run check` result is claimed here;
- no worker-branch CI success is claimed here.

## Required exact-head CI after selective integration

On a fresh branch based on current main:

1. copy the six packs;
2. copy the eleven tests;
3. copy the inclusion manifest;
4. optionally copy presentation/support docs;
5. run `npm run validate`;
6. run targeted poverty tests;
7. run existing main `poverty-production-contract.test.ts`;
8. run full `npm run check`;
9. require exact-head GitHub Actions success before merge.

No non-doc production integration should be called green before exact-head CI.

## Remaining content gaps

Still open after this bundle:
- final probabilities/frequencies;
- final tuning values;
- broader ordinary-poverty event breadth;
- canonical relationship-specific helpers;
- additional existing-item opportunities;
- final prose/localization pass;
- dedicated static/GIF art beyond shared fallbacks;
- Product decisions for Secret Debt.

These do not justify a runtime rewrite.

## Lumber firewalls

Selective integration must preserve:
- Hard Work eligibility ONLY `completed_shifts >= 50`;
- exact reward `hardWork:lumber`;
- exact Forest continuation through `activityResult`.

## Minimal Lead integration bundle

Mechanics/QA minimum:
- 6 production packs;
- 11 tests;
- 1 inclusion manifest.

Presentation/review support:
- ordinary poverty presentation draft;
- presentation identity inventory;
- tuning ledger;
- prior acceptance/handoff evidence.

Integrate these files selectively onto fresh current main, then require exact-head CI.
