# Chat 4 QA Queue v12

Status: **ACTIVE ASSIGNED**
Owner: Chat 4 / QA + Product Acceptance Gate
Queue depth: 12

Goal: clear frozen/open PR backlog and restore trustworthy current-main evidence. Do not implement fixes.

### C4-114
Gate PR #124 against current main: useful delta vs selective-source/superseded vs stale.
### C4-115
Gate PR #132.
### C4-116
Gate PR #134.
### C4-117
Gate PR #136.
### C4-118
Gate PR #138.
### C4-119
Gate PR #139 carefully because it changes `engine.ts` / `app.ts`; verify whether main already contains equivalent behavior.
### C4-120
Gate PR #140.
### C4-121
Gate PR #142.
### C4-122
Gate PR #143 and exact-head CI.
### C4-123
Run/read exact current-main full check and create one QA-owned open-PR collision/disposition ledger.
### C4-124
Gate the next fresh worker candidate: Chat 1 v9 first if frozen, otherwise first frozen C2/C3/C5 v11 candidate.
### C4-125
Refresh executable acceptance truth: directly player-reachable vs test-accelerated vs still unimplemented.

Technical evidence stays in Git. Never treat fixture/prep content as shipped.
