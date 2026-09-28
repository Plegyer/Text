# Next production integration gate v18

Status: COMPLETE / CURRENT_GATE_RECORDED

Audit point:
after PR53 global UI-shell merge, with PR54 journal/outcome stable-ref work open and currently failing exact-head CI.

Current main:
`3fc5495310e281cf5cbe52da3642000f1cb1fb05`.

Current main CI:
- run #92;
- id `36400322979`;
- SUCCESS;
- validator 17 packs / 46 events / 35 actions / 9 endings;
- 334 / 334 tests.

This gate summarizes Chat 4 items 223–233.

## 1. PR51 poverty copyedit

Classification:
`GREEN_POST_MERGE_MAIN`.

PR51:
- exact head `b90099f6bda958053c1325ec250ea07e7f6fb7c7`;
- exact run #84 SUCCESS;
- 323/323;
- merged as `1a2f6e428da41e356f8d48df4a72923a5cc1928c`;
- post-merge run #85 SUCCESS.

Scope:
- exactly 33 existing ordinary-poverty RU+EN keys;
- no new keys/IDs;
- no media;
- no Secret Debt;
- no gameplay drift.

## 2. PR52 legacy root localization

Classification:
`GREEN_POST_MERGE_MAIN`.

Reviewed source:
- 109 keys;
- 108 additive + 1 exact-identical;
- 17 current legacy event IDs;
- 16 current media IDs;
- complete RU+EN;
- localization only.

Initial PR52 head failed due a missing regression fixture.

Accepted fixed head:
`eefcdff5f4eb4c0eb4c9f60a91a708b5da49d962`.

Exact run #87:
- SUCCESS;
- 329/329;
- validator 17/46/35/9.

Merged as:
`5dffefd15703d431a604b4cc9f831c4e55460aed`.

Post-merge run #88:
- SUCCESS;
- 329/329.

## 3. Global UI shell

Chat5 source classification:
`SHIPPED_GREEN`.

Source originally contained:
- 34 stable UI keys;
- 29 additive;
- 5 exact-identical/reuse;
- 0 conflicts.

Lead shipped it as PR #53.

Accepted PR53 head:
`dd68c04e307bd8517a9468be2138366cbaf900d7`.

Exact run #91:
- SUCCESS;
- 334/334;
- validator 17/46/35/9.

Merged as current main:
`3fc5495310e281cf5cbe52da3642000f1cb1fb05`.

Post-merge run #92:
- SUCCESS;
- 334/334.

Shipped consumers include:
- Explore;
- outer Sleep shell;
- Stats;
- Journal shell;
- Bag/debt;
- Legacy/endings;
- arrival;
- shared controls.

Save-invariance UI smokes are green.

## 4. Shared Night/lodging UI after PR53

Original Chat3 fixture:
20 keys.

Rebased current classification:
- 16 additive and still needed;
- 1 exact-identical already shipped:
  `ui.result.chooseLodging`;
- 3 outer Sleep-panel keys superseded by shipped PR53 `ui.sleep.*` ownership.

Do not ship duplicate aliases:
- `ui.night.panel.title`;
- `ui.night.panel.description`;
- `ui.night.panel.start`.

Still-needed Night/lodging slice covers:
- Night stage eyebrow;
- LodgingResolution prompt;
- next-day Energy formatter;
- voluntary Night-choice shell;
- generic Night sequence title;
- town lodging summary;
- lodging labels;
- housing labels;
- generic `night.sleep` label.

Classification:
`GREEN_REBASED_SOURCE / SHARED_UI_WIRING_REQUIRED`.

## 5. Journal/outcome stable-ref design

Acceptance contracts are recorded for:
- locale-neutral journal ref schema;
- localized lastAction event-choice outcome;
- Journal RU↔EN switch invariance.

Required design principles:
- stable eventId + choiceId refs;
- old text-only saves remain valid;
- no fuzzy prose migration;
- no locale-selected prose as gameplay identity;
- ordinary action and School result ownership unchanged;
- rendering is read-only and exactly-once.

### Live PR54 status

PR #54:
`Lead: localize journal choice outcomes via stable refs`.

Current head:
`0a46de81b2ad29c1fcbb0e865c5de59a29f0ba92`.

Design positives:
- keeps schemaVersion 4;
- optional lastAction event-choice ref;
- parallel journal refs;
- old save without refs receives null refs;
- exact event/choice localization;
- no fuzzy text migration.

Focused new tests PASS:
- resolved event choice stores locale-neutral refs;
- old schema-4 save without refs keeps old fallback text;
- ref length mismatch is rejected;
- Journal/lastAction RU↔EN stable-ref renderer smoke preserves Save.

But full run #93 fails:
- tests: 338;
- pass: 328;
- fail: 10.

Nine existing regressions fail because legacy/current journal assignment paths can leave journal text and journalRefs lengths misaligned; one School UI test then times out downstream.

Current classification:
`BLOCKED_EXACT_HEAD_CI`.

Required fix:
all legacy text-only journal replacement paths must keep refs index-aligned without guessing refs from prose.

Do not merge current PR54 head.

## 6. Animation exporter proposal

Chat2 current source layer:
- 8 current semantic identities;
- 24 source sequences;
- 96 project-owned SVG frames;
- exactly 3 sequences per identity;
- real GIF files: 0;
- production GIF pools: 0.

Exporter proposal:
exact-pinned dev-only
`sharp@0.35.4 + gifenc@1.0.3`.

QA classification:
`TOOLCHAIN_PROPOSAL_ACCEPTABLE_WITH_LEAD_APPROVAL`.

Strengths:
- repo-local Node workflow;
- exact package-lock pinning;
- current Node 22.18 CI model;
- no system ImageMagick/ffmpeg requirement.

Required controls:
- local frame input only;
- no network/external asset ingestion;
- reject URL/absolute/traversal paths;
- fixed dimensions/timing/colorspace;
- resource caps;
- output only under assets/gif;
- exporter never becomes gameplay/runtime dependency.

Current status:
`EXPORT_BLOCKED`.

No dependency is currently installed.

## 7. Current bilingual coverage

Current root:
- localization keys: 540;
- missing RU: 0;
- missing EN: 0.

Current events:
- fully root-localized: 40/46;
- zero root localization: 6.

Current choices:
- total: 68;
- bilingual labels: 59;
- bilingual bodies: 59.

Root media-alt:
- 26/64 localized.

Global UI-shell reviewed source:
- 34/34 shipped.

Project-owned static target:
- 80/80 shipped.

Full product status:
`PARTIAL_BILINGUAL`.

## 8. Current main CI floor

Current main:
`3fc5495310e281cf5cbe52da3642000f1cb1fb05`.

Run #92:
- SUCCESS;
- 334/334;
- validator 17/46/35/9.

For text/presentation/shared-UI work:
- no silent test-count regression below 334;
- no gameplay validator drift;
- no static mapping drop below 80.

PR54 is not part of this floor until its exact-head CI is green and it is merged with successful main push.

## 9. Route-specific Forest presentation seam

Generic route/default:
shipped and green.

Route-specific source:
normalized and source-ready.

Still required:
- Lead route-state -> presentationId seam;
- Save/RNG/result invariance;
- exact current route IDs;
- exact current results/reactions;
- Hard Work invariant.

Logging-road route asset:
`SAFE_AFTER_SEAM`.

Current old-boundary route-specific SVG:
`NEEDS_REVISION_OR_EXPLICIT_APPROVAL`.

No route-specific root slot is currently shipped.

## 10. Product-open isolation

Still not promoted:
- School exact-course teacher gameplay/routing;
- School management/accounting provider;
- School Arcana/Forest provider/result;
- Hunter Forest route/clue/token semantics;
- Old Boundary acquisition/consume/retain/turn-in;
- route challenge/reward topology;
- deeper relationship stages/housing/endings;
- Secret Debt;
- authored Palace content.

Presentation/localization work does not authorize those mechanics.

## Next Lead slices

### Journal/outcome consumer
Priority:
`FIX_PR54_COMPATIBILITY_THEN_RE-RUN_EXACT_HEAD`.

The design direction is acceptable; current exact head is blocked by journal/ref alignment regressions.

### Global UI shell
`SHIPPED_GREEN`.

No new Lead shell PR needed for the 34-key slice.

### Shared Night UI
`READY_FOR_FRESH_MAIN_SELECTIVE_PR`.

Use the rebased 16-key set, reuse the already-shipped result key, omit the three superseded outer Sleep aliases.

### Route-specific presentation seam
`SHARED_WIRING_REQUIRED`.

Keep separate from generic route/default.

### Animation exporter
`LEAD_TOOLCHAIN_APPROVAL_REQUIRED`.

Only after approval should package/lock/exporter changes be attempted.

## Final gate verdict

- current main CI: `GREEN`;
- PR51 poverty copyedit: `SHIPPED_GREEN`;
- PR52 legacy localization: `SHIPPED_GREEN`;
- PR53 global UI shell: `SHIPPED_GREEN`;
- PR54 journal/outcome current head: `BLOCKED_EXACT_HEAD_CI`;
- Journal stable-ref design direction: `ACCEPTABLE_AFTER_COMPAT_FIX`;
- shared Night UI: `GREEN_REBASED_SOURCE / WIRING_REQUIRED`;
- project-owned static target: `80/80 CLOSED`;
- animation source layer: `SOURCE_READY`;
- GIF export: `BLOCKED_BY_TOOLCHAIN_APPROVAL`;
- route-specific Forest presentation: `SEAM_REQUIRED`;
- full-product bilingual status: `PARTIAL_BILINGUAL`;
- Product-open content: `ISOLATED`.

No whole worker/chat branch is approved for merge.
