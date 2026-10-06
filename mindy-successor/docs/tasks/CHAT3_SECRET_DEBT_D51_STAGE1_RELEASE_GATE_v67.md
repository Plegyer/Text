# Chat 3 — Secret Debt + D51 Stage-1 Save/Migration Release Gate v67

Status: **PREPARED — APPLY TO ONE FROZEN CHAT2 CANDIDATE SHA**
Owner: Chat 3
Branch: `chat3/secret-debt-d51-stage1-release-gate-v67`

No production runtime/content changes.

No full CI.

No `main` merge.

## 1. Frozen authorities

Use these authorities; do not broaden semantics from this checklist:

- Secret Debt route producer:
  `chat4/secret-debt-full-route-producer-v12@10a2ecebf02ce64bdaf54d74dbbb66d6bae6e59e`
- D51 compatibility producer:
  `chat3/secret-debt-activity-energy-compat-producer-v20@79a868bf30af2c162b2ea1323759dffad5e8dadf`
- Recovery-head QA handoff:
  `chat4/qa-secret-debt-d51-recovery-head-v50@f0f60405ca8263e65ccaf8a939b407ac18eaafb6`
  file `mindy-successor/docs/tasks/CHAT4_QA_SECRET_DEBT_D51_RECOVERY_HEAD_v52.md`
- Accepted final save/migration dry-run:
  `CHAT3_FINAL_SAVE_MIGRATION_DRYRUN_v66.md@e3629f92c04f3d24f8bc583a0922c9f133333986`
- Locked Product authority:
  `mindy-successor/docs/USER_DECISIONS_LOCKED_v1.md` — D19 and D44.

Observed live Chat2 branch while preparing this gate:

`chat2/assembly-secret-debt-d51-current-main-recovery-v2@4ee45ee70a26f58c5c1ec595b48295368fab8bad`

Latest observed commit:

`feat(secret-debt): merge exact route localization keys`

This observation is **not** a frozen release-candidate PASS. Chat2 must explicitly freeze a candidate SHA after all Stage-1 repairs and before assigning execution results.

## 2. One-SHA rule

Fill this block before running the Stage-1 save gate:

```text
candidateBranch: chat2/assembly-secret-debt-d51-current-main-recovery-v2
candidateSHA:
schemaVersion:
contentCatalogVersion:
strongMetaRegistryVersion:
gateStartedFromCleanCheckout: PASS | FAIL | NOT-RUN
```

Every result in this document must belong to that exact `candidateSHA`.

Do not combine a schema result from one SHA with localization/runtime/focused results from another.

Status vocabulary:

- **PASS** — executed/verified on the frozen candidate SHA and satisfied the contract.
- **FAIL** — executed/verified on the frozen candidate SHA and violated the contract.
- **NOT-RUN** — not executed on the frozen candidate SHA.

Historical producer or earlier QA greenness is prerequisite evidence only; it is not a final candidate PASS.

## 3. Stage-1 save/migration contract

| ID | Contract | Exact acceptance condition | Candidate status |
|---|---|---|---|
| SD51-01 | Old save missing Secret Debt | Parse/migrate to neutral `unseen` state; no acceptance, debt, trap, bound, reward, or lender history invented | NOT-RUN |
| SD51-02 | Refused persistence | Refused route reloads as refused and cannot reopen the one-time lender encounter in the same life | NOT-RUN |
| SD51-03 | Accepted persistence | Accepted route reloads with accepted timing/state unchanged | NOT-RUN |
| SD51-04 | Bound persistence | Bound route reloads bound with debt/provenance/route state preserved exactly | NOT-RUN |
| SD51-05 | Resolved persistence | Paid Freedom / Takeover resolved state reloads without reopening bound route or replaying exit effects | NOT-RUN |
| SD51-06 | Acceptance money exactly once | Acceptance grants exactly +2000 once; reload cannot duplicate the grant | NOT-RUN |
| SD51-07 | Trap timing | Trap activates exactly at the accepted ten-day boundary and does not backdate the preceding Night as bound | NOT-RUN |
| SD51-08 | Forced Night priority | While bound, Secret Debt forced Night has absolute priority over voluntary/private-space/Palace/Activity-adjacent Night choices | NOT-RUN |
| SD51-09 | D51 exact provenance pair | Compatibility applies only to the exact pair `lodging.street.energy-penalty` + `secret-debt.bound-night` | NOT-RUN |
| SD51-10 | D51 pair floor | The exact pair may floor resulting Energy at 2 according to accepted compatibility behavior | NOT-RUN |
| SD51-11 | No global Energy floor | Street alone, bound-Night alone, or unrelated Energy changes must not become a global `Math.max(2,...)` rule | NOT-RUN |
| SD51-12 | Third unrelated penalty | After the D51 pair floor, an unrelated third -1 may reduce Energy below 2, including to 1 | NOT-RUN |
| SD51-13 | Provenance reload safety | Queued Street/bound-Night provenance survives reload once and clears/consumes without duplication | NOT-RUN |
| SD51-14 | Hidden work reload safety | Energy spend, wage, stat effects, hidden-shift count and transaction identity do not replay after reload | NOT-RUN |
| SD51-15 | Repay reload safety | Full 20000 repayment commits once; money/debt/route transition does not replay | NOT-RUN |
| SD51-16 | Ending transition reload safety | Paid Freedom / Bound Life / Takeover commit and result/transaction effects occur once | NOT-RUN |
| SD51-17 | Canonical reward ownership | Ending reload preserves canonical Strong Meta reward identity exactly once with no generic duplicate unlock | NOT-RUN |
| SD51-18 | Strong Meta current-run immutability | Migration/profile/reward handling does not rewrite the current-run Strong Meta snapshot/runtime | NOT-RUN |
| SD51-19 | No generic debt inference | Generic money debt / unrelated legacy state never infers Secret Debt acceptance/bound state | NOT-RUN |
| SD51-20 | Night regression firewall | Existing NightFlow identity/calendar/priority behavior outside Secret Debt remains intact | NOT-RUN |
| SD51-21 | Activity regression firewall | School/Activity availability while bound remains as locked; Activity/Camp state is not reinterpreted by Secret Debt migration | NOT-RUN |
| SD51-22 | Palace regression firewall | Existing legitimate Palace access/progression is not reset or fabricated by Secret Debt/D51 migration | NOT-RUN |
| SD51-23 | Reload identity firewall | Pending/RNG/result/reward/transaction identities remain stable wherever the accepted contract requires stability | NOT-RUN |

## 4. Canonical Secret Debt ending/reward ownership

The Stage-1 candidate must preserve exactly these canonical Strong Meta reward bindings:

- Paid Freedom:
  `secret-debt.paid-freedom.earned-reserve-match`
- Bound Life:
  `secret-debt.bound-life.work-rhythm`
- Takeover:
  `secret-debt.takeover.network-retainer`

Required:

- one canonical ownership record per earned ending reward;
- no generic Secret Debt unlock duplicated alongside the canonical reward;
- reload/profile handling must not convert canonical reward ownership into a second reward;
- current-run Strong Meta snapshot/runtime remain immutable.

## 5. D51 exact provenance firewall

Accepted provenance tags:

```text
lodging.street.energy-penalty
secret-debt.bound-night
```

The compatibility floor belongs to that exact pair.

Hard stop if any of these occurs:

- Street housing alone triggers the pair floor;
- bound Night alone triggers the pair floor;
- generic Energy -1 effects are treated as provenance-equivalent;
- the floor becomes a global Energy minimum;
- an unrelated third penalty is swallowed by the floor;
- provenance is duplicated across reload.

Acceptance anchor:

the exact pair may establish the compatibility floor at 2, and then a separate unrelated third -1 may yield Energy 1.

## 6. Trap / Night ordering firewall

Locked ordering requirement:

- acceptance itself does not retroactively make the preceding Night a bound forced Night;
- the ten-day trap boundary establishes the bound state at the accepted transition point;
- only Nights that are actually bound Nights carry `secret-debt.bound-night` provenance;
- forced Secret Debt Night remains absolute priority while bound.

A backdated bound-Night penalty or forced-Night event is a FAIL.

## 7. Reload exactly-once firewall

On the frozen candidate, include reload checkpoints around at least:

- lender acceptance;
- trap activation;
- forced Night -> next-day D51 application;
- hidden-work commit;
- full repayment;
- each Secret Debt ending commit/reward transaction.

At each checkpoint verify no replay of:

- money;
- Energy;
- calendar;
- hidden-shift count;
- stat effects;
- reward ownership;
- result/transaction identity;
- pending/RNG identity.

## 8. Required adjacent regression coverage

The Stage-1 candidate is not save-gate green from Secret Debt tests alone.

The exact focused candidate run must retain coverage for:

- NightFlow / Night UI ordering;
- Activity + School availability and state preservation;
- Strong Meta snapshot/runtime and reward ownership;
- Palace access/progression preservation;
- migration / ending transaction idempotence;
- Secret Debt localization/presentation integrity needed by the accepted route.

Use the current Chat2 focused Stage-1 roster derived from the accepted v28/v52 recovery plan. Do not drop adjacency files merely because v12/v20 tests pass.

## 9. Failure classification

Before modifying anything, classify every red row as exactly one of:

- product/runtime failure;
- save/migration defect;
- current-main composition defect;
- stale fixture/test debt;
- missing expected work;
- content/localization expectation drift;
- infrastructure/runner failure.

Do not change production behavior merely to make a stale fixture pass.

Do not call an absent or not-yet-frozen candidate a product failure.

## 10. Full-CI firewall

Chat2 must not run Stage-1 full CI until, on one frozen candidate SHA:

- typecheck = PASS;
- validate = PASS;
- build = PASS;
- every SD51-01..SD51-23 row = PASS;
- required focused adjacency roster = PASS;
- Secret Debt localization integrity = PASS;
- no unresolved failure classification remains.

Only Chat2 owns the full-CI run.

## 11. Machine-readable result block

Populate this exact block in the future candidate handoff:

```text
candidateSHA:
typecheck: PASS | FAIL | NOT-RUN
validate: PASS | FAIL | NOT-RUN
build: PASS | FAIL | NOT-RUN
oldSaveNeutralDefault: PASS | FAIL | NOT-RUN
routePersistence: PASS | FAIL | NOT-RUN
acceptancePlus2000ExactlyOnce: PASS | FAIL | NOT-RUN
trapNoBackdate: PASS | FAIL | NOT-RUN
forcedNightPriority: PASS | FAIL | NOT-RUN
d51ExactPair: PASS | FAIL | NOT-RUN
d51NotGlobalFloor: PASS | FAIL | NOT-RUN
d51ThirdPenaltyBelow2: PASS | FAIL | NOT-RUN
hiddenWorkReload: PASS | FAIL | NOT-RUN
repayReload: PASS | FAIL | NOT-RUN
endingReload: PASS | FAIL | NOT-RUN
canonicalRewardOwnership: PASS | FAIL | NOT-RUN
strongMetaCurrentRunImmutable: PASS | FAIL | NOT-RUN
noGenericDebtInference: PASS | FAIL | NOT-RUN
nightRegression: PASS | FAIL | NOT-RUN
activityRegression: PASS | FAIL | NOT-RUN
palaceRegression: PASS | FAIL | NOT-RUN
focusedAdjacency: PASS | FAIL | NOT-RUN
localizationIntegrity: PASS | FAIL | NOT-RUN
failureClassificationComplete: PASS | FAIL | NOT-RUN
fullCIPermitted: YES | NO
```

Prepared-state value:

```text
candidateSHA: NOT FROZEN
typecheck: NOT-RUN
validate: NOT-RUN
build: NOT-RUN
oldSaveNeutralDefault: NOT-RUN
routePersistence: NOT-RUN
acceptancePlus2000ExactlyOnce: NOT-RUN
trapNoBackdate: NOT-RUN
forcedNightPriority: NOT-RUN
d51ExactPair: NOT-RUN
d51NotGlobalFloor: NOT-RUN
d51ThirdPenaltyBelow2: NOT-RUN
hiddenWorkReload: NOT-RUN
repayReload: NOT-RUN
endingReload: NOT-RUN
canonicalRewardOwnership: NOT-RUN
strongMetaCurrentRunImmutable: NOT-RUN
noGenericDebtInference: NOT-RUN
nightRegression: NOT-RUN
activityRegression: NOT-RUN
palaceRegression: NOT-RUN
focusedAdjacency: NOT-RUN
localizationIntegrity: NOT-RUN
failureClassificationComplete: NOT-RUN
fullCIPermitted: NO
```
