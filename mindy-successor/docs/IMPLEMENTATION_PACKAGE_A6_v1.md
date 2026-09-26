# IMPLEMENTATION PACKAGE A6 — Ending / RunResult / Meta Exactly Once

Дата: 2026-09-26.

Статус: **IN IMPLEMENTATION**.

Base commit:
`1602583bf9b80515280df165c269bec4353bc19a`.

Branch:
`lead/a6-runresult-meta`.

## Goal

Complete the Architecture Migration phase by separating:
- ending eligibility;
- ending commitment;
- central completion / RunResult;
- Meta reward application.

Reload/retry/repeated ending runs must never duplicate a unique Meta reward.

## Commands

Target:
- `commitEnding(id)`;
- `completeEnding`;
- `newLife`.

Legacy:
- `accept(id)` remains compatibility-only and performs commit + completion atomically for M3.2 UI/tests.

## State lifecycle

```text
active
-> ending becomes eligible
-> player may continue active life
-> commitEnding
-> status ending_committed
-> optional ending_committed/terminal resolver scenes
-> completeEnding
-> one RunResult
-> one transaction proof in Meta
-> status ended
-> newLife
```

A committed run cannot start ordinary Work/School/Activity/Night.

## RunResult

Persist:
- resultId;
- endingId;
- transactionId;
- completedAtDay;
- firstCompletion;
- appliedMetaRewardIds.

Transaction identity is deterministic per run + ending.

## Meta proof

MetaState adds:
- `appliedResultTransactions[]`.

Rules:
- same transaction is applied at most once;
- repeated click/reload after completion is idempotent;
- same ending in a later run may complete the run but does not reapply its unique reward;
- `runsCompleted` increments once per unique completed RunResult transaction;
- `completedEndings` is a set/union.

Protected imported/current Meta merges transaction proofs by union.

## Target Meta rewards in A6

Support:
- `unlock`;
- `hardWork` for one of the 10 ordinary careers.

Legacy endings with no target metaRewards continue to map their existing `reward` ID to one unlock.

Hard Work is unique and cumulative.

Locked ordinary Hard Work career IDs for this package:
- lumber;
- satyr-maid;
- undead-farm;
- tavern;
- hunter;
- guard;
- merchant;
- artist-geisha;
- assassin;
- prostitute.

When all 10 exist in Meta:
- add `palace` unlock.

FreshSave derives the locked automatic Hard Work starting bonuses:
- Lumber +3 Strength/+3 Endurance
- Satyr Maid +3 Charm/+3 Grooming
- Undead Farm +3 Reason/+3 Magic
- Tavern +3 Sociability/+3 Manners
- Hunter +3 Dexterity/+3 Wits
- Guard +3 Endurance/+3 Manners
- Merchant +600 starting money
- Artist/Geisha +3 Creativity/+3 Grooming
- Assassin +3 Dexterity/+3 Wits
- Prostitute +3 Sexuality/+3 Charm

Repeated Hard Work never stacks.

## Resolver integration

Add `endingCommitted(ending)` reaction fact/trigger.

After commitment:
- normal/optional progression remains suppressed by existing resolver policy;
- only terminal / ending_committed classes may be selected.

## Save compatibility

Existing schema-v4 saves missing transaction ledger use default empty ledger.

Legacy v4 ended saves that already contain committed ending but no RunResult receive a deterministic compatibility RunResult and transaction proof without re-awarding Meta.

Schema3 migration creates equivalent compatibility proof for already-ended prototype runs.

## Required tests

- eligible ending does not end run;
- player can continue after eligibility;
- commit changes status to ending_committed but gives no reward;
- normal progression suppressed after commit;
- complete creates one RunResult and one reward;
- reload before completion gives reward once;
- reload after completion cannot duplicate reward/runsCompleted;
- same ending in a later run does not reapply unique reward;
- newLife preserves Meta and resets Run domains;
- legacy accept shortcut still satisfies existing tests;
- Hard Work reward visibly changes next fresh run;
- duplicate Hard Work does not stack;
- all 10 Hard Work entries unlock Palace;
- Merchant Hard Work adds exactly 600 starting money;
- protected Meta merge unions transaction proof;
- legacy ended v4 compatibility does not re-award reward.

## Acceptance

Real runner:
`npm run check` pass.

After A6 green:
run Architecture Migration Slice gate before Phase B shell.
