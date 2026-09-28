# Foreman Semantic Consumer Map v1

Date: 2026-09-28
Owner: Chat 5
Exact current-main baseline: `01b31b9ab0d0267d95edf5b5b80638acd63f5c04`
Fixture: `content/relationship-foreman-semantic-labels-v1.fixture.json`

## Current shared condition renderer

Current `src/ui/app.ts` renders relationship conditions through generic templates that still interpolate raw IDs:

### relationshipStage
Current:
`Отношения {relationship}: этап {stage}`

Exact current Foreman normal-player seam:
the Lumber Forewoman ending includes:
- relationship ID `lumber.foreman`
- stage `route-professional`

Recommended semantic lookup:
- relationship → `relationship.lumber.foreman.label`
- stage → `relationship.lumber.foreman.stage.route-professional.label`

### relationshipCounter
Current:
`Отношения {relationship}: {counter} {comparison}`

Current Foreman semantic identity:
- counter `night_meetings`

Recommended lookup:
- relationship → `relationship.lumber.foreman.label`
- counter → `relationship.lumber.foreman.counter.night_meetings.label`

No current normal-player ending requirement uses this counter, but the generic condition renderer can present it if an exact current condition consumer is surfaced.

### relationshipFact
Current:
`Отношения {relationship}: факт {fact} {state}`

Current Foreman semantic identity:
- fact `night-followup-complete`

Recommended lookup:
- relationship → `relationship.lumber.foreman.label`
- fact → `relationship.lumber.foreman.fact.night-followup-complete.label`

### relationshipChoice
Current:
`Отношения {relationship}: {choice} = {value}`

Current Foreman semantic identity:
- choice `route`
- value `professional`

Recommended lookup:
- relationship → `relationship.lumber.foreman.label`
- choice → `relationship.lumber.foreman.choice.route.label`
- value → `relationship.lumber.foreman.choice.route.value.professional.label`

## Stage-specific display

There is no dedicated relationship panel on current main.

If future/current shared presentation shows the current stage directly, use:

`relationship.<relationshipId>.stage.<stageId>.label`

with the raw stage ID as fallback.

## Generic helper behavior

A safe shared presentation helper can follow:

1. try an exact semantic localization key;
2. fall back to the raw stable ID;
3. never mutate the condition object;
4. never derive identity from translated text.

This can be applied independently to relationship, stage, counter, fact, choice and value components.

## Current event/Night prose

Do not replace current event/Night keys with semantic-label keys.

These remain separate:
- `event.lumber.foreman-notice.*`
- `nightChoice.lumber.foreman.night.label`
- `event.lumber-night.foreman-professional.*`

Semantic labels are for typed relationship identity components, not authored narrative prose.

## Debug-adjacent rule

Raw IDs may remain in developer-only inspectors/debug JSON.

Item 186 is intended for player-facing presentation seams only.

## Invariants

Consumer wiring must not change conditions, relationship state, transitions, event eligibility, NightFlow, Save, or RNG.
