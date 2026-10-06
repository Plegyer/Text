# Chat 4 — Palace Cumulative Exact-Head QA v46

Status: **FROZEN PALACE BASE VERIFIED — SELECTIVE ASSEMBLY READY WITH TWO HISTORICAL REPAIRS**  
Owner: Chat 4  
Branch: `chat4/palace-cumulative-exact-head-qa-v44`

## Scope

This packet completes Chat 4 v44-v46 for the frozen Palace base.

It verifies the already-frozen Palace v18/v19 stack only.

It does **not** implement the later D39 live consumers.  
It does **not** mutate either frozen producer.  
It does **not** merge main.  
It does **not** run full CI.

## 1. Frozen authorities

Mechanics / Prince narrative v18:

`chat6/palace-prince-narrative-producer-v18@67f948d185883d8e706dad522e5010bff8e2bd48`

Final prose / media v19:

`chat6/palace-final-prose-media-v19@6cf19169b92fa709e8ae51cf73ff72ef2c0fac19`

Leader D39 live-consumer authority:

`mindy-successor/docs/tasks/LEADER1_D39_LIVE_CONSUMER_DECISION_2026-10-06.md`

Exact ancestry check:

`67f948d185883d8e706dad522e5010bff8e2bd48 -> 6cf19169b92fa709e8ae51cf73ff72ef2c0fac19`

is **ahead by 12 / behind by 0**.

Therefore frozen v19 is a direct descendant of the exact frozen v18 authority.

The v18 -> v19 delta is prose/localization/presentation only plus its focused test and handoff; no runtime TypeScript file changes in v19.

## 2. v44 exact-head workflow evidence

QA-only workflow:

`Chat4 Palace cumulative exact-head QA v44-v46`

Final evidence run:

**37501107902**

Job:

**112398033479**

Runner:

- self-hosted Windows X64;
- Node 22.18.0;
- npm 10.9.3.

The workflow checkout target was exactly:

`6cf19169b92fa709e8ae51cf73ff72ef2c0fac19`

Exact SHA guard output:

```text
expected=6cf19169b92fa709e8ae51cf73ff72ef2c0fac19
actual=6cf19169b92fa709e8ae51cf73ff72ef2c0fac19
```

Exact-head guard:

**PASS**

`npm ci`:

**PASS**

`npm run build`:

**PASS**

Build output:

```text
Built renderer, content catalog and desktop save validator.
```

No producer branch was changed.

## 3. Exact-head gate result

Raw step outcomes captured by the aggregate gate:

```text
typecheck=failure
validate=failure
build=success
staticv45=success
v15=failure
v16=failure
v18=failure
v19=failure
adjacency=success
```

The workflow conclusion is intentionally **failure** because the historical frozen producer still contains known exact-head defects.

This is not a runner/infrastructure failure.

## 4. Classification A — stale historical test typing

`npm run typecheck` fails only on historical Palace test typing.

Observed exact examples:

### v19 test

`tests/palace-final-prose-media-v19.test.ts`

- `catalog.definitions.quests` possibly undefined;
- implicit-any callbacks;
- inferred `{}` access to `variants`.

### v18 test

`tests/palace-prince-narrative-producer-v18.test.ts`

- implicit-any callbacks;
- inferred `{}` access to `variants`;
- optional `catalog.definitions.quests` access without narrowing.

### v15 test

`tests/palace-rich6-runtime-v15.test.ts`

- optional `catalog.definitions.careers` access without narrowing.

No production `src/**` TypeScript error was observed in this exact-head typecheck.

Classification:

**STALE TEST / STRICT-TYPE HYGIENE DEBT**

This is not a Product/mechanics defect.

Chat 2 may port/adapt these historical tests to the assembled typed catalog surface, but must not change accepted Palace behavior merely to make the tests compile.

## 5. Classification B — frozen producer typed-capability defect

`npm run validate` fails on:

```text
Недопустимая typed capability: read worldFact palace.outcome.service-life-ready
```

Exact frozen pack:

`content/packs/palace-outcome-finalize.json`

declares reads:

- `palace.access-granted`
- `palace.progression-complete`
- `palace.prep.service-life`
- `palace.prep.court-power`
- `palace.prep.inner-truth`

but its event conditions also read these existing facts with `present:false`:

- `palace.outcome.service-life-ready`
- `palace.outcome.court-power-ready`
- `palace.outcome.inner-truth-ready`

while those three are present only in the pack's write capability list.

Classification:

**FROZEN PRODUCER CAPABILITY-METADATA DEFECT**

Required selective-assembly repair:

add exactly those three existing outcome-ready facts to:

`capabilities.reads.worldFacts`

Do not alter their conditions, effects, IDs, readiness meaning, or ending eligibility.

## 6. Why Palace focused suites are red on the historical head

The exact Palace focused groups all import the normal catalog through the shared test helper.

The catalog refuses to load before Palace behavior executes because of the capability defect above.

Observed file-level results:

### D23 + v15

Files:

- `palace-d23-consumer-integration-v8.test.ts`
- `palace-derived-unlock.test.ts`
- `palace-rich6-runtime-v15.test.ts`

Result:

**0 / 3 test files loaded; 3/3 failed at catalog initialization**

### v16 UI/model/renderer

Files:

- `palace-player-facing-ui-v16.test.ts`
- `palace-player-facing-ui-renderer-v16.test.ts`

Result:

**0 / 2 loaded; 2/2 failed at catalog initialization**

### v18 Prince narrative

Files:

- `palace-prince-narrative-producer-v18.test.ts`
- `palace-prince-narrative-renderer-v18.test.ts`

Result:

**0 / 2 loaded; 2/2 failed at catalog initialization**

### v19 prose/media

File:

- `palace-final-prose-media-v19.test.ts`

Result:

**0 / 1 loaded; 1/1 failed at catalog initialization**

Every group reports the same first catalog error:

`read worldFact palace.outcome.service-life-ready`.

Therefore these failures are **blocked executable coverage**, not evidence that D23/D43/D45 mechanics themselves regressed.

Chat 4 did not patch the working tree to make historical tests pass, because v44 requires exact-head evidence.

## 7. Save/reload + ending-commit adjacency

Independent adjacency command:

- `tests/ending-meta.test.ts`
- `tests/qa-exactly-once-reload.test.ts`

Result:

**17 / 17 PASS**

Covered adjacency includes:

- eligible ending does not auto-end the run;
- `commitEnding` does not itself grant the Meta reward;
- ending-committed flow ordering;
- `completeEnding` creates one RunResult and applies reward exactly once;
- reload before completion does not duplicate grant;
- reload after completion cannot duplicate grant;
- new life preserves Meta while resetting Run domains;
- protected Meta merge preserves transaction proof;
- pre-A6 compatibility migration does not replay reward;
- all ten unique Hard Work completions still require all ten active packages for Palace qualification;
- paid-work deltas are not replayed after reload;
- ending commit/completion/newLife remains idempotent across reload boundaries.

This adjacency is executable-green on frozen v19 because those tests do not load the invalid Palace pack.

## 8. v45 static invariant gate

The QA workflow runs a read-only static gate on the exact frozen v19 checkout.

Result:

```text
STATIC_V45_PASS duties=15 statGates=12 princePhases=4 presentationSlots=19
```

### D23 invitation authority

Frozen invitation content requires:

- `palace.d23-qualified`;
- no existing `palace.access-granted`;
- explicit invitation acceptance writes `palace.access-granted`.

Invitation prose explicitly says the requirement is:

- Hard Work in all ten ordinary careers;
- all ten corresponding packages active in this life;
- no prophecy;
- no item;
- no romance;
- no eleventh profession.

The frozen Palace delta does not restore a permanent `meta.unlocks['palace']` gate.

Disposition:

**D23 AUTHORITY UNCHANGED**

### Exactly 15 structural duties

Frozen `definitions.json` contains exactly:

**15 Palace structural duty actions**

Frozen `src/core/palace.ts` also fixes:

`PALACE_MAX_STRUCTURAL_DUTIES=15`.

Disposition:

**PASS**

### One structural duty/day

Frozen `src/core/palace.ts` fixes:

`PALACE_MAX_STRUCTURAL_DUTIES_PER_DAY=1`

and rejects another structural duty when:

`lastStructuralDutyDay === current elapsed day`.

Disposition:

**STATIC PASS**

The executable v15 test that normally exercises this remains blocked only by the unrelated catalog capability defect.

### Prince readiness

Frozen `palace.confront-prince` contains exactly 12 stat conditions.

Every stat condition is:

`>= 91`

for:

- Strength
- Endurance
- Dexterity
- Reason
- Magic
- Creativity
- Wits
- Charm
- Sociability
- Manners
- Grooming
- Sexuality

There is no Lust condition.

Disposition:

**PASS — 12×91, LUST EXCLUDED**

### Confrontation cost and determinism

Frozen action:

`palace.confront-prince`

has:

- money cost = 0;
- Energy cost = 0;
- mode = `story`.

Frozen quest:

`palace.prince-confrontation`

keeps stages:

1. `ready`
2. `audit-record`
3. `name-contradiction`
4. `define-boundary`
5. `reconstruct-return`
6. `defeated`

Frozen confrontation pack contains exactly:

**4 blocking phases**

Every phase has an explicit:

`not-yet`

path returning the quest to `ready`.

No RNG/chance field is authored.

Only:

`phase-04-reconstruct-return / present-origin-trace`

writes:

`palace.prince-defeated`.

No confrontation choice performs:

- `commitEnding`;
- `completeEnding`;
- automatic Return Home acceptance.

Disposition:

**PASS — deterministic, retryable, zero-cost, no auto-commit**

### Successor world + D45 ambiguity

Phase 3 explicitly distinguishes:

- successful `world-remains-real`;
- rejected `unsupported-unreal`.

Return Home epilogue states that crossing:

- does not erase the world behind the heroine;
- leaves the Palace and its people real and continuing.

Duty 15 states:

- Palace Concordance;
- Threshold Archive;
- real inter-world Threshold;
- heroine's arrival as an anomaly;

while explicitly preserving:

**the original displacement cause is still unknown.**

Disposition:

**PASS**

### D39 remains reward identity only in frozen Palace base

Frozen v19 Palace endings carry these reward identity strings:

- Service Life -> `palace.service-life.steady-practice`
- Court Power -> `palace.court-power.formal-introduction`
- Inner Truth -> `palace.inner-truth.source-method`
- Return Home -> `palace.true.cap-200`

The frozen Palace surface contains none of the later live-consumer typed seams:

- `strongMetaFormalIntroductionAvailable`
- `useStrongMetaFormalIntroduction`
- `strongMetaKnowledge`

No live D39 consumer is invented in this QA lane.

Disposition:

**PASS**

### Strong Meta capacity firewall

The v18/v19 producer intervals do not modify a Strong Meta owner or capacity mechanic.

Current production Strong Meta authority remains separate and currently defines:

- Keystone capacity = **1**
- Specialist capacity = **2**

with `palace.true.cap-200` classified in the Specialist registry.

Chat 2 must preserve the actual assembled Strong Meta owner and must not derive capacity from historical Palace UI prose.

Disposition:

**NO PALACE CAPACITY MUTATION**

### Secret Debt / Night firewall

The v16 -> v18 producer delta changes Palace-owned content/code only:

- Palace definitions/packs/localization;
- `src/core/palace.ts`;
- `src/ui/palaceUi.ts`;
- Palace sections of `src/ui/app.ts`;
- Palace tests.

It does not modify:

- `src/core/engine.ts`;
- `src/core/schema.ts`;
- a Secret Debt owner;
- a Night owner;
- a Strong Meta owner.

The v18 -> v19 delta changes only authored Palace content/localization/presentation and tests/docs; it changes no runtime TypeScript file.

Disposition:

**NO SECRET DEBT / NIGHT OWNERSHIP MUTATION IN FROZEN PALACE DELTA**

Chat 2 must nevertheless preserve newer Secret Debt/D51/Night behavior when composing Palace into the actual integration base.

## 9. RU/EN + Palace presentation verification

Frozen v19 presentation contains exactly:

**19 Palace slots**

Independent blob audit confirms every Palace static slot uses only:

- `assets/stage-town.svg`
- `assets/stage-room.svg`

Invalid Palace static source paths:

**0**

All 19 Palace slots have localized alt-key mappings whose referenced localization rows contain both RU and EN.

The five shared Palace accessibility localization families are complete in RU/EN:

- invitation;
- service;
- archive;
- custodian;
- Return Home.

All four final Palace ending epilogue localization rows are present in both RU and EN.

Disposition:

**PASS**

Dedicated D48 Palace artwork remains optional relative to these authorized neutral fallbacks.

## 10. Collision proof against current main

Current observed main during v46 preparation:

`main@123cb79f4cd7d5981468d9f374ea17c8e39f86b0`

Current main shared-file blobs:

- `content/definitions.json@311b2fec271a274e61c34fad9645d5bff13f4993`
- `src/ui/app.ts@149e0d0eda4180298ae3364f46dd4f7b04a4d4bd`
- `content/localization.json@9281d3880d01c54f352effa5e372ad5393cc3eaa`
- `content/presentation.json@e800d2b16f2bc868273e39d45718dcd0c7fe74a5`

Frozen v19 blobs:

- `content/definitions.json@32762f60ec9bcb6e119b2cc8029d7766d3c0f862`
- `src/ui/app.ts@1e444168484734663dfab49db97ac0de440e53c5`
- `content/localization.json@64922de3b6aab606f9b2932853e6bbd686766b6a`
- `content/presentation.json@02c9a19eee0366131f793ed9e141b33a93f213b3`

All four shared owners have diverged.

Therefore:

**whole-file replacement is prohibited.**

## 11. Collision-safe selective assembly — definitions.json

Do not replace current `definitions.json`.

Compose semantically:

1. preserve all current ordinary-career definitions/endings;
2. preserve current Secret Debt/D51/Activity/Night definitions;
3. preserve current Strong Meta reward bindings already accepted on the actual assembly base;
4. add/merge Palace career/quest/action structures by stable ID;
5. preserve exact D45 stable IDs:
   - `palace.prince-confrontation`
   - `palace.confront-prince`
   - `palace.prince-defeated`;
6. preserve 15 structural duties only;
7. preserve four Palace ending IDs;
8. apply v19 text only to Palace-owned action/ending prose;
9. do not import obsolete historical global reward/registry state.

After later D39 composition, use the accepted D39 grant schema from its producer rather than trusting the historical v19 `reward/metaRewards` shape as final runtime wiring.

## 12. Collision-safe selective assembly — src/ui/app.ts

Do not replace current `app.ts`.

Surgically port only Palace-owned surfaces:

- Palace work progress panel;
- duty/support display;
- route status;
- Outcome Ready D45 term reveal;
- Prince confrontation ready/completed section;
- `palace.confront-prince` action label handling;
- Palace eligible-ending cards;
- explicit Return Home commit reminder;
- future Palace reward preview copy.

Preserve newer current/assembled UI:

- Strong Meta selector and localized modal ARIA closure;
- Secret Debt UI;
- D51/Night UI;
- Activity UI;
- current generic panel/modal/accessibility behavior;
- any later shared ending-card improvements.

No historical Palace code may restore raw modal IDs or remove newer selectors/panels.

## 13. Collision-safe selective assembly — localization.json

Do not replace the file.

Merge only Palace-owned keys from frozen v19.

Priority families include:

- Palace invitation;
- Palace progression milestones;
- Palace route-finalize;
- Prince confrontation action/events/choices;
- D45 Palace terms;
- Palace UI duty/support/route/confrontation/Return Home strings;
- Palace ending descriptions/epilogues;
- `presentation.static.palace.*` alt/caption rows.

Preserve all newer:

- Strong Meta UI rows;
- modal accessibility rows;
- Secret Debt/D51 rows;
- Activity rows;
- later D39 consumer rows;
- unrelated career/School/Night localization.

Key collision rule:

**merge by exact key and review semantic conflicts; never use historical file replacement.**

## 14. Collision-safe selective assembly — presentation.json

Do not replace the file.

Merge exactly the **19** frozen v19 Palace slot overrides by Palace slot ID.

Preserve every non-Palace current slot.

For the frozen v19 base, accepted sources are only:

- `assets/stage-town.svg`
- `assets/stage-room.svg`.

If dedicated D48 media is assembled later, apply it as a separate verified overlay.

Do not point any Palace slot to an asset path that is not actually present in the assembled tree.

## 15. Mandatory assembly repair order

When Chat 2 composes the frozen Palace base:

1. freeze the actual assembly base SHA;
2. merge v18 Palace mechanics selectively;
3. add the three missing outcome-ready facts to `palace-outcome-finalize.json -> capabilities.reads.worldFacts`;
4. port/adapt historical Palace tests for current strict typing without semantic drift;
5. merge v19 prose/localization/19 presentation slots selectively;
6. run typecheck;
7. run validate;
8. run build;
9. run D23 + Palace v15/v16/v18/v19 focused suites;
10. run save/reload + ending-commit adjacency;
11. only then layer the accepted D39 implementation;
12. independently verify D39 on the assembled Palace base;
13. only after all focused gates are green may the normal release/full-CI owner proceed.

## 16. D39 must be layered later

Leader has separately approved the D39 live-consumer design.

Formal Introduction authority:

- career `assassin`;
- relationship `assassin.handler`;
- neutral stage `formal-introduced`;
- transition `formal-introduction`.

Source Method authority:

- event `school-life-content-v1.night-study.arcana-reason`;
- `strongMetaKnowledge`-gated information-only variant;
- zero mechanical delta.

That implementation is **not part of frozen Palace v18/v19** and was not imported or modified in this Chat 4 lane.

Chat 2 must layer the accepted Chat3 D39 implementation **after** the Palace base composition and verify it independently on the combined head.

Minimum D39 post-layer verification:

- same-life earned rewards do not enter the immutable current run;
- future-life Formal Introduction selection works;
- successful use consumes exactly one use;
- same relationship cannot consume twice;
- Assassin trust path remains reachable;
- old saves require no fabricated D39 use/stage;
- Source Method is automatic and non-selectable;
- Source Method variant has zero state delta;
- Specialist capacity remains 2;
- D49 macro-lore remains sealed.

Palace release acceptance must not be declared before that combined verification is green.

## 17. Blockers and disposition

### Historical blockers carried into assembly

**P1 — typed capability metadata**

Required narrow repair before validation/focused Palace execution.

**P2 — historical Palace test strict typing**

Required test adaptation on the assembled typed catalog.

Neither blocker requires reopening:

- D23;
- D43;
- D45;
- D48;
- D49.

### Not blockers in this frozen base review

- build is green;
- save/reload/ending adjacency is 17/17 green;
- static D23/15-duty/12x91/Prince/D45/presentation invariants are coherent;
- neutral v19 media fallbacks are valid;
- no runner/infrastructure defect affected the final evidence run.

## 18. Final disposition

The exact frozen Palace source chain is coherent for **selective base assembly**, but the historical v19 head itself is not executable-green because of the two known defects above.

Chat 2 may proceed with selective Palace base assembly only if it:

- performs the narrow typed-read capability repair;
- ports the stale historical tests without semantic drift;
- preserves all newer shared-file owners;
- reruns focused Palace QA after composition;
- layers Chat3 D39 afterward;
- independently verifies D39 before Palace release acceptance.

**v44 COMPLETE — exact-head evidence captured**  
**v45 COMPLETE — invariants verified / failures classified**  
**v46 COMPLETE — collision-safe assembly guidance published**

**BUNDLE_COMPLETE — READY_FOR_CHAT2_PALACE_BASE_ASSEMBLY**
