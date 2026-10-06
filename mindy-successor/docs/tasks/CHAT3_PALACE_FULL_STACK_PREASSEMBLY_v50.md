# Chat 3 — Palace Full-Stack Preassembly v50

Status: **PREASSEMBLY COMPLETE — READY FOR CHAT2 PALACE FULL-STACK ASSEMBLY PREP**  
Owner: Chat 3  
Branch: `chat3/palace-full-stack-preassembly-v48`

This packet completes v48-v50.

It is synthesis/preassembly only.

It does **not**:

- mutate production runtime/content;
- merge main;
- create a synthetic production candidate;
- run full CI.

Chat 2 remains the sole current-main assembly/full-CI lane.

---

# 1. Frozen / accepted authorities

## Palace base

Palace mechanics / Prince narrative v18:

`chat6/palace-prince-narrative-producer-v18@67f948d185883d8e706dad522e5010bff8e2bd48`

Palace final prose/media semantics v19:

`chat6/palace-final-prose-media-v19@6cf19169b92fa709e8ae51cf73ff72ef2c0fac19`

Exact ancestry:

`67f948d185883d8e706dad522e5010bff8e2bd48 -> 6cf19169b92fa709e8ae51cf73ff72ef2c0fac19`

is cumulative.

Chat4 exact-head Palace QA / assembly repair authority:

`CHAT4_PALACE_CUMULATIVE_EXACT_HEAD_QA_v46.md`

on:

`chat4/palace-cumulative-exact-head-qa-v44`

## D39

D39 runtime / reward producer authority:

`chat5/palace-d39-reward-producer-v20@b5ab23a88ee0e18c6250251de15818ff799ff3f6`

D39 live-consumer production implementation head:

`chat3/d39-consumer-producer-v45@090f36174cbc4ae9db46ae0bdbc9b1e4a2ce1386`

D39 live-consumer handoff:

`CHAT3_D39_LIVE_CONSUMER_PRODUCER_v47.md`

Handoff document commit:

`c1c3f0ae9275b6e76c872733df0195bf73366ac1`

## Strong Meta UI

Accepted Strong Meta UI implementation head:

`chat6/strong-meta-ui-closure-v42@fac645878ebd726f50fd1364ac72414796755a2d`

Handoff:

`CHAT6_STRONG_META_UI_CLOSURE_HANDOFF_v44.md`

## Palace D48 media

Palace D48 implementation head:

`chat6/palace-d48-media-producer-v48@e0277dc302df178e73184bf1623d0e91e5237b45`

Handoff:

`CHAT6_PALACE_D48_MEDIA_HANDOFF_v50.md`

---

# 2. History classification

The critical release rule is:

**do not treat all authorities as one linear branch history.**

There is one cumulative Palace chain and several parallel overlays.

## Cumulative history

### Palace v18 -> v19

v19 is a direct descendant of v18.

Use v18 as the mechanical/content base, then apply v19 prose/localization/presentation semantics.

The v18 -> v19 delta contains no runtime TypeScript changes.

## Parallel history A — D39 runtime

D39 v20 is not a descendant of the Palace v19 frozen head.

It owns:

- Strong Meta reward runtime/schema;
- typed D39 content seams;
- engine integration;
- D39 content validation;
- two UI condition fallbacks.

It must be layered by semantic union.

## Parallel history B — D39 live consumers

The D39 live-consumer producer contains the accepted D39 runtime dependency plus:

- School Source Method authored consumer;
- Assassin Formal Introduction authored consumer;
- localization;
- focused tests.

Relative to the Palace base, this remains a parallel history.

The core D39 runtime changes must not be applied twice.

## Parallel history C — Strong Meta UI

Strong Meta UI closure is UI/localization-only.

It is parallel to Palace and D39 runtime.

It must coexist with:

- Palace UI;
- D39 condition labels;
- all current non-Palace UI.

## Parallel history D — D48 media

D48 was intentionally authored from a presentation snapshot that did **not** contain Palace v19 slots.

Therefore D48 is not a replacement presentation history.

It is exactly:

- four new Palace SVG assets;
- seventeen Palace slot overlays;
- eight new RU/EN asset alt/caption localization rows;
- one focused test.

It must be applied only after v19 Palace presentation semantics exist.

---

# 3. v48 — full dependency / collision map

## 3.1 Summary matrix

| Surface | Palace v18/v19 | D39 runtime | D39 live consumers | Strong Meta UI | D48 | Composition class |
| --- | --- | --- | --- | --- | --- | --- |
| `src/core/schema.ts` | no v18/v19 change | owner | dependency copy | no | no | D39 semantic union only |
| `src/core/content.ts` | no v18/v19 change | owner | dependency copy | no | no | D39 semantic union only |
| `src/core/engine.ts` | no v18/v19 change | owner | dependency copy | no | no | D39 semantic union only |
| `src/core/strongMeta.ts` | no v18/v19 change | owner | dependency copy | no runtime change | no | D39 union with actual assembled registry |
| `content/definitions.json` | Palace owner | no | Assassin consumer owner | no | no | shared / manual stable-ID merge |
| `src/ui/app.ts` | Palace UI owner | two D39 condition cases | dependency copy | Strong Meta selector + modal a11y owner | no | shared / surgical merge |
| `content/localization.json` | Palace prose/UI owner | no authored rows beyond app fallback | School/Assassin + D39 rows | Strong Meta UI/modal rows | four D48 alt+caption pairs | shared / exact-key merge |
| `content/presentation.json` | v19 owns 19 Palace slots | no | no | no | overlays 17 of those 19 | cumulative-then-overlay |
| Palace packs | v18/v19 owner | no | no | no | no | Palace cumulative |
| `school-life-content-v1.json` | no | typed condition support only | Source Method owner | no | no | D39 live consumer |
| `assassin-relationship.json` | no | typed condition/effect support only | Formal Introduction owner | no | no | D39 live consumer |
| Palace SVG assets | neutral fallbacks in v19 | no | no | no | four new project assets | D48 additive |

---

# 4. Exact Palace v18/v19 ownership

## v18 mechanical/narrative delta

Relative to the prior v16 Palace surface, v18 changes:

- `content/definitions.json`
- `content/localization.json`
- `content/packs/palace-invitation.json`
- `content/packs/palace-outcome-finalize.json`
- `content/packs/palace-prince-confrontation.json` — new
- `content/packs/palace-progression.json`
- `src/core/palace.ts`
- `src/ui/app.ts`
- `src/ui/palaceUi.ts`
- focused v18 tests.

Palace v18 owns the D45 mechanical/narrative structures including:

- D23 invitation authority;
- 15 structural duties;
- one structural duty/day;
- Prince confrontation quest/action;
- 12 stat gates at 91;
- deterministic four-phase confrontation;
- retryable `not-yet` path;
- `palace.prince-defeated`;
- explicit Return Home lifecycle;
- successor-world-real / displacement-cause-unknown firewalls.

## v19 cumulative prose/media delta

v19 changes only Palace-owned authored/presentation surfaces:

- `content/definitions.json`
- `content/localization.json`
- `content/packs/palace-invitation.json`
- `content/packs/palace-outcome-finalize.json`
- `content/packs/palace-prince-confrontation.json`
- `content/packs/palace-progression.json`
- `content/presentation.json`
- focused v19 test / media manifest.

No runtime TypeScript owner changes in v19.

v19 defines **19 Palace presentation slots** using accepted neutral fallbacks.

Those 19 slots are the base on top of which D48 later overlays exactly 17.

---

# 5. Palace base invariants that assembly must preserve

The Palace base is not a generic file transplant.

The following are semantic locks:

## Access

D23 Palace invitation requires:

- all ten ordinary Hard Work permanent completions;
- all ten corresponding packages active in the current life;
- no permanent Palace unlock shortcut;
- explicit invitation acceptance.

## Structural work

Exactly:

**15 structural duties**

and:

**max 1 structural duty/day**

must remain.

## Prince readiness

Exactly:

**12 progression stats >= 91**

Lust is excluded.

## Confrontation

`palace.confront-prince` remains:

- zero money;
- zero Energy;
- story mode;
- deterministic;
- retryable;
- four blocking phases;
- no RNG;
- no automatic ending commit.

Only the final successful confrontation phase writes:

`palace.prince-defeated`

## D45 / D49 lore

Must preserve:

- Palace Concordance;
- Threshold Archive;
- real inter-world Threshold;
- successor world remains real;
- heroine's arrival is anomalous;
- original displacement cause remains unknown.

No later overlay may convert this ambiguity into an origin explanation.

---

# 6. Chat4 historical repair A — typed Palace capability read

Frozen v19 validation is not clean without one narrow metadata repair.

Pack:

`content/packs/palace-outcome-finalize.json`

Its event conditions read the following existing facts with `present:false`:

- `palace.outcome.service-life-ready`
- `palace.outcome.court-power-ready`
- `palace.outcome.inner-truth-ready`

The historical pack has them in write capability ownership but omits them from:

`capabilities.reads.worldFacts`

## Required assembly repair

Add exactly those three existing facts to:

`capabilities.reads.worldFacts`

Do not change:

- IDs;
- conditions;
- effects;
- readiness meaning;
- ending eligibility;
- route ownership.

Do not broaden the pack to unrelated Palace/world facts.

---

# 7. Chat4 historical repair B — strict typing only

Historical Palace tests predate the stricter current typed catalog surface.

Observed historical type debt includes:

- optional `catalog.definitions.quests` access without narrowing;
- optional `catalog.definitions.careers` access without narrowing;
- callback implicit-any;
- inferred `{}` access to event `variants`.

## Required adaptation rule

Adapt tests to the current typed surface only.

Allowed:

- explicit narrowing;
- explicit local types;
- typed helper extraction;
- safe optional-array normalization in tests.

Forbidden:

- changing Palace mechanics to satisfy old test assumptions;
- weakening accepted assertions;
- changing D23/D43/D45 behavior;
- deleting assertions that expose real semantic drift.

---

# 8. D39 runtime ownership

D39 runtime v20 changes:

- `src/core/strongMeta.ts`
- `src/core/schema.ts`
- `src/core/engine.ts`
- `src/core/content.ts`
- two condition-rendering cases in `src/ui/app.ts`
- D39/Strong Meta focused tests.

It defines the accepted runtime for:

## Formal Introduction

Stable reward:

`palace.court-power.formal-introduction`

Class:

**Specialist**

Must remain under normal capacity:

**max 2 Specialists**

Runtime requirements include:

- selected in the immutable current-run Strong Meta snapshot;
- legal ordinary career;
- at least one completed current-life shift;
- exact authored relationship transition;
- max three successful relationship uses/run;
- max one use per relationship;
- failed transition consumes zero.

## Source Method

Stable knowledge:

`palace.inner-truth.source-method`

Lifecycle:

- automatic inherited knowledge;
- not selectable;
- consumes no Specialist slot;
- appears through the immutable run snapshot in later lives;
- same-life earning does not retroactively activate it.

## Service Life / Return Home adjacency

Preserve the accepted D39 reward identities and existing Strong Meta class/capacity semantics.

Do not derive D39 mechanics from historical v19 prose alone.

---

# 9. D39 live-consumer ownership

The D39 live producer implementation head:

`090f36174cbc4ae9db46ae0bdbc9b1e4a2ce1386`

contains the accepted D39 runtime dependency plus live consumers.

During final Palace assembly:

**apply D39 runtime once.**

Then apply only the consumer-specific authored deltas.

---

# 10. Source Method live consumer

File:

`content/packs/school-life-content-v1.json`

Existing event:

`school-life-content-v1.night-study.arcana-reason`

Existing legal trigger:

`nightChoiceCompleted school.night_study.arcana.reason`

New variant:

`source-method-crosscheck`

Condition:

`strongMetaKnowledge(palace.inner-truth.source-method)`

Existing choice:

`continue`

Effects:

`[]`

## Required preservation

Source Method must:

- not make the event legal;
- not add a new choice effect;
- not alter Night Study +2;
- not alter next-day Energy -1;
- not alter School counters;
- not write career/relationship/ending state;
- not expose D49 L2+ lore.

The pack needs the narrow typed Meta read:

`strongMetaKnowledge`

and no new write domain.

---

# 11. Formal Introduction live consumer

Shared definition file:

`content/definitions.json`

Authored pack:

`content/packs/assassin-relationship.json`

Relationship:

`assassin.handler`

New neutral stage:

`formal-introduced`

New transition:

`formal-introduction`

Exact transition meaning:

`introduced -> formal-introduced`

with only:

`introduced-at-work`

written.

## Required preservation

Formal Introduction must not directly write:

- `professional-trust-earned`;
- `handler-trust-ready`;
- conflict state;
- route state;
- ending state;
- resource;
- stat.

Existing Assassin intro gate remains:

- `operative` OR `trusted-blade`;
- not already `introduced-at-work`.

Existing baseline `professional` choice remains free.

Existing normal `build-trust` later accepts:

- `introduced`;
- `formal-introduced`;

without weakening its existing trust semantics.

Pack typed Meta read:

`strongMetaFormalIntroduction`

only.

---

# 12. Strong Meta UI ownership

Accepted implementation:

`fac645878ebd726f50fd1364ac72414796755a2d`

Files:

- `src/ui/app.ts`
- `content/localization.json`

Focused tests:

- `strong-meta-player-ui-v42.test.ts`
- `modal-aria-localization-v43.test.ts`
- `strong-meta-ui-localization-v42-v43.test.ts`

No core Strong Meta runtime/schema file changed in this UI bundle.

## Required preservation

The UI consumes existing runtime rules.

It must preserve:

- Keystone capacity = 1;
- Specialist capacity = 2;
- `palace.true.cap-200` remains a normal Specialist;
- automatic knowledge is not rendered as selectable;
- Hard Work packages are not Strong Meta slots;
- owned rewards are not auto-selected;
- snapshot still freezes only through the existing creation completion path.

## app.ts collision rule

Do not replace `app.ts` from any one producer.

The final `app.ts` must contain all of:

- current post-D42 shared UI;
- Palace v18 UI surfaces;
- D39 condition fallbacks;
- Strong Meta selector;
- localized modal ARIA names;
- Secret Debt/D51 UI from the actual assembly base;
- later current generic panel/accessibility improvements.

---

# 13. D48 media ownership

Exact D48 implementation:

`e0277dc302df178e73184bf1623d0e91e5237b45`

Adds exactly four project-owned SVGs:

1. `assets/presentation/palace-custodian-audience.svg`
2. `assets/presentation/palace-threshold-archive.svg`
3. `assets/presentation/palace-return-home-threshold.svg`
4. `assets/presentation/palace-service-interior.svg`

D48 changes:

- those four assets;
- `content/presentation.json`;
- `content/localization.json`;
- `tests/palace-d48-media-v50.test.ts`.

No runtime/mechanics file changes.

---

# 14. D48 exact presentation overlay

D48 overlays exactly **17** of v19's **19** Palace presentation slots.

## Service Interior — 7

Asset:

`assets/presentation/palace-service-interior.svg`

Slots:

- `job/palace/event/palace-progression-milestone-02-working-rhythm/default`
- `job/palace/event/palace-progression-milestone-05-trusted-service/default`
- `job/palace/event/palace-progression-milestone-08-palace-network/default`
- `job/palace/event/palace-outcome-finalize-service-life/default`
- `job/palace/event/palace-outcome-finalize-court-power/default`
- `ending/palace/service-life`
- `ending/palace/court-power`

## Threshold Archive — 4

Asset:

`assets/presentation/palace-threshold-archive.svg`

Slots:

- `job/palace/event/palace-progression-milestone-12-crossroads/default`
- `job/palace/event/palace-progression-milestone-15-outcome-ready/default`
- `job/palace/event/palace-outcome-finalize-inner-truth/default`
- `ending/palace/inner-truth`

## Custodian Audience — 5

Asset:

`assets/presentation/palace-custodian-audience.svg`

Slots:

- `location/town/palace/confront-prince/default`
- confrontation phase 01;
- confrontation phase 02;
- confrontation phase 03;
- confrontation phase 04.

## Return Home Threshold — 1

Asset:

`assets/presentation/palace-return-home-threshold.svg`

Slot:

`ending/palace/return-home`

## Two v19 invitation slots intentionally remain neutral

Do not remap:

- `job/palace/event/palace-invitation-day1-arrival/default`
- `job/palace/event/palace-invitation-reveal/default`

They remain:

`assets/stage-town.svg`

Therefore final Palace slot arithmetic is:

```text
19 v19 Palace slots
= 17 D48-overlaid slots
+ 2 neutral invitation slots
```

---

# 15. D48 localization overlay

Add exactly four RU/EN alt/caption pairs:

- `presentation.static.palace.service-interior.alt`
- `presentation.static.palace.service-interior.caption`
- `presentation.static.palace.threshold-archive.alt`
- `presentation.static.palace.threshold-archive.caption`
- `presentation.static.palace.custodian-audience.alt`
- `presentation.static.palace.custodian-audience.caption`
- `presentation.static.palace.return-home-threshold.alt`
- `presentation.static.palace.return-home-threshold.caption`

Eight localization rows total.

Do not delete or overwrite unrelated Palace v19 localization rows.

---

# 16. Shared-file collision rules

## schema.ts

Owners:

- actual current-main;
- D39 runtime.

Rule:

semantic D39 union only.

Never replace current schema wholesale from the historical D39 branch.

Preserve newer schema fields and migration contracts from the actual post-D51 assembly base.

## content.ts

Owners:

- actual current-main;
- D39 typed capability validation.

Rule:

port only D39 condition/effect/capability schema support into the actual current content validator.

Do not regress later typed capability families.

## engine.ts

Owners:

- actual current-main;
- D39 runtime;
- likely current Secret Debt/D51 assembly changes after stage 1/5 closes.

Rule:

D39 semantic union only after freezing the actual post-D51 engine.

Never use the historical D39 `engine.ts` as a whole-file source.

## strongMeta.ts

Owners:

- actual assembled Strong Meta registry;
- D39 runtime.

Rule:

merge D39 IDs/effects/classes into the actual registry.

Preserve all accepted D38/D40/D41/later Strong Meta IDs.

Capacities remain:

- Keystone: 1
- Specialist: 2

## definitions.json

Owners:

- Palace v18/v19;
- D39 Assassin live consumer;
- actual current ordinary/Secret Debt/Activity/Night/ending catalog.

Rule:

stable-ID semantic merge.

Never replace the file.

## app.ts

Owners:

- Palace v18;
- D39 runtime condition fallbacks;
- Strong Meta UI;
- actual current Secret Debt/D51/Night/Activity/shared UI.

Rule:

surgical merge only.

Never replace the file.

## localization.json

Owners:

- Palace v18/v19;
- D39 School/Assassin consumer;
- Strong Meta UI/modal accessibility;
- D48;
- current Secret Debt/D51/Night/Activity/global content.

Rule:

merge by exact localization key.

Review duplicate-key semantic conflicts explicitly.

Never replace the file.

## presentation.json

Owners:

- current presentation catalog;
- Palace v19 19-slot base;
- D48 17-slot overlay.

Rule:

1. preserve every non-Palace slot;
2. establish 19 Palace v19 slots;
3. overlay exactly 17 D48 targets;
4. retain two invitation slots on `stage-town.svg`.

Never replace the file.

---

# 17. Current pre-D51 main snapshot — informational only

Observed current main during this preassembly:

`main@a239ff75b7fa5f5ab904daf12b2960ccf0778983`

Secret Debt + D51 is still active in Chat 2.

Therefore these blobs are **not** final Palace assembly authority.

Current observed blobs:

- `src/core/schema.ts@d2a3fcd2ae638352f41149c5a78e56d7ab773042`
- `src/core/content.ts@60751fa4f179fdc7068abd4252bf45d4870c514d`
- `src/core/engine.ts@e8b979355e6ebacad7ae62dce36d625687613152`
- `src/core/strongMeta.ts@89a0a3783f52a54195c6a3d3ee6d7358305fc406`
- `content/definitions.json@311b2fec271a274e61c34fad9645d5bff13f4993`
- `src/ui/app.ts@149e0d0eda4180298ae3364f46dd4f7b04a4d4bd`
- `content/localization.json@9281d3880d01c54f352effa5e372ad5393cc3eaa`
- `content/presentation.json@e800d2b16f2bc868273e39d45718dcd0c7fe74a5`
- `school-life-content-v1.json@89735d09b2bbf517f45f77b377c8ec6a2997884b`
- `assassin-relationship.json@f5522e614f0c43ff57914aa5e9fd234432b84ef8`

These values are only drift evidence.

They must not be copied into a future assembly script as expected final blobs.

---

# 18. v49 — safe selective assembly order

The future Chat 2 Palace full-stack assembly should use this order.

## Phase 0 — freeze the actual post-Secret-Debt+D51 base

Do not start Palace full-stack production assembly before Secret Debt+D51 is Leader-merged and exact-main CI is green.

Then record:

- exact main SHA;
- exact shared-file blobs;
- current Strong Meta registry IDs/classes/capacities;
- current schema version;
- current presentation slot catalog;
- current localization key set.

## Phase 1 — Palace v18 mechanical/content base

Selectively merge Palace-owned structures from v18.

Include:

- Palace definitions/actions/quest/endings;
- Palace invitation;
- progression;
- outcome-finalize;
- Prince confrontation;
- `src/core/palace.ts`;
- `src/ui/palaceUi.ts`;
- Palace-owned `app.ts` UI fragments only;
- v18 Palace localization.

Do not transplant historical global/shared files.

## Phase 2 — apply Chat4 capability repair

Before validation, add exactly the three missing outcome-ready fact reads to:

`palace-outcome-finalize.json -> capabilities.reads.worldFacts`

No other semantic modification.

## Phase 3 — port historical Palace tests to current strict typing

Do only test typing adaptation.

Do not change Product behavior.

## Phase 4 — apply cumulative Palace v19 semantics

Apply v19 Palace-only changes:

- final invitation prose;
- milestone prose;
- route-finalize prose;
- Prince confrontation prose;
- action/ending prose;
- RU/EN Palace localization;
- exactly 19 Palace presentation slots using v19 neutral fallbacks.

At this point the assembled Palace base should semantically equal accepted v19 plus the two Chat4 historical repairs.

## Phase 5 — run Palace-base focused gate

Before D39:

- typecheck;
- validate;
- build;
- Palace D23/v15/v16/v18/v19 tests;
- save/reload/ending adjacency.

If this base is not green, stop.

Do not use D39/D48 to mask a bad Palace base.

## Phase 6 — layer D39 runtime by semantic union

Port accepted D39 runtime support into the actual post-D51 shared owners:

- schema;
- content typed conditions/effects/capabilities;
- engine;
- Strong Meta registry/runtime;
- two UI condition explanation cases.

Do not wholesale copy the historical D39 core files.

Do not apply the dependency copy a second time from the live-consumer branch.

## Phase 7 — layer D39 live consumers

Apply consumer-specific authored deltas:

### School

- Meta read capability;
- Source Method variant;
- RU/EN copy;
- Source Method tests.

### Assassin

- `formal-introduced` stage;
- `formal-introduction` transition;
- `build-trust` from-stage compatibility;
- D39 intro choice;
- trust event stage compatibility;
- Meta read capability;
- RU/EN localization;
- exactly-once/save-reload test.

## Phase 8 — merge Strong Meta UI

Merge:

- Strong Meta selector;
- localized selector copy;
- modal accessible-name logic;
- RU/EN rows.

Preserve D39 condition cases already composed into `app.ts`.

Preserve all current Secret Debt/D51/Night/Activity/shared UI.

## Phase 9 — apply D48 as Palace-only media overlay

Add four SVG assets.

Then:

- start from the already-assembled v19 19 Palace slots;
- replace only the 17 approved D48 slot objects;
- add the 8 D48 localization rows;
- keep both invitation slots on `assets/stage-town.svg`.

Do not alter mechanics.

## Phase 10 — combined focused gate

Run the full focused roster below.

Only after that gate is green should Chat 2 run its one permitted full CI.

---

# 19. Focused gate roster

## Build / catalog

```text
npm run typecheck
npm run validate
npm run build
```

## Palace base

At minimum:

```text
tests/palace-d23-consumer-integration-v8.test.ts
tests/palace-derived-unlock.test.ts
tests/palace-rich6-runtime-v15.test.ts
tests/palace-player-facing-ui-v16.test.ts
tests/palace-player-facing-ui-renderer-v16.test.ts
tests/palace-prince-narrative-producer-v18.test.ts
tests/palace-prince-narrative-renderer-v18.test.ts
tests/palace-final-prose-media-v19.test.ts
```

## Ending transaction / reload adjacency

```text
tests/ending-meta.test.ts
tests/qa-exactly-once-reload.test.ts
```

Historical Chat4 evidence for this pair:

**17/17 PASS**

on frozen v19 adjacency.

## D39 runtime / Strong Meta

```text
tests/palace-d39-reward-producer-v20.test.ts
tests/strong-meta-registry-v7.test.ts
tests/strong-meta-engine-integration-v7.test.ts
tests/migration.test.ts
```

## D39 Source Method / School

```text
tests/school-life-content-reload.test.ts
tests/school-night-study-adapter.test.ts
tests/school-production-v11-content-quality.test.ts
tests/school-production-v11-locale-save.test.ts
```

## D39 Formal Introduction / Assassin

```text
tests/d39-formal-introduction-assassin-v46.test.ts
tests/assassin-runtime-invariants.test.ts
tests/assassin-natural-acceptance.test.ts
tests/assassin-boundaries.test.ts
tests/assassin-production-presentation.test.ts
```

D39 producer exact focused evidence before handoff:

**84/84 PASS**

with typecheck / validate / build PASS.

## Strong Meta UI

```text
tests/strong-meta-player-ui-v42.test.ts
tests/modal-aria-localization-v43.test.ts
tests/strong-meta-ui-localization-v42-v43.test.ts
```

## D48

```text
tests/palace-d48-media-v50.test.ts
```

Also retain current presentation/localization source-integrity and accessibility-parity tests on the actual assembly base.

---

# 20. Combined acceptance invariants

The final focused target must prove all of these together.

## Palace

- D23 invitation unchanged;
- exactly 15 structural duties;
- max one structural duty/day;
- exactly 12 Prince stats at 91;
- Lust excluded;
- zero-cost deterministic confrontation;
- no auto-ending commit;
- Return Home explicit;
- successor world remains real;
- original displacement cause remains unknown.

## Strong Meta

- max one Keystone;
- max two Specialists;
- `palace.true.cap-200` consumes a Specialist slot;
- Formal Introduction consumes a Specialist slot;
- Source Method consumes no slot;
- Hard Work packages consume no Strong Meta slot;
- owned rewards are not silently auto-selected.

## D39

- same-life earned D39 rewards do not activate in the immutable current run;
- later-life Source Method is automatic;
- Source Method has zero mechanical delta;
- Formal Introduction requires legal Assassin state + current-life shift;
- successful Formal Introduction consumes exactly one relationship use;
- same relationship cannot consume twice;
- failed transition consumes zero;
- Assassin normal trust path remains reachable;
- old saves fabricate no D39 stage/use.

## Presentation

- 19 Palace slots total from the Palace v19 family;
- 17 use D48 assets;
- 2 invitation slots remain neutral `stage-town.svg`;
- no D48 asset appears in non-Palace slots;
- all four D48 asset alt/caption pairs have RU/EN parity;
- no missing asset path.

---

# 21. Stop conditions

Stop selective assembly and reconcile if any of the following occurs.

## Base / history

- Secret Debt+D51 has not yet been Leader-merged and exact-main green.
- Actual assembly base SHA is not frozen.
- A historical producer file is being used as a wholesale replacement for a diverged shared owner.

## Palace

- D23 access becomes permanent or item/romance/prophecy gated.
- structural duty count is not 15.
- more than one structural duty/day becomes possible.
- Prince gate is not exactly 12 stats at 91.
- Lust enters the Prince gate.
- confrontation gains RNG, money or Energy cost.
- confrontation auto-commits an ending.
- D45/D49 ambiguity is weakened.
- original displacement cause becomes known.

## Chat4 repairs

- the three outcome-ready reads are still missing.
- capability repair adds unrelated reads/writes.
- historical tests are “fixed” by changing Palace semantics instead of typing.

## D39 / Strong Meta

- D39 runtime is applied twice.
- existing Strong Meta IDs disappear while composing D39.
- Keystone capacity differs from 1.
- Specialist capacity differs from 2.
- Source Method becomes selectable.
- Source Method consumes a slot.
- same-life Source Method activates.
- Source Method gains mechanical effects.
- Source Method leaks Palace/Threshold/origin/return explanation before authorized reveal.
- Formal Introduction bypasses Assassin career gate/current-life shift.
- Formal Introduction writes trust/conflict/route/career/ending state directly.
- failed Formal Introduction consumes a use.
- normal Assassin trust progression becomes unreachable.

## UI / localization

- Palace `app.ts` import removes Strong Meta selector/modal a11y.
- Strong Meta UI import removes Palace surfaces.
- Secret Debt/D51/Night/Activity/shared UI disappears.
- raw modal route IDs return as accessible names.
- required RU/EN rows are lost.
- localization is replaced wholesale.

## Presentation / D48

- `presentation.json` is replaced wholesale.
- final Palace slot count differs from the accepted 19-slot Palace family.
- D48 overlays a slot outside the approved 17.
- either invitation slot is remapped away from `assets/stage-town.svg`.
- a D48 asset is used by a non-Palace slot.
- more than four D48 Palace SVG masters are required to make the assembly work.
- any approved D48 SVG is missing.
- an overlay target has a third semantic value that matches neither v19 base nor D48 authority.

## Gate

- typecheck fails;
- validate fails;
- build fails;
- any Palace/D39/Strong Meta UI/D48 focused assertion fails.

Do not proceed to full CI while a focused stop condition remains.

---

# 22. Post-Secret-Debt+D51 current-main recheck requirements

This recheck is mandatory immediately before Chat 2 begins Palace assembly.

Secret Debt+D51 is currently still active in:

`chat2/assembly-secret-debt-d51-current-main-recovery-v2`

Therefore the present `main` is not the final Palace base.

After Secret Debt+D51 closes:

## Recheck A — exact base

Record the exact new main SHA after:

- Leader merge;
- exact-main CI success.

## Recheck B — shared file blobs

Re-fetch at minimum:

- `src/core/schema.ts`
- `src/core/content.ts`
- `src/core/engine.ts`
- `src/core/strongMeta.ts`
- `content/definitions.json`
- `src/ui/app.ts`
- `content/localization.json`
- `content/presentation.json`
- `content/packs/school-life-content-v1.json`
- `content/packs/assassin-relationship.json`

Also inspect any Palace pack already present on the new base.

## Recheck C — current Strong Meta registry

Enumerate current accepted IDs/classes.

Confirm:

- all existing accepted rewards survive;
- capacity is still 1 Keystone + 2 Specialists;
- no D39 reward is already partially assembled under a conflicting implementation.

## Recheck D — D39 duplication

Search the actual base for:

- `palace.court-power.formal-introduction`
- `palace.inner-truth.source-method`
- `strongMetaKnowledge`
- `strongMetaFormalIntroductionAvailable`
- `useStrongMetaFormalIntroduction`
- `formal-introduced`
- `formal-introduction`

If any are already present, diff their exact semantics before applying producer hunks.

Do not duplicate IDs.

## Recheck E — Palace historical repairs

Check whether the current base already contains:

- the three outcome-ready `reads.worldFacts`;
- ported strict-typing versions of the Palace tests.

If already repaired, preserve the current repair rather than re-applying a historical patch blindly.

## Recheck F — presentation

Check:

- current non-Palace slot inventory;
- existing Palace slot IDs if any;
- global presentation work already assembled.

Never remove current non-Palace slots to recreate v19.

## Recheck G — Secret Debt/D51 firewall

Diff Palace/D39 shared-file hunks specifically against the newly merged Secret Debt+D51 code.

Preserve all newly accepted:

- Secret Debt runtime;
- D51 provenance/compatibility behavior;
- Night precedence;
- UI;
- localization;
- migration/save logic.

Any shared-file ambiguity is a stop condition, not a reason to prefer the older Palace/D39 blob.

---

# 23. Whole-file replacement prohibition

Whole-file replacement is prohibited for:

- `src/core/schema.ts`
- `src/core/content.ts`
- `src/core/engine.ts`
- `src/core/strongMeta.ts`
- `content/definitions.json`
- `src/ui/app.ts`
- `content/localization.json`
- `content/presentation.json`

It is also prohibited for any current School/Assassin pack if post-authority work has modified the same file.

Potential direct-add candidates are limited to unique absent files such as:

- `content/packs/palace-prince-confrontation.json` if not already present;
- the four D48 SVGs;
- unique focused test files.

Even direct-add candidates must be checked for path existence first.

---

# 24. Final assembly model

The intended semantic stack is:

```text
actual post-Secret-Debt+D51 main
-> Palace v18 mechanics/content
-> Chat4 narrow capability repair + strict-test adaptation
-> Palace v19 prose/localization/19-slot presentation base
-> D39 runtime semantic union
-> D39 School + Assassin live consumers
-> Strong Meta selector/modal accessibility UI union
-> D48 four-asset / 17-slot Palace-only overlay
-> combined focused gate
-> Chat2 full CI
-> Leader merge
-> exact-main CI
```

This order keeps:

- Palace mechanics authoritative;
- v19 prose authoritative;
- D39 runtime single-owned;
- D39 consumers live;
- Strong Meta UI current;
- D48 visual-only;
- Secret Debt/D51 preserved;
- D45/D49 lore sealed.

---

# 25. Final disposition

v48 collision/dependency map:

**COMPLETE**

v49 selective assembly order + gate:

**COMPLETE**

v50 handoff:

**COMPLETE**

No production file was modified.

No full CI was run.

**BUNDLE_COMPLETE — READY_FOR_CHAT2_PALACE_FULL_STACK_ASSEMBLY_PREP**
