# Forest Challenge Family Staging Matrix v2

Status: **STAGED AUTHORING MATRIX / NO NEW RUNTIME OR SCHEMA**.

This matrix maps the three authored Forest challenge families onto primitives already available on current `main`. It does not create production challenge IDs, thresholds, rewards, lore truths, or new mechanics.

Russian is source authoring language; English is the full second locale.

## Runtime boundary already available

Current `counter.v1` Activity options can already express:
- `conditions[]`;
- `progressDelta`;
- `enduranceCost`;
- optional `setRoute`.

Current condition primitives relevant to future Forest authoring include:
- `stat`;
- `itemCapability`;
- `worldFact`;
- `careerFact` / `careerStage` / `careerCounter`;
- `calendarSeason`;
- logical `all` / `any` / `not`.

Current generic event/result effects include:
- `modifyStat`;
- `modifyResource`;
- `modifyEnergy`;
- `addItem` / `removeItem`;
- `addWorldFact` / `removeWorldFact`;
- `addNextDayModifier`;
- typed career/quest/relationship counter/fact/transition effects.

Important boundary: an Activity option itself does **not** have an arbitrary `effects[]` array. Under the shipped adapter its direct numeric levers are `progressDelta` and `enduranceCost`. Any richer effect would need an already-supported event/result boundary or an explicitly authored integration design. This matrix does not choose one.

---

## Navigation family

Authoring family:
`forest/challenge/navigation`.

Safe semantic presentation namespace:
`activity/forest/challenge/navigation/*`.

These are presentation-only staging identities, not gameplay option IDs.

### Runtime-capable condition families

Possible, not selected:
- `stat(wits)`;
- `stat(reason)`;
- accepted `worldFact` representing route knowledge;
- accepted `itemCapability` representing navigation support;
- accepted Hunter-owned career fact/stage/counter if Product explicitly chooses that source;
- `calendarSeason` for a genuinely authored seasonal condition;
- `all` / `any` combinations of accepted conditions.

Open:
- exact stat;
- threshold;
- fact/capability ID;
- provider/source;
- whether season changes mechanics or presentation only;
- exact `progressDelta`;
- exact `enduranceCost`;
- reward/result fact.

### RU+EN prose candidates

| Scene key | Safe presentation ID | RU source | EN |
| --- | --- | --- | --- |
| `forest/challenge/navigation/split-trail` | `activity/forest/challenge/navigation/split-trail` | Тропа расходится вокруг молодого подлеска. Слева — старые следы и мягкая земля, справа — более твёрдая почва и путь, который, кажется, не теряет высоту. | The route divides around young growth. To the left are older tracks and softer ground; to the right the footing is firmer and the line appears to keep elevation. |
| `forest/challenge/navigation/lost-horizon` | `activity/forest/challenge/navigation/lost-horizon` | Кроны закрывают дальний обзор. Ориентироваться приходится по уклону, ветру, мху, шуму воды и памяти о предыдущих поворотах. | The canopy blocks the long view. Navigation has to rely on slope, wind, moss, water sound, and memory of earlier turns. |
| `forest/challenge/navigation/crossed-tracks` | `activity/forest/challenge/navigation/crossed-tracks` | Свежие следы пересекают текущий путь. Они могут принадлежать рабочим, охотникам, зверям или самой героине. | Fresh tracks cross the current path. They may belong to workers, hunters, animals, or the heroine herself. |
| `forest/challenge/navigation/washed-markers` | `activity/forest/challenge/navigation/washed-markers` | Дождь и сток смыли самые заметные следы. Остались ветки, сдвинутые камни, царапина на коре и утрамбованная грязь. | Rain and runoff erased the clearest signs. Twigs, disturbed stones, a bark scrape, and compacted mud remain. |
| `forest/challenge/navigation/ridge-choice` | `activity/forest/challenge/navigation/ridge-choice` | Один путь поднимается на гребень и обещает лучший обзор. Другой остаётся ниже и выглядит короче. | One path climbs toward a ridge and promises a better view. The other stays lower and looks shorter. |

Authored approach-label pairs remain:
- `read-ground` — Читать следы на земле / Read the ground;
- `climb-for-view` — Подняться выше ради обзора / Climb for a better view;
- `follow-water` — Ориентироваться по воде / Follow the water;
- `trust-marked-route` — Довериться отмеченному пути / Trust the marked route;
- `use-trail-knowledge` — Использовать знание этой тропы / Use what you know about the trail.

No approach label creates its own condition.

---

## Physical obstacle family

Authoring family:
`forest/challenge/physical`.

Safe semantic presentation namespace:
`activity/forest/challenge/physical/*`.

### Runtime-capable condition families

Possible, not selected:
- `stat(strength)`;
- `stat(endurance)`;
- `stat(dexterity)`;
- accepted `itemCapability` such as an already-defined rough-route or wood-cutting capability;
- `calendarSeason` only if Product decides season genuinely changes the mechanical option;
- `all` / `any` combinations.

Current Activity-option numeric levers available:
- `progressDelta`;
- `enduranceCost`.

Open:
- which stat/capability each scene uses;
- threshold;
- whether an item/capability is merely required or also consumed elsewhere;
- exact progress/endurance values;
- any reward;
- any injury/stat consequence;
- whether detour costs time/energy.

### RU+EN prose candidates

| Scene key | Safe presentation ID | RU source | EN |
| --- | --- | --- | --- |
| `forest/challenge/physical/fallen-trunk` | `activity/forest/challenge/physical/fallen-trunk` | Большой ствол лёг поперёк пути под неудобным углом. | A large trunk lies across the route at an awkward angle. |
| `forest/challenge/physical/washed-bank` | `activity/forest/challenge/physical/washed-bank` | Часть тропы обвалилась в неглубокий овраг. Противоположный край достижим, но прямого пути больше нет. | Part of the path collapsed into a shallow ravine. The opposite edge is reachable, but the direct path is gone. |
| `forest/challenge/physical/deadfall` | `activity/forest/challenge/physical/deadfall` | Сломанные ветви и поваленные стволы образовали плотный завал. | Broken branches and fallen trunks have formed a dense barrier. |
| `forest/challenge/physical/slick-stones` | `activity/forest/challenge/physical/slick-stones` | Ручей неглубокий, но камни под ногами ненадёжны. Проблема не в глубине воды, а в опоре. | The stream is shallow, but the stones underfoot are unreliable. The problem is footing, not depth. |
| `forest/challenge/physical/root-slope` | `activity/forest/challenge/physical/root-slope` | Крутой склон весь прошит обнажившимися корнями. Одни выдержат вес, другие — нет. | A steep slope is threaded with exposed roots. Some will hold weight and some will not. |

Authored approach-label pairs remain:
- `climb-carefully` — Осторожно перелезть / Climb carefully;
- `clear-way` — Расчистить путь / Clear a way;
- `use-rope` — Использовать верёвку / Use the rope;
- `long-detour` — Пойти длинным обходом / Take the longer detour;
- `test-footholds` — Проверять каждую опору / Test each foothold.

No label implies item consumption.

---

## Interpretation / ritual anomaly family

Authoring family:
`forest/challenge/anomaly`.

Safe semantic presentation namespace:
`activity/forest/challenge/anomaly/*`.

### Runtime-capable condition families

Possible, not selected:
- `stat(reason)`;
- `stat(magic)`;
- accepted School Arcana public `worldFact`;
- accepted `itemCapability` for specimen preservation or another approved tool;
- `calendarSeason` if the anomaly itself has an authored seasonal mechanical condition;
- logical combinations.

Possible generic effects exist in runtime, but none is selected:
- `addWorldFact`;
- `addItem`;
- `modifyStat`;
- `modifyEnergy`;
- typed progression effects.

Open:
- exact School Arcana fact ID/provider/threshold;
- exact capability ID/provider;
- whether a sample exists at all;
- sample item identity;
- lore truth;
- reward;
- exact challenge threshold;
- exact progress/endurance values;
- whether disturbing/leaving the anomaly has persistent consequences.

### RU+EN prose candidates

| Scene key | Safe presentation ID | RU source | EN |
| --- | --- | --- | --- |
| `forest/challenge/anomaly/knot-marks` | `activity/forest/challenge/anomaly/knot-marks` | Тонкие ветви связаны в повторяющиеся узлы. Для случайного повреждения рисунок слишком аккуратен. | Thin branches have been tied into repeating knots. The pattern is too deliberate to be random damage. |
| `forest/challenge/anomaly/stone-ring` | `activity/forest/challenge/anomaly/stone-ring` | Кольцо камней лежит там, где корни давно должны были его раздвинуть. | A ring of stones sits where roots should have disturbed it years ago. |
| `forest/challenge/anomaly/altered-sap` | `activity/forest/challenge/anomaly/altered-sap` | Из повреждённого дерева выступает смола с необычным блеском. | A damaged tree leaks sap with an unusual sheen. |
| `forest/challenge/anomaly/source-less-sound` | `activity/forest/challenge/anomaly/source-less-sound` | Между деревьями повторяется низкий звук. Ритм слишком ровный, чтобы легко списать его на случайность. | A low sound repeats through the trees. Its rhythm is too regular to dismiss easily as random. |
| `forest/challenge/anomaly/old-symbols` | `activity/forest/challenge/anomaly/old-symbols` | Мох скрывает вырезанные знаки на камне или коре. Даже без понимания смысла видно, что они расположены не случайно. | Moss hides carved symbols on stone or bark. Even without understanding them, it is clear they are deliberate. |

Authored approach-label pairs remain:
- `study-pattern` — Изучить рисунок / Study the pattern;
- `compare-marks` — Сравнить знаки / Compare the marks;
- `preserve-sample` — Сохранить образец / Preserve a sample;
- `use-arcana` — Применить знания Арканы / Use Arcana knowledge;
- `leave-undisturbed` — Оставить всё как есть / Leave it undisturbed.

## Safe presentation work that can ship before mechanics

For all three families, the following is safe once bound beneath an already-authoritative Forest route:
- RU+EN prose;
- locale-neutral semantic presentation IDs;
- shared static/GIF presentation candidates;
- RU+EN alt/caption;
- presentation-only seasonal appearance.

This does not authorize a gameplay challenge option by itself.

## Product-open matrix

| Decision | Navigation | Physical | Anomaly |
| --- | --- | --- | --- |
| final gameplay challenge ID | OPEN | OPEN | OPEN |
| exact condition | OPEN | OPEN | OPEN |
| threshold | OPEN | OPEN | OPEN |
| exact progressDelta/enduranceCost | OPEN | OPEN | OPEN |
| route binding | OPEN | OPEN | OPEN |
| reward | OPEN | OPEN | OPEN |
| item consume semantics | n/a unless Product selects item | OPEN if item involved | OPEN if sample/tool involved |
| lore truth | presentation-only until decided | n/a | OPEN |
| School/public fact source | possible, not selected | n/a | OPEN |

## Locked firewalls

Do not:
- convert these semantic presentation IDs into gameplay IDs without an accepted authoring decision;
- infer Hunter ownership;
- infer Old Boundary Token consumption;
- invent School Arcana fact IDs;
- invent thresholds/rewards;
- change Lumber Hard Work;
- change exact Forest `activityResult` identities.

The matrix is an integration-ready authoring guide for existing runtime primitives, not a production mechanics patch.
