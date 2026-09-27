# Full-Game Media Production Batch Template v1

Purpose: provide a reusable packet for producing multiple GIF/static presentation assets in one batch while keeping media production separate from gameplay authoring.

---

## Batch identity

**Batch ID**
`<stable batch key>`

**System scope**
`<career | school | poverty | activity | palace | ending | mixed approved package>`

**Source-content authority**
`<approved document / commit / authoring package>`

**Batch status**
`DRAFT | APPROVED_FOR_MEDIA | IN_PRODUCTION | READY_FOR_IMPORT | ACCEPTED`

Do not move to `APPROVED_FOR_MEDIA` while content identity is still open.

---

## 1. Semantic IDs

List every semantic presentation ID in the batch.

```text
semanticIds:
- <presentationId-1>
- <presentationId-2>
- ...
```

For each row also record:
- source gameplay/content ID;
- save identity owner;
- required vs optional visual status.

Acceptance:
- [ ] IDs canonical;
- [ ] source IDs approved;
- [ ] no duplicates/collisions;
- [ ] no provisional content IDs.

---

## 2. Shared location / action motif

Describe the shared visual production motif, if any.

Examples:
- manual work;
- classroom/study;
- street-night exterior;
- Forest traversal;
- court service;
- epilogue/result.

**Shared motif**
`<approved concise visual motif or NONE>`

The motif is media-production metadata only.

It must not replace semantic presentation identity.

---

## 3. Reusable loops

List reusable assets planned for multiple semantic IDs.

```text
reusableLoops:
- reuseGroup: <group>
  visualIntent: <short description>
  semanticIds:
    - <id>
    - <id>
  mediaKind: gif | image
```

Checks:
- [ ] each target semantic ID remains distinct;
- [ ] context remains correct for every mapping;
- [ ] alt/accessibility text may differ per mapping;
- [ ] rollback scope is known.

---

## 4. Dedicated exceptions

List scenes that must not use the batch’s shared loop.

Typical reasons:
- unique reveal;
- named relationship beat;
- route-specific distinction;
- ending/outcome;
- materially different location;
- accessibility/context mismatch.

```text
dedicated:
- presentationId: <id>
  reason: <approved reason>
  mediaKind: gif | image
```

No dedicated exception is created solely because a semantic ID is unique.

---

## 5. Season / context variants

Record only authored variants.

```text
variants:
- presentationId: <id>
  season: none | spring | summer | autumn | winter
  careerStage: <value-or-none>
  relationshipContext: <value-or-none>
  nightContext: <value-or-none>
  routeOrChallenge: <value-or-none>
```

Do not multiply the asset set automatically.

---

## 6. Static fallback status

For each semantic ID:

```text
fallback:
  <presentationId>:
    static: <asset-or-none>
    semanticFallback: <id-or-none>
    status: READY | CONTENT_TEXT_PENDING | FAIL
```

Batch acceptance requires no blocking fallback gap.

Missing GIF is allowed when fallback is ready.

---

## 7. Text fallback status

For each semantic ID:

```text
textFallback:
  <presentationId>:
    meaning: <approved concise meaning>
    accessibilityReady: yes | no
```

Essential gameplay meaning must remain understandable without motion.

---

## 8. Source-content approval

For each row record:
- source content authority;
- Product/content reviewer;
- whether any Product decision remains open;
- whether that decision can change semantic identity.

If an open decision can change identity:
- remove the row from final media production;
- use placeholder/static fallback only.

---

## 9. Asset delivery table

| presentationId | sourceContentId | mode | reuseGroup | mediaKind | assetRef | staticFallback | textReady | approval |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| <id> | <source> | REUSE/DEDICATED | <group> | gif/image | <managed ref> | <fallback> | yes/no | <ref> |

No repository source-path editing is part of operator delivery.

---

## 10. Animations-off acceptance

For every semantic ID:
- [ ] same presentationId with animations off;
- [ ] static/semantic/text fallback resolves;
- [ ] gameplay controls unchanged;
- [ ] choices/actions unchanged;
- [ ] mechanics unchanged;
- [ ] no animation-completion gating.

Record representative test evidence.

---

## 11. Missing-primary acceptance

For each reuse group and every dedicated critical scene:
- disable/remove primary media;
- resolve presentation;
- verify safe fallback;
- verify scene identity/text remains correct;
- verify no gameplay-state mutation.

---

## 12. Import validation

Before persistence:
- [ ] semantic IDs current;
- [ ] media kind/file type valid;
- [ ] managed references portable;
- [ ] alt/accessibility text present;
- [ ] stale/unknown IDs rejected;
- [ ] duplicate mappings rejected;
- [ ] fallback graph valid.

---

## 13. Save/reload smoke

Select representative batch boundaries.

Possible owners:
- lastAction;
- pendingScene;
- NightFlow;
- Activity;
- endingState;
- RunResult;
- NewRunLocation.

Verify:
- gameplay identity stable;
- semantic identity stable where persisted;
- no result/effect replay;
- no frame/time/playback state serialized.

---

## 14. Import / rollback validation

### Import
- batch validates atomically;
- intended primary media becomes active;
- unrelated mappings unchanged.

### Rollback
Test:
- one semantic slot;
- one reuse group where applicable;
- entire batch.

Verify:
- shipped fallback restored;
- no orphan mapping;
- deterministic remaining mappings;
- gameplay/save state unchanged.

---

## 15. Batch gameplay-separation check

Media batch must contain no gameplay mutations.

Forbidden batch responsibilities:
- changing Energy/money/stats;
- changing choices/effects;
- changing route availability;
- granting capabilities/items;
- changing ending eligibility;
- changing RNG;
- changing save schema to track animation.

**Gameplay mutation expected**
`NO`

---

## 16. Acceptance summary

```text
batchId:
recordCount:
reuseGroupCount:
dedicatedAssetCount:
fallbackCoverage: PASS|FAIL
animationsOff: PASS|FAIL
missingPrimary: PASS|FAIL
saveReload: PASS|FAIL
importValidation: PASS|FAIL
rollback: PASS|FAIL
gameplayInvariant: PASS|FAIL
reviewer:
status: ACCEPTED|REJECTED|ACCEPTED_WITH_OPTIONAL_POLISH_OPEN
```

## Completion rule

A full-game media batch is production-complete only when:
1. source content is approved;
2. semantic IDs are canonical;
3. reusable and dedicated asset scope is explicit;
4. static/text fallback is valid;
5. animations-off passes;
6. missing-primary passes;
7. import validation passes;
8. save/reload passes;
9. rollback passes;
10. gameplay remains unchanged.

The batch may leave optional polish open, but it may not leave semantic identity or fallback correctness unresolved.
