# CURRENT CHAT3 TASK POINTER

Status: **HUNTER CONTENT v16 FROZEN + GUARD CONTENT v17 ACTIVE PREP**
Owner: Chat 3 / World + Career Content Bundles

Frozen Hunter authored candidate:
- PR #209
- branch `chat3/hunter-live-authored-v16`
- exact head `7e51a0c28037cbfbb9dc00c4c438e32248ec45bf`
- exact-head CI #794 / id `36869428605`: **SUCCESS**
- validator: 37 packs / 136 events / 39 actions / 20 endings
- tests: 693/693 pass
- status: CANDIDATE_FROZEN / QA READY
- do not move it.

Active next queue:
- `TASK_CHAT3_CONTENT_QUEUE_v17.md`
- C3-181..192
- target: **Guard Live Authored Content**
- working branch: `chat3/guard-live-authored-v17`

Dependency rule:
- Guard runtime PR #208 is still draft/mutable.
- Contract-independent inventory, RU/EN prose, role-only relationship copy and qualitative route/crisis copy may proceed now.
- Final live binding and C3-192 freeze must be rebuilt/audited on one exact frozen green Guard runtime head.
- Use `GUARD_RUNTIME_CONTRACT_v1.json` only as current authority; re-query at final freeze.

Do not wait for Hunter QA/integration.
Do not alter frozen PR #209.
