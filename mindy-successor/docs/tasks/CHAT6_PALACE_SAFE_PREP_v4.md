# Chat 6 — Palace Safe Content / Local Infra Prep v4

Status: **READY FOR CHAT2 OR LEADER**
Owner: Chat 6 / Palace Producer
Branch: `chat6/palace-safe-prep-v4`
Base: `0f232f40157a56166403e31d259d88776b9b6d90`

Preserved prior heads:
- Palace foundation: `8919a3686c1952d700c4c1377130918e0e181fa3`
- Palace decision packet v3: `b419bdc21f039f9598d802bfd9e8dc19ba8dbfba`

## What this prep contains

### Palace-local pure contract

`src/core/palaceSafePrep.ts` provides:

- D23 gate over:
  - permanent ordinary Hard Work career ledger;
  - current-run active ordinary Hard Work career-package set;
- normalization that accepts only earned ordinary career packages;
- deterministic Day-1 invitation contract:
  - `creationCompleted`;
  - elapsed day 0;
  - blocking;
  - `critical_progression`;
  - `latched`;
  - max one show;
  - no gameplay RNG;
  - no stat/item substitute gate;
- Palace-local invitation/access lifecycle;
- fixed D18 stat threshold `>= 91` over all 12 progression stats;
- D24 cap-only 100 -> 200 semantic contract;
- four generic role-based relationship machine skeletons;
- voluntary non-forced Palace Night contract;
- shipped optional legacy-item capability inventory.

This module does not read/write shared Meta, Save setup, cap or New Start+ state.

### Authored RU/EN prep

`content/palace-safe-prep-v4.fixture.json` contains:

- Day-1 invitation title/body/choice/entry copy;
- invitation/entry text fallbacks;
- D18 `91+` fallback;
- cap-only 200 reward fallback;
- copy skeletons for:
  - professional patron;
  - rival;
  - servant/official contact;
  - optional romance;
- voluntary Palace evening-work copy;
- optional legacy-item branch copy.

The fixture is explicitly `SAFE_PREP_UNBOUND`.

It must not be loaded as a live pack until shared integration exposes the D23 run-local eligibility seam.

## Integration contract required from shared owner

Palace does not need the profession -> stat mapping.

It needs only two normalized inputs at New Start+ run creation:

```text
permanentHardWorkCareers
runActiveHardWorkCareerPackages
```

The shared implementation must snapshot the second input into the run.

Then integration may derive:

```text
palaceRunEligible =
  every ordinary career is permanently earned
  && every ordinary career package is active in this run
```

If true, Palace invitation is latched on the Day-1 `creationCompleted` boundary.

Invitation resolution grants the Palace-local access state.
No second entry gate is allowed.

## Secret Debt boundary

Secret Debt:
- never counts as an ordinary Hard Work package;
- never substitutes for a missing active ordinary package;
- does not grant Palace access;
- may later suppress voluntary Night under its own forced-Night rules.

The Palace voluntary Night contract explicitly does not bypass another forced-Night owner.

## D18 / D24 boundary

True Ending stat readiness is fixed:

```text
all 12 progression stats >= 91
```

Lust is excluded.

This remains true in a later cap-200 life.
Do not reinterpret it as 90% of 200.

The cap reward:
- changes cap 100 -> 200 only;
- does not multiply current values;
- does not multiply starting values;
- does not multiply Hard Work bonuses;
- does not multiply the 10 allocation points;
- does not affect Lust.

Shared cap/save/UI implementation remains outside Chat 6 ownership.

## Deliberately not encoded

Still open and isolated:

1. final Prince confrontation mechanics/state owner;
2. final Palace career progression topology (3-position vs 6-position or another Leader-approved choice).

No Palace career production IDs or Prince mechanics are introduced by v4.

## Focused acceptance coverage

`tests/palace-safe-prep-v4.test.ts` covers:

- D23 9/10, 10/10+0, 10/10+9 and 10/10+10 cases;
- Secret Debt/duplicate non-substitution;
- earned-only package normalization;
- Day-1 deterministic latched invitation contract;
- reload-safe Palace-local access lifecycle;
- D18 90-fail / 91-pass semantics independent of cap 200;
- cap-only D24 semantics;
- relationship machine schema validity;
- optional/non-required romance branch;
- voluntary Night / no forced-Night bypass;
- shipped optional item capability existence;
- item capabilities cannot replace a missing active package;
- RU/EN/fallback presence;
- no Palace Hard Work entry or unresolved Prince/topology invention.

## CI / PR state

No full CI requested.
No early PR opened.

This branch is safe prep for Chat 2/Leader review and later shared-seam integration.
