# Relationship / Night Consumer Map v2

Date: 2026-09-28
Owner: Chat 5
Exact current-main baseline: `01b31b9ab0d0267d95edf5b5b80638acd63f5c04`

Sources:
- `content/relationship-foreman-localization-v2.fixture.json`
- `content/ordinary-night-result-localization-v2.fixture.json`

## Current consumers that already exist

### Foreman milestone event

Keys:
- `event.lumber.foreman-notice.title`
- `event.lumber.foreman-notice.variant.default.text`
- `event.lumber.foreman-notice.choice.professional.label`
- `event.lumber.foreman-notice.choice.professional.text`

Current event/pending-scene renderer already resolves these standard `event.*` keys.

Post-choice Journal/lastAction presentation can use the existing locale-neutral event-choice identity.

Classification:
- **CURRENT_CONSUMER_READY**
- current fixture values are identical to root

### Ordinary Night choice labels

Keys:
- `nightChoice.night.sleep.label`
- `nightChoice.lumber.foreman.night.label`

Current `localizedNightChoiceLabel(id,fallback)` resolves:

`nightChoice.<choiceId>.label`

Classification:
- **CURRENT_CONSUMER_READY**
- current fixture values are identical to root

### Foreman voluntary-Night event

Keys:
- `event.lumber-night.foreman-professional.title`
- `event.lumber-night.foreman-professional.variant.default.text`
- `event.lumber-night.foreman-professional.choice.continue.label`
- `event.lumber-night.foreman-professional.choice.continue.text`

Current flow:
1. select `lumber.foreman.night`;
2. engine emits `nightChoiceCompleted`;
3. event `lumber-night.foreman-professional` opens at `after_choice`;
4. standard event renderer resolves title/body/choice label;
5. choice resolution can use the stable event-choice reference for localized outcome text.

Classification:
- **CURRENT_CONSUMER_READY**
- current fixture values are identical to root

## Relationship semantic display keys needing shared consumer wiring

Item 173 additive keys:
- `relationship.lumber.foreman.label`
- `relationship.lumber.foreman.stage.unknown.label`
- `relationship.lumber.foreman.stage.professional.label`
- `relationship.lumber.foreman.stage.route-professional.label`
- `relationship.lumber.foreman.counter.night_meetings.label`
- `relationship.lumber.foreman.fact.night-followup-complete.label`
- `relationship.lumber.foreman.choice.route.professional.label`

Current shared condition explanation still exposes stable relationship/stage/counter/fact/choice IDs directly where no semantic-name layer exists.

Recommended future presentation lookup:
- relationship → `relationship.<id>.label`
- stage → `relationship.<id>.stage.<stage>.label`
- counter → `relationship.<id>.counter.<counter>.label`
- fact → `relationship.<id>.fact.<fact>.label`
- choice/value → reviewed semantic choice key

Classification:
- **SHARED_CONSUMER_WIRING_REQUIRED**

Do not rewrite IDs in Save/conditions.

## Accessibility consumer

Exact Night presentation ID:
- `relationship/lumber-foreman/lumber-night-foreman-professional/default`

Current presentation slot already points to:
- static asset `foreman-night-voluntary-v2.svg`
- alt key `presentation.static.foreman-night-voluntary-v2.alt`

Item 177 confirms the current alt/caption source.

Classification:
- **ACCESSIBILITY_READY**

## Shared Night shell

Already localized separately:
- Night title/prompt
- choice slot/help
- select button
- lodging shell
- next-day Energy annotation

No duplicate keys are required in items 173/176.

## Exclusions

No consumer map entry authorizes:
- Secret Debt flow changes;
- School exact-course Night changes;
- new relationship mechanics;
- new romance route;
- new Save fields;
- new RNG use.
