# Active Team Ownership Matrix

Status: ACTIVE
Repository: `Plegyer/Text`
Owner: Chat 1 / Lead

This file prevents two implementation workers from owning the same production slice at the same time.

## Chat 1 / Lead

Owns:
- coordination and current-main truth;
- task pointers/role contracts;
- integration order/merge decisions;
- cross-chat ownership arbitration;
- CI/PR triage.

Lead does not duplicate worker implementation unless a blocker requires direct action.

## Chat 1 Developer

Active queue:
- **13–24**
- production integration of the four reviewed School residual accessibility localization corrections from merged PR #66.

May change:
- root School accessibility localization values;
- focused production regression.

Must not change:
- School media assets;
- teacher staging/canon;
- poverty/Forest content;
- unrelated runtime architecture.

## Chat 2

Active queue:
- **364–375**
- School authored/staging media-source preparation.

Owns:
- original SVG animation source frames;
- media-source manifests/validators;
- media accessibility source preparation.

Must not:
- activate staging IDs in production;
- select final teacher canon;
- edit School mechanics/text ownership;
- duplicate Developer localization integration.

## Chat 3

Active queue:
- **341–352**
- current-main refresh of ordinary-poverty depth/accessibility/lookup handoff.

Owns:
- ordinary poverty / Forest / Secret Debt content-side bundles when assigned;
- fixtures, audits, regression sources and selective handoffs.

Must not implement shared production runtime/UI wiring in this queue.

## Chat 4

Active queue:
- **13–24 QA**
- post-merge current-main acceptance of PR #64/#65/#66;
- next-wave ownership/collision preflight.

Owns QA/product acceptance only.
May not duplicate producer implementation unless Lead explicitly transfers a narrow blocker fix.

## Chat 5

Active queue:
- **205–216**
- School teacher authoring/readiness and staging localization/text.

Owns:
- teacher text/content proposals;
- RU/EN parity;
- authoring boundaries;
- staging localization fixture/regression.

Must not:
- edit media assets (Chat 2);
- promote teacher staging to production;
- patch root School residual accessibility keys (Chat 1 Developer);
- touch poverty/Forest/Secret Debt (Chat 3).

## Current delivered baseline

Merged into `main`:
- PR #64 — career animation source queue 352–363;
- PR #65 — Foreman semantic localization;
- PR #66 — School residual localization worker handoff.

PR #63 is closed/superseded and has no active ownership.

## Duplicate-work rule

Before starting a new queue or PR, every worker must read this matrix plus its current task pointer.

If two active implementation assignments appear to change the same production behavior/file set:
- stop the newer assignment;
- report the overlap to Lead;
- do not resolve ownership independently.

QA review by Chat 4 is expected and is not duplicate implementation.
Text authoring by Chat 5 and media-source preparation by Chat 2 may reference the same School staging identity, but they must not modify each other's owned files or activate production semantics.
