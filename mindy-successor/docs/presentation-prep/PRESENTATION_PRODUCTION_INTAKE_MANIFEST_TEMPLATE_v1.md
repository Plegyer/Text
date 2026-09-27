# Presentation Production Intake Manifest Template v1

Use this intake manifest when newly authored gameplay/content is ready for GIF/static presentation production.

The manifest is designed for batch handoff from career, School, poverty, Night, Activity, Palace, ending or Meta authors without manual source-code path editing.

---

## Intake metadata

**Package / batch name**
`<human-readable production package name>`

**Owning subsystem**
`<career | school | poverty | night | activity | palace | ending | meta | other-authorized-domain>`

**Product/content approval reference**
`<decision doc / approved authoring packet / commit / issue / other authoritative reference>`

**Authoring status**
`APPROVED_FOR_PRESENTATION | CONTENT_STILL_OPEN`

If `CONTENT_STILL_OPEN`, do not finalize new semantic IDs or unique media bindings.

---

## Asset row template

### 1. Source gameplay/content identity

**Source gameplay/content ID**
`<exact authored ID>`

Examples of source type:
- action;
- result;
- event;
- event variant;
- route;
- challenge;
- lodging state;
- Night event;
- ending;
- Meta transition.

Do not use a filename as the source identity.

### 2. Semantic presentation identity

**presentationId**
`<exact slash-taxonomy semantic ID>`

Requirements:
- exact and canonical;
- stable across media replacement;
- collision-checked;
- not derived from filename;
- not dependent on animation state.

If the source content identity is not yet final, write:

`UNASSIGNED_UNTIL_CONTENT_AUTHORED`

### 3. Visual requirement

**Visual requirement**
`REQUIRED_FOR_AUTHORED_DEPTH | OPTIONAL_POLISH | REUSE_EXISTING`

This field describes product dependency only.

It does not rank aesthetic importance.

### 4. Intended media

**Primary media kind**
`gif | image | none`

**Approved media file / managed reference**
`<operator-selected/imported media reference or NONE>`

Do not provide a repository source path as the operator workflow.

### 5. Reusable media group

**reuseGroup**
`<approved media reuse group or NONE>`

Examples:
- manual-work-loop;
- classroom-loop;
- street-night-setting;
- forest-route-loop;
- relationship-professional;
- ending-epilogue.

A reuse group never replaces semantic presentation identity.

### 6. Static fallback requirement

**Static fallback**
`<approved static media / semantic fallback ID>`

**Fallback required**
`YES`

Unless a separately approved product contract says otherwise, every dynamic media slot must remain safe when the primary asset is missing.

### 7. Text fallback

**Text fallback / accessible meaning**
`<approved authored text meaning>`

Required when the scene could otherwise become unclear without media.

Essential gameplay meaning must not depend on frame timing.

### 8. Animations-off requirement

**Animations-off behavior**
`<static fallback / semantic fallback / text-safe terminal>`

Required invariants:
- same semantic `presentationId`;
- same gameplay controls;
- same available actions;
- same mechanics;
- no animation-completion dependency.

### 9. Save identity owner

Choose the authoritative gameplay owner:

`lastAction | pendingScene | NightFlow | Activity | endingState | RunResult | NewRunLocation | <other explicitly authored owner>`

**saveIdentityOwner**
`<one value>`

Presentation media itself never owns save identity.

### 10. Replacement/import readiness

**Replacement allowed**
`YES | NO`

If YES, record:
- expected media kind;
- fallback preservation requirement;
- alt/accessibility text;
- rollback target;
- whether this row is part of a larger batch.

### 11. Content dependency

**Content authoring dependency**
`NONE | <exact unresolved content/Product decision>`

If non-NONE:
- do not invent missing event IDs;
- do not invent thresholds;
- do not invent providers;
- do not invent route/capability identity;
- do not invent character identity merely to unblock art.

### 12. Verification requirements

Mark all required checks:

- [ ] semantic-ID collision audit
- [ ] source content ID verified
- [ ] media kind validated
- [ ] fallback exists
- [ ] text/alt meaning approved
- [ ] animations-on preview
- [ ] animations-off preview
- [ ] missing-primary fallback smoke
- [ ] save/reload smoke
- [ ] rollback smoke
- [ ] zero gameplay-state mutation confirmed

---

## Batch-level validation

Before a batch is accepted:

### Semantic manifest
- every row has an exact source gameplay/content identity or is explicitly marked not ready;
- every final semantic ID is unique;
- no dotted/slash aliases;
- no underscore/kebab collision;
- no route/challenge collision;
- no shipped semantic ID renamed.

### Dependency validation
- all `REQUIRED_FOR_AUTHORED_DEPTH` rows have approved content identity;
- all `OPTIONAL_POLISH` rows have safe existing fallback;
- all `REUSE_EXISTING` rows reference an approved reusable media group/fallback.

### Fallback validation
- no fallback cycle;
- no missing required static fallback;
- no batch row requires GIF playback to proceed.

### Save ownership
- every row identifies a gameplay state owner;
- no row stores frame/time/playback state.

### Operator handoff
The operator receives:
- this manifest;
- approved media files;
- approved semantic mapping;
- fallback mapping;
- accessibility text;
- approval reference.

The operator does not need:
- source-code path editing;
- gameplay-rule editing;
- schema editing.

---

## Minimal example — structure only

```text
sourceGameplayId: <authored-id>
presentationId: <semantic-id>
owningSubsystem: <domain>
visualRequirement: OPTIONAL_POLISH
primaryMediaKind: gif
approvedMediaReference: <managed-import>
reuseGroup: <group>
staticFallback: <static-or-semantic-fallback>
textFallback: <approved meaning>
animationsOff: <static fallback>
saveIdentityOwner: <gameplay owner>
productApprovalReference: <authority>
```

This example does not authorize any new gameplay/content identity.

---

## Intake acceptance rule

A presentation package is ready for asset production only when:

1. content identity is approved;
2. semantic presentation identity is canonical and collision-free;
3. required/optional status is explicit;
4. reuse group is media-only;
5. fallback is valid;
6. animations-off behavior is safe;
7. save owner is gameplay state;
8. Product/content approval reference exists;
9. operator can execute import/preview/reload/rollback without editing source paths.
