# Poverty Journal-Facing Copy Audit v1

Status: audit of ordinary-poverty choice outcome strings that can flow into `journal` and `lastAction`.

Current-main baseline:
`5dffefd15703d431a604b4cc9f831c4e55460aed`.

Secret Debt is excluded.

## Current runtime behavior

When a pending event choice resolves, current engine behavior:
- applies `sceneChoice.effects`;
- pushes raw `sceneChoice.text` into `run.historyState.journal`;
- writes raw `sceneChoice.text` into `run.flow.lastAction.text`;
- writes raw event title into `lastAction.title`.

The central pending-event UI already localizes event title/body/choice label, but journal/lastAction storage remains gameplay/content text rather than locale-neutral localization identity.

Therefore a future localized journal consumer should render from stable event/choice identity without mutating historical gameplay state.

## Ordinary-poverty choice outcome audit

| Event | Choice | Localization key | Current pack journal/lastAction text | RU expected | EN expected | Source |
| --- | --- | --- | --- | --- | --- | --- |
| `poverty-street-production.helpful-summer` | `take-errand` | `event.poverty-street-production.helpful-summer.choice.take-errand.text` | You move the crate and receive a small payment. The amount is initial tuning rather than a locked economy value. | Ты переносишь ящик под навес и получаешь небольшую плату за несколько минут работы. | You carry the crate under cover and earn a small payment for a few minutes of work. | copyedit patch |
| `poverty-street-production.helpful-summer` | `keep-resting` | `event.poverty-street-production.helpful-summer.choice.keep-resting.text` | You keep the safer sleeping spot and let the errand pass. | Ты сохраняешь более безопасное место для сна и пропускаешь поручение. | You keep the safer sleeping spot and let the errand pass. | current root |
| `poverty-street-production.neutral-autumn` | `settle-in` | `event.poverty-street-production.neutral-autumn.choice.settle-in.text` | You keep the dry corner without gaining or losing anything beyond the ordinary street-night cost. | Ты остаёшься в сухом углу. Ночь проходит без неожиданной помощи и без новых проблем. | You keep the dry corner. The night passes without unexpected help and without a new problem. | copyedit patch |
| `poverty-street-production.pressure-winter` | `take-shelter` | `event.poverty-street-production.pressure-winter.choice.take-shelter.text` | You choose the free, safer resolution and avoid adding another penalty to the ordinary street-night pressure. | Ты остаёшься под навесом и сохраняешь столько отдыха, сколько позволяет эта ночь. | You stay beneath the overhang and keep as much rest as the night allows. | copyedit patch |
| `poverty-street-production.pressure-winter` | `keep-moving` | `event.poverty-street-production.pressure-winter.choice.keep-moving.text` | You trade rest for motion. The added next-day Energy pressure is initial tuning, not a locked balance value. | Ты меняешь отдых на движение и встречаешь утро более уставшей. | You trade rest for movement and reach morning more tired. | copyedit patch |
| `poverty-street-production-v2.helpful-summer-shade` | `take-small-task` | `event.poverty-street-production-v2.helpful-summer-shade.choice.take-small-task.text` | You finish the brief job and receive a small payment. Its amount is initial tuning, not a locked economy value. | Ты заканчиваешь короткую работу и получаешь небольшую плату. | You finish the brief job and receive a small payment. | copyedit patch |
| `poverty-street-production-v2.helpful-summer-shade` | `keep-place` | `event.poverty-street-production-v2.helpful-summer-shade.choice.keep-place.text` | You keep the resting spot and let the small job pass without cost. | Ты сохраняешь место для отдыха и пропускаешь небольшую работу. | You keep your resting spot and let the small job pass. | copyedit patch |
| `poverty-street-production-v2.neutral-autumn-crossing` | `wait-out-night` | `event.poverty-street-production-v2.neutral-autumn-crossing.choice.wait-out-night.text` | You let the street settle around you. Nothing is gained, but nothing extra is taken either. | Ты позволяешь улице постепенно стихнуть вокруг. Ночь не приносит ни помощи, ни новой неприятности. | You let the street settle around you. The night brings neither help nor a new problem. | copyedit patch |
| `poverty-street-production-v2.pressure-winter-wind` | `use-recess` | `event.poverty-street-production-v2.pressure-winter-wind.choice.use-recess.text` | You choose the free sheltered option and avoid adding more pressure to the ordinary street-night penalty. | Ты устраиваешься в утопленном дверном проёме и пережидаешь самые сильные порывы. | You settle into the recessed doorway and wait out the strongest gusts. | copyedit patch |
| `poverty-street-production-v2.pressure-winter-wind` | `keep-walking` | `event.poverty-street-production-v2.pressure-winter-wind.choice.keep-walking.text` | You stay in motion until the wind eases. The extra next-day Energy pressure is initial tuning rather than a Product lock. | Ты остаёшься в движении, пока ветер не стихает, и к утру сильнее чувствуешь усталость. | You keep moving until the wind eases and feel the lost rest more sharply by morning. | copyedit patch |
| `poverty-cheap-production.shared-quiet-autumn` | `settle-quietly` | `event.poverty-cheap-production.shared-quiet-autumn.choice.settle-quietly.text` | You make space, keep your belongings close, and let the room settle without adding another cost or penalty. | Ты освобождаешь немного места, держишь вещи рядом и позволяешь комнате постепенно затихнуть. | You make a little space, keep your belongings close, and let the room gradually settle. | copyedit patch |
| `poverty-cheap-production-v2.shared-room-seasons` | `settle-in` | `event.poverty-cheap-production-v2.shared-room-seasons.choice.settle-in.text` | You keep your space tidy and let the shared room wind down. No extra cost or penalty is added by this context event. | Ты приводишь своё место в порядок и позволяешь общей комнате постепенно затихнуть. | You tidy your place and let the shared room gradually wind down. | copyedit patch |
| `poverty-recovery-production.small-coin-help` | `take-coins` | `event.poverty-recovery-production.small-coin-help.choice.take-coins.text` | You take only the loose coins. The small amount is initial tuning and is not required for ordinary recovery. | Ты берёшь только свободно лежащие монеты и оставляешь хлеб на месте. Небольшой суммы хватает, чтобы немного облегчить ближайшие расходы. | You take only the loose coins and leave the bread where it is. The small amount makes the next few expenses a little easier. | copyedit patch |
| `poverty-recovery-production.small-coin-help` | `leave-them` | `event.poverty-recovery-production.small-coin-help.choice.leave-them.text` | You leave the coins for whoever needs them next and keep your place for the night. | Ты оставляешь монеты тому, кому они понадобятся следующим, и сохраняешь своё место на ночь. | You leave the coins for whoever needs them next and keep your place for the night. | current root |
| `poverty-recovery-production.short-cleanup` | `do-cleanup` | `event.poverty-recovery-production.short-cleanup.choice.do-cleanup.text` | The work takes only a few minutes and pays a small tunable amount without becoming a required job route. | Работа занимает всего несколько минут. Ты складываешь табуреты, подметаешь у прилавка и получаешь небольшую плату. | The work takes only a few minutes. You stack the stools, sweep around the stall, and receive a small payment. | copyedit patch |
| `poverty-recovery-production.short-cleanup` | `keep-resting` | `event.poverty-recovery-production.short-cleanup.choice.keep-resting.text` | You decline the extra work and preserve your resting spot without penalty. | Ты отказываешься от дополнительной работы и сохраняешь место для отдыха без штрафа. | You decline the extra work and preserve your resting spot without penalty. | current root |
| `poverty-recovery-production.herb-bundle` | `take-herb` | `event.poverty-recovery-production.herb-bundle.choice.take-herb.text` | You keep the ordinary herb bundle. Its count is initial tuning and uses the existing inventory item only. | Ты забираешь пучок обычных трав и убираешь его к своим вещам. | You keep the bundle of ordinary herbs and tuck it in with your things. | copyedit patch |
| `poverty-recovery-production.herb-bundle` | `leave-herb` | `event.poverty-recovery-production.herb-bundle.choice.leave-herb.text` | You leave the bundle where it is and continue the night without relying on item assistance. | Ты оставляешь пучок на месте и продолжаешь устраиваться на ночь без него. | You leave the bundle where it is and continue settling in for the night without it. | copyedit patch |
| `poverty-pressure-production.cold-rain` | `take-doorway` | `event.poverty-pressure-production.cold-rain.choice.take-doorway.text` | You take the safer free option and avoid adding another penalty to the ordinary street night. | Ты перебираешься в глубокий дверной проём, где дождь почти не достаёт до одежды. | You move into the deeper doorway, where the rain barely reaches your clothes. | copyedit patch |
| `poverty-pressure-production.cold-rain` | `wait-it-out` | `event.poverty-pressure-production.cold-rain.choice.wait-it-out.text` | You stay where you are. The extra fatigue and rough appearance are initial tuning, not locked balance. | Ты остаёшься на месте. К утру сырость сильнее сказывается и на силах, и на внешнем виде. | You stay where you are. By morning, the damp has taken more out of you and left you looking rougher. | copyedit patch |
| `poverty-pressure-production.noisy-loading` | `move-corner` | `event.poverty-pressure-production.noisy-loading.choice.move-corner.text` | You give up the familiar spot but avoid adding more fatigue. | Ты оставляешь привычное место и находишь угол подальше от колёс, ящиков и криков. | You leave the familiar spot and find a corner farther from the wheels, crates, and shouted counts. | copyedit patch |
| `poverty-pressure-production.noisy-loading` | `stay-put` | `event.poverty-pressure-production.noisy-loading.choice.stay-put.text` | You keep the spot and lose some rest. The added Energy pressure is initial tuning. | Ты сохраняешь место, но погрузка не даёт нормально отдохнуть до рассвета. | You keep your place, but the loading never lets you get proper rest before dawn. | copyedit patch |
| `poverty-pressure-production.muddy-splash` | `wipe-down` | `event.poverty-pressure-production.muddy-splash.choice.wipe-down.text` | You spend a little time cleaning the worst of it and take no extra mechanical penalty. | Ты тратишь несколько минут, чтобы убрать самые заметные пятна, пока грязь не успела высохнуть. | You spend a few minutes wiping away the worst of the mud before it can dry. | copyedit patch |
| `poverty-pressure-production.muddy-splash` | `leave-for-morning` | `event.poverty-pressure-production.muddy-splash.choice.leave-for-morning.text` | You leave the mess until morning. The Grooming pressure is initial tuning and remains non-terminal. | Ты оставляешь грязь до утра. К началу нового дня одежда и внешний вид будут заметно хуже. | You leave the mud until morning. By the start of the new day, your clothes and appearance are noticeably worse. | copyedit patch |


Reviewed ordinary-poverty choice outcomes:
**24**.

## Expected future journal rendering

For any ordinary-poverty choice:
1. keep stored event/choice identity locale-neutral;
2. resolve `event.<eventId>.choice.<choiceId>.text` at render time;
3. use RU or EN according to current presentation locale;
4. do not rewrite historical Save entries merely because locale changes.

Where the 33-key copyedit supplies a replacement, that proposed pair is the expected polished text. Otherwise current root RU+EN remains the expected pair.

## lastAction rendering

A locale-neutral consumer should use:
- event title key:
  `event.<eventId>.title`;
- resolved choice text key:
  `event.<eventId>.choice.<choiceId>.text`;
- existing stored deltas for mechanical result display.

Changing locale must not recompute effects or alter deltas.

## Journal invariance

Locale switching must not change:
- event history;
- chosen choice ID;
- choice effects;
- resources/stats/items;
- RNG;
- NightFlow;
- day/calendar;
- Save identity.

Only rendered journal/lastAction strings may change.

## Secret Debt firewall

No Secret Debt event, lender copy, forced-Night copy, hidden-work copy or outcome text is included in this audit.

## Integration disposition

This document is copy/consumer guidance only.

A future Lead-owned locale-neutral journal consumer may use the audited exact localization keys without engine/schema changes to ordinary-poverty mechanics.
