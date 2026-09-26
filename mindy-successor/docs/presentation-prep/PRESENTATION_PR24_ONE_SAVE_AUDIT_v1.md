# Presentation PR24 One-Save Audit v1

Source evidence: Lead release-candidate one-Save shipped E2E on `lead/release-candidate-smoke-v2`.

The shipped path is:

`Lumber -> career milestone -> Foreman -> paid School -> Night -> Foreman Night -> Forest logging-road -> Lumber return -> Hard Work -> New Run`.

## Presentation conclusion

Every currently visible boundary in that path already has a deterministic semantic presentation identity and a safe static fallback.

The one explicit 49-shift threshold accelerator used immediately before the final ordinary Lumber shift is **not presentation authoring**. It only avoids replaying a long gameplay threshold in the E2E. It creates no new semantic slot, media requirement, fallback rule, or presentation save field.

## Boundary ownership rules

- ordinary Lumber/School results: `lastAction` owns the visible result identity;
- reactive career/relationship/Night/Lumber-return scenes: `pendingScene` owns event/variant presentation state;
- active Forest traversal: Activity gameplay state owns the central route context;
- committed ending: ending state owns the semantic ending identity;
- completed ending: RunResult/terminal ending state owns the terminal presentation;
- New Run: fresh day/location context owns the central presentation.

Presentation never owns gameplay progression, costs, ending thresholds, or the 49-shift test accelerator.

## Save/reload

At each boundary, reload preserves the relevant gameplay owner and deterministic semantic `presentationId`.

No reload expectation depends on:

- GIF frame index;
- elapsed playback time;
- loop count;
- asset filename.

The Activity logging-road path remains on the currently shipped generic `activity/forest/route/default` semantic slot. Route-specific presentation specialization is optional future authoring.

## Animation-off

Every audited boundary remains understandable with animation disabled:

- Lumber/Foreman/Night -> shipped Lumber static media;
- School -> shipped School static media;
- Forest -> shipped Forest static media;
- endings/location -> town static fallback.

## Machine-readable boundary table

The companion test contains the exact 13-step presentation audit used by this document.
