# Ordinary Poverty / Secret Debt Boundary Audit v1

Status: C3-10 current-main content boundary audit.
Owner: Chat 3 / Forest + Poverty Content Bundles Worker.
Audited current main: `ef16d9fa0c85e3792e3dc223baadd247df95ec7f`.
Fixture: `prior-work/astra/prototype-m3.2/content/poverty-secret-debt-boundary-audit-v1.fixture.json`.

## Result

Current production ordinary poverty and the planned Secret Debt route are **not the same system**.

Current production contains six ordinary-poverty packs:
- `poverty-street-production`;
- `poverty-street-production-v2`;
- `poverty-cheap-production`;
- `poverty-cheap-production-v2`;
- `poverty-recovery-production`;
- `poverty-pressure-production`.

None of those packs contains:
- Secret Debt state;
- lender identity;
- hidden Slave career;
- Secret Debt acceptance/refusal;
- delayed debt activation;
- forced Secret Debt Night;
- Secret Debt ending identity;
- Secret Debt Meta reward;
- a write to the legacy generic `debt` metric.

Current production therefore has no active Secret Debt content collision.

## Ordinary poverty activation boundary

Ordinary poverty is entered and continued through existing ordinary state:
- current NightFlow;
- lodging choice;
- `housingTier: street` or `housingTier: cheap`;
- exact calendar/season conditions on ordinary events.

Street/cheap housing is sufficient for ordinary poverty content.

Low money does not automatically create Secret Debt.

Street housing does not automatically create Secret Debt.

Ordinary events can:
- add or decline small money;
- add existing item `herb`;
- add existing next-day pressure;
- do nothing mechanically.

Those effects remain ordinary survival/recovery content.

## Secret Debt intended activation boundary

The current Secret Debt design/handoff describes a separate exceptional route.

Its fixed structural boundary is:
1. eligible street sleep;
2. a separate one-time hidden offer opportunity;
3. explicit player refusal or acceptance;
4. refusal closes the route for that run;
5. acceptance grants its future-approved immediate benefit exactly once;
6. acceptance creates a delayed hidden obligation;
7. later activation enters a separate hidden bound-career state.

This is not equivalent to:
- being poor;
- choosing `lodging.street`;
- receiving anonymous help;
- taking a small paid errand;
- using the generic legacy debt metric.

Chat 3 does not implement this runtime state machine.

## Current collision/risk matrix

### 1. Legacy generic debt metric

Current runtime contains a legacy/general identity:
- `run.metrics.debt`;
- action `repay`;
- UI localization `ui.bag.debtLabel`.

This is **not** the planned Secret Debt hidden-career state.

Classification:
`NAMESPACE_STATE_COLLISION_RISK`.

Risk:
a future implementation could incorrectly reuse `run.metrics.debt` as if it were the complete Secret Debt contract.

Required boundary:
Secret Debt remains a typed/separate domain state as already required by the Secret Debt handoff. Chat 3 must not rename or repurpose the legacy metric.

No current ordinary-poverty pack writes `run.metrics.debt`.

### 2. Ordinary anonymous money help

Current event:
`poverty-recovery-production.small-coin-help`.

This is ordinary anonymous help.

Classification:
`SEMANTIC_COLLISION_RISK`.

It must not be converted into:
- the lender offer;
- a debt acceptance scene;
- a hidden obligation;
- a guaranteed recurring benefactor.

C3-08 intentionally preserves it as anonymous, no-future-obligation assistance.

### 3. Shared street NightFlow context

Ordinary street events currently react on:
`nightPhase: after_lodging`
with `housingTier: street`.

The planned Secret Debt offer also belongs conceptually to eligible street sleep.

Classification:
`RESOLVER_ORDERING_DEPENDENCY`.

This is not a current content collision because no Secret Debt production event exists.

Future integration must explicitly define:
- one-time Secret Debt state;
- resolver priority/ordering;
- offer eligibility;
- refusal/accept persistence;
- reload idempotency.

It must not rewrite the existing ordinary street event IDs to achieve Secret Debt.

That runtime/resolver work belongs to Chat 1 / Lead, not Chat 3.

## Current definitions check

Current production definitions have:
- ordinary careers only;
- no `slave` / Secret Debt career;
- no lender relationship;
- no Secret Debt ending.

The existing generic `repay` action is legacy/general debt behavior and does not create the planned hidden career.

The existence of `repay` therefore does not mean Secret Debt is implemented.

## Product-open values remain open

C3-10 chooses no value for:
- Secret Debt offer probability;
- immediate benefit;
- future debt amount;
- delayed activation timing where not separately locked;
- forced-Night penalty;
- hidden-career stat gains;
- hidden-career thresholds;
- outcome thresholds;
- exact buyout/economic requirements;
- Meta rewards;
- School availability while bound;
- Forest/Activity availability while bound.

Historical draft numbers are not promoted by this audit.

## Ordinary poverty invariants

Selective integration of C3-07/C3-08/C3-09 must preserve:
- ordinary poverty remains playable without Secret Debt;
- street remains an ordinary survival context;
- cheap lodging remains an ordinary housing context;
- normal lodging remains reachable by existing affordability rules;
- ordinary recovery money/resources do not create hidden debt;
- no ordinary-poverty content key is treated as lender content;
- no Secret Debt namespace is added to ordinary packs.

## Secret Debt content boundary for future work

If Lead later assigns Secret Debt content authoring after runtime/Product identities exist, Chat 3 may work on:
- offer/refusal/acceptance text;
- hidden-career content;
- forced-Night content;
- outcome text;
- localization/fixtures.

But only against approved exact IDs and Product locks.

C3-10 does not self-assign that work.

## C3-10 disposition

Current active collision:
`NONE`.

Current risks to preserve:
- legacy generic `debt` identity must not be mistaken for Secret Debt state;
- anonymous ordinary help must not become lender content;
- shared street Night context will require explicit future resolver ordering/state.

Ordinary poverty and Secret Debt remain separate by identity, activation, state ownership and content semantics.
