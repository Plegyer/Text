# Forest Escape / Failure Depth v1

Status: C3-42 content-side handoff.
Owner: Chat 3 / Forest + Poverty Content Bundles Worker.
Baseline main: `14c59901fce0899aa05c62edf6ebc6c556547d43`.
Fixture: `prior-work/astra/prototype-m3.2/content/forest-escape-failure-depth-v1.fixture.json`.

## Scope

C3-42 deepens the two non-success Forest outcomes while preserving their current mechanics.

Escape:
- result `lumber.forest.escape`;
- world fact `lumber.forest.escaped`;
- event `forest-result-content-v1.escape`;
- return presentation `activity/forest/return/escape`.

Failure:
- result `lumber.forest.failure`;
- world fact `lumber.forest.failed`;
- event `forest-result-content-v1.failure`;
- return presentation `activity/forest/return/failure`.

Neither outcome has a Lumber state continuation.

## Prepared variants

Escape receives four RU/EN variants:
- tracks still clear;
- before dark;
- partial notes;
- unfinished route.

Failure receives four:
- last marker;
- exhausted return;
- no confirmation;
- failure distinct from escape.

## State boundary

No variant adds:
- `forest-truth-known`;
- `forest-problem-resolved`;
- ending eligibility;
- a Lumber continuation event;
- compensation/reward;
- penalty changes.

Escape remains voluntary retreat.
Failure remains inability to complete the route.

## Integration

All strings are presentation-only handoff candidates.
No selector or resolver is added by Chat 3.

Fallback remains current escape/failure event and return copy.

## C3-42 disposition

Ready:
- eight RU/EN escape/failure depth variants;
- exact current result/event/presentation identities;
- explicit no-Lumber-state-effect boundary.
