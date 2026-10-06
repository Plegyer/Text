# Chat 3 — Activity Cumulative Assembly Preflight v24

Status: **RESEARCH COMPLETE — READY FOR CHAT2 PREFLIGHT**  
Owner: Chat 3  
Branch: `chat3/activity-cumulative-assembly-preflight-v24`

## Accepted source anchors

Four-region Activity baseline through Restricted Sites:

`chat3/restricted-sites-production-v15@ab378d68765f7c9bbff43abf3b4b41e24df82e01`

Executable-green Camp repair:

`chat4/activity-camp-baseline-repair-v19@efde0a38bf71a8946194402a9fc47abb168f2aff`

D38 ending mechanics:

`chat3/activity-ending-family-producer-v16-r1@3cf69d7cb3df1a58d68908159d0acc14736435c4`

D38 ending content/presentation:

`chat3/activity-ending-content-presentation-v17@df9ef5c3d04cfd8eb582c24838d971854e984218`

Current production main observed during this research:

`main@e1104bf49f58699d2a2375709b3129ba37c80927`

This current-main SHA is **not** the final Activity assembly base.

Leader queue order remains:

1. D42 Night;
2. Secret Debt v12 + D51;
3. Palace cumulative;
4. Activity cumulative.

Chat 2 must therefore freeze and assemble onto the **actual post-Palace current main**, not onto the historical Activity producer base and not onto the current research-time main.

No production runtime was modified by Chat 3 in v24.  
No full CI was run.

---

# 1. Product authority that must remain exact

D36 Activity rules:

- four 1.0 regions:
  - Forest Frontier;
  - Trade Corridor;
  - Anomalous Reach;
  - Restricted Sites Network;
- Activity is a game-within-the-game, not a flat event list;
- new entry costs exactly **2 daily Energy**, once;
- reload/resume never repays entry cost;
- Field Time baseline = **6 segments per field day**;
- global Energy is not Activity stamina;
- specialized families:
  - Tracking Triangulation;
  - Pattern / Ritual Circuit;
  - Infiltration / Suspicion;
- no universal Activity XP;
- explicit multi-day Camp only;
- maximum 2 Camp nights per Activity entry;
- Camp advances global calendar once per night;
- Camp refreshes Field Time, not daily Energy;
- Secret Debt forced Night has absolute priority over Camp;
- Activity never substitutes for Palace qualification/duty/True Ending;
- standalone Activity ending baseline:
  - >=3/4 anchors;
  - >=2 mini-game families;
  - >=1 meaningful extracted result;
  - >=1 contact/companion thread;
  - no ordinary Hard Work requirement;
  - no Palace requirement;
  - explicit D16 ending commit.

D38 ending family:

- `ending.activity.pathfinder`;
- `ending.activity.preservation`;
- `ending.activity.network`.

D38 reward IDs:

- `specialist.activity.surveyors-atlas`;
- `specialist.activity.field-archive`;
- `specialist.activity.contact-network`.

All three are normal Specialists:
- slot cost 1;
- total active Specialist capacity remains current D28 max 2;
- no Activity-only bonus slot;
- no generic starting money/stats/Energy/calendar reward;
- no Palace bypass;
- no Secret Debt forced-Night suppression.

---

# 2. Exact region producer lineage and file ownership

## Forest Frontier v12

Base:

`main@ecaf2af5de0932b3c9bd4d87b62533c74ed1e61e`

Frozen v12:

`d151e4b99378d56bf17397cc0df8aa0fffa9d68a`

Production files changed:

- `content/definitions.json`
- `content/packs/forest-frontier-production.json`
- `src/core/content.ts`
- `src/core/engine.ts`
- `src/core/schema.ts`
- `src/ui/app.ts`

Focused tests:
- `tests/forest-frontier-production-hardening-v12.test.ts`
- historical Forest authored-depth regression fixture.

Forest v12 owns the first D36 shared runtime extension:
- finite Field Time;
- option-local effects;
- staged mini-game state;
- route selection;
- deterministic save/reload;
- exact one-time 2-Energy entry.

## Trade Corridor v13

Base:

`d151e4b99378d56bf17397cc0df8aa0fffa9d68a`

Frozen v13:

`d176dea7c640d34e12dbb3abf94c9b7895fd43bb`

Production files changed:

- `content/definitions.json`
- `content/packs/trade-corridor-production.json`
- `src/ui/app.ts`

No shared Activity runtime file changed.

Focused test:
- `tests/trade-corridor-production-v13.test.ts`

## Anomalous Reach v14

Base:

`d176dea7c640d34e12dbb3abf94c9b7895fd43bb`

Frozen v14:

`266f1de7cc9afdccff36d8360771a059d9d19e65`

Production files changed:

- `content/definitions.json`
- `content/packs/anomalous-reach-production.json`
- `src/ui/app.ts`

No shared Activity runtime file changed.

Focused test:
- `tests/anomalous-reach-production-v14.test.ts`

## Restricted Sites v15

Base:

`266f1de7cc9afdccff36d8360771a059d9d19e65`

Frozen v15:

`ab378d68765f7c9bbff43abf3b4b41e24df82e01`

Production files changed:

- `content/definitions.json`
- `content/packs/restricted-sites-production.json`
- `src/core/content.ts`
- `src/core/engine.ts`
- `src/core/schema.ts`
- `src/ui/app.ts`

Focused test:
- `tests/restricted-sites-production-v15.test.ts`

Restricted v15 adds only the narrow shared Infiltration / Suspicion state:
- optional `suspicionDelta`;
- optional `minSuspicion`;
- optional `maxSuspicion`;
- persisted mini-game `suspicion: 0..100`, default 0;
- deterministic clamping and gate evaluation.

It does not create a second Activity engine.

---

# 3. Exact Camp ownership

## Frozen Camp semantics

Camp v17:

`chat4/activity-camp-persistence-producer-v17@0cae33dd3518dbda7d6d84e4ea6661b02fe49886`

Base:
v15 Activity baseline.

Production runtime changed:

- `src/core/schema.ts`
- `src/core/content.ts`
- `src/core/engine.ts`

Focused test:
- `tests/activity-camp-persistence-v17.test.ts`

Camp does **not** change `content/definitions.json`.

The four v15 regions are all still `same_day` and do not opt into Camp.

Therefore Camp runtime is infrastructure for explicitly authored multi-day Activity objectives, not an implicit multi-day conversion of Forest/Trade/Anomalous/Restricted.

## Persisted Camp contract

Every active Activity envelope has local Camp v1 state:

```text
campStateVersion = 1
campState = {
  phase:
    idle
    | chosen
    | calendar_advanced
    | field_day_ready,
  nightsUsed: 0..2,
  boundaryDay: number | null,
  calendarAdvanceCommitted: boolean,
  fieldTimeRefreshCommitted: boolean
}
```

A definition may use Camp only when:

- `campPolicy` exists;
- `timePolicy = can_advance_days_internally`;
- finite Field Time exists.

No `campPolicy` means current same-day behavior remains.

## Camp baseline repair v19

Accepted executable-green SHA:

`efde0a38bf71a8946194402a9fc47abb168f2aff`

Important: the branch later moved, but Leader pointer/queue explicitly freeze **efde0a38...** as the assembly source.

Green evidence:

- workflow ID: `374615552`;
- run ID: `37206785081`;
- job ID: `111449513323`;
- exact SHA guard: PASS;
- typecheck: PASS;
- validate: PASS;
- build: PASS;
- focused cumulative suite: **107/107 PASS**;
- Camp-specific: **7/7 PASS**.

v19 does not change Camp production runtime semantics.

Relative to frozen v17, production runtime remains byte-identical:
- `src/core/schema.ts`;
- `src/core/engine.ts`;
- `src/core/content.ts`;
- `content/definitions.json`.

The only production content repair is:

`content/packs/forest-frontier-production.json`

capability-manifest reads added for:
- `activity.forest-frontier.result.research-grade`;
- `forest.frontier.school-reflection-recorded`.

No Forest mechanics changed.

The remainder of v19 repair is tests/workflow fixture maintenance.

---

# 4. Exact D38 ownership

## Mechanics v16

Base:

`ab378d68765f7c9bbff43abf3b4b41e24df82e01`

Frozen:

`3cf69d7cb3df1a58d68908159d0acc14736435c4`

Production/content changes:

- `content/definitions.json`
- `content/localization.json`
- new `content/activity-ending-family-v16.fixture.json`

Focused test:
- `tests/activity-ending-family-v16.test.ts`

No changes to:
- `src/core/engine.ts`;
- `src/core/schema.ts`;
- `src/core/hardWorkMeta.ts`;
- any four-region Activity definition.

Thus D38 mechanics are additive ending definitions + Strong Meta binding contract.

## Content/presentation v17

Base:

`3cf69d7cb3df1a58d68908159d0acc14736435c4`

Frozen:

`df9ef5c3d04cfd8eb582c24838d971854e984218`

Changed:

- `content/definitions.json` — D38 title/description/epilogue only;
- `content/localization.json`;
- `content/presentation.json`;
- `src/ui/app.ts` — localized ended-state epilogue consumer only.

Added:

- `content/activity-ending-missing-assets-v17.json`;
- `tests/activity-ending-content-presentation-v17.test.ts`.

No runtime mechanics changed.

---

# 5. Current-main starting point and legacy compatibility

At research-time current main contains these Activity definitions:

- `lumber.forest`;
- `hunter.expedition`;
- `assassin.infiltration`.

It does not contain:
- `trade.corridor`;
- `anomalous.reach`;
- `restricted.sites`;
- any `ending.activity.*`.

Current main also does not contain the four regional production packs or D38 fixture/manifests.

Existing and v15 versions of:
- `lumber.forest`;
- `hunter.expedition`;
- `assassin.infiltration`

remain definition `version: 1`, entry Energy 2, same-day.

This is important for active-save compatibility.

Do not bump these definition versions merely because the richer v15 content is assembled.

The v12/v15 migration strategy already supports old envelopes by:
- defaulting `optionModelVersion` to 0;
- defaulting mini-game collections;
- deriving missing `fieldTimeRemaining` from the current definition and prior step count;
- defaulting missing mini-game suspicion to 0.

An old active version-1 Activity can therefore remain an old option-model envelope rather than being reinterpreted as a newly started richer route.

---

# 6. Recommended exact composition order

On the actual post-Palace current-main SHA:

## Phase A — freeze the real base

1. Fetch actual `main`.
2. Record exact SHA.
3. Confirm D42, Secret Debt+D51 and Palace production gates already merged/green.
4. Re-read current `engine.ts`, `schema.ts`, `content.ts`, `definitions.json`, `app.ts`, localization and presentation before editing.

## Phase B — D36 shared runtime

5. Selectively port Forest v12 Activity runtime changes into current:
   - schema;
   - engine;
   - content validation.
6. Selectively port Restricted v15 suspicion extension.
7. Do not replace current schema6 or current engine wholesale.

## Phase C — region content

8. Add/merge the exact v15 Activity definitions for:
   - Forest Frontier;
   - Trade Corridor;
   - Anomalous Reach;
   - Restricted Sites.
9. Preserve existing current-main Hunter Expedition and Assassin legacy Activity.
10. Add regional packs, using the accepted Camp-repair SHA as the preferred Forest pack source:
   - `forest-frontier-production.json` from `efde0a38...`;
   - `trade-corridor-production.json`;
   - `anomalous-reach-production.json`;
   - `restricted-sites-production.json`.
11. Compose the Activity Explore/UI changes into current `app.ts`.

## Phase D — Camp

12. Add Camp v17 typed substate and validation.
13. Add Camp engine state machine:
   - choose;
   - calendar advance;
   - forced-Night intercept;
   - Field Time refresh.
14. Fold Camp local migration into current schema6 parse/migration chain.
15. Carry v19 test/manifest baseline repairs.
16. Do not change any of the four same-day region definitions to use Camp.

## Phase E — D38 ending mechanics

17. Add the three D38 ending definitions from v16.
18. Preserve exact common + path-specific conditions.
19. Add `activity-ending-family-v16.fixture.json` as the machine-readable binding contract.
20. Bind D38 permanent rewards into the **canonical current Strong Meta Specialist system**; do not preserve the historical generic-unlock implementation as final runtime.

## Phase F — D38 final content/presentation

21. Overlay v17 final title/description/epilogue fields for the three D38 endings.
22. Merge D38 localization by key.
23. Merge exactly three D38 ending presentation slots.
24. Merge the ended-screen localized epilogue consumer into the post-Palace `app.ts`.
25. Add `activity-ending-missing-assets-v17.json`.

## Phase G — verification

26. Run typecheck.
27. Run validate.
28. Run build.
29. Run exact focused suite below.
30. Only after focused green should Chat 2 use its normal full-CI lane.

---

# 7. Files that must be manually composed

The Activity tranche is not a historical cherry-pick.

## `src/core/engine.ts` — highest risk

Activity source owns:
- finite Field Time;
- route options;
- mini-game transitions;
- suspicion;
- result finalization;
- Camp state machine;
- forced-Night handoff at Camp boundary;
- Activity migration helpers.

Post-Palace current main will own newer:
- schema6 save flow;
- Strong Meta;
- D40/D41;
- D42 Night;
- Secret Debt v12;
- D51 next-day Energy compatibility;
- Palace atomic runtime;
- current ending transaction logic.

Therefore:
**manual semantic composition only**.

Never copy `engine.ts` from v15, v17 Camp, v16 D38 or v17 content wholesale.

## `src/core/schema.ts` — highest risk

Activity source is historical schema5-era.

Final assembly must remain current schema6 unless later production explicitly changes it.

Selectively add:
- finite Activity Field Time;
- route/resolved option state;
- mini-game state;
- suspicion default 0;
- Camp v1 substate.

Preserve:
- Secret Debt state;
- Strong Meta state/snapshot/runtime;
- Palace state;
- current NightFlow;
- current ending/save structures;
- current migration chain.

## `src/core/content.ts` — high

Compose Activity validator extensions:
- Field Time consistency;
- mini-game transition validity;
- suspicion gate validity;
- Camp policy/time-policy validation;
- typed option effects/capability checks.

Preserve current:
- Secret Debt capability validation;
- Palace/content rules;
- Strong Meta ending/reward validation;
- all newer domain validators.

## `content/definitions.json` — high

Must combine:
- post-D42 definitions;
- Secret Debt actions/endings;
- Palace actions/endings/quest;
- current ordinary career endings;
- Activity v15 definitions;
- D38 ending definitions.

Never replace wholesale.

## `src/ui/app.ts` — high

Must combine:
- D42 Night UI;
- Secret Debt UI;
- Palace UI;
- current Strong Meta controls;
- Activity Explore entries;
- generic Activity route/checkpoint/Field Time/mini-game display;
- Restricted suspicion display;
- D38 localized ending epilogue.

Never replace wholesale.

## `content/localization.json` — high/key-local

Merge D38 v17 keys only.

Regional production copy is primarily pack/definition authored text; do not overwrite unrelated localization.

## `content/presentation.json` — high/key-local

Merge only D38 ending overrides:
- `ending/activity/pathfinder`;
- `ending/activity/preservation`;
- `ending/activity/network`.

Preserve D42, Palace and global mappings.

---

# 8. Files that are good direct-add candidates

Assuming the actual post-Palace base still does not independently add the same paths:

- `content/packs/forest-frontier-production.json` — use `efde0a38...` repaired version;
- `content/packs/trade-corridor-production.json`;
- `content/packs/anomalous-reach-production.json`;
- `content/packs/restricted-sites-production.json`;
- `content/activity-ending-family-v16.fixture.json`;
- `content/activity-ending-missing-assets-v17.json`;
- source-focused test files.

Even for direct-add candidates:
- validate capability manifests;
- validate referenced facts/actions/items;
- validate content packs against the actual assembled catalog.

---

# 9. Camp + four-region compatibility

The four 1.0 regions remain same-day.

Therefore:

- no current region gets a free extra field day;
- no current region can Camp merely because Camp runtime exists;
- D38 reachability calculations from v18 remain based on same-day region entries;
- Camp does not change D38 anchor/marker facts;
- Camp does not add a fourth universal Activity resource;
- Camp does not change 2-Energy entry.

Camp is offered only for a definition explicitly authored with:
- `campPolicy`;
- `can_advance_days_internally`;
- finite Field Time.

The two-night cap is absolute per Activity entry.

Camp:
- does not run city voluntary Night;
- does not charge city lodging by itself;
- does not refresh daily Energy;
- refreshes only Activity Field Time;
- advances global calendar exactly once per completed Camp night.

---

# 10. Camp + D38 Specialist compatibility

The D38 Specialist runtime is not implemented on the frozen v16 branch; v16 supplies exact Product mechanics and a binding fixture.

When Chat 2 binds them to current Strong Meta, Camp persistence must remain compatible.

## Surveyor's Atlas

`specialist.activity.surveyors-atlas`

- applies to first authored region survey/discovery action normally costing exactly 1 Field Time;
- one saving per region per run;
- max 4 Field Time saved/run;
- normal Field Time baseline remains 6.

Camp interaction:
- a saved 1 Field Time may naturally delay reaching Field Time 0;
- it may therefore delay Camp eligibility by one segment;
- this is ordinary consequence of the authorized saving, not an extra Camp benefit;
- Camp refresh still restores exactly the definition's normal Field Time budget, not 7 and not a Specialist bonus.

Persist per-region use state across save/reload/Camp boundaries.

## Field Archive Protocol

`specialist.activity.field-archive`

- only legally obtained `activity-secure-eligible` results;
- one secured result per region/run;
- max 4;
- secured result may survive later escape/failure.

Camp interaction:
- a Camp checkpoint must not duplicate a Secured result;
- save/reload before/after Camp must preserve secure ownership exactly once;
- Camp itself never auto-secures a result;
- Camp never converts generic inventory into cross-life state.

## Expedition Contact Network

`specialist.activity.contact-network`

- normal region unlock first;
- one authored `activity-network-introduction` per region/run;
- max 4.

Camp interaction:
- one introduction remains consumed across Camp/save/reload;
- Camp cannot reset regional use state;
- introduction never bypasses forced Night, relationship stage, item/career/Palace/ending gates.

---

# 11. D38 Strong Meta binding — mandatory assembly seam

Current research-time canonical Strong Meta registry does **not** contain:

- `specialist.activity.surveyors-atlas`;
- `specialist.activity.field-archive`;
- `specialist.activity.contact-network`.

Frozen D38 v16 intentionally records historical permanent ownership through generic `unlock` seams and explicitly states:

`CHAT2_CANONICAL_STRONG_META_BINDING_REQUIRED`.

Therefore final production assembly must not:
- leave these as generic unlock-only rewards;
- create a second Activity Specialist registry;
- grant a third/free Activity Specialist slot;
- make them automatically active.

Chat 2 must bind the exact D38 IDs/mechanics into the canonical current Strong Meta Specialist system.

Required lifecycle:

ending eligible
-> explicit commit
-> normal `completeEnding`
-> permanent reward ownership exactly once
-> available for selection only on later New Start+
-> active only if selected in one of normal max-two Specialist slots.

Reward earned in the current life does not activate retroactively in that same run.

---

# 12. Secret Debt forced-Night firewall

This is a hard assembly gate.

## Already bound at Camp boundary

Before Camp commits its calendar advance, it must query the existing resolver seam for an eligible consuming forced:

`nightPhase(before_lodging)`

If Secret Debt forced Night wins:

- Camp calendar advance does not occur;
- Activity continuation ends at that boundary;
- forced Night becomes pending;
- NightFlow owns the rest of Night;
- lodging/next-day modifiers/calendar advance/start-day processing are NightFlow-owned;
- the Secret Debt Energy -1 remains;
- Camp does not refresh Field Time.

No Activity Specialist may suppress this.

## Accepted -> trap day reached through Camp calendar advance

Camp v17 was authored before the final typed Secret Debt runtime.

Final composition must preserve Secret Debt start-day activation when a Camp calendar commit crosses into the exact trap day.

Required ordering:

1. Camp validates boundary;
2. if already-bound forced Night is eligible, it preempts before Camp advance;
3. otherwise global calendar advances exactly once;
4. normal start-day hooks run, including Secret Debt trap activation if due;
5. if the character becomes bound at that boundary, the new bound state is authoritative before further field continuation;
6. no retroactive forced-Night penalty is invented for the preceding night;
7. subsequent bound Night cannot be replaced by Camp.

Do not duplicate Secret Debt activation logic inside Activity.

Use the current shared start-day seam.

## D51 interaction

D51 is a city Night provenance compatibility rule for:
- Street lodging -1;
- bound forced-Night -1.

Ordinary Camp:
- charges no lodging;
- therefore does not itself create Street provenance.

If forced Secret Debt Night preempts Camp:
- NightFlow resumes authority;
- if Street lodging is then the legal selected lodging, current D51 handling applies normally;
- Camp adds no extra floor and no extra penalty.

Activity entry cost remains 2.

---

# 13. Save / migration risks

Final production currently uses schema6.

Do not import historical Activity schema5 migration ownership.

## Active old Activity envelope

Support old version-1 active saves.

For old envelope fields:

### `optionModelVersion`

Default:
0.

This allows an already-active legacy Activity to continue under its old action model rather than suddenly exposing newly authored route options mid-entry.

### `fieldTimeRemaining`

If absent:
- if the assembled definition has finite Field Time, derive from its normal segment count minus already recorded steps;
- otherwise remain null.

Do not repay entry Energy.

### `miniGames`

If absent:
- initialize empty map.

### `suspicion`

If an existing mini-game state lacks suspicion:
- default to 0.

Do not infer suspicion from route or history.

## Camp local migration

Before final schema parse:

If and only if both:
- `campStateVersion` absent;
- `campState` absent;

add exact neutral Camp v1 state.

If one exists without the other, or version is unsupported:
- fail explicitly.

Do not infer Camp progress from:
- started day;
- current day;
- route;
- Field Time;
- housing;
- lodging;
- Activity progress;
- checkpoint name.

## Same-day invariant

For an Activity with no Camp policy:
- Camp state must remain neutral;
- same-day Activity may not survive a calendar advance.

## Camp invariant

For a Camp-enabled Activity:
- `nightsUsed <= maxNights`;
- current day - started day == persisted nights used after committed boundaries;
- boundary phase/commit flags must be internally consistent;
- calendar and Field Time refresh commit bits cannot replay.

## Definition compatibility

Keep existing `lumber.forest`, `hunter.expedition`, `assassin.infiltration` at version 1 unless there is a separately authorized migration.

Do not force a definition-version mismatch for old in-progress saves.

## Schema6 isolation

Activity migration must not rewrite:
- Secret Debt state;
- Palace state;
- Strong Meta snapshot/runtime;
- D40/D41/D42 state;
- ending transaction ledger;
- NightFlow;
- current localization/presentation state.

---

# 14. Exact four-region gameplay checks

## Forest Frontier

Must preserve:
- entry 2;
- Field Time 6;
- Logging/Hunter/Old Boundary route identity;
- Tracking Triangulation;
- Pathfinder/Preservation/Network markers;
- research-grade result;
- v19 capability read-manifest repairs;
- existing city/career feedback.

## Trade Corridor

Must preserve:
- entry 2;
- Field Time 6;
- Tracking family;
- Market/Caravan/Customs route identity;
- sample extraction;
- Merchant/Guard feedback;
- Supplier contact;
- Pathfinder/Preservation/Network markers.

## Anomalous Reach

Must preserve:
- Year >=2 gate;
- entry 2;
- Field Time 6;
- Pattern/Ritual family;
- preserved sample;
- Keeper network;
- research-grade result;
- no Activity-to-Palace bypass.

## Restricted Sites

Must preserve:
- Year >=3 + real preparation gate;
- entry 2;
- Field Time 6;
- deterministic suspicion;
- suspicion 0..100 clamp;
- Infiltration success/failure/abort;
- evidence extraction;
- Handler network;
- research-grade result;
- legacy `assassin.infiltration` remains separate.

---

# 15. Exact D38 eligibility checks

Common for all three:

- >=3/4 region anchors;
- >=2 distinct mini-game families;
- >=1 meaningful extraction;
- >=1 network-capable contact marker;
- no ordinary Hard Work;
- no Palace;
- explicit commit only.

Marked anchors are paired:
- regional anchor + same-region marker.

A free-floating marker without that region's anchor cannot count.

## Pathfinder

Requires:
- >=2 Pathfinder-marked anchors;
- Tracking Triangulation success.

## Preservation

Requires:
- >=2 Preservation-marked anchors;
- Pattern/Ritual success;
- research-grade result.

## Network

Requires:
- >=2 Network-marked anchors;
- Infiltration/Suspicion success;
- real network-capable Activity contact.

All three may be permanently completed across lives.

One life still commits only one normal ending.

---

# 16. Palace firewall

Activity follows Palace in the Leader queue.

The assembled Activity tranche must not alter Palace semantics.

Activity:
- does not grant `palace.d23-qualified`;
- does not grant `palace.access-granted`;
- does not count as ordinary Hard Work;
- does not count as active 10/10;
- does not count as a Palace duty;
- does not lower Prince 12x91;
- does not write `palace.prince-defeated`;
- does not auto-commit Return Home.

D38 ending definitions require no Palace state.

D38 rewards may not grant Palace access/duty.

If Palace content later consumes an Activity fact for optional text/variant:
- it must remain optional context only unless separately authorized;
- it may not become a hidden Activity gate for Palace.

---

# 17. Presentation / localization dependencies

## Regional content

v12-v15 do not own a wholesale global presentation-registry replacement.

Regional authored content lives primarily in:
- Activity definitions;
- regional packs;
- Activity UI.

Do not overwrite post-D42/post-Palace presentation.

## D38 v17 presentation

Merge exactly these three ending slots:

- `ending/activity/pathfinder`
  -> `assets/presentation/forest-route-default-v1.svg`;

- `ending/activity/preservation`
  -> `assets/stage-town.svg`;

- `ending/activity/network`
  -> `assets/stage-town.svg`.

Both referenced current fallback assets exist on research-time main.

Accessibility requirements:
- localized alt key;
- RU alt;
- EN alt;
- RU caption;
- EN caption;
- copy must explain neutral/fallback reuse where relevant.

## Final ending copy

Final titles:

Pathfinder:
- RU: `За пределами карты`
- EN: `Beyond the Map`

Preservation:
- RU: `Сохранённое невозможное`
- EN: `The Impossible Preserved`

Network:
- RU: `Нити через границы`
- EN: `Threads Across the Boundaries`

Stable reward labels/descriptions remain those from v17.

## Ended-state epilogue

v17 modifies the UI only so an ended run resolves:

`ending.<stable-ending-id>.epilogue`

through localization.

Merge this small consumer into the actual post-Palace app.

Do not replace the app.

## Missing-art manifest

Carry:

`content/activity-ending-missing-assets-v17.json`

Dedicated ending art is optional for assembly because v17 has safe project-owned fallbacks.

---

# 18. Known conflict map against earlier Leader tranches

By Activity assembly time, these files are expected to have significant newer ownership.

| File | Activity owner | Earlier tranche collision | Disposition |
| --- | --- | --- | --- |
| `src/core/engine.ts` | Forest/Restricted/Camp | Secret Debt+D51, Palace, Strong Meta | manual semantic compose |
| `src/core/schema.ts` | Forest/Restricted/Camp | Secret Debt, Palace, Strong Meta/schema6 | manual schema extension |
| `src/core/content.ts` | Forest/Restricted/Camp | Secret Debt/current validators | manual validator compose |
| `content/definitions.json` | Regions + D38 | D42, Secret Debt, Palace, D40/D41 | selective entries only |
| `src/ui/app.ts` | Regions + D38 UI | D42, Secret Debt, Palace, Strong Meta | manual UI compose |
| `content/localization.json` | D38 | D42, Secret Debt, Palace | key merge only |
| `content/presentation.json` | D38 | D42, Palace/global presentation | three-slot merge only |
| regional pack files | Activity | normally unique | direct-add candidate |
| D38 fixture/manifest | Activity | unique | direct-add candidate |

No historical Activity shared file should be used as a complete replacement for post-Palace current main.

---

# 19. Exact focused executable gate for Chat 2

On the assembled post-Palace Activity branch run first:

```text
npm ci
npm run typecheck
npm run validate
npm run build
```

Then run:

```text
node --experimental-strip-types --test
tests/activity.test.ts
tests/item-capability-activity-closure.test.ts
tests/forest-frontier-production-hardening-v12.test.ts
tests/trade-corridor-production-v13.test.ts
tests/anomalous-reach-production-v14.test.ts
tests/restricted-sites-production-v15.test.ts
tests/activity-camp-persistence-v17.test.ts
tests/migration.test.ts
tests/qa-activity-option-reload.test.ts
tests/qa-exactly-once-reload.test.ts
tests/night-flow.test.ts
tests/activity-ending-family-v16.test.ts
tests/activity-ending-content-presentation-v17.test.ts
tests/secret-debt-full-route-v12.test.ts
tests/secret-debt-activity-energy-compat-v20.test.ts
tests/chat3-secret-debt-separation-v2.test.ts
tests/palace-d23-consumer-integration-v8.test.ts
tests/palace-rich6-runtime-v15.test.ts
tests/strong-meta-registry-v7.test.ts
tests/strong-meta-engine-integration-v7.test.ts
tests/ending-meta.test.ts
tests/presentation-ending-parity-v9.test.ts
tests/presentation-source-integrity-v9.test.ts
tests/presentation-locale-accessibility-parity-v7.test.ts
tests/shared-night-ui-localization-production-v1.test.ts
tests/qa-one-save-state-drift-sentinel-v2.test.ts
```

If the earlier assembly tranches rename a test file, run its authoritative current-main replacement in addition; do not drop the domain.

## Camp green reference

The accepted Camp source already proved the cumulative pre-D38 baseline:
- typecheck PASS;
- validate PASS;
- build PASS;
- 107/107 focused PASS.

The Activity assembly must not regress below that baseline.

---

# 20. Additional mandatory D38 Specialist runtime tests

The source v16 test proves conditions and binding fixture, not current-main active Specialist runtime.

Final assembly must add executable current-runtime tests for all three D38 rewards.

## Surveyor's Atlas

Prove:
- unowned cannot be selected;
- owned consumes one Specialist slot;
- normal max-two Specialist capacity;
- first legal 1-FT survey/discovery in region costs 0;
- second same-region survey costs normally;
- max four regional savings/run;
- no region unlock;
- no capability/season bypass;
- no entry-Energy reduction;
- no baseline Field Time increase;
- save/reload preserves used-region state;
- Camp refresh does not reset usage.

## Field Archive

Prove:
- unowned cannot be selected;
- owned consumes one Specialist slot;
- only tagged legally obtained result eligible;
- max one secured result/region;
- max four/run;
- no result creation/duplication;
- secured result survives later escape/failure as authorized;
- non-secured result follows normal failure behavior;
- save/reload/Camp boundary cannot duplicate or lose secure state;
- no cross-life generic inventory;
- no system-critical bypass without explicit opt-in.

## Contact Network

Prove:
- unowned cannot be selected;
- owned consumes one Specialist slot;
- region must already be normally unlocked;
- exactly one authored introduction/region/run;
- max four/run;
- no ordinary career/relationship/item/Palace/Secret Debt/ending bypass;
- save/reload/Camp boundary does not reset use.

## Reward lifecycle

For each D38 ending:
- eligibility grants nothing permanent;
- commit grants nothing permanent yet;
- `completeEnding` grants reward exactly once;
- repeat completion does not duplicate;
- reward does not activate in earning life;
- future New Start+ can select it;
- three owned Activity Specialists still allow only two active total.

---

# 21. Save/reload matrix

Minimum final integration matrix:

1. old schema6 save, no active Activity;
2. old schema6 save with active legacy `lumber.forest`;
3. old active Activity missing optionModelVersion;
4. old active Activity missing Field Time;
5. old mini-game state missing suspicion;
6. active same-day Activity receives neutral Camp v1 migration;
7. partial Camp state rejected;
8. Camp chosen before calendar advance reload;
9. calendar advanced before Field Time refresh reload;
10. Camp field-day ready reload;
11. first Camp night persists;
12. second Camp night persists;
13. third Camp rejects;
14. bound Secret Debt forced Night preempts Camp;
15. reload around forced-night handoff cannot replay;
16. Camp calendar crosses Secret Debt trap day exactly;
17. no retroactive Debt penalty for preceding unbound Night;
18. D51 queue remains NightFlow-owned;
19. D38 ending eligible but uncommitted reload;
20. D38 ending committed before completeEnding reload;
21. completed D38 reward transaction reload;
22. selected Activity Specialist runtime state reload;
23. selected Specialist state across Camp boundary.

Exactly-once invariants:
- entry Energy;
- Field Time cost;
- option resolution;
- Activity result publication;
- Camp calendar advance;
- Camp Field Time refresh;
- Secret Debt forced penalty;
- D38 ending permanent reward;
- Specialist per-region use.

---

# 22. Anti-regression firewalls

Assembly must fail review if it introduces any of the following:

- Activity entry Energy !=2;
- reload repays entry Energy;
- global Activity XP;
- generic combat subsystem;
- Field Time baseline !=6;
- arbitrary same-day region gains Camp;
- Camp restores global Energy;
- Camp charges city lodging by itself;
- Camp suppresses forced Secret Debt Night;
- Camp advances calendar twice;
- Camp refreshes Field Time twice;
- D51 implemented inside Activity;
- Activity grants Palace access;
- Activity counts as ordinary Hard Work;
- D38 requires Palace;
- D38 requires ordinary Hard Work;
- marker without same-region anchor counts toward marked-anchor requirement;
- D38 reward gets free Specialist slot;
- generic unlock remains the only final representation of D38 Specialist ownership;
- D38 reward bypasses region/capability/relationship/Secret Debt/Palace gates;
- ended-screen localization replaces unrelated ending behavior;
- D38 presentation overwrites global registry wholesale.

---

# 23. Assembly readiness summary

The Activity cumulative tranche is suitable for future selective Chat 2 assembly.

The cleanest conceptual layering is:

```text
actual post-Palace current main
+ v15 four-region D36 runtime/content
+ v17 Camp semantics
+ v19 Camp executable baseline repairs
+ v16 D38 ending conditions
+ canonical current-main D38 Specialist binding
+ v17 D38 final copy/presentation
```

The historical branches must not be cherry-picked wholesale because:
- region/Camp runtime is schema5-era;
- current production is schema6;
- Secret Debt and D51 own overlapping Night/start-day/Energy runtime;
- Palace owns overlapping schema/engine/UI/definitions;
- D42/Palace own overlapping presentation/localization;
- current Strong Meta does not yet contain the three Activity Specialist IDs.

The accepted Camp source is already executable-green at 107/107 and should be treated as the runtime baseline evidence, while D38 remains an additive ending layer over the same v15 region facts.

The three D38 Specialist mechanics have exact Product authority and a machine-readable binding contract, but require canonical current-main Strong Meta implementation/binding during assembly; no duplicate registry or generic-unlock-only final state is acceptable.

## Disposition

**READY_FOR_CHAT2_PREFLIGHT**
