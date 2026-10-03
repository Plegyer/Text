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
- the Hard Work bonus system must include a Lust bonus, and **any such Lust bonus is at least +3 Lust** because Lust is deliberately harder to grow; this means magnitude, not a requirement that three professions grant Lust; exact profession placement remains Product mapping work;
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

### D25 — original Plus Mode is not successor scope

The original game has a separate Plus/New-Game-plus-style mode in which jobs change and the altered progression leads toward the original game's true ending.

Current successor Product authority:
- **do not port the original Plus Mode/job-replacement structure into the current intended build**;
- the successor's true-ending role belongs to the **Palace True Ending / Return Home** defined in D18;
- original Plus Mode may be revisited only by a later explicit Product decision;
- no worker may infer or implement original Plus-Mode job mutations as Palace requirements.


### D26 — ordinary same-career daily pacing

For the 10 ordinary professions, a character may complete **at most one shift of the same profession per calendar day**.

- this is **not** a global one-work-action-per-day rule;
- if Energy, unlocks and other conditions allow it, the player may work different ordinary professions on the same day;
- ordinary Hard Work remains exactly **50 completed shifts**, so a single ordinary profession cannot reach Hard Work earlier than Day 50 from a Day-1 start;
- this pacing decision does not by itself reduce existing positive seasonal stat gains;
- the already-shipped seasonal-negative structure remains: about 2 negative seasons of 4 per ordinary profession, one `-1` progression-stat effect in each, no Lust negatives;
- exact negative-stat target remapping is still a separate balance pass and must not be guessed in runtime. Research should prefer targets that create real pressure instead of immediately clipping at zero;
- this decision applies to the 10 ordinary professions only. It does not silently impose the same cadence on Secret Debt hidden work or Palace progression.

### D27 — strong Meta loadout architecture

D5 strong rule modifiers use a **Keystone + Specialists** architecture.

- a new run may activate **at most one Keystone**: a broad, run-defining rule modifier;
- separately, the run may activate a limited number of **Specialists**: directed/narrow build, access, School, Activity, safety or late-build modifiers;
- the exact Specialist capacity is still Product-open;
- pure knowledge/content unlocks remain automatic and do not consume Keystone/Specialist capacity;
- ordinary D21-D23 Hard Work packages remain a separate layer and may still be activated as any earned subset: none, some or all;
- broad effects such as +1 daily Energy, No Rent, substantial passive income, extra calendar time, or broad stat carry-over are Keystone-class **if such rewards are later approved**. This classification is not approval to create those rewards;
- directed School/Activity/access/safety effects are Specialist-class by default;
- the D24 Palace True reward `cap 200` is Specialist-class by default because it changes only late stat ceiling and grants no Day-1 free stats;
- Secret Debt forced next-day Energy `-1` applies after any selected max/base Energy modifier and must still remove one usable Energy relative to the same unbound loadout;
- no housing/safety Meta effect may cancel forced Secret Debt Night;
- no access Meta effect may substitute for D23 permanent 10/10 + active 10/10 -> Day-1 Palace invitation;
- this architecture does not create Titles and does not port original Plus Mode.


### D28 — strong Meta Specialist capacity = 2

D27 is now numerically resolved for Specialist capacity.

For each New Start+ life:
- active Keystones: **0..1**;
- active Specialists: **0..2**;
- ordinary D21-D23 Hard Work packages remain outside both limits and may still use any earned subset;
- pure knowledge/content unlocks remain outside both limits and are automatic;
- D24 Palace cap-200 consumes **one normal Specialist slot** when active;
- there is no hidden/free Palace Specialist slot;
- adding a third Specialist is invalid for a newly resolved run.

Reasoning accepted from:
`chat4/strong-meta-keystone-capacity-v5@68d480c46d604da4f298ba03241011f8a55550d9`.

Capacity 1 made cap-200 consume the entire directed build layer. Capacity 3 let directed effects compose into an almost-general second power layer. Capacity 2 preserves a meaningful pair while requiring the player to leave another useful Specialist inactive.

Current-run loadout resolution must be snapshotted. A later catalog/capacity change must not rewrite an in-progress life.

### D29 — Palace uses the rich six-stage progression topology

The Palace is a substantial final profession/route, not a short postscript after D23 entry.

Accepted topology source:
`chat6/palace-progression-topology-decision-v10@7a65f2dd88b53135c393be64f6e78ab46b9bcab8`.

The run-local Palace progression uses six functional stages:

1. **Entered Service**;
2. **Working Rhythm**;
3. **Trusted Service**;
4. **Palace Network**;
5. **Crossroads**;
6. **Outcome Ready**.

Current structural duty milestones are:
- 2;
- 5;
- 8;
- 12;
- 15 completed Palace duties.

These are Palace progression milestones, not additional entry requirements. D23 remains the sole Palace entry authority:
permanent ordinary 10/10 + current-run active 10/10 -> automatic Day-1 invitation -> Palace access.

Locked Palace topology rules:
- `palace.progression-complete` is emitted exactly once when the run reaches Outcome Ready;
- Prince confrontation cannot become available before Palace progression completion;
- Palace True Ending still additionally requires all 12 progression stats >=91; Lust is excluded;
- the three non-True Palace outcome families may begin preparation at different middle stages but remain **non-exclusive until explicit ending commit**;
- Service Life preparation may begin at Trusted Service;
- Court Power preparation may begin at Palace Network;
- Inner Truth preparation may begin at Crossroads;
- all three still finalize only from Outcome Ready;
- romance, Palace Night, relationships and legacy items are optional authored variants, never mandatory progression gates;
- refusing romance cannot block any Palace outcome;
- Palace Night cannot override a forced Secret Debt Night;
- Palace has no `hardWork:palace` requirement;
- D26 ordinary same-career one-shift/day pacing is **not** silently applied to Palace.

Exact Palace daily cadence and exact authored event text remain separate tuning/content work. The chosen topology targets a substantial capstone and accepts the higher production/test cost in exchange for lower "too short" risk and more room for the three outcome families.

### D30 — Secret Debt ending rewards use three distinct bounded Keystones

Accepted design source:
`chat5/secret-debt-ending-meta-rewards-v6@461bfa161e00bea15bbda15baea2c08b2f6aa52a`.

Each of the three Secret Debt endings permanently earns a distinct **Keystone** option for future New Start+ lives. Ownership may accumulate across lives, but D27/D28 means at most one Keystone can be active in a particular life.

#### Paid Freedom -> Earned Reserve Match

Mechanical identity:
- future-run Keystone;
- while not bound by Secret Debt, ordinary-profession wage earned in the run can receive a bounded 1:1 matching contribution;
- only legitimate ordinary profession wage counts;
- School/Activity/item/passive-income money does not count;
- the +2000 lender grant never counts;
- Secret Debt hidden-work wage never counts while bound;
- repayment never counts;
- the match has a finite per-run cap.

This reward supports a work-first solvency/economic-planning playstyle without becoming starting cash or a permanent stipend.

#### Bound Life -> Work Rhythm

Mechanical identity:
- future-run Keystone;
- after completing at least one ordinary-profession shift on a day, the next calendar day can receive +1 usable Energy;
- multiple shifts on the same day do not stack this benefit;
- only a finite number of bonus days may trigger per run;
- Secret Debt hidden work does not arm the reward;
- School/Activity alone do not arm it;
- D26 same-career pacing remains unchanged;
- if a bonus day is also Secret-Debt-bound, forced next-day Energy -1 applies after the selected Energy modifier and must still leave the bound loadout one usable Energy below the same unbound loadout.

This reward supports a labor-rhythm / multi-career playstyle without becoming unconditional +1 daily Energy.

#### Takeover -> Network Retainer

Mechanical identity:
- future-run Keystone;
- pays a small fixed amount at the start of eligible early-run days for a bounded initial calendar period;
- while Secret Debt is actively bound, payment is paused;
- paused payments are not banked or repaid later;
- the reward has a finite per-run total;
- it never changes lender discovery, debt size, repayment, forced Night, ordinary-career lock or Palace D23 gating.

This reward supports a capital-first / network-income playstyle and is intentionally broad enough to require the one Keystone slot.

#### Secret Debt reward parameter status

The three **reward identities, classes and invariants above are locked**.

Exact numeric balance remains open until the successor economy pass:
- Earned Reserve Match per-run money cap;
- Work Rhythm maximum triggered bonus days;
- Network Retainer daily payment, duration and therefore total cap.

The v6 packet's `1000`, `20 bonus days`, and `25 × 40` values are accepted as current research targets, **not yet runtime constants**.

No selected Secret Debt reward may:
- alter the unseen 20% lender chance;
- auto-refuse or pre-reveal the encounter;
- change +2000 / 10-day activation / 20000 debt;
- cancel forced Night;
- cancel next-day Energy -1;
- unlock ordinary careers while bound;
- count toward ordinary Hard Work 10/10;
- substitute for Palace qualification;
- silently enable cap-200.



### D31 — exact ordinary seasonal negative-stat target map

Accepted research source:
`chat3/progression-floor-aware-negative-map-v5@255c0c9b59870f91c8b7032863db6dd6966ec4bc`.

D26 structure remains unchanged:
- exactly two negative seasons out of four per ordinary profession;
- exactly one `-1` progression-stat effect in each selected negative season;
- exactly 20 negative cells total;
- no Lust negatives;
- negative seasons themselves do not move;
- positive seasonal effects do not change;
- wages, costs, unlocks and Hard Work=50 do not change;
- D26 max one shift of the same ordinary profession per calendar day remains unchanged.

The **negative target stat** in those 20 already-selected cells is now locked as follows:

| Profession | Negative season | Target stat |
| --- | --- | --- |
| Lumber | Spring | Dexterity |
| Lumber | Winter | Strength |
| Satyr Maid | Summer | Sociability |
| Satyr Maid | Autumn | Endurance |
| Undead Farm | Spring | Reason |
| Undead Farm | Autumn | Strength |
| Tavern | Spring | Reason |
| Tavern | Summer | Wits |
| Hunter | Spring | Endurance |
| Hunter | Winter | Dexterity |
| Guard | Summer | Manners |
| Guard | Winter | Reason |
| Merchant | Summer | Wits |
| Merchant | Winter | Manners |
| Artist/Geisha | Summer | Manners |
| Artist/Geisha | Autumn | Dexterity |
| Assassin | Spring | Reason |
| Assassin | Winter | Manners |
| Prostitute | Summer | Sexuality |
| Prostitute | Winter | Endurance |

Design intent:
- every negative target is positively replenished by the same career in another season, so the penalty remains mechanically live instead of permanently clipping at the floor;
- no target is also positive in its own negative season;
- starter careers preserve their existing strongest-stat Day-160 cap behavior;
- Tavern, Hunter and Merchant are intentionally allowed to lose automatic work-only Day-160 cap reach on their strongest/co-primary axis;
- targeted paid School is expected to restore Day-160 cap reach for those three, preserving School as a meaningful accelerator rather than making pure work universally self-sufficient.

Accepted harness envelope:
- Hard Work remains Day 50 for every ordinary career under D26;
- realized negative pressure by shift 50 is approximately 82–86% of attempted negatives across tested starts/School cadence instead of the shipped map's ~11.6%;
- long-run 160-day realized pressure is approximately 94–96%;
- no starter profession loses its previous work-only strongest-stat cap reach;
- wage reductions caused by live negative pressure are intentional tradeoffs and must not be compensated by silently changing wage formulas in the same implementation.

Implementation should be content-only target replacement plus focused snapshots/invariants. Do not add deferred penalties, stat-debt systems, fallback negative mechanics or per-career imperative runtime code.


### D32 — exact Secret Debt Keystone numeric parameters

Accepted calibration source:
`chat5/secret-debt-keystone-calibration-v7@e8e759b5470e45c94b6827ce5dbecede478d60ff`.

The three D30 Keystone identities remain unchanged. Their previously open numeric parameters are now locked.

#### Paid Freedom — Earned Reserve Match

- match rate remains **1:1** on eligible ordinary-profession wage;
- maximum matched bonus per run: **1000 money**;
- only eligible ordinary wage earned while not bound counts;
- Secret Debt hidden work, lender grant, repayment and non-work income remain excluded;
- once 1000 bonus has been paid, further eligible wages receive no additional match that run.

#### Bound Life — Work Rhythm

- one qualifying ordinary-work day may arm exactly **+1 usable Energy** for the next calendar day;
- multiple ordinary shifts on the same day do not stack;
- maximum rewarded days per run: **20**;
- therefore maximum lifetime value is **20 extra Energy/actions**;
- hidden Secret Debt work, School-only days and Activity-only days do not arm it;
- D26 remains binding, so same-career Hard Work cannot occur before Day 50;
- on a bound bonus day, Secret Debt next-day Energy `-1` applies after the selected Energy modifier and remains a real one-Energy loss relative to the same unbound loadout.

#### Takeover — Network Retainer

- payment: **25 money**;
- payment window: first **40 eligible calendar days**;
- maximum possible payment total: **1000 money per run**;
- while Secret Debt is actively bound, payment is paused;
- missed bound-day payments are lost and are not banked or reimbursed later;
- no payment occurs after the 40-day window even if fewer than 40 payments were actually received.

Calibration authority uses the current executable economy:
- fresh money 600;
- base Energy 3;
- normal lodging 100;
- cheap lodging 50;
- current School tuition 300–500;
- current executable ordinary wages, not older WU candidate assumptions.

These numbers may be changed only by a later explicit Product balance decision. They are now runtime-authoritative for D30 implementation.


### D33 — Literacy & Numbers publishes canonical Lumber management readiness at 3-track repetition

The existing School-to-Lumber management seam is now fully specified.

Canonical School source:
- course: `school.course.literacy_and_numbers`;
- track: `school.track.literacy_and_numbers`.

School-owned readiness condition:
- `lessons_completed >= 3`
  **OR**
- `night_study_sessions >= 3`
  on that same Literacy & Numbers track.

This intentionally matches the already-shipped readiness cadence used by starter-career School integrations such as Satyr Maid, Undead Farm and Tavern. It is not a new universal School milestone system.

Publication contract:
- School publishes the existing durable world fact
  `lumber.school.management-ready`;
- that existing transport identity is canonical;
- publication is exactly once;
- publication occurs in the same resolver epoch after the qualifying School transaction commits;
- the School publisher is independent of Lumber career/relationship state;
- no certificate, project, exam, second School progression layer or legacy `metrics.lessons` counter is introduced;
- three Night Study sessions count because this contribution is now explicitly authored by Product.

Order independence is required.

The Lumber consumer
`lumber-cross.school-management-return`
must work both when:
1. the professional Foreman route exists before the School fact is published; and
2. the School fact is already present before the professional Foreman route is established.

Therefore the Lumber consumer must not rely only on `worldFactAdded`. It must also be able to react when the `lumber.foreman` relationship transitions into the required professional route while the canonical School fact already exists.

The downstream Lumber-owned effects remain:
- `management-school-ready`;
- `forewoman-problem-resolved`.

School never writes those career facts directly, and Lumber never reads School-private counters directly.

### D34 — Lumber ordinary career stages are 1 / 8 / 20; route readiness stays fact-based

The Lumber career stage model is deliberately separated from Forewoman/Forest route readiness.

True ordinary Lumber career stages are:

1. `newcomer`;
2. `accepted-hand`;
3. `trusted-worker`;
4. `veteran`.

Transitions:

- `newcomer -> accepted-hand` at **1 completed Lumber shift**;
- `accepted-hand -> trusted-worker` at **8 completed Lumber shifts**;
- `trusted-worker -> veteran` at **20 completed Lumber shifts**.

These ordinary stage transitions are work-persistence milestones. They do not require School, romance, Activity, a specific season or route commitment.

Hard Work remains a separate ending-eligibility axis:
- exactly **50 completed Lumber shifts**;
- no additional Lumber stage/fact/School/relationship/Activity requirement;
- D26 still means no more than one Lumber shift per calendar day.

The previously used design vocabulary
`forewoman-ready`, `forest-ready` and `outcome-ready`
must **not** become mutually exclusive Lumber career stages.

Reason:
the runtime career stage is one current enum value, while Lumber is explicitly allowed to have multiple ending families eligible at once. Encoding Forewoman and Forest as branch stages would make otherwise compatible eligibility paths compete for one stage slot.

Instead:

- Forewoman readiness remains represented by the existing School/relationship/career facts, including
  `management-school-ready`,
  `forewoman-problem-resolved`,
  and professional `lumber.foreman` route;
- Forest readiness remains represented by the existing Activity/Lumber facts, including
  `forest-truth-known` and
  `forest-problem-resolved`;
- final readiness is represented by normal ending eligibility, not a duplicate `outcome-ready` career stage/fact.

Both complex Lumber ending families require the character to have reached at least
`trusted-worker`.
Therefore neither Forewoman nor Forest complex outcome may become eligible before **8 completed Lumber shifts**, even if its external facts are prepared earlier.

External preparation may happen before shift 8 and must be preserved. Reaching `trusted-worker` should allow the resolver to recognize already-satisfied route facts without requiring a redundant extra School lesson, Activity, relationship action or ninth Lumber shift.

At 20 shifts, `veteran` is ordinary-career status only. It does not auto-commit or invalidate Forewoman/Forest routes and does not replace Hard Work=50.


### D35 — normal lodging value = explicit private-space capability

Accepted Product packet:
`chat5/housing-tier-value-decision-v8@6e8f095339a4a426cee5e3facb801f71ce6b1b82`.

Supporting live-economy evidence:
`chat3/live-economy-affordability-harness-v7@7d9daa6f1faa69d42d5fbaa56e683a35aac447b0`.

Current lodging prices remain:
- normal = **100**;
- cheap = **50**;
- street = **0**.

Normal lodging earns its extra price through **explicit private-space access**, not through universal free Energy, money or stat protection.

Locked semantics:
- `normal` may satisfy explicitly authored private-space Night/relationship choices;
- `cheap` does not satisfy private-space-only choices;
- `street` does not satisfy private-space-only choices;
- existing School Night Study remains available from normal **or** cheap lodging;
- existing public/workplace Night choices are not globally re-gated by housing tier;
- existing relationship content is not globally blocked on cheap/street; only individually authored private-space branches may require normal lodging;
- initial production must seed at least three optional private-space branches across Satyr Maid recurring-guest, Tavern recurring-traveler and Prostitute recurring-client/relationship content;
- those private branches may not gate ordinary career progression, Hard Work or Palace qualification;
- Secret Debt forced Night always overrides voluntary private-space choices;
- Palace optional Night cannot bypass that precedence;
- housing choice never cancels a forced Night.

Rejected for the current baseline:
- unconditional normal-room +1 Energy/day;
- broad normal-room stat protection;
- a new generic storage subsystem solely to justify lodging price.

The exact authored copy/scenes of the three seed private branches are production content work, not a new Product gate.


### D36 — Large Activity full 1.0 scope = four-region game-within-the-game

Accepted Product packet:
`chat3/large-activity-full-scope-v8@5d176da728d7a8b99efcc5970f97bbed411bae6f`.

Large Activity is a real second gameplay mode inside the 160-day life-sim, not a flat event list and not a universal combat subsystem.

#### Four-region target

Intended 1.0 uses exactly **4 Activity regions**:

1. **Forest Frontier** — early;
2. **Trade Corridor** — early/mid;
3. **Anomalous Reach** — mid/late;
4. **Restricted Sites Network** — late.

These are functional region identities, not final lore names.

The current executable:
- `lumber.forest` = vertical slice;
- `hunter.expedition` = vertical slice;
- `assassin.infiltration` = infrastructure-only proof.

None of the three counts as a complete full-1.0 region yet.

#### Activity loop

Target loop:

`prepare in city -> choose region/loadout -> navigate -> spend internal resources -> resolve encounter/mini-game -> continue/detour/escape/camp -> secure or risk finds -> typed ActivityResult -> city systems react`.

Required systemic properties:
- route graph, not a flat event picker;
- persistent route/discovery state during the life;
- internal resources separate from global daily Energy;
- equipment/capabilities change legal routes/options;
- success / escape / failure are materially different;
- deterministic save/resume at internal checkpoints;
- city preparation changes Activity options;
- Activity results can change careers, relationships, School, items and ending eligibility.

No universal Activity XP/progression bar is added.

#### Entry and internal resources

Default new Activity entry:
- costs **2 daily Energy**, paid once;
- reload/resume never repays entry cost;
- explicit exit followed by same-day re-entry is a new paid entry.

Universal internal resources:
- **Field Time = 6 segments per field day**;
- **Endurance** is Activity-adapter-defined in the current target range **6–8**;
- capability-specific supplies/charges are contextual, not a universal third bar.

Global daily Energy is not reused as Activity stamina.

#### Specialized mini-game families

Full 1.0 must contain at least these three distinct mechanic families:

1. **Tracking Triangulation**;
2. **Pattern / Ritual Circuit**;
3. **Infiltration / Suspicion**.

They share the Activity envelope but may use different internal state and UI.

Do not add a generic universal combat system merely to make Activity feel game-like.

#### Region structural bar

Each production region must contain at minimum:
- 3 route contexts;
- at least one shortcut;
- at least one capability/fact-gated route;
- at least one season-dependent edge;
- at least one information-dependent risk decision;
- at least 2 meaningful equipment/capability hooks.

Major encounters normally expose 2–4 build approaches where appropriate.

#### Pacing

Activity must not become a second grind ladder.

Reference pacing:
- no region requires more than **3 successful entries** to resolve its core regional anchor;
- a complex ordinary-career Activity leg should require no more than **3 Activity entries after city preparation is complete**;
- standalone Activity ending eligibility must be reachable with **10 or fewer Activity entries** in one life;
- reference eligibility should be possible by roughly **Day 120**.

Not every life is expected to clear all four regions.

#### Camp

Camp exists only for explicitly multi-day Activity objectives.

Locked camp baseline:
- maximum **2 field camp nights** in one Activity entry;
- camp replaces city Night for that calendar day;
- city lodging is not charged for that camp night;
- ordinary city voluntary Night menu does not run;
- camp may have its own contact/relationship scenes;
- each camp advances global calendar exactly once;
- next field day refreshes Field Time, not global daily Energy;
- returning from a multi-day Activity does not grant a second full city workday for that consumed day.

Secret Debt precedence is absolute:
- a bound character may enter Activity;
- forced Secret Debt Night cannot be replaced/suppressed by camp;
- bound Activity therefore cannot continue through a camp boundary past the forced-Night intercept;
- Activity cannot cancel the next-day Secret Debt Energy -1.

#### Palace boundary

Activity never substitutes for D23:
- does not grant invitation;
- does not count toward ordinary 10/10;
- does not substitute for active 10/10 packages;
- does not count as Palace duty;
- does not bypass the 12-stat True Ending gate.

After Palace access already exists, Activity may contribute optional Palace route variants.

#### Standalone Activity ending family

Intended 1.0 requires at least one ending family whose primary progression is Activity rather than an ordinary career.

Baseline eligibility structure is locked:
- resolve regional anchors in at least **3 of 4 regions**;
- complete specialized mechanics from at least **2 different mini-game families**;
- secure at least one meaningful extracted capability/evidence/sample result;
- resolve at least one Activity contact/companion thread;
- no ordinary Hard Work requirement;
- no Palace requirement;
- eligibility remains non-terminal until explicit commit under D16.

The exact player-facing name, exact outcome directions and Meta rewards remain a separate Product pass.

#### Production scale target

Per region target:
- approximately **18–22 authored content units**;
- approximately **8 stable presentation IDs**.

Four-region target:
- approximately **72–88 regional content units**;
- approximately **32 regional presentation IDs**;
- plus 3 shared specialized mini-game shells and 3 generic success/escape/failure shells;
- minimum total stable presentation target approximately **38 IDs**.

This is a production scope target, not a requirement for unique commissioned art per ID.


### D37 — minimum Night completeness bar for ordinary careers

Accepted Product packet:
`chat4/night-system-completeness-audit-v8@63078afd37d4ef785043d443126e2be0061d559b`.

The generic Night lifecycle is considered structurally mature enough for 1.0 content completion. 1.0 readiness is now judged by authored Night coverage, not by adding a new broad Night engine.

For every ordinary career, the default minimum authored Night bar is:

1. at least one **professional / non-romantic continuation** Night intent;
2. at least one **personal / relationship continuation** Night intent.

The two intents must be meaningfully distinct.

A single branching Night scene may satisfy both only when:
- professional and personal branches are independently chosen;
- they have distinct authored consequences;
- romance is never forced;
- a confidence/Lust/Sexuality threshold is never treated as consent.

A career whose fantasy is strongly Night-dependent should target a third meaningful system-specific Night intent rather than filler.

Current Night-heavy examples:
- Satyr Maid;
- Tavern;
- Artist/Geisha;
- Prostitute.

Current readiness implications:
- Undead Farm meets the default bar;
- Artist/Geisha meets the Night-heavy bar;
- Hunter requires at least professional + Senior Guide/companion Night;
- Guard requires at least professional + Partner Night;
- Merchant requires at least professional + Supplier relationship Night;
- Lumber requires a distinct personal/social continuation beyond the professional Foreman surface;
- Assassin requires a distinct optional handler/informant relationship Night;
- Prostitute requires a distinct optional personal/relationship continuation in addition to professional client follow-up;
- D35 separately still requires private-space seed branches for Satyr Maid, Tavern and Prostitute.

Locked precedence/invariants:
- Secret Debt forced Night > Palace optional Night > ordinary voluntary Night;
- Secret Debt forced Night does not automatically increase Lust;
- ordinary Prostitute Night never inherits forced Secret Debt semantics;
- every completed global Night advances the calendar exactly once;
- pending/forced/relationship/private-space Night boundaries must be reload-safe;
- School Night Study remains a distinct competing Night use;
- Activity camp is not automatically global Night and must use the Activity/Night handoff contract rather than writing the calendar directly.

This is a minimum content-quality rule, not a requirement to add filler scenes solely to hit a number.


### D38 — standalone Large Activity ending family = three separate endings with selectable Activity Specialists

Accepted Product packet:
`chat3/activity-ending-family-v9@37079bea92a0fa442035de310d8d21fb0b435d53`.

D36's standalone Activity ending family is realized as **three separately completable ending IDs** under one player-facing Activity family:

1. `ending.activity.pathfinder`;
2. `ending.activity.preservation`;
3. `ending.activity.network`.

A single life commits at most one normal ending. Across multiple lives the player may permanently complete all three and own all three rewards, but D28 still limits active Specialists in any New Start+ life to **0..2 total**.

All three share the D36 common baseline:
- resolve regional anchors in at least **3 of 4** Activity regions;
- complete specialized mechanics from at least **2 different mini-game families**;
- secure/extract at least **1 meaningful Activity result**;
- resolve at least **1 Activity contact/companion thread**;
- no ordinary Hard Work requirement;
- no Palace requirement;
- eligibility remains non-terminal until explicit D16 commit.

#### Pathfinder / Mapping

Ending ID:
`ending.activity.pathfinder`.

Additional eligibility:
- at least **2 Pathfinder-marked regional anchors in distinct regions**;
- at least **1 successful Tracking Triangulation** encounter.

Permanent reward:
**Surveyor's Atlas**
`specialist.activity.surveyors-atlas`.

Class:
**Specialist**.

When selected in New Start+:
- once per D36 region per run, the first authored route-survey/discovery action that normally costs exactly **1 Field Time** may cost **0 Field Time**;
- maximum direct saving = **4 Field Time per run**, one per region;
- only the normal survey information is revealed.

It does not:
- change the Field Time baseline of 6;
- reduce the 2-Energy Activity entry cost;
- unlock a region;
- bypass capability/seasonal/ending gates;
- resolve encounters or regional anchors automatically.

#### Preservation / Research

Ending ID:
`ending.activity.preservation`.

Additional eligibility:
- at least **2 Preservation-marked regional anchors in distinct regions**;
- at least **1 successful Pattern / Ritual Circuit** encounter;
- the common meaningful extraction must be at least **1 research-grade secured result**.

Permanent reward:
**Field Archive Protocol**
`specialist.activity.field-archive`.

Class:
**Specialist**.

When selected:
- once per region per run, after legally obtaining a result explicitly tagged `activity-secure-eligible`, the player may mark one carried result as **Secured** at a stable Activity checkpoint;
- a Secured result survives later escape/failure from that Activity entry unless the authored result explicitly forbids securing before the secure action;
- maximum **1 secured result per region**, **4 per run**.

It does not:
- create/duplicate a result;
- waive the challenge or capability needed to obtain it;
- refund spent consumables;
- preserve generic inventory across lives;
- bypass a system-critical key/evidence gate unless that content explicitly opts into `activity-secure-eligible`.

#### Network / Access

Ending ID:
`ending.activity.network`.

Additional eligibility:
- at least **2 Network-marked regional anchors in distinct regions**;
- at least **1 successful Infiltration / Suspicion** encounter;
- the common Activity contact requirement must resolve through at least **1 network-capable contact**.

Permanent reward:
**Expedition Contact Network**
`specialist.activity.contact-network`.

Class:
**Specialist**.

When selected:
- after a D36 region is already normally unlocked, that region may expose exactly **1 authored** `activity-network-introduction` lateral route option per run;
- using it consumes that region's one introduction;
- maximum **4 introductions per run**, one per region.

It may change route/contact/risk/information options, but may not generically bypass:
- region unlock;
- career stage;
- ordinary Hard Work;
- relationship stage;
- item capability;
- Palace qualification/duty;
- Secret Debt repayment/exit/forced Night;
- ending eligibility.

#### Shared reward rules

All three rewards:
- are selectable Specialists, not automatic active bonuses;
- consume one of D28's normal two Specialist slots;
- create no free Activity-only slot;
- preserve Activity entry at **2 Energy**;
- preserve D36 <=10-entry reference pacing for first completion;
- grant no generic starting stats, money, daily Energy or calendar time;
- never substitute for D23 Palace 10/10 permanent + 10/10 active;
- never suppress Secret Debt forced Night.

Pure completion knowledge/codex/retrospective content remains automatic and consumes no Specialist slot.

Final player-facing lore names and epilogue prose remain content-owned; the stable functional ending/reward IDs and mechanics above are authority.


### D39 — Palace non-True ending rewards

Accepted Product packet:
`chat6/palace-nontrue-ending-rewards-v13@7673e9f47404468175567d952825cf0b0e981ed3`.

The three non-True Palace endings grant distinct future-life identities only after normal `completeEnding`. Eligibility/finalize/commit alone do not permanently grant the reward, and the reward does not activate in the life that earns it.

#### Service Life

Ending:
`ending.palace.service-life`.

Permanent reward:
**Steady Practice**
`palace.service-life.steady-practice`.

Class:
**Specialist**.

When selected in a future New Start+ life:
- track ordinary careers in the order they first reach **8 completed shifts**;
- the first **2 distinct ordinary careers** to reach 8 shifts become continuity careers for that life;
- for each continuity career, the next **3 D31 seasonal negative progression-stat effects** generated by that same career are reduced from `-1` to `0`;
- maximum protection = **3 points per continuity career**, **6 points per run**.

It does not:
- restore losses that happened before binding;
- change D26 cadence;
- change Hard Work 50;
- change wages/costs/unlocks/positive seasonal effects;
- protect against Secret Debt, Activity, Palace, relationship, item, Energy or money penalties.

It consumes **1 of D28's normal 2 Specialist slots**.

#### Court Power

Ending:
`ending.palace.court-power`.

Permanent reward:
**Formal Introduction**
`palace.court-power.formal-introduction`.

Class:
**Specialist**.

When selected:
- grants **3 Formal Introduction uses per run**;
- a use is legal only in an authored ordinary-career professional-relationship event explicitly tagged for Formal Introduction;
- that career must already be legally unlocked;
- the player must have completed at least **1 shift** in that career;
- the target relationship must not already be past its first professional stage;
- the same relationship ID may use the reward at most once per run.

A successful use may advance exactly into that relationship's normal **first professional stage** and consumes one use.

It may not:
- unlock the career;
- count as a shift or Hard Work;
- skip School/stage/item/capability/route facts;
- write downstream trust/conflict/romance facts;
- satisfy ending eligibility by itself;
- affect Activity relationships;
- affect Secret Debt-owned relationship state;
- grant Palace access/duty.

It consumes **1 normal Specialist slot**.

#### Inner Truth

Ending:
`ending.palace.inner-truth`.

Permanent reward:
**Source Method**
`palace.inner-truth.source-method`.

Layer:
**automatic knowledge/content**, not Specialist or Keystone.

Once earned, later lives automatically inherit it with no loadout cost.

Authored scenes that are already legally reachable may opt in to expose a source/provenance/contradiction cross-check choice.

That choice is information-only and may reveal:
- source provenance;
- direct vs reported observations;
- an authored contradiction already latent in the scene;
- uncertainty/risk context;
- comparison between already-obtained facts.

It may not directly change:
- money;
- Energy;
- progression stats;
- Lust;
- inventory;
- career/relationship/School counters or stages;
- Activity Field Time/Endurance/success;
- Palace duties;
- ending eligibility;
- loadout capacity.

It does not reveal inaccessible scenes, bypass capability gates, reveal the final mystery truth automatically, bypass Prince confrontation or activate cap-200.

#### Shared rules

- Service Life and Court Power rewards use the normal D28 Specialist capacity; there is no free Palace slot.
- Inner Truth is automatic knowledge and uses no strong-Meta slot.
- D24 Return Home True reward remains a separate optional cap-200 Specialist.
- all three preserve D23 Palace entry, D26, D29, D30/D32, D35, D36/D38 and Secret Debt forced-Night precedence.


### D40 — advanced ordinary endings tranche B (Guard / Merchant / Artist-Geisha / Assassin / Prostitute)

Accepted Product packet:
`chat3/ordinary-complex-endings-tranche-b-v10@7ed4ffbb97c1ab012a0c35a7703600623900fd28`.

The packet is accepted as exact Product authority for all **16** advanced endings in:
- Guard;
- Merchant;
- Artist/Geisha;
- Assassin;
- Prostitute.

This includes, exactly as frozen in the packet:
- stable ending IDs;
- selected-route facts;
- minimum career stage/shift gates;
- mandatory/optional School, Night, relationship, Activity and item inputs;
- D16 explicit commit boundaries;
- permanent reward identities;
- reward class;
- exact bounded reward mechanics;
- migration/ownership semantics;
- network-domain separation;
- no new raw ending-level stat thresholds.

Additional shared authority from the packet:
- every advanced branch writes exactly one persistent selected-route fact atomically with its outcome-ready transition;
- ending eligibility requires outcome-ready + the exact selected-route fact, so merely having multiple route-ready facts never makes unselected endings eligible;
- Guard/Merchant/Artist career-local School readiness facts use the D33-style publisher rule: corresponding track `lessons_completed >= 3` OR `night_study_sessions >= 3`, published exactly once; paid and Night Study counts are alternatives, not summed;
- no new certificate/project/exam subsystem is added;
- no Tranche B reward is a Keystone;
- automatic knowledge/content consumes no strong-Meta slot;
- Specialists consume one normal D28 Specialist slot;
- no reward bypasses D23, reduces Activity entry Energy, creates free Specialist capacity, or suppresses Secret Debt forced Night.

Final lore names/epilogues/presentation copy remain content-owned where the packet marks them OPEN.

### D41 — advanced ordinary endings tranche A (Lumber / Satyr Maid / Undead Farm / Tavern / Hunter)

Accepted Product packet:
`chat5/ordinary-complex-endings-tranche-a-v10@95c0f06449e0a62241e5286c8a95050c82346956`.

The packet is accepted as exact Product authority for all **14** advanced endings in:
- Lumber;
- Satyr Maid;
- Undead Farm;
- Tavern;
- Hunter.

This includes, exactly as frozen:
- stable ending IDs and legacy-ID retirement/migration rules;
- exact minimum shift/stage gates;
- mandatory/optional School, Night, relationship, Activity and item inputs;
- explicit D16 commit boundaries;
- permanent reward identities/classes;
- exact use limits/caps;
- idempotent migration for existing completed modern-compatible endings;
- retirement of stale broad legacy rewards where specified.

Important preserved rules:
- no new direct raw ending-level stat thresholds;
- Lumber Forewoman/Forest cannot be eligible before trusted-worker (8 shifts) and preserve D33/D34;
- Hard Work remains separate at 50;
- romance never becomes mandatory;
- Satyr Maid Boundary Mastery preserves explicit decline/consent semantics;
- Tavern legacy `tavern-stay/guild/court` are migrated/retired as specified and may not retain old Palace-shortcut semantics;
- Hunter advanced Activity routes remain distinct from D38 standalone Activity endings;
- no Tranche A reward is a Keystone;
- Specialists use normal D28 capacity;
- automatic knowledge/content uses no slot;
- no reward bypasses D23 or Secret Debt forced Night.

Final lore/epilogue/presentation copy marked OPEN in the packet remains content-owned.

### D42 — ordinary-career Night content gap blueprint

Accepted implementation packet:
`chat4/night-content-gap-blueprint-v9@1c52123c3e05b5d2ba2bfcf6f6b12e3291fd11e7`.

The packet's **12 stable Night surface IDs and exact authored contracts** are accepted for production.

Required surfaces:
- Lumber personal/social continuation;
- Hunter professional debrief;
- Hunter Senior Guide/companion;
- Guard professional case debrief;
- Guard Partner;
- Merchant professional ledger plan;
- Merchant Supplier;
- Assassin handler/informant;
- Prostitute personal continuation;
- D35 private-space seed: Satyr Maid recurring guest;
- D35 private-space seed: Tavern recurring traveler;
- D35 private-space seed: Prostitute recurring client.

Exactly the three D35 seed branches require `housingTier=normal`.

Shared invariants:
- no forced romance;
- confidence/Lust/Sexuality never imply consent;
- refusal/back-out cannot secretly publish progression success;
- ordinary Prostitute never inherits Secret Debt forced-route semantics;
- cheap retains School Night Study and public/workplace Night;
- Secret Debt forced Night suppresses voluntary/private-space Night;
- one completed global Night advances calendar exactly once;
- no broad affinity subsystem is introduced;
- Night surfaces may contribute presentation/route facts only as explicitly listed in the accepted packet.


### D43 — Palace daily cadence and duty economy

Accepted Product packet:
`chat6/palace-daily-cadence-economy-v14@7235004c5f8098ccb153646442af90f85af70a69`.

Palace uses a refined one-duty-per-day model independent of D26:

#### Structural duty cadence

- at most **1 progression-counting Palace structural duty per calendar day**;
- structural duty costs exactly **1 Energy**;
- structural duty does **not** end daytime;
- additional remaining Energy may be spent on other legal systems;
- extra Energy never permits a second structural duty that day;
- structural progression is capped at the accepted **15 duties**;
- there is no paid progression-counting duty 16+.

With a Day-1 D23 invitation and uninterrupted daily duties:
- duty 1 = Day 1;
- duty 15 = **Day 15**;
- earliest Outcome Ready / `palace.progression-complete` = **Day 15**.

#### Optional Palace support/prep

At most **1 Palace support/preparation daytime action per calendar day** may be performed.

It:
- costs **1 Energy**;
- pays **0 money**;
- does not increment Palace duty count;
- grants no routine progression stats;
- may occur on the same day as the structural duty if Energy remains;
- may continue as authored review/social/support content after duty 15 without reopening paid duty progression.

Accepted route-prep reference timing:
- Service Life prep may begin at duty 5 and complete its prep fact by duty 6;
- Court Power prep may begin at duty 8 and complete by duty 9;
- Inner Truth prep may begin at duty 12 and complete by duty 13;
- all three non-True route readiness states may coexist at Outcome Ready on Day 15 before explicit ending commit.

#### Structural duty wage

Each successfully committed structural duty pays:

`35 + min(20, floor((Reason + Wits + Manners + Sociability) / 20))`

money.

Properties:
- minimum wage = **35**;
- maximum wage = **55**;
- at 91 in all four wage stats = **53**;
- maximum total structural Palace pay over 15 duties = **825**;
- formula remains bounded even under cap-200;
- support/prep pays 0;
- no repeatable paid structural duty exists after duty 15.

Palace uses this distinct bounded wage formula rather than ordinary-career wage scaling.

#### Progression effects

Routine Palace structural duties:
- grant **no routine progression-stat package**;
- grant **no automatic Lust**;
- apply **no routine negative-stat package**.

Palace therefore does not become the main 12×91 stat-training engine.

One-time authored story consequences may exist later, but they are not routine Palace duty economy.

#### Lodging / Night

Normal, cheap and street lodging do not gate Palace daytime duty/support if final available Energy permits.

Palace Night:
- is optional;
- grants no duty count;
- grants no structural wage;
- refunds no daytime Energy;
- remains below Secret Debt forced Night in precedence.

#### Secret Debt interaction

If Palace access was legitimately opened under D23 in the current life, becoming Secret-Debt-bound:
- does **not** remove Palace access;
- does **not** reset Palace progression;
- does **not** suspend structural duty/support.

However:
- all ten ordinary careers remain locked under D19;
- Secret Debt forced Night still occurs;
- next-day Energy -1 is applied after relevant selected Energy modifier and before daytime spending;
- Palace duty/support spends from that final reduced Energy;
- Palace pay remains finite and capped by the remaining uncompleted structural duties;
- Palace cannot become a repeatable 20,000-money debt farm.

#### Atomicity / save safety

A structural duty commit must atomically:
1. validate Palace access;
2. validate `palaceDutyCount < 15`;
3. validate no structural duty already committed that calendar day;
4. validate Energy >=1;
5. resolve exact next duty ordinal;
6. compute wage from pre-duty wage stats;
7. spend 1 Energy;
8. pay wage;
9. increment duty count exactly once;
10. record the calendar-day duty lock and committed duty ID/ordinal;
11. apply milestone transition at 2/5/8/12/15;
12. write `palace.progression-complete` exactly once at duty 15.

Failed validation changes no Energy, money, duty count or daily lock.

Reload may resume pending reactions/milestones but may not duplicate Energy spend, wage, duty count or milestone publication.


### D44 — Secret Debt hidden-work economy and Takeover thresholds

Accepted Product packet:
`chat4/secret-debt-balance-decision-v11@fdef24962c751fa8d4d8595f64b7f00a0e4fff04`.

#### Hidden daytime work

Every committed hidden-work shift:
- costs the already-locked **1 Energy**;
- grants **Endurance +1**;
- grants **Sexuality +1**;
- grants **Lust +0**.

Seasonal negatives:
- **Summer: Reason -1**;
- **Winter: Sociability -1**;
- Spring/Autumn: no hidden-work negative package.

No other progression stat changes are routine hidden-work effects.

#### Hidden-work wage

Exact wage, evaluated from pre-shift values:

`round(30 + min(110, 0.70 * Endurance + 0.60 * Sexuality + 0.35 * Lust))`

Therefore:
- base = 30;
- Endurance coefficient = 0.70;
- Sexuality coefficient = 0.60;
- Lust coefficient = 0.35;
- weighted component cap = 110;
- absolute wage cap = **140**.

Acceptance anchors:
- E10 / Sexuality10 / Lust5 -> **45**;
- E30 / Sexuality30 / Lust15 -> **74**;
- E50 / Sexuality50 / Lust25 -> **104**.

Lust remains a positive wage input as required by D19, but hidden work and forced Night never raise Lust automatically.

#### Bound Life

The existing D19 milestone remains exactly:
- **50 hidden completed shifts**.

It is not ordinary Hard Work and does not modify the 10 ordinary-career Hard Work system.

#### Takeover / owner-kill-control route

The explicit Takeover action requires all of:
- hidden completed shifts >= **75**;
- Endurance >= **75**;
- Sexuality >= **75**;
- Wits >= **35**;
- Lust >= **30**;
- paid School lessons >= **10**;
- Secret Debt bound state active;
- explicit authored Takeover choice.

No threshold auto-commits the ending.

Sexuality and Lust are route/stat gates only:
- neither implies consent;
- neither overrides refusal;
- neither auto-selects intimacy/relationship actions.

Paid School lessons means paid lessons only; Night Study does not satisfy the 10-lesson Takeover requirement.

#### Existing D19 authority unchanged

D44 does not change:
- lender chance 20%;
- +2000 acceptance payment;
- exactly 10-day trap;
- 20000 debt;
- ordinary-career lock while bound;
- School/Activity availability;
- forced Night;
- next-day Energy -1;
- full-only 20000 repayment;
- D30/D32 future-run rewards;
- lodging prices;
- School tuition;
- ordinary-career wage formulas.


### D45 — Palace / Prince narrative authority

Accepted Product packet:
`chat6/palace-prince-narrative-authority-v17@f81c15252ae63e7edbda0e678732b3a790b01ccd`.

Canonical narrative model:
**Palace Concordance / Threshold Archive**.

Locked canon:
- the Palace is a real institution in the successor world;
- it performs ordinary visible administrative/service work and a protected second function;
- the protected function is stewardship of a real inter-world Threshold;
- the Palace maintains a Threshold Archive and Concordance that correlate evidence across otherwise separate life-sim domains;
- the successor world is real, not a dream/simulation/disposable copy;
- permanent ordinary Hard Work 10/10 represents lived breadth across all ten careers;
- active 10/10 current-run packages represent deliberate synthesis in this life;
- that exact D23 combination is what deterministic invitation protocol recognizes;
- the Prince is a person holding the Palace Custodian office, not a deity/avatar/chosen-one oracle;
- the Prince's doctrine is centralized closed custody of the Threshold;
- Palace 15-duty rotation is the Concordance rotation and the six stages represent increasing operational visibility/authority;
- `palace.progression-complete` means the heroine completed the full rotation and has enough authenticated context to judge Palace futures;
- Inner Truth reveals Threshold stewardship and authenticated crossing evidence, but not the ultimate cause/origin of the Threshold;
- Court Power controls institutional levers, not reality or the whole world;
- Service Life preserves operational continuity, boundaries, handoffs and institutional memory;
- Return Home is a real crossing to the heroine's original world; the successor world remains real and intact.

True-route narrative authority:
- all 12 progression stats >=91 remain the sole numeric readiness gate;
- Lust remains excluded and has no moral meaning;
- Prince confrontation is a deterministic authored proof/reconstruction challenge, not combat;
- confrontation requires Outcome Ready + `palace.progression-complete` + all 12 >=91;
- no additional numeric threshold is authorized;
- no romance/Night/Activity item/School result/relationship/advanced-career outcome is required;
- stable confrontation carrier: `palace.prince-confrontation`;
- explicit begin action: `palace.confront-prince`;
- durable success fact remains `palace.prince-defeated`;
- failure/back-out writes no defeat fact and no ending;
- retry is allowed while readiness remains true;
- no new Energy/money/item/Night/calendar penalty for retry;
- success never auto-commits Return Home;
- explicit D16 Return Home commit remains required.

Meaning of Prince defeat:
- the Prince's exclusive epistemic veto is disproved using authenticated Palace evidence;
- the heroine independently reconstructs a coherent return case;
- the Prince is not killed, physically defeated, magically dominated, romanced or necessarily deposed.

Intentionally unresolved:
- original cause of the heroine's displacement;
- who/what first created the Threshold;
- whether all historical crossings were intentional;
- whether the Prince's sincerity is pure, self-protective, political, or mixed;
- personal name/species/appearance/voice and final line-by-line prose remain production/content choices.

No D23/D29/D39/D43 mechanical gate or reward is changed by D45.


### D46 — 1.0 economy / start-balance closure

Accepted Product packet:
`chat4/product-economy-balance-closure-v13@285b0de5189350131cb34b210357112da04bca3b`.

Locked 1.0 values:

- fresh new-life starting Lust = **5**;
- existing/in-progress saves preserve stored Lust exactly; migration never rewrites it;
- ordinary-career wage stat weights remain unchanged;
- Lumber ordinary wage base = **35**;
- the other nine ordinary-career wage bases = **37**;
- final ordinary shift wage is capped at **120**;
- ordinary wage cap applies only to the ten ordinary professions;
- normal / cheap / street lodging remain **100 / 50 / 0** for all 160 days;
- there is **no later-year lodging escalation**;
- starting money remains **600**;
- base Energy remains **3**;
- all paid School tuition values and direct gain packages remain unchanged;
- Body Confidence remains exactly **+2 Lust** per paid lesson;
- School Night Study remains unchanged.

Exact ordinary wage policy:

```
ordinary_wage =
  min(
    120,
    round(
      current_career_base
      + 22
      + sum(wage_stat * existing_career_factor)
    )
  )
```

Equivalent base migration:
- Lumber: 13 -> **35**;
- Satyr Maid / Undead Farm / Tavern / Hunter / Guard / Merchant / Artist-Geisha / Assassin / Prostitute: 15 -> **37**.

Required preservation:
- D26 one same-career shift/day remains unchanged;
- D31 seasonal pressure and existing per-career wage identities remain unchanged;
- D32 money rewards remain capped at their accepted 1000/1000 limits and Work Rhythm remains max 20 rewarded days;
- D35 lodging/private-space semantics remain unchanged;
- D43 Palace wage remains its separate finite 35..55 formula with max 15 structural duties;
- D44 Secret Debt hidden-work wage remains its separate accepted formula with cap 140;
- ordinary professions remain unavailable while Secret-Debt-bound, so D46 ordinary wage changes cannot farm repayment;
- D24 cap-200 never raises an ordinary shift above 120.

Acceptance anchors for a later runtime producer:
- fresh all-1 Lumber wage = **36**;
- fresh all-1 Satyr Maid wage = **38**;
- fresh all-1 Undead Farm wage = **38**;
- the three Day-1 starter shifts gross **112**;
- no ordinary shift wage exceeds **120**;
- normal/cheap/street are still 100/50/0 on Days 1, 41, 81 and 121;
- paid School tuition/gains, Body Confidence +2 Lust and Night Study remain exact.

D46 closes the remaining numeric economy, starting-Lust, lodging-escalation and School-tuning Product blockers. Runtime implementation remains separate and must preserve existing saves.


## Still open after this lock

- exact ordinary profession -> selectable +5 stat mapping, under D22 breadth/Lust constraints;
- final authored Palace lore/prose within the locked D45 topology;
- macro mystery/lore not fixed by D45;
- final production art/media budget and missing-asset decisions.
