# Chat 4 Executable Acceptance Truth — 2026-10-01

Status: C4-134 refreshed QA evidence; supersedes the earlier C4-125 snapshot  
Owner: Chat 4 / QA + Product Acceptance Gate  
Repository: `Plegyer/Text`

## Exact baseline

Acceptance truth below is for exact current main after the QA-accepted Chat 1 runtime and Chat 2 presentation integrations:

- SHA: `63a1f89e9dd7f754f7ec1c6851396a2a7b15bb53`;
- workflow: `mindy-successor check`;
- run #552 / id `36822500837`;
- result: SUCCESS;
- production validator: 17 packs / 46 events / 35 actions / 18 endings;
- tests: 581 / pass 581 / fail 0.

The production merge immediately before this baseline is Chat 2 integration PR #163 at `bdc4fe74f267c4d95b30aedcac9dc2c65751378b`. The only later main delta is the Chat 4 task pointer, so no product/test path changed after that integration.

Fixture/preparation-only material and open-PR behavior are not counted as shipped.

## Directly player-reachable on current main

### Core run / presentation

- Character creation, 160-day / four-year calendar, 3 daily Energy baseline, Save/reload and RU/EN runtime presentation are executable.
- NightFlow and lodging are executable, including normal / cheap / street lodging choices and next-day continuation.
- Current presentation has production static fallbacks, missing-dynamic-media safety and animation-off behavior that does not mutate Run Save.

### Starter trio — C4-134 truth

The three Day-1 ordinary career actions are Lumber, Satyr Maid and Undead Farm. All three now have a **repeatable base work loop**. That statement does not mean all three have a complete authored career life.

#### Lumber

- `lumber.shift` is Day-1 selectable, costs one Energy, is repeatable and uses seasonal stat/wage presentation.
- Lumber has the deepest current shipped career life: first-shift typed progression, Foreman opening/professional relationship route, Night interaction, Forest continuation and several ending seams.
- `ending.lumber.hard-work` is live at 50 completed shifts and applies `hardWork:lumber` Meta exactly once.
- The Logging Road Forest path can naturally lead to the Lumber Forest ending through the existing Forest result -> Lumber continuation facts.
- Lumber is therefore both a repeatable base loop and the current reference example of a broader career life.
- The Forewoman ending remains dependency-accelerated because natural School play still does not publish the required management-ready producer fact.

#### Satyr Maid

- `satyr-maid.shift` is Day-1 selectable, costs one Energy and is now genuinely repeatable after the first typed transition.
- The first real shift increments `completed_shifts`, moves `new-maid -> known-face` and publishes `first-shift-complete`.
- Later real shifts keep incrementing the counter without replaying the one-time transition/fact.
- Exact-main regression #518 proves first shift -> second real shift for Satyr Maid and Undead Farm; the one-time fact remains exactly once.
- Exact-main regression #519 performs 50 real Satyr Maid shifts through actual NightFlow when Energy is exhausted, with no career counter/stage priming, and reaches `ending.satyr-maid.hard-work`.
- `ending.satyr-maid.hard-work` and `hardWork:satyr-maid` Meta are live.
- Merged Chat 2 presentation adds the production three-candidate GIF pool plus project-owned static fallback for the starter work/result surfaces.
- Satyr Maid is therefore a **repeatable shipped base career + Hard Work path**, but **not a complete career life**. Current production still has only the starter two-stage spine; the recurring-guest/Night/School/crisis/House Power/Boundary Mastery slice is open stacked work and must not be counted as shipped.

#### Undead Farm

- `undead-farm.shift` is Day-1 selectable, costs one Energy and is now genuinely repeatable after the first typed transition.
- The first real shift increments `completed_shifts`, moves `new-hand -> reliable-helper` and publishes `first-shift-complete`.
- Later real shifts keep incrementing the counter without replaying the one-time transition/fact.
- Exact-main regression #519 performs 50 real Undead Farm shifts through actual NightFlow, without state priming, and reaches `ending.undead-farm.hard-work`.
- `ending.undead-farm.hard-work` and `hardWork:undead-farm` Meta are live.
- Merged Chat 2 presentation adds the production three-candidate GIF pool plus project-owned static fallback for the starter work/result surfaces.
- Undead Farm is therefore a **repeatable shipped base career + Hard Work path**, but **not a complete career life**. Production currently stops at the starter two-stage spine apart from repeatable work/Hard Work.

### Remaining seven ordinary careers

- Tavern, Hunter, Guard and Merchant have authored stat gates with a natural Year-2 fallback at elapsed day 40.
- Artist-Geisha, Assassin and Prostitute have authored stat gates with a natural Year-3 fallback at elapsed day 80.
- Exact-main tests prove UI/dispatch parity before and at every stat gate and natural calendar fallback reachability at day 40/day 80.
- Their base one-Energy shift loops are production actions once unlocked.
- All ten ordinary careers now have a production `ending.<career>.hard-work` at 50 completed shifts and exactly one `hardWork:<career>` Meta reward.
- The current shipped depth of these seven careers is still mostly base work + Hard Work; they do not yet have complete deep career state machines comparable to the intended target careers.

### Hard Work / Meta / Palace seam

- All ten ordinary Hard Work ending definitions are live.
- Exact-main regression #223 proves the full eligibility -> continued play -> explicit commit -> RunResult -> Meta lifecycle for every ordinary Hard Work ending.
- Regression #224 proves each automatic Hard Work Meta reward applies exactly once.
- Palace availability is now a live **derived 10/10 Hard Work predicate**. Ten unique ordinary-career Hard Work completions satisfy it; duplicates and Secret Debt do not substitute.
- This is only the Palace availability seam. Playable Palace career/content is still not shipped.

### Presentation after Chat 2 integration

- All 18 current ending definitions map to unique live semantic presentation slots.
- All ten Hard Work identities have RU/EN title/body/alt/caption and production static sources.
- `ending_committed` has a distinct live RU/EN UI state.
- Satyr Maid and Undead Farm production starter pools expose three local GIF candidates with static fallback.
- Animation-off resolves to static media; missing optional dynamic media remains non-fatal; presentation replacement/locale switching does not mutate gameplay Save.

### School

- All eight paid School courses are executable through the typed `schoolLesson` path, with real tuition, one current-day Energy cost, stat gains, track `lessons_completed` progress, stable course presentation identity and Save/reload support.
- The 24 exact School Night-study **choices/mechanics** are executable.
- Generic after-School reactions remain executable.
- The accepted Chat 5 production-content candidate #156 is not merged on this baseline, so its 24 exact Night-study reaction events, newer live teacher/course prose and result/journal localization must not yet be counted as current-main shipped content.
- The narrow exact-course paid-lesson teacher-response UI consumer from legacy #124 is still not present on main.

### Forest / ordinary poverty

- `lumber.forest` is executable with two-Energy entry, Save/resume, Logging Road routing, internal advance, escape and success/failure result boundaries.
- Logging Road is naturally selectable.
- Old Boundary remains gated by capability `enter_old_boundary`; current main still lacks a natural acquisition path for the required token/capability.
- Street/cheap ordinary-poverty production packs remain executable through existing Night/lodging boundaries, with safe recovery and no Secret Debt coupling.
- QA-accepted Chat 3 production-promotion #146 is not yet merged on this baseline, so its refreshed Forest/poverty production prose must not be counted as current-main shipped yet.

## Test-accelerated or dependency-accelerated surfaces

### Lumber Forewoman

- `ending.lumber.forewoman` exists and its relationship/career seam works.
- Natural paid School play still does not publish the management-ready producer required by the Lumber career continuation.
- Tests can inject the public-boundary fact and prove the downstream seam.
- Forewoman therefore remains dependency/test-accelerated.

### Old Boundary Forest route

- `forest.route.old-boundary` and its typed capability gate are real production.
- `old_boundary_token` exists with `enter_old_boundary`.
- Current main still lacks a natural root-production acquisition path.
- Old Boundary is therefore capability/test-accelerated on this baseline.

### Repetition-heavy ending setup

- Some all-ten Hard Work lifecycle tests accelerate careers to 49 completed shifts and execute the real 50th shift for test speed.
- This does not make the underlying 50-shift conditions test-only.
- Satyr Maid and Undead Farm additionally have a stronger natural-50 regression that performs all 50 real shifts.

## Still incomplete / not shipped

### Career-life depth

- Satyr Maid and Undead Farm now have correct repeatable base loops, but neither has a complete authored career life on current main.
- The seven late careers are naturally unlockable and have repeatable base work + Hard Work, but still lack the intended deeper career-specific milestone/relationship/crisis/outcome structures.
- The open Satyr complete-career runtime/presentation/School stacked wave is not shipped until a frozen exact head is QA-gated and integrated.

### Palace / Secret Debt

- Playable Palace career/content is not shipped; only the derived 10/10 availability seam is live.
- Secret Debt is not a production hidden career/state machine. Ordinary poverty remains explicitly separate.

### School depth

- Natural School -> Lumber management publication remains absent.
- Independent School milestone/project/certificate/ending depth remains incomplete.
- Accepted #156 exact Night-study content is pending integration.
- Legacy #124 exact paid-course teacher-response consumer remains a distinct unresolved selective-source candidate.

### Forest depth / items

- Current main does not yet provide the target three-route / multi-challenge / full seasonal Forest product slice.
- Old Boundary natural token acquisition is absent.
- The newer Forest product-slice stacked candidate is not counted until frozen/green QA evidence exists and it is integrated.

## C4-133 legacy selective-source disposition

Legacy open PRs are not whole-PR merge candidates.

### PR #124

- **Superseded:** starter Save/reload intent; legacy Forest v2 selector; legacy poverty housing/contact depth selector additions. The Forest/poverty product surfaces now have the newer QA-accepted #146 source and should not combine both architectures.
- **Still unique:** the exact paid-course School teacher-response consumer using persisted exact course presentation identity, its eight `school.teacher_response_v2.*.lesson_success.body` keys and focused regression. If selected later, port only that narrow hunk against then-current School main.

### PR #136

- **Fully superseded:** locked-career focusability, committed ending UI state, fallback/accessibility/provenance hardening are all covered by current merged Presentation behavior and exact-main regressions.
- No #136 production hunk remains recommended for selective sourcing.

### PR #139

- **Still unique:** structured central `actionAvailability(...)` result + shared engine/UI blocker categories/messages. Current main still has only boolean `actionAvailable(...)`.
- If selected later, re-author/port it against current main; do not restore stale pre-v9 career-contract assumptions.
- **Superseded:** the old `selectedNightChoiceId` + blocking generic `after-night-study` consumer and `school.night_exact.*` key family. QA-accepted #156 replaces it with 24 exact production reaction event identities.

## Open-candidate honesty boundary

The following are accepted or active work but are not counted as shipped on this exact baseline until Lead integration lands and current-main QA passes:

- #146 — QA-accepted Chat 3 Forest/poverty production promotion; Lead integration #167 pending.
- #156 — QA-accepted Chat 5 School production promotion; Lead integration #168 prepared after Chat 3.
- #164 and related stacked Satyr career work — draft/working until a frozen exact head with required green CI is produced.
- #162 and other next-wave Forest/Satyr stacked work — not shipped merely because a PR exists.

## Acceptance conclusion

Current main is a healthy runnable baseline with materially more shipped career functionality than the old C4-125 snapshot.

The trustworthy split is:

- **directly/naturally player-reachable:** all three starter Day-1 work loops; Satyr Maid and Undead Farm now genuinely repeat; natural 50-shift Hard Work for both starter careers; seven late-career stat/calendar unlocks; all-ten Hard Work lifecycle/Meta; derived Palace 10/10 seam; Lumber reference career path except the natural Forewoman producer; eight paid School courses and Night-study mechanics; Logging Road Forest; ordinary poverty; merged full-roster presentation/fallback/accessibility.
- **test/dependency-accelerated:** Lumber Forewoman management producer, Old Boundary capability acquisition, repetition-heavy setup in some all-ten tests.
- **not yet complete/shipped:** full Satyr Maid career life, full Undead Farm career life, deep lives for the seven late careers, playable Palace, Secret Debt, complete School product depth, complete Forest route/challenge/item depth, pending #146/#156 content integrations.

No fixture, preparation artifact, draft head or pre-merge candidate is promoted to shipped status by this document.
