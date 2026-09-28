# Poverty Journal Localized-Render Verification v2

Status: verification matrix for shipped locale-neutral Journal/lastAction event-choice refs.

Current main:
`52ddc76148e33836d3161b63bf4c25ffb5c39d02`.

Ordinary poverty only. Secret Debt excluded.

## Shipped render contract

Current engine stores stable:
`{kind:'eventChoice', eventId, choiceId}`
in Journal refs and lastAction outcome refs.

Current UI renders:
- title: `event.<eventId>.title`;
- choice outcome text: `event.<eventId>.choice.<choiceId>.text`.

If localization is unavailable, the raw stored event/choice text remains the compatibility fallback.

## Verification matrix

| Event ID | Choice ID | Title key | Choice text key | RU expected | EN expected | Raw fallback |
| --- | --- | --- | --- | --- | --- | --- |
| `poverty-street-production.helpful-summer` | `take-errand` | `event.poverty-street-production.helpful-summer.title` | `event.poverty-street-production.helpful-summer.choice.take-errand.text` | Ты переносишь ящик под навес и получаешь небольшую плату за несколько минут работы. | You carry the crate under cover and earn a small payment for a few minutes of work. | You move the crate and receive a small payment. The amount is initial tuning rather than a locked economy value. |
| `poverty-street-production.helpful-summer` | `keep-resting` | `event.poverty-street-production.helpful-summer.title` | `event.poverty-street-production.helpful-summer.choice.keep-resting.text` | Ты сохраняешь более безопасное место для сна и пропускаешь поручение. | You keep the safer sleeping spot and let the errand pass. | You keep the safer sleeping spot and let the errand pass. |
| `poverty-street-production.neutral-autumn` | `settle-in` | `event.poverty-street-production.neutral-autumn.title` | `event.poverty-street-production.neutral-autumn.choice.settle-in.text` | Ты остаёшься в сухом углу. Ночь проходит без неожиданной помощи и без новых проблем. | You keep the dry corner. The night passes without unexpected help and without a new problem. | You keep the dry corner without gaining or losing anything beyond the ordinary street-night cost. |
| `poverty-street-production.pressure-winter` | `take-shelter` | `event.poverty-street-production.pressure-winter.title` | `event.poverty-street-production.pressure-winter.choice.take-shelter.text` | Ты остаёшься под навесом и сохраняешь столько отдыха, сколько позволяет эта ночь. | You stay beneath the overhang and keep as much rest as the night allows. | You choose the free, safer resolution and avoid adding another penalty to the ordinary street-night pressure. |
| `poverty-street-production.pressure-winter` | `keep-moving` | `event.poverty-street-production.pressure-winter.title` | `event.poverty-street-production.pressure-winter.choice.keep-moving.text` | Ты меняешь отдых на движение и встречаешь утро более уставшей. | You trade rest for movement and reach morning more tired. | You trade rest for motion. The added next-day Energy pressure is initial tuning, not a locked balance value. |
| `poverty-street-production-v2.helpful-summer-shade` | `take-small-task` | `event.poverty-street-production-v2.helpful-summer-shade.title` | `event.poverty-street-production-v2.helpful-summer-shade.choice.take-small-task.text` | Ты заканчиваешь короткую работу и получаешь небольшую плату. | You finish the brief job and receive a small payment. | You finish the brief job and receive a small payment. Its amount is initial tuning, not a locked economy value. |
| `poverty-street-production-v2.helpful-summer-shade` | `keep-place` | `event.poverty-street-production-v2.helpful-summer-shade.title` | `event.poverty-street-production-v2.helpful-summer-shade.choice.keep-place.text` | Ты сохраняешь место для отдыха и пропускаешь небольшую работу. | You keep your resting spot and let the small job pass. | You keep the resting spot and let the small job pass without cost. |
| `poverty-street-production-v2.neutral-autumn-crossing` | `wait-out-night` | `event.poverty-street-production-v2.neutral-autumn-crossing.title` | `event.poverty-street-production-v2.neutral-autumn-crossing.choice.wait-out-night.text` | Ты позволяешь улице постепенно стихнуть вокруг. Ночь не приносит ни помощи, ни новой неприятности. | You let the street settle around you. The night brings neither help nor a new problem. | You let the street settle around you. Nothing is gained, but nothing extra is taken either. |
| `poverty-street-production-v2.pressure-winter-wind` | `use-recess` | `event.poverty-street-production-v2.pressure-winter-wind.title` | `event.poverty-street-production-v2.pressure-winter-wind.choice.use-recess.text` | Ты устраиваешься в утопленном дверном проёме и пережидаешь самые сильные порывы. | You settle into the recessed doorway and wait out the strongest gusts. | You choose the free sheltered option and avoid adding more pressure to the ordinary street-night penalty. |
| `poverty-street-production-v2.pressure-winter-wind` | `keep-walking` | `event.poverty-street-production-v2.pressure-winter-wind.title` | `event.poverty-street-production-v2.pressure-winter-wind.choice.keep-walking.text` | Ты остаёшься в движении, пока ветер не стихает, и к утру сильнее чувствуешь усталость. | You keep moving until the wind eases and feel the lost rest more sharply by morning. | You stay in motion until the wind eases. The extra next-day Energy pressure is initial tuning rather than a Product lock. |
| `poverty-cheap-production.shared-quiet-autumn` | `settle-quietly` | `event.poverty-cheap-production.shared-quiet-autumn.title` | `event.poverty-cheap-production.shared-quiet-autumn.choice.settle-quietly.text` | Ты освобождаешь немного места, держишь вещи рядом и позволяешь комнате постепенно затихнуть. | You make a little space, keep your belongings close, and let the room gradually settle. | You make space, keep your belongings close, and let the room settle without adding another cost or penalty. |
| `poverty-cheap-production-v2.shared-room-seasons` | `settle-in` | `event.poverty-cheap-production-v2.shared-room-seasons.title` | `event.poverty-cheap-production-v2.shared-room-seasons.choice.settle-in.text` | Ты приводишь своё место в порядок и позволяешь общей комнате постепенно затихнуть. | You tidy your place and let the shared room gradually wind down. | You keep your space tidy and let the shared room wind down. No extra cost or penalty is added by this context event. |
| `poverty-recovery-production.small-coin-help` | `take-coins` | `event.poverty-recovery-production.small-coin-help.title` | `event.poverty-recovery-production.small-coin-help.choice.take-coins.text` | Ты берёшь только свободно лежащие монеты и оставляешь хлеб на месте. Небольшой суммы хватает, чтобы немного облегчить ближайшие расходы. | You take only the loose coins and leave the bread where it is. The small amount makes the next few expenses a little easier. | You take only the loose coins. The small amount is initial tuning and is not required for ordinary recovery. |
| `poverty-recovery-production.small-coin-help` | `leave-them` | `event.poverty-recovery-production.small-coin-help.title` | `event.poverty-recovery-production.small-coin-help.choice.leave-them.text` | Ты оставляешь монеты тому, кому они понадобятся следующим, и сохраняешь своё место на ночь. | You leave the coins for whoever needs them next and keep your place for the night. | You leave the coins for whoever needs them next and keep your place for the night. |
| `poverty-recovery-production.short-cleanup` | `do-cleanup` | `event.poverty-recovery-production.short-cleanup.title` | `event.poverty-recovery-production.short-cleanup.choice.do-cleanup.text` | Работа занимает всего несколько минут. Ты складываешь табуреты, подметаешь у прилавка и получаешь небольшую плату. | The work takes only a few minutes. You stack the stools, sweep around the stall, and receive a small payment. | The work takes only a few minutes and pays a small tunable amount without becoming a required job route. |
| `poverty-recovery-production.short-cleanup` | `keep-resting` | `event.poverty-recovery-production.short-cleanup.title` | `event.poverty-recovery-production.short-cleanup.choice.keep-resting.text` | Ты отказываешься от дополнительной работы и сохраняешь место для отдыха без штрафа. | You decline the extra work and preserve your resting spot without penalty. | You decline the extra work and preserve your resting spot without penalty. |
| `poverty-recovery-production.herb-bundle` | `take-herb` | `event.poverty-recovery-production.herb-bundle.title` | `event.poverty-recovery-production.herb-bundle.choice.take-herb.text` | Ты забираешь пучок обычных трав и убираешь его к своим вещам. | You keep the bundle of ordinary herbs and tuck it in with your things. | You keep the ordinary herb bundle. Its count is initial tuning and uses the existing inventory item only. |
| `poverty-recovery-production.herb-bundle` | `leave-herb` | `event.poverty-recovery-production.herb-bundle.title` | `event.poverty-recovery-production.herb-bundle.choice.leave-herb.text` | Ты оставляешь пучок на месте и продолжаешь устраиваться на ночь без него. | You leave the bundle where it is and continue settling in for the night without it. | You leave the bundle where it is and continue the night without relying on item assistance. |
| `poverty-pressure-production.cold-rain` | `take-doorway` | `event.poverty-pressure-production.cold-rain.title` | `event.poverty-pressure-production.cold-rain.choice.take-doorway.text` | Ты перебираешься в глубокий дверной проём, где дождь почти не достаёт до одежды. | You move into the deeper doorway, where the rain barely reaches your clothes. | You take the safer free option and avoid adding another penalty to the ordinary street night. |
| `poverty-pressure-production.cold-rain` | `wait-it-out` | `event.poverty-pressure-production.cold-rain.title` | `event.poverty-pressure-production.cold-rain.choice.wait-it-out.text` | Ты остаёшься на месте. К утру сырость сильнее сказывается и на силах, и на внешнем виде. | You stay where you are. By morning, the damp has taken more out of you and left you looking rougher. | You stay where you are. The extra fatigue and rough appearance are initial tuning, not locked balance. |
| `poverty-pressure-production.noisy-loading` | `move-corner` | `event.poverty-pressure-production.noisy-loading.title` | `event.poverty-pressure-production.noisy-loading.choice.move-corner.text` | Ты оставляешь привычное место и находишь угол подальше от колёс, ящиков и криков. | You leave the familiar spot and find a corner farther from the wheels, crates, and shouted counts. | You give up the familiar spot but avoid adding more fatigue. |
| `poverty-pressure-production.noisy-loading` | `stay-put` | `event.poverty-pressure-production.noisy-loading.title` | `event.poverty-pressure-production.noisy-loading.choice.stay-put.text` | Ты сохраняешь место, но погрузка не даёт нормально отдохнуть до рассвета. | You keep your place, but the loading never lets you get proper rest before dawn. | You keep the spot and lose some rest. The added Energy pressure is initial tuning. |
| `poverty-pressure-production.muddy-splash` | `wipe-down` | `event.poverty-pressure-production.muddy-splash.title` | `event.poverty-pressure-production.muddy-splash.choice.wipe-down.text` | Ты тратишь несколько минут, чтобы убрать самые заметные пятна, пока грязь не успела высохнуть. | You spend a few minutes wiping away the worst of the mud before it can dry. | You spend a little time cleaning the worst of it and take no extra mechanical penalty. |
| `poverty-pressure-production.muddy-splash` | `leave-for-morning` | `event.poverty-pressure-production.muddy-splash.title` | `event.poverty-pressure-production.muddy-splash.choice.leave-for-morning.text` | Ты оставляешь грязь до утра. К началу нового дня одежда и внешний вид будут заметно хуже. | You leave the mud until morning. By the start of the new day, your clothes and appearance are noticeably worse. | You leave the mess until morning. The Grooming pressure is initial tuning and remains non-terminal. |


Reviewed choices:
**24**.

## Expected behavior

For every row:
- RU renders the RU value of the listed localization key;
- EN renders the EN value of the same key;
- same stable eventId/choiceId ref is used in both locales;
- raw fallback is used only if localization resolution fails or is absent.

## No Save mutation

Changing locale or opening Journal must not:
- rewrite journalRefs;
- rewrite event/choice identity;
- replay choice effects;
- recalculate deltas;
- advance RNG;
- change NightFlow;
- alter Save schema.

## lastAction behavior

When the same event choice is the latest action:
- title resolves from the listed title key;
- text resolves from the listed choice text key;
- mechanical deltas remain those already committed by gameplay.

## Ownership boundary

This matrix covers only current ordinary-poverty event IDs from the six shipped poverty packs.

It excludes:
- Secret Debt;
- Forest result reactions;
- School;
- Foreman/relationship Night.

## Verification conclusion

All current ordinary-poverty resolved choices have stable locale-neutral render identities under the shipped PR54+ Journal/outcome-ref mechanism.
