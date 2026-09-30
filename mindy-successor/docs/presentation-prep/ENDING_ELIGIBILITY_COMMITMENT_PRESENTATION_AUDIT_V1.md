# Ending Eligibility / Commitment Presentation Audit v1

Status: C2-51 COMPLETE
Owner: Chat 2 / Presentation & Media
Baseline main: `593f9936d72296557b36a0e0ca7d3c7bb780839c`

This audit does not alter ending eligibility, commitment, completion, rewards, Meta, Save, or dispatch behavior.

## Current presentation states

### Ineligible

The Fates panel renders every current ending with a condition checklist.

An unmet condition is shown with `○` and the acceptance control is disabled.

This is a visually distinct presentation state and does not require a new semantic presentation ID.

### Eligible

Satisfied conditions are shown with `✓`, and an eligible ending's acceptance control becomes enabled.

Eligibility alone does not end a run in the engine. The queue-v6 manifest records explicit RU/EN accessibility wording distinguishing “eligible” from “completed”.

### Committed

The engine has an explicit `ending_committed` run state and `run.endings.committed` identity.

Current central presentation has a gap: the generic non-active branch uses the completed heading only for `status === 'ended'`; any other non-active status receives the time-expired heading. Therefore a committed ending can be visually labelled as “time expired” rather than “ending committed”.

This is a presentation/UI integration gap. Chat 2 records it but does not change the shared UI/runtime seam.

The existing Fates-panel click consumer also uses the legacy `accept` compatibility command, which completes immediately instead of exposing the engine's separate commitment screen. Changing that flow is mechanics/UI integration ownership, not Chat 2 presentation work.

### Completed

An ended run uses:
- the current ending semantic identity via `presentationIdForEnding`;
- the accepted-ending media surface;
- the “ending accepted” completed-run heading;
- the recorded run journal/result state.

This state is visually distinct from active eligibility.

## Audit result

Presentation states audited: **4**.

States already visually distinct enough on current UI:
- ineligible;
- eligible;
- completed.

Known presentation gap:
- committed state heading is currently conflated with time-expired presentation.

New ending gameplay identities created: **0**.

Ending mechanics changed: **0**.

The queue-v6 manifest carries RU/EN state-description metadata so presentation tests can preserve semantic distinctions even while the shared UI gap remains delegated to the owning integration layer.
