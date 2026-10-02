# User Decisions Locked v1

Дата: 2026-09-25.

Статус: **CURRENT DECISION RECORD**.

Основание: последние прямые решения пользователя + разрешение SOL самостоятельно закрыть оставшиеся ранее предложенные варианты.

## Locked

### D1 — stat count/model
Не сокращать систему до 9 ради упрощения.

Target:
- 12 progression stats;
- отдельная Похоть.

См. `TARGET_STAT_SYSTEM_v1.md`.

### D2 — starting allocation
- 12 progression stats start at 1;
- 10 allocation points между ними;
- Lust отдельно.

### D3 — work stat changes
Отменён universal fixed `+2/+2/-1`.

Работа меняет разные stats по сезонам через seasonal packages.

### D4 — calendar
160 days:
- 4 years;
- 40 days/year;
- 4 seasons x 10 days.

### D5 — meta loadout
- knowledge/content unlocks automatic;
- strong rule modifiers selectable in limited pre-run loadout.
Exact slots/budget later.

### D6 — Palace unlock
Только после Hard Work на **всех 10 ordinary professions**.

Secret Debt/hidden careers не считаются.

### D7 — Large Activity direction
Expedition umbrella:
exploration/navigation + stat challenges + selected puzzle/tracking/investigation/tactical mechanics.

### D8 — Camp
Разрешён для multi-day expeditions.
Отдельный от city night.
Не обязателен в первом Forest product slice.

### D9 — release strategy
Staged internal playable milestones обязательны.
Public 1.0 может выпускаться только когда заявленный full scope действительно собран.

### D10 — Secret Debt in full public build
Да.

### D11 — Palace in full intended 1.0
Да.
Не обязателен в раннем internal product slice.

### D12 — Grooming/Cleanliness
Не отдельный volatile global meter.

**Ухоженность — полноценный progression stat**, допускающий быстрые gains/losses.

При необходимости короткие statuses (muddy/wet/etc.) отдельны.


### D13 — worker queue depth
Coordination target: **12 independent outstanding tasks per active worker whenever practical**.

This is a production-coordination rule, not a requirement to invent filler work:
- Lead verifies completion from Git before replenishing;
- replenish toward 12 when useful independent work exists;
- if a worker has no useful independent task, it may remain idle rather than create low-value staging paperwork;
- one file = one active owner remains mandatory.

This supersedes the earlier nine-deep queue target.

### D14 — starting careers

Стартовые карьеры ровно три:

- Dwarven Lumber;
- Satyr Maid;
- Undead Farm.

Старый набор стартовых профессий с Tavern/Hunter не является текущим дизайном.

Другие ordinary professions открываются позже через stats/build/system progression.

### D15 — profession count and hidden routes

Основная структура:

- 10 ordinary professions;
- hidden Palace как 11-я main profession;
- Secret Debt — отдельный extra hidden/forced route и не входит в эти 10;
- Secret Debt не считается для Palace unlock.

### D16 — ending eligibility is non-terminal

Достижение eligibility для ending не обязано завершать run.

Игрок может продолжать игру после появления доступного ending до явного принятия/commit через существующий ending flow.

### D17 — Lumber Hard Work

Для Dwarven Lumber зафиксировано:

`completed_shifts >= 50`

Это условие Hard Work ending.

Старые промежуточные Lumber thresholds вроде 10/25/30 не считаются утверждёнными автоматически.

### D18 — Palace True Ending / Return Home

Зафиксирована отдельная **истинная концовка** Дворца сверх обычных Palace outcome families.

Условия:
- Дворец уже должен быть открыт обычным правилом 10/10 Hard Work;
- **все 12 progression stats строго выше 90%**;
- Похоть не входит в эту проверку: она остаётся отдельной content-axis;
- героиня должна **победить Принца** в финальном Palace confrontation.

Результат:
- героиня возвращается в свой исходный мир;
- в Meta/New Game+ навсегда открывается **опция удвоенного потолка всех 12 progression stats**: их максимум в такой жизни становится 200 вместо 100.

Это отдельная +1 True Ending и не заменяет Palace Hard Work / Court Power / Inner Truth.

Не зафиксировано этим решением:
- точная механика confrontation с Принцем;
- имя/лор Принца;
- UI/активация повышенного потолка 200 в New Game+;
- UI/ID/анимация финала.

Само условие `all 12 progression stats > 90`, победа над Принцем, возвращение домой и NG+ reward с повышением потолка 12 статов до 200 **LOCKED**.

### D19 — Secret Debt / hidden poverty route baseline

Locked Product baseline for the hidden street-lender route:

- while the one-time encounter is unseen, every eligible street night has a **20%** lender-event chance;
- refusal closes that encounter for the current life;
- acceptance grants exactly **2000** money immediately;
- the trap activates exactly **10 days** after acceptance;
- activation creates an exact **20000** debt;
- from activation until real exit from the hidden route, **all 10 ordinary professions are domain-locked**; their existing progress is preserved and becomes usable again after exit;
- School remains available while bound;
- Large Activity remains available, but its repeatable economy must not become an easy 20000-money farm;
- hidden daytime work is paid profession work: income scales upward with relevant stats, and **Lust is also a positive wage input**;
- while bound, forced Night happens **every night**, suppresses the voluntary Night menu, and applies **next-day Energy -1**;
- repayment is one explicit all-at-once action for **20000** when enough money is held; no partial repayment;
- hidden-route Hard Work uses the same production baseline as ordinary professions: **50 completed daytime shifts**;
- Secret Debt remains outside the ordinary 10 and its Hard Work does not count toward Palace 10/10;
- the owner-kill/control outcome requires career progress, an appropriate stat build, high Lust, and School participation, and must expose a separate explicit player action;
- for that owner-kill route, the current School requirement is **10 paid lessons**; the exact high-Lust/stat thresholds remain balance-owned.

### D20 — voluntary School Lust growth

The existing **Body Confidence** School course must grant **Lust +2** per paid lesson in addition to its existing progression-stat package.

- this is voluntary growth, because the player chooses and pays for the course;
- Lust remains a separate content axis and is not Sexuality;
- the effect must apply exactly once per paid lesson and survive save/reload without duplication;
- forced Secret Debt Night does not automatically increase Lust.

### D21 — ordinary Hard Work next-life benefit

Completing an ordinary profession through its Hard Work ending permanently changes later lives:

- that specific ordinary profession becomes available from the start of subsequent runs, regardless of its normal in-run stat/year unlock gate;
- it also unlocks a profession-specific selectable **+5 starting-stat bonus** for New Game setup;
- the +5 bonus is not forced: the player chooses whether to equip/use it under the Meta/New Game setup;
- professions have different +5 target stats;
- exact profession -> +5 stat mapping is a separate Product mapping pass and must not be guessed in runtime code;
- this supersedes older design text that said Hard Work did not need an explicit early-profession unlock.

### D22 — Hard Work bonus breadth and New Start+ selection

D21 is refined as follows:

- the first five ordinary professions in the locked ordinary roster order (Lumber, Satyr Maid, Undead Farm, Tavern, Hunter) each unlock **one +5 stat bonus**;
- the later five (Guard, Merchant, Artist/Geisha, Assassin, Prostitute) may each unlock **two separate +5 stat bonuses**;
- on New Start+ the player may activate **any subset** of earned Hard Work bonuses: none, some, or all;
- there is no one-slot restriction for these earned profession bonuses;
- Lust must receive a meaningful Hard Work bonus because it is deliberately harder to grow; the exact interpretation/amount from the latest Product wording is awaiting one direct clarification and must not be guessed;
- the old automatic +3/+3 and Merchant +600 model is superseded by this selectable-bonus direction.

### D23 — Palace per-run activation gate and Day-1 invitation

The Palace is not available merely because all ten Hard Work achievements exist in permanent Meta.

For a particular New Start+ life:
- all ten ordinary Hard Work achievements must already be earned;
- **all ten corresponding Hard Work bonus packages must be actively selected for that new life**;
- if and only if that condition is satisfied, the player receives the **Palace invitation automatically on Day 1**;
- the invitation is the authored reveal/entry step and then opens Palace access; it is not random and does not add another progression requirement;
- no other invitation/item may substitute for or weaken the all-ten-active requirement;
- Secret Debt never counts toward the ten.

Therefore Palace eligibility is permanent 10/10 completion + current-run all-ten bonus activation -> automatic Day-1 invitation -> Palace access.

### D24 — Palace True Ending stat ceiling

The permanent optional Palace True Ending x2 reward means **cap x2 only**.

When that legacy option is active:
- the maximum of each of the 12 progression stats becomes **200 instead of 100**;
- current/start values are **not multiplied**;
- Hard Work +5 bonuses are not multiplied;
- the 10 manual creation allocation points are not multiplied;
- there is no before/after arithmetic-order question because x2 changes only the allowed maximum;
- Lust remains outside the 12-stat D18 requirement/reward.

## Still open after this lock

- exact negative-stat mapping for ordinary jobs; target frequency is negative tradeoffs in about two seasons out of four per profession, not every season;
- exact numeric economy;
- exact Lust starting value;
- meta loadout slot/budget count for non-Hard-Work strong modifiers;
- exact ordinary profession -> selectable +5 stat mapping, under D22 breadth/Lust constraints;
- exact School curriculum/prices;
- exact Activity region count/mechanics;
- exact Palace role/content outside the locked True Ending requirements;
- macro mystery/lore;
- exact Secret Debt shift stat gains, wage coefficients, owner-kill stat/Lust thresholds, and ending Meta rewards;
- production art/media budget.
