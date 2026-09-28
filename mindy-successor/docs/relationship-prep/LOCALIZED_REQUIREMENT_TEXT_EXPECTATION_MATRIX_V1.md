# Localized Requirement Text Expectation Matrix v1

Date: 2026-09-28
Owner: Chat 5
Exact current-main baseline: `295e6fc74d235f0b7555794555a18373451e8b7e`

Purpose: record representative visible RU/EN requirement strings while preserving the exact current `Condition` objects.

## Ordinary actions

| Surface | Exact condition object | Expected RU | Expected EN |
|---|---|---|---|
| `brew` | `{"kind":"item","id":"herb","count":1}` | `Травы × 1` | `Herbs × 1` |
| `scales` | `{"kind":"not","condition":{"kind":"item","id":"scales","count":1}}` | `Не требуется: Весы × 1` | `Not required: Scales × 1` |
| `exam` | `{"kind":"metric","key":"lessons","op":"gte","value":3}` | `Уроки ≥ 3` | `Lessons ≥ 3` |
| `exam` | `{"kind":"metric","key":"intelligence","op":"gte","value":7}` | `Разум (legacy) ≥ 7` | `Intelligence (legacy) ≥ 7` |
| `exam` | `{"kind":"metric","key":"alchemy","op":"gte","value":2}` | `Алхимия ≥ 2` | `Alchemy ≥ 2` |
| `exam` | `{"kind":"flag","key":"school.exam","value":false}` | `Этот этап уже пройден` | `This step has already been completed` |
| `rent-room` | `{"kind":"metric","key":"debt","op":"eq","value":0}` | `Долг = 0` | `Debt = 0` |
| `rent-room` | `{"kind":"not","condition":{"kind":"housing","value":"room"}}` | `Не требуется: Обычная комната` | `Not required: Normal room` |
| `forest-search` | `{"kind":"metric","key":"perception","op":"gte","value":3}` | `Чутьё (legacy) ≥ 3` | `Perception (legacy) ≥ 3` |

## Composite action example

Current `guard` condition includes:

`any(all(metric strength>=6, metric composure>=5), flag guard.recommendation=true)`

Expected visible composite:

RU:
`Сила ≥ 6 и Самообладание (legacy) ≥ 5 или Продвиньте связанную историю`

EN:
`Strength ≥ 6 and Composure (legacy) ≥ 5 or Advance the related story`

Parentheses are not part of the current `explain(c)` output. If Lead later adds grouping punctuation, it must remain presentation-only and preserve the same condition tree.

## Ending examples

### `guild-life`

Exact conditions:
- `{"kind":"metric","key":"work","op":"gte","value":5}`
- `{"kind":"metric","key":"organization","op":"gte","value":6}`
- `{"kind":"flag","key":"alchemy.delivered","value":true}`

Expected RU:
- `Практика в лавке ≥ 5`
- `Организация (legacy) ≥ 6`
- `Продвиньте связанную историю`

Expected EN:
- `Shop practice ≥ 5`
- `Organization (legacy) ≥ 6`
- `Advance the related story`

### `ending.lumber.hard-work`

Exact condition:

`{"kind":"careerCounter","career":"lumber","counter":"completed_shifts","op":"gte","value":50}`

Expected current generic presentation:

RU:
`Карьера lumber: completed_shifts ≥ 50`

EN:
`Career lumber: completed_shifts ≥ 50`

The stable IDs remain visible because no separate semantic localization layer for career/counter IDs exists in this queue.

### `ending.lumber.forewoman`

Representative exact condition:

`{"kind":"relationshipStage","relationship":"lumber.foreman","stage":"route-professional"}`

Expected RU:
`Отношения lumber.foreman: этап route-professional`

Expected EN:
`Relationship lumber.foreman: stage route-professional`

Again, the raw relationship/stage IDs are intentionally preserved as fallback identity.

## Acceptance rule

For every row:
- the exact `Condition` object is unchanged;
- only label/grammar presentation changes with locale;
- comparison operator/value stays identical;
- eligibility result stays identical;
- no Save or RNG mutation occurs on locale switch.

## Dependencies

Human-readable metric labels and condition grammar can reuse the already-authored shared sources on the Chat5 branch:
- `CONDITION_EXPLANATION_TEMPLATES_RU_EN_V2.md`
- `condition-state-word-localization-v1.fixture.json`
- `INVENTORY_RESOURCE_LABELS_RU_EN_SOURCE_V1.md`

This matrix adds no new mechanics.
