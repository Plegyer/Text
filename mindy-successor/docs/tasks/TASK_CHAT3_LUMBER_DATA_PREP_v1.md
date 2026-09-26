# TASK CHAT 3 — Lumber Product Data Preparation v1

CHAT: 3
ROLE: Lumber Product/Data Worker
BASE COMMIT: 42de07be793d0f5ef0b59ea2c8acf9f0c4c80125
BRANCH: chat3/lumber-data-prep
STATUS: READY

## Goal

Prepare the first real Lumber product slice as isolated production data/design so Chat 1 can integrate it after A5/A6 and Phase B foundations are ready.

Do not activate this content in the live catalog.

## Required reads

- docs/PARALLEL_WORK_PROTOCOL_v1.md
- docs/PRODUCT_ACCEPTANCE_SLICE_v0.md
- docs/CAREER_LUMBER_DRAFT_v0.md
- docs/LUMBER_RELATIONSHIP_CHAIN_v0.md
- docs/FOREST_ACTIVITY_SLICE_v0.md
- docs/SEASONAL_JOB_STAT_MODEL_v1.md
- docs/SUCCESSOR_JOB_SEASON_MATRIX_v1.csv if present, otherwise latest successor season matrix
- docs/TARGET_STAT_SYSTEM_v1.md
- docs/SCHOOL_SYSTEM_v2.md
- docs/ITEM_SYSTEM_DRAFT_v0.md
- docs/INITIAL_ITEM_CATALOG_v0.md
- docs/RELATIONSHIP_TRIGGER_MODEL_v1.md
- docs/GIF_CENTRAL_STAGE_CONTRACT_v1.md
- docs/EXECUTABLE_TZ_v1.md

## Allowed writes

Only new isolated files under:
- mindy-successor/workstreams/chat3/lumber/
- mindy-successor/docs/lumber-prep/

This task packet may be updated with result status.

## Forbidden writes

Do not modify:
- any src/core/*
- any src/ui/*
- content/definitions.json
- content/presentation.json
- active content/packs/*
- PROJECT_STATE.md
- EXECUTABLE_TZ_v1.md
- existing locked career/stat/economy documents
- main branch

## Deliverables

1. LUMBER_TYPED_PROGRESSION_MAP_v1.md
   - proposed Career stages;
   - counters;
   - facts;
   - choices;
   - named transitions;
   - trigger conditions;
   - Hard Work eligibility;
   - at least two complex outcome families from existing Lumber draft;
   - no new lore beyond source docs.

2. LUMBER_REPEATABLE_SHIFT_SET_v1.md
   - 8–16 repeatable shift variants;
   - seasonal mapping;
   - use the current seasonal stat matrix rather than inventing a universal formula;
   - cooldown/reuse intent;
   - presentation slot per visually distinct situation, not per text line.

3. LUMBER_FOREMAN_RELATIONSHIP_MAP_v1.md
   - typed relationship stages/facts/counters;
   - professional route must remain possible;
   - reactive 0-Energy milestones;
   - night meetings use Night slot;
   - School/Item/Forest external hooks.

4. LUMBER_CROSS_SYSTEM_HOOKS_v1.md
   - School gates;
   - item capabilities;
   - Forest Activity inputs/outputs;
   - housing/night hooks where already supported;
   - ending gates;
   - which state changes should produce resolver reaction facts.

5. LUMBER_PRESENTATION_SLOT_CATALOG_v1.md
   - every major Lumber visual situation receives a stable presentationId;
   - distinguish reusable shift GIFs from milestone/ending GIFs;
   - include static fallback category;
   - do not require unique GIF for every event.

6. lumber_draft_v1.json
   - isolated non-loaded draft;
   - typed IDs/stages/counters/facts/transitions in a shape close to target data model;
   - placeholders allowed for prose;
   - must not be wired into active catalog.

## Acceptance

- No forbidden files changed.
- No live content activated.
- The data can support the Product Acceptance chain:
  shift -> reactive career/relationship -> School trigger -> item -> Night -> Forest Activity result -> reactive continuation -> multiple eligible endings.
- Work costs are not encoded as extra relationship dialogue costs.
- Hard Work remains simple persistence, not seasonal breadth.
- Presentation IDs follow GIF-first reuse principles.
- No new unsupported authorial lore is invented.

## Handoff

Commit to this branch and return:
- final commit SHA;
- changed files;
- unresolved data questions;
- integration notes for Chat 1;
- do not merge to main.

## Start instruction

If you are Chat 3, execute this packet directly. Treat existing project documents as authority; do not redesign the Lumber career from scratch.
