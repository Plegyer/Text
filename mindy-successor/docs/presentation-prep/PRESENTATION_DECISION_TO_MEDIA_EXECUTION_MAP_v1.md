# Presentation Decision-to-Media Execution Map v1

Purpose: map one approved human/Product visual decision into a safe production media update.

Presentation/media work remains separate from gameplay mechanics.

## Execution path

```text
HUMAN / PRODUCT VISUAL DECISION
        |
        v
CONTENT IDENTITY CONFIRMATION
        |
        v
SEMANTIC presentationId
        |
        v
SEMANTIC MEDIA BRIEF
        |
        v
GIF / STATIC PRODUCTION
        |
        v
IMPORT / MEDIA MAPPING
        |
        v
FALLBACK VERIFICATION
        |
        v
ANIMATIONS-OFF VERIFICATION
        |
        v
SAVE / RELOAD SMOKE
        |
        v
ROLLBACK SMOKE
        |
        v
ACCEPTANCE EVIDENCE
```

---

## Step 1 — decision reference

Record:

```text
decisionRef:
decisionOwner:
system:
decisionType:
approvedVisualScope:
```

Decision types may include:
- dedicated asset approved;
- reusable asset approved;
- animation approved;
- static-only approved;
- polish deferred.

### Mandatory
Yes.

### Gameplay dependency
None. The decision concerns presentation scope only.

---

## Step 2 — authored content identity

Record the exact current:
- gameplay/content ID;
- variant/route/outcome ID where applicable;
- source authority.

Run stale-content rejection before continuing.

### Mandatory
Yes.

### Stop condition
If content identity is OPEN or superseded, stop final media production.

Optional placeholder/static work may continue.

---

## Step 3 — semantic presentationId

Confirm:
- canonical slash ID;
- collision-free;
- current;
- not filename-derived;
- same identity before/after media replacement.

### Mandatory
Yes.

### Gameplay dependency
None beyond approved content identity.

---

## Step 4 — semantic media brief

Create one brief containing:
- gameplay/content context;
- visual subject/action;
- reusable vs dedicated;
- context/season variants;
- static fallback;
- text fallback;
- accessibility alt;
- animation-off behavior;
- approval reference;
- `mechanicalDependency: NONE`.

### Mandatory
Yes for new unique production media.

### Optional polish
A scene with existing safe media can remain unchanged without a new brief.

---

## Step 5 — GIF/static production

Asset producer creates:
- approved GIF;
- approved static image;
- or both.

Producer does not need:
- conditions/effects;
- balance values;
- save schema;
- gameplay source-code paths;
- action availability logic.

### Mandatory
Only if the approved decision requires new media.

### Optional
Reuse-existing decisions skip new production.

---

## Step 6 — import mapping

Map produced media to the exact semantic `presentationId`.

Validate:
- media kind;
- managed/portable reference;
- reuse group;
- alt/accessibility text;
- no stale/unknown ID;
- no duplicate conflicting mapping.

### Mandatory
Yes for new/replaced media.

---

## Step 7 — fallback verification

Before acceptance:
- static fallback exists;
- semantic fallback remains valid;
- text fallback remains usable;
- no fallback cycle;
- missing primary is non-fatal.

### Mandatory
Yes.

A new GIF must not remove a previously safe fallback.

---

## Step 8 — animations-off verification

Disable animation and verify:
- same presentationId;
- static/text fallback selected;
- gameplay controls unchanged;
- choices/actions unchanged;
- mechanics unchanged.

### Mandatory
Yes for animated media.

### Static-only media
Record `NOT_APPLICABLE_STATIC_PRIMARY`, while fallback remains checked.

---

## Step 9 — save/reload smoke

Use a representative real boundary based on the save identity owner.

Examples:
- `lastAction`;
- `pendingScene`;
- `NightFlow`;
- `Activity`;
- `endingState`;
- `RunResult`;
- `NewRunLocation`.

Verify:
- gameplay identity survives;
- semantic identity survives where persisted;
- no effect/cost/reward replays;
- no frame/time/playback state persists.

### Mandatory
Yes for accepted production integration.

---

## Step 10 — rollback

Remove/disable the new mapping.

Verify:
- shipped/approved fallback returns;
- unrelated mappings remain intact;
- no orphan target remains;
- gameplay/save state unchanged.

### Mandatory
Yes when replacement/override workflow is supported.

For immutable shipped media integration, record the source-control revert/previous-fallback recovery method explicitly.

---

## Step 11 — acceptance evidence

Record:

```text
decisionRef:
sourceContentAuthority:
presentationId:
mediaBriefVersion:
assetRef:
reuseGroup:
fallbackResult:
animationsOffResult:
saveReloadResult:
rollbackResult:
gameplayInvariantResult:
reviewer:
implementationCommit:
status:
```

Statuses:
- `ACCEPTED`
- `ACCEPTED_WITH_OPTIONAL_POLISH_OPEN`
- `REJECTED`
- `REBRIEF_REQUIRED`

---

# Mandatory vs optional matrix

| Stage | Mandatory | Optional / conditional |
| --- | --- | --- |
| decision reference | yes | — |
| content identity | yes | — |
| semantic presentationId | yes | — |
| semantic media brief | yes for new unique media | may skip for unchanged reused asset |
| new media production | only when approved decision requires it | reuse existing |
| import mapping | yes for new/replaced media | none for unchanged mapping |
| fallback verification | yes | — |
| animations-off | yes for animation | static-primary N/A marker |
| save/reload | yes for production acceptance | — |
| rollback | yes for override/replacement; recovery method otherwise | — |
| acceptance evidence | yes | — |

---

# Optional-polish path

If Product decides that a scene does not need dedicated media:

```text
decision: REUSE_EXISTING or DEFER
-> keep semantic presentationId
-> keep shipped/static/text fallback
-> record decision
-> no new asset required
```

This is a valid completed decision.

Optional polish must not block gameplay/content implementation.

---

# No gameplay dependency rule

This execution map must never introduce:
- Energy/money/stat changes;
- item/capability changes;
- route availability;
- event conditions/effects;
- ending eligibility;
- RNG changes;
- animation-completion gating;
- animation frame/time save state.

Media updates change presentation only.

---

# Drift protection

Before import:
1. recheck source content identity;
2. recheck semantic ID;
3. compare media brief authority;
4. reject stale/superseded work;
5. update handoff checksum after accepted mapping changes.

This closes the loop between human decision, content authoring and media implementation without making visual production a gameplay dependency.
