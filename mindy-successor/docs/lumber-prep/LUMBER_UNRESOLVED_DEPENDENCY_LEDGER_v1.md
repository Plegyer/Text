# Lumber Unresolved Dependency Ledger v1

Status: Chat 3 production-proof ledger.
Branch: `chat3/lumber-production-proof-next`.
Scope: genuine unresolved production dependencies only.

This ledger is not a backlog of already-locked Lumber mechanics. It records only boundaries where production ownership or authoring is still missing.

## OPEN-01 — Old Boundary Token capability acquisition/use source

Status: **OPEN**

Locked identity:
- item: `old_boundary_token`;
- capability: `enter_old_boundary`.

Already executable:
- the Lumber test adapter maps `enter_old_boundary` to `lumber.capability.enter-old-boundary`;
- `lumber.forest` reads that adapter fact as its entry gate;
- Forest entry then uses the existing Activity flow and costs 2 daytime Energy exactly once.

Still missing for production:
- a shipped typed item/capability integration for `old_boundary_token`;
- a real reachable acquisition source/action/event;
- an owned capability query/bridge from inventory to the Forest gate;
- explicit use/retain/consume semantics.

Must **not** be invented:
- purchase price;
- a new vendor;
- an acquisition event;
- automatic consumption on Forest entry;
- a new capability ID.

The locked catalog says the token is not an ordinary commodity. That is not a license to invent a price or acquisition path.

## OPEN-02 — School management/accounting public fact ID and threshold

Status: **OPEN**

Already executable:
- the isolated Lumber cross-system fixture demonstrates the reaction shape through the fixture fact `lumber.school.management-ready`;
- that fixture can trigger `lumber-cross.school-management-return`;
- the continuation can add Lumber-owned facts used by the separate Forewoman ending family;
- the professional Foreman route itself is executable.

Still missing for production:
- the final School-owned public fact/result ID for management/accounting;
- the final School-side provider of that result;
- the exact School progression/certificate/milestone threshold, if any.

Must **not** be invented:
- lesson count;
- stat threshold;
- certificate name;
- certificate requirement;
- management exam/project count;
- replacement production fact ID.

`school.lumber-management` remains a synthetic fixture action and is not a production dependency/provider.

## OPEN-03 — Arcana / Forest School public fact ID and threshold

Status: **OPEN**

Locked design intent:
- School Arcana may contribute to understanding the Forest problem;
- School completion must be able to feed cross-system progression through a public boundary.

Already executable adjacent path:
- `lumber.forest` has an executable success/escape/failure result surface;
- success emits `lumber.forest.truth-known`;
- exact A5 `activityResult` drives `lumber-cross.activity-forest-return`;
- that continuation can add Lumber-owned Forest facts and make the Forest ending independently eligible.

Not yet executable as a production School integration:
- no final Arcana-owned public fact ID is locked;
- no exact Arcana lesson/milestone/certificate threshold is locked;
- no production event in the approved Lumber packs requires a named Arcana fact today.

Must **not** be invented:
- an Arcana fact ID;
- number of Arcana lessons;
- stat requirement;
- exam/project/certificate threshold;
- a School-to-Forest shortcut that is not already accepted.

## OPEN-04 — deeper Forest authoring beyond the locked Activity slice

Status: **OPEN**

Already executable:
- Activity ID `lumber.forest`;
- entry cost: 2 daytime Energy;
- current counter-style checkpoint/resume envelope;
- locked result IDs:
  - `lumber.forest.success`;
  - `lumber.forest.escape`;
  - `lumber.forest.failure`;
- success continuation through exact A5 `activityResult`.

Still open:
- deeper encounter sequence;
- additional obstacles;
- route-specific authored scenes;
- loot/specimen fiction;
- additional season-specific Forest content;
- any new deeper balance/lore not already locked.

Must **not** be invented:
- new result IDs replacing the locked three;
- additional required Forest prerequisite for Hard Work;
- hidden thresholds presented as canon;
- arbitrary item/School requirements for existing success continuation.

## Not an open dependency — Lumber Hard Work

Hard Work is **LOCKED**, not OPEN.

Exact eligibility:
`completed_shifts >= 50`

It has exactly one condition:
- kind: `careerCounter`;
- career: `lumber`;
- counter: `completed_shifts`;
- op: `gte`;
- value: `50`.

It must not gain:
- milestone prerequisite;
- relationship prerequisite;
- season prerequisite;
- Forest prerequisite;
- School prerequisite;
- item prerequisite.

A6 reward ID remains exactly:

`hardWork:lumber`

## Integration rule

Closing an OPEN entry requires an accepted production owner/contract. Until then, fixture adapters may prove reaction shape and save/reload behavior, but they must not be relabeled as shipped production sources.
