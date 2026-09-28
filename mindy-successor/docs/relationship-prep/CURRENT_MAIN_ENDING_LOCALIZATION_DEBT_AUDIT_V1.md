# Current-Main Ending Localization Debt Audit v1

Date: 2026-09-28
Owner: Chat 5
Exact current-main baseline: `52ddc76148e33836d3161b63bf4c25ffb5c39d02` (post-PR58)

## Exact current endings

| Ending ID | Current source title | Current source description | Root `ending.*` title | Root `ending.*` description |
|---|---|---|---|---|
| `guild-life` | Своя в артели | Пять практик, практичность 6 и выполненный заказ. Наследие: ночлег за половину цены и практичность +5 на старте. | MISSING | MISSING |
| `scholar-life` | Дипломированная алхимичка | Сдать экзамен. Наследие: смекалка +5 на старте и один бесплатный урок каждую неделю. | MISSING | MISSING |
| `tavern-stay` | Хозяйка третьего тоста | 18 смен в таверне. Наследие: обаяние +5 в следующей жизни. | MISSING | MISSING |
| `tavern-guild` | Праздник без разрешения | Защитить самостоятельность городского праздника. Наследие: чуткость +5. | MISSING | MISSING |
| `tavern-court` | Приглашение под печатью | Передать накладную принцу. Наследие: дерзость +5. | MISSING | MISSING |
| `lumber-stay` | Бригадир поневоле | 24 смены у лесорубов. В следующей жизни дневной запас энергии +1. | MISSING | MISSING |
| `ending.lumber.hard-work` | Lumber Hard Work | Persistence ending fixture: exactly fifty completed Lumber shifts. | MISSING | MISSING |
| `ending.lumber.forewoman` | Lumber Forewoman fixture | Cross-system fixture ending using the professional Foreman route and School-result career facts. | MISSING | MISSING |
| `ending.lumber.forest` | Lumber Forest fixture | Cross-system fixture ending after a qualifying Forest Activity result and Lumber continuation. | MISSING | MISSING |

## Consumer status

Current Legacy panel renders ending title/description directly from catalog source:

- `e.title`
- `e.description`

No `tr('ending.<id>.title', ...)` or `tr('ending.<id>.description', ...)` consumer exists on current main.

Current inactive-run end-state screen does **not** display the accepted ending title/description. It shows:
- generic localized heading `ui.run.endingAccepted` / `ui.run.timeExpired`;
- the last journal line;
- `presentationIdForEnding(acceptedEnding)` for media.

Therefore item-136 localization keys need Legacy-panel wiring; end-state title/description has no direct current consumer.

## Exact current scope

Current ending IDs: **9**.

No additional ending ID is invented by this wave.

## Content quality debt

Six legacy endings already have Russian player-facing titles/descriptions.

Three Lumber cross-system fixture endings still expose English fixture-oriented source copy:
- `ending.lumber.hard-work`
- `ending.lumber.forewoman`
- `ending.lumber.forest`

Item 134 provides polished RU source for all exact current ending IDs while preserving their current semantic claims.

## Localization debt

At this baseline:
- localized ending title keys: 0/9
- localized ending description keys: 0/9
- localized epilogue keys: not part of this queue
- Legacy panel ending-title/description consumer: shared UI wiring required

## Invariants

Do not change:
- ending IDs;
- condition arrays;
- reward IDs;
- metaRewards;
- eligibility;
- ending acceptance;
- epilogues;
- presentation IDs;
- Save;
- RNG.
