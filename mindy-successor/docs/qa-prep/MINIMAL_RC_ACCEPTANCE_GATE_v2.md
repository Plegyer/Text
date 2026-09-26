# Minimal RC Acceptance Gate v2

Date: 2026-09-26  
Worker: Chat 4 / QA Acceptance  
Target: current release-candidate line after PR22 + PR23, with PR24 one-Save smoke candidate

## Purpose

Define the smallest executable release-candidate acceptance set that can honestly be green **before** unresolved product authoring is decided.

This gate proves technical integration, persistence and exactly-once behavior.

It does not claim that OPEN authoring rows are complete.

---

# Gate A — exact RC build/validation

On the exact release-candidate SHA:

```bash
npm ci
npm run check
```

Required:

- typecheck PASS;
- validate PASS;
- build PASS;
- full test suite PASS;
- zero failures.

Record:

- exact SHA;
- test total/pass/fail;
- validation content counts.

A green earlier PR head is not a substitute for a newer RC SHA.

---

# Gate B — one-Save E2E

Required shipped path:

```text
started Save
-> lumber.shift
-> first Lumber milestone
-> Foreman professional route
-> school.course.arcana
-> shipped School pending scene resolution
-> endDay
-> lodging.normal
-> Foreman Night
-> next day
-> lumber.forest
-> forest.route.logging-road
-> Forest success
-> Lumber continuation
-> completed_shifts=49 threshold accelerator
-> real 50th lumber.shift
-> commit Hard Work
-> complete Hard Work
-> reload/retry
-> New Run
-> reload
```

Only allowed direct accelerator:

`completed_shifts=49`

immediately before the real 50th shift.

Forbidden direct mutations:

- School public fact;
- Old Boundary Token;
- capability worldFact;
- Forest success fact;
- ending eligibility;
- ending reward;
- Meta progress.

The one-Save path must explicitly resolve any real pending scene selected after School rather than clearing it.

Current PR24 candidate expects:

`base.school`

then real choice:

`listen`.

---

# Gate C — schema-4 compatibility

At minimum:

## Missing School state

Older schema-4 save missing School progression must load with:

`school.tracks={}`

and no invented progression.

## Pre-option active Activity

Older active Activity save missing:

- `optionModelVersion`;
- `routeId`;
- `resolvedOptionIds`

must load as option-model 0 and retain immediate:

- `advance`;
- `escape`.

No retroactive route choice may be required.

---

# Gate D — generic item capability

Required current-main behavior:

- capability derives from declared item definitions;
- positive owned inventory activates capability;
- worldFact alone does not activate it;
- multiple providers are allowed;
- unknown capability validation rejects;
- removal of last provider removes capability.

Old Boundary Token acquisition itself remains authoring-open.

Seeded item state is acceptable only for this runtime contract.

---

# Gate E — Activity route reload

Natural no-item Forest flow must prove:

1. entry costs 2 Energy once;
2. logging-road visible;
3. old-boundary route hidden without capability;
4. advance hidden before route;
5. logging-road option selected by real command;
6. routeId persisted;
7. resolved option ID persisted;
8. reload preserves route/option/checkpoint;
9. advance + escape available after route;
10. success result and continuation happen once.

This is natural shipped evidence after PR22.

---

# Gate F — School typed progress

Representative paid course:

`school.course.arcana`

Required:

- tuition 500 once;
- current-day Energy -1 once;
- exact stat package;
- typed `lessons_completed +1`;
- `night_study_sessions` unchanged;
- semantic presentation stable;
- reload does not replay transaction;
- any Resolver-selected pending scene is resolved normally before later flow.

No School public-result authoring is required to make this technical gate green.

The unresolved management/accounting fact must not be injected.

---

# Gate G — Night exactly-once

Required:

- `endDay`;
- `lodging.normal`;
- lodging payment once;
- reload after lodging;
- `lumber.foreman.night`;
- relationship Night counter once;
- reload pending Night event;
- event resolution;
- calendar advance exactly once;
- next-day Energy initialized once.

No double lodging charge or double Night effects.

---

# Gate H — Hard Work exact threshold/reward

Static production contract must remain exactly:

```json
{
  "conditions":[{
    "kind":"careerCounter",
    "career":"lumber",
    "counter":"completed_shifts",
    "op":"gte",
    "value":50
  }],
  "metaRewards":[{
    "kind":"hardWork",
    "rewardId":"hardWork:lumber",
    "career":"lumber"
  }]
}
```

Executable boundary:

- 49: not eligible;
- one real `lumber.shift`;
- 50: eligible;
- run still active;
- commit: no Meta reward;
- complete: exactly one `hardWork:lumber`;
- repeated reload/retry: no duplicate transaction/reward;
- New Run: locked Strength/Endurance Meta effect visible and reload-stable.

No School/Forest/item/relationship/season prerequisite is allowed.

---

# Gate I — state-drift sentinel

Integrate/run:

`tests/qa-one-save-state-drift-sentinel.test.ts`

It must fail if later subsystems reset or duplicate earlier subsystem state.

Sentinel domains:

- money;
- daytime Energy;
- Lumber counter;
- Foreman typed state;
- School typed state;
- Night day advance;
- Forest public/typed result;
- ending eligibility;
- Meta transaction.

---

# Gate J — corruption subset

From:

`RC_SAVE_RELOAD_CORRUPTION_MATRIX_v1.md`

minimum automated cases:

- pending unknown event/choice;
- Night payment without lodging;
- Night intercept mismatch;
- pre-option Activity compatibility;
- Activity definition mismatch;
- impossible Activity success/failure checkpoint;
- ending status/commit mismatch;
- missing/duplicate RunResult transaction proof;
- legacy ended schema-4 deterministic compatibility result.

Logical route/option corruption should be added if current parser does not yet validate it.

---

# Authoring items explicitly outside this green gate

The gate may be technically GREEN while these remain OPEN:

- Old Boundary Token acquisition source;
- token retain/consume policy;
- hunter-trail clue/capability identity;
- School management/accounting threshold/provider;
- School Arcana/Forest threshold/provider if still in scope;
- third Forest route;
- three challenge families;
- seasonal Forest difference.

Their status must remain visible in:

`RC_AUTHORING_BLOCKER_EVIDENCE_PACK_v1.md`.

---

# Minimal executable file set

## Already on current main

- `tests/product-acceptance-shipped-v1.test.ts`
- `tests/item-capability-activity-closure.test.ts`
- `tests/qa-generic-item-capability-contract.test.ts`
- `tests/qa-activity-option-reload.test.ts`
- `tests/qa-architecture-gaps.test.ts`
- `tests/qa-exactly-once-reload.test.ts`
- `tests/qa-orphan-stage-gate.test.ts`

## Add for RC

- PR24 `tests/release-candidate-shipped-e2e.test.ts` once green
- `tests/qa-one-save-state-drift-sentinel.test.ts`
- `tests/qa-minimal-rc-acceptance-gate-v2.test.ts`
- `tests/qa-shipped-dist-smoke-contract.test.ts` after build, updated to current PR22/23 content expectations if needed

## Selected worker breadth after rebase

- Chat 2 presentation activation acceptance;
- Chat 3 Lumber ending independence;
- Chat 5 School full reload matrix;
- Chat 5 School Night choice catalog;
- Chat 5 School typed state compatibility.

Worker tests are additive breadth, not a reason to block the minimal technical RC if equivalent stronger current-main coverage is explicitly documented.

---

# Green decision

The minimal RC gate may be called **TECHNICALLY GREEN** only if:

1. exact RC full check is green;
2. corrected one-Save E2E is green;
3. schema-4 compatibility is green;
4. generic item capability is green;
5. route reload is green;
6. School typed progress is green;
7. Night exactly-once is green;
8. Hard Work static + executable boundary is green;
9. state-drift sentinel is green;
10. no test achieves green by injecting unresolved authoring state.

This technical green does not equal full Product Acceptance authoring completion.

No production runtime/UI/content file was modified by Chat 4.
