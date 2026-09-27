# Global UI Shell Consumer Map v1

Date: 2026-09-27
Owner: Chat 5
Current consumer: \`src/ui/app.ts\`
Current app blob: \`312399d01b211f13c29017c1e17b61f2027d21b3\`
Fixture: \`content/global-ui-shell-localization-v1.fixture.json\`

No code changes are made by this map.

| Localization key | Exact current fallback / source string | Current consumer seam | Wiring status |
|---|---|---|---|
| \`ui.explore.title\` | \`Окрестности и поручения\` | \`panel==='explore'\` heading, line ~179 | NEEDS_TR |
| \`ui.explore.activityHelp\` | \`Отдельная Activity · checkpoint save/reload\` | \`activityEntryList()\` article body, line ~112 | NEEDS_TR |
| \`ui.explore.entryEnergy\` | \`\${entryEnergyCost} энергии на вход\` | \`activityEntryList()\` cost line, line ~112 | NEEDS_FMT_TR |
| \`ui.explore.enterButton\` | \`Войти\` | \`activityEntryList()\` enter button, line ~112 | NEEDS_TR |
| \`ui.explore.errandsSummary\` | \`Обычные поручения\` | Explore \`<details><summary>\`, line ~179 | NEEDS_TR |
| \`ui.sleep.title\` | \`Ночь\` | \`panel==='sleep'\` heading, line ~180 | NEEDS_TR |
| \`ui.sleep.help\` | \`NightFlow отдельно фиксирует lodging, voluntary choice и следующий день.\` | Sleep panel paragraph, line ~180 | NEEDS_TR |
| \`ui.sleep.startButton\` | \`Начать NightFlow\` | Sleep panel \`data-end-day\` button, line ~180 | NEEDS_TR |
| \`ui.panel.stats\` | \`Героиня\` | \`panel==='stats'\` heading, line ~181 | ROOT_KEY_EXISTS / PANEL_NEEDS_TR |
| \`ui.stats.help\` | none | Stats panel, immediately after heading before \`.character-stats\`, line ~181 | NEW_OPTIONAL_SHELL_COPY |
| \`ui.stats.professionsTitle\` | \`Профессии\` | Stats panel professions heading, line ~181 | NEEDS_TR |
| \`ui.stats.professionsHelp\` | none | Stats panel before current profession-count paragraph, line ~181 | NEW_OPTIONAL_SHELL_COPY |
| \`ui.panel.journal\` | \`Дневник\` | \`panel==='journal'\` heading, line ~182 | ROOT_KEY_EXISTS / PANEL_NEEDS_TR |
| \`ui.journal.empty\` | none | Journal panel when \`run.journal.length===0\`, line ~182 | NEW_OPTIONAL_EMPTY_STATE |
| \`ui.bag.title\` | \`Сумка и дела\` | \`panel==='bag'\` heading, line ~183 | NEEDS_TR |
| \`ui.bag.debtLabel\` | \`Долг:\` | Bag panel debt paragraph, line ~183 | NEEDS_TR |
| \`ui.bag.empty\` | none | Bag panel when inventory has no visible entries, line ~183 | NEW_OPTIONAL_EMPTY_STATE |
| \`ui.panel.legacy\` | \`Судьбы\` | \`panel==='legacy'\` heading, line ~184 | ROOT_KEY_EXISTS / PANEL_NEEDS_TR |
| \`ui.legacy.help\` | \`Достижение судьбы не завершает жизнь. Принятие выдаёт её наследие.\` | Legacy panel intro paragraph, line ~184 | NEEDS_TR |
| \`ui.legacy.acceptButton\` | \`Принять судьбу\` | each \`data-ending\` button, line ~184 | NEEDS_TR |
| \`ui.legacy.inheritanceTitle\` | \`Наследие\` | Legacy panel secondary heading, line ~184 | NEEDS_TR |
| \`ui.legacy.emptyInheritance\` | \`Ещё впереди\` | empty \`meta.unlocks\` fallback, line ~184 | NEEDS_TR |
| \`ui.legacy.nextLifeButton\` | \`Следующая жизнь\` | \`#new-life\` button when run inactive, line ~184 | NEEDS_TR |
| \`ui.town.eyebrow\` | \`По ту сторону люка\` | pre-arrival stage eyebrow, line ~150 | ROOT_KEY_EXISTS / PRE_ARRIVAL_NEEDS_TR |
| \`ui.arrival.title\` | \`Следуйте за сусликом\` | pre-arrival stage title, line ~150 | NEEDS_TR |
| \`ui.arrival.body\` | \`Обычный день. Белый суслик. Люк, который кто-то забыл закрыть.\` | pre-arrival dialogue body, line ~150 | NEEDS_TR |
| \`ui.arrival.button\` | \`Пойти за ним\` | pre-arrival \`data-action="arrival"\` button, line ~150 | NEEDS_TR |
| \`ui.generic.selectButton\` | \`Выбрать\` | ordinary non-profession action branch in \`actionList()\`, line ~96 | NEEDS_TR |
| \`ui.generic.closeButton\` | \`Закрыть\` | overlay close button aria-label, line ~192 | NEEDS_TR |
| \`ui.generic.dismissButton\` | \`Закрыть уведомление\` | toast dismiss aria-label, line ~192 | NEEDS_TR |
| \`ui.result.chooseLodging\` | \`Выбрать ночлег\` | zero-Energy result shortcut, line ~172 | NEEDS_TR |
| \`ui.work.recipeReliable\` | \`Надёжно\` | \`mode==='brew'\`, \`recipe='gentle'\`, line ~96 | NEEDS_TR |
| \`ui.work.recipeFast\` | \`Быстро\` | \`mode==='brew'\`, \`recipe='bold'\`, line ~96 | NEEDS_TR |
| \`ui.result.returnTown\` | fallback \`Вернуться в город\` | result \`#to-town\` button, line ~172 | ALREADY_WIRED_CURRENT |

## Exact wiring pattern

For direct strings, preserve current fallback behavior:

\`tr('<key>','<current fallback>')\`

For the entry-Energy sentence use:

\`fmt(tr('ui.explore.entryEnergy','Энергия на вход: {energy}'),{energy:activity.entryEnergyCost})\`

The authored RU wording intentionally improves the current mixed implementation phrase. Lead may use the old current string as fallback during the code patch or update the fallback to the approved RU source in the same selective integration.

## New optional copy

Four item-94 keys do not replace an existing hardcoded string:
- \`ui.stats.help\`
- \`ui.stats.professionsHelp\`
- \`ui.journal.empty\`
- \`ui.bag.empty\`

They have exact existing structural seams listed above but require insertion rather than replacement. They are presentation-only and can be omitted by Lead without blocking localization of the currently visible hardcoded strings.

## Already-existing root keys

The fixture intentionally carries these exact-identical root keys so the selective integration contract is self-contained:
- \`ui.panel.stats\`
- \`ui.panel.journal\`
- \`ui.panel.legacy\`
- \`ui.town.eyebrow\`
- \`ui.result.returnTown\`

Do not create duplicate semantic keys for those current strings.

## Invariants

Wiring must not alter command IDs, action IDs, panel IDs, Activity IDs, NightFlow, ending acceptance, Save, RNG, effects or eligibility.
