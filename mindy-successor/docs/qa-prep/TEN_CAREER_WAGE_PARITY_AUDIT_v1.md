# Ten-Career Wage Parity Audit v1

Date: 2026-09-27
Worker: Chat 4 / QA Acceptance
Baseline: current main after merged PR40
Main SHA: c71898654ea8419799816d9642184c4dcf23b039
Current full suite: 288/288 PASS

## Result

All 10 ordinary target shift actions now define a wage.

No target ordinary career currently consumes its 1-Energy Work shift while having no wage definition.

The pre-PR40 Lumber wage gap is closed.

## Current target wage matrix

| Career | Target action | Base | Weights | Provenance classification |
|---|---|---:|---|---|
| Lumber | lumber.shift | 13 | Strength 0.5; Endurance 0.25 | exact existing legacy/compat lumber wage reused by PR40 |
| Satyr Maid | satyr-maid.shift | 15 | Charm 0.35; Sexuality 0.25 | PR34 target base-layer tuning baseline |
| Undead Farm | undead-farm.shift | 15 | Endurance 0.3; Magic 0.3; Reason 0.2 | PR34 target base-layer tuning baseline |
| Tavern | tavern.shift | 15 | Charm 0.3; Wits 0.3; Manners 0.2 | PR36 target base-layer tuning baseline |
| Hunter | hunter.shift | 15 | Dexterity 0.35; Endurance 0.3; Wits 0.2 | PR36 target base-layer tuning baseline |
| Guard | guard.shift | 15 | Endurance 0.3; Manners 0.25; Strength 0.2; Reason 0.15 | PR36 target base-layer tuning baseline |
| Merchant | merchant.shift | 15 | Wits 0.35; Charm 0.25; Manners 0.2; Reason 0.15 | PR36 target base-layer tuning baseline |
| Artist/Geisha | artist-geisha.shift | 15 | Manners 0.3; Charm 0.3; Sexuality 0.15; Dexterity 0.15 | PR36 target base-layer tuning baseline |
| Assassin | assassin.shift | 15 | Dexterity 0.35; Wits 0.3; Reason 0.2; Manners 0.1 | PR36 target base-layer tuning baseline |
| Prostitute | prostitute.shift | 15 | Sexuality 0.35; Charm 0.3; Manners 0.2; Endurance 0.15 | PR36 target base-layer tuning baseline |

The PR34/PR36 values are implementation tuning baselines, not Product-locked balance values.

This audit does not rebalance them.

## Lumber provenance

Current definitions contain both:

Legacy compatibility action:
lumber

Target action:
lumber.shift

After PR40 both use exactly:
- base 13
- Strength factor 0.5
- Endurance factor 0.25

PR40 therefore restores parity by reuse rather than inventing a new wage.

PASS.

## Legacy-target comparisons that are visibly different

Current definitions also retain legacy actions:
- tavern
- hunt
- guard

Their old wage contracts do not match the new target base-layer formulas.

### Tavern

Legacy tavern:
- base 14
- Persuasion 0.4
- Organization 0.3

Target tavern.shift:
- base 15
- Charm 0.3
- Wits 0.3
- Manners 0.2

Classification:
LEGACY_DIVERGENT_TARGET_BASELINE.

This is not a missing-wage defect.
The target layer was authored under the current target stat vocabulary and PR36 tuning baseline.

### Hunter

Legacy hunt:
- base 12
- Perception 0.5
- Dexterity 0.3

Target hunter.shift:
- base 15
- Dexterity 0.35
- Endurance 0.3
- Wits 0.2

Classification:
LEGACY_DIVERGENT_TARGET_BASELINE.

Not a wage-absence bug.

### Guard

Legacy guard:
- base 19
- Strength 0.4
- Composure 0.3
- also has legacy eligibility conditions.

Target guard.shift:
- base 15
- Endurance 0.3
- Manners 0.25
- Strength 0.2
- Reason 0.15
- target base layer is available at start.

Classification:
LEGACY_DIVERGENT_TARGET_BASELINE.

This is a broader target-vs-legacy design difference, not an accidental missing wage.

## Careers without an obvious direct legacy wage counterpart

Within current definitions, no one-to-one legacy target action with an equivalent wage contract was found for:
- Satyr Maid;
- Undead Farm;
- Merchant;
- Artist/Geisha;
- Assassin;
- Prostitute.

Their current wage provenance is the target production base layer introduced in PR34/PR36.

Do not claim a legacy source that is not present.

## Energy-without-income check

Target ordinary Work set:
- lumber.shift
- satyr-maid.shift
- undead-farm.shift
- tavern.shift
- hunter.shift
- guard.shift
- merchant.shift
- artist-geisha.shift
- assassin.shift
- prostitute.shift

Each:
- cost.energy = 1;
- cost.money = 0;
- wage present.

Count lacking wage:
0.

PASS.

## UI evidence

Merged PR40 UI test directly proves:
- all ten target Work buttons are present and enabled after normal start;
- Lumber target UI click increases money.

The other nine wage contracts are present in production definitions and their target actions dispatch in engine tests, but no current browser test clicks every one and asserts each money delta separately.

Classification:
WAGE_DEFINITION_PARITY_GREEN / PER_CAREER_UI_WAGE_COVERAGE_OPEN.

## Hard Work boundary

Wage formulas are independent of Hard Work eligibility.

Lumber remains:
completed_shifts >= 50

Other nine Hard Work contracts remain separate authoring work.

No wage value should become an ending threshold.

## Final audit

- target careers with wage: 10/10
- target careers without wage: 0
- target actions costing 1 Energy without wage: 0
- Lumber legacy-target mismatch: CLOSED by PR40
- Tavern legacy-target formula divergence: PRESENT / target baseline
- Hunter legacy-target formula divergence: PRESENT / target baseline
- Guard legacy-target formula divergence: PRESENT / target baseline
- rebalancing performed: NO

No production runtime/UI/content file was modified by Chat 4.
