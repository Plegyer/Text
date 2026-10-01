# Chat 4 Executable Acceptance Truth — 2026-10-01

Status: C4-135 refreshed QA evidence; supersedes C4-125/C4-134 snapshots  
Owner: Chat 4 / QA + Product Acceptance Gate  
Repository: `Plegyer/Text`

## Exact executable baseline

The last exact main SHA that changed product/test code is:

- SHA: `a44d0f765fffd9f8b74307d116bf5f15e7688590`;
- workflow: `mindy-successor check`;
- run #591 / id `36825365041`;
- result: **SUCCESS**;
- validator: **22 packs / 88 events / 39 actions / 20 endings**;
- tests: **628 / 628 pass, 0 fail**.

Latest main observed during C4-135 was `70b8a7e371cb70b87ddbebf3b22566d49f367e1c`.
The comparison `a44d0f7... -> 70b8a7e...` contains only task-pointer and queue-document changes. No production or test path changed, so #591 remains the exact executable evidence for the current shipped product tree.

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

The richer Satyr presentation candidate #174 and School-v12 candidate #172 are **not** part of this shipped baseline.

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

Satyr School v12 PR #172 adds narrower Satyr-specific content/parity and is not shipped on this baseline.

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

Forest Authored Depth v13 PR #175 is not shipped on this baseline.

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

- Undead Farm still lacks a complete career life comparable to the now-shipped Satyr complete-career runtime.
- The seven later ordinary careers still lack their intended deep career-specific milestone/relationship/crisis/outcome structures.
- Playable Palace content is absent beyond the 10/10 derived availability seam.
- Secret Debt is absent as a production hidden career/state machine.
- Lumber Forewoman lacks its natural School producer.
- Full School certificate/project/ending design remains incomplete.
- Forest v13 authored narrative depth is not shipped until #175 is integrated.
- Satyr complete-career presentation v12 is not shipped until #174 is integrated.
- Satyr School v12 is not shipped until #172 is integrated.

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

These verdicts do not make their content shipped. Lead integration plus exact current-main validation remains required.

PR #178 is outside the current accepted gate set until it is rebuilt/frozen from the required current-main product base with exact-head green CI.

## Acceptance conclusion

Current main is a healthy executable product baseline.

The trustworthy split is:

- **directly/naturally player-reachable:** all three starter work loops; all-ten Hard Work/Meta; late-career base unlock/work; complete Satyr runtime slice; eight paid School courses and current School v11 content; Forest v12 natural item acquisition, three route contexts/challenge families, seasonal topology and extraction -> Lumber continuation; ordinary poverty/Night recovery; current RU/EN/save/presentation infrastructure.
- **test/dependency-accelerated:** Lumber Forewoman's missing natural School producer and some repetition-heavy acceptance setup.
- **not yet complete/shipped:** full Undead Farm career life, deep lives for the seven later careers, playable Palace, Secret Debt, complete School certificate/project/endings, and the open #174/#175/#172 presentation/content layers until integrated.

No fixture, preparation artifact, draft head or frozen-but-unmerged candidate is promoted to shipped status by this document.
