# C2-115 — Ending presentation-state coverage

Status: COMPLETE
Owner: Chat 2 / Presentation & Media

The existing ending state machine is now surfaced distinctly in presentation:

- `eligible` — fate card is visibly marked available;
- `committed` — fate card and non-active central screen identify the chosen ending;
- `completed` — the current run result is visibly marked completed;
- locked/unavailable remains distinguishable from those states.

The presentation reads only existing `run.endings.eligible`, `run.endings.committed`, `run.endings.result` and run status. Button enablement, commit/complete transitions, conditions and rewards remain unchanged in the engine.
