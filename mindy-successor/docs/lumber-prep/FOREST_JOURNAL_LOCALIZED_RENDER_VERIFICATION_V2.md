# Forest Journal Localized-Render Verification v2

Status: verification matrix for current Forest result/reaction Journal + lastAction localization under shipped stable refs.

Current main:
`52ddc76148e33836d3161b63bf4c25ffb5c39d02`.

## Shipped stable-ref behavior

A resolved Forest reaction choice stores:
`{kind:'eventChoice', eventId, choiceId}`.

Journal/lastAction rendering resolves locale at read time:
- `event.<eventId>.title`;
- `event.<eventId>.choice.<choiceId>.text`.

Raw stored content remains compatibility fallback only.

## Verification matrix

| Event ID | Outcome | Exact activityResult | Choice ID | Title key | Text key | RU expected | EN expected |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `forest-result-content-v1.success` | `success` | `activityResult(lumber.forest, success, lumber.forest.success)` | `return` | `event.forest-result-content-v1.success.title` | `event.forest-result-content-v1.success.choice.return.text` | Ты оставляешь результат экспедиции неизменным и возвращаешься к обычному городскому ходу дня. | You leave the Activity result intact and return to the city-side flow. |
| `forest-result-content-v1.escape` | `escape` | `activityResult(lumber.forest, escape, lumber.forest.escape)` | `return` | `event.forest-result-content-v1.escape.title` | `event.forest-result-content-v1.escape.choice.return.text` | Ты сохраняешь результат «отступление» отдельным и возвращаешься, не превращая его в успех. | You keep the escape result distinct and return without converting it into success. |
| `forest-result-content-v1.failure` | `failure` | `activityResult(lumber.forest, failure, lumber.forest.failure)` | `return` | `event.forest-result-content-v1.failure.title` | `event.forest-result-content-v1.failure.choice.return.text` | Ты принимаешь зафиксированное поражение и возвращаешься к обычному ходу игры. | You accept the failed Activity result as recorded and return to ordinary flow. |


Reviewed Forest reaction choices:
**3**.

## Exact result identities

Must remain:
- success -> `lumber.forest.success`;
- escape -> `lumber.forest.escape`;
- failure -> `lumber.forest.failure`.

No route-specific result namespace is introduced by Journal localization.

## Locale invariance

For every row:
- RU and EN use the same eventId + choiceId ref;
- locale changes only title/text rendering;
- effects are not replayed;
- world facts/resources are not recalculated;
- Journal history identity does not change.

## Route independence

Whether the preceding Forest route was:
- `forest.route.logging-road`; or
- `forest.route.old-boundary`

the reaction/result identity remains the same exact outcome/result pair.

## Save/RNG invariance

Journal render must not:
- mutate Save;
- advance global RNG;
- advance Activity RNG;
- duplicate a reaction event;
- alter result identity.

## Lumber Hard Work

Unchanged:
- eligibility ONLY `completed_shifts >= 50`;
- Meta reward `hardWork:lumber`.

## Verification conclusion

Current Forest success/escape/failure reaction choices are fully compatible with shipped locale-neutral Journal/lastAction refs while preserving exact `activityResult` continuation.
