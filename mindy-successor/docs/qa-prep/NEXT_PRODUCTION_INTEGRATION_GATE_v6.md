# Next Production Integration Gate v6

Date: 2026-09-27  
Worker: Chat 4 / QA Acceptance  
Current main: `22772b1439c247d67fdd20c4e3fd55cc2eba4e20`

## Purpose

Separate current production work into:

- **CI_GREEN / INTEGRATED**
- **REVIEW_READY**
- **AUTHORING_READY**
- **PRODUCT_BLOCKED**
- **TECHNICAL_PREP_READY**

No Product choice is recommended here.

No aesthetic priority is ranked.

---

# CI_GREEN / INTEGRATED

## PR34 — starter trio

Status:

**MERGED / CI GREEN**

Evidence:

- head: `5f1bd3e644a00ed6c65f67511564e2414de09e5a`
- exact-head run: `36308181336`
- **227/227 PASS**
- merge: `712ab6c7368ab21906f3fcb0184b35d4f3e1411c`
- post-merge push run: `36308257142`
- conclusion: success.

Current production now has target starter Work foundations for:

- Lumber;
- Satyr Maid;
- Undead Farm.

This stream is no longer pending integration.

Next work for Satyr/Farm is content depth, not re-integrating PR34.

---

## PR33 — ordinary poverty anti-softlock floor

Status:

**MERGED / CI GREEN**

Evidence:

- head: `17bbc911a39cd6d726d82c49461cfe18c5b11d02`
- exact-head run: `36307690216`
- **223/223 PASS**
- merge: `e36cc1aaa44991d3340276b4f82efa5c9d9cf15a`
- post-merge push run: `36307836767`
- **223/223 PASS**.

This is a regression floor for existing lodging behavior.

It is not full poverty content.

---

# REVIEW_READY

## Ordinary poverty content wave

Current preparation is sufficient for Lead review of a real content package.

Known ready foundations:

- normal/cheap/street lodging;
- NightFlow;
- zero-money anti-softlock;
- starting-job recovery;
- Resolver/events;
- save/reload;
- presentation fallback;
- CI gate.

Review gate:

`ORDINARY_POVERTY_PRODUCTION_PACK_REVIEW_GATE_v1.md`

Required before merge:

- real natural street event reachability;
- helpful/neutral/bad content separation;
- no Secret Debt bleed;
- no provisional tuning promoted to lock;
- save/reload/idempotency;
- presentation fallback;
- exact integration CI.

Classification:

**REVIEW_READY once the authored Chat3 content pack exists**

No shared runtime change is currently justified merely to author ordinary poverty events.

---

# AUTHORING_READY

## School general authored content

Current School runtime is already green:

- eight courses;
- typed tracks;
- paid lessons;
- Night study;
- Resolver;
- blocking scenes;
- presentation;
- save/reload.

Therefore content work can proceed for:

- teachers;
- lesson/event flavor;
- projects/exams/certificates that do not select an unresolved public-result contract;
- broader School presentation/content depth.

Classification:

**AUTHORING_READY**

Generic authored School content does not need a new runtime package.

---

## GIF/media drafts for existing semantic slots

Presentation runtime is already green:

- semantic IDs;
- GIF/static/text fallback;
- Animation Off;
- missing media nonfatal;
- editor replacement;
- save identity.

For already-authored gameplay slots, production can create/replace media now.

Classification:

**AUTHORING_READY / OPTIONAL POLISH**

No presentation runtime rewrite is required.

Final media for unauthored routes/results should wait for their gameplay identity.

---

# PRODUCT_BLOCKED

## School management/accounting public result

Blocked on Product/content choice:

- provider/milestone category;
- threshold only if threshold-based.

Already locked:

- School owns provider;
- Lumber reads only durable public result;
- synthetic School shortcut excluded.

Classification:

**PRODUCT_BLOCKED AT PUBLIC-RESULT BOUNDARY**

Technical School work outside this boundary can continue.

---

## School Arcana / Forest public result

First unresolved question:

- retain a distinct Arcana -> Forest public result?

If retained:
- provider/consumer identity still needs authoring.

Classification:

**PRODUCT_BLOCKED AT SCOPE/PROVIDER BOUNDARY**

Do not add a guessed threshold.

---

## Secret Debt complete production behavior

Structure is strongly defined, but several experience-level decisions remain open:

- School availability while bound;
- large Activity availability while bound;
- forced Night vs lodging payment;
- next-day modifier composition.

Exact numeric balance also remains open but can be parameterized.

Classification:

**PRODUCT_BLOCKED FOR COMPLETE BEHAVIOR**

Do not ship a guessed final Secret Debt loop.

---

# TECHNICAL_PREP_READY

## Secret Debt state scaffolding

Generic technical preparation can proceed without selecting Product answers if it remains behavior-neutral.

Potential bounded prep:

- typed `SecretDebtState` shape;
- validation;
- encounter decision persistence;
- scheduled activation date representation;
- job-lock interface seam;
- forced-Night integration interface;
- ending/outcome hook;
- Palace-exclusion tests.

Constraints:

- no guessed debt amount;
- no guessed activation delay;
- no guessed School/Activity availability;
- no guessed lodging suppression policy.

Classification:

**TECHNICAL_PREP_READY / FINAL PRODUCT LOOP BLOCKED**

---

# STARTER TRIO NEXT DEPTH

PR34 is already integrated.

Current status:

## Lumber

Deepest reference vertical.

Still authoring-open:
- School management result;
- token acquisition/policy;
- Forest depth.

## Satyr Maid

Target Work/career skeleton green.

Authoring-ready:
- relationship network;
- Night content;
- School/item hooks;
- endings;
- bespoke media.

Hard Work remains unauthored.

## Undead Farm

Target Work/career skeleton green.

Authoring-ready:
- research/anomaly content;
- relationship;
- School;
- items/samples;
- Activity bridge;
- endings;
- bespoke media.

Hard Work remains unauthored.

---

# CI rule for all next production integrations

The CI workflow is now available.

Every production content/runtime integration requires:

- exact-head `mindy-successor check`;
- typecheck;
- validate;
- build;
- full tests;
- observed test count;
- post-merge push CI where applicable.

Static review alone is no longer sufficient for production/data integration.

---

# Natural-path rule

Every new shipped subsystem/content package must retain one representative natural path.

Do not count:

- seeded item;
- injected fact;
- direct stage;
- fixture-only event

as full authored reachability.

Use:

`PRODUCTION_CONTENT_NATURAL_PATH_EVIDENCE_RULE_v1.md`

---

# Presentation rule

All new content uses current central presentation architecture.

Required:

- semantic identity;
- fallback;
- missing media nonfatal;
- mechanics independent from animation.

Use:

`GIF_FIRST_FULL_GAME_QA_GUARDRAILS_v1.md`

---

# New current PR outside this v6 task scope

Git currently shows a new open:

PR35:
`Lead: add base target shifts for remaining seven careers`

This appeared after the starter-trio milestone.

It is a separate production review target.

This v6 gate does **not** classify PR35 as green or merge-ready without a dedicated diff/CI review.

---

# Current integration matrix

| Stream | Status |
|---|---|
| PR34 starter trio | **CI_GREEN / INTEGRATED** |
| PR33 poverty regression | **CI_GREEN / INTEGRATED** |
| ordinary poverty authored content | **REVIEW_READY when pack is delivered** |
| School general authored content | **AUTHORING_READY** |
| School management public result | **PRODUCT_BLOCKED** |
| Arcana/Forest public result | **PRODUCT_BLOCKED** |
| GIF/media existing slots | **AUTHORING_READY** |
| Secret Debt generic technical prep | **TECHNICAL_PREP_READY** |
| Secret Debt complete loop | **PRODUCT_BLOCKED** |
| PR35 remaining seven career base layer | **NEW REVIEW TARGET / NOT YET CLASSIFIED HERE** |

No production runtime/UI/content file was modified by Chat 4.
