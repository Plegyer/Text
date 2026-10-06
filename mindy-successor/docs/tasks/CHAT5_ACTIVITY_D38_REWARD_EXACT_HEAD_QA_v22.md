# Chat 5 — Activity D38 Reward Exact-Head QA v22

Status: **READY_FOR_CHAT2_ASSEMBLY**  
Owner: Chat 5  
QA branch: `chat5/qa-activity-d38-reward-v22`

## Frozen producer under verification

`chat3/activity-d38-reward-producer-v26@7770b6bf7f930e8af17331e8b22613523bb2e768`

The producer branch was not mutated.

The QA workflow explicitly checked out the exact frozen producer SHA and separately verified `git rev-parse HEAD` against that SHA before running executable checks.

## Final successful executable evidence

Workflow:

`Chat 5 Activity D38 v22 exact-head QA`

Run:

`37456870066`

Job:

`112246513706`

Runner:

self-hosted Windows X64

Exact checkout verified:

`7770b6bf7f930e8af17331e8b22613523bb2e768`

Required build/schema gate:

- `npm run typecheck` — **PASS**
- `npm run validate` — **PASS**
  - `Content OK: 84 packs, 357 events, 39 actions, 43 endings.`
- `npm run build` — **PASS**
  - `Built renderer, content catalog and desktop save validator.`

## D38 reward / Strong Meta / lifecycle bundle

Executed:

```text
node --experimental-strip-types --test
tests/activity-d38-strong-meta-v26.test.ts
tests/strong-meta-registry-v7.test.ts
tests/strong-meta-engine-integration-v7.test.ts
tests/ending-meta.test.ts
tests/qa-exactly-once-reload.test.ts
tests/migration.test.ts
```

Result:

- tests: **58**
- pass: **58**
- fail: **0**

This bundle covers the required D38 verification surface:

- three canonical D38 Specialist IDs;
- Specialist capacity remains exactly 2;
- no Activity-only extra Specialist slot;
- exact Strong Meta registry/integration;
- canonical ending transaction lifecycle;
- eligibility/commit do not grant permanent ownership;
- `completeEnding` grants exactly once;
- RunResult / transaction replay stays idempotent;
- no generic `meta.unlocks` ownership for D38 rewards;
- same-life snapshot remains unchanged;
- future-life explicit selection;
- old schema6 runtime default for D38 state;
- save/reload persistence;
- consumed Atlas use cannot replay after reload;
- new-life run-local D38 state reset;
- permanent ownership survives;
- profile merge semantics remain current behavior;
- D38 ghost runtime validation rejects invalid state.

## Secret Debt / Palace / ordinary-career firewall bundle

Executed:

```text
node --experimental-strip-types --test
tests/chat3-secret-debt-separation-v2.test.ts
tests/palace-d23-consumer-integration-v8.test.ts
tests/hard-work-palace-meta-smoke.test.ts
tests/ordinary-hard-work-meta-production.test.ts
tests/ordinary-hard-work-lifecycle-parity.test.ts
```

Result:

- tests: **21**
- pass: **21**
- fail: **0**

This confirms the frozen D38 producer does not regress the requested isolation boundaries:

- Secret Debt remains separate from ordinary-career / Activity reward ownership;
- D23 Palace qualification remains its own 10/10 permanent + active ordinary-package rule;
- Activity D38 Specialists do not substitute for Palace qualification;
- no permanent Palace unlock is introduced;
- ordinary Hard Work lifecycle remains explicit and exactly-once;
- ordinary Hard Work package identity remains outside Strong Meta Specialist slots;
- D38 does not create a new ordinary-career reward path.

## Focused total

Across the two executable test bundles:

**79 / 79 PASS**

No full CI was run.

## QA harness repair history

Initial QA run:

`37456799116`

Job:

`112246291158`

It failed before Node setup/tests at the extra exact-head verification step because the self-hosted runner does not provide `pwsh`:

`pwsh: command not found`

Important:

- `actions/checkout` had already successfully fetched and checked out the exact producer SHA;
- the log showed:
  `HEAD is now at 7770b6bf...`;
- no producer test or build step ran in that failed attempt;
- this was a QA workflow-shell defect, not a producer defect.

The QA branch was repaired only by changing the verification shell from unavailable `pwsh` to `cmd`.

No frozen producer file changed.

The repaired run `37456870066` then passed the full requested focused gate.

## Verification conclusion

Frozen producer:

`7770b6bf7f930e8af17331e8b22613523bb2e768`

is executable-green for the exact Chat 5 v22 verification scope.

Verified:

- typecheck;
- validate;
- build;
- D38 focused reward semantics;
- Strong Meta registry/integration;
- ending transaction lifecycle;
- save/reload persistence;
- no generic unlock ownership;
- no extra Specialist slot;
- Secret Debt firewall;
- Palace firewall;
- ordinary-career firewall.

The producer remains immutable.

No full CI was run.

**READY_FOR_CHAT2_ASSEMBLY**
