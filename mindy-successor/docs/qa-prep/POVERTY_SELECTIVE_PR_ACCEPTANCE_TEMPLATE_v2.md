# Poverty selective PR acceptance template v2

Status: READY FOR LEAD USE

Purpose: exact QA gate for a future selective ordinary-poverty RU+EN integration PR.

This template assumes a fresh Lead branch from then-current `main`. It must not be applied by merging the long-lived Chat 3 branch wholesale.

## 1. Source and scope

Expected selectively reviewed source material:
- `content/poverty-localization-main-delta-v1.fixture.json` — 84 localization strings;
- `tests/poverty-localization-main-delta-v1.test.ts`;
- `tests/poverty-localization-natural-path-v2.test.ts`;
- `tests/poverty-localization-merge-collision-v1.test.ts`;
- optional current-main-compatible renderer/UI smoke derived from the worker fixtures.

Allowed production change:
- additive RU+EN localization for already shipped ordinary-poverty event/media identities;
- bounded resolver/UI test coverage needed to prove the authoritative localization bundle consumes those keys.

Not allowed:
- new poverty gameplay events merely to carry translations;
- locale-specific gameplay IDs;
- changes to poverty conditions/effects/chance/cooldowns/rewards;
- Secret Debt/Slave mechanics, rewards, events, forced-Night behavior or IDs;
- Save schema changes;
- gameplay RNG changes;
- lodging/Night balance changes;
- placeholder or proposed multi-GIF activation.

## 2. Fresh-main identity gate

Before copying any key, recompute identities from the PR base.

The expected reviewed production set is the six root ordinary-poverty packs:
- `poverty-street-production.json`;
- `poverty-street-production-v2.json`;
- `poverty-cheap-production.json`;
- `poverty-cheap-production-v2.json`;
- `poverty-recovery-production.json`;
- `poverty-pressure-production.json`.

Every `event.<id>...` localization key must resolve to an event that exists on the PR base.
Every `media.<id>.alt` key must resolve to an existing production media identity.

Do not carry a worker identity forward solely because an old fixture names it.

## 3. 84-key merge gate

The reviewed Chat 3 delta contains 84 strings.

On the integration branch:
- count the copied ordinary-poverty keys;
- require exactly the intended 84 unless current main already contains an exact-identical subset;
- for a pre-existing key, allow only an exact-identical RU+EN value unless the PR explicitly reviews the text replacement;
- reject any accidental overwrite caused by object/key collision;
- reject `.ru`/`.en` suffixes embedded in gameplay identity;
- require non-empty `ru` and `en` for every integrated player-facing key.

If current main changes before integration, recompute the expected additive count and document the delta rather than forcing the historical number.

## 4. Gameplay-neutrality gate

Compare the six production packs on base and PR head.

There must be no unreviewed change to:
- event IDs;
- variant IDs;
- choice IDs;
- media IDs;
- reaction triggers;
- conditions;
- effects;
- chance/priority/cooldown/maxShows;
- Night interception policy;
- lodging cost;
- next-day modifier behavior;
- resource/stat deltas.

Locale must remain presentation state outside the life Save.

A language switch must not change:
- pending event/variant/presentation identity;
- Resolver epoch;
- RNG;
- NightFlow;
- resources;
- metrics;
- housing;
- counters/facts;
- history;
- choice eligibility.

## 5. Executable natural-path gate

Integrate or reproduce the item-149 executable coverage on the fresh PR head.

Minimum required paths:
- one natural street event reached through `endDay -> chooseLodging(street)`;
- one natural cheap-lodging event reached through `endDay -> chooseLodging(cheap)`;
- one effectful choice;
- one effect-free choice.

The test must prove:
- actual Resolver selection, not direct pending-state injection;
- RU and EN resolve for the selected current IDs;
- locale lookup does not mutate Save/RNG/Night;
- choice effects commit once;
- pending clears;
- reload does not replay effects;
- Night resumes correctly.

A renderer/UI smoke should also toggle RU -> EN -> RU while a poverty scene is pending and assert the same pending gameplay identity.

## 6. Secret Debt exclusion

Search every copied localization/test/fixture file and the production diff.

Reject the PR if ordinary-poverty integration introduces or activates:
- Secret Debt/Slave event IDs;
- lender mechanics;
- forced debt nights;
- debt career stage/reward;
- paid-freedom/bound-life/takeover semantics;
- Secret Debt presentation routes presented as ordinary poverty.

Authoring prose from another branch is not production authority.

## 7. Presentation/multi-GIF boundary

Ordinary-poverty localization can ship independently of real GIF pools.

If media-pool staging is present:
- keep it out of production activation unless every pool has 3–5 real repository GIFs;
- require stable unique candidate keys;
- current semantic presentationId;
- static fallback;
- RU+EN alt coverage;
- deterministic locale-neutral selection;
- no gameplay-owned field.

Placeholder/staging paths must remain staging-only.

## 8. Exact-head CI gate

Before approval, bind evidence to the exact PR head SHA.

Required workflow:
- install dependencies;
- typecheck;
- validate;
- build;
- full tests.

Record:
- exact PR head SHA;
- workflow run number/id;
- conclusion;
- total/pass/fail test count;
- validator pack/event/action/ending counts;
- poverty-specific test names/results.

Do not infer green from a prior head.

Any failed exact-head run is blocking until a later exact head passes.

## 9. Post-merge gate

After merge:
- record merge SHA;
- record new main SHA;
- require successful main push workflow on that SHA;
- rerun/reconfirm poverty natural-path coverage;
- confirm no localization-key collision appeared during merge;
- confirm ordinary-poverty RU+EN renders from the authoritative production localization bundle;
- confirm Secret Debt remains unpromoted.

## Acceptance classification

Use exactly one final classification:
- `GREEN_FOR_SELECTIVE_MERGE`
- `BLOCKED_BY_IDENTITY_DRIFT`
- `BLOCKED_BY_LOCALIZATION_COLLISION`
- `BLOCKED_BY_GAMEPLAY_DRIFT`
- `BLOCKED_BY_SECRET_DEBT_BLEED`
- `BLOCKED_BY_RENDERER_SMOKE`
- `BLOCKED_BY_EXACT_HEAD_CI`

A green result applies only to the selectively reviewed fresh-main PR, never to the whole Chat 3 worker branch.
