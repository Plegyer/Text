# Chat 4 Executable Acceptance Truth — 2026-10-01

Status: C4-149 durable current-main closeout; Hunter v15 QA follows  
Owner: Chat 4 / QA + Product Acceptance Gate  
Repository: `Plegyer/Text`

## Exact executable baseline

C4-149 exact current-main evidence:

- SHA: `c122d829dd3c143cbc63fb1aaea0af54216bfffb`;
- workflow: `mindy-successor check`;
- push run #758 / id `36857025229`;
- result: **SUCCESS**;
- validator: **31 packs / 119 events / 39 actions / 22 endings**;
- tests: **711 / 711 pass, 0 fail**.

The accepted combined Undead product baseline is `d97a970283612ce25591741a521aa31d2a982c95`. The full comparison `d97a970... -> c122d829...` is 13 commits and changes only Leader handoff/dashboard and worker task-pointer/queue Markdown files. There is no production, runtime, content, localization, UI, Save/schema, test or media-path drift. Therefore the shipped executable product truth is unchanged while the exact current-main CI is independently green.

Open/frozen PR behavior is not counted as shipped until integrated.

## Directly player-reachable on current product main

### Core run / presentation

- Character creation, the four-year calendar, daily Energy, Save/reload, RU/EN presentation and NightFlow are executable.
- Normal, cheap and street lodging remain executable and preserve exactly-once Night/payment semantics across reload.
- Current presentation has project-owned static fallbacks, animation-off behavior and missing-dynamic-media safety without gameplay Save mutation.

### Ordinary careers and Hard Work

- Lumber, Satyr Maid and Undead Farm are the three Day-1 ordinary career actions.
- All three have repeatable one-Energy work loops.
- Satyr Maid and Undead Farm retain one-time first-shift transitions while later real shifts repeat correctly.
- Both starter careers naturally reach their 50-shift Hard Work thresholds without stage/counter priming.
- The seven later ordinary careers use their authored stat/calendar unlock conditions and have repeatable base work once unlocked.
- All ten ordinary careers have live 50-shift Hard Work endings with exactly-once `hardWork:<career>` Meta.
- Palace availability is a live derived 10/10 Hard Work predicate. Playable Palace career/content is still not shipped.

### Satyr Maid complete-career runtime

The C1D-97..108 runtime is now shipped.

Live production includes:

- typed Satyr milestone progression beyond the starter shell;
- 12 seasonal/context repeatable shift variants;
- recurring-guest work -> voluntary Night -> request -> later-work chain;
- refusal that preserves the professional path;
- typed School hooks at three relevant paid lessons with zero extra reaction Energy;
- staffing/supply/customer crisis branches;
- House Power and Boundary Mastery complex endings;
- House Credit (+600 starting money exactly once);
- Clear Terms narrow later-run negotiation option;
- coexistence of Hard Work / House Power / Boundary Mastery eligibility;
- explicit ending commit/completion/RunResult lifecycle.

Exact-main regression evidence includes the clean natural Satyr run through real shifts, relationship/Night, paid School, crisis, 50-shift Hard Work, complex-ending eligibility, commit/completion and New Life.

Satyr presentation #174 and Satyr School v12 #172 are now shipped on this baseline.

- all live Satyr runtime events/stages/complex endings map to production presentation slots;
- a real Satyr shift writes the exact live presentation ID;
- project-owned static fallback, animation-off and missing-motion safety remain green;
- the 12 collision-sensitive Satyr School localization values preserve Chat 5 ownership after Presentation integration;
- RU/EN School/relationship/crisis/ending presentation remains presentation-only and does not mutate gameplay Save.

### Lumber

- Lumber remains the reference cross-system career with first-shift progression, Foreman professional relationship, voluntary Night and Forest continuation.
- Lumber Hard Work is naturally reachable at 50 completed shifts.
- Forest success can feed the Lumber Forest ending through the existing continuation facts.
- Forewoman remains dependency-accelerated: current School production still does not naturally publish the Lumber management-ready producer required by that ending.

### School v11

The QA-accepted School v11 production promotion is now shipped.

Live production includes:

- all eight paid courses using typed `schoolLesson`;
- real tuition, one current-day Energy, stat packages and typed `lessons_completed` progress;
- exact semantic course presentation identities;
- the current exact Night-study identities/content;
- existing teacher continuity on the live course surfaces;
- RU/EN result/journal/presentation localization;
- locale switching that does not mutate Save;
- save/reload preservation of paid transactions and exact Night-study identity.

The current School production still keeps unresolved global producer/certificate/project design outside live authority.

Satyr School v12 #172 is shipped. Its three career-local hooks preserve the approved local paid-lesson/Night-study thresholds, existing teacher continuity, immediate Resolver behavior, exactly-once/reload semantics and the global School-threshold firewall.

### Forest / items — v11 + v12

The accepted Forest/Poverty v11 promotion and Forest product slice v12 are now shipped.

#### Natural preparation

Current production has natural paths for:

- Hunter clue + Rope Kit;
- Reinforced Axe through Lumber progression;
- Old Boundary Token through the professional Foreman relationship;
- Field Preservation Kit after real School enrollment.

Therefore Old Boundary is no longer classified as test-only/capability-injected on this baseline.

#### Routes and challenge families

- Logging Road is live.
- Hunter Trail is a live third route with its authored summer/autumn availability.
- Old Boundary is naturally unlockable through the shipped token path.
- Navigation, physical-obstacle and interpretation/ritual challenge families run on the existing typed `counter.v1` Activity runtime.
- Reason, Wits, Strength, Endurance, Dexterity, Magic and item capabilities affect real option availability.
- Seasons alter route/challenge topology rather than only prose.

#### Extraction and cross-system continuation

- Preservation capability is mechanically relevant to successful extraction.
- Successful Forest completion can produce `forest_preserved_specimen`.
- The existing Lumber continuation reads the specimen and records the current Lumber career facts.
- Route/challenge/checkpoint state and terminal result selection remain deterministic across save/reload.

Forest Authored Depth v13 #175 is shipped.

- route/challenge narrative responds to the real persisted route, season, last roll, stats, facts and exact item capabilities;
- Logging Road, Hunter Trail and Old Boundary have bilingual authored depth without new Activity mechanics;
- city preparation and equipment are acknowledged through existing facts/capabilities;
- success/escape/failure and Lumber-return aftermath have live item/preparation variants;
- repeated route/challenge copy remains deterministic across reload and does not mutate gameplay state.

### Ordinary poverty

- Street and cheap ordinary-poverty production packs are live through the existing Night/lodging flow.
- Seasonal/event variety is deterministic and reload-stable.
- Safe recovery/help and anti-softlock paths remain available.
- Ordinary poverty remains independent from Secret Debt.
- Secret Debt is still not a shipped hidden career/state machine.

## Dependency/test-accelerated surfaces

### Lumber Forewoman

- `ending.lumber.forewoman` and its downstream career/relationship seam exist.
- Natural current School play still lacks the required Lumber management-ready publisher.
- Tests can exercise the downstream seam after public-boundary injection.
- Forewoman therefore remains dependency/test-accelerated.

### Repetition-heavy acceptance setup

- Some all-ten Hard Work lifecycle tests accelerate counters for test speed.
- This does not make the production 50-shift conditions test-only.
- Satyr Maid and Undead Farm additionally have natural 50-real-shift coverage.

## Still incomplete / not shipped

- Tavern is the **next incomplete ordinary career in shipped product truth**: its runtime/authored/School/presentation siblings are QA-accepted but not yet integrated.
- Hunter runtime/School are frozen QA candidates and are not shipped; Hunter presentation/authored siblings are still producer work.
- Guard, Merchant, Artist-Geisha, Assassin and Prostitute also remain base-work/Hard-Work careers without their intended deep career-specific milestone/relationship/crisis/outcome structures.
- Playable Palace content is absent beyond the 10/10 derived availability seam.
- Secret Debt is absent as a production hidden career/state machine.
- Lumber Forewoman lacks its natural School producer.
- Full School certificate/project/ending design remains incomplete.
- Undead complete-runtime + School + presentation is shipped and passed C4-144/C4-146 exact-main gates.
- Ordinary Poverty closure v14 is shipped and passed C4-145.
- Tavern complete-career runtime/content/presentation/School siblings (#187/#185/#191/#200) are QA-accepted but remain unintegrated; do not count Tavern complete-career depth as shipped.
- Hunter runtime #201 and School #199 are frozen but unintegrated and must remain behind Tavern in Lead integration order.

## C4-133 legacy selective-source disposition

Legacy open PRs are not whole-PR merge candidates.

### PR #124

- Superseded: starter Save/reload intent and legacy Forest/poverty selector approaches.
- Still unique: the narrow exact paid-course teacher-response consumer using persisted exact course presentation identity, its approved response keys and focused regression.
- If selected later, port only that narrow School hunk against then-current School main.

### PR #136

- Fully superseded by current presentation/accessibility/fallback behavior.
- No production hunk remains recommended for selective sourcing.

### PR #139

- Still unique: the structured central `actionAvailability(...)` result and shared engine/UI blocker categories/messages.
- The old exact Night-study consumer architecture is superseded by the shipped newer School architecture.
- If the availability seam is selected later, re-author it against current main rather than restoring old pre-v9 assumptions.

## C4-136 frozen-candidate status

QA has gated all three frozen candidates assigned by the current Chat 4 pointer:

- PR #174 @ `56ca78ccb0210225136aeca1c68978296ba7d61d`, CI #582, 616/616 — **PASS-WITH-NOTES**;
- PR #175 @ `234e1a6fac0d25b0393f7ffec84eac4007347c32`, CI #593, 581/581 — **PASS-WITH-NOTES**;
- PR #172 @ `41ed6a9d54965a16bff004dae6e7fc79a2841883`, CI #592, 645/645 — **PASS-WITH-NOTES**.

All three C4-136 candidates are now integrated. C4-143 re-gated exact current main `afed43c...` with CI #679 / 672 of 672 and closed the v13 current-main truth requirement.

The v14 Undead/Poverty candidates #178/#180/#181/#182 were integrated and passed C4-144/C4-145/C4-146 post-merge exact-main gates. Their shipped behavior is part of the current product baseline.

## Acceptance conclusion

Current main is a healthy executable product baseline.

The trustworthy split is:

- **directly/naturally player-reachable:** all three starter work loops; all-ten Hard Work/Meta; complete Satyr runtime + School + presentation; complete Undead runtime + School + presentation; eight paid School courses; Forest v12 product + Forest v13 authored depth; Ordinary Poverty v14/Night recovery; current RU/EN/save/presentation infrastructure.
- **test/dependency-accelerated:** Lumber Forewoman's missing natural School producer and some repetition-heavy acceptance setup.
- **not yet complete/shipped:** Tavern complete-career wave despite completed sibling QA; frozen Hunter runtime/School and pending Hunter presentation/authored work; deep lives for Guard/Merchant/Artist-Geisha/Assassin/Prostitute; playable Palace; Secret Debt; complete global School certificate/project/endings.

No fixture, preparation artifact, draft head or frozen-but-unmerged candidate is promoted to shipped status by this document.


## C4-149 durable closeout — v15 handoff

- Exact current main: `c122d829dd3c143cbc63fb1aaea0af54216bfffb`.
- Exact push CI #758 / id `36857025229`: **SUCCESS**, 31 packs / 119 events / 39 actions / 22 endings, 711/711 tests.
- Product tree is unchanged from combined Undead main `d97a970...`; every descendant change is coordination/docs only.
- Tavern sibling QA is complete:
  - runtime #187 — PASS-WITH-NOTES;
  - authored #185 — PASS-WITH-NOTES;
  - School #191 — PASS-WITH-NOTES;
  - presentation #200 — PASS-WITH-NOTES.
- Tavern is nevertheless **not shipped** until Lead performs collision-safe integration and an exact-current-main gate validates the result.
- Hunter runtime #201 and Hunter School #199 are frozen QA candidates. Their freeze/green status does not permit Hunter to bypass Tavern integration order.
- The next incomplete ordinary career by shipped product truth is **Tavern**.
- Frozen-but-unintegrated Hunter work is not promoted to shipped status by this closeout.
