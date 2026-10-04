# Chat 3 — Palace Assembly Preflight v23

Status: **RESEARCH COMPLETE — READY FOR CHAT2 PREFLIGHT**  
Owner: Chat 3  
Branch: `chat3/palace-assembly-preflight-v23`

## Frozen Palace sources

Mechanics / cumulative player-facing / Prince narrative source:

`chat6/palace-prince-narrative-producer-v18@67f948d185883d8e706dad522e5010bff8e2bd48`

Final prose / media source:

`chat6/palace-final-prose-media-v19@6cf19169b92fa709e8ae51cf73ff72ef2c0fac19`

## Product authorities

- D39 — Palace non-True ending rewards;
- D43 — Palace daily cadence and duty economy;
- D45 — Palace / Prince narrative authority;
- D48 — minimum Palace 1.0 media package;
- D49 — macro-mystery / lore authority.

D48 packet:

`chat6/palace-media-production-plan-v20@10b748fd400c25e6384fcb451164fd3203ea8768`

D49 packet:

`chat6/macro-mystery-lore-authority-v21@d4313ea670340a3539b89e4c9ba34261aff1deb7`

## Production position at research time

Current `main` observed during this preflight:

`main@9cb45ccd731326bcc005f935a0e37112463f8f6f`

This is **not** the final Palace assembly base.

At this point the Leader queue still has:

1. D42 Night current-main assembly;
2. Secret Debt v12 + D51;
3. Palace cumulative.

Therefore Chat 2 must assemble Palace onto the **actual current main after D42 and Secret Debt/D51 are merged**.

Do not freeze, copy, or encode a guessed future post-Secret-Debt SHA.

---

# 1. Palace source lineage

The cumulative Palace runtime source is not one isolated commit.

The accepted chain is:

- D23 consumer already exists on current main;
- v15 Palace rich-six runtime:
  `chat6/palace-rich6-runtime-producer-v15@40623a9de8b5a11ac9493b865c9f3fadd0435e1c`;
- v16 player-facing UI:
  `chat6/palace-player-facing-ui-v16@65b9e668ff7112c86681905d62f723b6cf95cec0`;
- v18 Prince / D45 narrative mechanics:
  `67f948d185883d8e706dad522e5010bff8e2bd48`;
- v19 final prose/media:
  `6cf19169b92fa709e8ae51cf73ff72ef2c0fac19`.

v18 is based on v16 and therefore contains the v15/v16 Palace implementation history.

v19 is content-only on top of v18 and mechanically freezes v18.

---

# 2. Exact cumulative production files owned through v18

Comparing the v15 dispatch base through frozen v18, Palace cumulative production owns exactly these shared/new production files:

1. `content/definitions.json`
2. `content/localization.json`
3. `content/packs/palace-invitation.json`
4. `content/packs/palace-progression.json`
5. `content/packs/palace-outcome-finalize.json`
6. `content/packs/palace-prince-confrontation.json`
7. `src/core/engine.ts`
8. `src/core/palace.ts`
9. `src/core/schema.ts`
10. `src/ui/app.ts`
11. `src/ui/palaceUi.ts`

## v15 ownership

Runtime:
- `src/core/schema.ts`
- `src/core/palace.ts`
- `src/core/engine.ts`

Content:
- `content/definitions.json`
- `content/localization.json`
- `content/packs/palace-progression.json`
- `content/packs/palace-outcome-finalize.json`

## v16 ownership

Player-facing:
- `src/ui/app.ts`
- `src/ui/palaceUi.ts`
- `content/localization.json`

## v18 direct ownership

Production content:
- `content/definitions.json`
- `content/packs/palace-invitation.json`
- `content/packs/palace-progression.json`
- `content/packs/palace-outcome-finalize.json`
- `content/packs/palace-prince-confrontation.json`
- `content/localization.json`

Palace-owned code/UI:
- `src/core/palace.ts`
- `src/ui/palaceUi.ts`
- `src/ui/app.ts`

v18 explicitly did **not** change:
- `src/core/engine.ts` relative to v16;
- `src/core/schema.ts` relative to v16;
- Secret Debt owner files;
- Strong Meta owner files;
- Night owner files.

The engine/schema changes are inherited from v15.

---

# 3. Exact v19 production delta

v19 is mechanically content-only.

Production content changed:

1. `content/definitions.json`
2. `content/packs/palace-invitation.json`
3. `content/packs/palace-progression.json`
4. `content/packs/palace-outcome-finalize.json`
5. `content/packs/palace-prince-confrontation.json`
6. `content/localization.json`
7. `content/presentation.json`

Planning artifact:

- `mindy-successor/research/palace_missing_media_v1.csv`

Focused QA:

- `tests/palace-final-prose-media-v19.test.ts`

v19 changed no:
- engine;
- schema;
- Palace runtime TypeScript;
- Secret Debt runtime;
- Strong Meta runtime;
- Night runtime.

v19 mechanically normalized these five authored-content files against v18 and reported `mechanicsEqual = true`:

- `content/definitions.json`
- `content/packs/palace-invitation.json`
- `content/packs/palace-progression.json`
- `content/packs/palace-outcome-finalize.json`
- `content/packs/palace-prince-confrontation.json`

Therefore final player-facing Palace prose should come from v19, while mechanics remain v18/v15 authority.

---

# 4. Source-specific Palace focused tests

Source tests to carry/adapt:

## v15

`tests/palace-rich6-runtime-v15.test.ts`

Covers:
- run-local Palace state;
- 15 duties;
- milestones 2/5/8/12/15;
- daily structural lock;
- bounded wage;
- support/prep;
- route coexistence;
- save/reload;
- D23;
- Secret Debt/Palace interaction assumptions.

## v16

`tests/palace-player-facing-ui-v16.test.ts`

`tests/palace-player-facing-ui-renderer-v16.test.ts`

Covers:
- Palace UI absent before access;
- UI present only after run-local access;
- progress/economy display;
- support/route state;
- ending cards;
- no permanent Palace unlock;
- no reward-selection duplication.

## v18

`tests/palace-prince-narrative-producer-v18.test.ts`

`tests/palace-prince-narrative-renderer-v18.test.ts`

Covers:
- D45 reveal ladder;
- exact Prince IDs;
- exact 12×91 gate;
- Lust exclusion;
- no hidden School/Activity/item/relationship prerequisite;
- zero confrontation Energy/money cost;
- deterministic four-phase proof;
- retry/back-out;
- save/reload mid confrontation;
- only successful final proof writes `palace.prince-defeated`;
- no automatic Return Home;
- explicit commit presentation.

## v19

`tests/palace-final-prose-media-v19.test.ts`

Covers:
- frozen confrontation mechanics;
- D45/D49 prose;
- presentation slots;
- media source existence;
- RU/EN accessibility copy;
- ending epilogues.

---

# 5. Current-main ownership that must remain authoritative

Current main already has the D23 Palace consumer.

Current:

`src/core/palace.ts`

owns run-local D23 facts:

- `palace.d23-qualified`
- `palace.access-granted`

and qualification from:

- permanent ordinary Hard Work 10/10;
- active current-run ordinary Hard Work packages 10/10.

Current:

`content/packs/palace-invitation.json`

already owns deterministic Day-1 invitation and explicit acceptance.

Current main does **not** currently contain:
- Palace duty actions;
- Palace non-True endings;
- Return Home ending definition;
- Palace progression packs;
- Prince confrontation pack;
- Palace player-facing UI module;
- dedicated Palace media assets.

Current `src/core/strongMeta.ts` already owns:

`palace.true.cap-200`

but does not yet contain the three non-True D39 reward IDs.

---

# 6. Expected post-D42 / Secret Debt collision matrix

## D42 direct overlaps

D42 current assembly changes these files also owned by Palace:

- `content/definitions.json`
- `content/localization.json`
- `content/presentation.json`
- `src/ui/app.ts`

Therefore all four must be merged selectively after D42.

Do not replace them with Palace source versions.

## Secret Debt v12 + D51 direct overlaps

The Secret Debt/D51 tranche is expected to change these files also owned by Palace:

- `content/definitions.json`
- `content/localization.json`
- `src/core/engine.ts`
- `src/core/schema.ts`
- `src/ui/app.ts`

These are the highest-risk Palace assembly files.

Do not copy historical Palace v18 versions over post-Secret-Debt current main.

## Shared conflict summary

| File | D42 | Secret Debt/D51 | Palace | Required disposition |
| --- | --- | --- | --- | --- |
| `content/definitions.json` | yes | yes | yes | manual semantic compose |
| `content/localization.json` | yes | yes | yes | merge Palace keys/text only |
| `content/presentation.json` | yes | no direct v12/D51 owner | v19 | merge 19 Palace slots only |
| `src/ui/app.ts` | yes | yes | yes | manual UI compose |
| `src/core/engine.ts` | no | yes | inherited v15 | manual runtime compose |
| `src/core/schema.ts` | no | yes | inherited v15 | manual schema6 extension |
| `src/core/palace.ts` | no | no | yes; existing D23 file | extend current file, never replace blindly |
| `src/ui/palaceUi.ts` | no | no | new Palace file | direct-add candidate |
| Palace progression/finalize/Prince packs | no | no | new Palace files | direct-add candidates from v19 final text |
| `content/packs/palace-invitation.json` | no | no | existing D23 + v19 prose | text-only/current-mechanics compose |

---

# 7. Files that must never be wholesale copied

## A. `src/core/engine.ts`

Frozen Palace runtime is schema5-era and predates current-main:

- schema6;
- canonical Strong Meta snapshot/runtime;
- D40/D41 migrations;
- D42 integration;
- Secret Debt v12;
- D51 next-day Energy provenance;
- current ending transaction logic.

Palace engine changes must be transplanted surgically into the post-Secret-Debt engine.

Required Palace seams:

- special `career='palace'` domain reads/writes use `run.progression.palace`;
- Palace structural/support action availability;
- atomic structural-duty transaction;
- atomic support transaction;
- Palace reaction facts for career stage/counters;
- fresh-run Palace default;
- save validation via Palace invariant checker.

Do not restore an old engine wholesale.

### Structural duty transaction must remain D43 exact

Validate before mutation:

1. Palace access;
2. duty count <15;
3. no structural duty already committed today;
4. Energy >=1;
5. exact next duty ordinal;
6. exact expected stage.

Then atomically:

1. compute wage from pre-duty values;
2. spend 1 Energy;
3. pay wage;
4. increment exact duty count;
5. set `shifts` equal to duty count;
6. set daily lock;
7. append exact committed duty ID;
8. apply milestone transition if duty 2/5/8/12/15;
9. publish `palace.progression-complete` exactly once at duty 15;
10. run existing reaction/ending registration.

Failed validation mutates nothing.

### D43 wage

`35 + min(20, floor((Reason + Wits + Manners + Sociability) / 20))`

Required:
- minimum 35;
- maximum 55;
- 91 in all four wage stats -> 53;
- cap-200 still max 55;
- max 15-duty structural pay = 825.

No routine stat gains.
No routine Lust.
No routine negative stat package.

## B. `src/core/schema.ts`

Frozen Palace v18 is schema5-era.

Post-Secret-Debt production is schema6 and must remain schema6.

Do not import v18 schema wholesale.

Selectively add to current `progressionStateSchema`:

- Palace stages:
  - entered-service;
  - working-rhythm;
  - trusted-service;
  - palace-network;
  - crossroads;
  - outcome-ready;
- Palace route-prep enum:
  - service-life;
  - court-power;
  - inner-truth;
- typed Palace state:
  - stage;
  - shifts;
  - counters;
  - choices;
  - facts;
  - lastStructuralDutyDay;
  - lastSupportActionDay;
  - committedDutyIds;
  - completedSupportIds;
  - routePrepFacts.

Default must be run-local clean state:

- stage entered-service;
- shifts 0;
- `palace-duty-count = 0`;
- daily locks -1;
- empty committed/support/route arrays.

Preserve:
- current schema version 6;
- Strong Meta state/snapshot/runtime;
- Secret Debt state;
- D40/D41/D42 state;
- NightFlow;
- Activity;
- current migrations.

## C. `content/definitions.json`

This file will contain post-D42 and post-Secret-Debt current-main work.

Merge Palace-only definitions:

- career machine `palace`;
- 15 structural duty actions;
- 6 support/prep actions;
- action `palace.confront-prince`;
- quest `palace.prince-confrontation`;
- four Palace endings.

Do not replace the file.

Use v19 text fields and v18 mechanics.

## D. `content/localization.json`

Merge Palace localization by key only.

Preserve all D42, Secret Debt, D40/D41 and global localization.

Use v19 final RU/EN Palace prose/accessibility copy.

## E. `src/ui/app.ts`

This file will include both D42 Night and Secret Debt UI changes by Palace assembly time.

Compose only Palace sections/helpers/imports.

Preserve:
- D42 Night UI;
- Secret Debt hidden-work/debt UI;
- current New Start+ Strong Meta controls;
- current ending UI;
- current accessibility/localization behavior.

Never replace post-Secret-Debt `app.ts` with v16/v18.

## F. `content/presentation.json`

D42 already adds presentation mappings.

Merge exactly the v19 Palace slot overrides.

Do not replace the registry.

---

# 8. Candidate direct additions

These are the lowest-collision Palace files.

## New Palace pack files

Prefer the **v19 versions** because v19 retains v18 mechanics and contains final prose:

- `content/packs/palace-progression.json`
- `content/packs/palace-outcome-finalize.json`
- `content/packs/palace-prince-confrontation.json`

They do not currently exist on production main and are not owned by D42/Secret Debt.

## New Palace UI model

`src/ui/palaceUi.ts`

Candidate direct addition from v18.

Then compile against the post-Secret-Debt `palace.ts` and schema.

## Media planning artifact

`mindy-successor/research/palace_missing_media_v1.csv`

May be carried directly as planning evidence.

## Invitation pack

Not a direct-new file.

Production already has `content/packs/palace-invitation.json`.

Apply v19 prose only after verifying normalized mechanics still match current D23.

Do not recreate invitation mechanics.

---

# 9. D23 Palace entry firewall

D23 remains the only Palace entry gate.

Exact model:

`permanent ordinary Hard Work 10/10 + current active ordinary Hard Work packages 10/10`

then:

- deterministic new-life Day-1 invitation;
- explicit invitation acceptance;
- `palace.access-granted` run-local world fact.

Must prove:

- 9 permanent + 9 active -> no invitation;
- 10 permanent + 0 active -> no invitation;
- 10 permanent + 9 active -> no invitation;
- 10 permanent + 10 active -> invitation;
- no random check;
- no School requirement;
- no Activity requirement;
- no romance requirement;
- no item requirement;
- no Secret Debt requirement;
- no Palace Hard Work package;
- no `hardWork:palace`;
- no permanent `meta.unlocks['palace']`.

Old completed saves must not gain retroactive Palace access merely because they once satisfy some legacy flag.

---

# 10. Palace run-local / no permanent unlock checks

Palace access and progression are current-run state.

Required locations:

- access: `run.progression.worldFacts`;
- Palace progression: `run.progression.palace`.

Forbidden ownership:

- `meta.unlocks['palace']`;
- `progression.careers['palace']` duplicate state;
- ordinary Hard Work package `palace`;
- permanent Palace access reward.

Current-main `palace.ts` already strips Palace out of the permanent unlock model.

Assembly must preserve that behavior.

Strong Meta rewards may affect future lives only according to their own D24/D39 contracts.

They never themselves grant Palace access.

---

# 11. Exact Palace progression topology

Stages:

1. `entered-service`
2. `working-rhythm`
3. `trusted-service`
4. `palace-network`
5. `crossroads`
6. `outcome-ready`

Milestones:

- duty 2 -> Working Rhythm;
- duty 5 -> Trusted Service;
- duty 8 -> Palace Network;
- duty 12 -> Crossroads;
- duty 15 -> Outcome Ready + exactly-once `palace.progression-complete`.

Structural duty:
- exactly 1 Energy;
- at most one progression-counting Palace duty per day;
- extra Energy never buys a second structural duty;
- no paid duty 16+.

Support/prep:
- at most one Palace support action/day;
- 1 Energy;
- 0 money;
- no duty count;
- no routine stats;
- can happen same day as structural duty if final Energy permits.

Route prep is non-exclusive.

All three non-True readiness paths may coexist before explicit ending commit.

---

# 12. Prince confrontation exact gate

Stable quest:

`palace.prince-confrontation`

Stable action:

`palace.confront-prince`

Stable durable success fact:

`palace.prince-defeated`

Action cost:

- money 0;
- Energy 0.

Required gate:

- `palace.access-granted`;
- Palace stage `outcome-ready`;
- `palace.progression-complete`;
- all 12 progression stats >=91;
- `palace.prince-defeated` absent;
- confrontation quest at `ready`.

The 12 stats are:

- Strength;
- Endurance;
- Dexterity;
- Reason;
- Magic;
- Creativity;
- Wits;
- Charm;
- Sociability;
- Manners;
- Grooming;
- Sexuality.

Lust is excluded.

There is no additional numeric gate.

There is no:
- item prerequisite;
- School prerequisite;
- Activity prerequisite;
- relationship prerequisite;
- Night prerequisite;
- romance prerequisite;
- Strong Meta prerequisite.

Quest stages:

1. ready;
2. audit-record;
3. name-contradiction;
4. define-boundary;
5. reconstruct-return;
6. defeated.

The confrontation is deterministic and chance-free.

Failure/back-out:
- writes no `palace.prince-defeated`;
- commits no ending;
- returns to retryable state;
- charges no new Energy/money/item/Night/calendar penalty.

Only successful phase-4 proof may establish the durable defeat fact.

---

# 13. Return Home exact checks

Ending:

`ending.palace.return-home`

Eligibility must require:

- Palace access;
- Outcome Ready;
- `palace.progression-complete`;
- all 12 progression stats >=91;
- `palace.prince-defeated`.

Lust remains irrelevant.

Prince success must **not** automatically commit Return Home.

The normal D16 lifecycle remains:

eligibility
-> player explicitly commits
-> committed resolution
-> `completeEnding`
-> permanent reward transaction.

Return Home reward:

`palace.true.cap-200`

Current main already knows this reward in the canonical Strong Meta registry.

Bind it through the current Strong Meta reward mechanism.

Do not use a generic unlock.

---

# 14. D39 reward integration risk — external implementation seam

This is the largest non-Palace-source integration gap.

Frozen v18/v19 definitions currently contain:

`metaRewards: []`

for all four Palace endings.

On current main, an explicit empty `metaRewards` array means the ending grants **no permanent reward**.

That is not acceptable for production D24/D39.

## Return Home

Current main already has:

`palace.true.cap-200`

in the Strong Meta registry.

Return Home can be bound to the canonical current-main Strong Meta reward.

## Service Life

Required permanent reward:

`palace.service-life.steady-practice`

Class:
Specialist.

D39 exact effect:
- first 2 distinct ordinary careers to reach 8 completed shifts bind as continuity careers;
- in each, next 3 qualifying D31 seasonal -1 progression-stat effects are reduced to 0;
- max 3 per career / 6 per run;
- uses one normal Specialist slot;
- no effect on Secret Debt, Activity, Palace, money, Energy, items, relationships.

## Court Power

Required reward:

`palace.court-power.formal-introduction`

Class:
Specialist.

D39 exact effect:
- 3 successful authored ordinary-career professional introductions per run;
- target career already legally unlocked;
- >=1 completed shift in that career;
- only normal first professional relationship stage;
- max once per relationship ID;
- one normal Specialist slot;
- no Activity/Palace/Secret Debt relationship use.

## Inner Truth

Required permanent knowledge:

`palace.inner-truth.source-method`

Layer:
automatic knowledge/content.

Current main already has generic automatic-knowledge infrastructure:

- permanent `inheritedKnowledgeIds`;
- run snapshot `automaticKnowledgeIds`.

However the Source Method ID and authored effect/binding are not present on current main.

Source Method:
- consumes no Specialist/Keystone slot;
- may expose information-only provenance/cross-check choices in already legal scenes;
- changes no resource/stat/counter/stage/ending eligibility;
- never bypasses Palace/Prince;
- never reveals inaccessible content.

## Important ownership conclusion

The frozen Palace v18/v19 source does **not** implement these three D39 reward mechanics.

The only v13 source is a Product decision packet and explicitly says no production runtime was changed.

Therefore:

- do not pretend v18/v19 contains D39 implementation;
- do not leave Palace endings rewardless;
- do not convert the reward IDs into generic unlocks;
- do not invent a second Strong Meta registry.

Before Palace can be frozen production-complete, Chat 2/Leader must have an accepted implementation source or explicit authorized integration for:
- Steady Practice;
- Formal Introduction;
- Source Method.

This preflight remains `READY_FOR_CHAT2_PREFLIGHT`, but a final Palace assembly must not silently omit D39.

---

# 15. Secret Debt firewall

After Secret Debt v12 + D51 is assembled, Palace must compose with it exactly.

If Palace access was legitimately opened before becoming bound:

- Palace access remains;
- Palace progression remains;
- structural duty/support remain legal in daytime if Energy permits;
- the ten ordinary careers remain locked;
- Secret Debt forced Night remains absolute.

Palace must never:
- clear bound state;
- cancel forced Night;
- suppress the bound-night -1;
- change repayment;
- create Palace access from debt;
- turn debt into Palace qualification.

## Energy ordering

Post-Secret-Debt/D51 start-day Energy is finalized first.

Then Palace daytime duty/support spends from the final usable Energy.

Examples:

- bound + normal/cheap -> Palace may spend from normal post-debt Energy;
- bound + Street uses D51 compatibility;
- unrelated third Energy penalty may still reduce usable Energy to 1;
- Palace action cost remains 1.

Do not give Palace an Energy refund.

## Night priority

Secret Debt forced Night:
- intercept `before_lodging`;
- priority class `forced`;
- priority 1000;
- suppresses voluntary menu;
- consumes Night.

Any Palace Night content remains lower priority/optional.

No Palace Night surface may:
- execute instead of the forced Debt Night;
- add structural duty count;
- pay structural wage;
- refund daytime Energy.

## Debt-farm firewall

Palace structural pay is bounded:
- max 55 per duty;
- max 15 paid duties;
- max total structural wage 825.

No paid structural duty after 15.

Therefore Palace cannot become a repeatable 20000-money debt farm.

---

# 16. Strong Meta isolation

Preserve current-main capacity:

- at most 1 Keystone;
- at most 2 Specialists.

No free Palace slot.

D39:
- Steady Practice consumes 1 Specialist;
- Formal Introduction consumes 1 Specialist;
- Source Method consumes 0 slots;
- cap-200 consumes one normal Specialist slot.

Palace duties themselves:
- grant no Strong Meta;
- activate no reward;
- change no preference/loadout.

Permanent reward ownership occurs only at normal completed-ending transaction.

A reward earned in the current life must not activate retroactively in that same run.

Preserve current Strong Meta snapshot immutability.

---

# 17. Ordinary-career isolation

Palace is not an eleventh ordinary Hard Work profession.

Must remain separate from:

- ordinary 10-career Hard Work counts;
- ordinary career wage caps;
- D26 ordinary same-career shift cadence;
- ordinary seasonal progression packages;
- ordinary career unlock rules.

No:
- `hardWork:palace`;
- Palace career in ordinary Hard Work arrays;
- Palace duty counted as ordinary shift;
- Palace duty satisfying D23 itself.

Service Life Steady Practice may only affect D31 ordinary-career seasonal negatives after future-life activation.

It never affects Palace.

Court Power Formal Introduction may only affect explicitly opted-in ordinary-career professional relationships.

It never affects Palace relationships or Palace entry.

---

# 18. Save / migration risks

Post-Secret-Debt production will be schema6.

Do not reintroduce the schema5 migration body from Palace v18.

## Existing schema6 save with no Palace progression field

After assembly, it must receive the clean default Palace progression state without modifying:

- Secret Debt state;
- Strong Meta state;
- Strong Meta snapshot/runtime;
- D40/D41/D42 progression;
- NightFlow;
- Activity;
- existing world facts;
- ending history.

Do not infer Palace access.

## Legacy pre-schema6 save

It must pass through the current production migration chain to schema6 and then receive a clean Palace progression default.

Preserve:
- current D41 retirement/migration behavior;
- Secret Debt default/migration behavior;
- Strong Meta migration.

Do not replace the current migration chain with the v18 schema5-era chain.

## Legacy Palace unlock

No migration may turn old `meta.unlocks['palace']` into Palace access.

Current production already strips obsolete permanent Palace unlock semantics.

Keep that firewall.

## Palace invariant validation

After parse:

- no duplicate `progression.careers['palace']`;
- duty count 0..15;
- `shifts == palace-duty-count`;
- stage must match duty count;
- committed duty IDs must be exact ordered prefix of the 15-duty table;
- support IDs unique/known;
- support sequence legal;
- route-prep typed state matches world-fact projection;
- `palace.progression-complete` exactly once iff duty 15/Outcome Ready;
- daily lock days never in future.

## Reload points

Required save/reload coverage:

- invitation pending;
- after invitation acceptance;
- before first Palace duty;
- immediately after duty transaction but before milestone scene resolves;
- milestone pending at duties 2/5/8/12/15;
- after route-prep step 1;
- after route-prep step 2 / prep fact;
- finalize event pending;
- all three non-True final-ready facts coexisting;
- Prince confrontation phases 1/2/3/4;
- failure/back-out;
- after `palace.prince-defeated`;
- Return Home eligible but uncommitted;
- ending committed before `completeEnding`;
- completed ending reward transaction.

Reload must never duplicate:
- Energy spend;
- wage;
- duty count;
- milestone;
- support completion;
- route-ready fact;
- Prince defeat;
- permanent reward.

---

# 19. D48 presentation/media preflight

D48 minimum dedicated target is exactly four reusable static SVG families:

1. `assets/presentation/palace-custodian-audience.svg`
2. `assets/presentation/palace-threshold-archive.svg`
3. `assets/presentation/palace-return-home-threshold.svg`
4. `assets/presentation/palace-service-interior.svg`

At research time, current main contains **none** of those four dedicated Palace assets.

Do not fabricate them during assembly.

## Accepted fallbacks

If dedicated media is still absent on the real Palace assembly base:

- Service Interior -> `assets/stage-room.svg`;
- Threshold Archive -> `assets/stage-room.svg`;
- Custodian Audience -> `assets/stage-room.svg`;
- Return Home -> `assets/stage-town.svg`.

These are the v19 mappings.

v19 adds 19 Palace presentation slots.

Chat 2 should merge those 19 slots into the post-D42 presentation registry.

## Media checks

For every Palace presentation slot:

- source path exists;
- source is project-owned;
- no external URL;
- RU alt present;
- EN alt present;
- RU caption present;
- EN caption present;
- fallback copy says the neutral image is not hidden canon;
- missing dedicated art does not hide mechanics;
- game remains understandable from text alone.

If dedicated D48 assets appear before Palace assembly:
- switch the matching visual family only;
- do not change mechanics/gates;
- keep fallback-safe accessibility copy semantically accurate.

---

# 20. D45 / D49 lore wording gate

D49 epistemic ladder is binding.

## Pre-Palace ceiling

Before Palace, optional systems may reach only L1 local evidence habits.

They may mention:
- records;
- route mismatch;
- source/provenance;
- handoffs;
- cross-checks;
- unexplained inconsistencies.

They must not objectively reveal:
- Threshold;
- Threshold Archive;
- Palace Concordance;
- inter-world crossing;
- Palace causation;
- route home.

No D42 Night line, Secret Debt line, School line or Activity line may front-load the Palace answer.

## Invitation

Invitation may explain:
- ordinary Hard Work breadth;
- current active packages;
- invitation protocol.

It must not reveal:
- Threshold;
- Threshold Archive;
- return route;
- original displacement cause.

## Duty 12 — first authenticated anomaly turn

Allowed:
- multiple authenticated records disagree with ordinary travel;
- independent sources corroborate anomaly;
- route does not account for event.

Still forbidden as objective fact:
- Threshold;
- Threshold Archive;
- inter-world crossing;
- heroine-specific crossing classification;
- Palace stewardship;
- Prince veto;
- route home.

Preferred framing:
- authenticated anomaly;
- separate sources;
- route mismatch;
- cross-check;
- unresolved evidence.

## Duty 15 — first canonical naming point

Now permitted:
- Palace Concordance / Дворцовый Свод;
- Threshold / Порог;
- Threshold Archive / Архив Порога;
- real inter-world crossings;
- heroine's arrival classified as crossing anomaly;
- Palace stewardship;
- successor world is real.

Still unresolved:
- original cause of displacement;
- Threshold creator/discoverer;
- whether Palace caused the heroine's arrival;
- whether all crossings were intentional;
- whether all were voluntary;
- Prince's private motive.

## Prince confrontation

Success proves:
- an independent coherent heroine-specific Origin Trace;
- custody is not identical to exclusive truth;
- Prince's exclusive epistemic veto no longer stands;
- a lawful return claim exists.

It does not prove:
- Prince is evil;
- Palace is wholly illegitimate;
- Prince caused the arrival;
- Prince knows the original cause;
- safeguards are useless;
- Prince must die/be deposed;
- romance is required.

Prince defeat is epistemic/procedural, not physical.

## Return Home

Return Home establishes:
- real crossing;
- original world is reachable;
- heroine returns by explicit choice;
- successor world remains real and intact.

Even Return Home does not establish:
- original displacement cause;
- first Threshold creator/discoverer;
- universal intent/voluntariness of old crossings;
- Prince's final private motive;
- final Palace political settlement.

---

# 21. Exact Prince / lore anti-regressions

Must fail QA if any Palace copy says or implies as objective fact:

- Palace brought the heroine here;
- Prince brought her here;
- Prince knows exactly why;
- Palace/Prince family created the Threshold;
- all crossings are deliberate;
- all crossings are voluntary;
- heroine is chosen one;
- 12×91 is mystical power fueling the Threshold;
- Lust is moral purity/readiness;
- School teaches inter-world travel secret;
- Activity contains required Threshold key;
- Secret Debt is price of crossing;
- dreams prove cosmology;
- successor world is simulation/dream;
- people are copies/NPCs;
- Return Home destroys/rewrites successor world;
- Inner Truth explains original cause;
- Court Power controls the Threshold by title;
- Prince defeat means combat/death/magical domination.

RU and EN must preserve the same epistemic strength:
- report stays report;
- inference stays inference;
- institutional claim stays attributed claim;
- unknown stays unknown.

---

# 22. Presentation / UI checks

Palace UI should remain absent before run-local access.

After access, Work UI may expose a separate Palace section.

It must show:

- current Palace stage;
- duty x/15;
- structural duty lock;
- structural cost 1 Energy;
- bounded wage preview;
- support cost/lock;
- three route preparation states;
- eligible Palace endings only;
- Prince confrontation only when exact gate is met.

UI must not:

- show Palace as ordinary profession 11;
- imply permanent Palace unlock;
- expose internal fact IDs;
- expose Threshold before legal reveal point;
- show Return Home as auto-selected;
- create reward-selection controls inside Palace ending panel;
- duplicate New Start+ Strong Meta selection UI.

Post-D42/Secret Debt app must retain all existing Night/debt UI.

---

# 23. Focused Chat 2 gate

Before any full-CI lane, on the actual post-D42/post-Secret-Debt Palace assembly branch run:

`npm ci`

`npm run typecheck`

`npm run validate`

`npm run build`

Then run this focused bundle:

```text
node --experimental-strip-types --test
tests/palace-d23-consumer-integration-v8.test.ts
tests/palace-rich6-runtime-v15.test.ts
tests/palace-player-facing-ui-v16.test.ts
tests/palace-player-facing-ui-renderer-v16.test.ts
tests/palace-prince-narrative-producer-v18.test.ts
tests/palace-prince-narrative-renderer-v18.test.ts
tests/palace-final-prose-media-v19.test.ts
tests/hard-work-palace-meta-smoke.test.ts
tests/hard-work-meta-migration-v5.test.ts
tests/strong-meta-registry-v7.test.ts
tests/strong-meta-engine-integration-v7.test.ts
tests/ending-meta.test.ts
tests/night-flow.test.ts
tests/night-content-gap-v10.test.ts
tests/secret-debt-full-route-v12.test.ts
tests/secret-debt-activity-energy-compat-v20.test.ts
tests/chat3-secret-debt-separation-v2.test.ts
tests/presentation-ending-parity-v9.test.ts
tests/presentation-source-integrity-v9.test.ts
tests/presentation-locale-accessibility-parity-v7.test.ts
tests/shared-night-ui-localization-production-v1.test.ts
tests/qa-one-save-state-drift-sentinel-v2.test.ts
```

If the post-D42 or post-Secret-Debt assembly renames/supersedes a source test, run its current-main authoritative replacement in addition to the Palace source suite.

Do not drop:
- D23;
- D42 Night;
- Secret Debt forced Night;
- D51 Energy;
- Strong Meta registry;
- save-state drift;
- presentation/accessibility.

## D39 additional required acceptance

Because v18/v19 do not contain D39 implementation tests, the final Palace assembly also needs executable coverage for:

### Steady Practice
- ownership only after completed Service Life;
- one Specialist slot;
- first two ordinary careers at shift 8 bind;
- third does not;
- exactly 3 qualifying D31 protections each;
- non-D31 penalties unaffected;
- Secret Debt/Activity/Palace penalties unaffected;
- reload cannot duplicate charges.

### Formal Introduction
- ownership only after completed Court Power;
- one Specialist slot;
- exactly 3 uses;
- one use per relationship ID;
- legal career + >=1 shift;
- first professional stage only;
- no romance;
- no Activity/Palace/Secret Debt targets;
- invalid transition consumes no use;
- reload safe.

### Source Method
- ownership only after completed Inner Truth;
- future-run automatic inheritance;
- no Specialist/Keystone slot;
- information-only;
- no resources/stats/counters/stages/ending changes;
- no inaccessible-scene reveal;
- no Palace/Prince bypass.

### Common reward lifecycle
- eligibility grants nothing;
- route finalize grants nothing;
- commit alone grants nothing permanent;
- `completeEnding` grants exactly once;
- earned reward does not activate in same life;
- replay/reload does not duplicate ownership.

---

# 24. Recommended assembly order

After Secret Debt + D51 is merged to main:

1. freeze the real current-main SHA;
2. verify D42 and Secret Debt focused baselines are green;
3. add/extend current `src/core/palace.ts` with v18 Palace runtime helpers;
4. add Palace state to current schema6 only;
5. manually compose v15 Palace action handling into current post-D51 engine;
6. add v19-final versions of new Palace progression/finalize/Prince packs;
7. apply only v19 invitation prose to the existing D23 invitation mechanics;
8. add Palace career/actions/quest/endings selectively to current definitions;
9. resolve D39/D24 reward bindings through canonical current Strong Meta / knowledge ownership;
10. add `src/ui/palaceUi.ts`;
11. merge Palace UI into current post-D42/post-Debt `app.ts`;
12. merge Palace RU/EN localization keys;
13. merge the 19 v19 Palace presentation slots into current post-D42 presentation registry;
14. use D48 dedicated assets only if they actually exist; otherwise retain approved fallbacks;
15. permanently port/adapt Palace source tests to current schema6/Strong Meta;
16. add D39 reward lifecycle/runtime tests when the implementation source is available;
17. run typecheck / validate / build;
18. run the focused bundle above;
19. only after focused green should Chat 2 use its normal full-CI gate.

Do not cherry-pick v15/v16/v18/v19 wholesale.

---

# 25. Current-main conflict hotspots

## Highest risk

### `src/core/engine.ts`

Must simultaneously preserve:
- current schema6 engine;
- D40/D41;
- D42;
- Secret Debt v12;
- D51 Energy provenance;
- Strong Meta;
- Palace atomic action handling.

### `src/core/schema.ts`

Must simultaneously preserve:
- schema6;
- Strong Meta state;
- Secret Debt state;
- D40/D41/D42;
- Palace default state.

### `content/definitions.json`

Must preserve:
- all current ordinary endings/actions;
- D42 Night definitions;
- Secret Debt actions/endings;
- Strong Meta reward binding semantics;
- Palace career/actions/quest/endings.

### `src/ui/app.ts`

Must preserve:
- D42 Night UI;
- Secret Debt UI;
- New Start+ Strong Meta UI;
- Palace UI.

### `content/localization.json`

Merge by Palace key only.

### `content/presentation.json`

Merge 19 Palace slots into D42/global presentation without replacement.

## Medium risk

### `src/core/palace.ts`

Current production owns D23 entry.

v18 is an extension, not replacement authority.

Preserve current D23 behavior and add:
- duties;
- support;
- reward seam identifiers;
- Prince readiness;
- validation.

## Low collision / still validate

- `src/ui/palaceUi.ts`
- `content/packs/palace-progression.json`
- `content/packs/palace-outcome-finalize.json`
- `content/packs/palace-prince-confrontation.json`
- Palace source tests
- v19 missing-media manifest.

---

# 26. Preflight verdict

The Palace cumulative tranche is selectively assemblable after D42 and Secret Debt/D51.

There is no reason to wait for dedicated Palace art:
- D48 explicitly authorizes fallbacks;
- v19 has complete RU/EN prose and accessibility mappings.

There is no runtime reason to modify Secret Debt:
- Palace daytime state is independent;
- the forced-Night firewall remains external and absolute.

There is no authority to simplify Palace into:
- an ordinary career;
- a permanent access unlock;
- a Secret Debt bypass;
- a Strong Meta free slot;
- a mystical 12×91 key;
- a combat Prince route.

The primary technical risks are:

1. wholesale copying schema5-era `engine.ts` or `schema.ts`;
2. overwriting post-D42/post-Debt definitions/localization/UI;
3. restoring permanent `meta.unlocks['palace']`;
4. duplicating Palace under `progression.careers`;
5. losing Secret Debt forced-Night precedence;
6. applying Palace action cost before D51/start-day Energy finalization;
7. allowing duty 16+ paid progression;
8. duplicating wage/duty/milestone on reload;
9. front-loading D49 Threshold lore at duty 12 or earlier;
10. treating Prince defeat as combat/romance/cosmology proof;
11. auto-committing Return Home;
12. leaving all Palace endings with `metaRewards: []`;
13. inventing D39 reward implementation as though it existed in v18/v19;
14. replacing D42 presentation registry instead of merging the 19 Palace slots;
15. treating missing dedicated art as a release blocker despite authorized fallbacks.

The correct strategy is a semantic selective assembly onto the real post-Secret-Debt current main, with D39 reward implementation explicitly resolved rather than silently omitted.

## Disposition

**READY_FOR_CHAT2_PREFLIGHT**
