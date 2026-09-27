# Human Decision Packet Conflict Audit v1

Date: 2026-09-27  
Worker: Chat 4 / QA Acceptance  
Baseline: current main after PR30

## Sources compared

- `USER_DECISIONS_LOCKED_v1.md`
- `NEW_GAME_SPEC_v1.md`
- `PROJECT_STATE.md`
- `RC_HUMAN_DECISIONS_REQUIRED_v1.md`
- `OLD_BOUNDARY_TOKEN_PRODUCT_DECISION_IMPACT_v1.md`
- `FOREST_AUTHORING_READY_COMPLETENESS_v2.md`
- `SCHOOL_MANAGEMENT_RESULT_DECISION_SCHEMA_v1.md`
- `SCHOOL_ARCANA_FOREST_RESULT_DECISION_SCHEMA_v1.md`
- `POVERTY_SECRET_DEBT_PRODUCTION_HANDOFF_v1.md`
- `PRESENTATION_HUMAN_ASSET_DECISION_PACKET_v1.md`
- current runtime constraints.

## Executive result

No blocking contradiction was found between current locked authority and the active decision packets.

The main risk is **over-questioning**: several packet fields are implementation/content-authoring details, not decisions that need direct user approval.

One historical authority conflict is present inside older `PROJECT_STATE.md` narrative sections: earlier Palace-count uncertainty is superseded by the current locked 10/10 rule.

---

# 1. Palace prerequisite — historical conflict

## Current authoritative side

`USER_DECISIONS_LOCKED_v1.md`:
- Palace unlock requires Hard Work on all 10 ordinary professions;
- Secret Debt/hidden careers do not count.

`NEW_GAME_SPEC_v1.md` repeats:
- current roster threshold = 10/10;
- hidden Secret Debt does not count.

## Historical conflicting text

Older narrative sections inside `PROJECT_STATE.md` still contain statements such as:
- Palace unlock through “several unique Hard Work achievements”;
- exact required count OPEN.

These are historical design notes and are superseded.

## Audit result

**DO NOT RE-ASK**

Authoritative rule:
`10/10 ordinary Hard Work`.

Hidden careers never substitute unless Product explicitly changes the locked rule.

---

# 2. Secret Debt contribution to Palace

## Current authority

Locked:
- Secret Debt is additional hidden career;
- does not occupy ordinary slot;
- does not count toward Palace prerequisite.

Some historical Project State text mentions “Hard Work accounting” as open during earlier exploration.

That question is now closed.

## Audit result

**DUPLICATE / ALREADY ANSWERED**

Do not ask:
“Should Bound Life/Secret Debt Hard Work count for Palace?”

Answer is already NO.

---

# 3. Old Boundary Token source

## Decision packets

`RC_HUMAN_DECISIONS_REQUIRED_v1.md` and token impact packet both ask for:
- acquisition source;
- timing/requirements;
- repeatability;
- retained vs consumed/turn-in.

No direct lock answers these.

## Conflict

None.

## Duplicate-question reduction

The following can be combined into one Product choice packet:

### Question A
What source family gives the Old Boundary Token?

Source choice can carry:
- timing;
- requirement;
- repeatability policy

as authored consequences.

### Question B
Is the token retained or consumed/turned in on route use?

Do not separately ask the user for:
- internal event ID;
- file path;
- capability ID;
- save field.

Those are already technical/content details.

---

# 4. Old Boundary visibility policy

The token impact packet mentions:
- hidden route requirement;
- disabled-with-hint presentation policy.

This is a UX/content decision, but not necessarily a top-level Product question.

Current presentation/runtime can support either.

## Audit result

**DELEGATABLE CONTENT/UX DETAIL**

Escalate only if the user wants explicit control over discoverability.

Do not block implementation planning on it.

---

# 5. Hunter trail concept vs unlock identity

## Already answered

Forest completeness locks:
- third route concept = hunter trail.

Do not ask:
“What should the third route be?”

## Still open

- what public result/capability unlocks it.

## Implementation details that do not require user approval

- exact internal route ID slug;
- exact presentationId path;
- exact condition AST encoding;
- source event internal ID.

## Audit result

**ONE REAL PRODUCT QUESTION REMAINS: unlock source family**

---

# 6. School management provider

## Current decision schema

Still open:
- provider category;
- milestone/result type;
- threshold if applicable;
- durable public result identifier.

## Already locked

- School owns provider;
- Lumber consumes public result only;
- synthetic `school.lumber-management` excluded;
- paid/Night progression separated.

## Over-questioning risk

### Human/Product-level
Provider meaning/category may be a real content choice:
- threshold;
- project;
- exam;
- certificate;
- named milestone/event.

### Content-authoring detail
Final durable internal ID is not a user question.

### Balance detail
Exact numeric threshold can remain parameterized/simulated unless narratively significant.

## Audit result

Do not ask the user four separate schema questions.

At most ask:
“What kind of School achievement should represent management/accounting readiness?”

Then delegate:
- ID;
- exact numeric tuning;
- event prose

unless Product wants direct control.

---

# 7. School Arcana / Forest path

## Current schema

The packet describes the path as optional/retained.

Provider, threshold, public result and consumer are open.

## Conflict

No locked source requires a specific Arcana -> Forest provider.

The broader product does require cross-system School/Activity feedback, but not necessarily this exact path.

## Audit result

The first Product question is scope:

**Retain a distinct Arcana -> Forest public-result path?**

If NO:
- do not ask provider/threshold questions.

If YES:
- provider category is content design;
- exact threshold can remain parameterized;
- internal result ID is implementation/content detail.

This removes multiple unnecessary questions.

---

# 8. Poverty/Secret Debt structural questions

## Already locked

Do not re-ask:
- ordinary poverty is recoverable;
- Secret Debt is hidden and additional;
- lender concept exists;
- accept/refuse;
- delayed activation structure;
- ordinary jobs blocked after activation;
- forced Night obligation;
- three outcome families;
- Palace exclusion.

## Current handoff still lists human decisions

- whether School/Activity remain available while bound;
- exact forced-Night intercept point;
- lodging-payment suppression;
- modifier composition;
- career stages/thresholds.

## Audit classification

### Genuine Product/system decisions
- School available while bound?
- large Activity available while bound?
- forced debt Night suppresses lodging payment?
- how housing and forced-Night next-day penalties compose?

These materially change player experience.

### Implementation detail, not direct user question
“exact forced-Night intercept point” as an engine phase name.

User/product only needs to decide behavior:
- before lodging;
- after lodging;
- whether payment occurs.

Engine phase selection follows that behavior.

### Content authoring
career stage names/structure can be delegated unless user explicitly wants them.

### Balance parameter
stage thresholds should not require direct user answers by default.

---

# 9. Poverty candidate numbers

Historical docs contain candidate/open values for:
- debt amounts;
- lender benefit;
- activation delay;
- penalties;
- thresholds.

`PROJECT_STATE.md` and poverty handoff both classify exact values as open.

## Conflict

No current lock makes the candidate numbers canonical.

## Audit result

**NO CONTRADICTION — BUT DO NOT ASK USER TO RESOLVE EVERY NUMBER**

Use balance simulation and parameterization.

Escalate only if:
- a number carries narrative meaning;
- simulation cannot choose within acceptable range;
- Product wants direct tuning control.

---

# 10. Secret Debt outcome rewards

Three outcome families are structurally required.

Exact Meta rewards remain open.

## Audit result

This is a Product/meta-authoring choice, but does not block state-machine implementation.

Engineers can implement:
- outcome identity;
- eligibility/commit/completion;
- reward hook

while reward content stays parameterized/unset until accepted.

---

# 11. Presentation asset decisions

The presentation human packet lists many “decisions”:
- seasonal Lumber GIFs;
- Foreman GIF;
- route art;
- challenge visuals;
- teacher visuals;
- ending polish.

## Current locked authority

- GIF optional;
- valid static/text fallback;
- zero blocking RC assets;
- mechanics independent of presentation.

## Audit result

Most packet rows are **ART/CONTENT PRIORITIES**, not Product blockers.

Do not ask user individually:
- “Do you want a GIF for spring Lumber?”
- “Do you want Old Boundary-specific art?”
- “Do you want a Foreman GIF?”

unless an art-production budget/prioritization decision is currently needed.

---

# 12. Presentation/content dependency questions

Some art decisions are correctly blocked on unresolved content:
- Old Boundary experience before token policy;
- hunter-trail art before route identity;
- challenge-family visuals before challenge authoring;
- School result visual before result authoring.

## Audit result

Do not ask art questions before the underlying content identity exists.

This is dependency ordering, not a separate Product decision.

---

# 13. Already-answered technical questions

Do not surface to user:

- semantic presentation ID format;
- GIF timing behavior;
- fallback mechanics;
- item capability source of truth;
- Activity result trigger architecture;
- School private/public state boundary;
- ending transaction separation;
- save/reload identity.

These are current technical contracts.

---

# 14. Duplicate-question consolidation

Recommended consolidation:

## Token
Two Product questions:
1. source family;
2. retain/consume.

## Forest hunter trail
One Product question:
1. unlock source family.

## School management
One Product/content question:
1. achievement/provider category.

Exact threshold can be delegated to balance unless user wants it.

## Arcana/Forest
One scope question:
1. keep distinct path?

Only then ask provider category if necessary.

## Secret Debt
One compact behavior packet:
1. School while bound?
2. Activity while bound?
3. forced Night vs lodging-payment behavior?
4. modifier composition?

Do not ask exact numbers in the same packet.

## Presentation
Ask only when art-priority budget is needed.

---

# 15. Conflict summary

| Topic | Conflict? | Authoritative resolution |
|---|---|---|
| Palace required count | historical conflict | current lock = 10/10 ordinary |
| hidden career counts for Palace | historical ambiguity only | NO |
| token source | no | open |
| token retain/consume | no | open |
| hunter route identity | already answered | hunter trail |
| hunter unlock | no | open |
| School management provider | no | open |
| School management exact ID | not Product question | authoring detail |
| School threshold | no | balance/open |
| Arcana/Forest existence | no direct lock | scope decision |
| Secret Debt structure | largely locked | do not re-ask |
| Secret Debt exact numbers | no | parameterized/open |
| forced Night engine phase | not Product question | derive from behavior |
| presentation GIF priorities | no | optional art priority |

---

# Final audit disposition

The active decision packets are broadly consistent.

The main cleanup needed is **question compression**, not Product re-decision.

Lead should:
- preserve current locks;
- ask only behavior/meaning choices;
- delegate IDs/prose/internal phases;
- parameterize balance numbers;
- defer optional art priorities until production scheduling requires them.

No production runtime/UI/content file was modified by Chat 4.
