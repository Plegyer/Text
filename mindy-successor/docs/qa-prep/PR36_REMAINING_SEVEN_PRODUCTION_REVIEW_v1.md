# PR36 Remaining Seven Production Review v1

Date: 2026-09-27
Worker: Chat 4 / QA Acceptance
PR: #36
Head: d8b60b5fb13e0571c1f04830521d96c8386ffd04
Merge commit: 279c71fcf87c9c06c5b96699c8516616a8350062

## Disposition

GREEN / MERGED.

Exact-head CI:
- workflow run 36309713227
- 231 tests
- 231 pass
- 0 fail
- validation: 7 packs, 26 events, 35 actions, 9 endings

Post-merge push CI:
- run 36311839161
- conclusion: success

## Scope

PR36 changes only:
- content/definitions.json
- tests/remaining-seven-base-careers.test.ts

No shared runtime, schema, or UI file changes.

The package adds the base target layer for the seven remaining ordinary careers from the authoritative roster.

## Review checks

All seven corresponding career drafts were checked against the PR.

For every new base career:
- ordinary repeatable work costs 1 Energy;
- progress uses its own typed completed_shifts counter;
- an explicit initial typed stage exists;
- four seasonal semantic presentation identities exist;
- save/reload coverage is included;
- wage/stat numbers are treated as tunable baselines;
- no exact Hard Work threshold, target ending, or Meta reward is invented.

Hunter ordinary work remains separate from the larger expedition layer.

The independent-worker career remains separate from the Secret Debt hidden-career state.

## Lumber invariant

The exact Lumber Hard Work contract remains:
- careerCounter(lumber, completed_shifts) >= 50
- Meta reward hardWork:lumber

PR36 does not add another prerequisite.

## Content depth

PR36 ships only the base layer.

Still open for the seven careers:
- deeper stages;
- relationships;
- School/item/Activity hooks;
- Night content;
- authored major events;
- endings;
- exact Hard Work contracts;
- bespoke media;
- final balance.

Classification:
BASE_LAYER_SHIPPED / CONTENT_DEPTH_OPEN.

## Final matrix

- bounded two-file scope: PASS
- 1 Energy: PASS
- typed completed_shifts: PASS
- initial stages: PASS
- seasonal semantic presentation: PASS
- save/reload: PASS
- no guessed Hard Work: PASS
- tuning not promoted to Product lock: PASS
- Lumber invariant unchanged: PASS
- exact-head CI: 231/231 PASS
- post-merge push CI: PASS
- merged: YES

No Chat 4 production runtime/UI/content file was modified.
