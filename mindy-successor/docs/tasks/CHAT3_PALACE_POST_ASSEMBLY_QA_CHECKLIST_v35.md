# Chat 3 — Palace Post-Assembly QA Checklist v35

Status: **RESEARCH COMPLETE — BUNDLE TASK C COMPLETE**  
Owner: Chat 3  
Branch: `chat3/palace-independent-release-review-v33`

## Purpose

Focused executable gate for Chat 2 after selective Palace assembly onto the actual post-Secret-Debt+D51 production base.

This checklist validates the combined Palace stack:

- D23 entry;
- v15 rich-six runtime;
- v16 UI;
- v18 D45 Prince narrative/runtime;
- v19 prose/localization/presentation;
- v20 D39 Strong Meta/knowledge runtime;
- D43/D45/D48/D49 locks;
- schema6 / save / ending transaction coexistence;
- Secret Debt forced-Night + D51 coexistence.

It also converts the two v33 findings into explicit release stop conditions:

1. Formal Introduction must have at least one accepted live authored ordinary-professional consumer.
2. Source Method must have at least one accepted live authored information-only consumer.

No full CI is run by Chat 3. Chat 2 owns the focused gate and later full CI.

---

# 1. Assembly prerequisite

Do not begin this gate until:

- D42 is merged/exact-main green;
- Secret Debt v12 + D51 is merged/exact-main green;
- Palace was assembled on the actual then-current main;
- no historical Palace producer file was wholesale-copied over newer shared owners.

At current review time Secret Debt+D51 is still the active Chat 2 tranche, so this gate is future-facing.

---

# 2. Build/schema gate

Run first from the prototype root:

```text
npm ci
npm run typecheck
npm run validate
npm run build
```

All four must pass before focused behavioral tests.

Stop immediately on:

- schema union errors;
- unhandled D39 condition/effect variants;
- content capability errors;
- presentation/localization validation errors.

---

# 3. Core Palace focused roster

Run:

```text
node --experimental-strip-types --test tests/palace-d23-consumer-integration-v8.test.ts tests/palace-rich6-runtime-v15.test.ts tests/palace-player-facing-ui-v16.test.ts tests/palace-player-facing-ui-renderer-v16.test.ts tests/palace-prince-narrative-producer-v18.test.ts tests/palace-prince-narrative-renderer-v18.test.ts tests/palace-final-prose-media-v19.test.ts
```

Required proof:

- D23 only at 10 permanent + 10 active;
- invitation deterministic and run-local;
- no permanent Palace unlock;
- 15 duties exact;
- one structural duty/day;
- one support/day;
- Energy/wage D43 exact;
- no duty 16;
- prep facts coexist;
- multiple non-True ending eligibilities coexist;
- Prince exact 12x91;
- Lust excluded;
- deterministic four-phase confrontation;
- retry/back-out;
- defeat exactly once;
- Return Home still explicit;
- D45/D49 reveal timing preserved;
- v19 19 presentation slots present;
- fallback assets valid;
- RU/EN Palace prose/accessibility parity intact.

---

# 4. D39 / Strong Meta focused roster

Run:

```text
node --experimental-strip-types --test tests/palace-d39-reward-producer-v20.test.ts tests/strong-meta-registry-v7.test.ts tests/strong-meta-engine-integration-v7.test.ts tests/ending-meta.test.ts tests/hard-work-palace-meta-smoke.test.ts
```

Required proof:

## Registry

- registry union contains all pre-existing rewards plus D39;
- exactly the accepted Specialist capacity remains 2;
- Service Life and Court Power rewards are Specialists;
- Source Method is knowledge, not a Strong Meta slot reward;
- cap-200 remains a normal Specialist.

If Activity/D38 has already landed on the base, expected registry counts must be adapted to the current accepted union instead of forcing stale v20 total 22.

Do not delete newer reward IDs to make old count assertions pass.

## Lifecycle

For all four Palace endings:

- eligibility grants nothing;
- finalize grants nothing;
- commit alone grants nothing permanent;
- first completeEnding grants exactly one canonical reward;
- replay/reload does not duplicate;
- current run snapshot does not mutate;
- future run activates under normal selection/knowledge rules.

## Exact bindings

Final Palace definitions must not contain empty reward arrays.

Expected:

- Service -> Steady Practice strongMeta;
- Court -> Formal Introduction strongMeta;
- Inner Truth -> Source Method knowledge;
- Return Home -> cap-200 strongMeta.

No generic unlocks.

---

# 5. v33 missing-consumer gate

This is a new required release check.

## Formal Introduction live consumer

Before Palace is declared release-ready, inspect assembled content and prove:

- at least one exact authored event/choice uses:
  - `strongMetaFormalIntroductionAvailable`, and
  - `useStrongMetaFormalIntroduction`;
- target career is ordinary;
- target relationship is ordinary-professional;
- exact first professional transition exists;
- scene remains unavailable before legal career access;
- scene remains unavailable at zero current-life shifts;
- failed transition consumes no use;
- successful transition consumes exactly once;
- Palace/Activity/Secret Debt relationships are rejected;
- same relationship cannot consume twice;
- total successful uses <=3.

**STOP if runtime exists but live authored consumer count is zero.**

Do not auto-tag all relationships as a repair.

## Source Method live consumer

Prove assembled content contains at least one accepted authored scene/choice with:

`strongMetaKnowledge: palace.inner-truth.source-method`

and that:

- baseline scene is already legally reachable;
- Source Method only exposes information/provenance/cross-check content;
- no resource/stat/counter/stage/ending mutation is attached;
- D49 unresolved truths remain unresolved;
- current earning life does not see the branch unless knowledge was present in its run snapshot;
- later inherited run does.

**STOP if knowledge ownership exists but live authored consumer count is zero.**

Do not invent macro-lore in Chat 2.

---

# 6. Save/reload focused roster

Run:

```text
node --experimental-strip-types --test tests/migration.test.ts tests/ending-meta.test.ts tests/palace-d23-consumer-integration-v8.test.ts tests/palace-rich6-runtime-v15.test.ts tests/palace-prince-narrative-producer-v18.test.ts tests/palace-d39-reward-producer-v20.test.ts
```

Add/retain assembled-branch assertions from v34 for:

- invitation pending;
- access acceptance;
- restart clearing run-local access;
- duty milestone pending reload;
- no replay of Energy/wage/count;
- support/prep reload;
- duty15/Outcome Ready reload;
- no duty16 after reload;
- confrontation phase reload;
- failure reset/retry;
- defeat exactly once;
- defeated-but-uncommitted Return Home;
- committed-before-completeEnding reload;
- reward transaction replay protection;
- same-life reward inactive;
- future-life Specialist/knowledge activation;
- D39 runtime counters reload-safe;
- old schema6 missing D39 fields -> empty defaults.

---

# 7. Secret Debt / D51 adjacency roster

On the actual post-D51 base run:

```text
node --experimental-strip-types --test tests/chat3-secret-debt-separation-v2.test.ts tests/night-flow.test.ts tests/night-content-gap-v10.test.ts
```

Also run the authoritative assembled Secret Debt/D51 tests present on that branch, expected to include equivalents of:

- `tests/secret-debt-full-route-v12.test.ts`;
- `tests/secret-debt-activity-energy-compat-v20.test.ts`.

Required proof:

- Palace access/progression survives legitimate later Secret Debt binding;
- ordinary careers remain locked while bound;
- Palace daytime work remains separate;
- forced Night remains absolute;
- no Palace voluntary Night preempts forced Night;
- D51 provenance remains explicit;
- no global Energy floor;
- Palace spends from finalized current-day Energy;
- Palace does not change debt/repayment/Takeover.

---

# 8. D43 cadence/economy acceptance

Explicit assertions:

## Structural duty

- cost 1 Energy;
- max one/calendar day;
- does not end daytime;
- count max 15;
- exact next duty ordinal;
- no duty16.

## Wage

```text
35 + min(20, floor((Reason + Wits + Manners + Sociability) / 20))
```

Check:

- min 35;
- all four 91 -> 53;
- max 55 even with cap200;
- total structural pay <=825.

## Support

- max one/day;
- cost 1;
- pay 0;
- no duty count;
- no routine stat/Lust effect.

Reload cannot duplicate any transaction.

---

# 9. D45 Prince acceptance

Assert exact IDs:

- `palace.prince-confrontation`;
- `palace.confront-prince`;
- `palace.prince-defeated`.

Readiness:

- access;
- Outcome Ready;
- progression-complete;
- all 12 stats >=91;
- Lust irrelevant;
- no hidden School/Activity/item/relationship/romance/Strong-Meta requirement.

Confrontation:

- money 0;
- Energy 0;
- no RNG;
- four phases;
- failure/back-out -> ready;
- unlimited Product retry while gate remains true;
- defeat writer only phase-4 success.

After defeat:

- Return Home eligible;
- no automatic commit;
- no automatic completeEnding.

---

# 10. D49 lore acceptance

Static/content assertions:

- Threshold not canonically named before duty 15;
- duty 12 reveals authenticated anomaly only;
- duty 15 first names Concordance / Threshold Archive / Threshold;
- Prince confrontation does not reveal original displacement cause;
- Return Home leaves successor world real/intact;
- Prince is Custodian/human institution-holder, not deity/avatar/combat boss;
- no optional lore becomes gameplay gate.

---

# 11. D48 presentation/media acceptance

Run v19 presentation test plus global source-integrity tests:

```text
node --experimental-strip-types --test tests/palace-final-prose-media-v19.test.ts tests/presentation-source-integrity-v9.test.ts tests/presentation-ending-parity-v9.test.ts tests/presentation-locale-accessibility-parity-v7.test.ts
```

Required:

- exactly the accepted Palace slots are mapped;
- no current D42/global mappings overwritten;
- referenced media file exists;
- if dedicated D48 file absent, authorized fallback used;
- missing dedicated art is not treated as mechanics failure;
- RU/EN alt/caption parity preserved.

Do not reference a dedicated D48 path unless the asset is actually present.

---

# 12. Strong Meta combined-registry stop guard

Palace D39 v20 was verified against pre-Activity registry totals.

Future Palace assembly may occur before Activity per current queue, but final closure will eventually union D39 + D38.

Therefore tests must distinguish:

- invariant capacities/classes/IDs — stable;
- historical exact total counts — branch-dependent.

Stop if:

- D39 overwrites newer registry entries;
- registry version is downgraded;
- an existing Specialist disappears;
- Keystone count changes unexpectedly;
- Specialist capacity changes from 2;
- Source Method enters a slot registry;
- duplicate reward ID appears.

Do not make a stale historical count green by removing valid newer rewards.

---

# 13. UI acceptance

Palace UI must show:

- run-local access state;
- duty/stage progress;
- support/prep availability;
- Outcome Ready;
- Prince action only when exact gate holds;
- defeated state after success;
- explicit Return Home commit control;
- D39 reward copy without adding a separate Palace loadout.

Preserve:

- D42 Night UI;
- Secret Debt UI;
- current Strong Meta/New Start+ UI;
- ordinary ending UI.

Stop on any wholesale app regression.

---

# 14. Exact ending acceptance

Final assembled Palace ending IDs:

- `ending.palace.service-life`;
- `ending.palace.court-power`;
- `ending.palace.inner-truth`;
- `ending.palace.return-home`.

Non-True:

- require exact route-ready fact;
- do not require Prince defeat;
- may coexist eligible.

Return Home:

- requires Prince defeat;
- exact 12x91;
- Lust excluded.

All four require explicit D16 commit.

---

# 15. Focused execution order

Recommended sequence:

```text
1. npm ci
2. npm run typecheck
3. npm run validate
4. npm run build

5. D23 + Palace v15 runtime
6. v16 UI
7. v18 Prince runtime/render
8. v19 prose/presentation
9. v20 D39 + Strong Meta + ending lifecycle
10. v33 live-consumer assertions
11. save/reload matrix assertions
12. Secret Debt/D51/Night adjacency
13. presentation/global parity
```

Do not run full CI until every focused stage is green.

---

# 16. Hard stop conditions

Stop Palace assembly/release QA and report exact blocker if any of these occurs.

## Ordering/base

- Secret Debt+D51 is not yet closed/merged.
- Palace assembly base is guessed/stale.

## D23

- permanent Palace unlock returns;
- qualification works with 9/10;
- D39 reward grants access.

## D43

- second structural duty same day;
- duty Energy !=1;
- support advances duty count;
- paid duty16;
- wage outside accepted formula/range;
- reload duplicates wage/Energy/count.

## D39

- any Palace ending remains `metaRewards: []`;
- generic unlock binding;
- same-life activation;
- Specialist capacity !=2;
- Source Method consumes slot;
- Steady Practice semantics drift;
- Formal Introduction semantics drift;
- **Formal Introduction live consumer count = 0**;
- **Source Method live consumer count = 0**.

## Prince

- extra numeric gate;
- Lust gate;
- hidden School/Activity/item/relationship/romance gate;
- RNG/combat;
- failure writes defeat;
- defeat auto-commits Return Home.

## Secret Debt/Night

- Palace suppresses forced Night;
- bound state cleared/changed;
- D51 tags/floor semantics changed;
- global Energy floor introduced.

## Save

- schema6 downgraded/forked;
- run-local Palace access persists across lives;
- duty/support replay;
- Prince phase replay/skip;
- reward replay;
- current snapshot mutates after completion.

## Lore/media

- Threshold revealed canonically before duty15;
- original displacement cause answered;
- successor world becomes dream/simulation/collapses;
- missing dedicated D48 art blocks release despite valid fallback;
- absent asset path referenced.

---

# 17. Full-CI handoff rule

If and only if:

- build/schema gate is green;
- core Palace focused tests are green;
- D39 tests are green;
- both live D39 consumer gaps are closed and tested;
- save/reload matrix is green;
- Secret Debt/D51 adjacency is green;
- presentation/lore checks are green;

then Chat 2 may run its normal one full-CI gate.

Chat 3 does not run or own that full CI.

---

# 18. Final disposition

The Palace stack is mechanically coherent, but post-assembly QA must treat the two v33 consumer gaps as release blockers until exact live authored mappings exist.

Everything else should be verified against the frozen authorities rather than reopened.

**v35 COMPLETE**

**BUNDLE_COMPLETE — READY_FOR_LEADER_REVIEW**
