# Forest Authored Content Integration Handoff v3

Status: selective handoff for Forest authored-content items 114–118, with the completed Secret Debt authored-content boundary from items 111–113 included for coordination.

No shared runtime/schema/build/UI change is part of this handoff.

## Forest content now authored

### Route scene bank

File:
`docs/lumber-prep/FOREST_ROUTE_AUTHORED_SCENE_BANK_v1.md`

Ready:
- logging road: 4 authored scene variants;
- Hunter trail concept: 4 authored scene variants;
- old boundary: 4 authored scene variants;
- generic deep-forest navigation: 4 authored scene variants;
- presentation hooks and multi-media pool opportunities.

Authoritative identities preserved:
- logging road production option `forest.route.logging-road`;
- logging route state `logging-road`;
- old-boundary production option `forest.route.old-boundary`;
- old-boundary route state `old-boundary`;
- Hunter trail remains an authoritative route concept / authoring key `hunter-trail`, with production option ID still OPEN.

### Challenge family content

File:
`docs/lumber-prep/FOREST_CHALLENGE_FAMILY_CONTENT_BANK_v1.md`

Ready:
- navigation: 5 reusable text variants;
- physical obstacle: 5 reusable text variants;
- interpretation / ritual anomaly: 5 reusable text variants;
- player-facing approach-language banks;
- route-binding guidance;
- presentation hooks;
- multi-GIF pool suggestions.

No formula, threshold, reward, loot or new terminal result is authored.

### Seasonal context

File:
`docs/lumber-prep/FOREST_SEASONAL_CONTEXT_BANK_v1.md`

Ready:
- spring context for routes and all three challenge families;
- summer context;
- autumn migration/industrial context;
- winter ice/snow/frozen-passage context;
- seasonal presentation hooks;
- explicit distinction between prose variation and topology mechanics.

Stable route identities are not renamed by season.

### Result reaction production pack

File:
`prior-work/astra/prototype-m3.2/content/packs/forest-result-content-v1.json`

Contains three exact reaction identities:
- `forest-result-content-v1.success`;
- `forest-result-content-v1.escape`;
- `forest-result-content-v1.failure`.

Exact triggers:
- `activityResult(lumber.forest, success, lumber.forest.success)`;
- `activityResult(lumber.forest, escape, lumber.forest.escape)`;
- `activityResult(lumber.forest, failure, lumber.forest.failure)`.

Effects:
- presentation/content only;
- every reaction choice has no mechanical effects.

Fallback:
- existing shipped `assets/stage-forest.svg` under pack-local media IDs.

### Result reaction regression

File:
`prior-work/astra/prototype-m3.2/tests/forest-result-content-v1.test.ts`

Authored coverage:
- exact three activityResult boundaries;
- distinct success/escape/failure identities;
- natural success/escape execution on Lumber Forest fixture;
- failure execution using a test-only adapter tuning while preserving exact Activity/result IDs;
- pending reaction save/reload;
- no duplicate reaction effects;
- Hard Work contract remains exact;
- fallback media path/IDs resolve.

The test is authored; this handoff does not claim worker-side runtime execution unless separately reported.

## Forest production readiness

### Safe selective integration now

The result reaction pack and its targeted test are bounded and do not depend on unresolved route/token choices:

1. `content/packs/forest-result-content-v1.json`
2. `tests/forest-result-content-v1.test.ts`

These should be selectively copied onto a fresh Lead branch based on current main, then run through exact-head validation/CI.

### Content ready but not yet mechanical production authoring

The route/challenge/season banks can be integrated as docs/content authority now.

Converting them into Activity options/challenges requires accepted production identities/conditions for the affected mechanic.

## Unresolved Old Boundary Token choices

Locked:
- item `old_boundary_token`;
- capability `enter_old_boundary`;
- current old-boundary route gate is authoritative.

Still Product/content OPEN:
- natural acquisition source;
- provider/event/vendor/relationship source;
- price, if any;
- retained vs consumed vs turned-in use semantics;
- exact deeper use behavior.

Do not invent these to ship route prose.

## Unresolved Hunter trail choices

Authoritative:
- Hunter trail route concept;
- distinct from logging road and old boundary;
- route state/content key concept `hunter-trail`;
- must integrate navigation-family content;
- autumn migration makes the route richer.

Still OPEN:
- production option ID;
- Hunter public clue fact ID;
- navigation capability ID if a new one is chosen;
- clue/provider source;
- threshold;
- loot/lore/reward.

Accepted final gate shape remains:
`any(Hunter public clue fact, navigation capability)`

No worker artifact invents either ID.

## Challenge-family remaining mechanics

Navigation still needs:
- final challenge identity;
- route binding;
- accepted approach conditions;
- any threshold/formula;
- explicit Activity-state effect.

Physical obstacle still needs:
- final challenge identity;
- route binding;
- accepted stat/capability conditions;
- any resource/endurance effect;
- item retain/consume behavior where used.

Interpretation/anomaly still needs:
- final challenge identity;
- route binding;
- accepted Reason/Magic/School/capability conditions;
- exact Arcana public fact if used;
- any sample/public-result identity.

No new runtime primitive is currently implied.

## Seasonal topology remaining mechanics

Seasonal prose is authored.

Product-depth topology still requires explicit option data that changes:
- availability;
- shortcut/edge;
- challenge eligibility;
- Activity-owned resource/endurance path.

Exact option IDs/costs remain OPEN.

## Multi-GIF opportunities

Forest route pools:
- logging road;
- Hunter trail;
- old boundary;
- deep navigation.

Challenge pools:
- navigation;
- physical obstacle;
- anomaly/ritual.

Season overlays:
- wet spring;
- dry/long-route summer;
- migration autumn;
- snow/ice winter.

Result pools:
- success;
- escape;
- failure.

Each semantic gameplay identity may own 3–5 media candidates while mechanics remain unchanged.

## Secret Debt authored content now ready

The completed Secret Debt wave remains available from:

- `docs/poverty-prep/SECRET_DEBT_TAKEOVER_CONTENT_v1.md`
- `prior-work/astra/prototype-m3.2/content/secret-debt-authored-content-v1.fixture.json`
- `docs/poverty-prep/SECRET_DEBT_AUTHORED_CONTENT_HANDOFF_v1.md`

The full authored wave also includes:
- lender offer bank;
- delayed activation bank;
- hidden-career daytime work bank;
- forced-Night scene bank;
- `paid_freedom`;
- `bound_life`;
- `takeover`.

## Secret Debt mechanical blockers remain OPEN

Still requires Product/mechanical authority:
- lender probability;
- principal/debt;
- activation delay;
- School availability while bound;
- Activity availability while bound;
- forced-Night intercept/payment/modifier policy;
- hidden-career numeric effects/thresholds;
- exact three ending eligibility rules;
- takeover external dependency;
- exact three Meta rewards.

The content fixture encodes these as `OPEN/null`, not guessed constants.

## Selective integration order

### Forest

1. copy `forest-result-content-v1.json`;
2. copy `forest-result-content-v1.test.ts`;
3. optionally copy route/challenge/season authoring docs;
4. validate content;
5. run targeted Forest result test;
6. run existing Activity/Lumber Forest regressions;
7. run full check;
8. require exact-head CI.

### Secret Debt

Docs/fixture may integrate immediately as authored authority.

Do not activate fixture in production catalog.

Mechanical production should proceed slice-by-slice only after the relevant specific Product decisions are supplied.

## Exact files from items 114–118

1. `mindy-successor/docs/lumber-prep/FOREST_ROUTE_AUTHORED_SCENE_BANK_v1.md`
2. `mindy-successor/docs/lumber-prep/FOREST_CHALLENGE_FAMILY_CONTENT_BANK_v1.md`
3. `mindy-successor/docs/lumber-prep/FOREST_SEASONAL_CONTEXT_BANK_v1.md`
4. `mindy-successor/prior-work/astra/prototype-m3.2/content/packs/forest-result-content-v1.json`
5. `mindy-successor/prior-work/astra/prototype-m3.2/tests/forest-result-content-v1.test.ts`

## Exact prior Secret Debt coordination files

- `mindy-successor/docs/poverty-prep/SECRET_DEBT_TAKEOVER_CONTENT_v1.md`
- `mindy-successor/prior-work/astra/prototype-m3.2/content/secret-debt-authored-content-v1.fixture.json`
- `mindy-successor/docs/poverty-prep/SECRET_DEBT_AUTHORED_CONTENT_HANDOFF_v1.md`

## Locked firewalls

Nothing in this handoff changes:
- Hard Work eligibility: ONLY `completed_shifts >= 50`;
- exact reward: `hardWork:lumber`;
- Forest success continuation: exact `activityResult(lumber.forest, success, lumber.forest.success)`;
- Secret Debt exclusion from the 10 ordinary careers;
- Palace requirement of all 10 ordinary Hard Work careers.
