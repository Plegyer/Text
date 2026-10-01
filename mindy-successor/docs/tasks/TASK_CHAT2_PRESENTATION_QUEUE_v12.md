# Chat 2 Presentation Queue v12 — Satyr Maid Complete Career Presentation

Status: **PREASSIGNED / START ON STACKED BRANCH NOW**
Owner: Chat 2 / Presentation & Media Worker
Queue: C2-121..132
Base for new stacked branch: frozen PR #151 exact head `463d877009b5ecc1d255d7aa27a91bb7c38016e5`

Do **not** mutate PR #151. Create a new branch, e.g. `chat2/satyr-maid-presentation-v12`.

Read Chat 1's C1D-97 Satyr runtime contract from `chat1/satyr-maid-complete-v10` as soon as it appears. Consume gameplay IDs; do not author mechanics.

### C2-121 — stacked-branch reset
Freeze PR #151 untouched and create the new branch.

### C2-122 — Satyr career stage presentation
Add stable presentation slots/static fallbacks for every Satyr career milestone/stage in the C1D-97 contract.

### C2-123 — repeatable shift pools
Provide 3–5 candidate-capable presentation pools for the new Satyr work variants where project-owned assets exist; otherwise preserve complete static fallback.
No fake asset references.

### C2-124 — recurring guest chain
Provide RU/EN title/body/alt/caption coverage for the recurring-guest work/reactive/Night chain.

### C2-125 — Night presentation
Cover voluntary Night invitation, refusal, accepted meeting, external request and return-to-work states with keyboard/focus-safe UI.

### C2-126 — School-hook presentation
Cover the Satyr School-triggered reactive career scene using the gameplay identity from Chat 1. Presentation only.

### C2-127 — crisis presentation
Cover staffing/supply/customer crisis states and result feedback without exposing hidden mechanical values.

### C2-128 — House Power ending
Complete eligible/committed/completed RU/EN presentation for `ending.satyr-maid.house-power`, with static fallback and media candidate surface.

### C2-129 — Boundary Mastery ending
Same for `ending.satyr-maid.boundary-mastery`.

### C2-130 — accessibility and animation-off
Prove all Satyr career/relationship/Night/ending presentation remains usable with keyboard-only input, animations disabled, or missing GIF candidates.

### C2-131 — production reachability
Presentation tests must prove the new slots are reachable from production gameplay identities. Preparation manifests do not count as shipped consumers.

### C2-132 — candidate freeze
After Chat 1 IDs are stable and current main contains required gameplay identities, rebase/retarget if needed, run full repository CI, open/freeze one focused PR for Chat 4.

No progression, Save/RNG, wages, conditions/effects, career state, School mechanics or ending reward logic.
