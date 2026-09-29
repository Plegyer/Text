# Chat 1 Developer Queue v4

Status: ASSIGNED
Owner: Chat 1 Developer / Integration Developer
Queue depth: 12
Start from current main. C1D-01..24 are historical/completed or superseded.

## Queue

### C1D-25 — Starter-trio runtime gap audit
Verify current Day-1 engine and Work-panel availability. Locked start careers are only Lumber, Satyr Maid and Undead Farm.

### C1D-26 — Starter-trio command gate
Implement a narrow central guard so non-starter ordinary career shifts with no approved unlock conditions are not executable on a fresh run. Do not invent stat thresholds or year fallbacks.

### C1D-27 — Starter-trio UI gate
Make Work UI reflect the same availability contract as engine command execution. No duplicate unlock logic.

### C1D-28 — Starter-trio regression
Add focused tests proving only the three starter careers are executable on Day 1 and the three starter shifts still work.

### C1D-29 — Late-career unlock seam
Prepare the existing action/condition path so later ordinary careers can become available once approved stat/calendar conditions are authored. Do not choose those thresholds.

### C1D-30 — Consume repaired Chat 5 School candidate
After PR #85 is green and QA-accepted, selectively integrate only approved School→career handoff/runtime seams. No new curriculum or thresholds.

### C1D-31 — Consume repaired Chat 3 Forest candidate
After PR #82 is green and QA-accepted, selectively integrate approved Forest/Lumber hooks and content consumers only.

### C1D-32 — Consume Chat 2 presentation candidate
After PR #79 is QA-accepted, integrate only presentation registry/media bindings required by the current runtime slice.

### C1D-33 — Satyr Maid integration inventory
Map current Satyr Maid production state, transitions, events, endings and missing runtime seams. Do not author content owned by Chat 3/5/2.

### C1D-34 — Undead Farm integration inventory
Map current Undead Farm production state, transitions, events, endings and missing runtime seams. Do not invent progression thresholds.

### C1D-35 — Current-main starter-career integration candidate
Create one focused branch combining only approved starter-trio availability changes and already QA-approved worker handoffs. Run full repository check.

### C1D-36 — Integration handoff
Freeze one exact candidate head for QA with all technical evidence in Git and explicit unresolved product decisions.

Personal chat output only:
- `Задание выполнено`
- `Задания выполнены`

Do not self-assign beyond C1D-36.
