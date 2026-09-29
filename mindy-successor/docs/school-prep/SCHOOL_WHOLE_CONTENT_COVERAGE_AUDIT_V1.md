# Whole-School Player-Facing Content Coverage Audit v1

Date: 2026-09-29
Owner: Chat 5 / School + Text Localization Content Worker
Task: C5-15
Baseline: `main@32f48d15708a543ee26b90b78761da63b3363da2`
Branch: `chat5/school-depth-v3`

## Scope

Audit all eight existing School courses for current player-facing text depth. No course, teacher identity, threshold, fact, progression rule, runtime consumer, presentation asset, tuition, Energy cost, stat package, Save field, or NightFlow behavior is changed.

## Current shared production layer

All eight courses already have:
- exact current course/track IDs in `src/core/school.ts`;
- RU/EN course label + description in root `content/localization.json`;
- one semantic paid-lesson presentation ID;
- the generic post-paid-lesson School event;
- the generic School-life paid-lesson event;
- Night-study label composition through exact current Night choice IDs;
- current course-specific static presentation alt/caption coverage.

All eight also have reusable authored English-only course-specific lesson libraries in nested non-production `content/packs/school-target/school-lesson-content-v1.json` and drafted teacher identities in `SCHOOL_CANONICAL_TEACHER_CONTENT_DRAFT_v1.md`.

The current root `content/packs/school-teachers-v1.json` contains the eight teacher classroom media identities but no teacher events. Exact-course reactive routing remains unavailable because the paid School reaction fact is generic `actionCompleted: school`.

## Coverage matrix

| Course | Exact teacher draft | Root RU/EN label + description | Reusable course-specific lesson text | Current root teacher scene | Milestone-depth RU/EN | Audit classification |
|---|---|---|---|---|---|---|
| `school.course.literacy_and_numbers` | `school.teacher.mara-fen` | YES | YES, nested staging | NO | PR #85 candidate contains prepared depth, not merged | COVERED_BASE / PENDING_DEPTH_CANDIDATE |
| `school.course.arcana` | `school.teacher.ilyra-venn` | YES | YES, nested staging | NO | PR #85 candidate contains prepared depth, not merged | COVERED_BASE / PENDING_DEPTH_CANDIDATE |
| `school.course.rhetoric_and_social` | `school.teacher.cassian-reed` | YES | YES, nested staging | NO | NO | THIN |
| `school.course.etiquette_and_presentation` | `school.teacher.eliane-marrow` | YES | YES, nested staging | NO | NO | THIN |
| `school.course.field_craft` | `school.teacher.rowan-pike` | YES | YES, nested staging | NO | NO | THIN |
| `school.course.physical_training` | `school.teacher.tovan-kest` | YES | YES, nested staging | NO | NO | THIN |
| `school.course.arts_and_performance` | `school.teacher.nessa-lark` | YES | YES, nested staging | NO | NO | THIN |
| `school.course.body_confidence` | `school.teacher.sera-vey` | YES | YES, nested staging | NO | NO | THIN |

## What "THIN" means here

A thin course is not mechanically incomplete. It already has its accepted course identity, stat package, generic School flow, and localization shell.

The missing player-facing depth is specifically:
- RU/EN course-specific lesson prose beyond the one-line description;
- RU/EN teacher-voice scenes using the already-drafted teacher identity;
- milestone-neutral progress/feedback text that can later attach to an approved School milestone without inventing the milestone;
- optional course-specific Night-study depth only where separately assigned.

## Existing reusable authoring seeds

### Rhetoric & Social — Cassian Reed

Existing fantasy:
- persuasion;
- listening;
- reading a room;
- thinking while speaking.

Reusable nested lesson themes:
- same argument for different audiences;
- hearing the hidden assumption in a story;
- recovering from an awkward opening.

### Etiquette & Presentation — Eliane Marrow

Existing fantasy:
- social codes;
- grooming;
- posture;
- deliberate presentation.

Reusable nested lesson themes:
- entry pace/gaze/timing;
- rules as tools for making others comfortable;
- aligning intended and received impression.

### Field Craft — Rowan Pike

Existing fantasy:
- observation;
- dexterity;
- route sense;
- practical improvisation.

Reusable nested lesson themes:
- noticing a changed environment;
- adapting when a tool is missing;
- shortest/safest/easiest-to-retreat routes.

### Physical Training — Tovan Kest

Existing fantasy:
- strength;
- endurance;
- coordination;
- sustainable discipline.

Reusable nested lesson themes:
- repeatable form over showmanship;
- pacing effort;
- alignment/coordination before force.

### Arts & Performance — Nessa Lark

Existing fantasy:
- creativity;
- expression;
- timing;
- performance confidence.

Reusable nested lesson themes:
- commit to one intention;
- tempo changes meaning;
- transform an older pattern into a personal version.

### Body Confidence — Sera Vey

Existing fantasy:
- grooming;
- physical self-awareness;
- deliberate presence;
- comfort in presentation.

Reusable nested lesson themes:
- releasing unnecessary tension;
- care routines chosen for the self rather than an imagined audience;
- intentional presentation and personal choice.

## Depth work selected by active queue

C5-16 through C5-21 should prepare fixture-local RU/EN depth for the six thin courses above using the existing teacher identities and themes.

The content must stay:
- effect-free;
- threshold-free;
- milestone-neutral;
- independent from career-state mutation;
- independent from Lust mechanics;
- independent from Activity mechanics.

## Not a content gap

No new course is required.

No new teacher identity is required for C5-16 through C5-21.

No new School stat, tuition, Energy rule, NightFlow rule, certificate, exam, project, relationship route, or public career fact is justified by this audit.

## Consumer limitations

Current production still lacks a safe exact-course reactive consumer for these prepared course-specific scenes. The new depth can therefore be reviewed as content fixtures and selectively integrated only after Integration chooses an existing safe presentation bridge or adds a separately approved minimal consumer.

Chat 5 does not solve that shared runtime routing gap.
