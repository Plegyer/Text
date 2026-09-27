# Full-Game Presentation Implementation Package Boundary v1

Purpose: define bounded future implementation packages for presentation work while keeping content authoring, runtime behavior, media import and QA separate.

The boundary preserves one invariant throughout:

**presentation must not own gameplay timing, progression or action availability.**

---

## Package A — semantic ID / content mapping

### Inputs
- approved gameplay/content IDs;
- owner subsystem;
- variant/result/route/ending identity;
- Product/content approval reference.

### Outputs
- canonical semantic `presentationId`;
- save identity owner;
- reuse-group metadata;
- replacement scope classification.

### Allowed changes
- presentation manifests;
- semantic mapping tables;
- presentation-only tests/docs.

### Forbidden changes
- gameplay conditions/effects;
- balance values;
- action availability;
- event progression;
- animation timing hooks.

### Dependency
Requires stable authored content identity.

---

## Package B — shipped fallback registration

### Inputs
- semantic presentation IDs;
- approved static assets or semantic fallback targets;
- approved text/accessibility meaning.

### Outputs
- static fallback registration;
- semantic fallback chain;
- animations-off terminal;
- missing-primary behavior.

### Acceptance
- cycle-free fallback;
- static/text fallback remains understandable;
- missing GIF is non-fatal;
- same gameplay controls animations on/off.

### Dependency
Can be implemented before final GIF production.

---

## Package C — batch GIF/static import

### Inputs
- approved semantic media briefs;
- batch manifest;
- managed media files;
- reuse-group metadata;
- fallback mapping.

### Outputs
- imported media mappings;
- primary media registrations;
- per-slot or reuse-group mappings;
- import validation evidence.

### Acceptance
- canonical IDs only;
- media kind valid;
- alt/accessibility text present;
- no source-path editing workflow;
- no gameplay fields in payload.

### Dependency
Requires Package A and Package B for every final slot.

---

## Package D — user override / replacement

### Inputs
- stable semantic IDs;
- supported replacement package version;
- known fallback targets;
- replacement scope.

### Outputs
- validated override mappings;
- deterministic import/export;
- stale/unknown target rejection;
- preview behavior.

### Acceptance
- override changes media only;
- semantic identity unchanged;
- save/gameplay state unchanged;
- animations-off remains safe.

### Dependency
Requires stable semantic IDs and fallback registration.

---

## Package E — rollback

### Inputs
- current active override set;
- shipped fallback map;
- semantic target(s) to restore.

### Outputs
- override removed/disabled;
- shipped fallback restored;
- deterministic remaining mappings.

### Acceptance
- no orphan mapping;
- unrelated mappings remain intact;
- save/gameplay state byte-equivalent where expected;
- no content/gameplay ID rename.

### Dependency
Requires Package D replacement semantics or another explicit override layer.

---

## Package F — presentation QA

### Inputs
- semantic mapping;
- fallback map;
- imported media;
- replacement/rollback behavior;
- representative save boundaries.

### Required QA classes
- semantic ID collision;
- missing primary;
- missing static;
- text-safe fallback;
- animations-off;
- save/reload;
- pending scene identity;
- Activity route/checkpoint identity;
- ending identity;
- stale replacement rejection;
- rollback;
- zero gameplay-state mutation;
- accessibility/context correctness.

### Outputs
- batch acceptance evidence;
- regression tests;
- implementation handoff checksum.

---

# Authoring vs implementation boundary

## Content/Product owns
- gameplay/content ID;
- visible scene meaning;
- choices/outcomes;
- route/challenge identity;
- teacher/character identity;
- ending identity;
- whether a distinct scene exists;
- optional visual priority decisions.

## Presentation mapping owns
- semantic `presentationId`;
- media reuse grouping;
- fallback class;
- animation-off presentation behavior;
- replacement/rollback metadata.

## Media production owns
- actual GIF/static files;
- approved visual execution;
- file-level delivery quality.

## Runtime owns
Only already-approved generic presentation mechanics such as resolution/fallback plumbing.

A new media asset must not require runtime changes unless a concrete technical defect is demonstrated.

---

# Dependency ordering

```text
CONTENT AUTHORING
      |
      v
PACKAGE A: SEMANTIC MAP
      |
      v
PACKAGE B: FALLBACK REGISTRATION
      |
      +--------------+
      |              |
      v              v
PACKAGE C: MEDIA   PACKAGE D: REPLACEMENT
      |              |
      +------+-------+
             |
             v
PACKAGE E: ROLLBACK
             |
             v
PACKAGE F: QA / CHECKSUM
```

Package D may be deferred entirely if user replacement is not productized yet.

---

# Zero timing-coupling boundary

None of Packages A–F may introduce:
- frame-index-driven mechanics;
- elapsed-media-time conditions;
- playback-completion gating;
- loop-count save state;
- action availability tied to animation;
- result commitment tied to media completion.

Gameplay flow remains authoritative.

---

# Bounded implementation rule

A future PR/package should name exactly which boundary it owns.

Examples:

### Semantic-only package
May add:
- semantic map;
- tests;
- docs.

Must not add media or gameplay mechanics.

### Fallback-only package
May add:
- static/text fallback mapping;
- fallback QA.

Must not change content identity.

### Media-only package
May add:
- GIF/static files;
- presentation mapping.

Must not alter gameplay.

### Override-only package
May add:
- import/export/replacement plumbing;
- replacement QA.

Must not redefine semantic IDs.

### QA-only package
May add tests/evidence only.

---

# Package acceptance checklist

Every implementation package must state:

- [ ] package type A–F;
- [ ] input authority;
- [ ] exact semantic IDs affected;
- [ ] files owned;
- [ ] fallback impact;
- [ ] animation-off impact;
- [ ] save/reload impact;
- [ ] replacement/rollback impact;
- [ ] gameplay mutation expected: **NO**;
- [ ] source-path editing required: **NO**.

This boundary lets full-game media implementation scale without reopening green gameplay/presentation timing contracts.
