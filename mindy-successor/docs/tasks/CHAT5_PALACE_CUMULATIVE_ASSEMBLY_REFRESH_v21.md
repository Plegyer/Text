# Chat 5 — Palace Cumulative Assembly Refresh v21

Status: **READY_FOR_CHAT2_PREFLIGHT**  
Owner: Chat 5  
Branch: `chat5/palace-cumulative-assembly-refresh-v21`

Scope: research / selective-assembly packet only.

No production runtime change was made on this branch.  
No full CI was run.

---

## 1. Exact frozen Palace sources

### Palace cumulative mechanics / UI / Prince narrative

`chat6/palace-prince-narrative-producer-v18@67f948d185883d8e706dad522e5010bff8e2bd48`

Cumulative lineage inside that source:

- Palace rich-six runtime v15:
  `chat6/palace-rich6-runtime-producer-v15@40623a9de8b5a11ac9493b865c9f3fadd0435e1c`
- Palace player-facing UI v16:
  `chat6/palace-player-facing-ui-v16@65b9e668ff7112c86681905d62f723b6cf95cec0`
- D45 Prince/narrative mechanics v18:
  `67f948d185883d8e706dad522e5010bff8e2bd48`

### Palace final prose / presentation

`chat6/palace-final-prose-media-v19@6cf19169b92fa709e8ae51cf73ff72ef2c0fac19`

v19 is content-only on v18 and reported its Palace mechanics equal to v18.

### D39 reward runtime source

Frozen producer:

`chat5/palace-d39-reward-producer-v20@b5ab23a88ee0e18c6250251de15818ff799ff3f6`

Executable verified source head:

`b28b19628c0374c405cd32afedb0f16c105e2403`

Focused executable evidence:

- workflow run `37448961732`
- job `112220545186`
- typecheck PASS
- validate PASS
- build PASS
- D39 / Strong Meta bundle 41/41 PASS
- Palace / cross-system isolation bundle 18/18 PASS
- focused total 59/59 PASS

The frozen final v20 head differs from the executable head only by the handoff document.

### Product authorities

D39:
Palace non-True rewards.

D43:
Palace daily cadence / duty economy.

D45:
Palace Concordance / Threshold Archive / Prince authority.

D48:
`chat6/palace-media-production-plan-v20@10b748fd400c25e6384fcb451164fd3203ea8768`

D49:
`chat6/macro-mystery-lore-authority-v21@d4313ea670340a3539b89e4c9ba34261aff1deb7`

Leader D49 lock:

`mindy-successor/docs/tasks/LEADER1_D49_MACRO_LORE_LOCK_2026-10-04.md`

---

## 2. Production position at v21 research time

Observed main:

`main@981a26ad7b9b02e6124a4f6ed4b2fd8e645e2ef3`

Observed production merge baseline is still D41:

`f36de067ae2e82518360dbe045f71c700e200805`

The later main commits are Leader / task control-plane commits.

Therefore Palace is **not** ready to assemble directly on the observed main.

Current external integration order remains:

1. D42 Night;
2. Secret Debt v12 + D51;
3. Palace cumulative.

Observed current D42 Chat 2 branch:

`chat2/assembly-d42-night-current-main-20261004-v1@e93f677da1b4ddcd538422fdbaa4550eb1440e8c`

That head is volatile and must not be used as a hard-coded Palace base.

Frozen Secret Debt inputs:

- v12:
  `chat4/secret-debt-full-route-producer-v12@10a2ecebf02ce64bdaf54d74dbbb66d6bae6e59e`
- D51:
  `chat3/secret-debt-activity-energy-compat-producer-v20@79a868bf30af2c162b2ea1323759dffad5e8dadf`
- assembly preflight:
  `chat3/secret-debt-d51-assembly-preflight-v22@49fb8209ddfbc869ebe34ab155ead1afbf8c5c2c`

Chat 2 must start Palace only after D42 and Secret Debt+D51 are actually merged and the then-current production main is re-queried.

Do not encode today's D42 head as the Palace base.

---

## 3. Current Strong Meta baseline and D39 delta

Observed current production Strong Meta:

- registry version: `strong-meta-v3`
- Keystone capacity: 1
- Specialist capacity: 2
- total registered Strong Meta rewards: 20
- Specialists: 17
- Keystones: 3

Current rules that remain authoritative:

- 0..1 Keystone;
- 0..2 Specialists;
- D24 cap-200 is a normal Specialist;
- ordinary Hard Work packages are outside Strong Meta slots;
- automatic knowledge/content is slot-free;
- run snapshot is resolved at creation and immutable for that life;
- newly earned Meta does not mutate the active run snapshot;
- no Strong Meta reward grants Palace access;
- no Strong Meta reward suppresses Secret Debt forced Night.

D39 v20 selectively upgrades the canonical registry to:

`strong-meta-v4`

by adding exactly two Specialists:

- `palace.service-life.steady-practice`
- `palace.court-power.formal-introduction`

Result:

- total rewards 22;
- Specialists 19;
- Keystones 3;
- Specialist capacity still 2.

D39 also adds automatic knowledge:

`palace.inner-truth.source-method`

Source Method is not a Strong Meta reward-slot ID.

It must never appear in:

- Keystone registry;
- Specialist registry;
- preferred Keystone;
- preferred Specialists;
- ordinary Hard Work packages.

---

## 4. Exact Palace cumulative production ownership

### Inherited v15 runtime ownership

- `src/core/schema.ts`
- `src/core/palace.ts`
- `src/core/engine.ts`
- `content/definitions.json`
- `content/localization.json`
- `content/packs/palace-progression.json`
- `content/packs/palace-outcome-finalize.json`

### Inherited v16 UI ownership

- `src/ui/app.ts`
- `src/ui/palaceUi.ts`
- `content/localization.json`

### Direct v18 production delta

- `content/definitions.json`
- `content/localization.json`
- `content/packs/palace-invitation.json`
- `content/packs/palace-progression.json`
- `content/packs/palace-outcome-finalize.json`
- `content/packs/palace-prince-confrontation.json`
- `src/core/palace.ts`
- `src/ui/app.ts`
- `src/ui/palaceUi.ts`

v18 did not directly modify engine/schema relative to v16; those runtime seams are inherited from v15.

### Direct v19 production delta

- `content/definitions.json`
- `content/localization.json`
- `content/packs/palace-invitation.json`
- `content/packs/palace-progression.json`
- `content/packs/palace-outcome-finalize.json`
- `content/packs/palace-prince-confrontation.json`
- `content/presentation.json`

Planning:

- `mindy-successor/research/palace_missing_media_v1.csv`

No runtime TypeScript changed in v19.

### Direct v20 executable production delta

- `src/core/strongMeta.ts`
- `src/core/schema.ts`
- `src/core/engine.ts`
- `src/core/content.ts`
- `src/ui/app.ts`

Tests:

- `tests/palace-d39-reward-producer-v20.test.ts`
- `tests/strong-meta-registry-v7.test.ts`

v20 contains no Palace route/content pack and no `ending.palace.*` definition.

---

## 5. Shared-file conflict matrix

| File | D42 | Secret Debt / D51 | Palace v18/v19 | D39 v20 | Disposition |
| --- | --- | --- | --- | --- | --- |
| `content/definitions.json` | yes | yes | yes | no direct v20 | manual semantic compose |
| `content/localization.json` | yes | yes | yes | no | merge Palace keys only |
| `content/presentation.json` | yes | no direct v12/D51 owner | v19 | no | merge 19 Palace slots only |
| `src/ui/app.ts` | yes | yes | yes | yes | manual four-way UI compose |
| `src/core/engine.ts` | no D42 owner | yes + D51 | inherited Palace v15 | yes | highest-risk semantic compose |
| `src/core/schema.ts` | no D42 owner | yes | inherited Palace v15 | yes | highest-risk schema6 union |
| `src/core/strongMeta.ts` | no | existing current authority | no | yes | apply v20 D39 registry/knowledge selectively |
| `src/core/content.ts` | current validation | Secret Debt extends | no Palace v18 owner | yes | union SD + D39 validators |
| `src/core/palace.ts` | no | no | yes | no | extend current D23 file, never replace blindly |
| `src/ui/palaceUi.ts` | no | no | Palace-owned | no | direct-add candidate, then compile against current model |
| Palace progression/finalize/Prince packs | no | no | yes | no | direct-add candidates from v19 |
| `content/packs/palace-invitation.json` | existing D23 | no | text/reveal updates | no | preserve current D23 mechanics; merge v19 prose |
| D39 focused test | no | no | no | yes | add/adapt on assembly branch |

The critical new v21 conclusion is:

**v20 closes the old D39 implementation gap, but it increases shared-file pressure on engine/schema/app.**

Do not resolve that pressure by wholesale copying any producer file.

---

## 6. Files that must never be wholesale copied

### `src/core/engine.ts`

The real Palace assembly engine will already own:

- schema6 runtime;
- D40/D41 migrations and ending transaction lifecycle;
- D42 Night integration;
- Secret Debt v12;
- D51 next-day Energy provenance;
- current Strong Meta hooks;
- current Activity runtime.

Palace must add only its runtime seams.

D39 must add only its v20 seams.

Required union:

#### Palace v15/v18

- Palace run-local domain reads/writes;
- structural-duty availability and atomic commit;
- support/prep transaction;
- Palace reaction facts;
- fresh-run Palace default;
- Palace invariant validation.

#### D39 v20

- automatic-knowledge condition;
- Formal Introduction availability/effect;
- knowledge MetaReward grant;
- Steady Practice ordinary seasonal protection;
- D39 runtime validation path.

#### Preserve Secret Debt/D51

- bound ordinary-career lock;
- forced Night;
- hidden work;
- repayment/Takeover;
- D51 Street/bound provenance;
- D51 next-day Energy compatibility.

No Palace or D39 code may intercept Secret Debt forced Night.

No D39 code may treat Secret Debt hidden work as an ordinary career shift.

### `src/core/schema.ts`

Must remain schema version 6.

Union all of:

- current Strong Meta state/snapshot/runtime;
- D39 v20 runtime fields;
- D39 knowledge / Formal Introduction condition/effect types;
- `kind:'knowledge'` MetaReward;
- Secret Debt state / condition / effects;
- D40/D41/D42 state;
- NightFlow;
- Activity;
- Palace run-local state.

Never restore the Palace schema5-era migration body.

Never fork a second Strong Meta schema.

### `src/ui/app.ts`

Preserve:

- D42 Night UI;
- Secret Debt UI;
- current New Start+ Strong Meta selection;
- current ending UI;
- current localization/accessibility surfaces.

Add:

- Palace v16/v18 UI integration;
- D39 condition-explainer fallbacks from v20.

No separate Palace reward-selection UI.

### `content/definitions.json`

Preserve every current post-D42/post-Debt definition.

Add Palace only:

- Palace state machine;
- 15 structural duty actions;
- 6 support/prep actions;
- `palace.confront-prince`;
- `palace.prince-confrontation`;
- four Palace endings.

Use v19 text.

Use v18/v15 mechanics.

Apply v20 exact reward bindings.

### `content/localization.json`

Merge by key.

Never replace the post-D42/post-Debt/global localization catalog.

### `content/presentation.json`

Merge only the v19 Palace overrides.

Never replace D42/global presentation.

---

## 7. Recommended exact Chat 2 composition order

This order supersedes v23 only where D39 v20 now provides a real implementation source.

### External prerequisite

1. finish D42 assembly;
2. Leader merge D42 only after its full gate is green;
3. assemble Secret Debt v12 + D51 on that D42 main;
4. Leader merge Secret Debt+D51 after its required gate;
5. re-query the actual current `main`;
6. freeze that exact SHA as the Palace assembly base.

If Secret Debt+D51 is not yet in production main, do not start final Palace assembly.

### Palace step 1 — Strong Meta D39 source

Selectively port from v20:

- two approved D39 Specialist IDs;
- D39 resolved effect schemas;
- D39 registry rows;
- `strong-meta-v4`;
- automatic Source Method knowledge ID/registry;
- knowledge grant/query helpers;
- D39 runtime fields/defaults/validation.

Keep normal capacities unchanged.

### Palace step 2 — schema6 union

On the actual post-D51 schema:

- preserve `run.secretDebt`;
- preserve current Strong Meta;
- add D39 runtime defaults;
- add D39 condition/effect/MetaReward variants;
- add Palace run-local progression state from v15;
- preserve schemaVersion 6.

This is one semantic union, not a producer-file replacement.

### Palace step 3 — content validator union

Port D39 `content.ts` validation from v20:

- ordinary-career validation for Formal Introduction;
- relationship machine/transition validation;
- typed capability reads/writes;
- nested transition rejection.

Preserve Secret Debt/current validators.

### Palace step 4 — Palace runtime model

Extend the current D23 `src/core/palace.ts` with v18 cumulative Palace helpers.

Preserve the existing D23 entry model.

Do not restore permanent Palace access.

### Palace step 5 — engine semantic compose

Manually compose onto the post-D51 engine:

1. Palace structural/support runtime from v15;
2. Palace invariant/save validation;
3. D39 v20 knowledge grant condition/effect;
4. D39 v20 Steady Practice seam only on ordinary seasonal shifts;
5. D39 v20 Formal Introduction atomic relationship seam.

Preserve all D51/Secret Debt/Night behavior.

### Palace step 6 — authored Palace content

Use v19-final pack content:

- `content/packs/palace-progression.json`
- `content/packs/palace-outcome-finalize.json`
- `content/packs/palace-prince-confrontation.json`

For `palace-invitation.json`:

- keep the current D23 deterministic invitation mechanics;
- merge v19 final prose/reveal framing only;
- do not recreate or weaken D23.

### Palace step 7 — definitions + exact rewards

Selectively add Palace machine/actions/quest/endings.

Then bind all four Palace endings using section 8 below.

Do not leave any Palace ending with `metaRewards: []`.

### Palace step 8 — UI

Add/port:

- `src/ui/palaceUi.ts`
- Palace section integration in current `app.ts`
- D39 condition explainer fallbacks.

Preserve Night/debt/New Start+ UI.

### Palace step 9 — localization

Merge v19 Palace RU/EN keys only.

Preserve every current key.

### Palace step 10 — presentation

Merge exactly the 19 v19 Palace slots into the current registry.

Apply D48 dedicated assets only if those files actually exist on the real assembly base.

Otherwise keep D48-authorized neutral fallbacks.

### Palace step 11 — tests

Port/adapt v15/v16/v18/v19 Palace suites plus v20 D39 suite.

Run the focused bundle in section 17.

Only after focused green should Chat 2 run its normal full-CI gate.

---

## 8. Exact Palace MetaReward bindings

Frozen v19 currently contains empty Palace reward arrays.

These must become exact canonical bindings.

### Service Life

Ending:

`ending.palace.service-life`

```json
[
  {
    "kind": "strongMeta",
    "rewardId": "palace.service-life.steady-practice",
    "reward": "palace.service-life.steady-practice"
  }
]
```

### Court Power

Ending:

`ending.palace.court-power`

```json
[
  {
    "kind": "strongMeta",
    "rewardId": "palace.court-power.formal-introduction",
    "reward": "palace.court-power.formal-introduction"
  }
]
```

### Inner Truth

Ending:

`ending.palace.inner-truth`

```json
[
  {
    "kind": "knowledge",
    "rewardId": "palace.inner-truth.source-method",
    "knowledge": "palace.inner-truth.source-method"
  }
]
```

### Return Home

Ending:

`ending.palace.return-home`

```json
[
  {
    "kind": "strongMeta",
    "rewardId": "palace.true.cap-200",
    "reward": "palace.true.cap-200"
  }
]
```

Never bind these through generic `unlock`.

---

## 9. D39 lifecycle after composition

### Common permanent grant boundary

All permanent Palace rewards use the existing ending transaction lifecycle:

eligibility
-> explicit commit
-> committed resolution
-> `completeEnding`
-> exactly-once permanent reward
-> RunResult transaction proof

Eligibility grants nothing.

Route finalize grants nothing permanent.

Commit grants nothing permanent.

Only first completion applies the MetaReward.

### Steady Practice

Future-life Specialist only.

Effect while selected:

- first two distinct ordinary careers to reach 8 completed shifts bind;
- each bound career gets 3 protections;
- only that career's own D31 seasonal progression-stat `modifyStat -1` qualifies;
- max 6 points prevented/run;
- non-seasonal losses remain real.

No effect on:

- Palace;
- Secret Debt;
- Activity;
- D26 cadence;
- Hard Work 50;
- wages;
- money;
- Energy;
- Lust;
- items;
- relationships.

### Formal Introduction

Future-life Specialist only.

Effect while selected:

- max 3 successful authored uses/run;
- max once/relationship ID;
- ordinary target career must already be legally available;
- >=1 completed shift in that career;
- exact authored relationship transition must be legal;
- charge is consumed only after successful transition.

Never target:

- Palace relationship domain;
- Activity relationship domain;
- Secret Debt relationship domain.

No generic relationship auto-tagging is authorized.

### Source Method

Automatic future-life knowledge.

No slot.

No preference.

No same-life activation.

May only expose authored information/provenance/cross-check content in a scene that is already otherwise legal.

No direct effect on:

- resources;
- stats;
- Lust;
- inventory;
- career/relationship/School/Activity/Palace progression;
- ending eligibility.

---

## 10. D23 Palace entry firewall

D23 remains the only Palace entry rule.

Required qualification:

- permanent ordinary Hard Work progress 10/10;
- current active ordinary Hard Work packages 10/10.

Then:

- deterministic Day-1 invitation;
- explicit acceptance;
- run-local `palace.access-granted`.

Must remain false for:

- 9 permanent + 9 active;
- 10 permanent + 0 active;
- 10 permanent + 9 active.

Must become available for:

- 10 permanent + 10 active.

Forbidden:

- permanent `meta.unlocks['palace']`;
- `ensurePalaceUnlock(s.meta)`;
- `hardWork:palace`;
- Palace as an 11th ordinary career;
- D39 reward substituting for D23;
- Secret Debt substituting for D23;
- School/Activity/item/romance requirement.

---

## 11. D43 Palace daily cadence / economy

Structural duty:

- at most 1 progression-counting duty/calendar day;
- cost exactly 1 Energy;
- does not end daytime;
- extra Energy never buys a second structural duty;
- exactly 15 progression duties max;
- no paid duty 16+.

Milestones:

- duty 2 -> Working Rhythm;
- duty 5 -> Trusted Service;
- duty 8 -> Palace Network;
- duty 12 -> Crossroads;
- duty 15 -> Outcome Ready;
- duty 15 writes `palace.progression-complete` exactly once.

Support/prep:

- at most 1/day;
- cost 1 Energy;
- pay 0;
- no duty count;
- no routine progression stat;
- may coexist with structural duty if final Energy allows.

Wage:

`35 + min(20, floor((Reason + Wits + Manners + Sociability) / 20))`

Required anchors:

- min 35;
- max 55;
- four wage stats at 91 -> 53;
- total max structural Palace pay = 825.

No routine:

- stat package;
- Lust;
- negative-stat package.

---

## 12. Secret Debt / D51 firewall

This is a hard assembly boundary.

If Palace access was legitimately obtained before later Debt binding:

- Palace access remains;
- Palace progression remains;
- Palace daytime structural/support actions remain legal if final Energy permits.

But:

- all ten ordinary careers remain locked while bound;
- Secret Debt forced Night still owns every bound Night;
- Palace never clears bound state;
- Palace never changes repayment;
- Palace never turns debt into qualification.

### Forced-Night priority

`secret-debt.forced-night`

must remain:

- intercept `before_lodging`;
- priority class `forced`;
- priority 1000;
- `suppressVoluntaryMenu: true`;
- `consumesNight: true`.

Palace Night is optional/lower priority.

No Palace Night surface may run instead of forced Debt Night.

### D51 Energy provenance

Preserve exact tags:

- `lodging.street.energy-penalty`
- `secret-debt.bound-night`

When both locked -1 effects occur:

- process the pair;
- pair result floors at 2;
- apply unrelated Energy delta afterward;
- global minimum remains 1.

Examples that must remain:

- base 3 + Street -1 + bound -1 -> 2;
- base 4 + Street -1 + bound -1 -> 2;
- base 3 + pair + unrelated -1 -> 1.

Palace daytime action cost is paid only after StartDay has finalized current Energy.

No Palace or D39 feature may add a global floor of 2.

---

## 13. Prince confrontation exact checks

Stable IDs:

- quest: `palace.prince-confrontation`
- begin action: `palace.confront-prince`
- success fact: `palace.prince-defeated`

Cost:

- money 0;
- Energy 0.

Exact gate:

- `palace.access-granted`;
- Palace stage `outcome-ready`;
- `palace.progression-complete`;
- all 12 progression stats >=91;
- confrontation quest at ready;
- defeat fact absent.

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

No extra numeric gate.

No required:

- item;
- School;
- Activity;
- relationship;
- Night;
- romance;
- Strong Meta reward.

Quest stages:

1. ready;
2. audit-record;
3. name-contradiction;
4. define-boundary;
5. reconstruct-return;
6. defeated.

Confrontation is deterministic.

Failure/back-out:

- no `palace.prince-defeated`;
- no ending commit;
- retry remains legal;
- no Energy/money/item/Night/calendar penalty.

Prince defeat is evidentiary/procedural, not combat.

---

## 14. Return Home exact checks

Ending:

`ending.palace.return-home`

Eligibility requires:

- Palace access;
- Outcome Ready;
- `palace.progression-complete`;
- all 12 progression stats >=91;
- `palace.prince-defeated`.

Lust remains irrelevant.

Prince success must not:

- call `commitEnding`;
- call `accept`;
- call `completeEnding`.

The player must explicitly choose Return Home under the normal D16 ending lifecycle.

Permanent reward:

`palace.true.cap-200`

It consumes one normal Specialist slot in a future life.

It does not auto-select.

---

## 15. Save / migration / reload risks

### Existing schema6 save before Palace

Must receive a clean Palace progression default.

Must not change:

- Secret Debt state;
- D51 queued provenance;
- Strong Meta permanent state;
- Strong Meta current snapshot;
- Strong Meta runtime;
- D40/D41/D42 progression;
- NightFlow;
- Activity;
- existing world facts;
- ending history.

Must not infer Palace access.

### Existing schema6 save before D39

Missing D39 runtime fields default to:

- no Steady Practice bound careers;
- empty Steady Practice protection map;
- no Formal Introduction used relationship IDs.

No schema-version bump is required solely for these empty defaults.

### Legacy pre-schema6 save

Must continue through the current production migration chain.

Then apply current schema6 defaults.

Never reinsert the v18 schema5-era migration body.

### Current-run Strong Meta snapshot

If a Palace ending is completed during the run:

- permanent Meta ownership/knowledge changes;
- current run snapshot does not.

The reward becomes active only on a later creation snapshot.

### Source Method

Protected profile merge:

- unions/dedupes inherited knowledge;
- preserves current preferred loadout;
- does not inject knowledge into an already-resolved run snapshot.

### D39 Specialist ownership

Protected profile merge:

- unions/dedupes ownership;
- preserves current profile preferred selection;
- does not auto-select imported D39 Specialists.

### Ending transaction

RunResult must record the exact applied reward ID once.

Reload/replay must not duplicate:

- ownership;
- inherited knowledge;
- transaction proof.

### Palace action atomicity

Reload must not duplicate:

- Energy spend;
- Palace wage;
- duty count;
- support count;
- milestone publication;
- `palace.progression-complete`.

### Prince confrontation

Mid-confrontation save/reload must preserve the exact current quest stage.

Reload must not fabricate `palace.prince-defeated`.

### Historical Palace ending backfill

At research time Palace endings have not shipped on production main.

Therefore no D39 completed-ending backfill migration is authorized.

If the real assembly base unexpectedly already contains a shipped/completed Palace ending without its reward, stop and obtain explicit migration authority.

Do not infer or fabricate historical D39 ownership.

---

## 16. Localization / presentation / media merge rules

### Localization

Use v19 final Palace RU/EN copy.

v19 static audit:

- 97 required Palace localization entries;
- 0 missing RU;
- 0 missing EN.

Merge Palace keys only.

Preserve:

- D42 localization;
- Secret Debt localization;
- D40/D41 localization;
- all later global caption/accessibility keys;
- any other current-main content.

Do not replace the entire localization file.

### Presentation

v19 contains exactly 19 Palace presentation slot overrides.

Merge those 19 slots into the current presentation registry.

Do not replace D42/global presentation.

Preserve current source-integrity and locale/accessibility rules.

### D48 dedicated media

Minimum target is exactly four reusable static 16:9 SVGs:

1. `assets/presentation/palace-custodian-audience.svg`
2. `assets/presentation/palace-threshold-archive.svg`
3. `assets/presentation/palace-return-home-threshold.svg`
4. `assets/presentation/palace-service-interior.svg`

Observed current main at v21 research time contains none of the four.

Do not fabricate them in Chat 2 assembly.

D48 explicitly authorizes fallbacks.

If dedicated assets are still absent:

- keep v19 `stage-room.svg` / `stage-town.svg` fallbacks;
- Palace remains release-understandable through text/accessibility copy.

If all/some dedicated assets actually land before Palace assembly:

- use only files that truly exist;
- remap the corresponding Palace slots;
- do not invent paths.

Full D48 target mapping:

- Service Interior -> 7 slots;
- Threshold Archive -> 4 slots;
- Custodian Audience -> 5 slots;
- Return Home Threshold -> 1 slot;
- the 2 invitation slots intentionally remain `stage-town.svg`.

Thus four dedicated assets replace 17 of 19 v19 fallbacks.

No external media URLs.

No new presentation engine.

---

## 17. D45 / D49 lore gate

D49 does not reopen D45.

Required reveal ladder:

### Before Palace / early Palace

May foreshadow:

- sources;
- handoffs;
- route mismatches;
- independent corroboration;
- bounded uncertainty.

Must not reveal the inter-world answer.

### Duty 12

May establish:

- authenticated anomaly evidence;
- separate sources agree ordinary travel does not fully explain some records;
- records remain incomplete.

Must not yet state as objective canon:

- Threshold;
- Threshold Archive;
- inter-world crossing;
- heroine crossing classification;
- Palace stewardship;
- Prince veto doctrine;
- route home.

### Duty 15 / Outcome Ready

First canonical naming point for:

- Palace Concordance;
- Threshold;
- Threshold Archive;
- real inter-world crossings;
- heroine arrival classified as crossing anomaly;
- Palace stewardship.

Still unresolved:

- original displacement cause;
- Palace responsibility for causing it;
- first creator/discoverer;
- universal intentionality;
- universal voluntariness;
- Prince private motive.

### Prince confrontation

Proves:

- coherent heroine-specific Origin Trace;
- exclusive epistemic veto can be overruled.

Does not prove:

- Prince is evil;
- Palace safeguards are useless;
- original displacement cause;
- Prince death/deposition;
- metaphysical sovereignty.

### Return Home

Proves:

- heroine-specific crossing succeeds;
- original world is reachable;
- successor world remains real and continues.

Does not close the full cosmology.

### Cross-system lore

Optional School/Night/Activity/Secret Debt echoes remain presentation/context only.

They may never:

- satisfy D23;
- skip duty 12/15;
- lower 12x91;
- create route-ready facts;
- write `palace.progression-complete`;
- write `palace.prince-defeated`;
- create ending eligibility;
- suppress Secret Debt forced Night.

---

## 18. Focused Chat 2 test gate

Run on the actual post-D42/post-Secret-Debt Palace assembly branch.

First:

```text
npm ci
npm run typecheck
npm run validate
npm run build
```

Then run the cumulative focused bundle:

```text
node --experimental-strip-types --test \
  tests/palace-d23-consumer-integration-v8.test.ts \
  tests/palace-rich6-runtime-v15.test.ts \
  tests/palace-player-facing-ui-v16.test.ts \
  tests/palace-player-facing-ui-renderer-v16.test.ts \
  tests/palace-prince-narrative-producer-v18.test.ts \
  tests/palace-prince-narrative-renderer-v18.test.ts \
  tests/palace-final-prose-media-v19.test.ts \
  tests/palace-d39-reward-producer-v20.test.ts \
  tests/hard-work-palace-meta-smoke.test.ts \
  tests/hard-work-meta-migration-v5.test.ts \
  tests/strong-meta-registry-v7.test.ts \
  tests/strong-meta-engine-integration-v7.test.ts \
  tests/ending-meta.test.ts \
  tests/night-flow.test.ts \
  tests/night-content-gap-v10.test.ts \
  tests/secret-debt-full-route-v12.test.ts \
  tests/secret-debt-activity-energy-compat-v20.test.ts \
  tests/chat3-secret-debt-separation-v2.test.ts \
  tests/presentation-ending-parity-v9.test.ts \
  tests/presentation-source-integrity-v9.test.ts \
  tests/presentation-locale-accessibility-parity-v7.test.ts \
  tests/shared-night-ui-localization-production-v1.test.ts \
  tests/qa-one-save-state-drift-sentinel-v2.test.ts
```

If the final D42/Secret-Debt assembly renamed or superseded a source test, keep the current-main authoritative replacement and port the Palace/D39 assertions into it.

Do not drop:

- D23 entry;
- D43 duty cadence/economy;
- D45/D49 reveal ladder;
- Prince retry;
- explicit Return Home commit;
- D39 lifecycle;
- Strong Meta slot counts;
- Source Method slot-free behavior;
- D42 Night;
- Secret Debt forced Night;
- D51 Energy provenance;
- save/reload;
- presentation/source/accessibility parity.

Only after this focused gate is green should Chat 2 run its normal full CI.

---

## 19. Exact acceptance matrix after Palace assembly

### D23 / entry

- Palace access is run-local.
- No permanent Palace unlock.
- 10 permanent + 10 active ordinary packages required.

### D43 / duty

- max 1 structural duty/day.
- max 1 support/day.
- structural cost 1 Energy.
- support cost 1 Energy.
- no paid duty 16+.
- wage 35..55.
- duty 15 -> Outcome Ready exactly once.

### D39 / rewards

Service Life:
- grants Steady Practice exactly once on `completeEnding`;
- not active same life;
- future selected Specialist only.

Court Power:
- grants Formal Introduction exactly once;
- not active same life;
- future selected Specialist only.

Inner Truth:
- grants Source Method knowledge exactly once;
- no slot;
- automatic only in a later run snapshot.

Return Home:
- grants `palace.true.cap-200` exactly once;
- normal Specialist;
- no auto-selection.

### D45 / Prince

- exact 12x91 gate;
- Lust excluded;
- deterministic proof;
- no combat;
- no hidden additional prerequisite;
- failure/back-out retryable;
- success writes defeat once;
- success does not commit Return Home.

### Secret Debt

- Palace access/progress survives legitimate later binding;
- forced Night remains absolute;
- D51 provenance/energy behavior remains exact;
- Palace does not alter repayment or bound state.

### D48 / presentation

- exactly 19 Palace slots mapped;
- dedicated assets optional if absent;
- neutral fallbacks remain valid;
- all text remains understandable without dedicated art.

### D49 / lore

- duty 12 = authenticated anomaly, not Threshold reveal;
- duty 15 = first canonical Threshold naming;
- original cause remains unresolved;
- successor world remains real after Return Home.

---

## 20. Explicit stop conditions

Stop assembly and resolve before proceeding if any of the following occurs.

### Base/order

- Palace is being assembled before D42 merge is closed.
- Palace is being assembled before Secret Debt+D51 is closed.
- Chat 2 uses a guessed future base instead of re-querying actual main.

### Wholesale replacement

- historical Palace `engine.ts` replaces post-D51 engine.
- historical Palace `schema.ts` replaces current schema6.
- historical v19 definitions/localization/presentation replaces current files wholesale.
- v20 D39 producer files replace current files wholesale instead of selective compose.

### D23

- permanent `meta.unlocks['palace']` appears.
- `ensurePalaceUnlock(s.meta)` returns.
- Palace becomes an ordinary Hard Work career/package.
- D39 ownership grants Palace access.

### D43

- second structural duty becomes possible in one day.
- duty cost differs from 1 Energy.
- support increments duty count.
- paid duty 16+ exists.
- wage exceeds 55 or drops below locked formula.
- routine Palace duty grants stats/Lust/negative-stat package.
- reload duplicates duty/wage/milestone.

### D39 / Strong Meta

- Specialist capacity changes from 2.
- a third/free Palace Specialist slot appears.
- Source Method enters Keystone/Specialist preference.
- a D39 reward activates in the same life that earned it.
- Steady Practice protects arbitrary non-D31 stat loss.
- Steady Practice binds more than two careers.
- more than three protections are used for one bound career.
- Formal Introduction auto-enables every relationship.
- Formal Introduction can target Palace/Activity/Secret Debt relationship state.
- Formal Introduction consumes a charge on failed transition.
- Palace endings still have `metaRewards: []`.
- any Palace reward is bound as generic `unlock`.

### Secret Debt / Night / D51

- Palace suppresses `secret-debt.forced-night`.
- forced Night loses `before_lodging` / forced / 1000 precedence.
- Palace or D39 changes debt repayment or hidden-work gate.
- D51 provenance tags are removed.
- a global Energy floor of 2 appears.
- base 3 + Street + bound + unrelated -1 no longer reaches 1.

### Prince / Return Home

- Lust enters the readiness gate.
- an extra School/Activity/item/relationship/romance requirement appears.
- confrontation gains RNG/combat requirement.
- failure writes `palace.prince-defeated`.
- success auto-commits Return Home.
- Return Home bypasses D16 explicit commit.
- cap-200 becomes slot-free.

### Save/migration

- schemaVersion is downgraded/forked.
- v18 schema5 migration replaces the current chain.
- existing schema6 save loses Secret Debt/D42/Strong Meta/Activity state.
- missing D39 runtime defaults fabricate activation.
- profile merge overwrites current preferred loadout with imported preference.
- replay duplicates reward/knowledge/transaction proof.
- historical Palace ownership is backfilled without explicit authority.

### Presentation / localization / lore

- D42/global presentation mappings are overwritten.
- Palace RU/EN parity regresses.
- dedicated Palace asset path is referenced while file is absent.
- missing dedicated assets are treated as a release blocker despite D48 fallback authority.
- Threshold is named as objective canon at duty 12 or earlier.
- Return Home implies successor-world collapse/dream/simulation.
- Prince is turned into deity/avatar/combat boss/mandatory romance.
- optional School/Night/Activity/Secret Debt lore becomes a Palace gate.

---

## 21. Final v21 disposition

The cumulative Palace tranche is selectively assemblable once D42 and Secret Debt+D51 are actually merged.

The correct source stack is now:

1. post-D42/post-Secret-Debt current main as base;
2. Palace cumulative v18 mechanics/UI/Prince source;
3. Palace v19 final prose/localization/presentation;
4. D39 v20 Strong Meta/runtime/schema implementation;
5. D43/D45/D48/D49 Product authorities as acceptance firewalls.

The main new fact versus v23 is that D39 is no longer an unimplemented external seam.

It now has a frozen, focused-green producer:

`chat5/palace-d39-reward-producer-v20@b5ab23a88ee0e18c6250251de15818ff799ff3f6`

with executable implementation verified at:

`b28b19628c0374c405cd32afedb0f16c105e2403`.

Therefore Chat 2 must **compose** D39 into the Palace assembly, not omit it, invent it, or leave empty reward arrays.

No production runtime was changed by this v21 research branch.

No full CI was run.

**READY_FOR_CHAT2_PREFLIGHT**
