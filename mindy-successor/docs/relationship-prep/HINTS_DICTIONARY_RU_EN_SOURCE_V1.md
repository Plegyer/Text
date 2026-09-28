# Hints Dictionary RU+EN Source v1

Date: 2026-09-28
Status: PRESENTATION_ONLY
Baseline main: `3fc5495310e281cf5cbe52da3642000f1cb1fb05`
Current source: `src/ui/labels.ts` → `hints`

## Current player-facing stat hints

The creation and Stats screens iterate the current target `stats` array, so the 12 hints below are normal-player-facing today.

### `stat.strength.hint`
RU: Грубая физическая сила.  
EN: Raw physical strength.

### `stat.endurance.hint`
RU: Перенос нагрузки и тяжёлых условий. Не равна дневной Energy.  
EN: Tolerance for exertion and harsh conditions. Not the same as daytime Energy.

### `stat.dexterity.hint`
RU: Координация, точность и скрытные физические действия.  
EN: Coordination, precision, and stealthy physical actions.

### `stat.reason.hint`
RU: Учёба, теория, память и анализ.  
EN: Study, theory, memory, and analysis.

### `stat.magic.hint`
RU: Чувствительность и практика взаимодействия с магией.  
EN: Sensitivity to and practice with magic.

### `stat.creativity.hint`
RU: Искусство, создание нового и выразительные решения.  
EN: Art, creating new things, and expressive solutions.

### `stat.wits.hint`
RU: Практическая хитрость, импровизация и обход препятствий.  
EN: Practical cleverness, improvisation, and finding ways around obstacles.

### `stat.charm.hint`
RU: Личное влияние и привлекательность общения.  
EN: Personal influence and social appeal.

### `stat.sociability.hint`
RU: Неформальные связи, группы и поддержание контактов.  
EN: Informal connections, groups, and maintaining contacts.

### `stat.manners.hint`
RU: Этикет, статусное поведение и формальная социальная дисциплина.  
EN: Etiquette, status behavior, and formal social discipline.

### `stat.grooming.hint`
RU: Уход за собой и профессиональная презентация; может быстро расти и падать.  
EN: Self-care and professional presentation; it can rise and fall quickly.

### `stat.sexuality.hint`
RU: Телесная уверенность и профессиональная сексуальная подача.  
EN: Bodily confidence and professional sexual presentation.

## Legacy-only hint present in source

`hints.lust` exists in `labels.ts`, but the current target creation/Stats surfaces do not iterate `lust`.

Source RU:
`Положительная content-axis: интерес к близости; открывает варианты, но не выбирает ответ за героиню.`

Because it is not part of the current player-facing target-stat loop, this item does not require a production `stat.lust.hint` key. If a future normal-player surface exposes this legacy metric, it should receive a dedicated reviewed key then.

## Consumer recommendation

For current target stats:

`tr(`stat.${stat}.hint`, hints[stat] ?? '')`

Do not put localized hint prose into Save or stat identity.

## Boundary

Text/tooltips only. No stat IDs, stat values, allocation mechanics, conditions, effects, Energy semantics or Save changes.
