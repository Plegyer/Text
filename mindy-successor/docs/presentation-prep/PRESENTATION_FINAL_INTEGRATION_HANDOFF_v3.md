# Presentation Final Integration Handoff v3

Current main: `7acbce7f8bdf911ce8ab3ed1a4b3e5e0902cd798`.

Scope required by this task: **Chat 2 items 1–29**.

Machine-readable partition:

`prior-work/astra/prototype-m3.2/content/presentation-final-integration-handoff.fixture.json`

The manifest classifies exactly **55 scoped artifacts**, each exactly once.

## MUST_INTEGRATE

Minimal current-main-compatible regression surface:

- semantic ID drift guard;
- PA presentation checkpoint matrix;
- fallback exhaustion adversarial suite;
- media-path security;
- deterministic replacement ordering;
- accessibility metadata contract/audit;
- central-stage interaction contract;
- PR21-aligned shipped fallback asset integrity;
- replacement-vs-shipped-catalog conflict matrix;
- post-PR21 presentation smoke;
- save/reload adversarial presentation matrix.

These files provide direct regression value without modifying shared runtime/UI/catalog.

## QA_ONLY

Keep as audit/coordination evidence rather than additional runtime dependencies:

- shipped-main delta map;
- PA closure dependency audit;
- handoff deduplication proof;
- current-main drift audit;
- PA00–PA26 presentation row ledger.

These documents/fixtures explain status and prevent presentation evidence from overstating OPEN gameplay rows.

## FUTURE_ASSET_WORK

Optional media replacement productization:

- replacement-bundle fixture/test;
- drop-in replacement regression fixture/test;
- override import/export contract/test;
- replacement bundle migration contract/test;
- Future GIF Drop-In Package v1.

Current static-backed presentation does not depend on these files.

## BLOCKED_BY_AUTHORING

Empty for items 1–29.

The remaining full-PA blockers are gameplay/content authoring gaps, but no scoped Chat 2 presentation artifact must wait before integration.

Presentation must not upgrade those gameplay rows to PASS.

## SUPERSEDED

Do not integrate overlapping historical layers alongside their newer replacements:

- shipped closure inventory -> replaced by PR21/main-aware asset and delta evidence;
- pre-activation asset consistency -> replaced by shipped fallback asset integrity;
- broad PA scenario -> replaced by PA checkpoints + post-PR21 smoke;
- pre-PR21 production smoke -> replaced by post-PR21 smoke;
- screen fallback policy -> covered more strongly by fallback exhaustion + central-stage + asset integrity;
- release readiness v1 -> superseded by later closure/readiness work;
- integration handoff v1 -> superseded;
- release candidate handoff v2 -> superseded by this v3 partition.

## Minimal integration recommendation

Integrate only the `MUST_INTEGRATE` class as the executable/contract baseline.

Retain `QA_ONLY` where useful for audit.

Defer `FUTURE_ASSET_WORK` until optional GIF/replacement workflow productization.

Do not merge `SUPERSEDED` artifacts merely for completeness; doing so recreates duplicate assertions and stale assumptions.

## Shared runtime recommendation

None.

Current main already ships semantic slash persistence, pending-scene semantic identity, School/Activity slots, and static-backed target media.

Any future shared-runtime change should be driven by a newly demonstrated current-main failure, not by historical branch drift.

## Items 30–35

Items 30–35 exist on the branch but are outside this task's explicit `items 1–29` partition and are therefore not counted in the 55-file manifest. They remain available as later readiness/RC/operator/future-option evidence.
