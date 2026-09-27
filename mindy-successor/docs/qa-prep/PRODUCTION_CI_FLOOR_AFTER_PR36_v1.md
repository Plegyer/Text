# Production CI Floor After PR36 v1

Date: 2026-09-27
Worker: Chat 4 / QA Acceptance

## PR36 exact-head baseline

PR36 head:
d8b60b5fb13e0571c1f04830521d96c8386ffd04

Exact-head workflow:
- run 36309713227
- conclusion: success
- tests: 231
- pass: 231
- fail: 0
- content validation: 7 packs, 26 events, 35 actions, 9 endings
- build completed

Classification:
EXACT_HEAD_GREEN.

## Merge evidence

PR36 merged.

Merge SHA:
279c71fcf87c9c06c5b96699c8516616a8350062

Post-merge main push workflow:
- run 36311839161
- conclusion: success
- tests: 231
- pass: 231
- fail: 0
- content validation: 7 packs, 26 events, 35 actions, 9 endings

Classification:
POST_MERGE_GREEN.

## Newly covered production careers

PR36 completes the target base-layer set for the remaining seven ordinary careers:
- Tavern
- Hunter
- Guard
- Merchant
- Artist/Geisha
- Assassin
- Prostitute

Together with the already-shipped starter trio:
- Lumber
- Satyr Maid
- Undead Farm

all 10 ordinary careers now have a production base layer.

Base layer means:
- target repeatable shift;
- 1 Energy;
- typed completed_shifts;
- initial typed career stage;
- seasonal semantic presentation;
- base save/reload regression.

It does not mean full career content is complete.

## Hard Work coverage

At the PR36 boundary:
- Lumber target Hard Work is implemented and locked;
- the other nine ordinary-career Hard Work contracts remain unauthored.

Do not infer their thresholds/rewards from Lumber.

## Regression floor

Observed technical floor at PR36 merge boundary:
231/231 PASS.

This supersedes earlier observed counts as the current career-base-layer milestone floor.

The count itself is not a Product score.
Future integrations may raise or replace tests while preserving invariants.

## Still-uncovered or incomplete production systems at the PR36 boundary

Career depth:
- deeper stages for nine careers;
- relationship routes;
- career-specific Night content;
- School/item/Activity hooks;
- complex endings;
- nine missing target Hard Work contracts.

Ordinary poverty:
- PR33 anti-softlock regression existed;
- authored ordinary poverty content was not yet part of the PR36 merge boundary.

Secret Debt:
- not production integrated.

School authored content:
- base School mechanics shipped;
- teacher/content depth remained branch/prep work;
- management/accounting and Arcana/Forest public results remained open.

Forest/Activity:
- base Forest slice shipped;
- broader challenge/route/season depth remained open.

Palace:
- unlock rule authority exists;
- Palace production career/content not integrated.

Multi-GIF presentation:
- semantic/fallback architecture exists;
- 3-5 candidate-pool behavior was not established by PR36.

## Later main advancement

Current main observed while writing this document is newer than the PR36 merge boundary.

Current main:
9c994934152c2195ed17e6a18fdd1a301e27852c

Commit message:
Lead: integrate ordinary poverty production content.

Therefore:
- 231/231 is the exact verified PR36 milestone floor;
- it must not be presented as the latest current-main suite count after later integrations without fresh evidence.

## Final evidence

- PR36 exact head: GREEN 231/231
- PR36 merge SHA: recorded
- PR36 post-merge push: GREEN 231/231
- ten ordinary career base layers: covered
- later ordinary-poverty integration: outside this PR36 floor and requires its own current-main evidence

No production runtime/UI/content file was modified by Chat 4.
