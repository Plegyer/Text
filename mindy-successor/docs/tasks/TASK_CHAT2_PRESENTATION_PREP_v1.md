# TASK CHAT 2 — Presentation / GIF Preparation v1

CHAT: 2
ROLE: Presentation / Media Preparation Worker
BASE COMMIT: 42de07be793d0f5ef0b59ea2c8acf9f0c4c80125
BRANCH: chat2/presentation-prep
STATUS: READY

## Goal

Prepare everything needed for Phase B central-stage GIF integration without touching the shared runtime/UI while Chat 1 owns A5/A6.

The project uses one persistent central media window. Gameplay emits stable presentation IDs; GIF is the primary dynamic format; static image/text are fallbacks.

## Required reads

- docs/PARALLEL_WORK_PROTOCOL_v1.md
- docs/GIF_CENTRAL_STAGE_CONTRACT_v1.md
- docs/MEDIA_PRESENTATION_CONTRACT_v0.md
- docs/TARGET_GAME_SHELL_v0.md
- docs/EXECUTABLE_TZ_v1.md
- docs/PRODUCT_ACCEPTANCE_SLICE_v0.md
- prior-work/astra/prototype-m3.2/src/core/presentation.ts
- prior-work/astra/prototype-m3.2/content/presentation.json
- prior-work/astra/prototype-m3.2/src/ui/editor.ts

Read existing code only to understand integration points.

## Allowed writes

Only new isolated files under:
- mindy-successor/workstreams/chat2/
- mindy-successor/docs/presentation-prep/

This task packet itself may be updated with result status.

## Forbidden writes

Do not modify:
- src/core/schema.ts
- src/core/engine.ts
- src/core/content.ts
- src/core/persistence.ts
- src/ui/app.ts
- src/ui/editor.ts
- content/definitions.json
- content/presentation.json
- any active content pack
- PROJECT_STATE.md
- EXECUTABLE_TZ_v1.md
- main branch

## Deliverables

1. PRESENTATION_SLOT_TAXONOMY_v1.md
   - stable naming rules;
   - examples for hub/work/result/career/relationship/school/night/activity/ending;
   - reuse rules;
   - season/variant suffix rules;
   - rules for when two scenes should share one GIF slot vs require separate IDs.

2. GIF_REPLACEMENT_WORKFLOW_v1.md
   - user workflow: choose presentationId -> assign GIF -> preview -> save;
   - file validation;
   - static fallback;
   - missing asset behavior;
   - animation-disable behavior;
   - no code/JSON editing required by final user-facing workflow.

3. PHASE_B_PRESENTATION_IMPLEMENTATION_PACKET_v1.md
   - exact future code files likely to change;
   - proposed UI/editor flow;
   - acceptance tests;
   - migration from current presentation mapping;
   - central fixed-aspect media box;
   - no gameplay timing coupled to GIF duration.

4. placeholder_manifest_v1.json in workstreams/chat2/
   - isolated, non-loaded planning manifest;
   - sample slots for the Product Acceptance Lumber chain;
   - every entry has presentationId, intended use, media kind, fallback category;
   - do not invent real asset filenames if no asset exists; use explicit placeholder state.

5. MEDIA_PRODUCTION_PRIORITY_v1.md
   - rank which slots deserve unique GIF first;
   - endings/major milestones above repeatable shifts;
   - identify reusable slot families.

## Acceptance

- No forbidden files changed.
- No active runtime/catalog files changed.
- All files are internally consistent with GIF_CENTRAL_STAGE_CONTRACT_v1.
- Product Acceptance Lumber flow can be mapped to presentation IDs without needing a unique GIF per event.
- The future player/editor workflow never requires manual source-code editing just to replace a GIF.

## Handoff

Commit all work to this branch.

Return:
- final commit SHA;
- changed file list;
- concise summary;
- blockers/open decisions;
- do not merge to main.

## Start instruction

If you are the Chat 2 worker, execute this packet without asking the user for clarification unless a true product decision is missing.
