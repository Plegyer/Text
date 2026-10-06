# Chat 3 — D39 Formal Introduction Minimal Seam Proposal v43

Status: **DESIGN COMPLETE — ONE EXPLICIT PRODUCT/CONTENT DECISION REQUIRED**  
Owner: Chat 3  
Branch: `chat3/palace-d39-consumer-resolution-v42`

## Context

v39 proved that no existing ordinary relationship transition can be wired directly to Formal Introduction without either:

- skipping downstream trust/route state;
- breaking the normal route;
- or producing a strictly dominated / meaningless consumer.

That blocker is accepted and must not be bypassed.

v43 therefore designs the smallest new authored seam that preserves the accepted D39 runtime and all existing ordinary-career progression rules.

No runtime change is proposed.

---

# 1. Recommended target

Use exactly one existing ordinary relationship:

`assassin.handler`

Owning relationship definition:

`content/definitions.json`

Owning authored relationship pack:

`content/packs/assassin-relationship.json`

Why Assassin is the smallest safe target:

1. it is an ordinary-career relationship;
2. it is neither Palace, Activity nor Secret Debt;
3. its existing first authored professional intro event is already explicitly professional;
4. that existing intro writes only one introductory relationship fact:
   `introduced-at-work`;
5. it writes no relationship counter;
6. it writes no career fact;
7. it writes no trust fact;
8. it writes no route fact;
9. it writes no conflict fact;
10. its later trust/conflict route is already cleanly separated into later authored transitions.

That makes Assassin uniquely small among the current relationship packs.

---

# 2. Current Assassin relationship topology

Current machine:

`assassin.handler`

Initial stage:

`introduced`

Current stages:

```text
introduced
professional-trust
conflict-open
utility-ready
route-resolved
```

Current trust transition:

`build-trust`

Current shape:

```text
from:
  introduced

to:
  professional-trust

condition:
  relationshipFact introduced-at-work == true

transition effect:
  addRelationshipFact professional-trust-earned
```

Existing intro event:

`assassin.relationship.intro`

Existing career gate:

```text
careerStage assassin == operative
OR
careerStage assassin == trusted-blade
```

Existing relationship gate:

`introduced-at-work == false`

Existing baseline choice:

`professional`

Existing effects:

```text
addRelationshipFact assassin.handler / introduced-at-work
```

Nothing else.

Existing trust event:

`assassin.relationship.trust`

Existing conditions:

```text
relationshipStage assassin.handler == introduced
relationshipFact introduced-at-work == true
```

Existing baseline trust choice:

`continue`

Existing effects:

```text
addCareerFact assassin / handler-trust-ready
advanceRelationship assassin.handler / build-trust
```

Therefore the first intro and later trust are already conceptually separate.

---

# 3. Proposed new neutral stage

Add one stage to `assassin.handler`:

`formal-introduced`

New topology:

```text
introduced
-> formal-introduced
-> professional-trust
-> conflict-open
-> utility-ready
-> route-resolved
```

The new stage means only:

**the professional introduction has happened through Formal Introduction.**

It must not itself imply:

- trust;
- loyalty;
- handler approval;
- conflict resolution;
- utility;
- route choice;
- ending readiness.

---

# 4. Proposed new transition

Add exactly one new relationship transition:

`formal-introduction`

Exact proposed shape:

```json
{
  "id": "formal-introduction",
  "from": [
    "introduced"
  ],
  "to": "formal-introduced",
  "conditions": [],
  "effects": [
    {
      "kind": "addRelationshipFact",
      "relationship": "assassin.handler",
      "fact": "introduced-at-work"
    }
  ]
}
```

Why this effect is acceptable:

- `introduced-at-work` is the exact fact already written by the normal intro event;
- it is an introduction fact, not a trust/conflict/route fact;
- no counter is fabricated;
- no career fact is fabricated;
- no downstream route fact is fabricated.

The D39 atomic effect still performs exactly one relationship transition.

---

# 5. Existing intro event modification

Do **not** create a second generic relationship event.

Use the already-authored:

`assassin.relationship.intro`

Keep its existing event conditions unchanged.

That preserves the original Assassin career gate:

- `operative`;
- or `trusted-blade`.

Do not expose Formal Introduction earlier than the existing relationship content would legally allow.

Add one new choice to that event.

Recommended choice ID:

`formal-introduction`

Condition:

```json
[
  {
    "kind": "strongMetaFormalIntroductionAvailable",
    "career": "assassin",
    "relationship": "assassin.handler",
    "transition": "formal-introduction"
  }
]
```

Effect:

```json
[
  {
    "kind": "useStrongMetaFormalIntroduction",
    "career": "assassin",
    "relationship": "assassin.handler",
    "transition": "formal-introduction"
  }
]
```

The existing baseline `professional` choice remains unchanged and free.

Formal Introduction therefore becomes an explicit opt-in alternative path inside an already-legal ordinary professional introduction scene.

---

# 6. Preserve later trust route

After the new D39 transition, relationship stage is:

`formal-introduced`

The normal later trust route must remain reachable.

Two narrow compatibility edits are therefore required.

## Relationship machine

Expand existing `build-trust.from` from:

```text
introduced
```

to:

```text
introduced
formal-introduced
```

Do not alter:

- target stage;
- condition;
- trust effect.

It must still require:

`introduced-at-work == true`

and must still write:

`professional-trust-earned`

only when normal `build-trust` is later executed.

## Authored trust event

Expand the existing stage condition of:

`assassin.relationship.trust`

from only:

`introduced`

to:

```text
introduced
OR
formal-introduced
```

Keep the existing:

`introduced-at-work == true`

condition.

Keep existing `continue` effects unchanged.

This means Formal Introduction does not replace trust.

It only supplies the earlier professional introduction state.

---

# 7. What this seam deliberately does not do

It does not:

- unlock Assassin;
- bypass the Assassin career-stage gate;
- bypass one completed current-life shift;
- add handler trust;
- add `handler-trust-ready`;
- add `professional-trust-earned`;
- open conflict;
- resolve conflict;
- grant handler utility;
- write route facts;
- write ending facts;
- grant an item;
- grant money;
- grant Energy;
- grant a stat;
- interact with Palace;
- interact with Activity;
- interact with Secret Debt.

The baseline Assassin relationship route remains available without D39.

---

# 8. Why other relationships are larger/riskier

Most other current ordinary relationship intro events write:

- `introduced-at-work`;
- plus a relationship meeting counter.

A D39 transition that replaces those scenes would need either:

- to fabricate the same counter;
- or to rewrite later trust thresholds.

That is a larger semantic seam.

Assassin's baseline intro writes only:

`introduced-at-work`

so the D39 transition can faithfully reproduce only the introductory ownership needed for later normal trust.

Lumber remains rejected for v43 because its existing one-shot scene currently owns:

```text
unknown -> professional -> route-professional
```

and cannot be safely split into a meaningful D39 consumer without broader route timing changes.

---

# 9. Pack capability change

Current `assassin.relationship` capabilities already read/write:

- career `assassin`;
- relationship `assassin.handler`.

Add only the typed D39 Meta read:

```json
"meta": [
  "strongMetaFormalIntroduction"
]
```

under:

`capabilities.reads`

No new write domain is needed.

The atomic D39 effect writes the already-owned relationship domain.

---

# 10. Save/migration behavior

The proposal adds a new relationship stage:

`formal-introduced`

Existing saves are unaffected because:

- current saves cannot already contain that stage;
- existing `introduced`, `professional-trust`, `conflict-open`, `utility-ready`, `route-resolved` remain valid;
- no current stage is renamed or retired.

No schema-version bump is required solely for adding a reachable stage to an existing relationship machine.

New saves that contain `formal-introduced` require the assembled definitions to include that stage.

Reload must preserve:

- `formal-introduced`;
- `introduced-at-work`;
- D39 used-relationship ledger.

No migration should infer a consumed Formal Introduction use from old relationship state.

---

# 11. Specialist slot firewalls

Formal Introduction remains:

`palace.court-power.formal-introduction`

class:

`specialist`

Normal D28 capacity remains:

**2 Specialists**

This seam must not:

- auto-select it;
- create a free Palace slot;
- activate it in the same life it is earned;
- consume a use when transition fails;
- consume more than once for `assassin.handler`.

---

# 12. Required focused tests

Add one exact live-consumer test around the real Assassin pack.

## Baseline route unchanged

Without Formal Introduction selected:

1. reach normal `assassin.relationship.intro`;
2. only baseline route required;
3. choose `professional`;
4. `introduced-at-work` is written;
5. Formal Introduction ledger remains unchanged;
6. normal trust/conflict route remains reachable.

## D39 route

With Formal Introduction selected:

1. event is still unavailable before existing Assassin career gate;
2. event is unavailable at zero current-life Assassin shifts;
3. after legal gate + shift, D39 choice is visible;
4. choose `formal-introduction`;
5. relationship stage becomes exactly:
   `formal-introduced`;
6. `introduced-at-work` exists;
7. no `professional-trust-earned`;
8. no `handler-trust-ready`;
9. no conflict/route/ending fact;
10. exactly one D39 relationship use is recorded.

## Later normal trust

Then:

1. normal `assassin.relationship.trust` remains legal;
2. normal `continue` executes `build-trust`;
3. stage becomes `professional-trust`;
4. normal trust fact and career fact are written at that point only.

## Reload

Reload after D39 introduction but before trust.

Assert:

- stage remains `formal-introduced`;
- used-relationship ledger contains only `assassin.handler`;
- normal trust event remains reachable;
- second Formal Introduction use on the same relationship is rejected.

## Regression suites

Run at minimum:

```text
tests/palace-d39-reward-producer-v20.test.ts
tests/assassin-runtime-invariants.test.ts
tests/assassin-natural-acceptance.test.ts
tests/assassin-boundaries.test.ts
tests/migration.test.ts
```

No full CI is owned by Chat 3.

---

# 13. One explicit Product/content decision required

The runtime does not have authority to choose which ordinary relationship opts in.

The required decision is exactly:

> Approve `assassin.handler` as the first live Formal Introduction consumer, with one neutral intermediate stage `formal-introduced` and one transition `formal-introduction`. The transition may reproduce only the existing introductory fact `introduced-at-work`; normal `build-trust`, conflict, utility, route and ending progression remain separate and unchanged.

No broader D39 rule change is requested.

No generic relationship framework is requested.

---

# 14. Recommended disposition

**RECOMMEND APPROVAL.**

This is the smallest currently identifiable seam because:

- one existing career;
- one existing relationship;
- one existing intro event;
- one new neutral stage;
- one new transition;
- one new conditional choice;
- two narrow compatibility edits to let the normal trust route continue;
- no runtime change;
- no counter fabrication;
- no route/trust shortcut.

Until Product/content authority approves the target, Chat 2 should not implement the seam.

**v43 COMPLETE — CONTINUE TO v44**
