# Chat 4 — Night System Completeness Audit v8

Status: **READY FOR LEADER PRODUCT DECISION**  
Owner: Chat 4  
Branch: `chat4/night-system-completeness-audit-v8`  
Audited executable baseline: `main@9f9a3c5b27e972a35c07d09a8784e06597ba8a69`  
Companion inventory: `mindy-successor/research/night_system_coverage_v1.csv`

This packet audits Night as a **full 1.0 gameplay system**, not only Sleep or School.

No production runtime/content/UI code is changed by this branch.

---

## 1. Executive conclusion

The current **generic Night lifecycle is substantially more complete than the authored Night game**.

The core already has:
- an explicit Night state machine;
- pre-lodging, post-lodging and post-choice resolver intercepts;
- forced-event policy flags;
- lodging payment idempotence;
- voluntary Night selection;
- queued next-day effects;
- pending-scene save/reload support;
- probabilistic forced-scene snapshot preservation;
- exactly-one calendar advance;
- blocking of daytime actions while Night is unresolved.

The current executable content has exactly:

- **37 voluntary Night choices**;
  - 1 ordinary Sleep;
  - 24 School Night Study choices;
  - 12 career/relationship choices;
- **3 lodging choices**;
- **0 production Secret Debt forced-Night consumers**;
- **0 production Palace Night choices**;
- **0 Activity/camp Night surfaces**;
- **0 normal-lodging-only private-space Night choices**, despite D35 requiring three initial seeds.

The largest ordinary-career coverage gap is exact:

| Career | Current authored Night choices |
|---|---:|
| Lumber | 1 |
| Satyr Maid | 2 |
| Undead Farm | 2 |
| Tavern | 2 |
| Hunter | **0** |
| Guard | **0** |
| Merchant | **0** |
| Artist/Geisha | 3 |
| Assassin | 1 |
| Prostitute | 1 |

Therefore Night is **not yet a complete 1.0 authored system**, even though its generic engine is close to a reusable 1.0 lifecycle.

---

# 2. Authority reviewed

This audit reads and preserves:

- `NIGHT_AND_ACTIVITY_CONTRACT_v1.md`;
- `RELATIONSHIP_SYSTEM_DRAFT_v0.md`;
- `HOUSING_AND_NIGHT_BALANCE_v1.md`;
- all 10 ordinary career drafts;
- Secret Debt Product authority D19;
- voluntary School Lust rule D20;
- Palace topology D29;
- private-space lodging rule D35;
- current `definitions.json`;
- current Night-related content packs;
- current Night presentation/runtime paths;
- current Night focused tests.

No open design number or route mechanic is promoted into production authority by this audit.

---

# 3. Current executable Night topology

The core flow remains:

```text
EndDayRequested
-> PreLodgingForcedCheck
-> LodgingResolution
-> PostLodgingForcedCheck
-> VoluntaryNightChoice
-> NightEventResolution
-> NextDayModifiersFinalized
-> CalendarAdvance
-> StartDay
```

The generic runtime supports forced Night interception at:

- `before_lodging`;
- `after_lodging`;
- `after_choice`.

A forced event can explicitly declare:

- `suppressLodgingPayment`;
- `suppressVoluntaryMenu`;
- `consumesNight`;
- next-day effects.

This is enough generic machinery for Secret Debt and Palace precedence. Their production consumers are the missing part.

---

# 4. Current lifecycle quality

## 4.1 Exactly-one calendar advance

The engine commits calendar advance through one Night completion path and guards it with `calendarAdvanceCommitted`.

Focused `night-flow.test.ts` already checks:
- normal Night;
- forced pre-lodging Night;
- post-lodging forced Night;
- relationship Night;
- repeated command after completion;
- exactly one day increment.

**Assessment: core-ready.**

## 4.2 Save/reload

Existing focused coverage includes:

- reload after lodging payment;
- reload with pending post-lodging forced scene;
- probabilistic pending forced scene reload without RNG reroll;
- pending relationship Night scene;
- School Night Study reload;
- Lumber Foreman pending Night reload.

The parser validates:
- selected lodging identity;
- selected Night choice identity;
- Night phase consistency;
- pending Night intercept consistency.

**Assessment: core-ready, but every new route-owned forced/Palace Night still needs its own focused reload regression.**

## 4.3 Next-day effects

School Night Study correctly:
- spends no daytime Energy;
- applies immediate study progress;
- queues next-day Energy `-1`;
- applies exactly once.

Street lodging queues:
- Energy `-1`;
- Grooming `-1`.

Current ordinary career Night choices do not implicitly apply an Energy penalty.

**Assessment: reusable contract is good.**

---

# 5. Current presentation coverage

Night selection UI is shared.

All choices can render a label and be selected, but per-choice presentation depth is uneven.

## Dedicated Night presentation slots

Current dedicated choice presentation exists for:

- Tavern:
  - `tavern.night.traveler-request`;
  - `tavern.night.house-notes`;
- Artist/Geisha:
  - `artist-geisha.night.rehearsal`;
  - `artist-geisha.night.salon`;
  - `artist-geisha.night.mentor-review`.

## Partial specialized UI

Satyr Maid and Undead Farm have specialized choice labeling/ARIA handling, but the selected sequence still falls back to generic `night/default`.

## Generic presentation only

Current selected Night presentation is generic for:
- Sleep;
- School Night Study;
- Lumber;
- Satyr Maid sequence;
- Undead Farm sequence;
- Prostitute;
- Assassin.

This is not a mechanics blocker, but it is a visible 1.0 presentation-depth gap for route-significant Night content.

---

# 6. Housing / lodging coverage

Current prices and effects remain:

| Lodging | Cost | Next-day effect |
|---|---:|---|
| Normal | 100 | none |
| Cheap | 50 | none |
| Street | 0 | Energy -1, Grooming -1 |

School Night Study is explicitly available from:
- normal;
- cheap.

It is unavailable from street.

That matches D35.

However, current executable Night choices contain **no normal-only private-space branch**.

Therefore D35's required initial production seeds are all missing:

1. Satyr Maid recurring guest private-space branch;
2. Tavern recurring traveler private-space branch;
3. Prostitute recurring client/relationship private-space branch.

The current schema already has `housingTier` conditions.

So these three branches do **not** need a new generic housing engine. They can consume existing `housingTier=normal` authority.

---

# 7. Relationship / consent boundary

The relationship contract is explicit:

- a stat/content gate may expose an option;
- a voluntary romance/sexual branch remains a separate player command;
- Sexuality may describe confidence/style;
- Sexuality does not imply consent;
- high Lust may expose voluntary content, not auto-select it.

D20 separately says:

- paid Body Confidence lesson grants Lust +2;
- Lust remains separate from Sexuality;
- forced Secret Debt Night does not automatically raise Lust.

Therefore Night authoring must preserve this invariant:

```text
confidence / Sexuality / Lust
!=
consent
```

A relationship Night branch may require a confidence/stat/route condition, but entering intimacy must remain an explicit authored player choice.

---

# 8. 10-career Night matrix

## 8.1 Lumber

### Current Night choices

- `lumber.foreman.night`.

Current effects:
- Foreman `night_meetings +1`;
- downstream `night-followup-complete`.

### Professional/non-romantic continuation

**Present.**

The current route is explicitly `route-professional`.

### Optional relationship/romance continuation

**Missing as a distinct authored personal branch.**

The current Foreman relationship machine contains only:
- unknown;
- professional;
- route-professional.

A friendship/personal/romance branch would require explicit new relationship facts/stages or an equivalent relationship extension; it must not be inferred from the professional route.

### School transfer/reflection

**Strong.**

D33 explicitly accepts three Literacy & Numbers paid lessons **or three Night Study sessions** as canonical management readiness.

### Housing/private-space

**No authored private-space Night branch.**

Not specifically required by D35 seed list.

### Activity/camp

Lumber has `lumber.forest` Activity, currently `same_day`.

There is no camp Night integration.

### Route/ending contribution

Current Foreman Night contributes to the professional Forewoman/management relationship chain.

### Missing 1.0 surfaces

- distinct optional personal/social relationship Night if Product wants the draft's friendship/romance breadth;
- optional Forest/camp aftercare could deepen the route but is not required for the minimum career bar.

---

## 8.2 Satyr Maid

### Current Night choices

- `satyr-maid.night.recurring-guest`;
- `satyr-maid.night.staff-debrief`.

### Professional/non-romantic continuation

**Present.**

Staff debrief writes career facts.

### Optional relationship/romance continuation

**Present as an optional relationship continuation.**

Recurring guest Night:
- requires explicit accepted Night response;
- advances the recurring-guest relationship;
- records Night meetings.

It is not automatically romance.

### School transfer/reflection

**Present at system level; career School mappings are authored.**

School Night Study competes for the same Night slot.

### Housing/private-space

**Locked D35 seed is missing.**

Current recurring-guest Night has no `housingTier=normal` requirement and therefore is not the required private-space branch.

### Activity/camp

No Satyr-specific major Activity/camp Night surface.

### Route/ending contribution

Night feeds Personal Network / recurring-guest content and staff-career continuity.

### Missing 1.0 surfaces

- D35 private-space recurring-guest branch, normal lodging only;
- presentation depth beyond generic selected-Night fallback.

---

## 8.3 Undead Farm

### Current Night choices

- `undead-farm.night.keeper-request`;
- `undead-farm.night.process-notes`.

### Professional/non-romantic continuation

**Present.**

Process notes writes career progression facts.

### Optional relationship/romance continuation

**Present as relationship continuation.**

Keeper Night:
- records Night meeting;
- advances relationship;
- remains compatible with professional/family-like/non-romance routes.

### School transfer/reflection

**Present.**

Draft explicitly connects Arcana / literacy-accounting to Research and Successor routes, while Night Study supplies School counters.

### Housing/private-space

No private-room branch.

Not part of D35's mandatory initial seed list.

### Activity/camp

Draft expects anomaly/Activity return hooks, but no dedicated Undead Farm Activity exists in current top-level Activity definitions.

No camp Night.

### Route/ending contribution

Keeper Night and process notes contribute to professional relationship / Successor route depth.

### Missing 1.0 surfaces

No minimum two-surface gap.

Optional future anomaly-return Night could add route depth without becoming a quota requirement.

---

## 8.4 Tavern

### Current Night choices

- `tavern.night.traveler-request`;
- `tavern.night.house-notes`.

### Professional/non-romantic continuation

**Present.**

House notes writes career facts.

### Optional relationship/romance continuation

**Present as optional recurring-traveler relationship content.**

It is not automatically romance.

### School transfer/reflection

**Present at system level and career authored level.**

Accounting/literacy and rhetoric support Innkeeper / Information Broker paths.

### Housing/private-space

**Locked D35 seed missing.**

Current traveler Night is not normal-room gated.

### Activity/camp

The Tavern draft consumes/produces Activity information, but there is no Tavern camp Night.

### Route/ending contribution

Night supports recurring-traveler information and house-management continuity.

### Missing 1.0 surfaces

- D35 private-space recurring-traveler branch;
- no minimum professional/relationship gap otherwise.

---

## 8.5 Hunter

### Current Night choices

**0.**

This is a major current gap.

### Professional/non-romantic continuation

**Missing.**

Candidate authored themes already exist in the draft:
- field notes;
- trophy/sample processing;
- route planning;
- expedition debrief.

No new career architecture is needed to author one.

### Optional relationship/romance continuation

**Missing.**

The existing relationship machine already has:
`hunter.senior-guide`
with:
- introduced;
- professional-trust;
- conflict-open;
- companion-ready;
- route-resolved.

Therefore a basic optional guide/companion Night can be **content-only** against current state.

### School transfer/reflection

Generic School Night Study is present, and Hunter-specific Night parity coverage exists.

### Housing/private-space

No Hunter private-space branch.

No D35 requirement.

### Activity/camp

Hunter has a real `hunter.expedition` Activity.

This makes Hunter the strongest current candidate for an eventual camp/field Night surface.

Current Activity is `same_day`; Night cannot start inside an active Activity.

So a true camp Night needs Activity/Night lifecycle support or an explicit Activity exit-to-Night handoff, not merely another Night choice.

### Route/ending contribution

Draft Master Hunter / Warden / Legend routes strongly depend on field preparation and Activity.

### Missing 1.0 surfaces

**Priority gap:**
1. professional Hunter Night;
2. optional Senior Guide relationship Night.

**High-value expansion:**
3. expedition camp/debrief Night once Activity policy supports it.

---

## 8.6 Guard

### Current Night choices

**0.**

### Professional/non-romantic continuation

**Missing.**

Natural existing state supports:
- report review;
- late watch debrief;
- case evidence;
- partner shift handoff.

This can be content-only.

### Optional relationship/romance continuation

**Missing.**

Existing `guard.partner` relationship machine already has:
- professional-trust;
- conflict-open;
- cooperation-ready;
- route-resolved.

A basic optional partner Night does not require a new relationship system.

### School transfer/reflection

Generic Night Study exists.

Guard School tracks already support reports, rhetoric, etiquette, physical training and Arcana.

A dedicated Night-to-case reflection scene is not currently authored.

### Housing/private-space

No Guard private-space branch.

No D35 seed requirement.

### Activity/camp

No Guard Activity/camp Night currently.

### Route/ending contribution

Night could naturally contribute to Officer / Reform / Network / Major Case without making any route mandatory.

### Missing 1.0 surfaces

**Priority gap:**
1. professional Guard continuation;
2. optional Partner relationship continuation.

---

## 8.7 Merchant

### Current Night choices

**0.**

### Professional/non-romantic continuation

**Missing.**

Natural draft candidates:
- ledger review;
- supplier accounts;
- route planning;
- stock/cargo decisions.

Existing Merchant career state is sufficient for a basic content-only surface.

### Optional relationship/romance continuation

**Missing.**

Existing `merchant.supplier` relationship already has:
- professional-trust;
- conflict-open;
- utility-ready;
- route-resolved.

A supplier/rival/buyer Night can therefore begin as content-only.

### School transfer/reflection

Generic Night Study exists.

Merchant School authority already covers accounting, rhetoric, literacy, etiquette and Arcana.

### Housing/private-space

No Merchant private-space branch.

No D35 seed requirement.

### Activity/camp

Merchant receives Activity goods/routes but has no major Merchant Activity or camp Night.

### Route/ending contribution

Night can support Merchant House / Speculator / Patron of Routes by creating a real time tradeoff between:
- study;
- accounts;
- supplier relationship;
- sleep.

### Missing 1.0 surfaces

**Priority gap:**
1. professional Merchant Night;
2. optional Supplier relationship Night.

---

## 8.8 Artist / Geisha

### Current Night choices

- `artist-geisha.night.rehearsal`;
- `artist-geisha.night.salon`;
- `artist-geisha.night.mentor-review`.

This is the richest current ordinary-career Night set.

### Professional/non-romantic continuation

**Present with multiple options.**

Rehearsal and salon both increment professional Night opportunities.

### Optional relationship/romance continuation

**Present as optional mentor relationship utility.**

Romance is not required.

### School transfer/reflection

**Strong.**

The draft explicitly makes Night a competition between:
- rehearsal/salon;
- Night Study;
- relationship opportunity.

### Housing/private-space

Salon is narratively private/formal, but the current choice is **not a normal-lodging private-space mechanic**.

This is acceptable because D35 does not require Artist as a seed.

### Activity/camp

No Artist Activity/camp Night.

### Route/ending contribution

Night directly supports performance/status/patron/court-invitation progression.

### Missing 1.0 surfaces

No minimum-coverage gap.

This career is a useful upper-bound example of a Night-heavy profession.

---

## 8.9 Assassin

### Current Night choices

- `assassin.night.review-notes`.

### Professional/non-romantic continuation

**Present.**

It writes a career fact.

### Optional relationship/romance continuation

**Missing.**

The existing `assassin.handler` relationship machine can support an optional handler/informant relationship Night, but personal/romance semantics must not be inferred from professional utility stages.

If a personal route is desired, explicit relationship choice/fact state should separate it.

### School transfer/reflection

Generic Night Study exists; Assassin School preparation exists.

### Housing/private-space

No private-space branch.

No D35 requirement.

### Activity/camp

Assassin has `assassin.infiltration` Activity.

Current Activity is same-day and has no Night/camp handoff.

### Route/ending contribution

Current review-notes choice supports covert preparation.

### Missing 1.0 surfaces

- optional handler/informant relationship Night;
- possible infiltration aftercare/camp is an expansion, not minimum.

---

## 8.10 Prostitute

### Current Night choices

- `prostitute.night.client-followup`.

Current direct effects:
- recurring-client `night-meetings +1`;
- career fact `night-continuation-seen`.

### Professional/non-romantic continuation

**Present.**

The current choice is explicitly named and authored as professional client follow-up.

### Optional relationship/romance continuation

**Not present as a distinct personal branch.**

The same Night surface touches relationship state, but recurring clients are explicitly **not automatically romance**.

A 1.0 personal/romance branch, if authored, needs a separate explicit player choice and separate state.

### School transfer/reflection

Generic Night Study exists.

Body Confidence remains subject to D20:
- paid lesson grants Lust +2;
- Night Study is not a paid lesson;
- Sexuality/confidence is not consent.

### Housing/private-space

**Locked D35 seed missing.**

The current client follow-up is not `housingTier=normal` gated.

### Activity/camp

No Prostitute Activity/camp Night.

### Route/ending contribution

Night contributes to recurring-client / professional-network continuity.

### Missing 1.0 surfaces

1. D35 normal-room private-space branch;
2. distinct optional personal/relationship branch if Product wants the draft's friendship/romance breadth.

Crucially, neither may inherit Secret Debt forced-route semantics.

---

# 9. Hunter / Guard / Merchant gap verdict

All three have:

- current career machines;
- current relationship machines;
- School mappings;
- presentation infrastructure for their career/relationship states.

Yet all three have **zero** voluntary career Night choices.

This means their minimum 1.0 Night gap is primarily **content-only**, not engine work.

Recommended smallest closure:

## Hunter

- one professional field/debrief Night;
- one optional Senior Guide/companion Night.

## Guard

- one professional report/case/debrief Night;
- one optional Partner Night.

## Merchant

- one professional ledger/supplier-planning Night;
- one optional Supplier relationship Night.

No new global Night mechanics are required for those six baseline surfaces.

---

# 10. D35 private-space audit

Locked requirement:

Normal lodging must seed at least three optional private-space branches:

- Satyr Maid recurring guest;
- Tavern recurring traveler;
- Prostitute recurring client/relationship.

Current count:

```text
normal-only Night choices = 0
required seed branches     = 3
gap                        = 3
```

Current support already exists:

```text
housingTier == normal
```

Therefore these are content bindings, not a generic housing rewrite.

Rules the new branches must preserve:

- cheap does not satisfy them;
- street does not satisfy them;
- School Night Study remains normal OR cheap;
- public/workplace Night stays ungated unless individually authored;
- private branches do not gate ordinary career progress;
- private branches do not gate Hard Work;
- private branches do not gate Palace;
- Secret Debt forced Night wins.

---

# 11. Secret Debt forced-Night audit

D19 locks:

- while bound, forced Night every night;
- voluntary Night menu suppressed;
- next-day Energy `-1`;
- forced Night cannot be cancelled by housing;
- ordinary careers remain locked while bound.

Current generic Night runtime can express:

- forced event intercept;
- voluntary suppression;
- `consumesNight`;
- queued `energyDelta=-1`;
- reload-safe pending forced scene.

What is missing is the **production Secret Debt route consumer/state binding**.

There is no current Secret Debt production Night pack/state consumer on the audited main.

## Intercept caution

D19 does not, by itself, settle whether the forced route:
- bypasses lodging payment before it happens;
- or occurs after lodging.

The generic Night engine supports both.

This audit does **not** invent the rent/intercept policy.

## Energy ordering

Required invariant:

```text
selected Energy modifier
-> Secret Debt next-day -1
-> usable bound Energy remains exactly one lower
```

When Strong Meta Work Rhythm and Secret Debt assemble together, focused integration must test this exact relative loss.

## Classification

**Requires forced-Night route runtime/content integration**, but not a new generic Night state machine.

---

# 12. Palace optional Night audit

D29 locks:

- Palace Night is optional;
- romance is optional;
- relationship variants never gate Palace outcomes;
- refusing romance cannot block an outcome;
- Palace Night cannot override forced Secret Debt Night.

Current audited executable has no production Palace Night.

Therefore Palace Night is a **future Palace-owned consumer of the existing Night lifecycle**.

Required precedence:

```text
Secret Debt forced Night
> Palace optional Night
```

Do not implement Palace Night as:
- an unconditional post-choice scene;
- an event that survives voluntary-menu suppression;
- a hidden Palace progression requirement.

## Classification

**Requires Palace runtime/content.**

---

# 13. Ordinary Prostitute vs Secret Debt audit

Current ordinary Prostitute Night:

`prostitute.night.client-followup`

is:
- voluntary;
- professional;
- relationship-aware;
- no forced Night policy;
- no automatic next-day Energy penalty.

This is correct separation.

The ordinary profession must not acquire:

- forced every-night work;
- voluntary-menu suppression;
- debt activation semantics;
- forced next-day Energy `-1`;
- ordinary-career domain lock.

Those belong to Secret Debt only.

D35 private-space content for Prostitute must also remain optional.

---

# 14. Activity / camp Night audit

Current major Activities:

- `lumber.forest`;
- `hunter.expedition`;
- `assassin.infiltration`.

All are currently `same_day`.

The engine blocks beginning Night while an Activity is still active.

There is no current camp Night surface.

Therefore a real Activity camp Night is **not content-only** under the current model.

It needs one of:

1. an explicit Activity result/exit that enters ordinary Night;
2. an Activity time policy that can hand off to Night;
3. an Activity-owned internal camp phase that is explicitly not global Night.

The architecture must choose one deliberately.

Do not implement a camp by directly mutating global day or bypassing NightFlow.

Hunter is the strongest first consumer because its career fantasy explicitly centers expeditions/field routes.

---

# 15. School Night audit

Current School Night is the most complete broad Night subsystem:

- 24 choices;
- 8 course families;
- normal or cheap lodging;
- street excluded;
- +2 selected supported progression stat;
- `night_study_sessions +1`;
- next-day Energy `-1`;
- zero tuition at Night;
- exact-once save/reload coverage.

Important boundaries:

- Night Study does not imply career-specific story progression by itself unless a downstream authored consumer exists;
- D33 explicitly makes Lumber management readiness consume Night Study repetitions;
- D20 Lust +2 belongs to **paid Body Confidence lesson**, not generic Night Study;
- Body Confidence/Sexuality never encodes relationship consent.

School Night is a good 1.0 reference for:
- stable mechanics;
- clear opportunity cost;
- broad availability;
- exactly-once persistence.

---

# 16. Current 12 career/relationship Night choices by function

## Professional / career-first

- Satyr Maid staff debrief;
- Undead Farm process notes;
- Tavern house notes;
- Artist rehearsal;
- Artist salon;
- Assassin review notes.

## Relationship / professional-social

- Lumber Foreman Night;
- Satyr recurring guest;
- Undead keeper request;
- Tavern traveler request;
- Artist mentor review;
- Prostitute client follow-up.

This split is useful, but it leaves:

- Hunter: neither;
- Guard: neither;
- Merchant: neither;
- Assassin: no relationship surface;
- Lumber: no distinct personal surface;
- Prostitute: no distinct personal surface.

---

# 17. Proposed exact minimum 1.0 Night coverage rule

This is a **recommendation for Product**, not a lock.

## Default rule for each ordinary career

A 1.0-complete major ordinary career should expose at least **two distinct authored Night intents**:

### A. Professional continuation

At least one optional Night that:
- continues the career fantasy;
- does not require romance;
- does not require accepting a personal relationship;
- produces either durable career/route state or a meaningful authored continuation event.

### B. Personal / relationship continuation

At least one optional Night that:
- consumes an existing relationship/social state;
- is explicitly chosen;
- can remain friendship/partnership/mentor/rival content;
- never requires romance;
- never equates confidence/Lust/Sexuality with consent.

The two intents should be independently selectable surfaces.

A single choice should not count twice merely because it writes both a career fact and a relationship counter.

## Alternative equivalency

Product may accept one branching Night scene instead of two separate choice IDs **only if** it has:
- clearly separate professional and personal branches;
- separate player choices;
- meaningful consequences for each;
- no forced romance.

This prevents filler duplication.

## Night-heavy careers

For a career whose core fantasy strongly depends on Night, target at least **three meaningful intents**.

Current examples:

- Satyr Maid;
- Tavern;
- Artist/Geisha;
- Prostitute.

The third intent should come from the career's actual system identity, not filler.

Examples:
- private-space branch;
- status/performance evening;
- staff/house management;
- information gathering;
- recurring-client boundary/social branch.

This is a target bar, not a universal numeric quota.

---

# 18. How the proposed bar scores the current careers

| Career | Professional | Relationship/personal | Night-heavy extra | Default bar |
|---|---|---|---|---|
| Lumber | yes | **missing distinct personal** | n/a | partial |
| Satyr Maid | yes | yes | **D35 private missing** | partial for Night-heavy target |
| Undead Farm | yes | yes | n/a | meets default |
| Tavern | yes | yes | **D35 private missing** | partial for Night-heavy target |
| Hunter | **missing** | **missing** | camp desirable | fails |
| Guard | **missing** | **missing** | n/a | fails |
| Merchant | **missing** | **missing** | n/a | fails |
| Artist/Geisha | yes | yes | yes | meets |
| Assassin | yes | **missing** | infiltration aftercare optional | partial |
| Prostitute | yes | **missing distinct personal** | **D35 private missing** | partial |

This intentionally does not reward filler count.

---

# 19. Missing-surface ownership classification

## Content-only on current state

The following can be authored without new global runtime/schema:

- Hunter professional Night;
- Hunter Senior Guide Night;
- Guard professional Night;
- Guard Partner Night;
- Merchant professional Night;
- Merchant Supplier Night;
- Satyr Maid D35 private branch;
- Tavern D35 private branch;
- Prostitute D35 private professional/relationship branch;
- additional professional variants for existing careers.

The three D35 branches consume existing `housingTier=normal`.

## Relationship-state extension / authored state separation

Likely needed if Product wants a persistent personal route beyond current professional state:

- Lumber Foreman friendship/personal/romance branch;
- Assassin Handler personal branch;
- Prostitute recurring-client personal/romance branch distinct from professional mode.

This does not necessarily require a brand-new relationship machine; explicit facts/choices/stages may be enough.

But it must not reuse professional state as implicit consent.

## Housing/private-space support

Generic support already exists.

Missing work is authored consumption:
- normal-only conditions;
- route copy;
- presentation;
- focused tests.

## Forced-Night runtime integration

Required:
- Secret Debt production route state;
- nightly forced consumer;
- voluntary suppression;
- Energy `-1`;
- reload/idempotence;
- ordering with selected Energy modifiers.

No new generic Night lifecycle is needed.

## Palace runtime

Required:
- optional Palace Night consumer;
- Palace relationship/progression-owned conditions;
- explicit precedence below Secret Debt forced Night.

## Activity/camp runtime

Needed before a true global Night camp can exist.

Current same-day Activity cannot simply start global Night while active.

---

# 20. Priority order for closing Night 1.0

## P0 — Product-locked missing consumers

1. Secret Debt forced Night production binding;
2. D35 three private-space seed branches;
3. Palace optional Night when Palace runtime lane is ready.

These are not speculative coverage ideas; they are already locked responsibilities.

## P1 — minimum ordinary-career parity

4. Hunter professional Night;
5. Hunter relationship Night;
6. Guard professional Night;
7. Guard relationship Night;
8. Merchant professional Night;
9. Merchant relationship Night;
10. Assassin relationship Night.

## P2 — relationship-depth completion

11. Lumber distinct personal branch if Product keeps the draft's personal route;
12. Prostitute distinct personal branch if Product keeps friendship/romance scope;
13. presentation parity for route-significant Night choices.

## P3 — Activity/camp expansion

14. Hunter expedition camp/debrief;
15. optional Lumber Forest / Assassin infiltration aftercare if they improve those routes.

Do not block 1.0 on camp content unless Product explicitly promotes it to minimum scope.

---

# 21. Save/reload acceptance for every new Night surface

Every new production Night consumer should have focused tests for the relevant boundary.

## Voluntary choice

At minimum:

```text
choose lodging
-> save/reload
-> select Night choice
-> pending scene, if any
-> save/reload
-> resolve
-> exactly one day advance
-> effect exactly once
```

## Forced Night

At minimum:

```text
begin Night
-> forced scene pending
-> save/reload
-> same variant / no reroll
-> resolve
-> no voluntary menu
-> exactly one day advance
-> next-day modifier exactly once
```

## Private-space

At minimum:

```text
normal -> visible
cheap  -> absent
street -> absent
forced Secret Debt -> private option never wins
```

## Palace

At minimum:

```text
Palace optional Night eligible
+
Secret Debt forced Night eligible
->
forced Secret Debt resolves
Palace voluntary option does not appear
```

---

# 22. Exactly-one advance invariant

No new route is allowed to:
- increment calendar in its event handler;
- then also let NightFlow advance;
- or advance once before a pending scene and again after reload.

Required invariant:

```text
one completed global Night
==
one CalendarAdvance
```

Activity adapters that eventually hand off to Night must request core lifecycle transition rather than write day directly.

---

# 23. What should not be added merely for coverage

Do not create:

- a generic romance button for every career;
- an affinity-only Night route;
- universal +stat Night filler;
- universal normal-room Energy bonus;
- automatic romance based on Lust/Sexuality;
- fake camp Night that mutates calendar outside Activity/Night contracts;
- forced-night semantics in ordinary Prostitute;
- Palace Night as mandatory progression;
- duplicate private-space branches that differ only in text.

The Night bar should measure **distinct authored gameplay roles**, not raw button count.

---

# 24. 1.0 readiness assessment by layer

| Layer | Status | Reason |
|---|---|---|
| Night core lifecycle | **ready / mature** | forced hooks, lodging, voluntary choice, queued next-day effects, reload, one advance |
| Sleep/lodging | **ready** | three tiers; exactly-once payment/effects |
| School Night Study | **ready** | 24 choices, clear cost, persistence tests |
| Career Night parity | **incomplete** | Hunter/Guard/Merchant zero; Assassin/Lumber/Prostitute partial |
| Relationship Night depth | **incomplete** | several careers lack distinct optional personal/social continuation |
| D35 private space | **missing locked content** | 0/3 required seeds |
| Secret Debt forced Night | **missing production consumer** | generic core supports it; route integration absent |
| Palace Night | **missing production consumer** | D29 optional semantics locked; Palace runtime absent |
| Activity/camp Night | **not implemented** | current Activities same-day; no camp handoff |
| Presentation depth | **partial** | dedicated choice slots mainly Tavern + Artist |

---

# 25. Product decision requested

Recommended Product lock:

> A major ordinary career is Night-complete for 1.0 when it has at least two distinct authored Night intents: one professional/non-romantic continuation and one optional relationship/personal continuation. Romance is never required. A single branching scene may satisfy both only when the branches are independently selected and have distinct authored consequences. Careers whose core fantasy is strongly Night-dependent should target a third system-specific Night intent, but no career should receive filler merely to meet a numeric quota.

If accepted, the immediate career-content deficits are deterministic:

- Hunter: +2;
- Guard: +2;
- Merchant: +2;
- Assassin: +1 relationship;
- Lumber: +1 personal only if that draft route remains desired;
- Prostitute: +1 distinct personal only if that draft route remains desired;
- Satyr/Tavern/Prostitute: D35 private-space seed branches remain separately mandatory.

This rule should remain separate from:
- Secret Debt forced Night;
- Palace Night;
- Activity camp policy.

---

# 26. Final handoff

The Night system does **not** need a broad engine rewrite before 1.0 content completion.

The most important architectural work is already present.

The remaining work should be routed to the narrowest owner:

```text
ordinary career gaps
-> career/content producers

D35 private branches
-> career/relationship content using existing housingTier

Secret Debt forced Night
-> Secret Debt route owner + integration

Palace optional Night
-> Palace owner + integration

camp Night
-> Activity/Night architecture decision before content
```

Companion row-level evidence is in:

`mindy-successor/research/night_system_coverage_v1.csv`

Expected status:

`READY_FOR_LEADER_PRODUCT_DECISION`.
