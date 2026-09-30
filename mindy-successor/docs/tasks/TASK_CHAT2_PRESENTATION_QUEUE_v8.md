# Chat 2 Presentation & Media Queue v8

Status: NEXT ASSIGNED
Owner: Chat 2 / Presentation & Media Worker
Queue depth: 12
Begin automatically after C2-72 is completed/frozen. Start from then-current main.

## Queue

### C2-73 — Active presentation reachability audit
Audit which queue-v7 bindings are actually reachable through current gameplay semantic IDs versus merely prepared. Presentation evidence only.

### C2-74 — Animation-off coverage v3
Verify endings, Forest, poverty, School and Work presentation remains complete with animation disabled.

### C2-75 — Missing-media deterministic fallback
Strengthen presentation-only fallback coverage when optional dynamic/static media is absent. No gameplay branching.

### C2-76 — Replacement persistence regression
Verify editor/replacement choices survive normal UI refresh/locale changes without modifying Save gameplay identity.

### C2-77 — Locked Work keyboard/focus accessibility
Audit and refine keyboard/focus/aria behavior for current locked-career controls using the existing availability contract only.

### C2-78 — Ending state presentation consistency
Audit eligible, selected/committed and completed ending presentation states for current ending IDs. Do not alter ending rules.

### C2-79 — School course/teacher presentation alignment
Re-audit the eight current courses and eight teacher media surfaces after School v7 content work.

### C2-80 — Project-owned media provenance audit
Verify every active queue-v8 production source is project-owned, present and referenced by a live semantic ID.

### C2-81 — RU/EN alt-caption parity v3
Validate non-empty RU/EN alt/caption coverage for active and fallback queue-v8 presentation surfaces.

### C2-82 — Dead asset/source manifest audit v3
Detect dead files, stale source-manifest rows and active registry entries that resolve to missing sources.

### C2-83 — Cross-domain presentation regression v3
Add focused presentation-only regressions across Work, endings, School, Forest and ordinary poverty.

### C2-84 — Presentation hardening candidate
Open one focused frozen candidate PR for C2-73..83 with exact green repository CI and no gameplay/state changes.

Technical evidence stays in Git. Personal chat output only:
- `Задание выполнено`
- `Задания выполнены`

Do not self-assign beyond C2-84.
