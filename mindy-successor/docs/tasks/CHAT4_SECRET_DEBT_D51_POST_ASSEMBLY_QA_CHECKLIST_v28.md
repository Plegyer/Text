# Chat 4 — Secret Debt + D51 Post-Assembly QA Checklist v28

Status: **READY_FOR_CHAT2_PREFLIGHT**  
Owner: Chat 4  
Branch: `chat4/secret-debt-d51-final-assembly-packet-v26`

Purpose: define the exact focused executable gate Chat 2 must run after assembling Secret Debt v12 + D51 + v27 localization onto the current schema6 / Strong Meta / D42 integration head.

This is a QA checklist only.

No production runtime changes by Chat 4.  
No full CI by Chat 4.

---

# 1. Required source files after assembly

The assembled branch must contain these source-specific tests.

From frozen Secret Debt/D51/localization sources:

- `tests/secret-debt-full-route-v12.test.ts`
- `tests/secret-debt-activity-energy-compat-v20.test.ts`
- `tests/secret-debt-ending-localization-producer-v27.test.ts`

From current/D42 runtime:

- `tests/night-content-gap-v10.test.ts`

Current ordinary Prostitute firewall:

- `tests/prostitute-boundaries.test.ts`

If any required file is absent after the corresponding production tranche is assembled, stop before test execution and classify the assembly omission.

Do not silently drop a missing test from the roster.

---

# 2. Required adaptations before execution

## secret-debt-full-route-v12.test.ts

Use the D51-head semantics, not the original pre-D51 Street expectation.

Required current-main adaptations:

1. schema6 pre-Secret-Debt save defaults to neutral `run.secretDebt`;
2. ending rewards assert canonical Strong Meta ownership;
3. no generic `meta.unlocks` ownership for the three Secret Debt rewards;
4. RunResult transaction applies reward once on completion;
5. current Strong Meta snapshot/runtime remain intact;
6. settled-bound synthetic fixtures must not accidentally re-trigger trap activation;
7. exact D19 timing remains acceptedDay=0 / trapDay=10 / boundDay=10.

## secret-debt-activity-energy-compat-v20.test.ts

Preserve all T1–T11 cases.

Mandatory:

- T4 reload before forced choice;
- T5 reload after forced choice;
- T7 exact activation boundary;
- T8 first actual bound Street Night after activation;
- T9 effective base 4 diagnostic;
- T11 unrelated third -1 -> final Energy 1.

Do not weaken T11.

## secret-debt-ending-localization-producer-v27.test.ts

Preserve:

- all three stable ending IDs;
- double-prefixed runtime localization namespace;
- exact title/description parity;
- three bilingual epilogues;
- no Palace/romance/consent/Strong-Meta prose implication.

## night-content-gap-v10.test.ts

Use the authoritative D42 version from the assembled D42/current branch.

Do not port a historical pre-repair count fixture.

## prostitute-boundaries.test.ts

Use as the ordinary Prostitute separation firewall.

It must prove ordinary Prostitute content does not acquire:

- Secret Debt ownership;
- hidden-work semantics;
- forced-Night ownership;
- extra money mechanics;
- Palace access;
- invented School/relationship thresholds.

---

# 3. Explicit stale-test exclusion

Do **not** use:

`tests/chat3-secret-debt-separation-v2.test.ts`

as a post-assembly “Secret Debt absent” gate.

Reason:

v24 exact-source executable QA demonstrated that this historical test intentionally asserts that Secret Debt production is absent. Once v12 is assembled, that assertion is obsolete by design.

Observed v24 first-attempt behavior:

- Secret Debt v12 route tests passed;
- `prostitute-boundaries.test.ts` passed;
- the sole failure came from the pre-v12 absence assertion in `chat3-secret-debt-separation-v2.test.ts`.

Therefore final post-assembly separation authority is `prostitute-boundaries.test.ts`, not the pre-v12 absence audit.

If the old file remains in the repository for historical reasons, it must not be included in the final focused gate unless it is rewritten to stop asserting global absence of Secret Debt.

---

# 4. Gate order

Chat 2 should run the focused gate in this order.

## Phase A — install / static build gates

```text
npm ci
npm run typecheck
npm run validate
npm run build
```

All four must pass before any higher-level interpretation.

Do not treat a test green result as sufficient if typecheck or validate is red.

## Phase B — core Secret Debt / D51

Run:

```text
node --experimental-strip-types --test
tests/secret-debt-full-route-v12.test.ts
tests/secret-debt-activity-energy-compat-v20.test.ts
tests/secret-debt-ending-localization-producer-v27.test.ts
tests/prostitute-boundaries.test.ts
```

This phase owns:

- route mechanics;
- exact D44 thresholds;
- D51;
- route localization;
- ordinary Prostitute firewall.

## Phase C — Night / D42 / reload

Run:

```text
node --experimental-strip-types --test
tests/night-flow.test.ts
tests/night-content-gap-v10.test.ts
tests/qa-exactly-once-reload.test.ts
tests/shared-night-ui-localization-production-v1.test.ts
```

This phase owns:

- NightFlow atomicity;
- D42 preservation;
- forced-Night precedence;
- one calendar advance;
- save/reload Night integrity;
- shared Night UI localization.

## Phase D — Activity / School

Run:

```text
node --experimental-strip-types --test
tests/activity.test.ts
tests/school-night-study-adapter.test.ts
```

This phase owns:

- Activity still available while bound;
- Activity entry cost remains 2 Energy;
- School availability remains independent;
- Night Study compatibility stays intact.

## Phase E — Strong Meta / ending transactions

Run:

```text
node --experimental-strip-types --test
tests/strong-meta-d30-runtime-v7.test.ts
tests/strong-meta-engine-integration-v7.test.ts
tests/strong-meta-registry-v7.test.ts
tests/ending-meta.test.ts
tests/ordinary-hard-work-meta-production.test.ts
```

This phase owns:

- canonical Secret Debt reward IDs;
- registry validity;
- snapshot/runtime persistence;
- Work Rhythm;
- Network Retainer;
- Earned Reserve Match;
- exactly-once ending transaction behavior;
- ordinary work isolation.

## Phase F — Palace / save drift

Run:

```text
node --experimental-strip-types --test
tests/palace-d23-consumer-integration-v8.test.ts
tests/hard-work-palace-meta-smoke.test.ts
tests/qa-one-save-state-drift-sentinel-v2.test.ts
```

This phase owns:

- no Secret Debt-created Palace access;
- existing Palace state survives;
- current save state does not drift across unrelated systems.

## Phase G — localization / presentation integrity

Run:

```text
node --experimental-strip-types --test
tests/localization.test.ts
tests/presentation-source-integrity-v9.test.ts
tests/presentation-locale-accessibility-v9.test.ts
```

If the current D42/current branch carries a newer authoritative presentation parity suite, add it to this phase; do not remove the three listed tests.

---

# 5. One combined focused command

After all individual phases are green, Chat 2 may run the exact combined roster:

```text
node --experimental-strip-types --test tests/secret-debt-full-route-v12.test.ts tests/secret-debt-activity-energy-compat-v20.test.ts tests/secret-debt-ending-localization-producer-v27.test.ts tests/prostitute-boundaries.test.ts tests/night-flow.test.ts tests/night-content-gap-v10.test.ts tests/qa-exactly-once-reload.test.ts tests/shared-night-ui-localization-production-v1.test.ts tests/activity.test.ts tests/school-night-study-adapter.test.ts tests/strong-meta-d30-runtime-v7.test.ts tests/strong-meta-engine-integration-v7.test.ts tests/strong-meta-registry-v7.test.ts tests/ending-meta.test.ts tests/ordinary-hard-work-meta-production.test.ts tests/palace-d23-consumer-integration-v8.test.ts tests/hard-work-palace-meta-smoke.test.ts tests/qa-one-save-state-drift-sentinel-v2.test.ts tests/localization.test.ts tests/presentation-source-integrity-v9.test.ts tests/presentation-locale-accessibility-v9.test.ts
```

On Windows PowerShell/cmd, use the equivalent single-line form if shell continuation differs.

The roster contains **21 test files**.

---

# 6. Required Secret Debt assertions

Before declaring the focused gate green, verify failures did not get “fixed” by changing these locks.

## Lender

- fixed 20%;
- Street-only eligibility;
- one attempt/day;
- refusal closes route;
- +2000 once;
- reload no reroll/regrant.

## Trap

- exact +10 days;
- debt exactly 20000;
- boundDay exact;
- no retroactive forced Night.

## Ordinary careers

- all ten locked while bound;
- progress preserved;
- no bypass option;
- resume normal rules after route exit.

## School / Activity

- School remains available;
- Activity remains available subject to normal conditions/Energy;
- Activity entry cost exactly 2.

## Hidden work

- cost 1 Energy;
- pre-shift wage formula;
- Endurance +1;
- Sexuality +1;
- Lust +0;
- Summer Reason -1;
- Winter Sociability -1;
- cap 140.

## Endings

- Bound Life 49 no / 50 yes;
- no auto-commit;
- Takeover exact thresholds;
- explicit takeover action;
- repayment full-only 20000;
- no auto-ending.

---

# 7. Required D51 assertions

Mandatory exact examples:

- base3 + Street -1 + bound -1 -> 2
- base4 + pair -> 2
- base5 + pair -> 3
- Street only base3 -> 2
- bound only base3 -> 2
- pair + unrelated -1 -> 1

Mandatory provenance assertions:

- bound tag exactly `secret-debt.bound-night`;
- Street tag exactly `lodging.street.energy-penalty`;
- D51 requires both tags;
- housing alone cannot trigger D51;
- queue survives reload before StartDay;
- queue clears once after StartDay;
- no duplicate tag/effect on reload.

Stop if any implementation introduces a global floor 2.

---

# 8. Required D42 preservation assertions

The D42 gate is red if any already-bound Night allows voluntary D42 completion.

Must prove:

1. `secret-debt.forced-night` wins at `before_lodging`;
2. priority class remains `forced`;
3. priority remains 1000;
4. voluntary menu is suppressed;
5. lodging still resolves normally;
6. calendar advances once;
7. no D42 relationship/career success fact is published while bound;
8. all 12 D42 surfaces remain present for normal non-bound play;
9. exactly three normal-housing private-space branches remain the D42 private set;
10. after Secret Debt route exit, normal D42 behavior returns.

At minimum execute bound scenarios around:

- Guard ordinary Night;
- Prostitute personal continuation;
- Prostitute private client branch;
- one other normal-housing private relationship branch.

Do not “solve” precedence by deleting/weakening D42 content.

---

# 9. Required ordinary Prostitute separation

The final ordinary Prostitute system remains separate from Secret Debt.

Must prove:

- normal Prostitute events do not write Secret Debt state;
- normal Prostitute choices do not add the bound-night tag;
- normal Prostitute work does not become hidden Secret Debt work;
- Sexuality/Lust never imply lender acceptance or consent;
- ordinary Prostitute private Night cannot bypass bound forced Night;
- Prostitute content does not create Palace access;
- Secret Debt route does not require a Prostitute relationship state.

Use `prostitute-boundaries.test.ts` plus the Secret Debt route consent/Palace assertions.

---

# 10. Required Strong Meta assertions

Each Secret Debt ending must grant only its canonical current reward:

Paid Freedom:
`secret-debt.paid-freedom.earned-reserve-match`

Bound Life:
`secret-debt.bound-life.work-rhythm`

Takeover:
`secret-debt.takeover.network-retainer`

Must prove:

- reward class/registry remains canonical;
- ownership added exactly once;
- no duplicate generic unlock record;
- ending eligibility does not grant;
- ending commit does not grant;
- ending completion transaction grants;
- replay/reload does not duplicate;
- current-run snapshot remains frozen;
- future-life ownership is available normally.

Bound interactions:

- Earned Reserve Match does not amplify hidden Secret Debt wage;
- Network Retainer is suppressed while bound;
- Work Rhythm may alter effective base but does not suppress relative bound/D51 logic.

---

# 11. Required save/reload assertions

The executable gate must cover the v27 matrix at least at these checkpoints:

- schema6 save with no Secret Debt state;
- lender pending;
- after acceptance;
- day before trap;
- trap activation;
- settled bound;
- forced Night pending;
- after forced choice;
- after Street lodging;
- pre-StartDay D51 queue;
- post-D51 morning;
- 49 shifts;
- 50 shifts;
- Takeover-ready pre-action;
- post-Takeover;
- post-repayment;
- ending committed;
- ending completed.

Exactly-once effects to check:

- +2000 lender grant;
- 20000 activation;
- forced Night -1;
- Street -1;
- Street Grooming -1;
- calendar +1;
- hidden shift;
- repayment -20000;
- Takeover state transition;
- ending Strong Meta reward transaction.

---

# 12. Static diff/firewall review before test signoff

Chat 2 should inspect the assembled diff before interpreting green tests.

## New files allowed from v12

- `src/core/secretDebt.ts`
- `content/packs/secret-debt.json`

## Shared files expected to be selectively changed

- `src/core/schema.ts`
- `src/core/content.ts`
- `src/core/engine.ts`
- `content/definitions.json`
- `content/localization.json`
- `src/ui/app.ts`

Red flags:

- schemaVersion changed away from 6 without an explicit Leader-approved migration;
- Strong Meta fields disappear;
- D42 choices disappear;
- current presentation/localization rows disappear;
- entire historical file blob replaces a current shared file;
- generic Secret Debt unlock ownership appears in addition to Strong Meta ownership.

---

# 13. Stop conditions

Stop immediately and report the exact failing seam if any of these occur.

## Schema / migration

- legitimate old schema6 save fails only because `run.secretDebt` is missing;
- missing state is inferred from debt/housing/Lust/Prostitute data;
- current Strong Meta/D40/D41 state is reset;
- schema is downgraded to 5.

## Night / D42

- bound Night reaches voluntary D42 menu;
- D42 fact/counter publishes while bound;
- forced event loses before-lodging ownership;
- one Night advances calendar twice or zero times.

## D51

- Street tag missing;
- bound tag missing;
- D51 inferred from housing;
- base4 pair produces 3;
- pair + unrelated -1 is forced back to 2;
- queue replays after reload.

## Secret Debt route

- +2000 duplicates;
- trap activates early/late;
- 20000 debt duplicates;
- ordinary career usable while bound;
- School or Activity globally disabled;
- hidden work cost/stat/wage rules drift;
- Bound Life eligible at 49;
- 50 auto-commits;
- Takeover auto-completes;
- repayment becomes partial.

## Strong Meta / endings

- v12 generic unlock reward remains authoritative;
- reward granted on eligibility or commit;
- completion duplicates ownership;
- first bound morning pays Network Retainer because bound was sampled before trap activation;
- current-run Strong Meta snapshot is rewritten.

## Isolation

- ordinary Prostitute starts writing Secret Debt;
- Secret Debt creates Palace access;
- D42/private relationship rules are weakened to make tests pass.

## Localization

- any of the nine Secret Debt ending runtime keys is missing RU/EN;
- current D42/global localization rows are lost because v12/v27 file was copied wholesale.

Do not patch around a stop condition by broadening mechanics.

---

# 14. Green criteria

The post-assembly focused gate is green only when all are true:

1. `npm ci` PASS;
2. typecheck PASS;
3. validate PASS;
4. build PASS;
5. all 21 focused test files PASS;
6. Secret Debt v12 source semantics preserved;
7. D51 T1–T11 preserved;
8. D42 Night preserved;
9. ordinary Prostitute separation preserved;
10. Strong Meta reward ownership canonical and exactly once;
11. v27 localization green;
12. save/reload matrix has no replay/duplication path;
13. no forbidden wholesale replacement is present.

Only after this focused gate is green should Chat 2 decide whether to run its release/full-CI lane.

Chat 4 does not own that full CI.

---

# 15. Final v28 disposition

This checklist is the exact post-assembly gate companion to:

- v26 selective assembly packet;
- v27 save/reload matrix.

It intentionally removes the stale pre-v12 “Secret Debt absent” audit from the final gate and replaces it with the correct ordinary-Prostitute boundary test.

**READY_FOR_CHAT2_PREFLIGHT**
