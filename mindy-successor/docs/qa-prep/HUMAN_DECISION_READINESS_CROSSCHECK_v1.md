# Human Decision Readiness Crosscheck v1

Date: 2026-09-27  
Worker: Chat 4 / QA Acceptance  
Purpose: minimize the number of questions Lead ultimately needs to ask the user by separating real Product choices from already-locked rules, parameterizable balance, ordinary content authoring and technical work.

## Decision classes

- **ALREADY_LOCKED — DO NOT RE-ASK**
- **GENUINELY_HUMAN_OWNED**
- **CONTENT_AUTHORING — NO USER QUESTION REQUIRED BY DEFAULT**
- **BALANCE_PARAMETERIZABLE**
- **TECHNICAL_WORK_CAN_PROCEED**

---

# Old Boundary Token

## Already locked

- production item identity exists: `old_boundary_token`;
- capability identity exists: `enter_old_boundary`;
- old-boundary route exists;
- capability source of truth is inventory, not worldFact;
- Forest entry itself is general;
- Hard Work is independent from token/Forest.

Classification:
**ALREADY_LOCKED — DO NOT RE-ASK**

## Genuinely human-owned

Need Product choice for:

1. acquisition source family;
2. retained vs consumed/turned-in behavior;
3. source repeatability/reacquisition policy if consumption is selected;
4. whether route requirement is hidden or visibly gated, if that remains a UX/content choice rather than standard presentation policy.

Classification:
**GENUINELY_HUMAN_OWNED**

## Content authoring after decision

Once source/policy is chosen, content authors can create:
- source event/action/relationship chain;
- player-facing text;
- presentation mapping;
- reload tests.

No additional user question is inherently required for prose/assets.

## Technical work that can proceed

Already ready:
- inventory capability runtime;
- explicit removeItem effect if consumed;
- save/reload;
- gated Activity option.

No shared runtime question remains.

---

# Hunter trail

## Already locked

- third Forest route concept is **hunter trail**;
- Forest must reach three-route depth;
- Forest success continuation remains exact current ActivityResult;
- Hard Work remains independent.

Classification:
**ALREADY_LOCKED — DO NOT RE-ASK**

## Genuinely human-owned

Only if Product wants direct control over semantic source identity:
- what unlocks hunter trail:
  - Hunter public result;
  - item capability;
  - relationship result;
  - School result;
  - another accepted typed public boundary.

This affects cross-system meaning, so it is a real Product choice if not delegated.

## Content authoring — no user question required by default

Once an unlock family is selected, content authors can choose:
- exact route prose;
- encounter text;
- presentation;
- challenge flavor;
- internal IDs following current namespace.

Do not ask the user to approve every internal ID.

## Technical work can proceed

Current Activity option/condition/reload infrastructure is sufficient for ordinary typed gates.

No new runtime primitive is proven necessary.

---

# School management/accounting result

## Already locked

- School owns the provider;
- Lumber consumes only a durable public result;
- synthetic `school.lumber-management` stays excluded;
- paid lesson and Night-study counters remain separate;
- current Lumber consumer seam already exists.

Classification:
**ALREADY_LOCKED — DO NOT RE-ASK**

## Genuinely human-owned

Potentially one compact Product decision is still needed:
- what kind of School achievement should represent management/accounting readiness:
  - lesson threshold;
  - project;
  - exam;
  - certificate;
  - named event/result.

If Product delegates School content design, this does not need direct user intervention.

## Balance parameterizable

If the chosen provider is threshold-based:
- exact `lessons_completed` threshold;
- exact stat threshold.

These can remain balance parameters and be validated by simulation.

Do not ask the user for a number unless the value is narratively/product-significant.

## Content authoring — no user question required by default

After provider category is selected:
- milestone name;
- event text;
- durable fact ID;
- presentation;
- teacher linkage

can be authored within current School contracts.

## Technical work can proceed

Resolver and durable public-boundary mechanics already exist.

---

# School Arcana / Forest result

## Already locked

- private School counters must not be read directly by Forest/Lumber;
- if a durable School result exists, it must be School-owned;
- Forest success continuation remains driven by ActivityResult, not School internals;
- Night study contribution is not assumed.

Classification:
**ALREADY_LOCKED — DO NOT RE-ASK**

## First question to resolve

Before asking threshold/provider details, clarify only:

**Does the final target actually retain a distinct School Arcana -> Forest public result?**

The current decision schema treats this path as optional/retained.

This is the only high-value Product question if scope is genuinely undecided.

## If retained

Provider category may be:
- lesson threshold;
- milestone;
- project;
- exam;
- certificate;
- event/result.

Exact numeric threshold can remain parameterized unless Product wants a specific narrative milestone.

## Technical work can proceed

Generic durable School result and Forest typed-condition infrastructure already exists.

No runtime change is required before the scope decision.

---

# Poverty / Secret Debt

## Already locked

Do not re-ask:
- Secret Debt is in the intended public build;
- it is a hidden career beyond the 10 ordinary careers;
- it does not count toward Palace 10/10;
- ordinary poverty remains independently playable/recoverable;
- one-time street lender concept;
- accept/refuse persistence;
- delayed trap structure;
- ordinary jobs become blocked after activation;
- forced Night obligation exists;
- three outcome families exist;
- Palace exclusion is absolute.

Classification:
**ALREADY_LOCKED — DO NOT RE-ASK**

## Genuinely human-owned

Only behavior-shaping decisions that materially alter the experience should be escalated:

1. whether large Activity remains available while bound;
2. whether School remains available while bound, if not already settled elsewhere;
3. whether forced debt Night suppresses ordinary lodging payment;
4. how forced Night and housing next-day modifiers compose;
5. whether leaving the debt route happens at debt payment, outcome resolution, or ending completion where the design still leaves that semantic open.

These are systemic Product decisions.

## Balance parameterizable

Do not ask the user for exact values by default:
- lender benefit;
- debt amount;
- delayed activation timing;
- forced-Night Energy penalty;
- shift gains;
- outcome thresholds.

These should remain parameters subject to simulation unless Product explicitly wants to lock them.

## Content authoring — no user question required by default

Can proceed once behavioral rules are set:
- lender/master names;
- scene prose;
- presentation;
- street event variants;
- route text;
- outcome flavor.

## Technical work can proceed

Without new user input, engineers can prepare generic:
- SecretDebtState persistence;
- job availability lock seam;
- forced Night interception seam;
- ending integration seam;
- anti-softlock tests.

Do not hard-code open numbers.

---

# Optional presentation / art priorities

## Already locked

- semantic presentation IDs;
- GIF optional;
- static/text fallback valid;
- missing media nonfatal;
- Animation Off presentation-only;
- mechanics never wait for GIF;
- current RC-blocking asset count is zero.

Classification:
**ALREADY_LOCKED — DO NOT RE-ASK**

## Genuinely human-owned only if desired

Art-direction choices:
- visual style;
- palette;
- which optional GIFs to commission first;
- distinct teacher appearances;
- route-specific visual identity.

These are optional content/art decisions, not blockers to technical production.

## Recommended questioning discipline

Do not interrupt production to ask the user:
- whether every existing static fallback needs a GIF;
- which exact filename to use;
- which internal presentation ID slug to choose.

Only ask when:
- art direction affects Product identity;
- budget/scope requires prioritization;
- an authored route/teacher concept itself is undecided.

---

# Questions Lead should avoid asking

Do not ask again:

- “Should Palace require all 10 ordinary Hard Work?” — locked YES.
- “Should Secret Debt count toward Palace?” — locked NO.
- “Should Hard Work require Forest/School/item?” — locked NO.
- “Should Forest entry require Old Boundary Token?” — current product says NO.
- “Should item capability come from worldFact?” — current runtime says NO.
- “Should GIF completion drive mechanics?” — locked NO.
- “Should School Night study be the same as paid lesson?” — locked NO.
- “Should ordinary poverty force Secret Debt?” — locked NO.

---

# Minimal future user-question set

If Lead needs to ask the user soon, the likely smallest high-value set is:

1. Old Boundary Token:
   - acquisition source family;
   - retain vs consume/turn-in.

2. Hunter trail:
   - unlock source family, only if content author cannot choose under delegated authority.

3. School management:
   - provider/milestone category, only if Product wants direct control.

4. Arcana/Forest:
   - retain this distinct cross-system result or drop it.

5. Secret Debt:
   - only unresolved systemic availability/payment-composition choices, not numeric balance values.

6. Presentation:
   - only optional art-direction priorities when production budgeting requires them.

Everything else should proceed as:
- locked implementation;
- delegated content authoring;
- parameterized balance;
- technical prep.

No production runtime/UI/content file was modified by Chat 4.
