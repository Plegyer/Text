# Secret Debt Minimal Runtime Extension Checklist v1

Status: technical checklist of only the smallest extensions that may be needed for Secret Debt production.

Rule:
- Product values may remain parameterized;
- do not create runtime/schema work for content or balance questions;
- current primitives count as sufficient unless a concrete invariant cannot be enforced safely.

## Extension A — centralized ordinary-career availability gate

Necessity:
**UNAVOIDABLE BEHAVIORAL SEAM for production-safe global blocking**, unless Lead chooses an exhaustively generated/validated condition strategy proven equivalent.

### Exact current limitation

Current action conditions can block individual actions, but there is no single authoritative runtime gate that guarantees the Secret Debt professional lock is applied to:
- all 10 ordinary career work actions;
- direct dispatch as well as UI availability;
- ordinary reactive career progression;
- future career action variants.

Manual repeated conditions are technically possible but create omission/drift risk across the full roster.

### Smallest change

Add one shared ordinary-career availability predicate/helper or equivalent centralized gate.

Required inputs:
- authoritative `bound` Secret Debt state;
- ordinary career identity;
- existing career-specific conditions.

Required consumers:
- available-action projection;
- direct action dispatch;
- ordinary career reactive progression/transition eligibility.

School and Activity must not be included.

### Action-to-career ownership sub-seam

If current production catalog cannot reliably map an action to its career:
- add the smallest explicit mapping/metadata seam;
- avoid translated labels/string heuristics.

Possible bounded shapes:
- action `careerId` metadata;
- pack-owned action->career registry;
- validated canonical ID mapping.

Do not select one here; Lead can choose the smallest compatible representation.

### Migration impact

If helper reads existing career/public Secret Debt state:
**NO SAVE SCHEMA MIGRATION**.

If action metadata/catalog mapping changes only definitions:
**CONTENT/SCHEMA DEFINITION CHANGE**, not necessarily save migration.

### Save/reload invariant

- bound save reloads with same 10 careers blocked;
- ordinary career stage/counters/facts unchanged;
- resolving dependency removes only the debt-specific lock;
- no temporary exposure during load.

### Required test

`secret-debt-career-availability-gating.test.ts` or equivalent production test:
1. seed/enter authoritative bound state through accepted path;
2. assert every ordinary career unavailable;
3. direct dispatch blocked without effects;
4. unrelated reactive facts do not advance ordinary careers;
5. reload;
6. same state;
7. resolve paid_freedom/takeover dependency;
8. ordinary gates resume with preserved progress;
9. Palace Hard Work history unchanged.

### Can implementation wait for Product decisions?

**NO for the core ordinary-job block behavior**; the block itself is already Product-directed.

It can be implemented with symbolic/parameter-free bound state.

## Candidate extension B — dedicated SecretDebtState save object

Necessity:
**NOT YET UNAVOIDABLE**.

### Exact current limitation

None demonstrated yet that existing persisted career state + public facts cannot represent:
- unseen/offered/refused/pending/bound/resolved stage;
- counters/facts/choices;
- hidden-career progression.

Debt amount/activation target may make a dedicated object cleaner, but cleanliness alone is not proof of necessity.

### Smallest change if later required

Add one optional typed Secret Debt run-level domain object with only fields that cannot be represented safely elsewhere.

### Migration impact

Optional field defaults to `unseen` / absent.

Existing saves must not infer debt from street history/money/flags.

### Save/reload invariant

All debt phase/transaction fields round-trip exactly.

### Required test if added

- schema migration from current save;
- fresh save default;
- accepted/bound round-trip;
- invalid mixed state rejected.

### Can implementation wait?

**YES** — wait until chosen delayed/debt representation proves current career/public state insufficient.

### Do current primitives already suffice?

**POSSIBLY YES** for initial implementation.

## Candidate extension C — true delayed-event `notBeforeDay` scheduler

Necessity:
**NOT UNAVOIDABLE**.

### Exact current limitation

Queued scheduled reactions have `createdDay` and `expiresDay`, but no `deliverAtDay/notBeforeDay`.

### Smallest change if selected

Optional queued-event target day plus resolver filter before that day.

### Migration impact

Queued reaction schema gains optional field; old saves default to immediate/current semantics.

### Save/reload invariant

Target day persists; event unavailable before target; delivered once after target.

### Required test

- queue future event;
- reload before target;
- cross target;
- deliver once;
- expiry/priority behavior.

### Can implementation wait?

**YES**.

### Do current primitives already suffice?

**LIKELY** through Secret Debt career counter/dayStarted or a dedicated activationDay representation.

Do not add a generic scheduler solely for Secret Debt until Lead chooses it deliberately.

## Candidate extension D — dedicated activationDay field

Necessity:
**NOT UNAVOIDABLE**.

### Exact current limitation

Current generic career state has no first-class integer target-day field, though counters/choices/facts exist.

### Smallest change if selected

Add activation-day field only to chosen Secret Debt domain representation.

### Migration impact

Optional Secret Debt field; old saves remain unseen/no-debt.

### Save/reload invariant

Target day immutable after acceptance; activation once.

### Required test

- accept on multiple calendar days;
- reload;
- exact target boundary;
- no off-by-one/double activation.

### Can implementation wait?

**YES** until engineering chooses persistence option and Product supplies configurable delay.

### Do current primitives already suffice?

**POSSIBLY**, via career counter/day-start progression.

## Candidate extension E — next-day modifier composition policy

Necessity:
**PRODUCT-DECISION DEPENDENT, NOT CURRENTLY UNAVOIDABLE**.

### Current primitive

NightFlow already queues additive Energy/stat modifiers with tags.

### Extension needed only if Product chooses

- capping;
- replacement;
- source priority;
- mutually exclusive modifier families

not expressible cleanly in current additive model.

### Smallest change

Only the specific deterministic composition operator selected by Product.

### Migration impact

Usually none for save shape if queued modifiers remain same structure; may require versioning if semantics of existing tags change.

### Required test

street + cheap/forced source combinations according to selected policy.

### Can implementation wait?

**YES** — must wait for policy decision.

### Do current primitives already suffice?

**YES for additive semantics**.

## Candidate extension F — new Secret Debt Meta reward kind

Necessity:
**PRODUCT-DECISION BLOCKED; NOT UNAVOIDABLE**.

### Current primitive

Generic ending completion/RunResult exists; current Meta schema includes ordinary Hard Work and unlock-style rewards.

### Extension needed only if

Product selects an exact Secret Debt reward effect not representable by existing Meta primitives.

### Smallest change

Add only the selected typed Meta effect and New Run application semantics.

### Migration impact

Meta schema/version migration only for that accepted reward.

### Required test

- ending completion applies reward once;
- reload/retry idempotent;
- New Run effect;
- no Palace ordinary Hard Work credit.

### Can implementation wait?

**YES — exact rewards are unresolved.**

### Do current primitives already suffice?

Unknown until reward decision.

## No-extension areas

Current primitives already suffice for:
- normal/cheap/street lodging;
- housingTier=street conditions;
- one-time/probabilistic event delivery;
- pending scene reload stability;
- ordinary street events;
- money/inventory/public fact effects;
- generic career stages/counters/facts/choices;
- NightFlow forced intercepts;
- voluntary-menu suppression;
- next-day additive modifiers;
- calendar advance;
- generic ending eligibility/commit/completion/RunResult;
- presentationId/static/text fallback;
- Palace ordinary-career set exclusion.

Do not rewrite these systems for Secret Debt.

## Minimum implementation conclusion

Current evidence supports exactly one clear cross-cutting runtime need:
**safe ordinary-career availability enforcement while bound**.

Even that may be realized as a helper plus existing state, with no save-schema change.

Dedicated SecretDebtState, generic future scheduler, special modifier composition and new Meta kinds remain conditional rather than mandatory.

## Firewalls

Any extension must preserve:
- Secret Debt outside the 10 ordinary careers;
- Palace counting ordinary Hard Work only;
- Lumber Hard Work ONLY `completed_shifts >= 50`;
- exact `hardWork:lumber`;
- exact Lumber Forest `activityResult` continuation.
