# Ending Condition Explanation Shell Audit v1

Date: 2026-09-28
Owner: Chat 5
Baseline main: `5dffefd15703d431a604b4cc9f831c4e55460aed`
Consumer: `src/ui/app.ts` `explain(c: Condition)`

## Purpose

Current ending/eligibility UI renders several dynamic condition descriptions from hardcoded Russian templates. This item proposes presentation-only RU+EN keys while preserving exact condition objects, operators and values.

## Shared state words

### `ui.condition.state.present`
RU: есть  
EN: present

### `ui.condition.state.absent`
RU: отсутствует  
EN: absent

### `ui.condition.state.yes`
RU: есть  
EN: yes

### `ui.condition.state.no`
RU: нет  
EN: no

### `ui.condition.state.completed`
RU: пройдена  
EN: completed

### `ui.condition.state.notCompleted`
RU: не пройдена  
EN: not completed

### `ui.condition.state.finished`
RU: завершён  
EN: completed

### `ui.condition.state.notFinished`
RU: не завершён  
EN: not completed

## Dynamic templates

### `ui.condition.itemCapability`
RU: Возможность предмета {capability}: {state}  
EN: Item capability {capability}: {state}

### `ui.condition.calendarYear`
RU: Год {comparison}  
EN: Year {comparison}

### `ui.condition.calendarDayInYear`
RU: День года {comparison}  
EN: Day of year {comparison}

### `ui.condition.calendarElapsedDays`
RU: Прошло дней {comparison}  
EN: Days elapsed {comparison}

### `ui.condition.housingTier`
RU: Жильё: {housing}  
EN: Housing: {housing}

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

### `ui.condition.visits`
RU: {action}: {value} смен  
EN: {action}: {value} shifts

### `ui.condition.flagTrue`
RU: Продвиньте связанную историю  
EN: Advance the related story

### `ui.condition.flagFalse`
RU: Этот этап уже пройден  
EN: This step has already been completed

### `ui.condition.not`
RU: Не требуется: {condition}  
EN: Not required: {condition}

### `ui.condition.andSeparator`
RU:  и   
EN:  and 

### `ui.condition.orSeparator`
RU:  или   
EN:  or 

## Existing non-template cases

These current condition kinds do not need new phrase templates because they are already composed from values/labels plus locale-neutral comparison symbols:
- stat;
- resource;
- itemCount;
- metric.

These kinds currently depend on label localization quality and may still show Russian-only label values if the underlying label map is not localized.

## Important identity boundary

The localization key is selected by the condition `kind`, but the condition object itself remains authoritative.

Do not:
- rewrite condition IDs;
- translate stored fact/counter/stage IDs;
- change comparison operators;
- change eligibility;
- infer alternate gameplay meaning from translated prose.

## Boundary

Presentation-only audit. No condition schema/runtime/effect/ending changes.
