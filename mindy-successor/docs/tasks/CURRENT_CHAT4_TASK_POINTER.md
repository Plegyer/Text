# CURRENT CHAT4 TASK POINTER

Status: **ACTIVE — SECRET DEBT v12 FOCUSED TYPECHECK REPAIR**
Owner: Chat 4

Producer branch:
`chat4/secret-debt-full-route-producer-v12`

Current producer candidate:
`19681ae11adbb7544fdaeff63be26298a412ec95`

Exact-head verification branch:
`chat4/secret-debt-full-route-producer-v12-focused-check`

Verification PR:
#280

Latest exact-head verification:
run `37130567889` — **FAILURE**

## Exact failure

Production logic is not the current blocker.

Typecheck fails only in:
`tests/secret-debt-full-route-v12.test.ts`

Errors:
- line 478: parameter `event` implicitly has `any`;
- line 479: parameter `choice` implicitly has `any`;
- line 480: parameter `effect` implicitly has `any`.

Because typecheck failed first, validate/build/focused tests were skipped.

## Repair

On producer branch only:
- add exact safe typings for those callback parameters;
- do not change runtime behavior;
- do not alter D19/D30/D32/D44 semantics;
- do not loosen tsconfig;
- do not use `any` just to silence the compiler if the existing schema/types can express the shape.

Then rebuild/update the focused-check branch from the repaired producer head and rerun:
- typecheck;
- validate;
- build;
- Secret Debt focused regressions.

No full CI.

If green:
1. create
   `mindy-successor/docs/tasks/CHAT4_SECRET_DEBT_FULL_ROUTE_PRODUCER_v12.md`;
2. document exact production files, migrations/save behavior, Strong Meta seams and QA;
3. freeze exact producer SHA;
4. report
   `READY_FOR_CHAT2_ASSEMBLY`.

Do not merge main.
