# Forest + Poverty Selective Integration Handoff v3

Status: Chat 3 item 172 handoff for queue items 161–171.

Worker branch:
`chat3/lumber-production-proof-next`.

Integration rule:
**never merge this long-lived worker branch wholesale**. Lead should selectively copy reviewed files onto fresh branches from current `main`.

This wave contains tests, localization fixtures/inventories, and Product-open staging only. No shared runtime/schema/UI file was intentionally edited by this queue.

## Category summary

### SAFE_TO_COPY

These files can be selectively copied now onto a fresh current-main integration branch, subject to their listed fixture prerequisites.

#### Item 161

`prior-work/astra/prototype-m3.2/tests/ordinary-poverty-all-pack-bilingual-paths-v1.test.ts`

Covers one naturally reachable representative path from each of the six shipped ordinary-poverty packs:
- street production;
- street production v2;
- cheap lodging production;
- cheap lodging v2;
- recovery/help;
- pressure/bad-luck.

Validates:
- RU+EN key presence;
- locale-neutral pending event/variant identity;
- localization lookup does not mutate gameplay Save;
- effectful and effect-free choices resolve exactly once;
- reload stability;
- Secret Debt exclusion.

Prerequisite until poverty localization is merged:
`content/poverty-localization-main-delta-v1.fixture.json`.

#### Item 162

`docs/poverty-prep/ORDINARY_POVERTY_SHARED_NIGHT_UI_COPY_INVENTORY_v1.md`

Safe documentation copy.

Inventories current lodging/Night surfaces surrounding poverty events and separates:
- already shipped RU+EN;
- Russian fallback only;
- missing bilingual copy;
- shared UI-owned surfaces.

It does not edit the renderer.

#### Item 163

`prior-work/astra/prototype-m3.2/content/poverty-shared-surface-localization-v1.fixture.json`

Safe as a localization-authoring fixture.

Contains 17 new collision-checked RU+EN presentation keys for:
- lodging labels;
- Night shell text;
- next-day Energy formatting;
- voluntary Night shell;
- town lodging summary;
- result-to-lodging bridge;
- `night.sleep` label.

Explicitly omits existing shared localization keys and domain-owned School/Foreman surfaces.

Important:
copying the fixture is safe; **making these strings visible requires Lead/Chat 1 shared UI wiring**.

#### Item 166

`prior-work/astra/prototype-m3.2/tests/forest-route-localization-collision-v1.test.ts`

Safe collision/identity guard for items 164–165.

Checks:
- only currently shipped logging-road / old-boundary route references;
- RU+EN completeness;
- locale-neutral keys;
- additive or exact-identical localization merge;
- presentation-only payload;
- Old Boundary token semantics remain open.

#### Item 171

`prior-work/astra/prototype-m3.2/tests/secret-debt-authored-content-isolation-v1.test.ts`

Safe isolation regression.

Prerequisite fixture:
`content/secret-debt-authored-content-ru-en-v1.fixture.json` from the earlier authored-content wave.

Checks:
- authored Secret Debt fixture is not root-loaded production;
- current production packs/catalog contain no Secret Debt activation;
- ordinary Hard Work remains exactly the 10 careers used for Palace progress;
- no ordinary-poverty ID collision;
- all Product-open Secret Debt mechanic/reward slots remain null/unselected;
- outcome families remain `paid_freedom`, `bound_life`, `takeover`.

---

## STAGING_ONLY

These artifacts are structurally safe to copy for review/test fixtures, but they should not be treated as active shipped presentation until the missing shared binding exists.

### Item 164 — logging road localization

`prior-work/astra/prototype-m3.2/content/forest-logging-road-localization-v1.fixture.json`

Contains 5 RU+EN localization entries:
- 4 existing logging-road scenes;
- 1 route reaction.

Route reference:
`forest.route.logging-road`.

No route condition/effect/reward change.

Why staging:
current shared presentation runtime does not yet consume route-specific scene keys through a real logging-road route-presentation binding.

### Item 165 — old boundary localization

`prior-work/astra/prototype-m3.2/content/forest-old-boundary-localization-v1.fixture.json`

Contains 5 RU+EN localization entries:
- 4 existing old-boundary scenes;
- 1 route reaction.

Route reference:
`forest.route.old-boundary`.

Existing gate remains:
`itemCapability(enter_old_boundary) present=true`.

The fixture does not choose:
- token acquisition;
- token price;
- retain/consume/turn-in behavior;
- deeper token semantics.

Why staging:
same missing route-scene presentation binding as item 164.

---

## PRODUCT_OPEN

These files are machine-readable or documentary authored content, but production gameplay decisions remain explicitly unresolved.

### Item 167 — navigation challenge

`prior-work/astra/prototype-m3.2/content/forest-navigation-challenge-staging-v1.fixture.json`

Contains:
- current runtime-capable condition families as possibilities;
- 5 authored RU+EN navigation scenes;
- 5 authored bilingual approach labels;
- locale-neutral semantic presentation IDs.

Still open:
- gameplay challenge ID;
- route binding;
- selected stat/fact/capability;
- threshold;
- provider;
- progress/endurance values;
- reward;
- seasonal mechanic.

### Item 168 — physical obstacle challenge

`prior-work/astra/prototype-m3.2/content/forest-physical-challenge-staging-v1.fixture.json`

Contains:
- current stat condition families;
- existing `cross_rough_route` / `cut_heavy_wood` capabilities as **possible, not selected** references;
- 5 authored RU+EN obstacle scenes;
- 5 bilingual approach labels.

Still open:
- gameplay ID;
- route binding;
- exact condition/threshold;
- capability selection;
- item-consumption semantics;
- progress/endurance;
- reward/consequence;
- seasonal mechanic.

### Item 169 — interpretation / ritual anomaly

`prior-work/astra/prototype-m3.2/content/forest-anomaly-challenge-staging-v1.fixture.json`

Contains:
- Reason/Magic/public-fact/capability condition families as possibilities;
- existing `preserve_specimen` capability as possible only;
- 5 authored RU+EN anomaly scenes;
- 5 bilingual approach labels.

Still open:
- gameplay ID;
- route binding;
- exact threshold;
- School Arcana public-result ID;
- provider;
- School threshold;
- sample item/lore truth;
- reward;
- persistent consequence.

No School Arcana result was invented.

### Item 170 — Secret Debt localization-key inventory

`docs/poverty-prep/SECRET_DEBT_BILINGUAL_LOCALIZATION_KEY_INVENTORY_v1.md`

Inventories **98 already-authored RU+EN presentation surfaces**:
- 30 lender-offer;
- 16 delayed-activation;
- 30 hidden-work;
- 10 forced-Night;
- 12 outcome surfaces.

Proposes locale-neutral stable localization keys only.

It is authoring-only and deliberately does not choose:
- encounter probability;
- principal;
- debt;
- delay;
- hidden-career mechanics;
- forced-Night penalty/policy;
- outcome thresholds;
- takeover dependency;
- Meta rewards.

Secret Debt remains outside Palace 10/10.

---

## BLOCKED

The following are **not** Chat 3 production tasks until their owner/dependency changes.

### Poverty shared UI consumption

Blocked on:
Lead/Chat 1 shared UI integration.

Needed before item-163 strings become visible:
- lodging label localization lookup by lodging ID;
- shared Night shell `tr(...)` calls;
- localized next-day Energy formatter;
- localized `night.sleep` label consumption where applicable.

Do not modify mechanics, lodging costs, housing tier, NightFlow or save state.

### Forest route-scene runtime binding

Blocked on:
Lead/Chat 1 route-presentation integration decision.

Needed before items 164–165 become real player-facing route scenes:
- authoritative mapping from selected Activity route option/state to semantic route presentation ID;
- text-selection policy;
- media slot binding if used.

No new route IDs are needed for logging road or old boundary.

### Forest challenge production

Blocked on:
Product decisions plus an explicit production-authoring task.

Items 167–169 must not be converted into gameplay options until IDs, route binding, conditions, thresholds and progress/endurance/reward decisions are accepted.

### Hunter trail

Still Product-open:
- production option ID;
- route state;
- clue/public fact;
- capability;
- provider;
- threshold;
- reward.

### Old Boundary Token semantics

Still Product-open:
- natural acquisition source;
- price if any;
- retain/consume/turn-in behavior;
- deeper-use semantics.

### Secret Debt activation

Blocked on Product closure of OPEN values/mechanics.

The authored/localization material does not authorize root-loaded production.

---

## Ordinary poverty integration path after Lead localization merge

Only after Lead selectively merges the ordinary-poverty localization payload into current-main `content/localization.json`:

1. run item 150 collision guard against the actual merged bundle;
2. run item 149 executable street/cheap smoke;
3. run item 153 locale-invariance contract;
4. run item 161 all-six-pack bilingual path matrix;
5. compare item 152 UI smoke fixture against the real merged localization;
6. run all existing poverty production/reload/NightFlow tests;
7. run `npm run check`;
8. require exact-head CI.

Then, and only then, useful follow-up Chat 3 work is:
- a post-merge localization snapshot test reading **only** the real merged bundle;
- an all-six-pack test that no longer depends on item-140 fixture;
- content review for any translation changes requested after UI observation.

Until that merge occurs, additional duplicate poverty localization fixtures would add little value.

---

## Forest integration path after route-presentation binding

Only after Lead exposes a real logging-road / old-boundary presentation binding:

1. selectively integrate items 164–165 localization strings;
2. run item 166 collision guard;
3. bind only existing route IDs:
   - `forest.route.logging-road`;
   - `forest.route.old-boundary`;
4. add natural-path route-presentation tests proving selected route state maps to the intended semantic presentation identity;
5. add locale-switch invariance around the bound route scene;
6. add real media only when actual assets exist;
7. preserve old-boundary gate/token semantics exactly.

Then useful follow-up Chat 3 work is:
- logging-road natural-path presentation regression;
- old-boundary natural-path presentation regression using only the existing capability gate;
- route-scene RU+EN consumption test against the real merged localization;
- route-specific 3–5 GIF pool authoring once real assets exist.

Until that binding exists, more route runtime tests would test an interface that does not yet exist.

---

## Locked invariants preserved

Forest:
- Lumber Hard Work eligibility ONLY `completed_shifts >= 50`;
- exact reward `hardWork:lumber`;
- Forest result continuation keeps exact `activityResult` identities;
- Hunter semantics remain unguessed;
- Old Boundary Token semantics remain unguessed.

Ordinary poverty:
- remains separate from Secret Debt;
- existing PR37 mechanics, tuning, RNG, NightFlow and save behavior are unchanged by localization.

Secret Debt:
- starts from street context when eventually authored into production;
- bound state blocks 10 ordinary careers while preserving their progress;
- Secret Debt is not Palace 10/10;
- outcome families remain `paid_freedom`, `bound_life`, `takeover`;
- exact probability/principal/debt/delay/penalty/threshold/reward values remain OPEN.

## Handoff conclusion

Items 161–171 close the remaining independent content/test preparation that can be done safely before the two major integration hinges:

1. **Lead merges ordinary-poverty localization/shared Night UI consumption**, or
2. **Lead exposes a real Forest route-presentation binding**.

Further production work should wait for one of those integration hinges rather than inventing another parallel mechanism.
