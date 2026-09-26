# TASK CHAT 5 — School Production Data Preparation v1

CHAT: 5
ROLE: Optional School Data Worker
BASE COMMIT: 42de07be793d0f5ef0b59ea2c8acf9f0c4c80125
BRANCH: chat5/school-data-prep
STATUS: COMPLETE

## Goal

Prepare the School system's production-ready mechanical data in isolated files, using the already accepted School v2 model.

Do not invent final teacher characters/lore and do not activate content.

## Required reads

- docs/PARALLEL_WORK_PROTOCOL_v1.md
- docs/SCHOOL_SYSTEM_v2.md
- docs/SCHOOL_BALANCE_MATRIX_v0.csv
- docs/SCHOOL_REACHABILITY_SIMULATION_v1.md
- docs/TARGET_STAT_SYSTEM_v1.md
- docs/ACTION_TIME_COST_MODEL_v1.md
- docs/PROGRESSION_AND_DIFFICULTY_PHILOSOPHY_v1.md
- docs/GIF_CENTRAL_STAGE_CONTRACT_v1.md
- docs/EXECUTABLE_TZ_v1.md

## Allowed writes

Only new isolated files under:
- mindy-successor/workstreams/chat5/school/
- mindy-successor/docs/school-prep/

This task packet may be updated with result status.

## Forbidden writes

Do not modify:
- src/core/*
- src/ui/*
- active content/*
- tests/*
- PROJECT_STATE.md
- EXECUTABLE_TZ_v1.md
- SCHOOL_SYSTEM_v2.md
- SCHOOL_BALANCE_MATRIX_v0.csv
- main branch

## Deliverables

1. SCHOOL_TRACK_DATA_MAP_v1.md
   - stable IDs for all eight baseline courses;
   - exact current tuition/effect packages from the accepted baseline;
   - which progression stats each track directly covers;
   - no change to numbers.

2. SCHOOL_PROGRESSION_STRUCTURE_v1.md
   - generic typed counters/facts/milestones/certificates;
   - how repeatable lessons coexist with track progression;
   - external career/relationship hooks;
   - placeholders for teacher identity rather than invented canon.

3. SCHOOL_PRESENTATION_SLOT_CATALOG_v1.md
   - reusable lesson GIF slots;
   - milestone/exam slots;
   - special stat-conversion service slots;
   - static fallback categories.

4. school_draft_v1.json
   - isolated non-loaded mechanical draft;
   - stable course IDs, prices and stat effects;
   - typed progression placeholders;
   - no active integration.

5. SCHOOL_INTEGRATION_NOTES_v1.md
   - what Chat 1 will need when wiring School into the Product Slice;
   - resolver facts expected after stat gains;
   - night-study relation;
   - what remains authorial/open.

## Acceptance

- No forbidden files changed.
- All eight current course packages match the accepted baseline exactly.
- Every progression stat has reliable School access as already specified.
- Lust is not treated as a standard School stat.
- Night study remains a Night-slot tradeoff, not a free daytime action.
- No final teacher names/lore are invented.

## Handoff

Commit to this branch and return:
- final commit SHA;
- changed files;
- unresolved authorial placeholders;
- integration notes;
- do not merge to main.

## Start instruction

If you are Chat 5, execute this bounded School packet only. Do not redesign School economics or progression philosophy.


## Result

Completed on branch `chat5/school-data-prep`.

Prepared deliverables:
- `docs/school-prep/SCHOOL_TRACK_DATA_MAP_v1.md`;
- `docs/school-prep/SCHOOL_PROGRESSION_STRUCTURE_v1.md`;
- `docs/school-prep/SCHOOL_PRESENTATION_SLOT_CATALOG_v1.md`;
- `workstreams/chat5/school/school_draft_v1.json`;
- `docs/school-prep/SCHOOL_INTEGRATION_NOTES_v1.md`.

Verification:
- eight baseline course prices/effects match the accepted School balance baseline;
- all 12 progression stats have direct repeatable School coverage;
- Lust is excluded from standard School stats;
- Night study remains a Night-slot action with next-day Energy -1;
- teacher identity/lore and other authorial fields remain placeholders;
- no forbidden implementation/content/test files were changed.

Unresolved authorial placeholders are listed in `SCHOOL_PROGRESSION_STRUCTURE_v1.md` and `SCHOOL_INTEGRATION_NOTES_v1.md`.

Do not merge this branch to main directly; hand off to Chat 1 / Lead for integration.
