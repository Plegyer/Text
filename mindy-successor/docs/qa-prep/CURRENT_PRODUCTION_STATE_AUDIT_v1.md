# Current Production State Audit v1

Date: 2026-09-27
Worker: Chat 4 / QA Acceptance
Current main: f3f062152752474f3021736772ada26c66635e10

## Current main CI

Latest main commit:
Lead: integrate authored School production content

Post-merge workflow:
- run 36313062104
- tests 286
- pass 286
- fail 0
- validation: 16 packs, 43 events, 35 actions, 9 endings

Open PRs at audit snapshot:
none.

## Status vocabulary

Primary classifications used:
- SHIPPED_BASE
- SHIPPED_CONTENT
- CONTENT_OPEN
- PRODUCT_BLOCKED
- RUNTIME_EXTENSION_REQUIRED

One subsystem may have more than one classification at different depth boundaries.

# 1. Ten ordinary careers

Status:
SHIPPED_BASE + CONTENT_OPEN.

All ten ordinary careers now have:
- target repeatable shift;
- 1 Energy cost;
- typed completed_shifts;
- explicit initial career stage;
- seasonal semantic presentation;
- base save/reload regression.

Career set:
- lumber
- satyr-maid
- undead-farm
- tavern
- hunter
- guard
- merchant
- artist-geisha
- assassin
- prostitute

Only Lumber currently has an authored target Hard Work contract.

The other nine require deeper content and exact Hard Work authoring.

## Lumber

Status:
SHIPPED_CONTENT + CONTENT_OPEN.

Shipped depth includes:
- target Work;
- seasonal shift behavior;
- typed milestone;
- Foreman relationship;
- Night content;
- Forest bridge;
- ending system participation;
- exact Hard Work;
- save/reload and one-Save coverage.

Exact Hard Work remains:
- completed_shifts >= 50
- hardWork:lumber

Still open:
- management/accounting School provider;
- Old Boundary Token natural acquisition/policy;
- broader Forest content depth.

# 2. Ordinary poverty

Status:
SHIPPED_CONTENT.

PR37 is merged.

Evidence:
- exact-head 270/270 PASS;
- post-merge 270/270 PASS.

Current root production catalog contains six authored ordinary-poverty packs:
- poverty-street-production
- poverty-street-production-v2
- poverty-cheap-production
- poverty-cheap-production-v2
- poverty-recovery-production
- poverty-pressure-production

Shipped content now includes:
- ordinary street event depth;
- cheap-lodging context;
- recovery/help content;
- pressure/bad outcomes with safe continuation;
- season/context variation;
- reload/idempotency tests;
- anti-softlock protection.

Secret Debt is not part of these packs.

# 3. School authored production

Status:
SHIPPED_CONTENT + CONTENT_OPEN + PRODUCT_BLOCKED at public-result boundaries.

PR38 is merged.

Evidence:
- final head d3bc471d2f5b92f57da14ba7a15f5932b6113edc;
- exact-head 286/286 PASS;
- merge f3f062152752474f3021736772ada26c66635e10;
- post-merge 286/286 PASS.

Current root catalog now includes:
- school-teachers-v1
- school-lesson-content-v1
- school-life-content-v1

Current shipped authored depth includes:
- eight teacher presentation identities;
- safe generic post-School presentation;
- post-paid-lesson School-life presentation;
- exact existing Night-study presentation hook;
- richer eight-track teacher/lesson libraries retained as staged authored content where exact course routing is not yet available.

Locked mechanics remain unchanged:
- paid tuition/Energy/stat packages;
- paid lessons_completed ownership;
- Night night_study_sessions ownership;
- no ordinary Lust gain;
- no teacher prerequisite.

Still PRODUCT_BLOCKED:
- management/accounting public-result semantics;
- Arcana/Forest public-result scope/provider if retained.

Still CONTENT_OPEN:
- naturally routed per-course teacher/lesson selection;
- deeper relationship content;
- milestone/project/certificate/exam authoring where approved;
- richer media depth.

# 4. Forest / Activity

Status:
SHIPPED_BASE + CONTENT_OPEN + PRODUCT_BLOCKED at selected authoring boundaries.

Shipped:
- Activity envelope;
- route/options model;
- natural logging-road path;
- old-boundary capability gate;
- save/resume;
- success/escape;
- Lumber continuation.

Exact successful public boundary remains:
activityResult(lumber.forest, success, lumber.forest.success)

Still CONTENT_OPEN:
- fuller route/challenge depth;
- navigation challenge family;
- physical-obstacle family;
- interpretation/ritual-anomaly family;
- stronger seasonal topology/content;
- additional NPC/quest depth.

Still PRODUCT_BLOCKED:
- final hunter-trail unlock source;
- Old Boundary Token natural acquisition/policy.

No generic Activity runtime rewrite is currently required for those authored depth goals.

# 5. Secret Debt

Status:
PRODUCT_BLOCKED + CONTENT_OPEN.

Current root production definitions contain no Secret Debt/hidden-debt production state/content.

Ordinary poverty remains independent.

Structural Product authority exists for:
- one-time lender encounter;
- accept/refuse;
- delayed activation;
- ordinary-career lock after activation;
- forced Night obligation;
- three outcome families;
- exclusion from Palace 10/10.

Remaining Product behavior choices include:
- School availability while bound;
- large Activity availability while bound;
- forced Night vs lodging payment;
- next-day modifier composition;
- final balance/reward tuning.

Generic technical preparation is possible, but the complete production loop must not guess these answers.

# 6. Multi-GIF presentation

Status:
SHIPPED_BASE + RUNTIME_EXTENSION_REQUIRED.

Current shipped presentation runtime already has:
- semantic presentation IDs;
- primary GIF override;
- static override;
- catalog media;
- fallback chains;
- ordered resolved candidates;
- Animation Off;
- safe media-error fallback.

Current UI:
- starts at media candidate index 0;
- advances to the next candidate on media error;
- does not intentionally select/rotate a 3–5 GIF presentation pool.

Therefore explicit multi-GIF variety requires a bounded presentation-layer runtime extension.

It must remain:
- deterministic/presentation-only;
- independent of gameplay RNG;
- independent of frame/time Save state.

Review gate:
MULTI_GIF_RUNTIME_IMPLEMENTATION_REVIEW_GATE_v1.md

# 7. Palace / Meta

## Meta

Status:
SHIPPED_BASE.

Current schema/engine already contains:
- ordinaryHardWorkCareers with all 10 ordinary career IDs;
- Meta hardWorkProgress;
- hardWork reward validation;
- ensurePalaceUnlock logic.

The engine unlocks palace only when all ten ordinary career IDs are present in hardWorkProgress.

This preserves the locked 10/10 rule.

## Palace production career/content

Status:
CONTENT_OPEN + PRODUCT_BLOCKED.

Current production careers do not include a Palace career definition.

Current target Hard Work catalog contains only:
ending.lumber.hard-work

Therefore natural 10/10 Palace unlock cannot yet be reached through authored ordinary-career endings.

Before full Palace product acceptance:
- nine more ordinary Hard Work contracts must be authored/integrated;
- Palace career/content must be authored;
- remaining Palace-specific content decisions must be supplied.

Hidden Secret Debt outcomes do not count toward the ten ordinary careers.

# 8. Presentation/content depth overall

Status:
SHIPPED_BASE + CONTENT_OPEN.

The core semantic/fallback presentation architecture is shipped.

Current poverty and School waves add real authored content depth.

Still open:
- intentional multi-GIF pools;
- broader bespoke media;
- many career-specific content banks;
- final art direction.

Missing final GIFs are not automatically technical blockers where fallback is valid.

# Current production matrix

| Surface | Current state |
|---|---|
| 10 ordinary career base layers | SHIPPED_BASE |
| full career depth | CONTENT_OPEN |
| Lumber deep vertical | SHIPPED_CONTENT + CONTENT_OPEN |
| ordinary poverty | SHIPPED_CONTENT |
| School authored production | SHIPPED_CONTENT + CONTENT_OPEN |
| School management result | PRODUCT_BLOCKED |
| School Arcana/Forest result | PRODUCT_BLOCKED |
| Forest base Activity | SHIPPED_BASE |
| Forest authored depth | CONTENT_OPEN |
| hunter-trail unlock | PRODUCT_BLOCKED |
| Old Boundary Token natural source/policy | PRODUCT_BLOCKED |
| Secret Debt | PRODUCT_BLOCKED + CONTENT_OPEN |
| semantic presentation/fallback | SHIPPED_BASE |
| intentional multi-GIF pools | RUNTIME_EXTENSION_REQUIRED |
| Meta hardWork/Palace unlock rule | SHIPPED_BASE |
| Palace career/content | CONTENT_OPEN + PRODUCT_BLOCKED |

## Current technical floor

Current main post-PR38:
286/286 PASS.

This is the latest observed full-suite count at this audit snapshot.

No production runtime/UI/content file was modified by Chat 4.
