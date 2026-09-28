# Condition Explanation Templates RU+EN v2

Date: 2026-09-28
Status: PRESENTATION_ONLY
Baseline main: `3fc5495310e281cf5cbe52da3642000f1cb1fb05`
Consumer: `src/ui/app.ts` → `explain(c: Condition)`

## Rule

The `Condition` object remains authoritative. Localization changes only the human-readable presentation around stable IDs, values and comparison operators.

Every current condition kind handled by `explain(c)` is covered below.

## Value / comparison leaves

### `ui.condition.stat`
RU: {label} {comparison}  
EN: {label} {comparison}

### `ui.condition.resource`
RU: {label} {comparison}  
EN: {label} {comparison}

### `ui.condition.itemCount`
RU: {item} {comparison}  
EN: {item} {comparison}

### `ui.condition.itemCapability`
RU: Возможность предмета {capability}: {state}  
EN: Item capability {capability}: {state}

### `ui.condition.calendarYear`
RU: Год {comparison}  
EN: Year {comparison}

### `ui.condition.calendarSeason`
RU: {season}  
EN: {season}

### `ui.condition.calendarDayInYear`
RU: День года {comparison}  
EN: Day of year {comparison}

### `ui.condition.calendarElapsedDays`
RU: Прошло дней {comparison}  
EN: Days elapsed {comparison}

### `ui.condition.housingTier`
RU: Жильё: {housing}  
EN: Housing: {housing}

## Career conditions

### `ui.condition.careerStage`
RU: Карьера {career}: этап {stage}  
EN: Career {career}: stage {stage}

### `ui.condition.careerShifts`
RU: Карьера {career}: смен {comparison}  
EN: Career {career}: shifts {comparison}

### `ui.condition.careerCounter`
RU: Карьера {career}: {counter} {comparison}  
EN: Career {career}: {counter} {comparison}

### `ui.condition.careerFact`
RU: Карьера {career}: факт {fact} {state}  
EN: Career {career}: fact {fact} {state}

### `ui.condition.careerChoice`
RU: Карьера {career}: {choice} = {value}  
EN: Career {career}: {choice} = {value}

## Quest conditions

### `ui.condition.questStage`
RU: Задание {quest}: этап {stage}  
EN: Quest {quest}: stage {stage}

### `ui.condition.questCounter`
RU: Задание {quest}: {counter} {comparison}  
EN: Quest {quest}: {counter} {comparison}

### `ui.condition.questFact`
RU: Задание {quest}: факт {fact} {state}  
EN: Quest {quest}: fact {fact} {state}

### `ui.condition.questChoice`
RU: Задание {quest}: {choice} = {value}  
EN: Quest {quest}: {choice} = {value}

## Relationship conditions

### `ui.condition.relationshipStage`
RU: Отношения {relationship}: этап {stage}  
EN: Relationship {relationship}: stage {stage}

### `ui.condition.relationshipCounter`
RU: Отношения {relationship}: {counter} {comparison}  
EN: Relationship {relationship}: {counter} {comparison}

### `ui.condition.relationshipFact`
RU: Отношения {relationship}: факт {fact} {state}  
EN: Relationship {relationship}: fact {fact} {state}

### `ui.condition.relationshipChoice`
RU: Отношения {relationship}: {choice} = {value}  
EN: Relationship {relationship}: {choice} = {value}

## World / meta conditions

### `ui.condition.worldFact`
RU: Факт мира {fact}: {state}  
EN: World fact {fact}: {state}

### `ui.condition.metaUnlock`
RU: Наследие {unlock}: {state}  
EN: Legacy unlock {unlock}: {state}

### `ui.condition.metaEndingCompleted`
RU: Судьба {ending}: {state}  
EN: Fate {ending}: {state}

### `ui.condition.metaHardWork`
RU: Тяжкий труд {career}: {state}  
EN: Hard Work {career}: {state}

## Legacy/migration leaves

### `ui.condition.metric`
RU: {label} {comparison}  
EN: {label} {comparison}

### `ui.condition.visits`
RU: {action}: {value} смен  
EN: {action}: {value} shifts

### `ui.condition.flagTrue`
RU: Продвиньте связанную историю  
EN: Advance the related story

### `ui.condition.flagFalse`
RU: Этот этап уже пройден  
EN: This step has already been completed

### `ui.condition.season`
RU: {season}  
EN: {season}

### `ui.condition.housing`
RU: {housing}  
EN: {housing}

### `ui.condition.unlock`
RU: {unlock}  
EN: {unlock}

### `ui.condition.item`
RU: {item} × {count}  
EN: {item} × {count}

## Logical composition

### `ui.condition.andSeparator`
RU:  и   
EN:  and 

### `ui.condition.orSeparator`
RU:  или   
EN:  or 

### `ui.condition.not`
RU: Не требуется: {condition}  
EN: Not required: {condition}

## State words

Boolean/state words and comparison tokens are supplied by item 114 and must be resolved independently before interpolation.

The same English word may represent multiple RU grammatical forms; use the semantic state key selected by the condition kind rather than guessing from prose.

## Label sources

- target stat labels: existing `stat.<id>.label`;
- stat hints: item 110;
- seasons/housing/items/resources/metrics/unlocks: item 116;
- action names for `visits`: existing localized action label when available, then current catalog label fallback.

## Identity constraints

Never translate or rewrite as gameplay identity:
- career IDs;
- quest IDs;
- relationship IDs;
- stage/counter/fact/choice IDs;
- world-fact IDs;
- ending IDs;
- item capability IDs;
- condition objects or operators.

A future semantic-name layer may localize those visible IDs separately, but this template layer must not invent gameplay aliases.

## Boundary

Presentation templates only. No eligibility, comparison, condition schema, mechanics, effects, Save or RNG changes.
