# Ordinary Poverty Integration Handoff v3

Status: selective-integration handoff for Queue items 87–94.

Prepared from worker branch:
`chat3/lumber-production-proof-next`

Worker head before this handoff:
`5bd6510e19c1de69488a7259c1afaa31722f5488`

Current main observed during handoff:
`22772b1439c247d67fdd20c4e3fd55cc2eba4e20`

Branch divergence observed:
- ahead: 143;
- behind: 75;
- status: diverged.

**Do not merge this long-lived worker branch wholesale.**
Selectively copy the files below onto a fresh Lead branch based on current main.

## Production packs to integrate

Exact files:

1. `mindy-successor/prior-work/astra/prototype-m3.2/content/packs/poverty-street-production.json`
2. `mindy-successor/prior-work/astra/prototype-m3.2/content/packs/poverty-cheap-production.json`

### Street pack scope

Contains three ordinary-poverty event families:
- `poverty-street-production.helpful-summer`;
- `poverty-street-production.neutral-autumn`;
- `poverty-street-production.pressure-winter`.

Properties:
- typed `housingTier=street`;
- NightFlow `after_lodging`;
- existing resource/next-day primitives only;
- no Secret Debt/lender state;
- no canonical named rescuer;
- `stage.outside` shipped fallback;
- safe/free resolution retained for pressure content.

Spring intentionally has no blocking event in this first pack so the existing day-0 zero-money street baseline from PR33 is not intentionally replaced by this slice.

### Cheap-lodging pack scope

Contains:
- `poverty-cheap-production.shared-quiet-autumn`.

Properties:
- typed `housingTier=cheap`;
- NightFlow `after_lodging`;
- contextual/no-effect scene;
- no lodging price change;
- no base penalty change;
- no Secret Debt;
- `stage.room` shipped fallback.

## Exact tests to integrate

1. `mindy-successor/prior-work/astra/prototype-m3.2/tests/poverty-street-production.test.ts`
2. `mindy-successor/prior-work/astra/prototype-m3.2/tests/poverty-street-reload.test.ts`
3. `mindy-successor/prior-work/astra/prototype-m3.2/tests/poverty-street-seasonal.test.ts`
4. `mindy-successor/prior-work/astra/prototype-m3.2/tests/poverty-street-content-anti-softlock.test.ts`
5. `mindy-successor/prior-work/astra/prototype-m3.2/tests/poverty-cheap-production.test.ts`

Coverage authored:
- natural `EndDay -> lodging.street` reachability;
- normal/cheap/street gating separation;
- pending variant reload stability;
- effect exactly-once contract;
- NightFlow resume;
- next-day modifier application;
- one calendar advance;
- history/cooldown persistence;
- seasonal routing;
- zero-money worst-outcome anti-softlock;
- real starter `lumber.shift` remains executable;
- cheap-lodging natural reachability/reload;
- Secret Debt not required.

## Exact presentation draft

Integrate optionally after the production packs:

`mindy-successor/prior-work/astra/prototype-m3.2/content/presentation-drafts/ordinary-poverty-v1.json`

It maps the four new event surfaces to existing shipped static assets only:
- `assets/stage-outside.svg`;
- `assets/stage-room.svg`.

No invented GIF path exists.

The draft is presentation follow-up, not a mechanic dependency.

## Supporting integration docs

Recommended to copy with the package for review traceability:

- `mindy-successor/docs/poverty-prep/ORDINARY_POVERTY_INITIAL_TUNING_LEDGER_v1.md`
- `mindy-successor/docs/poverty-prep/ORDINARY_POVERTY_PRODUCTION_ACCEPTANCE_v1.md`

## Worker commits

Queue item commits:

- item 87 — `20ed2756746790099a21abe8a24ef62c2c10c75e`
- item 88 — `00082717d018a87d0e5dd9989ea7bd2d8f421b1b`
- item 89 — `c1e3499e55ec730ae67025c0aec364766f1f40d8`
- item 90 — `bd4cac7154043b5cc28f81af2e70acf6a9267fff`
- item 91 — `ae8fa3779ef1fc575391169416f6e8d0ceaa204a`
- item 92 — `d994224bff44a7f055f647d58bdedf29cb02b73f`
- item 93 — `10a9a134d1eab01b8a127d7907df35365da725ed`
- item 94 — `5bd6510e19c1de69488a7259c1afaa31722f5488`

Prefer file-level selective copy or equivalent fresh-main commits over cherry-picking the full worker history.

## INITIAL_TUNING — explicitly not Product-locked

Current first-slice values/content placements are implementation tuning only:

### Street helpful event
- money reward: `+10`;
- season: summer;
- cooldown: 2 days;
- maxShows: 40;
- priority: 30 inside `normal_progression`.

### Street neutral event
- no economy/stat effect;
- season: autumn;
- cooldown: 2 days;
- maxShows: 40;
- priority: 30.

### Street pressure event
- additional next-day Energy modifier: `-1` only on the optional `keep-moving` choice;
- free `take-shelter` choice has no extra effect;
- season: winter;
- cooldown: 2 days;
- maxShows: 40;
- priority: 30.

### Cheap-lodging context event
- no economy/stat effect;
- season: autumn;
- cooldown: 3 days;
- maxShows: 30;
- priority: 20.

### Event occurrence
The current events omit a `chance` field and are deterministic when housing/season/cooldown conditions match.

This is also **INITIAL_TUNING**, not a final probability decision.

All safe adjustment guidance is in:
`ORDINARY_POVERTY_INITIAL_TUNING_LEDGER_v1.md`.

## Structural rules preserved

The package does not change:
- existing lodging prices;
- existing base street penalty;
- existing base cheap-lodging behavior;
- NightFlow phases;
- engine/schema;
- shared `definitions.json`;
- starting-job wage;
- School values;
- Activity behavior;
- ending/Meta behavior.

Zero-money recovery remains a required invariant, not tuning.

## Secret Debt explicitly excluded

This integration slice contains no:
- lender event;
- debt principal;
- delayed debt;
- activation interval;
- hidden Slave career;
- bound ordinary-job block;
- Secret Debt forced Night;
- `paid_freedom`;
- `bound_life`;
- `takeover`;
- Secret Debt Meta reward.

No Product decision from the Secret Debt packet is consumed by this slice.

## Known remaining validation gap

Worker-side structural audit:
**PASS**.

Not executed on this worker head:
- `npm run validate`;
- targeted TypeScript tests;
- `npm run check`;
- exact-head GitHub Actions.

Workflow query for item-93 audited head returned no attached workflow runs.

Therefore the package is **not yet CI-green evidence**.

## Required Lead integration validation

After selective copy onto a fresh branch based on current main:

1. run official content validation;
2. run the five targeted tests above;
3. run existing `tests/poverty-production-contract.test.ts` from PR33/main;
4. run full `npm run check`;
5. require exact-head GitHub Actions success for any non-doc integration.

The PR33 baseline is especially important:
- zero money;
- street lodging;
- next day playable;
- starter Lumber shift executable.

The first street pack was deliberately seeded so spring/day 0 has no blocking ordinary street event, reducing unnecessary conflict with that existing baseline, but only exact-head execution can confirm integration behavior.

## Known content gaps

Still intentionally open:
- final event probabilities;
- final reward/penalty values;
- canonical NPC identities;
- polished prose pass;
- additional spring street content;
- broader seasonal diversity;
- relationship-specific recovery hooks;
- item/resource-specific recovery content;
- bespoke GIF/media.

These are not blockers for validating the bounded first production slice.

## Lumber firewalls

Selective integration must preserve:
- Lumber Hard Work eligibility ONLY `completed_shifts >= 50`;
- exact reward `hardWork:lumber`;
- exact Forest continuation through `activityResult`.

## Minimal Lead action

Copy the two packs + five tests first.

Optionally copy:
- presentation draft;
- tuning ledger;
- acceptance evidence.

Then validate on fresh current-main head with exact-head CI.

Do not merge the worker branch wholesale.
