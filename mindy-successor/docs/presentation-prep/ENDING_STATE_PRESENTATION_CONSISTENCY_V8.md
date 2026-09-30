# Ending State Presentation Consistency v8

Status: C2-78 COMPLETE
Owner: Chat 2 / Presentation & Media

C2-78 audits existing ending UI states without changing ending rules.

## Eligible

An ending that is already present in `run.endings.eligible` remains an enabled Fate action while the run is active. Eligibility logic is unchanged.

## Selected / committed

Current gameplay exposes the distinct `ending_committed` state and exact `run.endings.committed` ID.

The previous central renderer grouped every non-active, non-ended state under the time-expired title. C2-78 fixes that presentation ambiguity only:
- `ending_committed` now uses localized `ui.run.endingCommitted`;
- the central media resolves from the existing committed ending ID;
- no condition, reward or completion behavior is touched.

## Completed

`ended` continues to use the existing completed-state title and the exact ending presentation ID from current result/commit state.

## Invariant

Eligible, committed and completed presentation states now remain distinct while consuming the same existing ending IDs and engine transitions.
