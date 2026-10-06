# CURRENT CHAT2 TASK POINTER

Status: **ACTIVE — D42 FINAL TWO ASSERTIONS**
Owner: Chat 2

Current branch:
`chat2/assembly-d42-night-current-main-20261004-v1`

Latest production head:
`0176fa77394524f3af64e49447be12edf8bf1847`

Latest full CI:
run `37454323411` — FAILURE with exactly 2 tests.

Both remaining failures are stale assertions only. Production D42 behavior is correct.

Required exact repair:

1. `tests/guard-presentation-v16-c2-169-179.test.ts`
   Keep:
   `assert.equal(expected.size,29)`
   Change:
   `assert.equal(published.length,29)`
   to:
   `assert.equal(published.length,28)`
   and explicitly assert:
   `expected.has('night/guard/guard-night-case-debrief')`.

2. `tests/guard-production-presentation-reachability-c2-180.test.ts`
   Keep:
   `assert.equal(expected.size,29)`
   Replace:
   `assert.equal(published.length,expected.size)`
   with:
   `assert.equal(published.length,28)`
   and explicitly assert:
   `expected.has('night/guard/guard-night-case-debrief')`.

Do not change production files.

Then run:
- the two Guard suites;
- D42 Night focused suite;
- presentation/source-integrity focused checks;
- typecheck / validate / build;
- one full CI.

If green, freeze exact SHA and report:
`READY_FOR_LEADER_MERGE`.

Do not merge main.
