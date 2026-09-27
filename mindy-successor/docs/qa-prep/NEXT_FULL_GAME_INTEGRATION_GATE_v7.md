# Next Full-Game Integration Gate v7

Date: 2026-09-27
Worker: Chat 4 / QA Acceptance
Current main observed: 9c994934152c2195ed17e6a18fdd1a301e27852c

## Status vocabulary

- SHIPPED
- CI_GREEN_READY
- CONTENT_READY
- PRODUCT_BLOCKED
- RUNTIME_EXTENSION_REQUIRED

A surface may carry more than one status at different boundaries.

## 1. Ten ordinary career base layers

Status:
SHIPPED.

Evidence:
- PR34 shipped starter-trio target foundations;
- PR36 shipped the remaining seven base layers;
- PR36 exact-head CI: 231/231 PASS;
- PR36 merge push CI: 231/231 PASS.

All 10 ordinary careers now have:
- target repeatable Work;
- 1 Energy;
- typed completed_shifts;
- initial typed stage;
- seasonal semantic presentation;
- base save/reload coverage.

Content depth remains open.

Only Lumber currently has an authored target Hard Work contract.
The other nine Hard Work contracts remain unauthored.

## 2. Ordinary poverty packs

Status:
SHIPPED.

PR37:
- head 749649b25c139058bdb49bc756c3b04a349cd3eb;
- merge 9c994934152c2195ed17e6a18fdd1a301e27852c;
- exact-head run 36312111114;
- 270/270 PASS;
- post-merge run 36312225671;
- 270/270 PASS;
- validation: 13 packs, 40 events, 35 actions, 9 endings.

The current main now includes authored ordinary-poverty production content beyond the lodging primitives.

Secret Debt remains separate.

## 3. School authored content

Status:
CONTENT_READY, but NOT CI_GREEN_READY.

Chat5 items 82-89 provide:
- eight drafted teacher identities;
- repeatable lesson text;
- milestone-neutral School-life scenes;
- optional relationship seeds;
- presentation briefs.

Chat4 review found one documentation correction:
the worker consistency audit reverses paid lessons vs Night-study counter ownership in prose.

Current production integration PR38:
- open;
- head 953b8691e73773eb90c16cd0c0c4cc2bbeae2484;
- CI run 36312468112;
- conclusion: failure.

Exact failure:
content validation rejects
school-lesson-content-v1.literacy-and-numbers
because the event has no trigger.

Therefore:
- content authoring is ready;
- the current production encoding is not integration-green;
- fix the pack to current event schema;
- do not change shared runtime merely to accept an invalid event shape.

Current classification:
CONTENT_READY / CI BLOCKED BY CONTENT-SCHEMA ERROR.

No runtime extension is proven necessary.

## 4. Multi-GIF presentation support

Current shipped presentation core:
- supports semantic slots;
- resolves an ordered candidates array;
- supports GIF/static/catalog fallback;
- supports Animation Off;
- safely advances to the next candidate on media load error.

Current UI behavior:
- starts at candidate index 0;
- resets index on gameplay/navigation;
- advances mediaIndex on load error;
- does not currently implement intentional 3-5 candidate pool rotation/random distribution.

Status:
RUNTIME_EXTENSION_REQUIRED for deliberate multi-GIF candidate-pool selection.

The required extension must remain presentation-only:
- no gameplay RNG coupling;
- no save frame/time;
- no effect timing dependency.

QA contract:
MULTI_GIF_PRESENTATION_QA_REQUIREMENTS_v1.md.

## 5. Secret Debt

Status:
PRODUCT_BLOCKED for final production loop.
CONTENT_READY at structural/narrative-prep level.

Already fixed:
- hidden career concept;
- one-time lender structure;
- accept/refuse;
- delayed activation model;
- ordinary-job blocking after activation;
- forced Night requirement;
- three outcome families;
- Palace exclusion.

Still requiring Product/system answers include:
- School availability while bound;
- large Activity availability while bound;
- forced Night vs lodging-payment behavior;
- next-day modifier composition;
- final balance/reward values.

Generic technical seams are known.
A complete production loop must not guess the remaining behavior.

No broad architecture rewrite is currently justified.

## 6. Forest depth

Current base Forest/Activity slice:
SHIPPED.

Deeper content:
CONTENT_READY in prep for:
- additional challenge families;
- seasonal/context depth;
- richer route content.

Hunter trail:
PRODUCT_BLOCKED at its final unlock-source/provider boundary.

Current Activity route/option/reload infrastructure is already capable of hosting ordinary authored depth.

Status:
SHIPPED base + CONTENT_READY depth + PRODUCT_BLOCKED hunter-unlock boundary.

No generic runtime extension is currently proven necessary for the authored challenge families.

## 7. Palace

Current unlock rule:
fixed as Hard Work on all 10 ordinary careers.

Hidden careers do not substitute.

Current production state:
- ordinary career base layers exist for all 10;
- only Lumber has an authored target Hard Work contract;
- Palace production career/content is not integrated.

Status:
PRODUCT_BLOCKED / CONTENT DEPENDENCY OPEN.

Before natural Palace unlock acceptance is possible:
- nine additional ordinary Hard Work contracts must be authored and integrated;
- Palace production content must be authored;
- any remaining Palace-specific Product choices must be resolved.

No shared career-runtime extension is currently demonstrated as necessary.

## Current integration table

| Surface | Current status |
|---|---|
| 10 ordinary career base layers | SHIPPED |
| ordinary poverty authored content | SHIPPED |
| School teacher/text authored content | CONTENT_READY |
| School PR38 production encoding | not CI green; schema validation failure |
| multi-GIF candidate-pool selection | RUNTIME_EXTENSION_REQUIRED |
| Secret Debt final mechanics | PRODUCT_BLOCKED |
| Secret Debt authored/prep content | CONTENT_READY |
| Forest base Activity | SHIPPED |
| Forest challenge/season depth | CONTENT_READY |
| hunter-trail unlock | PRODUCT_BLOCKED |
| Palace | PRODUCT_BLOCKED / prerequisite content incomplete |

## Current CI milestones

PR36 boundary:
231/231 PASS.

PR37 ordinary poverty integration:
270/270 PASS exact head and post merge.

PR38 School authored production:
validation failure before tests; no PASS count claimed.

## Locked firewalls

All next integrations must preserve:
- Lumber Hard Work only completed_shifts >= 50;
- exact hardWork:lumber reward;
- Palace prerequisite = all 10 ordinary Hard Work;
- hidden careers excluded from Palace;
- paid School and Night-study counter ownership separation;
- exact Forest public result boundaries;
- media remains presentation-only.

No production runtime/UI/content file was modified by Chat 4.
