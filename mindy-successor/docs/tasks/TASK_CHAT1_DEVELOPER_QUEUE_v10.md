# Chat 1 Developer Queue v10 — Satyr Maid Complete Career Runtime

Status: **PREASSIGNED / START ON STACKED BRANCH NOW**
Owner: Chat 1 Developer / Integration Developer
Queue: C1D-97..108
Base for new stacked branch: frozen PR #147 exact head `e9e1c4d5cdafcdf5e8571170cd9b699426536746`

Do **not** move or mutate PR #147. Create a new branch from the exact frozen head, e.g. `chat1/satyr-maid-complete-v10`.

Goal: turn Satyr Maid from a starter shell into the second complete career slice.

### C1D-97 — publish runtime contract first
Add one small machine-readable/markdown contract owned by Chat 1 that fixes the gameplay IDs consumed by Chats 2 and 5 for this slice:
- career stages/milestones;
- relationship identity;
- Night identities;
- School hook facts/conditions;
- complex ending IDs.
Base design authority: `CAREER_SATYR_MAID_DRAFT_v0.md` + `EXECUTABLE_TZ_v1.md`.
Do not invent a new NPC proper name; role identities are sufficient.

### C1D-98 — full typed career progression
Implement a real Satyr Maid typed progression from the existing first-shift state through at least six major milestones. Use the draft stage model:
- New Maid;
- Floor Rhythm;
- Known Face;
- late branches including House Power / Personal Network / Boundaries.
Progress must react to already-satisfied external gates without requiring a dummy extra shift.

### C1D-99 — repeatable work depth
Bring Satyr Maid to the career target of 8–16 repeatable shift variants with seasonal/context gating while preserving current wages/Energy contracts unless an existing authoritative doc says otherwise.
No coercive logic; tips/reputation may vary only through already-approved mechanics.

### C1D-100 — major relationship chain
Implement one typed recurring-guest relationship chain that crosses:
work -> free reactive scene -> voluntary Night -> external request/result -> career reaction.
Refusal must preserve the professional career path.

### C1D-101 — Night integration
Implement voluntary Satyr Maid Night scenes through existing NightFlow priority:
forced Night > scheduled/mandatory > voluntary.
No duplicate Night resolution, no save/reload reroll, no implicit next-day Energy penalty unless explicitly authored.

### C1D-102 — School cross-system hook
Use existing typed School track progress directly; do not add generic flags.
For this slice, a **minor career hook threshold of 3 completed lessons in a relevant live track** is approved as a Satyr-specific trigger, not a global certificate rule.
At least one School trigger must publish/enable a Satyr career scene immediately through resolver flow with 0 extra daytime Energy.

### C1D-103 — staffing/supply/customer crisis
Implement one real late-career crisis from the draft that can be solved by at least two different build/system approaches and that feeds House Power / Boundaries progression.
No unresolved global economy redesign.

### C1D-104 — House Power complex ending
Implement `ending.satyr-maid.house-power` as a non-terminal eligible ending with explicit commit/completion.
Use career reputation/progression + School/business-social competence + crisis resolution.
Complex reward baseline for this slice: **House Credit = +600 starting money** after completion, exactly once.

### C1D-105 — Boundary Mastery complex ending
Implement `ending.satyr-maid.boundary-mastery`.
It must be reachable through explicit boundary/refusal choices without requiring romance.
Meta rule: **Clear Terms** — selected future social/service conflicts may expose one extra refusal/negotiation option without relationship penalty. Implement only the narrow rule needed by current content; no universal immunity.

### C1D-106 — coexistence and ending lifecycle
Prove Hard Work, House Power and Boundary Mastery can become simultaneously eligible where their conditions are satisfied; eligibility must not terminate the run.
Explicit commit -> completion -> RunResult -> exactly-once Meta remains authoritative.

### C1D-107 — natural product acceptance
Add a clean-run acceptance path with no direct career-stage/counter injection:
- repeat real Satyr shifts;
- relationship/Night chain;
- School hook;
- crisis;
- Hard Work eligibility naturally at 50 shifts;
- at least one complex ending naturally eligible;
- save/reload in the middle;
- explicit commit/completion;
- New Run reward.

### C1D-108 — candidate freeze
Rebase/retarget onto the then-current main after PR #147 integration if necessary.
Require exact-head full repository CI green, open one focused PR, freeze exact head for Chat 4 QA.

Do not implement Undead Farm in this queue. Do not change Secret Debt or Palace career content.
