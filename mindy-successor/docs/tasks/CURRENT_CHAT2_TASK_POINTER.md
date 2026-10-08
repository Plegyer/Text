# CURRENT CHAT2 TASK POINTER

Status: **STAGE 3 — ACTIVITY + CAMP + D38 PRODUCTION ASSEMBLY**
Owner: Chat 2 / production assembly lane only

Branch:
`chat2/assembly-activity-camp-d38-current-main-v103`

Exact current-main base:
`38e5d949f606fdc0c3060930c90457eeabfa7d5f`

Stage 2 is closed. Do not modify or regress Palace/D39/Strong Meta UI/D48.

## This is a production task

Assemble the complete Stage 3 production delta:
- four-region D36 Activity baseline;
- Camp persistence;
- D38 ending mechanics;
- D38 Strong Meta Specialists/runtime helpers;
- D38 authored tags;
- D38 final content/localization/presentation.

Do **not** run full CI.
Do **not** merge main.
Leader 1 owns focused QA, full CI and exact-main CI after your production stop marker.

## Frozen authorities

Activity cumulative v15:
`ab378d68765f7c9bbff43abf3b4b41e24df82e01`

Camp executable-green cumulative repair:
`efde0a38bf71a8946194402a9fc47abb168f2aff`

D38 ending mechanics:
`3cf69d7cb3df1a58d68908159d0acc14736435c4`

D38 final content/presentation:
`df9ef5c3d04cfd8eb582c24838d971854e984218`

D38 reachability evidence:
`7ae7a9b273f1806ac04b566c318896783bab6595`

D38 Strong Meta reward/helper producer:
`7770b6bf7f930e8af17331e8b22613523bb2e768`

D38 authored tag mapping:
`3ab2800a7d586b5e37600c3ff11d1129ff823df0`

Accepted preassembly authority:
`chat5/activity-camp-d38-preassembly-v43@4ce94aa27d4ca4d3b7c26279e4ce90ec50dfbac6`
→ `CHAT5_ACTIVITY_CAMP_D38_PREASSEMBLY_v45.md`

Final integration guidance:
`chat3/activity-final-assembly-packet-v28@742661162991108d22138eec495657b0dcdece0f`

## Locked semantic order

1. Activity cumulative semantic delta.
2. Camp cumulative delta/accepted baseline repairs.
3. D38 ending mechanics.
4. D38 Strong Meta + Activity helper layer.
5. D38 authored tags and helper wiring.
6. D38 final content/localization/presentation.
7. Stop for Leader QA.

Do not replay historical producer snapshots wholesale.

## Current-main collision firewall

These are semantic-union files. Never wholesale replace them:
- `content/definitions.json`
- `content/localization.json`
- `content/presentation.json`
- `src/core/engine.ts`
- `src/core/schema.ts`
- `src/core/content.ts`
- `src/core/strongMeta.ts`
- `src/ui/app.ts`

Preserve current:
- schema6 and migration chain;
- D42 NightFlow;
- Secret Debt v12 / D51;
- Stage 2 Palace v15-v19;
- D39 Strong Meta rewards/runtime/live consumers;
- Strong Meta player UI;
- D48 media;
- ending transaction lifecycle.

## Activity locks

Four production regions:
- `lumber.forest`
- `trade.corridor`
- `anomalous.reach`
- `restricted.sites`

Preserve:
- Activity entry cost exactly 2 daily Energy, once;
- Field Time baseline exactly 6;
- reload never repays entry cost;
- no universal Activity XP;
- Activity Field Time is not global Energy;
- legacy `hunter.expedition` and `assassin.infiltration` remain separate;
- no gratuitous version bump solely to force migration.

Preferred Forest pack is the repaired Camp-v19 copy:
`content/packs/forest-frontier-production.json@efde0a38...`

Use v15 semantic content for:
- `content/packs/trade-corridor-production.json`
- `content/packs/anomalous-reach-production.json`
- `content/packs/restricted-sites-production.json`

Bring accepted Camp-v19 baseline repairs, including:
- synthetic Activity option `effects: []` typing repair;
- Forest read capability declarations for research-grade and school-reflection;
- cumulative focused-fixture repairs.
Do not change their production semantics.

## Camp locks

Camp state is local to active Activity:
- `campStateVersion = 1`
- max 2 field nights;
- exactly one calendar advance per completed Camp night;
- exactly one Field Time refresh per completed Camp night;
- Camp refreshes Activity Field Time only, never daily Energy;
- no city lodging charge by Camp itself;
- no voluntary city Night from Camp;
- forced Secret Debt Night has priority and can never be suppressed/delayed/bypassed;
- the four v15 production regions remain `same_day`; do not add Camp policy to them merely because Camp runtime exists.

Camp current-main integration must not downgrade schema6 or infer Camp progress from old save history.
Old saves default neutrally.

## D38 canonical endings

Exact IDs:
- `ending.activity.pathfinder`
- `ending.activity.preservation`
- `ending.activity.network`

Common eligibility:
- >=3/4 secured regional anchors;
- >=2 distinct specialized mini-game families;
- >=1 meaningful extracted Activity result;
- >=1 resolved network-capable Activity contact marker;
- no ordinary Hard Work requirement;
- no Palace requirement;
- eligibility is non-terminal;
- explicit commit still required.

Specific locks:
- Pathfinder: >=2 Pathfinder-marked anchors + Tracking Triangulation success.
- Preservation: >=2 Preservation-marked anchors + Pattern/Ritual Circuit success + >=1 research-grade result.
- Network: >=2 Network-marked anchors + Infiltration/Suspicion success + real network-capable Activity contact.
- marked anchors always pair marker with the same region's secured anchor.

Canonical reward bindings:
- Pathfinder -> `specialist.activity.surveyors-atlas`
- Preservation -> `specialist.activity.field-archive`
- Network -> `specialist.activity.contact-network`

All use `kind: strongMeta`.
No generic unlock.
Lifecycle remains eligibility -> explicit commit -> completeEnding -> exactly-once permanent ownership.
No same-life activation.

## Current Strong Meta union rule

Current main is already:
- registry `strong-meta-v4`;
- Keystone capacity 1;
- Specialist capacity 2;
- contains D39 Palace Specialists;
- does NOT contain any D38 Specialist IDs.

Therefore:
- do not overwrite current Strong Meta with historical v26;
- add the three D38 Specialists to the current registry;
- preserve contract version 1;
- preserve capacity 1/2;
- use the next monotonic registry version: **`strong-meta-v5`**;
- preserve all D39 IDs/effects/knowledge/runtime exactly.

D38 IDs:
- `specialist.activity.surveyors-atlas`
- `specialist.activity.field-archive`
- `specialist.activity.contact-network`

Authority `D38`, class `specialist`, lifecycle `active`, definitionVersion 1.

Add `run.strongMetaRuntime.activityD38` with empty old-save defaults:
- `surveyorsAtlasUsedRegionIds`
- `fieldArchiveSecured`
- `contactNetworkUsedRegionIds`

Reject ghost runtime when matching reward is absent from immutable snapshot.

## D38 authored tags

Survey tag `activity-survey-discovery` on exactly:
- `forest.challenge.logging-navigation`
- `trade.challenge.market-read-flow`
- `anomaly.challenge.echo-survey`
- `restricted.challenge.service-survey`

Secure tag `activity-secure-eligible` on exactly:
- Trade result `activity.trade-corridor.result.sample-secured`
- Anomalous result `activity.anomalous-reach.result.sample-secured`
- Restricted result `activity.restricted-sites.result.evidence-secured`
- Forest intentionally none.

Contact tag `activity-network-introduction` on exactly:
- `trade.challenge.market-supplier-contact`
- `anomaly.challenge.rift-keeper-contact`
- `restricted.challenge.handler-handoff`
- Forest intentionally none.

Do not infer tags from labels/IDs/categories.

## D38 reward mechanics

Surveyor's Atlas:
- normal tagged survey FT cost 1;
- first legal tagged survey per region/run may cost 0;
- consume regional use only after successful commit;
- max 4 regions/run;
- no entry Energy reduction or Field Time baseline increase.

Field Archive:
- one secure-eligible carried result per region;
- max 4/run;
- creates/duplicates nothing;
- on escape/failure unsecured secure-eligible result is lost; secured survives;
- non-tagged result semantics unchanged;
- no arbitrary inventory protection.

Contact Network:
- no synthetic contact option;
- reuses authored tagged option;
- lateral exposure only when route alignment is the only missing Activity-routing requirement;
- region must already be normally entered;
- all original non-route conditions must pass;
- max one use per region / four per run;
- ordinary on-route use remains available without reward and does not consume the reward.

## D51 / Secret Debt adjacency

Preserve exact D51 floor-to-2 behavior only for:
- Street -1 Energy
- plus bound Secret Debt Night -1 Energy

Camp calendar advance must still trigger current Secret Debt start-day activation correctly.
Camp can never bypass forced bound Night.

## Direct-add candidates

After collision/path checks, direct-add is appropriate for:
- regional production pack files;
- `src/core/activityD38.ts`;
- D38 fixture files;
- D38 missing-assets manifest;
- Activity/Camp/D38 focused tests.

Shared files above still require semantic union.

## D38 presentation

Key/record merge only:
- final D38 ending title/description/epilogue;
- RU/EN D38 localization;
- exactly three ending presentation slots:
  - `ending/activity/pathfinder`
  - `ending/activity/preservation`
  - `ending/activity/network`
- small ended-screen localized epilogue consumer.

Do not replace global localization, presentation registry or app.

## Stop conditions

Stop and report instead of inventing a repair if:
- current schema/migration would be downgraded;
- Camp exactly-once calendar/Field Time can duplicate;
- third Camp night becomes reachable;
- forced Secret Debt Night loses priority;
- D51 pair-only floor semantics are lost;
- D38 creates/freezes a third/free Specialist slot;
- D38 eligibility auto-commits;
- canonical IDs collide with a newer current authority;
- universal Activity XP appears;
- a shared-file merge presents a third semantic value not covered by the frozen authorities/current-main locks.

## Verification boundary

This worker task is production assembly only.

You may run local typecheck/validate/build if convenient to catch obvious assembly mistakes, but do not spend the task on full CI or repeated QA repair loops. Leader 1 will run the executable focused/full gates after handoff.

## Stop marker

Stop at:
`STAGE3_ACTIVITY_CAMP_D38_PRODUCTION_READY_FOR_LEADER`

Report:
- exact head;
- changed production files;
- direct-add files;
- any test-only compatibility files;
- Strong Meta registry version/count after union;
- confirmation capacity remains 1 Keystone / 2 Specialists;
- any unresolved third-value conflict.
