# Foreman relationship localization readiness QA v1

Status: COMPLETE / PARTIAL_GREEN_FOR_SELECTIVE_INTEGRATION

Reviewed Chat 5 files:
- `content/relationship-foreman-localization-v1.fixture.json`
  - blob: `397e74af7834df72706fed383debaadebe2e30ce`
- `tests/relationship-foreman-localization-v1.test.ts`
  - blob: `2c585a572e56ef885208a44b4a9b982fad983b76`

Reviewed against current-main baseline:
`23a8798f77c42e84a7540d71fdffd69d9db9fbfd`.

## Exact current-main identities

Relationship:
`lumber.foreman`

Stages:
- `unknown`
- `professional`
- `route-professional`

Transitions:
- `notice-work`
- `choose-professional`

Current shipped event:
`lumber.foreman-notice`

Current shipped Night choice:
`lumber.foreman.night`

Current shipped Night event:
`lumber-night.foreman-professional`

Current media:
- `relationship.lumber.foreman.professional`
- `relationship.lumber.foreman.night.professional`

The worker fixture uses these exact locale-neutral identities. It does not invent a second Foreman or deeper relationship stage.

## RU+EN payload coverage

The fixture contains 11 keys:

1. `event.lumber.foreman-notice.title`
2. `event.lumber.foreman-notice.variant.default.text`
3. `event.lumber.foreman-notice.choice.professional.label`
4. `event.lumber.foreman-notice.choice.professional.text`
5. `nightChoice.lumber.foreman.night.label`
6. `event.lumber-night.foreman-professional.title`
7. `event.lumber-night.foreman-professional.variant.default.text`
8. `event.lumber-night.foreman-professional.choice.continue.label`
9. `event.lumber-night.foreman-professional.choice.continue.text`
10. `media.relationship.lumber.foreman.professional.alt`
11. `media.relationship.lumber.foreman.night.professional.alt`

All reviewed entries contain non-empty `ru` and `en`.

The key identities do not contain locale suffixes.

## Localization-only structure

PASS.

The fixture top level is limited to:
- `version`
- `defaultLocale`
- `strings`

The worker regression explicitly rejects gameplay mutation fields such as:
- conditions;
- effects;
- nextDay effects/Energy;
- rewards/meta rewards;
- reaction triggers;
- Night policy;
- transitions/stages;
- capabilities/read/write ownership;
- career/relationship progression fields;
- presentationId/RNG;
- money/Energy mechanics.

Therefore the localization payload does not create a parallel RU/EN gameplay path.

## Mechanical identity invariance

PASS.

The worker regression reads current definitions and root packs and verifies:
- exact `lumber.foreman` stages/transitions;
- exact `lumber.foreman-notice`;
- exact `lumber-night.foreman-professional`;
- exactly one `lumber.foreman.night` Night choice;
- gameplay structures contain no `locale`, `ru` or `en` field;
- resolving RU/EN text does not change event conditions or choice effects.

## Hard Work protection

PASS.

The regression asserts the authoritative ending condition exactly:
`careerCounter(lumber.completed_shifts, gte, 50)`

and Meta reward exactly:
`hardWork:lumber`.

The localization fixture does not restate or gate Hard Work.

## Current renderer readiness

### Event title/body/choice and media alt

`READY_FOR_SELECTIVE_COPY`.

The current generic event renderer already resolves:
- `event.<eventId>.title`;
- `event.<eventId>.variant.<variantId>.text`;
- `event.<eventId>.choice.<choiceId>.label`;
- `media.<mediaId>.alt`.

Therefore the 10 event/media fields in the fixture have an existing production localization path once merged into the authoritative localization bundle.

### Foreman Night-choice label

`STAGED_PENDING_UI_WIRING`.

The current ordinary Night choice renderer uses the embedded `NightChoice.label` directly. PR44 only adds special handling for School Night-study labels.

There is no reviewed current-main generic lookup for:
`nightChoice.lumber.foreman.night.label`.

Copying this key into `localization.json` alone would not make the visible voluntary Night button bilingual.

A future selective integration must either:
- add a small generic Night-choice label resolver using the stable Night choice ID; or
- explicitly document that this single key remains staged.

That resolver must remain presentation-only.

## Product boundary

PASS.

The payload does not decide:
- final Foreman NPC name;
- deeper stages/romance;
- relationship ending;
- Night meeting threshold;
- School management/accounting result;
- Hunter/Old Boundary semantics;
- Secret Debt/Slave mechanics;
- Palace content.

It only localizes already shipped professional Foreman identities.

## Required selective PR acceptance

For production integration:
1. start from fresh current main;
2. merge only exact reviewed Foreman RU+EN strings;
3. verify no localization-key collision;
4. wire Night-choice label generically only if that shared UI change is in scope;
5. test RU -> EN -> RU while the Foreman milestone/Night event is pending;
6. require gameplay Save, RNG, relationship state and NightFlow identity unchanged;
7. require exact-head typecheck/validate/build/tests;
8. require post-merge main CI.

## Verdict

`PARTIAL_GREEN_FOR_SELECTIVE_INTEGRATION`.

- 10 current event/media localization keys: `READY_FOR_SELECTIVE_COPY`.
- 1 Night-choice label key: `STAGED_PENDING_UI_WIRING`.

The Chat 5 branch must not be merged wholesale.
