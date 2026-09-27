# Starting-Career UI Availability Smoke Matrix v1

Date: 2026-09-27
Worker: Chat 4 / QA Acceptance
Baseline: current main after PR40
Current main merge: c71898654ea8419799816d9642184c4dcf23b039
Current full suite: 288/288 PASS

## Scope

Verify what current tests actually prove for all 10 ordinary target careers immediately after a normal started/arrived state.

Evidence classes:

- UI_DIRECT — browser/UI test clicks or inspects the actual rendered button.
- ENGINE_DIRECT — engine test dispatches the production target action.
- DEFINITION_CONTRACT — current production definition is inspected/asserted, but no per-career UI click proves it.

## Common UI availability

Merged UI regression:
renderer: all ten target careers are available at start and Lumber shift pays through UI

It opens the Work panel and verifies all ten target buttons:
- exist;
- are not disabled.

Therefore button presence + enabled-at-start is UI_DIRECT for all ten.

## Matrix

| Career | Target action | Button present | Enabled at start | Dispatch evidence | 1 Energy | Typed counter | Wage definition | UI wage proof |
|---|---|---|---|---|---|---|---|---|
| Lumber | lumber.shift | UI_DIRECT PASS | UI_DIRECT PASS | UI_DIRECT + ENGINE_DIRECT | PASS | PASS | PASS after PR40 | UI_DIRECT PASS |
| Satyr Maid | satyr-maid.shift | UI_DIRECT PASS | UI_DIRECT PASS | ENGINE_DIRECT | PASS | PASS | PASS | not directly clicked in UI test |
| Undead Farm | undead-farm.shift | UI_DIRECT PASS | UI_DIRECT PASS | ENGINE_DIRECT | PASS | PASS | PASS | not directly clicked in UI test |
| Tavern | tavern.shift | UI_DIRECT PASS | UI_DIRECT PASS | ENGINE_DIRECT | DEFINITION_CONTRACT | PASS | PASS | not directly clicked in UI test |
| Hunter | hunter.shift | UI_DIRECT PASS | UI_DIRECT PASS | ENGINE_DIRECT | DEFINITION_CONTRACT | PASS | PASS | not directly clicked in UI test |
| Guard | guard.shift | UI_DIRECT PASS | UI_DIRECT PASS | ENGINE_DIRECT | DEFINITION_CONTRACT | PASS | PASS | not directly clicked in UI test |
| Merchant | merchant.shift | UI_DIRECT PASS | UI_DIRECT PASS | ENGINE_DIRECT | DEFINITION_CONTRACT | PASS | PASS | not directly clicked in UI test |
| Artist/Geisha | artist-geisha.shift | UI_DIRECT PASS | UI_DIRECT PASS | ENGINE_DIRECT | DEFINITION_CONTRACT | PASS | PASS | not directly clicked in UI test |
| Assassin | assassin.shift | UI_DIRECT PASS | UI_DIRECT PASS | ENGINE_DIRECT | DEFINITION_CONTRACT | PASS | PASS | not directly clicked in UI test |
| Prostitute | prostitute.shift | UI_DIRECT PASS | UI_DIRECT PASS | ENGINE_DIRECT | DEFINITION_CONTRACT | PASS | PASS | not directly clicked in UI test |

## Lumber

Current UI test performs:
Work panel
-> click lumber.shift
-> wait for saved money increase

It verifies:
- button enabled;
- dispatch succeeds;
- money increases;
- expected test-state money delta is +16;
- action history records lumber.shift.

Existing target tests additionally preserve:
- Energy cost 1;
- typed completed_shifts progression;
- exact Hard Work invariant.

Status:
FULL REPRESENTATIVE UI SMOKE PASS.

## Satyr Maid / Undead Farm

Starter-trio target tests directly dispatch both production target actions.

They verify:
- action cost Energy = 1;
- dispatch succeeds;
- energyCurrent decreases by 1;
- completed_shifts becomes 1;
- typed first-stage progression persists over reload.

Current definitions contain a wage for each.

The merged UI test verifies their Work buttons are present and enabled.

Gap:
no current per-career browser test clicks these buttons and then asserts the money delta.

Status:
UI AVAILABILITY PASS / ENGINE TRANSACTION PASS / PER-CAREER UI WAGE ASSERTION GAP.

## Remaining seven

remaining-seven-base-careers.test.ts directly dispatches:
- tavern.shift
- hunter.shift
- guard.shift
- merchant.shift
- artist-geisha.shift
- assassin.shift
- prostitute.shift

It verifies:
- each production action exists;
- Energy cost definition = 1;
- money cost = 0;
- wage exists with positive base;
- dispatch succeeds;
- typed completed_shifts becomes 1;
- progress survives reload.

The merged UI test verifies all seven target buttons are present and enabled at start.

Current test gap:
the remaining-seven test does not independently assert the exact post-dispatch energyCurrent delta for each career, and the UI suite does not click each one.

The generic engine action-cost contract plus each definition says 1 Energy, but that is not the same as ten separate UI transaction tests.

Status:
UI AVAILABILITY PASS / ENGINE DISPATCH PASS / ENERGY DEFINITION PASS / PER-CAREER UI TRANSACTION GAP.

## Wage state after PR40

Current target wage presence:
- Lumber: YES
- Satyr Maid: YES
- Undead Farm: YES
- Tavern: YES
- Hunter: YES
- Guard: YES
- Merchant: YES
- Artist/Geisha: YES
- Assassin: YES
- Prostitute: YES

No current target ordinary career consumes 1 Energy while lacking a wage definition.

The pre-PR40 Lumber gap is closed.

## Legacy buttons

Current Work panel does not use legacy:
- tavern
- hunt
- guard

It uses target:
- tavern.shift
- hunter.shift
- guard.shift

PASS.

## Highest-value future UI smoke

A compact parameterized UI test could click each of the other nine target actions from a fresh start and assert:
- action completes;
- Energy decrements by 1;
- completed_shifts increments once;
- money increases according to that action's wage;
- save/reload preserves the result.

This would close the distinction between UI availability and actual UI transaction coverage.

## Final status

All 10:
- button present: PASS
- enabled after normal start: PASS
- target action exists: PASS
- engine dispatch evidence: PASS
- typed counter evidence: PASS
- wage definition present: PASS

Direct browser transaction proof:
- Lumber: PASS
- other nine: OPEN COVERAGE GAP

No production runtime/UI/content file was modified by Chat 4.
