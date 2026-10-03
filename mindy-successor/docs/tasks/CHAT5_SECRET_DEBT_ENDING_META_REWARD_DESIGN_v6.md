# Chat 5 — Secret Debt ending Meta reward design v6

Status: **PROPOSAL ONLY — READY FOR PRODUCT SELECTION, NOT RUNTIME AUTHORITY**
Owner: Chat 5 / Full-Career Producer C
Branch: `chat5/secret-debt-ending-meta-rewards-v6`
Dispatch base: `0c8926049a4b4ee4fda0574cea588d39f39dd14e`

This document designs future-life Meta rewards for the three locked Secret Debt exits.

No runtime/data implementation is included.

## 1. Authority and non-negotiable boundaries

Locked Secret Debt exits:

1. **Paid Freedom** — full one-shot 20000 repayment;
2. **Bound Life** — hidden Hard Work analogue after 50 hidden daytime shifts, with voluntary ending commit;
3. **Takeover** — owner-kill/control outcome after the locked route/build/School requirements and explicit action.

D27 architecture:

- at most one broad **Keystone** may be active in a run;
- a separately limited number of directed **Specialists** may be active;
- exact Specialist capacity remains Product-open;
- pure knowledge/content unlocks may be automatic and consume no Keystone/Specialist capacity;
- ordinary D21–D23 Hard Work packages remain a separate unrestricted layer;
- D24 Palace cap-200 option is Specialist-class by default;
- Secret Debt forced next-day Energy -1 always applies after selected Energy modifiers;
- no housing/safety reward may cancel forced Secret Debt Night;
- no Meta reward may weaken Palace D23: permanent ordinary 10/10 + active ordinary 10/10 is still required for Day-1 invitation;
- Secret Debt never writes ordinary `hardWorkProgress`;
- no Titles are introduced.

Current save surfaces relevant to future implementation:

- `meta.completedEndings` — completion ownership proof;
- `meta.unlocks` — permanent unlocked reward/content IDs;
- `meta.ruleModifiers` — parameterized Meta rule values;
- `meta.activeLegacyPerks` — existing selectable-perk surface;
- `meta.hardWorkProgress` — **ordinary Hard Work only; forbidden for Secret Debt reward ownership**;
- `run.endings.result.appliedMetaRewardIds` — exactly-once ending reward transaction evidence.

Current `MetaReward` schema can persist an unlock ID, but D27 Keystone/Specialist category, capacity validation and run-local charges still need a dedicated/typed loadout layer before runtime implementation. This document does not invent that implementation by side effect.

## 2. Benchmark effects used for dominance review

Every candidate below is compared with these strong reference roles.

### +1 daily Energy

D27 class: **Keystone** if approved.

This is one of the strongest broad action-economy effects:
- affects work;
- School;
- Activity;
- recovery flexibility;
- indirectly economy.

Secret Debt forced Night -1 still has to apply after it.

### Cap 200

D24 Palace True reward.

D27 class: **Specialist** by default.

It is late-build power:
- raises only the cap of the 12 progression stats;
- grants no Day-1 stats;
- does not affect Lust;
- does not itself improve money, Energy, housing or access.

### No Rent

Catalog role: normal lodging costs 0.

Under D27, if approved in this broad form it is a **Keystone** housing/economy modifier.

It can save up to the full normal-lodging cost repeatedly and is therefore much stronger over a long run than a small finite housing reserve.

It must never cancel Secret Debt forced Night.

### Starting money

Current prototype starts at 600 before legacy/old reward consumers.

A large starting-money bonus is highly flexible:
- lodging;
- School;
- items;
- debt savings;
- other costs.

Therefore restricted credits/refunds below are intentionally evaluated against equivalent unrestricted cash.

### Passive income

Catalog role: daily network income.

Under D27, substantial passive income is **Keystone** class.

Passive income scales with run length and requires no action, so a finite/capped economy reward should not accidentally outperform a large daily stipend.

---

# 3. Paid Freedom reward family

Design identity:
**planning, solvency and economic safety without deleting future debt tension.**

## PF-C — conservative: Contract Sense

Mechanical effect:
- when an economic obligation/contract is already presented to the player, show an explicit consequence panel:
  - immediate cost/gain;
  - delayed activation date if known;
  - one-shot vs recurring payment form;
  - currently affordable / not affordable;
- does **not** reveal unseen Secret Debt;
- does **not** alter the 20% lender RNG;
- does **not** add a refusal choice;
- does **not** change price, debt, timing or income.

D27 class:
**automatic knowledge/content unlock — no Keystone/Specialist slot.**

Future-run use case:
- planning-heavy player;
- Merchant/economic routes;
- understanding large one-time commitments before accepting them.

Interaction / dominance risks:
- +1 Energy: no competition; information only.
- cap 200: orthogonal.
- No Rent: weaker; gives no housing economy.
- starting money: weaker; gives no money.
- passive income: weaker; gives no money.
- Secret Debt: safe only if the panel appears **after** the lender scene is legitimately surfaced. Pre-revealing an unseen lender would suppress discovery tension and is forbidden.

Required save/UI representation:
- permanent ownership ID in `meta.unlocks`, e.g. `secret-debt.paid-freedom.contract-sense`;
- no ruleModifier;
- automatic UI annotation on eligible already-visible offers;
- no active-perk selector entry because this is pure knowledge/content.

Required tests:
1. completion grants unlock exactly once;
2. fresh future run keeps normal lender RNG/discovery;
3. unseen lender has no extra UI hint;
4. surfaced lender shows the consequence panel;
5. accept/refuse mechanics are unchanged;
6. no money/Energy/housing/stat delta differs with the unlock active.

## PF-D — distinctive: Emergency Lodging Fund

Mechanical effect:
- selectable future-run **Specialist**;
- grants a finite **600 housing-credit balance** per run;
- credit may pay only `normal` or `cheap` lodging;
- it is not cash and cannot pay:
  - School;
  - items;
  - Secret Debt repayment;
  - ordinary action costs;
- unused credit expires with the run;
- forced Secret Debt Night still occurs normally after lodging;
- Street lodging remains unchanged.

D27 class:
**Specialist** — directed housing/safety support, finite and narrow.

Future-run use case:
- early-run housing stability;
- School-heavy or Activity-heavy build that wants to reserve cash for tuition/items;
- player who wants less poverty pressure without selecting No Rent as the run-defining Keystone.

Interaction / dominance risks:
- +1 Energy: weaker and narrower; it does not create actions.
- cap 200: orthogonal.
- No Rent: deliberately dominated long-term. No Rent can erase normal lodging cost indefinitely; this fund stops after 600.
- starting money: 600 unrestricted cash strictly has more use cases. The fund can be balanced as a Specialist specifically because it is restricted.
- passive income: weaker; finite 600 versus recurring money.
- Secret Debt: it indirectly preserves some cash, but cannot directly pay the 20000 repayment and cannot suppress forced Night. Maximum route assistance is bounded by the 600 credit cap.

Required save/UI representation:
- ownership ID in `meta.unlocks`;
- selection ID in the future D27 Specialist loadout;
- run-local remaining credit, e.g. dedicated loadout runtime state `housingCreditRemaining: 600`;
- **do not** store spent/remaining credit in permanent `meta.ruleModifiers`;
- lodging UI displays "housing credit used / remaining" before confirmation.

Required tests:
1. selecting the Specialist initializes exactly 600 run-local credit;
2. unselected run initializes 0;
3. normal/cheap lodging consumes credit before cash according to defined payment order;
4. Street consumes none;
5. School/item/repayment cannot spend credit;
6. save/reload preserves remaining credit exactly;
7. new run resets charge balance to 600 if selected;
8. Secret Debt forced Night still fires and next-day Energy -1 still applies;
9. Palace D23 eligibility is unchanged.

## PF-S — strong-but-bounded: Earned Reserve Match

Mechanical effect:
- selectable future-run **Keystone**;
- while not bound by Secret Debt, the first **1000 money earned from ordinary profession shifts** in a run receives a 1:1 matched reserve;
- total bonus money is capped at **+1000 per run**;
- money from School/Activity/items/passive income does not qualify;
- Secret Debt hidden-work wages do not qualify while bound;
- the reward never matches the +2000 lender grant or the 20000 repayment.

D27 class:
**Keystone** — broad early-run economy modifier, despite its cap.

Future-run use case:
- work-first opener;
- accelerates establishment through legitimate ordinary-career labor;
- useful for School tuition, lodging or item investment after the player has actually worked.

Interaction / dominance risks:
- +1 Energy: generally weaker for long/action-heavy runs; +1 Energy can generate many extra shifts/lessons/Activities. Reserve Match is finite at +1000.
- cap 200: orthogonal; cap 200 dominates only late stat-ceiling play.
- No Rent: No Rent can exceed 1000 saved money after 10 normal nights and keeps scaling; Reserve Match is more flexible cash but capped.
- starting money: +1000 starting money is strictly earlier; Reserve Match requires earning 1000 from ordinary work first.
- passive income: a substantial daily stipend can exceed +1000 over a run; Reserve Match is front-loaded but bounded.
- Secret Debt: explicit **bound-state exclusion** is mandatory. Otherwise extra matched hidden wages would erode the 20000 repayment tension.
- ordinary career lock: while bound, ordinary shifts are unavailable, so no match progress can be generated through the locked domain.

Required save/UI representation:
- permanent ownership ID in `meta.unlocks`;
- selected as the one active Keystone;
- run-local counters:
  - `eligibleOrdinaryWageEarned`;
  - `reserveMatchPaid` capped at 1000;
- Work result UI shows matched amount and remaining cap;
- selected loadout screen explicitly states "does not apply to Secret Debt hidden work."

Required tests:
1. cannot be active with another Keystone;
2. ordinary wage earns matching money until exactly +1000 bonus;
3. non-work money does not match;
4. Secret Debt hidden wage never matches;
5. bound ordinary-career lock remains in force;
6. save/reload cannot duplicate matched money;
7. new run resets run-local counters;
8. forced Night and -1 Energy unchanged;
9. Palace D23 still requires ordinary 10/10 active packages.

---

# 4. Bound Life reward family

Design identity:
**surviving constrained routines, poverty knowledge and directed action efficiency.**

## BL-C — conservative: Underclass Familiarity

Mechanical effect:
- hidden poverty contacts, support locations and poverty-route context become visible earlier in future runs;
- may expose extra explanatory/knowledge options in already-reached poverty scenes;
- grants no money, housing, Energy, stat gain or automatic route success;
- does not reveal Secret Debt lender RNG before its normal scene.

D27 class:
**automatic knowledge/content unlock — no Keystone/Specialist slot.**

Future-run use case:
- exploration player;
- poverty/recovery route discovery;
- faster understanding of low-resource options without numeric easing.

Interaction / dominance risks:
- +1 Energy / No Rent / starting money / passive income: strictly weaker numerically.
- cap 200: orthogonal.
- risk is information becoming de facto access. The unlock must not directly unlock paid lodging, careers, Palace, or Secret Debt.
- cannot convert "earlier visibility" into automatic completion/availability of routes whose gates are still unmet.

Required save/UI representation:
- permanent unlock ID in `meta.unlocks`;
- automatic map/journal/help annotations;
- no D27 loadout slot;
- UI labels discovered support contacts as known, not automatically available.

Required tests:
1. unlock persists across runs;
2. poverty contact hints become visible at intended earlier context;
3. gated routes still fail their normal conditions;
4. lender chance/discovery unchanged;
5. no money/Energy/housing/stat delta;
6. Palace invitation logic unchanged.

## BL-D — distinctive: Routine Reserve

Mechanical effect:
- selectable **Specialist**;
- start each run with **8 Routine charges**;
- a charge may reduce the Energy cost of a paid School lesson or Large Activity entry by **1**, minimum final cost 1;
- at most one charge may be spent on a single action;
- charges cannot affect:
  - ordinary profession shifts;
  - Secret Debt hidden work;
  - lodging;
  - Night choices;
  - ending actions;
- charges never regenerate inside the run.

D27 class:
**Specialist** — directed School/Activity efficiency with finite charges.

Future-run use case:
- student/explorer hybrid;
- helps fit School or Activity into tight days without being a universal Energy increase;
- especially attractive for high-cost 2-Energy Activity.

Interaction / dominance risks:
- +1 daily Energy: deliberately weaker. +1 daily Energy applies every day and every system; Routine Reserve saves at most 8 Energy and only in School/Activity.
- cap 200: complementary; Reserve helps reach stats, cap 200 allows later ceiling.
- No Rent / starting money / passive income: orthogonal except that cheaper Energy can indirectly earn/save money by freeing actions.
- Secret Debt: charges may make voluntary School/Activity easier while bound, which D19 allows, but they never reduce forced Night or its -1 penalty.
- minimum cost 1 avoids zero-cost School/Activity loops.

Required save/UI representation:
- ownership ID in `meta.unlocks`;
- Specialist selection;
- run-local integer `routineChargesRemaining = 8`;
- School and Activity buttons show optional "spend Routine charge" toggle and effective Energy cost;
- no automatic spending without explicit player choice.

Required tests:
1. exactly 8 charges on selected new run;
2. charge reduces eligible Energy cost by exactly 1 and never below 1;
3. ordinary work/hidden work/lodging/Night cannot consume or benefit from charges;
4. charge spending survives save/reload exactly once;
5. no auto-consumption on disabled/failed action;
6. forced Night -1 still applied after all Energy modifiers;
7. charges reset next run;
8. Palace D23 unaffected.

## BL-S — strong-but-bounded: Work Rhythm

Mechanical effect:
- selectable **Keystone**;
- after completing at least one **ordinary profession shift** on a day, the next calendar day receives **+1 usable Energy**;
- non-stacking;
- maximum **20 triggered bonus days per run**;
- Secret Debt hidden shifts do not trigger it;
- if the character is bound on a bonus day, Secret Debt forced Night -1 still applies after the selected Energy modifier:
  - same loadout unbound: +1;
  - same loadout bound: one less usable Energy.

D27 class:
**Keystone** — repeated action-economy modifier tied to broad ordinary work.

Future-run use case:
- work-chain / multi-career runs;
- rewards maintaining a labor rhythm;
- can support D26 multi-career planning without changing one-shift-per-same-career cadence.

Interaction / dominance risks:
- +1 daily Energy: strictly more conditional and capped. Permanent +1 daily Energy is stronger on non-work days and after 20 triggers.
- cap 200: orthogonal.
- No Rent: different axis; one saves money, one grants conditional actions.
- starting money: stronger immediately; Work Rhythm requires a prior ordinary shift.
- passive income: different axis but extra Energy can create extra wage. Cap of 20 bonus days limits economic conversion.
- Secret Debt: ordinary careers are locked while bound and hidden shifts do not trigger new charges. A pending pre-bound bonus may still apply for one day, but forced -1 must remain visible relative to the same loadout.
- must not bypass D26 same-career daily limit.

Required save/UI representation:
- ownership ID in `meta.unlocks`;
- selected as Keystone;
- run-local:
  - `workRhythmTriggersUsed` (0..20);
  - `workRhythmBonusTomorrow` boolean;
- end-of-day UI indicates tomorrow's earned +1;
- HUD next day displays source breakdown, including Secret Debt -1 if bound.

Required tests:
1. cannot coexist with another Keystone;
2. ordinary shift arms exactly one next-day +1;
3. multiple ordinary shifts same day do not stack;
4. no more than 20 bonus days;
5. School/Activity/hidden work alone do not arm it;
6. D26 same-career pacing unchanged;
7. bound day receives forced -1 after Work Rhythm +1;
8. reload before/after day transition neither drops nor duplicates bonus;
9. Palace D23 unchanged.

---

# 5. Takeover reward family

Design identity:
**underworld knowledge, controlled access and network capital — power without making Palace or Secret Debt disappear.**

## TO-C — conservative: Debt Network Intel

Mechanical effect:
- underworld/debt/grey-market contacts already reachable in the current run expose more information:
  - who controls the route;
  - known price/risk category;
  - which stat/School/relationship domain is relevant;
- selected future route rumors may appear earlier;
- no free item, money, access pass or success check.

D27 class:
**automatic knowledge/content unlock — no Keystone/Specialist slot.**

Future-run use case:
- investigation/route-planning player;
- useful in Merchant/Guard/Assassin-adjacent grey-market content without replacing their progression.

Interaction / dominance risks:
- numerically weaker than +1 Energy, No Rent, starting money and passive income.
- cap 200 is unrelated.
- must not expose Palace invitation/access early.
- must not pre-reveal the unseen Secret Debt lender.
- "Intel" cannot satisfy any access condition; it only displays information.

Required save/UI representation:
- permanent unlock ID in `meta.unlocks`;
- automatic journal/map/contact annotations;
- no D27 slot;
- presentation should distinguish "known" from "available."

Required tests:
1. information appears for approved underworld contexts;
2. unavailable routes remain unavailable;
3. Secret Debt encounter RNG/discovery unchanged;
4. no money/Energy/stat/housing change;
5. Palace invitation remains absent until D23.

## TO-D — distinctive: Inside Leverage

Mechanical effect:
- selectable **Specialist**;
- once per run, the player may spend one **Leverage token** to open an alternate resolution in an authored underworld/grey-market/social-pressure event;
- the alternate must be explicitly authored per event;
- token cannot:
  - unlock or satisfy an ordinary career gate;
  - unlock Palace;
  - replace D23 all-ten-active condition;
  - reveal/decline Secret Debt lender before its normal encounter;
  - remove forced Night;
  - clear Secret Debt;
  - bypass an ending requirement;
- alternate routes may change risk/cost/relationship consequences but are not automatic success.

D27 class:
**Specialist** — narrow access/resolution modifier.

Future-run use case:
- route-control player;
- Guard/Merchant/Assassin/relationship grey-market crossover;
- one decisive "I know how this system works" intervention.

Interaction / dominance risks:
- +1 Energy: Leverage is narrower but can be more valuable in one authored situation.
- cap 200: orthogonal.
- No Rent / starting money / passive income: no raw economy unless a specific authored choice changes a cost; any such savings must be local and bounded.
- strongest risk is accidental gate substitution. Event allowlist must be explicit, never condition-pattern based.
- no Palace or Secret Debt core event may enter the allowlist unless later separately approved.

Required save/UI representation:
- ownership ID in `meta.unlocks`;
- selected Specialist;
- run-local `insideLeverageCharges = 1`;
- authored event definition marks an alternate choice as `requiresMetaLeverage`;
- choice UI shows token cost before confirmation.

Required tests:
1. one token per selected run;
2. only allowlisted authored choices appear;
3. spending survives reload without duplication;
4. non-allowlisted career/Palace/Secret Debt gates cannot see the token;
5. no automatic event success;
6. Palace D23 unchanged;
7. ordinary career availability unchanged;
8. forced Night / repayment / debt unchanged.

## TO-S — strong-but-bounded: Network Retainer

Mechanical effect:
- selectable **Keystone**;
- receive **25 money at the start of each day for the first 40 calendar days**;
- maximum benefit = **1000 money per run**;
- while Secret Debt is in active `bound` state, payment is **paused**;
- paused days are not banked or paid later;
- no payment after day 40.

D27 class:
**Keystone** — passive income is explicitly broad under D27, even though this version is capped.

Future-run use case:
- capital-first route;
- steady School/lodging/item funding;
- player who prefers predictable cashflow over action economy.

Interaction / dominance risks:
- +1 daily Energy: usually stronger in action-heavy/wage-heavy play because Energy can create work + School + Activity. Retainer is capped at 1000.
- cap 200: orthogonal.
- No Rent: normal No Rent can save 100/day and exceeds 1000 after 10 normal nights; Retainer is flexible money but much smaller over a full run.
- starting money: +1000 starting money dominates timing because it is available Day 1; Retainer spreads the same maximum across 40 days.
- passive income benchmark: this **is** passive income and therefore correctly Keystone-class. The 40-day/1000 cap is the bounding mechanism.
- Secret Debt: **pause while bound is mandatory**. Otherwise the reward would directly subsidize the 20000 repayment and reduce the intended trap tension.
- discovery/forced Night/domain lock are untouched.

Required save/UI representation:
- permanent unlock ID in `meta.unlocks`;
- selected as Keystone;
- rule parameters may live in typed `meta.ruleModifiers`:
  - daily amount 25;
  - active through day 40;
  - pause domain `secret-debt.bound`;
- run-local count of payments actually applied or deterministic day ledger for idempotence;
- morning journal/HUD entry identifies Retainer payment or bound-state pause.

Required tests:
1. cannot coexist with another Keystone;
2. exactly +25 once per eligible day;
3. no payment after day 40;
4. total maximum is 1000;
5. bound Secret Debt day pays 0;
6. bound-day missed payment is never reimbursed later;
7. save/reload at day start cannot duplicate payment;
8. forced Night -1 and ordinary-career lock unchanged;
9. repayment remains exact 20000;
10. Palace D23 unchanged.

---

# 6. Cross-candidate dominance matrix

Legend:
- **<** deliberately weaker / narrower;
- **≈** comparable but different axis;
- **> in niche** can outperform only in its directed use case.

| Reward concept | +1 daily Energy | Cap 200 | No Rent | Starting money | Passive income |
| --- | --- | --- | --- | --- | --- |
| Contract Sense | < | orthogonal | < | < | < |
| Emergency Lodging Fund | < | orthogonal | < | < unrestricted 600 | < |
| Earned Reserve Match | < over long run | orthogonal | < long-run savings, > flexibility after earned | < +1000 Day-1 money | < substantial recurring |
| Underclass Familiarity | < | orthogonal | < | < | < |
| Routine Reserve | <; max 8 directed Energy | complements | orthogonal | orthogonal | orthogonal |
| Work Rhythm | < permanent +1; max 20 conditional days | orthogonal | ≈ different axis | > only after work chain | ≈ but action-derived |
| Debt Network Intel | < | orthogonal | < | < | < |
| Inside Leverage | > in one authored access niche only | orthogonal | orthogonal | orthogonal | orthogonal |
| Network Retainer | < action-heavy +1 Energy | orthogonal | < after 10 normal nights | < +1000 upfront | bounded passive-income form |

No proposed Secret Debt reward dominates **all** benchmark categories.

The three strong concepts intentionally occupy different roles:
- Paid Freedom Keystone => **earned early capital**;
- Bound Life Keystone => **conditional work action economy**;
- Takeover Keystone => **bounded passive capital**.

Because D27 permits at most one Keystone, these are choices rather than cumulative compounding.

---

# 7. Required global invariants for any selected Secret Debt reward

Regardless of which candidate Product chooses:

1. **Secret Debt discovery remains intact**
   - no reward changes the unseen 20% lender chance;
   - no automatic refusal;
   - no pre-reveal of the encounter.

2. **Trap timing/economy remains intact**
   - +2000 acceptance unchanged;
   - 10-day delay unchanged;
   - 20000 debt unchanged;
   - repayment remains one all-at-once 20000 action.

3. **Bound Night remains intact**
   - forced Night every bound night;
   - voluntary Night suppressed;
   - next-day Energy -1 still applies after any selected Energy modifier.

4. **Ordinary career lock remains intact**
   - all ten ordinary profession domains stay locked while bound;
   - prior progress preserved;
   - rewards cannot generate ordinary-career progression while locked.

5. **Palace D23 remains intact**
   - Secret Debt reward ownership never enters `hardWorkProgress`;
   - Secret Debt selected reward never counts among the ten ordinary packages;
   - no reward emits Palace invitation or substitutes for active ordinary 10/10.

6. **D24 cap 200 remains separate**
   - Secret Debt reward selection never silently enables or disables cap 200;
   - cap 200 consumes its own Specialist classification when active under D27.

7. **Ordinary Hard Work layer remains unrestricted and separate**
   - activating a Secret Debt Keystone/Specialist does not consume or deactivate ordinary D21–D23 bonus packages.

---

# 8. Save / UI architecture recommendation

This is design guidance only; no schema change is implemented here.

## Ownership

Ending completion should continue to use the existing exactly-once ending transaction:
- completion recorded in `meta.completedEndings`;
- selected reward ownership represented by a stable ID in `meta.unlocks`;
- `run.endings.result.appliedMetaRewardIds` records first-completion transaction rewards.

Secret Debt ending reward must **not** use `kind:'hardWork'`.

## D27 selection

The current schema has `activeLegacyPerks`, but final D27 needs typed validation:
- 0..1 active Keystone;
- Specialist list with Product-defined capacity later;
- automatic knowledge unlocks outside both lists.

Implementation may migrate/replace `activeLegacyPerks`; this design does not require preserving that field name.

## Rule parameters

Stable numeric configuration for selected rewards can use a typed registry projecting into `meta.ruleModifiers`, but counters/charges spent inside one life must be **run-local**, not permanent Meta.

Examples:
- lodging credit remaining;
- Reserve Match amount paid;
- Routine charges remaining;
- Work Rhythm triggers used;
- Leverage token remaining;
- Retainer payments applied.

## New Start UI

Every selectable reward card should display:
- ending source;
- D27 class;
- mechanical effect;
- exact cap/charges if any;
- explicit Secret Debt interaction line;
- conflict state if another Keystone is active.

Knowledge/content unlocks should appear as permanent inherited knowledge, not as loadout cards.

---

# 9. Product-decision shortlist

This document intentionally does not rank or select the rewards.

For each ending, Product can choose among three different strength levels:

| Ending | Conservative | Distinctive | Strong-but-bounded |
| --- | --- | --- | --- |
| Paid Freedom | Contract Sense — automatic knowledge | Emergency Lodging Fund — Specialist | Earned Reserve Match — Keystone |
| Bound Life | Underclass Familiarity — automatic knowledge | Routine Reserve — Specialist | Work Rhythm — Keystone |
| Takeover | Debt Network Intel — automatic knowledge | Inside Leverage — Specialist | Network Retainer — Keystone |

All nine remain proposals until explicitly promoted by Product/Leader.
