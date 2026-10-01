# Chat 2 Presentation & Media Queue v10

Status: NEXT ASSIGNED
Owner: Chat 2 / Presentation & Media Worker
Queue depth: 12
Begin after C2-96 completion/freeze. Start from then-current main.

## Queue

### C2-97 — presentation reachability audit
Audit active presentation bindings against current main. Classify player-facing, consumer-ready, preparation-only and obsolete entries.

### C2-98 — semantic ID collision audit v10
Verify presentation IDs, registries and manifests remain unique and owned by Presentation.

### C2-99 — accessibility metadata parity v10
Extend RU/EN presentation accessibility validation using existing semantic identities only.

### C2-100 — fallback chain validation v10
Audit static/animation/media fallbacks without changing gameplay state.

### C2-101 — current ending presentation coverage audit
Verify existing ending presentation consumers and identify missing presentation-only coverage.

### C2-102 — Forest presentation handoff audit
Prepare presentation-side checks for existing Forest identities only.

### C2-103 — poverty presentation handoff audit
Prepare presentation-side checks for existing poverty identities only.

### C2-104 — School presentation handoff audit
Prepare presentation-only metadata and parity checks for existing School identities.

### C2-105 — stale prepared binding audit
Find prepared-only bindings that are not active consumers.

### C2-106 — replacement regression coverage
Add focused presentation replacement regression coverage.

### C2-107 — ownership boundary regression
Verify no gameplay mechanics, Save/RNG or progression ownership is claimed.

### C2-108 — presentation candidate freeze
Open one focused candidate PR with exact green CI.

Technical evidence stays in Git. Personal chat output only:
- `Задание выполнено`
- `Задания выполнены`

Do not self-assign beyond C2-108.
