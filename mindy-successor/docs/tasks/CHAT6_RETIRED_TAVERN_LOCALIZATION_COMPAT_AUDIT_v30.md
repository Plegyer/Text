# Chat 6 — Retired Tavern Localization Compatibility Audit v30

Status: **READY_FOR_LEADER_REVIEW**  
Owner: Chat 6  
Branch: `chat6/retired-tavern-localization-compat-audit-v30`

Scope: audit only. No localization deletion, no runtime change, no mechanics change, no full CI.

Accepted predecessor:

`chat6/final-localization-presentation-closure-v28@d57381dc7fa4af028cea3effdb4146a75cc9c60a`

v30 task seed head:

`ab6b1a5bfc52a8531c5d714388dbe17b87d6e797`

---

## 1. Executive result

The six retired Tavern presentation-localization rows identified by v28 are safe to delete from the final 1.0 assembled target, provided the assembled head preserves the already-accepted D41 Tavern migration behavior and does not reintroduce retired Tavern presentation slots.

Rows:

- `presentation.static.ending.tavern-stay.alt`
- `presentation.static.ending.tavern-stay.caption`
- `presentation.static.ending.tavern-guild.alt`
- `presentation.static.ending.tavern-guild.caption`
- `presentation.static.ending.tavern-court.alt`
- `presentation.static.ending.tavern-court.caption`

Current audit classification:

- safe-to-delete rows: **6**
- must-keep compatibility rows among these six: **0**
- rows requiring final assembled-head verification before physical deletion: **6**, as a merge-safety gate only

The final verification is not because any current consumer exists. It is required because v30 is an audit branch, not the final cumulative Chat 2 release head.

---

## 2. Current v30 seed evidence

Audited content blobs:

- localization: `65568847f09df4997fffc6facb7dc7907a10c872`
- presentation: `2adff5582cb9cf9c755b952c35fafb7e0ae6702b`
- definitions: `45d4287be3db6a828a4bd8b71825ff23e7f7bc31`

Observed:

- all six retired Tavern alt/caption localization rows still exist;
- no presentation slot contains:
  - `tavern-stay`
  - `tavern-guild`
  - `tavern-court`;
- no live ending definition has any of those three retired IDs.

Therefore the localization rows are already disconnected from the v30 seed's live presentation graph.

---

## 3. Current Chat 2 D42 assembly evidence

Audited integration branch:

`chat2/assembly-d42-night-current-main-20261004-v1`

Blobs:

- localization: `9281d3880d01c54f352effa5e372ad5393cc3eaa`
- presentation: `e800d2b16f2bc868273e39d45718dcd0c7fe74a5`
- definitions: `311b2fec271a274e61c34fad9645d5bff13f4993`

Observed there as well:

- the same six localization rows still exist;
- retired Tavern presentation slots: **0**
- retired Tavern live ending definitions: **0**

This confirms the stale-key condition is not limited to the v30 task seed.

---

## 4. D41 migration authority

Runtime migration authority:

`src/core/advancedEndingsD41.ts`

The accepted mapping is explicit:

- `tavern-stay` -> `ending.tavern.innkeeper`
- `tavern-guild` -> `ending.tavern.sanctuary`
- `tavern-court` -> `ending.tavern.information-broker`

The same module defines retired Tavern legacy unlock IDs:

- `host`
- `mediator`
- `court`

and removes those old unlock identities during D41 profile migration.

---

## 5. Old RunResult / ending compatibility

`src/core/engine.ts` runs D41 migration before normal save validation and UI consumption.

For completed historical Tavern saves:

1. old completed ending IDs are canonicalized;
2. old `run.endings.result.endingId` is replaced by the canonical D41 ending ID;
3. old `run.endings.committed` is replaced by the canonical D41 ending ID;
4. old eligible legacy IDs are removed;
5. completed-endings Meta history is canonicalized;
6. retired unlock IDs are removed / replaced with current reward ownership as defined by D41.

For uncompleted historical state:

- old Tavern eligibility is removed;
- a retired Tavern committed ending is cancelled;
- an `ending_committed` run resumes as active instead of preserving the dead contract.

Therefore supported historical save loading does not leave a retired Tavern ending ID available to presentation rendering.

---

## 6. Executable regression evidence already present

`tests/advanced-endings-tranche-a-v11.test.ts` explicitly verifies that:

- retired Tavern ending definitions do not exist;
- D41 migration is idempotent;
- `tavern-stay`, `tavern-guild`, and `tavern-court` completed history migrates to canonical D41 endings;
- `host`, `mediator`, and `court` are removed from migrated Meta unlocks;
- a historical completed `tavern-court` RunResult becomes `ending.tavern.information-broker`;
- legacy eligibility is removed;
- a second save parse does not reintroduce legacy state.

`tests/tavern-runtime.test.ts` and `tests/chat3-tavern-live-authored-v15.test.ts` also explicitly assert that the three retired IDs are not modern Tavern endings.

No v30 test change is required for this audit.

---

## 7. Presentation generation / fallback behavior

`presentationIdForEnding(endingId)` derives an ending presentation ID from the ending ID.

However `presentationSlots(catalog)` creates generic ending slots only from the current live `catalog.definitions.endings`.

Because the three retired Tavern IDs are absent from definitions:

- `ending/tavern-stay` is not generated;
- `ending/tavern-guild` is not generated;
- `ending/tavern-court` is not generated.

The normal ending UI uses the already-migrated `run.endings.result.endingId` / committed ID and then calls `presentationIdForEnding`.

Therefore a historical completed Tavern save resolves to the canonical D41 ending presentation ID, not to a retired Tavern presentation ID.

---

## 8. Caption localization lookup path

The UI renderer does not synthesize a caption localization key from an ending ID.

For a resolved media candidate it does:

1. read that candidate's actual `altKey`;
2. if the key ends in `.alt`, derive the paired `.caption`;
3. resolve that caption only for the media candidate that was actually selected.

Thus a stale localization row by itself is inert.

Since no live or generated presentation slot points to any of the three retired Tavern alt keys, their paired captions cannot be reached through the normal renderer.

---

## 9. Presentation manifests / registry

Audited current presentation support artifacts include:

- `presentation-hardening-v9-manifest-v1.json`
- `presentation-production-binding-v7-manifest-v1.json`
- `presentation-target-registry.fixture.json`
- `presentation-legacy-migration.fixture.json`
- presentation ending/stale-binding tests

No audited manifest, registry, or migration fixture references:

- `tavern-stay`
- `tavern-guild`
- `tavern-court`
- any of the six retired Tavern presentation localization keys

So the six rows are not retained for editor, registry, source-manifest, or presentation-migration compatibility.

---

## 10. Migration/history display consumers

No supported runtime history surface was found that renders an old Tavern RunResult before D41 canonicalization.

All normal loaded saves pass through `parseSave` before rendering.

The current UI's ending state and final-screen identity both consume the migrated state.

Result:

**no migration/history display consumer requires the six retired alt/caption rows.**

---

## 11. Unlock-label consumer check

The UI contains a generic Meta-unlock label resolver:

`unlock.${k}.label`

So localization keys such as:

- `unlock.host.label`
- `unlock.mediator.label`
- `unlock.court.label`

belong to a different compatibility surface from the six presentation rows.

D41 migration currently strips the corresponding retired IDs before normal UI rendering, but these labels are not part of the v30 deletion request.

Disposition:

- do not delete them in v30;
- do not use their existence as justification for keeping retired Tavern presentation alt/caption rows;
- any future cleanup of retired unlock labels should be a separate assembled-head audit.

---

## 12. Retired Tavern ending title / description localization

The following separate migration-oriented localization rows remain:

- `ending.tavern-stay.title`
- `ending.tavern-stay.description`
- `ending.tavern-guild.title`
- `ending.tavern-guild.description`
- `ending.tavern-court.title`
- `ending.tavern-court.description`

They explicitly describe the IDs as retired / migrated.

No live consumer was found during v30, because supported save loading canonicalizes old IDs before UI rendering and the current catalog does not contain those endings.

However these six text rows are outside the v30 deletion target and should remain untouched until Leader explicitly authorizes a broader migration-localization cleanup.

They are not dependencies of the six presentation rows.

---

# 13. Final row classification

## Safe to delete

All six targeted rows:

1. `presentation.static.ending.tavern-stay.alt`
2. `presentation.static.ending.tavern-stay.caption`
3. `presentation.static.ending.tavern-guild.alt`
4. `presentation.static.ending.tavern-guild.caption`
5. `presentation.static.ending.tavern-court.alt`
6. `presentation.static.ending.tavern-court.caption`

Reason:

- no live definitions;
- no live presentation slots;
- no manifest/registry references;
- no migration-history presentation consumer;
- historical RunResult IDs canonicalize before rendering;
- renderer reaches captions only from a resolved live altKey.

## Must keep for compatibility

Among the six targeted rows:

**none**

## Final assembled-head verification required

Before deleting the six rows on the final release assembly, verify exactly:

1. no definition with ID `tavern-stay`, `tavern-guild`, or `tavern-court`;
2. no presentation slot ID or override containing those IDs;
3. no slot has any of the three retired Tavern alt keys;
4. D41 migration still runs before save reference validation / UI rendering;
5. historical completed RunResult IDs still canonicalize to D41 endings;
6. retired committed-but-unfinished Tavern state is still cancelled;
7. no new history/debug UI has been introduced that intentionally displays raw retired media.

If all seven remain true, deletion is safe and requires no runtime change.

---

## 14. Recommended producer follow-up

If Leader wants the cleanup applied, create a localization-only producer that:

- deletes exactly the six rows;
- changes no other localization key;
- adds one focused static test proving:
  - the six rows are absent;
  - the retired ending IDs remain absent from definitions and presentation;
  - D41 migration mappings remain unchanged.

No presentation routing or runtime change is needed.

---

No files other than this audit handoff were intentionally changed by v30.

**READY_FOR_LEADER_REVIEW**
