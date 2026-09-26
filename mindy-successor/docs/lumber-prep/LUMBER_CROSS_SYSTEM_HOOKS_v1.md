# Lumber Cross-System Hooks v1

Status: ISOLATED DATA/DESIGN DRAFT. Not loaded by the live catalog.

Authority:
- PRODUCT_ACCEPTANCE_SLICE_v0.md
- CAREER_LUMBER_DRAFT_v0.md
- LUMBER_RELATIONSHIP_CHAIN_v0.md
- FOREST_ACTIVITY_SLICE_v0.md
- SCHOOL_SYSTEM_v2.md
- ITEM_SYSTEM_DRAFT_v0.md
- INITIAL_ITEM_CATALOG_v0.md
- RELATIONSHIP_TRIGGER_MODEL_v1.md
- EXECUTABLE_TZ_v1.md
- EVENT_RESOLVER_CONTRACT_v1.md

## 1. Integration rule

Cross-system progression must use typed public facts, capabilities, Activity results, and reaction facts.

Forbidden pattern:
- Lumber directly setting School/Relationship/Activity internal stages;
- School directly setting Lumber stage;
- an item directly forcing an ending;
- a relationship scene charging an extra work-like Energy cost merely because it followed Work.

Preferred pattern:

```text
source action/state change
-> source-owned effects
-> public fact / item capability / ActivityResult
-> resolver reaction boundary
-> Lumber/Foreman conditions
-> 0-Energy reactive scene or transition
```

## 2. School gates

### H-SCHOOL-01 — physical early gate
Source:
- Physical Training.

Supported stats:
- Strength;
- Endurance;
- Dexterity.

Use:
- may satisfy an early Lumber profile gate;
- never replaces the required shift progression;
- when the School stat change crosses a career condition, Lumber progression can react immediately at 0 Energy.

Reaction facts:
- `StatChanged(...)`;
- `ActionCompleted(school...)`.

### H-SCHOOL-02 — accounting/literacy management gate
Source:
- Literacy & Numbers and/or a later School milestone/project consistent with accounting/leadership.

Supported source requirement:
- Forewoman needs an accounting/leadership School fact.

Draft semantic public fact:
- `management_school_gate_ready`.

Explicit source fact already named in the relationship chain:
- `old_ledger_understood`.

Use:
- Forewoman branch management/supply/legal solution;
- can trigger career/relationship continuation immediately.

The final School-owned public fact ID for the generic management gate remains OPEN; this draft must not silently invent a certificate name.

### H-SCHOOL-03 — Arcana/Reason forest gate
Source:
- Arcana.

Supported stats:
- Magic;
- Reason;
- Creativity.

Draft semantic public fact:
- `forest_school_gate_ready`.

Use:
- understand/identify the forest anomaly;
- unlock or improve an interpretation approach in Forest Activity;
- support the Forest outcome family.

The exact School milestone/public fact ID remains OPEN.

### H-SCHOOL-04 — School must remain an action
School itself:
- costs 1 Energy + tuition;
- applies its own stat package/progress.

Any Lumber or Foreman scene triggered by the resulting stat/fact:
- costs 0 additional daytime Energy.

## 3. Item capabilities

### H-ITEM-01 — Reinforced Axe
Item ID: `reinforced_axe`.

Capabilities:
- `cut_heavy_wood`;
- `lumber_high_risk_shift`.

Lumber uses:
- opens a distinct work option;
- can offer a production solution in Forewoman route.

Forest Activity use:
- alternate solution for a physical obstacle.

Rule:
- not a passive "+Strength %" item;
- exact special risk/reward remains OPEN.

### H-ITEM-02 — Rope Kit
Item ID: `rope_kit`.

Capability:
- `cross_rough_route`.

Use:
- opens shortcut/safe bypass in Forest Activity;
- may be sourced through Merchant or Hunter contact.

No generic Dexterity bonus.

### H-ITEM-03 — Field Preservation Kit
Item ID: `field_preservation_kit`.

Capability:
- `preserve_specimen`.

Use:
- preserve a rare Activity sample so it can leave the Activity as a meaningful item/result;
- can feed School/Farm later;
- satisfies the acceptance requirement that at least one Activity extraction capability changes what can be brought back.

Consume policy remains OPEN (charges vs reusable).

### H-ITEM-04 — Old Boundary Token
Item ID: `old_boundary_token`.

Capability:
- `enter_old_boundary`.

Use:
- unlock the hidden Old Boundary Path in Forest Activity;
- can act as evidence of old rights/boundaries in Lumber/Foreman progression.

Rule:
- not ordinary trade loot.

## 4. Forest Activity inputs

Activity ID working reference:
- `forest` (final package ID can follow the target Activity catalog).

Entry:
- costs 2 daily Energy once.

Inside:
- no daily Energy spending;
- use Activity-owned routePosition/timeSegments/endurance/supplies/discoveredPoints/pendingEncounter/carriedFinds/campUsed;
- deterministic save/resume.

### Route A — Logging Road
Availability:
- baseline Forest route.

Lumber inputs:
- Lumber career facts/context.

Expected role:
- lower risk;
- production/documentary findings.

### Route B — Hunter Trail
Availability:
- Hunter clue or navigation capability.

Inputs:
- Hunter/public clue such as `forest_tracks_confirmed`;
- relevant navigation knowledge/capability.

Expected role:
- tracking/wildlife context;
- rare resources.

### Route C — Old Boundary Path
Availability:
- capability `enter_old_boundary` from `old_boundary_token` or a later equivalent explicitly allowed by the Activity definition.

Expected role:
- key Lumber Forest route;
- hidden grove/problem objective.

## 5. Forest Activity challenge hooks

### Navigation
Stats:
- Wits;
- Reason.

Facts/capabilities:
- Hunter knowledge;
- map/navigation capability where later defined.

### Physical obstacle
Stats:
- Strength;
- Endurance;
- Dexterity.

Capabilities:
- `cross_rough_route`;
- `cut_heavy_wood`.

### Interpretation/anomaly
Stats:
- Reason;
- Magic.

Facts/capabilities:
- Arcana School fact;
- specific sample/tool where later defined.

The Forest slice does not require combat.

## 6. Forest Activity outputs

Source-supported possible result facts:
- `forest_truth_known`;
- `forest_resource_exploitable`;
- `forest_protection_needed`;
- `forest_evidence_collected`.

Success can also return:
- carried finds/items;
- resources;
- world/career/relationship facts.

Escape:
- preserves some discoveries according to Activity policy;
- differs from success;
- does not grant the full objective result.

Failure:
- forced exit;
- optional condition/next-day penalty;
- possible consumable/find loss according to Activity policy.

The exact quantities remain Activity/balance OPEN.

## 7. Activity -> Lumber / Foreman reaction

Required acceptance path:

```text
ActivityCompleted(forest, qualifying-result)
+ world/result fact forest_truth_known
-> resolver boundary
-> Lumber critical/normal progression candidate
-> Foreman relationship candidate where eligible
-> 0-Energy continuation
```

No extra Lumber shift is required simply to notice an already-returned result.

## 8. Housing / Night hooks

Supported housing rules from EXECUTABLE_TZ_v1.md:
- normal: full normal Night/privacy;
- cheap: restricted privacy/Night/storage;
- street: restricted Night, next-day Energy -1, Grooming -1;
- Secret Debt forced night can override/intercept.

Foreman night opportunity:
- uses Night slot;
- no daytime Energy;
- normally no universal next-day Energy penalty;
- increments relationship night counter only if the meeting occurs.

If a forced night intercepts:
- Foreman opportunity is not treated as rejection;
- no relationship penalty is implied by the intercept.

Night study:
- separate School option;
- uses Night slot;
- applies next-day Energy -1;
- cannot coexist with another Night-slot choice that night unless the Night contract later explicitly permits it.

## 9. Ending gates

### `ending.lumber.hard_work`
Locked:
- Lumber shifts >= 50.

Source requirement:
- career milestone reached/integrated into Lumber progression.

Not required:
- season breadth;
- Forest route;
- romance;
- School certificate.

Eligibility only. Commitment/completion separate.

### `ending.lumber.forewoman`
Requires source-supported combination:
- Lumber shifts/reputation;
- management/social stat gate (exact stat/threshold OPEN);
- accounting/leadership School public fact;
- production/crew/supply conflict resolution.

Relationship:
- professional route can qualify;
- close route may coexist;
- rival route may alter leadership context;
- romance is not required.

### `ending.lumber.forest_compact`
Requires source-supported multi-system chain:
- forest anomaly/clue progression;
- relevant external clue/contact;
- School Arcana/Reason gate where applicable;
- Old Boundary/Activity access;
- qualifying Activity result;
- Lumber resolution choice.

Exact final lore and exact numeric gates remain OPEN.

### Simultaneous eligibility
Data must allow at least:
- Hard Work + Forewoman;
- Hard Work + Forest;
- potentially all three;
- relationship fate(s) separately.

No eligible ending automatically stops the run.

## 10. Resolver reaction fact matrix

| State-changing boundary | Reaction fact family | Lumber/Foreman consequence |
|---|---|---|
| Lumber Work completes | `ActionCompleted(job.lumber)` | shifts/milestone/trust/ending re-evaluation |
| Lumber shift counter changes | `CareerCounterChanged(lumber,...)` | career transitions and Hard Work eligibility |
| School changes a relevant stat | `StatChanged(...)` | profile gate or relationship stat gate can trigger |
| School publishes a public fact | `WorldFactAdded(...)` or domain-public equivalent | Forewoman/ledger/Arcana continuation |
| Item acquisition/use changes available capability | source action completion + authoritative inventory change | new Work/Activity option becomes available; resolver may notify but need not force a scene |
| Night meeting resolves | `NightResolved(...)` | increment night counter; possible 0-Energy milestone |
| Tavern/Hunter external clue appears | `WorldFactAdded(...)` | Forest/Foreman progression candidate |
| Forest Activity exits | `ActivityCompleted(...)` | immediate Lumber/Foreman continuation |
| Activity publishes result fact | `WorldFactAdded(...)` | branch/ending gate evaluation |
| Career/relationship choice resolves | event-choice reaction epoch | downstream career/relationship cascade |
| Ending becomes valid | `EndingEligible(...)` | register fate; do not auto-commit |

Exact event IDs and priority numbers belong to integration content, but critical progression must outrank optional-world noise according to the Resolver contract.

## 11. Product Acceptance chain supported by these hooks

```text
Lumber shift (1 Energy)
-> reactive career milestone (0 Energy)
-> Foreman professional relationship opens (0 Energy)
-> School lesson (1 Energy + tuition)
-> School stat/fact triggers Lumber/Foreman continuation (0 Energy)
-> obtain meaningful item/capability
-> choose lodging
-> optional Foreman Night meeting (Night slot)
-> next day
-> enter Forest Activity (2 Energy)
-> save/reload inside Activity
-> use item capability
-> return with forest result fact
-> resolver triggers Lumber/Foreman continuation (0 Energy)
-> at least Hard Work + one complex ending can be eligible
-> continue playing until explicit ending commitment
```

## 12. Open integration questions

- Final School public fact IDs for management and Arcana career gates.
- Exact Forewoman stat/reputation thresholds.
- Exact clue subset required for Forest outcome.
- Final Activity package ID and result-tag vocabulary.
- Exact item acquisition sources chosen for the first playable slice.
- Exact complex ending meta rewards.
