# Lumber Final Closeout Pack v6

Status: post-PR25 Lumber closeout.

Baseline:
`961208ea995ca034e8dfe896337a38828db52415`

PR25 technical RC gate is GREEN (218/218 on merge-ref) and changes QA only. Production runtime/content/UI remains the already-shipped source of truth.

Machine-readable closeout:
`prior-work/astra/prototype-m3.2/content/lumber-final-closeout-pack.fixture.json`

## SHIPPED_GREEN

Do not reopen or re-integrate as worker production:
- Hard Work ending `ending.lumber.hard-work`;
- ONLY condition `completed_shifts >= 50`;
- exact reward `hardWork:lumber`;
- exact A5 `activityResult(lumber.forest, success, lumber.forest.success)`;
- inventory-derived `old_boundary_token -> enter_old_boundary`;
- natural logging-road Forest route;
- old-boundary capability route;
- legacy optionModelVersion 0 `advance|escape` behavior;
- one-Save Lumber -> School -> Night -> Forest -> ending -> New Run technical path.

Hard Work is explicitly `SHIPPED_GREEN` and independent.

## MUST_INTEGRATE_QA

Current non-redundant worker QA:
- `LUMBER_PR25_FINAL_GATE_RECONCILIATION_v1.md` + test;
- Old Boundary Token decision-vector fixture + test;
- Hunter-trail boundary fixture + test;
- Forest challenge skeleton fixture + test;
- `lumber-rc-no-false-green.test.ts`;
- Forest future-authoring compatibility fixture + test;
- Forest content-completeness validator fixture + test;
- `LUMBER_FINAL_RC_ACCEPTANCE_MATRIX_v1.md` + test;
- this v6 handoff doc/fixture.

### Smallest Lead integration subset

The machine-readable fixture lists the exact 15-file QA subset excluding v6 navigational metadata.

PR25 already provides the core one-Save/Hard Work/capability/schema4 technical gate, so older PR22/PR24 reconciliation tests are not part of this subset.

## HUMAN_DECISION_REQUIRED

Current decision sources:
- `LUMBER_HUMAN_DECISION_CLOSEOUT_v1.md`;
- `OLD_BOUNDARY_TOKEN_DECISION_READY_PACKET_v1.md` + fixture;
- `OLD_BOUNDARY_TOKEN_PRODUCT_DECISION_IMPACT_v1.md` + fixture;
- `SCHOOL_LUMBER_PUBLIC_FACT_AUTHORING_PACKET_v1.md` + fixture;
- `HUNTER_TRAIL_DECISION_MATRIX_v2.md` + fixture.

Human/Product answers still needed:
1. Old Boundary Token acquisition/use/repeatability/presentation;
2. School management/accounting public-result provider and threshold;
3. Hunter trail clue/capability identity, source/provider, reward/lore/check details;
4. School Arcana public boundary only if that anomaly approach is selected.

No preferred answer is selected by Chat 3.

## CONTENT_AUTHORING_REQUIRED

Current authoring sources:
- `FOREST_HUNTER_TRAIL_AUTHORING_PACKET_v1.md` + fixture;
- `FOREST_CHALLENGE_FAMILY_AUTHORING_PACKET_v1.md` + fixture;
- `FOREST_SEASON_TOPOLOGY_AUTHORING_PACKET_v1.md` + fixture.

Remaining content:
- Hunter trail;
- navigation challenge;
- physical obstacle challenge;
- interpretation / ritual anomaly challenge;
- season-dependent topology/options.

`forest-content-completeness.test.ts` should pass by truthfully asserting that the current assessment remains `fullComplete=false` until all dimensions are actually authored. Do not fabricate a completeness pass.

## PRESENTATION_ASSET_ONLY

Non-blocking presentation/media follow-up:
- `LUMBER_PRESENTATION_SLOT_CATALOG_v1.md`;
- `lumber-production-media-parity.fixture.json` + test.

Future optional GIF/media improvements do not change mechanics IDs or current technical RC status.

## SUPERSEDED

Superseded as current integration source:
- final evidence pack v5 -> replaced by v6;
- post-PR24 reconciliation -> superseded by PR25 reconciliation/gate;
- PR24 one-Save audit -> superseded by merged PR24/PR25 evidence;
- PR22 parity audit -> superseded by PR25 final-gate reconciliation;
- route-completeness negative sentinel -> superseded by the broader content-completeness validator;
- old token decision matrix/authoring packet -> decision-ready + impact + vectors are current;
- old Forest gap/broad production matrix -> narrower Hunter/challenge/season packets + completeness validator are current;
- RC handoff v3, decision/evidence handoff v4, release-candidate handoff v2.

Historical files may remain in Git but should not drive current authoring/integration.

## Final closeout state

Technical/runtime Lumber RC is GREEN.

Open work is only:
- human/Product decisions;
- Forest/School content authoring;
- optional presentation assets.

None of those may weaken:
- Hard Work `completed_shifts >= 50` only;
- exact `hardWork:lumber`;
- exact Forest `activityResult` continuation.
