# Forest Hunter Trail Product-Open Staging v3

Status: **PRODUCT_OPEN / AUTHORING_READY / NOT A PRODUCTION ROUTE DEFINITION**.

This packet consolidates existing Hunter-trail authored material without selecting the gameplay identity, gate, provider, threshold, reward, or route-state semantics that Product has not decided.

Russian remains the source authoring language; English is the full second locale.

## Route concept

The Hunter-trail concept is a narrow forest path that is readable through subtle evidence rather than through an obvious engineered road.

Existing authored motifs:
- overlapping animal and human tracks;
- rubbed bark and deliberate marks;
- autumn migration crossings;
- a quiet observation rise;
- a route that is useful to someone who knows what counts as a sign.

The concept supports route-reading, knowledge, and observation. It does **not** establish who teaches the route, what unlocks it, or what reward follows it.

## Authored bilingual scene bank

### Tracks beside tracks

Authoring key:
`forest/route/hunter-trail/tracks`

RU:

Узкая тропа пересекает звериные следы, старые отпечатки сапог и участки, где кто-то нарочно ступал по камням вместо мягкой земли. Путь можно прочитать, но нельзя назвать очевидным.

Короткая реплика:

> Тот, кто знал этот лес, хотел сохранить тропу полезной, но не заметной.

EN:

A narrow trail crosses animal prints, old boot marks, and places where somebody deliberately stepped on stone instead of soft ground. The route can be read, but it is not obvious.

Short line:

> Someone who knew the forest wanted this path to remain useful without becoming easy to find.

### Rubbed bark

Authoring key:
`forest/route/hunter-trail/bark-marks`

RU:

На высоте плеч кора на нескольких деревьях отполирована с одной стороны. Часть следов оставили звери. Часть выглядит намеренной. Разница имеет значение только тогда, когда у героини уже есть авторитетно определённая подсказка или способность, открывающая этот маршрут.

EN:

At shoulder height, bark has been rubbed smooth on one side of several trees. Some marks are animal. Some look deliberate. The difference matters only when the heroine already has an authoritative clue or capability that makes this route available.

### Migration crossing

Authoring key:
`forest/route/hunter-trail/migration-crossing`

RU:

Тропа выходит к месту, где сходятся сразу несколько звериных путей. Земля истоптана в разных направлениях, и один след поверх другого превращает привычное чтение маршрута в задачу. Осенний контекст миграции усиливает сцену, но сам по себе не создаёт механику маршрута.

EN:

The trail approaches a place where several animal paths converge. The ground is disturbed in many directions, and overlapping tracks turn ordinary route-reading into a problem. Autumn migration strengthens the scene, but does not create route mechanics by itself.

### Quiet observation point

Authoring key:
`forest/route/hunter-trail/observation-point`

RU:

Небольшой подъём даёт хороший обзор между стволами, не выставляя наблюдателя напоказ. Здесь нет явной постройки — только примятая земля там, где кто-то проводил достаточно времени, чтобы оставить привычку в самом рельефе.

EN:

A small rise gives a clear view through the trunks without exposing the observer. There is no obvious structure—only flattened ground where somebody spent enough time to leave a habit in the terrain itself.

### Route reaction

Authoring key:
`forest/route/hunter-trail/reaction`

RU:
«Тропа существует, но ждёт от путника знания того, что здесь считается знаком».

EN:
“The path exists, but it expects the traveler to know what counts as a sign.”

## Possible condition families — not selected

Current runtime can already express several broad condition families that *could* support a future Hunter-trail gate. This packet does not choose among them.

| Possible family | Current primitive family | Product question still required |
| --- | --- | --- |
| public knowledge | `worldFact` | Which accepted fact, who provides it, and when? |
| inventory-derived capability | `itemCapability` | Which accepted capability, which provider item, and retain/consume semantics? |
| Hunter career knowledge | `careerFact` / `careerStage` / `careerCounter` | Is Hunter career progress actually intended to unlock the route, and at what accepted stage/fact/threshold? |
| direct character skill | `stat` | Is a raw stat gate intended, which stat, and what threshold? |
| combined authored gate | `all` / `any` over accepted conditions | Should multiple accepted sources satisfy or jointly gate access? |

These are implementation-capable families only. None is canonical until Product selects it.

Do not turn the phrase “Hunter trail” into an assumption that the ordinary Hunter career must own the route.

## Possible presentation identities — not gameplay IDs

Presentation-only staging may safely reserve conceptual names such as:

- `activity/forest/route/hunter-trail`;
- `activity/forest/route/hunter-trail/tracks`;
- `activity/forest/route/hunter-trail/bark-marks`;
- `activity/forest/route/hunter-trail/migration-crossing`;
- `activity/forest/route/hunter-trail/observation-point`.

These are **possible semantic presentation identities only**. They do not create:
- a production Activity option;
- a route-state ID;
- a save-state field;
- a gate;
- a reward.

A future production route may reuse these presentation names if Lead/Product confirms the binding.

## Media staging

The existing bilingual multi-GIF authoring map already supports the concept with 3–5 shared candidate types:
- overlapping tracks;
- bark marks;
- migration crossing;
- observation rise;
- weathered signs.

Required media behavior:
- candidate keys locale-neutral;
- same file in RU and EN;
- RU+EN alt/caption;
- media selection presentation-only;
- static fallback valid;
- no candidate controls access, success, failure, loot, or reward.

No actual Hunter GIF is claimed shipped by this packet.

## Seasonal use

Safe today:
- show seasonal *presentation* differences after the route is already authoritatively available;
- use autumn migration imagery/prose for the migration-crossing scene;
- use rain/snow to change track readability in prose.

Not safe without Product:
- season itself unlocking the route;
- season changing the gate source;
- a winter/summer route option ID created solely from prose;
- a seasonal reward or threshold inferred from atmosphere.

## Exact Product decisions still required

Before Hunter trail can become a production route, Product must explicitly decide:

1. canonical production Activity option ID;
2. canonical route-state identity, if distinct state is required;
3. whether access is knowledge-, capability-, career-, stat-, or compound-gated;
4. exact clue/public-fact identity if a public fact is used;
5. exact capability identity if a capability is used;
6. provider/source for the accepted fact/capability;
7. whether an item is involved at all;
8. any retain/consume/turn-in semantics if an item is involved;
9. exact threshold if a stat/counter/stage gate is used;
10. whether multiple providers/gates are alternatives or requirements;
11. exact route reward, if any;
12. exact challenge/reaction effects, if any;
13. whether autumn migration has mechanical significance or presentation significance only.

## Explicit non-decisions

This packet does **not** choose:
- `forest.route.hunter-trail` as a production ID;
- any Hunter clue fact ID;
- any Hunter navigation capability ID;
- the ordinary Hunter career as provider;
- a relationship/provider NPC;
- a School result;
- a stat;
- a threshold;
- a reward;
- loot;
- a route-state value;
- season as a gate.

## Existing Forest firewalls

Unchanged:
- Lumber Hard Work eligibility is ONLY `completed_shifts >= 50`;
- exact reward is `hardWork:lumber`;
- Forest success continuation remains exact `activityResult(lumber.forest, success, lumber.forest.success)`;
- Old Boundary Token semantics remain separate and unresolved;
- Hunter authoring must not be used to infer Old Boundary semantics.

## Production disposition

Content:
**READY AS RU+EN AUTHORING**.

Presentation concept:
**READY AS STAGING**.

Gameplay route activation:
**PRODUCT_OPEN / NOT READY**.

The next valid production change is a Product decision packet or an explicitly approved route binding—not another guessed implementation.
