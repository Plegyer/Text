# Foreman / Ordinary Night Handoff v2

Date: 2026-09-28
Owner: Chat 5
Exact current-main baseline: `01b31b9ab0d0267d95edf5b5b80638acd63f5c04`
Scope: queue items 169–179
Integration mode: selective copy/wiring only.

## FOREMAN_TEXT_READY

Identity audit:
- `CURRENT_MAIN_FOREMAN_RELATIONSHIP_IDENTITY_AUDIT_V2.md`

RU/EN source:
- `FOREMAN_RELATIONSHIP_RU_SOURCE_POLISH_V2.md`
- `FOREMAN_RELATIONSHIP_EN_PARITY_V2.md`

Fixture:
- `content/relationship-foreman-localization-v2.fixture.json`

Exact current relationship:
- `lumber.foreman`

Exact stages:
- `unknown`
- `professional`
- `route-professional`

Current data also includes:
- choice `route=professional`
- counter `night_meetings`
- fact `night-followup-complete`

Item 173 provides semantic display keys for those already-existing identities and keeps the current `lumber.foreman-notice` event localization identical to root.

No new relationship mechanics are present.

## ORDINARY_NIGHT_TEXT_READY

Audit/source:
- `CURRENT_MAIN_ORDINARY_NIGHT_IDENTITY_AUDIT_V2.md`
- `ORDINARY_VOLUNTARY_NIGHT_CHOICE_COPY_AUDIT_V2.md`
- `ORDINARY_NIGHT_RESULT_COPY_RU_EN_V2.md`

Fixture:
- `content/ordinary-night-result-localization-v2.fixture.json`

Exact Chat5 ordinary voluntary choices:
- `night.sleep`
- `lumber.foreman.night`

Current `night.sleep` has a localized choice label and no dedicated result body.

Current `lumber.foreman.night` triggers exact event:
- `lumber-night.foreman-professional`

Item 176 contains only current ordinary Night choice/event presentation keys and is identical to current root localization.

## ACCESSIBILITY_READY

Source:
- `FOREMAN_NIGHT_ACCESSIBILITY_COPY_V2.md`

Exact presentation ID:
- `relationship/lumber-foreman/lumber-night-foreman-professional/default`

Current static asset:
- `assets/presentation/foreman-night-voluntary-v2.svg`

Approved semantic/static alt and caption copy are bilingual.

No GIF source is currently configured for this slot; future animation can reuse the same semantic accessibility copy if the depicted scene is unchanged.

## SHARED_CONSUMER_WIRING_REQUIRED

Map:
- `RELATIONSHIP_NIGHT_CONSUMER_MAP_V2.md`

Already-consumed today:
- standard Foreman event `event.*` keys;
- `nightChoice.<id>.label`;
- Foreman Night event title/body/choice keys;
- event-choice localized outcome refs;
- current presentation alt keys.

Needs shared semantic-name consumer if desired:
- relationship label;
- relationship stage labels;
- relationship counter label;
- relationship fact label;
- relationship choice/value label.

Do not replace locale-neutral condition/Save IDs with translated strings.

## PRODUCT_OPEN

Still Product-open / not current canon:
- Foreman personal name/unique NPC identity;
- romance route;
- affection meter;
- sexual/explicit relationship content;
- additional relationship stages/facts/counters;
- new housing/privacy gate;
- new relationship reward/economy;
- new Foreman ending requirement.

Current route is professional only.

## SECRET_DEBT_EXCLUDED

Forced Secret Debt/night content remains separate from this wave.

No item 169–179 source:
- changes forced Debt NightFlow;
- adds Debt choice IDs;
- changes debt mechanics;
- changes lodging payment;
- changes daytime Energy.

## SCHOOL_EXCLUDED

Exact `school.night_study.*` choices are present on current main but remain School-owned.

This handoff does not copy or redefine their course/stat/counter/next-day-Energy behavior.

## SELECTIVE COPY

169. `mindy-successor/docs/relationship-prep/CURRENT_MAIN_ORDINARY_NIGHT_IDENTITY_AUDIT_V2.md`
170. `mindy-successor/docs/relationship-prep/CURRENT_MAIN_FOREMAN_RELATIONSHIP_IDENTITY_AUDIT_V2.md`
171. `mindy-successor/docs/relationship-prep/FOREMAN_RELATIONSHIP_RU_SOURCE_POLISH_V2.md`
172. `mindy-successor/docs/relationship-prep/FOREMAN_RELATIONSHIP_EN_PARITY_V2.md`
173. `mindy-successor/prior-work/astra/prototype-m3.2/content/relationship-foreman-localization-v2.fixture.json`
174. `mindy-successor/docs/relationship-prep/ORDINARY_VOLUNTARY_NIGHT_CHOICE_COPY_AUDIT_V2.md`
175. `mindy-successor/docs/relationship-prep/ORDINARY_NIGHT_RESULT_COPY_RU_EN_V2.md`
176. `mindy-successor/prior-work/astra/prototype-m3.2/content/ordinary-night-result-localization-v2.fixture.json`
177. `mindy-successor/docs/relationship-prep/FOREMAN_NIGHT_ACCESSIBILITY_COPY_V2.md`
178. `mindy-successor/docs/relationship-prep/RELATIONSHIP_NIGHT_CONSUMER_MAP_V2.md`
179. `mindy-successor/prior-work/astra/prototype-m3.2/tests/relationship-night-localization-source-v2.test.ts`
180. `mindy-successor/docs/relationship-prep/FOREMAN_ORDINARY_NIGHT_HANDOFF_V2.md`

## Acceptance invariants

Across RU↔EN switching:
- same relationship ID/stage/facts/counters/choices;
- same Night choice IDs;
- same NightFlow phase/intercept behavior;
- same lodging payment behavior;
- same daytime Energy;
- same next-day Energy effects;
- same event IDs/choices;
- same presentation IDs/media identity;
- same Save;
- same RNG.

Only presentation changes.
