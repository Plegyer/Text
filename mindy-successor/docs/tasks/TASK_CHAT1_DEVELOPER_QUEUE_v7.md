# Chat 1 Developer Queue v7

Status: NEXT ASSIGNED
Owner: Chat 1 Developer / Integration Developer
Queue depth: 12
Begin automatically after C1D-60 is completed/frozen. Start from then-current main.

## Queue

### C1D-61 — Post-v6 integration inventory
Inventory which queue-v6 runtime/UI/integration changes are already merged into current main and which remain worker-only. Do not duplicate merged artifacts.

### C1D-62 — Central availability-reason helper
Audit and, if safe, centralize player-facing unavailable-action reasons from existing authored conditions/resources/flow state. Do not add career thresholds or duplicate eligibility logic.

### C1D-63 — Work-panel locked-career reason consumer
Use the same central availability result in Work UI so authored late-career conditions can explain why a career is unavailable. Preserve starter-trio lock and do not choose missing thresholds.

### C1D-64 — Derived availability Save/reload regression
Prove ordinary-career availability remains derived from current state/conditions across Save/reload with no redundant authoritative `jobUnlocked` state.

### C1D-65 — Generic School after-lesson reactive audit
Audit the existing safe generic `actionCompleted: school` seam for already-authored generic post-lesson text. Do not infer exact paid-course identity from stat deltas.

### C1D-66 — Generic School after-lesson consumer
If C1D-65 confirms a safe existing seam, wire only QA-accepted generic after-School content through it. Exact-course/teacher routing remains separate.

### C1D-67 — Exact Night-study reaction consumer
Use existing exact Night-study choice identity to consume QA-accepted exact-choice School text without adding curriculum, thresholds, Save fields or new NightFlow mechanics.

### C1D-68 — Presentation prepared-override integration audit
Audit QA-accepted Chat 2 prepared presentation overrides against current registry and identify which can be activated by presentation-registry changes only.

### C1D-69 — Approved presentation override activation
Activate only QA-accepted presentation overrides whose gameplay semantic IDs already exist. No gameplay/state edits.

### C1D-70 — Forest exact-route/result content consumer audit
Audit QA-accepted Forest depth against existing route/result identities and select only content that can be consumed without new Activity state/effects.

### C1D-71 — Ordinary-poverty exact-event/variant consumer audit
Audit QA-accepted poverty depth against existing event/variant identities and select only content that preserves production effects and Secret Debt separation.

### C1D-72 — Current-main integration candidate
Freeze one focused candidate PR containing only approved queue-v7 runtime/UI/integration changes, with exact green repository CI and explicit unresolved Product blockers.

Technical evidence stays in Git. Personal chat output only:
- `Задание выполнено`
- `Задания выполнены`

Do not self-assign beyond C1D-72.
