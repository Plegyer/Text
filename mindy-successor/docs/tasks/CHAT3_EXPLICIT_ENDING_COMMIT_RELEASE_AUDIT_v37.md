# Chat 3 — Explicit Ending Commit Release Audit v37

Status: **RESEARCH COMPLETE — BUNDLE TASK B COMPLETE**  
Owner: Chat 3  
Branch: `chat3/final-gameplay-release-smoke-bundle-v36`

## Scope

Release audit of ending lifecycle invariants across:

- 40 canonical ordinary-career endings;
- 3 Secret Debt endings;
- 3 standalone Activity endings;
- 4 Palace endings;
- legacy-compatible generic `guild-life` / `scholar-life`.

Required invariants:

1. eligibility never auto-ends a life;
2. player action explicitly commits an ending;
3. at most one ending is committed per life;
4. permanent reward applies only at central completion;
5. `completeEnding` is exactly-once/idempotent;
6. save/reload cannot skip or duplicate completion.

---

# 1. Central lifecycle authority

Current engine centralizes the lifecycle in:

- `commitEndingMutable`;
- `completeEndingMutable`;
- command `commitEnding`;
- command `completeEnding`;
- compatibility command `accept`.

## Commit semantics

`commitEndingMutable`:

- requires ending to be currently eligible;
- accepts only active/expired compatible flow states;
- rejects commit while pending scene/Night/Activity is unresolved;
- sets:
  - `run.endings.committed = endingId`;
  - `run.status = ending_committed`;
- grants no permanent reward;
- rejects a different ending after one has been committed.

Therefore the central runtime enforces **one committed ending per life**.

## Completion semantics

`completeEndingMutable`:

- requires `ending_committed`;
- refuses completion while final pending scene/Night/Activity exists;
- creates deterministic RunResult identity;
- checks permanent transaction ledger;
- grants first-completion reward only if transaction was not already applied;
- records completed ending and transaction proof;
- sets status `ended`;
- if already ended with a RunResult, returns without replay.

Therefore permanent rewards are completion-owned and completion is idempotent.

## Reload semantics

`ending-meta.test.ts` proves:

- committed state survives parse/reload;
- reward absent before completion;
- first completion creates one transaction;
- reload after completion preserves transaction;
- repeated completion does not duplicate reward or run count.

This central guarantee is family-agnostic.

---

# 2. Eligibility is non-terminal

D16 authority:

**ending eligibility is non-terminal.**

Expected shape:

```text
eligible
-> run remains active
-> player may continue play
-> explicit commit
-> optional ending-committed scene
-> completeEnding
-> ended
```

No family is authorized to jump directly from condition satisfaction to permanent completion.

---

# 3. Ordinary Hard Work endings — 10/10

Exact IDs:

1. `ending.lumber.hard-work`
2. `ending.satyr-maid.hard-work`
3. `ending.undead-farm.hard-work`
4. `ending.tavern.hard-work`
5. `ending.hunter.hard-work`
6. `ending.guard.hard-work`
7. `ending.merchant.hard-work`
8. `ending.artist-geisha.hard-work`
9. `ending.assassin.hard-work`
10. `ending.prostitute.hard-work`

## Audit result

**PASS**

`ordinary-hard-work-lifecycle-parity.test.ts` iterates all ten careers and proves for each:

- 50th valid shift produces eligibility;
- run remains active;
- committed ending remains null until player command;
- Hard Work Meta remains absent;
- additional legal play can occur after eligibility;
- explicit `commitEnding` produces `ending_committed`;
- reward still absent;
- explicit `completeEnding` ends run;
- exact `hardWork:<career>` is applied;
- transaction proof exists;
- repeated `completeEnding` is a no-op.

This is complete exact-family executable coverage.

---

# 4. D41 advanced ordinary endings — 14/14

Exact IDs:

## Lumber

- `ending.lumber.forewoman`
- `ending.lumber.forest`

## Satyr Maid

- `ending.satyr-maid.house-power`
- `ending.satyr-maid.personal-network`
- `ending.satyr-maid.boundary-mastery`

## Undead Farm

- `ending.undead-farm.research-farmer`
- `ending.undead-farm.successor`
- `ending.undead-farm.external-anomaly`

## Tavern

- `ending.tavern.innkeeper`
- `ending.tavern.information-broker`
- `ending.tavern.sanctuary`

## Hunter

- `ending.hunter.master-hunter`
- `ending.hunter.warden`
- `ending.hunter.legend`

## Audit result

**PASS**

`advanced-endings-tranche-a-v11.test.ts` proves:

- exact route eligibility;
- overlapping compatible endings may coexist;
- run remains active;
- eligible list survives reload;
- explicit commit chooses one;
- central completion ends run;
- automatic/Strong Meta reward bindings apply only through completion;
- selected-route facts survive save/reload.

The test explicitly demonstrates a state where Hunter Master/Warden/Legend are simultaneously eligible and then commits one chosen ending.

---

# 5. D40 advanced ordinary endings — 16/16

Exact IDs:

## Guard

- `ending.guard.officer`
- `ending.guard.reform`
- `ending.guard.network`
- `ending.guard.major-case`

## Merchant

- `ending.merchant.house`
- `ending.merchant.speculator-smuggler`
- `ending.merchant.patron-of-routes`

## Artist / Geisha

- `ending.artist-geisha.master-artist`
- `ending.artist-geisha.patron-network`
- `ending.artist-geisha.court-invitation`

## Assassin

- `ending.assassin.ghost`
- `ending.assassin.handler-takeover`
- `ending.assassin.refusal-turncoat`

## Prostitute

- `ending.prostitute.independent-house`
- `ending.prostitute.elite-clientele`
- `ending.prostitute.network-protection`

## Audit result

**PASS**

`d40-advanced-endings-tranche-b-v11.test.ts` plus the central ending transaction suite prove:

- selected-route eligibility remains explicit;
- reward bindings use central ending completion;
- Strong Meta rewards are granted through `commitEnding -> completeEnding`;
- repeated completion does not duplicate Specialist ownership;
- route-selection facts persist through reload;
- advanced reward does not substitute Palace D23.

No D40 route is authorized to auto-end from a route selection or threshold.

---

# 6. Ordinary-career total proof

```text
10 Hard Work
+ 14 D41 advanced
+ 16 D40 advanced
= 40 canonical ordinary-career endings
```

All 40 share the same central commit/completion transaction owner.

Legacy `lumber-stay` is not part of the canonical 40 and is separately retired under the accepted legacy closure.

---

# 7. Secret Debt ending family — 3/3

Exact IDs:

- `ending.secret-debt.paid-freedom`
- `ending.secret-debt.bound-life`
- `ending.secret-debt.takeover`

## Paid Freedom

Flow:

```text
full repayment action
-> paid-freedom route state
-> ending eligible
-> explicit commitEnding
-> ending-committed scene if authored
-> completeEnding
```

`secret-debt-full-route-v12.test.ts` executes the central transaction and proves reward/transaction exactly once.

## Bound Life

Threshold:

- exactly 50 hidden completed shifts for eligibility.

Test proves:

- 49 is ineligible;
- 50 becomes eligible;
- run remains active;
- committed remains null.

No auto-ending occurs.

## Takeover

Exact explicit Takeover action is required after all D44 thresholds.

Test proves:

- threshold satisfaction alone does not auto-commit;
- explicit Takeover action resolves route state;
- ending becomes eligible;
- run remains active;
- committed remains null;
- reload preserves uncommitted route state.

## Stale eligibility

Secret Debt tests also prove stale Bound Life cannot be committed after route changes to:

- Paid Freedom;
- Takeover.

This prevents committing an ending whose route state no longer matches.

## Audit result

**PASS**

Central completion guards apply to all three.

---

# 8. Activity ending family — 3/3

Exact IDs:

- `ending.activity.pathfinder`
- `ending.activity.preservation`
- `ending.activity.network`

## Audit result

**PASS**

`activity-ending-family-v16.test.ts` explicitly proves D16 behavior:

- Activity ending condition true does not end run;
- committed remains null;
- reward absent;
- multiple Activity endings may be eligible;
- explicit `commitEnding` selects one;
- a second different commit is rejected;
- `completeEnding` ends the run and applies reward.

Final assembly must replace the historical generic-unlock reward seam with canonical v26 Strong Meta bindings, but this does not change the commit/completion boundary.

v17 explicitly states D16 mechanics are unchanged.

---

# 9. Palace ending family — 4/4

Exact IDs:

- `ending.palace.service-life`
- `ending.palace.court-power`
- `ending.palace.inner-truth`
- `ending.palace.return-home`

## Non-True endings

Service/Court/Inner Truth:

- preparation facts may coexist;
- final-ready facts may coexist;
- multiple Palace ending eligibilities may coexist;
- route finalization writes readiness only;
- no finalization grants permanent reward;
- explicit ending commit chooses one.

## Return Home

Prince phase-4 success writes:

`palace.prince-defeated`

It does **not** call:

- `commitEnding`;
- compatibility `accept`;
- `completeEnding`.

v18 tests prove Return Home becomes eligible but remains uncommitted after Prince success.

## D39 rewards

Final canonical reward bindings:

- Service -> Steady Practice;
- Court -> Formal Introduction;
- Inner Truth -> Source Method;
- Return Home -> cap-200.

v20 proves permanent grant at `completeEnding`, same-life snapshot immutability and future-run-only activation.

## Audit result

**PASS for lifecycle**

Separate v33 release blockers remain for live Formal Introduction / Source Method consumers, but they do not alter ending commit correctness.

---

# 10. Generic compatibility endings

Exact legacy-compatible IDs:

- `guild-life`
- `scholar-life`

These are older compatibility endings with legacy `reward` fields rather than modern explicit `metaRewards`.

## Compatibility command

The central engine still exposes:

`{type:'accept', id}`

For a compatible ending it performs:

1. `commitEndingMutable`;
2. if no ending-committed scene is pending, `completeEndingMutable`.

Therefore `accept` is an explicit player command and is not an auto-ending on eligibility.

It still uses:

- one-ending-per-life commit guard;
- central completion;
- transaction proof;
- idempotent reward application.

## Audit result

**SEMANTIC PASS / EXACT-ID COVERAGE GAP**

The engine compatibility path is executable-tested in `ending-meta.test.ts` using a synthetic legacy ending.

However, no dedicated exact-ID regression case for `guild-life` and `scholar-life` was identified in the current test roster.

Release recommendation:

add one small exact-ID compatibility test proving for both:

```text
eligible
-> active
-> explicit accept
-> central commit/completion
-> exactly one legacy reward transaction
-> reload/repeat does not duplicate
```

Do not remove the compatibility path merely to make all ending families look identical.

---

# 11. One-ending-per-life proof

Central commit code rejects:

- any new ending when run already ended with another;
- a different ending when status is `ending_committed`.

Family-specific examples:

- Activity test explicitly attempts a second Activity commit and expects rejection;
- D41 overlapping endings remain co-eligible until one commit;
- Secret Debt stale-route guards additionally reject no-longer-valid route endings.

Expected universal state after commit:

```text
run.status = ending_committed
run.endings.committed = exactly one ID
run.endings.result = null until completion
```

---

# 12. Permanent reward boundary proof

Central completion calculates:

- deterministic transaction ID;
- `firstCompletion`;
- exact `metaRewards`;
- `alreadyApplied` from permanent transaction ledger.

Rewards are applied only when:

```text
firstCompletion
AND
transaction not already applied
```

Eligibility and commit do not grant reward.

This boundary covers:

- Hard Work packages;
- D40/D41 Strong Meta/knowledge/unlocks;
- Secret Debt Keystones;
- Activity Specialists after canonical assembly;
- Palace D39/cap200;
- legacy generic unlock rewards.

---

# 13. Exactly-once completion proof

After first completion:

- `run.status = ended`;
- RunResult exists;
- transaction ID stored;
- completed ending ledger updated;
- permanent transaction ledger updated.

A second `completeEnding` on an ended run with result returns without mutation.

`ending-meta.test.ts` compares serialized state before/after repeat and proves equality.

Ordinary Hard Work lifecycle parity repeats this check for all ten Hard Work endings.

Secret Debt focused test repeats completion after Paid Freedom and proves no duplicate reward/transaction.

---

# 14. Reload audit by lifecycle point

## Eligible, not committed

Reload must preserve eligibility where authored state remains valid.

Run remains active.

## Committed, not completed

Reload preserves:

- `ending_committed`;
- exact committed ID;
- pending ending-committed final scene if any;
- no permanent reward yet.

A new life cannot begin until selected fate is completed.

## Completed

Reload preserves:

- RunResult;
- transaction proof;
- permanent ownership;
- ended status.

Repeating completion cannot reapply.

## Stale eligibility after reload

Commit path revalidates actual ending conditions/route compatibility where family runtime requires it.

Secret Debt explicitly tests stale Bound Life invalidation after route resolution.

---

# 15. Required final release roster

Execute after all final families are assembled:

```text
tests/ending-meta.test.ts
tests/ordinary-hard-work-lifecycle-parity.test.ts
tests/advanced-endings-tranche-a-v11.test.ts
tests/d40-advanced-endings-tranche-b-v11.test.ts
tests/secret-debt-full-route-v12.test.ts
tests/activity-ending-family-v16.test.ts
tests/palace-rich6-runtime-v15.test.ts
tests/palace-prince-narrative-producer-v18.test.ts
tests/palace-d39-reward-producer-v20.test.ts
tests/migration.test.ts
```

Add one exact-ID guild/scholar compatibility assertion unless an existing later test is found on the actual final assembly branch.

---

# 16. Stop conditions

Stop final ending release if any family allows:

- condition satisfaction to set run ended automatically;
- permanent reward during eligibility;
- permanent reward during commit before completion;
- two different committed endings in one life;
- new life while `ending_committed`;
- completion while a final blocking scene remains;
- reload to skip committed final scene;
- reward replay after reload;
- transaction replay;
- different result transaction for the same completed run;
- retired `lumber-stay` restored as a normal live ending;
- Prince defeat to auto-complete Return Home.

---

# 17. Audit disposition

| Family | Count | Explicit player choice | Central completion | Exactly-once reward | Reload coverage | Result |
| --- | ---: | --- | --- | --- | --- | --- |
| Ordinary Hard Work | 10 | commitEnding | yes | yes | strong | PASS |
| D41 advanced | 14 | commitEnding | yes | yes | strong | PASS |
| D40 advanced | 16 | commitEnding | yes | yes | strong | PASS |
| Secret Debt | 3 | commitEnding after route action/state | yes | yes | strong | PASS |
| Activity D38 | 3 | commitEnding | yes | yes | focused v16 + central | PASS |
| Palace | 4 | commitEnding | yes | yes | v18/v20/v34 plan | PASS lifecycle |
| guild/scholar legacy | 2 | explicit `accept` compatibility command | internally yes | yes | generic compatibility test | PASS semantics / exact-ID gap |

Canonical modern families therefore satisfy D16.

The only ending-lifecycle coverage gap identified by this audit is dedicated exact-ID executable coverage for the two generic compatibility endings.

**v37 COMPLETE — CONTINUE TO v38**
