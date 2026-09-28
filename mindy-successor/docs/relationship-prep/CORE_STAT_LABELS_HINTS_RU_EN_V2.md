# Core Stat Labels / Hints RU+EN v2

Date: 2026-09-28
Status: PRESENTATION_ONLY
Baseline main: `295e6fc74d235f0b7555794555a18373451e8b7e`

Current target stats:
- strength
- endurance
- dexterity
- reason
- magic
- creativity
- wits
- charm
- sociability
- manners
- grooming
- sexuality

## Existing stat-label keys to reuse

The following current root keys already have approved RU+EN and must be reused:
- `stat.strength.label` — Сила / Strength
- `stat.endurance.label` — Выносливость / Endurance
- `stat.dexterity.label` — Ловкость / Dexterity
- `stat.reason.label` — Разум / Reason
- `stat.magic.label` — Магия / Magic
- `stat.creativity.label` — Творчество / Creativity
- `stat.wits.label` — Смекалка / Wits
- `stat.charm.label` — Обаяние / Charm
- `stat.sociability.label` — Общительность / Sociability
- `stat.manners.label` — Манеры / Manners
- `stat.grooming.label` — Ухоженность / Grooming
- `stat.sexuality.label` — Сексуальность / Sexuality

## Missing hint keys

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

## Legacy-only note

The hardcoded `hints.lust` entry is not part of the current target `stats` array used by creation/Stats UI. It remains legacy fallback and is excluded from this core-stat production source.

## Boundary

Presentation only. No stat IDs, values, allocation rules, School stat mechanics, conditions, effects, Save or RNG changes.
