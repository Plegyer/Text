# Ordinary Action Journal Localization Expectations v1

Date: 2026-09-28
Owner: Chat 5
Exact current-main baseline: `4223be1f90f15a43938e072bc2171b0de5d2d1aa`

## Current journal reference model

Current journal storage keeps:
- `journal: string[]`
- parallel `journalRefs`

Event-choice resolution can append a stable event/choice reference, which current Journal UI rerenders through localized `event.<eventId>.choice.<choiceId>.text`.

Ordinary action logging still calls `log(...)` without a ref, so `journalRef=null`.

## RAW_JOURNAL_FALLBACK

For every item-125 ordinary action:

- `work`
- `forage`
- `brew`
- `sell`
- `scales`
- `exam`
- `deliver`
- `visit`
- `oddjob`
- `repay`
- `rent-room`
- `rest`
- `arrival`
- `forest-search`
- `tavern-talk`
- `landlord`

engine action resolution appends the completion line:

`<raw catalog action label>. Осталось энергии: <current energy>.`

with no locale-neutral journal reference.

Therefore existing/current rows remain raw-source fallback after locale switch.

## BREW_EXTRA_RAW_FALLBACK

`brew` can additionally append one raw line:

### Success
RU source:
`Микстура готова. Этикетка обещает бодрость, а не бессмертие — хороший знак.`

Prepared key:
`action.brew.recipe.success.text`

### Failed fast recipe
RU source:
`Смесь превратилась в пену. Для быстрого способа нужны весы или мастерство 3. Опыт сохранён.`

Prepared key:
`action.brew.recipe.fastFailure.text`

Both currently have `journalRef=null`.

## EVENT_REF_LOCALIZABLE AFTER ACTION

Some ordinary actions can lead into blocking legacy events through the resolver:
- `arrival`
- `work`
- `visit`
- `forest-search`
- `landlord`
- others when their current event triggers are eligible.

When the later event choice is resolved, that **event-choice** journal row can carry the current locale-neutral event/choice ref and rerender through event localization.

That does not retroactively localize the preceding ordinary action log row.

## ACTION_RESULT_SCREEN IS A DIFFERENT SEAM

`lastAction` already preserves stable `lastAction.id`, but it currently stores raw title/text and no exact selected scene ID field.

Item 128 defines the desired locale-neutral result presentation identity `actionId + sceneId`.

This does not solve journal rows, because journal storage lacks the corresponding action-log ref.

## Future safe journal ref shape

If Lead chooses to add ordinary-action journal refs, use stable semantic fields such as:
- action ID;
- log kind, e.g. `completion`, `brew-success`, `brew-fast-failure`;
- optional scene ID where relevant.

Do **not** infer refs by matching stored Russian prose.

## No fuzzy migration

For old/current rows with `journalRef=null`:
- render stored text unchanged;
- do not guess action ID from sentence text;
- do not rewrite Save merely because locale changes.

A versioned explicit migration would require a separate reviewed task.

## Invariants

Any future ref consumer must preserve:
- action transaction exactly once;
- current action count/slot behavior;
- event resolver ordering;
- resources/effects;
- Save identity independent of locale;
- RNG evolution.
