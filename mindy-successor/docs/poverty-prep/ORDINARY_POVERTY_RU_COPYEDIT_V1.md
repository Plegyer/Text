# Ordinary Poverty RU Copyedit v1

Status: text-only editorial pass over the full 84-key ordinary-poverty RU localization payload.

Source:
`prior-work/astra/prototype-m3.2/content/poverty-localization-main-delta-v1.fixture.json`.

Review scope:
- 14 event titles;
- 20 variant bodies;
- 24 choice labels;
- 24 choice-resolution texts;
- 2 media alts;
- 84/84 RU entries reviewed.

No gameplay ID, condition, effect, reward, tuning value, RNG rule, NightFlow rule, media identity, or save-state field changes in this document.

## Editorial goals

The source Russian should sound like in-world player-facing prose, not implementation commentary. The main cleanup removes phrases such as «начальная настройка», «зафиксированный баланс», «Product lock», «механический штраф», «контекстное событие», and «предмет инвентаря». Those phrases are useful in developer notes but weaken the scene when shown to the player.

Tone stays restrained: ordinary poverty can be uncomfortable, tiring, or briefly helpful without becoming Secret Debt, moral judgment, or melodrama.

## Exact-key replacements

Only the keys below need replacement. Every other RU entry in the 84-key payload is approved unchanged by this pass.

| Exact key | Replacement RU |
| --- | --- |
| `event.poverty-street-production.helpful-summer.variant.default.text` | Перед тем как улица стихнет на ночь, у соседнего прилавка нужно убрать под навес последний ящик. Работа короткая, без лишних вопросов и обязательств. |
| `event.poverty-street-production.helpful-summer.choice.take-errand.text` | Ты переносишь ящик под навес и получаешь небольшую плату за несколько минут работы. |
| `event.poverty-street-production.neutral-autumn.choice.settle-in.text` | Ты остаёшься в сухом углу. Ночь проходит без неожиданной помощи и без новых проблем. |
| `event.poverty-street-production.pressure-winter.variant.default.text` | Камни держат холод дольше, чем дневной свет. Можно остаться под навесом или продолжить идти, жертвуя частью отдыха. |
| `event.poverty-street-production.pressure-winter.choice.take-shelter.text` | Ты остаёшься под навесом и сохраняешь столько отдыха, сколько позволяет эта ночь. |
| `event.poverty-street-production.pressure-winter.choice.keep-moving.text` | Ты меняешь отдых на движение и встречаешь утро более уставшей. |
| `event.poverty-street-production-v2.helpful-summer-shade.variant.market-closing.text` | Пока на рынке закрывают ставни, кому-то нужно свернуть и связать полотно до вечернего дождя. Работа короткая и ни к чему тебя не привязывает. |
| `event.poverty-street-production-v2.helpful-summer-shade.variant.late-shade.text` | У закрытого прилавка ещё держится полоска тени. Можно взять последнее небольшое поручение или сохранить тихое место на ночь. |
| `event.poverty-street-production-v2.helpful-summer-shade.choice.take-small-task.text` | Ты заканчиваешь короткую работу и получаешь небольшую плату. |
| `event.poverty-street-production-v2.helpful-summer-shade.choice.keep-place.text` | Ты сохраняешь место для отдыха и пропускаешь небольшую работу. |
| `event.poverty-street-production-v2.neutral-autumn-crossing.variant.drizzle.text` | Лёгкая осенняя морось загоняет поздних прохожих под аркаду. Они проходят мимо без комментариев, оставляя мокрые следы и разделяя с тобой укрытие всего на несколько минут. |
| `event.poverty-street-production-v2.neutral-autumn-crossing.choice.wait-out-night.text` | Ты позволяешь улице постепенно стихнуть вокруг. Ночь не приносит ни помощи, ни новой неприятности. |
| `event.poverty-street-production-v2.pressure-winter-wind.variant.crosswind.text` | Резкий боковой ветер проходит сквозь переулок и выдувает тепло из каждого открытого угла. Рядом есть утопленный дверной проём, где можно укрыться. |
| `event.poverty-street-production-v2.pressure-winter-wind.variant.long-gusts.text` | Долгие порывы трясут ставни вдоль переулка. Можно остаться в укрытии или продолжить идти, пожертвовав частью завтрашних сил. |
| `event.poverty-street-production-v2.pressure-winter-wind.choice.use-recess.text` | Ты устраиваешься в утопленном дверном проёме и пережидаешь самые сильные порывы. |
| `event.poverty-street-production-v2.pressure-winter-wind.choice.keep-walking.text` | Ты остаёшься в движении, пока ветер не стихает, и к утру сильнее чувствуешь усталость. |
| `event.poverty-cheap-production.shared-quiet-autumn.variant.default.text` | В дешёвом ночлеге рано становится тихо. Через тонкие стены слышны кашель, шаги и шорох вещей, поэтому общая комната сама собой переходит на полголоса. |
| `event.poverty-cheap-production.shared-quiet-autumn.choice.settle-quietly.text` | Ты освобождаешь немного места, держишь вещи рядом и позволяешь комнате постепенно затихнуть. |
| `event.poverty-cheap-production-v2.shared-room-seasons.title` | Общая комната по сезону |
| `event.poverty-cheap-production-v2.shared-room-seasons.variant.shared-room.text` | Дешёвая общая комната простая и тесная, но здесь есть крыша, дверь и место, где можно спокойно переждать ночь. |
| `event.poverty-cheap-production-v2.shared-room-seasons.choice.settle-in.text` | Ты приводишь своё место в порядок и позволяешь общей комнате постепенно затихнуть. |
| `event.poverty-recovery-production.small-coin-help.choice.take-coins.text` | Ты берёшь только свободно лежащие монеты и оставляешь хлеб на месте. Небольшой суммы хватает, чтобы немного облегчить ближайшие расходы. |
| `event.poverty-recovery-production.short-cleanup.choice.do-cleanup.text` | Работа занимает всего несколько минут. Ты складываешь табуреты, подметаешь у прилавка и получаешь небольшую плату. |
| `event.poverty-recovery-production.herb-bundle.variant.default.text` | Рядом с пустым рыночным ящиком лежит небольшой связанный пучок обычных трав. Поблизости никого нет, и ничто не указывает, что за ним собираются вернуться. |
| `event.poverty-recovery-production.herb-bundle.choice.take-herb.text` | Ты забираешь пучок обычных трав и убираешь его к своим вещам. |
| `event.poverty-recovery-production.herb-bundle.choice.leave-herb.text` | Ты оставляешь пучок на месте и продолжаешь устраиваться на ночь без него. |
| `event.poverty-pressure-production.cold-rain.variant.default.text` | Холодный весенний дождь добирается до края тротуара и затекает под укрытие. Чуть дальше есть глубокий дверной проём, куда можно перебраться. |
| `event.poverty-pressure-production.cold-rain.choice.take-doorway.text` | Ты перебираешься в глубокий дверной проём, где дождь почти не достаёт до одежды. |
| `event.poverty-pressure-production.cold-rain.choice.wait-it-out.text` | Ты остаёшься на месте. К утру сырость сильнее сказывается и на силах, и на внешнем виде. |
| `event.poverty-pressure-production.noisy-loading.choice.move-corner.text` | Ты оставляешь привычное место и находишь угол подальше от колёс, ящиков и криков. |
| `event.poverty-pressure-production.noisy-loading.choice.stay-put.text` | Ты сохраняешь место, но погрузка не даёт нормально отдохнуть до рассвета. |
| `event.poverty-pressure-production.muddy-splash.variant.default.text` | Поздняя телега цепляет колесом лужу под неудачным углом. Грязь забрызгивает край одежды раньше, чем возница успевает это заметить. |
| `event.poverty-pressure-production.muddy-splash.choice.wipe-down.text` | Ты тратишь несколько минут, чтобы убрать самые заметные пятна, пока грязь не успела высохнуть. |
| `event.poverty-pressure-production.muddy-splash.choice.leave-for-morning.text` | Ты оставляешь грязь до утра. К началу нового дня одежда и внешний вид будут заметно хуже. |
| `media.stage.outside.alt` | Уличное место для ночёвки под открытым небом. |
| `media.stage.room.alt` | Тесная дешёвая общая комната для ночлега. |

## Approved unchanged after review

All remaining 48 RU keys are approved unchanged. This includes:
- all other titles;
- all other choice labels;
- seasonal cheap-room prose for spring/summer/winter;
- neutral and helpful bodies that already read naturally;
- result text that contains no implementation vocabulary.

## Terminology consistency

Preferred player-facing Russian in this slice:
- `ночлег` — for lodging as a player-facing concept;
- `общая комната` — for cheap-room context;
- `уличная ночёвка` / direct scene description — for street context;
- `силы` or concrete fatigue language inside prose;
- `Энергия` only where the UI explicitly names the stat.

Avoid in player-facing scene copy:
- «начальная настройка»;
- «тюнинг»;
- «зафиксированный баланс»;
- `Product lock`;
- «механический штраф»;
- «контекстное событие»;
- «предмет инвентаря».

## Mechanics firewall

These replacements preserve the exact existing gameplay meaning:
- effect-free choices remain effect-free;
- paid errands still imply only the already-existing positive money effect;
- cold/wind/loading/rain/mud pressure still implies only the already-existing authored consequence;
- no amount, threshold, probability, cooldown, or reward is added to prose;
- ordinary poverty remains separate from Secret Debt.

This is a copyedit proposal, not a production-data mutation.
