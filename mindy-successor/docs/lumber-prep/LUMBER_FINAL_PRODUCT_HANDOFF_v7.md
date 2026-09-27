# Lumber Final Product Handoff v7

Status: smallest Product-facing Lumber handoff after merged PR26/PR27 closeout/hardening.

Technical RC remains GREEN. This document separates shipped truth from decisions/content still requiring Product ownership.

Current Lumber PA authority:
`docs/lumber-prep/LUMBER_FINAL_RC_ACCEPTANCE_MATRIX_v1.md`

Current RC status authority:
`docs/qa-prep/RC_CLOSEOUT_STATUS_v1.md`

Current neutral human-decision ledger:
`docs/qa-prep/RC_HUMAN_DECISIONS_REQUIRED_v1.md`

QA fixtures/tests remain evidence. They are not Product decision authority.

## LOCKED_AND_SHIPPED

### Hard Work

Locked and shipped:
- ending `ending.lumber.hard-work`;
- ONLY condition `completed_shifts >= 50`;
- exact reward `hardWork:lumber`.

No School, Forest, item, relationship, Night, milestone or season prerequisite may be added.

### Forest continuation

Locked and shipped A5 boundary:

`activityResult(lumber.forest, success, lumber.forest.success)`

### Current Forest routes/runtime

Locked/shipped:
- natural logging-road route;
- old-boundary route gated by `enter_old_boundary`;
- `old_boundary_token -> enter_old_boundary` canonical identities;
- capability derives from authoritative inventory;
- Activity route/options persist through save/reload;
- legacy optionModelVersion 0 retains `advance|escape`;
- distinct success/escape/failure terminal identities.

### School baseline

Locked/shipped:
- paid lesson runtime;
- typed `lessons_completed`;
- real `base.school -> listen` blocking boundary;
- tuition/Energy/progress exactly-once behavior.

Not shipped:
- synthetic `school.lumber-management` as a Product provider.

## HUMAN_DECISION_REQUIRED

### Old Boundary Token

Still requires human/Product answers for:
- acquisition source;
- timing/requirements;
- retained vs consumed/turn-in;
- repeatability/permanent-access behavior;
- inventory/locked-route presentation.

Dependency mapping:
- PA09 depends on natural acquisition;
- PA14/PA15/PA17 behavior depends on the accepted use/removal/repeatability policy;
- migration impact is usually content-only with existing primitives; permanent access after removal may introduce new durable state without automatically requiring schema change.

Current decision-impact source:
`OLD_BOUNDARY_TOKEN_PRODUCT_DECISION_IMPACT_v1.md`

### School -> Lumber management public result

Still requires:
- provider/course/track;
- threshold or accepted milestone/project/exam/certificate;
- publication rule for `lumber.school.management-ready`.

Dependency mapping:
- PA07/PA08 remain human-decision authoring rows;
- existing School progression/public-fact runtime is ready for ordinary accepted shapes.

### Hunter trail

Locked:
- route concept `hunter-trail`;
- navigation-family role;
- independence from `enter_old_boundary`.

Still requires:
- clue/public-fact and/or navigation-capability identity;
- source/provider;
- reward/lore identity;
- threshold/check details.

Dependency mapping:
- PA16 needs the authored route plus all remaining Forest depth;
- PA17 is affected only where the accepted unlock uses item/capability reachability.

Current decision source:
`HUNTER_TRAIL_DECISION_MATRIX_v2.md`

### School Arcana / Forest public boundary

If retained in target scope, Product still needs to define:
- provider;
- public result ID;
- threshold/milestone;
- Forest consumer behavior.

If not retained in scope, Forest anomaly content must use another accepted path.

## CONTENT_AUTHORING_REQUIRED

Current Forest runtime is ready; full PA16 is still not complete.

Authoring still required:
1. Hunter trail production route;
2. one navigation challenge;
3. one physical obstacle challenge;
4. one interpretation / ritual anomaly challenge;
5. at least one deterministic season-dependent topology/option or Activity-resource difference.

Current completeness source:
`FOREST_AUTHORING_READY_COMPLETENESS_v2.md`

School content authoring also remains required after the management public-result human decision.

No final lore, prose, NPC, loot or threshold is selected by this handoff.

## OPTIONAL_PRESENTATION_POLISH

Current RC-blocking presentation assets: 0.

Optional polish remains:
- Forest route/challenge-specific visual specialization after gameplay identities are authored;
- optional Lumber/Foreman GIF work;
- School management-result visuals after that result is authored.

Static/text fallback and semantic presentation IDs remain sufficient for the technical RC.

## SUPERSEDED

Superseded as current Product handoff:
- `LUMBER_FINAL_CLOSEOUT_PACK_v6.md` + fixture;
- `LUMBER_FINAL_EVIDENCE_PACK_v5.md` + fixture;
- `LUMBER_FINAL_DECISION_EVIDENCE_HANDOFF_v4.md` + fixture;
- `LUMBER_RC_CLOSURE_HANDOFF_v3.md` + fixture;
- `LUMBER_RELEASE_CANDIDATE_HANDOFF_v2.md` + fixture;
- `OLD_BOUNDARY_TOKEN_DECISION_MATRIX_v1.md`;
- broad `FOREST_PRODUCTION_AUTHORING_MATRIX_v1.md` as the current completeness source.

Historical QA/audit files may remain in Git but do not supersede the current acceptance matrix or Product decision docs.

## Dependency map

| Open domain | Depends on human decision? | Depends on content authoring? | Runtime primitive already ready? |
| --- | --- | --- | --- |
| PA09 natural token acquisition | YES | YES | YES |
| token retain/consume/repeatability | YES | YES | YES for ordinary policy shapes |
| PA07/PA08 School management result | YES | YES | YES for ordinary typed/public-fact shapes |
| Hunter trail | YES for unlock/source/reward identity | YES | YES for ordinary conditions/options |
| three Forest challenge families | only where identity/threshold remains Product-owned | YES | YES at generic option/condition level |
| seasonal topology | NO new Product identity required unless content choice needs one | YES | YES for ordinary season-conditioned options |
| route/challenge visual polish | only for art priority | optional | YES fallback already shipped |

## Product-state summary

Locked/shipped mechanics remain green.

Human decisions remain neutral/open until explicitly accepted.

Forest/School content depth remains incomplete until authored.

Optional presentation polish is non-blocking.

Nothing in this handoff changes:
- Hard Work ONLY `completed_shifts >= 50`;
- exact `hardWork:lumber`;
- exact Forest `activityResult` continuation.
