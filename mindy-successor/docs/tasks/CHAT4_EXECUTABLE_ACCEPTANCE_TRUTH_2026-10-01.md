# Chat 4 Executable Acceptance Truth — 2026-10-01

Status: C4-125 QA evidence  
Owner: Chat 4 / QA + Product Acceptance Gate  
Repository: `Plegyer/Text`

## Exact baseline

Acceptance truth below is for exact current main:

- SHA: `a30272dc91cab3d5286558a189d5d816f1841db7`;
- workflow: `mindy-successor check`;
- run #459 / id `36816282846`;
- result: SUCCESS;
- full `npm run check`: typecheck / validation / build / tests green;
- production validator: 17 packs / 46 events / 35 actions / 9 endings;
- tests: 556 / pass 556 / fail 0.

Fixture/preparation-only material and open PR behavior are not counted as shipped.

## Directly player-reachable on current main

### Core run / presentation

- Character creation, 160-day / 4-year calendar, 3 daily Energy baseline, Save/reload and RU/EN runtime presentation are executable.
- NightFlow and lodging are executable, including normal / cheap / street lodging choices and next-day continuation.

### Careers

- Exactly three ordinary careers are available from the normal starting state: Lumber, Satyr Maid and Undead Farm.
- Satyr Maid and Undead Farm are Day-1 selectable and their **first** one-Energy shift, seasonal presentation and typed first-shift transition/fact work. They are **not currently repeatable after that transition**: each shift action unconditionally re-applies its one-time `first-shift` transition, so a second real shift reaches the typed `from` guard from `known-face` / `reliable-helper` and throws. They must not be accepted as repeatable career loops on this baseline.
- Lumber has the current production reference path: first shift, typed Lumber progression, Foreman opening and professional relationship route, repeatable/seasonal work, Night interaction, Forest continuation, eligible endings, explicit ending commitment/completion and New Run Meta application.
- Lumber Hard Work is a real production ending at exactly 50 completed Lumber shifts. QA/product tests accelerate the repetitive setup by placing the counter at 49 before executing the real 50th shift, but the production condition itself is naturally satisfiable and is not a test-only ending.
- Lumber Forest ending is naturally reachable through the production Logging Road Forest route: Forest success publishes the existing result fact, the Lumber continuation converts it to the current career facts, and the ending becomes eligible.

### School

- All eight paid School courses are executable through the typed `schoolLesson` path, with real tuition, one Energy cost, stat gains, track `lessons_completed` progress, stable course presentation identity and Save/reload support.
- The 24 exact School Night-study choices exist as executable Night choices. Their stat/track effects are real; normal/cheap housing is the ordinary availability boundary used by production definitions.
- Generic after-School reactions remain executable. Exact prepared teacher/milestone prose beyond the currently merged production consumers is not counted as live.

### Forest / poverty

- `lumber.forest` is executable with a two-Energy entry cost, Save/resume, Logging Road routing, internal advance, escape and success/failure result boundaries.
- Logging Road is directly selectable without an item capability.
- Street/cheap ordinary-poverty production packs are executable through the existing Night/lodging boundaries; bad-pressure paths retain a free safe resolution and zero-money recovery can return to an executable starter career.
- Ordinary poverty remains independent of Secret Debt.

## Test-accelerated or dependency-accelerated surfaces

These exist as real production seams, but current natural play does not supply every prerequisite.

### Lumber Forewoman ending

- The production ending `ending.lumber.forewoman` exists and its career/relationship reaction seam works.
- Natural paid School play does **not** publish `lumber.school.management-ready`.
- Current test coverage proves the seam only after a test-only public-boundary injection of that world fact.
- Therefore Forewoman is **not accepted as naturally player-reachable** on current main.

### Old Boundary Forest route

- The production route `forest.route.old-boundary` exists and is gated by capability `enter_old_boundary`.
- `old_boundary_token` exists in item definitions with that capability.
- No current root production pack contains a natural `old_boundary_token` / `enter_old_boundary` acquisition write.
- Tests can inject the capability/world fact and then exercise the route.
- Therefore Old Boundary is **capability/test-accelerated**, not naturally reachable from the ordinary shipped path.

### Repetition-heavy ending evidence

- Lumber Hard Work regression/product acceptance commonly accelerates to 49 completed shifts and executes the 50th shift through the real command path.
- This is only a test-speed optimization; it does not change the classification of the production ending as naturally reachable.

## Still unimplemented or not player-reachable on current main

### Ordinary career roster / Hard Work / Meta

- Tavern, Hunter, Guard, Merchant, Artist-Geisha, Assassin and Prostitute base one-Energy shift definitions exist, but their production actions have no authored unlock conditions and `actionAvailable(...)` intentionally keeps all seven unavailable.
- Those seven careers therefore are **base definitions, not player-reachable careers** on this baseline.
- Satyr Maid and Undead Farm are starter production layers only, and current production has a repeatability blocker after the first typed transition because their base shift actions unconditionally invoke the one-time transition again. They do not yet have complete career lives/outcome state machines.
- The remaining seven ordinary careers have only initial stages and no deeper production transitions.
- Only Lumber has `ending.<career>.hard-work` + Hard Work Meta. The other nine ordinary careers do not have production Hard Work endings/Meta coverage.

### Palace / Secret Debt

- Palace is not a playable production career. The 10/10 Hard Work unlock seam is not shipped on current main.
- Secret Debt is not a production hidden career/state machine. Ordinary poverty explicitly remains separate from it.

### School depth

- Natural School -> Lumber management publishing remains absent, so the Forewoman route is not naturally closed.
- Independent School milestone/project/certificate/School-ending depth is incomplete.
- Prepared exact paid-course teacher reaction content and exact Night-study reaction prose in open worker candidates are not live until integrated into production.
- The paid-lesson journal/fallback localization gap remains a documented gap rather than a shipped fix.

### Forest depth / item acquisition

- Forest does not yet provide the complete target three-route / three-challenge / full seasonal product depth.
- Old Boundary natural capability acquisition is absent.
- Other target capability items similarly lack reliable natural production acquisition paths.

## Open-PR honesty boundary

Current open candidates must not be counted as shipped before integration:

- #124 has selective unique Forest/School consumer material but is not a clean whole-PR current-main candidate.
- #136 contains useful presentation/accessibility production delta still absent from main.
- #139 contains useful central availability + exact Night-study production delta still absent from main.
- #143/#145 are preparation/evidence candidates, not shipped player-facing content.
- #146 is a fresh Chat 3 production-promotion candidate but its first exact-head CI run failed and it is not accepted/frozen.
- #147 is the active Chat 1 v9 late-career/Hard-Work candidate. Its frozen `15d6ee3d91c5ad3fef82fe52a06ec2a590089003` head was C4-blocked on the Satyr Maid / Undead Farm natural-repeatability defect, then invalidated by head movement. Current head `987438954cfec9739281a512a1589cb2707095e5` adds only a Meta test, leaves the production defect unchanged, and is not accepted.

## Acceptance conclusion

Current main is a healthy runnable baseline, not a complete target game.

The trustworthy acceptance split is:

- **directly player-reachable:** all three starter actions on Day 1, but only Lumber currently has a repeatable ordinary-work loop; Satyr Maid / Undead Farm have a working first shift followed by the repeatability blocker described above. Lumber reference path (except natural Forewoman prerequisite), eight School courses, School Night-study mechanics, Logging Road Forest path/results, ordinary poverty/Night recovery, ending lifecycle/New Run Meta for Lumber Hard Work, RU/EN/save/presentation infrastructure;
- **test/dependency-accelerated:** Forewoman management prerequisite, Old Boundary capability route, repetition-heavy setup in some acceptance tests;
- **not yet implemented/player-reachable:** a correct repeatable Satyr Maid / Undead Farm base-work loop beyond first shift, seven late-career unlocks and full lives, nine non-Lumber Hard Work/Meta paths, full Satyr Maid/Undead Farm lives, Palace, Secret Debt, complete School depth, complete Forest route/challenge depth and natural capability acquisition.

No fixture/preparation artifact is promoted to shipped status by this document.
