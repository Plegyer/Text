# Poverty / Forest Localized-Journal Acceptance Matrix v1

Status: expected RU/EN journal/lastAction rendering once a Lead-owned locale-neutral journal consumer exists.

Current-main baseline:
`5dffefd15703d431a604b4cc9f831c4e55460aed`.

No engine/schema change is authored here.

## Consumer dependency

Current event resolution writes raw `sceneChoice.text` into:
- `run.historyState.journal`;
- `run.flow.lastAction.text`.

A future localized journal consumer must render from stable event/choice identity rather than recomputing gameplay or mutating stored history.

## Acceptance matrix

| Domain | Event | Choice | Localization key | RU expected | EN expected |
| --- | --- | --- | --- | --- | --- |
| ordinary poverty | `poverty-street-production.helpful-summer` | `take-errand` | `event.poverty-street-production.helpful-summer.choice.take-errand.text` | Ты переносишь ящик под навес и получаешь небольшую плату за несколько минут работы. | You carry the crate under cover and earn a small payment for a few minutes of work. |
| ordinary poverty | `poverty-street-production.helpful-summer` | `keep-resting` | `event.poverty-street-production.helpful-summer.choice.keep-resting.text` | Ты сохраняешь более безопасное место для сна и пропускаешь поручение. | You keep the safer sleeping spot and let the errand pass. |
| ordinary poverty | `poverty-street-production.neutral-autumn` | `settle-in` | `event.poverty-street-production.neutral-autumn.choice.settle-in.text` | Ты остаёшься в сухом углу. Ночь проходит без неожиданной помощи и без новых проблем. | You keep the dry corner. The night passes without unexpected help and without a new problem. |
| ordinary poverty | `poverty-street-production.pressure-winter` | `take-shelter` | `event.poverty-street-production.pressure-winter.choice.take-shelter.text` | Ты остаёшься под навесом и сохраняешь столько отдыха, сколько позволяет эта ночь. | You stay beneath the overhang and keep as much rest as the night allows. |
| ordinary poverty | `poverty-street-production.pressure-winter` | `keep-moving` | `event.poverty-street-production.pressure-winter.choice.keep-moving.text` | Ты меняешь отдых на движение и встречаешь утро более уставшей. | You trade rest for movement and reach morning more tired. |
| ordinary poverty | `poverty-street-production-v2.helpful-summer-shade` | `take-small-task` | `event.poverty-street-production-v2.helpful-summer-shade.choice.take-small-task.text` | Ты заканчиваешь короткую работу и получаешь небольшую плату. | You finish the brief job and receive a small payment. |
| ordinary poverty | `poverty-street-production-v2.helpful-summer-shade` | `keep-place` | `event.poverty-street-production-v2.helpful-summer-shade.choice.keep-place.text` | Ты сохраняешь место для отдыха и пропускаешь небольшую работу. | You keep your resting spot and let the small job pass. |
| ordinary poverty | `poverty-street-production-v2.neutral-autumn-crossing` | `wait-out-night` | `event.poverty-street-production-v2.neutral-autumn-crossing.choice.wait-out-night.text` | Ты позволяешь улице постепенно стихнуть вокруг. Ночь не приносит ни помощи, ни новой неприятности. | You let the street settle around you. The night brings neither help nor a new problem. |
| ordinary poverty | `poverty-street-production-v2.pressure-winter-wind` | `use-recess` | `event.poverty-street-production-v2.pressure-winter-wind.choice.use-recess.text` | Ты устраиваешься в утопленном дверном проёме и пережидаешь самые сильные порывы. | You settle into the recessed doorway and wait out the strongest gusts. |
| ordinary poverty | `poverty-street-production-v2.pressure-winter-wind` | `keep-walking` | `event.poverty-street-production-v2.pressure-winter-wind.choice.keep-walking.text` | Ты остаёшься в движении, пока ветер не стихает, и к утру сильнее чувствуешь усталость. | You keep moving until the wind eases and feel the lost rest more sharply by morning. |
| ordinary poverty | `poverty-cheap-production.shared-quiet-autumn` | `settle-quietly` | `event.poverty-cheap-production.shared-quiet-autumn.choice.settle-quietly.text` | Ты освобождаешь немного места, держишь вещи рядом и позволяешь комнате постепенно затихнуть. | You make a little space, keep your belongings close, and let the room gradually settle. |
| ordinary poverty | `poverty-cheap-production-v2.shared-room-seasons` | `settle-in` | `event.poverty-cheap-production-v2.shared-room-seasons.choice.settle-in.text` | Ты приводишь своё место в порядок и позволяешь общей комнате постепенно затихнуть. | You tidy your place and let the shared room gradually wind down. |
| ordinary poverty | `poverty-recovery-production.small-coin-help` | `take-coins` | `event.poverty-recovery-production.small-coin-help.choice.take-coins.text` | Ты берёшь только свободно лежащие монеты и оставляешь хлеб на месте. Небольшой суммы хватает, чтобы немного облегчить ближайшие расходы. | You take only the loose coins and leave the bread where it is. The small amount makes the next few expenses a little easier. |
| ordinary poverty | `poverty-recovery-production.small-coin-help` | `leave-them` | `event.poverty-recovery-production.small-coin-help.choice.leave-them.text` | Ты оставляешь монеты тому, кому они понадобятся следующим, и сохраняешь своё место на ночь. | You leave the coins for whoever needs them next and keep your place for the night. |
| ordinary poverty | `poverty-recovery-production.short-cleanup` | `do-cleanup` | `event.poverty-recovery-production.short-cleanup.choice.do-cleanup.text` | Работа занимает всего несколько минут. Ты складываешь табуреты, подметаешь у прилавка и получаешь небольшую плату. | The work takes only a few minutes. You stack the stools, sweep around the stall, and receive a small payment. |
| ordinary poverty | `poverty-recovery-production.short-cleanup` | `keep-resting` | `event.poverty-recovery-production.short-cleanup.choice.keep-resting.text` | Ты отказываешься от дополнительной работы и сохраняешь место для отдыха без штрафа. | You decline the extra work and preserve your resting spot without penalty. |
| ordinary poverty | `poverty-recovery-production.herb-bundle` | `take-herb` | `event.poverty-recovery-production.herb-bundle.choice.take-herb.text` | Ты забираешь пучок обычных трав и убираешь его к своим вещам. | You keep the bundle of ordinary herbs and tuck it in with your things. |
| ordinary poverty | `poverty-recovery-production.herb-bundle` | `leave-herb` | `event.poverty-recovery-production.herb-bundle.choice.leave-herb.text` | Ты оставляешь пучок на месте и продолжаешь устраиваться на ночь без него. | You leave the bundle where it is and continue settling in for the night without it. |
| ordinary poverty | `poverty-pressure-production.cold-rain` | `take-doorway` | `event.poverty-pressure-production.cold-rain.choice.take-doorway.text` | Ты перебираешься в глубокий дверной проём, где дождь почти не достаёт до одежды. | You move into the deeper doorway, where the rain barely reaches your clothes. |
| ordinary poverty | `poverty-pressure-production.cold-rain` | `wait-it-out` | `event.poverty-pressure-production.cold-rain.choice.wait-it-out.text` | Ты остаёшься на месте. К утру сырость сильнее сказывается и на силах, и на внешнем виде. | You stay where you are. By morning, the damp has taken more out of you and left you looking rougher. |
| ordinary poverty | `poverty-pressure-production.noisy-loading` | `move-corner` | `event.poverty-pressure-production.noisy-loading.choice.move-corner.text` | Ты оставляешь привычное место и находишь угол подальше от колёс, ящиков и криков. | You leave the familiar spot and find a corner farther from the wheels, crates, and shouted counts. |
| ordinary poverty | `poverty-pressure-production.noisy-loading` | `stay-put` | `event.poverty-pressure-production.noisy-loading.choice.stay-put.text` | Ты сохраняешь место, но погрузка не даёт нормально отдохнуть до рассвета. | You keep your place, but the loading never lets you get proper rest before dawn. |
| ordinary poverty | `poverty-pressure-production.muddy-splash` | `wipe-down` | `event.poverty-pressure-production.muddy-splash.choice.wipe-down.text` | Ты тратишь несколько минут, чтобы убрать самые заметные пятна, пока грязь не успела высохнуть. | You spend a few minutes wiping away the worst of the mud before it can dry. |
| ordinary poverty | `poverty-pressure-production.muddy-splash` | `leave-for-morning` | `event.poverty-pressure-production.muddy-splash.choice.leave-for-morning.text` | Ты оставляешь грязь до утра. К началу нового дня одежда и внешний вид будут заметно хуже. | You leave the mud until morning. By the start of the new day, your clothes and appearance are noticeably worse. |
| Forest result | `forest-result-content-v1.success` | `return` | `event.forest-result-content-v1.success.choice.return.text` | Ты оставляешь результат экспедиции неизменным и возвращаешься к обычному городскому ходу дня. | You leave the Activity result intact and return to the city-side flow. |
| Forest result | `forest-result-content-v1.escape` | `return` | `event.forest-result-content-v1.escape.choice.return.text` | Ты сохраняешь результат «отступление» отдельным и возвращаешься, не превращая его в успех. | You keep the escape result distinct and return without converting it into success. |
| Forest result | `forest-result-content-v1.failure` | `return` | `event.forest-result-content-v1.failure.choice.return.text` | Ты принимаешь зафиксированное поражение и возвращаешься к обычному ходу игры. | You accept the failed Activity result as recorded and return to ordinary flow. |


Reviewed rows:
**27**.

Coverage:
- ordinary-poverty choice outcomes: **24**;
- Forest result-reaction choice outcomes: **3**.

## RU/EN acceptance rule

For a resolved event choice:
- stable identity remains `eventId + choiceId`;
- RU renders `event.<eventId>.choice.<choiceId>.text.ru`;
- EN renders `event.<eventId>.choice.<choiceId>.text.en`;
- changing locale changes displayed copy only.

Ordinary-poverty rows use the final safe copyedit value where the 33-key patch changes that exact key; otherwise current root localization remains authoritative.

Forest rows use current shipped bilingual Forest result localization.

## lastAction title rule

Where a resolved event becomes `lastAction`, title presentation should resolve:
`event.<eventId>.title`
for the active locale.

The stored event identity and mechanical deltas remain unchanged.

## Mechanical invariance

Localized journal rendering must not:
- replay choice effects;
- alter resources/stats/items;
- alter event history;
- alter selected choice ID;
- advance RNG;
- change NightFlow;
- change Activity result identity;
- rewrite Save because locale changed.

## Forest continuation rule

Forest result events remain attached to exact continuations:
- success -> `activityResult(lumber.forest, success, lumber.forest.success)`;
- escape -> `activityResult(lumber.forest, escape, lumber.forest.escape)`;
- failure -> `activityResult(lumber.forest, failure, lumber.forest.failure)`.

Localized journal rendering must not create route-specific result identities.

## Poverty boundary

Ordinary poverty remains separate from Secret Debt.

Secret Debt journal copy is not included in this matrix.

## Acceptance conclusion

When the locale-neutral journal consumer ships, the same resolved gameplay choice must render the corresponding RU or EN text from this matrix without modifying historical gameplay state.
