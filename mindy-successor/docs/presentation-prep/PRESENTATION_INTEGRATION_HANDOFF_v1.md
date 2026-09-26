# Presentation Integration Handoff v1

Status: deduplicated Lead handoff for `chat2/presentation-replacement-next`, aligned to Product Activation main baseline `9b427d75dc22021cd3373aa7dd3521782e54152d`.

Machine-readable source: `prior-work/astra/prototype-m3.2/content/presentation-integration-handoff.fixture.json`.

## Current runtime conclusion

There is **no currently demonstrated shared-runtime blocker requiring a Chat 2 runtime change**.

The historical semantic save-boundary issue is resolved on shipped main by Product Activation PR #20:

- slash semantic `presentationId` is accepted in persistence;
- pending event scenes are assigned semantic IDs;
- School and Activity semantic slots are shipped.

Accordingly, this handoff does not recommend reopening shared schema/runtime ownership.

## Handoff categories

### MUST_INTEGRATE

These are the highest-value, non-duplicative contracts/tests for Lead integration:

- accessibility metadata contract/test;
- override import/export contract/test;
- replacement-bundle migration contract/test;
- asset consistency manifest/test;
- fallback exhaustion fixture/test;
- PA checkpoint fixture/test;
- production smoke fixture/test;
- screen fallback policy fixture/test;
- media-path security preflight;
- deterministic replacement ordering;
- semantic ID drift detector;
- release-readiness executable gate.

They cover identity stability, safe fallback, portability/security, PA checkpoint semantics, accessibility, and current asset integrity without modifying gameplay.

### KEEP_AS_QA_EVIDENCE

Keep these as audit/context evidence rather than mandatory executable integration:

- `PRESENTATION_RELEASE_READINESS_v1.md`;
- `PRESENTATION_SHIPPED_MAIN_DELTA_MAP_v1.md`;
- `presentation-shipped-main-delta.fixture.json`.

They document why pre-activation blockers should not be carried forward as current defects and map presentation slots to PA relevance.

### REDUNDANT / SUPERSEDED

The earlier PA scenario matrix is superseded for integration by the finer-grained PA checkpoint matrix plus production smoke.

The earlier shipped closure inventory is superseded by the shipped-main delta map plus asset-consistency manifest.

These files remain valid historical worker evidence but integrating both layers would duplicate assertions and maintenance burden.

### FUTURE_ASSET_ONLY

The replacement bundle/regression fixture pair is retained for the future GIF replacement workflow:

- portable replacement bundle fixture/test;
- drop-in replacement regression fixture/test.

They are not required to ship the currently static-backed presentation layer. They become valuable when the seven planned future GIF assets or a replacement import workflow are activated.

## Deduplication rule

Each branch artifact appears in exactly one handoff category in the machine-readable manifest. The coordination TASK file itself is not a product artifact and is intentionally excluded.

## Lead integration order

For the smallest useful integration surface:

1. semantic drift + media-path + replacement ordering safety tests;
2. asset consistency + fallback policy/exhaustion;
3. PA checkpoint + production smoke;
4. import/export and migration contracts/tests;
5. accessibility contract/test;
6. release-readiness executable gate.

QA evidence docs can be retained without becoming build dependencies. Future-asset-only fixtures can wait until replacement assets/workflows are scheduled.

## Shared runtime recommendation

None.

If a new integrated failure demonstrates a concrete blocker, fix only that blocker with current main evidence. Do not reapply the historical pre-PR20 save-boundary diagnosis to shipped main.
