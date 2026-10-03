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


## Still open after this lock

- exact numeric economy;
- exact Lust starting value;
- exact ordinary profession -> selectable +5 stat mapping, under D22 breadth/Lust constraints;
- exact School curriculum/prices;
- exact Activity region count/mechanics;
- exact Palace daily cadence and authored content within the locked six-stage topology;
- macro mystery/lore;
- exact Secret Debt shift stat gains, wage coefficients, and owner-kill stat/Lust thresholds;
- production art/media budget.
