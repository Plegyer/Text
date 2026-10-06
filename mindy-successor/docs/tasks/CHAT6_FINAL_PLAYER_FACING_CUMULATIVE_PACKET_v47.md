# Chat 6 — Final Player-Facing Cumulative Packet v47

Status: **BUNDLE COMPLETE — READY FOR CHAT2 FINAL CONTENT ASSEMBLY**  
Owner: Chat 6  
Branch: `chat6/final-player-facing-cumulative-v45`  
Date: 2026-10-06

This is the final Chat 6 preassembly packet for the accepted cumulative player-facing content/UI layers. It introduces no new runtime or production content change. It binds the exact v45 manifest and v46 ordering/conflict rules into a focused Chat2 assembly gate.

## 1. Governing documents

- v45 exact cumulative manifest: `CHAT6_FINAL_PLAYER_FACING_CUMULATIVE_MANIFEST_v45.md`
  - publication commit: `b7a7bd753eeaa20c7aa269b66665acb3f2244edc`
- v46 conflict / ordering audit: `CHAT6_FINAL_PLAYER_FACING_CONFLICT_ORDERING_AUDIT_v46.md`
  - publication commit: `235525485787ca1dd4577868db4ec665ef83a564`

Accepted source authorities consolidated by those documents:

- v29 captions implementation head `e9f0805068a8144a3b3cebaf07803b7090732bfd`
- v31 retired Tavern cleanup head `b37551d567d8017dbc25b87d66034af3e9c7a812`
- v32 localization/presentation packet seed `43eac0d3b1fdbcbd3ac080e3f70466410b6625a1`
- v36 Activity Network correction producer `2f8f291a7e03bcf1677d6f51feaec28fe98e29ba`
- v40 player-facing localization producer `2eca98265ed91f1fd3c62a2d2d2be9504feab075`
- v42/v43 Strong Meta/modal implementation head `fac645878ebd726f50fd1364ac72414796755a2d`

## 2. Final assembly contract

Chat2 must assemble by exact operation, never by producer snapshot replacement:

- localization: **330 unique upsert targets**, **331 ordered upsert operations** because v36 intentionally overrides one Activity v17 key, and **12 final deletions**;
- presentation: **127 additive slots**, no accepted slot replacement/deletion;
- UI: seven v42/v43 semantic hunks rebased onto the already assembled app;
- tests: additive producer/focused tests only.

The only accepted localization collision is:

`ending.ending.activity.network.epilogue`

Activity v17 establishes the row; v36 supplies the final authoritative value. No other accepted localization mutation collides.

The full exact key/slot lists and source/predecessor blobs are authoritative in v45. The exact order and conflict policy are authoritative in v46.

## 3. Focused executable test roster

Bring the relevant producer tests into the runnable final assembly checkout and run at least the following.

### v32 localization / presentation base

- `tests/ending-localization-closure-producer-v26.test.ts`
- `tests/secret-debt-ending-localization-producer-v27.test.ts`
- `tests/global-caption-closure-producer-v29.test.ts`
- `tests/retired-tavern-localization-cleanup-v31.test.ts`
- `tests/night-content-gap-v10.test.ts`
- `tests/shared-night-ui-localization-production-v1.test.ts`
- `tests/activity-ending-content-presentation-v17.test.ts`
- `tests/palace-final-prose-media-v19.test.ts`
- `tests/global-presentation-mapping-producer-v23.test.ts`
- `tests/localization.test.ts`
- `tests/presentation.test.ts`
- `tests/presentation-source-integrity-v9.test.ts`
- `tests/presentation-locale-accessibility-v9.test.ts`

### Post-v32 player-facing deltas

- `tests/activity-network-copy-fix-v36.test.ts`
- `tests/final-player-facing-localization-v40.test.ts`
- `tests/strong-meta-player-ui-v42.test.ts`
- `tests/modal-aria-localization-v43.test.ts`
- `tests/strong-meta-ui-localization-v42-v43.test.ts`

### Strong Meta persistence / engine adjacency

- `tests/strong-meta-engine-integration-v7.test.ts`
- `tests/strong-meta-registry-v7.test.ts`

Retain the assembled D42 focused Night/save-reload/private-space/Secret-Debt test set as well; this packet does not replace the D42 runtime gate.

Recommended focused runner sequence on the assembled checkout:

1. `npm run typecheck`
2. `npm run validate`
3. `npm run build`
4. run the test files above with Node's existing `--experimental-strip-types --test` runner

Do not substitute a full-CI run for the focused preassembly evidence required here. Full CI remains owned by the final integration/release lane.

## 4. Required focused behavioral smoke

After executable tests, verify these player-facing seams on the assembled build.

### Localization / endings

- ordinary ending title/description/epilogue coverage remains bilingual;
- all three Secret Debt endings remain bilingual;
- all three Activity endings use final accepted copy;
- Activity Network epilogue contains the v36 practical-network wording and does **not** restore the unconditional four-direction claim;
- Palace final prose/presentation remains on top of its v18 prerequisite.

### Captions / presentation

- both v29 generic captions exist and retain accepted alt-semantic parity;
- all 127 cumulative presentation targets resolve to the accepted slot objects;
- retired Tavern presentation surfaces do not render;
- the nine migration compatibility rows remain available.

### v40 player-facing repair

Verify RU and EN for:

- School counter condition;
- Field time;
- Mini-game;
- Suspicion;
- D41 automatic knowledge labels covered by v40;
- D40 compatibility reward aliases covered by v40;
- Secret Debt reward identities:
  - Earned Reserve Match;
  - Work Rhythm;
  - Network Retainer.

No audited v40 row may render its raw localization key or raw stable reward ID.

### Strong Meta selector

Before starting a new life:

- owned rewards are not auto-selected;
- selectable classes are separated into Keystone and Specialists;
- capacity is max 1 Keystone and max 2 Specialists;
- `palace.true.cap-200` consumes a Specialist slot;
- Source Method / inherited automatic knowledge is not selectable and consumes no slot;
- ordinary Hard Work packages remain outside Strong Meta slots;
- preferred selection survives save/reload;
- after creation, the current-run snapshot contains the chosen selection and remains engine-owned/immutable.

### Modal accessibility

In RU and EN:

- Work, School, Explore, Night, Heroine, Journal, Bag, Fates, Menu, Editor and Catalog dialogs expose non-empty human-readable accessible names;
- no normal dialog announces raw route IDs such as `work`, `school`, `legacy`, `menu`, `editor`, or `catalog`;
- Catalog dialog accessibility name resolves as `Инспектор событий` / `Event inspector`.

## 5. STOP conditions

Stop final content preassembly and return to the owning producer / Leader if any of the following occurs:

1. any frozen source blob or producer SHA in v45 no longer resolves to the expected content;
2. Activity v16-r1 mechanics/content prerequisite is absent when Activity v17 is being applied;
3. Palace v18 mechanics/content prerequisite is absent when Palace v19 is being applied;
4. any localization ADD target already exists with a different value;
5. any localization REPLACE target is neither its frozen predecessor nor its frozen final value;
6. `ending.ending.activity.network.epilogue` has any value other than absent, the accepted Activity v17 predecessor, or the v36 final value during composition;
7. the old Activity Network unconditional four-direction wording appears after v36;
8. any target presentation slot exists with a different object;
9. any deletion target has acquired a live consumer or a repurposed value;
10. any of the nine Tavern migration compatibility rows is missing;
11. D41 Tavern migration mapping changes;
12. any retired Tavern ending ID reappears in live ending definitions/presentation;
13. either v29 caption diverges from its accepted paired-alt semantics;
14. an assembled D42 Night/private-space/Secret-Debt consumer seam regresses;
15. Activity localized ended-state epilogue rendering is missing;
16. Palace accepted player-facing consumer behavior is missing;
17. applying v42/v43 would require replacing `src/ui/app.ts` wholesale or discarding a newer owner seam;
18. the Strong Meta selector auto-selects owned/imported rewards;
19. Strong Meta capacity differs from 1 Keystone / 2 Specialists;
20. `palace.true.cap-200` is not treated as a Specialist;
21. Source Method/inherited automatic knowledge becomes selectable or consumes a slot;
22. ordinary Hard Work enters the Strong Meta slot system;
23. preferred Strong Meta selection does not survive reload or the current-run snapshot is not frozen through the accepted engine path;
24. generic dialog ARIA output exposes a raw internal panel id;
25. any v40 audited row is absent, differs from its frozen bilingual value, or exposes a raw key/ID in the audited consumer;
26. any focused producer/parity/UI/adjacency test fails;
27. conflict resolution would require wholesale replacement of `localization.json`, `presentation.json`, `definitions.json`, `src/ui/app.ts`, Activity runtime files, D42 runtime files, or Palace packs/runtime files.

Do not resolve any STOP by chronology or generic last-write-wins.

## 6. Explicit non-goals / known retained findings

This cumulative packet only consolidates accepted layers. It does not reopen or silently repair unrelated v39 P2 findings.

In particular:

- v43 closes the **dialog accessible name** issue for Catalog, but does not claim that every developer-adjacent visible Catalog Inspector string has been separately converted to a localization-key consumer;
- localized save/load wrappers may still append raw technical diagnostic payload on exceptional errors, as previously recorded.

Those findings remain separate from the v45-v47 assembly contract unless Leader assigns a new producer.

The accepted v42 Strong Meta selector also keeps its documented human-readable fallback for reward IDs lacking a dedicated `unlock.<rewardId>.label` row; v45-v47 does not invent new reward identities or localization rows.

## 7. Files that must not be replaced wholesale

Never use these producer snapshots as final whole-file sources:

- `content/localization.json`
- `content/presentation.json`
- `content/definitions.json`
- `src/ui/app.ts`
- Activity/D42 runtime files
- Palace definitions/packs/runtime files

Composition must follow v45 exact targets and v46 order.

## 8. Final handoff

Chat 6 has completed v45, v46 and v47 without changing production runtime/content on the cumulative branch. The packet is ready for Chat2 to perform final content assembly and focused runnable verification.

`BUNDLE_COMPLETE — READY_FOR_CHAT2_FINAL_CONTENT_ASSEMBLY`
