# Lumber PR22 Closure Parity Audit v1

Status: audit of merged PR #22 against accepted Lumber contracts.

PR #22:
- title: Lead: close generic item capability and Forest route infrastructure
- merge commit: `011572ef1335deda5ac33120c3a7ea7f9849dbbf`

Important branch note: this Chat 3 worker branch received the post-PR22 TASK update without the PR22 shared runtime merge itself. Therefore the audit records the merged-main facts explicitly, while its regression test is dual-baseline: it validates current worker-branch locked contracts now and validates PR22 runtime parity whenever the PR22 infrastructure is present in the tree.

## PR22 parity result

### Forest entry is available without Old Boundary Token

**PASS / SHIPPED.**

Merged production `lumber.forest` has no entry prerequisite for `enter_old_boundary`.

Entry:
- Activity: `lumber.forest`;
- daytime Energy cost: 2;
- `entryConditions = []`.

The token is no longer a prerequisite for entering the entire Forest Activity.

### Logging road is the normal route

**PASS / SHIPPED.**

Merged Forest options include a normal route option:
- option ID: `forest.route.logging-road`;
- category: `route`;
- no conditions;
- route state: `logging-road`.

A player can therefore enter Forest and choose the normal logging-road route without an Old Boundary Token.

### Old-boundary route uses actual inventory-derived capability

**PASS / SHIPPED.**

Merged item definition:
- item: `old_boundary_token`;
- capability: `enter_old_boundary`.

Merged old-boundary route:
- option ID: `forest.route.old-boundary`;
- route state: `old-boundary`;
- condition:
  `itemCapability(enter_old_boundary) present=true`.

The runtime derives owned capabilities from actual inventory item definitions. It does not use the former test-only worldFact bridge as the production authority.

If inventory does not contain an item that grants `enter_old_boundary`, the old-boundary route option is unavailable.

### Legacy active Activity saves preserve advance/escape

**PASS / SHIPPED.**

PR22 adds `optionModelVersion` to the Activity envelope with compatibility default `0`.

For legacy active envelopes with `optionModelVersion = 0`, available Activity actions remain exactly:
- `advance`;
- `escape`.

Legacy saves therefore do not suddenly require selecting a new route option.

New PR22 Activity envelopes use the option model and route selection.

### No acquisition source invented

**PASS.**

PR22 ships item/capability runtime representation and route gating, but it does not author a natural product acquisition source for `old_boundary_token`.

Still OPEN:
- source/provider;
- acquisition timing;
- requirements;
- price if any;
- acquisition presentation.

Possible source families in the initial item catalog remain candidates, not a selected production answer.

### No consume policy invented

**PASS.**

PR22 does not decide whether `old_boundary_token` is:
- retained;
- consumed on use;
- turned in later;
- removed by another authored transaction.

The old-boundary route checks current inventory-derived capability state. Product authoring still owns the removal/use policy.

### Hard Work unchanged

**PASS / SHIPPED GREEN.**

Hard Work remains:
- ending: `ending.lumber.hard-work`;
- only condition: `completed_shifts >= 50`;
- exact reward: `hardWork:lumber`.

PR22 adds no item, route, Forest, School, relationship, season or milestone prerequisite.

## PR22 closes these former blockers

1. typed production item definitions for the four initial Forest items;
2. generic `itemCapability` condition support;
3. capability derivation from actual inventory;
4. generic Activity options;
5. route state/checkpoint support;
6. capability-gated old-boundary option;
7. normal Forest entry through logging road without the token;
8. legacy active Activity save compatibility through option-model version 0;
9. UI rendering of dynamically available Activity actions.

These are no longer Lumber runtime-infrastructure blockers.

## Remaining Lumber blockers after PR22

### B1 — Old Boundary Token product authoring

Class: **AUTHORING DECISION REQUIRED**.

Runtime support now exists.

Still missing:
- exact acquisition source;
- timing/requirements;
- retained vs consumed/turned-in policy;
- repeatability;
- final acquisition presentation.

Affected PA rows:
- PA09 directly;
- PA14/PA17 natural end-to-end flow.

### B2 — Hunter-trail authoring

Class: **FOREST CONTENT DEPTH**.

The authoritative route exists in design requirements, but PR22 does not author the Hunter trail route option.

Still needed:
- hunter-trail route integration;
- clue/capability/public-fact gate;
- navigation challenge integration;
- deterministic save/reload.

Exact clue source/ID and thresholds remain OPEN.

### B3 — Three challenge families

Class: **FOREST CONTENT DEPTH**.

PR22 provides generic Activity option infrastructure, not the full three-family content:
- navigation;
- physical obstacle;
- interpretation / ritual anomaly.

### B4 — Seasonal topology/options

Class: **FOREST CONTENT DEPTH**.

PR22 does not author seasonal route/challenge topology differences.

Spring/summer/autumn/winter must change availability/options deterministically, not only art.

### B5 — School management public result

Class: **AUTHORING DECISION REQUIRED**.

School runtime is shipped, but the School-owned producer for:
`lumber.school.management-ready`
remains un-authored.

Course/track/threshold/milestone/certificate remain OPEN.

## Closure impact on PA rows

- PA09: runtime seam closed; authoring source still OPEN.
- PA14: runtime route infrastructure closed; natural old-boundary access still depends on acquiring the token, while normal Forest entry is already available.
- PA15: shipped.
- PA16: still blocked by richer route/challenge/season content.
- PA17: generic capability-aware action-space infrastructure closed; authored item-use/route choices still incomplete.
- PA18–PA20: shipped result/continuation contracts.
- PA21–PA26: shipped/closed; Hard Work remains independent.

## Locked invariants

A5 continuation remains `activityResult`.

Hard Work remains ONLY:
`completed_shifts >= 50`

with exact:
`hardWork:lumber`.
