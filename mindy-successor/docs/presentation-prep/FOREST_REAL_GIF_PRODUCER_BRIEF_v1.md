# Forest Real-GIF Producer Brief v1

Status: **PRODUCER-READY REQUEST / CURRENT-MAIN FOREST ONLY**

Current real GIF inventory: **0**.

Scope:
- shipped Forest Activity return identities;
- PR43 bilingual Forest reaction identities.

Explicitly excluded:
- Hunter trail semantics;
- Old Boundary route semantics;
- any Product-blocked route/challenge identity.

Current static fallback for all listed targets is:

`assets/stage-forest.svg`

## Reuse model

Produce **9 unique GIFs**:
- 3 for success;
- 3 for escape;
- 3 for failure.

Each outcome trio may be reused across the matching Activity-return identity and matching PR43 reaction identity because the gameplay outcome is already fixed before presentation selection.

This yields six complete 3-candidate pools from nine files without allowing media selection to choose the outcome.

## Success trio

Target semantic IDs:
- `activity/forest/return/success`;
- `job/lumber/event/forest-result-content-v1-success/default`.

| Target filename | Candidate key | Loop brief — EN / RU | Acceptance boundary |
| --- | --- | --- | --- |
| `assets/gif/forest/result-success-01.gif` | `forest-result-success-01` | Calm successful-return loop: emerge from the forest path with composed posture and neutral carried supplies; reset before any reward handoff. / Спокойный цикл успешного возвращения: выйти с лесной тропы собранно, с нейтральными припасами; возврат до любой передачи награды. | May communicate completed return, but not money/stat/meta reward. |
| `assets/gif/forest/result-success-02.gif` | `forest-result-success-02` | Route-complete pause: stop at the forest edge, briefly check a neutral route marker or pack, reset. / Пауза после завершённого маршрута: остановиться у кромки леса, коротко проверить нейтральный ориентир или сумку и вернуться. | No Old Boundary marker, Hunter cue, item unlock, or named route. |
| `assets/gif/forest/result-success-03.gif` | `forest-result-success-03` | Safe return composure loop: small exhale/stretch at forest edge, then neutral ready pose. / Цикл спокойного возвращения: короткий выдох или разминка у кромки леса, затем нейтральная готовая поза. | No celebration that implies a specific reward or ending. |

## Escape trio

Target semantic IDs:
- `activity/forest/return/escape`;
- `job/lumber/event/forest-result-content-v1-escape/default`.

| Target filename | Candidate key | Loop brief — EN / RU | Acceptance boundary |
| --- | --- | --- | --- |
| `assets/gif/forest/result-escape-01.gif` | `forest-result-escape-01` | Controlled retreat loop: back away from a forest path, glance behind, settle at the edge. / Цикл контролируемого отступления: отойти от лесной тропы, оглянуться и остановиться у кромки. | Must read as voluntary retreat, not failure or pursuit defeat. |
| `assets/gif/forest/result-escape-02.gif` | `forest-result-escape-02` | Route-abandon loop: fold/put away a neutral route aid, turn toward town, reset. / Цикл отказа от маршрута: убрать нейтральный ориентир или средство навигации, повернуться к городу и вернуться. | No named map, Old Boundary token, or route-specific item. |
| `assets/gif/forest/result-escape-03.gif` | `forest-result-escape-03` | Safe regroup loop: brief check of gear after retreat, then steady neutral stance. / Цикл безопасной перегруппировки: коротко проверить снаряжение после отступления и принять устойчивую нейтральную позу. | No injury, reward, success conversion, or failure cue. |

## Failure trio

Target semantic IDs:
- `activity/forest/return/failure`;
- `job/lumber/event/forest-result-content-v1-failure/default`.

| Target filename | Candidate key | Loop brief — EN / RU | Acceptance boundary |
| --- | --- | --- | --- |
| `assets/gif/forest/result-failure-01.gif` | `forest-result-failure-01` | Unsuccessful-return loop: tired but safe return to forest edge, pause, reset. / Цикл неудачного возвращения: устало, но безопасно вернуться к кромке леса, остановиться и зациклить. | May communicate failure mood, but no exact penalty or injury. |
| `assets/gif/forest/result-failure-02.gif` | `forest-result-failure-02` | Failed-route reset: lower or put away neutral field gear, then neutral return posture. / Цикл сброса после провала маршрута: опустить или убрать нейтральное полевое снаряжение, затем вернуться в нейтральную позу. | No escape/success ambiguity and no mechanical loss display. |
| `assets/gif/forest/result-failure-03.gif` | `forest-result-failure-03` | Recovery pause loop: steady breathing or short seated/standing recovery at forest edge, reset. / Цикл паузы на восстановление: ровное дыхание или короткая передышка у кромки леса, затем возврат. | No medical state, stat number, defeat animation, or forced gameplay duration. |

## RU + EN invariant

The same GIF files are shared by RU and EN.

No baked-in:
- route text;
- Russian/English labels;
- result numbers;
- rewards;
- item names;
- mechanics.

PR43 already has RU+EN static/reaction alt localization for:
- `media.forest-result-content-v1.success.alt`;
- `media.forest-result-content-v1.escape.alt`;
- `media.forest-result-content-v1.failure.alt`.

New GIF candidates still require their own RU+EN alt keys at integration time.

## Production acceptance

For each outcome pair, production activation requires:
1. all three matching real GIF blobs;
2. signature/path preflight green;
3. stable locale-neutral keys;
4. RU+EN candidate alt keys;
5. static `assets/stage-forest.svg` retained;
6. semantic IDs present on current main;
7. animation-off stays static;
8. locale switch keeps the same candidate;
9. media choice cannot change `success`, `escape`, or `failure`.

No requested filename is considered shipped before the real repository blob exists.
