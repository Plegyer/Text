# Chat 3 — Activity Final Assembly Packet v28

Status: **RESEARCH COMPLETE — READY FOR CHAT2 PREFLIGHT**  
Owner: Chat 3  
Branch: `chat3/activity-final-assembly-packet-v28`

## Purpose

This is the single final assembly packet for the complete Activity tranche. Chat 2 should not reconstruct v24-v27 separately and should not replay old producer work.

This packet is research/integration guidance only.

- Do not modify production runtime from this branch.
- Do not run full CI from Chat 3.
- Chat 2 owns current-main semantic assembly and the later full-CI lane.
- GitHub exact SHAs remain the source of truth.

## Accepted source anchors

Use these exact producer/research sources:

- four-region D36 Activity baseline through Restricted Sites:
  `chat3/restricted-sites-production-v15@ab378d68765f7c9bbff43abf3b4b41e24df82e01`
- executable-green Camp repair:
  `chat4/activity-camp-baseline-repair-v19@efde0a38bf71a8946194402a9fc47abb168f2aff`
- D38 ending mechanics:
  `chat3/activity-ending-family-producer-v16-r1@3cf69d7cb3df1a58d68908159d0acc14736435c4`
- D38 final content/presentation:
  `chat3/activity-ending-content-presentation-v17@df9ef5c3d04cfd8eb582c24838d971854e984218`
- cumulative assembly preflight:
  `chat3/activity-cumulative-assembly-preflight-v24@e21a6f923c6dae27efbbd0aa81e3dead59d00b38`
- D38 Strong Meta implementation preflight:
  `chat3/activity-d38-reward-implementation-preflight-v25@1024d8a657f0514f894042936e615364940f5e26`
- D38 reward producer:
  `chat3/activity-d38-reward-producer-v26@7770b6bf7f930e8af17331e8b22613523bb2e768`
- D38 authored tag mapping:
  `chat3/activity-d38-authored-tag-mapping-v27@3ab2800a7d586b5e37600c3ff11d1129ff823df0`

Current main observed during v28 research:

`main@1669531e76c7af9423728469a038a267f82b1656`

At that SHA canonical Strong Meta is still:

- registry version `strong-meta-v3`;
- contract version `1`;
- Keystone capacity `1`;
- Specialist capacity `2`;
- current run loadout frozen in `run.strongMetaSnapshot`;
- run-local mechanics in `run.strongMetaRuntime`;
- permanent ownership in `meta.strongMeta.ownership.ownedRewardIds`.

The final Activity assembly base must be the **actual post-Palace current main at assembly time**, not the historical v15/v17 producer base and not this research-time SHA if main has moved.

---

# 1. Exact integration order

## Phase 0 — freeze the real base before touching Activity

1. Requery `main` and record the exact assembly-base SHA.
2. Confirm the already-queued predecessor domains are present and green on that base:
   - D42 Night;
   - Secret Debt v12;
   - D51 bound+Street Activity-Energy compatibility;
   - cumulative Palace mechanics/content.
3. Re-read the current versions of:
   - `src/core/engine.ts`;
   - `src/core/schema.ts`;
   - `src/core/content.ts`;
   - `src/core/strongMeta.ts`;
   - `content/definitions.json`;
   - `src/ui/app.ts`;
   - `content/localization.json`;
   - `content/presentation.json`.
4. Keep current save schema/migration ownership. Historical Activity sources are schema5-era; current production is schema6.

Do not begin semantic composition if the predecessor domains are not actually present on the chosen base.

## Phase 1 — compose D36 shared Activity runtime

Selectively compose from the cumulative v15 lineage:

1. Forest v12 finite Field Time / option model / mini-game foundations.
2. Restricted v15 narrow Suspicion extension.
3. Preserve exact D36 invariants:
   - entry cost exactly 2 daily Energy, once;
   - reload never repays entry cost;
   - Field Time baseline exactly 6 for the four production regions;
   - no universal Activity XP;
   - Activity Field Time is not global Energy;
   - existing legacy `hunter.expedition` and `assassin.infiltration` remain separate;
   - existing version-1 Activity identities are not version-bumped just to force migration.

The four production regions are:

- `lumber.forest` — Forest Frontier;
- `trade.corridor` — Trade Corridor;
- `anomalous.reach` — Anomalous Reach;
- `restricted.sites` — Restricted Sites Network.

## Phase 2 — add region content

Merge the v15 definitions and packs without replacing current global catalogs.

Preferred Forest pack source is the repaired v19 copy:

- `content/packs/forest-frontier-production.json@efde0a38...`

Use v15 sources for:

- `content/packs/trade-corridor-production.json`;
- `content/packs/anomalous-reach-production.json`;
- `content/packs/restricted-sites-production.json`.

Compose current Activity UI/Explore exposure into current `app.ts`.

Do not overwrite D42, Secret Debt, Palace, current Strong Meta, or unrelated ending/UI content.

## Phase 3 — compose Camp

Carry the frozen Camp v17 semantics, using v19 as the executable-green source.

Required Camp contract:

- explicit multi-day Activity only;
- maximum two Camp nights per Activity entry;
- one calendar advance per completed Camp night;
- refresh Activity Field Time only;
- never refresh daily Energy;
- never charge city lodging by itself;
- never run voluntary city Night;
- forced Secret Debt Night has priority.

The four v15 regions remain `same_day`. Do **not** add Camp policy to them merely because Camp runtime exists.

## Phase 4 — add the v26 canonical D38 Strong Meta layer

Selectively carry the D38 additions from v26:

- three canonical Specialist IDs/effects into the **current** `strongMeta.ts`;
- `src/core/activityD38.ts`;
- `content/activity-d38-reward-v26.fixture.json`;
- focused v26 QA and registry assertions.

Expected accepted v26 result when starting from the current v3 registry:

- registry `strong-meta-v3 -> strong-meta-v4`;
- total rewards 20 -> 23;
- Specialists 17 -> 20;
- Keystones remain 3;
- Specialist capacity remains exactly 2;
- Strong Meta contract version remains 1.

If the actual assembly base has already advanced the registry version or already contains any D38 IDs, do not force `v4` or duplicate entries. Stop and reconcile against the current registry while preserving the v26 mechanics exactly.

Add run-local:

`run.strongMetaRuntime.activityD38`

with:

- `surveyorsAtlasUsedRegionIds`;
- `fieldArchiveSecured`;
- `contactNetworkUsedRegionIds`.

All default empty for old schema6 saves. No D38 ownership or use is inferred.

## Phase 5 — add D38 endings and canonical reward bindings

Add the three v16 ending definitions, preserving their eligibility exactly, but do **not** keep the historical generic-unlock binding as final production behavior.

Stable ending IDs:

- `ending.activity.pathfinder`;
- `ending.activity.preservation`;
- `ending.activity.network`.

Common eligibility for all three:

- >=3/4 regional anchors;
- >=2 distinct specialized mini-game families;
- >=1 meaningful extracted Activity result;
- >=1 resolved network-capable Activity contact marker;
- no ordinary Hard Work requirement;
- no Palace requirement;
- eligibility is non-terminal;
- explicit D16 commit is still required.

Ending-specific requirements:

- Pathfinder:
  - >=2 Pathfinder-marked anchors;
  - Tracking Triangulation success.
- Preservation:
  - >=2 Preservation-marked anchors;
  - Pattern/Ritual Circuit success;
  - >=1 research-grade result.
- Network:
  - >=2 Network-marked anchors;
  - Infiltration/Suspicion success;
  - real network-capable Activity contact.

Marked-anchor counting must always pair the marker with the same region's secured anchor.

Apply these exact canonical reward bindings:

```text
ending.activity.pathfinder
-> { kind: strongMeta,
     rewardId: specialist.activity.surveyors-atlas,
     reward: specialist.activity.surveyors-atlas }

ending.activity.preservation
-> { kind: strongMeta,
     rewardId: specialist.activity.field-archive,
     reward: specialist.activity.field-archive }

ending.activity.network
-> { kind: strongMeta,
     rewardId: specialist.activity.contact-network,
     reward: specialist.activity.contact-network }
```

Required lifecycle remains:

`eligible -> explicit commit -> final scene if any -> completeEnding -> exactly-once permanent ownership`.

The newly earned reward does not mutate the current run snapshot and cannot activate in the earning life. It becomes selectable only on a later New Start+.

## Phase 6 — apply v27 authored tags and wire v26 helpers

Apply only the exact tags in section 3 below.

Then wire:

- Atlas effective Field Time cost;
- carried-result registration / failure durability;
- Archive secure action;
- Contact Network lateral exposure.

Never infer eligibility from labels, ID substrings, category names, markers, or generic inventory.

## Phase 7 — overlay v17 final content/presentation

After mechanics and bindings are correct:

1. overlay only the v17 D38 `title`, `description`, and `epilogue` fields;
2. key-merge D38 RU/EN localization;
3. merge exactly three presentation slots:
   - `ending/activity/pathfinder`;
   - `ending/activity/preservation`;
   - `ending/activity/network`;
4. merge the small ended-screen localized epilogue consumer into the current `app.ts`;
5. add `content/activity-ending-missing-assets-v17.json`.

Do not replace the global presentation registry or current app.

## Phase 8 — focused executable gate

Run the exact focused gate in section 6. Only after all focused checks are green should Chat 2 use its normal full-CI lane.

---

# 2. Files that require manual semantic composition

These files must be composed against the actual assembly base. Do not use historical wholesale replacement.

## `src/core/engine.ts`

Compose only the Activity-owned seams:

- finite Field Time;
- option-model transitions;
- mini-game transitions;
- Suspicion;
- result finalization;
- Camp state machine;
- forced-Night handoff at Camp boundary;
- D38 Atlas/Archive/Contact wiring;
- carried-result durability;
- Activity-local migration helpers.

Preserve current ownership of:

- schema6 save flow;
- Strong Meta;
- D42 Night;
- Secret Debt v12;
- D51 provenance compatibility;
- Palace atomic runtime;
- current ending transactions.

## `src/core/schema.ts`

Add/selectively preserve:

- finite Activity Field Time;
- route/resolved option state;
- mini-game state;
- Suspicion default 0;
- Camp v1 state;
- authored D38 tag types;
- carried-result envelope state if implemented there.

Preserve current:

- schema6;
- Secret Debt state;
- Strong Meta state/snapshot/runtime;
- Palace state;
- NightFlow;
- ending transaction/save structures;
- migration chain.

## `src/core/content.ts`

Compose Activity validators:

- Field Time consistency;
- mini-game transitions;
- Suspicion gates;
- Camp policy/time-policy;
- typed option effects/capabilities;
- D38 tag validation;
- Atlas tagged normal cost exactly 1;
- secure-eligible result uniqueness;
- Contact Network authored metadata validity.

Preserve all newer validators.

## `src/core/strongMeta.ts`

Do not replace this file with v26 wholesale.

Carry the exact D38 additions into the current registry/runtime:

- IDs;
- D38 authority;
- three effect schemas;
- registry records;
- current-compatible registry version bump;
- `activityD38` run-local state;
- empty default;
- runtime-vs-snapshot ghost-state validation.

Never change Specialist capacity from 2.

## `content/definitions.json`

Selectively combine:

- current D42/Secret Debt/Palace/ordinary ending definitions;
- v15 region definitions;
- v16 D38 ending conditions;
- v26 canonical `strongMeta` bindings;
- v27 authored tags.

Never replace wholesale.

## `src/ui/app.ts`

Compose only required Activity surfaces into current UI:

- Explore entries;
- route/checkpoint/Field Time/minigame presentation;
- Suspicion;
- generic D38 actions where engine-owned;
- localized ended-state D38 epilogue.

Preserve current Night, Secret Debt, Palace and Strong Meta UI.

## `content/localization.json`

Key merge D38 v17 strings only. Do not replace global localization.

## `content/presentation.json`

Merge only the three D38 ending slots. Preserve current D42, Palace, and global mappings.

## Direct-add candidates after collision check

Good direct-add candidates are:

- regional pack files;
- `src/core/activityD38.ts`;
- `content/activity-ending-family-v16.fixture.json`;
- `content/activity-d38-reward-v26.fixture.json`;
- `content/activity-ending-missing-assets-v17.json`;
- focused Activity/D38 tests.

Even direct-add candidates still require path/capability/catalog validation against the actual assembled base.

---

# 3. Exact D38 authored tags

Tags are additive metadata. They do not replace normal gates or baseline availability.

## Surveyor's Atlas

Tag:

`activity-survey-discovery`

Apply to exactly these four existing options:

| Region | Stable option ID |
| --- | --- |
| Forest Frontier | `forest.challenge.logging-navigation` |
| Trade Corridor | `trade.challenge.market-read-flow` |
| Anomalous Reach | `anomaly.challenge.echo-survey` |
| Restricted Sites | `restricted.challenge.service-survey` |

All four have authored normal Field Time cost exactly 1.

Atlas behavior:

- only after all normal option eligibility passes;
- first legal tagged survey in a region/run may cost 0 FT;
- consume regional Atlas use only after successful option commit;
- later tagged survey in the same region costs normally;
- max four regions/run;
- no entry-Energy reduction;
- no Field Time baseline increase;
- no region/capability/season/ending bypass.

Keep route selectors, shortcuts, mini-game completion actions and contact-opening detours untagged.

## Field Archive Protocol

Tag:

`activity-secure-eligible`

Apply to exactly these carried-result identities:

| Region | Stable result ID |
| --- | --- |
| Forest Frontier | **none** |
| Trade Corridor | `activity.trade-corridor.result.sample-secured` |
| Anomalous Reach | `activity.anomalous-reach.result.sample-secured` |
| Restricted Sites | `activity.restricted-sites.result.evidence-secured` |

Forest intentionally has no safe existing candidate. Do not invent one.

Producer gates remain authoritative:

- Trade result comes from its existing legal sample acquisition path and still requires its current access/capability gates.
- Anomalous result may come from either existing legal Preserved Basin acquisition path and still requires the current Farm/School/preparation/capability gates.
- Restricted result may come from its existing legal evidence paths and still requires current evidence-handling plus route/season/School preparation gates.

Do not tag:

- `activity.*.mark.preservation`;
- `activity.*.result.research-grade`;
- `*.success`;
- `forest_preserved_specimen`;
- arbitrary inventory.

Field Archive secures legally carried results, not ending markers or generic inventory.

## Expedition Contact Network

Tag:

`activity-network-introduction`

Apply to exactly these existing contact options:

| Region | Stable option ID |
| --- | --- |
| Forest Frontier | **none** |
| Trade Corridor | `trade.challenge.market-supplier-contact` |
| Anomalous Reach | `anomaly.challenge.rift-keeper-contact` |
| Restricted Sites | `restricted.challenge.handler-handoff` |

Forest intentionally has no safe existing in-Activity option that owns the accepted Senior Guide relationship gate. Do not synthesize one.

Critical behavior:

- tagged options remain normally available on their authored route without the Specialist;
- normal on-route use does **not** consume Contact Network;
- Contact Network only permits lateral exposure when route alignment is the only missing Activity-routing requirement;
- lateral exposure still requires:
  - region already normally entered;
  - reward selected;
  - every original non-route condition passing;
  - unused regional charge;
- after successful lateral commit, consume that region's one use.

Do not tag the post-return Network-marker events:

- `forest-frontier.production.companion-return`;
- `trade-corridor.production.supplier-network`;
- `anomalous-reach.production.keeper-network`;
- `restricted-sites.production.handler-network`.

Contact Network never directly publishes `activity.*.mark.network`.

---

# 4. Exact D38 reward/runtime bindings

## Canonical reward definitions

### Surveyor's Atlas

ID:

`specialist.activity.surveyors-atlas`

Resolved effect:

```text
kind = activity-surveyors-atlas
maxRegionsPerRun = 4
normalSurveyFieldTimeCost = 1
specialistSurveyFieldTimeCost = 0
```

### Field Archive Protocol

ID:

`specialist.activity.field-archive`

Resolved effect:

```text
kind = activity-field-archive
maxSecuredPerRegion = 1
maxSecuredPerRun = 4
eligibilityTag = activity-secure-eligible
```

### Expedition Contact Network

ID:

`specialist.activity.contact-network`

Resolved effect:

```text
kind = activity-contact-network
maxIntroductionsPerRegion = 1
maxIntroductionsPerRun = 4
introductionTag = activity-network-introduction
```

All three:

- class `specialist`;
- lifecycle `active`;
- definitionVersion `1`;
- authority `D38`;
- slot cost one normal Specialist slot;
- no Activity-only bonus slot.

## Run-local state

Stable D36 region keys:

- `lumber.forest`;
- `trade.corridor`;
- `anomalous.reach`;
- `restricted.sites`.

Required persisted state:

```text
activityD38 = {
  surveyorsAtlasUsedRegionIds: ActivityRegionId[],
  fieldArchiveSecured: {
    regionId: ActivityRegionId,
    resultId: string
  }[],
  contactNetworkUsedRegionIds: ActivityRegionId[]
}
```

Validate:

- each region max once in Atlas state;
- each region max once in Archive state;
- each region max once in Contact state;
- duplicate Archive result IDs rejected;
- unknown region IDs rejected;
- each collection max four records;
- matching runtime state must be empty if the corresponding reward is absent from the immutable run snapshot.

## Field Archive carried-result seam

This seam is mandatory. Frozen v15 publishes extraction facts immediately; without a risk/durability layer Field Archive would be mechanically inert.

Use a small Activity-entry carried-result collection, e.g.:

```text
carriedResults: {
  resultId: string,
  tags: string[]
}[]
```

Old active saves default to `[]`; do not infer carried results from old history.

During the entry, legally acquired results may remain visible to current entry logic.

At finalization:

- success: all legally carried results keep normal durable projection;
- escape/failure:
  - unsecured `activity-secure-eligible` carried results are discarded;
  - a result recorded in `fieldArchiveSecured` survives;
  - non-tagged result semantics remain unchanged.

Archive creates no result, duplicates no result, refunds no consumable, and preserves no arbitrary inventory.

## Contact Network lateral rule

The Specialist does not create a second contact option.

It reuses the exact tagged authored option. The caller must prove:

- region was already legally entered;
- all original authored non-route conditions pass;
- the selected snapshot contains Contact Network;
- region charge unused.

If any original relationship/item/season/career/preparation condition fails, no lateral option exists.

---

# 5. Camp, save/reload, Secret Debt/D51 and Palace rules

## Camp state

Persist Camp v1 locally in the active Activity envelope:

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

Camp is legal only when the definition explicitly has:

- `campPolicy`;
- `timePolicy = can_advance_days_internally`;
- finite Field Time.

The four v15 regions have no Camp policy and remain same-day.

## Camp / Secret Debt ordering

Before Camp commits a calendar advance, query the existing consuming forced-Night resolver at the pre-lodging boundary.

If bound Secret Debt forced Night wins:

- Camp calendar advance does not occur;
- Activity continuation ends at that boundary;
- forced Night becomes pending;
- NightFlow owns lodging/modifiers/calendar/start-day processing;
- Secret Debt next-day Energy -1 remains;
- Camp does not refresh Field Time.

No Activity Specialist may suppress this.

If Camp legitimately advances the calendar into the exact Secret Debt trap day:

1. validate Camp boundary;
2. ensure no already-bound forced Night preempts;
3. advance calendar exactly once;
4. run the normal shared start-day hooks;
5. activate Secret Debt trap if due;
6. treat the new bound state as authoritative before further field continuation;
7. invent no retroactive forced-Night penalty for the preceding unbound Night.

Do not duplicate Secret Debt activation logic inside Activity.

## D51

D51 remains NightFlow/start-day provenance logic.

When the immediately preceding Night carries both:

- Street next-day Energy penalty provenance; and
- `secret-debt.bound-night` penalty provenance,

apply those locked penalties, then apply the compatibility floor of 2 to that pair only. Later unrelated modifiers may reduce Energy below 2.

Ordinary Camp:

- creates no city lodging;
- creates no Street provenance;
- adds no D51 floor;
- never changes Activity entry cost from 2.

If forced Night preempts Camp and Street lodging is then legal/selected, NightFlow applies current D51 normally.

## Save/migration

Remain schema6.

Old Activity compatibility:

- missing `optionModelVersion` -> 0;
- missing finite `fieldTimeRemaining` -> derive from normal segment count minus recorded steps;
- missing mini-game map -> empty map;
- missing mini-game Suspicion -> 0;
- never repay entry Energy.

Camp migration:

- if both `campStateVersion` and `campState` are absent, add exact neutral Camp v1 state;
- if only one is present, or version unsupported, fail explicitly;
- never infer Camp progress from day/route/Field Time/housing/lodging/progress/checkpoint;
- same-day Activity must remain neutral and cannot survive a calendar advance;
- committed Camp calendar/Field Time bits must not replay.

D38 Strong Meta runtime migration:

- missing `activityD38` -> exact empty state;
- infer no ownership/use;
- reject ghost use if matching reward is absent from run snapshot.

Save/reload must preserve exactly once:

- Activity entry Energy;
- Field Time cost;
- option resolution;
- carried-result registration;
- Camp calendar advance;
- Camp Field Time refresh;
- forced-Night handoff;
- D38 ending reward transaction;
- Atlas/Archive/Contact regional usage.

## Current Strong Meta coexistence

Preserve:

- 0..1 Keystone;
- 0..2 Specialists total;
- cap200 remains a normal Specialist;
- ordinary Hard Work packages remain outside Strong Meta slots;
- current run snapshot is immutable;
- catalog changes do not rewrite current-life resolved effects;
- ownership merge does not auto-select imported/new rewards;
- no Meta cancels Secret Debt forced Night;
- no Meta substitutes Palace D23.

## Palace coexistence

Activity/D38 must not:

- grant `palace.d23-qualified`;
- grant `palace.access-granted`;
- count as ordinary Hard Work;
- count as active 10/10 packages;
- count as Palace duty/support;
- lower or replace the Prince all-12 progression-stat `>=91` gate;
- write `palace.prince-defeated`;
- auto-commit Return Home;
- introduce hidden Palace requirements into D38 endings.

D38 rewards may coexist with Palace but never bypass Palace qualification/access/duty/ending mechanics.

---

# 6. Exact focused executable test set

Chat 3 does not run this gate. Chat 2 must run it on the assembled post-Palace branch.

First:

```text
npm ci
npm run typecheck
npm run validate
npm run build
```

Then:

```text
node --experimental-strip-types --test
tests/activity-d38-strong-meta-v26.test.ts
tests/activity-ending-family-v16.test.ts
tests/activity-ending-content-presentation-v17.test.ts
tests/strong-meta-registry-v7.test.ts
tests/strong-meta-engine-integration-v7.test.ts
tests/ending-meta.test.ts
tests/activity.test.ts
tests/item-capability-activity-closure.test.ts
tests/forest-frontier-production-hardening-v12.test.ts
tests/trade-corridor-production-v13.test.ts
tests/anomalous-reach-production-v14.test.ts
tests/restricted-sites-production-v15.test.ts
tests/activity-camp-persistence-v17.test.ts
tests/qa-activity-option-reload.test.ts
tests/qa-exactly-once-reload.test.ts
tests/migration.test.ts
tests/night-flow.test.ts
tests/secret-debt-full-route-v12.test.ts
tests/secret-debt-activity-energy-compat-v20.test.ts
tests/chat3-secret-debt-separation-v2.test.ts
tests/palace-d23-consumer-integration-v8.test.ts
tests/palace-rich6-runtime-v15.test.ts
tests/presentation-ending-parity-v9.test.ts
tests/presentation-source-integrity-v9.test.ts
tests/presentation-locale-accessibility-parity-v7.test.ts
tests/shared-night-ui-localization-production-v1.test.ts
tests/qa-one-save-state-drift-sentinel-v2.test.ts
```

If an earlier accepted assembly tranche renamed a test, run its authoritative current-main replacement **in addition to preserving the same domain coverage**. Do not silently drop a domain because a historical filename moved.

## Mandatory v27 mapping assertions

The focused D38 suite must additionally prove:

### Atlas

- exactly four `activity-survey-discovery` options;
- each authored normal FT cost is exactly 1;
- no tagged route selector/shortcut/contact/minigame-completion;
- original conditions unchanged;
- tagged options publish no ending marker/result/contact thread as a side effect of tagging.

### Archive

- exactly three secure-eligible result IDs;
- Forest has none;
- every secure-eligible result has at least one existing legal producer;
- original producer capability/season/preparation gates remain;
- no research-grade fact or inventory item is secure-eligible.

### Contact Network

- exactly three tagged contact options;
- Forest has none;
- each remains normally usable on its authored route without the Specialist;
- normal on-route use consumes no Specialist charge;
- lateral use requires selected reward, normal region entry, original conditions, and unused charge;
- post-return Network marker events remain unchanged.

## Save/reload matrix that must remain covered

At minimum preserve coverage for:

1. old schema6, no active Activity;
2. old active legacy `lumber.forest`;
3. missing optionModelVersion;
4. missing Field Time;
5. mini-game missing Suspicion;
6. neutral Camp migration for same-day Activity;
7. partial Camp state rejection;
8. Camp chosen before calendar advance reload;
9. calendar advanced before Field Time refresh reload;
10. field-day-ready reload;
11. first and second Camp night persistence;
12. third Camp night rejection;
13. bound forced Night preempts Camp;
14. reload around handoff cannot replay;
15. Camp crosses trap day exactly;
16. no retroactive debt penalty;
17. D51 remains NightFlow-owned;
18. D38 eligible but uncommitted reload;
19. D38 committed before completion reload;
20. completed D38 reward transaction reload;
21. selected D38 runtime state reload;
22. selected D38 state across Camp boundary.

The accepted Camp v19 baseline already proved typecheck/validate/build and 107/107 focused pre-D38 tests on exact SHA `efde0a38...`. The final assembly must not regress below that baseline.

---

# 7. Stop conditions

Stop the Activity assembly and return to preflight/reconciliation instead of improvising if any of these occurs:

1. The chosen base is not the real post-Palace current main or is missing D42, Secret Debt/D51, or Palace dependencies expected by the queue.
2. Current Strong Meta no longer matches the v25/v26 assumptions:
   - registry version already moved beyond v3;
   - D38 IDs already exist;
   - Specialist capacity changed;
   - snapshot/runtime ownership model changed.
   Reconcile with current source; do not force old `strong-meta-v4` wholesale.
3. A v27 stable option/result ID is missing or has materially different semantics on the assembled catalog.
4. Applying a D38 tag would require weakening an original item/relationship/season/career/School/region gate.
5. Forest Archive or Forest Contact Network would require new authored content. Those intentional holes are accepted; do not invent symmetry.
6. Manual composition would require downgrading schema6, replacing the current migration chain, or deleting Secret Debt/Palace/Strong-Meta state.
7. Camp would become available in any of the four v15 same-day regions without separate authority.
8. Camp implementation would refresh Energy, charge city lodging, suppress forced Night, duplicate calendar advance, or implement D51 internally.
9. Activity/D38 would grant or substitute Palace qualification/access/duty/Prince/Return-Home state.
10. The D38 reward is represented only as generic `unlock`, auto-activates in the earning life, or gains an Activity-only Specialist slot.
11. Field Archive remains mechanically inert because secure-eligible results still become unconditionally durable on failure, or it starts preserving arbitrary inventory.
12. Contact Network becomes a generic route/relationship/access bypass instead of lateral reuse of the exact authored option.
13. Typecheck, validate, build, any focused test, or any v27 mapping assertion fails.

On any focused failure: **do not run full CI and do not hand off as ready**.

---

# 8. What must not be copied wholesale

Do not cherry-pick or replace final production files wholesale from historical Activity branches.

Specifically do **not** wholesale-copy:

- v15 `src/core/engine.ts`;
- v15 `src/core/schema.ts`;
- v15 `src/core/content.ts`;
- v15 `src/ui/app.ts`;
- v15 `content/definitions.json`;
- Camp v17/v19 shared runtime files;
- v16 `content/definitions.json` or `content/localization.json`;
- v17 `content/definitions.json`, `content/localization.json`, `content/presentation.json`, or `src/ui/app.ts`;
- v26 `src/core/strongMeta.ts`;
- any historical schema5 migration chain;
- historical D38 generic-unlock reward binding as final production state.

Do not use a full-file replacement if current main owns newer Secret Debt, D51, Palace, D42, ending, save, presentation, or Strong Meta semantics in the same file.

Use selective semantic composition only.

Good unique-file candidates may be added directly after collision/content validation, but their referenced facts/capabilities/actions must still validate against the final current catalog.

---

# 9. Final handoff summary

The final assembly model is:

```text
actual post-Palace current main
+ selective v15 four-region D36 runtime/content
+ v17 Camp semantics
+ v19 executable-green Camp/Forest baseline repair
+ v26 canonical D38 Strong Meta layer + pure helpers
+ v16 D38 ending conditions with canonical strongMeta bindings
+ v27 exact authored tags and helper wiring
+ v17 final D38 copy/presentation
+ focused cross-domain executable gate
```

Non-negotiable product invariants:

- Activity entry Energy = 2;
- four production region Field Time = 6;
- no universal Activity XP;
- four v15 regions remain same-day;
- Camp max two nights and refreshes Field Time only;
- Secret Debt forced Night outranks Camp;
- D51 remains provenance-gated Night/start-day compatibility;
- Activity never substitutes Palace;
- D38 has no Palace or ordinary Hard Work requirement;
- one normal ending commit per life;
- D38 permanent reward only at normal `completeEnding`;
- reward activates only on a later New Start+ if selected;
- total Specialist capacity remains 2;
- v27 tags are exact and additive;
- no synthetic Forest Archive result or Forest Contact introduction.

**READY_FOR_CHAT2_PREFLIGHT**
