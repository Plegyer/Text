# Ending Condition Display Expectation Matrix v1

Date: 2026-09-28
Owner: Chat 5
Exact current-main baseline: `52ddc76148e33836d3161b63bf4c25ffb5c39d02`

| Ending ID | Exact condition object | Expected RU presentation | Expected EN presentation | Note |
|---|---|---|---|---|
| `guild-life` | `{"kind":"metric","key":"work","op":"gte","value":5}` | Практика в лавке ≥ 5 | Shop practice ≥ 5 | generic metric label source required |
| `guild-life` | `{"kind":"metric","key":"organization","op":"gte","value":6}` | Организация (legacy) ≥ 6 | Organization (legacy) ≥ 6 | generic metric label source required |
| `guild-life` | `{"kind":"flag","key":"alchemy.delivered","value":true}` | Продвиньте связанную историю | Advance the related story | current generic flag template |
| `scholar-life` | `{"kind":"flag","key":"school.exam","value":true}` | Продвиньте связанную историю | Advance the related story | current generic flag template |
| `tavern-stay` | `{"kind":"visits","action":"tavern","value":18}` | Таверна «Третий тост»: 18 смен | The Third Toast Tavern: 18 shifts | legacy action label needs bilingual source |
| `tavern-guild` | `{"kind":"flag","key":"tavern.guild","value":true}` | Продвиньте связанную историю | Advance the related story | current generic flag template |
| `tavern-court` | `{"kind":"flag","key":"tavern.prince","value":true}` | Продвиньте связанную историю | Advance the related story | current generic flag template |
| `lumber-stay` | `{"kind":"visits","action":"lumber","value":24}` | Лесорубы: артель «Не падай»: 24 смен | Lumber crew “Don't Fall”: 24 shifts | legacy action label needs bilingual source |
| `ending.lumber.hard-work` | `{"kind":"careerCounter","career":"lumber","counter":"completed_shifts","op":"gte","value":50}` | Карьера lumber: completed_shifts ≥ 50 | Career lumber: completed_shifts ≥ 50 | stable raw IDs intentionally preserved |
| `ending.lumber.forewoman` | `{"kind":"careerFact","career":"lumber","fact":"management-school-ready","present":true}` | Карьера lumber: факт management-school-ready есть | Career lumber: fact management-school-ready present | stable raw IDs intentionally preserved |
| `ending.lumber.forewoman` | `{"kind":"careerFact","career":"lumber","fact":"forewoman-problem-resolved","present":true}` | Карьера lumber: факт forewoman-problem-resolved есть | Career lumber: fact forewoman-problem-resolved present | stable raw IDs intentionally preserved |
| `ending.lumber.forewoman` | `{"kind":"relationshipStage","relationship":"lumber.foreman","stage":"route-professional"}` | Отношения lumber.foreman: этап route-professional | Relationship lumber.foreman: stage route-professional | stable raw IDs intentionally preserved |
| `ending.lumber.forest` | `{"kind":"careerFact","career":"lumber","fact":"forest-truth-known","present":true}` | Карьера lumber: факт forest-truth-known есть | Career lumber: fact forest-truth-known present | stable raw IDs intentionally preserved |
| `ending.lumber.forest` | `{"kind":"careerFact","career":"lumber","fact":"forest-problem-resolved","present":true}` | Карьера lumber: факт forest-problem-resolved есть | Career lumber: fact forest-problem-resolved present | stable raw IDs intentionally preserved |

## Stable-ID rule

The matrix intentionally leaves current semantic IDs visible where no approved semantic-name layer exists:
- `lumber`
- `completed_shifts`
- `management-school-ready`
- `forewoman-problem-resolved`
- `forest-truth-known`
- `forest-problem-resolved`
- `lumber.foreman`
- `route-professional`

Localization may change surrounding grammar, not these gameplay identities.

## Legacy action-name dependency

The two `visits` conditions resolve their action label from exact current legacy action IDs:
- `tavern`
- `lumber`

Current main lacks dedicated RU+EN `action.tavern.label` / `action.lumber.label` keys. The EN expectation above records the desired visible parity but requires that legacy action-label presentation source before it can render exactly.

## Metric-label dependency

`work` and `organization` are legacy/generic metrics. Their bilingual visible labels were prepared in the prior generic-label source stream; eligibility still depends only on the exact numeric condition object.

## Acceptance invariants

For every row:
- condition object remains byte-for-byte semantically identical;
- `meets()` / `eligible()` result is identical in RU and EN;
- comparison operator/value is unchanged;
- locale switch consumes no RNG;
- locale switch mutates no Save state.
