# Forest Escape / Failure Aftermath Depth v2

Status: C3-53 content-side handoff.
Owner: Chat 3 / Forest + Poverty Content Bundles Worker.
Baseline main: `593f9936d72296557b36a0e0ca7d3c7bb780839c`.
Fixture: `prior-work/astra/prototype-m3.2/content/forest-escape-failure-aftermath-depth-v2.fixture.json`.

## Scope

C3-53 adds eight RU/EN aftermath variants to the two existing non-success Forest outcomes.

Escape uses:
- `lumber.forest.escape`;
- `forest-result-content-v1.escape`;
- `activity/forest/return/escape`;
- `job/lumber/event/forest-result-content-v1-escape/default`.

Failure uses:
- `lumber.forest.failure`;
- `forest-result-content-v1.failure`;
- `activity/forest/return/failure`;
- `job/lumber/event/forest-result-content-v1-failure/default`.

Neither outcome has a current Lumber continuation.

## Boundary

Escape remains a voluntary retreat.

Failure remains an unsuccessful attempt.

No variant adds:
- Lumber facts;
- success eligibility;
- penalties;
- injuries;
- recovery counters;
- persistent state;
- new rewards.

## Integration

No runtime selector or resolver is added. These variants remain preparation-only until an approved existing presentation/content consumer selects them.

Fallback remains current production escape/failure copy.

## C3-53 disposition

Ready:
- four escape and four failure RU/EN variants;
- exact current terminal identities;
- explicit no-facts/no-penalty/no-injury/no-persistent-state boundary.
