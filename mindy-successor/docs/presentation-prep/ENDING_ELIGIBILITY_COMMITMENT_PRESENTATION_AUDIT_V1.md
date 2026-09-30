# Ending Eligibility and Commitment Presentation Audit v1

Status: C2-51 COMPLETE
Owner: Chat 2 / Presentation & Media
Baseline main: `5f2685f1fde6b4718483febd6f49108eaa4ac873`

## Scope

This audit covers how the current UI presents three existing ending states:
- eligibility before selection;
- committed/selected ending state;
- completed-run ending state.

It does not change ending conditions, rewards, commitment rules, RunResult semantics, Save state, event delivery, or completion mechanics.

## Eligibility presentation

The current `Судьбы / Fates` panel renders every current ending with:
- localized title;
- localized description;
- condition checklist;
- a disabled or enabled acceptance control.

The acceptance control is enabled only when the existing engine state exposes the ending through `run.availableEndings` and its conditions still evaluate true.

This makes ineligible versus eligible endings mechanically distinct without changing eligibility rules.

## Commitment presentation

The engine has a distinct `ending_committed` state and stores the exact selected ending in `run.endings.committed`.

The presentation layer can therefore identify a committed ending by existing state alone. No new ending identity is required.

Current UI limitation:
- the generic non-active central screen distinguishes `ended` from all other non-active states;
- an `ending_committed` state that remains after a final reaction scene can fall through to the generic non-ended title used for expiry;
- that is a presentation-state ambiguity, not an ending-mechanics ambiguity.

C2-51 records the gap but does not alter the completion flow.

## Completed-run presentation

The engine stores completed-run identity in:
- `run.status === "ended"`;
- `run.endings.result.endingId`;
- `run.endings.result.resultId`;
- `run.endings.result.transactionId`.

The current central result screen uses the accepted ending semantic presentation ID when available and shows the localized completed-state title.

Completed state is therefore distinguishable from ordinary active eligibility.

## Semantic ending presentation

All current ending presentation slots use existing identities derived by `presentationIdForEnding`.

C2-52 may add missing exact static/accessibility coverage only for these current semantic IDs. It must not create a presentation ID for an ending state that does not exist in gameplay.

## Audit result

- eligibility versus ineligibility: **mechanically and visually distinct**;
- committed state identity: **available in current Save/runtime state**;
- committed-state central-screen title: **presentation ambiguity documented**;
- completed-run state: **distinct and identity-backed**;
- new ending gameplay identities required: **0**.
