# Presentation Production Batch Acceptance Ledger v1

Purpose: provide a compact, repeatable acceptance record for each future media-production batch.

One ledger entry should be created per accepted batch.

## Batch header

**Batch ID**
`<stable batch identifier>`

**Source content batch**
`<career / School / poverty / Activity / Palace / ending package>`

**Content-authoring authority**
`<doc / commit / approved packet>`

**Presentation batch owner**
`<owner>`

**Reviewer**
`<reviewer>`

**Acceptance date / commit**
`<value>`

---

## 1. Semantic IDs covered

Record the exact semantic presentation IDs included in the batch.

```text
presentationIds:
- <id-1>
- <id-2>
- <id-N>
```

Acceptance:
- [ ] all IDs are canonical;
- [ ] no duplicates;
- [ ] no shipped ID renamed;
- [ ] no OPEN content identity inferred.

## 2. Fallback coverage before

For each semantic ID record:
- existing static fallback;
- semantic fallback if any;
- text fallback;
- animations-off terminal.

```text
before:
  <presentationId>:
    static: <asset-or-none>
    semanticFallback: <id-or-none>
    text: <available/none>
```

Acceptance:
- [ ] all required slots are already non-fatal before replacement;
- [ ] no fallback cycle.

## 3. Reused assets

List assets already present and reused by this batch.

```text
reusedAssets:
- asset: <managed-ref>
  semanticIds: [<id>, <id>]
  reuseGroup: <group>
```

Acceptance:
- [ ] reuse is intentional;
- [ ] gameplay identities remain distinct;
- [ ] context/alt meaning remains correct.

## 4. Newly added assets

```text
newAssets:
- asset: <managed-ref>
  kind: <gif|image>
  semanticIds: [<id>]
  requiredOrOptional: <REQUIRED_FOR_AUTHORED_DEPTH|OPTIONAL_POLISH>
```

Acceptance:
- [ ] media kind valid;
- [ ] reference portable/managed;
- [ ] no source-path editing required;
- [ ] accessibility text present.

## 5. Fallback coverage after

Record final fallback state for every covered semantic ID.

Acceptance:
- [ ] adding new media did not remove the prior safe fallback;
- [ ] animations-off path remains valid;
- [ ] missing-primary injection remains non-fatal;
- [ ] text-safe terminal still exists where required.

## 6. Animations-off verification

Record:
- semantic ID tested;
- media selected with animations on;
- fallback selected with animations off;
- gameplay controls comparison.

Acceptance:
- [ ] same semantic presentation ID;
- [ ] same available gameplay actions;
- [ ] no mechanic changes;
- [ ] no animation-completion dependency.

## 7. Save/reload verification

Representative boundaries tested:
- [ ] action/result
- [ ] pending scene
- [ ] Night
- [ ] Activity
- [ ] ending / RunResult
- [ ] New Run / Meta where applicable

Evidence:
`<test / smoke / commit / notes>`

Acceptance:
- [ ] gameplay identity preserved;
- [ ] no effects replayed;
- [ ] no frame/time/playback state persisted.

## 8. Replacement / rollback result

Record:
- replacement scope;
- one-slot rollback result;
- reuse-group rollback result if applicable;
- full-batch rollback result.

Acceptance:
- [ ] shipped fallback restored;
- [ ] no orphan mapping;
- [ ] deterministic export/import ordering where used;
- [ ] unrelated semantic mappings remain intact.

## 9. Gameplay-state invariance

Compare gameplay state before/after:
- import;
- preview;
- animations toggle;
- persist;
- rollback.

Fields that must remain presentation-independent:
- resources;
- stats;
- inventory/capabilities;
- career/School progression;
- Night state;
- Activity route/checkpoint;
- ending state;
- Meta state;
- RNG state.

**Result**
`PASS | FAIL`

## 10. Reviewer / acceptance evidence

Record:
- reviewer;
- verification command/test;
- commit SHA;
- screenshots/notes if relevant;
- unresolved non-blocking asset notes.

**Final batch status**
`ACCEPTED | REJECTED | ACCEPTED_WITH_OPTIONAL_POLISH_OPEN`

## Compact ledger row

For summary tables, use:

| Batch | Source content | IDs | Reused | New | Fallback before/after | Anim-off | Save/reload | Rollback | Gameplay invariant | Reviewer | Status |
| --- | --- | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- |
| <id> | <source> | <n> | <n> | <n> | PASS/FAIL | PASS/FAIL | PASS/FAIL | PASS/FAIL | PASS/FAIL | <name> | <status> |

## Acceptance rule

A production media batch is complete only when:
1. semantic IDs are validated;
2. fallback coverage is documented before and after;
3. reused and new assets are explicit;
4. animations-off verification passes;
5. save/reload smoke passes;
6. replacement/rollback passes;
7. gameplay-state invariance passes;
8. reviewer evidence is recorded.
