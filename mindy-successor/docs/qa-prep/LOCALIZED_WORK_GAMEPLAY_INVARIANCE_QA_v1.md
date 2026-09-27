# Localized Work Gameplay Invariance QA v1

Date: 2026-09-27
Worker: Chat 4 / QA Acceptance
Baseline: current main 974d6e077ffc511e304a64aef32f2aab81167f41
PR41 full suite: 291/291 PASS

## Result

The shipped localization slice is structurally gameplay-invariant for all 10 target Work actions.

Current evidence proves:
- same action IDs in RU and EN;
- same enabled state for all 10 in the merged locale-switch UI test;
- same production action definitions;
- same 1-Energy costs;
- same wage formulas/forecast inputs;
- same typed dispatch effects;
- locale switch leaves life Save unchanged.

Coverage gap:
the browser suite does not yet click all 10 actions once under RU and once under EN and compare every post-dispatch Save.

Classification:
INVARIANCE_ARCHITECTURE_GREEN / FULL_DUAL_LOCALE_TRANSACTION_MATRIX_OPEN.

## Ten action IDs

Canonical target set:

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

The locale-switch UI test records all rendered data-action IDs under RU and EN and asserts the arrays are identical.

PASS.

## Enabled/disabled state

The merged PR41 UI test:
- opens Work under RU;
- records target IDs;
- switches to EN without changing life Save;
- opens Work;
- verifies every rendered target button remains enabled.

All ten target careers are available after the same normal start state in both locales.

PASS.

## Energy costs

Localization does not own cost data.

Current production definitions give every target Work action:
cost.energy = 1.

actionList renders the same a.cost.energy independent of locale; only the word for "energy" is localized.

Dispatch still uses:
data-action = canonical action ID.

PASS by shared-definition contract.

## Wage forecast values

Current actionList computes forecast before localization text resolution:

forecast =
wage.base
+ sum(current stat * wage factor)

Locale is not an input.

Localization changes only:
- action label;
- action description;
- "income ≈" string;
- energy/coin words;
- Work button label.

Therefore for identical Save:
RU forecast numeric value == EN forecast numeric value.

PASS by code path.

## Wage contracts

All ten target actions currently define wage.

Lumber:
- base 13
- Strength 0.5
- Endurance 0.25

The other nine retain their PR34/PR36 target tuning baselines.

Locale switching does not modify definitions.json.

PASS.

## Dispatch effects

The UI handler dispatches:
type: action
id: button data-action

The ID is locale-neutral and identical under RU/EN.

Existing engine tests prove target dispatch/progression for:
- Lumber;
- Satyr Maid;
- Undead Farm;
- remaining seven.

Localization runtime is not passed into engine dispatch.

Therefore effects/counters are shared across locales.

PASS structurally and by existing engine coverage.

## Typed progress

Every target shift increments:
career <career>
counter completed_shifts
amount 1

Localization does not create a localized counter or career ID.

PASS.

## Current UI locale-switch Save assertion

Merged PR41 UI test captures:
portal-life.v1

before locale change.

After RU -> EN:
exact stored life Save string is unchanged.

After EN -> RU:
exact stored life Save string is still unchanged.

PASS for no-command locale switching.

## Label/description change

Current localization.json contains RU+EN label/description for all ten target Work actions.

The UI test explicitly observes:
- RU Lumber label;
- EN Lumber label;
- EN Merchant label.

The mapping pattern is the same for all ten:
action.<id>.label
action.<id>.description

PASS for registered content.

## Per-career matrix

| Action | Same ID RU/EN | Enabled RU/EN | Energy | Wage formula shared | Typed counter shared | RU+EN label/desc |
|---|---|---|---:|---|---|---|
| lumber.shift | PASS | PASS | 1 | PASS | PASS | PASS |
| satyr-maid.shift | PASS | PASS | 1 | PASS | PASS | PASS |
| undead-farm.shift | PASS | PASS | 1 | PASS | PASS | PASS |
| tavern.shift | PASS | PASS | 1 | PASS | PASS | PASS |
| hunter.shift | PASS | PASS | 1 | PASS | PASS | PASS |
| guard.shift | PASS | PASS | 1 | PASS | PASS | PASS |
| merchant.shift | PASS | PASS | 1 | PASS | PASS | PASS |
| artist-geisha.shift | PASS | PASS | 1 | PASS | PASS | PASS |
| assassin.shift | PASS | PASS | 1 | PASS | PASS | PASS |
| prostitute.shift | PASS | PASS | 1 | PASS | PASS | PASS |

## What is not yet directly executed

The current browser suite does not parameterize all ten careers as:

fresh identical Save
-> RU click
-> capture mechanical state
-> fresh identical Save
-> EN click
-> capture mechanical state
-> deep-compare.

It also does not explicitly read and compare every displayed wage forecast under both locales.

These are coverage gaps, not evidence of a locale-dependent mechanic.

Recommended future parameterized smoke should assert for each career:
- same numeric forecast;
- same Energy delta;
- same money delta;
- same completed_shifts delta;
- same facts/stage changes;
- same RNG;
- localized text differs only where expected.

## Hard Work boundary

Locale cannot affect ending progression.

Lumber remains:
completed_shifts >= 50

reward:
hardWork:lumber

No localization key participates in that eligibility.

PASS.

## Final status

Same IDs:
PASS.

Same button availability:
PASS.

Same cost definitions:
PASS.

Same wage computation:
PASS.

Same dispatch owner:
PASS.

Same typed progression:
PASS.

Life Save unchanged by locale switch:
PASS.

All-ten dual-locale click/Save comparison:
OPEN COVERAGE IMPROVEMENT.

No production runtime/UI/content file was modified by Chat 4.
