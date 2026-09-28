# Foreman Relationship RU Source Polish v2

Date: 2026-09-28
Status: PRESENTATION_ONLY
Baseline main: `01b31b9ab0d0267d95edf5b5b80638acd63f5c04`

## Relationship display identity

### `relationship.lumber.foreman.label`
RU: Бригадир лесной артели

### `relationship.lumber.foreman.stage.unknown.label`
RU: Ещё не знакомы

### `relationship.lumber.foreman.stage.professional.label`
RU: Рабочее доверие

### `relationship.lumber.foreman.stage.route-professional.label`
RU: Профессиональный путь

### `relationship.lumber.foreman.counter.night_meetings.label`
RU: Вечерние разговоры

### `relationship.lumber.foreman.fact.night-followup-complete.label`
RU: Вечерний рабочий разговор завершён

### `relationship.lumber.foreman.choice.route.professional.label`
RU: Держаться профессионального пути

## Exact current milestone event copy

### `event.lumber.foreman-notice.title`
RU: Бригадир замечает работу

### `event.lumber.foreman-notice.variant.default.text`
RU: После первой признанной смены бригадир обращается к тебе уже не как к случайной подёнщице. Разговор остаётся рабочим: он отмечает, что на тебя можно рассчитывать, и предлагает дальше держаться профессионально.

### `event.lumber.foreman-notice.choice.professional.label`
RU: Оставить всё по-деловому

### `event.lumber.foreman-notice.choice.professional.text`
RU: Принять рабочее доверие без обещаний о более близких отношениях.

## Editorial result

The current shipped milestone prose already matches the required professional-route boundary, so v2 keeps it unchanged rather than introducing a root conflict.

New source work is limited to semantic relationship/stage/counter/fact/choice display labels for identities that already exist.

## Product-open boundary

No personal name, romance, affection meter, new stage, new fact, new counter, new choice, explicit content, housing gate or mechanic is authored here.
