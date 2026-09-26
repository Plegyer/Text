# Lumber Release-Candidate Handoff v2

Status: post-PR21 Chat 3 release-candidate handoff.

Production activation merge: `9b427d75dc22021cd3373aa7dd3521782e54152d`.
Product Acceptance evidence merge: `e6c32903516d1ba40b9a3ffbf955d5f04783ac25`.

Gate state: production runtime/integration GREEN; full Product Acceptance PARTIAL.

Machine-readable manifest:
`prior-work/astra/prototype-m3.2/content/lumber-release-candidate-handoff.fixture.json`

Every tracked Chat 3 Lumber artifact is assigned to exactly one class. Legacy `ds-lumber` baseline files remain explicitly excluded.

## READY_TO_INTEGRATE_NOW

These are the current closure/runtime-contract artifacts that can be integrated without making unresolved Product decisions.
- `mindy-successor/docs/lumber-prep/LUMBER_PA_CLOSURE_DEPENDENCY_AUDIT_v1.md`
- `mindy-successor/prior-work/astra/prototype-m3.2/tests/lumber-pa-closure-dependency.test.ts`
- `mindy-successor/prior-work/astra/prototype-m3.2/content/lumber-forest-capability-options.fixture.json`
- `mindy-successor/prior-work/astra/prototype-m3.2/tests/lumber-forest-capability-options.test.ts`
- `mindy-successor/prior-work/astra/prototype-m3.2/content/lumber-item-use-exactly-once.fixture.json`
- `mindy-successor/prior-work/astra/prototype-m3.2/tests/lumber-item-use-exactly-once.test.ts`
- `mindy-successor/docs/lumber-prep/LUMBER_PA_CLOSURE_ROW_MAP_v1.md`
- `mindy-successor/docs/lumber-prep/LUMBER_RELEASE_CANDIDATE_HANDOFF_v2.md`
- `mindy-successor/prior-work/astra/prototype-m3.2/content/lumber-release-candidate-handoff.fixture.json`

### Smallest Lead integration subset

The minimum useful Lead subset is:
- `mindy-successor/docs/lumber-prep/LUMBER_PA_CLOSURE_DEPENDENCY_AUDIT_v1.md`
- `mindy-successor/prior-work/astra/prototype-m3.2/tests/lumber-pa-closure-dependency.test.ts`
- `mindy-successor/prior-work/astra/prototype-m3.2/content/lumber-forest-capability-options.fixture.json`
- `mindy-successor/prior-work/astra/prototype-m3.2/tests/lumber-forest-capability-options.test.ts`
- `mindy-successor/prior-work/astra/prototype-m3.2/content/lumber-item-use-exactly-once.fixture.json`
- `mindy-successor/prior-work/astra/prototype-m3.2/tests/lumber-item-use-exactly-once.test.ts`
- `mindy-successor/docs/lumber-prep/LUMBER_PA_CLOSURE_ROW_MAP_v1.md`

This subset supplies the post-PR21 closure classification, capability-option contract, exactly-once item-use contract, and final closure row map. The handoff doc/fixture itself is navigational metadata and is not required to implement the seam.

## QA_EVIDENCE_ONLY

Keep these as regression/history evidence; several production sources are already on main and must not be re-integrated as a second activation.
- `mindy-successor/prior-work/astra/prototype-m3.2/content/lumber-cross-system-reload-chronology.fixture.json`
- `mindy-successor/prior-work/astra/prototype-m3.2/tests/lumber-cross-system-reload-chronology.test.ts`
- `mindy-successor/prior-work/astra/prototype-m3.2/content/lumber-ending-identity.fixture.json`
- `mindy-successor/prior-work/astra/prototype-m3.2/tests/lumber-ending-identity.test.ts`
- `mindy-successor/prior-work/astra/prototype-m3.2/content/lumber-foreman-night-matrix.fixture.json`
- `mindy-successor/prior-work/astra/prototype-m3.2/tests/lumber-foreman-night-matrix.test.ts`
- `mindy-successor/prior-work/astra/prototype-m3.2/content/lumber-pa-shipped-row-evidence.fixture.json`
- `mindy-successor/prior-work/astra/prototype-m3.2/tests/lumber-pa-shipped-row-evidence.test.ts`
- `mindy-successor/prior-work/astra/prototype-m3.2/content/lumber-production-media-parity.fixture.json`
- `mindy-successor/prior-work/astra/prototype-m3.2/tests/lumber-production-media-parity.test.ts`
- `mindy-successor/prior-work/astra/prototype-m3.2/content/lumber-production-ui-contract.fixture.json`
- `mindy-successor/prior-work/astra/prototype-m3.2/tests/lumber-production-ui-contract.test.ts`
- `mindy-successor/prior-work/astra/prototype-m3.2/content/lumber-schema4-legacy-save.fixture.json`
- `mindy-successor/prior-work/astra/prototype-m3.2/tests/lumber-schema4-legacy-save.test.ts`
- `mindy-successor/prior-work/astra/prototype-m3.2/content/lumber-shipped-pack-parity.fixture.json`
- `mindy-successor/prior-work/astra/prototype-m3.2/tests/lumber-shipped-pack-parity.test.ts`
- `mindy-successor/docs/lumber-prep/LUMBER_CROSS_SYSTEM_HOOKS_v1.md`
- `mindy-successor/docs/lumber-prep/LUMBER_FOREMAN_RELATIONSHIP_MAP_v1.md`
- `mindy-successor/docs/lumber-prep/LUMBER_LEGACY_TARGET_COEXISTENCE_AUDIT_v1.md`
- `mindy-successor/docs/lumber-prep/LUMBER_PRESENTATION_SLOT_CATALOG_v1.md`
- `mindy-successor/docs/lumber-prep/LUMBER_REPEATABLE_SHIFT_SET_v1.md`
- `mindy-successor/docs/lumber-prep/LUMBER_TYPED_PROGRESSION_MAP_v1.md`
- `mindy-successor/prior-work/astra/prototype-m3.2/content/lumber-ending-independence.fixture.json`
- `mindy-successor/prior-work/astra/prototype-m3.2/content/lumber-item-capabilities.fixture.json`
- `mindy-successor/prior-work/astra/prototype-m3.2/content/lumber-target-definitions.fixture.json`
- `mindy-successor/prior-work/astra/prototype-m3.2/content/packs/lumber-target/lumber-cross-system.pack.json`
- `mindy-successor/prior-work/astra/prototype-m3.2/content/packs/lumber-target/lumber-night-acceptance.pack.json`
- `mindy-successor/prior-work/astra/prototype-m3.2/content/packs/lumber-target/lumber-production.pack.json`
- `mindy-successor/prior-work/astra/prototype-m3.2/tests/lumber-ending-independence.test.ts`
- `mindy-successor/prior-work/astra/prototype-m3.2/tests/lumber-forest-acceptance-depth.test.ts`
- `mindy-successor/prior-work/astra/prototype-m3.2/tests/lumber-legacy-target-coexistence.test.ts`
- `mindy-successor/prior-work/astra/prototype-m3.2/tests/lumber-night-acceptance.test.ts`
- `mindy-successor/prior-work/astra/prototype-m3.2/tests/lumber-production-definition-merge-safety.test.ts`
- `mindy-successor/prior-work/astra/prototype-m3.2/tests/lumber-target-cross-system.test.ts`
- `mindy-successor/prior-work/astra/prototype-m3.2/tests/lumber-target-production.test.ts`

## OPEN_AUTHORING_PACKET

These require Product/content decisions before implementation. They are not production definitions.
- `mindy-successor/docs/lumber-prep/OLD_BOUNDARY_TOKEN_AUTHORING_PACKET_v1.md`
- `mindy-successor/prior-work/astra/prototype-m3.2/content/old-boundary-token-authoring.fixture.json`
- `mindy-successor/docs/lumber-prep/SCHOOL_LUMBER_PUBLIC_FACT_AUTHORING_PACKET_v1.md`
- `mindy-successor/prior-work/astra/prototype-m3.2/content/school-lumber-public-fact-authoring.fixture.json`

Open decisions include the Old Boundary Token acquisition/use policy and School management public-result provider/threshold.

## FOREST_DEPTH_CONTENT

These define/measure the remaining route/challenge/season depth without inventing final lore.
- `mindy-successor/docs/lumber-prep/FOREST_DEPTH_GAP_TO_SPEC_v1.md`
- `mindy-successor/prior-work/astra/prototype-m3.2/tests/lumber-forest-depth-gap.test.ts`
- `mindy-successor/docs/lumber-prep/FOREST_PRODUCTION_AUTHORING_MATRIX_v1.md`
- `mindy-successor/prior-work/astra/prototype-m3.2/content/forest-production-authoring-matrix.fixture.json`

Forest depth still needs three route contexts, three challenge families, season-driven topology/options and an item-driven action-space seam.

## SUPERSEDED

These are retained only as history and must not drive the release-candidate merge.
- `mindy-successor/docs/lumber-prep/LUMBER_ITEM_CAPABILITY_INTEGRATION_AUDIT_v1.md`
- `mindy-successor/docs/lumber-prep/LUMBER_UNRESOLVED_DEPENDENCY_LEDGER_v1.md`
- `mindy-successor/prior-work/astra/prototype-m3.2/tests/lumber-unresolved-dependency-ledger.test.ts`
- `mindy-successor/prior-work/astra/prototype-m3.2/tests/lumber-item-capability-integration-audit.test.ts`
- `mindy-successor/prior-work/astra/prototype-m3.2/content/lumber-pa-scenario.fixture.json`
- `mindy-successor/prior-work/astra/prototype-m3.2/tests/lumber-pa-scenario-contract.test.ts`
- `mindy-successor/prior-work/astra/prototype-m3.2/content/lumber-product-acceptance.fixture-manifest.json`
- `mindy-successor/prior-work/astra/prototype-m3.2/content/lumber-production-activation.fixture.json`
- `mindy-successor/prior-work/astra/prototype-m3.2/tests/lumber-production-activation-contract.test.ts`
- `mindy-successor/prior-work/astra/prototype-m3.2/content/lumber-shipped-activation-expectations.fixture.json`
- `mindy-successor/prior-work/astra/prototype-m3.2/tests/lumber-shipped-activation-expectations.test.ts`
- `mindy-successor/docs/lumber-prep/LUMBER_PA_BLOCKER_BURNDOWN_v1.md`
- `mindy-successor/docs/lumber-prep/LUMBER_PRODUCT_ACCEPTANCE_ROW_MAP_v1.md`
- `mindy-successor/prior-work/astra/prototype-m3.2/tests/lumber-pa-row-map.test.ts`
- `mindy-successor/docs/lumber-prep/LUMBER_RELEASE_READINESS_v1.md`
- `mindy-successor/docs/lumber-prep/LUMBER_INTEGRATION_HANDOFF_v1.md`
- `mindy-successor/prior-work/astra/prototype-m3.2/content/lumber-integration-handoff.fixture.json`

Key replacements:
- old unresolved/blocker ledgers -> `LUMBER_PA_CLOSURE_DEPENDENCY_AUDIT_v1.md` + `LUMBER_PA_CLOSURE_ROW_MAP_v1.md`;
- pre-activation expectation/scenario artifacts -> post-PR21 shipped/closure evidence;
- handoff v1 -> this handoff v2.

## Runtime vs authoring boundary

Lead/shared runtime work still required before natural PA09/PA14/PA17 closure:
- generic capability-aware item ownership/query;
- capability-gated Activity option/action surface.

Product authoring still required:
- one accepted `old_boundary_token` acquisition/use source and policy;
- School-owned publication of `lumber.school.management-ready`;
- full Forest route/challenge/season depth.

Chat 3 does not patch shared runtime/schema/UI in this handoff.

## Hard Work — already shipped, never OPEN

Ending: `ending.lumber.hard-work`.
Only eligibility condition: `completed_shifts >= 50`.
Exact A6 reward: `hardWork:lumber`.

No milestone, relationship, season, Forest, School or item prerequisite is allowed.

Hard Work is neither an `OPEN_AUTHORING_PACKET` nor `FOREST_DEPTH_CONTENT` dependency.

## Integration recommendation

1. integrate the smallest Lead subset or the full `READY_TO_INTEGRATE_NOW` class;
2. retain `QA_EVIDENCE_ONLY` as regression coverage where useful;
3. route `OPEN_AUTHORING_PACKET` to Product/content ownership;
4. route `FOREST_DEPTH_CONTENT` to Forest authoring;
5. ignore `SUPERSEDED` as implementation source;
6. leave Hard Work unchanged.
