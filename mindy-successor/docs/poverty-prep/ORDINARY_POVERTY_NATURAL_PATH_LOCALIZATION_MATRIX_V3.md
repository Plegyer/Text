# Ordinary Poverty Natural-Path Localization Matrix v3

Status: representative RU/EN natural-path acceptance matrix for current ordinary poverty.

Current main:
`52ddc76148e33836d3161b63bf4c25ffb5c39d02`.

Secret Debt excluded.


## HELPFUL — `poverty-street-production.helpful-summer`

Natural context:
- lodging: `lodging.street`;
- lodging cost: **0**;
- lodging next-day Energy delta: **-1**;
- lodging next-day effects: `[{"stat":"grooming","delta":-1}]`;
- event conditions: `[{"kind":"housingTier","value":"street"},{"kind":"calendarSeason","value":"summer"}]`;
- variant: `default`;
- choice: `take-errand`;
- choice effects: `[{"kind":"modifyResource","resource":"money","delta":10}]`.

Expected localization:
- title key `event.poverty-street-production.helpful-summer.title`
  - RU: Небольшое платное поручение
  - EN: A small paid errand
- body key `event.poverty-street-production.helpful-summer.variant.default.text`
  - RU: Перед тем как улица стихнет на ночь, у соседнего прилавка нужно убрать под навес последний ящик. Работа короткая, без лишних вопросов и обязательств.
  - EN: Before the street settles for the night, a nearby stall needs one last crate moved under the awning. It is a brief job with no questions and no obligations attached.
- choice label key `event.poverty-street-production.helpful-summer.choice.take-errand.label`
  - RU: Взяться за короткое поручение
  - EN: Take the short errand
- resolved choice text key `event.poverty-street-production.helpful-summer.choice.take-errand.text`
  - RU: Ты переносишь ящик под навес и получаешь небольшую плату за несколько минут работы.
  - EN: You carry the crate under cover and earn a small payment for a few minutes of work.

Optional additive depth presentation key:
`presentation.poverty.depth.poverty-street-production-helpful-summer.default.a.text`.

Identity invariance:
- event ID remains `poverty-street-production.helpful-summer`;
- variant ID remains `default`;
- choice ID remains `take-errand`;
- Journal ref remains `eventChoice(poverty-street-production.helpful-summer, take-errand)`;
- event effect remains exactly `[{"kind":"modifyResource","resource":"money","delta":10}]`.

## PRESSURE — `poverty-pressure-production.cold-rain`

Natural context:
- lodging: `lodging.street`;
- lodging cost: **0**;
- lodging next-day Energy delta: **-1**;
- lodging next-day effects: `[{"stat":"grooming","delta":-1}]`;
- event conditions: `[{"kind":"housingTier","value":"street"},{"kind":"calendarSeason","value":"spring"},{"kind":"calendarDayInYear","op":"eq","value":7}]`;
- variant: `default`;
- choice: `wait-it-out`;
- choice effects: `[{"kind":"addNextDayModifier","energyDelta":-1,"statEffects":[{"stat":"grooming","delta":-1}],"tag":"poverty.pressure.initial-cold-rain"}]`.

Expected localization:
- title key `event.poverty-pressure-production.cold-rain.title`
  - RU: Холодный дождь у обочины
  - EN: Cold rain at the curb
- body key `event.poverty-pressure-production.cold-rain.variant.default.text`
  - RU: Холодный весенний дождь добирается до края тротуара и затекает под укрытие. Чуть дальше есть глубокий дверной проём, куда можно перебраться.
  - EN: Cold spring rain reaches the curb and creeps beneath the edge of your shelter. A deeper doorway nearby offers a drier place to move.
- choice label key `event.poverty-pressure-production.cold-rain.choice.wait-it-out.label`
  - RU: Переждать на месте
  - EN: Wait it out
- resolved choice text key `event.poverty-pressure-production.cold-rain.choice.wait-it-out.text`
  - RU: Ты остаёшься на месте. К утру сырость сильнее сказывается и на силах, и на внешнем виде.
  - EN: You stay where you are. By morning, the damp has taken more out of you and left you looking rougher.

Optional additive depth presentation key:
`presentation.poverty.depth.poverty-pressure-production-cold-rain.default.a.text`.

Identity invariance:
- event ID remains `poverty-pressure-production.cold-rain`;
- variant ID remains `default`;
- choice ID remains `wait-it-out`;
- Journal ref remains `eventChoice(poverty-pressure-production.cold-rain, wait-it-out)`;
- event effect remains exactly `[{"kind":"addNextDayModifier","energyDelta":-1,"statEffects":[{"stat":"grooming","delta":-1}],"tag":"poverty.pressure.initial-cold-rain"}]`.

## CHEAP — `poverty-cheap-production.shared-quiet-autumn`

Natural context:
- lodging: `lodging.cheap`;
- lodging cost: **50**;
- lodging next-day Energy delta: **0**;
- lodging next-day effects: `[]`;
- event conditions: `[{"kind":"housingTier","value":"cheap"},{"kind":"calendarSeason","value":"autumn"}]`;
- variant: `default`;
- choice: `settle-quietly`;
- choice effects: `[]`.

Expected localization:
- title key `event.poverty-cheap-production.shared-quiet-autumn.title`
  - RU: Тонкие стены, ранняя тишина
  - EN: Thin walls, early quiet
- body key `event.poverty-cheap-production.shared-quiet-autumn.variant.default.text`
  - RU: В дешёвом ночлеге рано становится тихо. Через тонкие стены слышны кашель, шаги и шорох вещей, поэтому общая комната сама собой переходит на полголоса.
  - EN: The cheap lodging settles early. Thin walls carry coughs, footsteps, and the rustle of belongings, so the shared room gradually drops to a whisper.
- choice label key `event.poverty-cheap-production.shared-quiet-autumn.choice.settle-quietly.label`
  - RU: Соблюдать общую тишину
  - EN: Keep the shared quiet
- resolved choice text key `event.poverty-cheap-production.shared-quiet-autumn.choice.settle-quietly.text`
  - RU: Ты освобождаешь немного места, держишь вещи рядом и позволяешь комнате постепенно затихнуть.
  - EN: You make a little space, keep your belongings close, and let the room gradually settle.

Optional additive depth presentation key:
`presentation.poverty.depth.poverty-cheap-production-shared-quiet-autumn.default.a.text`.

Identity invariance:
- event ID remains `poverty-cheap-production.shared-quiet-autumn`;
- variant ID remains `default`;
- choice ID remains `settle-quietly`;
- Journal ref remains `eventChoice(poverty-cheap-production.shared-quiet-autumn, settle-quietly)`;
- event effect remains exactly `[]`.

## RECOVERY — `poverty-recovery-production.short-cleanup`

Natural context:
- lodging: `lodging.street`;
- lodging cost: **0**;
- lodging next-day Energy delta: **-1**;
- lodging next-day effects: `[{"stat":"grooming","delta":-1}]`;
- event conditions: `[{"kind":"housingTier","value":"street"},{"kind":"calendarSeason","value":"spring"},{"kind":"calendarDayInYear","op":"eq","value":4}]`;
- variant: `default`;
- choice: `do-cleanup`;
- choice effects: `[{"kind":"modifyResource","resource":"money","delta":5}]`.

Expected localization:
- title key `event.poverty-recovery-production.short-cleanup.title`
  - RU: Последняя короткая уборка
  - EN: One last sweep
- body key `event.poverty-recovery-production.short-cleanup.variant.default.text`
  - RU: У закрывающегося прилавка осталось одно небольшое дело: сложить два табурета, подмести узкую полосу и отнести ведро к стоку.
  - EN: A closing stall has one small cleanup left: stack two stools, sweep a narrow strip, and carry a bucket to the drain.
- choice label key `event.poverty-recovery-production.short-cleanup.choice.do-cleanup.label`
  - RU: Сделать короткую уборку
  - EN: Do the short cleanup
- resolved choice text key `event.poverty-recovery-production.short-cleanup.choice.do-cleanup.text`
  - RU: Работа занимает всего несколько минут. Ты складываешь табуреты, подметаешь у прилавка и получаешь небольшую плату.
  - EN: The work takes only a few minutes. You stack the stools, sweep around the stall, and receive a small payment.

Optional additive depth presentation key:
`presentation.poverty.depth.poverty-recovery-production-short-cleanup.default.a.text`.

Identity invariance:
- event ID remains `poverty-recovery-production.short-cleanup`;
- variant ID remains `default`;
- choice ID remains `do-cleanup`;
- Journal ref remains `eventChoice(poverty-recovery-production.short-cleanup, do-cleanup)`;
- event effect remains exactly `[{"kind":"modifyResource","resource":"money","delta":5}]`.


## RNG invariance

Localization and optional depth-presentation lookup must not:
- advance gameplay RNG;
- change event selection;
- reroll variant selection;
- reroll choice outcome;
- alter NightFlow reaction order.

## Save invariance

Changing locale must not alter:
- lodging ID;
- housing state;
- event ID;
- variant ID;
- choice ID;
- event history;
- Journal ref;
- resources/stats/items;
- next-day modifier queue;
- day/calendar state.

## Cost/effect invariance

The exact current lodging cost/effects and exact event choice effects shown above are authoritative.

Additional RU/EN depth text from item 312 is presentation-only and must not change any numeric value or effect list.

## Reload stability

For each representative path:
1. reach the pending event naturally;
2. save;
3. render RU;
4. switch to EN;
5. resolve the same choice;
6. reload;
7. verify the same authoritative effect and stable Journal ref.

## Matrix conclusion

Helpful, pressure, cheap and recovery paths can receive deeper bilingual presentation without changing event/choice identity, lodging cost, event effects, RNG or Save.
