# Chat 2 — Strong Meta current-main preflight v1

Status: **ACTIVE — DOCS-ONLY PREFLIGHT**
Owner: Chat 2

Branch:
`chat2/preflight-strong-meta-current-main-20261003-v1`

Base:
`528c6b225f5c2e1e8389577218dbad6048e32af0`

Frozen producer candidate:
`chat4/strong-meta-runtime-producer-v7@6c3865aec1283055ab0713ca4b2873d379f3ddc6`

Goal: prepare the exact reconstruction/assembly ledger for integrating the frozen strong-Meta runtime candidate onto fresh post-D31 main.

Do not change production.
Do not run full CI.
Do not merge main.

Required analysis:

1. Identify the exact dependency base / first producer commit for the frozen candidate.
2. Enumerate every producer production file and classify schema/state, runtime/engine, catalog/registry, save/migration, snapshot/loadout, tests/fixtures/docs.
3. Compare each production file against current main at `528c6b225f...`.
4. Identify semantic collisions with current integrated authority:
   - D21-D24 shared Hard Work Meta;
   - New Start+ UI;
   - Palace D23 run-local invitation;
   - D31 seasonal map;
   - D35-D43 where runtime shape matters.
5. Preserve:
   - no permanent Palace unlock;
   - no `ensurePalaceUnlock(s.meta)`;
   - ordinary Hard Work packages outside Specialist capacity;
   - D28 exact capacity 0..1 Keystone + 0..2 Specialists;
   - cap-200 consumes one normal Specialist slot;
   - current-run resolved loadout snapshot;
   - later catalog changes do not rewrite current-run loadout;
   - Secret Debt bound Energy -1 remains a real one-Energy loss after selected modifiers;
   - no housing/safety Meta cancels forced Debt Night;
   - no access Meta substitutes D23.
6. Identify stale test expectations from D31 and later Product/runtime changes.
7. Define exact focused suite required before one full CI.
8. Recommend safe assembly strategy. Do not copy old-base engine/schema files wholesale.

Deliverable:
`mindy-successor/docs/tasks/CHAT2_STRONG_META_CURRENT_MAIN_PREFLIGHT_RESULT_v1.md`

Include frozen head, dependency base, exact delta, collision matrix, manual-merge files, focused QA list, assembly order, blockers.

End with:
`READY_FOR_CURRENT_MAIN_ASSEMBLY`
or
`BLOCKED_FOR_LEADER_DECISION`.

No production code.
No full CI.
