# Forest Result Content Bundle v1

Status: C3-05 production-ready content-only refresh.
Owner: Chat 3 / Forest + Poverty Content Bundles Worker.
Baseline main: `921abfa79f4dba9c0acee4eca6724c3ed122d42f`.

## Scope

C3-05 refreshes only player-facing copy for the three already-shipped Forest terminal result events.

Changed production content:
- `content/packs/forest-result-content-bilingual-v2.json`;
- matching RU/EN strings in `content/localization.json`.

No Activity result, reaction trigger, condition, choice ID, choice effect, route, world fact, career fact, reward, Save field, RNG, ending condition, or media path is changed.

## Exact result boundaries preserved

Success:
- event: `forest-result-content-v1.success`;
- boundary: `activityResult(lumber.forest, success, lumber.forest.success)`;
- variant: `default`;
- choice: `return`;
- choice effects: empty.

Escape:
- event: `forest-result-content-v1.escape`;
- boundary: `activityResult(lumber.forest, escape, lumber.forest.escape)`;
- variant: `default`;
- choice: `return`;
- choice effects: empty.

Failure:
- event: `forest-result-content-v1.failure`;
- boundary: `activityResult(lumber.forest, failure, lumber.forest.failure)`;
- variant: `default`;
- choice: `return`;
- choice effects: empty.

## Success copy

Title:
- RU: `Вернуться с ясным следом`
- EN: `Return with a clear trail`

Result text:
- RU: `К концу маршрута разрозненные приметы складываются в ясную картину. Теперь из леса можно вынести не догадку, а подтверждённый результат, с которым есть смысл возвращаться в артель.`
- EN: `By the end of the route, scattered signs resolve into a clear picture. You can carry back more than a guess now: a confirmed result worth bringing to the lumber crew.`

Return label:
- RU: `Вернуться с результатом`
- EN: `Return with the result`

Return text:
- RU: `Ты собираешь записи и возвращаешься к артели, чтобы лесной результат дошёл до тех, кого он касается.`
- EN: `You gather your notes and return to the crew so the Forest result reaches the people it concerns.`

The copy is compatible with the existing success effect `lumber.forest.truth-known` but does not itself write that fact.

## Escape copy

Title:
- RU: `Отступить, сохранив путь назад`
- EN: `Turn back with the route still open`

Result text:
- RU: `Ты решаешь не продавливать маршрут дальше. Разворачиваешься по собственным следам, сохраняя то, что успела увидеть, но не выдавая незавершённую вылазку за успех.`
- EN: `You decide not to force the route farther. You retrace your own steps, keeping what you managed to observe without pretending the unfinished expedition was a success.`

Return label:
- RU: `Вернуться по своим следам`
- EN: `Return by your own tracks`

Return text:
- RU: `Ты выходишь к кромке леса по знакомому пути и возвращаешься, сохраняя отступление отдельным исходом.`
- EN: `You reach the forest edge by the familiar path and return, keeping the escape as its own outcome.`

The copy preserves escape as distinct from both success and failure.

## Failure copy

Title:
- RU: `Вернуться без ответа`
- EN: `Return without an answer`

Result text:
- RU: `Сил на продолжение больше не остаётся. Приходится оборвать маршрут без результата, ради которого началась вылазка; этот исход остаётся отдельным от добровольного отступления.`
- EN: `You no longer have the endurance to continue. The route has to end without the result that brought you here; this remains separate from a voluntary retreat.`

Return label:
- RU: `Вернуться и восстановиться`
- EN: `Return and recover`

Return text:
- RU: `Ты прекращаешь поиски и возвращаешься к обычному ходу дня, оставляя неудачный исход как есть.`
- EN: `You stop the search and return to the day's ordinary rhythm, accepting that this attempt ended without the answer you came for.`

The copy reflects the existing endurance-based terminal failure without exposing thresholds or changing failure policy.

## Localization keys changed

Exactly these 12 existing keys are refreshed:
- `event.forest-result-content-v1.success.title`;
- `event.forest-result-content-v1.success.variant.default.text`;
- `event.forest-result-content-v1.success.choice.return.label`;
- `event.forest-result-content-v1.success.choice.return.text`;
- `event.forest-result-content-v1.escape.title`;
- `event.forest-result-content-v1.escape.variant.default.text`;
- `event.forest-result-content-v1.escape.choice.return.label`;
- `event.forest-result-content-v1.escape.choice.return.text`;
- `event.forest-result-content-v1.failure.title`;
- `event.forest-result-content-v1.failure.variant.default.text`;
- `event.forest-result-content-v1.failure.choice.return.label`;
- `event.forest-result-content-v1.failure.choice.return.text`.

Existing media alt keys are unchanged because their current success/escape/failure semantics are already accurate.

## Verification performed

A structural comparison against baseline main removed only the presentation fields `title`, `text`, and `label` before comparing the pack.

Result:
- mechanics-equivalent: true;
- event IDs unchanged;
- exact ActivityResult triggers unchanged;
- conditions unchanged;
- variant IDs unchanged;
- choice IDs unchanged;
- choice effects remain empty;
- RU source text matches RU localization for all three events.

## Forest -> Lumber boundary

This bundle does not change the existing next-stage continuation:
`lumber-cross.activity-forest-return`.

Only the successful Activity result currently enters that Lumber continuation. Escape and failure remain distinct Forest result content without invented Lumber effects.

C3-06 owns the content-side return-hook audit/handoff.

## C3-05 disposition

The three terminal outcomes now have more natural and clearly differentiated player-facing RU/EN copy while preserving the exact current Activity mechanics and content identity contract.
