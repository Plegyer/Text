# Chat 4 Open PR Collision / Disposition Ledger — 2026-10-01

Status: C4-123 QA evidence  
Owner: Chat 4 / QA + Product Acceptance Gate  
Repository: `Plegyer/Text`

## Exact current-main health

Current main inspected: `a30272dc91cab3d5286558a189d5d816f1841db7`.

Exact-head GitHub Actions evidence:
- workflow: `mindy-successor check`;
- run #459 / id `36816282846`;
- event: push on `main`;
- conclusion: SUCCESS;
- `Install dependencies`: SUCCESS;
- `Full check`: SUCCESS;
- content validation: 17 packs / 46 events / 35 actions / 9 endings;
- tests: 556 / pass 556 / fail 0.

This is the current executable baseline for the ledger below. Fixture/preparation-only material is not counted as shipped.

## Backlog dispositions

| PR | Frozen/current head | C4 task | Current disposition | Current-main truth |
|---|---|---|---|---|
| #124 | `63efb509e4776264af41af72d5ff41d7df8e3bc6` | C4-114 | SELECTIVE-SOURCE / useful partial delta | Poverty selector payload is already present on main; Forest + exact paid-course School consumer/wiring and focused regressions remain absent from main. Old C4-79 PASS is not a fresh whole-PR merge approval. |
| #132 | `43ea615581cd8614a32434888fcaaf01b6e116dd` | C4-115 | STALE / SUPERSEDED | C4-105 blocked a materially false teacher-media localization audit. Newer #140/#143 refresh the School line. |
| #134 | `fac977ba10e16c38f519782c6ce415aa39abba19` | C4-116 | SUPERSEDED / selective source | Preparation-only v8. Newer #138 and then #145 continue the same Forest/poverty preparation line. |
| #136 | `fecb773b056d8912439350bb0d44a59b6009a7e0` | C4-117 | USEFUL DELTA / live predecessor | Production presentation/accessibility refinements are still absent from main. Current-main Presentation v9 handoff explicitly does not duplicate this production patch. |
| #138 | `936829c9eabf80136ffda8f602833f378bfc5325` | C4-118 | SUPERSEDED / selective source | Preparation-only v9. Newer frozen #145 / C3-108 refreshes this content line. |
| #139 | `2e8075aa50ec6b038597bc28efecf8a832b67209` | C4-119 | USEFUL DELTA / live predecessor | Main does not contain the candidate `actionAvailability(...)` contract or exact Night-study UI consumer. C1D v8 explicitly leaves these seams owned by #139. |
| #140 | `8a38075d2df4ccce81139f0644d4f8547da87d1c` | C4-120 | SUPERSEDED / selective source | School v9 preparation is followed by newer frozen #143 / v10 and the active C5-109..120 line. |
| #142 | `029abcc5ebf4594bee4a91606d56b4b37bcb2c3a` | C4-121 | USEFUL DELTA / selective-source regression-only | Four focused v8 regression files remain absent from main. PR is still draft and intentionally does not duplicate #124/#139 production seams. |
| #143 | `0213a9aa9bb8a60ca7b19ee547b3fc8ed26eed00` | C4-122 | USEFUL DELTA / current preparation candidate | Exact-head CI #431 is green. School-owned docs/fixtures/tests only; no production runtime/localization/packs/media/mechanics. Not shipped content. |

Additional newer source noted during disposition work:
- #145 / C3-108 exact frozen head `7955a62e0189122ceb5ebcf0e1bd3bb2db6299ff`, exact-head CI run #434 green; newer than #138 but still preparation-only.

## Material collision map

### Shared production UI/localization collision cluster

PRs #124, #136 and #139 all touch `src/ui/app.ts` and/or root `content/localization.json` while remaining unmerged. Their useful deltas are not equivalent:

- #124: Forest depth consumer + exact paid-course School result presentation, with poverty portion now superseded by main;
- #136: presentation/accessibility hardening and ending-state presentation handling;
- #139: central action-availability result + exact Night-study presentation consumer and School live intercept.

These three must not be treated as independent "green therefore merge in any order" candidates. Lead integration order must preserve each unique semantic delta and run a combined current-main check after integration. QA does not implement the combination.

### Dependency-only / no-production collision candidates

- #142 is regression/docs-only and explicitly depends on #124/#139 for pending production seams.
- #143 is School preparation/docs/fixtures/tests only.
- #145 is Forest/poverty preparation/docs/fixtures/tests only.

They do not make their prepared text player-reachable by themselves.

### Superseded noise to avoid integrating

Do not spend integration effort on #132, #134, #138 or #140 as whole PRs. Their useful historical wording/audits may remain selective source, but newer candidates supersede their role as live backlog heads.

## QA boundary

This ledger is disposition/evidence only. It does not:
- merge any producer PR;
- modify production code/content;
- convert fixture/preparation material into shipped content;
- choose missing Product thresholds or mechanics;
- resolve producer-owned blockers.


## C4-124 fresh-candidate gate

Chat 1 v9 became the first eligible fresh candidate.

- PR #147 first declared frozen head: `15d6ee3d91c5ad3fef82fe52a06ec2a590089003`.
- Exact-head CI #448 / id `36815947100`: SUCCESS; 17 packs / 46 events / 35 actions / 18 endings; 570/570 tests.
- Locked late-career thresholds, 50-shift Hard Work definitions, automatic all-ten Meta rewards and the derived 10/10 Palace predicate match the assigned master spec.
- C4-124 verdict: **BLOCK** because current production Satyr Maid and Undead Farm shift actions unconditionally execute their one-time `first-shift` career transition on every shift. After the first shift advances to `known-face` / `reliable-helper`, the second real shift hits the typed transition `from` guard and throws. Direct test priming to 49 shifts or direct ending eligibility does not prove natural 50-shift reachability.
- The producer then moved #147 to `987438954cfec9739281a512a1589cb2707095e5`, invalidating the old freeze. That delta adds only `tests/ordinary-hard-work-meta.test.ts`; it does not repair production definitions/runtime. Exact-head CI #451 is green, but the production blocker remains.
- Required producer repair is recorded on PR #147. QA did not modify production.

This also corrects executable acceptance truth: Satyr Maid and Undead Farm are Day-1 selectable and their first shifts work, but their current base work loops are not naturally repeatable after the first typed transition.
