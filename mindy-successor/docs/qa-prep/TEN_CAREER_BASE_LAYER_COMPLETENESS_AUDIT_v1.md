# Ten-Career Base-Layer Completeness Audit v1

Date: 2026-09-27
Worker: Chat 4 / QA Acceptance
Baseline: main after merged PR36

## Result

All 10 ordinary careers now have a shipped target base layer.

BASE_LAYER_SHIPPED does not mean full career content is complete.

## Current ordinary career set

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

## Base-layer checks

Every listed career currently has:
- a production target shift action;
- 1 Energy cost;
- typed completed_shifts progress;
- an explicit initial career stage;
- four seasonal shift scenes;
- semantic presentation slots;
- save/reload regression coverage.

Lumber, Satyr Maid and Undead Farm are covered by starter-trio tests.
The remaining seven are covered by remaining-seven-base-careers tests.

## Career depth

Lumber:
- deeper cross-system vertical exists;
- first-stage progression, relationship, Night, Activity, endings and Meta evidence exist;
- additional content depth remains open.

Satyr Maid and Undead Farm:
- base Work/career layer shipped;
- first-shift transition shipped;
- deeper relationships, cross-system content and endings remain open.

Remaining seven:
- base Work/career layer shipped;
- initial stage only;
- milestone transitions and deeper systems remain open.

Classification for all 10:
BASE_LAYER_SHIPPED.

Classification for full career completion:
CONTENT_DEPTH_OPEN.

## Hard Work status

Lumber:
- target Hard Work is implemented;
- exact condition remains completed_shifts >= 50;
- exact Meta reward remains hardWork:lumber.

Other nine ordinary careers:
- no target Hard Work contract is authored yet;
- no threshold, ending or Meta reward should be inferred from Lumber.

Legacy prototype endings do not count as target Hard Work implementation.

## Presentation

Every base career has seasonal semantic presentation identity.

Existing media reuse is allowed while semantic IDs remain distinct.

Bespoke final media remains optional content/presentation work.

## Save/reload

Current regression suites execute real target shifts, persist typed progress and reload successfully.

Lumber has broader reload coverage across its deeper vertical.

## CI baseline

PR36 exact-head CI:
- 231 tests
- 231 pass
- 0 fail

PR36 merge SHA:
279c71fcf87c9c06c5b96699c8516616a8350062

Post-merge push CI:
success.

## Final matrix

All 10:
- production target action: YES
- 1 Energy: YES
- typed completed_shifts: YES
- initial stage: YES
- seasonal semantic presentation: YES
- base save/reload: YES

Hard Work:
- Lumber: SHIPPED
- other nine: NOT YET AUTHORED

Full content depth:
- all 10: OPEN, with Lumber currently the deepest production reference.

No production runtime/UI/content file was modified by Chat 4.
