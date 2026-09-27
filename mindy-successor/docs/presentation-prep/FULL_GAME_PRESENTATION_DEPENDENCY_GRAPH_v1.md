# Full-Game Presentation Production Dependency Graph v1

Purpose: show the dependency order for full-game presentation production so media work can be scheduled without blocking gameplay implementation.

This graph separates content authoring, semantic identity, media production, fallback validation, replacement, rollback and QA.

## High-level dependency graph

```text
CAREER AUTHORING --------------------SCHOOL AUTHORING ---------------------POVERTY / SECRET DEBT AUTHORING -------+--> AUTHORED CONTENT IDENTITY
ACTIVITY ROUTE / CHALLENGE AUTHORING --/
PALACE / META AUTHORING --------------/

AUTHORED CONTENT IDENTITY
        |
        v
SEMANTIC presentationId ASSIGNMENT
        |
        +--------------------+
        |                    |
        v                    v
REUSE-GROUP SELECTION   FALLBACK DEFINITION
        |                    |
        v                    v
GIF / STATIC BRIEF      STATIC / TEXT VALIDATION
        |                    |
        +----------+---------+
                   |
                   v
MEDIA PRODUCTION / IMPORT
                   |
                   v
ANIMATIONS-ON / OFF PREVIEW
                   |
                   v
SAVE / RELOAD VALIDATION
                   |
                   v
REPLACEMENT PACKAGE VALIDATION
                   |
                   v
ROLLBACK VALIDATION
                   |
                   v
BATCH ACCEPTANCE / QA
```

## 1. Content-authoring dependencies

### Careers

Presentation depends on authored:
- repeatable work/action IDs;
- result IDs where distinct;
- milestone/event IDs;
- relationship/Night IDs;
- ending IDs;
- optional Activity/item continuation IDs.

Lumber already has substantial shipped semantic coverage.

Other careers should not receive final unique presentation IDs until production content identity exists.

### School

Already authored:
- eight paid lesson semantic identities;
- real blocking School scene identity.

Still content-dependent:
- teacher/presenter-specific visual content;
- management/accounting public-result identity;
- Arcana/Forest public-result identity;
- optional certificate/project/exam content retained by Product.

### Poverty / Secret Debt

Presentation depends on authored:
- housing/lodging identities;
- ordinary street-event identities;
- Secret Debt lender offer;
- delayed activation;
- hidden daytime work;
- forced Night;
- hidden-career endings/outcomes.

Ordinary poverty and Secret Debt may reuse media while remaining semantically distinct.

### Activity

Already authored:
- generic Forest route presentation;
- success / escape / failure result identities.

Still content-dependent:
- hunter-trail;
- challenge-family content;
- seasonal topology content;
- Old Boundary context-specific presentation where Product decisions affect meaning.

### Palace / Meta

Presentation waits for authoritative authored:
- Palace role/domain identity;
- repeatable assignments;
- court events;
- Palace outcomes;
- any distinct visible Meta reveal/transition.

Do not create final Palace/Meta semantic IDs from draft labels alone.

## 2. Semantic-ID dependency

A final semantic `presentationId` requires:
1. approved content/gameplay identity;
2. known owning subsystem;
3. stable variant/outcome identity where applicable;
4. collision-free namespace;
5. save identity owner.

A media producer can work from a semantic brief only after this dependency is satisfied.

## 3. Media-production dependency

GIF/static production requires:
- semantic ID;
- gameplay/content context;
- visual subject/action;
- reuse-vs-dedicated decision;
- static fallback;
- text fallback;
- accessibility meaning;
- approval reference.

Media production does not require:
- gameplay source-code editing;
- schema editing;
- balance tuning;
- animation timing hooks.

## 4. Fallback dependency

Every dynamic asset package must be paired with:
- existing or approved static fallback;
- text-safe fallback where needed;
- animation-off behavior;
- missing-primary behavior.

Fallback validation may proceed before the GIF exists.

This lets gameplay/content implementation continue without waiting for animation.

## 5. Replacement / rollback dependency

Replacement can be productized only after:
- semantic ID is stable;
- fallback is safe;
- media kind is known;
- override scope is known;
- rollback target is known.

Rollback validation must prove:
- shipped fallback returns;
- unrelated semantic mappings remain valid;
- gameplay/save state is unchanged.

## 6. Scheduling lanes

### Lane A — gameplay/content authoring
Can proceed independently:
- careers;
- School public results;
- poverty;
- Secret Debt;
- Forest route/challenge depth;
- Palace/Meta.

### Lane B — presentation identity
Starts per authored content unit as soon as source identity is approved.

Outputs:
- semantic ID;
- owner;
- reuse group;
- fallback class.

### Lane C — asset production
Starts once semantic brief is ready.

Can be batched by:
- shared action motif;
- location;
- season;
- relationship context;
- result/ending family.

### Lane D — validation
Runs when media is available:
- import;
- animations-on/off;
- missing-primary;
- save/reload;
- rollback;
- zero gameplay mutation.

## 7. Non-blocking rule

Gameplay implementation must not wait for GIF production when:
- semantic content identity is known;
- static/text fallback is sufficient;
- no visible authored scene requires a unique asset for correctness.

Likewise, Presentation must not invent gameplay identity merely to keep asset production busy.

## 8. Dependency-state labels

Use:

- `CONTENT_OPEN`
- `CONTENT_APPROVED`
- `SEMANTIC_ID_READY`
- `FALLBACK_READY`
- `MEDIA_BRIEF_READY`
- `MEDIA_IN_PRODUCTION`
- `MEDIA_IMPORTED`
- `QA_PENDING`
- `ACCEPTED`

These labels describe production readiness, not gameplay progression.

## Lead scheduling rule

Lead can schedule media work as soon as a content unit reaches:

`CONTENT_APPROVED -> SEMANTIC_ID_READY -> FALLBACK_READY -> MEDIA_BRIEF_READY`

Everything before that belongs to content/Product authoring.

Everything after that belongs to media production and presentation QA.
