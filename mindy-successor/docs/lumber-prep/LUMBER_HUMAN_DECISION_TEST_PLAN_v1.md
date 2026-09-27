# Lumber Human Decision Test Plan v1

Status: test plan to execute only after the corresponding human/Product decision is accepted.

This document does not choose any token source, use policy, or Hunter-trail unlock identity.

## Decision gate A — Old Boundary Token source

Decision input required before implementation:
- canonical source type/ID;
- eligibility/timing;
- one-shot vs repeatable acquisition.

### ADD after decision

`prior-work/astra/prototype-m3.2/tests/old-boundary-token-natural-acquisition.test.ts`

Must prove:
1. source is unavailable before its approved conditions;
2. source becomes available exactly at the approved boundary;
3. accepted source transaction grants exact item `old_boundary_token`;
4. `enter_old_boundary` is false before authoritative item ownership and true after ownership;
5. grant commits exactly once;
6. reload immediately before and after grant preserves eligibility/inventory deterministically;
7. retry cannot replay the same committed grant;
8. if source is one-shot, it cannot grant again;
9. if source is repeatable, each later grant is a separate explicit transaction;
10. no worldFact-only setup counts as ownership.

### UPDATE after decision

`tests/old-boundary-token-decision-vectors.test.ts`
- replace only the selected acquisition-source dimension from neutral to accepted;
- keep non-selected dimensions neutral.

`tests/old-boundary-token-invariants.test.ts`
- keep canonical IDs/exactly-once/reload invariants unchanged;
- add the accepted source as a concrete invariant input, not as a new global rule.

`tests/lumber-rc-no-false-green.test.ts`
- continue rejecting seeded inventory as natural PA09 evidence;
- allow PA09 to turn green only through the real authored acquisition transaction.

`tests/lumber-final-rc-acceptance-matrix.test.ts`
- update PA09 classification only when the authored source is shipped and natural reachability is executable.

### Do not change solely because source is decided

- Hard Work threshold/reward tests;
- Forest terminal result IDs;
- A5 continuation trigger.

## Decision gate B — Old Boundary Token retained vs consumed/turn-in

Decision input required before implementation:
- retained / consume-on-route-use / later turn-in;
- removal commit boundary if any;
- whether route access persists after item removal;
- reacquisition/permanent-access rule if applicable.

### ADD after decision

`prior-work/astra/prototype-m3.2/tests/old-boundary-token-use-policy.test.ts`

Common assertions for every accepted policy:
1. route use starts from authoritative item ownership;
2. route eligibility before use is deterministic;
3. accepted use commits once;
4. reload/retry is idempotent;
5. route availability after use matches authoritative post-transaction state;
6. no hidden cached capability contradicts authoritative state.

Policy-specific assertions:

If **retained**:
- token count is unchanged after route use;
- `enter_old_boundary` remains available while token remains owned;
- second expedition remains eligible unless another explicit rule says otherwise.

If **consume-on-use**:
- token count decrements exactly once at the approved boundary;
- reload cannot restore it;
- retry cannot consume an additional copy;
- `enter_old_boundary` disappears when authoritative count reaches zero unless separate permanent access is explicitly approved.

If **later turn-in**:
- route use does not remove the token;
- later turn-in is a distinct transaction;
- reload between route use and turn-in preserves both transaction boundaries.

### UPDATE after decision

`tests/old-boundary-token-decision-vectors.test.ts`
- mark only the use-policy dimension selected.

`tests/old-boundary-token-invariants.test.ts`
- preserve policy-independent invariants;
- add the approved removal/no-removal boundary.

`tests/forest-future-authoring-compat.test.ts`
- verify the selected policy does not alter logging-road, legacy optionModelVersion 0, terminal results, A5, or Hard Work.

`tests/lumber-final-rc-acceptance-matrix.test.ts`
- update PA17 only after ordered item-dependent route behavior is naturally executable under the accepted policy.

## Decision gate C — Hunter-trail unlock

Decision input required before implementation:
- exact Hunter public clue fact and/or navigation capability ID;
- exact logical boundary if more than one input is allowed;
- source/provider authoring;
- final production route option ID if Product has not already fixed it.

### ADD after decision

`prior-work/astra/prototype-m3.2/tests/forest-hunter-trail-production-unlock.test.ts`

Must prove:
1. Hunter trail is unavailable before approved unlock state;
2. exact approved public fact/capability makes it available;
3. fake/legacy/old-boundary capability does not unlock Hunter trail;
4. selected route persists across reload;
5. route identity remains Hunter trail after reload;
6. logging road remains available under its existing rule;
7. old-boundary remains gated by `enter_old_boundary` and is not weakened;
8. unlock source/provider private counters are not read directly by Forest;
9. no reload reroll changes route availability.

### UPDATE after decision

`tests/forest-hunter-trail-boundary.test.ts`
- move the approved identity from OPEN/null to locked production identity;
- preserve negative checks against fake IDs and `enter_old_boundary` reuse.

`tests/forest-content-completeness.test.ts`
- count Hunter trail as complete only after the actual production route exists;
- keep challenge-family and seasonal dimensions independently incomplete until authored.

`tests/forest-future-authoring-compat.test.ts`
- verify the new route is additive and does not change legacy saves/logging-road/old-boundary/result semantics.

`tests/lumber-final-rc-acceptance-matrix.test.ts`
- do not mark PA16 fully green merely because Hunter trail exists;
- PA16 can close only after all three challenge families and season topology are also authored.

## Cross-decision regression set

After any of the three decisions is implemented, rerun/update these unchanged locks:
- `lumber-rc-no-false-green.test.ts`;
- `forest-future-authoring-compat.test.ts`;
- `lumber-final-rc-acceptance-matrix.test.ts`;
- PR25/RC Hard Work gate coverage if present in the integration branch.

Always preserve:
- Hard Work ONLY `completed_shifts >= 50`;
- exact `hardWork:lumber`;
- exact A5 `activityResult(lumber.forest, success, lumber.forest.success)`;
- seeded token inventory is not natural acquisition evidence;
- QA-selected Hunter/token identities are not Product truth.

## Decision-to-test sequence

For each accepted human decision:
1. record the exact accepted answer in Product-authoritative content/docs;
2. author the production content using existing runtime where sufficient;
3. add the dedicated post-decision test named above;
4. update only the affected neutral boundary/vector tests;
5. rerun compatibility/no-false-green/acceptance classification;
6. change PA classification only after natural executable reachability exists.

This is a verification sequence, not a recommendation among Product choices.
