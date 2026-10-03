# Chat 4 — context transfer prompt — 2026-10-03

Ты — Chat 4 в проекте `Plegyer/Text`. У тебя закончился предыдущий контекст. Не пытайся восстанавливать его по памяти.

Git — единственный источник истины.

## Сначала восстанови состояние

Прочитай в таком порядке:

1. `mindy-successor/docs/tasks/CHAT4_RECOVERY_HANDOFF_2026-10-03.md`
2. `mindy-successor/docs/tasks/CURRENT_CHAT4_TASK_POINTER.md`
3. `mindy-successor/docs/USER_DECISIONS_LOCKED_v1.md`

Затем проверь свежий head своей рабочей ветки из pointer.

## Что уже закончено и не нужно переделывать

### Strong Meta runtime v7
Замороженный кандидат:
`chat4/strong-meta-runtime-producer-v7@6c3865aec1283055ab0713ca4b2873d379f3ddc6`

Не изменяй его. Leader отдельно занимается assembly/acceptance.

### Night completeness audit v8
Полностью завершён:
`chat4/night-system-completeness-audit-v8@63078afd37d4ef785043d443126e2be0061d559b`

Companion CSV:
`mindy-successor/research/night_system_coverage_v1.csv`
commit `9a5903526ed733dc1cdbf00d3ff53078b4872942`.

Leader принял v8 и зафиксировал **D37**.

Не повторяй Night audit.

## Текущая Product authority

D35:
- normal lodging = 100;
- cheap = 50;
- street = 0;
- normal даёт explicit private-space capability только для специально authored Night/relationship веток;
- cheap сохраняет School Night Study и public/workplace Night;
- Secret Debt forced Night всегда сильнее voluntary/private-space Night.

D37:
- каждая ordinary career для 1.0 должна иметь минимум:
  1. professional / non-romantic Night intent;
  2. distinct personal / relationship Night intent;
- одна branching scene может заменить две только при независимых player choices и разных consequences;
- romance никогда не обязателен;
- confidence/Lust/Sexuality не равны consent;
- Night-heavy careers должны иметь третий meaningful intent, а не filler;
- Secret Debt forced Night > Palace optional Night > ordinary voluntary Night;
- один завершённый global Night продвигает календарь ровно один раз.

## Твоя новая задача

Рабочая ветка:
`chat4/night-content-gap-blueprint-v9`

Задача:
сделать implementation-ready **Night Content Gap Blueprint v9**.

Создай:
1. `mindy-successor/docs/tasks/CHAT4_NIGHT_CONTENT_GAP_BLUEPRINT_v9.md`
2. `mindy-successor/research/night_content_gap_matrix_v1.csv`

Нужно точно спроектировать недостающие ordinary-career Night surfaces:

- Lumber — distinct personal/social continuation;
- Hunter — professional field/debrief Night;
- Hunter — optional Senior Guide/companion Night;
- Guard — professional report/case/debrief Night;
- Guard — optional Partner Night;
- Merchant — professional ledger/supplier-planning Night;
- Merchant — optional Supplier relationship Night;
- Assassin — optional handler/informant relationship Night;
- Prostitute — distinct optional personal/relationship continuation.

Отдельно обязательны D35 private-space seeds:
- Satyr Maid recurring-guest private-space branch;
- Tavern recurring-traveler private-space branch;
- Prostitute recurring-client/relationship private-space branch.

Для каждой surface зафиксируй:
- proposed stable event/choice ID;
- intent class;
- housing eligibility;
- normal-only private-space requirement, если нужен;
- relationship facts/counters;
- career facts/counters;
- optional School/Activity reflections;
- function of player choice, без финальной prose;
- exact effects;
- durable route facts;
- ending-route contribution;
- presentation slot;
- localization surface;
- save/reload boundary;
- refusal/back-out behavior;
- почему это не hidden progression gate.

Обязательные invariants:
- никакого forced romance;
- confidence/Lust/Sexuality никогда не заменяют consent;
- ordinary Prostitute не получает Secret Debt forced semantics;
- D35 private branches normal-only;
- cheap сохраняет School Night Study и public/workplace Night;
- forced Secret Debt Night подавляет voluntary Night;
- один global Night = один calendar advance;
- никакой новой broad affinity system;
- никаких filler +stat Night только ради квоты.

В конце дай producer queue:
1. content-only surfaces;
2. требующие relationship-state extension;
3. требующие private-space runtime support;
4. требующие Secret Debt/Palace/Activity runtime.

Не меняй production runtime/UI.
Не запускай full CI.

Заморозь exact SHA и сообщи:
`READY_FOR_LEADER_ACCEPTANCE`.

Если твоя ветка всё ещё на одном Leader dispatch commit — это нормально: начинай работу с него.
